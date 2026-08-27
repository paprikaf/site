import { strFromU8, unzipSync } from 'fflate';

export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_PDF_PAGES = 50;
export const MAX_EXTRACTED_TEXT_CHARS = 50_000;
export const ACCEPTED_FILE_TYPES =
  '.pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown';

const MAX_DOCUMENT_XML_BYTES = 10 * 1024 * 1024;
const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export type RoleFileKind = 'pdf' | 'docx' | 'text' | 'markdown';

export type RoleFileErrorCode =
  | 'too-many-files'
  | 'file-too-large'
  | 'unsupported-file'
  | 'duplicate-file'
  | 'empty-file'
  | 'unreadable-file';

export interface ExtractedRoleFile {
  key: string;
  name: string;
  size: number;
  kind: RoleFileKind;
  text: string;
}

export interface RoleFileText {
  name: string;
  text: string;
}

export class RoleFileError extends Error {
  readonly code: RoleFileErrorCode;
  readonly filename?: string;

  constructor(code: RoleFileErrorCode, message: string, filename?: string) {
    super(message);
    this.name = 'RoleFileError';
    this.code = code;
    this.filename = filename;
  }
}

function fileExtension(filename: string): string {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? '';
}

function normalizeExtractedText(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function decodeXmlEntities(value: string): string {
  return value.replace(
    /&(?:#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi,
    (entity) => {
      const lower = entity.toLowerCase();

      if (lower === '&amp;') return '&';
      if (lower === '&lt;') return '<';
      if (lower === '&gt;') return '>';
      if (lower === '&quot;') return '"';
      if (lower === '&apos;') return "'";

      const codePoint = lower.startsWith('&#x')
        ? Number.parseInt(lower.slice(3, -1), 16)
        : Number.parseInt(lower.slice(2, -1), 10);

      return Number.isSafeInteger(codePoint) &&
        codePoint >= 0 &&
        codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity;
    }
  );
}

function extractTextFromWordXml(xml: string): string {
  const parts: string[] = [];
  const prefix = '(?:[A-Za-z_][\\w.-]*:)?';
  const tokenPattern = new RegExp(
    `<${prefix}t\\b[^>]*>([\\s\\S]*?)<\\/${prefix}t\\s*>|` +
      `<${prefix}tab\\b[^>]*\\/?>|` +
      `<${prefix}(?:br|cr)\\b[^>]*\\/?>|` +
      `<\\/${prefix}p\\s*>`,
    'gi'
  );

  for (const match of xml.matchAll(tokenPattern)) {
    const token = match[0];
    const text = match[1];

    if (text !== undefined) {
      parts.push(decodeXmlEntities(text));
    } else if (/tab\b/i.test(token)) {
      parts.push('\t');
    } else {
      parts.push('\n');
    }
  }

  return normalizeExtractedText(parts.join(''));
}

function ensureReadableText(text: string, filename: string): string {
  const normalized = normalizeExtractedText(text);

  if (!normalized) {
    throw new RoleFileError(
      'empty-file',
      `No readable text was found in ${filename}. Try another file or paste the role description.`,
      filename
    );
  }

  if (normalized.length > MAX_EXTRACTED_TEXT_CHARS) {
    throw new RoleFileError(
      'file-too-large',
      `${filename} contains too much text. Choose a shorter file or paste only the role details.`,
      filename
    );
  }

  return normalized;
}

function throwIfAborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted) {
    throw new DOMException('File reading was cancelled.', 'AbortError');
  }
}

async function extractPdfText(
  file: File,
  signal: AbortSignal | undefined
): Promise<string> {
  const [{ GlobalWorkerOptions, getDocument }, workerModule] =
    await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]);

  GlobalWorkerOptions.workerSrc = workerModule.default;

  throwIfAborted(signal);
  const data = new Uint8Array(await file.arrayBuffer());
  throwIfAborted(signal);

  const loadingTask = getDocument({
    data,
    isEvalSupported: false,
    useSystemFonts: true,
  });

  let document: Awaited<typeof loadingTask.promise> | undefined;
  let destroyPromise: Promise<void> | undefined;
  const destroy = (): Promise<void> => {
    destroyPromise ??= document ? document.destroy() : loadingTask.destroy();
    return destroyPromise;
  };
  const handleAbort = () => {
    void destroy();
  };

  signal?.addEventListener('abort', handleAbort, { once: true });

  try {
    document = await loadingTask.promise;
    throwIfAborted(signal);

    if (document.numPages > MAX_PDF_PAGES) {
      throw new RoleFileError(
        'file-too-large',
        `${file.name} has more than ${MAX_PDF_PAGES} pages. Choose a shorter file.`,
        file.name
      );
    }

    const pages: string[] = [];
    let extractedCharacterCount = 0;

    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      throwIfAborted(signal);
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageParts: string[] = [];

      for (const item of content.items) {
        if (!('str' in item)) continue;

        pageParts.push(item.str);
        pageParts.push(item.hasEOL ? '\n' : ' ');
      }

      const pageText = normalizeExtractedText(pageParts.join(''));
      if (pageText) {
        extractedCharacterCount += pageText.length;

        if (extractedCharacterCount > MAX_EXTRACTED_TEXT_CHARS) {
          throw new RoleFileError(
            'file-too-large',
            `${file.name} contains too much text. Choose a shorter file or paste only the role details.`,
            file.name
          );
        }

        pages.push(pageText);
      }
    }

    return pages.join('\n\n');
  } finally {
    signal?.removeEventListener('abort', handleAbort);
    await destroy().catch(() => undefined);
  }
}

