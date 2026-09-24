# Personal blog 2026 — implementation and migration plan

Status: implemented locally; awaiting user review of draft prose; Netlify credentials and DNS intentionally deferred
Repository: `Tihi321/tihomir-selak-blog-2026`
Local project: `C:\projects\Personal\tihomir-selak-blog-2026`
Target origin: `https://blog.tihomir-selak.from.hr/`
Migration source: `C:\projects\Personal\astro-blog-2024`
Prepared: 23 September 2026

## 1. Objective

Build a durable, fast, static publication for Tihomir's strongest writing. The blog should deepen the professional picture created by the personal site: not a generic stream of opinions, but a working record of how he learns, builds, leads, investigates, and experiments.

Version 1 must work completely locally, build to `dist/`, and pass automated checks without a Netlify account, token, site ID, server runtime, database, CMS, analytics account, newsletter provider, or search service.

The launch must include at least two carefully revised articles migrated from `astro-blog-2024`. Do not bulk-copy all historical content merely to make the archive look larger.

## 2. Product decision

- Use Astro as a static publishing system because the site has structured long-form content, feeds, topics, article metadata, and a growing archive.
- Keep the personal site at `tihomir-selak.from.hr` concise. The blog lives only at `blog.tihomir-selak.from.hr`.
- Treat the repository as both site and content source. Markdown/MDX remains versioned with the code; no CMS in version 1.
- Publish fewer, stronger pieces. Every migrated post must be reread, edited, and fact-checked before its draft flag is removed.
- The main editorial territory is software engineering, engineering leadership, practical AI use, technical tools, and selected creative experiments.
- Physics, psychology, gaming-industry analysis, and other research-heavy subjects may appear only when properly sourced and reviewed.
- Do not add comments, accounts, tracking, advertisements, affiliate links, pop-ups, or a newsletter signup in version 1.

### Personal data library and editorial source precedence

Future implementers are explicitly authorized to read `C:\projects\Cowork\Job` as the maintained personal-data, evidence, and planning library for author biography and fact-checking. The legacy blog remains the source for historical article text and media, but it is not the source of truth for current career facts.

Use sources in this order when facts overlap:

