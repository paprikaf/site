import { ArrowUpRight, Printer } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import { experience, projects, publicLinks } from '@/data/portfolio';

const resumeProjects = projects.slice(0, 5);

function ResumeComponent() {
  return (
    <div className="resume-page">
      <header className="resume-header">
        <div>
          <p className="eyebrow">RÉSUMÉ / 2026</p>
          <h1>Ahmed Felfel</h1>
          <p className="resume-header__title">0→1 Product Engineer</p>
          <p className="resume-header__subline">
            Currently GTM Engineer at Builder.io · Montréal, Canada
          </p>
        </div>
        <button
          className="resume-print"
          type="button"
          onClick={() => window.print()}
        >
          <Printer aria-hidden="true" /> Print / Save PDF
        </button>
      </header>

      <div className="resume-links" aria-label="Professional links">
        <a href={publicLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={publicLinks.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
        <a href="https://academy.builder.io" target="_blank" rel="noreferrer">
          Builder Academy <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <section
        className="resume-section resume-profile"
        aria-labelledby="resume-profile-title"
      >
        <h2 id="resume-profile-title">Profile</h2>
        <p>
          Product engineer and current GTM Engineer at Builder.io. I built
          Builder Academy and the first production version of Builder’s CMS MCP
          server. I now build internal AI tools for GTM. Earlier roles included
          customer engineering, partnerships, and full-stack development.
        </p>
      </section>

      <section
        className="resume-section"
        aria-labelledby="resume-experience-title"
      >
        <h2 id="resume-experience-title">Experience</h2>
        <div className="resume-experience">
          {experience.map((role) => (
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
          {resumeProjects.map((project) => (
            <article key={project.id}>
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
          className="resume-section"
          aria-labelledby="resume-expertise-title"
        >
          <h2 id="resume-expertise-title">Expertise</h2>
          <dl className="resume-facts">
            <div>
              <dt>Product</dt>
              <dd>0→1 discovery, prototyping, workflow design, handoff</dd>
            </div>
            <div>
              <dt>AI systems</dt>
              <dd>MCP, agents, human review, automation, evaluation loops</dd>
            </div>
            <div>
              <dt>Engineering</dt>
              <dd>React, TypeScript, Node, Convex, GCP, Terraform, APIs</dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>Builder CMS, Contentful, HubSpot integrations, Electron</dd>
            </div>
          </dl>
        </section>

        <section
          className="resume-section"
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
        <a href={publicLinks.github}>github.com/paprikaf</a>
      </footer>
    </div>
  );
}

export const Route = createFileRoute('/resume')({
  component: ResumeComponent,
});
