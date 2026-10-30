export interface ActivityItem {
  id: string;
  name: string;
  slug: string;
  iconName: 'heart' | 'palette' | 'book' | 'trophy' | 'laptop' | 'leaf' | 'camera' | 'users' | 'tent';
  color: string;
  badgeColor: string;
  description: string;
  workshopsCount: number;
  upcomingEvent: string;
  highlights: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
}

export interface EventItem {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  location: string;
  description: string;
  image: string;
  spotsLeft: number;
  totalSpots: number;
  price: string;
  duration: string;
  schedule: { time: string; activity: string }[];
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'volunteering',
    name: 'تطوعية',
    slug: 'volunteering',
    iconName: 'heart',
    color: 'text-rose-400',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    description: 'مبادرات تطوعية وإنسانية تعزز التكافل والمسؤولية المجتمعية وغرس قيم العطاء بين الشباب.',
    workshopsCount: 14,
    upcomingEvent: 'حملة بسمة أمل - قوافل الخير',
    highlights: ['قوافل إغاثية وتوزيع سلات غذائية', 'ترميم وصيانة المدارس والمكتبات', 'زيارات دور رعاية الأيتام والمسنين']
  },
  {
    id: 'artistic',
    name: 'فنية',
    slug: 'artistic',
    iconName: 'palette',
    color: 'text-purple-400',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'ورش فنون تشكيلية ومسرح وخط عربي وتصوير فني لاحتضان المواهب الشابة وتنمية الذوق الإبداعي.',
    workshopsCount: 18,
    upcomingEvent: 'معرض ريشة وإبداع السنوي',
    highlights: ['دورات الرسم الرقمي والزيتي', 'ورش الخط العربي وفنون التذهيب', 'المسرح الشبابي والإلقاء التعبيري']
  },
  {
    id: 'cultural',
    name: 'ثقافية',
    slug: 'cultural',
    iconName: 'book',
    color: 'text-teal-400',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    description: 'نوادي قراءة وندوات حوارية ومناظرات فكرية تعزز الفكر النقدي وتثري المعرفة والوعي.',
    workshopsCount: 22,
    upcomingEvent: 'منتدى حوارات الشباب الفكرية',
    highlights: ['نادي القراءة الشهري ومناقشة الروايات', 'بطولة المناظرات الشبابية', 'أمسيات شعرية وجلسات أدبية']
  },
  {
    id: 'sports',
    name: 'رياضية',
    slug: 'sports',
    iconName: 'trophy',
    color: 'text-slate-100',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    description: 'دوريات رياضية، بطولات كرة قدم، سباقات ركض، ومسارات تسلق جبلي لبناء اللياقة البدنية والروح الرياضية.',
    workshopsCount: 16,
    upcomingEvent: 'دوري أبطال منبر لكرة القدم',
    highlights: ['دوري كرة القدم وكرة السلة للمبتدئين والمحترفين', 'ماراثون الشباب السنوي لمسافة 10 كم', 'رحلات الهايكينغ والمشي الجبلي']
  },
  {
    id: 'tech',
    name: 'تقنية',
    slug: 'tech',
    iconName: 'laptop',
    color: 'text-cyan-400',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'معسكرات برمجية، ورش الذكاء الاصطناعي، الأمن السيبراني، وتطوير تطبيقات الويب والهواتف الذكية.',
    workshopsCount: 25,
    upcomingEvent: 'هاكاثون حلول المستقبل الذكية',
    highlights: ['أساسيات لغة بايثون والذكاء الاصطناعي', 'تطوير تطبيقات الويب والواجهات', 'أمن المعلومات وحماية البيانات الشخصية']
  },
  {
    id: 'environmental',
    name: 'بيئية',
    slug: 'environmental',
    iconName: 'leaf',
    color: 'text-emerald-400',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'حملات تشجير وحماية التنوع الحيوي وورش إعادة التدوير لتعزيز الاستدامة البيئية وحماية الطبيعة.',
    workshopsCount: 12,
    upcomingEvent: 'مبادرة غرس 5000 شجرة',
    highlights: ['حملات تنظيف الشواطئ والغابات', 'ورش الزراعة المنزلية المستدامة', 'إعادة التدوير والحد من النفايات البلاستيكية']
  },
  {
    id: 'media',
    name: 'إعلامية',
    slug: 'media',
    iconName: 'camera',
    color: 'text-blue-400',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    description: 'صناعة المحتوى المرئي، التصوير الفوتوغرافي، المونتاج، وكتابة السيناريو وإدارة المنصات الرقمية.',
    workshopsCount: 19,
    upcomingEvent: 'دورة صناعة الأفلام القصيرة بالهاتف',
    highlights: ['تقنيات التصوير الاحترافي وتوزيع الإضاءة', 'مونتاج الفيديو والمؤثرات البصرية', 'البودكاست وصناعة المحتوى الصوتي']
  },
  {
    id: 'social',
    name: 'اجتماعية',
    slug: 'social',
    iconName: 'users',
    color: 'text-fuchsia-400',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    description: 'ملتقيات تعارف، فعاليات أسرية، برامج التوجيه والإرشاد النفسي والمهني لتعزيز الروابط المجتمعية.',
    workshopsCount: 15,
    upcomingEvent: 'ملتقى الأجيال لتبادل الخبرات',
    highlights: ['ورش التواصل الفعال والذكاء العاطفي', 'لقاءات إرشاد مهني وبناء السيرة الذاتية', 'جلسات تفاعلية لتعزيز العمل الجماعي']
  },
  {
    id: 'scouting',
    name: 'كشفية',
    slug: 'scouting',
    iconName: 'tent',
    color: 'text-teal-300',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    description: 'مخيمات خلوية، مهارات البقاء والاعتماد على النفس، الإسعافات الأولية وتوجيه البوصلة والخرائط.',
    workshopsCount: 11,
    upcomingEvent: 'مخيم الشعلة الكشفي الربيعي',
    highlights: ['نصب الخيام وإشعال النار بأمان', 'الإسعافات الأولية في الظروف القاسية', 'الملاحة البرية واستخدام البوصلة والنجوم']
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'club-inauguration',
    title: 'تنصيب نادي منبر الشاب المبدع بسوق أهراس',
    date: '27 أكتوبر 2026',
    thumbnail: '/assets/aistudio/864857700_1092972310232179_2843095535031713476_n_186b5791.jpg',
    category: 'أخبار النادي',
    readTime: '3 دقائق قراءة',
    summary: 'تم اليوم الثلاثاء تنصيب نادي منبر الشاب المبدع بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس تحت إشراف رابطة الهواء الطلق.',
    content: [
      'تم اليوم الثلاثاء تنصيب #نادي_منبر_الشاب_المبدع و ذلك في إطار مشروع النوادي الشبابية المستحدثة و الممولة من طرف وزارة الشباب وذلك على مستوى مكتب الرابطة بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس بهدف تشجيع المواهب الشبابية وتعزيز روح الإبداع والمبادرة.',
      'وجرت فعاليات التنصيب الرسمي تحت إشراف رابطة الهواء الطلق وبرئاسة السيدة سعيدي إيمان، وبحضور جمع من الإطارات الشبانية والشباب المبدع وأعضاء النادي المؤسسين.',
      'ويهدف النادي إلى تشجيع المواهب الشابة، تعزيز روح الإبداع والمبادرة لدى الشباب، وتوفير فضاء مفتوح للتعبير وصناعة المبادرات الميدانية في ولاية سوق أهراس والمناطق المجاورة.'
    ]
  }
];

