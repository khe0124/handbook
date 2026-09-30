import { ageAtSnapshot, percent, summarizePlan, won } from "./model.mjs";
import { PlanTable } from "./PlanTable";
import type { Plan } from "./types";

export function PersonalSnapshot({ plan }: { plan: Plan }) {
  const summary = summarizePlan(plan);
  const missing = 100 - summary.allocationPercent;
  return <>
    <section aria-labelledby="plan-profile">
      <h2 id="plan-profile" tabIndex={-1}>01. 목표와 생활 조건</h2>
      <p>대화 정리일 <time dateTime={plan.asOf}>{plan.asOf}</time> 기준의 스냅샷입니다. 계좌 잔액과 스크린샷의 실제 평가 시점이 같다고 확인된 것은 아니며, 시세가 자동 갱신되지 않습니다.</p>
      <ul className="money-checks">{plan.goals.map(goal => <li key={goal}>{goal}</li>)}</ul>
      <PlanTable title="대화에서 확인한 정보" columns={["항목", "내용", "해석·확인할 점"]} rows={[
        ["생년월일·나이", `${plan.birthDate} · 만 ${ageAtSnapshot(plan)}세`, "나이는 대화 정리일 기준입니다."],
        ["총자산", won(plan.totalAssets), "사용자가 제시한 총액. 자동차 포함이며, 항목별 잔액 대조 전입니다."],
        ["부채", won(plan.debt), "사용자가 별도로 확인한 부채 총액. 카드 이용대금을 중복 차감하지 않습니다."],
        ["월세", `월 ${won(plan.monthlyRent)}`, "현재 주거비. 전체 생활비·관리비·보증금은 아직 확인하지 않았습니다."],
        ["저축·투자", `월 약 ${won(plan.monthlySaving)}`, "생활비와 월세를 지출한 뒤 지속 가능한 금액이라고 잠정 가정합니다."],
        ["은퇴 목표", `${plan.retirementAge}세 · 월 ${won(plan.retirementMonthly)}`, "현재 구매력·1인·주거비 포함으로 잠정 해석. 의료·간병·차량 교체 같은 큰 지출은 별도입니다."],
      ]} />
    </section>
    <section aria-labelledby="plan-assets">
      <h2 id="plan-assets" tabIndex={-1}>02. 자산 구성과 데이터 정합성</h2>
      <p>비중은 사용자가 알려준 근삿값입니다. 아래 금액은 <strong>총자산 × 비중</strong>으로 환산한 참고치이지 계좌에서 확인한 정확한 잔액이 아닙니다.</p>
      <PlanTable title="사용자 제공 비중과 참고 환산액" columns={["분류", "제공 비중", "환산액 · 추정", "해석"]} rows={plan.allocations.map(row => [row.name, percent(row.percent), won(plan.totalAssets * row.percent / 100), row.note])} />
      <p className="money-plan-note">제공 비중 합계는 <strong>{percent(summary.allocationPercent)}</strong>입니다. {missing >= 0 ? `나머지 ${percent(missing)}·약 ${won(plan.totalAssets * missing / 100)}의 분류가 미확인입니다.` : "100%를 초과하므로 중복 분류를 확인해야 합니다."} 임의로 100%에 맞추지 않습니다. 카드 이용대금의 총자산 포함 방식도 확인해야 하므로 이 표를 완성된 자산·부채 명세로 보지 않습니다.</p>
      <p>자동차는 생활용 자산과 은퇴 운용자산을 구분하기 위해 별도 표시합니다. 연금 계좌의 작은 평가액만으로 국민연금 가입 기간이나 미래 수령액이 작다고 판단할 수는 없습니다.</p>
    </section>
    <section aria-labelledby="plan-holdings">
      <h2 id="plan-holdings" tabIndex={-1}>03. 주식·ETF와 암호화폐</h2>
      <p>주식·ETF는 제공한 화면에 보이는 항목만 옮겼습니다. 잘린 상품명은 그대로 두고, 동일 상품인지 불명확한 항목은 합치지 않았습니다. 손익과 수익률은 화면 표기값이며 실현 손익·미래 성과가 아닙니다.</p>
      <PlanTable title="스크린샷에 표시된 주식·ETF" columns={["종목·상품명", "평가액", "평가손익", "수익률", "확인 메모"]} rows={plan.holdings.map(row => [row.name, won(row.amount), `${row.gain > 0 ? "+" : ""}${won(row.gain)}`, `${row.returnPercent > 0 ? "+" : ""}${percent(row.returnPercent)}`, row.note])} />
      <p><strong>화면에 보이는 주식·ETF 합계: {won(summary.listedTotal)}</strong> · 전체 계좌의 완전한 목록이라고 확인되지는 않았습니다.</p>
      <PlanTable title="사용자가 알려준 암호화폐 수량" columns={["자산", "보유 수량", "원화 평가액"]} rows={plan.crypto.map(row => [row.name, `${row.quantity}개`, "미확인 · 같은 기준시각의 원화 가격 필요"])} />
      <p>투자 비중 환산액에서 위 주식 합계를 뺀 금액을 코인 평가액으로 간주하지 않습니다. 다른 계좌·누락 종목·평가 시점·반올림 차이가 있을 수 있습니다.</p>
      <h3>관찰된 집중도와 다음 확인</h3>
      <p>화면에서 같은 종목으로 확인한 항목만 묶으면 {summary.topTwo.map(([name, amount]) => `${name} ${won(amount)}`).join(", ")}입니다. 이 두 보유 그룹의 합계는 {won(summary.topTwoTotal)}, <strong>화면에 보이는 주식·ETF의 {percent(summary.topTwoPercent)}</strong>입니다. 제시한 총자산 대비로는 {percent(summary.topTwoAssetPercent)}이며, 코인까지 포함한 전체 투자 포트폴리오 비중과는 다릅니다.</p>
      <p>집중도가 높다는 사실만으로 즉시 매도를 결정하지 않습니다. 각 기업의 투자 근거, 손실 시 생활·은퇴 계획의 영향, 세금과 계좌별 제약을 확인한 뒤 보유 한도를 정합니다. ETF도 이름이 다른 것보다 기초지수·상위 편입 종목·산업 노출이 실제로 다른지 확인합니다.</p>
    </section>
  </>;
}
