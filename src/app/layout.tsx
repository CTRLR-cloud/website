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

export const metadata: Metadata = {
  title: {
    default: "CTRL+R - Robot Operation, at Scale",
    template: "CTRL+R - %s",
  },
  description: "One Platform. Any Robot. Total Control.",
  metadataBase: new URL("https://www.ctrlr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CTRL+R - Robot Operation, at Scale",
    description: "One Platform. Any Robot. Total Control.",
    type: "website",
    url: "https://www.ctrlr.cloud/",
    siteName: "CTRL+R",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CTRL+R — Robot Operation, at Scale. One Platform. Any Robot. Total Control.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTRL+R - Robot Operation, at Scale",
    description: "One Platform. Any Robot. Total Control.",
    images: ["/opengraph-image"],
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
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
