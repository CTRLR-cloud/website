import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CTRL+R handles your data: no collection without permission, end-to-end encrypted client streams, and a security-first approach.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Legal
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Privacy Policy
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  CTRL+R is built on trust. We do not collect your data without your clear
                  permission, and our client uses end-to-end encryption for your streams.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline bg-section">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 space-y-12 text-white/80">
            <Reveal>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Your consent matters
                </h2>
                <p className="text-sm leading-7 md:text-base md:leading-8">
                  We do not collect personal or usage data without your permission. When we
                  ask for information—such as through a contact form, signup flow, or optional
                  analytics—it is only with your knowledge and agreement, and we use it for the
                  purpose we describe at the time.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={40}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  CTRL+R client &amp; encryption
                </h2>
                <p className="text-sm leading-7 md:text-base md:leading-8">
                  Anyone using the CTRL+R client benefits from{" "}
                  <strong className="font-semibold text-white/95">
                    end-to-end encrypted streams
                  </strong>
                  . That means your operational video and related session data are protected in
                  transit with modern encryption so that only intended parties can access them—we
                  design the system so your sessions are not exposed in the clear on the network.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  This website
                </h2>
                <p className="text-sm leading-7 md:text-base md:leading-8">
                  Browsing this site may involve standard technical data your browser sends
                  (such as IP address and basic request metadata) as needed to deliver pages
                  securely. We do not use that to profile you without appropriate notice and
                  choice where required. If we use cookies or similar technologies for anything
                  beyond essential site function, we will make that clear and ask where the law
                  requires it.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Security
                </h2>
                <p className="text-sm leading-7 md:text-base md:leading-8">
                  We take security seriously. Our products and infrastructure are designed with
                  strong safeguards, encryption where it matters, and ongoing attention to
                  protecting your information and your operations.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Questions
                </h2>
                <p className="text-sm leading-7 md:text-base md:leading-8">
                  For privacy-related questions,{" "}
                  <Link
                    href="/contact"
                    className="text-[var(--accent)] hover:underline underline-offset-4 ring-premium rounded"
                  >
                    contact us
                  </Link>
                  . We may update this policy from time to time; the effective date below will
                  change when we do.
                </p>
                <p className="text-xs text-white/40 pt-4">
                  Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
