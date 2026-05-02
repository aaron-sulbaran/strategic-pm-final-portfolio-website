import { motion } from 'framer-motion';
import type { Pass } from '../data/passes';

type Variant = 'stack' | 'hero';

interface PassCardProps {
  pass: Pass;
  variant: Variant;
  onClick?: () => void;
  /** When in stack variant, how many pixels of the card top edge are visible. */
  stackRevealHeight?: number;
}

const HERO_ASPECT = 1.586;

export function PassCard({
  pass,
  variant,
  onClick,
  stackRevealHeight = 110,
}: PassCardProps) {
  const isStack = variant === 'stack';
  const isWhite = pass.cardStyle.textColor === 'white';
  const labelTone = isWhite ? 'text-white/95' : 'text-black/85';
  const subtitleTone = isWhite ? 'text-white/70' : 'text-black/55';

  const subtitle = pass.isVisitorPass
    ? 'Sign In'
    : pass.isExtra
    ? 'Extra'
    : pass.category;

  const ariaLabel = `${pass.title}, ${subtitle}`;

  const Wrapper: React.ElementType = onClick ? motion.button : motion.div;

  return (
    <Wrapper
      layoutId={`pass-card-${pass.id}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      aria-label={onClick ? ariaLabel : undefined}
      className={[
        'relative block w-full overflow-hidden rounded-card shadow-card text-left',
        'transform-gpu',
        onClick ? 'cursor-pointer' : '',
      ].join(' ')}
      style={{
        background: pass.cardStyle.background,
        height: isStack ? stackRevealHeight : undefined,
        aspectRatio: isStack ? undefined : `${HERO_ASPECT} / 1`,
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      whileHover={onClick ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }}
    >
      {/* Brand strip: top-left short label, top-right subtitle */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-3.5">
        <span
          className={`font-sf font-semibold text-[17px] pass-label-shadow ${labelTone}`}
        >
          {pass.shortLabel}
        </span>
        <span
          className={`font-sf font-medium text-[12px] uppercase tracking-[0.08em] pass-label-shadow ${subtitleTone}`}
        >
          {subtitle}
        </span>
      </div>

      {/* Number badge bottom-right (hero only) */}
      {!isStack && !pass.isVisitorPass && (
        <div className="absolute right-4 bottom-3.5">
          <span
            className={`font-sf font-semibold text-[12px] tracking-[0.06em] uppercase pass-label-shadow ${subtitleTone}`}
          >
            {String(pass.number).padStart(2, '0')} of 12
          </span>
        </div>
      )}

      {/* Hero-only large title in lower portion */}
      {!isStack && (
        <div className="absolute left-4 bottom-9">
          <span
            className={`font-sf font-semibold text-[20px] leading-tight pass-label-shadow ${labelTone}`}
          >
            {pass.title}
          </span>
        </div>
      )}
    </Wrapper>
  );
}
