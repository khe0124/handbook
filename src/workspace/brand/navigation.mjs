export const brandingPages = [
  { id: "questionnaire", href: "/brand/questionnaire", title: "사전설문", description: "고객 사전설문, 디스커버리 인터뷰와 디자이너 요약" },
  { id: "design-brief", href: "/brand/design-brief", title: "Design Brief", description: "해결할 문제, 목표, 시각 방향과 디자인 판단 기준" },
  { id: "products", href: "/brand/products", title: "상품과 가격", description: "브랜딩·웹·통합·추가 상품의 설명, 가격, 산출물과 제외 범위를 한 표로 비교" },
  { id: "deliverables", href: "/brand/deliverables", title: "산출물 목록", description: "단계별 산출물의 양식·구성, 파일 확장자와 전달 조건" },
  { id: "guide", href: "/brand/guide", title: "가이드와 인계", description: "작업 단계, 완료 기준, 납품 점검과 운영·인계 기록" },
];

export const isBrandingPage = area => area === "branding" || brandingPages.some(page => page.id === area);

export function legacyBrandingDestination(pathname, hash) {
  if (!["/brand", "/brand/branding"].includes(pathname.replace(/\/+$/, ""))) return null;
  const id = hash.replace(/^#/, "");
  if (["offers", "launch-packages", "commercial"].includes(id)) return `/brand/products#${id}`;
  if (["stage-discovery", "stage-direction", "stage-identity", "stage-applications", "stage-handoff", "delivery", "review", "project-brief"].includes(id)) return `/brand/guide#${id}`;
  return null;
}
