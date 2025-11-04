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

![System Architecture Diagram](/diagrams/Academy System Architecture.png)

### The Learning Portal

This is where it started. Partners and customers access courses. Watch videos. Take quizzes. Get certified.

The magic isn't in the features. It's in who can change them. Marketing updates courses. Content teams add modules. No engineering required. Everything lives in Builder CMS. When you decouple content from code, good things happen.

Here's what users see: a course library, progress tracking, certifications. Standard stuff. But here's what they don't see: the flexibility. The system adapts. New course? Add it in the CMS. Update a module? Change it in Builder. The app reflects changes instantly.

The access control works like gates. Different user types get different access. Free users can browse but can't dive deep. Paid users get everything. Simple rules. They work.

### The Onboarding Workspace

This is where Academy became something else. Not just a learning center. A customer success platform.

Organizations need structure. Not chaos. Not "figure it out yourself." But a clear path. Session one leads to session two. Checkpoints gate progress. Most of the team completes requirements, the next session unlocks.

I remember the moment I realized this could work. We were building the learning portal. Tracking module completion. Showing progress. Then it hit me: onboarding is just learning with gates. Same patterns. Same architecture. Different problem.

The workspace breaks onboarding into sessions. Each session has checkpoints. Complete the checkpoints, unlock the session. Simple concept. Complex execution.

Here's how it works: organizations get assigned a plan. Different plans for different needs. The plan defines sessions. Sessions have checkpoints. Checkpoints link to modules or docs. Users complete modules. The system watches. When enough people finish, the gate opens. The session becomes bookable.

Sessions unlock in order. You can't skip ahead. That's intentional. Onboarding is a journey, not a sprint. But the system is flexible. If someone needs to move faster, we can override. Human judgment beats rigid rules.

![Module to Session Unlock Flow](placeholder:figma-diagram-module-unlock)

### The CS Dashboard

This is the command center. Where we see everything. Manage accounts. Assign owners. Handle exceptions.

The customer success team needed visibility. They couldn't manage what they couldn't see. So we built a dashboard. Real-time progress. Account status. Owner assignments. Threshold controls.

But here's the thing: automation handles ninety percent of cases. The dashboard handles the other ten. The exceptions. The edge cases. The "this customer needs special treatment" moments.

That's why we built manual overrides. With audit trails. Every override gets logged. Who did it. When. Why. Full transparency. Because when you give humans control, you need visibility.

The HubSpot integration runs in the background. It syncs accounts. Maps owners. Links organizations. Prevents duplicates. Keeps everything in sync. The CS team works in HubSpot. Academy stays current. No manual data entry. No drift.

![HubSpot Sync Flow](placeholder:figma-diagram-hubspot-sync)

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

### The Flow

Here's what happens when someone completes a module.

They finish. Click done. The system records the completion. That's step one.

Then the system looks up. Are they part of an organization? Do they have checkpoints assigned? It checks membership. It counts completions. It calculates progress.

When enough people complete the checkpoints, the gate opens. The session unlocks. It becomes bookable. Simple logic. Complex reality.

![Module to Session Unlock Flow](placeholder:figma-diagram-module-unlock)

### Session Unlock Logic

Sessions unlock in a specific order. Like a combination lock. You need the right sequence.

First, check if someone manually locked it. Manual lock beats everything. That's the highest priority.

Next, check if someone manually unlocked it. Sometimes you need exceptions. A CEO with a tight schedule. A customer who needs to move fast. Manual unlock allows that.

Then check the sequence. Can't unlock session three if session two isn't done. That's intentional. Onboarding is linear for a reason.

Finally, check the threshold. Did enough people complete the checkpoints? If yes, unlock. If no, wait.

![Session Status Precedence](placeholder:figma-diagram-session-precedence)

This precedence system handles edge cases. It respects human judgment. But it defaults to automation. That's the balance.

### The HubSpot Sync

HubSpot runs the show. The CS team lives there. They manage accounts. Assign owners. Track stages. Academy needs to stay in sync.

So we built a sync. It runs periodically. Pulls accounts. Maps owners. Links organizations. Prevents duplicates.

The sync is smart. It looks for existing accounts before creating new ones. It links organizations automatically. It prevents data drift.

![HubSpot Sync Flow](placeholder:figma-diagram-hubspot-sync)

The key insight: HubSpot is the source of truth. We read from it. We never write to it. That prevents conflicts. Keeps everyone aligned.

### The Data Model

The system tracks progress at different levels. Individual users complete modules. Organizations complete checkpoints. Sessions unlock based on both.

A bridge table connects content to progress. Checkpoints in Builder CMS map to modules in the system. This decoupling is crucial. Change content without touching code. Change code without touching content.

Progress tracking stores completion status. Who finished what. When. Simple boolean tracking. But powerful when aggregated.

Account data syncs from HubSpot. Owner assignments. Customer stages. Organization links. Everything stays current. No manual updates. No stale data.

Plans define the journey. Different plans for different needs. Each plan has sessions. Sessions have checkpoints. Checkpoints gate progress. It's turtles all the way down.

