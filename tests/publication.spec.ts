import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const draftRoutes = [
  "/draft-preview/from-code-completion-to-architecture/",
  "/draft-preview/building-an-ai-visual-story/",
];
const fixtureRoute = "/writing/__playwright-fixture-2025/";
const reviewImages = join(
  process.cwd(),
  ".codex/tickets/blog-site-2026/review-images",
);

test("local draft previews remain separate from production output", async ({
  page,
}) => {
  for (const path of ["/", "/writing/", "/about/", "/topics/"]) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByText(
        /From code completion to architecture|Building an AI-assisted visual story/,
      ),
    ).toHaveCount(0);
  }
  for (const path of draftRoutes) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByText("Local draft preview")).toBeVisible();
    await expect(
      page.locator(".article-topics a[href^='/topics/']"),
    ).toHaveCount(0);
  }
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "What belongs here" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /about this site and its approach/ }),
  ).toHaveAttribute("href", "/about/");

  const dist = join(process.cwd(), "dist");
  const files = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? files(path) : [path];
    });
  const builtFiles = files(dist);
  expect(
    builtFiles.some((path) =>
      path.includes(`${join("dist", "draft-preview")}`),
    ),
  ).toBe(false);
  const publicHtml = builtFiles
    .filter((path) => path.endsWith(".html"))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  expect(publicHtml).not.toContain("From code completion to architecture");
  expect(publicHtml).not.toContain("Building an AI-assisted visual story");
  expect(publicHtml).not.toContain("Why I’m rebuilding this blog");
});

test("archive, article previews, feed, and navigation render with valid metadata", async ({
  page,
  request,
}) => {
  for (const path of ["/", "/writing/", ...draftRoutes, fixtureRoute]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /https:\/\/blog\.tihomir-selak\.from\.hr\//,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  }
  await page.goto(draftRoutes[0]);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((element) => JSON.parse(element.innerHTML));
  expect(jsonLd["@type"]).toBe("BlogPosting");
  const feed = await request.get("/rss.xml");
  expect(feed.ok()).toBeTruthy();
  const xml = await feed.text();
  expect(xml).toContain("<rss");
  expect(xml).not.toContain("draft");
  expect(xml).not.toContain("Playwright route fixture");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("/sitemap-index.xml");
  const securityHeaders = readFileSync(
    join(process.cwd(), "netlify.toml"),
    "utf8",
  );
  expect(securityHeaders).toContain("Content-Security-Policy");
  expect(securityHeaders).toContain("X-Content-Type-Options");
  await page.goto(fixtureRoute);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Playwright route fixture, newer",
    }),
  ).toBeVisible();
  await expect(
    page.locator('main nav[aria-label="Article navigation"]'),
  ).toContainText("Older: Playwright route fixture, older");
  await expect(
    page.locator('main nav[aria-label="Article navigation"]'),
  ).toContainText("Playwright route fixture, older");
});

test("reading layout fits target widths and has no serious accessibility findings", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/writing/", draftRoutes[0]]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );
      expect(overflow, `${path} overflows at ${width}px`).toBe(false);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [path, name] of [
    ["/", "home"],
    ["/writing/", "archive"],
    [draftRoutes[0], "ai-workflow"],
    [draftRoutes[1], "visual-story"],
  ] as const) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.filter((issue) =>
        ["serious", "critical"].includes(issue.impact ?? ""),
      ),
    ).toEqual([]);
    mkdirSync(reviewImages, { recursive: true });
    await page.screenshot({
      path: join(reviewImages, `${name}-1440x1000.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: join(reviewImages, `${name}-390x844.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
});

test("keyboard navigation exposes a visible skip link and local preview navigation stays inside main", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeInViewport();
  await page.goto(fixtureRoute);
  await expect(
    page.locator('main nav[aria-label="Article navigation"]'),
  ).toBeVisible();
  const documentShape = await page.evaluate(() => ({
    mainContainsNavigation: Boolean(
      document.querySelector('main nav[aria-label="Article navigation"]'),
    ),
    closingHtmlIndex: document.documentElement.outerHTML.lastIndexOf("</html>"),
    navigationIndex:
      document.documentElement.outerHTML.indexOf("Article navigation"),
  }));
  expect(documentShape.mainContainsNavigation).toBe(true);
  expect(documentShape.navigationIndex).toBeLessThan(
    documentShape.closingHtmlIndex,
  );
});
