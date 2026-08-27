import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type {
  EvidenceProvenance,
  FitApiError,
  FitApiErrorCode,
  FitBrief,
  FitEvidence,
  FitEvidenceSource,
  RoleRequirement,
} from './types';

const MIN_ROLE_LENGTH = 250;
const MAX_ROLE_LENGTH = 12_000;
const DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const PROVENANCE_LABELS: Record<EvidenceProvenance, string> = {
  'ahmed-published-claim': 'Ahmed’s own account',
  'public-artifact': 'Public artifact',
  'public-contribution-record': 'Public contribution record',
  'public-authorship-record': 'Public authorship record',
};

const PRIORITY_LABELS: Record<RoleRequirement['priority'], string> = {
  required: 'Required',
  preferred: 'Preferred',
  inferred: 'Inferred priority',
};

const API_ERROR_MESSAGES: Partial<Record<FitApiErrorCode, string>> = {
  'invalid-input':
    'This does not look like a complete role description. Include the responsibilities and requirements, then try again.',
  'forbidden-origin':
    'This comparison can only be started from Ahmed’s portfolio.',
  'rate-limited':
    'You’ve reached the demo limit for now. Try again later or read Ahmed’s résumé.',
  'generation-failed':
    'The comparison did not finish. Try again or read Ahmed’s résumé.',
  'provider-timeout':
    'The comparison took too long to finish. Try again in a moment.',
};

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; brief: FitBrief }
  | { status: 'error'; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function isProvenance(value: unknown): value is EvidenceProvenance {
  return (
    value === 'ahmed-published-claim' ||
    value === 'public-artifact' ||
    value === 'public-contribution-record' ||
    value === 'public-authorship-record'
  );
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function isEvidenceSource(value: unknown): value is FitEvidenceSource {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.label === 'string' &&
    (value.url === undefined || isHttpsUrl(value.url)) &&
    isProvenance(value.provenance)
  );
}

function isEvidence(value: unknown): value is FitEvidence {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.organization === 'string' &&
    typeof value.claim === 'string' &&
    isStringArray(value.caveats) &&
    Array.isArray(value.sources) &&
    value.sources.every(isEvidenceSource)
  );
}

function isRequirement(value: unknown): value is RoleRequirement {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.label === 'string' &&
    typeof value.sourceExcerpt === 'string' &&
    (value.priority === 'required' ||
      value.priority === 'preferred' ||
      value.priority === 'inferred')
  );
}

function isFitBrief(value: unknown): value is FitBrief {
  if (!isRecord(value) || !isRecord(value.role) || !isRecord(value.meta)) {
    return false;
  }

  const requirements = value.role.requirements;
  const matches = value.matches;
  const unknowns = value.unknowns;
  const interviewQuestions = value.interviewQuestions;

  return (
    (value.role.title === null || typeof value.role.title === 'string') &&
    (value.role.company === null || typeof value.role.company === 'string') &&
    value.role.sourceKind === 'text' &&
    Array.isArray(requirements) &&
    requirements.length >= 2 &&
    requirements.length <= 6 &&
    requirements.every(isRequirement) &&
    typeof value.summary === 'string' &&
    Array.isArray(matches) &&
    matches.length <= 6 &&
    matches.every(
      (match) =>
        isRecord(match) &&
        typeof match.requirementId === 'string' &&
        (match.relationship === 'direct' ||
          match.relationship === 'adjacent') &&
        typeof match.rationale === 'string' &&
        Array.isArray(match.evidence) &&
        match.evidence.length > 0 &&
        match.evidence.every(isEvidence)
    ) &&
    Array.isArray(unknowns) &&
    unknowns.length <= 6 &&
    unknowns.every(
      (unknown) =>
        isRecord(unknown) &&
        typeof unknown.requirementId === 'string' &&
        unknown.reason === 'no-public-evidence' &&
        typeof unknown.explanation === 'string'
    ) &&
    Array.isArray(interviewQuestions) &&
    interviewQuestions.length === 3 &&
    interviewQuestions.every(
      (question) =>
        isRecord(question) &&
        typeof question.question === 'string' &&
        isStringArray(question.resolvesRequirementIds) &&
        isStringArray(question.testsClaimIds)
    ) &&
    typeof value.meta.requestId === 'string' &&
    typeof value.meta.evidenceVersion === 'string' &&
    typeof value.meta.generatedAt === 'string'
  );
}

function getApiError(payload: unknown): FitApiError | null {
  if (
    !isRecord(payload) ||
    !isRecord(payload.error) ||
    typeof payload.error.code !== 'string' ||
    typeof payload.error.message !== 'string'
  ) {
    return null;
  }

  return payload as FitApiError;
}

