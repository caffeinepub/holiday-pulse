import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  andamanCruisePackages,
  lakshadweepPackages,
  northeastPackages,
  staticPackages,
} from "../data/packages";
import type { PackageData } from "../data/packages";

type DestKey = "andaman" | "andaman-cruise" | "lakshadweep" | "northeast";

const allPackages: PackageData[] = [
  ...staticPackages,
  ...andamanCruisePackages,
  ...lakshadweepPackages,
  ...northeastPackages,
];

interface StepOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

interface WizardStep {
  id: number;
  question: string;
  subtitle: string;
  options: StepOption[];
}

const wizardSteps: WizardStep[] = [
  {
    id: 1,
    question: "Who's Traveling?",
    subtitle: "Tell us about your group",
    options: [
      {
        id: "solo",
        emoji: "🧳",
        label: "Solo Adventurer",
        description: "Independent explorer, own pace",
      },
      {
        id: "couple",
        emoji: "💑",
        label: "Couple",
        description: "Romantic escape for two",
      },
      {
        id: "family",
        emoji: "👨‍👩‍👧",
        label: "Family with Kids",
        description: "Fun for the whole family",
      },
      {
        id: "friends",
        emoji: "👫",
        label: "Friend Group",
        description: "Epic squad adventures",
      },
    ],
  },
  {
    id: 2,
    question: "What's Your Vibe?",
    subtitle: "Choose your travel style",
    options: [
      {
        id: "beach",
        emoji: "🌊",
        label: "Beach & Relaxation",
        description: "Pristine sands & turquoise water",
      },
      {
        id: "adventure",
        emoji: "🤿",
        label: "Thrilling Adventures",
        description: "Scuba, trekking & thrills",
      },
      {
        id: "culture",
        emoji: "🏔️",
        label: "Culture & Scenic",
        description: "Heritage, traditions & landscapes",
      },
      {
        id: "cruise",
        emoji: "🚢",
        label: "Cruise Experience",
        description: "Sail between stunning islands",
      },
    ],
  },
  {
    id: 3,
    question: "Budget Per Person?",
    subtitle: "We'll find the perfect value",
    options: [
      {
        id: "budget",
        emoji: "💰",
        label: "Budget-Friendly",
        description: "Under ₹20,000 per person",
      },
      {
        id: "midrange",
        emoji: "💳",
        label: "Mid-Range",
        description: "₹20K – ₹40K per person",
      },
      {
        id: "premium",
        emoji: "💎",
        label: "Premium ₹40K+",
        description: "Luxury experiences await",
      },
      {
        id: "nolimit",
        emoji: "🌟",
        label: "No Budget Limit",
        description: "Only the best will do!",
      },
    ],
  },
  {
    id: 4,
    question: "How Many Days?",
    subtitle: "Choose your ideal trip length",
    options: [
      {
        id: "short",
        emoji: "⚡",
        label: "Quick Escape",
        description: "3–4 Days of pure paradise",
      },
      {
        id: "medium",
        emoji: "🌅",
        label: "Sweet Spot",
        description: "5–6 Days, perfect balance",
      },
      {
        id: "long",
        emoji: "🗓️",
        label: "Extended Journey",
        description: "7–9 Days deep exploration",
      },
      {
        id: "flexible",
        emoji: "📅",
        label: "Flexible",
        description: "Any duration works!",
      },
    ],
  },
  {
    id: 5,
    question: "Dream Destination?",
    subtitle: "Where does your heart want to go?",
    options: [
      {
        id: "andaman",
        emoji: "🏝️",
        label: "Andaman Islands",
        description: "Tropical paradise & coral reefs",
      },
      {
        id: "lakshadweep",
        emoji: "🪸",
        label: "Lakshadweep",
        description: "Pristine lagoons & atolls",
      },
      {
        id: "northeast",
        emoji: "🏔️",
        label: "North-East India",
        description: "Mountains, culture & mystery",
      },
      {
        id: "surprise",
        emoji: "🎲",
        label: "Surprise Me!",
        description: "Let DARLING pick for you!",
      },
    ],
  },
];

function getDestKey(pkg: PackageData): DestKey {
  if (andamanCruisePackages.some((p) => p.id === pkg.id))
    return "andaman-cruise";
  if (lakshadweepPackages.some((p) => p.id === pkg.id)) return "lakshadweep";
  if (northeastPackages.some((p) => p.id === pkg.id)) return "northeast";
  return "andaman";
}

function getDestLabel(key: DestKey): string {
  const map: Record<DestKey, string> = {
    andaman: "Andaman Islands",
    "andaman-cruise": "Andaman Cruise",
    lakshadweep: "Lakshadweep",
    northeast: "North-East India",
  };
  return map[key];
}

