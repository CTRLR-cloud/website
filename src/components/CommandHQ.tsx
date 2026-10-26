"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
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
};

const items: Item[] = [
  {
    number: "01",
    title: "Teleoperation",
    subtitle: "Control",
    desc: "Control any robot or drone live from your browser with a keyboard, gamepad, or custom controller, with real-time video and two-way audio.",
    image: "/robot_soccer.png",
  },
  {
    number: "02",
    title: "Fleet management",
    subtitle: "Operations",
    desc: "See every robot, site, and live feed in real time. Know what's online and what needs attention, and alert operators fast when autonomy fails or something goes wrong.",
    image: "/command-hq-eagle-eye-map.webp",
  },
  {
    number: "03",
    title: "Sessions & logs",
    subtitle: "Data collection",
    desc: "Every session is recorded, time-stamped, and replayable, with full context on robots, operators, and durations. Catch errors early and build one dataset across your whole fleet.",
    image: "/sessions-and-logs.png",
  },
  {
    number: "04",
    title: "Customizability",
    subtitle: "Configuration",
    desc: "Configure ROS commands, custom controllers, locations, and keyboard bindings in one place. Enable and trigger the actions your team depends on, from emergency stops to sensor scans.",
    image: "/customizations_commandHQ2.png",
  },
];

export function CommandHQ({
  className,
  headingLevel = "h2",
}: {
  className?: string;
  /** "h1" when this section opens the page (Platform). */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // How far the card rail must slide so the last card ends fully on screen, measured
  // rather than guessed, since card widths change with the viewport.
  const trackRef = useRef<HTMLDivElement | null>(null);
  const maxShift = useMotionValue(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      maxShift.set(Math.max(0, el.scrollWidth - window.innerWidth + pad));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [maxShift]);

  // The rail reaches the last card at 85% scroll, then holds it there as the section scrolls away.
  const x = useTransform([scrollYProgress, maxShift], ([p, shift]: number[]) =>
    reduceMotion ? 0 : -shift * Math.min(1, p / 0.85),
  );

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);


  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 0.3, 0.3, 0],
  );

  const line = useMotionTemplate`linear-gradient(to right, color-mix(in oklab, var(--accent) 55%, transparent), rgba(255,255,255,0.30), transparent)`;

  return (
    <section
      id="command-hq"
      className={cn(
        "scroll-mt-[max(6rem,12svh)] relative",
        className,
      )}
    >
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

          {/* Title stays in normal flow so it always reserves space above the card rail.
              Not scroll-faded: hash links land at progress≈0; opacity 0→1 would hide the headline. */}
          <div className="relative z-20 flex-shrink-0 pb-5 pt-20 sm:pt-24 lg:pb-6 lg:pt-28">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_8px_color-mix(in_oklab,var(--accent)_14%,transparent)]" />
                <span className="text-xs uppercase tracking-[0.22em] text-white/55">
                  The Platform
                </span>
              </div>
              <Heading className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                Your <span className="text-gradient">Command HQ</span>
              </Heading>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                Command HQ is your center for real-time ops. Monitor any connected device,
                teleoperate when autonomy stalls, collect data, manage team members &amp; sites,
                and more.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="relative h-[1px] bg-white/5">
                <motion.div className="absolute left-0 top-0 h-full" style={{ width: lineWidth, background: line }} />
              </div>
            </div>
          </div>

          {/* Remaining viewport height only — cards cannot overlap the headline */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center overflow-hidden pt-6 md:pt-8">
            <motion.div
              ref={trackRef}
              // Starts in line with the standard content column, then slides edge to edge.
              className="flex w-max max-w-none gap-8 pl-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]"
              style={{ x }}
            >
            {items.map((item, index) => (
              <motion.div
                key={item.number}
                className="relative w-[88vw] flex-shrink-0 sm:w-[75vw] md:w-[60vw] lg:w-[50vw] xl:w-[44vw] max-w-[min(760px,calc(200svh_-_70rem))]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group">
                  {/* Product screenshots are ~2:1; this keeps them whole and unfiltered. */}
                  <div className="relative aspect-[2/1] overflow-hidden border-b border-white/10 bg-black">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-contain transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium tracking-[0.15em] text-[var(--accent)]">
                        {item.number}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl lg:text-2xl font-semibold text-white leading-tight tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.desc}</p>
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
