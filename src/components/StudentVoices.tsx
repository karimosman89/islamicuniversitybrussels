import { useState, useEffect } from 'react';
import { 
  Quote, 
  GraduationCap, 
  Search, 
  Sparkles, 
  Newspaper, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';

export interface StudentVoice {
  id: string;
  name: string;
  country: string;
  flag: string;
  program: string;
  quote: string;
  avatar: string;
  date: string;
  articleTitle: string;
  articleBody: string;
}

interface StudentVoicesProps {
  currentLang: string;
  isRtl: boolean;
}

// Robust fallback data matching translations in case the JSON fetch is blocked or delayed.
const FALLBACK_DATA: Record<string, StudentVoice[]> = {
  ar: [
    {
      id: "sv1",
      name: "أنس العتيبي",
      country: "المملكة العربية السعودية",
      flag: "🇸🇦",
      program: "ماجستير في الشريعة وأصول الفقه",
      quote: "لقد وفّرت لي الجامعة البيئة الأكاديمية المثالية التي تجمع بين الأصالة الشرعية والمرونة التكنولوجية. مكنني نظام التعليم عن بُعد من مواصلة دراستي بامتياز.",
      avatar: "AO",
      date: "خريج دفعة ٢٠٢٥",
      articleTitle: "التوازن المثالي بين التحصيل الشرعي والعمل اليومي",
      articleBody: "كطالب يعمل دواماً كاملاً، كنت أخشى القيود الإدارية الصارمة، لكن مرونة الجدول الأكاديمي والمتابعة المستمرة عبر فرع أوروبا أزالا كل العقبات. المحتوى التعليمي ثري ويمزج المعرفة الفقهية بالواقع المعاصر."
    },
    {
      id: "sv2",
      name: "يوسف كايا",
      country: "تركيا",
      flag: "🇹🇷",
      program: "بكالوريوس في الاقتصاد والمصرفية الإسلامية",
      quote: "المنهج الدراسي شامل ومُعد بمعايير علمية دقيقة. استطعت اكتساب مهارات حقيقية في المالية والمصرفية تتوافق مع المتطلبات المعاصرة.",
      avatar: "YK",
      date: "طالب بالسنة الثالثة",
      articleTitle: "لماذا اخترت تخصص الاقتصاد الإسلامي في بروكسل؟",
      articleBody: "إن فهم الاقتصاد الإسلامي يحتاج لمنهج متجدد. يربط أساتذة الجامعة المفاهيم الفقهية التاريخية بالأدوات الحديثة للتمويل الاستثماري، مما يؤهلني للمنافسة بقوة في الأسواق المالية المحلية والإقليمية."
    },
    {
      id: "sv3",
      name: "مريم رفاعي",
      country: "إيطاليا",
      flag: "🇮🇹",
      program: "دكتوراه في التربية الإسلامية والمناهج",
      quote: "كباحثة مقيمة في أوروبا، تم تسهيل جميع معاملاتي الأكاديمية والمناقشة المحلية لرسالتي من خلال الممثل المعتمد بإيطاليا والدعم الرائع.",
      avatar: "MR",
      date: "طالبة أطروحة الدكتوراه",
      articleTitle: "البحث التربوي الأكاديمي في البيئات الغربية",
      articleBody: "تركز أطروحتي على تطوير فلسفة التعليم الإسلامي للأجيال واليافعين في المجتمعات الغربية. حصلت على إشراف دقيق وتوجيه علمي متقدم ومصادر رقمية شاملة وفرت عليّ عناء السفر والدراسة التقليدية."
    }
  ],
  en: [
    {
      id: "sv1",
      name: "Anas Al-Otaibi",
      country: "Saudi Arabia",
      flag: "🇸🇦",
      program: "Master in Sharia & Fundamentals of Jurisprudence",
      quote: "The university provided me with the ideal academic environment that combines traditional Sharia roots with dynamic technological flexibility.",
      avatar: "AO",
      date: "Graduation Class of 2025",
      articleTitle: "Balancing Sharia Academic Studies with Busy Professional Work",
      articleBody: "As a full-time professional, I feared rigorous rigid schedules. However, Brussels Europe Branch offered unparalleled flexibility, modern learning portal access, and exceptional local coordinator support."
    },
    {
      id: "sv2",
      name: "Yousef Kaya",
      country: "Turkey",
      flag: "🇹🇷",
      program: "Bachelor in Islamic Economics & Banking",
      quote: "The curriculum is rigorous, up-to-date, and meticulously designed. I gained deep valuable skills in ethical finance and banking structures.",
      avatar: "YK",
      date: "Year 3 Student",
      articleTitle: "Why I Chose Islamic Economics at IUB Brussels",
      articleBody: "Islamic banking is blooming across European markets. The professors link core jurisprudence of contracts with contemporary fintech instruments, perfectly preparing us for modern financial roles."
    },
    {
      id: "sv3",
      name: "Maryam Rifaai",
      country: "Italy",
      flag: "🇮🇹",
      program: "PhD in Islamic Education & Curricula",
      quote: "As an educational researcher residing in Europe, conducting doctoral studies and defends locally with official Italian coordination was incredible.",
      avatar: "MR",
      date: "PhD Thesis Candidate",
      articleTitle: "Fostering Educational Research in Western Environments",
      articleBody: "My PhD focuses on Islamic identity pedagogy in western communities. The refined advising, wealth of online library books, and strict academic integrity benchmarks enabled me to thrive."
    }
  ],
  it: [
    {
      id: "sv1",
      name: "Anas Al-Otaibi",
      country: "Arabia Saudita",
      flag: "🇸🇦",
      program: "Master in Sharia e Giurisprudenza",
      quote: "L'università mi ha fornito l'ambiente accademico ideale che unisce radici tradizionali e flessibilità tecnologica dinamica.",
      avatar: "AO",
      date: "Classe di Laurea 2025",
      articleTitle: "Gestire dello Studio Accademico con gli Impegni di Lavoro Quotidiani",
      articleBody: "Come professionista a tempo pieno, temevo gli orari rigidi. IUB ha saputo offrire una flessibilità eccezionale, un'eccellente piattaforma e un supporto costante dei rappresentanti."
    },
    {
      id: "sv2",
      name: "Yousef Kaya",
      country: "Turchia",
      flag: "🇹🇷",
      program: "Laurea Triennale in Economia e Banche Islamiche",
      quote: "Il curriculum è completo e preparato con standard scientifici accurati. Ho acquisito reali capacità nella finanza etica strutturata.",
      avatar: "YK",
      date: "Studente del 3° Anno",
      articleTitle: "Perché ho scelto la facoltà di Economia Islamica a Bruxelles",
      articleBody: "Le banche islamiche ed etiche si stanno espandendo. I professori collegano i contratti di fikh storico con gli strumenti moderni, dotandoci di competenze cruciali per il mercato."
    },
    {
      id: "sv3",
      name: "Maryam Rifaai",
      country: "Italia",
      flag: "🇮🇹",
      program: "Dottorato in Educazione Islamica e Programmi",
      quote: "Come ricercatrice residente in Italia, il coordinamento delle pratiche e la discussione locale della tesi sono stati eccezionali.",
      avatar: "MR",
      date: "Candidata al Dottorato",
      articleTitle: "Promuovere la Ricerca Pedagogica nei Contesti Occidentali",
      articleBody: "La mia ricerca mira a sviluppare la pedagogia educativa per i giovani nelle società plurali. IUB mi ha affiancato con ottimi supervisori e risorse bibliografiche."
    }
  ],
  fr: [
    {
      id: "sv1",
      name: "Anas Al-Otaibi",
      country: "Arabie Saoudite",
      flag: "🇸🇦",
      program: "Master en Sharia & Fondements du Droit",
      quote: "L'université m'a fourni l'environnement académique idéal combinant racines traditionnelles et flexibilité technologique.",
      avatar: "AO",
      date: "Promotion 2025",
      articleTitle: "Concilier les Études Académiques avec l'Activité Professionnelle",
      articleBody: "Travaillant à temps plein, je craignais les contraintes. La flexibilité de notre plateforme européenne, le portail moderne et le soutien réactif de l'administration ont levé tous les doutes."
    },
    {
      id: "sv2",
      name: "Yousef Kaya",
      country: "Turquie",
      flag: "🇹🇷",
      program: "Licence en Économie et Finance Islamique",
      quote: "Le programme d'études est complet et rigoureux. J'ai acquis de réelles compétences en finance éthique conforme aux régulations contemporaines.",
      avatar: "YK",
      date: "Étudiant en 3e Année",
      articleTitle: "Pourquoi choisir la finance islamique à IUB Bruxelles",
      articleBody: "Le secteur bancaire éthique progresse rapidement. Les cours allient parfaitement les concepts juridiques de base avec les mathématiques financières modernes pour former de futurs leaders."
    },
    {
      id: "sv3",
      name: "Maryam Rifaai",
      country: "Italie",
      flag: "🇮🇹",
      program: "Doctorat en Didactique & Éducation Islamique",
      quote: "En tant que chercheuse résidant en Italie, toute la coordination administrative et la soutenance locale ont été extrêmement fluides.",
      avatar: "MR",
      date: "Doctorante en Thèse",
      articleTitle: "Développer la Recherche en Éducation dans un Contexte Occidental",
      articleBody: "Ma thèse explore les modèles de pédagogie auprès des jeunes musulmans en Europe. Le suivi minutieux, l'accès à la bibliothèque virtuelle et la rigueur académique m'ont permis d'aller au bout."
    }
  ],
  de: [
    {
      id: "sv1",
      name: "Anas Al-Otaibi",
      country: "Saudi-Arabien",
      flag: "🇸🇦",
      program: "Master in Scharia-Recht & Jurisprudenz",
      quote: "Die Universität bot mir ein erstklassiges akademisches Umfeld, das klassischen Scharia-Lehren mit flexibler Digitaltechnik vereint.",
      avatar: "AO",
      date: "Abschlussjahrgang 2025",
      articleTitle: "Berufstätigkeit und akademisches Studium im Einklang",
      articleBody: "Als Vollzeit-Berufstätiger hatte ich Angst vor starren Fristen. Doch das flexible Online-Portal der Europa-Zweigstelle und die Betreuung über WhatsApp machten alles erstaunlich einfach."
    },
    {
      id: "sv2",
      name: "Yousef Kaya",
      country: "Türkei",
      flag: "🇹🇷",
      program: "Bachelor in Islamischer Ökonomie & Banken",
      quote: "Das Curriculum ist anspruchsvoll und präzise aufgebaut. Ich konnte wertvolle Kenntnisse im ethischen Finanzwesen erwerben.",
      avatar: "YK",
      date: "Student im 3. Jahr",
      articleTitle: "Faszination islamisches Finanzwesen in Brüssel studieren",
      articleBody: "Die Nachfrage nach zinslosen ethischen Geldanlagen wächst auch in Europa. Die Professoren verknüpfen historische Rechtstheoreme mit Fintech-Strukturen von heute."
    },
    {
      id: "sv3",
      name: "Maryam Rifaai",
      country: "Italien",
      flag: "🇮🇹",
      program: "Promotion in Islamischer Pädagogik & Lehrplänen",
      quote: "Als Doktorandin in Italien war die Betreuung und lokale Verteidigung dank unseres Koordinators erstklassig organisiert.",
      avatar: "MR",
      date: "Doktorandin (Dissertation)",
      articleTitle: "Pädagogische Forschung im westlichen Kontext voranbringen",
      articleBody: "Meine Dissertation untersucht neue Ansätze zur Wertebildung in multikulturellen Gesellschaften. Die Online-Bibliothek und das persönliche Mentoring waren absolut entscheidend für meinen Erfolg."
    }
  ]
};

const LABELS: Record<string, {
  sectionTitle: string;
  sectionSubtitle: string;
  badge: string;
  searchPlaceholder: string;
  graduatingAs: string;
  readJournal: string;
  featuredArticle: string;
  writeToStudent: string;
  academicExperience: string;
  noResults: string;
  loading: string;
}> = {
  ar: {
    sectionTitle: "أصوات الطلاب وطموحاتهم",
    sectionSubtitle: "اكتشف بيئة وثقافة الجامعة الإسلامية بروكسل من خلال قصص حقيقية ودراسات لطلابنا الإقليميين بفرع أوروبا.",
    badge: "منبر أصوات طلابنا المتميزين",
    searchPlaceholder: "ابحث بالاسم، التخصص، أو بلد الطالب...",
    graduatingAs: "تاريخ المقيد:",
    readJournal: "اقرأ مذكرات الطالب العلمية",
    featuredArticle: "المقال المتميز للباحث",
    writeToStudent: "بوابة الطالب الأكاديمية",
    academicExperience: "الشهادة والتجربة الأكاديمية",
    noResults: "لم يتم العثور على أي تجارب مطابقة للبحث الحالي.",
    loading: "جاري تحميل تفاصيل التجارب والطلاب..."
  },
  en: {
    sectionTitle: "Student Voices & Legacies",
    sectionSubtitle: "Get a vibrant sense of our academic culture at Islamic University Brussels through real success stories and insights from active regional scholars.",
    badge: "STUDENT VOICES PORTAL",
    searchPlaceholder: "Search by name, major, or home country...",
    graduatingAs: "Enrollment status:",
    readJournal: "Read Academic Essay",
    featuredArticle: "Featured Scholarly Article",
    writeToStudent: "Academic Student Portal",
    academicExperience: "Academic Experience & Impact",
    noResults: "No student chronicles matched your search parameters.",
    loading: "Fetching regional student testimonials..."
  },
  it: {
    sectionTitle: "Voci e Testimonianze degli Studenti",
    sectionSubtitle: "Scopri la cultura accademica della nostra Università Islamica di Bruxelles attraverso storie reali ed approfondimenti dei nostri studenti in Europa.",
    badge: "PORTALE DELLE VOCI",
    searchPlaceholder: "Cerca per nome, corso o paese...",
    graduatingAs: "Stato iscrizione:",
    readJournal: "Leggi Articolo Accademico",
    featuredArticle: "Articolo Principale del Ricercatore",
    writeToStudent: "Portale Accademico dello Studente",
    academicExperience: "Esperienza e Impatto Accademico",
    noResults: "Nessuna testimonianza corrisponde alla ricerca.",
    loading: "Caricamento delle voci degli studenti..."
  },
  fr: {
    sectionTitle: "Voix des Étudiants & Témoignages",
    sectionSubtitle: "Découvrez la culture académique de l’Université Islamique de Bruxelles à travers des histoires vécues et des articles rédigés par nos étudiants en Europe.",
    badge: "CHRONIQUES DES ÉTUDIANTS",
    searchPlaceholder: "Rechercher par nom, filière ou pays originel...",
    graduatingAs: "Statut d’inscription:",
    readJournal: "Lire l’Essai Académique",
    featuredArticle: "Article Vedette du Chercheur",
    writeToStudent: "Portail Académique de l'Étudiant",
    academicExperience: "Impression et Expérience Académique",
    noResults: "Aucun témoignage ne correspond à vos critères de recherche.",
    loading: "Chargement des témoignages régionaux..."
  },
  de: {
    sectionTitle: "Stimmen unserer Studierenden",
    sectionSubtitle: "Gewinnen Sie einen lebendigen Eindruck von der Atmosphäre der Islamischen Universität Brüssel durch authentische Erfahrungsberichte unserer Studierenden in Europa.",
    badge: "STUDENTISCHE CHRONIKEN",
    searchPlaceholder: "Suche nach Name, Studienfach oder Heimatland...",
    graduatingAs: "Einschreibungsstatus:",
    readJournal: "Wissenschaftlichen Artikel lesen",
    featuredArticle: "Hervorgehobener studentischer Artikel",
    writeToStudent: "Akademisches Studierendenportal",
    academicExperience: "Akademische Erfahrung & Mehrwert",
    noResults: "Keine studentischen Berichte entsprechen Ihrer Suchanfrage.",
    loading: "Lade Erfahrungsberichte der Studierenden..."
  }
};

export default function StudentVoices({ currentLang, isRtl }: StudentVoicesProps) {
  const [voices, setVoices] = useState<StudentVoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const langKey = FALLBACK_DATA[currentLang] ? currentLang : 'ar';
  const labels = LABELS[langKey] || LABELS.ar;

  useEffect(() => {
    // Attempt real live fetching of student_voices.json with clean fallback logic
    setIsLoading(true);
    fetch('/data/student_voices.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not fetch data');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data[langKey]) {
          setVoices(data[langKey]);
          const firstItem = data[langKey][0];
          if (firstItem) setSelectedVoiceId(firstItem.id);
          setIsFetched(true);
        } else {
          // Fall back gracefully
          const fallback = FALLBACK_DATA[langKey] || FALLBACK_DATA.ar;
          setVoices(fallback);
          if (fallback[0]) setSelectedVoiceId(fallback[0].id);
        }
      })
      .catch(() => {
        // Safe offline fallback execution
        const fallback = FALLBACK_DATA[langKey] || FALLBACK_DATA.ar;
        setVoices(fallback);
        if (fallback[0]) setSelectedVoiceId(fallback[0].id);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [langKey]);

  // Handle case where selection goes stale due to language switch
  useEffect(() => {
    if (voices.length > 0) {
      const match = voices.find(v => v.id === selectedVoiceId);
      if (!match && voices[0]) {
        setSelectedVoiceId(voices[0].id);
      }
    }
  }, [voices, selectedVoiceId]);

  // Filter logic
  const filteredVoices = voices.filter(voice => {
    const q = searchQuery.toLowerCase();
    return (
      voice.name.toLowerCase().includes(q) ||
      voice.program.toLowerCase().includes(q) ||
      voice.country.toLowerCase().includes(q)
    );
  });

  const activeVoice = voices.find(v => v.id === selectedVoiceId) || voices[0];

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexDir = isRtl ? 'flex-row-reverse' : 'flex-row';

  return (
    <section id="student-voices" className="py-24 bg-white border-t border-b border-gray-100 relative overflow-hidden">
      {/* Decorative fluid elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl -z-10 opacity-65"></div>
      <div className="absolute -bottom-12 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{labels.badge}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4 tracking-tight">
            {labels.sectionTitle}
          </h2>
          <p className="text-gray-550 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold">
            {labels.sectionSubtitle}
          </p>
        </div>

        {/* Interactive Search Tool Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
              <Search className="h-4.5 w-4.5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className={`w-full py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-xs text-gray-800 placeholder-gray-400 bg-slate-50 border border-gray-250 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-505 focus:border-amber-500 font-semibold transition-all shadow-inner`}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs text-gray-450 font-bold">{labels.loading}</p>
          </div>
        ) : filteredVoices.length === 0 ? (
          <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-gray-150">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-gray-500 font-bold">{labels.noResults}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Hand: Student List Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3.5 overflow-y-auto pr-1 max-h-[520px]">
                {filteredVoices.map((voice) => {
                  const isSelected = selectedVoiceId === voice.id;
                  return (
                    <button
                      key={voice.id}
                      type="button"
                      onClick={() => setSelectedVoiceId(voice.id)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-right transition-all duration-300 text-left cursor-pointer flex items-start gap-4 ${isSelected ? 'bg-amber-50/40 border-amber-300 shadow-md shadow-amber-500/5 scale-[1.01]' : 'bg-slate-50/40 hover:bg-slate-50 border-gray-150 hover:border-gray-300'}`}
                    >
                      {/* Initials avatar bubble */}
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm tracking-wide shadow-sm font-mono select-none ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-gray-700'}`}>
                        {voice.avatar}
                      </div>

                      {/* Summary Credentials */}
                      <div className="flex-grow min-w-0">
                        <div className={`flex items-center justify-between gap-2 ${flexDir}`}>
                          <p className="text-xs sm:text-sm font-black text-gray-900 truncate">
                            {voice.name}
                          </p>
                          <span className="text-base filter drop-shadow-sm flex-shrink-0" role="img" aria-label={voice.country}>
                            {voice.flag}
                          </span>
                        </div>
                        
                        <p className={`text-[10px] sm:text-xs font-bold text-gray-500 truncate mt-1 ${textAlignment}`}>
                          {voice.program}
                        </p>

                        <div className={`flex items-center gap-1.5 text-[10px] text-gray-400 mt-2 ${flexDir}`}>
                          <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span className="font-extrabold block truncate">{voice.country}</span>
                        </div>
                      </div>

                      {/* Direction indicator */}
                      <div className="flex-shrink-0 self-center">
                        {isRtl ? (
                          <ChevronLeft className={`w-5 h-5 transition-transform ${isSelected ? 'text-amber-600 scale-110 translate-x-1' : 'text-gray-350'}`} />
                        ) : (
                          <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-amber-600 scale-110 translate-x-1' : 'text-gray-350'}`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Hand: Active Student Detailed Essay Journal Column */}
            <div className="lg:col-span-7">
              {activeVoice && (
                <div className="h-full bg-slate-50/40 hover:bg-slate-50/70 border border-gray-155 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm relative flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative golden paper style line */}
                  <div className="absolute top-0 inset-x-0 h-1.5 w-full bg-amber-500"></div>
                  
                  <div>
                    {/* Header: Student Profile Details */}
                    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-150 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                      <div className={textAlignment}>
                        <div className={`flex items-center gap-1.5 mb-1 ${flexDir}`}>
                          <span className="text-xl filter drop-shadow select-none">{activeVoice.flag}</span>
                          <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider bg-amber-100/60 px-2.5 py-1 rounded-full border border-amber-200/30">
                            {activeVoice.program}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900">
                          {activeVoice.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-extrabold mt-0.5">
                          {labels.graduatingAs} <span className="text-blue-600 font-black">{activeVoice.date}</span>
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-200/50 flex-shrink-0 self-start sm:self-center">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Quotation Area */}
                    <div className="py-6 relative">
                      <Quote className={`absolute top-4 ${isRtl ? 'left-2' : 'right-2'} w-14 h-14 text-amber-500/10 rotate-180 pointer-events-none`} />
                      <p className={`text-xs sm:text-sm text-gray-700 font-bold leading-relaxed relative ${textAlignment}`} style={{ fontStyle: 'italic' }}>
                        "{activeVoice.quote}"
                      </p>
                    </div>

                    {/* Featured Article Sub-Journal */}
                    <div className={`p-5 bg-white border border-gray-150 rounded-2xl relative mt-3 ${textAlignment}`}>
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase text-amber-600 tracking-wider mb-2.5 ${flexDir}`}>
                        <Newspaper className="w-4.5 h-4.5" />
                        <span>{labels.featuredArticle}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-snug tracking-tight mb-2">
                        {activeVoice.articleTitle}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-550 leading-relaxed font-semibold">
                        {activeVoice.articleBody}
                      </p>
                    </div>

                  </div>

                  {/* Call to Register anchor */}
                  <div className="mt-8 pt-5 border-t border-gray-150">
                    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                      <div className={textAlignment}>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase">
                          {labels.writeToStudent}
                        </p>
                        <p className="text-[11px] text-gray-550 font-bold mt-0.5">
                          {labels.academicExperience}
                        </p>
                      </div>

                      <a
                        href="#register"
                        className="py-3 px-5 bg-gray-900 hover:bg-gray-950 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-gray-900/10 transition-all select-none"
                      >
                        <span>{currentLang === 'ar' ? 'ابدأ رحلتك الأكاديمية الآن' : 'Start Your Academic Journey'}</span>
                        {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </a>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
