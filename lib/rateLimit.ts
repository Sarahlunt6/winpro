// Basic in-memory rate limiter for the quote route (§6 spam protection).
//
// NOTE: in-memory state is per-serverless-instance and resets on cold start, so on
// Vercel this is a best-effort speed bump, not a hard guarantee. It pairs with the
// honeypot field. If abuse becomes real, swap this for Upstash Ratelimit (Redis) —
// the call site only depends on the rateLimit() signature below.

type Hit = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5; // per IP per window
const store = new Map<string, Hit>();

export function rateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }

  hit.count += 1;
  if (hit.count > MAX_HITS) {
    return { ok: false, retryAfterSec: Math.ceil((hit.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}
