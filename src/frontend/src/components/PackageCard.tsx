import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { PackageData } from "../data/packages";

function getBestMonths(pkgId: number): string {
  if (pkgId >= 30) return "Nov – Mar";
  if (pkgId >= 20) return "Oct – Apr";
  if (pkgId >= 10) return "Nov – Apr";
  return "Oct – May";
}

function getSeatsLeft(name: string): number {
  return (name.charCodeAt(0) % 4) + 2;
}

function getViewedToday(name: string): number {
  return (
    ((name.charCodeAt(0) * 7 + name.charCodeAt(1 % name.length)) % 31) + 10
  );
}

const categoryColors: Record<string, string> = {
  Budget: "bg-green-100 text-green-700",
  Explorer: "bg-blue-100 text-blue-700",
  Premium: "bg-amber-100 text-amber-700",
};

const categoryReviews: Record<string, { rating: number; count: number }> = {
  Budget: { rating: 4.8, count: 98 },
  Explorer: { rating: 4.9, count: 147 },
  Premium: { rating: 5.0, count: 73 },
};

const activityIcons = [
  { icon: "🏖️", label: "Beach" },
  { icon: "🤿", label: "Snorkeling" },
  { icon: "🚢", label: "Ferry" },
  { icon: "🏨", label: "Hotel" },
  { icon: "📷", label: "Sightseeing" },
];

const cruiseActivityIcons = [
  { icon: "🚢", label: "Cruise" },
  { icon: "🏖️", label: "Beach" },
  { icon: "🤿", label: "Snorkeling" },
  { icon: "🍽️", label: "Dining" },
  { icon: "🎵", label: "Entertainment" },
];

interface PackageCardProps {
  pkg: PackageData;
  index: number;
  onBookNow: (pkg: PackageData) => void;
  isCruise?: boolean;
}

export function PackageCard({
  pkg,
  index,
  onBookNow,
  isCruise = false,
}: PackageCardProps) {
  const [showItinerary, setShowItinerary] = useState(false);
  const rev = categoryReviews[pkg.category] ?? { rating: 4.9, count: 100 };
  const icons = isCruise ? cruiseActivityIcons : activityIcons;
  const seatsLeft = getSeatsLeft(pkg.name);
  const viewedToday = getViewedToday(pkg.name);

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
        {/* Scarcity badge */}
        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
          <span className="px-2.5 py-1 bg-red-500/95 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1">
            🔥 Only {seatsLeft} seats left!
          </span>
          <span className="px-2.5 py-1 bg-orange-400/90 text-white text-[10px] font-semibold rounded-full shadow">
            ⚡ {viewedToday} viewed today
          </span>
        </div>
        {/* Cruise badge */}
        {isCruise && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            🚢 Cruise Package
          </div>
        )}
        {/* Special badges */}
        {!isCruise && pkg.category === "Explorer" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
            🔥 Most Popular
          </div>
        )}
        {!isCruise && pkg.category === "Budget" && (
          <div className="absolute bottom-12 left-3 px-2.5 py-1 bg-amber-400 text-white text-xs font-bold rounded-full shadow">
            🏅 Best Value
          </div>
        )}
        {isCruise && pkg.category === "Explorer" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-lg">
            ⭐ Most Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-navy-800 mb-0.5">{pkg.name}</h3>

        {/* Star rating row */}
        <div className="flex items-center gap-1.5 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i <= Math.floor(rev.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-amber-200 text-amber-200"
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-amber-600">
            {rev.rating}
          </span>
          <span className="text-xs text-gray-400">· {rev.count} reviews</span>
        </div>

        <p className="text-sm text-gray-500 mb-3">{pkg.tagline}</p>

        {/* Activity icons */}
        <div className="flex gap-2 mb-4">
          {icons.map(({ icon, label }) => (
            <span
              key={label}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${
                isCruise ? "bg-indigo-50" : "bg-teal-50"
              }`}
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
          {isCruise && (
            <p className="text-xs text-indigo-500 mt-0.5 font-medium">
              All meals & cabin included
            </p>
          )}
        </div>

        {/* Best Month to Book badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${
              isCruise
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            <span>🗓️</span>
            <span>Best months to visit: {getBestMonths(pkg.id)}</span>
          </span>
        </div>

        {/* Highlights chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((h) => (
            <span
              key={h}
              className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                isCruise
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-teal-50 text-teal-700"
              }`}
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
            className={`w-full py-3 text-white font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow ${
              isCruise
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-coral-500 hover:bg-coral-600"
            }`}
          >
            {isCruise ? "🚢 Book Cruise / Enquire" : "Book Now / Enquire"}
          </button>
          <button
            type="button"
            onClick={() => setShowItinerary(!showItinerary)}
            data-ocid={`packages.toggle.${index + 1}`}
            className={`w-full py-2 font-medium text-sm transition-colors ${
              isCruise
                ? "text-indigo-600 hover:text-indigo-700"
                : "text-teal-600 hover:text-teal-700"
            }`}
          >
            {showItinerary ? "Hide Itinerary ↑" : "View Day-by-Day Itinerary ↓"}
          </button>
        </div>
      </div>

      {/* Itinerary Accordion */}
      {showItinerary && (
        <div className="border-t border-gray-100 px-5 pb-5">
          <Accordion type="single" collapsible className="mt-4">
            {pkg.itinerary.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`}>
                <AccordionTrigger
                  className={`text-sm font-semibold text-navy-800 ${
                    isCruise ? "hover:text-indigo-600" : "hover:text-teal-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 ${
                        isCruise ? "bg-indigo-500" : "bg-teal-500"
                      }`}
                    >
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
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          isCruise
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-teal-50 text-teal-700"
                        }`}
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
