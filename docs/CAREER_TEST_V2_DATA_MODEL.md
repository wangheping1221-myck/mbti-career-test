# Career Test V2 — Data Model & Scoring Contract (V2.3)

**Document:** `docs/CAREER_TEST_V2_DATA_MODEL.md`  
**Phase:** V2.3 — Data-model documentation only  
**Status:** Draft for review (no code, no scoring implementation, no weights)  
**Approved HEAD baseline:** `866c792f53e1fc08ac37922fcebf4175786d2023`  

**Sources of truth:**  
- `docs/PRD_CAREER_TEST_V2.md`  
- `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md`  
- `docs/CAREER_TEST_V2_QUESTION_FRAMEWORK.md`  

**V1:** Frozen — do not modify `lib/questions.ts`, `lib/career-data.ts`, `lib/recommend-careers.ts`, unlock, routes, or UI in this phase.  
**V2.4:** Scoring formulas and weights — **not started**.

---

## 1. Scope and boundaries

### In scope

- TypeScript-level contracts for questions, answers, profiles, families, careers  
- Hard-constraint and soft-dimension separation  
- Pure function signatures for future scoring (no implementation)  
- Feature-flag / unlock compatibility requirements  
- Human Verify status model  
- Fixture strategy for later phases  

### Out of scope

- Implementing `lib/career-test/v2/**`  
- Numeric soft-score weights or match formulas  
- Changing V1 or enabling V2 in production  
- Human Verify research  
- Wages, outlook, immigration/PR, official NOC as product truth  

---

## 2. Sources of truth

| Document | Owns |
|----------|------|
| PRD | 26Q / 60 careers / deal-breakers / flag / Top 5 / English rule / ≤20% field affinity later |
| Occupation framework | Exact 60 inventory, families, HV priority, titles |
| Question framework | Exact 26 questions, 4 options, hard filters c01(a)/c02(a), Next-button UX |
| This data model | Schemas, IDs, contracts, scales, validation boundaries |

---

## 3. Architecture

Future code root (not created in V2.3):

`lib/career-test/v2/`

| Area | Responsibility |
|------|----------------|
| Question bank | Canonical `as const` questions + options |
| Answers | Partial UI state + `validateAnswersV2` → `ValidatedAnswersV2` |
| Normalize | Answers → constraints + soft dims + family affinity |
| Constraints | Graded career exposure + hard-filter evaluation |
| Families | 12 occupation-family IDs + ZH 职业大类 labels |
| Careers | 60 `CareerProfileV2` records |
| Score / rank | Pure functions only (V2.4+) |
| Reasons | Coded templates |
| Premium fields | Display depth only; no rank change |
| Fixtures | Golden behavioral profiles |
| Version | Feature-flag selection |

**UI** collects answers and renders results; **must not** compute scores.  
**Scoring** must not import React, `localStorage`, browser APIs, env unlock secrets, or premium state.

---

## 4. Stable IDs

### 4.1 Questions and options

Derive IDs from canonical source arrays where possible (avoid hand-duplicated unions drifting):

```ts
export const QUESTION_IDS_V2 = [
  "v2-c01","v2-c02","v2-c03","v2-c04","v2-c05","v2-c06",
  "v2-p01","v2-p02","v2-p03","v2-p04","v2-p05",
  "v2-p06","v2-p07","v2-p08","v2-p09","v2-p10",
  "v2-i01","v2-i02","v2-i03","v2-i04","v2-i05",
  "v2-i06","v2-i07","v2-i08","v2-i09","v2-i10",
] as const;

export type QuestionIdV2 = (typeof QUESTION_IDS_V2)[number];
export const OPTION_IDS_V2 = ["a", "b", "c", "d"] as const;
export type OptionIdV2 = (typeof OPTION_IDS_V2)[number];
```

### 4.2 Careers

Use provisional IDs from the occupation framework (`v2-electrician`, …) — exactly 60 at launch.

### 4.3 Occupation families

