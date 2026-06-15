import { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  User, 
  FileText, 
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Bookmark,
  Printer,
  Volume2
} from 'lucide-react';

export interface SyllabusItem {
  id: string;
  title: string;
  category: string;
  size: string;
}

interface SyllabusPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: SyllabusItem | null;
  currentLang: string;
  isRtl: boolean;
}

// Sub-labels for the modal
const LOCAL_UI: Record<string, {
  previewTitle: string;
  close: string;
  download: string;
  zoom: string;
  page: string;
  of: string;
  searchPlaceholder: string;
  tableOfContents: string;
  courseDetails: string;
  code: string;
  instructor: string;
  credits: string;
  department: string;
  sealText: string;
  searchMatches: string;
  printDoc: string;
  prevPage: string;
  nextPage: string;
}> = {
  ar: {
    previewTitle: "معاينة الملف الأكاديمي التفاعلي",
    close: "إغلاق المعاينة",
    download: "تحميل الملف الكامل",
    zoom: "تكبير/تصغير",
    page: "صفحة",
    of: "من",
    searchPlaceholder: "ابحث عن كلمة داخل المنهج...",
    tableOfContents: "فهرس محتويات المنهج",
    courseDetails: "تفاصيل المساق الدراسي",
    code: "رمز المقرر",
    instructor: "أستاذ المادة",
    credits: "الوحدات الدراسية",
    department: "الكلية / القسم",
    sealText: "الجامعة الإسلامية بروكسل - فرع أوروبا - معتمد أصلًا",
    searchMatches: "تطابق",
    printDoc: "طباعة المنهج",
    prevPage: "الصفحة السابقة",
    nextPage: "الصفحة التالية"
  },
  en: {
    previewTitle: "Interactive PDF Syllabus Preview",
    close: "Close Preview",
    download: "Download Complete PDF",
    zoom: "Zoom Scale",
    page: "Page",
    of: "of",
    searchPlaceholder: "Search keyword inside document...",
    tableOfContents: "Syllabus Content Outline",
    courseDetails: "Academic Course Details",
    code: "Course Code",
    instructor: "Lead Professor",
    credits: "Credit Hours",
    department: "College Department",
    sealText: "Islamic University Brussels - Europe Branch - Verified Official",
    searchMatches: "match(es)",
    printDoc: "Print Document",
    prevPage: "Previous Page",
    nextPage: "Next Page"
  },
  it: {
    previewTitle: "Anteprima Interattiva del Programma PDF",
    close: "Chiudi Anteprima",
    download: "Scarica PDF Completo",
    zoom: "Zoom",
    page: "Pagina",
    of: "di",
    searchPlaceholder: "Cerca parole chiave nel documento...",
    tableOfContents: "Indice dei Contenuti",
    courseDetails: "Dettagli del Corso Accademico",
    code: "Codice Corso",
    instructor: "Professore Titolare",
    credits: "Crediti Formativi",
    department: "Dipartimento",
    sealText: "Università Islamica di Bruxelles - Sede Europea - Verificato Ufficiale",
    searchMatches: "corrispondenze",
    printDoc: "Stampa Documento",
    prevPage: "Pagina Precedente",
    nextPage: "Pagina Successiva"
  },
  fr: {
    previewTitle: "Aperçu Interactif du Syllabus PDF",
    close: "Fermer l'aperçu",
    download: "Télécharger le PDF complet",
    zoom: "Zoom",
    page: "Page",
    of: "sur",
    searchPlaceholder: "Rechercher un mot-clé...",
    tableOfContents: "Sommaire du Programme",
    courseDetails: "Détails Académiques du Cours",
    code: "Code du Cours",
    instructor: "Professeur Principal",
    credits: "Heures de Crédit",
    department: "Faculté / Département",
    sealText: "Université Islamique de Bruxelles - Branche Europe - Officiel",
    searchMatches: "correspondance(s)",
    printDoc: "Imprimer le Document",
    prevPage: "Page Précédente",
    nextPage: "Page Suivante"
  },
  de: {
    previewTitle: "Interaktive PDF-Lehrplanvorschau",
    close: "Vorschau schließen",
    download: "Vollständiges PDF herunterladen",
    zoom: "Zoom",
    page: "Seite",
    of: "von",
    searchPlaceholder: "Suchwort im Dokument finden...",
    tableOfContents: "Lehrplan-Inhaltsübersicht",
    courseDetails: "Akademische Kursdetails",
    code: "Kurs-Code",
    instructor: "Leitender Professor",
    credits: "Semesterwochenstunden",
    department: "Fakultätsbereich",
    sealText: "Islamische Universität Brüssel - Europa-Zweig - Offiziell Verifiziert",
    searchMatches: "Treffer",
    printDoc: "Dokument drucken",
    prevPage: "Vorherige Seite",
    nextPage: "Nächste Seite"
  }
};

