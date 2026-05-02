# AGENTS.md

This file orients any AI agent (Claude Code, future iterations, etc.) working on this codebase. Read this first, in full, before doing anything else.

## What this project is

This is the final portfolio website for Aaron Sulbaran's MKT 372T Strategic Product Management course at the McCombs School of Business (UT Austin, Spring 2026, taught by Professor Mike Ditson). The course required adopting a real product for the semester and applying twelve PM frameworks to it. The adopted product is Apple Wallet. This website holds all twelve deliverables in a single navigable surface that visually mirrors Apple Wallet itself.

The site is the submission. The professor approved a website link in lieu of a PDF or PowerPoint portfolio.

## Read these in this order, in full, before writing any code

1. `docs/PRD.md` — This is the authoritative spec. Every design decision, animation behavior, data model, and acceptance criterion lives here. If anything in this file or in user prompts contradicts the PRD, the PRD wins unless the user explicitly says otherwise.

2. `docs/reference-screenshots/` — Twelve screenshots and one screen recording from the actual Apple Wallet iOS app. The PRD references these directly. When in doubt about how something should look or move, look at the reference. The recording in particular shows the "Adding Card" intro animation that the site reuses for its first-visit intro flow.

3. `source-material/` — All of the user's pre-existing assignment work. The website does not generate or rewrite any of this content. The website embeds these files as-is. Use the exact filenames and paths listed in the PRD's data model.

## Hard rules for this project

These are non-negotiable. They override default agent behavior.

- **No em dashes anywhere.** In code comments, in copy, in commit messages, in anything. The user's writing style explicitly excludes em dashes. Use commas, semicolons, colons, periods, or restructure the sentence.

- **No emojis as icons.** The PRD specifies SF Symbols. If an SF Symbol SVG file is not yet present in `design-tokens/sf-symbols/`, render a placeholder `<rect>` SVG with the SF Symbol name as a comment so the user can swap in the real asset later. Do not substitute Lucide, Heroicons, Feather, Material Icons, or any other icon library. Do not use unicode emoji as a stand-in.

- **No dead UI.** Every visible interactive element must do something real. Do not ship buttons that "will be implemented later." If the user asks for a control whose functionality is out of scope, either implement it or omit the control entirely.

- **Match Apple Wallet exactly.** The visual and interaction language is borrowed from a real product. When a design decision is between "creative" and "faithful to Apple Wallet," always pick faithful. The PRD lists exact colors, corner radii, spacing values, and typography for this reason.

- **Mobile-first, capped on desktop.** The site must look correct on a 375px iPhone first. On desktop, the content area caps at 480px wide and centers; do NOT spread the layout into a multi-column grid. The Apple Wallet metaphor breaks if the layout becomes wide.

- **Stay within scope.** The PRD's Section 15 lists what is out of scope for this build. Do not build dark mode, analytics, an admin panel, or anything else that is not in the PRD. If you think a missing piece is critical, raise it before building it.

## How the user works

Aaron is a graduate business student, not a professional engineer. He prefers receiving working software with clear pointers to what to swap in (filenames, asset paths, copy strings) over receiving long technical explanations. When you finish a build pass, briefly tell him:

1. What you built.
2. Where the swappable content lives (file paths) so he can drop in his real assets.
3. What is left in the PRD that you did not build, if anything, and why.

Do not pad responses with disclaimers, restated context, or summaries of the PRD he already wrote. He values brevity and momentum.

## Architecture defaults

These are the defaults from the PRD; restated here for fast reference:

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS with custom CSS variables defined in `globals.css`
- **Animation:** Framer Motion, using `layoutId` shared element transitions for the hero card lift
- **Routing:** React Router so each pass has a shareable URL
- **Backend (visitor wall only):** Vercel KV via Vercel API routes. Use `@vercel/kv`. If KV setup blocks the build, fall back to a "coming soon" placeholder card per the PRD's Section 7.7.
- **Hosting:** Vercel
- **PDF rendering:** `<iframe>` with rounded corners and a subtle border for multi-page PDFs

## File and asset map

When the PRD's data file (`src/data/passes.ts`) references an asset, it points to a path under `/public/assets/`. The user's source files live in `/source-material/`. During the build, copy or symlink the relevant files from `/source-material/` to `/public/assets/`:

- `/source-material/pdfs/*.pdf` → `/public/assets/pdfs/`
- `/source-material/images/*.png` → `/public/assets/images/`
- `/source-material/extras/*` → `/public/assets/extras/`
- `/design-tokens/sf-symbols/*.svg` → `/public/assets/icons/`

Do this as a build step, not a manual copy. A `prebuild` script in `package.json` that runs a small Node.js copy script is fine.

## What to do if something is missing

The user is writing his Amazon Memo in parallel with this build. The Amazon Memo PDF (`source-material/pdfs/12_amazon_memo.pdf`) may be a placeholder when you start. That is expected. Build the site assuming the file is real, and the user will replace the placeholder with the final PDF when it's ready.

If an SF Symbol SVG is missing, use the placeholder pattern described above.

If a reflection string for a pass is missing or set to `[REFLECTION TBD]`, render it as italicized gray placeholder text in the detail view: `Reflection coming soon.`

If the prototype URL in `11_prototype_link.md` is a TODO, render the Prototype card's "Open Prototype" button as disabled with a tooltip "Prototype link coming soon" until the URL is provided.

## Build sequence (recommended)

If you have to choose an order, the PRD is structured so this order makes sense:

1. Set up the Vite + React + TypeScript + Tailwind project, configure CSS variables from PRD Section 6.
2. Build the data layer (`src/data/passes.ts`) with all 12 portfolio passes plus the visitor pass, using the reflection placeholders.
3. Build the home stack (`WalletHome.tsx`, `PassCard.tsx`, `TopBar.tsx`) with the static stack visible. No animation yet.
4. Add the hero card animation (Framer Motion `layoutId`).
5. Build the detail view (`PassDetail.tsx`, `BackButton.tsx`) including PDF embeds and the reflection card.
6. Build the EXTRA peek-and-swipe pattern (`ExtrasCarousel.tsx`).
7. Build the search input and filter logic (`SearchInput.tsx`).
8. Build the About sheet (`About.tsx`).
9. Build the intro flow (`IntroFlow.tsx`, `DotField.tsx`). This is the most visually expensive piece, save it for when the rest is solid.
10. Build the visitor card and signature form (`VisitorCard.tsx`, `VisitorSignatureForm.tsx`) plus the API route at `api/visitors.ts`.
11. Polish, accessibility pass, reduced-motion pass, deploy to Vercel.

Each step should result in a runnable site. Do not build steps 9 and 10 in a state where steps 1 through 8 are broken.

## Don't ask, just do

The user has spent significant effort on the PRD. He does not want clarifying questions about decisions the PRD already makes. Read the PRD, build to spec, and if something genuinely cannot be resolved from the PRD, make the choice that most closely matches Apple Wallet's actual behavior and note the choice in your wrap-up message.
