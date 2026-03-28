import {
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Lang = "en" | "hi" | "bn" | "ta" | "te" | "ml";

const LANG_OPTIONS: { code: Lang; label: string; speechCode: string }[] = [
  { code: "en", label: "English", speechCode: "en-IN" },
  { code: "hi", label: "हिन्दी", speechCode: "hi-IN" },
  { code: "bn", label: "বাংলা", speechCode: "bn-IN" },
  { code: "ta", label: "தமிழ்", speechCode: "ta-IN" },
  { code: "te", label: "తెలుగు", speechCode: "te-IN" },
  { code: "ml", label: "മലയാളം", speechCode: "ml-IN" },
];

const GREETINGS: Record<Lang, string> = {
  en: "Hello! I'm your HolidayPulse travel assistant. Ask me about our tours to Andaman, Lakshadweep & North-East India! 🌊",
  hi: "नमस्ते! मैं आपका HolidayPulse यात्रा सहायक हूं। अंडमान, लक्षद्वीप और पूर्वोत्तर भारत के बारे में पूछें! 🌊",
  bn: "নমস্কার! আমি আপনার HolidayPulse ট্র্যাভেল সহায়ক। আন্দামান, লাক্ষাদ্বীপ ও উত্তর-পূর্ব ভারত সম্পর্কে জিজ্ঞেস করুন! 🌊",
  ta: "வணக்கம்! நான் உங்கள் HolidayPulse பயண உதவியாளர். அந்தமான், லட்சத்தீவு & வடகிழக்கு இந்தியா பற்றி கேளுங்கள்! 🌊",
  te: "నమస్కారం! నేను మీ HolidayPulse ట్రావెల్ అసిస్టెంట్. అండమాన్, లక్షద్వీప్ & ఈశాన్య భారతదేశం గురించి అడగండి! 🌊",
  ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ HolidayPulse ട്രാവൽ അസിസ്റ്റന്റ് ആണ്. അണ്ടമാൻ, ലക്ഷദ്വീപ് & വടക്കുകിഴക്കൻ ഭാരതം ഗുറിച്ച് ചോദിക്കൂ! 🌊",
};

const EN_RESPONSES: Record<string, string> = {
  greeting:
    "Hello! I'm your HolidayPulse travel assistant. Ask me about our tours to Andaman, Lakshadweep & North-East India! 🌊",
  packages:
    "We offer tours to 3 amazing destinations: Andaman & Nicobar (packages from ₹12,999), Lakshadweep (from ₹24,999), and North-East India (from ₹19,999). Which destination interests you?",
  andaman:
    "Andaman packages: Andaman Escape (3D/4N from ₹12,999), Andaman Explorer (4D/5N from ₹18,999), Andaman Premium (5D/6N from ₹26,999). Click 'Book Now' on any package to enquire!",
  lakshadweep:
    "Lakshadweep packages: Getaway (3D/4N from ₹24,999), Explorer (5D/6N from ₹39,999), Premium (7D/8N from ₹58,999). Permit required for entry.",
  northeast:
    "North-East packages: NE Sampler (4D/5N from ₹19,999), NE Odyssey (6D/7N from ₹32,999), NE Grand Tour (9D/10N from ₹52,999). ILP required for Arunachal Pradesh.",
  book: "To book, click the 'Book Now' button on any package card. You can also WhatsApp us or call +91-9160393773 or email info@holidaypulse.ind",
  price:
    "Our packages start at ₹12,999 (Andaman), ₹19,999 (North-East), ₹24,999 (Lakshadweep). All prices per person on twin sharing.",
  inclusion:
    "Packages typically include: accommodation, meals (as specified), all transfers, sightseeing, arrival assistance. Airfare is excluded from all packages.",
  permit:
    "Andaman: No permit needed for Indian citizens. Lakshadweep: Entry Permit required. North-East: Inner Line Permit (ILP) required for Arunachal Pradesh and some other areas.",
  season:
    "Best time: Andaman (Oct-May), Lakshadweep (Nov-Mar), North-East (Mar-Jun & Sep-Nov). Avoid monsoon season for island destinations.",
  contact:
    "📞 +91-9160393773 | 📧 info@holidaypulse.ind | 🌐 www.holidaypulse.ind. We're available 9am-7pm IST.",
  default:
    "I can help you with our tour packages for Andaman, Lakshadweep, and North-East India. Ask about packages, prices, booking, permits, or best travel time!",
};

const HI_RESPONSES: Record<string, string> = {
  greeting:
    "नमस्ते! मैं आपका HolidayPulse यात्रा सहायक हूं। अंडमान, लक्षद्वीप और पूर्वोत्तर भारत के बारे में पूछें! 🌊",
  packages:
    "हम 3 शानदार गंतव्यों की यात्रा प्रदान करते हैं: अंडमान और निकोबार (₹12,999 से), लक्षद्वीप (₹24,999 से), और पूर्वोत्तर भारत (₹19,999 से)। आप किस गंतव्य में रुचि रखते हैं?",
  andaman:
    "अंडमान पैकेज: अंडमान एस्केप (3D/4N ₹12,999 से), अंडमान एक्सप्लोरर (4D/5N ₹18,999 से), अंडमान प्रीमियम (5D/6N ₹26,999 से)। बुकिंग के लिए 'Book Now' पर क्लिक करें!",
  lakshadweep:
    "लक्षद्वीप पैकेज: गेटवे (3D/4N ₹24,999 से), एक्सप्लोरर (5D/6N ₹39,999 से), प्रीमियम (7D/8N ₹58,999 से)। प्रवेश के लिए परमिट आवश्यक है।",
  northeast:
    "पूर्वोत्तर पैकेज: NE सैम्पलर (4D/5N ₹19,999 से), NE ओडिसी (6D/7N ₹32,999 से), NE ग्रैंड टूर (9D/10N ₹52,999 से)। अरुणाचल प्रदेश के लिए ILP आवश्यक है।",
  book: "बुकिंग के लिए किसी भी पैकेज कार्ड पर 'Book Now' बटन दबाएं। आप WhatsApp या कॉल +91-9160393773 या email info@holidaypulse.ind भी कर सकते हैं।",
  price:
    "हमारे पैकेज ₹12,999 (अंडमान), ₹19,999 (पूर्वोत्तर), ₹24,999 (लक्षद्वीप) से शुरू होते हैं। सभी कीमतें प्रति व्यक्ति डबल शेयरिंग पर।",
  inclusion:
    "पैकेज में आमतौर पर शामिल हैं: आवास, भोजन (जैसा निर्दिष्ट), सभी स्थानांतरण, दर्शनीय स्थल, आगमन सहायता। हवाई किराया सभी पैकेज से बाहर है।",
  permit:
    "अंडमान: भारतीय नागरिकों को परमिट की जरूरत नहीं। लक्षद्वीप: प्रवेश परमिट आवश्यक। पूर्वोत्तर: अरुणाचल प्रदेश के लिए ILP जरूरी।",
  season:
    "सर्वोत्तम समय: अंडमान (अक्टूबर-मई), लक्षद्वीप (नवंबर-मार्च), पूर्वोत्तर (मार्च-जून और सितंबर-नवंबर)। द्वीपीय गंतव्यों के लिए मानसून से बचें।",
  contact:
    "📞 +91-9160393773 | 📧 info@holidaypulse.ind | 🌐 www.holidaypulse.ind. हम सुबह 9 बजे से शाम 7 बजे IST तक उपलब्ध हैं।",
  default:
    "मैं अंडमान, लक्षद्वीप और पूर्वोत्तर भारत के टूर पैकेज में आपकी मदद कर सकता हूं। पैकेज, कीमतें, बुकिंग, परमिट या यात्रा के सर्वोत्तम समय के बारे में पूछें!",
};

function detectIntent(msg: string): string {
  const m = msg.toLowerCase();
  if (/hello|hi\b|hey|namaste|help/.test(m)) return "greeting";
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

function getBotResponse(message: string, lang: Lang): string {
  const intent = detectIntent(message);
  if (lang === "hi") return HI_RESPONSES[intent] ?? HI_RESPONSES.default;
  if (lang === "en") return EN_RESPONSES[intent] ?? EN_RESPONSES.default;
  const langLabel = LANG_OPTIONS.find((l) => l.code === lang)?.label ?? lang;
  return `[${langLabel}] ${EN_RESPONSES[intent] ?? EN_RESPONSES.default}`;
}

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

let msgCounter = 0;
function newMsg(role: Message["role"], text: string): Message {
  return { id: ++msgCounter, role, text };
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const messagesLenRef = useRef(0);

  // Init greeting when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([newMsg("bot", GREETINGS[lang])]);
    }
  }, [open, messages.length, lang]);

  // Scroll to bottom whenever messages or typing changes
  useEffect(() => {
    if (messagesLenRef.current !== messages.length || typing) {
      messagesLenRef.current = messages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      const langObj = LANG_OPTIONS.find((l) => l.code === lang);
      if (langObj) utter.lang = langObj.speechCode;
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, newMsg("user", trimmed)]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(trimmed, lang);
      setTyping(false);
      setMessages((prev) => [...prev, newMsg("bot", response)]);
      speakText(response);
    }, 1000);
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

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        data-ocid="chatbot.open_modal_button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Open travel chatbot"
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
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
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
            className="fixed bottom-24 right-4 z-[9998] w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-teal-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-none">
                  HolidayPulse Assistant
                </p>
                <p className="text-teal-100 text-xs mt-0.5">
                  Ask me anything about tours
                </p>
              </div>
              {/* Language selector */}
              <select
                data-ocid="chatbot.select"
                value={lang}
                onChange={(e) => {
                  const newLang = e.target.value as Lang;
                  setLang(newLang);
                  setMessages([newMsg("bot", GREETINGS[newLang])]);
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
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-teal-600 text-white rounded-tr-sm"
                        : "bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
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

            {/* Input area */}
            <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-100 flex-shrink-0">
              <input
                type="text"
                data-ocid="chatbot.input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
