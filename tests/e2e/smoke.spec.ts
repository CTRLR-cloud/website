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

test("/launch-app redirects to /launch-client", async ({ page }) => {
  await page.goto("/launch-app");
  await expect(page).toHaveURL(/\/launch-client$/);
});
