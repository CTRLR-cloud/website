"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { SITE_ASSETS } from "@/config/assets";

/** Display heights; lockup 2680×1852; symbol 3046×2042 (`w-auto` preserves aspect). */
const sizeConfig = {
  default: { className: "h-7 w-auto", sizes: "120px" },
  large: { className: "h-16 w-auto", sizes: "240px" },
  xl: {
    className: "h-36 w-auto sm:h-40 md:h-48 lg:h-52",
    sizes: "(max-width: 640px) 360px, (max-width: 1024px) 420px, (max-width: 1280px) 520px, 600px",
  },
  footer: {
    className: "h-14 w-auto min-[400px]:h-16 sm:h-[4.25rem] md:h-[4.75rem]",
    sizes: "(max-width: 400px) 260px, (max-width: 640px) 300px, (max-width: 1024px) 340px, 380px",
  },
};

export function CtrlRLogo({
  className,
  wordmark = false,
  variant = "mark",
  size = "default",
}: {
  className?: string;
  /** Lockup already includes the wordmark; when true, uses a larger size (e.g. mobile menu). */
  wordmark?: boolean;
  /** `symbol` = CR mark only for the top nav; `footer` = lockup in footer. */
  variant?: "mark" | "footer" | "symbol";
  size?: "default" | "large" | "xl";
}) {
  const effectiveSize = wordmark ? "large" : size;
  const useSymbol = variant === "symbol";
  const config =
    variant === "footer" ? sizeConfig.footer : sizeConfig[effectiveSize];

  const src = useSymbol ? SITE_ASSETS.LOGO_SYMBOL : SITE_ASSETS.LOGO_MARK;
  const width = useSymbol ? 3046 : 2680;
  const height = useSymbol ? 2042 : 1852;

  return (
    <div className={cn("inline-flex items-center gap-2 bg-transparent", className)}>
      <Image
        src={src}
        alt="CTRL+R"
        width={width}
        height={height}
        className={cn("object-contain bg-transparent", config.className)}
        sizes={config.sizes}
        priority
      />
    </div>
  );
}
