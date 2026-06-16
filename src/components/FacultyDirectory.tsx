import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Award, 
  ChevronRight, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Calendar, 
  Search, 
  X, 
  Clock, 
  CheckCircle,
  HelpCircle,
  Video, 
  Copy, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  AlertCircle
} from 'lucide-react';

interface FacultyDirectoryProps {
  currentLang: string;
  isRtl?: boolean;
}

const LOCALIZATION: Record<string, any> = {
  ar: {
    sectionBadge: "الهيئة الأكاديمية والمجلس العلمي",
    sectionTitle: "أعضاء هيئة التدريس والمستشارين الأكاديميين",
    sectionSub: "نخبة من العلماء والباحثين المتخصصين الحاصلين على أعلى الدرجات العلمية من أعرق الجامعات الإسلامية والدولية ليناظروا التحصيل المعرفي المعاصر.",
    searchPlaceholder: "ابحث عن أستاذ، تخصص، أو مقرر...",
    allDepartments: "جميع الأقسام الأكاديمية",
    deptSharia: "الشريعة والقانون المقارن",
    deptArabic: "اللغة العربية واللسانيات",
    deptUsul: "أصول الدين والمذاهب",
    viewProfile: "عرض السيرة العلمية",
    scheduleConsult: "حجز ساعات مكتبية (فوري)",
    consultSuccess: "تم تأكيد حجز موعد الساعات المكتبية بنجاح! الرابط الافتراضي للقاء متاح الآن أدناه.",
    consultFormTitle: "جدولة ساعات مكتبية واستشارة افتراضية",
    studentName: "اسم الطالب الكامل",
    studentEmail: "البريد الجامعي الرسمي",
    consultReason: "موضوع البحث أو الاستشارة التفصيلية",
    chooseSlot: "حدد التوقيت المتاح فورياً",
    btnConfirmConsult: "تأكيد الساعات والمقابلة",
    closeBtn: "إغلاق",
    facultyBadge: "عضو مجمع البحوث الإسلامية بمقر أوروبا",
    papersTitle: "الأبحاث والمؤلفات الحديثة التابعة:",
    coursesTitle: "المقررات الأكاديمية الحالية للمستشار:",
    
    // New scheduling additions
    availStatusLabel: "حالة الحضور والاتصال الفوري:",
    availableToday: "متاح اليوم بالتوقيت المحدد",
    statusAvailable: "متاح للمقابلة الفورية",
    statusInSession: "في جلسة استشارة حالية",
    statusOffline: "غير متصل (خارج الساعات)",
    myBookingsTitle: "🛡️ استشاراتك وحجوزات الساعات المكتبية المؤكدة",
    noBookingsText: "لا توجد أي حجوزات نشطة حالياً. يمكنك تصفح العلماء أعلاه لحجز جلسة استشارة افتراضية مباشرة.",
    topicPlaceholder: "مثال: مراجعة خطة أطروحة الماجستير في فقه المعاملات المالية...",
    meetingPlatform: "منصة الاجتماع الافتراضي:",
    virtualRoomLink: "رابط القاعة الافتراضية الآمنة:",
    copyLink: "نسخ الرابط",
    copied: "تم النسخ!",
    cancelSession: "إلغاء حجز المقابلة",
    cancelSuccess: "تم إلغاء الموعد وإعادة إتاحته لعموم الطلبة.",
    byYou: "محجوز بواسطة حسابك",
    selectDate: "اختر تاريخ الجلسة:",
    selectTime: "اختر وقت الساعات المكتبية المتاح:",
    bookSuccessTitle: "تم حجز جلستك الافتراضية بنجاح!"
  },
  en: {
    sectionBadge: "Academic Board & Advisor Council",
    sectionTitle: "Faculty & Distinguished Advisors Directory",
    sectionSub: "Meet our world-class theologians, linguistic experts, and Islamic economics researchers holding academic titles from major traditional and Western institutions.",
    searchPlaceholder: "Search advisor name, research specialty or course...",
    allDepartments: "All Departments",
    deptSharia: "Sharia & Comparative Law",
    deptArabic: "Arabic Language & Philology",
    deptUsul: "Usul al-Din & Theology",
    viewProfile: "Academic Portfolio",
    scheduleConsult: "Book Office Hours (Live)",
    consultSuccess: "Office hours slot booked successfully! Your secure meeting coordinates are registered below.",
    consultFormTitle: "Schedule Live Virtual Office Hours",
    studentName: "Student Full Name",
    studentEmail: "Official University Email",
    consultReason: "Target Thesis Title / Consultation Topic",
    chooseSlot: "Select Available Office Hours Slot",
    btnConfirmConsult: "Lock Scheduled Consultation",
    closeBtn: "Close Profile",
    facultyBadge: "European Council of Islamic Scholars Fellow",
    papersTitle: "Published Treatises & Researches:",
    coursesTitle: "Active Enrolled Lecture Modules:",
    
    // New scheduling additions
    availStatusLabel: "Live Presence & Availability Status:",
    availableToday: "Available Today on schedule",
    statusAvailable: "Available Now",
    statusInSession: "Currently in a Session",
    statusOffline: "Offline (Out of Hours)",
    myBookingsTitle: "🛡️ Your Booked Consultations & Office Hour Sessions",
    noBookingsText: "No active consultation sessions reserved. Find an advisor above to schedule a real-time virtual office hour session.",
    topicPlaceholder: "e.g., Thesis Chapter 3 Draft review or language grammar doubts...",
    meetingPlatform: "Virtual Meeting Platform:",
    virtualRoomLink: "Secure Virtual Conference Room Link:",
    copyLink: "Copy Meeting Link",
    copied: "Copied!",
    cancelSession: "Cancel Reservation",
    cancelSuccess: "Appointment successfully canceled and returned to available pool.",
    byYou: "Reserved by You",
    selectDate: "Choose Consultation Date:",
    selectTime: "Select Available Office Slot:",
    bookSuccessTitle: "Virtual Consultation Secured!"
  },
  it: {
    sectionBadge: "Consiglio dei Docenti",
    sectionTitle: "I Nostri Professori e Consulenti Accademici",
    sectionSub: "Formati presso le più rinomate istituzioni islamiche e università europee, guidano gli studenti con rigore e dedizione.",
    searchPlaceholder: "Cerca professore, specializzazione o codice...",
    allDepartments: "Tutti i Dipartimenti",
    deptSharia: "Sharia e Diritto Comparato",
    deptArabic: "Lingua Araba e Glottologia",
    deptUsul: "Usul al-Din e Teologia",
    viewProfile: "Profilo Accademico",
    scheduleConsult: "Prenota Ricevimento",
    consultSuccess: "Ricevimento prenotato con successo! Il tuo link virtuale sicuro è registrato qui sotto.",
    consultFormTitle: "Prenota Orario di Ricevimento Virtuale",
    studentName: "Nome Completo Studente",
    studentEmail: "Indirizzo Email dello Studente",
    consultReason: "Oggetto della Consulenza / Argomento Tesi",
    chooseSlot: "Seleziona un Orario Disponibile",
    btnConfirmConsult: "Conferma Prenotazione",
    closeBtn: "Chiudi",
    facultyBadge: "Membro del Consiglio Scientifico Universitario",
    papersTitle: "Trattati e Pubblicazioni Recenti:",
    coursesTitle: "Corsi Attualmente Docenti:",
    
    // New scheduling additions
    availStatusLabel: "Stato disponibilità live:",
    availableToday: "Disponibile oggi programmato",
    statusAvailable: "Disponibile Ora",
    statusInSession: "Attualmente in Sessione",
    statusOffline: "Sconnesso (Fuori orario)",
    myBookingsTitle: "🛡️ Le Tue Consulenze Accademiche Prenotate",
    noBookingsText: "Nessuna prenotazione attiva. Richiedi una consulenza sopra per incontrare i docenti.",
    topicPlaceholder: "Es. Revisione capitolo 3 della tesi di Sharia...",
    meetingPlatform: "Piattaforma di Ricevimento:",
    virtualRoomLink: "Link della Stanza Virtuale:",
    copyLink: "Copia Link Stanza",
    copied: "Copiato!",
    cancelSession: "Annulla Pomeriggio",
    cancelSuccess: "Appuntamento di ricevimento annullato con successo.",
    byYou: "Riservato da te",
    selectDate: "Seleziona Data Consultazione:",
    selectTime: "Scegli un Orario di Ricevimento:",
    bookSuccessTitle: "Consulenza Virtuale Riservata!"
  },
  de: {
    sectionBadge: "Wissenschaftlicher Rat",
    sectionTitle: "Lehrbeauftragte & Wissenschaftliche Berater",
    sectionSub: "Herausragende islamische Gelehrte und Sprachwissenschaftler, die theologische Tiefe mit moderner europäischer Bildungspraxis verbinden.",
    searchPlaceholder: "Nach Gelehrten, Fachgebiet oder Modul suchen...",
    allDepartments: "Alle Fachbereiche",
    deptSharia: "Scharia & Vergleichendes Recht",
    deptArabic: "Arabische Sprache & Linguistik",
    deptUsul: "Usul al-Din & Theologische Studien",
    viewProfile: "Akademisches Portfolio",
    scheduleConsult: "Sprechzeit buchen (Live)",
    consultSuccess: "Sprechzeit erfolgreich reserviert! Ihre Zugangsdaten sind unten hinterlegt.",
    consultFormTitle: "Sprechstunde & Beratung buchen",
    studentName: "Vollständiger Name des Studierenden",
    studentEmail: "E-Mail-Adresse der Universität",
    consultReason: "Thema der Beratung oder Bachelor-/Masterarbeit",
    chooseSlot: "Wählen Sie eine verfügbare Sprechzeit aus",
    btnConfirmConsult: "Termin verbindlich reservieren",
    closeBtn: "Schließen",
    facultyBadge: "Präsidiumsmitglied des Europäischen Gelehrtenrates",
    papersTitle: "Veröffentlichte Schriften & Traktate:",
    coursesTitle: "Aktuell betreute Module:",
    
    // New scheduling additions
    availStatusLabel: "Aktueller Anwesenheitsstatus:",
    availableToday: "Heute planmäßig verfügbar",
    statusAvailable: "Jetzt Sprechzeit",
    statusInSession: "Gerade im Gespräch",
    statusOffline: "Abwesend (Außerhalb)",
    myBookingsTitle: "🛡️ Ihre bestätigten Beratungstermine & Sprechzeiten",
    noBookingsText: "Keine aktiven Buchungen vorhanden. Buchen Sie oben einen Termin mit Ihren Beratern.",
    topicPlaceholder: "z.B. Besprechung von Kapitel 3 der Abschlussarbeit...",
    meetingPlatform: "Virtueller Besprechungsraum:",
    virtualRoomLink: "Sicherer virtueller Sprechraum:",
    copyLink: "Konferenz-Link kopieren",
    copied: "Kopiert!",
    cancelSession: "Reservierung stornieren",
    cancelSuccess: "Termin erfolgreich storniert und wieder freigegeben.",
    byYou: "Von Ihnen gebucht",
    selectDate: "Beratungsdatum wählen:",
    selectTime: "Verfügbares Zeitfenster wählen:",
    bookSuccessTitle: "Beratungstermin erfolgreich reserviert!"
  },
  fr: {
    sectionBadge: "Conseil Académique et Scientifique",
    sectionTitle: "Répertoire du Corps Professoral",
    sectionSub: "Nos enseignants sont des universitaires de premier plan, diplômés des plus grandes institutions islamiques et occidentales.",
    searchPlaceholder: "Rechercher un professeur, une spécialité...",
    allDepartments: "Tous les Départements",
    deptSharia: "Scolastique Sharia & Droit Comparé",
    deptArabic: "Langue Arabe & Civilisations",
    deptUsul: "Usul al-Din & Théologie Fondamentale",
    viewProfile: "Portfolio de Recherche",
    scheduleConsult: "Régler un Rendez-vous",
    consultSuccess: "Heure de consultation réservée ! Votre lien de connexion confidentiel est disponible ci-dessous.",
    consultFormTitle: "Planifier une Heure de Consultation Virtuelle",
    studentName: "Nom Complet de l'Étudiant",
    studentEmail: "Adresse Courriel Universitaire",
    consultReason: "Sujet de consultation de recherche / Thèse",
    chooseSlot: "Sélectionner un Créneau Horaire Libre",
    btnConfirmConsult: "Valider le Rendez-vous",
    closeBtn: "Fermer le Profil",
    facultyBadge: "Membre Titulaire de l'Association des Savants d'Europe",
    papersTitle: "Traités et Essais Critiques Publiés :",
    coursesTitle: "Modules actuellement enseignés :",
    
    // New scheduling additions
    availStatusLabel: "Statut de présence en direct :",
    availableToday: "Disponible aujourd'hui sur planning",
    statusAvailable: "Disponible Actuellement",
    statusInSession: "Actuellement en Consultation",
    statusOffline: "Hors Ligne (En dehors des heures)",
    myBookingsTitle: "🛡️ Vos Rendez-vous de Tutorats & Consultations",
    noBookingsText: "Aucune réservation active. Programmez un tutorat à l'aide des boutons ci-dessus.",
    topicPlaceholder: "ex. Revue du chapitre 3 du mémoire de recherche...",
    meetingPlatform: "Plateforme de Visioconférence :",
    virtualRoomLink: "Lien de la Visioconférence Sécurisée :",
    copyLink: "Copier le Lien",
    copied: "Copié !",
    cancelSession: "Annuler le Rendez-vous",
    cancelSuccess: "Rendez-vous annulé avec succès et remis en disponibilité.",
    byYou: "Réservé par vous",
    selectDate: "Choisir la Date de Consultation :",
    selectTime: "Sélectionner un Créneau Libre :",
    bookSuccessTitle: "Consultation Virtuelle Reservée !"
  }
};

