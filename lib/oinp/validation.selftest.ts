/**
 * Executable validation fixtures for P3.2.1 (no external test runner).
 *
 * Run: pnpm dlx tsx lib/oinp/validation.selftest.ts
 */

import { calculateOwpEoi } from "./calculator";
import type { OwpScoringInput } from "./types";
import { validateOwpInput } from "./validation";

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

function assertValid(name: string, input: OwpScoringInput): void {
  const result = validateOwpInput(input);
  assert(result.ok === true, `${name}: expected ok`);
  if (result.ok) {
    assert(result.input.applicantKind === "job-offer", `${name}: applicantKind`);
  }
}

function assertInvalid(
  name: string,
  input: OwpScoringInput,
  code: string,
  field?: string,
): void {
  const result = validateOwpInput(input);
  assert(result.ok === false, `${name}: expected failure`);
  if (!result.ok) {
    assert(result.code === code, `${name}: code expected ${code}, got ${result.code}`);
    if (field !== undefined) {
      assert(
        result.field === field,
        `${name}: field expected ${field}, got ${String(result.field)}`,
      );
    }
  }
}

// —— Valid ——
assertValid("1. ordinary/low profile", baseValid());

assertValid(
  "2. high profile",
  baseValid({
    nocTeerOptionId: "teer-0-1",
    nocBroadOptionId: "broad-3",
    wageOptionId: "wage-40-plus",
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "in-offer-over-24",
    },
    earningsOptionId: "earnings-70k-plus",
    educationOptionId: "education-doctorate-or-professional-health",
    canadianCredentialOptionId: "canadian-credential-more-than-one",
    languageAbilityOptionId: "language-clb-9-or-higher",
    languageKnowledgeOptionId: "language-knowledge-two-official",
    regionOptionId: "region-northern-ontario",
  }),
);

assertValid(
  "3. in-offer OWE branch",
  baseValid({
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "in-offer-13-24",
    },
  }),
);

assertValid(
  "4. ontario-general OWE branch",
  baseValid({
    ontarioWorkExperience: {
      mode: "ontario-general",
      optionId: "ontario-general-over-24",
    },
  }),
);

assertValid(
  "5. two-language with CLB 6+",
  baseValid({
    languageAbilityOptionId: "language-clb-6",
    languageKnowledgeOptionId: "language-knowledge-two-official",
  }),
);

assertValid(
  "6. one-language with low CLB",
  baseValid({
    languageAbilityOptionId: "language-clb-5-or-lower",
    languageKnowledgeOptionId: "language-knowledge-one-official",
  }),
);

// —— Invalid ——
assertInvalid(
  "7. missing required field (empty wage)",
  baseValid({ wageOptionId: "" }),
  "empty_option_id",
  "wageOptionId",
);

assertInvalid(
  "8. unknown option ID",
  baseValid({ wageOptionId: "wage-not-real" }),
  "unknown_option_id",
  "wageOptionId",
);

assertInvalid(
  "9. TEER ID in broad field",
  baseValid({ nocBroadOptionId: "teer-0-1" }),
  "unknown_option_id",
  "nocBroadOptionId",
);

assertInvalid(
  "10. broad ID in TEER field",
  baseValid({ nocTeerOptionId: "broad-3" }),
  "unknown_option_id",
  "nocTeerOptionId",
);

assertInvalid(
  "11. OWE mode/option mismatch",
  baseValid({
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "ontario-general-over-24",
    },
  }),
  "owe_mode_option_mismatch",
  "ontarioWorkExperience.optionId",
);

assertInvalid(
  "12. physician option in Job Offer MVP",
  baseValid({
    ontarioWorkExperience: {
      mode: "in-offer-position",
      optionId: "physician-over-24",
    },
  }),
  "physician_excluded",
  "ontarioWorkExperience.optionId",
);

assertInvalid(
  "13. two-language with CLB 5 or lower",
  baseValid({
    languageAbilityOptionId: "language-clb-5-or-lower",
    languageKnowledgeOptionId: "language-knowledge-two-official",
  }),
  "language_combo_invalid",
  "languageKnowledgeOptionId",
);

assertInvalid(
  "14. empty string ID",
  baseValid({ regionOptionId: "   " }),
  "empty_option_id",
  "regionOptionId",
);

assertInvalid(
  "15. wrong applicantKind",
  { ...baseValid(), applicantKind: "physician" as "job-offer" },
  "invalid_applicant_kind",
  "applicantKind",
);

assertInvalid(
  "16. malformed OWE object",
  {
    ...baseValid(),
    ontarioWorkExperience: null as unknown as OwpScoringInput["ontarioWorkExperience"],
  },
  "owe_malformed",
  "ontarioWorkExperience",
);

// Trim behavior
{
  const result = validateOwpInput(
    baseValid({ wageOptionId: "  wage-30-34.99  " }),
  );
  assert(result.ok === true, "trim: expected ok");
  if (result.ok) {
    assert(
      result.input.wageOptionId === "wage-30-34.99",
      "trim: wage id trimmed",
    );
  }
}

// Calculator scoring (P3.2.2)
{
  const failCalc = calculateOwpEoi(baseValid({ wageOptionId: "" }));
  assert(failCalc.ok === false, "calculator: validation failure");

  const scored = calculateOwpEoi(baseValid());
  assert(scored.ok === true, "calculator: scoring success");
  if (scored.ok) {
    assert(
      scored.result.scoringStatus === "implemented",
      "calculator: implemented",
    );
    assert(scored.result.total === 80, "calculator: ordinary total 80");
    assert(
      scored.result.breakdown.length === 11,
      "calculator: 11 breakdown rows",
    );
  }
}

console.log(`Owp validation selftest: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
