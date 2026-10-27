"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { CtrlRLogo } from "@/components/CtrlRLogo";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const devices = ["robot", "drone", "camera", "sensor"];

/**
 * Hero backgrounds, graded to the brand red. Robot photos supplied by CTRL+R;
 * drone from Unsplash. `phonePosition` keeps the subject in frame on narrow screens.
 */
const backgrounds = [
  { src: "/hero/hero-robot-arm.webp", phonePosition: "object-[30%_center]" },
  { src: "/hero/hero-humanoids.webp", phonePosition: "object-center" },
  { src: "/hero/hero-drone-v2.webp", phonePosition: "object-[60%_center]" },
  { src: "/hero/hero-delivery-robots-dubai.webp", phonePosition: "object-center" },
  { src: "/hero/hero-robot-dog-v2.webp", phonePosition: "object-[55%_center]" },
];

/** "Any robot" with the device word cycling on a timer. */
function AnyDevice() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % devices.length), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <p className="text-2xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl">
      <span className="sr-only">Any robot, drone, camera, or sensor</span>
      {/*
        "Any" never moves; the word starts just right of it, whatever its length. The pair is nudged left
        by half the average word's overhang so "Any robot" and "Any camera" both look centred.
      */}
      <span aria-hidden className="grid -translate-x-[0.65em] grid-cols-2 gap-[0.3em]">
        <span className="text-right">any</span>
        <span className="grid h-[1.2em] overflow-hidden text-left">
          <AnimatePresence initial={false}>
            <motion.span
              key={devices[index]}
              style={{ gridArea: "1 / 1" }}
              className="whitespace-nowrap text-[var(--accent)]"
              initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {devices[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </p>
  );
}

/** Full-screen homepage hero: crossfading photos that slowly zoom and drifts as you scroll, with the copy fading away. */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [bgIndex, setBgIndex] = useState(0);
  const [restLoaded, setRestLoaded] = useState(false);

  // Background photos crossfade on their own timer, independent of the cycling word.
  // Reduced motion keeps the first photo: the crossfade is decoration, not content.
  const shownBg = reduceMotion ? 0 : bgIndex;
  useEffect(() => {
    if (reduceMotion) return;
    const load = window.setTimeout(() => setRestLoaded(true), 1500);
    const cycle = window.setInterval(() => setBgIndex((i) => (i + 1) % backgrounds.length), 5000);
    return () => {
      window.clearTimeout(load);
      window.clearInterval(cycle);
    };
  }, [reduceMotion]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, reduceMotion ? 1.04 : 1.22]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-black"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ scale: imageScale, y: imageY }} aria-hidden>
        {backgrounds.map((bg, i) => (
          // Only the first photo loads up front; the rest join once the page has settled.
          (i === 0 || restLoaded) && (
            <Image
              key={bg.src}
              src={bg.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover transition-opacity duration-[1500ms] ease-in-out md:object-center",
                bg.phonePosition,
                i === shownBg ? "opacity-100" : "opacity-0",
              )}
            />
          )
        ))}
      </motion.div>
      {/* Readability: soft dark pool behind the copy, darker towards the bottom edge. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(0,0,0,0.5),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black" aria-hidden />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-6 py-20 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.85),0_0_4px_rgba(0,0,0,0.6)]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <Reveal className="flex justify-center">
          <div
            className="inline-block"
            style={{ filter: "drop-shadow(0 0 36px rgba(201,0,7,0.45)) drop-shadow(0 0 80px rgba(201,0,7,0.2))" }}
          >
            <CtrlRLogo size="hero" />
          </div>
        </Reveal>

        <Reveal delayMs={60}>
          <h1 className="text-premium mt-10 text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl">
            One Unified Platform
          </h1>
        </Reveal>
        <Reveal delayMs={110}>
          <p className="mt-4 text-xl font-medium text-white/80 sm:text-2xl">
            to manage your entire physical AI fleet
          </p>
        </Reveal>
        <Reveal delayMs={160} className="mt-8">
          <AnyDevice />
        </Reveal>

        <Reveal immediate delayMs={220} className="mt-10 flex justify-center">
          {/* One call to action: the contact section offers both paths (try it free, or a demo and pilot). */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition ring-premium btn-primary"
          >
            Get started
          </a>
        </Reveal>
      </motion.div>
    </section>
  );
}
