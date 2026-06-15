import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper functions for applications JSON database persistence
const APPLICATIONS_FILE = path.join(process.cwd(), "applications.json");

function getApplications() {
  try {
    if (fs.existsSync(APPLICATIONS_FILE)) {
      const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read applications database:", err);
  }
  return [];
}

function saveApplications(apps: any[]) {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to save to applications database:", err);
  }
  return false;
}

// Initialize Gemini API
let aiClient: GoogleGenAI | null = null;
let geminiDisabledUntil = 0;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini client:", err);
  }
} else {
  console.log("Gemini API key is not configured or is default placeholder. Fallback keyword engine will be active.");
}

// Pre-defined high-quality multi-lingual academic responses for fallback and quick answers
const UNIVERSITY_KNOWLEDGE = {
  ar: {
    welcome: "أهلاً بك في المساعد الأكاديمي الذكي للجامعة الإسلامية بروكسل - فرع أوروبا! 🎓 كيف يمكنني مساعدتك في التسجيل أو الاستفسار اليوم؟",
    colleges: `🏛️ **الكليات المتاحة بفرع أوروبا:**
1. **كلية الدراسات الإسلامية والعربية:** تشمل الشريعة والقانون، أصول الدين، اللغة العربية، والدراسات الإسلامية.
2. **كلية الإدارة والاقتصاد والعلوم السياسية:** تشمل إدارة الأعمال، المصارف الإسلامية، والعلوم السياسية.
3. **كلية العلوم التربوية والإنسانية:** تشمل علم النفس، علوم التربية، علم الاجتماع والإعلام، التاريخ والتربية الفكرية.
4. **كلية القانون والعلوم السياسية:** تشمل الدراسات القانونية، القانون الدولي، والتحكيم الدولي ومكافحة الجرائم المعلوماتية.`,
    tuition: `💰 **تفاصيل الرسوم الدراسية والمنح:**
• **مرحلة البكالوريوس:** 1000$ سنوياً.
• **مرحلة الماجستير:** 1200$ سنوياً (متاح قسط مرن وميسر).
• **مرحلة الدكتوراه:** 1400$ سنوياً.
✨ **مزايا فريدة:** متاح معادلة وتقييم المؤلفات والبحوث والكتب والخبرات السابقة لاختصار السنين الدراسية لطلبة الماجستير والدكتوراه، وتتم مناقشة الرسائل حضورياً داخل بلد الباحث أو عبر تقنية الزوم المتقدمة.`,
    admission: `📝 **شروط ومستندات القبول والتسجيل:**
1. صورة عن آخر مؤهل دراسي تم الحصول عليه.
2. صورة شخصية وصورة من الهوية الشخصية/جواز السفر.
3. سيرة ذاتية للباحثين المتقدمين للماجستير والدكتوراه.
4. تعبئة طلب الانتساب المجاني عبر الموقع في قسم التسجيل.
💡 **ملاحظة:** التسجيل مفتوح حالياً للعام الدراسي الجديد 2026/2027 مع تيسيرات استثنائية لكافة الباحثين.`,
    contact: `📞 **قنوات التواصل والإدارة المباشرة ببلجيكا:**
• **المدير العام لفرع أوروبا:** البروفيسور د. مراد الرفاعي (Prof. Moujib Mourad).
• **الهاتف المباشر / الواتساب:** +32486717540 أو +393510464645
• **البريد الإلكتروني:** admin@university-brussels.org
• يمكنك استخدام الخريطة التفاعلية بالأسفل للتحدث فوراً مع الممثل المعتمد في دولتك (مثل إيطاليا، السعودية، تركيا).`,
    fallback: "أعتذر، هل يمكنك توضيح سؤالك بشكل أكبر؟ يمكنك الاستفسار عن كليات الجامعة، الرسوم والأقساط، شروط القبول، أو قنوات التواصل المباشرة مع المدير والوكلاء."
  },
  en: {
    welcome: "Welcome to the Academic AI Advisor of the Islamic University of Brussels - Europe Branch! 🎓 How can I help you with admissions, programs, or representing offices today?",
    colleges: `🏛️ **Available Colleges in the Europe Branch:**
1. **College of Islamic & Arabic Studies:** Sharia, Sharia & Law, Usul al-Din, Arabic Language, Islamic Studies.
2. **College of Administration, Economics & Political Science:** Business Admin, Islamic Banking & Finance, Political Sciences.
3. **College of Educational & Human Sciences:** Psychology, Education Sciences, Sociology & Media, History and Intellectual Education.
4. **College of Law & Political Science:** Legal Studies, International Law, International Arbitration & Forensic Science.`,
    tuition: `💰 **Tuition Fees & Special Scholarship Facilitation:**
• **Bachelor's Degree:** $1000 USD per year.
• **Master's Degree:** $1200 USD per year (Flexible installment plans available).
• **PhD Degree:** $1400 USD per year.
✨ **Unique Advantages:** Equivalence of prior books, published works, and academic activities is accessible for Master & PhD degree candidates. Master and PhD theses are defended in person inside the student's country or via Zoom.`,
    admission: `📝 **Admissions & Registration Requirements:**
1. A copy of your high school diploma / previous academic degrees.
2. A personal photo & a copy of passport or national ID.
3. CV representing past experience (for Master's & PhD applicants).
4. Submission of the admission form in the Registration section of this website.
💡 **Notice:** Admissions are officially open for academic year 2026/2027 supporting learners worldwide via our distance education model.`,
    contact: `📞 **Direct Communication Channels (Brussels, Belgium):**
• **General Director for Europe:** Prof. Dr. Mourad Al-Rifae (Prof. Moujib Mourad).
• **Direct Telephone & WhatsApp:** +32486717540 or +393510464645
• **Email Address:** admin@university-brussels.org
• Use the Interactive Map below to chat directly with our official representative in your area (e.g. Italy, KSA, Turkey).`,
    fallback: "I apologize, could you please clarify your question? You can ask about our departments, programs list, annual fees & discounts, graduation requirements, or direct emails."
  }
};