See §10 (locked internal IDs + ZH 职业大类 labels).

---

## 5. Question types

```ts
type QuestionSectionV2 = "constraints" | "work-preferences" | "interests";

/** CTV2.3-D1: discriminated answer signals — not a generic numeric bag */
type OptionSignalV2 =
  | { kind: "hard-constraint"; constraint: "rejectsNightOrRotating" | "rejectsHeavyPhysical" }
  | { kind: "ordinal-soft"; dimension: SoftDimensionKeyV2; level: 0 | 1 | 2 | 3 }
  | { kind: "categorical-soft"; dimension: SoftDimensionKeyV2; category: string }
  | { kind: "tradeoff"; dimension: "stabilityVersusUpside"; pole: "stability" | "balance" | "upside" | "unsure" }
  | { kind: "interest-family"; family: OccupationFamilyIdV2; polarity: "positive" }
  | { kind: "neutral" };

interface AnswerOptionDefV2 {
  id: OptionIdV2;
  labelZh: string;
  labelEn?: string;
  ariaLabelZh?: string;
  signal: OptionSignalV2;
  copyTestingNote?: string; // non-runtime metadata
}

interface QuestionDefV2 {
  id: QuestionIdV2;
  section: QuestionSectionV2;
  promptZh: string;
  promptEn?: string;
  subtitleZh?: string;
  subtitleEn?: string;
  options: readonly [AnswerOptionDefV2, AnswerOptionDefV2, AnswerOptionDefV2, AnswerOptionDefV2];
}
```

### Hard-filter metadata (locked)

| Question | Option | Activates |
|----------|--------|-----------|
| `v2-c01` | `a` | `rejectsNightOrRotating` |
| `v2-c02` | `a` | `rejectsHeavyPhysical` |

**English (`v2-c03`) never activates a hard constraint.**  
**Ordinal 0–3** only when the four answers genuinely form an ordered scale — **never** infer order from letters `a/b/c/d` alone.  
**No final numeric weights** in option signals for V2.3.

---

## 6. Raw answer types

```ts
/** UI / in-progress quiz state */
type PartialAnswersV2 = Partial<Record<QuestionIdV2, OptionIdV2>>;

/**
 * Opaque scoring input — only validateAnswersV2 may construct.
 * Branding prevents accidental Partial passing into scorers.
 */
type ValidatedAnswersV2 = {
  readonly __brand: "ValidatedAnswersV2";
  readonly answers: Readonly<Record<QuestionIdV2, OptionIdV2>>;
};

type AnswerValidationErrorV2 =
  | { code: "missing-question"; questionId: QuestionIdV2 }
  | { code: "unknown-question-id"; questionId: string }
  | { code: "unknown-option-id"; questionId?: string; optionId: string }
  | { code: "option-not-in-question"; questionId: QuestionIdV2; optionId: OptionIdV2 }
  | { code: "malformed-input" };

type ValidateAnswersResultV2 =
  | { ok: true; value: ValidatedAnswersV2 }
  | { ok: false; errors: AnswerValidationErrorV2[] };
```

**Rules (CTV2.3-D3):**

- Scoring functions accept **only** `ValidatedAnswersV2`.  
- `validateAnswersV2` rejects missing questions, unknown IDs, options not belonging to the question, duplicate/malformed input.  
- Prefer deriving allowed pairs from the canonical question bank.

---

## 7. Normalized user profile

