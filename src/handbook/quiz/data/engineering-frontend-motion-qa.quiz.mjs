// 프론트엔드 모션·애니메이션 Q&A(engineering-frontend-motion-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-motion-quiz",
  title: "프론트엔드 모션·애니메이션 퀴즈",
  sourceQaId: "engineering-frontend-motion-qa",
  questions: [
    {
      id: "q1",
      question: "제품 모션의 목적을 가장 정확히 정의한 것은?",
      choices: [
        "상태 변화·공간 관계·주의 이동·조작 결과를 설명하는 피드백",
        "브랜드 톤과 첫인상을 각인시키는 장식 요소",
        "로딩 지연을 자연스럽게 가리기 위한 시각 완충",
        "화면을 더 고급스럽게 보이게 하는 마감 처리",
      ],
      answerIndex: 0,
      explanation:
        "모션은 장식이 아니라 상태 변화, 공간 관계, 주의 이동, 조작 결과를 설명하는 피드백이다. 목적 없이 추가하면 지연처럼 느껴지고 접근성·성능 비용만 늘어난다.",
    },
    {
      id: "q2",
      question: "duration과 easing을 정하는 기준으로 본문이 든 것은?",
      choices: [
        "브랜드 가이드가 지정한 고정 duration 하나",
        "변화 거리·중요도·입력 직접성·interrupt 가능성",
        "가장 인기 있는 애니메이션 라이브러리의 기본값",
        "디자이너의 감각에 맞춘 프로토타입 재생 속도",
      ],
      answerIndex: 1,
      explanation:
        "변화 거리, 중요도, 입력 직접성, interrupt 가능성을 기준으로 token화한다. 모든 animation을 같은 duration/easing으로 두면 느리거나 급작스럽게 보이고 시스템 일관성이 떨어진다.",
    },
    {
      id: "q3",
      question: "ease-out이 적합한 경우는?",
      choices: [
        "요소가 빠르게 사라져야 하는 exit transition",
        "양방향으로 오가는 state change의 기본값",
        "사용자 입력 응답처럼 빨리 시작해 부드럽게 멈춰야 하는 enter나 drawer open",
        "일정한 속도가 필요한 무한 loop animation",
      ],
      answerIndex: 2,
      explanation:
        "ease-out은 입력에 대한 응답처럼 빨리 시작하고 부드럽게 멈춰야 할 때 쓴다. exit는 빠르게 사라지는 ease-in, 양방향 state change는 ease-in-out이나 spring token을 별도로 둔다.",
    },
    {
      id: "q4",
      question: "prefers-reduced-motion을 지원할 때 옳은 접근은?",
      choices: [
        "모든 animation을 완전히 제거해 정적 화면으로 만든다",
        "CSS animation만 끄고 JS animation은 그대로 둔다",
        "설정은 최초 로드시 한 번만 읽고 이후 변경은 무시한다",
        "큰 이동·parallax·autoplay를 줄이고 상태 피드백은 fade/instant로 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "모두 제거하는 것이 아니라 큰 이동·parallax·zoom·자동 loop를 줄이고, 상태 피드백은 opacity fade·instant change·progress text처럼 덜 자극적인 방식으로 남겨 변화를 이해하게 한다.",
    },
    {
      id: "q5",
      question: "reduced motion 설정이 실행 중 바뀌면 어떻게 해야 하나?",
      choices: [
        "media query change를 구독해 새 animation부터 reduced token을 적용하고 진행 중 loop·parallax는 cancel한다",
        "다음 페이지 새로고침 때까지 기존 animation을 유지한다",
        "진행 중인 animation만 즉시 끊고 새 animation 정책은 유지한다",
        "OS 설정 변경은 감지할 수 없으므로 대응하지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "OS 설정이 바뀌면 media query change를 구독해 새 animation부터 reduced token을 적용하고, 진행 중인 loop나 parallax는 cancel해야 한다.",
    },
    {
      id: "q6",
      question: "FLIP 기법이 layout 비용을 줄이는 원리는?",
      choices: [
        "매 프레임 layout을 다시 계산해 정확한 위치를 보장한다",
        "First/Last를 제한된 시점에만 측정하고 차이를 transform으로 재생한다",
        "width/height를 직접 보간해 중간 값을 계산한다",
        "layout 측정을 생략하고 고정 좌표로만 이동한다",
      ],
      answerIndex: 1,
      explanation:
        "FLIP도 layout을 읽지만, 매 프레임 변경하지 않고 First/Last를 제한된 시점에 측정한 뒤 transform으로 재생한다. read/write 순서를 분리하고 forced reflow가 반복되지 않는지 봐야 한다.",
    },
    {
      id: "q7",
      question: "gesture·physics·interrupt 제어가 필요한 애니메이션에 본문이 권하는 선택은?",
      choices: [
        "CSS transition과 token만으로 처리",
        "requestAnimationFrame 없이 setInterval 기반 loop",
        "JS animation library나 Web Animations API",
        "height auto transition으로 상태 전환",
      ],
      answerIndex: 2,
      explanation:
        "단순 상태 전환은 CSS, gesture/physics/interrupt 제어가 필요한 것은 JS animation library나 Web Animations API를 고려한다. 모든 것을 CSS로 하면 상태 제어와 취소가 어려울 수 있다.",
    },
    {
      id: "q8",
      question: "layout을 건드리는 animation이 위험한 이유는?",
      choices: [
        "transform·opacity보다 GPU memory를 항상 더 많이 쓴다",
        "접근성 트리를 반드시 깨뜨린다",
        "reduced motion에서 자동으로 무시되기 때문이다",
        "width·height·top·left는 layout/paint를 유발하고 많은 요소에 전파돼 frame drop과 INP 악화를 만든다",
      ],
      answerIndex: 3,
      explanation:
        "width·height·top·left는 layout/paint를 유발할 수 있고 많은 요소에 전파된다. 레이아웃 animation이 리스트나 grid에 걸리면 frame drop과 INP 악화가 생긴다. transform/opacity는 composite로 처리될 가능성이 크다.",
    },
    {
      id: "q9",
      question: "will-change 사용에 대한 본문의 입장은?",
      choices: [
        "필요한 짧은 구간에만 쓰고, 상시로 뿌리면 layer가 늘어 GPU memory·paint 비용이 증가한다",
        "성능에 항상 이득이므로 hover 가능한 요소 전체에 미리 걸어둔다",
        "레이아웃 계산을 없애주므로 리스트 전체에 적용하는 것이 좋다",
        "reduced motion에서만 적용해야 하는 속성이다",
      ],
      answerIndex: 0,
      explanation:
        "will-change는 항상 좋지 않다. 필요한 짧은 구간에만 쓰지 않으면 layer가 늘어 GPU memory와 paint 비용이 증가한다. active transition 직전 추가하고 종료 후 제거하는 편이 낫다.",
    },
    {
      id: "q10",
      question: "presence transition의 exit 중 DOM이 남아 있을 때의 위험은?",
      choices: [
        "exit animation의 duration이 자동으로 두 배가 된다",
        "focus나 click을 잡아 사용자가 보이지 않는 요소와 상호작용할 수 있다",
        "layout shift가 발생해 CLS가 항상 나빠진다",
        "브라우저가 해당 요소의 paint를 영구히 캐시한다",
      ],
      answerIndex: 1,
      explanation:
        "exit animation 중 DOM이 남아 있으면 focus나 click을 잡아 사용자가 보이지 않는 요소와 상호작용할 수 있다. aria-hidden, inert, pointer-events를 상태에 맞춰야 한다.",
    },
    {
      id: "q11",
      question: "display: none과 opacity: 0의 차이로 옳은 것은?",
      choices: [
        "둘 다 접근성 트리에서 완전히 제거된다",
        "opacity 0은 layout에서 빠지고 display none은 남는다",
        "display none은 layout·접근성 트리에서 빠지지만 opacity 0은 보이지 않아도 focus·click 대상이 될 수 있다",
        "둘 다 pointer 이벤트를 자동으로 차단한다",
      ],
      answerIndex: 2,
      explanation:
        "display: none은 layout과 접근성 트리에서 빠지지만 opacity 0은 보이지 않아도 focus와 click 대상이 될 수 있다. exit에 opacity/transform을 써도 aria-hidden·inert·pointer-events를 상태에 맞춰야 한다.",
    },
    {
      id: "q12",
      question: "interruptible animation에서 완료 callback에만 상태를 묶으면 생기는 문제는?",
      choices: [
        "animation duration이 무한히 늘어난다",
        "transform이 layout을 강제 계산하게 된다",
        "reduced motion 설정이 무시된다",
        "rapid click에서 UI가 중간 상태에 갇힌다",
      ],
      answerIndex: 3,
      explanation:
        "완료 callback에만 상태를 묶으면 rapid click에서 UI가 중간 상태에 갇힌다. 진행 중 animation을 취소·역전·합성할 수 있어야 빠른 toggle과 route change에서 자연스럽다.",
    },
    {
      id: "q13",
      question: "animation cancel 후 최종 상태(final state)를 결정하는 기준은?",
      choices: [
        "사용자의 최신 의도와 도메인 상태이며, 의미 상태는 최신 action 기준으로 즉시 수렴한다",
        "cancel 시점의 시각적 위치가 그대로 최종 상태가 된다",
        "가장 먼저 시작된 animation의 target 값이다",
        "완료 callback이 반환한 promise 결과값이다",
      ],
      answerIndex: 0,
      explanation:
        "final state는 사용자의 최신 의도와 도메인 상태다. 시각 위치는 현재 값에서 새 target으로 이어가되, aria-expanded나 route state 같은 의미 상태는 최신 action 기준으로 즉시 수렴해야 한다.",
    },
    {
      id: "q14",
      question: "scroll-linked animation을 특히 조심해야 하는 이유는?",
      choices: [
        "scroll 이벤트는 reduced motion에서 항상 차단된다",
        "scroll은 입력과 직접 연결돼 main thread 작업이 끼면 즉시 jank가 난다",
        "scroll은 GPU에서만 처리돼 JS로 제어할 수 없다",
        "scroll animation은 접근성 트리에 노출되지 않는다",
      ],
      answerIndex: 1,
      explanation:
        "scroll은 입력과 직접 연결되어 있어 main thread 작업이 끼면 즉시 jank가 난다. scroll handler에서 layout read/write를 반복하면 frame budget을 초과한다. CSS scroll timeline, IntersectionObserver, throttling을 고려한다.",
    },
    {
      id: "q15",
      question: "passive listener가 scroll 성능에 도움이 되는 이유는?",
      choices: [
        "handler 안의 layout read/write를 자동으로 배치 처리한다",
        "scroll 이벤트의 발생 빈도를 절반으로 줄여준다",
        "브라우저가 scroll을 막지 않는다고 판단해 입력 처리를 기다리지 않게 한다",
        "preventDefault 호출을 자동으로 최적화한다",
      ],
      answerIndex: 2,
      explanation:
        "passive listener는 브라우저가 scroll을 막을 가능성이 없다고 판단해 입력 처리를 기다리지 않게 한다. wheel/touchmove에서 preventDefault가 필요 없으면 passive로 둔다.",
    },
    {
      id: "q16",
      question: "skeleton UI가 CLS를 줄이려면 갖춰야 할 조건은?",
      choices: [
        "화면 전체를 덮는 반짝이는 회색 박스로 채운다",
        "가능한 한 오래 표시해 로딩이 진행 중임을 강조한다",
        "shimmer를 reduced motion에서도 계속 돌려 일관성을 유지한다",
        "실제 콘텐츠의 구조와 크기를 반영해 공간을 미리 잡는다",
      ],
      answerIndex: 3,
      explanation:
        "skeleton은 실제 콘텐츠 구조와 크기를 반영해야 한다. 반짝이는 회색 박스만 넣으면 CLS를 줄이지 못하고 사용자는 진행 상태를 오해한다. shimmer는 reduced motion에서 정지하거나 static placeholder로 바꾼다.",
    },
    {
      id: "q17",
      question: "모든 route에 큰 page transition을 넣으면 생기는 문제는?",
      choices: [
        "navigation latency처럼 느껴지고 browser back/forward와 충돌한다",
        "SEO 인덱싱이 원천적으로 불가능해진다",
        "route state가 URL에서 사라진다",
        "번들 크기가 자동으로 두 배가 된다",
      ],
      answerIndex: 0,
      explanation:
        "page transition은 같은 제품 공간의 탐색 관계를 설명할 때 적합하다. 모든 route에 큰 transition을 넣으면 navigation latency처럼 느껴지고 browser back/forward와 충돌한다.",
    },
    {
      id: "q18",
      question: "micro-interaction token에 포함되어야 하는 것으로 본문이 든 항목은?",
      choices: [
        "z-index·grid 정렬·flex 방향·미디어 쿼리 breakpoint",
        "duration·easing·delay·distance·opacity·scale·reduced-motion 대체·사용 가능한 상태",
        "API 엔드포인트·cache TTL·retry 정책·timeout 값",
        "폰트 크기·색상 대비·행간·자간 같은 타이포 규칙",
      ],
      answerIndex: 1,
      explanation:
        "micro-interaction token은 duration, easing, delay, distance, opacity, scale, reduced-motion 대체, 사용 가능한 상태를 포함한다. 토큰 없이 값이 퍼지면 제품 전체가 불안정해지고 유지보수가 어렵다.",
    },
    {
      id: "q19",
      question: "본문이 말하는 delay의 적절한 사용처는?",
      choices: [
        "버튼 feedback을 더 묵직하게 느끼게 하려는 모든 클릭",
        "route 전환을 부드럽게 보이려는 모든 navigation",
        "tooltip처럼 의도 확인이 필요한 hover나 staggered list처럼 관계를 설명할 때 제한적으로",
        "form error를 천천히 드러내려는 모든 검증 실패",
      ],
      answerIndex: 2,
      explanation:
        "delay는 tooltip처럼 의도 확인이 필요한 hover나 staggered list처럼 관계를 설명할 때 제한적으로 쓴다. 버튼 feedback, form error, navigation에는 입력 지연처럼 느껴져 0에 가깝게 둔다.",
    },
    {
      id: "q20",
      question: "3D transform에 대해 'GPU 가속이면 무조건 좋다'가 틀린 이유는?",
      choices: [
        "GPU는 transform을 처리할 수 없어 CPU로 fallback된다",
        "GPU 가속은 항상 접근성 트리를 깨뜨린다",
        "layer promotion은 paint 비용을 항상 증가시킨다",
        "layer 수와 texture memory가 늘어 모바일에서 오히려 느려질 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "layer promotion은 composite를 빠르게 할 수 있지만 layer 수와 texture memory가 늘어 모바일에서 오히려 느려질 수 있다. Performance trace와 layer panel로 paint 감소와 memory 증가를 같이 봐야 한다.",
    },
    {
      id: "q21",
      question: "Lottie 같은 asset animation을 검토할 때 봐야 할 항목은?",
      choices: [
        "파일 크기·frame rate·렌더러·loop 여부·접근성 대체 텍스트·theme 대응",
        "SSR 렌더 순서·hydration id·라우터 캐시 정책",
        "API 계약·enum drift·서버 인가 경계",
        "URL state·뒤로가기 복원·query key 무효화",
      ],
      answerIndex: 0,
      explanation:
        "Lottie는 파일 크기, frame rate, 렌더러(SVG/canvas), loop 여부, 접근성 대체 텍스트, theme 대응을 본다. 마케팅 asset을 그대로 넣으면 bundle 증가, CPU 사용량, contrast 문제, reduced motion 누락이 생긴다.",
    },
    {
      id: "q22",
      question: "SVG renderer와 canvas renderer의 차이로 옳은 것은?",
      choices: [
        "canvas는 항상 SVG보다 CPU를 적게 쓴다",
        "SVG는 DOM 접근·scaling이 좋지만 요소가 많으면 layout/paint 비용이 크고, canvas는 DOM 부담은 줄지만 접근성 fallback·hit testing을 별도 설계해야 한다",
        "SVG renderer는 reduced motion을 자동으로 지원한다",
        "canvas renderer는 theme token과 자동으로 연동된다",
      ],
      answerIndex: 1,
      explanation:
        "SVG renderer는 DOM 접근과 scaling이 좋지만 요소가 많으면 layout/paint 비용이 커진다. canvas renderer는 DOM 부담은 줄지만 접근성 fallback과 hit testing을 별도로 설계해야 한다.",
    },
    {
      id: "q23",
      question: "motion과 accessibility 충돌을 해결하는 원칙은?",
      choices: [
        "색 변화와 흔들림을 더 강하게 만들어 눈에 띄게 한다",
        "motion을 유일한 신호로 두되 duration을 짧게 한다",
        "정보는 text/icon/state로 중복 제공하고 motion은 보조 피드백으로 둔다",
        "reduced motion 사용자에게는 오류를 알리지 않는다",
      ],
      answerIndex: 2,
      explanation:
        "정보 전달은 motion 하나에 의존하지 않고 text/icon/state로 중복 제공하며 motion은 보조 피드백으로 둔다. 색 변화나 흔들림만으로 오류를 알리면 보조기술과 일부 사용자에게 전달되지 않는다.",
    },
    {
      id: "q24",
      question: "60fps 목표만으로 충분하지 않은 이유로 본문이 든 것은?",
      choices: [
        "60fps는 저사양 기기에서 달성 불가능한 목표라서",
        "브라우저가 60fps를 넘는 프레임을 항상 버리기 때문에",
        "60fps는 CLS 지표와 직접 충돌하기 때문에",
        "핵심은 입력 직후 jank가 없고 frame budget을 넘는 long task가 없는지이며, 120Hz에서는 budget이 절반이라 더 엄격해진다",
      ],
      answerIndex: 3,
      explanation:
        "60fps는 기본 목표로 좋지만 핵심은 입력 직후 jank가 없고 long task가 없는지다. 60Hz는 약 16.7ms, 120Hz는 약 8.3ms라 같은 animation도 고주사율 기기에서 더 엄격해진다.",
    },
    {
      id: "q25",
      question: "hover animation의 한계로 옳은 것은?",
      choices: [
        "touch 기기에는 hover가 없거나 sticky hover처럼 동작하므로 focus/active 동등 피드백이 필요하다",
        "hover는 키보드 사용자에게만 동작하지 않는다",
        "hover animation은 reduced motion에서 자동으로 focus로 대체된다",
        "hover는 모든 pointer에서 동일하게 동작하므로 별도 대응이 필요 없다",
      ],
      answerIndex: 0,
      explanation:
        "touch 기기에는 hover가 없거나 sticky hover처럼 동작할 수 있어 focus/active 상태와 동등한 피드백이 필요하다. hover에만 중요한 정보를 숨기면 모바일과 키보드 사용자에게 기능이 보이지 않는다.",
    },
    {
      id: "q26",
      question: "route change와 unmount에서 animation cleanup이 필요한 이유는?",
      choices: [
        "cleanup을 하지 않으면 CSS transition이 자동으로 두 번 실행된다",
        "timer·RAF·observer·animation instance를 정리하지 않으면 memory leak과 stale update가 생긴다",
        "cleanup은 reduced motion을 활성화하기 위한 필수 단계라서",
        "cleanup이 없으면 브라우저가 해당 route를 캐시하지 못해서",
      ],
      answerIndex: 1,
      explanation:
        "timer, requestAnimationFrame, observer, animation instance를 route change와 unmount에서 정리해야 memory leak과 stale update를 막는다. unmounted component state update나 계속 도는 RAF는 성능 저하와 테스트 flaky를 만든다.",
    },
    {
      id: "q27",
      question: "정상 속도 시연 영상만으로 모션 QA를 끝내면 놓치는 것은?",
      choices: [
        "브랜드 컬러 일관성",
        "번들 크기 증가",
        "interrupt와 접근성 회귀",
        "SEO 메타데이터 누락",
      ],
      answerIndex: 2,
      explanation:
        "모션 QA는 normal, rapid toggle, reduced motion, slow device, mobile viewport, keyboard-only를 캡처해야 한다. 정상 속도 시연 영상만 있으면 interrupt와 접근성 회귀를 놓친다.",
    },
    {
      id: "q28",
      question: "transitionend를 항상 신뢰하면 안 되는 이유는?",
      choices: [
        "transitionend는 CSS animation에서만 발생하기 때문에",
        "transitionend는 reduced motion에서만 발생하기 때문에",
        "transitionend는 항상 두 번 중복 발생하기 때문에",
        "속성이 바뀌지 않거나 duration이 0이거나 element가 display none/unmount되면 발생하지 않을 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "transitionend는 속성이 바뀌지 않거나 duration이 0이거나 element가 display none/unmount되면 발생하지 않을 수 있다. cleanup은 timeout guard, animation handle, reduced motion branch와 함께 설계한다.",
    },
    {
      id: "q29",
      question: "핵심 상태 변경을 animation 완료에 의존시키면 안 되는 이유는?",
      choices: [
        "transitionend가 발생하지 않거나 reduced motion에서 생략되면 비즈니스 상태가 진행되지 않을 수 있다",
        "animation event는 서버 응답보다 항상 느리게 도착하기 때문에",
        "animation 완료 시점은 브라우저마다 무작위로 달라서",
        "비즈니스 로직은 GPU에서 실행되지 않기 때문에",
      ],
      answerIndex: 0,
      explanation:
        "핵심 상태 변경은 animation 완료에 의존하지 않아야 한다. transitionend가 발생하지 않거나 reduced motion에서 생략되면 비즈니스 상태가 진행되지 않을 수 있다. animation event는 시각적 cleanup 정도로 제한한다.",
    },
    {
      id: "q30",
      question: "transform이 stacking context에 미치는 영향으로 옳은 것은?",
      choices: [
        "transform은 z-index를 항상 무시하게 만든다",
        "transform·opacity(1 미만)·filter·perspective는 새 stacking context를 만들어 overlay 순서와 click target을 바꿀 수 있다",
        "transform은 stacking context와 무관하며 순서에 영향이 없다",
        "transform은 portal로 렌더된 요소에만 stacking context를 만든다",
      ],
      answerIndex: 1,
      explanation:
        "transform, opacity 1 미만, filter, perspective 등은 새 stacking context를 만들 수 있다. animation을 추가한 뒤 dropdown이 modal 뒤로 숨거나 보이지 않는 layer가 click을 가로챌 수 있다.",
    },
    {
      id: "q31",
      question: "responsive motion에서 desktop drawer motion을 mobile에 그대로 쓰면 생기는 문제는?",
      choices: [
        "duration이 자동으로 절반으로 줄어든다",
        "safe-area inset이 자동으로 적용된다",
        "이동 거리가 길고 가상 키보드와 겹칠 수 있다",
        "touch gesture가 자동으로 비활성화된다",
      ],
      answerIndex: 2,
      explanation:
        "화면 크기·입력 방식·성능 예산에 따라 거리·duration·gesture를 조정해야 한다. desktop drawer motion을 mobile에 그대로 쓰면 이동 거리가 길고 가상 키보드와 겹칠 수 있다.",
    },
    {
      id: "q32",
      question: "모션 시스템 리뷰에서 즉시 막아야 할 신호로 본문이 든 것은?",
      choices: [
        "ease-out 사용·transform 애니메이션·CSS 변수 사용·짧은 duration",
        "skeleton UI 사용·debounce 적용·URL state 저장·lazy loading",
        "spring token·staggered list·tooltip delay·focus-visible",
        "reduced motion 미지원·layout property animation 남발·무한 loop·focus trap 깨짐·성능 증거 없음",
      ],
      answerIndex: 3,
      explanation:
        "reduced motion 미지원, layout property animation 남발, 무한 loop, focus trap 깨짐, 성능 증거 없음은 막아야 한다. 이 신호들은 취향 문제가 아니라 접근성·성능·사용성 결함으로 이어진다.",
    },
    {
      id: "q33",
      question: "transform animation과 CLS의 관계로 옳은 것은?",
      choices: [
        "transform animation은 보통 layout shift로 계산되지 않지만 width·height·top 같은 layout 변화는 CLS에 영향을 줄 수 있다",
        "모든 animation은 CLS에 동일하게 포함된다",
        "transform animation이 CLS에 가장 큰 영향을 준다",
        "CLS는 loading 중에만 측정되므로 animation과 무관하다",
      ],
      answerIndex: 0,
      explanation:
        "transform animation은 보통 layout shift로 계산되지 않지만 width, height, top 같은 layout 변화는 CLS에 영향을 줄 수 있다. skeleton과 실제 콘텐츠 크기가 다르거나 late image fade-in이 공간을 바꾸면 CLS로 잡힌다.",
    },
    {
      id: "q34",
      question: "모션 경험이 적을 때 방어적으로 답하는 방식으로 본문이 권하는 것은?",
      choices: [
        "잘 아는 라이브러리 이름을 여러 개 나열해 신뢰를 확보한다",
        "직접 경험 범위를 밝히고 token·reduced motion·transform-only·performance trace·visual regression으로 검증하겠다고 답한다",
        "경험을 실제보다 크게 말해 판단 기준이 있음을 보인다",
        "감각적으로 좋아 보이는 easing을 자신 있게 단정한다",
      ],
      answerIndex: 1,
      explanation:
        "직접 경험 범위를 밝히고 token, reduced motion, transform-only, performance trace, visual regression으로 검증하겠다고 답한다. 라이브러리 이름만 말하면 실제 motion 품질을 판단하는 기준이 없다고 평가받는다.",
    },
    {
      id: "q35",
      question: "모션 회귀 테스트에서 animation 때문에 스냅샷이 흔들릴 때의 대응은?",
      choices: [
        "스냅샷 테스트를 비활성화하고 수동 확인으로 대체한다",
        "허용 오차를 크게 높여 차이를 무시한다",
        "테스트 모드에서 duration을 0으로 줄이거나 clock을 제어하고 안정된 final state를 캡처한다",
        "reduced motion branch까지 함께 고정해 모든 경로를 하나로 만든다",
      ],
      answerIndex: 2,
      explanation:
        "테스트 모드에서 duration을 0으로 줄이거나 clock을 제어하고 안정된 final state를 캡처한다. reduced motion branch까지 고정하면 실제 사용자 설정 경로가 빠지므로 별도 snapshot을 둔다.",
    },
  ],
};

export default quiz;
