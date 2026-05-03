export type SFSymbol =
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
  | 'arrow.up.right.square';

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
 * For high-traffic UI symbols, we ship hand-traced SVG glyphs (defined in
 * PATHS above) so the chrome reads as production-ready Apple-style iconography.
 * For symbols not yet traced, we fall back to a labeled placeholder rect.
 *
 * To swap the placeholder for a real symbol later: drop the SF Symbols .svg
 * export at /public/assets/icons/{name}.svg and add an <img> branch here.
 */
export function Icon({ name, size = 22, className = '', title }: IconProps) {
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
