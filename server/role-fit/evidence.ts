import { z } from 'zod';

import approvedClaimsJson from '../../content/approved-claims.json';
import type {
  EvidenceProvenance,
  FitEvidence,
} from '../../src/features/role-fit/types';

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const evidenceSourceSchema = z
  .strictObject({
    id: z
      .string()
      .min(1)
      .max(80)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    label: z.string().min(1).max(120),
    url: z.url().optional(),
    provenance: z.enum([
      'ahmed-published-claim',
      'public-artifact',
      'public-contribution-record',
      'public-authorship-record',
    ] satisfies [EvidenceProvenance, ...EvidenceProvenance[]]),
  })
  .superRefine((source, context) => {
    if (source.url && new URL(source.url).protocol !== 'https:') {
      context.addIssue({
        code: 'custom',
        path: ['url'],
        message: 'Public evidence URLs must use HTTPS.',
      });
    }

    if (
      source.provenance !== 'ahmed-published-claim' &&
      source.url === undefined
    ) {
      context.addIssue({
        code: 'custom',
        path: ['url'],
        message: 'Public-record provenance requires a source URL.',
      });
    }
  });

const approvedClaimSchema = z
  .strictObject({
    id: z
      .string()
      .min(1)
      .max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    projectId: z
      .string()
      .min(1)
      .max(80)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    title: z.string().min(1).max(120),
    organization: z.string().min(1).max(100),
    claim: z.string().min(20).max(320),
    ownership: z.enum([
      'built',
      'creator',
      'creator-maintainer',
      'maintainer',
      'contributor',
      'current-work',
      'role',
    ]),
    capabilities: z
      .array(
        z
          .string()
          .min(1)
          .max(60)
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      )
      .min(1)
      .max(12),
    status: z.enum(['current', 'shipped', 'maintained', 'historical']),
    sources: z.array(evidenceSourceSchema).min(1).max(6),
    caveats: z.array(z.string().min(1).max(240)).max(6),
    public: z.literal(true),
    reviewedAt: isoDateSchema,
  })
  .superRefine((claim, context) => {
    const capabilityIds = new Set<string>();
    claim.capabilities.forEach((capability, index) => {
      if (capabilityIds.has(capability)) {
        context.addIssue({
          code: 'custom',
          path: ['capabilities', index],
          message: `Duplicate capability: ${capability}`,
        });
      }
      capabilityIds.add(capability);
    });

    const sourceIds = new Set<string>();
    claim.sources.forEach((source, index) => {
      if (sourceIds.has(source.id)) {
        context.addIssue({
          code: 'custom',
          path: ['sources', index, 'id'],
          message: `Duplicate source ID within claim: ${source.id}`,
        });
      }
      sourceIds.add(source.id);
    });
  });

export const approvedEvidenceSchema = z
  .strictObject({
    version: z
      .string()
      .min(1)
      .max(40)
      .regex(/^\d{4}-\d{2}-\d{2}\.\d+$/),
    reviewedAt: isoDateSchema,
    claims: z.array(approvedClaimSchema).min(1),
  })
  .superRefine((bundle, context) => {
    const claimIds = new Set<string>();

    bundle.claims.forEach((claim, index) => {
      if (claimIds.has(claim.id)) {
        context.addIssue({
          code: 'custom',
          path: ['claims', index, 'id'],
          message: `Duplicate claim ID: ${claim.id}`,
        });
      }
      claimIds.add(claim.id);

      if (claim.reviewedAt > bundle.reviewedAt) {
        context.addIssue({
          code: 'custom',
          path: ['claims', index, 'reviewedAt'],
          message: 'A claim cannot be reviewed after its containing bundle.',
        });
      }
    });
  });

export type ApprovedEvidence = z.infer<typeof approvedEvidenceSchema>;
export type ApprovedClaim = ApprovedEvidence['claims'][number];

export const approvedEvidence: ApprovedEvidence =
  approvedEvidenceSchema.parse(approvedClaimsJson);

const approvedClaimsById = new Map(
  approvedEvidence.claims.map((claim) => [claim.id, claim] as const)
);

export function findApprovedClaim(claimId: string): ApprovedClaim | undefined {
  return approvedClaimsById.get(claimId);
}

export function toFitEvidence(claim: ApprovedClaim): FitEvidence {
  return {
    id: claim.id,
    title: claim.title,
    organization: claim.organization,
    claim: claim.claim,
    caveats: [...claim.caveats],
    sources: claim.sources.map((source) => ({
      id: source.id,
      label: source.label,
      ...(source.url ? { url: source.url } : {}),
      provenance: source.provenance,
    })),
  };
}
