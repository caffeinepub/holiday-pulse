import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

const phones = [
  { number: "+91-9160393773", wa: "919160393773" },
  { number: "+91-7304639292", wa: "917304639292" },
  { number: "+91-9985932323", wa: "919985932323" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-3">
            Contact Holiday Pulse
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Ready to book your dream Andaman trip? Reach us on WhatsApp, call
            us, or drop an email — we're happy to help plan your perfect
            getaway.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Phone / WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-teal-50 rounded-2xl p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-navy-800 mb-3">Phone / WhatsApp</h3>
            <div className="space-y-2">
              {phones.map((p) => (
                <a
                  key={p.number}
                  href={`https://wa.me/${p.wa}?text=Hi%20Holiday%20Pulse!%20I%20want%20to%20enquire%20about%20Andaman%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.link"
                  className="flex items-center gap-2 text-teal-700 font-medium text-sm hover:text-teal-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  {p.number}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Email & Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-teal-50 rounded-2xl p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-navy-800 mb-3">Email & Website</h3>
            <a
              href="mailto:info@holidaypulse.co.in"
              data-ocid="contact.link"
              className="flex items-center gap-2 text-teal-700 font-medium text-sm hover:text-teal-600 mb-2 break-all"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              info@holidaypulse.co.in
            </a>
            <a
              href="https://www.holidaypulse.co.in"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.link"
              className="flex items-center gap-2 text-teal-700 font-medium text-sm hover:text-teal-600"
            >
              <Globe className="w-4 h-4" />
              www.holidaypulse.co.in
            </a>
          </motion.div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-teal-50 rounded-2xl p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-navy-800 mb-3">Our Offices</h3>
            <div className="space-y-2">
              {["Port Blair (HQ)", "Hyderabad", "Vizag"].map((office) => (
                <div
                  key={office}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                  {office}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-teal-200">
              <p className="text-xs text-gray-500">Destinations covered:</p>
              <p className="text-xs font-medium text-teal-700 mt-1">
                Andaman & Nicobar • Lakshadweep • North-East India
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