// API Endpoint for Chatbot
app.post("/api/chat", async (req, res) => {
  const { message, language = "ar", history = [] } = req.body;
  const lang = language === "ar" ? "ar" : "en";
  const userText = (message || "").toLowerCase().trim();

  // Simple rule-based checking for instant high-quality retrieval
  let presetReply = "";
  if (userText.includes("كلية") || userText.includes("كليات") || userText.includes("تخصص") || userText.includes("التخصصات") || userText.includes("college") || userText.includes("program") || userText.includes("specialt")) {
    presetReply = UNIVERSITY_KNOWLEDGE[lang].colleges;
  } else if (userText.includes("رسوم") || userText.includes("سعر") || userText.includes("اقساط") || userText.includes("أقساط") || userText.includes("منحة") || userText.includes("منح") || userText.includes("تكلفة") || userText.includes("fee") || userText.includes("tuition") || userText.includes("price") || userText.includes("cost") || userText.includes("scholarship")) {
    presetReply = UNIVERSITY_KNOWLEDGE[lang].tuition;
  } else if (userText.includes("تسجيل") || userText.includes("تقديم") || userText.includes("قبول") || userText.includes("ورق") || userText.includes("أوراق") || userText.includes("مستندات") || userText.includes("شروط") || userText.includes("register") || userText.includes("apply") || userText.includes("admiss") || userText.includes("document") || userText.includes("paper")) {
    presetReply = UNIVERSITY_KNOWLEDGE[lang].admission;
  } else if (userText.includes("تواصل") || userText.includes("رقم") || userText.includes("اتصال") || userText.includes("هاتف") || userText.includes("واتس") || userText.includes("ايميل") || userText.includes("بريد") || userText.includes("مدير") || userText.includes("مراد") || userText.includes("contact") || userText.includes("phone") || userText.includes("whatsapp") || userText.includes("email") || userText.includes("director") || userText.includes("mourad")) {
    presetReply = UNIVERSITY_KNOWLEDGE[lang].contact;
  }

  // If a preset is triggered, we can serve it directly, or use it to guide Gemini
  if (aiClient && Date.now() > geminiDisabledUntil) {
    try {
      // Build a simplified history context for Gemini
      const formattedHistory = history.map((h: any) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      }));

      const systemInstruction = `You are a helpful, professional, and friendly AI Academic Advisor ("الأكاديمي البوت") for the Islamic University of Brussels (Europe Branch) - (الجامعة الإسلامية بروكسل - فرع أوروبا).
Your conversation language is officially set to: ${language === "ar" ? "Arabic" : "English"}.
Provide clean, concise, structured explanations that are highly encouraging to study. Use bullet points and emoji markers.

Refuse politely to answer general political, religious conflict, or non-educational issues. Stick strictly to assisting with our university's information.

AUTHENTIC UNIVERSITY DATA SUMMARY:
1. Available Degrees: Bachelor's ($1000/year), Master's ($1200/year), PhD ($1400/year). Thesis defenses take place in person inside candidate's home country or via modern Zoom environments.
2. College of Islamic and Arabic Studies (Arabic grammar, Sharia, Islamic history).
3. College of Business Admin & Islamic Banking & Economics.
4. College of Psychology, Humanities & Educational Sciences.
5. College of International Law, Commercial Arbitration & Legal Studies.
6. Facilitation: Equivalence of previous publications (books, essays) is available so Master & PhD candidates can expedite graduation.
7. Leaders & Representatives:
   - General Director of Europe: Prof. Dr. Mourad Al-Rifae (Prof. Moujib Mourad) based in Brussels, Belgium.
   - Contact Number / WhatsApp: +32486717540 or +393510464645.
   - Certified offices can be found in Turkey, KSA, and Italy. Include direct Whatsapp link prompts where appropriate.
8. Current status: Autumn admissions for 2026/2027 are officially open. All registration materials are sent online.

If the user query is: "${message}", answers it accurately.
${presetReply ? `Note: This exact pre-verified database info might be extremely helpful to craft the response: ${presetReply}` : ""}`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || UNIVERSITY_KNOWLEDGE[lang].fallback;
      return res.json({ text: responseText, mode: "api" });

    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isQuotaOrDemand = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("503") || errMsg.includes("UNAVAILABLE");
      if (isQuotaOrDemand) {
        geminiDisabledUntil = Date.now() + 5 * 60 * 1000; // bypass Gemini for 5 mins
        console.log("Gemini Chat API rate-limited or unavailable. Activating silent local fallback.");
      } else {
        console.log("Gemini Chat API call failed, falling back to local database routing. Detail:", errMsg);
      }
      // Fallback is handled below
    }
  }

  // Fallback direct responsive answers
  if (presetReply) {
    return res.json({ text: presetReply, mode: "fallback-preset" });
  }

  // General warm greeting fallback
  if (userText.includes("مرحبا") || userText.includes("أهلا") || userText.includes("السلام") || userText.includes("صباح") || userText.includes("مساء") || userText.includes("hello") || userText.includes("hi") || userText.includes("hey") || userText.includes("greetings")) {
    return res.json({ text: UNIVERSITY_KNOWLEDGE[lang].welcome, mode: "fallback-welcome" });
  }

  return res.json({ text: UNIVERSITY_KNOWLEDGE[lang].fallback, mode: "fallback-default" });
});

