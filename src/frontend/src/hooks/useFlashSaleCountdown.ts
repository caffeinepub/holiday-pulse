import { useEffect, useState } from "react";

const FLASH_SALE_END_KEY = "hp_flash_sale_end";
const FLASH_SALE_DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours

export interface FlashSaleTimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  formatted: string;
}

export function useFlashSaleCountdown(): FlashSaleTimeLeft {
  const [timeLeft, setTimeLeft] = useState<FlashSaleTimeLeft>({
    hours: 71,
    minutes: 59,
    seconds: 59,
    expired: false,
    formatted: "71:59:59",
  });

  useEffect(() => {
    let endTime = Number.parseInt(
      localStorage.getItem(FLASH_SALE_END_KEY) ?? "0",
    );
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + FLASH_SALE_DURATION_MS;
      localStorage.setItem(FLASH_SALE_END_KEY, endTime.toString());
    }

    const calculate = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
          formatted: "00:00:00",
        });
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const fmt = (n: number) => n.toString().padStart(2, "0");
      setTimeLeft({
        hours,
        minutes,
        seconds,
        expired: false,
        formatted: `${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
