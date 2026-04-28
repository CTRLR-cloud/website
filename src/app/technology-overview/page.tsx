import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { FocusOnWhatMattersSection } from "@/components/FocusOnWhatMattersSection";
import { CommandHQ } from "@/components/CommandHQ";
import { SITE_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Discover the architecture and capabilities that power CTRL+R.",
};

export default function TechnologyOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero - same style as Research, News, Careers */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Technology
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Technology Overview
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Discover the architecture and capabilities that power CTRL+R.
                </p>
              </Reveal>
              <Reveal delayMs={140}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={SITE_LINKS.DEMO}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 ring-premium"
                  >
                    Book a Demo
                  </a>
                  <a
                    href={SITE_LINKS.GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white ring-premium"
                  >
                    GitHub
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <CommandHQ />
        <FocusOnWhatMattersSection compactTop />

       
        <section className="border-t border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <div className="text-xs tracking-[0.18em] uppercase text-white/45">
                CTRL+R Vision
              </div>
            </Reveal>
            <Reveal delayMs={100} className="mt-6 bg-card-2 rounded-3xl p-7 shadow-glow">
              <p className="text-base leading-7 text-white/80">
                <em>
                  ''Our vision is to become the industry standard for robot operation. By making it easy for teams across industries to use, we can help scale the evolution of robotics technology and advance the human race.
                  ''
                </em>{" "}
                <span className="text-white/55">- Mack Lorden, Founder & CEO</span>
              </p>
            </Reveal>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
