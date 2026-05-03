/// <reference types="vite/client" />
// Two icon sources, dispatched in this order at render time:
//
// 1. Hand-traced inline SVGs in PATHS below. Used for high-traffic chrome
//    glyphs (chevrons, search, close, etc.) so they read crisp at any size.
//
// 2. SF Symbol SVG exports auto-discovered from src/assets/sf-symbols/.
//    Drop a file at src/assets/sf-symbols/{name}.svg (e.g.
//    src/assets/sf-symbols/heart.svg) and it lights up automatically
//    wherever <Icon name="heart" /> is rendered. No registration needed.
//    The dotted SF Symbol naming convention works as filenames on macOS;
//    if your filesystem complains, use the same name with dots and the
//    glob will pick it up.
//
// 3. Placeholder rect with the symbol name as text, used only when neither
//    a hand-traced glyph nor a dropped SVG file is available. This is the
//    visual cue to drop the asset in.

// Vite glob: `eager: true` inlines all SVGs at build time, `as: 'url'`
// returns the asset URL string. New files added to the folder are picked
// up on the next dev rebuild or production build.
const SF_SYMBOL_FILES = import.meta.glob('../assets/sf-symbols/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// Index by symbol name, e.g. 'heart' -> '/assets/sf-symbols/heart.svg'.
const SF_SYMBOL_URLS: Record<string, string> = {};
for (const [path, url] of Object.entries(SF_SYMBOL_FILES)) {
  const name = path.split('/').pop()?.replace(/\.svg$/, '');
  if (name) SF_SYMBOL_URLS[name] = url;
}

// Names referenced by hand-traced glyphs OR by structured content data files.
// New names can be added freely; the dropped SVG (if any) wins, otherwise
// the type still validates and a placeholder rect renders.
export type SFSymbol =
  // Chrome glyphs (hand-traced inline)
  | 'chevron.left'
  | 'chevron.right'
  | 'info.circle'
  | 'magnifyingglass'
  | 'magnifyingglass.large'
  | 'person.2.fill'
  | 'xmark'
  | 'xmark.circle.fill'
  | 'plus'
  | 'ellipsis'
  | 'doc.text'
  | 'doc.richtext'
  | 'photo'
  | 'play.rectangle.fill'
  | 'arrow.up.right.square'
  // Structured artifact glyphs (drop SVGs at src/assets/sf-symbols/{name}.svg)
  | 'link'
  | 'gearshape'
  | 'cube.box'
  | 'gift'
  | 'heart'
  | 'paperplane'
  | 'person.3'
  | 'arrow.down.right.circle'
  | 'arrow.up.right.circle'
  | 'sparkles'
  | 'shield'
  | 'person.crop.circle'
  | 'star'
  | 'exclamationmark.triangle'
  | 'exclamationmark.bubble'
  | 'chart.line.uptrend.xyaxis';

interface IconProps {
  name: SFSymbol;
  size?: number;
  className?: string;
  title?: string;
}

const PATHS: Partial<Record<SFSymbol, JSX.Element>> = {
  'chevron.left': (
    <path
      d="M19 6 L11 14 L19 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron.right': (
    <path
      d="M13 6 L21 14 L13 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'doc.text': (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 4 H18 L24 10 V26 a2 2 0 0 1 -2 2 H8 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2 -2 z" />
      <path d="M18 4 V10 H24" />
      <path d="M10 16 H20" />
      <path d="M10 20 H20" />
      <path d="M10 24 H17" />
    </g>
  ),
  'doc.richtext': (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 4 H18 L24 10 V26 a2 2 0 0 1 -2 2 H8 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2 -2 z" />
      <path d="M18 4 V10 H24" />
      <path d="M10 16 H20" stroke="currentColor" strokeWidth="2.4" />
      <path d="M10 20 H20" />
      <path d="M10 24 H17" />
    </g>
  ),
  photo: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <rect x="4" y="6" width="24" height="20" rx="3" />
      <circle cx="11" cy="13" r="2" fill="currentColor" stroke="none" />
      <path d="M5 22 L12 16 L18 21 L22 18 L27 23" />
    </g>
  ),
  'play.rectangle.fill': (
    <g>
      <rect x="3" y="6" width="26" height="20" rx="3" fill="currentColor" />
      <path d="M13 11 L21 16 L13 21 z" fill="white" />
    </g>
  ),
  'arrow.up.right.square': (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <rect x="5" y="5" width="22" height="22" rx="4" />
      <path d="M13 19 L21 11" />
      <path d="M14 11 H21 V18" />
    </g>
  ),
  'info.circle': (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="16" cy="16" r="11" />
      <path d="M16 14 V22" />
      <circle cx="16" cy="10.5" r="0.1" stroke="currentColor" strokeWidth="2.6" />
    </g>
  ),
  magnifyingglass: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="14" cy="14" r="7" />
      <path d="M19.5 19.5 L26 26" />
    </g>
  ),
  'xmark.circle.fill': (
    <g>
      <circle cx="16" cy="16" r="12" fill="currentColor" />
      <path
        d="M11 11 L21 21 M21 11 L11 21"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  ),
};

/**
 * SF Symbol slot.
 *
 * Resolution order:
 *   1. Dropped SVG file at src/assets/sf-symbols/{name}.svg (auto-discovered)
 *   2. Hand-traced inline glyph in PATHS above
 *   3. Labelled placeholder rect with the symbol name
 *
 * To register a new symbol: just drop the SVG export. No code changes
 * required if the symbol name already appears in the SFSymbol type. To
 * add a brand-new name, extend the SFSymbol union above.
 */
export function Icon({ name, size = 22, className = '', title }: IconProps) {
  const dropUrl = SF_SYMBOL_URLS[name];
  if (dropUrl) {
    return (
      <img
        src={dropUrl}
        width={size}
        height={size}
        alt={title ?? ''}
        aria-hidden={title ? undefined : true}
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      />
    );
  }

  const glyph = PATHS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <title>{title ?? name}</title>
      {glyph ?? (
        <>
          <rect
            x="2.5"
            y="2.5"
            width="27"
            height="27"
            rx="6"
            ry="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          />
          <text
            x="16"
            y="18"
            textAnchor="middle"
            fontSize="6"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
            fill="currentColor"
            opacity="0.75"
          >
            {name}
          </text>
        </>
      )}
    </svg>
  );
}
