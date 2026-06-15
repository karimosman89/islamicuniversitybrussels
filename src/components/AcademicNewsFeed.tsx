import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Newspaper, 
  Calendar, 
  Globe, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface NewsItem {
  title: string;
  date: string;
  sourceName: string;
  url: string;
  summary: string;
  category: "conference" | "news" | "academic";
}

interface CitationItem {
  title: string;
  uri: string;
}

interface AcademicNewsFeedProps {
  currentLang: string;
  isRtl: boolean;
}

const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    title: "مستجدات وملتقيات التعليم العالي الإسلامي والرقمي في أوروبا",
    groundingActive: "التحقق ذكي ومباشر عبر قوقل",
    refreshTitle: "تحديث الخلاصة",
    loading: "تحليل ذكي والتحقق المباشر من المؤتمرات والملتقيات...",
    error: "عذراً، تعذر تحديث الأخبار حالياً. تم التحميل من الأرشيف.",
    source: "المصدر الأكاديمي:",
    readMore: "تحقق من الرابط",
    conference: "مؤتمر علمي",
    news: "جديد الساحة",
    academic: "قبول وترتيب",
    viewGrounding: "عرض مراجع التحقق من قوقل (مصادر المحرك الذكي)",
    citationsHeading: "المصادر الأكاديمية والوثائق التي استند إليها محرك Gemini للتحقق:",
    noCitations: "البحث جارٍ عن ملتقيات جديدة للتحميل والربط الجغرافي.",
    activeSince: "آخر فحص للقبول والمنح:",
    minutesAgo: "دقائق مضت",
    justNow: "الآن"
  },
  en: {
    title: "European Islamic Studies & Distance Learning News Feed",
    groundingActive: "Google Grounded AI",
    refreshTitle: "Refresh Feed",
    loading: "Analyzing and grounding recent conferences & academic news via Gemini...",
    error: "Could not fetch updates at this moment. Showing cached feed.",
    source: "Academic Source:",
    readMore: "Visit Reference",
    conference: "Academic Conference",
    news: "Recent News",
    academic: "Admissions & Accreditations",
    viewGrounding: "View Google Grounding Citations (AI Source Index)",
    citationsHeading: "Verified Search Indexes retrieved by the Gemini API model:",
    noCitations: "Search engine is active looking up new academic publications.",
    activeSince: "Validated:",
    minutesAgo: "min ago",
    justNow: "Just now"
  },
  it: {
    title: "Notizie e Congressi sugli Studi Islamici e E-Learning in Europa",
    groundingActive: "Verificato da Google",
    refreshTitle: "Aggiorna Feed",
    loading: "Analisi e verifica dei recenti congressi accademici via Gemini...",
    error: "Impossibile caricare aggiornamenti live. Feed d'archivio attivo.",
    source: "Fonte accademica:",
    readMore: "Leggi la fonte",
    conference: "Conferenza",
    news: "Novità",
    academic: "Ammissioni",
    viewGrounding: "Visualizza citazioni di Google Grounding (Indice AI)",
    citationsHeading: "Indici di ricerca verificati recuperati dall'API Gemini:",
    noCitations: "Ricerca attiva di nuovi eventi accademici.",
    activeSince: "Validato:",
    minutesAgo: "min fa",
    justNow: "Ora"
  },
  fr: {
    title: "Actualités & Colloques sur les Études Islamiques & Distance Learning en Europe",
    groundingActive: "Vérification en Direct de Google",
    refreshTitle: "Actualiser le flux",
    loading: "Analyse et vérification des récents colloques via Gemini...",
    error: "Impossible de charger live actuellement. Flux d'archives actif.",
    source: "Source académique :",
    readMore: "Voir la référence",
    conference: "Colloque",
    news: "Actualité",
    academic: "Admissions",
    viewGrounding: "Voir citations Google Grounding (Index AI)",
    citationsHeading: "Index de recherche vérifiés récupérés par l'API Gemini :",
    noCitations: "Moteur de recherche actif à l'écoute de nouveaux événements.",
    activeSince: "Validé :",
    minutesAgo: "min",
    justNow: "À l'instant"
  },
  de: {
    title: "Islamische Studien & E-Learning Nachrichten & Konferenzen in Europa",
    groundingActive: "Google-Verifiziert",
    refreshTitle: "Feed aktualisieren",
    loading: "Suche und Analyse aktueller Konferenzen mit Gemini...",
    error: "Live-Nachrichten können nicht geladen werden. Archiviertes Feed aktiv.",
    source: "Akademische Quelle:",
    readMore: "Link besuchen",
    conference: "Konferenz",
    news: "Aktuelles",
    academic: "Akkreditierung",
    viewGrounding: "Google Grounding-Nachweise anzeigen (KI-Quellenindex)",
    citationsHeading: "Durch das Gemini-API-Modell verifizierte Suchindizes:",
    noCitations: "Aktive Suche nach neuen akademischen Veranstaltungen.",
    activeSince: "Validiert vor:",
    minutesAgo: "Min. her",
    justNow: "Gerade eben"
  }
};

