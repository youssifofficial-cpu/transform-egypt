# CLAUDE.md

Project guide for Claude Code sessions working in this repo.

## Project

TransforM Egypt — a Next.js 14 website for a luxury beauty/transformation
services brand. Bilingual (English / Arabic) with full RTL support.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom luxury design tokens (see
  `tailwind.config.js`)
- **i18n**: `next-intl` for EN/AR — never hardcode user-facing copy in
  components; add strings to the message catalogs
- **State / forms**: Zustand, React Hook Form + Zod
- **UI**: Radix UI primitives, `lucide-react` icons, Framer Motion,
  `embla-carousel`
- **Images**: remote patterns whitelisted in `next.config.js`
  (`images.unsplash.com`, `cdn.transformegypt.com`)

## Commands

| Task          | Command              |
| ------------- | -------------------- |
| Dev server    | `npm run dev`        |
| Production build | `npm run build`   |
| Start built app  | `npm start`       |
| Lint          | `npm run lint`       |
| Type-check    | `npm run type-check` |

Before pushing, run **both** `npm run lint` and `npm run type-check`.

## Deployment

- **Vercel** is primary — `vercel.json` pins the `fra1` region with
  `buildCommand: npm run build`.
- **Netlify** is configured as a fallback via `netlify.toml` with
  `@netlify/plugin-nextjs`.

## Conventions

- App Router layout under `app/`; shared UI under `components/`; helpers
  under `lib/`. Some of these directories may not exist yet — check before
  assuming a path.
- All copy goes through `next-intl` catalogs. RTL must keep working for AR.
- Tailwind design tokens (colors, spacing, fonts) live in
  `tailwind.config.js`. Reuse tokens instead of one-off values.
- TypeScript is strict; no `any` unless justified in a comment.

## Working in Replit

If you're running Claude Code from a fresh Replit shell:

```bash
bash setup-claude-code.sh   # installs Claude Code CLI
claude                       # start a session (interactive login the first time)
```

For non-interactive auth, set `ANTHROPIC_API_KEY` in Replit's **Secrets**
tab and reopen the shell. Full notes are in `setup-claude-code.sh`.

## Files to know

- `next.config.js` — image remote patterns, framework config
- `tailwind.config.js` — design tokens
- `vercel.json` / `netlify.toml` — deployment configs
- `package.json` — scripts and dependencies
