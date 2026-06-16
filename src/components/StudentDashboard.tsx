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
  Sparkles,
  Printer,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StudentDashboardProps {
  currentLang: string;
  isRtl?: boolean;
}

const INITIAL_SCHEDULE = [
  { id: "s1", day: "Monday", time: "09:00 - 11:00", courseCode: "FIQ-502", title: "Comparative Jurisprudence", type: "Core Lecture" },
  { id: "s2", day: "Monday", time: "13:00 - 15:00", courseCode: "ARB-589", title: "Arabic Linguistics Seminar", type: "Syllabus Session" },
  { id: "s3", day: "Tuesday", time: "10:00 - 12:00", courseCode: "USL-510", title: "Divine Legislative Theory", type: "Tutorial Lab" },
  { id: "s4", day: "Wednesday", time: "09:00 - 11:00", courseCode: "HDT-514", title: "Hadith Hermeneutics", type: "Research Group" },
  { id: "s5", day: "Wednesday", time: "14:00 - 16:00", courseCode: "FIQ-502", title: "Jurisprudence Practical Workshop", type: "Interactive Practice" },
  { id: "s6", day: "Thursday", time: "11:00 - 13:00", courseCode: "USL-510", title: "Seminar on Awqaf Endowments", type: "Review Presentation" },
  { id: "s7", day: "Thursday", time: "15:00 - 17:00", courseCode: "ARB-589", title: "Modern Linguistics Syntax Class", type: "Academic Colloquium" },
  { id: "s8", day: "Friday", time: "09:00 - 11:00", courseCode: "HDT-514", title: "Textual Criticism & Scribe Analysis", type: "Core Seminar" }
];

