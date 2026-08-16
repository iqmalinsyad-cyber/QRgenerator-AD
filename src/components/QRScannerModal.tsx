import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  Upload,
  X,
  ScanLine,
  CheckCircle2,
  Copy,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { parseDecodedQR } from '../utils/qrPayloads';
import { QRContentType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDecoded: (decodedText: string, type: QRContentType) => void;
  onRecordScanHistory: (decodedText: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onApplyDecoded,
  onRecordScanHistory,
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const [activeMode, setActiveMode] = useState<'camera' | 'upload'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Start webcam
  const startCamera = async () => {
    setCameraError(null);
    setScannedResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        scanFrame();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(t.cameraDenied);
      setCameraActive(false);
    }
  };

  // Stop webcam stream
  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Continuous frame scanner loop
  const scanFrame = () => {
    if (
      videoRef.current &&
      videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
      canvasRef.current
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          handleSuccessScan(code.data);
          return;
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(scanFrame);
  };

  const handleSuccessScan = (data: string) => {
    setScannedResult(data);
    onRecordScanHistory(data);
    stopCamera();
  };

  // Handle Image File Upload Decode
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            handleSuccessScan(code.data);
          } else {
            alert(t.noQrFound);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isOpen && activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeMode]);

  if (!isOpen) return null;

  const parsedInfo = scannedResult ? parseDecodedQR(scannedResult) : null;
  const isUrl =
    scannedResult?.startsWith('http://') || scannedResult?.startsWith('https://');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      id="qr-scanner-modal"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                {t.scannerTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.scannerSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-scanner-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-100/50">
          <button
            type="button"
            id="scanner-mode-camera-btn"
            onClick={() => {
              setActiveMode('camera');
              setScannedResult(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'camera'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            {t.scannerModeCamera}
          </button>

          <button
            type="button"
            id="scanner-mode-upload-btn"
            onClick={() => {
              setActiveMode('upload');
              stopCamera();
              setScannedResult(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'upload'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            {t.scannerModeUpload}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {!scannedResult ? (
            activeMode === 'camera' ? (
              <div className="space-y-3">
                <div className="relative aspect-square max-h-[300px] mx-auto rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border-2 border-indigo-500/30">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Target Aim overlay */}
                  <div className="absolute inset-8 border-2 border-dashed border-white/70 rounded-xl pointer-events-none flex items-center justify-center">
                    <div className="w-full h-0.5 bg-indigo-400/80 absolute animate-bounce" />
                  </div>

                  {!cameraActive && !cameraError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 text-xs">
                      <RefreshCw className="w-6 h-6 animate-spin mb-2" />
                      {t.cameraStarting}
                    </div>
                  )}
                </div>

                {cameraError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <span>{cameraError}</span>
                  </div>
                )}
                <p className="text-center text-xs text-slate-500">
                  {t.cameraHelp}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-colors text-center">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">
                      {t.uploadHelpTitle}
                    </span>
                    <span className="text-xs text-slate-500">
                      {t.uploadHelpSub}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )
          ) : (
            /* Scanned Result State */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.scanSuccess}</span>
                </div>
                {parsedInfo && (
                  <div className="text-xs font-semibold text-emerald-700 bg-white/80 px-2.5 py-1 rounded-md inline-block border border-emerald-100">
                    {t.categoryLabel} {parsedInfo.title}
                  </div>
                )}
                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 break-all max-h-36 overflow-y-auto">
                  {scannedResult}
                </div>
              </div>

              {/* Actions on Scanned Result */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  id="apply-scanned-to-editor-btn"
                  onClick={() => {
                    if (parsedInfo) {
                      onApplyDecoded(scannedResult, parsedInfo.type);
                    }
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  {t.useInEditor}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id="copy-scanned-btn"
                    onClick={async () => {
                      await navigator.clipboard.writeText(scannedResult);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? t.copiedText : t.copyText}
                  </button>

                  {isUrl ? (
                    <a
                      href={scannedResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.openExternal}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setScannedResult(null);
                        if (activeMode === 'camera') startCamera();
                      }}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t.scanAgain}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
