import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/Reveal";

type Project = {
  name: string;
  tag: string;
  blurb: string;
  tech: string[];
  visual: "dashboard" | "network" | "budget" | "food";
  accent: string;
};

const projects: Project[] = [
  {
    name: "FlexyDial",
    tag: "Banking · Dialer Platform",
    blurb:
      "Enterprise dialer suite with role-based access, real-time agent dashboards, and a Django/DRF backend powering thousands of concurrent calls.",
    tech: ["Django", "DRF", "RBAC", "MySQL", "React"],
    visual: "dashboard",
    accent: "var(--gradient-lavender)",
  },
  {
    name: "PAYAPT FedNow Simulator",
    tag: "FinTech · ISO 20022",
    blurb:
      "Futuristic network simulator for the FedNow instant payment rail — visualizing transaction streams, message flow and settlement in a single SPA.",
    tech: ["React", "Redux", "SPA", "ISO 20022"],
    visual: "network",
    accent: "var(--gradient-rose-gold)",
  },
  {
    name: "T-SOFT Budget Management",
    tag: "FinTech · Planning",
    blurb:
      "Interactive budget planning with dynamic graphs, scenario forecasting and live collaboration between finance teams.",
    tech: ["React", "Charts", "Django"],
    visual: "budget",
    accent:
      "linear-gradient(135deg, oklch(0.78 0.12 200), oklch(0.78 0.13 305))",
  },
  {
    name: "Food Ordering Application",
    tag: "Consumer · Mobile-first",
    blurb:
      "Smooth ordering journey — animated food cards, optimistic cart updates and a checkout that just feels right.",
    tech: ["React", "REST", "Tailwind"],
    visual: "food",
    accent: "linear-gradient(135deg, oklch(0.85 0.14 60), oklch(0.78 0.13 30))",
  },
];

function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  if (variant === "dashboard") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-4 rounded-2xl glass-strong p-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-auto font-mono text-[9px] text-muted-foreground">flexydial.app</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Live", "Queue", "AHT"].map((k, i) => (
              <div key={k} className="rounded-lg bg-foreground/5 p-2">
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="font-display text-lg">{[1284, 37, "02:14"][i]}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 h-20 rounded-lg bg-foreground/5 p-2">
            <svg viewBox="0 0 200 60" className="h-full w-full">
              <motion.path
                d="M0 50 Q30 20 60 35 T120 25 T180 30 T200 15"
                fill="none"
                stroke="oklch(0.78 0.13 305)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M0 55 Q40 40 70 45 T140 30 T200 25"
                fill="none"
                stroke="oklch(0.78 0.13 40)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3 }}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  if (variant === "network") {
    const nodes = Array.from({ length: 8 }).map((_, i) => ({
      x: 50 + Math.cos((i / 8) * Math.PI * 2) * 35,
      y: 50 + Math.sin((i / 8) * Math.PI * 2) * 28,
    }));
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full p-6">
        {nodes.map((n, i) =>
          nodes.map((m, j) =>
            j > i ? (
              <line
                key={`${i}-${j}`}
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="oklch(0.78 0.13 40 / 0.35)"
                strokeWidth="0.3"
              />
            ) : null
          )
        )}
        <circle cx="50" cy="50" r="6" fill="url(#core)" />
        <defs>
          <radialGradient id="core">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 40)" />
          </radialGradient>
        </defs>
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={2}
            fill="oklch(0.78 0.13 305)"
            animate={{ r: [2, 3.2, 2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`p-${i}`}
            r={0.8}
            fill="white"
            initial={{ cx: 50, cy: 50 }}
            animate={{ cx: n.x, cy: n.y, opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>
    );
  }
  if (variant === "budget") {
    const bars = [40, 65, 35, 80, 55, 70, 45];
    return (
      <div className="flex h-full w-full items-end gap-2 p-6">
        {bars.map((b, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${b}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-t-md"
            style={{
              background: `linear-gradient(to top, oklch(0.78 0.13 305 / 0.85), oklch(0.78 0.13 40))`,
            }}
          />
        ))}
      </div>
    );
  }
  // food
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-4">
      {["🍜", "🥗", "🍣", "🍰"].map((e, i) => (
        <motion.div
          key={e}
          whileHover={{ scale: 1.05, rotate: -1 }}
          className="relative grid place-items-center rounded-2xl glass-strong text-4xl"
        >
          <span>{e}</span>
          <span className="absolute bottom-2 right-2 rounded-full bg-foreground px-2 py-0.5 text-[9px] text-background">
            ₹{[180, 220, 360, 140][i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            04 — Selected Work
          </span>
        </Reveal>
        <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
          <RevealWords text="Products I've shipped" />{" "}
          <span className="text-gradient-lavender">
            <RevealWords text="with care." delay={0.2} />
          </span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                className="glass group relative overflow-hidden rounded-3xl"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{ background: p.accent }}
                >
                  <div className="absolute inset-0 opacity-30 [background:var(--gradient-aurora)]" />
                  <ProjectVisual variant={p.visual} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {p.tag}
                      </p>
                      <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 opacity-50 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 text-sm text-foreground/85">{p.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
