import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";
import { geistSans } from "@/fonts/geist-sans";

export const metadata: Metadata = {
  title: {
    default: "CTRL+R - Robot Operation, at Scale",
    template: "CTRL+R - %s",
  },
  description: "One unified platform to control and coordinate robots at scale.",
  metadataBase: new URL("https://www.ctrlr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CTRL+R - Robot Operation, at Scale",
    description: "One unified platform to control and coordinate robots at scale.",
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
    description: "One unified platform to control and coordinate robots at scale.",
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
        className={`${geistSans.variable} antialiased selection:bg-[color-mix(in_oklab,var(--accent)_28%,transparent)] selection:text-white`}
      >
        <PointerGlow />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
