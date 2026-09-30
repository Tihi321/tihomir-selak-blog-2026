import { expect, test } from "@playwright/test";

const canvases = {
  light: "rgb(238, 242, 248)",
  dark: "rgb(10, 16, 32)",
} as const;

const background = (page: import("@playwright/test").Page) =>
  page.evaluate(
    () => getComputedStyle(document.documentElement).backgroundColor,
  );

for (const scheme of ["light", "dark"] as const) {
  test(`with no stored choice the page follows the OS (${scheme})`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: scheme });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.*/);
    expect(await background(page)).toBe(canvases[scheme]);
    await context.close();
  });
}

test("the toggle flips the theme, the label, localStorage and the cookie", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("/");
  const toggle = page.locator("[data-theme-toggle]");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to dark theme");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to light theme");
  expect(await background(page)).toBe(canvases.dark);
  expect(await page.evaluate(() => localStorage.getItem("ts-theme"))).toBe(
    "dark",
  );
  const cookies = await context.cookies();
  expect(cookies.find((cookie) => cookie.name === "ts-theme")?.value).toBe(
    "dark",
  );

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to dark theme");
  expect(await background(page)).toBe(canvases.light);
  await context.close();
});

test("a ts-theme cookie sets the theme on load and wins over localStorage", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "light" });
  await context.addCookies([
    { name: "ts-theme", value: "dark", url: "http://127.0.0.1:4321" },
  ]);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem("ts-theme", "light"));
  await page.goto("/writing/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await background(page)).toBe(canvases.dark);
  await context.close();
});

test("the theme control is hidden when JavaScript is disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.locator("[data-theme-toggle]")).toBeHidden();
  await context.close();
});
