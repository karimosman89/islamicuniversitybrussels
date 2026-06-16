import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Layers, 
  Calendar, 
  User, 
  Eye, 
  X, 
  Award, 
  Bookmark, 
  CheckCircle,
  Hash
} from 'lucide-react';

interface ResearchHubProps {
  currentLang: string;
  isRtl?: boolean;
}

const LOCALIZATION: Record<string, any> = {
  ar: {
    sectionBadge: "دار البحوث والدراسات العلمية",
    sectionTitle: "المجلة العلمية المحكّمة والأبحاث المنشورة",
    sectionSub: "تصفح الأبحاث والمؤلفات الفقهية، واللسانية والشرعية الصادرة عن الكادر الأكاديمي والطلبة الباحثين بفرع الجامعة في بلجيكا ومراكزها الشريكة.",
    searchPlaceholder: "ابحث بالبحث، المؤلف، أو الكلمات الدلالية...",
    allTopics: "جميع حقول المعرفة",
    topicSharia: "دراسات الفقه والنوازل المعاصرة",
    topicPhilology: "علوم اللسان والخط العربي البارز",
    topicTheology: "العقيدة ومقارنة المذاهب المعرفية",
    topicFinance: "الاقتصاد والصيرفة الإسلامية بالغرب",
    publishedIn: "تاريخ النشر الأكاديمي:",
    authors: "الباحثون المشاركون:",
    downloadDossier: "تحميل خلاصة البحث الكاملة (PDF)",
    downloadSuccess: "جاري إعداد وتحميل وثيقة البحث الأكاديمي... يرجى الانتظار.",
    abstractBtn: "الاطلاع على خلاصة البحث والملخص",
    abstractTitle: "ملخص البحث العلمي المعتمد",
    downloadLabel: "تحميل الملف المرجعي المصغر",
    citations: "معامل الاقتباس الأكاديمي:",
    pagesCount: "عدد الصفحات المعتمدة:"
  },
  en: {
    sectionBadge: "Center of Academic Research",
    sectionTitle: "Peer-Reviewed Scientific Journals & Researches",
    sectionSub: "Explore classical theology papers, contemporary juristic case-studies, and Arabic phonetic research dossiers published by our faculty board members.",
    searchPlaceholder: "Search research titles, authors, keywords or DOI...",
    allTopics: "All Knowledge Areas",
    topicSharia: "Contemporary Jurisprudence & Fiqh",
    topicPhilology: "Classical Philology & Paleography",
    topicTheology: "Comparative Theology & Logic",
    topicFinance: "Islamic Finance & Ethical Banking",
    publishedIn: "Academic Published:",
    authors: "Key Researchers:",
    downloadDossier: "Download Abstract Manuscript (PDF)",
    downloadSuccess: "Compiling research abstract dossier for instant download... Please wait.",
    abstractBtn: "View Scholarly Abstract",
    abstractTitle: "Certified Research Abstract",
    downloadLabel: "Download Abstract PDF Booklet",
    citations: "Academic Citation Score:",
    pagesCount: "Verified Pages count:"
  },
  it: {
    sectionBadge: "Dipartimento di Ricerca Scientifica",
    sectionTitle: "Rivista Accademica e Trattati Pubblicati",
    sectionSub: "Sfoglia e scarica abstract di ricerche peer-reviewed in teologia, giurisprudenza comparata ed economia islamica prodotte a Bruxelles.",
    searchPlaceholder: "Cerca articoli, autori, parole chiave...",
    allTopics: "Tutte le Aree",
    topicSharia: "Giurisprudenza Contemporanea",
    topicPhilology: "Filologia e Paleografia Classica",
    topicTheology: "Teologia Comparata e Logica",
    topicFinance: "Finanza Islamica ed Economia Etica",
    publishedIn: "Data di Pubblicazione:",
    authors: "Ricercatori Autori:",
    downloadDossier: "Scarica Documento di Sintesi (PDF)",
    downloadSuccess: "Download dell'abstract accademico in corso...",
    abstractBtn: "Leggi l'Abstract",
    abstractTitle: "Abstract Accademico Certificato",
    downloadLabel: "Download PDF",
    citations: "Punteggio Citazioni:",
    pagesCount: "Numero di Pg. Certificate:"
  },
  de: {
    sectionBadge: "Forschungs- und Publikationszentrum",
    sectionTitle: "Wissenschaftliche Zeitschrift & Fachpublikationen",
    sectionSub: "Durchsuchen Sie begutachtete (peer-reviewed) theologische Schriften, vergleichende Rechtsgutachten und Abhandlungen von BIU-Forschern.",
    searchPlaceholder: "Nach Titel, Autor, DOI oder Schlagworten suchen...",
    allTopics: "Alle Fachrichtungen",
    topicSharia: "Zeitgenössische Rechtswissenschaft & Fiqh",
    topicPhilology: "Klassische Philologie & Paläographie",
    topicTheology: "Vergleichende Theologie & Logik",
    topicFinance: "Islamische Ökonomie & Ethik-Banking",
    publishedIn: "Veröffentlicht am:",
    authors: "Verfasser & Forscher:",
    downloadDossier: "Forschungszusammenfassung herunterladen (PDF)",
    downloadSuccess: "Das PDF-Dokument wird vorbereitet und in Kürze heruntergeladen.",
    abstractBtn: "Abstract & Zusammenfassung anzeigen",
    abstractTitle: "Zertifiziertes wissenschaftliches Abstract",
    downloadLabel: "Dozenten-Zusammenfassung herunterladen",
    citations: "Zitationsindex (Score):",
    pagesCount: "Beglaubigte Seitenanzahl:"
  },
  fr: {
    sectionBadge: "Département des Publications Scientifiques",
    sectionTitle: "Revue Académique & Travaux de Recherche",
    sectionSub: "Accédez aux dossiers d'études théologiques, commentaires juridiques comparés et traités littéraires édités par la faculté d'Europe.",
    searchPlaceholder: "Rechercher par titre, chercheur, mots clés, DOI...",
    allTopics: "Tous les Domaines",
    topicSharia: "Jurisprudence Contemporaine & Cas Pratiques",
    topicPhilology: "Philologie Classique & Paléographie",
    topicTheology: "Théologie Fondamentale & Logique",
    topicFinance: "Économie Islamique & Éthique Financière",
    publishedIn: "Date d'Édition :",
    authors: "Auteurs Chercheurs :",
    downloadDossier: "Télécharger la Synthèse (PDF)",
    downloadSuccess: "Compilation de la plaquette scientifique en cours...",
    abstractBtn: "Visualiser l'Abstract",
    abstractTitle: "Abstract Scientifique Homologué",
    downloadLabel: "Télécharger l'Abstract PDF",
    citations: "Index de Citation Académique :",
    pagesCount: "Nombre de Pages Homologuées :"
  }
};

