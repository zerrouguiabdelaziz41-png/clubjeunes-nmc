import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Share2,
  ChevronRight,
  ChevronLeft,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileText,
  Eye,
  Check,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

export interface EventDetail {
  id: string;
  title: string;
  category: 'festival' | 'visit' | 'competition' | 'seminar' | 'workshop';
  categoryLabel: string;
  badgeType: 'upcoming' | 'photo' | 'competition' | 'seminar';
  badgeLabel: string;
  badgeClass: string;
  summary: string;
  description: string;
  location: string;
  date: string;
  time: string;
  ageGroup: string;
  coverImage: string;
  gallery: string[];
  actionType: 'register' | 'details';
}

const EVENTS_DATA: EventDetail[] = [
  {
    id: 'youth-creativity-festival',
    title: 'مهرجان الإبداع الشبابي',
    category: 'festival',
    categoryLabel: 'مهرجانات',
    badgeType: 'upcoming',
    badgeLabel: 'الفعالية القادمة',
    badgeClass: 'bg-orange-500 text-white font-bold',
    summary:
      'فعالية تجمع مواهب الشباب في مجالات متعددة من فنون، ابتكار، ورياضة. مع العديد من الأنشطة التفاعلية والجوائز المميزة.',
    description:
      'يهدف المهرجان إلى إبراز مواهب وإبداعات الشباب في مختلف المجالات، من خلال معارض فنية، مسابقات تفاعلية، ورش عمل، بالإضافة إلى عروض مميزة من المشاركين، وهي فرصة رائعة للالتقاء الشباب، تبادل الخبرات، وبناء علاقات جديدة في بيئة محفزة.',
    location: 'مركز النادي الثقافي',
    date: '2025 / 5 / 20',
    time: 'من 4:00 م - 10:00 م',
    ageGroup: 'من 12 إلى 18 سنة',
    coverImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    ],
    actionType: 'register',
  },
  {
    id: 'innovation-center-visit',
    title: 'زيارة ميدانية لمركز الابتكار',
    category: 'visit',
    categoryLabel: 'زيارات ميدانية',
    badgeType: 'photo',
    badgeLabel: 'تغطية مصورة',
    badgeClass: 'bg-cyan-600/90 text-white font-bold',
    summary:
      'جولة ميدانية لزيارة مركز الابتكار والتقنية، والتعرف على أحدث المشاريع والتقنيات الحديثة.',
    description:
      'تنظيم جولة استكشافية نوعية لمنتسبي النادي إلى حاضنة الأعمال ومركز الابتكار التكنولوجي، للاطلاع على مختبرات الروبوتات والذكاء الاصطناعي ومقابلة مهندسين ومطورين شباب.',
    location: 'مركز الابتكار - سوق أهراس',
    date: '2025 / 5 / 15',
    time: 'من 9:00 ص - 1:00 م',
    ageGroup: 'من 15 إلى 25 سنة',
    coverImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    ],
    actionType: 'details',
  },
  {
    id: 'reading-creativity-competition',
    title: 'مسابقة القراءة والإبداع',
    category: 'competition',
    categoryLabel: 'مسابقات',
    badgeType: 'competition',
    badgeLabel: 'مسابقة',
    badgeClass: 'bg-emerald-600/90 text-white font-bold',
    summary:
      'مسابقة ثقافية تهدف إلى تحفيز مهارات القراءة والتفكير الإبداعي بين أعضاء النادي.',
    description:
      'مسابقة تحفيزية تركز على قراءة كتب مختارة في التاريخ والعلوم والأدب، وإعداد ملخصات نقدية وعروض مرئية مع لجان تحكيم متخصصة وتكريم أفضل 5 مشاريع بجوائز قيمة.',
    location: 'مكتبة النادي',
    date: '2025 / 5 / 10',
    time: 'من 4:00 م - 6:00 م',
    ageGroup: 'من 10 إلى 20 سنة',
    coverImage:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507842229451-79b1be04b732?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    ],
    actionType: 'register',
  },
  {
    id: 'youth-leadership-seminar',
    title: 'القيادة الشبابية .. صناعة التغيير',
    category: 'seminar',
    categoryLabel: 'ندوات',
    badgeType: 'seminar',
    badgeLabel: 'ندوة',
    badgeClass: 'bg-purple-600/90 text-white font-bold',
    summary:
      'ندوة حوارية مع نخبة من القيادات الشبابية لمناقشة دور الشباب في بناء المستقبل.',
    description:
      'جلسة حوارية ملهمة بمشاركة قادة شباب وشخصيات مجتمعية بارزة لمناقشة تحديات العصر، وتطوير المهارات القيادية، وأهمية المبادرة الفردية والجماعية في نهضة المجتمع والوطن.',
    location: 'قاعة المحاضرات',
    date: '2025 / 5 / 5',
    time: 'من 3:00 م - 5:00 م',
    ageGroup: 'من 16 إلى 30 سنة',
    coverImage:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80',
    ],
    actionType: 'details',
  },
];

