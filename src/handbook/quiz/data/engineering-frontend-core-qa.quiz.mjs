// 프론트엔드 핵심 Q&A(engineering-frontend-core-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  "id": "engineering-frontend-core-quiz",
  "title": "프론트엔드 핵심 퀴즈",
  "sourceQaId": "engineering-frontend-core-qa",
  "questions": [
    {
      "id": "q1",
      "question": "프론트엔드의 책임을 가장 정확히 정의한 것은?",
      "choices": [
        "사용자 의도를 안전한 상태 전이와 서버 계약으로 연결하는 runtime boundary",
        "디자인 시안을 픽셀 단위로 재현하는 표현 계층",
        "서버가 내려준 데이터를 그대로 화면에 뿌리는 뷰 계층",
        "컴포넌트를 조립해 화면을 그리는 렌더링 계층"
      ],
      "answerIndex": 0,
      "explanation": "프론트엔드는 화면을 그리는 계층이 아니라 DOM·입력·네트워크·접근성·성능·오류 복구를 하나의 제품 계약으로 다루는 runtime boundary다. 컴포넌트 구현만 말하면 loading·empty·error·offline·stale data가 빠진다."
    },
    {
      "id": "q2",
      "question": "공유와 복원이 필요한 검색어·필터·정렬·페이지 상태를 두기에 가장 적절한 곳은?",
      "choices": [
        "컴포넌트 local state",
        "URL state",
        "전역 store",
        "server cache"
      ],
      "answerIndex": 1,
      "explanation": "공유·새로고침·뒤로가기에서 같은 화면으로 돌아와야 하는 탐색 상태는 URL에 둔다. local state에만 두면 새로고침·공유·뒤로가기에서 사용자가 같은 화면으로 복원되지 못한다."
    },
    {
      "id": "q3",
      "question": "empty 상태의 정확한 정의는?",
      "choices": [
        "요청·권한·파싱·네트워크가 실패한 상태",
        "아직 응답이 오지 않아 로딩 중인 상태",
        "요청은 성공했지만 표시할 데이터가 없는 상태",
        "권한이 없어 접근이 거부된 상태"
      ],
      "answerIndex": 2,
      "explanation": "empty는 요청이 성공했고 표시할 데이터가 없는 상태이고, error는 요청·권한·파싱·네트워크가 실패한 상태다. empty에는 생성/필터 초기화 action을, error에는 재시도·traceId·권한 안내를 준다."
    },
    {
      "id": "q4",
      "question": "재시도(retry) 버튼을 숨기거나 다른 행동으로 대체하는 것이 맞는 경우는?",
      "choices": [
        "5xx 서버 오류가 발생했을 때",
        "요청이 network timeout으로 끊겼을 때",
        "일시적으로 네트워크가 끊겼을 때",
        "권한 없음·잘못된 입력·삭제된 리소스처럼 반복해도 성공 가능성이 낮을 때"
      ],
      "answerIndex": 3,
      "explanation": "같은 요청을 반복해도 성공 가능성이 낮은 권한 없음·잘못된 입력·삭제된 리소스는 retry를 숨기고 다른 행동을 준다. network error·5xx·timeout처럼 일시 실패 가능성이 있으면 retry를 두되 중복 요청을 막는다."
    },
    {
      "id": "q5",
      "question": "native button 대신 div로 버튼을 만들 때 기본으로 사라지는 것은?",
      "choices": [
        "기본 focus, Enter/Space activation, disabled 의미, accessible name 계산",
        "CSS transition과 hover 효과",
        "flex 정렬과 z-index stacking",
        "이벤트 버블링과 delegation"
      ],
      "answerIndex": 0,
      "explanation": "button의 기본 focus·Enter/Space activation·disabled 의미·accessible name 계산이 빠진다. div로 대체하면 role·tabIndex·key handler·focus style·aria-disabled를 직접 맞춰야 하므로 보통 native button이 안전하다."
    },
    {
      "id": "q6",
      "question": "layout thrashing이 발생하는 전형적 원인은?",
      "choices": [
        "transform과 opacity로 애니메이션을 처리",
        "한 프레임 안에서 DOM 읽기(offsetHeight)와 쓰기(style 변경)를 번갈아 수행",
        "CSS 커스텀 속성(변수)을 사용",
        "이미지에 lazy loading을 적용"
      ],
      "answerIndex": 1,
      "explanation": "DOM을 읽고 쓰는 작업이 한 frame 안에서 번갈아 일어나면 브라우저가 최신 layout 값을 내기 위해 강제 계산을 반복한다. item마다 offsetHeight를 읽고 바로 style을 바꾸면 style recalculation과 layout event가 연쇄로 늘어난다."
    },
    {
      "id": "q7",
      "question": "transform/opacity 애니메이션이 '항상 좋지는 않은' 이유는?",
      "choices": [
        "transform은 언제나 layout을 강제로 다시 계산해서",
        "JS 메인 스레드를 항상 차단해서",
        "새 layer가 생기면 GPU memory·composite 비용이 늘고 텍스트 선명도·hit area가 어긋날 수 있어서",
        "접근성 트리를 반드시 깨뜨려서"
      ],
      "answerIndex": 2,
      "explanation": "transform·opacity는 layout을 덜 건드리지만 새 layer를 만들면 GPU memory와 composite 비용이 늘고 텍스트 선명도나 hit area가 어긋날 수 있어 Performance trace와 layer border로 확인해야 한다."
    },
    {
      "id": "q8",
      "question": "hydration mismatch를 막으려면 SSR 경계에서 안정화해야 하는 값이 아닌 것은?",
      "choices": [
        "현재 시간(time)",
        "random 값",
        "auth 상태와 locale",
        "적용된 CSS 클래스명"
      ],
      "answerIndex": 3,
      "explanation": "hydration mismatch는 서버 HTML과 클라이언트 첫 렌더가 다를 때 생기며 시간·random·browser-only API·locale·auth 상태를 SSR 경계에서 안정화해야 한다. CSS 클래스명 자체는 mismatch의 원인이 아니다."
    },
    {
      "id": "q9",
      "question": "SSR과 클라이언트에서 일치하는 마크업 id를 만드는 올바른 방법은?",
      "choices": [
        "React useId처럼 서버·클라이언트가 같은 순서로 생성하는 API를 쓰거나 서버에서 id를 내려준다",
        "Math.random()으로 매 렌더 새 id를 만든다",
        "Date.now()를 접미사로 붙인다",
        "렌더마다 crypto.randomUUID()를 호출한다"
      ],
      "answerIndex": 0,
      "explanation": "useId처럼 SSR과 client가 같은 순서로 생성하는 API를 쓰거나 서버에서 id를 내려준다. Math.random·Date.now로 markup id를 만들면 label-for 연결과 hydration 결과가 달라진다."
    },
    {
      "id": "q10",
      "question": "'권한에 따라 버튼을 숨기면 보안이 된다'는 주장에 대한 옳은 반박은?",
      "choices": [
        "버튼을 숨기면 해당 API 호출도 자동으로 차단된다",
        "UI hide는 UX 편의일 뿐 보안 경계는 서버 인가이며, 숨겨도 API 직접 호출·URL 접근·캐시된 데이터에서 권한 누락이 드러난다",
        "route guard만 걸면 인가가 완성된다",
        "캐시를 비활성화하면 UI hide로 충분히 안전하다"
      ],
      "answerIndex": 1,
      "explanation": "UI hide는 UX 편의이고 보안 경계는 서버 인가다. 버튼을 숨겨도 API 호출이 막히지 않으며 캐시된 데이터나 URL 직접 접근에서 권한 누락이 드러난다. route guard도 UX 장치일 뿐 인가는 서버가 매번 확인한다."
    },
    {
      "id": "q11",
      "question": "403과 404의 UI 처리 차이로 옳은 것은?",
      "choices": [
        "둘 다 동일한 에러 토스트로 처리하면 된다",
        "403은 재시도 버튼, 404는 로그인 유도가 정답이다",
        "403은 리소스는 있으나 권한이 없어 복구 안내가, 404는 리소스가 없거나 비공개라 탐색 복구가 필요하다",
        "404가 403보다 항상 더 심각한 오류다"
      ],
      "answerIndex": 2,
      "explanation": "403은 리소스는 있지만 현재 사용자에게 권한이 없다는 복구 안내가, 404는 리소스가 없거나 공개하지 않는다는 탐색 복구가 필요하다. 존재 여부를 숨겨야 하는 API는 서버 계약에 맞춰 문구를 조정한다."
    },
    {
      "id": "q12",
      "question": "access token을 localStorage에 저장하면 안 되는 주된 이유는?",
      "choices": [
        "localStorage 용량 한도를 넘기기 쉬워서",
        "동기 API라 저장 자체가 너무 느려서",
        "cross-tab 동기화가 원천적으로 불가능해서",
        "XSS로 탈취되기 쉬워 보안 위험이 크다"
      ],
      "answerIndex": 3,
      "explanation": "access token을 localStorage에 두면 XSS 탈취 위험이 크다. httpOnly cookie는 JS 탈취를 줄이지만 CSRF·SameSite·Secure 설정이 맞아야 하고, 민감 데이터 자체보다 세션 식별자와 서버 검증으로 제한하는 편이 안전하다."
    },
    {
      "id": "q13",
      "question": "서버가 기존 enum에 새 값을 추가해 배포했을 때 안전한 프론트 처리는?",
      "choices": [
        "unknown enum을 안전한 fallback label과 telemetry로 처리하고 schema diff를 추적한다",
        "switch default에서 throw해 즉시 실패시킨다",
        "타입 단언으로 알려진 값처럼 처리한다",
        "enum을 일반 string으로 캐스팅해 그대로 표시한다"
      ],
      "answerIndex": 0,
      "explanation": "unknown enum은 안전한 fallback label과 telemetry로 처리해야 한다. switch default에서 throw만 하면 새 서버 값 배포 순간 화면이 깨진다. TypeScript 타입만 믿으면 실제 API drift·null·unknown enum에서 런타임이 깨진다."
    },
    {
      "id": "q14",
      "question": "검색 입력에서 debounce만으로 stale response 문제를 막지 못하는 이유는?",
      "choices": [
        "debounce가 일부 키 입력을 놓치기 때문",
        "debounce는 요청 수만 줄일 뿐, 오래된 응답이 나중에 도착해 현재 입력과 다른 결과가 반영되는 것을 막지 못하기 때문",
        "debounce가 접근성 포커스를 깨기 때문",
        "debounce가 SSR 환경에서 동작하지 않기 때문"
      ],
      "answerIndex": 1,
      "explanation": "debounce는 요청 수를 줄일 뿐 오래된 응답이 나중에 도착하는 문제를 막지 못한다. query key·request id·AbortController·현재 입력값 비교로 stale response 반영을 막아야 한다."
    },
    {
      "id": "q15",
      "question": "테이블에서 배열 index를 row key로 쓰면 생기는 대표적 문제는?",
      "choices": [
        "렌더 성능이 항상 O(n^2)로 느려진다",
        "행의 접근성 트리가 완전히 사라진다",
        "정렬·필터 후 화면 순서가 바뀌면 다른 행에 selection·inline edit 상태가 잘못 붙는다",
        "가상 스크롤을 쓸 수 없게 된다"
      ],
      "answerIndex": 2,
      "explanation": "index를 row key로 쓰면 정렬·필터·pagination·realtime update로 화면 순서가 바뀔 때 다른 사용자의 행에 편집·선택 상태가 붙을 수 있다. 안정적인 row id를 써야 selection과 inline edit가 안전하다."
    },
    {
      "id": "q16",
      "question": "페이지 진입에 필요한 데이터를 하위 컴포넌트마다 각각 fetch하면 생기는 문제는?",
      "choices": [
        "타입 안정성이 사라진다",
        "SEO 인덱싱이 불가능해진다",
        "번들 크기가 자동으로 커진다",
        "waterfall, 중복 요청, loading 상태 분산, error 처리 누락이 생긴다"
      ],
      "answerIndex": 3,
      "explanation": "하위 컴포넌트마다 fetch하면 waterfall·중복 요청·loading 상태 분산·error 처리 누락이 생긴다. 페이지 진입 데이터는 route/page boundary에서, 사용자 조작 후 데이터는 interaction boundary에서 가져온다."
    },
    {
      "id": "q17",
      "question": "화면 구현이 '완료'됐다고 판단할 수 있는 증거로 가장 적절한 것은?",
      "choices": [
        "상태별 스토리, API fixture, keyboard-only 경로, 접근성 tree, route별 RUM 이벤트가 있고 느린 네트워크·401/403에서도 복구 경로가 보인다",
        "핵심 CTA를 담은 성공 화면 캡처 한 장이면 충분하다",
        "디자인 시안과 픽셀 단위로 일치하고 QA가 육안 확인을 마쳤다",
        "모든 단위 테스트가 통과하고 코드 커버리지가 목표치를 넘었다"
      ],
      "answerIndex": 0,
      "explanation": "성공 화면 캡처만으로는 부족하고 상태별 스토리·API fixture·keyboard-only 경로·접근성 tree·route별 RUM 이벤트가 있어야 한다. 핵심 CTA가 느린 네트워크와 401/403에서도 복구 경로를 보이면 완료로 볼 수 있다."
    },
    {
      "id": "q18",
      "question": "브라우저 렌더링에서 paint와 composite의 차이로 옳은 것은?",
      "choices": [
        "paint는 layer를 합성하는 단계이고 composite는 픽셀을 새로 그리는 단계다",
        "paint는 픽셀을 다시 그리는 단계이고 composite는 이미 그려진 layer를 합성하는 단계다",
        "paint와 composite는 사실상 같은 단계이며 DevTools에서 구분되지 않는다",
        "composite는 항상 CPU에서, paint는 항상 GPU에서 처리된다"
      ],
      "answerIndex": 1,
      "explanation": "paint는 픽셀을 다시 그리는 단계이고 composite는 이미 그려진 layer를 합성하는 단계다. DevTools Performance에서 Paint event·layer 변화·frame chart를 함께 보면 색상·그림자 변경인지 layer 이동인지 구분할 수 있다."
    },
    {
      "id": "q19",
      "question": "aria-label은 언제 쓰는 것이 안전한가?",
      "choices": [
        "모든 인터랙티브 요소에 기본으로 붙여 접근성 이름을 명시할 때",
        "보이는 텍스트를 더 자세한 설명으로 덮어써 스크린리더 사용자에게 풍부한 정보를 줄 때",
        "아이콘 단독 버튼처럼 시각적 이름이 없을 때만 쓰고 accessibility tree로 확인한다",
        "번역이 필요한 다국어 버튼의 텍스트를 대체할 때"
      ],
      "answerIndex": 2,
      "explanation": "보이는 텍스트와 aria-label이 다르면 스크린리더와 화면 사용자가 서로 다른 이름을 듣고 보게 된다. 번역 누락이나 상태 미반영도 생기므로 아이콘 단독 버튼처럼 시각 이름이 없을 때만 쓰고 accessibility tree로 확인한다."
    },
    {
      "id": "q20",
      "question": "모달이 닫힌 뒤 focus는 기본적으로 어디로 가야 하나?",
      "choices": [
        "항상 페이지 최상단의 첫 번째 focusable 요소로 이동한다",
        "focus를 명시적으로 옮기지 않고 브라우저 기본 동작에 맡긴다",
        "언제나 body 요소로 보내 사용자가 자유롭게 Tab을 시작하게 한다",
        "대부분 모달을 연 trigger로 돌아가되, Tab 순서가 body로 빠지지 않는지 검증한다"
      ],
      "answerIndex": 3,
      "explanation": "모달이 닫히면 대부분 모달을 연 trigger로 focus가 돌아가야 한다. trigger가 삭제되었거나 다음 작업이 명확하면 성공 메시지 heading이나 오류 필드로 보내되, Tab 순서가 body로 빠지지 않는지 keyboard recording으로 검증한다."
    },
    {
      "id": "q21",
      "question": "서버 상태와 클라이언트 상태를 다르게 다뤄야 하는 이유는?",
      "choices": [
        "서버 상태는 원본 소유자가 서버라 stale·refetch·invalidation·optimistic reconcile이 필요하고, 클라이언트 상태는 브라우저 세션 안에서만 의미가 있기 때문",
        "서버 상태는 항상 최신이라 캐시가 필요 없고, 클라이언트 상태만 stale 관리가 필요하기 때문",
        "클라이언트 상태는 서버로 동기화되므로 optimistic reconcile 대상이고, 서버 상태는 세션 안에서만 의미가 있기 때문",
        "두 상태 모두 동일한 규칙으로 다루는 것이 복잡도를 줄이기 때문"
      ],
      "answerIndex": 0,
      "explanation": "서버 상태는 원본 소유자가 서버라 stale·refetch·invalidation·optimistic reconcile이 필요하다. 클라이언트 상태는 입력값·hover·modal open처럼 브라우저 세션 안에서만 의미가 있어 server cache와 같은 규칙으로 다루면 과도하게 복잡해진다."
    },
    {
      "id": "q22",
      "question": "대시보드 카드 일부만 로딩에 실패했을 때 권장되는 부분 성공 처리는?",
      "choices": [
        "실패한 카드가 하나라도 있으면 전체 화면을 error로 전환해 사용자에게 명확히 알린다",
        "성공한 데이터는 유지하고 실패한 영역만 독립적으로 표시하며 카드별 retry와 마지막 갱신 시간을 보여준다",
        "실패한 카드를 조용히 숨기고 성공한 카드만 보여 화면을 깔끔하게 유지한다",
        "전체 데이터를 다시 처음부터 refetch할 때까지 화면 전체를 loading으로 되돌린다"
      ],
      "answerIndex": 1,
      "explanation": "부분 성공에서는 성공한 데이터를 유지하되 실패한 영역을 독립적으로 표시한다. 대시보드 카드 일부만 실패했다면 전체 화면을 error로 바꾸지 않고 카드별 retry와 마지막 갱신 시간을 보여주는 편이 사용자의 작업을 덜 막는다."
    },
    {
      "id": "q23",
      "question": "Form에서 client validation과 server validation이 둘 다 필요한 이유는?",
      "choices": [
        "client validation만으로 충분하지만 규정상 서버에도 형식적으로 두어야 하기 때문",
        "server validation은 속도가 느려 client validation이 그 결과를 항상 대체하기 때문",
        "client validation은 즉시 피드백·불필요한 요청 감소를, server validation은 신뢰 경계에서 데이터 무결성을 담당하기 때문",
        "두 검증이 동일한 규칙을 중복 실행해 성능을 높이기 때문"
      ],
      "answerIndex": 2,
      "explanation": "client validation은 즉시 피드백과 불필요한 요청 감소를 담당하고, server validation은 신뢰 경계에서 최종 데이터 무결성을 보장한다. 브라우저 우회·오래된 번들·권한 변경이 있으므로 서버 오류 코드를 필드 오류로 다시 매핑해야 한다."
    },
    {
      "id": "q24",
      "question": "submit 중 버튼을 disable하는 것만으로 중복 제출을 막기에 충분하지 않은 이유는?",
      "choices": [
        "disable된 버튼은 브라우저에 따라 클릭 이벤트가 그대로 통과하기 때문",
        "disable 상태가 CSS로만 적용되어 실제 동작을 막지 못하기 때문",
        "버튼 disable은 접근성 트리를 깨뜨려 스크린리더 사용자가 제출을 반복하기 때문",
        "Enter 제출·네트워크 재전송·탭 중복·느린 응답이 있어 pending 상태·request id·서버 멱등성 키·중복 navigation 처리가 함께 필요하기 때문"
      ],
      "answerIndex": 3,
      "explanation": "버튼 disable만으로는 충분하지 않다. Enter 제출·네트워크 재전송·탭 중복·느린 응답이 있을 수 있어 pending 상태와 request id, 서버 멱등성 키, 성공 후 중복 navigation 처리가 같이 필요하다."
    },
    {
      "id": "q25",
      "question": "modal 상태를 URL에 넣는 것이 적절한 경우는?",
      "choices": [
        "상세 보기·초대 승인·결제 단계처럼 공유·새로고침·뒤로가기가 제품 의미를 가지는 경우",
        "모든 modal은 뒤로가기로 닫을 수 있어야 하므로 예외 없이 URL에 넣는다",
        "tooltip이나 임시 설정 panel처럼 페이지 맥락 안에서만 의미가 있는 경우",
        "modal 내부에 입력 draft가 있어 새로고침 시 값을 유지해야 하는 경우"
      ],
      "answerIndex": 0,
      "explanation": "상세 보기·초대 승인·결제 단계처럼 공유·새로고침·뒤로가기가 제품 의미를 가지면 modal 상태를 URL에 넣는다. 단순 tooltip이나 임시 설정 panel처럼 페이지 맥락 안에서만 의미가 있으면 local state가 맞다."
    },
    {
      "id": "q26",
      "question": "생일이나 영업일 같은 date-only 값을 UTC로 저장하면 생기는 문제는?",
      "choices": [
        "UTC 저장은 date-only 값에 항상 안전하며 문제가 없다",
        "UTC midnight으로 바꾸면 미국과 한국 사용자 사이에서 전날이나 다음날로 보일 수 있다",
        "저장 용량이 커져 DB 인덱싱 성능이 떨어진다",
        "브라우저가 UTC를 지원하지 않아 파싱 오류가 난다"
      ],
      "answerIndex": 1,
      "explanation": "생일이나 영업일처럼 시간대와 무관한 date-only는 instant가 아니라 calendar date로 저장해야 한다. UTC midnight으로 바꾸면 미국과 한국 사용자 사이에서 전날이나 다음날로 보일 수 있다."
    },
    {
      "id": "q27",
      "question": "사용자의 권한이 변경된 뒤 프론트 캐시를 다루는 올바른 방법은?",
      "choices": [
        "다음 자연스러운 refetch까지 기다리면 캐시가 알아서 최신화되므로 별도 처리는 불필요하다",
        "전체 페이지를 강제 새로고침(reload)해 모든 상태를 초기화하는 것이 가장 안전하다",
        "권한 변경 이벤트나 401/403 응답을 받으면 사용자 scope의 query cache·메뉴·route guard 데이터를 함께 invalidate하고, 여러 탭이면 BroadcastChannel/storage event로 전파한다",
        "권한은 서버가 판단하므로 프론트 캐시는 그대로 두고 서버 응답만 신뢰한다"
      ],
      "answerIndex": 2,
      "explanation": "권한 변경 이벤트나 401/403 응답을 받으면 사용자 scope의 query cache와 메뉴, route guard 데이터를 함께 invalidate한다. 탭이 여러 개라면 BroadcastChannel이나 storage event로 logout과 permission refresh를 전파한다."
    },
    {
      "id": "q28",
      "question": "React Error Boundary가 잡지 못해 별도 처리가 필요한 오류는?",
      "choices": [
        "렌더링 중 발생한 자식 컴포넌트의 예외",
        "컴포넌트 mount 시점의 초기 렌더 오류",
        "subtree 어딘가에서 던진 렌더 단계 예외",
        "event handler 내부의 예외로, try/catch·promise rejection 처리·error reporting wrapper가 필요하다"
      ],
      "answerIndex": 3,
      "explanation": "React Error Boundary는 event handler 안의 예외를 자동으로 잡지 않는다. handler 내부 try/catch, promise rejection 처리, error reporting wrapper를 두고 사용자에게는 실패 toast나 inline error를 보여줘야 한다."
    },
    {
      "id": "q29",
      "question": "i18n에서 번역할 문장을 조각내어 문자열 concat으로 조립하면 위험한 이유는?",
      "choices": [
        "언어마다 어순·조사·복수형·성별 규칙이 달라 조각을 이어 붙이면 자연스럽게 번역할 수 없기 때문",
        "concat 연산이 런타임 성능을 크게 떨어뜨리기 때문",
        "문자열 조각이 번들 크기를 불필요하게 늘리기 때문",
        "concat이 XSS 이스케이프를 우회해 보안 취약점을 만들기 때문"
      ],
      "answerIndex": 0,
      "explanation": "언어마다 어순·조사·복수형·성별 규칙이 달라 조각을 이어 붙이면 자연스럽게 번역할 수 없다. ICU message처럼 변수와 조건을 포함한 문장 단위로 넘겨야 번역자가 맥락을 유지한다."
    },
    {
      "id": "q30",
      "question": "SSE와 WebSocket 중 무엇을 고를지 판단하는 기준으로 옳은 것은?",
      "choices": [
        "SSE는 항상 구식이므로 실시간 기능에는 무조건 WebSocket을 쓴다",
        "서버→클라이언트 단방향 이벤트는 SSE가 단순·HTTP 친화적이고, 양방향 저지연·presence·협업 편집처럼 client 메시지가 많으면 WebSocket을 고려한다",
        "WebSocket이 HTTP 친화적이라 단방향 알림에 더 단순하다",
        "두 방식은 기능이 동일하므로 선호하는 라이브러리 지원 여부로만 정한다"
      ],
      "answerIndex": 1,
      "explanation": "서버에서 클라이언트로 단방향 이벤트를 보내면 SSE가 단순하고 HTTP 친화적이다. 양방향 저지연 조작·presence·협업 편집처럼 client 메시지가 많으면 WebSocket을 고려한다."
    },
    {
      "id": "q31",
      "question": "파일 업로드에서 확장자 검증만으로 충분하지 않은 이유는?",
      "choices": [
        "확장자 검증은 브라우저 성능을 떨어뜨려 대용량 파일에서 느리기 때문",
        "확장자 검증은 IME·paste 입력에서 동작하지 않기 때문",
        "확장자는 쉽게 바꿀 수 있어 MIME·magic byte·서버 측 스캔·크기 제한이 필요하기 때문",
        "확장자는 대소문자 구분이 없어 매칭이 항상 실패하기 때문"
      ],
      "answerIndex": 2,
      "explanation": "확장자는 쉽게 바꿀 수 있으므로 MIME·magic byte·서버 측 스캔과 크기 제한이 필요하다. 프론트 검증은 빠른 피드백이고 신뢰 경계는 서버에 둔다."
    },
    {
      "id": "q32",
      "question": "500 오류와 network error를 UI에서 다르게 처리해야 하는 이유는?",
      "choices": [
        "둘 다 서버가 응답한 것이므로 동일한 traceId 기반 문의 경로로 처리하면 된다",
        "500은 항상 재시도로 해결되고 network error는 재시도가 불가능하기 때문",
        "network error는 클라이언트 코드 버그일 뿐이라 사용자에게 노출할 필요가 없기 때문",
        "500은 서버가 응답했지만 처리에 실패한 상태라 traceId·재시도·문의 경로를, network error는 응답 자체가 없어 offline·timeout·CORS 실패를 구분하고 연결 복구·retry를 보여줘야 하기 때문"
      ],
      "answerIndex": 3,
      "explanation": "500은 서버가 응답했지만 처리에 실패한 상태라 traceId와 재시도 또는 문의 경로를 줄 수 있다. network error는 응답 자체가 없을 수 있으므로 offline·timeout·CORS 실패를 구분하고 연결 복구나 retry 상태를 보여줘야 한다."
    }
  ]
};

export default quiz;
