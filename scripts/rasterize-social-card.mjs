import { chromium } from "@playwright/test";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(resolve("public/social-card.svg")).href);
  await page.screenshot({ path: resolve("public/social-card.png") });
} finally {
  await browser.close();
}
