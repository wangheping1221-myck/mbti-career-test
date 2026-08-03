# Career Test V2 — Career Profile Authoring Rubric (V2.4D)

**Document:** `docs/CAREER_TEST_V2_CAREER_PROFILE_AUTHORING_RUBRIC.md`  
**Phase:** V2.4D — documentation seal only (no `careers.ts` payload in this phase)  
**Baseline HEAD:** `bc03ba38187ad85c2f72cb75c16b86a2867ff99a`  
**Sealed contracts:** `lib/career-test/v2/profiles.ts`, `dimensions.ts`, `constraints.ts`, `verification.ts`, `ids.ts`  
**Occupation SoT:** `docs/CAREER_TEST_V2_OCCUPATION_FRAMEWORK.md`  
**Scoring SoT (affinity / similarity):** `docs/CAREER_TEST_V2_SCORING_MODEL.md`

**This rubric does not contain verified wage, outlook, NOC, immigration, licence, or regulatory facts.** Editorial fixed-point values describe framework-grounded career characteristics for later soft matching. They are **not** published labour-market claims.

---

## 1. Purpose and scope

### In scope

- Authoring rules for the future canonical file `lib/career-test/v2/careers.ts` (Approach A)
- Exact numeric grid, directionality, anchors, entry-pace, constraint grades, tags, and pilot gate
- Calibration examples labeled non-authoritative

### Out of scope

- Authoring any `CareerProfileV2` production records in this documentation phase
- Hard-filter evaluation, scoring weights, ranking, diversity runtime, fixtures, feature flags, UI
- V1 modification or copying V1 numeric levels
- Web research that invents wages, outlook, NOC, immigration/PR, or licence facts

### Evidence boundary (Correction 1)

Career-side editorial values describe **the typical working pattern expressed or reasonably distinguished by the locked occupation framework.**

They must **not** be presented as verified Canadian labour-market facts.

**Allowed evidence in V2.4D**

- Locked occupation framework titles (EN/ZH working titles)
- Family assignment
- Framework descriptions and distinctions
- Locked similarity groups (`SIMILARITY_GROUP_IDS_V2` membership from the scoring model)
- Locked framework tags and notes
- Sealed V2 contracts (`CareerProfileV2`, enums, IDs)

**Not allowed as evidence**

- Invented wages
- Outlook
- NOC
- Immigration or PR information
- Licence or regulatory claims not stated in the framework
- Assumptions based only on general knowledge of a job title
- V1 numeric levels
- Answer-option letters or question-bank substantive-option-count mappings

---

## 2. Locked V2.4D decisions (D1–D8)

| ID | Decision |
|----|----------|
| **CTV2.4D-D1** | Closed five-level editorial fixed-point grid for career-side **numeric** profile values: `0`, `2500`, `5000`, `7500`, `10000`. No arbitrary intermediate integers. Do not copy V1 1–5. Do not derive from answer-option letters. User answer normalization remains separate in `normalize.ts`. Values remain valid `DimensionLevelV2` integers in `0..FIXED_POINT_SCALE`. `careerEntryPracticality` is **categorical** and not part of this numeric grid. |
| **CTV2.4D-D2** | Omit top-level `entryPathZh` and `nextStepsZh` during initial V2.4D. |
| **CTV2.4D-D3** | Use `verification: { status: "editorial-only" }` initially. Literal `"editorial-only"` is valid in sealed `VerificationStatusV2`. |
| **CTV2.4D-D4** | Omit `careerLadderGroupId` during initial V2.4D. |
| **CTV2.4D-D5** | `crossCuttingTags` remains `readonly string[]`. Prefer vocabulary already in the locked framework. Empty array allowed. No new closed tag taxonomy in V2.4D. **Pilot restriction:** see Correction 4 / §12. |
| **CTV2.4D-D6** | Follow sealed 11-key `CareerDimensionProfileV2`. Historical 12-key data-model wording is superseded. |
| **CTV2.4D-D7** | Use sealed `CareerProfileV2` field names, not historical PRD shorthand. |
| **CTV2.4D-D8** | Approach A: single SoT file `lib/career-test/v2/careers.ts` (when authoring begins). |

---

## 3. Exact 14 numeric axes

Sealed names. All must use the D1 grid only.

### `workStyleFit` sub-keys (5)

1. `independentTeam`  
2. `handsOnDesk`  
3. `structureJudgment`  
4. `routineVariety`  
5. `leadershipResponsibility`  

