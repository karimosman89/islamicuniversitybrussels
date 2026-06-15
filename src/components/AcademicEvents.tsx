import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Video, 
  BookOpen, 
  TicketCheck, 
  Share2, 
  ChevronRight, 
  Sparkles,
  Search,
  CheckCircle,
  Bell
} from "lucide-react";

interface AcademicEvent {
  id: string;
  type: "webinar" | "defense" | "workshop";
  title: Record<string, string>;
  presenter: Record<string, string>;
  date: string;
  time: string;
  countdownTarget: string; // ISO string or specific future target
  gmt: string;
  audience: Record<string, string>;
  desc: Record<string, string>;
}

const EVENTS_DATA: AcademicEvent[] = [
  {
    id: "evt-12",
    type: "webinar",
    title: {
      ar: "ندوة مفتوحة: فقه المعاملات المالية الحديثة وضوابطها",
      en: "Contemporary Islamic Banking & Finance Sharia Standard",
      it: "Finanza Islamica Contemporanea e Standard Sharia",
      fr: "Banque & Finance Islamiques Contemporaines et Normes Sharia"
    },
    presenter: {
      ar: "أ. د. أحمد فؤاد (كلية الشريعة والقانون)",
      en: "Prof. Dr. Ahmed Fouad (College of Sharia and Law)",
      it: "Prof. Dr. Ahmed Fouad (Facoltà di Sharia)",
      fr: "Prof. Dr. Ahmed Fouad (Faculté de Sharia)"
    },
    date: "2026-06-22",
    time: "18:00",
    gmt: "GMT+2 (Brussels)",
    countdownTarget: "2026-06-22T18:00:00",
    audience: {
      ar: "مفتوح للعموم بطلب حجز",
      en: "Public - Open Enrollment",
      it: "Pubblico - Iscrizione Aperta",
      fr: "Public - Inscription Ouverte"
    },
    desc: {
      ar: "تحليل معمق للتحديات الفقهية المعاصرة في العقود التجارية الرقمية والحلول المصرفية الإسلامية بالغرب.",
      en: "A deep dive examining Sharia rulings on blockchain contracts, and Western Islamic mortgage alternatives.",
      it: "Analisi approfondita sulle sentenze della Sharia relative ai contratti blockchain e mutui islamici.",
      fr: "Analyse approfondie de la Sharia sur les contrats blockchain et les alternatives de crédit."
    }
  },
  {
    id: "evt-13",
    type: "defense",
    title: {
      ar: "مناقشة علنية لرسالة دكتوراه: منهج الائتمان التعاوني الإسلامي في تمويل المشاريع الصغيرة ببلجيكا",
      en: "PhD Thesis Defense: Islamic Cooperative Credit models for Belgian Startups",
      it: "Discussione Tesi PhD: Modelli di Credito Cooperativo Islamico",
      fr: "Soutenance de Thèse PhD : Modèles de Crédit Coopératif Islamique"
    },
    presenter: {
      ar: "الباحث الأكاديمي: يوسف الوناسي",
      en: "PhD Candidate: Youssef Al-Ouanassi",
      it: "Candidato PhD: Youssef Al-Ouanassi",
      fr: "Doctorant : Youssef Al-Ouanassi"
    },
    date: "2026-06-28",
    time: "14:00",
    gmt: "GMT+2 (Brussels)",
    countdownTarget: "2026-06-28T14:00:00",
    audience: {
      ar: "طلاب الدراسات العليا والأكاديميين",
      en: "Academics & Graduate Students Only",
      it: "Solo Accademici e Studenti Master/PhD",
      fr: "Réservé aux Académiques et Doctorants"
    },
    desc: {
      ar: "دراسة ميدانية لمقترح الائتمان المصغر التعاوني المترابط مع شروط تيسير المشاريع والمسؤولية التضامنية.",
      en: "Field research on micro-credit blueprints offering compliant venture debt options for local business owners.",
      it: "Ricerca sul campo su modelli di microcredito per soluzioni commerciali regionali conformi.",
      fr: "Recherche sur le micro-crédit conforme pour le développement local."
    }
  },
  {
    id: "evt-14",
    type: "workshop",
    title: {
      ar: "ورشة منهجية البحث العلمي وصياغة الفصول التمهيدية",
      en: "Academic Writing Masterclass & Doctoral Methodology",
      it: "Masterclass di Scrittura Accademica e Metodologia",
      fr: "Masterclass d'Écriture Académique et Méthodologie"
    },
    presenter: {
      ar: "د. هشام رفاعي (مشرف البحوث الإقليمي)",
      en: "Dr. Hisham Rifaai (Regional Postgraduate Supervisor)",
      it: "Dr. Hisham Rifaai (Supervisore Post-Laurea)",
      fr: "Dr. Hisham Rifaai (Superviseur de Recherche)"
    },
    date: "2026-07-05",
    time: "11:00",
    gmt: "GMT+2 (Brussels)",
    countdownTarget: "2026-07-05T11:00:00",
    audience: {
      ar: "مسجلو الماجستير والدكتوراه الجدد",
      en: "Newly Enrolled Masters & PhD Students",
      it: "Nuovi Iscritti ai corsi Master e Dottorato",
      fr: "Nouveaux Étudiants en Master & PhD"
    },
    desc: {
      ar: "تدريب عملي على صياغة الفرضيات، استخدام حواشي التوثيق المعتمدة، وتصفية المراجع من المكتبات الرقمية.",
      en: "Hands-on drafting covering citation indexing, referencing standards, and scientific thesis structures.",
      it: "Guida pratica alla stesura di tesi, metodi di citazione accademica e standard di bibliografia.",
      fr: "Conseils pratiques pour la rédaction de thèse, normes de citation et de bibliographie."
    }
  }
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    badge: "الملتقيات والفعاليات والأطروحات المباشرة",
    heading: "بوابة الفعاليات الأكاديمية والندوات",
    subtitle: "شاهد البث المباشر المفتوح، شارك في ورش العمل، أو احجز مقعدك الافتراضي لحضور مناقشات الرسائل العلمية العامة بفرع أوروبا.",
    webinar: "ندوة افتراضية مباشرة",
    defense: "مناقشة دكتوراه علنية",
    workshop: "ورشة عمل منهجية",
    timeRemainingHeading: "تبدأ في غضون:",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    reserveTicket: "احجز تذكرة دخول رقمية مجاناً",
    reservedCheck: "تم حجر التذكرة بنجاح",
    attendeeRequirement: "شريحة الحضور:",
    liveStream: "رابط البث والمنصة",
    liveUrl: "منصة التيمز / الزوم الأكاديمي الموحدة",
    congratulationTitle: "رائع! تم تسجيل مقعدك بنجاح",
    congratulationDesc: "لقد أرسلنا بروتوكول الدخول وكلمة المرور لبريدك الإلكتروني، ورابط بث القاعة التفاعلية قبل موعد الفعالية بـ ٣٠ دقيقة."
  },
  en: {
    badge: "LIVE ACADEMIC EVENTS & DEFENSES",
    heading: "Academic Events Hub & Defense Calendars",
    subtitle: "Attend live expert seminars, watch candidate PhD defenses, or reserve slot tickets for postgraduate research methodology seminars.",
    webinar: "Live Remote Webinar",
    defense: "PhD Thesis Defense",
    workshop: "Research Workshop",
    timeRemainingHeading: "Starts In:",
    days: "d",
    hours: "h",
    minutes: "m",
    seconds: "s",
    reserveTicket: "Obtain Free Digital Slot Ticket",
    reservedCheck: "Seat Secured Successfully",
    attendeeRequirement: "Target Audience:",
    liveStream: "Interactive Platform",
    liveUrl: "Teams/Zoom Shared Broadcast Hub",
    congratulationTitle: "Verification Success!",
    congratulationDesc: "We forwarded your virtual invite protocol rules and credential keys to your student mailbox."
  },
  it: {
    badge: "EVENTI ACCADEMICI & DISCUSSIONI LIVE",
    heading: "Calendario degli Eventi & Tesi di Dottorato",
    subtitle: "Partecipa a seminari live, assisti alle discussioni di tesi PhD, o iscriviti a workshop metodologici d'avanguardia sul web.",
    webinar: "Webinar Online Live",
    defense: "Discussione di Tesi PhD",
    workshop: "Workshop Pratico",
    timeRemainingHeading: "Inizia Tra:",
    days: "giorni",
    hours: "ore",
    minutes: "min",
    seconds: "sec",
    reserveTicket: "Richiedi Biglietto Digitale Gratis",
    reservedCheck: "Posto Riservato Con Successo",
    attendeeRequirement: "Destinatari:",
    liveStream: "Piattaforma Aula",
    liveUrl: "Canale Accademico Microsoft Teams",
    congratulationTitle: "Registrazione Confermata",
    congratulationDesc: "Abbiamo inviato le regole di accesso all'aula e il link di invito alla tua e-mail 30 minuti prima dell'evento."
  },
  fr: {
    badge: "COLLOQUES & SOUTENANCES EN DIRECT",
    heading: "Agenda Académique & Soutenances de Thèse",
    subtitle: "Assistez aux visioconférences en direct, écoutez les défenses publiques de Doctorat, ou inscrivez-vous aux formations méthodologiques.",
    webinar: "Webinaire en Direct",
    defense: "Soutenance de Doctorat",
    workshop: "Atelier Méthodologique",
    timeRemainingHeading: "Commence Dans :",
    days: "j",
    hours: "h",
    minutes: "m",
    seconds: "s",
    reserveTicket: "Réserver un Billet Virtuel Gratuit",
    reservedCheck: "Place Réservée avec Succès",
    attendeeRequirement: "Audience Cible :",
    liveStream: "Plateforme Direct",
    liveUrl: "Lien Sécurisé Microsoft Teams/Zoom",
    congratulationTitle: "Inscription Réussie",
    congratulationDesc: "Les codes d'invitation et directives de connexion ont été envoyés à votre boîte académique."
  }
};

