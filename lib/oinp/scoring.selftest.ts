/**
 * Executable scoring fixtures for P3.2.2 (no external test runner).
 *
 * Expected totals are hand-calculated from Human-Verified table points only.
 *
 * Run: pnpm dlx tsx lib/oinp/scoring.selftest.ts
 */

import { calculateOwpEoi } from "./calculator";
import type { OwpScoringInput } from "./types";
import { validateOwpInput } from "./validation";

const BREAKDOWN_ORDER = [
  "job-teer",
  "job-broad",
  "wage",
  "ontario-work-experience",
  "earnings",
  "status",
  "education",
  "canadian-credential",
  "language-ability",
  "language-knowledge",
  "region",
] as const;

function baseValid(overrides: Partial<OwpScoringInput> = {}): OwpScoringInput {
  const base: OwpScoringInput = {
    applicantKind: "job-offer",
    nocTeerOptionId: "teer-2-3",
    nocBroadOptionId: "broad-2",
    wageOptionId: "wage-25-29.99",
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "in-offer-6-12",
    },
    earningsOptionId: "earnings-30k-49999",
    statusOptionId: "status-valid-work-permit",
    educationOptionId: "education-bachelors",
    canadianCredentialOptionId: "canadian-credential-one",
    languageAbilityOptionId: "language-clb-7",
    languageKnowledgeOptionId: "language-knowledge-one-official",
    regionOptionId: "region-eastern-ontario",
  };
  return {
    ...base,
    ...overrides,
    ontarioWorkExperience: {
      ...base.ontarioWorkExperience,
      ...(overrides.ontarioWorkExperience ?? {}),
    },
  };
}

/** High profile — HV points: 9+10+15+18+8+10+10+10+15+10+15 = 130 */
const HIGH_PROFILE = baseValid({
  nocTeerOptionId: "teer-0-1",
  nocBroadOptionId: "broad-3",
  wageOptionId: "wage-40-plus",
  ontarioWorkExperience: {
    mode: "in-offer-position",
    optionId: "in-offer-over-24",
  },
  earningsOptionId: "earnings-70k-plus",
  statusOptionId: "status-valid-work-permit",
  educationOptionId: "education-doctorate-or-professional-health",
  canadianCredentialOptionId: "canadian-credential-more-than-one",
  languageAbilityOptionId: "language-clb-9-or-higher",
  languageKnowledgeOptionId: "language-knowledge-two-official",
  regionOptionId: "region-northern-ontario",
});
const HIGH_TOTAL = 130;

/** Low profile — HV points: 0+2+0+0+0+0+0+0+0+5+0 = 7 */
const LOW_PROFILE = baseValid({
  nocTeerOptionId: "teer-5",
  nocBroadOptionId: "broad-5-6",
  wageOptionId: "wage-under-20",
  ontarioWorkExperience: {
    mode: "in-offer-position",
    optionId: "in-offer-under-6-or-not",
  },
  earningsOptionId: "earnings-under-30k",
  statusOptionId: "status-without-valid-work-or-study-permit",
  educationOptionId: "education-less-than-college-or-trade",
  canadianCredentialOptionId: "canadian-credential-none",
  languageAbilityOptionId: "language-clb-5-or-lower",
  languageKnowledgeOptionId: "language-knowledge-one-official",
  regionOptionId: "region-toronto",
});
const LOW_TOTAL = 7;

/** Ordinary base — 6+6+8+12+4+10+6+5+8+5+10 = 80 */
const ORDINARY_TOTAL = 80;

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string): void {
  if (condition) {
    passed += 1;
    return;
  }
  failed += 1;
  console.error(`FAIL: ${message}`);
}

function assertSuccessTotal(
  name: string,
  input: OwpScoringInput,
  expectedTotal: number,
): void {
  const result = calculateOwpEoi(input);
  assert(result.ok === true, `${name}: expected ok`);
  if (!result.ok) return;
  assert(
    result.result.scoringStatus === "implemented",
    `${name}: scoringStatus implemented`,
  );
  assert(
    result.result.total === expectedTotal,
    `${name}: total expected ${expectedTotal}, got ${result.result.total}`,
  );
  assert(
    result.result.breakdown.length === 11,
    `${name}: 11 breakdown rows, got ${result.result.breakdown.length}`,
  );
  const sum = result.result.breakdown.reduce((s, r) => s + r.value, 0);
  assert(sum === result.result.total, `${name}: total equals breakdown sum`);
  for (let i = 0; i < BREAKDOWN_ORDER.length; i += 1) {
    assert(
      result.result.breakdown[i]?.id === BREAKDOWN_ORDER[i],
      `${name}: breakdown[${i}] expected ${BREAKDOWN_ORDER[i]}, got ${result.result.breakdown[i]?.id}`,
    );
  }
}

