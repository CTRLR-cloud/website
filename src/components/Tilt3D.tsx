"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number; // degrees of max rotation (default 8)
  perspective?: number; // px (default 800)
  scale?: number; // hover scale (default 1.02)
  glare?: boolean; // show glare overlay (default true)
};

export function Tilt3D({
  children,
  className,
  style,
  intensity = 8,
  perspective = 800,
  scale = 1.02,
  glare = true,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        el.style.transform = `perspective(${perspective}px) rotateX(${-dy * intensity}deg) rotateY(${dx * intensity}deg) scale3d(${scale},${scale},${scale})`;

        if (glareRef.current) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          const dist = Math.sqrt(dx * dx + dy * dy);
          glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${Math.min(dist * 0.18, 0.22)}) 0%, transparent 80%)`;
          glareRef.current.style.opacity = "1";
        }
      });
    },
    [intensity, perspective, scale],
  );

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.45s cubic-bezier(0.03,0.98,0.52,0.99)",
        willChange: "transform",
        position: "relative",
        ...style,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.35s ease",
            mixBlendMode: "overlay",
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}
