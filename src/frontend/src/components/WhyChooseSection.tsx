import { BadgeCheck, HeadphonesIcon, Settings, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Users,
    title: "Expert Local Guides",
    description:
      "Our Port Blair-based guides bring unmatched local knowledge of every island, beach, and hidden gem.",
  },
  {
    icon: Settings,
    title: "Customised Packages",
    description:
      "No cookie-cutter tours. Every itinerary is tailored to your group size, budget, and preferences.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "From booking to departure, our team in Port Blair, Hyderabad, and Vizag is always available.",
  },
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    description:
      "Direct booking with us means the best rates — no middlemen, no hidden charges.",
  },
];

export function WhyChooseSection() {
  return (
    <section id="activities" className="py-20 px-4 bg-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/generated/andaman-why-choose.dim_800x600.jpg"
                alt="Andaman Islands scenic view"
                className="w-full h-80 lg:h-[440px] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Features */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                Why Travel With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-3">
                Why Choose Holiday Pulse?
              </h2>
              <p className="text-gray-500 text-base">
                With offices in Port Blair, Hyderabad, and Vizag, we blend local
                expertise with professional service for an unforgettable island
                experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-xs hover:shadow-card transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800 text-sm mb-1">
                      {f.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
