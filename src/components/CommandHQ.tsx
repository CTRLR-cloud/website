"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/SmartImage";

type Item = {
  number: "01" | "02" | "03" | "04";
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accent: string;
};

const items: Item[] = [
  {
    number: "01",
    title: "Your fleet, one dashboard",
    subtitle: "Robots",
    desc: "Monitor every asset from a single pane—status, model, and type at a glance. Track operators, sessions, and hours across quadrupeds, humanoids, arms, drones, and more in real time.",
    image: "/command-hq-robots.png",
    accent: "rgba(0,200,180,0.25)",
  },
  {
    number: "02",
    title: "Sessions & logs",
    subtitle: "Operations",
    desc: "See live and completed sessions side by side with full context: robots, operators, session durations & time stamps. Catch errors early and share analytics with team members to inform strategy.",
    image: "/command-hq-sessions-logs.png",
    accent: "rgba(201,0,7,0.25)",
  },
  {
    number: "03",
    title: "ROS commands & controls",
    subtitle: "Customizations",
    desc: "Configure ROS commands, controllers, locations, and keyboard bindings in one place. Search, enable, and run the actions your team depends on, from emergency stops to sensor scans.",
    image: "/command-hq-customizations.png",
    accent: "rgba(110,150,255,0.22)",
  },
  {
    number: "04",
    title: "Alerts that reach the right people",
    subtitle: "Notifications",
    desc: "A live feed of disconnects, battery warnings, session failures, and security events, plus rules so operators respond fast when autonomy fails or something goes wrong.",
    image: "/command-hq-notifications.png",
    accent: "rgba(242, 180, 0, 0.22)",
  },
];

export function CommandHQ({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["5%", "-75%"],
  );

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [40, 0]);

  const fadeOut = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 0.3, 0.3, 0],
  );

  const line = useMotionTemplate`linear-gradient(to right, color-mix(in oklab, var(--accent) 55%, transparent), rgba(255,255,255,0.30), transparent)`;

  return (
    <section className={cn("relative bg-section border-t border-hairline", className)}>
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] min-h-0 w-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(201,0,7,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
              }}
            />
            <div className="absolute inset-0 k-noise opacity-[0.12]" />
          </div>

          {/* Title stays in normal flow so it always reserves space above the card rail */}
          <motion.div
            className="relative z-20 flex-shrink-0 px-4 pb-5 pt-20 sm:pt-24 lg:mx-24 lg:px-0 lg:pb-6 lg:pt-28"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_8px_color-mix(in_oklab,var(--accent)_14%,transparent)]" />
                <span className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Command HQ
                </span>
              </div>
              <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                One Platform.{" "}
                <span className="font-light text-white/50">Total Control.</span>
              </h2>
            </div>
          </motion.div>

          <div className="relative z-10 flex-shrink-0 px-4 lg:mx-24 lg:px-0">
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="relative h-[1px] bg-white/5">
                <motion.div className="absolute left-0 top-0 h-full" style={{ width: lineWidth, background: line }} />
              </div>
            </div>
          </div>

          {/* Remaining viewport height only — cards cannot overlap the headline */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
            <motion.div
              className="flex w-max max-w-none gap-8 pl-4 lg:pl-24"
              style={{ x, opacity: fadeOut }}
            >
            {items.map((item, index) => (
              <motion.div
                key={item.number}
                className="relative h-[min(480px,52svh,calc(100svh-13.5rem))] w-[85vw] flex-shrink-0 sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[32vw]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group">
                  <div className="relative h-[50%] overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{
                        background: `radial-gradient(600px 400px at 50% 100%, ${item.accent}, transparent 50%)`,
                      }}
                    />

                    <div className="absolute top-6 left-6 h-10 w-10 rounded-xl border border-white/15 bg-black/50 backdrop-blur grid place-items-center">
                      <span className="text-sm font-medium tracking-[0.15em] text-white/80">
                        {item.number}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8 flex flex-col justify-between h-[50%]">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight tracking-[-0.02em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>

                  </div>

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        boxShadow:
                          "inset 0 0 80px color-mix(in oklab, var(--accent) 7%, transparent), 0 0 60px color-mix(in oklab, var(--accent) 5%, transparent)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-[20vw]" />
          </motion.div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent opacity-70 md:w-16 md:opacity-90 lg:w-24 lg:opacity-100" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent opacity-70 md:w-16 md:opacity-90 lg:w-24 lg:opacity-100" />
            </div>
          </div>

          <motion.div
            className="relative z-20 flex-shrink-0 pb-6 pt-2 pointer-events-none"
            style={{ opacity: scrollHintOpacity }}
          >
            <div className="flex justify-center">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/30">
                <span>Scroll to explore</span>
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
