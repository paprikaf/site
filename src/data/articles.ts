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
    content: `## Context

Academy started with a simple problem: I spent 25 to 30 hours every week repeating the same onboarding calls. As a customer engineer at Builder, I noticed this pattern early. We were a small team then, so repetition was necessary but exhausting.

My philosophy is simple: build software that saves time. If it doesn't save time, it's not useful—unless you're building games or entertainment.

After Builder raised funding, we hired more customer engineers. I moved to the partnerships team. They needed a certification program for our system integrators. That's when I saw the chance to build Academy.

## Execution

To ship a project like this, you need to move fast. Without speed, you won't get the support needed to ship—especially at a startup. You'll need to put in extra time. Regular hours won't cut it.

### The MVP

**IAM System** — Controls who can access what. Built for three user types: partners, Builder employees (super admins), and clients. Free users can log in but can't access courses.

**Content Management** — Lets the team create courses, modules, and quizzes without code changes.

**Progress Tracking** — Monitors user completion at the module level. Tracks which users finish which modules and displays progress in real time.

### Tech Stack & Approach

I needed to prototype fast. I chose Next.js with Convex as the database. Fusion wasn't live yet, so I used the Builder.io Figma plugin to turn designs into a working app. I only needed the Tailwind file—just the core design system.

The goal was a self-serve platform with enablement materials: docs, videos, and quizzes for partner certification. Free users couldn't access paid content.

---

## What Academy Does

Academy started as a learning center. It grew into a full customer success platform. Today, it serves three different areas. Each one solves a specific problem in the customer journey.

![System Architecture Diagram](/diagrams/Academy System Architecture.png)

### 1. Self-Service Learning Portal

The foundation of Academy is a learning platform. Partners and customers can access courses, modules, and quizzes here. All content lives in Builder.io CMS. This means marketing and content teams can update materials without touching code.

**Key Features:**

- **Course Library**: Courses pulled from Builder CMS with modules, videos, and quizzes
- **Progress Tracking**: Tracks completion at the module level for each user
- **Certifications**: Partner certification program with capstone projects
- **Access Control**: Free users can log in but can't access course content. Only clients, partners, and super admins get full access

**Technical Implementation:**

- Courses stored in Builder CMS as content models
- Module completion tracked in Convex \`courseProgress\` table
- User type determines access level (\`free\`, \`client\`, \`partner\`, \`super_admin\`)

### 2. Customer Onboarding Workspace

This is where Academy became a customer success platform. Organizations go through structured onboarding journeys with sessions, checkpoints, and progress gates.

**Key Features:**

- **Session-Based Journeys**: Onboarding broken into sessions (Kickoff, Session 1, Session 2, etc.)
- **Checkpoints**: Each session has checkpoints linked to modules or documentation
- **Session Gating**: Sessions unlock when 70% of the team completes required checkpoints (you can change this per org)
- **Meeting Management**: Each session can have custom meeting URLs (plan default, org default, or session-specific)
- **Progress Visibility**: Teams see their progress breakdown by checkpoint and user

**How It Works:**

1. Organization gets assigned an onboarding plan (e.g., "Publish", "Fusion", "Hybrid")
2. Plan defines sessions with checkpoint IDs
3. Checkpoints map to modules via \`checkpointModuleMap\` table
4. As users complete modules, \`recalculateOrgProgress\` computes checkpoint completion
5. When threshold is met, session becomes "ready" and bookable
6. Sessions unlock in order—Session N requires Session N-1 to be complete

![Module to Session Unlock Flow](placeholder:figma-diagram-module-unlock)

### 3. Customer Success Dashboard

The command center for Builder's CS team. This is where we manage accounts, assign owners, monitor progress, and handle exceptions.

**Key Features:**

- **Account Management**: HubSpot integration auto-syncs accounts, owners, and customer stage
- **Owner Assignment**: Assign CE, CSM, AE, or Partner Manager to accounts
- **Threshold Control**: Adjust completion threshold per organization (default 70%)
- **Manual Overrides**: Unlock sessions manually with audit trails (who, when, why)
- **Progress Monitoring**: See progress breakdown across all customers
- **User Progress Breakdown**: Drill down to see which users completed which checkpoints

**HubSpot Integration:**

- Accounts sync automatically from HubSpot (companies)
- Owner relationships sync from HubSpot teams
- Auto-linking organizations by \`root_org_id\` prevents duplicates
- Customer stage and sentiment sync for CS visibility

![HubSpot Sync Flow](placeholder:figma-diagram-hubspot-sync)

---

## How It Works: Technical Deep Dive

### Architecture Overview

![System Architecture Diagram](/diagrams/Academy System Architecture.png)

The system has four main parts:

- **Builder CMS**: Content source (courses, checkpoints, plans)
- **Convex Backend**: Serverless database with real-time updates
- **Next.js Frontend**: React app with three surfaces (learning portal, onboarding workspace, CS dashboard)
- **HubSpot**: Source of truth for accounts and owners

**Tech Stack:**

- **Frontend**: Next.js 15 (React 19) with App Router
- **Backend**: Convex (serverless database with real-time reactivity)
- **CMS**: Builder.io (content source for courses and onboarding plans)
- **CRM**: HubSpot (source of truth for accounts and owners)
- **Styling**: Tailwind CSS

### Data Flow: Module Completion → Session Unlock

Here's how a user completing a module triggers a session unlock:

![Module to Session Unlock Flow](placeholder:figma-diagram-module-unlock)

\`\`\`typescript
// 1. User completes module (client-side)
handleQuizComplete() {
  updateProgress(courseId, moduleId, true);
}

// 2. Progress saved to Convex
export const saveCourseProgress = mutation({
  handler: async (ctx, args) => {
    await ctx.db.insert('courseProgress', {
      userId: args.userId,
      moduleId: args.moduleId,
      completed: true,
    });
  },
});

// 3. Recalculate org-level checkpoint completion
export const recalculateOrgProgress = mutation({
  handler: async (ctx, args) => {
    const threshold = orgProgress?.completionThreshold || 70;
    const progressMap = await resolveMultipleCheckpointProgress(
      ctx,
      orgId,
      checkpointIds
    );
    
    // Check if threshold met for each checkpoint
    const completed = checkpointIds.filter(id => {
      const progress = progressMap[id];
      const percent = (progress.completedUsers / progress.totalUsers) * 100;
      return percent >= threshold;
    });
    
    await ctx.db.patch(orgProgressId, {
      completedCheckpointIds: completed,
    });
  },
});

// 4. Session status computed on-demand
export function computeSessionStatus(input: {
  checkpointIds: string[];
  completedCheckpointIds: string[];
  completionThreshold: number;
  manualOverride?: { isUnlocked: boolean };
  previousSessionComplete: boolean;
}): 'pending' | 'ready' {
  // Precedence: manual lock → manual unlock → sequence → threshold
  if (input.manualOverride?.isUnlocked === false) return 'pending';
  if (input.manualOverride?.isUnlocked === true) return 'ready';
  if (!input.previousSessionComplete) return 'pending';
  
  const percent = (input.completedCheckpointIds.length / input.checkpointIds.length) * 100;
  return percent >= input.completionThreshold ? 'ready' : 'pending';
}
\`\`\`

### Session Unlock Logic

The \`computeSessionStatus\` function uses a precedence system:

![Session Status Precedence](placeholder:figma-diagram-session-precedence)

1. **Manual Lock** (highest): If CS team explicitly locked the session, it stays locked
2. **Manual Unlock**: If CS team unlocked it, it's ready (allows exceptions)
3. **Sequence Dependency**: Session N requires Session N-1 to be complete
4. **Threshold Check**: Finally, check if enough checkpoints are complete

This design ensures sessions unlock naturally, but CS can override when needed—with full audit trails.

### HubSpot Integration

The HubSpot sync runs periodically to keep accounts and owners in sync:

\`\`\`typescript
export const syncAccounts = internalAction({
  handler: async ctx => {
    const companies = await hubspotRequest('/crm/v3/objects/companies');
    
    for (const company of companies) {
      // Map HubSpot properties to our schema
      const assignedOwnerIds = extractOwners(company.properties);
      const onboardingStage = mapCustomerStage(company.properties.customer_stage);
      
      // Upsert account
      const accountId = await ctx.runMutation(internal.accounts.upsert.upsertAccount, {
        hubspotId: company.id,
        name: company.properties.name,
        assignedOwnerIds,
        onboardingStage,
        rootOrgId: company.properties.root_org_id,
        // ... other fields
      });
      
      // Auto-link organization if root_org_id exists
      if (company.properties.root_org_id) {
        await ctx.runAction(internal.hubspot.autoLink.tryAutoLink, {
          accountId,
          rootOrgId: company.properties.root_org_id,
        });
      }
    }
  },
});
\`\`\`

**Key Features:**

- **Deduplication**: Queries by \`rootOrgId\` to prevent duplicate accounts
- **Auto-linking**: Links HubSpot accounts to Builder organizations automatically
- **Owner mapping**: Extracts CE, CSM, AE, PM from HubSpot team assignments

### Data Model Highlights

**Core Tables:**

1. **\`checkpointModuleMap\`**: Bridge table connecting Builder CMS checkpoints to Convex modules
   - Fields: \`checkpointId\`, \`moduleId\`, \`planKey\`, \`sessionId\`
   - Enables flexible content-to-progress mapping

2. **\`orgProgress\`**: Organization-level progress tracking
   - Fields: \`completedCheckpointIds[]\`, \`completionThreshold\`, \`manualUnlocks\`
   - Stores audit trail for manual overrides

3. **\`courseProgress\`**: Individual user module completion
   - Fields: \`userId\`, \`moduleId\`, \`completed\`
   - Simple boolean tracking per user per module

4. **\`accounts\`**: HubSpot company data with owner relationships
   - Fields: \`hubspotId\`, \`assignedOwnerIds[]\`, \`onboardingStage\`, \`rootOrgId\`
   - Source of truth synced from HubSpot

5. **\`onboardingPlans\`**: Plan templates (Publish, Fusion, Hybrid)
   - Defines sessions, checkpoints, and thresholds per plan type

---

## Evolution: From Learning Center to CS Platform

### Phase 1: MVP (Learning Center)

Started simple:

- IAM system for access control (free vs. paid users)
- Content management boilerplate (courses, modules, quizzes)
- Builder.io Figma plugin for rapid prototyping
- Tailwind CSS for design system

Goal: Enable partners to self-serve certification materials.

### Phase 2: Customer Success Platform

The pivot happened naturally. After building the learning center, I realized the same patterns applied to customer onboarding:

- **Session-based journeys**: Replace ad-hoc onboarding with structured sessions
- **Progress tracking**: Track checkpoint completion instead of just module completion
- **HubSpot integration**: Sync accounts and owners automatically
- **CS dashboard**: Give CS team visibility and control

**Key Insight**: The patterns were identical—tracking progress, managing sessions, empowering teams. The learning center architecture could serve both use cases.

### What Changed

1. **Added \`checkpointModuleMap\`**: Bridge table to connect Builder CMS checkpoints to modules
2. **Added \`orgProgress\`**: Organization-level progress tracking with thresholds
3. **Added session gating logic**: \`computeSessionStatus\` function with precedence rules
4. **Added HubSpot sync**: Automatic account and owner syncing
5. **Added CS dashboard**: Admin interface for managing accounts and overrides

**What Stayed the Same:**

- Core architecture (Next.js + Convex + Builder CMS)
- Module completion tracking (\`courseProgress\` table)
- Access control system (user types)

---

## Key Features Deep Dive

### Session Gating

Sessions unlock based on checkpoint completion, but with smart defaults and manual overrides.

**Default Behavior:**

- Session 1 (Kickoff): Always unlocked
- Sessions 2+: Locked until previous session complete AND checkpoint threshold met
- Default threshold: 70% of team must complete checkpoints

**Manual Overrides:**

- CS team can unlock sessions early (e.g., CEO has tight schedule)
- Requires reason (recorded in audit trail)
- Can re-lock if needed
- Full audit trail: who, when, why

**Threshold Configuration:**

- Configurable per organization (default 70%)
- Common values: 50% (small teams), 70% (balanced), 100% (strict)
- Change history tracked in \`thresholdHistory\` array

### HubSpot Integration

**What Syncs:**

- Accounts (companies) with metadata (customer stage, industry, location)
- Owners (CE, CSM, AE, PM) from HubSpot team assignments
- Onboarding stage (mapped from customer_stage property)
- Organization linking (via \`root_org_id\`)

**Deduplication Logic:**

- If account not found by \`hubspotId\`, query by \`rootOrgId\`
- Update existing account instead of creating duplicate
- Prevents multiple records for same organization

**Auto-Linking:**

- When \`root_org_id\` exists, automatically links HubSpot account to Builder organization
- Creates relationship for progress tracking

### Access Control

**User Types:**

- \`free\`: Can log in but cannot access courses
- \`client\`: Full course access, sees their org's onboarding journey
- \`partner\`: Full course access, certification program
- \`super_admin\`: CS dashboard access, can manage all accounts

**Authorization:**

- Middleware checks user type before route access
- Queries validate \`assertViewerCanAccessOrg\` before returning data
- Mutations check permissions (super_admin or org admin)

---

## Impact & Lessons

### Automation Impact

**Before Academy:**

- 25-30 hours/week of repetitive onboarding calls
- Manual tracking in spreadsheets
- No visibility into progress
- Doesn't scale with team growth

**After Academy:**

- 1 customer = same effort
- 100 customers = marginally more effort (system handles tracking)
- Real-time progress visibility
- CS team handles exceptions, not routine tracking

**Transformation:**

- From reactive → proactive CS
- From manual → automated tracking
- From opaque → transparent progress

### Key Lessons

**1. Build What You Need**

Started solving my own problem (repetitive calls). When you build for yourself, you understand the pain points deeply.

**2. Automate the Repetitive**

25 hours/week of saying the same thing? That's automation gold. Identify patterns, codify them, let the system handle it.

**3. Empower Humans for Exceptions**

Automation handles 90% of cases. Manual overrides with audit trails handle the rest. Don't try to automate edge cases—give humans control with visibility.

**4. Ship Fast**

MVP in weeks, not months. Used tech stack that cut corners (Convex for backend, Builder CMS for content). Fast iteration > perfect architecture.

### Technical Learnings

**Convex's Reactivity**

Real-time progress tracking is trivial with Convex. Queries auto-refetch when data changes. No manual cache invalidation needed.

**Builder CMS as Content Source**

Marketing can update courses without touching code. Content and code are properly separated. Reduces maintenance burden.

**HubSpot as Source of Truth**

Accounts and owners sync automatically. Prevents data drift. CS team works in HubSpot, Academy stays in sync.

**Bridge Tables Enable Flexibility**

\`checkpointModuleMap\` decouples content (Builder CMS) from progress (Convex). Can change checkpoint definitions without touching progress logic.

---

## Conclusion

Academy started as a solution to my own pain point—25 hours a week of repetitive calls. It evolved into a full customer success platform because the patterns were universal: track progress, manage sessions, empower teams.

The technical architecture enabled this evolution. Convex's reactivity made real-time tracking trivial. Builder CMS as content source reduced maintenance. HubSpot integration prevented data drift. Bridge tables enabled flexible content-to-progress mapping.

But the real lesson isn't technical—it's about building what you need, automating the repetitive, and empowering humans for exceptions. When you solve your own problem deeply, you build something others need too.

---

_Built with Next.js, Convex, Builder.io, and HubSpot. Available at [academy.builder.io](https://academy.builder.io)_`,
    draft: false,
    html: '',
  },
];

export default articles;
