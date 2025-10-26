export interface ArticleMetadata {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
  slug: string;
}

export interface Article extends ArticleMetadata {
  content: string;
  html?: string;
  readTime?: number;
}

export interface ArticlePreview extends ArticleMetadata {
  readTime: number;
}