interface SyllabusPage {
  pageNum: number;
  chapterTitle: string;
  sections: string[];
  paragraphs: string[];
}

interface SyllabusDocument {
  id: string;
  code: string;
  instructor: Record<string, string>;
  credits: string;
  department: Record<string, string>;
  pages: SyllabusPage[];
}

// Fully loaded simulated PDF documents with rich content in all supported languages
const SYLLABUS_DOCUMENTS: Record<string, SyllabusDocument> = {
  // Modern Financial Jurisprudence
  "modern-finance": {
    id: "modern-finance",
    code: "IUB-EC-502",
    instructor: {
      ar: "أ.د. محمد الشامي",
      en: "Prof. Dr. Mohamed El-Shamy",
      it: "Prof. Dr. Mohamed El-Shamy",
      fr: "Prof. Dr. Mohamed El-Shamy",
      de: "Prof. Dr. Mohamed El-Shamy"
    },
    credits: "4 ECTS",
    department: {
      ar: "كلية الاقتصاد والمصرفية الإسلامية",
      en: "College of Islamic Economics & Banking",
      it: "Facoltà di Economia e Banche Islamiche",
      fr: "Faculté d'Économie et de Banque Islamique",
      de: "Fachbereich Islamische Ökonomie & Banken"
    },
    pages: [
      {
        pageNum: 1,
        chapterTitle: "الباب الأول: مقدمة المعاملات المالية | Section 1: Introduction",
        sections: ["1.1 Theoretical Framework", "1.2 Money and Value Theory"],
        paragraphs: [
          "تعتبر المعاملات المالية في الفقه الإسلامي ركيزة أساسية لتنظيم العلاقات الاقتصادية بناءً على العدالة والنزاهة وتجنب الظلم والمخاطرة. يتناول هذا الفصل الأصول الفقهية للعقود وتاريخ تطور العملات الورقية والإلكترونية في ضوء الضوابط الشرعية المعاصرة.",
          "Through comparative analysis, students will trace the evolution of ethical market exchange from barter trade structures to paper fiat system, examining the classical juristic consensus (Ijma) on functional monetary replacements."
        ]
      },
      {
        pageNum: 2,
        chapterTitle: "الباب الثاني: البنوك الإسلامية | Section 2: Islamic Banking",
        sections: ["2.1 Murabaha and Musharaka", "2.2 Risk Mitigation Mechanisms"],
        paragraphs: [
          "دراسة تطبيقية معمقة لعقود المرابحة للآمر بالشراء، وعقود المشاركة المنتهية بالتمليك المستخدمة على نطاق واسع في المصارف المرخصة في بروكسل وعموم القارة الأوروبية. نناقش الأخطاء الشائعة والبدائل الفقهية المبتكرة للتخفيف من نسبة المخاطر الائتمانية دون التقعر في مستنقع الربا.",
          "Practical application models of Islamic financing products including Leasing (Ijarah) and Cost-Plus financing (Murabaha) under Belgian civil laws and regulatory compliance frameworks."
        ]
      },
      {
        pageNum: 3,
        chapterTitle: "الباب الثالث: الصكوك والتكافل | Section 3: Sukuk & Takaful",
        sections: ["3.1 Sukuk Issuance Standards", "3.2 Mutual Insurance Systems"],
        paragraphs: [
          "هندسة الصكوك الإسلامية كأداة مالية توفر السيولة لمشاريع البنى التحتية والتملك الإستثماري. تشمل الدراسة معايير هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI) ومبادئ التأمين التعاوني (التكافل) كبديل أخلاقي لشركات التأمين التجاري المعتادة.",
          "Securitization structures and Sukuk asset-backed certificates representing undivided ownership in tangible assets is heavily evaluated alongside standard risk management guidelines."
        ]
      },
      {
        pageNum: 4,
        chapterTitle: "الباب الرابع: الاقتصاد الرقمي | Section 4: Digital Economy",
        sections: ["4.1 Crypto Assets Jurisprudence", "4.2 Smart Contracts & FinTech"],
        paragraphs: [
          "يبحث هذا الفصل المتميز النوازل الفقهية الجديدة المترتبة على الأصول الرقمية والمشفرة، والحكم الشرعي لأدوات التمويل الجماعي اللامركزي، والعقود الذكية المبنية على تكنولوجيا البلوكشين وتأثيرها على مفهوم القبض وصحة العقود.",
          "Juristic examination of Decentralized Finance (DeFi) platforms, cryptographic token validation thresholds, and decentralized peer-to-peer ethical contracting platforms."
        ]
      }
    ]
  },
  // Studies in Constitutional Law
  "constitutional-law": {
    id: "constitutional-law",
    code: "IUB-LA-612",
    instructor: {
      ar: "د. طارق مراد",
      en: "Dr. Tarek Mourad",
      it: "Dr. Tarek Mourad",
      fr: "Dr. Tarek Mourad",
      de: "Dr. Tarek Mourad"
    },
    credits: "3 ECTS",
    department: {
      ar: "كلية الشريعة وأصول الفقه كقسم مقارن",
      en: "College of Sharia (Comparative Law Division)",
      it: "Facoltà di Sharia (Diritto Comparato)",
      fr: "Faculté de Sharia (Droit Comparé)",
      de: "Fachbereich Scharia (Vergleichendes Recht)"
    },
    pages: [
      {
        pageNum: 1,
        chapterTitle: "الباب الأول: النظرية الدستورية | Section 1: Constitutional Theory",
        sections: ["1.1 Concept of Sovereignty", "1.2 Shura and Representative Rule"],
        paragraphs: [
          "تأصيل تاريخي مقارن لمفهوم السيادة والسلطة الدستورية في الفكر والتشريعات الإسلامية وفي الفقه الدستوري الغربي المعاصر. كيف تخدم نصوص الشورى وآليات أهل الحل والعقد مفاهيم الانتخاب الشعبي النزيه وصياغة الدساتير المنظمة للدول.",
          "A comparative study exploring the conceptual roots of political authority, civil rule, and social contract theories ranging from classical theorists like Al-Mawardi to modern systems of governance."
        ]
      },
      {
        pageNum: 2,
        chapterTitle: "الباب الثاني: الفصل بين السلطات | Section 2: Separation of Powers",
        sections: ["2.1 Executive and Legislative Relationship", "2.2 Judicial Independence"],
        paragraphs: [
          "استكشاف تطبيقي لأهمية الفصل المرن بين السلطة التنفيذية والتشريعية واستقلال القضاء الشرعي والمدني لضمان سيادة القانون وحفظ الحقوق الفردية العامة وتطبيقاته العملية بالمجتمعات الأوروبية الديمقراطية.",
          "Analyzing check-and-balance doctrines, constitutional court jurisdictions, public accountability mechanisms, and structural independence thresholds for legal supreme councils."
        ]
      },
      {
        pageNum: 3,
        chapterTitle: "الباب الثالث: الحريات الدستورية | Section 3: Civil Liberties",
        sections: ["3.1 Freedom of Expression", "3.2 Non-Discrimination Clauses"],
        paragraphs: [
          "يبحث هذا الفصل في مبدأ صون كرامة الإنسان وحقوق الأقليات والتشريعات الضامنة لحرية الضمير وممارسة المبادئ الدينية في البيئات التعددية المعاصرة مع دراسة القرارات الدستورية ببلجيكا والاتحاد الأوروبي.",
          "Exploring fundamental human rights guarantees, public security limits, comparative civil code frameworks, and legal protections drafted inside national constitutional assemblies."
        ]
      }
    ]
  },
  // Scientific Methodology Guide
  "scientific-methodology": {
    id: "scientific-methodology",
    code: "IUB-RM-901",
    instructor: {
      ar: "أ.د. عبد الرحمن بوزياني",
      en: "Prof. Dr. Abdelrahman Bouziani",
      it: "Prof. Dr. Abdelrahman Bouziani",
      fr: "Prof. Dr. Abdelrahman Bouziani",
      de: "Prof. Dr. Abdelrahman Bouziani"
    },
    credits: "5 ECTS",
    department: {
      ar: "قسم الدراسات العليا والبحث الأكاديمي المشترك",
      en: "Postgraduate & Academic Research Division",
      it: "Dipartimento degli Studi Post-Laurea",
      fr: "Département des Études Post-Graduées",
      de: "Bereich Postgraduale Studien & Forschung"
    },
    pages: [
      {
        pageNum: 1,
        chapterTitle: "الباب الأول: صياغة خطة البحث العلمي | Section 1: Research Proposal",
        sections: ["1.1 Problem Statement Definition", "1.2 Literature Mapping Principles"],
        paragraphs: [
          "خطوات كتابة الإطار المنهجي المعتمد لرسائل الدكتوراه والماجستير بفرع أوروبا، بما في ذلك تحديد الفجوة البحثية المعرفية وصياغة تساؤلات الدراسة وتحديد الأهداف بوضوح علمي لا يقبل التأويل الفضفاض.",
          "Meticulous walkthrough of constructing professional doctoral thesis abstracts, validating hypotheses, establishing scientific scopes, and creating timeline projection frameworks."
        ]
      },
      {
        pageNum: 2,
        chapterTitle: "الباب الثاني: أدوات البحث العلمي | Section 2: Academic Methodology",
        sections: ["2.1 Inductive vs. Analytical Methods", "2.2 Case Study and Field Surveys"],
        paragraphs: [
          "شرح مفصل لكيفية توظيف المنهج الاستقرائي، والمنهج التحليلي المقارن، وربطها بالبحوث الميدانية الاستقصائية لطلبة كليات التربية والاقتصاد بهدف الخروج بنتائج وقوانين دقيقة قابلة للتطبيق الواقعي والتحقق التجريبي.",
          "Investigating key differences between qualitative thematic interpretations and quantitative survey datasets. Practical workshops in statistical analytical software (SPSS) are detailed."
        ]
      },
      {
        pageNum: 3,
        chapterTitle: "الباب الثالث: أخلاقيات البحث العلمي والتوثيق | Section 3: Ethics & Citation",
        sections: ["3.1 APA and Chicago citation Styles", "3.2 Plagiarism Prevention Systems"],
        paragraphs: [
          "معايير الأمانة العلمية الصارمة بجامعة بروكسل الإسلامية. طرق التوثيق السليم لمراجع كتب التراث ومقالات المجلات المحكمة الحديثة، وكيفية التعامل مع برمجيات التحقق من الانتحال العلمي (Turnitin) لتجنب الإقصاء الأكاديمي.",
          "Comprehensive guidance on citation architectures, formatting tables, bibliography listings, digital archiving standards, and handling international copyrights for scientific figures."
        ]
      }
    ]
  },
  // Lectures in Islamic History / Audio Syllabus
  "islamic-history": {
    id: "islamic-history",
    code: "IUB-HS-201",
    instructor: {
      ar: "د. هانية فاروقي",
      en: "Dr. Hania Farouqi",
      it: "Dr. Hania Farouqi",
      fr: "Dr. Hania Farouqi",
      de: "Dr. Hania Farouqi"
    },
    credits: "3 ECTS",
    department: {
      ar: "كلية التربية وأصول الدين التاريخية",
      en: "College of Education and Islamic History",
      it: "Facoltà di Educazione e Storia Islamica",
      fr: "Faculté d'Éducation et Histoire Islamique",
      de: "Fachbereich Erziehungswissenschaften & Geschichte"
    },
    pages: [
      {
        pageNum: 1,
        chapterTitle: "الباب الأول: العهد الملكي النبوي | Section 1: Meccan Era",
        sections: ["1.1 Prophetic Pedagogy", "1.2 Core Doctrinal Hardening"],
        paragraphs: [
          "تتبع تاريخي وتربوي للأطوار الصعبة للدعوة الإسلامية في مكة المكرمة الفاضلة. كيف ساهمت الممارسات التربوية النبوية والرحلات السرية في صقل النفوس وتأسيس النواة الصلبة للمجتمع القيمي القادر على مواجهة الاستبداد.",
          "Sociological and educational perspectives on the initial propagation period in Mecca, studying pedagogical methods utilized to foster ethical resilience within a hostile pluralistic climate."
        ]
      },
      {
        pageNum: 2,
        chapterTitle: "الباب الثاني: تأسيس دولة المدينة | Section 2: Madinah Covenant",
        sections: ["2.1 The Constitution of Madinah", "2.2 Institutional Building"],
        paragraphs: [
          "تحليل دستوري وتاريخي شامل لوثيقة المدينة المنورة الكبرى كأول وثيقة تعايش سلمي مكتوبة تضمن حقوق الأقليات والتعددية الدستورية والدينية. تأسيس أول قضاء مستقل ومؤسسات الضمان والمسؤولية الأمنية المشتركة.",
          "Rigorous critical review of the Madinah charter, mapping its constitutional articles representing pioneering examples of collaborative municipal agreements and multi-faith civic duties."
        ]
      },
      {
        pageNum: 3,
        chapterTitle: "الباب الثالث: الحضارة الأندلسية والتبادل الفكري | Section 3: Andalusian Golden Age",
        sections: ["3.1 Translation Movement in Cordoba", "3.2 Multi-Cultural Intellectual Synthesis"],
        paragraphs: [
          "دراسة علمية لدور المسلمين في الحضارة الأندلسية كجسر حيوي لانتقال الفلسفة، الطب، والعلوم التطبيقية إلى أوروبا الوسطى. نركز على عواصم الفكر مثل قرطبة وطليطلة وكيف أنتجت نموذجًا فريدًا للتعايش الفلسفي والتسامح.",
          "Examining Cordovan scholarship networks that bridged Eastern philosophy with European educational centers, giving rise to Renaissance scientific progress through comparative translations."
        ]
      }
    ]
  }
};

