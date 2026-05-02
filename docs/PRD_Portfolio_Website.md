# PRD: Apple Wallet PM Portfolio Website

**Author:** Aaron Sulbaran
**For:** MKT 372T Strategic Product Management, Spring 2026 (UT Austin, McCombs)
**Build target:** Claude Code, one-shot prompt
**Deployment target:** Vercel
**Date:** May 2, 2026

---

## 1. Overview

This document specifies a single-page interactive portfolio website that holds all twelve final portfolio assignments from MKT 372T. The product I adopted for the semester is Apple Wallet, and the site is designed to feel like an extension of the Apple Wallet app itself: each assignment is presented as a "pass" in a stack, and tapping a pass opens a detail view that shows the assignment's content.

The site replaces a traditional PDF or PowerPoint portfolio submission. The professor (Mike Ditson) has approved a website link as the submission format.

---

## 2. Goals

1. Hold all twelve required portfolio assignments in a single, navigable, professional surface.
2. Mirror the Apple Wallet visual and interaction language so closely that a viewer immediately recognizes the metaphor.
3. Surface "EXTRA" deliverables in a way that is structurally distinct from required ones, so the professor can identify them for bonus credit.
4. Run on Vercel as a static deploy, mobile-first but flawless on desktop.
5. Be built in a single Claude Code session without significant back-and-forth.

## 3. Non-goals

- This is not a personal portfolio site. It is a course portfolio for one specific class and one specific product.
- No backend, no database, no auth, no analytics.
- No design departures from Apple Wallet's actual look and feel. If a decision is between "creative" and "correct to Apple Wallet," always pick correct to Apple Wallet.

---

## 4. Tech stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with custom theme tokens defined below)
- **Animation:** Framer Motion
- **Routing:** React Router (single page with route-driven detail views, so each pass has a shareable URL)
- **PDF rendering:** Use `<iframe>` or `<embed>` for PDF assets, or convert to images for the simpler ones. Prefer iframe for multi-page PDFs.
- **Icons:** SF Symbols. The user will provide downloaded SVG exports of any SF Symbol referenced. Do NOT substitute emojis or generic icon libraries (no Lucide, no Heroicons). Use placeholder SVG `<rect>` boxes with the SF Symbol name as a comment if the asset isn't available yet, so the user can drop in the real SVG later.
- **Backend (visitor wall only):** Vercel KV via Vercel API routes. The project should be structured as a Vercel-compatible app with an `/api` directory at the root containing the two route handlers described in Section 7.7. Use `@vercel/kv` package.
- **Hosting:** Vercel. Output a `vercel.json` if any rewrites are needed; otherwise the default Vite + Vercel settings are fine.

## 5. File structure

