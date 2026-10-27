import type { Metadata } from "next";

export const SITE_URL = "https://www.ctrlr.cloud";
export const SITE_NAME = "CTRL+R";
export const TAGLINE = "One unified platform for your entire physical AI fleet";
export const DEFAULT_DESCRIPTION =
  "One unified platform to operate and manage robots, drones, cameras, and sensors from any manufacturer. One platform. Any device. Total control.";

/** Bump when the share image changes so link-preview caches fetch the new one. */
const OG_IMAGE_VERSION = "20261026-hero-still";
export const OG_IMAGE = {
  url: `/opengraph-image?v=${OG_IMAGE_VERSION}`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: ${TAGLINE}.`,
};

/**
 * Title, description, canonical address, and share-preview tags for one page. Each page sets its
 * own canonical so search engines don't treat every page as a copy of the homepage.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${SITE_NAME} - ${title}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}
