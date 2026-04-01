import { motion } from "motion/react";

const QUICK_LINKS = [
  {
    label: "Plan My Trip",
    href: "#trip-finder",
    icon: "/assets/generated/icon-plan-trip-transparent.dim_120x120.png",
    color: "from-sky-400 to-blue-600",
  },
  {
    label: "Flash Sale",
    href: "#flash-sale",
    icon: "/assets/generated/icon-flash-sale-transparent.dim_120x120.png",
    color: "from-orange-400 to-red-600",
  },
  {
    label: "Special Offer",
    href: "/offer",
    icon: "/assets/generated/icon-special-offer-transparent.dim_120x120.png",
    color: "from-amber-400 to-yellow-600",
    external: true,
  },
  {
    label: "Refer & Earn",
    href: "#refer-earn",
    icon: "/assets/generated/icon-refer-earn-transparent.dim_120x120.png",
    color: "from-emerald-400 to-green-600",
  },
  {
    label: "Gallery",
    href: "#gallery",
    icon: "/assets/generated/icon-gallery-transparent.dim_120x120.png",
    color: "from-violet-400 to-purple-600",
  },
  {
    label: "Reviews",
    href: "#reviews",
    icon: "/assets/generated/icon-reviews-transparent.dim_120x120.png",
    color: "from-pink-400 to-rose-600",
  },
  {
    label: "Videos",
    href: "#video-testimonials",
    icon: "/assets/generated/icon-videos-transparent.dim_120x120.png",
    color: "from-cyan-400 to-teal-600",
  },
  {
    label: "Blog",
    href: "#travel-blog",
    icon: "/assets/generated/icon-blog-transparent.dim_120x120.png",
    color: "from-lime-400 to-emerald-600",
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function HeroScene({ onExploreClick }: { onExploreClick: () => void }) {
  const scrollToCruise = () => {
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const cruiseTab = document.querySelector<HTMLElement>(
        '[data-value="andaman-cruise"], [value="andaman-cruise"]',
      );
      if (cruiseTab) cruiseTab.click();
    }, 400);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/andaman-banner-holidaypulse.dim_800x1200.jpg"
          alt="Holiday Pulse - Explore Andaman Dream Vacation Packages"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Quick Links Icon Bar — top section, below navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="absolute top-20 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-y border-white/20"
      >
        <div
          className="flex items-start gap-3 overflow-x-auto py-2 px-4 sm:px-8"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
            } as React.CSSProperties
          }
        >
          {QUICK_LINKS.map(({ label, href, icon, color, external }, i) => (
            <motion.button
              key={label}
              type="button"
              onClick={() => {
                if (external) {
                  window.location.href = href;
                } else {
                  scrollToSection(href.slice(1));
                }
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
              whileHover={{ scale: 1.08, y: 4 }}
              whileTap={{ scale: 0.95 }}
              style={{ scrollSnapAlign: "start" }}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group cursor-pointer bg-transparent border-0 p-0"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-3xl bg-gradient-to-br ${color} backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:shadow-xl group-hover:border-white/60`}
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md"
                />
              </div>
              <span className="text-white text-[10px] font-semibold text-center leading-tight drop-shadow-md max-w-[52px] sm:max-w-[60px] whitespace-nowrap">
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Floating stat chips - top right */}
      <div className="absolute top-48 right-4 sm:right-8 z-10 flex flex-col gap-3">
        {[
          { label: "🏝️ 3 Island Destinations", delay: 0.8 },
          { label: "🚢 Cruise Packages Available", delay: 1.0 },
          { label: "💬 24/7 YATRIK Support", delay: 1.2 },
        ].map(({ label, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay }}
            className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-semibold shadow-lg"
          >
            {label}
          </motion.div>
        ))}
      </div>

      {/* Main content: Trust badge + CTA buttons at the bottom */}
      <div className="relative z-10 flex flex-col justify-end h-screen pb-8 px-4 sm:px-8 gap-5">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg w-fit"
        >
          <span className="text-amber-300 text-sm">⭐</span>
          <span className="text-white text-xs font-semibold">
            4.9/5 · Trusted by 2000+ Travelers
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={onExploreClick}
            data-ocid="hero.primary_button"
            className="px-8 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Packages
          </button>
          <button
            type="button"
            onClick={scrollToCruise}
            data-ocid="hero.secondary_button"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            🚢 Cruise Packages
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
