import React, { useState } from 'react';
import {
  History,
  X,
  Trash2,
  Download,
  RotateCcw,
  Copy,
  Check,
  Search,
  ScanLine,
  Sparkles,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { HistoryRecord } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryRecord[];
  onLoadRecord: (record: HistoryRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onLoadRecord,
  onDeleteRecord,
  onClearAll,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'generated' | 'scanned'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (filterType === 'generated' && item.isScanned) return false;
    if (filterType === 'scanned' && !item.isScanned) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.rawValue.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs"
      id="history-drawer-overlay"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                {t.historyTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {history.length} {t.historySubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-history-drawer-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter bar */}
        <div className="p-3 border-b border-slate-100 space-y-2 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchHistoryPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between gap-1">
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.filterAll} ({history.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('generated')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  filterType === 'generated'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.filterGenerated}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('scanned')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  filterType === 'scanned'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.filterScanned}
              </button>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                id="clear-all-history-btn"
                onClick={() => {
                  if (confirm(t.clearAllConfirm)) {
                    onClearAll();
                  }
                }}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                {t.clearAll}
              </button>
            )}
          </div>
        </div>

        {/* Record list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <History className="w-12 h-12 stroke-1 mb-2 opacity-40" />
              <p className="font-semibold text-slate-600 text-sm">
                {t.noHistoryTitle}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                {t.noHistoryDesc}
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isUrl =
                item.rawValue.startsWith('http://') ||
                item.rawValue.startsWith('https://');

              return (
                <div
                  key={item.id}
                  id={`history-item-${item.id}`}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-xs transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          item.isScanned
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {item.isScanned ? t.badgeScanned : item.type}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteRecord(item.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                      title="Padam / Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                      {item.rawValue}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadRecord(item);
                        onClose();
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      {t.reloadRecord}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.rawValue)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs transition-colors"
                      title={t.copyText}
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isUrl && (
                      <a
                        href={item.rawValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs transition-colors"
                        title={t.openExternal}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