export const FEATURED_EVENT: EventItem = {
  id: 'creative-youth-camp',
  title: 'معسكر الشباب المبدع',
  day: '22',
  month: 'أبريل',
  year: '2026',
  location: 'مخيم آيزرام - منطقة النشاطات الجبلية',
  description: 'تجربة شبابية مميزة تجمع بين التعلم والمغامرة والعمل الجماعي.',
  image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
  spotsLeft: 18,
  totalSpots: 60,
  price: 'مجان للمسجلين الأعضاء',
  duration: '3 أيام وليلتين',
  schedule: [
    { time: 'اليوم الأول - 09:00 ص', activity: 'التجمع، الانطلاق، ونصب الخيام ومراسم الافتتاح' },
    { time: 'اليوم الأول - 04:00 م', activity: 'ورشة مهارات القيادة والعمل الجماعي في الهواء الطلق' },
    { time: 'اليوم الأول - 08:30 م', activity: 'أمسية السمر الكشفية حول شعلة النار وتبادل الخبرات' },
    { time: 'اليوم الثاني - 07:00 ص', activity: 'مسار الهايكينغ الاستكشافي ومسابقة التوجيه بالبوصلة' },
    { time: 'اليوم الثاني - 02:00 م', activity: 'تحدي حل المشكلات المجتمعية وبناء النماذج الأولية' },
    { time: 'اليوم الثالث - 10:00 ص', activity: 'معرض الإنجازات، التكريم، وتوزيع الشهادات' }
  ]
};

export const ALL_EVENTS: EventItem[] = [
  FEATURED_EVENT,
  {
    id: 'hackathon-2026',
    title: 'هاكاثون البرمجة للمجتمع',
    day: '05',
    month: 'مايو',
    year: '2026',
    location: 'قاعة الابتكار التقني - المقر الرئيسي',
    description: 'تحدي برمجي متواصل لمدة 24 ساعة لبناء حلول رقمية تخدم العمل الإنساني والشبابي.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 12,
    totalSpots: 40,
    price: 'مجاني بالكامل',
    duration: '24 ساعة متواصلة',
    schedule: [
      { time: '09:00 ص', activity: 'استقبال الفرق وإعلان محاور التحدي' },
      { time: '11:00 ص', activity: 'انطلاق ماراثون التطوير والبرمجة' },
      { time: '08:00 ص (اليوم التالي)', activity: 'تحكيم المشاريع وإعلان الفائزين' }
    ]
  },
  {
    id: 'ramadan-charity',
    title: 'ملتقى ريادة الأعمال المجتمعية',
    day: '18',
    month: 'مايو',
    year: '2026',
    location: 'مركز المؤتمرات والشباب',
    description: 'جلسات حوارية مع رواد أعمال شباب وقصص نجاح ملهمة في إطلاق المشاريع المؤثرة.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 35,
    totalSpots: 100,
    price: 'مجاني',
    duration: 'يوم واحد (4 ساعات)',
    schedule: [
      { time: '05:00 م', activity: 'جلسة افتتاحية: من فكرة إلى مشروع ناجح' },
      { time: '06:30 م', activity: 'ورشة عمل: بناء نموذج العمل التجاري' },
      { time: '08:00 م', activity: 'جلسات تشبيك واستشارات فردية' }
    ]
  }
];
