// 프론트엔드 성능·진단 Q&A(engineering-frontend-performance-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-performance-quiz",
  title: "프론트엔드 성능·진단 퀴즈",
  sourceQaId: "engineering-frontend-performance-qa",
  questions: [
    {
      id: "q1",
      question: "프론트엔드 성능을 진단할 때 가장 먼저 봐야 하는 것은?",
      choices: [
        "LCP, INP, CLS, error rate, route별 RUM 같은 사용자 영향 지표",
        "Lighthouse 종합 점수 하나",
        "번들 파일별 minified 크기 순위",
        "서버 CPU와 메모리 사용률 그래프",
      ],
      answerIndex: 0,
      explanation:
        "사용자 영향 지표인 LCP, INP, CLS, error rate, route별 RUM을 먼저 보고 network, main thread, rendering, backend wait로 분해한다. Lighthouse 점수만 보면 실제 사용자 기기·네트워크·로그인 상태의 병목을 놓친다.",
    },
    {
      id: "q2",
      question: "lab 점수와 RUM이 다를 때 두 값의 역할을 옳게 설명한 것은?",
      choices: [
        "lab이 항상 실제 사용자 경험에 더 가깝다",
        "lab은 고정 기기·네트워크에서 회귀를 재현하고, RUM은 실제 브라우저·지역·로그인 상태의 p75를 보여준다",
        "RUM은 고정 환경 재현용이고 lab은 실제 사용자 분포용이다",
        "둘이 다르면 RUM은 버려야 하는 노이즈다",
      ],
      answerIndex: 1,
      explanation:
        "lab은 고정 기기와 네트워크에서 회귀를 재현하는 데 좋고, RUM은 실제 브라우저·지역·로그인 상태의 p75를 보여준다. 차이가 나면 route, device tier, connection, release version으로 RUM을 나누고 같은 조건을 lab에 재현한다.",
    },
    {
      id: "q3",
      question: "성능을 route별로 나눠 봐야 하는 이유로 옳은 것은?",
      choices: [
        "route마다 사용하는 브라우저 엔진이 달라서",
        "route가 많을수록 RUM 표본이 자동으로 늘어서",
        "전체 평균만 보면 내부 페이지의 좋은 수치가 핵심 route의 p75 LCP·INP 악화를 가릴 수 있어서",
        "Lighthouse는 route를 하나만 측정할 수 있어서",
      ],
      answerIndex: 2,
      explanation:
        "홈, 검색, checkout, dashboard는 LCP element, API chain, JS chunk, third-party 의존성이 다르다. 전체 평균만 보면 내부 페이지의 좋은 수치가 핵심 route의 p75 LCP나 INP 악화를 가릴 수 있다.",
    },
    {
      id: "q4",
      question: "LCP가 느릴 때 이미지 압축만으로 개선이 안 될 수 있는 이유는?",
      choices: [
        "이미지 압축은 LCP와 무관한 지표라서",
        "브라우저가 압축된 이미지를 항상 무시해서",
        "CLS가 높으면 LCP 이미지가 렌더되지 않아서",
        "서버 응답(TTFB) 지연이나 JS hydration 지연이 LCP를 늦추고 있을 수 있어서",
      ],
      answerIndex: 3,
      explanation:
        "LCP는 TTFB, render-blocking resource, LCP element load priority, image size/format, client rendering delay로 나눠 봐야 한다. 이미지만 압축하면 서버 응답 지연이나 JS hydration 지연 때문에 개선이 안 될 수 있다.",
    },
    {
      id: "q5",
      question: "preload를 써야 하는 경우로 가장 적절한 것은?",
      choices: [
        "초기 viewport의 LCP 이미지나 핵심 font처럼 늦게 발견되지만 반드시 필요한 resource",
        "below-the-fold의 모든 이미지",
        "가능한 한 많은 resource에 폭넓게",
        "third-party analytics script 전부",
      ],
      answerIndex: 0,
      explanation:
        "preload는 초기 viewport의 LCP 이미지나 핵심 font처럼 브라우저가 늦게 발견하지만 반드시 필요한 resource에만 쓴다. 너무 많이 걸면 bandwidth 경쟁으로 JS/CSS와 LCP 이미지 우선순위가 꼬인다.",
    },
    {
      id: "q6",
      question: "FID와 비교한 INP의 특징으로 옳은 것은?",
      choices: [
        "INP는 첫 입력의 delay만 측정한다",
        "INP는 페이지 생애 전체 interaction의 latency를 대표한다",
        "INP는 입력 지연을 무시하고 render 시간만 본다",
        "INP는 lab에서만 측정 가능하고 RUM에서는 못 본다",
      ],
      answerIndex: 1,
      explanation:
        "FID는 첫 입력의 delay만 봤지만 INP는 페이지 생애 전체 interaction의 latency를 대표한다. 최초 클릭이 빨라도 필터 변경, 검색 입력, 모달 열기에서 long task나 큰 commit이 있으면 INP가 나빠진다.",
    },
    {
      id: "q7",
      question: "INP가 나쁠 때 debounce만으로 부족한 경우의 올바른 대응은?",
      choices: [
        "모든 이벤트 핸들러를 debounce로 감싼다",
        "INP 측정을 끄고 FID로 대체한다",
        "expensive calculation을 worker로 옮기거나 render 범위를 줄이고 immediate feedback을 먼저 보여준다",
        "요청을 전부 async로 바꾸면 해결된다",
      ],
      answerIndex: 2,
      explanation:
        "클릭 후 화면 반응이 늦거나 render commit이 길면 debounce만으로는 부족하다. expensive calculation을 worker로 옮기거나 render 범위를 줄이고, immediate feedback을 먼저 보여 interaction delay와 presentation delay를 줄여야 한다.",
    },
    {
      id: "q8",
      question: "transform·opacity 기반 animation과 CLS의 관계로 옳은 것은?",
      choices: [
        "모든 CSS animation은 항상 CLS로 집계된다",
        "transform animation이 CLS를 가장 크게 만든다",
        "opacity 변화는 반드시 layout shift를 유발한다",
        "transform·opacity animation은 보통 layout shift로 잡히지 않지만 top·height·margin을 바꾸면 CLS가 생긴다",
      ],
      answerIndex: 3,
      explanation:
        "transform과 opacity 기반 animation은 보통 layout shift로 잡히지 않지만 top, height, margin처럼 layout을 바꾸는 animation은 CLS를 만들 수 있다. Performance 패널의 layout shift rectangle로 확인한다.",
    },
    {
      id: "q9",
      question: "skeleton이 오히려 CLS의 원인이 되는 경우는?",
      choices: [
        "skeleton 높이가 실제 카드·광고보다 작거나 hydration 후 DOM 구조가 바뀔 때",
        "skeleton이 최종 콘텐츠와 같은 aspect-ratio를 예약할 때",
        "skeleton을 회색 배경으로 표시할 때",
        "skeleton을 여러 개 동시에 보여줄 때",
      ],
      answerIndex: 0,
      explanation:
        "skeleton이 최종 콘텐츠와 같은 높이·aspect-ratio·spacing을 예약하면 CLS를 줄이지만, skeleton 높이가 실제 카드나 광고보다 작거나 hydration 후 DOM 구조가 바뀌면 skeleton 자체가 CLS 원인이 된다.",
    },
    {
      id: "q10",
      question: "번들 크기를 줄일 때 minify만으로 남는 문제는?",
      choices: [
        "gzip 전송량이 오히려 커진다",
        "큰 dependency, 중복 polyfill, 초기 route에 묶인 admin code가 그대로 남는다",
        "tree shaking이 자동으로 비활성화된다",
        "route-level code splitting이 무효화된다",
      ],
      answerIndex: 1,
      explanation:
        "번들 축소는 route-level code splitting, dependency audit, tree shaking, dynamic import, polyfill 점검, asset 압축을 순서대로 봐야 한다. 무작정 minify만 하면 큰 dependency, 중복 polyfill, 초기 route에 묶인 admin code가 남는다.",
    },
    {
      id: "q11",
      question: "dynamic import를 우선 적용하기 좋은 대상은?",
      choices: [
        "모든 컴포넌트를 최대한 잘게 쪼갠 단위",
        "초기 viewport의 LCP 이미지",
        "초기 route의 LCP·interaction에 필요 없는 admin panel, editor, chart, modal, locale data",
        "핵심 route의 공통 layout shell",
      ],
      answerIndex: 2,
      explanation:
        "dynamic import는 초기 route의 LCP와 interaction에 필요 없는 admin panel, editor, chart, modal, locale data, heavy validator에 우선 적용한다. 너무 잘게 쪼개 request overhead가 커지지 않게 chunk map과 waterfall을 같이 본다.",
    },
    {
      id: "q12",
      question: "번들 전송량(gzip/brotli)이 작아도 충분하지 않은 이유는?",
      choices: [
        "gzip은 이미지를 압축하지 못해서",
        "brotli는 모바일 브라우저에서 지원되지 않아서",
        "전송량이 작으면 tree shaking이 무효가 되어서",
        "parse·compile·execute 비용이 남고 모바일 CPU에서 JS 실행이 INP와 hydration을 늦춘다",
      ],
      answerIndex: 3,
      explanation:
        "gzip/brotli 전송량이 작아도 parse, compile, execute 비용은 남고 모바일 CPU에서는 JS 실행이 INP와 hydration readiness를 늦춘다. compressed size와 uncompressed JS, coverage, main-thread execution time을 같이 봐야 한다.",
    },
    {
      id: "q13",
      question: "React에서 useMemo/useCallback을 무작정 넣을 때의 문제는?",
      choices: [
        "비교 비용은 늘고 실제 rerender 원인은 그대로 남을 수 있다",
        "commit duration이 항상 0이 된다",
        "context 구독이 자동으로 분리된다",
        "props identity가 항상 고정된다",
      ],
      answerIndex: 0,
      explanation:
        "React 렌더링 병목은 Profiler로 commit duration, render count, 원인, context 구독 범위, memoization 효과를 봐야 한다. useMemo/useCallback을 무작정 넣으면 비용은 늘고 실제 rerender 원인은 그대로일 수 있다.",
    },
    {
      id: "q14",
      question: "하나의 큰 context value가 바뀔 때 생기는 현상과 대응으로 옳은 것은?",
      choices: [
        "context는 rerender를 유발하지 않으므로 대응이 필요 없다",
        "구독하는 넓은 subtree가 다시 렌더되므로 state를 분리하거나 provider를 나눠 commit 범위를 줄인다",
        "useMemo를 provider에 씌우면 subtree 렌더가 완전히 사라진다",
        "context 대신 전역 변수를 쓰면 문제가 없다",
      ],
      answerIndex: 1,
      explanation:
        "하나의 큰 context value가 바뀌면 그 값을 구독하는 넓은 subtree가 다시 렌더될 수 있다. state를 분리하거나 selector 기반 store를 쓰고, theme·auth·filter처럼 갱신 빈도가 다른 값은 provider를 나눠 commit 범위를 줄인다.",
    },
    {
      id: "q15",
      question: "list virtualization을 무조건 적용할 때 생기는 trade-off는?",
      choices: [
        "DOM node 수가 오히려 늘어난다",
        "frame budget 계산이 불가능해진다",
        "accessibility, find-in-page, dynamic height, scroll restoration이 어려워진다",
        "번들 크기가 항상 두 배가 된다",
      ],
      answerIndex: 2,
      explanation:
        "virtualization은 DOM node 수와 render cost가 frame budget을 넘을 때 쓴다. 무조건 넣으면 accessibility, find-in-page, dynamic height, scroll restoration이 어려워진다.",
    },
    {
      id: "q16",
      question: "초기 viewport의 hero/LCP 이미지에 lazy loading을 걸면 생기는 문제는?",
      choices: [
        "이미지가 아예 로드되지 않는다",
        "CLS가 자동으로 0이 된다",
        "srcset이 무효화된다",
        "브라우저가 요청을 늦게 시작해 LCP가 느려진다",
      ],
      answerIndex: 3,
      explanation:
        "초기 viewport의 hero나 LCP 이미지를 lazy로 두면 브라우저가 요청을 늦게 시작한다. fold 근처 이미지는 적절한 rootMargin이나 eager loading을 쓰고 below-the-fold만 lazy로 둬야 한다.",
    },
    {
      id: "q17",
      question: "여러 이미지에 fetchpriority high를 주면 생기는 문제는?",
      choices: [
        "CSS·font·JS와 경쟁해 전체 LCP가 오히려 느려질 수 있다",
        "브라우저가 모든 이미지를 병렬로 즉시 완료한다",
        "LCP element가 자동으로 바뀐다",
        "decode time이 항상 0이 된다",
      ],
      answerIndex: 0,
      explanation:
        "priority는 초기 viewport의 LCP 후보 이미지나 poster처럼 첫 화면을 만드는 resource에만 높인다. 여러 이미지에 fetchpriority high를 주면 CSS, font, JS와 경쟁해 전체 LCP가 느려질 수 있다.",
    },
    {
      id: "q18",
      question: "defer와 async 스크립트 로딩의 차이로 옳은 것은?",
      choices: [
        "defer는 순서가 없고 async가 순서를 보존한다",
        "defer는 실행 순서를 보존하며 DOMContentLoaded 전에 실행되고, async는 다운로드 완료 즉시 실행되어 순서가 보장되지 않는다",
        "둘 다 HTML parsing을 차단한다",
        "async는 항상 defer보다 먼저 실행된다",
      ],
      answerIndex: 1,
      explanation:
        "defer는 HTML parsing을 막지 않고 실행 순서를 보존하며 DOMContentLoaded 전에 실행된다. async는 다운로드 완료 즉시 실행되어 순서가 보장되지 않아 tag 의존성이 있거나 hydration 중 main thread를 빼앗으면 INP와 초기 렌더를 흔들 수 있다.",
    },
    {
      id: "q19",
      question: "TTFB가 크면 무조건 백엔드 문제라고 볼 수 없는 이유는?",
      choices: [
        "TTFB는 프론트엔드 렌더링만 측정하는 지표라서",
        "TTFB는 CDN cache와 무관해서",
        "DNS/TLS, edge miss, redirect, server queue, SSR data fetch, auth middleware가 모두 TTFB에 포함될 수 있어서",
        "TTFB는 항상 이미지 다운로드 시간을 뜻해서",
      ],
      answerIndex: 2,
      explanation:
        "TTFB에는 DNS/TLS, edge miss, redirect, server queue, SSR data fetch, auth middleware가 모두 포함될 수 있다. Server-Timing, CDN cache status, redirect chain을 같이 봐야 API 처리와 네트워크·edge 문제를 나눌 수 있다.",
    },
    {
      id: "q20",
      question: "잘못 설정된 Service Worker가 만드는 대표적 장애는?",
      choices: [
        "네트워크 요청이 전부 차단된다",
        "HTTPS 인증서가 무효화된다",
        "LCP element가 사라진다",
        "오래된 JS를 계속 제공해 배포 후에도 이전 bundle에 사용자가 갇힌다",
      ],
      answerIndex: 3,
      explanation:
        "Service Worker는 offline, precache, runtime cache 등에 쓰지만 versioning과 cache invalidation이 핵심이다. 잘못된 SW는 오래된 JS를 계속 제공해 배포 후 장애를 만들 수 있다.",
    },
    {
      id: "q21",
      question: "SSR이 LCP에 항상 좋지는 않은 이유로 옳은 것은?",
      choices: [
        "서버 TTFB가 크거나 hydration JS가 무거우면 LCP와 INP가 같이 나빠진다",
        "SSR은 HTML을 브라우저에 전달하지 못해서",
        "SSR은 CLS를 항상 증가시켜서",
        "SSR은 이미지 최적화를 비활성화해서",
      ],
      answerIndex: 0,
      explanation:
        "SSR은 초기 HTML 표시를 앞당길 수 있지만 서버 TTFB가 크거나 hydration JS가 무거우면 LCP와 INP가 같이 나빠진다. SSR, SSG, CSR을 같은 route에서 TTFB, LCP render delay, hydration cost로 비교해야 한다.",
    },
    {
      id: "q22",
      question: "hydration 비용이 큰 페이지에서 나타나는 증상은?",
      choices: [
        "이미지가 전혀 로드되지 않는다",
        "HTML은 빨리 보이는데 상호작용이 늦어 사용자가 페이지가 멈췄다고 느낀다",
        "초기 HTML 표시가 항상 늦어진다",
        "CLS가 반드시 0이 된다",
      ],
      answerIndex: 1,
      explanation:
        "hydration은 SSR HTML을 interactive하게 만들기 위해 JS를 download·parse·execute하는 비용이다. component tree가 크면 초기 LCP는 좋아도 INP readiness가 늦어 HTML은 빨리 보이는데 상호작용이 늦다고 느낀다.",
    },
    {
      id: "q23",
      question: "partial hydration(island)의 핵심 효과는?",
      choices: [
        "페이지 전체를 항상 한 번에 hydrate한다",
        "SSR HTML을 아예 생성하지 않는다",
        "상호작용이 필요한 island만 hydrate해 JS 실행과 event handler 수를 줄인다",
        "모든 컴포넌트를 client component로 강제한다",
      ],
      answerIndex: 2,
      explanation:
        "partial hydration은 페이지 전체를 한 번에 hydrate하지 않고 실제 상호작용이 필요한 island만 hydrate한다. static content와 interactive widget을 분리하면 JS 실행과 event handler 수가 줄어 LCP 이후 INP readiness가 좋아진다.",
    },
    {
      id: "q24",
      question: "CSS 성능에서 실무상 selector 비용보다 더 중요한 것은?",
      choices: [
        "selector의 문자열 길이",
        "CSS 파일의 알파벳 정렬 여부",
        "class 이름의 의미론적 명확성",
        "style recalculation, layout invalidation, CSS size, unused rules, critical CSS",
      ],
      answerIndex: 3,
      explanation:
        "현대 브라우저에서는 selector 자체보다 style recalculation, layout invalidation, CSS size, unused rules, critical CSS가 실무에서 더 중요하다. 거대한 CSS와 late loaded stylesheet는 render blocking과 style 계산 비용을 키운다.",
    },
    {
      id: "q25",
      question: "route를 반복 이동할 때 메모리가 계속 증가하는 흔한 원인은?",
      choices: [
        "unmount 후 남은 event listener, interval, subscription, pending promise, observer",
        "브라우저의 정상적인 gzip 캐시 동작",
        "CSS custom property 사용",
        "SSR HTML의 크기 증가",
      ],
      answerIndex: 0,
      explanation:
        "React에서 흔한 누수는 unmount 후 남은 event listener, interval, subscription, pending promise, observer, query cache다. route loop 테스트로 mount/unmount를 반복하고 heap snapshot에서 detached DOM과 retained tree를 비교한다.",
    },
    {
      id: "q26",
      question: "성능 budget을 앱 전체에 하나만 두면 생기는 문제는?",
      choices: [
        "RUM 표본이 절반으로 줄어든다",
        "checkout 같은 핵심 route와 내부 admin route의 우선순위가 섞인다",
        "Core Web Vitals 측정이 불가능해진다",
        "번들 분석 도구가 동작하지 않는다",
      ],
      answerIndex: 1,
      explanation:
        "성능 budget은 target device와 business route별로 LCP/INP/CLS, JS size, image size, request count, long task 기준을 잡아야 한다. 전체 앱에 하나의 budget만 두면 핵심 route와 내부 admin route의 우선순위가 섞인다.",
    },
    {
      id: "q27",
      question: "DevTools Performance 패널에서 Bottom-Up과 Call Tree의 쓰임 차이는?",
      choices: [
        "Bottom-Up은 호출 경로 중심, Call Tree는 합산 뷰다",
        "둘은 완전히 동일한 데이터를 정렬만 다르게 보여준다",
        "Call Tree는 호출 경로 중심, Bottom-Up은 비용 큰 함수·작업을 전체 녹화에서 합산해 보여준다",
        "Call Tree는 네트워크만, Bottom-Up은 렌더링만 본다",
      ],
      answerIndex: 2,
      explanation:
        "Call Tree는 호출 경로 중심으로 비용을 보여주고 Bottom-Up은 전체 녹화에서 비용이 큰 함수나 작업을 합산해 보여준다. 특정 handler 경로는 Call Tree, 반복적으로 비싼 utility나 layout 작업은 Bottom-Up이 유용하다.",
    },
    {
      id: "q28",
      question: "React Profiler와 브라우저 Performance 패널의 차이로 옳은 것은?",
      choices: [
        "Profiler가 network와 paint까지 모두 포함한다",
        "Performance는 React commit duration만 측정한다",
        "둘은 같은 데이터를 다른 색으로 보여준다",
        "Profiler는 React render/commit 원인을, Performance는 전체 browser main thread와 rendering pipeline을 보여준다",
      ],
      answerIndex: 3,
      explanation:
        "React Profiler는 React render/commit 원인을, Performance는 전체 browser main thread와 rendering pipeline을 보여준다. Profiler만 보면 layout, paint, network, third-party script를 놓칠 수 있다.",
    },
    {
      id: "q29",
      question: "Core Web Vitals 판단에 평균 대신 p75를 쓰는 이유는?",
      choices: [
        "평균은 빠른 기기와 느린 기기가 섞여 문제를 가리지만 p75는 상당수 사용자가 겪는 하위 품질을 대표해서",
        "p75가 계산이 더 빨라서",
        "평균은 RUM에서 측정할 수 없어서",
        "p75는 tail latency만 보여줘서",
      ],
      answerIndex: 0,
      explanation:
        "평균은 빠른 기기와 느린 기기가 섞여 문제를 가린다. p75는 상당수 사용자가 경험하는 하위 품질을 대표해 Core Web Vitals 판단에 쓰이며, p95/p98은 심각한 tail latency 분석에 함께 본다.",
    },
    {
      id: "q30",
      question: "immutable asset과 HTML의 cache 정책을 나눠야 하는 이유는?",
      choices: [
        "HTML은 cache가 원천적으로 불가능해서",
        "HTML을 길게 cache하면 새 배포가 안 보이고, hashed asset을 짧게 cache하면 네트워크 비용이 늘어서",
        "hashed asset은 항상 no-store여야 해서",
        "immutable asset은 CDN을 쓸 수 없어서",
      ],
      answerIndex: 1,
      explanation:
        "immutable asset은 긴 max-age와 content hash, HTML/API는 freshness와 revalidation 정책을 분리한다. HTML을 길게 cache하면 새 배포가 보이지 않고, hashed asset을 짧게 cache하면 네트워크 비용이 늘어난다.",
    },
    {
      id: "q31",
      question: "no-store와 no-cache의 차이로 옳은 것은?",
      choices: [
        "no-store는 재검증만 요구하고 no-cache는 저장을 막는다",
        "둘 다 저장을 완전히 금지한다",
        "no-store는 저장 자체를 막고, no-cache는 저장은 하되 사용 전 재검증을 요구한다",
        "no-cache는 CDN에서만, no-store는 브라우저에서만 동작한다",
      ],
      answerIndex: 2,
      explanation:
        "no-store는 저장 자체를 막고, no-cache는 저장은 가능하지만 사용 전 재검증을 요구한다. 개인정보나 결제 응답은 no-store가 맞고, HTML처럼 최신성이 필요하지만 revalidation으로 충분한 resource는 no-cache나 짧은 max-age를 쓸 수 있다.",
    },
    {
      id: "q32",
      question: "preload, prefetch, preconnect를 과하게 쓰면 생기는 문제는?",
      choices: [
        "브라우저가 resource hint를 전부 무시한다",
        "cache hit ratio가 항상 0이 된다",
        "CLS가 자동으로 증가한다",
        "bandwidth 경쟁과 우선순위 역전으로 오히려 LCP가 느려진다",
      ],
      answerIndex: 3,
      explanation:
        "critical resource는 preload, 다음 탐색 후보는 prefetch, 외부 origin 연결 비용은 preconnect로 줄인다. 과하게 쓰면 bandwidth 경쟁과 우선순위 역전으로 오히려 LCP가 느려진다.",
    },
    {
      id: "q33",
      question: "성능 개선 결과를 단일 Lighthouse 점수로만 보고하면 안 되는 이유는?",
      choices: [
        "변경 전후 조건, p75/p95, route, device, sample size, 부작용 없이는 실제 사용자 개선인지 판단하기 어려워서",
        "Lighthouse 점수는 항상 조작되어서",
        "Lighthouse는 RUM 데이터를 포함해서",
        "단일 점수는 CLS를 측정하지 못해서",
      ],
      answerIndex: 0,
      explanation:
        "성능 보고는 변경 전후 조건, p75/p95, route, device, sample size, 부작용, rollback 조건을 함께 써야 한다. 단일 Lighthouse 점수만 보고하면 실제 사용자 개선인지 판단하기 어렵다.",
    },
    {
      id: "q34",
      question: "성능 최적화가 기능 회귀를 만들지 않게 하려면 함께 검증할 것은?",
      choices: [
        "번들 파일 이름의 알파벳 순서",
        "변경 전후 사용자 여정, 접근성, analytics event, visual state",
        "서버 리전의 물리적 위치",
        "CSS selector의 특이도(specificity)만",
      ],
      answerIndex: 1,
      explanation:
        "성능 최적화 회귀를 막으려면 변경 전후 사용자 여정, 접근성, analytics event, visual state를 함께 검증한다. 렌더 횟수를 줄이려다 stale UI, 누락된 announcement, 잘못된 cache invalidation을 만들 수 있다.",
    },
  ],
};

export default quiz;
