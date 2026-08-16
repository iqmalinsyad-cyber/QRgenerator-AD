import React from 'react';
import { Coins, Wallet } from 'lucide-react';
import { CryptoData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface CryptoInputProps {
  data: CryptoData;
  onChange: (val: CryptoData) => void;
}

export const CryptoInput: React.FC<CryptoInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const currencies = [
    { id: 'bitcoin', name: 'Bitcoin (BTC)', prefix: 'bitcoin:' },
    { id: 'ethereum', name: 'Ethereum (ETH)', prefix: 'ethereum:' },
    { id: 'solana', name: 'Solana (SOL)', prefix: 'solana:' },
    { id: 'usdt', name: 'Tether (USDT)', prefix: 'usdt:' },
    { id: 'tron', name: 'TRON (TRX)', prefix: 'tron:' },
  ];

  return (
    <div className="space-y-3.5" id="crypto-input-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.cryptoCurrency}
          </label>
          <select
            value={data.currency}
            onChange={(e) => onChange({ ...data, currency: e.target.value as any })}
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
          >
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.cryptoAmount}
          </label>
          <input
            type="number"
            step="any"
            value={data.amount || ''}
            onChange={(e) => onChange({ ...data, amount: e.target.value })}
            placeholder="0.05"
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.cryptoAddress}
        </label>
        <div className="relative">
          <Wallet className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            placeholder={t.cryptoAddressPlaceholder}
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm font-mono bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
