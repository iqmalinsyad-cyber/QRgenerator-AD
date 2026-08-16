import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { TypeSelector } from './components/TypeSelector';
import { StyleCustomizer } from './components/StyleCustomizer';
import { QRPreview } from './components/QRPreview';
import { QRScannerModal } from './components/QRScannerModal';
import { HistoryDrawer } from './components/HistoryDrawer';

// Input Forms
import { UrlInput } from './components/InputForms/UrlInput';
import { TextInput } from './components/InputForms/TextInput';
import { WifiInput } from './components/InputForms/WifiInput';
import { VCardInput } from './components/InputForms/VCardInput';
import { EmailInput } from './components/InputForms/EmailInput';
import { PhoneInput } from './components/InputForms/PhoneInput';
import { SmsInput } from './components/InputForms/SmsInput';
import { WhatsAppInput } from './components/InputForms/WhatsAppInput';
import { SocialInput } from './components/InputForms/SocialInput';
import { EventInput } from './components/InputForms/EventInput';
import { CryptoInput } from './components/InputForms/CryptoInput';

import {
  QRContentType,
  QRFormState,
  QRStyleConfig,
  HistoryRecord,
  ThemePreset,
} from './types';
import { generateQRPayload } from './utils/qrPayloads';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle,
} from 'lucide-react';

