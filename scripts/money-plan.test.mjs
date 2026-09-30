import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { ageAtSnapshot, futureValue, MAX_PLAN_BYTES, monthsToRetirement, parsePlan, PLAN_STORAGE_KEY, retirementDate, summarizePlan } from "../src/workspace/money/plan/model.mjs";

// Synthetic fixture only: do not commit real personal finances in tests.
const fixture = () => ({
  version: 1, asOf: "2026-09-30", birthDate: "1990-01-24", retirementAge: 60,
  totalAssets: 90000000, debt: 0, monthlyRent: 500000, monthlySaving: 900000,
  retirementMonthly: 2500000, illustrativePrincipal: 70000000,
  goals: ["노후 준비"], allocations: [{ name: "현금", percent: 12, note: "추정치" }],
  holdings: [
    { name: "기업 A", group: "기업 A", amount: 30, gain: 10, returnPercent: 50, note: "첫 계좌" },
    { name: "기업 A", group: "기업 A", amount: 10, gain: -5, returnPercent: -33.33, note: "다른 계좌" },
    { name: "기업 B", group: "기업 B", amount: 20, gain: 5, returnPercent: 33.33, note: "화면 값" },
    { name: "ETF C", group: "ETF C", amount: 15, gain: 0, returnPercent: 0, note: "잘린 이름" },
  ], crypto: [{ name: "BTC", quantity: "0.12345678" }],
});

test("personal plan accepts validated data, preserves precision and strips unknown fields", () => {
  const data = fixture();
  assert.deepEqual(parsePlan(JSON.stringify(data)), data);
  assert.equal(parsePlan(JSON.stringify({ ...data, secret: "unused" })).secret, undefined);
  assert.equal(parsePlan(JSON.stringify(data)).crypto[0].quantity, "0.12345678");
  assert.equal(PLAN_STORAGE_KEY, "handbook.money.personal-plan.v1");
});

test("invalid, negative, huge, missing and unsupported imports fail safely", () => {
  for (const raw of ["{", "null", "[]", "{}", "x".repeat(MAX_PLAN_BYTES + 1)]) assert.throws(() => parsePlan(raw));
  for (const patch of [
    { version: 2 }, { totalAssets: -1 }, { monthlySaving: "900000" }, { debt: null },
    { asOf: "2026-02-31" }, { birthDate: "2990-01-24" }, { birthDate: "1960-01-24" }, { retirementAge: 39 },
    { allocations: [] }, { holdings: [] }, { crypto: [{ name: "BTC", quantity: "NaN" }] },
  ]) assert.throws(() => parsePlan(JSON.stringify({ ...fixture(), ...patch })));
});

test("date calculations use snapshot age and approximate calendar months, not today's age", () => {
  const data = fixture();
  assert.equal(ageAtSnapshot(data), 36);
  assert.equal(ageAtSnapshot({ ...data, asOf: "2026-01-01" }), 35);
  assert.equal(retirementDate(data), "2050-01-24");
  assert.equal(monthsToRetirement(data), 280);
});

test("compound scenarios use effective annual rates and month-end deposits", () => {
  assert.equal(futureValue(100, 10, 12, 0), 220);
  assert.ok(Math.abs(futureValue(100, 0, 12, .05) - 105) < 1e-8);
  assert.ok(Math.abs(futureValue(100, 10, 1, Math.pow(1.01, 12) - 1) - 111) < 1e-8);
  assert.equal(futureValue(100, 10, 0, .05), 100);
  const summary = summarizePlan(fixture());
  for (const row of summary.projections) {
    let balance = fixture().illustrativePrincipal;
    const monthly = Math.pow(1 + row.rate, 1 / 12) - 1;
    for (let month = 0; month < summary.months; month++) balance = balance * (1 + monthly) + fixture().monthlySaving;
    assert.ok(Math.abs(row.nominal - balance) < .01);
    assert.ok(Math.abs(row.real * summary.inflationFactor - row.nominal) < .01);
  }
});

test("holdings consolidate only explicit groups and never manufacture crypto valuations", () => {
  const summary = summarizePlan(fixture());
  assert.equal(summary.listedTotal, 75);
  assert.deepEqual(summary.topTwo, [["기업 A", 40], ["기업 B", 20]]);
  assert.equal(summary.topTwoPercent, 80);
  assert.equal(summary.allocationPercent, 12); // Not normalized to 100.
  assert.equal(summary.cryptoValue, undefined);
  assert.equal(summarizePlan({ ...fixture(), holdings: [], totalAssets: 0 }).topTwoPercent, null);
});

test("the plan stays local with explicit privacy copy, confirmations and accessible tables", () => {
  const path = new URL("../src/workspace/money/plan/", import.meta.url);
  const source = name => readFileSync(new URL(name, path), "utf8");
  const page = source("PersonalPlan.tsx");
  for (const token of ["localStorage.getItem(PLAN_STORAGE_KEY)", "localStorage.setItem(PLAN_STORAGE_KEY", "localStorage.removeItem(PLAN_STORAGE_KEY)", "서버로 전송하지", "암호화된 금고나 로그인 보호가 아닙니다", 'type="file"', 'htmlFor="plan-file"', "기록 삭제 확인", "이 계획으로 교체", "계획 파일 백업", "<PersonalSnapshot", "<RetirementPlan", "<PlanPrinciples"]) assert.ok(page.includes(token), token);
  const allSource = readdirSync(path).filter(name => /\.(tsx?|mjs)$/.test(name)).map(source).join("\n");
  assert.doesNotMatch(allSource, /fetch\(|XMLHttpRequest|sendBeacon|dangerouslySetInnerHTML/);
  for (const token of ["<caption", 'scope="col"', 'scope="row"', 'role="region"', "tabIndex={0}"]) assert.ok(source("PlanTable.tsx").includes(token));
  for (const id of ["profile", "assets", "holdings"]) assert.ok(source("PersonalSnapshot.tsx").includes(`id="plan-${id}"`));
  for (const id of ["retirement", "scenarios", "pension"]) assert.ok(source("RetirementPlan.tsx").includes(`id="plan-${id}"`));
  for (const id of ["principles", "routine", "next"]) assert.ok(source("PlanPrinciples.tsx").includes(`id="plan-${id}"`));
});

test("private backups stay out of Git and Vite HTTP file serving", () => {
  const root = new URL("../", import.meta.url);
  assert.match(readFileSync(new URL(".gitignore", root), "utf8"), /^\.private\/$/m);
  for (const config of ["vite.config.js", "vite.config.ts"]) {
    const source = readFileSync(new URL(config, root), "utf8");
    assert.ok(source.includes("'**/.private/**'"));
    assert.ok(source.includes("'**/.git/**'"));
    assert.ok(source.includes("'.env.*'"));
  }
});
