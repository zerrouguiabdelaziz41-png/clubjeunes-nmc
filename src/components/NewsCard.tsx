import React from 'react';
import { Megaphone, ArrowLeft, ArrowRight } from 'lucide-react';
import { NEWS, NewsItem } from '../data/clubData.ts';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface NewsCardProps {
  onSelectNews: (item: NewsItem) => void;
  onViewAllNews: () => void;
  language?: Language;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  onSelectNews,
  onViewAllNews,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  // Merge localized news items
  const displayNews = NEWS.map((item) => {
    const loc = t.newsCard.items.find((n) => n.id === item.id);
    if (!loc) return item;
    return {
      ...item,
      title: loc.title,
      date: loc.date,
      category: loc.category,
      readTime: loc.readTime,
      summary: loc.summary,
      content: loc.content,
    };
  });

  return (
    <div
      className={`rounded-2xl bg-[#041427]/85 backdrop-blur-xl border border-cyan-700/30 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[380px] shadow-[0_10px_25px_rgba(2,8,20,0.5)] ${
        isLtr ? 'text-left' : 'text-right'
      }`}
    >
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-800/30">
          {/* Icon + Title */}
          <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
            <Megaphone className={`w-5 h-5 text-cyan-400 ${isLtr ? '' : 'transform -scale-x-100'}`} />
            <span>{t.newsCard.title}</span>
          </div>

          {/* View All Link */}
          <button
            onClick={onViewAllNews}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span>{t.newsCard.viewAll}</span>
            {isLtr ? (
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            )}
          </button>
        </div>

        {/* News Content */}
        {displayNews.length === 1 ? (
          <div
            onClick={() => onSelectNews(displayNews[0])}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-cyan-800/40 mb-3 shadow-md">
                <img
                  src={displayNews[0].thumbnail}
                  alt={displayNews[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041427]/90 via-transparent to-transparent" />
                <span className={`absolute bottom-2.5 ${isLtr ? 'left-2.5' : 'right-2.5'} text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-500/90 text-white backdrop-blur-sm`}>
                  {displayNews[0].category}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                {displayNews[0].title}
              </h4>
              <p className="text-xs text-slate-300/80 mt-1.5 line-clamp-2 leading-relaxed">
                {displayNews[0].summary}
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-cyan-900/30 text-xs">
              <span className="text-slate-400 font-medium font-mono text-[11px]">
                {displayNews[0].date}
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:text-orange-400 transition-colors">
                <span>{language === 'ar' ? 'قراءة الخبر' : language === 'fr' ? 'Lire la suite' : 'Read more'}</span>
                {isLtr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-cyan-900/30">
            {displayNews.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNews(item)}
                className="py-3 sm:py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group cursor-pointer hover:bg-cyan-950/20 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-cyan-800/40">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className={`flex flex-col overflow-hidden ${isLtr ? 'text-left' : 'text-right'}`}>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs text-slate-400 mt-1 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
