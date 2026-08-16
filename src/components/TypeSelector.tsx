import React from 'react';
import {
  Globe,
  AlignLeft,
  Wifi,
  Contact,
  Mail,
  PhoneCall,
  MessageSquare,
  MessageCircle,
  Share2,
  Calendar,
  Coins,
} from 'lucide-react';
import { QRContentType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TypeSelectorProps {
  activeType: QRContentType;
  onSelect: (type: QRContentType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ activeType, onSelect }) => {
  const { language, t } = useLanguage();

  const QR_TYPES: {
    id: QRContentType;
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badge?: string;
  }[] = [
    {
      id: 'url',
      label: t.type_url,
      subLabel: t.type_url_sub,
      icon: Globe,
      accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: language === 'ms' ? 'Popular' : 'Popular',
    },
    {
      id: 'text',
      label: t.type_text,
      subLabel: t.type_text_sub,
      icon: AlignLeft,
      accentColor: 'text-slate-700 bg-slate-100 border-slate-200',
    },
    {
      id: 'wifi',
      label: t.type_wifi,
      subLabel: t.type_wifi_sub,
      icon: Wifi,
      accentColor: 'text-sky-600 bg-sky-50 border-sky-200',
      badge: language === 'ms' ? 'Pantas' : 'Fast',
    },
    {
      id: 'whatsapp',
      label: t.type_whatsapp,
      subLabel: t.type_whatsapp_sub,
      icon: MessageCircle,
      accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'Hot',
    },
    {
      id: 'vcard',
      label: t.type_vcard,
      subLabel: t.type_vcard_sub,
      icon: Contact,
      accentColor: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      id: 'email',
      label: t.type_email,
      subLabel: t.type_email_sub,
      icon: Mail,
      accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'phone',
      label: t.type_phone,
      subLabel: t.type_phone_sub,
      icon: PhoneCall,
      accentColor: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      id: 'sms',
      label: t.type_sms,
      subLabel: t.type_sms_sub,
      icon: MessageSquare,
      accentColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    },
    {
      id: 'social',
      label: t.type_social,
      subLabel: t.type_social_sub,
      icon: Share2,
      accentColor: 'text-pink-600 bg-pink-50 border-pink-200',
    },
    {
      id: 'event',
      label: t.type_event,
      subLabel: t.type_event_sub,
      icon: Calendar,
      accentColor: 'text-orange-600 bg-orange-50 border-orange-200',
    },
    {
      id: 'crypto',
      label: t.type_crypto,
      subLabel: t.type_crypto_sub,
      icon: Coins,
      accentColor: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div className="w-full" id="type-selector-container">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t.chooseContentType}
        </label>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {t.availableFormats}
        </span>
      </div>

      {/* Horizontal scroll on mobile / responsive grid on tablet & desktop */}
      <div className="flex overflow-x-auto pb-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 scrollbar-thin">
        {QR_TYPES.map((typeItem) => {
          const Icon = typeItem.icon;
          const isActive = activeType === typeItem.id;

          return (
            <button
              key={typeItem.id}
              type="button"
              id={`type-btn-${typeItem.id}`}
              onClick={() => onSelect(typeItem.id)}
              className={`flex-shrink-0 min-w-[130px] sm:min-w-0 flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all relative group cursor-pointer ${
                isActive
                  ? 'bg-indigo-50/80 border-indigo-500 shadow-xs ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              <div
                className={`p-2 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-bold truncate block ${
                      isActive ? 'text-indigo-900' : 'text-slate-800'
                    }`}
                  >
                    {typeItem.label}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 truncate block">
                  {typeItem.subLabel}
                </span>
              </div>

              {typeItem.badge && (
                <span
                  className={`absolute top-1.5 right-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-indigo-200 text-indigo-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {typeItem.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
