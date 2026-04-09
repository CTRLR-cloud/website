"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";
import { SITE_LINKS } from "@/config/links";

type Tile = {
  title: string;
  /** Split headline: shadow on white only; gradient span matches Why CTRL+R `text-gradient` */
  titleParts?: { lead: string; gradient: string };
  desc: string;
  /** Optional second paragraph (e.g. line break after first sentence) */
  descParagraph2?: ReactNode;
  image: string;
  href: string;
  cta: string;
  accent: string;
  size: "large" | "medium";
  /** When true, use minimal overlay so the image stays sharp (no blur/fade) */
  minimalOverlay?: boolean;
  hideCta?: boolean;
  /** `object-position` for cover images (medium tiles); use `right` when the subject is on the right */
  imagePosition?: "left" | "center" | "right";
  /**
   * `object-position` for medium tile image (inline, always applied).
   * e.g. `right 48%` = aligned right, vertical anchor tuned for the crop.
   */
  imageObjectPosition?: string;
  /**
   * Shift the image down inside the card clip (taller layer + translateY) so the bottom seam / gap is hidden.
   * e.g. `"8%"` — only use when needed; pairs with overflow-hidden on the image shell.
   */
  imageShiftDown?: string;
  /** When true, card is not a link (no navigation / button affordance) */
  staticCard?: boolean;
};

const tiles: Tile[] = [
  {
    title: "Built for Enterprise Performance",
    titleParts: { lead: "Built for ", gradient: "Enterprise Performance" },
    desc: "CTRL+R is solving a real pain point in robotics today: fragmented, custom-built operator interfaces that don't scale.",
    descParagraph2: (
      <>
        We&apos;re{" "}
        <strong className="font-bold">
          standardizing robot control into one unified operations platform
        </strong>{" "}
        that is intuitive for first-time operators, yet powerful and customizable for advanced
        robotics teams. This approach earned CTRL+R a place in NVIDIA&apos;s Inception Program.
      </>
    ),
    image: "/NVIDIA-CTRLR.jpg",
    href: "/technology-overview",
    cta: "Learn More",
    accent: "rgba(201,0,7,0.25)",
    size: "large",
    minimalOverlay: true,
    hideCta: true,
    staticCard: true,
  },
  {
    title: "Start Operating Your Robot in Minutes",
    desc: "Download the CTRL+R agent to your robot, connect in seconds, and start operating through our interface immediately. No custom integrations. No setup headaches.",
    image: "/Teleop-screenshot.png",
    href: SITE_LINKS.CLIENT,
    cta: "Try It Out",
    accent: "rgba(0,200,150,0.25)",
    size: "medium",
    imagePosition: "right",
    imageObjectPosition: "right 48%",
    imageShiftDown: "9%",
  },
  {
    title: "Deeply Customizable. Infinitely Scalable.",
    desc: "CTRL+R adapts to your entire fleet—across robot types, software stacks, and environments. Customize control systems, integrate existing tools, and extend functionality with a modular, API-driven platform.",
    image: "/software-visualizations.png",
    href: "/technology-overview",
    cta: "View Capabilities",
    accent: "rgba(201,0,7,0.25)",
    size: "medium",
  },
];

/**
 * Medium tiles: paragraph max width = title width.
 * The card stack uses `flex-col` + default stretch, so a raw `h3` was full-width and JS measured the whole card.
 * `self-start` + `inline-block` shrink-wraps the block; we measure the real `h3` box and cap the paragraph.
 */
function MediumTileTitleAndDesc({ title, desc }: { title: string; desc: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleW, setTitleW] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const measure = () => setTitleW(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [title]);

  return (
    <div className="self-start inline-block max-w-full text-left align-top">
      <h3
        ref={titleRef}
        className="inline-block max-w-full text-2xl font-semibold tracking-tight text-white md:text-3xl"
      >
        {title}
      </h3>
      <p
        className="mt-4 max-w-full text-sm leading-7 text-white/85 md:text-base md:leading-relaxed"
        style={titleW != null ? { maxWidth: titleW } : undefined}
      >
        {desc}
      </p>
    </div>
  );
}

