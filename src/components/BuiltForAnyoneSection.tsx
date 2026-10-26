"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

type Point = { x: number; y: number };
type IconName = "robot" | "drone" | "camera" | "sensor";

/** 24×24 line icons, drawn in the device nodes. */
const ICONS: Record<IconName, string[]> = {
  robot: ["M7 8h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z", "M12 8V4M10 4h4", "M2 13v3M22 13v3", "M9 14h.01M15 14h.01"],
  drone: ["M9.5 9.5h5v5h-5z", "M9.5 9.5L6.5 6.5M14.5 9.5l3-3M9.5 14.5l-3 3M14.5 14.5l3 3", "M2.5 5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M16.5 5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M2.5 19a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M16.5 19a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0"],
  camera: ["M3 7l13 4-1.5 4.5L2 11.5z", "M16 11l4-1 1 3-5 2", "M8 13.5L7 18H3M3 16v4"],
  sensor: ["M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7", "M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"],
};
const TEAM_ICON = ["M6 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0", "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6", "M14.5 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0", "M15.5 14.2c2.9.3 5.5 2.6 5.5 5.8"];

const DEVICES: { label: string; app: string; icon: IconName }[] = [
  { label: "Robots", app: "Robot app(s)", icon: "robot" },
  { label: "Drones", app: "Drone app", icon: "drone" },
  { label: "Cameras", app: "Camera app", icon: "camera" },
  { label: "Sensors", app: "Sensor app", icon: "sensor" },
];

type Layout = {
  w: number;
  h: number;
  font: number;
  /** Size of the device and team labels. */
  labelFont: number;
  node: { w: number; h: number };
  app: { w: number; h: number };
  team: { w: number; h: number };
  hubR: number;
  devices: Point[];
  /** Where each device's own app sits in the "before" tangle, deliberately out of order so lines cross. */
  apps: Point[];
  hub: Point;
  teamAt: Point;
  beforeLabels: (Point & { text: string })[];
  /** Device to its app, app to team, device to hub, hub to team. */
  paths: (l: Layout) => { tangle: string[]; straight: string[] };
};

const OFFSETS = [-140, 160, -90, 120];

/** Tablets and laptops: devices down the left, your team on the right. */
const WIDE: Layout = {
  w: 1000,
  h: 560,
  font: 15,
  labelFont: 22,
  node: { w: 200, h: 70 },
  app: { w: 128, h: 78 },
  team: { w: 210, h: 86 },
  hubR: 64,
  devices: [110, 220, 330, 440].map((y) => ({ x: 120, y })),
  apps: [
    { x: 560, y: 400 },
    { x: 450, y: 140 },
    { x: 620, y: 215 },
    { x: 440, y: 330 },
  ],
  hub: { x: 520, y: 275 },
  teamAt: { x: 880, y: 275 },
  beforeLabels: [
    { text: "A separate app for every robot brand", x: 520, y: 42 },
    { text: "Months of engineering", x: 300, y: 522 },
    { text: "Only one engineer knows how it works", x: 760, y: 470 },
  ],
  paths: (l) => {
    const nx = l.node.w / 2;
    const ax = l.app.w / 2;
    const tx = l.team.w / 2;
    const tangle = l.devices.flatMap((d, i) => {
      const a = l.apps[i];
      const o = OFFSETS[i];
      return [
        `M${d.x + nx} ${d.y} C${d.x + nx + 120} ${d.y} ${a.x - ax - 120} ${a.y} ${a.x - ax} ${a.y}`,
        `M${a.x + ax} ${a.y} C${a.x + ax + 110} ${a.y + o} ${l.teamAt.x - tx - 120} ${l.teamAt.y - o * 0.6} ${l.teamAt.x - tx} ${l.teamAt.y}`,
      ];
    });
    const straight = [
      ...l.devices.map(
        (d) => `M${d.x + nx} ${d.y} C${d.x + nx + 150} ${d.y} ${l.hub.x - l.hubR - 120} ${l.hub.y} ${l.hub.x - l.hubR} ${l.hub.y}`,
      ),
      `M${l.hub.x + l.hubR} ${l.hub.y} L${l.teamAt.x - tx} ${l.teamAt.y}`,
    ];
    return { tangle, straight };
  },
};

