"use client";

import type React from "react";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

export type Reveal3DVariant =
  | "rise"       // default — tilts up from below with perspective depth
  | "pop"        // starts tiny & far, pops towards viewer
  | "flip"       // flips in from behind (Y-axis)
  | "zoom"       // zooms from far away straight at you
  | "slide-left" // slides in from the left with rotation
  | "slide-right"; // slides in from the right with rotation

type Reveal3DProps = {
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delayMs?: number;
  variant?: Reveal3DVariant;
  children: React.ReactNode;
};

export function Reveal3D({
  as,
  className,
  style,
  delayMs = 0,
  variant = "rise",
  children,
}: Reveal3DProps) {
  const Tag = (as ?? "div") as any;
  const id = useId();
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      el.setAttribute("data-r3d", "in");
      return;
    }

    el.setAttribute("data-r3d", variant);
    (el as HTMLElement).style.transitionDelay = `${delayMs}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-r3d", "in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, id, variant]);

  return (
    <Tag
      ref={(node: Element | null) => (ref.current = node)}
      className={cn(className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
