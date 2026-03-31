import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  weatherCode: number;
}

interface MonthGuide {
  month: string;
  tempRange: string;
  rainfall: "Dry" | "Light" | "Moderate" | "Heavy";
  conditions: string;
  suitability: "ideal" | "good" | "average" | "avoid";
  tip: string;
}

interface Destination {
  name: string;
  city: string;
  lat: number;
  lon: number;
  bestTime: string;
  bestTimeColor: string;
  fallback: WeatherData;
  monthlyGuide: MonthGuide[];
}

const andamanGuide: MonthGuide[] = [
  {
    month: "January",
    tempRange: "23–30°C",
    rainfall: "Dry",
    conditions: "Calm seas",
    suitability: "ideal",
    tip: "Best month for snorkeling and beach hopping.",
  },
  {
    month: "February",
    tempRange: "24–31°C",
    rainfall: "Dry",
    conditions: "Calm seas",
    suitability: "ideal",
    tip: "Crystal visibility for diving and water sports.",
  },
  {
    month: "March",
    tempRange: "26–33°C",
    rainfall: "Dry",
    conditions: "Calm seas",
    suitability: "ideal",
    tip: "Warm and sunny — great for island exploration.",
  },
  {
    month: "April",
    tempRange: "27–34°C",
    rainfall: "Light",
    conditions: "Mostly calm",
    suitability: "ideal",
    tip: "Slightly humid but seas stay calm and clear.",
  },
  {
    month: "May",
    tempRange: "27–34°C",
    rainfall: "Moderate",
    conditions: "Moderate",
    suitability: "good",
    tip: "Book early — season winds down towards month end.",
  },
  {
    month: "June",
    tempRange: "26–31°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Monsoon onset; most water activities suspended.",
  },
  {
    month: "July",
    tempRange: "25–30°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Heavy rainfall and rough seas; not recommended.",
  },
  {
    month: "August",
    tempRange: "25–30°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Peak monsoon; ferry services may be disrupted.",
  },
  {
    month: "September",
    tempRange: "25–31°C",
    rainfall: "Moderate",
    conditions: "Moderate",
    suitability: "average",
    tip: "Monsoon eases; lush greenery but intermittent rain.",
  },
  {
    month: "October",
    tempRange: "25–32°C",
    rainfall: "Light",
    conditions: "Calm seas",
    suitability: "ideal",
    tip: "Season reopens — great deals and fewer crowds.",
  },
  {
    month: "November",
    tempRange: "24–30°C",
    rainfall: "Light",
    conditions: "Ideal for diving",
    suitability: "ideal",
    tip: "Peak season begins; perfect underwater visibility.",
  },
  {
    month: "December",
    tempRange: "23–29°C",
    rainfall: "Dry",
    conditions: "Calm seas",
    suitability: "ideal",
    tip: "Festive atmosphere with ideal beach and dive conditions.",
  },
];

