import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "CTRL+R — Robot Operations Made Easy. One Platform. Any Robot. Total Control.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Matches `globals.css` `.text-gradient` (hero “Made Easy”) */
const TEXT_GRADIENT_MADE_EASY = `linear-gradient(105deg, #ffffff 0%, #f2f2f2 14%, #e8aeb2 38%, #d62830 58%, #c90007 78%, #690404 100%)`;

/** Matches `.btn-primary` vertical gradient */
const BTN_PRIMARY_BG = `linear-gradient(180deg, #dc1e26 0%, #c90007 55%, #690404 100%)`;

export default async function Image() {
  const [heroBuf, logoBuf, watermarkBuf] = await Promise.all([
    readFile(join(process.cwd(), "public", "background-ctrlr-hero.png")),
    readFile(join(process.cwd(), "public", "Main-CTRLR-logo-trans-bg.png")),
    readFile(join(process.cwd(), "public", "CTRLR_logo_symbol.png")),
  ]);

  const toDataUrl = (buf: Buffer, mime: string) =>
    `data:${mime};base64,${buf.toString("base64")}`;

  const heroSrc = toDataUrl(heroBuf, "image/png");
  const logoSrc = toDataUrl(logoBuf, "image/png");
  const watermarkSrc = toDataUrl(watermarkBuf, "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#000000",
        }}
      >
        {/* Photo — same asset as home hero */}
        <img
          src={heroSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Readability stack — mirrors `page.tsx` hero overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 110% 70% at 50% 0%, rgba(0,0,0,0.55), transparent 58%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(201, 0, 7, 0.12)",
          }}
        />
        {/* `.ctrlr-hero-glow` */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.45,
            background: `
              radial-gradient(ellipse 100% 80% at 50% -5%, rgba(201, 0, 7, 0.34), transparent 55%),
              radial-gradient(ellipse 70% 60% at 95% 45%, rgba(105, 4, 4, 0.45), transparent 50%),
              radial-gradient(ellipse 50% 45% at 5% 75%, rgba(201, 0, 7, 0.1), transparent 50%)
            `,
          }}
        />
        {/* `.ctrlr-hero-grid` */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage: `
              linear-gradient(rgba(201, 0, 7, 0.28) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 0, 7, 0.28) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black 10%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,1))",
          }}
        />
        {/* Soft orb — hero right accent (no blur in OG; gradient only) */}
        <div
          style={{
            position: "absolute",
            right: -128,
            top: "18%",
            width: 520,
            height: 520,
            borderRadius: 9999,
            opacity: 0.45,
            background:
              "radial-gradient(circle, rgba(201, 0, 7, 0.22) 0%, transparent 68%)",
          }}
        />

        {/* Watermark — large CR monogram behind copy */}
        <img
          src={watermarkSrc}
          alt=""
          width={820}
          height={550}
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            opacity: 0.1,
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
          }}
        />

        {/* Foreground — logo, type, CTAs */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <img
            src={logoSrc}
            alt=""
            width={280}
            height={193}
            style={{
              objectFit: "contain",
              marginBottom: 28,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: 18,
              maxWidth: 1100,
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Robot Operations{" "}
            </span>
            <span
              style={{
                fontSize: 52,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                backgroundImage: TEXT_GRADIENT_MADE_EASY,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Made Easy
            </span>
          </div>

          <p
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: 720,
              textAlign: "center",
              lineHeight: 1.45,
              marginBottom: 32,
            }}
          >
            One platform. Any robot. Total control.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 9999,
                backgroundImage: BTN_PRIMARY_BG,
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                boxShadow:
                  "0 0 26px rgba(201, 0, 7, 0.45), 0 6px 20px rgba(0, 0, 0, 0.45)",
              }}
            >
              Try it free
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(245, 245, 245, 0.96)",
                color: "#0a0a0a",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              See how it works
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