// Let's create a server-side cache and structure for Academic News Feed
interface NewsItem {
  title: string;
  date: string;
  sourceName: string;
  url: string;
  summary: string;
  category: "conference" | "news" | "academic";
}

let newsCache: {
  data: NewsItem[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes cache

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "European Symposium on Islamic Theology & Contemporary Society 2026",
    date: "June 2026 - Rome, Italy",
    sourceName: "EU Academy of Religious Studies",
    url: "https://www.iubrussels.org",
    summary: "Annual international forum addressing contemporary academic perspectives on Islamic law, ethics, and e-learning integration in Western Europe.",
    category: "conference"
  },
  {
    title: "Innovation in E-Learning Models & Academic Equivalence Standards",
    date: "July 2026 - Brussels, Belgium",
    sourceName: "Digital Education Consortium",
    url: "https://www.iubrussels.org",
    summary: "New policy framework for validating prior publications, certified diplomas, and book editions for higher distance education degrees.",
    category: "academic"
  },
  {
    title: "International Call for Research: Bridging Sharia Sciences and Digital Pedagogy",
    date: "August 2026 - Brussels",
    sourceName: "University Research Council",
    url: "https://www.iubrussels.org",
    summary: "Joint initiative offering research fellowships and publication grants for researchers developing digitized curricula in modern Islamic thought.",
    category: "news"
  },
  {
    title: "Virtual Classroom Accessibility and Interactive Student Support Seminar 2026",
    date: "September 2026 - Online / Zurich",
    sourceName: "European Distance Education Network",
    url: "https://www.iubrussels.org",
    summary: "Workshop for training educators in delivering high-impact remote academic advising and managing dissertation defenses via Zoom.",
    category: "conference"
  }
];

