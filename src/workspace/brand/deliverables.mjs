// 일반 실무 기준. 실제 제공 항목은 선택 상품과 견적에서 확정한다.
export const deliverables = {
  branding: {
    discovery: [
      ["Brand Brief", "사업 배경·목표·문제·성공 기준", "PDF / Notion"],
    ],
    direction: [
      ["Audience", "고객·사용 맥락·니즈·장벽·선택 기준", "PDF / Notion"],
      ["Competitor", "경쟁 대안·표현 방식·차별점", "PDF"],
      ["Positioning", "누구의 어떤 문제를 왜 이 브랜드가 해결하는가", "PDF / Notion"],
      ["Message", "한 줄/짧은/긴 소개 · 핵심 메시지 3–5개 · CTA", "PDF / Notion"],
      ["Tone of Voice", "말투·단어 선택 · 권장/금지 표현", "PDF"],
      ["Moodboard", "이미지·색·질감·레이아웃·참고 브랜드", "PDF / Figma"],
      ["Creative Brief", "디자인 문제·시각 방향·원칙", "PDF"],
    ],
    identity: [
      ["Logo System", "메인 로고와 조합 규칙", "SVG / PDF / AI(포함 상품)"],
      ["Logo Variations", "가로·세로·심벌·단색·반전", "SVG / PNG / PDF"],
      ["Logo Usage", "보호 여백·최소 크기·배경·금지 사례", "PDF"],
      ["Color System", "Primary / Secondary / Accent · HEX / RGB / CMYK", "PDF / Figma"],
      ["Typography", "제목/본문 · 크기·굵기·행간 · 웹폰트", "PDF / CSS"],
      ["Graphic System", "패턴·도형·선·아이콘·이미지 스타일", "SVG / PNG / PDF · 범위 합의"],
    ],
    applications: [
      ["Application Examples", "명함·SNS·제안서 표지·문서 등 실제 적용 예시. 일반 기준 2종, Essentials 기본 1종", "PNG / PDF · 상품별 수량 우선"],
    ],
    handoff: [
      ["Brand Guidelines", "로고·색상·서체·그래픽 사용 규칙 통합", "PDF"],
      ["Asset Library", "파일명과 용도가 정리된 최종 에셋", "ZIP / Drive"],
      ["README / 라이선스", "인쇄: AI 또는 PDF·CMYK / 웹: SVG·PNG·JPG·RGB. 폰트 사용 조건과 파일 설명", "원본은 상품별 제공 범위 확인"],
    ],
  },
  web: {
    discovery: [
      ["기본 5페이지 구성", "Home: 메시지·차별점·서비스·CTA / About: 배경·관점·신뢰 근거 / Service: 범위·절차 / Work·Case Study: 결과·과정 / Contact: 문의·연락처·SNS", "Brand Website 기준"],
      ["범위 합의", "페이지 수뿐 아니라 섹션 수·콘텐츠 길이·기능을 정의. Core는 페이지당 최대 6섹션·핵심 CTA 2개", "견적 / 브리프"],
    ],
    structure: [
      ["Sitemap / IA", "메뉴·페이지·URL 구조", "Figma / PDF"],
      ["Page Outline", "페이지 목적·섹션·내용·CTA", "Notion / PDF"],
      ["User Flow", "방문에서 문의까지 이동 경로", "Figma / PDF"],
      ["Content Inventory", "필요한 문구·이미지·사례와 준비 상태", "Notion / Spreadsheet"],
      ["Wireframes", "PC·모바일 정보 위계와 배치", "Figma"],
      ["Content Guide", "제목·본문·이미지 비율·글자 수 제한", "Notion / PDF"],
    ],
    interface: [
      ["Visual Design", "PC·모바일 최종 화면", "Figma"],
      ["Design System", "색·서체·버튼·입력·카드·내비게이션·간격", "Figma"],
      ["Component Library", "재사용 가능한 컴포넌트와 상태", "Figma"],
      ["Prototype", "버튼·메뉴·페이지를 연결한 흐름", "Figma"],
    ],
    build: [
      ["Production Website", "합의한 페이지·섹션·기능의 반응형 구현", "운영 URL"],
      ["CMS / Editable Areas", "CMS 또는 콘텐츠 편집·운영 구조. Starter/Core CMS 제외, Signature는 선택 범위 합의", "해당 시 CMS 권한 / 안내"],
      ["Contact", "문의 폼 또는 이메일·카카오 CTA의 실제 작동 테스트", "테스트 결과"],
      ["SEO Baseline", "title·meta description·OG·favicon·sitemap", "배포 사이트 · 견적 범위 확인"],
      ["Analytics", "GA 또는 합의한 분석 도구 1종 연결", "고객 계정"],
      ["QA", "기기·브라우저·반응형·링크·폼 오류 검수", "PDF / Notion"],
    ],
    handoff: [
      ["Source / Repository", "직접 코드로 개발한 경우 소스 및 저장소 전달", "Git / ZIP"],
      ["Handover", "콘텐츠 수정·배포·계정 관리 안내", "PDF / Loom"],
      ["Bug Fix", "합의한 기간과 범위의 오류 수정", "지원 기간 명시"],
    ],
  },
};

export const deliveryGates = {
  branding: "포지셔닝·메시지 승인 → 고객·문제·선택 이유를 하나의 문서로 정리 → 브랜드/웹 디자인 방향 합의 → 다른 담당자가 가이드로 작업 가능 → 합의한 인쇄·웹 파일과 사용 규칙 인계.",
  web: "합의한 페이지·섹션·기능이 운영 URL에서 작동 → PC/모바일과 링크·CTA·폼 확인 → 합의한 SEO·분석 연결 → QA 이슈 해결 또는 미해결 내용 고지 → 계정·권한 인계.",
};
