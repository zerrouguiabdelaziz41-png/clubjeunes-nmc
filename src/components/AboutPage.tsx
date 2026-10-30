import React, { useState } from 'react';
import {
  Eye,
  Target,
  BarChart3,
  FileText,
  Camera,
  Users,
  ChevronRight,
  ChevronLeft,
  Home,
  Star,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  Play,
  ArrowRight,
  ArrowLeft,
  X,
  Maximize2,
  CheckCircle2,
  Award,
  Compass,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

interface AboutPageProps {
  onBackToHome: () => void;
  language?: Language;
  onOpenJoin?: () => void;
  onOpenVideo?: () => void;
  onOpenContact?: () => void;
  onOpenEvents?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  language = 'ar',
  onOpenJoin,
  onOpenVideo,
  onOpenContact,
  onOpenEvents,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';
  const aboutT = t.modals.about;

  // Gallery slider state
  const galleryImages = [
    {
      src: '/assets/aistudio/club_hq_facade.jpg',
      title: language === 'ar' ? 'واجهة مقر النادي الرسمية' : language === 'fr' ? 'Façade du siège du club' : 'Club Headquarters Facade',
      desc: language === 'ar' ? 'دار الشباب حفصي عبد الرزاق - سوق أهراس' : language === 'fr' ? 'Maison de Jeunes Hafsi Abdelrazak' : 'Hafsi Abdelrazak Youth Center',
    },
    {
      src: '/assets/aistudio/864857700_1092972310232179_2843095535031713476_n_186b5791.jpg',
      title: language === 'ar' ? 'مراسم تنصيب نادي منبر الشاب المبدع' : language === 'fr' ? 'Cérémonie d\'installation du Club' : 'Club Inauguration Ceremony',
      desc: language === 'ar' ? 'بحضور رئيسة النادي السيدة سعيدي إيمان والأعضاء المؤسسين' : language === 'fr' ? 'Sous la présidence de Mme Saidi Imane' : 'Chaired by Club President Mrs. Saidi Imane',
    },
    {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      title: language === 'ar' ? 'ورشات العمل والتدريب التفاعلي' : language === 'fr' ? 'Ateliers de formation interactive' : 'Interactive Training Workshops',
      desc: language === 'ar' ? 'تطوير المهارات القيادية والابتكار' : language === 'fr' ? 'Développement des compétences' : 'Leadership & innovation skills',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      title: language === 'ar' ? 'جلسات الحوار والمبادرات الشبابية' : language === 'fr' ? 'Sessions de dialogue jeunesse' : 'Youth Dialogue & Initiatives',
      desc: language === 'ar' ? 'منبر مفتوح لتبادل الأفكار والخبرات' : language === 'fr' ? 'Tribune ouverte aux jeunes' : 'An open platform for youth voices',
    },
    {
      src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      title: language === 'ar' ? 'مخيمات الهواء الطلق والمغامرة' : language === 'fr' ? 'Camps de plein air et d\'aventure' : 'Outdoor & Adventure Camps',
      desc: language === 'ar' ? 'تعزيز روح الفريق والعمل الجماعي' : language === 'fr' ? 'Esprit d\'équipe et solidarité' : 'Team building & outdoor discovery',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Team members list
  const leadershipMembers = [
    {
      id: 'president',
      name: language === 'ar' ? 'السيدة سعيدي إيمان' : language === 'fr' ? 'Mme Saidi Imane' : 'Mrs. Saidi Imane',
      role: language === 'ar' ? 'رئيسة النادي' : language === 'fr' ? 'Présidente du Club' : 'Club President',
      committee: language === 'ar' ? 'الهيئة الإدارية العليا - سوق أهراس' : language === 'fr' ? 'Direction Générale - Souk Ahras' : 'Executive Board - Souk Ahras',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'رئاسة النادي' : language === 'fr' ? 'Présidence' : 'President',
    },
    {
      id: 'general-supervisor',
      name: language === 'ar' ? 'أ. محمد العتيبي' : language === 'fr' ? 'M. Mohammed Al-Otaibi' : 'Mr. Mohammed Al-Otaibi',
      role: language === 'ar' ? 'المشرف العام' : language === 'fr' ? 'Superviseur Général' : 'General Supervisor',
      committee: language === 'ar' ? 'إدارة التنسيق والمتابعة' : language === 'fr' ? 'Coordination et Suivi' : 'Coordination & Follow-up',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'الإشراف العام' : language === 'fr' ? 'Supervision' : 'Supervisor',
    },
    {
      id: 'deputy-supervisor',
      name: language === 'ar' ? 'أ. فهد السبيعي' : language === 'fr' ? 'M. Fahd Al-Subaie' : 'Mr. Fahd Al-Subaie',
      role: language === 'ar' ? 'نائب المشرف' : language === 'fr' ? 'Superviseur Adjoint' : 'Deputy Supervisor',
      committee: language === 'ar' ? 'شؤون التخطيط والبرامج' : language === 'fr' ? 'Planification et Programmes' : 'Programs Planning',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'نائب المشرف' : language === 'fr' ? 'Adjoint' : 'Deputy',
    },
    {
      id: 'cultural-head',
      name: language === 'ar' ? 'أ. هند الجهني' : language === 'fr' ? 'Mme Hind Al-Juhani' : 'Ms. Hind Al-Juhani',
      role: language === 'ar' ? 'رئيسة اللجنة الثقافية' : language === 'fr' ? 'Présidente Comité Culturel' : 'Cultural Committee Chair',
      committee: language === 'ar' ? 'الآداب والفنون والفكر' : language === 'fr' ? 'Arts et Littérature' : 'Arts & Literature',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'اللجنة الثقافية' : language === 'fr' ? 'Culture' : 'Cultural',
    },
    {
      id: 'media-head',
      name: language === 'ar' ? 'أ. عبدالرحمن الغامدي' : language === 'fr' ? 'M. Abderrahmane Al-Ghamdi' : 'Mr. Abderrahmane Al-Ghamdi',
      role: language === 'ar' ? 'رئيس اللجنة الإعلامية' : language === 'fr' ? 'Président Comité Médias' : 'Media Committee Chair',
      committee: language === 'ar' ? 'التوثيق والنشر الرقمي' : language === 'fr' ? 'Communication Digitale' : 'Digital Communications',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'اللجنة الإعلامية' : language === 'fr' ? 'Médias' : 'Media',
    },
    {
      id: 'volunteer-head',
      name: language === 'ar' ? 'أ. سارة القحطاني' : language === 'fr' ? 'Mme Sara Al-Qahtani' : 'Ms. Sara Al-Qahtani',
      role: language === 'ar' ? 'رئيسة اللجنة التطوعية' : language === 'fr' ? 'Présidente Comité Bénévolat' : 'Volunteering Chair',
      committee: language === 'ar' ? 'المبادرات المجتمعية والتكافل' : language === 'fr' ? 'Solidarité et Citoyenneté' : 'Community Initiatives',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      badge: language === 'ar' ? 'لجنة التطوع' : language === 'fr' ? 'Bénévolat' : 'Volunteer',
    },
  ];

  return (
    <div
      dir={isLtr ? 'ltr' : 'rtl'}
      className="min-h-screen bg-[#040f1c] text-white selection:bg-orange-500 selection:text-white pb-20"
    >
      {/* 1. Hero Panorama & Breadcrumb Header Banner */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden border-b border-cyan-900/40">
        <img
          src="/assets/aistudio/_____________38f0e34a.png"
          alt="Panoramic Banner"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040f1c]/80 via-transparent to-[#040f1c]/80" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-amber-500/15 via-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6">
          {/* Breadcrumb Row */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200/80">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>{aboutT.breadcrumbHome || (language === 'ar' ? 'الرئيسية' : 'Accueil')}</span>
            </button>
            <span className="text-cyan-700">/</span>
            <span className="text-white font-bold">{aboutT.breadcrumbAbout || (language === 'ar' ? 'عن النادي' : 'À Propos')}</span>
          </div>

          {/* Page Main Title Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#040f1d] rounded-[14px] flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <span>{aboutT.title}</span>
              </h1>
              <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium">
                {aboutT.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Content Grid: 3 Pillars (Right), History (Center), Gallery & Stats (Left) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ------------------------------------------------------------- */}
          {/* COLUMN 1 (Order in RTL: Right side) - Vision, Mission, Goals */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* 1.1 Vision Card (الرؤية) */}
            <div className="bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {aboutT.visionTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal text-justify">
                {aboutT.visionText}
              </p>
            </div>

            {/* 1.2 Mission Card (الرسالة) */}
            <div className="bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {aboutT.missionTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal text-justify">
                {aboutT.missionText}
              </p>
            </div>

            {/* 1.3 Goals Card (الأهداف) */}
            <div className="bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {aboutT.goalsTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal text-justify mb-3">
                {aboutT.goalsIntro || (aboutT as any).goalsText || ''}
              </p>

              {/* Goals bullet points matching design */}
              <div className="space-y-2 pt-2 border-t border-cyan-900/40">
                {(aboutT.goalsBullets || aboutT.goals || []).map((bullet: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* COLUMN 2 (Center) - Historical Overview (نبذة تاريخية عن النادي) */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-5 bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-cyan-900/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {aboutT.historyTitle}
                  </h2>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    {language === 'ar' ? 'سوق أهراس، الجزائر' : 'Souk Ahras, Algérie'}
                  </span>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-3.5 text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal text-justify">
                {(aboutT.historyParagraphs || [aboutT.historyText || '']).map((paragraph: string, index: number) => (
                  <p key={index} className="relative pr-3 border-r-2 border-cyan-800/40 hover:border-amber-500/60 transition-colors">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Highlight Quote Card */}
            <div className="mt-6 rounded-xl bg-gradient-to-r from-amber-950/60 via-[#181a20] to-amber-950/60 border border-amber-500/30 p-4 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              <div className="flex items-center justify-center gap-2 text-center">
                <span className="text-amber-400 text-lg font-serif">“</span>
                <p className="text-xs sm:text-sm font-extrabold text-amber-200 tracking-wide">
                  {aboutT.historyQuote || (language === 'ar' ? 'من فكرة صغيرة .. بدأ الحلم، ليصبح واقعاً يصنع الفرق' : 'D\'une modeste idée .. est né le rêve')}
                </p>
                <span className="text-amber-400 text-lg font-serif">”</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* COLUMN 3 (Order in RTL: Left side) - Photo Gallery & Stats */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Gallery Card */}
            <div className="bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 rounded-2xl p-4 shadow-xl">
              
              {/* Carousel Viewport */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-cyan-800/50 shadow-inner">
                <img
                  src={galleryImages[currentSlide].src}
                  alt={galleryImages[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(currentSlide);
                    setIsLightboxOpen(true);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Badge: معرض الصور */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{aboutT.galleryBadge}</span>
                  </span>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="w-7 h-7 rounded-full bg-black/70 hover:bg-orange-500 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="w-7 h-7 rounded-full bg-black/70 hover:bg-orange-500 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                  <p className="text-xs font-bold leading-tight line-clamp-1 drop-shadow-md">
                    {galleryImages[currentSlide].title}
                  </p>
                  <p className="text-[10px] text-cyan-200/90 leading-tight line-clamp-1 mt-0.5">
                    {galleryImages[currentSlide].desc}
                  </p>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-2 mt-2.5">
                {galleryImages.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      currentSlide === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-[1.02]'
                        : 'border-cyan-900/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-cyan-900/40 text-center">
                {/* 5 Years */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-base font-black">5</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                    {aboutT.statsYears || (language === 'ar' ? 'سنوات من العطاء' : 'Années')}
                  </span>
                </div>

                {/* 20+ Activities */}
                <div className="flex flex-col items-center border-x border-cyan-900/40 px-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-base font-black">+20</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                    {aboutT.statsActivities || (language === 'ar' ? 'نشاط سنوي' : 'Activités')}
                  </span>
                </div>

                {/* 500+ Members */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-base font-black">+500</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                    {aboutT.statsMembers || (language === 'ar' ? 'عضو نشط' : 'Membres')}
                  </span>
                </div>
              </div>

              {/* Action Button: اكتشف المزيد */}
              <button
                onClick={() => {
                  setLightboxIndex(0);
                  setIsLightboxOpen(true);
                }}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-700/50 hover:border-amber-500/50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-md"
              >
                <span>{aboutT.exploreMoreBtn || (language === 'ar' ? 'اكتشف المزيد' : 'Découvrir')}</span>
                {isLtr ? (
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                )}
              </button>
            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. Bottom Row: 2 Wide Panels */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
          
          {/* Panel 1: Leadership & Supervisors (أعضاء الإدارة والمشرفون) */}
          <div className="lg:col-span-7 bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header with "عرض جميع الأعضاء" */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {aboutT.leadershipTitle || (language === 'ar' ? 'أعضاء الإدارة والمشرفون' : 'Direction & Superviseurs')}
                  </h3>
                </div>

                <button
                  onClick={() => setIsMembersModalOpen(true)}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer group"
                >
                  <span>{aboutT.viewAllMembers || (language === 'ar' ? 'عرض جميع الأعضاء' : 'Voir tous')}</span>
                  {isLtr ? (
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  )}
                </button>
              </div>

              {/* Members Avatars Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
                {leadershipMembers.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setIsMembersModalOpen(true)}
                    className="flex flex-col items-center text-center p-3 rounded-xl bg-[#031122]/60 hover:bg-[#08203c]/70 border border-cyan-900/40 hover:border-amber-500/50 transition-all cursor-pointer group hover:-translate-y-1 duration-200"
                  >
                    {/* Circular Avatar with amber glow */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-b from-amber-400 to-orange-600 shadow-md shadow-orange-500/20 mb-2.5 group-hover:scale-105 transition-transform">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded-full text-[9px] font-black text-amber-300 border border-amber-500/30 whitespace-nowrap">
                        {member.badge}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mt-1">
                      {member.name}
                    </h4>
                    <p className="text-[10px] text-cyan-200/80 font-medium line-clamp-1 mt-0.5">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Note prompt for future team list updates */}
            <div className="mt-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center gap-2.5 text-xs text-cyan-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="leading-tight">
                {language === 'ar'
                  ? 'الهيكل الإداري والمشرفون معتمدون ومتاح تحديث القائمة بالكامل وتزويد الصور فور طلبكم.'
                  : 'Structure managériale prête à être enrichie de nouveaux profils et photos.'}
              </span>
            </div>
          </div>

          {/* Panel 2: Photos & Club Info (صور ومعلومات عن النادي) */}
          <div className="lg:col-span-5 bg-[#06182c]/90 backdrop-blur-md border border-cyan-900/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-cyan-900/50">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {aboutT.mediaInfoTitle || (language === 'ar' ? 'صور ومعلومات عن النادي' : 'Médias & Informations')}
                </h3>
              </div>

              {/* Video Banner Thumbnail */}
              <div
                onClick={onOpenVideo}
                className="relative aspect-video rounded-xl overflow-hidden group border border-cyan-800/60 cursor-pointer shadow-inner mb-3"
              >
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
                  alt="Club Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

                {/* Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:scale-115 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-bold drop-shadow">
                  {language === 'ar' ? 'فيديو تعريفي عن أنشطة وإنجازات النادي' : 'Vidéo de présentation des activités'}
                </div>
              </div>

              {/* Mini 4 Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {galleryImages.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLightboxIndex(idx + 1);
                      setIsLightboxOpen(true);
                    }}
                    className="aspect-[4/3] rounded-lg overflow-hidden border border-cyan-900/60 hover:border-amber-400 cursor-pointer transition-all hover:scale-105"
                  >
                    <img src={img.src} alt="thumb" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Club Info Details */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{aboutT.infoLocationLabel || (language === 'ar' ? 'الموقع' : 'Lieu')}:</span>
                  <span className="text-cyan-100">{aboutT.infoLocationValue || (language === 'ar' ? 'دار الشباب حفصي عبد الرزاق - سوق أهراس، الجزائر' : 'Maison de Jeunes Hafsi Abdelrazak')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{aboutT.infoHoursLabel || (language === 'ar' ? 'ساعات العمل' : 'Horaires')}:</span>
                  <span className="text-cyan-100">{aboutT.infoHoursValue || (language === 'ar' ? 'من 8:00 ص إلى 6:00 م' : 'De 08h00 à 18h00')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{aboutT.infoContactLabel || (language === 'ar' ? 'التواصل' : 'Contact')}:</span>
                  <span className="text-cyan-100 font-mono" dir="ltr">{aboutT.infoContactValue || '+213 697 92 15 51'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{aboutT.infoEmailLabel || (language === 'ar' ? 'البريد الإلكتروني' : 'Email')}:</span>
                  <span className="text-cyan-100 font-mono" dir="ltr">{aboutT.infoEmailValue || 'club.jeunes41@gmail.com'}</span>
                </div>
              </div>
            </div>

            {/* Button: كل الصور */}
            <button
              onClick={() => {
                setLightboxIndex(0);
                setIsLightboxOpen(true);
              }}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
            >
              <span>{aboutT.allPhotosBtn || (language === 'ar' ? 'كل الصور' : 'Toutes les photos')}</span>
              {isLtr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Lightbox Photo Gallery Modal */}
      {/* ------------------------------------------------------------- */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#041427] border border-cyan-500/50 rounded-2xl p-4 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-900/40">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">
                  {galleryImages[lightboxIndex].title} ({lightboxIndex + 1} / {galleryImages.length})
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-white flex items-center justify-center hover:bg-red-500/80 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Big Image with Controls */}
            <div className="relative aspect-[16/10] max-h-[65vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Description Caption */}
            <p className="text-xs text-cyan-200/90 text-center mt-3 font-medium">
              {galleryImages[lightboxIndex].desc}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. All Members Modal */}
      {/* ------------------------------------------------------------- */}
      {isMembersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#06182c] border border-cyan-500/50 rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{aboutT.leadershipTitle}</h3>
                  <p className="text-xs text-cyan-200/80">نادي منبر الشاب المبدع – دار الشباب حفصي عبد الرزاق</p>
                </div>
              </div>
              <button
                onClick={() => setIsMembersModalOpen(false)}
                className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-white flex items-center justify-center hover:bg-cyan-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of All Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {leadershipMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#040f1d] border border-cyan-900/60 hover:border-amber-400/50 transition-all"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/70 shrink-0 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {member.badge}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{member.name}</h4>
                    <p className="text-[11px] text-cyan-300 font-medium">{member.role}</p>
                    <p className="text-[10px] text-slate-400">{member.committee}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Close Button */}
            <div className="mt-6 pt-4 border-t border-cyan-900/40 flex justify-end">
              <button
                onClick={() => setIsMembersModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-cyan-950 border border-cyan-700/50 hover:bg-cyan-900 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {t.modals.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
