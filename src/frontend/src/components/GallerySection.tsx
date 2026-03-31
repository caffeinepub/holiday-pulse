import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Filter = "All" | "Andaman" | "Lakshadweep" | "North-East";

interface GalleryImage {
  src: string;
  alt: string;
  destination: Exclude<Filter, "All">;
  span?: string;
}

const images: GalleryImage[] = [
  {
    src: "/assets/generated/andaman-explorer.dim_800x500.jpg",
    alt: "Andaman Explorer",
    destination: "Andaman",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/andaman-premium.dim_800x500.jpg",
    alt: "Andaman Premium",
    destination: "Andaman",
  },
  {
    src: "/assets/generated/andaman-budget.dim_800x500.jpg",
    alt: "Andaman Budget",
    destination: "Andaman",
  },
  {
    src: "/assets/generated/lakshadweep-explorer.dim_800x500.jpg",
    alt: "Lakshadweep Explorer",
    destination: "Lakshadweep",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/lakshadweep-premium.dim_800x500.jpg",
    alt: "Lakshadweep Premium",
    destination: "Lakshadweep",
  },
  {
    src: "/assets/generated/northeast-explorer.dim_800x500.jpg",
    alt: "North-East Explorer",
    destination: "North-East",
  },
  {
    src: "/assets/generated/northeast-premium.dim_800x500.jpg",
    alt: "North-East Premium",
    destination: "North-East",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/andaman-why-choose.dim_800x600.jpg",
    alt: "Andaman Why Choose",
    destination: "Andaman",
  },
];

const filters: Filter[] = ["All", "Andaman", "Lakshadweep", "North-East"];

const destEmoji: Record<string, string> = {
  Andaman: "🏝️",
  Lakshadweep: "🌊",
  "North-East": "🏔️",
};

export function GallerySection() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.destination === active);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-3"
          >
            Destination Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Breathtaking views from our destinations
          </motion.p>
        </div>

        {/* Filter bar */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              data-ocid="gallery.tab"
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-teal-50 text-teal-700 hover:bg-teal-100"
              }`}
            >
              {f !== "All" ? `${destEmoji[f]} ` : ""}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  img.span && active === "All" ? img.span : ""
                }`}
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-base">
                    {destEmoji[img.destination]} {img.destination}
                  </p>
                  <div className="flex items-center gap-1 text-teal-300 text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
