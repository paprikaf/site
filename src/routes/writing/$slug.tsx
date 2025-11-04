import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { formatDate, calculateReadTime } from '@/lib/markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import articles from '@/data/articles';

function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.max(0.5, Math.min(prev * delta, 5)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === containerRef.current) onClose();
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.25, 5))}
          className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black/70 transition-colors text-sm"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.25, 0.5))}
          className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black/70 transition-colors text-sm"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={resetZoom}
          className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black/70 transition-colors text-sm"
          aria-label="Reset zoom"
        >
          Reset
        </button>
        <span className="bg-black/50 text-white px-3 py-1 rounded text-sm">
          {Math.round(scale * 100)}%
        </span>
      </div>

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200 cursor-move"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
        onMouseDown={handleMouseDown}
        draggable={false}
      />
    </div>
  );
}

function ArticleComponent() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);
  const [viewMode, setViewMode] = useState<'context' | 'output'>('context');
  const [contextHtml, setContextHtml] = useState<string>('');
  const [outputHtml, setOutputHtml] = useState<string>('');
  const [contentHtml, setContentHtml] = useState<string>('');
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    const processMarkdown = async (content: string) => {
      // Step 1: Extract ALL iframes and store them with unique markers
      const iframes: Array<{ marker: string; html: string }> = [];
      const iframeRegex = /<iframe[\s\S]*?<\/iframe>/g;

      let processedContent = content.replace(iframeRegex, (match) => {
        // Create a unique marker that won't be processed by markdown
        const marker = `__IFRAME_MARKER_${iframes.length}__`;
        iframes.push({ marker, html: match });
        return marker;
      });

      // Step 2: Process markdown
      const processor = unified().use(remarkParse).use(remarkHtml);
      let html = String(await processor.process(processedContent));

      // Step 3: Replace markers with wrapped iframes
      iframes.forEach(({ marker, html: iframeHtml }) => {
        // Create responsive wrapper
        const wrappedIframe = `<div class="my-8 rounded-lg overflow-hidden" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
          ${iframeHtml
            .replace(/width="[^"]*"/, 'width="100%"')
            .replace(/height="[^"]*"/, 'height="100%"')
            .replace(
              /<iframe/,
              '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'
            )}
        </div>`;

        // Replace marker in ALL possible formats - be very aggressive
        const escapedMarker = marker
          .replace(/_/g, '&#95;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        const patterns = [
          marker, // Plain marker
          `<p>${marker}</p>`, // Wrapped in paragraph
          `<p>${marker}</p>\n`, // With newline
          `&lt;p&gt;${marker}&lt;/p&gt;`, // Escaped paragraph
          `&lt;p&gt;${escapedMarker}&lt;/p&gt;`, // Double escaped
          escapedMarker, // Escaped marker
          `<!-- ${marker} -->`, // HTML comment
          `&lt;!-- ${marker} --&gt;`, // Escaped comment
        ];

        // Try each pattern
        for (const pattern of patterns) {
          const regex = new RegExp(
            pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            'gi'
          );
          if (html.includes(pattern) || html.match(regex)) {
            html = html.replace(regex, wrappedIframe);
            break; // Found and replaced, move to next iframe
          }
        }

        // Last resort: search for any occurrence of the marker number
        const markerNum = marker.match(/\d+/)?.[0];
        if (markerNum !== undefined) {
          const lastResortRegex = new RegExp(
            `[^\\w]IFRAME_MARKER_${markerNum}[^\\w]`,
            'g'
          );
          html = html.replace(lastResortRegex, (match) => {
            return match.replace(
              new RegExp(`IFRAME_MARKER_${markerNum}`, 'g'),
              wrappedIframe
            );
          });
        }
      });

      // Ensure images are properly rendered (handle markdown images that might not have been converted)
      // This regex matches markdown image syntax that wasn't converted: ![alt](path)
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        // URL encode the path if it has spaces
        const encodedSrc = src.replace(/ /g, '%20');
        return `<img src="${encodedSrc}" alt="${alt}" class="max-w-full h-auto rounded-lg my-8 cursor-zoom-in hover:opacity-90 transition-opacity" data-lightbox-src="${encodedSrc}" data-lightbox-alt="${alt}" />`;
      });

      // Also add click handlers to existing img tags
      html = html.replace(
        /<img([^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*)>/g,
        (match, attrs, src, alt) => {
          if (!attrs.includes('data-lightbox-src')) {
            const encodedSrc = src.replace(/ /g, '%20');
            return `<img${attrs} class="${attrs.includes('class=') ? attrs.match(/class="([^"]*)"/)?.[1] || '' : ''} cursor-zoom-in hover:opacity-90 transition-opacity" data-lightbox-src="${encodedSrc}" data-lightbox-alt="${alt || ''}" />`;
          }
          return match;
        }
      );

      // Replace placeholder images with styled placeholder divs
      html = html.replace(
        /<img[^>]*src="placeholder:([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g,
        (match, placeholderId, altText) => {
          const placeholderName =
            altText ||
            placeholderId.replace(/figma-diagram-/, '').replace(/-/g, ' ');
          return `<div class="diagram-placeholder" data-placeholder="${placeholderId}">
            <div class="diagram-placeholder-content">
              <p class="diagram-placeholder-label">📊 Diagram Placeholder</p>
              <p class="diagram-placeholder-name">${placeholderName}</p>
              <p class="diagram-placeholder-note">Replace with actual diagram image</p>
            </div>
          </div>`;
        }
      );

      // Add yellow underline styling to all links using inline styles for highest specificity
      html = html.replace(/<a([^>]*)>/g, (match, attrs) => {
        // Remove any existing style attribute to avoid conflicts
        let cleanAttrs = attrs.replace(/style="[^"]*"/g, '');

        // Check if class already exists
        if (cleanAttrs.includes('class=')) {
          // Add our classes and inline style to existing class attribute
          cleanAttrs = cleanAttrs.replace(
            /class="([^"]*)"/,
            (classMatch, existingClasses) => {
              const newClasses =
                `${existingClasses} text-text underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors`.trim();
              return `class="${newClasses}" style="text-decoration: underline; text-decoration-color: #eab308; text-underline-offset: 4px; text-decoration-thickness: 2px;"`;
            }
          );
        } else {
          // Add class attribute and inline style
          cleanAttrs += ` class="text-text underline underline-offset-4 decoration-yellow-500 decoration-2 hover:text-mainAccent transition-colors" style="text-decoration: underline; text-decoration-color: #eab308; text-underline-offset: 4px; text-decoration-thickness: 2px;"`;
        }

        return `<a${cleanAttrs}>`;
      });

      // Final pass: find and replace any escaped iframe HTML (fallback for iframes that weren't caught earlier)
      // Match escaped iframe tags - use a more flexible pattern that matches everything between the tags
      const escapedIframePattern = /&lt;iframe[\s\S]*?&lt;\/iframe&gt;/g;
      html = html.replace(escapedIframePattern, (match) => {
        // Unescape the iframe HTML
        const unescaped = match
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/&amp;/g, '&');
        // Wrap in responsive container
        return `<div class="my-8 rounded-lg overflow-hidden" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
          ${unescaped
            .replace(/width="[^"]*"/, 'width="100%"')
            .replace(/height="[^"]*"/, 'height="100%"')
            .replace(
              /<iframe/,
              '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'
            )}
        </div>`;
      });

      // Also handle plain iframe tags that might have been missed (non-escaped)
      html = html.replace(/<iframe([^>]*)>.*?<\/iframe>/gs, (match) => {
        // Wrap in responsive container if not already wrapped
        if (!match.includes('my-8 rounded-lg')) {
          return `<div class="my-8 rounded-lg overflow-hidden" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
              ${match
                .replace(/width="[^"]*"/, 'width="100%"')
                .replace(/height="[^"]*"/, 'height="100%"')
                .replace(
                  /<iframe/,
                  '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'
                )}
            </div>`;
        }
        return match;
      });

      return html;
    };

    if (article?.contextContent) {
      processMarkdown(article.contextContent).then(setContextHtml);
    }
    if (article?.outputContent) {
      processMarkdown(article.outputContent).then(setOutputHtml);
    }
    if (article?.content && !article.contextContent) {
      processMarkdown(article.content).then(setContentHtml);
    }
  }, [article]);

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

  const hasToggle = article.contextContent && article.outputContent;

  // Handle image clicks for lightbox
  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'IMG' &&
        target.hasAttribute('data-lightbox-src')
      ) {
        e.preventDefault();
        const src = target.getAttribute('data-lightbox-src') || '';
        const alt = target.getAttribute('data-lightbox-alt') || '';
        setLightboxImage({ src, alt });
      }
    };

    const contentDiv = document.querySelector('[data-article-content]');
    if (contentDiv) {
      contentDiv.addEventListener('click', handleImageClick);
      return () => {
        contentDiv.removeEventListener('click', handleImageClick);
      };
    }
  }, [contentHtml, contextHtml, outputHtml]);
  const activeContent =
    viewMode === 'context' ? article.contextContent : article.outputContent;
  const activeHtml = viewMode === 'context' ? contextHtml : outputHtml;
  const readTime = calculateReadTime(activeContent || article.content);

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

        {/* Toggle */}
        {hasToggle && (
          <div className="mb-8 flex gap-2 p-1 bg-mainAccent/20 rounded-lg inline-flex">
            <button
              onClick={() => setViewMode('context')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'context'
                  ? 'bg-mainAccent text-text'
                  : 'text-border/60 hover:text-text'
              }`}
            >
              Context
            </button>
            <button
              onClick={() => setViewMode('output')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'output'
                  ? 'bg-mainAccent text-text'
                  : 'text-border/60 hover:text-text'
              }`}
            >
              Output
            </button>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-12 leading-relaxed">
          <div
            data-article-content
            dangerouslySetInnerHTML={{
              __html: hasToggle
                ? activeHtml || `<p>${activeContent}</p>`
                : contentHtml || article.html || `<p>${article.content}</p>`,
            }}
            className="space-y-6 text-base text-border/80 prose-headings:text-text prose-headings:font-bold prose-code:text-xs prose-code:bg-mainAccent prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-mainAccent prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-lg prose-img:my-8 [&_img]:cursor-zoom-in [&_img]:hover:opacity-90 [&_img]:transition-opacity [&_a]:text-text [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-yellow-500 [&_a]:decoration-2 [&_a:hover]:text-mainAccent [&_a]:transition-colors [&_.diagram-placeholder]:my-8 [&_.diagram-placeholder]:border-2 [&_.diagram-placeholder]:border-dashed [&_.diagram-placeholder]:border-border/30 [&_.diagram-placeholder]:rounded-lg [&_.diagram-placeholder]:p-12 [&_.diagram-placeholder]:text-center [&_.diagram-placeholder-content]:space-y-2 [&_.diagram-placeholder-label]:text-xl [&_.diagram-placeholder-name]:text-base [&_.diagram-placeholder-name]:font-semibold [&_.diagram-placeholder-name]:text-text [&_.diagram-placeholder-note]:text-sm [&_.diagram-placeholder-note]:text-border/60"
          />
        </div>
      </article>

      {/* Image Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}

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
