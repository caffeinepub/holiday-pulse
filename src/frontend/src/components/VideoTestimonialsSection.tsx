import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    videoUrl: "https://www.youtube.com/embed/QnKQr8Uub0A",
    name: "Anika Sharma",
    destination: "Andaman",
    quote:
      "An absolute dream trip! The crystal waters and island hopping were beyond anything we imagined. Holiday Pulse made every moment magical.",
    color: "bg-teal-100 text-teal-700",
  },
  {
    videoUrl: "https://www.youtube.com/embed/1EiC9bvVGnk",
    name: "Rahul & Priya Mehta",
    destination: "Lakshadweep",
    quote:
      "Holiday Pulse made the entire planning seamless. Lakshadweep felt like our private paradise — pristine lagoons, no crowds, pure bliss.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    videoUrl: "https://www.youtube.com/embed/ZFPR4RgEUHI",
    name: "Deepak Nair",
    destination: "North-East India",
    quote:
      "The tea gardens and living root bridges left us speechless. A perfectly curated itinerary that showed us the real North-East.",
    color: "bg-green-100 text-green-700",
  },
  {
    videoUrl: "https://www.youtube.com/embed/XyI8yYJBxas",
    name: "The Kapoor Family",
    destination: "Andaman Cruise",
    quote:
      "Waking up to the ocean every morning on the cruise was priceless. Kids loved every single minute — an unforgettable family memory!",
    color: "bg-orange-100 text-orange-700",
  },
];

export function VideoTestimonialsSection() {
  return (
    <section
      id="video-testimonials"
      className="py-20 bg-gradient-to-b from-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
            Real Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Hear From Our Happy Travellers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t just take our word for it — watch real clients share
            their Holiday Pulse stories, straight from the destinations you
            dream about.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              data-ocid={`video_testimonials.item.${i + 1}`}
            >
              {/* 16:9 YouTube embed */}
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={t.videoUrl}
                  title={`${t.name} testimonial`}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ borderRadius: "0" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <p className="font-semibold text-slate-800">{t.name}</p>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.color}`}
                  >
                    {t.destination}
                  </span>
                </div>
                <p className="text-gray-500 text-sm italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 bg-teal-50 border border-teal-100 rounded-2xl px-8 py-6">
          <p className="text-slate-700 font-medium">
            Want to share your story with future travellers?
          </p>
          <a
            href="https://wa.me/919160393773"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors"
            data-ocid="video_testimonials.button"
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