/** Phones: devices across the top, your team at the bottom. */
const TALL: Layout = {
  w: 600,
  h: 650,
  font: 20,
  labelFont: 20,
  node: { w: 146, h: 64 },
  app: { w: 150, h: 84 },
  team: { w: 200, h: 80 },
  hubR: 62,
  devices: [75, 225, 375, 525].map((x) => ({ x, y: 50 })),
  apps: [
    { x: 410, y: 330 },
    { x: 170, y: 255 },
    { x: 450, y: 225 },
    { x: 190, y: 360 },
  ],
  hub: { x: 300, y: 445 },
  teamAt: { x: 300, y: 600 },
  beforeLabels: [
    { text: "A separate app for every robot brand", x: 300, y: 160 },
    { text: "Months of engineering", x: 300, y: 455 },
    { text: "Only one engineer knows how it works", x: 300, y: 515 },
  ],
  paths: (l) => {
    const ny = l.node.h / 2;
    const ay = l.app.h / 2;
    const ty = l.team.h / 2;
    const tangle = l.devices.flatMap((d, i) => {
      const a = l.apps[i];
      const o = OFFSETS[i];
      return [
        `M${d.x} ${d.y + ny} C${d.x} ${d.y + ny + 90} ${a.x} ${a.y - ay - 90} ${a.x} ${a.y - ay}`,
        `M${a.x} ${a.y + ay} C${a.x + o} ${a.y + ay + 110} ${l.teamAt.x - o * 0.5} ${l.teamAt.y - ty - 120} ${l.teamAt.x} ${l.teamAt.y - ty}`,
      ];
    });
    const straight = [
      ...l.devices.map(
        (d) => `M${d.x} ${d.y + ny} C${d.x} ${d.y + ny + 160} ${l.hub.x} ${l.hub.y - l.hubR - 120} ${l.hub.x} ${l.hub.y - l.hubR}`,
      ),
      `M${l.hub.x} ${l.hub.y + l.hubR} L${l.teamAt.x} ${l.teamAt.y - ty}`,
    ];
    return { tangle, straight };
  },
};

function Icon({ d, x, y, size }: { d: string[]; x: number; y: number; size: number }) {
  const s = size / 24;
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </g>
  );
}

/** One device's own app window, which slides into the hub and disappears as the picture resolves. */
function AppWindow({ l, i, t }: { l: Layout; i: number; t: MotionValue<number> }) {
  const a = l.apps[i];
  const x = useTransform(t, [0, 0.7], [0, l.hub.x - a.x]);
  const y = useTransform(t, [0, 0.7], [0, l.hub.y - a.y]);
  const scale = useTransform(t, [0, 0.7], [1, 0.3]);
  const opacity = useTransform(t, [0.35, 0.7], [1, 0]);
  const { w, h } = l.app;
  return (
    <motion.g style={{ x, y, scale, opacity }}>
      <rect x={a.x - w / 2} y={a.y - h / 2} width={w} height={h} rx={10} fill="rgba(18,18,18,0.95)" stroke="rgba(255,255,255,0.22)" />
      <line x1={a.x - w / 2} y1={a.y - h / 2 + 20} x2={a.x + w / 2} y2={a.y - h / 2 + 20} stroke="rgba(255,255,255,0.15)" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={a.x - w / 2 + 14 + k * 11} cy={a.y - h / 2 + 10} r={3} fill="rgba(255,255,255,0.3)" />
      ))}
      <text x={a.x} y={a.y + 14} textAnchor="middle" fontSize={l.font * 0.9} fill="rgba(255,255,255,0.7)">
        {DEVICES[i].app}
      </text>
    </motion.g>
  );
}

