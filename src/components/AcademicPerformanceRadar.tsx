import React, { useState } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Award, ShieldAlert, Sparkles, TrendingUp, BookOpen, Layers } from "lucide-react";
import { motion } from "motion/react";

interface AcademicPerformanceRadarProps {
  currentLang: string;
  isRtl?: boolean;
}

const LOCALIZATION: Record<string, any> = {
  ar: {
    title: "رادار التحصيل الأكاديمي",
    subtitle: "مؤشرات التمكن العلمي لمواد الطالب التراكمية",
    studentScore: "مستوى التمكن الشخصي",
    averageScore: "متوسط الدفعة الأكاديمي",
    hoverGuide: "انقر على أي تخصص لإظهار تحليل الدورة التدريبية والمقرر الأكاديمي التفصيلي.",
    masteryLevel: "مستوى التمكن العلمي:",
    gradeExplanation: "التقييم العام للمادة:",
    excellence: "امتياز معمر (الربع الأول)",
    advanced: "متمكن ومتقدم",
    credits: "ساعات معتمدة ومكتسبة (S2)",
    subjects: {
      fiqh: "الفقه والفتوى المقارن",
      hadith: "علوم الحديث ونقد المتن",
      arabic: "اللسانيات العربية والنحو",
      usool: "أصول الفقه والمقاصد",
      finance: "المالية الإسلامية والأوقاف",
      advocacy: "المرافعة والقضاء الشرعي"
    },
    descriptions: {
      fiqh: "إتقان فروع ومسائل المذاهب الأربعة، الفقه النوازلي المعاصر، وضوابط صياغة الفتوى الشرعية.",
      hadith: "تمييز صحة السند والمتن، مناهج المحدثين، وخبرة المقارنة وتعديل الرواة بالدراية التامة.",
      arabic: "التطبيق الإعجازي، الإعراب المتقدم، تحليل الخطاب القرآني ومستويات الشعر العربي القديم.",
      usool: "أدلة الأحكام الكلية والتبعية، استنباط الأحكام الشرعية وقوانين الموازنة والمقاصد الشرعية الخمسة.",
      finance: "أحكام المعاملات المالية، عقود المشاركة والمضاربة، والتدقيق الشرعي للمصارف والأوقاف.",
      advocacy: "أصول المرافعة أمام اللجان الشرعية، فقه القضاء والشهادات وصنع البينات والحجج القانونية."
    }
  },
  en: {
    title: "Academic Performance Radar",
    subtitle: "Real-time Mastery Analysis Across Scholastic Disciplines",
    studentScore: "Your Mastery Level",
    averageScore: "Faculty Average",
    hoverGuide: "Click on any discipline to view dedicated academic curriculum & course insights.",
    masteryLevel: "Subject Mastery:",
    gradeExplanation: "Academic Evaluation:",
    excellence: "Academic Distinction (Top 5%)",
    advanced: "Highly Proficient Mastery",
    credits: "European Standard ECTS (S2)",
    subjects: {
      fiqh: "Fiqh & Jurisprudence",
      hadith: "Hadith Hermeneutics",
      arabic: "Arabic Linguistics & Grammar",
      usool: "Usool al-Fiqh (Legislation Theory)",
      finance: "Islamic Finance & Awqaf",
      advocacy: "Comparative Legal Advocacy"
    },
    descriptions: {
      fiqh: "Mastery of classic and modern schools of legal thought, contemporary jurisprudential fatwa models.",
      hadith: "Critical analysis of transmission chains (Isnad), structural text analysis, and biographical evaluation.",
      arabic: "Advanced syntactical analysis (Nahw), morphological grammar (Sarf), and high-level Quranic rhetoric.",
      usool: "Methodologies of legal reasoning, general legal maxims, and the preservation of five higher divine intents.",
      finance: "Legal framework of transactions, financial contracts, Islamic banking regulations, and socio-economic Awqaf.",
      advocacy: "Theory of Islamic litigation, forensic adjudication, comparative judicial review, and advocacy ethics."
    }
  },
  it: {
    title: "Radar delle Prestazioni Accademiche",
    subtitle: "Analisi della Padronanza Disciplinare nello Spazio di Studio",
    studentScore: "Tuo Livello di Padronanza",
    averageScore: "Media di Facoltà",
    hoverGuide: "Fai clic su una disciplina per visualizzare i dettagli del curriculum accademico.",
    masteryLevel: "Padronanza della materia:",
    gradeExplanation: "Valutazione Accademica:",
    excellence: "Distinzione Accademica (Top 5%)",
    advanced: "Altamente Competente",
    credits: "Crediti Standard Europei ECTS (S2)",
    subjects: {
      fiqh: "Fiqh & Giurisprudenza",
      hadith: "Ermeneutica del Hadith",
      arabic: "Linguistica e Sintassi Araba",
      usool: "Usool al-Fiqh (Teoria Legislativa)",
      finance: "Finanza Islamica e Awqaf",
      advocacy: "Patrocinio Legale Comparato"
    },
    descriptions: {
      fiqh: "Padronanza delle scuole classiche e moderne di pensiero giuridico, modelli di sentenze contemporanee.",
      hadith: "Analisi critica delle catene di trasmissione, analisi del testo e valutazione storiografica.",
      arabic: "Analisi sintattica avanzata (Nahw), grammatica morfologica (Sarf) e retorica coranica di alto livello.",
      usool: "Metodologie di ragionamento giuridico, massime legali e gli obiettivi superiori della giurisprudenza.",
      finance: "Quadro giuridico delle transazioni, contratti bancari conformi alla Shariah, regolamenti e Awqaf.",
      advocacy: "Teoria del contenzioso islamico, decisione legale, processo decisionale comparato ed etica legatista."
    }
  },
  de: {
    title: "Akademisches Leistungsradar",
    subtitle: "Echtzeit-Beherrschungsanalyse der akademischen Disziplinen",
    studentScore: "Ihr Beherrschungsgrad",
    averageScore: "Fakultätsschnitt",
    hoverGuide: "Klicken Sie auf eine Disziplin, um Details zum Studienprogramm anzuzeigen.",
    masteryLevel: "Fachkompetenz:",
    gradeExplanation: "Akademische Bewertung:",
    excellence: "Akademische Auszeichnung (Top 5%)",
    advanced: "Hervorragende Fachkompetenz",
    credits: "Europäische ECTS-Standardpunkte (S2)",
    subjects: {
      fiqh: "Fiqh & Jurisprudenz",
      hadith: "Hadith-Hermeneutik",
      arabic: "Arabische Linguistik & Syntax",
      usool: "Usool al-Fiqh (Gesetzestheorie)",
      finance: "Islamische Finanzen & Awqaf",
      advocacy: "Vergleichende Rechtsvertretung"
    },
    descriptions: {
      fiqh: "Beherrschung klassischer und moderner Rechtsschulen, zeitgenössische Fatwa-Modelle.",
      hadith: "Kritische Analyse von Überlieferungsketten (Isnad), Textstrukturanalyse und biographische Bewertung.",
      arabic: "Fortgeschrittene syntaktische Analyse (Nahw), morphologische Grammatik (Sarf) und koranische Rhetorik.",
      usool: "Methoden der juristischen Begründung, allgemeine Rechtsmaximen und Erhaltung der höheren Ziele.",
      finance: "Rechtlicher Rahmen von Transaktionen, Finanzverträgen, islamischen Bankenvorschriften und Awqaf.",
      advocacy: "Theorie islamischer Rechtsstreitigkeiten, Gerichtsentscheidungen, Rechtsvergleichung und Anwaltsethik."
    }
  },
  fr: {
    title: "Radar de Performance Académique",
    subtitle: "Analyse en Temps Réel de la Maîtrise des Disciplines",
    studentScore: "Votre Niveau de Maîtrise",
    averageScore: "Moyenne de Faculté",
    hoverGuide: "Cliquez sur une discipline pour afficher les détails du programme d'études.",
    masteryLevel: "Maîtrise du Sujet:",
    gradeExplanation: "Évaluation Académique:",
    excellence: "Distinction Académique (Top 5%)",
    advanced: "Hautement Compétent",
    credits: "Crédits Standards Européens ECTS (S2)",
    subjects: {
      fiqh: "Fiqh & Jurisprudence",
      hadith: "Herméneutique du Hadith",
      arabic: "Linguistique & Syntaxe Arabe",
      usool: "Usool al-Fiqh (Théorie Législative)",
      finance: "Finance Islamique & Awqaf",
      advocacy: "Plaidoyer Juridique Comparé"
    },
    descriptions: {
      fiqh: "Maîtrise des écoles de pensée juridique classiques et modernes, modèles de fatwas contemporaines.",
      hadith: "Analyse critique des chaînes de transmission, analyse structurelle des textes et évaluation biographique.",
      arabic: "Analyse syntaxique avancée (Nahw), grammaire morphologique (Sarf) et haute rhétorique coranique.",
      usool: "Méthodologies du raisonnement juridique, maximes juridiques générales et préservation des buts supérieurs.",
      finance: "Cadre juridique des transactions, contrats conformes à la Shari'ah, réglementation bancaire et Awqaf.",
      advocacy: "Théorie du contentieux islamique, arbitrage légal, contrôle judiciaire comparatif et déontologie."
    }
  }
};

