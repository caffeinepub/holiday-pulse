import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  destination: "Andaman" | "Lakshadweep" | "North-East";
  month: string;
  rating: number;
  quote: string;
  image?: string;
  initials?: string;
  avatarColor?: string;
}

const destinationColors: Record<string, string> = {
  Andaman: "bg-teal-100 text-teal-700",
  Lakshadweep: "bg-blue-100 text-blue-700",
  "North-East": "bg-emerald-100 text-emerald-700",
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    city: "Hyderabad",
    destination: "Andaman",
    month: "February 2026",
    rating: 5,
    quote:
      "Snorkeling at Havelock's Radhanagar Beach was pure magic — I swam with sea turtles right at sunrise! Holiday Pulse arranged everything so seamlessly that we never once had to worry. The hotel was steps from the beach and the guides were incredibly knowledgeable. Best vacation of my life!",
    image: "/assets/generated/client-priya-transparent.dim_80x80.png",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    city: "Bangalore",
    destination: "Lakshadweep",
    month: "January 2026",
    rating: 5,
    quote:
      "The coral reefs at Agatti Island looked like something out of a nature documentary. Glass-bottom boat rides, scuba diving, and crystal-clear lagoons — Lakshadweep is otherworldly. Holiday Pulse's Explorer package gave us access to places most tourists never see. Highly recommended!",
    image: "/assets/generated/client-rajesh-transparent.dim_80x80.png",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    city: "Chennai",
    destination: "North-East",
    month: "December 2025",
    rating: 5,
    quote:
      "Sipping local Assam chai at a hilltop tea garden while watching the clouds roll over Kaziranga was a moment I'll never forget. The Northeast package took us through Meghalaya's living root bridges and Sikkim's monasteries. Holiday Pulse treated us like family throughout!",
    image: "/assets/generated/client-ananya-transparent.dim_80x80.png",
  },
  {
    id: 4,
    name: "Suresh Nair",
    city: "Kochi",
    destination: "Andaman",
    month: "March 2026",
    rating: 5,
    quote:
      "We took the family for our 25th anniversary and the kids absolutely loved the elephant beach snorkeling. The ferry arrangements were spot on, and even the budget package felt luxurious. The team was responsive on WhatsApp at all hours. Can't wait to return!",
    image: "/assets/generated/client-suresh-transparent.dim_80x80.png",
  },
  {
    id: 5,
    name: "Meera Gupta",
    city: "Delhi",
    destination: "Lakshadweep",
    month: "November 2025",
    rating: 5,
    quote:
      "Lakshadweep was always a dream and Holiday Pulse turned it into reality. The premium package included a private yacht sunset cruise around Bangaram Island — absolutely spectacular. The accommodation was top-notch and the staff went above and beyond every single day.",
    initials: "MG",
    avatarColor: "bg-purple-500",
  },
  {
    id: 6,
    name: "Arjun Kapoor",
    city: "Mumbai",
    destination: "North-East",
    month: "October 2025",
    rating: 4,
    quote:
      "The Dzukou Valley trek in Nagaland was the highlight — miles of rolling green hills with not another soul in sight. Our guide from Holiday Pulse was a local expert who knew every hidden trail and cultural story. The Northeast deserves more visitors and this team deserves all the credit!",
    initials: "AK",
    avatarColor: "bg-blue-500",
  },
  {
    id: 7,
    name: "Divya Srinivasan",
    city: "Pune",
    destination: "Andaman",
    month: "January 2026",
    rating: 5,
    quote:
      "Cellular Jail's light-and-sound show gave me goosebumps. Ross Island at dawn, the mangrove kayaking in Baratang — Holiday Pulse curated an itinerary that balanced history, adventure, and relaxation perfectly. Even our hotel breakfast had fresh seafood! Five stars without hesitation.",
    initials: "DS",
    avatarColor: "bg-green-500",
  },
  {
    id: 8,
    name: "Vikram Rao",
    city: "Vizag",
    destination: "Lakshadweep",
    month: "February 2026",
    rating: 5,
    quote:
      "My honeymoon couldn't have been more perfect. The private beach at Minicoy, the bioluminescent plankton at night, and the warm hospitality made it feel like a fairy tale. Holiday Pulse handled everything from permits to flights. Worth every rupee and more!",
    initials: "VR",
    avatarColor: "bg-orange-500",
  },
];

const TRIP_PHOTOS = [
  {
    src: "/assets/generated/happy-clients-andaman.dim_400x300.jpg",
    label: "Andaman",
    color: "bg-teal-600",
  },
  {
    src: "/assets/generated/happy-clients-lakshadweep.dim_400x300.jpg",
    label: "Lakshadweep",
    color: "bg-blue-600",
  },
  {
    src: "/assets/generated/happy-clients-northeast.dim_400x300.jpg",
    label: "North-East",
    color: "bg-emerald-600",
  },
  {
    src: "/assets/generated/happy-clients-cruise.dim_400x300.jpg",
    label: "Andaman Cruise",
    color: "bg-indigo-600",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-amber-200 text-amber-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ClientsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VISIBLE = 3;
  const total = testimonials.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goPrev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
    startTimer();
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
    startTimer();
  };

  const visibleTestimonials = Array.from(
    { length: VISIBLE },
    (_, i) => testimonials[(current + i) % total],
  );

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-3"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Real experiences from travelers who chose Holiday Pulse
          </motion.p>
        </div>

        {/* Happy Clients Photo Strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {TRIP_PHOTOS.map((photo) => (
            <div
              key={photo.label}
              className="relative overflow-hidden rounded-xl group"
            >
              <img
                src={photo.src}
                alt={`Happy clients in ${photo.label}`}
                className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span
                className={`absolute bottom-2 left-2 ${photo.color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}
              >
                {photo.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[340px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleTestimonials.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 80 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-card p-6 flex flex-col gap-4 border border-teal-50 hover:shadow-card-hover transition-shadow"
                  data-ocid={`reviews.item.${t.id}`}
                >
                  {/* Top row */}
                  <div className="flex items-start gap-3">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-100 flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 ${t.avatarColor}`}
                      >
                        {t.initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-navy-800 truncate">
                        {t.name}
                      </p>
                      <p className="text-sm text-gray-400">{t.city}</p>
                      <StarRating rating={t.rating} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${destinationColors[t.destination]}`}
                    >
                      {t.destination}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Footer */}
                  <p className="text-xs text-gray-400 pt-1 border-t border-gray-50">
                    {t.month}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={goPrev}
              data-ocid="reviews.pagination_prev"
              className="w-10 h-10 rounded-full bg-white border border-teal-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setDirection(t.id - 1 > current ? 1 : -1);
                    setCurrent(t.id - 1);
                    startTimer();
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    t.id - 1 === current ? "bg-teal-500 w-6" : "bg-teal-200 w-2"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              data-ocid="reviews.pagination_next"
              className="w-10 h-10 rounded-full bg-white border border-teal-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
