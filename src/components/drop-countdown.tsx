import { useEffect, useState } from "react";
import { NEXT_DROP } from "@/lib/drop";

function getParts(target: number, now: number) {
  const diff = Math.max(target - now, 0);
  const total = Math.floor(diff / 1000);
  return {
    done: diff === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function DropCountdown() {
  // Start empty so the server and browser render the same HTML.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const parts = now === null ? null : getParts(NEXT_DROP.date.getTime(), now);

  const units = [
    { label: "Days", value: parts ? pad(parts.days) : "--" },
    { label: "Hours", value: parts ? pad(parts.hours) : "--" },
    { label: "Minutes", value: parts ? pad(parts.minutes) : "--" },
    { label: "Seconds", value: parts ? pad(parts.seconds) : "--" },
  ];

  return (
    <div className="rounded-2xl border border-toxic/40 bg-toxic/5 p-8 text-center sm:p-12">
      <p className="font-display text-xs font-bold tracking-[0.4em] uppercase text-toxic">
        Next drop
      </p>
      <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
        <span className="text-toxic text-glow">{NEXT_DROP.name.toUpperCase()}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{NEXT_DROP.blurb}</p>

      {parts?.done ? (
        <p className="font-display mt-8 text-2xl font-bold text-toxic text-glow">
          The drop is live
        </p>
      ) : (
        <div
          className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-3 sm:gap-4"
          role="timer"
          aria-label={`Time until the ${NEXT_DROP.name} drop`}
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-xl border border-toxic/40 bg-background/60 px-2 py-4"
            >
              <p className="font-display text-3xl font-bold text-toxic tabular-nums sm:text-5xl">
                {u.value}
              </p>
              <p className="mt-1 text-[10px] tracking-widest uppercase text-muted-foreground sm:text-xs">
                {u.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}