1. `research\career-facts.md` for user-confirmed career, leadership, education, and language facts.
2. `cv\cv_content.json` for structured public biography, chronology, links, skills, and project summaries.
3. `research\repository-evidence.md` for private supporting evidence and publication boundaries; internal counts and implementation details are not automatically publishable.
4. `linkedin\profile-update-draft.md` for tone and concise biographical wording when consistent with the files above.
5. `source\` for original verification documents only. Never publish certificates or source documents without a separate user decision.

Editorial and implementation rules:

- Read the minimum necessary files and never bulk-copy `C:\projects\Cowork\Job` into the blog repository.
- Use this library to verify author biography and firsthand context, not to manufacture article conclusions or performance claims.
- Keep private research notes, local paths, CV source data, certificates, repository histories, and unapproved employer details out of public pages, feeds, metadata, fixtures, screenshots, and committed article assets.
- If maintained sources disagree, prefer the higher source above and record the conflict instead of guessing.
- Any current-work article must remain a draft until the user approves its claims. Employer/customer screenshots, logos, architecture, source code, customer names, metrics, and confidential operational details always require explicit approval.
- Historical article text must retain honest original and revision dates. Do not silently rewrite an old article so extensively that it appears to have been written in its original form.
- A `draft` flag excludes prose from generated pages and feeds, but does not hide committed Markdown in a public GitHub repository. Keep the implementation branch local until the user approves the prose or explicitly accepts source-visible drafts; a private repository is another option for later review.
- Before final editorial review, check whether any personal-data source changed during implementation and reconcile affected biography or claims.

## 3. Audience and job to be done

Primary readers:

- engineering leaders and hiring managers who want evidence beyond a résumé;
- software engineers interested in practical architecture, delivery, debugging, tooling, and AI-assisted work;
- collaborators who arrive from the personal site, GitHub, or LinkedIn;
- curious readers interested in thoughtful technical and creative experiments.

The blog succeeds when a new reader can answer these questions after one article:

1. What did Tihomir actually attempt or observe?
2. What decisions and trade-offs did he make?
3. What evidence, limitations, and lessons support the conclusion?
4. Where can the reader find another relevant piece or return to the personal site?

## 4. Editorial identity

Working description:

> Field notes on software, leadership, practical AI, and experiments that became useful.

This is directional copy, not an immutable slogan. Refine it during implementation, but keep the voice specific, first-person, and evidence-led.

Editorial principles:

- Start with the concrete problem, experiment, or observation.
- Distinguish firsthand experience from interpretation and externally sourced claims.
- Prefer decisions, failed approaches, constraints, and outcomes over broad predictions.
- Use plain language and define specialist terms when they matter.
- Cut generic introductions, repeated conclusions, and unsupported superlatives.
- Preserve uncertainty where the evidence is uncertain.
- Date meaningful revisions and explain substantial changes to older pieces.
- Never disclose confidential TrackMen/Pixotope information, customer information, internal metrics, screenshots, source code, or architecture.
- Do not imply that employer views are represented.
- If an article was materially produced with AI assistance, add an accurate disclosure only after confirming the wording with the user.

## 5. Historical-content audit

The source contains six articles under `src/content/blog/2014`. The folder name says `2014`, but the frontmatter publication dates are in 2024. Treat frontmatter as the intended public date and correct the directory structure during migration.

### Launch migrations

#### A. The Invisible Helper: How AI is Transforming Our Daily Routines

Source: `src/content/blog/2014/001-the-invisible-helper.md`
Decision: **migrate and substantially revise for launch**
Why it helps: this is the clearest historical evidence of Tihomir's early practical AI adoption, his move from snippet-level help toward architectural thinking, his willingness to learn Rust, and his decision to change frameworks when a tool no longer fit.

Revision brief:

- Narrow the article to software-development practice rather than AI transforming all daily life.
- Consider a more precise title such as “From code completion to architecture: how AI changed my development workflow.”
- Keep the first-person timeline and concrete examples.
- Remove or update time-sensitive product statements, including model versions, availability, and pricing/usage claims.
- Add an editor's note: originally published in January 2024 and revised in 2026.
- Add a short “what changed since then” section grounded in Tihomir's real current practice.
- Avoid claiming that AI eliminates the need to understand a language or system.
- Link to relevant public repositories only when they still exist and genuinely support the claim.

#### B. Revolutionizing Storytelling: How I Created an AI-Powered Visual Novel for Children

Source: `src/content/blog/2014/002-the-turtle-story.mdx`
Decision: **migrate and substantially revise for launch**
Why it helps: it demonstrates a complete creative-technical experiment across narrative design, prompt specialization, image consistency, audio, UI, and educational intent. This is stronger evidence than a generic AI opinion piece.

Revision brief:

- Retitle around the project and process, without “revolutionizing.”
- Explain the design goal, tool chain, iteration process, limitations, and what Tihomir would now do differently.
- Confirm rights and attribution for every image, music track, and audio asset before publishing.
- Replace product claims and dated model names where they are not necessary; preserve them only when they explain a historical decision.
- Rebuild the visual-story experience accessibly. It must work with keyboard controls, readable text, visible focus, meaningful alt text, and reduced motion.
- Do not add a React or Solid integration solely to preserve the old component. Prefer Astro plus a small framework-free custom element or progressive enhancement.
- If the interactive story cannot meet the quality bar in the first pass, publish the revised case study with selected stills and mark the interactive version as a later enhancement; do not ship a broken demo.
- Add an original-publication/revision note.

### Review after launch

#### C. The Lifecycle of Gaming Studios: From Rise to Reinvention

Source: `src/content/blog/2014/004-gaming-studio-lifecycle.md`
Decision: **do not launch unchanged; possible full rewrite**
Potential value: organizational growth, culture, product quality, and reinvention could connect to engineering leadership.

Required work:

- Reframe around a defensible question rather than summaries of named companies.
- Re-research every company claim using current primary sources and high-quality reporting.
- Remove stale predictions and unsupported causal links.
- Clearly separate observed patterns from conclusions.
- Consider making the piece company-agnostic if named examples distract from the leadership lesson.

#### D. The Observer Effect: How Our Perspective Shapes Reality

Source: `src/content/blog/2014/006-the-observer-effect.md`
Decision: **hold as draft; expert-level fact-check and rewrite required**
Reason: the current article conflates relativity, measurement, biological perception, consciousness, and the quantum-mechanical observer. Several explanations are oversimplified or misleading, including relativistic mass language and implications that human observation creates reality.

Required work:

- Choose one scientific question and reduce scope.
- Use reputable primary or institutional sources.
- Remove speculative sections unless clearly labeled as speculation.
- Have a scientifically knowledgeable reviewer check the final draft before publication.
- Re-encode the WAV audio to a web-appropriate format only if the revised text justifies keeping it.

### Archive rather than migrate

#### E. Evolutionary Mismatches in Modern Day

Source: `src/content/blog/2014/005-evolutionary-mismatches-in-modern-day.md`
Decision: **keep in the source archive; do not publish in version 1**
Reason: it is broad, repetitive, lightly sourced, and does not currently provide strong evidence of Tihomir's distinctive experience. A future essay could reuse only a narrow, freshly researched idea.

#### F. When Storytelling Meets Marketing

Source: `src/content/blog/2014/003-the-storytelling-marketing.md`
Decision: **keep in the source archive; do not publish in version 1**
Reason: it depends on the retiring `star.kobilica.hr` project, repeats its core point, and reads as promotional rather than analytical. If the underlying experiment remains useful, incorporate a short, honest retrospective into a future Kobilica archive article.

### Content that is not part of the article migration

Do not automatically copy these old routes or features:

- `/apps`, `/web`, `/prompts`, `/search`, and `/split-generatos`;
- the generic about-page copy;
- the project catalogue, which belongs on the personal site if retained;
- the old theme switcher, mobile menu, prompt widgets, and search components;
- `.obsidian` settings, plugins, generated JavaScript, or workspace state found inside the content folder;
- unused screenshots, duplicate images, and orphaned media.

The `.obsidian` directory must never be included in the new content collection or public build.

## 6. Minimum launch issue

Do not launch with an empty shell. The minimum credible release contains:

1. Revised “From code completion to architecture” migration.
2. Revised AI visual-novel project/case-study migration.
3. One new short article that represents Tihomir's current work and writing quality.

Recommended new article direction:

**Working title:** “What software for live systems teaches you about delivery”
Scope: lessons about observability, clear ownership, failure modes, testing, and understandable operation under time pressure. Use only public, non-confidential examples. Do not name customers, reveal internal architecture, or invent metrics.

If that topic cannot be written safely from public information, replace it with a transparent “Why I am rebuilding this blog” note describing the editorial standard and what readers can expect.

## 7. Content model

Use Astro's current content-layer API in `src/content.config.ts`, with `glob()` from `astro/loaders` and Zod from `astro/zod`.

Proposed article frontmatter:

```yaml
title: string
description: string
publishedAt: date
updatedAt: optional date
status: draft | published
topics: string[]
featured: boolean
hero: optional local image
heroAlt: optional string
canonicalUrl: optional URL
originalPath: optional string
revisionNote: optional string
sources: optional list of title/url pairs
```

Rules:

- Generate stable slugs from the file path; never include an ordinal prefix in the public URL.
- Validate that published articles have a description, at least one topic, and valid image alt text.
- Keep topics curated and lowercase; begin with `software-engineering`, `leadership`, `ai`, and `experiments` only as content requires.
- Calculate reading time during the build; do not make authors maintain it manually.
- Exclude drafts from pages, feeds, sitemaps, related content, and production builds.
- Keep all article images imported from `src/assets/` where Astro can optimize them. Use `public/` only for files that must retain their exact URL.
- Store source citations as real links near the supported claim; the frontmatter source list is supplementary, not a substitute for inline attribution.

## 8. Information architecture

Version 1 routes:

- `/` — editorial front page with latest article, selected writing, topic entry points, and concise author context.
- `/writing/` — chronological archive of all published articles.
- `/writing/[slug]/` — canonical article routes.
- `/topics/[topic]/` — topic archive generated only for topics in use.
- `/about/` — short explanation of the publication, editorial scope, and link back to the personal site.
- `/rss.xml` — complete feed with absolute URLs.
- `/404.html` — useful static not-found page.
- `/social-card.png` — publication-level fallback social preview.

Navigation:

- `Latest`
- `Writing`
- `Topics`
- `About`
- `Tihomir Selak` linking to the personal site
- RSS icon/link with an accessible text label

Do not add search for the initial three-article launch. Topic and archive navigation are clearer at this scale. Reconsider a fully static client-side search only after the archive is large enough to create a real discovery problem.

## 9. Visual direction

### Concept: a field log for systems under pressure

The blog should feel related to the personal site, not cloned from it. The personal site uses a signal-routing motif; the blog translates that world into a readable field log. Publication dates and revisions sit in a narrow timecode-like margin because chronology is meaningful here. Occasional margin notes hold definitions, sources, or later corrections. The article itself remains calm and generous.

Spend visual boldness on the dated margin and article opening. Avoid decorating every paragraph or turning the interface into a literal broadcast control panel.

Desktop sketch:

```text
┌──────────────────────────────────────────────────────────────────┐
│ Tihomir / Field notes       Latest  Writing  Topics  About  RSS │
├──────────────┬─────────────────────────────────────┬─────────────┤
│ 2026-09-23   │ Article title and precise standfirst│ short note  │
│ revised      │                                     │ or source   │
│ 8 min        │ readable long-form column           │ only when   │
│              │                                     │ useful      │
├──────────────┴─────────────────────────────────────┴─────────────┤
│ Previous / related writing and link to personal site            │
└──────────────────────────────────────────────────────────────────┘
```

On screens below the desktop breakpoint, move date and revision information above the title and place margin notes inline after the paragraph they clarify. Never create a horizontally scrolling article layout.

### Initial design tokens

- `--color-canvas: #F4F7F9` — cool reading background.
- `--color-paper: #FFFFFF` — article surface.
- `--color-ink: #17262E` — primary text.
- `--color-muted: #647680` — metadata and supporting copy.
- `--color-signal: #246B66` — links, active topic, and timing rule.
- `--color-revision: #A7443D` — corrections/revisions only, used sparingly.
- `--color-rule: #C8D3D8` — structural lines.

