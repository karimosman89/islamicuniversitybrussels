import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LogIn, 
  CreditCard, 
  CalendarDays, 
  Headset, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  X,
  Lock,
  Compass,
  ArrowUpRight,
  ExternalLink,
  DollarSign,
  Briefcase
} from "lucide-react";

interface QuickLinkItem {
  id: string;
  icon: React.ReactNode;
  label: Record<string, string>;
  description: Record<string, string>;
  actionType: "modal" | "link";
  targetUrl?: string;
  modalContentKey: "login" | "payment" | "exams" | "support";
}

const LOCALIZATION: Record<string, Record<string, string>> = {
  ar: {
    sidebarTitle: "الوصول السريع",
    sidebarDesc: "الخدمات الطلابية المباشرة",
    loginTitle: "بوابة الطالب الأكاديمية",
    loginDesc: "تسجيل الدخول للنظام الأساسي لمتابعة المحاضرات والدرجات وعقد الحلقات.",
    paymentTitle: "سداد الرسوم الدراسية الميسرة",
    paymentDesc: "قم بدفع قسطك الدراسي بشكل آمن وتحديث حالتك المالية ومراجعة كشوفات السداد.",
    examsTitle: "جدول الاختبارات والمحاضرات المباشرة",
    examsDesc: "مواعيد الاختبارات الفصلية والنهائية وبث قاعات الزووم والفرق للمواد.",
    supportTitle: "الدعم الفني والإداري الفوري",
    supportDesc: "هل لديك مشكلة تقنية؟ تواصل مع قسم القبول والتسجيل بفرع أوروبا مباشرة.",
    studentId: "اسم المستخدم / رقم الطالب",
    password: "كلمة المرور الخاصة بك",
    submitLogin: "الدخول الآمن للنظام",
    amountToPay: "قيمة الدفعة المراد سدادها",
    cardNumber: "رقم البطاقة الائتمانية",
    payNow: "إتمام عملية السداد الآمن",
    paymentSuccess: "تمت معالجة الدفعة التجريبية بنجاح وتحديث حالتك!",
    close: "إغلاق النافذة",
    examsInfo: "📌 لم تصدر بعد الجداول التفصيلية لاختبارات الفصل الجاري بمجلس الجامعة. سيتم بثها وتثبيتها هنا فور إقرارها.",
    supportPhone: "الخط الساخن المباشر لفرع أوروبا:",
    supportEmail: "البريد الإلكتروني للأمانة العامة:"
  },
  en: {
    sidebarTitle: "Quick Links",
    sidebarDesc: "Direct Student Portals",
    loginTitle: "Student Academic Portal",
    loginDesc: "Login to your personal LMS workspace to access records, transcript history, and lectures.",
    paymentTitle: "Secure Tuition Payments",
    paymentDesc: "Settle your custom installments securely, monitor tuition balances, and print ledger bills.",
    examsTitle: "Official Exam Schedules",
    examsDesc: "Timetables for upcoming midterm research reviews, final defense submissions, and live links.",
    studentId: "Student ID or Registered Email",
    password: "Secure LMS Password",
    submitLogin: "Secure Portal Authentication",
    amountToPay: "Installment Payment Amount ($ / €)",
    cardNumber: "Credit or Debit Card Number",
    payNow: "Authorize Secure Transaction",
    paymentSuccess: "Simulation Sandbox: Payment authorized and registered successfully!",
    close: "Dismiss Window",
    examsInfo: "📌 The European Branch Academic Board is finalizing the summer test timetables. Check back in 72 hours.",
    supportTitle: "Immediate Administrative Support",
    supportDesc: "Direct technical support, admissions counseling, and certificate approval lines.",
    supportPhone: "European Branch Direct Line:",
    supportEmail: "Admissions Secretariat Mail:"
  },
  it: {
    sidebarTitle: "Link Rapidi",
    sidebarDesc: "Servizi per gli Studenti",
    loginTitle: "Portale Accademico Studenti",
    loginDesc: "Accedi all'area riservata LMS per seguire le lezioni, verificare i voti e scaricare dispense.",
    paymentTitle: "Pagamento Tasse Scolastiche",
    paymentDesc: "Saldare le rate in modo sicuro e scaricare le fatture fiscali.",
    examsTitle: "Calendario degli Esami",
    examsDesc: "Orari delle prossime sessioni d'esame, prove intermedie e link per l'aula virtuale.",
    studentId: "ID Studente o E-mail registrata",
    password: "Password sicura",
    submitLogin: "Accedi al Portale",
    amountToPay: "Importo della rata (€)",
    cardNumber: "Numero Carta di Credito",
    payNow: "Autorizza Transazione",
    paymentSuccess: "Sandbox: Transazione simulata ed eseguita con successo!",
    close: "Chiudi Finestra",
    examsInfo: "📌 Il Consiglio di Facoltà sta completando il calendario esami estivo. Sarà disponibile a breve.",
    supportTitle: "Supporto Amministrativo",
    supportDesc: "Invia una richiesta direttamente alla segreteria docenti o al supporto tecnico.",
    supportPhone: "Linea Diretta Sede Europea:",
    supportEmail: "E-mail della Segreteria:"
  },
  fr: {
    sidebarTitle: "Raccourcis",
    sidebarDesc: "Espace Étudiant Direct",
    loginTitle: "Espace Numérique de Travail (ENT)",
    loginDesc: "Connectez-vous à votre espace personnel pour suivre les cours, consulter les notes et les relevés.",
    paymentTitle: "Règlement des Frais de Scolarité",
    paymentDesc: "Payez vos mensualités en toute sécurité et suivez l'état de votre compte.",
    examsTitle: "Calendrier des Examens",
    examsDesc: "Dates des prochaines évaluations, examens terminaux et soutenances.",
    studentId: "Identifiant ou E-mail académique",
    password: "Mot de passe d'accès",
    submitLogin: "Connexion Sécurisée",
    amountToPay: "Montant du Versement (€)",
    cardNumber: "Numéro de Carte Bancaire",
    payNow: "Autoriser le Paiement Sécurisé",
    paymentSuccess: "Simulation de paiement acceptée ! Votre compte a été mis à jour.",
    close: "Fermer l'Aperçu",
    examsInfo: "📌 Le Secrétariat général finalise actuellement le calendrier des examens. L'affichage se fera ici.",
    supportTitle: "Assistance administrative & technique",
    supportDesc: "Une question ou un blocage ? Contactez l'un de nos conseillers par mail ou téléphone.",
    supportPhone: "Ligne Directe Bureau Europe :",
    supportEmail: "Secrétariat des admissions :"
  }
};

