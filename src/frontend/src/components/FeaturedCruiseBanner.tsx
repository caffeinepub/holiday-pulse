import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function FeaturedCruiseBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleExploreCruise = () => {
    const pkgEl = document.getElementById("packages");
    if (pkgEl) {
      pkgEl.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("hp:open-tab", { detail: "andaman-cruise" }),
      );
    }, 500);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/andaman-featured-cruise-banner.dim_1200x500.jpg')",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Pre-title badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 rounded-full text-xs font-semibold mb-4 border border-white/20">
            🚢 Featured Experience
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Sail the Andamans
            <span className="block text-cyan-300">in Style</span>
          </h2>

          {/* Subheadline */}
          <p className="text-white/80 text-base md:text-lg mb-6 max-w-xl">
            Luxury cruise packages — 3, 5 &amp; 7 nights · All meals included ·
            Shore excursions · Premium cabins
          </p>

          {/* Highlight badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "🚢 Luxury Cabins",
              "🍽️ All Meals",
              "🏝️ Shore Excursions",
              "⭐ Premium Service",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            type="button"
            data-ocid="featured-cruise.primary_button"
            onClick={handleExploreCruise}
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/30"
          >
            Explore Cruise Packages
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
