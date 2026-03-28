import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  lakshadweepPackages,
  northeastPackages,
  staticPackages,
} from "../data/packages";
import type { PackageData } from "../data/packages";
import { PackageCard } from "./PackageCard";

type Destination = "andaman" | "lakshadweep" | "northeast";

const destinationConfig = {
  andaman: {
    label: "Andaman & Nicobar",
    emoji: "🏝️",
    tagline: "550+ islands, world-class diving",
    stats: ["550+ Islands", "From ₹12,999", "3–6 Night Packages"],
    gradient: "from-teal-600 via-cyan-500 to-teal-400",
    packages: staticPackages,
  },
  lakshadweep: {
    label: "Lakshadweep",
    emoji: "🪸",
    tagline: "36 coral atolls, pristine lagoons",
    stats: ["36 Coral Atolls", "From ₹24,999", "3–8 Night Packages"],
    gradient: "from-blue-600 via-sky-500 to-blue-400",
    packages: lakshadweepPackages,
  },
  northeast: {
    label: "North-East India",
    emoji: "🏔️",
    tagline: "7 sister states, Himalayan foothills",
    stats: ["7 Sister States", "From ₹19,999", "5–10 Night Packages"],
    gradient: "from-emerald-600 via-green-500 to-teal-500",
    packages: northeastPackages,
  },
};

interface PackagesSectionProps {
  onBookNow: (pkg: PackageData) => void;
}

export function PackagesSection({ onBookNow }: PackagesSectionProps) {
  const [activeDestination, setActiveDestination] =
    useState<Destination>("andaman");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Destination>).detail;
      if (
        detail === "andaman" ||
        detail === "lakshadweep" ||
        detail === "northeast"
      ) {
        setActiveDestination(detail);
      }
    };
    window.addEventListener("selectDestination", handler);
    return () => window.removeEventListener("selectDestination", handler);
  }, []);

  const config = destinationConfig[activeDestination];

  return (
    <section id="packages" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-4">
            Tailored for Every Traveller
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Explore Our Destinations
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Hand-crafted packages for Andaman, Lakshadweep & North-East India.
            Expert guidance at every step.
          </p>
        </motion.div>

        {/* Destination Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(destinationConfig) as Destination[]).map((dest) => {
            const dc = destinationConfig[dest];
            return (
              <button
                key={dest}
                type="button"
                data-ocid={`packages.${dest}.tab`}
                onClick={() => setActiveDestination(dest)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                  activeDestination === dest
                    ? `bg-gradient-to-r ${dc.gradient} text-white border-transparent shadow-md scale-105`
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-600"
                }`}
              >
                <span>{dc.emoji}</span>
                {dc.label}
              </button>
            );
          })}
        </div>

        {/* Destination Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDestination}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl bg-gradient-to-r ${config.gradient} text-white p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{config.emoji}</span>
                <h3 className="text-xl md:text-2xl font-bold">
                  {config.label}
                </h3>
              </div>
              <p className="text-white/80 text-sm">{config.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {config.stats.map((stat) => (
                <div
                  key={stat}
                  className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-semibold"
                >
                  {stat}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Package Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDestination}-cards`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {config.packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                onBookNow={onBookNow}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
