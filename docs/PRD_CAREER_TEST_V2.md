# Product Requirements Document — Career Test V2

**Document:** `docs/PRD_CAREER_TEST_V2.md`  
**Product:** Career Navigator Canada — Canadian Career Direction Test  
**Phase:** **V2.0 — PRD only**  
**Status:** Draft for review (implementation not started)  
**Stable restore point:** Git tag `p5.8-complete`  
**Related:** Flagship product at `/career-test` (V1 live; V2 behind feature flag until approved)

---

## 1. Product summary

Career Test V2 upgrades the flagship **Canadian career direction test** from a lightweight 10-question / 28-occupation heuristic into a **substantial, finishable matching product** for Chinese-speaking newcomers, immigrants, international students, and career changers in Canada.

**Initial launch targets (locked):**

| Parameter | Value |
|-----------|--------|
| Questions | **Exactly 26** (single-choice) |
| Occupations | **Exactly 60** at initial V2 launch |
| Free results | **Top 5** recommendations |
| Architecture | **New V2 model beside frozen V1** |
| Rollout | **Feature flag** on existing `/career-test`; V1 remains default until V2 release approval |
| Completion time | **6–8 minutes** target |

V2 emphasizes **Canada-relevant constraints, work preferences, and field interests**—not MBTI-style personality labels as the primary result.

The data model and scoring architecture **must support later expansion to 70–80 occupations** without rewriting the engine; **initial published content must not exceed 60 occupations**.

---

## 2. Problem statement

V1 is live and valuable, but limited as a differentiated flagship:

1. **10 questions** provide weak signal; the experience feels like a short quiz rather than a career product.
2. **~28 occupations** (trades/facilities-heavy) constrain Top 5 diversity and quality.
3. Scoring relies heavily on **ID-specific bonuses/penalties**, which does not scale cleanly to 60–80 careers.
4. Results can feel **category-driven** rather than multi-factor matching.
5. Competitors and generic personality tests do not address **Canadian work realities** (shifts, physical demand, training tolerance, customer-facing work, English readiness)—this is the differentiation opportunity if executed carefully and honestly.

Without a deliberate V2 model, simply “adding more questions and jobs” risks longer UX, noisier rankings, and unmaintainable special-case logic.

---

## 3. Target users

Primary (Chinese-speaking, Canada-oriented):

- Newcomers and recent immigrants exploring realistic first or next jobs  
- International students planning work during/after study  
- Career changers (including mid-career) seeking practical Canadian pathways  
- Temporary workers / work-permit holders comparing field fit  

Secondary:

- Family members helping relatives navigate options  
- Counselors / settlement workers using the tool as a **discussion aid** (not official advice)

---

## 4. Product goals

1. Deliver a **credible Top 5** that users can explain (“why these roles fit / don’t fit me”).
2. Increase **perceived product depth** vs V1 and vs generic personality quizzes.
3. Keep UX **fast and mobile-first** (6–8 minutes, clear progress, back allowed).
4. Preserve **unlock / premium** economics with richer verified entry-path and risk content (where Human Verified).
5. Keep **V1 recoverable** (feature flag off + tag `p5.8-complete`).
6. Establish an **auditable, pure-function scoring** design that scales beyond 60 occupations later.

---

## 5. Non-goals (V2.0 / initial V2 launch)

- Immigration pathway matching, CRS/EOI-inside-test, or any claim that an occupation **leads to PR**  
- Wage / salary bands or employment outlook **unless separately Human Verified** (default: **omit** from initial V2)  
- MBTI / Big Five style personality type as the primary result  
- User accounts, save/share PDF, bilingual UI (structure may be future-ready)  
- Replacing V1 in place or deleting V1 during development  
- Shipping a complete final question bank or complete 60-career dataset in this PRD phase  
- Hard-blocking users permanently solely due to English ability  
- Guaranteeing employment, income, or licensing success  

---

## 6. Approved decision register

