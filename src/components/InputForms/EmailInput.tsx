import React from 'react';
import { Mail, Type, AlignLeft } from 'lucide-react';
import { EmailData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface EmailInputProps {
  data: EmailData;
  onChange: (val: EmailData) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const updateField = <K extends keyof EmailData>(key: K, val: EmailData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-3.5" id="email-input-container">
      {/* Recipient */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.emailRecipient}
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-indigo-500 absolute left-3 top-3" />
          <input
            type="email"
            value={data.recipient}
            onChange={(e) => updateField('recipient', e.target.value)}
            placeholder={t.emailRecipientPlaceholder}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.emailSubject}
        </label>
        <div className="relative">
          <Type className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={data.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            placeholder={t.emailSubjectPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.emailBody}
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={data.body}
            onChange={(e) => updateField('body', e.target.value)}
            placeholder={t.emailBodyPlaceholder}
            className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
