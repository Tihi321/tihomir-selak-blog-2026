---
title: "Python services and the tooling to ship them"
description: "Why I added Python services and their packaging and build tooling at Pixotope starting in 2024, and what the packaging side involves."
publishedAt: 2026-09-30
status: published
topics: [python, software-engineering]
featured: false
---

In 2024 I started adding Python services at Pixotope, along with the tooling to package and build them. In the same period I was working through a Python Developer program, which I completed in February 2025.

## The problem

A service that runs on its author’s machine is only half a service. Someone else has to install it, on a machine with a different setup, and it has to start. With Python this is a real question. The interpreter, the dependencies and the operating system all vary, and a script that works for its author can fail for everyone else.

My background is mostly JavaScript and TypeScript, where I knew how to ship things. Python needed its own answer.

## What I built and why

I treated packaging and builds as part of the service from the beginning. The first milestone was a working build that someone else could run, before the service had much functionality. That order can feel backwards. Its advantage is that it exposes assumptions about the environment while they are still cheap to change.

I prefer services that are small and have one job each. A small Python service is easy to read, easy to test and easy to replace, and I value those properties more than a clever structure.

I also keep the build tooling next to the services it builds. Separating them leads to a service that can’t be built without hunting for the right script.

The course and the work complemented each other. A structured program covers parts of a language that hands-on work skips, and work supplies real problems to apply it to.

## What I take from it

The code is usually the smaller part of getting a service into use. The rest is packaging, builds and instructions for running it, and that part deserves the same care as the feature.

Coming from other languages, I found that some habits transfer well. Small modules and tests next to the code are the same in any language. Others don’t, such as assuming the dependency tree will look the same on the next machine.
