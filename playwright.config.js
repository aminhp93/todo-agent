import { defineConfig, devices } from "@playwright/test";

// Environment-based base URL configuration
// Usage:
// - Dev (default): npm run test:e2e
// - Staging: BASE_URL=https://your-staging-url.vercel.app npm run test:e2e
// - Production: BASE_URL=https://todo-agent-blue.vercel.app npm run test:e2e
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const isLocalhost = baseURL.includes("localhost");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Only start local dev server when testing against localhost
  webServer: isLocalhost
    ? {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      }
    : undefined,
});
