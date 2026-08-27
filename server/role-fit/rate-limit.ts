import { createHash } from 'node:crypto';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitWindow = {
  count: number;
  resetAt: number;
};

export type RateLimitDecision =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

function getClientAddress(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function getClientKey(request: Request): string {
  const salt = process.env.FIT_RATE_LIMIT_SALT ?? 'role-fit-v1';
  return createHash('sha256')
    .update(`${salt}:${getClientAddress(request)}`)
    .digest('hex');
}

/**
 * This is intentionally a best-effort abuse guard for v1. Vercel may run many
 * isolated instances, so this map cannot enforce a global or durable limit.
 * Provider budgets or a shared platform counter must remain the real backstop.
 */
export function createFitRateLimiter(): (
  request: Request,
  now?: number
) => RateLimitDecision {
  const windows = new Map<string, RateLimitWindow>();

  function discardExpiredWindows(now: number): void {
    if (windows.size < 1_000) {
      return;
    }

    for (const [key, window] of windows) {
      if (window.resetAt <= now) {
        windows.delete(key);
      }
    }
  }

  return (request: Request, now = Date.now()): RateLimitDecision => {
    discardExpiredWindows(now);

    const key = getClientKey(request);
    const current = windows.get(key);

    if (!current || current.resetAt <= now) {
      windows.set(key, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
      return { allowed: true };
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((current.resetAt - now) / 1_000)
        ),
      };
    }

    current.count += 1;
    return { allowed: true };
  };
}

export const takeFitRateLimit = createFitRateLimiter();
