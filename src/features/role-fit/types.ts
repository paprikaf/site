export type EvidenceProvenance =
  | 'ahmed-published-claim'
  | 'public-artifact'
  | 'public-contribution-record'
  | 'public-authorship-record';

export type FitEvidenceSource = {
  id: string;
  label: string;
  url?: string;
  provenance: EvidenceProvenance;
};

export type FitEvidence = {
  id: string;
  title: string;
  organization: string;
  claim: string;
  caveats: string[];
  sources: FitEvidenceSource[];
};

export type RoleRequirement = {
  id: string;
  label: string;
  sourceExcerpt: string;
  priority: 'required' | 'preferred' | 'inferred';
};

export type FitBrief = {
  role: {
    title: string | null;
    company: string | null;
    sourceKind: 'text';
    requirements: RoleRequirement[];
  };
  summary: string;
  matches: Array<{
    requirementId: string;
    relationship: 'direct' | 'adjacent';
    rationale: string;
    evidence: FitEvidence[];
  }>;
  unknowns: Array<{
    requirementId: string;
    reason: 'no-public-evidence';
    explanation: string;
  }>;
  interviewQuestions: Array<{
    question: string;
    resolvesRequirementIds: string[];
    testsClaimIds: string[];
  }>;
  meta: {
    requestId: string;
    evidenceVersion: string;
    generatedAt: string;
  };
};

export type FitApiErrorCode =
  | 'invalid-input'
  | 'forbidden-origin'
  | 'rate-limited'
  | 'generation-failed'
  | 'provider-timeout';

export type FitApiError = {
  error: {
    code: FitApiErrorCode;
    message: string;
  };
};
