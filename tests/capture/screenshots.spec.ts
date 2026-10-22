import { test } from "@playwright/test";
import { routes, routeSlug } from "../routes";

// Full-page screenshots of every route for before/after review.
// Run with `npm run screenshots`; output goes to screenshots/<project>/.
for (const route of routes) {
  test(`capture ${route} @capture`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });

    // Scroll through the page so scroll-triggered (whileInView) animations play
    // and lazy images load before the full-page shot.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: `screenshots/${testInfo.project.name}/${routeSlug(route)}.png`,
      fullPage: true,
    });
  });
}
