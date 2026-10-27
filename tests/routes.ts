import { newsPosts } from "../src/content/news";
import { SECTIONS as docsSections } from "../src/content/docs";

/** Every public page, derived from src/app + src/content so new posts are covered automatically. */
export const routes: string[] = [
  "/",
  "/contact",
  "/docs",
  "/launch-client",
  "/news",
  "/privacy",
  "/platform",
  ...docsSections.map((s) => `/docs/${s.id}`),
  ...newsPosts.map((p) => `/news/${p.slug}`),
];

/** File-safe name for a route, e.g. "/docs/locations" -> "docs-locations", "/" -> "home". */
export function routeSlug(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}
