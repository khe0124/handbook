import { eok, percent, retirementDate, summarizePlan, won } from "./model.mjs";
import { PlanTable } from "./PlanTable";
import type { Plan } from "./types";

export function RetirementPlan({ plan }: { plan: Plan }) {
  const { months, inflationFactor, projections } = summarizePlan(plan);
  const retirementYear = Number(retirementDate(plan).slice(0, 4));
  const pensionYear = Number(plan.birthDate.slice(0, 4)) + 65;
  const gapYears = Math.max(0, 65 - plan.retirementAge);
  return <>
    <section aria-labelledby="plan-retirement">
      <h2 id="plan-retirement" tabIndex={-1}>04. 은퇴 목표와 구매력</h2>
      <PlanTable title="은퇴 계획의 잠정 기준" columns={["항목", "기준", "구분"]} rows={[
        ["은퇴 시점", `${retirementDate(plan)} · ${plan.retirementAge}세`, "사용자가 정한 목표"],
        ["남은 적립 기간", `약 ${Math.floor(months / 12)}년 ${months % 12}개월 · ${months}회`, "정리일과 은퇴월 사이의 월수. 실제 납입일에 따라 달라집니다."],
        ["은퇴 생활비", `현재 가치 월 ${won(plan.retirementMonthly)}`, "1인·주거비 포함이라는 해석은 잠정 가정"],
        ["물가 상승", "연 2%", "비교를 위한 가정, 물가 전망 아님"],
        ["은퇴 시점 명목 생활비", `월 약 ${won(plan.retirementMonthly * inflationFactor)}`, "현재 생활비 × 1.02^(남은 개월 수 ÷ 12)"],
      ]} />
      <p>{retirementYear}년에 지금과 같은 숫자의 생활비를 쓰는 것이 아니라, 지금과 같은 구매력을 확보하는 것이 목표입니다. 은퇴 후 90·95·100세까지의 생활 기간, 주거 변화와 큰 지출을 추가로 검토해야 합니다.</p>
    </section>
    <section aria-labelledby="plan-scenarios">
      <h2 id="plan-scenarios" tabIndex={-1}>05. 월 적립을 유지했을 때</h2>
      <p><strong>예시 초기 운용자금 {won(plan.illustrativePrincipal)}</strong> + 매월 말 {won(plan.monthlySaving)}을 {months}개월 적립합니다. 월 납입액을 물가에 맞춰 올리지 않고, 중간 인출·퇴직금·추가 목돈·연금 수령은 반영하지 않습니다.</p>
      <p className="money-plan-note">초기 운용자금은 대화에서 사용한 계산용 가정입니다. 실제 총자산 전체를 은퇴 자금으로 확정한 것이 아니며, 자동차·비상자금·가까운 지출을 제외한 실제 출발금은 미확인입니다.</p>
      <PlanTable title="세금·비용 차감 후 가상 수익률별 적립 결과" columns={["연 유효수익률 · 가정", "은퇴 시점 명목 자산", "현재 구매력 환산"]} rows={projections.map(row => [percent(row.rate * 100), eok(row.nominal), eok(row.real)])} />
      <p>월 수익률은 (1 + 연 수익률)^(1/12) − 1로 계산했습니다. 현재 구매력은 명목 자산을 물가 상승 배수로 나눈 값입니다. 이 수익률은 현재 보유 종목의 기대수익률이나 달성 약속이 아닙니다.</p>
      <p>매달 일정한 수익률을 적용한 단순 모형이므로 변동성과 은퇴 직전·직후의 하락 순서는 반영하지 못합니다. 이 표만으로 은퇴 준비가 충분하다고 판정하지 않습니다. 부족분을 확인하면 위험을 높이기 전에 적립액 인상·은퇴 시점·목표 생활비를 비교합니다.</p>
    </section>
    <section aria-labelledby="plan-pension">
      <h2 id="plan-pension" tabIndex={-1}>06. 국민연금 전후의 생활비</h2>
      <p>현재 제도에서 1969년 이후 출생자는 국민연금 정상 수급 개시 연령이 65세이고 가입 기간 10년 이상이 필요합니다. 실제 첫 지급월·수급 자격·세후 예상액은 공단에서 확인해야 하며 제도는 바뀔 수 있습니다. <a href="https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0056M0.do" target="_blank" rel="noreferrer">국민연금공단 노령연금 안내 ↗</a> <span className="money-muted">확인일 2026-09-30</span></p>
      <PlanTable title="연금 공백과 인출 재원" columns={["기간", "준비할 현금흐름", "주의점"]} rows={[
        [`${retirementYear}년 은퇴부터 정상 수급까지`, `약 ${gapYears}년 · 현재 생활비 단순 합계 ${eok(plan.retirementMonthly * 12 * gapYears)}`, "지출 합계이지 지금 보유해야 하는 현금액이 아닙니다. 물가·운용·별도 지출은 미반영."],
        [`65세 도달 연도 ${pensionYear}년 이후`, "필요 생활비 − 실제 세후 연금 = 자산에서 보충할 금액", "연금 예상액이 없으므로 부족액과 필요 은퇴 자산을 아직 확정하지 않습니다."],
        ["은퇴 직전·직후", "생활비로 쓸 자금과 장기 운용자금을 구분", "하락장에서 생활비 마련을 위해 위험자산을 급하게 매도해야 하는 상황을 점검합니다."],
      ]} />
      <p>현재의 연금 계좌 비중은 국민연금 예상액과 다릅니다. 국민연금·퇴직연금·연금저축을 구분하고 수령 시작 시점, 인출 제약, 세후 금액을 확인한 뒤 하나의 현금흐름표로 합칩니다.</p>
    </section>
  </>;
}