### Scalar numeric dimensions (9)

6. `physicalDemandTolerance`  
7. `indoorOutdoorPreference`  
8. `customerFacingTolerance`  
9. `englishReadiness`  
10. `trainingDurationTolerance`  
11. `formalEntryWillingness`  
12. `shiftScheduleTolerance`  
13. `stabilityVersusUpside`  
14. `detailVersusCoordination`  

**Not a numeric grid axis:** `careerEntryPracticality` (`EntryPaceCategoryV2`: `learn-on-job` \| `short-prep` \| `study-first`), still required on `dimensionProfile`.

**Not stored on careers:** `fieldInterestAffinity`, `familyAffinityHints`.

---

## 4. Directionality (every numeric axis)

Higher value means the statement below. Kind codes: **(1)** career demand / minimum tolerance · **(2)** work-environment characteristic · **(3)** worker-preference alignment position · **(4)** work-style characteristic.

| Axis | Kind | Higher value means |
|------|------|-------------------|
| `independentTeam` | (4) | Work is done more independently / with less continuous team coordination |
| `handsOnDesk` | (4) | Work is more physical/tools/materials vs desk/screen/document |
| `structureJudgment` | (4) | Role relies more on personal judgment vs fixed procedures |
| `routineVariety` | (4) | Day-to-day tasks vary more / less repetitive |
| `leadershipResponsibility` | (4) | Role more often directs others, assigns work, or owns supervisory outcomes |
| `physicalDemandTolerance` | (1) | Job requires more frequent/sustained heavy physical effort (user must tolerate more) |
| `indoorOutdoorPreference` | (2)/(3) | Work setting is more outdoor / weather-exposed vs indoor-controlled |
| `customerFacingTolerance` | (1) | Job requires more frequent public/client/patient/guest-facing interaction |
| `englishReadiness` | (1) | Job requires stronger workplace English to perform the role as framed |
| `trainingDurationTolerance` | (1) | Typical path needs longer training investment before competent practice |
| `formalEntryWillingness` | (1) | Entry more often needs formal credentials/exams/registration (not just elapsed time) |
| `shiftScheduleTolerance` | (1) | Role more often involves nights, rotating shifts, or irregular hours |
| `stabilityVersusUpside` | (2) career-characteristic | Pay/path pattern leans more variable/upside vs stable predictable — **framework evidence only** (Correction 2) |
| `detailVersusCoordination` | (4) | Role emphasizes coordination/planning across people/tasks more than fine solitary detail |

---

## 5. Operational anchors (0 / 2500 / 5000 / 7500 / 10000)

Score **the typical working pattern expressed or reasonably distinguished by the locked occupation framework** — not the rarest extreme, not an ideal employer, and not unverified market averages.

### `independentTeam`

| Value | Meaning |
|------:|---------|
| 0 | Continuous crew/team; rarely works alone |
| 2500 | Mostly team; short solo stretches |
| 5000 | Mixed solo and team; neither dominates |
| 7500 | Mostly independent; occasional collaboration |
| 10000 | Predominantly solo end-to-end ownership |

### `handsOnDesk`

| Value | Meaning |
|------:|---------|
| 0 | Almost entirely desk/screen/admin paperwork |
| 2500 | Desk-primary; light tools/equipment rare |
| 5000 | Roughly balanced hands-on and desk |
| 7500 | Hands-on/tools/materials majority |
| 10000 | Almost continuous physical/tool/material work |

### `structureJudgment`

| Value | Meaning |
|------:|---------|
| 0 | Strict SOPs/checklists; little discretion |
| 2500 | Procedures dominate; limited judgment |
| 5000 | Balanced procedure + judgment |
| 7500 | Frequent problem-solving within standards |
| 10000 | High discretionary diagnosis/design within role |

### `routineVariety`

| Value | Meaning |
|------:|---------|
| 0 | Highly repetitive same tasks/day |
| 2500 | Mostly routine; occasional new tasks |
| 5000 | Mix of recurring and changing work |
| 7500 | Frequent task/context switching |
| 10000 | Highly variable day-to-day content/setting |

### `leadershipResponsibility`

| Value | Meaning |
|------:|---------|
| 0 | No directing of others’ work |
| 2500 | Informal mentoring / lead-by-example only |
| 5000 | Occasional lead on shifts/projects |
| 7500 | Regular lead/supervisor duties |
| 10000 | Core job is supervising or managing others |

