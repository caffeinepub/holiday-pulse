import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Destination = "andaman" | "andaman-cruise" | "lakshadweep" | "northeast";

interface FlickerPage {
  src: string;
  destination: string;
  tagline: string;
  category: string;
  /** Which packages tab to open. undefined = no button (Events). */
  packageTab?: Destination;
  /** Label shown on the button */
  packageLabel?: string;
}

const flickerPages: FlickerPage[] = [
  {
    src: "/assets/generated/flicker-andaman-beach.dim_800x600.jpg",
    destination: "Andaman — Radhanagar Beach",
    tagline: "Sun-kissed shores of paradise",
    category: "Andaman",
    packageTab: "andaman",
    packageLabel: "Andaman Packages",
  },
  {
    src: "/assets/generated/flicker-lakshadweep-lagoon.dim_800x600.jpg",
    destination: "Lakshadweep — Crystal Lagoon",
    tagline: "Where the ocean meets the sky",
    category: "Lakshadweep",
    packageTab: "lakshadweep",
    packageLabel: "Lakshadweep Packages",
  },
  {
    src: "/assets/generated/flicker-northeast-rootbridge.dim_800x600.jpg",
    destination: "Meghalaya — Living Root Bridge",
    tagline: "Nature's ancient architecture",
    category: "North-East",
    packageTab: "northeast",
    packageLabel: "North-East Packages",
  },
  {
    src: "/assets/generated/flicker-andaman-scuba.dim_800x600.jpg",
    destination: "Andaman — Coral Kingdom",
    tagline: "Dive into a world of wonder",
    category: "Andaman",
    packageTab: "andaman",
    packageLabel: "Andaman Packages",
  },
  {
    src: "/assets/generated/flicker-cruise-sunset.dim_800x600.jpg",
    destination: "Andaman Cruise — Sunset Voyage",
    tagline: "Golden horizons await you",
    category: "Cruise",
    packageTab: "andaman-cruise",
    packageLabel: "View Cruise Packages",
  },
  {
    src: "/assets/generated/flicker-kaziranga-rhino.dim_800x600.jpg",
    destination: "Kaziranga — Wildlife Safari",
    tagline: "Walk with the giants of the wild",
    category: "North-East",
    packageTab: "northeast",
    packageLabel: "North-East Packages",
  },
  {
    src: "/assets/generated/flicker-beach-event.dim_800x600.jpg",
    destination: "Andaman — Beach Bonfire Night",
    tagline: "Memories under a million stars",
    category: "Events",
    packageTab: "andaman",
    packageLabel: "View Andaman Packages",
  },
  {
    src: "/assets/generated/flicker-northeast-festival.dim_800x600.jpg",
    destination: "Assam — Bihu Festival",
    tagline: "Where culture dances with joy",
    category: "Events",
    packageTab: "northeast",
    packageLabel: "View North-East Packages",
  },
];

const categoryColors: Record<string, string> = {
  Andaman: "bg-teal-500 text-white",
  Lakshadweep: "bg-blue-500 text-white",
  "North-East": "bg-emerald-600 text-white",
  Cruise: "bg-amber-500 text-slate-900",
  Events: "bg-rose-500 text-white",
};

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    scale: 0.94,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    scale: 0.94,
    opacity: 0,
  }),
};

function navigateToPackages(tab?: Destination) {
  const section = document.getElementById("packages");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (tab) {
    // Small delay so the scroll starts before the tab switches
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent<Destination>("selectDestination", { detail: tab }),
      );
    }, 400);
  }
}

