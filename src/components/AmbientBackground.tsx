"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LogoBlueprint } from "@/components/LogoBlueprint";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Maps page scroll (0 to 1) onto six evenly spaced stops. */
function useStops(progress: MotionValue<number>, values: (string | number)[]) {
  return useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], values);
}

/**
 * Page-wide backdrop behind every section: two soft red lights that drift, swell and fade as you
 * scroll, and the CTRL+R logo blueprint, which only shows where the light falls on it.
 */
export function AmbientBackground() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  // Main light: wanders side to side down the page, brightest at the big moments.
  const ax = useStops(scrollYProgress, ["72%", "22%", "78%", "30%", "70%", "50%"]);
  const ay = useStops(scrollYProgress, ["30%", "60%", "40%", "65%", "35%", "70%"]);
  const aSize = useStops(scrollYProgress, ["55vmax", "70vmax", "50vmax", "75vmax", "55vmax", "80vmax"]);
  const aOpacity = useStops(scrollYProgress, [0.7, 1, 0.6, 0.95, 0.65, 1]);
  // Second, deeper light moving against the first.
  const bx = useStops(scrollYProgress, ["15%", "80%", "20%", "75%", "25%", "60%"]);
  const by = useStops(scrollYProgress, ["75%", "25%", "70%", "30%", "75%", "40%"]);
  const bSize = useStops(scrollYProgress, ["45vmax", "40vmax", "60vmax", "45vmax", "60vmax", "50vmax"]);
  const bOpacity = useStops(scrollYProgress, [0.5, 0.7, 0.85, 0.55, 0.8, 0.6]);

  // The blueprint drifts slowly up and across, tilting slightly.
  const bpY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const bpX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const bpRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const fixed = reduce;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--ax": fixed ? "70%" : ax,
          "--ay": fixed ? "35%" : ay,
          "--as": fixed ? "60vmax" : aSize,
          "--bx": fixed ? "20%" : bx,
          "--by": fixed ? "70%" : by,
          "--bs": fixed ? "50vmax" : bSize,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: fixed ? 0.8 : aOpacity,
          background:
            "radial-gradient(circle var(--as) at var(--ax) var(--ay), rgba(201,0,7,0.20), rgba(120,0,4,0.08) 45%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: fixed ? 0.6 : bOpacity,
          background:
            "radial-gradient(circle var(--bs) at var(--bx) var(--by), rgba(150,8,4,0.16), transparent 65%)",
        }}
      />

      {/* Blueprint: faint everywhere, clearer where either light falls. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle calc(var(--as) * 0.75) at var(--ax) var(--ay), rgba(0,0,0,0.9), transparent 70%), radial-gradient(circle calc(var(--bs) * 0.7) at var(--bx) var(--by), rgba(0,0,0,0.6), transparent 70%), linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))",
          WebkitMaskImage:
            "radial-gradient(circle calc(var(--as) * 0.75) at var(--ax) var(--ay), rgba(0,0,0,0.9), transparent 70%), radial-gradient(circle calc(var(--bs) * 0.7) at var(--bx) var(--by), rgba(0,0,0,0.6), transparent 70%), linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))",
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 w-[170vmax] -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={fixed ? undefined : { x: bpX, y: bpY, rotate: bpRotate }}
        >
          <LogoBlueprint className="h-auto w-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
