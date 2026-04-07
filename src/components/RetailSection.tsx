"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

const RETAIL_DEMO_VIDEO_MP4 = "/Final-retail-demo.mp4";
const RETAIL_DEMO_POSTER = "/Command-HQ-multiview.png";

function RetailDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useImageFallback, setUseImageFallback] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || useImageFallback) return;
    void el.play().catch(() => {});
  }, [useImageFallback]);

  if (useImageFallback) {
    return (
      <SmartImage
        src={RETAIL_DEMO_POSTER}
        alt="Retail operations interface"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover object-bottom"
      poster={RETAIL_DEMO_POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Retail robot operations demo"
      onError={() => setUseImageFallback(true)}
    >
      <source src={RETAIL_DEMO_VIDEO_MP4} type="video/mp4" />
    </video>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const features = [
  {
    icon: IconGlobe,
    title: "Remote Robot Control",
    desc: "Operate any robot in any retail location from anywhere with real-time video streaming and precise control inputs.",
  },
  {
    icon: IconBolt,
    title: "Deploy in Minutes",
    desc: "Operate robots remotely across stores, eliminating travel and reducing operational overhead.",
  },
  {
    icon: IconShield,
    title: "Data Security",
    desc: "End-to-end encryption and customizable video controls ensure that only relevant data is being shared in each session.",
  },
  {
    icon: IconTarget,
    title: "Point, Click, Audit",
    desc: "Load in-store locations and complete audits in just a few clicks. No training required.",
  },
];

export function RetailSection({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className={cn("relative border-t border-hairline bg-black", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,0,7,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-white/55 mb-4">
              Introducing
            </p>
          </Reveal>
          <Reveal delayMs={40}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              A New Standard For Retail
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mt-5 text-white/50 text-lg leading-relaxed">
            Replace manual store audits with remote robot operations. Brands save time and money, while retailers generate new revenue streams.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Mobile/tablet: image first, then bullets. Desktop unchanged. */}
          <div className="order-2 lg:order-none lg:col-span-2 space-y-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delayMs={120 + i * 40}>
                <div className="group flex gap-4 p-4 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] grid place-items-center">
                    <feature.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={200} className="order-1 lg:order-none lg:col-span-3">
            <motion.div className="relative" style={{ y }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                <div className="relative aspect-[16/10]">
                  <RetailDemoVideo />
                  {/* Top ~30% only — keeps bottom 70% of the frame fully clear */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent"
                    aria-hidden
                  />
                </div>

                {/* <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-white/70">Connected</span>
                    </div>
                    <div className="flex gap-3 text-white/50 text-xs font-mono">
                      <span>200ms</span>
                      <span>60fps</span>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl border border-white/[0.08] bg-black/90 backdrop-blur-sm">
                <p className="text-xl font-semibold text-white">99.9%</p>
                <p className="text-xs text-white/40">Uptime</p>
              </div> */}
            </motion.div>
          </Reveal>
        </div>

        <Reveal delayMs={280}>
          <div className="mt-16 flex flex-wrap gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white font-medium text-sm hover:brightness-110 transition shadow-[0_0_24px_color-mix(in_oklab,var(--accent)_40%,transparent)]"
            >
              See How It Works
              <span className="text-white/70">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
