import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Library, 
  Search, 
  BookOpen, 
  BookMarked, 
  Download, 
  CheckCircle, 
  Sparkles, 
  Bookmark, 
  Lock, 
  Compass, 
  ArrowUpRight,
  FileCheck2,
  FileText
} from "lucide-react";

interface Book {
  id: string;
  category: "manuscripts" | "fiqh" | "theses" | "language";
  title: Record<string, string>;
  author: Record<string, string>;
  year: string;
  pages: number;
  tags: string[];
  excerpt: Record<string, string>;
  isLocked: boolean; // locked for public guests, unlocked for enrolled/admitted students
}

const BOOKS_DATA: Book[] = [
  {
    id: "lib-bk-01",
    category: "manuscripts",
    title: {
      ar: "منوّعة مخطوطات مصاحف الأندلس النادرة (رقمية)",
      en: "Rare Andalusian Quranic Codices & Transcripts",
      it: "Codici Coranici Andalusi Rari (Archivio)",
      fr: "Manuscrits Coraniques Rares d'Andalousie (Numérique)"
    },
    author: {
      ar: "معهد المخطوطات الأثرية في بروكسل",
      en: "Archaeological Manuscripts Institute of Brussels",
      it: "Istituto dei Manoscritti Antichi di Bruxelles",
      fr: "Institut des Manuscrits Anciens de Bruxelles"
    },
    year: "1140 AD (Approx)",
    pages: 420,
    tags: ["Manuscripts", "History", "Andalus"],
    excerpt: {
      ar: "دراسة مرئية بالمسح الليزري المتناهي لقرابة ٣٤ مصحفاً أندلسياً منسقاً بمساق كوفي مغربي عتيق.",
      en: "High-definition, laser-scanned digital codex of Andalusian scripts featuring beautiful Maghrebi-Kufic structures.",
      it: "Codice digitale ad alta definizione di manoscritti andalusi con eleganti calligrafie maghrebine.",
      fr: "Codex numérique haute définition de manuscrits andalous présentant des styles maghrébins-koufiques."
    },
    isLocked: false
  },
  {
    id: "lib-bk-02",
    category: "fiqh",
    title: {
      ar: "فقه النوازل الفقهية المعاصرة للمسلمين المغتربين",
      en: "Jurisprudence of Contemporary Islamic Issues in the West",
      it: "Giurisprudenza Islamica della Minoranze Occidentali",
      fr: "Jurisprudence Contemporaine des Minorités Musulmanes"
    },
    author: {
      ar: "أ. د. عاطف عبد الستار حماد",
      en: "Prof. Dr. Atef Abd El-Sattar Hammad",
      it: "Prof. Dr. Atef Abd El-Sattar Hammad",
      fr: "Prof. Dr. Atef Abd El-Sattar Hammad"
    },
    year: "2024",
    pages: 310,
    tags: ["Fiqh", "Europe", "Contemporary"],
    excerpt: {
      ar: "كتاب أساسي يدرس فقه المواطنة والمعاملات والأقليات مع رصد لوائح الأوقاف والمعاملات المنهجية القانونية والأسئلة الحديثة.",
      en: "An essential university reference guide investigating civil citizenship, family codices, and compliance formulas in Europe.",
      it: "Una guida accademica che analizza cittadinanza civile, contratti e coesistenza in contesti europei.",
      fr: "Un guide universitaire analysant la citoyenneté, le droit familial et la conformité en contexte européen."
    },
    isLocked: false
  },
  {
    id: "lib-bk-03",
    category: "theses",
    title: {
      ar: "أطروحة دكتوراه: مقترح الأوقاف الإسلامية تحت ظل القضاء البلجيكي",
      en: "PhD Thesis: Islamic Endowments (Waqf) under Belgian Law Frameworks",
      it: "Tesi PhD: Istituzione Waqf e Strutture Legali del Belgio",
      fr: "Thèse PhD : Dotations Islamiques (Waqf) sous le Cadre Légal Belge"
    },
    author: {
      ar: "د. ياسمين بلقاسم (منشورة كأطروحة ممتازة)",
      en: "Dr. Yasmine Belkacem (Published Outstanding Thesis)",
      it: "Dr. Yasmine Belkacem (Tesi Pluripremiata)",
      fr: "Dr. Yasmine Belkacem (Thèse d'Excellence Publiée)"
    },
    year: "2023",
    pages: 580,
    tags: ["PhD Thesis", "Waqf", "Belgian Law"],
    excerpt: {
      ar: "أطروحة مرجعية تبحث سبل ملائمة أنظمة الأوقاف لتتوافق مع اللوائح المالية والادعاءات العقارية للدول الأوروبية.",
      en: "A comprehensive analysis adapting traditional endowment mechanisms to mesh with European property codes.",
      it: "Analisi di diritto comparato per integrare i modelli tradizionali di Waqf nei codici immobiliari europei.",
      fr: "Analyse de droit comparé pour adapter les structures traditionnelles de Waqf aux lois belges."
    },
    isLocked: true
  },
  {
    id: "lib-bk-04",
    category: "language",
    title: {
      ar: "دراسات بلاغية في إعجاز التعبير القرآني والأسلوب اللغوي",
      en: "Rhetorical Studies in Quranic Eloquence and Stylistics",
      it: "Studi sulla Straordinaria Retorica Coranica e Linguistica",
      fr: "Études de Rhétorique sur l'Éloquence et le Style Coranique"
    },
    author: {
      ar: "نخبة متبحري قسم الفنون واللغة العربية",
      en: "Scholastic Experts of Arabic Language Department",
      it: "Esperti del Dipartimento di Lingua Araba",
      fr: "Département de Langue et Littérature Arabes"
    },
    year: "2022",
    pages: 290,
    tags: ["Language", "Eloquence", "Quranic Style"],
    excerpt: {
      ar: "تفنيد بديع ودراسة موجزة للاستعارة والمجاز ومجمل اللمحات الدلالية التي تجذب عقول الباحثين المعاصرين.",
      en: "Analyzing narrative structures, stylistic syntaxes, and structural aesthetics within the Quran.",
      it: "Analisi della sintassi, figure retoriche e strutture della lingua coranica per studenti avanzati.",
      fr: "Analyse avancée de la syntaxe, de l'éloquence et des structures du style coranique."
    },
    isLocked: false
  },
  {
    id: "lib-bk-05",
    category: "theses",
    title: {
      ar: "رسالة ماجستير: دور التعليم التفاعلي عن بعد بالجامعات الإسلامية الأوروبية",
      en: "Master Thesis: E-Learning Pedagogies & Effectiveness in European Islamic Institutes",
      it: "Tesi Master: Strategie di E-Learning negli Istituti Europei",
      fr: "Thèse Master : Pédagogies d'E-Learning dans les Instituts Européens"
    },
    author: {
      ar: "الباحث الأكاديمي: أحمد مراد",
      en: "Researcher: Ahmed Mourad",
      it: "Ricercatore: Ahmed Mourad",
      fr: "Chercheur : Ahmed Mourad"
    },
    year: "2024",
    pages: 195,
    tags: ["Master", "Pedagogy", "LMS", "Linguistics"],
    excerpt: {
      ar: "بحث ممتع للمنظومة التقنية للتعلم الإلكتروني المتكامل وعقد مقارنة بمجهودات الجامعة الإسلامية بروكسل منذ عام ٢٠١٨.",
      en: "Investigating the transition towards virtual classrooms, evaluating student retainment and virtual interaction metrics.",
      it: "Studio della transizione verso le aule virtuali, valutando efficacia ed esiti di interazione.",
      fr: "Étude sur l'apprentissage en ligne, l'adhésion des étudiants et l'interactivité virtuelle."
    },
    isLocked: true
  }
];

