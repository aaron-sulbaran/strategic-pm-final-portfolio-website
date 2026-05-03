import { createHash } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const forwardedHeader = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (forwardedHeader) return forwardedHeader.split(',')[0]!.trim();
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string') return realIp;
  return 'unknown';
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
  // Store is configured as private on Vercel; the SDK now requires the put
  // to declare access: 'private' to match. The TS types still mark this as
  // a string-union mismatch on some versions, hence the cast.
  await blob.put(STORE_PATHNAME, JSON.stringify(store), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  } as unknown as Parameters<typeof blob.put>[2]);
}

function send(res: VercelResponse, status: number, body: unknown): void {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send(JSON.stringify(body));
}

export const config = { runtime: 'nodejs' };

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const isDebug =
    req.method === 'GET' &&
    typeof req.query.debug === 'string' &&
    req.query.debug === '1';

  if (isDebug) {
    return send(res, 200, {
      hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN
        ? process.env.BLOB_READ_WRITE_TOKEN.slice(0, 12)
        : null,
      runtime: 'nodejs',
      method: req.method,
    });
  }

  // One-shot removal of the "Claude Test" smoke-test row added during debugging.
  if (req.method === 'GET' && req.query.removeTestRow === '1') {
    const blob = await loadBlob();
    if (!blob) return send(res, 503, { ok: false, error: 'Blob unavailable' });
    try {
      const store = await readStore(blob);
      const filtered = store.visitors.filter(
        (v) =>
          !(
            v.firstName.toLowerCase() === 'claude' &&
            v.lastName.toLowerCase() === 'test'
          ),
      );
      const removed = store.visitors.length - filtered.length;
      const next: VisitorStore = {
        visitors: filtered,
        ipHashes: store.ipHashes,
        updatedAt: new Date().toISOString(),
      };
      await writeStore(blob, next);
      return send(res, 200, { ok: true, removed });
    } catch (err) {
      console.error('[api/visitors] removeTestRow failed', err);
      const message =
        err instanceof Error && err.message ? err.message : 'Unknown blob error';
      return send(res, 500, { ok: false, error: `Remove failed: ${message}` });
    }
  }

  // Non-destructive: removes only the requester's own IP hash from the dedup
  // list so the same browser can sign once. Does NOT touch any visitor names.
  if (req.method === 'GET' && req.query.clearMyDedup === '1') {
    const blob = await loadBlob();
    if (!blob) return send(res, 503, { ok: false, error: 'Blob unavailable' });
    try {
      const store = await readStore(blob);
      const ipKey = ipHash(clientIp(req));
      if (!store.ipHashes.includes(ipKey)) {
        return send(res, 200, { ok: true, cleared: false, reason: 'not in dedup list' });
      }
      const next: VisitorStore = {
        visitors: store.visitors,
        ipHashes: store.ipHashes.filter((h) => h !== ipKey),
        updatedAt: new Date().toISOString(),
      };
      await writeStore(blob, next);
      return send(res, 200, { ok: true, cleared: true });
    } catch (err) {
      console.error('[api/visitors] clearMyDedup failed', err);
      const message =
        err instanceof Error && err.message ? err.message : 'Unknown blob error';
      return send(res, 500, { ok: false, error: `Clear failed: ${message}` });
    }
  }

  if (req.method === 'GET') {
    const blob = await loadBlob();
    if (!blob) return send(res, 200, { visitors: [], persisted: false });
    try {
      const store = await readStore(blob);
      return send(res, 200, {
        visitors: store.visitors.slice(0, 100),
        persisted: true,
      });
    } catch (err) {
      console.error('[api/visitors] GET failed', err);
      return send(res, 200, { visitors: [], persisted: false });
    }
  }

  if (req.method !== 'POST') {
    return send(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const contentLengthHeader = req.headers['content-length'];
  const contentLength = Number(
    Array.isArray(contentLengthHeader) ? contentLengthHeader[0] : contentLengthHeader ?? '0',
  );
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return send(res, 413, { ok: false, error: 'Payload too large' });
  }

  // @vercel/node auto-parses JSON bodies into req.body when Content-Type is application/json.
  const rawBody: unknown = req.body;
  const body: { firstName?: unknown; lastName?: unknown } =
    rawBody && typeof rawBody === 'object' ? (rawBody as Record<string, unknown>) : {};

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';

  if (!isLikelyValid(firstName) || !isLikelyValid(lastName)) {
    return send(res, 400, {
      ok: false,
      error: 'Please enter a real first and last name.',
    });
  }

  const record: VisitorRecord = {
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
  };

  const blob = await loadBlob();
  if (!blob) {
    console.error('[api/visitors] BLOB_READ_WRITE_TOKEN missing or @vercel/blob unavailable');
    return send(res, 503, {
      ok: false,
      error: 'Visitor storage is not configured. Connect a Vercel Blob store and redeploy.',
    });
  }

  try {
    const store = await readStore(blob);
    const ipKey = ipHash(clientIp(req));

    // Same first+last (case-insensitive) already on the wall: keep the original
    // entry, don't create a duplicate row. Same browser/IP will still dedup via
    // the ipHashes path; this catches the cross-device case (same person signs
    // from a phone and a laptop, both should resolve to one name).
    const incomingKey = `${firstName.toLowerCase()}|${lastName.toLowerCase()}`;
    const nameAlreadyOnWall = store.visitors.some(
      (v) =>
        `${v.firstName.toLowerCase()}|${v.lastName.toLowerCase()}` === incomingKey,
    );

    if (nameAlreadyOnWall) {
      // Still record the IP so the same browser doesn't keep retrying writes.
      if (!store.ipHashes.includes(ipKey)) {
        const next: VisitorStore = {
          visitors: store.visitors,
          ipHashes: [ipKey, ...store.ipHashes].slice(0, MAX_IP_HASHES),
          updatedAt: new Date().toISOString(),
        };
        await writeStore(blob, next);
      }
      return send(res, 200, { ok: true, persisted: true, deduped: 'name' });
    }

    if (store.ipHashes.includes(ipKey)) {
      return send(res, 200, { ok: true, persisted: true, deduped: true });
    }

    const next: VisitorStore = {
      visitors: [record, ...store.visitors].slice(0, MAX_VISITORS),
      ipHashes: [ipKey, ...store.ipHashes].slice(0, MAX_IP_HASHES),
      updatedAt: new Date().toISOString(),
    };

    await writeStore(blob, next);
    return send(res, 200, { ok: true, persisted: true });
  } catch (err) {
    console.error('[api/visitors] POST failed', err);
    const message =
      err instanceof Error && err.message ? err.message : 'Unknown blob error';
    return send(res, 500, { ok: false, error: `Blob write failed: ${message}` });
  }
}
