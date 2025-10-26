import { createFileRoute } from '@tanstack/react-router';

function IndexComponent() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About</h1>
        <p className="text-lg md:text-xl text-border/80 leading-relaxed">
          Product engineer exploring AI agents and MCP. I bridge strategy and
          execution for GTM systems at{' '}
          <a
            href="https://www.builder.io"
            className="underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Builder.io
          </a>
          . Passionate about automation and UX, I care about how tools feel as
          much as how they scale. I write to make sense of the work.
        </p>
      </section>

      {/* What I Do */}
      <section className="mb-20 pb-12 border-b border-border/20">
        <h2 className="text-2xl font-bold mb-6">What I Do</h2>
        <div className="space-y-4 text-base leading-relaxed text-border/80">
          <p>
            I specialize in shipping products at the intersection of product
            strategy and technical excellence. My work spans building GTM
            strategies, designing scalable systems, and mentoring teams to move
            faster.
          </p>
          <p>
            Currently focused on exploring the AI/ML landscape, particularly in
            model serving and the emerging MCP ecosystem. I'm passionate about
            how AI models can augment human productivity.
          </p>
        </div>
      </section>

      {/* Currently */}
      <section className="mb-6 pb-12 border-b border-border/20">
        <h2 className="text-2xl font-bold mb-6">Currently</h2>
        <div className="space-y-3 text-base leading-relaxed text-border/80">
          <div>
            <p className="font-semibold text-text mb-1">Building & Learning</p>
            <p>
              Exploring MCP servers and AI agent architectures. Documenting my
              journey through practical guides and case studies.
            </p>
          </div>
          <div>
            <p className="font-semibold text-text mb-1">Writing</p>
            <p>
              Starting to share knowledge on MCP ecosystems, productivity
              workflows, and navigating career transitions from IC to
              leadership.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-1">
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
