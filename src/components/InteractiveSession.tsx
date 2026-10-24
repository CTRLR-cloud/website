"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";
import { HudFrame } from "@/components/HudFrame";

type Hotspot = {
  id: string;
  title: string;
  /** Omitted where the title says it all. */
  desc?: string;
  /** Position on the screenshot, in percent of its width and height. */
  x: number;
  y: number;
};

const hotspots: Hotspot[] = [
  { id: "robot", title: "Robot name and ID", x: 21.5, y: 6.1 },
  { id: "secure", title: "Secure connection", desc: "Every session is encrypted end-to-end.", x: 4.7, y: 12.3 },
  { id: "link", title: "Live link quality", desc: "Real-time latency and bitrate.", x: 8.2, y: 20.1 },
  { id: "timer", title: "Session timer", x: 40.6, y: 20.0 },
  { id: "stream", title: "Stream quality", desc: "Live frame rate, resolution, and robot CPU load.", x: 68.6, y: 20.1 },
  { id: "modes", title: "Control modes", desc: "Control your robot using a joystick, keyboard bindings, custom controllers, or by clicking preset locations.", x: 85.2, y: 28.0 },
  { id: "bindings", title: "Custom input bindings", desc: "Map any command to the keys or buttons your team prefers.", x: 85.2, y: 34.8 },
  { id: "joystick", title: "On-screen joystick", desc: "Adjustable sensitivity for precise movements.", x: 85.3, y: 66.4 },
  { id: "minimap", title: "Live minimap", desc: "The robot's map and saved locations, alongside the camera view.", x: 70.5, y: 66.2 },
  { id: "nav", title: "One-click autonomous navigation", desc: "Click a saved location and the robot drives itself there.", x: 70.3, y: 83.6 },
  { id: "audio", title: "Two-way audio", desc: "Talk and listen through the robot during a live session.", x: 7.6, y: 94.3 },
  { id: "debug", title: "Debug console", desc: "Built-in diagnostics for troubleshooting a session.", x: 97.8, y: 95.2 },
];

/** A live teleoperation screen with hover (or tap) hotspots explaining each feature. */
export function InteractiveSession() {
  const [active, setActive] = useState<string | null>(null);
  const current = hotspots.find((h) => h.id === active) ?? null;

  return (
    <section className="border-t border-hairline bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">Teleoperation</div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Full control, <span className="text-gradient">from anywhere</span>
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="mt-5 text-base leading-7 text-white/60">
              <span className="hidden md:inline">Hover over</span>
              <span className="md:hidden">Tap</span> the red dots to learn about each feature.
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={140} className="mt-10">
          <HudFrame>
            <div
              className="relative overflow-visible rounded-2xl border border-white/10 bg-black shadow-glow"
              onMouseLeave={() => setActive(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                // Upscaled original, kept lossless: the UI details are the point of this section.
                src="/platform/teleop-session.webp"
                width={4096}
                height={2167}
                loading="lazy"
                decoding="async"
                alt="A CTRL+R teleoperation session: live robot camera, connection stats, minimap, and movement controls"
                className="block h-auto w-full rounded-2xl"
              />

              {hotspots.map((h) => {
                const isActive = active === h.id;
                // Keep the popup inside the image: open leftward on the right side, upward near the bottom.
                const openLeft = h.x > 60;
                const openUp = h.y > 62;
                return (
                  <div
                    key={h.id}
                    className={cn("absolute", isActive ? "z-30" : "z-10")}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <button
                      type="button"
                      aria-label={h.title}
                      aria-expanded={isActive}
                      onMouseEnter={() => setActive(h.id)}
                      onFocus={() => setActive(h.id)}
                      onClick={() => setActive(isActive ? null : h.id)}
                      className="group relative -translate-x-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full ring-premium md:h-8 md:w-8"
                    >
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full bg-[var(--accent)]/40",
                          // On a phone-sized image twelve pulsing halos crowd the screenshot.
                          isActive ? "bg-[var(--accent)]/30" : "hidden md:block md:animate-ping",
                        )}
                      />
                      <span
                        className={cn(
                          "relative h-3 w-3 rounded-full border-2 border-white bg-[var(--accent)] shadow-[0_0_12px_rgba(201,0,7,0.9)] transition md:h-3.5 md:w-3.5",
                          isActive && "scale-125",
                        )}
                      />
                    </button>

                    {isActive && (
                      <div
                        role="tooltip"
                        className={cn(
                          "pointer-events-none absolute hidden w-max max-w-64 rounded-xl border border-white/15 bg-black/90 p-4 shadow-2xl backdrop-blur-md md:block",
                          openLeft ? "right-5" : "left-5",
                          openUp ? "bottom-5" : "top-5",
                        )}
                      >
                        <div className="text-sm font-semibold text-white">{h.title}</div>
                        {h.desc && <p className="mt-1.5 text-xs leading-5 text-white/70">{h.desc}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </HudFrame>
        </Reveal>

        {/* Phones: the popup would cover most of the image, so the details show below it instead. */}
        <div className="mt-4 min-h-[88px] rounded-xl border border-white/10 bg-white/[0.03] p-4 md:hidden" aria-live="polite">
          {current ? (
            <>
              <div className="text-sm font-semibold text-white">{current.title}</div>
              {current.desc && <p className="mt-1.5 text-sm leading-6 text-white/65">{current.desc}</p>}
            </>
          ) : (
            <p className="text-sm leading-6 text-white/50">Tap the red dots on the screen above to learn about each feature.</p>
          )}
        </div>
      </div>
    </section>
  );
}