| ID | Decision | Approved choice |
|----|----------|-----------------|
| CTV2-D1 | Question count | **26** |
| CTV2-D2 | Initial occupation count | **Exactly 60**; architecture supports later 70–80 |
| CTV2-D3 | Dimensions | **10–12 scored dimensions** + small set of explicit constraints |
| CTV2-D4 | Architecture | **New V2 beside frozen V1** |
| CTV2-D5 | Rollout | **Feature flag** on `/career-test`; V1 default until release |
| CTV2-D6 | Premium | May add HV entry-path / licensing / suitability-risk / next-step; **no wages/outlook** without separate HV |
| CTV2-D7 | HV | Licensing/regulation + typical training requirements **must be HV before publication** |
| CTV2-D8 | Current phase | **PRD only** |
| CTV2-D9 | Rollback | Flag off → V1; **`p5.8-complete`** remains restore point |
| CTV2-D10 | Immigration | **No** pathway matching / immigration scoring; **no** PR claims |
| CTV2-D11 | Constraints | V2.0 deal-breakers = **exactly two** explicit rejections (nights/rotating shifts; heavy physical); hard filter only; **English is not a permanent hard block** and never uses the deal-breaker mechanism |
| CTV2-D12 | Free results | **Top 5** |

---

## 7. V1 protected behavior

Until V2 is explicitly released (flag on + product approval), the following **must not regress**:

| Area | Protected behavior |
|------|-------------------|
| Route | `/career-test` remains the product URL |
| Default experience | **V1** quiz / scoring / copy when flag is off |
| Free results | Top 5 with match % and reasons (V1 semantics while on V1) |
| Premium unlock | `/api/verify-unlock`, `PREMIUM_UNLOCK_CODES`, client verify flow |
| localStorage | Key `career-nav-premium-unlocked` (no breaking rename without dual-read plan) |
| Unlock URLs | `/?unlock=` temporary redirect; `/career-test?unlock=` auto-verify + query cleanup |
| Restart | Reset to introduction, clear progress, scroll top |
| Related Tools | Results continue to use live catalog tools |
| Metadata | Existing `/career-test` title/description/canonical/OG unless a separate SEO change is approved |
| Calculators / catalog / sitemap / robots | Out of scope for Career Test V2 |
| Tag | `p5.8-complete` remains a valid restore point |

V1 source areas (freeze for in-place edits during V2 build; copy/adapt into V2 modules instead):  
`lib/questions.ts`, `lib/career-data.ts`, `lib/recommend-careers.ts`, `lib/career-display.ts`, and the V1 path inside `components/career-test/career-test-flow.tsx` (or equivalent split).

---

## 8. V2 user journey

1. Land on `/career-test` (V2 when flag enabled).  
2. See compact intro (duration expectation, Top 5 free, unlock for advanced report)—**no** personality-type promise.  
3. Start test → **Section 1: Constraints** → **Section 2: Work preferences** → **Section 3: Interests and fields**.  
4. One question per screen (especially mobile); **Back** allowed; **section + overall** progress visible.  
5. Submit → pure scoring engine → **Top 5** free results.  
6. Optional unlock → premium sections (entry path, licensing/regulation where HV, suitability risks, next steps).  
7. Related Tools (catalog) unchanged in role.  
8. Restart returns to intro and clears V2 progress (must not corrupt unlock state).

---

## 9. Three-section question blueprint

| Section | Purpose | UX |
|---------|---------|-----|
| **1. Constraints** | Capture the two V2.0 deal-breaker rejections plus other readiness/feasibility inputs | Short; deal-breaker answers feed **hard filters only** |
| **2. Work preferences** | Style, environment, people vs tasks, stability vs upside, training/license appetite, pace | Core soft dimensions (sole home for indoor/outdoor and customer-facing) |
| **3. Interests and fields** | Field affinity across Canadian occupation families | Aggregate into **one** Field / Interest Affinity soft dimension—not ten independent high-weight axes |

**Rules:**

- All V2.0 questions are **single-choice**.  
- Avoid MBTI-style “who you are” framing; prefer **work-condition and preference** framing.  
- **Each matching axis should normally be asked once** (no V1-style triple-ask; no duplicate indoor/outdoor or customer-facing across sections).  
- Full final question bank is **out of scope for this PRD file** (belongs to later phase).

