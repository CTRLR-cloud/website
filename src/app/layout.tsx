import { AmbientBackground } from "@/components/AmbientBackground";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";
import { StructuredData } from "@/components/StructuredData";
import { DEFAULT_DESCRIPTION, OG_IMAGE, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/seo";

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
    default: `${SITE_NAME} - ${TAGLINE}`,
    template: `${SITE_NAME} - %s`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} - ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
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
        <StructuredData />
        <PointerGlow />
        <AmbientBackground />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
