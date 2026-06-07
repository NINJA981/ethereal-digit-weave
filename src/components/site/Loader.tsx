import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background aurora-bg"
        >
          <div className="relative flex flex-col items-center gap-6">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.13 305)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.13 40)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M70 25 Q40 25 40 45 Q40 60 65 60 Q90 60 90 75 Q90 95 55 95"
                fill="none"
                stroke="url(#g)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-display text-sm tracking-[0.4em] text-muted-foreground"
            >
              SUSMITHA
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
