import { FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  listVisitors,
  relativeTime,
  signVisitor,
  type VisitorRecord,
} from '../lib/visitors';

const NAME_MAX = 30;
const SIGNED_KEY = 'portfolio_visitor_signed';

function isLikelyValid(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  if (/^(.)\1+$/.test(trimmed)) return false;
  return true;
}

function readSignedFlag(): boolean {
  try {
    return window.localStorage.getItem(SIGNED_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeSignedFlag() {
  try {
    window.localStorage.setItem(SIGNED_KEY, 'true');
  } catch {
    // ignore
  }
}

export function VisitorFeed() {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [signed, setSigned] = useState<boolean>(false);

  useEffect(() => {
    setSigned(readSignedFlag());
    let cancelled = false;
    (async () => {
      const res = await listVisitors();
      if (cancelled) return;
      setVisitors(res.visitors);
      setAvailable(res.available);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleAfterSign(record: VisitorRecord) {
    setVisitors((prev) => [record, ...prev].slice(0, 100));
    setSigned(true);
    writeSignedFlag();
    setShowForm(false);
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sf font-semibold text-[15px] uppercase tracking-[0.08em] text-text-tertiary">
          Signatures
        </h2>
        {!signed && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-[15px] font-medium text-accent-blue px-1 py-2"
          >
            Sign the wall
          </button>
        )}
      </div>

      {signed && !showForm && (
        <div className="mt-3 rounded-card-content bg-bg-card-white shadow-card p-4 text-[15px] text-text-secondary">
          Thanks for signing. Your name is on the wall.
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <SignForm
            key="sign-form"
            onCancel={() => setShowForm(false)}
            onSigned={handleAfterSign}
          />
        )}
      </AnimatePresence>

      <div className="mt-4">
        {loading ? (
          <p className="font-sf text-[15px] text-text-tertiary italic">
            Loading signatures…
          </p>
        ) : !available ? (
          <p className="font-sf text-[15px] text-text-tertiary italic">
            Signatures will appear here once the portfolio is live on Vercel.
          </p>
        ) : visitors.length === 0 ? (
          <p className="font-sf text-[15px] text-text-tertiary italic">
            No one has signed yet. Be the first.
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Visitor signatures">
            {visitors.map((v, i) => (
              <li
                key={`${v.createdAt}-${i}`}
                className="rounded-card-content bg-bg-card-white shadow-card px-4 py-3 flex items-center justify-between"
              >
                <span className="font-sf font-semibold text-[17px] text-text-primary">
                  {v.firstName} {v.lastName}
                </span>
                <span className="font-sf text-[13px] text-text-tertiary">
                  {relativeTime(v.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

interface SignFormProps {
  onCancel: () => void;
  onSigned: (record: VisitorRecord) => void;
}

function SignForm({ onCancel, onSigned }: SignFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    isLikelyValid(firstName) && isLikelyValid(lastName) && !submitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const result = await signVisitor({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
    if (!result.ok) {
      setError(result.error ?? 'Could not save your name.');
      setSubmitting(false);
      return;
    }
    onSigned({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-4 rounded-card-content bg-bg-card-white shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <label className="flex items-center px-4 h-[52px]">
        <span className="text-[15px] text-text-tertiary w-[110px] shrink-0">
          First Name
        </span>
        <input
          type="text"
          autoComplete="given-name"
          maxLength={NAME_MAX}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Required"
          className="flex-1 bg-transparent outline-none text-[17px] text-text-primary placeholder:text-text-quaternary"
          aria-label="First name"
        />
      </label>
      <div className="h-px bg-divider ml-[110px] mr-4" />
      <label className="flex items-center px-4 h-[52px]">
        <span className="text-[15px] text-text-tertiary w-[110px] shrink-0">
          Last Name
        </span>
        <input
          type="text"
          autoComplete="family-name"
          maxLength={NAME_MAX}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Required"
          className="flex-1 bg-transparent outline-none text-[17px] text-text-primary placeholder:text-text-quaternary"
          aria-label="Last name"
        />
      </label>

      {error && (
        <p className="px-4 pt-2 text-[13px] text-[#D70015]">{error}</p>
      )}

      <div className="px-4 py-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex-1 h-[44px] rounded-full bg-accent-blue text-white text-[15px] font-semibold disabled:opacity-40"
        >
          {submitting ? 'Signing…' : 'Sign'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[15px] text-text-tertiary px-2"
        >
          No thanks, just viewing
        </button>
      </div>
    </motion.form>
  );
}