const SCHOLARS_DATA = [
  {
    id: "prof_1",
    name: {
      ar: "د. عبد الحليم الودغيري",
      en: "Dr. Abdelhalim Lougiri",
      it: "Prof. Dr. Abdelhalim Lougiri",
      de: "Prof. Dr. Abdelhalim Lougiri",
      fr: "Dr Abdelhalim Lougiri"
    },
    title: {
      ar: "أستاذ الفقه وأصوله المقارن بالشرق الأوسط والنيابة الأوروبية",
      en: "Professor of Sharia & Comparative Jurisprudence",
      it: "Professore Ordinario di Sharia e Diritto Comparato",
      de: "Professor für Scharia & Vergleichendes Recht",
      fr: "Professeur de Fiqh et Droit Comparé"
    },
    department: "sharia",
    degree: "Ph.D. in Islamic Law - Al-Azhar University, 25+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    officeHours: "Mon/Wed 10:00 - 12:00 UTC",
    email: "a.lougiri@brussels-islamic-univ.be",
    courses: ["FIQ-502", "FIQ-604", "USL-510"],
    papers: [
      { year: "2024", title: "Islamic Financial Systems and Modern European Micro-Transactions Regulation" },
      { year: "2025", title: "Hermeneutic Methods of Classical Jurisprudential Schools" }
    ],
    bio: {
      ar: "يعد الدكتور الودغيري من المراجع العلمية البارزة في الفقه المعاصر وتطبيقاته لأقليات القارة الأوروبية. أشرف على ما يزيد عن 40 أطروحة دكتوراه.",
      en: "An acclaimed authority on contemporary Islamic jurisprudence and minority legislative frameworks in Europe. Supervised over 40 doctoral candidates.",
      it: "Una delle massime autorità in giurisprudenza islamica applicata alle comunità minoritarie europee, con oltre 40 tesi di dottorato supervisionate.",
      de: "Ein anerkannter Experte für zeitgenössische Scharia-Rechtsprechung und Minderheitenrecht im europäischen Rahmen. Betreuer von über 40 Doktorarbeiten.",
      fr: "Expert acclamé en jurisprudence islamique appliquée aux minorités d'Europe occidentale. Directeur de plus de 40 thèses doctorales."
    }
  },
  {
    id: "prof_2",
    name: {
      ar: "د. سارة فهد القحطاني",
      en: "Dr. Sarah Fahad Al-Qahtani",
      it: "Dott.ssa Sarah Fahad Al-Qahtani",
      de: "Dr. Sarah Fahad Al-Qahtani",
      fr: "Dr Sarah Fahad Al-Qahtani"
    },
    title: {
      ar: "رئيسة قسم اللسانيات التاريخية والأدب العربي الفريد",
      en: "Head of Historical Philology & Arabic Linguistics",
      it: "Cattedra di Glottologia Storica e Letteratura Araba",
      de: "Lehrstuhl für historische Sprachwissenschaft & arabische Literatur",
      fr: "Chaire de Philologie Historique et Littérature Classique"
    },
    department: "arabic",
    degree: "Ph.D. in Classical Arabic Philology - University of Madinah / SOAS London",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    officeHours: "Tue/Thu 14:00 - 15:30 UTC",
    email: "s.alqahtani@brussels-islamic-univ.be",
    courses: ["ARB-589", "ARB-601"],
    papers: [
      { year: "2023", title: "Semitic Roots of Andalusian Poetry Metres and Accents" },
      { year: "2025", title: "Historical Grammar Transitions in Early Hijazi Quranic Codices" }
    ],
    bio: {
      ar: "كرّست أبحاثها لدراسة بنية اللغة العربية الكلاسيكية وتطورها النحوي وتلقيها الأدبي في الغرب الأندلسي التاريخي.",
      en: "Devoted her research framework to classical Arabic linguistic metrics, syntax progression, and Andalusian poetic heritage.",
      it: "Ha dedicato le sue ricerche alle metriche della lingua araba classica, all'evoluzione della sintassi e all'eredità letteraria andalusa.",
      de: "Fokussiert auf klassische arabische Linguistik, historische Syntaxentwicklung und das andalusisch-poetische Erbe.",
      fr: "Consacre ses recherches à la métrique de l'arabe classique, à la morphosyntaxe et à l'héritage poétique andalou."
    }
  },
  {
    id: "prof_3",
    name: {
      ar: "د. طارق صوان الشافعي",
      en: "Dr. Tariq Sawaneh Al-Shafei",
      it: "Prof. Tariq Sawaneh Al-Shafei",
      de: "Prof. Tariq Sawaneh Al-Shafei",
      fr: "Dr Tariq Sawaneh Al-Shafei"
    },
    title: {
      ar: "عضو المكتب العلمي المتخصص في مراتب العقيدة والمذاهب المقارنة",
      en: "Associate Professor of Usul al-Din & Scholastic Theology",
      it: "Professore Associato di Usul al-Din e Teologia Scolastica",
      de: "Außerordentlicher Professor für Usul al-Din & Scholastik",
      fr: "Maitre de Conférences en Théologie Scolastique et Usul al-Din"
    },
    department: "usul",
    degree: "Ph.D. in Islamic Philosophy & Usul al-Din - Jordan University",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    officeHours: "Wed/Fri 09:00 - 11:00 UTC",
    email: "t.sawaneh@brussels-islamic-univ.be",
    courses: ["HDT-514", "USL-510"],
    papers: [
      { year: "2024", title: "The Integration of Philosophy and Revealed Knowledge in Al-Ghazali's Works" },
      { year: "2025", title: "Modern Philosophical Dilemmas: An Islamic Epistemological Reconciliation" }
    ],
    bio: {
      ar: "متخصص ريادي في علم الكلام والفلسفة المعاصرة، يركز على سبل تكييف الثقافة الإسلامية بمناهج الفلسفة الغربية دون فقد الأصول التأسيسية.",
      en: "A pioneer researcher in scholastic theology and dialogue. Focuses on bridging classical Islamic thought with contemporary analytical philosophy.",
      it: "Pioniere della teologia scholastica, focalizzato sull'integrazione del pensiero classico islamico con le scienze umane continentali.",
      de: "Wegweisender Forscher in scholastischer Theologie. Brückenbauer zwischen klassischem islamischen Denken und kontinentaler Philosophie.",
      fr: "Spécialiste de la théologie scolastique classique et de l'épistémologie de réconciliation avec la pensée contemporaine."
    }
  }
];