### `physicalDemandTolerance`

| Value | Meaning |
|------:|---------|
| 0 | Sedentary / light only (sit; light lift rare) |
| 2500 | Standing/walking common; heavy lift uncommon |
| 5000 | Regular moderate lifting/bending/carrying |
| 7500 | Frequent heavy effort or sustained strain |
| 10000 | Continuous high-intensity physical demand |

### `indoorOutdoorPreference`

| Value | Meaning |
|------:|---------|
| 0 | Almost always indoor controlled environment |
| 2500 | Indoor primary; brief outdoor |
| 5000 | Split indoor/outdoor or vehicles/sites |
| 7500 | Outdoor/site majority of hours |
| 10000 | Predominantly outdoor / weather-exposed |

### `customerFacingTolerance`

| Value | Meaning |
|------:|---------|
| 0 | Little/no public or client contact |
| 2500 | Occasional brief customer/patient contact |
| 5000 | Regular but not all-day facing |
| 7500 | Majority of day facing customers/patients/guests |
| 10000 | Continuous front-line public/guest/patient service |

### `englishReadiness`

| Value | Meaning |
|------:|---------|
| 0 | Minimal verbal English; highly visual/routine cues |
| 2500 | Basic workplace English for simple instructions |
| 5000 | Clear spoken/written English for normal coordination |
| 7500 | Frequent precise English (safety, clients, documents) |
| 10000 | Advanced English central to performance as framed |

Editorial soft demand only — not a CLB score and not a hard filter.

### `trainingDurationTolerance`

| Value | Meaning |
|------:|---------|
| 0 | Productive after short employer onboarding (days–few weeks) |
| 2500 | Short course or weeks of structured prep typical |
| 5000 | Months of training/practice before independent work |
| 7500 | Long program or multi-year path common before full practice |
| 10000 | Extended multi-year formation expected before independent practice |

Apply only from **explicit framework path descriptions** where possible (Correction 3). Do not invent exact durations from the title alone.

### `formalEntryWillingness` (Correction 3)

| Value | Meaning |
|------:|---------|
| 0 | No formal credential expected to start (framework-stated employer path) |
| 2500 | Preferred certificate/ticket; framework allows hire without |
| 5000 | Common formal prep (certificate, exam, or registered apprenticeship start) when framework states it |
| 7500 | Formal credential/registration typically required when framework states it |
| 10000 | Heavily regulated mandatory licence/registration/exam path **only when framework explicitly supports that framing** |

**Do not** infer regulated status, mandatory licence, mandatory registration, exact training duration, or exact apprenticeship requirement **solely from the occupation title.**

### `shiftScheduleTolerance`

| Value | Meaning |
|------:|---------|
| 0 | Standard daytime weekday pattern dominates |
| 2500 | Occasional evenings/weekends; nights rare |
| 5000 | Regular evenings/weekends or some rotation |
| 7500 | Nights or rotating shifts common |
| 10000 | Nights/rotating/irregular hours typical or required |

### `stabilityVersusUpside` (Correction 2)

**Career-characteristic axis only.** Do **not** author from invented wage, salary, outlook, or advancement facts. Do **not** infer solely from the occupation title.

Use **explicit framework evidence only**, such as a locked description or tag that clearly indicates:

- predictable/stable structure  
- commission orientation  
- self-employment orientation  
- contract/project variability  
- variable-upside orientation  

| Value | Meaning (framework-grounded) |
|------:|------------------------------|
| 0 | Framework clearly frames highly stable / predictable structure |
| 2500 | Mostly stable framing; limited variable upside indicated |
| 5000 | **Default when no explicit differentiating evidence** (see Correction 2) |
| 7500 | Framework clearly indicates material commission / variable / contract upside |
| 10000 | Framework clearly indicates strongly upside/variable orientation (e.g. self-employment / commission-primary framing) |

If the framework contains **no** explicit differentiating evidence → use **5000** and retain `verification: { status: "editorial-only" }`.

### `detailVersusCoordination`

| Value | Meaning |
|------:|---------|
| 0 | Fine solitary detail/accuracy is the core craft |
| 2500 | Detail-primary; light coordination |
| 5000 | Balanced detail and coordination |
| 7500 | Coordination/scheduling/people-flow primary |
| 10000 | Role is chiefly orchestrating others/workflows |