```ts
interface HardConstraintsV2 {
  rejectsNightOrRotating: boolean; // true iff v2-c01 === "a"
  rejectsHeavyPhysical: boolean;   // true iff v2-c02 === "a"
}

/** Exactly 12 stable keys — CTV2.3-D2 */
type SoftDimensionKeyV2 =
  | "fieldInterestAffinity"
  | "workStyleFit"
  | "physicalDemandTolerance"
  | "indoorOutdoorPreference"
  | "customerFacingTolerance"
  | "englishReadiness"
  | "trainingDurationTolerance"
  | "formalEntryWillingness"
  | "shiftScheduleTolerance"
  | "stabilityVersusUpside"
  | "detailVersusCoordination"
  | "careerEntryPracticality";

interface UserProfileV2 {
  constraints: HardConstraintsV2; // NEVER nested inside soft
  soft: Record<SoftDimensionKeyV2, number>; // later 0–1; not weighted here
  /**
   * Field / Interest Affinity payload: one dimension, 12 family values.
   * The 10 interest questions do NOT become 10 scored dimensions.
   */
  familyAffinity: Record<OccupationFamilyIdV2, number>; // later 0–1
  meta: {
    careerTestVersion: "v2";
    schemaVersion: number;
  };
}
```

`soft.fieldInterestAffinity` may store a summary scalar later; **familyAffinity** is the authoritative vector for occupation-family matching.

---

## 8. Dimension candidates (exactly 12 keys)

| # | Key | Meaning |
|---|-----|---------|
| 1 | `fieldInterestAffinity` | Aggregate field interest (≤20% soft weight **later**) |
| 2 | `workStyleFit` | Solo/team, hands-on/desk, structure, variety, leadership signals |
| 3 | `physicalDemandTolerance` | Soft physical comfort (paired with heavy-physical hard constraint) |
| 4 | `indoorOutdoorPreference` | Environment preference |
| 5 | `customerFacingTolerance` | Public/customer contact comfort |
| 6 | `englishReadiness` | **Current** workplace English — never hard filter |
| 7 | `trainingDurationTolerance` | Willingness to invest training time |
| 8 | `formalEntryWillingness` | Certificates / exams / licences / apprenticeship attitude |
| 9 | `shiftScheduleTolerance` | Soft schedule (incl. evenings/weekends; nights HF separate) |
| 10 | `stabilityVersusUpside` | Stability vs upside trade-off |
| 11 | `detailVersusCoordination` | Detail/process vs broad coordination |
| 12 | `careerEntryPracticality` | Entry-pace practicality (not immigration) |

These are **12 stable data fields**. V2.3 does **not** claim all twelve must be independently weighted. V2.4 may merge *signals* or reweight via an **explicit approved decision**. **No 13th** key without approval.

---

## 9. Constraint model (graded exposure)

### 9.1 User hard constraints

Exactly two activators:

- `v2-c01(a)` → `rejectsNightOrRotating = true`  
- `v2-c02(a)` → `rejectsHeavyPhysical = true`  

English readiness **never** sets a hard constraint.

### 9.2 Career constraint profile (not two booleans only)

```ts
type NightRotatingExposureV2 =
  | "not-typical"
  | "possible"
  | "common-or-required";

type HeavyPhysicalExposureV2 =
  | "low"
  | "moderate"
  | "frequent-high";

interface CareerConstraintProfileV2 {
  nightRotatingExposure: NightRotatingExposureV2;
  heavyPhysicalExposure: HeavyPhysicalExposureV2;
}
```

### 9.3 Hard-filter evaluation contract

```ts
type ConstraintExclusionCodeV2 = "night_or_rotating" | "heavy_physical";

interface ConstraintEvaluationV2 {
  eligible: boolean;
  exclusionReasons: Array<{
    code: ConstraintExclusionCodeV2;
    questionId: "v2-c01" | "v2-c02";
    optionId: "a";
  }>;
}

function evaluateConstraintsV2(
  user: HardConstraintsV2,
  career: CareerConstraintProfileV2,
): ConstraintEvaluationV2;
```

**Exclusion thresholds (locked for V2.0 launch semantics):**

| User constraint | Career excluded when |
|-----------------|----------------------|
| `rejectsNightOrRotating` | `nightRotatingExposure === "common-or-required"` |
| `rejectsHeavyPhysical` | `heavyPhysicalExposure === "frequent-high"` |

**Soft caution only (not hard exclude) unless later approved:**

- night: `possible`  
- physical: `moderate`  

