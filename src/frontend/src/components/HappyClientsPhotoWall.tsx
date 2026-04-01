import { motion } from "motion/react";

const clientPhotos = [
  {
    src: "/assets/generated/happy-clients-andaman.dim_400x300.jpg",
    badge: "Andaman",
    color: "bg-teal-500",
    alt: "Happy clients in Andaman Islands",
  },
  {
    src: "/assets/generated/happy-clients-lakshadweep.dim_400x300.jpg",
    badge: "Lakshadweep",
    color: "bg-blue-500",
    alt: "Happy clients in Lakshadweep",
  },
  {
    src: "/assets/generated/happy-clients-northeast.dim_400x300.jpg",
    badge: "North-East",
    color: "bg-emerald-500",
    alt: "Happy clients in North-East India",
  },
  {
    src: "/assets/generated/happy-clients-cruise.dim_400x300.jpg",
    badge: "Andaman Cruise",
    color: "bg-indigo-500",
    alt: "Happy clients on Andaman Cruise",
  },
];

export function HappyClientsPhotoWall() {
  return (
    <section
      className="py-20 px-4"
      style={{
        background:
          "linear-gradient(135deg, #fffbf0 0%, #fef3c7 50%, #fff7ed 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl">😊</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              Real Journeys, Real Smiles
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Our Happy Clients
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Real moments from real journeys — memories made with Holiday Pulse
          </p>
        </motion.div>

        {/* Photo wall grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clientPhotos.map((photo, idx) => (
            <motion.div
              key={photo.badge}
              data-ocid={`happy-clients.item.${idx + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Destination badge */}
              <span
                className={`absolute bottom-3 left-3 px-2.5 py-1 ${photo.color} text-white text-xs font-bold rounded-full shadow`}
              >
                {photo.badge}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 text-gray-500 text-sm"
        >
          💛 Join thousands of happy travellers who chose Holiday Pulse
        </motion.p>
      </div>
    </section>
  );
}
