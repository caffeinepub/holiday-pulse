import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const notifications = [
  {
    name: "Priya S.",
    city: "Mumbai",
    action: "just booked Andaman 5N/6D",
    time: "2 mins ago",
    color: "bg-teal-500",
  },
  {
    name: "Rajesh K.",
    city: "Hyderabad",
    action: "sent an enquiry for Lakshadweep Explorer",
    time: "5 mins ago",
    color: "bg-indigo-500",
  },
  {
    name: "Ananya M.",
    city: "Bengaluru",
    action: "just booked Andaman Premium",
    time: "8 mins ago",
    color: "bg-amber-500",
  },
  {
    name: "Vikram T.",
    city: "Chennai",
    action: "enquired about North-East India Tour",
    time: "11 mins ago",
    color: "bg-amber-500",
  },
  {
    name: "Meera P.",
    city: "Delhi",
    action: "just booked Andaman Escape 3N/4D",
    time: "14 mins ago",
    color: "bg-teal-600",
  },
  {
    name: "Suresh R.",
    city: "Pune",
    action: "just booked Andaman 7-Night Cruise",
    time: "18 mins ago",
    color: "bg-indigo-600",
  },
  {
    name: "Kavya N.",
    city: "Kolkata",
    action: "just booked Lakshadweep Budget",
    time: "22 mins ago",
    color: "bg-emerald-500",
  },
  {
    name: "Arjun B.",
    city: "Ahmedabad",
    action: "enquired about Andaman Group Tour",
    time: "25 mins ago",
    color: "bg-rose-500",
  },
  {
    name: "Deepa V.",
    city: "Kochi",
    action: "just booked North-East Explorer",
    time: "30 mins ago",
    color: "bg-teal-500",
  },
  {
    name: "Sanjay G.",
    city: "Jaipur",
    action: "just booked Andaman 5-Night Cruise",
    time: "33 mins ago",
    color: "bg-indigo-500",
  },
  {
    name: "Pooja H.",
    city: "Surat",
    action: "sent an enquiry for Andaman Premium",
    time: "37 mins ago",
    color: "bg-amber-600",
  },
  {
    name: "Kiran D.",
    city: "Vizag",
    action: "just booked Lakshadweep Explorer",
    time: "41 mins ago",
    color: "bg-teal-600",
  },
  {
    name: "Ravi C.",
    city: "Lucknow",
    action: "just booked North-East Premium",
    time: "45 mins ago",
    color: "bg-emerald-600",
  },
  {
    name: "Sunita J.",
    city: "Nagpur",
    action: "enquired about Andaman Budget Package",
    time: "50 mins ago",
    color: "bg-emerald-600",
  },
  {
    name: "Manoj F.",
    city: "Chandigarh",
    action: "just booked Andaman 3-Night Cruise",
    time: "55 mins ago",
    color: "bg-indigo-500",
  },
  {
    name: "Lakshmi A.",
    city: "Mysore",
    action: "just booked Andaman Family Escape",
    time: "1 hr ago",
    color: "bg-rose-600",
  },
];

let notifIndex = 0;

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const initial = setTimeout(() => {
      notifIndex = Math.floor(Math.random() * notifications.length);
      setCurrent(notifIndex);
      setVisible(true);
    }, 8000);
    return () => clearTimeout(initial);
  }, []);

  // Auto-dismiss after 5s whenever a notification becomes visible
  useEffect(() => {
    if (!visible) return;
    const dismiss = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(dismiss);
  }, [visible]); // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — current drives key, visible drives timer

  // Queue next notification after random 12–20s gap
  useEffect(() => {
    if (visible) return;
    const delay = 12000 + Math.random() * 8000;
    const next = setTimeout(() => {
      notifIndex = (notifIndex + 1) % notifications.length;
      setCurrent(notifIndex);
      setVisible(true);
    }, delay);
    return () => clearTimeout(next);
  }, [visible]);

  const notif = notifications[current];

  return (
    <div
      className="fixed bottom-6 left-4 z-[9998] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {visible && notif && (
          <motion.div
            key={current}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3 max-w-[300px] cursor-default"
          >
            <div
              className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${notif.color}`}
            >
              {notif.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                <span className="text-gray-900">{notif.name}</span>{" "}
                <span className="text-gray-500">from {notif.city}</span>
              </p>
              <p className="text-xs text-gray-600 leading-tight mt-0.5 truncate">
                {notif.action}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                🕐 {notif.time}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="text-gray-300 hover:text-gray-500 flex-shrink-0 text-base leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