Never reintroduce hard-excluded careers via ranking caps or soft scores.

### 9.4 Fallback when few/zero eligible

| Eligible count | Behavior |
|----------------|----------|
| 5+ | Normal Top 5 |
| 1–4 | Show all remaining + clear copy (fewer than Top 5 OK) |
| 0 | Controlled **no-exact-match** fallback |

**Never** relax hard constraints. Do **not** silently backfill excluded careers. Optional “near-match ignoring constraints” section is **out of V2.0 scope**.

---

## 10. Occupation-family model

### 10.1 Internal IDs (locked)

```ts
export const OCCUPATION_FAMILY_IDS_V2 = [
  "skilled-trades",
  "building-operations-facilities",
  "healthcare-support",
  "transportation-logistics",
  "manufacturing-production",
  "office-administration",
  "technology",
  "sales-customer-service",
  "education-community-services",
  "hospitality-food-services",
  "public-sector-institutional",
  "self-employment-friendly",
] as const;

export type OccupationFamilyIdV2 = (typeof OCCUPATION_FAMILY_IDS_V2)[number];
```

### 10.2 Canonical Chinese 职业大类 labels (locked)

| Internal ID | ZH display (职业大类 / 职业领域) |
|-------------|----------------------------------|
| `skilled-trades` | 技工与工程技术 |
| `building-operations-facilities` | 楼宇运维与设施管理 |
| `healthcare-support` | 医疗与健康支持 |
| `transportation-logistics` | 运输与物流 |
| `manufacturing-production` | 制造与生产 |
| `office-administration` | 办公与行政 |
| `technology` | 信息技术与数字领域 |
| `sales-customer-service` | 销售与客户服务 |
| `education-community-services` | 教育与社区服务 |
| `hospitality-food-services` | 酒店、餐饮与服务 |
| `public-sector-institutional` | 公共部门与机构岗位 |
| `self-employment-friendly` | 自雇与独立工作型 |

- Internal English may say `occupation family`.  
- User-facing Chinese must use **职业大类** / **职业领域** — never Chinese calques of English “occupation family”.  
- Display polish may refine punctuation later **without** changing IDs.  
- **Self-employment-friendly** = work-model classification — **not** income, flexibility, ease, or success promise.  
- Exactly **one** `primaryFamily` per occupation; cross-cutting tags do not create rows.

---

## 11. Career profile model

```ts
/** Validated normalized soft-dimension level for a career (CTV2.3-D14). */
type DimensionLevelV2 = number; // later normalized 0–1 editorial/engine level; never silently defaulted

interface PremiumFieldsV2 {
  entryPathZh?: string;
  licensingSummaryZh?: string;
  suitabilityRiskZh?: string;
  nextStepsZh?: string;
  // wages / outlook omitted unless separately HV-approved
}

interface CareerProfileV2 {
  id: string;
  titleEn: string;
  titleZh: string;
  /** Exactly one primary occupation family per career. */
  primaryFamily: OccupationFamilyIdV2;
  /**
   * Cross-cutting traits only — do not create extra rows or primary families.
   * Not a substitute for primaryFamily.
   */
  crossCuttingTags: string[];
  constraints: CareerConstraintProfileV2;
  /**
   * Complete 12-key profile — CTV2.3-D14.
   * Must be Record<SoftDimensionKeyV2, DimensionLevelV2>, never Partial.
   */
  dimensionProfile: Record<SoftDimensionKeyV2, DimensionLevelV2>;
  descriptionZh: string;
  mismatchNotesZh?: string;
  entryPathZh?: string;
  nextStepsZh?: string;
  premium?: PremiumFieldsV2;
  verification: VerificationStatusV2;
  sources?: VerificationArtifactV2[];
  similarityGroupId?: string;
  /** Supporting metadata only in V2.3 — no locked ladder diversity cap. */
  careerLadderGroupId?: string;
}
```

Launch set: **exactly 60** profiles matching the occupation framework.

