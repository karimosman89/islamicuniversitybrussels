import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  MapPin, 
  TrendingUp, 
  CheckCircle, 
  MessageSquare, 
  Layers, 
  ChevronRight, 
  X, 
  Users, 
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';

interface AlumniNetworkProps {
  currentLang: string;
  isRtl?: boolean;
}

const LOCALIZATION: Record<string, any> = {
  ar: {
    sectionBadge: "شبكة الخريجين والأثر العالمي",
    sectionTitle: "إنجازات الخريجين ورواد الأعمال الأخلاقيين",
    sectionSub: "شغل خريجونا مناصب ريادية كأئمة، ومستشارين فقهيين، وباحثين لغويين، وممثلي هيئات حوار ديني في كبرى العواصم الأوروبية والعالم الإسلامي.",
    alumniGradYear: "دفعة تخرج:",
    alumniRole: "المنصب والمسار الحالي:",
    alumniAchievement: "الأثر الميداني البارز:",
    applyMentorshipBtn: "انضم لشبكة الإرشاد المهني للخريجين",
    mentorFormTitle: "طلب حجز مرشد فقهي من الخريجين المعتمدين",
    mentorSuccess: "تم تسجيلك بنجاح في نظام الإرشاد المهني! سيتواصل معك مرشدك المباشر في غضون أيام.",
    formName: "الاسم التراكمي للطالب",
    formEmail: "بريدك الجامعي",
    formInterests: "مجال الاهتمام المهني المفضل",
    btnConfirmMentorship: "تأكيد طلب التنسيب لمرشد",
    closeBtn: "إغلاق",
    placementsHeader: "مؤشر توظيف الخريجين في أوروبا - عام 2026",
    percentPlacement: "نسبة شغل المناصب الأكاديمية والميدانية:",
    academicPlacement: "الإرشاد والترجمة",
    legalCounseling: "الاستشارة الفقهية والقضاء",
    communityImamate: "الإمامة والتنمية المجتمعية"
  },
  en: {
    sectionBadge: "Alumni Network & Social Impact",
    sectionTitle: "Alumni Achievements & Global Leadership",
    sectionSub: "BIU graduates actively lead as spiritual advisors, legal consultants, Arabic translators, and inter-faith delegates across European capitals & the Islamic world.",
    alumniGradYear: "Class of:",
    alumniRole: "Current Appointment:",
    alumniAchievement: "Key Social Impact:",
    applyMentorshipBtn: "Apply for Alumni Mentorship Alignment",
    mentorFormTitle: "Request Alumni Theological Mentor Assignment",
    mentorSuccess: "Successfully registration! Your designated senior theological mentor will email you shortly.",
    formName: "Student Registered Name",
    formEmail: "Registered Student Email Address",
    formInterests: "Primary Professional Aspiration",
    btnConfirmMentorship: "Submit Mentorship Placement Request",
    closeBtn: "Close Portfolio",
    placementsHeader: "Graduate Academic Placement Index - 2026",
    percentPlacement: "Placement Success Ratio:",
    academicPlacement: "Research & Professional Translation",
    legalCounseling: "Islamic Finance & Juristic Advisory",
    communityImamate: "Imamate & Interfaith Integration Roles"
  },
  it: {
    sectionBadge: "Rete Alumni e Impatto nel Mondo",
    sectionTitle: "Successi dei Nostri Laureati nel Mondo",
    sectionSub: "I laureati del BIU guidano come imam, consulenti legali ed esperti linguistici nelle capitali europee.",
    alumniGradYear: "Classe di laurea:",
    alumniRole: "Incarico Attuale:",
    alumniAchievement: "Impatto Sociale Principale:",
    applyMentorshipBtn: "Richiedi Affiancamento Mentor Alumni",
    mentorFormTitle: "Modulo di Mentoring Accademico Professionale",
    mentorSuccess: "Richiesta registrata! Un laureato del comitato ti contatterà presto.",
    formName: "Nome Completo dello Studente",
    formEmail: "Email Universitaria",
    formInterests: "Area di Interesse Professionale",
    btnConfirmMentorship: "Invia Richiesta di Mentoring",
    closeBtn: "Chiudi",
    placementsHeader: "Indice di Occupazione dei Laureati - Anno 2026",
    percentPlacement: "Tasso di Collocamento Accademico:",
    academicPlacement: "Ricerca & Traduzione Professionale",
    legalCounseling: "Consulenza Giuridica ed Economia",
    communityImamate: "Guida Comunitaria e Coesione Sociale"
  },
  de: {
    sectionBadge: "Alumni-Netzwerk & Sozialer Impact",
    sectionTitle: "Alumni-Erfolge & Globale Führungsverantwortung",
    sectionSub: "Absolventen der BIU arbeiten erfolgreich als Seelsorger, Rechtsberater, Dolmetscher und interreligiöse Vermittler in europäischen Metropolen.",
    alumniGradYear: "Abschlussjahr:",
    alumniRole: "Aktuelle Position:",
    alumniAchievement: "Soziales Engagement:",
    applyMentorshipBtn: "Alumni-Mentoring-Programm anfordern",
    mentorFormTitle: "Zuteilung eines theologischen Mentors anfordern",
    mentorSuccess: "Erfolgreich registriert! Ihr zugewiesener Mentor wird sich in Kürze mit Ihnen in Verbindung setzen.",
    formName: "Name des Studierenden",
    formEmail: "Ihre E-Mail-Adresse",
    formInterests: "Gewünschter beruflicher Schwerpunkt",
    btnConfirmMentorship: "Mentoring-Anfrage abschicken",
    closeBtn: "Schließen",
    placementsHeader: "Akademischer Beschäftigungsindex der Absolventen - 2026",
    percentPlacement: "Vermittlungsquote der Absolventen:",
    academicPlacement: "Forschung & Fachübersetzen",
    legalCounseling: "Islamische Finanzen & Rechtsberatung",
    communityImamate: "Gemeindearbeit & gesellschaftlicher Dialog"
  },
  fr: {
    sectionBadge: "Réseau des Alumni & Impact Réel",
    sectionTitle: "Réussites de nos Diplômés & Leadership Éthique",
    sectionSub: "Les lauréats de l'UIB s'investissent activement comme conseillers théologiques, traducteurs agréés et médiateurs interreligieux en Europe occidentale.",
    alumniGradYear: "Promotion :",
    alumniRole: "Mandat Actuel :",
    alumniAchievement: "Impact Communautaire Majeur :",
    applyMentorshipBtn: "Demander un parrainage par un Alumnus",
    mentorFormTitle: "Demande d'attribution de Mentor Professionnel",
    mentorSuccess: "Inscription validée ! Votre mentor diplômé prendra contact avec vous par courriel.",
    formName: "Nom Complet de l'Étudiant",
    formEmail: "Adresse Courriel Étudiante",
    formInterests: "Aspiration Professionnelle Principale",
    btnConfirmMentorship: "Valider la Demande de Parrainage",
    closeBtn: "Fermer",
    placementsHeader: "Indice d'Insertion Professionnelle des Diplômés - 2026",
    percentPlacement: "Taux moyen d'insertion active :",
    academicPlacement: "Recherche Académique & Traduction",
    legalCounseling: "Conseil Juridique & Finance Éthique",
    communityImamate: "Imamat & Médiations Pluralistes"
  }
};

