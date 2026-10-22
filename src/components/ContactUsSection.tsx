import { cn } from "@/lib/cn";
import { SITE_LINKS } from "@/config/links";

// Messages go by email until the new backend can receive form submissions.
export function ContactUsSection({ className }: { className?: string }) {
  return (
    <section
      id="contact"
      className={cn("scroll-mt-24 border-t border-hairline bg-section", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="text-xs tracking-[0.18em] uppercase text-white/45">
              Try It Risk-Free
            </div>
            <h2 className="mt-4 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let CTRL+R{" "}
              <span className="text-[var(--accent)]">modernize</span> your business, risk-free
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              If your business uses robots (or wants to), reach out to us about trying CTRL+R risk-free. If you don&apos;t feel that we&apos;ve saved you a significant amount of time, money, and efficiency after using CTRL+R, you pay nothing. Simple as that.
              
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="bg-card-2 rounded-3xl p-6 sm:p-8 shadow-glow">
              <p className="text-lg font-semibold text-white">Talk to our team</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Tell us about your robots and what you want them to do. We&apos;ll reply as soon as
                possible.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${SITE_LINKS.EMAIL}`}
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
                >
                  Email {SITE_LINKS.EMAIL}
                </a>
                <a
                  href={SITE_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                >
                  Book a call
                </a>
              </div>
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-sm font-semibold text-white">Want to join the team?</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  We&apos;re always looking for great talent. Send your resume/CV to{" "}
                  <a
                    href={`mailto:${SITE_LINKS.EMAIL}?subject=Resume%20%2F%20CV`}
                    className="text-white underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {SITE_LINKS.EMAIL}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
