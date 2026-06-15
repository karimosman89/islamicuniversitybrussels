import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DocumentScanner } from "./DocumentScanner";
import { AdmissionStatusTrackerModal } from "./AdmissionStatusTrackerModal";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft, 
  Calculator, 
  Download, 
  Search, 
  ShieldCheck, 
  Database,
  Trash2,
  RefreshCw,
  SearchCode,
  Sparkles,
  Award,
  Globe,
  Heart
} from "lucide-react";

interface AdmissionFormProps {
  currentLang: string;
}

interface ApplicationData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  degree: "bachelor" | "master" | "phd";
  college: string;
  specialty: string;
  isMemorizer: boolean;
  extraPremiumAdvisor: boolean;
  notes: string;
  files: { name: string; size: string; type: string }[];
  status: "Pending Check" | "Under Review" | "Conditionally Approved" | "Fully Accepted";
  submittedAt: string;
  calcTuition: number;
  calcDiscount: number;
  calcTotal: number;
  scholarshipType?: "none" | "merit" | "regional" | "need";
  calcScholarshipDiscount?: number;
}

const PROGRAM_FEES = {
  bachelor: { base: 1000, memoDiscount: 0.20 }, // 20% off
  master: { base: 1200, memoDiscount: 0.10 },   // 10% off
  phd: { base: 1400, memoDiscount: 0.10 }        // 10% off
};

