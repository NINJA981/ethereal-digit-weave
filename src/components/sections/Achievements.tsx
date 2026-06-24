import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";

type Stat = { value: number; suffix?: string; label: string; sub: string };

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years of experience", sub: "Production engineering" },
  { value: 10, suffix: "+", label: "Enterprise applications", sub: "Banking · FinTech · Consumer" },
  { value: 4, suffix: "", label: "Tech stacks mastered", sub: "Front, back, data, AI" },
  { value: 100, suffix: "%", label: "Curiosity for what's next", sub: "Always shipping" },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(value * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = Number.isInteger(value) ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-40 blur-3xl [background:var(--gradient-rose-gold)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-40 blur-3xl [background:var(--gradient-lavender)]"
          />
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div>
                  <div className="font-display text-5xl text-gradient-lavender sm:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
