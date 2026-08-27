import type {
  FitBrief,
  RoleRequirement,
} from '../../src/features/role-fit/types';
import { approvedEvidence, findApprovedClaim, toFitEvidence } from './evidence';
import { modelFitBriefSchema, type ModelFitBrief } from './model-contract';

export class FitHydrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FitHydrationError';
  }
}

type FitBriefMetadata = {
  requestId: string;
  generatedAt: string;
};

type QuestionSubject = {
  kind: 'direct' | 'adjacent' | 'unknown';
  requirement: RoleRequirement;
  claimIds: string[];
  claimTitles: string[];
};

function requireUniqueIds(ids: string[], label: string): void {
  if (new Set(ids).size !== ids.length) {
    throw new FitHydrationError(`${label} must contain unique IDs.`);
  }
}

function normalizeExcerpt(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('en-US');
}

function escapeRegularExpression(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function canonicalRoleExcerpt(roleText: string, value: string): string | null {
  const normalizedValue = normalizeExcerpt(value);
  if (!normalizedValue) {
    return null;
  }

  const pattern = normalizedValue
    .split(' ')
    .map(escapeRegularExpression)
    .join('\\s+');
  const match = new RegExp(pattern, 'iu').exec(roleText);
  const canonical = match?.[0].trim() ?? '';
  return canonical ? canonical : null;
}

function validatedRoleEntity(
  value: string | null,
  roleText: string
): string | null {
  if (value === null) {
    return null;
  }
  return canonicalRoleExcerpt(roleText, value);
}

function requireKnownRequirement(
  requirementIds: Set<string>,
  requirementId: string
): void {
  if (!requirementIds.has(requirementId)) {
    throw new FitHydrationError(
      `Unknown role requirement ID: ${requirementId}`
    );
  }
}

function requireApprovedClaim(claimId: string) {
  const claim = findApprovedClaim(claimId);
  if (!claim) {
    throw new FitHydrationError(`Unknown approved claim ID: ${claimId}`);
  }
  return claim;
}

function joinClauses(clauses: string[]): string {
  if (clauses.length <= 1) {
    return clauses[0] ?? '';
  }
  if (clauses.length === 2) {
    return `${clauses[0]} and ${clauses[1]}`;
  }
  return `${clauses.slice(0, -1).join(', ')}, and ${clauses.at(-1)}`;
}

function countClause(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

function composeSummary(
  requirementCount: number,
  directCount: number,
  adjacentCount: number,
  unknownCount: number
): string {
  const clauses: string[] = [];
  if (directCount > 0) {
    clauses.push(
      countClause(
        directCount,
        "was mapped to Ahmed's published claims and links as direct overlap",
        "were mapped to Ahmed's published claims and links as direct overlap"
      )
    );
  }
  if (adjacentCount > 0) {
    clauses.push(
      countClause(
        adjacentCount,
        'was mapped to related work on this site',
        'were mapped to related work on this site'
      )
    );
  }
  if (unknownCount > 0) {
    clauses.push(
      countClause(
        unknownCount,
        'is not covered on this site',
        'are not covered on this site'
      )
    );
  }

  const scope = `Of the ${requirementCount} role requirements identified, ${joinClauses(clauses)}.`;
  if (unknownCount > 0) {
    return `${scope} A missing public record is a question to investigate, not proof that the experience is absent.`;
  }
  return `${scope} This comparison is limited to public information and is not a hiring recommendation.`;
}

function composeMatchRationale(relationship: 'direct' | 'adjacent'): string {
  if (relationship === 'direct') {
    return 'This comparison mapped the published claims below as direct overlap.';
  }
  return 'This comparison found related published work, but it does not confirm this exact requirement.';
}

function composeUnknownExplanation(): string {
  return "Ahmed's published claims and links do not cover this requirement. That leaves a question to ask, not a conclusion about his experience.";
}

function compact(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function formatClaimTitles(titles: string[]): string {
  const uniqueTitles = [...new Set(titles)];
  const visibleTitles = uniqueTitles.slice(0, 2);
  const suffix = uniqueTitles.length > 2 ? ' and other cited work' : '';
  return compact(`${joinClauses(visibleTitles)}${suffix}`, 100);
}

function makeQuestion(
  subject: QuestionSubject,
  variant: 'primary' | 'follow-up'
): FitBrief['interviewQuestions'][number] {
  const label = compact(subject.requirement.label, 100);
  let question: string;

  if (subject.kind === 'unknown') {
    if (variant === 'follow-up') {
      question = `What example or artifact could help verify your experience with “${label}”?`;
    } else {
      question = `What experience, if any, can you share for “${label}” beyond the current public record?`;
    }
  } else {
    const titles = formatClaimTitles(subject.claimTitles);
    if (variant === 'follow-up') {
      question = `Which concrete decision or result from ${titles} is most relevant to “${label}”?`;
    } else if (subject.kind === 'adjacent') {
      question = `Where does your work on ${titles} transfer to “${label},” and where does the comparison stop?`;
    } else {
      question = `What did you personally own in ${titles}, and which part is most relevant to “${label}”?`;
    }
  }

  return {
    question: compact(question, 260),
    resolvesRequirementIds: [subject.requirement.id],
    testsClaimIds: [...subject.claimIds],
  };
}

function composeInterviewQuestions(
  requirements: RoleRequirement[],
  matches: FitBrief['matches'],
  unknowns: FitBrief['unknowns']
): FitBrief['interviewQuestions'] {
  const requirementsById = new Map(
    requirements.map((requirement) => [requirement.id, requirement] as const)
  );
  const unknownSubjects: QuestionSubject[] = unknowns.map((unknown) => ({
    kind: 'unknown',
    requirement: requirementsById.get(unknown.requirementId)!,
    claimIds: [],
    claimTitles: [],
  }));
  const adjacentSubjects: QuestionSubject[] = matches
    .filter((match) => match.relationship === 'adjacent')
    .map((match) => ({
      kind: 'adjacent',
      requirement: requirementsById.get(match.requirementId)!,
      claimIds: match.evidence.map((evidence) => evidence.id),
      claimTitles: match.evidence.map((evidence) => evidence.title),
    }));
  const directSubjects: QuestionSubject[] = matches
    .filter((match) => match.relationship === 'direct')
    .map((match) => ({
      kind: 'direct',
      requirement: requirementsById.get(match.requirementId)!,
      claimIds: match.evidence.map((evidence) => evidence.id),
      claimTitles: match.evidence.map((evidence) => evidence.title),
    }));

  const groups = [unknownSubjects, adjacentSubjects, directSubjects];
  const subjects: QuestionSubject[] = [];
  for (const group of groups) {
    if (group[0]) {
      subjects.push(group[0]);
    }
  }
  for (const group of groups) {
    subjects.push(...group.slice(1));
  }

  const selected = subjects.slice(0, 3);
  const questions = selected.map((subject) => makeQuestion(subject, 'primary'));
  while (questions.length < 3) {
    const subject = selected[questions.length % selected.length];
    if (!subject) {
      throw new FitHydrationError(
        'At least one classified requirement is needed for interview questions.'
      );
    }
    questions.push(makeQuestion(subject, 'follow-up'));
  }
  return questions;
}

export function hydrateFitBrief(
  modelValue: ModelFitBrief,
  roleText: string,
  metadata: FitBriefMetadata
): FitBrief {
  const modelBrief = modelFitBriefSchema.parse(modelValue);
  const requirementIds = modelBrief.role.requirements.map(
    (requirement) => requirement.id
  );
  requireUniqueIds(requirementIds, 'Role requirements');

  const requirements: RoleRequirement[] = modelBrief.role.requirements.map(
    (requirement) => {
      const sourceExcerpt = canonicalRoleExcerpt(
        roleText,
        requirement.sourceExcerpt
      );
      if (!sourceExcerpt) {
        throw new FitHydrationError(
          `Requirement ${requirement.id} does not contain a source excerpt from the submitted role.`
        );
      }
      return {
        id: requirement.id,
        label: compact(sourceExcerpt.replace(/\s+/g, ' ').trim(), 140),
        sourceExcerpt,
        priority: requirement.priority,
      };
    }
  );
  requireUniqueIds(
    requirements.map((requirement) =>
      normalizeExcerpt(requirement.sourceExcerpt)
    ),
    'Role requirement source excerpts'
  );

  const knownRequirementIds = new Set(requirementIds);
  const matchRequirementIds = modelBrief.matches.map(
    (match) => match.requirementId
  );
  const unknownRequirementIds = modelBrief.unknowns.map(
    (unknown) => unknown.requirementId
  );
  requireUniqueIds(matchRequirementIds, 'Matches');
  requireUniqueIds(unknownRequirementIds, 'Unknowns');

  const classifiedRequirementIds = [
    ...matchRequirementIds,
    ...unknownRequirementIds,
  ];
  requireUniqueIds(classifiedRequirementIds, 'Requirement classifications');
  classifiedRequirementIds.forEach((requirementId) =>
    requireKnownRequirement(knownRequirementIds, requirementId)
  );
  if (classifiedRequirementIds.length !== requirementIds.length) {
    throw new FitHydrationError(
      'Matches and unknowns must classify every role requirement exactly once.'
    );
  }

  const requirementOrder = new Map(
    requirementIds.map(
      (requirementId, index) => [requirementId, index] as const
    )
  );
  const matches: FitBrief['matches'] = modelBrief.matches
    .map((match) => {
      requireUniqueIds(match.claimIds, `Match ${match.requirementId} claims`);
      return {
        requirementId: match.requirementId,
        relationship: match.relationship,
        rationale: composeMatchRationale(match.relationship),
        evidence: match.claimIds.map((claimId) =>
          toFitEvidence(requireApprovedClaim(claimId))
        ),
      };
    })
    .sort(
      (left, right) =>
        requirementOrder.get(left.requirementId)! -
        requirementOrder.get(right.requirementId)!
    );

  const unknowns: FitBrief['unknowns'] = modelBrief.unknowns
    .map((unknown) => ({
      requirementId: unknown.requirementId,
      reason: unknown.reason,
      explanation: composeUnknownExplanation(),
    }))
    .sort(
      (left, right) =>
        requirementOrder.get(left.requirementId)! -
        requirementOrder.get(right.requirementId)!
    );

  const directCount = matches.filter(
    (match) => match.relationship === 'direct'
  ).length;
  const adjacentCount = matches.length - directCount;

  return {
    role: {
      title: validatedRoleEntity(modelBrief.role.title, roleText),
      company: validatedRoleEntity(modelBrief.role.company, roleText),
      sourceKind: 'text',
      requirements,
    },
    summary: composeSummary(
      requirements.length,
      directCount,
      adjacentCount,
      unknowns.length
    ),
    matches,
    unknowns,
    interviewQuestions: composeInterviewQuestions(
      requirements,
      matches,
      unknowns
    ),
    meta: {
      requestId: metadata.requestId,
      evidenceVersion: approvedEvidence.version,
      generatedAt: metadata.generatedAt,
    },
  };
}
