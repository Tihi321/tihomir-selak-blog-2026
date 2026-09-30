import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://blog.tihomir-selak.from.hr",
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  vite: {
    build: {
      // CSP is script-src 'self': never inline small processed scripts.
      assetsInlineLimit: 0,
    },
    environments: { astro: { optimizeDeps: { include: ["picomatch"] } } },
  },
  fonts: [
    {
      name: "Archivo",
      cssVariable: "--font-archivo",
      provider: fontProviders.fontsource(),
      styles: ["normal"],
      weights: ["100 900"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Arial", "sans-serif"],
    },
    {
      name: "Martian Mono",
      cssVariable: "--font-martian-mono",
      provider: fontProviders.fontsource(),
      styles: ["normal"],
      weights: ["300 700"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  devToolbar: { enabled: false },
});