const INITIAL_FORM_STATE: QRFormState = {
  type: 'url',
  url: 'https://homielab.com',
  text: 'Selamat datang ke Penjana Kod QR Dinamik!',
  wifi: {
    ssid: 'HomieLab_WiFi',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  vcard: {
    firstName: 'Iqmal',
    lastName: 'Insyad',
    phone: '+60123456789',
    email: 'iqmalinsyad@gmail.com',
    company: 'HomieLab Studio',
    title: 'Pereka Web',
    website: 'https://homielab.com',
    address: 'Kuala Lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    note: '',
  },
  email: {
    recipient: 'support@homielab.com',
    subject: 'Pertanyaan Laman Web',
    body: 'Hai, saya ingin mengetahui lebih lanjut mengenai perkhidmatan anda.',
  },
  phone: '+60123456789',
  sms: {
    phone: '+60123456789',
    message: 'Salam, saya berminat untuk menempah.',
  },
  whatsapp: {
    countryCode: '+60',
    phone: '123456789',
    message: 'Hai! Saya ingin bertanya tentang produk anda.',
  },
  social: {
    platform: 'instagram',
    username: 'homielab',
  },
  event: {
    title: 'Pelancaran Produk HomieLab',
    location: 'Kuala Lumpur Convention Centre',
    startDate: '2026-12-31T09:00',
    endDate: '2026-12-31T17:00',
    description: 'Sesi pengenalan alat digital terkini.',
  },
  crypto: {
    currency: 'bitcoin',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: '0.01',
    label: 'Pembayaran',
  },
};

const INITIAL_STYLE_CONFIG: QRStyleConfig = {
  dotColor: '#0f172a',
  backgroundColor: '#ffffff',
  isTransparentBg: false,
  dotType: 'square',
  cornerSquareType: 'square',
  cornerDotType: 'square',
  cornerSquareColor: '#0f172a',
  cornerDotColor: '#0f172a',
  customCornerColors: false,
  gradient: {
    enabled: false,
    type: 'linear',
    rotation: 45,
    color1: '#4338ca',
    color2: '#06b6d4',
  },
  errorCorrectionLevel: 'Q',
  size: 360,
  margin: 12,
  logoUrl: null,
  logoSize: 0.22,
  logoMargin: 4,
  hideBackgroundDots: true,
  topHeading: '',
  topHeadingFont: 'Plus Jakarta Sans',
  topHeadingSize: 18,
  topHeadingColor: '#0f172a',
  topHeadingBold: true,
  topHeadingCase: 'uppercase',
  bottomCaption: '',
  bottomCaptionFont: 'Plus Jakarta Sans',
  bottomCaptionSize: 13,
  bottomCaptionColor: '#64748b',
  bottomCaptionBold: false,
  bottomCaptionCase: 'none',
  cardBgColor: '#ffffff',
  cardBorderColor: '#e2e8f0',
  cardBorderWidth: 1,
  cardCornerRadius: 16,
  cardPadding: 20,
  cardShadow: false,
  moduleSize: 1.0,
};

function AppContent() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<QRFormState>(INITIAL_FORM_STATE);
  const [styleConfig, setStyleConfig] = useState<QRStyleConfig>(INITIAL_STYLE_CONFIG);
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('qr_studio_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qr_studio_history_v2', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to persist history:', e);
    }
  }, [history]);

  // Derived payload from form state
  const payload = generateQRPayload(formState);

  // Save current QR to history
  const handleSaveToHistory = () => {
    const record: HistoryRecord = {
      id: `gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      title: payload.title,
      type: formState.type,
      displayValue: payload.display,
      rawValue: payload.raw,
      styleConfig: { ...styleConfig },
      formState: JSON.parse(JSON.stringify(formState)),
      isScanned: false,
    };

    setHistory((prev) => [record, ...prev.slice(0, 49)]); // Keep latest 50
  };

  // Record a scanned QR code to history
  const handleRecordScanHistory = (decodedText: string) => {
    const record: HistoryRecord = {
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      title: `${t.badgeScanned}: ${decodedText.substring(0, 24)}...`,
      type: 'text',
      displayValue: decodedText,
      rawValue: decodedText,
      styleConfig: { ...styleConfig },
      formState: { ...formState, type: 'text', text: decodedText },
      isScanned: true,
    };

    setHistory((prev) => [record, ...prev.slice(0, 49)]);
  };

  // Load a record from history into the active editor
  const handleLoadRecord = (record: HistoryRecord) => {
    if (record.formState) {
      setFormState(record.formState);
    } else {
      setFormState({
        ...formState,
        type: record.type,
        url: record.type === 'url' ? record.rawValue : formState.url,
        text: record.type === 'text' ? record.rawValue : formState.text,
      });
    }

    if (record.styleConfig) {
      setStyleConfig(record.styleConfig);
    }
  };

  // Delete a single history item
  const handleDeleteRecord = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all history
  const handleClearAllHistory = () => {
    setHistory([]);
  };

  // Reset all settings to default
  const handleReset = () => {
    if (confirm(t.resetConfirm)) {
      setFormState(INITIAL_FORM_STATE);
      setStyleConfig(INITIAL_STYLE_CONFIG);
    }
  };

  // Apply theme preset
  const handleApplyPreset = (preset: ThemePreset) => {
    setStyleConfig((prev) => ({
      ...prev,
      dotColor: preset.dotColor,
      backgroundColor: preset.backgroundColor,
      dotType: preset.dotType,
      cornerSquareType: preset.cornerSquareType,
      cornerDotType: preset.cornerDotType,
      customCornerColors: preset.customCornerColors || false,
      cornerSquareColor: preset.cornerSquareColor || preset.dotColor,
      cornerDotColor: preset.cornerDotColor || preset.dotColor,
      gradient: preset.gradient || {
        enabled: false,
        type: 'linear',
        rotation: 45,
        color1: preset.dotColor,
        color2: '#06b6d4',
      },
    }));
  };

  // Apply scanned text into editor
  const handleApplyDecoded = (decodedText: string, type: QRContentType) => {
    setFormState((prev) => {
      if (type === 'url') return { ...prev, type: 'url', url: decodedText };
      if (type === 'phone') return { ...prev, type: 'phone', phone: decodedText.replace('tel:', '') };
      if (type === 'text') return { ...prev, type: 'text', text: decodedText };
      return { ...prev, type: 'text', text: decodedText };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation with Language Switcher */}
      <Navbar
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        historyCount={history.length}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Intro banner */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.bannerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {t.bannerDesc}
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              {t.badgeSvgPng}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.badgeFree}
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Editor on Left, Live Sticky Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: QR Content Selector + Form Inputs + Style Customizer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Content Type Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <TypeSelector
                activeType={formState.type}
                onSelect={(type) => setFormState({ ...formState, type })}
              />

              {/* Dynamic Input Form for selected type */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                {formState.type === 'url' && (
                  <UrlInput
                    value={formState.url}
                    onChange={(url) => setFormState({ ...formState, url })}
                  />
                )}

                {formState.type === 'text' && (
                  <TextInput
                    value={formState.text}
                    onChange={(text) => setFormState({ ...formState, text })}
                  />
                )}

                {formState.type === 'wifi' && (
                  <WifiInput
                    data={formState.wifi}
                    onChange={(wifi) => setFormState({ ...formState, wifi })}
                  />
                )}

                {formState.type === 'vcard' && (
                  <VCardInput
                    data={formState.vcard}
                    onChange={(vcard) => setFormState({ ...formState, vcard })}
                  />
                )}

                {formState.type === 'email' && (
                  <EmailInput
                    data={formState.email}
                    onChange={(email) => setFormState({ ...formState, email })}
                  />
                )}

                {formState.type === 'phone' && (
                  <PhoneInput
                    value={formState.phone}
                    onChange={(phone) => setFormState({ ...formState, phone })}
                  />
                )}

                {formState.type === 'sms' && (
                  <SmsInput
                    data={formState.sms}
                    onChange={(sms) => setFormState({ ...formState, sms })}
                  />
                )}

                {formState.type === 'whatsapp' && (
                  <WhatsAppInput
                    data={formState.whatsapp}
                    onChange={(whatsapp) => setFormState({ ...formState, whatsapp })}
                  />
                )}

                {formState.type === 'social' && (
                  <SocialInput
                    data={formState.social}
                    onChange={(social) => setFormState({ ...formState, social })}
                  />
                )}

                {formState.type === 'event' && (
                  <EventInput
                    data={formState.event}
                    onChange={(event) => setFormState({ ...formState, event })}
                  />
                )}

                {formState.type === 'crypto' && (
                  <CryptoInput
                    data={formState.crypto}
                    onChange={(crypto) => setFormState({ ...formState, crypto })}
                  />
                )}
              </div>
            </div>

            {/* Step 2: Visual Style Customizer */}
            <StyleCustomizer
              config={styleConfig}
              onChange={(newConfig) => setStyleConfig(newConfig)}
              onApplyPreset={handleApplyPreset}
            />
          </div>

          {/* Right Column: Live Sticky QR Preview & Download Controller */}
          <div className="lg:col-span-5">
            <QRPreview
              payload={payload}
              config={styleConfig}
              onSaveToHistory={handleSaveToHistory}
            />

            {/* Feature checklist card */}
            <div className="mt-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                {t.featuresHeading}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t.featureSvg}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t.featurePng}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t.featureColor}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t.featureScanner}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">
            {t.footerTitle}
          </p>
          <p>
            {t.footerSub}
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onApplyDecoded={handleApplyDecoded}
        onRecordScanHistory={handleRecordScanHistory}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadRecord={handleLoadRecord}
        onDeleteRecord={handleDeleteRecord}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
