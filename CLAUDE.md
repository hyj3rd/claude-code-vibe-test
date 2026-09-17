# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a small sandbox of static web pages — plain HTML/CSS/JS with no build tooling, package manager, framework, or test suite. Each top-level directory is an independent, self-contained page (its own `index.html`, `style.css`, and optionally `main.js`); there is no shared code, bundler, or dependency between them.

## Development

There is no install, build, lint, or test command. To view a page, open its `index.html` directly in a browser (or use a simple static file server if live-reload is needed).

## Structure

- `hello-world/` — minimal HTML/CSS example page.
- `profile/` — self-introduction card page (HTML/CSS/JS), purple-themed, centered card layout with an emoji avatar and a click interaction in `main.js`.

When adding a new page, follow the existing pattern: create a new top-level directory with its own `index.html`, `style.css`, and `main.js` (only if interactivity is needed) — do not introduce a build step or cross-directory imports.
