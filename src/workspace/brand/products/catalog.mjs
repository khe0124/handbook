import { addOns, bundles, offers } from "../offers.mjs";
import { deliveryGroup, launchDelivery } from "./deliveryCatalog.mjs";

export const productHeadings = ["분류", "상품명", "상품설명", "가격", "산출물 목록", "제외 및 협의목록", "비고"];

const primaryRows = (area, category) => offers[area].map((offer, index) => ({
  id: `${area}-${index}`, category, name: offer.name, description: offer.fit,
  price: `${offer.price}만 원`, scope: offer.scope, exclude: offer.exclude,
  deliveryGroups: [deliveryGroup(offer.name)],
  notes: [offer.tier, ...offer.terms],
}));

const bundleComponents = [
  [offers.branding[2], offers.web[0]],
  [offers.branding[2], offers.web[1]],
  [offers.branding[3], offers.web[2]],
];

const bundleExtras = [
  [],
  ["favicon / OG / SNS 프로필", "브랜드 에셋·Figma 운영 가이드"],
  ["핵심 카피·콘텐츠", "런칭 에셋", "계정·권한 인계"],
];

const bundleNotes = [
  ["고객 자료 준비 완료·제한된 웹 구조에 한해 적용"],
  ["180 + 400 − 공통 인터뷰·방향 설정·PM 조정 30 = 550만 원", "사후 지원 2주 / 1개월 표기 불일치 — 계약 전 확정"],
  ["런칭 후 1개월 개선", "조사·콘텐츠·CMS 범위는 구성 상품 기준으로 합의"],
];

const bundleRows = bundles.map(([name, tierPrice, description], index) => ({
  id: `bundle-${index}`, category: "통합 패키지", name, description,
  price: `${tierPrice.split(" · ")[1]}만 원`,
  scope: [...bundleComponents[index].flatMap(offer => offer.scope.map(item => `${offer.name} · ${item}`)), ...bundleExtras[index]],
  deliveryGroups: [...bundleComponents[index].map(offer => deliveryGroup(offer.name)), ...(launchDelivery[name].length ? [{ title: "통합 런칭 추가 항목", items: launchDelivery[name] }] : [])],
  exclude: [...new Set(bundleComponents[index].flatMap(offer => offer.exclude))],
  notes: [tierPrice.split(" · ")[0], ...bundleNotes[index], "통합 패키지에 명시된 포함 항목 우선 · 그 외 구성 상품의 제외 조건 적용", ...bundleComponents[index].flatMap(offer => offer.terms.map(term => `${offer.name} · ${term}`))],
}));

function addonPrice(price) {
  if (price.startsWith("월 ")) return `월 ${price.slice(2)}만 원`;
  if (price.endsWith("부터")) return `${price.slice(0, -2)}만 원부터`;
  return `${price}만 원`;
}

const addonDescriptions = {
  branding: [
    "시각 디자인에 앞서 사업과 고객을 이해하고 브랜드의 메시지·콘셉트를 정리합니다.",
    "확정된 로고·색상·서체를 일관되게 사용할 수 있도록 기준을 문서화합니다.",
    "SNS와 디지털 채널에서 사용할 홍보 이미지와 크기 변형을 제작합니다.",
    "직접 내용을 바꿔 반복 활용할 수 있는 SNS 편집 템플릿을 만듭니다.",
    "브랜드 정보와 연락처를 담은 양면 명함을 디자인합니다.",
    "상품·서비스와 가격을 안내하는 양면 메뉴판을 디자인합니다.",
    "하나의 메시지를 전달하는 포스터를 지정된 크기로 디자인합니다.",
    "준비된 문구를 바탕으로 회사·서비스 소개 자료를 편집·디자인합니다.",
    "매월 정해진 수량의 SNS 이미지와 배너를 제작합니다.",
  ],
  web: [
    "기본 등장·호버를 넘어서는 맞춤 웹 효과를 제작합니다.",
    "번역·검수된 문구를 받아 기존 웹사이트의 다른 언어 버전을 제작합니다.",
    "월별 건수·시간 한도 안에서 웹사이트 업데이트를 지원합니다.",
    "여러 서비스 사이의 한 가지 업무 흐름을 연결·자동화합니다.",
  ],
  shared: [
    "인터뷰와 제공 자료를 바탕으로 브랜드 카피·콘텐츠를 작성합니다.",
    "캠페인용 랜딩 페이지와 홍보 이미지를 함께 제작합니다.",
  ],
};

const addonRows = (area, category) => addOns[area].map(([name, price, scope], index) => ({
  id: `addon-${area}-${index}`, category, name,
  description: addonDescriptions[area][index], price: addonPrice(price),
  scope: scope.split(" · "),
  deliveryGroups: [deliveryGroup(name)],
  exclude: ["기준 수량·시간·분량 초과 요청은 추가 견적", "개별 제외 항목·파일 형식·수정 횟수는 원문 미명시 — 견적 시 합의"],
  notes: ["추가 상품", "인쇄·외부 서비스 등 공통 외부 비용 별도"],
}));

export const productGroups = [
  { id: "branding-products", title: "브랜딩", rows: primaryRows("branding", "브랜딩") },
  { id: "web-products", title: "웹", rows: primaryRows("web", "웹") },
  { id: "launch-packages", title: "통합 패키지", rows: bundleRows },
  { id: "branding-addons", title: "브랜딩 추가", rows: addonRows("branding", "브랜딩 추가") },
  { id: "web-addons", title: "웹 추가", rows: addonRows("web", "웹 추가") },
  { id: "shared-addons", title: "공통 추가", rows: addonRows("shared", "공통 추가") },
];
