import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealWords } from "@/components/site/Reveal";

const items = [
  {
    company: "Buzzworks Services Pvt Ltd",
    role: "Full Stack Developer",
    period: "2025 — Present",
    summary:
      "Led front-end architecture on FlexyDial — a banking-grade dialer platform — and shipped RBAC, real-time dashboards and Django REST services.",
    tech: ["React", "Redux", "Django", "DRF", "MySQL"],
    metric: { value: "40%", label: "Faster agent workflows" },
  },
  {
    company: "Primesoft Inc",
    role: "Software Engineer",
    period: "2022 — 2025",
    summary:
      "Built PAYAPT FedNow simulator and T-SOFT budgeting suite — modern SPAs with complex financial state and ISO 20022 message flows.",
    tech: ["React", "Redux", "FastAPI", "PostgreSQL"],
    metric: { value: "12+", label: "Enterprise modules" },
  },
  {
    company: "Primesoft Inc · Internship",
    role: "Software Engineer Intern",
    period: "2021",
    summary:
      "Shipped my first production React components, learned the discipline of code reviews and the joy of clean Git history.",
    tech: ["React", "JavaScript", "REST"],
    metric: { value: "0→1", label: "Production launches" },
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section id="experience" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            02 — Journey
          </span>
        </Reveal>
        <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
          <RevealWords text="A career, told in" />{" "}
          <span className="text-gradient-lavender">
            <RevealWords text="chapters." delay={0.2} />
          </span>
        </h2>

        <div ref={ref} className="relative mt-20">
          {/* glowing path */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 hidden h-full w-8 md:block"
            viewBox="0 0 32 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="path" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.13 305)" />
                <stop offset="50%" stopColor="oklch(0.78 0.13 40)" />
                <stop offset="100%" stopColor="oklch(0.65 0.12 280)" />
              </linearGradient>
            </defs>
            <line
              x1="16"
              y1="0"
              x2="16"
              y2="800"
              stroke="oklch(0.62 0.13 305 / 0.12)"
              strokeWidth="2"
            />
            <motion.line
              x1="16"
              y1="0"
              x2="16"
              y2="800"
              stroke="url(#path)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength, filter: "drop-shadow(0 0 8px oklch(0.78 0.13 305 / .7))" }}
            />
          </svg>

          <ul className="space-y-10">
            {items.map((item, i) => (
              <Reveal key={item.company} delay={i * 0.05}>
                <li className="relative grid gap-6 md:grid-cols-[40px_1fr] md:gap-10">
                  <div className="relative hidden md:block">
                    <span className="absolute left-2 top-6 h-4 w-4 rounded-full [background:var(--gradient-rose-gold)] shadow-[0_0_24px_oklch(0.78_0.13_40/.7)] ring-4 ring-background" />
                  </div>
                  <motion.article
                    whileHover={{ y: -4 }}
                    className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
                    style={{ transform: `translateZ(0)` }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl"
                      style={{
                        background:
                          i % 2 === 0
                            ? "var(--gradient-lavender)"
                            : "var(--gradient-rose-gold)",
                      }}
                    />
                    <div className="relative flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl sm:text-3xl">{item.company}</h3>
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                    <p className="relative mt-1 text-sm text-accent">{item.role}</p>
                    <p className="relative mt-4 max-w-2xl text-sm text-foreground/85">
                      {item.summary}
                    </p>
                    <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
                      <ul className="flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <div className="text-right">
                        <div className="font-display text-2xl text-foreground">
                          {item.metric.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                          {item.metric.label}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
