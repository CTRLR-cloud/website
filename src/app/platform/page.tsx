import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { CommandHQ } from "@/components/CommandHQ";
import { InteractiveSession } from "@/components/InteractiveSession";
import { ContactUsSection } from "@/components/ContactUsSection";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Operate, monitor, and manage every robot, drone, camera, and sensor across every site from one browser.",
};

const security = [
  {
    title: "Encrypted sessions",
    desc: "End-to-end encryption for video, audio, and control in every session.",
  },
  {
    title: "No open ports",
    desc: "Robots connect outbound only. Nothing on your network has to be exposed to the internet.",
  },
  {
    title: "Role-based access",
    desc: "Decide who can view, operate, or manage each robot, and suspend access instantly.",
  },
  {
    title: "Full audit trail",
    desc: "Who operated what, when, and from where, recorded for every session.",
  },
];

const deployments = [
  {
    title: "Cloud",
    desc: "The fastest way to start. We host and manage the platform for you.",
  },
  {
    title: "On-premises",
    desc: "Deploy CTRL+R on your own infrastructure, inside your own network, so data never leaves your site or country.",
  },
];

function CardGrid({
  items,
  columns,
}: {
  items: { title: string; desc: string }[];
  columns: string;
}) {
  return (
    <div className={`mt-10 grid gap-4 ${columns}`}>
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delayMs={80 + i * 40}
          className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="text-base font-semibold text-white">{item.title}</div>
          <p className="mt-2 text-sm leading-6 text-white/60">{item.desc}</p>
        </Reveal>
      ))}
    </div>
  );
}

function SectionIntro({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="text-xs tracking-[0.22em] uppercase text-white/55">{eyebrow}</div>
      </Reveal>
      <Reveal delayMs={60}>
        <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delayMs={100}>
        <p className="mt-5 text-base leading-7 text-white/60">{desc}</p>
      </Reveal>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        <CommandHQ headingLevel="h1" />

        <InteractiveSession />

        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionIntro
              eyebrow="Security"
              title="Built for sensitive operations"
              desc="Robots, cameras, and the people operating them are protected at every step."
            />
            <CardGrid items={security} columns="sm:grid-cols-2 lg:grid-cols-4" />
            <div className="mt-8">
              <Link
                href="/docs/security"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
              >
                Read the security docs <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionIntro
              eyebrow="Deployment"
              title="Deploy it where your operation needs it"
              desc="Built in Dubai and serving the UAE and GCC, with deployment options for every kind of organization."
            />
            <CardGrid items={deployments} columns="md:grid-cols-2" />
          </div>
        </section>

        <ContactUsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
