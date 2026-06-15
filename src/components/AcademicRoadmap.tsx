import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  MapPin, 
  GraduationCap, 
  Award, 
  FileCheck, 
  UserPlus, 
  MessageSquareOff, 
  Layers, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  LineChart, 
  FileText,
  Star,
  Users
} from "lucide-react";

interface Milestone {
  quarter: string;
  title: Record<string, string>;
  desc: Record<string, string>;
}

interface RoadmapYear {
  year: number;
  yearTitle: Record<string, string>;
  yearSub: Record<string, string>;
  icon: React.ReactNode;
  color: string;
  milestones: Milestone[];
}

const ROADMAP_DATA: RoadmapYear[] = [
  {
    year: 1,
    yearTitle: {
      ar: "السنة الأولى: التأسيس والمنهجية",
      en: "Year 1: Foundations & Research Scope",
      it: "Anno 1: Fondamenti & Ambito di Ricerca",
      fr: "Année 1 : Fondations & Méthodologie",
      de: "Jahr 1: Grundlagen & Forschungsrahmen"
    },
    yearSub: {
      ar: "المساقات التمهيدية ومقترح الأطروحة الأولي",
      en: "Coursework modules & primary thesis proposals",
      it: "Moduli dei corsi e proposte preliminari di tesi",
      fr: "Cours préparatoires et projet de recherche initial",
      de: "Kursarbeiten & erste Dissertationsentwürfe"
    },
    icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
    color: "emerald",
    milestones: [
      {
        quarter: "Q1",
        title: {
          ar: "التسجيل ومجلس الكلية",
          en: "Admissions Verification & Registration",
          it: "Verifica Ammissioni & Iscrizione",
          fr: "Inscription & Approbation du Dossier",
          de: "Zulassungsprüfung & Immatrikulation"
        },
        desc: {
          ar: "مطابقة الشهادات السابقة والمصادقة على ملف الانتساب والرسوم التمهيدية ببلجيكا.",
          en: "Academic degree audits, credential checks, and enrollment in the central Brussels student registry.",
          it: "Controllo dei titoli di studio precedenti e immatricolazione ufficiale nel registro degli studenti.",
          fr: "Vérification des diplômes antérieurs et inscription officielle au registre de Bruxelles.",
          de: "Überprüfung früherer Abschlüsse und offizielle Erfassung im Brüsseler Studentenregister."
        }
      },
      {
        quarter: "Q2",
        title: {
          ar: "المحاضرات وحلقات البحث",
          en: "Foundational Seminars & Electives",
          it: "Seminari Fondamentali & Corsi a scelta",
          fr: "Séminaires de Recherche & Fondations",
          de: "Grundlagenseminare & Wahlpflichtfächer"
        },
        desc: {
          ar: "حضور المحاضرات المباشرة وتطوير أدوات البحث العلمي وفهم مناهج الاستنباط المعاصرة.",
          en: "Attending regular digital workshops, understanding state-of-the-art literature review methods, and starting exploratory research.",
          it: "Frequenza dei workshop online, approfondimento della letteratura scientifica e inizio della ricerca esplorativa.",
          fr: "Participation aux ateliers numériques, étude approfondie de la littérature de recherche et début de thèse.",
          de: "Teilnahme an digitalen Workshops, Erarbeitung des Literaturhintergrunds und Beginn der explorativen Phase."
        }
      },
      {
        quarter: "Q3 - Q4",
        title: {
          ar: "اعتماد مخطط الرسالة العلمي",
          en: "Thesis Proposal Submission",
          it: "Sottomissione della Proposta di Tesi",
          fr: "Soumission du Projet de Thèse",
          de: "Einreichung des Dissertationsentwurfs"
        },
        desc: {
          ar: "صياغة مقترح البحث الأكاديمي، واختيار المشرف العلمي الرسمي الذي تقره عمادة الدراسات العليا.",
          en: "Drafting the rigorous thesis outline for Board approval and custom matching with a qualified European branch supervisor.",
          it: "Redazione della bozza di tesi per l'approvazione del Consiglio e abbinamento con un relatore europeo qualificato.",
          fr: "Rédaction du projet de recherche pour avis de la Commission et désignation du directeur de thèse.",
          de: "Ausarbeitung des detaillierten Exposés für den Fakultätsrat und Zuweisung eines qualifizierten Betreuers."
        }
      }
    ]
  },
  {
    year: 2,
    yearTitle: {
      ar: "السنة الثانية: التخصص والبحث الميداني",
      en: "Year 2: Literature Review & Fieldwork",
      it: "Anno 2: Ricerca Applicata & Approfondimenti",
      fr: "Année 2 : Spécialisation & Recherche de Terrain",
      de: "Jahr 2: Fachstudium & Feldforschung"
    },
    yearSub: {
      ar: "البحث المعمق وجمع المادة العلمية وتحليل البيانات",
      en: "Advanced thesis writing, academic reviews & structural research analysis",
      it: "Scrittura avanzata della tesi, revisioni intermedie e analisi strutturale",
      fr: "Rédaction avancée, évaluations intermédiaires et analyses empiriques",
      de: "Fortgeschrittene Datensammlung, Begutachtungen & strukturierte Analysen"
    },
    icon: <Layers className="w-5 h-5 text-blue-500" />,
    color: "blue",
    milestones: [
      {
        quarter: "Q1 - Q2",
        title: {
          ar: "جمع الأصول والمصادر التراثية",
          en: "Comprehensive Archival Synthesis",
          it: "Sintesi d'Archivio & Fonti Storiche",
          fr: "Synthèse Documentaire & Matériaux de Thèse",
          de: "Umfassende Archivarbeit & Literatursynthese"
        },
        desc: {
          ar: "الحصول على المخطوطات والمنشورات العلمية النادرة بالاعتماد على الفهرس الرقمي للجامعة.",
          en: "Extracting rare manuscripts and scholarly treatises in sync with IUB's digitized manuscripts and European repositories.",
          it: "Analisi di manoscritti rari e trattati accademici in sinergia con i cataloghi digitali dell'università.",
          fr: "Accès aux manuscrits rares et traités scientifiques à l'aide des bibliothèques numériques européennes.",
          de: "Recherche seltener Manuskripte und wissenschaftlicher Abhandlungen über die digitalen IUB-Bestände."
        }
      },
      {
        quarter: "Q3",
        title: {
          ar: "معادلة المؤلفات السابقة",
          en: "Prior Publications & Credits Transfer",
          it: "Equiparazione Pubblicazioni Precedenti",
          fr: "Validation des Acquis & Publications Antérieures",
          de: "Anrechnung früherer Veröffentlichungen"
        },
        desc: {
          ar: "تقديم الكتب المنشورة أو المطبوعات ذات القيمة العلمية للاستفادة من تخفيض الساعات المعتمدة المطلوبة.",
          en: "Using the European branch's specific clause to equate published reference books and transfer relevant research units.",
          it: "Opportunità eccezionale per convalidare monografie preesistenti e convertire ricerche in crediti formativi (ECTS).",
          fr: "Validation de monographies ou d'ouvrages publiés pour accélérer le parcours d'études via des crédits.",
          de: "Möglichkeit, bereits veröffentlichte Fachbücher und wissenschaftliche Arbeiten zur Notenverkürzung anzurechnen."
        }
      },
      {
        quarter: "Q4",
        title: {
          ar: "التقييم السنوي للتقدم البحثي",
          en: "Annual Academic Progress Report",
          it: "Valutazione Annuale del Progresso",
          fr: "Rapport Annuel d'Avancement",
          de: "Jährlicher Zwischenbericht zur Forschung"
        },
        desc: {
          ar: "إرسال ملخص الفصول الثلاثة الأولى للمشرف العلمي والحصول على تقييم المرشد الأكاديمي.",
          en: "Submitting formal drafts of initial methodology chapters to the assigned supervisor for annual audit clearance.",
          it: "Presentazione della bozza dei primi capitoli metodologici al proprio relatore per il superamento dell'anno.",
          fr: "Présentation des premiers chapitres méthodologiques au jury d'évaluation pour valider le passage en année supérieure.",
          de: "Einreichung der Entwürfe der ersten Kapitel beim Betreuer zur Freigabe des nächsten Forschungsabschnitts."
        }
      }
    ]
  },
  {
    year: 3,
    yearTitle: {
      ar: "السنة الثالثة: صياغة الأطروحة والندوات",
      en: "Year 3: Synthesis & Scientific Symposia",
      it: "Anno 3: Sintesi & Seminari Scientifici",
      fr: "Année 3 : Rédaction & Colloques Scientifiques",
      de: "Jahr 3: Synthese & Wissenschaftliche Seminare"
    },
    yearSub: {
      ar: "المشاركة المؤتمرية، إعداد وتأليف فصول الرسالة",
      en: "Active journal submissions, thesis formulation, and regional panels",
      it: "Presentazioni accademiche, pubblicazione su riviste e stesura finale della tesi",
      fr: "Publications intermédiaires, formulation finale de la thèse et présentations",
      de: "Wissenschaftliche Veröffentlichungen, Ausarbeitung der Dissertation & Kolloquien"
    },
    icon: <LineChart className="w-5 h-5 text-indigo-500" />,
    color: "indigo",
    milestones: [
      {
        quarter: "Q1",
        title: {
          ar: "النشر العلمي والتحكيم",
          en: "Scientific Journal Publications",
          it: "Pubblicazione di Articoli Scientifici",
          fr: "Publication dans des Revues Arbitrées",
          de: "Veröffentlichung in Fachzeitschriften"
        },
        desc: {
          ar: "نشر دراسة علمية واحدة على الأقل في إحدى المجلات المحكمة التابعة لفرع أوروبا أو المجلات الشريكة.",
          en: "Publishing peer-reviewed conference papers or journal articles in collaboration with Middle East or European partners.",
          it: "Pubblicazione di paper di ricerca peer-reviewed in giornali accademici accreditati nazionali o internazionali.",
          fr: "Publication d'articles scientifiques ou contributions dans des revues accréditées par l'université.",
          de: "Veröffentlichung von peer-reviewten Fachartikeln in wissenschaftlichen Journalen der IUB oder Partnernetzwerken."
        }
      },
      {
        quarter: "Q2 - Q3",
        title: {
          ar: "حلقات نقاشية محلية",
          en: "Doctoral Colloquiums & Research Days",
          it: "Colloqui di Dottorato e Giornate di Ricerca",
          fr: "Colloques Doctoraux & Tables Rondes",
          de: "Doktorandenkolloquium & Forschungstage"
        },
        desc: {
          ar: "المشاركة كباحث في الندوات والمناقشات المغلقة لعرض الخطوط العامة لرسالتك وتبادل الآراء العلمية.",
          en: "Defending interim scientific findings before a panel of regional professors during private study weeks.",
          it: "Discussione interinale dei risultati di ricerca davanti a un pannello di docenti della filiale durante le sessioni estive.",
          fr: "Soutenance à mi-parcours des premiers résultats empiriques devant un panel de professeurs.",
          de: "Präsentation von Teilergebnissen vor einem Fachgremium regionaler Prüfer zur Qualitätssicherung."
        }
      },
      {
        quarter: "Q4",
        title: {
          ar: "مراجعة الصياغة الشاملة للرسالة",
          en: "Full Draft Submission",
          it: "Sottomissione della Bozza Completa",
          fr: "Soumission de la Version Complète du Manuscrit",
          de: "Einreichung des vollständigen Dissertationsentwurfs"
        },
        desc: {
          ar: "فحص الافتراضات اللغوية، واختبار الأمانة العلمية عبر برامج كشف الانتحال المعتمدة.",
          en: "Passing rigorous plagiarism audits and finalizing editorial guidelines for layout and formatting structures.",
          it: "Verifica anti-plagio ufficiale e formattazione secondo le linee editoriali del Senato Accademico.",
          fr: "Passage du manuscrit au logiciel anti-plagiat universitaire et mise en page finale selon les normes de l'établissement.",
          de: "Durchführung der Plagiatsprüfung und finale sprachliche sowie formale Überarbeitung nach akademischen Vorgaben."
        }
      }
    ]
  },
  {
    year: 4,
    yearTitle: {
      ar: "السنة الرابعة: المناقشة والاعتماد والتخرج",
      en: "Year 4: Thesis Defense & Graduation",
      it: "Anno 4: Discussione della Tesi & Laurea",
      fr: "Année 4 : Soutenance de Thèse & Remise des Diplômes",
      de: "Jahr 4: Dispitation & Graduierung"
    },
    yearSub: {
      ar: "لجان التحكيم الموفدة، وتوزيع الشهادات المصدقة من بروكسل",
      en: "Local and virtual defense boards, Brussels seals & grand graduations",
      it: "Commissioni di difesa in presenza o virtuali, firma dei titoli e cerimonie europee",
      fr: "Jurys d'examen, apposition des sceaux de Bruxelles et remise solennelle",
      de: "Verteidigung vor Ort, Verleihung der Brüsseler Promotionsurkunde & feierlicher Abschluss"
    },
    icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
    color: "amber",
    milestones: [
      {
        quarter: "Q1",
        title: {
          ar: "تشكيل لجنة المناقشة العلمية",
          en: "Defense Board Appointment",
          it: "Nomina della Commissione Giudicatrice",
          fr: "Constitution du Jury d'Examen",
          de: "Bestellung der Prüfungskommission"
        },
        desc: {
          ar: "اعتماد أسماء المناقش الداخلي والخارجي، وتخصيص موعد ومكان انعقاد الجلسة في بلد الباحث.",
          en: "Nominating main examination experts and academic examiners. Setting defensive venues in the student's country of residence.",
          it: "Nomina formale dei controrelatori esterni. Organizzazione logistica della sede d'esame nel paese dello studente.",
          fr: "Nomination des rapporteurs externes et président du jury. Organisation de la soutenance dans le pays de résidence.",
          de: "Ernennung der Erst- und Zweitgutachter sowie Festlegung des Termins im Heimatland des Forschenden."
        }
      },
      {
        quarter: "Q2 - Q3",
        title: {
          ar: "مناقشة الأطروحة والرسالة",
          en: "Official Scientific Public Defense",
          it: "Discussione Sotto il Profilo Accademico",
          fr: "Soutenance Solennelle de Thèse",
          de: "Mündliche Prüfung & Verteidigung (Disputation)"
        },
        desc: {
          ar: "عرض مرئي مدته 45 دقيقة يليها مناقشة علنية أمام لجنة الترخيص الأكاديمية وحضور عام.",
          en: "A 45-minute slide presentation outlining major original contributions before academic board members.",
          it: "Presentazione e difesa pubblica delle tesi davanti alla commissione mista inviata dalla sede centrale.",
          fr: "Présentation orale publique de 45 minutes résumant vos apports majeurs suivie des questions du jury.",
          de: "Vortrag und wissenschaftliche Aussprache vor der Prüfungskommission und der Universitätsöffentlichkeit."
        }
      },
      {
        quarter: "Q4",
        title: {
          ar: "ختم بروكسل وتخريج الدفعة",
          en: "Conferred Degree & Official Seal",
          it: "Rilascio Diplomi con Sigillo di Bruxelles",
          fr: "Collation des Grades & Sceau Officiel de Bruxelles",
          de: "Verleihung des akademischen Grades & Brüsseler Stempel"
        },
        desc: {
          ar: "تسليم الشهادات المصدقة من الإدارة الرئيسية بروكسل، وتكريم الأوائل وحفظة كتاب الله.",
          en: "Degrees issued, certified, and officially countersigned by Brussels admin. Commemoration and special awards for Quran memorizers.",
          it: "Iscrizione nei registri dei laureati ed emissione del diploma con autenticazione in Belgio e premi per memorizzatori.",
          fr: "Émission du diplôme revêtu des timbres administratifs belges originaux et félicitations du recteur.",
          de: "Ausstellung und Beglaubigung der Urkunde an der Hauptuniversität in Brüssel mit Auszeichnungen für besondere Leistungen."
        }
      }
    ]
  }
];

