import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  MapPin, 
  Compass, 
  Layers, 
  Info, 
  CheckCircle, 
  Sparkles, 
  Eye, 
  Award,
  BookOpen,
  ArrowRight,
  Video
} from 'lucide-react';

interface CampusTourProps {
  currentLang: string;
  isRtl?: boolean;
}

const LOCALIZATION: Record<string, any> = {
  ar: {
    sectionBadge: "جولة الحرم الجامعي والمرافق",
    sectionTitle: "الدليل التفاعلي لمرافق الحرم الجامعي",
    sectionSub: "استكشف معالم ومصادر ومكتبات فرع بروكسل والمؤسسات الأكاديمية الشريكة حيث يتم إعداد المحاضرات وتخزين أقدم المخطوطات الورقية.",
    facilityLocation: "موقع المرفق:",
    capacityLabel: "الطاقة الاستيعابية للطلاب:",
    featuredMetric: "الميزة الأكاديمية البارزة:",
    viewVirtual3D: "تشغيل الجولة الافتراضية الثلاثية الأبعاد (3D)",
    tourPlaying: "جاري تحميل محرك العرض الافتراضي ثلاثي الأبعاد... يرجى الانتظار.",
    facilitiesList: "قائمة المنشآت والدوائر:",
    brusselsCampus: "مجمع بروكسل الأكاديمي الرئيسي"
  },
  en: {
    sectionBadge: "Interactive Campus & Facilities",
    sectionTitle: "Virtual Campus Tour & Facilities Guide",
    sectionSub: "Embark on an immersive journey through our historic Brussels wings, specialized libraries, lecture theatres, and research manuscript vaults.",
    facilityLocation: "Campus Location:",
    capacityLabel: "Auditorium Capacity:",
    featuredMetric: "Primary Technological Asset:",
    viewVirtual3D: "Launch Immersive Virtual 3D View",
    tourPlaying: "Initializing 3D rendering engine and panorama camera... Click to simulate.",
    facilitiesList: "Featured Campus Facilities:",
    brusselsCampus: "Brussels Central Scholastic campus"
  },
  it: {
    sectionBadge: "Tour del Campus e Strutture",
    sectionTitle: "Guida Interattiva alle Strutture Scolastiche",
    sectionSub: "Un viaggio immersivo tra le aule storiche di Bruxelles, la biblioteca dei manoscritti antichi e i laboratori linguistici.",
    facilityLocation: "Ubicazione:",
    capacityLabel: "Capienza Studenti:",
    featuredMetric: "Bene Tecnologico Chiave:",
    viewVirtual3D: "Avvia Tour Virtuale 3D Immersivo",
    tourPlaying: "Inizializzazione del motore di rendering 3D in corso...",
    facilitiesList: "Strutture del Campus:",
    brusselsCampus: "Campus Centrale di Bruxelles"
  },
  de: {
    sectionBadge: "Geländerundgang & Einrichtungen",
    sectionTitle: "Virtueller Rundgang & Campus-Wegweiser",
    sectionSub: "Begeben Sie sich auf eine immersive Reise durch die historischen Brüsseler Gänge, Spezialbibliotheken, Hörsäle und Forschungsarchive.",
    facilityLocation: "Lage auf dem Campus:",
    capacityLabel: "Kapazität (Studenten):",
    featuredMetric: "Besondere Ausstattung:",
    viewVirtual3D: "Immersiven 3D-Rundgang starten",
    tourPlaying: "3D-Rendering-Engine wird geladen... Bitte warten.",
    facilitiesList: "Ausgewählte Campuseinrichtungen:",
    brusselsCampus: "Brüsseler Zentralcampus"
  },
  fr: {
    sectionBadge: "Visite Interactive et Infrastructures",
    sectionTitle: "Guide du Campus & Visite Virtuelle 3D",
    sectionSub: "Découvrez les espaces de cours, amphithéâtres, laboratoires de langues et la prestigieuse salle d'archivage des manuscrits de Bruxelles.",
    facilityLocation: "Localisation :",
    capacityLabel: "Capacité d'Accueil :",
    featuredMetric: "Atout Technologique Majeur :",
    viewVirtual3D: "Lancer la Visite Virtuelle 3D",
    tourPlaying: "Initialisation du rendu 3D et de la caméra panoramique...",
    facilitiesList: "Infrastructures Clés du Campus :",
    brusselsCampus: "Campus Central de Bruxelles (Anvers/Bruxelles)"
  }
};

