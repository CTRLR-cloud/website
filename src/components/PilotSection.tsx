import { Reveal } from "@/components/Reveal";
import { SITE_LINKS } from "@/config/links";

type Step = {
  title: string;
  desc: string;
  /** Where the step sits on the ring, in degrees clockwise from 3 o'clock. */
  angle: number;
};

const steps: Step[] = [
  {
    title: "Discover",
    desc: "We define a specific problem with you and set measurable goals for a pilot.",
    angle: -90,
  },
  {
    title: "Pilot",
    desc: "You get access to the platform, we connect your robots, and we test for the results you want.",
    angle: 0,
  },
  {
    title: "Go live",
    desc: "When the agreed outcomes are met, the pilot converts into a full deployment.",
    angle: 90,
  },
  {
    title: "Expand",
    desc: "Add new sites, devices, and team members as your operation scales.",
    angle: 180,
  },
];

const benefits = [
  {
    title: "Full control of your fleet",
    desc: "Customize robots, teleoperate, monitor fleet health, manage permissions, and audit every session and log.",
  },
  {
    title: "Easy onboarding",
    desc: "We integrate CTRL+R to work seamlessly with your existing systems and processes.",
  },
  {
    title: "Robots in minutes",
    desc: "Robots we already support connect in minutes. A new one takes 1–2 weeks, and only ever once.",
  },
];

const W = 560;
const H = 520;
const CX = W / 2;
const CY = H / 2;
/** Radius of the ring the steps and arrows sit on. */
const R = 185;

function polar(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

/** Clockwise arc along the ring from one step to the next, leaving a gap for each box. */
function arcPath(from: number, to: number) {
  const gap = 38;
  const a = polar(from + gap);
  const b = polar(to - gap + 6);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${R} ${R} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const arcs = steps.map((step) => arcPath(step.angle, step.angle + 90));

function CycleDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <marker
            id="pilot-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-[var(--accent)]" />
          </marker>
          <radialGradient id="pilot-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3a0204" />
            <stop offset="100%" stopColor="#1a0102" />
          </radialGradient>
        </defs>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          strokeWidth="1"
          strokeDasharray="2 6"
          className="stroke-white/15"
        />
        {arcs.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd="url(#pilot-arrow)"
            className="stroke-[var(--accent)]"
          />
        ))}
        <circle cx={W / 2} cy={H / 2} r="54" fill="url(#pilot-hub)" strokeWidth="2" className="stroke-[var(--accent)]" />
        <text
          x={W / 2}
          y={H / 2 + 6}
          textAnchor="middle"
          className="fill-white"
          style={{ fontSize: 18, fontWeight: 700 }}
        >
          CTRL+R
        </text>
        <text x="405" y="372" textAnchor="end" className="fill-white/55" style={{ fontSize: 12 }}>
          Typically 1–3 months
        </text>
        <text x="150" y="160" className="fill-white/55" style={{ fontSize: 12 }}>
          <tspan x="150">Referrals,</tspan>
          <tspan x="150" dy="15">adjacent use cases</tspan>
        </text>
      </svg>

      {steps.map((step, i) => {
        const { x, y } = polar(step.angle);
        return (
          <div
            key={step.title}
            className="absolute w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/85 px-3 py-2.5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
          >
            <div
              className={
                i === 0
                  ? "text-lg font-semibold text-[var(--accent)]"
                  : "text-lg font-semibold text-white"
              }
            >
              {step.title}
            </div>
            <p className="mt-1 text-[12px] leading-[1.4] text-white/65">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Phones: the same cycle as a vertical timeline, since the circle would be too small to read. */
function CycleTimeline() {
  return (
    <ol className="relative ml-4 border-l-2 border-[var(--accent)]/70">
      {steps.map((step, i) => (
        <li key={step.title} className="relative pb-8 pl-8 last:pb-2">
          <span className="absolute -left-[17px] top-0 grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--accent)] bg-black text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div
            className={
              i === 0 ? "text-lg font-semibold text-[var(--accent)]" : "text-lg font-semibold text-white"
            }
          >
            {step.title}
          </div>
          <p className="mt-1 text-sm leading-6 text-white/65">{step.desc}</p>
          {step.title === "Pilot" && (
            <p className="mt-2 text-xs italic text-white/45">Typically 1–3 months</p>
          )}
          {step.title === "Expand" && (
            <p className="mt-2 text-xs italic text-white/45">
              Referrals and adjacent use cases start the cycle again
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** How working with CTRL+R starts: makes reaching out feel like a small, defined first step. */
export function PilotSection() {
  return (
    <section id="how-a-pilot-works" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">
              Get started with CTRL+R
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Build your <span className="text-gradient">autonomous workforce</span>
            </h2>
          </Reveal>
          <Reveal delayMs={110}>
            <p className="mt-5 text-base leading-7 text-white/60">
              Every engagement starts small, with a clear problem and goals we both agree on.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12">
          <Reveal delayMs={120} className="lg:col-span-7">
            <div className="hidden md:block">
              <CycleDiagram />
            </div>
            <div className="md:hidden">
              <CycleTimeline />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delayMs={160}>
              <div className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--accent)]">
                What you get
              </div>
            </Reveal>
            <ul className="mt-6 space-y-6">
              {benefits.map((b, i) => (
                <li key={b.title}>
                  <Reveal delayMs={200 + i * 60} className="border-l-2 border-[var(--accent)] pl-5">
                    <div className="text-lg font-semibold text-white">{b.title}</div>
                    <p className="mt-1 text-sm leading-6 text-white/60">{b.desc}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delayMs={400}>
              <a
                href={SITE_LINKS.DEMO}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
              >
                Start with a demo
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
