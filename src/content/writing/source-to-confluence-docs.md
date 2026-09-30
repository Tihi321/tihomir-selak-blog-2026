---
title: "API docs from source to Confluence"
description: "Why I built tooling in 2026 that reads API documentation from source code and publishes formatted pages to Confluence."
publishedAt: 2026-09-30
status: published
topics: [documentation, developer-tools]
featured: false
---

In 2026 I started building a tool that reads API documentation out of source code and publishes it as formatted pages in Confluence. It handles TypeScript, JavaScript, Python, Rust and C++.

## The problem

Documentation written by hand in a wiki goes stale. The code changes in a pull request, and the page describing it changes later or never. Readers can’t tell which pages are still accurate, so they stop trusting all of them.

The most accurate description of an API already exists in the code, next to the thing it describes. Comments are reviewed together with the change that affects them. What’s missing is a way to put that text in front of people who read Confluence.

## What I built and why

The tool parses the documentation in the source files and turns it into pages. The same run publishes those pages to Confluence. Nobody copies anything by hand, so there is one place to edit, which is the code.

Supporting several languages was deliberate. A product built from parts in different languages has readers who shouldn’t need to know which language sits behind an API. A common page format gives them one shape to learn.

I used Confluence because that is where readers already go. Asking them to visit a new site would add a step for no benefit. Publishing into the existing tool means the generated pages sit among the pages people already use.

Parsing has its own difficulties. Each language has its own comment conventions and its own idea of what a type is, so the tool has to read each one on its own terms and then present the results in a consistent layout. For a reader, the consistent layout matters more than the parsing behind it.

## What I take from it

Generated documentation is only as good as the comments it reads. The tool doesn’t write explanations. It makes the ones already in the code easy to find, and it makes a missing one easy to see.

That is a modest claim, and I think it’s the right size for this kind of tool.
