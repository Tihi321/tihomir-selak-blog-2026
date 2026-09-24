---
title: "From code completion to architecture"
description: "A look back at how AI-assisted coding changed the questions I asked while learning and building software."
publishedAt: 2024-01-02
updatedAt: 2026-09-24
status: draft
topics: [ai, software-engineering]
featured: true
originalPath: /post/2014/the-invisible-helper/
revisionNote: "Substantially revised in 2026 from the original January 2024 essay."
---

In early 2024 I was trying to describe a change in my development workflow. The most useful shift was not that a tool could produce a block of code. It was that I could spend more of a conversation deciding what the code should do, how the pieces should fit, and what I needed to verify.

## From answers to decisions

I first used chat assistants to work through individual programming questions. That was useful for getting unstuck, especially when I was learning a library or language. But a plausible answer is not the same as a sound design. I still had to compare the suggestion with the surrounding code, test the behavior, and decide whether it belonged in the project.

As coding assistants became part of my editor, I began using them earlier in the process: to outline a small change, explore unfamiliar syntax, or identify the files that might be involved. That made architectural questions more visible. What owns this behavior? Which boundary should change? What will make the result easier to maintain?

## Learning by building

One example from that period was starting to use Rust in a project where I had not previously worked in the language. AI assistance lowered the friction of looking up syntax and exploring an unfamiliar toolchain. It did not remove the need to understand ownership, error handling, concurrency, or the conventions of the codebase. I still needed to read, compile, test, and revise the result.

The same confidence affected a personal project. I began with SolidStart, then moved to Astro when the project’s needs and the framework’s maturity made a static site a better fit. Trying a different framework felt more manageable when I could ask focused questions as I worked. The important decision was still the fit between the tool and the project, not the assistant’s ability to generate a component.

## What I take from it now

I treat generated code as a proposal that needs context and review. I try to provide the relevant constraints, ask for a small change, and check the result against the system rather than accepting it because it reads well. For unfamiliar areas, I use the exchange to create a map of what to learn next, then verify that map against the code and documentation.

That is a narrower claim than saying AI makes software development effortless. It can help me explore an unfamiliar problem, but responsibility for the design, correctness, and maintenance stays with the engineer.

## Editor’s note

Originally published on 2 January 2024 and substantially revised in September 2026. This version narrows the subject to software development, removes time-sensitive product and availability claims, and replaces broad predictions with a more limited account of the workflow change.