---

## 6. Boundary and tie rules

| Rule | Guidance |
|------|----------|
| **0 vs 2500** | Use **0** only when the low pole is the clear majority pattern in framework framing; **2500** if the low pole dominates but the opposite appears regularly in that framing |
| **5000 vs 2500/7500** | Use **5000** when neither pole clearly dominates, evidence is mixed across common settings of the same title, **or** (for `stabilityVersusUpside`) no explicit framework differentiating evidence |
| **When 10000** | Only if the high pole is the **typical** pattern in the framework framing — not a rare site or senior specialty |
| **Mixed occupations** | Score the modal pattern expressed by the framework row; use **5000** when truly split |
| **Required fields** | Career-side numeric profile fields are required; no null/omission unless a sealed optional top-level field (e.g. `similarityGroupId`) |

---

## 7. Insufficient-evidence handling

1. Still assign a required D1 grid value (or categorical entry-pace from framework path language).  
2. Prefer **5000** for numeric axes when evidence is thin or conflicting — especially `stabilityVersusUpside` and `formalEntryWillingness` when title-only inference would be required.  
3. Choose `careerEntryPracticality` **only** from the framework’s stated path language (Correction 3); if path language is absent, prefer `learn-on-job` only when the framework clearly frames employer onboarding; otherwise stop and escalate rather than inventing a diploma/licence story.  
4. Keep `verification: { status: "editorial-only" }`.  
5. Do **not** invent supporting factual claims (wages, outlook, NOC, immigration, licences).  
6. Allowed evidence remains the Correction 1 allowlist only.

---

## 8. Entry-pace category rules

| Category | Author when framework framing indicates… |
|----------|------------------------------------------|
| **`learn-on-job`** | Employer onboarding / buddy training is the normal path; formal school not typical to start |
| **`short-prep`** | Short course, ticket, certificate, or brief prep is the common entry bridge |
| **`study-first`** | Substantial program, apprenticeship body of study, or multi-year formal education normally precedes independent practice |

**Mapping notes (no new categories; Correction 3):**

| Framework-stated situation | Default map |
|----------------------------|-------------|
| Pure employer training | `learn-on-job` |
| Short cert / ticket-style prep | usually `short-prep` |
| Explicit apprenticeship / trade study path | usually `study-first` |
| Explicit diploma / regulated study path | `study-first` |
| Title alone without path language | Do **not** invent; use insufficient-evidence handling |

`careerEntryPracticality` ≠ `trainingDurationTolerance` ≠ `formalEntryWillingness`.

---

## 9. Constraint-grade rules

Career-side exposure grades only. **Do not implement exclusion or scoring in V2.4D.**

### `NightRotatingExposureV2`

| Grade | Editorial anchor (framework-grounded) |
|-------|----------------------------------------|
| `not-typical` | Nights/rotating uncommon for this title as framed |
| `possible` | Some sites/shifts use nights/rotation; not the default everywhere |
| `common-or-required` | Nights or rotating shifts are common or effectively required in typical framed settings |

### `HeavyPhysicalExposureV2`

| Grade | Editorial anchor (framework-grounded) |
|-------|----------------------------------------|
| `low` | Heavy lifting/sustained strain uncommon |
| `moderate` | Regular moderate physical load |
| `frequent-high` | Frequent heavy or sustained high-intensity physical demand |

Align loosely with soft dims when framework evidence agrees; **do not force equality**. Later hard-exclude (V2.4F) uses `common-or-required` / `frequent-high` only.

Both constraint fields are **required** (no omit/null).

---

## 10. Anti-mirroring and double-counting rules

| Confused pair | Separation rule |
|---------------|-----------------|
| `physicalDemandTolerance` vs `handsOnDesk` | Physical = **strain/effort**; handsOnDesk = **tool/material vs screen** |
| `trainingDurationTolerance` vs `formalEntryWillingness` | Duration = **how long**; formal = **credential/exam/registration intensity** |
| `independentTeam` vs `leadershipResponsibility` | Solo ≠ supervisor |
| `routineVariety` vs `structureJudgment` | Variety = **task change**; structure = **discretion vs SOP** |
| `customerFacingTolerance` vs `englishReadiness` | Facing = **contact volume**; English = **language demand** |
| `stabilityVersusUpside` vs `careerEntryPracticality` | Stability = **path/comp structure characteristic**; entry pace = **how you get in** |
| `detailVersusCoordination` vs other workStyle | Detail↔coordination is **task emphasis**; do not mirror `independentTeam` or `leadershipResponsibility` |

