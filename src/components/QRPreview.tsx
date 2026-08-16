import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  ExternalLink,
  Info,
  Maximize2,
  FileCode,
  FileImage,
  Layers,
  Square,
} from 'lucide-react';
import { QRStyleConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const getFontFamilyCSS = (fontName?: string): string => {
  const font = fontName || 'Plus Jakarta Sans';
  switch (font) {
    case 'Playfair Display':
    case 'Merriweather':
      return `"${font}", Georgia, Cambria, 'Times New Roman', Times, serif`;
    case 'Roboto Mono':
      return `"${font}", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
    case 'Oswald':
      return `"${font}", Impact, 'Arial Narrow', sans-serif`;
    case 'Space Grotesk':
    case 'Outfit':
    case 'Montserrat':
    case 'Poppins':
    case 'Inter':
    case 'Plus Jakarta Sans':
    default:
      return `"${font}", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
  }
};

interface QRPreviewProps {
  payload: { raw: string; display: string; title: string };
  config: QRStyleConfig;
  onSaveToHistory: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ payload, config, onSaveToHistory }) => {
  const { t } = useLanguage();
  const qrRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [exportMode, setExportMode] = useState<'full' | 'qr_only'>('full');

  // Build qr-code-styling options
  const buildOptions = (targetSize?: number): Options => {
    const size = targetSize || 280;

    const dotsOptions: any = {
      type: config.dotType,
      color: config.dotColor,
    };

    if (config.gradient.enabled) {
      dotsOptions.gradient = {
        type: config.gradient.type,
        rotation: (config.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: config.gradient.color1 },
          { offset: 1, color: config.gradient.color2 },
        ],
      };
    }

    const cornersSquareOptions: any = {
      type: config.cornerSquareType,
      color: config.customCornerColors ? config.cornerSquareColor : config.dotColor,
    };

    const cornersDotOptions: any = {
      type: config.cornerDotType,
      color: config.customCornerColors ? config.cornerDotColor : config.dotColor,
    };

    const backgroundOptions: any = {
      color: config.isTransparentBg ? 'rgba(0,0,0,0)' : config.backgroundColor,
    };

    const imageOptions: any = {
      hideBackgroundDots: config.hideBackgroundDots,
      imageSize: config.logoSize,
      margin: config.logoMargin,
      crossOrigin: 'anonymous',
    };

    return {
      width: size,
      height: size,
      type: 'canvas',
      data: payload.raw || 'https://homielab.com',
      image: config.logoUrl || undefined,
      margin: config.margin ?? 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: config.errorCorrectionLevel,
      },
      imageOptions,
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions,
    };
  };

  // Initialize and update live QR code in DOM
  useEffect(() => {
    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling(buildOptions(280));
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCodeInstance.current.append(qrRef.current);
      }
    } else {
      qrCodeInstance.current.update(buildOptions(280));
    }
  }, [
    payload.raw,
    config.dotColor,
    config.backgroundColor,
    config.isTransparentBg,
    config.dotType,
    config.cornerSquareType,
    config.cornerDotType,
    config.customCornerColors,
    config.cornerSquareColor,
    config.cornerDotColor,
    config.gradient,
    config.errorCorrectionLevel,
    config.margin,
    config.logoUrl,
    config.logoSize,
    config.logoMargin,
    config.hideBackgroundDots,
  ]);

  // Trigger celebration confetti
  const fireConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
    });
  };

  // Generate composite high-resolution Canvas for export
  const createCompositeCanvas = async (targetSize: number): Promise<HTMLCanvasElement> => {
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
    } catch {
      // ignore font loading fallback
    }

    const qrSize = targetSize;
    const padding = (config.cardPadding ?? 20) * (targetSize / 280);
    const cornerRadius = (config.cardCornerRadius ?? 16) * (targetSize / 280);
    const borderWidth = (config.cardBorderWidth ?? 1) * (targetSize / 280);

    const hasTopHeading = !!config.topHeading && exportMode === 'full';
    const hasBottomCaption = !!config.bottomCaption && exportMode === 'full';

    const headingFontSize = (config.topHeadingSize || 18) * (targetSize / 280);
    const captionFontSize = (config.bottomCaptionSize || 13) * (targetSize / 280);

    const headingHeight = hasTopHeading ? headingFontSize * 1.8 + padding * 0.5 : 0;
    const captionHeight = hasBottomCaption ? captionFontSize * 1.8 + padding * 0.5 : 0;

    const totalWidth = qrSize + padding * 2;
    const totalHeight = qrSize + padding * 2 + headingHeight + captionHeight;

    const canvas = document.createElement('canvas');
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Enable high quality image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw Card Background with Corner Radius
    const x = borderWidth / 2;
    const y = borderWidth / 2;
    const w = totalWidth - borderWidth;
    const h = totalHeight - borderWidth;
    const r = Math.max(0, cornerRadius);

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    if (!config.isTransparentBg) {
      ctx.fillStyle = config.cardBgColor || '#ffffff';
      ctx.fill();
    }

    if (borderWidth > 0 && config.cardBorderColor) {
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = config.cardBorderColor;
      ctx.stroke();
    }

    let currentY = padding;

    // 2. Draw Top Heading
    if (hasTopHeading) {
      ctx.fillStyle = config.topHeadingColor || '#0f172a';
      const weight = config.topHeadingBold ?? true ? 'bold' : 'normal';
      const fontCSS = getFontFamilyCSS(config.topHeadingFont);
      ctx.font = `${weight} ${headingFontSize}px ${fontCSS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const text =
        config.topHeadingCase === 'uppercase'
          ? config.topHeading.toUpperCase()
          : config.topHeading;

      ctx.fillText(text, totalWidth / 2, currentY);
      currentY += headingHeight;
    }

    // 3. Render High-Res QR code
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    const exportQR = new QRCodeStyling({
      ...buildOptions(qrSize),
      type: 'canvas',
    });

    exportQR.append(tempContainer);

    // Wait a brief moment for QR canvas to render
    await new Promise((resolve) => setTimeout(resolve, 120));

    const qrCanvas = tempContainer.querySelector('canvas');
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, padding, currentY, qrSize, qrSize);
    }
    document.body.removeChild(tempContainer);
    currentY += qrSize;

    // 4. Draw Bottom Caption
    if (hasBottomCaption) {
      currentY += padding * 0.4;
      ctx.fillStyle = config.bottomCaptionColor || '#64748b';
      const weight = config.bottomCaptionBold ? 'bold' : 'normal';
      const fontCSS = getFontFamilyCSS(config.bottomCaptionFont);
      ctx.font = `${weight} ${captionFontSize}px ${fontCSS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const text =
        config.bottomCaptionCase === 'uppercase'
          ? config.bottomCaption.toUpperCase()
          : config.bottomCaption;

      ctx.fillText(text, totalWidth / 2, currentY);
    }

    return canvas;
  };

  // Handle Download (PNG / JPEG)
  const handleDownload = async (format: 'png' | 'jpeg') => {
    setDownloading(true);
    try {
      if (exportMode === 'full' && (config.topHeading || config.bottomCaption || config.cardCornerRadius || config.cardBorderWidth)) {
        const compositeCanvas = await createCompositeCanvas(config.size || 600);
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.${format}`;
        link.href = compositeCanvas.toDataURL(`image/${format}`, 0.95);
        link.click();
      } else {
        const exportQR = new QRCodeStyling({
          ...buildOptions(config.size || 600),
          type: 'canvas',
        });
        await exportQR.download({
          name: `qrcode-${Date.now()}`,
          extension: format,
        });
      }

      onSaveToHistory();
      fireConfetti();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Handle Download SVG
  const handleDownloadSvg = async () => {
    setDownloading(true);
    try {
      const exportQR = new QRCodeStyling({
        ...buildOptions(config.size || 600),
        type: 'svg',
      });

      if (exportMode === 'full' && (config.topHeading || config.bottomCaption)) {
        // Build SVG with wrapper and text
        const svgBlob = await exportQR.getRawData('svg');
        if (svgBlob) {
          const svgText = await (svgBlob as Blob).text();
          const targetSize = config.size || 600;
          const padding = (config.cardPadding ?? 20) * (targetSize / 280);
          const hasTop = !!config.topHeading;
          const hasBottom = !!config.bottomCaption;
          const headingSize = (config.topHeadingSize || 18) * (targetSize / 280);
          const captionSize = (config.bottomCaptionSize || 13) * (targetSize / 280);
          const headH = hasTop ? headingSize * 1.8 + padding * 0.5 : 0;
          const capH = hasBottom ? captionSize * 1.8 + padding * 0.5 : 0;
          const totalW = targetSize + padding * 2;
          const totalH = targetSize + padding * 2 + headH + capH;

          const topTextContent =
            config.topHeadingCase === 'uppercase'
              ? config.topHeading.toUpperCase()
              : config.topHeading;

          const bottomTextContent =
            config.bottomCaptionCase === 'uppercase'
              ? config.bottomCaption.toUpperCase()
              : config.bottomCaption;

          // Inner SVG without XML declaration
          const cleanInnerSvg = svgText.replace(/<\?xml.*?\?>/i, '');

          const fullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;family=Merriweather:wght@400;700&amp;family=Montserrat:wght@500;700&amp;family=Oswald:wght@500;700&amp;family=Outfit:wght@500;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@400;700&amp;family=Poppins:wght@500;700&amp;family=Roboto+Mono:wght@500;700&amp;family=Space+Grotesk:wght@500;700&amp;display=swap');
    .heading { font-family: ${getFontFamilyCSS(config.topHeadingFont)}; font-size: ${headingSize}px; font-weight: ${config.topHeadingBold ? 'bold' : 'normal'}; fill: ${config.topHeadingColor || '#0f172a'}; text-anchor: middle; }
    .caption { font-family: ${getFontFamilyCSS(config.bottomCaptionFont)}; font-size: ${captionSize}px; font-weight: ${config.bottomCaptionBold ? 'bold' : 'normal'}; fill: ${config.bottomCaptionColor || '#64748b'}; text-anchor: middle; }
  </style>
  <rect width="${totalW}" height="${totalH}" rx="${config.cardCornerRadius ?? 16}" fill="${config.isTransparentBg ? 'none' : config.cardBgColor || '#ffffff'}" stroke="${config.cardBorderColor || '#e2e8f0'}" stroke-width="${config.cardBorderWidth ?? 1}" />
  ${hasTop ? `<text x="${totalW / 2}" y="${padding + headingSize}" class="heading">${topTextContent}</text>` : ''}
  <g transform="translate(${padding}, ${padding + headH})">
    ${cleanInnerSvg}
  </g>
  ${hasBottom ? `<text x="${totalW / 2}" y="${totalH - padding * 0.4}" class="caption">${bottomTextContent}</text>` : ''}
</svg>`;

          const blob = new Blob([fullSvg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `qrcode-${Date.now()}.svg`;
          a.click();
          URL.revokeObjectURL(url);
        }
      } else {
        await exportQR.download({
          name: `qrcode-${Date.now()}`,
          extension: 'svg',
        });
      }

      onSaveToHistory();
      fireConfetti();
    } catch (err) {
      console.error('Download SVG error:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    try {
      const compositeCanvas = await createCompositeCanvas(config.size || 600);
      compositeCanvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          fireConfetti();
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (e) {
      console.error('Copy image failed, fallback to raw QR:', e);
      if (qrRef.current) {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob }),
              ]);
              setCopied(true);
              fireConfetti();
              setTimeout(() => setCopied(false), 2000);
            }
          });
        }
      }
    }
  };

  // Copy Raw Text / URL
  const handleCopyText = async () => {
    if (!payload.raw) return;
    try {
      await navigator.clipboard.writeText(payload.raw);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Print Card
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs sticky top-6 space-y-4"
      id="qr-preview-card"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            {t.previewTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {config.size}x{config.size}px
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {t.previewDynamicBadge}
          </span>
        </div>
      </div>

      {/* Export Mode Toggle */}
      <div className="flex items-center justify-between p-1.5 bg-slate-100/80 rounded-xl text-xs">
        <span className="text-[11px] font-semibold text-slate-600 pl-1">
          {t.exportModeLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setExportMode('full')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              exportMode === 'full'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.exportModeFull}
          </button>
          <button
            type="button"
            onClick={() => setExportMode('qr_only')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              exportMode === 'qr_only'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.exportModeQrOnly}
          </button>
        </div>
      </div>

      {/* Live Interactive QR Card Visual Container */}
      <div className="flex items-center justify-center p-3 bg-slate-100/60 rounded-2xl border border-slate-200/80">
        <div
          ref={cardContainerRef}
          className="transition-all duration-300 flex flex-col items-center justify-center max-w-full"
          style={{
            backgroundColor: config.isTransparentBg ? 'transparent' : config.cardBgColor || '#ffffff',
            borderRadius: `${config.cardCornerRadius ?? 16}px`,
            padding: `${config.cardPadding ?? 20}px`,
            border: `${config.cardBorderWidth ?? 1}px solid ${config.cardBorderColor || '#e2e8f0'}`,
            boxShadow: config.cardShadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.08)' : 'none',
          }}
        >
          {/* Top Heading */}
          {config.topHeading && exportMode === 'full' && (
            <div
              className="text-center w-full mb-3 px-2 tracking-tight transition-all"
              style={{
                fontFamily: getFontFamilyCSS(config.topHeadingFont),
                fontSize: `${config.topHeadingSize || 18}px`,
                fontWeight: config.topHeadingBold ? 700 : 500,
                color: config.topHeadingColor || '#0f172a',
                textTransform: config.topHeadingCase === 'uppercase' ? 'uppercase' : 'none',
              }}
            >
              {config.topHeading}
            </div>
          )}

          {/* QR Canvas */}
          <div
            ref={qrRef}
            className="flex items-center justify-center overflow-hidden shrink-0"
            style={{
              width: '280px',
              height: '280px',
            }}
          />

          {/* Bottom Caption */}
          {config.bottomCaption && exportMode === 'full' && (
            <div
              className="text-center w-full mt-3 px-2 transition-all"
              style={{
                fontFamily: getFontFamilyCSS(config.bottomCaptionFont),
                fontSize: `${config.bottomCaptionSize || 13}px`,
                fontWeight: config.bottomCaptionBold ? 700 : 400,
                color: config.bottomCaptionColor || '#64748b',
                textTransform: config.bottomCaptionCase === 'uppercase' ? 'uppercase' : 'none',
              }}
            >
              {config.bottomCaption}
            </div>
          )}
        </div>
      </div>

      {/* Payload Display Pill */}
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            {payload.title}
          </span>
          <button
            type="button"
            onClick={handleCopyText}
            className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer flex items-center gap-1"
          >
            {copiedText ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{t.copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{t.copyText}</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs font-mono text-slate-600 truncate" title={payload.display}>
          {payload.display}
        </p>
      </div>

      {/* Primary Action Buttons: PNG & SVG Downloads */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          id="btn-download-png"
          onClick={() => handleDownload('png')}
          disabled={downloading}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{t.downloadPng}</span>
        </button>

        <button
          type="button"
          id="btn-download-svg"
          onClick={handleDownloadSvg}
          disabled={downloading}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs sm:text-sm font-bold shadow-md shadow-slate-900/10 transition-all cursor-pointer disabled:opacity-50"
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>{t.downloadSvg}</span>
        </button>
      </div>

      {/* Secondary Quick Action Tools: Copy Image & Print */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          type="button"
          id="btn-copy-image"
          onClick={handleCopyImage}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">{t.copiedImage}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.copyImage}</span>
            </>
          )}
        </button>

        <button
          type="button"
          id="btn-print-qr"
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>{t.printQr}</span>
        </button>
      </div>
    </div>
  );
};