### Axis placement (V2.0 — no double-ask)

| Axis | Section | Role |
|------|---------|------|
| Night / rotating-shift rejection | Constraints | Deal-breaker (hard filter) when user explicitly rejects |
| Heavy-physical rejection | Constraints | Deal-breaker (hard filter) when user explicitly rejects |
| Indoor vs outdoor preference | **Work preferences only** | Soft score; **not** duplicated in Constraints |
| Customer-facing tolerance | **Work preferences only** | Soft score; **not** duplicated in Constraints |
| English readiness | **Exactly one** of Constraints or Work Preferences (chosen in V2.2) | Soft score / ranking cap / reasons / prep only—**never** a deal-breaker |
| Training tolerance, licensing willingness, similar feasibility | **Exactly one** section each (Constraints as readiness **or** Work Preferences as preference; chosen in V2.2) | Soft scores; **not** automatically deal-breakers |

Indoor/outdoor preference, customer-facing tolerance, weekend work, on-call work, and any other possible hard constraints remain **soft preferences** or **intentionally postponed** unless separately approved in a later phase.

---

## 10. Recommended allocation of the 26 questions

| Section | Count | Notes |
|---------|------:|-------|
| 1. Constraints | **6** | Must include the two deal-breaker opportunities (nights/rotating; heavy physical). Remaining slots: readiness/feasibility inputs as allocated in V2.2 (e.g. English, training, licensing)—**not** outdoor or customer-facing; no axis duplicated from Work Preferences |
| 2. Work preferences | **10** | Sole home for indoor/outdoor and customer-facing. Other soft axes (work style, stability, income priority, training, licensing, team vs solo, pace, English, etc.) only if not already asked in Constraints—**one ask per axis** |
| 3. Interests and fields | **10** | Distributed across occupation families; allow “unsure / open” where needed; **aggregate to one** Field / Interest Affinity dimension |
| **Total** | **26** | Exact |

Exact wording and option IDs are deferred to the Question framework phase (V2.2).

**Interest-weight rule:** The 10 Interests and Fields questions do **not** each become independent high-weight scoring dimensions. They must aggregate into one normalized **Field / Interest Affinity** dimension. That dimension may contribute **no more than 20%** of the total soft-score weight. Question count must not automatically determine scoring weight. The final exact weighting formula remains deferred to **V2.3–V2.4**.

---

## 11. Definition of the 10–12 matching dimensions

V2 scoring uses **10–12 scored soft dimensions** (approved range). The table below is a **candidate set of 12**. Clarify:

- The **final scored set is locked during V2.3**.  
- It **must not exceed 12**.  
- **Removing or merging** dimensions is allowed.  
- Adding a **13th** scored dimension requires a **new approved decision**.

| # | Dimension | Description |
|---|-----------|-------------|
| 1 | Field / interest affinity | Preference toward occupation families (**one** dimension; ≤20% of total soft-score weight; see §10) |
| 2 | Work style fit | Solo / team / hands-on / process / service-oriented |
| 3 | Physical demand tolerance | Comfort with physical intensity (soft; paired with heavy-physical **deal-breaker** when user explicitly rejects) |
| 4 | Indoor vs outdoor preference | Environment preference (Work Preferences only; soft—not a V2.0 deal-breaker) |
| 5 | Customer-facing tolerance | Comfort with public/client interaction (Work Preferences only; soft—not a V2.0 deal-breaker) |
| 6 | English readiness (soft) | Current comfort with English-demanding work—**affects score/caps/reasons/prep; never deal-breaker or permanent exclusion** |
| 7 | Training duration tolerance | Willingness to invest time before entry |
| 8 | Licensing / certification willingness | Willingness to pursue regulated paths |
| 9 | Shift / schedule tolerance | Soft preference for nights, rotating, weekends, on-call (paired with nights/rotating **deal-breaker** when user explicitly rejects; weekend/on-call remain soft or postponed) |
| 10 | Stability preference | Preference for steadier vs variable work |
| 11 | Income priority | Preference for higher upside vs other tradeoffs (not a wage table) |
| 12 | Newcomer entry practicality | Editorial/soft practicality band for relatively accessible entry *(careful language; not immigration scoring)* |

