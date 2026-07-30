# lib/oinp/tables

Official **Ontario Workforce Priority (OWP)** EOI scoring-factor tables.

## Purpose

Single source of truth for official OWP Job Offer band→points data — **after** Human Verify fills options.

**After P2.2:** official **sources** are recorded per factor; `options` arrays remain **empty**; no points.

## Sequence

```text
P2.1 Structure
→ P2.2 Official source collection   ← current
→ P2.3 Value-by-value Human Verify
→ P2.4 Sign-off metadata
→ P3 Scoring
```

Calculator **must not** use these tables for production scoring until P2.3+ verification.

## Primary rule source (all active factors)

| Item | Value |
|------|--------|
| URL | https://www.ontario.ca/page/ontario-workforce-priority-stream |
| Section | Scoring factors |
| Strength | `primary-rule-source` |

Application process page **cross-checks** that scoring factors live on the stream page. Applicant checklist is **official-context-only** (supporting documents). Program Updates / O. Reg. 422/17 are **official-context-only** (redesign, portal timing, governing law).

## Per-factor primary / cross-check

| factorId | Primary | Cross-check |
|----------|---------|-------------|
| job | OWP stream Scoring factors (TEER + broad category) | Applicant checklist (context) |
| wage | OWP stream → Hourly wage | Application process (prepopulate / pointer) |
| ontario-work-experience | OWP stream → Ontario work experience | Applicant checklist (context) |
| earnings | OWP stream → Earnings history | Applicant checklist (context) |
| status | OWP stream → Legal status in Canada | Applicant checklist (context) |
| education | OWP stream → Highest level of education | Applicant checklist (context) |
| canadian-credential | OWP stream → Number of Canadian credentials | Applicant checklist (context) |
| language | OWP stream → Official language ability / Knowledge of official languages | Applicant checklist (context) |
| region | OWP stream → Regionalization (work location) | Applicant checklist (context) |

**Unresolved factors:** none for primary-rule-source identification after P2.2.  
**Note:** `job` still combines two official subsections in one shell until P2.3 option entry.

See `OINP_OWP_FACTOR_SOURCE_INVENTORY` in `sources.ts`.

## Historical sources — do not score

`OINP_HISTORICAL_DO_NOT_SCORE_SOURCES` includes closed Employer Job Offer Foreign Worker / International Student pages and the former multi-stream EOI system page.

- Strength: `historical-do-not-score`  
- May explain program history only  
- **Must not** appear in `OINP_OWP_TABLE_REGISTRY` as scoring sources  
- **Must not** copy old EJO points into OWP options  

## Portal status

`OINP_OWP_PORTAL_STATUS_CONTEXT` records time-sensitive EOI / e-Filing notes from Updates with `retrievedOn`.

- Not a permanent reopening date  
- Not a scoring input  
- Re-check ontario.ca Updates before UI copy  

## Human Verify rules (upcoming P2.3)

1. Open primary Scoring factors on the OWP stream page  
2. Enter options **one factor at a time** with official points only  
3. Keep `retrievedOn`, URLs, `verificationStatus`, `verificationNote` current  
4. Never use Research summaries, AI memory, third parties, or historical EJO tables  

UI and scorers must **never duplicate** points outside these tables.

## Files

| File | Role |
|------|------|
| `types.ts` | Table types + source strength + URL constants |
| `sources.ts` | Source inventory, historical list, portal context |
| `*.ts` factor modules | Empty options + pending-HV metadata |
| `index.ts` | Registry + re-exports |
| `README.md` | This document |