function pointsFor(
  input: OwpScoringInput,
  factorId: string,
): number | undefined {
  const result = calculateOwpEoi(input);
  if (!result.ok) return undefined;
  return result.result.breakdown.find((r) => r.id === factorId)?.value;
}

// —— A / B high & low ——
assertSuccessTotal("A. high profile", HIGH_PROFILE, HIGH_TOTAL);
assertSuccessTotal("B. low profile", LOW_PROFILE, LOW_TOTAL);
assertSuccessTotal("ordinary base", baseValid(), ORDINARY_TOTAL);

// —— C simple factor min / max / mid ——
assert(
  pointsFor(baseValid({ wageOptionId: "wage-under-20" }), "wage") === 0,
  "C. wage min 0",
);
assert(
  pointsFor(baseValid({ wageOptionId: "wage-40-plus" }), "wage") === 15,
  "C. wage max 15",
);
assert(
  pointsFor(baseValid({ wageOptionId: "wage-30-34.99" }), "wage") === 10,
  "C. wage mid 10",
);
assert(
  pointsFor(baseValid({ earningsOptionId: "earnings-under-30k" }), "earnings") ===
    0,
  "C. earnings min",
);
assert(
  pointsFor(baseValid({ earningsOptionId: "earnings-70k-plus" }), "earnings") ===
    8,
  "C. earnings max",
);
assert(
  pointsFor(
    baseValid({ statusOptionId: "status-without-valid-work-or-study-permit" }),
    "status",
  ) === 0,
  "C. status min",
);
assert(
  pointsFor(
    baseValid({ statusOptionId: "status-valid-work-permit" }),
    "status",
  ) === 10,
  "C. status max",
);
assert(
  pointsFor(
    baseValid({
      educationOptionId: "education-less-than-college-or-trade",
    }),
    "education",
  ) === 0,
  "C. education min",
);
assert(
  pointsFor(
    baseValid({
      educationOptionId: "education-doctorate-or-professional-health",
    }),
    "education",
  ) === 10,
  "C. education max",
);
assert(
  pointsFor(
    baseValid({ canadianCredentialOptionId: "canadian-credential-none" }),
    "canadian-credential",
  ) === 0,
  "C. credential min",
);
assert(
  pointsFor(
    baseValid({
      canadianCredentialOptionId: "canadian-credential-more-than-one",
    }),
    "canadian-credential",
  ) === 10,
  "C. credential max",
);
assert(
  pointsFor(baseValid({ regionOptionId: "region-toronto" }), "region") === 0,
  "C. region min",
);
assert(
  pointsFor(
    baseValid({ regionOptionId: "region-northern-ontario" }),
    "region",
  ) === 15,
  "C. region max",
);

// —— D Job additive ——
{
  const result = calculateOwpEoi(
    baseValid({
      nocTeerOptionId: "teer-0-1",
      nocBroadOptionId: "broad-3",
    }),
  );
  assert(result.ok === true, "D. job ok");
  if (result.ok) {
    const teer = result.result.breakdown.find((r) => r.id === "job-teer");
    const broad = result.result.breakdown.find((r) => r.id === "job-broad");
    assert(teer?.value === 9, "D. TEER 9");
    assert(broad?.value === 10, "D. broad 10");
    assert(
      (teer?.value ?? 0) + (broad?.value ?? 0) === 19,
      "D. TEER+broad additive 19",
    );
  }
}

// —— E OWE ——
assertSuccessTotal(
  "E. in-offer branch",
  baseValid({
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "in-offer-13-24",
    },
  }),
  ORDINARY_TOTAL - 12 + 15,
);
assertSuccessTotal(
  "E. ontario-general branch",
  baseValid({
    ontarioWorkExperience: {
      mode: "ontario-general",
      optionId: "ontario-general-over-24",
    },
  }),
  ORDINARY_TOTAL - 12 + 12,
);
{
  const physician = calculateOwpEoi(
    baseValid({
      ontarioWorkExperience: {
        mode: "in-offer-position",
        optionId: "physician-over-24",
      },
    }),
  );
  assert(physician.ok === false, "E. physician rejected");
  const mismatch = calculateOwpEoi(
    baseValid({
      ontarioWorkExperience: {
        mode: "in-offer-position",
        optionId: "ontario-general-over-24",
      },
    }),
  );
  assert(mismatch.ok === false, "E. mode/option mismatch rejected");
  const under6 = calculateOwpEoi(
    baseValid({
      ontarioWorkExperience: {
        mode: "in-offer-position",
        optionId: "in-offer-under-6-or-not",
      },
    }),
  );
  assert(under6.ok === true, "E. under-6 in-offer allowed (0 pts)");
  if (under6.ok) {
    const owe = under6.result.breakdown.find(
      (r) => r.id === "ontario-work-experience",
    );
    assert(owe?.value === 0, "E. under-6 scores 0 only — no dual branch");
    assert(
      typeof owe?.note === "string" && owe.note.includes("Ontario-general"),
      "E. under-6 documents UI general-branch guidance",
    );
  }
}

