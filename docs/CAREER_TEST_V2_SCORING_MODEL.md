# Career Test V2 — Scoring Model Specification (V2.4A)

**Document:** `docs/CAREER_TEST_V2_SCORING_MODEL.md`  
**Phase:** V2.4A — Scoring-model documentation only  
**Status:** Draft for review (no code, no final production weights, no thresholds invented)  
**Approved HEAD baseline:** `d5e13d9eb97e5941be4f94df25469cf8d19eb2a8`  

**V1:** Frozen — do not modify `lib/questions.ts`, `lib/career-data.ts`, `lib/recommend-careers.ts`, unlock, routes, or V1 UI.  
**Code:** Do not create `lib/career-test/v2/` in this phase. Do not implement scoring.  

---

## 1. Scope and boundaries

### In scope

- Locked scoring architecture and normalization contracts for Career Test V2  
- Exact component model (11 soft dimensions + 1 affinity vector)  
- Pure scoring / ranking / diversity / band / reason contracts  
- Fixture and validation plan for later implementation  
- CTV2.4-D1 … D20 decision register  

### Out of scope

- Implementing `lib/career-test/v2/**`  
- Assigning final production numeric weights or band thresholds  
- Modifying V1 or enabling V2 in production  
- Human Verify research  
- Amending older PRD text (supersession noted only here)  
- V2.4B typed contracts or later phases  

---

## 2. Source-of-truth hierarchy

| Priority | Document | Owns |
|----------|----------|------|
| 1 | `docs/PRD_CAREER_TEST_V2.md` | Product behavior and boundaries |
| 2 | `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md` | Exact 60-career inventory |
| 3 | `docs/CAREER_TEST_V2_QUESTION_FRAMEWORK.md` | Exact 26-question bank and option mappings |
| 4 | `docs/CAREER_TEST_V2_DATA_MODEL.md` | Schemas, IDs, hard-filter graded model, bands, diversity metadata |
| 5 | **This document** | V2.4 scoring decisions only; **supersedes** V2.3 SoftDimensionKey / career `fieldInterestAffinity` storage as stated in §5.0 |

Where older PRD wording conflicts with V2.3 data-model or this scoring contract on match display, **bands-only wins** (CTV2.4-D18). Do not modify the PRD in this phase.

---

## 3. Locked terminology

- Internal English may use `occupation family` and `familyAffinity`.  
- Chinese user-facing taxonomy must use **职业大类** / **职业领域**.  
- The forbidden Chinese mistranslation of “occupation family” must have **literal occurrence count 0** in this document.  
- Do not rename stable internal IDs solely for display wording.  
- Self-employment-friendly is a work-model classification — not income, ease, flexibility, or success promise.  

---

## 4. Answer signal normalization

### 4.1 Principles

- Option signals are typed and deterministic.  
- Option letters `a/b/c/d` do **not** automatically imply ordinal order.  
- Only genuinely ordered scales use discrete ordinal mappings.  
- Mapping tables live in `ScoringConfigV2` / normalization configuration — **not** UI code.  
- Question bank carries signals only; **weights stay in config**.  
- Ranking truth uses **integer fixed-point** units (§10). Editorial/discrete levels may be described as 0–1 conceptually, then converted at the scoring boundary. **0–100 is not** internal scoring truth.  

### 4.2 Dual-write for hard-filter activators (CTV2.4-D5)

| Answer | Hard filter | Soft write |
|--------|-------------|------------|
| `v2-c01(a)` | `rejectsNightOrRotating = true` | `shiftScheduleTolerance` soft level **0** |
| `v2-c02(a)` | `rejectsHeavyPhysical = true` | `physicalDemandTolerance` soft level **0** |

Hard filtering is evaluated **before** scoring. Excluded careers are **never scored**. Soft level 0 affects only remaining eligible careers.

### 4.3 English (CTV2.4-D15)

`v2-c03` writes `englishReadiness` only. English **never** hard-filters, never acts as a post-sort cap, and never acts as a hidden tie-breaker.

### 4.4 Discrete-to-0–1 mappings (CTV2.4-D6)

Config owns explicit maps such as:

| Pattern | Mapping rule (illustrative — final tables deferred) |
|---------|------------------------------------------------------|
| True ordinal 0–3 (`c03`, `p04`) | `{0,1,2,3} → {0, 1/3, 2/3, 1}` |
| Ordinal a–c + neutral d | Map a–c to discrete levels; **d = inactive / omitted** |
| Categorical (`c06`, interest a–c) | Category labels — never letter ordinals |
| Interest d | No family contribution |

Exact numeric map tables are calibrated later; architecture is locked.

### 4.5 Ambiguity handling (locked interpretation)