const ALUMNI_DATA = [
  {
    id: "alum_1",
    name: {
      ar: "الشيخ يوسف بن جلال التونسي",
      en: "Sheikh Youssef Bin Jalal",
      it: "Sheikh Youssef Bin Jalal",
      de: "Scheich Youssef Bin Jalal",
      fr: "Cheikh Youssef Bin Jalal"
    },
    gradYear: "2023",
    degree: "Master in Sharia & Juristic Adaptation",
    role: {
      ar: "رئيس مركز الفتوى والوفاق الاجتماعي، برلين، ألمانيا",
      en: "Head of Juristic Reconciliation Council, Berlin, Germany",
      it: "Presidente del Consiglio di Riconciliazione, Berlino",
      de: "Leiter des Rates für theologische Vermittlung, Berlin",
      fr: "Président du Conseil de Réconciliation Sociale, Berlin"
    },
    achievement: {
      ar: "أسس مبادرة التوعية المالية الإسلامية والمشاركة الحرفية في ألمانيا، وساعد في إطلاق 20 مشروعاً تمويلياً خالياً من الفوائد للشباب.",
      en: "Pioneered the Sharia-compliant local micro-loan framework in Germany, financing 20 craft startup entities safely.",
      it: "Ha promosso il quadro dei micro-prestiti halal in Germania, finanziando oltre 20 attività commerciali di giovani studenti.",
      de: "Etablierte zinsfreie Mikro-Finanzierungskonzepte in Deutschland, was zur Gründung von 20 Handwerksbetrieben führte.",
      fr: "A initié le cadre d'évaluation de micro-finance éthique à Berlin, finançant 20 nouvelles entreprises artisanales."
    },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    country: "Germany"
  },
  {
    id: "alum_2",
    name: {
      ar: "أ. أمينة روسو البلجيكية",
      en: "Prof. Amina Rousseau",
      it: "Prof.ssa Amina Rousseau",
      de: "Prof. Amina Rousseau",
      fr: "Emmanuelle Amina Rousseau"
    },
    gradYear: "2022",
    degree: "Ph.D. in Arabic Linguistics & Quranic Rhetoric",
    role: {
      ar: "مستشارة الترجمة ومقارنة النصوص في المعهد الأوروبي ببروكسل",
      en: "Linguistic Heritage Advisor & State Translator, Brussels",
      it: "Consulente Linguistica e Traduttrice Ufficiale UE, Bruxelles",
      de: "Sprachberaterin & staatlich anerkannte Übersetzerin, Brüssel",
      fr: "Conseillère Linguistique & Traductrice Assermentée, Bruxelles"
    },
    achievement: {
      ar: "حققت ترجمة لأهم معاجم النحو الكلاسيكي وتوفيره للمحاكم والأكاديميات الأوروبية، وعززت المناهج التربوية لتفادي الفهم المغلوط للنصوص.",
      en: "Translated major classical syntax archives into legal French/English databases for inter-civilizational governmental reference.",
      it: "Ha tradotto importanti archivi di sintassi classica in database francesi/inglesi per la consultazione governativa.",
      de: "Übersetzte historische arabische Grammatiken in europäische Sprachen zur Förderung des interkulturellen Verständnisses.",
      fr: "A traduit d'importants répertoires de grammaire classique pour le compte d'institutions publiques de médiation en Belgique."
    },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    country: "Belgium"
  },
  {
    id: "alum_3",
    name: {
      ar: "د. عبد السلام فاني الإيطالي",
      en: "Dr. Abdelsalam Fani",
      it: "Dr. Abdelsalam Fani",
      de: "Dr. Abdelsalam Fani",
      fr: "Dr Abdelsalam Fani"
    },
    gradYear: "2021",
    degree: "Ph.D. in Usul al-Din & Interfaith Relations",
    role: {
      ar: "منسق حوار الحضارات بالمؤسسة الإسلامية للدراسات، روما",
      en: "Head of Inter-Faith Scholastic Dialogue, Rome, Italy",
      it: "Membro d'Onore del Dialogo Interreligioso, Roma",
      de: "Leiter des interreligiösen Dialogforums, Rom",
      fr: "Directeur de l'Espace de Coopération Pluraliste, Rome"
    },
    achievement: {
      ar: "ألقى مئات الندوات العلمية بمكامن الجامعات الإيطالية لبث الفهم الوسطي المعتدل المأخوذ عن منهج الجامعة الإسلامية.",
      en: "Organized over 120 key summits across Italy advocating classic theological moderation and historical inter-faith treaties.",
      it: "Ha coordinato oltre 120 conferenze in tutta Italia per spiegare il messaggio accademico di moderazione e comprensione teologica.",
      de: "Leitete über 120 Symposien in Italien, um theologische Mäßigung und interreligiöse Verständigung zu stärken.",
      fr: "Coordinateur de 120 tables rondes en Italie valorisant l'équilibre scolastique théologique et le respect des libertés."
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    country: "Italy"
  }
];

export function AlumniNetwork({ currentLang, isRtl = false }: AlumniNetworkProps) {
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];
  const [activeAlumnus, setActiveAlumnus] = useState<any | null>(null);
  
  // Mentorship simulation states
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [jobGoal, setJobGoal] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexDir = isRtl ? 'flex-row-reverse' : 'flex-row';

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowMentorForm(false);
      setStudentName("");
      setStudentEmail("");
      setJobGoal("");
    }, 4000);
  };

  return (
    <section id="alumni-network" className="py-24 bg-slate-900 border-t border-slate-950 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_top,rgba(59,130,246,0.05),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-indigo-500/15">
            🌍 {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.sectionSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Alumni cards slider */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALUMNI_DATA.map((alum) => {
                const aName = alum.name[currentLang as any] || alum.name["en"];
                const aRole = alum.role[currentLang as any] || alum.role["en"];
                
                return (
                  <div
                    key={alum.id}
                    onClick={() => setActiveAlumnus(alum)}
                    className="p-5 bg-slate-950/40 hover:bg-slate-950/75 border border-slate-900 hover:border-slate-800 transition duration-300 rounded-2xl cursor-pointer flex flex-col justify-between h-64 text-left relative"
                    id={`alumni-card-${alum.id}`}
                  >
                    <div className="space-y-3">
                      <div className={`flex items-center gap-3.5 ${flexDir}`}>
                        <img 
                          src={alum.avatar} 
                          alt={aName} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-850 shrink-0"
                        />
                        <div className={textAlignment}>
                          <h4 className="text-sm font-extrabold text-white tracking-tight">
                            {aName}
                          </h4>
                          <span className="text-[9px] text-indigo-400 font-mono block mt-0.5">
                            🎓 {alum.degree}
                          </span>
                        </div>
                      </div>

                      <p className={`text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-3 ${textAlignment}`}>
                        "{alum.achievement[currentLang as any] || alum.achievement["en"]}"
                      </p>
                    </div>

                    <div className={`flex justify-between items-center border-t border-slate-900/60 pt-3 text-[9px] text-slate-500 font-mono ${flexDir}`}>
                      <span>
                        📌 {alum.country}
                      </span>
                      <span className="bg-slate-900 px-2 py-0.5 rounded text-indigo-350 font-bold">
                        {t.alumniGradYear} {alum.gradYear}
                      </span>
                    </div>

                    {/* Small aesthetic corner dot */}
                    <div className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                );
              })}
            </div>

            {/* Application call to action button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowMentorForm(true)}
                className="w-full py-4.5 px-6 bg-gradient-to-r from-indigo-650 to-blue-650 hover:from-indigo-600 hover:to-blue-650 text-white font-black text-xs rounded-2xl transition duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-950/30 cursor-pointer"
              >
                <Users className="w-4 h-4 text-emerald-450" />
                <span>{t.applyMentorshipBtn}</span>
              </button>
            </div>
          </div>

          {/* Right panel: Static recruitment placements index metrics */}
          <div className="lg:col-span-4 bg-slate-950/50 rounded-3xl border border-slate-900 p-6 space-y-6">
            <div className={textAlignment}>
              <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.placementsHeader}</span>
              </h4>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-400">
              <div className="space-y-2">
                <div className={`flex justify-between ${flexDir}`}>
                  <span>{t.communityImamate}</span>
                  <span className="text-white font-mono text-[10px]">92%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[92%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className={`flex justify-between ${flexDir}`}>
                  <span>{t.academicPlacement}</span>
                  <span className="text-white font-mono text-[10px]">78%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[78%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className={`flex justify-between ${flexDir}`}>
                  <span>{t.legalCounseling}</span>
                  <span className="text-white font-mono text-[10px]">85%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[85%]"></div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-900 text-[10px] text-slate-450 leading-relaxed font-semibold">
              ✨ {currentLang === 'ar'
                ? "دعم مستمر للتوظيف بالتعاون مع مجمع البحوث والممثليات الأوروبية والمراكز الحوارية الشريكة."
                : "Continuous career counseling alignment in partnership with major European federations and certified inter-faith entities."}
            </div>
          </div>

        </div>

        {/* Detailed Alumnus Focus Modal */}
        <AnimatePresence>
          {activeAlumnus && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveAlumnus(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl relative z-10 p-6 sm:p-8 text-left"
                id="alumni-details-modal"
              >
                <button
                  type="button"
                  onClick={() => setActiveAlumnus(null)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white transition p-1 rounded-lg"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div className={`flex items-start gap-4 pb-4 border-b border-slate-800 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <img 
                      src={activeAlumnus.avatar} 
                      alt={activeAlumnus.name[currentLang] || activeAlumnus.name["en"]} 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0 shadow-lg"
                    />
                    <div>
                      <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-500/10 text-indigo-400 tracking-wider">
                        Class of {activeAlumnus.gradYear} Representative
                      </span>
                      <h3 className="text-md sm:text-lg font-black text-white mt-1">
                        {activeAlumnus.name[currentLang] || activeAlumnus.name["en"]}
                      </h3>
                      <p className="text-[10.5px] text-slate-400 font-bold">
                        {activeAlumnus.degree}
                      </p>
                    </div>
                  </div>

                  {/* Profile information */}
                  <div className="space-y-4.5 text-xs leading-relaxed">
                    <div className="space-y-1">
                      <span className={`block text-[9px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                        {t.alumniRole}
                      </span>
                      <p className={`text-white font-bold leading-snug ${textAlignment}`}>
                        💼 {activeAlumnus.role[currentLang] || activeAlumnus.role["en"]}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className={`block text-[9px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                        {t.alumniAchievement}
                      </span>
                      <p className={`text-slate-300 font-semibold italic ${textAlignment}`}>
                        "{activeAlumnus.achievement[currentLang] || activeAlumnus.achievement["en"]}"
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveAlumnus(null)}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-750 text-slate-400 hover:text-white transition rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {t.closeBtn}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Mentorship Registration Modal */}
        <AnimatePresence>
          {showMentorForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMentorForm(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl relative z-10 p-6 sm:p-8 text-left"
                id="mentorship-registration-modal"
              >
                <button
                  type="button"
                  onClick={() => setShowMentorForm(false)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white transition p-1 rounded-lg"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className={`text-md sm:text-lg font-black text-white tracking-tight mb-4 uppercase ${textAlignment}`}>
                  🤝 {t.mentorFormTitle}
                </h3>

                <p className={`text-[11px] text-slate-450 leading-relaxed mb-4 ${textAlignment}`}>
                  {currentLang === 'ar'
                    ? "يقوم هذا النظام بربط طلاب فرع بلجيكا الحاليين بمرشدين من كبار الخريجين والباحثين المعتمدين لتوجيه طموحاتهم البحثية والمهنية."
                    : "This form initiates automated matching of current Brussels students with registered alumni, providing advisory channels for career and research pursuits."}
                </p>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-900/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-bold flex items-center gap-2.5"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>{t.mentorSuccess}</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleMentorSubmit} className="space-y-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-400 block">{t.formName}</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className={`w-full bg-slate-950 text-white placeholder-slate-700 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
                        placeholder="e.g. Arkan Marschall"
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-400 block">{t.formEmail}</label>
                      <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className={`w-full bg-slate-950 text-white placeholder-slate-700 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
                        placeholder="e.g. mail@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-400 block">{t.formInterests}</label>
                      <select
                        value={jobGoal}
                        onChange={(e) => setJobGoal(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-left"
                        required
                      >
                        <option value="">-- {currentLang === 'ar' ? 'اختر مسارك المهني المفضل' : 'Select Career Pipeline'} --</option>
                        <option value="imamate">{t.communityImamate}</option>
                        <option value="research">{t.academicPlacement}</option>
                        <option value="banking">{t.legalCounseling}</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-indigo-650 to-indigo-550 hover:from-indigo-600 hover:to-indigo-500 text-white text-xs font-black rounded-xl transition duration-200 shadow-md shadow-indigo-950/40 cursor-pointer mt-2"
                    >
                      {t.btnConfirmMentorship}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