const PAPERS_DATA = [
  {
    id: "pub_1",
    title: {
      ar: "منهجية الفتوى ونوازل التقنيات الرقمية للأقليات المسلمة في دول الاتحاد الأوروبي",
      en: "Fatwa Methodology on Digital Technologies and Legal Frontiers for Muslim Minorities in the EU",
      it: "Metodologia delle Fatwa sulle Nuove Tecnologie Digitali per le Minoranze Musulmane nella UE",
      de: "Fatwa-Methodik zu digitalen Technologien und rechtlichen Fragen für muslimische Minderheiten in der EU",
      fr: "Méthodologie de la Fatwa face aux Technologies Numériques pour les Minorités Musulmanes d'Europe"
    },
    authors: {
      ar: "أ.د. عبد الحليم الودغيري، د. مارك جان فيرمر",
      en: "Prof. Dr. Abdelhalim Lougiri, Dr. Marc Jan Vermeer",
      it: "Prof. Dr. Abdelhalim Lougiri, Dr. Marc Jan Vermeer",
      de: "Prof. Dr. Abdelhalim Lougiri, Dr. Marc Jan Vermeer",
      fr: "Prof. Dr Abdelhalim Lougiri, Dr Marc Jan Vermeer"
    },
    topic: "sharia",
    date: "May 2025",
    doi: "10.4820/biu.sharia.2025.104",
    citations: 28,
    pages: 42,
    abstract: {
      ar: "يبحث هذا المقال المنهجيات المعاصرة التي يعتمد عليها مجلس الفتوى بمستشارية أوروبا في تكييف القوانين المنظمة للبيع والشراء التفاعلي الرقمي، والعملات المشفرة، والعقود الذكية طبقًا لأحكام الشريعة الغراء والقواعد الفقهية الكلية.",
      en: "This critical paper examines contemporary legal criteria utilized by European juristic advisory boards in evaluating cryptographic assets, online transactional contracts, and automated legal nodes within traditional Islamic jurisprudential parameters.",
      it: "Questo studio esamina i criteri giuridici utilizzati dal comitato di giuristi accademici a Bruxelles nell'esaminare criptovalute e contratti intelligenti alla luce delle regole canoniche medievali e moderne.",
      de: "Dieses Papier untersucht die rechtlichen Methoden, die vom Rat für theologische Begutachtung angewandt werden, um Krypto-Assets, Online-Transaktionsverträge und Smart Contracts im Rahmen klassischer Fiqh-Prinzipien zu bewerten.",
      fr: "Cette recherche analyse les schémas analytiques adoptés pour concilier les instruments d'actifs cryptographiques, les contrats de réseaux de chaînes de blocs avec les canons de la Sharia classique."
    }
  },
  {
    id: "pub_2",
    title: {
      ar: "مخطوطات كودكس بروكسل بالخط الكوفي: مراجعة بيلوغرافية وتتبع للنسخب الأثرية لقرن الهجرة الأول",
      en: "The Brussels Kufic Quranic Codex: A Bibliographical and Paleographical Review of First-Century Hijri Portions",
      it: "Il Codice Coranico Kufico di Bruxelles: Analisi Bibliografica e Paleografica dei Manoscritti del I Secolo Egiziano",
      de: "Der Brüsseler kufische Koran-Kodex: Eine bibliografische und paläografische Untersuchung von Funden aus dem 1. Jahrhundert n. H.",
      fr: "Le Codex Coranique de Bruxelles en écriture Koufique : Analyse Paléographique et Bibliographique des Fragments du Ier Siècle Hégirien"
    },
    authors: {
      ar: "د. سارة فهد القحطاني، د. جوليان بيرتولوكسي",
      en: "Dr. Sarah Al-Qahtani, Dr. Julian Bertolucci",
      it: "Dott.ssa Sarah Al-Qahtani, Dr. Julian Bertolucci",
      de: "Dr. Sarah Al-Qahtani, Dr. Julian Bertolucci",
      fr: "Dr Sarah Al-Qahtani, Dr Julian Bertolucci"
    },
    topic: "philology",
    date: "January 2024",
    doi: "10.4820/biu.philology.2024.089",
    citations: 45,
    pages: 68,
    abstract: {
      ar: "يهدف البحث إلى تقديم دراسة مخبرية شاملة للأبعاد الأوتوبيوغرافية وتطور النقط والشكل والخصائص الخطية في مجموعة من الأجزاء النادرة المكتوبة بالخط الكوفي، والمحفوظة ضمن وثائق الجامعة والمجموعات الوطنية ببلجيكا.",
      en: "Presents an exhaustive paleographical and radiocarbon test review of high-heritage early Hijazi manuscripts in central European archives, tracing orthography rules, regional spelling traits, and early dotting systems.",
      it: "Fornisce uno studio paleografico approfondito dei manoscritti dei primi secoli dell'Egira conservati a Bruxelles, ricostruendo l'introduzione dei punti Vocalici e delle notazioni grafiche.",
      de: "Zeigt eine detaillierte paläografische und Radiokohlenstoff-Untersuchung früher hijazischer Fragmente in Brüsseler Archiven und rekonstruiert die Einführung von Vokalzeichen und orthografischen Übergängen.",
      fr: "Étude paléographique rigoureuse de la structure linguistique, des variations de ponctuation et de l'orthographe consonantique des manuscrits précieux du Coran de l'époque omeyyade."
    }
  },
  {
    id: "pub_3",
    title: {
      ar: "صيغ التمويل الأصغر الخالية من الربا وتطوير التنمية المستدامة بالمجتمعات الحضرية في أوروبا الغربية",
      en: "Sharia-Compliant Microfinance Formulas and Sustainable Development in Western European Urban Neighborhoods",
      it: "Formule di Microfinanza Islamica e Sviluppo Sostenibile nei Quartieri Urbani dell'Europa Occidentale",
      de: "Scharia-konforme Mikrofinanzierungsmodelle und nachhaltige Entwicklung in westeuropäischen Stadtteilen",
      fr: "Formules de Microfinance Islamique et Développement Écologique Durable des Quartiers Urbains d'Europe Occidentale"
    },
    authors: {
      ar: "د. طارق صوان، البروفيسور فيليب لامبرت",
      en: "Dr. Tariq Sawaneh, Prof. Philippe Lambert",
      it: "Prof. Tariq Sawaneh, Prof. Philippe Lambert",
      de: "Prof. Tariq Sawaneh, Prof. Philippe Lambert",
      fr: "Dr Tariq Sawaneh, Prof. Philippe Lambert"
    },
    topic: "finance",
    date: "October 2024",
    doi: "10.4820/biu.finance.2024.112",
    citations: 31,
    pages: 50,
    abstract: {
      ar: "تبحث الدراسة مدى موائمة القوانين الأوروبية مع هياكل المشاركة والمضاربة الإسلامية لتنشيط حركة المشاريع الصغرى والحرفية في الحاضرة الحضرية، وتقديم بدائل أخلاقية حقيقية للتمويل الربوي للمشاريع الناشئة.",
      en: "This paper analyzes the regulatory feasibility of adapting Islamic Musharaka and Mudaraba contracts into modern community entrepreneurial schemes in metropolitan Europe, providing risk-sharing micro-equity alternatives.",
      it: "Questo articolo analizza la fattibilità normativa nell'adattare contratti di Musharaka e Mudaraba all'interno delle periferie metropolitane belghe per rilanciare giovani imprenditori in via di sviluppo.",
      de: "Dieser Artikel zeigt die rechtlichen Anpassungen von Musharaka- und Mudaraba-Verträgen zur Unterstützung von Jungunternehmern in europäischen Metropolregionen auf Basis ethischer Risiko-Teilung.",
      fr: "Cette proposition analyse les leviers légaux et techniques de distribution de microcrédits participatifs basés sur les principes d'équité et de responsabilité mutuelle en Belgique."
    }
  }
];

