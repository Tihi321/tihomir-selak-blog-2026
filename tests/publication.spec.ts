import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const articles = [
  {
    title: "From code completion to architecture",
    slug: "from-code-completion-to-architecture",
    published: "2024-01-02",
    updated: "2026-09-24",
    topic: "software-engineering",
  },
  {
    title: "Building an AI-assisted visual story",
    slug: "building-an-ai-visual-story",
    published: "2024-01-21",
    updated: "2026-09-24",
    topic: "experiments",
  },
  {
    title: "When a story becomes an advertisement",
    slug: "storytelling-and-product-placement",
    published: "2024-01-25",
    updated: "2026-09-28",
    topic: "writing",
  },
  {
    title: "Growth, culture, and reinvention in game studios",
    slug: "growth-culture-and-reinvention-in-games",
    published: "2024-02-04",
    updated: "2026-09-28",
    topic: "leadership",
  },
  {
    title: "Fast judgments and modern decisions",
    slug: "fast-judgments-and-modern-decisions",
    published: "2024-04-20",
    updated: "2026-09-28",
    topic: "psychology",
  },
  {
    title: "What physics means by observation",
    slug: "what-physics-means-by-observation",
    published: "2024-09-22",
    updated: "2026-09-28",
    topic: "physics",
  },
  {
    title: "Why I’m rebuilding this blog",
    slug: "why-rebuilding-this-blog",
    published: "2026-09-24",
    topic: "experiments",
  },
  {
    title: "Starting a shared React component library",
    slug: "react-component-library",
    published: "2026-09-30",
    topic: "frontend",
  },
  {
    title: "A desktop tool for watching message traffic",
    slug: "zeromq-traffic-explorer",
    published: "2026-09-30",
    topic: "developer-tools",
  },
  {
    title: "Bringing Rust into our service layer",
    slug: "rust-daemon-services",
    published: "2026-09-30",
    topic: "rust",
  },
  {
    title: "Python services and the tooling to ship them",
    slug: "python-services",
    published: "2026-09-30",
    topic: "python",
  },
  {
    title: "Testing without the hardware",
    slug: "device-simulators",
    published: "2026-09-30",
    topic: "testing",
  },
  {
    title: "API docs from source to Confluence",
    slug: "source-to-confluence-docs",
    published: "2026-09-30",
    topic: "documentation",
  },
] as const;
const articleRoutes = articles.map((article) => `/writing/${article.slug}/`);
// The six work posts share the newest publication date, so any of them can
// take the home page's single "Latest writing" slot.
const newestRoutes = articles
  .filter((article) => article.published === "2026-09-30")
  .map((article) => `/writing/${article.slug}/`);
const fixtureRoute = "/writing/__playwright-fixture-2025/";
const reviewImages = join(
  process.cwd(),
  ".codex/tickets/TSB-02-add-relevant-content/review-images",
);

