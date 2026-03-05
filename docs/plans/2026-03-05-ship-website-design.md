# Ship Website Design

**Date**: 2026-03-05
**Goal**: Polish, add projects, add AI chat widget, deploy on Vercel -- all today.

---

## Stack

- **Frontend**: Vite + React 19 + TanStack Router + Tailwind 4 (neobrutalism)
- **Chatbot**: Vercel AI SDK (`ai` + `@ai-sdk/anthropic`) + `useChat()` hook
- **Backend**: Vercel serverless function (`/api/chat`)
- **Deploy**: Vercel CLI
- **LLM**: Claude (Anthropic API)

---

## Workstream 1: Content Polish

### Resume (`src/routes/resume.tsx`)

- Title: "GTM Engineer" (not "Partnerships Engineer")
- Add current scope: daily work with both cofounders, head of revops
- Add agent work: Dobby, ai-gtm, CLAW
- Add cross-functional ownership narrative

### About (`src/routes/index.tsx`)

- Refresh "What I Do" for GTM engineer role
- Update "Currently" with agent building, GTM automation
- Tighten copy to match philosophy: speed, automation, simplicity

### Nav (`src/components/Nav.tsx`)

- Add "Projects" link

---

## Workstream 2: Projects Page

### Route: `/projects` (`src/routes/projects.tsx`)

Grid of project cards in neobrutalism style. Responsive: 1 col mobile, 2 col tablet, 3 col desktop.

### Projects

| Project                | Description                                                 | Tags                       | Link Type  |
| ---------------------- | ----------------------------------------------------------- | -------------------------- | ---------- |
| Builder Academy        | Platform serving 500+ users, 40% reduction in CE dependency | React, TypeScript, HubSpot | Demo/Docs  |
| Builder CMS MCP Server | AI-driven content automation for Publish + Fusion           | MCP, TypeScript, AI        | Docs       |
| ai-gtm (Dobby)         | GTM automation agent, cross-functional with cofounders      | AI, Agents, GTM            | GitHub     |
| CLAW / claw-starter    | Org-level agent framework at Builder                        | Agents, Slack, Jira        | GitHub     |
| Crate.audio            | AI-powered DJ setlist tool, vinyl metadata                  | React, AI, Music           | Website    |
| Discogs SDK            | Published TypeScript SDK for Discogs API                    | TypeScript, NPM, OAuth     | NPM/GitHub |

### Card Design

- Title + 1-2 sentence description
- Tech badges (existing Badge component)
- Role indicator (Built, Contributed, Founded)
- External link icon
- Yellow accent border on hover (neobrutalism)

---

## Workstream 3: Chat Widget

### Architecture

```
Chat Widget (React)          /api/chat (Vercel Serverless)
useChat() hook ──────────▶   System prompt (all .md context)
Floating button              Claude streams response
Expandable panel       ◀──   @ai-sdk/anthropic
```

### System Prompt

Concatenated context files:

- `context/resume.md`
- `context/personal_knowledge_base.md`
- `context/interview_session_1_summary.md`
- `context/part2_technical_deep_dives.md`
- `context/part3_career_philosophy.md`
- `context/part4_personal_context.md`

Persona: "You are Ahmed's AI assistant on his personal website. Answer questions about his experience, projects, and skills. Be concise, friendly, and accurate. If asked something not in your context, say so honestly."

### Chat Widget UX

- Floating button: bottom-right, neobrutalism style (bold 2px border, yellow accent)
- Expand: 400px wide x 500px tall panel
- Opening: "Hey, I'm Ahmed's AI -- ask me anything about my experience, projects, or skills."
- Streaming markdown responses (bold, links, lists)
- Close button to minimize
- Mobile: full-width panel

### API Route (`/api/chat`)

- Receives messages from `useChat()`
- Prepends system prompt with all context
- Calls Claude via `@ai-sdk/anthropic`
- Streams response
- `ANTHROPIC_API_KEY` as Vercel env var

### Rate Limiting

Simple in-memory: 10 messages per IP per minute. No Redis.

### Dependencies

```
ai
@ai-sdk/anthropic
```

---

## Workstream 4: Deploy

- Vercel CLI setup
- Environment variable: `ANTHROPIC_API_KEY`
- `vercel` deploy
- Verify all routes, chatbot, and print resume work in production

---

## Out of Scope

- Vector DB / embeddings (context fits in one window)
- Chat history persistence (stateless per session)
- MDX blog migration (future)
- SEO meta tags (future)
- Analytics (future)
