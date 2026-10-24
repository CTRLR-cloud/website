"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function ParallaxTextSection() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [48, -48]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    reduceMotion ? [1, 1, 1, 1] : [0.96, 1, 1, 1.04],
  );
  const maskSize = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden">
      <div ref={containerRef} className="relative h-[100svh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* The page-wide ambient light shows through here, so this section has no backdrop of its own. */}
          {/* Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity, scale }}
          >
            <motion.div className="relative w-full max-w-[100vw] px-5 sm:px-8 md:px-0" style={{ y: textY }}>
              <div className="relative mx-auto max-w-[min(100%,92vw)] text-center md:max-w-none">
                {/* Outline — 18vw makes “PLATFORM” wider than the phone; scale down <md so copy fits inside the safe area */}
                <h2
                  className="text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[12vw] font-black leading-[0.85] tracking-[-0.02em] uppercase"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.16)",
                    fontFamily: "var(--font-geist-sans), system-ui",
                  }}
                >
                  ONE 
                  <br />
                  PLATFORM
                </h2>

                {/* Filled reveal */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    clipPath: useTransform(maskSize, (v) => {
                      const p = Number.parseFloat(v);
                      return `inset(0 ${100 - p}% 0 0)`;
                    }),
                  }}
                >
                  <h2
                    className="text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[12vw] font-black leading-[0.85] tracking-[-0.02em] uppercase text-gradient-parallax"
                    style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
                  >
                    ONE
                    <br />
                    PLATFORM
                  </h2>
                </motion.div>
              </div>

              <motion.p
                className="mt-8 text-center text-xs leading-relaxed sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] uppercase text-white/55 md:text-white/40 px-1 sm:px-2"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.35, 0.5, 0.7, 0.85],
                    [0, 1, 1, 0],
                  ),
                }}
              >
                To make controlling robots <span className="text-[var(--accent)]">Easy</span>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Vignette — side fades only at md+; on phones they sat on top of type that was already full-bleed */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-35 md:opacity-60" />
            <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-black to-transparent md:block" />
            <div className="absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-black to-transparent md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}


