import { motion } from "motion/react";

export function HeroScene({ onExploreClick }: { onExploreClick: () => void }) {
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

      <div className="relative z-10 flex flex-col items-end justify-end h-screen pb-12 px-6 sm:px-10">
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
