# Apple Wallet PM Portfolio -- Agent Onboarding (Template)

This is a scaffolding template for any AI agent working in a fork of this codebase. Copy this file to `AGENTS.md` and fill in the sections marked `[FILL IN]` to match your own project context.

The real `AGENTS.md` used during development is gitignored. This template preserves the structure without exposing the author's private workflow, build state, or session history.

---

## What this project is

A single-page interactive portfolio website that holds twelve final portfolio assignments from a Strategic Product Management course. Each assignment is presented as a "pass" in a stack that mirrors the Apple Wallet app. Tapping a pass opens a detail view showing the assignment content.

The site replaces a traditional PDF or PowerPoint portfolio submission.

## Source-of-truth docs

- `docs/PRD_Portfolio_Website.md` -- full product spec. Every design decision, animation behavior, data model, and acceptance criterion lives here. The PRD wins over this file unless you explicitly override.
- `docs/pre-existing-work/` -- all pre-existing assignment work. The website embeds this content as-is.

## Living document protocol

This file has a **two-layer structure**:

**Layer 1 (Stable Conventions):** Locked conventions, scope guardrails, hard rules. Agents read but do NOT edit without direct user instruction.

**Layer 2 (Build State):** Current build state, architecture, known issues, what's next. Agents update via surgical edits at session end.

**Session-end protocol.** When a session ships meaningful work, the agent should:

1. Re-read this file end to end
2. Check if documented state matches code reality
3. Propose surgical edits to Layer 2 only
4. Update the date stamp on "Current build state"
5. Apply only after explicit user confirmation

---

# Layer 1: Stable Conventions

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + CSS custom properties in `src/styles/globals.css` |
| Animation | Framer Motion 11 |
| Routing | React Router DOM 6 |
| Markdown | `react-markdown` + `remark-gfm` |
| Backend | Vercel serverless function at `api/visitors.ts` (Node.js runtime) |
| Storage | Vercel Blob for visitor guestbook persistence |
| Hosting | Vercel |

## Hard rules

- **No em dashes anywhere.** Use commas, semicolons, colons, periods, or restructure.
- **No emojis as icons.** SF Symbol placeholders only (placeholder `<rect>` SVGs until real assets are added).
- **No dead UI.** Every visible interactive element must do something real.
- **Match Apple Wallet exactly.** Faithful over creative.
- **Mobile-first, capped on desktop.** 375px iPhone first, content capped at 480px on desktop.

## Design tokens

Defined in `src/styles/globals.css`:

```
--bg-app: #F1F1F4
--bg-card-white: #FFFFFF
--text-primary: #000000
--text-secondary: #1C1C1E
--text-tertiary: #8E8E93
--text-quaternary: #C7C7CC
--accent-blue: #007AFF
--divider: #E5E5EA
```

Tailwind maps these in `tailwind.config.ts`. Structured renderers use `src/styles/structuredTokens.ts` for renderer-specific tokens.

## Data model

- **`Pass`** has a `documents: PassDocument[]` array. Each pass can hold multiple documents (primary + extras).
- **`PassDocument`** types: `markdown`, `pdf`, `image`, `iframe`, `external`, `video`, `structured`.
- Seven deliverables use custom `structured` renderers in `src/components/structured/`.
- Markdown deliverables render via `react-markdown` with the `.memo-prose` CSS class.

## Asset pipeline

`scripts/copy-assets.mjs` runs as `predev` and `prebuild`, copying source material from `docs/pre-existing-work/` into `public/assets/` by file type. The `public/assets/` directory is gitignored.

## Common tasks

| Task | Command |
|---|---|
| Local dev | `npm run dev` |
| Build | `npm run build` |
| Deploy | `vercel --prod` |
| Preview local build | `npm run preview` |

---

# Layer 2: Build State

## Architecture

[FILL IN: paste your current file tree here after exploring the codebase]

## Current build state ([FILL IN: today's date])

### Shipped and working

[FILL IN: list features that are implemented and functional]

### Not yet built

[FILL IN: list PRD acceptance criteria not yet met]

### Known issues

[FILL IN: list bugs, drift, or non-functional elements]

## Environment

Local `.env.local` (gitignored):

```
BLOB_READ_WRITE_TOKEN=...     # Required for visitor guestbook persistence
```

## What's next

[FILL IN: ranked list of remaining work]
