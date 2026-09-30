type BarItem = { label: string; value: number; display: string; note?: string };
type FlowItem = { label: string; value?: string; note: string };

type MacroVisualData = {
  title: string;
  eyebrow: string;
  description: string;
} & (
  { type: "bars"; max: number; reference?: number; referenceLabel?: string; items: BarItem[]; takeaway: string }
  | { type: "equation"; items: FlowItem[]; result: string; takeaway: string }
  | { type: "flow"; items: FlowItem[]; takeaway: string }
  | { type: "matrix"; xLabel: string; yLabel: string; cells: { label: string; note: string }[]; takeaway: string }
);

const visuals: Record<string, MacroVisualData> = {
  rates: {
    type: "equation", eyebrow: "숫자로 보는 채권가격", title: "시장금리 1%p 상승이 가격을 낮추는 이유",
    description: "1년 뒤 104원을 받는 동일한 채권을, 시장이 요구하는 수익률만 바꿔 현재가치로 계산합니다.",
    items: [
      { label: "받을 금액", value: "104원", note: "1년 뒤 원금과 이자의 합" },
      { label: "요구수익률 4%", value: "100원", note: "104 ÷ 1.04" },
      { label: "요구수익률 5%", value: "99.05원", note: "104 ÷ 1.05" },
    ], result: "−0.95원", takeaway: "미래에 받을 돈이 같다면 새 금리와 경쟁할 수 있도록 오늘의 가격이 내려갑니다. 만기가 길수록 금리 민감도는 대체로 더 큽니다.",
  },
  inflation: {
    type: "bars", eyebrow: "수준과 상승률", title: "인플레이션 둔화는 가격 하락이 아닙니다",
    description: "가상의 장바구니 가격지수입니다. 둘째 해 상승률은 10%에서 3%로 낮아졌지만 가격 수준은 계속 높아졌습니다.", max: 120,
    items: [
      { label: "기준 연도", value: 100, display: "100", note: "출발점" },
      { label: "1년 뒤", value: 110, display: "110", note: "+10%" },
      { label: "2년 뒤", value: 113.3, display: "113.3", note: "+3%" },
    ], takeaway: "상승 속도가 느려지는 디스인플레이션과 가격 수준이 내려가는 디플레이션을 구분하세요.",
  },
  cycles: {
    type: "equation", eyebrow: "해외자산 환산", title: "자산가격과 환율은 곱해서 계산합니다",
    description: "달러 자산이 10% 오르고 같은 기간 원/달러 환율이 5% 내린 가상 사례입니다.",
    items: [
      { label: "초기 원화 가치", value: "100", note: "비교를 위한 기준" },
      { label: "달러 자산", value: "× 1.10", note: "자산가격 +10%" },
      { label: "환율 효과", value: "× 0.95", note: "원화 환산가치 −5%" },
    ], result: "104.5 · 수익률 +4.5%", takeaway: "10%와 −5%를 단순히 더한 5%가 아닙니다. 실제 결과에는 환전 비용·세금도 반영해야 합니다.",
  },
  observation: {
    type: "flow", eyebrow: "관찰의 세 층", title: "가격 뉴스에서 현금흐름까지 교차 확인하기",
    description: "하나의 신호를 결론으로 쓰지 않고 서로 다른 성격의 증거를 순서대로 연결합니다.",
    items: [
      { label: "실물", value: "월간", note: "주문·판매·생산이 실제로 늘었는가" },
      { label: "금융 여건", value: "주간", note: "금리·스프레드·대출 기준이 뒷받침하는가" },
      { label: "기업 실적", value: "분기", note: "매출이 이익과 영업현금으로 남았는가" },
    ], takeaway: "세 층이 엇갈리면 틀린 자료를 버리는 대신 ‘무엇이 아직 확인되지 않았는가’를 기록합니다.",
  },
  indicators: {
    type: "bars", eyebrow: "예상·이전·기준점", title: "‘예상 상회’와 ‘경기 개선’은 같은 말이 아닙니다",
    description: "가상의 제조업 신규주문 확산지수입니다. 발표치는 예상보다 높지만 이전보다 낮고 기준점 50도 밑돕니다.", max: 60, reference: 50, referenceLabel: "확장·수축 기준 50",
    items: [
      { label: "이전", value: 52, display: "52", note: "기준점 위" },
      { label: "시장 예상", value: 48, display: "48", note: "예상치" },
      { label: "실제 발표", value: 49, display: "49", note: "예상 상회·이전 하회" },
    ], takeaway: "수준, 이전 대비 방향, 예상과의 차이를 세 문장으로 따로 적으면 제목 하나에 휘둘리지 않습니다.",
  },
  regimes: {
    type: "matrix", eyebrow: "2×2 국면 지도", title: "성장 방향과 물가 방향을 분리합니다",
    description: "각 축은 절대 수준이 아니라 정해진 비교 기간의 개선·둔화 또는 가속·둔화를 뜻합니다.",
    xLabel: "성장 모멘텀  ← 둔화 · 개선 →", yLabel: "물가 상승률  ↑ 가속 · 둔화 ↓",
    cells: [
      { label: "성장 둔화 × 물가 가속", note: "구매력·마진·정책 부담" },
      { label: "성장 개선 × 물가 가속", note: "수요 강도와 비용 압력 비교" },
      { label: "성장 둔화 × 물가 둔화", note: "금리 효과와 이익 악화 비교" },
      { label: "성장 개선 × 물가 둔화", note: "회복의 폭과 가격 반영 확인" },
    ], takeaway: "국가·업종별 신호가 섞이면 억지로 한 칸에 넣지 말고 ‘전환 중’으로 보류합니다.",
  },
  credit: {
    type: "bars", eyebrow: "차입금리 분해", title: "기준 부분이 내려도 기업 금리는 오를 수 있습니다",
    description: "기업 차입금리를 기준 성격의 금리와 신용 가산금리로 단순화한 학습용 사례입니다.", max: 8,
    items: [
      { label: "변화 전", value: 6, display: "6%", note: "기준 4% + 가산 2%" },
      { label: "변화 후", value: 7, display: "7%", note: "기준 3% + 가산 4%" },
    ], takeaway: "정책 완화 여부뿐 아니라 위험 가산금리와 실제 대출 기준까지 봐야 자금조달 여건을 알 수 있습니다.",
  },
  scenarios: {
    type: "flow", eyebrow: "조건부 시나리오", title: "전망은 세 갈래 경로와 폐기 조건으로 씁니다",
    description: "주문 약화가 멈춘 뒤 향후 두 분기를 관찰하는 가상 사례입니다.",
    items: [
      { label: "기본", value: "완만한 안정", note: "판매 유지 + 재고 증가 둔화" },
      { label: "상방", value: "수요 회복", note: "판매·마진·현금흐름 동반 개선" },
      { label: "하방", value: "재차 악화", note: "주문 재하락 + 신용 여건 악화" },
    ], takeaway: "어느 경로가 맞는지보다 어떤 관측이 나오면 가설을 바꿀지를 먼저 적습니다.",
  },
  cyclical: {
    type: "bars", eyebrow: "영업 레버리지", title: "매출 20% 감소가 이익 80% 감소가 되는 구조",
    description: "변동비율 60%, 고정비 30인 가상 기업입니다. 막대는 각 시점의 매출과 영업이익을 비교합니다.", max: 100,
    items: [
      { label: "호황 매출", value: 100, display: "100", note: "영업이익 10" },
      { label: "둔화 매출", value: 80, display: "80", note: "영업이익 2" },
      { label: "호황 이익", value: 10, display: "10", note: "매출의 10%" },
      { label: "둔화 이익", value: 2, display: "2", note: "매출의 2.5%" },
    ], takeaway: "고정비가 큰 기업은 매출의 작은 변화가 이익의 큰 변화로 증폭됩니다. 정점 이익 기준 PER이 싸 보일 수 있습니다.",
  },
  "supply-cycle": {
    type: "bars", eyebrow: "재고를 비율로 읽기", title: "재고가 줄어도 부담은 더 커질 수 있습니다",
    description: "재고는 120에서 110으로 줄었지만 월간 판매가 100에서 80으로 더 빠르게 감소한 가상 사례입니다.", max: 1.5,
    items: [
      { label: "변화 전", value: 1.2, display: "1.20개월", note: "재고 120 ÷ 판매 100" },
      { label: "변화 후", value: 1.375, display: "1.375개월", note: "재고 110 ÷ 판매 80" },
    ], takeaway: "재고 금액만 보지 말고 같은 범위의 판매로 나눠 보세요. 분자와 분모가 왜 변했는지도 따로 확인합니다.",
  },
  sectors: {
    type: "flow", eyebrow: "업종 분석 공통 순서", title: "선행 신호가 실제 이익이 될 때까지",
    description: "업종마다 지표는 달라도 확인 순서는 공통입니다. 앞 단계의 개선이 뒤 단계에서 사라질 수 있습니다.",
    items: [
      { label: "최종 수요", value: "누가 사는가", note: "판매량·고객 재고·사용처" },
      { label: "가격·주문", value: "얼마에 사는가", note: "계약 조건·취소·제품 구성" },
      { label: "공급·원가", value: "얼마나 남는가", note: "증설·가동률·원료·인건비" },
      { label: "실적·현금", value: "확인", note: "사업부 마진·재고·영업현금흐름" },
    ], takeaway: "업황 지표와 기업의 주력 제품·지역·계약 구조가 일치할 때만 기업 분석의 근거로 사용합니다.",
  },
  routine: {
    type: "flow", eyebrow: "자료 속도에 맞춘 루틴", title: "매일 결론 내리지 않는 관찰 주기",
    description: "가격·경제지표·기업 공시는 갱신 속도가 다릅니다. 같은 기준으로 반복 가능한 최소 주기를 만듭니다.",
    items: [
      { label: "주간", value: "가격", note: "금리·환율·주가·신용 변화" },
      { label: "월간", value: "실물", note: "주문·물가·생산의 새 발표" },
      { label: "분기", value: "검증", note: "재고·마진·현금흐름으로 가설 확인" },
      { label: "변화 시", value: "갱신", note: "유지·수정·보류와 반대 증거 기록" },
    ], takeaway: "새 자료가 없으면 ‘변화 없음’도 유효한 결론입니다. 확인 횟수보다 비교 기준의 일관성이 중요합니다.",
  },
  "portfolio-link": {
    type: "equation", eyebrow: "거시 판단의 전달 경로", title: "판매량과 단가 변화부터 기업 매출로 번역합니다",
    description: "가상 기업의 판매량이 10% 줄고 단가가 5% 낮아진 경우입니다. 거시 신호를 예상 주가로 바로 바꾸지 않습니다.",
    items: [
      { label: "기준 매출", value: "100", note: "수량 × 단가의 출발점" },
      { label: "판매량", value: "× 0.90", note: "수량 −10%" },
      { label: "판매단가", value: "× 0.95", note: "단가 −5%" },
    ], result: "85.5 · 매출 −14.5%", takeaway: "이 계산은 매출 변화까지만 설명합니다. 이익에는 원가·고정비가, 주가에는 기대·금리·현재 가격이 추가로 작용합니다.",
  },
};

