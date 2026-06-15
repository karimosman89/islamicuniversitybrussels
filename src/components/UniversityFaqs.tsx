import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  HelpCircle, 
  UserCheck, 
  BookOpen, 
  Coins, 
  MessageSquare,
  Sparkles,
  Search
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "admission" | "academic" | "tuition";
  question: Record<string, string>;
  answer: Record<string, string>;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "academic",
    question: {
      ar: "هل الشهادة الممنوحة معتمدة من الجامعة الإسلامية بروكسل ببلجيكا؟",
      en: "Is the granted degree officially accredited by the main university?",
      it: "I titoli rilasciati sono accreditati dalla sede centrale?",
      fr: "Les diplômes délivrés sont-ils reconnus par le siège principal ?",
      de: "Sind die verliehenen Abschlüsse offiziell akkreditiert?"
    },
    answer: {
      ar: "نعم بالكامل، الشهادة تصدر مصدقة وموثقة رسمياً من الإدارة الرئيسية للجامعة في العاصمة البلجيكية بروكسل وتعتمد في جميع تخصصات فرع أوروبا.",
      en: "Yes, the degree is issued and certified directly by the main administration of the university in Brussels, Belgium, and is fully recognized across all majors in the European branch.",
      it: "Sì, il titolo è rilasciato e certificato direttamente dall'amministrazione principale dell'università a Bruxelles, in Belgio, ed è pienamente riconosciuto in tutti i corsi della filiale europea.",
      fr: "Oui, le diplôme est délivré et certifié directement par l'administration principale de l'université à Bruxelles, en Belgique, et est pleinement reconnu dans toutes les spécialités de l'antenne européenne.",
      de: "Ja, der Abschluss wird direkt von der Hauptverwaltung der Universität in Brüssel, Belgien, ausgestellt und zertifiziert und ist in allen Fachbereichen der europäischen Niederlassung voll anerkannt."
    }
  },
  {
    id: "faq-2",
    category: "academic",
    question: {
      ar: "كيف يمكنني معادلة مؤلفاتي وأبحاثي السابقة لتسريع الدكتوراه؟",
      en: "How can I equate my previous publications and research to accelerate my PhD?",
      it: "Come posso equiparare le mie pubblicazioni precedenti per accelerare il dottorato?",
      fr: "Comment faire équivaloir mes publications et recherches antérieures pour accélérer mon doctorat ?",
      de: "Wie kann ich meine bisherigen Veröffentlichungen anrechnen lassen, um meine Promotion zu beschleunigen?"
    },
    answer: {
      ar: "تسمح لوائح الجامعة الاستثنائية بفرع أوروبا لطلاب الماجستير والدكتوراه بمعادلة كتبهم المنشورة ومؤلفاتهم وأبحاثهم الرصينة ذات القيمة العلمية لخصم ساعات معتمدة وتسهيل تخرجهم.",
      en: "The European branch's exceptional regulations allow Master's and PhD students to equate published books and prestigious scientific research to transfer credits and speed up graduation.",
      it: "I regolamenti della filiale europea consentono agli studenti di Master e Dottorato di equiparare libri pubblicati e ricerche accademiche di valore per ottenere crediti e velocizzare la laurea.",
      fr: "Les règlements exceptionnels permettent aux étudiants de Master et Doctorat de faire valider leurs livres publiés et recherches d'excellence pour obtenir des crédits et accélérer l'obtention du diplôme.",
      de: "Die Sonderregelungen der europäischen Niederlassung ermöglichen es Master- und Promotionsstudierenden, veröffentlichte Bücher und anerkannte wissenschaftliche Forschungsarbeiten anrechnen zu lassen, um Credits zu übertragen und den Abschluss zu beschleunigen."
    }
  },
  {
    id: "faq-3",
    category: "academic",
    question: {
      ar: "أين وكيف تتم مناقشة رسالة الماجستير أو الدكتوراه؟",
      en: "Where and how is the Master's or PhD thesis defended?",
      it: "Dove e come avviene la discussione della tesi di Master o Dottorato?",
      fr: "Où et comment se déroule la soutenance de mémoire ou de thèse ?",
      de: "Wo und wie wird die Masterarbeit oder Dissertation verteidigt?"
    },
    answer: {
      ar: "لتسهيل السفر والتكاليف على الباحثين، تعقد مناقشات الرسائل العلمية داخل بلد الطالب أو الإقليم الذي يقيم فيه بحضور لجنة علمية مرخصة وموفدة خصيصاً من الجامعة.",
      en: "To facilitate travel and minimize expenses for researchers, defense sessions are organized within the student's country of residence before an authorized academic committee appointed and dispatched by the university.",
      it: "Per agevolare gli studenti, le discussioni si tengono nel paese di residenza dello studente alla presenza di una commissione scientifica autorizzata inviata appositamente dall'università.",
      fr: "Pour faciliter le déplacement des chercheurs, les soutenances se font dans le pays de résidence de l'étudiant devant un jury d'examen accrédité, spécialement mandaté par l'université.",
      de: "Um Forschern das Reisen zu erleichtern, werden die Verteidigungen im Wohnsitzland des Studierenden vor einem autorisierten wissenschaftlichen Ausschuss durchgeführt, der speziell von der Universität entsandt wird."
    }
  },
  {
    id: "faq-4",
    category: "tuition",
    question: {
      ar: "ما هي شروط تخفيض الرسوم الدراسية المقررة؟",
      en: "What are the rules for tuition fee reductions?",
      it: "Quali sono le condizioni per ottenere riduzioni sulle tasse scolastiche?",
      fr: "Quelles sont les conditions pour obtenir une réduction sur les frais de scolarité ?",
      de: "Welche Voraussetzungen gelten für die Reduzierung der Studiengebühren?"
    },
    answer: {
      ar: "تقديرًا لمكانة القرآن الكريم، تمنح الجامعة خصماً استثنائياً وفورياً يبلغ 20% لحفظة كتاب الله بمرحلة البكالوريوس، و 10% بمرحلتي الماجستير والدكتوراه عند تقديم مستند يثبت الحفظ.",
      en: "In appreciation of the Holy Quran, the university grants an immediate 20% discount for Quran memorizers at the Bachelor's level, and 10% for Master's and PhD levels, upon presenting a memorization certificate.",
      it: "La commissione offre uno sconto del 20% per la memorizzazione del Corano per la laurea triennale e del 10% per Master/PhD, presentando idonea certificazione.",
      fr: "En signe d'appréciation du Saint Coran, l'université accorde une réduction exceptionnelle de 20% pour le niveau Bachelor, et 10% pour les niveaux Master et Doctorat, sur présentation d'une attestation de mémorisation.",
      de: "Als Anerkennung für den Heiligen Koran gewährt die Universität einen Rabatt von 20 % für Bachelor-Studierende und 10 % für Master- und Promotionsstudierende, die den Koran auswendig gelernt haben (Nachweis erforderlich)."
    }
  },
  {
    id: "faq-5",
    category: "admission",
    question: {
      ar: "ما هي المتطلبات الأساسية للقبول والتسجيل بالجامعة؟",
      en: "What are the core requirements for university admission?",
      it: "Quali sono i requisiti principali per l'ammissione all'università?",
      fr: "Quelles sont les conditions requises pour s'inscrire à l'université ?",
      de: "Was sind die Voraussetzungen für die Zulassung zur Universität?"
    },
    answer: {
      ar: "يتطلب التسجيل تقديم صورة من الشهادة الدراسية السابقة (الثانوية للبكالوريوس، أو البكالوريوس للماجستير)، وصورة الهوية ورسوم التسجيل الرمزية مع تعبئة طلب القبول الإلكتروني عبر موقعنا.",
      en: "Admission requires a copy of your prior academic certificate (High School for Bachelor, or Bachelor's for Master), national identity/passport, application fees, and a filled online admission form.",
      it: "L'ammissione richiede la copia del certificato di studio precedente (Diploma per Laurea Triennale, o Triennale per Master), documento di identità e il modulo compilato.",
      fr: "L'inscription requiert une copie du diplôme précédent (Baccalauréat pour Licence, Licence pour Master), une pièce d'identité et de remplir le formulaire d'admission en ligne.",
      de: "Die Zulassung erfordert eine Kopie des vorherigen Schul- oder Studienabschlusszeugnisses, einen Personalausweis/Reisepass sowie das ausgefüllte Online-Zulassungsformular."
    }
  },
  {
    id: "faq-6",
    category: "tuition",
    question: {
      ar: "هل يمكنني دفع الرسوم الدراسية على أقساط ميسرة؟",
      en: "Can I pay the tuition fees in easy installments?",
      it: "È possibile pagare le tasse in comode rate?",
      fr: "Est-il possible de payer les frais de scolarité en plusieurs versements ?",
      de: "Kann ich die Studiengebühren in bequemen Raten bezahlen?"
    },
    answer: {
      ar: "نعم، تتيح الإدارة المالية للطلاب في فرع أوروبا خيار تقسيم الرسوم السنوية على دفعات أو أقساط ميسرة شهرية أو فصلية لتسهيل مسيرتهم وتخفيف الأعباء المادية.",
      en: "Yes, our financial department offers modular payment schemes allowing students to divide annual tuition fees into easy monthly or quarterly installments.",
      it: "Sì, l'ufficio tesoreria consente di ripartire la retta annuale in rate mensili o trimestrali flessibili per agevolare il percorso di studi.",
      fr: "Oui, le département financier propose des plans de paiement modulables permettant d'étaler les frais de scolarité annuels en mensualités ou versements trimestriels.",
      de: "Ja, unsere Finanzabteilung bietet Ratenzahlungen an, sodass die jährlichen Studiengebühren in monatlichen oder vierteljährlichen Raten gezahlt werden können."
    }
  },
  {
    id: "faq-7",
    category: "academic",
    question: {
      ar: "كم تبلغ مدة الدراسة المقررة لكل مرحلة دراسية؟",
      en: "What is the standard duration of study for each degree?",
      it: "Qual è la durata standard degli studi per ciascun corso?",
      fr: "Quelle est la durée moyenne des études pour chaque niveau ?",
      de: "Wie lange dauert die Regelstudienzeit für die einzelnen Abschlüsse?"
    },
    answer: {
      ar: "تبلغ مدة البكالوريوس ٣ سنوات، والماجستير سنتين، بينما تتراوح مدة الدكتوراه بين سنتين إلى ٣ سنوات كحد أقصى يعتمد على سرعة إنجاز البحث ومناقشة الأطروحة وبث الفصول الدراسية.",
      en: "The Bachelor's degree takes 3 years, the Master's takes 2 years, and the PhD ranges from 2 to 3 years max, depending on the research progress and thesis completion.",
      it: "La laurea triennale dura 3 anni, il Master 2 anni e il Dottorato da 2 a 3 anni, a seconda dei progressi della tesi e della ricerca.",
      fr: "La Licence se prépare en 3 ans, le Master en 2 ans, et le Doctorat s'étend sur 2 à 3 ans maximum selon l'avancement de la thèse de recherche.",
      de: "Das Bachelorstudium dauert 3 Jahre, das Masterstudium 2 Jahre und die Promotion 2 bis 3 Jahre, abhängig vom Forschungsfortschritt und der Fertigstellung der Dissertation."
    }
  },
  {
    id: "faq-8",
    category: "admission",
    question: {
      ar: "هل يمكنني تقديم طلب الانتساب والقبول من خارج الاتحاد الأوروبي؟",
      en: "Can I submit my application if I live outside the European Union?",
      it: "Posso presentare la mia candidatura se vivo fuori dall'Unione Europea?",
      fr: "Puis-je soumettre ma candidature si je vis en dehors de l'Union Européenne ?",
      de: "Kann ich mich bewerben, wenn ich außerhalb der Europäischen Union lebe?"
    },
    answer: {
      ar: "نعم، ترحب الجامعة بكافة المتقدمين للتعلم عن بعد والانتساب الإلكتروني من شتى بقاع العالم والدول العربية، وتسهل لهم إجراءات المتابعة والاختبارات عبر الأنظمة الرقمية الحديثة.",
      en: "Yes, the university welcomes all remote learners and online applicants from any part of the world and the Middle East, facilitating administrative tracking and examinations via our cutting-edge digital portals.",
      it: "Sì, l'università accoglie tutti gli studenti a distanza e candidati online da tutto il mondo e dai paesi arabi, facilitando il monitoraggio e gli esami attraverso moderni portali digitali.",
      fr: "Oui, l'université accueille chaleureusement les candidatures du monde entier et des pays arabes, facilitant le suivi pédagogique et les d'examens via nos outils numériques innovants.",
      de: "Ja, die Universität heißt alle Fernstudierenden und Online-Bewerber aus der ganzen Welt und den arabischen Ländern herzlich willkommen und erleichtert die administrative Begleitung sowie Prüfungen über moderne digitale Portale."
    }
  }
];

