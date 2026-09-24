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

## Draft review

Draft articles are available only from the local development server:

- `http://localhost:4321/draft-preview/from-code-completion-to-architecture/`
- `http://localhost:4321/draft-preview/building-an-ai-visual-story/`
- `http://localhost:4321/draft-preview/why-rebuilding-this-blog/`

The `status: draft` filter excludes draft posts from production pages, feeds, topics, related writing, and the sitemap. The article sources remain ordinary files in this Git repository. If the repository is public, anyone who can read it can also read draft Markdown; the draft flag does not make source private. Do not push or publish unapproved prose without the user's explicit decision.

## Add an article

Create a Markdown or MDX file under `src/content/writing/` with frontmatter for `title`, `description`, `publishedAt`, `status`, `topics`, and `featured`. Optional fields include `updatedAt`, `hero`, `heroAlt`, `canonicalUrl`, `originalPath`, `revisionNote`, and `sources`. Use a stable, descriptive filename without an ordinal prefix. Keep topics lowercase and hyphenated. Add source links near the claims they support. Set `status: published` only after editorial approval; frontmatter validation requires published pieces to have at least one topic and validates image alt text when an image is used.

Article images belong in `src/assets/` so Astro can process them. Record ownership and credit before including any media. Do not add private research notes, CV source files, or confidential work material to this repository.

## Editorial boundaries

The two historical posts are substantially revised but remain drafts. No legacy media is copied because reuse rights are unresolved. The interactive visual-story version is deferred. A third draft explains the intent behind the publication. Draft content is not an indication that the author approved final prose or any AI disclosure.

Old public builds contained `/post/2014/the-invisible-helper/` and `/post/2014/the-turtle-story/`, with topic routes `/blog/ai/`, `/blog/storytelling/`, and `/blog/programming/`. Route mapping is recorded in `.codex/tickets/blog-site-2026/redirects.md`; redirects are inactive until both destinations are published and verified. The old `astro-blog-2024` repository remains read-only and is not archived.

## Deployment

The workflow checks formatting, Astro content, the static build, and Playwright/Axe browser checks. Production deployment remains on the `main` branch and skips safely until both `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are configured. DNS, cross-domain redirects, publication, and repository archival require separate review.