### 11.1 Complete dimension-profile requirement (CTV2.3-D14)

- Every career must include **all 12** `SoftDimensionKeyV2` keys in `dimensionProfile`.  
- A missing key is a **validation failure** — never silently treat as zero.  
- Do **not** use `Partial<Record<…>>` for runtime occupation dimension profiles.  
- Do **not** add a runtime `familyAffinityHints` field.  
- Initial interest matching uses **`primaryFamily`**.  
- Cross-cutting characteristics use explicit `crossCuttingTags` and do not create additional primary families.  
- Exactly **one** `primaryFamily` per occupation.  
- No numeric weights or scoring formulas are added in V2.3.

---

## 12. Editorial vs verified fields

| Bucket | Fields |
|--------|--------|
| Safe editorial | Working titles, family, descriptions, traits, similarity/ladder groups, soft dimension *editorial* levels, cross-cutting tags |
| Requires HV before factual publish | Regulated status, licence/cert claims, apprenticeship, factual training duration, factual shift/on-call as fact |
| Omit until verified / approved | Wages, outlook, immigration/PR, official NOC as product truth |
| Runtime scoring | `constraints`, `dimensionProfile`, `primaryFamily`, affinity inputs, similarity/ladder IDs |
| Display-only | Premium presentation, teasers, unlock CTA (not rank inputs) |

---

## 13. Signal scales (CTV2.3-D1)

| Layer | Representation |
|-------|----------------|
| Answer signals | Discriminated unions / enums; ordinal **0–3** only for true ordered scales |
| Normalized soft dims | Later **0–1** (not assigned weights here) |
| Family affinity | Later **0–1** per family |
| Internal truth | **Not** 0–100 |

Option letter order must not invent ordinal meaning.

---

## 14. Pure scoring contracts (signatures only)

```ts
function validateAnswersV2(raw: unknown): ValidateAnswersResultV2;

function buildUserProfileV2(answers: ValidatedAnswersV2): UserProfileV2;

function evaluateConstraintsV2(
  user: HardConstraintsV2,
  career: CareerConstraintProfileV2,
): ConstraintEvaluationV2;

function scoreCareerV2(
  profile: UserProfileV2,
  career: CareerProfileV2,
): { rawScore: number; componentNotes?: string[] };

function rankCareersV2(
  profile: UserProfileV2,
  careers: readonly CareerProfileV2[],
): RankedCareerV2[];

function buildCareerReasonsV2(
  profile: UserProfileV2,
  career: CareerProfileV2,
  score: { rawScore: number },
): ReasonBundleV2;

/** Orchestration entry — UI calls this after validation */
function recommendCareersV2(
  answers: ValidatedAnswersV2,
): CareerRecommendationV2[];
```

**Invariants:**

- Deterministic for same inputs + data version  
- Premium unlock does **not** change ranking  
- Hard-filtered careers never appear in normal Top 5  
- Field / Interest Affinity weight share ≤ **20%** when weights are defined in V2.4  

---

## 15. Ranking output

### 15.1 Match-display contract (CTV2.3-D7)

Initial V2 is locked to **bands only**. No match percentage is displayed.

```ts
/** Internal band keys — initial V2 display mode only */
type MatchBandV2 = "high" | "moderate" | "explore";

/**
 * Initial V2 MatchDisplayV2 — bands only.
 * No relative-percent mode. No relativePercent field.
 */
type MatchDisplayV2 = {
  mode: "band";
  band: MatchBandV2;
};
```

| Internal band | User-facing Chinese (locked) |
|---------------|------------------------------|
| `high` | 高度匹配 |
| `moderate` | 较为匹配 |
| `explore` | 值得探索 |

- Initial V2 **must not** display a match percentage.  
- Internal `rawScore` / optional `comparisonScore` may exist **only** for deterministic sorting, debugging, and fixtures.  
- Internal scores must **not** be described as probability, certainty, scientific accuracy, or objective career suitability.  
- Percentage display is **not** an open initial-V2 option (see §23).