const LOCALIZED_LABELS: Record<string, Record<string, string>> = {
  ar: {
    badge: "رحلة البحث والتحصيل العلمي",
    heading: "الخارطة الأكاديمية للانتساب والدراسات العليا",
    sub: "فهم تدرج السنوات الدراسية بفرع أوروبا، من اللحظة الأولى للقبول وتدقيق الملفات وحتى استلام شهادتك المصدقة من بروكسل.",
    trackBtn: "تتبع تقدم طلبك الجاري",
    accelerateNotice: "💡 هل ترغب في تسريع دراستك؟ يمكنك معادلة أبحاثك السابقة فور إرسال الطلب.",
    curriculumYear: "السنة",
    milestoneCaps: "المهام والجدول الزمني:",
    completedState: "مكتمل",
    currentState: "نشط",
    futureState: "مخطط"
  },
  en: {
    badge: "RESEARCH PATHWAY & JOURNEY",
    heading: "Academic Studies Roadmap",
    sub: "Navigate your 4-year thesis development timeline from the first day of application scanning up to international graduation.",
    trackBtn: "Track Ongoing Admissions status",
    accelerateNotice: "💡 Want to speed up graduation? Ask our coordinators to equate your published books/papers.",
    curriculumYear: "Year",
    milestoneCaps: "Milestones Schedule:",
    completedState: "Completed",
    currentState: "Active",
    futureState: "Planned"
  },
  it: {
    badge: "PERCORSO ACCADEMICO DI ECCELLENZA",
    heading: "Roadmap Accademica e Tappe",
    sub: "Un cammino strutturato in quattro anni che ti guiderà dallo screening iniziale fino alla cerimonia di proclamazione ufficiale.",
    trackBtn: "Traccia la tua iscrizione",
    accelerateNotice: "💡 Vuoi abbreviare i tempi? Informati sulla convalida dei crediti scientifici per i tuoi libri editi.",
    curriculumYear: "Anno",
    milestoneCaps: "Fasi del Programma:",
    completedState: "Completato",
    currentState: "Attivo",
    futureState: "Pianificato"
  },
  fr: {
    badge: "PARCOURS DOCTORAL & RECHERCHE",
    heading: "Feuille de Route de la Réussite",
    sub: "Suivez l'évolution de vos études sur 4 ans, du dépôt initial de vos pièces justificatives jusqu'au diplôme revêtu du sceau.",
    trackBtn: "Suivre l'état de pré-inscription",
    accelerateNotice: "💡 Diplôme accéléré ? Validez vos publications en cours lors de la soumission de votre dossier.",
    curriculumYear: "Année",
    milestoneCaps: "Étapes et Échéances :",
    completedState: "Validé",
    currentState: "En cours",
    futureState: "À venir"
  },
  de: {
    badge: "FORSCHUNGSWEG & PROMOTION",
    heading: "Akademischer Studienverlauf",
    sub: "Ihr strukturierter Weg durch das 4-jährige Studium – von der ersten Anmeldung über die Forschungskolloquien bis zur Promotion.",
    trackBtn: "Bewerbungsstatus einsehen",
    accelerateNotice: "💡 Studiendauer verkürzen? Lassen Sie Ihre publizierten Bücher und Arbeiten anrechnen.",
    curriculumYear: "Jahr",
    milestoneCaps: "Meilensteine & Zeitplan:",
    completedState: "Abgeschlossen",
    currentState: "Aktiv",
    futureState: "Geplant"
  }
};

