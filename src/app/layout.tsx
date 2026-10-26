import { AmbientBackground } from "@/components/AmbientBackground";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE_VERSION = "20261026-hero-still";

export const metadata: Metadata = {
  title: {
    default: "CTRL+R - One unified platform for your entire physical AI fleet",
    template: "CTRL+R - %s",
  },
  description: "One platform. Any device. Total control.",
  metadataBase: new URL("https://www.ctrlr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CTRL+R - One unified platform for your entire physical AI fleet",
    description: "One platform. Any device. Total control.",
    type: "website",
    url: "https://www.ctrlr.cloud/",
    siteName: "CTRL+R",
    images: [
      {
        url: `/opengraph-image?v=${OG_IMAGE_VERSION}`,
        width: 1200,
        height: 630,
        alt: "CTRL+R: One unified platform for your entire physical AI fleet.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRL+R - One unified platform for your entire physical AI fleet",
    description: "One platform. Any device. Total control.",
    images: [`/opengraph-image?v=${OG_IMAGE_VERSION}`],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[color-mix(in_oklab,var(--accent)_28%,transparent)] selection:text-white`}
      >
        <PointerGlow />
        <AmbientBackground />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
