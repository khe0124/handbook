export const PPI_OPTIONS = [72, 96, 150, 300, 600];
export const CSS_PPI = 96;
export const specSources = {
  paper: { label: "Adobe · A/B/C 용지 치수", url: "https://www.adobe.com/uk/creativecloud/design/discover/guide-paper-sizes.html" },
  printer: { label: "IETF RFC 3805 · 용지 이름과 치수", url: "https://datatracker.ietf.org/doc/rfc3805/" },
  css: { label: "W3C · CSS 절대 길이 단위", url: "https://www.w3.org/TR/css-values-4/#absolute-lengths" },
  bleed: { label: "Adobe · 인쇄 도련 설정", url: "https://www.adobe.com/learn/indesign/web/set-print-bleed" },
};

const series = (prefix, sizes) => sizes.map(([width, height], index) => ({ name: `${prefix}${index}`, width, height, note: "완성 용지 기준 · 사방 동일 여백 계산" }));
const rows = (items) => items.map(([name, width, height, note]) => ({ name, width, height, note }));

export const specGroups = [
  { id: "paper-a", title: "A 계열 용지", kind: "print", source: "paper", description: "A0–A10 · 문서, 포스터, 리플릿의 기본 용지 규격. 세로 방향 기준이며 가로 제작 시 두 변을 바꿉니다.",
    items: series("A", [[841,1189],[594,841],[420,594],[297,420],[210,297],[148,210],[105,148],[74,105],[52,74],[37,52],[26,37]]) },
  { id: "paper-b", title: "ISO B 계열 용지", kind: "print", source: "paper", description: "ISO B0–B10. 아래 JIS B 계열과 크기가 다르므로 ‘B5’처럼 이름만으로 발주하지 않습니다.",
    items: series("ISO B", [[1000,1414],[707,1000],[500,707],[353,500],[250,353],[176,250],[125,176],[88,125],[62,88],[44,62],[31,44]]) },
  { id: "paper-c", title: "C 계열 봉투", kind: "print", source: "paper", description: "C0–C10 봉투 치수 참고. C4는 A4, C5는 A5 문서를 넣는 크기이며 봉투 덮개·접착부·인쇄 가능 영역은 제작사 도면을 확인합니다.",
    items: series("C", [[917,1297],[648,917],[458,648],[324,458],[229,324],[162,229],[114,162],[81,114],[57,81],[40,57],[28,40]]).map(item => ({...item, note:"봉투 완성 크기 · 펼침 도면 아님"})) },
  { id: "other-paper", title: "JIS·북미·기타 용지", kind: "print", source: "printer", description: "JIS B4/B5, 북미 문서와 봉투 크기를 구분합니다. 같은 이름이라도 납품처가 요구하는 mm 치수를 최종 확인하세요.",
    items: rows([["JIS B4",257,364,"ISO B4(250 × 353 mm)와 다름"],["JIS B5",182,257,"ISO B5(176 × 250 mm)와 다름"],["Letter",215.9,279.4,"8.5 × 11 in"],["Legal",215.9,355.6,"8.5 × 14 in"],["Tabloid / Ledger",279.4,431.8,"11 × 17 in · 방향에 따라 명칭 구분"],["DL 봉투",110,220,"봉투 완성 크기 · 전개도 별도"]]) },
  { id: "print-products", title: "명함·홍보물·출력 예시", kind: "print", description: "프로젝트용 프리셋입니다. 재단 후 크기와 선택한 여백을 적용한 도련·안전 영역을 함께 표시합니다. 단일 표준은 아니며 인쇄소의 상품 규격·칼선·후가공 조건이 우선합니다.",
    items: rows([
      ["가로 명함",90,50,"제작 예시 · 세 영역의 계산값을 나란히 비교"],
      ["가로 명함 확장형",90,55,"제작 예시 · 인쇄소 템플릿 확인"],
      ["정사각 카드",90,90,"쿠폰·브랜드 카드 예시"],
      ["엽서",100,150,"제작 예시 · A6(105 × 148 mm)와 구분"],
      ["사진 4 × 6 in",101.6,152.4,"인치 기반 계산 · 상품 실치수 확인"],
      ["사진 5 × 7 in",127,177.8,"인치 기반 계산 · 상품 실치수 확인"],
      ["A3 메뉴판",297,420,"평면 양면 제작 예시 · 접지 시 업체 도면 확인"],
      ["소형 배너",600,1800,"거치대·봉미싱·타공 여백은 업체 도면 우선"],
      ["롤업 배너",850,2000,"제작 예시 · 하단 삽입부는 업체 도면 확인"],
      ["현수막",3000,900,"대형 출력 예시 · 관찰 거리와 출력 PPI 합의"],
    ]) },
  { id: "web-frames", title: "웹 화면·반응형 검수", kind: "css", source: "css", description: "CSS px 기준의 검수 프레임 예시입니다. 특정 기기의 물리 해상도나 필수 브레이크포인트가 아닙니다. 높이는 시작 프레임이며 실제 페이지는 콘텐츠에 맞게 늘어납니다.",
    items: rows([["좁은 모바일",320,568,"최소 폭에서 잘림·가로 넘침 점검"],["모바일 S",360,800,"터치 요소·긴 문장·입력 폼 검수"],["모바일 M",390,844,"헤더·CTA·이미지 크롭 검수"],["모바일 L",430,932,"큰 모바일 폭의 여백과 위계"],["태블릿 세로",768,1024,"열 전환·메뉴·본문 폭 검수"],["태블릿 가로",1024,768,"가로 모드·화면 높이 제약 검수"],["노트북",1280,800,"메인 콘텐츠와 사이드바 검수"],["데스크톱",1440,900,"콘텐츠 최대 폭·그리드 검수"],["와이드",1920,1080,"불필요한 확대·과도한 줄 길이 점검"]]) },
  { id: "web-assets", title: "웹·SNS·영상 이미지", kind: "raster", description: "제작 시작용 캔버스 예시이며 플랫폼별 최신 업로드 규정을 보장하지 않습니다. 업로드 전 비율·용량·크롭·텍스트 안전 영역을 해당 채널에서 확인하세요. cm/mm는 선택 PPI로 인쇄할 때의 크기입니다.",
    items: rows([["정사각 이미지 · 1:1",1080,1080,"SNS·상품 썸네일 캔버스 예시"],["세로 이미지 · 4:5",1080,1350,"피드형 콘텐츠 예시"],["세로 이미지 · 3:4",1080,1440,"세로 사진형 콘텐츠 예시"],["스토리·세로 영상 · 9:16",1080,1920,"UI 오버레이 위치별 안전 영역 확인"],["가로 썸네일 · 16:9",1280,720,"가로 영상·콘텐츠 커버 예시"],["FHD · 16:9",1920,1080,"영상·슬라이드 캔버스"],["UHD · 16:9",3840,2160,"고해상도 영상 캔버스"],["공유 미리보기",1200,630,"OG 이미지 제작 예시 · 채널별 크롭 확인"],["가로 히어로",1920,800,"웹 배너 예시 · 모바일 별도 크롭 필요"],["콘텐츠 카드 · 3:2",1200,800,"600 × 400 CSS px 영역에 2× 에셋으로 사용 가능"]]) },
  { id: "web-icons", title: "아이콘·로고 에셋", kind: "raster", description: "정사각 래스터 에셋 제작 프리셋입니다. 아래 크기를 전부 제출해야 하는 것은 아닙니다. 실제 favicon·manifest·홈 화면 아이콘 크기는 구현 환경별 요구사항을 확인하세요. 벡터 로고는 SVG viewBox와 비율을 함께 정의합니다.",
    items: rows([["작은 favicon",16,16,".ico / .png 예시 · 작은 크기 전용 단순화"],["favicon 2×",32,32,".ico / .png 예시"],["favicon 확장",48,48,".ico / .png 예시"],["홈 화면 아이콘",180,180,".png 제작 예시 · 플랫폼 요구사항 확인"],["앱 아이콘 S",192,192,".png 제작 예시 · manifest 정의 확인"],["앱 아이콘 L",512,512,".png 제작 예시 · 마스킹 안전 영역 확인"],["로고 미리보기",1024,1024,".png 예시 · 실제 로고 비율/여백 별도"]]) },
];

