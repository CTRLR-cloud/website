import { defineConfig, devices } from "@playwright/test";

// Point tests at an already-running or deployed site with BASE_URL
// (e.g. BASE_URL=https://www.ctrlr.cloud npm run test:e2e); otherwise the
// local dev server is started (or reused if one is already on :3000).
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const capture = !!process.env.CAPTURE;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Dev server compiles each route on first hit; keep timeouts generous.
  timeout: 60_000,
  reporter: [["list"], ["html", { open: "never" }]],
  // Screenshot capture is opt-in via `npm run screenshots`.
  grepInvert: capture ? undefined : /@capture/,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 180_000,
      },
});
