import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  weatherCode: number;
}

interface Destination {
  name: string;
  city: string;
  lat: number;
  lon: number;
  bestTime: string;
  bestTimeColor: string;
  fallback: WeatherData;
}

const destinations: Destination[] = [
  {
    name: "Andaman & Nicobar",
    city: "Port Blair",
    lat: 11.6234,
    lon: 92.7265,
    bestTime: "Oct – May",
    bestTimeColor: "teal",
    fallback: {
      temperature: 29,
      humidity: 80,
      windSpeed: 15,
      uvIndex: 8,
      weatherCode: 1,
    },
  },
  {
    name: "Lakshadweep",
    city: "Kavaratti",
    lat: 10.5669,
    lon: 72.642,
    bestTime: "Oct – May",
    bestTimeColor: "blue",
    fallback: {
      temperature: 31,
      humidity: 75,
      windSpeed: 18,
      uvIndex: 9,
      weatherCode: 0,
    },
  },
  {
    name: "North-East India",
    city: "Guwahati",
    lat: 26.1445,
    lon: 91.7362,
    bestTime: "Mar – Jun, Sep – Nov",
    bestTimeColor: "green",
    fallback: {
      temperature: 26,
      humidity: 72,
      windSpeed: 10,
      uvIndex: 6,
      weatherCode: 2,
    },
  },
];

function getWeatherInfo(code: number): {
  emoji: string;
  label: string;
  gradient: string;
} {
  if (code === 0)
    return {
      emoji: "☀️",
      label: "Clear Sky",
      gradient: "from-amber-100 via-yellow-50 to-orange-50",
    };
  if (code <= 3)
    return {
      emoji: "🌤️",
      label: "Partly Cloudy",
      gradient: "from-sky-100 via-blue-50 to-indigo-50",
    };
  if (code === 45 || code === 48)
    return {
      emoji: "🌫️",
      label: "Foggy",
      gradient: "from-gray-100 via-slate-50 to-zinc-50",
    };
  if (code >= 51 && code <= 55)
    return {
      emoji: "🌦️",
      label: "Drizzle",
      gradient: "from-blue-100 via-cyan-50 to-teal-50",
    };
  if (code >= 61 && code <= 65)
    return {
      emoji: "🌧️",
      label: "Rain",
      gradient: "from-blue-200 via-blue-100 to-indigo-50",
    };
  if (code >= 71 && code <= 75)
    return {
      emoji: "🌨️",
      label: "Snow",
      gradient: "from-slate-100 via-white to-blue-50",
    };
  if (code >= 80 && code <= 82)
    return {
      emoji: "⛈️",
      label: "Showers",
      gradient: "from-indigo-100 via-blue-100 to-cyan-50",
    };
  if (code >= 95)
    return {
      emoji: "⛈️",
      label: "Thunderstorm",
      gradient: "from-gray-200 via-slate-100 to-purple-50",
    };
  return {
    emoji: "🌡️",
    label: "Unknown",
    gradient: "from-teal-50 via-white to-sky-50",
  };
}

function getTravelTip(code: number): string {
  if (code === 0 || code <= 3)
    return "Perfect for beach activities and sightseeing!";
  if (code === 45 || code === 48)
    return "Misty and mysterious — great for photography.";
  if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  )
    return "Pack a light rain jacket for outdoor activities.";
  if (code >= 95) return "Best to plan indoor activities today.";
  return "Check local forecasts before heading out.";
}

function getBestTimeBadgeClass(color: string): string {
  if (color === "teal") return "bg-teal-100 text-teal-800 border-teal-200";
  if (color === "blue") return "bg-blue-100 text-blue-800 border-blue-200";
  if (color === "green") return "bg-green-100 text-green-800 border-green-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
}

type LoadState = "loading" | "success" | "error";

