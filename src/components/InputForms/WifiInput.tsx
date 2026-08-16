import React, { useState } from 'react';
import { Wifi, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { WifiData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface WifiInputProps {
  data: WifiData;
  onChange: (val: WifiData) => void;
}

export const WifiInput: React.FC<WifiInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const updateField = <K extends keyof WifiData>(key: K, val: WifiData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-4" id="wifi-input-container">
      {/* SSID */}
      <div>
        <label htmlFor="wifi-ssid" className="block text-sm font-semibold text-slate-700 mb-1.5">
          {t.wifiSsid}
        </label>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Wifi className="w-5 h-5 text-sky-500" />
          </div>
          <input
            id="wifi-ssid"
            type="text"
            value={data.ssid}
            onChange={(e) => updateField('ssid', e.target.value)}
            placeholder={t.wifiSsidPlaceholder}
            className="block w-full pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Encryption Type */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {t.wifiEncryption}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'WPA', label: 'WPA/WPA2/WPA3', desc: t.wifiEncWpa },
            { id: 'WEP', label: 'WEP', desc: t.wifiEncWep },
            { id: 'nopass', label: 'Tiada / None', desc: t.wifiEncNone },
          ].map((enc) => (
            <button
              key={enc.id}
              type="button"
              id={`wifi-enc-${enc.id}`}
              onClick={() => updateField('encryption', enc.id as any)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                data.encryption === enc.id
                  ? 'bg-sky-50 border-sky-500 text-sky-900 ring-1 ring-sky-500 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{enc.label}</div>
              <div className="text-[10px] text-slate-500 truncate">{enc.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Password (if not nopass) */}
      {data.encryption !== 'nopass' && (
        <div>
          <label htmlFor="wifi-pass" className="block text-sm font-semibold text-slate-700 mb-1.5">
            {t.wifiPass}
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              id="wifi-pass"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder={t.wifiPassPlaceholder}
              className="block w-full pl-11 pr-11 py-3 text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Hidden network checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="wifi-hidden"
          type="checkbox"
          checked={data.hidden}
          onChange={(e) => updateField('hidden', e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
        />
        <label htmlFor="wifi-hidden" className="text-xs font-semibold text-slate-700 cursor-pointer">
          {t.wifiHidden}
        </label>
      </div>

      {/* Helper tips */}
      <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-sky-800 space-y-1">
        <p className="flex items-start gap-1.5">
          <Shield className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <span>{t.wifiTip}</span>
        </p>
      </div>
    </div>
  );
};
