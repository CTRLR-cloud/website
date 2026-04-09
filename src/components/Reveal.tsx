"use client";

import type React from "react";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  as?: React.ElementType;
  className?: string;
  delayMs?: number;
  /** Skip scroll-triggered reveal; use for above-the-fold content so links stay clickable. */
  immediate?: boolean;
  children: React.ReactNode;
};

export function Reveal({
  as,
  className,
  delayMs = 0,
  immediate = false,
  children,
}: RevealProps) {
  const Tag = (as ?? "div") as any;
  const id = useId();
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || immediate) {
      el.setAttribute("data-reveal", "in");
      return;
    }

    el.setAttribute("data-reveal", "");
    (el as HTMLElement).style.transitionDelay = `${delayMs}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-reveal", "in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, id, immediate]);

  return (
    <Tag
      ref={(node: Element | null) => (ref.current = node)}
      {...(immediate ? { "data-reveal": "in" } : {})}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}