app.get("/api/academic-news", async (req, res) => {
  const forceRefresh = req.query.refresh === "true";
  
  if (!forceRefresh && newsCache && (Date.now() - newsCache.timestamp < CACHE_DURATION)) {
    return res.json({ news: newsCache.data, source: "cache", timestamp: newsCache.timestamp });
  }

  if (aiClient && Date.now() > geminiDisabledUntil) {
    // 1. Try fetching with Google Search Grounding for highly relevant real-time news
    try {
      console.log("Fetching live academic news with search grounding using Gemini...");
      const prompt = `Search for the latest, genuine and active (2025/2026/2027) academic news, conferences, educational seminars, and calls for papers related to Islamic Studies, Islamic Theology, and Distance Learning/Online Higher Education in Europe.
Return exactly between 4 and 6 of the most relevant events. Ensure the urls are genuine reference urls or fallback to official domains.
Format the output strictly as a JSON array of objects. Do not wrap the JSON in Markdown formatting like \`\`\`json. Return only the raw JSON.

Each object in the array MUST have this exact TypeScript structure:
{
  "title": string (title of the news/conference/seminar),
  "date": string (exact date or month/year of the event),
  "sourceName": string (original academic institution, host, or publishing source),
  "url": string (full absolute URL reference retrieved from Google Search relevant to this item),
  "summary": string (a concise 1-2 sentence description explaining its significance to modern Islamic studies or distance learning in Europe),
  "category": "conference" | "news" | "academic"
}`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          temperature: 0.6,
        }
      });

      const responseText = (response.text || "").trim();
      let parsedNews: NewsItem[] = [];

      try {
         parsedNews = JSON.parse(responseText);
      } catch (parseErr) {
         console.log("Parsed Gemini news JSON was slightly non-compliant. Attempting structural cleanup...");
         let cleanText = responseText;
         if (cleanText.includes("```")) {
           cleanText = cleanText.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
           parsedNews = JSON.parse(cleanText);
         }
      }

      const webChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const citations = webChunks.map((c: any) => ({
        title: c.web?.title || "",
        uri: c.web?.uri || ""
      })).filter((c: any) => c.uri);

      if (parsedNews && Array.isArray(parsedNews) && parsedNews.length > 0) {
        const validatedNews = parsedNews.map((item: any, idx) => ({
          title: String(item.title || `Academic Update #${idx + 1}`),
          date: String(item.date || "2026 Academic Calendar"),
          sourceName: String(item.sourceName || "Academic Index"),
          url: String(item.url || citations[idx % citations.length]?.uri || "https://www.iubrussels.org"),
          summary: String(item.summary || "Latest educational research and developments in distance learning systems across Europe."),
          category: ["conference", "news", "academic"].includes(item.category) ? item.category : "news"
        }));

        newsCache = {
          data: validatedNews,
          timestamp: Date.now()
        };

        return res.json({ news: validatedNews, source: "gemini", citations, timestamp: newsCache.timestamp });
      }

    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isQuotaOrDemand = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("503") || errMsg.includes("UNAVAILABLE");
      
      if (isQuotaOrDemand) {
        geminiDisabledUntil = Date.now() + 5 * 60 * 1000; // bypass Gemini for 5 mins
        console.log("Gemini News search grounding hit limits. Bypassing Gemini to standard fallback.");
      } else {
        console.log("Gemini News search grounding failed (falling back to standard generation). Details:", errMsg);
        
        // 2. Fallback to standard Gemini generation WITHOUT the search grounding tool
        try {
          console.log("Generating academic news via standard non-grounded model...");
          const standardPrompt = `Generate between 4 and 6 realistic and high-quality upcoming academic events, conferences, seminars, or news bulletins for 2025/2026/2027 focused on Islamic Theology, Sharia Sciences, higher digital education, or distance learning in Western Europe.
Format the output strictly as a JSON array of objects. Do not wrap the JSON in Markdown formatting like \`\`\`json. Return only the raw JSON.

Each object in the array MUST have this exact TypeScript structure:
{
  "title": string (title of the news/conference/seminar),
  "date": string (exact date or month/year of the event),
  "sourceName": string (original academic institution, host, or publishing source),
  "url": string (full absolute URL reference such as a real subpage on university-brussels.org or https://www.iubrussels.org),
  "summary": string (a concise 1-2 sentence description explaining its significance to modern Islamic studies or distance learning in Europe),
  "category": "conference" | "news" | "academic"
}`;

          const response2 = await aiClient.models.generateContent({
            model: "gemini-3.5-flash",
            contents: standardPrompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.7,
            }
          });

          const responseText2 = (response2.text || "").trim();
          let parsedNews2: NewsItem[] = [];

          try {
            parsedNews2 = JSON.parse(responseText2);
          } catch (parse2Err) {
            let cleanText2 = responseText2;
            if (cleanText2.includes("```")) {
              cleanText2 = cleanText2.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
              parsedNews2 = JSON.parse(cleanText2);
            }
          }

          if (parsedNews2 && Array.isArray(parsedNews2) && parsedNews2.length > 0) {
            const validatedNews2 = parsedNews2.map((item: any, idx) => ({
              title: String(item.title || `Academic Update #${idx + 1}`),
              date: String(item.date || "2026-2027 Academic Calendar"),
              sourceName: String(item.sourceName || "Academic Index"),
              url: String(item.url || "https://www.iubrussels.org"),
              summary: String(item.summary || "Latest educational research and developments in distance learning systems across Europe."),
              category: ["conference", "news", "academic"].includes(item.category) ? item.category : "news"
            }));

            newsCache = {
              data: validatedNews2,
              timestamp: Date.now()
            };

            return res.json({ news: validatedNews2, source: "gemini", citations: [], timestamp: newsCache.timestamp });
          }
        } catch (innerErr: any) {
          const innerMsg = innerErr?.message || String(innerErr);
          if (innerMsg.includes("429") || innerMsg.includes("RESOURCE_EXHAUSTED") || innerMsg.includes("503") || innerMsg.includes("UNAVAILABLE")) {
            geminiDisabledUntil = Date.now() + 5 * 60 * 1000;
          }
          console.log("Both grounded and standard Gemini news generation failed or were throttled. Details:", innerMsg);
        }
      }
    }
  }

  // 3. High-quality structured hardcoded fallback
  console.log("Serving pre-verified local academic news fallback data.");
  return res.json({ news: FALLBACK_NEWS, source: "fallback", timestamp: Date.now() });
});