// —— F Language ——
{
  const additive = calculateOwpEoi(
    baseValid({
      languageAbilityOptionId: "language-clb-8",
      languageKnowledgeOptionId: "language-knowledge-two-official",
    }),
  );
  assert(additive.ok === true, "F. language ok");
  if (additive.ok) {
    const ability = additive.result.breakdown.find(
      (r) => r.id === "language-ability",
    );
    const knowledge = additive.result.breakdown.find(
      (r) => r.id === "language-knowledge",
    );
    assert(ability?.value === 12, "F. ability 12");
    assert(knowledge?.value === 10, "F. knowledge 10");
    assert(
      (ability?.value ?? 0) + (knowledge?.value ?? 0) === 22,
      "F. language additive 22",
    );
  }
  const rejected = calculateOwpEoi(
    baseValid({
      languageAbilityOptionId: "language-clb-5-or-lower",
      languageKnowledgeOptionId: "language-knowledge-two-official",
    }),
  );
  assert(rejected.ok === false, "F. CLB5 + two languages rejected");
  const accepted = calculateOwpEoi(
    baseValid({
      languageAbilityOptionId: "language-clb-6",
      languageKnowledgeOptionId: "language-knowledge-two-official",
    }),
  );
  assert(accepted.ok === true, "F. CLB6 + two languages accepted");
  const oneLang = calculateOwpEoi(
    baseValid({
      languageAbilityOptionId: "language-clb-5-or-lower",
      languageKnowledgeOptionId: "language-knowledge-one-official",
    }),
  );
  assert(oneLang.ok === true, "F. one-language low CLB accepted");
}

// —— G unknown option IDs ——
for (const [field, bad] of [
  ["wageOptionId", { wageOptionId: "wage-fake" }],
  ["earningsOptionId", { earningsOptionId: "earnings-fake" }],
  ["statusOptionId", { statusOptionId: "status-fake" }],
  ["educationOptionId", { educationOptionId: "education-fake" }],
  ["canadianCredentialOptionId", { canadianCredentialOptionId: "cc-fake" }],
  ["regionOptionId", { regionOptionId: "region-fake" }],
  ["nocTeerOptionId", { nocTeerOptionId: "teer-fake" }],
  ["nocBroadOptionId", { nocBroadOptionId: "broad-fake" }],
  ["languageAbilityOptionId", { languageAbilityOptionId: "language-clb-fake" }],
  [
    "languageKnowledgeOptionId",
    { languageKnowledgeOptionId: "language-knowledge-fake" },
  ],
] as const) {
  const result = calculateOwpEoi(
    baseValid(bad as Partial<OwpScoringInput>),
  );
  assert(result.ok === false, `G. unknown ${field} fails`);
}

// —— H Determinism ——
{
  const a = calculateOwpEoi(HIGH_PROFILE);
  const b = calculateOwpEoi(HIGH_PROFILE);
  assert(a.ok && b.ok, "H. both ok");
  if (a.ok && b.ok) {
    assert(a.result.total === b.result.total, "H. same total");
    assert(
      JSON.stringify(a.result.breakdown) === JSON.stringify(b.result.breakdown),
      "H. same breakdown",
    );
  }
}

// —— I Validation integration ——
{
  const missing = calculateOwpEoi(baseValid({ wageOptionId: "" }));
  assert(missing.ok === false, "I. missing field fails before scoring");
  const trimmed = calculateOwpEoi(
    baseValid({ wageOptionId: "  wage-30-34.99  " }),
  );
  assert(trimmed.ok === true, "I. whitespace trimmed then scored");
  if (trimmed.ok) {
    assert(
      trimmed.result.breakdown.find((r) => r.id === "wage")?.value === 10,
      "I. trimmed wage scores 10",
    );
  }
  const unknown = validateOwpInput(baseValid({ regionOptionId: "nope" }));
  assert(unknown.ok === false, "I. unknown id fails validation");
}

// —— J already covered via assertSuccessTotal sum check ——

console.log(`Owp scoring selftest: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