Typography:

- Use self-hosted `Literata` variable for article prose if rendering tests confirm clear italics and code-adjacent rhythm.
- Use self-hosted `Archivo` variable for navigation, titles, dates, and metadata, creating continuity with the personal site.
- If two variable families materially hurt page weight, keep Archivo for interface/headings and use a carefully tested system serif stack for article prose; do not load a font merely for branding.
- Body copy: 18–20 px, line-height 1.65–1.78, maximum 68 characters.
- Metadata may use tabular numerals. A restrained timecode treatment is justified for real dates; do not put every label in monospace or all caps.
- Code blocks must remain readable at 320 px and scroll only within the block.

Layout and imagery:

- Left-align titles and body copy.
- Keep the central reading measure stable even when optional margins appear.
- Use rules and alignment, not a grid of rounded article cards.
- Home-page article entries may vary in scale based on editorial importance; do not give every item identical weight.
- Prefer diagrams, screenshots, and images that are part of the actual work. Do not generate decorative technology imagery.
- Every image needs dimensions, useful alt text, and an ownership/source decision.

Motion:

- No automatic text reveal, parallax, or staggered cards.
- A small active time marker may respond to article navigation if it remains optional and respects reduced motion.
- Reading must remain complete with JavaScript disabled.

### Design self-critique