// Available Days configured relative to June 16, 2026 (Tuesday)
const AVAILABLE_DATES = [
  { key: "2026-06-16", label: { en: "Tue, Jun 16 (Today)", ar: "الثلاثاء، 16 يونيو (اليوم)", it: "Mar, 16 Giu (Oggi)", de: "Di, 16. Jun (Heute)", fr: "Mar 16 Juin (Aujourd'hui)" } },
  { key: "2026-06-17", label: { en: "Wed, Jun 17", ar: "الأربعاء، 17 يونيو", it: "Mer, 17 Giu", de: "Mi, 17. Jun", fr: "Mer 17 Juin" } },
  { key: "2026-06-18", label: { en: "Thu, Jun 18", ar: "الخميس، 18 يونيو", it: "Gio, 18 Giu", de: "Do, 18. Jun", fr: "Jeu 18 Juin" } }
];

const INITIAL_SLOTS: Record<string, Record<string, Array<{ time: string; isBooked: boolean; attendee?: string }>>> = {
  prof_1: {
    "2026-06-16": [
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: true, attendee: "Sophia Keller" },
      { time: "11:00 - 11:30 UTC", isBooked: false },
      { time: "11:30 - 12:00 UTC", isBooked: false }
    ],
    "2026-06-17": [
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: false },
      { time: "11:00 - 11:30 UTC", isBooked: true, attendee: "Arslan Demir" },
      { time: "11:30 - 12:00 UTC", isBooked: false }
    ],
    "2026-06-18": [
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: true, attendee: "Ismail Bouazza" },
      { time: "11:00 - 11:30 UTC", isBooked: false },
      { time: "11:30 - 12:00 UTC", isBooked: false }
    ]
  },
  prof_2: {
    "2026-06-16": [
      { time: "14:00 - 14:30 UTC", isBooked: true, attendee: "Arkan Marschall" },
      { time: "14:30 - 15:00 UTC", isBooked: false },
      { time: "15:00 - 15:30 UTC", isBooked: false }
    ],
    "2026-06-17": [
      { time: "14:00 - 14:30 UTC", isBooked: false },
      { time: "14:30 - 15:00 UTC", isBooked: false },
      { time: "15:00 - 15:30 UTC", isBooked: false }
    ],
    "2026-06-18": [
      { time: "14:00 - 14:30 UTC", isBooked: false },
      { time: "14:30 - 15:00 UTC", isBooked: false },
      { time: "15:00 - 15:30 UTC", isBooked: true, attendee: "Elena Rossi" }
    ]
  },
  prof_3: {
    "2026-06-16": [
      { time: "09:00 - 09:30 UTC", isBooked: false },
      { time: "09:30 - 10:00 UTC", isBooked: false },
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: true, attendee: "Hamza Al-Farsi" }
    ],
    "2026-06-17": [
      { time: "09:00 - 09:30 UTC", isBooked: false },
      { time: "09:30 - 10:00 UTC", isBooked: false },
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: false }
    ],
    "2026-06-18": [
      { time: "09:00 - 09:30 UTC", isBooked: false },
      { time: "09:30 - 10:00 UTC", isBooked: false },
      { time: "10:00 - 10:30 UTC", isBooked: false },
      { time: "10:30 - 11:00 UTC", isBooked: false }
    ]
  }
};