const LOCALIZED_LABELS: Record<string, Record<string, string>> = {
  ar: {
    badge: "الأسئلة الشائعة والإجابات الأكاديمية",
    heading: "بوابة الأسئلة الشائعة والانتساب",
    sub: "كل ما تود معرفته عن شروط التسجيل، معادلة الأبحاث، طرق التدريس والأقساط لتيسير رحلتك العلمية معنا.",
    all: "كل الأسئلة",
    admission: "القبول والتسجيل",
    academic: "الدراسة والمناقشة",
    tuition: "الرسوم والدعم المالية",
    placeholder: "ابحث في الأسئلة الشائعة بالكلمات الدلالية...",
    empty: "لم نعثر على أسئلة تطابق بحثك الحالي. يرجى تجربة كلمات بحث أخرى.",
    helpText: "💡 هل لديك أي سؤال علمي أو إداري آخر؟",
    chatBtn: "تواصل مع الإدارة مباشرة عبر واتساب"
  },
  en: {
    badge: "FAQ PORTAL & RESOURCES",
    heading: "Frequently Asked Questions",
    sub: "Everything you need to know about enrollment, research equivalence, study duration, and modular installments to streamline your path.",
    all: "All FAQs",
    admission: "Admission & Enrollment",
    academic: "Academic & Thesis Defense",
    tuition: "Tuition Fees & Discounts",
    placeholder: "Search FAQ with keywords...",
    empty: "No matching questions discovered. Try other search words.",
    helpText: "💡 Have more custom inquiries representing your country?",
    chatBtn: "Chat directly with Admissions Board"
  },
  it: {
    badge: "PORTALE FAQ & SUPPORTO",
    heading: "Domande Frequenti Accademiche",
    sub: "Tutto quello che c'è da sapere su immatricolazione, equivalenza della ricerca, durata degli studi e pagamenti flessibili.",
    all: "Tutte le domande",
    admission: "Ammissione & Iscrizioni",
    academic: "Accademico & Discussioni",
    tuition: "Tasse & Agevolazioni",
    placeholder: "Cerca domande frequenti...",
    empty: "Nessuna corrispondenza trovata. Prova a cambiare parole chiave.",
    helpText: "💡 Hai domande speciali per il tuo Paese?",
    chatBtn: "Parla direttamente con la Segreteria"
  },
  fr: {
    badge: "CENTRE D'AIDE & FAQ",
    heading: "Foire Aux Questions",
    sub: "Tout savoir sur les modalités de pré-inscription, la validation d'acquis, le déroulement des études et les facilités de paiement.",
    all: "Toutes les questions",
    admission: "Admission & Inscription",
    academic: "Études & Soutenances",
    tuition: "Frais & Réductions",
    placeholder: "Rechercher une question...",
    empty: "Aucune question ne correspond à votre recherche. Essayez d'autres mots clés.",
    helpText: "💡 Vous avez des questions spécifiques à votre situation ?",
    chatBtn: "Contacter directement le secrétariat"
  },
  de: {
    badge: "HILFECENTER & FAQ",
    heading: "Häufig gestellte Fragen",
    sub: "Alles, was Sie über Zulassungsverfahren, die Anerkennung von Vorleistungen, Studiendauer und flexible Ratenzahlungen wissen müssen.",
    all: "Alle Fragen",
    admission: "Zulassung & Anmeldung",
    academic: "Akademisches & Verteidigung",
    tuition: "Gebühren & Rabatte",
    placeholder: "FAQ durchsuchen...",
    empty: "Keine übereinstimmenden Fragen gefunden. Versuchen Sie es mit anderen Begriffen.",
    helpText: "💡 Haben Sie weitere Fragen zu Ihren Studienbedingungen?",
    chatBtn: "Kontaktieren Sie die Studienberatung direkt"
  }
};