**Double-counting ban:** Each axis answers a different observable question. If two axes would always equal for convenience, re-read anchors and split using framework distinctions.

---

## 11. Illustrative calibration sample

> **Illustrative calibration only — not authoritative career data**  
> Examples apply the rubric for editor alignment. They are **not** sealed `CAREERS_V2` rows and must not be copied into production without pilot review.

### 11.1 `v2-electrician` — `skilled-trades`

| Field | Value |
|-------|------:|
| independentTeam | 7500 |
| handsOnDesk | 10000 |
| structureJudgment | 7500 |
| routineVariety | 5000 |
| leadershipResponsibility | 2500 |
| physicalDemandTolerance | 5000 |
| indoorOutdoorPreference | 5000 |
| customerFacingTolerance | 2500 |
| englishReadiness | 5000 |
| trainingDurationTolerance | 10000 |
| formalEntryWillingness | 10000 |
| shiftScheduleTolerance | 2500 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 2500 |
| careerEntryPracticality | `study-first` |
| nightRotatingExposure | `possible` |
| heavyPhysicalExposure | `moderate` |

Framework basis: installs/maintains electrical systems; trade path language and HV note on provincial trade rules; hands-on; not primarily supervisory or guest-facing. `stabilityVersusUpside` = 5000 (no explicit commission/SE/variable-upside tag in inventory row). `formalEntryWillingness` / entry pace follow framework trade-path framing, not invented licence text.

### 11.2 `v2-building-operator` — `building-operations-facilities`

| Field | Value |
|-------|------:|
| independentTeam | 7500 |
| handsOnDesk | 7500 |
| structureJudgment | 5000 |
| routineVariety | 5000 |
| leadershipResponsibility | 2500 |
| physicalDemandTolerance | 5000 |
| indoorOutdoorPreference | 2500 |
| customerFacingTolerance | 2500 |
| englishReadiness | 5000 |
| trainingDurationTolerance | 7500 |
| formalEntryWillingness | 5000 |
| shiftScheduleTolerance | 5000 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 5000 |
| careerEntryPracticality | `short-prep` |
| nightRotatingExposure | `possible` |
| heavyPhysicalExposure | `moderate` |

Framework basis: monitors/operates building mechanical systems; systems ops ≠ unit repair handyman. Neutral formal/stability where row does not lock licence/commission language.

### 11.3 `v2-psw` — `healthcare-support`

| Field | Value |
|-------|------:|
| independentTeam | 5000 |
| handsOnDesk | 7500 |
| structureJudgment | 5000 |
| routineVariety | 5000 |
| leadershipResponsibility | 0 |
| physicalDemandTolerance | 7500 |
| indoorOutdoorPreference | 0 |
| customerFacingTolerance | 10000 |
| englishReadiness | 7500 |
| trainingDurationTolerance | 5000 |
| formalEntryWillingness | 5000 |
| shiftScheduleTolerance | 7500 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 5000 |
| careerEntryPracticality | `short-prep` |
| nightRotatingExposure | `common-or-required` |
| heavyPhysicalExposure | `frequent-high` |

Framework basis: personal care / daily living support in home or facility; personal care ≠ clinic admin or lab. Provincial naming HV noted — do not invent regulated-status copy. Formal entry stays mid-grid without inventing mandatory licence claims.

### 11.4 `v2-administrative-assistant` — `office-administration`

| Field | Value |
|-------|------:|
| independentTeam | 5000 |
| handsOnDesk | 0 |
| structureJudgment | 5000 |
| routineVariety | 5000 |
| leadershipResponsibility | 2500 |
| physicalDemandTolerance | 0 |
| indoorOutdoorPreference | 0 |
| customerFacingTolerance | 5000 |
| englishReadiness | 7500 |
| trainingDurationTolerance | 2500 |
| formalEntryWillingness | 2500 |
| shiftScheduleTolerance | 0 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 7500 |
| careerEntryPracticality | `learn-on-job` |
| nightRotatingExposure | `not-typical` |
| heavyPhysicalExposure | `low` |

Framework basis: broad office support (scheduling, documents, coordination); general office ≠ facilities-domain coordinator.

### 11.5 `v2-software-developer` — `technology`

