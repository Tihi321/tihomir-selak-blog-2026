# Tihomir Selak — blog

Source for Tihomir Selak's long-form writing at [blog.tihomir-selak.from.hr](https://blog.tihomir-selak.from.hr/).

This repository currently contains a CI-ready placeholder and a local implementation plan. The production site will be a static Astro publication focused on software engineering, technical leadership, practical AI work, and selected creative experiments.

## Local checks

```text
corepack enable
yarn install --immutable
yarn check
yarn build
```

The temporary build writes deployable output to `dist/`.

## Deployment

Pushes and pull requests targeting `main` run the quality job. A successful push to `main` deploys through the pinned official Netlify CLI only after `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are configured as GitHub Actions secrets.

The old `astro-blog-2024` repository remains the migration source until selected articles and assets have been reviewed, revised, and verified in this repository.