function Bars({ visual }: { visual: Extract<MacroVisualData, { type: "bars" }> }) {
  return <div className="macro-bars" role="img" aria-label={`${visual.title}. ${visual.items.map(item => `${item.label} ${item.display}`).join(", ")}`}>
    {visual.reference !== undefined && <div className="macro-bars-reference" style={{ "--reference": `${visual.reference / visual.max * 100}%` } as React.CSSProperties}><span>{visual.referenceLabel}</span></div>}
    {visual.items.map(item => <div className="macro-bar" key={item.label}>
      <div className="macro-bar-copy"><span>{item.label}</span><strong>{item.display}</strong></div>
      <div className="macro-bar-track"><span style={{ width: `${Math.max(item.value / visual.max * 100, 2)}%` }} /></div>
      {item.note && <small>{item.note}</small>}
    </div>)}
  </div>;
}

function Flow({ items, equation = false }: { items: FlowItem[]; equation?: boolean }) {
  return <ol className={`macro-flow${equation ? " macro-equation" : ""}`}>
    {items.map((item, index) => <li key={item.label}>
      <span className="macro-flow-number">{String(index + 1).padStart(2, "0")}</span>
      <div><strong>{item.label}</strong>{item.value && <b>{item.value}</b>}<small>{item.note}</small></div>
    </li>)}
  </ol>;
}