A dark terminal-themed publication was rejected because it would reduce long-form readability and resemble many developer blogs. A beige broadsheet with a display serif was also rejected as a common generated editorial style. The cool field-log surface, functional date margin, disciplined two-family type system, and revision color connect directly to Tihomir's live-systems background and to the role of an evolving technical notebook.

## 10. Technical architecture

### Foundation

- Astro 7.3.x or the current stable 7.x patch at implementation time.
- Static output only; no Netlify adapter, SSR, server islands, database, or API routes.
- Node 24 and Yarn 4.9.2, preserving the repository seed.
- Strict TypeScript.
- Astro components, Markdown/MDX, and plain CSS.
- No React/Solid/Vue integration for version 1.

Suggested dependencies:

- `astro`
- `@astrojs/check`
- `@astrojs/mdx`
- `@astrojs/rss`
- `@astrojs/sitemap`
- `typescript`
- `prettier`
- `prettier-plugin-astro`
- `@playwright/test`
- `@axe-core/playwright`

Add a syntax-highlighting or Markdown plugin only when an article demonstrates a concrete need. Prefer Astro's built-in Markdown/code capabilities.

### Proposed structure

```text
src/
  assets/
    articles/
    fonts/
    social/
  components/
    ArticleHeader.astro
    ArticleList.astro
    ArticleMeta.astro
    MarginNote.astro
    SiteFooter.astro
    SiteHeader.astro
    TopicList.astro
  content/
    writing/
      from-code-completion-to-architecture.md
      building-an-ai-visual-story.mdx
      live-systems-delivery.md
  layouts/
    ArticleLayout.astro
    BaseLayout.astro
  pages/
    404.astro
    about.astro
    index.astro
    rss.xml.ts
    topics/[topic].astro
    writing/[slug].astro
    writing/index.astro
  styles/
    global.css
    prose.css
    tokens.css
  content.config.ts
  site.ts
public/
  favicon.svg
  robots.txt
tests/
  accessibility.spec.ts
  articles.spec.ts
  metadata.spec.ts
  rss.spec.ts
astro.config.mjs
playwright.config.ts
tsconfig.json
```

