# Ship Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish content, add projects page, add AI chat widget (Claude-powered), deploy on Vercel -- all today.

**Architecture:** Vite SPA with TanStack Router for the frontend. Vercel serverless `/api/chat` route for the chatbot backend. Context markdown files baked into the system prompt. Claude via Vercel AI SDK streams responses to a floating chat widget.

**Tech Stack:** React 19, Vite 7, TanStack Router, Tailwind 4, Vercel AI SDK (`ai` + `@ai-sdk/anthropic`), Vercel serverless functions.

---

## Task 1: Install Chatbot Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Vercel AI SDK + Anthropic provider**

Run:
```bash
npm install ai @ai-sdk/anthropic
```

**Step 2: Verify installation**

Run: `npm ls ai @ai-sdk/anthropic`
Expected: Both packages listed with versions.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add vercel ai sdk and anthropic provider"
```

---

## Task 2: Add Projects Nav Link

**Files:**
- Modify: `src/components/Nav.tsx`

**Step 1: Add Projects button to the center navigation links**

In `src/components/Nav.tsx`, after the "Writing" button (line ~63-72), add a "Projects" button with the same pattern:

```tsx
<button
  onClick={() => handleNavigation('/projects')}
  className={`text-sm transition-colors ${
    isActive('/projects')
      ? 'text-text underline underline-offset-4 decoration-yellow-500 decoration-2'
      : 'text-border hover:text-text'
  }`}
>
  Projects
</button>
```

**Step 2: Verify in browser**

Run: `npm run dev`
Expected: Nav shows About, Resume, Writing, Projects. Projects link should navigate to `/projects` (404 for now is fine).

**Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add projects link to nav"
```

---

## Task 3: Create Projects Page

**Files:**
- Create: `src/routes/projects.tsx`

**Step 1: Create the projects route**

Create `src/routes/projects.tsx` with a grid of project cards. Use the existing neobrutalism style (2px borders, yellow accent, shadow-shadow).

Projects data (inline in the component -- no separate data file needed for 6 items):

```tsx
const projects = [
  {
    title: 'Builder Academy',
    description: 'Customer success platform serving 500+ users. Reduced CE dependency by 40%. Courses, onboarding workspace, and CS dashboard.',
    tags: ['React', 'Next.js', 'Convex', 'Builder CMS'],
    role: 'Built',
    link: 'https://academy.builder.io',
    linkLabel: 'Visit',
  },
  {
    title: 'Builder CMS MCP Server',
    description: 'AI-driven content automation for Builder.io Publish and Fusion platforms. Create and manage content models through prompts.',
    tags: ['MCP', 'TypeScript', 'AI'],
    role: 'Built',
    link: 'https://www.builder.io/c/docs/mcp-builder-server',
    linkLabel: 'Docs',
  },
  {
    title: 'ai-gtm (Dobby)',
    description: 'GTM automation agent. Cross-functional work with cofounders on sales automation, lead scoring, and pipeline intelligence.',
    tags: ['AI', 'Agents', 'GTM', 'TypeScript'],
    role: 'Built',
    link: 'https://github.com/BuilderIO/ai-gtm',
    linkLabel: 'GitHub',
  },
  {
    title: 'CLAW',
    description: 'Org-level agent framework for automated product development orchestration. Monitors Slack, Jira, GitHub and coordinates work.',
    tags: ['Agents', 'Slack', 'Jira', 'Node.js'],
    role: 'Contributed',
    link: 'https://github.com/BuilderIO/claw-starter',
    linkLabel: 'GitHub',
  },
  {
    title: 'Crate.audio',
    description: 'AI-powered DJ setlist tool leveraging Discogs and vinyl metadata for mood-based playlist curation. Founded as startup, pivoted to open-source.',
    tags: ['React', 'AI', 'Music', 'TypeScript'],
    role: 'Founded',
    link: 'https://crate.audio',
    linkLabel: 'Visit',
  },
  {
    title: 'Discogs SDK',
    description: 'Published TypeScript SDK for Discogs OAuth authentication and API access. Supports collection management, search, and user identity.',
    tags: ['TypeScript', 'NPM', 'OAuth', 'SDK'],
    role: 'Built',
    link: 'https://github.com/Crate-AI/discogs-sdk',
    linkLabel: 'GitHub',
  },
];
```

Layout: `max-w-4xl`, responsive grid `grid-cols-1 md:grid-cols-2 gap-6`. Each card: 2px border, yellow accent on hover, tags as badges, external link icon, role indicator.

Use existing components: `Badge` from `@/components/ui/badge`.