function WeatherCard({
  dest,
  weather,
  loadState,
  index,
}: {
  dest: Destination;
  weather: WeatherData | null;
  loadState: LoadState;
  index: number;
}) {
  const data = weather ?? dest.fallback;
  const { emoji, label, gradient } = getWeatherInfo(data.weatherCode);
  const tip = getTravelTip(data.weatherCode);
  const badgeClass = getBestTimeBadgeClass(dest.bestTimeColor);

  if (loadState === "loading") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 shadow-sm">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-16 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className={`rounded-2xl bg-gradient-to-br ${gradient} border border-white/80 shadow-md overflow-hidden`}
      data-ocid={`weather.item.${index + 1}`}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">
              {dest.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{dest.city}</p>
          </div>
          <span className="text-4xl">{emoji}</span>
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-2">
          <span className="text-6xl font-extrabold text-gray-900 leading-none">
            {Math.round(data.temperature)}°
          </span>
          <span className="text-2xl font-semibold text-gray-400 mb-2">C</span>
        </div>

        {/* Condition */}
        <p className="text-base font-semibold text-gray-700">{label}</p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1 bg-white/60 rounded-full px-3 py-1">
            💧 {data.humidity}%
          </span>
          <span className="flex items-center gap-1 bg-white/60 rounded-full px-3 py-1">
            💨 {data.windSpeed} km/h
          </span>
          <span className="flex items-center gap-1 bg-white/60 rounded-full px-3 py-1">
            ☀️ UV {data.uvIndex}
          </span>
        </div>

        {/* Best time badge */}
        <div>
          <Badge
            className={`${badgeClass} border text-xs font-semibold px-2.5 py-1`}
          >
            🗓️ Best Time: {dest.bestTime}
          </Badge>
        </div>

        {/* Travel tip */}
        <p className="text-sm text-gray-600 italic border-t border-white/60 pt-3">
          ✈️ {tip}
        </p>
      </div>
    </motion.div>
  );
}

export function WeatherSection() {
  const [weatherMap, setWeatherMap] = useState<
    Record<string, WeatherData | null>
  >({});
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoadState("loading");
    try {
      const results = await Promise.all(
        destinations.map(async (dest) => {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,uv_index&timezone=auto`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("fetch failed");
          const json = await res.json();
          const c = json.current;
          return {
            key: dest.name,
            data: {
              temperature: c.temperature_2m,
              humidity: c.relative_humidity_2m,
              windSpeed: c.wind_speed_10m,
              uvIndex: c.uv_index ?? 0,
              weatherCode: c.weather_code,
            } as WeatherData,
          };
        }),
      );
      const map: Record<string, WeatherData> = {};
      for (const r of results) map[r.key] = r.data;
      setWeatherMap(map);
      setLastUpdated(new Date());
      setLoadState("success");
    } catch {
      setLoadState("error");
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <section
      id="weather"
      className="py-20 px-4 bg-gradient-to-b from-sky-50 via-blue-50 to-white"
      data-ocid="weather.section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3"
          >
            🌤️ Live Weather at Your Destination
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-500 text-base max-w-xl mx-auto"
          >
            Real-time weather conditions to help you pack right and plan better.
          </motion.p>

          {/* Refresh & Last Updated */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {lastUpdated && (
              <span className="text-xs text-gray-400">
                {loadState === "error"
                  ? "Using seasonal data"
                  : `Updated at ${formatTime(lastUpdated)}`}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchWeather}
              disabled={loadState === "loading"}
              className="rounded-full border-teal-300 text-teal-700 hover:bg-teal-50 gap-1.5 text-xs"
              data-ocid="weather.button"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loadState === "loading" ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {loadState === "error" && (
            <p
              className="text-xs text-amber-600 mt-2"
              data-ocid="weather.error_state"
            >
              ⚠️ Live data unavailable — showing typical seasonal conditions.
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <WeatherCard
              key={dest.name}
              dest={dest}
              weather={weatherMap[dest.name] ?? null}
              loadState={loadState}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
