import { careerPosts } from "../src/content/careers";
import { newsPosts } from "../src/content/news";
import { researchPosts } from "../src/content/research";

/** Every public page, derived from src/app + src/content so new posts are covered automatically. */
export const routes: string[] = [
  "/",
  "/careers",
  "/contact",
  "/docs",
  "/launch-client",
  "/news",
  "/privacy",
  "/research",
  "/roadmap",
  "/team",
  "/technology-overview",
  ...careerPosts.map((p) => `/careers/${p.slug}`),
  ...newsPosts.map((p) => `/news/${p.slug}`),
  ...researchPosts.map((p) => `/research/${p.slug}`),
];

/** File-safe name for a route, e.g. "/careers/foo" -> "careers-foo", "/" -> "home". */
export function routeSlug(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}