| Item | Locked interpretation |
|------|------------------------|
| Soft `(d)` neutrals | Inactive for that dimension |
| `p10(d)` | Flexible/conditional — **not** high evening/weekend tolerance |
| `c05(b)` | Single mid formal-entry level (compound copy scored as mid) |
| Interest same-family duplicates | Each selection counts once toward that family’s numerator |

---

## 5. Exact 11-soft-plus-1-affinity component model (CTV2.4-D1, D2, D3)

### 5.0 V2.3 supersession and migration (affinity / SoftDimensionKey)

**V2.4A supersedes** the V2.3 data-model statements that defined `SoftDimensionKeyV2` as **12** keys including `fieldInterestAffinity`, and that required `career.dimensionProfile` to include a career-level `fieldInterestAffinity`.

| Topic | V2.3 (superseded for implementation) | V2.4A (locked) |
|-------|--------------------------------------|----------------|
| `SoftDimensionKeyV2` | 12 keys incl. `fieldInterestAffinity` | **Exactly 11** non-affinity keys |
| `dimensionProfile` | Complete 12-key record | Complete **11-key** record |
| Affinity | Optional scalar on soft / career profile | User `familyAffinity` vector + **computed** scoring component |
| Code migration | N/A | **None yet** — V2 code has not been created |

Existing documentation references to career-level `dimensionProfile.fieldInterestAffinity` are **superseded**. Initial V2 implementation must migrate to this V2.4A contract when types are introduced (V2.4B+).

### 5.1 Locked types and counts

```ts
type SoftDimensionKeyV2 =
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

/** Exactly 12 top-level scoring components */
type ScoringComponentKeyV2 =
  | SoftDimensionKeyV2
  | "fieldInterestAffinity";
```

| Layer | Count | Notes |
|-------|------:|-------|
| Soft matching dimensions (`SoftDimensionKeyV2`) | **11** | Stored on careers and user soft profile |
| User affinity vector | **1** | `familyAffinity: Record<OccupationFamilyIdV2, number>` |
| Top-level scoring components (`ScoringComponentKeyV2`) | **12** | 11 soft + computed `fieldInterestAffinity` |

Do **not** describe this as “approximately 10–11.”

### 5.2 The 11 soft matching dimensions

| # | Key | Source questions | Role |
|---|-----|------------------|------|
| 1 | `workStyleFit` | p01, p02, p05, p06, p09 | Bundled work-style composite |
| 2 | `physicalDemandTolerance` | c02 soft (+ dual-write from c02(a)) | Soft physical |
| 3 | `indoorOutdoorPreference` | p03 | Environment |
| 4 | `customerFacingTolerance` | p04 | Public/customer contact |
| 5 | `englishReadiness` | c03 | Current workplace English |
| 6 | `trainingDurationTolerance` | c04 | Training investment |
| 7 | `formalEntryWillingness` | c05 | Credential / apprenticeship attitude |
| 8 | `shiftScheduleTolerance` | c01 soft + p10 (+ dual-write from c01(a)) | Soft schedule |
| 9 | `stabilityVersusUpside` | p07 | Stability vs upside trade-off |
| 10 | `detailVersusCoordination` | p08 | Detail/process vs coordination (**not** in workStyleFit) |
| 11 | `careerEntryPracticality` | c06 | **Separate** categorical entry-pace (CTV2.4-D2) |

### 5.3 Affinity relationships (no duplicate component)

```ts
familyAffinity: Record<OccupationFamilyIdV2, number>; // user vector only

familyFit =
  userProfile.familyAffinity[career.primaryFamily];

// Scoring component key "fieldInterestAffinity" uses familyFit as its fit value.
```

**Locked relationships:**

- `career.dimensionProfile` contains **exactly** the 11 `SoftDimensionKeyV2` keys.  
- Every one of the **60** careers must contain all 11 keys; missing keys fail validation.  
- `fieldInterestAffinity` is **not** stored in `career.dimensionProfile`.  
- `fieldInterestAffinity` is **not** an independent career-level value.  
- `fieldInterestAffinity` is a **computed scoring component** whose fit is `familyFit` above.  
- `primaryFamily` is the only initial-V2 lookup used for `familyFit`.  
- No affinity value may be represented twice.  
- No runtime `familyAffinityHints` field.  
- Cross-cutting tags remain reasons / editorial metadata only unless separately approved later.  

### 5.4 Career-profile completeness

A valid `CareerProfileV2` requires:

- `id`  
- title fields (`titleEn`, `titleZh`)  
- exactly one `primaryFamily`  
- a complete **11-key** `dimensionProfile: Record<SoftDimensionKeyV2, DimensionLevelV2>`  
- graded exposure fields (`nightRotatingExposure`, `heavyPhysicalExposure`)  
- similarity / diversity metadata where assigned (`similarityGroupId`, optional `careerLadderGroupId`)  
- other already-approved profile fields (description, verification hooks, premium display fields, etc.)  

Validation must **not** require a career-level `fieldInterestAffinity`.

### 5.5 Bundled `workStyleFit` sub-signals (CTV2.4-D3)

`workStyleFit` is **one** top-level scoring component with **one** global configured weight.

Approved internal sub-signals **only**:

| Sub-signal | Question | Axis |
|------------|----------|------|
| independent vs team | `v2-p01` | Solo ↔ team |
| hands-on vs desk/process | `v2-p02` | Hands-on ↔ desk |
| structured vs flexible judgment | `v2-p05` | Structured ↔ judgment |
| routine vs varied work | `v2-p06` | Routine ↔ variety |
| leadership responsibility | `v2-p09` | Leadership appetite |

**Deterministic combination (no final production sub-weights in V2.4A):**

1. For each active (non-neutral) sub-signal, compute `fit_sub` in fixed-point units.  
2. Combine active sub-signal fits with **equal internal treatment** (unless later calibrated otherwise).  
3. Neutral sub-signals are omitted inside the bundle.  
4. If **all five** are neutral, `workStyleFit` is **inactive** (omitted from the top-level active set).  
5. Resulting bundle fit is a single contribution under the one top-level `workStyleFit` weight.  

Internal sub-signal fits remain observable for debug and reasons.  
These five must **not** become five independent global weights.

**Anti-double-count rule:**

- `v2-p08` / `detailVersusCoordination` is a **separate** top-level dimension.  
- It is **not** part of `workStyleFit` and must not contribute to the workStyleFit bundle.  
- Leadership / coordination wording overlap must not cause `p08` or `p09` to be scored twice.  

### 5.6 `careerEntryPracticality` (CTV2.4-D2)

Remains **separate** from `trainingDurationTolerance`.  
Treat as categorical entry-pace (`learn-on-job` / `short-prep` / `study-first` / inactive).  
Fit is categorical match against career editorial category — not a duration ordinal.

---

## 6. familyAffinity exposure normalization (CTV2.4-D8)

### 6.1 Appearance opportunities (from question framework)

| OccupationFamilyIdV2 | Substantive appearance opportunities |
|----------------------|--------------------------------------:|
| `skilled-trades` | 3 |
| `building-operations-facilities` | 3 |
| `healthcare-support` | 3 |
| `transportation-logistics` | 3 |
| `office-administration` | 3 |
| `technology` | 3 |
| `manufacturing-production` | 2 |
| `sales-customer-service` | 2 |
| `education-community-services` | 2 |
| `hospitality-food-services` | 2 |
| `public-sector-institutional` | 2 |
| `self-employment-friendly` | 2 |
| **Total** | **30** |

### 6.2 Formula

For each `OccupationFamilyIdV2` family:

```
familyAffinity[family] =
  (count of effective positive selections mapping to family)
  / (total substantive appearance opportunities for family)
```

### 6.3 Rules

- Result is normalized to **0–1**.  
- Families with 2 appearances and families with 3 appearances are **comparable** (no raw count advantage).  
- Neutral interest `(d)` contributes **nothing**.  
- Each substantive option maps to **exactly one** family.  
- Configured affinity weight `w_affinity ≤ 0.20`.  
- Affinity is an **additive** component — never a multiplier or hard gate.  
- The 10 interest questions must not dominate the result (enforced by the cap + single component).  

### 6.4 Career-side familyFit (CTV2.4-D9)

```
familyFit(career) = userProfile.familyAffinity[career.primaryFamily]
```

This value is the fit input for the computed scoring component `fieldInterestAffinity`. It is **not** stored on the career profile.

- No runtime `familyAffinityHints`.  
- Cross-cutting tags may affect reasons or future light cues **only when separately approved**.  
- Exactly one `primaryFamily` per occupation.  

---

## 7. Neutral handling, activity, evidenceCoverage, and renormalization (CTV2.4-D4)

### 7.1 Component activity

**Normal non-affinity soft component**

- **Active** when the user supplied substantive, non-neutral evidence for that component.  
- **Inactive** when all evidence feeding that component is neutral / omitted.  

**`workStyleFit`**

- **Active** when at least one approved work-style sub-signal is substantive.  
- **Inactive** when all five work-style sub-signals are neutral.  

**`fieldInterestAffinity`**

