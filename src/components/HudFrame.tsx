import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const corners = [
  "-left-2.5 -top-2.5 border-l border-t rounded-tl-md",
  "-right-2.5 -top-2.5 border-r border-t rounded-tr-md",
  "-left-2.5 -bottom-2.5 border-l border-b rounded-bl-md",
  "-right-2.5 -bottom-2.5 border-r border-b rounded-br-md",
];

/** Viewfinder-style corner brackets around a product video or screenshot, echoing the operator UI. */
export function HudFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {corners.map((c) => (
        <span
          key={c}
          aria-hidden
          className={cn("pointer-events-none absolute h-5 w-5 border-[var(--accent)]/70 md:h-6 md:w-6", c)}
        />
      ))}
    </div>
  );
}
