"use client";

import { motion } from "framer-motion";
import { LogoBlueprint } from "@/components/LogoBlueprint";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** What buyers actually weigh up: the dashboard isn't on the list. */
function BuyerChecklist() {
  const items = [
    { label: "What the robot can do", ok: true },
    { label: "Reliability", ok: true },
    { label: "Price", ok: true },
    { label: "Your fleet dashboard", ok: false },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">What your customer compares</div>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            className="flex items-center gap-3 text-base"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.15 * i }}
          >
            <span
              className={
                item.ok
                  ? "grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-black"
                  : "grid h-6 w-6 place-items-center rounded-full border border-[var(--accent)] text-xs font-bold text-[var(--accent-text)]"
              }
            >
              {item.ok ? "✓" : "✕"}
            </span>
            <span className={item.ok ? "text-white" : "text-white/40 line-through decoration-[var(--accent)] decoration-2"}>
              {item.label}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Where the team's time goes, before and after handing fleet software off. */
function TimeBars() {
  const reduceMotion = usePrefersReducedMotion();
  const bars = [
    { label: "Fleet management", from: "72%", to: "12%", className: "bg-white/25" },
    { label: "Your product & deals", from: "28%", to: "88%", className: "bg-[var(--accent)]" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Your team&apos;s time</div>
      <div className="mt-4 space-y-4">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="text-sm text-white/80">{bar.label}</div>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className={`h-full rounded-full ${bar.className}`}
                initial={{ width: reduceMotion ? bar.to : bar.from }}
                whileInView={{ width: bar.to }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Robot form factors as a packed word cloud: mixed sizes, some words turned sideways. Positions were
 * laid out ahead of time (spiral packing, largest word first) and each word is locked to its measured
 * width, so the cloud stays tight and never overlaps whatever the font renders at.
 */
const CLOUD = { w: 643, h: 440 };
const CLOUD_WORDS: { word: string; x: number; y: number; size: number; width: number; vertical: boolean; tone: "accent" | "white" | "dim" }[] = [
  { word: "Humanoids", x: 319.1, y: 219.2, size: 75.0, width: 410, vertical: false, tone: "accent" },
  { word: "Drones", x: 316.7, y: 159.1, size: 68.8, width: 237, vertical: false, tone: "white" },
  { word: "Quadrupeds", x: 86.0, y: 219.1, size: 62.6, width: 369, vertical: true, tone: "white" },
  { word: "AMRs", x: 322.2, y: 277.6, size: 62.6, width: 179, vertical: false, tone: "accent" },
  { word: "Delivery robots", x: 329.4, y: 325.1, size: 50.2, width: 366, vertical: false, tone: "white" },
  { word: "Robotic arms", x: 547.3, y: 212.7, size: 50.2, width: 321, vertical: true, tone: "dim" },
  { word: "Cleaning robots", x: 312.5, y: 110.3, size: 44.0, width: 334, vertical: false, tone: "accent" },
  { word: "Security robots", x: 318.1, y: 72.9, size: 44.0, width: 321, vertical: false, tone: "white" },
  { word: "Cobots", x: 502.5, y: 91.9, size: 44.0, width: 152, vertical: true, tone: "dim" },
  { word: "Picking robots", x: 325.4, y: 363.3, size: 37.8, width: 264, vertical: false, tone: "white" },
  { word: "UGVs", x: 295.5, y: 398.4, size: 44.0, width: 119, vertical: false, tone: "accent" },
  { word: "Inspection robots", x: 586.1, y: 215.3, size: 37.8, width: 319, vertical: true, tone: "dim" },
  { word: "AGVs", x: 175.7, y: 275.9, size: 37.8, width: 103, vertical: false, tone: "white" },
  { word: "Service robots", x: 345.0, y: 39.6, size: 31.6, width: 224, vertical: false, tone: "dim" },
  { word: "Autonomous forklifts", x: 45.2, y: 208.9, size: 31.6, width: 328, vertical: true, tone: "white" },
  { word: "Underwater ROVs", x: 502.4, y: 402.8, size: 31.6, width: 273, vertical: false, tone: "accent" },
  { word: "Telepresence robots", x: 269.9, y: 13.9, size: 25.4, width: 244, vertical: false, tone: "dim" },
  { word: "USVs", x: 129.2, y: 344.5, size: 31.6, width: 83, vertical: true, tone: "white" },
  { word: "Agricultural robots", x: 120.2, y: 426.5, size: 25.4, width: 224, vertical: false, tone: "dim" },
  { word: "Warehouse robots", x: 616.7, y: 212.0, size: 31.6, width: 284, vertical: true, tone: "dim" },
  { word: "Patrol drones", x: 16.3, y: 214.2, size: 31.6, width: 208, vertical: true, tone: "accent" },
];

const TONE = { accent: "var(--accent)", white: "rgba(255,255,255,0.92)", dim: "rgba(255,255,255,0.45)" };

function FormFactorCloud() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <svg viewBox={`0 0 ${CLOUD.w} ${CLOUD.h}`} className="h-auto w-full" role="img" aria-label="Robot types CTRL+R works with: humanoids, drones, quadrupeds, AMRs, delivery robots, robotic arms, and more">
        {CLOUD_WORDS.map((w, i) => (
          <motion.text
            key={w.word}
            x={w.x}
            y={w.y}
            fontSize={w.size}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            textLength={w.width}
            lengthAdjust="spacingAndGlyphs"
            fill={TONE[w.tone]}
            transform={w.vertical ? `rotate(-90 ${w.x} ${w.y})` : undefined}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
          >
            {w.word}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}

const TRUTHS = [
  {
    truth: "No customer picks a robot for its fleet dashboard.",
    detail: "They buy what your robot does, and how reliably it does it.",
    Visual: BuyerChecklist,
  },
  {
    truth: "Every hour on fleet management is an hour off your product.",
    detail:
      "Any time spent on new integrations, teleoperation, fleet management, access control, or logs is time NOT spent on the product and the deals that make you money.",
    Visual: TimeBars,
  },
  {
    truth: "One platform for you and your customers.",
    detail:
      "Customers want one platform for every robot, and now distributors and solution providers can have it, too. CTRL+R is built for scale and diverse fleets.",
    Visual: FormFactorCloud,
  },
];

/**
 * The page's one deliberate pattern-break: a slanted, full-bleed brand-red band with a giant
 * headline, then a stack of "simple truths" cards that pile up on each other as you scroll.
 */
export function RoboticsCompaniesSection() {
  return (
    <section
      className="relative my-16 bg-[var(--accent)] py-[calc(4vw+5rem)] [clip-path:polygon(0_4vw,100%_0,100%_calc(100%-4vw),0_100%)] md:my-24"
      aria-labelledby="oem-heading"
    >
      {/* The logo's construction lines, printed darker into the red. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <LogoBlueprint className="absolute left-1/2 top-1/2 w-[160vmax] -translate-x-1/2 -translate-y-1/2 brightness-0" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent_60%),linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.35))]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          id="oem-heading"
          className="text-premium text-[clamp(3.25rem,11vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          For OEMs &amp;
          <br />
          distributors
        </motion.h2>
        <div className="mt-6 max-w-3xl text-lg font-medium leading-8 text-white sm:text-2xl sm:leading-9">
          <p>Are you building your own CRM? Your own Slack? Your own QuickBooks?</p>
          <p className="mt-3">
            <span className="text-2xl font-bold text-black sm:text-4xl">Of course not.</span>{" "}
            It&apos;d be a waste of your time and resources.
          </p>
        </div>

        {/* Simple truths: each card sticks a little lower than the last, so they stack up. */}
        <div className="mt-16 space-y-6 sm:mt-20">
          {TRUTHS.map(({ truth, detail, Visual }, i) => (
            <div
              key={truth}
              className="sticky rounded-3xl border border-white/10 bg-black p-6 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] sm:p-10"
              style={{ top: `calc(5rem + ${i * 1.25}rem)` }}
            >
              <div className="grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-text)]">Simple truth</div>
                  <p className="text-premium mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    {truth}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/60 sm:text-base sm:leading-7">{detail}</p>
                </div>
                <div className="md:col-span-5">
                  <Visual />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Leave the fleet software to us. Sell more robots.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
              Want it under your own brand? CTRL+R can be white-labeled for your customers.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition ring-premium hover:bg-white hover:text-black"
          >
            Become a partner
          </a>
        </div>
      </div>
    </section>
  );
}
