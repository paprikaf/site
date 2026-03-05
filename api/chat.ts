import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { readFileSync } from 'fs';
import { join } from 'path';

function loadContext(): string {
  const contextDir = join(process.cwd(), 'context');
  const files = [
    'personal_knowledge_base.md',
    'resume.md',
    'part2_technical_deep_dives.md',
    'part3_career_philosophy.md',
    'part4_personal_context.md',
  ];

  return files
    .map((f) => {
      try {
        return readFileSync(join(contextDir, f), 'utf-8');
      } catch {
        return '';
      }
    })
    .filter(Boolean)
    .join('\n\n---\n\n');
}

const AHMED_CONTEXT = loadContext();

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

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (isRateLimited(ip)) {
    return new Response('Rate limited. Please wait a moment.', { status: 429 });
  }

  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}