| Field | Value |
|-------|------:|
| independentTeam | 7500 |
| handsOnDesk | 0 |
| structureJudgment | 7500 |
| routineVariety | 5000 |
| leadershipResponsibility | 2500 |
| physicalDemandTolerance | 0 |
| indoorOutdoorPreference | 0 |
| customerFacingTolerance | 2500 |
| englishReadiness | 7500 |
| trainingDurationTolerance | 7500 |
| formalEntryWillingness | 5000 |
| shiftScheduleTolerance | 0 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 2500 |
| careerEntryPracticality | `study-first` |
| nightRotatingExposure | `not-typical` |
| heavyPhysicalExposure | `low` |

Framework basis: designs/builds software; builds software ≠ end-user IT support; English soft-weight note. Stability neutral without commission/SE evidence on the row.

### 11.6 `v2-hotel-front-desk-agent` — `hospitality-food-services`

| Field | Value |
|-------|------:|
| independentTeam | 5000 |
| handsOnDesk | 2500 |
| structureJudgment | 5000 |
| routineVariety | 5000 |
| leadershipResponsibility | 2500 |
| physicalDemandTolerance | 2500 |
| indoorOutdoorPreference | 0 |
| customerFacingTolerance | 10000 |
| englishReadiness | 10000 |
| trainingDurationTolerance | 2500 |
| formalEntryWillingness | 2500 |
| shiftScheduleTolerance | 7500 |
| stabilityVersusUpside | 5000 |
| detailVersusCoordination | 5000 |
| careerEntryPracticality | `learn-on-job` |
| nightRotatingExposure | `common-or-required` |
| heavyPhysicalExposure | `low` |

Framework basis: guest check-in/out and front-of-house hotel service; English soft-weight often higher; hotel guest service ≠ retail sales.

---

## 12. Locked corrections summary

### Correction 1 — Evidence boundary

Use framework-expressed typical working patterns only. Do not claim verified Canadian labour-market facts. Allowed / disallowed evidence lists are in §1.

### Correction 2 — `stabilityVersusUpside`

Career-characteristic axis only; framework-explicit stability / commission / SE / contract / variable-upside evidence. Otherwise **5000** + `editorial-only`. Never invent wages/outlook/advancement facts. Never infer from title alone.

### Correction 3 — Formal entry and entry pace

`formalEntryWillingness` and `careerEntryPracticality` follow **explicit framework path descriptions**. Do not infer regulated status, mandatory licence/registration, exact duration, or apprenticeship solely from the title. Limited evidence → neutral defensible grid value for formal entry; categorical pace only from stated path; `editorial-only`; no invented facts.

### Correction 4 — `crossCuttingTags` (pilot)

During the V2.4D pilot:

- Use **only** exact vocabulary already present in the locked occupation framework (e.g. `newcomer-accessible`, `self-employment-friendly`, `shift-common`, `outdoor-common`, `often-licensed` as defined there)
- Do not introduce synonyms or a new tag taxonomy
- Do not derive tags from general job knowledge
- An empty `readonly` array is valid and **preferred** over an invented tag

---

## 13. Pilot recommendation

| Item | Locked choice |
|------|----------------|
| Strategy | Pilot **one family** before the remaining careers |
| Pilot family | **`office-administration`** |
| Expected six careers (canonical order) | `v2-administrative-assistant`, `v2-bookkeeper`, `v2-project-coordinator`, `v2-estimator`, `v2-receptionist`, `v2-payroll-clerk` |

**Gate:** No remaining **54** careers may be authored until the office-administration pilot is reviewed and approved.

Pilot deliverable (future phase, not this doc phase): six `CareerProfileV2` rows in `lib/career-test/v2/careers.ts` (or a clearly reviewed draft under that SoT) following this rubric, plus completeness checks when selftests are authorized.

---

## 14. Factual disclaimer

**This rubric does not contain verified wage, outlook, NOC, immigration, licence, or regulatory facts.**

Any future factual publication requires Human Verify artifacts and appropriate `VerificationStatusV2` progression. Scoring must not treat unverified factual claims as matching dimensions.

---

## 15. Document control

| Item | Value |
|------|--------|
| Status | Sealed for V2.4D pilot gate |
| Careers payload | **Not** started in this documentation phase |
| Next gate | Approve office-administration pilot authoring |
| Supersedes | Informal chat rubric drafts prior to this file |
