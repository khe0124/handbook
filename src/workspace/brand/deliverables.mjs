// 일반 실무 기준. 실제 제공 항목은 선택 상품과 견적에서 확정한다.
export const deliverableHeadings = {
  branding: ["산출물", "권장 양식·구성", "파일 확장자", "전달·사용 조건"],
  web: ["산출물", "상세 내용", "형식 / 조건"],
};

export const deliverables = {
  branding: {
    discovery: [
      ["Brand Brief", "질문·답변형 브리프: 사업 배경 → 목표 → 문제 → 성공 기준 → 작업 범위·승인자", ".pdf", "PDF 문서 또는 Notion 공유 링크"],
    ],
    direction: [
      ["Audience", "고객 정의 시트: 고객군별 사용 맥락·니즈·장벽·선택 기준 비교표", ".pdf", "PDF 문서 또는 Notion 공유 링크"],
      ["Competitor", "경쟁 비교표: 경쟁 대안별 표현 방식·강점·차별점 + 참고 화면", ".pdf", "비교 근거와 참고 출처 함께 기재"],
      ["Positioning", "포지셔닝 시트: 대상 고객 → 해결할 문제 → 차별점 → 선택 이유 → 포지셔닝 문장", ".pdf", "PDF 문서 또는 Notion 공유 링크"],
      ["Message", "메시지 매트릭스: 한 줄/짧은/긴 소개 · 핵심 메시지 3–5개 · CTA", ".pdf", "PDF 문서 또는 Notion 공유 링크"],
      ["Tone of Voice", "언어 가이드: 말투·단어 선택 원칙 + 권장/금지 표현 비교표", ".pdf", "실제 문장 예시 포함"],
      ["Moodboard", "주석형 레퍼런스 보드: 이미지·색·질감·레이아웃·참고 브랜드와 선택 이유", ".pdf / .fig(별도 합의 시)", "PDF 또는 Figma 공유 링크. 로컬 편집 원본은 제공 범위 확인"],
      ["Creative Brief", "디자인 지시서: 디자인 문제 → 시각 방향 → 원칙 → 적용·제외 기준", ".pdf", "승인한 방향과 버전 표시"],
    ],
    identity: [
      ["Logo System", "로고 마스터 시트 + 벡터 에셋: 메인 로고·조합 규칙", ".svg / .pdf / .ai(포함 상품)", "웹·인쇄 용도 구분. .ai는 Custom Logo System 등 포함 상품에만 제공; Logo Starter 제외"],
      ["Logo Variations", "변형 로고 시트 + 개별 파일: 가로·세로·심벌·단색·반전", ".svg / .png / .pdf", "종류·색상·배경별 파일 분리. Logo Starter의 변형 시스템은 제외"],
      ["Logo Usage", "사용 규정 시트: 보호 여백·최소 크기·배경별 사용·금지 사례 도해", ".pdf", "올바른 사용과 잘못된 사용 예시 비교"],
      ["Color System", "컬러 팔레트 표: Primary / Secondary / Accent별 HEX·RGB·CMYK 값", ".pdf / .fig(별도 합의 시)", "PDF 또는 Figma 공유 링크. 인쇄·디지털 색상 구분; 색상 범위는 상품별 확인"],
      ["Typography", "타입 스케일 표: 제목/본문별 서체·크기·굵기·행간 + 웹 적용 스타일", ".pdf / .css(웹 적용 시)", "폰트명·라이선스·구매 링크 안내. 폰트 파일 자체는 사용권 확인 없이 재배포하지 않음"],
      ["Graphic System", "그래픽 규칙 시트 + 개별 에셋: 패턴·도형·선·아이콘·이미지 스타일", ".svg / .png / .pdf", "벡터·이미지·사용 가이드로 구분. 제작 항목은 범위 합의"],
    ],
    applications: [
      ["Application Examples", "실제 규격 적용 시트: 명함·SNS·제안서 표지·문서의 최종 시안 및 목업", ".png / .pdf", "SNS용 이미지·인쇄용 파일 구분. 일반 기준 2종, Essentials 기본 1종. 편집 원본·추가 수량은 별도 합의"],
    ],
    handoff: [
      ["Brand Guidelines", "목차형 가이드북: 로고 → 색상 → 서체 → 그래픽 → 응용 예시 → 금지 규정", ".pdf", "Essentials는 8–12페이지 미니 가이드. 그래픽·응용물 등 실제 제공 범위만 수록"],
      ["Asset Library", "납품 폴더: Logo / Color-Type / Graphics / Applications / Guidelines + 파일 목록", ".zip · 내부 .svg / .png / .jpg / .pdf / .ai(포함 시)", "압축 파일 또는 Drive 폴더 링크. 미포함 항목은 폴더에서도 제외; 인쇄 CMYK·웹 RGB 구분"],
      ["README / 라이선스", "인계 안내서: 폴더 구조·파일명·용도·버전·사용법·폰트/외부 자산 라이선스·지원 범위", ".md / .txt / .pdf 중 합의한 형식", "권장 문서 양식. 사용 조건·구매 출처를 기록하고 편집 원본은 상품별 제공 범위 확인"],
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
