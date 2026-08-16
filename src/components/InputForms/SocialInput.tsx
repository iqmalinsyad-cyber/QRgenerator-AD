import React from 'react';
import { Share2, AtSign } from 'lucide-react';
import { SocialData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface SocialInputProps {
  data: SocialData;
  onChange: (val: SocialData) => void;
}

export const SocialInput: React.FC<SocialInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const platforms = [
    { id: 'instagram', name: 'Instagram', prefix: 'instagram.com/' },
    { id: 'tiktok', name: 'TikTok', prefix: 'tiktok.com/@' },
    { id: 'youtube', name: 'YouTube', prefix: 'youtube.com/@' },
    { id: 'facebook', name: 'Facebook', prefix: 'facebook.com/' },
    { id: 'twitter', name: 'X / Twitter', prefix: 'x.com/' },
    { id: 'linkedin', name: 'LinkedIn', prefix: 'linkedin.com/in/' },
    { id: 'telegram', name: 'Telegram', prefix: 't.me/' },
    { id: 'github', name: 'GitHub', prefix: 'github.com/' },
  ];

  const currentPlatform = platforms.find((p) => p.id === data.platform) || platforms[0];

  return (
    <div className="space-y-3.5" id="social-input-container">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          {t.socialPlatformLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              id={`social-platform-${p.id}`}
              onClick={() => onChange({ ...data, platform: p.id as any })}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                data.platform === p.id
                  ? 'bg-pink-50 border-pink-500 text-pink-900 ring-1 ring-pink-500 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.socialUsername}
        </label>
        <div className="flex rounded-xl shadow-xs">
          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs font-mono">
            {currentPlatform.prefix}
          </span>
          <input
            type="text"
            value={data.username}
            onChange={(e) => onChange({ ...data, username: e.target.value.replace('@', '') })}
            placeholder={t.socialPlaceholder}
            className="block w-full min-w-0 flex-1 px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
