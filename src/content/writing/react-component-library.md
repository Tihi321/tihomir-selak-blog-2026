---
title: "Starting a shared React component library"
description: "Why I started a reusable React and TypeScript component library at Pixotope in 2021, and what keeping one going involves."
publishedAt: 2026-09-30
status: draft
topics: [frontend, software-engineering]
featured: false
---

In 2021 I started a reusable React component library at Pixotope. I started it and have stewarded it since.

## The problem

Several React applications tend to grow the same pieces on their own: buttons, inputs, menus, dialogs. Each copy begins as a reasonable shortcut. Over time the copies drift. One handles keyboard focus and another doesn’t. One uses the current spacing and another keeps an older layout. Fixing a bug means finding every place it was copied, and nobody can be sure they found them all.

A shared library doesn’t remove that work. It moves it to one place, where a fix can be made once and reviewed properly.

## What I built and why

I built the library in React and TypeScript and documented it with Storybook. Storybook matters more than it first appears. A component that only exists inside an application is hard to look at by itself, so its states get tested by accident. In a story I can render the disabled, empty, loading and error versions next to each other without clicking through a product.

I also chose to publish the library as versioned package releases. A version number lets consumers decide when to take a change. It also forces me to think about what counts as a breaking change, which is a useful discipline on its own. Renaming a prop is a one-line edit in the library and a migration for everyone downstream.

TypeScript carries a lot of the contract. Props describe what a component accepts, and the compiler tells a consumer when an upgrade changed something. That catches a class of mistakes before anyone opens a browser.

Scope is the hardest decision. A component belongs in a shared library when several screens need it and its behavior can be described without knowing which screen it sits on. Anything that has to know about one particular view belongs in the application. The line is easy to state and hard to hold, and deciding which side a component falls on is a recurring judgment call.

## What I take from it

Starting a library is the smaller job. Stewarding it is the larger one. It needs someone to review additions, say no to components that are really one-off screens, write release notes, and keep the stories honest as the code changes.

I treat the stories as part of the product. When a story is out of date, people stop trusting it, and a library nobody trusts gets copied from instead of used.