const FACILITIES_DATA = [
  {
    id: "fac_1",
    name: {
      ar: "مكتبة المخطوطات والكتب النادرة بمعهد بروكسل",
      en: "Brussels Rare Manuscripts & Theology Library",
      it: "Biblioteca Storica dei Manoscritti di Bruxelles",
      de: "Historische Handschriften- & Theologiebibliothek Brüssel",
      fr: "Bibliothèque des Manuscrits Rares de Bruxelles"
    },
    location: "Sovereign Wing, Floor 2, Brussels",
    capacity: "250+ Research Seats",
    asset: {
      ar: "نظام أرشفة رطوبة رقمي للمخطوطات من قرنين",
      en: "Hydro-regulated digital archives for 200-year scrolls",
      it: "Archivio digitale termoidrico per pergamene storiche",
      de: "Klimatisiertes digitales Archiv für jahrhundertealte Schriftrollen",
      fr: "Archives thermorégulées de numérisation de parchemins"
    },
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
    desc: {
      ar: "تحتوي المكتبة على آلاف العناوين المتخصصة والنسخ الفريدة من مصادر التفسير والحديث، بالإضافة إلى معمل مجهز للمذاكرة الهادئة والترجمة الأكاديمية.",
      en: "Houses over 15,000 reference volumes, classic theological prints, and exclusive microfilm scanners for heritage document research.",
      it: "Custodisce oltre 15.000 volumi di riferimento, stampe teologiche classiche e lettori di microfilm per lo studio dei documenti storici.",
      de: "Beherbergt über 15.000 Bände, klassische theologische Drucke und Mikrofilm-Scanner zur Erforschung historischer Dokumente.",
      fr: "Regroupe plus de 15 000 volumes d'exégèse classique, de traités linguistiques et d'appareils de numérisation de microfilms de haute précision."
    }
  },
  {
    id: "fac_2",
    name: {
      ar: "القاعة الكبرى للمؤتمرات والندوات العلمية (قاعة ابن رشد)",
      en: "Averroes Great Academic Lecture Hall & Theatre",
      it: "Aula Magna Accademica Ibn Rushd (Averroè)",
      de: "Averroes-Auditorium Maximum (Hörsaal)",
      fr: "Grand Amphithéâtre Universitaire Averroès"
    },
    location: "Main Ground Pavilion, Block A",
    capacity: "500 Seats / Multi-Channel Streaming",
    asset: {
      ar: "منصة ترقية الصوت وبث فوري متعدد الاتجاهات",
      en: "Multi-cam automated hybrid streaming console",
      it: "Console di streaming ibrido automatico multicamera",
      de: "Automatische Multicam-Streaming-Konsole für Hybrid-Lehre",
      fr: "Console de diffusion hybride automatisée multi-caméras"
    },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    desc: {
      ar: "قاعة مخصصة لإلقاء المحاضرات الافتراضية والندوات الدولية، مجهزة بشبكة ألياف ضوئية لربط الطلبة بالخارج بأساتذة مجمع بروكسل الأكاديمي مباشرة.",
      en: "Designed for grand colloquiums and hybrid online lectures. Fully integrated with automated voice acoustics and localized translation portals.",
      it: "Progettato per grandi convegni e lezioni online ibride. Completamente integrato con acustica vocale intelligente.",
      de: "Konzipiert für große Symposien und hybride Online-Vorlesungen. Ausgestattet mit intelligenter Raumakustik und Übersetzungskonsolen.",
      fr: "Amphithéâtre dédié aux grands colloques internationaux et à la retransmission en direct pour les étudiants du monde entier."
    }
  },
  {
    id: "fac_3",
    name: {
      ar: "مختبر اللسانيات والترجمة الفورية المعاصرة",
      en: "Phonetics & Professional Translation Lab",
      it: "Laboratorio di Fonetica e Traduzione Professionale",
      de: "Labor für Phonetik & Übersetzungswissenschaften",
      fr: "Laboratoire de Phonétique & Traduction Simultanée"
    },
    location: "Linguistic Center, Block B, Floor 1",
    capacity: "80 Fully Equipped Workstations",
    asset: {
      ar: "نظام رصد مخارج الصوت ومحاكاة الترجمة الفورية",
      en: "Speech acoustic oscilloscopes and real-time commentary bays",
      it: "Oscilloscopi acustici e cabine per interpretariato in tempo reale",
      de: "Sprachanalyse-Oszilloskope und Kabinen für Simultan-Dolmetschen",
      fr: "Oscilloscopes vocaux et cabines pour interprétariat simultané"
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    desc: {
      ar: "مختبر تقني متطور مخصص لطلبة قسم اللغة العربية والترجمة، ومزود بنظم فحص الصوتيات لمراجعة وتدقيق مخارج الحروف وقواعد التجويد اللفظي والترجمة الفورية.",
      en: "Active lab workspace utilized for Arabic pronunciation optimization, phonetic metric tracking, and intense simultaneous French/English translation drills.",
      it: "Spazio di lavoro attivo utilizzato per ottimizzare la pronuncia araba, il tracciamento fonetico e le esercitazioni di traduzione simultanea.",
      de: "Modernes Labor für arabische Ausspracheoptimierung, Phonetik-Messungen und Simultanübersetzungsübungen.",
      fr: "Espace équipé destiné à la correction phonétique de la récitation, aux travaux pratiques d'interprétation et à la recherche linguistique."
    }
  }
];

export function CampusTour({ currentLang, isRtl = false }: CampusTourProps) {
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];
  const [activeFacility, setActiveFacility] = useState(FACILITIES_DATA[0]);
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexDir = isRtl ? 'flex-row-reverse' : 'flex-row';

  const handleLaunch3D = () => {
    setIsPlayingTour(true);
    setTimeout(() => {
      setIsPlayingTour(false);
    }, 3000);
  };

  return (
    <section id="campus-tour" className="py-24 bg-slate-950 text-white relative border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_bottom_right,rgba(16,185,129,0.04),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-emerald-500/15">
            📍 {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.sectionSub}
          </p>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Facilities Selector (Left/Right side depending on RTL) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-start">
            <span className={`text-[10px] uppercase tracking-widest font-black text-slate-500 block mb-1.5 ${textAlignment}`}>
              {t.facilitiesList}
            </span>
            {FACILITIES_DATA.map((fac) => {
              const bIsActive = activeFacility.id === fac.id;
              const fName = fac.name[currentLang as any] || fac.name["en"];
              
              return (
                <button
                  key={fac.id}
                  onClick={() => {
                    setActiveFacility(fac);
                    setIsPlayingTour(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer relative overflow-hidden group ${
                    bIsActive 
                      ? 'bg-slate-900 border-emerald-500/40 text-white shadow-xl shadow-slate-950/25'
                      : 'bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-white hover:border-slate-800'
                  } ${flexDir}`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${bIsActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className={`space-y-0.5 ${textAlignment}`}>
                    <h4 className="text-xs font-bold leading-snug tracking-tight">
                      {fName}
                    </h4>
                    <span className="text-[9px] text-slate-500 font-mono block">
                      📌 {fac.location}
                    </span>
                  </div>
                  {bIsActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Facility Focus Viewer and Interactive 3D simulator */}
          <div className="lg:col-span-8 bg-slate-900/20 rounded-3xl border border-slate-900 p-5 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            {/* Visual Header Image Card */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 group">
              <img 
                src={activeFacility.image} 
                alt={activeFacility.name[currentLang] || activeFacility.name["en"]} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
              
              {/* Overlaid location and name badges */}
              <div className={`absolute bottom-4 left-4 right-4 ${textAlignment} space-y-1`}>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-600 font-bold text-white text-[9px] uppercase tracking-wider font-mono">
                  <MapPin className="w-3 h-3 text-white" />
                  {t.brusselsCampus}
                </span>
                <h3 className="text-sm sm:text-md font-extrabold text-white leading-snug">
                  {activeFacility.name[currentLang] || activeFacility.name["en"]}
                </h3>
              </div>
            </div>

            {/* Description & Technical details */}
            <div className="space-y-4">
              <p className={`text-xs text-slate-300 leading-relaxed font-semibold italic ${textAlignment}`}>
                "{activeFacility.desc[currentLang] || activeFacility.desc["en"]}"
              </p>

              {/* Technical indicators grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-900">
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-left">
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-bold mb-1">
                    📌 {t.facilityLocation}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {activeFacility.location}
                  </span>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-left">
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-bold mb-1">
                    👥 {t.capacityLabel}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-300">
                    {activeFacility.capacity}
                  </span>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-left">
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-bold mb-1">
                    ⚡ {t.featuredMetric}
                  </span>
                  <span className="text-[10.5px] font-black text-emerald-400">
                    {activeFacility.asset[currentLang as any] || activeFacility.asset["en"]}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated 3D Panorama Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLaunch3D}
                disabled={isPlayingTour}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold border border-slate-850 hover:border-slate-750 transition flex items-center justify-center gap-2.5 text-xs cursor-pointer shadow-lg active:scale-98"
              >
                <Video className="w-4 h-4 text-emerald-450 shrink-0" />
                <span>{t.viewVirtual3D}</span>
              </button>

              <AnimatePresence>
                {isPlayingTour && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-400 font-extrabold mt-2.5 text-center flex items-center justify-center gap-2"
                  >
                    <div className="w-3.5 h-3.5 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
                    <span>{t.tourPlaying}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
