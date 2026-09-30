export const moneyCategories = [
  { id: "strategy", title: "자산관리 전략", description: "노후·장기투자·사이클 대응을 학습하고, 실제 판단에 쓸 원칙과 운영 루틴을 만듭니다. 개인 기록은 학습의 참고 자료입니다.", lessons: [["roadmap", "세 목표를 연결하는 자산관리 설계"], ["three-year-plan", "연봉 6,000만 원의 3년 재정 가이드"], ["policy", "투자 원칙서와 바쁜 사람의 운영 루틴"], ["plan", "나의 자산관리 계획"]], groups: [{ title: "01 · 설계와 운영", ids: ["roadmap", "three-year-plan", "policy"] }, { title: "02 · 개인 참고 기록", ids: ["plan"] }] },
  { id: "accounts", title: "ISA/연금저축", description: "계좌의 제약과 세후 결과를 이해하고, 생활비·연금 공백·은퇴 후 인출까지 설계합니다.", lessons: [["isa", "ISA의 구조와 활용"], ["pension", "연금저축·IRP 비교"], ["planning", "계좌 선택과 인출 계획"], ["retirement", "노후 생활비와 필요한 자산 계산하기"], ["withdrawal", "은퇴 전후 자산과 인출 순서 설계"]], groups: [{ title: "01 · 계좌 기초", ids: ["isa", "pension", "planning"] }, { title: "02 · 노후 설계", ids: ["retirement", "withdrawal"] }] },
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
      ["portfolio-link", "경기 판단을 내 포트폴리오에 연결하기"],
    ],
    groups: [
      { title: "01 · 기초 개념", ids: ["rates", "inflation", "cycles"] },
      { title: "02 · 시장 관찰", ids: ["observation", "indicators"] },
      { title: "03 · 국면과 시나리오", ids: ["regimes", "credit", "scenarios"] },
      { title: "04 · 시클리컬과 업종", ids: ["cyclical", "supply-cycle", "sectors"] },
      { title: "05 · 관찰 습관", ids: ["routine"] },
      { title: "06 · 내 자산에 적용", ids: ["portfolio-link"] },
    ],
  },
  { id: "crypto", title: "암호화폐", description: "비트코인의 설계·가치 논리·세계적 제도화와 한국 법제를 이해한 뒤, 다른 암호자산의 기술·가격·보관 위험을 분리합니다.", lessons: [["bitcoin", "비트코인이라는 자산"], ["basics", "블록체인·코인·토큰"], ["custody", "거래소·지갑·보안"], ["risk", "변동성·레버리지·사기"]], groups: [{ title: "01 · 비트코인 심층", ids: ["bitcoin"] }, { title: "02 · 암호자산 공통", ids: ["basics", "custody", "risk"] }] },
  { id: "property", title: "부동산", description: "매매가격뿐 아니라 대출·계약·유지비·유동성을 함께 봅니다.", lessons: [["costs", "매매·전세·월세 비교"], ["loans", "대출·LTV·DSR"], ["contracts", "계약·권리·보증금"]] },
  { id: "stocks", title: "주식", description: "사업·재무·가격을 분석하고, 텐베거의 가능성과 실패를 함께 봅니다. 장기 보유와 리밸런싱의 실행 기준까지 연결합니다.", lessons: [["basics", "주식·배당·기업가치"], ["etf", "ETF·지수·분산투자"], ["portfolio", "자산배분·리밸런싱"], ["tenbagger", "텐베거의 조건과 실패 패턴"], ["business", "사업모델·경쟁우위·성장 여력 분석"], ["financials", "재무제표·현금흐름·회계 위험 읽기"], ["valuation", "기업가치 평가와 매수가격의 조건"], ["holding", "매수·보유·추가매수·매도 판단 기준"], ["review", "기업 분석 노트와 분기 실적 리뷰"], ["rebalancing", "리밸런싱 실행 매뉴얼"]], groups: [{ title: "01 · 투자 기초", ids: ["basics", "etf", "portfolio"] }, { title: "02 · 기업과 가격 분석", ids: ["tenbagger", "business", "financials", "valuation"] }, { title: "03 · 보유와 운영", ids: ["holding", "review", "rebalancing"] }] },
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
