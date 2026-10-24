import { cn } from "@/lib/cn";
import { SITE_LINKS } from "@/config/links";

// Messages go by email until the new backend can receive form submissions.
export function ContactUsSection({ className }: { className?: string }) {
  return (
    <section
      id="contact"
      className={cn("relative scroll-mt-24", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.22em] uppercase text-white/55">Contact us</div>
          <h2 className="mt-4 text-premium text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Try CTRL+R <span className="text-gradient">risk-free</span>
          </h2>
        </div>

        {/* Two ways in: small fleets sign up and try it; larger or mixed fleets get a free pilot. */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Have a small fleet?
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">Try CTRL+R free</p>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">
              Sign up, connect your robots, and take control from one screen.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_LINKS.CLIENT}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-secondary"
              >
                Try it free
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-[var(--accent)]/40 bg-card-2 p-6 shadow-glow sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Operating at scale?
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">Start with a free pilot</p>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">
              Tell us about your operation. We&apos;ll set goals together and prove the results on
              your own fleet before you commit.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_LINKS.DEMO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
              >
                Book a demo
              </a>
              <a
                href={`mailto:${SITE_LINKS.EMAIL}`}
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-secondary"
              >
                Email {SITE_LINKS.EMAIL}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm leading-6 text-muted">
          Want to join the team? We&apos;re always looking for great talent. Send your resume/CV to{" "}
          <a
            href={`mailto:${SITE_LINKS.EMAIL}?subject=Resume%20%2F%20CV`}
            className="text-white underline underline-offset-4 hover:text-[var(--accent)]"
          >
            {SITE_LINKS.EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
