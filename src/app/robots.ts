import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Open to all search engines and AI assistants, so CTRL+R can show up in both Google results and
 * AI answers. The image proxy is an internal helper, not a page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // Named explicitly so the welcome is unambiguous for AI crawlers.
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