**Step 2: Verify in browser**

Navigate to `/projects`. Should see 6 project cards in a responsive grid.
Expected: Cards render with correct data, links open in new tab, badges show tags.

**Step 3: Commit**

```bash
git add src/routes/projects.tsx
git commit -m "feat: add projects page with 6 project cards"
```

---

## Task 4: Polish Resume Content

**Files:**
- Modify: `src/routes/resume.tsx`

**Step 1: Update current role title and content**

In `src/routes/resume.tsx`:

1. Change "Partnerships Engineer" (line 86) to "GTM Engineer"
2. Update the date range to reflect current: "Dec 2024 – Present"
3. Replace the bullet points under the GTM Engineer role to include:
   - Works directly with both cofounders and head of revops on GTM strategy
   - Built Dobby (ai-gtm), an AI agent for GTM automation and pipeline intelligence
   - Contributed to CLAW, org-level agent framework for product development orchestration
   - Keep existing Academy, MCP Server, and enterprise deal bullets
4. Add "Agent Development" to Technical Skills AI/Automation section

**Step 2: Verify in browser**

Navigate to `/resume`. Check title shows "GTM Engineer", bullets updated, print still works.

**Step 3: Commit**

```bash
git add src/routes/resume.tsx
git commit -m "feat: update resume with current GTM engineer role and agent work"
```

---

## Task 5: Polish About Page Content

**Files:**
- Modify: `src/routes/index.tsx`

**Step 1: Update About page copy**

In `src/routes/index.tsx`:

1. **Hero section**: Update to reflect GTM Engineer role, mention working with cofounders:
   "At builder.io, I work directly with our cofounders on GTM systems where AI agents serve people — simplifying what's complex and scaling what works."

2. **What I Do section**: Update to mention agent building:
   - First paragraph: Mention Dobby (ai-gtm agent), CLAW framework, GTM automation
   - Second paragraph: Keep Academy, add agent architectures

3. **Currently section**: Update "Building & Learning" to mention agent architectures (Dobby, CLAW), GTM automation pipelines

4. **Related links**: Add link to ai-gtm GitHub repo

**Step 2: Verify in browser**

Navigate to `/`. Check updated copy reads well, links work.

**Step 3: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: update about page with current GTM role and agent work"
```

---

## Task 6: Create Chat Widget Component

**Files:**
- Create: `src/components/ChatWidget.tsx`

**Step 1: Create the chat widget component**

Create `src/components/ChatWidget.tsx`:

- Floating button (bottom-right): 56x56px, yellow accent, neobrutalism border (2px solid), chat icon from lucide-react (`MessageCircle`)
- Expanded panel: fixed bottom-right, 400px wide x 520px tall, 2px border, shadow
- Header: "Chat with Ahmed's AI" + close button (X icon)
- Messages area: scrollable, user messages right-aligned (yellow bg), AI messages left-aligned (main bg)
- Input: text input + send button at bottom
- Opening message: "Hey! I'm Ahmed's AI assistant. Ask me anything about my experience, projects, or skills."
- Use `useChat()` from `ai/react` hook pointing to `/api/chat`
- Render AI responses with basic markdown (bold, links, lists) using a simple regex-based renderer -- no heavy markdown library needed
- Mobile: full-width panel, `w-full sm:w-[400px]`
- Close/open state managed with `useState`

**Step 2: Verify component renders**

Import into `__root.tsx` and render after `<Outlet />`. The widget should appear as a floating button.
Expected: Button visible, click expands panel, typing sends message (will fail until API route exists -- that's fine).

**Step 3: Commit**

```bash
git add src/components/ChatWidget.tsx
git commit -m "feat: add chat widget component with useChat hook"
```

---

## Task 7: Add Chat Widget to Root Layout

**Files:**
- Modify: `src/routes/__root.tsx`

**Step 1: Import and render ChatWidget**

In `src/routes/__root.tsx`:

```tsx
import { ChatWidget } from '@/components/ChatWidget';

function RootComponent() {
  return (
    <div className="min-h-screen bg-main text-text transition-colors">
      <Nav />
      <main className="min-h-[calc(100vh-60px)]">
        <Outlet />
      </main>
      <ChatWidget />
    </div>
  );
}
```

**Step 2: Verify in browser**

Expected: Floating chat button visible on every page, bottom-right corner.

**Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: add chat widget to root layout"
```

---

## Task 8: Create Chatbot API Route

**Files:**
- Create: `api/chat.ts`

**Step 1: Create the Vercel serverless function**

Create `api/chat.ts` (Vercel auto-discovers `/api` directory):