export function MacroVisual({ lessonId }: { lessonId: string }) {
  const visual = visuals[lessonId];
  if (!visual) return null;
  return <section className="macro-visual" aria-labelledby={`macro-visual-${lessonId}`}>
    <p className="macro-visual-eyebrow">{visual.eyebrow}</p>
    <h2 id={`macro-visual-${lessonId}`}>{visual.title}</h2>
    <p>{visual.description}</p>
    {visual.type === "bars" && <Bars visual={visual} />}
    {visual.type === "flow" && <Flow items={visual.items} />}
    {visual.type === "equation" && <><Flow items={visual.items} equation /><p className="macro-equation-result"><span>계산 결과</span><strong>{visual.result}</strong></p></>}
    {visual.type === "matrix" && <div className="macro-matrix-wrap" role="img" aria-label={`${visual.title}. ${visual.cells.map(cell => cell.label).join(", ")}`}>
      <span className="macro-matrix-y">{visual.yLabel}</span>
      <div className="macro-matrix">{visual.cells.map(cell => <div key={cell.label}><strong>{cell.label}</strong><span>{cell.note}</span></div>)}</div>
      <span className="macro-matrix-x">{visual.xLabel}</span>
    </div>}
    <p className="macro-visual-takeaway"><strong>읽는 법</strong>{visual.takeaway}</p>
    <p className="money-muted">설명을 위한 단순화된 가상 수치·도식이며 현재 시장 수치나 수익 전망이 아닙니다.</p>
  </section>;
}
