import { createHash } from 'node:crypto';

interface VisitorRecord {
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface VisitorStore {
  visitors: VisitorRecord[];
  ipHashes: string[];
  updatedAt: string;
}

const NAME_MAX = 30;
const MAX_PAYLOAD_BYTES = 1024;
const MAX_VISITORS = 500;
const MAX_IP_HASHES = 1000;
const STORE_PATHNAME = 'portfolio/visitors.json';

const BLOCKLIST = new Set<string>([
  // Casual filter only.
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

function emptyStore(): VisitorStore {
  return { visitors: [], ipHashes: [], updatedAt: new Date(0).toISOString() };
}

async function loadBlob() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
    const mod = await import('@vercel/blob').catch(() => null);
    return mod ?? null;
  } catch {
    return null;
  }
}

async function readStore(blob: NonNullable<Awaited<ReturnType<typeof loadBlob>>>): Promise<VisitorStore> {
  try {
    const listing = await blob.list({ prefix: STORE_PATHNAME, limit: 1 });
    const match = listing.blobs.find((b) => b.pathname === STORE_PATHNAME);
    if (!match) return emptyStore();
    const downloadUrl =
      typeof (match as { downloadUrl?: string }).downloadUrl === 'string'
        ? (match as { downloadUrl: string }).downloadUrl
        : match.url;
    const res = await fetch(downloadUrl, {
      cache: 'no-store',
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!res.ok) return emptyStore();
    const data = (await res.json()) as Partial<VisitorStore>;
    return {
      visitors: Array.isArray(data.visitors) ? data.visitors.slice(0, MAX_VISITORS) : [],
      ipHashes: Array.isArray(data.ipHashes) ? data.ipHashes.slice(0, MAX_IP_HASHES) : [],
      updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date(0).toISOString(),
    };
  } catch {
    return emptyStore();
  }
}

async function writeStore(
  blob: NonNullable<Awaited<ReturnType<typeof loadBlob>>>,
  store: VisitorStore,
): Promise<void> {
  // The store itself is configured as private on Vercel; individual puts still
  // use access: 'public' because that is the only value the SDK accepts. The
  // store-level privacy is what keeps the JSON unreachable without the token.
  await blob.put(STORE_PATHNAME, JSON.stringify(store), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request) {
  const url = new URL(req.url);

  if (req.method === 'GET' && url.searchParams.get('debug') === '1') {
    return json(200, {
      hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN
        ? process.env.BLOB_READ_WRITE_TOKEN.slice(0, 12)
        : null,
      runtime: 'nodejs',
    });
  }

  if (req.method === 'GET') {
    const blob = await loadBlob();
    if (!blob) return json(200, { visitors: [], persisted: false });
    try {
      const store = await readStore(blob);
      return json(200, { visitors: store.visitors.slice(0, 100), persisted: true });
    } catch (err) {
      console.error('[api/visitors] GET failed', err);
      return json(200, { visitors: [], persisted: false });
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

  const blob = await loadBlob();
  if (!blob) {
    console.error('[api/visitors] BLOB_READ_WRITE_TOKEN missing or @vercel/blob unavailable');
    return json(503, {
      ok: false,
      error:
        'Visitor storage is not configured. Connect a Vercel Blob store and redeploy.',
    });
  }

  try {
    const store = await readStore(blob);
    const ipKey = ipHash(clientIp(req));

    if (store.ipHashes.includes(ipKey)) {
      return json(200, { ok: true, persisted: true, deduped: true });
    }

    const next: VisitorStore = {
      visitors: [record, ...store.visitors].slice(0, MAX_VISITORS),
      ipHashes: [ipKey, ...store.ipHashes].slice(0, MAX_IP_HASHES),
      updatedAt: new Date().toISOString(),
    };

    await writeStore(blob, next);
    return json(200, { ok: true, persisted: true });
  } catch (err) {
    console.error('[api/visitors] POST failed', err);
    const message =
      err instanceof Error && err.message ? err.message : 'Unknown blob error';
    return json(500, { ok: false, error: `Blob write failed: ${message}` });
  }
}