- **Active** if the user selected at least one substantive, non-neutral answer among `v2-i01`…`v2-i10`.  
- **Inactive** only if every interest answer is neutral.  
- Once active, its configured weight remains in `activeConfiguredWeight` for **every** eligible career.  
- `familyFit` may legitimately be **0** for a career and still represents substantive mismatch evidence.  
- Do **not** deactivate affinity per career merely because `familyFit = 0`.  

This prevents neutral interest answers from penalizing every career while preserving genuine zero family matches.

### 7.2 Named coverage quantities

```
totalConfiguredWeight =
  sum of configured weights for all 12 top-level ScoringComponentKeyV2 components

activeConfiguredWeight =
  sum of configured weights for active top-level scoring components

evidenceCoverage =
  activeConfiguredWeight / totalConfiguredWeight
```

**Locked:**

- Range of `evidenceCoverage` is **0–1**.  
- `totalConfiguredWeight` must be **> 0** (else config validation fails — §7.4).  
- `evidenceCoverage` is **not** included in `rawScoreFixed`.  
- `evidenceCoverage` is **not** a tie-breaker.  
- Used **only** for match-band calibration and explanation / confidence copy.  
- Low evidence coverage **cannot** receive **高度匹配**.  
- Exact numeric coverage cutoffs remain deferred to fixture calibration.  
- `evidenceCoverage` never represents probability or scientific certainty.  

### 7.3 Neutral renormalization

For each **active** component `d`:

```
renormalizedWeight_d =
  configuredWeight_d / activeConfiguredWeight
```

**Locked:**

- Only active components participate.  
- Neutral / inactive components contribute **zero** and are omitted.  
- Neutral never silently becomes fit **0.5**.  
- Remaining active weights renormalize so their configured units sum to `activeConfiguredWeight` (equivalent to weights summing to 1.0 in unit-normalized form).  
- `fieldInterestAffinity` and `workStyleFit` follow the activity rules in §7.1.  

### 7.4 Zero-denominator guards

| Condition | Behavior |
|-----------|----------|
| `totalConfiguredWeight <= 0` | `ScoringConfigV2` **validation fails** |
| `activeConfiguredWeight <= 0` | Scoring returns deterministic **`no_scoring_evidence`** validation result |

- Must **not** divide by zero.  
- Must **not** silently assign midpoint scores.  
- For the approved complete 26-question bank this guard should normally be unreachable, but it remains **mandatory**.  

---

## 8. ScoringConfigV2 contract

```ts
/** Arithmetic precision scale — not a weight allocation decision */
const FIXED_POINT_SCALE = 10_000;

interface ScoringConfigV2 {
  schemaVersion: number;
  dataVersion: string;

  /**
   * Top-level weights as non-negative integer weight units.
   * Once calibrated, all 12 must sum to FIXED_POINT_SCALE.
   * Production allocations remain deferred — not invented in V2.4A.
   */
  weights: Record<ScoringComponentKeyV2, number>;

  /** Optional internal sub-weights for workStyleFit only; deferred */
  workStyleSubWeights?: {
    independentTeam: number;
    handsOnDesk: number;
    structureJudgment: number;
    routineVariety: number;
    leadership: number;
  };

  discreteMaps: Record<string, unknown>; // ordinal/category → fixed-point maps
  familyAppearanceOpportunities: Record<OccupationFamilyIdV2, number>;

  fixedPointScale: 10000; // must equal FIXED_POINT_SCALE

  /** Absolute band thresholds in fixed-point score units — calibrated later */
  matchBands: {
    highMin: number;      // → 高度匹配
    moderateMin: number;  // → 较为匹配
    // below moderateMin → 值得探索
  };

  /** Coverage gates for overconfident bands — calibrated later */
  bandEvidenceGates?: {
    highMinCoverage: number;
    moderateMinCoverage: number;
  };

  similarityCapPerGroupInTop5: 1;
}
```

**V2.4A does not assign final production numeric values** for `weights`, `matchBands`, or `bandEvidenceGates`.

**Initial V2:** no per-career dimension importance maps (CTV2.4-D20). All careers use global config weights. Career records store dimension **levels**, not weighting maps.

---

## 9. Additive scoring formula (CTV2.4-D7, D8)

### Architecture: Arch A (locked)

Pure functions. Score **eligible careers only**. No multiplicative family gate. No family-first shortlist.

For active components only, with `familyFit = userProfile.familyAffinity[career.primaryFamily]` as the fit for `fieldInterestAffinity`:

```
contributionFixed_d =
  roundHalfUp(configuredWeightUnits_d * fitFixed_d / activeConfiguredWeight)

rawScoreFixed = Σ contributionFixed_d   // canonical order in §10
```

