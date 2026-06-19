import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { Code2, Database, Sparkles, Workflow } from "lucide-react";

const highlights = [
  { icon: Code2, label: "4 years building production-grade React apps." },
  { icon: Database, label: "Django, DRF & FastAPI — clean APIs, calm databases." },
  { icon: Workflow, label: "Agile rituals, code reviews, mentorship." },
  { icon: Sparkles, label: "Generative AI integrations & intelligent workflows." },
];

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const tilt = useTransform([rx, ry], ([x, y]) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`
  );

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="about" className="relative overflow-hidden py-32">
      {/* floating petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-accent/30 blur-[1px] animate-float-slow"
          style={{
            left: `${(i * 9) % 95}%`,
            top: `${(i * 13) % 90}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${8 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              01 — About
            </span>
          </Reveal>

          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <RevealWords text="An engineer who builds" />{" "}
            <span className="text-gradient-rose">
              <RevealWords text="sophisticated products" delay={0.2} />
            </span>{" "}
            <RevealWords text="with creativity and elegance." delay={0.4} />
          </h2>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-muted-foreground">
              I&apos;m a full-stack developer focused on React and Django,
              shipping enterprise applications across banking, payments and
              budgeting. I care about the craft — performant interfaces,
              honest APIs, and the small details that turn a screen into a
              feeling.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.1 * i}>
                <li className="glass group flex items-start gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-1">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full [background:var(--gradient-lavender)] text-aubergine">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground/90">{h.label}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Tilt glass portrait card */}
        <Reveal delay={0.2}>
          <motion.div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ transform: tilt, transformStyle: "preserve-3d" }}
            className="glass-strong relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2.5rem] p-8"
          >
            {/* light sheen */}
            <div className="pointer-events-none absolute -inset-1 bg-[linear-gradient(115deg,transparent_35%,oklch(1_0_0/.18)_50%,transparent_65%)] mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-0 [background:var(--gradient-aurora)] opacity-50" />

            <div style={{ transform: "translateZ(40px)" }} className="relative h-full">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">// portrait.tsx</span>
                <span className="font-mono text-accent">v3.8</span>
              </div>

              <div className="mt-6 flex h-44 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-2xl [background:var(--gradient-rose-gold)] opacity-70" />
                  <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-[var(--shadow-glow)] border-2 border-white/20">
                    <img
                      src="/pfp.jpeg"
                      alt="Susmitha Sri Vyshnavi"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2 text-sm">
                <p className="font-display text-2xl">Susmitha Sri Vyshnavi</p>
                <p className="text-muted-foreground">Maddali · Chennai, IN</p>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-3 text-xs">
                {[
                  ["4", "Years"],
                  ["10+", "Projects"],
                  ["∞", "Curiosity"],
                ].map(([k, v]) => (
                  <div key={v} className="glass rounded-xl p-3 text-center">
                    <dt className="font-display text-xl text-foreground">{k}</dt>
                    <dd className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for select work
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
