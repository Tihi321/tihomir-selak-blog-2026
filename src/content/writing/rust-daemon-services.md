---
title: "Bringing Rust into our service layer"
description: "Why I started using Rust at Pixotope in 2023, and what building daemon services and Tauri tooling taught me."
publishedAt: 2026-09-30
status: draft
topics: [rust, software-engineering]
featured: false
---

I started using Rust at Pixotope in 2023. Before that my daily languages were TypeScript and JavaScript. Later that year I started a set of daemon services in Rust, with Tauri tooling built alongside them.

## The problem

Some jobs don’t suit a front-end application. A daemon runs in the background and has to keep working whether or not anyone is looking at it. The services I worked on cover platform concerns such as network discovery, disk access and metadata.

Code like that has a different cost of failure. A crash in a background service can go unnoticed until something that depends on it stops working. For that kind of code I wanted a language that makes careless mistakes harder to write.

## What I chose and why

Rust fits that description. Ownership and the type system push many errors to compile time, and error handling is explicit instead of something you can forget. I was new to the language, so I expected to spend a lot of time arguing with the compiler. The useful part is that it explains itself. Much of what I know about the ownership model came from being corrected.

Tauri came in for the tooling. It lets me put a desktop interface on Rust code, written with web skills I already have. For a service that normally runs out of sight, having a way to build a window onto it is convenient.

I also used AI assistance for syntax and toolchain questions. It lowered the friction of starting, but it didn’t replace reading the code and understanding why it compiled.

## What I take from it

Learning a language on real work is slower at first and pays back later. Ownership is hard to appreciate from a tutorial, and much easier to appreciate when a service has to run for a long time without attention.

I still write more TypeScript than Rust. What has changed is how I read my own TypeScript. I find myself asking who owns this data, and what happens when this call fails.
