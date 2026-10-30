import React from 'react';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface JoinCardProps {
  onOpenJoin: () => void;
  language?: Language;
}

export const JoinCard: React.FC<JoinCardProps> = ({
  onOpenJoin,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#041427]/85 backdrop-blur-xl border border-cyan-700/30 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[380px] shadow-[0_10px_25px_rgba(2,8,20,0.5)] ${
        isLtr ? 'text-left' : 'text-right'
      }`}
    >
      {/* Background decorative silhouette leaves / motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full object-cover scale-150 transform translate-y-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 200 400 C 150 250 80 180 0 160 C 120 160 200 240 200 400 Z"
            fill="#38bdf8"
          />
          <path
            d="M 200 400 C 250 250 320 180 400 160 C 280 160 200 240 200 400 Z"
            fill="#f97316"
          />
        </svg>
      </div>

      <div>
        {/* Top Community Icon */}
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#f97316] mb-5">
          <Users className="w-6 h-6" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl sm:text-[26px] font-black text-white leading-tight mb-3">
          <span className="text-[#f97316]">{t.joinCard.prefix}</span>
          <br />
          <span>{t.joinCard.headline}</span>
        </h3>

        {/* Description paragraph */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
          {t.joinCard.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={onOpenJoin}
          className="btn-orange-gradient w-full sm:w-auto px-7 py-3 rounded-full text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 cursor-pointer group shadow-lg transition-transform hover:scale-[1.02]"
        >
          <span>{t.joinCard.button}</span>
          {isLtr ? (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          )}
        </button>
      </div>
    </div>
  );
};
