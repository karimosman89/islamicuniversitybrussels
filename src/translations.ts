export interface Program {
  college: string;
  degrees: string;
  specialties: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  discount: string;
  features: string[];
  cta: string;
}

export interface Feature {
  title: string;
  desc: string;
}

export interface Representative {
  country: string;
  flag: string;
  name: string;
  role: string;
  phone: string;
}

export interface TranslationSet {
  dir: 'rtl' | 'ltr';
  logoText: string;
  subtitleText: string;
  navAbout: string;
  navPrograms: string;
  navPricing: string;
  navRepresentatives: string;
  navRegister: string;
  navContactUs: string;
  
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroDesc: string;
  heroCtaRegister: string;
  heroCtaReps: string;
  heroBadgeInteractiveTitle: string;
  heroBadgeInteractiveDesc: string;

  aboutSectionHeader: string;
  aboutSectionSub: string;

  programsSectionHeader: string;
  programsSectionSub: string;
  programsColTableDesc: string;
  programsColTableDegrees: string;
  programsColTableSpecialties: string;
  programsThesisTitle: string;
  programsThesisDesc: string;
  programsPathsTitle: string;
  programsPathsDesc: string;

  pricingSectionHeader: string;
  pricingSectionSub: string;
  pricingUnit: string;

  repsSectionBadge: string;
  repsSectionHeader: string;
  repsSectionSub: string;
  repsBtnCta: string;

  stepsSectionHeader: string;
  stepsSectionSub: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  directAdminHeader: string;
  directorName: string;
  directorRole: string;
  directorBadge: string;
  directorLocation: string;
  directorStatus: string;
  adminChannelsSub: string;
  channelWa1: string;
  channelWa2: string;
  channelPhone: string;
  channelEmail: string;

  footerSlogan: string;
  footerFbTitle: string;
  footerCopyright: string;

  // New High-Tech Interactive Features
  searchPlaceholder: string;
  allColleges: string;
  exploreTitle: string;
  exploreSub: string;
  calculatorTitle: string;
  calculatorSub: string;
  selectDegree: string;
  isMemorizer: string;
  isMemorizerDesc: string;
  optionalShipping: string;
  optionalShippingDesc: string;
  optionalTutor: string;
  optionalTutorDesc: string;
  calcResultTuition: string;
  calcResultDiscount: string;
  calcResultExtras: string;
  calcResultTotal: string;
  calcSuccessCta: string;
  eligibilityTitle: string;
  eligibilitySub: string;
  eligibilityDegreePrompt: string;
  eligibilityOnlinePrompt: string;
  eligibilitySuccessTitle: string;
  eligibilitySuccessDesc: string;
  eligibilityCheckNow: string;
  eligibilityReset: string;
  virtualCampusTitle: string;
  virtualCampusSub: string;
  virtualCampusTab1: string;
  virtualCampusTab1Desc: string;
  virtualCampusTab2: string;
  virtualCampusTab2Desc: string;
  virtualCampusTab3: string;
  virtualCampusTab3Desc: string;
  virtualCampusTab4: string;
  virtualCampusTab4Desc: string;
  faqTitle: string;
  faqSub: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;

  programs: Program[];
  pricing: PricingPlan[];
  features: Feature[];
  representatives: Representative[];
}

