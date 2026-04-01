import { Button } from "@/components/ui/button";
import { Menu, Palmtree, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onAdminClick: () => void;
  bannerHeight?: number;
}

interface NavLink {
  label: string;
  href: string;
  dest: string | null;
  highlight?: boolean;
  flashSale?: boolean;
  specialOffer?: boolean;
  referEarn?: boolean;
}

export function Header({ onAdminClick, bannerHeight = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Andaman", href: "#packages", dest: "andaman" },
    { label: "Lakshadweep", href: "#packages", dest: "lakshadweep" },
    { label: "North-East", href: "#packages", dest: "northeast" },
    {
      label: "✈ Plan My Trip",
      href: "#trip-finder",
      dest: null,
      highlight: true,
    },
    {
      label: "🔥 Flash Sale",
      href: "#flash-sale",
      dest: null,
      flashSale: true,
    },
    {
      label: "🎯 Special Offer",
      href: "/offer",
      dest: null,
      specialOffer: true,
    },
    {
      label: "🎁 Refer & Earn",
      href: "#refer",
      dest: null,
      referEarn: true,
    },
    { label: "Gallery", href: "#gallery", dest: null },
    { label: "Reviews", href: "#reviews", dest: null },
    { label: "📹 Videos", href: "#video-testimonials", dest: null },
    { label: "📖 Blog", href: "#travel-blog", dest: null },
    { label: "Contact", href: "#contact", dest: null },
  ];

  const handleNavClick = (link: NavLink) => {
    if (link.dest) {
      window.dispatchEvent(
        new CustomEvent("selectDestination", { detail: link.dest }),
      );
    }
    setMenuOpen(false);
  };

  const getLinkClass = (link: NavLink) => {
    if (link.flashSale)
      return "text-sm font-bold px-3 py-1.5 rounded-full shadow-sm transition-all text-white hover:opacity-90";
    if (link.specialOffer)
      return "text-sm font-bold px-3 py-1.5 rounded-full shadow-sm transition-all text-white hover:opacity-90";
    if (link.referEarn)
      return "text-sm font-bold px-3 py-1.5 rounded-full shadow-sm transition-all text-white hover:opacity-90";
    if (link.highlight)
      return "bg-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded-full hover:bg-teal-600 shadow-sm transition-colors";
    return "text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors";
  };

  const getLinkStyle = (link: NavLink): React.CSSProperties | undefined => {
    if (link.flashSale)
      return {
        background: "linear-gradient(135deg, #ea580c, #dc2626)",
        boxShadow: "0 2px 8px rgba(220,38,38,0.35)",
      };
    if (link.specialOffer)
      return {
        background: "linear-gradient(135deg, #d97706, #b45309)",
        boxShadow: "0 2px 8px rgba(180,83,9,0.35)",
      };
    if (link.referEarn)
      return {
        background: "linear-gradient(135deg, #0d9488, #059669)",
        boxShadow: "0 2px 8px rgba(5,150,105,0.35)",
      };
    return undefined;
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-teal-50"
          : "bg-white/70 backdrop-blur-sm"
      }`}
      style={{ top: bannerHeight > 0 ? `${bannerHeight}px` : "0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            data-ocid="header.link"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm">
              <Palmtree className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-navy-800 tracking-tight">
              Holiday<span className="text-teal-500">Pulse</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="header.link"
                onClick={() => handleNavClick(link)}
                className={getLinkClass(link)}
                style={getLinkStyle(link)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919160393773"
              className="flex items-center gap-1.5 text-sm text-teal-600 font-medium hover:text-teal-700"
              data-ocid="header.link"
            >
              <Phone className="w-3.5 h-3.5" />
              +91-91603 93773
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdminClick}
              className="rounded-full border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-400"
              data-ocid="header.button"
            >
              Admin
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-teal-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4"
          >
            <nav className="flex flex-col gap-3 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link)}
                  className={
                    link.flashSale
                      ? "text-sm font-bold text-orange-600 py-1"
                      : link.specialOffer
                        ? "text-sm font-bold text-amber-600 py-1"
                        : link.referEarn
                          ? "text-sm font-bold text-teal-600 py-1"
                          : link.highlight
                            ? "text-sm font-semibold text-teal-600 py-1"
                            : "text-sm font-medium text-gray-700 hover:text-teal-600 py-1"
                  }
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+919160393773"
                className="flex items-center gap-1.5 text-sm text-teal-600 font-medium py-1"
              >
                <Phone className="w-3.5 h-3.5" />
                +91-91603 93773
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  onAdminClick();
                }}
                className="rounded-full border-teal-300 text-teal-700 w-fit mt-2"
              >
                Admin
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