```
/portfolio
├── api/
│   └── visitors.ts                  # Vercel API route: GET (list) and POST (sign) handlers
├── public/
│   ├── assets/
│   │   ├── pdfs/                    # The actual assignment PDFs go here
│   │   ├── images/                  # PNG exports (e.g., the OST, the Productboard roadmap)
│   │   └── icons/                   # SF Symbol SVGs (placeholder until user adds them)
│   └── favicon.svg                  # A small Apple Wallet icon
├── src/
│   ├── components/
│   │   ├── WalletHome.tsx           # The home stack view
│   │   ├── PassCard.tsx             # An individual pass in the stack
│   │   ├── PassDetail.tsx           # Detail view for a single pass
│   │   ├── ExtrasCarousel.tsx       # The horizontal "extras" peek-and-swipe component
│   │   ├── TopBar.tsx               # The Wallet header with title and pill controls
│   │   ├── SearchInput.tsx          # The expanding search pill and filter logic
│   │   ├── BackButton.tsx           # The circular chevron-left back button
│   │   ├── About.tsx                # The "About this portfolio" sheet
│   │   ├── IntroFlow.tsx            # First-visit "Adding Card" intro animation
│   │   ├── DotField.tsx             # The shimmering particle/dot field used by IntroFlow
│   │   ├── VisitorCard.tsx          # The bottom-of-stack visitor signature pass
│   │   └── VisitorSignatureForm.tsx # The "Card Details" style form for adding a name
│   ├── data/
│   │   └── passes.ts                # Single source of truth for all pass content
│   ├── styles/
│   │   └── globals.css              # Tailwind base + custom CSS variables
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## 6. Design system

### 6.1 Colors

Pulled from observation of the actual Apple Wallet UI on iOS (reference screenshots provided).

```css
:root {
  /* Backgrounds */
  --bg-app: #F1F1F4;          /* Soft lavender-gray, the Wallet app background */
  --bg-card-white: #FFFFFF;    /* White content cards inside detail views */

  /* Text */
  --text-primary: #000000;     /* True black, for titles */
  --text-secondary: #1C1C1E;   /* Near-black for body */
  --text-tertiary: #8E8E93;    /* iOS system gray, for metadata and supporting text */
  --text-quaternary: #C7C7CC;  /* Lightest gray, for dividers */

  /* Accents */
  --accent-blue: #007AFF;      /* iOS system blue, for the "Done" check and links */
  --divider: #E5E5EA;          /* Hairline dividers inside white cards */

  /* Pass card colors (for the stack) */
  /* See Section 7.2 for the full assigned palette */
}
```

### 6.2 Typography

- **Font family:** SF Pro Display for headings, SF Pro Text for body. Use `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif` as the stack so it renders natively on Apple devices and gracefully degrades elsewhere.
- **Page title (e.g., "Wallet"):** 34pt, weight 700, letter-spacing -0.5px, left-aligned, large top padding.
- **Detail view title (e.g., "Balance Details"):** 32pt, weight 700, letter-spacing -0.4px.
- **Section headers (e.g., "Statements"):** 22pt, weight 700.
- **Body:** 17pt, weight 400.
- **Metadata / supporting text:** 15pt, weight 400, color `--text-tertiary`.
- **Card label on a pass:** 17pt, weight 600, white or near-white, with a subtle text-shadow for legibility.

### 6.3 Spacing and shape

- **App padding (left/right):** 20px on mobile, 24px on tablet, capped at 480px content width on desktop with the rest of the screen filled by the lavender-gray background.
- **Card corner radius:** 14px for individual passes in the stack, 18px for white content cards in detail views.
- **Card top-edge slice (in the stack):** ~110px tall reveal per card, with each card overlapping the one below by ~70px so only the top brand strip is visible. Match the proportions in the reference screenshot exactly.
- **Hero card (when a pass is selected):** Full Wallet-card aspect ratio, approximately 1.586:1 (the actual ISO/IEC 7810 ID-1 ratio, which is what Apple uses).
- **Drop shadow on cards:** `0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)`. Subtle. Not aggressive.

### 6.4 Top bar pill controls

The actual Apple Wallet app shows two pill-shaped control groups at the top right: a standalone circular `+` button and a joined pill containing search and `...`. For this portfolio, we are intentionally NOT replicating both controls verbatim, because dead/decorative buttons are worse than no button at all. The user has explicitly requested that every interactive element in the top bar be functional.

**Final spec for the portfolio's top bar (right side):**

1. **Info button (left of the pair):** A standalone circular button (44px diameter, white background, subtle shadow), containing the SF Symbol `info.circle`. Tapping it opens the About sheet (Section 7.5).

2. **Search pill (right of the pair):** A pill-shaped button (~52px wide × 44px tall, white background, subtle shadow), containing the SF Symbol `magnifyingglass`. Tapping it expands the pill into a full-width search input. See Section 8.7 for the full search behavior.

The "..." overflow menu from the actual Apple Wallet app is intentionally omitted. We are not building a dead button.

---

## 7. Information architecture

### 7.1 The twelve required passes (in stack order, top to bottom)

The order follows the natural PM lifecycle taught in the course: Discovery → Definition → Prioritization → Delivery → Outcomes.

| # | Pass title | Card label (short) | Asset type |
|---|---|---|---|
| 1 | Business Model Canvas | BMC | PDF |
| 2 | Value Proposition Canvas | VPC | PDF |
| 3 | Product Vision Board | Vision Board | PDF or rebuilt |
| 4 | Opportunity Solution Tree | OST | PNG/PDF |
| 5 | Customer Letter | Customer Letter | PDF |
| 6 | JTBD Stories | Job Stories | PDF |
| 7 | PRD | PRD | PDF |
| 8 | Kano Analysis | Kano | PNG/PDF |
| 9 | RICE Prioritization | RICE | XLSX or PDF rendering |
| 10 | Roadmap | Roadmap | PNG (Productboard export) |
| 11 | Prototype | Prototype | Embedded iframe or live link |
| 12 | Amazon Memo | Amazon Memo | PDF |

### 7.2 Pass card colors

Each pass should have a distinct card visual. Pull from the Apple Wallet color vocabulary (the credit cards, transit cards, and Apple Cash/Card finishes). Assign as follows:

| # | Pass | Card visual |
|---|---|---|
| 1 | BMC | Deep navy gradient, like a private bank card |
| 2 | VPC | Forest green to teal gradient |
| 3 | Vision Board | Apple Card iridescent (the rainbow holographic look from reference image 8) |
| 4 | OST | Deep purple to indigo |
| 5 | Customer Letter | Warm ivory/beige textured (like the DBS card in the reference) |
| 6 | Job Stories | Slate gray gradient |
| 7 | PRD | Black with subtle Apple-logo-style mark |
| 8 | Kano | Coral to peach gradient |
| 9 | RICE | Burgundy to deep red |
| 10 | Roadmap | Sky blue gradient (like a transit pass) |
| 11 | Prototype | Apple Cash style: solid black with halftone purple dot pattern (reference image 2) |
| 12 | Amazon Memo | Apple Card gold (the warm yellow gradient from reference image 3) |

For each card, include a small light-tinted text label in the top-left ("BMC", "VPC", etc.) and a small subtitle in the top-right ("Discovery", "Definition", "Prioritization", "Delivery", "Outcomes") to mirror how Apple Wallet shows brand + sub-brand (e.g., "HSBC | TravelOne").

### 7.3 The "EXTRA" mechanism

The professor's instructions allow EXTRA deliverables for bonus credit. The user wants these surfaced using the Apple Wallet pattern for grouped passes (the way concert tickets or boarding passes show a peeked second card on the right edge when the primary card is selected).

**Pattern:**
- When a user taps a pass with extras, the detail view shows the primary content normally.
- A second card peeks from the right edge of the screen (about 24px to 32px of the next card visible).
- The user can swipe horizontally or tap the peeked card to navigate to the EXTRA content.
- The EXTRA content is clearly badged: a small "EXTRA" pill in the top-left corner of the detail view (use accent blue background, white text, 11pt weight 600, uppercase).
- A short caption appears below the EXTRA title: "Additional work submitted as part of the final portfolio for bonus credit."

**Which passes have EXTRAs (initial set, user can add more):**

| Pass | Primary | EXTRA |
|---|---|---|
| 3 — Vision Board | The Customer Letter (Option 1 of the original assignment) | A standalone Vision Board (Option 2), since both fulfill the requirement |
| 8 — Kano | The Kano Analysis | The RICE Prioritization, as both methods were completed |
| 10 — Roadmap | The roadmap deliverable as submitted | The Productboard roadmap PNG as a second view |

The data model for passes should support an arbitrary number of `extras: Pass[]` per pass, so the user can add more later without a code change.

### 7.4 Pass detail view structure

When a pass is opened (via tap on the home stack), the layout is:

1. **Back button** (top-left, circular white with chevron-left, exactly like reference image 5). Tapping returns to the home stack with a reverse animation.
2. **Pass title** (large black, e.g., "Business Model Canvas").
3. **A single-line "what this is" caption** (one sentence, gray, e.g., "Nine-block strategic snapshot of how Apple Wallet creates and captures value across its multi-sided ecosystem.").
4. **A "Reflection" white card** (~3 to 5 sentences of first-person reflection on what the user learned doing this assignment, why the choices they made make sense, and how it connects to other parts of the portfolio). The user will write this content. For now, use a placeholder string in `passes.ts` that says `"[REFLECTION TBD]"` for each pass, and expose a clear `reflection` field on the data model.
5. **The artifact itself**, embedded:
   - PDFs: Render in a styled iframe with rounded corners and a subtle border. The iframe should be tall enough to show the document well (at minimum 800px on desktop, full viewport-height-minus-header on mobile).
   - PNGs: Render as a responsive image with the same rounded-corner styling.
   - The Prototype: A button/link that says "Open Prototype" and opens the prototype in a new tab. If a hosted URL is available, link to it. Otherwise, link to a local route.
6. **If extras exist**, the peeking-card affordance described in 7.3.

### 7.5 The About sheet

When the `info.circle` icon in the top bar is tapped, slide up a sheet (Apple-style modal, full screen on mobile, centered card on desktop) containing:

- **Title:** "About this Portfolio"
- **Body:**
  - One paragraph on the course (MKT 372T, Strategic Product Management, McCombs School of Business, UT Austin, Spring 2026, taught by Professor Mike Ditson).
  - One paragraph on the adopted product (Apple Wallet).
  - One paragraph on the persona (Marcus Reeves, 27, consultant in NYC) used to anchor customer-facing deliverables.
  - One paragraph naming the author (Aaron Sulbaran).
- **Close affordance:** A circular `xmark` button in the top-left, matching reference image 7.

Use placeholder copy that the user can swap. Wrap each paragraph in a clearly named constant in the component so they're easy to edit.

---

### 7.6 First-visit intro flow ("Adding the Portfolio")

When a visitor lands on the site for the first time, they should not be dropped directly into the Wallet stack with no context. The professor and any other viewer needs to immediately understand what they're looking at. The solution is a short, branded intro flow that mimics Apple Wallet's "add a new card" sequence and uses it to introduce the portfolio.

**The reference for this flow is the screen recording the user provided plus reference images 1 through 4.** The actual Apple Wallet add-card flow goes: card scan prompt → contacting card issuer (with a beautiful shimmering particle field where the card sits) → card details form → card added. We are reusing the visual language of steps 2 and 3 as our intro.

**Sequence:**

**Step 1: "Adding Portfolio"** (full-screen black, 2 seconds)
- Layout matches reference image 3 exactly: a rectangular shimmering "dot field" (see Section 8.6 for how to build this) takes up the upper-middle of the screen.
- Below it, in white SF Pro Display:
  - **Title (28pt, weight 700):** "Adding Portfolio"
  - Next to the title: a small spinning iOS-style activity indicator (the rotating bars symbol Apple uses, NOT a generic spinner)
  - **Subtitle (17pt, weight 400, gray `#8E8E93`):** "Contacting Professor Ditson…"
