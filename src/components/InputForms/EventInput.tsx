import React from 'react';
import { Calendar, MapPin, AlignLeft } from 'lucide-react';
import { EventData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface EventInputProps {
  data: EventData;
  onChange: (val: EventData) => void;
}

export const EventInput: React.FC<EventInputProps> = ({ data, onChange }) => {
  const { t } = useLanguage();

  const updateField = <K extends keyof EventData>(key: K, val: EventData[K]) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-3.5" id="event-input-container">
      {/* Event Title */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.eventTitle}
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-orange-500 absolute left-3 top-3" />
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder={t.eventTitlePlaceholder}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.eventStart}
          </label>
          <input
            type="datetime-local"
            value={data.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t.eventEnd}
          </label>
          <input
            type="datetime-local"
            value={data.endDate}
            onChange={(e) => updateField('endDate', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.eventLocation}
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder={t.eventLocationPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          {t.eventDesc}
        </label>
        <textarea
          rows={2}
          value={data.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder={t.eventDescPlaceholder}
          className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y"
        />
      </div>
    </div>
  );
};
