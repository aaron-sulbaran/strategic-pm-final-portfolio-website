# SF Symbols Drop Folder

Drop SF Symbol SVG exports in this folder. They are auto-discovered by
`src/components/Icon.tsx` via `import.meta.glob` and used wherever
`<Icon name="..." />` is rendered. No code changes required.

## How to add a symbol

1. Open SF Symbols.app on macOS.
2. Pick the symbol that matches the name in the table below.
3. File > Export Symbol... > SVG (Static).
4. Save it into this folder using the **exact filename** listed below
   (dots in the name are fine; macOS handles them).
5. Run `npm run dev` (or restart it). The icon now renders site-wide.

## Resolution order

For any `<Icon name="X" />`:

1. If `src/assets/sf-symbols/X.svg` exists, render it as an `<img>`.
2. Else if a hand-traced inline glyph for X exists in `Icon.tsx`, render that.
3. Else render a labelled placeholder rect with the name.

## Required filenames

These names are used by the structured artifact renderers (BMC, VPC,
Vision Board, OST, Product Scorecard, etc.). Until each file is dropped,
the renderers fall back to placeholder rects.

| Filename | Used by |
|---|---|
| `link.svg` | BMC: Key Partners |
| `gearshape.svg` | BMC: Key Activities |
| `cube.box.svg` | BMC: Key Resources, VPC: Products and Services, Vision Board: Product |
| `gift.svg` | BMC: Value Propositions |
| `heart.svg` | BMC: Customer Relationships |
| `paperplane.svg` | BMC: Channels |
| `person.3.svg` | BMC: Customer Segments, Vision Board: Target Group |
| `arrow.down.right.circle.svg` | BMC: Cost Structure |
| `arrow.up.right.circle.svg` | BMC: Revenue Streams |
| `sparkles.svg` | VPC: Gain Creators |
| `shield.svg` | VPC: Pain Relievers |
| `person.crop.circle.svg` | VPC: Customer Jobs |
| `star.svg` | VPC: Gains |
| `exclamationmark.triangle.svg` | VPC: Pains |
| `exclamationmark.bubble.svg` | Vision Board: Needs |
| `chart.line.uptrend.xyaxis.svg` | Vision Board: Business Goals |

## Optional chrome glyphs

These already have hand-traced inline SVGs in `Icon.tsx` and look
production-quality. You only need to drop a file here if you want the
exact SF Symbol export to take over.

`chevron.left`, `chevron.right`, `info.circle`, `magnifyingglass`,
`magnifyingglass.large`, `person.2.fill`, `xmark`, `xmark.circle.fill`,
`plus`, `ellipsis`, `doc.text`, `doc.richtext`, `photo`,
`play.rectangle.fill`, `arrow.up.right.square`.

## Adding a brand-new symbol name

If you reference an SF Symbol the SFSymbol union in `Icon.tsx` doesn't
already include, just add it to that union. The drop pipeline picks up
the file automatically.
