import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { SmsData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface SmsInputProps {
  data: SmsData;
  onChange: (val: SmsData) => void;
}

export const SmsInput: React.FC<SmsInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3.5" id="sms-input-container">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.smsPhone}
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-cyan-500 absolute left-3 top-3" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+60123456789"
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.smsMessage}
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={data.message}
            onChange={(e) => onChange({ ...data, message: e.target.value })}
            placeholder={t.smsPlaceholder}
            className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
