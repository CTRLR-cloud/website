"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

export function RetailOperationsSection() {
  const reduce = useReducedMotion();
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contact = document.getElementById("contact");
    if (!contact) return;
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section className="border-t border-hairline bg-section">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="space-y-10">
          <div className="max-w-4xl">
            <Reveal>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Retail operations
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Turn every store into a {" "}
                <span className="text-gradient">high-performance operation</span>
              </h2>
            </Reveal>
            <Reveal delayMs={110}>
              <p className="mt-5 text-sm leading-7 text-white/60 max-w-3xl">
                Give operators one clear control panel for every location. Track what is selling—and where,
                optimize picking routes, and automate recurring retail workflows with AI task
                managers powered by computer vision.
              </p>
            </Reveal>
            <Reveal delayMs={150}>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white">Sales visibility</div>
                  <p className="mt-2 text-xs leading-6 text-white/60">
                    Identify where products move fastest and where shelves need attention.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white">Smarter picking routes</div>
                  <p className="mt-2 text-xs leading-6 text-white/60">
                    Reduce wasted travel time with route planning that improves fulfillment speed.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white">AI task managers</div>
                  <p className="mt-2 text-xs leading-6 text-white/60">
                    Automate high-volume checks and alerts with computer-vision-driven workflows.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
                >
                  Get in touch
                </a>
                <Link
                  href="/technology-overview"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                >
                  Explore technology
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={100}>
            <motion.div
              className="relative overflow-hidden rounded-[28px] border border-hairline bg-black/40 p-4 md:p-6 shadow-glow"
              animate={
                reduce
                  ? undefined
                  : { y: [0, -6, 0], transition: { duration: 7, repeat: Infinity } }
              }
            >
              <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(900px_380px_at_80%_20%,rgba(201,0,7,0.10),transparent_60%)]" />
              <div className="relative">
                <div className="mb-3 text-xs tracking-[0.22em] uppercase text-white/45">
                  Operator cockpit for multi-site businesses
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/CommandHQ-Retail-Sites.png"
                    alt="Retail control panel showing multiple store sites and operations in one dashboard"
                    className="mx-auto w-full max-w-[1024px] h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