const lakshadweepGuide: MonthGuide[] = [
  {
    month: "January",
    tempRange: "25–32°C",
    rainfall: "Dry",
    conditions: "Calm lagoons",
    suitability: "ideal",
    tip: "Perfect turquoise lagoons for snorkeling and kayaking.",
  },
  {
    month: "February",
    tempRange: "25–32°C",
    rainfall: "Dry",
    conditions: "Calm lagoons",
    suitability: "ideal",
    tip: "Best visibility for coral reef exploration.",
  },
  {
    month: "March",
    tempRange: "27–34°C",
    rainfall: "Dry",
    conditions: "Ideal for diving",
    suitability: "ideal",
    tip: "Warm waters and clear skies — diving at its finest.",
  },
  {
    month: "April",
    tempRange: "28–35°C",
    rainfall: "Light",
    conditions: "Calm lagoons",
    suitability: "ideal",
    tip: "Slightly warmer but lagoons remain pristine.",
  },
  {
    month: "May",
    tempRange: "28–35°C",
    rainfall: "Moderate",
    conditions: "Moderate",
    suitability: "good",
    tip: "Pre-monsoon warmth; book before the season closes.",
  },
  {
    month: "June",
    tempRange: "26–31°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Southwest monsoon hits; island access restricted.",
  },
  {
    month: "July",
    tempRange: "25–30°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Heavy rains and choppy waters; ferries suspended.",
  },
  {
    month: "August",
    tempRange: "25–30°C",
    rainfall: "Heavy",
    conditions: "Rough seas",
    suitability: "avoid",
    tip: "Peak monsoon; only adventure travellers venture here.",
  },
  {
    month: "September",
    tempRange: "26–31°C",
    rainfall: "Moderate",
    conditions: "Moderate",
    suitability: "average",
    tip: "Rains ease by late September; early birds get good rates.",
  },
  {
    month: "October",
    tempRange: "26–32°C",
    rainfall: "Light",
    conditions: "Calm lagoons",
    suitability: "ideal",
    tip: "Season reopens with stunning post-monsoon clarity.",
  },
  {
    month: "November",
    tempRange: "25–31°C",
    rainfall: "Dry",
    conditions: "Ideal for diving",
    suitability: "ideal",
    tip: "Premium diving season with incredible coral visibility.",
  },
  {
    month: "December",
    tempRange: "24–30°C",
    rainfall: "Dry",
    conditions: "Calm lagoons",
    suitability: "ideal",
    tip: "Ideal family holiday with calm seas and sunny skies.",
  },
];

const northEastGuide: MonthGuide[] = [
  {
    month: "January",
    tempRange: "8–20°C",
    rainfall: "Dry",
    conditions: "Clear & cool",
    suitability: "good",
    tip: "Cool winter — great for sightseeing and wildlife parks.",
  },
  {
    month: "February",
    tempRange: "10–22°C",
    rainfall: "Light",
    conditions: "Clear & cool",
    suitability: "good",
    tip: "Rhododendrons start blooming in Arunachal Pradesh.",
  },
  {
    month: "March",
    tempRange: "15–28°C",
    rainfall: "Light",
    conditions: "Pleasant & blooming",
    suitability: "ideal",
    tip: "Spring blooms everywhere — perfect for scenic drives.",
  },
  {
    month: "April",
    tempRange: "18–32°C",
    rainfall: "Light",
    conditions: "Festivals & flowers",
    suitability: "ideal",
    tip: "Bihu festival in Assam — vibrant culture and music.",
  },
  {
    month: "May",
    tempRange: "20–34°C",
    rainfall: "Moderate",
    conditions: "Pre-monsoon",
    suitability: "ideal",
    tip: "Warm and lush — great for tea garden visits.",
  },
  {
    month: "June",
    tempRange: "22–32°C",
    rainfall: "Heavy",
    conditions: "Monsoon begins",
    suitability: "average",
    tip: "Heavy rains make some trekking routes difficult.",
  },
  {
    month: "July",
    tempRange: "23–31°C",
    rainfall: "Heavy",
    conditions: "Heavy monsoon",
    suitability: "avoid",
    tip: "Landslides common; road trips not recommended.",
  },
  {
    month: "August",
    tempRange: "22–31°C",
    rainfall: "Heavy",
    conditions: "Heavy monsoon",
    suitability: "avoid",
    tip: "Flooding possible in low-lying areas; plan carefully.",
  },
  {
    month: "September",
    tempRange: "22–30°C",
    rainfall: "Moderate",
    conditions: "Monsoon retreats",
    suitability: "average",
    tip: "Rivers are dramatic and scenic as rains ease.",
  },
  {
    month: "October",
    tempRange: "16–28°C",
    rainfall: "Light",
    conditions: "Golden & clear",
    suitability: "ideal",
    tip: "Post-monsoon golden light — best for photography.",
  },
  {
    month: "November",
    tempRange: "10–24°C",
    rainfall: "Dry",
    conditions: "Clear & crisp",
    suitability: "ideal",
    tip: "Lovely autumn weather; Kaziranga safari season opens.",
  },
  {
    month: "December",
    tempRange: "6–18°C",
    rainfall: "Dry",
    conditions: "Cool & clear",
    suitability: "good",
    tip: "Cool Christmas holidays with clear mountain views.",
  },
];

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
    monthlyGuide: andamanGuide,
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
    monthlyGuide: lakshadweepGuide,
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
    monthlyGuide: northEastGuide,
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

