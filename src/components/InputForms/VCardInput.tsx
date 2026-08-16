import React from 'react';
import { User, Phone, Mail, Building, Briefcase, Globe, MapPin, FileText } from 'lucide-react';
import { VCardData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface VCardInputProps {
  data: VCardData;
  onChange: (val: VCardData) => void;
}

export const VCardInput: React.FC<VCardInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const updateField = <K extends keyof VCardData>(key: K, val: VCardData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-3.5" id="vcard-input-container">
      {/* Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardFname}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="cth: Iqmal"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardLname}
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="cth: Insyad"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardPhone}
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+60123456789"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardEmail}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="nama@syarikat.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Company & Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardCompany}
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={data.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder="HomieLab Studio"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardTitle}
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Pereka Web / Pengasas"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Website & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardWebsite}
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="url"
              value={data.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://homielab.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.vcardAddress}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={data.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Kuala Lumpur, Malaysia"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.vcardNote}
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={data.note || ''}
            onChange={(e) => updateField('note', e.target.value)}
            placeholder={t.vcardNotePlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