// Available Colleges & Specializations in Brussels Europe branch (as per translations/rules)
const COLLEGES_DATA = [
  {
    ar: "كلية الدراسات الإسلامية والعربية",
    en: "College of Islamic & Arabic Studies",
    specialties: {
      ar: ["الشريعة والقانون", "أصول الدين والحديث", "اللغة العربية وآدابها", "الدراسات الإسلامية المعاصرة"],
      en: ["Sharia and Law", "Usul al-Din & Hadith Science", "Arabic Language & Literature", "Contemporary Islamic Studies"]
    }
  },
  {
    ar: "كلية الإدارة والاقتصاد والعلوم السياسية",
    en: "College of Administration, Economics & Political Science",
    specialties: {
      ar: ["إدارة الأعمال الرقمية", "المصارف والتمويل الإسلامي", "العلوم السياسية والعلاقات الدولية"],
      en: ["Digital Business Administration", "Islamic Banking & Finance", "Political Sciences & International Relations"]
    }
  },
  {
    ar: "كلية العلوم التربوية والإنسانية",
    en: "College of Educational & Human Sciences",
    specialties: {
      ar: ["علم النفس الإرشادي", "مناهج وعلوم التربية عن بعد", "علم الاجتماع والإعلام الرقمي", "التاريخ والتربية الفكرية"],
      en: ["Counseling Psychology", "Educational Methods & Distance Learning", "Sociology & Digital Media", "History and Intellectual Education"]
    }
  },
  {
    ar: "كلية القانون والعلوم السياسية",
    en: "College of Law & Political Science",
    specialties: {
      ar: ["الدراسات القانونية المقارنة", "القانون الدولي العام", "التحكيم الدولي ومكافحة الجرائم المعلوماتية"],
      en: ["Comparative Legal Studies", "General International Law", "International Arbitration & Cybercrime Prevention"]
    }
  }
];

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  
  // Storage local load
  const [submissions, setSubmissions] = useState<ApplicationData[]>([]);
  const [loadingApp, setLoadingApp] = useState(false);

  // Stepped Form State loaded from localStorage
  const [step, setStep] = useState<number>(() => {
    try {
      const savedStep = localStorage.getItem("iub_admission_form_step_autosave");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (parsed >= 1 && parsed <= 4) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading step from localStorage:", e);
    }
    return 1;
  });

  const [formData, setFormData] = useState(() => {
    const defaultData = {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      degree: "bachelor" as "bachelor" | "master" | "phd",
      collegeIdx: 0,
      specialtyIdx: 0,
      isMemorizer: false,
      extraPremiumAdvisor: false,
      notes: "",
      uploadedFiles: [] as { name: string; size: string; type: string }[],
      scholarshipType: "none" as "none" | "merit" | "regional" | "need"
    };
    try {
      const savedData = localStorage.getItem("iub_admission_form_autosave");
      if (savedData) {
        return { ...defaultData, ...JSON.parse(savedData) };
      }
    } catch (e) {
      console.warn("Error reading formData from localStorage:", e);
    }
    return defaultData;
  });

  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaValues, setCaptchaValues] = useState({ num1: 3, num2: 4 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Track newly submitted application for success card
  const [latestSubmittedApp, setLatestSubmittedApp] = useState<ApplicationData | null>(null);

  // Status Check Look up state
  const [searchToken, setSearchToken] = useState("");
  const [trackedApp, setTrackedApp] = useState<ApplicationData | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // Admin Portal Toggles
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCategoryFilter, setAdminCategoryFilter] = useState("all");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");

  // Load from local storage and from express backend (optional sync) on mount
  useEffect(() => {
    generateCaptcha();
    fetchApplications();
    
    try {
      const savedData = localStorage.getItem("iub_admission_form_autosave");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Check if there are some user input fields filled
        if (parsed.fullName || parsed.email || parsed.phone || parsed.country || parsed.notes || (parsed.uploadedFiles && parsed.uploadedFiles.length > 0)) {
          setHasRestoredDraft(true);
        }
      }
    } catch (e) {
      console.warn("Error reading auto-saved data on mount:", e);
    }
  }, []);

  // Write formData to local storage automatically whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("iub_admission_form_autosave", JSON.stringify(formData));
    } catch (e) {
      console.warn("Failed to write form autosave to localStorage:", e);
    }
  }, [formData]);

  // Write active step to local storage automatically whenever it changes (only steps 1-4)
  useEffect(() => {
    try {
      if (step >= 1 && step <= 4) {
        localStorage.setItem("iub_admission_form_step_autosave", String(step));
      }
    } catch (e) {
      console.warn("Failed to write step autosave to localStorage:", e);
    }
  }, [step]);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 7) + 2;
    setCaptchaValues({ num1, num2 });
    setCaptchaAnswer("");
  };

  const fetchApplications = async () => {
    setLoadingApp(true);
    try {
      // 1. Try fetching from the backend
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.applications || []);
      } else {
        // Fallback to localStorage
        const local = localStorage.getItem("iub_admission_submissions");
        if (local) {
          setSubmissions(JSON.parse(local));
        }
      }
    } catch (e) {
      console.warn("Backend unavailable, using local storage instead:", e);
      const local = localStorage.getItem("iub_admission_submissions");
      if (local) {
        setSubmissions(JSON.parse(local));
      }
    } finally {
      setLoadingApp(false);
    }
  };

  const handleCreateApplicationOnBackend = async (app: ApplicationData) => {
    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ application: app })
      });
    } catch (e) {
      console.warn("Could not save to server. Saving in local memory only.", e);
    }
  };

  const handleUpdateStatusOnBackend = async (id: string, nextStatus: string) => {
    try {
      await fetch("/api/applications/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus })
      });
    } catch (e) {
      console.warn("Could not sync updated status on server.", e);
    }
  };

  const handleDeleteOnBackend = async (id: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: "DELETE"
      });
    } catch (e) {
      console.warn("Could not delete from server.", e);
    }
  };

  // Tuition Calculation
  const getCalculatedFees = (deg: "bachelor" | "master" | "phd", memo: boolean, advisor: boolean, scholarshipType?: string) => {
    const feeObj = PROGRAM_FEES[deg] || PROGRAM_FEES.bachelor;
    const base = feeObj.base;
    const memoDiscount = memo ? base * feeObj.memoDiscount : 0;
    
    let scholarshipDiscount = 0;
    if (scholarshipType === "merit") {
      scholarshipDiscount = base * 0.30;
    } else if (scholarshipType === "regional") {
      scholarshipDiscount = base * 0.25;
    } else if (scholarshipType === "need") {
      scholarshipDiscount = base * 0.40;
    }

    const totalDiscount = memoDiscount + scholarshipDiscount;
    const feeAfterDiscount = Math.max(0, base - totalDiscount);
    const extras = advisor ? 100 : 0;
    const total = feeAfterDiscount + extras;

    return { base, discount: memoDiscount, scholarshipDiscount, extras, total };
  };

  const feeStatus = getCalculatedFees(formData.degree, formData.isMemorizer, formData.extraPremiumAdvisor, formData.scholarshipType);

  // File drag & drop simulator
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addMockFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addMockFiles(Array.from(e.target.files));
    }
  };

  const addMockFiles = (filesList: File[]) => {
    const fresh = filesList.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      type: f.type || "application/pdf"
    }));
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...fresh]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  // Validate current step
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 5) {
        newErrors.fullName = isRtl 
          ? "اسم الطالب الكامل مطلوب (ثلاثي على الأقل لتطابق الأوراق الرسمية)" 
          : "Full legal student name is required (at least 3 words to match official documents)";
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = isRtl 
          ? "يرجى كتابة بريد إلكتروني صالح لاستلام القبول" 
          : "Please input a valid email address to receive your confirmation letter";
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        newErrors.phone = isRtl 
          ? "رقم الواتساب مطلوب للاتصال السريع من الهيئة الإدارية" 
          : "WhatsApp number is required for immediate registrar guidance";
      }
      if (!formData.country.trim()) {
        newErrors.country = isRtl ? "بلد الإقامة مطلوب لتحديد الوكيل" : "Country of residence is required";
      }
    }

    if (currentStep === 3) {
      if (formData.uploadedFiles.length === 0) {
        newErrors.files = isRtl 
          ? "يرجى إرفاق وثيقة الهوية والمؤهلات الأكاديمية للمراجعة المبدئية" 
          : "Please attach at least one document (Identity or previous certificate)";
      } else if (formData.scholarshipType && formData.scholarshipType !== "none" && formData.uploadedFiles.length < 2) {
        const requiredDocLabel = 
          formData.scholarshipType === "merit" 
            ? (isRtl ? "كشف درجات متميز (GPA >= 3.7) أو خطاب توصية أكاديمي" : "Academic transcript with GPA >= 3.7 or a recommendation letter")
            : formData.scholarshipType === "regional"
            ? (isRtl ? "إثبات إقليمي كفاتورة الإقامة أو مستند محلي" : "proof of residency regional documentation")
            : (isRtl ? "كشف الدخل السنوي أو تعهد مكتوب بمستوى الملاءة والصعوبة المالية" : "annual income specification or written hardship documentation proof");
            
        newErrors.files = isRtl
          ? `يرجى إرفاق مستند تبرير المنحة بالإضافة للهوية (نحتاج ملفين على الأقل): ${requiredDocLabel}`
          : `Scholarship active! Please upload your support proof in addition to primary ID (requires 2+ files): ${requiredDocLabel}`;
      }
      const sumAnswer = Number(captchaAnswer);
      if (isNaN(sumAnswer) || sumAnswer !== (captchaValues.num1 + captchaValues.num2)) {
        newErrors.captcha = isRtl 
          ? "التحقق الأمني غير صحيح، يرجى كتابة مجموع الرقمين" 
          : "Incorrect security check answer. Please write the sum of the two numbers";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    // Build the final application dataset
    const tokenRandom = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = new Date().getFullYear();
    const appToken = `IUB-${datePrefix}-${tokenRandom}`;

    const chosenCollege = COLLEGES_DATA[formData.collegeIdx];
    const collegeName = isRtl ? chosenCollege.ar : chosenCollege.en;
    const specialtyName = isRtl 
      ? chosenCollege.specialties.ar[formData.specialtyIdx] 
      : chosenCollege.specialties.en[formData.specialtyIdx];

    const newApp: ApplicationData = {
      id: appToken,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      degree: formData.degree,
      college: collegeName,
      specialty: specialtyName,
      isMemorizer: formData.isMemorizer,
      extraPremiumAdvisor: formData.extraPremiumAdvisor,
      notes: formData.notes,
      files: formData.uploadedFiles,
      status: "Pending Check",
      submittedAt: new Date().toISOString().substring(0, 10),
      calcTuition: feeStatus.base,
      calcDiscount: feeStatus.discount,
      calcTotal: feeStatus.total,
      scholarshipType: formData.scholarshipType,
      calcScholarshipDiscount: feeStatus.scholarshipDiscount
    };

    // Update list & local storage
    const updated = [newApp, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("iub_admission_submissions", JSON.stringify(updated));

    // Save to the Express backend to keep state robust across reloads
    await handleCreateApplicationOnBackend(newApp);

    // Track state to trigger completion view
    setLatestSubmittedApp(newApp);
    setStep(5); // Complete Step
    setHasRestoredDraft(false);
    try {
      localStorage.removeItem("iub_admission_form_autosave");
      localStorage.removeItem("iub_admission_form_step_autosave");
    } catch (e) {
      console.warn("Could not remove auto-saved data on submit:", e);
    }
  };

  // Track admission ticket search
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = submissions.find(sub => sub.id.toUpperCase().trim() === searchToken.toUpperCase().trim());
    setTrackedApp(match || null);
    setTrackSearched(true);
  };

  // Admin functions
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() === "admin123") {
      setIsAdminAuthenticated(true);
      setErrors({});
    } else {
      setErrors({ adminPass: isRtl ? "كلمة المرور غير صحيحة" : "Incorrect administrator password" });
    }
  };

  const handleUpdateStatus = async (appId: string, nextStatus: any) => {
    const updated = submissions.map(sub => {
      if (sub.id === appId) {
        return { ...sub, status: nextStatus };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem("iub_admission_submissions", JSON.stringify(updated));
    await handleUpdateStatusOnBackend(appId, nextStatus);

    if (latestSubmittedApp?.id === appId) {
      setLatestSubmittedApp(prev => prev ? { ...prev, status: nextStatus } : null);
    }
    if (trackedApp?.id === appId) {
      setTrackedApp(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  const handleDeleteApplication = async (appId: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف هذا الطلب بالكامل؟" : "Are you sure you want to delete this application permanently?")) {
      const updated = submissions.filter(sub => sub.id !== appId);
      setSubmissions(updated);
      localStorage.setItem("iub_admission_submissions", JSON.stringify(updated));
      await handleDeleteOnBackend(appId);

      if (trackedApp?.id === appId) {
        setTrackedApp(null);
      }
    }
  };

  // Filter application files representation for the Admin Table
  const filteredSubmissions = submissions.filter(sub => {
    const matchCat = adminCategoryFilter === "all" || sub.degree === adminCategoryFilter;
    const matchSearch = !adminSearchQuery.trim() || 
      sub.fullName.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
      sub.phone.includes(adminSearchQuery) ||
      sub.id.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
      sub.country.toLowerCase().includes(adminSearchQuery.toLowerCase());

    return matchCat && matchSearch;
  });

  const exportCSV = () => {
    const headers = ["Application ID", "Full Name", "Email", "Phone / WhatsApp", "Country", "Degree", "College", "Specialty", "Quran Memorizer", "Scholarship", "Fee Total (EUR)", "Submitted Date", "Status"];
    const rows = filteredSubmissions.map(s => [
      s.id,
      s.fullName,
      s.email,
      s.phone,
      s.country,
      s.degree.toUpperCase(),
      s.college,
      s.specialty,
      s.isMemorizer ? "YES" : "NO",
      s.scholarshipType || "none",
      s.calcTotal,
      s.submittedAt,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IUB_Admissions_Export_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Pending Check":
        return "bg-amber-500/15 text-amber-500 border-amber-500/20";
      case "Under Review":
        return "bg-blue-500/15 text-blue-400 border-blue-500/20";
      case "Conditionally Approved":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
      case "Fully Accepted":
        return "bg-emerald-600 text-white border-transparent";
      default:
        return "bg-slate-700/30 text-gray-300";
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      degree: "bachelor",
      collegeIdx: 0,
      specialtyIdx: 0,
      isMemorizer: false,
      extraPremiumAdvisor: false,
      notes: "",
      uploadedFiles: [],
      scholarshipType: "none"
    });
    setStep(1);
    generateCaptcha();
    setErrors({});
    setLatestSubmittedApp(null);
    setHasRestoredDraft(false);
    try {
      localStorage.removeItem("iub_admission_form_autosave");
      localStorage.removeItem("iub_admission_form_step_autosave");
    } catch (e) {
      console.warn("Could not remove auto-saved data:", e);
    }
  };

  return (
    <div id="apply-portal" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Dynamic Header Actions */}
      <div className={`flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-slate-800 mb-8 gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
            <span className="p-1 px-2.5 rounded-full bg-emerald-500/10 text-emerald-450 text-[10px] uppercase font-black tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {isRtl ? "نظام موحد رسمي" : "Official Admissions Portal"}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isRtl ? "بوابة القبول الرقمية الموصى بها" : "Digital Degree Registration Form"}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            {isRtl 
              ? "قدم طلب انتسابك ودراسة ملفك الأكاديمي رسمياً في أقل من 5 دقائق بالتكامل الفوري مع الهيئة الإدارية الأوروبية."
              : "Register your files and study profile officially to get initial evaluation in less than 5 minutes."}
          </p>
        </div>

        {/* Floating Switch Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setShowAdmin(false); setTrackSearched(false); if(step > 4) resetForm(); }}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 ${(!showAdmin && !trackSearched) ? 'bg-primary text-white' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'}`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isRtl ? "تقديم تسجيل جديد" : "Apply Now"}</span>
          </button>
          
          <button
            onClick={() => { setShowAdmin(false); setTrackSearched(true); }}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 ${(trackSearched && !showAdmin) ? 'bg-primary text-white' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'}`}
          >
            <SearchCode className="w-3.5 h-3.5" />
            <span>{isRtl ? "استعلام عن طلب" : "Track Application"}</span>
          </button>

          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 ${showAdmin ? 'bg-slate-100 text-slate-900' : 'bg-slate-800/40 border border-slate-700/60 hover:bg-slate-850 text-slate-400'}`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isRtl ? "لوحة الإدارة" : "Registrar Panel"}</span>
          </button>

          <AdmissionStatusTrackerModal currentLang={currentLang} />
        </div>
      </div>

      {/* Main Container Blocks */}
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: REGISTRAR/ADMIN VIEW */}
        {showAdmin && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {!isAdminAuthenticated ? (
              // Admin Authentication Form
              <div className="max-w-md mx-auto py-12 p-6 bg-slate-950/40 border border-slate-800 rounded-3xl text-center">
                <Database className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h4 className="text-md sm:text-lg font-bold text-white mb-2">
                  {isRtl ? "الوصول اللوجستي للهيئة التعليمية" : "European Academic Authority Login"}
                </h4>
                <p className="text-xs text-slate-400 mb-6 font-semibold">
                  {isRtl 
                    ? "هذه الواجهة مخصصة لرئيس القبول والممثلين الإداريين لمراجعة الملفات الواردة. (كلمة المرور التجريبية: admin123)"
                    : "This viewport is for Registrar and regional representatives to verify applications. (Demo Password: admin123)"}
                </p>

                <form onSubmit={handleAdminAuth} className="space-y-4 text-left">
                  <div>
                    <label className="block text-[11px] text-gray-400 font-bold mb-1.5 uppercase text-slate-300">
                      {isRtl ? "أدخل رمز الإدارة للمرور" : "Registrar Security Token"}
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-primary px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none text-center font-mono tracking-widest"
                    />
                    {errors.adminPass && (
                      <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.adminPass}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                  >
                    {isRtl ? "تأكيد الهوية والدخول للملفات" : "Authorize Admissions Access"}
                  </button>
                </form>
              </div>
            ) : (
              // Authenticated Admin Dashboard Table
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="text-md sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {isRtl ? "منظومة السجل الأكاديمي الوارد" : "Student Admissions Registry Tracker"}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                        ({filteredSubmissions.length} {isRtl ? "طالب" : "applications"})
                      </span>
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      {isRtl 
                        ? "برمجة وبمزامنة حرة مع المتصفح والملف المركزي لمتابعة فرز طلبات القبول."
                        : "Synchronized list of digital submissions for educational evaluation checks."}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={fetchApplications}
                      className="p-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingApp ? 'animate-spin' : ''}`} />
                      <span>{isRtl ? "تحديث البيانات" : "Refresh"}</span>
                    </button>
                    <button
                      onClick={exportCSV}
                      disabled={filteredSubmissions.length === 0}
                      className="p-2 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isRtl ? "تصدير Excel/CSV" : "Export Spreadsheet"}</span>
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      value={adminSearchQuery}
                      onChange={e => setAdminSearchQuery(e.target.value)}
                      placeholder={isRtl ? "بحث بالاسم، الإيميل، الهاتف، التوكن أو البلد..." : "Search name, Email, token, Country..."}
                      className="w-full bg-slate-950/40 border border-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-slate-700"
                    />
                  </div>

                  <div className="flex gap-2 md:col-span-2">
                    {["all", "bachelor", "master", "phd"].map(degreeTab => (
                      <button
                        key={degreeTab}
                        onClick={() => setAdminCategoryFilter(degreeTab)}
                        className={`flex-1 py-2 px-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${adminCategoryFilter === degreeTab ? 'bg-slate-100 text-slate-900 border-slate-100' : 'bg-slate-950/20 text-slate-400 border-slate-800 hover:bg-slate-850'}`}
                      >
                        {degreeTab === "all" && (isRtl ? "كل الدرجات" : "All Degrees")}
                        {degreeTab === "bachelor" && (isRtl ? "بكالوريوس" : "Bachelor")}
                        {degreeTab === "master" && (isRtl ? "ماجستير" : "Master")}
                        {degreeTab === "phd" && (isRtl ? "دكتوراه" : "PhD")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submissions Data Table Component */}
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/20 max-h-[500px] overflow-y-auto">
                  {filteredSubmissions.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                      <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-xs font-bold">{isRtl ? "لا توجد طلبات تطابق البينات المدخلة حالياً" : "No admissions request matching filters found."}</p>
                      <p className="text-[10px] text-slate-550 mt-1">{isRtl ? "تأكد من تعبئة فورم للتجربة أولاً" : "Submit a trial form first to populate this list!"}</p>
                    </div>
                  ) : (
                    <div className="min-w-full overflow-x-auto">
                      <table className="w-full text-[11px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 font-extrabold uppercase tracking-wide">
                            <th className="p-3 text-center">{isRtl ? "رمز الطالب" : "ID Token"}</th>
                            <th className="p-3">{isRtl ? "الطالب وتفصيل الاتصال" : "Student Details"}</th>
                            <th className="p-3">{isRtl ? "البرنامج الأكاديمي والرسوم" : "Academic Choice & Fee"}</th>
                            <th className="p-3">{isRtl ? "الوثائق" : "Submitted files"}</th>
                            <th className="p-3 text-center">{isRtl ? "التاريخ" : "Date"}</th>
                            <th className="p-3 text-center">{isRtl ? "درجة التقييم الحالية" : "Status Action"}</th>
                            <th className="p-3 text-center"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 text-slate-300">
                          {filteredSubmissions.map((sub, index) => (
                            <tr key={index} className="hover:bg-slate-850/35 transition-colors">
                              {/* Token */}
                              <td className="p-3 text-center font-mono font-bold text-amber-450 whitespace-nowrap">
                                {sub.id}
                              </td>

                              {/* Student Info */}
                              <td className="p-3 min-w-[160px]">
                                <div className="font-bold text-white text-[12px]">{sub.fullName}</div>
                                <div className="text-slate-400 mt-1 font-mono">{sub.email}</div>
                                <div className="text-slate-400 mt-0.5 font-mono">{sub.phone}</div>
                                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-bold">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  <span>{sub.country}</span>
                                </div>
                              </td>

                              {/* Academic Program details */}
                              <td className="p-3">
                                <div className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">
                                  {sub.degree}
                                </div>
                                <div className="font-bold text-white mt-0.5 text-[11px] leading-tight">
                                  {sub.college}
                                </div>
                                <div className="text-slate-400 text-[10px] mt-0.5 font-semibold">
                                  🧩 {sub.specialty}
                                </div>
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-bold text-slate-200">
                                    {sub.calcTotal} EUR
                                  </span>
                                  {sub.isMemorizer && (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[9px] font-bold text-amber-400">
                                      📿 {isRtl ? "حافظ" : "Memorizer"}
                                    </span>
                                  )}
                                  {sub.scholarshipType && sub.scholarshipType !== "none" && (
                                    <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-[9px] font-bold text-sky-400">
                                      🎓 {sub.scholarshipType === "merit" 
                                        ? (isRtl ? "جدارة" : "Merit")
                                        : sub.scholarshipType === "regional"
                                        ? (isRtl ? "إقليمي" : "Regional")
                                        : (isRtl ? "حاجة" : "Need-Based")
                                      }
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Uploaded Documents */}
                              <td className="p-3 max-w-[140px] truncate">
                                <div className="space-y-1.5">
                                  {sub.files?.map((f, fi) => (
                                    <div key={fi} className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold max-w-[150px] truncate">
                                      <FileText className="w-3 h-3 text-red-400 flex-shrink-0" />
                                      <span className="truncate" title={f.name}>{f.name}</span>
                                      <span className="text-[9px] text-slate-600">({f.size})</span>
                                    </div>
                                  ))}
                                  {sub.notes && (
                                    <div className="text-[9px] text-slate-500 italic bg-slate-900/45 p-1 rounded max-w-[150px] truncate" title={sub.notes}>
                                      💬 {sub.notes}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Submitted Date */}
                              <td className="p-3 text-center whitespace-nowrap font-mono text-slate-400">
                                {sub.submittedAt}
                              </td>

                              {/* Status Action */}
                              <td className="p-3 text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusClass(sub.status)}`}>
                                    {sub.status}
                                  </span>
                                  <select
                                    value={sub.status}
                                    onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                                    className="bg-slate-900 border border-slate-800 text-[9px] font-bold text-slate-300 rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
                                  >
                                    <option value="Pending Check">{isRtl ? "انتظار التدقيق" : "Pending Check"}</option>
                                    <option value="Under Review">{isRtl ? "تحت الدراسة" : "Under Review"}</option>
                                    <option value="Conditionally Approved">{isRtl ? "قبول مشروط" : "Conditionally Approved"}</option>
                                    <option value="Fully Accepted">{isRtl ? "قبول معتمد نهائي" : "Fully Accepted"}</option>
                                  </select>
                                </div>
                              </td>

                              {/* Delete action button */}
                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteApplication(sub.id)}
                                  className="p-1 px-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                                  title="Delete Application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: TICKET STATUS CHECK WINDOW */}
        {trackSearched && !showAdmin && (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-xl mx-auto py-6 space-y-6"
          >
            <div className="bg-slate-950/45 p-6 rounded-3xl border border-slate-800/80 text-center">
              <SearchCode className="w-12 h-12 text-primary mx-auto mb-3" />
              <h4 className="text-md sm:text-lg font-bold text-white mb-2">
                {isRtl ? "تتبع حالة ملف الانتساب الجامعي" : "Student Admission File Real-time Tracker"}
              </h4>
              <p className="text-xs text-slate-400 mb-6 font-semibold max-w-sm mx-auto">
                {isRtl 
                  ? "أدخل رمز المعاملة أو كود التسجيل الممنوح لك (مثال: IUB-2026-X) للتحقق ومتابعة موقف القبول من عمادة القبول والتسجيل."
                  : "Input your application token number (e.g. IUB-2026-X) printed on your digital ticket voucher to fetch its current live evaluation status."}
              </p>

              <form onSubmit={handleTrackSearch} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="text"
                  required
                  value={searchToken}
                  onChange={e => setSearchToken(e.target.value)}
                  placeholder="IUB-2026-••••"
                  className="flex-grow bg-slate-900 border border-slate-700 focus:border-primary px-4 py-2.5 rounded-xl text-xs text-white uppercase font-mono text-center tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-bold p-3 px-5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isRtl ? "بحث الموقف" : "Track File"}</span>
                </button>
              </form>
            </div>

            {/* Render Track Result */}
            {trackSearched && (
              <AnimatePresence mode="wait">
                {trackedApp ? (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950/90 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-4"
                  >
                    <div className="flex justify-between items-start border-b border-slate-850 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-500 font-mono">
                          {isRtl ? "معاملة معتمدة" : "Verified Academic File"}
                        </span>
                        <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
                          {trackedApp.fullName}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {isRtl ? "رقم الملف:" : "File Token ID:"} <span className="font-mono font-bold text-emerald-400">{trackedApp.id}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusClass(trackedApp.status)}`}>
                          {trackedApp.status}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-2 font-mono">
                          {trackedApp.submittedAt}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[11px] bg-slate-900/60 p-4 rounded-2xl border border-slate-850">
                      <div>
                        <p className="text-slate-500">{isRtl ? "المؤهل المستهدف" : "Target Degree"}</p>
                        <p className="font-bold text-white text-xs mt-1 uppercase text-emerald-450">{trackedApp.degree}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">{isRtl ? "بلد الإقامة" : "Country of Residence"}</p>
                        <p className="font-bold text-white text-xs mt-1">{trackedApp.country}</p>
                      </div>
                      <div className="col-span-2 border-t border-slate-850/60 pt-2 mt-1">
                        <p className="text-slate-500">{isRtl ? "الكلية والتخصص الفرعي" : "Subspecialty & College"}</p>
                        <p className="font-bold text-white mt-1 text-[11px]" style={{ direction: isRtl ? "rtl" : "ltr" }}>
                          {trackedApp.college} — {trackedApp.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Cost block */}
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex justify-between items-center text-[11px]">
                      <div>
                        <p className="text-slate-400 font-bold">{isRtl ? "الرسوم السنوية المقررة" : "Annual Tuition Assessed"}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {trackedApp.isMemorizer && (isRtl ? "✓ تم تطبيق خصم حفظ الـقرآن (20%) " : "✓ Quran Memorizer special price applied (20%) ")}
                          {trackedApp.scholarshipType && trackedApp.scholarshipType !== "none" && (
                            <span className="block mt-0.5 text-sky-400 font-bold">
                              {trackedApp.scholarshipType === "merit" 
                                ? (isRtl ? "✓ تم تطبيق منحة التميز الأكاديمي (30% خصم)" : "✓ 30% Merit Scholarship applied")
                                : trackedApp.scholarshipType === "regional"
                                ? (isRtl ? "✓ تم تطبيق منحة الدعم الإقليمي (25% خصم)" : "✓ 25% Regional Scholarship applied")
                                : (isRtl ? "✓ تم تطبيق منحة صندوق معونة الطلاب (40% خصم)" : "✓ 40% Financial Aid applied")
                              }
                            </span>
                          )}
                          {!trackedApp.isMemorizer && (!trackedApp.scholarshipType || trackedApp.scholarshipType === "none") && (isRtl ? "لا توجد خصومات مطبقة" : "Standard tuition package")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-md sm:text-lg font-black text-emerald-400 font-mono">
                          {trackedApp.calcTotal} EUR
                        </span>
                      </div>
                    </div>

                    {/* Next step recommendation depending on status */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] text-slate-300 leading-relaxed">
                      {trackedApp.status === "Pending Check" && (
                        <p>
                          ⏳ {isRtl 
                            ? "ملفك الآن قيد تدقيق الأمان والمؤهلات الأولي. عادة يستغرق التدقيق الصارم 12 إلى 48 ساعة. يسعدنا توجيه ملفك لقسم القبول."
                            : "Your application is pending initial review. The regional director and registrar are evaluating your qualifications files. Usually resolved in 12-48 hours."}
                        </p>
                      )}
                      {trackedApp.status === "Under Review" && (
                        <p>
                          🔍 {isRtl 
                            ? "تم تعيين مرشد لدراسة معادلة المواد والمؤتمرات السابقة لتقليص سني دراستك. سيتم إعلان القبول المشروط فور الإنتهاء."
                            : "An academic supervisor is studying your prior books & publications for credits evaluation. Expect preliminary decision soon."}
                        </p>
                      )}
                      {trackedApp.status === "Conditionally Approved" && (
                        <div className="space-y-3">
                          <p className="text-emerald-400 font-bold">
                            🎉 {isRtl ? "مبارك! تم إصدار الموافقة المبدئية وحجز مقعدك الدراسي بفرع أوروبا." : "Congratulations! Preliminary conditional admission has been validated for Brussels."}
                          </p>
                          <p className="text-slate-400">
                            {isRtl 
                              ? "يرجى نسخ الرقم الفوري للطلب والتواصل مع أحد المدراء المعتمدين والممثلين الدوليين عبر واتساب لإرسال ملفات الشهادات والتوثيق المكتمل وبدء تفعيل تسجيلك المباشر."
                              : "Please copy your ID token and click on representatives list or WhatsApp below to initiate direct document validation and finalize enrollment."}
                          </p>
                          <a
                            href={`https://wa.me/393518530537?text=${encodeURIComponent(
                              isRtl 
                                ? `السلام عليكم دكتور، قمت بفحص طلبي المستمر برقم (${trackedApp.id}) وحالته الآن (${trackedApp.status}) لدرجة (${trackedApp.degree}). أود استكمال توثيق طلبي وبدء الدراسة.`
                                : `Hello, I am completing enrollment for my approved application IUB token (${trackedApp.id}) for (${trackedApp.degree}).`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 p-2 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-[10px] justify-center w-full"
                          >
                            <span>{isRtl ? "تواصل فوراً لتفعيل التسجيل المعتمد" : "Chat with Registrar to Activate"}</span>
                          </a>
                        </div>
                      )}
                      {trackedApp.status === "Fully Accepted" && (
                        <div className="space-y-2 text-center py-2">
                          <p className="text-emerald-400 text-sm font-black">
                            🎖️ {isRtl ? "مبارك، التسجيل معتمد نهائياً بالجامعة الإسلامية بروكسل!" : "Enrollment Confirmed & Fully Validated!"}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {isRtl 
                              ? "تم إدراج الطالب كمقيد رسمي بقوة فرع أوروبا للعام الاستثنائي 2026/2027. مرحباً بك في منارة الأصالة والمعاصرة."
                              : "You are officially enrolled as a verified student for academic year 2026/2027. Welcome in the IUB family."}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="notfound"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-slate-500 bg-slate-950/45 rounded-3xl border border-slate-850"
                  >
                    <FileText className="w-10 h-10 text-slate-650 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-400">{isRtl ? "لم نعثر على هذا الرقم في سجل المتقدمين" : "Admission Ticket Token Not Found"}</p>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-xs mx-auto">
                      {isRtl 
                        ? "تحقق من الكود بدقة شاملاً الفواصل، أو قم بإنشاء طلب تقديم جديد بالتبويب السابق."
                        : "Verify your token identifier spelling precisely (including dashes), or register a new degree program above."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        )}

        {/* VIEW 3: THREE-STEEP APPLICATION WIZARD FORM */}
        {!showAdmin && !trackSearched && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Step Wizard Progress Header */}
            {step <= 4 && (
              <div className="mb-8">
                <div className="flex justify-between items-center relative max-w-md mx-auto mb-2 text-[10px] text-slate-400 font-extrabold font-mono">
                  {/* Connection Line */}
                  <div className="absolute top-[11px] left-2.5 right-2.5 h-[2px] bg-slate-800 -z-10">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-350"
                      style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                  </div>
                  
                  {[1, 2, 3, 4].map(s => (
                    <button
                      key={s}
                      disabled={s > step}
                      onClick={() => setStep(s)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all font-bold ${step === s ? 'border-primary bg-primary text-white scale-110' : step > s ? 'border-emerald-500 bg-emerald-500/10 text-emerald-450' : 'border-slate-800 bg-slate-900 text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between text-[9px] text-slate-500 max-w-md mx-auto font-black uppercase text-center">
                  <span className={step >= 1 ? "text-slate-350" : ""}>{isRtl ? "الاتصال" : "Contact"}</span>
                  <span className={step >= 2 ? "text-slate-350" : ""}>{isRtl ? "التخصص" : "Program"}</span>
                  <span className={step >= 3 ? "text-slate-350" : ""}>{isRtl ? "القرآن والأوراق" : "Verification"}</span>
                  <span className={step >= 4 ? "text-slate-350" : ""}>{isRtl ? "مراجعة وحساب" : "Assess"}</span>
                </div>
              </div>
            )}

            {/* Draft Restored Banner notification */}
            {step <= 4 && hasRestoredDraft && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4.5 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-300 relative overflow-hidden"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <p className="text-xs font-black text-white">
                      {isRtl ? "✨ تم استرداد مسودتك تلقائياً" : "✨ Registered draft restored"}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-semibold">
                      {isRtl
                        ? "لقد قمنا بحفظ واستعادة البيانات المعبأة لحمايتها من الفقدان."
                        : "Your previous progress has been fetched and recovered securely in your browser."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setHasRestoredDraft(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-755 text-[10px] font-extrabold text-slate-300 transition cursor-pointer"
                  >
                    {isRtl ? "متابعة" : "Dismiss"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/20 hover:bg-red-900/20 text-[10px] font-extrabold text-[#f87171] transition cursor-pointer"
                  >
                    {isRtl ? "مسح المسودة والبدء مجدداً" : "Start Fresh"}
                  </button>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal & Contact Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="bg-slate-950/30 p-4 border border-slate-850 rounded-2xl flex items-center gap-3">
                    <User className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[10px] text-slate-450 uppercase font-bold">{isRtl ? "الخطوة الأولى" : "First Step"}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{isRtl ? "بيانات التواصل وبيانات الهوية المعتمدة" : "Verification & Passport Contact Details"}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {/* Full Name */}
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                        {isRtl ? "الاسم الرباعي الكامل للطالب (كما هو في جواز السفر) *" : "Full Legal Student Name (Identical with passport) *"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder={isRtl ? "مثال: عبد الرحمن بن أحمد السعدي" : "e.g. Abdurahman Ahmed Al-Saadi"}
                          className={`w-full bg-slate-950/35 border ${errors.fullName ? 'border-red-500/50' : 'border-slate-800 focus:border-primary'} pl-10 pr-4 py-3 rounded-xl text-xs text-white focus:outline-none`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                        {isRtl ? "البريد الإلكتروني المعتمد لخطاب القبول *" : "Official Email Address *"}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="student@example.com"
                          className={`w-full bg-slate-950/35 border ${errors.email ? 'border-red-500/50' : 'border-slate-800 focus:border-primary'} pl-10 pr-4 py-3 rounded-xl text-xs text-white focus:outline-none`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.email}</p>}
                    </div>

                    {/* Phone WhatsApp */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                        {isRtl ? "رقم الجوال وبادئة واتساب النشط *" : "WhatsApp Phone Number (with Country Code) *"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+966 50 •••••••"
                          className={`w-full bg-slate-950/35 border ${errors.phone ? 'border-red-500/50' : 'border-slate-800 focus:border-primary'} pl-10 pr-4 py-3 rounded-xl text-xs text-white focus:outline-none`}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.phone}</p>}
                    </div>

                    {/* Country of Residence */}
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                        {isRtl ? "بلد الإقامة الحالي *" : "Current Country of Residence *"}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 text-slate-500 w-4 h-4" />
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                          placeholder={isRtl ? "مثال: المملكة العربية السعودية، فرنسا، تركيا" : "e.g. Saudi Arabia, France, Turkey"}
                          className={`w-full bg-slate-950/35 border ${errors.country ? 'border-red-500/50' : 'border-slate-800 focus:border-primary'} pl-10 pr-4 py-3 rounded-xl text-xs text-white focus:outline-none`}
                        />
                      </div>
                      {errors.country && <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.country}</p>}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="py-3 px-6 bg-primary hover:bg-opacity-90 font-bold text-xs sm:text-sm text-white rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <span>{isRtl ? "متابعة اختيار البرنامج الدراسي" : "Next: Choose Academic Program"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Academic Program Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5 text-left"
                >
                  <div className="bg-slate-950/30 p-4 border border-slate-850 rounded-2xl flex items-center gap-3">
                    <GraduationCap className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[10px] text-slate-450 uppercase font-bold">{isRtl ? "الخطوة الثانية" : "Second Step"}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{isRtl ? "اختيار الكلية الأكاديمية ونوع الدرجة" : "Select Target College & Academic Degree"}</h4>
                    </div>
                  </div>

                  {/* Target Degree */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {isRtl ? "المستهدف الدراسي أو الدرجة العلمية *" : "Target Degree level *"}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { code: "bachelor", title: isRtl ? "بكالوريوس (التمهيدي)" : "Bachelor", base: 1000 },
                        { code: "master", title: isRtl ? "ماجستير (العليا)" : "Master", base: 1200 },
                        { code: "phd", title: isRtl ? "دكتوراه (البحثية)" : "Doctorate (PhD)", base: 1400 }
                      ].map(d => (
                        <button
                          key={d.code}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, degree: d.code as any }))}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${formData.degree === d.code ? 'bg-primary/20 border-primary text-white scale-[1.01]' : 'bg-slate-950/35 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          <p className="font-extrabold text-[11px] sm:text-xs">{d.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-mono font-bold">~ {d.base} EUR/yr</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* College selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {isRtl ? "الكلية الأكاديمية المستهدفة *" : "Associate Academic College *"}
                    </label>
                    <div className="space-y-2">
                      {COLLEGES_DATA.map((col, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, collegeIdx: idx, specialtyIdx: 0 }))}
                          className={`w-full p-3 px-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${formData.collegeIdx === idx ? 'bg-slate-850/70 border-emerald-500/40 text-white' : 'bg-slate-950/35 border-slate-800 text-slate-400 hover:border-slate-755'}`}
                        >
                          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse w-full text-right' : 'w-full text-left'}`}>
                            <div className={`p-1.5 rounded bg-emerald-550/15 ${formData.collegeIdx === idx ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-500'}`}>
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold">{isRtl ? col.ar : col.en}</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">{isRtl ? `${col.specialties.ar.length} تخصص متاح` : `${col.specialties.en.length} majors available`}</p>
                            </div>
                          </div>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.collegeIdx === idx ? 'border-emerald-500 text-emerald-400' : 'border-slate-800'}`}>
                            {formData.collegeIdx === idx && <div className="w-2 h-2 bg-emerald-550 rounded-full"></div>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specialty dropdown depending on college */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                      {isRtl ? "التخصص الدقيق والبحث المستهدف *" : "Specialized Area Major / Scientific Specialty *"}
                    </label>
                    <select
                      value={formData.specialtyIdx}
                      onChange={e => setFormData(prev => ({ ...prev, specialtyIdx: Number(e.target.value) }))}
                      className="w-full bg-slate-950/35 border border-slate-800 focus:border-primary p-3 rounded-xl text-xs text-white focus:outline-none"
                    >
                      {(isRtl 
                        ? COLLEGES_DATA[formData.collegeIdx].specialties.ar 
                        : COLLEGES_DATA[formData.collegeIdx].specialties.en
                      ).map((spec, sidx) => (
                        <option key={sidx} value={sidx} className="bg-slate-900 text-white text-xs">
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Scholarship & Fellowship Programs */}
                  <div className="border-t border-slate-800/60 pt-5 mt-4 space-y-3">
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-500" />
                        {isRtl ? "برامج المنح الدراسية والدعم المالي الإضافي (اختياري)" : "Scholarship & Financial Aid Opportunities (Optional)"}
                      </h4>
                      <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                        {isRtl 
                          ? "اختر طيف المنحة المناسب لوضعك الأكاديمي أو الاجتماعي للحصول على خصومات على تكلفة الدراسة المعتمدة. سيقوم مكتب القبول بمراجعة مستنداتك وتفصيل استحقاقك بالخطوة القادمة."
                          : "Select an eligible scholarship category based on your scholastic merits, residence country, or economic status. Applying will configure document criteria on the verification screen."
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                      {[
                        { 
                          type: "none", 
                          title: isRtl ? "قيد وطلب اعتيادي" : "Standard Tuition", 
                          desc: isRtl ? "تطبيق قياسي بدون طلب منحة دراسية" : "No scholarship request", 
                          badge: isRtl ? "الرسوم الأساسية" : "Standard Tuition", 
                          color: "border-slate-800/80 hover:border-slate-700 bg-slate-950/25 text-slate-400",
                          activeColor: "bg-slate-100 border-slate-100 text-slate-950",
                          icon: <BookOpen className="w-4 h-4 shrink-0 text-slate-950" />
                        },
                        { 
                          type: "merit", 
                          title: isRtl ? "جدارة وتميز أكاديمي" : "Merit Excellence", 
                          desc: isRtl ? "لمعدل تراكمي 3.7+ بكشف الدرجات السابق" : "For past cumulative GPA of 3.7+", 
                          badge: isRtl ? "خصم -30% تلقائياً" : "-30% Off Tuition", 
                          color: "border-slate-800/80 hover:border-amber-500/30 bg-slate-950/25 hover:text-amber-400",
                          activeColor: "bg-amber-500/20 border-amber-500/70 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
                          icon: <Award className="w-4 h-4 shrink-0" />
                        },
                        { 
                          type: "regional", 
                          title: isRtl ? "معونة إقليمية ودعم بلدان" : "Regional Aid Support", 
                          desc: isRtl ? "للرواد والمقيمين في دول مخصصة مستحقة" : "For residents from specific countries", 
                          badge: isRtl ? "خصم -25% تلقائياً" : "-25% Off Tuition", 
                          color: "border-slate-800/80 hover:border-sky-500/30 bg-slate-950/25 hover:text-sky-400",
                          activeColor: "bg-sky-500/20 border-sky-500/70 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.1)]",
                          icon: <Globe className="w-4 h-4 shrink-0" />
                        },
                        { 
                          type: "need", 
                          title: isRtl ? "ضمان العسر والاحتياج المالي" : "Need-Based Hardship", 
                          desc: isRtl ? "برعاية صندوق الطلاب ومعونة العائلات" : "Student support aid fund matching", 
                          badge: isRtl ? "خصم -40% تلقائياً" : "-40% Off Tuition", 
                          color: "border-slate-800/80 hover:border-rose-500/30 bg-slate-950/25 hover:text-rose-400",
                          activeColor: "bg-rose-500/20 border-rose-500/70 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.1)]",
                          icon: <Heart className="w-4 h-4 shrink-0" />
                        }
                      ].map((sch) => {
                        const isSelected = formData.scholarshipType === sch.type;
                        return (
                          <button
                            key={sch.type}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, scholarshipType: sch.type as any }))}
                            className={`w-full p-3 px-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group ${isSelected ? sch.activeColor : sch.color}`}
                          >
                            <div className="flex items-center gap-2 mb-1 w-full justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded bg-slate-850/50 ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                                  {sch.icon}
                                </div>
                                <span className={`font-extrabold text-xs tracking-tight text-white group-hover:text-inherit ${isSelected ? 'text-inherit' : ''}`}>{sch.title}</span>
                              </div>
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-900/40 text-gray-450'}`}>
                                {sch.badge}
                              </span>
                            </div>
                            <span className={`text-[10px] leading-tight block select-none ${isSelected ? 'text-slate-200' : 'text-slate-450'}`}>
                              {sch.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-5 bg-slate-800 hover:bg-slate-750 font-bold text-xs text-slate-300 rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{isRtl ? "رجوع" : "Back"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="py-3 px-6 bg-primary hover:bg-opacity-90 font-bold text-xs sm:text-sm text-white rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <span>{isRtl ? "متابعة رفع الأوراق والمستندات" : "Next: Verify & Upload Documents"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Quran Memorization & Document Drop Upload */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5 text-left"
                >
                  <div className="bg-slate-950/30 p-4 border border-slate-850 rounded-2xl flex items-center gap-3">
                    <ShieldCheck className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[10px] text-slate-450 uppercase font-bold">{isRtl ? "الخطوة الثالثة" : "Third Step"}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{isRtl ? "الخصومات القرآنية والمستندات الثبوتية" : "Quran Memorizer Discount & Documentation File"}</h4>
                    </div>
                  </div>

                  {/* Quran Memorization status logic */}
                  <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl text-slate-300">
                    <div className={`sm:flex items-center justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                      <div className="mb-2 sm:mb-0">
                        <span className="inline-block px-2 py-0.5 bg-amber-500/20 text-amber-500 text-[10px] rounded-full font-bold uppercase mb-1">
                          📿 {isRtl ? "تحفيز خاص من عمادة الجامعة" : "Noble Sanctuary Fellowship"}
                        </span>
                        <h5 className="font-extrabold text-white text-xs">{isRtl ? "هل أنت حافظ لكتاب الله كاملاً؟" : "Are you a verified full-mushaf Quran Memorizer?"}</h5>
                        <p className="text-[10px] text-slate-455 mt-0.5">
                          {isRtl 
                            ? "يمنحك خصماً فورياً يبلغ 20% لدرجة البكالوريوس و 10% لدرجات الماجستير والدكتوراه تيسيراً لطريق طلب العلم."
                            : "Grants you an instant 20% tuition deduction for Bachelor or 10% deduction for Master/PhD."}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, isMemorizer: true }))}
                          className={`p-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${formData.isMemorizer ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
                        >
                          {isRtl ? "نعم، حافظ" : "Yes, Memorizer"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, isMemorizer: false }))}
                          className={`p-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${!formData.isMemorizer ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 border border-slate-800 text- slate-400'}`}
                        >
                          {isRtl ? "لا، لست حافظاً" : "No"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Scholarship Document requirement indicator */}
                  {formData.scholarshipType && formData.scholarshipType !== "none" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-sky-950/40 border border-sky-500/20 rounded-2xl flex items-start gap-3 text-slate-350"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-450 shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className={isRtl ? "text-right" : "text-left"}>
                        <h5 className="font-extrabold text-white text-xs">
                          {isRtl ? "📢 مستند إثبات المنحة مطلوب تلقائياً" : "📢 Scholarship Document Proof Required"}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          {isRtl 
                            ? `لقد تقدمت بطلب الحصول على (${
                                formData.scholarshipType === "merit" ? "منحة التميز الأكاديمي" :
                                formData.scholarshipType === "regional" ? "منحة الدعم الإقليمي" :
                                "معونة الضمان المالي"
                              }). لتأكيد استحقاق هذا الخصم، يرجى رفع المستند التالي في حقل الرفع بالأسفل أو تصويره بالكاميرا مباشرة:` 
                            : `You have requested a (${
                                formData.scholarshipType === "merit" ? "Academic Merit Scholarship [-30%]" :
                                formData.scholarshipType === "regional" ? "Regional Relief Support [-25%]" :
                                "Hardship Financial Fellowship [-40%]"
                              }). To claim this discount, you must upload or scan the following document proof:`
                          }
                        </p>
                        <p className="text-[11px] font-black text-amber-400 mt-1.5 underline">
                          {formData.scholarshipType === "merit" 
                            ? (isRtl ? "← كشف الدرجات أو شهادة التفوق (GPA >= 3.7) أو خطاب توصية أكاديمي" : "← Official past transcripts (GPA >= 3.7) or an academic recommendation letter")
                            : formData.scholarshipType === "regional"
                            ? (isRtl ? "← سند عنوان السكن، فاتورة مرافق رسمية، أو بطاقة الإقامة الإقليمية" : "← Verification of residency / regional government utilities statement")
                            : (isRtl ? "← كشف حساب، مستند الضمان الاجتماعي، أو ما يثبت الاحتياج المالي للأسرة" : "← Income statement, official family tax certificate, or written hardship statement proof")
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Real-time Document Camera Scanner integrated */}
                  <DocumentScanner 
                    currentLang={currentLang} 
                    onScanConfirm={(name, size, type) => {
                      setFormData(prev => ({
                        ...prev,
                        uploadedFiles: [...prev.uploadedFiles, { name, size, type }]
                      }));
                    }}
                  />

                  {/* File Upload drag and drop zone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                      {isRtl ? "رفع الأوراق الأكاديمية والثبوتية (الهوية الوطنية / جواز السفر + الشهادات السابقة) *" : "Upload Documents (Passport Identity + Past Degrees / Certificates) *"}
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-950/20 hover:border-slate-700'}`}
                      onClick={() => document.getElementById("admissions-file-input")?.click()}
                    >
                      <input
                        id="admissions-file-input"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      />
                      <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-300">{isRtl ? "اسحب وأسقط أوراقك بفرز هنا" : "Drag & Drop files or click to upload"}</p>
                      <p className="text-[10px] text-slate-550 mt-1">{isRtl ? "الملفات المدعومة: PDF, JPG, PNG, DOC (الحد الأقصى: 10 ميجا)" : "Formats: PDF, JPG, PNG, DOCX (Max 10MB)"}</p>
                    </div>

                    {errors.files && <p className="text-[10px] text-red-400 font-bold mt-1.5">{errors.files}</p>}

                    {/* Rendering uploaded file list */}
                    {formData.uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto bg-slate-950/30 p-3 rounded-xl border border-slate-850">
                        {formData.uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] text-slate-300 p-1.5 bg-slate-900 rounded-lg border border-slate-850">
                            <div className="flex items-center gap-1.5 overflow-hidden pr-2">
                              <FileText className="w-3.5 h-3.5 text-rose-450 flex-shrink-0" />
                              <span className="truncate font-bold text-slate-200">{file.name}</span>
                              <span className="text-[8px] text-slate-500">({file.size})</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-red-400 hover:text-red-500 font-bold p-1 bg-slate-950/50 rounded cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Anti-spam validation captcha */}
                  <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
                    <label className="block text-[11px] font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      🛡️ {isRtl ? "التحقق الأمني لمنع الروبوتات والسبام *" : "Anti-Spam Security Human Verification *"}
                    </label>
                    <div className={`flex items-center gap-3 justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="font-mono font-bold text-xs text-white bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center gap-1.5">
                        <span>{captchaValues.num1}</span>
                        <span>+</span>
                        <span>{captchaValues.num2}</span>
                        <span>=</span>
                        <span className="text-secondary">?</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={captchaAnswer}
                        onChange={e => setCaptchaAnswer(e.target.value)}
                        placeholder={isRtl ? "أدخل الناتج الرقمي" : "Sum answer"}
                        className={`w-32 bg-slate-950/45 border ${errors.captcha ? 'border-red-500/50' : 'border-slate-800 focus:border-primary'} px-3 py-2.5 rounded-xl text-xs text-center text-white focus:outline-none`}
                      />
                    </div>
                    {errors.captcha && <p className="text-[10px] text-red-500 font-bold mt-1.5">{errors.captcha}</p>}
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-5 bg-slate-800 hover:bg-slate-750 font-bold text-xs text-slate-300 rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{isRtl ? "رجوع" : "Back"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="py-3 px-6 bg-primary hover:bg-opacity-90 font-bold text-xs sm:text-sm text-white rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
                    >
                      <span>{isRtl ? "مراجعة وحساب الرسوم السنوية" : "Next: Review & Estimated Fees"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Estimated Tuition Assessment & Confirmation */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="bg-slate-950/30 p-4 border border-slate-850 rounded-2xl flex items-center gap-3">
                    <Calculator className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[10px] text-slate-450 uppercase font-bold">{isRtl ? "الخطوة الرابعة" : "Final Step"}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{isRtl ? "ملخص طلب التسجيل وتثبيت الرسوم" : "Registration Assessment Voucher Details"}</h4>
                    </div>
                  </div>

                  {/* Summary grid block */}
                  <div className={`grid grid-cols-2 gap-4 text-[11px] bg-slate-9500 border border-slate-850 p-4 rounded-2xl text-slate-300 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-slate-500 font-bold">{isRtl ? "اسم الباحث المتقدم:" : "Applicant Name:"}</p>
                      <p className="font-extrabold text-white text-xs mt-1 leading-snug">{formData.fullName}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-slate-500 font-bold">{isRtl ? "بيانات التواصل:" : "Email & WhatsApp:"}</p>
                      <p className="font-semibold text-slate-300 mt-1 font-mono leading-tight">{formData.email}</p>
                      <p className="font-mono text-slate-400 text-[10px] mt-0.5">{formData.phone}</p>
                    </div>

                    <div className="col-span-2 border-t border-slate-850/60 pt-3 mt-1">
                      <p className="text-slate-500 font-bold">{isRtl ? "قنوات الفرع المفتوحة بالانتساب:" : "Campus / Associated Specialty Target:"}</p>
                      <p className="font-extrabold text-emerald-400 mt-1 uppercase text-[10px] tracking-wider">{formData.degree} • {formData.country}</p>
                      <p className="font-semibold text-slate-200 text-xs mt-1" style={{ direction: isRtl ? "rtl" : "ltr" }}>
                        {COLLEGES_DATA[formData.collegeIdx][isRtl ? 'ar' : 'en']} — {COLLEGES_DATA[formData.collegeIdx].specialties[isRtl ? 'ar' : 'en'][formData.specialtyIdx]}
                      </p>
                    </div>
                  </div>

                  {/* Add-on optional services */}
                  <div className="p-4 bg-slate-950/20 border border-slate-850 rounded-2xl space-y-3">
                    <label className="block text-[11px] font-extrabold text-amber-400 uppercase tracking-wider">
                      🛎️ {isRtl ? "خيارات دراسية إضافية" : "Optional Campus Accessories"}
                    </label>
                    <div className="flex items-center justify-between gap-4 p-2 bg-slate-900/60 rounded-xl border border-slate-850/40">
                      <div className={`flex items-start gap-2 max-w-[80%] ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                        <input
                          id="opt-advisor"
                          type="checkbox"
                          checked={formData.extraPremiumAdvisor}
                          onChange={e => setFormData(p => ({ ...p, extraPremiumAdvisor: e.target.checked }))}
                          className="mt-1 accent-primary cursor-pointer w-4 h-4 shrink-0"
                        />
                        <label htmlFor="opt-advisor" className="text-[10px] sm:text-xs text-slate-350 cursor-pointer text-left select-none block">
                          <span className="font-extrabold text-white">{isRtl ? "تعيين مشرف تواصل وتوجيه دائم خاص" : "Assign Specialized Executive Advisor"}</span>
                          <span className="block text-[9px] text-slate-500 leading-normal mt-0.5">{isRtl ? "خدمة إرشادية متميزة لتوفير متابعة وتواصل دائم طوال الأسبوع مع مشرف أكاديمي خاص بملفك (+100 يورو)" : "Dedicating an academic admin to answer, format and evaluate your study plan 24/7 (+100 EUR)"}</span>
                        </label>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 shrink-0">+100 EUR</span>
                    </div>
                  </div>

                  {/* Live Tuition Fee Assessment Block VOUCHER */}
                  <div className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-emerald-500/20 rounded-3xl relative overflow-hidden text-slate-300">
                    <div className="absolute top-0 right-0 p-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-emerald-500/10">ESTIMATE</div>
                    
                    <h5 className={`font-bold text-[11px] uppercase tracking-wider text-slate-400 text-center sm:text-left ${isRtl ? 'sm:text-right' : 'sm:text-left'}`}>
                      🪙 {isRtl ? "مذكرة الرسوم الدراسية السنوية المقدرة" : "Tuition & Fellowship Fee Summary"}
                    </h5>
                    
                    <div className="space-y-2 mt-4 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{isRtl ? "الرسوم الأساسية للبرنامج:" : "Base annual degree program tuition:"}</span>
                        <span className="font-mono text-slate-200">{feeStatus.base} EUR</span>
                      </div>

                      {formData.isMemorizer && (
                        <div className="flex justify-between text-amber-500 font-bold">
                          <span>{isRtl ? "خصم حافظ القرآن الكريم الممنوح:" : "Noble Quran Fellowship Discount:"}</span>
                          <span className="font-mono">-{feeStatus.discount} EUR</span>
                        </div>
                      )}

                      {formData.scholarshipType && formData.scholarshipType !== "none" && (
                        <div className="flex justify-between text-sky-400 font-bold">
                          <span>
                            {formData.scholarshipType === "merit" 
                              ? (isRtl ? "خصم منحة التميز والامتياز (30%):" : "Academic Merit Scholarship [-30%]:")
                              : formData.scholarshipType === "regional"
                              ? (isRtl ? "خصم دعم الطلاب الإقليمي (25%):" : "Regional Student Relief [-25%]:")
                              : (isRtl ? "مساعدة المعونة وصندوق الطلاب (40%):" : "Hardship Financial Aid [-40%]:")
                            }
                          </span>
                          <span className="font-mono">-{feeStatus.scholarshipDiscount} EUR</span>
                        </div>
                      )}

                      {formData.extraPremiumAdvisor && (
                        <div className="flex justify-between text-slate-400">
                          <span>{isRtl ? "خدمة الإشراف والمتابعة المتبوعة:" : "Premium Advisor surcharge:"}</span>
                          <span className="font-mono">+{feeStatus.extras} EUR</span>
                        </div>
                      )}

                      <div className="border-t border-slate-800 my-2 pt-2 flex justify-between items-center">
                        <span className="font-extrabold text-white text-xs">{isRtl ? "إجمالي الرسوم السنوية المقررة للاستثمار الدراسي:" : "Total Net Assessed Tuition Contribution:"}</span>
                        <span className="font-mono font-black text-emerald-400 text-base sm:text-lg">
                          {feeStatus.total} EUR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Statement of interest brief notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                      {isRtl ? "رسالة الباحث أو معلومات أكاديمية إضافية (اختياري)" : "Statement of Purpose or previous experience (Optional)"}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                      rows={2}
                      placeholder={isRtl ? "اكتب باختصار أي أبحاث منشورة سابقاً أو كتب لمعادلتها..." : "Write briefly any previous publications, courses, or books for equivalence credits..."}
                      className="w-full bg-slate-950/35 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-slate-700"
                    />
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-3 px-5 bg-slate-800 hover:bg-slate-750 font-bold text-xs text-slate-300 rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{isRtl ? "رجوع" : "Back"}</span>
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-8 bg-emerald-500 hover:bg-emerald-600 font-bold text-xs sm:text-sm text-slate-950 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{isRtl ? "تأكيد وإرسال طلب التسجيل الرقمي" : "Finalize & Submit Registration Ticket"}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Success Ticket display */}
              {step === 5 && latestSubmittedApp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 py-6 text-center md:py-8"
                >
                  {/* Premium Animated Success Checkmark & Burst */}
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-4">
                    {/* Layer 1: Expanding concentric circles of energy */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: [1, 1.45, 1.75], opacity: [0.6, 0.25, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-4 rounded-full bg-emerald-500/10"
                    />
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: [1, 1.25, 1.45], opacity: [0.7, 0.35, 0] }}
                      transition={{ duration: 1.8, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-4 rounded-full bg-emerald-500/15"
                    />
                    
                    {/* Layer 2: Core Spinning Outer Orbital Ring */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                      className="absolute inset-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full border border-dashed border-emerald-500/40"
                      />
                    </motion.div>

                    {/* Layer 3: Main Core Glowing Shield Circle */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="relative w-16 h-16 bg-emerald-950/40 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 z-10"
                    >
                      {/* Animated checkmark path drawing */}
                      <svg 
                        className="w-8 h-8 text-emerald-400 stroke-current" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
                          d="M20 6L9 17l-5-5"
                        />
                      </svg>
                    </motion.div>

                    {/* Layer 4: Celebratory Spark particles emitted from center the moment the card renders */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 360) / 8;
                      const rad = (angle * Math.PI) / 180;
                      const distance = 46;
                      const tx = Math.cos(rad) * distance;
                      const ty = Math.sin(rad) * distance;
                      return (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                          animate={{ 
                            x: tx, 
                            y: ty, 
                            scale: [0, 1.2, 0.7, 0], 
                            opacity: [1, 1, 0.6, 0] 
                          }}
                          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                        />
                      );
                    })}
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {isRtl ? "🎉 تم تسجيل طلب القبول بنجاح واحتساب الرسوم!" : "🎉 Admission Submission Registered Successfully!"}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      {isRtl 
                        ? "تم حجز ملفك الدراسي المؤجل مؤقتاً برمز أمني مخصص للتدقيق اللمسي الفوري. يرجى حفظ هذا كود التتبع."
                        : "Your application is enrolled in our database queue with a tracking voucher token. Store this details carefully."}
                    </p>
                  </div>

                  {/* Interactive Ticket print layout */}
                  <div className="max-w-md mx-auto bg-slate-950/70 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-850 pb-3">
                      <span>{isRtl ? "استمارة قيد ذكي" : "Admissions Receipt Ticket"}</span>
                      <span className="font-mono font-bold text-emerald-450 uppercase">{latestSubmittedApp.id}</span>
                    </div>

                    <div className={`space-y-2 text-[11px] ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div>
                        <span className="text-slate-500">{isRtl ? "اسم الطالب المقيد:" : "Applicant legal name:"}</span>
                        <p className="font-bold text-white text-[12px]">{latestSubmittedApp.fullName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-850/60">
                        <div>
                          <span className="text-slate-500">{isRtl ? "الدرجة والبلد:" : "Degree / Country:"}</span>
                          <p className="font-bold text-slate-250 uppercase">{latestSubmittedApp.degree} • {latestSubmittedApp.country}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">{isRtl ? "رقم الهاتف والواتساب:" : "Registered Phone:"}</span>
                          <p className="font-bold text-slate-250 font-mono">{latestSubmittedApp.phone}</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-850/60 pt-2">
                        <span className="text-slate-500">{isRtl ? "الكلية والتخصص الأكاديمي المختار:" : "Chosen Department:"}</span>
                        <p className="font-bold text-slate-200 mt-0.5 leading-snug">{latestSubmittedApp.college} — {latestSubmittedApp.specialty}</p>
                      </div>

                      <div className="border-t border-slate-850/60 pt-2 flex justify-between items-center">
                        <div>
                          <span className="text-slate-500 text-[10px]">{isRtl ? "الرسوم السنوية التقديرية:" : "Annual assessed tuition Contribution:"}</span>
                          <p className="text-[9px] text-slate-450 italic leading-snug">
                            {latestSubmittedApp.isMemorizer && (isRtl ? "✓ حسم %20 لحفظة القرآن الكريم " : "✓ 20% Quran Memorizer Fellowship ")}
                            {latestSubmittedApp.scholarshipType && latestSubmittedApp.scholarshipType !== "none" && (
                              <span className="block mt-0.5 text-sky-400 font-bold">
                                {latestSubmittedApp.scholarshipType === "merit" 
                                  ? (isRtl ? "✓ منحة التفوق والامتياز (30% خصم)" : "✓ 30% Merit Scholarship assigned")
                                  : latestSubmittedApp.scholarshipType === "regional"
                                  ? (isRtl ? "✓ منحة الدعم الإقليمي (25% خصم)" : "✓ 25% Regional support assigned")
                                  : (isRtl ? "✓ معونة صندوق الطلاب (40% خصم)" : "✓ 40% Financial Aid assigned")
                                }
                              </span>
                            )}
                            {!latestSubmittedApp.isMemorizer && (!latestSubmittedApp.scholarshipType || latestSubmittedApp.scholarshipType === "none") && (isRtl ? "رسوم الاستثمار القياسية" : "Standard tuition fee")}
                          </p>
                        </div>
                        <span className="font-mono font-black text-emerald-400 text-sm sm:text-base">
                          {latestSubmittedApp.calcTotal} EUR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registrar Direct instructions */}
                  <div className="max-w-md mx-auto p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-[11px] text-slate-300 space-y-3">
                    <p className="leading-relaxed">
                      💡 {isRtl 
                        ? `طلبك الآن في حالة (${latestSubmittedApp.status}). لتسريع تفعيل حسابك الدراسي، يرجى النقر أدناه لإرسال كود التتبع مباشرة لمدير القبول لتدقيق مستنداتك وتفعيل البوابة على الفور.`
                        : `Your file is currently with state (${latestSubmittedApp.status}). To accelerate, click below to ping your document token directly to Europe admissions director via WhatsApp.`}
                    </p>

                    <div className="pt-1 flex flex-col sm:flex-row gap-2">
                      <a
                        href={`https://wa.me/393518530537?text=${encodeURIComponent(
                          isRtl 
                            ? `مرحباً دكتور، سجلت طلبي للتو برقم تتبع (${latestSubmittedApp.id}) وحالته حالياً (${latestSubmittedApp.status}) لدرجة (${latestSubmittedApp.degree}). أود تفعيل قيدي ونظام التعلم عن بعد.`
                            : `Hello director, I registered my study application with tracking ID (${latestSubmittedApp.id}) with state (${latestSubmittedApp.status}) for (${latestSubmittedApp.degree}).`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-grow py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 shadow-md shadow-green-500/10"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{isRtl ? "أرسل كود التتبع فوراً لواتساب" : "WhatsApp Director for Speed Acceptance"}</span>
                      </a>
                      
                      <button
                        onClick={resetForm}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-305 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 border border-slate-700 cursor-pointer"
                      >
                        {isRtl ? "تقديم طلب آخر" : "Submit Another Form"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
