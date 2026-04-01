import {
  CheckCircle2,
  Compass,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChatLead } from "../backend.d";
import { useSubmitChatLead } from "../hooks/useQueries";

type Lang = "en" | "hi" | "bn" | "ta" | "te" | "ml";

const LANG_OPTIONS: { code: Lang; label: string; speechCode: string }[] = [
  { code: "en", label: "English", speechCode: "en-IN" },
  { code: "hi", label: "हिन्दी", speechCode: "hi-IN" },
  { code: "bn", label: "বাংলা", speechCode: "bn-IN" },
  { code: "ta", label: "தமிழ்", speechCode: "ta-IN" },
  { code: "te", label: "తెలుగు", speechCode: "te-IN" },
  { code: "ml", label: "മലയാളം", speechCode: "ml-IN" },
];

const EN_RESPONSES: Record<string, string> = {
  greeting:
    "Hello! Great to chat with you! Ask me about our amazing tour packages.",
  packages:
    "We offer tours to 3 amazing destinations: Andaman & Nicobar (from ₹12,999), Lakshadweep (from ₹24,999), and North-East India (from ₹19,999). Which destination interests you?",
  andaman:
    "Andaman packages: Andaman Escape (3D/4N from ₹12,999), Andaman Explorer (4D/5N from ₹18,999), Andaman Premium (5D/6N from ₹26,999). Click 'Book Now' on any package to enquire!",
  lakshadweep:
    "Lakshadweep packages: Getaway (3D/4N from ₹24,999), Explorer (5D/6N from ₹39,999), Premium (7D/8N from ₹58,999). Entry permit required.",
  northeast:
    "North-East packages: NE Sampler (4D/5N from ₹19,999), NE Odyssey (6D/7N from ₹32,999), NE Grand Tour (9D/10N from ₹52,999). ILP required for Arunachal Pradesh.",
  cruise:
    "Andaman Cruise packages: 3-night (from ₹32,999), 5-night (from ₹49,999), 7-night (from ₹68,999). Luxury cabin options available!",
  book: "To book, click the 'Book Now' button on any package card. You can also WhatsApp us at +91-9160393773 or email info@holidaypulse.ind",
  price:
    "Our packages start at ₹12,999 (Andaman), ₹19,999 (North-East), ₹24,999 (Lakshadweep). All prices per person on twin sharing.",
  inclusion:
    "Packages typically include: accommodation, meals (as specified), all transfers, sightseeing, arrival assistance. Airfare is excluded.",
  permit:
    "Andaman: No permit needed for Indian citizens. Lakshadweep: Entry Permit required. North-East: ILP required for Arunachal Pradesh.",
  season:
    "Best time: Andaman (Oct-May), Lakshadweep (Nov-Mar), North-East (Mar-Jun & Sep-Nov). Avoid monsoon for island destinations.",
  contact:
    "📞 +91-9160393773 | 📧 info@holidaypulse.ind | 🌐 www.holidaypulse.ind. Available 9am-7pm IST.",
  default:
    "I can help you with tour packages for Andaman, Lakshadweep, North-East India, and Andaman Cruise. Ask about packages, prices, booking, permits, or best travel time!",
};

function detectIntent(msg: string): string {
  const m = msg.toLowerCase();
  if (/hello|hi\b|hey|namaste|help/.test(m)) return "greeting";
  if (/cruise|ship|sail/.test(m)) return "cruise";
  if (/package|tour|destination|holiday/.test(m)) return "packages";
  if (/andaman/.test(m)) return "andaman";
  if (/lakshadweep/.test(m)) return "lakshadweep";
  if (/north.?east|northeast|meghalaya|assam|sikkim|arunachal/.test(m))
    return "northeast";
  if (/book|booking|enquir|reserve/.test(m)) return "book";
  if (/price|cost|rate|cheap|budget/.test(m)) return "price";
  if (/includ|inclusion/.test(m)) return "inclusion";
  if (/visa|permit/.test(m)) return "permit";
  if (/best.?time|when|season/.test(m)) return "season";
  if (/contact|phone|whatsapp|email/.test(m)) return "contact";
  return "default";
}

async function translateText(
  text: string,
  targetLang: string,
): Promise<{ translated: string; failed: boolean }> {
  if (targetLang === "en") return { translated: text, failed: false };
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
      return { translated: data.responseData.translatedText, failed: false };
    }
    return { translated: text, failed: true };
  } catch {
    return { translated: text, failed: true };
  }
}

type ProfilingStep = 1 | 2 | 3 | 4 | 5 | "done";