- Below that, a small disabled-looking link in `#48484A`: "Skip Intro" (this is functional, taps go to Step 4 immediately).
- After ~2 seconds, auto-advance to Step 2.

**Step 2: "Portfolio Details" form** (matches reference image 4)
- Same black background and shimmering dot field, now scaled smaller and pushed to the upper third of the screen.
- A small circular `xmark` close button in the top-left (44px, semi-transparent dark gray fill, white icon). Tapping it skips the intro and goes straight to the stack.
- Below the dot field:
  - **Title (28pt, weight 700, white):** "Portfolio Details"
  - **Subtitle (17pt, weight 400, gray `#8E8E93`):** "Verify and complete the project information."
- Below that, a dark rounded card (background `#1C1C1E`, corner radius 14px, padding 16px) containing two read-only "fields" laid out exactly like the Name/Security Code form in reference image 4:
  - **Course:** MKT 372T - Strategic Product Management
  - (hairline divider)
  - **Author:** Aaron Sulbaran
  - (hairline divider)
  - **Product:** Apple Wallet
  - (hairline divider)
  - **Professor:** Mike Ditson
- Below the card, a primary button (full-width, ~50px tall, corner radius 25px, blue `#007AFF` fill, white "Continue" label, weight 600). Tapping advances to Step 3.

