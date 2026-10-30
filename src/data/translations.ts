export type Language = 'ar' | 'fr' | 'en';

export interface LegalSection {
  title: string;
  text: string;
}

export interface TranslationData {
  langCode: Language;
  langName: string;
  nativeName: string;
  flag: string;
  direction: 'rtl' | 'ltr';
  clubName: string;
  tagline: string;
  city: string;
  nav: {
    home: string;
    about: string;
    activities: string;
    news: string;
    events: string;
    membership: string;
    account: string;
    contact: string;
    userTooltip: string;
    langTooltip: string;
  };
  hero: {
    kicker: string;
    titlePrefix: string;
    titleMain: string;
    titleAccent: string;
    description: string;
    ctaActivities: string;
    ctaVideo: string;
    slides: {
      tagline: string;
      titlePrefix: string;
      titleMain: string;
      titleAccent: string;
      description: string;
    }[];
  };
  activitiesSection: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      name: string;
      description: string;
      upcomingEvent: string;
      highlights: string[];
    }[];
  };
  joinCard: {
    prefix: string;
    headline: string;
    description: string;
    button: string;
  };
  newsCard: {
    title: string;
    viewAll: string;
    items: {
      id: string;
      title: string;
      date: string;
      category: string;
      readTime: string;
      summary: string;
      content: string[];
    }[];
  };
  eventsCard: {
    title: string;
    viewAll: string;
    featured: {
      id: string;
      title: string;
      day: string;
      month: string;
      year: string;
      location: string;
      description: string;
      price: string;
      duration: string;
      button: string;
      schedule: { time: string; activity: string }[];
    };
  };
  footer: {
    copyright: string;
    note: string;
    privacy: string;
    terms: string;
  };
  modals: {
    close: string;
    join: {
      title: string;
      subtitle: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      ageLabel: string;
      cityLabel: string;
      idProofLabel: string;
      idProofHelp: string;
      interestsLabel: string;
      motivationLabel: string;
      motivationPlaceholder: string;
      submitBtn: string;
      successTitle: string;
      successDesc: string;
      cardTitle: string;
      cardMembershipNumber: string;
      cardStatus: string;
      cardStatusActive: string;
      downloadCard: string;
      doneBtn: string;
    };
    contact: {
      title: string;
      subtitle: string;
      fullName: string;
      email: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      sendBtn: string;
      successMsg: string;
      addressTitle: string;
      addressValue: string;
      phoneValue: string;
      emailValue: string;
      workHoursTitle: string;
      workHoursValue: string;
    };
    about: {
      title: string;
      subtitle: string;
      breadcrumbHome?: string;
      breadcrumbAbout?: string;
      historyTitle: string;
      historyText?: string;
      historyParagraphs?: string[];
      historyQuote?: string;
      visionTitle: string;
      visionText: string;
      missionTitle: string;
      missionText: string;
      goalsTitle: string;
      goals?: string[];
      goalsIntro?: string;
      goalsBullets?: string[];
      valuesTitle?: string;
      values?: { title: string; desc: string }[];
      stats?: { number: string; label: string }[];
      galleryBadge?: string;
      exploreMoreBtn?: string;
      statsYears?: string;
      statsActivities?: string;
      statsMembers?: string;
      leadershipTitle?: string;
      viewAllMembers?: string;
      mediaInfoTitle?: string;
      allPhotosBtn?: string;
      infoLocationLabel?: string;
      infoLocationValue?: string;
      infoHoursLabel?: string;
      infoHoursValue?: string;
      infoContactLabel?: string;
      infoContactValue?: string;
      infoEmailLabel?: string;
      infoEmailValue?: string;
    };
    video: {
      title: string;
      desc: string;
      closeBtn: string;
    };
    activityDetail: {
      workshopsLabel: string;
      upcomingEventLabel: string;
      highlightsLabel: string;
      registerBtn: string;
    };
    eventDetail: {
      spotsLeftLabel: string;
      priceLabel: string;
      durationLabel: string;
      locationLabel: string;
      scheduleTitle: string;
      registerBtn: string;
      successMsg: string;
    };
    terms: {
      title: string;
      sections: LegalSection[];
    };
    privacy: {
      title: string;
      sections: LegalSection[];
    };
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  ar: {
    langCode: 'ar',
    langName: 'Arabic',
    nativeName: 'العربية',
    flag: '🇩🇿',
    direction: 'rtl',
    clubName: 'نادي منبر الشاب المبدع',
    tagline: 'إبداع .. تواصل .. بناء.',
    city: 'سوق أهراس، الجزائر',
    nav: {
      home: 'الرئيسية',
      about: 'عن النادي',
      activities: 'الأنشطة',
      news: 'الأخبار',
      events: 'الفعاليات',
      membership: 'العضوية والأنضمام',
      account: 'حسابي',
      contact: 'تواصل معنا',
      userTooltip: 'بوابة العضوية / حسابي',
      langTooltip: 'اختيار اللغة',
    },
    hero: {
      kicker: 'نادي منبر الشاب المبدع',
      titlePrefix: 'معاً..',
      titleMain: 'نبدع ونصنع ',
      titleAccent: 'الأثر',
      description: 'مجتمع شبابي حيوي يطلق الطاقات ويصنع الفرص ويخدم المجتمع',
      ctaActivities: 'اكتشف أنشطتنا',
      ctaVideo: 'شاهد الفيديو',
      slides: [
        {
          tagline: 'نادي منبر الشاب المبدع',
          titlePrefix: 'معاً..',
          titleMain: 'نبدع ونصنع ',
          titleAccent: 'الأثر',
          description: 'مجتمع شبابي حيوي يطلق الطاقات ويصنع الفرص ويخدم المجتمع',
        },
        {
          tagline: 'نادي منبر الشاب المبدع',
          titlePrefix: 'معاً..',
          titleMain: 'نبدع ونصنع ',
          titleAccent: 'الأثر',
          description: 'مجتمع شبابي حيوي يطلق الطاقات ويصنع الفرص ويخدم المجتمع',
        },
        {
          tagline: 'نادي منبر الشاب المبدع',
          titlePrefix: 'طاقات تتجدد..',
          titleMain: 'ورؤية تصنع ',
          titleAccent: 'المستقبل',
          description: 'بيئة إبداعية محفزة تجمع خيرة الشباب لبناء مبادرات ريادية ومجتمعية رائدة',
        },
      ],
    },
    activitiesSection: {
      title: 'أنشطة النادي',
      subtitle: 'فرص حقيقية لاكتشاف قدراتك وتطوير مهاراتك',
      items: [
        {
          id: 'volunteering',
          name: 'تطوعية',
          description: 'مبادرات تطوعية وإنسانية تعزز التكافل والمسؤولية المجتمعية وغرس قيم العطاء بين الشباب.',
          upcomingEvent: 'حملة بسمة أمل - قوافل الخير',
          highlights: ['قوافل إغاثية وتوزيع سلات غذائية', 'ترميم وصيانة المدارس والمكتبات', 'زيارات دور رعاية الأيتام والمسنين'],
        },
        {
          id: 'artistic',
          name: 'فنية',
          description: 'ورش فنون تشكيلية ومسرح وخط عربي وتصوير فني لاحتضان المواهب الشابة وتنمية الذوق الإبداعي.',
          upcomingEvent: 'معرض ريشة وإبداع السنوي',
          highlights: ['دورات الرسم الرقمي والزيتي', 'ورش الخط العربي وفنون التذهيب', 'المسرح الشبابي والإلقاء التعبيري'],
        },
        {
          id: 'cultural',
          name: 'ثقافية',
          description: 'نوادي قراءة وندوات حوارية ومناظرات فكرية تعزز الفكر النقدي وتثري المعرفة والوعي.',
          upcomingEvent: 'منتدى حوارات الشباب الفكرية',
          highlights: ['نادي القراءة الشهري ومناقشة الروايات', 'بطولة المناظرات الشبابية', 'أمسيات شعرية وجلسات أدبية'],
        },
        {
          id: 'sports',
          name: 'رياضية',
          description: 'دوريات رياضية، بطولات كرة قدم، سباقات ركض، ومسارات تسلق جبلي لبناء اللياقة البدنية والروح الرياضية.',
          upcomingEvent: 'دوري أبطال منبر لكرة القدم',
          highlights: ['دوري كرة القدم وكرة السلة للمبتدئين والمحترفين', 'ماراثون الشباب السنوي لمسافة 10 كم', 'رحلات الهايكينغ والمشي الجبلي'],
        },
        {
          id: 'tech',
          name: 'تقنية',
          description: 'معسكرات برمجية، ورش الذكاء الاصطناعي، الأمن السيبراني، وتطوير تطبيقات الويب والهواتف الذكية.',
          upcomingEvent: 'هاكاثون حلول المستقبل الذكية',
          highlights: ['أساسيات لغة بايثون والذكاء الاصطناعي', 'تطوير تطبيقات الويب والواجهات', 'أمن المعلومات وحماية البيانات الشخصية'],
        },
        {
          id: 'environmental',
          name: 'بيئية',
          description: 'حملات تشجير وحماية التنوع الحيوي وورش إعادة التدوير لتعزيز الاستدامة البيئية وحماية الطبيعة.',
          upcomingEvent: 'مبادرة غرس 5000 شجرة',
          highlights: ['حملات تنظيف الشواطئ والغابات', 'ورش الزراعة المنزلية المستدامة', 'إعادة التدوير والحد من النفايات البلاستيكية'],
        },
        {
          id: 'media',
          name: 'إعلامية',
          description: 'صناعة المحتوى المرئي، التصوير الفوتوغرافي، المونتاج، وكتابة السيناريو وإدارة المنصات الرقمية.',
          upcomingEvent: 'دورة صناعة الأفلام القصيرة بالهاتف',
          highlights: ['تقنيات التصوير الاحترافي وتوزيع الإضاءة', 'مونتاج الفيديو والمؤثرات البصرية', 'البودكاست وصناعة المحتوى الصوتي'],
        },
        {
          id: 'social',
          name: 'اجتماعية',
          description: 'ملتقيات تعارف، فعاليات أسرية، برامج التوجيه والإرشاد النفسي والمهني لتعزيز الروابط المجتمعية.',
          upcomingEvent: 'ملتقى الأجيال لتبادل الخبرات',
          highlights: ['ورش التواصل الفعال والذكاء العاطفي', 'لقاءات إرشاد مهني وبناء السيرة الذاتية', 'جلسات تفاعلية لتعزيز العمل الجماعي'],
        },
        {
          id: 'scouting',
          name: 'كشفية',
          description: 'مخيمات خلوية، مهارات البقاء والاعتماد على النفس، الإسعافات الأولية وتوجيه البوصلة والخرائط.',
          upcomingEvent: 'مخيم الشعلة الكشفي الربيعي',
          highlights: ['نصب الخيام وإشعال النار بأمان', 'الإسعافات الأولية في الظروف القاسية', 'الملاحة البرية واستخدام البوصلة والنجوم'],
        },
      ],
    },
    joinCard: {
      prefix: 'معاً..',
      headline: 'نصنع جيلاً مبدعاً ومؤثراً',
      description: 'انضم إلى نادي منبر الشاب المبدع ، وكن جزءاً من مجتمع شبابي ملهم ، يساهم في صناعة التغيير.',
      button: 'انضم الآن',
    },
    newsCard: {
      title: 'أحدث الأخبار',
      viewAll: 'عرض الكل',
      items: [
        {
          id: 'club-inauguration',
          title: '#تنصيب نادي منبر الشاب المبدع بسوق أهراس',
          date: '27 أكتوبر 2026',
          category: 'أخبار النادي',
          readTime: '3 دقائق قراءة',
          summary: 'تم اليوم الثلاثاء تنصيب نادي «منبر الشاب المبدع» بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس تحت إشراف رابطة الهواء الطلق ورئاسة السيدة سعيدي إيمان.',
          content: [
            'تم اليوم الثلاثاء تنصيب #نادي_منبر_الشاب_المبدع و ذلك في إطار مشروع النوادي الشبابية المستحدثة و الممولة من طرف وزارة الشباب وذلك على مستوى مكتب الرابطة بمقر دار الشباب حفصي عبد الرزاق بسوق أهراس بهدف تشجيع المواهب الشبابية وتعزيز روح الإبداع والمبادرة.',
            'وجرت مراسم التنصيب الرسمي تحت إشراف رابطة الهواء الطلق وبرئاسة السيدة سعيدي إيمان، وبحضور نخبة من الشباب الفاعل وممثلي الأنشطة والجمعيات وأعضاء النادي المؤسسين.',
            'ويأتي التنصيب في إطار مشروع النوادي الشبابية المستحدثة، الذي تموّله وزارة الشباب. ويهدف النادي إلى تشجيع المواهب الشبابية وتعزيز روح الإبداع والمبادرة لدى الشباب واحتضان طاقاتهم الإيجابية.'
          ],
        },
      ],
    },
    eventsCard: {
      title: 'الفعاليات القادمة',
      viewAll: 'عرض الكل',
      featured: {
        id: 'creative-youth-camp',
        title: 'معسكر الشباب المبدع',
        day: '22',
        month: 'أبريل',
        year: '2026',
        location: 'مخيم آيزرام - منطقة النشاطات الجبلية',
        description: 'تجربة شبابية مميزة تجمع بين التعلم والمغامرة والعمل الجماعي.',
        price: 'مجان للمسجلين الأعضاء',
        duration: '3 أيام وليلتين',
        button: 'سجل الآن',
        schedule: [
          { time: 'اليوم الأول - 09:00 ص', activity: 'التجمع، الانطلاق، ونصب الخيام ومراسم الافتتاح' },
          { time: 'اليوم الأول - 04:00 م', activity: 'ورشة مهارات القيادة والعمل الجماعي في الهواء الطلق' },
          { time: 'اليوم الأول - 08:30 م', activity: 'أمسية السمر الكشفية حول شعلة النار وتبادل الخبرات' },
          { time: 'اليوم الثاني - 07:00 ص', activity: 'مسار الهايكينغ الاستكشافي ومسابقة التوجيه بالبوصلة' },
          { time: 'اليوم الثاني - 02:00 م', activity: 'تحدي حل المشكلات المجتمعية وبناء النماذج الأولية' },
          { time: 'اليوم الثالث - 10:00 ص', activity: 'معرض الإنجازات، التكريم، وتوزيع الشهادات' },
        ],
      },
    },
    footer: {
      copyright: 'جميع الحقوق محفوظة لنادي منبر الشاب المبدع – سوق أهراس © 2026',
      note: 'منصة شبابية رقمية متكاملة لخدمة المجتمع وبناء القدرات والإبداع والابتكار',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
    },
    modals: {
      close: 'إغلاق',
      join: {
        title: 'استمارة الانضمام والعضوية',
        subtitle: 'انضم إلى عائلة نادي منبر الشاب المبدع بسوق أهراس وابدأ رحلتك الإبداعية',
        fullNameLabel: 'الاسم واللقب الكامل *',
        fullNamePlaceholder: 'مثال: عبد الرؤوف بن علي',
        emailLabel: 'البريد الإلكتروني *',
        emailPlaceholder: 'name@example.com',
        phoneLabel: 'رقم الهاتف *',
        phonePlaceholder: '06 XX XX XX XX',
        ageLabel: 'العمر *',
        cityLabel: 'مكان الإقامة *',
        idProofLabel: 'إثبات الهوية (بطاقة تعريف للبالغين / تصريح أبوي للقصر) *',
        idProofHelp: 'بطاقة التعريف الوطنية بالنسبة للبالغين، أما للقصر تصريح أبوي أو شرفي.',
        interestsLabel: 'الاهتمامات والمجالات المفضلة *',
        motivationLabel: 'كلمة موجزة عن دوافعك ومواهبك *',
        motivationPlaceholder: 'أخبرنا عن مهاراتك وما تتطلع لتقديمه وتحقيقه في النادي...',
        submitBtn: 'تأكيد التسجيل واستخراج بطاقة العضوية',
        successTitle: 'تهانينا! تم تسجيل عضويتك بنجاح 🎉',
        successDesc: 'مرحباً بك في نادي منبر الشاب المبدع. تم إصدار بطاقة عضويتك الرقمية الرسمية.',
        cardTitle: 'بطاقة عضوية رسمية',
        cardMembershipNumber: 'رقم العضوية',
        cardStatus: 'الحالة',
        cardStatusActive: 'عضو نشط معتمد',
        downloadCard: 'تحميل البطاقة الرقمية (PDF/PNG)',
        doneBtn: 'تم وإغلاق',
      },
      contact: {
        title: 'تواصل مع إدارة النادي',
        subtitle: 'يسعدنا دائماً استقبال استفساراتكم واقتراحاتكم وشراكاتكم المجتمعية',
        fullName: 'الاسم الكامل *',
        email: 'البريد الإلكتروني *',
        subject: 'موضوع الرسالة *',
        subjectPlaceholder: 'استفسار عن فعالية / مقترح نشاط / طلب شراكة',
        message: 'نص الرسالة *',
        messagePlaceholder: 'اكتب رسالتك بالتفصيل هنا...',
        sendBtn: 'إرسال الرسالة الآن',
        successMsg: 'تم إرسال رسالتك بنجاح! سيقوم فريق إدارة النادي بالرد عليك في أقرب وقت.',
        addressTitle: 'المقر الرسمي',
        addressValue: 'دار الشباب حفصي عبد الرزاق، سوق أهراس، الجزائر',
        phoneValue: '+213697921551',
        emailValue: 'club.jeunes41@gmail.com',
        workHoursTitle: 'أوقات الاستقبال',
        workHoursValue: 'من السبت إلى الخميس: 09:00 ص – 06:00 م',
      },
      about: {
        title: 'عن النادي',
        subtitle: 'نادي منبر الشاب المبدع .. مساحة تصنع الفرق',
        breadcrumbHome: 'الرئيسية',
        breadcrumbAbout: 'عن النادي',
        historyTitle: 'نبذة تاريخية عن النادي',
        historyParagraphs: [
          'يُعدّ نادي منبر الشاب المبدع فضاءً شبابيًا وثقافيًا يهدف إلى اكتشاف مواهب الشباب وصقل قدراتهم، وتشجيعهم على الإبداع والابتكار والمشاركة الفعّالة في الحياة الثقافية والاجتماعية.',
          'جاءت فكرة النادي انطلاقًا من الإيمان بأهمية الشباب باعتبارهم طاقة المجتمع ومحرك تطوره، وبضرورة توفير بيئة محفّزة تتيح لهم التعبير عن أفكارهم، وتنمية مهاراتهم في مجالات الثقافة والأدب والخطابة والإعلام والعمل التطوعي.',
          'ويسعى النادي إلى ترسيخ روح المبادرة والعمل الجماعي، وتنظيم الأنشطة والورشات واللقاءات الثقافية والتكوينية التي تساهم في بناء شخصية الشاب، وتعزيز ثقته بنفسه، وتوسيع مداركه، وتنمية حسّه الإبداعي.',
          'كما يطمح النادي إلى أن يكون منبرًا مفتوحًا للأفكار الهادفة والمواهب الواعدة، وجسرًا للتواصل بين الشباب، ومجالًا لتبادل الخبرات والمعارف، بما يخدم المجتمع ويساهم في نشر ثقافة الإبداع والتميز.',
          'ومن خلال رسالته الشبابية والثقافية، يتطلع نادي منبر الشاب المبدع إلى بناء جيل واعٍ ومثقف ومبادر، يؤمن بقدراته ويسعى إلى تحويل أفكاره إلى إنجازات ملموسة تخدم الوطن والمجتمع.',
        ],
        historyQuote: 'من فكرة صغيرة .. بدأ الحلم، ليصبح واقعاً يصنع الفرق',
        visionTitle: 'الرؤية',
        visionText: 'أن يكون نادي منبر الشاب المبدع فضاءً شبابيًا رائدًا في اكتشاف المواهب وتنمية القدرات الإبداعية والفكرية والثقافية، ومنبرًا مفتوحًا أمام الشباب للتعبير عن أفكارهم وتجسيد مبادراتهم، بما يسهم في بناء جيل واعٍ ومثقف ومبتكر، قادر على الإسهام الفعّال في تنمية المجتمع وترقية الحياة الثقافية والشبابية بمدينة سوق أهراس.',
        missionTitle: 'الرسالة',
        missionText: 'يسعى نادي منبر الشاب المبدع إلى تمكين الشباب من إبراز مواهبهم وتطوير مهاراتهم، من خلال توفير بيئة محفزة على الإبداع والتعلم والتواصل، وتنظيم أنشطة ثقافية وفكرية وتكوينية متنوعة، وتشجيع المبادرات الشبابية والعمل التطوعي، وترسيخ قيم المواطنة والمسؤولية والتعاون، بما يعزز دور الشباب في الحياة الثقافية والاجتماعية، انسجامًا مع أهداف قطاع الشباب والرياضة.',
        goalsTitle: 'الأهداف',
        goalsIntro: 'يهدف نادي منبر الشاب المبدع، التابع لمديرية الشباب والرياضة، إلى تنمية قدرات الشباب وصقل مواهبهم في مختلف المجالات العلمية والثقافية والفنية والرياضية والاجتماعية، من خلال توفير فضاء شبابي محفّز على الإبداع والمبادرة والتعلم والمشاركة المجتمعية.',
        goalsBullets: [
          'تنمية مهارات الشباب ورفع قدراتهم الإبداعية.',
          'إتاحة فرص الابتكار والتميز والمبادرة.',
          'بناء شبكة علاقات وشراكات مجتمعية هادفة.',
          'المساهمة الفعّالة في خدمة وتنمية المجتمع.',
        ],
        galleryBadge: 'معرض الصور',
        exploreMoreBtn: 'اكتشف المزيد',
        statsYears: 'سنوات من العطاء',
        statsActivities: 'نشاط سنوي',
        statsMembers: 'عضو نشط',
        leadershipTitle: 'أعضاء الإدارة والمشرفون',
        viewAllMembers: 'عرض جميع الأعضاء',
        mediaInfoTitle: 'صور ومعلومات عن النادي',
        allPhotosBtn: 'كل الصور',
        infoLocationLabel: 'الموقع',
        infoLocationValue: 'دار الشباب حفصي عبد الرزاق - سوق أهراس، الجزائر',
        infoHoursLabel: 'ساعات العمل',
        infoHoursValue: 'من 8:00 ص إلى 6:00 م',
        infoContactLabel: 'التواصل',
        infoContactValue: '+213 697 92 15 51',
        infoEmailLabel: 'البريد الإلكتروني',
        infoEmailValue: 'club.jeunes41@gmail.com',
      },
      video: {
        title: 'شاهد وثائقي نادي منبر الشاب المبدع',
        desc: 'جولة بصرية ملهمة توثق أبرز محطات النادي وأنشطته ومبادراته الميدانية بسوق أهراس.',
        closeBtn: 'إغلاق الفيديو',
      },
      activityDetail: {
        workshopsLabel: 'ورشة تدريبية سنوية',
        upcomingEventLabel: 'الحدث القادم المرتقب',
        highlightsLabel: 'أبرز البرامج والمحاور',
        registerBtn: 'سجل اهتمامك بهذا النشاط',
      },
      eventDetail: {
        spotsLeftLabel: 'المقاعد المتبقية',
        priceLabel: 'رسوم المشاركة',
        durationLabel: 'المدة الزمنية',
        locationLabel: 'المكان المعتمد',
        scheduleTitle: 'البرنامج التفصيلي للفعالية',
        registerBtn: 'تأكيد التسجيل في الفعالية',
        successMsg: 'تم حجز مقعدك بنجاح! ستصلك رسالة التأكيد عبر البريد الإلكتروني ورسالة نصية قصيرة.',
      },
      terms: {
        title: 'شروط الاستخدام – نادي منبر الشاب المبدع',
        sections: [
          {
            title: '1. مقدمة',
            text: 'مرحبًا بكم في الموقع الإلكتروني لنادي منبر الشاب المبدع – سوق أهراس، الجزائر. يهدف الموقع إلى التعريف بالنادي وأنشطته ومبادراته، ونشر الأخبار والإعلانات، وإتاحة المعلومات المتعلقة بالفعاليات والعضوية ووسائل التواصل مع الإدارة.\nتوضح هذه الشروط القواعد العامة لاستخدام الموقع والاستفادة من خدماته. ويُرجى قراءتها بعناية قبل استخدام الاستمارات أو إرسال المحتوى أو التفاعل مع الخدمات المتاحة.'
          },
          {
            title: '2. استخدام الموقع',
            text: 'يوافق المستخدم على استخدام الموقع لأغراض مشروعة وبما يحترم حقوق الآخرين والأنظمة المعمول بها، ويلتزم بما يلي:\n• تقديم معلومات صحيحة عند تعبئة الاستمارات.\n• عدم استخدام الموقع للإساءة أو التهديد أو التشهير أو انتهاك خصوصية الآخرين.\n• عدم إرسال محتوى غير قانوني أو مضلل أو ينتهك حقوق الملكية الفكرية.\n• عدم محاولة اختراق الموقع أو تعطيل خدماته أو الوصول غير المصرح به إلى بياناته.\n• عدم استخدام الاستمارات لإرسال الرسائل المزعجة أو الطلبات الكاذبة المتكررة.\n• احترام القواعد التنظيمية الخاصة بالأنشطة والفعاليات عند المشاركة فيها.'
          },
          {
            title: '3. المعلومات المنشورة على الموقع',
            text: 'يسعى النادي إلى تقديم معلومات واضحة ومحدثة عن أنشطته وأخباره وبرامجه، إلا أن مواعيد الفعاليات وأماكنها وشروط المشاركة قد تتغير لأسباب تنظيمية أو طارئة.\nلذلك، يُنصح بالتحقق من الإعلانات الرسمية أو التواصل مع إدارة النادي قبل اتخاذ أي ترتيبات تعتمد على موعد فعالية أو تفاصيلها.\nولا يُعد نشر فعالية أو إعلان عنها تأكيدًا لقبول كل طلبات المشاركة أو العضوية.'
          },
          {
            title: '4. العضوية وطلبات الانضمام',
            text: 'تتيح استمارة العضوية للراغبين تقديم بياناتهم واهتماماتهم إلى النادي وفق الآلية المحددة.\nويشترط لتقديم الطلب:\n• تقديم معلومات صحيحة ومطابقة للواقع (بطاقة التعريف الوطنية للبالغين، وتصريح أبوي أو شرفي للقصر).\n• الالتزام بمبادئ النادي وأهدافه وأنشطته في حال قبول العضوية.\n• يملك النادي الحق في مراجعة الطلبات والبت فيها وفق طاقته الاستيعابية ومعاييره التنظيمية.'
          },
          {
            title: '5. التسجيل في الفعاليات والأنشطة',
            text: 'يتيح الموقع إمكانية التسجيل أو إبداء الاهتمام بالمشاركة في بعض الفعاليات والورشات. ويخضع قبول المشاركين للعدد المتاح والشروط الخاصة بكل فعالية، ويحتفظ النادي بالحق في تعديل برنامج أي فعالية أو إلغائها عند الضرورة.'
          },
          {
            title: '6. الملكية الفكرية',
            text: 'جميع محتويات الموقع من نصوص وتصاميم وشعارات وصور ومواد مرئية أو مسموعة هي ملك لنادي منبر الشاب المبدع أو مرخصة له، وتخضع للحماية القانونية.\nولا يجوز نسخ أي جزء من المحتوى أو إعادة نشره أو استخدامه لأغراض تجارية دون إذن كتابي مسبق من إدارة النادي، مع السماح بالمشاركة الشخصية والتوعوية بشرط الإشارة الصريحة للمصدر.'
          },
          {
            title: '7. المحتوى الذي يقدمه المستخدم',
            text: 'عند إرسال أي محتوى أو اقتراحات أو مشاركات عبر الموقع، يقر المستخدم بأنه يملك الحق في إرسالها وأنها لا تنتهك حقوق أي طرف ثالث.\nويمنح المستخدم النادي حق الاطلاع على هذا المحتوى واستخدامه في إطار أنشطة النادي والتواصل معه، دون أي التزام مالي.'
          },
          {
            title: '8. الصور والتغطيات الإعلامية',
            text: 'قد ينشر النادي صورًا وتغطيات لأنشطته تتضمن مشاركين أو حضورًا، لتوثيق الفعاليات وإبراز أثر المبادرات.\nوفي حال وجود رغبة لدى أي شخص في عدم نشر صورته أو طلب إزالتها، يمكنه التواصل مع إدارة النادي للنظر في الطلب ومعالجته وفق الإجراءات المتاحة.'
          },
          {
            title: '9. الروابط والخدمات الخارجية',
            text: 'قد يحتوي الموقع على روابط إلى مواقع أو منصات خارجية (مثل منصات التواصل الاجتماعي). وهذه الروابط مقدمة لتسهيل الوصول فقط، ولا يعني وجودها تأييد النادي لمحتواها أو تحمله أي مسؤولية عن سياساتها أو خدماتها.'
          },
          {
            title: '10. توافر الموقع والتغييرات',
            text: 'يسعى النادي إلى ضمان استمرار عمل الموقع وتوافره دون انقطاع، إلا أنه قد تحدث أعطال تقنية أو أعمال صيانة مؤقتة.\nويحتفظ النادي بحقه في تعديل محتوى الموقع أو تحديثه أو إيقاف أي جزء منه مؤقتًا أو نهائيًا في أي وقت دون إشعار مسبق.'
          },
          {
            title: '11. حدود المسؤولية',
            text: 'يُقدّم الموقع ومحتواه "كما هو" لأغراض الإخبار والتواصل والتعريف بأنشطة النادي.\nولا يتحمل النادي المسؤولية عن أي أضرار مباشرة أو غير مباشرة تنشأ عن استخدام الموقع أو عدم القدرة على استخدامه، أو عن أي تأخير في الرد على الرسائل، أو عن أي تغييرات تطرأ على الفعاليات لأسباب خارجة عن الإرادة.'
          },
          {
            title: '12. الخصوصية وحماية البيانات',
            text: 'تخضع معالجة البيانات الشخصية لسياسة الخصوصية المعتمدة لدى النادي، والتي توضح كيفية جمع البيانات واستخدامها وحمايتها.'
          },
          {
            title: '13. التعديلات على الشروط',
            text: 'يحتفظ النادي بحقه في تعديل هذه الشروط في أي وقت لتتوافق مع التطورات التنظيمية والتقنية. وتصبح التعديلات نافذة فور نشرها على هذه الصفحة، ويُعد استمرار استخدام الموقع موافقة عليها.'
          },
          {
            title: '14. القانون المعمول به',
            text: 'تخضع هذه الشروط وتفسر وفقًا للقوانين والأنظمة المعمول بها في الجمهورية الجزائرية الديمقراطية الشعبية، وتختص الجهات القضائية المختصة بالنظر في أي نزاع ينشأ عنها.'
          },
          {
            title: '15. التواصل',
            text: 'لأي استفسار أو ملاحظات بشأن هذه الشروط، يمكنكم التواصل مع إدارة النادي عبر البريد الإلكتروني: club.jeunes41@gmail.com أو الهاتف: +213697921551، أو زيارة مقر النادي بدار الشباب حفصي عبد الرزاق، سوق أهراس، الجزائر.'
          }
        ]
      },
      privacy: {
        title: 'سياسة الخصوصية – نادي منبر الشاب المبدع',
        sections: [
          {
            title: '1. مقدمة',
            text: 'يولي نادي منبر الشاب المبدع أهمية كبيرة لخصوصية زوار موقعه الإلكتروني وأعضائه والأشخاص الراغبين في الانضمام إليه. وتهدف هذه السياسة إلى توضيح طبيعة المعلومات التي قد يتم جمعها، وأسباب استخدامها، وكيفية التعامل معها وحمايتها.\nباستخدام الموقع أو تعبئة استماراته، يُرجى الاطلاع على هذه السياسة وفهم كيفية معالجة البيانات وفق الإجراءات المعتمدة لدى النادي والتشريعات المعمول بها.'
          },
          {
            title: '2. المعلومات التي قد نجمعها',
            text: 'قد يجمع الموقع المعلومات التي يقدمها المستخدم طوعًا من خلال استمارات التسجيل والتواصل، ومنها:\n• الاسم واللقب.\n• تاريخ الميلاد أو العمر، عند الحاجة.\n• رقم الهاتف والبريد الإلكتروني.\n• مكان الإقامة.\n• بطاقة التعريف الوطنية بالنسبة إلى البالغين أما للقصر تصريح أبوي أو شرفي.\n• الاهتمامات والمواهب والأنشطة المفضلة.\n• المعلومات الواردة في الرسائل والاستفسارات وطلبات الانضمام.\n• المعلومات التقنية الضرورية لتشغيل الموقع وأمنه.\nيُقتصر جمع البيانات على ما يلزم لتحقيق الغرض الذي جُمعت من أجله، بحسب طبيعة الخدمة المقدمة.'
          },
          {
            title: '3. كيف نستخدم المعلومات',
            text: 'قد تُستخدم البيانات للأغراض التالية:\n• معالجة طلبات الانضمام إلى النادي ومتابعتها.\n• التواصل مع المتقدمين بشأن طلباتهم والأنشطة ذات الصلة.\n• الرد على الاستفسارات والاقتراحات والرسائل.\n• تنظيم الفعاليات والورشات والأنشطة، عند الحاجة.\n• تحسين خدمات الموقع وتجربة المستخدم.\n• حماية الموقع من الرسائل المزعجة والاستخدام غير المشروع.\n• الوفاء بالالتزامات القانونية والتنظيمية المطبقة.\nولا ينبغي استخدام البيانات لأغراض أخرى غير متوافقة مع أهداف النادي دون إشعار أو موافقة مسبقة عند الاقتضاء.'
          },
          {
            title: '4. مشاركة البيانات',
            text: 'لا يقوم النادي ببيع بيانات المستخدمين أو تأجيرها أو المتاجرة بها. وقد تتم مشاركة بعض المعلومات في حالات محددة فقط، مثل:\n• مقدمي الخدمات التقنية الذين يساعدون في تشغيل الموقع أو استضافته، مع التزامهم بالسرية.\n• الجهات الإدارية أو القضائية المختصة متى كان ذلك مطلوبًا بموجب القانون.\n• المنظمين أو المؤطرين لأنشطة النادي بالقدر الضروري فقط لإدارة الفعالية أو النشاط.'
          },
          {
            title: '5. الصور والتغطيات الإعلامية',
            text: 'قد يشارك الأعضاء والزوار في فعاليات تتضمن تغطية إعلامية أو توثيقًا بالصور والفيديو. ويهدف هذا النشر إلى إبراز أنشطة النادي وتوثيق مشاركاته.\nإذا كان لدى أي مشارك تحفظ على ظهور صورته في التغطيات العامة، يمكنه إبلاغ المنظمين أو التواصل مع إدارة النادي للنظر في طلبه بما يراعي الجوانب التنظيمية الممكنة.'
          },
          {
            title: '6. حماية البيانات وأمنها',
            text: 'يتخذ النادي الإجراءات المعقولة والمناسبة تقنيًا وتنظيميًا للحفاظ على أمان البيانات وحمايتها من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.\nومع ذلك، يُرجى الانتباه إلى أن نقل البيانات عبر الإنترنت لا يمكن ضمان أمانه بنسبة 100%، لذا يُنصح المستخدم باتخاذ الحيطة وعدم إرسال معلومات حساسة لا ضرورة لها.'
          },
          {
            title: '7. الاحتفاظ بالبيانات',
            text: 'يحتفظ النادي بالبيانات للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو وفق ما تتطلبه الإجراءات الإدارية والتنظيمية الخاصة بأنشطة النادي، ثم يتم حذفها أو التعامل معها بطريقة آمنة عند انتهاء الحاجة إليها.'
          },
          {
            title: '8. حقوق المستخدمين',
            text: 'يحق للمستخدم، وفق الضوابط المعمول بها:\n• طلب الاطلاع على بياناته المسجلة لدى النادي.\n• طلب تصحيح أي بيانات غير دقيقة أو تحديثها.\n• طلب حذف بياناته متى لم يعد هناك مبرر نظامي أو تنظيمي للاحتفاظ بها.\n• الاعتراض على معالجة بياناته في بعض الحالات، بحسب طبيعة الطلب والخدمة.\nلتقديم أي طلب، يُرجى التواصل عبر البريد الإلكتروني المخصص للنادي.'
          },
          {
            title: '9. ملفات تعريف الارتباط (Cookies)',
            text: 'قد يستخدم الموقع ملفات تعريف الارتباط الأساسية أو التقنيات المشابهة لضمان عمل الموقع بكفاءة، وتذكر التفضيلات الأساسية، وتحسين الأداء العام. ويمكن للمستخدم ضبط إعدادات متصفحه لرفض هذه الملفات، مع احتمال تأثر بعض وظائف الموقع.'
          },
          {
            title: '10. الروابط الخارجية',
            text: 'قد يحتوي الموقع على روابط تؤدي إلى مواقع أو صفحات تابعة لأطراف ثالثة (مثل شبكات التواصل الاجتماعي أو مواقع الفعاليات). والنادي غير مسؤول عن ممارسات الخصوصية أو محتوى تلك المواقع، ويُنصح بمراجعة سياساتها الخاصة.'
          },
          {
            title: '11. التعديلات على سياسة الخصوصية',
            text: 'يحتفظ النادي بحق مراجعة هذه السياسة وتحديثها كلما دعت الحاجة. وسيتم نشر أي تعديل على هذه الصفحة، ويُعتبر استمرار استخدام الموقع بعد نشر التعديلات قبولًا بالسياسة بصيغتها المحدثة.'
          },
          {
            title: '12. التواصل',
            text: 'لأي استفسارات أو ملاحظات بشأن هذه السياسة، أو لممارسة الحقوق المتعلقة بالبيانات، يمكنكم التواصل عبر:\n• البريد الإلكتروني: club.jeunes41@gmail.com\n• الهاتف: +213697921551\n• المقر: دار الشباب حفصي عبد الرزاق، سوق أهراس، الجزائر'
          }
        ]
      },
    },
  },

  fr: {
    langCode: 'fr',
    langName: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    clubName: 'Club Menbar Jeune Créatif',
    tagline: 'Créativité .. Échange .. Bâtir.',
    city: 'Souk Ahras, Algérie',
    nav: {
      home: 'Accueil',
      about: 'À propos',
      activities: 'Activités',
      news: 'Actualités',
      events: 'Événements',
      membership: 'Adhésion',
      account: 'Mon Compte',
      contact: 'Contact',
      userTooltip: 'Espace Adhérent',
      langTooltip: 'Choisir la langue',
    },
    hero: {
      kicker: 'Club Menbar Jeune Créatif',
      titlePrefix: 'Ensemble..',
      titleMain: 'Créons et laissons une ',
      titleAccent: 'Empreinte',
      description: 'Une communauté de jeunes dynamique libérant les potentiels, créant des opportunités et servant la société.',
      ctaActivities: 'Découvrir nos activités',
      ctaVideo: 'Regarder la vidéo',
      slides: [
        {
          tagline: 'Club Menbar Jeune Créatif',
          titlePrefix: 'Ensemble..',
          titleMain: 'Créons et laissons une ',
          titleAccent: 'Empreinte',
          description: 'Une communauté de jeunes dynamique libérant les potentiels, créant des opportunités et servant la société.',
        },
        {
          tagline: 'Club Menbar Jeune Créatif',
          titlePrefix: 'Ensemble..',
          titleMain: 'Créons et laissons une ',
          titleAccent: 'Empreinte',
          description: 'Une communauté de jeunes dynamique libérant les potentiels, créant des opportunités et servant la société.',
        },
        {
          tagline: 'Club Menbar Jeune Créatif',
          titlePrefix: 'Des Énergies Renouvelées..',
          titleMain: 'Une vision qui façonne le ',
          titleAccent: 'Futur',
          description: 'Un environnement créatif et stimulant réunissant les meilleurs talents pour bâtir des initiatives d\'impact.',
        },
      ],
    },
    activitiesSection: {
      title: 'Activités du Club',
      subtitle: 'De véritables opportunités pour découvrir vos talents et développer vos compétences',
      items: [
        {
          id: 'volunteering',
          name: 'Bénévolat',
          description: 'Initiatives caritatives et humanitaires renforçant la solidarité sociale et l\'esprit de générosité.',
          upcomingEvent: 'Campagne Sourire d\'Espoir - Caravanes de Bienfaisance',
          highlights: ['Caravanes d\'aide et paniers alimentaires', 'Rénovation d\'écoles et bibliothèques', 'Visites aux orphelinats et maisons de retraite'],
        },
        {
          id: 'artistic',
          name: 'Artistique',
          description: 'Ateliers d\'arts plastiques, théâtre, calligraphie arabe et photographie pour stimuler la créativité.',
          upcomingEvent: 'Exposition Annuelle Plume & Créativité',
          highlights: ['Cours de peinture numérique et à l\'huile', 'Ateliers de calligraphie arabe et dorure', 'Théâtre de jeunesse et expression corporelle'],
        },
        {
          id: 'cultural',
          name: 'Culturel',
          description: 'Clubs de lecture, conférences-débats et joutes oratoires stimulant l\'esprit critique et la pensée.',
          upcomingEvent: 'Forum des Débats Intellectuels Jeunesse',
          highlights: ['Club de lecture mensuel et débats littéraires', 'Tournoi de débats des jeunes talents', 'Soirées poétiques et rencontres littéraires'],
        },
        {
          id: 'sports',
          name: 'Sportif',
          description: 'Tournois de football, courses à pied, et randonnées en montagne pour la forme physique et l\'esprit d\'équipe.',
          upcomingEvent: 'Ligue des Champions Menbar de Football',
          highlights: ['Tournois de football et basketball amateur', 'Marathon annuel de la jeunesse 10 km', 'Randonnées pédestres et trekking en montagne'],
        },
        {
          id: 'tech',
          name: 'Technologique',
          description: 'Bootcamps de codage, intelligence artificielle, cybersécurité et développement web & mobile.',
          upcomingEvent: 'Hackathon Solutions du Futur Intelligent',
          highlights: ['Bases de Python et intelligence artificielle', 'Développement web et interfaces modernes', 'Cybersécurité et protection des données personnelles'],
        },
        {
          id: 'environmental',
          name: 'Environnemental',
          description: 'Campagnes de reboisement, protection de la biodiversité et ateliers de recyclage pour l\'écologie.',
          upcomingEvent: 'Initiative Plantation de 5000 Arbres',
          highlights: ['Nettoyage des parcs et forêts', 'Ateliers de jardinage durable et permaculture', 'Recyclage et réduction des déchets plastiques'],
        },
        {
          id: 'media',
          name: 'Médias',
          description: 'Création de contenu vidéo, photographie professionnelle, montage et gestion des réseaux sociaux.',
          upcomingEvent: 'Atelier Réalisation de Courts Métrages Mobiles',
          highlights: ['Techniques de cadrage et éclairage studio', 'Montage vidéo et effets visuels', 'Podcasts et création de contenu audio'],
        },
        {
          id: 'social',
          name: 'Social',
          description: 'Rencontres conviviales, activités familiales et coaching d\'orientation personnelle et professionnelle.',
          upcomingEvent: 'Rencontre Intergénérationnelle d\'Échange',
          highlights: ['Ateliers de communication et intelligence émotionnelle', 'Orientation de carrière et rédaction de CV', 'Sessions de cohésion d\'équipe'],
        },
        {
          id: 'scouting',
          name: 'Scoutisme',
          description: 'Camps en plein air, techniques de survie, premiers secours et orientation cartographique.',
          upcomingEvent: 'Grand Camp Scout Printanier du Flambeau',
          highlights: ['Montage de tentes et feux de camp sécurisés', 'Premiers secours en milieu naturel', 'Orientation avec boussole et repères célestes'],
        },
      ],
    },
    joinCard: {
      prefix: 'Ensemble..',
      headline: 'Bâtissons une génération créative et influente',
      description: 'Rejoignez le Club Menbar Jeune Créatif et faites partie d\'une communauté inspirante qui participe activement au changement.',
      button: 'Rejoindre maintenant',
    },
    newsCard: {
      title: 'Dernières Actualités',
      viewAll: 'Voir tout',
      items: [
        {
          id: 'club-inauguration',
          title: 'Installation Officielle du Club Menbar Jeune Créatif à Souk Ahras',
          date: '27 Octobre 2026',
          category: 'Actualités du Club',
          readTime: '3 min de lecture',
          summary: 'Installation officielle du Club Menbar Jeune Créatif au siège de la Maison de Jeunes Hafsi Abdelrazak à Souk Ahras sous l\'égide de la Ligue de Plein Air.',
          content: [
            'Ce mardi s\'est déroulée l\'installation officielle du Club « Menbar Jeune Créatif » dans les locaux de la Maison de Jeunes Hafsi Abdelrazak à Souk Ahras, sous la tutelle de la Ligue de Plein Air et sous la présidence de Mme Saidi Imane.',
            'Cette initiative s\'inscrit dans le cadre du projet des nouveaux clubs de jeunesse financés par le Ministère de la Jeunesse et des Sports pour stimuler les talents, encourager l\'esprit d\'entreprise et l\'audace citoyenne chez les jeunes.',
            'L\'équipe fondatrice et les cadres associatifs ont réaffirmé leur volonté d\'offrir un carrefour d\'apprentissage et d\'épanouissement pour toute la jeunesse locale.'
          ],
        },
      ],
    },
    eventsCard: {
      title: 'Événements à Venir',
      viewAll: 'Voir tout',
      featured: {
        id: 'creative-youth-camp',
        title: 'Camp des Jeunes Créatifs',
        day: '22',
        month: 'Avril',
        year: '2026',
        location: 'Camp Tiziraw - Région des Chettahat',
        description: 'Une expérience jeunesse unique alliant apprentissage, aventure et travail d\'équipe.',
        price: 'Gratuit pour les membres adhérents',
        duration: '3 jours et 2 nuits',
        button: 'S\'inscrire maintenant',
        schedule: [
          { time: 'Jour 1 - 09:00', activity: 'Rassemblement, départ, installation des tentes et cérémonie d\'ouverture' },
          { time: 'Jour 1 - 16:00', activity: 'Atelier de leadership et travail d\'équipe en plein air' },
          { time: 'Jour 1 - 20:30', activity: 'Soirée veillée scoute autour du feu de camp et partage d\'expériences' },
          { time: 'Jour 2 - 07:00', activity: 'Trekking d\'exploration et défi d\'orientation à la boussole' },
          { time: 'Jour 2 - 14:00', activity: 'Challenge de résolution de problèmes communautaires et prototypage' },
          { time: 'Jour 3 - 10:00', activity: 'Exposition des réalisations, remise des prix et certificats' },
        ],
      },
    },
    footer: {
      copyright: 'Tous droits réservés au Club Menbar Jeune Créatif – Souk Ahras © 2026',
      note: 'Plateforme numérique jeunesse intégrée dédiée au service citoyen, aux compétences et à l\'innovation',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
    modals: {
      close: 'Fermer',
      join: {
        title: 'Formulaire d\'Adhésion & Inscription',
        subtitle: 'Rejoignez la grande famille du Club Menbar Jeune Créatif à Souk Ahras et commencez votre parcours créatif',
        fullNameLabel: 'Nom et Prénom complets *',
        fullNamePlaceholder: 'Ex: Amine Benali',
        emailLabel: 'Adresse email *',
        emailPlaceholder: 'nom@example.com',
        phoneLabel: 'Numéro de téléphone *',
        phonePlaceholder: '06 XX XX XX XX',
        ageLabel: 'Âge *',
        cityLabel: 'Lieu de résidence *',
        idProofLabel: 'Justificatif d\'identité (Pièce d\'identité pour adultes / Autorisation parentale pour mineurs) *',
        idProofHelp: 'Carte d\'identité nationale pour adultes, ou autorisation parentale/sur l\'honneur pour mineurs.',
        interestsLabel: 'Domaines d\'intérêt préférés *',
        motivationLabel: 'Vos motivations et talents *',
        motivationPlaceholder: 'Parlez-nous de vos compétences et de vos aspirations au sein du club...',
        submitBtn: 'Confirmer l\'adhésion et générer la carte',
        successTitle: 'Félicitations ! Adhésion confirmée 🎉',
        successDesc: 'Bienvenue au Club Menbar Jeune Créatif. Votre carte officielle d\'adhérent numérique a été émise.',
        cardTitle: 'Carte Officielle d\'Adhérent',
        cardMembershipNumber: 'Numéro d\'adhérent',
        cardStatus: 'Statut',
        cardStatusActive: 'Membre actif certifié',
        downloadCard: 'Télécharger la carte numérique (PDF/PNG)',
        doneBtn: 'Terminer',
      },
      contact: {
        title: 'Contacter l\'Administration du Club',
        subtitle: 'Nous sommes ravis de recevoir vos questions, suggestions et propositions de partenariat',
        fullName: 'Nom complet *',
        email: 'Adresse email *',
        subject: 'Objet du message *',
        subjectPlaceholder: 'Demande d\'information / Proposition d\'activité / Partenariat',
        message: 'Message *',
        messagePlaceholder: 'Rédigez votre message ici en détail...',
        sendBtn: 'Envoyer le message',
        successMsg: 'Votre message a été transmis avec succès ! Notre équipe vous répondra dans les plus brefs délais.',
        addressTitle: 'Siège officiel',
        addressValue: 'Maison de Jeunes Hafsi Abdelrazak, Souk Ahras, Algérie',
        phoneValue: '+213697921551',
        emailValue: 'club.jeunes41@gmail.com',
        workHoursTitle: 'Horaires d\'ouverture',
        workHoursValue: 'Du Samedi au Jeudi : 09:00 – 18:00',
      },
      about: {
        title: 'À Propos du Club',
        subtitle: 'Club Menbar Jeune Créatif .. un espace qui fait la différence',
        breadcrumbHome: 'Accueil',
        breadcrumbAbout: 'À Propos',
        historyTitle: 'Aperçu Historique du Club',
        historyParagraphs: [
          'Le Club Menbar Jeune Créatif est un espace jeunesse et culturel dédié à l\'émergence des talents et au renforcement des compétences, encourageant l\'innovation et la participation active à la vie citoyenne.',
          'L\'idée du club est née de la conviction profonde que la jeunesse constitue le véritable moteur d\'évolution de la société, nécessitant un cadre bienveillant pour s\'exprimer et développer des aptitudes en culture, littérature, prise de parole, médias et volontariat.',
          'Le club s\'attache à consolider l\'esprit d\'initiative et le travail d\'équipe, tout en organisant des ateliers et des rencontres formatrices qui forgent la personnalité du jeune et élargissent ses horizons créatifs.',
          'Il ambitionne d\'être un carrefour ouvert aux idées constructives, reliant les jeunes pour échanger savoirs et expériences au bénéfice de la collectivité.',
          'À travers sa noble vocation, le club aspire à édifier une jeunesse consciente, instruite et proactive, transformant ses ambitions en réalisations concrètes au service de la nation.',
        ],
        historyQuote: 'D\'une modeste idée .. est né le rêve, devenu une réalité qui fait la différence',
        visionTitle: 'Vision',
        visionText: 'Être un espace jeunesse pionnier dans la découverte des talents et le développement des capacités créatives, intellectuelles et culturelles, et une tribune ouverte pour permettre aux jeunes d\'exprimer leurs idées et de concrétiser leurs initiatives, contribuant ainsi à bâtir une génération consciente, cultivée et innovante, capable de participer activement au développement communautaire et à la promotion de la vie culturelle et associative à Souk Ahras.',
        missionTitle: 'Mission',
        missionText: 'Le Club Menbar Jeune Créatif œuvre à autonomiser les jeunes pour révéler leurs talents et perfectionner leurs compétences, en offrant un environnement stimulant pour la créativité, l\'apprentissage et l\'échange, en organisant des activités culturelles et formatives diversifiées, en encourageant l\'action bénévole et en enracinant les valeurs de citoyenneté et de solidarité, en cohérence avec les objectifs du secteur de la jeunesse et des sports.',
        goalsTitle: 'Objectifs',
        goalsIntro: 'Le Club Menbar Jeune Créatif, affilié à la Direction de la Jeunesse et des Sports, vise à développer le potentiel des jeunes et affiner leurs compétences dans divers domaines scientifiques, culturels, artistiques, sportifs et sociaux, à travers un espace jeunesse stimulant fondé sur la créativité, l\'initiative, l\'apprentissage continu et l\'engagement communautaire.',
        goalsBullets: [
          'Développer les talents des jeunes et élever leurs compétences créatives.',
          'Ouvrir les perspectives d\'innovation, d\'excellence et d\'initiative.',
          'Tisser un réseau de partenariats et d\'actions sociétales constructives.',
          'Participer activement au service et au développement de la communauté.',
        ],
        galleryBadge: 'Galerie Photos',
        exploreMoreBtn: 'Découvrir Plus',
        statsYears: 'Années d\'Engagement',
        statsActivities: 'Activités Annuelles',
        statsMembers: 'Membres Actifs',
        leadershipTitle: 'Équipe Dirigeante & Superviseurs',
        viewAllMembers: 'Voir Tous les Membres',
        mediaInfoTitle: 'Médias & Informations du Club',
        allPhotosBtn: 'Toutes les Photos',
        infoLocationLabel: 'Lieu',
        infoLocationValue: 'Maison de Jeunes Hafsi Abdelrazak - Souk Ahras, Algérie',
        infoHoursLabel: 'Horaires',
        infoHoursValue: 'De 08h00 à 18h00',
        infoContactLabel: 'Contact',
        infoContactValue: '+213 697 92 15 51',
        infoEmailLabel: 'Email',
        infoEmailValue: 'club.jeunes41@gmail.com',
      },
      video: {
        title: 'Documentaire du Club Menbar Jeune Créatif',
        desc: 'Un aperçu immersif retraçant les moments forts, les réalisations et les actions sur le terrain à Souk Ahras.',
        closeBtn: 'Fermer la vidéo',
      },
      activityDetail: {
        workshopsLabel: 'Ateliers organisés par an',
        upcomingEventLabel: 'Prochain rendez-vous majeur',
        highlightsLabel: 'Axes principaux du programme',
        registerBtn: 'Participer à ce pôle d\'activités',
      },
      eventDetail: {
        spotsLeftLabel: 'Places disponibles',
        priceLabel: 'Frais de participation',
        durationLabel: 'Durée',
        locationLabel: 'Lieu de l\'événement',
        scheduleTitle: 'Programme prévisionnel',
        registerBtn: 'Confirmer mon inscription',
        successMsg: 'Votre place est réservée avec succès ! Un récapitulatif vous a été envoyé par email et SMS.',
      },
      terms: {
        title: 'Conditions d\'Utilisation – Club Menbar Jeune Créatif',
        sections: [
          {
            title: '1. Introduction',
            text: 'Bienvenue sur le site du Club Menbar Jeune Créatif – Souk Ahras, Algérie. Ce site vise à présenter le club, ses activités et initiatives, publier des annonces et faciliter les adhésions et contacts avec l\'administration.\nVeuillez lire attentivement ces conditions avant d\'utiliser nos formulaires ou d\'interagir avec nos services.'
          },
          {
            title: '2. Utilisation du Site',
            text: 'L\'utilisateur s\'engage à utiliser le site à des fins légitimes dans le respect des lois en vigueur :\n• Fournir des données exactes lors de l\'inscription.\n• Ne pas porter atteinte aux droits d\'autrui ou menacer quiconque.\n• S\'abstenir de diffuser du contenu trompeur ou portant atteinte aux droits de propriété intellectuelle.\n• Ne tenter aucune intrusion ou perturbation des systèmes informatiques.\n• Respecter les règles des activités auxquelles vous participez.'
          },
          {
            title: '3. Informations Publiées',
            text: 'Le club veille à diffuser des données actualisées. Toutefois, les calendriers et lieux d\'événements peuvent être ajustés pour des raisons organisationnelles. Il convient de se référer aux annonces officielles.'
          },
          {
            title: '4. Adhésion & Demandes d\'Inscription',
            text: 'Le formulaire permet aux candidats de soumettre leurs données. Conditions :\n• Informations conformes (carte d\'identité pour majeurs, autorisation parentale/sur l\'honneur pour mineurs).\n• Respect des statuts du club en cas de validation.'
          },
          {
            title: '5. Inscription aux Activités',
            text: 'L\'accès aux ateliers et sorties dépend des places disponibles et des modalités propres à chaque événement.'
          },
          {
            title: '6. Propriété Intellectuelle',
            text: 'Tous les textes, graphismes, logos et contenus multimédias sont la propriété exclusive du Club Menbar Jeune Créatif. Toute réutilisation commerciale sans accord écrit préalable est strictement interdite.'
          },
          {
            title: '7. Contenu Soumis par l\'Utilisateur',
            text: 'En transmettant une contribution ou suggestion, vous garantissez disposer des droits nécessaires sans violer les droits de tiers.'
          },
          {
            title: '8. Photographies et Médias',
            text: 'Des prises de vue peuvent être réalisées durant les événements à des fins de documentation associative. Toute personne souhaitant le retrait d\'une photo peut en faire la demande motivée auprès de l\'administration.'
          },
          {
            title: '9. Liens Externes',
            text: 'Le site peut proposer des liens vers des plateformes tierces. Le club décline toute responsabilité quant à leurs politiques de traitement.'
          },
          {
            title: '10. Disponibilité et Modifications',
            text: 'Le club s\'efforce d\'assurer la disponibilité continue du service, sous réserve d\'opérations de maintenance nécessaires.'
          },
          {
            title: '11. Limite de Responsabilité',
            text: 'Le site est mis à disposition "en l\'état". Le club ne saurait être tenu responsable d\'éventuels désagréments indirects liés à des retards ou pannes techniques.'
          },
          {
            title: '12. Confidentialité des Données',
            text: 'Le traitement des données personnelles est régi par la Politique de Confidentialité adoptée par le club.'
          },
          {
            title: '13. Révision des Conditions',
            text: 'Le club se réserve le droit d\'adapter ces conditions. Les versions révisées entrent en vigueur dès leur mise en ligne.'
          },
          {
            title: '14. Droit Applicable',
            text: 'Ces conditions sont régies par la législation en vigueur en République Algérienne Démocratique et Populaire.'
          },
          {
            title: '15. Contact',
            text: 'Pour toute demande, veuillez nous joindre par email à club.jeunes41@gmail.com ou par téléphone au +213697921551, ou à la Maison de Jeunes Hafsi Abdelrazak, Souk Ahras, Algérie.'
          }
        ]
      },
      privacy: {
        title: 'Politique de Confidentialité – Club Menbar Jeune Créatif',
        sections: [
          {
            title: '1. Introduction',
            text: 'Le Club Menbar Jeune Créatif – Souk Ahras, Algérie, accorde une priorité absolue à la protection de la vie privée des visiteurs et adhérents. Cette charte détaille la collecte, l\'usage et la préservation de vos renseignements.'
          },
          {
            title: '2. Données Collectées',
            text: 'Le site peut recueillir les éléments communiqués volontairement :\n• Nom et prénom.\n• Date de naissance ou âge.\n• Téléphone et email.\n• Ville de résidence.\n• Carte d\'identité nationale pour adultes, ou autorisation parentale/sur l\'honneur pour mineurs.\n• Centres d\'intérêt et talents artistiques/techniques.\n• Données nécessaires au fonctionnement technique du site.'
          },
          {
            title: '3. Utilisation des Informations',
            text: 'Vos données sont employées afin de :\n• Traiter les candidatures d\'adhésion et émettre les cartes d\'adhérent.\n• Communiquer au sujet des ateliers et programmes.\n• Répondre aux messages et suggestions.\n• Organiser les rassemblements et camps de jeunesse.'
          },
          {
            title: '4. Partage des Données',
            text: 'Le club ne vend, ne loue, ni ne cède aucune donnée à des tiers commerciaux. Des partages restreints n\'interviennent qu\'auprès des prestataires techniques sous clause de confidentialité ou si la loi l\'exige.'
          },
          {
            title: '5. Photos et Couvertures Audiovisuelles',
            text: 'Des reportages photos/vidéos sont menés pour valoriser les initiatives des jeunes. Tout participant peut notifier ses réserves quant à la publication de son image.'
          },
          {
            title: '6. Sécurité des Données',
            text: 'Des dispositifs techniques et procéduraux adaptés protègent vos données contre toute altération ou accès non autorisé.'
          },
          {
            title: '7. Conservation des Données',
            text: 'Les dossiers sont conservés le temps requis par la gestion associative, puis archivés ou purgés en toute sécurité.'
          },
          {
            title: '8. Droits des Utilisateurs',
            text: 'Vous pouvez solliciter l\'accès, la rectification ou l\'effacement de vos coordonnées via contact par email.'
          },
          {
            title: '9. Témoins de Connexion (Cookies)',
            text: 'Des cookies strictement fonctionnels peuvent mémoriser la langue ou les préférences de confort.'
          },
          {
            title: '10. Liens Tiers',
            text: 'Le site comporte des liens externes dont les politiques de confidentialité sont indépendantes du club.'
          },
          {
            title: '11. Mises à Jour de la Politique',
            text: 'Toute modification sera consultable directement sur cette page.'
          },
          {
            title: '12. Contact Délégué',
            text: 'Pour toute interrogation relative à vos données :\n• Email : club.jeunes41@gmail.com\n• Téléphone : +213697921551\n• Adresse : Maison de Jeunes Hafsi Abdelrazak, Souk Ahras, Algérie'
          }
        ]
      },
    },
  },

  en: {
    langCode: 'en',
    langName: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    clubName: 'Menbar Creative Youth Club',
    tagline: 'Creativity .. Connection .. Building.',
    city: 'Souk Ahras, Algeria',
    nav: {
      home: 'Home',
      about: 'About Us',
      activities: 'Activities',
      news: 'News',
      events: 'Events',
      membership: 'Membership',
      account: 'My Account',
      contact: 'Contact Us',
      userTooltip: 'Membership Portal / My Account',
      langTooltip: 'Select Language',
    },
    hero: {
      kicker: 'Menbar Creative Youth Club',
      titlePrefix: 'Together..',
      titleMain: 'We Create & Leave an ',
      titleAccent: 'Impact',
      description: 'A vibrant youth community unlocking potential, creating opportunities, and serving society.',
      ctaActivities: 'Discover Activities',
      ctaVideo: 'Watch Video',
      slides: [
        {
          tagline: 'Menbar Creative Youth Club',
          titlePrefix: 'Together..',
          titleMain: 'We Create & Leave an ',
          titleAccent: 'Impact',
          description: 'A vibrant youth community unlocking potential, creating opportunities, and serving society.',
        },
        {
          tagline: 'Menbar Creative Youth Club',
          titlePrefix: 'Together..',
          titleMain: 'We Create & Leave an ',
          titleAccent: 'Impact',
          description: 'A vibrant youth community unlocking potential, creating opportunities, and serving society.',
        },
        {
          tagline: 'Menbar Creative Youth Club',
          titlePrefix: 'Renewed Energy..',
          titleMain: 'A Vision Shaping the ',
          titleAccent: 'Future',
          description: 'A stimulating creative environment bringing together top youth minds to build impactful initiatives.',
        },
      ],
    },
    activitiesSection: {
      title: 'Club Activities',
      subtitle: 'Real opportunities to unlock your potential and build future skills',
      items: [
        {
          id: 'volunteering',
          name: 'Volunteering',
          description: 'Humanitarian and community outreach initiatives fostering solidarity, empathy, and social responsibility.',
          upcomingEvent: 'Smile of Hope - Benevolence Convoy',
          highlights: ['Relief convoys and food parcel distribution', 'School and library renovation drives', 'Visits to orphanages and nursing homes'],
        },
        {
          id: 'artistic',
          name: 'Artistic',
          description: 'Fine arts, theater, Arabic calligraphy, and photography workshops to cultivate creative expression.',
          upcomingEvent: 'Annual Quill & Creativity Exhibition',
          highlights: ['Digital and oil painting masterclasses', 'Arabic calligraphy and gilding workshops', 'Youth theater and expressive speaking'],
        },
        {
          id: 'cultural',
          name: 'Cultural',
          description: 'Book discussion clubs, interactive seminars, and debate tournaments stimulating critical thought.',
          upcomingEvent: 'Youth Intellectual Dialogue Forum',
          highlights: ['Monthly reading club and book discussions', 'Youth debate championship', 'Poetry recitals and literary gatherings'],
        },
        {
          id: 'sports',
          name: 'Sports',
          description: 'Soccer leagues, running races, and mountain hiking trails promoting fitness, health, and team spirit.',
          upcomingEvent: 'Menbar Champions Soccer League',
          highlights: ['Amateur and competitive soccer and basketball tournaments', 'Annual 10K Youth Marathon', 'Mountain hiking and outdoor exploration'],
        },
        {
          id: 'tech',
          name: 'Technology',
          description: 'Coding bootcamps, AI workshops, cybersecurity fundamentals, and web & mobile app development.',
          upcomingEvent: 'Smart Future Solutions Hackathon',
          highlights: ['Python programming and AI essentials', 'Modern web and UI development', 'Information security and personal data protection'],
        },
        {
          id: 'environmental',
          name: 'Environmental',
          description: 'Reforestation campaigns, biodiversity preservation, and recycling workshops for sustainable ecology.',
          upcomingEvent: '5000 Trees Reforestation Initiative',
          highlights: ['Park and woodland cleanup drives', 'Sustainable home gardening and permaculture', 'Plastic waste reduction and upcycling'],
        },
        {
          id: 'media',
          name: 'Media',
          description: 'Visual storytelling, professional photography, video editing, scriptwriting, and social media management.',
          upcomingEvent: 'Mobile Short Film Making Workshop',
          highlights: ['Pro camera techniques and lighting setups', 'Video post-production and visual effects', 'Podcasting and audio storytelling'],
        },
        {
          id: 'social',
          name: 'Social',
          description: 'Networking meetups, family events, and personal and career development coaching sessions.',
          upcomingEvent: 'Intergenerational Experience Exchange',
          highlights: ['Effective communication and emotional intelligence', 'Career guidance and resume building', 'Team cohesion and interactive retreats'],
        },
        {
          id: 'scouting',
          name: 'Scouting',
          description: 'Outdoor wilderness camps, survival skills, emergency first aid, and map and compass navigation.',
          upcomingEvent: 'Spring Flame Scout Wilderness Camp',
          highlights: ['Safe tent assembly and campfires', 'First aid in harsh environments', 'Land navigation using compass and stars'],
        },
      ],
    },
    joinCard: {
      prefix: 'Together..',
      headline: 'Building a Creative & Influential Generation',
      description: 'Join Menbar Creative Youth Club and become part of an inspiring community shaping real social change.',
      button: 'Join Now',
    },
    newsCard: {
      title: 'Latest News',
      viewAll: 'View All',
      items: [
        {
          id: 'club-inauguration',
          title: 'Official Inauguration of Menbar Creative Youth Club in Souk Ahras',
          date: 'October 27, 2026',
          category: 'Club News',
          readTime: '3 min read',
          summary: 'Official installation of Menbar Creative Youth Club at Hafsi Abdelrazak Youth Center under the Outdoor Activities League and chairmanship of Mrs. Saidi Imane.',
          content: [
            'Today, Tuesday, witnessed the official installation of #Menbar_Creative_Youth_Club as part of the newly launched youth clubs program funded by the Ministry of Youth, held at the Outdoor Activities League headquarters inside Hafsi Abdelrazak Youth Center in Souk Ahras.',
            'The ceremonial installation was held under the supervision of the Outdoor Activities League and led by Mrs. Saidi Imane, with prominent youth leaders, civic representatives, and founding members in attendance.',
            'The club aims to nurture emerging young talents, instill a spirit of creativity and proactive initiative, and provide an open and supportive environment for impactful community projects.'
          ],
        },
      ],
    },
    eventsCard: {
      title: 'Upcoming Events',
      viewAll: 'View All',
      featured: {
        id: 'creative-youth-camp',
        title: 'Creative Youth Wilderness Camp',
        day: '22',
        month: 'April',
        year: '2026',
        location: 'Tiziraw Camp - Chettahat Mountain Zone',
        description: 'An exceptional youth experience combining experiential learning, adventure, and camaraderie.',
        price: 'Free for registered club members',
        duration: '3 Days & 2 Nights',
        button: 'Register Now',
        schedule: [
          { time: 'Day 1 - 09:00 AM', activity: 'Assembly, departure, tent setup, and opening ceremony' },
          { time: 'Day 1 - 04:00 PM', activity: 'Outdoor leadership and team problem-solving workshop' },
          { time: 'Day 1 - 08:30 PM', activity: 'Campfire fellowship evening and experience exchange' },
          { time: 'Day 2 - 07:00 AM', activity: 'Exploratory hiking expedition and orienteering challenge' },
          { time: 'Day 2 - 02:00 PM', activity: 'Community innovation challenge and prototype design' },
          { time: 'Day 3 - 10:00 AM', activity: 'Showcase exhibition, awards ceremony, and certificate presentation' },
        ],
      },
    },
    footer: {
      copyright: 'All Rights Reserved to Menbar Creative Youth Club – Souk Ahras © 2026',
      note: 'Integrated digital youth platform dedicated to civic service, capability building, and innovation',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },
    modals: {
      close: 'Close',
      join: {
        title: 'Membership & Registration Form',
        subtitle: 'Join the Menbar Creative Youth Club family in Souk Ahras and start your creative journey',
        fullNameLabel: 'Full Name *',
        fullNamePlaceholder: 'E.g., John Doe',
        emailLabel: 'Email Address *',
        emailPlaceholder: 'name@example.com',
        phoneLabel: 'Phone Number *',
        phonePlaceholder: '06 XX XX XX XX',
        ageLabel: 'Age *',
        cityLabel: 'City of Residence *',
        idProofLabel: 'Identity Verification (National ID for adults / Parental consent for minors) *',
        idProofHelp: 'National Identity Card for adults, or parental/honorary consent for minors.',
        interestsLabel: 'Areas of Interest *',
        motivationLabel: 'Statement of Motivation & Talents *',
        motivationPlaceholder: 'Tell us about your skills and what you wish to contribute and accomplish...',
        submitBtn: 'Confirm Membership & Issue Digital ID Card',
        successTitle: 'Congratulations! Membership Approved 🎉',
        successDesc: 'Welcome to Menbar Creative Youth Club. Your official digital membership card has been issued.',
        cardTitle: 'Official Membership Card',
        cardMembershipNumber: 'Member ID',
        cardStatus: 'Status',
        cardStatusActive: 'Certified Active Member',
        downloadCard: 'Download Digital Card (PDF/PNG)',
        doneBtn: 'Done',
      },
      contact: {
        title: 'Contact Club Administration',
        subtitle: 'We are delighted to receive your inquiries, suggestions, and community partnerships',
        fullName: 'Full Name *',
        email: 'Email Address *',
        subject: 'Message Subject *',
        subjectPlaceholder: 'Event inquiry / Activity proposal / Partnership request',
        message: 'Message *',
        messagePlaceholder: 'Write your message in detail here...',
        sendBtn: 'Send Message Now',
        successMsg: 'Your message has been delivered successfully! Our team will reach out to you shortly.',
        addressTitle: 'Official Headquarters',
        addressValue: 'Hafsi Abdelrazak Youth Center, Souk Ahras, Algeria',
        phoneValue: '+213697921551',
        emailValue: 'club.jeunes41@gmail.com',
        workHoursTitle: 'Working Hours',
        workHoursValue: 'Saturday to Thursday: 09:00 AM – 06:00 PM',
      },
      about: {
        title: 'About the Club',
        subtitle: 'Menbar Creative Youth Club .. a space that makes a difference',
        breadcrumbHome: 'Home',
        breadcrumbAbout: 'About Club',
        historyTitle: 'Historical Overview of the Club',
        historyParagraphs: [
          'Menbar Creative Youth Club is a vibrant cultural and youth center dedicated to discovering potential and encouraging innovation and active civic life.',
          'The club originated from the conviction that youth are the driving engine of community progress, requiring an empowering environment to express their thoughts and develop skills in culture, literature, public speaking, media, and volunteerism.',
          'The club fosters proactive collaboration, hosting workshops and gatherings that build character, self-confidence, and creative depth.',
          'It aspires to be an open forum for purposeful ideas and rising talent, creating bridges of knowledge exchange to serve society with excellence.',
          'Through its cultural and youth mission, the club looks forward to raising a conscious, educated, and enterprising generation ready to transform aspirations into tangible achievements for society and country.',
        ],
        historyQuote: 'From a humble idea .. the dream began, becoming a reality that makes a difference',
        visionTitle: 'Vision',
        visionText: 'To be a premier youth sanctuary leading the discovery of talent and the development of creative, intellectual, and cultural capacities—an open platform for youth to voice their ideas and turn their initiatives into reality, fostering a conscious, enlightened, and innovative generation actively enriching community and cultural life in Souk Ahras.',
        missionTitle: 'Mission',
        missionText: 'Menbar Creative Youth Club strives to empower youth to showcase their talents and hone their capabilities by providing an inspiring environment for creativity, learning, and connection. Through diverse cultural, intellectual, and training activities, fostering volunteerism, and instilling citizenship and solidarity, we amplify the role of youth in society in harmony with the youth and sports sector.',
        goalsTitle: 'Objectives',
        goalsIntro: 'Affiliated with the Directorate of Youth and Sports, the club aims to nurture youth capacities and polish talents across scientific, cultural, artistic, athletic, and social domains by offering a dynamic hub for creativity, proactive initiative, learning, and civic participation.',
        goalsBullets: [
          'Developing youth talents and expanding creative potential.',
          'Unlocking opportunities for innovation, excellence, and proactive leadership.',
          'Building strong networks of impactful community partnerships.',
          'Actively contributing to civic development and social welfare.',
        ],
        galleryBadge: 'Photo Gallery',
        exploreMoreBtn: 'Explore More',
        statsYears: 'Years of Giving',
        statsActivities: 'Annual Activities',
        statsMembers: 'Active Members',
        leadershipTitle: 'Leadership Team & Supervisors',
        viewAllMembers: 'View All Members',
        mediaInfoTitle: 'Club Media & Information',
        allPhotosBtn: 'All Photos',
        infoLocationLabel: 'Location',
        infoLocationValue: 'Hafsi Abdelrazak Youth Center - Souk Ahras, Algeria',
        infoHoursLabel: 'Working Hours',
        infoHoursValue: 'From 8:00 AM to 6:00 PM',
        infoContactLabel: 'Contact',
        infoContactValue: '+213 697 92 15 51',
        infoEmailLabel: 'Email',
        infoEmailValue: 'club.jeunes41@gmail.com',
      },
      video: {
        title: 'Menbar Creative Youth Club Documentary',
        desc: 'An inspiring cinematic overview highlighting the club\'s major milestones and field initiatives in Souk Ahras.',
        closeBtn: 'Close Video',
      },
      activityDetail: {
        workshopsLabel: 'Workshops organized per year',
        upcomingEventLabel: 'Next Major Event',
        highlightsLabel: 'Key Program Highlights',
        registerBtn: 'Register for this activity track',
      },
      eventDetail: {
        spotsLeftLabel: 'Spots Remaining',
        priceLabel: 'Participation Fee',
        durationLabel: 'Duration',
        locationLabel: 'Venue',
        scheduleTitle: 'Detailed Event Schedule',
        registerBtn: 'Confirm My Registration',
        successMsg: 'Your spot is successfully reserved! A confirmation email and SMS have been sent to you.',
      },
      terms: {
        title: 'Terms of Use – Menbar Creative Youth Club',
        sections: [
          {
            title: '1. Introduction',
            text: 'Welcome to the official website of Menbar Creative Youth Club – Souk Ahras, Algeria. This portal serves to showcase the club, its activities, initiatives, news, events, and membership avenues.\nPlease review these terms carefully before utilizing our forms or interacting with our services.'
          },
          {
            title: '2. Acceptable Use',
            text: 'Users agree to utilize this site for lawful and constructive purposes in compliance with applicable laws:\n• Providing authentic and correct data in forms.\n• Respecting others and refraining from harassment, defamation, or privacy violations.\n• Abstaining from uploading unlawful, infringing, or misleading material.\n• Not attempting unauthorized system penetration or disruption of services.\n• Respecting organizational rules during club events and gatherings.'
          },
          {
            title: '3. Published Information',
            text: 'The club seeks to provide clear, timely event and program information. Dates and venues may adapt due to unforeseen circumstances; please verify through official channels.'
          },
          {
            title: '4. Membership & Applications',
            text: 'The membership form allows applicants to submit their credentials. Requirements:\n• Submitting genuine details (National ID card for adults, parental/honorary consent for minors).\n• Upholding club principles upon admission.'
          },
          {
            title: '5. Event Registrations',
            text: 'Registration for certain workshops and events is subject to capacity and specific event terms. The club reserves the right to modify schedules as necessary.'
          },
          {
            title: '6. Intellectual Property',
            text: 'All texts, brand marks, logos, graphics, and multimedia assets are the intellectual property of Menbar Creative Youth Club or licensed to it. Commercial re-use without prior written consent is strictly prohibited.'
          },
          {
            title: '7. User Contributions',
            text: 'By submitting suggestions or materials, you represent that you hold necessary rights without infringing upon third parties.'
          },
          {
            title: '8. Media & Event Photography',
            text: 'The club documents events through photographs and videos to highlight youth achievements. Any participant wishing to request removal of their photograph may contact club administration.'
          },
          {
            title: '9. External Links',
            text: 'The site may feature links to external third-party platforms. The club assumes no liability for their independent practices.'
          },
          {
            title: '10. Site Availability',
            text: 'We strive for seamless operation, though temporary maintenance downtime may occasionally occur.'
          },
          {
            title: '11. Limitation of Liability',
            text: 'This website is offered "as is" for informational and community engagement purposes without warranties of continuous availability.'
          },
          {
            title: '12. Privacy & Data Protection',
            text: 'Personal data is handled in strict compliance with the club\'s Privacy Policy.'
          },
          {
            title: '13. Amendments to Terms',
            text: 'The club reserves the right to update these terms to reflect organizational growth. Continued site usage implies acceptance of revised terms.'
          },
          {
            title: '14. Governing Law',
            text: 'These terms are governed by and construed in accordance with the laws of the People\'s Democratic Republic of Algeria.'
          },
          {
            title: '15. Contact',
            text: 'For inquiries regarding these terms, please contact club administration via email: club.jeunes41@gmail.com or telephone: +213697921551, or visit our headquarters at Hafsi Abdelrazak Youth Center, Souk Ahras, Algeria.'
          }
        ]
      },
      privacy: {
        title: 'Privacy Policy – Menbar Creative Youth Club',
        sections: [
          {
            title: '1. Introduction',
            text: 'Menbar Creative Youth Club – Souk Ahras, Algeria, places paramount priority on user privacy. This policy explains what information we collect, why we collect it, and how we safeguard it.'
          },
          {
            title: '2. Information We Collect',
            text: 'The site collects data submitted voluntarily through registration and contact forms:\n• Full name.\n• Date of birth or age.\n• Phone number and email address.\n• City of residence.\n• National ID card for adults, or parental/honorary consent for minors.\n• Talents, interests, and preferred activities.\n• Essential technical logs necessary for website security.'
          },
          {
            title: '3. How We Use Information',
            text: 'Data is used strictly to:\n• Process membership applications and issue digital membership cards.\n• Coordinate activity tracks and youth workshops.\n• Respond to questions, proposals, and community partnerships.\n• Protect website operations against spam and misuse.'
          },
          {
            title: '4. Data Sharing',
            text: 'The club never sells, rents, or commercializes personal data. Limited sharing only occurs with technical providers bound by confidentiality or when legally mandated.'
          },
          {
            title: '5. Media and Public Photography',
            text: 'Photography and videography at club events serve to chronicle and celebrate youth empowerment. Participants may notify organizers if they prefer not to appear in public media.'
          },
          {
            title: '6. Data Security',
            text: 'Appropriate organizational and technical precautions are maintained to protect data from unauthorized access or destruction.'
          },
          {
            title: '7. Retention',
            text: 'Records are retained only as long as necessary for administrative and club activity purposes.'
          },
          {
            title: '8. User Rights',
            text: 'Users may request access, updates, or deletion of their stored details by contacting club administration.'
          },
          {
            title: '9. Cookies',
            text: 'Essential cookies may be used to store language choices and ensure smooth website navigation.'
          },
          {
            title: '10. External Links',
            text: 'Third-party links have independent privacy practices not governed by this policy.'
          },
          {
            title: '11. Policy Changes',
            text: 'Updates to this policy will be posted on this page.'
          },
          {
            title: '12. Contact Information',
            text: 'For any privacy-related questions:\n• Email: club.jeunes41@gmail.com\n• Phone: +213697921551\n• Venue: Hafsi Abdelrazak Youth Center, Souk Ahras, Algeria'
          }
        ]
      },
    },
  },
};