const INTRO_TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    badge: "المكتبة الرقمية والمخطوطات النادرة للتعلم",
    heading: "المكتبة الرقمية الفائقة ومستودع الرسائل الدراسية",
    subtitle: "تصفح وابحث في الآلاف من العناوين الفقهية والأطروحات العلمية الصادرة أو المعتمدة بفرع أوروبا، والمتاحة للمطالعة والتحميل الرقمي المباشر.",
    searchPlaceholder: "ابحث عن كتاب، أطروحة دكتوراه، أو رمز المخطوطة...",
    all: "كل المصادر",
    manuscripts: "مخطوطات أثرية",
    fiqh: "الشريعة والفقه",
    theses: "رسائل ماجستير ودكتوراه",
    language: "اللغة العربية والبلاغة",
    authorLabel: "المؤلف:",
    yearLabel: "سنة النشر:",
    pagesLabel: "عدد الصفحات:",
    tagLabel: "التصنيف:",
    lockedBadge: "مخصص للطلبة المسجلين",
    unlockedBadge: "متاح للعموم",
    downloadBtn: "تحميل PDF ذكي",
    readBtn: "قراءة في المتصفح",
    downloadSuccess: "تم تنزيل المجلد الرقمي بالكامل بنجاح!",
    guestAlert: "هذا المصدر متاح حصرياً للطلاب المسجلين. يرجى ملء استمارة القبول (بوابة القبول) لتتمكن من تصفح كافة محتويات المكتبة كطالب رسمي!"
  },
  en: {
    badge: "DIGITAL CAMPUS LIBRARIES",
    heading: "Cloud Library Explorer & Scholarly Archives",
    subtitle: "Look up and search thousands of reference books, certified PhD/Masters dissertations, and rare digitized manuscripts published at the Brussels Campus.",
    searchPlaceholder: "Search by title, scientific author, or topic...",
    all: "All Archives",
    manuscripts: "Digitzed Manuscripts",
    fiqh: "Islamic Fiqh & Civil Law",
    theses: "Dissertations & Essays",
    language: "Arabic Language & Arts",
    authorLabel: "Author:",
    yearLabel: "Year:",
    pagesLabel: "Pages:",
    tagLabel: "Topic:",
    lockedBadge: "Locked - Students Only",
    unlockedBadge: "Guest Access Open",
    downloadBtn: "Download Digital PDF",
    readBtn: "Read Online (iFrame)",
    downloadSuccess: "PDF document compiled and loaded successfully!",
    guestAlert: "This scholastic publication requires a verified Student ID. Please submit your registration request at our Admissions Portal below to unlock full access!"
  },
  it: {
    badge: "BIBLIOTECA DIGITALE DI CAMPUS",
    heading: "La Biblioteca Digitale & Archivio Antico",
    subtitle: "Rileva e cerca tra migliaia di libri di riferimento, tesi di dottorato e rari manoscritti digitalizzati ufficiali dell'Università.",
    searchPlaceholder: "Cerca per titolo, autore accademico o facoltà...",
    all: "Tutti gli Archivi",
    manuscripts: "Antichi Manoscritti",
    fiqh: "Sharia e Diritto Civile",
    theses: "Tesi di Ricerca PhD/Master",
    language: "Lingua Araba e Retorica",
    authorLabel: "Autore:",
    yearLabel: "Anno:",
    pagesLabel: "Pagine:",
    tagLabel: "Tema:",
    lockedBadge: "Studenti Registrati",
    unlockedBadge: "Accesso Ospite",
    downloadBtn: "Scarica Documento PDF",
    readBtn: "Leggi Ora in Linea",
    downloadSuccess: "Documento PDF scaricato con successo!",
    guestAlert: "Questa pubblicazione richiede credenziali studente. Invia la tua richiesta di iscrizione nel portale qui sotto o contatta la segreteria per sbloccare!"
  },
  fr: {
    badge: "BIBLIOTHÈQUE SCIENTIFIQUE NUMÉRIQUE",
    heading: "Bibliothèque en Ligne & Archives Académiques",
    subtitle: "Consultez et recherchez parmi des milliers d'ouvrages théologiques, d'écrits phares, et d'excellentes thèses universitaires archivées.",
    searchPlaceholder: "Rechercher par titre, enseignant ou domaine...",
    all: "Toutes les Ressources",
    manuscripts: "Manuscrits Précieux",
    fiqh: "Droit & Sharia Comparée",
    theses: "Mémoires de Master & Thèses",
    language: "Langue Arabe",
    authorLabel: "Auteur :",
    yearLabel: "Année :",
    pagesLabel: "Pages :",
    tagLabel: "Catégorie :",
    lockedBadge: "Membres Uniquement",
    unlockedBadge: "Accès Libre",
    downloadBtn: "Télécharger l'ouvrage PDF",
    readBtn: "Lire dans le Navigateur",
    downloadSuccess: "Le fichier PDF a été compilé et téléchargé avec succès !",
    guestAlert: "Ce document requiert un accès membre. Complétez votre formulaire de pré-admission ci-dessous pour obtenir vos accès immédiats !"
  }
};

