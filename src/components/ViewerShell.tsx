import { ReactNode, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icon';

interface ViewerShellProps {
  onClose: () => void;
  children: ReactNode;
  /** Background of the viewer surface. Defaults to bg-app (lavender-gray). */
  background?: string;
  /** When provided, sets aria-labelledby on the dialog. */
  titleId?: string;
}

const PUSH_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0.0, 1] as [number, number, number, number] };
const FADE_TRANSITION = { duration: 0.2, ease: 'easeOut' as const };

export function ViewerShell({ onClose, children, background, titleId }: ViewerShellProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      backButtonRef.current?.focus();
    }, 80);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: FADE_TRANSITION,
      }
    : {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { x: '100%' },
        transition: PUSH_TRANSITION,
      };

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-40 flex flex-col"
      style={{
        background: background ?? 'var(--bg-app)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      {...motionProps}
    >
      <header className="flex-shrink-0 w-full flex justify-center">
        <div className="w-full max-w-wallet px-5 pt-14 pb-3 flex items-center">
          <button
            ref={backButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Back"
            className="w-11 h-11 rounded-full bg-bg-card-white shadow-pill flex items-center justify-center text-text-secondary active:scale-95 transition-transform"
          >
            <Icon name="chevron.left" size={20} />
          </button>
        </div>
      </header>
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
    </motion.div>
  );
}
