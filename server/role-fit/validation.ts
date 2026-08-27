import { z } from 'zod';

export const MIN_ROLE_TEXT_LENGTH = 250;
export const MAX_ROLE_TEXT_LENGTH = 12_000;
export const MAX_REQUEST_BODY_BYTES = 50_176;

const fitRequestSchema = z.strictObject({
  input: z.strictObject({
    type: z.literal('text'),
    text: z.string(),
  }),
});

export type ValidatedFitRequest = {
  input: {
    type: 'text';
    text: string;
  };
};

export class FitValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FitValidationError';
  }
}

const dangerousBlockPattern =
  /<(script|style|iframe|object|embed|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const htmlCommentPattern = /<!--[\s\S]*?-->/g;
const htmlTagPattern = /<[^>]+>/g;
const controlCharacterPattern =
  // These C0/C1 characters have no legitimate role-description meaning.
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g;
const bidiControlPattern = /[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;

export function sanitizeRoleText(value: string): string {
  return value
    .normalize('NFKC')
    .replace(htmlCommentPattern, ' ')
    .replace(dangerousBlockPattern, ' ')
    .replace(htmlTagPattern, ' ')
    .replace(controlCharacterPattern, '')
    .replace(bidiControlPattern, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\t\f\v ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function validateFitRequestPayload(
  payload: unknown
): ValidatedFitRequest {
  const parsed = fitRequestSchema.safeParse(payload);
  if (!parsed.success) {
    throw new FitValidationError('Submit a pasted role description as text.');
  }

  const text = sanitizeRoleText(parsed.data.input.text);

  if (text.length < MIN_ROLE_TEXT_LENGTH) {
    throw new FitValidationError(
      `The role description must contain at least ${MIN_ROLE_TEXT_LENGTH} characters.`
    );
  }

  if (text.length > MAX_ROLE_TEXT_LENGTH) {
    throw new FitValidationError(
      `The role description must contain no more than ${MAX_ROLE_TEXT_LENGTH} characters.`
    );
  }

  return { input: { type: 'text', text } };
}

export async function readAndValidateFitRequest(
  request: Request
): Promise<ValidatedFitRequest> {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) {
    throw new FitValidationError('Use an application/json request body.');
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_REQUEST_BODY_BYTES
  ) {
    throw new FitValidationError('The request body is too large.');
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BODY_BYTES) {
    throw new FitValidationError('The request body is too large.');
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as unknown;
  } catch {
    throw new FitValidationError('The request body must contain valid JSON.');
  }

  return validateFitRequestPayload(payload);
}

export function isSameOriginRequest(request: Request): boolean {
  const originHeader = request.headers.get('origin');
  if (!originHeader || originHeader === 'null') {
    return false;
  }

  try {
    return new URL(originHeader).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
