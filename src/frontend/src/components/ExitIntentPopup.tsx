import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WA_NUMBER = "919160393773";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("hp_exit_shown") === "1") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !firedRef.current) {
        firedRef.current = true;
        sessionStorage.setItem("hp_exit_shown", "1");
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClaim = () => {
    const text = encodeURIComponent(
      `Hi Holiday Pulse! I want my FREE Andaman Travel Guide and 5% discount. My name is ${name || "(your name)"}`,
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
          onClick={() => setOpen(false)}
          data-ocid="exit_popup.modal"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
          >
            <div className="h-2 bg-gradient-to-r from-teal-400 via-amber-400 to-indigo-500" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              data-ocid="exit_popup.close_button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-8 py-7">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    You're all set!
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm">
                    WhatsApp is opening — our team will share your guide
                    shortly!
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🌊</div>
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                      Wait! Before You Go...
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                      Get our{" "}
                      <span className="font-bold text-teal-600">
                        FREE Andaman Travel Guide
                      </span>{" "}
                      +{" "}
                      <span className="font-bold text-amber-600">
                        Exclusive 5% off
                      </span>{" "}
                      your first booking
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="exit-name"
                        className="text-xs font-semibold text-gray-600 mb-1 block"
                      >
                        Your Name
                      </label>
                      <input
                        id="exit-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya"
                        data-ocid="exit_popup.input"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="exit-phone"
                        className="text-xs font-semibold text-gray-600 mb-1 block"
                      >
                        WhatsApp Number
                      </label>
                      <input
                        id="exit-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        data-ocid="exit_popup.input"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleClaim}
                      data-ocid="exit_popup.primary_button"
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-200 text-sm"
                    >
                      📲 Claim My Offer on WhatsApp
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-gray-400 mt-4">
                    🔒 We'll never spam. Offer valid for new bookings only.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
