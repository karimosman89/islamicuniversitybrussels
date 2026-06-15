import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Award, 
  HelpCircle, 
  ArrowUpRight, 
  FileDown, 
  Download,
  AlertCircle,
  TrendingUp,
  Sliders,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";

interface TrackedRecord {
  id: string;
  fullName: string;
  degree: string;
  college: string;
  specialty: string;
  status: "Pending Check" | "Under Review" | "Conditionally Approved" | "Fully Accepted";
  submittedAt: string;
  country: string;
  isMemorizer: boolean;
  calcTotal?: number | string;
}

// Pre-configured static demo records to give instant feedback out-of-the-box
const DEMO_RECORDS: Record<string, TrackedRecord> = {
  "IUB-DEMO-2026": {
    id: "IUB-DEMO-2026",
    fullName: "Dr. Ahmed Salim Al-Masri",
    degree: "Ph.D. (Doctorate)",
    college: "Faculty of Islamic Studies",
    specialty: "Principles of Jurisprudence (Usool ul-Fiqh)",
    status: "Fully Accepted",
    submittedAt: "2026-06-01",
    country: "Germany",
    isMemorizer: true,
    calcTotal: "1,260 EUR"
  },
  "IUB-REVIEW-2026": {
    id: "IUB-REVIEW-2026",
    fullName: "Fatima Zehra Al-Hassan",
    degree: "Master's Degree",
    college: "Faculty of Arabic Language & Literature",
    specialty: "Arabic Linguistics & Grammatical Research",
    status: "Under Review",
    submittedAt: "2026-06-11",
    country: "France",
    isMemorizer: false,
    calcTotal: "1,200 EUR"
  },
  "IUB-PENDING-2026": {
    id: "IUB-PENDING-2026",
    fullName: "Omar Abdelaziz Farooq",
    degree: "Bachelor's Degree (Licence)",
    college: "Faculty of Sharia & Theology",
    specialty: "Islamic Law & Comparative Fiqh",
    status: "Pending Check",
    submittedAt: "2026-06-14",
    country: "Italy",
    isMemorizer: true,
    calcTotal: "800 EUR"
  },
  "IUB-APPROVED-2026": {
    id: "IUB-APPROVED-2026",
    fullName: "Imran Yusuf Shah",
    degree: "Master's Degree",
    college: "Faculty of Islamic Economics",
    specialty: "Islamic Banking, Finance & Awqaf Systems",
    status: "Conditionally Approved",
    submittedAt: "2026-06-05",
    country: "United Kingdom",
    isMemorizer: false,
    calcTotal: "1,200 EUR"
  }
};

