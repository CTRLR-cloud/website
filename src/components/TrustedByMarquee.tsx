import Link from "next/link";
import { cn } from "@/lib/cn";

const INCEPTION_URL = "https://www.nvidia.com/en-us/startups/";

/**
 * Static trust banner — NVIDIA Inception membership (replaces logo marquee).
 */
export function TrustedByMarquee({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "border-t border-b border-hairline bg-black/95 overflow-hidden",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-8 md:py-6">
        <p className="text-center text-sm font-medium tracking-[0.2em] text-white/50 sm:text-left">
          PROUD MEMBER
        </p>
        <Link
          href={INCEPTION_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nvidia-inception-program-badge-rgb-for-screen.png"
            alt="NVIDIA Inception Program"
            className="h-16 w-auto sm:h-20 md:h-24"
          />
        </Link>
      </div>
    </section>
  );
}