**Step 3: Brief context paragraph** (still on the black background)
- The dot field fades out.
- A short paragraph of text fades in, centered, white, max-width 320px:

  *"This site is the final portfolio for MKT 372T at the McCombs School of Business, Spring 2026. Each card in the stack is a real assignment from the semester, applied to Apple Wallet as the adopted product. Tap any card to view it. Cards marked EXTRA are bonus deliverables. Welcome."*

- Below the paragraph, a primary "Continue" button identical to Step 2.
- Tapping advances to Step 4.

**Step 4: Wallet reveal**
- The black background fades to the lavender-gray `#F1F1F4`.
- The card stack assembles itself: each pass slides in from the bottom one after another with a small stagger (50ms between each), settling into the stack position. Top-bar controls fade in last.
- The intro is complete.

**Persistence:**
- Use `localStorage` to remember if a visitor has seen the intro. Key: `portfolio_intro_seen` set to `"true"` after Step 4 plays once.
- On return visits, skip the intro and go straight to the stack. The user can re-trigger the intro from the About sheet via a "Replay intro" link.

**Reduced motion:**
- If `prefers-reduced-motion` is set, replace the entire intro with a single static screen showing the same context paragraph from Step 3, plus a "Continue" button. No animation, no dot field shimmer.

---

### 7.7 The visitor signature card (the "guestbook" pass)

A 13th card lives at the very bottom of the stack: a "Visitors" card. It is structurally distinct from the 12 portfolio passes. Its purpose is to let people who view the portfolio leave their first and last name, creating a living guestbook that visualizes who has interacted with the site.

**Card visual in the stack:**
- Position: bottom of the stack, below all 12 portfolio passes.
- Card style: white background with a subtle paper-like texture, a small SF Symbol `person.2.fill` placeholder icon in the top-left, and the label "Visitors" in dark text. Subtitle in the top-right says "Sign In". This visually distinguishes it from the colored portfolio passes so the professor doesn't mistake it for an assignment.
- Tappable like any other pass.

**Detail view layout:**
- The card lifts to the hero position like any other pass.
- Below the hero card: the title "Visitors", a one-line caption ("People who have viewed this portfolio."), and then a feed.
- The feed is a vertical list of entries. Each entry is a small white card (matching the white-rounded-rectangle pattern from reference image 5) showing:
  - The visitor's first and last name (17pt, weight 600).
  - A relative timestamp (e.g., "2 hours ago", "Yesterday") in `--text-tertiary`, 13pt.
- Above the feed, a primary "Sign the wall" button that opens the signature form.