## 11. URL migration and archive strategy

The new domain changes the origin, so migration needs coordination between both new repositories.

1. Record every currently public article URL from the old production build before replacing it.
2. Give each migrated article one clean canonical route on the blog, for example `/writing/from-code-completion-to-architecture/`.
3. Add explicit Netlify redirects in the blog repository for any historical paths that may arrive on the new host.
4. Add cross-domain redirects from old `/post/...` paths to the new blog URLs in the personal-site repository because the old blog currently shares that origin.
5. Use permanent redirects only after the destination article is published and verified.
6. Return a deliberate 410 or helpful archive page for intentionally retired content rather than silently redirecting unrelated pieces to the home page.
7. Keep `astro-blog-2024` unarchived until routes, assets, publication dates, and redirects have been verified in production.

Do not preserve the incorrect `2014` directory segment as part of new canonical URLs. Redirect it if it appears in historical output.

## 12. Implementation phases

### Phase 0 — establish a safe baseline

1. Read this entire plan and all repository instructions.
2. Verify `main` is clean and synchronized with `origin/main`.
3. Create a feature branch such as `feat/blog-foundation` unless direct work on `main` is explicitly requested.
4. Record the passing placeholder build and credential-aware workflow behavior.
5. Do not change or archive `astro-blog-2024`.

Exit criteria: the seed builds, the deploy job skips safely without secrets, and the source archive is untouched.

### Phase 1 — replace the placeholder with Astro

