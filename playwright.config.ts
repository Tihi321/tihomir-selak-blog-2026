import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  outputDir: ".codex/temp/playwright",
  reporter: "list",
  globalTeardown: "./tests/global-teardown.ts",
  use: { baseURL: "http://127.0.0.1:4321", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node scripts/start-test-server.mjs",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
