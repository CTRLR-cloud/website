import { cn } from "@/lib/cn";

/**
 * Submits via Fast Mode (`/_forms/contact`). Configure a form named `contact` in the Fast Mode
 * dashboard with fields: first_name, last_name, email, message. Static export has no `/api/join`.
 */
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
              <span className="text-[var(--accent)]">scale your business</span> risk-free
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              If your business uses robots (or wants to), reach out to us about trying CTRL+R
              risk-free. If you don&apos;t feel that we&apos;ve saved you a significant amount of
              time, money, and efficiency, you pay nothing. Simple as that.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="bg-card-2 rounded-3xl p-6 shadow-glow">
              <form
                action="/_forms/contact"
                method="POST"
                data-form-name="contact"
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs text-white/55">First Name</span>
                    <input
                      name="first_name"
                      required
                      className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                      placeholder="First name"
                      autoComplete="given-name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs text-white/55">Last Name</span>
                    <input
                      name="last_name"
                      required
                      className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                      placeholder="Last name"
                      autoComplete="family-name"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                    placeholder="Email"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Message</span>
                  <textarea
                    name="message"
                    required
                    className="min-h-[130px] resize-y rounded-2xl border border-hairline bg-black/35 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                    placeholder="Leave us a message"
                  />
                </label>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-white/30">
                    We&apos;ll reply to your email as soon as possible.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
