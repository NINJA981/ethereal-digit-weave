import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";

const contacts = [
  { icon: Phone, label: "Phone", value: "+91 63009 07595", href: "tel:+916300907595" },
  { icon: Mail, label: "Email", value: "vyshnavimaddali185@gmail.com", href: "mailto:vyshnavimaddali185@gmail.com" },
  { icon: MapPin, label: "Location", value: "Chennai, India", href: "https://maps.google.com/?q=Chennai" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/maddali-susmitha-sri-vyshnavi-8497631b4/" },
  { icon: Github, label: "GitHub", href: "https://github.com/Susmitha185" },
];

export function Contact() {
  const [flying, setFlying] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden pt-32 pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:var(--gradient-aurora)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            06 — Say hello
          </span>
        </Reveal>

        <h2 className="mt-6 font-display text-5xl tracking-tight sm:text-6xl md:text-7xl">
          <RevealWords text="Let's build" />{" "}
          <span className="text-gradient-rose">
            <RevealWords text="something elegant." delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Currently open to senior full-stack and AI-product roles, and a
            small number of meaningful collaborations.
          </p>
        </Reveal>

        {/* Paper airplane */}
        <div
          className="relative mx-auto mt-14 h-40 w-full max-w-md"
          onMouseEnter={() => setFlying(true)}
          onMouseLeave={() => setFlying(false)}
        >
          <motion.svg
            viewBox="0 0 200 100"
            className="absolute inset-0 mx-auto h-40 w-full"
            animate={
              flying
                ? { x: [0, 180, 200], y: [0, -40, -80], opacity: [1, 1, 0] }
                : { x: 0, y: 0, opacity: 1 }
            }
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <defs>
              <linearGradient id="plane" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.95 0.04 305)" />
                <stop offset="100%" stopColor="oklch(0.78 0.13 305)" />
              </linearGradient>
            </defs>
            <polygon
              points="20,50 110,20 90,52 110,80"
              fill="url(#plane)"
              stroke="oklch(0.4 0.1 295)"
              strokeWidth="0.8"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 10px 20px oklch(0.78 0.13 305 / .4))" }}
            />
            <polygon points="90,52 110,80 60,60" fill="oklch(0.7 0.13 305 / .8)" />
          </motion.svg>
          {/* trail */}
          {flying &&
            Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                initial={{ opacity: 0.9, x: 0, y: 0 }}
                animate={{ opacity: 0, x: -40 - i * 10, y: 10 + i * 3 }}
                transition={{ duration: 1, delay: i * 0.04 }}
              />
            ))}
        </div>

        <div className="mt-2">
          <MagneticButton
            as="a"
            href="https://wa.me/916300907595"
            target="_blank"
            rel="noreferrer noopener"
            variant="rose"
          >
            <MessageSquare className="h-4 w-4" />
            Contact me
          </MagneticButton>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-3">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <li>
                <a
                  href={c.href}
                  className="glass group flex flex-col items-start gap-2 rounded-2xl p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full [background:var(--gradient-lavender)] text-aubergine">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium text-foreground">{c.value}</span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-24 border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        <p>
          Designed and built with care by Susmitha · {new Date().getFullYear()} ·
          <span className="text-gradient-rose"> Crafted in Chennai</span>
        </p>
      </footer>
    </section>
  );
}
