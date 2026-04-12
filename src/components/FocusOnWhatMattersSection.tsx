"use client";

import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SITE_LINKS } from "@/config/links";
import { cn } from "@/lib/cn";

const ownerSteps = [
  {
    title: "No more sprawl",
    desc: "CTRL+R supports any robot, any interface, any third party software. Add the CTRL+R agent to your robot, configure any preferences, integrate any additional third-party softwares, and you're live.",
  },
  {
    title: "Focus on solving the hard problems",
    desc: "Define who can access and operate each robot, when, and under what rules. Detailed logs, clear handoffs, and audit trails help engineers delegate simple tasks while staying focused on solving the real issues, not babysitting.",
  },
  {
    title: "Operate on your terms",
    desc: "Use custom controllers, AR/VR headsets, keyboards, joysticks, location/task presets, ROS commands, or any bespoke interface to make the CTRL+R interface your own.",
  },
];

export function FocusOnWhatMattersSection({
  className,
  compactTop,
}: {
  className?: string;
  /** When true, reduces top padding for a tighter gap from the section above */
  compactTop?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={ref} className={cn("border-t border-hairline bg-section", className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 pb-16 md:pb-24",
          compactTop ? "pt-8 md:pt-12" : "pt-16 md:pt-24",
        )}
      >
        <div className="mb-12 md:mb-14">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">
              Focus on what matters
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-4 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Stop  {" "}
              <span className="text-[var(--accent)]">reinventing the wheel</span>
            </h2>
          </Reveal>
          <Reveal delayMs={110}>
            <p className="mt-5 text-sm leading-7 text-white/60 max-w-2xl">
              Robotics teams shouldn't have to build custom software just to operate their robots.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-3xl">
          <Reveal delayMs={90}>
            <div className="relative overflow-hidden h-full rounded-2xl border border-[var(--accent)]/25 bg-black/50 flex flex-col">
              <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,0,7,0.06) 0%, transparent 50%), radial-gradient(600px 400px at 80% 20%, rgba(201,0,7,0.08), transparent 50%)",
                }}
              />
              <div className="relative p-6 md:p-8 flex flex-col flex-1 min-h-0">
                <div className="text-xs tracking-[0.2em] uppercase text-[var(--accent)]/90 mb-1">
                  A Better Way
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mt-1">
                  One platform to control and coordinate your entire fleet
                </h3>
                <div className="mt-6 space-y-3 flex-1">
                  {ownerSteps.map((s, i) => (
                    <div
                      key={s.title}
                      className="rounded-xl border border-[var(--accent)]/20 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">{s.title}</div>
                        <div className="text-xs text-white/45"></div>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 shrink-0">
                  <a
                    href={SITE_LINKS.CLIENT}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
                  >
                    Connect a robot now
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