export const AcademicRoadmap: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = LOCALIZED_LABELS[currentLang] || LOCALIZED_LABELS["en"];
  const [selectedYear, setSelectedYear] = useState<number>(1);

  // Active Year Data Filter Helper
  const activeYearData = ROADMAP_DATA.find((y) => y.year === selectedYear) || ROADMAP_DATA[0];

  return (
    <section id="academic-roadmap" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-b border-gray-100 relative overflow-hidden text-gray-900">
      {/* Visual glowing geometric background markers */}
      <div className="absolute top-1/4 left-5 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-5 w-[350px] h-[350px] bg-blue-500/3 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Upper Editorial Header Content */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-black text-[11px] mb-4 uppercase tracking-widest border border-emerald-500/15">
            <Star className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight max-w-3xl mx-auto">
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm mt-3.5 leading-relaxed font-semibold">
            {t.sub}
          </p>
        </div>

        {/* 4-Year Large Interactive Navigation Grid Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          {ROADMAP_DATA.map((y) => {
            const isActive = selectedYear === y.year;
            return (
              <button
                key={y.year}
                onClick={() => setSelectedYear(y.year)}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 text-start relative group cursor-pointer flex flex-col justify-between ${
                  isActive 
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-950/20 scale-[1.03] z-10" 
                    : "bg-white border-gray-150 hover:border-gray-300 hover:shadow-md hover:bg-slate-50/50"
                }`}
              >
                {/* Year numeric icon overlay */}
                <div className={`absolute top-4 right-4 text-3xl font-black select-none pointer-events-none ${isActive ? 'text-white/5' : 'text-slate-100 group-hover:text-slate-200'}`}>
                  0{y.year}
                </div>

                <div className="space-y-4">
                  {/* Color category badge */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-slate-800' : 'bg-slate-50 text-gray-700'}`}>
                    {y.icon}
                  </div>

                  <div>
                    <h4 className="text-[11px] font-black tracking-widest uppercase text-[#94a3b8]">
                      {t.curriculumYear} 0{y.year}
                    </h4>
                    <span className="text-xs sm:text-[13px] font-extrabold mt-1 block leading-tight">
                      {y.yearTitle[currentLang] || y.yearTitle["en"]}
                    </span>
                  </div>
                </div>

                {/* Decorative baseline handle indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeYearUnderbar"
                    className="absolute bottom-0 inset-x-8 h-1 bg-emerald-400 rounded-t-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Year Milestone Schedule Panels */}
        <div className="bg-white border border-gray-150 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          
          {/* Subtle background visual pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10"></div>

          <div className="space-y-8">
            
            {/* Year Title Block */}
            <div className={`border-b border-gray-100 pb-5 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[10px] font-black">
                  YEAR 0{activeYearData.year} ACTIVE PLAN
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-950 mt-2.5 leading-snug">
                {activeYearData.yearTitle[currentLang] || activeYearData.yearTitle["en"]}
              </h3>
              <p className="text-gray-500 text-xs font-semibold mt-1 max-w-3xl leading-relaxed">
                {activeYearData.yearSub[currentLang] || activeYearData.yearSub["en"]}
              </p>
            </div>

            {/* Milestones grid list with scroll-triggered-style motion transition stagger */}
            <div className="space-y-6">
              <h5 className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                {t.milestoneCaps}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activeYearData.milestones.map((m, idx) => (
                  <motion.div
                    key={`${selectedYear}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-slate-50/50 hover:bg-slate-50 border border-gray-150/80 hover:border-emerald-500/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Corner Quarter Label Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-white text-slate-700 border border-gray-200 text-[9px] font-black tracking-wider uppercase font-sans">
                      {m.quarter}
                    </div>

                    <div className="space-y-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-xs select-none">
                        ✓
                      </div>

                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <h4 className="text-xs sm:text-[13px] font-black text-gray-950 group-hover:text-[#0b4d37] transition-colors leading-snug">
                          {m.title[currentLang] || m.title["en"]}
                        </h4>
                        <p className="text-gray-500 text-[11px] font-semibold mt-2 leading-relaxed">
                          {m.desc[currentLang] || m.desc["en"]}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100/60 mt-4 flex items-center justify-between text-[9px] font-extrabold tracking-wider uppercase">
                      <span className="text-slate-450">{isRtl ? "سياق الإنجاز" : "ACADEMIC TERM"}</span>
                      <span className="text-emerald-600">{m.quarter}</span>
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>

            {/* Helpful Acceleration Notice Footer bar inside the card */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 font-bold text-center sm:text-start leading-relaxed max-w-xl">
                {t.accelerateNotice}
              </p>

              <a
                href="#admission-portal"
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-950 text-white hover:bg-slate-800 transition text-[11px] font-black tracking-wide cursor-pointer text-center"
              >
                {t.trackBtn}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