The architecture is elegant in its simplicity. But it didn't start that way. It evolved. And the evolution tells a story.

---

## The Evolution

Phase one was simple. A learning center. Access control. Content management. Progress tracking. Three components. That's it.

The goal was clear: let partners self-serve certification materials. No more "send me the slides." No more "where's that video?" Everything in one place. Accessible. Trackable.

I built it fast. Used what I had. Builder Fusion hadn't launched yet, so I used Builder's Figma plugin to import design sketches and prototype the design system. Pulled styles from Figma. Prototyped with the plugin. Shipped with Tailwind. It worked.

But here's what happened: once the learning center worked, I saw the same patterns everywhere. Onboarding was just learning with gates. Progress tracking was the same logic. Session management mirrored course structure.

The pivot wasn't planned. It was obvious. The architecture already solved the problem. I just needed to see it.

### The Pivot

The moment came during a customer call. We were talking about onboarding. The customer was frustrated. Too many meetings. Unclear progress. No visibility.

I realized: we had all the pieces. Progress tracking. Session gates. User management. We just needed to connect them differently.

So we added organization-level tracking. Checkpoint mapping. Session gating. HubSpot sync. A CS dashboard. But the core stayed the same. Same architecture. Same patterns. Different problem.

That's the insight: good architecture scales. Not through complexity. Through simplicity. The same simple patterns solve different problems. You just need to see the connections.

What changed? We added layers. Bridge tables. Progress aggregation. Sync jobs. But the foundation? It stayed. Next.js. Convex. Builder CMS. Access control. Progress tracking. Those pieces worked. We just used them differently.

What stayed the same? Everything that mattered. The architecture. The patterns. The philosophy. Build simple. Build fast. Build what you need.

That's the high-level story. But the devil is in the details. And the details are where the magic happens.

---

## The Details

### Session Gating

Sessions unlock when the team hits the threshold. Simple concept. But reality is messy.

The first session always unlocks. That's the kickoff. No gates. Everyone can start.

After that, it gets strict. Session two waits for session one. Session three waits for session two. Linear progression. You can't skip ahead.

The threshold varies. Small teams might need everyone. Large teams might need most people. The system lets you configure it. But defaults matter. Most teams use the default. It works.

Manual overrides exist for exceptions. A CEO with a packed schedule. A customer who needs to move fast. We can unlock early. But it gets logged. Who did it. When. Why. Full transparency.

The audit trail is crucial. When you give humans control, you need visibility. Every override. Every threshold change. Every lock. It's all tracked. Because trust requires transparency.

### The HubSpot Sync

HubSpot holds the truth. Accounts. Owners. Customer stages. The CS team lives there. Academy needs to stay aligned.

So we sync. Periodically. Pull accounts. Map owners. Link organizations. Prevent duplicates.

The sync is smart. It checks for existing accounts before creating new ones. It links organizations automatically. It prevents data drift. But it's one-way. We read from HubSpot. We never write to it. That prevents conflicts.

Owner mapping extracts team assignments. Different roles get different access. The sync keeps it current. No manual updates. No stale data.

Organization linking happens automatically. When we see a match, we link it. Prevents duplicate accounts. Keeps everything aligned. Simple logic. Powerful results.

### Access Control

User types define access. Simple gates. They work.

Free users can browse but can't dive deep. They see the catalog. They can't access courses. That's intentional. Free tier drives upgrades.

Clients get full course access. They see their organization's journey. Progress tracking. Session visibility. Everything they need.

Partners get everything clients get, plus certification. Capstone projects. Badges. The full program.

Super admins get the dashboard. They can manage accounts. Adjust thresholds. Handle exceptions. Full control. Full visibility.

The authorization is simple. Check user type. Check organization membership. Check permissions. Then allow or deny. No complex rules. Just clear gates.

Those are the mechanics. But what did we actually learn? What matters? What doesn't? That's where the real insights live.

---

## What We Learned

### The Impact

Before Academy, onboarding was manual. Spreadsheets tracked progress. Calls repeated the same script. Thirty hours a week disappeared into the void.

After Academy, the math changed. One customer takes the same effort as before. But a hundred customers? The system handles the tracking. The CS team handles exceptions. Not routine.

The transformation is clear: from reactive to proactive. From manual to automated. From opaque to transparent. That's the shift.

But numbers don't tell the whole story. The real impact is invisible. Fewer frustrated customers. Clearer progress. Better visibility. That's what automation buys you.

### The Lessons

**Build what you need.**

I started solving my own problem. Repetitive calls. Manual tracking. No visibility. When you build for yourself, you understand the pain. Deeply. That understanding shapes everything.

**Automate the repetitive.**

Twenty-five hours a week saying the same thing? That's automation gold. Find the pattern. Codify it. Let the system handle it. Your time is better spent elsewhere.

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

Academy started as a solution to my own problem. Thirty hours a week. Same script. Same questions. Same answers. There had to be a better way.

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