**The signature form:**
- Opens as a bottom sheet (or full-screen modal on mobile) styled exactly like reference image 4's "Card Details" form, but on the lavender-gray background to match the rest of the site (NOT the black background, which is reserved for the intro).
- Fields:
  - **First Name** (text input, required, max 30 chars)
  - (hairline divider)
  - **Last Name** (text input, required, max 30 chars)
- Below the form, a primary "Sign" button (blue `#007AFF`, disabled until both fields are filled).
- A secondary text-only link below: "No thanks, just viewing" — tapping this closes the form without submitting.

**Validation and rate limiting:**
- Strip whitespace, trim, reject if either field is empty after trimming.
- Reject obvious garbage (length < 2, all the same character, etc.) with a quiet inline message.
- Use `localStorage` to track if a given browser has signed: `portfolio_visitor_signed` = `"true"`. After signing, the form is replaced with a small "Thanks for signing — your name is on the wall" confirmation. Don't allow the same browser to sign multiple times in a session.
- If submission fails (network error, rate limit, etc.), show a quiet error and a retry button. Do not block the rest of the site.

**Backend (kept intentionally minimal):**

The signature wall needs persistence, but we are not standing up a custom backend. Use one of the following, in priority order:

1. **Vercel KV** (recommended). Vercel's built-in Redis-compatible key-value store. Free tier supports 30k commands per month, more than enough. Two API routes:
   - `POST /api/visitors` — accepts `{ firstName, lastName }`, validates, appends to a list with a timestamp, returns 200 OK.
   - `GET /api/visitors` — returns the list of visitors (most recent first), capped at the 100 most recent entries to keep the payload small.
   The Vite project will need to be deployed as a Vercel project with API routes (use the `/api` directory pattern, written in TypeScript, runtime `edge` or `nodejs`).

2. **Fallback if Vercel KV setup is complex:** a single Supabase table `visitors` with columns `id`, `first_name`, `last_name`, `created_at`. Use the public anon key with a strict RLS policy that allows `INSERT` from any client and `SELECT` of name + created_at only. The user has Supabase access via MCP, so this is realistic.

3. **Simplest fallback (if both above are out of scope):** Read/write to a JSON file in a GitHub gist via the GitHub API. Hacky but works. Only use this if neither of the above is workable.

The PRD's preference is option 1 (Vercel KV). Do not over-engineer this. There is no auth, no admin panel, no editing, no deletion. Names go in, names come out.

**Server-side basic abuse protection:**
- Reject requests with a `firstName` or `lastName` longer than 30 chars.
- Reject requests with payload bodies larger than 1KB.
- Apply a simple per-IP rate limit using Vercel's built-in middleware: max 3 signatures per IP per hour. Silent fail on the client (just show "thanks!").
- Profanity filter: use a small embedded blocklist of obvious slurs and block exact-match terms in either field. Don't go overboard; the user is fine with a casual filter, not a fortress.

**Display polish:**
- The most recent signature appears at the top of the feed.
- Display only first and last name. Never any IP, timestamp precision below "X hours ago", or any other identifying info.
- If there are zero signatures yet, show a friendly empty state: "No one has signed yet. Be the first."

**Why this is in scope despite being technically the most complex piece:** It's a single API route, a single component, and a tiny database. Total surface area is small. It also gives the portfolio an interactive element that goes beyond static viewing, which is exactly the kind of detail that elevates a course portfolio. If during the build it becomes clear this will eat the whole timeline, fall back to a "coming soon" placeholder card that still shows the visual and lets the user implement persistence later. The portfolio still works without it.

---

## 8. Interaction and animation

### 8.1 Home stack to detail (the hero animation)

This is the signature interaction. It must feel exactly like Apple Wallet selecting a card.

1. User taps a pass in the stack.
2. The tapped pass animates upward to a "hero" position roughly centered vertically, scaling slightly up to its full card aspect ratio (1.586:1).
3. All other passes either:
   - Slide downward and fade slightly, leaving only a small hint of the next pass below (matching reference image 3, where the next card peeks from the bottom).
   - The passes above the selected one slide off the top of the screen.
4. The detail content (title, reflection, embedded artifact) fades in below the hero card.
5. Use Framer Motion `layoutId` shared element transitions so the card itself is the same DOM node throughout. This produces the smooth physics-y feel.
6. Animation duration: 400ms, ease-out cubic.
7. Reverse on back button.

### 8.2 Stack rest state

- Cards are stacked with each one overlapping the previous by ~70px. Only ~40px of each underlying card is visible.
- The bottom-most card sits at full height like a normal card.
- The stack scrolls vertically as a single unit if the content overflows the viewport. Apple Wallet uses spring-style overscroll; approximate this with `overscroll-behavior: contain` and a slight bounce via Framer Motion if practical.

