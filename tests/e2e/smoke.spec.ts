import { expect, test } from "@playwright/test";
import { routes } from "../routes";

for (const route of routes) {
  test(`${route} renders`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/CTRL\+R/);
    await expect(page.locator("main").first()).toBeVisible();
    expect(errors, "uncaught page errors").toEqual([]);
  });
}

test("unknown route returns 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

const redirects: [string, string][] = [
  ["/launch-app", "/launch-client"],
  ["/careers", "/contact"],
  ["/careers/embedded-systems-engineer", "/contact"],
  ["/roadmap", "/"],
  ["/research", "/"],
  ["/research/teleoperation-latency", "/"],
  ["/technology-overview", "/platform"],
  ["/docs/what-is-ctrlr", "/docs"],
  ["/team", "/"],
];

for (const [from, to] of redirects) {
  test(`${from} redirects to ${to}`, async ({ page }) => {
    const res = await page.goto(from);
    expect(res?.ok(), "final response").toBeTruthy();
    expect(new URL(page.url()).pathname).toBe(to);
  });
}
