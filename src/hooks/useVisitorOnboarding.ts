import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_visitor_onboarding_state';

export type OnboardingState = 'pending' | 'signed' | 'skipped' | 'returning';

export interface UseVisitorOnboarding {
  shouldShow: boolean;
  markSigned: () => void;
  markSkipped: () => void;
  markReturning: () => void;
  reset: () => void;
}

function readState(): OnboardingState {
  if (typeof window === 'undefined') return 'pending';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'signed' || raw === 'skipped' || raw === 'returning') return raw;
    return 'pending';
  } catch {
    return 'pending';
  }
}

function writeState(state: Exclude<OnboardingState, 'pending'>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Quota or privacy mode. Fall through; the modal stays dismissed for this session.
  }
}

/**
 * Tracks whether the visitor onboarding modal should appear.
 *
 * The modal shows once per browser. After the visitor signs, skips, or
 * self-identifies as returning, the choice is stored in localStorage and
 * the modal does not appear again on refresh or future visits from the
 * same browser.
 *
 * Why localStorage and not server-side IP dedup as the gate: localStorage
 * is the single source of truth the user said is acceptable. The API can
 * still hash the IP server-side as a soft rate-limit, but the prompt
 * gate lives on the client so refresh is instant and offline-safe.
 */
export function useVisitorOnboarding(delayMs = 700): UseVisitorOnboarding {
  const [state, setState] = useState<OnboardingState>('pending');
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    setState(readState());
  }, []);

  useEffect(() => {
    if (state !== 'pending') return;
    const handle = window.setTimeout(() => setDelayElapsed(true), delayMs);
    return () => window.clearTimeout(handle);
  }, [state, delayMs]);

  return {
    shouldShow: state === 'pending' && delayElapsed,
    markSigned: () => {
      writeState('signed');
      setState('signed');
    },
    markSkipped: () => {
      writeState('skipped');
      setState('skipped');
    },
    markReturning: () => {
      writeState('returning');
      setState('returning');
    },
    reset: () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setState('pending');
      setDelayElapsed(false);
    },
  };
}
