import type { MetadataRoute } from "next";
import { SECTIONS } from "@/content/docs";
import { newsPosts } from "@/content/news";
import { SITE_URL } from "@/lib/seo";

/** Every public page. The Team page is hidden for now, so it is left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/platform", 0.9, "monthly"),
    page("/contact", 0.8, "monthly"),
    page("/docs", 0.7, "monthly"),
    // The first section is the /docs page itself.
    ...SECTIONS.slice(1).map((s) => page(`/docs/${s.id}`, 0.6, "monthly")),
    page("/news", 0.5, "daily"),
    ...newsPosts.map((p) => page(`/news/${p.slug}`, 0.4, "yearly")),
    page("/launch-client", 0.4, "monthly"),
    page("/privacy", 0.2, "yearly"),
  ];
}
