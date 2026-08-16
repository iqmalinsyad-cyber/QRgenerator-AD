import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Image as ImageIcon,
  Sliders,
  Type,
  LayoutGrid,
  Zap,
  Check,
  Upload,
  Trash2,
  Maximize2,
  Shield,
  Layers,
  Square,
  Circle,
} from 'lucide-react';
import {
  QRStyleConfig,
  DotType,
  CornerSquareType,
  CornerDotType,
  FontFamily,
  ErrorCorrectionLevel,
  ThemePreset,
} from '../types';
import { THEME_PRESETS, PRESET_ICONS } from '../utils/presets';
import { useLanguage } from '../context/LanguageContext';

interface StyleCustomizerProps {
  config: QRStyleConfig;
  onChange: (newConfig: QRStyleConfig) => void;
  onApplyPreset: (preset: ThemePreset) => void;
}

type TabType = 'presets' | 'shapes' | 'text' | 'layout' | 'colors' | 'logo';

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({
  config,
  onChange,
  onApplyPreset,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('presets');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const updateConfig = <K extends keyof QRStyleConfig>(key: K, val: QRStyleConfig[K]) => {
    onChange({ ...config, [key]: val });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateConfig('logoUrl', event.target.result as string);
          if (config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M') {
            updateConfig('errorCorrectionLevel', 'H');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Module Shape choices
  const dotPatterns: { id: DotType; label: string; preview: string; desc: string }[] = [
    { id: 'square', label: t.dotPatternSquare, preview: '■', desc: 'Klasik Standard' },
    { id: 'rounded', label: t.dotPatternRounded, preview: '●', desc: 'Bucu Melengkung' },
    { id: 'dots', label: t.dotPatternDots, preview: '•', desc: 'Bulatan Titik' },
    { id: 'extra-rounded', label: t.dotPatternExtraRounded, preview: '⬮', desc: 'Kapsul / Pill' },
    { id: 'classy', label: t.dotPatternClassy, preview: '◆', desc: 'Berlian Elegan' },
    { id: 'classy-rounded', label: t.dotPatternClassyRounded, preview: '✦', desc: 'Bintang Moden' },
  ];

  // Finder Frame (Corner Square Eye) choices
  const cornerSquares: { id: CornerSquareType; label: string; shapeSvg: string }[] = [
    { id: 'square', label: t.shapeSquare, shapeSvg: 'M3 3h18v18H3z' },
    { id: 'extra-rounded', label: t.shapeExtraRounded, shapeSvg: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z' },
    { id: 'dot', label: t.shapeDot, shapeSvg: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
  ];

  // Finder Center (Corner Dot Eye) choices
  const cornerDots: { id: CornerDotType; label: string }[] = [
    { id: 'square', label: t.shapeSquare },
    { id: 'dot', label: t.shapeDotOnly },
  ];

  // Font Family choices
  const fontFamilies: { id: FontFamily; label: string; fontStyle: string; sample: string }[] = [
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', fontStyle: "'Plus Jakarta Sans', sans-serif", sample: 'Moden & Bersih' },
    { id: 'Inter', label: 'Inter', fontStyle: "'Inter', sans-serif", sample: 'Teknikal & Rapi' },
    { id: 'Outfit', label: 'Outfit', fontStyle: "'Outfit', sans-serif", sample: 'Geometrik Premium' },
    { id: 'Montserrat', label: 'Montserrat', fontStyle: "'Montserrat', sans-serif", sample: 'Tegas & Berani' },
    { id: 'Poppins', label: 'Poppins', fontStyle: "'Poppins', sans-serif", sample: 'Mesra & Bulat' },
    { id: 'Playfair Display', label: 'Playfair Display', fontStyle: "'Playfair Display', serif", sample: 'Mewah Editorial' },
    { id: 'Merriweather', label: 'Merriweather', fontStyle: "'Merriweather', serif", sample: 'Klasik Berwibawa' },
    { id: 'Oswald', label: 'Oswald', fontStyle: "'Oswald', sans-serif", sample: 'Padat Impak' },
    { id: 'Roboto Mono', label: 'Roboto Mono', fontStyle: "'Roboto Mono', monospace", sample: 'Kod Monospace' },
    { id: 'Space Grotesk', label: 'Space Grotesk', fontStyle: "'Space Grotesk', sans-serif", sample: 'Futuristik Cyber' },
  ];

  const quickColors = [
    '#0f172a', '#1e293b', '#2563eb', '#4f46e5', '#7c3aed',
    '#db2777', '#dc2626', '#ea580c', '#d97706', '#059669',
    '#0284c7', '#0891b2', '#166534', '#831843', '#1e1b4b'
  ];

  const filteredPresets = selectedCategory === 'all'
    ? THEME_PRESETS
    : THEME_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs" id="style-customizer-card">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            {t.styleCustomizerTitle}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {t.styleCustomizerSub}
        </span>
      </div>

      {/* Tabs Header */}
      <div className="flex overflow-x-auto pb-1 gap-1.5 p-1 bg-slate-100/90 rounded-xl mb-4 text-xs font-semibold text-slate-600">
        {/* Presets */}
        <button
          type="button"
          id="tab-btn-presets"
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {t.tabPresets}
        </button>

        {/* Shapes & Corners */}
        <button
          type="button"
          id="tab-btn-shapes"
          onClick={() => setActiveTab('shapes')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'shapes'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-emerald-500" />
          {t.tabShapes}
        </button>

        {/* Text & Typography */}
        <button
          type="button"
          id="tab-btn-text"
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Type className="w-3.5 h-3.5 text-blue-500" />
          {t.tabText}
        </button>

        {/* Layout & Settings */}
        <button
          type="button"
          id="tab-btn-layout"
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'layout'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-teal-600" />
          {t.tabLayout}
        </button>

        {/* Colors & Gradients */}
        <button
          type="button"
          id="tab-btn-colors"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'colors'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-indigo-500" />
          {t.tabColors}
        </button>

        {/* Logo / Icon */}
        <button
          type="button"
          id="tab-btn-logo"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
            activeTab === 'logo'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
          {t.tabLogo}
        </button>
      </div>

      {/* TAB 1: PRESETS / STYLES (24+ Styles) */}
      {activeTab === 'presets' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-slate-500">
              {t.presetDescHelper}
            </p>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full self-start sm:self-auto">
              {THEME_PRESETS.length} Gaya Tersedia
            </span>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1 pb-2 border-b border-slate-100">
            {[
              { id: 'all', label: t.catAll },
              { id: 'gradient', label: t.catGradient },
              { id: 'luxury', label: t.catLuxury },
              { id: 'modern', label: t.catModern },
              { id: 'classic', label: t.catClassic },
              { id: 'minimal', label: t.catMinimal },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Preset Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected =
                config.dotColor === preset.dotColor &&
                config.backgroundColor === preset.backgroundColor &&
                config.dotType === preset.dotType &&
                config.cornerSquareType === preset.cornerSquareType;

              return (
                <button
                  key={preset.id}
                  type="button"
                  id={`preset-${preset.id}`}
                  onClick={() => onApplyPreset(preset)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                >
                  {/* Visual Color Orb */}
                  <div
                    className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center shadow-xs border border-black/10"
                    style={{
                      backgroundColor: preset.backgroundColor,
                      backgroundImage: preset.gradient?.enabled
                        ? `linear-gradient(${preset.gradient.rotation}deg, ${preset.gradient.color1}, ${preset.gradient.color2})`
                        : undefined,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-xs border border-white/60"
                      style={{
                        backgroundColor: preset.gradient?.enabled ? '#ffffff' : preset.dotColor,
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs truncate">
                        {preset.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {preset.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SHAPES & CORNERS (Module Shape, Finder Frame, Finder Center) */}
      {activeTab === 'shapes' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Module Shape */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
                {t.moduleShapeLabel}
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {config.dotType}
              </span>
            </div>
            <p className="text-xs text-slate-500">{t.moduleShapeDesc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dotPatterns.map((pattern) => {
                const isActive = config.dotType === pattern.id;
                return (
                  <button
                    key={pattern.id}
                    type="button"
                    id={`dot-pattern-${pattern.id}`}
                    onClick={() => updateConfig('dotType', pattern.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-xl leading-none">{pattern.preview}</span>
                    <span className="text-xs font-medium mt-0.5">{pattern.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Finder Frame (Corner Square Eye Box) */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Square className="w-3.5 h-3.5 text-blue-600" />
                {t.finderFrameLabel}
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {config.cornerSquareType}
              </span>
            </div>
            <p className="text-xs text-slate-500">{t.finderFrameDesc}</p>

            <div className="grid grid-cols-3 gap-2">
              {cornerSquares.map((sq) => {
                const isActive = config.cornerSquareType === sq.id;
                return (
                  <button
                    key={sq.id}
                    type="button"
                    id={`corner-square-${sq.id}`}
                    onClick={() => updateConfig('cornerSquareType', sq.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <svg className="w-6 h-6 fill-current text-indigo-600" viewBox="0 0 24 24">
                      <path d={sq.shapeSvg} />
                    </svg>
                    <span className="text-xs font-medium text-center">{sq.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Finder Center (Corner Dot Eye) */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Circle className="w-3.5 h-3.5 text-emerald-600" />
                {t.finderCenterLabel}
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {config.cornerDotType}
              </span>
            </div>
            <p className="text-xs text-slate-500">{t.finderCenterDesc}</p>

            <div className="grid grid-cols-2 gap-2">
              {cornerDots.map((dot) => {
                const isActive = config.cornerDotType === dot.id;
                return (
                  <button
                    key={dot.id}
                    type="button"
                    id={`corner-dot-${dot.id}`}
                    onClick={() => updateConfig('cornerDotType', dot.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-indigo-600 ${
                        dot.id === 'dot' ? 'rounded-full' : 'rounded-none'
                      }`}
                    />
                    <span className="text-xs font-medium">{dot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEXT & TYPOGRAPHY (Top Heading, Bottom Caption, Font Family) */}
      {activeTab === 'text' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.textSectionTitle}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.textSectionDesc}
            </p>
          </div>

          {/* 1. Add Top Heading */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                {t.topHeadingLabel}
              </label>
              {config.topHeading && (
                <button
                  type="button"
                  onClick={() => updateConfig('topHeading', '')}
                  className="text-[11px] text-red-500 hover:underline cursor-pointer"
                >
                  Padam
                </button>
              )}
            </div>

            <input
              type="text"
              id="top-heading-input"
              value={config.topHeading || ''}
              onChange={(e) => updateConfig('topHeading', e.target.value)}
              placeholder={t.topHeadingPlaceholder}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Quick Pill Suggestions */}
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">{t.quickHeadingIdeas}</span>
              {['IMBAS SAYA', 'SCAN ME', 'MENU RESTORAN', 'WIFI PERCUMA', 'BAYAR DI SINI'].map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => updateConfig('topHeading', pill)}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors cursor-pointer text-[10px]"
                >
                  +{pill}
                </button>
              ))}
            </div>

            {/* Top Heading Styling Controls */}
            {config.topHeading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/70">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {t.headingSizeLabel} ({config.topHeadingSize || 18}px)
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={36}
                    step={1}
                    value={config.topHeadingSize || 18}
                    onChange={(e) => updateConfig('topHeadingSize', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {t.headingColorLabel}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={config.topHeadingColor || '#0f172a'}
                      onChange={(e) => updateConfig('topHeadingColor', e.target.value)}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.topHeadingColor || '#0f172a'}
                      onChange={(e) => updateConfig('topHeadingColor', e.target.value)}
                      className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end pb-1 col-span-2 sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.topHeadingBold ?? true}
                      onChange={(e) => updateConfig('topHeadingBold', e.target.checked)}
                      className="rounded text-indigo-600 accent-indigo-600"
                    />
                    <span>{t.textBoldLabel}</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.topHeadingCase === 'uppercase'}
                      onChange={(e) =>
                        updateConfig('topHeadingCase', e.target.checked ? 'uppercase' : 'none')
                      }
                      className="rounded text-indigo-600 accent-indigo-600"
                    />
                    <span>{t.textUppercaseLabel}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 2. Add Bottom Caption */}
          <div className="space-y-3 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                {t.bottomCaptionLabel}
              </label>
              {config.bottomCaption && (
                <button
                  type="button"
                  onClick={() => updateConfig('bottomCaption', '')}
                  className="text-[11px] text-red-500 hover:underline cursor-pointer"
                >
                  Padam
                </button>
              )}
            </div>

            <input
              type="text"
              id="bottom-caption-input"
              value={config.bottomCaption || ''}
              onChange={(e) => updateConfig('bottomCaption', e.target.value)}
              placeholder={t.bottomCaptionPlaceholder}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Quick Pill Suggestions for Caption */}
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Cadangan:</span>
              {['Layari Laman Web Kami', 'Aidee Creatives', 'Diskaun 10% Hari Ini', 'Ikuti Kami di Instagram'].map(
                (pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => updateConfig('bottomCaption', pill)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors cursor-pointer text-[10px]"
                  >
                    +{pill}
                  </button>
                )
              )}
            </div>

            {/* Bottom Caption Styling Controls */}
            {config.bottomCaption && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/70">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {t.captionSizeLabel} ({config.bottomCaptionSize || 13}px)
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={26}
                    step={1}
                    value={config.bottomCaptionSize || 13}
                    onChange={(e) => updateConfig('bottomCaptionSize', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {t.captionColorLabel}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={config.bottomCaptionColor || '#64748b'}
                      onChange={(e) => updateConfig('bottomCaptionColor', e.target.value)}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.bottomCaptionColor || '#64748b'}
                      onChange={(e) => updateConfig('bottomCaptionColor', e.target.value)}
                      className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end pb-1 col-span-2 sm:col-span-1">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.bottomCaptionBold ?? false}
                      onChange={(e) => updateConfig('bottomCaptionBold', e.target.checked)}
                      className="rounded text-indigo-600 accent-indigo-600"
                    />
                    <span>{t.textBoldLabel}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 3. Font Family Selector */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
                {t.fontFamilyLabel}
              </label>
              <span className="text-[11px] text-indigo-700 font-semibold">
                {config.topHeadingFont || 'Plus Jakarta Sans'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {fontFamilies.map((font) => {
                const isSelected = (config.topHeadingFont || 'Plus Jakarta Sans') === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    id={`font-family-${font.id.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => {
                      updateConfig('topHeadingFont', font.id);
                      updateConfig('bottomCaptionFont', font.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span
                        className="text-sm font-bold text-slate-900 block"
                        style={{ fontFamily: font.fontStyle }}
                      >
                        {font.label}
                      </span>
                      <span
                        className="text-[11px] text-slate-500"
                        style={{ fontFamily: font.fontStyle }}
                      >
                        {font.sample}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LAYOUT & SETTINGS (Module size, Card corner radius, Size, Padding) */}
      {activeTab === 'layout' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.layoutSectionTitle}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.layoutSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Module Size (Dot scale) */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {t.moduleSizeLabel}
                </label>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {((config.moduleSize ?? 1.0) * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{t.moduleSizeDesc}</p>
              <input
                type="range"
                min={0.6}
                max={1.0}
                step={0.05}
                value={config.moduleSize ?? 1.0}
                onChange={(e) => updateConfig('moduleSize', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 2. Card Corner Radius */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {t.cardCornerRadiusLabel}
                </label>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {config.cardCornerRadius ?? 16}px
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{t.cardCornerRadiusDesc}</p>
              <input
                type="range"
                min={0}
                max={48}
                step={2}
                value={config.cardCornerRadius ?? 16}
                onChange={(e) => updateConfig('cardCornerRadius', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 3. Canvas Size (Resolution) */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {t.qrSizeLabel}
                </label>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {config.size} x {config.size} px
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1">
                {[
                  { label: '240px', val: 240 },
                  { label: '360px', val: 360 },
                  { label: '600px', val: 600 },
                  { label: '1200px', val: 1200 },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => updateConfig('size', s.val)}
                    className={`py-1 rounded text-xs font-medium border cursor-pointer ${
                      config.size === s.val
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Card Padding */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {t.cardPaddingLabel}
                </label>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {config.cardPadding ?? 20}px
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{t.cardPaddingDesc}</p>
              <input
                type="range"
                min={8}
                max={48}
                step={2}
                value={config.cardPadding ?? 20}
                onChange={(e) => updateConfig('cardPadding', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Card Border & Frame Styling */}
          <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-slate-800">
              Kustomasi Bingkai Kad (Card Border & Container)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  {t.cardBgLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.cardBgColor || '#ffffff'}
                    onChange={(e) => updateConfig('cardBgColor', e.target.value)}
                    className="w-7 h-7 rounded border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.cardBgColor || '#ffffff'}
                    onChange={(e) => updateConfig('cardBgColor', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  {t.cardBorderLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.cardBorderColor || '#e2e8f0'}
                    onChange={(e) => updateConfig('cardBorderColor', e.target.value)}
                    className="w-7 h-7 rounded border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.cardBorderColor || '#e2e8f0'}
                    onChange={(e) => updateConfig('cardBorderColor', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  {t.cardBorderWidthLabel} ({config.cardBorderWidth ?? 1}px)
                </label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={config.cardBorderWidth ?? 1}
                  onChange={(e) => updateConfig('cardBorderWidth', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Error Correction Level */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              {t.errorCorrectionLabel}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => {
                const ecLabels: Record<string, string> = {
                  L: 'L (7%)',
                  M: 'M (15%)',
                  Q: 'Q (25%)',
                  H: 'H (30%)',
                };
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateConfig('errorCorrectionLevel', lvl)}
                    className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      config.errorCorrectionLevel === lvl
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {ecLabels[lvl]}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{t.ecTip}</p>
          </div>
        </div>
      )}

      {/* TAB 5: COLORS & GRADIENTS */}
      {activeTab === 'colors' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Foreground Color */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">
              {t.fgColorLabel}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.dotColor}
                onChange={(e) => updateConfig('dotColor', e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={config.dotColor}
                onChange={(e) => updateConfig('dotColor', e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono w-28 uppercase"
              />
            </div>
            {/* Swatches */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => updateConfig('dotColor', color)}
                  className="w-6 h-6 rounded-md border border-black/10 transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                {t.bgColorLabel}
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isTransparentBg}
                  onChange={(e) => updateConfig('isTransparentBg', e.target.checked)}
                  className="rounded text-indigo-600 accent-indigo-600"
                />
                <span>{t.bgTransparent}</span>
              </label>
            </div>

            {!config.isTransparentBg && (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono w-28 uppercase"
                />
              </div>
            )}
          </div>

          {/* Gradient Controls */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {t.gradientEffect}
              </label>
              <label className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.gradient.enabled}
                  onChange={(e) =>
                    updateConfig('gradient', {
                      ...config.gradient,
                      enabled: e.target.checked,
                    })
                  }
                  className="rounded text-indigo-600 accent-indigo-600"
                />
                <span>{t.enableGradient}</span>
              </label>
            </div>

            {config.gradient.enabled && (
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      {t.gradColor1}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.gradient.color1}
                        onChange={(e) =>
                          updateConfig('gradient', {
                            ...config.gradient,
                            color1: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.gradient.color1}
                        onChange={(e) =>
                          updateConfig('gradient', {
                            ...config.gradient,
                            color1: e.target.value,
                          })
                        }
                        className="px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono w-20 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      {t.gradColor2}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.gradient.color2}
                        onChange={(e) =>
                          updateConfig('gradient', {
                            ...config.gradient,
                            color2: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.gradient.color2}
                        onChange={(e) =>
                          updateConfig('gradient', {
                            ...config.gradient,
                            color2: e.target.value,
                          })
                        }
                        className="px-2 py-1 text-xs bg-white border border-slate-200 rounded font-mono w-20 uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      {t.gradType}
                    </label>
                    <select
                      value={config.gradient.type}
                      onChange={(e) =>
                        updateConfig('gradient', {
                          ...config.gradient,
                          type: e.target.value as 'linear' | 'radial',
                        })
                      }
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="linear">{t.gradLinear}</option>
                      <option value="radial">{t.gradRadial}</option>
                    </select>
                  </div>

                  {config.gradient.type === 'linear' && (
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>{t.gradRotation}</span>
                        <span className="font-mono">{config.gradient.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={15}
                        value={config.gradient.rotation}
                        onChange={(e) =>
                          updateConfig('gradient', {
                            ...config.gradient,
                            rotation: Number(e.target.value),
                          })
                        }
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: LOGO / ICON */}
      {activeTab === 'logo' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Custom Upload */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              {t.uploadLogoLabel}
            </label>

            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 cursor-pointer transition-colors text-xs text-slate-600 font-medium">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>{t.chooseImageFile}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {config.logoUrl && (
                <button
                  type="button"
                  onClick={() => updateConfig('logoUrl', null)}
                  className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors cursor-pointer"
                  title={t.removeLogo}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Preset Icons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              {t.presetIconsLabel}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_ICONS.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => {
                    updateConfig('logoUrl', icon.svgDataUrl);
                    if (config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M') {
                      updateConfig('errorCorrectionLevel', 'H');
                    }
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    config.logoUrl === icon.svgDataUrl
                      ? 'border-indigo-600 bg-indigo-50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                  title={icon.name}
                >
                  <img src={icon.svgDataUrl} alt={icon.name} className="w-6 h-6 object-contain" />
                  <span className="text-[10px] text-slate-600 font-medium truncate w-full text-center">
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Logo Size and Settings */}
          {config.logoUrl && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{t.logoSizeLabel}</span>
                  <span className="font-mono">{(config.logoSize * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0.12}
                  max={0.35}
                  step={0.02}
                  value={config.logoSize}
                  onChange={(e) => updateConfig('logoSize', Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hideBackgroundDots}
                  onChange={(e) => updateConfig('hideBackgroundDots', e.target.checked)}
                  className="rounded text-indigo-600 accent-indigo-600"
                />
                <span>{t.hideDotsBehindLogo}</span>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
