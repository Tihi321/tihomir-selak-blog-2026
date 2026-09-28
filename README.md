# Tihomir Selak — field notes

A static Astro publication for practical notes on software engineering, leadership, useful tools, and selected experiments.

## Local workflow

Use Node 24 and Yarn 4.9.2.

```text
corepack enable
yarn install --immutable
yarn dev
```

The public site is generated with `yarn build` and can be checked locally with `yarn preview`. Run `yarn format:check`, `yarn check`, and `yarn test:e2e` before proposing changes. The browser check captures the desktop and mobile review images in `.codex/tickets/blog-site-2026/review-images/`.

## Published articles

The publication contains seven articles: the two revised January 2024 posts, four substantially rewritten 2024 archive posts, and a 2026 note about the publication. Historical articles retain their original dates and record their September 2026 revisions. Scientific and industry claims use inline sources, and the old content is treated as historical material rather than current career evidence.

Article sources remain ordinary Markdown/MDX files in this Git repository. Review prose and citations in source before release. Draft status is available for future work and excludes drafts from production pages, feeds, topics, related writing, and the sitemap; it does not make source private.

## Add an article

Create a Markdown or MDX file under `src/content/writing/` with frontmatter for `title`, `description`, `publishedAt`, `status`, `topics`, and `featured`. Optional fields include `updatedAt`, `hero`, `heroAlt`, `canonicalUrl`, `originalPath`, `revisionNote`, and `sources`. Use a stable, descriptive filename without an ordinal prefix. Keep topics lowercase and hyphenated. Add source links near the claims they support. Set `status: published` only after editorial approval; frontmatter validation requires published pieces to have at least one topic and validates image alt text when an image is used.

Article images belong in `src/assets/` so Astro can process them. Record ownership and credit before including any media. Do not add private research notes, CV source files, or confidential work material to this repository.

## Editorial boundaries

No legacy media is copied because reuse rights are unresolved. The interactive visual-story version is deferred.

All six historical routes and their destinations are recorded in `.codex/tickets/blog-site-2026/redirects.md`. Cross-domain redirects, same-host redirect activation, DNS, production deployment, and repository archival remain separate work. The old `astro-blog-2024` repository remains read-only and is not archived.

## Deployment

The workflow checks formatting, Astro content, the static build, and Playwright/Axe browser checks. Production deployment remains on the `main` branch and skips safely until both `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are configured. DNS, redirect activation, and repository archival require separate work.