// 인쇄 상품의 펼침/완성 크기를 분리한다. 아래 값은 제작 예시이며 업체 전개도가 우선이다.
specGroups.splice(5, 0,
  { id: "brochures", title: "브로셔·리플릿", kind: "print", description: "접지물은 펼친 크기와 접은 뒤 크기를 따로 확인합니다. 표의 펼침 크기는 도련을 제외합니다. 말아접기는 안쪽 패널이 들어갈 수 있도록 폭을 조정해야 하므로 3등분 값을 최종 칼선으로 사용하지 마세요.", items: rows([
    ["A4 브로셔 · 펼침",420,297,"A3 한 장을 2단 접지 · 펼침 폭 420 mm"],
    ["A4 브로셔 · 완성",210,297,"접은 뒤 한 면 크기 · 인쇄 파일은 펼침 기준"],
    ["A5 리플릿 · 펼침",297,210,"A4 한 장 2단 접지 · 접지 위치 148.5 mm 예시"],
    ["A5형 리플릿 · 완성",148.5,210,"A4를 정확히 반 접은 값 · 재단 A5(148 mm)와 구분"],
    ["A4 3단 리플릿 · 펼침",297,210,"말아접기 패널 예시 100 + 100 + 97 mm · 종이/접지에 따라 수정"],
    ["3단 리플릿 · 표지 면",100,210,"위 패널 예시의 표지 폭 · 안쪽 패널 97 mm · 업체 도면 우선"],
    ["정사각 브로셔 · 펼침",420,210,"210 mm 정사각 2단 접지 제작 예시"],
    ["정사각 브로셔 · 완성",210,210,"접은 뒤 한 면 크기 · 외곽 도련은 펼침에 적용"],
  ]) },
  { id: "publications", title: "책자·출판물", kind: "print", description: "아래는 내지 한 페이지의 재단 후 크기입니다. 판형·쪽수·종이·제본 방식을 함께 결정하세요. 표지는 앞표지 + 뒤표지 + 책등을 포함한 별도 전개가 필요하며, 책등 두께는 종이 두께와 쪽수 등 제작 조건을 확인해야 합니다.", items: rows([
    ["A4 카탈로그·보고서",210,297,"내지 한 페이지 · 양면·제본·도련 조건 확인"],
    ["A5 책자·소책자",148,210,"내지 한 페이지 · 148.5 mm 접지물과 구분"],
    ["A6 포켓북",105,148,"작은 판형 · 제본 안쪽 여백과 본문 가독성 확인"],
    ["JIS B5 매거진",182,257,"내지 한 페이지 · ISO B5(176 × 250 mm)와 구분"],
    ["ISO B5 책자",176,250,"내지 한 페이지 · 인쇄소에 판형 mm 값 전달"],
    ["정사각 브랜드북",210,210,"맞춤 판형 제작 예시 · 종이 수율 확인"],
    ["가로형 포트폴리오",297,210,"A4 가로 · 펼침 폭/제본/거터 별도 확인"],
  ]) },
);