Configured weight units for all 12 components sum to `FIXED_POINT_SCALE` once calibrated.  
`configuredWeightUnits.fieldInterestAffinity ≤ 0.20 * FIXED_POINT_SCALE`.

```ts
function scoreCareerV2(
  profile: UserProfileV2,
  career: CareerProfileV2,
  config: ScoringConfigV2,
): CareerScoreV2 | { ok: false; code: "no_scoring_evidence" };

interface CareerScoreV2 {
  careerId: string;
  rawScoreFixed: number;       // integer ranking truth
  evidenceCoverage: number;    // 0–1; not a tie-breaker; not in rawScore
  componentNotes?: string[];   // debug/fixtures only
}
```

UI performs **no** scoring.

---

## 10. Fixed-point score arithmetic (CTV2.4-D10)

### 10.1 Scale and boundary values

```
FIXED_POINT_SCALE = 10_000
```

This is an **arithmetic precision scale**, not a scoring weight decision.

- Configured weights: non-negative **integer** weight units; once calibrated, all 12 sum to `FIXED_POINT_SCALE`.  
- User levels, career levels, family affinity, and fit values cross the scoring boundary as integers in **`[0, FIXED_POINT_SCALE]`**.  
- Editorial / discrete source levels convert during normalization via explicit configuration.  
- Raw JavaScript floating-point values must **not** be retained as ranking truth.  
- Calculations must remain within JavaScript safe-integer limits, or use an explicit integer-safe implementation.  

### 10.2 Rounding (round-half-up for non-negative rationals)

```
roundHalfUp(numerator / denominator) =
  floor((2 * numerator + denominator) / (2 * denominator))
```

or an exactly equivalent tested integer implementation.

### 10.3 Per-component contribution and total

For each **active** top-level component in **canonical order**:

```
contributionFixed_d =
  roundHalfUp(
    configuredWeightUnits_d * fitFixed_d
    / activeConfiguredWeight
  )

rawScoreFixed =
  sum of contributionFixed_d
```

Each contribution is quantized **before** summation. `rawScoreFixed` is an **integer**.

### 10.4 Canonical summation order

1. `workStyleFit`  
2. `physicalDemandTolerance`  
3. `indoorOutdoorPreference`  
4. `customerFacingTolerance`  
5. `englishReadiness`  
6. `trainingDurationTolerance`  
7. `formalEntryWillingness`  
8. `shiftScheduleTolerance`  
9. `stabilityVersusUpside`  
10. `detailVersusCoordination`  
11. `careerEntryPracticality`  
12. `fieldInterestAffinity`  

Inactive components are skipped (contribute nothing) but do not reorder the remaining sequence.

### 10.5 Equality and ties

- Exact score equality means **`rawScoreFixed` integer equality**.  
- No epsilon tie rule.  
- No float equality.  
- No semantic tie preferences.  
- Exact ties use stable **`careerId` ascending** only.  
- Display rounding or match-band rendering never changes rank order.  

A fixture/assertion for **fixed-point boundary rounding** is required (§19).

---
## 11. Hard-filter pipeline (CTV2.4-D5, D12, D14, D15)

### Exact order

1. Validate all 26 answers → `ValidatedAnswersV2`  
2. Build normalized profile (`constraints`, `soft`, `familyAffinity`, `evidenceCoverage` inputs)  
3. Apply hard constraints (graded exposure)  
4. Score **eligible** careers only  
5. Sort by fixed-precision raw score descending  
6. Resolve exact ties by `careerId` ascending  
7. Apply Top-5 similarity diversity  
8. Generate reasons and match bands  

### Graded exposure (from data model; editorial model classifications — CTV2.4-D19)

| User constraint | Exclude career when | Soft caution when |
|-----------------|---------------------|-------------------|
| `rejectsNightOrRotating` | `nightRotatingExposure === "common-or-required"` | `possible` |
| `rejectsHeavyPhysical` | `heavyPhysicalExposure === "frequent-high"` | `moderate` |

Only activators: **`v2-c01(a)`** and **`v2-c02(a)`**.  
English never hard-filters.  
Hard constraints are never relaxed.  
Excluded careers never silently re-enter.

### Eligible count outcomes (CTV2.4-D14)

| Eligible | Behavior |
|----------|----------|
| ≥ 5 | Diversified Top 5 |
| 1–4 | Show all eligible + clear copy |
| 0 | `no_exact_match` |

Zero-result UX must provide: clear explanation, **edit answers**, **restart test**.  
No automatic near-match section in initial V2.

---

## 12. Ranking and exact tie behavior

1. Hard-filter eligible careers.  
2. Compute fixed-point raw scores.  
3. Sort descending by `rawScoreFixed`.  
4. Exact equal scores → `careerId` ascending only.  

