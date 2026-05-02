import { createHash } from 'node:crypto';

interface VisitorRecord {
  firstName: string;
  lastName: string;
  createdAt: string;
}

const NAME_MAX = 30;
const MAX_PAYLOAD_BYTES = 1024;
const FEED_KEY = 'portfolio:visitors:feed';
const IP_PREFIX = 'portfolio:visitors:ip:';

const BLOCKLIST = new Set<string>([
  // Casual filter only. Add or trim as needed.
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'nigger',
  'faggot',
]);

function isClean(value: string): boolean {
  const lower = value.toLowerCase();
  for (const word of BLOCKLIST) {
    if (lower.includes(word)) return false;
  }
  return true;
}

function isLikelyValid(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 2 || trimmed.length > NAME_MAX) return false;
  if (/^(.)\1+$/.test(trimmed)) return false;
  return isClean(trimmed);
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function ipHash(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

async function loadKv() {
  try {
    if (!process.env.KV_REST_API_URL && !process.env.KV_URL) return null;
    const mod = await import('@vercel/kv').catch(() => null);
    return mod?.kv ?? null;
  } catch {
    return null;
  }
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request) {
  if (req.method === 'GET') {
    const kv = await loadKv();
    if (!kv) return json(200, { visitors: [] });
    try {
      const items = (await kv.lrange<VisitorRecord>(FEED_KEY, 0, 99)) ?? [];
      return json(200, { visitors: items });
    } catch {
      return json(200, { visitors: [] });
    }
  }

  if (req.method !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return json(413, { ok: false, error: 'Payload too large' });
  }

  let body: { firstName?: unknown; lastName?: unknown };
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';

  if (!isLikelyValid(firstName) || !isLikelyValid(lastName)) {
    return json(400, { ok: false, error: 'Please enter a real first and last name.' });
  }

  const record: VisitorRecord = {
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
  };

  const kv = await loadKv();
  if (!kv) {
    // No KV configured. Accept the submission so the UX completes; the
    // localStorage flag on the client prevents re-prompting.
    return json(200, { ok: true, persisted: false });
  }

  try {
    const ip = clientIp(req);
    const ipKey = `${IP_PREFIX}${ipHash(ip)}`;
    const seen = await kv.get<string>(ipKey);
    if (seen) {
      // Same IP already signed. Silent success.
      return json(200, { ok: true, persisted: true, deduped: true });
    }
    await kv.lpush(FEED_KEY, record);
    await kv.ltrim(FEED_KEY, 0, 99);
    await kv.set(ipKey, '1', { ex: 60 * 60 * 24 * 365 });
    return json(200, { ok: true, persisted: true });
  } catch {
    return json(200, { ok: true, persisted: false });
  }
}
