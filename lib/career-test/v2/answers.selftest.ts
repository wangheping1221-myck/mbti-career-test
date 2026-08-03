/**
 * Career Test V2 — answers / validateAnswersV2 selftest (V2.4C4).
 *
 * Run: pnpm dlx tsx lib/career-test/v2/answers.selftest.ts
 *  or: npx tsx lib/career-test/v2/answers.selftest.ts
 *
 * option-not-in-question is unreachable under the sealed a–d bank and is not
 * executed here (see question-bank.selftest.ts invariants).
 */

import { QUESTION_IDS_V2 } from "./ids";
import { validateAnswersV2 } from "./answers";

let passed = 0;
let failed = 0;

function pass(id: string, detail?: string): void {
  passed += 1;
  console.log(detail ? `PASS ${id} ${detail}` : `PASS ${id}`);
}

function fail(id: string, detail: string): void {
  failed += 1;
  console.error(`FAIL ${id} ${detail}`);
}

function assert(id: string, condition: boolean, detail: string): void {
  if (condition) pass(id, detail);
  else fail(id, detail);
}

function createBaseAnswers(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  const raw: Record<string, unknown> = {};
  for (const id of QUESTION_IDS_V2) {
    raw[id] = "a";
  }
  return { ...raw, ...overrides };
}

function deepStable(value: unknown): string {
  return JSON.stringify(value);
}

// AV1 — valid succeeds
{
  const result = validateAnswersV2(createBaseAnswers());
  assert("AV1", result.ok === true, "complete 26-answer object succeeds");
}

// AV2 / AV3 / AV4 / AV5 / AV6 — success shape
{
  const result = validateAnswersV2(createBaseAnswers());
  if (!result.ok) {
    fail("AV2", "expected success");
  } else {
    const keys = Object.keys(result.value.answers);
    assert("AV2", keys.length === 26, `keys=${keys.length}`);
    assert(
      "AV3",
      keys.every((k, i) => k === QUESTION_IDS_V2[i]),
      "answer-key order follows QUESTION_IDS_V2",
    );
    const symbols = Object.getOwnPropertySymbols(result.value);
    assert("AV4", symbols.length === 1, `brand symbols=${symbols.length}`);
    assert(
      "AV6",
      keys.every((k) => (QUESTION_IDS_V2 as readonly string[]).includes(k)),
      "no unknown string keys on answers",
    );
  }
}

// AV5 — non-plain-object validation (folds former AV5b “no value”;
// covers former AV8 Date/Map/Set/class inventory under the strengthened AV5 id)
{
  class Sample {}
  const cases: unknown[] = [
    new Date(0),
    new Map(),
    new Set(),
    new Sample(),
  ];
  let ok = true;
  for (const input of cases) {
    const result = validateAnswersV2(input);
    if (
      !(
        result.ok === false &&
        !("value" in result) &&
        result.errors.length === 1 &&
        deepStable(result.errors[0]) === deepStable({ code: "malformed-input" })
      )
    ) {
      ok = false;
      break;
    }
  }
  assert(
    "AV5",
    ok,
    "Date/Map/Set/class → ok=false, no value, one malformed-input",
  );
}

// AV7 — null/undefined/primitives/arrays → one malformed
{
  const cases: unknown[] = [null, undefined, 1, "x", true, false, []];
  let ok = true;
  for (const input of cases) {
    const result = validateAnswersV2(input);
    if (
      !(
        result.ok === false &&
        !("value" in result) &&
        result.errors.length === 1 &&
        deepStable(result.errors[0]) === deepStable({ code: "malformed-input" })
      )
    ) {
      ok = false;
      break;
    }
  }
  assert("AV7", ok, "null/undefined/primitives/arrays → one malformed-input");
}

// AV9 — missing one
{
  const raw = createBaseAnswers();
  delete raw["v2-c01"];
  const result = validateAnswersV2(raw);
  assert(
    "AV9",
    result.ok === false &&
      result.errors.some(
        (e) => e.code === "missing-question" && e.questionId === "v2-c01",
      ),
    "missing v2-c01",
  );
}

// AV10 — missing multiple in QUESTION_IDS_V2 order
{
  const raw = createBaseAnswers();
  delete raw["v2-c01"];
  delete raw["v2-c02"];
  delete raw["v2-i10"];
  const result = validateAnswersV2(raw);
  if (result.ok) {
    fail("AV10", "expected failure");
  } else {
    const missing = result.errors
      .filter((e) => e.code === "missing-question")
      .map((e) => ("questionId" in e ? e.questionId : ""));
    assert(
      "AV10",
      deepStable(missing) === deepStable(["v2-c01", "v2-c02", "v2-i10"]),
      `missing order=${missing.join(",")}`,
    );
  }
}