function findMatch(answers: Record<number, string>): PackageData {
  const vibe = answers[2];
  const budget = answers[3];
  const days = answers[4];
  const destination = answers[5];

  // Step 1: filter by vibe
  let filtered = [...allPackages];
  if (vibe === "cruise") {
    filtered = allPackages.filter((p) =>
      andamanCruisePackages.some((c) => c.id === p.id),
    );
  } else if (vibe === "beach") {
    filtered = allPackages.filter((p) =>
      staticPackages.some((s) => s.id === p.id),
    );
  } else if (vibe === "culture") {
    filtered = allPackages.filter((p) =>
      northeastPackages.some((n) => n.id === p.id),
    );
  } else if (vibe === "adventure") {
    filtered = allPackages.filter(
      (p) =>
        staticPackages.some((s) => s.id === p.id) ||
        lakshadweepPackages.some((l) => l.id === p.id),
    );
  }

  // Step 2: destination override
  if (destination && destination !== "surprise") {
    let destFiltered: PackageData[] = [];
    if (destination === "andaman") {
      destFiltered = filtered.filter((p) =>
        staticPackages.some((s) => s.id === p.id),
      );
    } else if (destination === "lakshadweep") {
      destFiltered = filtered.filter((p) =>
        lakshadweepPackages.some((l) => l.id === p.id),
      );
    } else if (destination === "northeast") {
      destFiltered = filtered.filter((p) =>
        northeastPackages.some((n) => n.id === p.id),
      );
    }
    if (destFiltered.length > 0) filtered = destFiltered;
    else {
      // Vibe/destination conflict — reset to all and filter by destination only
      if (destination === "andaman") filtered = [...staticPackages];
      else if (destination === "lakshadweep")
        filtered = [...lakshadweepPackages];
      else if (destination === "northeast") filtered = [...northeastPackages];
    }
  }

  // Step 3: budget filter
  let budgetFiltered = [...filtered];
  if (budget === "budget")
    budgetFiltered = filtered.filter((p) => p.price <= 20000);
  else if (budget === "midrange")
    budgetFiltered = filtered.filter(
      (p) => p.price > 20000 && p.price <= 40000,
    );
  else if (budget === "premium")
    budgetFiltered = filtered.filter((p) => p.price > 40000);
  if (budgetFiltered.length > 0) filtered = budgetFiltered;

  // Step 4: days filter
  let daysFiltered = [...filtered];
  if (days === "short") daysFiltered = filtered.filter((p) => p.days <= 4);
  else if (days === "medium")
    daysFiltered = filtered.filter((p) => p.days >= 5 && p.days <= 6);
  else if (days === "long") daysFiltered = filtered.filter((p) => p.days >= 7);
  if (daysFiltered.length > 0) return daysFiltered[0];

  // Relax days — use budget + vibe result
  if (filtered.length > 0) return filtered[0];

  // Relax budget — try any from vibe
  const vibeOnly = [
    ...allPackages.filter((p) =>
      vibe === "cruise"
        ? andamanCruisePackages.some((c) => c.id === p.id)
        : vibe === "culture"
          ? northeastPackages.some((n) => n.id === p.id)
          : staticPackages.some((s) => s.id === p.id),
    ),
  ];
  if (vibeOnly.length > 0) return vibeOnly[0];

  // Ultimate fallback
  return allPackages[0];
}

function getPersonalizedReasons(
  answers: Record<number, string>,
  pkg: PackageData,
): string[] {
  const reasons: string[] = [];
  const travelerMap: Record<string, string> = {
    solo: "Solo Traveler Friendly",
    couple: "Perfect for Couples",
    family: "Family Friendly",
    friends: "Great for Groups",
  };
  const vibeMap: Record<string, string> = {
    beach: "Beach & Relaxation",
    adventure: "Adventure Packed",
    culture: "Culture & Scenery",
    cruise: "Cruise Experience",
  };
  if (answers[1] && travelerMap[answers[1]])
    reasons.push(`✓ ${travelerMap[answers[1]]}`);
  if (answers[2] && vibeMap[answers[2]])
    reasons.push(`✓ ${vibeMap[answers[2]]}`);
  reasons.push(`✓ ${pkg.duration}`);
  return reasons;
}

const confettiParticles = [
  { n: 1, color: "#2FA7A0", delay: "0s" },
  { n: 2, color: "#E57B6F", delay: "0.1s" },
  { n: 3, color: "#F59E0B", delay: "0.05s" },
  { n: 4, color: "#3B82F6", delay: "0.15s" },
  { n: 5, color: "#10B981", delay: "0.2s" },
  { n: 6, color: "#EF4444", delay: "0.08s" },
  { n: 7, color: "#8B5CF6", delay: "0.12s" },
  { n: 8, color: "#F97316", delay: "0.18s" },
  { n: 9, color: "#06B6D4", delay: "0.03s" },
  { n: 10, color: "#EC4899", delay: "0.22s" },
  { n: 11, color: "#84CC16", delay: "0.07s" },
  { n: 12, color: "#F59E0B", delay: "0.25s" },
];

