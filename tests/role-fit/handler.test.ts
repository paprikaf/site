import { describe, expect, it, vi } from 'vitest';

import type { FitApiError, FitBrief } from '../../src/features/role-fit/types';
import {
  handleFitRequest,
  type FitFailureDiagnostic,
} from '../../server/role-fit/handler';

const privateRoleText = `PRIVATE ROLE MATERIAL. ${'Build reliable React and TypeScript systems for customer-facing product workflows. '.repeat(8)}`;

function requestFor(
  text = privateRoleText,
  origin = 'https://paprikaf.com'
): Request {
  return new Request('https://paprikaf.com/api/fit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
      'X-Forwarded-For': '203.0.113.20',
    },
    body: JSON.stringify({ input: { type: 'text', text } }),
  });
}

function briefFor(requestId: string): FitBrief {
  return {
    role: {
      title: null,
      company: null,
      sourceKind: 'text',
      requirements: [],
    },
    summary: 'Public-record comparison.',
    matches: [],
    unknowns: [],
    interviewQuestions: [],
    meta: {
      requestId,
      evidenceVersion: 'test-evidence',
      generatedAt: '2026-08-27T12:00:00.000Z',
    },
  };
}

function clock(startedAt: number, finishedAt: number) {
  return vi
    .fn<() => number>()
    .mockReturnValueOnce(startedAt)
    .mockReturnValue(finishedAt);
}

describe('role-fit HTTP handler', () => {
  it('returns a successful no-store response without failure logging', async () => {
    const logFailure = vi.fn<(diagnostic: FitFailureDiagnostic) => void>();
    const generate = vi.fn(
      async (_roleText: string, requestId: string): Promise<FitBrief> =>
        briefFor(requestId)
    );
    const request = requestFor();

    const response = await handleFitRequest(request, {
      createRequestId: () => 'request-success',
      now: () => 1_000,
      logFailure,
      takeFitRateLimit: () => ({ allowed: true }),
      generateFitBrief: generate,
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toContain('no-store');
    expect(response.headers.get('X-Request-Id')).toBe('request-success');
    expect((await response.json()) as FitBrief).toMatchObject({
      meta: { requestId: 'request-success' },
    });
    expect(generate).toHaveBeenCalledWith(
      privateRoleText.trim(),
      'request-success',
      request.signal
    );
    expect(logFailure).not.toHaveBeenCalled();
  });

  it('enforces same-origin and logs only the four safe diagnostic fields', async () => {
    const logFailure = vi.fn<(diagnostic: FitFailureDiagnostic) => void>();

    const response = await handleFitRequest(
      requestFor(privateRoleText, 'https://attacker.example'),
      {
        createRequestId: () => 'request-origin',
        now: clock(2_000, 2_025),
        logFailure,
      }
    );

    expect(response.status).toBe(403);
    expect(((await response.json()) as FitApiError).error.code).toBe(
      'forbidden-origin'
    );
    expect(logFailure).toHaveBeenCalledWith({
      requestId: 'request-origin',
      errorClass: 'ForbiddenOriginError',
      status: 403,
      durationMs: 25,
    });
    expect(Object.keys(logFailure.mock.calls[0]![0]).sort()).toEqual([
      'durationMs',
      'errorClass',
      'requestId',
      'status',
    ]);
    expect(JSON.stringify(logFailure.mock.calls)).not.toContain(
      'PRIVATE ROLE MATERIAL'
    );
  });

  it('returns fixed provider errors without logging input or error messages', async () => {
    class ProviderFailure extends Error {}

    const logFailure = vi.fn<(diagnostic: FitFailureDiagnostic) => void>();
    const generate = vi.fn(async (): Promise<FitBrief> => {
      throw new ProviderFailure('api-key-secret provider response');
    });

    const response = await handleFitRequest(requestFor(), {
      createRequestId: () => 'request-provider',
      now: clock(3_000, 3_018),
      logFailure,
      takeFitRateLimit: () => ({ allowed: true }),
      generateFitBrief: generate,
    });
    const body = (await response.json()) as FitApiError;

    expect(response.status).toBe(502);
    expect(body).toEqual({
      error: {
        code: 'generation-failed',
        message: 'The comparison could not be generated. Please try again.',
      },
    });
    expect(logFailure).toHaveBeenCalledWith({
      requestId: 'request-provider',
      errorClass: 'ProviderFailure',
      status: 502,
      durationMs: 18,
    });
    const serializedLog = JSON.stringify(logFailure.mock.calls);
    expect(serializedLog).not.toContain('PRIVATE ROLE MATERIAL');
    expect(serializedLog).not.toContain('api-key-secret');
    expect(serializedLog).not.toContain(body.error.message);
  });

  it('preserves rate-limit status, retry headers, and safe diagnostics', async () => {
    const logFailure = vi.fn<(diagnostic: FitFailureDiagnostic) => void>();

    const response = await handleFitRequest(requestFor(), {
      createRequestId: () => 'request-limited',
      now: clock(4_000, 4_009),
      logFailure,
      takeFitRateLimit: () => ({
        allowed: false,
        retryAfterSeconds: 321,
      }),
    });

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('321');
    expect(response.headers.get('Cache-Control')).toContain('no-store');
    expect(logFailure).toHaveBeenCalledWith({
      requestId: 'request-limited',
      errorClass: 'RateLimitError',
      status: 429,
      durationMs: 9,
    });
  });

  it('maps provider timeouts to 504 without exposing the thrown error', async () => {
    const timeout = new Error('private timeout details');
    timeout.name = 'TimeoutError';
    const logFailure = vi.fn<(diagnostic: FitFailureDiagnostic) => void>();

    const response = await handleFitRequest(requestFor(), {
      createRequestId: () => 'request-timeout',
      now: clock(5_000, 5_040),
      logFailure,
      takeFitRateLimit: () => ({ allowed: true }),
      generateFitBrief: async () => {
        throw timeout;
      },
    });

    expect(response.status).toBe(504);
    expect(logFailure).toHaveBeenCalledWith({
      requestId: 'request-timeout',
      errorClass: 'ProviderTimeoutError',
      status: 504,
      durationMs: 40,
    });
    expect(JSON.stringify(logFailure.mock.calls)).not.toContain(
      'private timeout details'
    );
  });
});
