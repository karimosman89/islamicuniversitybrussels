/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Globe, 
  Users, 
  BookOpen, 
  FileCheck, 
  Phone, 
  Mail, 
  Facebook, 
  Calendar,
  CheckCircle2,
  Award,
  Zap,
  MessageCircle,
  Search,
  Calculator,
  HelpCircle,
  Check,
  ChevronDown,
  Tv,
  ShieldCheck,
  Sparkles,
  Laptop,
  Sun,
  Moon,
  Eye,
  Layers,
  MapPin,
  Download
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { MapHoverTooltip } from './components/MapHoverTooltip';

import logoUrl from './assets/images/university_logo_1781475046944.jpg';
import directorUrl from './assets/images/director_profile_new_1781487073997.jpg';
import repTurkeyUrl from './assets/images/rep_turkey_1781487089023.jpg';
import repKsaUrl from './assets/images/rep_ksa_1781487105150.jpg';
import repItalyUrl from './assets/images/rep_italy_1781487122078.jpg';
import repMediaUrl from './assets/images/rep_media_1781487138931.jpg';

const REP_AVATAR_IMAGES = [
  repTurkeyUrl,
  repKsaUrl,
  repItalyUrl,
  repMediaUrl
];

import { TRANSLATIONS } from './translations';
import StudentVoices from './components/StudentVoices';
import SyllabusPreviewModal, { SyllabusItem } from './components/SyllabusPreviewModal';
import UniversityChatbot from './components/UniversityChatbot';
import { AcademicNewsFeed } from './components/AcademicNewsFeed';
import { AdmissionForm } from './components/AdmissionForm';
import { StudentActivities } from './components/StudentActivities';
import { AcademicEvents } from './components/AcademicEvents';
import { DigitalLibrary } from './components/DigitalLibrary';
import { UniversityFaqs } from './components/UniversityFaqs';
import { StudentQuickLinks } from './components/StudentQuickLinks';
import { AcademicRoadmap } from './components/AcademicRoadmap';
import { AcademicPerformanceRadar } from './components/AcademicPerformanceRadar';
import { StudentDashboard } from './components/StudentDashboard';

const DEGREE_TOOLTIP_CONTENT = {
  en: "Pricing varies by degree level. Bachelor base tuition is 1000 EUR, Master base tuition is 1200 EUR, and PhD base tuition is 1400 EUR.",
  ar: "تختلف الرسوم باختلاف برنامج الدراسة. رسوم البكالوريوس الأساسية 1000 يورو، والماجستير 1200 يورو، والدكتوراه 1400 يورو.",
  it: "La tariffa varia in base al livello di studi. La retta base per la Triennale è 1000 EUR, Magistrale 1200 EUR, e Dottorato 1400 EUR.",
  de: "Die Studiengebühren variieren je nach Studiengang. Bachelor-Grundgebühr beträgt 1000 EUR, Master-Grundgebühr 1200 EUR und PhD-Grundgebühr 1400 EUR.",
  fr: "Les tarifs varient selon le diplôme. La scolarité de base est de 1000 EUR pour la Licence, 1200 EUR pour le Master, et 1400 EUR pour le Doctorat."
};

const QURAN_TOOLTIP_CONTENT = {
  en: "Checking this honors you as a Quran memorizer with a dedicated merit scholarship, deducting 20% from the Bachelor base fee, or 10% from the Master/PhD base fee.",
  ar: "تفعيل هذا الخيار يمنحك منحة استحقاق خاصة لحفظة القرآن الكريم، مما يخصم 20% من الرسوم الأساسية للبكالوريوس، أو 10% لبرامج الماجستير والدكتوراه.",
  it: "Selezionando questa opzione, riceverai una borsa di studio di merito scolastica dedicata ai memorizzatori del Corano, risparmiando il 20% della retta base per la Triennale o il 10% per Magistrale/Dottorato.",
  de: "Durch Aktivierung dieser Option erhalten Sie ein Leistungsstipendium für das Auswendiglernen des Korans, wodurch 20 % der Bachelor-Grundgebühr bzw. 10 % der Master-/PhD-Grundgebühr abgezogen werden.",
  fr: "En cochant cette option, vous bénéficiez d'une bourse de mérite spéciale pour la mémorisation du Coran, déduisant 20 % des frais de base de Licence ou 10 % de ceux de Master/Doctorat."
};

const SHIPPING_TOOLTIP_CONTENT = {
  en: "Adds a flat 150 EUR to cover printing premium heavy-stock parchment, university seal stamping, legal apostille verification, and secure DHL international express parcel couriers.",
  ar: "يضيف 150 يورو لتغطية طباعة المستندات على ورق البردي المقوى الفاخر، والختم الجامعي البارز، والتوثيق القانوني، وشحنها الدولي الآمن والسريع عبر DHL.",
  it: "Aggiunge 150 EUR per coprire la stampa dei documenti su carta pergamena pesante premium, la bollatura accademica, l'apostille legale e il corriere espresso internazionale DHL.",
  de: "Fügt pauschal 150 EUR hinzu zur Abdeckung des Drucks auf Premium-Karton, der Prägung des Universitätssiegels, der Apostille-Beglaubigung und des versicherten internationalen Expressversands per DHL.",
  fr: "Ajoute un forfait de 150 EUR pour couvrir l'impression sur parchemin de qualité supérieure, le sceau de l'université, la certification apostille et l'envoi sécurisé par courrier express international DHL."
};

const SUPPORT_TOOLTIP_CONTENT = {
  en: "Adds a flat 100 EUR to assign a designated supervisor for personalized thesis guidance, weekly follow-up research reviews, and direct academic chat pipeline.",
  ar: "يضيف 100 يورو لتعيين مشرف أكاديمي خاص لمرافقتك في كتابة رسالة البحث، والمتابعة الأسبوعية الدقيقة، وتوفير قنوات اتصال تفاعلية مباشرة.",
  it: "Aggiunge 100 EUR per l'assegnazione di un tutor accademico finale, revisioni settimanali e chat di supporto diretta.",
  de: "Fügt pauschal 100 EUR hinzu, um einen akademischen Betreuer für die persönliche Begleitung bei der schriftlichen Arbeit, wöchentliche Updates und direkten Kontakt zuzuweisen.",
  fr: "Ajoute un forfait de 100 EUR pour l'attribution d'un directeur académique attitré pour l'aide personnalisée au mémoire, les bilans hebdomadaires et l'accès direct aux conseils."
};

interface InfoTooltipProps {
  content: Record<string, string>;
  currentLang: string;
  isRtl?: boolean;
}