Recommended merge candidates if trimming below 12: indoor/outdoor into a broader environment axis; newcomer practicality into training + field tags.

---

## 12. Soft scores versus deal-breaker constraints

### Soft scores
- Continuous or leveled contribution to total match score.  
- Drive ranking among eligible careers.  
- Appear in “推荐理由” explanations.  
- **Ranking caps** (e.g. English readiness) are soft-score/readiness mechanisms and **must not** be called deal-breakers.

### V2.0 deal-breaker set (locked — exactly two)

For initial V2.0 scope, **only** these conditions may act as deal-breakers:

1. The user **explicitly** states they **cannot work nights or rotating shifts**.  
2. The user **explicitly** states they **cannot perform heavy physical work**.

No open-ended “other non-negotiable conditions” set applies in V2.0. Outdoor work, customer-facing work, weekend work, on-call work, English ability, and similar items are **not** V2.0 deal-breakers.

### Deal-breaker semantics (locked)

| Rule | Requirement |
|------|-------------|
| Activation | Only after an **explicit user rejection** of one of the two approved conditions |
| Effect | **Hard exclusion** — always **filter out** occupations that conflict |
| Not allowed | Sometimes filter / sometimes ranking-cap only |
| Naming | Deal-breaker = hard exclusion; ranking cap ≠ deal-breaker |
| English | **Never** uses the deal-breaker mechanism |
| Empty / conflict outcome | If filtering leaves fewer than 5 eligible occupations, show the remaining matches; if **zero** eligible occupations remain (unexpected data/constraint combination), show a clear **no-exact-match fallback** — **do not** silently reintroduce excluded careers |

Deal-breakers must be **data-declared** on career profiles (constraint tags), not hardcoded ID lists scattered in UI.

---

## 13. Explicit rule — English is not a permanent hard block

**Normative rule for V2:**

> English ability **must not** permanently exclude an occupation from the entire recommendation set solely because the user’s English readiness is low. English **must never** activate the deal-breaker (hard filter) mechanism.

Allowed uses of English dimension:

- Soft score penalties / bonuses  
- Ranking **caps** (e.g. cannot be #1 without disclosure)—soft mechanism only  
- Reasons such as “英语要求较高，建议先提升语言再入行”  
- Premium / free **preparation path** suggestions  

**Forbidden:**

- Permanent hard block sets equivalent to V1-style “never recommend these IDs if English ≤ 2” as the sole gate  
- Using English as a deal-breaker / hard filter  
- Shaming copy or implying the user cannot ever enter the field  

---

## 14. Initial 60-occupation taxonomy and category slot allocation

Initial launch publishes **exactly 60** occupations. Slots below are **planning allocations** (exact titles deferred to V2.1).

| Family / category | Slots | Role in mix |
|-------------------|------:|-------------|
| Skilled trades | 10 | Core Canada pathway; licensing flags common |
| Building operations & facilities | 7 | Stable institutional/ops roles |
| Healthcare support | 6 | High interest; regulated flags important |
| Transportation & logistics | 6 | Newcomer-accessible + skilled driving |
| Manufacturing / production | 4 | Industrial entry and progression |
| Office & administration | 6 | Lower physical; English soft-weight |
| Technology | 5 | Competitive; training/English soft |
| Sales & customer service | 4 | Customer-facing dimension |
| Education & community services | 4 | ECE / support roles; regulation where needed |
| Hospitality & food services | 4 | Physical/shift constraints interact |
| Public-sector & institutional | 3 | Municipal / school / hospital support (non-clinical) |
| Self-employment-friendly | 1 | Keep rare in MVP; strong risk copy |
| **Total** | **60** | |

Cross-cutting **tags** (not extra count): `newcomer-accessible`, `often-licensed`, `shift-common`, `outdoor-common`, etc.

Architecture must allow adding careers later to reach 70–80 **without** changing the scoring API—only data + fixtures.

---

## 15. Occupation inclusion and exclusion criteria

### Inclusion
- Relevant to Canada job search for target users  
- Distinct enough profile vectors (not near-duplicates)  
- Can be explained with entry path + risks in ZH  
- Fits one primary family in the taxonomy  
- Constraint tags and dimension levels can be assigned consistently  

### Exclusion (initial V2)
- Roles that primarily require professional degrees as the only realistic path (e.g. physician, lawyer) as “easy matches”  
- Roles whose value proposition is mainly “immigration / PR”  
- Duplicate titles that only differ by employer brand  
- Any occupation whose published licensing/training claims are not Human Verified when those fields are shown  

---

## 16. Data-model requirements

V2 modules should live beside V1 (illustrative paths; exact layout in V2.3):

`lib/career-test/v2/` (questions, careers, score, types, fixtures)

### Questions / answers
- `questionId`, `sectionId`, `promptZh`, `options[]` with stable `optionId`  
- Mapping from option → dimension deltas and/or constraint flags  
- Version string `careerTestVersion: "v2"`

### Career profile
- Identity: `id`, `title`, `titleZh`, `family`  
- Dimension levels or vectors aligned to the 10–12 dimensions  
- `constraintTags` for deal-breakers  
- Informational / premium: entry path, licensing/regulation summary + source refs, suitability risks, next steps  
- **No** wage/outlook fields in initial schema unless HV-approved later  

### Scoring result
- `careerId`, raw `score`, `matchPercent` (calibration rules defined in engine phase), `reasons[]`, `constraintFlags[]`, optional `prepHints[]`  

### Explanations
- Reason templates must be data-driven or pure functions of (answers × career)—**not** computed in React components  

### Bilingual readiness
- Separate display strings from IDs; English copy may be deferred but IDs remain locale-agnostic  

---

## 17. Pure scoring-engine requirements

1. **UI must not calculate scores**—only collect answers and render results.  
2. Single entrypoint e.g. `recommendCareersV2(answers, options) → CareerRecommendationV2[]`.  
3. Pipeline (logical): normalize answers → apply deal-breaker **hard filters** (nights/rotating; heavy physical only) → soft-score all **remaining eligible** careers → sort/tie-break → Top 5 → calibrate display percentages → attach reasons. Never reintroduce hard-filtered careers via ranking caps.  
4. **No duplicated scoring logic** across UI and lib.  
5. Deterministic given same inputs and data version.  
6. Auditable: fixtures can assert rankings without browser.  
7. Must not import React.  
8. V1 `recommendCareers` remains untouched for flag-off path.

---

## 18. Feature-flag and V1 compatibility strategy

| Item | Requirement |
|------|-------------|
| Flag | e.g. env `CAREER_TEST_VERSION=v1\|v2` or equivalent build-time/runtime flag |
| Default | **`v1`** until explicit release decision |
| URL | Stay on **`/career-test`** (no required public `/v2` path for launch) |
| Unlock | Shared API + storage; V2 must honor existing unlocked state |
| Preview | Internal QA may temporarily force `v2` without changing production default |
| SEO | One canonical product URL; avoid indexing a second competing quiz URL |

Optional internal-only preview route is **not required** if flag forcing is available for QA.

---

## 19. Free versus premium product scope

### Free (V2)
- Intro + 26Q flow  
- Top 5: names, category/family, match %, key reasons  
- Limited risk teaser (pattern may follow V1 teaser rules)  
- Related Tools  
- Unlock CTA  

### Premium (V2) — allowed additions when HV-ready
- Fuller suitability / warning text  
- Entry-path analysis  
- Licensing / regulation status summary + official source link  
- Next-step suggestions  
- English **preparation** guidance where relevant (not a ban)  

### Premium — excluded without separate HV approval
- Wages / salary bands  
- Employment outlook statistics  

---

## 20. Human Verify matrix

| Content | Required before publish? |
|---------|--------------------------|
| Licensing / regulated occupation status | **Yes (HV)** — recorded source/sign-off artifact required before live publication |
| Typical training / education requirements | **Yes (HV)** — recorded source/sign-off artifact required before live publication |
| Dimension levels (physical, shift, customer-facing) as model inputs | Editorial OK with QA; escalate to HV if presented as official fact |
| Deal-breaker tags | Editorial + QA consistency |
| Reason copy | Editorial + compliance review |
| Wages / outlook | **HV or omit** (omit for initial V2) |
| Immigration / PR statements | **Forbidden** in V2.0 |

HV process should follow project norms (official sources, retrieved date, sign-off metadata)—detailed in later phases; this PRD only mandates the gates.

---

## 21. Content sourcing and citation requirements

- Prefer **primary Canadian official sources** (federal/provincial regulators, IRCC only if linking generally—not for pathway matching).  
- Every published licensing/training claim needs: source URL, retrieved/verified date, verification status.  
- Do not use AI memory, aggregator blogs, or social media as authoritative sources for regulated facts.  
- Marketing (e.g. Xiaohongshu) must not invent claims beyond what the product shows.

---

## 22. Testing and fixture requirements

Minimum for V2 engine/UI phases:

- Unit tests / selftests for soft scores, the two deal-breakers (hard filter), Top 5, ties  
- Fixtures: high-match trades daytime; low-physical office; reject-nights; reject-heavy-physical; low English with strong field interest (**must still see some recommendations**; English must not hard-filter)  
- Constraint conflict → fewer than 5 remaining matches, and zero-eligible → no-exact-match fallback (never reintroduce excluded careers)  
- Flag off ≡ V1 regression smoke  
- Unlock + restart + Related Tools  
- Mobile completion of all 26 questions  
- Free vs premium rendering  
- No immigration/PR language in output copy fixtures  
- Field / Interest Affinity weight share ≤20% of total soft score (asserted once formula is defined in V2.3–V2.4)  

---

## 23. Mobile and accessibility requirements

- One question per viewport on mobile  
- Visible **overall** and **section** progress  
- Back navigation without losing prior answers  
- Large tap targets; readable ZH typography  
- Focus states; `aria` for progress where practical  
- No horizontal overflow  
- Respect reduced-motion preferences for non-essential animation  

---

## 24. Performance and maintainability requirements

- Scoring of 60 careers must be negligible on client (or server if later moved)—target &lt; 50ms typical on mid-tier mobile for pure JS score  
- Adding careers 61–80 = **data + fixtures only**, not engine rewrite  
- Avoid V1-style large bespoke ID penalty maps as the primary control mechanism  
- Keep question bank and career profiles reviewable in structured files  

---

## 25. Acceptance criteria (for eventual V2 launch—not this PRD phase)

### Core product

1. Feature flag **defaults to V1** until explicit V2 release approval.  
2. With flag V2: **26** single-choice questions in **3** sections (6 / 10 / 10); free results = **Top 5**.  
3. Exactly **60** occupations in the published V2 dataset at launch.  
4. Field / Interest Affinity contributes **≤20%** of total soft-score weight; the 10 interest questions aggregate into that single dimension.  
5. Scored soft dimensions are in the range **10–12** and **never exceed 12** without a new approved decision.  
6. No immigration pathway matching or PR claims in UI copy.  
7. No wages/outlook unless separately HV-approved.

### Deal-breakers (objective pass/fail)

8. Exactly the **two** approved explicit rejections activate hard filtering: (a) cannot work nights or rotating shifts; (b) cannot perform heavy physical work.  
9. Occupations that conflict with an activated deal-breaker **do not appear** in the normal Top 5 (hard exclusion; no ranking-cap substitute).  
10. English **never** activates hard filtering / the deal-breaker mechanism. Low English may still yield recommendations via soft score, caps, reasons, and prep paths.  
11. If hard filtering yields zero eligible occupations, UI shows a clear **no-exact-match fallback** and does **not** silently reintroduce excluded careers.

### Human Verify

12. Publication of any licensing, regulation, or typical-training claim in the live dataset requires a **recorded source/sign-off artifact** for that claim. Claims without such artifacts must be omitted from the live dataset.

### Regression / smoke (explicit checklist)

13. Before release, explicitly verify all of the following still pass:  
    - `/career-test` route  
    - feature flag defaulting to V1 before release  
    - flag-off rollback to V1  
    - free Top 5  
    - premium unlock codes and verify API  
    - existing localStorage unlock key `career-nav-premium-unlocked`  
    - old unlock URL compatibility (`/?unlock=` and `/career-test?unlock=`)  
    - restart behavior  
    - Related Tools  
    - metadata  
    - mobile completion flow  
    - `p5.8-complete` still restorable  

### Testing gate (release blocked unless all true)

14. V2 release is **blocked** unless:  
    - all named V2 unit tests and scoring fixtures pass  
    - tie and constraint-conflict fixtures pass  
    - free/premium and unlock regression checks pass  
    - the mobile QA checklist passes at agreed phone widths  
    - no P0 or P1 issue remains open  

Exact future test files may be created in later phases; they are not created in V2.0.

**This V2.0 PRD phase** is accepted when the document is reviewed and approved—**no code required**.

---

## 26. Phase boundaries from V2.1 onward

| Phase | Goal | Boundary |
|-------|------|----------|
| **V2.0** | This PRD | Docs only |
| **V2.1** | Occupation framework: 60 slots, IDs, families, HV checklist | No live scoring switch |
| **V2.2** | Question framework: full 26Q bank draft + mappings | No production flag default |
| **V2.3** | Data model / types in `lib/career-test/v2` | V1 frozen |
| **V2.4** | Pure scoring engine | Flag still default V1 |
| **V2.5** | Fixtures / validation | Gate before UI |
| **V2.6** | UI wiring behind flag | Unlock untouched |
| **V2.7** | Premium field enhancement (HV) | No wage/outlook without HV |
| **V2.8** | Migration: default V2, docs, release tag | Rollback via flag + `p5.8-complete` |

---

## 27. Rollback strategy

1. **Operational:** set feature flag to `v1` → immediate return to frozen V1 behavior on `/career-test`.  
2. **Engineering:** restore workspace / deploy from Git tag **`p5.8-complete`**.  
3. **Data:** do not migrate unlock keys in a breaking way; if a new key is ever required, dual-read old key.  
4. **Content:** unpublished HV failures simply omit premium regulated fields rather than blocking entire V1.

---

## 28. Deferred features

- Expansion from 60 → 70–80 occupations  
- Wages / employment outlook  
- Immigration pathway matching  
- Multi-select questions  
- Accounts, PDF, share cards  
- Full bilingual UI  
- Personality-type branding  
- Permanent English hard-blocks  
- Additional deal-breakers beyond the two locked V2.0 conditions (outdoor, customer-facing, weekend, on-call, etc.)  
- Public second URL for V2  

---

## 29. Remaining decisions intentionally postponed

These are **not** blockers for approving this PRD, but must be resolved in later phases:

| Topic | Deferred to |
|-------|-------------|
| Final list of 10 vs 11 vs 12 dimension keys and names (lock ≤12 in V2.3) | V2.3 |
| Exact soft-score weights (Field / Interest Affinity ≤20%; other shares) | V2.3–V2.4 |
| Exact 26 question texts and option IDs | V2.2 |
| Exact 60 occupation titles and ZH names | V2.1 |
| Match % calibration formula (bands vs absolute) | V2.4 |
| Feature flag mechanism (env vs config) | V2.6 |
| Whether additional axes (e.g. outdoor, weekend, on-call) may become deal-breakers in a later version | Later phase + new decision |
| Premium teaser length / blur treatment parity with V1 | V2.6–V2.7 |
| Self-employment-friendly slot count adjustments within 60 | V2.1 |
| Named unit-test / fixture file inventory and mobile QA width list | V2.5–V2.6 |
| Analytics events for funnel | Post-V2.8 optional |

---

## Document control

| Field | Value |
|-------|--------|
| Created for | Career Test V2.0 PRD phase |
| Implements code? | **No** |
| Supersedes V1? | **No** (V1 remains default until flagged release) |
| Next step after approval | Phase **V2.1 — Occupation framework** (still no scoring implementation unless separately approved) |