function formatGeneratedAt(value: string): string | null {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return DATE_FORMATTER.format(date);
}

function formatEvidenceReviewedAt(version: string): string | null {
  const datePart = version.match(/^(\d{4}-\d{2}-\d{2})\./)?.[1];
  return datePart ? formatGeneratedAt(`${datePart}T12:00:00Z`) : null;
}

function SourceReference({ source }: { source: FitEvidenceSource }) {
  const content = (
    <>
      <span className="role-fit__provenance">
        {PROVENANCE_LABELS[source.provenance]}
      </span>
      <span>{source.label}</span>
      {source.url ? <ArrowUpRight aria-hidden="true" /> : null}
    </>
  );

  if (!source.url) {
    return <span className="role-fit__source">{content}</span>;
  }

  return (
    <a
      className="role-fit__source"
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

function EvidenceRecord({ evidence }: { evidence: FitEvidence }) {
  return (
    <div className="role-fit__evidence-record">
      <div className="role-fit__evidence-heading">
        <h5>{evidence.title}</h5>
        <span>{evidence.organization}</span>
      </div>
      <p>{evidence.claim}</p>

      <div className="role-fit__sources" aria-label="Evidence sources">
        {evidence.sources.map((source) => (
          <SourceReference
            key={`${evidence.id}-${source.id}`}
            source={source}
          />
        ))}
      </div>

      {evidence.caveats.length > 0 ? (
        <ul className="role-fit__caveats" aria-label="Evidence context">
          {evidence.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FitBriefView({ brief }: { brief: FitBrief }) {
  const roleName = [brief.role.title, brief.role.company]
    .filter(Boolean)
    .join(' · ');
  const requirementById = new Map(
    brief.role.requirements.map((requirement) => [requirement.id, requirement])
  );
  const generatedAt = formatGeneratedAt(brief.meta.generatedAt);
  const evidenceReviewedAt = formatEvidenceReviewedAt(
    brief.meta.evidenceVersion
  );

  return (
    <article className="role-fit__desk" aria-labelledby="fit-brief-title">
      <header className="role-fit__desk-header">
        <div>
          <p className="role-fit__desk-label">Role interpretation</p>
          <h3 id="fit-brief-title">{roleName || 'Pasted role'}</h3>
        </div>
        <p>
          This uses only what you pasted. Any inferred priorities are labeled.
        </p>
      </header>

      <ul className="role-fit__requirements" aria-label="Role priorities">
        {brief.role.requirements.slice(0, 6).map((requirement) => (
          <li key={requirement.id}>
            <span>{PRIORITY_LABELS[requirement.priority]}</span>
            {requirement.label}
          </li>
        ))}
      </ul>

      <section
        className="role-fit__summary"
        aria-labelledby="fit-summary-title"
      >
        <p className="role-fit__desk-label" id="fit-summary-title">
          Bottom line
        </p>
        <p>{brief.summary}</p>
      </section>

      <section
        className="role-fit__desk-section"
        aria-labelledby="fit-overlaps-title"
      >
        <header className="role-fit__section-heading">
          <p className="role-fit__desk-label">Matches</p>
          <h4 id="fit-overlaps-title">Where Ahmed’s work lines up</h4>
        </header>

        <div className="role-fit__matches">
          {brief.matches.length > 0 ? (
            brief.matches.map((match) => {
              const requirement = requirementById.get(match.requirementId);

              return (
                <article
                  className="role-fit__match"
                  key={`${match.requirementId}-${match.relationship}`}
                >
                  <div className="role-fit__match-role">
                    <span className="role-fit__relationship">
                      {match.relationship === 'direct'
                        ? 'Mapped overlap'
                        : 'Related work'}
                    </span>
                    <h5>{requirement?.label ?? 'Role requirement'}</h5>
                    {requirement?.sourceExcerpt &&
                    requirement.sourceExcerpt !== requirement.label ? (
                      <p>“{requirement.sourceExcerpt}”</p>
                    ) : null}
                  </div>

                  <div className="role-fit__arrow" aria-hidden="true">
                    <ArrowRight />
                  </div>

                  <div className="role-fit__match-evidence">
                    <p className="role-fit__rationale">{match.rationale}</p>
                    {match.evidence.map((evidence) => (
                      <EvidenceRecord key={evidence.id} evidence={evidence} />
                    ))}
                  </div>
                </article>
              );
            })
          ) : (
            <p className="role-fit__empty-result">
              Nothing on this site clearly matches the role. Ahmed may still
              have relevant experience that isn’t public.
            </p>
          )}
        </div>
      </section>

      <section
        className="role-fit__desk-section"
        aria-labelledby="fit-unknowns-title"
      >
        <header className="role-fit__section-heading">
          <p className="role-fit__desk-label">Open questions</p>
          <h4 id="fit-unknowns-title">What this site can’t answer</h4>
        </header>

        <div className="role-fit__unknowns">
          {brief.unknowns.length > 0 ? (
            brief.unknowns.map((unknown) => {
              const requirement = requirementById.get(unknown.requirementId);

              return (
                <article key={`${unknown.requirementId}-${unknown.reason}`}>
                  <div>
                    <span>No public evidence here</span>
                    <h5>{requirement?.label ?? 'Role requirement'}</h5>
                  </div>
                  <p>{unknown.explanation}</p>
                </article>
              );
            })
          ) : (
            <p className="role-fit__empty-result">
              This comparison did not leave any listed requirement without
              related public work.
            </p>
          )}
        </div>
      </section>

      <section
        className="role-fit__desk-section"
        aria-labelledby="fit-questions-title"
      >
        <header className="role-fit__section-heading">
          <p className="role-fit__desk-label">Interview guide</p>
          <h4 id="fit-questions-title">Questions worth asking Ahmed</h4>
        </header>

        <ol className="role-fit__questions">
          {brief.interviewQuestions.map((question, index) => (
            <li key={question.question}>
              <span aria-hidden="true">Q{index + 1}</span>
              <p>{question.question}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="role-fit__disclosure">
        <div>
          <p className="role-fit__desk-label">About this brief</p>
          <p>
            This AI-assisted comparison uses claims and links Ahmed has
            published. Project links show that the work exists; some role and
            ownership details are Ahmed’s own account. Use the questions above
            to verify them.
          </p>
          <p className="role-fit__meta">
            {evidenceReviewedAt
              ? `Sources reviewed ${evidenceReviewedAt}`
              : 'Published sources'}
            {generatedAt ? ` · Compared ${generatedAt}` : null}
          </p>
        </div>
        <div className="role-fit__brief-links">
          <Link to="/resume">
            View résumé <ArrowUpRight aria-hidden="true" />
          </Link>
          <a href="#contact">
            Contact Ahmed <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </footer>
    </article>
  );
}

export function RoleFit() {
  const [roleText, setRoleText] = useState('');
  const [requestState, setRequestState] = useState<RequestState>({
    status: 'idle',
  });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (requestState.status !== 'success') {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      resultRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [requestState.status]);

  const focusTextarea = () => {
    window.requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (requestState.status === 'loading' || abortControllerRef.current) {
      return;
    }

    const text = roleText.trim();

    if (text.length < MIN_ROLE_LENGTH) {
      const message = `Add the role’s responsibilities and requirements (${MIN_ROLE_LENGTH} characters minimum).`;
      setFieldError(message);
      setRequestState({ status: 'idle' });
      setNotice(null);
      textareaRef.current?.focus();
      return;
    }

    if (text.length > MAX_ROLE_LENGTH) {
      const message = `Shorten the role description to ${MAX_ROLE_LENGTH.toLocaleString()} characters or fewer.`;
      setFieldError(message);
      setRequestState({ status: 'idle' });
      setNotice(null);
      textareaRef.current?.focus();
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setFieldError(null);
    setNotice(null);
    setRequestState({ status: 'loading' });

    try {
      const response = await fetch('/api/fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { type: 'text', text } }),
        signal: controller.signal,
      });

      if (abortControllerRef.current !== controller) {
        return;
      }

      if (!response.ok) {
        const errorPayload: unknown = await response.json().catch(() => null);
        const apiError = getApiError(errorPayload);
        const message = apiError
          ? (API_ERROR_MESSAGES[apiError.error.code] ?? apiError.error.message)
          : 'The comparison did not finish. Try again or read Ahmed’s résumé.';

        setRequestState({ status: 'error', message });
        return;
      }

      const payload: unknown = await response.json().catch(() => null);

      if (!isFitBrief(payload)) {
        setRequestState({
          status: 'error',
          message:
            'The comparison returned an incomplete brief. Try again or read Ahmed’s résumé.',
        });
        return;
      }

      setRequestState({ status: 'success', brief: payload });
    } catch (error) {
      if (abortControllerRef.current !== controller) {
        return;
      }

      if (controller.signal.aborted) {
        setRequestState({ status: 'idle' });
        setNotice('Comparison cancelled. Your role description is still here.');
        return;
      }

      setRequestState({
        status: 'error',
        message:
          error instanceof TypeError
            ? 'The comparison could not reach the service. Check your connection and try again.'
            : 'The comparison did not finish. Try again or read Ahmed’s résumé.',
      });
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setRequestState({ status: 'idle' });
    setNotice('Comparison cancelled. Your role description is still here.');
    focusTextarea();
  };

  const handleEdit = () => {
    setRequestState({ status: 'idle' });
    setFieldError(null);
    setNotice('Role description ready to edit.');
    focusTextarea();
  };

  const handleReset = () => {
    setRoleText('');
    setRequestState({ status: 'idle' });
    setFieldError(null);
    setNotice('Ready for another role description.');
    focusTextarea();
  };

  const handleRoleTextChange = (value: string) => {
    setRoleText(value);
    setFieldError(null);
    setNotice(null);

    if (requestState.status === 'error') {
      setRequestState({ status: 'idle' });
    }
  };

  const isLoading = requestState.status === 'loading';
  const showForm = requestState.status !== 'success';

  return (
    <section
      className="role-fit"
      id="role-fit"
      aria-labelledby="role-fit-title"
      aria-busy={isLoading}
    >
      <div className="role-fit__inner">
        <header className="role-fit__intro">
          <p className="eyebrow">ROLE / EVIDENCE</p>
          <div>
            <h2 id="role-fit-title">How does Ahmed fit this role?</h2>
            <p>
              Paste a job description. You’ll see where Ahmed’s public work
              lines up, what this site can’t answer, and three questions to test
              the fit.
            </p>
          </div>
        </header>

        {showForm ? (
          <div className="role-fit__workbench">
            <form className="role-fit__form" onSubmit={handleSubmit} noValidate>
              <div className="role-fit__form-topline">
                <label htmlFor="role-fit-input">Role description</label>
                <span aria-hidden="true">
                  {roleText.length.toLocaleString()} /{' '}
                  {MAX_ROLE_LENGTH.toLocaleString()}
                </span>
              </div>

              <textarea
                ref={textareaRef}
                id="role-fit-input"
                name="role-description"
                value={roleText}
                onChange={(event) => handleRoleTextChange(event.target.value)}
                minLength={MIN_ROLE_LENGTH}
                maxLength={MAX_ROLE_LENGTH}
                placeholder="Paste the responsibilities and requirements here…"
                aria-describedby={`role-fit-input-help${fieldError ? ' role-fit-input-error' : ''}`}
                aria-invalid={fieldError ? 'true' : undefined}
                disabled={isLoading}
                required
              />

              <div className="role-fit__input-meta">
                <p id="role-fit-input-help">
                  {MIN_ROLE_LENGTH.toLocaleString()}–
                  {MAX_ROLE_LENGTH.toLocaleString()} characters · Public role
                  descriptions only
                </p>
                {fieldError ? (
                  <p id="role-fit-input-error" role="alert">
                    {fieldError}
                  </p>
                ) : null}
              </div>

              <div className="role-fit__form-footer">
                <p>
                  The job description is sent to Anthropic to create this
                  comparison. Ahmed’s site does not save a copy.
                </p>
                <button
                  className="role-fit__submit"
                  type="submit"
                  disabled={isLoading || roleText.trim().length === 0}
                >
                  Compare with Ahmed’s work
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </form>

            {requestState.status === 'idle' ? (
              <ul className="role-fit__promises" aria-label="Brief contents">
                <li>
                  <span>Overlap</span>
                  Relevant public work
                </li>
                <li>
                  <span>Unknowns</span>
                  What this site can’t answer
                </li>
                <li>
                  <span>Questions</span>
                  Three useful interview prompts
                </li>
              </ul>
            ) : null}

            {requestState.status === 'loading' ? (
              <div
                className="role-fit__loading"
                role="status"
                aria-live="polite"
              >
                <div>
                  <p className="role-fit__desk-label">Building the brief</p>
                  <h3>Checking the role against Ahmed’s work.</h3>
                </div>
                <button type="button" onClick={handleCancel}>
                  Cancel comparison
                </button>
              </div>
            ) : null}

            {requestState.status === 'error' ? (
              <div className="role-fit__error" role="alert">
                <div>
                  <p className="role-fit__desk-label">Brief not completed</p>
                  <p>{requestState.message}</p>
                </div>
                <Link to="/resume">Read Ahmed’s résumé</Link>
              </div>
            ) : null}
          </div>
        ) : null}

        {notice ? (
          <p className="role-fit__notice" role="status" aria-live="polite">
            {notice}
          </p>
        ) : null}

        {requestState.status === 'success' ? (
          <div ref={resultRef} className="role-fit__result" tabIndex={-1}>
            <div className="role-fit__result-actions">
              <div>
                <button type="button" onClick={handleEdit}>
                  Edit role
                </button>
                <button type="button" onClick={handleReset}>
                  Try another role
                </button>
              </div>
            </div>
            <FitBriefView brief={requestState.brief} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