export const AcademicEvents: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS["en"];

  const [activeTab, setActiveTab] = useState<string>("all");
  const [reservedEventId, setReservedEventId] = useState<string | null>(null);
  const [timeLefts, setTimeLefts] = useState<Record<string, string>>({});

  // Calculation of countdown
  useEffect(() => {
    const calculateAllCountdowns = () => {
      const updatedLefts: Record<string, string> = {};
      
      EVENTS_DATA.forEach((event) => {
        const targetDate = new Date(event.countdownTarget).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
          updatedLefts[event.id] = `00${t.days} 00${t.hours} 00${t.minutes}`;
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          if (currentLang === 'ar') {
            updatedLefts[event.id] = `${days} يوم، ${hours} س، ${minutes} د`;
          } else {
            updatedLefts[event.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          }
        }
      });
      setTimeLefts(updatedLefts);
    };

    calculateAllCountdowns();
    const interval = setInterval(calculateAllCountdowns, 1000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const filteredEvents = activeTab === "all" 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(evt => evt.type === activeTab);

  const requestInvite = (id: string) => {
    setReservedEventId(id);
  };

  const currentThemeStyles = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/45";
      case "defense":
        return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/45";
      case "workshop":
        return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/45";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-b border-gray-100 relative">
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header summary */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-emerald-500/15">
            <Bell className="w-3.5 h-3.5 animate-swing" />
            {t.badge}
          </span>
          <h2 className="text-3.5xl sm:text-4.5xl font-black text-gray-900 tracking-tight">
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.subtitle}
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {["all", "webinar", "defense", "workshop"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border cursor-pointer ${
                activeTab === tab 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105" 
                  : "bg-white hover:bg-gray-100 text-gray-650 border-gray-250"
              }`}
            >
              {tab === "all" ? (currentLang === "ar" ? "كل الفعاليات" : "All Fairs") : t[tab as keyof typeof t]}
            </button>
          ))}
        </div>

        {/* Main List */}
        <div className="grid grid-cols-1 gap-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {filteredEvents.map((evt) => (
            <div 
              key={evt.id}
              className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
            >
              {/* Event Meta Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${currentThemeStyles(evt.type)}`}>
                    {t[evt.type] || evt.type}
                  </span>
                  
                  <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{evt.date}</span>
                  </span>

                  <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{evt.time} {evt.gmt}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                    {evt.title[currentLang] || evt.title["en"]}
                  </h3>
                  <p className="text-emerald-700 text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>{evt.presenter[currentLang] || evt.presenter["en"]}</span>
                  </p>
                </div>

                <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
                  {evt.desc[currentLang] || evt.desc["en"]}
                </p>

                {/* Additional badge */}
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                  <span>{t.attendeeRequirement}</span>
                  <span className="text-gray-600 bg-gray-50 border border-gray-150 px-2 py-0.5 rounded-lg text-[11px]">
                    {evt.audience[currentLang] || evt.audience["en"]}
                  </span>
                </div>
              </div>

              {/* Countdown Ticker & Action Button */}
              <div className="lg:border-l lg:border-dashed lg:border-gray-200 pl-0 lg:pl-8 flex flex-col justify-center items-stretch sm:items-start lg:items-center gap-4 w-full lg:w-72">
                <div className="bg-slate-900/95 text-white/90 p-4 rounded-2xl border border-slate-800 text-center w-full">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                    {t.timeRemainingHeading}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-black text-emerald-400 tracking-wide">
                    {timeLefts[evt.id] || "Calculating..."}
                  </span>
                </div>

                <div className="space-y-2.5 w-full">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 justify-center">
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                    <span className="underline decoration-blue-500/20 font-semibold">{t.liveUrl}</span>
                  </div>

                  <button
                    onClick={() => requestInvite(evt.id)}
                    className="w-full text-center bg-emerald-600 text-white hover:bg-emerald-700 font-black text-xs py-3 px-4.5 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] select-none"
                  >
                    {t.reserveTicket}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal feedback container */}
        <AnimatePresence>
          {reservedEventId && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 max-w-md w-full relative space-y-4 shadow-2xl text-center"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-200">
                  <TicketCheck className="w-8 h-8 font-light" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
                    {t.congratulationTitle}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                    {t.congratulationDesc}
                  </p>
                </div>

                <div className="border border-dashed border-gray-200 p-4 rounded-2xl bg-gray-50 text-start space-y-1.5 text-xs font-semibold font-sans">
                  <div className="flex justify-between">
                    <span className="text-gray-400">TICKET-ID</span>
                    <span className="text-gray-900 font-mono tracking-widest text-emerald-600">IUB-EU-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">STATUS</span>
                    <span className="text-emerald-600">APPROVED ONLINE</span>
                  </div>
                </div>

                <button
                  onClick={() => setReservedEventId(null)}
                  className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl hover:bg-slate-800 transition cursor-pointer"
                >
                  {currentLang === 'ar' ? 'إغلاق وعودة' : 'Dismiss Ticket Window'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
