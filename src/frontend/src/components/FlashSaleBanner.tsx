import { Clock, Flame, X } from "lucide-react";
import { useFlashSaleCountdown } from "../hooks/useFlashSaleCountdown";

interface FlashSaleBannerProps {
  onDismiss: () => void;
}

export function FlashSaleBanner({ onDismiss }: FlashSaleBannerProps) {
  const { hours, minutes, seconds, expired } = useFlashSaleCountdown();

  if (expired) return null;

  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] text-white"
      style={{
        background:
          "linear-gradient(90deg, #c2410c 0%, #dc2626 40%, #be185d 100%)",
      }}
      data-ocid="flash_sale.panel"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center gap-3">
        {/* Pulsing badge */}
        <div className="relative flex-shrink-0 hidden sm:flex items-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/30" />
          <span className="relative flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/40 whitespace-nowrap">
            <Flame className="w-3 h-3 text-orange-200" />
            FLASH SALE
          </span>
        </div>

        {/* Mobile flame icon */}
        <Flame className="w-4 h-4 text-orange-200 flex-shrink-0 sm:hidden" />

        {/* Main text */}
        <p className="text-xs sm:text-sm font-medium flex-1 min-w-0 truncate">
          <span className="font-bold">🎉 Up to 30% OFF</span>{" "}
          <span className="hidden xs:inline">on selected packages!</span>{" "}
          <span className="text-orange-200 font-semibold text-xs">
            Limited time only.
          </span>
        </p>

        {/* Countdown timer */}
        <div
          className="flex items-center gap-1.5 flex-shrink-0"
          data-ocid="flash_sale.loading_state"
        >
          <Clock className="w-3.5 h-3.5 opacity-80 hidden sm:block" />
          <div className="flex items-center gap-0.5 font-mono text-xs sm:text-sm font-bold">
            <span className="bg-white/20 px-1.5 py-0.5 rounded tabular-nums">
              {fmt(hours)}
            </span>
            <span className="opacity-60 mx-0.5">:</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded tabular-nums">
              {fmt(minutes)}
            </span>
            <span className="opacity-60 mx-0.5">:</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded tabular-nums">
              {fmt(seconds)}
            </span>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors"
          aria-label="Dismiss flash sale banner"
          data-ocid="flash_sale.close_button"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