export const StudentQuickLinks: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<"login" | "payment" | "exams" | "support" | null>(null);

  // Simulation states
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [paymentForm, setPaymentForm] = useState({ amount: "250", card: "", name: "" });
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  const ITEMS: QuickLinkItem[] = [
    {
      id: "portal-login",
      icon: <LogIn className="w-5 h-5 text-emerald-600" />,
      label: {
        ar: "بوابة الطالب",
        en: "Portal Login",
        it: "Portale Studente",
        fr: "Espace ENT"
      },
      description: {
        ar: "الدخول الآمن لنظام إدارة التعلم",
        en: "Secure academic LMS access",
        it: "Accedi alle lezioni online",
        fr: "Accéder à vos cours"
      },
      actionType: "modal",
      modalContentKey: "login"
    },
    {
      id: "tuition-payment",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      label: {
        ar: "سداد الأقساط",
        en: "Tuition Payment",
        it: "Pagamento Tasse",
        fr: "Règlement Scolarité"
      },
      description: {
        ar: "دفع آمن لرسوم الدراسة الميسرة",
        en: "Secure online payment gateway",
        it: "Paga le rate online",
        fr: "Paiement en ligne sécurisé"
      },
      actionType: "modal",
      modalContentKey: "payment"
    },
    {
      id: "exam-schedule",
      icon: <CalendarDays className="w-5 h-5 text-purple-600" />,
      label: {
        ar: "جدول الاختبارات",
        en: "Exam Schedule",
        it: "Calendario Esami",
        fr: "Dates des Examens"
      },
      description: {
        ar: "مواعيد وجداول اللجان والامتحانات",
        en: "Midterm & finals calendar list",
        it: "Date e orari degli appelli",
        fr: "Planning officiel des sessions"
      },
      actionType: "modal",
      modalContentKey: "exams"
    },
    {
      id: "contact-support",
      icon: <Headset className="w-5 h-5 text-amber-600" />,
      label: {
        ar: "الدعم والمساعدة",
        en: "Contact Support",
        it: "Contatta Supporto",
        fr: "Support Équipe"
      },
      description: {
        ar: "تواصل مباشر مع الأمانة والقبول",
        en: "Direct administrative assistance",
        it: "Supporto tecnico e segreteria",
        fr: "Contacter le secrétariat administratif"
      },
      actionType: "modal",
      modalContentKey: "support"
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.id.trim() && loginForm.password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentResult(null);
    setTimeout(() => {
      setPaymentResult(t.paymentSuccess);
    }, 1200);
  };

  const resetAllSimulations = () => {
    setLoginForm({ id: "", password: "" });
    setIsLoggedIn(false);
    setPaymentForm({ amount: "250", card: "", name: "" });
    setPaymentResult(null);
  };

  return (
    <>
      {/* Sidebar container pinned to right of viewport */}
      <div 
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[70] hidden sm:flex flex-col items-end`}
        style={{ direction: "ltr" }} // Force predictable layout coordinates
      >
        <div className="flex items-center">
          {/* Collapse toggle tab handle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-slate-900 text-white p-2.5 rounded-l-2xl shadow-xl border-l border-y border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer select-none group"
            title={t.sidebarTitle}
          >
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-1.5 py-1">
                <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:scale-125 transition-transform" />
                <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-widest text-[#94a3b8] group-hover:text-white">
                  {t.sidebarTitle}
                </span>
              </div>
            ) : (
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Quick-links tray menu floating structure */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-slate-900 border-l border-slate-800 text-white w-72 rounded-l-3xl p-5 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Decorative border layout accent */}
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>

                <div className="border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{t.sidebarTitle}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{t.sidebarDesc}</p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        resetAllSimulations();
                        setActiveModal(item.modalContentKey);
                      }}
                      className="w-full text-left bg-slate-800/60 hover:bg-slate-800 p-3 rounded-2xl border border-slate-700/50 hover:border-emerald-500/20 transition-all duration-300 flex items-center gap-3.5 group cursor-pointer"
                    >
                      <span className="p-2.5 bg-slate-900 rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-black block text-gray-100 group-hover:text-emerald-400 transition-colors leading-tight">
                          {item.label[currentLang] || item.label["en"]}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold block truncate mt-0.5">
                          {item.description[currentLang] || item.description["en"]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Action Button for smaller screens (mobile action sheet overlay trigger) */}
      <div className="fixed bottom-24 right-4 sm:hidden z-50">
        <button
          onClick={() => {
            setIsCollapsed(false);
            // Fallback: trigger first option when clicked on mobile by showing a bottom sheet overlay or small menu
            setActiveModal(null);
            setIsCollapsed(!isCollapsed);
          }}
          className="bg-slate-900 text-white p-3.5 rounded-full shadow-2xl border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </button>
      </div>

      {/* Mobile-oriented Bottom Action sheet when menu triggers */}
      <AnimatePresence>
        {!isCollapsed && (
          <div className="sm:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-[80] flex items-end justify-center p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-slate-900 border-t border-slate-800 rounded-t-[2.5rem] w-full p-6 text-white space-y-5"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{t.sidebarTitle}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{t.sidebarDesc}</p>
                </div>
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-4">
                {ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      resetAllSimulations();
                      setActiveModal(item.modalContentKey);
                      setIsCollapsed(true);
                    }}
                    className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
                  >
                    <span className="p-2.5 bg-slate-900 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-black block text-gray-100 group-hover:text-emerald-400 leading-tight">
                      {item.label[currentLang] || item.label["en"]}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive simulation modals for the quick links */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]"
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 max-w-md w-full relative space-y-6 shadow-2xl"
            >
              {/* Modal header details */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-150">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-950 leading-tight">
                    {t[`${activeModal}Title` as keyof typeof t] || activeModal}
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-xs font-semibold mt-1">
                    {t[`${activeModal}Desc` as keyof typeof t] || ""}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-150 text-gray-400 hover:text-gray-700 transition cursor-pointer font-black"
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Modal Content Renderer based on Key */}

              {/* Portal Login Simulation */}
              {activeModal === "login" && (
                <div className="space-y-4">
                  {isLoggedIn ? (
                    <div className="text-center p-6 bg-emerald-50 border border-emerald-150 rounded-2xl space-y-3">
                      <div className="w-12 h-12 bg-emerald-100/80 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-sm font-black">✓</div>
                      <h4 className="text-sm font-extrabold text-emerald-900">
                        {currentLang === 'ar' ? 'أهلاً بك بكابينة التعلم الإدارية!' : 'Welcome back to clean portal!'}
                      </h4>
                      <p className="text-gray-500 text-xs font-semibold">
                        {currentLang === 'ar' ? 'جاري توجيهك بأمان إلى خادم غرف بروكسل...' : 'Sandbox status: Authenticated (IUB-2026).'}
                      </p>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="mt-4 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl"
                      >
                        {currentLang === 'ar' ? 'تسجيل الخروج' : 'Logout student'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide block mb-1.5">{t.studentId}</label>
                        <input
                          type="text"
                          required
                          value={loginForm.id}
                          onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                          placeholder="e.g. ID-85324 or student@iub.edu"
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide block mb-1.5">{t.password}</label>
                        <input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="••••••••••••••"
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-black text-xs py-3.5 rounded-xl hover:bg-slate-800 transition cursor-pointer select-none"
                      >
                        {t.submitLogin}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Tuition Payment Simulation */}
              {activeModal === "payment" && (
                <div className="space-y-4">
                  {paymentResult ? (
                    <div className="text-center p-6 bg-blue-50 border border-blue-150 rounded-2xl space-y-3">
                      <div className="w-12 h-12 bg-blue-100/80 text-blue-600 rounded-full flex items-center justify-center mx-auto text-sm font-black">✓</div>
                      <h4 className="text-sm font-extrabold text-blue-900">
                        {currentLang === 'ar' ? 'السداد آمن ومكتمل' : 'Payment Cleared!'}
                      </h4>
                      <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                        {paymentResult}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold">
                        TXN REF: IUB-PAY-{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide block mb-1.5">{t.amountToPay}</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            value={paymentForm.amount}
                            onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 pl-10 text-gray-900 font-extrabold focus:outline-none focus:border-blue-500"
                          />
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 font-black text-xs">€</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide block mb-1.5">{t.cardNumber}</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            placeholder="4000 1234 5678 9010"
                            value={paymentForm.card}
                            onChange={(e) => setPaymentForm({ ...paymentForm, card: e.target.value })}
                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-semibold focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                      >
                        {t.payNow}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Official Exam timetables */}
              {activeModal === "exams" && (
                <div className="space-y-4 text-start bg-slate-50 border border-gray-150 p-5 rounded-2xl">
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    {t.examsInfo}
                  </p>
                  
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-400 font-bold">
                    <span>LATEST UPDATE</span>
                    <span className="text-indigo-600">JUNE 2026 BULLETIN</span>
                  </div>
                </div>
              )}

              {/* Administrative secretariat Support contact numbers */}
              {activeModal === "support" && (
                <div className="space-y-4 text-start font-sans">
                  <div className="bg-gray-50 border border-gray-150 p-4.5 rounded-2xl space-y-3.5 text-xs font-semibold text-gray-600">
                    <div>
                      <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{t.supportPhone}</p>
                      <p className="text-gray-900 font-extrabold text-xs sm:text-sm mt-0.5" dir="ltr">+39 351 853 0537</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{t.supportEmail}</p>
                      <p className="text-gray-900 font-extrabold text-xs mt-0.5" dir="ltr">info@iub-europe.be</p>
                    </div>
                  </div>

                  <a 
                    href="https://wa.me/393518530537" 
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-emerald-600 text-white hover:bg-emerald-700 font-black text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    <span>{currentLang === 'ar' ? 'تواصل معنا مباشرة' : 'Direct Support WhatsApp Line'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Universal Dismiss window footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="bg-gray-50 text-gray-700 hover:bg-gray-100 font-black text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                >
                  {t.close}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
