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
    title: 'Academy Case Study: Building a Self-Server Learning Center',
    date: '2024-11-10',
    description:
      'How we built a self-service learning platform with certification, internal ramp-up, and client onboarding.',
    tags: ['case-study', 'product', 'learning'],
    content: `# Academy Case Study: Building a Self-Server Learning Center

Let's make a toggle between Context and Output. Context being the why we built this and the personal touch. The output is more of how we shipped it.`,
    contextContent: `## Context

Academy came from a pain point like any other project I worked on. The driver for me is how I can automate and save time (PS: if you are building a piece of software that won't save time, it's useless—unless you are building a video game or something of the sort).

When I first joined Builder as a customer engineer, I noticed a pattern that onboarding our clients was a tedious task that requires repeating yourself multiple times. We were lean at the time, so I probably would total around 25 to 30 hours of calls every week with clients, repeating the same thing.

After Builder raised, we hired more CEs and I had more bandwidth as I joined the partnership team. They really wanted a certification program for our SIs. There comes the opportunity to build Academy.`,
    outputContent: `## Execution

To make a project like this work, you have to execute FAST. Chances are, without velocity you won't find the support needed within the company to see your product shipped—especially in a lean startup. So you have to give more of your time. The 9-to-5 won't do it.

## The MVP

**IAM System** — To control access. The main use case was for partners, Builder employees (super admins), and clients. Free users will login but can't access courses.

**Content Management Boilerplate** — To make it possible for the team to create courses, course modules, and quiz entries.

## Tech Stack & Approach

To ship fast, I needed to prototype fast and use a tech stack that cut corners for me. I settled on Next.js with Convex as a database. At that time, Fusion was not live yet, so I shipped with the Builder.io Figma plugin to take the prototype design and make it into a full app. At the time, the only thing I needed is the Tailwind file—I just wanted the core of the design system.

The requirements were a self-serve platform with enablement materials: docs, videos, and quizzes to get certified as partners. Content was guardrailed for free users.`,
    draft: false,
    html: '',
  },
];

export default articles;
