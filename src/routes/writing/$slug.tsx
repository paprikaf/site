import { createFileRoute } from '@tanstack/react-router';
import { formatDate, calculateReadTime } from '@/lib/markdown';
import articles from '@/data/articles';

function ArticleComponent() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-border/70 mb-6">
          The article you're looking for doesn't exist.
        </p>
        <a
          href="/writing"
          className="inline-block text-base font-semibold text-text underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          ← Back to writing
        </a>
      </div>
    );
  }

  const readTime = calculateReadTime(article.content);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      {/* Article Header */}
      <article>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm text-border/60 pb-8 border-b border-border/20">
          <time>{formatDate(article.date)}</time>
          <span>•</span>
          <span>{readTime} min read</span>
          {article.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2 flex-wrap">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-mainAccent rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-12 leading-relaxed">
          <div
            dangerouslySetInnerHTML={{
              __html: article.html || `<p>${article.content}</p>`,
            }}
            className="space-y-6 text-base text-border/80 prose-headings:text-text prose-headings:font-bold prose-a:text-text prose-a:underline hover:prose-a:opacity-70 prose-code:text-xs prose-code:bg-mainAccent prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-mainAccent prose-pre:p-4 prose-pre:rounded-lg"
          />
        </div>
      </article>

      {/* Navigation */}
      <div className="pt-8 border-t border-border/20">
        <a
          href="/writing"
          className="inline-block text-base font-semibold text-text underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          ← Back to writing
        </a>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/writing/$slug')({
  component: ArticleComponent,
});
