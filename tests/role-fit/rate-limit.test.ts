import { describe, expect, it } from 'vitest';

import { createFitRateLimiter } from '../../server/role-fit/rate-limit';

function requestFor(address: string): Request {
  return new Request('https://paprikaf.com/api/fit', {
    headers: { 'X-Forwarded-For': address },
  });
}

describe('best-effort fit rate limiter', () => {
  it('allows five requests, limits the sixth, and resets after one hour', () => {
    const takeRateLimit = createFitRateLimiter();
    const request = requestFor('203.0.113.10');
    const startedAt = 10_000;

    for (let index = 0; index < 5; index += 1) {
      expect(takeRateLimit(request, startedAt)).toEqual({ allowed: true });
    }

    expect(takeRateLimit(request, startedAt)).toEqual({
      allowed: false,
      retryAfterSeconds: 3_600,
    });
    expect(takeRateLimit(request, startedAt + 3_599_999)).toEqual({
      allowed: false,
      retryAfterSeconds: 1,
    });
    expect(takeRateLimit(request, startedAt + 3_600_000)).toEqual({
      allowed: true,
    });
  });

  it('keeps separate client windows independent', () => {
    const takeRateLimit = createFitRateLimiter();
    const firstClient = requestFor('203.0.113.11');
    const secondClient = requestFor('203.0.113.12');

    for (let index = 0; index < 5; index += 1) {
      takeRateLimit(firstClient, 20_000);
    }

    expect(takeRateLimit(firstClient, 20_000).allowed).toBe(false);
    expect(takeRateLimit(secondClient, 20_000)).toEqual({ allowed: true });
  });
});
