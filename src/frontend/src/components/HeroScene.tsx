import { motion } from "motion/react";

export function HeroScene({ onExploreClick }: { onExploreClick: () => void }) {
  const scrollToCruise = () => {
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // Try to activate the cruise tab after a short delay for scroll to complete
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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating stat chips - top right */}
      <div className="absolute top-24 right-4 sm:right-8 z-10 flex flex-col gap-3">
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

      {/* Bottom CTA row */}
      <div className="relative z-10 flex flex-col items-end justify-end h-screen pb-12 px-6 sm:px-10">
        {/* Trust badge bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-14 left-6 sm:left-10 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg"
        >
          <span className="text-amber-300 text-sm">⭐</span>
          <span className="text-white text-xs font-semibold">
            4.9/5 · Trusted by 2000+ Travelers
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
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
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
