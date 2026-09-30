import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

// The test server does not send the Netlify headers, so this test reads the
// real Content-Security-Policy from netlify.toml and injects it into every
// document response. Inline <style> blocks or style="" attributes that the
// policy forbids then show up as securitypolicyviolation events.
const toml = readFileSync("netlify.toml", "utf8");
const csp = toml
  .match(/Content-Security-Policy\s*=\s*"([^"]+)"/)?.[1]
  // upgrade-insecure-requests would rewrite http://127.0.0.1 subresources to
  // https and break local loading; it does not affect style-src, so drop it.
  ?.replace(/;?\s*upgrade-insecure-requests/, "");

// The canvas background is set on <html>. --canvas in src/styles/tokens.css is #f4f7f9.
const canvas = "rgb(244, 247, 249)";

const paths = [
  "/",
  "/writing/",
  "/writing/why-rebuilding-this-blog/",
  "/about/",
  "/404.html",
];

for (const path of paths) {
  test(`renders styled with no CSP violations at ${path}`, async ({ page }) => {
    expect(csp, "Content-Security-Policy found in netlify.toml").toBeTruthy();

    await page.route("**/*", async (route) => {
      if (route.request().resourceType() !== "document") {
        return route.continue();
      }
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: {
          ...response.headers(),
          "content-security-policy": csp as string,
        },
      });
    });

    await page.addInitScript(() => {
      const w = window as unknown as { __cspViolations: string[] };
      w.__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        w.__cspViolations.push(
          `${event.violatedDirective} blocked ${event.blockedURI}`,
        );
      });
    });

    await page.goto(path);

    const violations = await page.evaluate(
      () =>
        (window as unknown as { __cspViolations: string[] }).__cspViolations,
    );
    expect(violations).toEqual([]);

    const background = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor,
    );
    expect(background).toBe(canvas);
  });
}