interface ProfilingData {
  destination: string;
  groupSize: string;
  travelTimeframe: string;
  experienceType: string;
  name: string;
  email: string;
  phone: string;
}

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  chips?: string[];
  showForm?: boolean;
  isTranslating?: boolean;
  translationFailed?: boolean;
  isSummary?: boolean;
  summaryData?: ProfilingData;
}

const STEP_QUESTIONS: Record<number, string> = {
  1: "Where would you like to go? 🗺️",
  2: "How many travellers are in your group? 👥",
  3: "When are you planning to travel? 📅",
  4: "What kind of experience are you looking for? ✨",
  5: "Almost done! Please share your details so our travel expert can craft a personalised itinerary for you. 📋",
};

const STEP_CHIPS: Record<number, string[]> = {
  1: [
    "🏝️ Andaman & Nicobar",
    "🌊 Lakshadweep",
    "🏔️ North-East India",
    "🚢 Andaman Cruise",
    "🌍 Not sure yet",
  ],
  2: ["Solo (1)", "Couple (2)", "Small Group (3-5)", "Large Group (6+)"],
  3: ["Within 1 month", "1-3 months", "3-6 months", "6+ months"],
  4: [
    "🤿 Adventure & Water Sports",
    "🏖️ Relaxation & Beach",
    "🌿 Nature & Wildlife",
    "📸 Photography & Culture",
    "🎉 Honeymoon Special",
  ],
};

