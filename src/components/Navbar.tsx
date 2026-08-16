import React, { useState, useRef, useEffect } from 'react';
import {
  QrCode,
  ScanLine,
  History,
  RotateCcw,
  Languages,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenScanner: () => void;
  onOpenHistory: () => void;
  onReset: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScanner,
  onOpenHistory,
  onReset,
  historyCount,
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0 p-1">
              <img
                src="https://lh3.googleusercontent.com/d/198r4DfNb4jDUBy7RjryG9GEBoDMB8nhg"
                alt="Aidee Creatives Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<svg class="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/></svg>';
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight">
                  {t.appTitle}
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md tracking-wider">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Selector (Default Bahasa Melayu, click to switch to English) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="language-switcher-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                  language === 'en'
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-800 border-indigo-200'
                }`}
                title="Tukar Bahasa / Change Language"
              >
                <Languages className="w-4 h-4 text-indigo-600" />
                <span className="flex items-center gap-1">
                  {language === 'ms' ? (
                    <>
                      <span>🇲🇾</span>
                      <span className="hidden sm:inline">BM</span>
                      <span className="sm:hidden font-extrabold">BM</span>
                    </>
                  ) : (
                    <>
                      <span>🇬🇧</span>
                      <span className="hidden sm:inline">EN</span>
                      <span className="sm:hidden font-extrabold">EN</span>
                    </>
                  )}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                    isLangMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Language Selection Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Pilihan Bahasa / Language
                  </div>

                  {/* Bahasa Melayu (Utama) */}
                  <button
                    type="button"
                    id="lang-option-ms"
                    onClick={() => {
                      setLanguage('ms');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                      language === 'ms'
                        ? 'bg-indigo-50 text-indigo-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇲🇾</span>
                      <div>
                        <div className="font-semibold">Bahasa Melayu</div>
                        <div className="text-[10px] text-slate-400">Bahasa Utama</div>
                      </div>
                    </div>
                    {language === 'ms' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>

                  {/* English */}
                  <button
                    type="button"
                    id="lang-option-en"
                    onClick={() => {
                      setLanguage('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-indigo-50 text-indigo-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇬🇧</span>
                      <div>
                        <div className="font-semibold">English</div>
                        <div className="text-[10px] text-slate-400">Switch to EN</div>
                      </div>
                    </div>
                    {language === 'en' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Scanner button */}
            <button
              type="button"
              id="open-scanner-nav-btn"
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer shadow-2xs"
            >
              <ScanLine className="w-4 h-4 text-indigo-600" />
              <span>{t.scanQrBtn}</span>
            </button>

            {/* History button */}
            <button
              type="button"
              id="open-history-nav-btn"
              onClick={onOpenHistory}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
            >
              <History className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">{t.historyBtn}</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px] font-extrabold">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Reset button */}
            <button
              type="button"
              id="reset-form-nav-btn"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              title={t.resetTooltip}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
