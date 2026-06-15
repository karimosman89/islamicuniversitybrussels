import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  BookOpen, 
  DollarSign, 
  FileCheck, 
  Phone, 
  HelpCircle,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface UniversityChatbotProps {
  currentLang: string;
}

const CHAT_TRANSLATIONS: Record<string, {
  headerTitle: string;
  headerSub: string;
  placeholder: string;
  welcomeMsg: string;
  quickColleges: string;
  quickTuition: string;
  quickAdmission: string;
  quickContact: string;
  typingText: string;
  directWaPrompt: string;
}> = {
  ar: {
    headerTitle: "المستشار الأكاديمي الذكي",
    headerSub: "الجامعة الإسلامية بروكسل",
    placeholder: "اكتب استفسارك هنا عن الكليات أو الرسوم...",
    welcomeMsg: "مرحباً بك في المساعد الذكي الرسمي للجامعة الإسلامية بروكسل (فرع أوروبا)! 🎓 يمكنني مساعدتك فوراً بمعلومات الكليات، الرسوم السنوية، شروط التسجيل، أو أرقام التواصل مع المدير العام.",
    quickColleges: "🏛️ الكليات والتخصصات",
    quickTuition: "💰 الرسوم والمنح",
    quickAdmission: "📝 مستندات وشروط التقديم",
    quickContact: "📞 التواصل مع الإدارة",
    typingText: "المستشار الأكاديمي يكتب الآن...",
    directWaPrompt: "اتصل بنا هاتفياً عبر الواتساب"
  },
  en: {
    headerTitle: "Smart Academic AI Advisor",
    headerSub: "Islamic University of Brussels",
    placeholder: "Type your query about colleges, tuition, duration...",
    welcomeMsg: "Welcome to the official AI Advisor of the Islamic University of Brussels (Europe)! 🎓 I can help you with degree information, annual fees, admissions criteria, and direct WhatsApp contact channels.",
    quickColleges: "🏛️ Colleges & Specialties",
    quickTuition: "💰 Fees & Scholarships",
    quickAdmission: "📝 Admission Requirements",
    quickContact: "📞 Admin Contacts",
    typingText: "Academic Advisor is typing...",
    directWaPrompt: "Chat on WhatsApp Support"
  },
  it: {
    headerTitle: "Consulente Accademico IA",
    headerSub: "Università Islamica di Bruxelles",
    placeholder: "Scrivi qui la tua domanda...",
    welcomeMsg: "Benvenuto nella chat del Consulente Accademico ufficiale dell'Università Islamica di Bruxelles (Sede Europea)! 🎓 Posso aiutarti con info su corsi, tasse, requisiti e contatti WhatsApp.",
    quickColleges: "🏛️ Facoltà e Corsi",
    quickTuition: "💰 Tasse e Agevolazioni",
    quickAdmission: "📝 Requisiti Ammissione",
    quickContact: "📞 Contatti Diretti",
    typingText: "Il consulente IA sta scrivendo...",
    directWaPrompt: "Contattaci su WhatsApp"
  },
  fr: {
    headerTitle: "Conseiller Académique IA",
    headerSub: "Université Islamique de Bruxelles",
    placeholder: "Écrivez votre question ici...",
    welcomeMsg: "Bienvenue sur le chat du Conseiller Académique de l'Université Islamique de Bruxelles (Europe)! 🎓 Je peux vous aider sur les facultés, bourses, frais d'études et de contact direct.",
    quickColleges: "🏛️ Facultés et Spécialités",
    quickTuition: "💰 Frais et Réductions",
    quickAdmission: "📝 Pièces à Fournir",
    quickContact: "📞 Contacts de Management",
    typingText: "Le conseiller écrit...",
    directWaPrompt: "Contact direct via WhatsApp"
  },
  de: {
    headerTitle: "Akademischer KI-Berater",
    headerSub: "Islamische Universität Brüssel",
    placeholder: "Geben Sie Ihre Frage hier ein...",
    welcomeMsg: "Willkommen beim offiziellen KI-Berater der Islamischen Universität Brüssel (Europäische Vertretung)! 🎓 Ich helfe Ihnen bei Fragen zu Studiengängen, Gebühren und Bewerbung.",
    quickColleges: "🏛️ Fakultäten & Programme",
    quickTuition: "💰 Studiengebühren & Rabatte",
    quickAdmission: "📝 Bewerbungsunterlagen",
    quickContact: "📞 Direkter Kontakt",
    typingText: "Berater schreibt...",
    directWaPrompt: "Kontakt via WhatsApp"
  }
};

