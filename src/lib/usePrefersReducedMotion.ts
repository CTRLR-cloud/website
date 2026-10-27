"use client";

import { useEffect, useState } from "react";

/**
 * Whether the visitor asked for reduced motion.
 *
 * Framer Motion's `useReducedMotion` reads `matchMedia` inside its state initializer, so the
 * server renders `null` and the first client render is already `true` or `false`. Branching
 * markup on that value fails hydration. This hook stays `false` until after hydration, then
 * follows the system setting.
 */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduce;
}
