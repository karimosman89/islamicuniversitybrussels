import React, { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Check, 
  FolderPlus, 
  GraduationCap, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StudentDashboardProps {
  currentLang: string;
  isRtl?: boolean;
}

const DASHBOARD_LOCALIZATION: Record<string, any> = {
  ar: {
    title: "لوحة تحكم الطالب الأكاديمية",
    subtitle: "متابعة فورية للمقررات النشطة، الواجبات والدرجات الجارية",
    currentCourses: "المقررات الجارية",
    upcomingAssignments: "الواجبات والمهام القادمة",
    gradeOverview: "مؤشرات تقييم الدرجات والتقدم",
    courseCode: "الرمز",
    grade: "الدرجة",
    progress: "التقدم الحالي",
    credits: "الوحدات الدراسية",
    instructor: "عضو التدريس",
    dueDate: "تاريخ الاستحقاق",
    weight: "الوزن الأكاديمي",
    status: "الحالة",
    statusSubmitted: "تم التسليم",
    statusPending: "قيد الانتظار",
    statusOverdue: "متأخر",
    submitText: "تسليم ملف الواجب",
    gpaTarget: "المستهدف التراكمي",
    statsAttendance: "حضور المحاضرات",
    statsActive: "المقررات النشطة",
    statsAssignments: "الواجبات المتبقية",
    statsAvg: "المعدل الجاري",
    congratulations: "مستوى رائع! أنت ضمن أفضل 5% في دفعتك الأكاديمية لهذا الفصل.",
    assignmentDetails: "تفاصيل المهمة الأكاديمية",
    feedback: "التقييم والملاحظات الزاوية",
    submitSuccess: "تم تسليم المهمة بنجاح وتشفيرها في الخادم الأكاديمي!",
    coursesList: [
      { id: "c1", code: "FIQ-502", name: "الفقه والفتوى المقارن", grade: "94%", progress: 94, credits: "4 ECTS", instructor: "د. عبد الصمد الإدريسي", color: "from-emerald-500 to-teal-600" },
      { id: "c2", code: "HDT-514", name: "علوم الحديث ونقد المتن", grade: "88%", progress: 88, credits: "3 ECTS", instructor: "أ.د. يوسف القحطاني", color: "from-blue-500 to-indigo-600" },
      { id: "c3", code: "ARB-589", name: "اللسانيات العربية والنحو", grade: "92%", progress: 92, credits: "3 ECTS", instructor: "د. مريم الحسيني", color: "from-purple-500 to-pink-600" },
      { id: "c4", code: "USL-510", name: "أصول الفقه والمقاصد", grade: "96%", progress: 96, credits: "4 ECTS", instructor: "أ.د. طارق السويدان", color: "from-amber-500 to-orange-650" }
    ],
    assignmentsList: [
      { id: "a1", course: "FIQ-502", name: "دراسة حالة: فتاوى النوازل المالية المعاصرة", due: "21 يونيو 2026", weight: "15%", status: "pending", desc: "كتابة تقرير تحليلي من 5 صفحات يقارن بين الفتاوى الصادرة عن مجامع الفقه الإسلامي الكبرى بخصوص العملات المشفرة وعقود التحوط الذكية." },
      { id: "a2", course: "HDT-514", name: "تحقيق وبحث سند حديث عائشة في الصيام", due: "25 يونيو 2026", weight: "20%", status: "pending", desc: "تطبيق مناهج المحدثين ونقد المتن والبحث التاريخي في تراجم الرواة على السند مع مقارنة المتون وعلل الحديث المذكورة." },
      { id: "a3", course: "USL-510", name: "مقال بحثي: مقاصد الشريعة في تشجيع بيئات الأوقاف", due: "18 يونيو 2026", weight: "10%", status: "submitted", desc: "تحليل معمق للأبعاد الاقتصادية والاجتماعية المترتبة على الأوقاف المعاصرة في القارة الأوروبية وتطبيق المقاصد الضرورية الخمسة عليها." },
      { id: "a4", course: "ARB-589", name: "ورقة عمل: تحليل الخطاب القرآني في سورة الكهف", due: "30 يونيو 2026", weight: "15%", status: "pending", desc: "استخراج الأوجه البلاغية والتركيب النحوي الدقيق لعدد 10 آيات من السورة مع شرح العلاقة بين الألفاظ السياقية والدلالية." }
    ]
  },
  en: {
    title: "Student Academic Dashboard",
    subtitle: "Real-time overview of active courses, submissions & grade monitoring",
    currentCourses: "Current Enrolled Courses",
    upcomingAssignments: "Upcoming Academic Assignments",
    gradeOverview: "Mastery Progress & Grade Monitor",
    courseCode: "Code",
    grade: "Grade",
    progress: "Current Progress",
    credits: "Credits",
    instructor: "Dean / Instructor",
    dueDate: "Due Date",
    weight: "Weight",
    status: "Status",
    statusSubmitted: "Submitted",
    statusPending: "Pending",
    statusOverdue: "Overdue",
    submitText: "Submit Deliverable",
    gpaTarget: "Target GPA",
    statsAttendance: "Class Attendance",
    statsActive: "Active Courses",
    statsAssignments: "Items Remaining",
    statsAvg: "Current average",
    congratulations: "Excellent standing! You are currently in the top 5% of class performance metrics for this semester.",
    assignmentDetails: "Assignment Worksheet Details",
    feedback: "Dean's Feedback Notes",
    submitSuccess: "Academic artifact successfully submitted and encrypted in the portal servers!",
    coursesList: [
      { id: "c1", code: "FIQ-502", name: "Fiqh & Comparative Jurisprudence", grade: "94%", progress: 94, credits: "4 ECTS", instructor: "Dr. Abdelsamad Al-Idrisi", color: "from-emerald-500 to-teal-600" },
      { id: "c2", code: "HDT-514", name: "Hadith Hermeneutics & Textual Criticism", grade: "88%", progress: 88, credits: "3 ECTS", instructor: "Prof. Dr. Youssef Al-Qahtani", color: "from-blue-500 to-indigo-600" },
      { id: "c3", code: "ARB-589", name: "Arabic Linguistics & High Grammar", grade: "92%", progress: 92, credits: "3 ECTS", instructor: "Dr. Mariam Al-Husseini", color: "from-purple-500 to-pink-600" },
      { id: "c4", code: "USL-510", name: "Usool al-Fiqh & Divine Legis. Theory", grade: "96%", progress: 96, credits: "4 ECTS", instructor: "Prof. Dr. Tariq Al-Suwaidan", color: "from-amber-500 to-orange-650" }
    ],
    assignmentsList: [
      { id: "a1", course: "FIQ-502", name: "Case Study: Contemporary Financial Fatawa", due: "June 21, 2026", weight: "15%", status: "pending", desc: "Write a 5-page critical comparative analysis of resolutions on cryptocurrency and digital hedge contracts from major global Islamic jurisprudence academies." },
      { id: "a2", course: "HDT-514", name: "Hermeneutic Verification: Chains of Hadith Aisha", due: "June 25, 2026", weight: "20%", status: "pending", desc: "Apply canonical criticism methods to investigate historical biographies and reconcile apparent chains discrepancies in modern translations." },
      { id: "a3", course: "USL-510", name: "Research Essay: Shariah Objectives & Modern Awqaf", due: "June 18, 2026", weight: "10%", status: "submitted", desc: "Detailed investigation mapping socio-economic impacts of European Islamic endowments to the core preservation of standard higher tenets of legislation." },
      { id: "a4", course: "ARB-589", name: "Grammar Analysis: Rhetoric in Surat Al-Kahf", due: "June 30, 2026", weight: "15%", status: "pending", desc: "Deconstruct the deep syntactical, morphological, and discursive structure of 10 primary verses from the chapter, using classical commentary engines." }
    ]
  },
  it: {
    title: "Cruscotto Accademico della Studente",
    subtitle: "Panoramica in tempo reale dei corsi attivi, compiti e monitoraggio dei voti",
    currentCourses: "Corsi Attivi Iscritti",
    upcomingAssignments: "Compiti & Scadenze Accademiche",
    gradeOverview: "Progresso di Padronanza & Voti",
    courseCode: "Codice",
    grade: "Voto",
    progress: "Progresso Corrente",
    credits: "Crediti",
    instructor: "Docente / Istruttore",
    dueDate: "Data di Scadenza",
    weight: "Peso",
    status: "Stato",
    statusSubmitted: "Inviato",
    statusPending: "In Sospeso",
    statusOverdue: "In Ritardo",
    submitText: "Invia Elaborato",
    gpaTarget: "Media Obiettivo",
    statsAttendance: "Frequenza Lezioni",
    statsActive: "Corsi Attivi",
    statsAssignments: "Compiti Rimasti",
    statsAvg: "Media Corrente",
    congratulations: "Eccellente! Attualmente sei nel miglior 5% della tua classe per rendimento in questo semestre.",
    assignmentDetails: "Dettagli del Compito Accademico",
    feedback: "Miglioramenti Raccomandati",
    submitSuccess: "Elaborato caricato e crittografato sul server accademico con successo!",
    coursesList: [
      { id: "c1", code: "FIQ-502", name: "Fiqh & Giurisprudenza Comparata", grade: "94%", progress: 94, credits: "4 ECTS", instructor: "Dr. Abdelsamad Al-Idrisi", color: "from-emerald-500 to-teal-600" },
      { id: "c2", code: "HDT-514", name: "Ermeneutica del Hadith & Critica Testuale", grade: "88%", progress: 88, credits: "3 ECTS", instructor: "Prof. Dr. Youssef Al-Qahtani", color: "from-blue-500 to-indigo-600" },
      { id: "c3", code: "ARB-589", name: "Linguistica Araba & Sintassi Avanzata", grade: "92%", progress: 92, credits: "3 ECTS", instructor: "Dr. Mariam Al-Husseini", color: "from-purple-500 to-pink-600" },
      { id: "c4", code: "USL-510", name: "Usool al-Fiqh & Teoria delle Leggi Divine", grade: "96%", progress: 96, credits: "4 ECTS", instructor: "Prof. Dr. Tariq Al-Suwaidan", color: "from-amber-500 to-orange-650" }
    ],
    assignmentsList: [
      { id: "a1", course: "FIQ-502", name: "Studio di Caso: Fatawa Finanziarie Contemporanee", due: "21 Giugno 2026", weight: "15%", status: "pending", desc: "Scrivere un'analisi comparativa di 5 pagine sulle decisioni relative a criptovalute e contratti di copertura digitali delle principali accademie di fiqh." },
      { id: "a2", course: "HDT-514", name: "Verifica Ermeneutica: Catene del Hadith Aisha", due: "25 Giugno 2026", weight: "20%", status: "pending", desc: "Applicare metodi di critica canonica per indagare le biografie storiche e riconciliare discrepanze nelle moderne traduzioni." },
      { id: "a3", course: "USL-510", name: "Saggio di Ricerca: Obiettivi Shariah & Awqaf Moderni", due: "18 Giugno 2026", weight: "10%", status: "submitted", desc: "Indagine approfondita sull'impatto socio-economico delle fondazioni islamiche europee per la conservazione dei principi giuridici." },
      { id: "a4", course: "ARB-589", name: "Analisi Grammaticale: Retorica in Surat Al-Kahf", due: "30 Giugno 2026", weight: "15%", status: "pending", desc: "Smontare la struttura sintattica avanzata e discorsiva di 10 versi primari del capitolo con i tradizionali motori di commento." }
    ]
  },
  de: {
    title: "Akademisches Studierenden-Dashboard",
    subtitle: "Echtzeit-Übersicht aktiver Kurse, Einreichungen & Notenüberwachung",
    currentCourses: "Aktive eingeschriebene Kurse",
    upcomingAssignments: "Anstehende akademische Aufgaben",
    gradeOverview: "Fortschritts- und Notenübersicht",
    courseCode: "Code",
    grade: "Note",
    progress: "Aktueller Fortschritt",
    credits: "ECTS-Punkte",
    instructor: "Dozent / Prüfer",
    dueDate: "Fälligkeit",
    weight: "Gewichtung",
    status: "Status",
    statusSubmitted: "Eingereicht",
    statusPending: "Ausstehend",
    statusOverdue: "Überfällig",
    submitText: "Leistung einreichen",
    gpaTarget: "Notenziel (GPA)",
    statsAttendance: "Vorlesungsteilnahme",
    statsActive: "Aktive Kurse",
    statsAssignments: "Aufgaben offen",
    statsAvg: "Aktueller Schnitt",
    congratulations: "Hervorragende Leistung! Sie gehören in diesem Semester zu den besten 5 % Ihres Jahrgangs.",
    assignmentDetails: "Aufgaben-Arbeitsblatt-Details",
    feedback: "Anmerkungen des Dekans",
    submitSuccess: "Akademische Arbeit erfolgreich eingereicht und im Portal verschlüsselt!",
    coursesList: [
      { id: "c1", code: "FIQ-502", name: "Fiqh & Vergleichende Jurisprudenz", grade: "94%", progress: 94, credits: "4 ECTS", instructor: "Dr. Abdelsamad Al-Idrisi", color: "from-emerald-500 to-teal-600" },
      { id: "c2", code: "HDT-514", name: "Hadith-Hermeneutik & Textkritik", grade: "88%", progress: 88, credits: "3 ECTS", instructor: "Prof. Dr. Youssef Al-Qahtani", color: "from-blue-500 to-indigo-600" },
      { id: "c3", code: "ARB-589", name: "Arabische Linguistik & Höhere Grammatik", grade: "92%", progress: 92, credits: "3 ECTS", instructor: "Dr. Mariam Al-Husseini", color: "from-purple-500 to-pink-600" },
      { id: "c4", code: "USL-510", name: "Usool al-Fiqh & Gesetzestheorie", grade: "96%", progress: 96, credits: "4 ECTS", instructor: "Prof. Dr. Tariq Al-Suwaidan", color: "from-amber-500 to-orange-650" }
    ],
    assignmentsList: [
      { id: "a1", course: "FIQ-502", name: "Fallstudie: Zeitgenössische finanzielle Fatawa", due: "21. Juni 2026", weight: "15%", status: "pending", desc: "Schreiben Sie eine 5-seitige kritische Vergleichsanalyse von Beschlüssen zu Kryptowährungen und digitalen Absicherungsverträgen großer Fiqh-Akademien." },
      { id: "a2", course: "HDT-514", name: "Hermeneutische Verifizierung: Hadith Aisha Urkunden", due: "25. Juni 2026", weight: "20%", status: "pending", desc: "Wenden Sie kanonische Methoden an, um die historischen Überlieferungen und Diskrepanzen in modernen Übersetzungen zu bewerten." },
      { id: "a3", course: "USL-510", name: "Forschungsaufsatz: Shariah-Ziele & Modernes Awqaf", due: "18. Juni 2026", weight: "10%", status: "submitted", desc: "Detaillierte Untersuchung des sozioökonomischen Einflusses europäischer islamischer Stiftungen auf die Erhaltung höherer Rechtsprinzipien." },
      { id: "a4", course: "ARB-589", name: "Grammatikanalyse: Rhetorik in Sure Al-Kahf", due: "30. Juni 2026", weight: "15%", status: "pending", desc: "Strukturelle Analyse von 10 ausgesuchten Versen des Kapitels mithilfe klassischer und moderner linguistischer Kommentierungswerkzeuge." }
    ]
  },
  fr: {
    title: "Tableau de Bord Académique Étudiant",
    subtitle: "Aperçu en temps réel des cours actifs, des devoirs et du suivi des notes",
    currentCourses: "Cours Actifs Enregistrés",
    upcomingAssignments: "Devoirs & Échéances Académiques",
    gradeOverview: "Progression de la Maîtrise & Notes",
    courseCode: "Code",
    grade: "Note",
    progress: "Progression Actuelle",
    credits: "Crédits",
    instructor: "Enseignant / Instructeur",
    dueDate: "Date Limite",
    weight: "Poids",
    status: "Statut",
    statusSubmitted: "Soumis",
    statusPending: "En Attente",
    statusOverdue: "En Retard",
    submitText: "Soumettre l'Évaluation",
    gpaTarget: "Moyenne Ciblée",
    statsAttendance: "Présence aux Cours",
    statsActive: "Cours Actifs",
    statsAssignments: "Devoirs Restants",
    statsAvg: "Moyenne Actuelle",
    congratulations: "Excellent niveau! Vous êtes actuellement dans les 5% des meilleurs éléments de votre promotion ce semestre.",
    assignmentDetails: "Détails de la Fiche de Devoir",
    feedback: "Remarques du Doyen",
    submitSuccess: "Travail académique soumis et chiffré dans le portail universitaire avec succès!",
    coursesList: [
      { id: "c1", code: "FIQ-502", name: "Fiqh & Jurisprudence Comparée", grade: "94%", progress: 94, credits: "4 ECTS", instructor: "Dr. Abdelsamad Al-Idrisi", color: "from-emerald-500 to-teal-600" },
      { id: "c2", code: "HDT-514", name: "Herméneutique du Hadith & Critique de Textes", grade: "88%", progress: 88, credits: "3 ECTS", instructor: "Prof. Dr. Youssef Al-Qahtani", color: "from-blue-500 to-indigo-600" },
      { id: "c3", code: "ARB-589", name: "Linguistique Arabe & Haute Grammaire", grade: "92%", progress: 92, credits: "3 ECTS", instructor: "Dr. Mariam Al-Husseini", color: "from-purple-500 to-pink-600" },
      { id: "c4", code: "USL-510", name: "Usool al-Fiqh & Théorie Législative", grade: "96%", progress: 96, credits: "4 ECTS", instructor: "Prof. Dr. Tariq Al-Suwaidan", color: "from-amber-500 to-orange-650" }
    ],
    assignmentsList: [
      { id: "a1", course: "FIQ-502", name: "Étude de Cas: Fatawa Financières Contemporaines", due: "21 Juin 2026", weight: "15%", status: "pending", desc: "Rédiger une analyse comparative de 5 pages sur les résolutions des cryptomonnaies et des contrats de couverture par les grandes académies de jurisprudence." },
      { id: "a2", course: "HDT-514", name: "Vérification Herméneutique: Chaînes du Hadith Aisha", due: "25 Juin 2026", weight: "20%", status: "pending", desc: "Appliquer les méthodes de critique canonique pour analyser les biographies historiques et concilier les divergences des traductions modernes." },
      { id: "a3", course: "USL-510", name: "Essai de Recherche: Objectifs Shariah & Awqaf Modernes", due: "18 Juin 2026", weight: "10%", status: "submitted", desc: "Analyse approfondie de l'impact socio-économique des fondations islamiques européennes au regard de la préservation des principes fondamentaux." },
      { id: "a4", course: "ARB-589", name: "Analyse de la Grammaire: Rhétorique de la Sourate Al-Kahf", due: "30 Juin 2026", weight: "15%", status: "pending", desc: "Analyse structurelle syntaxique et discursive de 10 versets clés du chapitre à l'aide des outils classiques d'exégèse." }
    ]
  }
};

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentLang,
  isRtl = false
}) => {
  const t = DASHBOARD_LOCALIZATION[currentLang] || DASHBOARD_LOCALIZATION["en"];
  
  // Interactive Dynamic States
  const [courses, setCourses] = useState<any[]>(t.coursesList);
  const [assignments, setAssignments] = useState<any[]>(t.assignmentsList);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync to language updates
  React.useEffect(() => {
    setCourses(t.coursesList);
    setAssignments(t.assignmentsList);
    setSelectedAssignment(null);
    setSubmissionFeedback("");
  }, [currentLang]);

  // Statistics Calculation
  const averageGrade = 92.5;
  const attendanceRate = "98.4%";
  const activeCount = courses.length;
  const pendingCount = assignments.filter(a => a.status === "pending").length;

  const handleSimulateSubmit = (id: string) => {
    setIsSubmitting(true);
    setSubmissionFeedback("");
    
    setTimeout(() => {
      setAssignments(prev => 
        prev.map(item => item.id === id ? { ...item, status: "submitted" } : item)
      );
      setSubmissionFeedback(t.submitSuccess);
      setIsSubmitting(false);

      // Automatically hide details/success alert after 3 seconds
      setTimeout(() => {
        setSubmissionFeedback("");
        setSelectedAssignment(null);
      }, 3000);
    }, 1500);
  };

  const textAlignment = isRtl ? "text-right" : "text-left";
  const flexDir = isRtl ? "flex-row-reverse" : "flex-row";

  return (
    <div className="space-y-6">
      
      {/* 1. Quick Micro stats counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: t.statsAttendance,
            value: attendanceRate,
            desc: isRtl ? "نسبة الالتزام والنشاط" : "Active presence & live logs",
            colors: "border-teal-500/20 bg-teal-500/5 text-teal-400",
            icon: <Clock className="w-4 h-4 text-teal-400" />
          },
          {
            label: t.statsActive,
            value: activeCount,
            desc: isRtl ? "مقررات معتمدة بجدولك" : "Syllabus courses assigned",
            colors: "border-blue-500/20 bg-blue-500/5 text-blue-400",
            icon: <BookOpen className="w-4 h-4 text-blue-400" />
          },
          {
            label: t.statsAssignments,
            value: pendingCount,
            desc: isRtl ? "واجبات تحتاج لإتمام" : "Pending workload items",
            colors: "border-amber-500/20 bg-amber-500/5 text-amber-500",
            icon: <FileText className="w-4 h-4 text-amber-500" />
          },
          {
            label: t.statsAvg,
            value: `${averageGrade}%`,
            desc: isRtl ? "التقييم التراكمي المئوي" : "Class Rank: Top 5%",
            colors: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
            icon: <TrendingUp className="w-4 h-4 text-emerald-400" />
          }
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-3.5 rounded-xl border ${stat.colors} flex flex-col justify-between space-y-1.5 transition hover:scale-[1.01]`}
          >
            <div className={`flex justify-between items-center ${flexDir}`}>
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
                {stat.label}
              </span>
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-extrabold font-mono tracking-tight text-white mt-1">
                {stat.value}
              </p>
              <p className="text-[9px] text-slate-400 block truncate mt-0.5 font-medium">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Honor roll notification banner */}
      <div className={`p-3.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3 ${flexDir}`}>
        <div className="p-1.5 bg-emerald-500/15 rounded-lg text-emerald-400">
          <Sparkles className="w-4 h-4 animate-bounce" />
        </div>
        <p className={`text-[10px] sm:text-xs text-emerald-350 font-black leading-snug flex-1 ${textAlignment}`}>
          {t.congratulations}
        </p>
      </div>

      {/* 2. Central Split Container: Courses Progress List + Assignments Track */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Courses & visual grades progress bar (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/85 p-5 rounded-2xl border border-slate-900 space-y-5">
          <div className={`flex items-center gap-2 pb-2.5 border-b border-slate-900 ${flexDir}`}>
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs font-black uppercase text-white tracking-wide">
              {t.currentCourses}
            </h4>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="p-3.5 bg-slate-900/60 border border-slate-850 rounded-xl space-y-2.5 hover:border-slate-800 transition"
              >
                {/* Course Metadata header */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 ${flexDir}`}>
                  <div className={textAlignment}>
                    <div className={`flex items-center gap-2 ${flexDir}`}>
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 bg-slate-950 text-emerald-450 border border-emerald-500/10 rounded">
                        {course.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {course.credits}
                      </span>
                    </div>
                    <p className="text-xs font-black text-white mt-1">
                      {course.name}
                    </p>
                  </div>
                  
                  {/* Instructor detail */}
                  <div className={`sm:text-right text-slate-500 text-[10px] font-semibold ${textAlignment}`}>
                    <span className="block text-slate-400">{course.instructor}</span>
                  </div>
                </div>

                {/* VISUAL PROGRESS BARS FOR GRADE OVERVIEW */}
                <div className="space-y-1">
                  <div className={`flex justify-between items-center text-[10px] font-mono ${flexDir}`}>
                    <span className="text-slate-450 font-bold">{t.progress}</span>
                    <span className="text-emerald-400 font-extrabold">{course.grade}</span>
                  </div>
                  
                  {/* Visual nested glass-fill track bar */}
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-850 relative group/track">
                    <motion.div 
                      className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Upcoming Assignments & submission (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/85 p-5 rounded-2xl border border-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            <div className={`flex items-center gap-2 pb-2.5 border-b border-slate-900 ${flexDir}`}>
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h4 className="text-xs font-black uppercase text-white tracking-wide">
                {t.upcomingAssignments}
              </h4>
            </div>

            {/* List of workload */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {assignments.map((assign) => {
                const isItemSubmitted = assign.status === "submitted";
                return (
                  <button
                    key={assign.id}
                    type="button"
                    onClick={() => {
                      setSelectedAssignment(assign);
                      setSubmissionFeedback("");
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition relative flex flex-col gap-2 cursor-pointer ${
                      selectedAssignment?.id === assign.id
                        ? "bg-slate-900 border-indigo-500/80"
                        : "bg-slate-900/40 border-slate-850 hover:bg-slate-900/80 hover:border-slate-800"
                    }`}
                  >
                    <div className={`flex justify-between items-start gap-2 w-full ${flexDir}`}>
                      <div className={`flex-1 ${textAlignment}`}>
                        <div className={`flex items-center gap-1.5 mb-1 ${flexDir}`}>
                          <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">
                            {assign.course}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold">
                            {t.weight}: {assign.weight}
                          </span>
                        </div>
                        <h5 className="text-[11px] font-extrabold text-white leading-snug">
                          {assign.name}
                        </h5>
                      </div>

                      {/* Status indicator pill */}
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase shrink-0 border ${
                        isItemSubmitted
                          ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse"
                      }`}>
                        {isItemSubmitted ? t.statusSubmitted : t.statusPending}
                      </span>
                    </div>

                    <div className={`flex justify-between items-center text-[9px] text-slate-500 border-t border-slate-900/60 pt-1.5 w-full ${flexDir}`}>
                      <span className="font-semibold block">{t.dueDate}: {assign.due}</span>
                      <span className="text-indigo-400 font-bold inline-flex items-center gap-0.5">
                        {isRtl ? "التفاصيل" : "View"} <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed drawer / card view of active workload item */}
          <AnimatePresence mode="wait">
            {selectedAssignment && (
              <motion.div
                key={selectedAssignment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mt-4 p-4 bg-slate-900 border border-slate-800 rounded-xl relative ${textAlignment}`}
              >
                <div className={`flex justify-between items-center mb-1.5 ${flexDir}`}>
                  <h6 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                    📌 {t.assignmentDetails}
                  </h6>
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="text-[9px] font-black text-slate-500 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[10px] font-extrabold text-white leading-normal mb-1">
                  {selectedAssignment.name}
                </p>
                <p className="text-[9px] text-slate-400 leading-relaxed font-semibold">
                  {selectedAssignment.desc}
                </p>

                {/* Submissions feedback error or alerts */}
                {submissionFeedback && (
                  <div className={`p-2 bg-emerald-950/40 border border-emerald-900/40 rounded-lg text-[9px] text-emerald-400 font-bold mt-3 leading-normal flex items-center gap-1.5 ${flexDir}`}>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                    <span>{submissionFeedback}</span>
                  </div>
                )}

                {/* Action deliverable button */}
                {selectedAssignment.status === "pending" && !submissionFeedback && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSimulateSubmit(selectedAssignment.id)}
                    className="w-full mt-3 py-2 px-3 rounded-lg text-[10px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>{isRtl ? "جاري الرفع والتدقيق..." : "Uploading Worksheet Core..."}</span>
                      </>
                    ) : (
                      <>
                        <FolderPlus className="w-3.5 h-3.5" />
                        <span>{t.submitText}</span>
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};