export function FacultyDirectory({ currentLang, isRtl = false }: FacultyDirectoryProps) {
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDept, setActiveDept] = useState("all");
  const [selectedScholar, setSelectedScholar] = useState<any | null>(null);
  
  // Real-time Office Hours slot and dynamic booking states
  const [slotsRegistry, setSlotsRegistry] = useState<typeof INITIAL_SLOTS>(() => {
    const saved = localStorage.getItem('biu_office_hour_slots');
    return saved ? JSON.parse(saved) : INITIAL_SLOTS;
  });

  const [userBookings, setUserBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('biu_office_hour_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep state synced with localStorage safely
  useEffect(() => {
    localStorage.setItem('biu_office_hour_slots', JSON.stringify(slotsRegistry));
  }, [slotsRegistry]);

  useEffect(() => {
    localStorage.setItem('biu_office_hour_bookings', JSON.stringify(userBookings));
  }, [userBookings]);

  // Modal selector states
  const [bookingFormScholar, setBookingFormScholar] = useState<any | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState("2026-06-16");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookReason, setBookReason] = useState("");
  const [videoPlatform, setVideoPlatform] = useState("Google Meet");
  const [bookSuccess, setBookSuccess] = useState(false);
  const [lastGeneratedLink, setLastGeneratedLink] = useState("");

  const [copiedBookingId, setCopiedBookingId] = useState<string | null>(null);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  // Generate real availability status text & color
  const getAvailabilityInfo = (professorId: string) => {
    if (professorId === "prof_1") {
      return { 
        status: "available", 
        color: "bg-emerald-500", 
        text: currentLang === 'ar' ? t.statusAvailable : t.statusAvailable 
      };
    } else if (professorId === "prof_2") {
      return { 
        status: "in-session", 
        color: "bg-amber-500 animate-pulse", 
        text: currentLang === 'ar' ? t.statusInSession : t.statusInSession 
      };
    } else {
      return { 
        status: "offline", 
        color: "bg-slate-600", 
        text: currentLang === 'ar' ? t.statusOffline : t.statusOffline 
      };
    }
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedBookingId(id);
      setShowCopiedAlert(true);
      setTimeout(() => {
        setCopiedBookingId(null);
        setShowCopiedAlert(false);
      }, 2500);
    }).catch(() => {
      // fallback if required
    });
  };

  const filteredScholars = SCHOLARS_DATA.filter(s => {
    const matchesDept = activeDept === "all" || s.department === activeDept;
    const scholarName = (s.name[currentLang as any] || s.name["en"] || "").toLowerCase();
    const scholarTitle = (s.title[currentLang as any] || s.title["en"] || "").toLowerCase();
    const scholarDegree = s.degree.toLowerCase();
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = scholarName.includes(searchLower) || 
                          scholarTitle.includes(searchLower) || 
                          scholarDegree.includes(searchLower) || 
                          s.courses.some(c => c.toLowerCase().includes(searchLower));
    return matchesDept && matchesSearch;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormScholar || !selectedTimeSlot) return;

    // Generate virtual conference link based on random code
    const uniqueRoomCode = Math.random().toString(36).substring(2, 5) + "-" + 
                           Math.random().toString(36).substring(2, 6) + "-" + 
                           Math.random().toString(36).substring(2, 5);
                           
    let rawLink = "";
    if (videoPlatform === "Google Meet") {
      rawLink = `https://meet.google.com/ais-${uniqueRoomCode}`;
    } else if (videoPlatform === "Microsoft Teams") {
      rawLink = `https://teams.live.com/meet/98${Math.floor(10000000 + Math.random() * 90000000)}`;
    } else {
      rawLink = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    }

    setLastGeneratedLink(rawLink);

    // Update state lists
    const updatedSlots = { ...slotsRegistry };
    if (!updatedSlots[bookingFormScholar.id]) {
      updatedSlots[bookingFormScholar.id] = {};
    }
    if (!updatedSlots[bookingFormScholar.id][selectedDateKey]) {
      updatedSlots[bookingFormScholar.id][selectedDateKey] = [];
    }

    updatedSlots[bookingFormScholar.id][selectedDateKey] = updatedSlots[bookingFormScholar.id][selectedDateKey].map(sl => {
      if (sl.time === selectedTimeSlot) {
        return { ...sl, isBooked: true, attendee: bookName };
      }
      return sl;
    });

    setSlotsRegistry(updatedSlots);

    const newBooking = {
      id: "book_" + Date.now(),
      scholarId: bookingFormScholar.id,
      scholarName: bookingFormScholar.name[currentLang] || bookingFormScholar.name["en"],
      scholarAvatar: bookingFormScholar.avatar,
      dateKey: selectedDateKey,
      dateLabel: AVAILABLE_DATES.find(d => d.key === selectedDateKey)?.label[currentLang as any] || selectedDateKey,
      timeSlot: selectedTimeSlot,
      platform: videoPlatform,
      joinLink: rawLink,
      topic: bookReason,
      createdAt: new Date().toISOString()
    };

    setUserBookings([newBooking, ...userBookings]);
    setBookSuccess(true);
  };

  const cancelBooking = (bookingId: string) => {
    const bookingToCancel = userBookings.find(b => b.id === bookingId);
    if (!bookingToCancel) return;

    // Restore slot to registry
    const updatedSlots = { ...slotsRegistry };
    const pId = bookingToCancel.scholarId;
    const dKey = bookingToCancel.dateKey;
    const tSlot = bookingToCancel.timeSlot;

    if (updatedSlots[pId] && updatedSlots[pId][dKey]) {
      updatedSlots[pId][dKey] = updatedSlots[pId][dKey].map(sl => {
        if (sl.time === tSlot) {
          return { ...sl, isBooked: false, attendee: undefined };
        }
        return sl;
      });
      setSlotsRegistry(updatedSlots);
    }

    // Remove from bookings
    setUserBookings(userBookings.filter(b => b.id !== bookingId));
  };

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexDir = isRtl ? 'flex-row-reverse' : 'flex-row';

  return (
    <section id="faculty-directory" className="py-24 bg-slate-950 text-white relative border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-indigo-500/15 font-mono">
            ✨ {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.sectionSub}
          </p>
        </div>

        {/* Real-time Toast alert for link copy */}
        <AnimatePresence>
          {showCopiedAlert && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 bg-emerald-600 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-500"
            >
              <Check className="w-4 h-4" />
              <span>{t.copied}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🛡️ STUDENT COCKPIT: Live scheduled sessions display */}
        {userBookings.length > 0 && (
          <div className="mb-12 bg-slate-900/40 border border-indigo-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
              <Sparkles className="w-48 h-48 text-indigo-500" />
            </div>

            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800/80 pb-4 ${flexDir}`}>
              <div className={textAlignment}>
                <h3 className="text-sm font-black uppercase text-indigo-300 tracking-wider flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                  </span>
                  <span>{t.myBookingsTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-450 mt-1 font-semibold">
                  {currentLang === 'ar' ? 'يمكنك الانضمام مباشرة إلى الفصول الافتراضية بنقر زر واحد.' : 'Click any call coordinator to initiate virtual lecture room connection.'}
                </p>
              </div>
              <span className="bg-indigo-950 text-indigo-400 text-[10px] font-mono px-3 py-1 rounded-xl border border-indigo-500/20 font-bold shrink-0">
                {userBookings.length} {currentLang === 'ar' ? 'جلسة نشطة' : 'Sessions Secured'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-slate-950/60 rounded-2xl p-4.5 border border-slate-850/80 flex flex-col justify-between hover:border-indigo-500/30 transition duration-300 relative"
                >
                  <div className={`flex items-start gap-3.5 mb-4 ${flexDir}`}>
                    <img 
                      src={b.scholarAvatar} 
                      alt={b.scholarName} 
                      className="w-11 h-11 rounded-lg object-cover border border-slate-800 shrink-0" 
                    />
                    <div className={`flex-1 min-w-0 ${textAlignment}`}>
                      <h4 className="text-xs font-black text-white truncate">{b.scholarName}</h4>
                      <div className="flex flex-wrap gap-x-2.5 gap-y-1 items-center mt-1 text-[10px] text-slate-450 font-semibold">
                        <span className="font-mono text-indigo-400 font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {b.dateLabel}
                        </span>
                        <span className="font-mono text-slate-300 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          {b.timeSlot}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 italic line-clamp-1">"{b.topic}"</p>
                    </div>
                  </div>

                  {/* Virtual Link copy & Launcher Section */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-900/85">
                    <a
                      href={b.joinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] py-2 px-3 bg-indigo-650 hover:bg-indigo-600 rounded-xl text-[10px] font-black text-white flex items-center justify-center gap-1.5 transition shadow"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{currentLang === 'ar' ? `دخول ${b.platform}` : `Join via ${b.platform}`}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(b.joinLink, b.id)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
                      title={t.copyLink}
                    >
                      {copiedBookingId === b.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-450" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => cancelBooking(b.id)}
                      className="p-2.5 bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/20 text-slate-400 hover:text-red-400 transition rounded-xl flex items-center justify-center cursor-pointer"
                      title={t.cancelSession}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Toolbar & Search Bar */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-900 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center shrink-0">
            {[
              { id: "all", label: t.allDepartments },
              { id: "sharia", label: t.deptSharia },
              { id: "arabic", label: t.deptArabic },
              { id: "usul", label: t.deptUsul }
            ].map(dept => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[11px] font-black tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeDept === dept.id
                    ? 'bg-indigo-650 border-indigo-500 text-white shadow-lg shadow-indigo-950/40 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Elegant Search Input */}
          <div className="relative w-full md:w-80 font-semibold text-xs text-slate-500">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-slate-950 text-white placeholder-slate-600 border border-slate-900 rounded-xl py-2 px-3 pl-9 text-xs focus:outline-none focus:border-indigo-500 font-semibold ${textAlignment}`}
            />
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredScholars.map((scholar, idx) => {
              const scholName = scholar.name[currentLang as any] || scholar.name["en"];
              const scholTitle = scholar.title[currentLang as any] || scholar.title["en"];
              const avInfo = getAvailabilityInfo(scholar.id);

              return (
                <motion.div
                  key={scholar.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-slate-900/35 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition duration-300 flex flex-col justify-between group relative overflow-hidden"
                  id={`scholar-card-${scholar.id}`}
                >
                  <div className="space-y-4">
                    {/* Headshot & Basic Details */}
                    <div className={`flex items-start gap-4 ${flexDir}`}>
                      <div className="relative shrink-0">
                        <img 
                          src={scholar.avatar} 
                          alt={scholName} 
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover border border-slate-800 group-hover:scale-105 transition"
                        />
                        {/* Real-time Glowing Pulsing Dot */}
                        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950">
                          <span className={`${avInfo.color} h-2.5 w-2.5 rounded-full border border-slate-950 inline-block`}></span>
                        </div>
                      </div>

                      <div className={`flex-1 min-w-0 ${textAlignment}`}>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400">
                            {scholar.department.toUpperCase()}
                          </span>
                          <span className="text-[8.5px] font-black tracking-tighter text-slate-500 font-mono flex items-center gap-1">
                            {avInfo.text}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-sm sm:text-md text-white tracking-tight group-hover:text-indigo-400 transition truncate">
                          {scholName}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                          {scholTitle}
                        </p>
                      </div>
                    </div>

                    <p className={`text-[10px] text-slate-500 font-semibold leading-relaxed border-t border-slate-900/60 pt-3 ${textAlignment}`}>
                      {scholar.bio[currentLang as any] || scholar.bio["en"]}
                    </p>

                    {/* Meta information tags */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-900 space-y-1.5 text-[9px] font-mono">
                      <div className={`flex justify-between text-slate-410 ${flexDir}`}>
                        <span>{currentLang === 'ar' ? 'ساعات التواصل مخصصة:' : 'Academic Office Hours:'}</span>
                        <span className="text-white font-black">{scholar.officeHours}</span>
                      </div>
                      <div className={`flex justify-between text-slate-410 ${flexDir}`}>
                        <span>{currentLang === 'ar' ? 'الميل بريس الأكاديمي:' : 'Secure Scholastic Mail:'}</span>
                        <span className="text-indigo-400 font-bold hover:underline select-all">{scholar.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className={`flex gap-2.5 mt-5 pt-3.5 border-t border-slate-900/65 ${flexDir}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedScholar(scholar)}
                      className="flex-1 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-[10px] font-bold text-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{t.viewProfile}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingFormScholar(scholar);
                        setSelectedTimeSlot(null);
                        setBookSuccess(false);
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-extrabold transition flex items-center justify-center gap-1 shadow-md shadow-indigo-950/20 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 text-indigo-200" />
                      <span>{t.scheduleConsult}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Scholar Portfolio Modal */}
        <AnimatePresence>
          {selectedScholar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedScholar(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm shadow-2xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 p-6 sm:p-8 text-left"
                id="scholar-details-modal"
              >
                <button
                  type="button"
                  onClick={() => setSelectedScholar(null)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white transition p-1 rounded-lg"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Profile Modal Info */}
                <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4.5 pb-5 border-b border-slate-800 ${isRtl ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                  <img 
                    src={selectedScholar.avatar} 
                    alt={selectedScholar.name[currentLang] || selectedScholar.name["en"]} 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-xl shrink-0"
                  />
                  <div className="space-y-1.5 w-full">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-[9px] uppercase tracking-widest border border-indigo-500/15">
                      {t.facultyBadge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {selectedScholar.name[currentLang] || selectedScholar.name["en"]}
                    </h3>
                    <p className="text-xs text-indigo-300 font-bold">
                      {selectedScholar.title[currentLang] || selectedScholar.title["en"]}
                    </p>
                  </div>
                </div>

                <div className="py-5 space-y-4 text-xs leading-relaxed max-w-full">
                  <div className="space-y-1">
                    <span className={`block text-[10px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                      {currentLang === 'ar' ? 'السيرة الذاتية العلمية والخلفية الأكاديمية:' : 'Scholarly Background & Scope:'}
                    </span>
                    <p className={`text-slate-300 font-semibold leading-relaxed ${textAlignment}`}>
                      {selectedScholar.bio[currentLang] || selectedScholar.bio["en"]}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className={`block text-[10px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                      {currentLang === 'ar' ? 'الشهادات والمؤهلات المحققة للدرجة العلمية:' : 'Credentials & Authority Credentials:'}
                    </span>
                    <p className={`text-indigo-200 font-mono font-black ${textAlignment}`}>
                      🎓 {selectedScholar.degree}
                    </p>
                  </div>

                  {/* Syllabus / Courses list */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <span className={`block text-[10px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                      {t.coursesTitle}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedScholar.courses.map((c: string) => (
                        <span key={c} className="bg-slate-950 font-bold px-2 py-1 rounded text-slate-300 font-mono text-[10px] border border-slate-800">
                          📘 {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Research & Publications list */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <span className={`block text-[10px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                      {t.papersTitle}
                    </span>
                    <div className="space-y-2">
                      {selectedScholar.papers.map((p: any, pIdx: number) => (
                        <div key={pIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start gap-2 text-[11px] leading-relaxed">
                          <span className="font-mono text-indigo-400 font-extrabold font-bold shrink-0">[{p.year}]</span>
                          <span className="text-slate-300 font-medium">"{p.title}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedScholar(null)}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ⏳ CAL.COM STYLE SCHEDULER: Schedule Consultation Booking Modal */}
        <AnimatePresence>
          {bookingFormScholar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBookingFormScholar(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl relative z-10 p-5 sm:p-7 text-left max-h-[92vh] overflow-y-auto"
                id="booking-consultation-modal"
              >
                <button
                  type="button"
                  onClick={() => setBookingFormScholar(null)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white transition p-1 rounded-lg cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className={`text-md sm:text-lg font-black text-white tracking-tight mb-3 uppercase flex items-center gap-2 ${flexDir}`}>
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>{t.consultFormTitle}</span>
                </h3>

                <div className={`p-3 bg-slate-950 rounded-xl border border-slate-900 mb-4 flex items-center gap-3 ${flexDir}`}>
                  <img src={bookingFormScholar.avatar} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-white leading-tight">
                      {bookingFormScholar.name[currentLang] || bookingFormScholar.name["en"]}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">
                      {bookingFormScholar.title[currentLang] || bookingFormScholar.title["en"]}
                    </p>
                  </div>
                </div>

                {bookSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-left space-y-4"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-450 font-black text-xs sm:text-sm">
                      <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 animate-bounce" />
                      <span>{t.bookSuccessTitle}</span>
                    </div>

                    <p className="text-[11px] text-slate-350 leading-relaxed font-semibold">
                      {t.consultSuccess}
                    </p>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2.5 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-450">
                        <span>{t.studentName}:</span>
                        <span className="text-white font-extrabold">{bookName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-450">
                        <span>{currentLang === 'ar' ? 'التاريخ واليوم المحجوز:' : 'Scheduled Session Date:'}</span>
                        <span className="text-indigo-400 font-extrabold">
                          {AVAILABLE_DATES.find(d => d.key === selectedDateKey)?.label[currentLang as any] || selectedDateKey}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-450">
                        <span>{currentLang === 'ar' ? 'التوقيت المؤكد:' : 'Confirmed Slot:'}</span>
                        <span className="text-white font-extrabold">{selectedTimeSlot}</span>
                      </div>
                      <div className="flex justify-between text-slate-450">
                        <span>{t.meetingPlatform}</span>
                        <span className="text-indigo-300 font-extrabold">{videoPlatform}</span>
                      </div>
                    </div>

                    {/* Virtual Meeting Link details */}
                    <div className="p-3.5 bg-indigo-950/70 border border-indigo-500/10 rounded-xl space-y-2">
                      <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider block">
                        📹 {t.virtualRoomLink}
                      </span>
                      <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        <span className="text-[10.5px] font-mono text-white select-all truncate flex-1 leading-none">{lastGeneratedLink}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyLink(lastGeneratedLink, "last-booking")}
                          className="p-1 text-indigo-400 hover:text-white transition shrink-0 cursor-pointer"
                          title={t.copyLink}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingFormScholar(null)}
                      className="w-full py-2.5 bg-slate-950 text-slate-300 hover:text-white border border-slate-850 hover:border-slate-750 transition text-xs font-black rounded-xl cursor-pointer"
                    >
                      {t.closeBtn}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Choose Session Date horizontally */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider block">
                        📅 {t.selectDate}
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {AVAILABLE_DATES.map((day) => {
                          const isActive = selectedDateKey === day.key;
                          return (
                            <button
                              key={day.key}
                              type="button"
                              onClick={() => {
                                setSelectedDateKey(day.key);
                                setSelectedTimeSlot(null);
                              }}
                              className={`p-2.5 rounded-xl border text-[9px] sm:text-[10px] font-black text-center transition cursor-pointer ${
                                isActive 
                                  ? 'bg-indigo-650 border-indigo-400 text-white shadow shadow-indigo-950/50' 
                                  : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                              }`}
                            >
                              {day.label[currentLang as any] || day.label["en"]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SELECT HOUR METRIC SLOTS */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider block">
                        🕒 {t.selectTime}
                      </span>
                      <div className="grid grid-cols-2 gap-2 h-28 overflow-y-auto pr-1">
                        {(slotsRegistry[bookingFormScholar.id]?.[selectedDateKey] || []).map((sl, index) => {
                          const isBooked = sl.isBooked;
                          // Check if currently picked
                          const isPicked = selectedTimeSlot === sl.time;

                          return (
                            <button
                              key={index}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedTimeSlot(sl.time)}
                              className={`p-2.5 rounded-xl border font-mono text-[9.5px] font-black text-center transition tracking-tight ${
                                isBooked
                                  ? 'bg-slate-950/30 border-slate-950 text-slate-650 cursor-not-allowed line-through flex items-center justify-center gap-1'
                                  : isPicked
                                    ? 'bg-emerald-600 border-emerald-400 text-white shadow'
                                    : 'bg-slate-950 border-slate-900/80 text-slate-200 hover:text-white hover:border-indigo-500/50 cursor-pointer'
                              }`}
                            >
                              {isBooked ? (
                                <span className="flex items-center gap-1 justify-center">
                                  🔒 {sl.time}
                                </span>
                              ) : (
                                <span>{sl.time}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Credentials input fields (Only visible if a time slot is chosen) */}
                    <AnimatePresence>
                      {selectedTimeSlot && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 pt-2 border-t border-slate-850"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                {t.studentName}
                              </label>
                              <input
                                type="text"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                className={`w-full bg-slate-950 text-white placeholder-slate-700 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
                                placeholder="Arkan Marschall"
                                required
                              />
                            </div>

                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                {t.studentEmail}
                              </label>
                              <input
                                type="email"
                                value={bookEmail}
                                onChange={(e) => setBookEmail(e.target.value)}
                                className={`w-full bg-slate-950 text-white placeholder-slate-700 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
                                placeholder="mail@example.com"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                {t.meetingPlatform}
                              </label>
                              <select
                                value={videoPlatform}
                                onChange={(e) => setVideoPlatform(e.target.value)}
                                className="w-full bg-slate-950 text-white border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer font-bold"
                              >
                                <option value="Google Meet">Google Meet</option>
                                <option value="Zoom Meeting">Zoom Video</option>
                                <option value="Microsoft Teams">Microsoft Teams</option>
                              </select>
                            </div>

                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                {t.consultReason}
                              </label>
                              <input
                                type="text"
                                value={bookReason}
                                onChange={(e) => setBookReason(e.target.value)}
                                className={`w-full bg-slate-950 text-white placeholder-slate-700 border border-slate-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${textAlignment}`}
                                placeholder={t.topicPlaceholder}
                                required
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-550 hover:from-indigo-550 hover:to-indigo-500 text-white text-xs font-black rounded-xl transition duration-200 shadow-md shadow-indigo-950/45 cursor-pointer mt-2"
                          >
                            🛡️ {t.btnConfirmConsult}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

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