1. Install Astro 7.x and the minimal dependencies listed above.
2. Remove `scripts/build-placeholder.mjs` after Astro builds successfully.
3. Configure `site: 'https://blog.tihomir-selak.from.hr'`, static output, sitemap, MDX, and strict TypeScript.
4. Add scripts for `dev`, `check`, `build`, `preview`, `format`, `format:check`, and `test:e2e`.
5. Regenerate the Yarn lockfile and verify immutable installation on Node 24.

Exit criteria: a minimal local site builds to `dist/` with no runtime server.

### Phase 2 — implement content infrastructure

1. Create `src/content.config.ts` with the modern glob loader and strict schema.
2. Implement published/draft filtering, chronological sorting, topics, related writing, and reading-time calculation.
3. Generate article routes, topic routes, RSS, sitemap, canonical URLs, and structured metadata.
4. Add validation that prevents draft leakage and invalid published frontmatter.

Exit criteria: fixture posts generate correct pages and feeds, and drafts are absent from production output.

### Phase 3 — build the editorial design

1. Implement tokens, reset, self-hosted fonts, prose styles, focus states, skip link, and reduced-motion rules.
2. Build the field-log header, date margin, article layout, archive, topic view, about page, footer, and 404.
3. Test at 320, 390, 768, 1024, and 1440 px before migration content is added.
4. Ensure footnotes, tables, blockquotes, code, headings, lists, images, captions, and long URLs cannot break the layout.

Exit criteria: the publication shell is distinctive, readable, keyboard usable, and stable across target widths.

### Phase 4 — migrate and edit launch content

1. Copy only the two approved source posts into the new content model.
2. Preserve original publication dates and add accurate 2026 revision dates/notes.
3. Rewrite against the briefs in section 5; do not mechanically polish the old text.
4. Verify every time-sensitive tool statement and external claim.
5. Copy only used media; optimize it, write alt text, and document ownership/source.
6. Rebuild or intentionally defer the interactive turtle story using the quality gate above.
7. Draft the third current article from verified, non-confidential material and obtain user approval for its claims before publication.
8. Keep all three as drafts until the user has reviewed the prose.

Exit criteria: at least two migrated drafts and one new draft render correctly, with no unverified public claims.

### Phase 5 — discovery, metadata, and resilience

1. Add publication and per-article Open Graph/Twitter metadata.
2. Generate a 1200 × 630 fallback social image and article-specific images only where they add value.
3. Add `BlogPosting` JSON-LD to articles and `Person`/`WebSite` data only from public facts.
4. Add RSS autodiscovery, favicon, robots policy, sitemap, and useful 404.
5. Add tested security headers in `netlify.toml` without breaking Astro assets, fonts, images, or MDX.
6. Create the explicit redirect map, but do not enable cross-domain production redirects until both sites are live.

Exit criteria: metadata, feed, sitemap, and redirect tests pass against the production build.

### Phase 6 — automated and editorial verification

Add automated checks for:

- one clear `h1` and correct landmark/heading structure;
- chronological archive order;
- topic membership and links;
- published/draft separation;
- canonical URL, description, social metadata, and JSON-LD;
- valid RSS with absolute URLs;
- previous/next or related-writing behavior;
- image dimensions and non-empty alt text where appropriate;
- no horizontal document overflow at target widths;
- keyboard-visible focus and skip-link behavior;
- automated axe scan with no serious or critical violations;
- a useful 404 response.

Manual review:

- full read-through for voice, repetition, spelling, unsupported claims, and stale links;
- keyboard-only navigation and 200% zoom;
- JavaScript-disabled article reading;
- desktop and mobile screenshot critique;
- Lighthouse on production preview, targeting at least 95 in Performance, Accessibility, Best Practices, and SEO while prioritizing real defects over the score.

Exit criteria: technical checks pass and the user has approved each launch article for publication.

### Phase 7 — CI and documentation

1. Update the quality job to run immutable install, formatting, Astro check, build, browser setup, and Playwright/axe smoke tests.
2. Preserve the production deploy guard for missing Netlify credentials.
3. Update the README with local workflow, content authoring, editorial checks, image handling, draft behavior, and deployment.
4. Document how to add an article without touching layout code.
5. Confirm GitHub Actions passes while deployment remains skipped.

