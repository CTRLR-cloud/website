import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ContactUsSection } from "@/components/ContactUsSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach CTRL+R about teleoperation, partnerships, or trying the platform.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Contact
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Contact Us
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Questions about CTRL+R, partnerships, or trying the platform? Send us
                  a message—we typically reply within a few business days.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <ContactUsSection className="border-t-0" />
      </main>

      <SiteFooter />
    </div>
  );
}