### 15.2 Ranking pipeline and exact tie behavior

```ts
interface RankedCareerV2 {
  careerId: string;
  rawScore: number;
  comparisonScore?: number; // sort/debug/fixtures only — not user probability
  rank: number;
  hardFilterStatus: "eligible";
  reasonCodes: string[];
  reasonsZh: string[];
  warningsZh?: string[];
  matchDisplay: MatchDisplayV2;
}

interface CareerRecommendationV2 {
  top: RankedCareerV2[]; // up to 5; may be fewer if hard filters shrink pool
  eligibleCount: number;
  outcome: "top5" | "partial" | "no_exact_match";
  runnersUpInternal?: RankedCareerV2[];
}
```

**Exact ordering contract:**

1. Hard-filter eligible careers.  
2. Calculate normal raw scores.  
3. Sort by raw score descending.  
4. If raw scores are **exactly equal**, sort by stable `careerId` only.

**Forbidden as hidden tie preferences** (these belong only inside the normal score, if at all):

- higher family / field affinity  
- lower physical mismatch  
- lower English mismatch  
- fewer caution reasons  
- any other dimension-specific preference  

Same inputs + same career data must always produce the same ordering.  
Premium state never enters scoring or ranking.  
UI performs no scoring. Hard-excluded careers never re-enter the eligible set.

---

## 16. Explainability reasons

```ts
type ReasonKindV2 = "positive" | "caution" | "hard_exclusion" | "premium_info";

interface ReasonDefV2 {
  code: string;
  kind: ReasonKindV2;
  templateZh: string;
  templateEn?: string;
}
```

Reasons are data-driven templates — not free-form model text as scoring truth. Separate premium entry-path copy from rank reasons.

---

## 17. Diversity handling (CTV2.3-D8)

Metadata:

- `similarityGroupId` — near-duplicate clusters; **initial V2 diversity mechanism**  
- `careerLadderGroupId` — supporting metadata only in V2.3 (associate vs supervisor ladders); **no locked ladder diversity cap**

**Deterministic diversity pipeline (locked):**

1. Evaluate hard constraints.  
2. Score all eligible occupations.  
3. Rank normally (raw score desc; exact ties → stable `careerId`).  
4. Apply deterministic Top-5 diversity handling **after** normal ranking.  
5. Within one `similarityGroupId`, normally keep the **highest-ranked** occupation in the displayed Top 5.  
6. Preserve displaced occupations as ordered **runners-up**.

**Locked rules:**

- Diversity handling must **not** rewrite or alter raw scores.  
- Do **not** lock a second career-ladder cap in V2.3.  
- Do **not** add an occupation-family cap now.  
- Exact similarity caps, exceptions, and replacement thresholds remain deferred to **V2.4**.

---

## 18. Human Verify artifact model (CTV2.3-D9)

Verification artifacts are **claim-level**, not merely one status for an entire occupation. Each factual claim must point to its own verification artifact or an approved shared artifact.

```ts
type VerificationStatusV2 =
  | "editorial-only"
  | "research-needed"
  | "source-collected"
  | "human-verified"
  | "approved-for-publication"
  | "review-needed";

interface VerificationArtifactV2 {
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
  /** Future review / expiry timing — does not replace status `review-needed`. */
  nextReviewAt?: string;
  status: VerificationStatusV2;
}
```

A claim **cannot be published** unless its required verification status and artifact are present.

**Publication gates (claim-level)** — factual claims concerning any of the following require claim-level verification before publish:

- licensing  
- regulation  
- certification  
- apprenticeship  
- training duration  
- typical shift patterns  
- wages  
- employment outlook  
- official NOC mapping  
- immigration or PR relevance  

V2.3 performs **no** external research and approves **none** of these facts automatically.

---

## 19. Feature-flag / version compatibility (CTV2.3-D10)

