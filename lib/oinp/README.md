# lib/oinp

Ontario immigration domain pack for Career Navigator Canada.

## Purpose

Hold **OINP / Ontario Workforce Priority (OWP)** types, official-source metadata, future Human-Verified scoring tables, validation, and pure scoring — separate from UI (`components/tools`, `app/tools`).

## Current V2.4 scope (after P1.2)

| In scope | Out of scope |
|----------|----------------|
| Ontario Workforce Priority | Historical Employer Job Offer streams (FW / IS / …) |
| Job Offer pathway (types + validation shell) | Physicians pathway |
| Source + Human Verify metadata | Human Capital Priorities / Masters / PhD |
| Structural category ids (provisional) | CRS, eligibility engines |
| | Official point maps / thresholds (blocked until P2) |

## Architecture flow

```text
Input
  → Structural Validation          ← exists (P1.2)
  → Human-Verified Tables          ← not yet (P2)
  → Factor Scoring                 ← not yet (P3)
  → Total + Breakdown              ← not yet (P3)
  → UI                             ← not yet (P4)
```

**After P1.2 only the first two structural layers exist** (input types + structural validation). Metadata for Human Verify is present; **no trusted scoring tables**.

## Separation of concerns

| Layer | Location | Notes |
|-------|----------|--------|
| Metadata / HV status | `constants.ts` | URLs, `retrievedOn`, verified flags — **no points** |
| Official tables | future `tables.ts` / `tables/` | **Only** place for band→points after P2 HV |
| Validation | `validation.ts` | Structure only in P1.2 |
| Scoring | future `calculator.ts` + `factors/` | P3 |
| Shared outcome types | `lib/engine` | `ToolOutcome`, `BreakdownRow` |
| UI | `app/` + `components/tools` | No scoring tables |

## Why there are no official scoring values in P1

Per Implementation Plan Official-Data Gate and DEVELOPMENT_RULES §14:

- Research summaries are **not** implementation data  
- Band→points, regional scoring lists, and experience branching **must not** ship before Human Verify  
- `OINP_OWP_HUMAN_VERIFIED = false` until Sign-off  

## Human Verify gate

1. Open ontario.ca OWP stream Scoring factors (primary)  
2. Cross-check Updates / application process as needed  
3. P2: write tables + set `retrievedOn`  
4. P3: implement scorers against those tables  
5. P5: Sign-off (`HUMAN_VERIFIED = true`, remove TODO) without changing verified values unless the official page changed  

See `OINP_OWP_SOURCE`, `OINP_OWP_HUMAN_VERIFY_TODO` in `constants.ts`.

## Files (P1.2)

| File | Role |
|------|------|
| `types.ts` | `OwpInput` / `OwpResult` / provisional category unions |
| `validation.ts` | Structural `validateOwpInput` |
| `constants.ts` | Source + HV metadata only |
| `README.md` | This document |

## What does not belong here

- React / UI copy / Portal status banners (page content)  
- Salary / CLB formulas  
- Guaranteed invitation or coaching language  
- Full improvement engines (not MVP)  

## Planned phases

| Phase | Work |
|-------|------|
| P1.2 (done here) | Types, validation shell, metadata |
| P2 | Human Verify tables |
| P3 | Factor scoring + total + breakdown |
| P4 | UI / SEO |
| P5 | Sign-off / release |
| Optional later | Deterministic Top-N delta hints (post-HV) |
