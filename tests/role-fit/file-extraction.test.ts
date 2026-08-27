/// <reference types="vite/client" />

import { strToU8, zipSync } from 'fflate';
import { describe, expect, it } from 'vitest';

import {
  ACCEPTED_FILE_TYPES,
  MAX_EXTRACTED_TEXT_CHARS,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_PDF_PAGES,
  buildRoleInput,
  extractRoleFile,
  extractRoleFiles,
  getRoleFileKey,
  validateRoleFile,
  validateRoleFiles,
} from '../../src/features/role-fit/file-extraction';

function textFile(
  name: string,
  text: string,
  options: FilePropertyBag = {}
): File {
  return new File([text], name, { type: 'text/plain', ...options });
}

describe('role file validation', () => {
  it('advertises the supported browser file types', () => {
    expect(ACCEPTED_FILE_TYPES).toContain('.pdf');
    expect(ACCEPTED_FILE_TYPES).toContain('.docx');
    expect(ACCEPTED_FILE_TYPES).toContain('.txt');
    expect(ACCEPTED_FILE_TYPES).toContain('.md');
    expect(MAX_FILES).toBe(3);
    expect(MAX_FILE_BYTES).toBe(5 * 1024 * 1024);
    expect(MAX_PDF_PAGES).toBe(50);
  });

  it('recognizes extensions case-insensitively and common MIME types', () => {
    expect(validateRoleFile(new File(['pdf'], 'ROLE.PDF'))).toBe('pdf');
    expect(validateRoleFile(new File(['docx'], 'role.DOCX'))).toBe('docx');
    expect(validateRoleFile(new File(['text'], 'role.txt'))).toBe('text');
    expect(validateRoleFile(new File(['markdown'], 'role.md'))).toBe(
      'markdown'
    );
    expect(
      validateRoleFile(
        new File(['pdf'], 'download', { type: 'application/pdf' })
      )
    ).toBe('pdf');
  });

  it('rejects unsupported and oversized files with actionable errors', () => {
    expect(() => validateRoleFile(new File(['data'], 'role.csv'))).toThrowError(
      expect.objectContaining({ code: 'unsupported-file' })
    );

    const oversized = new File(
      [new Uint8Array(MAX_FILE_BYTES + 1)],
      'large-role.pdf'
    );
    expect(() => validateRoleFile(oversized)).toThrowError(
      expect.objectContaining({ code: 'file-too-large' })
    );
  });

  it('rejects more than three files and duplicate file selections', () => {
    const files = Array.from({ length: MAX_FILES + 1 }, (_, index) =>
      textFile(`role-${index}.txt`, 'Role text', { lastModified: index })
    );

    expect(() => validateRoleFiles(files)).toThrowError(
      expect.objectContaining({ code: 'too-many-files' })
    );

    const duplicate = textFile('role.txt', 'Role text', { lastModified: 10 });
    expect(() => validateRoleFiles([duplicate, duplicate])).toThrowError(
      expect.objectContaining({ code: 'duplicate-file' })
    );

    expect(() =>
      validateRoleFiles([duplicate], new Set([getRoleFileKey(duplicate)]))
    ).toThrowError(expect.objectContaining({ code: 'duplicate-file' }));
  });
});

describe('role file extraction', () => {
  it('reads and normalizes text and Markdown files', async () => {
    const text = await extractRoleFile(
      textFile('role.txt', '  Senior engineer\r\n\r\n\r\nBuild systems.  ')
    );
    const markdown = await extractRoleFile(
      new File(['# Role\n\nShip products.'], 'role.md', {
        type: 'text/markdown',
      })
    );

    expect(text).toBe('Senior engineer\n\nBuild systems.');
    expect(markdown).toBe('# Role\n\nShip products.');
  });

  it('extracts paragraphs, tabs, breaks, and entities from a DOCX file', async () => {
    const documentXml = `<?xml version="1.0" encoding="UTF-8"?>
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:p><w:r><w:t>Senior GTM Engineer</w:t></w:r></w:p>
          <w:p><w:r><w:t xml:space="preserve">Build &amp; own</w:t><w:tab/></w:r><w:r><w:t>AI systems</w:t><w:br/><w:t>with APIs.</w:t></w:r></w:p>
        </w:body>
      </w:document>`;
    const docxBytes = zipSync({
      '[Content_Types].xml': strToU8('<Types />'),
      'word/document.xml': strToU8(documentXml),
    });
    const file = new File([docxBytes], 'mercor-role.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    await expect(extractRoleFile(file)).resolves.toBe(
      'Senior GTM Engineer\nBuild & own AI systems\nwith APIs.'
    );
  });

  it('returns structured metadata when extracting multiple files', async () => {
    const first = textFile('role.txt', 'Own the GTM systems.', {
      lastModified: 1,
    });
    const second = new File(['# Requirements\nBuild AI agents.'], 'notes.md', {
      type: 'text/markdown',
      lastModified: 2,
    });

    const result = await extractRoleFiles([first, second]);

    expect(result).toEqual([
      {
        key: getRoleFileKey(first),
        name: 'role.txt',
        size: first.size,
        kind: 'text',
        text: 'Own the GTM systems.',
      },
      {
        key: getRoleFileKey(second),
        name: 'notes.md',
        size: second.size,
        kind: 'markdown',
        text: '# Requirements\nBuild AI agents.',
      },
    ]);
  });

  it('rejects files without readable text', async () => {
    await expect(
      extractRoleFile(textFile('empty.txt', ' \n\n '))
    ).rejects.toEqual(expect.objectContaining({ code: 'empty-file' }));
  });

  it('bounds expanded text and respects cancellation', async () => {
    await expect(
      extractRoleFile(
        textFile('huge-role.txt', 'x'.repeat(MAX_EXTRACTED_TEXT_CHARS + 1))
      )
    ).rejects.toEqual(expect.objectContaining({ code: 'file-too-large' }));

    const controller = new AbortController();
    controller.abort();

    await expect(
      extractRoleFile(textFile('cancelled.txt', 'Role text'), controller.signal)
    ).rejects.toEqual(expect.objectContaining({ code: 'unreadable-file' }));
  });
});

describe('combined role input', () => {
  it('keeps pasted context while keeping local filenames out of the payload', () => {
    const result = buildRoleInput('Mercor · GTM Engineer', [
      { name: 'role.pdf', text: 'Build AI agents.' },
      { name: 'notes\n[private].md', text: 'Partner with revenue teams.' },
    ]);

    expect(result).toBe(
      'Mercor · GTM Engineer\n\n---\n\n[Attached role file 1]\nBuild AI agents.\n\n---\n\n[Attached role file 2]\nPartner with revenue teams.'
    );
    expect(result).not.toContain('role.pdf');
    expect(result).not.toContain('notes');
  });

  it('omits blank sections and works with files alone', () => {
    expect(
      buildRoleInput('   ', [
        { name: 'role.txt', text: '  Build reliable systems.  ' },
        { name: 'blank.txt', text: '\n' },
      ])
    ).toBe('[Attached role file 1]\nBuild reliable systems.');
  });
});