const LOCALIZATION: Record<string, Record<string, string>> = {
  ar: {
    btnTrigger: "تتبع حالة القبول ⚡",
    modalTitle: "منصة استعلام وتتبع حالات الانتساب",
    modalSub: "أدخل كود المعاملة أو رقم طلب الانتساب للاستعلام الفوري عن مراحل مراجعة الأوراق، ومجلس الكلية.",
    inputPlaceholder: "مثال: IUB-2026-XXXX",
    searchBtn: "تتبع حالة الطلب",
    recommendationLabel: "البوابات التجريبية السريعة والرموز المتاحة:",
    demoAlert: "💡 انقر على أي كود تجريبي بالأسفل لتعبئة النموذج وتجربته فوراً:",
    notFound: "⚠️ تعذر العثور على هذا الرمز بالخادم. يرجى التأكد من الرمز أو تقديم طلب انتساب جديد ومراجعته لاحقاً.",
    fieldFullName: "اسم الطالب الكامل المقيد",
    fieldDegree: "الدرجة العلمية المطلوبة",
    fieldSub: "تاريخ وبوابة التقديم",
    fieldCollege: "الكلية والتخصص الأكاديمي",
    step1Title: "استلام وتدقيق الملف الأولي",
    step1Desc: "استلام الرسوم الاستمارية ومطابقة صور وثائق الهوية وجواز السفر عبر الماسح.",
    step2Title: "مراجعة لجنة فحص المؤهلات العلمي",
    step2Desc: "التحقق من صحة شهادة البكالوريوس أو الثانوية العامة ومعادلتها مع المعايير البلجيكية.",
    step3Title: "موافقة عميد كلية الدراسات العليا الإقليمية",
    step3Desc: "عرض الأوراق والكتب المنشورة والاتفاق على المشرف الأكاديمي الأولي لرسالتك.",
    step4Title: "إصدار قرار القبول النهائي ودفوعات القسط",
    step4Desc: "تحضير رمز الطالب الجامعي وصلاحيات الدخول لمنصة الفصول الافتراضية والامتحانات.",
    downloadTitle: "تنزيل خطاب القبول التجريبي (صيغة PDF)",
    downloadBtn: "طلب إرسال الخطاب الموثق",
    downloadSuccess: "✓ تم توليد ملف مستند القول بنجاح وتنزيله بجهازك!",
    statusPending: "قيد التدقيق الأولي",
    statusReview: "تحت أنظار اللجنة العلمية",
    statusConditional: "مقبول مبدئياً ومؤهل للقسط",
    statusFully: "مقبول بالكامل ومقيد بالجامعة",
    contactAdmissions: "المتابعة مع شؤون الطلاب (واتساب)"
  },
  en: {
    btnTrigger: "Track Application Status ⚡",
    modalTitle: "Live Admission Progress Tracker",
    modalSub: "Enter your unique application voucher token (IUB-XXXX) to inquire from the Council of Graduate Studies.",
    inputPlaceholder: "e.g. IUB-DEMO-2026",
    searchBtn: "Inquire Profile Status",
    recommendationLabel: "Speedy Simulation Voucher Codes:",
    demoAlert: "💡 Click any pre-approved demo ID below to load simulated tracker state:",
    notFound: "Could not find any registration matching this token key in local states database. Try writing standard demos.",
    fieldFullName: "Student Registrant Name",
    fieldDegree: "Intended Academic Degree",
    fieldSub: "Filing Registry Date",
    fieldCollege: "Assigned College & Major Office",
    step1Title: "Initial Evaluation & Document Audit",
    step1Desc: "Reception of basic bio pages, photos, and high-DPI document camera scanning metrics.",
    step2Title: "Scientific Certification Committee Review",
    step2Desc: "Verifying prior high school diploma or university transcript equivalence with Belgian regulations.",
    step3Title: "Regional Dean Council Approval",
    step3Desc: "Proposal of academic advisor board members & confirming book/thesis research credits.",
    step4Title: "Final Acceptance Letter & LMS Credentials",
    step4Desc: "Generating secure matriculation student number, billing setup, and live lectures log portal.",
    downloadTitle: "Download Official Sandbox Admission Statement",
    downloadBtn: "Download Signed Draft PDF",
    downloadSuccess: "✓ Successfully simulated, drafted, and downloaded the Admission Order!",
    statusPending: "Pending Initial Audit",
    statusReview: "Committee Review Stage",
    statusConditional: "Conditionally Accepted",
    statusFully: "Fully Accepted & Matriculated",
    contactAdmissions: "Chat with Academic Registrar Office"
  }
};

