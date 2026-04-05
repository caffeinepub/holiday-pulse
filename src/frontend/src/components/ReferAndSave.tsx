import { useEffect, useState } from "react";

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

// Seeded leaderboard names for social proof
const SEED_LEADERS = [
  { name: "Priya S.", city: "Mumbai", refs: 12, reward: "₹6,000" },
  { name: "Rajesh K.", city: "Chennai", refs: 9, reward: "₹4,500" },
  { name: "Ananya M.", city: "Bangalore", refs: 7, reward: "₹3,500" },
  { name: "Suresh P.", city: "Hyderabad", refs: 5, reward: "₹2,500" },
  { name: "Meena R.", city: "Delhi", refs: 3, reward: "₹1,500" },
];

function generateCode(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: len },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

export function ReferAndSave() {
  const [copied, setCopied] = useState(false);
  const [myCode, setMyCode] = useState("");
  const [myRefs, setMyRefs] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Get or create unique referral code
    let code = localStorage.getItem("hp_ref_code");
    if (!code) {
      code = generateCode();
      localStorage.setItem("hp_ref_code", code);
    }
    setMyCode(code);

    // Track if this visitor arrived via a referral link
    const urlParams = new URLSearchParams(window.location.search);
    const incomingRef = urlParams.get("ref");
    if (incomingRef && incomingRef !== code) {
      const key = `hp_ref_clicks_${incomingRef}`;
      const prev = Number.parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, String(prev + 1));
    }

    // Load own referral count
    const myClicks = Number.parseInt(
      localStorage.getItem(`hp_ref_clicks_${code}`) || "0",
      10,
    );
    setMyRefs(myClicks);
  }, []);

  const referralLink = `www.holidaypulse.ind?ref=${myCode}`;
  const waMessage = encodeURIComponent(
    `Hey! I just booked my dream trip with Holiday Pulse 🌊✈️ They have amazing packages for Andaman, Lakshadweep & North-East India. Use my referral link and we both get ₹500 off! Check it out: ${referralLink}`,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reward = `₹${myRefs * 500}`;

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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

        {/* My Referral Stats */}
        {myCode && (
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-5 mb-8 max-w-xl mx-auto">
            <div className="text-white/70 text-xs uppercase tracking-widest mb-2 font-semibold">
              Your Referral Code
            </div>
            <div className="text-2xl font-extrabold text-yellow-300 tracking-widest mb-3">
              {myCode}
            </div>
            <div className="flex justify-center gap-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-extrabold">{myRefs}</div>
                <div className="text-white/65 text-xs">Friends Referred</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-extrabold text-yellow-300">
                  {myRefs > 0 ? reward : "₹500"}
                </div>
                <div className="text-white/65 text-xs">
                  {myRefs > 0 ? "Total Earned" : "First Reward"}
                </div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-extrabold">
                  {myRefs > 0 ? "🥇" : "🎯"}
                </div>
                <div className="text-white/65 text-xs">
                  {myRefs > 0 ? "Top Referrer" : "Start Sharing!"}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
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
          <button
            type="button"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 text-sm"
          >
            🏆 Leaderboard
          </button>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 max-w-lg mx-auto text-left">
            <h3 className="text-white font-extrabold text-lg text-center mb-1">
              🏆 Top Referrers This Month
            </h3>
            <p className="text-white/60 text-xs text-center mb-4">
              This month&apos;s top sharers
            </p>
            <div className="space-y-2">
              {SEED_LEADERS.map((leader, i) => (
                <div
                  key={leader.name}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold ${
                      i === 0
                        ? "bg-yellow-400 text-gray-900"
                        : i === 1
                          ? "bg-gray-300 text-gray-700"
                          : i === 2
                            ? "bg-amber-600 text-white"
                            : "bg-white/20 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm">
                      {leader.name}
                    </div>
                    <div className="text-white/55 text-xs">{leader.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-300 font-extrabold text-sm">
                      {leader.refs} referrals
                    </div>
                    <div className="text-white/55 text-xs">
                      {leader.reward} earned
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-white/15 rounded-xl px-4 py-3 border border-yellow-400/30">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs font-extrabold">
                  You
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">
                    Your Position
                  </div>
                  <div className="text-white/55 text-xs">Code: {myCode}</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-300 font-extrabold text-sm">
                    {myRefs} referrals
                  </div>
                  <div className="text-white/55 text-xs">
                    {myRefs > 0 ? `${reward} earned` : "Start sharing!"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
