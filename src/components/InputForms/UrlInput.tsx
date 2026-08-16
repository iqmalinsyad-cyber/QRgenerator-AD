import React from 'react';
import { Globe, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface UrlInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: 'https://', prefix: 'https://' },
    { label: 'homielab.com', prefix: 'https://homielab.com' },
    { label: 'google.com', prefix: 'https://google.com' },
    { label: 'instagram.com/', prefix: 'https://instagram.com/' },
  ];

  return (
    <div className="space-y-4" id="url-input-container">
      <div>
        <label htmlFor="url-field" className="block text-sm font-semibold text-slate-700 mb-1.5">
          {t.urlLabel}
        </label>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Globe className="w-5 h-5 text-indigo-500" />
          </div>
          <input
            id="url-field"
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t.urlPlaceholder}
            className="block w-full pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base font-medium"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          {t.urlHelper}
        </p>
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
          {t.quickLinks}
        </span>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              id={`quick-link-${item.label}`}
              onClick={() => onChange(item.prefix)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 transition-colors"
            >
              <LinkIcon className="w-3 h-3 text-indigo-500" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