async function extractDocxText(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let documentTooLarge = false;
  const archive = unzipSync(bytes, {
    filter: (entry) => {
      if (entry.name !== 'word/document.xml') return false;
      if (entry.originalSize > MAX_DOCUMENT_XML_BYTES) {
        documentTooLarge = true;
        return false;
      }
      return true;
    },
  });

  if (documentTooLarge) {
    throw new RoleFileError(
      'file-too-large',
      `${file.name} expands to a document that is too large to read safely.`,
      file.name
    );
  }

  const documentXml = archive['word/document.xml'];
  if (!documentXml) {
    throw new RoleFileError(
      'unreadable-file',
      `${file.name} does not appear to be a readable Word document.`,
      file.name
    );
  }

  return extractTextFromWordXml(strFromU8(documentXml));
}

export function getRoleFileKey(file: File): string {
  return `${file.name.toLowerCase()}::${file.size}::${file.lastModified}`;
}

export function validateRoleFile(file: File): RoleFileKind {
  if (file.size > MAX_FILE_BYTES) {
    throw new RoleFileError(
      'file-too-large',
      `${file.name} is larger than 5 MB. Choose a smaller file.`,
      file.name
    );
  }

  const extension = fileExtension(file.name);

  if (extension === 'pdf' || file.type === 'application/pdf') return 'pdf';
  if (extension === 'docx' || file.type === DOCX_MIME) return 'docx';
  if (extension === 'md' || file.type === 'text/markdown') return 'markdown';
  if (extension === 'txt' || file.type === 'text/plain') return 'text';

  throw new RoleFileError(
    'unsupported-file',
    `${file.name} is not supported. Choose a PDF, Word, text, or Markdown file.`,
    file.name
  );
}

export function validateRoleFiles(
  files: readonly File[],
  existingKeys: ReadonlySet<string> = new Set()
): void {
  if (files.length + existingKeys.size > MAX_FILES) {
    throw new RoleFileError(
      'too-many-files',
      `Add up to ${MAX_FILES} role files at a time.`
    );
  }

  const incomingKeys = new Set<string>();

  for (const file of files) {
    validateRoleFile(file);
    const key = getRoleFileKey(file);

    if (existingKeys.has(key) || incomingKeys.has(key)) {
      throw new RoleFileError(
        'duplicate-file',
        `${file.name} has already been added.`,
        file.name
      );
    }

    incomingKeys.add(key);
  }
}

export async function extractRoleFile(
  file: File,
  signal?: AbortSignal
): Promise<string> {
  const kind = validateRoleFile(file);

  try {
    throwIfAborted(signal);
    const text =
      kind === 'pdf'
        ? await extractPdfText(file, signal)
        : kind === 'docx'
          ? await extractDocxText(file)
          : await file.text();

    throwIfAborted(signal);
    return ensureReadableText(text, file.name);
  } catch (error) {
    if (error instanceof RoleFileError) throw error;

    throw new RoleFileError(
      'unreadable-file',
      `We could not read ${file.name}. Try another file or paste the role description.`,
      file.name
    );
  }
}

export async function extractRoleFiles(
  files: readonly File[],
  existingKeys: ReadonlySet<string> = new Set()
): Promise<ExtractedRoleFile[]> {
  validateRoleFiles(files, existingKeys);

  return Promise.all(
    files.map(async (file) => ({
      key: getRoleFileKey(file),
      name: file.name,
      size: file.size,
      kind: validateRoleFile(file),
      text: await extractRoleFile(file),
    }))
  );
}

export function buildRoleInput(
  pastedText: string,
  extractedFiles: readonly RoleFileText[]
): string {
  const sections: string[] = [];
  const normalizedPastedText = normalizeExtractedText(pastedText);

  if (normalizedPastedText) sections.push(normalizedPastedText);

  extractedFiles.forEach((file, index) => {
    const text = normalizeExtractedText(file.text);
    if (!text) return;

    sections.push(`[Attached role file ${index + 1}]\n${text}`);
  });

  return sections.join('\n\n---\n\n');
}
