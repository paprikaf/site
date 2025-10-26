import { formatDate } from '@/lib/markdown';
import type { ArticlePreview } from '@/types/article';

interface ArticleCardProps {
  article: ArticlePreview;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={`/writing/${article.slug}`}
      className="group block py-4 border-b border-border/30 last:border-b-0 hover:bg-mainAccent/40 px-2 -mx-2 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold group-hover:underline transition-all">
            {article.title}
          </h3>
          <p className="text-sm text-border/70 mt-1 line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-border/60">
            <time>{formatDate(article.date)}</time>
            <span>•</span>
            <span>{article.readTime} min read</span>
            {article.tags.length > 0 && (
              <>
                <span>•</span>
                <span>{article.tags.join(', ')}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
