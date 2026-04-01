import { useState } from "react";

const WA_NUMBER = "919160393773";

const steps = [
  {
    icon: "🔗",
    step: "1",
    title: "Share your link",
    desc: "Send your referral link to friends & family",
  },
  {
    icon: "✈️",
    step: "2",
    title: "Friend books a trip",
    desc: "Your friend books any Holiday Pulse package",
  },
  {
    icon: "🎁",
    step: "3",
    title: "Both get ₹500 off",
    desc: "Discount applied on both your next bookings",
  },
];

export function ReferAndSave() {
  const [copied, setCopied] = useState(false);

  const referralLink = "www.holidaypulse.ind?ref=friend";
  const waMessage = encodeURIComponent(
    `Hey! I just booked my dream trip with Holiday Pulse 🌊✈️ They have amazing packages for Andaman, Lakshadweep & North-East India. Use my referral link and we both get ₹500 off! Check it out: ${referralLink}`,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      // clipboard unavailable, still show feedback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20" id="refer">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          🎁 Referral Program
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
          Love Holiday Pulse? Spread the Joy! 🎁
        </h2>
        <p className="text-white/85 text-lg mb-8">
          Refer a friend and{" "}
          <span className="font-bold text-yellow-300">
            BOTH of you get ₹500 off
          </span>{" "}
          your next trip
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="refer.primary_button"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 text-sm"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M16 0C7.164 0 0 7.164 0 16c0 2.822.737 5.474 2.027 7.774L0 32l8.47-2.004A15.932 15.932 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.294 22.558c-.347.977-2.02 1.874-2.786 1.992-.713.11-1.614.156-2.605-.164-.6-.192-1.373-.447-2.357-.877-4.147-1.79-6.85-5.968-7.06-6.244-.207-.276-1.682-2.24-1.682-4.27 0-2.033 1.066-3.031 1.444-3.444.378-.413.825-.516 1.1-.516.276 0 .55.003.792.015.253.013.595-.096.932.71.347.828 1.176 2.86 1.278 3.067.103.207.172.45.034.726-.138.276-.207.45-.413.69-.207.24-.435.537-.62.72-.207.206-.422.43-.181.843.24.413 1.066 1.76 2.29 2.852 1.573 1.4 2.9 1.832 3.313 2.038.413.207.655.172.896-.104.24-.276 1.03-1.204 1.307-1.617.276-.413.55-.344.927-.207.378.138 2.395 1.13 2.808 1.337.413.207.69.31.792.48.103.172.103.997-.244 1.974z" />
            </svg>
            Share on WhatsApp 📱
          </a>
          <button
            type="button"
            onClick={handleCopy}
            data-ocid="refer.secondary_button"
            className={`inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 text-sm border-2 ${
              copied
                ? "bg-emerald-400 border-emerald-400 text-white"
                : "bg-white/15 hover:bg-white/25 border-white/40 text-white"
            }`}
          >
            {copied ? "Copied! ✓" : "Copy Referral Link 🔗"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-white border border-white/20"
              data-ocid={`refer.item.${i + 1}`}
            >
              <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                {s.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                Step {s.step}
              </div>
              <div className="font-bold text-base mb-1">{s.title}</div>
              <div className="text-white/70 text-xs leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
