import { describe, expect, it } from 'vitest';

import {
  approvedEvidence,
  approvedEvidenceSchema,
} from '../../server/role-fit/evidence';

describe('approved public evidence', () => {
  it('is schema-valid, public, atomic, and uniquely addressable', () => {
    expect(approvedEvidenceSchema.safeParse(approvedEvidence).success).toBe(
      true
    );
    expect(approvedEvidence.claims.length).toBeGreaterThanOrEqual(10);
    expect(new Set(approvedEvidence.claims.map((claim) => claim.id)).size).toBe(
      approvedEvidence.claims.length
    );

    for (const claim of approvedEvidence.claims) {
      expect(claim.public).toBe(true);
      expect(claim.claim).not.toContain('\n');
      expect(claim.capabilities.length).toBeGreaterThan(0);
      expect(new Set(claim.capabilities).size).toBe(claim.capabilities.length);
      expect(new Set(claim.sources.map((source) => source.id)).size).toBe(
        claim.sources.length
      );

      for (const source of claim.sources) {
        if (source.url) {
          expect(new URL(source.url).protocol).toBe('https:');
        }
      }
    }
  });

  it('keeps self-stated ownership separate from public artifacts', () => {
    const academyOwnership = approvedEvidence.claims.find(
      (claim) => claim.id === 'builder-academy-built'
    );

    expect(
      academyOwnership?.sources.map((source) => source.provenance)
    ).toEqual(
      expect.arrayContaining(['ahmed-published-claim', 'public-artifact'])
    );
  });

  it('contains bounded technical evidence beyond job titles', () => {
    const appnovation = approvedEvidence.claims.find(
      (claim) => claim.id === 'appnovation-product-engineering'
    );
    const jesta = approvedEvidence.claims.find(
      (claim) => claim.id === 'jesta-enterprise-retail'
    );
    const roleProgression = approvedEvidence.claims.find(
      (claim) => claim.id === 'builder-role-progression'
    );

    expect(appnovation?.capabilities).toEqual(
      expect.arrayContaining(['react', 'electron', 'typescript'])
    );
    expect(jesta?.capabilities).toEqual(
      expect.arrayContaining(['enterprise-software', 'product-collaboration'])
    );
    expect(roleProgression?.claim).toContain('Partner Enablement Engineer');
  });

  it('rejects duplicate claim IDs', () => {
    const duplicate = structuredClone(approvedEvidence);
    duplicate.claims.push(structuredClone(duplicate.claims[0]!));

    expect(approvedEvidenceSchema.safeParse(duplicate).success).toBe(false);
  });
});
