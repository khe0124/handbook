// 프론트엔드 인터랙션 Q&A(engineering-frontend-interaction-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-interaction-quiz",
  title: "프론트엔드 인터랙션 퀴즈",
  sourceQaId: "engineering-frontend-interaction-qa",
  questions: [
    {
      id: "q1",
      question: "좋은 인터랙션 설계의 출발점으로 가장 정확한 것은?",
      choices: [
        "이벤트 핸들러보다 사용자의 의도, 상태, 전이, 취소, 실패 복구를 먼저 모델링한다",
        "click handler를 먼저 붙이고 필요할 때 상태를 추가한다",
        "디자인 시안의 애니메이션을 픽셀 단위로 재현한다",
        "라이브러리 API를 암기해 컴포넌트를 빠르게 조립한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 이벤트 핸들러가 아니라 의도·상태·전이·취소·실패 복구를 먼저 모델링해야 idle/armed/active/committing/failed 같은 상태에 테스트와 접근성이 붙는다고 한다. click handler만 구현하면 double submit·pointercancel·route change·stale response에서 상태가 꼬인다.",
    },
    {
      id: "q2",
      question: "명시적 상태 기계가 과하다고 볼 수 있는 경우는?",
      choices: [
        "drag처럼 pointer와 keyboard가 함께 걸릴 때",
        "hover 색상처럼 전이가 두세 개이고 실패나 비동기 복구가 없을 때",
        "optimistic mutation처럼 network 전환이 있을 때",
        "wizard처럼 route 전환이 함께 걸릴 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 hover 색상처럼 전이가 두세 개이고 실패나 비동기 복구가 없으면 명시적 상태 기계까지는 과하다고 한다. 반대로 drag·wizard·optimistic mutation은 전이표로 두는 편이 QA fixture를 만들기 쉽다.",
    },
    {
      id: "q3",
      question: "drag and drop에서 pointer capture를 쓰는 이유는?",
      choices: [
        "터치 기기에서 hover 상태를 강제로 유지하기 위해",
        "드래그 좌표를 container가 아닌 viewport 기준으로 고정하기 위해",
        "드래그 중 포인터가 원래 요소 밖으로 나가도 move/up 이벤트를 같은 요소에서 받기 위해",
        "keyboard 재정렬을 자동으로 활성화하기 위해",
      ],
      answerIndex: 2,
      explanation:
        "본문은 pointer capture를 드래그 중 포인터가 요소 밖으로 나가도 move/up을 같은 요소에서 받기 위해 쓴다고 한다. capture를 쓰면 iframe 경계·pointercancel·lostpointercapture를 함께 처리하고 취소 시 rollback fixture가 필요하다.",
    },
    {
      id: "q4",
      question: "키보드 사용자가 목록을 재정렬하는 방식으로 본문이 제시한 것은?",
      choices: [
        "Tab으로 항목을 옮기고 Enter로 저장한다",
        "마우스 드래그를 에뮬레이션하는 단축키를 별도로 제공한다",
        "Ctrl+Arrow로 항목을 잘라내고 붙여넣는다",
        "Space나 Enter로 grab을 토글하고 Arrow로 이동한 뒤 다시 Space/Enter로 확정한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 grab 상태를 Space나 Enter로 토글하고 Arrow로 위치를 이동한 뒤 다시 Space/Enter로 확정하게 하며, 결과는 aria-live로 알리고 focus는 이동한 item에 유지한다고 한다.",
    },
    {
      id: "q5",
      question: "focus trap이 적절한 UI는?",
      choices: [
        "modal처럼 배경 조작을 막고 현재 결정에 머물러야 하는 경우",
        "popover처럼 가벼운 상호작용 레이어",
        "combobox처럼 목록을 탐색하는 위젯",
        "일반 페이지의 Tab 순서 탐색",
      ],
      answerIndex: 0,
      explanation:
        "본문은 focus trap이 modal처럼 배경 조작을 막고 현재 결정에 머물러야 하는 UI에서 필요하다고 한다. popover나 combobox는 trap보다 roving focus나 active descendant가 맞을 수 있다.",
    },
    {
      id: "q6",
      question: "native button에서 Enter와 Space, 그리고 text input에서의 차이로 옳은 것은?",
      choices: [
        "native button에선 Enter만 activation이고 Space는 스크롤이다",
        "native button에선 둘 다 activation이지만 text input에선 Enter가 submit·선택 확정, Space는 문자 입력이다",
        "text input에선 Enter와 Space가 모두 submit이다",
        "custom role을 써도 Enter/Space 기본 동작은 항상 유지된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 native button에서는 Enter/Space 둘 다 activation이지만 text input에서는 Enter가 submit이나 선택 확정, Space는 문자 입력이라고 한다. custom role은 기본 동작을 잃기 쉬우므로 fixture로 확인한다.",
    },
    {
      id: "q7",
      question: "optimistic UI를 도입해도 되는 조건으로 본문이 든 것은?",
      choices: [
        "네트워크가 항상 빠르고 실패가 없을 때",
        "결제처럼 외부 side effect가 걸린 작업일 때",
        "성공 확률이 높고 실패 복구가 명확하며 중복·순서 문제를 제어할 수 있을 때",
        "서버 최종 상태를 조회하지 않아도 되는 단순 표시일 때",
      ],
      answerIndex: 2,
      explanation:
        "본문은 성공 확률이 높고 실패 복구가 명확하며 중복·순서 문제를 제어할 수 있을 때 optimistic UI를 쓴다고 한다. 결제는 외부 side effect와 금전 상태가 걸려 pending state·idempotency key·서버 최종 결과 조회를 우선한다.",
    },
    {
      id: "q8",
      question: "cancel과 undo의 차이로 옳은 것은?",
      choices: [
        "cancel은 서버 상태를 되돌리고 undo는 UI만 되돌린다",
        "둘 다 audit log 없이 UI에서만 처리하면 된다",
        "undo는 commit 전, cancel은 commit 후에 쓴다",
        "cancel은 commit 전 armed/editing/pending을 중단하는 것이고 undo는 이미 적용된 command를 반대 command로 되돌리는 것이다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 cancel이 commit 전 armed/editing/pending 상태를 중단하는 것이고 undo는 이미 적용된 command를 반대 command로 되돌리는 것이라고 한다. 그래서 undo에는 audit log·compensation API·만료 시간·analytics undo event가 필요하다.",
    },
    {
      id: "q9",
      question: "modal과 drawer의 구분으로 본문에 맞는 것은?",
      choices: [
        "modal은 현재 작업을 막고 결정을 요구할 때, drawer는 맥락을 유지한 보조 작업이나 상세 탐색에 쓴다",
        "modal은 모바일 전용, drawer는 데스크톱 전용이다",
        "modal은 URL에 연결하고 drawer는 항상 local state로만 둔다",
        "drawer는 결정을 강제하고 modal은 맥락 유지에 쓴다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 modal이 현재 작업을 막고 결정을 요구할 때, drawer가 맥락을 유지한 보조 작업이나 상세 탐색에 적합하다고 한다. 모든 것을 modal로 만들면 deep link·mobile viewport·focus trap·history handling이 복잡해진다.",
    },
    {
      id: "q10",
      question: "tooltip과 popover의 차이로 옳은 것은?",
      choices: [
        "tooltip은 클릭으로 열고 popover는 hover로만 연다",
        "tooltip은 focus 가능한 콘텐츠를 담지 않는 보조 설명이고, popover는 상호작용 가능한 레이어로 열림/닫힘·focus·outside click 정책이 필요하다",
        "popover는 버튼을 담을 수 없고 tooltip은 담을 수 있다",
        "둘 다 hover 전용이라 touch 기기에서 동일하게 동작한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 tooltip이 보조 설명이고 focus 가능한 콘텐츠를 담지 않으며, popover는 상호작용 가능한 작은 레이어로 열림/닫힘·focus·outside click 정책이 필요하다고 한다. tooltip 안에 버튼을 넣으면 keyboard·screen reader 사용자가 접근하기 어렵다.",
    },
    {
      id: "q11",
      question: "debounce와 throttle의 적합한 용도 구분으로 옳은 것은?",
      choices: [
        "debounce는 scroll에, throttle은 검색 요청에 맞다",
        "둘 다 UI feedback까지 함께 지연시켜야 한다",
        "debounce는 입력이 멈춘 뒤 한 번 실행해 검색·저장 draft에, throttle은 일정 간격 실행이라 scroll/resize/pointer move에 맞다",
        "debounce는 CPU long task를, throttle은 render 폭증을 원천 제거한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 debounce가 입력이 멈춘 뒤 한 번 실행해 검색 요청이나 저장 draft에 맞고, throttle은 일정 간격마다 실행해 scroll/resize/pointer move에 맞다고 한다. 둘 다 UI feedback은 즉시 주고 network나 계산만 지연해야 한다.",
    },
    {
      id: "q12",
      question: "이전 요청 응답이 늦게 도착하는 stale response를 검색 자동완성에서 막는 방법은?",
      choices: [
        "debounce 시간을 늘려 요청을 더 줄인다",
        "모든 추천 결과를 무기한 cache한다",
        "minimum query length를 0으로 낮춰 매 입력마다 요청한다",
        "request id를 비교해 늦은 응답이 최신 query를 덮지 않게 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 늦은 응답이 최신 query를 덮지 않게 request id를 비교한다고 한다. 추천을 cache할 때도 query·locale·권한·세그먼트를 cache key에 넣고 permission change 시 invalidate 기준을 정해야 한다.",
    },
    {
      id: "q13",
      question: "inline edit에서 blur 시 자동 저장만 쓰면 생기는 위험은?",
      choices: [
        "Enter 키가 항상 문자 입력으로 바뀐다",
        "사용자가 취소했다고 생각한 값이 저장되거나 네트워크 실패가 숨겨질 수 있다",
        "focus가 편집 trigger로 반드시 돌아간다",
        "optimistic patch가 자동으로 rollback된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 blur 시 자동 저장만 쓰면 사용자가 취소했다고 생각한 값이 저장되거나 네트워크 실패가 숨겨질 수 있다고 한다. view/edit/saving/saved/failed 상태와 escape/cancel, focus 복귀를 함께 설계해야 한다.",
    },
    {
      id: "q14",
      question: "selection interaction에서 select all의 범위가 모호할 때의 위험은?",
      choices: [
        "row identity가 자동으로 사라진다",
        "현재 화면만 선택인지 전체 결과 선택인지 모호하면 사용자가 예상보다 많은 데이터를 변경할 수 있다",
        "disabled row가 항상 선택된다",
        "bulk action 권한이 서버에서 무시된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 현재 화면만 선택인지 전체 결과 선택인지 모호하면 사용자가 예상보다 많은 데이터를 변경할 수 있다고 한다. select all은 copy와 state로 명확히 구분하고 bulk action confirmation에 대상 수·필터·제외 항목을 보여줘야 한다.",
    },
    {
      id: "q15",
      question: "scrollIntoView가 항상 안전하지 않은 이유로 본문이 든 것은?",
      choices: [
        "reduced motion 설정을 항상 무시하기 때문",
        "모든 브라우저에서 지원되지 않기 때문",
        "sticky header에 가리거나 body를 움직일 수 있고, virtual list에선 대상 DOM이 아직 없을 수 있다",
        "focus를 자동으로 대상 요소에 옮겨 주기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 scrollIntoView가 sticky header에 가리거나 nested container가 아닌 body를 움직일 수 있고 virtual list에서는 대상 DOM이 아직 없을 수 있다고 한다. offset 계산·container 지정·reduced motion·focus 순서를 fixture로 확인한다.",
    },
    {
      id: "q16",
      question: "gesture를 추가할 때의 기준으로 본문에 맞는 것은?",
      choices: [
        "발견 가능성을 위해 gesture만 단독으로 제공한다",
        "삭제 같은 위험한 action도 swipe만으로 확정한다",
        "touch와 mouse를 각각 별도 event 모델로 처리한다",
        "gesture는 보조 경로여야 하며 명시적 버튼/키보드 대체 조작과 충돌하지 않아야 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 gesture가 보조 경로여야 하며 명시적 버튼/키보드 대체 조작과 충돌하지 않아야 한다고 한다. swipe 삭제만 제공하면 발견 가능성과 접근성이 낮고 실수 비용이 크며, 위험한 action은 staged reveal·confirmation·undo를 둔다.",
    },
    {
      id: "q17",
      question: "disabled와 aria-disabled의 차이로 옳은 것은?",
      choices: [
        "disabled는 native control을 focus·submit에서 제외하지만, aria-disabled는 의미만 전달하고 동작 차단은 직접 해야 한다",
        "aria-disabled는 focus를 제외하고 disabled는 의미만 전달한다",
        "둘 다 Enter/Space handler를 자동으로 막는다",
        "aria-disabled는 native control에만, disabled는 custom button에만 쓴다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 disabled가 native control을 focus와 submit에서 제외하지만 aria-disabled는 의미만 전달하고 동작 차단은 직접 해야 한다고 한다. focus를 유지해야 할 때 aria-disabled를 쓰되 Enter/Space handler도 막아야 한다.",
    },
    {
      id: "q18",
      question: "confirmation dialog를 모든 작업에 붙이면 생기는 문제는?",
      choices: [
        "audit log가 남지 않게 된다",
        "사용자가 기계적으로 확인해 정작 위험한 작업의 신호가 약해진다",
        "soft delete가 불가능해진다",
        "권한 검사가 서버에서 생략된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 모든 작업에 confirm을 붙이면 사용자가 기계적으로 확인하고 정작 위험한 작업의 신호가 약해진다고 한다. confirmation은 되돌리기 어렵거나 영향 범위가 큰 작업에 쓰고 반복 작업에는 undo나 staged review가 낫다.",
    },
    {
      id: "q19",
      question: "aria-live에서 assertive를 남용하면 생기는 문제는?",
      choices: [
        "polite 메시지가 아예 낭독되지 않는다",
        "focus가 항상 live region으로 이동한다",
        "screen reader 사용자의 작업을 방해하고 중요한 알림이 묻힌다",
        "toast queue가 자동으로 dedupe된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 모든 변화를 assertive로 읽으면 screen reader 사용자의 작업을 방해하고 중요한 알림이 묻힌다고 한다. 저장 완료·결과 수 변경은 polite로 충분하고 세션 만료나 destructive failure처럼 즉시 행동이 필요할 때만 assertive를 쓴다.",
    },
    {
      id: "q20",
      question: "권한 기반 UI에서 '버튼을 숨기면 충분한가'에 대한 본문의 답은?",
      choices: [
        "충분하다. 버튼이 없으면 API 호출도 함께 차단된다",
        "route guard까지 걸면 서버 검증은 생략해도 된다",
        "권한 cache가 보안 판단의 원본이 될 수 있다",
        "충분하지 않다. 숨김은 사용성 힌트일 뿐이고 서버가 action 직전에 권한을 다시 판단해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 버튼 숨김이 사용성 힌트일 뿐이고 서버가 action 직전에 권한을 다시 판단해야 한다고 한다. keyboard shortcut·command palette 우회, optimistic mutation reject를 함께 검증하고 권한 cache는 보안 판단의 원본이 되면 안 된다.",
    },
    {
      id: "q21",
      question: "drag and drop 구현에서 함께 설계해야 하는 요소로 본문이 든 것은?",
      choices: [
        "pointer lifecycle, keyboard 대체 조작, drop target 계산, scroll container, 취소/rollback을 함께 설계한다",
        "마우스 좌표만 정확히 잡으면 touch와 pen 조작은 자동으로 따라온다",
        "drop target은 항상 viewport 기준 절대 좌표로 계산하면 충분하다",
        "keyboard 조작은 별도 위젯으로 분리해 pointer 흐름과 독립적으로 둔다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 drag and drop에서 pointer lifecycle, keyboard 대체 조작, drop target 계산, scroll container, 취소/rollback을 함께 설계해야 한다고 한다. 마우스 기준으로만 만들면 touch·pen·keyboard·iframe·pointercancel에서 조작이 끊긴다.",
    },
    {
      id: "q22",
      question: "undo 기능 설계에서 본문이 가장 먼저 분리하라고 한 것은?",
      choices: [
        "되돌릴 수 있는 command와 되돌릴 수 없는 side effect를 분리하고 undo window·server commit timing·audit log를 정한다",
        "UI 상태만 이전 값으로 되돌리면 서버 상태는 자동으로 따라오게 둔다",
        "모든 작업을 하나의 undo stack에 넣고 발생 순서대로만 되돌린다",
        "외부 알림이나 결제도 UI undo 하나로 일괄 취소한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 undo에서 되돌릴 수 있는 command와 되돌릴 수 없는 side effect를 분리하고 undo window·server commit timing·audit log를 정하라고 한다. 이미 외부 알림이나 결제가 나간 작업을 단순 UI undo로 처리하면 사용자는 취소됐다고 믿지만 시스템은 진행된다.",
    },
    {
      id: "q23",
      question: "입력 지연을 줄이는 인터랙션 전략으로 본문이 제시한 것은?",
      choices: [
        "입력 즉시 feedback을 주고 비싼 계산은 debounce·transition·worker·virtualization으로 분리한다",
        "모든 입력 처리를 debounce로 감싸면 CPU long task까지 원천 제거된다",
        "feedback을 계산 완료 시점까지 미뤄 화면 깜빡임을 줄인다",
        "무거운 렌더는 항상 worker로 옮기면 반드시 빨라진다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 입력 즉시 feedback을 주고 비싼 계산은 debounce·transition·worker·virtualization으로 분리하라고 한다. debounce만 걸면 느린 느낌은 줄어도 CPU long task나 render 폭증의 원인은 남는다.",
    },
    {
      id: "q24",
      question: "실시간 협업 UI에서 설계 요소와 핵심 위험으로 본문에 맞는 것은?",
      choices: [
        "presence·cursor·conflict resolution·optimistic update·latency compensation·offline reconnect를 설계하고 마지막 저장값으로 덮어쓰지 않아야 한다",
        "마지막 저장이 항상 최신이므로 last write wins로 단순화한다",
        "presence는 실시간이라 heartbeat 만료 없이 항상 신뢰할 수 있다",
        "offline edit는 데이터 모델과 무관하게 자유롭게 허용한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 실시간 협업 UI에서 presence·cursor·conflict resolution·optimistic update·latency compensation·offline reconnect를 설계해야 하며 마지막 저장값으로 덮어쓰면 사용자의 작업이 조용히 사라진다고 한다.",
    },
    {
      id: "q25",
      question: "인터랙션과 analytics를 연결하는 방식으로 본문이 제시한 것은?",
      choices: [
        "사용자 의도 단위로 event를 정의하고 exposure·action·result·error를 나눈다",
        "DOM click을 빠짐없이 추적해 데이터 양을 최대한 확보한다",
        "성공 흐름만 기록하고 실패와 취소는 노이즈로 보고 제외한다",
        "같은 저장 action이라도 발생 위치별로 서로 다른 schema를 만든다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 사용자 의도 단위로 event를 정의하고 exposure·action·result·error를 나누라고 한다. DOM click만 추적하면 의미 없는 이벤트가 쌓이고 실패·취소·재시도 흐름을 놓친다.",
    },
    {
      id: "q26",
      question: "focus management에서 본문이 말하는 focus의 의미와 완료 기준은?",
      choices: [
        "focus는 시각적 강조일 뿐이라 위치 명시 없이 브라우저 기본에 맡긴다",
        "focus는 사용자의 현재 작업 위치이며 modal·route change·validation error·async content 삽입 뒤 이동과 복귀 위치를 명시한다",
        "DOM이 바뀌면 focus를 항상 body로 보내 초기화하는 것이 안전하다",
        "focus 복귀는 pointer 사용자에게만 필요하고 keyboard 사용자에겐 불필요하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 focus가 사용자의 현재 작업 위치이며 modal·popover·route change·validation error·async content 삽입 뒤 focus 이동과 복귀 위치를 명시해야 한다고 한다. focus가 body로 빠지면 keyboard와 screen reader 사용자가 흐름을 잃는다.",
    },
    {
      id: "q27",
      question: "keyboard 사용자를 위한 focus ring 처리로 본문에 맞는 것은?",
      choices: [
        "디자인 깔끔함을 위해 focus ring은 제거하는 편이 낫다",
        "없애면 안 되고, 커스텀하더라도 keyboard 사용자가 현재 위치를 볼 수 있어야 하며 focus-visible로 pointer 클릭과 keyboard focus를 나눈다",
        "focus ring은 pointer 클릭에도 항상 똑같이 보여야 한다",
        "focus ring 대신 hover 효과만 있으면 keyboard 사용자에게 충분하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 focus ring을 없애면 안 되며 디자인에 맞게 커스텀하되 keyboard 사용자가 현재 위치를 볼 수 있어야 하고, focus-visible 기준으로 pointer 클릭과 keyboard focus를 나눠 visual regression과 keyboard test를 통과해야 한다고 한다.",
    },
    {
      id: "q28",
      question: "좋아요 버튼과 결제 버튼에 optimistic UI를 다르게 적용하는 이유는?",
      choices: [
        "좋아요는 서버 검증이 필요하고 결제는 UI만 되돌리면 되기 때문",
        "둘 다 실패 시 toast 하나면 충분하기 때문",
        "좋아요는 실패해도 rollback/retry로 피해가 작지만, 결제는 외부 side effect와 금전 상태가 걸려 pending state·idempotency key·서버 최종 결과 조회·중복 제출 방지를 우선하기 때문",
        "결제는 성공 확률이 높아 optimistic UI가 항상 더 안전하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 좋아요는 실패해도 rollback하거나 retry하면 피해가 작지만 결제는 외부 side effect와 금전 상태가 걸려 UI만 되돌리면 안 되며 pending state·idempotency key·서버 최종 결과 조회·중복 제출 방지를 우선한다고 한다.",
    },
    {
      id: "q29",
      question: "복잡한 wizard flow를 모델링할 때 본문이 명시하라고 한 요소는?",
      choices: [
        "step index 하나만 두면 조건부 분기와 뒤로가기가 자동 처리된다",
        "모든 step을 항상 local state로만 두고 URL에는 노출하지 않는다",
        "step·guard·validation·save draft·back navigation·resumability·server state를 명시한다",
        "완료 후에도 모든 이전 step으로 자유롭게 되돌아갈 수 있게 둔다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 wizard에서 step·guard·validation·save draft·back navigation·resumability·server state를 명시해야 한다고 한다. 단순 step index만 두면 조건부 분기·뒤로가기·중간 저장·권한 만료에서 잘못된 단계로 이동한다.",
    },
    {
      id: "q30",
      question: "user-event와 fireEvent의 차이로 본문에 맞는 것은?",
      choices: [
        "fireEvent가 실제 사용자 동작에 가까워 keyboard/pointer 검증의 기본값이다",
        "user-event는 단일 이벤트만 직접 쏘아 edge case 재현에 특화된다",
        "user-event는 click·typing·tab처럼 실제 사용자 동작에 가까운 이벤트 순서와 focus 변화를 만들고, fireEvent는 단일 이벤트를 직접 쏴 edge case엔 유용하지만 상호작용 검증 기본값으로는 부족하다",
        "둘 다 focus 변화를 포함하지 않아 접근성 테스트에는 쓸 수 없다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 user-event가 실제 사용자 동작에 가까운 이벤트 순서와 focus 변화를 만들고, fireEvent는 단일 이벤트를 직접 쏘기 때문에 edge case 재현엔 유용하지만 keyboard/pointer 상호작용 검증의 기본값으로는 부족하다고 한다.",
    },
    {
      id: "q31",
      question: "context menu를 keyboard로 여는 방법으로 본문이 제시한 것은?",
      choices: [
        "Tab 키를 두 번 눌러 자동으로 열리게 한다",
        "우클릭만 지원하고 keyboard 사용자는 마우스로 안내한다",
        "Context Menu 키나 Shift+F10, 또는 명시적 more button으로 열고 열릴 때 첫 항목이나 현재 선택 항목에 focus를 둔다",
        "Enter로 열되 Escape는 무시해 실수 닫힘을 막는다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 context menu를 Context Menu 키나 Shift+F10, 또는 명시적 more button으로 열 수 있어야 하고 열릴 때 첫 메뉴 항목이나 현재 선택 항목에 focus를 두며 Arrow/Escape 동작을 menu pattern에 맞춘다고 한다.",
    },
    {
      id: "q32",
      question: "toast에 담아야 하는 정보로 본문이 든 것은?",
      choices: [
        "발생 시각과 서버 요청 id 같은 디버그 정보",
        "가능한 모든 오류를 toast 하나로 모아 표시",
        "성공 여부만 짧게 알리고 영향 범위는 생략",
        "결과·영향 범위·다음 행동·복구 가능성을 짧게 알리고 중요한 오류는 inline error나 persistent status를 함께 둔다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 toast가 결과·영향 범위·다음 행동·복구 가능성을 짧게 알려야 하며 중요한 오류는 toast만으로 끝내지 않고 inline error나 persistent status를 둔다고 한다. 모든 오류를 toast로 처리하면 announcement·재시도·놓친 오류 추적이 어렵다.",
    },
    {
      id: "q33",
      question: "inline edit 저장 중 서버가 409나 version mismatch를 줄 때의 처리로 옳은 것은?",
      choices: [
        "사용자 draft를 조용히 서버 최신값으로 덮어쓴다",
        "서버 최신값을 조용히 사용자 draft로 덮어쓴다",
        "충돌은 무시하고 재시도만 자동 반복한다",
        "사용자의 draft·서버 최신값·덮어쓰기/병합/취소 action을 보여주고 focus를 conflict panel로 보내며 선택 결과를 audit log에 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 서버가 409나 version mismatch를 주면 사용자의 draft·서버 최신값·덮어쓰기/병합/취소 action을 보여주고 조용히 덮어쓰지 말고 focus를 conflict panel로 보내며 audit log에 선택 결과를 남기라고 한다.",
    },
    {
      id: "q34",
      question: "command palette에서 파괴적이거나 대상이 많은 명령의 preview로 본문이 든 예는?",
      choices: [
        "명령 이름만 보여주고 실행은 즉시 확정한다",
        "대상 수는 실행 후 결과 화면에서만 확인한다",
        "권한 없는 명령도 목록에 노출해 발견 가능성을 높인다",
        "'Archive 23 filtered issues'처럼 대상·권한·예상 결과를 실행 전에 preview로 보여주고 실행 후 undo나 audit event를 연결한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 파괴적이거나 대상이 많은 명령은 실행 전에 대상·권한·예상 결과를 preview로 보여줘야 하며 'Archive 23 filtered issues'처럼 scope가 명확해야 하고 실행 후 undo나 audit event를 연결한다고 한다.",
    },
    {
      id: "q35",
      question: "복잡한 인터랙션 QA에 우선 넣을 시나리오로 본문이 든 것은?",
      choices: [
        "happy path를 여러 브라우저에서 반복 검증하는 것",
        "가장 자주 쓰이는 정상 click 흐름만 집중 검증하는 것",
        "시각적 애니메이션의 프레임 정확도를 측정하는 것",
        "keyboard-only 경로, 느린 네트워크와 stale response, 권한 변경이나 403 복구를 우선 넣고 pointercancel이나 rapid click을 더한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 QA에 keyboard-only 경로, 느린 네트워크와 stale response, 권한 변경이나 403 복구를 우선 넣고 pointercancel 또는 rapid click을 더하면 state machine의 취소와 중복 제출 전이가 드러난다고 한다.",
    },
  ],
};

export default quiz;
