import React from 'react';
import {
  Heart,
  Palette,
  BookOpen,
  Laptop,
  Leaf,
  Camera,
  Users,
} from 'lucide-react';
import { ActivityItem, ACTIVITIES } from '../data/clubData.ts';
import { Language, TRANSLATIONS } from '../data/translations.ts';

// Soccer Ball SVG matching the screenshot
const SoccerBallIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m12 7-3.5 2.5 1.5 4h4l1.5-4z" />
    <path d="M12 2v5" />
    <path d="M21.5 9 17 9.5" />
    <path d="m18 19-4-2" />
    <path d="m6 19 4-2" />
    <path d="M2.5 9 7 9.5" />
  </svg>
);

// Scout Tent SVG matching the triangular tent icon in the screenshot
const ScoutingTentIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3L2 21H22L12 3Z" />
    <path d="M12 3V21" />
    <path d="M12 14L17 21" />
    <path d="M12 14L7 21" />
  </svg>
);

interface ActivitiesSectionProps {
  onSelectActivity: (activity: ActivityItem) => void;
  language?: Language;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  onSelectActivity,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;

  // Map icons to categories
  const getIcon = (id: string, colorClass: string) => {
    const size = 'w-6 h-6 sm:w-7 sm:h-7';
    switch (id) {
      case 'volunteering':
        return <Heart className={`${size} text-rose-400 fill-rose-500/20`} />;
      case 'artistic':
        return <Palette className={`${size} text-fuchsia-400`} />;
      case 'cultural':
        return <BookOpen className={`${size} text-emerald-400`} />;
      case 'sports':
        return <SoccerBallIcon className={`${size} text-slate-100`} />;
      case 'tech':
        return <Laptop className={`${size} text-cyan-400`} />;
      case 'environmental':
        return <Leaf className={`${size} text-emerald-400`} />;
      case 'media':
        return <Camera className={`${size} text-sky-400`} />;
      case 'social':
        return <Users className={`${size} text-pink-400`} />;
      case 'scouting':
        return <ScoutingTentIcon className={`${size} text-teal-300`} />;
      default:
        return <Heart className={`${size} ${colorClass}`} />;
    }
  };

  const getLocalizedName = (id: string, defaultName: string) => {
    const found = t.activitiesSection.items.find((item) => item.id === id);
    return found ? found.name : defaultName;
  };

  // Row 1 (5 items) and Row 2 (4 items) matching screenshot exactly
  const row1 = ACTIVITIES.slice(0, 5);
  const row2 = ACTIVITIES.slice(5, 9);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 z-30 mb-8 sm:mb-12">
      {/* Outer Glass Container */}
      <div className="w-full bg-[#041427]/85 backdrop-blur-xl border border-cyan-600/35 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_15px_35px_rgba(2,8,20,0.6)]">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5 drop-shadow-sm">
            {t.activitiesSection.title}
          </h2>
          <p className="text-sm sm:text-base text-cyan-200/80 font-medium">
            {t.activitiesSection.subtitle}
          </p>
        </div>

        {/* Activity Buttons Grid */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          
          {/* Row 1: 5 Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {row1.map((activity) => (
              <button
                key={activity.id}
                onClick={() => onSelectActivity(activity)}
                className="activity-slot flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#09223e]/50 hover:bg-[#0f345e]/80 border border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_8px_20px_rgba(6,182,212,0.25)] hover:-translate-y-1"
              >
                <div className="mb-2.5 transition-transform duration-300 group-hover:scale-110">
                  {getIcon(activity.id, activity.color)}
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                  {getLocalizedName(activity.id, activity.name)}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2: 4 Columns centered */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto w-full">
            {row2.map((activity) => (
              <button
                key={activity.id}
                onClick={() => onSelectActivity(activity)}
                className="activity-slot flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#09223e]/50 hover:bg-[#0f345e]/80 border border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_8px_20px_rgba(6,182,212,0.25)] hover:-translate-y-1"
              >
                <div className="mb-2.5 transition-transform duration-300 group-hover:scale-110">
                  {getIcon(activity.id, activity.color)}
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                  {getLocalizedName(activity.id, activity.name)}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
