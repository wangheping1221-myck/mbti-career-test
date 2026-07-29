/**
 * Shared calculation-engine types (domain-agnostic).
 *
 * Keep this module intentionally small. Domain packs (`lib/oinp`, `lib/clb`,
 * `lib/salary`, future CRS/Tax/EI) own inputs, tables, scorers, and UI copy.
 * No React / UI dependencies.
 */

/**
 * Successful tool calculation: echo the validated input and return a result.
 * Matches the CLB calculator success shape `{ ok: true, input, result }`.
 */
export interface ToolSuccess<TInput, TResult> {
  ok: true;
  input: TInput;
  result: TResult;
}

/**
 * Failed tool calculation: echo the attempted input with an error message.
 * `field` may point at an input key or a domain-specific token (e.g. `"all"`).
 */
export interface ToolFailure<TInput> {
  ok: false;
  input: TInput;
  error: string;
  field?: keyof TInput | (string & {});
}

/**
 * Discriminated union for pure calculator functions across tools.
 *
 * @example
 * type Outcome = ToolOutcome<MyInput, MyResult>;
 * function calculate(input: MyInput): Outcome { ... }
 */
export type ToolOutcome<TInput, TResult> =
  | ToolSuccess<TInput, TResult>
  | ToolFailure<TInput>;

/**
 * Minimal, domain-agnostic row for score / value breakdowns.
 * Domains may embed richer rows inside their own `result` types; this shape is
 * only a shared convenience when a simple id/label/value/note list is enough.
 */
export interface BreakdownRow {
  id: string;
  label: string;
  value: number;
  note?: string;
}