### 8.3 Tap interactions

- Hover on desktop: subtle lift, 4px translate-Y up, slightly stronger shadow.
- Tap/click: light haptic-like scale-down to 98% for 100ms, then trigger the hero animation.
- Cursor on desktop: `pointer` over passes.

### 8.4 The peek-and-swipe extras

In the detail view, if the pass has extras:
- Show the primary content with a subtle "1 of N" indicator at the top right (small dots or "1/2" text in `--text-tertiary`).
- The next pass peeks 24-32px from the right edge of the artifact area.
- Touch: horizontal swipe navigates between primary and extras.
- Mouse: a small chevron-right button appears on the right edge on hover. Click navigates to the extra.
- When viewing an extra, an "EXTRA" pill appears in the top-left of the detail content area.

### 8.5 Reduced motion

Respect `prefers-reduced-motion`. When set, replace all motion with simple fade transitions of 200ms.

### 8.6 The shimmering dot field (intro flow signature visual)

This is the rectangular particle/shimmer pattern that appears in reference image 3 and the screen recording. It is the visual signature of the intro flow. Get this right.

**What it looks like in the actual Apple Wallet app:**
- A roughly card-shaped rectangle (~1.6:1 ratio) of densely packed small dots.
- The dots are colored: mostly desaturated near-blacks and grays, but with a faint scattering of subtle color noise (deep purples, faint pinks, cool blue-grays). Not bright. The whole field reads as "near black with a subtle iridescent shimmer," not as "colorful dots on black."
- The dots are not perfectly uniform: density varies across the field, with denser concentrations near the center fading slightly toward the edges (a soft vignette effect).
- The field shimmers: individual dots subtly pulse in opacity and shift in hue over time, giving the impression that the card is being "scanned" or "processed."

**Implementation:**
- Build as a `<canvas>` element, not SVG (SVG with this many particles will tank performance).
- On mount, generate ~3000 to 4000 particles within the card-rectangle bounds. Each particle has:
  - `x`, `y` position (slight random jitter on each frame, ±0.3px)
  - `baseOpacity` (random between 0.15 and 0.85)
  - `hue` (one of: 0° red-shift faint, 270° purple, 220° blue-gray, 0° neutral gray, weighted heavily toward neutral gray and dark)
  - `pulseFrequency` (random between 0.3 and 1.5 Hz)
  - `pulsePhase` (random offset)
- Each frame, update each particle's rendered opacity to `baseOpacity * (0.7 + 0.3 * sin(time * pulseFrequency + pulsePhase))`.
- Render at the device's natural pixel ratio (use `window.devicePixelRatio`).
- Apply a soft radial gradient mask so the field fades at the edges.
- Cap the frame rate at 30fps to save battery; the shimmer doesn't need 60fps to read correctly.
- Pause the animation when the document is hidden (`document.visibilitychange`).

**Sizing:**
- The dot field rectangle should be roughly 280px wide × 175px tall on mobile, scaling up proportionally on larger screens. This matches the proportions visible in the reference.
- Position: vertically centered in the upper 60% of the screen on Step 1, smaller and pushed up to the upper third on Step 2.

**Performance:**
- This animation only runs during the intro flow. It is not on the home stack or any other view. So even if it's a little expensive on first load, it gets unloaded once the user is past the intro.
- If the build complexity becomes a problem, an acceptable fallback is a static PNG of the dot field with a CSS opacity pulse on the entire image (`animation: shimmer 2s ease-in-out infinite alternate`). This is visually 80% as good for a fraction of the work. Use the canvas version if you can; use the static fallback if you must.

### 8.7 Search

Search is fully functional, not a placeholder. The dataset is small (12 portfolio passes plus extras plus the visitor card, all hard-coded in `passes.ts`), so this is a client-side string filter, not a backend index.

**Activation:**
- Tap the search pill in the top bar. The pill expands horizontally into a full-width search input that fills the available top-bar space, pushing or fading the info button out of the way. Animation: 250ms ease-out, the pill morphs (use a Framer Motion `layout` animation).
- The input gets focus immediately on expansion. The keyboard (on mobile) auto-opens.
- Placeholder text: `"Search portfolio"`, in `--text-tertiary` color, weight 400.
- Inside the input, on the left: the `magnifyingglass` icon (small, gray). On the right: when the user has typed anything, an `xmark.circle.fill` clear button appears.

**Filtering behavior:**
- As the user types, filter the card stack in real time (no debounce needed; the dataset is tiny).
- Match against (case-insensitive, substring): `title`, `shortLabel`, `category`, `caption`, and `reflection`. Also match against extras' fields. If an extra matches but the parent doesn't, surface the extra's parent in the results (since the extra is reached through the parent).
- Cards that don't match fade out and collapse out of the stack (use Framer Motion's `AnimatePresence` for the exit animation, ~200ms).
- Cards that match remain in the stack, but the stack reflows to remove gaps. The remaining cards stack normally with the same overlap pattern.
- If the search query is empty, show all cards (return to default state).