// AV11 — unknown IDs lexicographic
{
  const raw = createBaseAnswers({ zzz: "a", aaa: "b" });
  const result = validateAnswersV2(raw);
  if (result.ok) {
    fail("AV11", "expected failure");
  } else {
    const unknown = result.errors
      .filter((e) => e.code === "unknown-question-id")
      .map((e) => ("questionId" in e ? e.questionId : ""));
    assert(
      "AV11",
      deepStable(unknown) === deepStable(["aaa", "zzz"]),
      `unknown order=${unknown.join(",")}`,
    );
  }
}

// AV12 — invalid option descriptors
{
  const cases: Array<{ value: unknown; optionId: string }> = [
    { value: "x", optionId: "x" },
    { value: 1, optionId: "number" },
    { value: null, optionId: "null" },
    { value: true, optionId: "boolean" },
    { value: {}, optionId: "object" },
  ];
  let ok = true;
  for (const { value, optionId } of cases) {
    const result = validateAnswersV2(
      createBaseAnswers({ "v2-c01": value }),
    );
    if (result.ok) {
      ok = false;
      break;
    }
    const err = result.errors.find((e) => e.code === "unknown-option-id");
    if (
      !err ||
      err.code !== "unknown-option-id" ||
      err.questionId !== "v2-c01" ||
      err.optionId !== optionId
    ) {
      ok = false;
      break;
    }
  }
  assert("AV12", ok, "unknown-option-id descriptors + questionId");
}

// AV13 — symbol keys ignored
{
  const raw = createBaseAnswers() as Record<string | symbol, unknown>;
  const sym = Symbol("extra");
  raw[sym] = "a";
  const result = validateAnswersV2(raw);
  assert("AV13", result.ok === true, "symbol keys ignored; still succeeds");
}

// AV14 — inherited enumerable ignored (try/finally restore)
{
  const protoKey = "v2-c01";
  const hadOwn = Object.prototype.hasOwnProperty.call(
    Object.prototype,
    protoKey,
  );
  const previous = Object.getOwnPropertyDescriptor(Object.prototype, protoKey);
  try {
    Object.defineProperty(Object.prototype, protoKey, {
      value: "a",
      enumerable: true,
      configurable: true,
      writable: true,
    });
    const raw = createBaseAnswers();
    delete raw["v2-c01"];
    const result = validateAnswersV2(raw);
    const missing =
      result.ok === false &&
      result.errors.some(
        (e) => e.code === "missing-question" && e.questionId === "v2-c01",
      );
    assert(
      "AV14",
      missing,
      "inherited enumerable v2-c01 ignored; treated as missing",
    );
  } finally {
    if (previous) {
      Object.defineProperty(Object.prototype, protoKey, previous);
    } else if (!hadOwn) {
      delete (Object.prototype as Record<string, unknown>)[protoKey];
    }
  }
}

// AV15 — raw not mutated
{
  const raw = createBaseAnswers({ "v2-c03": "b" });
  const before = deepStable(raw);
  validateAnswersV2(raw);
  assert("AV15", deepStable(raw) === before, "raw input not mutated");
}

// AV16 — repeated validation identical
{
  const raw = createBaseAnswers({ zzz: "a", "v2-c01": "x" });
  const a = validateAnswersV2(raw);
  const b = validateAnswersV2(raw);
  assert(
    "AV16",
    deepStable(a) === deepStable(b),
    "repeated validation identical",
  );
  const good = createBaseAnswers();
  const g1 = validateAnswersV2(good);
  const g2 = validateAnswersV2(good);
  if (g1.ok && g2.ok) {
    assert(
      "AV16b",
      deepStable(g1.value.answers) === deepStable(g2.value.answers),
      "repeated success answers identical",
    );
  } else {
    fail("AV16b", "expected success");
  }
}

// AV17 — invalid never yields value
{
  const result = validateAnswersV2({ bad: true });
  assert(
    "AV17",
    result.ok === false && !("value" in result),
    "invalid never yields ValidatedAnswersV2 value",
  );
}

console.log(
  `Career Test V2 answers selftest: ${passed} passed, ${failed} failed`,
);
console.log(
  "NOTE: option-not-in-question not executed — unreachable under sealed a–d bank.",
);
if (failed > 0) {
  process.exit(1);
}
