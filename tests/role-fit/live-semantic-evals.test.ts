import { beforeAll, describe, expect, it } from 'vitest';

import { generateFitBrief } from '../../server/role-fit/generation';

type RoleFitEvalFixture = {
  name: string;
  roleText: string;
  mustAppearClaimIds: readonly string[];
  mustNotAppearClaimIds: readonly string[];
  minimumUnknowns: number;
  maximumUnknowns?: number;
};

// Synthetic, publication-safe role descriptions keep the eval repeatable and
// avoid sending private company or candidate information to the model.
const fixtures: readonly RoleFitEvalFixture[] = [
  {
    name: 'strong overlap',
    roleText: `Senior Product Engineer, Applied AI at Northstar

Northstar is hiring a hands-on product engineer to turn repeated customer workflow problems into reusable software. You will own ambiguous work from discovery and prototyping through live testing. The role requires building production React and TypeScript interfaces with Node APIs. You will connect AI agents to product tools and data through MCP, with human review, automation, and evaluation loops where mistakes matter. You will also add logging and recovery paths so the systems can be operated reliably after launch. This is a zero-to-one role for someone comfortable working directly with customers, product, and go-to-market teams.`,
    mustAppearClaimIds: [
      'resume-engineering-toolkit',
      'resume-ai-practice',
      'portfolio-production-systems-practice',
    ],
    mustNotAppearClaimIds: ['languages', 'location-montreal'],
    minimumUnknowns: 0,
    maximumUnknowns: 0,
  },
  {
    name: 'partial overlap',
    roleText: `Platform Product Engineer at Harbor Cloud

Harbor Cloud is looking for an engineer to build TypeScript and Node APIs and maintain infrastructure modules in Terraform. At least five years of production Go experience is required. You must have operated Kubernetes fleets larger than 500 nodes, including upgrades, networking, and workload debugging. Expert knowledge of AWS EKS, VPC networking, and IAM is required. Candidates must hold an active AWS Solutions Architect Professional certification. You will also partner with product teams to turn platform needs into self-service developer workflows.`,
    mustAppearClaimIds: ['resume-engineering-toolkit'],
    mustNotAppearClaimIds: ['languages', 'location-montreal'],
    minimumUnknowns: 2,
  },
  {
    name: 'poor overlap',
    roleText: `Principal Machine Learning Research Scientist at Helix Labs

Helix Labs is seeking a researcher with a PhD in machine learning, statistics, or a closely related field. Candidates must have a strong publication record at NeurIPS, ICML, or ICLR. The role requires designing new diffusion-model training objectives in PyTorch and JAX, writing custom CUDA and C++ kernels, and running large-scale distributed training across multi-node GPU clusters. You will lead novel research, establish rigorous offline benchmarks, publish results, and mentor a team of research scientists. Prior work on foundation-model pretraining and mathematical optimization is required.`,
    mustAppearClaimIds: [],
    mustNotAppearClaimIds: [
      'builder-academy-built',
      'builder-mcp-initial-production',
      'discogs-sdk-authorship',
      'portfolio-customer-product-translation',
    ],
    minimumUnknowns: 4,
  },
];

const liveDescribe =
  process.env.RUN_ROLE_FIT_EVALS === '1' ? describe : describe.skip;

liveDescribe('role-fit live semantic evaluations', () => {
  beforeAll(() => {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        'RUN_ROLE_FIT_EVALS=1 requires ANTHROPIC_API_KEY to run live evaluations.'
      );
    }
  });

  for (const fixture of fixtures) {
    it(
      fixture.name,
      async () => {
        expect(fixture.roleText.length).toBeGreaterThanOrEqual(250);

        const brief = await generateFitBrief(
          fixture.roleText,
          `live-eval-${fixture.name.replaceAll(' ', '-')}`,
          new AbortController().signal
        );
        const observedClaimIds = new Set(
          brief.matches.flatMap((match) =>
            match.evidence.map((evidence) => evidence.id)
          )
        );

        for (const claimId of fixture.mustAppearClaimIds) {
          expect(
            observedClaimIds.has(claimId),
            `${fixture.name} should cite ${claimId}; observed: ${[
              ...observedClaimIds,
            ].join(', ')}`
          ).toBe(true);
        }

        for (const claimId of fixture.mustNotAppearClaimIds) {
          expect(
            observedClaimIds.has(claimId),
            `${fixture.name} should not cite ${claimId}; observed: ${[
              ...observedClaimIds,
            ].join(', ')}`
          ).toBe(false);
        }

        expect(brief.unknowns.length).toBeGreaterThanOrEqual(
          fixture.minimumUnknowns
        );
        if (fixture.maximumUnknowns !== undefined) {
          expect(brief.unknowns.length).toBeLessThanOrEqual(
            fixture.maximumUnknowns
          );
        }
      },
      30_000
    );
  }
});
