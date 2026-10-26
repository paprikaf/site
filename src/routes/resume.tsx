import { ArrowUpRight, Printer } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import { experience, projects, publicLinks } from '@/data/portfolio';

const resumeProjects = [
  {
    id: 'territory-generation',
    title: 'AI territory generation + enrichment',
    ownership: 'Built from scratch',
    summary:
      'Built an agent workflow that generates sales territories from prompts, configurable ICP criteria, or existing templates, then enriches companies and finds contacts matching target personas. Teams refine ICP criteria using HubSpot and product analytics, and run territory generation quarterly or when new reps join. Integrated Exa, Parallel AI, Clay, Similarweb, and Apollo for enrichment.',
  },
  {
    id: 'account-signals',
    title: 'Account signals + outbound workflows',
    ownership: 'Built from scratch',
    summary:
      'Connected HubSpot with product signals including platform engagement, credit consumption, and connected codebases. Built rep dashboards showing assigned accounts and prioritized signals: a first login from a target account triggers contact enrichment, with champions, power users, and executives informing priority. Reps can initiate email or sequencing from a signal with one click.',
  },
  {
    id: 'dobby',
    title: 'Dobby — automated inbound agent',
    ownership: 'Built from scratch',
    summary:
      'Built an inbound agent that operates in Slack within the GTM platform. Dobby enriches incoming leads and triages them for qualification, recycling, nurturing, bot filtering, or partnerships. After extensive tuning of its triage and wording, it automatically sends the appropriate emails through HubSpot sequences.',
  },
  ...projects.filter((project) => ['academy', 'mcp'].includes(project.id)),
];

const resumeExperience = experience.map((role) =>
  role.company === 'Builder.io'
    ? {
        ...role,
        summary:
          'Built an internal AI GTM platform from scratch, used daily by all sales reps and also used by SDRs and marketing to research accounts, find leads, prioritize work, and take action. Earlier work included customer engineering, partner enablement, Builder Academy, and the first production Builder CMS MCP server.',
      }
    : role
);

function ResumeComponent() {
  return (
    <div className="resume-page">
      <header className="resume-header">
        <div>
          <p className="eyebrow">RÉSUMÉ / 2026</p>
          <h1>Ahmed Felfel</h1>
          <p className="resume-header__title">GTM Engineer · AI Platforms</p>
          <p className="resume-header__subline">
            Currently GTM Engineer at Builder.io · Montréal, Canada
          </p>
        </div>
        <div className="resume-print-actions">
          <a className="resume-print" href="/resume.pdf" download>
            <ArrowUpRight aria-hidden="true" /> Download PDF
          </a>
          <button
            className="resume-print"
            type="button"
            onClick={() => window.print()}
          >
            <Printer aria-hidden="true" /> Print / Save PDF
          </button>
          <p>For a clean PDF, turn off browser headers and footers.</p>
        </div>
      </header>

      <nav className="resume-links" aria-label="Professional links">
        <a href={publicLinks.email}>
          ahmed@galite.ai <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={publicLinks.calendar} target="_blank" rel="noreferrer">
          Book a call <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={publicLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={publicLinks.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
        <a href="https://academy.builder.io" target="_blank" rel="noreferrer">
          Builder Academy <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>

      <section
        className="resume-section resume-profile"
        aria-labelledby="resume-profile-title"
      >
        <h2 id="resume-profile-title">Profile</h2>
        <p>
          GTM Engineer at Builder.io. Built an internal AI platform from scratch
          for territory generation, account and contact enrichment, product
          signals, outbound workflows, and automated inbound qualification. All
          sales reps use it daily; SDRs and marketing also work from the
          platform. Background in customer engineering, partner enablement, and
          full-stack product development.
        </p>
      </section>

      <section
        className="resume-section"
        aria-labelledby="resume-experience-title"
      >
        <h2 id="resume-experience-title">Experience</h2>
        <div className="resume-experience">
          {resumeExperience.map((role) => (
            <article key={role.company}>
              <header>
                <div>
                  <h3>{role.company}</h3>
                  <p>{role.title}</p>
                </div>
                <time>{role.period}</time>
              </header>
              {role.roleProgression && (
                <p className="resume-role-progression">
                  Role progression: {role.roleProgression.join(' → ')}
                </p>
              )}
              <p>{role.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="resume-work-title">
        <h2 id="resume-work-title">Selected work</h2>
        <div className="resume-projects">
          {resumeProjects.map((project, index) => (
            <article
              className={
                index === 3 ? 'resume-project--print-break' : undefined
              }
              key={project.id}
            >
              <header>
                <h3>{project.title}</h3>
                <span>{project.ownership}</span>
              </header>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="resume-columns">
        <section
          className="resume-section resume-section--ownership"
          aria-labelledby="resume-expertise-title"
        >
          <h2 id="resume-expertise-title">What I can own</h2>
          <dl className="resume-facts resume-facts--ownership">
            <div>
              <dt>Territories + ICP</dt>
              <dd>
                Build agent workflows for ICP configuration, territory
                generation, company enrichment, and persona-based lead
                discovery.
              </dd>
            </div>
            <div>
              <dt>CRM + product signals</dt>
              <dd>
                Connect HubSpot and product usage data to account research,
                contact enrichment, and prioritized rep dashboards.
              </dd>
            </div>
            <div>
              <dt>Inbound + outbound</dt>
              <dd>
                Build lead triage agents, HubSpot sequencing, and email actions
                that connect account signals to a rep’s next step.
              </dd>
            </div>
            <div>
              <dt>Enrichment stack</dt>
              <dd>Exa, Parallel AI, Clay, Similarweb, and Apollo.</dd>
            </div>
            <div>
              <dt>AI-assisted delivery</dt>
              <dd>
                Use Claude Code and Cursor daily to build and iterate on
                internal tools, with live testing and tuning of agent behavior.
              </dd>
            </div>
            <div>
              <dt>Product engineering</dt>
              <dd>
                Build products from the first useful version through production,
                including interfaces, integrations, APIs, and data flows.
              </dd>
            </div>
          </dl>
        </section>

        <section
          className="resume-section resume-section--print-only"
          aria-labelledby="resume-education-title"
        >
          <h2 id="resume-education-title">Education + languages</h2>
          <div className="resume-education">
            <h3>Bachelor’s in Computer Science</h3>
            <p>Collège LaSalle, Montréal · 2016—2019</p>
          </div>
          <dl className="resume-facts">
            <div>
              <dt>Fluent</dt>
              <dd>English, French, Arabic</dd>
            </div>
            <div>
              <dt>Conversational</dt>
              <dd>Spanish</dd>
            </div>
          </dl>
        </section>
      </div>

      <footer className="resume-footer">
        <a href={publicLinks.email}>ahmed@galite.ai</a>
        <a href={publicLinks.github}>github.com/paprikaf</a>
      </footer>
    </div>
  );
}

export const Route = createFileRoute('/resume')({
  component: ResumeComponent,
});
