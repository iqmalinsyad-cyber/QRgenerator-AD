import React from 'react';
import { AlignLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3" id="text-input-container">
      <div className="flex justify-between items-center">
        <label htmlFor="text-field" className="block text-sm font-semibold text-slate-700">
          {t.textLabel}
        </label>
        <span className="text-xs text-slate-400 font-mono">
          {value.length} {t.textChars}
        </span>
      </div>

      <div className="relative rounded-xl shadow-xs">
        <textarea
          id="text-field"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.textPlaceholder}
          className="block w-full p-3.5 text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-normal resize-y min-h-[110px]"
        />
      </div>

      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <AlignLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>{t.textHelper}</span>
      </p>
    </div>
  );
};
