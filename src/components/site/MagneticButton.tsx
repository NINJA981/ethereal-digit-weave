import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Variant = "primary" | "ghost" | "rose";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:shadow-[var(--shadow-glow)] border border-foreground/10",
  ghost:
    "glass text-foreground hover:bg-card/70",
  rose:
    "text-aubergine border border-transparent shadow-[var(--shadow-rose)] [background:var(--gradient-rose-gold)]",
};

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  as = "button",
  href,
  download,
  target,
  rel,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `group relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-wide transition-[transform,box-shadow] duration-300 will-change-transform ${styles[variant]} ${className}`;

  if (as === "a") {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download as any}
        target={target}
        rel={rel}
        data-magnet
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: tx, y: ty }}
        className={cls}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      data-magnet
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      className={cls}
      {...(rest as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
