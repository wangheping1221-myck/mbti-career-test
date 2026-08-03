/**
 * Career Test V2 — question-bank selftest (V2.4C4).
 *
 * Run: pnpm dlx tsx lib/career-test/v2/question-bank.selftest.ts
 *  or: npx tsx lib/career-test/v2/question-bank.selftest.ts
 *
 * Note: option-not-in-question remains contract-retained but unreachable under
 * the sealed a–d bank; this file covers that via bank invariants (QB4–QB5),
 * not by executing the validation branch directly.
 */

import { OPTION_IDS_V2, QUESTION_IDS_V2, OCCUPATION_FAMILY_IDS_V2 } from "./ids";
import {
  QUESTION_BANK_V2,
  assertQuestionBankStructureV2,
  getAnswerOptionV2,
  getQuestionV2,
} from "./question-bank";
import { readFileSync } from "node:fs";
import path from "node:path";

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

const LOCKED_APPEARANCE_BY_FAMILY = {
  "skilled-trades": 3,
  "building-operations-facilities": 3,
  "healthcare-support": 3,
  "transportation-logistics": 3,
  "office-administration": 3,
  technology: 3,
  "manufacturing-production": 2,
  "sales-customer-service": 2,
  "education-community-services": 2,
  "hospitality-food-services": 2,
  "public-sector-institutional": 2,
  "self-employment-friendly": 2,
} as const;

// QB1
assert(
  "QB1",
  QUESTION_BANK_V2.length === 26,
  `length=${QUESTION_BANK_V2.length}`,
);

// QB2 — IDs match QUESTION_IDS_V2 in canonical order
{
  const ids = QUESTION_BANK_V2.map((q) => q.id);
  const match =
    ids.length === QUESTION_IDS_V2.length &&
    ids.every((id, i) => id === QUESTION_IDS_V2[i]);
  assert("QB2", match, "IDs match QUESTION_IDS_V2 order");
}

// QB3 — unique
{
  const ids = QUESTION_BANK_V2.map((q) => q.id);
  assert("QB3", new Set(ids).size === ids.length, "all question IDs unique");
}

// QB4 — a,b,c,d order
{
  let ok = true;
  for (const q of QUESTION_BANK_V2) {
    if (q.options.map((o) => o.id).join(",") !== "a,b,c,d") {
      ok = false;
      break;
    }
  }
  assert("QB4", ok, "every question options a,b,c,d in order");
}

// QB5 — 104 options
{
  const total = QUESTION_BANK_V2.reduce((n, q) => n + q.options.length, 0);
  assert("QB5", total === 104, `total options=${total}`);
}

// QB6 — assertQuestionBankStructureV2
{
  let threw = false;
  try {
    assertQuestionBankStructureV2();
  } catch {
    threw = true;
  }
  assert("QB6", !threw, "assertQuestionBankStructureV2 no throw");
}

// QB7 — hard-constraint activators only
{
  const hard: Array<{ q: string; o: string; c: string }> = [];
  for (const q of QUESTION_BANK_V2) {
    for (const opt of q.options) {
      if (opt.signal.kind === "hard-constraint") {
        hard.push({ q: q.id, o: opt.id, c: opt.signal.constraint });
      }
    }
  }
  const ok =
    hard.length === 2 &&
    hard[0]?.q === "v2-c01" &&
    hard[0]?.o === "a" &&
    hard[0]?.c === "rejectsNightOrRotating" &&
    hard[1]?.q === "v2-c02" &&
    hard[1]?.o === "a" &&
    hard[1]?.c === "rejectsHeavyPhysical";
  assert("QB7", ok, `hard=${JSON.stringify(hard)}`);
}

// QB8 — English never hard-filters
{
  const c03 = getQuestionV2("v2-c03");
  const ok = c03.options.every((o) => o.signal.kind !== "hard-constraint");
  assert("QB8", ok, "v2-c03 has no hard-constraint");
}

// QB9 — interest (d) neutral, no family
{
  let ok = true;
  for (const q of QUESTION_BANK_V2) {
    if (!q.id.startsWith("v2-i")) continue;
    const d = q.options.find((o) => o.id === "d");
    if (!d || d.signal.kind !== "neutral") {
      ok = false;
      break;
    }
    if ("family" in d.signal) {
      ok = false;
      break;
    }
  }
  assert("QB9", ok, "interest (d) neutral without family");
}

// QB10 / QB11 — 30 interest-family signals; one family each
{
  let count = 0;
  let ok = true;
  for (const q of QUESTION_BANK_V2) {
    if (!q.id.startsWith("v2-i")) continue;
    for (const opt of q.options) {
      if (opt.signal.kind === "interest-family") {
        count += 1;
        if (!opt.signal.family || opt.signal.polarity !== "positive") {
          ok = false;
        }
      }
    }
  }
  assert("QB10", ok && count === 30, `interest-family count=${count}`);
}

// QB12 / QB13 — appearance denominators
{
  const hits: Record<string, number> = Object.fromEntries(
    OCCUPATION_FAMILY_IDS_V2.map((f) => [f, 0]),
  );
  for (const q of QUESTION_BANK_V2) {
    if (!q.id.startsWith("v2-i")) continue;
    for (const opt of q.options) {
      if (opt.signal.kind === "interest-family") {
        hits[opt.signal.family] += 1;
      }
    }
  }
  const counts = OCCUPATION_FAMILY_IDS_V2.map((f) => hits[f] ?? -1);
  const match = OCCUPATION_FAMILY_IDS_V2.every(
    (f) => hits[f] === LOCKED_APPEARANCE_BY_FAMILY[f],
  );
  const sum = counts.reduce((a, b) => a + b, 0);
  assert(
    "QB12",
    match,
    `appearances(by OCCUPATION_FAMILY_IDS_V2)=${counts.join(",")}`,
  );
  assert("QB13", sum === 30, `appearance sum=${sum}`);
}

// QB14 — forbidden literal in bank source
{
  const bankPath = path.join(process.cwd(), "lib/career-test/v2/question-bank.ts");
  const src = readFileSync(bankPath, "utf8");
  const count = (src.match(/职业家庭/g) ?? []).length;
  assert("QB14", count === 0, `职业家庭 count=${count}`);
}

// QB15 — getters resolve 26×4
{
  let ok = true;
  for (const qid of QUESTION_IDS_V2) {
    const q = getQuestionV2(qid);
    if (q.id !== qid) {
      ok = false;
      break;
    }
    for (const oid of OPTION_IDS_V2) {
      const opt = getAnswerOptionV2(qid, oid);
      if (opt.id !== oid) {
        ok = false;
        break;
      }
    }
  }
  assert("QB15", ok, "getQuestionV2/getAnswerOptionV2 resolve 26×4");
}

console.log(
  `Career Test V2 question-bank selftest: ${passed} passed, ${failed} failed`,
);
console.log(
  "NOTE: option-not-in-question is contract-retained but unreachable under the sealed a–d bank; covered via QB4–QB6 invariants only.",
);
if (failed > 0) {
  process.exit(1);
}
