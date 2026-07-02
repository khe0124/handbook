// 큐레이션 질문 은행. 자동 생성 카드와 달리 사람이 검수한 Q/A만 담는다.
// type — recall: 사실·수치 회상, judgment: 상황 판단, critique: 시안·구현 진단.
// tier — must: 암기 필수 판단 기준, good: 알아두면 좋은 심화.
// 카드가 없는 문서는 HandbookPage가 자동 생성 카드로 폴백한다.

export const QUESTION_BANK = [
  {
    "id": "vdf-01",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-elements",
    "question": "요소 사이 관계를 만들 때 약한 재료부터 쓰라는 우선순위 순서를 그대로 나열하면?",
    "answer": "간격 → 정렬 → 크기/굵기 → 면(배경) → 선 → 색 → 질감(그림자) 순이다. 요소를 추가하기 전에 \"이 관계를 더 약한 재료로 만들 수 없나\"를 먼저 묻는다. divider·box·shadow를 먼저 꺼내는 시안은 대개 간격과 정렬로 이미 해결됐어야 할 문제를 장식으로 덮은 것이다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "vdf-02",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-elements",
    "question": "표의 행 구분이 약해 보여 모든 행에 가로줄을 그으려 한다. 선(line)의 시각 기능 관점에서 먼저 점검할 것은?",
    "answer": "선은 최후의 분리 수단이므로, divider를 꺼내기 전에 간격·정렬로 관계를 만들 수 있는지 먼저 본다. 모든 행에 가로줄이 그어지면 데이터가 아니라 격자가 먼저 읽힌다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-03",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-elements",
    "question": "한 화면에 알림 dot·배지·강조 표시가 셋 이상 동시에 켜져 있다. 점(point)의 시각 기능으로 이 상황을 어떻게 판단하고 처리하는가?",
    "answer": "점은 \"지금 여기를 보라\"는 초점 신호인데, 강한 점이 셋 이상 켜지면 초점 자체가 사라진다. 한 뷰에서 강한 점은 하나로 수렴시켜야 한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-04",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-elements",
    "question": "그림자가 카드마다 장식처럼 붙어 있는 대시보드에서 modal과 dropdown이 배경과 구분되지 않는다. 조형 언어로 진단하면?",
    "answer": "질감(elevation)의 인플레이션이다. elevation은 \"이 면이 다른 면보다 위에 떠 있다\"는 위계 신호인데, 그림자를 장식으로 남발하면 깊이 언어가 인플레이션되어 실제로 떠 있어야 할 modal·dropdown이 구분되지 않는다. 질감은 위계를 표현하는 예산이 정해진 자원으로 다뤄야 한다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "vdf-05",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-principles",
    "question": "제목·본문·보조 정보가 다 조금씩 다르게 스타일링됐는데 화면이 오히려 산만한 시안. 대비(contrast) 원리로 진단하면?",
    "answer": "\"다 조금씩 다르게\"는 대비가 아니라 노이즈다. 대비는 소수의 요소에 차이를 몰아주고 나머지는 같게 두는 것이며, 강조가 셋을 넘으면 노이즈로 변한다. \"무엇을 강조할까\"보다 \"무엇을 강조하지 않을까\"를 먼저 정해야 한다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "vdf-06",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-principles",
    "question": "시안에서 정렬을 강하게 잡았더니 화면이 평평하고 지루해졌다. 원리들 사이의 관계로 이 현상을 설명하면?",
    "answer": "원리들은 서로 거래한다 — 정렬을 강하게 잡으면 통일이 올라가지만 리듬은 죽을 수 있고, 긴장을 넣으면 균형이 흔들린다. 시안 비평은 \"어떤 원리를 살리고 어떤 원리를 의도적으로 희생했는가\"를 언어로 만드는 일이다. 모든 원리를 동시에 최대화하면 아무것도 강하지 않은 평평한 화면이 나온다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "vdf-07",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-principles",
    "question": "저장 버튼이 페이지마다 위치·색·라벨이 다르게 나타나는 제품. 어떤 원리의 실패이고 사용자에게 어떤 비용이 생기는가?",
    "answer": "반복(repetition)의 실패다. 같은 의미의 요소는 같은 방식으로 반복돼야 패턴과 일관성이 생기는데, 화면마다 스타일이 다르면 사용자의 학습이 매번 리셋된다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "vdf-08",
    "docId": "practice-visual-design-foundations",
    "sectionId": "scale-proportion",
    "question": "표와 폼이 많은 정보 밀도 높은 업무 UI에 modular scale 비율을 고른다면 어느 범위이고, 왜 1.5는 부적합한가?",
    "answer": "1.125~1.2의 작은 비율이 단계가 촘촘해 표·폼에 유리하다. 1.5처럼 비율이 크면 대비가 극적이라 헤드라인 중심 화면에 맞고, 밀도 높은 업무 UI에서는 중간 단계가 부족해진다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-09",
    "docId": "practice-visual-design-foundations",
    "sectionId": "scale-proportion",
    "question": "type scale의 단계 수는 몇 개로 제한하고, 각 단계에는 무엇을 붙이는가?",
    "answer": "단계를 5~7개로 제한한다. 단계가 열 개면 어느 걸 써야 할지 매번 고민이 생겨 결국 일관성이 무너진다. 각 단계에는 caption·body·title 같은 역할을 붙인다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "vdf-10",
    "docId": "practice-visual-design-foundations",
    "sectionId": "scale-proportion",
    "question": "8pt system이 주는 실무 이점 두 가지와, half-step이 허용되는 경우는?",
    "answer": "디자인과 개발이 같은 그리드에서 움직여 handoff 오차가 줄고, 1x·2x·3x 등 다양한 화면 밀도에서 픽셀이 깨지지 않는다. 아이콘·라인하이트 같은 작은 단위는 4pt half-step이 허용된다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "vdf-11",
    "docId": "practice-visual-design-foundations",
    "sectionId": "scale-proportion",
    "question": "동료가 \"이 레이아웃은 황금비(1.618)라서 맞다\"고 시안을 방어한다. 어떻게 대응해야 하는가?",
    "answer": "\"황금비라서 맞다\"는 근거는 비평에서 거절한다 — 목적·가독성·정보 위계로 설명해야 한다. 화면 레이아웃에서 황금비를 강제하면 반응형 breakpoint, 콘텐츠 가변 길이, 8pt 그리드와 충돌하며, 실무에서는 일관된 modular scale + 8pt spacing이 훨씬 신뢰할 수 있다. 황금비는 참고 출발점이지 검증 기준이 아니다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-12",
    "docId": "practice-visual-design-foundations",
    "sectionId": "gestalt-principles",
    "question": "\"정렬은 맞는데 어수선하다\"는 피드백을 받았다. 어느 Gestalt 원리부터 의심하고, 어떤 부등식을 확인하는가?",
    "answer": "대개 proximity가 범인이다. 관련 요소 사이 간격이 무관한 요소 사이 간격보다 크면 눈은 정렬이 아니라 거리로 그룹을 만든다. \"그룹 내 간격 < 그룹 간 간격\" 부등식이 깨졌는지부터 확인하고, divider를 추가하기 전에 이 부등식을 먼저 고친다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-13",
    "docId": "practice-visual-design-foundations",
    "sectionId": "gestalt-principles",
    "question": "폼에서 라벨이 자기 입력 필드보다 아래 입력 필드에 더 가까이 붙어 있다. Gestalt 용어로 진단하면?",
    "answer": "proximity 위반이다. 가까운 요소는 한 그룹으로 보이므로, 라벨이 자기 입력보다 아래 입력에 더 가까우면 관계가 뒤집혀 읽힌다. 거리가 곧 소속을 말하기 때문에 라벨-입력 간격이 소속을 정확히 말하도록 좁혀야 한다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "vdf-14",
    "docId": "practice-visual-design-foundations",
    "sectionId": "whitespace",
    "question": "운영 분석 대시보드에 \"여백을 넉넉히\"라는 일반론을 적용하면 왜 실패하고, 밀도 높은 UI의 여백 전략은 무엇인가?",
    "answer": "운영자는 한 화면에서 최대한 많은 지표를 동시에 보려 하는데, macro 여백을 넉넉히 주면 스크롤이 늘고 비교가 끊긴다. 전략은 micro 여백은 지키되 macro 여백은 압축하고, 대신 정렬·구분선·배경 톤으로 그룹을 만드는 것이다. 밀도는 죄가 아니다 — 조직되지 않은 밀도가 죄다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "vdf-15",
    "docId": "practice-visual-design-foundations",
    "sectionId": "grid-systems",
    "question": "새 화면의 그리드를 잡을 때 12열부터 깔면 왜 문제이고, 올바른 작업 순서는?",
    "answer": "그리드는 콘텐츠 다음이다 — 12열을 먼저 깔고 콘텐츠를 끼워 맞추면 억지가 생긴다. 순서는 콘텐츠 우선순위 → column grid 설정 → spacing scale 고정 → 요소 배치·정렬 → breakpoint 재배치다. 그리드 이탈(break the grid)로 강조하는 것은 나머지가 그리드를 확실히 지킬 때만 의도로 읽힌다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "vdf-16",
    "docId": "practice-visual-design-foundations",
    "sectionId": "grid-systems",
    "question": "웹에서 column grid를 흔히 12열로 두는 이유와, baseline grid가 특히 효과적인 UI 유형은?",
    "answer": "12열은 2·3·4·6으로 나눠 떨어져 유연하기 때문이다. baseline grid는 여러 칼럼·요소의 텍스트 baseline을 같은 수평선에 맞춰 읽기 안정감을 주며, 8pt 또는 4pt 배수 line-height와 맞물린다. 밀도 높은 리포트·문서형 UI에서 특히 효과가 크다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "vdf-17",
    "docId": "practice-visual-design-foundations",
    "sectionId": "visual-hierarchy-audit",
    "question": "모든 숫자가 굵고 크고 모든 카드에 강한 색이 들어간 대시보드. 위계 설계 관점에서 무엇이 잘못됐고 해법의 방향은?",
    "answer": "모든 것을 강조하면 아무것도 강조되지 않아, 사용자가 어디를 봐야 할지 스스로 정해야 하는 상태다. 위계 설계는 강조가 아니라 탈강조(de-emphasis)의 기술이다 — 배경 정보를 회색으로, 작게, 조용하게 밀어내야 주인공이 산다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "vdf-18",
    "docId": "practice-visual-design-foundations",
    "sectionId": "composition-critique",
    "question": "매출 요약 카드 비평 사례(before/after)에서 색을 바꾼 곳은 몇 군데였고, 이 사례가 말하는 위계 수단의 우선순위는?",
    "answer": "바꾼 색은 하나(상세보기/거래 버튼)뿐이고, 나머지는 전부 크기·굵기·간격·선 제거 같은 조형 수단이었다. 좋은 위계는 색을 마지막에 아주 조금만 쓴다. 색부터 꺼내는 시안은 대개 조형으로 풀어야 할 문제를 색으로 덮은 것이다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "ctb-01",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-fundamentals",
    "question": "새 색 시스템을 설계할 때 hue보다 먼저 확정해야 하는 축은 무엇이고, 그 이유는?",
    "answer": "value(명도)다. 밝기 순서(명도 계단)를 먼저 설계하면 다크모드 반전, 접근성 대비, 흑백 출력이 자동으로 따라온다. hue와 채도는 그 위에 얹는 장식에 가깝다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "ctb-02",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-models",
    "question": "HSL에서 success(초록)와 info(파랑)의 lightness를 똑같이 50%로 맞췄는데 위계가 흐트러지는 이유는?",
    "answer": "HSL은 지각 균등하지 않아 lightness가 같아도 노랑·초록 계열은 눈부시고 파랑은 침침하게 보이기 때문이다. OKLCH는 L 값이 실제 지각 밝기에 대응하므로 \"모든 상태 색을 같은 밝기로\"가 값 하나로 성립한다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "ctb-03",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-models",
    "question": "새 색 시스템의 소스 좌표계와 산출물 좌표계를 어떻게 나누고, Display P3는 어떤 위치로 다루는가?",
    "answer": "OKLCH로 설계하고 sRGB HEX로 내보낸다 — 소스는 지각 좌표, 산출물은 호환 좌표. 이렇게 하면 \"primary를 5% 어둡게\"가 재현 가능한 편집이 된다. P3는 sRGB로 성립하는 팔레트를 기준선으로 두고 넓힘(enhancement)으로만 쓴다. P3에만 있는 색은 sRGB 환경에서 clip되어 다르게 보이기 때문이다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "ctb-04",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-harmony",
    "question": "팔레트를 색상환 놀이로 시작하지 말라면, 실제 구축 순서는 무엇이고 harmony 규칙이 가장 쓸모 있는 지점은 어디인가?",
    "answer": "먼저 뉴트럴 계단(배경·표면·경계·본문 텍스트)을 세우고, 그 위에 brand primary 하나, 그 위에 semantic 색 몇 개를 얹는다. harmony 규칙은 accent를 고를 때와 데이터 시각화에서 여러 계열을 나란히 놓을 때 가장 쓸모 있다. 카테고리를 우열 없이 구분하려면 채도·명도를 균등하게 맞춘 analogous 또는 triadic 세트를 쓴다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "ctb-05",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-harmony",
    "question": "60-30-10 규칙에서 각 비율이 맡는 역할과, accent가 어느 선을 넘으면 실패하는가?",
    "answer": "dominant 60%는 배경·뉴트럴, secondary 30%는 구획·표면, accent 10%는 강조·CTA다. 비율 자체보다 \"지배·보조·강조에 면적 위계를 준다\"는 원리가 핵심이며, accent가 30%를 넘어가면 강조가 아니라 소음이 된다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "ctb-06",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-harmony",
    "question": "보색(complementary) 두 색을 넓은 면적에 나란히 깐 히어로 시안이 눈이 아프다. 진단과 처방은?",
    "answer": "complementary는 대비가 가장 강해 넓은 면적에 나란히 두면 눈이 진동(vibration)한다. accent/CTA처럼 좁게 쓰고 두 색의 면적을 크게 차이 내야 한다. 긴장은 유지하되 덜 날카로운 대안으로 split-complementary가 있다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "ctb-07",
    "docId": "practice-color-typography-brand",
    "sectionId": "palette-decision",
    "question": "디자인 토큰 이름을 blue-500이 아니라 --color-action처럼 짓는 이유와, 색-이름 팔레트는 어디에 두는가?",
    "answer": "역할로 지으면 리브랜딩·다크모드에서 값만 바꾸면 되고, 코드에서 \"왜 파랑인가\"가 아니라 \"여기는 action이다\"로 읽힌다. 색-이름 팔레트는 원자재(primitive)로 한 층 아래에 두고 역할-이름 토큰이 그것을 참조하게 한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "ctb-08",
    "docId": "practice-color-typography-brand",
    "sectionId": "palette-decision",
    "question": "brand primary 색이 CTA에도 쓰이고 헤더 장식·아이콘 배경에도 쓰이는 제품. 팔레트 역할 관점의 문제는?",
    "answer": "primary는 브랜드와 핵심 행동을 동시에 대표해 CTA·링크·선택 상태에서 일관되게 보여야 하는데, 장식으로도 쓰이면 \"이 색 = 클릭 가능\"이라는 신호가 희석된다. 팔레트는 색 목록이 아니라 역할의 집합이므로, 각 색이 무엇을 위한 색인지 정의되어야 화면이 늘어도 무너지지 않는다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "ctb-09",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-accessibility",
    "question": "WCAG 2.x 기준으로 본문 텍스트, 큰 텍스트, 비텍스트 UI 요소의 최소 대비는 각각 얼마인가?",
    "answer": "본문 텍스트는 4.5:1(AA)이고 보조·placeholder 텍스트도 같은 기준이다. 큰 텍스트(대략 24px 이상, 또는 굵은 19px 이상)는 3:1, 아이콘·입력 경계·차트 요소 같은 비텍스트 UI 구성요소도 3:1이다. 경계선·포커스 링·토글 상태가 흔히 빠뜨리는 대상이다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "ctb-10",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-accessibility",
    "question": "폼 에러를 테두리 색만 빨갛게 바꿔 표시한 화면의 접근성 문제를 진단하면?",
    "answer": "색만으로 의미를 전달하는 안티패턴으로, 적록 색맹(남성 약 8%)에게는 정보가 사라진다. 반드시 색 + 두 번째 채널(아이콘, 텍스트, 패턴, 위치, 명도 차이)을 함께 준다. 상태 배지는 색 + 텍스트(\"승인됨\"), 차트는 색 + 직접 라벨 또는 명도 대비로 처리한다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "ctb-11",
    "docId": "practice-color-typography-brand",
    "sectionId": "color-accessibility",
    "question": "light 모드에서 대비를 통과한 팔레트를 다크모드로 옮길 때 semantic 색은 어떻게 조정하는가?",
    "answer": "다크모드는 대비를 새로 검증해야 한다 — light에서 4.5:1이던 짝이 dark에서 탈락하는 일이 흔하다. semantic 색은 어두운 배경 위에서 채도를 조금 낮추고 명도를 올려야 눈부심 없이 읽힌다. 대비 측정은 디자인 시안이 아니라 실제 구현된 배경색 위에서 한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "ctb-12",
    "docId": "practice-color-typography-brand",
    "sectionId": "typography-advanced",
    "question": "kerning, tracking, leading은 각각 무엇을 조정하는가?",
    "answer": "kerning은 특정 글자 쌍(\"AV\", \"To\") 사이 간격 조정이고, tracking(letter-spacing)은 글자 전체에 일괄로 주는 간격이며, leading(line-height)은 줄과 줄 사이 세로 간격이다. 앞 둘은 가로, leading은 세로다. tracking은 대문자·작은 캡션은 살짝 늘리고 큰 제목은 살짝 줄인다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "ctb-13",
    "docId": "practice-color-typography-brand",
    "sectionId": "typography-advanced",
    "question": "대시보드 표 안에서 금액 숫자가 세로로 흔들려 자릿수가 안 맞아 보인다. 원인과 한 줄 처방은?",
    "answer": "십중팔구 tabular figures를 안 켠 것이다. font-variant-numeric: tabular-nums 한 줄로 모든 숫자 폭이 같아져 자릿수 정렬이 잡힌다. 이건 취향이 아니라 비교 가능성의 문제이며, 매출·거래량 표에는 필수다. 반대로 oldstyle figures는 본문용이라 UI 표엔 부적합하다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "ctb-14",
    "docId": "practice-color-typography-brand",
    "sectionId": "typography-advanced",
    "question": "라틴 폰트 상식을 그대로 한글 본문에 적용할 때 자간·정렬·줄바꿈에서 각각 무엇이 달라져야 하는가?",
    "answer": "한글은 네모틀에 꽉 차 자간이 붙어 보이므로 본문 자간은 거의 주지 않거나 아주 미세하게만 주고, 과한 음수 자간은 받침이 뭉갠다. 단어 사이 공백이 적어 양끝정렬 시 벌어짐이 심하므로 좌측정렬을 기본으로 한다. 줄바꿈은 word-break: keep-all로 어절 단위를 유지해 낱글자 끊김을 막고, 장평은 임의로 왜곡하지 않는다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "ctb-15",
    "docId": "practice-color-typography-brand",
    "sectionId": "typography-scale",
    "question": "하나의 스케일 비율을 화면 전체에 기계적으로 적용하지 말라는 이유와, 실전에서 잘 맞는 구성은?",
    "answer": "이중 스케일이 실전에서 잘 맞는다 — 제목 계열은 큰 비율(1.25~1.333)로 대비를 주되, body·caption·label 같은 본문 근처는 작은 비율로 촘촘하게 둔다. 정보 밀도 높은 대시보드는 1.125(Major Second)처럼 촘촘한 비율을 쓰고 미묘한 단계 차이는 weight로 보강한다. 모바일에서는 상단 몇 단계를 clamp로 눌러 큰 제목이 화면을 잡아먹지 않게 한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "ctb-16",
    "docId": "practice-color-typography-brand",
    "sectionId": "typesetting",
    "question": "본문 line length(measure)의 목표치는 라틴과 한글에서 각각 몇 자인가?",
    "answer": "라틴 본문은 공백 포함 대략 45~75자, 이상적으로 66자 근처다. 한글은 한 글자의 정보 밀도가 높아 더 짧은 25~40자를 목표로 한다. 넓은 컨테이너에서는 max-width로 폭을 제한해 본문이 화면 끝까지 늘어지지 않게 한다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "ctb-17",
    "docId": "practice-color-typography-brand",
    "sectionId": "typesetting",
    "question": "1200px 컨테이너를 꽉 채운 양끝정렬 한글 리포트 본문에 제목 마지막 단어가 홀로 줄바꿈까지 됐다. 세 가지 문제를 조판 용어로 진단하고 처방하면?",
    "answer": "(1) measure 초과 — 한 줄이 100자를 넘으니 max-width로 한글 32자 안팎(약 40rem)으로 좁힌다. (2) 양끝정렬(justify) — 한글은 공백이 적어 흰 강(river)이 더 심하므로 좌측정렬로 바꾼다. (3) widow — 제목에 text-wrap: balance를 줘 두 줄이 고르게 나뉘게 한다. 폰트 크기를 바꾸지 않아도 읽기 편안함이 올라간다 — 조판은 크기가 아니라 배치의 문제다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "ctb-18",
    "docId": "practice-color-typography-brand",
    "sectionId": "brand-language",
    "question": "공공·규제 산업 B2B 제품에서 브랜드의 태도는 무엇이고, 브랜드 일관성을 검증하는 첫 번째 audit 방법은?",
    "answer": "화려함이 아니라 신뢰와 명료함이 태도다 — 데이터가 정확해 보이고, 상태가 오해 없이 읽히고, 접근성·표기 규정을 지키는 것 자체가 브랜드이며, 과한 장식·고채도·유행 모션은 오히려 신뢰를 깎는다. audit의 첫 단계는 서로 다른 화면 5개를 나란히 놓고 로고를 가려도 같은 제품으로 보이는지 확인하는 것이다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "dv-01",
    "docId": "practice-data-visualization",
    "sectionId": "chart-selection",
    "question": "차트 유형을 고르기 전에 반드시 해야 할 한 가지 작업과, 그것이 안 될 때의 의미는?",
    "answer": "\"2020년 이후 월간 활성 사용자가 증가 추세다\"처럼 메시지를 한 문장으로 써 본다. 그러면 의도(trend)가 정해지고 후보 차트(line)가 거의 자동으로 좁혀진다. 이 문장을 못 쓰겠다면 아직 차트를 고를 단계가 아니라 데이터에 무슨 질문을 하는지 정할 단계다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "dv-02",
    "docId": "practice-data-visualization",
    "sectionId": "chart-selection",
    "question": "pie chart를 써도 되는 조건과, 그 조건을 벗어났을 때의 대안은?",
    "answer": "항목이 2~3개이고 값 차이가 클 때만 쓴다. 조각이 5개를 넘거나 값이 비슷하면 각도 비교가 불가능해지므로 정렬된 bar가 낫고, 조각이 3개만 넘어도 거의 항상 정렬된 bar가 더 빠르고 정확하게 읽힌다. 시간에 따른 구성 변화는 stacked bar/area로 본다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "dv-03",
    "docId": "practice-data-visualization",
    "sectionId": "chart-selection",
    "question": "부서별(범주형) 값을 line chart로 이어 그린 초안의 문제를 진단하면?",
    "answer": "line은 연속 시간에만 쓴다. 범주형을 line으로 이으면 데이터에 없는 연속성을 암시해 점 사이의 기울기가 존재하지 않는 변화처럼 읽힌다. 항목 간 비교가 의도라면 bar chart로 바꾸고, 범주 라벨이 길면 가로 bar가 안전하다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "dv-04",
    "docId": "practice-data-visualization",
    "sectionId": "chart-selection",
    "question": "지역별 절대 사용량을 choropleth map으로 보여달라는 요청을 받았다. 어떤 왜곡을 경계하고 무엇을 검토하는가?",
    "answer": "면적이 큰 지역이 값을 과장한다 — 넓은 행정구역이 큰 색 덩어리가 되기 때문이다. 인구·면적 대비 정규화가 거의 항상 필요하고, 절대값 비교가 목적이라면 지도보다 bar가 정확할 때가 많다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "dv-05",
    "docId": "practice-data-visualization",
    "sectionId": "encoding-principles",
    "question": "Cleveland-McGill 지각 실험이 밝힌 정량 값 판독 정확도 순위와, 이를 요약한 실무 규칙은?",
    "answer": "position > length > angle > area > color/volume 순이다(1984년 Cleveland와 McGill의 지각 실험). 실무 규칙은 \"정확히 비교시켜야 하는 값일수록 위쪽 채널로 인코딩하라\"이다. pie(angle)나 bubble(area)로 정밀 비교를 요구하면 독자에게 어려운 지각 과제를 떠넘기는 것이다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "dv-06",
    "docId": "practice-data-visualization",
    "sectionId": "encoding-principles",
    "question": "대시보드에서 pre-attentive attribute로 강조를 설계할 때 지켜야 할 조건은?",
    "answer": "색상·방향·크기·위치 같은 pre-attentive 속성은 의식적으로 세기 전에 즉시 지각된다 — 빨간 점 하나가 회색 점 100개 사이에서 즉시 튀는 이유다. 단 pre-attentive 강조를 여러 개 동시에 쓰면 서로 상쇄되어 아무것도 튀지 않는다. 강조는 희소해야 강조다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "dv-07",
    "docId": "practice-data-visualization",
    "sectionId": "encoding-principles",
    "question": "차트에서 격자선·그림자 같은 요소를 지울지 말지 판단하는 Tufte식 기준은?",
    "answer": "요소를 지웠을 때 값 읽기가 나빠지지 않으면 지운다. 데이터를 나타내지 않고 주의만 뺏는 요소(격자선, 그림자, 3D 효과, 배경 이미지)가 chartjunk이고, 잉크 중 실제 데이터를 나타내는 비율이 data-ink ratio다. 격자선은 흐리게, 축은 최소로, 라벨은 데이터 옆에 직접 붙인다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "dv-08",
    "docId": "practice-data-visualization",
    "sectionId": "axes-scales",
    "question": "bar chart와 line chart의 y축 baseline 규칙은 어떻게 다르고, 그 근거는?",
    "answer": "bar는 길이가 값을 인코딩하므로 baseline이 0이어야 길이가 값에 비례한다 — 예외 없음. line은 위치·기울기로 추세를 보이므로 0에서 시작할 필요가 없고, 변동 폭이 작으면 축을 데이터 범위에 맞춰 좁혀도 되지만 축 범위를 반드시 표기한다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "dv-09",
    "docId": "practice-data-visualization",
    "sectionId": "axes-scales",
    "question": "오류율이 100에서 98로 줄었는데 y축을 95~100으로 자른 bar chart. 무엇이 왜곡되는가?",
    "answer": "2% 감소인데 막대가 절반으로 보여 \"절반으로 줄었다\"는 거짓 메시지가 된다. 막대의 길이가 값을 인코딩하므로 0이 아닌 값에서 자르면 시각적 크기가 실제 값 비율과 어긋난다. 경영진 리포트에서 잘린 축은 신뢰를 무너뜨리는 가장 흔한 실수다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "dv-10",
    "docId": "practice-data-visualization",
    "sectionId": "axes-scales",
    "question": "단위가 다른 두 계열을 한 차트에 겹쳐 보여달라는 요청(dual-axis)을 받았다. 왜 원칙적으로 거절하고 무엇으로 대체하는가?",
    "answer": "두 축의 스케일을 임의로 정할 수 있어 존재하지 않는 교차점·상관을 만들어낼 수 있기 때문이다. 원칙적으로 피하고, 필요하면 두 개의 정렬된 차트(small multiples)로 나눈다. small multiples는 축 스케일을 통일하는 것이 핵심이다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "dv-11",
    "docId": "practice-data-visualization",
    "sectionId": "color-in-dataviz",
    "question": "sequential, diverging, categorical 팔레트는 각각 어떤 성격의 데이터에 쓰고, 범주 색의 상한은?",
    "answer": "sequential은 순서 있는 연속 값(0→높음)에 단일 hue 밝기 그라데이션으로, diverging은 의미 있는 중앙값 기준 양방향(목표 대비 초과/미달)에 양끝 다른 hue·중앙 옅게로, categorical은 순서 없는 범주에 구분되는 hue로 쓴다. 범주 색은 7~8개를 넘기지 않고, 넘으면 \"기타\"로 묶거나 직접 라벨로 바꾼다. diverging은 중앙점을 데이터의 0이나 목표에 정확히 맞춘다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "dv-12",
    "docId": "practice-data-visualization",
    "sectionId": "color-in-dataviz",
    "question": "계열 12개짜리 stacked bar에 12색을 쓴 차트의 문제를 진단하고 바로잡으면?",
    "answer": "독자가 범례와 막대를 눈으로 왕복하며 매칭해야 하는 색의 실패다. 색은 구분해야 할 대상이 적을 때만 강력하다. 상위 몇 개만 색을 주고 나머지는 회색 \"기타\"로 묶거나, 색 대신 직접 라벨을 붙인다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "dv-13",
    "docId": "practice-data-visualization",
    "sectionId": "dashboard-hierarchy",
    "question": "대시보드 리뷰를 시작하는 첫 질문은 무엇이고, 답이 세 개 넘게 나오면 어떻게 하는가?",
    "answer": "\"이 화면이 답하는 질문이 무엇인가?\"로 시작한다. 답이 세 개 넘게 나오면 대시보드 하나에 여러 화면이 섞인 것이므로 화면을 나누거나 탭으로 분리한다. KPI가 5개를 넘으면 우선순위가 없는 것이고, 시선은 좌상단에서 F/Z 패턴으로 훑으므로 가장 중요한 값을 좌상단에 둔다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "dv-14",
    "docId": "practice-data-visualization",
    "sectionId": "misleading",
    "question": "버블 차트에서 값을 지름(반지름)에 매핑하면 어떤 왜곡이 생기고, 올바른 매핑은?",
    "answer": "지름에 매핑하면 넓이는 제곱으로 커져 값 차이가 제곱으로 과장된다. 버블은 값을 넓이(area)에 비례시켜야 한다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "dv-15",
    "docId": "practice-data-visualization",
    "sectionId": "dataviz-a11y",
    "question": "인터랙티브 차트의 핵심 값이 마우스 hover tooltip에만 있고, 데이터 표도 텍스트 요약도 없다. 접근성 관점에서 진단하면?",
    "answer": "값에 도달하는 경로가 시각+마우스 하나뿐이라 스크린리더·키보드 사용자에게는 차트가 존재하지 않는 것과 같다. 마우스 hover 전용 정보는 금지 — 데이터 포인트에 tab 이동·포커스 표시를 주고 tooltip을 키보드로도 열 수 있게 한다. 같은 데이터의 표 대안과 \"2020년 이후 월간 활성 사용자는 12% 증가했다\" 같은 텍스트 요약 한 문장을 차트 곁에 둔다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "dv-16",
    "docId": "practice-data-visualization",
    "sectionId": "ops-report",
    "question": "월간 운영 리포트 초안이 카테고리 8조각 pie, 사용량-전환율 dual-axis, y축 95~100 잘림을 한 화면에 담았다. 세 안티패턴이 각각 무엇을 왜곡하고, after에서 어떻게 고쳤는가?",
    "answer": "pie 8조각은 각도 비교가 불가능하고, dual-axis는 없는 상관을 암시하며, 잘린 축은 2% 변화를 절반처럼 보이게 한다. after에서는 카테고리를 월별 축 stacked bar로 바꿔 구성과 변화를 동시에 보이고, 두 지표는 small multiples 두 개로 분리하고, line 축 범위를 명시하고 목표치를 참조선으로 넣었다. 각 차트 곁에 \"전월 대비 2% 증가, 목표(+5%)에는 미달\" 같은 텍스트 요약을 붙여 데이터는 그대로인데 정직하게 읽히게 했다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "dv-17",
    "docId": "practice-data-visualization",
    "sectionId": "ops-report",
    "question": "\"목표치 대비 진행\"과 \"카테고리별 구성(5개 이상, 시간 변화 포함)\"은 각각 어떤 차트로 보여주는가?",
    "answer": "목표 대비 진행은 bullet chart 또는 progress bar로 목표선을 명확히 표시하고, 달성/미달을 diverging semantic color로 나타낸다. 카테고리가 5개 이상이면 pie 대신 stacked bar를 쓰고, 월별 축을 두면 구성 변화도 함께 읽힌다. 단일 핵심 수치(잔여 할당량)는 KPI 숫자로 크게 보여준다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "aiux-01",
    "docId": "design-ai-product-ux",
    "sectionId": "uncertainty",
    "question": "팀원이 모델의 confidence 점수 0.87을 답변 옆에 그대로 노출하자고 제안한다. 왜 위험하고, 대신 무엇을 보여줘야 하나?",
    "answer": "대부분의 LLM confidence는 calibration이 안 돼 있어 0.9라고 실제로 90% 맞는 게 아니고, 사용자는 숫자를 봐도 자기가 뭘 해야 할지 모른다. 불확실성은 숫자가 아니라 행동으로 번역해 표시한다 — \"이 답은 근거가 약하니 발송 전 담당자 확인이 필요합니다\"가 \"confidence 62%\"보다 유용하다. 상태별로 근거 충분(출처 chip), 근거 일부(검토 권장 배지), 근거 없음(\"찾지 못함\" 명시), 정책 제한(거절 이유+허용 범위)을 구분한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-02",
    "docId": "design-ai-product-ux",
    "sectionId": "uncertainty",
    "question": "읽고 마는 요약과 금액·정산 수치가 들어간 리포트 문안, 두 결과에 불확실성 표시 강도를 어떻게 다르게 가져가나? 똑같이 강하게 걸면 무슨 문제가 생기나?",
    "answer": "표현 강도는 결과의 되돌릴 수 있는 정도에 맞춘다. 읽고 마는 요약은 가벼운 배지로 충분하지만, 금액·정산 수치가 들어간 문안은 근거가 일부만 있어도 강한 검토 요청을 붙인다. 위험이 낮은 곳에 경고를 남발하면 alert fatigue로 정작 중요한 경고가 무시된다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-03",
    "docId": "design-ai-product-ux",
    "sectionId": "uncertainty",
    "question": "화면 하단에 \"AI가 생성한 콘텐츠는 부정확할 수 있습니다\" 전역 고지 하나를 두고 불확실성 표시를 끝낸 구현을 진단하라.",
    "answer": "안티패턴이다 — 이건 법적 방어일 뿐 UX가 아니고, 사용자는 그 문구를 3초 만에 눈에서 지운다. 불확실성은 각 답변의 맥락에서, 그 답이 실제로 얼마나 위험한지에 비례해 표시해야 한다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "aiux-04",
    "docId": "design-ai-product-ux",
    "sectionId": "citation",
    "question": "citation UX contract의 7개 구성 요소를 순서대로 나열하고, 이 사슬이 끊기면 어떤 일이 벌어지는지 말하라.",
    "answer": "answer claim(주장 단위 분리) → source chip(인라인 출처 표식) → evidence preview(원문 발췌 하이라이트) → document location(문서명+섹션/페이지 앵커) → last updated(최종 수정일, 오래되면 경고) → permission state(원문 열람 권한 표시) → report wrong citation(신고 경로). 하나라도 끊기면 사용자는 검증을 포기하고, 검증 포기는 over-trust로 이어진다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "aiux-05",
    "docId": "design-ai-product-ux",
    "sectionId": "citation",
    "question": "감사 대비 점검 중 두 가지가 발견됐다: (1) 출처 chip을 누르면 사용자 권한이 없어 미리보기에서 403이 뜬다, (2) 근거로 걸린 고시가 이미 개정·폐지된 버전이다. 각각 왜 문제이고 어떻게 고치나?",
    "answer": "(1) 권한 없는 문서를 출처로 걸어 403이 뜨는 건 금지 패턴 — 신뢰가 즉시 붕괴한다. permission state를 chip에 함께 표시해야 한다. (2) \"출처는 있는데 낡은 출처\"는 감사에서 가장 자주 걸리는 지점 — 최종 수정일과 문서 버전을 chip에 노출하고, 일정 기간 이상 지난 근거는 \"최신 여부 확인 필요\"로 표시한다. 가짜 근거가 근거 없음보다 나쁘다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "aiux-06",
    "docId": "design-ai-product-ux",
    "sectionId": "citation",
    "question": "evidence preview에서 근거 문서 전체를 열어주기만 하는 구현은 왜 부족한가?",
    "answer": "사용자는 어디를 봐야 할지 몰라 검증을 안 하게 된다. 원문 중 실제로 인용된 문장을 하이라이트해서 \"이 주장은 이 문장에서 나왔다\"를 시각적으로 연결하는 것이 citation UI의 실제 가치다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "aiux-07",
    "docId": "design-ai-product-ux",
    "sectionId": "review-approval",
    "question": "AI가 만든 규제 정산 리포트 초안에 \"승인\" 버튼 하나만 있고 누르면 대외 공개된다. 무엇을 바꿔야 하나?",
    "answer": "(1) 수치 항목마다 원장 데이터와의 대사(reconcile) 결과를 옆에 표시, (2) 근거가 없는 수치는 빨간 배지로 강제 표시, (3) 승인은 2단계 + 승인자 이름·시각을 audit log에 기록, (4) 공개 후에도 정정 이력을 남기는 rollback 경로 유지. 공공 정산에서 \"누가 언제 무엇을 승인했나\"는 UX가 아니라 규정 요건이다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-08",
    "docId": "design-ai-product-ux",
    "sectionId": "review-approval",
    "question": "외부로 발송되는 공문 문안을 AI가 생성한다. 검토 UI의 기본값은 무엇이어야 하고, 검토자가 사실 확인할 지점을 어떻게 드러내나?",
    "answer": "검토 UI의 기본값은 diff다 — \"새 문안 전체\"보다 \"기존 대비 무엇이 바뀌었나\"를 보여줄 때 사람이 실수를 훨씬 잘 잡는다. 모델이 넣은 수치·날짜·고유명사를 시각적으로 구분해 검토자가 사실 확인해야 할 지점을 바로 찾게 한다. 외부 발송 문안은 사람 승인 필수이며 review diff, approve, reject, edit 요소를 갖춘다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "aiux-09",
    "docId": "design-ai-product-ux",
    "sectionId": "generation-ux",
    "question": "본문이 다 나온 뒤 출처를 소급해 붙이는 스트리밍 구조다. 스트리밍 도중 복사·발송 버튼은 어떻게 처리해야 하고, thinking 상태는 어떻게 보여줘야 하나?",
    "answer": "스트리밍 중에는 복사·발송 버튼을 비활성화한다 — 출처가 아직 안 붙은 문장을 사용자가 복사해 가면 근거 없는 텍스트가 밖으로 나간다. thinking 상태는 가짜로 길게 끌지 말고, 실제로 오래 걸리는 단계(검색 중 / 근거 대조 중 / 초안 작성 중)를 단계명으로 보여주는 편이 정직하다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-10",
    "docId": "design-ai-product-ux",
    "sectionId": "errors-refusal",
    "question": "timeout으로 리포트 생성이 중간에 끊겨 문장이 절반에서 잘렸다. partial 결과를 어떻게 처리하고, 자동 재시도는 언제 걸면 안 되나?",
    "answer": "partial이 완성본처럼 보이면 사용자가 그대로 쓴다. 명시적으로 \"생성이 중단됨\" 표시 + 미완성 상태 배지 + 발송·저장 잠금을 건다. 자동 재시도는 결제·발송 같은 non-idempotent 작업에는 절대 걸지 않는다 — 중복 실행이 partial보다 더 큰 사고다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-11",
    "docId": "design-ai-product-ux",
    "sectionId": "errors-refusal",
    "question": "권한 문제로 문서 요약이 불가능할 때 \"요청을 처리할 수 없습니다\"만 띄우는 화면을 재설계하라. 거절 설계의 원칙은?",
    "answer": "거절은 막다른 골목이 아니라 분기점이어야 한다. 항상 왜 거절했는지 + 다음에 할 수 있는 것 두 가지를 함께 준다. 좋은 예: \"이 문서는 열람 권한이 필요해 요약할 수 없습니다. 권한을 요청하거나, 공개된 요약본을 대신 볼 수 있습니다.\" 또한 expected failure(근거 없음, 정책 거절, rate limit, timeout)와 bug(파싱 실패, 서버 500)를 같은 오류 화면으로 뭉개지 말고 구분해 설계한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "aiux-12",
    "docId": "design-ai-product-ux",
    "sectionId": "human-handoff",
    "question": "handoff를 발동시키는 4가지 트리거와 handoff packet의 구성 요소를 나열하라.",
    "answer": "트리거: low_evidence(근거 부족·상충), high_risk_action(결제·삭제·대외 발송), policy_ambiguity(규정 해석이 갈림), repeated_correction(같은 오류를 2회+ 지적). packet: user_question, model_answer, retrieved_evidence, confidence_reason, user_feedback, suggested_next_action — 담당자가 맥락을 다시 캐지 않게 하기 위함이다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "aiux-13",
    "docId": "design-ai-product-ux",
    "sectionId": "human-handoff",
    "question": "사용자가 같은 오류를 두 번 이상 고쳐줬는데 계속 재생성만 반복되고 있다. 이 신호를 어떻게 해석하고 무엇을 해야 하나?",
    "answer": "repeated correction은 모델이 그 맥락을 못 잡고 있다는 강력한 신호다. 계속 재생성하게 두지 말고 \"담당자에게 연결할까요?\"를 제안한다 — 핸드오프 경로가 없으면 사용자를 무한 재시도 루프에 가둔다. 넘긴 뒤에도 \"담당자 검토 중\", \"예상 응답 시각\" 같은 상태를 보여주고, 담당자의 답은 원래 대화 맥락에 이어 붙인다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "aiux-14",
    "docId": "design-ai-product-ux",
    "sectionId": "trust-mental-model",
    "question": "over-trust와 under-trust의 증상과 각각의 완화책은?",
    "answer": "over-trust(automation bias)는 근거를 안 열고 결과를 그대로 발송하는 증상 — 고위험 결과에 검토 friction을 의도적으로 삽입해 완화한다. under-trust는 맞는 답도 매번 처음부터 다시 확인하는 증상 — 근거·정확도 이력을 보여 신뢰를 축적한다. 공통 해법은 능력과 한계를 정직하게 노출하는 것이며, 한 번의 confident hallucination이 제품 전체 신뢰를 무너뜨린다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "aiux-15",
    "docId": "design-ai-product-ux",
    "sectionId": "accessibility",
    "question": "스트리밍 출력을 aria-live=\"assertive\"로 토큰마다 읽게 구현하면 어떤 문제가 생기고, 올바른 접근은?",
    "answer": "스크린리더가 끝없이 떠들어 오히려 못 쓴다. 본문은 polite로 조용히 채우거나 완료 시 한 번 읽게 하고, \"생성 완료\" 같은 상태 전환만 announce한다. citation chip은 실제 버튼/링크 요소로 만들어 키보드로 닿게 하고, 근거 preview를 열면 focus를 그 안으로 옮기고 닫으면 트리거로 되돌린다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "aiux-16",
    "docId": "design-ai-product-ux",
    "sectionId": "qa-matrix",
    "question": "AI UX의 출시 전 RELEASE GATE 점검 항목 7가지를 나열하라.",
    "answer": "(1) 근거 없는 질문에 \"찾지 못함\"이 정직하게 뜨는가, (2) 출처 chip을 눌러 실제 원문의 해당 문장에 닿는가, (3) 권한 없는 문서를 출처로 걸었을 때 우아하게 처리되는가, (4) 고위험 결과에 2단계 확인·감사 로그가 걸리는가, (5) timeout을 강제해 partial 결과가 잠기는가, (6) 핸드오프 트리거가 실제로 발동하고 packet이 채워지는가, (7) 스크린리더로 생성→완료→오류 전환이 들리는가.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "fperf-01",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch1",
    "question": "\"화면이 느리다\"는 제보를 받았다. 코드를 고치기 전에 밟아야 할 performance triage loop의 순서는?",
    "answer": "(1) 사용자 행동·데이터 크기·기기/네트워크 조건을 고정, (2) lab trace와 RUM 지표 중 어느 쪽 문제인지 구분, (3) Network에서 리소스·API 병목을 먼저 배제, (4) Performance trace에서 scripting/rendering/painting 비중 확인, (5) React Profiler로 render 원인을 props/state/context/key까지 좁힘, (6) 한 번에 하나의 가설만 수정하고 before/after delta를 남김. 번들이 큰데 memo를 넣거나 렌더링이 병목인데 CDN을 바꾸면 효과가 없다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-02",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch2",
    "question": "chunk를 더 잘게 쪼갰는데 route 전환이 오히려 느려졌다. 무엇이 일어나고 있고 어디를 봐야 하나?",
    "answer": "대개 네트워크 요청 수가 아니라 의존 순서 문제다 — route component chunk를 받은 뒤 그 안에서 chart chunk와 CSS chunk를 다시 요청하고, 그 다음에야 data 요청이 시작되는 waterfall 직렬화. 분리 전후의 Network waterfall을 같이 비교하고, preload/modulepreload, route prefetch, shared chunk 중복, 캐시 무효화 단위를 함께 본다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-03",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch3",
    "question": "목록을 정렬·필터하면 입력 focus와 row state가 엉뚱한 행으로 이동한다. 원인과 보정은?",
    "answer": "index key가 원인 — reconciliation에서 불안정한 key가 state를 잘못된 행에 붙인다. index key를 피하고 domain id로 list identity를 고정한다. 불안정한 key는 state 손실과 불필요한 remount 비용을 만든다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "fperf-04",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch4",
    "question": "검색 input 1회 입력마다 GridPage commit 180ms, Row 1,000개 render, INP p75 340ms다. React.memo부터 감싸면 되나?",
    "answer": "아니다. 문서의 before/after 예시에서 핵심 개선은 draft state를 검색 영역으로 내려 state fan-out을 줄이고 row renderer만 memo를 적용한 것 — 결과는 commit 55ms, visible Row 40개 render, INP p75 170ms. memo 자체보다 state fan-out 축소와 visible render 범위 축소가 핵심이다. \"렌더링이 많다\"가 아니라 \"느린 render\"가 문제이므로 Profiler에서 실제 시간을 보고 state 위치를 먼저 조정한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-05",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch4",
    "question": "동료가 \"렌더링이 많으니\" 컴포넌트 전체에 React.memo를 감쌌는데 commit duration이 전혀 줄지 않았다. 왜 효과가 없는지 진단하라.",
    "answer": "React.memo는 부모가 넘긴 props의 얕은 비교에만 관여한다 — 자체 state나 구독한 context 변경으로 인한 render는 못 막는다. 또 객체·배열·함수 props를 매 렌더마다 새로 만들면 memo 효과가 사라진다. props 형태와 context 경계를 먼저 줄이고, MEMO DECISION GATE(같은 props로 반복 render되는 비싼 컴포넌트인가, props identity 안정화 가능한가, 적용 후 실제로 줄었는가)를 통과할 때만 적용한다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "fperf-06",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch4",
    "question": "useTransition이 해주는 것과 해주지 못하는 것을 구분하라.",
    "answer": "상태 업데이트를 non-urgent로 표시해 입력 같은 urgent update가 먼저 반영되게 해준다. 하지만 무거운 동기 계산이나 큰 DOM 작업 자체를 빠르게 만들지는 않는다 — main thread를 오래 막는 계산이면 작업 분할, virtualization, worker 이동과 함께 판단해야 한다. pending UX와 stale 결과 표시가 없으면 사용자가 혼란스러워진다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "fperf-07",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch5",
    "question": "10,000행 목록 스크롤에서 DOM row가 10,000개 그대로 있고 30ms 이상 frame이 반복된다. 조치와, 그 조치를 도입할 때 함께 확인할 요구사항은?",
    "answer": "virtualization 또는 overscan 조정이 필요하다 — 좋은 신호는 visible DOM row 30~80개, dropped frame 5% 이하. 단 virtualization은 DOM 수를 줄일 뿐 제품 동작을 단순화하지 않는다: 검색 결과 수, 선택 상태, 스크롤 위치 복구, 접근성 tree, 브라우저 find, 인쇄, 행 높이 측정이 요구사항에 들어오면 별도 설계가 필요하다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "fperf-08",
    "docId": "engineering-frontend-performance",
    "sectionId": "rendering-ch8",
    "question": "콘솔에 hydration mismatch warning이 떴다. 어떻게 해석하고 어떤 코드를 점검해야 하나?",
    "answer": "단순 warning이 아니라 사용자에게 보인 HTML과 React가 소유하려는 UI가 다르다는 신호다. 날짜, 랜덤값, locale, browser-only API, 권한별 렌더링처럼 서버와 클라이언트 결과가 달라질 수 있는 코드를 명시적으로 경계 나눈다. 추가로 서버·클라이언트가 같은 초기 데이터를 쓰는지, 권한/개인화 UI가 HTML cache에 섞이지 않는지, Suspense fallback이 CLS를 만들지 않는지 점검한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "fperf-09",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch2",
    "question": "LCP, INP, CLS의 good / needs improvement / poor 경계값과 공식 평가의 percentile 기준은?",
    "answer": "LCP: 2.5s 이하 good, 4.0s 초과 poor. INP: 200ms 이하 good, 500ms 초과 poor. CLS: 0.1 이하 good, 0.25 초과 poor. 공식 평가는 모바일과 데스크톱을 나눠 p75 기준으로 본다. p95는 내부 SLO와 꼬리 지연 감시에 별도로 쓰되 CWV 통과 기준과 섞지 않는다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "fperf-10",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch3",
    "question": "PR 후 Lighthouse가 Performance 82→76, LCP 3.1→3.0s, TBT 420→680ms, CLS 0.04 유지로 나왔다. 점수 하락을 어떻게 해석하고 무엇부터 보나?",
    "answer": "점수 하락의 핵심은 LCP가 아니라 TBT 증가다 — 새 dependency, hydration, route 초기 실행 비용을 먼저 본다. Lighthouse Performance 점수는 FCP·Speed Index·LCP·TBT·CLS 같은 lab metric의 가중 평균이고, INP는 field metric이라 lab에서는 TBT를 대리 신호로 본다. PR에서는 같은 throttling 조건의 delta를 3회 이상 비교하고, 운영 판단은 field data와 합친다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-11",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch4",
    "question": "Lab 측정은 좋은데 field 지표가 나쁘다. 무엇을 의심하고, lab/field 조합별 판단 규칙은?",
    "answer": "lab은 좋은데 field가 나쁘면 저사양 기기, 특정 route, 특정 release segment를 의심한다. 나머지 규칙: lab과 field 둘 다 나쁘면 즉시 개선 대상, lab은 나쁘지만 field 영향이 작으면 예산과 우선순위 조정, field가 나쁜데 원인이 불명확하면 synthetic scenario와 trace 재현으로 좁힌다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-12",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch6",
    "question": "운영 대시보드: /dashboard LCP p50 1.4s·p75 2.3s·p95 5.8s, /grid INP p50 120ms·p75 260ms·p95 910ms. 어느 route가 왜 개선 대상인가?",
    "answer": "grid는 INP p75가 260ms로 good 기준 200ms를 넘어 상호작용 개선 대상이다. dashboard는 공식 p75(2.3s)는 통과하지만 p95 5.8s로 꼬리 로드가 크다. 평균 하나로는 회귀를 못 찾으므로 p50/p75/p95 분포를 기본으로 하고 route와 release를 필수 필터로 둔다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "fperf-13",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch8",
    "question": "RUM 계측에서 디버깅 욕심으로 과수집하기 쉽다. privacy를 지키는 수집 원칙은?",
    "answer": "route는 실제 URL 대신 정규화된 route 이름으로, DOM text와 입력값은 버리고, user id는 직접 보내지 않는다. 필요한 경우 익명 segment와 request id만 남겨 서버 로그와 제한적으로 연결한다. 클릭 좌표나 입력값 원문 전송 금지, URL query와 header의 민감 정보는 마스킹한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "fperf-14",
    "docId": "engineering-frontend-performance",
    "sectionId": "perf-ch9",
    "question": "\"검색 input이 버벅여서 debounce를 넣었다\"로 마무리된 PR을 리뷰하라. 무엇이 빠졌나?",
    "answer": "debounce만 넣으면 된다는 건 흔한 오진이다. 확인해야 할 증거는 INP attribution, handler 시간, React commit, row render 수다. 올바른 방향은 입력 echo는 즉시 유지하고 결과 목록만 deferred value/transition/virtualization으로 분리하는 것 — 입력값 자체를 늦게 반영하면 타이핑이 고장 난 것처럼 느껴진다. before/after 숫자가 없는 최적화는 완료 처리하지 않는다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "fperf-15",
    "docId": "engineering-frontend-performance",
    "sectionId": "devtools-ch4",
    "question": "modal open/close를 10회 반복하고 강제 GC했는데 JS heap 48MB→83MB, DOM nodes 2,400→5,900개다. 어떻게 해석하고 다음 단계는?",
    "answer": "단순 cache 증가가 아니라 unmount 후 DOM 또는 listener가 유지될 가능성이 크다. heap snapshot에서 detached node와 retaining path를 확인한다. 루틴: baseline heap/DOM node 기록 → 문제 동작 5~10회 반복 → 강제 GC 후 baseline 회복 여부 확인 → snapshot 비교로 retained size 큰 객체 정렬 → retaining path에서 subscription, timer, cache, detached DOM 참조 확인 → cleanup 후 같은 시나리오로 재검증.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-16",
    "docId": "engineering-frontend-performance",
    "sectionId": "devtools-ch7",
    "question": "grid cell 입력 interaction 총 620ms가 input delay 40ms / handler 180ms / React commit 210ms / style·layout 120ms / paint 70ms로 분해됐다. handler만 최적화하면 충분한가?",
    "answer": "부족하다 — handler를 다 줄여도 commit 210ms와 layout 120ms가 남는다. React commit과 layout 비용이 함께 크므로 state fan-out, DOM 수, layout effect를 같이 줄여야 한다. trace 해석의 핵심은 긴 막대 찾기가 아니라 사용자 상호작용부터 다음 paint까지 어떤 단계가 시간을 썼는지 연결하는 것이다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "fperf-17",
    "docId": "engineering-frontend-performance",
    "sectionId": "devtools-ch6",
    "question": "React Profiler에서 commit은 짧은데 INP가 여전히 나쁘다. 다음에 볼 곳과, commit duration 판정 기준은?",
    "answer": "React Profiler는 browser layout과 paint 비용을 설명하지 않는다 — Chrome Performance에서 style recalculation, layout, paint, composite를 다시 본다. 판정 기준: commit 8~20ms는 대부분 부담이 작고, 50ms 이상은 입력 interaction에서 개선 후보(INP p75 200ms 초과와 함께면 우선순위 상승), 150ms 이상은 큰 route 전환이나 초기 hydration이 아니라면 즉시 분해 대상.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "jspr-01",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch5",
    "question": "@OneToMany 컬렉션 JOIN FETCH 쿼리에 Pageable을 붙였더니 Hibernate 경고가 떴다. 무슨 일이 일어나고 있고 어떻게 푸나?",
    "answer": "Hibernate가 DB에서 페이지를 자르지 못하고 전체를 다 읽어 메모리에서 페이징한다 — row가 부풀어 결과가 왜곡될 수도 있다. 컬렉션 N+1은 fetch join 대신 hibernate.default_batch_fetch_size(예: 100)로 IN (?,?,...) 묶음 조회하는 게 정석이고, 별도 조회나 DTO projection도 대안이다. to-one(@ManyToOne, @OneToOne) 연관은 fetch join + 페이징이 안전하다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-02",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch5",
    "question": "orders 10건을 findAll()로 조회한 뒤 루프에서 o.getMember().getName()을 부르니 쿼리가 11번 나간다. 이 현상의 이름과 세 가지 해결책은?",
    "answer": "N+1 — 목록 1번 조회 후 각 행의 LAZY 연관을 루프에서 건드려 N번 추가 조회가 나가는 현상(1 + 10 = 11번). 해결책: (1) fetch join — @Query(\"SELECT o FROM Order o JOIN FETCH o.member\"), to-one에 적합, (2) @EntityGraph(attributePaths = {\"member\"}) — JPQL 없이 fetch 지정, (3) default_batch_fetch_size: 100 — 컬렉션 N+1을 IN 절로 묶어 N을 1~몇 번으로 줄임.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-03",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch7",
    "question": "트랜잭션 밖에서 받은 엔티티의 필드를 바꿨는데 DB에 반영되지 않고, LAZY 연관에 접근하니 예외가 났다. 무슨 일이고 수정 로직은 어디에 둬야 하나?",
    "answer": "dirty checking은 영속성 컨텍스트가 살아 있는 @Transactional 경계 안에서만 동작한다. 트랜잭션 밖에서 받은 엔티티는 준영속(detached) 상태라 필드를 바꿔도 반영되지 않고, LAZY 연관 접근은 LazyInitializationException이 난다. 수정 로직은 트랜잭션 안의 서비스 메서드에 두고 거기서 조회한 엔티티를 바꾼다 — 영속 상태 엔티티는 save() 없이도 커밋 시 UPDATE가 자동으로 나간다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-04",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch5",
    "question": "같은 service 클래스 안에서 this.otherMethod()를 호출했더니 그 메서드의 @Transactional이 적용되지 않는다. 원인은?",
    "answer": "Spring AOP 프록시는 외부 진입점에서만 가로챈다 — 같은 클래스 내부 호출(self-invocation)은 proxy를 거치지 않아 트랜잭션 속성이 적용되지 않는다. 트랜잭션 경계는 \"하나의 비즈니스 작업\" 단위인 service 메서드에 둔다. controller에 @Transactional을 붙이면 HTTP·직렬화까지 트랜잭션 안에 들어와 경계가 흐려진다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-05",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch12",
    "question": "비즈니스 예외를 checked exception으로 만들어 던졌는데 트랜잭션이 rollback되지 않았다. 왜이고 어떻게 고치나?",
    "answer": "Spring의 기본 @Transactional은 unchecked exception(RuntimeException, Error)에서만 rollback하고 checked exception은 기본적으로 rollback하지 않는다. checked 비즈니스 예외에는 rollbackFor를 명시해야 한다. \"예외가 나면 롤백됩니다\"로 끝내면 부족하고, 어떤 예외인지와 트랜잭션 경계가 어디인지까지 설명할 수 있어야 한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-06",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch8",
    "question": "두 트랜잭션이 같은 상품 재고를 동시에 수정해 마지막 저장이 앞 저장을 덮어쓴다(lost update). JPA의 낙관적 락은 이를 어떻게 막고, 충돌 시 무엇을 해야 하나?",
    "answer": "엔티티에 @Version 필드를 두면 Hibernate가 UPDATE에 WHERE id=? AND version=?를 붙이고 version을 +1한다. 그 사이 다른 트랜잭션이 먼저 수정했으면 영향받은 행이 0건이 되어 OptimisticLockingFailureException(JPA 표준은 OptimisticLockException)이 난다. 충돌 시 재시도하거나 사용자에게 다시 시도를 안내해야 하며, 충돌 빈도가 낮을 때 적합하다. 충돌이 잦으면 비관적 락 @Lock(PESSIMISTIC_WRITE)을 검토한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-07",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch2",
    "question": "양방향 연관에서 order.setMember(member)만 호출했는데 같은 트랜잭션 안에서 member.getOrders()가 비어 보인다. 원인과 관례적 해법은?",
    "answer": "JPA는 객체 양쪽을 자동으로 동기화하지 않는다 — 양방향은 양쪽을 직접 맞춰줘야 한다. 그래서 한쪽에 addOrder 같은 연관관계 편의 메서드를 두어 컬렉션 추가와 setMember를 한 번에 처리한다. DB에 FK를 쓰는 건 주인 쪽(@ManyToOne + @JoinColumn)뿐이고, @OneToMany(mappedBy=...)는 FK 없는 거울이며 mappedBy 값은 상대 엔티티의 필드명이다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-08",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch1",
    "question": "JPA 엔티티가 갖춰야 할 최소 요건과, 기본 생성자가 필수인 이유는?",
    "answer": "@Entity + @Id + 파라미터 없는 기본 생성자가 최소 3종 세트다. JPA는 reflection으로 엔티티를 만들기 때문에 기본 생성자가 반드시 필요하며, 접근 제어는 protected까지 허용해 외부의 빈 객체 생성을 막으면서 JPA·프록시는 쓸 수 있게 한다. final 클래스/필드는 안 되고, @GeneratedValue(strategy = IDENTITY)는 PK를 DB의 AUTO_INCREMENT에 위임한다(MySQL·PostgreSQL에서 흔함).",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "jspr-09",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch11",
    "question": "flush가 발생하는 세 시점은? 그리고 flush와 commit은 어떻게 다른가?",
    "answer": "(1) transaction commit 직전, (2) JPQL 실행 전 — 쿼리 결과와 영속성 컨텍스트 변경을 맞추기 위해 자동 flush되어 예상보다 빨리 UPDATE가 나갈 수 있다, (3) entityManager.flush() 명시 호출. flush는 commit이 아니다 — SQL을 DB에 보내지만 rollback되면 취소된다.",
    "type": "recall",
    "tier": "must"
  },
  {
    "id": "jspr-10",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch6",
    "question": "무한 스크롤(\"더보기\") 목록 API에 Page<T>를 쓰고 있다. 무엇을 아낄 수 있고, 페이지 번호에서 주의할 점은?",
    "answer": "Page<T>는 전체 개수를 위한 count 쿼리가 자동으로 같이 나간다. 전체 개수가 필요 없는 무한 스크롤은 Slice<T>를 쓰면 count 쿼리를 생략한다. 그리고 PageRequest.of의 페이지 번호는 0-based(첫 페이지가 0)라 프론트의 1-based와 어긋나기 쉬우니 변환을 한 곳에서 처리한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "jspr-11",
    "docId": "engineering-java-spring",
    "sectionId": "jpa-ch4",
    "question": "리뷰 중 @Query에 \"WHERE email = '\" + email + \"'\" 같은 문자열 조립이 발견됐다. 무엇이 문제이고 올바른 방식은?",
    "answer": "SQL injection이다. 항상 :param 형태의 이름 파라미터 + @Param 바인딩을 쓴다 — JPA가 parameterized query로 처리한다. nativeQuery = true인 네이티브 쿼리도 마찬가지로 바인딩으로만 값을 넣는다.",
    "type": "critique",
    "tier": "must"
  },
  {
    "id": "jspr-12",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch3",
    "question": "필드 주입(@Autowired 필드) 대신 생성자 주입을 권장하는 세 가지 근거는?",
    "answer": "(1) 필드를 final로 둘 수 있어 불변, (2) 객체 생성 시 의존성이 반드시 채워져 누락이 컴파일·기동 단계에서 발각, (3) 테스트에서 new UserService(mockRepo)로 쉽게 갈아끼울 수 있다. 생성자가 하나면 @Autowired는 생략 가능하다. 참고로 new로 직접 만든 객체에는 DI/AOP가 적용되지 않는다 — 빈은 컨테이너가 싱글톤으로 관리한다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "jspr-13",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch6",
    "question": "컨트롤러마다 try-catch가 반복되고 에러 응답 포맷도 제각각이다. 예외 처리를 어떻게 재구성하나?",
    "answer": "service는 도메인 예외를 던지고, @RestControllerAdvice + @ExceptionHandler 한 곳에서 표준 ErrorResponse(code, message, timestamp)로 변환한다. expected failure(없는 리소스 404 USER_NOT_FOUND, 중복 이메일 409 DUPLICATE_EMAIL)는 4xx로, bug(NPE 등)는 마지막에 Exception.class로 받아 500으로 잡되 알람이 울리게 한다. 클라이언트에 stack trace·SQL을 노출하지 말고, 사용자에게 보여줄 메시지와 로그 메시지를 분리한다.",
    "type": "judgment",
    "tier": "good"
  },
  {
    "id": "jspr-14",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch7",
    "question": "@NotNull과 @NotBlank의 차이는? 그리고 @Valid 검증이 실패하면 어떤 예외가 나고 어디서 처리하나?",
    "answer": "@NotNull은 null만 거부해 빈 문자열·0은 통과한다. @NotBlank는 문자열 전용으로 null·\"\"·공백만을 모두 거부한다. @Valid 검증 실패 시 MethodArgumentNotValidException이 던져지며, 이것도 @RestControllerAdvice에서 잡아 400으로 변환하면 검증 에러까지 같은 ErrorResponse 포맷으로 일관된다.",
    "type": "recall",
    "tier": "good"
  },
  {
    "id": "jspr-15",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch9",
    "question": "컨트롤러의 매핑·상태코드 테스트까지 전부 @SpringBootTest로 돌려 테스트가 느리다. 테스트 계층을 어떻게 나눠야 하나?",
    "answer": "컨트롤러는 @WebMvcTest(대상 컨트롤러) + MockMvc로 웹 계층만 로드하고 service는 @MockBean으로 대체한다 — 매핑·검증·상태코드 확인에 빠르고 충분하다. service는 순수 단위 테스트(생성자 주입이면 new로 mock을 넣어 Spring 없이 가능), repository는 @DataJpaTest, 전체 wiring은 소수의 @SpringBootTest로 검증한다. 동작을 테스트하고 내부 호출 횟수 같은 구현 디테일은 피한다.",
    "type": "judgment",
    "tier": "must"
  },
  {
    "id": "jspr-16",
    "docId": "engineering-java-spring",
    "sectionId": "spring-ch10",
    "question": "운영 편의를 위해 Actuator 설정을 exposure include: \"*\"로 열어둔 구성을 진단하라.",
    "answer": "전체를 열면 env·heapdump 같은 민감 정보까지 새어나간다. 기본 노출은 health·info뿐이며, 필요한 것만 명시하고(예: health, info, metrics) 외부 노출 시에는 인증으로 보호해야 한다. /actuator/health는 앱·DB·디스크 상태를 {\"status\":\"UP\"}으로 알려 로드밸런서·쿠버네티스 헬스체크의 표적이 된다.",
    "type": "critique",
    "tier": "good"
  },
  {
    "id": "jspr-17",
    "docId": "engineering-java-spring",
    "sectionId": "java-ch10",
    "question": "Integer 두 값을 ==로 비교했더니 어떤 값에선 true, 어떤 값에선 false가 나온다. 무슨 일이고 올바른 비교 방식은?",
    "answer": "Java에서 ==는 참조(주소) 비교다 — String·Integer는 literal 캐싱 때문에 가끔 우연히 맞아서 더 위험하다. 객체 비교는 항상 .equals()를 쓰고, null 안전 비교는 Objects.equals(a, b)를 쓴다. 직접 만든 클래스를 HashMap 키나 Set에 넣으려면 equals와 hashCode를 같이 구현해야 한다(record는 자동 생성).",
    "type": "judgment",
    "tier": "good"
  }
];

const cardsByDocId = new Map();

for (const card of QUESTION_BANK) {
  const cards = cardsByDocId.get(card.docId) ?? [];
  cards.push(card);
  cardsByDocId.set(card.docId, cards);
}

export function getQuestionBankCards(docId) {
  return cardsByDocId.get(docId) ?? [];
}
