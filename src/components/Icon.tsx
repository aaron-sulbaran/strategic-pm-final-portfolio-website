export type SFSymbol =
  | 'chevron.left'
  | 'info.circle'
  | 'magnifyingglass'
  | 'magnifyingglass.large'
  | 'person.2.fill'
  | 'xmark'
  | 'xmark.circle.fill'
  | 'plus'
  | 'ellipsis';

interface IconProps {
  name: SFSymbol;
  size?: number;
  className?: string;
  title?: string;
}

/**
 * SF Symbol slot.
 *
 * Per AGENTS.md, no icon library substitutions. Until you drop real SF Symbol
 * SVG exports at /public/assets/icons/{name}.svg, this renders a labeled
 * placeholder rect with the symbol name so you can see exactly which icons
 * still need to be exported.
 *
 * To swap in a real symbol:
 *   1. Open SF Symbols.app on a Mac.
 *   2. Find the symbol whose name matches the `name` prop (e.g. `info.circle`).
 *   3. File > Export Symbol as SVG.
 *   4. Save into /public/assets/icons/ with the EXACT filename
 *      `{name}.svg` (e.g. `info.circle.svg`).
 *   5. Replace this placeholder file with an `<img>`-based version that loads
 *      from `/assets/icons/{name}.svg`.
 */
export function Icon({ name, size = 22, className = '', title }: IconProps) {
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
      <title>{`SF Symbol placeholder: ${name}`}</title>
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
    </svg>
  );
}
