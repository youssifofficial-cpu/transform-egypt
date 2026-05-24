---
name: run-transform-egypt
description: Run, screenshot, and interact with the TransforM Egypt Vite+React frontend. Use when asked to start, build, test, screenshot, or demo the TransforM Egypt beauty website.
---

# run-transform-egypt

TransforM Egypt is a luxury bilingual (EN/AR) beauty website — React 19 + Vite 7 + Tailwind 4. The driver at `.claude/skills/run-transform-egypt/driver.mjs` starts the Vite dev server, launches a headless Chromium (via the global Playwright install), and provides commands for screenshots, smoke tests, form interactions, and language toggle.

All commands below were verified in this container. **Paths in this file are relative to `artifacts/transform-egypt/`.**

---

## Prerequisites

```bash
# Playwright is pre-installed globally — no install needed:
ls /opt/node22/lib/node_modules/playwright   # should exist

# Install workspace deps from repo root (if not done):
cd /home/user/transform-egypt && pnpm install
```

No `xvfb-run` needed — the driver runs Chromium in `headless: true` mode.

---

## Build

```bash
# From repo root:
pnpm --filter @workspace/transform-egypt run build
# → produces artifacts/transform-egypt/dist/public/ with HTML, sitemap.xml, robots.txt
```

---

## Run (agent path — use this first)

The driver lives at `.claude/skills/run-transform-egypt/driver.mjs` (relative to `artifacts/transform-egypt/`). Run it with `node`:

```bash
cd /home/user/transform-egypt/artifacts/transform-egypt

# Smoke test all routes (returns exit 0 on success):
node .claude/skills/run-transform-egypt/driver.mjs smoke

# Screenshot homepage → /tmp/transform-homepage.png:
node .claude/skills/run-transform-egypt/driver.mjs screenshot / /tmp/transform-homepage.png

# Screenshot any route:
node .claude/skills/run-transform-egypt/driver.mjs screenshot /boutique /tmp/boutique.png

# Fill and submit the booking form (screenshots to /tmp/transform-form-*.png):
node .claude/skills/run-transform-egypt/driver.mjs form

# Toggle Arabic RTL and screenshot (→ /tmp/transform-arabic.png):
node .claude/skills/run-transform-egypt/driver.mjs lang
```

The driver starts a Vite server on port 5174 (separate from any running dev server on 5173), drives it, then kills the server when done.

---

## Run (human path)

```bash
cd /home/user/transform-egypt/artifacts/transform-egypt
pnpm run dev
# → http://localhost:5173
```

---

## Gotchas

**`chromium-browser` apt package fails to install** — `apt-get install chromium-browser` fails in this environment due to missing `apparmor` package. Use the globally pre-installed Playwright instead: `/opt/node22/lib/node_modules/playwright`. The driver imports from there directly.

**`import.meta.env` in library packages** — `lib/api-client-react/src/index.ts` references `import.meta.env`. This is fine for Vite (which replaces it at build time) but causes a TypeScript error if compiled by tsc in a non-Vite context. Keep this file Vite-only.

**Port 5173 may be in use** — the driver uses port 5174 to avoid collisions. The human `pnpm run dev` uses 5173.

**Hero text doesn't switch to Arabic** — the Hero section has EN text in JSX rather than using the `t()` i18n function. The navbar, footer, and all other sections do switch correctly. This is intentional (the hero copy was not yet translated); fix by replacing hardcoded strings in `src/pages/Home.tsx` Hero component with `t("hero.*")` calls and adding entries to `src/lib/i18n.tsx`.

**Arabic RTL — layout not fully RTL** — the `document.dir = "rtl"` toggle is applied, but individual CSS styles use inline `margin-left`/`right` which don't flip automatically. Full RTL support requires switching to logical CSS properties (`margin-inline-start` etc.) or using Tailwind's `rtl:` variant.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `ERR_UNSUPPORTED_DIR_IMPORT` for playwright | The driver must import `playwright/index.js`, not the directory. Already fixed in driver.mjs. |
| `Cannot find module '/opt/node22/lib/node_modules/playwright/index.js'` | Run `npm install -g playwright` to install globally |
| `Error: listen EADDRINUSE :::5174` | Kill the existing server: `pkill -f "vite"` |
| `Server start timeout` | Increase the `30_000` timeout in `startServer()`, or run `pnpm install` first |
| Build fails: `Cannot find module 'react-router-dom'` | Run `pnpm install` from the repo root |
| `import.meta.env` TS error in lib packages | See Gotchas above |