export const AcademicNewsFeed: React.FC<AcademicNewsFeedProps> = ({ currentLang, isRtl }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [citations, setCitations] = useState<CitationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showCitations, setShowCitations] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [timeAgoString, setTimeAgoString] = useState<string>("");
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef<boolean>(false);

  // Safe translation picker
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS["en"];

  const fetchNews = async (forceRefresh = false) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/academic-news?refresh=${forceRefresh ? "true" : "false"}`);
      if (!response.ok) throw new Error("API call error");
      const data = await response.json();
      
      if (data && data.news && data.news.length > 0) {
        setNews(data.news);
        setCitations(data.citations || []);
        setActiveIndex(0);
        setLastUpdated(new Date());
      } else {
        throw new Error("No data loaded");
      }
    } catch (err) {
      console.error("Error loaded academic news:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Update time elapsed since last updated
  useEffect(() => {
    const updateTimeAgo = () => {
      const diffMs = Date.now() - lastUpdated.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) {
        setTimeAgoString(t.justNow);
      } else {
        setTimeAgoString(`${diffMins} ${t.minutesAgo}`);
      }
    };
    updateTimeAgo();
    const timer = setInterval(updateTimeAgo, 30000);
    return () => clearInterval(timer);
  }, [lastUpdated, currentLang]);

  // Periodic polling every 5 minutes to keep news fresh
  useEffect(() => {
    const pollTimer = setInterval(() => {
      // Passive load behind the scenes
      fetchNews(false);
    }, 5 * 60 * 1000);
    return () => clearInterval(pollTimer);
  }, []);

  // Auto sliding carousel
  useEffect(() => {
    if (news.length === 0 || loading) return;

    const startInterval = () => {
      autoSlideInterval.current = setInterval(() => {
        if (!isHovered.current) {
          setActiveIndex((prev) => (prev + 1) % news.length);
        }
      }, 7000); // 7 seconds slide
    };

    startInterval();

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [news, loading]);

  const handleNext = () => {
    if (news.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % news.length);
  };

  const handlePrev = () => {
    if (news.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const currentItem = news[activeIndex];

  // Helper mapping matching styling for category labels
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "conference":
        return {
          wrapper: "bg-red-500/10 text-red-500 border border-red-500/20",
          dots: "bg-red-500",
          icon: <Award className="w-3.5 h-3.5" />
        };
      case "academic":
        return {
          wrapper: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
          dots: "bg-emerald-500",
          icon: <BookOpen className="w-3.5 h-3.5" />
        };
      case "news":
      default:
        return {
          wrapper: "bg-primary/10 text-primary border border-primary/20",
          dots: "bg-primary",
          icon: <Newspaper className="w-3.5 h-3.5" />
        };
    }
  };

  return (
    <div id="academic-news-feed" className="bg-white border-b border-gray-100 flex flex-col w-full relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 w-full">
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRtl ? "md:flex-row-reverse" : ""}`}>
          
          {/* Section Mini Heading with Live Search Pulse */}
          <div className={`flex items-center gap-3 flex-wrap ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100/50">
                <Globe className="w-2.5 h-2.5" />
                {t.groundingActive}
              </span>
            </div>
            <h4 className={`text-xs md:text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.title}</span>
            </h4>
          </div>

          {/* Action Toolbar */}
          <div className={`flex items-center gap-3 self-end md:self-center ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
            <span className="text-[10px] text-gray-400 font-bold font-sans">
              {t.activeSince} {timeAgoString}
            </span>
            <button
              onClick={() => fetchNews(true)}
              disabled={loading}
              title={t.refreshTitle}
              className={`p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-gray-50 border border-gray-100 shadow-sm transition-all flex items-center justify-center cursor-pointer ${loading ? "opacity-50" : ""}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-primary" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content Slider Window */}
        <div 
          className="mt-2.5 relative min-h-[58px] overflow-hidden"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {loading ? (
            <div className="py-4 flex items-center justify-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              <p className="text-xs text-gray-500 font-bold animate-pulse">{t.loading}</p>
            </div>
          ) : error && news.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-xs text-red-500 font-bold">{t.error}</p>
            </div>
          ) : (
            <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-2.5 ${isRtl ? "dir-rtl" : ""}`}>
              
              {/* Prev Trigger */}
              <button 
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 text-gray-400 hover:text-gray-700 transition"
                aria-label="Previous Slide"
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              {/* Main Sliding Panel Card with cross-fading text */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  {currentItem && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRtl ? 10 : -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`p-3 bg-slate-50 border border-gray-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-start ${isRtl ? "sm:flex-row-reverse text-right" : ""}`}
                    >
                      {/* Left: Metadata & summary info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className={`flex items-center gap-2 flex-wrap ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${getCategoryStyles(currentItem.category).wrapper}`}>
                            {getCategoryStyles(currentItem.category).icon}
                            <span>{t[currentItem.category] || currentItem.category}</span>
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 font-sans">
                            <Calendar className="w-3 h-3 text-primary/60" />
                            {currentItem.date}
                          </span>
                          <span className="text-[10px] text-gray-500/80 font-bold flex items-center gap-1">
                            <span className="text-gray-400 font-normal">{t.source}</span>
                            <span className="underline decoration-primary/20">{currentItem.sourceName}</span>
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug tracking-tight">
                          {currentItem.title}
                        </h5>
                        <p className="text-[11px] sm:text-xs text-gray-650 font-medium leading-relaxed max-w-4xl line-clamp-1">
                          {currentItem.summary}
                        </p>
                      </div>

                      {/* Right: Visit Source Button */}
                      {currentItem.url && (
                        <div className="flex-shrink-0 flex items-center">
                          <a
                            href={currentItem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] sm:text-xs font-black px-3.5 py-1.5 bg-primary/8 text-primary rounded-lg hover:bg-primary hover:text-white transition flex items-center gap-1.5 select-none"
                          >
                            <span>{t.readMore}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Next Trigger */}
              <button 
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 text-gray-400 hover:text-gray-700 transition"
                aria-label="Next Slide"
              >
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

            </div>
          )}
        </div>

        {/* Citations Expandable Drawer (Shows exactly how Gemini performed search grounding) */}
        {citations.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-gray-100/70">
            <button
              onClick={() => setShowCitations(!showCitations)}
              className={`flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer ${isRtl ? "flex-row-reverse" : "flex-row"}`}
            >
              <Search className="w-3 h-3 text-emerald-500" />
              <span>{t.viewGrounding}</span>
              <span className="text-[8px]">{showCitations ? "▲" : "▼"}</span>
            </button>
            
            <AnimatePresence>
              {showCitations && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-1.5"
                >
                  <p className={`text-[9px] font-black text-gray-500 mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                    {t.citationsHeading}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                    {citations.map((cite, idx) => (
                      <a
                        key={idx}
                        href={cite.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] font-bold px-2 py-1 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 rounded border border-gray-150 flex items-center gap-1 max-w-[220px] truncate"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{cite.title || cite.uri}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Small Progress Bar Indicator dots in sync with slide index */}
        {news.length > 1 && !loading && (
          <div className="mt-2 flex justify-center gap-1.5">
            {news.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? `w-4 ${getCategoryStyles(news[idx]?.category).dots}` : "w-1.5 bg-gray-200"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