export const AdmissionStatusTrackerModal: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchId, setSearchId] = useState<string>("");
  const [matchedRecord, setMatchedRecord] = useState<TrackedRecord | null>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadMsg, setDownloadMsg] = useState<string>("");

  // Logic to search database combining localStorage and hardcoded mocks
  const handlePerformTrack = (targetId: string) => {
    const cleanId = targetId.trim().toUpperCase();
    if (!cleanId) return;

    // 1. Check local storage
    let localRecord: TrackedRecord | null = null;
    try {
      const stored = localStorage.getItem("iub_admission_submissions");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const match = parsed.find((item: any) => item.id?.toUpperCase() === cleanId);
          if (match) {
            localRecord = {
              id: match.id,
              fullName: match.fullName || "Registered Student",
              degree: match.degree || "Bachelor's Degree",
              college: match.college || "School of Theology",
              specialty: match.specialty || "Comparative Islamic Law",
              status: match.status || "Pending Check",
              submittedAt: match.submittedAt || new Date().toISOString().split("T")[0],
              country: match.country || "Belgium",
              isMemorizer: !!match.isMemorizer,
              calcTotal: match.calcTotal ? `${match.calcTotal} EUR` : "Variable"
            };
          }
        }
      }
    } catch (e) {
      console.warn("Could not read local tracker list", e);
    }

    // 2. Check mock dictionary fallback
    const mockRecord = DEMO_RECORDS[cleanId];
    
    const finalFound = localRecord || mockRecord || null;
    setMatchedRecord(finalFound);
    setSearched(true);
  };

  const handleQuickDemoClick = (code: string) => {
    setSearchId(code);
    handlePerformTrack(code);
  };

  // Helper status styling
  const getStatusColorDetails = (status: TrackedRecord["status"]) => {
    switch (status) {
      case "Pending Check":
        return { bg: "bg-amber-500/10 text-amber-500 border-amber-500/25", label: t.statusPending, step: 1 };
      case "Under Review":
        return { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: t.statusReview, step: 2 };
      case "Conditionally Approved":
        return { bg: "bg-indigo-500/10 text-indigo-455 border-indigo-500/20", label: t.statusConditional, step: 3 };
      case "Fully Accepted":
        return { bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: t.statusFully, step: 4 };
      default:
        return { bg: "bg-slate-500/10 text-slate-400 border-slate-500/20", label: "Pending", step: 1 };
    }
  };

  // Simulated PDF Downloader
  const handleDownloadAdmissionLetter = () => {
    if (!matchedRecord) return;
    setIsDownloading(true);
    setDownloadMsg("");

    setTimeout(() => {
      setIsDownloading(false);
      setDownloadMsg(t.downloadSuccess);

      // Create a virtual text file download representing the certified academic approval
      const virtualContent = `
========================================================================
             ISLAMIC UNIVERSITY OF BRUSSELS - EUROPEAN DEPUTATION
             الجامعة الإسلامية بروكسل - عمادة القبول والتسجيل بفرع أوروبا
========================================================================
OFFICIAL CONDITIONAL EVALUATION CONDICIL CERTIFYING SELECTION DECISION

APPLICATION TRANSACTION ID: ${matchedRecord.id}
REGISTRATION DATE: ${matchedRecord.submittedAt}
REGISTRANT FULL NAME: ${matchedRecord.fullName}
DEGREE TARGET: ${matchedRecord.degree}
MAPPED DEPARTMENT: ${matchedRecord.college}
STUDENT PRIMARY MAJOR: ${matchedRecord.specialty}
EVALUATION LEVEL AUDIT: ${matchedRecord.status}
ESTIMATED TOTAL SCHOLAR TUITION FEES: ${matchedRecord.calcTotal || "Standard Scale Tier"}

Brussels Education Office verification code signature: MD5-${Math.floor(100000 + Math.random() * 900000)}
Signed by Brussels Executive Office registrar: IUB-COUNCIL-BRU-2026.
========================================================================
      `;
      const blob = new Blob([virtualContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `IUB_Acceptance_${matchedRecord.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => setDownloadMsg(""), 3000);
    }, 1500);
  };

  return (
    <>
      {/* Sleek launcher button next to active registration form headers */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setSearched(false);
          setMatchedRecord(null);
          setSearchId("");
        }}
        className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-extrabold text-[#ffffff] text-xs sm:text-[13px] border border-emerald-500/10 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 select-none"
      >
        <TrendingUp className="w-4 h-4 text-emerald-400 rotate-90" />
        <span>{t.btnTrigger}</span>
      </button>

      {/* Floating Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 z-[99999]"
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 max-w-2xl w-full text-white relative space-y-6 overflow-y-auto max-h-[92vh] shadow-2xl"
            >
              
              {/* Header Close Panel */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-800">
                <div className={isRtl ? "text-right" : "text-left"}>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>{t.modalTitle}</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-1.5 leading-relaxed">
                    {t.modalSub}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Action Search Module */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformTrack(searchId);
                }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      required
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder={t.inputPlaceholder}
                      className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl py-3.5 pl-5 pr-5 font-mono tracking-widest text-[#edf2f7] focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-bold uppercase text-center"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs transition cursor-pointer flex justify-center items-center gap-2 flex-shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.searchBtn}</span>
                  </button>
                </div>

                {/* Preconfigured Sandbox Demos */}
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl space-y-2.5">
                  <p className={`text-[10px] text-slate-450 font-extrabold uppercase tracking-wider block ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.demoAlert}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(DEMO_RECORDS).map((code) => {
                      const record = DEMO_RECORDS[code];
                      const matchedStatus = getStatusColorDetails(record.status);
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleQuickDemoClick(code)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-300 font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span className="font-mono tracking-wider">{code}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-emerald-400 font-extrabold text-[9px]">{matchedStatus.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>

              {/* Dynamic Search Results Container */}
              <AnimatePresence mode="wait">
                {searched && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 pt-3"
                  >
                    {matchedRecord ? (
                      <div className="space-y-6">
                        
                        {/* 1. Header Student Bio Summary */}
                        <div className="p-5 sm:p-6 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
                          
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest">{t.fieldFullName}</p>
                            <h4 className="text-sm sm:text-base font-black text-white mt-1">{matchedRecord.fullName}</h4>
                            
                            <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-[10px] text-slate-400 font-bold">
                              <span>🌍 {matchedRecord.country}</span>
                              <span>•</span>
                              <span>{t.fieldSub}: {matchedRecord.submittedAt}</span>
                            </div>
                          </div>

                          <div className={`flex flex-col items-start sm:items-end gap-1.5`}>
                            <span className="text-[9px] text-[#94a3b8] font-black uppercase tracking-wider">{matchedRecord.id}</span>
                            <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusColorDetails(matchedRecord.status).bg}`}>
                              {getStatusColorDetails(matchedRecord.status).label}
                            </span>
                          </div>
                        </div>

                        {/* 2. College & Major details card */}
                        <div className={`p-4 bg-slate-850/40 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <div>
                            <span className="text-[9px] text-slate-450 font-black block uppercase tracking-wider">{t.fieldDegree}</span>
                            <span className="text-xs font-black text-white mt-1 block">{matchedRecord.degree}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-450 font-black block uppercase tracking-wider">{t.fieldCollege}</span>
                            <span className="text-xs font-black text-white mt-1 block leading-relaxed">
                              {matchedRecord.college} — <span className="text-emerald-450">{matchedRecord.specialty}</span>
                            </span>
                          </div>
                        </div>

                        {/* 3. The 4-Step Interactive Admissions Timeline */}
                        <div className="space-y-4">
                          <h5 className={`text-xs font-black text-slate-350 flex items-center gap-1.5 uppercase tracking-wide border-b border-slate-850 pb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <Layers className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isRtl ? "مراحل تطور حالة الملف والانتساب" : "Academic Review Timeline Stages"}</span>
                          </h5>

                          <div className="relative pl-3 pr-3 space-y-5" style={{ direction: "ltr" }}>
                            {/* vertical timeline connecting pipeline line */}
                            <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-800"></div>

                            {[
                              { stepNum: 1, key: "step1" },
                              { stepNum: 2, key: "step2" },
                              { stepNum: 3, key: "step3" },
                              { stepNum: 4, key: "step4" }
                            ].map(({ stepNum, key }) => {
                              const activeStepLevel = getStatusColorDetails(matchedRecord.status).step;
                              const isCompleted = activeStepLevel >= stepNum;
                              const isCurrent = activeStepLevel === stepNum;
                              
                              return (
                                <div key={stepNum} className="flex items-start gap-4 relative">
                                  {/* Timeline marker icon node */}
                                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border z-10 flex-shrink-0 transition-all ${
                                    isCompleted 
                                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20' 
                                      : isCurrent 
                                        ? 'bg-slate-900 border-indigo-400 text-indigo-400 animate-pulse' 
                                        : 'bg-slate-950 border-slate-800 text-slate-600'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-4.5 h-4.5" />
                                    ) : isCurrent ? (
                                      <Clock className="w-4.5 h-4.5" />
                                    ) : (
                                      <span className="text-[11px] font-black">{stepNum}</span>
                                    )}
                                  </div>

                                  {/* Timeline text content container */}
                                  <div className="text-left flex-1 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-850/80">
                                    <h6 className={`text-xs font-black leading-tight ${isCompleted ? 'text-white' : isCurrent ? 'text-indigo-400' : 'text-slate-500'}`}>
                                      {t[`${key}Title` as keyof typeof t]}
                                    </h6>
                                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-semibold">
                                      {t[`${key}Desc` as keyof typeof t]}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Action downloads & WhatsApp connection integration */}
                        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <h6 className="text-[11px] font-bold text-white uppercase">{t.downloadTitle}</h6>
                            <p className="text-[9px] text-slate-400 mt-0.5">{isRtl ? "احصل على نسخة موثقة وموقعة من سجلات بروكسل كـ Draft." : "Generate virtual document to test accreditation validation."}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={handleDownloadAdmissionLetter}
                              disabled={isDownloading}
                              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black tracking-wide border border-slate-705 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                            >
                              {isDownloading ? (
                                <span className="animate-spin border-1 border-t-transparent border-white rounded-full w-3 h-3 block"></span>
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                              <span>{t.downloadBtn}</span>
                            </button>

                            <a 
                              href={`https://wa.me/393518530537?text=ApplicationID:%20${matchedRecord.id}`} 
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                            >
                              <span>{t.contactAdmissions}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {downloadMsg && (
                          <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold text-center rounded-xl animate-bounce">
                            {downloadMsg}
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="text-center p-8 bg-slate-950 border border-slate-850 rounded-3xl space-y-3">
                        <div className="w-11 h-11 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto">
                          <AlertCircle className="w-5.5 h-5.5" />
                        </div>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-bold">
                          {t.notFound}
                        </p>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dismiss controls option */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 bg-slate-805 hover:bg-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold border border-slate-800 cursor-pointer"
                >
                  {isRtl ? "إغلاق النافذة" : "Close Portal"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
