import React from 'react';
import { Calendar, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { FEATURED_EVENT, EventItem } from '../data/clubData.ts';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface EventsCardProps {
  onRegisterEvent: (event: EventItem) => void;
  onViewAllEvents: () => void;
  language?: Language;
}

export const EventsCard: React.FC<EventsCardProps> = ({
  onRegisterEvent,
  onViewAllEvents,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';
  const feat = t.eventsCard.featured;

  const event: EventItem = {
    ...FEATURED_EVENT,
    title: feat.title,
    day: feat.day,
    month: feat.month,
    year: feat.year,
    location: feat.location,
    description: feat.description,
    price: feat.price,
    duration: feat.duration,
    schedule: feat.schedule,
  };

  return (
    <div
      className={`rounded-2xl bg-[#041427]/85 backdrop-blur-xl border border-cyan-700/30 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[380px] shadow-[0_10px_25px_rgba(2,8,20,0.5)] ${
        isLtr ? 'text-left' : 'text-right'
      }`}
    >
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-800/30">
          {/* Calendar Icon + Title */}
          <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>{t.eventsCard.title}</span>
          </div>

          {/* View All Link */}
          <button
            onClick={onViewAllEvents}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span>{t.eventsCard.viewAll}</span>
            {isLtr ? (
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            )}
          </button>
        </div>

        {/* Featured Event Card */}
        <div className="flex flex-col">
          {/* Image Container with Orange Date Badge */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] mb-3.5 border border-cyan-800/40 group">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient at bottom of photo for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Date Badge */}
            <div
              className={`absolute top-2.5 ${
                isLtr ? 'left-2.5' : 'right-2.5'
              } bg-[#ea580c] text-white px-2.5 py-1 rounded-lg text-center shadow-lg font-bold flex flex-col items-center justify-center min-w-[42px] leading-tight`}
            >
              <span className="text-base sm:text-lg font-black leading-none">{event.day}</span>
              <span className="text-[10px] sm:text-xs font-semibold leading-tight">{event.month}</span>
              <span className="text-[9px] font-normal opacity-90 leading-none">{event.year}</span>
            </div>
          </div>

          {/* Event Title */}
          <h4 className="text-base sm:text-lg font-extrabold text-white mb-1.5 hover:text-cyan-300 transition-colors">
            {event.title}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>
      </div>

      {/* Register Button */}
      <div className="pt-2">
        <button
          onClick={() => onRegisterEvent(event)}
          className="btn-orange-gradient w-full py-2.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-95"
        >
          <span>{feat.button}</span>
          {isLtr ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