Exit criteria: another coding agent or developer can add and verify an article using repository documentation alone.

### Phase 8 — local visual critique

1. Run the production preview.
2. Capture the homepage, archive, and both migrated articles at 1440 × 1000 and 390 × 844.
3. Review hierarchy, reading width, line height, date-margin usefulness, images, captions, and end-of-article navigation.
4. Remove any motif that competes with reading.
5. Confirm the blog feels like the same person as the personal site without looking like the same template.

Exit criteria: the site is locally ready for Netlify setup and user editorial approval.

## 13. Deferred Netlify and DNS phase

When the user is ready:

1. Import `Tihi321/tihomir-selak-blog-2026` into Netlify.
2. Set build command `yarn build` and publish directory `dist`; a static Astro blog needs no Netlify adapter.
3. Add GitHub Actions secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
4. Deploy and verify the temporary Netlify URL before adding DNS.
5. Create `blog.tihomir-selak.from.hr`, attach it to the Netlify site, and verify HTTPS.
6. Publish the reviewed launch issue.
7. Enable tested redirects from the personal-site origin.
8. Check RSS, sitemap, canonical URLs, social previews, headers, and every historical redirect in production.
9. Archive `astro-blog-2024` only after a backup/tag exists and the migration checklist is complete.

Never place credentials in the repository, plan, committed `.env` files, logs, article source, or screenshots.

## 14. Acceptance criteria

The local implementation is complete when:

- Astro 7.x builds a fully static site to `dist/`.
- The old placeholder script and old framework components are absent.
- The homepage, writing archive, article routes, topic routes, about page, RSS, sitemap, and 404 work.
- At least two historical articles have been substantially revised and migrated as drafts.
- At least one current article exists as an approved draft or an explicitly tracked editorial approval item.
- No unreviewed historical article is publicly included merely because it existed before.
- Drafts do not appear in production pages, feeds, or sitemaps.
- Original and revised dates are represented honestly.
- Scientific, industry, and product claims are sourced and current, or removed.
- All used media has an ownership/source decision, dimensions, optimization, and appropriate alt text.
- Articles remain readable without JavaScript and at 200% zoom.
- No horizontal overflow occurs at 320, 390, 768, 1024, or 1440 px.
- Keyboard navigation, visible focus, reduced motion, and automated accessibility checks pass.
- Canonical URLs, social metadata, JSON-LD, RSS autodiscovery, favicon, robots, and sitemap are present.
- Historical-path behavior is documented and covered by redirect tests.
- `yarn install --immutable`, `yarn format:check`, `yarn check`, `yarn build`, and `yarn test:e2e` pass.
- GitHub Actions passes without Netlify credentials and safely skips deployment.
- No confidential employer/customer information or invented result is present.

## 15. Execution prompt for Codex or another coding agent

Run from the repository root:

```text
Implement the complete plan at .codex/tickets/blog-site-2026/plan.md. Read the whole plan and all applicable repository instructions before editing. Work phase by phase and preserve the credential-aware Netlify workflow. Use the frontend-design skill for the visual implementation. Treat C:\projects\Personal\astro-blog-2024 as read-only migration source: do not bulk-copy it, do not archive it, and migrate only the articles explicitly approved by the plan. Keep migrated and new launch articles as drafts until the user reviews their prose. Do not publish confidential TrackMen/Pixotope material or invent metrics. Build and verify everything locally; Netlify credentials, DNS, production publication, cross-domain redirects, and archival of the old repository are out of scope. Capture desktop and mobile screenshots for the final design critique and run every verification command named in the plan.
```

If the environment provides the global `implement` skill, invoke it with this complete plan file as required by the machine instructions.

## 16. Approval gates that do not block the local build

Ask the user before:

