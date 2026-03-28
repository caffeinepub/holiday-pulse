import {
  Globe,
  MapPin,
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

// ── Language definitions ──────────────────────────────────────────────────
type LangCode =
  | "en"
  | "hi"
  | "bn"
  | "ta"
  | "te"
  | "ml"
  | "kn"
  | "mr"
  | "gu"
  | "pa"
  | "ur"
  | "ar"
  | "fr"
  | "es"
  | "pt"
  | "de"
  | "it"
  | "ru"
  | "zh"
  | "zh-TW"
  | "ja"
  | "ko"
  | "th"
  | "vi"
  | "id"
  | "ms"
  | "sw"
  | "tr"
  | "nl"
  | "pl"
  | "el"
  | "he"
  | "fa"
  | "ro"
  | "hu"
  | "cs"
  | "sk"
  | "uk"
  | "no"
  | "sv"
  | "da"
  | "fi"
  | "af"
  | "am"
  | "az"
  | "be"
  | "bg"
  | "bs"
  | "ca"
  | "cy"
  | "eo"
  | "et"
  | "eu"
  | "gl"
  | "hr"
  | "hy"
  | "is"
  | "ka"
  | "kk"
  | "km"
  | "lo"
  | "lt"
  | "lv"
  | "mk"
  | "mn"
  | "my"
  | "ne"
  | "si"
  | "sl"
  | "sq"
  | "sr"
  | "tl"
  | "uz"
  | "yo"
  | "zu";

interface LangOption {
  code: LangCode;
  label: string;
  native: string;
  speechCode: string;
}

const LANG_OPTIONS: LangOption[] = [
  { code: "en", label: "English", native: "English", speechCode: "en-IN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", speechCode: "bn-IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
  { code: "te", label: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", speechCode: "ml-IN" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", speechCode: "kn-IN" },
  { code: "mr", label: "Marathi", native: "मराठी", speechCode: "mr-IN" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", speechCode: "pa-IN" },
  { code: "ur", label: "Urdu", native: "اردو", speechCode: "ur-PK" },
  { code: "ar", label: "Arabic", native: "العربية", speechCode: "ar-SA" },
  { code: "fr", label: "French", native: "Français", speechCode: "fr-FR" },
  { code: "es", label: "Spanish", native: "Español", speechCode: "es-ES" },
  { code: "pt", label: "Portuguese", native: "Português", speechCode: "pt-BR" },
  { code: "de", label: "German", native: "Deutsch", speechCode: "de-DE" },
  { code: "it", label: "Italian", native: "Italiano", speechCode: "it-IT" },
  { code: "ru", label: "Russian", native: "Русский", speechCode: "ru-RU" },
  {
    code: "zh",
    label: "Chinese (Simplified)",
    native: "中文(简体)",
    speechCode: "zh-CN",
  },
  {
    code: "zh-TW",
    label: "Chinese (Traditional)",
    native: "中文(繁體)",
    speechCode: "zh-TW",
  },
  { code: "ja", label: "Japanese", native: "日本語", speechCode: "ja-JP" },
  { code: "ko", label: "Korean", native: "한국어", speechCode: "ko-KR" },
  { code: "th", label: "Thai", native: "ภาษาไทย", speechCode: "th-TH" },
  {
    code: "vi",
    label: "Vietnamese",
    native: "Tiếng Việt",
    speechCode: "vi-VN",
  },
  {
    code: "id",
    label: "Indonesian",
    native: "Bahasa Indonesia",
    speechCode: "id-ID",
  },
  { code: "ms", label: "Malay", native: "Bahasa Melayu", speechCode: "ms-MY" },
  { code: "sw", label: "Swahili", native: "Kiswahili", speechCode: "sw-KE" },
  { code: "tr", label: "Turkish", native: "Türkçe", speechCode: "tr-TR" },
  { code: "nl", label: "Dutch", native: "Nederlands", speechCode: "nl-NL" },
  { code: "pl", label: "Polish", native: "Polski", speechCode: "pl-PL" },
  { code: "el", label: "Greek", native: "Ελληνικά", speechCode: "el-GR" },
  { code: "he", label: "Hebrew", native: "עברית", speechCode: "he-IL" },
  { code: "fa", label: "Persian", native: "فارسی", speechCode: "fa-IR" },
  { code: "ro", label: "Romanian", native: "Română", speechCode: "ro-RO" },
  { code: "hu", label: "Hungarian", native: "Magyar", speechCode: "hu-HU" },
  { code: "cs", label: "Czech", native: "Čeština", speechCode: "cs-CZ" },
  { code: "sk", label: "Slovak", native: "Slovenčina", speechCode: "sk-SK" },
  { code: "uk", label: "Ukrainian", native: "Українська", speechCode: "uk-UA" },
  { code: "no", label: "Norwegian", native: "Norsk", speechCode: "nb-NO" },
  { code: "sv", label: "Swedish", native: "Svenska", speechCode: "sv-SE" },
  { code: "da", label: "Danish", native: "Dansk", speechCode: "da-DK" },
  { code: "fi", label: "Finnish", native: "Suomi", speechCode: "fi-FI" },
  { code: "af", label: "Afrikaans", native: "Afrikaans", speechCode: "af-ZA" },
  { code: "am", label: "Amharic", native: "አማርኛ", speechCode: "am-ET" },
  {
    code: "az",
    label: "Azerbaijani",
    native: "Azərbaycan",
    speechCode: "az-AZ",
  },
  {
    code: "be",
    label: "Belarusian",
    native: "Беларуская",
    speechCode: "be-BY",
  },
  { code: "bg", label: "Bulgarian", native: "Български", speechCode: "bg-BG" },
  { code: "bs", label: "Bosnian", native: "Bosanski", speechCode: "bs-BA" },
  { code: "ca", label: "Catalan", native: "Català", speechCode: "ca-ES" },
  { code: "cy", label: "Welsh", native: "Cymraeg", speechCode: "cy-GB" },
  { code: "et", label: "Estonian", native: "Eesti", speechCode: "et-EE" },
  { code: "eu", label: "Basque", native: "Euskara", speechCode: "eu-ES" },
  { code: "gl", label: "Galician", native: "Galego", speechCode: "gl-ES" },
  { code: "hr", label: "Croatian", native: "Hrvatski", speechCode: "hr-HR" },
  { code: "hy", label: "Armenian", native: "Հայերեն", speechCode: "hy-AM" },
  { code: "is", label: "Icelandic", native: "Íslenska", speechCode: "is-IS" },
  { code: "ka", label: "Georgian", native: "ქართული", speechCode: "ka-GE" },
  { code: "kk", label: "Kazakh", native: "Қазақша", speechCode: "kk-KZ" },
  { code: "km", label: "Khmer", native: "ភាសាខ្មែរ", speechCode: "km-KH" },
  { code: "lo", label: "Lao", native: "ລາວ", speechCode: "lo-LA" },
  { code: "lt", label: "Lithuanian", native: "Lietuvių", speechCode: "lt-LT" },
  { code: "lv", label: "Latvian", native: "Latviešu", speechCode: "lv-LV" },
  {
    code: "mk",
    label: "Macedonian",
    native: "Македонски",
    speechCode: "mk-MK",
  },
  { code: "mn", label: "Mongolian", native: "Монгол", speechCode: "mn-MN" },
  { code: "my", label: "Burmese", native: "မြန်မာ", speechCode: "my-MM" },
  { code: "ne", label: "Nepali", native: "नेपाली", speechCode: "ne-NP" },
  { code: "si", label: "Sinhala", native: "සිංහල", speechCode: "si-LK" },
  {
    code: "sl",
    label: "Slovenian",
    native: "Slovenščina",
    speechCode: "sl-SI",
  },
  { code: "sq", label: "Albanian", native: "Shqip", speechCode: "sq-AL" },
  { code: "sr", label: "Serbian", native: "Српски", speechCode: "sr-RS" },
  { code: "tl", label: "Filipino", native: "Filipino", speechCode: "fil-PH" },
  { code: "uz", label: "Uzbek", native: "O'zbek", speechCode: "uz-UZ" },
  { code: "yo", label: "Yoruba", native: "Yorùbá", speechCode: "yo-NG" },
  { code: "zu", label: "Zulu", native: "isiZulu", speechCode: "zu-ZA" },
];

// ── Destination coordinates ───────────────────────────────────────────────
const DESTINATIONS = [
  { name: "Andaman & Nicobar", lat: 11.7401, lng: 92.6586, flag: "🏝️" },
  { name: "Lakshadweep", lat: 10.5667, lng: 72.6417, flag: "🌊" },
  { name: "North-East India", lat: 26.2006, lng: 92.9376, flag: "🏔️" },
];

// ── Responses (English + key languages) ──────────────────────────────────
const RESPONSES: Record<string, Record<string, string>> = {
  greeting: {
    en: "Hi! I'm DARLING 💫, your Holiday Pulse travel guide. Ask me about Andaman, Lakshadweep or North-East India tours!",
    hi: "नमस्ते! मैं DARLING 💫 हूं, आपका Holiday Pulse ट्रैवल गाइड। अंडमान, लक्षद्वीप या पूर्वोत्तर भारत के बारे में पूछें!",
    bn: "হ্যালো! আমি DARLING 💫, আপনার Holiday Pulse ট্র্যাভেল গাইড। আন্দামান, লাক্ষাদ্বীপ বা উত্তর-পূর্ব ভারত সম্পর্কে জিজ্ঞেস করুন!",
    ta: "வணக்கம்! நான் DARLING 💫, உங்கள் Holiday Pulse பயண வழிகாட்டி. அந்தமான், லட்சத்தீவு அல்லது வடகிழக்கு இந்தியா பற்றி கேளுங்கள்!",
    te: "హలో! నేను DARLING 💫, మీ Holiday Pulse ట్రావెల్ గైడ్. అండమాన్, లక్షద్వీప్ లేదా ఈశాన్య భారతదేశం గురించి అడగండి!",
    ar: "مرحباً! أنا DARLING 💫، مرشدك السياحي في Holiday Pulse. اسألني عن جزر أندامان أو لكشادويب أو شمال شرق الهند!",
    fr: "Bonjour! Je suis DARLING 💫, votre guide de voyage Holiday Pulse. Posez-moi des questions sur Andaman, Lakshadweep ou le Nord-Est de l'Inde!",
    es: "¡Hola! Soy DARLING 💫, tu guía de viaje Holiday Pulse. ¡Pregúntame sobre Andaman, Lakshadweep o el Noreste de India!",
    zh: "你好！我是DARLING 💫，您的Holiday Pulse旅行向导。请询问关于安达曼、拉克沙群岛或印度东北部的旅游！",
    ja: "こんにちは！私はDARLING 💫、Holiday Pulseのトラベルガイドです。アンダマン、ラクシャドゥイープ、またはインド北東部についてお聞きください！",
    ko: "안녕하세요! 저는 DARLING 💫, Holiday Pulse 여행 가이드입니다. 안다만, 락샤드위프, 또는 인도 북동부에 대해 물어보세요!",
    de: "Hallo! Ich bin DARLING 💫, Ihr Holiday Pulse Reiseführer. Fragen Sie mich über Andaman, Lakshadweep oder Nordostindien!",
    ru: "Привет! Я DARLING 💫, ваш путеводитель Holiday Pulse. Спросите меня об Андаманских островах, Лакшадвипе или Северо-Восточной Индии!",
    pt: "Olá! Sou DARLING 💫, seu guia de viagem Holiday Pulse. Pergunte-me sobre Andaman, Lakshadweep ou o Nordeste da Índia!",
    default:
      "Hi! I'm DARLING 💫, your Holiday Pulse travel guide. Ask me about our tours to Andaman, Lakshadweep or North-East India!",
  },
  packages: {
    en: "We offer tours to 3 amazing destinations:\n🏝️ Andaman & Nicobar (from ₹12,999)\n🌊 Lakshadweep (from ₹24,999)\n🏔️ North-East India (from ₹19,999)\nWhich destination interests you?",
    hi: "हम 3 शानदार गंतव्यों की यात्रा प्रदान करते हैं:\n🏝️ अंडमान (₹12,999 से)\n🌊 लक्षद्वीप (₹24,999 से)\n🏔️ पूर्वोत्तर (₹19,999 से)\nआप किस जगह जाना चाहते हैं?",
    default:
      "We offer 3 amazing destinations:\n🏝️ Andaman & Nicobar (from ₹12,999)\n🌊 Lakshadweep (from ₹24,999)\n🏔️ North-East India (from ₹19,999)",
  },
  andaman: {
    en: "🏝️ Andaman & Nicobar (📍 11.7401°N, 92.6586°E)\n• Andaman Escape – 3D/4N from ₹12,999\n• Andaman Explorer – 4D/5N from ₹18,999\n• Andaman Premium – 5D/6N from ₹26,999\n\nNo permit needed for Indian citizens. Best time: Oct–May.",
    hi: "🏝️ अंडमान और निकोबार (📍 11.7401°N, 92.6586°E)\n• अंडमान एस्केप – 3D/4N ₹12,999 से\n• अंडमान एक्सप्लोरर – 4D/5N ₹18,999 से\n• अंडमान प्रीमियम – 5D/6N ₹26,999 से\n\nभारतीय नागरिकों को परमिट की आवश्यकता नहीं। सर्वोत्तम समय: अक्टूबर–मई।",
    default:
      "🏝️ Andaman & Nicobar (📍 11.7401°N, 92.6586°E)\nEscape (3D/4N ₹12,999), Explorer (4D/5N ₹18,999), Premium (5D/6N ₹26,999). Best time: Oct–May.",
  },
  lakshadweep: {
    en: "🌊 Lakshadweep (📍 10.5667°N, 72.6417°E)\n• Lakshadweep Getaway – 3D/4N from ₹24,999\n• Lakshadweep Explorer – 5D/6N from ₹39,999\n• Lakshadweep Premium – 7D/8N from ₹58,999\n\n⚠️ Entry Permit required. Best time: Nov–Mar.",
    hi: "🌊 लक्षद्वीप (📍 10.5667°N, 72.6417°E)\n• लक्षद्वीप गेटवे – 3D/4N ₹24,999 से\n• लक्षद्वीप एक्सप्लोरर – 5D/6N ₹39,999 से\n• लक्षद्वीप प्रीमियम – 7D/8N ₹58,999 से\n\n⚠️ प्रवेश परमिट आवश्यक है। सर्वोत्तम समय: नवंबर–मार्च।",
    default:
      "🌊 Lakshadweep (📍 10.5667°N, 72.6417°E)\nGetaway (3D/4N ₹24,999), Explorer (5D/6N ₹39,999), Premium (7D/8N ₹58,999). Entry Permit required.",
  },
  northeast: {
    en: "🏔️ North-East India (📍 26.2006°N, 92.9376°E)\n• NE Sampler – 4D/5N from ₹19,999\n• NE Odyssey – 6D/7N from ₹32,999\n• NE Grand Tour – 9D/10N from ₹52,999\n\n⚠️ ILP required for Arunachal Pradesh. Best time: Mar–Jun & Sep–Nov.",
    hi: "🏔️ पूर्वोत्तर भारत (📍 26.2006°N, 92.9376°E)\n• NE सैम्पलर – 4D/5N ₹19,999 से\n• NE ओडिसी – 6D/7N ₹32,999 से\n• NE ग्रैंड टूर – 9D/10N ₹52,999 से\n\n⚠️ अरुणाचल प्रदेश के लिए ILP जरूरी। सर्वोत्तम समय: मार्च–जून और सितंबर–नवंबर।",
    default:
      "🏔️ North-East India (📍 26.2006°N, 92.9376°E)\nSampler (4D/5N ₹19,999), Odyssey (6D/7N ₹32,999), Grand Tour (9D/10N ₹52,999). ILP required for some areas.",
  },
  location: {
    en: "📍 Our Destinations & Coordinates:\n🏝️ Andaman & Nicobar: 11.7401°N, 92.6586°E\n🌊 Lakshadweep: 10.5667°N, 72.6417°E\n🏔️ North-East India: 26.2006°N, 92.9376°E",
    default:
      "📍 Destination Coordinates:\n🏝️ Andaman: 11.7401°N, 92.6586°E\n🌊 Lakshadweep: 10.5667°N, 72.6417°E\n🏔️ North-East: 26.2006°N, 92.9376°E",
  },
  book: {
    en: "To book: Click 'Book Now' on any package card, or:\n📞 +91-9160393773\n📧 info@holidaypulse.ind\n🌐 www.holidaypulse.ind",
    hi: "बुकिंग के लिए किसी पैकेज पर 'Book Now' दबाएं, या:\n📞 +91-9160393773\n📧 info@holidaypulse.ind",
    default:
      "Click 'Book Now' on any package or contact us at +91-9160393773 | info@holidaypulse.ind",
  },
  contact: {
    en: "📞 +91-9160393773\n📧 info@holidaypulse.ind\n🌐 www.holidaypulse.ind\nAvailable 9am–7pm IST",
    default:
      "📞 +91-9160393773 | 📧 info@holidaypulse.ind | 🌐 www.holidaypulse.ind",
  },
  default: {
    en: "I can help with tours for Andaman, Lakshadweep, and North-East India. Ask about packages, prices, permits, coordinates, or best travel time! 🌏",
    hi: "मैं अंडमान, लक्षद्वीप और पूर्वोत्तर भारत के टूर में मदद कर सकता हूं। पैकेज, कीमत, परमिट या यात्रा के समय के बारे में पूछें!",
    default:
      "I can help with tours to Andaman, Lakshadweep, and North-East India. Ask about packages, prices, booking, permits, or travel times!",
  },
};

function getResponse(intent: string, lang: LangCode): string {
  const bucket = RESPONSES[intent] || RESPONSES.default;
  return bucket[lang] || bucket.default || RESPONSES.default.en;
}

function detectIntent(msg: string): string {
  const m = msg.toLowerCase();
  if (/hello|hi\b|hey|namaste|नमस्ते|help|darling/.test(m)) return "greeting";
  if (/package|tour|destination|holiday|all|destinations/.test(m))
    return "packages";
  if (/andaman/.test(m)) return "andaman";
  if (/lakshadweep|laksha/.test(m)) return "lakshadweep";
  if (
    /north.?east|northeast|meghalaya|assam|sikkim|arunachal|manipur|nagaland/.test(
      m,
    )
  )
    return "northeast";
  if (/lat|lon|coord|location|where|map|gps/.test(m)) return "location";
  if (/book|booking|enquir|reserve|whatsapp/.test(m)) return "book";
  if (/price|cost|rate|cheap|budget|₹/.test(m)) return "packages";
  if (/contact|phone|call|email/.test(m)) return "contact";
  return "default";
}

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
}

export default function DarlingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<LangCode>("en");
  const [langSearch, setLangSearch] = useState("");
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const langPickerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang)!;

  // Init greeting
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(getResponse("greeting", lang));
    }
  }, [open]);

  // Scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close lang picker on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        langPickerRef.current &&
        !langPickerRef.current.contains(e.target as Node)
      ) {
        setShowLangPicker(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function addBotMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "bot", text },
    ]);
    if (!muted) speak(text);
  }

  function speak(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(
        text.replace(/[\u{1F300}-\u{1FFFF}]/gu, ""),
      );
      utt.lang = currentLang.speechCode;
      window.speechSynthesis.speak(utt);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "user", text },
    ]);
    setInput("");
    const intent = detectIntent(text);
    setTimeout(() => addBotMessage(getResponse(intent, lang)), 600);
  }

  function handleLangChange(code: LangCode) {
    setLang(code);
    setShowLangPicker(false);
    setLangSearch("");
    setMessages([]);
    setTimeout(() => addBotMessage(getResponse("greeting", code)), 100);
  }

  function startListening() {
    type SRCtor = new () => {
      lang: string;
      interimResults: boolean;
      onresult:
        | ((e: {
            results: {
              [key: number]: { [key: number]: { transcript: string } };
            };
          }) => void)
        | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    const w = window as unknown as {
      SpeechRecognition?: SRCtor;
      webkitSpeechRecognition?: SRCtor;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = currentLang.speechCode;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  const filteredLangs = LANG_OPTIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearch.toLowerCase()),
  );

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center gap-0.5 text-white"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #7c3aed, #ec4899)",
            }}
          >
            <MessageCircle size={22} />
            <span className="text-[9px] font-bold tracking-wide">DARLING</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 520 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 text-white"
              style={{
                background:
                  "linear-gradient(135deg, #0ea5e9, #7c3aed, #ec4899)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  💫
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">DARLING</p>
                  <p className="text-xs text-white/80">
                    Holiday Pulse Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Lang picker */}
                <div ref={langPickerRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLangPicker((v) => !v)}
                    className="flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-full px-2 py-1 text-xs font-medium transition-colors"
                    title="Select language"
                  >
                    <Globe size={12} />
                    <span className="max-w-[60px] truncate">
                      {currentLang.native}
                    </span>
                  </button>
                  {showLangPicker && (
                    <div className="absolute right-0 top-8 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-2 border-b">
                        <input
                          className="w-full text-xs text-gray-800 px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-1 focus:ring-blue-300"
                          placeholder="Search language..."
                          value={langSearch}
                          onChange={(e) => setLangSearch(e.target.value)}
                          /* autoFocus removed */
                        />
                      </div>
                      <div className="overflow-y-auto max-h-52">
                        {filteredLangs.map((l) => (
                          <button
                            type="button"
                            key={l.code}
                            onClick={() => handleLangChange(l.code)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 flex items-center justify-between transition-colors ${
                              l.code === lang
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-700"
                            }`}
                          >
                            <span>{l.label}</span>
                            <span className="text-gray-400 ml-2">
                              {l.native}
                            </span>
                          </button>
                        ))}
                        {filteredLangs.length === 0 && (
                          <p className="text-center text-gray-400 text-xs py-4">
                            No language found
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Destinations bar */}
            <div className="flex gap-1 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 overflow-x-auto">
              {DESTINATIONS.map((d) => (
                <button
                  type="button"
                  key={d.name}
                  onClick={() => {
                    const intent = d.name.includes("Andaman")
                      ? "andaman"
                      : d.name.includes("Lakshadweep")
                        ? "lakshadweep"
                        : "northeast";
                    addBotMessage(getResponse(intent, lang));
                  }}
                  className="flex items-center gap-1 bg-white rounded-full px-2 py-1 text-xs text-gray-600 hover:bg-blue-100 whitespace-nowrap shadow-sm transition-colors border border-gray-200"
                >
                  <span>{d.flag}</span>
                  <span className="font-medium">{d.name.split(" ")[0]}</span>
                  <span className="text-gray-400 text-[10px]">{d.lat}°N</span>
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.from === "bot" && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-sm"
                      style={{
                        background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
                      }}
                    >
                      💫
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.from === "bot" && msg.text.includes("°") && (
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-500">
                        <MapPin size={10} />
                        <span>Coordinates shown above</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                className="flex-1 text-sm rounded-full border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                placeholder="Message DARLING..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                type="button"
                onClick={listening ? stopListening : startListening}
                className={`p-2 rounded-full transition-colors ${
                  listening
                    ? "bg-red-100 text-red-500 animate-pulse"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
              >
                {listening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
