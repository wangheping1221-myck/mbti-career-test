# lib/oinp

Ontario immigration domain pack for Career Navigator Canada.

## Purpose

Hold **OINP / Ontario Workforce Priority (OWP)** types, official-source metadata, Human-Verified scoring tables, validation, and pure scoring — separate from UI.

## Current V2.4 scope (after P2.2)

| In scope | Out of scope |
|----------|----------------|
| OWP Job Offer types + validation | Historical EJO streams (do-not-score) |
| Official **source collection** per factor | Physicians pathway scoring |
| Empty table shells + pending HV | Points / thresholds / ranges |
| Source inventory + portal **context** | Calculator / UI |

## Architecture flow

```text
Input
  → Structural Validation          ← P1.2
  → Official Tables (shells)       ← P2.1
  → Official Source Collection     ← P2.2 (current) — URLs + classifications; options still empty
  → Value-by-value Human Verify    ← not yet (P2.3)
  → Factor Scoring                 ← not yet (P3)
  → UI                             ← not yet (P4)
```

**Calculator must not use tables for production scoring yet.**  
`OINP_OWP_HUMAN_VERIFIED` remains **false**.

## Official sources (summary)

- **Primary scoring grid:** [Ontario Workforce Priority stream — Scoring factors](https://www.ontario.ca/page/ontario-workforce-priority-stream)  
- **Cross-check / process:** [OINP application process](https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp-application-process)  
- **Portal timing (context only):** [2026 OINP Updates](https://www.ontario.ca/page/2026-ontario-immigrant-nominee-program-updates)  
- **Checklist (context):** OWP applicant checklist on ontario.ca  
- **Regulation (context):** O. Reg. 422/17  

Per-factor detail: [`tables/README.md`](./tables/README.md) and `tables/sources.ts`.

**Unresolved primary sources:** none for the nine active Job Offer factor shells.

**Historical-do-not-score:** closed Foreign Worker / International Student stream pages; former multi-stream EOI system page — never copy into active OWP options.

**Portal status:** time-sensitive; see `OINP_OWP_PORTAL_STATUS_CONTEXT` — not a permanent constant.

## Separation of concerns

| Layer | Location |
|-------|----------|
| Package metadata / HV flags | `constants.ts` |
| Official tables + sources | `tables/` |
| Structural validation | `validation.ts` |
| Shared outcome types | `lib/engine` |

## Files

| Path | Role |
|------|------|
| `types.ts` / `validation.ts` / `constants.ts` | Domain input + package HV flags |
| `tables/` | Factor shells, source inventory, registry |
| `README.md` | This document |

## Planned phases

| Phase | Work |
|-------|------|
| P2.2 (current) | Official source collection |
| P2.3 | Value-by-value Human Verify (enter options + points) |
| P2.4 | Sign-off metadata |
| P3 | Scoring |
| P4 | UI / SEO |
| P5 | Package release Sign-off |
