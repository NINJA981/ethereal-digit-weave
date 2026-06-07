import { motion } from "framer-motion";
import { Reveal, RevealWords } from "@/components/site/Reveal";

export function AI() {
  // simple 3-layer neural mesh
  const layers = [4, 6, 4];
  const positions = layers.map((count, li) =>
    Array.from({ length: count }).map((_, i) => ({
      x: 10 + li * 40,
      y: 10 + (i + 0.5) * (80 / count),
    }))
  );

  return (
    <section id="ai" className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background:var(--gradient-aurora)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              05 — AI · Future
            </span>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
            <RevealWords text="At the intersection of" />{" "}
            <span className="text-gradient-rose">
              <RevealWords text="AI and the modern web." delay={0.2} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-muted-foreground">
              I&apos;m exploring how generative models reshape product surfaces —
              from OpenAI-powered assistants to intelligent workflows that
              quietly do the boring work, so people can do the meaningful kind.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 grid gap-3 text-sm">
              {[
                "OpenAI / GPT integrations into existing dashboards",
                "Retrieval-augmented context for internal tools",
                "Agentic workflows that ship with humans-in-the-loop",
                "Honest UI patterns for AI uncertainty",
              ].map((x) => (
                <li
                  key={x}
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full [background:var(--gradient-rose-gold)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="glass-strong relative mx-auto aspect-square w-full max-w-md rounded-[2.5rem] p-4">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {positions.map((layer, li) =>
                layer.map((n, i) => {
                  const next = positions[li + 1];
                  return next?.map((m, j) => (
                    <line
                      key={`${li}-${i}-${j}`}
                      x1={n.x}
                      y1={n.y}
                      x2={m.x}
                      y2={m.y}
                      stroke="oklch(0.78 0.13 305 / 0.3)"
                      strokeWidth="0.2"
                    />
                  ));
                })
              )}
              {positions.flatMap((layer, li) =>
                layer.map((n, i) => (
                  <motion.circle
                    key={`${li}-${i}-n`}
                    cx={n.x}
                    cy={n.y}
                    r={1.6}
                    fill="oklch(0.78 0.13 40)"
                    animate={{ r: [1.4, 2.2, 1.4], opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 2 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: (li + i) * 0.18,
                    }}
                  />
                ))
              )}
              {positions[0].map((n, i) => {
                const target = positions[2][i % positions[2].length];
                return (
                  <motion.circle
                    key={`flow-${i}`}
                    r={0.8}
                    fill="white"
                    initial={{ cx: n.x, cy: n.y }}
                    animate={{
                      cx: [n.x, positions[1][i % positions[1].length].x, target.x],
                      cy: [n.y, positions[1][i % positions[1].length].y, target.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                );
              })}
            </svg>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              neural.flow
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