interface EventsPageProps {
  onBackToHome: () => void;
  language?: Language;
  onOpenJoin?: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onBackToHome,
  language = 'ar',
  onOpenJoin,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [activeEvent, setActiveEvent] = useState<EventDetail>(EVENTS_DATA[0]);
  const [copiedShare, setCopiedShare] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Localization
  const pageTexts = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbEvents: 'الفعاليات',
      heroTitle: 'الفعاليات',
      heroSubtitle: 'اكتشف فعالياتنا القادمة وكن جزءاً من تجاربنا المميزة',
      searchPlaceholder: 'ابحث عن فعالية...',
      allCategories: 'جميع الفئات',
      allLocations: 'جميع الأماكن',
      filterDate: 'التاريخ',
      dateTimeTitle: 'التاريخ والوقت',
      locationTitle: 'المكان',
      ageGroupTitle: 'الفئة العمرية',
      descTitle: 'وصف الفعالية',
      registerBtn: 'سجل الآن في الفعالية',
      registerCardBtn: 'سجل الآن',
      detailsCardBtn: 'عرض التفاصيل',
      shareBtn: 'مشاركة الفعالية',
      linkCopied: 'تم نسخ الرابط بنجاح!',
      confirmNotice: 'سيتم تأكيد مشاركتك بعد إكمال التسجيل.',
      successMsg: 'تم تسجيلك بنجاح في الفعالية!',
      successSub: 'سنتواصل معك عبر الهاتف والبريد لتأكيد التفاصيل.',
      noResults: 'لا توجد فعاليات مطابقة لبحثك في الوقت الحالي.',
    },
    fr: {
      breadcrumbHome: 'Accueil',
      breadcrumbEvents: 'Événements',
      heroTitle: 'Événements',
      heroSubtitle:
        'Découvrez nos prochains événements et participez à nos expériences inspirantes.',
      searchPlaceholder: 'Rechercher un événement...',
      allCategories: 'Toutes les catégories',
      allLocations: 'Tous les lieux',
      filterDate: 'Date',
      dateTimeTitle: 'Date et Heure',
      locationTitle: 'Lieu',
      ageGroupTitle: 'Tranche d’âge',
      descTitle: 'Description de l’événement',
      registerBtn: 'S’inscrire maintenant à l’événement',
      registerCardBtn: 'S’inscrire',
      detailsCardBtn: 'Voir les détails',
      shareBtn: 'Partager l’événement',
      linkCopied: 'Lien copié avec succès !',
      confirmNotice: 'Votre participation sera confirmée après inscription.',
      successMsg: 'Inscription réussie à l’événement !',
      successSub: 'Nous vous contacterons pour confirmer les détails.',
      noResults: 'Aucun événement correspondant trouvé.',
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbEvents: 'Events',
      heroTitle: 'Events',
      heroSubtitle:
        'Discover our upcoming events and be part of our memorable experiences.',
      searchPlaceholder: 'Search for an event...',
      allCategories: 'All Categories',
      allLocations: 'All Locations',
      filterDate: 'Date',
      dateTimeTitle: 'Date and Time',
      locationTitle: 'Location',
      ageGroupTitle: 'Age Group',
      descTitle: 'Event Description',
      registerBtn: 'Register for this Event',
      registerCardBtn: 'Register Now',
      detailsCardBtn: 'View Details',
      shareBtn: 'Share Event',
      linkCopied: 'Link copied to clipboard!',
      confirmNotice: 'Your participation will be confirmed after registration.',
      successMsg: 'Successfully registered for this event!',
      successSub: 'We will contact you with all confirmation details.',
      noResults: 'No events found matching your criteria.',
    },
  }[language] || {
    breadcrumbHome: 'الرئيسية',
    breadcrumbEvents: 'الفعاليات',
    heroTitle: 'الفعاليات',
    heroSubtitle: 'اكتشف فعالياتنا القادمة وكن جزءاً من تجاربنا المميزة',
    searchPlaceholder: 'ابحث عن فعالية...',
    allCategories: 'جميع الفئات',
    allLocations: 'جميع الأماكن',
    filterDate: 'التاريخ',
    dateTimeTitle: 'التاريخ والوقت',
    locationTitle: 'المكان',
    ageGroupTitle: 'الفئة العمرية',
    descTitle: 'وصف الفعالية',
    registerBtn: 'سجل الآن في الفعالية',
    registerCardBtn: 'سجل الآن',
    detailsCardBtn: 'عرض التفاصيل',
    shareBtn: 'مشاركة الفعالية',
    linkCopied: 'تم نسخ الرابط بنجاح!',
    confirmNotice: 'سيتم تأكيد مشاركتك بعد إكمال التسجيل.',
    successMsg: 'تم تسجيلك بنجاح في الفعالية!',
    successSub: 'سنتواصل معك عبر الهاتف والبريد لتأكيد التفاصيل.',
    noResults: 'لا توجد فعاليات مطابقة لبحثك في الوقت الحالي.',
  };

  const filteredEvents = EVENTS_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation =
      selectedLocation === 'all' || item.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleRegister = () => {
    if (onOpenJoin) {
      onOpenJoin();
    } else {
      setRegisteredSuccess(true);
      setTimeout(() => setRegisteredSuccess(false), 3500);
    }
  };

  const ArrowIcon = isLtr ? ArrowRight : ArrowLeft;
  const PrevArrow = isLtr ? ChevronLeft : ChevronRight;

  return (
    <div className="w-full relative pb-20">
      {/* 1. Atmospheric Header with Sunrise Panorama & Breadcrumbs */}
      <div className="relative w-full overflow-hidden border-b border-cyan-900/30 bg-[#04101e]">
        {/* Background panoramic image with darkening gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/________________31643738.png"
            alt="Scenic Sunrise Youth"
            className="w-full h-full object-cover object-top opacity-20 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040f1c]/90 via-[#040f1c]/80 to-[#040f1c]" />
          <div className="absolute inset-0 bg-radial from-orange-500/10 via-cyan-950/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pb-12">
          {/* Breadcrumb Row */}
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200/80 mb-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <Home className="w-4 h-4 text-[#f97316] group-hover:scale-110 transition-transform" />
              <span>{pageTexts.breadcrumbHome}</span>
            </button>
            <span className="text-cyan-600/70">/</span>
            <span className="text-amber-400 font-bold">
              {pageTexts.breadcrumbEvents}
            </span>
          </div>

          {/* Hero Title & Badge */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-[#07172b] rounded-[14px] flex items-center justify-center text-orange-400">
                  <Calendar className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {pageTexts.heroTitle}
                </h1>
                <p className="text-sm sm:text-base text-cyan-200/80 mt-1 max-w-2xl font-medium">
                  {pageTexts.heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Events Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        
        {/* Search & Filter Toolbar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#06182c]/90 border border-cyan-800/40 backdrop-blur-md shadow-2xl mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none ${
                isLtr ? 'left-3.5' : 'right-3.5'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={pageTexts.searchPlaceholder}
              className={`w-full bg-[#040f1d] border border-cyan-900/60 rounded-xl py-2.5 text-sm text-white placeholder-cyan-500/60 focus:outline-none focus:border-amber-500 transition-colors ${
                isLtr ? 'pl-10 pr-4' : 'pr-10 pl-4'
              }`}
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative shrink-0 sm:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-[#040f1d] border border-cyan-900/60 rounded-xl py-2.5 px-4 text-xs font-semibold text-cyan-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">{pageTexts.allCategories}</option>
              <option value="festival">مهرجانات</option>
              <option value="visit">زيارات ميدانية</option>
              <option value="competition">مسابقات</option>
              <option value="seminar">ندوات</option>
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="relative shrink-0 sm:w-44">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full appearance-none bg-[#040f1d] border border-cyan-900/60 rounded-xl py-2.5 px-4 text-xs font-semibold text-cyan-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">{pageTexts.allLocations}</option>
              <option value="النادي">مركز النادي</option>
              <option value="الابتكار">مركز الابتكار</option>
              <option value="المكتبة">مكتبة النادي</option>
              <option value="المحاضرات">قاعة المحاضرات</option>
            </select>
          </div>

          {/* Date Filter Button */}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLocation('all');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/50 border border-cyan-800/50 text-cyan-200 text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{pageTexts.filterDate}</span>
          </button>
        </div>

        {/* Two-Column Layout Matching Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (List of Event Cards - 7 cols on LG) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-2xl bg-[#06182c]/50 border border-cyan-900/40 text-cyan-300">
                <p className="text-base font-bold">{pageTexts.noResults}</p>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isSelected = activeEvent.id === event.id;
                return (
                  <div
                    key={event.id}
                    onClick={() => setActiveEvent(event)}
                    className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#081e36] border-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/50'
                        : 'bg-[#051425]/90 border-cyan-900/50 hover:border-cyan-700/80 hover:bg-[#07192e]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                      
                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        {/* Status Badge */}
                        <div className="mb-2">
                          <span
                            className={`inline-block text-[11px] px-2.5 py-0.5 rounded-md font-bold tracking-wide ${event.badgeClass}`}
                          >
                            {event.badgeLabel}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug hover:text-amber-300 transition-colors">
                          {event.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-cyan-200/70 mb-3.5 line-clamp-2 leading-relaxed">
                          {event.summary}
                        </p>

                        {/* Meta info & Action */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-cyan-950/60">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-cyan-300/80 font-medium">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              {event.time}
                            </span>
                          </div>

                          {/* Card Action Button */}
                          {event.actionType === 'register' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveEvent(event);
                                handleRegister();
                              }}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                            >
                              <span>{pageTexts.registerCardBtn}</span>
                              <ArrowIcon className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveEvent(event);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-700/60 bg-cyan-950/40 text-cyan-200 font-bold text-xs hover:bg-cyan-900/40 transition-colors cursor-pointer"
                            >
                              <span>{pageTexts.detailsCardBtn}</span>
                              <ArrowIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Thumbnail Image */}
                      <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden border border-cyan-800/40 shadow-inner relative group">
                        <img
                          src={event.coverImage}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c]/80 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column (Detailed Showcase Card - 5 cols on LG) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-[#06182c]/95 border border-cyan-800/60 p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Glowing Ambient Corner Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Banner Image with Club Identity */}
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-60 w-full mb-5 border border-cyan-800/50 shadow-lg group">
                <img
                  src={activeEvent.coverImage}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-black bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                    {activeEvent.badgeLabel}
                  </span>
                </div>

                {/* Centered Club Emblem Watermark on Banner */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                  <img
                    src="/assets/aistudio/__________________3__201639fb.svg"
                    alt="Emblem"
                    className="w-16 h-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] opacity-90"
                  />
                  <span className="text-white font-extrabold text-sm mt-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    نادي منبر الشاب المبدع
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                {activeEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-200/80 mb-5 leading-relaxed font-normal">
                {activeEvent.summary}
              </p>

              {/* 3-Box Meta Info Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                <div className="rounded-xl bg-[#04101e] border border-cyan-900/60 p-2.5 sm:p-3 text-center">
                  <Calendar className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="block text-[10px] text-cyan-400/80 font-bold mb-0.5">
                    {pageTexts.dateTimeTitle}
                  </span>
                  <span className="block text-[11px] font-bold text-white leading-tight">
                    {activeEvent.date}
                  </span>
                  <span className="block text-[10px] text-cyan-300/70 mt-0.5">
                    {activeEvent.time}
                  </span>
                </div>

                <div className="rounded-xl bg-[#04101e] border border-cyan-900/60 p-2.5 sm:p-3 text-center">
                  <MapPin className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="block text-[10px] text-cyan-400/80 font-bold mb-0.5">
                    {pageTexts.locationTitle}
                  </span>
                  <span className="block text-[11px] font-bold text-white leading-tight line-clamp-2">
                    {activeEvent.location}
                  </span>
                </div>

                <div className="rounded-xl bg-[#04101e] border border-cyan-900/60 p-2.5 sm:p-3 text-center">
                  <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="block text-[10px] text-cyan-400/80 font-bold mb-0.5">
                    {pageTexts.ageGroupTitle}
                  </span>
                  <span className="block text-[11px] font-bold text-white leading-tight">
                    {activeEvent.ageGroup}
                  </span>
                </div>
              </div>

              {/* Event Full Description */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>{pageTexts.descTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-cyan-100/80 leading-relaxed font-normal bg-[#040f1d]/70 p-3.5 rounded-xl border border-cyan-950/80">
                  {activeEvent.description}
                </p>
              </div>

              {/* 4 Photo Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {activeEvent.gallery.map((thumb, idx) => (
                  <div
                    key={idx}
                    className="h-14 sm:h-16 rounded-lg overflow-hidden border border-cyan-800/40 relative group cursor-pointer"
                  >
                    <img
                      src={thumb}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-cyan-950/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>

              {/* Registration & Share Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-cyan-700/60 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/40 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-cyan-300" />
                  <span>
                    {copiedShare ? pageTexts.linkCopied : pageTexts.shareBtn}
                  </span>
                </button>

                <button
                  onClick={handleRegister}
                  className="flex-1 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>{pageTexts.registerBtn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-caption */}
              <p className="text-center text-[11px] text-cyan-400/60 mt-3 font-medium">
                {pageTexts.confirmNotice}
              </p>

              {/* In-app registration success banner */}
              {registeredSuccess && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p>{pageTexts.successMsg}</p>
                    <p className="text-[10px] text-emerald-300/80 font-normal">
                      {pageTexts.successSub}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