**EXTRA / REQUIRED indicators (shown only while search is active):**
- Each visible card gets a small pill badge in the top-right corner of its visible top edge:
  - For required portfolio passes: a small neutral pill showing the category, e.g., "Discovery", "Definition", "Prioritization", "Delivery", "Outcomes". Background: `rgba(255,255,255,0.15)`, white text, 11pt weight 600, uppercase, 6px horizontal padding, 4px corner radius.
  - For extras: a small blue pill saying "EXTRA". Background: `--accent-blue` (`#007AFF`), white text, same typography as above.
  - For the Visitors pass: a small neutral pill saying "GUESTBOOK".
- These pills are hidden when search is NOT active. Outside of search, the stack visual identity (color, label, subtitle) carries the meaning, and pills would clutter the metaphor. Inside search, the stack metaphor is partially broken by filtering, so the pills help the viewer (Professor Ditson) instantly understand what each result represents.

**Empty state (no matches):**
- When the search query has at least one character but no cards match, replace the stack area with a centered empty state:
  - SF Symbol `magnifyingglass` placeholder, ~48px, in `--text-tertiary`.
  - Below it: `"No results for "<query>""` in 17pt weight 600.
  - Below that: a small text-only blue button: `"Clear search"`. Tapping it clears the query and returns to the full stack.