let msgCounter = 0;
function newMsg(partial: Omit<Message, "id">): Message {
  return { id: ++msgCounter, ...partial };
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [profilingStep, setProfilingStep] = useState<ProfilingStep>(1);
  const [profiling, setProfiling] = useState<ProfilingData>({
    destination: "",
    groupSize: "",
    travelTimeframe: "",
    experienceType: "",
    name: "",
    email: "",
    phone: "",
  });
  const [step5Name, setStep5Name] = useState("");
  const [step5Email, setStep5Email] = useState("");
  const [step5Phone, setStep5Phone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const submitLead = useSubmitChatLead();

  // Init profiling flow when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        newMsg({
          role: "bot",
          text: "Namaste! 🙏 I'm **YATRIK**, your AI travel companion from Holiday Pulse! I'd love to understand your dream trip so I can suggest the perfect package for you. Let's start!",
        }),
        newMsg({
          role: "bot",
          text: STEP_QUESTIONS[1],
          chips: STEP_CHIPS[1],
        }),
      ]);
      setProfilingStep(1);
    }
  }, [open, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    const langObj = LANG_OPTIONS.find((l) => l.code === lang);
    const doSpeak = (voices: SpeechSynthesisVoice[]) => {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        if (langObj) {
          const match = voices.find(
            (v) =>
              v.lang.startsWith(langObj.speechCode.split("-")[0]) ||
              v.lang === langObj.speechCode,
          );
          utter.lang = match?.lang ?? langObj.speechCode;
          if (match) utter.voice = match;
        }
        window.speechSynthesis.speak(utter);
      } catch {
        // ignore
      }
    };
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        doSpeak(window.speechSynthesis.getVoices());
      };
    }
  };

  const addBotMessage = async (
    englishText: string,
    extra?: Partial<Message>,
  ) => {
    if (lang === "en") {
      setMessages((prev) => [
        ...prev,
        newMsg({ role: "bot", text: englishText, ...extra }),
      ]);
      speakText(englishText);
      return;
    }
    // Show translating indicator
    const placeholderId = ++msgCounter;
    setMessages((prev) => [
      ...prev,
      { id: placeholderId, role: "bot", text: "", isTranslating: true },
    ]);
    const { translated, failed } = await translateText(englishText, lang);
    const finalText = failed
      ? `${englishText}\n\n_(Translation unavailable — showing in English)_`
      : translated;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === placeholderId
          ? {
              ...m,
              text: finalText,
              isTranslating: false,
              translationFailed: failed,
              ...extra,
            }
          : m,
      ),
    );
    speakText(finalText);
  };

  const handleChipSelect = async (chip: string) => {
    setMessages((prev) => [...prev, newMsg({ role: "user", text: chip })]);

    if (profilingStep === 1) {
      // destination stored in chip directly
      setProfiling((p) => ({ ...p, destination: chip }));
      setProfilingStep(2);
      setTyping(true);
      await new Promise((r) => setTimeout(r, 600));
      setTyping(false);
      await addBotMessage(STEP_QUESTIONS[2], { chips: STEP_CHIPS[2] });
      // Add chips separately after message
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return prev.map((m) =>
          m.id === last.id ? { ...m, chips: STEP_CHIPS[2] } : m,
        );
      });
    } else if (profilingStep === 2) {
      setProfiling((p) => ({ ...p, groupSize: chip }));
      setProfilingStep(3);
      setTyping(true);
      await new Promise((r) => setTimeout(r, 600));
      setTyping(false);
      await addBotMessage(STEP_QUESTIONS[3], { chips: STEP_CHIPS[3] });
    } else if (profilingStep === 3) {
      setProfiling((p) => ({ ...p, travelTimeframe: chip }));
      setProfilingStep(4);
      setTyping(true);
      await new Promise((r) => setTimeout(r, 600));
      setTyping(false);
      await addBotMessage(STEP_QUESTIONS[4], { chips: STEP_CHIPS[4] });
    } else if (profilingStep === 4) {
      setProfiling((p) => ({ ...p, experienceType: chip }));
      setProfilingStep(5);
      setTyping(true);
      await new Promise((r) => setTimeout(r, 600));
      setTyping(false);
      await addBotMessage(STEP_QUESTIONS[5], { showForm: true });
    }
  };

  const handleStep5Submit = async () => {
    if (!step5Name.trim() || !step5Phone.trim()) return;
    const finalProfiling: ProfilingData = {
      ...profiling,
      name: step5Name.trim(),
      email: step5Email.trim(),
      phone: step5Phone.trim(),
    };
    setProfiling(finalProfiling);

    setMessages((prev) =>
      prev.map((m) => (m.showForm ? { ...m, showForm: false } : m)),
    );
    setMessages((prev) => [
      ...prev,
      newMsg({
        role: "user",
        text: `Name: ${finalProfiling.name} | Email: ${finalProfiling.email || "—"} | Phone: ${finalProfiling.phone}`,
      }),
    ]);

    setTyping(true);
    // Submit lead to backend
    const lead: ChatLead = {
      id: 0n,
      name: finalProfiling.name,
      email: finalProfiling.email,
      phone: finalProfiling.phone,
      destination: finalProfiling.destination,
      groupSize: finalProfiling.groupSize,
      travelTimeframe: finalProfiling.travelTimeframe,
      experienceType: finalProfiling.experienceType,
      additionalNotes: "",
      timestamp: 0n,
    };
    try {
      await submitLead.mutateAsync(lead);
      setLeadSubmitted(true);
    } catch {
      // continue even if backend fails
    }

    await new Promise((r) => setTimeout(r, 800));
    setTyping(false);
    setProfilingStep("done");

    setMessages((prev) => [
      ...prev,
      newMsg({
        role: "bot",
        text: `Thanks ${finalProfiling.name}! Our travel expert will reach out to you within 24 hours. 🌴`,
        isSummary: true,
        summaryData: finalProfiling,
      }),
    ]);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, newMsg({ role: "user", text: trimmed })]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 900));
    setTyping(false);
    const intent = detectIntent(trimmed);
    const response = EN_RESPONSES[intent] ?? EN_RESPONSES.default;
    await addBotMessage(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  const startVoiceInput = () => {
    if (typeof window === "undefined") return;
    try {
      const SR =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SR) return;
      const recognition = new SR();
      const langObj = LANG_OPTIONS.find((l) => l.code === lang);
      recognition.lang = langObj?.speechCode ?? "en-IN";
      recognition.interimResults = false;
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript as string;
        setInput((prev) => `${prev}${transcript}`);
        setMicActive(false);
      };
      recognition.onerror = () => setMicActive(false);
      recognition.onend = () => setMicActive(false);
      recognitionRef.current = recognition;
      recognition.start();
      setMicActive(true);
    } catch {
      setMicActive(false);
    }
  };

  const stopVoiceInput = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
    setMicActive(false);
  };

  const buildWhatsAppMessage = (data: ProfilingData) => {
    const lines = [
      "🌴 *Holiday Pulse — Trip Enquiry*",
      "",
      `👤 Name: ${data.name}`,
      `📧 Email: ${data.email || "—"}`,
      `📱 Phone: ${data.phone}`,
      `🗺️ Destination: ${data.destination}`,
      `👥 Group Size: ${data.groupSize}`,
      `📅 Travel Timeframe: ${data.travelTimeframe}`,
      `✨ Experience: ${data.experienceType}`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        data-ocid="chatbot.open_modal_button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Open YATRIK travel chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="compass"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Compass className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="chatbot.dialog"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-[9998] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-sm leading-none">
                    YATRIK
                  </p>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-teal-100 text-xs mt-0.5">
                  Your AI Travel Companion
                </p>
              </div>
              {/* Language selector */}
              <select
                data-ocid="chatbot.select"
                value={lang}
                onChange={(e) => {
                  const newLang = e.target.value as Lang;
                  setLang(newLang);
                }}
                className="bg-white/20 text-white text-xs rounded-lg px-2 py-1 border border-white/30 focus:outline-none cursor-pointer"
              >
                {LANG_OPTIONS.map((l) => (
                  <option
                    key={l.code}
                    value={l.code}
                    className="bg-teal-700 text-white"
                  >
                    {l.label}
                  </option>
                ))}
              </select>
              {/* Voice toggle */}
              <button
                type="button"
                data-ocid="chatbot.toggle"
                onClick={() => setVoiceEnabled((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                title={voiceEnabled ? "Mute voice" : "Enable voice"}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              {/* Close */}
              <button
                type="button"
                data-ocid="chatbot.close_button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.isTranslating ? (
                      <div
                        data-ocid="chatbot.loading_state"
                        className="bg-white text-gray-500 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-100 text-sm"
                      >
                        <span className="inline-flex gap-1 items-center">
                          <span className="text-xs text-teal-600 mr-1">
                            Translating
                          </span>
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </span>
                      </div>
                    ) : msg.isSummary && msg.summaryData ? (
                      <div className="max-w-[92%] bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-semibold">
                            Trip Profile Saved! ✅
                          </span>
                        </div>
                        <div className="p-3 space-y-1.5">
                          <p className="text-gray-800 text-sm font-medium">
                            {msg.text}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 mt-2">
                            {[
                              ["🗺️ Destination", msg.summaryData.destination],
                              ["👥 Group", msg.summaryData.groupSize],
                              ["📅 Travel", msg.summaryData.travelTimeframe],
                              ["✨ Experience", msg.summaryData.experienceType],
                              ["📱 Phone", msg.summaryData.phone],
                              ["📧 Email", msg.summaryData.email || "—"],
                            ].map(([label, value]) => (
                              <div
                                key={label}
                                className="bg-gray-50 rounded-lg p-2"
                              >
                                <p className="text-[10px] text-gray-400 font-medium">
                                  {label}
                                </p>
                                <p className="text-xs text-gray-700 font-semibold truncate">
                                  {value}
                                </p>
                              </div>
                            ))}
                          </div>
                          <a
                            href={`https://wa.me/919160393773?text=${buildWhatsAppMessage(msg.summaryData)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-ocid="chatbot.button"
                            className="mt-2 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-current"
                              role="img"
                              aria-label="WhatsApp"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-teal-600 text-white rounded-tr-sm"
                            : "bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                  </div>

                  {/* Step form (Step 5) */}
                  {msg.showForm && profilingStep === 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-2"
                      data-ocid="chatbot.panel"
                    >
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={step5Name}
                        onChange={(e) => setStep5Name(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                        data-ocid="chatbot.input"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={step5Email}
                        onChange={(e) => setStep5Email(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                        data-ocid="chatbot.input"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp/Mobile Number *"
                        value={step5Phone}
                        onChange={(e) => setStep5Phone(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                        data-ocid="chatbot.input"
                      />
                      <button
                        type="button"
                        onClick={handleStep5Submit}
                        disabled={!step5Name.trim() || !step5Phone.trim()}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                        data-ocid="chatbot.submit_button"
                      >
                        Submit & Get My Trip Plan 🌴
                      </button>
                    </motion.div>
                  )}

                  {/* Chips */}
                  {msg.chips &&
                    msg.chips.length > 0 &&
                    profilingStep !== "done" && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.chips.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleChipSelect(chip)}
                            className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-full transition-colors font-medium"
                            data-ocid="chatbot.button"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div
                    data-ocid="chatbot.loading_state"
                    className="bg-white text-gray-500 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-100 text-sm"
                  >
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area — only shown after profiling is done */}
            {profilingStep === "done" && (
              <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-100 flex-shrink-0">
                <input
                  type="text"
                  data-ocid="chatbot.input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your trip..."
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
                <button
                  type="button"
                  data-ocid="chatbot.button"
                  onClick={micActive ? stopVoiceInput : startVoiceInput}
                  className={`p-2 rounded-xl transition-colors ${
                    micActive
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  title={micActive ? "Stop recording" : "Start voice input"}
                >
                  {micActive ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="chatbot.submit_button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden indicator for lead submission state */}
      {leadSubmitted && (
        <span data-ocid="chatbot.success_state" className="sr-only">
          Lead submitted
        </span>
      )}
    </>
  );
}
