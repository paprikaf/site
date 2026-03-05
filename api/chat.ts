import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import type { IncomingMessage, ServerResponse } from 'http';
import { AHMED_CONTEXT } from './_context';

const SYSTEM_PROMPT = `You are Ahmed Felfel's AI assistant on his personal website. You answer questions about his experience, projects, skills, philosophy, and background.

Rules:
- Be concise, friendly, and accurate
- Use the context provided to answer questions
- If asked something not covered in the context, say so honestly
- Keep responses focused and under 200 words unless the question requires detail
- You can use markdown formatting (bold, lists, links)
- Speak in third person about Ahmed ("Ahmed built...", "He works on...")
- Be enthusiastic but not over-the-top

<context>
${AHMED_CONTEXT}
</context>`;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (limit.count >= 10) {
    return true;
  }

  limit.count++;
  return false;
}

function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const ip = (req.headers['x-forwarded-for'] as string) || 'unknown';

  if (isRateLimited(ip)) {
    res.statusCode = 429;
    res.end('Rate limited. Please wait a moment.');
    return;
  }

  try {
    const body = await parseBody(req);
    const messages = body.messages as Array<{ role: string; content: string }>;

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.pipeDataStreamToResponse(res);
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}
