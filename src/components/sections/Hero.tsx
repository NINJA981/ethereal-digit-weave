import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { ParticleField } from "@/components/site/ParticleField";
import { RevealWords } from "@/components/site/Reveal";

const codeGlyphs = [
  "const susmitha = () => '✨'",
  "<FullStack />",
  "POST /api/v1/intelligence",
  "useState(<dreams />)",
  "from django.ai import openai",
  "await build.experience()",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden aurora-bg"
    >
      <ParticleField density={70} />

      {/* Crystal sphere + rings */}
      <motion.div
        style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative h-[520px] w-[520px] max-w-[80vw] max-h-[80vw]">
          {/* glow */}
          <div className="absolute inset-0 rounded-full blur-3xl [background:var(--gradient-lavender)] opacity-50 animate-pulse-glow" />
          {/* sphere */}
          <div className="absolute inset-[18%] rounded-full [background:radial-gradient(circle_at_30%_25%,oklch(1_0_0/.9),oklch(0.78_0.13_305/.65)_35%,oklch(0.45_0.12_290/.85)_70%,oklch(0.22_0.05_305)_100%)] shadow-[0_60px_160px_-30px_oklch(0.4_0.15_295/0.7),inset_-30px_-30px_80px_oklch(0.2_0.05_295/0.6),inset_30px_30px_80px_oklch(1_0_0/0.25)]" />
          {/* highlight */}
          <div className="absolute left-[28%] top-[26%] h-10 w-20 rounded-full bg-white/70 blur-md" />
          {/* rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow"
              style={{
                transform: `rotateX(${65 + i * 8}deg) rotateZ(${i * 25}deg)`,
                animationDuration: `${30 + i * 12}s`,
                animationDirection: i % 2 ? "reverse" : "normal",
                borderColor: i === 1 ? "oklch(0.78 0.13 305 / 0.4)" : undefined,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating butterflies */}
      {mounted &&
        Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 + i * 0.2 }}
            className="pointer-events-none absolute select-none text-2xl animate-float-slow"
            style={{
              left: `${10 + ((i * 17) % 80)}%`,
              top: `${15 + ((i * 23) % 65)}%`,
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${8 + i}s`,
              filter: "drop-shadow(0 0 12px oklch(0.78 0.13 305 / 0.6))",
            }}
          >
            🦋
          </motion.span>
        ))}

      {/* Floating code glyphs */}
      {codeGlyphs.map((g, i) => (
        <motion.div
          key={g}
          aria-hidden
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 1 }}
          className="pointer-events-none absolute hidden font-mono text-[11px] text-muted-foreground/70 md:block animate-float-drift"
          style={{
            left: `${(i * 14 + 6) % 86}%`,
            top: `${(i * 19 + 22) % 78}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${12 + i}s`,
          }}
        >
          {g}
        </motion.div>
      ))}

      {/* Copy */}
      <motion.div
        style={{ y: headingY }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3 w-3 text-accent" />
          Full Stack Developer · Chennai, India
        </motion.div>

        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          <span className="block">
            <RevealWords text="Hi, I'm" />
          </span>
          <span className="block text-gradient-lavender">
            <RevealWords text="Susmitha." delay={0.15} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          I build scalable web experiences and intelligent digital products —
          weaving React, Django, and AI into interfaces that feel effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton as="a" href="#projects" variant="primary">
            View projects
            <ArrowDown className="h-4 w-4 -rotate-45" />
          </MagneticButton>
          <MagneticButton as="a" href="/resume.pdf" download variant="rose">
            <Download className="h-4 w-4" />
            Download resume
          </MagneticButton>
          <MagneticButton as="a" href="#contact" variant="ghost">
            <Mail className="h-4 w-4" />
            Contact me
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-foreground/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