function Diagram({ l, t, className }: { l: Layout; t: MotionValue<number>; className?: string }) {
  const { tangle, straight } = l.paths(l);
  const tangleOpacity = useTransform(t, [0.15, 0.55], [1, 0]);
  const straightLength = useTransform(t, [0.4, 0.9], [0, 1]);
  const hubOpacity = useTransform(t, [0.35, 0.7], [0, 1]);
  const hubScale = useTransform(t, [0.35, 0.75], [0.6, 1]);
  const beforeOpacity = useTransform(t, [0, 0.3], [1, 0]);
  const { node, team } = l;

  return (
    <svg viewBox={`0 0 ${l.w} ${l.h}`} className={className} role="img" aria-label="Before: every robot brand has its own app, wired to your team in a tangle. After: every robot, drone, camera and sensor connects to one CTRL+R platform your whole team uses.">
      {/* Before: each device wired through its own app. */}
      <motion.g style={{ opacity: tangleOpacity }} fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth={1.5} strokeDasharray="5 6">
        {tangle.map((d) => (
          <path key={d} d={d} />
        ))}
      </motion.g>

      {/* After: everything runs through one hub. */}
      <g fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(201,0,7,0.7))" }}>
        {straight.map((d) => (
          <motion.path key={d} d={d} style={{ pathLength: straightLength }} />
        ))}
      </g>

      {DEVICES.map((_, i) => (
        <AppWindow key={i} l={l} i={i} t={t} />
      ))}

      <motion.g style={{ opacity: hubOpacity, scale: hubScale }}>
        <circle cx={l.hub.x} cy={l.hub.y} r={l.hubR} fill="#0a0202" stroke="var(--accent)" strokeWidth={2} style={{ filter: "drop-shadow(0 0 18px rgba(201,0,7,0.6))" }} />
        <image href="/CTRLR_logo_symbol.png" x={l.hub.x - l.hubR * 0.62} y={l.hub.y - l.hubR * 0.62} width={l.hubR * 1.24} height={l.hubR * 1.24} preserveAspectRatio="xMidYMid meet" />
      </motion.g>

      {DEVICES.map((dev, i) => {
        const p = l.devices[i];
        return (
          <g key={dev.label}>
            <rect x={p.x - node.w / 2} y={p.y - node.h / 2} width={node.w} height={node.h} rx={14} fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.18)" />
            <g className="text-[var(--accent)]">
              <Icon d={ICONS[dev.icon]} x={p.x - node.w / 2 + l.labelFont * 1.3} y={p.y} size={l.labelFont * 1.4} />
            </g>
            <text x={p.x - node.w / 2 + l.labelFont * 2.45} y={p.y + l.labelFont * 0.35} fontSize={l.labelFont} fill="white">
              {dev.label}
            </text>
          </g>
        );
      })}

      <g>
        <rect x={l.teamAt.x - team.w / 2} y={l.teamAt.y - team.h / 2} width={team.w} height={team.h} rx={16} fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.25)" />
        <g className="text-white">
          <Icon d={TEAM_ICON} x={l.teamAt.x - team.w / 2 + l.labelFont * 1.5} y={l.teamAt.y} size={l.labelFont * 1.6} />
        </g>
        <text x={l.teamAt.x - team.w / 2 + l.labelFont * 2.9} y={l.teamAt.y + l.labelFont * 0.35} fontSize={l.labelFont * 1.05} fontWeight={600} fill="white">
          Your team
        </text>
      </g>

      <motion.g style={{ opacity: beforeOpacity }}>
        {l.beforeLabels.map((lab) => (
          <text key={lab.text} x={lab.x} y={lab.y} textAnchor="middle" fontSize={l.font * 1.2} fontWeight={600} fill="rgba(255,255,255,0.92)">
            <tspan fill="var(--accent)">●</tspan>
            <tspan dx={l.font * 0.5}>{lab.text}</tspan>
          </text>
        ))}
      </motion.g>

    </svg>
  );
}

type ValuePoint = { title: string; desc: string };

const ANSWERS: Record<"yes" | "no", { lead: string; points: ValuePoint[] }> = {
  yes: {
    lead: "Your sales team doesn't build its own CRM. Why is your robotics team building its own fleet management software?",
    points: [
      {
        title: "Stop building it in-house",
        desc: "Skip building and maintaining your own system forever. Save time and money, and keep your engineers focused on the hard problems.",
      },
      {
        title: "Scale with one system",
        desc: "One platform for every site, team, and device, from any manufacturer. Ready for hundreds of sites, teams, and robots.",
      },
      {
        title: "Build your datasets",
        desc: "Every session is recorded and every event logged, so you collect the data your future autonomous workforce will learn from.",
      },
    ],
  },
  no: {
    lead: "No robotics team? No problem. CTRL+R is built for first-time operators.",
    points: [
      {
        title: "Operate from day one",
        desc: "Controls anyone can learn: a joystick, a keyboard, or clicking a location from a list of options.",
      },
      {
        title: "Easy setup",
        desc: "We help you connect your robots and fit CTRL+R into how your business already works.",
      },
      {
        title: "Simple fleet management",
        desc: "Decide who can operate each robot, when, and where, and see all of your connected devices in real time.",
      },
    ],
  },
};

