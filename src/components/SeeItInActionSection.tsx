"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";
import { HudFrame } from "@/components/HudFrame";

type IconProps = { className?: string };

function IconGlobe({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconTarget({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconDevices({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <path d="M6 18h6M9 14v4" />
      <rect x="18" y="8" width="4" height="10" rx="1" />
    </svg>
  );
}

function IconLayers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}

function IconGrowth({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

type Feature = { icon: (props: IconProps) => React.ReactElement; title: string; desc: string };

type Showcase = {
  id: string;
  eyebrow: string;
  title: string;
  video: string;
  poster: string;
  videoLabel: string;
  /** Tailwind aspect class matching the video's frame. */
  aspect: string;
  features: Feature[];
};

const showcases: Showcase[] = [
  {
    id: "monitor",
    eyebrow: "Monitor",
    title: "See your entire fleet, live",
    // 1:10 to 1:50 of "Eagle Eye demo.mp4", cropped to the app window (1400×720).
    video: "/eagle-eye-demo.mp4",
    poster: "/eagle-eye-demo-poster.jpg",
    videoLabel: "CTRL+R Eagle Eye: every robot on a live map with its camera feed",
    aspect: "aspect-[1400/720]",
    features: [
      {
        icon: IconDevices,
        title: "Your whole fleet on one screen",
        desc: "Every site, every device, every live feed: robots, drones, CCTV cameras, lidar and radar, sensors, and more.",
      },
      {
        icon: IconLayers,
        title: "Switch between view modes",
        desc: "Move between a 3D map, sensor-fused views, each robot's point of view, or a grid of live feeds.",
      },
      {
        icon: IconGrowth,
        title: "Scales with your operation",
        desc: "Easily add new sites, devices, and team members as the operation scales. Each new robot type is integrated once, then works for every site.",
      },
    ],
  },
  {
    id: "operate",
    eyebrow: "Operate",
    title: "Take control from anywhere",
    // "CTRL+R Retail video (sped up).mp4" (a real robot in a store), then
    // "Remote Teleop (website versino).mp4" (Location mode and minimap); team name blurred.
    video: "/operate-demo.mp4",
    poster: "/operate-demo-poster.jpg",
    videoLabel: "CTRL+R teleoperation: driving a real robot through a store, then sending a robot to a saved location",
    aspect: "aspect-[1400/720]",
    features: [
      {
        icon: IconGlobe,
        title: "Remote robot control",
        desc: "Remotely operate real robots at any site using custom controllers or built-in browser controls like a joystick, keyboard, or preset map locations.",
      },
      {
        icon: IconTarget,
        title: "Point, click, go",
        desc: "No training required—send a robot to a saved location in one click and follow its beacon on the minimap.",
      },
      {
        icon: IconShield,
        title: "Data security",
        desc: "Every session is encrypted end-to-end, and video controls ensure only relevant data is shared.",
      },
    ],
  },
];

function DemoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="absolute bottom-3 right-3 z-10 inline-flex items-center rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm ring-premium"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
}

function ShowcaseRow({ showcase, reverse }: { showcase: Showcase; reverse: boolean }) {
  // Phones: heading, then video, then features, so each video sits under its own heading.
  // Desktop: video in the wider column spanning both rows, heading and features in the narrower one,
  // alternating sides. On wide screens the video also reaches past the content edge on its side.
  const textCol = reverse ? "lg:col-start-1" : "lg:col-start-9";
  const videoCol = reverse ? "lg:col-start-5 xl:-mr-12 2xl:-mr-20" : "lg:col-start-1 xl:-ml-12 2xl:-ml-20";
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
      <div className={cn("lg:col-span-4 lg:row-start-1 lg:self-end", textCol)}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-text)]">
            {showcase.eyebrow}
          </p>
        </Reveal>
        <Reveal delayMs={40}>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {showcase.title}
          </h3>
        </Reveal>
      </div>

      <Reveal
        delayMs={80}
        className={cn("lg:col-span-8 lg:row-span-2 lg:row-start-1 lg:self-center", videoCol)}
      >
        <HudFrame>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black shadow-glow">
            <div className={cn("relative", showcase.aspect)}>
              <DemoVideo src={showcase.video} poster={showcase.poster} label={showcase.videoLabel} />
            </div>
          </div>
        </HudFrame>
      </Reveal>

      <ul className={cn("space-y-2 lg:col-span-4 lg:row-start-2 lg:mt-6 lg:self-start", textCol)}>
        {showcase.features.map((feature, i) => (
          <li key={feature.title}>
            <Reveal delayMs={100 + i * 40}>
              <div className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-white/[0.02]">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.04]">
                  <feature.icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-white">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-white/50">{feature.desc}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The two core product videos: monitoring the fleet, then stepping in to operate a robot. */
export function SeeItInActionSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative", className)}>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div id="see-it-in-action" className="mb-16 max-w-4xl scroll-mt-16">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/55">See it in action</p>
          </Reveal>
          <Reveal delayMs={40}>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Full visibility. <span className="text-gradient">Full control.</span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-28">
          {showcases.map((showcase, i) => (
            <ShowcaseRow key={showcase.id} showcase={showcase} reverse={i % 2 === 1} />
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-16 flex flex-wrap gap-3">
            <a
              href="/platform"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_color-mix(in_oklab,var(--accent)_40%,transparent)] transition hover:brightness-110"
            >
              See how it works
              <span className="text-white/70">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
