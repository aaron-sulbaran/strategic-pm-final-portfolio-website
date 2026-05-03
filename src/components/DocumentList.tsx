import { forwardRef } from 'react';
import type { CardStyle, PassDocument } from '../data/passes';
import { Icon, type SFSymbol } from './Icon';

interface DocumentListProps {
  documents: PassDocument[];
  cardStyle: CardStyle;
  onOpen: (doc: PassDocument, rowEl: HTMLButtonElement | null) => void;
  /** Map of document index -> ref for focus return. */
  registerRowRef?: (index: number, el: HTMLButtonElement | null) => void;
}

const DEFAULT_ICON: Record<PassDocument['type'], SFSymbol> = {
  markdown: 'doc.text',
  pdf: 'doc.richtext',
  image: 'photo',
  iframe: 'arrow.up.right.square',
  external: 'arrow.up.right.square',
  video: 'play.rectangle.fill',
};

const DEFAULT_SUBTITLE: Record<PassDocument['type'], string> = {
  markdown: 'Document',
  pdf: 'PDF Document',
  image: 'Image',
  iframe: 'External link',
  external: 'External link',
  video: 'Video',
};

export function DocumentList({
  documents,
  cardStyle,
  onOpen,
  registerRowRef,
}: DocumentListProps) {
  const tintBg = cardStyle.tint ?? 'rgba(0, 0, 0, 0.05)';
  const tintFg = cardStyle.tintFg ?? 'var(--text-secondary)';
  const heading = documents.length === 1 ? 'Document' : 'Documents';

  return (
    <section aria-label={heading} className="mt-8">
      <h2 className="font-sf font-bold text-[22px] tracking-[-0.2px] text-text-primary mb-3">
        {heading}
      </h2>
      <div className="rounded-card-content bg-bg-card-white shadow-card overflow-hidden">
        {documents.map((doc, i) => (
          <Row
            key={`${doc.src}-${i}`}
            ref={(el) => registerRowRef?.(i, el)}
            doc={doc}
            tintBg={tintBg}
            tintFg={tintFg}
            withDivider={i > 0}
            onClick={(rowEl) => onOpen(doc, rowEl)}
          />
        ))}
      </div>
    </section>
  );
}

interface RowProps {
  doc: PassDocument;
  tintBg: string;
  tintFg: string;
  withDivider: boolean;
  onClick: (el: HTMLButtonElement | null) => void;
}

const Row = forwardRef<HTMLButtonElement, RowProps>(function Row(
  { doc, tintBg, tintFg, withDivider, onClick },
  ref,
) {
  const iconName = (doc.iconSymbol as SFSymbol | undefined) ?? DEFAULT_ICON[doc.type];
  const subtitle = doc.subtitle ?? DEFAULT_SUBTITLE[doc.type];
  const isExternal = doc.type === 'external' || doc.type === 'iframe';

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => onClick(e.currentTarget)}
      className={`group w-full flex items-center text-left gap-3 px-4 py-3 transition-colors hover:bg-black/[0.02] active:bg-black/[0.04] ${
        withDivider ? 'border-t border-divider' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className="flex-shrink-0 w-11 h-11 rounded-[10px] flex items-center justify-center"
        style={{ background: tintBg, color: tintFg }}
      >
        <Icon name={iconName} size={22} />
      </span>

      <span className="flex-1 min-w-0 flex flex-col">
        <span className="font-sf font-semibold text-[17px] text-text-primary leading-tight truncate">
          {doc.title}
        </span>
        <span className="font-sf text-[15px] text-text-tertiary leading-snug truncate">
          {subtitle}
        </span>
      </span>

      <span className="flex items-center gap-2 flex-shrink-0">
        {doc.isExtra && (
          <span className="px-1.5 py-0.5 rounded bg-accent-blue text-white font-sf font-semibold text-[11px] uppercase tracking-[0.05em] leading-none">
            Extra
          </span>
        )}
        <span aria-hidden="true" className="text-text-quaternary">
          <Icon name={isExternal ? 'arrow.up.right.square' : 'chevron.right'} size={16} />
        </span>
      </span>
    </button>
  );
});
