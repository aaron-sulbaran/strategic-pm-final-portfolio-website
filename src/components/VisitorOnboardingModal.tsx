import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface VisitorOnboardingModalProps {
  open: boolean;
  onSign: (firstName: string, lastName: string) => Promise<void> | void;
  onSkip: () => void;
  onReturning: () => void;
}

const NAME_MAX = 30;

function isLikelyValid(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  if (/^(.)\1+$/.test(trimmed)) return false;
  return true;
}

export function VisitorOnboardingModal({
  open,
  onSign,
  onSkip,
  onReturning,
}: VisitorOnboardingModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 250);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const canSubmit =
    isLikelyValid(firstName) && isLikelyValid(lastName) && !submitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSign(firstName.trim(), lastName.trim());
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Could not save your name. Please try again.',
      );
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="visitor-onboarding"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="visitor-onboarding-title"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            className="relative w-full sm:max-w-[420px] mx-auto px-5 pb-6 pt-7 sm:p-7 bg-black text-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex flex-col items-center text-center">
              <h2
                id="visitor-onboarding-title"
                className="text-[22px] font-bold tracking-tight"
              >
                New visitor detected
              </h2>
              <p className="mt-1 text-[15px] text-[#8E8E93]">
                Add your name so it lands on the visitor pass.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="rounded-2xl bg-[#1C1C1E] overflow-hidden">
                <label className="flex items-center px-4 h-[52px]">
                  <span className="text-[15px] text-[#8E8E93] w-[110px] shrink-0">
                    First Name
                  </span>
                  <input
                    ref={firstInputRef}
                    type="text"
                    inputMode="text"
                    autoComplete="given-name"
                    maxLength={NAME_MAX}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Required"
                    className="flex-1 bg-transparent outline-none text-[17px] text-white placeholder:text-[#48484A]"
                    aria-label="First name"
                  />
                </label>
                <div className="h-px bg-white/10 ml-[110px] mr-4" />
                <label className="flex items-center px-4 h-[52px]">
                  <span className="text-[15px] text-[#8E8E93] w-[110px] shrink-0">
                    Last Name
                  </span>
                  <input
                    type="text"
                    inputMode="text"
                    autoComplete="family-name"
                    maxLength={NAME_MAX}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Required"
                    className="flex-1 bg-transparent outline-none text-[17px] text-white placeholder:text-[#48484A]"
                    aria-label="Last name"
                  />
                </label>
              </div>

              {error && (
                <p className="mt-3 text-[13px] text-[#FF6961] text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-5 w-full h-[50px] rounded-full bg-[#007AFF] text-white text-[17px] font-semibold disabled:opacity-40 transition-opacity"
              >
                {submitting ? 'Adding to Wallet…' : 'Add to Wallet'}
              </button>

              <div className="mt-4 flex items-center justify-between text-[15px]">
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-[#8E8E93] hover:text-white transition-colors px-1 py-2"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={onReturning}
                  className="text-[#0A84FF] font-medium px-1 py-2"
                >
                  I&rsquo;ve been here before
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
