import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const offers = [
  {
    eyebrow: "Robotics companies (OEMs)",
    title: "Ship every robot with an operations platform",
    points: [
      "Use CTRL+R internally to test, support, and operate your robots",
      "White-label it so your customers get fleet operations on day one",
      "Skip building and maintaining your own operator software",
    ],
  },
  {
    eyebrow: "Distributors & solution providers",
    title: "Offer one platform with every robot you sell",
    points: [
      "Add CTRL+R alongside the hardware for each customer",
      "Support mixed fleets from different manufacturers in one place",
      "Manage every customer account from a single view",
    ],
  },
];

export function RoboticsCompaniesSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">
              For robotics companies & distributors
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sell more robots. <span className="text-gradient">Support them with less.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {offers.map((offer, i) => (
            <Reveal key={offer.eyebrow} delayMs={100 + i * 60}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-xs tracking-[0.18em] uppercase text-[var(--accent)]">
                  {offer.eyebrow}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">{offer.title}</h3>
                <ul className="mt-5 space-y-3">
                  {offer.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-white/65">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={220}>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
            >
              Talk to us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
