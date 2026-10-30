import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  User,
  Search,
  Trophy,
  Camera,
  Award,
  Megaphone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Home,
  Share2,
  Clock,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

export interface ArticleItem {
  id: string;
  title: string;
  categorySlug: 'competition' | 'coverage' | 'achievement' | 'general';
  categoryLabel: string;
  categoryIcon: 'trophy' | 'camera' | 'award' | 'megaphone';
  date: string;
  author: string;
  summary: string;
  content: string[];
  quote?: string;
  coverImage: string;
  gallery: string[];
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'first-place-tech-creativity',
    title: 'فوز فريق منبر الشباب بالمركز الأول في مسابقة الإبداع التقني',
    categorySlug: 'competition',
    categoryLabel: 'نتائج المسابقات',
    categoryIcon: 'trophy',
    date: '15 أبريل 2025',
    author: 'إدارة النادي',
    summary:
      'حقق فريق نادي منبر الشاب المبدع المركز الأول في مسابقة الإبداع التقني على مستوى الأندية الشبابية وذلك بفضل جهودهم المميزة وإبداعهم في تقديم الحلول التقنية.',
    content: [
      'حقق فريق نادي منبر الشاب المبدع المركز الأول في مسابقة الإبداع التقني على مستوى الأندية الشبابية، وذلك بفضل جهودهم المميزة وإبداعهم في تقديم الحلول التقنية.',
      'وقد تم تكريم الفريق خلال الحفل الختامي الذي أقيم في قاعة الابتكار، بحضور عدد من الشخصيات الناشطة في المجال الشبابي والتقني وممثلي الهيئات الشبانية والتعليمية.',
      'وشارك الفريق بمشروع منصة رقمية متطورة تسهم في ربط المواهب الشابة بفرص التدريب والتمكين الميداني، ولاقى العرض إشادة واسعة من لجان التحكيم والخبراء.',
    ],
    quote: '« فخر بكم ... وإبداعكم مستمر »',
    coverImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'innovation-trip-coverage',
    title: 'تغطية مصورة لرحلة النادي إلى مركز الابتكار',
    categorySlug: 'coverage',
    categoryLabel: 'التغطيات المصورة',
    categoryIcon: 'camera',
    date: '10 أبريل 2025',
    author: 'فريق الإعلام',
    summary:
      'نشر النادي مجموعة من الصور المميزة لرحلة الأعضاء إلى مركز الابتكار تضمنت جولات تعريفية وورش عمل ملهمة.',
    content: [
      'نشر نادي منبر الشاب المبدع التقرير المصور لزيارة وفد النادي إلى مركز الابتكار التكنولوجي، حيث اطلع أكثر من 40 شاباً وشابة على بيئات العمل الحديثة.',
      'تضمنت الزيارة حضور ورش تطبيقية حول النمذجة ثلاثية الأبعاد، واستخدام الذكاء الاصطناعي في حل التحديات البيئية والمجتمعية.',
      'وعبّر المشاركون عن سعادتهم البالغة بهذه التجربة التي فتحت أمامهم آفاقاً رحبة للمستقبل المهني والعلمي.',
    ],
    quote: '« التجربة الميدانية هي الخطوة الأولى نحو الريادة »',
    coverImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'member-achievement-coding',
    title: 'إنجاز جديد لعضو من النادي في مجال البرمجة',
    categorySlug: 'achievement',
    categoryLabel: 'إنجازات الأعضاء',
    categoryIcon: 'award',
    date: '5 أبريل 2025',
    author: 'لجنة البرمجة والتقنية',
    summary:
      'حقق العضو تميزاً بحصوله على المركز الثاني في مسابقة البرمجة النخبوية، متمنين له المزيد من النجاح والتألق.',
    content: [
      'يفتخر نادي منبر الشاب المبدع بتهنئة العضو المتألق في الفريق التقني لحصوله على المركز الثاني في الماراثون الوطني للبرمجة الحسابية.',
      'وقد برهن العضو على قدرات استثنائية في الخوارزميات وهيكلة البيانات، مما يعكس الأثر المباشر للورش التكوينية التي يقيمها النادي أسبوعياً.',
      'يؤكد النادي مواصلة دعمه لكافة الطاقات الشابة الواعدة لتصل إلى أعلى منصات التتويج محلياً ودولياً.',
    ],
    quote: '« الاستثمار في العقول الشابة يصنع الفارق الحقيقي »',
    coverImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'youth-leadership-registration',
    title: 'إعلان عن فتح باب التسجيل في دورة القيادة الشبابية',
    categorySlug: 'general',
    categoryLabel: 'أخبار عامة',
    categoryIcon: 'megaphone',
    date: '1 أبريل 2025',
    author: 'أمانة النادي',
    summary:
      'يعلن نادي منبر الشباب عن فتح باب التسجيل في دورة القيادة والتمكين، بهدف تعزيز مهارات القيادة وصناعة التأثير الإيجابي في المجتمع.',
    content: [
      'يعلن نادي منبر الشاب المبدع عن فتح باب التسجيل في دورة "القيادة وصناعة الأثر"، والتي تشرف عليها نخبة من قادة العمل الجمعوي والمدربين المعتمدين.',
      'تهدف الدورة إلى تمكين المشاركين من مهارات التخطيط الاستراتيجي، إدارة المشاريع الشبانية، وحل النزاعات والخطابة الجماهيرية.',
      'التسجيل مفتوح عبر استمارة الموقع الإلكتروني لجميع الأعضاء والمهتمين حتى اكتمال العدد المطلوب.',
    ],
    quote: '« القائد الحقيقي هو من يصنع قادة من حوله »',
    coverImage:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'club-inauguration-soukahras',
    title: 'تنصيب نادي منبر الشاب المبدع بسوق أهراس',
    categorySlug: 'general',
    categoryLabel: 'أخبار عامة',
    categoryIcon: 'megaphone',
    date: '27 أكتوبر 2026',
    author: 'إدارة النادي',
    summary:
      'تم تنصيب نادي «منبر الشاب المبدع» بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس ، تحت إشراف رابطة الهواء الطلق ورئاسة السيدة سعيدي إيمان.',
    content: [
      'تم اليوم الثلاثاء تنصيب نادي «منبر الشاب المبدع» بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس ، تحت إشراف رابطة الهواء الطلق ورئاسة السيدة سعيدي إيمان.',
      'ويأتي التنصيب في إطار مشروع النوادي الشبابية المستحدثة، الذي تموّله وزارة الشباب. ويهدف النادي إلى تشجيع المواهب الشبابية وتعزيز روح الإبداع والمبادرة لدى الشباب.',
      'وشهد الحفل حضوراً مميزاً لأعضاء النادي المؤسسين وإطارات دار الشباب والفعاليات الجمعوية الناشطة في الولاية.',
    ],
    quote: '« معاً نبدع ونبني جيل المستقبل في سوق أهراس »',
    coverImage:
      '/assets/aistudio/864857700_1092972310232179_2843095535031713476_n_186b5791.jpg',
    gallery: [
      '/assets/aistudio/864857700_1092972310232179_2843095535031713476_n_186b5791.jpg',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

interface NewsPageProps {
  onBackToHome: () => void;
  language?: Language;
  onOpenJoin?: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onBackToHome,
  language = 'ar',
  onOpenJoin,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<ArticleItem>(
    ARTICLES_DATA[0]
  );
  const [copiedShare, setCopiedShare] = useState(false);

  // Localization
  const pageTexts = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbNews: 'الأخبار',
      heroTitle: 'الأخبار',
      heroSubtitle:
        'كل ما هو جديد عن النادي من إنجازات، فعاليات، وتغطيات مميزة',
      latestNews: 'أحدث الأخبار',
      searchPlaceholder: 'ابحث في الأخبار...',
      allSections: 'جميع الأقسام',
      tabs: {
        all: 'الكل',
        competition: 'نتائج المسابقات',
        coverage: 'التغطيات المصورة',
        achievement: 'إنجازات الأعضاء',
        general: 'أخبار عامة',
      },
      readMore: 'أقرأ المزيد',
      backToNews: 'العودة إلى الأخبار',
      backToListBtn: 'العودة إلى قائمة الأخبار',
      shareBtn: 'مشاركة الخبر',
      linkCopied: 'تم نسخ الرابط!',
      noResults: 'لا توجد أخبار مطابقة لبحثك في الوقت الحالي.',
    },
    fr: {
      breadcrumbHome: 'Accueil',
      breadcrumbNews: 'Actualités',
      heroTitle: 'Actualités',
      heroSubtitle:
        'Toutes les nouveautés du club : réalisations, événements et reportages exclusifs.',
      latestNews: 'Dernières Actualités',
      searchPlaceholder: 'Rechercher dans les actualités...',
      allSections: 'Toutes les rubriques',
      tabs: {
        all: 'Tous',
        competition: 'Résultats Concours',
        coverage: 'Reportages Photos',
        achievement: 'Réalisations Membres',
        general: 'Actualités Générales',
      },
      readMore: 'Lire la suite',
      backToNews: 'Retour aux actualités',
      backToListBtn: 'Retour à la liste des actualités',
      shareBtn: 'Partager l’article',
      linkCopied: 'Lien copié !',
      noResults: 'Aucune actualité trouvée.',
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbNews: 'News',
      heroTitle: 'News',
      heroSubtitle:
        'Everything new about the club: achievements, events, and featured coverage.',
      latestNews: 'Latest News',
      searchPlaceholder: 'Search news...',
      allSections: 'All Sections',
      tabs: {
        all: 'All',
        competition: 'Contest Results',
        coverage: 'Photo Coverage',
        achievement: 'Member Achievements',
        general: 'General News',
      },
      readMore: 'Read More',
      backToNews: 'Back to News',
      backToListBtn: 'Back to News List',
      shareBtn: 'Share Article',
      linkCopied: 'Link copied!',
      noResults: 'No news found matching your query.',
    },
  }[language] || {
    breadcrumbHome: 'الرئيسية',
    breadcrumbNews: 'الأخبار',
    heroTitle: 'الأخبار',
    heroSubtitle:
      'كل ما هو جديد عن النادي من إنجازات، فعاليات، وتغطيات مميزة',
    latestNews: 'أحدث الأخبار',
    searchPlaceholder: 'ابحث في الأخبار...',
    allSections: 'جميع الأقسام',
    tabs: {
      all: 'الكل',
      competition: 'نتائج المسابقات',
      coverage: 'التغطيات المصورة',
      achievement: 'إنجازات الأعضاء',
      general: 'أخبار عامة',
    },
    readMore: 'أقرأ المزيد',
    backToNews: 'العودة إلى الأخبار',
    backToListBtn: 'العودة إلى قائمة الأخبار',
    shareBtn: 'مشاركة الخبر',
    linkCopied: 'تم نسخ الرابط!',
    noResults: 'لا توجد أخبار مطابقة لبحثك في الوقت الحالي.',
  };

