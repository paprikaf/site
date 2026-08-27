# Personal agent architecture

Status: proposed MVP

## Goal

Let a visitor ask factual questions about Ahmed's work and receive short answers
with links to public evidence. A second mode can compare Ahmed's experience with
a public company page or job description.

This should feel like an evidence browser, not a generic chatbot pretending to
be Ahmed.

## Decision

Use Vercel to run the website, chat endpoint, and a later MCP endpoint. Use the
Vercel AI SDK for the chat stream and tool calls. Use Exa only when a visitor
asks the site to research public information outside Ahmed's portfolio.

Do not use Exa as the primary knowledge base. Questions about Ahmed should come
from the approved claims in `public/evidence.md` and the project links attached
to those claims.

## MVP architecture

```text
Visitor
  |
  v
React chat UI
  |
  v
/api/chat on Vercel
  |-- profile tools --> approved claims from public/evidence.md
  |-- optional Exa tool --> a visitor-supplied public URL or domain
  `-- model --> a short answer with evidence links

MCP client, later
  |
  v
/api/mcp on Vercel
  `-- reuses the same profile and Exa tools
```

The existing Vite application can stay. It does not need to move to Next.js.
The React UI can use the AI SDK's `useChat` hook and call a Vercel Function at
`/api/chat`.

## Data model

Keep one public source of truth with stable claim IDs. Each claim should include:

- `id`
- `topic`
- `statement`
- `ownership`
- `status`
- `sourceUrls`
- `public`
- `lastVerified`

Generate the website project data, `public/evidence.md`, `public/llms.txt`, and
the agent's retrieval data from that source. Private Slack, Granola, customer,
and repository evidence must never enter the deployed dataset.

The first version does not need a vector database. The approved corpus is small
enough to load as structured JSON or include directly in the model context. Add
embeddings only when the public corpus becomes large enough that deterministic
lookup stops working well.

## Chat tools

Start with three server-side tools:

1. `search_profile(query)` returns matching approved claims and links.
2. `get_project(projectId)` returns ownership, status, and public evidence.
3. `match_public_context(url, question)` uses Exa to read or search public
   context, then compares it with approved profile claims.

The assistant must say it does not know when no approved evidence supports an
answer. Every substantive answer should show its source links.

## Where Exa helps

Exa is useful for the part the portfolio does not already know. For example:

- "How does Ahmed's work overlap with this role?"
- "Which of Ahmed's projects is most relevant to this company?"
- "Read this job description and show the strongest evidence of fit."

The Exa API key stays server-side. Restrict requests to public HTTP URLs, cap
the number and size of fetched pages, preserve citations, and treat retrieved
pages as untrusted content.

Ordinary questions such as "What did Ahmed build at Builder.io?" should never
call Exa.

## MCP phase

Build the website chat first. Add MCP only when there is a real reason for
external agents such as Codex, Claude, or Cursor to query the portfolio.

Expose the same read-only tools over Streamable HTTP at
`https://paprikaf.com/api/mcp`. Vercel documents deploying MCP servers with its
`mcp-handler` package. Keep the MCP server stateless and read-only for the first
version.

## Experience

Place "Ask about my work" after Selected work rather than as a floating support
bubble. Start with suggested questions:

- What has Ahmed built from scratch?
- What has Ahmed shipped with MCP?
- Show evidence that Ahmed works across product and engineering.

Render answers as compact evidence cards with links. When a visitor supplies a
company or role URL, switch to a clearly labeled "Fit brief" view.

## Guardrails

- Only deploy claims marked public.
- Never send private evidence to the model or Exa.
- Keep model and Exa keys server-side.
- Rate-limit by IP and cap input, output, tool calls, and fetched pages.
- Validate visitor-supplied URLs and block private or local network addresses.
- Treat fetched pages as data, not instructions.
- Log failures and costs without storing full visitor conversations by default.
- Do not impersonate Ahmed or answer personal questions outside the evidence.

## Build order

1. Normalize the approved public claims into one structured source.
2. Add the read-only profile lookup functions and tests.
3. Build `/api/chat` with the Vercel AI SDK.
4. Add the inline evidence-card UI.
5. Add rate limits and usage monitoring.
6. Add Exa-powered public-context matching.
7. Expose the same tools through `/api/mcp` if external agent usage justifies it.

## References

- [Vercel AI SDK chatbot](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
- [Vercel AI SDK tool usage](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel)
- [Exa Search API](https://exa.ai/docs/reference/search-api-guide)
- [Exa MCP](https://exa.ai/docs/reference/exa-mcp)
