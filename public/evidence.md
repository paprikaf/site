# Ahmed Felfel — published portfolio record

Last reviewed: 2026-10-26

This file contains the claims used by the public portfolio. It deliberately
excludes private meeting notes, internal metrics, customer information, and
unpublished implementation details.

## Positioning

Ahmed is a product engineer and the current GTM Engineer at Builder.io. He has
built learning products, developer tooling, and internal AI systems.

## Role progression

- Builder.io, 2023—present
- Role progression: Customer Engineer → Partner Enablement Engineer → GTM
  Engineer
- Ahmed built software in each role.
- Appnovation, Full-Stack Developer, 2021—2023
- Jesta I.S., Web Developer, 2019—2021

## Work and ownership

### Builder Academy — Built from the start

Ahmed built Builder Academy and owned its application engineering from the
start, including learner progress and integrations. Enablement and content
teammates contributed later. A broader team maintains the live product now.

Public source: https://academy.builder.io

### Builder CMS MCP Server — Built and launched initial production implementation

Built the first production implementation. It let AI clients inspect Builder
models and create or update CMS content. A broader team owns the product now.

Public source: https://www.builder.io/c/docs/mcp-builder-server

### AI GTM platform — Built from scratch

Ahmed built Builder.io's internal AI GTM platform from scratch. All sales reps
use it daily; SDRs and marketing also use it to research accounts, find leads,
prioritize work, and act on findings.

- An agent generates sales territories from prompts, configurable ICP criteria,
  or existing templates, enriches companies, and finds contacts matching target
  personas. Teams run it quarterly or when new reps join.
- HubSpot and product analytics help teams refine ICP criteria with an agent.
  Signals include platform engagement, credit consumption, and connected
  codebases. A GitHub organization URL is one example of enterprise intent.
- Enrichment integrates Exa, Parallel AI, Clay, Similarweb, and Apollo.
- Rep dashboards surface assigned accounts and prioritized signals. A first
  login from a target account triggers contact enrichment; champions, power
  users, and executives inform priority. Reps can initiate email or sequencing
  from a signal with one click.
- Dobby is an inbound agent within the platform that operates in Slack,
  enriches incoming leads, and triages them for qualification, recycling,
  nurturing, bot filtering, or partnerships. After extensive tuning of its
  triage and wording, it automatically sends emails through HubSpot sequences.
- Ahmed uses Claude Code and Cursor daily to build and iterate on GTM tools.

These are Ahmed's own published account. Adoption is self-reported; no lead
counts, revenue impact, or time savings are claimed. Customer data and private
implementation details remain excluded.

Public source: https://paprikaf.com/resume#resume-work-title

### Agent Native — Contributor

Contributions cover approval flows, meeting capture and history, OAuth URL
detection, and org role controls. Ahmed is a contributor, not the creator or
maintainer.

Related: Nomad is built on Builder’s Agent Native (see Nomad below).

Public contribution records:

- https://github.com/BuilderIO/agent-native/pull/4409
- https://github.com/BuilderIO/agent-native/pull/2887
- https://github.com/BuilderIO/agent-native/pull/2823
- https://github.com/BuilderIO/agent-native/pull/2647
- https://github.com/BuilderIO/agent-native/pull/59

### Nomad — Building

I’m building Nomad for people who live across borders — travel history against
visa and tax-day clocks (including Schengen 90/180 and 183-day thresholds), with
an agent on the same record. Built on Agent Native. Not legal or tax advice.

Public sources:

- https://github.com/paprikaf/nomad
- https://www.agent-native.com/apps/community/nomad/

### Crate — Building

Ahmed started Crate and is building it: a record room for DJs. Sign in with
Discogs, then search your collection, play tracks through YouTube, and build
playlists you can share by link or embed on another site. It is moving toward
an MCP server so the same tools work from any AI client; that server is the
direction, not a shipped feature. Another contributor has also committed to the
repository.

Public sources:

- https://cr8.audio
- https://github.com/Cr8-audio/app

### @cr8.audio/discogs-sdk — Creator and maintainer

Published a TypeScript client for the Discogs API with OAuth, search,
collection, and identity support.

Public sources:

- https://www.npmjs.com/package/@cr8.audio/discogs-sdk
- https://github.com/Cr8-audio/discogs-sdk

### Galite — Now building

Early product for organizing meeting notes, decisions, and follow-ups.

Public site: https://galite.ai/

## Published areas of ownership

- Product and UX: turns ambiguous problems into focused products by defining
  the core workflow, cutting scope, and testing the first useful version
- System architecture: sets system boundaries, data flows, and failure modes
  around real constraints, balancing speed, cost, reliability, and room to
  evolve
- Frontend systems: builds polished, accessible interfaces and design systems
  that keep complex workflows clear as products and teams grow
- Backend and cloud systems: designs APIs, data models, and cloud services with
  secure boundaries and clear ownership, balancing reliability, cost, and scale
- AI system design: designs production AI systems around agent orchestration,
  authoritative context, evaluations, human review, and recovery, using MCP
  when it is the right interface
- Delivery and operations: designs the path to production with CI/CD,
  infrastructure as code, observability, and recovery so teams can ship safely
  and diagnose failures quickly
- Education: Bachelor’s in Computer Science, Collège LaSalle, 2016–2019
- Languages: fluent English, French, and Arabic; conversational Spanish
- Current location: Montréal, Canada

These are Ahmed’s own published account, not independent verification.

Public source: https://paprikaf.com/resume
