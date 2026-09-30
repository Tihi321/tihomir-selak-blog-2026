---
title: "Testing without the hardware"
description: "Why I built Node.js and TypeScript device simulators at Pixotope starting in 2025, and what simulating hardware is good for."
publishedAt: 2026-09-30
status: draft
topics: [testing, developer-tools]
featured: false
---

In 2025 I started building simulators for devices that our software works with. They are written in Node.js and TypeScript, and they are used in development and testing.

## The problem

Testing against real hardware means relying on equipment that is in a particular room, configured a particular way, and possibly in use by someone else. Video routers and control hardware are good examples. You can’t easily run them in a build pipeline, and you can’t ask one to fail on cue so you can see how your code copes.

That limits what gets tested. Happy paths get checked on the real thing, and unusual ones often don’t get checked at all.

## What I built and why

A simulator stands in for a device. It behaves the way the device does, keeps some state, and responds to what it is sent. I built mine as a Node.js and TypeScript monorepo, because the rest of the software is in that stack and the same people can read and change them.

The work included simulator logic, a UI, documentation and the build setup. The UI matters. Being able to see what a simulated device is doing while it runs makes it much easier to understand a failure. Documentation and a working build mean another developer can start one without asking me.

There is a limit here. A simulator reflects what I understood about the device when I wrote it. If the real hardware behaves differently from my reading of its documentation, the simulator will be wrong in the same way, and tests that pass against it give false comfort. It is a fast first check, not a replacement for testing against the real device.

That trade-off is still worth making. Many bugs don’t depend on a device’s quirks. They depend on my own code handling a disconnect, a slow reply or an unexpected value, and a simulator lets me provoke those whenever I want.

## What I take from it

A simulator is a model, and a model is useful to the degree that you remember what it leaves out.

Building one also means reading a device’s documentation much more closely than I would to use the device. You can’t simulate behavior you haven’t understood.
