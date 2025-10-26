import { createFileRoute } from '@tanstack/react-router';
import { ArticleCard } from '@/components/ArticleCard';
import {
  groupPreviewsByYear,
  sortPreviews,
  calculateReadTime,
} from '@/lib/markdown';
import type { ArticlePreview } from '@/types/article';
import articles from '@/data/articles';

function WritingComponent() {
  // Transform articles into previews
  const previews: ArticlePreview[] = articles.map((article) => ({
    title: article.title,
    date: article.date,
    description: article.description,
    tags: article.tags,
    slug: article.slug,
    readTime: calculateReadTime(article.content),
  }));

  // Sort and group by year
  const sorted = sortPreviews(previews);
  const grouped = groupPreviewsByYear(sorted);

  // Get years in descending order
  const years = Array.from(grouped.keys()).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      {/* Header */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing</h1>
        <p className="text-lg text-border/80">
          Thoughts on product engineering, AI, and career transitions. Updated
          regularly.
        </p>
      </section>

      {/* Articles */}
      <div>
        {years.length === 0 ? (
          <p className="text-border/60 text-center py-12">
            No articles yet. Check back soon!
          </p>
        ) : (
          years.map((year) => {
            const yearArticles = grouped.get(year) || [];
            return (
              <div key={year} className="mb-12">
                <h2 className="text-lg font-semibold text-border/60 mb-6 pb-3 border-b border-border/10">
                  {year}
                </h2>
                <div className="space-y-0">
                  {yearArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/writing/')({
  component: WritingComponent,
});