// Applications endpoints with JSON database persistence
app.get("/api/applications", (req, res) => {
  const apps = getApplications();
  res.json({ success: true, applications: apps });
});

app.post("/api/applications", (req, res) => {
  const { application } = req.body;
  if (!application || !application.id) {
    return res.status(400).json({ success: false, error: "Invalid application payload" });
  }
  const apps = getApplications();
  // Filter out any existing match with same ID to prevent duplicates on double-submit
  const cleaned = apps.filter((a: any) => a.id !== application.id);
  const updated = [application, ...cleaned];
  saveApplications(updated);
  console.log(`Saved new application: ${application.id} for ${application.fullName}`);
  res.json({ success: true, application });
});

app.patch("/api/applications/status", (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) {
    return res.status(400).json({ success: false, error: "Missing ID or status" });
  }
  let apps = getApplications();
  let found = false;
  apps = apps.map((a: any) => {
    if (a.id === id) {
      found = true;
      return { ...a, status };
    }
    return a;
  });
  if (!found) {
    return res.status(444).json({ success: false, error: "Application not found" });
  }
  saveApplications(apps);
  console.log(`Updated application (${id}) status to: ${status}`);
  res.json({ success: true, id, status });
});

app.delete("/api/applications/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, error: "Missing application ID" });
  }
  const apps = getApplications();
  const filtered = apps.filter((a: any) => a.id !== id);
  saveApplications(filtered);
  console.log(`Deleted application: ${id}`);
  res.json({ success: true, id });
});

// Serve static assets from build directory and handle Vite dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static build serving from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
