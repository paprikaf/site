import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import type { Article, ArticleMetadata, ArticlePreview } from '@/types/article';

// Calculate reading time (avg 200 words per minute)
export function calculateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

// Parse markdown with frontmatter
export async function parseMarkdown(fileContent: string): Promise<{
  metadata: ArticleMetadata;
  content: string;
  html: string;
}> {
  const { data, content } = matter(fileContent);

  const processor = unified().use(remarkParse).use(remarkHtml);

  const html = String(await processor.process(content));

  return {
    metadata: {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      tags: data.tags || [],
      draft: data.draft || false,
      slug: data.slug || '',
    },
    content,
    html,
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get year from date
export function getYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

// Sort articles by date (newest first)
export function sortArticles(articles: Article[]): Article[] {
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Sort previews by date (newest first)
export function sortPreviews(previews: ArticlePreview[]): ArticlePreview[] {
  return previews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Group articles by year
export function groupArticlesByYear(
  articles: Article[]
): Map<string, Article[]> {
  const grouped = new Map<string, Article[]>();

  sortArticles(articles).forEach((article) => {
    const year = getYear(article.date);
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(article);
  });

  return grouped;
}

// Group previews by year
export function groupPreviewsByYear(
  previews: ArticlePreview[]
): Map<string, ArticlePreview[]> {
  const grouped = new Map<string, ArticlePreview[]>();

  sortPreviews(previews).forEach((preview) => {
    const year = getYear(preview.date);
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(preview);
  });

  return grouped;
}
