export const PLAN_STORAGE_KEY = "handbook.money.personal-plan.v1";
export const MAX_PLAN_BYTES = 65536;

const number = (value, max = 1e13) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= max;
const text = value => typeof value === "string" && value.length > 0 && value.length <= 500;
const date = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value;

// Only accept the fields we render. Neither imported HTML nor code is executed.
export function parsePlan(raw) {
  if (typeof raw !== "string" || new TextEncoder().encode(raw).length > MAX_PLAN_BYTES) throw new Error("64KB 이하의 계획 파일을 선택해 주세요.");
  let p;
  try { p = JSON.parse(raw); } catch { throw new Error("JSON 형식의 계획 파일을 읽을 수 없습니다."); }
  try {
    if (!p || p.version !== 1 || !date(p.asOf) || !date(p.birthDate) || p.birthDate >= p.asOf) throw new Error();
    for (const key of ["totalAssets", "debt", "monthlyRent", "monthlySaving", "retirementMonthly", "illustrativePrincipal"]) if (!number(p[key])) throw new Error();
    if (!Number.isInteger(p.retirementAge) || p.retirementAge < 40 || p.retirementAge > 100) throw new Error();
    if (!Array.isArray(p.allocations) || p.allocations.length === 0 || p.allocations.length > 30 || !p.allocations.every(r => text(r.name) && number(r.percent, 100) && text(r.note))) throw new Error();
    if (!Array.isArray(p.holdings) || p.holdings.length === 0 || p.holdings.length > 100 || !p.holdings.every(r => text(r.name) && text(r.group) && number(r.amount) && typeof r.gain === "number" && Number.isFinite(r.gain) && typeof r.returnPercent === "number" && Number.isFinite(r.returnPercent) && text(r.note))) throw new Error();
    if (!Array.isArray(p.crypto) || p.crypto.length > 20 || !p.crypto.every(r => text(r.name) && typeof r.quantity === "string" && /^\d+(\.\d{1,18})?$/.test(r.quantity) && number(Number(r.quantity)))) throw new Error();
    if (!Array.isArray(p.goals) || p.goals.length > 10 || !p.goals.every(text)) throw new Error();
    if (monthsToRetirement(p) <= 0) throw new Error();
  } catch { throw new Error("지원하지 않는 계획 파일입니다. 날짜·금액·보유 목록과 version: 1을 확인해 주세요."); }
  return {
    version: 1, asOf: p.asOf, birthDate: p.birthDate, retirementAge: p.retirementAge,
    totalAssets: p.totalAssets, debt: p.debt, monthlyRent: p.monthlyRent, monthlySaving: p.monthlySaving,
    retirementMonthly: p.retirementMonthly, illustrativePrincipal: p.illustrativePrincipal,
    allocations: p.allocations.map(({ name, percent, note }) => ({ name, percent, note })),
    holdings: p.holdings.map(({ name, group, amount, gain, returnPercent, note }) => ({ name, group, amount, gain, returnPercent, note })),
    crypto: p.crypto.map(({ name, quantity }) => ({ name, quantity })), goals: [...p.goals],
  };
}

export function retirementDate(plan) {
  return `${Number(plan.birthDate.slice(0, 4)) + plan.retirementAge}${plan.birthDate.slice(4)}`;
}

export function monthsToRetirement(plan) {
  const [year, month] = retirementDate(plan).split("-").map(Number);
  const [startYear, startMonth] = plan.asOf.split("-").map(Number);
  return (year - startYear) * 12 + month - startMonth; // Planning approximation, not a daily accrual schedule.
}

export function ageAtSnapshot(plan) {
  return Number(plan.asOf.slice(0, 4)) - Number(plan.birthDate.slice(0, 4)) - (plan.asOf.slice(5) < plan.birthDate.slice(5) ? 1 : 0);
}

export function futureValue(principal, monthly, months, annualRate) {
  const rate = Math.pow(1 + annualRate, 1 / 12) - 1;
  return rate === 0 ? principal + monthly * months : principal * Math.pow(1 + rate, months) + monthly * Math.expm1(months * Math.log1p(rate)) / rate;
}

export function summarizePlan(plan) {
  const groups = new Map();
  for (const row of plan.holdings) groups.set(row.group, (groups.get(row.group) ?? 0) + row.amount);
  const ranked = [...groups].sort((a, b) => b[1] - a[1]);
  const listedTotal = plan.holdings.reduce((sum, r) => sum + r.amount, 0);
  const topTwo = ranked.slice(0, 2);
  const topTwoTotal = topTwo.reduce((sum, r) => sum + r[1], 0);
  const months = monthsToRetirement(plan);
  const inflationFactor = Math.pow(1.02, months / 12);
  return {
    listedTotal, topTwo, topTwoTotal,
    topTwoPercent: listedTotal ? topTwoTotal / listedTotal * 100 : null,
    topTwoAssetPercent: plan.totalAssets ? topTwoTotal / plan.totalAssets * 100 : null,
    allocationPercent: plan.allocations.reduce((sum, r) => sum + r.percent, 0),
    months, inflationFactor,
    projections: [0.03, 0.05, 0.07].map(rate => {
      const nominal = futureValue(plan.illustrativePrincipal, plan.monthlySaving, months, rate);
      return { rate, nominal, real: nominal / inflationFactor };
    }),
  };
}

export const won = amount => `${Math.round(amount).toLocaleString("ko-KR")}원`;
export const percent = value => value == null ? "계산 불가" : `${value.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}%`;
export const eok = amount => `${(amount / 1e8).toFixed(2)}억 원`;
