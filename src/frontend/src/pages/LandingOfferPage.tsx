import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  MessageCircle,
  Palmtree,
  Phone,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// --------------- Countdown Hook ---------------
const OFFER_EXPIRY_KEY = "hp_offer_expiry";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

function useOfferCountdown() {
  const getExpiry = () => {
    const stored = localStorage.getItem(OFFER_EXPIRY_KEY);
    if (stored) return Number(stored);
    const expiry = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(OFFER_EXPIRY_KEY, String(expiry));
    return expiry;
  };

  const [expiry] = useState(getExpiry);
  const [remaining, setRemaining] = useState(Math.max(0, expiry - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, expiry - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: remaining === 0 };
}

// --------------- Deal Cards Data ---------------
const deals = [
  {
    id: "andaman",
    title: "Andaman Islands",
    nights: "5 Days / 4 Nights",
    originalPrice: "₹26,999",
    dealPrice: "₹18,999",
    savings: "Save ₹8,000",
    emoji: "🏝️",
    inclusions: [
      "✈ Return Flights",
      "🏨 Beach Hotel Stay",
      "🚤 Island Sightseeing",
      "🍽 Breakfast & Dinner",
    ],
    highlight: "Radhanagar Beach & Havelock Island",
  },
  {
    id: "lakshadweep",
    title: "Lakshadweep",
    nights: "4 Days / 3 Nights",
    originalPrice: "₹31,999",
    dealPrice: "₹22,999",
    savings: "Save ₹9,000",
    emoji: "🤿",
    inclusions: [
      "✈ Return Flights",
      "🏖 Lagoon Resort Stay",
      "🤿 Snorkeling & Water Sports",
      "🍽 All Meals Included",
    ],
    highlight: "Crystal Lagoons & Coral Reefs",
    popular: true,
  },
  {
    id: "northeast",
    title: "North-East India",
    nights: "6 Days / 5 Nights",
    originalPrice: "₹21,999",
    dealPrice: "₹15,999",
    savings: "Save ₹6,000",
    emoji: "🏔️",
    inclusions: [
      "🚐 All Transfers",
      "🏡 Boutique Hotel Stay",
      "🗺 All Sightseeing",
      "🍽 Daily Breakfast",
    ],
    highlight: "Meghalaya, Kaziranga & Cherrapunji",
  },
];

// --------------- Testimonials ---------------
const testimonials = [
  {
    name: "Priya Sharma",
    destination: "Andaman Islands",
    text: "Absolutely breathtaking experience! Holiday Pulse handled everything perfectly — the beaches were magical and the hotel was top-notch. Worth every rupee!",
    avatar: "PS",
  },
  {
    name: "Rahul & Meena Nair",
    destination: "Lakshadweep",
    text: "Our honeymoon was beyond perfect. The lagoon resort, snorkeling sessions, and personalised service made it the best trip of our lives. Highly recommend!",
    avatar: "RN",
  },
  {
    name: "Arjun Kapoor",
    destination: "North-East India",
    text: "Kaziranga safari, living root bridges, Cherrapunji waterfalls — all in one trip! The itinerary was flawless. Holiday Pulse knows how to do it right.",
    avatar: "AK",
  },
];

// --------------- CountdownBlock ---------------
function CountdownBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 min-w-[64px] text-center">
        <span className="text-3xl font-bold text-white tabular-nums">
          {display}
        </span>
      </div>
      <span className="text-xs text-white/80 mt-1 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

// --------------- Main Component ---------------
export function LandingOfferPage() {
  const { hours, minutes, seconds, expired } = useOfferCountdown();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    date: "",
    travellers: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const enquiryRef = useRef<HTMLDivElement>(null);

  const scrollToEnquiry = (dest?: string) => {
    if (dest) setForm((prev) => ({ ...prev, destination: dest }));
    setTimeout(
      () => enquiryRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = `Hi Holiday Pulse! 🌴\n\nI'd like to claim the limited-time offer.\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email || "Not provided"}\n🗺 Destination: ${form.destination}\n📅 Travel Date: ${form.date}\n👥 Travellers: ${form.travellers || "Not specified"}\n\nPlease share the best deal for my trip!`;
    const msg = encodeURIComponent(waText);
    window.open(`https://wa.me/919160393773?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <Palmtree className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">
              Holiday<span className="text-teal-500">Pulse</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919160393773"
              className="hidden sm:flex items-center gap-1.5 text-sm text-teal-700 font-semibold hover:text-teal-800"
              data-ocid="offer.link"
            >
              <Phone className="w-3.5 h-3.5" />
              +91-91603 93773
            </a>
            <a
              href="https://wa.me/919160393773"
              target="_blank"
              rel="noreferrer"
              data-ocid="offer.button"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.45 0.12 186) 0%, oklch(0.55 0.13 200) 40%, oklch(0.65 0.16 60) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, oklch(0.9 0.18 80) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.15 200) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg">
              <Zap className="w-3.5 h-3.5" />
              LIMITED TIME OFFER — Ends Soon!
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Exclusive Travel Deals —
            <br />
            <span className="text-amber-300">Limited Seats!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Book now and save up to{" "}
            <span className="font-bold text-amber-300">30%</span> on handpicked
            Andaman, Lakshadweep &amp; North-East packages.
          </motion.p>

          {/* Countdown */}
          {!expired && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="flex items-center gap-1 text-white/80 text-sm font-medium">
                <Clock className="w-4 h-4" />
                Offer expires in:
              </div>
              <div className="flex items-center gap-2">
                <CountdownBlock value={hours} label="Hours" />
                <span className="text-white/60 text-2xl font-bold mb-5">:</span>
                <CountdownBlock value={minutes} label="Mins" />
                <span className="text-white/60 text-2xl font-bold mb-5">:</span>
                <CountdownBlock value={seconds} label="Secs" />
              </div>
            </motion.div>
          )}
          {expired && (
            <div className="mb-10 text-white/80 text-sm font-medium">
              ⏰ Offer has expired. Contact us for current deals.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              type="button"
              onClick={() => scrollToEnquiry()}
              data-ocid="offer.primary_button"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              🎯 Claim Your Deal Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="bg-teal-600 py-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "⭐", text: "500+ Happy Clients" },
              { icon: "🎨", text: "100% Customizable" },
              { icon: "🕐", text: "24/7 Support" },
              { icon: "⚡", text: "Instant Confirmation" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center justify-center gap-2 text-white text-sm font-semibold py-1"
              >
                <span className="text-base">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deal Cards ── */}
      <section className="py-16 bg-gray-50" id="deals">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              🔥 Today&apos;s Hot Deals
            </h2>
            <p className="text-gray-500 text-lg">
              Handpicked packages at unbeatable prices. Limited availability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {deals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden flex flex-col ${
                  deal.popular
                    ? "border-teal-500 shadow-teal-100"
                    : "border-gray-100"
                }`}
                data-ocid={`offer.item.${i + 1}`}
              >
                {deal.popular && (
                  <div className="bg-teal-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* 30% OFF badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow">
                    🔥 30% OFF
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-4xl mb-3">{deal.emoji}</div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold mb-4">
                    {deal.nights}
                  </p>

                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-sm mr-2">
                      {deal.originalPrice}
                    </span>
                    <span className="text-2xl font-extrabold text-teal-700">
                      {deal.dealPrice}
                    </span>
                    <span className="text-xs text-gray-500">/person</span>
                    <div className="inline-flex items-center ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {deal.savings}
                    </div>
                  </div>

                  <p className="text-xs text-amber-600 font-semibold mb-3">
                    📍 {deal.highlight}
                  </p>

                  <ul className="space-y-1.5 mb-6 flex-1">
                    {deal.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => scrollToEnquiry(deal.id)}
                    data-ocid={`offer.secondary_button.${i + 1}`}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all hover:shadow-lg active:scale-95"
                  >
                    Claim This Offer →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section ref={enquiryRef} id="enquiry" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              📲 Get Your Free Quote
            </h2>
            <p className="text-gray-500">
              Fill in your details and we&apos;ll send you the best deal on
              WhatsApp instantly.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
              data-ocid="offer.success_state"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-teal-700 mb-2">
                Enquiry Sent!
              </h3>
              <p className="text-gray-600">
                Our travel expert will contact you within 30 minutes.
              </p>
              <button
                type="button"
                className="mt-6 text-sm text-teal-600 underline"
                onClick={() => setSubmitted(false)}
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5"
              data-ocid="offer.modal"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-name"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="offer-name"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="offer.input"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-phone"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="offer-phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    data-ocid="offer.input"
                    className="bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="offer-email"
                  className="text-gray-700 font-semibold text-sm"
                >
                  Email Address
                </Label>
                <Input
                  id="offer-email"
                  type="email"
                  placeholder="priya@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="offer.input"
                  className="bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-700 font-semibold text-sm">
                  Preferred Destination *
                </Label>
                <Select
                  required
                  value={form.destination}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, destination: v }))
                  }
                >
                  <SelectTrigger className="bg-white" data-ocid="offer.select">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andaman">
                      🏝️ Andaman Islands (5D/4N)
                    </SelectItem>
                    <SelectItem value="lakshadweep">
                      🤿 Lakshadweep (4D/3N)
                    </SelectItem>
                    <SelectItem value="northeast">
                      🏔️ North-East India (6D/5N)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-date"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    Travel Date *
                  </Label>
                  <Input
                    id="offer-date"
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    data-ocid="offer.input"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-travellers"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    No. of Travellers
                  </Label>
                  <Input
                    id="offer-travellers"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="e.g. 2"
                    value={form.travellers}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, travellers: e.target.value }))
                    }
                    data-ocid="offer.input"
                    className="bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                data-ocid="offer.submit_button"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-extrabold text-lg py-4 rounded-xl transition-all hover:shadow-xl active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />📲 Send Enquiry on WhatsApp
              </button>

              <p className="text-center text-xs text-gray-400">
                🔒 Your details are safe with us. We never spam.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              What Our Clients Say
            </h2>
            <p className="text-gray-500">
              Real experiences from happy travellers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                data-ocid={`offer.item.${i + 1}`}
              >
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-teal-600">{t.destination}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security Badges ── */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            {[
              { icon: ShieldCheck, text: "Secure Booking" },
              { icon: CheckCircle, text: "Verified Agency" },
              { icon: Zap, text: "Instant Response" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-teal-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Repeat ── */}
      <section
        className="py-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.45 0.12 186), oklch(0.55 0.13 200))",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          🌴 Ready to Book Your Dream Trip?
        </h2>
        <p className="text-white/80 mb-6">
          Limited seats available — grab your deal before it expires!
        </p>
        <button
          type="button"
          onClick={() => scrollToEnquiry()}
          data-ocid="offer.primary_button"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-lg px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          📲 Get My Deal Now
        </button>
      </section>

      {/* ── Minimal Footer ── */}
      <footer className="bg-gray-900 text-gray-400 text-center text-sm py-6 px-4">
        <p>
          © {new Date().getFullYear()} Holiday Pulse | info@holidaypulse.ind |{" "}
          +91-91603 93773
        </p>
        <p className="mt-1 text-xs text-gray-600">
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-400 underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