Premium state never enters scoring or ranking.

---

## 13. Match-band contract (CTV2.4-D11, D18)

### Locked user-facing Chinese bands

| Internal | ZH |
|----------|-----|
| `high` | 高度匹配 |
| `moderate` | 较为匹配 |
| `explore` | 值得探索 |

### Rules

- Initial V2 uses **absolute configured thresholds** in `ScoringConfigV2`.  
- **No** match percentages.  
- **No** percentile-within-current-pool classification.  
- Thresholds are **not** stored on career records.  
- Thresholds calibrated later using fixtures.  
- `evidenceCoverage` gates prevent overconfident **高度匹配** (and optionally **较为匹配**) when evidence is thin.  
- Bands must never imply probability or scientific certainty.  

**Supersession (CTV2.4-D18):** Initial V2 match-percentage language in the older PRD is superseded by the V2.3 data-model and this V2.4 scoring contract. PRD file is not modified in this phase.

---

## 14. Similarity diversity pipeline (CTV2.4-D12)

### Rules

- Mechanism: `similarityGroupId`  
- Default maximum **1** career from the same `similarityGroupId` in displayed Top 5  
- Keep the **highest-ranked** career in each group  
- Displaced careers remain ordered **runners-up**  
- Never pull an ineligible career  
- Never rewrite `rawScore` or original rank  
- `careerLadderGroupId` remains **metadata only** in initial V2  
- No separate occupation-family cap  

### Stable similarityGroupId assignments

Connected clusters from occupation framework §9.1 use **one** stable group (not overlapping pair-only groups).

| similarityGroupId | Member career IDs |
|-------------------|-------------------|
| `sim-building-systems-maintenance` | `v2-building-operator`, `v2-hospital-facilities-technician`, `v2-property-maintenance-worker` |
| `sim-custodial-context` | `v2-commercial-custodian`, `v2-school-custodian` |
| `sim-community-settlement` | `v2-community-support-worker`, `v2-settlement-worker` |
| `sim-admin-vs-facilities-coord` | `v2-administrative-assistant`, `v2-facilities-coordinator` |
| `sim-kitchen-leadership` | `v2-commercial-cook`, `v2-food-service-supervisor` |
| `sim-warehouse-ladder` | `v2-warehouse-associate`, `v2-warehouse-supervisor` |
| `sim-software-vs-support` | `v2-software-developer`, `v2-it-support-specialist` |
| `sim-clinic-admin-vs-lab` | `v2-medical-office-assistant`, `v2-medical-laboratory-assistant` |

Careers not listed have no similarity group (or unique singleton — either is fine; singleton does not constrain Top 5).

Ladder-adjacent titles (e.g. kitchen helper, production supervisor) may carry `careerLadderGroupId` metadata only — **no** second ladder cap in initial V2.

---

## 15. Reasons and explainability (CTV2.4-D13)

### Kinds

| Kind | Purpose |
|------|---------|
| Positive match | Strong fit / family match |
| Caution | Material soft constraint caution (`possible` / `moderate`, soft mismatches) |
| Hard exclusion | Exclusion explanations (not normal Top 5) |
| Premium informational | Display-only depth; **never** affects rank |

### Free results

- Maximum **3** reasons per career.  

**Selection priority:**

1. Material constraint caution, when applicable  
2. Strongest positive match  
3. Secondary positive or useful soft mismatch  

Reason codes are stable and template-driven (`reason.*`).  
ZH/EN strings are presentation only.  
No LLM-generated scoring truth.  
No unverified factual licence, salary, outlook, NOC, or immigration claims in reasons.

### Initial registry categories (not implemented here)

`family.*` · `workstyle.*` · `constraint.caution.*` · `constraint.exclude.*` · `english.*` · `training.*` · `schedule.*` · `physical.*` · `premium.info.*`

---

## 16. Free versus premium ranking equality

Locked and unlocked users receive **identical**:

- hard filtering  
- raw scoring  
- ranking  
- diversity handling  
- displayed Top 5 career IDs  

Premium unlock affects **display depth only**.  
Premium status never enters normalization, scoring, ranking, reason *selection for rank*, or diversity.

---

## 17. Human Verify boundaries (CTV2.4-D19)

### Scoring may use (editorial model inputs)

- Working titles, `primaryFamily`, cross-cutting tags  
- Soft `dimensionProfile` levels  
- Graded night/rotating and heavy-physical **exposure classifications** for matching/HF  
- Similarity / ladder group IDs  
- Non-factual reason templates  

Graded exposures are **editorial model classifications**, not factual public claims, until Human Verify upgrades specific claims.

### Scoring must not depend on unverified

