import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CTRL+R: One unified platform for your entire physical AI fleet.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#c90007";

/** Matches `.btn-primary` vertical gradient */
const BTN_PRIMARY_BG = `linear-gradient(180deg, #dc1e26 0%, #c90007 55%, #690404 100%)`;

/** The site's font (Geist), as TTF from Google Fonts. Falls back to the default font if offline. */
async function loadGeist(weight: 500 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}`)).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Link-preview image: a still of the homepage hero (first background photo, headline, "any robot", button). */
export default async function Image() {
  const [bgBuf, logoBuf, geist500, geist700] = await Promise.all([
    readFile(join(process.cwd(), "public", "og", "hero-bg.jpg")),
    readFile(join(process.cwd(), "public", "Main-CTRLR-logo-trans-bg.png")),
    loadGeist(500),
    loadGeist(700),
  ]);

  const toDataUrl = (buf: Buffer, mime: string) => `data:${mime};base64,${buf.toString("base64")}`;
  const fonts = [
    ...(geist500 ? [{ name: "Geist", data: geist500, weight: 500 as const, style: "normal" as const }] : []),
    ...(geist700 ? [{ name: "Geist", data: geist700, weight: 700 as const, style: "normal" as const }] : []),
  ];

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
          fontFamily: fonts.length ? "Geist" : undefined,
        }}
      >
        {/* Same photo the hero opens on, graded red */}
        <img
          src={toDataUrl(bgBuf, "image/jpeg")}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
        />
        {/* Readability overlays, as in HomeHero */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "rgba(0,0,0,0.4)" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.55), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0) 50%, rgba(0,0,0,0.85))",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={toDataUrl(logoBuf, "image/png")}
            alt=""
            width={180}
            height={124}
            style={{ objectFit: "contain", marginBottom: 26 }}
          />
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textShadow: "0 2px 18px rgba(0,0,0,0.85)",
            }}
          >
            One Unified Platform
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 30,
              fontWeight: 500,
              color: "rgba(255,255,255,0.82)",
              textShadow: "0 2px 18px rgba(0,0,0,0.85)",
            }}
          >
            to manage your entire physical AI fleet
          </div>
          <div
            style={{
              marginTop: 26,
              display: "flex",
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 18px rgba(0,0,0,0.85)",
            }}
          >
            <span style={{ color: "#ffffff" }}>any</span>
            <span style={{ color: ACCENT, marginLeft: 12 }}>robot</span>
          </div>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 40px",
              borderRadius: 9999,
              backgroundImage: BTN_PRIMARY_BG,
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 700,
              boxShadow: "0 0 30px rgba(201, 0, 7, 0.5), 0 6px 20px rgba(0, 0, 0, 0.45)",
            }}
          >
            Get started
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
