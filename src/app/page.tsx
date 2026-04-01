import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { CtrlRLogo } from "@/components/CtrlRLogo";
import { JoinNetworkSection } from "@/components/JoinNetworkSection";
import { SITE_LINKS } from "@/config/links";
import { PageIntro } from "@/components/PageIntro";
import { ParallaxTextSection } from "@/components/ParallaxTextSection";
import { TrustedByMarquee } from "@/components/TrustedByMarquee";
import { StoriesSection } from "@/components/StoriesSection";
import { getCachedStories } from "@/lib/roboticsFeeds";
import { PremiumShowcaseSection } from "@/components/PremiumShowcaseSection";
import { UseCasesHorizontalScrollSection } from "@/components/UseCasesHorizontalScrollSection";
import { HowItWorks } from "@/components/HowItWorks";
import { NumbersSection } from "@/components/NumbersSection";
import { WhyBuildersChooseSection } from "@/components/WhyBuildersChooseSection";
import { CommandHQ } from "@/components/CommandHQ";
import { DiscoverNewParadigm } from "@/components/DiscoverNewParadigm";
import { TeleoperationSection } from "@/components/TeleoperationSection";
import { SITE_ASSETS } from "@/config/assets";

export default async function Home() {
  const stories = await getCachedStories();

  return (
    <div className="min-h-screen flex flex-col">
      <PageIntro />
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero — photo + ruby glow, engineering grid (brand-aligned) */}
        <section className="relative overflow-hidden border-b border-hairline min-h-[72vh] flex items-center">
          <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={SITE_ASSETS.HERO_BACKGROUND}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Readability: darken, vignette, subtle brand wash */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_0%,rgba(0,0,0,0.55),transparent_58%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] mix-blend-multiply opacity-90"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 ctrlr-hero-glow opacity-45" aria-hidden />
          <div className="pointer-events-none absolute inset-0 ctrlr-hero-grid opacity-[0.2]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" aria-hidden />
          <div className="pointer-events-none absolute -right-32 top-1/4 h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent)_0%,transparent_68%)] blur-3xl opacity-45" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36 w-full">
            <Reveal className="flex justify-center">
              {/* Glow follows logo alpha only — transparent PNG sits clean on the hero */}
              <div
                className="inline-block"
                style={{
                  filter:
                    "drop-shadow(0 0 36px rgba(201,0,7,0.45)) drop-shadow(0 0 80px rgba(201,0,7,0.2))",
                }}
              >
                <CtrlRLogo size="xl" />
              </div>
            </Reveal>

            <div className="mt-10 text-center">
              <Reveal delayMs={60}>
                <h1 className="text-premium text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl">
                  Robot Operation, <span className="text-gradient whitespace-nowrap">at Scale.</span>
                </h1>
              </Reveal>
              <Reveal delayMs={110}>
                <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed tracking-wide text-white/80 sm:mt-6 sm:text-xl">
                  One Platform. Any Robot. Total Control.
                </p>
              </Reveal>

              <Reveal
                delayMs={200}
                className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href={SITE_LINKS.APP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
                >
                  Launch App
                </a>
                <a
                  href={SITE_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                >
                  Book a Demo
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <TrustedByMarquee />
        <DiscoverNewParadigm />
        <TeleoperationSection />
        <WhyBuildersChooseSection />
        <CommandHQ />
        <HowItWorks />
        <UseCasesHorizontalScrollSection />
        <PremiumShowcaseSection />
        
        
        <ParallaxTextSection />
        

        {/* <AccessBentoSection /> */}

        

{/*
        <section className="border-t border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <h2 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Building The <span className="text-gradient">Global Robot Economy</span>
              </h2>
            </Reveal>
            <Reveal delayMs={120} className="mt-10">
              <div className="bg-card-2 rounded-3xl p-4 shadow-glow">
                <SmartImage
                  src={ROADMAP_IMG}
                  alt="CTRL+R roadmap"
                  className="w-full rounded-2xl border border-hairline"
                />
              </div>
            </Reveal>
          </div>
        </section>
*/}
        <NumbersSection />
        <StoriesSection stories={stories} />

        {/* <HorizontalRailAutoSection /> */}
        
        <JoinNetworkSection />
      </main>

      <SiteFooter />
    </div>
  );
}
