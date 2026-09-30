---
title: "A desktop tool for watching message traffic"
description: "Why I built a Tauri, React and Rust desktop app in 2023 for watching, filtering and debugging ZeroMQ traffic."
publishedAt: 2026-09-30
status: published
topics: [developer-tools, rust]
featured: false
---

In 2023 I started a desktop application for looking at ZeroMQ traffic. It is built with Tauri, React and Rust, and it lets me watch messages, filter them and debug what I see.

## The problem

Message-based systems are hard to reason about from the outside. When components talk over a messaging layer, a bug often shows up far from its cause. A value is wrong on screen, and the question is whether it was sent wrong, never sent, sent twice, or sent to the wrong place. Logs in each component help, but they show one side at a time.

What I wanted was a place to look at the traffic itself, with enough filtering to cut out everything I wasn’t asking about.

## What I built and why

The tool shows the messages as a stream that I can narrow down. Filtering was the feature I cared about most. Raw traffic is only useful while you can still read it, and a busy stream stops being readable quickly.

I chose Tauri because a desktop tool should be light, and because it let me write the interface in React, which I already knew well. The messaging side is written in Rust. That split suits the job. The interface is the part that changes often, and the code that deals with the messages is the part where I want a strict compiler.

It was also a good place to work with Rust on something with a clear edge. A single-purpose tool gives you a small surface to learn on. You can try an approach, find it awkward, and change it without touching anything else.

A debugging tool has a particular risk: it can change what it observes. A debugging tool can change what it observes, and a tool that only looks is easier to trust than one that also acts.

## What I take from it

Small tools that answer one question tend to earn their place. When I’m unsure what is being said between parts of a system, looking at the messages settles the argument faster than reading code and guessing.

I also think a good filter is a design problem more than a technical one. The matching is easy to write. Deciding what a person most wants to hide takes longer.
