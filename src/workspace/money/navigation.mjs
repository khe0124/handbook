export const moneyCategories = [
  { id: "accounts", title: "ISA/연금저축", description: "투자 상품과 절세 계좌를 구분하고, 돈을 꺼낼 시점까지 설계합니다.", lessons: [["isa", "ISA의 구조와 활용"], ["pension", "연금저축·IRP 비교"], ["planning", "계좌 선택과 인출 계획"]] },
  { id: "tax", title: "절세", description: "소득·공제·신고의 구조를 이해하고 세후 결과를 계산합니다.", lessons: [["deductions", "소득공제·세액공제"], ["income", "근로·프리랜서 소득"], ["investment", "투자소득과 세후 수익"]] },
  {
    id: "macro", title: "거시경제 상식",
    description: "시장을 관찰하고, 경기 국면과 시나리오를 세운 뒤 시클리컬 업종에 적용합니다. 예측보다 근거와 반대 신호를 함께 기록합니다.",
    lessons: [
      ["rates", "금리와 채권"], ["inflation", "물가와 구매력"], ["cycles", "환율·경기·경제지표"],
      ["observation", "시장을 관찰하는 법"], ["indicators", "경제지표를 읽는 순서"],
      ["regimes", "현재 시장은 어떤 국면인가"], ["credit", "금리·유동성·신용 사이클"], ["scenarios", "사이클 예측과 시나리오 설계"],
      ["cyclical", "시클리컬에 대한 이해"], ["supply-cycle", "재고·설비투자·공급 사이클"], ["sectors", "업종별 사이클 관찰법"],
      ["routine", "주간 시장 관찰과 판단 기록"],
    ],
    groups: [
      { title: "01 · 기초 개념", ids: ["rates", "inflation", "cycles"] },
      { title: "02 · 시장 관찰", ids: ["observation", "indicators"] },
      { title: "03 · 국면과 시나리오", ids: ["regimes", "credit", "scenarios"] },
      { title: "04 · 시클리컬과 업종", ids: ["cyclical", "supply-cycle", "sectors"] },
      { title: "05 · 관찰 습관", ids: ["routine"] },
    ],
  },
  { id: "crypto", title: "암호화폐", description: "기술·가격·보관 위험을 분리하고 손실 가능성을 먼저 확인합니다.", lessons: [["basics", "블록체인·코인·토큰"], ["custody", "거래소·지갑·보안"], ["risk", "변동성·레버리지·사기"]] },
  { id: "property", title: "부동산", description: "매매가격뿐 아니라 대출·계약·유지비·유동성을 함께 봅니다.", lessons: [["costs", "매매·전세·월세 비교"], ["loans", "대출·LTV·DSR"], ["contracts", "계약·권리·보증금"]] },
  { id: "stocks", title: "주식", description: "기업의 지분을 소유한다는 의미와 분산·비용·평가 기준을 배웁니다.", lessons: [["basics", "주식·배당·기업가치"], ["etf", "ETF·지수·분산투자"], ["portfolio", "자산배분·리밸런싱"]] },
];

export const moneyHref = (category, lesson) => `/money/${category}/${lesson}`;

export const moneyLessonCount = moneyCategories.reduce((total, category) => total + category.lessons.length, 0);

export function getMoneyLessonGroups(category) {
  if (!category.groups) return [{ title: null, lessons: category.lessons }];
  return category.groups.map(group => ({
    title: group.title,
    lessons: category.lessons.filter(([id]) => group.ids.includes(id)),
  }));
}

export function resolveMoneyPage(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/money") return { category: null, lesson: null };
  const parts = path.split("/");
  if (parts.length !== 4 || parts[1] !== "money") return null;
  const category = moneyCategories.find(item => item.id === parts[2]);
  const lesson = category?.lessons.find(([id]) => id === parts[3]);
  return category && lesson ? { category, lesson } : null;
}
