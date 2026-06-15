import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Tv, 
  Flame, 
  Award, 
  MapPin, 
  HeartHandshake, 
  BookOpen, 
  Globe, 
  Search, 
  MessageSquare,
  ArrowRight,
  Sparkles,
  PartyPopper
} from "lucide-react";

interface Activity {
  id: string;
  category: "research" | "social" | "charity" | "academic";
  title: Record<string, string>;
  description: Record<string, string>;
  image: string;
  participants: number;
  badge: Record<string, string>;
  metric: Record<string, string>;
}

const ACTIVITIES_DATA: Activity[] = [
  {
    id: "act-1",
    category: "research",
    title: {
      ar: "حلقات البحث الفقهي المعاصر",
      en: "Contemporary Jurisprudence Circles",
      it: "Circoli di Giurisprudenza Contemporanea",
      fr: "Cercles de Jurisprudence Contemporaine"
    },
    description: {
      ar: "ندوات طلابية أسبوعية لمناقشة القضايا الفقهية المستجدة للمسلمين في أوروبا والنوازل الحديثة.",
      en: "Weekly student symposiums discussing emerging Islamic legal issues and modern jurisprudence in Europe.",
      it: "Simposi studenteschi settimanali che discutono di questioni legali islamiche emergenti in Europa.",
      fr: "Interventions étudiantes hebdomadaires traitant des questions juridiques musulmanes contemporaines en Europe."
    },
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    participants: 180,
    badge: {
      ar: "مجموعة بحثية",
      en: "Research Group",
      it: "Gruppo di Ricerca",
      fr: "Groupe d'Étude"
    },
    metric: {
      ar: "٢٤ بحثاً منشراً",
      en: "24 Papers Published",
      it: "24 Articoli Pubblicati",
      fr: "24 Documents Publiés"
    }
  },
  {
    id: "act-2",
    category: "social",
    title: {
      ar: "ملتقى حوار الأديان والتعليم الرقمي",
      en: "Interfaith Dialogue & Digital Forum",
      it: "Forum del Dialogo Interreligioso",
      fr: "Forum de Dialogue Interreligieux"
    },
    description: {
      ar: "مبادرة يقودها طلاب البرامج الأوروبية لتعزيز الفهم المتبادل وعقد لقاءات مفتوحة مع جامعات أوروبية.",
      en: "A student-led initiative fostering communal understanding and mutual academic exchanges with secular European institutes.",
      it: "Iniziativa guidata dagli studenti per favorire il dialogo e scambi accademici con istituti laici europei.",
      fr: "Initiative étudiante pour encourager la compréhension mutuelle et les échanges académiques en Europe."
    },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    participants: 340,
    badge: {
      ar: "حوار وتبادل",
      en: "Dialogue Hub",
      it: "Centro Dialogo",
      fr: "Dialogue Global"
    },
    metric: {
      ar: "١٢ جامعة شريكة",
      en: "12 Partner Colleges",
      it: "12 Università Partner",
      fr: "12 Faciles Partenaires"
    }
  },
  {
    id: "act-3",
    category: "charity",
    title: {
      ar: "حملة بروكسل الرمضانية للتكافل الاجتماعي",
      en: "Brussels Charity & Solidarity Campaign",
      it: "Campagna di Solidarietà Bruxelles",
      fr: "Campagne de Solidarité à Bruxelles"
    },
    description: {
      ar: "تنظيم وجبات الإفطار وكسوة الشتاء وتوزيعها على الفئات المحتاجة بالتعاون مع المؤسسات الخيرية ببلجيكا.",
      en: "Voluntary food drives, clothing campaigns, and soup kitchens organized during key sessions in Brussels communes.",
      it: "Distribuzioni alimentari volontarie e campagne di solidarietà organizzate nei comuni di Bruxelles.",
      fr: "Banques alimentaires et campagnes de solidarité bénévoles organisées dans les communes de Bruxelles."
    },
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
    participants: 420,
    badge: {
      ar: "عمل تطوعي",
      en: "Voluntary Care",
      it: "Volontariato",
      fr: "Bénévolat"
    },
    metric: {
      ar: "+١٥٠٠ مستفيد",
      en: "+1,500 Served",
      it: "+1.500 Serviti",
      fr: "+1 500 Servis"
    }
  },
  {
    id: "act-4",
    category: "academic",
    title: {
      ar: "المسابقة السنوية الكبرى للقرآن الكريم وترتيله",
      en: "Grand Quran Recitation & Memorization Award",
      it: "Grande Premio Coranico Annuale",
      fr: "Grand Concours de Récitation du Coran"
    },
    description: {
      ar: "منافسات رقمية وتفاعلية لطلاب وطالبات الجامعة من شتى بقاع العالم تحت إشراف قراء الأزهر الشريف.",
      en: "An global interactive virtual competition with cash prizes evaluated by prominent Quran reciters and Al-Azhar scholars.",
      it: "Una competizione virtuale interattiva con premi valutati da famosi recitatori di Al-Azhar.",
      fr: "Concours virtuel interactif mondial avec des prix évalués par d'éminents récitants d'Al-Azhar."
    },
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop",
    participants: 650,
    badge: {
      ar: "القرآن الكريم",
      en: "Holy Quran",
      it: "Sacro Corano",
      fr: "Saint Coran"
    },
    metric: {
      ar: "جوائز مالية قيمة",
      en: "Noble Valued Prizes",
      it: "Premi Straordinari",
      fr: "Prix de Valeur"
    }
  },
  {
    id: "act-5",
    category: "academic",
    title: {
      ar: "نادي الخطابة والمناظرات باللغة العربية",
      en: "Arabic Oration & Debate Club",
      it: "Club di Dibattito in Lingua Araba",
      fr: "Club d'Éloquence et Débats Arabes"
    },
    description: {
      ar: "صقل المهارات اللغوية والإقناعية للطلاب غير الناطقين بالعربية عبر ورش ومناظرات حية ومسابقات بلاغية.",
      en: "Polishing rhetorical and language abilities for non-native Arabic speakers via structured friendly debates.",
      it: "Perfezionare le capacità linguistiche degli studenti non arabofoni tramite dibattiti amichevoli online.",
      fr: "Améliorer les compétences linguistiques en arabe par des débats amicaux et des ateliers d'éloquence."
    },
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
    participants: 290,
    badge: {
      ar: "مهارات لغوية",
      en: "Language Skills",
      it: "Abilità Linguistica",
      fr: "Compétences"
    },
    metric: {
      ar: "٤٠ مناظرة منجزة",
      en: "40 Debates Met",
      it: "40 Dibattiti",
      fr: "40 Débats Réalisés"
    }
  },
  {
    id: "act-6",
    category: "research",
    title: {
      ar: "منتدى الشباب الأكاديمي الرقمي",
      en: "Digital Youth Academic Forum",
      it: "Forum Giovani Accademici",
      fr: "Forum des Jeunes Académiques"
    },
    description: {
      ar: "لقاءات دورية لتبادل خطط الرسائل العلمية وتنسيق الأوراق المنهجية قبل تقديمها للجان الإشرافي.",
      en: "Regular remote peer mentoring groups providing critical early feedback on proposed Masters/PhD abstracts.",
      it: "Incontri regolari tra studenti per il feedback preliminare su tesi e abstract accademici.",
      fr: "Rencontres régulières pour l'évaluation préliminaire des plans de thèses de Master et PhD."
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    participants: 210,
    badge: {
      ar: "نصح الأقران",
      en: "Peer Advisory",
      it: "Revisione Pari",
      fr: "Conseils"
    },
    metric: {
      ar: "+٩٠ مقترح مقبول",
      en: "+90 Proposals Done",
      it: "+90 Proposte Concluse",
      fr: "+90 Idées Validées"
    }
  }
];

const INTRO_TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    heading: "الحياة الطلابية والأنشطة اللامنهجية",
    subtitle: "تجاوز التحصيل العلمي إلى صقل الشخصية وتأهيل القيادات المجتمعية عبر أنشطتنا التفاعلية المتنوعة.",
    all: "الكل",
    research: "أبحاث علمية",
    social: "تبادل اجتماعي وحوار",
    charity: "الأعمال الخيرية كفالة",
    academic: "مسابقات ومهارات",
    joinCta: "سجل للمشاركة بنشاط",
    activeLabel: "طالب مسجل",
    members: "عضو نشط حالياً"
  },
  en: {
    heading: "Student Academic Life & Activities",
    subtitle: "Going beyond classical lectures to cultivate real community leadership through interactive and high-spirited extracurricular clubs.",
    all: "All",
    research: "Research Initiatives",
    social: "Social & Dialogue",
    charity: "Charity & Welfare",
    academic: "Awards & Skills",
    joinCta: "Register for Active Duty",
    activeLabel: "Registered Student",
    members: "Active Members"
  },
  it: {
    heading: "Vita Studentesca e Attività",
    subtitle: "Andare oltre le lezioni per coltivare una vera leadership sociale e competenze umane attraverso club e attività dinamiche.",
    all: "Tutti",
    research: "Ricerca e Studi",
    social: "Sociale e Dialogo",
    charity: "Beneficenza",
    academic: "Premi e Competenze",
    joinCta: "Partecipa come Membro",
    activeLabel: "Studente Registrato",
    members: "Membri Attivi"
  },
  fr: {
    heading: "Vie Étudiante & Activités",
    subtitle: "Dépasser le cadre théorique pour forger de réels leaders communautaires engagés via nos clubs interactifs et pluridisciplinaires.",
    all: "Tous",
    research: "Projets de Recherche",
    social: "Réseau & Échanges",
    charity: "Entraide & Progrès",
    academic: "Concours & Ateliers",
    joinCta: "Rejoindre l'Action",
    activeLabel: "Éleve Enregistré",
    members: "Membres Actifs"
  }
};

