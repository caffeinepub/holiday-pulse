import { useState } from "react";

const WA_NUMBER = "919160393773";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Holiday Pulse, I'm interested in a package")}`;

export function WhatsAppFloatingCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed z-[9990] flex flex-col items-end gap-2"
      style={{ bottom: "5.5rem", right: "1.25rem" }}
    >
      {hovered && (
        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap mr-1 animate-fade-in">
          Chat with us on WhatsApp
        </div>
      )}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp_cta.button"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold rounded-full shadow-2xl transition-colors duration-200 px-4 py-3 wa-pulse"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-white flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16 0C7.164 0 0 7.164 0 16c0 2.822.737 5.474 2.027 7.774L0 32l8.47-2.004A15.932 15.932 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.294 22.558c-.347.977-2.02 1.874-2.786 1.992-.713.11-1.614.156-2.605-.164-.6-.192-1.373-.447-2.357-.877-4.147-1.79-6.85-5.968-7.06-6.244-.207-.276-1.682-2.24-1.682-4.27 0-2.033 1.066-3.031 1.444-3.444.378-.413.825-.516 1.1-.516.276 0 .55.003.792.015.253.013.595-.096.932.71.347.828 1.176 2.86 1.278 3.067.103.207.172.45.034.726-.138.276-.207.45-.413.69-.207.24-.435.537-.62.72-.207.206-.422.43-.181.843.24.413 1.066 1.76 2.29 2.852 1.573 1.4 2.9 1.832 3.313 2.038.413.207.655.172.896-.104.24-.276 1.03-1.204 1.307-1.617.276-.413.55-.344.927-.207.378.138 2.395 1.13 2.808 1.337.413.207.69.31.792.48.103.172.103.997-.244 1.974z" />
        </svg>
        <span className="text-sm">Chat Now</span>
      </a>
    </div>
  );
}
