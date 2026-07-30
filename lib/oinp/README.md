# lib/oinp

Ontario immigration domain pack for Career Navigator Canada.

## Purpose

Hold **OINP / Ontario Workforce Priority (OWP)** types, Human-Verified scoring tables, validation, and pure scoring — separate from UI.

## Current V2.4 scope (after P3.2.2)

| In scope | Out of scope |
|----------|----------------|
| `OwpScoringInput` (verified option IDs) | Historical EJO streams |
| HV tables (signed off P2.4) | Physicians pathway scoring |
| Validation + factor scorers + real totals | Normalization (design only) |
| Executable scoring fixtures | UI / routes |

## Architecture flow

```text
OwpScoringInput (verified option IDs)
  → validateOwpInput
  → scoreOwpJobOfferFactors   ← lib/oinp/factors + scorer.ts
  → calculateOwpEoi           ← total + breakdown
  → UI                        ← P4
```

`OINP_OWP_HUMAN_VERIFIED` is **true**. Totals come only from HV tables.

## Canonical scoring input

See `OwpScoringInput` in `types.ts`. Scorers never accept raw wage/CLB/city/NOC text.

## Breakdown order

1. job-teer  
2. job-broad  
3. wage  
4. ontario-work-experience  
5. earnings  
6. status  
7. education  
8. canadian-credential  
9. language-ability  
10. language-knowledge  
11. region  

## Official sources

- **Primary:** [OWP Scoring factors](https://www.ontario.ca/page/ontario-workforce-priority-stream)

## Files

| Path | Role |
|------|------|
| `types.ts` / `validation.ts` / `calculator.ts` | Contract + orchestration |
| `scorer.ts` | Factor runner + sum |
| `factors/` | job, OWE, language, lookups |
| `tables/` | HV option tables (do not casual-edit) |
| `validation.selftest.ts` / `scoring.selftest.ts` | Executable fixtures |
| `index.ts` | Public exports |

## Selftests

```bash
pnpm dlx tsx lib/oinp/validation.selftest.ts
pnpm dlx tsx lib/oinp/scoring.selftest.ts
```

## Planned phases

| Phase | Work |
|-------|------|
| P3.2.2 (current) | Factor scorers + real totals |
| P4 | UI / SEO |
| Later | Optional normalize helpers |