export function ResearchHub({ currentLang, isRtl = false }: ResearchHubProps) {
  const t = LOCALIZATION[currentLang] || LOCALIZATION["en"];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredPapers = PAPERS_DATA.filter(p => {
    const matchesTopic = activeTopic === "all" || p.topic === activeTopic;
    const titleText = (p.title[currentLang as any] || p.title["en"] || "").toLowerCase();
    const authorText = (p.authors[currentLang as any] || p.authors["en"] || "").toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = titleText.includes(searchLower) || 
                          authorText.includes(searchLower) || 
                          p.doi.includes(searchLower);
    return matchesTopic && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // Trigger native download simulation
      const doc = new Blob([`BRUSSELS ISLAMIC UNIVERSITY ACADEMIC MANUSCRIPT ABSTRACT [DOI: ${PAPERS_DATA.find(p=>p.id===id)?.doi}]`], { type: 'text/plain' });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(doc);
      element.download = `BIU-Research-Abstract-${id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const textAlignment = isRtl ? 'text-right' : 'text-left';
  const flexDir = isRtl ? 'flex-row-reverse' : 'flex-row';

  return (
    <section id="research-hub" className="py-24 bg-slate-900 text-white relative border-t border-slate-950">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-[11px] mb-4 uppercase tracking-widest border border-emerald-500/15">
            📚 {t.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-450 max-w-2xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            {t.sectionSub}
          </p>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-850 mb-10 flex flex-col xl:flex-row gap-4 justify-between items-center">
          
          {/* Main Topics Nav */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "all", label: t.allTopics },
              { id: "sharia", label: t.topicSharia },
              { id: "philology", label: t.topicPhilology },
              { id: "theology", label: t.topicTheology },
              { id: "finance", label: t.topicFinance }
            ].map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold tracking-wide border transition-all duration-250 cursor-pointer ${
                  activeTopic === topic.id
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full xl:w-72 shrink-0">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-slate-900 text-white placeholder-slate-600 border border-slate-850 rounded-xl py-2 px-3 pl-9 text-xs focus:outline-none focus:border-emerald-500 font-semibold ${textAlignment}`}
            />
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Papers Listing Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPapers.map((paper, idx) => {
              const pTitle = paper.title[currentLang as any] || paper.title["en"];
              const pAuthors = paper.authors[currentLang as any] || paper.authors["en"];
              const bIsDownloading = downloadingId === paper.id;
              
              return (
                <motion.div
                  key={paper.id}
                  layout
                  initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 hover:border-slate-850 hover:bg-slate-950/70 transition-all duration-300 flex flex-col md:flex-row justify-between gap-5 items-stretch md:items-center relative overflow-hidden"
                  id={`research-item-${paper.id}`}
                >
                  <div className={`space-y-2 flex-grow ${textAlignment}`}>
                    <div className={`flex flex-wrap items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                        <Bookmark className="w-2.5 h-2.5" />
                        {paper.topic.toUpperCase()}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        {paper.doi}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-md text-white tracking-tight hover:text-emerald-400 transition cursor-pointer" onClick={() => setSelectedPaper(paper)}>
                      "{pTitle}"
                    </h3>

                    <div className={`flex flex-wrap items-center gap-4 text-[10px] text-slate-450 mt-1 font-semibold ${isRtl ? 'justify-end' : 'justify-start'}`}>
                      <span className="flex items-center gap-1.5 font-sans">
                        <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {pAuthors}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {paper.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono bg-slate-950 px-2 py-0.5 rounded font-black text-emerald-400 text-[8px]">
                        ★ Citations: {paper.citations}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons right block */}
                  <div className={`flex sm:flex-row md:flex-col lg:flex-row gap-2 shrink-0 md:w-56 justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-900 ${flexDir}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedPaper(paper)}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-300 text-[10px] font-black transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.abstractBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(paper.id)}
                      disabled={bIsDownloading}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-650 hover:bg-emerald-600 disabled:bg-slate-800 text-white text-[10px] font-black transition shadow-md shadow-emerald-950/15 cursor-pointer"
                    >
                      {bIsDownloading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin shrink-0" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                      )}
                      <span>
                        {bIsDownloading ? '...' : t.downloadDossier}
                      </span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Abstract Preview Drawer / Modal */}
        <AnimatePresence>
          {selectedPaper && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPaper(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl relative z-10 p-6 sm:p-8 text-left"
                id="research-abstract-modal"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPaper(null)}
                  className="absolute right-4 top-4 text-slate-500 hover:text-white transition p-1 rounded-lg"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div className={`space-y-1 ${textAlignment}`}>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider">
                      {t.abstractTitle}
                    </span>
                    <h2 className="text-md sm:text-lg font-black text-white leading-snug mt-1.5">
                      "{selectedPaper.title[currentLang] || selectedPaper.title["en"]}"
                    </h2>
                  </div>

                  {/* Metadata table */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850/70 text-[10px] grid grid-cols-2 gap-3 font-mono text-slate-400">
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block mb-0.5">{t.authors}</span>
                      <span className="text-white font-black">{selectedPaper.authors[currentLang] || selectedPaper.authors["en"]}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block mb-0.5">{t.publishedIn}</span>
                      <span className="text-white font-semibold">{selectedPaper.date}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block mb-0.5">{t.citations}</span>
                      <span className="text-emerald-400 font-black">{selectedPaper.citations} Verified Citations</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block mb-0.5">{t.pagesCount}</span>
                      <span className="text-white font-semibold">{selectedPaper.pages} pages</span>
                    </div>
                  </div>

                  {/* Scientific Abstract Body Text */}
                  <div className="space-y-1 pt-2 border-t border-slate-800">
                    <span className={`block text-[10px] uppercase font-black text-slate-500 tracking-wider ${textAlignment}`}>
                      Abstract / Synopsis:
                    </span>
                    <p className={`text-xs text-slate-300 leading-relaxed font-semibold italic ${textAlignment}`}>
                      "{selectedPaper.abstract[currentLang] || selectedPaper.abstract["en"]}"
                    </p>
                  </div>

                  <div className={`flex flex-col sm:flex-row justify-between items-center gap-3.5 pt-4.5 border-t border-slate-800 ${flexDir}`}>
                    <span className="text-[8.5px] font-mono text-slate-500">
                      Digital Object Identifier: {selectedPaper.doi}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDownload(selectedPaper.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-xl bg-emerald-650 hover:bg-emerald-600 text-white text-[10.5px] font-black transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-250" />
                      <span>{t.downloadLabel}</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