function InfoTooltip({ content, currentLang, isRtl = false }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const text = content[currentLang] || content['en'] || '';

  return (
    <div className="relative inline-block align-middle select-none mx-1 text-slate-400">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="text-slate-400 hover:text-white transition duration-150 ease-in-out focus:outline-none focus:text-white p-0.5 rounded cursor-pointer"
        aria-label="More information"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-30 w-64 p-3 bg-slate-950 text-[10px] font-semibold leading-relaxed text-slate-100 rounded-xl border border-slate-800 shadow-xl pointer-events-none ${
              isRtl ? 'right-0 origin-top-right text-right' : 'left-0 origin-top-left text-left'
            } mt-1`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LANGUAGES = [
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
];

export default function App() {
  const [currentLang, setCurrentLang] = useState('ar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Rotating Academic Background Images (updated each 5s)
  const ACADEMIC_BG_IMAGES = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
  ];

  const [currentBgIdx, setCurrentBgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIdx(prev => (prev + 1) % ACADEMIC_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Global Light/Dark Theme State using CSS variables
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPreference ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // High-Tech Interactive State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [calcDegree, setCalcDegree] = useState<'bachelor' | 'master' | 'phd'>('bachelor');
  const [calcQuran, setCalcQuran] = useState(false);
  const [calcSupport, setCalcSupport] = useState(false);
  const [calcHardcopy, setCalcHardcopy] = useState(false);
  const [campusTab, setCampusTab] = useState<'lectures' | 'library' | 'advising' | 'portal'>('lectures');
  const [eligibilityStep, setEligibilityStep] = useState(0); // 0 = idle, 1 = Q1, 2 = Q2, 3 = Result
  const [eligibilityDegree, setEligibilityDegree] = useState<'bachelor' | 'master' | 'phd' | 'none'>('bachelor');
  const [eligibilityOnline, setEligibilityOnline] = useState<'yes' | 'no'>('yes');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedRepIndex, setSelectedRepIndex] = useState(0);

  // Syllabus Preview states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedSyllabusItem, setSelectedSyllabusItem] = useState<SyllabusItem | null>(null);

  // Enhanced Interactive World Map states
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapMode, setMapMode] = useState<'pins' | 'clusters'>('pins');
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [hoveredClusterId, setHoveredClusterId] = useState<'europe' | 'asia' | 'africa' | null>(null);
  const [mapSearchQuery, setMapSearchQuery] = useState('');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ar;
  const isRtl = t.dir === 'rtl';

  const handleDownloadTranscript = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Colors
      const primaryColor = [11, 77, 55]; // Deep emerald green
      const accentColor = [194, 120, 3]; // Amber
      const textColor = [30, 41, 59]; // Slate 800
      const mutedTextColor = [100, 116, 139]; // Slate 500
      const borderLineColor = [226, 232, 240]; // Slate 200

      // Outer border box
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(1);
      doc.rect(5, 5, 200, 287); // outer frame
      
      doc.setDrawColor(borderLineColor[0], borderLineColor[1], borderLineColor[2]);
      doc.setLineWidth(0.2);
      doc.rect(7, 7, 196, 283); // inner framing line

      // 1. Header Section
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(7, 7, 196, 32, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("ISLAMIC UNIVERSITY OF BRUSSELS", 15, 17);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("UNIVERSITE ISLAMIQUE DE BRUXELLES (IUB)", 15, 22);
      doc.setFontSize(9);
      doc.text("EUROPEAN UNION BRANCH OFFICE - ACCREDITED HIGHER ACADEMIC BOARD", 15, 26);
      
      // Stamp Badge Box
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.rect(160, 12, 32, 20, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("OFFICIAL RECORD", 162, 17);
      doc.setFontSize(7);
      doc.text("BRUSSELS BRANCH", 163, 22);
      doc.text("E-LEARNING PORTAL", 162, 26);

      // Section: Document Title
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("OFFICIAL ACADEMIC TRANSCRIPT & STATUS REPORT", 15, 50);

      // Horizontal separator
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.8);
      doc.line(15, 53, 195, 53);

      // 2. Student Info Grid
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);

      // Column 1
      doc.text("STUDENT NAME:", 15, 62);
      doc.setFont("helvetica", "normal");
      doc.text("Arkan Marschall (Verified Candidate)", 48, 62);

      doc.setFont("helvetica", "bold");
      doc.text("STUDENT ID:", 15, 68);
      doc.setFont("helvetica", "normal");
      doc.setFont("courier", "bold");
      doc.text("EU_BWA_2026_880", 48, 68);
      doc.setFont("helvetica", "normal");

      doc.setFont("helvetica", "bold");
      doc.text("ACADEMIC LEVEL:", 15, 74);
      doc.setFont("helvetica", "normal");
      doc.text("Bachelor of Islamic Studies & Sharia Law", 48, 74);

      doc.setFont("helvetica", "bold");
      doc.text("FACULTY:", 15, 80);
      doc.setFont("helvetica", "normal");
      doc.text("College of Islamic Jurisprudence & Pedagogy", 48, 80);

      // Column 2
      doc.setFont("helvetica", "bold");
      doc.text("DATE OF ISSUE:", 120, 62);
      doc.setFont("helvetica", "normal");
      doc.text("June 15, 2026", 155, 62);

      doc.setFont("helvetica", "bold");
      doc.text("ACTIVE SEMESTER:", 120, 68);
      doc.setFont("helvetica", "normal");
      doc.text("Spring S2 (2026)", 155, 68);

      doc.setFont("helvetica", "bold");
      doc.text("MATRICULATION:", 120, 74);
      doc.setFont("helvetica", "normal");
      doc.text("ACTIVE & FULLY AUDITED", 155, 74);

      doc.setFont("helvetica", "bold");
      doc.text("TUITION STATUS:", 120, 80);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(16, 124, 65); // Green
      doc.text("FULLY PAID (100% SECURE)", 155, 80);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      // Separator
      doc.setDrawColor(borderLineColor[0], borderLineColor[1], borderLineColor[2]);
      doc.setLineWidth(0.3);
      doc.line(15, 86, 195, 86);

      // 3. Transcript Table Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("CURRICULUM ENROLLMENT & EXAM PERFORMANCES", 15, 94);

      // Table Header Board
      const tableTopY = 98;
      doc.setFillColor(241, 245, 249); // slate-100 bg
      doc.rect(15, tableTopY, 180, 8, "F");
      
      doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("COURSE CODE", 18, tableTopY + 5.5);
      doc.text("COURSE STUDY SUBJECT", 45, tableTopY + 5.5);
      doc.text("CREDITS", 130, tableTopY + 5.5);
      doc.text("GRADE RANGE", 150, tableTopY + 5.5);
      doc.text("ACCREDITATION", 172, tableTopY + 5.5);

      // Course List rows
      const courses = [
        { code: "IUB-FIQ-101", title: "Modern Islamic Jurisprudence & Fiqh Manuals", credits: "4.0 ECTS", grade: "A (95%)", status: "PASSED" },
        { code: "IUB-SHR-202", title: "Principles of Sharia & Legal Philosophy Texts", credits: "4.0 ECTS", grade: "A- (91%)", status: "PASSED" },
        { code: "IUB-FIN-305", title: "Contemporary Financial Transactions & Sharia Law", credits: "3.0 ECTS", grade: "A (97%)", status: "PASSED" },
        { code: "IUB-LAW-112", title: "Comparative Constitutional Law of Middle East", credits: "3.0 ECTS", grade: "B+ (88%)", status: "PASSED" },
        { code: "IUB-RES-401", title: "Advanced Scientific Research Methodology", credits: "3.0 ECTS", grade: "A (94%)", status: "PASSED" },
        { code: "IUB-SEM-450", title: "Graduate Thesis Proposal Draft & Seminar", credits: "2.0 ECTS", grade: "A (96%)", status: "PASSED" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      let currentY = tableTopY + 8;
      courses.forEach((c, idx) => {
        // Alternate subtle background colors for row readability
        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252); // slate-50
          doc.rect(15, currentY, 180, 8, "F");
        }
        
        doc.setFont("courier", "bold");
        doc.text(c.code, 18, currentY + 5.5);
        doc.setFont("helvetica", "normal");
        doc.text(c.title, 45, currentY + 5.5);
        doc.text(c.credits, 130, currentY + 5.5);
        
        doc.setFont("helvetica", "bold");
        doc.text(c.grade, 150, currentY + 5.5);
        doc.setTextColor(16, 124, 65); // Green for PASSED status
        doc.text(c.status, 172, currentY + 5.5);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]); // reset text color
        doc.setFont("helvetica", "normal");

        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.25);
        doc.line(15, currentY + 8, 195, currentY + 8);
        
        currentY += 8;
      });

      // 4. Summarized Metrics card section
      currentY += 6;
      doc.setFillColor(248, 250, 252); // Slate-50 container
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.rect(15, currentY, 180, 26, "FD");

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("TRANSCRIPT CUMULATIVE METRICS SUMMARY", 20, currentY + 6);

      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(8);

      doc.text("COMPLETED PORTION:", 20, currentY + 13);
      doc.setFont("helvetica", "normal");
      doc.text("85% Curricular Path", 55, currentY + 13);

      doc.setFont("helvetica", "bold");
      doc.text("EARNED CREDITS:", 20, currentY + 19);
      doc.setFont("helvetica", "normal");
      doc.text("19.0 ECTS Fully Verified", 55, currentY + 19);

      doc.setFont("helvetica", "bold");
      doc.text("CUMULATIVE GPA:", 105, currentY + 13);
      doc.setFont("helvetica", "normal");
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      doc.text("3.92 / 4.00 (EXCELLENT)", 135, currentY + 13);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      doc.setFont("helvetica", "bold");
      doc.text("ACADEMIC STANDING:", 105, currentY + 19);
      doc.setFont("helvetica", "normal");
      doc.text("SUMMA CUM LAUDE ELIGIBILITY", 135, currentY + 19);

      // 5. Verification Check list & seals
      currentY += 34;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("OFFICIAL SECURE VERIFICATION DETAILS", 15, currentY);

      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.4);
      doc.line(15, currentY + 2, 195, currentY + 2);

      currentY += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
      
      const verificationText = [
        "1. This document constitutes a certified digital study record retrieved dynamically from the Al-Azhar EU academic registrar database in Brussels, Belgium.",
        "2. Authentic paper transcripts and diplomas will bear the raised dry seal of University Executive Administration and official consular approvals.",
        "3. Any alteration or tampering voids this copy instantly. Online status check remains available for verification with your custom registration credentials."
      ];
      verificationText.forEach((t, i) => {
        doc.text(t, 15, currentY + i * 4);
      });

      // 6. Signatures block
      currentY += 24;
      
      // Dean signature lines
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.4);
      doc.line(20, currentY, 75, currentY);
      doc.line(135, currentY, 190, currentY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text("PROF. DR. ABDUL HAFID ASSAMIL", 20, currentY + 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text("Dean of Al-Azhar Academic Branch, Brussels", 20, currentY + 7);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text("OFFICIAL REGISTRAR HUB OFFICE", 135, currentY + 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text("Brussels Higher Education Seal Registry", 135, currentY + 7);

      // Simulated security QR Hash block
      currentY += 15;
      doc.setFillColor(241, 245, 249);
      doc.rect(15, currentY, 180, 10, "F");
      
      doc.setFont("courier", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
      doc.text("SECURE_DIGITAL_BLOCKHASH: 0x9AF8828D2B99EFA67C82AAEE812F9E828BCBD82", 20, currentY + 6);

      // Save PDF trigger
      doc.save("IUB_Official_Academic_Transcript_EU_BWA_2026_880.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to download PDF transcript. Please check browser console for errors.");
    }
  };

  const studentVoicesLabel = {
    ar: "تجارب الطلاب",
    en: "Student Voices",
    it: "Voci degli Studenti",
    fr: "Voix des Étudiants",
    de: "Studierende"
  }[currentLang] || "تجارب الطلاب";

  // Dynamic search and filter logic for programs
  const filteredPrograms = t.programs.filter((prog, idx) => {
    if (selectedCollege !== 'all') {
      if (selectedCollege === 'sharia' && idx !== 0) return false;
      if (selectedCollege === 'education' && idx !== 1) return false;
      if (selectedCollege === 'economics' && idx !== 2) return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        prog.college.toLowerCase().includes(q) ||
        prog.degrees.toLowerCase().includes(q) ||
        prog.specialties.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Enhanced map data structures and helpers
  const mapNodes = [
    { id: 0, x: 490, y: 180, flag: "🇹🇷", label: "Turkey" },
    { id: 1, x: 590, y: 300, flag: "🇸🇦", label: "KSA" },
    { id: 2, x: 380, y: 160, flag: "🇮🇹", label: "Italy" },
    { id: 3, x: 330, y: 110, flag: "🎥", label: "Media Hub" }
  ];

  const mapClusters = [
    {
      id: 'europe' as const,
      x: 360,
      y: 135,
      name: currentLang === 'ar' ? 'قارة أوروبا' : 'Europe Cluster',
      representativesCount: 2,
      flag: "🇪🇺",
      color: '#3b82f6',
      repIndexes: [2, 3]
    },
    {
      id: 'asia' as const,
      x: 540,
      y: 240,
      name: currentLang === 'ar' ? 'آسيا والشرق الأوسط' : 'Asia & M.E. Cluster',
      representativesCount: 2,
      flag: "🌏",
      color: '#10b981',
      repIndexes: [0, 1]
    }
  ];

  const filteredReps = t.representatives.map((rep: any, originalIdx: number) => ({
    ...rep,
    originalIdx
  })).filter((rep: any) => {
    const query = mapSearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      rep.country.toLowerCase().includes(query) ||
      rep.name.toLowerCase().includes(query) ||
      rep.role.toLowerCase().includes(query) ||
      rep.phone.toLowerCase().includes(query)
    );
  });

  const getMapTransform = () => {
    if (selectedRepIndex === null || selectedRepIndex === undefined) {
      return 'translate(0px, 0px) scale(1)';
    }
    const activeNode = mapNodes[selectedRepIndex];
    if (!activeNode) return 'translate(0px, 0px) scale(1)';
    
    // In cluster mode, we do NOT zoom in on country pins
    if (mapMode === 'clusters') {
      return 'translate(0px, 0px) scale(1)';
    }

    // Centering formula: center of 800x420 is (400, 210)
    const scale = 1.35;
    const dx = 400 - activeNode.x * scale;
    const dy = 210 - activeNode.y * scale;
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  };

  // Tuition Calculator Logic
  const priceMap = { bachelor: 1000, master: 1200, phd: 1400 };
  const discountRateMap = { bachelor: 0.2, master: 0.1, phd: 0.1 };
  
  const basePrice = priceMap[calcDegree];
  const discountRate = discountRateMap[calcDegree];
  const discountAmount = calcQuran ? basePrice * discountRate : 0;
  const extrasAmount = (calcSupport ? 100 : 0) + (calcHardcopy ? 150 : 0);
  const totalTuition = basePrice - discountAmount + extrasAmount;

  // Constructing the FAQ list dynamically to avoid undefined list map error
  const faqList = [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 }
  ].filter(item => item.question && item.answer);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  const PRICING_ICONS = [
    <BookOpen className="w-8 h-8 text-primary" />,
    <Award className="w-8 h-8 text-secondary" />,
    <GraduationCap className="w-8 h-8 text-accent" />
  ];

  const FEATURE_ICONS = [
    <Users className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <FileCheck className="w-6 h-6" />
  ];

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexNavDirection = isRtl ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className="min-h-screen font-sans bg-slate-50/30 overflow-x-hidden" dir={t.dir}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between h-20 items-center ${flexNavDirection}`}>
            
            {/* Logo and branding */}
            <div className={`flex items-center gap-3 ${flexNavDirection}`}>
              <img 
                src={logoUrl} 
                alt={t.logoText} 
                className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-primary/20"
                referrerPolicy="no-referrer"
              />
              <div className={textAlignment}>
                <span className="text-sm md:text-[17px] font-extrabold text-primary block leading-tight">{t.logoText}</span>
                <span className="text-[10px] md:text-xs text-gray-500 font-bold block mt-0.5">{t.subtitleText}</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-5 font-semibold text-gray-750 text-sm">
              <a href="#about" className="hover:text-primary transition-colors">{t.navAbout}</a>
              <a href="#programs" className="hover:text-primary transition-colors">{t.navPrograms}</a>
              <a href="#pricing" className="hover:text-primary transition-colors">{t.navPricing}</a>
              <a href="#representatives" className="hover:text-primary transition-colors">{t.navRepresentatives}</a>
              <a href="#student-voices" className="hover:text-primary transition-colors">{studentVoicesLabel}</a>
              <a href="#register" className="hover:text-primary transition-colors">{t.navRegister}</a>
            </div>

            {/* Action Buttons (Theme Toggle + unified Language Dropdown + Desktop call-to-action) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm cursor-pointer p-0"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                aria-label="Toggle Theme"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: theme === 'light' ? 90 : -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center justify-center w-full h-full"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4.5 h-4.5 text-slate-700 -rotate-12" />
                  ) : (
                    <Sun className="w-4.5 h-4.5 text-amber-500" />
                  )}
                </motion.div>
              </button>

              {/* Modern Language Select Dropdown - ONE AND ONLY ONE in the navigation */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-700 bg-white text-xs font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>{LANGUAGES.find(l => l.code === currentLang)?.label}</span>
                  <span className="text-[9px] text-gray-400">▼</span>
                </button>
                <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-1.5 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 hidden group-hover:block hover:block transition-all`}>
                  {LANGUAGES.map(lang => (
                    <button 
                      key={lang.code}
                      onClick={() => setCurrentLang(lang.code)}
                      className={`w-full text-start px-4 py-2 text-xs hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 ${currentLang === lang.code ? 'font-black bg-primary/8 text-primary' : 'text-gray-750 font-medium'}`}
                    >
                      <span className="text-sm filter drop-shadow-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop WhatsApp Contact Us Button */}
              <a 
                href="https://wa.me/393518530537" 
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 transition shadow-md hover:shadow-lg items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.navContactUs}
              </a>

              {/* Mobile Menu Button toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden p-2 text-gray-700 hover:text-primary bg-gray-50 rounded-lg border border-gray-100"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-3 font-semibold shadow-inner mt-px animate-in slide-in-from-top-4 duration-200">
            <a href="#about" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{t.navAbout}</a>
            <a href="#programs" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{t.navPrograms}</a>
            <a href="#pricing" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{t.navPricing}</a>
            <a href="#representatives" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{t.navRepresentatives}</a>
            <a href="#student-voices" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{studentVoicesLabel}</a>
            <a href="#register" className={`text-gray-750 hover:text-primary px-2 py-1 bg-gray-50/50 rounded-lg ${textAlignment}`} onClick={() => setIsMenuOpen(false)}>{t.navRegister}</a>
            <a 
              href="https://wa.me/393518530537" 
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-xl text-center font-bold text-sm shadow-md mt-1 flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="w-5 h-5" />
              {t.navContactUs}
            </a>
          </div>
        )}
      </nav>

      {/* Academic News Feed with Search Grounding beneath the navbar */}
      <div className="mt-20">
        <AcademicNewsFeed currentLang={currentLang} isRtl={isRtl} />
      </div>

      {/* Dynamic Infinite Marquee Announcement Ticker */}
      <div className="mt-0 bg-gradient-to-r from-primary via-blue-900 to-indigo-950 text-white text-[11px] sm:text-xs py-3.5 px-4 shadow-sm border-b border-blue-800 relative z-30 select-none overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className={`flex items-center gap-1.5 flex-shrink-0 bg-amber-500/15 px-3 py-1 rounded-full text-amber-400 font-extrabold animate-pulse border border-amber-500/20 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider text-[9px]">
              {currentLang === 'ar' ? 'تنبيه أكاديمي' : currentLang === 'it' ? 'AVVISO' : currentLang === 'fr' ? 'ALERTE' : currentLang === 'de' ? 'HINWEIS' : 'ALERT'}
            </span>
          </div>
          <div className="w-full overflow-hidden relative flex items-center h-4">
            <motion.div 
              initial={{ x: isRtl ? "-100%" : "100%" }}
              animate={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="inline-block whitespace-nowrap pr-8 text-xs font-semibold"
            >
              {currentLang === 'ar' ? (
                "✨ الكليات بفرع أوروبا تفتح التسجيل للعام الجامعي 2026/2027 • متاح معادلة المؤلفات والكتب السابقة لطلبة الماستر والدكتوراه • مناقشة الرسائل تتم داخل بلد الباحث • تواصل مباشر للحصول على تسهيلات حصرية..."
              ) : currentLang === 'it' ? (
                "✨ Iscrizioni aperte per l'anno 2026/2027 • Equipollenza pubblicazioni per Master e PhD • Discussioni tesi nel paese dello studente • Contatta l'amministrazione per info..."
              ) : currentLang === 'fr' ? (
                "✨ Inscriptions ouvertes pour 2026/2027 • Équivalences pour publications Master & PhD • Soutenances de thèse dans le pays du candidat • Contactez-nous pour aide..."
              ) : currentLang === 'de' ? (
                "✨ Bewerbungen 2026/2027 ab sofort möglich • Anrechnung publizierter Arbeiten für Master & PhD • Disputationen direkt im Heimatland des Studierenden..."
              ) : (
                "✨ Admission open for 2026/2027 academic session • Equivalence for prior published studies in Master & PhD • Defense held locally in student's country..."
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-32 overflow-hidden min-h-[500px]">
        {/* Dynamic cross-fading academic images backdrop updated each 5s */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {ACADEMIC_BG_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentBgIdx === idx ? 0.08 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-white/80 to-white"></div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_emerald-50/20,_transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Text Panel */}
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={textAlignment}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm mb-6 border border-primary/20 shadow-sm leading-relaxed">
                {t.heroBadge}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-6">
                {t.heroTitle1} <br />
                <span className="text-secondary tracking-tight block mt-1">{t.heroTitleHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-650 mb-8 leading-relaxed font-normal">
                {t.heroDesc}
              </p>
              <div className={`flex flex-wrap gap-4 ${isRtl ? 'justify-start' : 'justify-start'}`}>
                <a href="#register" className="bg-primary text-white px-6 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Calendar className="w-4 h-4" />
                  {t.heroCtaRegister}
                </a>
                <a href="#representatives" className="border border-gray-200 bg-white text-gray-700 px-6 py-4 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition flex items-center gap-2 shadow-sm">
                  <Users className="w-4 h-4" />
                  {t.heroCtaReps}
                </a>
              </div>
            </motion.div>

            {/* Visual Image/Logo Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="aspect-square w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-gray-100 flex items-center justify-center">
                <img 
                  src={logoUrl} 
                  alt={t.logoText} 
                  className="w-4/5 h-4/5 object-contain rounded-full shadow-lg border-2 border-blue-50 bg-white"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic Overlay Floating Badge */}
              <div className={`absolute -bottom-6 ${isRtl ? '-left-4' : '-right-4'} bg-white p-5 rounded-2xl shadow-xl hidden md:block border border-gray-100`}>
                <div className={`flex items-center gap-4 ${flexNavDirection}`}>
                  <div className="bg-primary/15 p-3 rounded-full text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className={textAlignment}>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{t.heroBadgeInteractiveTitle}</p>
                    <p className="text-lg font-extrabold text-primary">{t.heroBadgeInteractiveDesc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">{t.aboutSectionHeader}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">{t.aboutSectionSub}</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {t.features.map((feat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeIn}
                className={`p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group ${textAlignment}`}
              >
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {FEATURE_ICONS[idx % FEATURE_ICONS.length]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Virtual Campus Showcase Section */}
      <section id="campus" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--theme-primary)/10,_transparent_40%)] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4 shadow-sm">
            {currentLang === 'ar' ? 'البوابة الذكية المتقدمة' : currentLang === 'it' ? 'PORTALE ACADEMY' : currentLang === 'fr' ? 'CAMPUS SMART' : currentLang === 'de' ? 'SMART PORTAL' : 'SMART CAMPUS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4 tracking-tight">
            {t.virtualCampusTitle}
          </h2>
          <p className="text-gray-550 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold">
            {t.virtualCampusSub}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-12 gap-8 items-stretch ${isRtl ? 'direction-rtl' : ''}`}>
            
            {/* Left Nav Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              {[
                { id: 'lectures', label: t.virtualCampusTab1, desc: t.virtualCampusTab1Desc, icon: <Tv className="w-5 h-5" /> },
                { id: 'library', label: t.virtualCampusTab2, desc: t.virtualCampusTab2Desc, icon: <BookOpen className="w-5 h-5" /> },
                { id: 'advising', label: t.virtualCampusTab3, desc: t.virtualCampusTab3Desc, icon: <Users className="w-5 h-5" /> },
                { id: 'portal', label: t.virtualCampusTab4, desc: t.virtualCampusTab4Desc, icon: <Laptop className="w-5 h-5" /> }
              ].map((tab) => {
                const isActive = campusTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setCampusTab(tab.id as any)}
                    animate={{ scale: isActive ? 1.02 : 1.0 }}
                    whileHover={{ scale: isActive ? 1.04 : 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 450, damping: 18 }}
                    className={`p-5 rounded-2xl border text-start transition-all duration-300 relative overflow-hidden flex gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${isActive ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-white border-gray-150 text-gray-700 hover:bg-slate-50 hover:border-gray-200'}`}
                  >
                    <div className={`p-2.5 rounded-xl flex items-center justify-center h-10 w-10 flex-shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                      {tab.icon}
                    </div>
                    <div className={textAlignment}>
                      <p className="font-extrabold text-xs sm:text-sm leading-tight block">{tab.label}</p>
                      <p className={`text-[10px] mt-1.5 leading-snug font-normal ${isActive ? 'text-blue-100' : 'text-gray-450'}`}>{tab.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Large Campus Monitor */}
            <div className="lg:col-span-8">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 h-full flex flex-col justify-between relative overflow-hidden min-h-[420px] max-w-full">
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                
                {/* Visual Header */}
                <div className={`p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40 rounded-2xl ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-wider font-mono px-2 uppercase border border-slate-850 rounded bg-slate-900 ml-2">EU_CAMPUS_SECURE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-450 font-extrabold bg-emerald-500/10 px-2.5 py-1 rounded">
                    <span>● CONNECTED</span>
                  </div>
                </div>

                {/* Dashboard Active panel body */}
                <div className="my-8 flex-grow">
                  {campusTab === 'lectures' && (
                    <div className="space-y-5 animate-in fade-in-40 duration-300">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800 text-center">
                          <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'المادة المباشرة' : 'ACTIVE LECTURE'}</p>
                          <p className="text-xs sm:text-sm font-bold text-blue-300 mt-1.5">{currentLang === 'ar' ? 'فقه العبادات وأصول الدين' : 'Fiqh & Jurisprudence'}</p>
                        </div>
                        <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800 text-center">
                          <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'الأستاذ المحاضر' : 'PROFESSOR'}</p>
                          <p className="text-xs sm:text-sm font-bold text-amber-400 mt-1.5">{currentLang === 'ar' ? 'أ.د. من علماء الأزهر' : 'Azhar Senior Scholar'}</p>
                        </div>
                        <div className="bg-slate-900 p-4.5 rounded-2xl border border-slate-850 text-center">
                          <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'الحاضرون الآن' : 'ONLINE STUDENTS'}</p>
                          <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-1.5 font-mono">1,429 (+124)</p>
                        </div>
                      </div>

                      {/* Classroom Screen Simulation */}
                      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative group">
                        <div className="absolute top-2.5 left-2.5 bg-red-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white animate-pulse">LIVE FEED</div>
                        <div className="w-full aspect-video bg-slate-950/90 p-5 flex flex-col justify-end relative">
                          {/* Board mock text */}
                          <div className={`p-5 mb-4 text-center select-none font-mono text-sm tracking-tight text-white/90 leading-6 border border-white/5 bg-white/5 rounded-xl ${isRtl ? 'text-right' : 'text-left'}`}>
                            {currentLang === 'ar' ? (
                              <span>«الباب الأول في شروط صحة المعاملات المالية المعاصرة وموازينها الشرعية...»</span>
                            ) : (
                              <span>«Chapter I: Contemporary Financial Transactions under Islamic Sharia Law & Modern Equivalencies...»</span>
                            )}
                          </div>
                          {/* Player control HUD */}
                          <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer">▶</span>
                              <div className="h-1.5 w-24 sm:w-40 bg-slate-800 rounded">
                                <div className="h-1.5 w-2/3 bg-blue-500 rounded"></div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-450">41:09 / 1:30:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {campusTab === 'library' && (
                    <div className="grid sm:grid-cols-2 gap-5 animate-in fade-in-40 duration-300">
                      {[
                        { title: currentLang === 'ar' ? "فقه المعاملات المالية الحديثة" : "Modern Financial Jurisprudence", category: "PDF / EPUB", size: "14.2 MB" },
                        { title: currentLang === 'ar' ? "أبحاث في القانون الدستوري والقضاء" : "Studies in Constitutional Law", category: "PDF / BOOK", size: "8.9 MB" },
                        { title: currentLang === 'ar' ? "منهجية البحث العلمي لطلبة دكتوراه" : "Scientific Methodology Guide", category: "DOCX / PDF", size: "5.1 MB" },
                        { title: currentLang === 'ar' ? "محاضرات في السيرة والتربية الإسلامية" : "Islamic History & Ethics", category: "MP3 / AUDIO", size: "45.0 MB" }
                      ].map((item, id) => (
                        <div key={id} className={`p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex justify-between items-center gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10">{item.category}</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-white mt-2 block leading-snug">{item.title}</h4>
                            <p className="text-[11px] text-gray-400 mt-1 font-mono">{item.size}</p>
                          </div>
                          
                          <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Preview Trigger */}
                            <button
                              onClick={() => {
                                setSelectedSyllabusItem({
                                  id: id.toString(),
                                  title: item.title,
                                  category: item.category,
                                  size: item.size
                                });
                                setIsPreviewOpen(true);
                              }}
                              className="w-9 h-9 rounded-xl bg-slate-850 hover:bg-amber-500/20 hover:text-amber-400 transition text-slate-400 hover:border-amber-400/25 border border-transparent flex items-center justify-center text-xs cursor-pointer"
                              title={currentLang === 'ar' ? 'معاينة المنهج التفاعلي' : 'Preview Syllabus'}
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Download Action */}
                            <button 
                              onClick={() => {
                                alert(currentLang === 'ar' ? `🎉 جاري أولًا تشغيل محاكي تنزيل ملف: ${item.title}` : `🎉 Initiating virtual download for: ${item.title}`);
                              }}
                              className="w-9 h-9 rounded-xl bg-slate-850 hover:bg-primary transition text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                              title={currentLang === 'ar' ? 'تحميل مباشر' : 'Direct Download'}
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {campusTab === 'advising' && (
                    <div className="space-y-4.5 animate-in fade-in-40 duration-300">
                      {[
                        { step: "01", title: currentLang === 'ar' ? "إقرار الخطة البحثية وتسجيل العنوان" : "Approval of Research Plan & Title", desc: currentLang === 'ar' ? "يتم مراجعتها من المجلس الأكاديمي بجامعة الأزهر" : "Validated by the Academic Council", status: "VERIFIED" },
                        { step: "02", title: currentLang === 'ar' ? "الإشراف والمراجعة الدورية مع المشرف" : "Periodic Scientific Supervision", desc: currentLang === 'ar' ? "توجيه علمي مباشر عبر لقاءات فيديو تفاعلية" : "One-on-one virtual milestone checkpoints", status: "VERIFIED" },
                        { step: "03", title: currentLang === 'ar' ? "التنظيم والمناقشة لرسائل الماجستير والدكتوراه" : "Local Defense Committee Coordination", desc: currentLang === 'ar' ? "تتم مناقشة رسالتك داخل بلد إقامتك تيسيراً كاملًا على الباحثين" : "Held in your country of residence for convenience", status: "PENDING" }
                      ].map((stage, idx) => (
                        <div key={idx} className={`p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">
                            {stage.step}
                          </div>
                          <div className="flex-grow">
                            <div className={`flex justify-between items-center mb-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <h4 className="text-xs sm:text-sm font-extrabold text-white">{stage.title}</h4>
                              <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${stage.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-450' : 'bg-slate-800 text-gray-450'}`}>{stage.status}</span>
                            </div>
                            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-semibold">{stage.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {campusTab === 'portal' && (
                    <div className="space-y-4 animate-in fade-in-40 duration-300">
                      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 relative">
                        <div className={`flex justify-between items-center mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className={textAlignment}>
                            <p className="text-xs text-gray-400 uppercase font-bold">{currentLang === 'ar' ? 'مرحبًا بك، الطالب الرقمي' : 'Student Digital Identity'}</p>
                            <p className="text-base sm:text-lg font-mono font-extrabold text-emerald-300 mt-0.5">ID: EU_BWA_2026_880</p>
                          </div>
                          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-450 text-[10px] font-bold rounded-lg uppercase border border-emerald-500/10">{currentLang === 'ar' ? 'طالب نشط' : 'ACTIVE'}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'معدل التراكمي' : 'GPA'}</p>
                            <p className="text-md font-extrabold text-white font-mono mt-1">3.92 / 4.0</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'الفصل الدراسي' : 'SEMESTER'}</p>
                            <p className="text-md font-extrabold text-white mt-1">S2 (2026)</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'حالة السداد' : 'TUITON FEES'}</p>
                            <p className="text-md font-extrabold text-green-400 mt-1">{currentLang === 'ar' ? 'مسدد بالكامل' : 'FULLY PAID'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black">{currentLang === 'ar' ? 'درجة الإنجاز' : 'PROGRESS'}</p>
                            <p className="text-md font-extrabold text-blue-400 font-mono mt-1">85%</p>
                          </div>
                        </div>

                        {/* Interactive Certified PDF Transcript Download Button */}
                        <div className={`mt-5 pt-4.5 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className={textAlignment}>
                            <p className="text-[11px] font-bold text-white">
                              {currentLang === 'ar' ? '✨ وثيقة أكاديمية رسمية جاهزة' : '✨ Official Academic Credential Ready'}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-normal max-w-sm">
                              {currentLang === 'ar' 
                                ? 'سجل الدرجات هذا يخضع تلقائياً لنظام تحويل الساعات التراكمية الأوروبي (ECTS) ومطابق مع لائحة بروكسل.'
                                : 'This transcript is secure, fully synced to the European Credit Transfer System (ECTS) and stamped in Brussels.'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleDownloadTranscript}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 text-xs font-black shadow-lg shadow-emerald-950/35 active:scale-95 cursor-pointer border border-emerald-500/25 shrink-0"
                          >
                            <Download className="w-4 h-4 text-emerald-100" />
                            <span>
                              {currentLang === 'ar' 
                                ? 'تحميل كشف الدرجات المصدّق (PDF)' 
                                : currentLang === 'it'
                                ? 'Scarica Certificato Accademico (PDF)'
                                : currentLang === 'fr'
                                ? 'Télécharger le Relevé de Notes (PDF)'
                                : currentLang === 'de'
                                ? 'Notenspiegel herunterladen (PDF)'
                                : 'Download Verified Transcript (PDF)'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Academic Performance Radar Chart */}
                      <AcademicPerformanceRadar currentLang={currentLang} isRtl={isRtl} />

                      {/* Student Dashboard summary / courses / tasks */}
                      <StudentDashboard currentLang={currentLang} isRtl={isRtl} />

                      {/* Portal System Alert */}
                      <p className={`p-3 bg-blue-950/40 border border-blue-900/40 rounded-xl text-[10px] sm:text-xs text-blue-300 leading-relaxed font-semibold ${textAlignment}`}>
                        {currentLang === 'ar' ? '🔔 إشعار: تم رفع جميع مناهج الكليه الإسلامية بروكسل المحدثة لعام 2026. يمكن تقديم تساؤل علمي للمشرف الخاص ببحثك.' : '🔔 Info: Brussels Islamic University 2026 syllabus updates fully synced. Direct supervisorial inquiry pipeline online.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer action */}
                <div className={`p-4 border-t border-slate-850 bg-slate-950/25 rounded-2xl flex justify-between items-center text-[10px] sm:text-xs text-gray-450 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span>{currentLang === 'ar' ? 'التعلم المستمر بلمسة ذكية' : 'Flexible Digital Academic Journey'}</span>
                  <a 
                    href="#register"
                    className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg font-bold hover:shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    {currentLang === 'ar' ? 'التحق بالجامعة الرقمية' : 'Join E-Campus Now'}
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <AcademicEvents currentLang={currentLang} />

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row gap-12 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Sidebar Details */}
            <div className={`lg:w-1/3 ${textAlignment}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-6">{t.programsSectionHeader}</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">{t.programsSectionSub}</p>
              
              <div className="space-y-6">
                <div className={`flex items-start gap-3.5 ${flexNavDirection}`}>
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm sm:text-base">{t.programsThesisTitle}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{t.programsThesisDesc}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3.5 ${flexNavDirection}`}>
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm sm:text-base">{t.programsPathsTitle}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{t.programsPathsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table with Interactive Filters & Search */}
            <div className="lg:w-2/3">
              {/* Live search input */}
              <div className="relative mb-5">
                <Search className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} w-5 h-5 text-gray-405`} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full py-3.5 ${isRtl ? 'pl-11 pr-5' : 'pr-11 pl-5'} rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-xs sm:text-sm font-semibold text-gray-800`}
                />
              </div>

              {/* Filtering category pills */}
              <div className={`flex flex-wrap gap-2 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button 
                  onClick={() => setSelectedCollege('all')}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCollege === 'all' ? 'bg-primary text-white border-primary shadow-md shadow-primary/15' : 'bg-white text-gray-750 border-gray-200 hover:bg-gray-50'}`}
                >
                  {t.allColleges}
                </button>
                <button 
                  onClick={() => { setSelectedCollege('sharia'); setSearchQuery(''); }}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCollege === 'sharia' ? 'bg-primary text-white border-primary shadow-md shadow-primary/15' : 'bg-white text-gray-750 border-gray-200 hover:bg-gray-50'}`}
                >
                  {t.programs[0]?.college}
                </button>
                <button 
                  onClick={() => { setSelectedCollege('education'); setSearchQuery(''); }}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCollege === 'education' ? 'bg-primary text-white border-primary shadow-md shadow-primary/15' : 'bg-white text-gray-750 border-gray-200 hover:bg-gray-50'}`}
                >
                  {t.programs[1]?.college}
                </button>
                <button 
                  onClick={() => { setSelectedCollege('economics'); setSearchQuery(''); }}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCollege === 'economics' ? 'bg-primary text-white border-primary shadow-md shadow-primary/15' : 'bg-white text-gray-750 border-gray-200 hover:bg-gray-50'}`}
                >
                  {t.programs[2]?.college}
                </button>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  {filteredPrograms.length > 0 ? (
                    <table className={`w-full ${textAlignment}`}>
                      <thead className="bg-primary text-white text-xs sm:text-sm">
                        <tr>
                          <th className="px-6 py-4.5 font-bold">{t.programsColTableDesc}</th>
                          <th className="px-6 py-4.5 font-bold">{t.programsColTableDegrees}</th>
                          <th className="px-6 py-4.5 font-bold">{t.programsColTableSpecialties}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                        {filteredPrograms.map((prog, idx) => (
                          <tr key={idx} className="hover:bg-primary/8 transition-colors">
                            <td className="px-6 py-5.5 font-extrabold text-primary whitespace-nowrap">{prog.college}</td>
                            <td className="px-6 py-5.5 text-gray-800 font-semibold">{prog.degrees}</td>
                            <td className="px-6 py-5.5 text-gray-600 leading-relaxed font-normal">{prog.specialties}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-gray-400 font-bold text-sm">
                      {currentLang === 'ar' ? '⚠️ لم يتم العثور على تخصصات مطابقة لبحثك' : currentLang === 'it' ? '⚠️ Nessun programma trovato' : currentLang === 'fr' ? '⚠️ Aucun programme de spécialité trouvé' : currentLang === 'de' ? '⚠️ Keine entsprechenden Fachrichtungen gefunden' : '⚠️ No matches found for your search query'}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <DigitalLibrary currentLang={currentLang} />

      <AcademicRoadmap currentLang={currentLang} />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">{t.pricingSectionHeader}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{t.pricingSectionSub}</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {t.pricing.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className={`p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden ${textAlignment}`}
              >
                {/* Border line adjusts layout based on RTL/LTR */}
                <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-2 h-full bg-primary/20`}></div>
                
                <div className="mb-6">{PRICING_ICONS[idx % PRICING_ICONS.length]}</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{plan.title}</h3>
                
                <div className={`flex items-baseline gap-2 mb-4 ${isRtl ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}>
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-950">{plan.price}</span>
                  <span className="text-sm sm:text-base font-bold text-gray-500 uppercase">{t.pricingUnit}</span>
                </div>

                <div className="p-3.5 bg-orange-50/60 rounded-xl mb-6 border border-orange-100/50">
                  <p className="text-accent font-black text-[11px] sm:text-xs text-center leading-relaxed">
                    {plan.discount}
                  </p>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 ${isRtl ? 'flex-row-reverse justify-end' : 'flex-row'}`}>
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href="#register" className="block w-full py-3.5 bg-gray-950 text-white text-center rounded-xl font-bold text-xs sm:text-sm hover:bg-black transition-all shadow-sm">
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Tuition Calculator Widget Card */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div className={`grid lg:grid-cols-12 gap-8 items-center ${isRtl ? 'direction-rtl' : ''}`}>
              
              {/* Left Column Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 rounded-full bg-primary/20 text-primary">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div className={textAlignment}>
                    <h3 className="text-xl font-extrabold text-white">{t.calculatorTitle}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-1">{t.calculatorSub}</p>
                  </div>
                </div>

                <div className="h-px bg-slate-800"></div>

                {/* Dropdown Selection for Degree Level */}
                <div className="space-y-2.5">
                  <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <label className={`block text-xs font-bold text-gray-400 ${textAlignment}`}>{t.selectDegree}</label>
                    <InfoTooltip content={DEGREE_TOOLTIP_CONTENT} currentLang={currentLang} isRtl={isRtl} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'bachelor', label: t.pricing[0].title },
                      { id: 'master', label: t.pricing[1].title },
                      { id: 'phd', label: t.pricing[2].title }
                    ].map((deg) => (
                      <button
                        key={deg.id}
                        type="button"
                        onClick={() => setCalcDegree(deg.id as any)}
                        className={`py-3.5 px-3 rounded-xl text-xs font-bold transition-all border ${calcDegree === deg.id ? 'bg-primary border-primary text-white shadow-md shadow-primary/15' : 'bg-slate-950/50 border-slate-800 text-gray-300 hover:bg-slate-900 hover:text-white'}`}
                      >
                        {deg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Switch for Quran Memorizer Discount */}
                <div className={`flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={textAlignment}>
                    <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs sm:text-sm font-extrabold text-white block">{t.isMemorizer}</span>
                      <InfoTooltip content={QURAN_TOOLTIP_CONTENT} currentLang={currentLang} isRtl={isRtl} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-405 mt-1 font-semibold block">{t.isMemorizerDesc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCalcQuran(!calcQuran)}
                    className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${calcQuran ? 'bg-emerald-500' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${isRtl ? (calcQuran ? 'left-1' : 'right-1') : (calcQuran ? 'right-1' : 'left-1')}`}></div>
                  </button>
                </div>

                {/* Extra Option for shipping certified documents */}
                <div className={`flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={textAlignment}>
                    <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs sm:text-sm font-extrabold text-white block">{t.optionalShipping}</span>
                      <InfoTooltip content={SHIPPING_TOOLTIP_CONTENT} currentLang={currentLang} isRtl={isRtl} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-405 mt-1 font-semibold block">{t.optionalShippingDesc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCalcHardcopy(!calcHardcopy)}
                    className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${calcHardcopy ? 'bg-primary' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${isRtl ? (calcHardcopy ? 'left-1' : 'right-1') : (calcHardcopy ? 'right-1' : 'left-1')}`}></div>
                  </button>
                </div>

                {/* Extra Option for private supervising tutor support */}
                <div className={`flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={textAlignment}>
                    <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs sm:text-sm font-extrabold text-white block">{t.optionalTutor}</span>
                      <InfoTooltip content={SUPPORT_TOOLTIP_CONTENT} currentLang={currentLang} isRtl={isRtl} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-405 mt-1 font-semibold block">{t.optionalTutorDesc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCalcSupport(!calcSupport)}
                    className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${calcSupport ? 'bg-primary' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${isRtl ? (calcSupport ? 'left-1' : 'right-1') : (calcSupport ? 'right-1' : 'left-1')}`}></div>
                  </button>
                </div>
              </div>

              {/* Right Column Tuition billing Summary */}
              <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="text-[10px] font-black tracking-widest text-[#94a3b8] uppercase">{currentLang === 'ar' ? 'تفصيل الرسوم الأكاديمية والخصومات' : 'ACADEMIC TUITION BILL INVOICE'}</div>
                  
                  <div className="space-y-2 pt-2">
                    <div className={`flex justify-between items-center text-xs text-gray-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span>{t.calcResultTuition}</span>
                      <span className="font-mono font-bold text-white">{basePrice} EUR</span>
                    </div>

                    {calcQuran && (
                      <div className={`flex justify-between items-center text-xs text-emerald-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span>{t.calcResultDiscount} ({(discountRate * 100)}%)</span>
                        <span className="font-mono font-bold">-{discountAmount} EUR</span>
                      </div>
                    )}

                    {(calcSupport || calcHardcopy) && (
                      <div className={`flex justify-between items-center text-xs text-gray-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span>{t.calcResultExtras}</span>
                        <span className="font-mono font-bold text-white">+{extrasAmount} EUR</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-slate-800 my-4"></div>

                  <div className={`flex justify-between items-baseline ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-extrabold text-white">{t.calcResultTotal}</span>
                    <span className="text-2xl sm:text-3xl font-mono font-black text-amber-400">{totalTuition} EUR</span>
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/15 rounded-xl text-[10px] sm:text-[11px] text-blue-300 leading-relaxed font-semibold">
                    {currentLang === 'ar' ? '🛡️ متاح السداد بمرونة عبر أقساط سنوية ميسرة دون فوائد للبلدان العربية والإسلامية.' : '🛡️ Flexible installments plan available without extra overheads for active global applicants.'}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={`https://wa.me/393518530537?text=${encodeURIComponent(
                      currentLang === 'ar' 
                      ? `مرحبا دكتور، قمت بحساب الرسوم عبر الحاسبة التفاعلية للبرنامج الدراسي (${calcDegree}) مع خيار القرآن (${calcQuran ? 'نعم' : 'لا'}) وإضافات أخرى لطلب القبول بفرع أوروبا. المجموع المستحق: ${totalTuition} EUR. أود البدء بطلب التسجيل.`
                      : `Hello Doctor, I computed my tuition fees via the interactive tuition fee estimator for (${calcDegree}), memorizer check (${calcQuran ? 'Yes' : 'No'}). Total fee: ${totalTuition} EUR. I would like to lock registration.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 hover:shadow-xl transition-all h-[52px]"
                  >
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t.calcSuccessCta}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <StudentActivities currentLang={currentLang} />

      {/* International Representatives Section - Interactive World Map */}
      <section id="representatives" className="py-24 bg-slate-50 border-t border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary font-bold text-xs mb-4 shadow-sm">
            {t.repsSectionBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4 max-w-3xl mx-auto leading-snug">
            {t.repsSectionHeader}
          </h2>
          <p className="text-gray-605 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-semibold">
            {t.repsSectionSub}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Map Column (Interactive SVG World Canvas) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-7 border border-gray-150 shadow-sm relative overflow-hidden min-h-[420px]">
              
              {/* Map Header Instructions */}
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                <div className={textAlignment}>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
                    {currentLang === 'ar' ? 'الخريطة التفاعلية للمكاتب الإقليمية' : 'Interactive Regional Map'}
                  </p>
                  <p className="text-xs font-bold text-gray-650 mt-0.5">
                    {mapMode === 'pins' 
                      ? (currentLang === 'ar' ? '📍 تصفح مكاتب التمثيل المعتمدة قاريًا ودوليًا' : '📍 Browse officially active representative offices by country.')
                      : (currentLang === 'ar' ? '📊 نظرة قارية عامة على توزيع خبراء وممثلي الجامعة' : '📊 Continental density and counts of university representatives.')
                    }
                  </p>
                </div>
                
                {/* Advanced Segmented Pills control */}
                <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-gray-200/60 shadow-inner select-none">
                  <button
                    type="button"
                    onClick={() => {
                      setMapMode('pins');
                      setHoveredClusterId(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all flex items-center gap-1.5 cursor-pointer ${mapMode === 'pins' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-gray-550 hover:text-gray-800 hover:bg-white/40'}`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? 'مواقع المكاتب' : 'Pin Locations'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMapMode('clusters');
                      setHoveredNodeId(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all flex items-center gap-1.5 cursor-pointer ${mapMode === 'clusters' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10' : 'text-gray-550 hover:text-gray-800 hover:bg-white/40'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? 'التوزيع القاري' : 'Continent Clusters'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Search Bar */}
              <div className="mb-4 relative w-full">
                <div className={`relative flex items-center w-full bg-slate-50 border border-gray-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 rounded-2xl px-4 py-2.5 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Search className={`w-4 h-4 text-gray-400 flex-shrink-0 ${isRtl ? 'ml-2' : 'mr-2'}`} />
                  <input
                    type="text"
                    value={mapSearchQuery}
                    onChange={(e) => {
                      const query = e.target.value;
                      setMapSearchQuery(query);
                      
                      if (query) {
                        const downcaseQuery = query.toLowerCase().trim();
                        const matchingIdx = t.representatives.findIndex((rep: any) => 
                          rep.country.toLowerCase().includes(downcaseQuery) ||
                          rep.name.toLowerCase().includes(downcaseQuery) ||
                          rep.role.toLowerCase().includes(downcaseQuery) ||
                          rep.phone.toLowerCase().includes(downcaseQuery)
                        );
                        if (matchingIdx !== -1) {
                          setSelectedRepIndex(matchingIdx);
                        }
                      }
                    }}
                    placeholder={
                      currentLang === 'ar' 
                        ? "🔍 ابحث بالدولة، الممثل، أو الهاتف لتكبير الخريطة..." 
                        : "🔍 Search by country, representative, or phone..."
                    }
                    className="w-full bg-transparent border-none text-xs text-gray-800 font-semibold focus:outline-none focus:ring-0 placeholder-gray-400"
                  />
                  {mapSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMapSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Vector SVG Map Container */}
              <div className="relative flex-grow flex items-center justify-center bg-slate-50/50 rounded-2xl border border-gray-100/80 p-2 overflow-hidden min-h-[260px] sm:min-h-[300px]">
                
                {/* Visual Lat/Long coordinates grids */}
                <div className="absolute inset-x-0 top-12 border-b border-gray-200/40 pointer-events-none"></div>
                <div className="absolute inset-x-0 top-1/2 border-b border-gray-200/40 pointer-events-none"></div>
                <div className="absolute inset-y-0 left-1/4 border-r border-gray-200/40 pointer-events-none"></div>
                <div className="absolute inset-y-0 left-1/2 border-r border-gray-200/40 pointer-events-none"></div>
                <div className="absolute inset-y-0 left-3/4 border-r border-gray-200/40 pointer-events-none"></div>

                <div ref={mapContainerRef} className="relative w-full h-full flex items-center justify-center">
                  <svg 
                    viewBox="0 0 800 420" 
                    className="w-full h-auto select-none opacity-90 transition-opacity hover:opacity-100 z-10"
                    style={{ maxHeight: '350px' }}
                  >
                    {/* Lat/Long Grid lines */}
                    <g stroke="#94a3b8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3">
                      <line x1="0" y1="100" x2="800" y2="100" />
                      <line x1="0" y1="210" x2="800" y2="210" />
                      <line x1="0" y1="320" x2="800" y2="320" />
                      <line x1="200" y1="0" x2="200" y2="420" />
                      <line x1="400" y1="0" x2="400" y2="420" />
                      <line x1="600" y1="0" x2="600" y2="420" />
                    </g>

                    {/* Transform Group: Centers and zooms in on selected country dynamically */}
                    <g style={{ transform: getMapTransform(), transformOrigin: 'center', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      
                      {/* Stylized Visual Continent outlines */}
                      {/* North America */}
                      <path d="M 10,80 Q 80,100 120,140 T 90,260 T 130,300 Z" fill="#e2e8f0" fillOpacity="0.55" stroke="#cbd5e1" strokeWidth="0.8" />
                      
                      {/* South America */}
                      <path d="M 100,280 Q 130,320 120,380 T 100,410 T 60,350 Z" fill="#e2e8f0" fillOpacity="0.55" stroke="#cbd5e1" strokeWidth="0.8" />
                      
                      {/* Europe & Asia Outline */}
                      <path 
                        d="M 230,120 C 260,80 340,70 420,80 C 470,60 520,70 600,80 C 660,90 730,110 770,140 C 790,170 790,220 750,250 C 700,280 620,310 560,300 C 500,250 440,260 400,220 C 350,190 280,180 230,120 Z" 
                        fill="#e2e8f0" 
                        fillOpacity="0.65" 
                        stroke="#cbd5e1" 
                        strokeWidth="0.9" 
                      />

                      {/* Africa Outline */}
                      <path 
                        d="M 285,250 C 340,230 380,240 400,280 C 420,310 420,350 400,380 C 375,410 340,410 320,380 C 290,340 270,300 285,250 Z" 
                        fill="#e2e8f0" 
                        fillOpacity="0.6" 
                        stroke="#cbd5e1" 
                        strokeWidth="0.8" 
                      />

                      {/* Australia Outline */}
                      <path d="M 680,310 Q 720,310 740,330 T 680,380 Z" fill="#e2e8f0" fillOpacity="0.5" stroke="#cbd5e1" strokeWidth="0.8" />

                      {/* Connective Link lines from active node to Brussels Hub */}
                      {mapMode === 'pins' && (
                        <g opacity="0.45">
                          <line 
                            x1="330" y1="110" 
                            x2={selectedRepIndex === 0 ? 490 : selectedRepIndex === 1 ? 590 : selectedRepIndex === 2 ? 380 : 330} 
                            y2={selectedRepIndex === 0 ? 180 : selectedRepIndex === 1 ? 300 : selectedRepIndex === 2 ? 160 : 110} 
                            stroke="#3b82f6" 
                            strokeWidth="1.5" 
                            strokeDasharray="4 4" 
                          />
                        </g>
                      )}

                      {/* Hotspots Interactive pins */}
                      {mapMode === 'pins' && mapNodes.map((node) => {
                        const isSelected = selectedRepIndex === node.id;
                        const rSize = isSelected ? 18 : 11;
                        
                        return (
                          <g 
                            key={node.id} 
                            className="cursor-pointer group/node"
                            onClick={() => setSelectedRepIndex(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                          >
                            {/* Interactive invisible clicking buffer area */}
                            <circle cx={node.x} cy={node.y} r="25" fill="transparent" />

                            {/* Pulsing Concentric Outer Ring */}
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={rSize + 14} 
                              fill="none" 
                              stroke={node.id === 3 ? "#3b82f6" : node.id === 1 ? "#10b981" : "#ef4444"} 
                              strokeWidth="1.5"
                              opacity={isSelected ? 0.8 : 0}
                              className={isSelected ? "animate-pulse" : ""}
                            />

                            {/* Ping radar effect circle */}
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={rSize + 8} 
                              fill="transparent" 
                              stroke={node.id === 3 ? "#3b82f6" : node.id === 1 ? "#10b981" : "#f59e0b"} 
                              strokeWidth="2"
                              opacity={isSelected ? 0.6 : 0.2}
                              className="animate-ping origin-center"
                              style={{ animationDuration: isSelected ? '1.8s' : '3s' }}
                            />

                            {/* Solid Base Ring Core */}
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={rSize} 
                              fill={isSelected ? "#1e3a8a" : "#ffffff"} 
                              stroke={isSelected ? "#f59e0b" : "#94a3b8"} 
                              strokeWidth="2" 
                              className="transition-all duration-300 drop-shadow-md group-hover/node:fill-slate-50"
                            />

                            {/* Flag text precisely overlayed */}
                            <text 
                              x={node.x} 
                              y={node.y + 4.5} 
                              textAnchor="middle" 
                              fontSize="12" 
                              className="pointer-events-none select-none filter group-hover/node:scale-110 transition-transform font-bold"
                            >
                              {node.flag}
                            </text>

                            {/* Indicator glow beacon */}
                            {isSelected && (
                              <g className="pointer-events-none">
                                <line x1={node.x} y1={node.y - rSize - 4} x2={node.x} y2={node.y - rSize - 16} stroke="#3b82f6" strokeWidth="2" />
                                <circle cx={node.x} cy={node.y - rSize - 16} r="4.5" fill="#f59e0b" className="animate-pulse" />
                              </g>
                            )}
                          </g>
                        );
                      })}

                      {/* Continent Clusters representation */}
                      {mapMode === 'clusters' && mapClusters.map((cls) => {
                        const isHovered = hoveredClusterId === cls.id;
                        const bubbleSize = isHovered ? 40 : 34;
                        
                        return (
                          <g 
                            key={cls.id}
                            className="cursor-pointer group/cluster"
                            onMouseEnter={() => setHoveredClusterId(cls.id)}
                            onMouseLeave={() => setHoveredClusterId(null)}
                            onClick={() => {
                              // When clicking a cluster, auto-select its first representative to show detailed profile
                              setSelectedRepIndex(cls.repIndexes[0]);
                            }}
                          >
                            {/* Interactive buffer circle */}
                            <circle cx={cls.x} cy={cls.y} r="50" fill="transparent" />

                            {/* Pulsing glow under bubble */}
                            <circle 
                              cx={cls.x} 
                              cy={cls.y} 
                              r={bubbleSize + 16} 
                              fill="transparent" 
                              stroke={cls.color} 
                              strokeWidth="1.5"
                              className="animate-ping origin-center opacity-40"
                              style={{ animationDuration: '3s' }}
                            />

                            {/* Bubble base */}
                            <circle 
                              cx={cls.x} 
                              cy={cls.y} 
                              r={bubbleSize} 
                              fill={cls.color} 
                              fillOpacity="0.15"
                              stroke={cls.color} 
                              strokeWidth="2.5"
                              className="transition-all duration-300 group-hover/cluster:fill-opacity-25"
                            />

                            {/* Core Center Dot */}
                            <circle 
                              cx={cls.x} 
                              cy={cls.y} 
                              r="6" 
                              fill={cls.color}
                            />

                            {/* Representative Count text */}
                            <text 
                              x={cls.x} 
                              y={cls.y - (bubbleSize + 10)} 
                              textAnchor="middle" 
                              fontSize="11" 
                              fontWeight="bold"
                              fill="#1e293b"
                              className="font-sans select-none"
                            >
                              ={cls.name}
                            </text>

                            <g transform={`translate(${cls.x}, ${cls.y + 4})`}>
                              {/* Large Counter text inside the bubble */}
                              <text 
                                x="0" 
                                y="0" 
                                textAnchor="middle" 
                                fontSize="14" 
                                fontWeight="950" 
                                fill="#0f172a" 
                                className="font-mono select-none"
                              >
                                {cls.representativesCount}
                              </text>
                              <text 
                                x="0" 
                                y="12" 
                                textAnchor="middle" 
                                fontSize="7" 
                                fontWeight="black" 
                                fill="#475569" 
                                className="uppercase tracking-widest select-none"
                              >
                                {currentLang === 'ar' ? 'ممثليْن' : 'Reps'}
                              </text>
                            </g>
                          </g>
                        );
                      })}

                    </g>
                  </svg>

                  {/* Floating Hover Tooltip for nodes on desktop screen */}
                  <AnimatePresence>
                    {mapMode === 'pins' && hoveredNodeId !== null && t.representatives[hoveredNodeId] && (
                      <MapHoverTooltip 
                        x={mapNodes[hoveredNodeId].x} 
                        y={mapNodes[hoveredNodeId].y} 
                        containerRef={mapContainerRef}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm filter drop-shadow">{t.representatives[hoveredNodeId].flag}</span>
                          <span className="font-extrabold text-white text-[12px]">{t.representatives[hoveredNodeId].country}</span>
                        </div>
                        <div className="border-t border-slate-800 my-1 pb-1"></div>
                        <div className="font-semibold text-gray-200">{t.representatives[hoveredNodeId].name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{t.representatives[hoveredNodeId].role}</div>
                        <div className="text-[10px] text-amber-400 font-bold mt-1.5 flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-amber-500" />
                          <span>{t.representatives[hoveredNodeId].phone}</span>
                        </div>
                      </MapHoverTooltip>
                    )}
                  </AnimatePresence>

                  {/* Floating Hover Tooltip for clusters on desktop screen */}
                  <AnimatePresence>
                    {mapMode === 'clusters' && hoveredClusterId !== null && (
                      <MapHoverTooltip 
                        x={mapClusters.find(c => c.id === hoveredClusterId)!.x} 
                        y={mapClusters.find(c => c.id === hoveredClusterId)!.y} 
                        containerRef={mapContainerRef}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-amber-400 font-black">📊 {mapClusters.find(c => c.id === hoveredClusterId)!.name}</span>
                        </div>
                        <div className="border-t border-slate-800 my-1 pb-1"></div>
                        <div className="text-[10px] text-gray-300 mb-1 font-bold">
                          {currentLang === 'ar' ? 'الممثلون المعتمدون في هذه القارة:' : 'Certified reps in this continent:'}
                        </div>
                        <div className="space-y-1 mt-1 text-left">
                          {mapClusters.find(c => c.id === hoveredClusterId)!.repIndexes.map(idx => {
                            const r = t.representatives[idx];
                            return (
                              <div key={idx} className="flex items-center gap-1 text-[10px] text-gray-200">
                                <span className="filter drop-shadow">{r.flag}</span>
                                <span className="font-semibold">{r.country}:</span>
                                <span className="text-gray-400 text-[9px] truncate">{r.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </MapHoverTooltip>
                    )}
                  </AnimatePresence>

                </div>

                {/* Technical status absolute flag */}
                <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} bg-slate-900/95 text-[9px] text-white py-1.5 px-3 rounded-xl border border-slate-800 font-mono flex items-center gap-2 shadow-lg`}>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span>EU_REP_MAP_ACTIVE</span>
                </div>
              </div>

              {/* Bottom Quick Select Row (tactile for mobile/tablet screens) */}
              <div className="mt-5">
                <p className={`text-[11px] font-bold text-gray-400 mb-2.5 ${textAlignment}`}>
                  {currentLang === 'ar' ? 'اختر الدولة الممثلة للتواصل الفوري السريع:' : 'Quick Selection Regional Office:'}
                </p>
                <div className={`flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {filteredReps.map((rep: any) => {
                    const isSelected = selectedRepIndex === rep.originalIdx;
                    return (
                      <button
                        key={rep.originalIdx}
                        type="button"
                        onClick={() => setSelectedRepIndex(rep.originalIdx)}
                        className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border cursor-pointer ${isSelected ? 'bg-primary text-white border-primary shadow-md shadow-primary/15 scale-[1.02]' : 'bg-slate-50 text-gray-650 border-gray-200 hover:bg-slate-100 hover:border-gray-300'}`}
                      >
                        <span className="text-sm filter drop-shadow">{rep.flag}</span>
                        <span>{rep.country}</span>
                      </button>
                    );
                  })}
                  {filteredReps.length === 0 && (
                    <p className="text-xs text-slate-400 py-1 font-semibold italic">
                      {currentLang === 'ar' ? 'لم يتم العثور على مكاتب تمثيل لاسم البحث المقدم.' : 'No offices found matching your search term.'}
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Profile Detail Card Column */}
            <div className="lg:col-span-5">
              {t.representatives[selectedRepIndex] && (() => {
                const rep = t.representatives[selectedRepIndex];
                
                const getWpMessage = () => {
                  if (currentLang === 'ar') {
                    if (selectedRepIndex === 3) {
                      return `السلام عليكم مهندس كريم، لقد اطلعت على موقع الجامعة الإسلامية بروكسل بفرع أوروبا، وأود التنسيق للملفات الإعلامية والاتصال للقبول والتسجيل.`;
                    }
                    return `السلام عليكم دكتور، معك طالب يرغب بالتسجيل بالجامعة الإسلامية بروكسل (فرع أوروبا) - مكتب التمثيل لبلد: (${rep.country}). أرجو إفادتي بإجراءات القبول والمعادلات المتاحة.`;
                  } else {
                    return `Hello! I would like to initiate my application with the regional academic representative for (${rep.country}) - University of Brussels (Europe). Please guide me.`;
                  }
                };

                const nationalGradients = theme === 'dark' ? [
                  "from-red-950/40 to-orange-950/20 border-red-900/40", 
                  "from-emerald-950/40 to-teal-950/20 border-emerald-900/40", 
                  "from-blue-950/40 to-indigo-950/20 border-blue-900/40", 
                  "from-slate-950/40 to-blue-950/20 border-blue-900/40"
                ] : [
                  "from-red-50 to-orange-100 border-red-200", // Turkey
                  "from-emerald-50 to-teal-100 border-emerald-200", // KSA
                  "from-blue-50 to-indigo-100 border-blue-200", // Italy
                  "from-slate-50 to-blue-100 border-blue-200" // Media
                ];

                const accentColors = theme === 'dark' ? [
                  "text-red-400 bg-red-950/50 border-red-800/40", 
                  "text-emerald-400 bg-emerald-950/50 border-emerald-800/40", 
                  "text-indigo-400 bg-indigo-950/50 border-indigo-800/40", 
                  "text-blue-400 bg-blue-950/50 border-blue-800/40"
                ] : [
                  "text-red-600 bg-red-100/50 border-red-200/40", 
                  "text-emerald-700 bg-emerald-100/50 border-emerald-200/40", 
                  "text-indigo-600 bg-indigo-100/50 border-indigo-200/40", 
                  "text-blue-600 bg-blue-100/50 border-blue-200/40"
                ];

                return (
                  <motion.div 
                    key={selectedRepIndex}
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full relative overflow-hidden ${textAlignment}`}
                  >
                    <div className="absolute top-0 inset-x-0 h-2 w-full bg-gradient-to-r from-primary via-blue-500 to-amber-500"></div>

                    <div className="space-y-6">
                      
                      {/* Badge and flag */}
                      <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${accentColors[selectedRepIndex]}`}>
                          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {selectedRepIndex === 3 
                              ? (currentLang === 'ar' ? 'العلاقات والإعلام' : 'MEDIA & COMM') 
                              : (currentLang === 'ar' ? 'مكتب تمثيل القبول المعتمد' : 'VERIFIED REPRESENTATIVE')}
                          </span>
                        </div>
                        <span className="text-3xl filter drop-shadow select-none">{rep.flag}</span>
                      </div>

                      {/* High-Quality Representative Avatar Profile Photo with Initials Fallback */}
                      <div className="relative w-24 h-24 rounded-2xl mx-auto border-2 border-primary/20 overflow-hidden shadow-md group bg-slate-100 flex items-center justify-center">
                        {REP_AVATAR_IMAGES[selectedRepIndex] ? (
                          <img 
                            src={REP_AVATAR_IMAGES[selectedRepIndex]} 
                            alt={rep.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${nationalGradients[selectedRepIndex]}`}>
                            <span className="text-2xl font-black text-gray-800 tracking-wider font-mono">
                              {rep.name.split(' ').slice(-2).map((w: string) => w[0]).join('') || rep.name[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Representative basic credentials details */}
                      <div>
                        <span className="text-[10px] text-blue-600 font-extrabold uppercase font-mono tracking-widest block mb-1">
                          {selectedRepIndex === 3 ? (currentLang === 'ar' ? 'البوابة الإعلامية للطلاب' : 'ACADEMIC RELATIONS') : rep.country}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight leading-snug">
                          {rep.name}
                        </h3>
                        <p className="text-xs text-gray-450 mt-1 font-bold">
                          {rep.role}
                        </p>
                      </div>

                      <div className="h-px bg-gray-100"></div>

                      {/* Descriptive list bullet points */}
                      <div className="space-y-3 pt-1">
                        <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-gray-800">{currentLang === 'ar' ? 'تسهيلات القبول والمعادلة' : 'Document Transcripts & Equivalence'}</p>
                            <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{currentLang === 'ar' ? 'تنسيق مباشر لمعادلة الشهادات والكتب السابقة للباحثين.' : 'Direct assistance regarding certification and credit hours balance.'}</p>
                          </div>
                        </div>

                        <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-gray-800">{currentLang === 'ar' ? 'متابعة إدارية مباشرة وسداد مرن' : 'Easy Installments & Local Thesis'}</p>
                            <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{currentLang === 'ar' ? 'متابعة سداد الأقساط الأكاديمية والمناقشات في بلد دراستك.' : 'Coordinate tuition schedule splits and thesis defenses locally.'}</p>
                          </div>
                        </div>

                        <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div className="p-1 rounded-md bg-primary/10 text-primary border border-primary/15 mt-0.5">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <div className={textAlignment}>
                            <p className="text-xs font-extrabold text-gray-800">{currentLang === 'ar' ? 'رقم الاتصال المباشر المعتمد' : 'Verified Direct Contact Phone'}</p>
                            <p className="text-[11px] font-mono text-gray-550 font-bold tracking-tight mt-0.5">{rep.phone}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Contact Direct Connection action */}
                    <div className="pt-6 mt-8 border-t border-gray-100">
                      <a 
                        href={`https://wa.me/${rep.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWpMessage())}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-xl transition-all duration-300"
                      >
                        <MessageCircle className="w-5 h-5 flex-shrink-0 animate-bounce" style={{ animationDuration: '3s' }} />
                        <span>{t.repsBtnCta}</span>
                      </a>
                      <p className="text-[9px] text-gray-400 text-center mt-3 font-semibold leading-relaxed">
                        {currentLang === 'ar' ? '🔒 قناة تواصل آمنة وموثوقة بنسبة ١٠٠٪ مع الممثل الإقليمي.' : '🔒 100% Reliable and officially end-to-end encrypted support lines.'}
                      </p>
                    </div>

                  </motion.div>
                );
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Admission Eligibility Assessment Wizard */}
      <section id="eligibility" className="py-24 bg-white border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4 shadow-sm">
            {currentLang === 'ar' ? 'مساعد الفحص الذكي للقبول' : currentLang === 'it' ? 'VALUTAZIONE RAPIDA' : 'FAST-TRACK ELIGIBILITY'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-3">
            {t.eligibilityTitle}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {t.eligibilitySub}
          </p>
        </div>

        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* Step 0: Welcome Assessment trigger */}
            {eligibilityStep === 0 && (
              <div className="text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-primary/15 text-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-gray-900">{currentLang === 'ar' ? 'فحص فوري مرن وموثوق' : 'Instant Eligibility Feedback'}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 lines-normal leading-relaxed font-semibold">
                    {currentLang === 'ar' 
                      ? 'هل تريد معرفة الأوراق المطلوبة ومدى أهليتك للدراسة عن بعد خلال دقيقة واحدة؟ تفضل بالإجابة على ثلاثة أسئلة سريعة.'
                      : 'Find out if you possess active requirements and matching background within 60 seconds.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEligibilityStep(1)}
                  className="w-full py-3.5 bg-primary hover:opacity-95 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-primary/10 transition-transform hover:scale-[1.02]"
                >
                  {t.eligibilityCheckNow}
                </button>
              </div>
            )}

            {/* Step 1: Degree choice */}
            {eligibilityStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-300">
                <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full">{currentLang === 'ar' ? 'السؤال 1 من 3' : 'Question 1 of 3'}</span>
                  <button type="button" onClick={() => setEligibilityStep(0)} className="text-xs text-gray-400 hover:text-gray-600 font-bold">✕</button>
                </div>
                <h3 className={`text-base sm:text-lg font-extrabold text-gray-900 ${textAlignment}`}>{t.eligibilityDegreePrompt}</h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'bachelor', label: t.pricing[0].title },
                    { id: 'master', label: t.pricing[1].title },
                    { id: 'phd', label: t.pricing[2].title }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setEligibilityDegree(item.id as any);
                        setEligibilityStep(2);
                      }}
                      className={`w-full p-4 rounded-2xl border border-gray-200 bg-white text-gray-755 text-start font-bold text-xs sm:text-sm hover:bg-primary/8 hover:border-primary/20 transition-all flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 ${isRtl ? 'rotate-90' : '-rotate-90'}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Confirmation of past credentials */}
            {eligibilityStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-300">
                <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full">{currentLang === 'ar' ? 'السؤال 2 من 3' : 'Question 2 of 3'}</span>
                  <button type="button" onClick={() => setEligibilityStep(1)} className="text-xs text-gray-400 hover:text-gray-600 font-bold">{currentLang === 'ar' ? 'رجوع' : 'Back'}</button>
                </div>
                <h3 className={`text-base sm:text-lg font-extrabold text-gray-900 ${textAlignment}`}>
                  {currentLang === 'ar' 
                    ? `هل تمتلك شهادة تناسب القبول لدرجة (${eligibilityDegree === 'phd' ? 'الماستر' : eligibilityDegree === 'master' ? 'البكالوريوس' : 'الثانوية أو ما يعادلها'})؟`
                    : `Do you possess matching background cert for (${eligibilityDegree === 'phd' ? 'Master' : eligibilityDegree === 'master' ? 'Bachelor' : 'High School / Al-Azhar secondary equivalency'})?`}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEligibilityOnline('yes');
                      setEligibilityStep(3);
                    }}
                    className="p-5 rounded-2xl border border-gray-200 bg-white hover:bg-primary/8 hover:border-primary/25 text-center font-bold text-xs sm:text-sm text-gray-800 transition-all cursor-pointer"
                  >
                    🚀 {currentLang === 'ar' ? 'نعم، أمتلكها' : 'Yes, I do'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEligibilityOnline('no');
                      setEligibilityStep(3);
                    }}
                    className="p-5 rounded-2xl border border-gray-200 bg-white hover:bg-red-500/10 hover:border-red-500/30 text-center font-bold text-xs sm:text-sm text-gray-800 transition-all cursor-pointer"
                  >
                    ⚠️ {currentLang === 'ar' ? 'لا / غير مكتملة' : 'No / Pending'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Result validation screen */}
            {eligibilityStep === 3 && (
              <div className="space-y-6 animate-in scale-in duration-300 text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-md ${eligibilityOnline === 'yes' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {eligibilityOnline === 'yes' ? <Check className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-gray-900">
                    {eligibilityOnline === 'yes' ? t.eligibilitySuccessTitle : (currentLang === 'ar' ? 'مؤهل مبدئياً مع مقابلة' : 'Eligible with Evaluation')}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-semibold max-w-sm mx-auto">
                    {eligibilityOnline === 'yes' 
                      ? t.eligibilitySuccessDesc 
                      : (currentLang === 'ar' 
                        ? 'تتيح الجامعة لجنة تحضيرية فنية ودعم معادلة خاص بفرع أوروبا لتقييم الحالات الاستثنائية لشركاء المعرفة والخبرات العملية.'
                        : 'The European branch allows bridging courses for non-standard certificates or active researchers. Reach out to verify.')}
                  </p>
                </div>

                {/* Requirements list */}
                <div className={`p-4.5 bg-white border border-gray-200 rounded-2xl text-xs ${textAlignment}`}>
                  <p className="font-extrabold text-gray-800 mb-2">{currentLang === 'ar' ? 'المستندات المطلوبة للتقديم بفرع أوروبا:' : 'Admissions Document Checklist:'}</p>
                  <ul className="space-y-2 text-gray-500 font-semibold font-sans">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{currentLang === 'ar' ? 'صورة مصدقة من أحدث شهادة علمية حصلت عليها' : 'Certified copy of highest scientific diploma'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{currentLang === 'ar' ? 'سيرة ذاتية محدثة (خاصة بطلبة الدراسات العليا)' : 'Updated CV / resume (for postgraduate applicants)'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{currentLang === 'ar' ? 'نسخة واضحة من بطاقة الهوية / جواز السفر' : 'Valid government-issued ID / passport'}</span>
                    </li>
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setEligibilityStep(0)}
                    className="flex-shrink-0 py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold hover:bg-gray-50 text-xs shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    {t.eligibilityReset}
                  </button>
                  <a
                    href={`https://wa.me/393518530537?text=${encodeURIComponent(
                      currentLang === 'ar'
                        ? `مرحباً دكتور، قمت بإنهاء مساعد الفحص الذكي للقبول بفرع أوروبا. أنا فحصت لدرجة (${eligibilityDegree}) وأمتلك مؤهلاً سابقاً (${eligibilityOnline === 'yes' ? 'نعم' : 'لا'}). أود استكمال تقديم الأوراق وبدء التسجيل.`
                        : `Hello! I checked my fast-track admission eligibility and got evaluated for (${eligibilityDegree}). I would like to complete my application files with the regional director.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{currentLang === 'ar' ? 'أرسل أوراقك على واتساب الآن' : 'Submit Files for Fast Acceptance'}</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <StudentVoices currentLang={currentLang} isRtl={isRtl} />

      {/* Interactive Admission Request Form Section */}
      <section id="admission-portal" className="py-24 bg-slate-900 text-white relative border-t border-b border-slate-800">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-emerald-500/15">
              {currentLang === 'ar' ? 'بوابة التسجيل الإلكتروني الموحدة' : 'REGISTRAR SYSTEM v1.2'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {currentLang === 'ar' ? 'نموذج تقديم طلب القبول الأكاديمي' : 'Digital Student Enrollment Hub'}
            </h2>
            <p className="text-slate-450 max-w-xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
              {currentLang === 'ar' 
                ? 'عبئ بياناتك الأكاديمية وارفع مستنداتك اليوم مجاناً للحصول على رسالة قبول رسمي وخطوة تسعير مفصلة فوراً من الإدارة الإقليمية لفرع غرب أوروبا.'
                : 'Fill in your academic background and upload credentials folder to calculate immediate tuition and obtain conditional administrative review letter.'}
            </p>
          </div>
          <AdmissionForm currentLang={currentLang} />
        </div>
      </section>

      {/* Registration Steps & Executive Portrait */}
      <section id="register" className="py-20 bg-gray-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center`}>
            
            {/* Steps Side */}
            <div className={textAlignment}>
              <h2 className="text-3xl font-extrabold mb-8 text-white">{t.stepsSectionHeader}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-12">
                {t.stepsSectionSub}
              </p>
              
              <div className="space-y-8">
                <div className={`flex gap-5 ${flexNavDirection}`}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-sm text-emerald-400 shadow-md shadow-emerald-500/10">1</div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">{t.step1Title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{t.step1Desc}</p>
                  </div>
                </div>
                <div className={`flex gap-5 ${flexNavDirection}`}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-sm text-emerald-400 shadow-md shadow-emerald-500/10">2</div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">{t.step2Title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{t.step2Desc}</p>
                  </div>
                </div>
                <div className={`flex gap-5 ${flexNavDirection}`}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-sm text-emerald-400 shadow-md shadow-emerald-500/10">3</div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">{t.step3Title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{t.step3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Administration Card (With corrected photo) */}
            <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className={`absolute top-0 ${isRtl ? 'right-0 rounded-bl-full' : 'left-0 rounded-br-full'} w-24 h-24 bg-primary/10 -z-10`}></div>
              <h3 className="text-lg sm:text-xl font-bold mb-8 text-center border-b border-white/10 pb-4 text-white">{t.directAdminHeader}</h3>
              
              <div className="flex flex-col items-center mb-8 bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                <div className="relative w-32 h-32 rounded-full border-4 border-yellow-500/30 overflow-hidden mb-4 shadow-xl">
                  <img 
                    src={directorUrl} 
                    alt={t.directorName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/75 py-1 text-[9px] text-yellow-400 font-extrabold uppercase tracking-wide text-center">{t.directorBadge}</div>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mb-1">{t.directorName}</h4>
                <p className="text-[11px] sm:text-xs text-gray-400 font-semibold max-w-xs">{t.directorRole}</p>
                
                <div className="mt-4 flex gap-2.5">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-300 font-bold border border-white/5">{t.directorLocation}</span>
                  <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-bold border border-emerald-500/10">{t.directorStatus}</span>
                </div>
              </div>

              {/* Verified Contact Channels */}
              <div className="space-y-4">
                <div className={`text-xs font-semibold text-gray-400 mb-2 ${textAlignment}`}>{t.adminChannelsSub}</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="https://wa.me/393518530537" target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/15 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <MessageCircle className="text-emerald-450 text-emerald-450 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className={textAlignment}>
                      <p className="text-[9px] text-gray-500 uppercase font-bold">{t.channelWa1}</p>
                      <p className="font-mono font-bold text-xs text-emerald-300 mt-0.5">+39 351 853 0537</p>
                    </div>
                  </a>

                  <a href="https://wa.me/393201916297" target="_blank" rel="noreferrer" className={`flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/15 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <MessageCircle className="text-emerald-450 text-emerald-450 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className={textAlignment}>
                      <p className="text-[9px] text-gray-500 uppercase font-bold">{t.channelWa2}</p>
                      <p className="font-mono font-bold text-xs text-emerald-300 mt-0.5">+39 320 191 6297</p>
                    </div>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="tel:+393201916297" className={`flex items-center gap-3 p-3 rounded-2xl bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/15 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Phone className="text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className={textAlignment}>
                      <p className="text-[9px] text-gray-500 uppercase font-bold">{t.channelPhone}</p>
                      <p className="font-mono font-bold text-xs text-blue-300 mt-0.5">+39 320 191 6297</p>
                    </div>
                  </a>

                  <a href="mailto:iu.bwa.italy@gmail.com" className={`flex items-center gap-3 p-3 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/15 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Mail className="text-red-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <div className={`overflow-hidden ${textAlignment}`}>
                      <p className="text-[9px] text-gray-500 uppercase font-bold">{t.channelEmail}</p>
                      <p className="font-mono font-bold text-xs text-red-300 truncate mt-0.5" title="iu.bwa.italy@gmail.com">iu.bwa.italy@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Accordion-Style FAQ Section */}
      <UniversityFaqs currentLang={currentLang} />

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-gray-100 pb-8 mb-8">
            
            {/* Branding */}
            <div className={`flex items-center gap-3 ${flexNavDirection}`}>
              <img 
                src={logoUrl} 
                alt={t.logoText} 
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" 
                referrerPolicy="no-referrer"
              />
              <div className={textAlignment}>
                <span className="text-md font-extrabold text-primary block leading-tight">{t.logoText}</span>
                <span className="text-[10px] text-gray-550 block mt-0.5 font-bold leading-tight">{t.footerSlogan}</span>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex gap-4 justify-center lg:justify-end">
              <a 
                href="https://www.facebook.com/profile.php?id=61589822784690" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 hover:bg-blue-600 hover:text-white transition text-gray-600 rounded-2xl shadow-sm border border-gray-100"
                title={t.footerFbTitle}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:iu.bwa.italy@gmail.com" 
                className="p-3 bg-gray-50 hover:bg-red-500 hover:text-white transition text-gray-600 rounded-2xl shadow-sm border border-gray-100"
                title={t.channelEmail}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 ${flexNavDirection}`}>
            <p>{t.footerCopyright}</p>
            <p className="flex items-center gap-1">
              <span>{t.directorLocation}</span>
              <span>•</span>
              <span>WhatsApp Admin: +39 351 853 0537</span>
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Action Button for WhatsApp */}
      <a 
        href="https://wa.me/393518530537" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 left-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center"
        title={t.navContactUs}
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Bilingual AI University Advisor Chatbot Widget */}
      <UniversityChatbot currentLang={currentLang} />

      {/* Floating Student Quick Links Sidebar and Modals */}
      <StudentQuickLinks currentLang={currentLang} />

      {/* Syllabus Preview Modal Component Backdrop Panel */}
      <SyllabusPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        item={selectedSyllabusItem} 
        currentLang={currentLang} 
        isRtl={isRtl} 
      />
    </div>
  );
}