  const filteredArticles = ARTICLES_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || item.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'competition':
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      case 'coverage':
        return <Camera className="w-3.5 h-3.5 text-cyan-400" />;
      case 'achievement':
        return <Award className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Megaphone className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const ArrowIcon = isLtr ? ArrowRight : ArrowLeft;
  const BackArrow = isLtr ? ArrowLeft : ArrowRight;

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
              {pageTexts.breadcrumbNews}
            </span>
          </div>

          {/* Hero Title & Badge */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-[#07172b] rounded-[14px] flex items-center justify-center text-orange-400">
                  <Newspaper className="w-7 h-7" />
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

      {/* 2. Main News Layout Matching Reference Screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (News List & Filters - 7 cols on LG) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Filter Card Container */}
            <div className="p-4 rounded-2xl bg-[#06182c]/90 border border-cyan-800/40 backdrop-blur-md shadow-2xl mb-2">
              
              {/* Header Title with Icon */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-900/40">
                <div className="flex items-center gap-2 text-white font-extrabold text-base">
                  <div className="p-1 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <span>{pageTexts.latestNews}</span>
                </div>
              </div>

              {/* Search Bar + Section Dropdown */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
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

                <div className="relative shrink-0 sm:w-44">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-[#040f1d] border border-cyan-900/60 rounded-xl py-2.5 px-4 text-xs font-semibold text-cyan-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="all">{pageTexts.allSections}</option>
                    <option value="competition">نتائج المسابقات</option>
                    <option value="coverage">التغطيات المصورة</option>
                    <option value="achievement">إنجازات الأعضاء</option>
                    <option value="general">أخبار عامة</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills / Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === 'all'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-sm shadow-orange-500/20'
                      : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-900/50 hover:bg-cyan-900/40'
                  }`}
                >
                  {pageTexts.tabs.all}
                </button>
                <button
                  onClick={() => setSelectedCategory('competition')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === 'competition'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-sm shadow-orange-500/20'
                      : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-900/50 hover:bg-cyan-900/40'
                  }`}
                >
                  {pageTexts.tabs.competition}
                </button>
                <button
                  onClick={() => setSelectedCategory('coverage')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === 'coverage'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-sm shadow-orange-500/20'
                      : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-900/50 hover:bg-cyan-900/40'
                  }`}
                >
                  {pageTexts.tabs.coverage}
                </button>
                <button
                  onClick={() => setSelectedCategory('achievement')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === 'achievement'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-sm shadow-orange-500/20'
                      : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-900/50 hover:bg-cyan-900/40'
                  }`}
                >
                  {pageTexts.tabs.achievement}
                </button>
                <button
                  onClick={() => setSelectedCategory('general')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === 'general'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-sm shadow-orange-500/20'
                      : 'bg-cyan-950/40 text-cyan-300/80 border-cyan-900/50 hover:bg-cyan-900/40'
                  }`}
                >
                  {pageTexts.tabs.general}
                </button>
              </div>

            </div>

            {/* List of News Cards */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-2xl bg-[#06182c]/50 border border-cyan-900/40 text-cyan-300">
                <p className="text-base font-bold">{pageTexts.noResults}</p>
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isSelected = activeArticle.id === article.id;
                return (
                  <div
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#081e36] border-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/50'
                        : 'bg-[#051425]/90 border-cyan-900/50 hover:border-cyan-700/80 hover:bg-[#07192e]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                      
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category Badge */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md font-bold tracking-wide bg-cyan-950 border border-cyan-800 text-cyan-200">
                            {getCategoryIcon(article.categorySlug)}
                            {article.categoryLabel}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug hover:text-amber-300 transition-colors">
                          {article.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-cyan-200/70 mb-3 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>

                        {/* Date & Read More */}
                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-cyan-950/60">
                          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>{article.date}</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveArticle(article);
                            }}
                            className="flex items-center gap-1 text-xs font-bold text-[#f97316] hover:text-orange-400 transition-colors cursor-pointer"
                          >
                            <span>{pageTexts.readMore}</span>
                            <ArrowIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Thumbnail with overlay icon */}
                      <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden border border-cyan-800/40 shadow-inner relative group">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c]/80 via-transparent to-transparent" />
                        
                        {/* Camera icon badge if photo coverage */}
                        {article.categorySlug === 'coverage' && (
                          <div className="absolute bottom-2 left-2 p-1 rounded-md bg-black/60 text-white backdrop-blur-sm">
                            <Camera className="w-3.5 h-3.5 text-cyan-300" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })
            )}

          </div>

          {/* Right Column (Detailed Article Reading View - 5 cols on LG) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-[#06182c]/95 border border-cyan-800/60 p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Top Navigation Row */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-cyan-900/40 text-xs">
                <button
                  onClick={() => {
                    const first = ARTICLES_DATA[0];
                    setActiveArticle(first);
                  }}
                  className="flex items-center gap-1 text-cyan-300 hover:text-white font-bold transition-colors cursor-pointer"
                >
                  <BackArrow className="w-3.5 h-3.5 text-[#f97316]" />
                  <span>{pageTexts.backToNews}</span>
                </button>

                {/* Micro Breadcrumb */}
                <span className="text-[11px] text-cyan-400/80 font-medium truncate max-w-[200px]">
                  {pageTexts.breadcrumbHome} / {pageTexts.breadcrumbNews} /{' '}
                  {activeArticle.categoryLabel}
                </span>
              </div>

              {/* Category Badge */}
              <div className="mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-cyan-950 border border-cyan-800 text-cyan-200">
                  {getCategoryIcon(activeArticle.categorySlug)}
                  {activeArticle.categoryLabel}
                </span>
              </div>

              {/* Article Headline */}
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                {activeArticle.title}
              </h2>

              {/* Author & Date */}
              <div className="flex items-center gap-4 text-xs text-cyan-300/80 mb-4 pb-3 border-b border-cyan-950/80">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  {activeArticle.author}
                </span>
              </div>

              {/* Main Banner Photo */}
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-60 w-full mb-5 border border-cyan-800/50 shadow-lg group">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/30 to-transparent" />

                {/* Emblem Watermark */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-900/60">
                  <img
                    src="/assets/aistudio/__________________3__201639fb.svg"
                    alt="Logo"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-white text-[11px] font-bold">
                    نادي منبر الشاب المبدع
                  </span>
                </div>
              </div>

              {/* Body Text */}
              <div className="space-y-3 mb-5 text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Featured Quote in Gold/Orange */}
              {activeArticle.quote && (
                <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border-r-4 border-[#f97316] text-center">
                  <p className="text-base sm:text-lg font-black text-amber-300 tracking-wide">
                    {activeArticle.quote}
                  </p>
                </div>
              )}

              {/* 4 Photo Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {activeArticle.gallery.map((thumb, idx) => (
                  <div
                    key={idx}
                    className="h-14 sm:h-16 rounded-lg overflow-hidden border border-cyan-800/40 relative group cursor-pointer"
                  >
                    <img
                      src={thumb}
                      alt={`Article Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-cyan-950/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>

              {/* Action Buttons: Share & Back to List */}
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
                  onClick={() => {
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="flex-1 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>{pageTexts.backToListBtn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