- Wages / salary  
- Employment outlook  
- Immigration / PR relevance  
- Official NOC mapping  
- Factual licence / regulation / certification / apprenticeship claims  
- Factual training duration claims  
- Factual shift-pattern claims presented as verified fact  

---

## 18. Version / feature-flag compatibility (CTV2.4-D16)

| Rule | Contract |
|------|----------|
| Production default | **V1** |
| Local / Vercel Preview | May set `CAREER_TEST_VERSION=v2` |
| Public route | `/career-test` unchanged |
| Public query override | **Forbidden** |
| Public cookie override | **Forbidden** |
| Flag off | Immediate V1 |
| Unlock / restart / URLs / metadata / Related Tools | Preserved |

**Do not implement the feature flag in this documentation phase.**

---

## 19. Fixture and validation plan (CTV2.4-D17)

Behavioral and relative-order-first. **No golden final numeric scores** until weights and thresholds are calibrated.

| # | Fixture | Behavioral assertions |
|---|---------|------------------------|
| 1 | Hands-on trades | Trades-leaning Top ranks; desk-heavy down-ranked |
| 2 | Daytime office/detail | Office/detail lean; night-heavy roles down if soft-mismatched |
| 3 | Facilities/stability | Building-ops + stability lean |
| 4 | Customer-facing sales | Sales/CF lean |
| 5 | Healthcare support | Healthcare family lean |
| 6 | Logistics/shift-tolerant | Logistics lean; night HF not incorrectly firing |
| 7 | Rejects nights | No `common-or-required` night careers eligible |
| 8 | Rejects heavy physical | No `frequent-high` physical careers eligible |
| 9 | Rejects both | Intersection excluded |
| 10 | Low English | Eligible; soft effect only; never HF |
| 11 | High coordination/leadership | Coordination/supervisor lean via workStyle/detail |
| 12 | Self-employment work-model interest | SE-primary / approved SE signals lean; no success promise |
| 13 | Neutral-heavy | Deterministic; low `evidenceCoverage`; no automatic 高度匹配 |
| 14 | Fewer than 5 eligible | `partial`; show all eligible |
| 15 | Zero eligible | `no_exact_match`; edit/restart affordances |
| 16 | Deterministic tie | Equal `rawScoreFixed` → `careerId` ascending; stable across runs |
| 17 | Near-duplicate diversity | ≤1 per `similarityGroupId` in Top 5; runners-up preserve displaced |
| 18 | Premium locked/unlocked | Identical eligibility, scores, order, Top 5 IDs |
| 19 | Affinity non-dominance | Even strong interest lean cannot exceed configured ≤20% influence; soft dims can outrank |
| 20 | All 60 complete profiles | Every career has all **11** `SoftDimensionKeyV2` keys; **no** `fieldInterestAffinity` in `dimensionProfile` |
| 21 | Answer validation failures | Unknown question/option, incomplete set rejected before scoring |
| 22 | Family exposure 2 vs 3 | Selecting all opportunities for a 2-appearance family and for a 3-appearance family both can reach 1.0; raw count advantage absent |
| 23 | Low evidence coverage band | High renormalized score + low coverage must not auto-award 高度匹配 |
| 24 | Fixed-point boundary rounding | Assert `roundHalfUp` boundary cases and contribution quantization before sum |

**Named fixtures 1–23** remain the minimum behavioral suite; **#24** is the required fixed-point rounding assertion.

---

## 20. Acceptance criteria

**Core (retained / updated):**

1. Exactly **11** soft matching dimensions plus **1** computed Field / Interest Affinity scoring component (`ScoringComponentKeyV2` = 12).  
2. `SoftDimensionKeyV2` has exactly **11** keys (no `fieldInterestAffinity`).  
3. Every career has a complete **11-key** `dimensionProfile`; missing keys fail validation.  
4. No `CareerProfileV2` stores `fieldInterestAffinity` inside `dimensionProfile`.  
5. `workStyleFit` sub-signals are **not** independent global weights; `p08` is not inside the bundle.  
6. Every `familyAffinity[family]` is normalized by that family’s appearance opportunities.  
7. Neutral interest options do **not** contribute to family affinity.  
8. Configured affinity weight is **≤ 0.20** of `FIXED_POINT_SCALE`.  
9. `familyFit` equals `familyAffinity[primaryFamily]`; affinity is not counted twice.  
10. Interest affinity is inactive only when all interest answers are neutral.  
11. Neutral soft dimensions are omitted; `renormalizedWeight_d = configuredWeight_d / activeConfiguredWeight`.  
12. Neutral never silently becomes fit **0.5**.  
13. `evidenceCoverage = activeConfiguredWeight / totalConfiguredWeight`; excluded from rawScore and ties.  
14. `totalConfiguredWeight <= 0` fails config validation.  
15. `activeConfiguredWeight <= 0` produces `no_scoring_evidence`.  
16. `FIXED_POINT_SCALE` is exactly **10_000**; each contribution quantized before sum; `rawScoreFixed` integer equality defines ties.  
17. Exact ties use `careerId` ascending only.  
18. Exactly two hard-filter activators: `v2-c01(a)` and `v2-c02(a)`.  
19. English never hard-filters.  
20. Initial V2 has **no** match percentage.  
21. Diversity does not modify raw scores; similarity cap is **1** per group in Top 5.  
22. Premium locked and unlocked rankings are identical.  
23. Production weights and match-band thresholds remain deferred (not invented here).  
24. V1 is unchanged; no scoring code / `lib/career-test/v2/` created in this phase.  
25. Forbidden Chinese mistranslation literal count is **0**.  
26. All 60 careers contain exactly all 11 `SoftDimensionKeyV2` keys and none contain `fieldInterestAffinity` in `dimensionProfile`.  

