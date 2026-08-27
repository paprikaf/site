import { z } from 'zod';

const modelIdSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const modelFitBriefSchema = z.strictObject({
  role: z.strictObject({
    title: z.string().trim().min(1).max(160).nullable(),
    company: z.string().trim().min(1).max(160).nullable(),
    requirements: z
      .array(
        z.strictObject({
          id: modelIdSchema,
          sourceExcerpt: z.string().trim().min(8).max(280),
          priority: z.enum(['required', 'preferred', 'inferred']),
        })
      )
      .min(2)
      .max(6),
  }),
  matches: z
    .array(
      z.strictObject({
        requirementId: modelIdSchema,
        relationship: z.enum(['direct', 'adjacent']),
        claimIds: z.array(modelIdSchema).min(1).max(3),
      })
    )
    .max(6),
  unknowns: z
    .array(
      z.strictObject({
        requirementId: modelIdSchema,
        reason: z.literal('no-public-evidence'),
      })
    )
    .max(6),
});

export type ModelFitBrief = z.infer<typeof modelFitBriefSchema>;
