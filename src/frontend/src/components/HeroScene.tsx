import { motion } from "motion/react";

// ─── HeroScene ───────────────────────────────────────────────────────────────
export function HeroScene({ onExploreClick }: { onExploreClick: () => void }) {
  // onExploreClick kept for backward compat — wired via FloatingIconDial
  void onExploreClick;

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

      {/* Hero content — brand text centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl tracking-tight leading-tight">
            Holiday
            <span className="text-teal-400"> Pulse</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-lg mx-auto leading-relaxed drop-shadow-lg">
            Andaman · Lakshadweep · North-East India
          </p>
          <p className="mt-2 text-sm md:text-base text-white/60 max-w-md mx-auto">
            Curated island escapes &amp; cruise packages crafted just for you
          </p>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full shadow-lg"
        >
          <span className="text-amber-300 text-base">⭐</span>
          <span className="text-white text-sm font-semibold">
            4.9/5 · Trusted by 2000+ Travelers
          </span>
        </motion.div>

        {/* Hint to use the dial */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-white/40 text-xs tracking-wide"
        >
          ← Tap the teal dial on the right to explore
        </motion.p>
      </div>
    </section>
  );
}