---

## 21. Deferred numeric calibration decisions

| Topic | Deferred until |
|-------|----------------|
| Final top-level weight vector (with `w_affinity ≤ 0.20`) | Fixture calibration / later approved decision |
| Final `workStyleFit` internal sub-weights (if not equal) | Fixture calibration |
| Exact discrete→0–1 tables | Normalization config pass |
| Absolute match-band thresholds | Fixture calibration |
| `bandEvidenceGates` coverage thresholds | Fixture calibration |
| Optional approved tag→reason light cues | Separate approval |
| Feature-flag wiring | V2.4H / V2.6 as sequenced later |
| Implementation of `lib/career-test/v2` | V2.4B+ |

---

## 22. Approved decision register (CTV2.4-D1 … D20)

| ID | Summary |
|----|---------|
| CTV2.4-D1 | Exactly 11 SoftDimensionKeyV2 + computed fieldInterestAffinity = 12 ScoringComponentKeyV2; supersedes V2.3 12-key SoftDimensionKey |
| CTV2.4-D2 | Keep `careerEntryPracticality` separate (categorical entry-pace) |
| CTV2.4-D3 | Bundled `workStyleFit` under one top-level weight; equal internal treatment; p08 not in bundle |
| CTV2.4-D4 | Activity rules; evidenceCoverage named formula; renorm; no_scoring_evidence / config fail guards |
| CTV2.4-D5 | `c01(a)`/`c02(a)` dual-write HF + soft level 0; HF first; excluded never scored |
| CTV2.4-D6 | Explicit discrete→fixed-point maps; no letter ordinal inference; not 0–100 truth |
| CTV2.4-D7 | Additive Arch A; weight units sum to FIXED_POINT_SCALE once calibrated; no multiply gate; no family shortlist |
| CTV2.4-D8 | Affinity capped additive `≤0.20`; exposure-normalized by appearance opportunities |
| CTV2.4-D9 | `familyFit = familyAffinity[primaryFamily]`; not stored on career; no `familyAffinityHints` |
| CTV2.4-D10 | FIXED_POINT_SCALE=10000; roundHalfUp; quantize before sum; ties = rawScoreFixed int equality → careerId |
| CTV2.4-D11 | Absolute band thresholds; ZH 高度匹配/较为匹配/值得探索; no %; coverage-aware |
| CTV2.4-D12 | Diversity after rank; cap 1 per `similarityGroupId`; stable group IDs assigned; ladder metadata only |
| CTV2.4-D13 | Max 3 free reasons; caution → strongest positive → secondary; templates; no LLM truth |
| CTV2.4-D14 | ≥5 / 1–4 / 0 outcomes; zero-result edit+restart; no near-match section |
| CTV2.4-D15 | English soft-score only; never HF/cap/tie |
| CTV2.4-D16 | Prod V1; Preview/Local `CAREER_TEST_VERSION=v2`; no public query/cookie; no flag code now |
| CTV2.4-D17 | Behavioral fixtures listed; no golden finals yet |
| CTV2.4-D18 | PRD match-% language superseded; PRD file untouched |
| CTV2.4-D19 | Graded exposures editorial for matching/HF; factual claims HV-gated |
| CTV2.4-D20 | No per-career dimension importance weights in initial V2 |

---

## Document control

| Field | Value |
|-------|--------|
| Implements code? | **No** |
| Modifies V1? | **No** |
| Assigns final production weights/thresholds? | **No** |
| Creates `lib/career-test/v2/`? | **No** |
| Next step after approval | Commit this doc when instructed; then V2.4B typed contracts only if approved |
