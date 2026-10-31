# Manuaelly

A personal website built with Astro and hosted on GitHub Pages. Notes, games, and experiments share one chronological list, filtered by type.

## Development

Requires Node.js 24.

```sh
npm ci
npm run dev
```

Open http://localhost:4321. `npm run build` checks types and generates `dist/`. `npm run preview` previews that production build.

Use `npm run format` to format source files with Prettier, or `npm run format:check` to check formatting without changing files.

## Add an entry

Create `src/content/entries/my-entry.md`:

```md
---
title: "Something I learned"
description: "A short summary for the list."
date: 2026-10-31
type: note
tags: [JavaScript]
---

Write in Markdown here. Include images, code, and explanations.
```

- `type` is `note`, `game`, or `experiment`. It only sets the label and filter; all types use the same layout and support the same fields.
- Entries automatically appear on the homepage, newest first.
- The default URL is `/entries/my-entry/`.
- Optional `permalink: custom/path` overrides the URL. Avoid paths used by other pages or redirects.
- Put images in `public/images/` and reference them as `/images/filename.png`.
- Header filters appear only for types that have entries. They are shareable, e.g. `/?type=experiment`, and support browser back/forward. Without JavaScript, all entries remain readable.

## Games and interactive entries

The same Markdown file can include optional fields:

```yaml
type: game
status: Prototype
cover: /images/my-game.png
playUrl: /builds/my-game/index.html
controls: "Arrow keys to move. Space to jump."
```

Put the browser build in `public/builds/my-game/`, using relative asset paths inside the build. `playUrl` embeds it and adds an open-in-new-tab link. Alternatively, use `externalUrl: https://your-name.itch.io/your-game` for a play/download link. Status can be `Prototype`, `In progress`, or `Finished`.

Godot web exports need testing: use a non-threaded export compatible with ordinary static hosting. GitHub Pages cannot set the isolation headers needed by some threaded exports. Use a suitable game host for incompatible or very large builds.

For the built-in Game of Life component, use `interactive: game-of-life`. To add another custom interactive component, add its identifier to `src/content.config.ts` and render it conditionally in `src/pages/[...slug].astro`. This keeps its written content and metadata in the same collection as everything else.

## Structure

- `src/content/entries/`: all Markdown content
- `src/content.config.ts`: entry schema and required fields
- `src/pages/index.astro`: mixed list and type filters
- `src/pages/[...slug].astro`: shared entry layout
- `src/components/Life.astro`: Game of Life
- `src/layouts/Base.astro`: shared header, type filters, metadata
- `src/styles/global.css`: colours, typography, responsive layout
- `public/fonts/ibm-plex-mono/`: self-hosted regular and bold fonts, with their license
- `public/`: static files copied into the build

The existing URLs `/Funnel-notifications/` and `/experiments/game-of-life/` are preserved. Old section URLs (`/notes/`, `/games/`, `/experiments/`) redirect to homepage filters. On static GitHub Pages hosting these are HTML redirects, not server-side HTTP redirects.

## Deployment

Set repository **Settings → Pages → Source** to **GitHub Actions**. Pushing to `main` runs `.github/workflows/pages-deploy.yml` to install, check, build, and deploy `dist/`. Local edits do not publish anything.

## Generated files

`node_modules/`, `dist/`, and `.astro/` are generated and ignored by Git. Do not edit them. Dependencies can be restored with `npm ci`; the build recreates the generated website and Astro types.

The old Jekyll source and theme submodule have been removed. Historical tracked files remain available in Git history. All current website content lives in `src/` and `public/`.
