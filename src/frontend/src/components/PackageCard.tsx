import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { useState } from "react";
import type { PackageData } from "../data/packages";

const categoryColors: Record<string, string> = {
  Budget: "bg-green-100 text-green-700",
  Explorer: "bg-blue-100 text-blue-700",
  Premium: "bg-amber-100 text-amber-700",
};

const activityIcons = [
  { icon: "🏖️", label: "Beach" },
  { icon: "🤿", label: "Snorkeling" },
  { icon: "🚢", label: "Ferry" },
  { icon: "🏨", label: "Hotel" },
  { icon: "📷", label: "Sightseeing" },
];

interface PackageCardProps {
  pkg: PackageData;
  index: number;
  onBookNow: (pkg: PackageData) => void;
}

export function PackageCard({ pkg, index, onBookNow }: PackageCardProps) {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col"
      data-ocid={`packages.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-teal-700 shadow">
          {pkg.duration}
        </div>
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[pkg.category] ?? "bg-gray-100 text-gray-700"}`}
        >
          {pkg.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-navy-800 mb-1">{pkg.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{pkg.tagline}</p>

        {/* Activity icons */}
        <div className="flex gap-2 mb-4">
          {activityIcons.map(({ icon, label }) => (
            <span
              key={label}
              className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-base"
              title={label}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-0.5">{pkg.priceLabel}</p>
          <p className="text-2xl font-extrabold text-navy-800">
            ₹{pkg.price.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-gray-500">/person</span>
          </p>
        </div>

        {/* Highlights chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((h) => (
            <span
              key={h}
              className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-2">
          <button
            type="button"
            onClick={() => onBookNow(pkg)}
            data-ocid={`packages.primary_button.${index + 1}`}
            className="w-full py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow"
          >
            Book Now / Enquire
          </button>
          <button
            type="button"
            onClick={() => setShowItinerary(!showItinerary)}
            data-ocid={`packages.toggle.${index + 1}`}
            className="w-full py-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
          >
            {showItinerary ? "Hide Itinerary ↑" : "View Itinerary ↓"}
          </button>
        </div>
      </div>

      {/* Itinerary Accordion */}
      {showItinerary && (
        <div className="border-t border-gray-100 px-5 pb-5">
          <Accordion type="single" collapsible className="mt-4">
            {pkg.itinerary.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`}>
                <AccordionTrigger className="text-sm font-semibold text-navy-800 hover:text-teal-600">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                      {day.day}
                    </span>
                    {day.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {day.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {day.activities.map((act) => (
                      <span
                        key={act}
                        className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-navy-800 mb-2">
                ✅ Inclusions
              </h4>
              <ul className="space-y-1">
                {pkg.inclusions.map((inc) => (
                  <li key={inc} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-green-500 flex-shrink-0">•</span>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-800 mb-2">
                ❌ Exclusions
              </h4>
              <ul className="space-y-1">
                {pkg.exclusions.map((exc) => (
                  <li key={exc} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-red-400 flex-shrink-0">•</span>
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
