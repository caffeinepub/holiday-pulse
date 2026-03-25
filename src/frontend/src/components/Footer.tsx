import { Globe, Mail, Palmtree, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Palmtree className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">HolidayPulse</span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              Your trusted travel partner for island escapes. Offices in Port
              Blair, Hyderabad & Vizag.
            </p>
            <div className="space-y-1.5">
              <a
                href="tel:+919160393773"
                className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
              >
                <Phone className="w-3.5 h-3.5" /> +91-9160393773
              </a>
              <a
                href="mailto:info@holidaypulse.co.in"
                className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
              >
                <Mail className="w-3.5 h-3.5" /> info@holidaypulse.co.in
              </a>
              <a
                href="https://www.holidaypulse.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
              >
                <Globe className="w-3.5 h-3.5" /> www.holidaypulse.co.in
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2">
              {[
                "Andaman & Nicobar",
                "Lakshadweep",
                "North-East India",
                "Port Blair",
                "Havelock Island",
                "Neil Island",
              ].map((d) => (
                <li key={d}>
                  <a
                    href="#packages"
                    className="text-white/75 text-sm hover:text-white transition-colors"
                  >
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Packages", href: "#packages" },
                { label: "Activities", href: "#activities" },
                { label: "Contact", href: "#contact" },
                { label: "Admin Panel", href: "/admin" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/75 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Our Packages
            </h4>
            <ul className="space-y-2">
              {[
                "Andaman Escape (3D/4N)",
                "Andaman Explorer (4D/5N)",
                "Andaman Premium (5D/6N)",
                "Custom Group Tours",
              ].map((p) => (
                <li key={p}>
                  <a
                    href="#packages"
                    className="text-white/75 text-sm hover:text-white transition-colors"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/70 text-sm">
            © {year} Holiday Pulse. All rights reserved.
          </p>
          <p className="text-white/60 text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/90"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
