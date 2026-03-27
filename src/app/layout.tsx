import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CTRL+R - Robot Operation, at Scale",
    template: "CTRL+R - %s",
  },
  description: "A real-time robot operations platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
  metadataBase: new URL("https://www.ctrlr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CTRL+R - Robot Operation, at Scale",
    description: "A real-time robot operations platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
    type: "website",
    url: "https://www.ctrlr.cloud/",
    siteName: "CTRL+R",
    images: [
      {
        url: "/Main-CTRLR-logo-trans-bg.png",
        width: 2680,
        height: 1852,
        alt: "CTRL+R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRL+R - Robot Operation, at Scale",
    description: "A real-time robot operations platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
    images: ["/Main-CTRLR-logo-trans-bg.png"],
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
        className={`${openSans.variable} ${geistMono.variable} antialiased selection:bg-[color-mix(in_oklab,var(--accent)_28%,transparent)] selection:text-white`}
      >
        <PointerGlow />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