- changing a migrated draft from `draft` to `published`;
- stating that historical prose was or was not AI-assisted;
- publishing a current-work article whose claims have not been reviewed by the user;
- using an employer/product screenshot, logo, internal architecture, customer name, or metric;
- enabling analytics, comments, newsletter signup, third-party embeds, or a contact form;
- enabling permanent cross-domain redirects;
- archiving either old blog repository;
- publishing scientific or medical claims without appropriate review.

## 17. Platform references

- [Astro 7 release](https://astro.build/blog/astro-7/)
- [Astro 7.3 release](https://astro.build/blog/astro-730/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro RSS guide](https://docs.astro.build/en/recipes/rss/)
- [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Astro image guide](https://docs.astro.build/en/guides/images/)
- [Astro testing guide](https://docs.astro.build/en/guides/testing/)
- [Deploying a static Astro site to Netlify](https://docs.astro.build/en/guides/deploy/netlify/)

## 18. Local implementation record — 24 September 2026

### Completed locally

- [x] Replaced the placeholder with a static Astro publication on the `feat/blog-foundation` branch.
- [x] Added a validated writing collection, publication filtering, archive/topic pages, article metadata and JSON-LD, RSS, robots, sitemap, a 1200 × 630 PNG social fallback, favicon, 404, and security headers.
- [x] Migrated and substantially revised the two selected historical posts as drafts, preserving their frontmatter publication dates in January 2024 and recording September 2026 revision dates. No legacy media was copied; the interactive story is deferred because asset rights and accessibility are unresolved.
- [x] Added the new publication-intent article as a draft. It contains no proprietary work examples and is not represented as user-approved final prose or an approved AI-use disclosure.
- [x] Added a dev-only local draft preview. Drafts and temporary navigation fixtures are excluded from production page paths, feeds, topic/archive lists, related writing, and sitemap output. Temporary e2e fixtures are byte-checked and removed by global teardown.
- [x] Documented the legacy route map without activating redirects; `astro-blog-2024` remains untouched and unarchived.
- [x] Added README authoring and local-review instructions, CI checks with a credential-aware deployment guard, and desktop/mobile screenshots under `review-images/`.
- [x] Added an informative zero-published homepage state with editorial themes and an About link; it does not expose draft titles or imply that a piece has been published.

### Verification results

- [x] `yarn install --immutable` — passed; Yarn reports peer-dependency warnings (see note below).
- [x] `yarn format:check` — passed.
- [x] `yarn check` — passed with 0 errors, warnings, or hints.
- [x] `yarn build` — passed; 5 production pages/routes generated, with no draft-preview route and no draft prose in production HTML or RSS.
- [x] `yarn test:e2e` — 4/4 Playwright tests passed, including production draft exclusion, local draft preview, metadata/RSS, article navigation inside `<main>`, width checks at 320/390/768/1024/1440 px, and axe checks with no serious/critical violations.
- [x] Visually reviewed refreshed home screenshots at 1440 × 1000 and 390 × 844, and earlier article screenshots at the same sizes. Screenshot files are in `review-images/`.

### Deviations and remaining approval gates

- Astro/Rolldown emits a non-fatal `MODULE_LEVEL_DIRECTIVE` warning for the generated MDX `use astro:head-inject` directive. It did not prevent checks or the static build.
- Local checks do not include a Lighthouse run, a manual 200% zoom review, a JavaScript-disabled browser run, a live GitHub Actions run, Netlify credentials/site, DNS, deployment, or a production redirect test. These remain unverified/deferred, not claimed as passed.
- All three articles remain `draft`. User review is required before any prose or current-work claims are approved, before an accurate AI-use disclosure is chosen, and before changing status to `published`.
- Tracked draft Markdown remains readable to anyone who can read the Git repository. Do not push this branch while prose is unapproved unless the user explicitly accepts source-visible drafts or chooses a private repository.
- The branch is local and uncommitted pending final review/corrections. Do not push, deploy, activate cross-domain redirects, or archive the legacy repository as part of this task.