const CHART_DATA = [
  { subjectKey: "fiqh", score: 94, average: 75 },
  { subjectKey: "hadith", score: 88, average: 72 },
  { subjectKey: "arabic", score: 92, average: 78 },
  { subjectKey: "usool", score: 96, average: 70 },
  { subjectKey: "finance", score: 85, average: 68 },
  { subjectKey: "advocacy", score: 90, average: 74 }
];

export const AcademicPerformanceRadar: React.FC<AcademicPerformanceRadarProps> = ({
  currentLang,
  isRtl = false
}) => {
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];
  
  // Interactive selected discipline state to drill-down info below
  const [selectedKey, setSelectedKey] = useState<string>("usool");
  const [comparisonMode, setComparisonMode] = useState<"both" | "student" | "average">("both");

  // Formulate localized chart data
  const localizedData = CHART_DATA.map(item => ({
    ...item,
    subjectName: t.subjects[item.subjectKey] || item.subjectKey
  }));

  // Safe accessor for detail item
  const selectedItem = CHART_DATA.find(i => i.subjectKey === selectedKey) || CHART_DATA[3];

  const handleChartClick = (state: any) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      const clickedKey = state.activePayload[0].payload.subjectKey;
      if (clickedKey) {
        setSelectedKey(clickedKey);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-5 sm:p-6 bg-slate-950/90 border border-slate-800 rounded-2xl relative shadow-xl overflow-hidden mt-6"
    >
      {/* Decorative tech grid accents */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-900 mb-5 ${isRtl ? "text-right" : "text-left"}`}>
        <div className="space-y-1">
          <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-450">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
              {t.title}
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Comparison toggle pills */}
        <div className="flex bg-slate-900 border border-slate-800/80 p-0.5 rounded-lg self-start text-[9px] font-bold">
          <button
            type="button"
            onClick={() => setComparisonMode("both")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${comparisonMode === "both" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
          >
            {isRtl ? "مقارن" : "Compare"}
          </button>
          <button
            type="button"
            onClick={() => setComparisonMode("student")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${comparisonMode === "student" ? "bg-emerald-650 text-white" : "text-slate-400 hover:text-white"}`}
          >
            {isRtl ? "مستواي" : "Mine"}
          </button>
          <button
            type="button"
            onClick={() => setComparisonMode("average")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${comparisonMode === "average" ? "bg-emerald-650 text-white" : "text-slate-400 hover:text-white"}`}
          >
            {isRtl ? "المتوسط" : "Average"}
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Detailed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Radar Map container (width: 7 cols) */}
        <div className="md:col-span-7 h-[250px] w-full relative flex items-center justify-center select-none">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="75%" 
              data={localizedData}
              onClick={handleChartClick}
            >
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="subjectName" 
                tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#475569', fontSize: 8 }}
              />
              
              {/* Conditional layers based on comparison pills */}
              {(comparisonMode === "both" || comparisonMode === "student") && (
                <Radar
                   name={t.studentScore}
                   dataKey="score"
                   stroke="#10b981"
                   fill="#10b981"
                   fillOpacity={0.25}
                   activeDot={{ r: 6, fill: '#059669' }}
                />
              )}

              {(comparisonMode === "both" || comparisonMode === "average") && (
                <Radar
                  name={t.averageScore}
                  dataKey="average"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.15}
                  activeDot={{ r: 4, fill: '#d97706' }}
                />
              )}

              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#020617', 
                  borderColor: '#1e293b', 
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
                itemStyle={{ color: '#f8fafc' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Explanatory notes & Drill-down details (width: 5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
          
          {/* Quick interactive Selector */}
          <div className="space-y-2">
            <label className={`text-[9px] font-black uppercase text-slate-400 tracking-wider block ${isRtl ? "text-right" : "text-left"}`}>
              {isRtl ? "📚 تصفح المقررات والتفاصيل:" : "📚 Explore Courses & Syllabus Details:"}
            </label>
            
            <div className={`flex flex-wrap gap-1.5 ${isRtl ? "justify-start flex-row-reverse" : "justify-start"}`}>
              {localizedData.map((item) => (
                <button
                  key={item.subjectKey}
                  type="button"
                  onClick={() => setSelectedKey(item.subjectKey)}
                  className={`px-2 py-1 rounded-lg text-[9px] font-bold border transition ${
                    selectedKey === item.subjectKey
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-350"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700/80 hover:text-slate-200"
                  } cursor-pointer`}
                >
                  {t.subjects[item.subjectKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Drill-down Highlight Card */}
          <div className={`p-4 bg-slate-900/60 border border-slate-850 rounded-xl relative ${isRtl ? "text-right" : "text-left"}`}>
            <div className="absolute top-2.5 right-2.5 text-slate-700 pointer-events-none">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            <h4 className="text-xs font-extrabold text-white mb-1">
              {t.subjects[selectedKey]}
            </h4>
            
            <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
              {t.descriptions[selectedKey]}
            </p>

            {/* Micro Stats inside Detail Panel */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-900/60">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">{t.masteryLevel}</p>
                <div className={`flex items-baseline gap-1 mt-1 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-sm font-mono font-extrabold text-emerald-400">
                    {selectedItem.score}%
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {isRtl ? "أنت" : "You"}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">{t.gradeExplanation}</p>
                <p className="text-[10px] font-extrabold text-amber-400 mt-1">
                  {selectedItem.score >= 90 ? t.excellence : t.advanced}
                </p>
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-2 text-[9px] text-slate-500 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500/80 shrink-0 mt-0.5" />
            <span>{t.hoverGuide}</span>
          </div>

        </div>

      </div>

      {/* Footer statistics indicator */}
      <div className={`mt-4 pt-3.5 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-[10px] text-slate-400 font-medium ${isRtl ? "flex-row-reverse" : ""}`}>
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>{t.credits}</span>
        </div>
        <div className={`flex items-center gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>{t.studentScore}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span>{t.averageScore}</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
};
