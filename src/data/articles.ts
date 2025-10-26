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

This is a placeholder for your case study about building the Academy platform.

## The Problem

Document what you were trying to solve:
- Slow onboarding for internal team members
- Lack of standardized knowledge base
- Manual certification tracking

## The Solution

How did you approach building this?
- Product decisions made
- Technology choices
- Design principles

## Results

What did you achieve?
- Metrics that improved
- Feedback from users
- Unexpected learnings

This format helps readers follow the narrative and understand your decision-making process.`,
    draft: false,
    html: '',
  },
];

export default articles;
