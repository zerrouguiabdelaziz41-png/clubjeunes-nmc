import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface HeroProps {
  onDiscoverActivities: () => void;
  onWatchVideo: () => void;
  onOpenJoin: () => void;
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onDiscoverActivities,
  onWatchVideo,
  language = 'ar',
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const slidesBg = [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000&q=85',
  ];

  const activeSlideData = t.hero.slides[currentSlide] || t.hero.slides[0];
  const bgImage = slidesBg[currentSlide] || slidesBg[1];

  return (
    <section className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
      {/* Background panoramic image with gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Youth community"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-all duration-700 ease-out"
        />

        {/* Gradient overlays: Deep midnight blue gradient adapted to text direction */}
        <div
          className={`absolute inset-0 z-10 ${
            isLtr
              ? 'bg-gradient-to-r from-[#040f1c]/95 via-[#040f1c]/75 to-transparent'
              : 'bg-gradient-to-l from-[#040f1c]/95 via-[#040f1c]/75 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-transparent to-[#040f1c]/40 z-10" />
        
        {/* Subtle radial warm glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      {/* Decorative top geometric stripes */}
      <div
        className={`absolute top-8 ${
          isLtr ? 'left-12' : 'right-12'
        } z-20 hidden md:block pointer-events-none opacity-80`}
      >
        <div className={`flex flex-col gap-1.5 ${isLtr ? 'rotate-[30deg]' : 'rotate-[-30deg]'}`}>
          <div className="w-20 h-1.5 bg-gradient-to-r from-transparent via-[#f97316] to-[#ea580c] rounded-full" />
          <div className={`w-14 h-1 bg-[#38bdf8]/60 rounded-full ${isLtr ? 'ml-4' : 'mr-4'}`} />
          <div className={`w-8 h-1 bg-[#f97316]/40 rounded-full ${isLtr ? 'ml-8' : 'mr-8'}`} />
        </div>
      </div>

      {/* Decorative subtle topographic lines */}
      <div
        className={`absolute bottom-6 ${
          isLtr ? 'left-6' : 'right-6'
        } z-20 hidden lg:block pointer-events-none opacity-20`}
      >
        <svg width="240" height="140" viewBox="0 0 240 140" fill="none">
          <path d="M 0 100 Q 80 50 160 80 T 240 40" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 0 120 Q 90 70 170 100 T 240 70" stroke="#f97316" strokeWidth="1.5" />
          <path d="M 20 135 Q 110 85 190 120 T 240 90" stroke="#38bdf8" strokeWidth="1" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div
          className={`flex flex-col max-w-2xl ${
            isLtr
              ? 'items-start text-left ml-0 mr-auto'
              : 'items-end text-right mr-0 ml-auto'
          }`}
        >
          {/* Tagline / Kicker Badge */}
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/35 text-cyan-300 text-xs sm:text-sm font-bold backdrop-blur-sm shadow-sm">
            <span>{activeSlideData.tagline}</span>
          </div>

          {/* Huge Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <span className="block text-slate-100">{activeSlideData.titlePrefix}</span>
            <span className="block mt-1">
              {activeSlideData.titleMain}
              <span className="text-[#f97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.45)]">
                {activeSlideData.titleAccent}
              </span>
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200/95 font-medium leading-relaxed max-w-xl mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {activeSlideData.description}
          </p>

          {/* CTA Buttons Row */}
          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 ${isLtr ? 'justify-start' : 'justify-end'}`}>
            {/* Primary Action Button */}
            <button
              onClick={onDiscoverActivities}
              className="btn-orange-gradient px-7 py-3 rounded-full text-white font-bold text-base flex items-center gap-3 cursor-pointer group shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.03]"
            >
              <span>{t.hero.ctaActivities}</span>
              {isLtr ? (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              ) : (
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              )}
            </button>

            {/* Secondary Action */}
            <button
              onClick={onWatchVideo}
              className="inline-flex items-center gap-2.5 text-slate-100 hover:text-white font-semibold text-base py-2.5 px-3 rounded-full hover:bg-slate-800/40 transition-colors cursor-pointer group backdrop-blur-xs"
            >
              <span>{t.hero.ctaVideo}</span>
              <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-[#f97316] group-hover:border-[#f97316] group-hover:text-white transition-all shadow-md">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-[#041224]/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-cyan-800/30">
        {slidesBg.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className={`transition-all rounded-full cursor-pointer ${
              currentSlide === index
                ? 'w-6 h-2 bg-white shadow-[0_0_8px_white]'
                : 'w-2 h-2 bg-slate-400/50 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
