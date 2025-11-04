import { createFileRoute } from '@tanstack/react-router';

function IndexComponent() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About</h1>
        <p className="text-lg md:text-xl text-border/80 leading-relaxed">
          Montréal-based, building globally.
          <br />
          I build technology that earns its place — tools that help people
          create, build, and move ideas forward.
          <br />
          At{' '}
          <a
            href="https://www.builder.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://www.builder.io', '_blank');
            }}
          >
            builder.io
          </a>
          , I design GTM systems where AI agents serve people — simplifying
          what's complex and scaling what works.
          <br />
          Outside of work, I ski, DJ, travel, and build side projects that make
          life a bit smoother. That same curiosity led me to create{' '}
          <a
            href="https://crate.audio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://crate.audio', '_blank');
            }}
          >
            crate.audio
          </a>{' '}
          — an experiment in blending music, data, and design.
        </p>
      </section>

      {/* What I Do */}
      <section className="mb-20 pb-12 border-b border-border/20">
        <h2 className="text-2xl font-bold mb-6">What I Do</h2>
        <div className="space-y-4 text-base leading-relaxed text-border/80">
          <p>
            I build systems that connect ideas to execution. At Builder.io, I
            focus on GTM automation, partner enablement, and AI integrations.
            Recent work includes our CMS MCP Server, giving the tools necessary
            to manage content and build through prompting
          </p>
          <p>
            I focus on projects that solve real problems and scale well. This
            includes Academy, our customer success, on-demand learning and
            certification platform. I also build internal workflows that
            automate repetitive work. On the side, I maintain Discogs SDK — a
            library for OAuth and API access.
          </p>
        </div>
      </section>

      {/* Currently */}
      <section className="mb-10 pb-12 border-b border-border/20">
        <h2 className="text-2xl font-bold mb-6">Currently</h2>
        <div className="space-y-3 text-base leading-relaxed text-border/80">
          <div>
            <p className="font-semibold text-text mb-1">
              Building &amp; Learning
            </p>
            <p>
              Exploring AI systems and agent architectures. I document what I
              learn through guides and case studies.
            </p>
          </div>
          <div>
            <p className="font-semibold text-text mb-1">Writing</p>
            <p>
              Sharing notes on productivity and career growth. Topics include
              moving from hands-on work to team leadership roles.
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="mt-1 text-sm text-border/70">
        <p className="mb-2">Related links</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            <a
              href="https://www.builder.io/c/docs/mcp-builder-server"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  'https://www.builder.io/c/docs/mcp-builder-server',
                  '_blank'
                );
              }}
            >
              Builder CMS MCP Server
            </a>
          </li>
          <li>
            <a
              href="https://academy.builder.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://academy.builder.io/', '_blank');
              }}
            >
              Builder Academy
            </a>
          </li>
          <li>
            <a
              href="discogs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://discogs.com', '_blank');
              }}
            >
              Discogs
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Crate-AI/discogs-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  'https://github.com/Crate-AI/discogs-sdk',
                  '_blank'
                );
              }}
            >
              Discogs SDK
            </a>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-6">
        <p className="text-border/70 mb-3">
          Interested in my thoughts on tech, product, and AI?
        </p>
        <a
          href="/writing"
          className="inline-block text-base font-semibold text-text underline underline-offset-4 decoration-yellow-500 decoration-2 hover:opacity-70 transition-opacity"
        >
          Read my writing →
        </a>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
});