export default function UniversityChatbot({ currentLang }: UniversityChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const tChat = CHAT_TRANSLATIONS[currentLang] || CHAT_TRANSLATIONS.ar;
  const isRtl = currentLang === "ar";

  // Load chat history or set welcome message on mount
  useEffect(() => {
    const saved = localStorage.getItem("university_chat_messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        initWelcomeMessage();
      }
    } else {
      initWelcomeMessage();
    }
  }, [currentLang]);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("university_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Handle welcome message initialization
  const initWelcomeMessage = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: tChat.welcomeMsg,
        timestamp: new Date()
      }
    ]);
  };

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const chatHistory = messages
        .filter(m => m.id !== "welcome")
        .slice(-10) // Send last 10 messages for context
        .map(m => ({
          sender: m.sender,
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          language: currentLang,
          history: chatHistory
        })
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      
      // Artificial delay for organic user experience
      setTimeout(() => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 700);

    } catch (err) {
      console.warn("Fell back to immediate local lookup due to API absence during build:", err);
      // Clean keyword fallback immediately on client side as double insurance
      setTimeout(() => {
        let fallbackText = "I apologize, our admissions engine is preparing details. Please ask about 'colleges', 'fees', 'requirements', or contact our deanship via WhatsApp.";
        const lowText = textToSend.toLowerCase();
        if (currentLang === "ar") {
          fallbackText = "عذراً، المستشار متصل محلياً حالياً. يمكنك الاستفسار عن 'الكليات'، 'الرسوم والأقساط'، أو 'مستندات القبول'، أو مراسلتنا فوراً للواتساب للتيسيرات الأكاديمية.";
          if (lowText.includes("كلية") || lowText.includes("كليات") || lowText.includes("تخصص")) {
            fallbackText = "🏛️ الكليات المتاحة:\n- الشريعة والقانون والدراسات الإسلامية واللغة العربية.\n- إدارة الأعمال والمصارف الإسلامية والعلوم السياسية.\n- علم النفس والتربية والإعلام والتاريخ والخدمة الاجتماعية.\n- القانون الدولي والتحكيم والدراسات القانونية.";
          } else if (lowText.includes("رسوم") || lowText.includes("أقساط") || lowText.includes("سعر") || lowText.includes("تكلفة")) {
            fallbackText = "💰 الأقساط السنوية الأساسية بفرع أوروبا:\n- البكالوريوس: 1000$ سنوياً\n- الماجستير: 1200$ سنوياً (منحة حتى 20%)\n- الدكتوراه: 1400$ سنوياً\n✨ متاح تقسيط السداد بدفعات ميسرة.";
          }
        }
        
        const botMsg: Message = {
          id: `bot-fallback-${Date.now()}`,
          sender: "bot",
          text: fallbackText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem("university_chat_messages");
    initWelcomeMessage();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="chatbot-floating-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-white p-4 sm:p-4.5 rounded-full shadow-2xl hover:scale-105 cursor-pointer transition-all duration-300 flex items-center justify-center border-2 border-amber-400"
        aria-label="Toggle Academic Advisor Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-pulse" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[520px] sm:h-[580px] bg-white rounded-3xl shadow-2xl border border-gray-150 flex flex-col z-50 overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-900 text-white p-4 flex items-center justify-between border-b border-amber-400/30">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-amber-400/20">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-primary"></span>
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 leading-tight">
                    {tChat.headerTitle}
                  </h3>
                  <p className="text-[10px] text-blue-200 font-medium tracking-wide">
                    {tChat.headerSub}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearChat}
                  title={isRtl ? "مسح المحادثة" : "Clear conversation"}
                  className="p-1 text-blue-200 hover:text-white hover:bg-white/10 rounded transition text-[10px] font-bold"
                >
                  {isRtl ? "🗑️ مسح" : "🗑️ Clear"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message History Scroller */}
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50/50 space-y-4">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs font-semibold leading-relaxed shadow-sm block whitespace-pre-line ${
                      isBot 
                        ? "bg-white text-gray-800 border border-gray-200 rounded-tl-none" 
                        : "bg-primary text-white rounded-tr-none"
                    }`}>
                      {/* Message Content */}
                      <div>{msg.text}</div>

                      {/* Attachment Prompt specifically for direct WhatsApp contact */}
                      {isBot && msg.text.includes("+32") && (
                        <div className="mt-3 pt-2.5 border-t border-gray-100 flex justify-end">
                          <a 
                            href="https://wa.me/32486717540" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5 fill-emerald-600/10" />
                            <span>{tChat.directWaPrompt}</span>
                          </a>
                        </div>
                      )}

                      <div className={`text-[9px] mt-1.5 opacity-45 flex items-center gap-1 ${isBot ? 'text-gray-500' : 'text-blue-100 justify-end'}`}>
                        <Clock className="w-2.5 h-2.5" />
                        <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation */}
              {isTyping && (
                <div className={`flex justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-white text-gray-500 border border-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%] flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    <span className="text-[10px] font-extrabold italic pl-1">{tChat.typingText}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick action helper prompt buttons */}
            <div className="px-4 py-2 border-t border-gray-150/60 bg-white">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2 text-center">
                {isRtl ? "⚡ ضغطات سريعة للاستفسار:" : "⚡ Instant quick ask buttons:"}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <button
                  onClick={() => handleSendMessage(isRtl ? "ما هي الكليات المتوفرة وتخصصاتها؟" : "What are the available colleges?")}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-gray-700 bg-slate-50 border border-gray-200 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-primary" />
                  <span>{tChat.quickColleges}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(isRtl ? "كم الرسوم والمنح الدراسية المتاحة وقيمة الأقساط؟" : "What are the tuition fees and scholarships?")}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-gray-700 bg-slate-50 border border-gray-200 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1"
                >
                  <DollarSign className="w-3 h-3 text-amber-500" />
                  <span>{tChat.quickTuition}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(isRtl ? "ما هي الشروط والمستندات المطلوبة للقبول والتسجيل؟" : "What documents are needed to register and apply?")}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-gray-700 bg-slate-50 border border-gray-200 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1"
                >
                  <FileCheck className="w-3 h-3 text-emerald-500" />
                  <span>{tChat.quickAdmission}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(isRtl ? "كيف يمكنني التواصل مع إدارة بلجيكا المباشرة والمدير العام؟" : "What are the official communication methods for Brussels Admin?")}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-gray-700 bg-slate-50 border border-gray-200 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-blue-500" />
                  <span>{tChat.quickContact}</span>
                </button>
              </div>
            </div>

            {/* Input Message Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-gray-150 flex items-center gap-2 bg-slate-50/70"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={tChat.placeholder}
                className="flex-grow bg-white border border-gray-250 font-semibold px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition"
                dir={isRtl ? "rtl" : "ltr"}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-xl cursor-pointer disabled:opacity-40 select-none flex items-center justify-center shadow-md transition hover:scale-105"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