| Requirement | Contract |
|-------------|----------|
| Production default | **V1** |
| Local / Vercel Preview | May set `CAREER_TEST_VERSION=v2` |
| Public route | `/career-test` unchanged |
| Public query override | **Forbidden** — no `?ct=v2` or any public query-parameter version switch |
| Public cookie override | **Forbidden** as a user-accessible V2 switch |
| Unlock | Same API + `career-nav-premium-unlocked` |
| Unlock URLs | `/?unlock=` and `/career-test?unlock=` compatible |
| Restart / Related Tools / metadata | Preserved unless separately approved |
| Rollback | Flag off → immediate V1; tag `p5.8-complete` remains |

**Locked version rule:** Production defaults to V1. Local development and Vercel Preview may set `CAREER_TEST_VERSION=v2`. There is **no** public query-parameter override for selecting V2. Any internal QA override must **not** become a public URL, indexed surface, or user-accessible switch.

**Do not create feature-flag implementation in this documentation phase.**

---

## 20. Fixture strategy (CTV2.3-D12)

Behavioral fixtures first (no golden final numeric scores required before V2.4 weights exist), including:

- hands-on trades · daytime office/detail · facilities/stability · customer sales · healthcare support · logistics/shift-tolerant  
- rejects nights · rejects heavy physical · rejects both  
- low English without hard exclusion  
- high coordination/leadership · SE work-model interest · neutral-heavy answers  
- hard filters leaving &lt;5 · zero eligible → no-exact-match  
- deterministic tie · near-duplicate diversity  
- **Premium locked vs premium unlocked ranking equality** (required):

  - identical validated answers  
  - identical career data  
  - identical eligibility  
  - identical raw scores  
  - identical rank order  
  - identical displayed Top 5 career IDs  
  - only premium informational/display fields may differ  

**Premium state never enters** normalization, hard filtering, scoring, tie-breaking, diversity reranking, or ranking.

Each fixture asserts eligibility, ordering properties, and reason-code presence — not absolute percentages.

---

## 21. Acceptance criteria (documentation phase)

**D1–D6 (retained):**

1. Document defines exactly **12** soft dimension keys and forbids a 13th without approval.  
2. Hard constraints activate only from **`v2-c01(a)`** and **`v2-c02(a)`**; English never.  
3. Career constraints use **graded exposure**, not solely two booleans.  
4. Raw scoring input is **only** `ValidatedAnswersV2`.  
5. Profile nests `constraints` / `soft` / `familyAffinity` separately.  
6. Interest questions → **one** Field Affinity + **12** family values.  
7. Family IDs and ZH 职业大类 labels match the locked tables; forbidden Chinese calques of “occupation family” unused.  
8. No numeric weights, wage/outlook/immigration/NOC facts invented.  
9. Pure function contracts listed; UI must not score.  
10. Premium does not alter ranking.  
11. No code implemented in this phase.

**D7–D14 (objectively testable):**

12. Initial V2 uses exactly the three locked Chinese match bands: **高度匹配** / **较为匹配** / **值得探索**.  
13. Initial V2 displays **no** match percentage.  
14. Exact raw-score ties resolve by stable `careerId` only.  
15. No semantic hidden tie preference (affinity, physical, English, caution count, etc.).  
16. Diversity runs **after** normal ranking.  
17. Diversity does **not** modify raw scores.  
18. `careerLadderGroupId` has **no** locked cap in V2.3.  
19. Every career has a complete 12-key `dimensionProfile` (`Record<SoftDimensionKeyV2, DimensionLevelV2>`).  
20. Missing profile keys fail validation (never silent zero).  
21. Initial interest matching uses `primaryFamily`.  
22. Human Verify status union uses **`review-needed`** (not `expired-review-needed`).  
23. Required factual claims cannot publish without claim-level verification.  
24. Production defaults to V1; Local/Vercel Preview may use `CAREER_TEST_VERSION=v2`.  
25. No public query-parameter version override.  
26. Premium locked/unlocked ranking equality fixture exists.

---

## 22. Deferred decisions

