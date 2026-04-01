import { Button } from "@/components/ui/button";
import { Menu, Palmtree, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onAdminClick: () => void;
  bannerHeight?: number;
}

export function Header({ onAdminClick, bannerHeight = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    setMenuOpen(false);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.xe.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
              data-ocid="header.link"
            >
              <span>💱</span>
              Currency Converter
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
              data-ocid="header.link"
            >
              Contact
            </a>
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
              <a
                href="https://www.xe.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-teal-600 py-1"
                onClick={() => setMenuOpen(false)}
              >
                <span>💱</span>
                Currency Converter
              </a>
              <button
                type="button"
                onClick={scrollToContact}
                className="text-left text-sm font-medium text-gray-700 hover:text-teal-600 py-1"
              >
                Contact
              </button>
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