export function DiscoverNewParadigm({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                A New Paradigm
              </div>
              <h2 className="mt-3 text-premium text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
                Real-Time Robot Operations{" "}
                <span className="text-gradient"></span>
              </h2>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {tiles.map((tile, i) => {
            const article = (
              <motion.article
                  className={cn(
                    "relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/10",
                    tile.size === "large"
                      ? "bg-black/40 md:flex md:items-stretch min-h-[400px] md:min-h-[520px]"
                      : "h-[480px] md:h-[520px] bg-black",
                  )}
                  whileHover={
                    reduce || tile.staticCard ? undefined : { y: -6, scale: 1.003 }
                  }
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* Mobile only (large tile): stacked image then separate text block — avoids image text conflicting with paragraph */}
                  {tile.size === "large" && (
                    <div className="flex flex-col md:hidden">
                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                        <SmartImage
                          src={tile.image}
                          alt={tile.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="border-t border-white/10 bg-black/95 px-6 py-6">
                        <h3 className="text-premium text-2xl font-semibold leading-[1.05] tracking-tight md:text-3xl">
                          {tile.titleParts ? (
                            <>
                              <span className="text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.88),0_1px_2px_rgba(0,0,0,0.95)]">
                                {tile.titleParts.lead}
                              </span>
                              <span className="text-gradient">{tile.titleParts.gradient}</span>
                            </>
                          ) : (
                            <span className="text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.88),0_1px_2px_rgba(0,0,0,0.95)]">
                              {tile.title}
                            </span>
                          )}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/88 [text-shadow:0_1px_12px_rgba(0,0,0,0.92),0_2px_24px_rgba(0,0,0,0.65)]">
                          {tile.desc}
                        </p>
                        {tile.descParagraph2 && (
                          <p className="mt-3 text-sm leading-7 text-white/88 [text-shadow:0_1px_12px_rgba(0,0,0,0.92),0_2px_24px_rgba(0,0,0,0.65)]">
                            {tile.descParagraph2}
                          </p>
                        )}
                        {!tile.hideCta && (
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                            <span>{tile.cta}</span>
                            <span className="transition group-hover:translate-x-0.5">→</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Desktop large tile: wrapper so image + text only show at md+ (left column image, right column text) */}
                  {tile.size === "large" && (
                    <div className="hidden md:flex md:items-stretch flex-1 w-full min-h-0">
                      <div className="relative w-[55%] shrink-0 overflow-hidden">
                        <SmartImage
                          src={tile.image}
                          alt={tile.title}
                          className={cn(
                            "absolute inset-0 h-full w-full object-cover transition duration-700",
                            !tile.staticCard && "group-hover:scale-[1.04]",
                          )}
                        />
                      </div>
                      <div className="relative flex w-[45%] shrink-0 flex-col justify-center bg-black/95 border-l border-white/10 p-8 md:p-12">
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            background: `radial-gradient(600px 400px at 80% 50%, ${tile.accent}, transparent 50%)`,
                          }}
                        />
                        <div className="relative">
                          <h3 className="text-premium text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
                            {tile.titleParts ? (
                              <>
                                <span className="text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.88),0_1px_2px_rgba(0,0,0,0.95)]">
                                  {tile.titleParts.lead}
                                </span>
                                <span className="text-gradient">{tile.titleParts.gradient}</span>
                              </>
                            ) : (
                              <span className="text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.88),0_1px_2px_rgba(0,0,0,0.95)]">
                                {tile.title}
                              </span>
                            )}
                          </h3>
                          <p className="mt-4 max-w-full text-base leading-7 text-white/88 md:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.92),0_2px_24px_rgba(0,0,0,0.65)]">
                            {tile.desc}
                          </p>
                          {tile.descParagraph2 && (
                            <p className="mt-3 max-w-full text-base leading-7 text-white/88 md:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.92),0_2px_24px_rgba(0,0,0,0.65)]">
                              {tile.descParagraph2}
                            </p>
                          )}
                          {!tile.hideCta && (
                            <div className="mt-8 inline-flex items-center gap-4">
                              <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition group-hover:bg-white/20 group-hover:border-[var(--accent)]/60 group-hover:shadow-[0_0_24px_rgba(201,0,7,0.18)]">
                                {tile.cta}
                              </span>
                              <span className="text-xl text-white/50 transition group-hover:translate-x-2 group-hover:text-white">
                                →
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Medium tiles: full-bleed image + dark→transparent gradient (same fixed height for both) */}
                  {tile.size !== "large" && (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        {tile.imageShiftDown ? (
                          <div
                            className="absolute left-0 right-0 w-full will-change-transform"
                            style={{
                              height: "128%",
                              top: "-14%",
                              transform: `translateY(${tile.imageShiftDown})`,
                            }}
                          >
                            <SmartImage
                              src={tile.image}
                              alt={tile.title}
                              style={
                                tile.imageObjectPosition
                                  ? { objectPosition: tile.imageObjectPosition }
                                  : undefined
                              }
                              className={cn(
                                "absolute inset-0 h-full w-full object-cover transition duration-700",
                                "group-hover:scale-[1.04]",
                                !tile.imageObjectPosition &&
                                  cn(
                                    tile.imagePosition === "right" && "object-right",
                                    tile.imagePosition === "left" && "object-left",
                                    (tile.imagePosition === undefined ||
                                      tile.imagePosition === "center") &&
                                      "object-center",
                                  ),
                              )}
                            />
                          </div>
                        ) : (
                          <SmartImage
                            src={tile.image}
                            alt={tile.title}
                            style={
                              tile.imageObjectPosition
                                ? { objectPosition: tile.imageObjectPosition }
                                : undefined
                            }
                            className={cn(
                              "absolute inset-0 h-full w-full object-cover transition duration-700",
                              "group-hover:scale-[1.04]",
                              !tile.imageObjectPosition &&
                                cn(
                                  tile.imagePosition === "right" && "object-right",
                                  tile.imagePosition === "left" && "object-left",
                                  (tile.imagePosition === undefined ||
                                    tile.imagePosition === "center") &&
                                    "object-center",
                                ),
                            )}
                          />
                        )}
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1]"
                        style={{
                          background:
                            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.94) 14%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.38) 54%, rgba(0,0,0,0.1) 76%, transparent 100%)",
                        }}
                        aria-hidden
                      />
                      <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
                        <MediumTileTitleAndDesc title={tile.title} desc={tile.desc} />
                        {!tile.hideCta && (
                          <div className="mt-8 inline-flex items-center gap-4">
                            <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-white/20 group-hover:border-[var(--accent)]/60 group-hover:shadow-[0_0_24px_rgba(201,0,7,0.18)]">
                              {tile.cta}
                            </span>
                            <span className="text-xl text-white/50 transition group-hover:translate-x-2 group-hover:text-white">
                              →
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-[32px] md:rounded-[48px] ring-1 ring-inset ring-white/5",
                      !tile.staticCard && "transition group-hover:ring-[var(--accent)]/30",
                    )}
                  />
                </motion.article>
            );
            return (
              <Reveal
                key={tile.title}
                delayMs={60 + i * 50}
                className={tile.size === "large" ? "md:col-span-2" : ""}
              >
                {tile.staticCard ? (
                  <div className="block">{article}</div>
                ) : (
                  <Link href={tile.href} className="group block">
                    {article}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