export function TripFinder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [matchedPackage, setMatchedPackage] = useState<PackageData | null>(
    null,
  );
  const [direction, setDirection] = useState(1);

  const handleOptionSelect = (optionId: string) => {
    const newAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(newAnswers);
    if (currentStep < 5) {
      setDirection(1);
      setTimeout(() => setCurrentStep((s) => s + 1), 120);
    } else {
      const match = findMatch(newAnswers);
      setMatchedPackage(match);
      setDirection(1);
      setTimeout(() => setCurrentStep(6), 120);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setCurrentStep(1);
    setAnswers({});
    setMatchedPackage(null);
  };

  const handleBookNow = () => {
    if (!matchedPackage) return;
    const destKey = getDestKey(matchedPackage);
    window.dispatchEvent(
      new CustomEvent("selectDestination", { detail: destKey }),
    );
    setTimeout(() => {
      document
        .getElementById("packages")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const scrollToFinder = () => {
    document
      .getElementById("trip-finder")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const reasons = matchedPackage
    ? getPersonalizedReasons(answers, matchedPackage)
    : [];

  return (
    <>
      {/* Confetti + Wizard CSS */}
      <style>{`
        @keyframes confetti-fly-1  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-120px,-190px)rotate(720deg);opacity:0} }
        @keyframes confetti-fly-2  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(120px,-190px)rotate(-720deg);opacity:0} }
        @keyframes confetti-fly-3  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-180px,-80px)rotate(540deg);opacity:0} }
        @keyframes confetti-fly-4  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(180px,-80px)rotate(-540deg);opacity:0} }
        @keyframes confetti-fly-5  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-70px,-210px)rotate(900deg);opacity:0} }
        @keyframes confetti-fly-6  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(70px,-210px)rotate(-900deg);opacity:0} }
        @keyframes confetti-fly-7  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-200px,-110px)rotate(360deg);opacity:0} }
        @keyframes confetti-fly-8  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(200px,-110px)rotate(-360deg);opacity:0} }
        @keyframes confetti-fly-9  { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-140px,-170px)rotate(720deg);opacity:0} }
        @keyframes confetti-fly-10 { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(140px,-170px)rotate(-720deg);opacity:0} }
        @keyframes confetti-fly-11 { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(-55px,-230px)rotate(540deg);opacity:0} }
        @keyframes confetti-fly-12 { 0%{transform:translate(0,0)rotate(0deg);opacity:1} 100%{transform:translate(55px,-230px)rotate(-540deg);opacity:0} }
        .confetti-p {
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 2px;
          animation-duration: 1.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          left: calc(50% - 4px);
          top: calc(50% - 4px);
        }
        .tripfinder-card-hover {
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }
        .tripfinder-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(47,167,160,0.25);
        }
      `}</style>

      {/* Floating Plan My Trip Pill */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
        }}
      >
        <button
          type="button"
          onClick={scrollToFinder}
          data-ocid="trip_finder.open_modal_button"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
          className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white text-xs font-bold tracking-widest uppercase px-3 py-5 shadow-xl cursor-pointer transition-colors rounded-tr-xl rounded-br-xl select-none"
        >
          ✈ Plan My Trip
        </button>
      </div>

      {/* Main Section */}
      <section
        id="trip-finder"
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0b3835 0%, #0e2847 45%, #07111f 100%)",
        }}
      >
        {/* Ambient blobs */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl translate-y-1/4" />
          <div className="absolute top-1/2 left-5 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
          {/* Decorative dot grid */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-teal-400/15 text-teal-300 px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-teal-400/25">
              <Sparkles className="w-4 h-4" />
              AI-Powered Trip Matching
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Find Your{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #4DD6CE, #67E8F9)",
                }}
              >
                Perfect Trip
              </span>
            </h2>
            <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Answer 5 quick questions — we'll match you with your ideal holiday
              from our hand-curated packages
            </p>
          </motion.div>

          {/* Progress Indicator */}
          {currentStep <= 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-1 mb-10"
            >
              {wizardSteps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  <motion.div
                    animate={{
                      scale: i + 1 === currentStep ? 1.15 : 1,
                    }}
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                      i + 1 < currentStep
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                        : i + 1 === currentStep
                          ? "bg-white text-teal-700 ring-2 ring-teal-400 ring-offset-2 ring-offset-transparent shadow-lg"
                          : "bg-white/10 text-white/35 border border-white/10"
                    }`}
                  >
                    {i + 1 < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </motion.div>
                  {i < wizardSteps.length - 1 && (
                    <div
                      className={`h-px transition-all duration-500 ${
                        i + 1 < currentStep
                          ? "bg-teal-500 w-8 md:w-14"
                          : "bg-white/15 w-8 md:w-14"
                      }`}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Wizard Content */}
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep <= 5 && (
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 56 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -56 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
              >
                {/* Step Header */}
                <div className="text-center mb-7">
                  <p className="text-teal-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    Step {currentStep} of 5
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5">
                    {wizardSteps[currentStep - 1].question}
                  </h3>
                  <p className="text-white/45 text-sm">
                    {wizardSteps[currentStep - 1].subtitle}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {wizardSteps[currentStep - 1].options.map((option, idx) => {
                    const isSelected = answers[currentStep] === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        data-ocid={`trip_finder.button.${idx + 1}`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07, duration: 0.3 }}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`tripfinder-card-hover relative flex flex-col items-center text-center p-4 md:p-6 rounded-2xl border-2 cursor-pointer ${
                          isSelected
                            ? "bg-teal-500 border-teal-400 text-white shadow-xl shadow-teal-500/25"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-teal-400/50"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2.5 right-2.5">
                            <CheckCircle2 className="w-4 h-4 text-white/90" />
                          </span>
                        )}
                        <span className="text-3xl md:text-4xl mb-3 block leading-none">
                          {option.emoji}
                        </span>
                        <span className="font-bold text-sm md:text-[15px] leading-snug mb-1">
                          {option.label}
                        </span>
                        <span
                          className={`text-[11px] md:text-xs leading-relaxed ${
                            isSelected ? "text-white/75" : "text-white/40"
                          }`}
                        >
                          {option.description}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Result Card */}
            {currentStep === 6 && matchedPackage && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Confetti burst */}
                <div className="flex justify-center mb-5">
                  <div
                    key={`confetti-${matchedPackage.id}-${Object.values(answers).join("")}`}
                    className="relative inline-block text-5xl leading-none"
                  >
                    🎉
                    {confettiParticles.map(({ n, color, delay }) => (
                      <div
                        key={n}
                        className="confetti-p"
                        style={{
                          backgroundColor: color,
                          animationName: `confetti-fly-${n}`,
                          animationDelay: delay,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Result Panel */}
                <div
                  className="rounded-3xl border border-white/15 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Top Banner */}
                  <div
                    className="px-6 py-5 text-center"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(47,167,160,0.25) 0%, rgba(34,211,238,0.15) 100%)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0.5">
                      Perfect Match Found! 🎯
                    </h3>
                    <p className="text-white/50 text-sm">
                      Based on your preferences — here's your ideal trip
                    </p>
                  </div>

                  {/* Package Info */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-5">
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                          {matchedPackage.name}
                        </h4>
                        <p className="text-white/50 text-sm mt-1">
                          {matchedPackage.tagline}
                        </p>
                      </div>
                      <div className="md:text-right flex-shrink-0">
                        <div
                          className="text-2xl md:text-3xl font-extrabold"
                          style={{ color: "#EA968C" }}
                        >
                          ₹{matchedPackage.price.toLocaleString("en-IN")}
                        </div>
                        <div className="text-white/40 text-xs mt-0.5">
                          per person onwards
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 bg-teal-400/15 text-teal-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-teal-400/20">
                        <MapPin className="w-3 h-3" />
                        {getDestLabel(getDestKey(matchedPackage))}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-blue-400/15 text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-400/20">
                        <Clock className="w-3 h-3" />
                        {matchedPackage.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-amber-400/15 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-400/20">
                        {matchedPackage.category}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div
                      className="rounded-2xl p-4 mb-5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-3">
                        Top Highlights
                      </p>
                      <div className="space-y-2">
                        {matchedPackage.highlights.slice(0, 3).map((h) => (
                          <div
                            key={h}
                            className="flex items-center gap-2 text-white/75 text-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personalized Reasons */}
                    <div className="flex flex-wrap gap-2 mb-7 pt-4 border-t border-white/8">
                      {reasons.map((reason) => (
                        <span
                          key={reason}
                          className="text-xs text-teal-300 font-medium bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/15"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        data-ocid="trip_finder.primary_button"
                        onClick={handleBookNow}
                        className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-white font-bold px-6 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
                      >
                        Book This Trip
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        data-ocid="trip_finder.secondary_button"
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 text-white/80 hover:text-white font-semibold px-6 py-3.5 rounded-full border border-white/15 transition-all duration-200"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