```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const SYSTEM_PROMPT = `You are Ahmed Felfel's AI assistant on his personal website. Answer questions about his experience, projects, skills, and philosophy. Be concise, friendly, and accurate. If asked something not covered in the context below, say so honestly.

<context>
${AHMED_CONTEXT}
</context>`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-latest'),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}
```

The `AHMED_CONTEXT` string is built by concatenating the key context files. For a serverless function, we'll bake the context inline (copy-paste the content of the most important context files into the system prompt).

Key context files to include (by priority, ~80KB total):
1. `context/personal_knowledge_base.md` (22KB) - comprehensive profile
2. `context/resume.md` (3.7KB) - resume facts
3. `context/part2_technical_deep_dives.md` (20KB) - technical depth
4. `context/part3_career_philosophy.md` (17KB) - philosophy and positioning
5. `context/part4_personal_context.md` (13KB) - personal touch

Simple rate limiting: track requests per IP using a Map with TTL cleanup. 10 requests per minute per IP.

**Step 2: Test locally**

For local dev, need `ANTHROPIC_API_KEY` env var. Create `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Note: Vercel CLI dev server (`vercel dev`) will serve both the Vite app and the API route. OR we can use Vite's proxy to forward `/api` requests during `npm run dev`.

**Step 3: Commit**

```bash
git add api/chat.ts
git commit -m "feat: add chatbot api route with claude and context"
```

---

## Task 9: Build Context File for Chatbot

**Files:**
- Create: `api/context.ts`

**Step 1: Create a context module**

Rather than inlining 80KB of context, create `api/context.ts` that exports the concatenated context string. Read from the context `.md` files at build time (for serverless, the files are available at deploy time).

Actually -- for Vercel serverless, the simplest approach: use `fs.readFileSync` at the top level of the module (runs once on cold start):

```typescript
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

export const AHMED_CONTEXT = loadContext();
```

**Step 2: Import in chat route**

Update `api/chat.ts` to import `AHMED_CONTEXT` from `./context`.

**Step 3: Commit**

```bash
git add api/context.ts api/chat.ts
git commit -m "feat: load context files for chatbot system prompt"
```

---

## Task 10: Configure Vercel + Local Dev

**Files:**
- Create: `vercel.json`
- Create: `.env.local`
- Modify: `vite.config.ts` (add proxy for local dev)

**Step 1: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Step 2: Add Vite dev proxy for /api**

In `vite.config.ts`, add server proxy so `npm run dev` can forward `/api` requests to a local serverless function runner. Alternatively, use `vercel dev` for local development.

For simplicity, recommend using `vercel dev` which handles both Vite and API routes.

**Step 3: Create .env.local (do NOT commit)**

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Add `.env.local` to `.gitignore` if not already there.

**Step 4: Test locally**

Run: `vercel dev`
Expected: Site loads at localhost, chat widget sends messages to `/api/chat`, Claude responds.

**Step 5: Commit**

```bash
git add vercel.json vite.config.ts .gitignore
git commit -m "chore: configure vercel deployment and local dev"
```

---

## Task 11: Deploy to Vercel

**Step 1: Login to Vercel**

Run: `vercel login`

**Step 2: Deploy**

Run: `vercel`
Follow prompts. Set `ANTHROPIC_API_KEY` environment variable when prompted (or via `vercel env add`).

**Step 3: Set environment variable**

Run: `vercel env add ANTHROPIC_API_KEY`
Enter the API key value.

**Step 4: Redeploy with env var**

Run: `vercel --prod`

**Step 5: Verify production**

Visit the deployed URL. Check:
- [ ] About page loads with updated content
- [ ] Resume page shows "GTM Engineer"
- [ ] Projects page shows 6 cards
- [ ] Writing page works
- [ ] Chat widget opens, sends messages, gets streaming responses
- [ ] Print resume still works
- [ ] Dark/light theme works
- [ ] Mobile responsive

**Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final adjustments for production deploy"
```

---

## Summary

| Task | What | Time Est |
|------|------|----------|
| 1 | Install deps | 2 min |
| 2 | Add Projects nav link | 5 min |
| 3 | Create Projects page | 30 min |
| 4 | Polish Resume | 20 min |
| 5 | Polish About | 15 min |
| 6 | Chat Widget component | 45 min |
| 7 | Add widget to root | 5 min |
| 8 | Chat API route | 30 min |
| 9 | Context loader | 15 min |
| 10 | Vercel config + local dev | 15 min |
| 11 | Deploy | 20 min |
| **Total** | | **~3.5 hours** |
