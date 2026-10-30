import React from 'react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  subtitle?: string;
  language?: Language;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  subtitle,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12 sm:w-13 sm:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const titleSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-black',
    lg: 'text-xl sm:text-2xl font-black',
    xl: 'text-2xl sm:text-3xl font-black',
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-xs tracking-wide',
    lg: 'text-sm tracking-wide',
    xl: 'text-base tracking-wide',
  };

  const displaySubtitle = subtitle || t.tagline;

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Official Transparent Club Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        {/* Subtle warm backlight glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 to-orange-500/15 blur-sm opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <img
          src="/assets/aistudio/Youth_Creativity_Club_Emblem_41b52108.png"
          alt={t.clubName}
          className="relative z-10 w-full h-full object-cover rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.35)] border border-amber-400/40"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      <div className={`flex flex-col leading-tight ${isLtr ? 'text-left' : 'text-right'}`}>
        <span className={`text-white tracking-tight ${titleSizes[size]} font-bold group-hover:text-amber-100 transition-colors`}>
          {t.clubName}
        </span>
        {showTagline && (
          <span className={`text-[#f97316] font-semibold mt-0.5 ${subtitleSizes[size]}`}>
            {displaySubtitle}
          </span>
        )}
      </div>
    </div>
  );
};