test("all thirteen articles are published with their original and revision dates", async ({
  page,
}) => {
  for (const path of ["/", "/writing/", "/topics/", "/about/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(
      page.getByText("No articles have been published yet."),
    ).toHaveCount(0);
  }

  await page.goto("/writing/");
  await expect(
    page.locator("section[aria-label='Published articles'] .entry"),
  ).toHaveCount(articles.length);

  for (const article of articles) {
    const path = `/writing/${article.slug}/`;
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1")).toHaveText(article.title);
    await expect(page.locator(".draft-banner")).toHaveCount(0);
    await expect(page.locator("article time")).toHaveAttribute(
      "datetime",
      new RegExp(`^${article.published}`),
    );
    if ("updated" in article) {
      await expect(page.locator(".revision-note").first()).toContainText(
        article.updated.slice(0, 4),
      );
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://blog.tihomir-selak.from.hr${path}`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .evaluate((element) => JSON.parse(element.innerHTML));
    expect(jsonLd["@type"]).toBe("BlogPosting");
    expect(jsonLd.datePublished).toContain(article.published);
    if ("updated" in article) {
      expect(jsonLd.dateModified).toContain(article.updated);
    }
    await expect(
      page.locator("main nav[aria-label='Article navigation'] a").first(),
    ).toHaveAttribute("href", /^\/writing\//);
  }
});

test("published articles are discoverable from topics, the home page, and RSS", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const latestHref = await page
    .locator("section[aria-labelledby='latest-heading'] a")
    .first()
    .getAttribute("href");
  expect(newestRoutes).toContain(latestHref);
  await expect(
    page.getByRole("link", {
      name: "Growth, culture, and reinvention in game studios",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Building an AI-assisted visual story" }),
  ).toBeVisible();

  for (const topic of [
    "experiments",
    "leadership",
    "psychology",
    "physics",
    "software-engineering",
    "frontend",
    "developer-tools",
    "rust",
    "python",
    "testing",
    "documentation",
  ]) {
    const response = await page.goto(`/topics/${topic}/`);
    expect(response?.status()).toBe(200);
    const expected = articles.filter((article) => article.topic === topic);
    for (const article of expected) {
      await expect(
        page.getByRole("link", { name: article.title, exact: true }),
      ).toBeVisible();
    }
  }

  const feed = await request.get("/rss.xml");
  expect(feed.ok()).toBeTruthy();
  const xml = await feed.text();
  expect(xml).toContain("<rss");
  for (const article of articles) expect(xml).toContain(article.title);
  expect(xml).not.toContain("Playwright route fixture");

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("/sitemap-index.xml");
  const securityHeaders = readFileSync(
    join(process.cwd(), "netlify.toml"),
    "utf8",
  );
  expect(securityHeaders).toContain("Content-Security-Policy");
  expect(securityHeaders).toContain("X-Content-Type-Options");

  const redirectDoc = readFileSync(
    join(process.cwd(), ".codex/tickets/blog-site-2026/redirects.md"),
    "utf8",
  );
  const redirectConfig = readFileSync(
    join(process.cwd(), "netlify.toml"),
    "utf8",
  );
  const redirects = [
    ["the-invisible-helper", "from-code-completion-to-architecture"],
    ["the-turtle-story", "building-an-ai-visual-story"],
    ["the-storytelling-marketing", "storytelling-and-product-placement"],
    ["gaming-studio-lifecycle", "growth-culture-and-reinvention-in-games"],
    [
      "evolutionary-mismatches-in-modern-day",
      "fast-judgments-and-modern-decisions",
    ],
    ["the-observer-effect", "what-physics-means-by-observation"],
  ] as const;
  for (const [oldSlug, newSlug] of redirects) {
    expect(redirectDoc).toContain(`/post/2014/${oldSlug}/`);
    expect(redirectDoc).toContain(`/writing/${newSlug}/`);
    expect(redirectConfig).toContain(`from = "/post/2014/${oldSlug}/"`);
    expect(redirectConfig).toContain(`to = "/writing/${newSlug}/"`);
  }

  const sitemap = readFileSync(
    join(process.cwd(), "dist/sitemap-0.xml"),
    "utf8",
  );
  for (const article of articles) {
    expect(sitemap).toContain(
      `https://blog.tihomir-selak.from.hr/writing/${article.slug}/`,
    );
  }
});

test("layout fits target widths and representative pages pass axe", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/writing/",
      articleRoutes[0],
      articleRoutes[3],
      articleRoutes[5],
    ]) {
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
  const visualPages = [
    ["/", "home"],
    ["/writing/", "archive"],
    [articleRoutes[0], "technical"],
    [articleRoutes[1], "creative"],
    [articleRoutes[3], "leadership"],
    [articleRoutes[4], "psychology"],
    [articleRoutes[5], "physics"],
  ] as const;
  for (const [path, name] of visualPages) {
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

test("keyboard navigation, 200% zoom, and JavaScript-disabled reading work", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeInViewport();

  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto(articleRoutes[5]);
  const zoomOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(zoomOverflow).toBe(false);

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:4321",
  });
  const noScriptPage = await noScriptContext.newPage();
  const response = await noScriptPage.goto(articleRoutes[3]);
  expect(response?.status()).toBe(200);
  await expect(noScriptPage.locator("main h1")).toHaveText(
    "Growth, culture, and reinvention in game studios",
  );
  await expect(noScriptPage.locator(".prose-body")).toContainText(
    "what can an outside observer responsibly learn",
  );
  await noScriptPage.close();
  await noScriptContext.close();

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
