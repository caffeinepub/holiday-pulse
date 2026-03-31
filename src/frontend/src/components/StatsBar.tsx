import { CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

function CountUp({
  target,
  suffix,
  active,
}: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const stats: Stat[] = [
  {
    icon: <Users className="w-7 h-7" />,
    value: 2000,
    suffix: "+",
    label: "Happy Travelers",
  },
  {
    icon: <CheckCircle className="w-7 h-7" />,
    value: 500,
    suffix: "+",
    label: "Tours Completed",
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    value: 3,
    suffix: "",
    label: "Destinations",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    value: 10,
    suffix: "+ Yrs",
    label: "Experience",
  },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="w-full bg-gradient-to-r from-teal-900 via-teal-700 to-navy-800 py-10 px-4"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center gap-2"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
            }}
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-teal-200 mb-1">
              {stat.icon}
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                active={isInView}
              />
            </p>
            <p className="text-teal-200 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