export const StudentActivities: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = INTRO_TRANSLATIONS[currentLang] || INTRO_TRANSLATIONS["en"];
  const [activeTab, setActiveTab] = useState<string>("all");
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);

  const filteredActivities = activeTab === "all" 
    ? ACTIVITIES_DATA 
    : ACTIVITIES_DATA.filter(act => act.category === activeTab);

  const handleJoin = (id: string, name: string) => {
    if (joinedActivities.includes(id)) return;
    setJoinedActivities((prev) => [...prev, id]);
  };

  return (
    <section id="activities" className="py-24 bg-white border-t border-b border-gray-100 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[11px] mb-4 uppercase tracking-widest border border-primary/15">
            <PartyPopper className="w-4 h-4 text-primary animate-bounce" />
            {currentLang === 'ar' ? 'المنظومة غير المنهجية' : 'CAMPUS LIFE & CLUBS'}
          </span>
          <h2 className={`text-3.5xl sm:text-4.5xl font-black text-gray-900 tracking-tight`}>
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.subtitle}
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {["all", "research", "social", "charity", "academic"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 border cursor-pointer ${
                activeTab === cat 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-650 border-gray-150 hover:border-gray-200"
              }`}
            >
              {cat === "all" ? t.all : t[cat as keyof typeof t]}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => {
              const hasJoined = joinedActivities.includes(act.id);
              return (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white rounded-3xl border border-gray-150 p-4.5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 flex flex-col group h-full relative"
                >
                  {/* Photo Layer */}
                  <div className="h-44 w-full rounded-2xl overflow-hidden relative mb-4">
                    <img 
                      src={act.image} 
                      alt={act.title[currentLang] || act.title["en"]} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent"></div>
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm text-[10px] font-black text-primary px-3 py-1 rounded-full">
                      {act.badge[currentLang] || act.badge["en"]}
                    </span>

                    {/* Active Metrics Counter */}
                    <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-white text-[10px] sm:text-xs">
                      <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-lg flex items-center gap-1 font-sans">
                        <Users className="w-3.5 h-3.5 text-white/90" />
                        <span>{act.participants + (hasJoined ? 1 : 0)} {t.activeLabel}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title and stats summary */}
                  <div className="flex-1 flex flex-col pt-1">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
                        <span>{act.metric[currentLang] || act.metric["en"]}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {act.title[currentLang] || act.title["en"]}
                    </h3>
                    
                    <p className="text-gray-500 text-xs mt-2.5 font-medium leading-relaxed flex-1">
                      {act.description[currentLang] || act.description["en"]}
                    </p>
                  </div>

                  {/* Interactive Trigger Button inside item */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-bold">
                      {act.participants + (hasJoined ? 1 : 0)} {t.members}
                    </span>
                    <button
                      onClick={() => handleJoin(act.id, act.title[currentLang] || act.title["en"])}
                      disabled={hasJoined}
                      className={`text-[10px] sm:text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                        hasJoined 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/15" 
                          : "bg-primary text-white border-primary hover:opacity-90 shadow-sm"
                      }`}
                    >
                      {hasJoined ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-block"
                          >✓</motion.span>
                          <span>{currentLang === 'ar' ? 'تم الانضمام' : 'Request Approved'}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.joinCta}</span>
                          <ArrowRight className={`w-3.5 h-3.5 transform ${isRtl ? "rotate-180" : ""}`} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
