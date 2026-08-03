/**
 * Career Test V2 — normalize / buildUserProfileV2 selftest (V2.4C4).
 *
 * Run: pnpm dlx tsx lib/career-test/v2/normalize.selftest.ts
 *  or: npx tsx lib/career-test/v2/normalize.selftest.ts
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";
import { validateAnswersV2 } from "./answers";
import type { ValidatedAnswersV2 } from "./answers";
import {
  QUESTION_IDS_V2,
  OCCUPATION_FAMILY_IDS_V2,
  CAREER_TEST_V2_VERSION,
  CAREER_TEST_V2_SCHEMA_VERSION,
} from "./ids";
import {
  SCORING_COMPONENT_KEYS_V2,
  SOFT_DIMENSION_KEYS_V2,
  WORK_STYLE_SUB_KEYS_V2,
} from "./dimensions";
import { buildUserProfileV2 } from "./normalize";
import { FIXED_POINT_SCALE } from "./scoring";
import type { UserProfileV2 } from "./profiles";

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

function deepStable(value: unknown): string {
  return JSON.stringify(value);
}

function createBaseAnswers(
  overrides: Record<string, string> = {},
): Record<string, string> {
  const raw: Record<string, string> = {};
  for (const id of QUESTION_IDS_V2) {
    raw[id] = "a";
  }
  return { ...raw, ...overrides };
}

function mustValidate(raw: unknown): ValidatedAnswersV2 {
  const result = validateAnswersV2(raw);
  if (!result.ok) {
    throw new Error(`expected valid answers: ${deepStable(result.errors)}`);
  }
  return result.value;
}

function profileFrom(overrides: Record<string, string> = {}): UserProfileV2 {
  return buildUserProfileV2(mustValidate(createBaseAnswers(overrides)));
}

function profileSnapshot(p: UserProfileV2): string {
  return deepStable({
    constraints: p.constraints,
    soft: p.soft,
    familyAffinity: p.familyAffinity,
    meta: p.meta,
    active: [...(p.activeComponents ?? [])],
  });
}

// N1 — 11 soft keys
{
  const p = profileFrom();
  assert(
    "N1",
    SOFT_DIMENSION_KEYS_V2.every((k) => k in p.soft),
    "soft has all 11 top-level keys",
  );
}

// N2 — 5 workStyle subs
{
  const p = profileFrom();
  assert(
    "N2",
    WORK_STYLE_SUB_KEYS_V2.every((k) => k in p.soft.workStyleFit),
    "workStyleFit has 5 subkeys",
  );
}

// N3 — 12 affinity keys
{
  const p = profileFrom();
  assert(
    "N3",
    OCCUPATION_FAMILY_IDS_V2.every((k) => k in p.familyAffinity) &&
      Object.keys(p.familyAffinity).length === 12,
    "familyAffinity has 12 keys",
  );
}

// N4 / N5 — neutrals null; zero-hit affinity 0 (all interest d)
{
  const interestNeutral = Object.fromEntries(
    QUESTION_IDS_V2.filter((id) => id.startsWith("v2-i")).map((id) => [
      id,
      "d",
    ]),
  ) as Record<string, string>;
  const p = profileFrom({
    ...interestNeutral,
    "v2-c04": "d",
    "v2-c05": "d",
    "v2-c06": "d",
    "v2-p01": "d",
    "v2-p02": "d",
    "v2-p03": "d",
    "v2-p05": "d",
    "v2-p06": "d",
    "v2-p07": "d",
    "v2-p08": "d",
    "v2-p09": "d",
    "v2-p10": "d",
  });
  assert(
    "N4",
    p.soft.trainingDurationTolerance === null &&
      p.soft.careerEntryPracticality === null &&
      p.soft.stabilityVersusUpside === null &&
      p.soft.workStyleFit.independentTeam === null,
    "neutral soft values are explicit null",
  );
  assert(
    "N5",
    OCCUPATION_FAMILY_IDS_V2.every((f) => p.familyAffinity[f] === 0),
    "zero-hit affinity values are 0",
  );
}

// N6 — c01(a) HF + schedule 0; p10 ignored
{
  const p = profileFrom({ "v2-c01": "a", "v2-p10": "c" });
  assert(
    "N6",
    p.constraints.rejectsNightOrRotating === true &&
      p.soft.shiftScheduleTolerance === 0,
    "c01(a) HF + schedule 0 (p10 ignored)",
  );
}

// N7 — c02(a)
{
  const p = profileFrom({ "v2-c02": "a" });
  assert(
    "N7",
    p.constraints.rejectsHeavyPhysical === true &&
      p.soft.physicalDemandTolerance === 0,
    "c02(a) HF + physical 0",
  );
}

// N8 / N9 — English never HF
{
  const p = profileFrom({
    "v2-c01": "b",
    "v2-c02": "b",
    "v2-c03": "a",
  });
  assert(
    "N8",
    p.constraints.rejectsNightOrRotating === false &&
      p.constraints.rejectsHeavyPhysical === false,
    "soft c01/c02 + low English → no HF",
  );
  assert(
    "N9",
    p.soft.englishReadiness === 0,
    "English soft mapped; never sets HF flags",
  );
}

// N10–N14 — schedule merge
{
  assert(
    "N10",
    profileFrom({ "v2-c01": "b", "v2-p10": "c" }).soft
      .shiftScheduleTolerance === 5000,
    "c01(b)+p10(c) → 5000",
  );
  assert(
    "N11",
    profileFrom({ "v2-c01": "c", "v2-p10": "d" }).soft
      .shiftScheduleTolerance === 5000,
    "c01(c)+p10(d) → 5000",
  );
  assert(
    "N12",
    profileFrom({ "v2-c01": "d", "v2-p10": "d" }).soft
      .shiftScheduleTolerance === 10000,
    "c01(d)+p10(d) → 10000",
  );
  // N13 — distinct two-contributor mean (not the N11 one-active case; not N14's 2500)
  assert(
    "N13",
    profileFrom({ "v2-c01": "c", "v2-p10": "c" }).soft
      .shiftScheduleTolerance === 7500,
    "c01(c)+p10(c) mean → 7500",
  );
  // N14 — mean half-up: c01(b)=0 + p10(b)=5000 → 2500
  assert(
    "N14",
    profileFrom({ "v2-c01": "b", "v2-p10": "b" }).soft
      .shiftScheduleTolerance === 2500,
    "mean round-half-up 0+5000 → 2500",
  );
}

// N15 — fixed-point 0 remains active
{
  const p = profileFrom({ "v2-c01": "a" });
  assert(
    "N15",
    p.soft.shiftScheduleTolerance === 0 &&
      [...(p.activeComponents ?? [])].includes("shiftScheduleTolerance"),
    "schedule 0 remains active",
  );
}

// N16 — 4-level c03 and p04
{
  const c03 = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-c03": o }).soft.englishReadiness,
  );
  const p04 = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-p04": o }).soft.customerFacingTolerance,
  );
  assert(
    "N16",
    deepStable(c03) === deepStable([0, 3333, 6667, 10000]) &&
      deepStable(p04) === deepStable([0, 3333, 6667, 10000]),
    "4-level maps 0/3333/6667/10000",
  );
}

// N17 / N18 — 3-level + c05(b)
{
  const c04 = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-c04": o }).soft.trainingDurationTolerance,
  );
  const c05 = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-c05": o }).soft.formalEntryWillingness,
  );
  const p01 = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-p01": o }).soft.workStyleFit.independentTeam,
  );
  assert(
    "N17",
    deepStable(c04) === deepStable([0, 5000, 10000, null]) &&
      deepStable(c05) === deepStable([0, 5000, 10000, null]) &&
      deepStable(p01) === deepStable([0, 5000, 10000, null]),
    "3-level maps 0/5000/10000/null",
  );
  assert("N18", c05[1] === 5000, "c05(b) naturally 5000");
}

// N19 — tradeoff
{
  const trade = ["a", "b", "c", "d"].map(
    (o) => profileFrom({ "v2-p07": o }).soft.stabilityVersusUpside,
  );
  assert(
    "N19",
    deepStable(trade) === deepStable([0, 5000, 10000, null]),
    "tradeoff 0/5000/10000/null",
  );
}

// N20 / N21 — p08 separate
{
  const p = profileFrom({
    "v2-p01": "d",
    "v2-p02": "d",
    "v2-p05": "d",
    "v2-p06": "d",
    "v2-p09": "d",
    "v2-p08": "c",
  });
  assert(
    "N20",
    p.soft.detailVersusCoordination === 10000,
    "p08 populates detailVersusCoordination",
  );
  assert(
    "N21",
    WORK_STYLE_SUB_KEYS_V2.every((k) => p.soft.workStyleFit[k] === null),
    "p08 never populates workStyleFit",
  );
}

// N22 / N23 / N24 — workStyle activity
{
  const off = profileFrom({
    "v2-p01": "d",
    "v2-p02": "d",
    "v2-p05": "d",
    "v2-p06": "d",
    "v2-p09": "d",
  });
  assert(
    "N22",
    ![...(off.activeComponents ?? [])].includes("workStyleFit"),
    "all-neutral workStyle inactive",
  );
  const on = profileFrom({
    "v2-p01": "b",
    "v2-p02": "d",
    "v2-p05": "d",
    "v2-p06": "d",
    "v2-p09": "d",
  });
  assert(
    "N23",
    [...(on.activeComponents ?? [])].includes("workStyleFit"),
    "one non-null sub activates workStyleFit",
  );
  const zero = profileFrom({
    "v2-p01": "a",
    "v2-p02": "d",
    "v2-p05": "d",
    "v2-p06": "d",
    "v2-p09": "d",
  });
  assert(
    "N24",
    zero.soft.workStyleFit.independentTeam === 0 &&
      [...(zero.activeComponents ?? [])].includes("workStyleFit"),
    "zero-valued workStyle sub still activates",
  );
}

// N25 — all interest d
{
  const interestNeutral = Object.fromEntries(
    QUESTION_IDS_V2.filter((id) => id.startsWith("v2-i")).map((id) => [
      id,
      "d",
    ]),
  ) as Record<string, string>;
  const p = profileFrom(interestNeutral);
  assert(
    "N25",
    OCCUPATION_FAMILY_IDS_V2.every((f) => p.familyAffinity[f] === 0) &&
      ![...(p.activeComponents ?? [])].includes("fieldInterestAffinity"),
    "all interest d → twelve zeros + affinity inactive",
  );
}

// N26 / N27 / N28 — full 2- and 3-appearance families
{
  const mfg = profileFrom({ "v2-i01": "c", "v2-i04": "c" }).familyAffinity[
    "manufacturing-production"
  ];
  const skilled = profileFrom({
    "v2-i01": "a",
    "v2-i06": "a",
    "v2-i08": "a",
  }).familyAffinity["skilled-trades"];
  assert("N26", mfg === 10000, "2-appearance family can reach 10000");
  assert("N27", skilled === 10000, "3-appearance family can reach 10000");
  const all = profileFrom({
    "v2-i01": "a",
    "v2-i02": "a",
    "v2-i03": "a",
    "v2-i04": "a",
    "v2-i05": "a",
    "v2-i06": "a",
    "v2-i07": "a",
    "v2-i08": "a",
    "v2-i09": "a",
    "v2-i10": "a",
  });
  assert(
    "N28",
    OCCUPATION_FAMILY_IDS_V2.every(
      (f) => all.familyAffinity[f] <= FIXED_POINT_SCALE,
    ) &&
      mfg === FIXED_POINT_SCALE &&
      skilled === FIXED_POINT_SCALE,
    "no affinity value exceeds FIXED_POINT_SCALE",
  );
}

// N29 — activeComponents order
{
  const p = profileFrom();
  const keys = [...(p.activeComponents ?? [])];
  const ok = keys.every(
    (k, i, arr) =>
      i === 0 ||
      SCORING_COMPONENT_KEYS_V2.indexOf(k) >
        SCORING_COMPONENT_KEYS_V2.indexOf(arr[i - 1]!),
  );
  assert("N29", ok, "activeComponents follows SCORING_COMPONENT_KEYS_V2 order");
}

// N30 / N31 — zero active; null absent
{
  const p = profileFrom({ "v2-c01": "a", "v2-c02": "a", "v2-c04": "d" });
  const active = [...(p.activeComponents ?? [])];
  assert(
    "N30",
    active.includes("shiftScheduleTolerance") &&
      active.includes("physicalDemandTolerance"),
    "zero-valued schedule/physical remain active",
  );
  assert(
    "N31",
    !active.includes("trainingDurationTolerance"),
    "null trainingDuration absent from activeComponents",
  );
}

// X1 — validate → normalize
{
  const validated = mustValidate(createBaseAnswers({ "v2-c03": "c" }));
  const p = buildUserProfileV2(validated);
  assert(
    "X1",
    p.soft.englishReadiness === 6667 &&
      p.meta.careerTestVersion === CAREER_TEST_V2_VERSION &&
      p.meta.schemaVersion === CAREER_TEST_V2_SCHEMA_VERSION,
    "validate success feeds buildUserProfileV2",
  );
}

// X2 — invalid has no value path
{
  const result = validateAnswersV2(null);
  assert(
    "X2",
    result.ok === false && !("value" in result),
    "invalid raw cannot enter normalization via success path",
  );
}

// X3 / N34 — no mutation
{
  const validated = mustValidate(createBaseAnswers({ "v2-p10": "b" }));
  const beforeAnswers = deepStable(validated.answers);
  const beforeWrapper = deepStable({
    answers: validated.answers,
    symbols: Object.getOwnPropertySymbols(validated).length,
  });
  buildUserProfileV2(validated);
  assert(
    "N34",
    deepStable(validated.answers) === beforeAnswers &&
      deepStable({
        answers: validated.answers,
        symbols: Object.getOwnPropertySymbols(validated).length,
      }) === beforeWrapper,
    "ValidatedAnswersV2 / answers not mutated",
  );
}

// N35 — deterministic
{
  const validated = mustValidate(createBaseAnswers({ "v2-c01": "b", "v2-p10": "c" }));
  const a = buildUserProfileV2(validated);
  const b = buildUserProfileV2(validated);
  assert(
    "N35",
    profileSnapshot(a) === profileSnapshot(b),
    "repeated calls deep-equal",
  );
}

// X3 — AST import-boundary policy (TypeScript parser; local helper only)
function auditImportPolicy(sourceText: string): readonly string[] {
  // Fixed allowlist — not derived from imports found in sourceText.
  const ALLOWED_IMPORT_SPECIFIERS = new Set<string>([
    "node:fs",
    "node:url",
    "typescript",
    "./answers",
    "./ids",
    "./dimensions",
    "./normalize",
    "./scoring",
    "./profiles",
  ]);
  const BANNED_PATH_PATTERNS: Array<{ re: RegExp; label: string }> = [
    { re: /(?:^|\/)questions(?:\.ts)?$/, label: "V1 questions" },
    { re: /career-data/, label: "V1 career-data" },
    { re: /recommend-careers/, label: "V1 recommend-careers" },
    { re: /(^|\/)app\//, label: "app/" },
    { re: /components\//, label: "components/" },
    { re: /react/i, label: "React/UI" },
    { re: /unlock/i, label: "unlock" },
    { re: /(routing|next\/navigation|next\/router)/i, label: "routing" },
    { re: /career-catalog|career\/data/i, label: "career catalog/data" },
    { re: /(ranking|diversity)/i, label: "ranking/diversity" },
    { re: /(localStorage|window|document)/i, label: "browser/localStorage" },
  ];

  const reasons: string[] = [];
  const sourceFile = ts.createSourceFile(
    "import-policy-audit.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ts.ScriptKind.TS,
  );

  let scoringImportDeclarations = 0;

  function rejectPath(spec: string, context: string): void {
    if (spec.includes("..")) {
      reasons.push(`${context}: ${spec} (parent traversal)`);
    }
    for (const { re, label } of BANNED_PATH_PATTERNS) {
      if (re.test(spec)) {
        reasons.push(`${context}: ${spec} (${label})`);
      }
    }
    if (!ALLOWED_IMPORT_SPECIFIERS.has(spec)) {
      reasons.push(`${context}: ${spec} (not on allowlist)`);
    }
  }

  function auditScoringImport(node: ts.ImportDeclaration): void {
    scoringImportDeclarations += 1;
    const clause = node.importClause;
    if (!clause) {
      reasons.push('./scoring: side-effect import forbidden');
      return;
    }
    if (clause.isTypeOnly) {
      reasons.push("./scoring: type-only import forbidden");
      return;
    }
    if (clause.name) {
      reasons.push("./scoring: default import forbidden");
    }
    if (!clause.namedBindings) {
      reasons.push("./scoring: missing named bindings");
      return;
    }
    if (ts.isNamespaceImport(clause.namedBindings)) {
      reasons.push("./scoring: namespace import forbidden");
      return;
    }
    if (!ts.isNamedImports(clause.namedBindings)) {
      reasons.push("./scoring: expected named imports");
      return;
    }
    const elements = clause.namedBindings.elements;
    if (elements.length !== 1) {
      reasons.push(
        `./scoring: expected exactly one named binding, got ${elements.length}`,
      );
      return;
    }
    const el = elements[0]!;
    if (el.isTypeOnly) {
      reasons.push("./scoring: type-only named binding forbidden");
    }
    if (el.propertyName !== undefined) {
      reasons.push("./scoring: aliased binding forbidden");
    }
    if (el.name.text !== "FIXED_POINT_SCALE") {
      reasons.push(`./scoring: unexpected binding ${el.name.text}`);
    }
  }

  function visit(node: ts.Node): void {
    if (ts.isImportDeclaration(node)) {
      const mod = node.moduleSpecifier;
      if (!ts.isStringLiteralLike(mod)) {
        reasons.push("static import: non-literal module specifier");
      } else {
        const spec = mod.text;
        rejectPath(spec, "static import");
        if (spec === "./scoring") {
          auditScoringImport(node);
        }
      }
    }

    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      reasons.push("dynamic import(...) forbidden");
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (scoringImportDeclarations > 1) {
    reasons.push(
      `./scoring: more than one import declaration (${scoringImportDeclarations})`,
    );
  }

  return reasons;
}

function policyClean(sourceText: string): boolean {
  return auditImportPolicy(sourceText).length === 0;
}

function policyRejects(sourceText: string): boolean {
  return auditImportPolicy(sourceText).length > 0;
}

// X3 — this file must satisfy the import policy
{
  const selfSrc = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const selfReasons = auditImportPolicy(selfSrc);
  assert(
    "X3",
    selfReasons.length === 0,
    selfReasons.length === 0
      ? "normalize.selftest.ts satisfies AST import policy"
      : `forbidden: ${selfReasons.join("; ")}`,
  );
}

// X3A–X3I — in-memory negative controls (no temp files)
{
  assert(
    "X3A",
    policyClean('import { FIXED_POINT_SCALE } from "./scoring";'),
    "allows FIXED_POINT_SCALE from ./scoring",
  );
  assert(
    "X3B",
    policyRejects('import { someFutureProductionWeights } from "./scoring";'),
    "rejects someFutureProductionWeights from ./scoring",
  );
  assert(
    "X3C",
    policyRejects(
      'import { FIXED_POINT_SCALE, someFutureProductionWeights } from "./scoring";',
    ),
    "rejects multi-binding ./scoring import",
  );
  assert(
    "X3D",
    policyRejects('import("@/lib/career-data");'),
    "rejects dynamic import(@/lib/career-data)",
  );
  assert(
    "X3E",
    policyRejects('import React from "react";'),
    "rejects react default import",
  );
  assert(
    "X3F",
    policyRejects('import { rank } from "./ranking";'),
    "rejects ./ranking",
  );
  assert(
    "X3G",
    policyRejects('import { questions } from "../../questions";'),
    "rejects ../../questions",
  );
  assert(
    "X3H",
    policyRejects('import { x } from "../v1";'),
    "rejects ../v1",
  );
  assert(
    "X3I",
    policyClean(`
      // from "./ranking"
      // import { questions } from "../../questions";
      const decoy = 'import("@/lib/career-data)"; from "./scoring";';
    `),
    "comment/string import-like text is not a false positive",
  );
}

console.log(
  `Career Test V2 normalize selftest: ${passed} passed, ${failed} failed`,
);
if (failed > 0) {
  process.exit(1);
}
