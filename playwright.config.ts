import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.ENV}`,
});

export default defineConfig({
  testDir: "./tests",

  outputDir: "test-results",

  timeout: 5 * 60 * 1000,

  expect: {
    timeout: 15000,
  },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [["html", { open: "never" }], ["line"], ["allure-playwright"]],

  use: {
    viewport: { width: 1920, height: 1080 },
    baseURL: process.env.BASE_URL || "https://eo3spring23patchorg.my.site.com/",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
    video: "retain-on-failure",

    trace: process.env.CI ? "on-first-retry" : "on",

    testIdAttribute: "data-test-id",

    launchOptions: {
      slowMo: 100,
    },
  },

  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
      },
    },
  ],
});
