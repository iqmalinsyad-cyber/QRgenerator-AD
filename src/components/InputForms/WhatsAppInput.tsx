import React from 'react';
import { MessageCircle, Phone, MessageSquare } from 'lucide-react';
import { WhatsAppData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface WhatsAppInputProps {
  data: WhatsAppData;
  onChange: (val: WhatsAppData) => void;
}

export const WhatsAppInput: React.FC<WhatsAppInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const updateField = <K extends keyof WhatsAppData>(key: K, val: WhatsAppData[K]) => {
    onChange({ ...data, [key]: val });
  };

  const fullPhone = `${data.countryCode.replace('+', '')}${data.phone.replace(/^0+/, '')}`;
  const previewUrl = `https://wa.me/${fullPhone}${
    data.message ? `?text=${encodeURIComponent(data.message)}` : ''
  }`;

  return (
    <div className="space-y-3.5" id="whatsapp-input-container">
      {/* Phone with Country Code */}
      <div className="grid grid-cols-3 gap-2.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.waCountryCode}
          </label>
          <select
            value={data.countryCode}
            onChange={(e) => updateField('countryCode', e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
          >
            <option value="+60">🇲🇾 +60 (MY)</option>
            <option value="+62">🇮🇩 +62 (ID)</option>
            <option value="+65">🇸🇬 +65 (SG)</option>
            <option value="+66">🇹🇭 +66 (TH)</option>
            <option value="+63">🇵🇭 +63 (PH)</option>
            <option value="+1">🇺🇸 +1 (US)</option>
            <option value="+44">🇬🇧 +44 (UK)</option>
            <option value="+61">🇦🇺 +61 (AU)</option>
            <option value="+966">🇸🇦 +966 (SA)</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.waPhone}
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="123456789"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pre-filled Message */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.waMessage}
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={data.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder={t.waMessagePlaceholder}
            className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Link Preview */}
      <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 truncate">
        <span className="font-bold">{t.waLinkPreview} </span>
        <code className="text-[11px] text-emerald-700">{previewUrl}</code>
      </div>
    </div>
  );
};
