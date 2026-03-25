import { motion } from "motion/react";
import { staticPackages } from "../data/packages";
import type { PackageData } from "../data/packages";
import { PackageCard } from "./PackageCard";

interface PackagesSectionProps {
  onBookNow: (pkg: PackageData) => void;
}

export function PackagesSection({ onBookNow }: PackagesSectionProps) {
  return (
    <section id="packages" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-4">
            Tailored for Every Traveller
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-3">
            Our Andaman Packages
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Hand-crafted packages for every budget — from quick getaways to
            premium island odysseys. All packages include expert guidance by our
            local Port Blair team.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {staticPackages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