export function FlickerBookSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const isFlippingRef = useRef(false);

  const flipToPage = useCallback((target: number, dir: number) => {
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;
    setDirection(dir);
    setCurrentPage(target);
    setTimeout(() => {
      isFlippingRef.current = false;
    }, 650);
  }, []);

  // Auto-advance every 3.5 s, paused while hovering
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      if (!isFlippingRef.current) {
        isFlippingRef.current = true;
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % flickerPages.length);
        setTimeout(() => {
          isFlippingRef.current = false;
        }, 650);
      }
    }, 3500);
    return () => clearInterval(id);
  }, [hovered]);

  const goNext = () => flipToPage((currentPage + 1) % flickerPages.length, 1);
  const goPrev = () =>
    flipToPage(
      (currentPage - 1 + flickerPages.length) % flickerPages.length,
      -1,
    );

  const page = flickerPages[currentPage];

  return (
    <section
      id="flickerbook"
      className="py-24 bg-gradient-to-b from-slate-900 to-teal-950 relative overflow-hidden"
    >
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Preload all images to avoid flip flash */}
      <div className="sr-only" aria-hidden="true">
        {flickerPages.map((p) => (
          <img key={p.src} src={p.src} alt="" />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Gold decorative rule ── */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {/* ── Section heading ── */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight font-playfair"
          >
            Our Travel Memories
          </motion.h2>

          {/* Gold underline accent */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
              className="h-1 w-20 rounded-full origin-center"
              style={{
                background:
                  "linear-gradient(90deg, #f59e0b 0%, #fcd34d 50%, #f59e0b 100%)",
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-slate-400 text-lg"
          >
            Moments that stay with you forever
          </motion.p>
        </div>

        {/* ── Flip-book row ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            data-ocid="flickerbook.pagination_prev"
            aria-label="Previous page"
            className="shrink-0 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all duration-200 border border-white/15 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Book + page-stack shadow */}
          <div className="flex-1" style={{ perspective: "1200px" }}>
            <div
              className="relative w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Stacked-pages illusion (bottom shadows) */}
              <div
                className="absolute -bottom-1.5 left-3 right-3 h-4 rounded-b-2xl"
                style={{
                  background: "rgba(15,23,42,0.55)",
                  filter: "blur(6px)",
                  zIndex: -1,
                }}
              />
              <div
                className="absolute -bottom-3 left-5 right-5 h-4 rounded-b-2xl"
                style={{
                  background: "rgba(15,23,42,0.35)",
                  filter: "blur(10px)",
                  zIndex: -2,
                }}
              />

              {/* Page frame with overflow clip for rounded corners */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Left spine shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/50 to-transparent z-20 pointer-events-none rounded-l-2xl" />

                {/* Top gloss sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent z-20 pointer-events-none" />

                {/* Animated pages */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.55,
                      ease: [0.645, 0.045, 0.355, 1.0],
                    }}
                    className="absolute inset-0 bg-slate-800"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Full-bleed photo */}
                    <img
                      src={page.src}
                      alt={page.destination}
                      className="w-full h-full object-cover"
                    />

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    {/* Category badge — top right */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-sm ${
                          categoryColors[page.category] ??
                          "bg-slate-600 text-white"
                        }`}
                      >
                        {page.category}
                      </span>
                    </div>

                    {/* Page index — top left (inside spine shadow) */}
                    <div className="absolute top-4 left-12 z-10">
                      <span className="text-white/40 text-xs font-mono tracking-widest">
                        {String(currentPage + 1).padStart(2, "0")} /{" "}
                        {String(flickerPages.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom info + View Package button */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                      <h3 className="text-white font-extrabold text-xl md:text-2xl lg:text-3xl mb-1 leading-tight drop-shadow-lg font-playfair">
                        {page.destination}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base italic drop-shadow mb-3">
                        {page.tagline}
                      </p>

                      {/* View Package button */}
                      {page.packageTab && (
                        <motion.button
                          type="button"
                          data-ocid={`flickerbook.view_package.${currentPage + 1}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToPackages(page.packageTab);
                          }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.35 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-amber-400 text-slate-900 hover:bg-amber-300 active:scale-95 transition-all duration-200 shadow-lg backdrop-blur-sm"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {page.packageLabel}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            data-ocid="flickerbook.pagination_next"
            aria-label="Next page"
            className="shrink-0 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all duration-200 border border-white/15 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* ── Counter + dot-strip ── */}
        <div className="flex flex-col items-center gap-3 mt-7">
          <p className="text-white/40 text-xs font-mono tracking-widest">
            {currentPage + 1} &nbsp;/&nbsp; {flickerPages.length}
          </p>
          <div className="flex items-center gap-2">
            {flickerPages.map((p, i) => (
              <button
                key={p.destination}
                type="button"
                data-ocid={`flickerbook.item.${i + 1}`}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => {
                  if (i !== currentPage) {
                    flipToPage(i, i > currentPage ? 1 : -1);
                  }
                }}
                className={[
                  "rounded-full transition-all duration-300",
                  i === currentPage
                    ? "w-7 h-3 bg-amber-400"
                    : "w-3 h-3 bg-white/25 hover:bg-white/50",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