const LOCALIZED_DAYS: Record<string, Record<string, string>> = {
  en: { Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday", Thursday: "Thursday", Friday: "Friday" },
  ar: { Monday: "الاثنين", Tuesday: "الثلاثاء", Wednesday: "الأربعاء", Thursday: "الخميس", Friday: "الجمعة" },
  it: { Monday: "Lunedì", Tuesday: "Martedì", Wednesday: "Mercoledì", Thursday: "Giovedì", Friday: "Venerdì" },
  de: { Monday: "Montag", Tuesday: "Dienstag", Wednesday: "Mittwoch", Thursday: "Donnerstag", Friday: "Freitag" },
  fr: { Monday: "Lundi", Tuesday: "Mardi", Wednesday: "Mercredi", Thursday: "Jeudi", Friday: "Vendredi" }
};

const LOCALIZED_TYPES: Record<string, Record<string, string>> = {
  en: { "Core Lecture": "Core Lecture", "Syllabus Session": "Syllabus Session", "Tutorial Lab": "Tutorial Lab", "Research Group": "Research Group", "Interactive Practice": "Interactive Practice", "Review Presentation": "Review Presentation", "Academic Colloquium": "Academic Colloquium", "Core Seminar": "Core Seminar", "Personal Session": "Personal Session" },
  ar: { "Core Lecture": "محاضرة أساسية", "Syllabus Session": "جلسة مقرر دراسي", "Tutorial Lab": "مختبر توجيهي", "Research Group": "مجموعة بحثية", "Interactive Practice": "تدريب عملي تفاعلي", "Review Presentation": "عرض مراجعة", "Academic Colloquium": "ندوة أكاديمية", "Core Seminar": "سيمنار علمي", "Personal Session": "جلسة دراسة خاصة" },
  it: { "Core Lecture": "Lezione Principale", "Syllabus Session": "Sessione Programma", "Tutorial Lab": "Laboratorio di Tutorato", "Research Group": "Gruppo di Ricerca", "Interactive Practice": "Pratica Interattiva", "Review Presentation": "Presentazione Corrente", "Academic Colloquium": "Colloquio Accademico", "Core Seminar": "Seminario Principale", "Personal Session": "Sessione Personale" },
  de: { "Core Lecture": "Kernvorlesung", "Syllabus Session": "Syllabus-Sitzung", "Tutorial Lab": "Tutoriums-Labor", "Research Group": "Forschungsgruppe", "Interactive Practice": "Interaktive Praxis", "Review Presentation": "Review-Präsentation", "Academic Colloquium": "Akademisches Kolloquium", "Core Seminar": "Hauptseminar", "Personal Session": "Eigene Lerneinheit" },
  fr: { "Core Lecture": "Cours Magistral", "Syllabus Session": "Session Syllabus", "Tutorial Lab": "Travaux Dirigés", "Research Group": "Groupe de Recherche", "Interactive Practice": "Atelier Interactif", "Review Presentation": "Présentation Synthèse", "Academic Colloquium": "Colloque Académique", "Core Seminar": "Séminaire de Base", "Personal Session": "Session Individuelle" }
};

const SCHEDULE_LOCALIZATION: Record<string, any> = {
  ar: {
    scheduleTitle: "الجدول والتقويم الدراسي الشخصي",
    scheduleSubtitle: "إدارة وتخصيص ساعات الدراسة والمحاضرات الأسبوعية",
    colDay: "اليوم",
    colTime: "الفترة الزمنية",
    colCourse: "المقرر الدراسي",
    colSubject: "الموضوع والمهمة",
    colType: "النوع",
    colActions: "إجراءات",
    addCustomSlot: "إضافة فترة دراسية مخصصة",
    inputDay: "اختر اليوم",
    inputTime: "الوقت (مثال: 14:00 - 16:00)",
    inputCourse: "المقرر المرتبط",
    inputTitle: "عنوان الجلسة (مثال: مراجعة الفقه الأسبوعي)",
    inputType: "نوع الجلسة",
    btnSubmit: "إضافة للجدول",
    btnPrint: "طباعة وتحميل الجدول الدراسي الرسمي (PDF)",
    studentProfile: "خصائص وثيقة الجدول للطباعة",
    studentLabel: "الاسم الكامل للطالب",
    studentIdLabel: "رقم القيد الأكاديمي",
    alertPrint: "تلميح: سيقوم المتصفح بتهيئة صفحة طباعة قياسية مخصصة تخفي المكونات الجانبية والخلفيات تلقائياً للحصول على مستند ورقي نظيف وبدقة عالية.",
    officialSealTitle: "الجدول الدراسي الأكاديمي المعتمد - عام 2026",
    officialSealDesc: "صادر معتمدًا من عمادة التسجيل الشؤون الأكاديمية بالجامعة الإسلامية ببروكسل.",
    academicOfficeSignature: "توقيع واعتماد مسجل عمادة الكلية الأكاديمية",
    noAssociatedCourse: "دراسة حرة / مستقلة",
    deleteSlot: "حذف الجلسة",
    personalStudyNotes: "ملاحظات وتوجيهات دراسية إضافية للطباعة",
    personalNotesPlaceholder: "اكتب هنا أي ملاحظات أو توجيهات أكاديمية تود طباعتها في أسفل الورقة الرائد..."
  },
  en: {
    scheduleTitle: "Personal Weekly Study Schedule",
    scheduleSubtitle: "Manage or append custom study sequences & weekly academic workloads",
    colDay: "Day",
    colTime: "Time Slot",
    colCourse: "Related Course",
    colSubject: "Subject & Topic",
    colType: "Session Type",
    colActions: "Actions",
    addCustomSlot: "Add Custom Academic Session",
    inputDay: "Select Day",
    inputTime: "Time (e.g., 14:00 - 16:00)",
    inputCourse: "Associated Course",
    inputTitle: "Session Title (e.g., Quran Revision Prep)",
    inputType: "Session Type",
    btnSubmit: "Add to Schedule",
    btnPrint: "Print & Export Official Schedule (PDF)",
    studentProfile: "Print Schedule Metadata Settings",
    studentLabel: "Student Registered Name",
    studentIdLabel: "Academic Registration Matricula ID",
    alertPrint: "Note: Standard PDF print dialogue will prepare a highly-polished, border-aligned black-and-white academic record.",
    officialSealTitle: "Officially Certified Academic Schedule - 2026 Academic Year",
    officialSealDesc: "Issued by the Dean of Academic Affairs, Admissions and Registration Dept at Brussels Islamic University, Belgium.",
    academicOfficeSignature: "Academic Registrar Signature & Official Stamp",
    noAssociatedCourse: "Self-Guided / Free Study",
    deleteSlot: "Delete Session",
    personalStudyNotes: "Additional Printed Study Directives",
    personalNotesPlaceholder: "Type optional remarks or notes to be printed at the bottom of the PDF dossier..."
  },
  it: {
    scheduleTitle: "Calendario di Studio Personale",
    scheduleSubtitle: "Gestisci o inserisci sessioni di studio personalizzate e lezioni settimanali",
    colDay: "Giorno",
    colTime: "Orario",
    colCourse: "Corso Correlato",
    colSubject: "Argomento & Attività",
    colType: "Tipo di Sessione",
    colActions: "Azioni",
    addCustomSlot: "Aggiungi Sessione Accademica",
    inputDay: "Seleziona Giorno",
    inputTime: "Orario (es. 14:00 - 16:00)",
    inputCourse: "Corso Associato",
    inputTitle: "Titolo Sessione (es. Ripasso Corano)",
    inputType: "Tipo di Sessione",
    btnSubmit: "Aggiungi al Calendario",
    btnPrint: "Stampa ed Esporta Calendario Ufficiale (PDF)",
    studentProfile: "Metadati del Certificato di Stampa",
    studentLabel: "Nome Registrato dello Studente",
    studentIdLabel: "ID Matricola di Registrazione",
    alertPrint: "Nota: Il dialogo di stampa standard preparerà un record accademico ufficiale in bianco e nero lucido.",
    officialSealTitle: "Calendario Accademico Certificato Ufficialmente - Anno 2026",
    officialSealDesc: "Rilasciato dal Preside degli Affari Accademici, Dipartimento Ammissioni e Registrazioni presso l'Università Islamica di Bruxelles.",
    academicOfficeSignature: "Firma del Registratore Accademico & Timbro Ufficiale",
    noAssociatedCourse: "Studio Autoguidato / Libero",
    deleteSlot: "Elimina Sessione",
    personalStudyNotes: "Annotazioni di Studio Aggiuntive",
    personalNotesPlaceholder: "Scrivi annotazioni opzionali da aggiungere alla stampa PDF..."
  },
  de: {
    scheduleTitle: "Persönlicher wöchentlicher Studienplan",
    scheduleSubtitle: "Verwalten oder ergänzen Sie eigene Lerneinheiten und wöchentliche Belastungen",
    colDay: "Wochentag",
    colTime: "Uhrzeit",
    colCourse: "Zugeordneter Kurs",
    colSubject: "Thema & Aufgabe",
    colType: "Sitzungstyp",
    colActions: "Aktion",
    addCustomSlot: "Eigene Lerneinheit hinzufügen",
    inputDay: "Tag auswählen",
    inputTime: "Zeitraum (z.B. 14:00 - 16:00)",
    inputCourse: "Verknüpfter Kurs",
    inputTitle: "Titel der Sitzung (z.B. Koranseminar Vorbereitung)",
    inputType: "Sitzungstyp",
    btnSubmit: "Zum Plan hinzufügen",
    btnPrint: "Offiziellen Studienplan drucken & exportieren (PDF)",
    studentProfile: "Zertifikats-Metadaten für den Druck",
    studentLabel: "Eingetragener Name des Studierenden",
    studentIdLabel: "Matrikelnummer (Registrierungsnummer)",
    alertPrint: "Hinweis: Der Standard-Druckdialog bereitet ein hochauflösendes, offizielles Studiendokument in elegantem Layout vor.",
    officialSealTitle: "Offiziell beglaubigter akademischer Studienplan - Studienjahr 2026",
    officialSealDesc: "Ausgestellt vom Dekanat für akademische Angelegenheiten, Zulassungs- und Registrierungsstelle an der Islamischen Universität Brüssel.",
    academicOfficeSignature: "Unterschrift des akademischen Registrars & offizieller Stempel",
    noAssociatedCourse: "Selbststudium / Freies Lernen",
    deleteSlot: "Sitzung löschen",
    personalStudyNotes: "Zusätzliche gedruckte Studienhinweise",
    personalNotesPlaceholder: "Geben Sie optionale Anmerkungen ein, die unten auf das PDF-Dokument gedruckt werden sollen..."
  },
  fr: {
    scheduleTitle: "Calendrier d'Étude Hebdomadaire Personnalisé",
    scheduleSubtitle: "Gerez ou ajoutez des séances d'étude personnalisées et activités académiques",
    colDay: "Jour",
    colTime: "Créneau Horaire",
    colCourse: "Cours Associé",
    colSubject: "Sujet & Thème",
    colType: "Type de Session",
    colActions: "Actions",
    addCustomSlot: "Ajouter un créneau académique",
    inputDay: "Sélectionner le jour",
    inputTime: "Heure (ex. 14:00 - 16:00)",
    inputCourse: "Cours Associé",
    inputTitle: "Titre du créneau (ex. Préparation révisions Coran)",
    inputType: "Type de créneau",
    btnSubmit: "Ajouter au calendrier",
    btnPrint: "Imprimer & Exporter le planning officiel (PDF)",
    studentProfile: "Métadonnées pour le document",
    studentLabel: "Nom enregistré de l'étudiant",
    studentIdLabel: "ID d'enregistrement (Numéro Matricule)",
    alertPrint: "Note: L'impression standard va générer un dossier d'inscription universitaire officiel en noir et blanc haute fidélité.",
    officialSealTitle: "Calendrier Académique Officiellement Certifié - Année 2026",
    officialSealDesc: "Délivré par le secrétariat général des affaires académiques et admissions de l'Université Islamique de Bruxelles.",
    academicOfficeSignature: "Signature du Secrétaire Général & Tampon Officiel",
    noAssociatedCourse: "Autonome / Étude Libre",
    deleteSlot: "Supprimer le créneau",
    personalStudyNotes: "Directives ou annotations supplémentaires",
    personalNotesPlaceholder: "Saisissez des remarques supplémentaires à imprimer en bas de votre dossier PDF..."
  }
};

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
  const sdT = SCHEDULE_LOCALIZATION[currentLang] || SCHEDULE_LOCALIZATION["en"];
  
  // Interactive Dynamic States
  const [courses, setCourses] = useState<any[]>(t.coursesList);
  const [assignments, setAssignments] = useState<any[]>(t.assignmentsList);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Schedule States
  const [schedule, setSchedule] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("academic_study_schedule");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_SCHEDULE;
  });

  const [studentName, setStudentName] = useState("Arkan Marschall");
  const [studentId, setStudentId] = useState("BIU-2026-89420");
  const [personalRemarks, setPersonalRemarks] = useState("");

  const [newDay, setNewDay] = useState("Monday");
  const [newTime, setNewTime] = useState("11:00 - 13:00");
  const [newCourse, setNewCourse] = useState("FIQ-502");
  const [newSubject, setNewSubject] = useState("");
  const [newType, setNewType] = useState("Core Lecture");

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    const newSlot = {
      id: "custom_" + Date.now(),
      day: newDay,
      time: newTime,
      courseCode: newCourse === "none" ? "" : newCourse,
      title: newSubject,
      type: newType
    };
    const updated = [...schedule, newSlot];
    setSchedule(updated);
    try {
      localStorage.setItem("academic_study_schedule", JSON.stringify(updated));
    } catch (err) {}
    setNewSubject("");
  };

  const handleDeleteSlot = (id: string) => {
    const updated = schedule.filter(item => item.id !== id);
    setSchedule(updated);
    try {
      localStorage.setItem("academic_study_schedule", JSON.stringify(updated));
    } catch (err) {}
  };

  const handlePrintSchedule = () => {
    window.print();
  };

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

      {/* 3. Interactive Personal Study Schedule Section */}
      <div className="bg-slate-950/85 p-5 rounded-2xl border border-slate-900 space-y-6 mt-6">
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-900 ${flexDir}`}>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div className={textAlignment}>
              <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-wide">
                {sdT.scheduleTitle}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {sdT.scheduleSubtitle}
              </p>
            </div>
          </div>

          <div className={`flex flex-wrap items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
            <button
              type="button"
              onClick={handlePrintSchedule}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-[10px] sm:text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>{sdT.btnPrint}</span>
            </button>
          </div>
        </div>

        {/* Info Notification Alert concerning PDF output instructions */}
        <div className={`text-[9px] sm:text-[10px] font-semibold text-slate-450 bg-slate-950/30 p-3 rounded-xl border border-slate-900/60 flex items-start gap-2.5 leading-relaxed ${flexDir}`}>
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className={textAlignment}>{sdT.alertPrint}</p>
        </div>

        {/* Live Profile Settings Customization Box */}
        <div className="p-4 bg-slate-900/20 rounded-xl border border-slate-900 space-y-3.5">
          <h5 className={`text-[10px] font-bold text-slate-300 uppercase tracking-wider ${textAlignment}`}>
            👤 {sdT.studentProfile}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className={`block text-[10px] font-extrabold text-slate-400 ${textAlignment}`}>{sdT.studentLabel}</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className={`w-full bg-slate-950 text-white placeholder-slate-600 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
              />
            </div>
            <div className="space-y-1.5">
              <label className={`block text-[10px] font-extrabold text-slate-400 ${textAlignment}`}>{sdT.studentIdLabel}</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full bg-slate-950 text-white placeholder-slate-650 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
              <label className={`block text-[10px] font-extrabold text-slate-400 ${textAlignment}`}>{sdT.personalStudyNotes}</label>
              <input
                type="text"
                value={personalRemarks}
                onChange={(e) => setPersonalRemarks(e.target.value)}
                placeholder={sdT.personalNotesPlaceholder}
                className={`w-full bg-slate-950 text-white placeholder-slate-600 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main List of Study Slots */}
          <div className="lg:col-span-8 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((dayName) => {
                const daySlots = schedule.filter(s => s.day === dayName);
                if (daySlots.length === 0) return null;
                return (
                  <div key={dayName} className="p-3.5 bg-slate-900/20 border border-slate-900 rounded-xl space-y-2.5">
                    <div className={`flex justify-between items-center border-b border-slate-900 pb-1.5 ${flexDir}`}>
                      <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">
                        {LOCALIZED_DAYS[currentLang]?.[dayName] || dayName}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {daySlots.length} {isRtl ? "فترات" : "sessions"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {daySlots.map((slot) => {
                        const isCustom = slot.id.toString().includes("custom");
                        return (
                          <div 
                            key={slot.id} 
                            className={`p-2.5 rounded-lg text-left transition text-xs border ${
                              isCustom 
                                ? "bg-amber-500/5 border-amber-500/10 text-amber-300"
                                : "bg-slate-950/40 border-slate-900/60 text-slate-200"
                            }`}
                          >
                            <div className={`flex justify-between items-start gap-1 ${flexDir}`}>
                              <span className="text-[9px] font-mono font-bold text-indigo-350 shrink-0">
                                {slot.time}
                              </span>
                              {isCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSlot(slot.id)}
                                  className="text-red-400 hover:text-red-300 transition duration-150 p-0.5 rounded cursor-pointer shrink-0"
                                  title={sdT.deleteSlot}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <p className={`font-bold mt-1 text-[10px] leading-snug sm:text-xs text-white ${textAlignment}`}>
                              {slot.title}
                            </p>

                            <div className={`flex justify-between items-center mt-1.5 border-t border-slate-900/40 pt-1 text-[9px] text-slate-400 ${flexDir}`}>
                              <span className="font-mono bg-slate-950 px-1.5 py-0.2 rounded text-[8px] text-slate-400">
                                {slot.courseCode || sdT.noAssociatedCourse}
                              </span>
                              <span className="text-slate-500 font-semibold italic text-[8px]">
                                {LOCALIZED_TYPES[currentLang]?.[slot.type] || slot.type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add custom session slot form sidebar */}
          <div className="lg:col-span-4 bg-slate-900/10 p-4 rounded-xl border border-slate-900">
            <h5 className={`text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5 ${flexDir}`}>
              <Plus className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{sdT.addCustomSlot}</span>
            </h5>

            <form onSubmit={handleAddSlot} className="space-y-3 text-left">
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-400 block">{sdT.inputDay}</label>
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-900 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Monday">{LOCALIZED_DAYS[currentLang]?.["Monday"] || "Monday"}</option>
                  <option value="Tuesday">{LOCALIZED_DAYS[currentLang]?.["Tuesday"] || "Tuesday"}</option>
                  <option value="Wednesday">{LOCALIZED_DAYS[currentLang]?.["Wednesday"] || "Wednesday"}</option>
                  <option value="Thursday">{LOCALIZED_DAYS[currentLang]?.["Thursday"] || "Thursday"}</option>
                  <option value="Friday">{LOCALIZED_DAYS[currentLang]?.["Friday"] || "Friday"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-400 block">{sdT.inputTime}</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-900 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-400 block">{sdT.inputCourse}</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-900 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="none">-- {sdT.noAssociatedCourse} --</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-400 block">{sdT.inputTitle}</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Fiqh Chapter 4 recitation review"
                  className="w-full bg-slate-950 text-white border border-slate-900 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-400 block">{sdT.inputType}</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-900 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                >
                  {Object.keys(LOCALIZED_TYPES.en).map(tKey => (
                    <option key={tKey} value={tKey}>
                      {LOCALIZED_TYPES[currentLang]?.[tKey] || tKey}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 px-3 rounded-lg text-[10px] font-bold bg-indigo-650 hover:bg-slate-950 border border-indigo-600/50 hover:border-indigo-550 text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-450" />
                <span>{sdT.btnSubmit}</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* =======================================================
          OFFICIAL PRINT-READY TEMPLATE (HIDDEN ON BROWSER PREVIEW)
          ======================================================= */}
      <div id="academic-print-schedule" className="hidden print:block p-8 bg-white text-black font-sans text-sm">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden !important;
            }
            #academic-print-schedule, #academic-print-schedule * {
              visibility: visible !important;
            }
            #academic-print-schedule {
              position: absolute !important;
              left: 20px !important;
              top: 20px !important;
              right: 20px !important;
              background: #ffffff !important;
              color: #000000 !important;
              display: block !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />

        {/* Certificate Header */}
        <div className="border-b-4 border-slate-900 pb-5 mb-5 text-center">
          <div className="flex items-center justify-between pb-3">
            <div className="text-left font-serif leading-tight">
              <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                {SCHEDULE_LOCALIZATION[currentLang]?.printHeaderTitle || SCHEDULE_LOCALIZATION["en"].printHeaderTitle}
              </h1>
              <p className="text-[10px] uppercase text-slate-500 tracking-wider">
                Virtual Campus Student Portal
              </p>
            </div>
            {/* Stamp Ornament/Seal */}
            <div className="font-serif text-right text-[8px] uppercase tracking-widest text-slate-500 border border-slate-400 p-1.5 rounded">
              BRUSSELS, BELGIUM<br />
              ESTABLISHED 2024
            </div>
          </div>
          <h2 className="text-md font-black text-slate-800 uppercase text-center tracking-wide mt-2">
            {sdT.officialSealTitle}
          </h2>
          <p className="text-[9px] text-slate-500 text-center italic">
            Semestral Academic Load Verification File
          </p>
        </div>

        {/* Student metadata table card */}
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 mb-5 grid grid-cols-2 gap-y-1.5 gap-x-6 text-xs">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-500 block">
              {sdT.studentLabel}
            </span>
            <span className="text-xs font-black text-slate-800 font-mono">
              {studentName}
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-500 block">
              {sdT.studentIdLabel}
            </span>
            <span className="text-xs font-black text-slate-800 font-mono">
              {studentId}
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-500 block">
              Current Academic Status
            </span>
            <span className="text-[11px] font-bold text-slate-800">
              Active Enrollment / Dean's List performance (GPA 3.85 / 4.0)
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-500 block">
              Academic Term / Session
            </span>
            <span className="text-[11px] font-bold text-slate-800">
              Summer Semester Term (June - August 2026)
            </span>
          </div>
        </div>

        {/* Table list of schedule slots */}
        <table className="w-full border-collapse border border-slate-300 text-left mb-5">
          <thead>
            <tr className="bg-slate-100 text-[10px] text-slate-700 uppercase font-bold text-xs">
              <th className="border border-slate-300 p-1.5 w-24">{sdT.colDay}</th>
              <th className="border border-slate-300 p-1.5 w-32">{sdT.colTime}</th>
              <th className="border border-slate-300 p-1.5 w-24">{sdT.colCourse}</th>
              <th className="border border-slate-300 p-1.5">{sdT.colSubject}</th>
              <th className="border border-slate-300 p-1.5 w-32">{sdT.colType}</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((dayName) => {
              const daySlots = schedule.filter(s => s.day === dayName);
              if (daySlots.length === 0) return null;
              return daySlots.map((slot, sIdx) => (
                <tr key={slot.id} className="hover:bg-slate-50">
                  {sIdx === 0 ? (
                    <td 
                      className="border border-slate-300 p-1.5 font-black align-middle uppercase text-slate-800 bg-slate-50/50" 
                      rowSpan={daySlots.length}
                    >
                      {LOCALIZED_DAYS[currentLang]?.[dayName] || dayName}
                    </td>
                  ) : null}
                  <td className="border border-slate-300 p-1.5 font-mono font-medium text-slate-700 select-all">
                    {slot.time}
                  </td>
                  <td className="border border-slate-300 p-1.5 font-mono font-bold text-slate-800 text-center">
                    {slot.courseCode || "--"}
                  </td>
                  <td className="border border-slate-300 p-1.5 font-semibold text-slate-900">
                    {slot.title}
                  </td>
                  <td className="border border-slate-300 p-1.5 italic text-slate-600 font-serif text-[11px]">
                    {LOCALIZED_TYPES[currentLang]?.[slot.type] || slot.type}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>

        {/* Enrolled Syllabus Grades Dossier section on print out */}
        <div className="mb-5">
          <h3 className="text-[11px] font-black uppercase text-slate-800 tracking-wider mb-2">
            Enrolled Core Books & Current Mastery Progress
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {courses.map((c: any) => (
              <div key={c.id} className="border border-slate-200 rounded p-1.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono bg-slate-100 text-slate-700 px-1 py-0.2 rounded mr-1 text-bold font-bold text-[10px]">
                    {c.code}
                  </span>
                  <span className="font-semibold text-slate-800">{c.name}</span>
                </div>
                <span className="font-mono font-black text-slate-900">{c.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming submissions listed on print out */}
        <div className="mb-5">
          <h3 className="text-[11px] font-black uppercase text-slate-800 tracking-wider mb-2">
            Pending Academic Milestones & Deliverables Roadmap
          </h3>
          <div className="space-y-1.5 text-xs">
            {assignments.map((a: any) => (
              <div key={a.id} className="border border-slate-200 rounded p-1.5 flex justify-between gap-4">
                <div>
                  <span className="font-mono font-bold text-slate-400 mr-1.5 text-[10px]">[{a.course}]</span>
                  <span className="font-semibold text-slate-800">{a.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-700">Due: {a.due}</span>
                  <span className="text-[10px] text-slate-400 block">Weight: {a.weight} - Status: {a.status === "submitted" ? "Submitted" : "Pending"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Custom Printed Notes */}
        {personalRemarks && (
          <div className="border border-slate-300 rounded p-3 mb-5 bg-slate-50/50">
            <span className="text-[9px] font-bold uppercase text-slate-500 block mb-1">
              Student Directives / Research Remarks
            </span>
            <p className="text-xs text-slate-800 italic font-medium leading-relaxed">
              "{personalRemarks}"
            </p>
          </div>
        )}

        {/* Footer Seal, Signature block, validation text */}
        <div className="border-t border-slate-300 pt-5 mt-6 flex justify-between items-start text-[9px] text-slate-500">
          <div className="space-y-1.5 w-2/3">
            <p className="font-bold">{sdT.officialSealDesc}</p>
            <p className="leading-relaxed">
              This document is generated automatically by the Brussels Academic Portal on secure web servers. Under the regulations of European Higher Education (ECTS), student identity and semester schedules are verified and registered. No handwritten seal required for general academic reference.
            </p>
            <p className="font-mono text-[9px] text-slate-400 mt-1">
              Authentication hash: {Date.now().toString(16).toUpperCase()}-BIU-VERIFIED
            </p>
          </div>
          <div className="text-center w-56 space-y-3">
            <div className="border-b border-black h-10 w-44 mx-auto relative">
              {/* Fake aesthetic signature text */}
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-serif text-slate-400 italic text-xs">
                Secr. Acad. BIU
              </span>
            </div>
            <p className="font-black text-slate-700 uppercase font-mono tracking-tight block text-[9px]">
              {sdT.academicOfficeSignature}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
