# TSB-02 — Add and publish relevant content

Status: implemented locally; deployment and cross-domain redirects remain deferred
Prepared: 28 September 2026

## Goal

Complete the blog content launch by publishing the three existing articles and rewriting all six articles from `C:\projects\Personal\astro-blog-2024` as credible 2026 editions. The two already migrated articles count toward those six, producing seven published articles total.

This plan supersedes the legacy-content selection decisions in `.codex/tickets/blog-site-2026/plan.md` while preserving that plan's privacy, evidence, accessibility, and deployment constraints.

## Implementation checklist

- [x] Publish the existing revisions: “From code completion to architecture,” “Building an AI-assisted visual story,” and “Why I’m rebuilding this blog.”
- [x] Rewrite and migrate the remaining four legacy articles:
  - Reframe storytelling/marketing as a retrospective on narrative promotion and restraint.
  - Rebuild the gaming-studio article as a sourced essay about growth, culture, decline, and reinvention.
  - Narrow evolutionary mismatch to evidence-backed cognitive shortcuts and modern decision-making.
  - Narrow the observer-effect article to what “observation” means in physics, explicitly separating measurement from consciousness and biological perception.
- [x] Preserve each 2024 publication date, add a 2026 `updatedAt`, an honest revision note, curated topics, inline citations, and the historical `originalPath`.
- [x] Publish all seven articles only after editorial, factual, privacy, and source checks. Use verified career context from `C:\projects\Cowork\Job` without exposing private repository evidence, employer architecture, customers, metrics, or internal paths.
- [x] Do not copy legacy images, generated illustrations, music, voices, or the 21.8 MB WAV file because reuse rights remain unconfirmed. Ship text-first articles.
- [x] Update the historical URL manifest for all six old article routes. Add same-host redirects where applicable and document the cross-domain redirect handoff owned by the personal-site repository.
- [x] Keep the existing content schema and routes; no new public API is required.
- [x] Add `.gitattributes` enforcing LF for text files and normalize Prettier-managed source so formatting behaves consistently on Windows and CI. Five non-source/current-checkout files remain CRLF or mixed; the repository attribute will normalize them on a clean checkout.
- [x] Resolve the Astro/Vite `picomatch` CommonJS loading regression with the smallest verified configuration fix while retaining the immutable dependency lock.
- [x] Update Playwright expectations from draft exclusion to seven published articles, including public routes, feeds, metadata, topics, and navigation.
- [x] Update README and the earlier ticket record to reflect publication, the expanded six-article migration, media exclusions, and remaining deployment/redirect work.

## Acceptance and verification

- [x] `yarn install --immutable`, `yarn format:check`, `yarn check`, `yarn build`, and `yarn test:e2e` pass.
- [x] All seven articles appear in `/writing/`, appropriate topic pages, RSS, sitemap, article navigation, and homepage selections.
- [x] Every article has canonical metadata, JSON-LD, accurate original/revision dates, and no draft banner.
- [x] Material scientific and industry claims have working inline sources; no unsupported profile or employer claims remain.
- [x] Layouts pass at 320, 390, 768, 1024, and 1440 px, keyboard navigation, 200% zoom, JavaScript-disabled reading, and Axe serious/critical checks.
- [x] Refreshed desktop and mobile screenshots cover the homepage, archive, and representative technical, creative, leadership, and science articles.
- [x] No legacy media, confidential files, private research notes, or oversized audio enter the repository.

## Assumptions and boundaries

- “Migrate all six” means substantial editorial rehabilitation, not faithful copying of outdated prose.
- All six legacy articles and the blog-intent note are intended for publication in TSB-02.
- Legacy media remains excluded until ownership and reuse rights are separately confirmed.
- Scientific articles use authoritative institutional or primary sources; the physics article must not imply that human consciousness creates physical reality.
- Do not state how the revised prose was produced unless the user separately approves an AI-use disclosure.
- Production deployment, DNS, cross-domain personal-site redirects, and archival of `astro-blog-2024` remain outside TSB-02.

## Implementation record

- Published the three existing articles and added four text-first rewrites, producing seven public articles. The rewritten marketing, games-industry, decision-making, and physics pieces narrow unsupported claims, distinguish observation from interpretation, and cite primary, institutional, or scholarly sources inline.
- Preserved the six historical publication dates and paths, added 2026 revision dates/notes, configured six same-host Netlify redirects, and documented the separate cross-domain redirect ownership.
- Added an LF repository policy plus explicit Astro-aware Prettier configuration. Prettier-managed source is normalized; `.gitignore`, `netlify.toml`, two SVGs, and `yarn.lock` still show CRLF or mixed bytes in this existing Windows checkout, but `format:check` passes and clean checkouts will honor `.gitattributes`.
- Fixed Astro 7.3.5/Vite 8.3.0 content sync by prebundling `picomatch` in Vite's dedicated `astro` environment. This is configuration-only; the immutable lockfile remains in use.
- Updated homepage featured selection, publication tests, sitemap and redirect assertions, responsive/accessibility checks, JavaScript-disabled reading, and the 200% zoom equivalent viewport check.
- Verification on 28 September 2026:
  - `yarn install --immutable` passed with the existing peer-dependency warning.
  - `yarn format:check` passed.
  - `yarn check` passed with 0 errors, warnings, or hints.
  - `yarn build` passed and generated 22 static pages, seven article routes, RSS, topics, and sitemap. The existing non-fatal MDX `MODULE_LEVEL_DIRECTIVE` warning remains.
  - `yarn test:e2e` passed 4/4 tests, including all public routes/metadata, RSS/sitemap/redirect coverage, responsive widths, Axe checks, keyboard navigation, no-JavaScript reading, and zoom-equivalent layout.
  - Fourteen desktop/mobile review screenshots were generated under `review-images/` and spot-checked for the homepage and mobile physics article.
- Not performed: Netlify deployment, DNS, live redirect verification, cross-domain personal-site redirects, or archival of the legacy repository.
