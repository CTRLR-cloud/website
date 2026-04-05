import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { BRAND_COLORS } from "@/config/brand-colors";

export const alt = "CTRL+R — Robot Operation, at Scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = BRAND_COLORS.primaryRed;

export default async function Image() {
  const logoBuf = await readFile(
    join(process.cwd(), "public", "Main-CTRLR-logo-trans-bg.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 85% 55% at 50% 12%, rgba(201, 0, 7, 0.32), transparent 55%), radial-gradient(ellipse 55% 45% at 92% 45%, rgba(105, 4, 4, 0.62), transparent 52%), linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.75), rgba(0,0,0,0.98))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            alt=""
            width={280}
            height={193}
            style={{ objectFit: "contain", marginBottom: 32 }}
          />
          {/* Headline accent — brand ruby */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 600,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Robot Operation,{" "}
              <span style={{ color: ACCENT }}>at Scale.</span>
            </span>
          </div>
          {/* Subtitle */}
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.65)",
              maxWidth: 560,
              textAlign: "center",
              lineHeight: 1.5,
              marginBottom: 36,
            }}
          >
            One unified platform to control and coordinate robots at scale.
          </p>
          {/* CTA pills — primary ruby / light secondary */}
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
                backgroundColor: ACCENT,
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Launch Client
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
                color: "#141414",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Book a Demo
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
