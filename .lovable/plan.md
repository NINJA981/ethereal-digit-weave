# Susmitha Portfolio — Build Plan

A single-page cinematic portfolio with story-driven scroll, 3D hero, glassmorphism, and the lavender / pearl / rose-gold palette you described.

## One important framework note

You asked for **Next.js 15**. This project runs on **TanStack Start + Vite + React 19** (Lovable's stack). Next.js can't be swapped in. The good news: every library you listed — Framer Motion, GSAP, React Three Fiber, Drei, Lenis, Tailwind — works identically here, and TanStack Start gives us SSR + SEO meta per route just like Next. I'll build on the existing stack unless you tell me otherwise.

## Design system (locked in `src/styles.css`)

- Palette (oklch tokens): pearl background, deep aubergine foreground, soft lavender primary, rose-gold accent, frosted-glass surface, subtle violet glow.
- Typography: **Instrument Serif** (display headings) + **Inter** (body) loaded via `<link>` in `__root.tsx`.
- Tokens for gradients (`--gradient-aurora`, `--gradient-rose-gold`), shadows (`--shadow-glow`, `--shadow-glass`), blur surfaces, and motion easings.
- Dark/light toggle with both themes tuned (light = pearl, dark = midnight lavender).

## Sections (single route `/`)

1. **Loading screen** — animated monogram "S" draws in, fades to hero.
2. **Hero** — R3F scene: crystal sphere + holographic rings + particle field + soft glowing butterflies + drifting code glyphs. Headline "Hi, I'm Susmitha", subhead, 3 magnetic buttons (View Projects, Download Resume, Contact). On scroll, sphere shatters into particles that bleed into next section.
3. **About** — tilt-reactive glass card, scroll-animated timeline, floating sparkles. Copy: 3.8+ yrs, React, Django/DRF, Agile, AI.
4. **Experience Journey** — GSAP scroll-drawn glowing path with nodes for Buzzworks, Primesoft (full-time), Primesoft Internship. Cards rise from varied depths; bg hue shifts per role.
5. **Skills Galaxy** — R3F orbiting skill planets around a glowing core (Frontend / Backend / Tools / DB clusters). Mouse-rotate, hover expands, click reveals proficiency.
6. **Featured Projects** — cinematic cards for FlexyDial, PAYAPT FedNow Simulator, T-SOFT Budget Management, Food Ordering. Each gets a custom motion mockup (dashboard, transaction streams, budget graph, food cards).
7. **AI Innovation** — floating neural-network mesh + animated data flow; copy on GenAI / OpenAI integrations.
8. **Achievements** — count-up stats (3.8+ yrs, enterprise apps, full-stack, AI-driven) triggered on view.
9. **Contact** — 3D paper airplane that flies on hover with particle trail; phone, email, location, social icons with magnetic hover.

## Global experience layer

- Lenis smooth scroll wired at root.
- Custom cursor with glow + spotlight blend.
- Mouse-parallax background particles on every section.
- Scroll-velocity skew on section dividers.
- Framer Motion text reveal (`useInView` + word stagger) for every heading.
- View Transitions / fade between sections.
- Theme toggle (persisted in localStorage).
- Fully responsive: 3D scenes downgrade to static gradient + CSS particles on mobile / `prefers-reduced-motion`.
- SEO: per-route head() with title, description, OG tags, JSON-LD `Person` schema.

## Technical structure

```text
src/
  routes/
    __root.tsx              # fonts, theme provider, Lenis, cursor, SEO defaults
    index.tsx               # composes sections
  components/
    hero/                   # CrystalScene, Butterflies, CodeGlyphs, HeroCopy
    about/                  # TiltCard, Timeline
    experience/             # JourneyPath, ExperienceCard
    skills/                 # SkillsGalaxy (R3F)
    projects/               # ProjectCard + 4 mockup scenes
    ai/                     # NeuralMesh
    achievements/           # CountUp
    contact/                # PaperPlane (R3F)
    ui/                     # MagneticButton, GlassCard, RevealText, ThemeToggle, Cursor
  lib/
    lenis.ts, motion.ts, useMousePosition.ts, useReducedMotion.ts
  styles.css                # tokens, gradients, glass utilities
  assets/                   # generated textures, resume.pdf placeholder
```

Dependencies to add: `gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lenis`, `@studio-freight/hamo` (optional), `react-use-measure`.

## Performance & quality bar

- All R3F scenes lazy-loaded with `React.lazy` + Suspense fallback (static gradient).
- `frameloop="demand"` where possible; instanced meshes for particles.
- Images: AVIF/WebP, lazy, responsive `srcset`.
- Targets 60 fps on M-class laptops; gracefully degrades on low-end + reduced-motion.
- Lighthouse: A11y ≥ 95, SEO ≥ 95.

## Resume file

I'll wire the "Download Resume" button to `/resume.pdf`. Drop your PDF in `public/` (or send it and I'll place it) — until then it links to a placeholder.

## Open questions (optional — I can proceed with sensible defaults)

1. Do you have the actual **resume PDF**, **headshot**, and **project screenshots** to use, or should I use generated visuals + placeholder resume?
2. Social links to wire up (LinkedIn, GitHub, X)?
3. OK to ship on the existing **TanStack Start** stack (vs. trying to migrate to Next.js)?

Approve and I'll build it end-to-end.