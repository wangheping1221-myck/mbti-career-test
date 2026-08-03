/**
 * Career Test V2 — Human Verify status and claim-level artifacts (V2.4B).
 * Types only. Scoring must not depend on unverified factual claims.
 */

export type VerificationStatusV2 =
  | "editorial-only"
  | "research-needed"
  | "source-collected"
  | "human-verified"
  | "approved-for-publication"
  | "review-needed";

export interface VerificationArtifactV2 {
  claimId: string;
  claimText: string;
  fieldPath: string;
  sourceUrl?: string;
  sourceId?: string;
  accessedAt: string;
  reviewedAt?: string;
  reviewer?: string;
  jurisdiction?: string;
  notes?: string;
  /** Future review / expiry timing — does not replace status review-needed. */
  nextReviewAt?: string;
  status: VerificationStatusV2;
}

/**
 * Career-level editorial summary plus claim-level artifacts.
 * Claim-level artifacts remain the publication gate for factual claims
 * (licensing, regulation, wages, outlook, NOC, immigration, etc.).
 */
export interface CareerVerificationV2 {
  status: VerificationStatusV2;
  artifacts?: readonly VerificationArtifactV2[];
}
