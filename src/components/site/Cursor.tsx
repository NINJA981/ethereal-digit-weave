import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!ringRef.current) return;
      const interactive = target?.closest("a, button, [data-magnet]");
      ringRef.current.dataset.hover = interactive ? "1" : "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="0"
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-5 -mt-5 h-10 w-10 rounded-full border border-primary/60 transition-[width,height,margin,border-color] duration-300 data-[hover=1]:-ml-8 data-[hover=1]:-mt-8 data-[hover=1]:h-16 data-[hover=1]:w-16 data-[hover=1]:border-accent"
        style={{ willChange: "transform", backdropFilter: "invert(8%)" }}
      />
    </>
  );
}
