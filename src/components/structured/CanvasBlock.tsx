import type { CSSProperties } from 'react';
import { Icon, type SFSymbol } from '../Icon';
import { structuredTokens } from '../../styles/structuredTokens';

interface CanvasBlockProps {
  iconSymbol: string;
  title: string;
  items: string[];
  style?: CSSProperties;
  className?: string;
}

// Used by the BMC and VPC renderers. White card, SF Symbol icon top-left,
// uppercase block title, then a bulleted list of items. Single source of
// truth for the canvas block visual treatment.
export function CanvasBlock({
  iconSymbol,
  title,
  items,
  style,
  className = '',
}: CanvasBlockProps) {
  return (
    <section
      className={`flex flex-col h-full ${className}`}
      style={{
        background: structuredTokens.card.background,
        borderRadius: structuredTokens.card.radius,
        padding: structuredTokens.card.padding,
        boxShadow: structuredTokens.card.shadow,
        border: structuredTokens.card.border,
        ...style,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          aria-hidden="true"
          style={{ color: structuredTokens.blockIcon.color }}
        >
          <Icon
            name={iconSymbol as SFSymbol}
            size={structuredTokens.blockIcon.size}
          />
        </span>
        <h3 style={structuredTokens.sectionLabel} className="font-sf">
          {title}
        </h3>
      </div>
      <ul className="m-0 p-0 list-none flex-1">
        {items.map((item, i) => (
          <li
            key={i}
            style={structuredTokens.bulletItem}
            className="font-sf"
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 2,
                top: 0,
                color: 'var(--text-tertiary)',
              }}
            >
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
