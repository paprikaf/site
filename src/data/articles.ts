import type { Article } from '@/types/article';

export const articles: Article[] = [
  {
    slug: 'mcp-ecosystem-guide',
    title: 'The MCP Ecosystem: A Practical Guide',
    date: '2025-01-15',
    description:
      'A comprehensive guide to understanding and leveraging the Model Context Protocol ecosystem for AI workflows.',
    tags: ['mcp', 'ai', 'productivity'],
    content: `# The MCP Ecosystem: A Practical Guide

The Model Context Protocol (MCP) has become increasingly important for building AI systems that integrate seamlessly with existing tools and services.

## What is MCP?

MCP is a protocol that defines how clients can communicate with context providers. It's fundamentally about standardizing how AI models get access to external data and tools.

## Getting Started

To get started with MCP, you'll want to:

1. Understand the basic protocol architecture
2. Explore existing MCP servers
3. Build your own custom server

## Key Concepts

### Servers
MCP servers expose capabilities and resources to clients. They can be local or remote.

### Resources
Resources represent data that servers can provide to clients. This could be files, database records, API responses, etc.

### Tools
Tools are functions that servers expose, allowing clients to perform actions.

## Real-World Applications

MCP shines in scenarios where:
- You need to augment AI models with real-time data
- You want to integrate multiple data sources
- You're building AI-powered applications

Stay tuned for more detailed tutorials and case studies.`,
    draft: false,
    html: '',
  },
  {
    slug: 'cs-to-partnership-journey',
    title: 'From IC to Partnership: My Career Transition',
    date: '2024-12-20',
    description:
      'Reflections on transitioning from being an individual contributor in computer science to building partnership-focused roles.',
    tags: ['career', 'growth', 'lessons-learned'],
    content: `# From IC to Partnership: My Career Transition

This is a placeholder for your article about transitioning from IC to partnership roles. Share your story, challenges faced, and lessons learned.

## Key Themes to Cover

- The shift in mindset required
- Building relationships across functions
- Learning to navigate organizational politics
- Imposter syndrome and overcoming self-doubt
- Skills that transferred well
- Skills you had to learn

Keep this authentic and personal. Your readers will connect with genuine experiences more than polished advice.`,
    draft: false,
    html: '',
  },
  {
    slug: 'academy-case-study',
    title: 'Academy Case Study: Building a Customer Success Platform',
    date: '2024-11-10',
    description:
      'How we built a customer success, on-demand learning and certification platform that transformed onboarding.',
    tags: ['case-study', 'product', 'learning'],
    content: `## The Opportunity

Picture this: You're onboarding customers. Week after week. Same fundamentals. Same questions. Same answers. It's important work—getting customers set up right matters. But here's the thing: when you find yourself repeating the same onboarding flow dozens of times, you start seeing patterns. And patterns mean opportunity.

I was a customer engineer at Builder. We were lean, scrappy, the kind of team where good ideas become projects. When you see a problem worth solving, you can solve it.

My philosophy is simple: if software doesn't save time, it's useless. Unless you're building games. Games get a pass. Social media? That's the exception—a bottomless time pit masquerading as connection. And yes, I'm guilty of oiling that wheel too. Everything else? It better give people hours back.

The spreadsheets told the story. Row after row of manual tracking. Which customers completed which checkpoints. Which session they're on. Who needs follow-up. Which accounts are stuck. Good intentions, but manual processes don't scale. As Builder grew, so did our customer base. The old way wouldn't cut it.

Then the pieces aligned. New team. New role. I moved to partnerships. They needed a certification program for our partners. That's when I saw it—not just a certification program, but a way to transform how we ramp up and onboard customers. A way to scale what worked. A way to give that time back to the team.

## Building in the Dark

Speed kills. Not the kind that gets you pulled over. The kind that kills projects before they see daylight.

You're building blind. No roadmap. No guarantee it'll work. Just momentum and hope.

In a startup, you have a window. It's small. And it's closing. Build too slow, and by the time you ship, the problem changed. The team moved on. The opportunity evaporated. Build fast, or don't build at all.

So I made a bet. In the margins. Early mornings, late nights. The nine-to-five wouldn't cut it. I needed velocity. The kind that comes from knowing what to skip.

I chose **[Next.js](https://nextjs.org/)** with **[Convex](https://convex.dev/)**. Fast to prototype. **Real-time** out of the box. No infrastructure headaches. **[Builder Fusion](https://www.builder.io/c/docs/get-started-fusion)** hadn't launched yet, so I used **[Builder's Figma plugin](https://www.builder.io/c/docs/builder-figma-plugin)** to prototype the design system and import design sketches. Pulled **[Tailwind](https://tailwindcss.com/)** styles from the generated code, and built the rest.

The **MVP** had three parts: **access control**, **content management**, and **progress tracking**. That's it. No bells. No whistles. Just enough to prove the concept.

**Access control** meant three user types—partners, internal team, and clients. Users authenticate with their Builder accounts. Free users could log in but couldn't see courses. Simple gates. They work.

**Content management** let the team create courses without touching code. I hooked up **[Builder.io Publish](https://www.builder.io/publish)**, the content management system. Marketing needed to update materials. Content teams needed to add modules. They couldn't wait for engineering.

**Progress tracking** watched who completed what. **Real-time**. No refresh needed. You finish a module, the system knows. That sounds simple, but it's the foundation everything else built on.

The goal was clear: a self-serve platform. Docs, videos, quizzes. Partner certification. No hand-holding. Learn when you're ready. The system doesn't let you skip steps.

I shipped it. Then I watched.

The MVP worked. Partners started using it. Progress tracked. Content updated. Certifications flowed. But I kept seeing the same patterns everywhere. Onboarding sessions looked like course modules. Checkpoints looked like quizzes. The architecture was solving problems I hadn't planned for—onboarding, session management, progress gates.

---

## What We Built

Academy started simple. A learning center. Courses, modules, quizzes. Nothing fancy.

But here's what happened: once you solve one problem, you see patterns everywhere. The same logic that tracks course completion? It tracks onboarding progress. The same gates that control course access? They control session unlocks. Patterns repeat. Architecture scales.

Today, Academy serves three surfaces. Each solves a different problem. But they're all built on the same foundation.

Want to see Academy in action? This demo from **[Figma Config](https://www.figma.com/blog/config-2025-recap/)** shows Academy being used to showcase **[Fusion](https://www.builder.io/c/docs/get-started-fusion)**. It's a great spot to see the platform demonstrated.

<iframe width="560" height="315" src="https://www.youtube.com/embed/oMkHIRHGhow?si=SaviFFEOiBg60u-j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### The Learning Portal

This is where it started. Partners and customers access courses. Watch videos. Take quizzes. Get certified.

The magic isn't in the features. It's in who can change them. Marketing updates courses. Content teams add modules. No engineering required. Everything lives in Builder CMS. When you decouple content from code, good things happen.

Here's what users see: a course library, progress tracking, certifications. Standard stuff. But here's what they don't see: the flexibility. The system adapts. New course? Add it in the CMS. Update a module? Change it in Builder. The app reflects changes instantly.

The access control works like gates. Different user types get different access. Free users can browse but can't dive deep. Clients and partners unlock full course access. Simple rules. They work.

### The Onboarding Workspace

This is where Academy became something else. Not just a learning center. A customer success platform.

Organizations need structure. Not chaos. Not "figure it out yourself." But a clear path. Session one leads to session two. Checkpoints gate progress. Most of the team completes requirements, the next session unlocks.

I remember the moment I realized this could work. We were building the learning portal. Tracking module completion. Showing progress. Then it hit me: onboarding is just learning with gates. Same patterns. Same architecture. Different problem.

The workspace breaks onboarding into sessions. Each session has checkpoints. Complete the checkpoints, unlock the session. Simple concept. Complex execution.

Here's how it works: organizations get assigned a plan. Different plans for different needs. The plan defines sessions. Sessions have checkpoints. Checkpoints link to modules or docs. Users complete modules. The system watches. When enough people finish, the gate opens. The session becomes bookable.

Sessions unlock in order. You can't skip ahead. That's intentional. Onboarding is a journey, not a sprint. But the system is flexible. If someone needs to move faster, we can override. Human judgment beats rigid rules.

### The CS Dashboard

This is the command center. Where we see everything. Manage accounts. Assign owners. Handle exceptions.

The customer success team needed visibility. They couldn't manage what they couldn't see. So we built a dashboard. Real-time progress. Account status. Owner assignments. Threshold controls.

But here's the thing: automation handles ninety percent of cases. The dashboard handles the other ten. The exceptions. The edge cases. The "this customer needs special treatment" moments.

That's why we built manual overrides. With audit trails. Every override gets logged. Who did it. When. Why. Full transparency. Because when you give humans control, you need visibility.

The HubSpot integration runs in the background, syncing accounts, mapping owners, and linking organizations to prevent duplicates. But it's a hybrid enrichment system. The CS team works in both HubSpot and Academy. They can set call bookings, add recordings after sessions, write notes, and make changes directly in Academy. HubSpot remains the source of truth for accounts and owners, while Academy enriches that foundation with session details, progress tracking, and onboarding context. No manual data entry for the basics. No drift on core account data. But full flexibility where it matters most.

Three surfaces. One foundation. That's the architecture. But how does it actually work? Let me pull back the curtain.

---

## How It Works

The architecture is simple. Four pieces. Each does one job well.

Builder CMS holds the content. Courses, checkpoints, plans. Marketing owns it. Engineering doesn't touch it. That separation matters. When content lives outside code, good things happen.

Convex handles the data with real-time updates. No polling required. No cache invalidation needed. You change something, the UI knows immediately. That's the magic. When real-time is default, you build differently.

Next.js renders the three surfaces: learning portal, onboarding workspace, CS dashboard. Same codebase. Different views. Same architecture. Different problems.

HubSpot is the source of truth for accounts, owners, and customer stages. We sync from HubSpot, never to it. Read-only prevents drift. One-way sync keeps everyone aligned.

![System Architecture Diagram](/diagrams/Academy System Architecture.png)

The tech stack is boring. That's the point. Next.js. Convex. Builder CMS. HubSpot. Tailwind. Nothing fancy. Everything proven. When you're moving fast, you want tools that don't fight you.

### The Data Model

The system tracks progress at different levels. Individual users complete modules. Organizations complete checkpoints. Sessions unlock based on both.

A bridge table connects content to progress. Checkpoints in Builder CMS map to modules in the system. This decoupling is crucial. Change content without touching code. Change code without touching content.

Plans define the journey. Different plans for different needs. Each plan has sessions. Sessions have checkpoints. Checkpoints gate progress.

The architecture is elegant in its simplicity. But it didn't start that way. It evolved. And the evolution tells a story.

---

## The Evolution

Phase one emerged from necessity. A learning center that would let partners self-serve certification materials—no more "send me the slides" requests, no more hunting for that one video buried in a shared drive. Everything centralized. Accessible. Trackable. The foundation was straightforward: access control, content management, and progress tracking. Three components that would prove to be more powerful than they first appeared.

I built it fast, leveraging what was available. **[Builder Fusion](https://www.builder.io/c/docs/get-started-fusion)** hadn't launched yet, so I used **[Builder's Figma plugin](https://www.builder.io/c/docs/builder-figma-plugin)** to import design sketches and prototype the design system. I pulled styles from Figma, prototyped with the plugin, and shipped with **[Tailwind](https://tailwindcss.com/)**. It worked. More importantly, it gave me a canvas to see what patterns were actually emerging.

Here's what happened: once the learning center began functioning, the patterns started revealing themselves everywhere. Onboarding wasn't fundamentally different from learning—it was just learning with gates. Progress tracking followed the same logical structure. Session management mirrored course structure so closely it felt inevitable. The architecture I'd built was already solving problems I hadn't explicitly designed it for.

The pivot wasn't planned. It was obvious. The architecture already solved the problem. I just needed to recognize the connections.

### The Pivot

The moment crystallized during a customer call. We were discussing onboarding, and the customer's frustration was palpable. Too many meetings. Unclear progress. No visibility into where teams stood in their journey. That's when I realized: we had all the pieces already built. Progress tracking. Session gates. User management. We just needed to connect them differently, to see how the same architecture could solve a different problem with minimal changes.

So we added organization-level tracking, checkpoint mapping, session gating, **[HubSpot](https://www.hubspot.com/)** sync, and a CS dashboard. But the core remained unchanged. Same architecture. Same patterns. Different problem. That's the insight: good architecture scales not through complexity, but through simplicity. The same simple patterns solve different problems when you recognize the underlying connections.

What changed? We added layers—bridge tables, progress aggregation, sync jobs. But the foundation stayed constant. **[Next.js](https://nextjs.org/)**. **[Convex](https://convex.dev/)**. **[Builder CMS](https://www.builder.io/publish)**. Access control. Progress tracking. Those pieces worked because they were built right. We just used them differently, applying the same principles to new problems.

What stayed the same? Everything that mattered. The architecture. The patterns. The philosophy. Build simple. Build fast. Build what you need. That's the high-level story. But the devil is in the details. And the details are where the magic happens.

---

## The Details

### Session Gating

Sessions unlock when the team hits the threshold—a simple concept that becomes complex in practice. The system enforces linear progression: session two waits for session one, session three waits for session two. You can't skip ahead, which is intentional. Onboarding is a journey, not a sprint.

The first session always unlocks—that's the kickoff, the entry point where everyone can start. After that, the gates tighten. The threshold varies based on team size: small teams might need everyone to complete checkpoints, while large teams might require most people. The system lets you configure these thresholds, but defaults matter. Most teams use the default because it works.

Manual overrides exist for exceptions—a CEO with a packed schedule, a customer who needs to move faster than the standard pace. We can unlock early, but every override gets logged: who did it, when, and why. Full transparency. The audit trail is crucial because when you give humans control, you need visibility. Every override, every threshold change, every lock is tracked. Trust emerges from transparency.

### The HubSpot Sync

**[HubSpot](https://www.hubspot.com/)** holds the truth: accounts, owners, customer stages. The CS team lives there, managing relationships and tracking progress. Academy needs to stay aligned with that source of truth, so we sync periodically—pulling accounts, mapping owners, linking organizations, preventing duplicates.

The sync is intelligent. It checks for existing accounts before creating new ones, links organizations automatically, and prevents data drift. But it's strictly one-way: we read from HubSpot, we never write to it. That one-way flow prevents conflicts and keeps everyone aligned with a single source of truth.

Owner mapping extracts team assignments from HubSpot, ensuring different roles get different access levels. The sync keeps this current—no manual updates, no stale data. Organization linking happens automatically when the system detects a match, preventing duplicate accounts and keeping everything aligned. Simple logic, powerful results.

### Access Control

User types define access through simple gates that work reliably. The authorization logic is straightforward: check user type, check organization membership, check permissions, then allow or deny. No complex rules, just clear gates.

Free users can browse the catalog but can't dive deep into courses. They see what's available, but course access is restricted. That's intentional—the free tier drives upgrades while giving potential customers a taste of what's available.

Clients get full course access. They see their organization's journey, progress tracking, session visibility—everything they need to navigate their onboarding path. Partners get everything clients get, plus certification: capstone projects, badges, the full program.

Super admins get the dashboard with full control and visibility. They can manage accounts, adjust thresholds, handle exceptions. The system gives them the tools they need to oversee the entire operation while maintaining the audit trails that ensure accountability.

Those are the mechanics. But what did we actually learn? What matters? What doesn't? That's where the real insights live.

---

## What We Learned

### The Impact

Before Academy, onboarding was manual. Spreadsheets tracked progress. Calls repeated the same script. Time disappeared into the void.

After Academy, the math changed. One customer takes the same effort as before. But a hundred customers? The system handles the tracking. The CS team handles exceptions. Not routine.

The transformation is clear: from reactive to proactive. From manual to automated. From opaque to transparent. That's the shift.

But numbers don't tell the whole story. The real impact is invisible. Fewer frustrated customers. Clearer progress. Better visibility. That's what automation buys you.

### The Lessons

**Build what you need.**

I started solving my own problem. Repetitive calls. Manual tracking. No visibility. When you build for yourself, you understand the pain. Deeply. That understanding shapes everything.

**Automate the repetitive.**

Repetitive tasks consume time better spent elsewhere. Find the pattern. Codify it. Let the system handle it. That's automation gold.

**Empower humans for exceptions.**

Automation handles most cases. Ninety percent, maybe more. But edge cases exist. Special situations. Unexpected needs. That's where humans shine. Give them control. Give them visibility. Audit trails provide transparency. Trust emerges from transparency.

**Ship fast.**

MVP in weeks, not months. Use tools that cut corners intelligently. Convex for backend. Builder CMS for content. Fast iteration beats perfect architecture. Every time.

### Technical Insights

**Real-time is trivial when it's built in.**

Convex's reactivity changed everything. Data changes, the UI updates. No polling. No cache invalidation. No manual sync. That's the magic. When real-time is default, you build differently.

**Content should live outside code.**

Builder CMS separates content from code. Marketing updates courses. Content teams add modules. Engineering doesn't touch it. That separation reduces maintenance. It enables velocity.

**Source of truth matters.**

HubSpot runs the CS team. They manage accounts there. Assign owners there. Track stages there. Academy syncs from HubSpot. Never to it. That one-way sync prevents conflicts. Keeps everyone aligned.

**Decoupling enables flexibility.**

Bridge tables connect systems without coupling them. Change content without touching code. Change code without touching content. That flexibility is crucial. It's how systems evolve without breaking.

---

## The End (Or Is It?)

Academy started as a solution to my own problem. Same script. Same questions. Same answers. Week after week. There had to be a better way.

It evolved into something bigger. Not because I planned it. Because the patterns were universal. Track progress. Manage sessions. Empower teams. Those patterns scale.

The technical architecture enabled that evolution. Real-time updates made progress visible. Content separation reduced maintenance. One-way syncs prevented drift. Bridge tables enabled flexibility. But those are just tools. The real lesson is deeper.

Build what you need. Automate the repetitive. Empower humans for exceptions. When you solve your own problem deeply, you build something others need too.

That's the thing about good architecture. It doesn't just solve one problem. It reveals patterns. It enables evolution. It scales through simplicity, not complexity.

Academy isn't done. It's evolving. New features. New patterns. New problems. But the foundation stays. Simple. Fast. Flexible. That's how systems grow.

---

_Built with Next.js, Convex, Builder.io, and HubSpot. Available at [academy.builder.io](https://academy.builder.io)_`,
    draft: false,
    html: '',
  },
];

export default articles;
