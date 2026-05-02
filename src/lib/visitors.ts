export interface SignVisitorPayload {
  firstName: string;
  lastName: string;
}

export interface SignVisitorResult {
  ok: boolean;
  error?: string;
  persisted?: boolean;
}

export interface VisitorRecord {
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface VisitorsListResult {
  visitors: VisitorRecord[];
  available: boolean;
}

export async function signVisitor(payload: SignVisitorPayload): Promise<SignVisitorResult> {
  try {
    const res = await fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      if (res.status === 404 || res.status === 405) {
        return { ok: true, persisted: false };
      }
      const data = await res.json().catch(() => ({}));
      return {
        ok: false,
        error: typeof data?.error === 'string' ? data.error : 'Save failed.',
      };
    }
    const data = await res.json().catch(() => ({}));
    return { ok: true, persisted: data?.persisted === true };
  } catch {
    return { ok: true, persisted: false };
  }
}

export async function listVisitors(): Promise<VisitorsListResult> {
  try {
    const res = await fetch('/api/visitors', { method: 'GET' });
    if (!res.ok) return { visitors: [], available: false };
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      // Plain Vite dev returns the SPA shell for unknown routes. Treat as unavailable.
      return { visitors: [], available: false };
    }
    const data = await res.json().catch(() => ({}));
    const visitors = Array.isArray(data?.visitors) ? (data.visitors as VisitorRecord[]) : [];
    return { visitors, available: true };
  } catch {
    return { visitors: [], available: false };
  }
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}