export const TRANSLATIONS: Record<string, TranslationSet> = {
  ar: {
    dir: 'rtl',
    logoText: "الجامعة الإسلامية بروكسل",
    subtitleText: "فرع أوروبا (غرب أفريقيا)",
    navAbout: "عن الجامعة",
    navPrograms: "البرامج الأكاديمية",
    navPricing: "الرسوم والخصومات",
    navRepresentatives: "الممثلون الدوليون",
    navRegister: "خطوات التسجيل",
    navContactUs: "تواصل معنا",
    heroBadge: "من قلب أوروبا إلى كل باحث عن التميز في الوطن العربي والعالم",
    heroTitle1: "الجامعة الإسلامية بروكسل",
    heroTitleHighlight: "تفتح أبوابها للمستقبل",
    heroDesc: "نرحب بكم للانضمام إلى صرح تعليمي رائد يتبنى نظام التعليم عن بعد التفاعلي، المصمم خصيصاً ليناسب ظروفكم الحياتية ويجمع بين أصالة الموروث العلمي ومتطلبات العصر الحديث أينما كنتم.",
    heroCtaRegister: "ابدأ إجراءات القبول الآن",
    heroCtaReps: "ممثلو الدول المعتمدون",
    heroBadgeInteractiveTitle: "تأسس الانتساب التفاعلي",
    heroBadgeInteractiveDesc: "منذ عام 2018",
    aboutSectionHeader: "لماذا الجامعة الإسلامية بروكسل هي خيارك الأول؟",
    aboutSectionSub: "نجمع بين الخبرة الأكاديمية والمرونة التقنية لتوفير أفضل بيئة تعليمية.",
    programsSectionHeader: "البرامج الأكاديمية المتاحة",
    programsSectionSub: "نقدم باقة متنوعة من التخصصات التي تخدم احتياجات سوق العمل وتواكب التطورات العلمية.",
    programsColTableDesc: "الكلية",
    programsColTableDegrees: "الدرجات العلمية",
    programsColTableSpecialties: "التخصصات",
    programsThesisTitle: "تسهيلات المناقشة",
    programsThesisDesc: "انعقاد مناقشات الرسائل العلمية في بلد الطالب لسهولة الإجراءات.",
    programsPathsTitle: "ثلاثة مسارات للدراسات العليا",
    programsPathsDesc: "مسار البحث فقط، مسار المناهج، أو المسار المدمج.",
    pricingSectionHeader: "الاستثمار في مستقبلك (الرسوم والخصومات)",
    pricingSectionSub: "رسوم ميسرة مع خصومات خاصة لحفظة كتاب الله.",
    pricingUnit: "يورو",
    repsSectionBadge: "ممثلو الجامعة للقبول والتسجيل",
    repsSectionHeader: "ممثلو الجامعة الإسلامية بروكسل المعتمدون حسب الدولة",
    repsSectionSub: "يسعدنا تواصلكم المباشر مع ممثلينا الأكاديميين المعتمدين لتسهيل إجراءات القبول والمعادلات والتمتع بكامل الدعم الإداري.",
    repsBtnCta: "تواصل عبر واتساب",
    stepsSectionHeader: "خطوات التسجيل البسيطة",
    stepsSectionSub: "يرجى تجهيز وإرسال المستندات التالية للبدء الفوري في إجراءات القبول. ملاحظة هامة: يسمح بمعادلة المؤلفات والبحوث العلمية المنشورة لطلبة الماستر والدكتوراه.",
    step1Title: "إثبات الشخصية",
    step1Desc: "صورة ضوئية واضحة من جواز السفر أو الهوية الوطنية السارية.",
    step2Title: "صورة الشهادات السابقة",
    step2Desc: "نسخة لمؤهلك الدراسي الأخير (ثانوية، بكالوريوس، أو ماجستير).",
    step3Title: "الاستمارة والصور",
    step3Desc: "صورة شخصية حديثة ملونة، واستمارة طلب التسجيل بالجامعة مكتملة البيانات.",
    directAdminHeader: "الإدارة الإقليمية والتواصل المباشر",
    directorName: "الأستاذ الدكتور / عاطف عبد الستار حماد",
    directorRole: "المدير الإقليمي لفرع أوروبا والقبول الدولي عن بعد",
    directorBadge: "المدير الإقليمي",
    directorLocation: "بروكسل - إيطاليا",
    directorStatus: "نشط الآن",
    adminChannelsSub: "قنوات التواصل الإداري المعتمدة:",
    channelWa1: "خط واتساب الرئيسي 1",
    channelWa2: "خط واتساب الرئيسي 2",
    channelPhone: "الاتصال الهاتفي السريع",
    channelEmail: "البريد الإلكتروني المعتمد",
    footerSlogan: "علمٌ يبني الشخصية ومستقبلٌ يشرق بالمعرفة (فرع أوروبا)",
    footerFbTitle: "صفحتنا الرسمية على فيسبوك",
    footerCopyright: "© 2026 الجامعة الإسلامية بروكسل - فرع أوروبا. جميع الحقوق محفوظة.",
    
    // New High-Tech Interactive Features
    searchPlaceholder: "ابحث عن برنامجك أو تخصصك الدراسي...",
    allColleges: "كل الكليات",
    exploreTitle: "مستكشف البرامج والدرجات العلمية التفاعلي",
    exploreSub: "ابحث وصَفّ تخصصاتنا الأكاديمية المختلفة التي تتوافق مع شغفك وتطلعاتك المهنية.",
    calculatorTitle: "آلة حاسبة تكاليف الدراسة التفاعلية المتقدمة",
    calculatorSub: "احسب الرسوم الدراسية الإجمالية بدقة متناهية مع احتساب الخصومات الفورية والتفصيلية المخصصة لك.",
    selectDegree: "اختر الدرجة العلمية المستهدفة",
    isMemorizer: "هل أنت حافظ لكتاب الله كاملاً؟",
    isMemorizerDesc: "يمنحك خصماً فورياً يبلغ 20% لدرجة البكالوريوس و 10% لدرجات الماجستير والدكتوراه.",
    optionalShipping: "طلب شحن النسخ الورقية الموثقة لعنوانك؟",
    optionalShippingDesc: "يتضمن تجهيز وشحن الشهادة الأصلية بالبريد السريع الدولي المؤمن (+150 يورو)",
    optionalTutor: "تعيين مشرف تواصل خاص لخدمتك؟",
    optionalTutorDesc: "خدمة إرشادية متميزة لتوفير تواصل دائم ومباشر طوال الأسبوع مع مشرف أكاديمي خاص (+100 يورو)",
    calcResultTuition: "الرسوم الأساسية للبرنامج الدراسي:",
    calcResultDiscount: "مجموع الخصومات الممنوحة لك:",
    calcResultExtras: "تكلفة الخدمات الإضافية الاختيارية:",
    calcResultTotal: "صافي الرسوم الدراسية النهائية للاستثمار:",
    calcSuccessCta: "ابدأ إجراءات التسجيل بهذا الحساب",
    eligibilityTitle: "مساعد القبول الفوري الذكي",
    eligibilitySub: "اكتشف مدى أهليتك للتسجيل الفوري بالجامعة عبر ثلاث خطوات سريعة وتفاعلية.",
    eligibilityDegreePrompt: "ما هو آخر مؤهل علمي حصلت عليه بنجاح؟",
    eligibilityOnlinePrompt: "هل تجد في نفسك الالتزام ونظام التعلم التفاعلي عن بعد ملائماً لك؟",
    eligibilitySuccessTitle: "تهانينا! أنت مؤهل مبدئياً للقبول الفوري",
    eligibilitySuccessDesc: "نظام التقييم الأولي لدينا يؤكد توافق خلفيتك العلمية مع البرامج الدراسية. يرجى البدء في التسجيل لتأكيد مقعدك.",
    eligibilityCheckNow: "تحقق من الأهلية الآن",
    eligibilityReset: "إعادة الاختبار",
    virtualCampusTitle: "الحرم الجامعي والمنظومة الرقمية للتعلم (LMS)",
    virtualCampusSub: "اكتشف كيف يجمع نظامنا التعليمي المطور بين تفاعل القاعات الدراسية ومرونة التقنيات العالمية.",
    virtualCampusTab1: "القاعات التفاعلية المباشرة",
    virtualCampusTab1Desc: "محاضرات تفاعلية مباشرة مع نخبة من أساتذة الأزهر الشريف بالصوت والصورة مع خاصية استرجاع المحاضرات المسجلة بأي وقت.",
    virtualCampusTab2: "المكتبة الرقمية الفائقة",
    virtualCampusTab2Desc: "الوصول اللامحدود لآلاف المراجع الفقهية والقانونية والكتب العلمية الحديثة لتسهيل صياغة أبحاث ومؤلفات الماجستير والدكتوراه.",
    virtualCampusTab3: "الإشراف الأكاديمي المباشر",
    virtualCampusTab3Desc: "متابعة لصيقة لكل طالب من قبل المشرف الأكاديمي لمناقشة خطة البحث ومراجعة الفصول العلمية وضمان جودة الطرح.",
    virtualCampusTab4: "بوابة الطالب الذكية",
    virtualCampusTab4Desc: "تطبيق متكامل وسريع للمتابعة المستمرة لدرجات الاختبارات، تسليم الواجبات، مراجعة السجل المالي، والتواصل الإداري الفوري.",
    faqTitle: "الأسئلة الشائعة والأجوبة الأكاديمية المنتشرة",
    faqSub: "كل ما تود معرفته عن معادلة الشهادات والمناقشة والانتساب التفاعلي لتيسير رحلتك الأكاديمية.",
    faqQ1: "هل الشهادة الممنوحة معتمدة من الجامعة الإسلامية بروكسل ببلجيكا؟",
    faqA1: "نعم بالكامل، الشهادة تصدر مصدقة وموثقة رسمياً من الإدارة الرئيسية للجامعة في العاصمة البلجيكية بروكسل وتعتمد في جميع تخصصات فرع أوروبا.",
    faqQ2: "كيف يمكنني معادلة مؤلفاتي وأبحاثي السابقة لتسريع الدكتوراه؟",
    faqA2: "تسمح لوائح الجامعة الاستثنائية بفرع أوروبا لطلاب الماجستير والدكتوراه بمعادلة كتبهم المنشورة ومؤلفاتهم وأبحاثهم الرصينة ذات القيمة العلمية لخصم ساعات معتمدة وتسهيل تخرجهم.",
    faqQ3: "أين وكيف تتم مناقشة رسالة الماجستير أو الدكتوراه؟",
    faqA3: "لتسهيل السفر والتكاليف على الباحثين، تعقد مناقشات الرسائل العلمية داخل بلد الطالب أو الإقليم الذي يقيم فيه بحضور لجنة علمية مرخصة وموفدة خصيصاً من الجامعة.",
    faqQ4: "ما هي شروط تخفيض الرسوم الدراسية المقررة؟",
    faqA4: "تقديرًا لمكانة القرآن الكريم، تمنح الجامعة خصماً استثنائياً وفورياً يبلغ 20% لحفظة كتاب الله بمرحلة البكالوريوس، و 10% بمرحلتي الماجستير والدكتوراه عند تقديم مستند يثبت الحفظ.",
    programs: [
      {
        college: "الشريعة والقانون",
        degrees: "ليسانس - ماجستير - دكتوراه",
        specialties: "أصول الدين، الشريعة الإسلامية، اللغة العربية، الاقتصاد الإسلامي، والقانون."
      },
      {
        college: "التربية والتكوين",
        degrees: "ماجستير - دكتوراه",
        specialties: "المناهج وطرق التدريس، الإدارة التربوية، التخطيط التربوي، والاستشارة التربوية."
      },
      {
        college: "الاقتصاد والعلوم الإدارية",
        degrees: "بكالوريوس - ماجستير - دكتوراه",
        specialties: "إدارة الأعمال، المحاسبة، وإدارة الموارد البشرية."
      }
    ],
    pricing: [
      {
        title: "مرحلة الليسانس / البكالوريوس",
        price: "1000",
        discount: "خصم 20% لحفظة القرآن الكريم",
        features: ["تعليم تفاعلي كامل", "شهادة معتمدة من الجامعة"],
        cta: "اشترك الآن"
      },
      {
        title: "مرحلة الماجستير",
        price: "1200",
        discount: "خصم 10% لحفظة القرآن الكريم",
        features: ["تعليم تفاعلي كامل", "شهادة معتمدة من الجامعة"],
        cta: "اشترك الآن"
      },
      {
        title: "مرحلة الدكتوراه",
        price: "1400",
        discount: "خصم 10% لحفظة القرآن الكريم",
        features: ["تعليم تفاعلي كامل", "شهادة معتمدة من الجامعة"],
        cta: "اشترك الآن"
      }
    ],
    features: [
      {
        title: "نخبة أكاديمية عالمية",
        desc: "ستتعلم على يد كوكبة من العلماء، وعلى رأسهم أساتذة من جامعة الأزهر الشريف."
      },
      {
        title: "مرونة تعليمية كاملة",
        desc: "نظام التعليم عن بعد (الانتساب التفاعلي) منذ عام 2018 لتجاوز عقبات التأشيرات والمسافات."
      },
      {
        title: "جسر حضاري",
        desc: "بيئة تعليمية غنية تجمع طلاباً من مختلف الجنسيات، مما يعزز تبادل الخبرات."
      },
      {
        title: "دعم البحث العلمي",
        desc: "منصات للنشر العلمي ومؤتمرات دورية تتيح للباحثين عرض نتاجهم الفكري."
      }
    ],
    representatives: [
      {
        country: "تركيا",
        flag: "🇹🇷",
        name: "الأستاذ الدكتور حسين عبد العال",
        role: "الممثل الأكاديمي الدولي للجامعة",
        phone: "+90 534 936 5045"
      },
      {
        country: "المملكة العربية السعودية",
        flag: "🇸🇦",
        name: "الشيخ حسام",
        role: "الممثل الأكاديمي الدولي للجامعة",
        phone: "+966 542 788 100"
      },
      {
        country: "إيطاليا",
        flag: "🇮🇹",
        name: "الدكتور هشام رفاعي",
        role: "الممثل الأكاديمي الدولي للجامعة",
        phone: "+39 320 782 8216"
      },
      {
        country: "المسؤول الإعلامي وعلاقات الاتصال",
        flag: "🎥",
        name: "م. كريم عثمان",
        role: "المسؤول الإعلامي لتواصل الطلاب",
        phone: "+39 320 952 4754"
      }
    ]
  },
  en: {
    dir: 'ltr',
    logoText: "Islamic University of Brussels",
    subtitleText: "Europe Branch (West Africa)",
    navAbout: "About University",
    navPrograms: "Academic Programs",
    navPricing: "Fees & Discounts",
    navRepresentatives: "International Reps",
    navRegister: "Registration Steps",
    navContactUs: "Contact Us",
    heroBadge: "From the heart of Europe to every researcher of excellence in the world",
    heroTitle1: "Islamic University of Brussels",
    heroTitleHighlight: "Opens its Doors to the Future",
    heroDesc: "We welcome you to join a pioneering educational institution adopting interactive distance learning, designed to fit your life circumstances and bridge authentic science with modern-day demands.",
    heroCtaRegister: "Apply for Admission Now",
    heroCtaReps: "Accredited Representatives",
    heroBadgeInteractiveTitle: "Interactive Learning Program",
    heroBadgeInteractiveDesc: "Established in 2018",
    aboutSectionHeader: "Why Islamic University of Brussels is Your Best Choice?",
    aboutSectionSub: "We blend profound academic expertise with high technology to deliver a superior learning experience.",
    programsSectionHeader: "Available Academic Programs",
    programsSectionSub: "Choosing from a wide spectrum of specializations crafted to empower you in the modern job market.",
    programsColTableDesc: "College",
    programsColTableDegrees: "Offered Degrees",
    programsColTableSpecialties: "Specializations",
    programsThesisTitle: "Defense Facilities",
    programsThesisDesc: "Thesis defense can be conducted in the student's country of residence to ease procedures.",
    programsPathsTitle: "Three Graduate Paths",
    programsPathsDesc: "Research-only path, curricula-based path, or a combined path.",
    pricingSectionHeader: "Investment in Your Future",
    pricingSectionSub: "Affordable tuitions with special scholarships for Quran memorizers.",
    pricingUnit: "EUR",
    repsSectionBadge: "Admissions & Registrations",
    repsSectionHeader: "Accredited International Representatives by Country",
    repsSectionSub: "Contact our local academic representatives directly to process your admission, document equivalency, and obtain local administrative aid.",
    repsBtnCta: "Contact via WhatsApp",
    stepsSectionHeader: "Simple Registration Steps",
    stepsSectionSub: "Please prepare and submit the following documents to instantly initiate the admission process. Note: Equivalent recognition is offered for prior books and published scientific research papers.",
    step1Title: "Proof of Identity",
    step1Desc: "A clear copy of a valid passport or national ID card.",
    step2Title: "Prior Credentials",
    step2Desc: "Copy of your latest academic graduation certificate (High School, Bachelor, or Master).",
    step3Title: "Form & Photo",
    step3Desc: "A recent colored personal photo and the fully completed registration form.",
    directAdminHeader: "Regional Administration & Direct Contacts",
    directorName: "Prof. Dr. Atef Abd El-Sattar Hammad",
    directorRole: "Regional Director for Europe Branch & International Admissions",
    directorBadge: "Regional Director",
    directorLocation: "Brussels - Italy",
    directorStatus: "Active Now",
    adminChannelsSub: "Certified Administrative Communication Channels:",
    channelWa1: "Main WhatsApp Line 1",
    channelWa2: "Main WhatsApp Line 2",
    channelPhone: "Quick Hotline Support",
    channelEmail: "Approved Institutional Email",
    footerSlogan: "Science that builds character and a future that shines with knowledge (Europe Branch)",
    footerFbTitle: "Our Official Facebook Page",
    footerCopyright: "© 2026 Islamic University of Brussels - Europe Branch. All rights reserved.",
    
    // New High-Tech Interactive Features
    searchPlaceholder: "Search for your academic program or specialty...",
    allColleges: "All Colleges",
    exploreTitle: "Interactive Degree & Program Explorer",
    exploreSub: "Search and filter our diverse academic faculties that align with your professional goals.",
    calculatorTitle: "Interactive Tuition & Fees Calculator",
    calculatorSub: "Calculate your estimated total academic tuition dynamically including your eligible discounts.",
    selectDegree: "Select Your Targeted Degree",
    isMemorizer: "Are you a memorizer of the Holy Quran?",
    isMemorizerDesc: "Grants a 20% discount for Bachelor level and 10% discount for Master and Doctoral levels.",
    optionalShipping: "Request verified physical paper certificates delivery?",
    optionalShippingDesc: "Includes preparing and shipping the original certified diploma using international secure express courier (+150 EUR)",
    optionalTutor: "Assign a dedicated academic counselor to your aid?",
    optionalTutorDesc: "Premium advisory services with direct support throughout the week with a personal academic advisor (+100 EUR)",
    calcResultTuition: "Base Program Tuition Fee:",
    calcResultDiscount: "Your Eligible Applied Discounts:",
    calcResultExtras: "Optional Service Costs Selected:",
    calcResultTotal: "Final Invested Tuition Balance:",
    calcSuccessCta: "Start Registration With This Quote",
    eligibilityTitle: "Smart Fast-Track Admission Assistant",
    eligibilitySub: "Assess your immediate registration eligibility at the university in visual simple steps.",
    eligibilityDegreePrompt: "What is your highest completed educational degree?",
    eligibilityOnlinePrompt: "Are you comfortable with standard, interactive online distance learning?",
    eligibilitySuccessTitle: "Congratulations! You are eligible for admissions",
    eligibilitySuccessDesc: "Our initial evaluation confirms that your scientific background matches our programs. Start registration immediately.",
    eligibilityCheckNow: "Check Eligibility Now",
    eligibilityReset: "Reset Assistant",
    virtualCampusTitle: "E-Campus & Learning Management System (LMS)",
    virtualCampusSub: "Experience how our modern educational portal brings physical classroom intimacy into virtual formats.",
    virtualCampusTab1: "Live Interactive Lectures",
    virtualCampusTab1Desc: "High-definition live video lectures with professors from Al-Azhar Al-Sharif, with full access to replay recorded material anytime.",
    virtualCampusTab2: "Comprehensive Digital Library",
    virtualCampusTab2Desc: "Instant access to thousands of Islamic jurisprudence, historical law texts, and research papers to ease graduate work.",
    virtualCampusTab3: "Private Scholar Advising",
    virtualCampusTab3Desc: "Direct guidance from designated academic supervisors to structure theses, research templates, and finalize defenses.",
    virtualCampusTab4: "Smart Student Portal",
    virtualCampusTab4Desc: "Unified lightweight dashboard to check grades, submit homework, view financial items, and text advisors in real-time.",
    faqTitle: "Frequently Asked Academic Questions",
    faqSub: "Find key answers on document equivalence, thesis defenses, and degree recognitions.",
    faqQ1: "Is the granted degree officially accredited by the main university?",
    faqA1: "Absolutely. Diplomas are officially issued, certified, and authenticated by the university headquarters in Brussels, Belgium, for the Europe Branch.",
    faqQ2: "Can I equate prior publications to accelerate my degree?",
    faqA2: "Yes. Exceptionally in the Europe Branch, outstanding research papers or academic books can be evaluated to deduct curriculum requirements.",
    faqQ3: "Where are thesis defenses held?",
    faqA3: "Defenses are held in the student's country or region to lower travel costs. A specialized academic jury is dispatched for the evaluation.",
    faqQ4: "What discounts are available for students?",
    faqA4: "In honor of the Quran, we offer an immediate 20% tuition discount for memorizers at the Bachelor level and 10% at the Master or Doctoral levels.",
    programs: [
      {
        college: "Sharia and Law",
        degrees: "Bachelor - Master - PhD",
        specialties: "Fundamentals of Religion, Islamic law (Sharia), Arabic Language, Islamic Economics, and General Law."
      },
      {
        college: "Education and Training",
        degrees: "Master - PhD",
        specialties: "Curricula and Teaching Methods, Educational Evaluation & Administration, Planning, and Educational Counseling."
      },
      {
        college: "Economics & Administrative Sciences",
        degrees: "Bachelor - Master - PhD",
        specialties: "Business Administration, Accounting & Financial Audit, and Human Resources Management."
      }
    ],
    pricing: [
      {
        title: "Bachelor's Degree Level",
        price: "1000",
        discount: "20% Discount for Quran Memorizers",
        features: ["Fully Interactive Learning", "University Accredited Certificate"],
        cta: "Enroll Now"
      },
      {
        title: "Master's Degree Level",
        price: "1200",
        discount: "10% Discount for Quran Memorizers",
        features: ["Fully Interactive Learning", "University Accredited Certificate"],
        cta: "Enroll Now"
      },
      {
        title: "PhD Doctoral Level",
        price: "1400",
        discount: "10% Discount for Quran Memorizers",
        features: ["Fully Interactive Learning", "University Accredited Certificate"],
        cta: "Enroll Now"
      }
    ],
    features: [
      {
        title: "International Elite Faculty",
        desc: "Study under elite Islamic scholars and university professors, foremost among whom are faculties from Al-Azhar Al-Sharif."
      },
      {
        title: "Complete Flexibility",
        desc: "Interactive distance learning system active since 2018, completely bypassing visa hurdles and geographic barriers."
      },
      {
        title: "Civilizational Bridge",
        desc: "An incredibly rich, global environment uniting students from over 30 countries to share academic views and experiences."
      },
      {
        title: "Scientific Research Support",
        desc: "Specialized platforms for academic publication and periodic symposia letting researchers publish and present essays globally."
      }
    ],
    representatives: [
      {
        country: "Turkey",
        flag: "🇹🇷",
        name: "Prof. Dr. Hussein Abdel Aal",
        role: "International Academic Representative",
        phone: "+90 534 936 5045"
      },
      {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        name: "Sheikh Husam",
        role: "International Academic Representative",
        phone: "+966 542 788 100"
      },
      {
        country: "Italy",
        flag: "🇮🇹",
        name: "Dr. Hisham Rifaai",
        role: "International Academic Representative",
        phone: "+39 320 782 8216"
      },
      {
        country: "Media & Student Relations",
        flag: "🎥",
        name: "Eng. Karim Osman",
        role: "Official Media Liaison",
        phone: "+39 320 952 4754"
      }
    ]
  },
  it: {
    dir: 'ltr',
    logoText: "Università Islamica di Bruxelles",
    subtitleText: "Sede Europea (Africa Occidentale)",
    navAbout: "L'Università",
    navPrograms: "Programmi Accademici",
    navPricing: "Rette e Sconti",
    navRepresentatives: "Rappresentanti",
    navRegister: "Iscrizione",
    navContactUs: "Contattaci",
    heroBadge: "Dal cuore dell'Europa a tutti i ricercatori di eccellenza nel mondo",
    heroTitle1: "L'Università Islamica",
    heroTitleHighlight: "Apre le Porte al Futuro",
    heroDesc: "Unisciti a noi in un'istituzione universitaria d'avanguardia. Il nostro rinomato sistema di apprendimento interattivo a distanza è progettato per adattarsi alla tua vita, coniugando l'autentica eredità scientifica e le esigenze moderne.",
    heroCtaRegister: "Inizia l'Ammissione Ora",
    heroCtaReps: "Rappresentanti Accreditati",
    heroBadgeInteractiveTitle: "Apprendimento Interattivo",
    heroBadgeInteractiveDesc: "Fondato nel 2018",
    aboutSectionHeader: "Perché l'Università Islamica di Bruxelles è la tua Scelta?",
    aboutSectionSub: "Combiniamo esperienza accademica e metodologie digitali avanzate per offrire un ambiente formativo d'eccellenza.",
    programsSectionHeader: "Programmi Accademici Disponibili",
    programsSectionSub: "Un catalogo completo progettato per arricchire la tua formazione e connetterti al mercato professionale.",
    programsColTableDesc: "Facoltà",
    programsColTableDegrees: "Titoli di Studio",
    programsColTableSpecialties: "Specializzazioni",
    programsThesisTitle: "Sostegni alla Discussione",
    programsThesisDesc: "Svolgimento delle discussioni di tesi direttamente nel paese dello studente per semplificare i viaggi.",
    programsPathsTitle: "Tre Percorsi Post-Laurea",
    programsPathsDesc: "Percorso basato solo sulla ricerca, percorso basato sul curriculum o integrato.",
    pricingSectionHeader: "Un Investimento nel Tuo Futuro",
    pricingSectionSub: "Rette di studio rateizzabili con agevolazioni dedicate ai memorizzatori del Sacro Corano.",
    pricingUnit: "EUR",
    repsSectionBadge: "Ammissioni e Iscrizioni",
    repsSectionHeader: "Rappresentanti Internazionali Accreditati per Paese",
    repsSectionSub: "Contatta direttamente i nostri esperti locali per facilitare i processi di ammissione, equipollenza dei titoli e ricevere supporto burocratico.",
    repsBtnCta: "Contatta via WhatsApp",
    stepsSectionHeader: "Semplici Fasi di Registrazione",
    stepsSectionSub: "Prepara e invia i seguenti documenti per registrarti ed iniziare subito. Nota bene: è riconosciuto lo status di equipollenza per le pubblicazioni e i contributi scientifici di valore.",
    step1Title: "Documento d'Identità",
    step1Desc: "Scansione digitale leggibile del passaporto o della carta d'identità in corso di validità.",
    step2Title: "Certificazione Accademica",
    step2Desc: "Copia dell'ultimo titolo di studio conseguito (Diploma Superiore, Laurea Triennale, Laurea Magistrale).",
    step3Title: "Moduli e Foto",
    step3Desc: "Una fototessera a colori recente e il modulo ufficiale di domanda debitamente compilato.",
    directAdminHeader: "Amministrazione Regionale e Contatti Diretti",
    directorName: "Prof. Dr. Atef Abd El-Sattar Hammad",
    directorRole: "Direttore Regionale per la Sede Europea e Ammissioni a Distanza",
    directorBadge: "Direttore Regionale",
    directorLocation: "Bruxelles - Italia",
    directorStatus: "Attivo Ora",
    adminChannelsSub: "Canali di Comunicazione Ufficiali ed Autorizzati:",
    channelWa1: "Assistenza WhatsApp Centrale 1",
    channelWa2: "Assistenza WhatsApp Centrale 2",
    channelPhone: "Hotline Telefonica Diretta",
    channelEmail: "E-mail Ufficiale Accreditata",
    footerSlogan: "Scienza che edifica l'individuo e un futuro che risplende di sapere (Sede Europea)",
    footerFbTitle: "Nostra Pagina Facebook Ufficiale",
    footerCopyright: "© 2026 Università Islamica di Bruxelles - Sede Europea. Tutti i diritti riservati.",
    
    // New High-Tech Interactive Features
    searchPlaceholder: "Cerca la tua facoltà accademica o specializzazione...",
    allColleges: "Tutte le Facoltà",
    exploreTitle: "Esploratore Interattivo dei Corsi di Studio",
    exploreSub: "Cerca e filtra tra i nostri diversi programmi accademici per trovare quello ideale per il tuo futuro.",
    calculatorTitle: "Calcolatore delle Rette di Studio Interattivo",
    calculatorSub: "Calcola in tempo reale la retta di studio stimata con gli sconti applicati e le opzioni extra.",
    selectDegree: "Seleziona il Titolo di Studio di Interesse",
    isMemorizer: "Hai memorizzato il Sacro Corano interamente?",
    isMemorizerDesc: "Garantisce uno sconto del 20% per la Laurea Triennale e del 10% per i corsi di Master e Dottorato.",
    optionalShipping: "Richiedi la spedizione della pergamena cartacea originale?",
    optionalShippingDesc: "Spedizione sicura all'estero dell'originale autenticato tramite corriere espresso internazionale (+150 EUR)",
    optionalTutor: "Assegna un consulente accademico dedicato?",
    optionalTutorDesc: "Servizio premium con tutor privato per seguirti durante l'intero percorso accademico ogni settimana (+100 EUR)",
    calcResultTuition: "Retta di Studio Base del Corso:",
    calcResultDiscount: "Sconto Applicato Idoneo:",
    calcResultExtras: "Costo dei Servizi Opzionali Selezionati:",
    calcResultTotal: "Rete di Studio Finale Netta Investita:",
    calcSuccessCta: "Inizia l'Iscrizione Con Questo Preventivo",
    eligibilityTitle: "Assistente Ammissioni Intuitivo e Veloce",
    eligibilitySub: "Scopri subito se possiedi i requisiti per iscriverti alla nostra università in pochi clic.",
    eligibilityDegreePrompt: "Qual è il tuo titolo di studio più elevato conseguito?",
    eligibilityOnlinePrompt: "Ti senti a tuo agio con l'apprendimento digitale e la didattica a distanza?",
    eligibilitySuccessTitle: "Congratulazioni! Sei idoneo per l'ammissione",
    eligibilitySuccessDesc: "La valutazione iniziale conferma che la tua formazione di partenza corrisponde ai nostri corsi. Procedi subito alla registrazione.",
    eligibilityCheckNow: "Controlla l'Idoneità Ora",
    eligibilityReset: "Reimposta Assistente",
    virtualCampusTitle: "Campus Virtuale e Piattaforma di Studio (LMS)",
    virtualCampusSub: "Esplora come il nostro sistema e-learning avanzato unisce la didattica classica alle moderne tecnologie web.",
    virtualCampusTab1: "Lezioni Interattive in Diretta",
    virtualCampusTab1Desc: "Lezioni live in HD con professori dell'Università di Al-Azhar Al-Sharif, con accesso alle registrazioni in qualsiasi momento.",
    virtualCampusTab2: "Biblioteca Digitale Completa",
    virtualCampusTab2Desc: "Accesso immediato a migliaia di testi di giurisprudenza islamica, materiali storici e articoli di ricerca.",
    virtualCampusTab3: "Supervisione di uno Studioso Privato",
    virtualCampusTab3Desc: "Guida diretta per lo sviluppo delle tesi o tesine di ricerca accademica e la preparazione della discussione.",
    virtualCampusTab4: "Portale dello Studente Smart",
    virtualCampusTab4Desc: "Bacheca centralizzata per controllare i voti, inviare i compiti e comunicare via chat con la segreteria.",
    faqTitle: "Domande Frequenti Accademiche",
    faqSub: "Trova risposte utili su equipollenze dei titoli, tesi di laurea d'eccellenza, ed esami.",
    faqQ1: "I titoli rilasciati sono accreditati dalla sede centrale?",
    faqA1: "Assolutamente sì. Tutti i diplomi sono emessi ufficialmente, certificati e autenticati dalla sede principale di Bruxelles, Belgio.",
    faqQ2: "Posso far valutare pubblicazioni pregresse per accelerare il percorso?",
    faqA2: "Sì. Nella sede Europea, libri accademici o ricerche scientifiche di valore già pubblicati possono abbreviare i corsi accademici.",
    faqQ3: "Dove si svolgono le discussioni delle tesi di laurea?",
    faqA3: "Le sessioni si tengono direttamente nel paese dello studente per annullare le spese di viaggio. Una commissione apposita sarà all'uopo designata.",
    faqQ4: "Quali sconti sono previsti sulle rette di studio?",
    faqA4: "In onore del Corano, si applica uno sconto del 20% sulla retta per la Laurea Triennale e del 10% per i percorsi di Master o Dottorato.",
    programs: [
      {
        college: "Sharia (Diritto Islamico) e Giurisprudenza",
        degrees: "Laurea - Master - Dottorato",
        specialties: "Fondamenti di Religione, Sharia Islamica, Lingua Araba, Economia Islamica, e Diritto Civile."
      },
      {
        college: "Pedagogia e Formazione",
        degrees: "Master - Dottorato",
        specialties: "Metodi e Teorie di Insegnamento, Gestione Educativa, Pianificazione e Consulenza di Carriera."
      },
      {
        college: "Economia e Scienze Amministrative",
        degrees: "Laurea - Master - Dottorato",
        specialties: "Amministrazione Aziendale, Contabilità di Stato e Revisione, Risorse Umane."
      }
    ],
    pricing: [
      {
        title: "Laurea Triennale / Bachelor",
        price: "1000",
        discount: "Sconto del 20% per i memorizzatori del Corano",
        features: ["Apprendimento interattivo completo", "Certificato autenticato dall'università"],
        cta: "Iscriviti Adesso"
      },
      {
        title: "Laurea Magistrale / Master",
        price: "1200",
        discount: "Sconto del 10% per i memorizzatori del Corano",
        features: ["Apprendimento interattivo completo", "Certificato autenticato dall'università"],
        cta: "Iscriviti Adesso"
      },
      {
        title: "Dottorato di Ricerca / PhD",
        price: "1400",
        discount: "Sconto del 10% per i memorizzatori del Corano",
        features: ["Apprendimento interattivo completo", "Certificato autenticato dall'università"],
        cta: "Iscriviti Adesso"
      }
    ],
    features: [
      {
        title: "Corpo Docenti di Fama Mondiale",
        desc: "Studia guidato da un illustre corpo accademico, che comprende professori stimati provenienti dall'Università di Al-Azhar Al-Sharif."
      },
      {
        title: "Flessibilità Studio Assoluta",
        desc: "Metodo di e-learning attivo dal 2018 ideato per oltrepassare i vincoli doganali, visti e le distanze territoriali."
      },
      {
        title: "Incontro di Culture",
        desc: "Una comunità cosmopolita ricchissima che unisce studenti di diverse nazionalità, valorizzando il dialogo."
      },
      {
        title: "Supporto Ricerca Scientifica",
        desc: "Piattaforme di editoria accademica e rassegne costanti che permettono di pubblicare le proprie tesi scientifiche."
      }
    ],
    representatives: [
      {
        country: "Turchia",
        flag: "🇹🇷",
        name: "Prof. Dr. Hussein Abdel Aal",
        role: "Rappresentante Accademico Internazionale",
        phone: "+90 534 936 5045"
      },
      {
        country: "Arabia Saudita",
        flag: "🇸🇦",
        name: "Sheikh Husam",
        role: "Rappresentante Accademico Internazionale",
        phone: "+966 542 788 100"
      },
      {
        country: "Italia",
        flag: "🇮🇹",
        name: "Dr. Hisham Rifaai",
        role: "Rappresentante Accademico Internazionale",
        phone: "+39 320 782 8216"
      },
      {
        country: "Relazioni Media & Studenti",
        flag: "🎥",
        name: "Ing. Karim Osman",
        role: "Ufficio Stampa e Coordinamento",
        phone: "+39 320 952 4754"
      }
    ]
  },
  fr: {
    dir: 'ltr',
    logoText: "Université Islamique de Bruxelles",
    subtitleText: "Branche Européenne (Afrique de l'Ouest)",
    navAbout: "L'Université",
    navPrograms: "Programmes Académiques",
    navPricing: "Frais & Bourses",
    navRepresentatives: "Représentants",
    navRegister: "Inscription",
    navContactUs: "Contactez-nous",
    heroBadge: "Du cœur de l'Europe à tous les chercheurs d'excellence au monde",
    heroTitle1: "L'Université Islamique",
    heroTitleHighlight: "Ouvre ses Portes sur l'Avenir",
    heroDesc: "Rejoignez une institution académique de premier plan. Notre système interactif d'enseignement à distance s'ajuste à vos contraintes, unissant la profondeur des traditions académiques aux innovations contemporaines.",
    heroCtaRegister: "Inscrivez-vous Maintenant",
    heroCtaReps: "Représentants Agréés",
    heroBadgeInteractiveTitle: "Apprentissage Interactif",
    heroBadgeInteractiveDesc: "Établi depuis 2018",
    aboutSectionHeader: "Pourquoi Choisir l'Université Islamique de Bruxelles ?",
    aboutSectionSub: "Une alliance parfaite d'excellence académique et de flexibilité digitale au service de votre réussite.",
    programsSectionHeader: "Nos Programmes D'Études",
    programsSectionSub: "Un large panel de spécialités rigoureuses en phase directe avec les enjeux et besoins du marché mondial.",
    programsColTableDesc: "Faculté",
    programsColTableDegrees: "Titres Délivrés",
    programsColTableSpecialties: "Domaines de Spécialisation",
    programsThesisTitle: "Soutenance Simplifiée",
    programsThesisDesc: "Soutenance de thèses possible dans le pays d'origine pour soulager les frais administratifs.",
    programsPathsTitle: "Trois Cursus de Master & Doctorat",
    programsPathsDesc: "Parcours de recherche exclusive, parcours modulaire ou mixte intégré.",
    pricingSectionHeader: "Investir Dans Votre Réussite",
    pricingSectionSub: "Frais de scolarité étudiés avec des réductions méritoires pour les mémorisateurs du Saint Coran.",
    pricingUnit: "EUR",
    repsSectionBadge: "Admissions et Inscriptions",
    repsSectionHeader: "Nos Représentants Internationaux Agréés",
    repsSectionSub: "Entrez en relation directe avec les délégués régionaux afin de faciliter vos homologations de diplôme et l'instruction administrative locale.",
    repsBtnCta: "Contactez par WhatsApp",
    stepsSectionHeader: "Des Étapes D'Inscription Faciles",
    stepsSectionSub: "Préparez et envoyez les pièces justificatives suivantes pour démarrer immédiatement votre inscription. Note : Équivalence accordée sur présentation de recherches déjà publiées ou ouvrages d'auteur.",
    step1Title: "Pièce d'Identité",
    step1Desc: "Une copie numérique nette d'un passeport valide ou d'une carte d'identité.",
    step2Title: "Titres Précédents",
    step2Desc: "Copie conforme de votre dernier diplôme d'études (Baccalauréat, Licence, ou Master).",
    step3Title: "Dossier & Visuel",
    step3Desc: "Une photo d'identité récente en couleur et le formulaire d'admission dûment complété.",
    directAdminHeader: "Administration Régionale & Contacts Directs",
    directorName: "Prof. Dr. Atef Abd El-Sattar Hammad",
    directorRole: "Directeur Régional pour la Sede Européenne & Admissions Internationales",
    directorBadge: "Directeur Régional",
    directorLocation: "Bruxelles - Italie",
    directorStatus: "Actif Maintenant",
    adminChannelsSub: "Canaux Officiels de Communication Administrative :",
    channelWa1: "Ligne WhatsApp Principale 1",
    channelWa2: "Ligne WhatsApp Principale 2",
    channelPhone: "Ligne Téléphonique Directe",
    channelEmail: "Adresse E-mail Officielle",
    footerSlogan: "La science qui structure l'individu et un avenir rayonné de savoirs (Branche Européenne)",
    footerFbTitle: "Notre Page Facebook Officielle",
    footerCopyright: "© 2026 Université Islamique de Bruxelles - Branche Européenne. Tous droits réservés.",
    
    // New High-Tech Interactive Features
    searchPlaceholder: "Rechercher votre faculté académique ou domaine d'étude...",
    allColleges: "Toutes les Facultés",
    exploreTitle: "Explorateur Interactif de Programmes & Diplômes",
    exploreSub: "Recherchez et filtrez nos différentes spécialités d'excellence académique adaptées à votre projet.",
    calculatorTitle: "Simulateur Interactif des Frais Universitaires",
    calculatorSub: "Calculez de manière dynamique le montant total de vos frais avec bourses et options incluses.",
    selectDegree: "Sélectionnez le Diplôme Visé",
    isMemorizer: "Avez-vous mémorisé entièrement le Saint Coran ?",
    isMemorizerDesc: "Octroie une remise immédiate de 20% pour le niveau Licence et de 10% pour les niveaux Master et Doctorat.",
    optionalShipping: "Demandez-vous l'expédition physique des parchemins officiels ?",
    optionalShippingDesc: "Comprend la préparation et l'expédition sécurisée internationale de vos diplômes certifiés originaux par courrier express (+150 EUR)",
    optionalTutor: "Souhaitez-vous un accompagnement par un tuteur dédié ?",
    optionalTutorDesc: "Service premium assurant un suivi académique et une assistance rapide chaque semaine par un tuteur désigné (+100 EUR)",
    calcResultTuition: "Frais de Cursus Fondamentaux :",
    calcResultDiscount: "Montant de votre Réduction Éligible :",
    calcResultExtras: "Tarif des Options de Service Sélectionnées :",
    calcResultTotal: "Frais de Scolarité Finaux Nets Investis :",
    calcSuccessCta: "Démarrer l'Inscription avec ce Devis",
    eligibilityTitle: "Assistant d'Admissibilité Instantané Virtuel",
    eligibilitySub: "Vérifiez vos critères d'admission directe à l'université en quelques étapes ludiques.",
    eligibilityDegreePrompt: "Quel est votre diplôme d'études le plus élevé complété ?",
    eligibilityOnlinePrompt: "L'organisation d'un enseignement interactif connecté à distance vous convient-elle ?",
    eligibilitySuccessTitle: "Félicitations ! Vous êtes éligible à l'admission",
    eligibilitySuccessDesc: "Notre évaluation préliminaire confirme la conformité de votre parcours avec nos cursus d'études. Initiez l'inscription sans tarder.",
    eligibilityCheckNow: "Vérifier l'Éligibilité Maintenant",
    eligibilityReset: "Réinitialiser l'Assistant",
    virtualCampusTitle: "E-Campus et Système de Gestion de l'Apprentissage (LMS)",
    virtualCampusSub: "Découvrez notre plateforme d'enseignement qui allie proximité pédagogique et puissance du web.",
    virtualCampusTab1: "Cours Interactifs en Direct",
    virtualCampusTab1Desc: "Conférences HD en direct animées par des professeurs de l'Université Al-Azhar Al-Sharif, avec possibilité de réécouter à tout moment.",
    virtualCampusTab2: "Bibliothèque Numérique Complète",
    virtualCampusTab2Desc: "Accès illimité à des milliers d'ouvrages théologiques, de droit constitutionnel et d'articles de référence scientifique.",
    virtualCampusTab3: "Suivi sous Direction de Thèse",
    virtualCampusTab3Desc: "Accompagnement rigoureux de votre directeur de recherche affecté pour élaborer vos écrits scientifiques de Master/Doctorat.",
    virtualCampusTab4: "Portail Étudiant Intelligent",
    virtualCampusTab4Desc: "Tableau de bord unifié pour consulter vos notes, envoyer vos devoirs hebdomadaires et échanger par messagerie avec l'administration.",
    faqTitle: "Foire Aux Questions Académiques",
    faqSub: "Toutes les clés pour comprendre l'homologation des diplômes, les jurys de soutenance et nos remises.",
    faqQ1: "Les diplômes délivrés sont-ils reconnus par le siège principal ?",
    faqA1: "Absolument. Tous les titres sont délivrés, authentifiés et officiellement scellés par la présidence à Bruxelles, Belgique.",
    faqQ2: "Peut-on faire valider ses ouvrages antérieurs pour écourter le cycle de recherche ?",
    faqA2: "Oui. Exceptionnellement pour l'Europe, les travaux d'auteur de valeur ou articles scientifiques déjà publiés peuvent faire l'objet d'équivalence.",
    faqQ3: "Où se tiennent les soutenances orales des mémoires et thèses ?",
    faqA3: "Les soutenances sont organisées dans le pays du candidat pour éviter les frais de voyage lourds. Un jury académique officiel s'y déplace.",
    faqQ4: "Existe-t-il des bourses ou réductions de frais ?",
    faqA4: "Pour honorer le Coran, une remise immédiate de 20% est octroyée en Licence et 10% en Master et Doctorat aux candidats mémorisateurs.",
    programs: [
      {
        college: "Sharia et Droit Constitutionnel",
        degrees: "Licence - Master - Doctorat",
        specialties: "Théologie, Droit Islamique (Sharia), Langue Arabe, Économie Islamique et Droit Public."
      },
      {
        college: "Éducation et Didactique",
        degrees: "Master - Doctorat",
        specialties: "Didactique et Méthodes de l'Enseignement, Administration Scolaire, Planification et Orientation Scolaire."
      },
      {
        college: "Économie & Sciences de Gestion",
        degrees: "Licence - Master - Doctorat",
        specialties: "Management des Affaires, Comptabilité et Audit de Gestion, Gestion des Ressources Humaines."
      }
    ],
    pricing: [
      {
        title: "Niveau Licence / Bachelor",
        price: "1000",
        discount: "Réduction de 20% pour les mémorisateurs du Coran",
        features: ["Enseignement interactif complet", "Diplôme authentifié par l'université"],
        cta: "S'inscrire Maintenant"
      },
      {
        title: "Niveau Master",
        price: "1200",
        discount: "Réduction de 10% pour les mémorisateurs du Coran",
        features: ["Enseignement interactif complet", "Diplôme authentifié par l'université"],
        cta: "S'inscrire Maintenant"
      },
      {
        title: "Niveau Doctorat (PhD)",
        price: "1400",
        discount: "Réduction de 10% pour les mémorisateurs du Coran",
        features: ["Enseignement interactif complet", "Diplôme authentifié par l'université"],
        cta: "S'inscrire Maintenant"
      }
    ],
    features: [
      {
        title: "Enseignants de Classe Mondiale",
        desc: "Bénéficiez du savoir d'académiciens respectés et de professeurs notables issus notamment de l'Université Al-Azhar Al-Sharif."
      },
      {
        title: "Souplesse Académique Intégrale",
        desc: "Notre formation numérique engagée depuis 2018 affranchit l'étudiant des contraintes géopolitiques mondiales et de visa."
      },
      {
        title: "Passerelle Interculturelle",
        desc: "Une communauté estudiantine diversifiée représentant plus d'une vingtaine de pays, maximisant le partage d'idées."
      },
      {
        title: "Soutien aux Jeunes Chercheurs",
        desc: "Revues internationales partenaires et colloques permanents pour exposer vos écrits, thèses et obtenir une visibilité."
      }
    ],
    representatives: [
      {
        country: "Turquie",
        flag: "🇹🇷",
        name: "Prof. Dr. Hussein Abdel Aal",
        role: "Représentant Académique International",
        phone: "+90 534 936 5045"
      },
      {
        country: "Arabie Saoudite",
        flag: "🇸🇦",
        name: "Sheikh Husam",
        role: "Représentant Académique International",
        phone: "+966 542 788 100"
      },
      {
        country: "Italie",
        flag: "🇮🇹",
        name: "Dr. Hisham Rifaai",
        role: "Représentant Académique International",
        phone: "+39 320 782 8216"
      },
      {
        country: "Relations Médias & Étudiants",
        flag: "🎥",
        name: "Ing. Karim Osman",
        role: "Attaché de Presse et Relations Académiques",
        phone: "+39 320 952 4754"
      }
    ]
  },
  de: {
    dir: 'ltr',
    logoText: "Islamische Universität Brüssel",
    subtitleText: "Europäische Zweigstelle (Westafrika)",
    navAbout: "Über uns",
    navPrograms: "Studienangebot",
    navPricing: "Gebühren & Rabatte",
    navRepresentatives: "Vertreter",
    navRegister: "Bewerbungsschritte",
    navContactUs: "Kontakt",
    heroBadge: "Aus dem Herzen Europas an alle herausragenden Denker und Forscher",
    heroTitle1: "Islamische Universität",
    heroTitleHighlight: "Öffnet ihre Türen für die Zukunft",
    heroDesc: "Schließen Sie sich einer führenden Universität an, die ein innovatives interaktives Online-Studium anbietet. Unser Programm ist optimal auf Ihre Lebenssituation abgestimmt und verbindet exzellente theologische Lehre mit Flexibilität.",
    heroCtaRegister: "Jetzt Zulassung beantragen",
    heroCtaReps: "Akkreditierte Vertreter",
    heroBadgeInteractiveTitle: "Interaktives Fernstudium",
    heroBadgeInteractiveDesc: "Etabliert seit 2018",
    aboutSectionHeader: "Warum die Islamische Universität Brüssel Ihre beste Wahl ist?",
    aboutSectionSub: "Wir verzahnen fundierte Lehrkompetenz mit exzellenten Webinaren, um die optimale Studienumgebung zu gewährleisten.",
    programsSectionHeader: "Verfügbares Studienangebot",
    programsSectionSub: "Wählen Sie aus sorgfältig konzipierten Studiengängen, die auf den Arbeitsmarkt und moderne Forschung vorbereiten.",
    programsColTableDesc: "Fakultät",
    programsColTableDegrees: "Abschlussstufen",
    programsColTableSpecialties: "Spezialisierungen",
    programsThesisTitle: "Disputationen vor Ort",
    programsThesisDesc: "Disputationen von Master- und Promotionsarbeiten können direkt im Heimatland des Studierenden erfolgen.",
    programsPathsTitle: "Drei Postgraduierten-Modelle",
    programsPathsDesc: "Ausschließliches Forschungsstudium, lehrplanbasiert oder kombiniert modular.",
    pricingSectionHeader: "Investition in Ihre akademische Laufbahn",
    pricingSectionSub: "Faire, transparente Studiengebühren mit Ermäßigungen für Koran-Auswendiglerner.",
    pricingUnit: "EUR",
    repsSectionBadge: "Zulassung & Beratung",
    repsSectionHeader: "Unsere akkreditierten internationalen Vertreter",
    repsSectionSub: "Kontaktieren Sie unsere Studienvertreter in Ihrem Land direkt, um Bewerbungen einzureichen und administrative Begleitung zu erhalten.",
    repsBtnCta: "Kontakt über WhatsApp",
    stepsSectionHeader: "Einfache Bewerbungsschritte",
    stepsSectionSub: "Bitte legen Sie folgende Unterlagen bereit, um den Prozess umgehend zu starten. Hinweis: Anerkennungen von Büchern und bereits veröffentlichten wissenschaftlichen Beiträgen sind für Master und PhD möglich.",
    step1Title: "Identitätsnachweis",
    step1Desc: "Eine gut lesbare Kopie des gültigen Reisepasses oder Personalausweises.",
    step2Title: "Vorbildungs-Nachweis",
    step2Desc: "Kopie des letzten Bildungsnachweises (Abitur/Hochschulreife, Bachelor oder Master).",
    step3Title: "Antrag & Passbild",
    step3Desc: "Ein aktuelles farbiges Passbild und das vollständig ausgefüllte Antragsformular.",
    directAdminHeader: "Regionale Studienleitung & direkte Kontakte",
    directorName: "Prof. Dr. Atef Abd El-Sattar Hammad",
    directorRole: "Regionaldirektor für Europa & internationale Fernzulassung",
    directorBadge: "Regionaldirektor",
    directorLocation: "Brüssel - Italien",
    directorStatus: "Jetzt Aktiv",
    adminChannelsSub: "Autorisierte administrative Kommunikationswege:",
    channelWa1: "Haupt-WhatsApp-Linie 1",
    channelWa2: "Haupt-WhatsApp-Linie 2",
    channelPhone: "Direkter Telefonsupport",
    channelEmail: "Autorisierte Universitäts-E-Mail",
    footerSlogan: "Wissenschaft, die Persönlichkeit formt, und eine Zukunft, die durch Wissen leuchtet (Zweigstelle Europa)",
    footerFbTitle: "Unsere offizielle Facebook-Seite",
    footerCopyright: "© 2026 Islamische Universität Brüssel - Zweigstelle Europa. Alle Rechte vorbehalten.",
    
    // New High-Tech Interactive Features
    searchPlaceholder: "Nach Ihrem Studiengang oder Ihrer Fachrichtung suchen...",
    allColleges: "Alle Fakultäten",
    exploreTitle: "Interaktiver Studiengangs-Finder",
    exploreSub: "Suchen und filtern Sie in unserem vielfältigen Studienangebot, um das passende Fach für Ihre Zukunft zu finden.",
    calculatorTitle: "Interaktiver Studiengebühren-Rechner",
    calculatorSub: "Berechnen Sie transparent Ihre Studiengebühren inklusive Ermäßigungen und optionalen Zusatzleistungen.",
    selectDegree: "Wählen Sie Ihren angestrebten Abschluss",
    isMemorizer: "Haben Sie den gesamten Heiligen Koran auswendig gelernt?",
    isMemorizerDesc: "Sichert Ihnen 20% Rabatt im Bachelor-Bereich und 10% Rabatt für Master und Promotion.",
    optionalShipping: "Physische Zusendung der beglaubigten Urkunden anfordern?",
    optionalShippingDesc: "Beinhaltet die Vorbereitung und den sicheren internationalen Expressversand Ihrer beglaubigten Originaldokumente (+150 EUR)",
    optionalTutor: "Einen persönlichen akademischen Betreuer anfordern?",
    optionalTutorDesc: "Premium-Service zur wöchentlichen Beratung und schnellen Betreuung durch einen fest zugewiesenen akademischen Tutor (+100 EUR)",
    calcResultTuition: "Grundlegende Studiengebühren des Programms:",
    calcResultDiscount: "Ihre anwendbare Ermäßigung:",
    calcResultExtras: "Gewählte optionale Zusatzleistungen:",
    calcResultTotal: "Netto-Studiengebühren für Ihre Investition:",
    calcSuccessCta: "Bewerbung mit diesem Angebot starten",
    eligibilityTitle: "Intelligenter Zulassungs-Assistent",
    eligibilitySub: "Prüfen Sie in nur wenigen Klicks spielerisch Ihre Eignung für eine sofortige Zulassung.",
    eligibilityDegreePrompt: "Was ist Ihr höchster erfolgreich abgeschlossener Bildungsgrad?",
    eligibilityOnlinePrompt: "Eignet sich das interaktive und flexible Online-Fernstudium für Ihre Lebenssituation?",
    eligibilitySuccessTitle: "Herzlichen Glückwunsch! Sie sind grundsätzlich zulassungsberechtigt",
    eligibilitySuccessDesc: "Unsere erste Eignungsprüfung bestätigt, dass Ihre akademische Vorbildung zu unserem Programm passt. Starten Sie direkt die Registrierung.",
    eligibilityCheckNow: "Zulassung jetzt prüfen",
    eligibilityReset: "Assistent zurücksetzen",
    virtualCampusTitle: "E-Campus & Lernmanagementsystem (LMS)",
    virtualCampusSub: "Entdecken Sie, wie unser modernes Portal die Nähe des Hörsaals mit digitaler Flexibilität vereint.",
    virtualCampusTab1: "Interaktive Live-Vorlesungen",
    virtualCampusTab1Desc: "Hochauflösende Live-Vorlesungen mit Professoren der Al-Azhar-Universität, bei Bedarf jederzeit als Aufnahme abrufbar.",
    virtualCampusTab2: "Umfassende digitale Bibliothek",
    virtualCampusTab2Desc: "Unbegrenzter Online-Zugriff auf Tausende rechtswissenschaftliche und islamisch-theologische Primärquellen und Fachartikel.",
    virtualCampusTab3: "Direkte wissenschaftliche Betreuung",
    virtualCampusTab3Desc: "Fachlicher Support durch zugewiesene Professoren bei der Strukturierung und Erstellung von Master- oder Promotionsarbeiten.",
    virtualCampusTab4: "Intelligentes Studierendenportal",
    virtualCampusTab4Desc: "Zentrales Dashboard zum schnellen Abrufen von Noten, Einreichen von Aufgaben und zur direkten Kommunikation mit Verwaltung und Fachschaft.",
    faqTitle: "Häufig gestellte akademische Fragen",
    faqSub: "Finden Sie alle wichtigen Informationen zu Anerkennungen, Disputationen vor Ort und Ermäßigungen.",
    faqQ1: "Sind die verliehenen Abschlüsse offiziell akkreditiert?",
    faqA1: "Ja, vollkommen. Die Diplome werden offiziell von der Hauptstelle der Universität in Brüssel (Belgien) ausgestellt und für die Zweigstelle Europa zertifiziert.",
    faqQ2: "Können bereits veröffentlichte Arbeiten für das Promotionsstudium angerechnet werden?",
    faqA2: "Ja. Speziell in der Zweigstelle Europa können hochwertige wissenschaftliche Fachbücher oder Veröffentlichungen als Äquivalente geprüft werden.",
    faqQ3: "Wo und wie finden die Disputationen der Master- oder Doktorarbeiten statt?",
    faqA3: "Um Reisekosten zu sparen, finden die Disputationen direkt im Heimatland des Studierenden vor einer autorisierten Kommission der Universität statt.",
    faqQ4: "Welche Vergünstigungen gibt es für Studierende?",
    faqA4: "Zu Ehren des Korans erhalten Auswendiglerner eine Ermäßigung von 20% im Bachelor-Bereich und 10% bei Master und Promotion.",
    programs: [
      {
        college: "Scharia (Islamisches Recht) und Rechtswissenschaft",
        degrees: "Lizentiat (Licence) - Master - Promotion",
        specialties: "Theologie, Islamische Scharia, Arabische Philologie, Islamische Ökonomie und Allgemeines Recht."
      },
      {
        college: "Erziehungswissenschaften und Didaktik",
        degrees: "Master - Promotion",
        specialties: "Curriculumsentwicklung und Lehrmethoden, Bildungsmanagement und Bildungsberatung."
      },
      {
        college: "Wirtschafts- & Verwaltungswissenschaften",
        degrees: "Bachelor - Master - Promotion",
        specialties: "Betriebswirtschaftslehre (BWL), Rechnungswesen und Controlling, Personalmanagement."
      }
    ],
    pricing: [
      {
        title: "Bachelor / Licence Studienphase",
        price: "1000",
        discount: "20% Ermäßigung für Koran-Auswendiglerner",
        features: ["Interaktives Online-Fernstudium", "Beglaubigter, staatlich registrierter Abschluss"],
        cta: "Jetzt einschreiben"
      },
      {
        title: "Master Studienphase",
        price: "1200",
        discount: "10% Ermäßigung für Koran-Auswendiglerner",
        features: ["Interaktives Online-Fernstudium", "Beglaubigter, staatlich registrierter Abschluss"],
        cta: "Jetzt einschreiben"
      },
      {
        title: "Doktoratsstufe (PhD / Promotion)",
        price: "1400",
        discount: "10% Ermäßigung für Koran-Auswendiglerner",
        features: ["Interaktives Online-Fernstudium", "Beglaubigter, staatlich registrierter Abschluss"],
        cta: "Jetzt einschreiben"
      }
    ],
    features: [
      {
        title: "Akademische Weltelite",
        desc: "Lernen Sie von erstklassigen Rechtsgelehrten und renommierten Professoren, vor allem von Koryphäen der Al-Azhar-Universität."
      },
      {
        title: "Absolute Flexibilität",
        desc: "Bewährtes digitales E-Learning-Szenario seit 2018, das bürokratische Hürden wie Visa und Einreisen elegant überwindet."
      },
      {
        title: "Interkultureller Austausch",
        desc: "Ein weltoffenes Universitätsklima mit Studierenden aus über zwanzig Nationen zur Förderung des Dialogs."
      },
      {
        title: "Forschungssupport",
        desc: "Internationale Publikationsplattformen und Symposien zur Veröffentlichung und Präsentation Ihrer Forschungsarbeiten."
      }
    ],
    representatives: [
      {
        country: "Türkei",
        flag: "🇹🇷",
        name: "Prof. Dr. Hussein Abdel Aal",
        role: "Internationaler akademischer Vertreter",
        phone: "+90 534 936 5045"
      },
      {
        country: "Saudi-Arabien",
        flag: "🇸🇦",
        name: "Sheikh Husam",
        role: "Internationaler akademischer Vertreter",
        phone: "+966 542 788 100"
      },
      {
        country: "Italien",
        flag: "🇮🇹",
        name: "Dr. Hisham Rifaai",
        role: "Internationaler akademischer Vertreter",
        phone: "+39 320 782 8216"
      },
      {
        country: "Medien- & Studierendenservice",
        flag: "🎥",
        name: "Ing. Karim Osman",
        role: "Pressesprecher und studentischer Koordinator",
        phone: "+39 320 952 4754"
      }
    ]
  }
};
