import { useNavigate } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface DialItem {
  emoji: string;
  label: string;
  color: string;
  borderColor: string;
  action: () => void;
  ocid: string;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function FloatingIconDial() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const items: DialItem[] = [
    {
      emoji: "🗺️",
      label: "Explore Packages",
      color: "bg-teal-50 hover:bg-teal-100",
      borderColor: "border-l-teal-500",
      action: () => scrollTo("packages"),
      ocid: "dial.explore_packages.button",
    },
    {
      emoji: "🚢",
      label: "Cruise Packages",
      color: "bg-blue-50 hover:bg-blue-100",
      borderColor: "border-l-blue-600",
      action: () => {
        scrollTo("packages");
        setTimeout(() => {
          const tab = document.querySelector<HTMLElement>(
            '[data-value="andaman-cruise"], [value="andaman-cruise"]',
          );
          if (tab) tab.click();
        }, 400);
      },
      ocid: "dial.cruise_packages.button",
    },
    {
      emoji: "📞",
      label: "Contact Us",
      color: "bg-green-50 hover:bg-green-100",
      borderColor: "border-l-green-500",
      action: () => scrollTo("contact"),
      ocid: "dial.contact.button",
    },
    {
      emoji: "💬",
      label: "Chat Now",
      color: "bg-violet-50 hover:bg-violet-100",
      borderColor: "border-l-violet-600",
      action: () => window.dispatchEvent(new CustomEvent("openYatrik")),
      ocid: "dial.chat_now.button",
    },
    {
      emoji: "✈️",
      label: "Plan My Trip",
      color: "bg-sky-50 hover:bg-sky-100",
      borderColor: "border-l-sky-500",
      action: () => scrollTo("trip-finder"),
      ocid: "dial.plan_trip.button",
    },
    {
      emoji: "🔥",
      label: "Flash Sale",
      color: "bg-orange-50 hover:bg-orange-100",
      borderColor: "border-l-orange-500",
      action: () => scrollTo("flash-sale"),
      ocid: "dial.flash_sale.button",
    },
    {
      emoji: "🎯",
      label: "Special Offer",
      color: "bg-amber-50 hover:bg-amber-100",
      borderColor: "border-l-amber-500",
      action: () => navigate({ to: "/offer" }),
      ocid: "dial.special_offer.button",
    },
    {
      emoji: "🎁",
      label: "Refer & Earn",
      color: "bg-emerald-50 hover:bg-emerald-100",
      borderColor: "border-l-emerald-500",
      action: () => scrollTo("refer-earn"),
      ocid: "dial.refer_earn.button",
    },
    {
      emoji: "🖼️",
      label: "Gallery",
      color: "bg-purple-50 hover:bg-purple-100",
      borderColor: "border-l-purple-500",
      action: () => scrollTo("gallery"),
      ocid: "dial.gallery.button",
    },
    {
      emoji: "⭐",
      label: "Reviews",
      color: "bg-rose-50 hover:bg-rose-100",
      borderColor: "border-l-rose-500",
      action: () => scrollTo("reviews"),
      ocid: "dial.reviews.button",
    },
    {
      emoji: "🎥",
      label: "Videos",
      color: "bg-cyan-50 hover:bg-cyan-100",
      borderColor: "border-l-cyan-500",
      action: () => scrollTo("video-testimonials"),
      ocid: "dial.videos.button",
    },
    {
      emoji: "📝",
      label: "Blog",
      color: "bg-lime-50 hover:bg-lime-100",
      borderColor: "border-l-lime-600",
      action: () => scrollTo("travel-blog"),
      ocid: "dial.blog.button",
    },
  ];

  return (
    <div
      className="fixed right-0 z-40 flex items-center"
      style={{ top: "50%", transform: "translateY(-50%)" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      data-ocid="floating_dial.panel"
    >
      {/* Icon pills — shoot out to the left */}
      <div className="flex flex-col gap-1.5 items-end pr-10">
        <AnimatePresence>
          {open &&
            items.map((item, i) => (
              <motion.button
                key={item.label}
                type="button"
                data-ocid={item.ocid}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  delay: i * 0.045,
                }}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className={`
                  flex items-center gap-2 pl-3 pr-4 py-2
                  rounded-l-2xl rounded-r-none
                  border-l-4 ${item.borderColor}
                  ${item.color}
                  shadow-md hover:shadow-lg
                  transition-transform duration-150 hover:scale-105
                  text-left whitespace-nowrap
                  cursor-pointer
                `}
              >
                <span className="text-base leading-none sm:text-lg">
                  {item.emoji}
                </span>
                <span className="hidden sm:inline text-sm font-semibold text-gray-700">
                  {item.label}
                </span>
              </motion.button>
            ))}
        </AnimatePresence>
      </div>

      {/* Toggle tab — always visible on right edge */}
      <button
        type="button"
        data-ocid="floating_dial.toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick access menu" : "Open quick access menu"}
        aria-expanded={open}
        className="
          absolute right-0
          flex items-center justify-center
          w-10 h-20
          bg-gradient-to-b from-teal-500 to-teal-600
          hover:from-teal-400 hover:to-teal-500
          rounded-l-2xl
          shadow-lg hover:shadow-xl
          transition-all duration-200
          cursor-pointer
          border-0
        "
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex items-center justify-center"
        >
          <LayoutGrid className="w-5 h-5 text-white" />
        </motion.span>
      </button>
    </div>
  );
}