export const DigitalLibrary: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = INTRO_TRANSLATIONS[currentLang] || INTRO_TRANSLATIONS["en"];

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [showNotificationId, setShowNotificationId] = useState<string | null>(null);
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);
  const [guestAlertOpen, setGuestAlertOpen] = useState<boolean>(false);

  const filteredBooks = BOOKS_DATA.filter((bk) => {
    const matchesTab = activeTab === "all" || bk.category === activeTab;
    const searchLower = searchQuery.toLowerCase();
    
    const textToSearch = (
      (bk.title[currentLang] || bk.title["en"] || "") + 
      (bk.author[currentLang] || bk.author["en"] || "") + 
      bk.year + 
      bk.category
    ).toLowerCase();

    const matchesSearch = textToSearch.includes(searchLower);
    return matchesTab && matchesSearch;
  });

  const triggerDownload = (book: Book) => {
    if (book.isLocked) {
      setGuestAlertOpen(true);
      return;
    }
    
    setDownloadingBookId(book.id);
    setTimeout(() => {
      setDownloadingBookId(null);
      setShowNotificationId(book.id);
      
      // Clear toast notification after 4 seconds
      setTimeout(() => {
        setShowNotificationId(null);
      }, 4000);
    }, 2000);
  };

  const triggerRead = (book: Book) => {
    if (book.isLocked) {
      setGuestAlertOpen(true);
      return;
    }
    setActiveReadingBook(book);
  };

  return (
    <section id="library" className="py-24 bg-white border-t border-b border-gray-100 relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-blue-500/15">
            <Library className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3.5xl sm:text-4.5xl font-black text-gray-900 tracking-tight">
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.subtitle}
          </p>
        </div>

        {/* Search Container & Filters */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          
          {/* Real Input Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl py-3.5 pl-11 pr-5 text-gray-900 placeholder-gray-400 font-semibold shadow-sm focus:outline-none transition-all duration-300"
            />
            <div className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'left-4'} flex items-center pointer-events-none`}>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {["all", "manuscripts", "fiqh", "theses", "language"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-black cursor-pointer border transition-all ${
                  activeTab === cat 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" 
                    : "bg-white hover:bg-gray-50 text-gray-650 border-gray-150"
                }`}
              >
                {cat === "all" ? t.all : t[cat as keyof typeof t]}
              </button>
            ))}
          </div>
        </div>

        {/* Books Results List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {filteredBooks.map((bk) => (
            <div 
              key={bk.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 relative group h-full"
            >
              <div className="space-y-4">
                {/* Book Header Item */}
                <div className="flex justify-between items-start">
                  <span className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookMarked className="w-6 h-6" />
                  </span>

                  {bk.isLocked ? (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[9px] font-black border border-amber-100/50">
                      <Lock className="w-3 h-3 text-amber-500" />
                      <span>{t.lockedBadge}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[9px] font-black border border-emerald-100/50">
                      <FileCheck2 className="w-3 h-3 text-emerald-500" />
                      <span>{t.unlockedBadge}</span>
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {bk.title[currentLang] || bk.title["en"]}
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">
                    {t.authorLabel} <span className="text-gray-700 font-extrabold">{bk.author[currentLang] || bk.author["en"]}</span>
                  </p>
                </div>

                <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-sm">
                  {bk.excerpt[currentLang] || bk.excerpt["en"]}
                </p>

                {/* Meta stats */}
                <div className="pt-3 border-t border-gray-100/60 grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-400">
                  <div>
                    <span>{t.yearLabel}</span>
                    <span className="text-gray-700 block mt-0.5">{bk.year}</span>
                  </div>
                  <div>
                    <span>{t.pagesLabel}</span>
                    <span className="text-gray-700 block mt-0.5">{bk.pages} p.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-100/60 flex items-center gap-2">
                <button
                  onClick={() => triggerRead(bk)}
                  className="flex-1 text-center bg-gray-50 text-gray-700 hover:bg-gray-100 font-black text-xs py-2.5 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t.readBtn}</span>
                </button>

                <button
                  onClick={() => triggerDownload(bk)}
                  disabled={downloadingBookId === bk.id}
                  className="bg-blue-600 text-white hover:bg-blue-700 font-black text-xs py-2.5 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {downloadingBookId === bk.id ? (
                    <span className="animate-spin text-center inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>PDF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic Notification Toast local to card */}
              {showNotificationId === bk.id && (
                <div className="absolute -bottom-10 inset-x-0 mx-auto text-center z-45 max-w-[260px]">
                  <p className="bg-slate-900 text-white text-[10px] sm:text-xs font-black shadow-lg px-2.5 py-1.5 rounded-full flex items-center justify-center gap-1.5 border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span>{t.downloadSuccess}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unpermitted / Locked Document Alert Modal */}
        <AnimatePresence>
          {guestAlertOpen && (
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 max-w-md w-full relative space-y-4 shadow-2xl text-center"
              >
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200 font-black">
                  <Lock className="w-6 h-6 font-semibold animate-pulse" />
                </div>
                
                <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                  {currentLang === 'ar' ? 'يتطلب حساب طالب معتمد' : 'Student Authentication Required'}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                  {t.guestAlert}
                </p>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => setGuestAlertOpen(false)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-black text-xs py-3 rounded-xl cursor-pointer"
                  >
                    {currentLang === 'ar' ? 'فهمت' : 'Close Alert'}
                  </button>
                  <a
                    href="#admission-portal"
                    onClick={() => setGuestAlertOpen(false)}
                    className="flex-1 bg-blue-600 text-white font-black text-xs py-3 rounded-xl hover:bg-blue-700 text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <span>{currentLang === 'ar' ? 'بوابة القبول' : 'Go To Portal'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Read Book Simulator overlay modal */}
        <AnimatePresence>
          {activeReadingBook && (
            <div 
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 max-w-2xl w-full relative space-y-5 shadow-2xl"
              >
                {/* Modal Title bar */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-150">
                  <div>
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider block w-max mb-1">
                      {t[activeReadingBook.category] || activeReadingBook.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                      {activeReadingBook.title[currentLang] || activeReadingBook.title["en"]}
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold mt-1">
                      {t.authorLabel} <span className="text-gray-800 font-extrabold">{activeReadingBook.author[currentLang] || activeReadingBook.author["en"]}</span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setActiveReadingBook(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition cursor-pointer font-black"
                  >
                    ✕
                  </button>
                </div>

                {/* Simulated book page viewport */}
                <div className="max-h-72 overflow-y-auto pr-2 space-y-4 text-xs text-gray-550 leading-relaxed font-semibold bg-slate-50 border border-gray-150 p-5 rounded-2xl">
                  <div className="flex gap-1.5 flex-wrap">
                    {activeReadingBook.tags.map((tg) => (
                      <span key={tg} className="bg-white px-2 py-0.5 text-[9px] text-gray-500 rounded border border-gray-150">#{tg}</span>
                    ))}
                  </div>

                  {currentLang === 'ar' ? (
                    <>
                      <p className="font-extrabold text-sm text-gray-800 border-b border-gray-200 pb-1.5">مقدمة المجلد الفصل الأول (نسخة معاينة معتمدة)</p>
                      <p>الحمد لله رب العالمين والصلاة والسلام على أشرف المرسلين محمد وعلى آله وصحبه أجمعين.</p>
                      <p>إن من أهم أهداف دراستنا الممنوحة بالجامعة الإسلامية بروكسل فرع أوروبا إنجاز طرح فقهي ومعرفي يسهل تداخل الثقافات وينمّي وعي الطلاب بالمسؤوليات الاجتماعية في المدارس الغربية.</p>
                      <p>إن السعي لترسيخ مناهج التعليم التفاعلي والتربية يمنح الطلاب في شتى الدول العربية والأوروبية عمقاً جديداً يتيح التوفيق بين متطلبات الشريعة وحق المواطنة في بلدانهم.</p>
                      <p className="italic text-gray-400 text-[10px] mt-4">نهاية المعاينة ببروتوكول iFrame الموحد. المصدر مسجل برخصة IUB-LMS-2026.</p>
                    </>
                  ) : (
                    <>
                      <p className="font-extrabold text-sm text-gray-800 border-b border-gray-200 pb-1.5">Brief Overview - Introductory Chapters</p>
                      <p>The academic curriculum of the Islamic University of Brussels is structured to enhance scholarly understanding of Islamic jurisprudence, education, linguistics, and legal integration in accordance with modern European codes.</p>
                      <p>We welcome undergraduate and postgraduate students to actively leverage our online collections to synthesize authentic legal methodologies with civil citizenship frameworks.</p>
                      <p className="italic text-gray-400 text-[10px] mt-4">End of Secure digital review. Reference code: IUB-LMS-2026.</p>
                    </>
                  )}
                </div>

                {/* Footer close */}
                <div className="pt-2 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveReadingBook(null)}
                    className="bg-slate-900 text-white font-black text-xs py-2.5 px-6 rounded-xl hover:bg-slate-800 transition cursor-pointer"
                  >
                    {currentLang === 'ar' ? 'إغلاق المعاينة' : 'Exit Reader'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
