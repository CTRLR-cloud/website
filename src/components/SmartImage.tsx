"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackSrc?: string;
  /** Forwarded to the underlying `<img>` (e.g. `{ objectPosition: "right 42%" }` with `object-cover`) */
  style?: CSSProperties;
};

export function SmartImage({ src, alt, className, fallbackClassName, fallbackSrc, style }: Props) {
  const [broken, setBroken] = useState(false);
  const [fallbackBroken, setFallbackBroken] = useState(false);
  const [seenSrc, setSeenSrc] = useState(src);

  if (src !== seenSrc) {
    setSeenSrc(src);
    setBroken(false);
    setFallbackBroken(false);
  }

  // A cached failure is already complete when the node mounts, so onError never fires.
  // Defer the update: setState inside the ref runs while React is still hydrating.
  const noteCachedFailure = useCallback((el: HTMLImageElement | null) => {
    if (!el || !el.complete || el.naturalWidth !== 0) return;
    queueMicrotask(() => setBroken(true));
  }, []);

  if (broken && fallbackSrc && !fallbackBroken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackSrc}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
        referrerPolicy="no-referrer"
        onError={() => setFallbackBroken(true)}
      />
    );
  }

  if (broken || !src) {
    return (
      <div
        className={cn(
          "h-full w-full bg-[radial-gradient(900px_420px_at_80%_25%,rgba(201,0,7,0.10),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.1))]",
          fallbackClassName,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={noteCachedFailure}
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  );
}
