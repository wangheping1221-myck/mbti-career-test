/**
 * Career Test V2 — reason-code contracts (V2.4B).
 * Coded templates only — no free-form LLM scoring truth.
 */

export type ReasonKindV2 =
  | "positive"
  | "caution"
  | "hard_exclusion"
  | "premium_info";

/** Stable machine code; display strings live on ReasonDefV2 templates. */
export type ReasonCodeV2 = string & { readonly __reasonCode: "ReasonCodeV2" };

export interface ReasonDefV2 {
  code: ReasonCodeV2;
  kind: ReasonKindV2;
  templateZh: string;
  templateEn?: string;
}

export interface ReasonBundleV2 {
  codes: readonly ReasonCodeV2[];
  reasonsZh: readonly string[];
  warningsZh?: readonly string[];
}