export function printAreas(item, bleed, safe) {
  if (![item.width, item.height].every(value => Number.isFinite(value) && value > 0) ||
    ![bleed, safe].every(value => Number.isFinite(value) && value >= 0) ||
    safe * 2 >= Math.min(item.width, item.height)) throw new RangeError("Invalid trim, bleed or safety margin");
  return [
    {name:"재단 후 (Trim)",width:item.width,height:item.height,note:"재단선 기준 최종 크기"},
    {name:"도련 포함 (Bleed)",width:item.width + bleed * 2,height:item.height + bleed * 2,note:`사방 ${bleed} mm 추가 · 배경을 여기까지 연장 · 재단표시 공간 별도`},
    {name:"안전 영역 (Safe)",width:item.width - safe * 2,height:item.height - safe * 2,note:`재단선에서 사방 ${safe} mm 안쪽 · 주요 글자·로고 배치 영역`},
  ];
}

export function convertSpec(item, kind, ppi = 300) {
  if (!["print", "raster", "css"].includes(kind)) throw new TypeError("Unknown dimension kind");
  if (![item.width, item.height, ppi].every(value => Number.isFinite(value) && value > 0)) throw new RangeError("Dimensions and PPI must be positive");
  const density = kind === "css" ? CSS_PPI : ppi;
  const original = [item.width, item.height];
  const mm = kind === "print" ? original : original.map(value => value * 25.4 / density);
  const px = kind === "print" ? original.map(value => Math.round(value * density / 25.4)) : original;
  return { mm, cm: mm.map(value => value / 10), px, density };
}

export function formatDimensions(values) {
  return values.map(value => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)).join(" × ");
}

export function specTableRows(group, ppi) {
  return group.items.map(item => {
    const converted = convertSpec(item, group.kind, ppi);
    return [item.name, formatDimensions(converted.px), formatDimensions(converted.cm), formatDimensions(converted.mm), item.note];
  });
}

export function productionTableRows(group, ppi, bleed, safe) {
  return group.items.map(item => [
    item.name,
    ...printAreas(item, bleed, safe).map(area => {
      const converted = convertSpec(area, "print", ppi);
      return `${formatDimensions(converted.mm)} mm\n${formatDimensions(converted.cm)} cm\n${formatDimensions(converted.px)} px`;
    }),
    item.note,
  ]);
}
