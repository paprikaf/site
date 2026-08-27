import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../..'
);
const runtimeFiles = [
  'api/fit.ts',
  'server/role-fit/evidence.ts',
  'server/role-fit/generation.ts',
  'server/role-fit/handler.ts',
  'server/role-fit/hydration.ts',
  'server/role-fit/model-contract.ts',
  'server/role-fit/rate-limit.ts',
  'server/role-fit/validation.ts',
];

describe('Vercel Function runtime imports', () => {
  it.each(runtimeFiles)(
    '%s uses Node-resolvable relative specifiers',
    (file) => {
      const source = readFileSync(resolve(repositoryRoot, file), 'utf8');
      const relativeSpecifiers = [
        ...source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g),
      ].map((match) => match[1]);

      for (const specifier of relativeSpecifiers) {
        expect(specifier).toMatch(/\.(?:js|json)$/);
      }
    }
  );

  it('loads the checked-in JSON corpus with a native ESM import attribute', () => {
    const source = readFileSync(
      resolve(repositoryRoot, 'server/role-fit/evidence.ts'),
      'utf8'
    );

    expect(source).toMatch(
      /approved-claims\.json'\s+with\s+\{\s*type:\s*'json'/
    );
  });
});