/** "Do you have a robotics team?" Yes / No, each showing the biggest wins for that kind of customer. */
function RoboticsTeamToggle() {
  const [answer, setAnswer] = useState<"yes" | "no">("yes");
  const [answered, setAnswered] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = ANSWERS[answer];

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* A deliberate pattern-break: a bold, centred question that pulses until the visitor answers. */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[var(--accent)]/45 bg-black/60 px-6 py-10 text-center shadow-glow backdrop-blur-sm sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,0,7,0.25),transparent_70%)]"
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-text)]">Quick question</p>
        <p
          id="robotics-team-question"
          className="text-premium relative mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Do you have a robotics team?
        </p>

        <div className="relative mt-8 flex justify-center">
          <div className="relative">
            {!answered && !reduceMotion && (
              <>
                {[0, 1].map((k) => (
                  <motion.span
                    key={k}
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[var(--accent)]"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.25 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: k }}
                  />
                ))}
              </>
            )}
            <div
              role="radiogroup"
              aria-labelledby="robotics-team-question"
              className="relative inline-grid grid-cols-2 gap-1 rounded-full border border-white/15 bg-black/70 p-1.5 text-lg font-semibold"
            >
              {(["yes", "no"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={answer === value}
                  onClick={() => {
                    setAnswer(value);
                    setAnswered(true);
                  }}
                  className={cn(
                    "relative min-w-[7.5rem] rounded-full px-10 py-3.5 transition-colors ring-premium sm:min-w-[9rem]",
                    answer === value ? "text-white" : "text-white/55 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {answer === value && (
                    <motion.span
                      layoutId="robotics-team-pill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_0_32px_rgba(201,0,7,0.6)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{value === "yes" ? "Yes" : "No"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          className="relative mt-6 text-sm text-white/55"
          animate={{ opacity: answered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Pick one to see what CTRL+R does for you
        </motion.p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={answer}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-12"
          aria-live="polite"
        >
          <p className="mx-auto max-w-3xl text-center text-lg font-medium leading-8 text-white/85 sm:text-xl">{current.lead}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {current.points.map((point) => (
              <li key={point.title} className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                <div className="h-1 w-10 rounded-full bg-[var(--accent)]" />
                <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{point.desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * "Built for anyone, not just engineers": a pinned before-and-after picture that untangles as you
 * scroll, from one app per robot brand to every device on one CTRL+R platform.
 */
export function BuiltForAnyoneSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, [0.08, 0.8], [0, 1], { clamp: true });
  const beforeTab = useTransform(t, [0.4, 0.5], [1, 0.35]);
  const afterTab = useTransform(t, [0.4, 0.5], [0.35, 1]);
  const indicatorX = useTransform(t, [0.4, 0.55], ["0%", "100%"]);
  const taglineOpacity = useTransform(t, [0.75, 1], [0, 1]);
  const taglineY = useTransform(t, [0.75, 1], [16, 0]);

  return (
    <>
      <section className="relative">
        <div ref={ref} className="relative h-[260vh]">
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">Why CTRL+R</p>
                <h2 className="text-premium mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Built for anyone, <span className="text-gradient">not just engineers</span>
                </h2>
                <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg [@media(max-height:700px)]:hidden">
                  One platform your whole team can use, from first-time operators to senior robotics engineers.
                </p>
              </div>

              {/* Which state the picture is in. */}
              <div className="relative mt-6 inline-grid grid-cols-2 rounded-full border border-white/10 bg-black/40 p-1 text-[11px] font-semibold uppercase tracking-[0.12em] sm:mt-8 sm:text-sm sm:tracking-[0.18em]">
                <motion.span
                  aria-hidden
                  className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[var(--accent)]/20 ring-1 ring-[var(--accent)]/50"
                  style={{ x: indicatorX }}
                />
                <motion.span className="relative whitespace-nowrap px-3 py-2 text-center text-white sm:px-6" style={{ opacity: beforeTab }}>
                  Built in-house
                </motion.span>
                <motion.span className="relative whitespace-nowrap px-3 py-2 text-center text-white sm:px-6" style={{ opacity: afterTab }}>
                  With CTRL+R
                </motion.span>
              </div>

              <Diagram l={WIDE} t={t} className="mt-2 hidden h-auto max-h-[55svh] w-full sm:block [@media(max-height:720px)]:max-h-[42svh]" />
              <Diagram l={TALL} t={t} className="mx-auto mt-2 block h-auto max-h-[50svh] w-full sm:hidden [@media(max-height:700px)]:max-h-[44svh]" />

              {/* The picture's summary, revealed once everything has connected. */}
              <motion.p
                className="text-premium mt-4 text-center text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-[2.75rem] [@media(max-height:720px)]:mt-3 sm:[@media(max-height:720px)]:text-3xl"
                style={{ opacity: taglineOpacity, y: taglineY }}
              >
                One platform. Any device. <span className="text-gradient">Total control.</span>
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <RoboticsTeamToggle />
      </section>
    </>
  );
}