const suitabilityConfig = {
  ideal: {
    label: "Ideal",
    chip: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
  },
  good: {
    label: "Good",
    chip: "bg-teal-100 text-teal-800 border-teal-200",
    dot: "bg-teal-500",
  },
  average: {
    label: "Average",
    chip: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  avoid: {
    label: "Avoid",
    chip: "bg-rose-100 text-rose-800 border-rose-200",
    dot: "bg-rose-500",
  },
};

const rainfallIcon: Record<MonthGuide["rainfall"], string> = {
  Dry: "☀️",
  Light: "🌂",
  Moderate: "🌧️",
  Heavy: "⛈️",
};

function WeatherGuideModal({
  dest,
  open,
  onClose,
}: { dest: Destination; open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="max-w-2xl w-full p-0 overflow-hidden rounded-2xl"
        data-ocid="weather.guide.modal"
      >
        {/* Sticky header */}
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white sticky top-0 z-10">
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            📅 Month-by-Month Weather Guide
          </DialogTitle>
          <p className="text-sky-100 text-sm mt-0.5 font-medium">
            {dest.name} · {dest.city}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="px-4 py-4 space-y-2">
            <AnimatePresence>
              {dest.monthlyGuide.map((m, i) => {
                const sc = suitabilityConfig[m.suitability];
                return (
                  <motion.div
                    key={m.month}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-colors px-4 py-3"
                  >
                    {/* Month name */}
                    <div className="w-24 shrink-0">
                      <span className="font-bold text-gray-800 text-sm">
                        {m.month}
                      </span>
                    </div>

                    {/* Temp */}
                    <div className="flex items-center gap-1 text-sm text-gray-600 w-24 shrink-0">
                      🌡️ <span className="font-semibold">{m.tempRange}</span>
                    </div>

                    {/* Rainfall */}
                    <div className="flex items-center gap-1 text-sm text-gray-600 w-28 shrink-0">
                      <span>{rainfallIcon[m.rainfall]}</span>
                      <span>{m.rainfall}</span>
                    </div>

                    {/* Conditions */}
                    <div className="flex-1 text-sm text-gray-500 hidden sm:block">
                      {m.conditions}
                    </div>

                    {/* Suitability chip */}
                    <div className="shrink-0">
                      <span
                        className={`inline-flex items-center gap-1.5 border text-xs font-semibold px-2.5 py-1 rounded-full ${sc.chip}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                        />
                        {sc.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mx-4 mb-5 mt-1 rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Legend
            </p>
            <div className="flex flex-wrap gap-3">
              {(
                Object.entries(suitabilityConfig) as [
                  keyof typeof suitabilityConfig,
                  (typeof suitabilityConfig)[keyof typeof suitabilityConfig],
                ][]
              ).map(([key, val]) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1.5 border text-xs font-semibold px-2.5 py-1 rounded-full ${val.chip}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${val.dot}`} />
                  {val.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Suitability is based on seasonal patterns and historical weather
              data.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

type LoadState = "loading" | "success" | "error";

function WeatherCard({
  dest,
  weather,
  loadState,
  index,
  onOpenGuide,
}: {
  dest: Destination;
  weather: WeatherData | null;
  loadState: LoadState;
  index: number;
  onOpenGuide: () => void;
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

        {/* Monthly guide button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenGuide}
          className="w-full rounded-xl border-sky-300 text-sky-700 hover:bg-sky-50 gap-2 text-xs font-semibold"
          data-ocid={`weather.guide.open_modal_button.${index + 1}`}
        >
          <CalendarDays className="w-3.5 h-3.5" />📅 Monthly Guide
        </Button>

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
  const [guideDestIndex, setGuideDestIndex] = useState<number | null>(null);

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
              onOpenGuide={() => setGuideDestIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Monthly Guide Modal */}
      {guideDestIndex !== null && (
        <WeatherGuideModal
          dest={destinations[guideDestIndex]}
          open={guideDestIndex !== null}
          onClose={() => setGuideDestIndex(null)}
        />
      )}
    </section>
  );
}
