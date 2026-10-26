import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "World-class engineers and operators building the future of robotics.",
};

type TeamMember = {
  name: string;
  role: string;
  /** Short points, as in the pitch deck. */
  bio: string[];
  imageSrc?: string;
};

const team: TeamMember[] = [
  {
    name: "Mack Lorden",
    role: "Cofounder & CEO",
    bio: [
      "Former 7-figure founder",
      "Scaled a GPU compute product to $40M revenue in six months",
      "Owns sales, marketing, and commercial",
    ],
    imageSrc: "/team/mack-lorden.jpg",
  },
  {
    name: "Michael Hart",
    role: "Lead Robotics Engineer",
    bio: ["Former senior robotics engineer at Amazon", "Built the CTRL+R agent running today"],
    imageSrc: "/team/michael-hart.jpg",
  },
  {
    name: "Kenneth Fox",
    role: "UX/UI Engineer",
    bio: [
      "Over a decade of full-stack engineering and UX/UI design",
      "Owns the product's experience and interface",
    ],
    imageSrc: "/team/kenneth-fox.jpg",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero - same style as News */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Team
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Meet Our Team
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  World-class engineers and operators building the future of robotics.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <h2 className="text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Our Team
              </h2>
            </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal
                key={m.name}
                delayMs={60 + i * 60}
                className="overflow-hidden rounded-3xl border border-hairline bg-black/35"
              >
                {m.imageSrc ? (
                  // Photos are pre-cropped square with every face at the same size and height.
                  <div className="relative aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.imageSrc}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-[radial-gradient(900px_420px_at_80%_25%,rgba(201,0,7,0.12),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.2))]" />
                )}

                <div className="p-6">
                  <div className="text-base font-semibold text-white">{m.name}</div>
                  <div className="mt-1 text-xs tracking-[0.18em] uppercase text-white/45">
                    {m.role}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {m.bio.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-6 text-white/60">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
