import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealWords } from "@/components/site/Reveal";

type Skill = { name: string; level: number; group: "Frontend" | "Backend" | "Tools" | "Data" };

const skills: Skill[] = [
  { name: "React", level: 95, group: "Frontend" },
  { name: "Redux", level: 90, group: "Frontend" },
  { name: "JavaScript", level: 92, group: "Frontend" },
  { name: "HTML", level: 95, group: "Frontend" },
  { name: "CSS", level: 90, group: "Frontend" },
  { name: "Django", level: 88, group: "Backend" },
  { name: "DRF", level: 85, group: "Backend" },
  { name: "FastAPI", level: 78, group: "Backend" },
  { name: "Git", level: 88, group: "Tools" },
  { name: "Postman", level: 85, group: "Tools" },
  { name: "VS Code", level: 95, group: "Tools" },
  { name: "MySQL", level: 82, group: "Data" },
];

const groupColors: Record<Skill["group"], string> = {
  Frontend: "oklch(0.78 0.13 305)",
  Backend: "oklch(0.78 0.13 40)",
  Tools: "oklch(0.7 0.1 220)",
  Data: "oklch(0.7 0.13 160)",
};

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: -10, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setRot({ x: -10 + dy * 18, y: dx * 28 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // arrange skills on tilted orbits
  const orbits = [
    { radius: 130, count: 4, items: skills.slice(0, 4) },
    { radius: 200, count: 4, items: skills.slice(4, 8) },
    { radius: 270, count: 4, items: skills.slice(8, 12) },
  ];

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            03 — Skills Galaxy
          </span>
        </Reveal>
        <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
          <RevealWords text="A galaxy of" />{" "}
          <span className="text-gradient-rose">
            <RevealWords text="craft." delay={0.2} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Move your cursor to orbit. Hover a planet to feel it pulse. Click to
            reveal its mastery.
          </p>
        </Reveal>

        <div
          ref={containerRef}
          className="relative mx-auto mt-16 h-[640px] max-w-3xl"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
              transition: "transform 0.4s var(--ease-silk, ease-out)",
            }}
          >
            {/* core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full [background:var(--gradient-lavender)] blur-2xl opacity-70 animate-pulse-glow" />
                <div className="absolute inset-2 rounded-full [background:radial-gradient(circle_at_30%_30%,white,oklch(0.78_0.13_305)_50%,oklch(0.35_0.1_295))] shadow-[0_0_80px_oklch(0.78_0.13_305/.55)]" />
                <span className="absolute inset-0 grid place-items-center font-display text-lg text-aubergine">
                  S
                </span>
              </div>
            </div>

            {orbits.map((orbit, oi) => (
              <div
                key={oi}
                className="absolute inset-0"
                style={{
                  transform: `rotateX(${oi * 12}deg) rotateY(${oi * 10}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* ring */}
                <div
                  className="absolute left-1/2 top-1/2 rounded-full border border-foreground/10"
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    marginLeft: -orbit.radius,
                    marginTop: -orbit.radius,
                  }}
                />
                {orbit.items.map((s, i) => {
                  const angle = (i / orbit.count) * Math.PI * 2 + oi * 0.7;
                  const x = Math.cos(angle) * orbit.radius;
                  const y = Math.sin(angle) * orbit.radius * 0.55;
                  const z = Math.sin(angle) * orbit.radius * 0.6;
                  const isH = hovered === s.name;
                  const isS = selected === s.name;
                  return (
                    <button
                      key={s.name}
                      onMouseEnter={() => setHovered(s.name)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() =>
                        setSelected((prev) => (prev === s.name ? null : s.name))
                      }
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-transform"
                      style={{
                        transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${
                          isH || isS ? 1.25 : 1
                        })`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <span
                        className="relative grid h-14 w-14 place-items-center rounded-full text-[11px] font-medium text-aubergine shadow-[0_10px_30px_-5px_rgba(0,0,0,0.25)]"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, white, ${groupColors[s.group]} 70%)`,
                        }}
                      >
                        {s.name}
                      </span>
                      {(isH || isS) && (
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-widest text-foreground">
                          {s.group} · {s.level}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>

          {/* legend */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-4 rounded-full glass px-4 py-2 text-[11px] text-muted-foreground">
            {(Object.keys(groupColors) as Skill["group"][]).map((g) => (
              <span key={g} className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: groupColors[g] }}
                />
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
