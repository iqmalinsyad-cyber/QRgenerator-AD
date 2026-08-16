import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3" id="phone-input-container">
      <label htmlFor="phone-field" className="block text-sm font-semibold text-slate-700">
        {t.phoneLabel}
      </label>
      <div className="relative rounded-xl shadow-xs">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <PhoneCall className="w-5 h-5 text-teal-500" />
        </div>
        <input
          id="phone-field"
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.phonePlaceholder}
          className="block w-full pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base font-medium"
        />
      </div>
      <p className="text-xs text-slate-500">
        {t.phoneHelper}
      </p>
    </div>
  );
};
