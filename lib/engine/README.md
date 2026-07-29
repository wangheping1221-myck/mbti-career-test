# lib/engine

Minimal, **domain-agnostic** shared types for Career Navigator Canada calculators.

Introduced in V2.4 P1.1 for the Ontario Workforce Priority (OWP) EOI Calculator path, without forcing Salary / CLB to migrate yet.

## What belongs here

- Generic success / failure result contracts (`ToolOutcome`)
- Tiny shared shapes that stay free of policy knowledge (e.g. `BreakdownRow`)
- Optional pure helpers **only** when a second clear consumer needs them (e.g. `sum-scores.ts`)

## What must stay in domain folders

| Concern | Where |
|---------|--------|
| Ontario / OINP / OWP names, factors, tables | `lib/oinp/` |
| IRCC CLB mappings | `lib/clb/` |
| Salary formulas | `lib/salary/` |
| Official thresholds & Human Verify metadata | domain `constants` / tables |
| Validation / normalization of domain inputs | domain pack |
| Factor registries, scorers, improvement hints | domain pack |
| UI copy, React components | `app/` / `components/` |

Do **not** put immigration rules, scoring bands, or product copy in `lib/engine`.

## Minimal `ToolOutcome` contract

Aligned with the existing CLB calculator API shape:

```ts
// Success
{ ok: true, input: TInput, result: TResult }

// Failure
{ ok: false, input: TInput, error: string, field?: keyof TInput | string }
```

Union export: `ToolOutcome<TInput, TResult>`.

Domain-specific fields such as `total` and detailed breakdowns live **inside** `result`, not on the top-level outcome.

`normalizedInput` (if any) stays **internal** to the domain pack and is not part of this contract.

## Why this package stays small

- Avoid over-abstraction before a second complex consumer needs shared helpers
- Keep policy data auditable inside domain packs (Human Verify / Sign-off)
- Preserve a stable, CLB-like boundary for UI: call one pure function, branch on `ok`

## Adding new abstractions

New files or generics in `lib/engine` require:

1. A **second clear consumer** (not only OWP), and  
2. Explicit Review / plan approval  

Until then, prefer implementing helpers inside the domain pack.