export const UniversityFaqs: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === "ar";
  const t = LOCALIZED_LABELS[currentLang] || LOCALIZED_LABELS["en"];
  const textAlignment = isRtl ? "text-right" : "text-left";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Filter FAQs by Category and Query search
  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    // Check if matching the localized question or answer text
    const questionText = (item.question[currentLang] || item.question["en"] || "").toLowerCase();
    const answerText = (item.answer[currentLang] || item.answer["en"] || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = questionText.includes(query) || answerText.includes(query);

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "admission":
        return <UserCheck className="w-4 h-4" />;
      case "academic":
        return <BookOpen className="w-4 h-4" />;
      case "tuition":
        return <Coins className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-b border-gray-100 relative overflow-hidden">
      {/* Absolute backdrop glow lights */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header content */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-blue-500/10 text-primary font-black text-[11px] mb-4 uppercase tracking-widest border border-primary/15 animate-pulse">
            <HelpCircle className="w-4 h-4 text-primary" />
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.sub}
          </p>
        </div>

        {/* Dynamic Search Input Bar */}
        <div className="max-w-xl mx-auto mb-10 relative" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.placeholder}
            className="w-full text-xs sm:text-sm bg-white border border-gray-200 focus:border-primary rounded-2xl py-3.5 pl-11 pr-5 text-gray-905 placeholder-gray-400 font-semibold shadow-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
          />
          <div className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'left-4'} flex items-center pointer-events-none`}>
            <Search className="w-4.5 h-4.5 text-gray-400" />
          </div>
        </div>

        {/* Tab categories Navigation */}
        <div 
          className="flex flex-wrap justify-center gap-2 mb-12" 
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        >
          {["all", "admission", "academic", "tuition"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenFaqId(null); // Reset open questions on category toggle
              }}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                activeCategory === cat 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105" 
                  : "bg-white hover:bg-slate-50 text-gray-650 border-gray-200"
              }`}
            >
              {cat !== "all" && getCategoryIcon(cat)}
              <span>{t[cat]}</span>
            </button>
          ))}
        </div>

        {/* Accordions Container */}
        <div className="max-w-3xl mx-auto space-y-4" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-150/90 shadow-xs overflow-hidden transition-all duration-300 hover:border-primary/20"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      className={`w-full p-5 sm:p-6 flex justify-between items-center text-start gap-4 transition-colors hover:bg-slate-50/50 cursor-pointer ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-slate-50 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0">
                          {getCategoryIcon(item.category)}
                        </span>
                        <span className="text-xs sm:text-[14px] font-black text-gray-900 leading-snug">
                          {item.question[currentLang] || item.question["en"]}
                        </span>
                      </div>
                      
                      <span className={`p-1.5 rounded-xl transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-gray-450'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <div 
                      className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[350px] border-t border-gray-100' : 'max-h-0'}`}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className={`p-5 sm:p-6 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-semibold bg-slate-50/40 ${textAlignment}`}>
                        {item.answer[currentLang] || item.answer["en"]}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 bg-white border border-gray-150 rounded-2xl"
              >
                <p className="text-sm font-bold text-gray-400">{t.empty}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ad-hoc Contact info */}
          <div className="mt-12 text-center p-6 bg-blue-50/40 border border-blue-100/50 rounded-2xl">
            <p className="text-xs sm:text-sm text-gray-500 font-bold">
              {t.helpText}
            </p>
            <a 
              href="https://wa.me/393518530537" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm font-extrabold mt-2 hover:underline"
            >
              <span>{t.chatBtn}</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