| Topic | Deferred to |
|-------|-------------|
| Exact soft-score weights (Field Affinity ≤20%) | V2.4 |
| Band calibration / any future non-initial-% display research | V2.4+ (initial V2 remains bands-only) |
| Exact similarity diversity caps / exceptions / replacement thresholds | V2.4 |
| Whether `possible` / `moderate` exposures become hard excludes | Later decision if needed |
| Implementing `lib/career-test/v2` | V2.3 follow-on / V2.4 |
| Feature-flag wiring | V2.6 |
| Final ZH microcopy polish | Copy pass |

---

## 23. Open decisions remaining

| ID | Issue | Options | Recommendation | Consequence |
|----|-------|---------|----------------|-------------|
| CTV2.3-F1 | Approve this data-model doc for commit | Approve / revise | Approve after corrections audit | Unlocks later implementation docs/code |
| CTV2.3-F2 | Match display | **Locked for initial V2:** bands only (高度匹配 / 较为匹配 / 值得探索). Percentage display is **not** an initial-V2 option. | Keep bands-only | Trust UX; no false precision |
| CTV2.3-F3 | Diversity similarity cap numeric thresholds | Defer / set now | Defer to V2.4 fixtures | Avoid premature constants; ladder cap not locked in V2.3 |
| CTV2.3-F4 | `soft.fieldInterestAffinity` scalar vs vector-only | Keep both / vector only | Keep vector authoritative; scalar optional summary | Clear scoring input |
| CTV2.3-F5 | Internal QA version selection | env-only / non-public internal harness | Prefer `CAREER_TEST_VERSION` on Local/Preview; any internal harness must **not** be a public URL, query param, cookie switch, or indexed surface | Avoid public V2 override |

---

## Approved decision register (this phase)

| ID | Summary |
|----|---------|
| CTV2.3-D1 | Hybrid typed signals; ordinal 0–3 only for true scales; normalized 0–1 later; no 0–100 truth; no weights now |
| CTV2.3-D2 | Exactly 12 dimension keys; not all must be independent weights; no 13th |
| CTV2.3-D3 | Partial UI answers; opaque `ValidatedAnswersV2` for scoring; strict validation |
| CTV2.3-D4 | Nested profile: constraints / soft / familyAffinity / meta |
| CTV2.3-D5 | Locked family IDs + ZH 职业大类 labels; forbid Chinese “occupation family” calques |
| CTV2.3-D6 | Graded `CareerConstraintProfileV2`; hard exclude on `common-or-required` / `frequent-high` only |
| CTV2.3-D7 | Initial V2 match bands only (高度匹配 / 较为匹配 / 值得探索); no match %; internal scores sort/debug only |
| CTV2.3-D8 | Diversity after normal ranking via `similarityGroupId`; runners-up preserved; no raw-score rewrite; ladder ID metadata only; caps deferred to V2.4 |
| CTV2.3-D9 | Claim-level Human Verify artifacts; statuses include `review-needed`; gated factual publish |
| CTV2.3-D10 | Production V1 default; Local/Preview `CAREER_TEST_VERSION=v2`; no public query override; no flag code in V2.3 |
| CTV2.3-D11 | Deterministic reason kinds: positive / caution / hard_exclusion / premium_info; templates; premium ≠ rank |
| CTV2.3-D12 | Behavioral fixtures first; includes premium locked/unlocked ranking equality |
| CTV2.3-D13 | Future root `lib/career-test/v2/`; V1 frozen; no modules created in this phase |
| CTV2.3-D14 | Complete `dimensionProfile: Record<SoftDimensionKeyV2, DimensionLevelV2>`; missing keys fail; interest via `primaryFamily`; no `familyAffinityHints` |

---

## Document control

| Field | Value |
|-------|--------|
| Implements code? | **No** |
| Modifies V1? | **No** |
| Starts V2.4 scoring? | **No** |
| Next step after approval | Commit this doc when instructed; implement types/modules only in a later approved phase |
