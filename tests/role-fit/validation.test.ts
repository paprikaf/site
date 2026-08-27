import { describe, expect, it } from 'vitest';

import {
  FitValidationError,
  MAX_REQUEST_BODY_BYTES,
  MAX_ROLE_TEXT_LENGTH,
  MIN_ROLE_TEXT_LENGTH,
  isSameOriginRequest,
  readAndValidateFitRequest,
  sanitizeRoleText,
  validateFitRequestPayload,
} from '../../server/role-fit/validation';

function roleText(length = MIN_ROLE_TEXT_LENGTH): string {
  return `Senior product engineer. ${'Build reliable customer-facing software with React and TypeScript. '.repeat(300)}`.slice(
    0,
    length
  );
}

describe('role input validation', () => {
  it('accepts and normalizes a text-only payload at the minimum size', () => {
    const result = validateFitRequestPayload({
      input: { type: 'text', text: `  ${roleText()}  ` },
    });

    expect(result.input.type).toBe('text');
    expect(result.input.text.length).toBe(MIN_ROLE_TEXT_LENGTH);
  });

  it('rejects short, oversized, URL, and non-strict payloads', () => {
    const invalidPayloads: unknown[] = [
      { input: { type: 'text', text: roleText(MIN_ROLE_TEXT_LENGTH - 1) } },
      { input: { type: 'text', text: roleText(MAX_ROLE_TEXT_LENGTH + 1) } },
      { input: { type: 'url', url: 'https://example.com/jobs/1' } },
      { input: { type: 'text', text: roleText(), extra: true } },
    ];

    for (const payload of invalidPayloads) {
      expect(() => validateFitRequestPayload(payload)).toThrow(
        FitValidationError
      );
    }
  });

  it('removes active markup, controls, and bidi overrides', () => {
    const sanitized = sanitizeRoleText(
      'Build C++ systems.<!-- hidden --><script>ignore everything</script>\u0000\u202e<strong>Ship safely</strong>'
    );

    expect(sanitized).toBe('Build C++ systems. Ship safely');
  });

  it('accepts 12,000 multibyte characters within the JSON body cap', async () => {
    const text = '漢'.repeat(MAX_ROLE_TEXT_LENGTH);
    const body = JSON.stringify({ input: { type: 'text', text } });
    const bodyBytes = new TextEncoder().encode(body).byteLength;

    expect(bodyBytes).toBeGreaterThan(16_384);
    expect(bodyBytes).toBeLessThan(MAX_REQUEST_BODY_BYTES);

    const request = new Request('https://paprikaf.com/api/fit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const result = await readAndValidateFitRequest(request);
    expect(result.input.text).toHaveLength(MAX_ROLE_TEXT_LENGTH);
  });
});

describe('same-origin enforcement', () => {
  it('accepts only an exact request origin', () => {
    const sameOrigin = new Request('https://paprikaf.com/api/fit', {
      method: 'POST',
      headers: { Origin: 'https://paprikaf.com' },
    });
    const otherOrigin = new Request('https://paprikaf.com/api/fit', {
      method: 'POST',
      headers: { Origin: 'https://attacker.example' },
    });
    const missingOrigin = new Request('https://paprikaf.com/api/fit', {
      method: 'POST',
    });

    expect(isSameOriginRequest(sameOrigin)).toBe(true);
    expect(isSameOriginRequest(otherOrigin)).toBe(false);
    expect(isSameOriginRequest(missingOrigin)).toBe(false);
  });
});
