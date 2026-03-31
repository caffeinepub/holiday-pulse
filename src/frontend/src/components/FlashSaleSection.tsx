import { ArrowRight, Clock, Tag, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useFlashSaleCountdown } from "../hooks/useFlashSaleCountdown";

const DEALS = [
  {
    id: "deal-andaman",
    badge: "Andaman",
    badgeColor: "bg-cyan-500",
    name: "Andaman Escape",
    duration: "4 Nights / 5 Days",
    originalPrice: 15999,
    discountedPrice: 11199,
    discount: 30,
    highlights: ["Radhanagar Beach", "Cellular Jail L&S", "Glass-Bottom Boat"],
    dest: "andaman",
    accentFrom: "from-cyan-500",
    accentTo: "to-teal-600",
  },
  {
    id: "deal-lakshadweep",
    badge: "Lakshadweep",
    badgeColor: "bg-emerald-500",
    name: "Lakshadweep Paradise",
    duration: "5 Nights / 6 Days",
    originalPrice: 18999,
    discountedPrice: 13299,
    discount: 30,
    highlights: ["Coral Lagoons", "Snorkeling", "Bangaram Island"],
    dest: "lakshadweep",
    accentFrom: "from-emerald-500",
    accentTo: "to-green-600",
  },
  {
    id: "deal-northeast",
    badge: "North-East India",
    badgeColor: "bg-violet-500",
    name: "North-East Heritage",
    duration: "6 Nights / 7 Days",
    originalPrice: 12999,
    discountedPrice: 9099,
    discount: 30,
    highlights: ["Living Root Bridges", "Kaziranga Safari", "Yumthang Valley"],
    dest: "northeast",
    accentFrom: "from-violet-500",
    accentTo: "to-purple-600",
  },
];

const TIMER_SEGMENTS = ["hours", "minutes", "seconds"] as const;

interface FlashSaleSectionProps {
  onBookNow: () => void;
}

export function FlashSaleSection({ onBookNow }: FlashSaleSectionProps) {
  const { hours, minutes, seconds, expired } = useFlashSaleCountdown();

  if (expired) return null;

  const fmt = (n: number) => n.toString().padStart(2, "0");
  const timerValues = {
    hours: fmt(hours),
    minutes: fmt(minutes),
    seconds: fmt(seconds),
  };

  const handleDealClick = (dest: string) => {
    window.dispatchEvent(
      new CustomEvent("selectDestination", { detail: dest }),
    );
    const el = document.getElementById("packages");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "#packages";
    }
    onBookNow();
  };

  return (
    <section
      id="flash-sale"
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
      }}
      data-ocid="flash_sale.section"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            Limited Time Offer
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
            🔥 Flash{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #f97316, #ef4444, #fb923c)",
              }}
            >
              Deals
            </span>
          </h2>
          <p className="text-lg text-slate-300 mb-6">
            Book now — prices go back up when the clock hits zero!
          </p>

          {/* Big countdown */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-2xl">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-slate-300 text-sm font-medium">
              Sale ends in
            </span>
            <div className="flex items-center font-mono font-black text-2xl">
              {TIMER_SEGMENTS.map((seg, idx) => (
                <span key={seg} className="flex items-center">
                  {idx > 0 && <span className="text-slate-500 mx-1">:</span>}
                  <span
                    className="text-white bg-white/10 px-2 py-1 rounded-lg tabular-nums"
                    style={{ textShadow: "0 0 20px rgba(249,115,22,0.8)" }}
                  >
                    {timerValues[seg]}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deal cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="flash_sale.list"
        >
          {DEALS.map((deal, i) => (
            <motion.article
              key={deal.id}
              className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/25 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              data-ocid={`flash_sale.item.${i + 1}`}
            >
              {/* Gradient accent bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${deal.accentFrom} ${deal.accentTo}`}
              />

              <div className="p-6">
                {/* Badges row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`${deal.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
                  >
                    {deal.badge}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {deal.discount}% OFF
                  </span>
                </div>

                {/* Package name */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {deal.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{deal.duration}</p>

                {/* Highlights */}
                <ul className="space-y-1 mb-5">
                  {deal.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-slate-500 text-sm line-through">
                      ₹{deal.originalPrice.toLocaleString("en-IN")}
                    </p>
                    <p
                      className="text-3xl font-black"
                      style={{ color: "#34d399" }}
                    >
                      ₹{deal.discountedPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-slate-400 text-xs">per person onwards</p>
                  </div>
                  {/* Mini countdown */}
                  <div className="text-right">
                    <p className="text-slate-500 text-xs mb-1">Ends in</p>
                    <p className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg">
                      {fmt(hours)}:{fmt(minutes)}:{fmt(seconds)}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleDealClick(deal.dest)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white transition-all duration-200 group-hover:gap-3"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #0f766e)",
                    boxShadow: "0 4px 15px rgba(13,148,136,0.35)",
                  }}
                  data-ocid={`flash_sale.primary_button.${i + 1}`}
                >
                  Book Now — Save ₹
                  {(deal.originalPrice - deal.discountedPrice).toLocaleString(
                    "en-IN",
                  )}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-slate-500 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          * Prices shown are per person on twin sharing. T&amp;C apply. Flash
          sale valid while stocks last.
        </motion.p>
      </div>
    </section>
  );
}
