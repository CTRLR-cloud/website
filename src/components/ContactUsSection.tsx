"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type JoinPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export function ContactUsSection({ className }: { className?: string }) {
  const [form, setForm] = useState<JoinPayload>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.message.trim().length > 0
    );
  }, [form.email, form.firstName, form.lastName, form.message]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok: boolean; error?: string } | null =
        await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong while submitting the form.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

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
              If your business uses robots (or wants to), reach out to us about trying CTRL+R risk-free. If you don't feel that we've saved you a significant amount of time, money, and efficiency, you pay nothing. Simple as that.
              
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="bg-card-2 rounded-3xl p-6 shadow-glow">
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs text-white/55">First Name</span>
                    <input
                      className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, firstName: e.target.value }))
                      }
                      autoComplete="given-name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs text-white/55">Last Name</span>
                    <input
                      className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, lastName: e.target.value }))
                      }
                      autoComplete="family-name"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Email</span>
                  <input
                    className="h-11 rounded-2xl border border-hairline bg-black/35 px-4 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Message</span>
                  <textarea
                    className="min-h-[130px] resize-y rounded-2xl border border-hairline bg-black/35 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none ring-premium"
                    placeholder="Leave us a message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                  />
                </label>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs">
                    {status === "success" ? (
                      <span className="text-[var(--accent)]">
                        Thank you! Your submission has been received!
                      </span>
                    ) : status === "error" ? (
                      <span className="text-white/70">
                        {error ?? "Oops! Something went wrong while submitting the form."}
                      </span>
                    ) : (
                      <span className="text-white/30">
                        We'll reply to your email as soon as possible.
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || status === "loading" || status === "success"}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium",
                      "btn-primary",
                      (!canSubmit || status === "loading" || status === "success") &&
                        "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {status === "loading" ? "Sending…" : "Send Message"}
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
