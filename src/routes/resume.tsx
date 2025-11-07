import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ResumeComponent() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      {/* Header with Download Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Ahmed Felfel</h1>
          <p className="text-xl text-border/80">AI & GTM Engineer</p>
        </div>
        <Button
          onClick={() => window.print()}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print / Save PDF
        </Button>
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 text-sm text-border/80 mb-12 pb-8 border-b border-border/20">
        <a
          href="mailto:ahmed.felfel@gmail.com"
          className="hover:text-yellow-500 transition-colors"
        >
          ahmed.felfel@gmail.com
        </a>
        <span>•</span>
        <span>+1 (514) 506-7010</span>
        <span>•</span>
        <a
          href="https://www.linkedin.com/in/ahmed-felfel-080895/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors"
        >
          LinkedIn
        </a>
        <span>•</span>
        <a
          href="https://github.com/paprikaf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors"
        >
          GitHub
        </a>
        <span>•</span>
        <span>Montreal, QC (Remote)</span>
      </div>

      {/* Profile */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Profile</h2>
        <p className="text-lg leading-relaxed text-border/90">
          Full-stack engineer with 6+ years building AI-powered platforms and
          GTM automation. Built Builder Academy serving 500+ users with 40%
          reduction in support needs. Track record unblocking $100K+ deals and
          managing $300K+ ARR portfolios. Trilingual (English, French, Arabic).
          Specialized in workflow automation, scalable systems, and partner
          enablement.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Experience</h2>

        {/* Builder.io */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="text-xl font-bold">Builder.io</h3>
            <span className="text-sm text-border/60 italic">Remote</span>
          </div>

          {/* Partnerships Engineer */}
          <div className="mb-6 ml-0 sm:ml-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h4 className="text-lg font-semibold">Partnerships Engineer</h4>
              <span className="text-sm text-border/60">Dec 2024 – Present</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-border/90 ml-2">
              <li>
                Built <strong>Builder Academy</strong> platform serving{' '}
                <strong>500+ users</strong>
              </li>
              <li>
                Reduced customer engineer dependency by <strong>40%</strong>
              </li>
              <li>
                Streamlined <strong>partner certification program</strong> for
                system integrators (<strong>4 agencies certified</strong>,
                pipeline growing)
              </li>
              <li>
                Architected{' '}
                <a
                  href="https://www.builder.io/c/docs/mcp-builder-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                >
                  Builder CMS MCP Server
                </a>{' '}
                enabling content automation across Publish and Fusion platforms
              </li>
              <li>
                Unblocked <strong>$100K+ enterprise deals</strong> (Uber,
                Walmart, SumUp) with custom plugins
              </li>
              <li>Supported sales team and managed full-funnel ownership</li>
            </ul>
          </div>

          {/* Customer Engineer */}
          <div className="ml-0 sm:ml-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h4 className="text-lg font-semibold">Customer Engineer</h4>
              <span className="text-sm text-border/60">Apr 2023 – Dec 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-border/90 ml-2">
              <li>
                Managed <strong>60+ strategic accounts</strong> with{' '}
                <strong>$300K+ ARR</strong> (JTI, Schneider Electric)
              </li>
              <li>Advised customers on SEO, performance, and scalability</li>
              <li>
                Core contributor to{' '}
                <a
                  href="https://unified-demo-ecomm.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                >
                  Unified Demo
                </a>{' '}
                for best practices
              </li>
              <li>
                Built plugins (
                <a
                  href="https://www.npmjs.com/package/@builder.io/plugin-emporix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                >
                  Emporix
                </a>
                ,{' '}
                <a
                  href="https://www.npmjs.com/package/@builder.io/plugin-commercelayer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                >
                  CommerceLayer
                </a>
                ) for e-commerce
              </li>
              <li>
                Scaled team from <strong>&lt;30 to 100+ employees</strong>
              </li>
              <li>
                <strong>Hired 3 engineers</strong> during transition
              </li>
              <li>
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-500"
                >
                  Voted MVP Q1 2025
                </Badge>
              </li>
            </ul>
          </div>
        </div>

        {/* Appnovation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="text-xl font-bold">Appnovation</h3>
            <span className="text-sm text-border/60 italic">
              Remote/Hybrid
            </span>
          </div>
          <div className="ml-0 sm:ml-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h4 className="text-lg font-semibold">Full-Stack Developer</h4>
              <span className="text-sm text-border/60">May 2021 – Apr 2023</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-border/90 ml-2">
              <li>
                Built <strong>VMware interactive video communication app</strong>{' '}
                (Electron, React, TypeScript, Contentful) with complex access
                control and high traffic
              </li>
              <li>
                Developed <strong>White Label Design System</strong>: React
                component library with Figma API integration, design tokens, and
                Storybook
              </li>
              <li>
                Provisioned cloud infrastructure using{' '}
                <strong>GCP Terraform</strong> (VMs, GKE clusters, database
                instances)
              </li>
              <li>
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-500"
                >
                  Certified GCP Associate Engineer
                </Badge>
              </li>
            </ul>
          </div>
        </div>

        {/* Jesta I.S. */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="text-xl font-bold">Jesta I.S.</h3>
            <span className="text-sm text-border/60 italic">Montreal, QC</span>
          </div>
          <div className="ml-0 sm:ml-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h4 className="text-lg font-semibold">Web Developer</h4>
              <span className="text-sm text-border/60">Apr 2019 – Apr 2021</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-border/90 ml-2">
              <li>
                Built <strong>POS back office system</strong> for enterprise
                retail clients (Puma, Harry Rosen)
              </li>
              <li>Full SDLC management with AngularJS, Java, Oracle PL/SQL</li>
              <li>
                Collaborated with product/UX teams on business requirements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Projects</h2>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">
              <a
                href="https://crate.audio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors"
              >
                Crate.audio
              </a>
            </h3>
            <span className="text-sm text-border/60">
              — Founder & Engineer
            </span>
          </div>
          <p className="text-border/90 mb-3">
            AI-powered DJ setlist tool leveraging Discogs/vinyl metadata for
            mood-based playlist curation. Founded as startup, pivoted to
            open-source.
          </p>
          <ul className="list-disc list-inside space-y-2 text-border/90 ml-2">
            <li>
              Built{' '}
              <a
                href="https://github.com/Crate-AI/discogs-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
              >
                Discogs SDK
              </a>
              : TypeScript SDK for Discogs OAuth authentication and API access
            </li>
            <li>
              Published on NPM:{' '}
              <code className="text-sm bg-border/10 px-2 py-1 rounded">
                @crate.ai/discogs-sdk
              </code>
            </li>
            <li>
              Supports authentication flow, collection management, search, and
              user identity
            </li>
          </ul>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Frontend</h4>
            <p className="text-border/90 text-sm">
              React, Next.js, TypeScript, Tailwind, Electron
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Backend/Cloud</h4>
            <p className="text-border/90 text-sm">
              Node.js, Serverless, Convex, GCP (Terraform, certified), REST,
              GraphQL, MongoDB, Docker
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">AI/Automation</h4>
            <p className="text-border/90 text-sm">
              MCP (Model Context Protocol), LLM/agent integrations, workflow
              automation
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">CMS/Tooling</h4>
            <p className="text-border/90 text-sm">
              Builder.io (Publish, Fusion), Contentful, custom integrations
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-2">Cross-Functional</h4>
            <p className="text-border/90 text-sm">
              Sales engineering, partner enablement, migrations, GTM automation,
              technical hiring
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Education</h2>
        <div>
          <h3 className="text-lg font-semibold">
            Bachelor in Computer Science
          </h3>
          <p className="text-border/80 text-sm">
            College LaSalle, Montreal, QC — Sept 2016 – Apr 2019
          </p>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Languages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-1">Native Fluency</h4>
            <p className="text-border/90 text-sm">English, French, Arabic</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Conversational</h4>
            <p className="text-border/90 text-sm">Spanish</p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Awards</h2>
        <div>
          <h3 className="text-lg font-semibold">
            MVP (Culture Champ) Q1 2025 — Builder.io
          </h3>
          <p className="text-border/80 text-sm">
            Voted by peers for exceptional demonstration of company values
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="pt-8 border-t border-border/20 text-center">
        <Button
          onClick={() => window.print()}
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print / Save PDF Resume
        </Button>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/resume')({
  component: ResumeComponent,
});