export default function SyllabusPreviewModal({ 
  isOpen, 
  onClose, 
  item, 
  currentLang, 
  isRtl 
}: SyllabusPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'reading' | 'table'>('reading');
  const [highlightMatches, setHighlightMatches] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick language fallback key
  const uiLang = LOCAL_UI[currentLang] ? currentLang : 'ar';
  const labels = LOCAL_UI[uiLang] || LOCAL_UI.ar;

  // Find the simulated PDF document based on item title mapping or defaults
  const getDocId = (): string => {
    if (!item) return "modern-finance";
    const titleLower = item.title.toLowerCase();
    if (titleLower.includes("financial") || titleLower.includes("مالية") || titleLower.includes("finance")) {
      return "modern-finance";
    }
    if (titleLower.includes("constitutional") || titleLower.includes("دستوري") || titleLower.includes("law")) {
      return "constitutional-law";
    }
    if (titleLower.includes("methodology") || titleLower.includes("منهجية") || titleLower.includes("guide")) {
      return "scientific-methodology";
    }
    return "islamic-history";
  };

  const docId = getDocId();
  const document = SYLLABUS_DOCUMENTS[docId] || SYLLABUS_DOCUMENTS["modern-finance"];
  const totalPages = document.pages.length;
  const activePageData = document.pages.find(p => p.pageNum === currentPage) || document.pages[0];

  // Reset page when document details change
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setHighlightMatches(0);
  }, [docId]);

  // Compute search matches count
  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightMatches(0);
      return;
    }
    const q = searchQuery.toLowerCase();
    let count = 0;
    
    // Check paragraphs and heading text of current page for count
    activePageData.paragraphs.forEach(para => {
      const pText = para.toLowerCase();
      let index = pText.indexOf(q);
      while (index !== -1) {
        count++;
        index = pText.indexOf(q, index + 1);
      }
    });
    
    if (activePageData.chapterTitle.toLowerCase().includes(q)) {
      count++;
    }

    setHighlightMatches(count);
  }, [searchQuery, currentPage, docId]);

  if (!isOpen || !item) return null;

  // Zoom control triggers
  const increaseZoom = () => setZoomLevel(prev => Math.min(prev + 10, 150));
  const decreaseZoom = () => setZoomLevel(prev => Math.max(prev - 10, 80));

  // Switch pages safely
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Helper function to render text with highlighted matching keywords
  const renderHighlightedText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-250 text-gray-950 font-black px-0.5 rounded shadow-sm py-0.5 border border-amber-300">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Trigger browser print of the simulated PDF container content
  const handlePrint = () => {
    const printContent = containerRef.current?.innerHTML;
    const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (winPrint) {
      winPrint.document.write(`
        <html>
          <head>
            <title>${document.instructor[uiLang]} - ${item.title}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.6; direction: ${isRtl ? 'rtl' : 'ltr'}; }
              h1 { border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 20px; }
              .chapter { font-size: 1.3em; font-weight: bold; margin-top: 30px; border-bottom: 1px dashed #666; padding-bottom: 5px; }
              .para { font-size: 1.1em; margin-bottom: 15px; text-align: justify; }
              .details { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
              .seal { text-align: center; margin-top: 40px; color: #444; font-size: 0.9em; border-top: 1px solid #ddd; padding-top: 20px; }
            </style>
          </head>
          <body>
            <h1>${item.title} - Academic Syllabus</h1>
            <div class="details">
              <p><strong>Lead Professor:</strong> ${document.instructor[uiLang]}</p>
              <p><strong>Course Code:</strong> ${document.code}</p>
              <p><strong>Credits Hours:</strong> ${document.credits}</p>
              <p><strong>Department:</strong> ${document.department[uiLang]}</p>
            </div>
            ${document.pages.map(p => `
              <div class="chapter">${p.chapterTitle}</div>
              ${p.paragraphs.map(para => `<p class="para">${para}</p>`).join('')}
            `).join('<hr style="border:0;border-top:1px solid #ccc;margin:40px 0;"/>')}
            <div class="seal">${labels.sealText}</div>
          </body>
        </html>
      `);
      winPrint.document.close();
      winPrint.focus();
      winPrint.print();
      winPrint.close();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in transition-all">
      <div className="relative w-full h-full sm:max-w-6xl sm:h-[92vh] bg-white dark:bg-[#0b1120] rounded-none sm:rounded-3xl shadow-2xl border-none sm:border border-gray-150 dark:border-slate-800/80 overflow-hidden flex flex-col transition-colors duration-300">
        
        {/* TOP TOOLBAR */}
        <div className={`p-4 bg-slate-50 dark:bg-[#11192e] border-b border-gray-150 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between select-none ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          
          {/* File Badge & Name Info */}
          <div className={`flex items-center gap-3 w-full md:w-auto ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse border border-blue-500/15">
              <BookOpen className="w-5.5 h-5.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-wider block">
                {document.code} • {item.category}
              </p>
              <h3 className="text-xs sm:text-sm font-extrabold text-gray-950 dark:text-slate-50 truncate" title={item.title}>
                {item.title}
              </h3>
            </div>
          </div>

          {/* Interactive Document Controls Widget Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4.5 w-full md:w-auto">
            
            {/* Search Input inside the file */}
            <div className="relative w-full max-w-[200px] sm:max-w-[220px]">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-2.5' : 'left-2.5'} flex items-center pointer-events-none`}>
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-1.5 ${isRtl ? 'pr-8.5 pl-3' : 'pl-8.5 pr-3'} text-xs bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700/60 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold`}
              />
              {highlightMatches > 0 && (
                <span className={`absolute ${isRtl ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-[9px] bg-amber-500 text-slate-950 px-1 py-0.5 rounded font-black font-mono`}>
                  {highlightMatches} {labels.searchMatches}
                </span>
              )}
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#1e293b] rounded-lg border border-gray-200 dark:border-slate-700/60 px-1.5 py-1 text-slate-700 dark:text-slate-300">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title={labels.prevPage}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] sm:text-xs font-bold px-1.5 font-mono min-w-[55px] text-center">
                {labels.page} {currentPage} / {totalPages}
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title={labels.nextPage}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1e293b] rounded-lg border border-gray-200 dark:border-slate-700/60 px-1 py-1">
              <button 
                onClick={decreaseZoom} 
                disabled={zoomLevel <= 80}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-40 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-600 dark:text-gray-300 w-11 text-center select-none">
                {zoomLevel}%
              </span>
              <button 
                onClick={increaseZoom} 
                disabled={zoomLevel >= 150}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-40 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print trigger */}
            <button
              onClick={handlePrint}
              className="p-2 bg-white dark:bg-[#1e293b] hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-300 rounded-lg border border-gray-200 dark:border-slate-700/60 transition cursor-pointer"
              title={labels.printDoc}
            >
              <Printer className="w-4 h-4" />
            </button>

          </div>

          {/* Action Call for download & Close */}
          <div className="flex items-center gap-2 select-none">
            <button
              onClick={onClose}
              className="p-2 sm:px-3.5 sm:py-2 bg-gray-100 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl transition font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-gray-200/20"
              aria-label={labels.close}
            >
              <X className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">{labels.close}</span>
            </button>
          </div>

        </div>

        {/* MAIN BODY DISPLAY */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          
          {/* SIDEBAR: CONTENTS OUTLINE & METADATA */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-[#11192e] border-b md:border-b-0 md:border-r dark:border-slate-800 p-4 overflow-y-auto select-none flex flex-col justify-between">
            
            <div className="space-y-5">
              
              {/* College Credentials Block */}
              <div className={`p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-150 dark:border-slate-700/60 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-2 font-black uppercase text-[10px] text-blue-500 dark:text-blue-400 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <GraduationCap className="w-4 h-4" />
                  <span>{labels.courseDetails}</span>
                </div>
                
                <p className="text-[11px] text-gray-400 font-bold uppercase">{labels.department}</p>
                <p className="text-xs font-extrabold text-[#0f172a] dark:text-slate-200 mt-0.5 leading-snug">
                  {document.department[uiLang]}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 dark:border-slate-700/40 pt-3">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">{labels.code}</span>
                    <span className="text-[10px] font-black font-mono text-gray-950 dark:text-slate-200">{document.code}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">{labels.credits}</span>
                    <span className="text-[10px] font-black font-mono text-amber-500">{document.credits}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-slate-700/40">
                  <span className="text-[9px] text-gray-400 font-bold block uppercase">{labels.instructor}</span>
                  <div className={`flex items-center gap-1.5 mt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-black text-[#0f172a] dark:text-slate-200 block truncate">{document.instructor[uiLang]}</span>
                  </div>
                </div>
              </div>

              {/* Document Pages Checklist Tree */}
              <div>
                <h4 className={`text-xs font-black text-gray-950 dark:text-slate-50 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>{labels.tableOfContents}</span>
                </h4>
                
                <div className="space-y-2">
                  {document.pages.map((p) => {
                    const isActive = currentPage === p.pageNum;
                    return (
                      <button
                        key={p.pageNum}
                        onClick={() => setCurrentPage(p.pageNum)}
                        className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'} ${isActive ? 'bg-blue-500/10 border-blue-400 text-blue-500 dark:text-blue-400 font-extrabold shadow-sm' : 'bg-transparent border-transparent text-gray-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'}`}
                      >
                        <div className={`flex items-center gap-2 min-w-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-black ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400'}`}>
                            {p.pageNum}
                          </span>
                          <span className="text-[10px] truncate leading-tight block">
                            {p.chapterTitle.split('|')[uiLang === 'ar' ? 0 : 1]?.trim() || p.chapterTitle}
                          </span>
                        </div>
                        {isActive && <FileCheck2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Safe Seal signature element representing verified academic curriculum */}
            <div className={`mt-6 p-3 bg-[#e0f2fe] dark:bg-blue-950/20 text-[#0369a1] dark:text-blue-300 rounded-2xl border border-[#bae6fd] dark:border-blue-900/40 text-[9px] font-extrabold leading-snug flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{labels.sealText}</span>
            </div>

          </div>

          {/* DOCUMENT RAW CANVAS CONTAINER VIEW */}
          <div className="flex-grow bg-[#1e293b]/5 dark:bg-[#090d16] p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
            <div 
              ref={containerRef}
              className="w-full max-w-3xl bg-[#faf8f5] dark:bg-[#f6f4f0] text-gray-950 p-8 sm:p-14 rounded-2xl shadow-xl transition-transform duration-300 relative border border-gray-250 min-h-[580px] flex flex-col justify-between"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                fontFamily: "'Amiri', 'Georgia', serif" 
              }}
            >
              
              {/* Paper Watermark Ornament Star */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <div className="w-80 h-80 rounded-full border-8 border-gray-900 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-gray-950/40 flex items-center justify-center text-center font-bold font-serif text-lg leading-normal">
                    {labels.sealText}
                  </div>
                </div>
              </div>

              {/* Running Header */}
              <div className={`flex justify-between items-center text-[10px] font-sans font-bold text-gray-400 border-b border-gray-250 pb-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span>{labels.sealText}</span>
                <span className="font-mono">{document.code}</span>
              </div>

              {/* Content Space Pages */}
              <div>
                
                {/* Active Chapter Label */}
                <h2 className={`text-sm sm:text-base font-black text-gray-900 mb-8 border-r-4 border-amber-500 pr-3 leading-snug ${isRtl ? 'text-right' : 'text-left'}`}>
                  {renderHighlightedText(activePageData.chapterTitle.split('|')[uiLang === 'ar' ? 0 : 1]?.trim() || activePageData.chapterTitle)}
                </h2>

                {/* Subsections listed */}
                <div className={`flex flex-wrap gap-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {activePageData.sections.map((sec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-sans font-black text-amber-900">
                      § {sec}
                    </span>
                  ))}
                </div>

                {/* Main Paragraph Texts */}
                <div className="space-y-6 text-sm leading-relaxed sm:text-base text-gray-800 text-justify">
                  {activePageData.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="indent-6">
                      {renderHighlightedText(para)}
                    </p>
                  ))}
                </div>

              </div>

              {/* Running Footer - Signature Stamp */}
              <div className={`flex justify-between items-center text-[10px] font-sans font-bold text-gray-400 border-t border-gray-250 pt-4 mt-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span>Page {currentPage} of {totalPages}</span>
                <span className="uppercase text-neutral-400">{document.code} APPROVED SYLLABUS DOCUMENT</span>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM DOWNLOAD QUICK TRIGGER BAR */}
        <div className="p-4.5 bg-slate-50 dark:bg-[#11192e] border-t border-gray-150 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Volume2 className="w-4 h-4 text-blue-500" />
            <span className="text-[11px] font-bold">{currentLang === 'ar' ? 'يتوفر المنهج باللغتين العربية والإنجليزية كاملتين.' : 'Full syllabus files are ready for student local print.'}</span>
          </div>

          <a
            href={`/data/${docId}.pdf`} // Simulated file download path helper
            onClick={(e) => {
              // Simulate download alert/trigger nicely
              e.preventDefault();
              alert(currentLang === 'ar' ? `🎉 جاري بدء تحميل المنهج الكامل: ${item.title} (${item.size})` : `🎉 Initializing download for: ${item.title} (${item.size})`);
            }}
            className="w-full sm:w-auto py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{labels.download} ({item.size})</span>
          </a>
        </div>

      </div>
    </div>
  );
}