**Closing search:**
- Tapping the `xmark.circle.fill` clear button inside the input clears the query but keeps the input expanded and focused.
- Pressing `Escape` clears the query AND collapses the input back to the pill.
- Tapping anywhere outside the input also collapses it back to the pill (only if the query is empty; if the user has typed something, leave it expanded so they don't accidentally lose their query).
- Tapping a card while the search is filtered: opens that card's detail view normally. When the user returns from the detail view, the search state is preserved (the input stays expanded with the same query).

**Keyboard support:**
- `/` key (when no input is focused) opens search. This is a small power-user touch that costs nothing.
- `Escape` clears and closes (as above).
- `Enter` does nothing special (filtering is live).

**Reduced motion:**
- All search animations (pill expansion, card filtering) collapse to instant changes when `prefers-reduced-motion` is set. The functionality is identical, just no transitions.

---

## 9. Data model

```typescript
// src/data/passes.ts

export type AssetType = 'pdf' | 'image' | 'iframe' | 'external';

export interface PassAsset {
  type: AssetType;
  src: string;             // Path under /public/assets or external URL
  alt?: string;            // For images
  height?: string;         // CSS height for iframes (default 800px)
}

export interface Pass {
  id: string;              // URL slug, e.g., 'business-model-canvas'
  number: number;          // 1-12 for required, used for stacking order
  title: string;           // e.g., 'Business Model Canvas'
  shortLabel: string;      // e.g., 'BMC'
  category: 'Discovery' | 'Definition' | 'Prioritization' | 'Delivery' | 'Outcomes';
  caption: string;         // One-line description
  reflection: string;      // 3-5 sentences, first person
  cardStyle: {             // How the card looks in the stack
    background: string;    // Tailwind class or inline gradient string
    textColor: string;     // 'white' or 'black' for the label
  };
  asset: PassAsset;
  extras?: Pass[];         // Optional EXTRA passes shown via peek
  isExtra?: boolean;       // True if this is itself an extra
}

export const passes: Pass[] = [
  {
    id: 'business-model-canvas',
    number: 1,
    title: 'Business Model Canvas',
    shortLabel: 'BMC',
    category: 'Discovery',
    caption: 'Nine-block strategic snapshot of how Apple Wallet creates and captures value across its multi-sided ecosystem.',
    reflection: '[REFLECTION TBD]',
    cardStyle: {
      background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A6E 100%)',
      textColor: 'white',
    },
    asset: {
      type: 'pdf',
      src: '/assets/pdfs/01_business_model_canvas.pdf',
    },
  },
  // ... and so on for all 12
];
```

The user will populate the actual PDFs into `/public/assets/pdfs/` after the site is built. Use the filenames suggested above so the data file is correct on first deploy.

### 9.1 Visitor signature data model

```typescript
// src/types/visitor.ts

export interface Visitor {
  firstName: string;
  lastName: string;
  createdAt: string; // ISO 8601 timestamp
}

// API contract
// POST /api/visitors
// Request body: { firstName: string, lastName: string }
// Response: { ok: true } or { ok: false, error: string }

// GET /api/visitors
// Response: { visitors: Visitor[] } (most recent first, max 100)
```

The visitor "pass" is a hard-coded entry alongside the 12 portfolio passes in the data layer, but flagged as a special type so the rendering logic knows to use the `VisitorCard` and `VisitorSignatureForm` components instead of the standard `PassDetail` flow.

```typescript
// In passes.ts, alongside the 12 portfolio passes
export const visitorPass = {
  id: 'visitors',
  number: 13,
  title: 'Visitors',
  shortLabel: 'Visitors',
  category: 'Guestbook' as const,
  caption: 'People who have viewed this portfolio.',
  isVisitorPass: true, // special flag
  cardStyle: {
    background: '#FAFAFA',
    textColor: 'black',
  },
};
```

---

## 10. Responsive behavior

- **Mobile (default, ≤480px):** Full-bleed Wallet experience. Hero card animation feels native.
- **Tablet (481-1024px):** Same single-column layout, but content area capped at 480px wide and centered. Lavender-gray fills the rest of the screen so the experience still feels like a phone within a frame.
- **Desktop (>1024px):** Same as tablet. Do NOT spread the layout into a multi-column grid. The metaphor breaks if Wallet is wide.

Optional polish: on desktop, render a subtle "device frame" around the 480px content area (a dark rounded-rectangle border with a thin highlight, evocative of an iPhone bezel). This is a stretch goal, not required.

---

## 11. Accessibility

- All interactive elements get `aria-label`s.
- Pass cards in the stack are `<button>`s, not divs.
- Color contrast for all text against backgrounds meets WCAG AA.
- Keyboard navigation: arrow keys cycle through passes in the stack; Enter opens the focused pass; Escape returns from detail view.
- Focus rings are visible (use a 2px accent-blue ring with 2px offset).

---

## 12. Build and deploy

- `npm run build` produces a static site in `dist/`.
- `vercel --prod` deploys it.
- Add a `package.json` script `"deploy": "vercel --prod"` for convenience.
- The `vercel.json` should ensure SPA routing works (rewrite all routes to `/index.html`).

---

## 13. What I will provide after the build

1. The 12 PDFs of completed assignments, dropped into `/public/assets/pdfs/`.
2. SVG exports of any SF Symbols I want to use, dropped into `/public/assets/icons/`.
3. The reflection text for each pass (the `reflection` field).
4. The Amazon Memo PDF, once written.
5. The actual prototype URL or build, embedded into the Prototype pass.

---

## 14. Acceptance criteria

The build is complete when:

- [ ] First-visit intro flow plays through Steps 1 to 4 with the shimmering dot field, the "Portfolio Details" form, the context paragraph, and the wallet reveal animation. `localStorage` skip on return visits works.
- [ ] The home view shows 12 stacked passes plus the Visitors pass at the bottom, in the correct order and colors, exactly mirroring the visual language of Apple Wallet's home screen.
- [ ] Tapping a pass triggers the hero animation that lifts the card and reveals the detail view, matching Apple Wallet's selected-card interaction.
- [ ] Each detail view shows the back button, title, caption, reflection card, and embedded artifact placeholder.
- [ ] At least three passes (Vision Board, Kano, Roadmap) demonstrate the EXTRA peek-and-swipe pattern with the "EXTRA" badge.
- [ ] The Visitors pass shows the signature feed when opened. The "Sign the wall" button opens the form. Submitting writes to the backend (Vercel KV preferred) and the new entry appears in the feed. Empty state and "already signed" state work correctly.
- [ ] Search is fully functional: tapping the search pill expands it into an input, typing filters the stack in real time across title/label/category/caption/reflection, EXTRA and category pills appear on visible cards while search is active, the empty state renders correctly when no cards match, and Escape clears and closes the search.
- [ ] The About sheet opens from the top bar `info.circle` icon, includes a "Replay intro" link, and closes cleanly.
- [ ] The site is fully responsive and looks correct on a 375px iPhone, a 768px tablet, and a 1440px desktop.
- [ ] Reduced-motion preference is respected throughout (intro, hero animation, dot field).
- [ ] The site deploys to Vercel without errors, including the API routes for the visitor signatures.
- [ ] No emoji icons anywhere. SF Symbol placeholders only.

---

## 15. Out of scope for this build

- Light/dark mode switching (Apple Wallet has both, but this build only does light to keep scope tight).
- Analytics, telemetry, or any tracking.
- A CMS or admin interface. All content is hard-coded in `passes.ts`.
- An overflow "..." menu in the top bar. Cut intentionally to avoid dead UI.

---

## 16. Open questions for the build

None. Proceed with the spec as written. If a design decision is ambiguous, default to whatever most closely matches the reference screenshots and the actual Apple Wallet app.
