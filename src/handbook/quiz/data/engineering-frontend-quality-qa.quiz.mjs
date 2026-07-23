// 프론트엔드 품질·릴리스 Q&A(engineering-frontend-quality-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-quality-quiz",
  title: "프론트엔드 품질·릴리스 퀴즈",
  sourceQaId: "engineering-frontend-quality-qa",
  questions: [
    {
      id: "q1",
      question: "프론트엔드 릴리스 품질 기준으로 가장 정확한 것은?",
      choices: [
        "기능 성공뿐 아니라 보안·접근성·성능·브라우저 호환성·observability·rollback 가능성을 통과해야 한다",
        "로컬에서 화면이 의도대로 보이면 릴리스 준비가 끝난 것이다",
        "unit test와 typecheck가 통과하면 품질 기준을 만족한 것이다",
        "디자인 시안과 픽셀이 일치하면 릴리스 품질이 확보된 것이다",
      ],
      answerIndex: 0,
      explanation:
        "릴리스 품질은 기능 성공뿐 아니라 보안·접근성·성능·브라우저 호환성·observability·rollback 가능성까지 통과해야 한다. 로컬 화면만 확인하면 CDN cache·env·sourcemap·권한·실제 사용자 성능 문제를 놓친다.",
    },
    {
      id: "q2",
      question: "작은 diff라도 강한 릴리스 게이트가 필요한 변경은?",
      choices: [
        "단순 문구 수정처럼 사용자 영향 경로가 없는 표시 변경",
        "인증·결제·권한·라우팅·캐시·분석 이벤트를 건드리는 변경",
        "주석과 코드 포매팅만 바꾸는 변경",
        "테스트 코드에만 국한된 리팩터링",
      ],
      answerIndex: 1,
      explanation:
        "변경 크기가 아니라 사용자 영향 경로와 복구 비용으로 등급을 나눈다. 문구 수정은 가벼운 smoke로 충분할 수 있지만 인증·결제·권한·라우팅·캐시·분석 이벤트를 건드리면 작은 diff라도 강한 게이트가 필요하다.",
    },
    {
      id: "q3",
      question: "React가 기본 escape를 해도 XSS 우회 경로가 생기는 곳은?",
      choices: [
        "JSX 텍스트 interpolation",
        "숫자·불리언 props 전달",
        "컴포넌트 state 업데이트",
        "dangerouslySetInnerHTML·markdown·SVG·URL·third-party widget",
      ],
      answerIndex: 3,
      explanation:
        "JSX 텍스트 interpolation은 escape되지만 dangerouslySetInnerHTML, ref로 DOM을 직접 쓰는 코드, URL href, SVG, third-party widget, 번역 문자열의 HTML 삽입은 별도 검증이 필요하다. source-to-sink 표로 어떤 값이 어느 sink에 닿는지 확인한다.",
    },
    {
      id: "q4",
      question: "CSP의 역할로 옳은 것은?",
      choices: [
        "inline·외부 script, frame, image, connect 대상 같은 실행·로드 경계를 제한해 XSS의 폭발 반경을 줄인다",
        "취약한 sink 자체를 자동으로 안전하게 고쳐 준다",
        "서버 인증·인가를 대체해 API 접근을 통제한다",
        "cross-origin 응답을 JS가 읽을 수 있는지를 결정한다",
      ],
      answerIndex: 0,
      explanation:
        "CSP는 inline script·외부 script·frame·image·connect 대상 같은 실행·로드 경계를 제한해 XSS의 폭발 반경을 줄인다. 다만 취약한 sink를 고치는 대체재는 아니며 report-only로 violation을 수집한 뒤 nonce/hash 정책으로 단계적으로 강화한다.",
    },
    {
      id: "q5",
      question: "CORS와 CSRF의 차이로 옳은 것은?",
      choices: [
        "CSRF는 응답을 읽는 정책이고 CORS는 쿠키 자동 전송을 막는 장치다",
        "둘 다 서버의 인증·인가를 대체하는 보안 경계다",
        "CORS는 cross-origin 응답을 JS가 읽을지 제한하고, CSRF는 응답을 못 읽어도 인증 쿠키가 자동 전송돼 상태 변경이 실행되는 문제다",
        "CORS를 닫으면 CSRF 토큰 검증 없이도 POST 부작용이 사라진다",
      ],
      answerIndex: 2,
      explanation:
        "CORS는 다른 origin의 응답을 브라우저 JS가 읽을 수 있는지를 제한한다. CSRF는 응답을 읽지 못해도 인증 쿠키가 자동 전송돼 상태 변경 요청이 실행되는 문제다. CORS를 닫아도 CSRF 토큰 검증이 없으면 POST 부작용은 남는다.",
    },
    {
      id: "q6",
      question: "access token을 memory에 저장할 때의 단점은?",
      choices: [
        "localStorage보다 저장 용량이 작아 큰 토큰을 담지 못한다",
        "새로고침·탭 복제·앱 재시작에서 access token이 사라진다",
        "XSS로 영구 탈취되는 위험이 오히려 커진다",
        "브라우저가 자동 전송하므로 CSRF 방어가 필요하다",
      ],
      answerIndex: 1,
      explanation:
        "memory 저장은 XSS로 영구 탈취되는 위험을 줄이지만 새로고침·탭 복제·앱 재시작에서 access token이 사라진다. 짧은 access token과 httpOnly refresh cookie, silent refresh 실패 시 명확한 re-auth UX를 조합하는 방식이 흔하다.",
    },
    {
      id: "q7",
      question: "프론트엔드 bundle에 secret을 넣으면 안 되는 이유는?",
      choices: [
        "번들 크기가 커져 초기 로딩 성능이 나빠지기 때문이다",
        "환경변수 이름에 SECRET이 없으면 자동으로 제거되기 때문이다",
        "브라우저 bundle은 사용자에게 전달되므로 API key나 secret은 노출된 값으로 봐야 하기 때문이다",
        "TypeScript 컴파일 과정에서 문자열이 손상되기 때문이다",
      ],
      answerIndex: 2,
      explanation:
        "브라우저 bundle은 사용자에게 전달되므로 API key나 secret은 노출된 값으로 봐야 한다. 이름에 SECRET이 들어가도 public prefix로 주입되면 공개 값이며, build output과 source map에서 실제 문자열 포함 여부를 스캔해야 한다.",
    },
    {
      id: "q8",
      question: "이미 배포된 bundle에서 secret이 노출된 것을 발견하면?",
      choices: [
        "회수됐다고 보고 즉시 revoke/rotate하고 악용 여부를 확인하며 sourcemap·CDN asset purge 범위를 정리한다",
        "다음 배포에서 조용히 값을 교체하면 노출 이력은 무효가 된다",
        "public prefix를 제거해 재빌드하면 이미 노출된 값도 안전해진다",
        "CDN cache TTL이 만료될 때까지 기다리면 자동으로 무효화된다",
      ],
      answerIndex: 0,
      explanation:
        "이미 배포된 값은 회수됐다고 봐야 한다. 즉시 revoke 또는 rotate하고 사용 로그에서 악용 여부를 확인하며 해당 값이 들어간 sourcemap과 CDN asset의 purge 범위를 정리한다. 이후 secret scanning과 PR gate로 재발을 막는다.",
    },
    {
      id: "q9",
      question: "CORS가 서버 보안을 대체하지 못하는 이유는?",
      choices: [
        "CORS는 preflight 요청만 검사하고 실제 요청은 통과시키기 때문이다",
        "CORS는 브라우저가 cross-origin 응답을 JS에 노출할지 결정할 뿐, 악성 서버나 curl은 CORS를 따르지 않기 때문이다",
        "CORS는 GET 요청에만 적용되고 POST는 검사하지 않기 때문이다",
        "CORS는 클라이언트에서 header를 추가하면 우회되기 때문이다",
      ],
      answerIndex: 1,
      explanation:
        "CORS는 브라우저가 cross-origin 응답을 JS에 노출할지 결정하는 정책이지 서버 자체를 보호하는 인증·인가가 아니다. 악성 서버나 curl은 CORS를 따르지 않으므로 API는 별도의 auth·rate limit·input validation을 가져야 한다.",
    },
    {
      id: "q10",
      question: "fetch에 credentials를 포함할 때 서버 CORS 설정으로 옳은 것은?",
      choices: [
        "Access-Control-Allow-Origin을 *로 두어야 모든 origin에서 쿠키가 전송된다",
        "credentials가 있으면 preflight 자체가 생략된다",
        "Access-Control-Allow-Credentials만 있으면 origin 반사는 필요 없다",
        "Access-Control-Allow-Origin에 *를 쓸 수 없고 허용 origin을 정확히 반사하거나 allowlist로 검증해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "cookie나 client certificate을 포함하려면 fetch credentials와 서버의 Access-Control-Allow-Credentials가 맞아야 한다. 이때 Access-Control-Allow-Origin은 *를 쓸 수 없고 허용 origin을 정확히 반사하거나 allowlist로 검증해야 한다.",
    },
    {
      id: "q11",
      question: "핵심 사용자 여정을 E2E로 올리고 단일 컴포넌트 조건 분기는 component test로 두는 이유는?",
      choices: [
        "E2E는 실제 라우팅·네트워크·브라우저 동작이 깨지는지 확인하는 반면 모든 케이스를 E2E로 넣으면 느리고 flaky해지기 때문",
        "component test는 브라우저에서 실행되지 않아 신뢰할 수 없기 때문",
        "E2E는 접근성을 검증할 수 없어 여정에만 써야 하기 때문",
        "component test가 E2E보다 실행이 느려 최소화해야 하기 때문",
      ],
      answerIndex: 0,
      explanation:
        "로그인·결제·저장·권한 변경처럼 여러 컴포넌트와 API가 이어지는 핵심 여정을 E2E로 올린다. 모든 케이스를 E2E로 넣으면 느리고 flaky해지므로 단일 컴포넌트 조건 분기는 component test로 두고 E2E는 실제 라우팅·네트워크·브라우저 동작이 깨지는지 확인한다.",
    },
    {
      id: "q12",
      question: "E2E flaky test를 줄이는 방법으로 옳은 것은?",
      choices: [
        "고정 sleep을 늘려 backend latency를 항상 기다리게 한다",
        "고정 sleep을 줄이고 locator·network wait·test id·deterministic fixture를 쓰며 독립 계정과 데이터 reset을 보장한다",
        "실패한 테스트는 retry 횟수를 무제한으로 늘려 통과시킨다",
        "여러 테스트가 같은 공유 계정을 쓰게 해 셋업 비용을 줄인다",
      ],
      answerIndex: 1,
      explanation:
        "고정 sleep을 줄이고 locator·network wait·test id·deterministic fixture를 사용한다. 테스트별 독립 계정과 데이터 reset을 보장하고, Playwright trace와 retry report로 race·animation·backend latency 원인을 분류해 제거한다.",
    },
    {
      id: "q13",
      question: "컴포넌트 테스트에서 role query(getByRole)가 좋은 이유는?",
      choices: [
        "DOM 구조 변경에 가장 민감하게 반응해 리팩터링을 즉시 감지하기 때문",
        "CSS 스타일 값까지 함께 검증할 수 있기 때문",
        "사용자가 보조기술로 인식하는 의미와 테스트가 같은 기준을 써 접근성 이름 누락과 잘못된 semantic element를 빨리 발견하기 때문",
        "snapshot보다 실행 속도가 빠르기 때문",
      ],
      answerIndex: 2,
      explanation:
        "role query는 사용자가 보조기술로 인식하는 의미와 테스트가 같은 기준을 쓰게 한다. getByRole로 버튼 이름·dialog 제목·form field label을 찾으면 접근성 이름 누락과 잘못된 semantic element를 빨리 발견할 수 있다.",
    },
    {
      id: "q14",
      question: "시각 회귀 테스트가 특히 필요한 곳은?",
      choices: [
        "순수 비즈니스 로직만 담긴 유틸 함수",
        "API 응답을 파싱하는 데이터 계층",
        "서버 인증·인가 경계",
        "디자인 시스템·핵심 화면·차트/그래픽·responsive layout처럼 시각 깨짐 비용이 큰 곳",
      ],
      answerIndex: 3,
      explanation:
        "시각 회귀 테스트는 디자인 시스템·핵심 화면·차트/그래픽·responsive layout처럼 시각 깨짐 비용이 큰 곳에 필요하다. 단위 테스트가 통과해도 spacing·overflow·z-index·반응형 깨짐은 놓칠 수 있다.",
    },
    {
      id: "q15",
      question: "접근성 자동 검사(axe 등)가 잘 잡는 것과 사람이 확인해야 하는 것의 구분으로 옳은 것은?",
      choices: [
        "color contrast·missing label·landmark는 잘 잡지만 focus 이동 의도·screen reader announcement의 자연스러움은 수동 확인이 필요하다",
        "focus 이동과 screen reader announcement까지 자동으로 완전히 검증된다",
        "자동 검사 통과를 접근성 완료로 봐도 무방하다",
        "color contrast는 사람만 판단할 수 있고 나머지는 모두 자동화된다",
      ],
      answerIndex: 0,
      explanation:
        "color contrast·missing label·landmark 같은 규칙은 자동 검사가 잘 잡지만 업무 문맥에 맞는 오류 문구·focus 이동 의도·screen reader announcement의 자연스러움은 수동 확인이 필요하다. 자동 검사 통과를 접근성 완료로 보면 focus order와 실제 announcement 문제를 놓친다.",
    },
    {
      id: "q16",
      question: "error tracking에서 sourcemap의 release id가 필요한 이유는?",
      choices: [
        "sourcemap 파일 크기를 줄이기 위해서다",
        "브라우저가 실행한 bundle version과 sourcemap artifact를 정확히 연결하기 위해서다",
        "공개 CDN에 sourcemap을 노출하기 위해서다",
        "minified 코드를 브라우저에서 다시 컴파일하기 위해서다",
      ],
      answerIndex: 1,
      explanation:
        "release id는 브라우저가 실행한 bundle version과 sourcemap artifact를 정확히 연결하기 위해 필요하다. CDN 캐시나 canary가 섞이면 같은 오류도 version별 원인이 다를 수 있으므로 release id·build id·commit sha를 error event에 포함한다.",
    },
    {
      id: "q17",
      question: "CDN cache 정책으로 옳은 것은?",
      choices: [
        "HTML에도 긴 max-age와 immutable을 주어야 blank screen을 막는다",
        "content hash 없는 vendor.js에 immutable을 주면 rollback이 더 안전해진다",
        "HTML은 짧은 TTL이나 revalidation을 두고, content hash가 붙은 asset에만 긴 max-age와 immutable을 준다",
        "모든 asset에 같은 짧은 TTL을 주는 것이 가장 안전하다",
      ],
      answerIndex: 2,
      explanation:
        "HTML은 최신 asset manifest를 가리켜야 하므로 짧은 TTL이나 revalidation을 둔다. content hash가 붙은 JS/CSS/image는 긴 max-age와 immutable을 줄 수 있지만, hash 없는 vendor.js에 immutable을 주면 rollback과 partial deployment에서 stale 코드가 남는다.",
    },
    {
      id: "q18",
      question: "대부분의 프론트 env가 build-time인 이유와 그 함의는?",
      choices: [
        "build 시 bundle에 문자열로 치환되므로 배포 후 서버 env만 바꿔도 이미 생성된 JS에는 반영되지 않는다",
        "runtime에 매 요청마다 서버에서 새로 읽어오므로 즉시 반영된다",
        "브라우저가 실행 시점에 OS 환경변수를 직접 읽기 때문이다",
        "env는 항상 secret이므로 build 시에만 접근이 허용되기 때문이다",
      ],
      answerIndex: 0,
      explanation:
        "대부분의 프론트 env는 build 시 bundle에 문자열로 치환된다. 배포 후 서버 env만 바꿔도 이미 생성된 JS에는 반영되지 않으므로 API base URL·feature flag default·public key 변경은 rebuild나 runtime config endpoint 전략을 명확히 해야 한다.",
    },
    {
      id: "q19",
      question: "blank screen을 안정적으로 감지하는 방법은?",
      choices: [
        "window error 이벤트만 수집하면 충분하다",
        "HTTP 200 응답이 왔는지만 확인하면 된다",
        "서버 uptime 지표가 정상인지만 보면 된다",
        "root element가 일정 시간 비어 있는지, critical route marker가 렌더됐는지, chunk load failure·hydration error가 있었는지 client heartbeat로 보낸다",
      ],
      answerIndex: 3,
      explanation:
        "window error만으로는 부족하다. root element가 일정 시간 비어 있는지, critical route marker가 렌더됐는지, chunk load failure와 hydration error가 있었는지 client heartbeat로 보내고 synthetic smoke로 대표 route를 주기적으로 확인한다.",
    },
    {
      id: "q20",
      question: "forward fix와 rollback 중 rollback(또는 flag off)을 먼저 선택해야 하는 경우는?",
      choices: [
        "원인이 명확하고 수정·검증·배포가 rollback보다 빠를 때",
        "인증·결제·blank screen·보안 노출처럼 영향이 큰 문제일 때",
        "사소한 문구 오타가 발견됐을 때",
        "특정 브라우저에서만 애니메이션이 약간 느릴 때",
      ],
      answerIndex: 1,
      explanation:
        "원인이 명확하고 수정·검증·배포가 rollback보다 빠르면 forward fix를 택할 수 있다. 하지만 인증·결제·blank screen·보안 노출처럼 영향이 큰 문제는 원인 분석을 기다리지 않고 rollback이나 flag off로 사용자 영향을 먼저 줄인다.",
    },
    {
      id: "q21",
      question: "feature flag의 default 값 설계로 옳은 것은?",
      choices: [
        "모든 기능은 서비스 장애 시 fail open으로 동작해야 사용자 경험이 유지된다",
        "default 값은 코드에만 있으면 되고 문서·테스트 fixture와 달라도 무방하다",
        "보안·결제·권한 기능은 fail closed가 맞을 수 있고 읽기 전용 UI는 fail open이 나을 수 있으며 default는 코드·문서·테스트 fixture가 일치해야 한다",
        "flag service 장애 시 항상 예외를 던져 요청을 중단시켜야 한다",
      ],
      answerIndex: 2,
      explanation:
        "네트워크 실패나 flag service 장애 때 어떤 값으로 동작할지 정해야 한다. 보안·결제·권한 기능은 fail closed가, 읽기 전용 UI는 fail open이 더 나을 수 있으며 default는 코드·문서·테스트 fixture가 일치해야 한다.",
    },
    {
      id: "q22",
      question: "Safari/iOS에서 프론트엔드 이슈가 자주 생기는 이유는?",
      choices: [
        "iOS의 모든 브라우저가 Chromium 기반이라 Chrome과 동일하게 동작하기 때문",
        "Safari가 표준을 가장 앞서 구현해 다른 브라우저와 어긋나기 때문",
        "iOS에서는 JavaScript가 비활성화되어 있기 때문",
        "WebKit의 API 지원 시점·form control 동작·viewport unit·video/autoplay·storage 제한·CSS 기능 차이가 Chrome과 다르기 때문",
      ],
      answerIndex: 3,
      explanation:
        "WebKit의 API 지원 시점·form control 동작·viewport unit·video/autoplay·storage 제한·CSS 기능 차이가 Chrome과 다르다. iOS의 모든 브라우저가 WebKit 기반인 점도 고려해 실제 iPhone이나 WebKit runner로 핵심 여정을 확인한다.",
    },
    {
      id: "q23",
      question: "postMessage를 안전하게 쓰는 방법은?",
      choices: [
        "targetOrigin을 구체적으로 지정하고 수신 시 origin·source·schema를 검증한다",
        "targetOrigin에 *를 써서 어떤 frame이든 받을 수 있게 한다",
        "event.origin만 확인하면 event.source는 볼 필요가 없다",
        "schema 검증 없이 message data를 바로 routing과 token 전달에 쓴다",
      ],
      answerIndex: 0,
      explanation:
        "targetOrigin을 구체적으로 지정하고 수신 시 origin·source·schema를 검증한다. event.origin만 보지 말고 event.source가 기대한 iframe.contentWindow인지 확인하며, schema version과 parser로 type·enum을 검증하고 악성 origin·malformed payload fixture를 테스트에 포함한다.",
    },
    {
      id: "q24",
      question: "dependency의 supply chain 위험으로 점검해야 하는 것은?",
      choices: [
        "번들 gzip 압축률과 tree-shaking 효율만 보면 된다",
        "maintainer 변경·install script·typosquatting·과도한 transitive dependency·prebuilt binary·publish 권한 탈취를 본다",
        "패키지의 GitHub star 수와 다운로드 순위만 확인한다",
        "lockfile은 재현성만 보장하므로 리뷰 대상이 아니다",
      ],
      answerIndex: 1,
      explanation:
        "supply chain 위험으로는 maintainer 변경·install script·typosquatting·과도한 transitive dependency·prebuilt binary·publish 권한 탈취를 본다. package provenance·npm token 정책·lockfile diff·SRI 또는 registry policy로 위험을 줄인다.",
    },
    {
      id: "q25",
      question: "canary release와 feature flag의 차이로 옳은 것은?",
      choices: [
        "canary는 코드 안의 기능 경로를 켜고 끄는 제어 장치이고 flag는 배포 전략이다",
        "둘은 완전히 같은 개념이라 함께 쓸 수 없다",
        "canary는 새 artifact나 release version을 일부 사용자에게 노출하는 배포 전략이고, feature flag는 코드 안의 기능 경로를 켜고 끄는 제어 장치다",
        "canary는 100% 사용자에게 한 번에 배포하는 방식이다",
      ],
      answerIndex: 2,
      explanation:
        "canary는 새 artifact나 release version을 일부 사용자에게 노출하는 배포 전략이고, feature flag는 코드 안의 기능 경로를 켜고 끄는 제어 장치다. 둘을 함께 쓰면 새 bundle의 안정성과 특정 기능의 안정성을 분리해서 볼 수 있다.",
    },
    {
      id: "q26",
      question: "clickjacking 방어에서 frame-ancestors와 X-Frame-Options의 관계로 옳은 것은?",
      choices: [
        "X-Frame-Options가 더 세밀해 CSP frame-ancestors를 대체할 수 있다",
        "둘은 서로 무관한 정책이라 clickjacking과는 관계가 없다",
        "embed가 필요한 파트너 origin이 있어도 항상 DENY로 막는 것이 맞다",
        "둘 다 clickjacking 방어와 관련 있지만 CSP frame-ancestors가 더 세밀하고 현대적이며, embed 파트너가 있으면 allowlist를, 없으면 none 또는 sameorigin으로 막는다",
      ],
      answerIndex: 3,
      explanation:
        "frame-ancestors와 X-Frame-Options는 둘 다 clickjacking 방어와 관련 있지만 CSP frame-ancestors가 더 세밀하고 현대적이다. embed가 필요한 파트너 origin이 있으면 allowlist를 명확히 하고, 그렇지 않으면 none 또는 sameorigin으로 막는다.",
    },
    {
      id: "q27",
      question: "릴리스 노트의 known issue는 어떻게 다뤄야 하나요?",
      choices: [
        "사소한 결함은 사용자 신뢰를 위해 릴리스 노트에서 숨기는 것이 낫다",
        "영향 범위만 적으면 되고 회피 방법이나 수정 예정은 생략해도 된다",
        "known issue는 다음 배포에서 자동 해결되므로 별도 기록이 필요 없다",
        "결함을 숨기지 말고 영향 범위·회피 방법·수정 예정·rollback 기준을 적으며, segment가 명확하면 모니터링 조건과 고객지원 대응을 같이 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "known issue는 사소한 결함을 숨기지 말고 영향 범위·회피 방법·수정 예정·rollback 기준을 적는다. Safari에서 chart tooltip이 느린 문제처럼 segment가 명확하면 모니터링 조건과 고객지원 대응을 같이 남긴다.",
    },
    {
      id: "q28",
      question: "프론트엔드 장애 postmortem에서 원인을 다룰 때 옳은 것은?",
      choices: [
        "직접 원인 하나만 명확히 쓰면 재발 방지에 충분하다",
        "서버 uptime이 정상이면 프론트 blank screen은 사용자 실패로 계산하지 않는다",
        "직접 원인만 쓰면 재발 방지가 약하므로, stale CDN asset이 직접 원인이어도 cache header 검증 부재·canary 부족·alert 지연·rollback artifact 미보존 같은 contributing factor를 함께 다룬다",
        "action item은 소유자 없이 목록만 있으면 충분하다",
      ],
      answerIndex: 2,
      explanation:
        "직접 원인만 쓰면 재발 방지가 약하다. stale CDN asset이 직접 원인이어도 cache header 검증 부재·canary 부족·alert 지연·rollback artifact 미보존 같은 contributing factor를 함께 다루고, action item은 소유자·기한·검증 방법을 갖춰야 한다.",
    },
    {
      id: "q29",
      question: "API mock에서 에러 케이스를 어떻게 다뤄야 하나요?",
      choices: [
        "성공 path만 mock하면 릴리스 검증이 빨라지고 충분하다",
        "429 rate limit과 timeout은 프론트 책임이 아니므로 제외한다",
        "malformed response는 서버가 보장하므로 mock에 넣을 필요가 없다",
        "400·401·403·409·429·500·timeout·malformed response를 포함한다; 성공 path만 mock하면 retry·rollback·toast·form error·monitoring event가 릴리스 전 검증되지 않는다",
      ],
      answerIndex: 3,
      explanation:
        "mock 에러 케이스에는 400 field error·401 refresh 실패·403 권한 제거·409 conflict·429 rate limit·500·timeout·malformed response를 포함한다. 성공 path만 mock하면 retry·rollback·toast·form error·monitoring event가 릴리스 전 검증되지 않는다.",
    },
    {
      id: "q30",
      question: "컴포넌트·브라우저 테스트에서 MSW 같은 mock server를 쓰는 이유는?",
      choices: [
        "네트워크 계층을 우회하고 컴포넌트 내부 함수 호출을 직접 검증하기 위해서다",
        "실제 fetch 흐름은 유지하면서 API 응답만 제어하고 loading·401·403·500·timeout·partial data를 fixture로 고정하며 handler를 schema로 검증하기 위해서다",
        "real API로만 테스트해야 하는 릴리스 게이트를 대체하기 위해서다",
        "mock은 완벽할수록 좋으므로 latency와 error를 숨기기 위해서다",
      ],
      answerIndex: 1,
      explanation:
        "MSW 같은 mock server는 컴포넌트·브라우저 테스트에서 실제 fetch 흐름을 유지하면서 API 응답만 제어하고 싶을 때 유용하다. loading·401·403·500·timeout·partial data를 fixture로 고정하고, handler가 실제 contract와 어긋나지 않게 schema 검증을 붙인다.",
    },
    {
      id: "q31",
      question: "httpOnly Secure cookie에 token을 저장할 때의 특성은?",
      choices: [
        "JS에서 읽을 수 없어 탈취에는 강하지만 브라우저가 자동 전송하므로 CSRF 방어가 필요하고 SameSite·Secure·domain/path·CORS credentials·logout revocation을 함께 설계해야 한다",
        "JS에서 자유롭게 읽을 수 있어 silent refresh 구현이 쉽다",
        "브라우저가 자동 전송하지 않으므로 CSRF 방어가 필요 없다",
        "XSS 탈취 위험이 localStorage보다 오히려 크다",
      ],
      answerIndex: 0,
      explanation:
        "httpOnly cookie는 JS에서 읽을 수 없어 탈취면에서는 강하지만 브라우저가 자동 전송하므로 CSRF 방어가 필요하다. SameSite·Secure·domain/path 범위·CORS credentials·logout revocation·multi-subdomain 요구를 함께 설계해야 한다.",
    },
    {
      id: "q32",
      question: "feature flag에서 실험(experiment)과 rollout의 차이로 옳은 것은?",
      choices: [
        "실험과 rollout은 같은 목적이라 같은 지표만 보면 된다",
        "실험은 variant별 효과 측정을 위해 assignment·exposure·guardrail metric·SRM 확인이 중요하고, rollout은 위험 감소용 점진 노출이라 kill switch·error threshold·canary segment·cleanup ticket이 핵심이다",
        "rollout은 효과 측정이 목적이라 SRM 확인이 가장 중요하다",
        "실험은 kill switch와 cleanup ticket이, rollout은 SRM 확인이 핵심이다",
      ],
      answerIndex: 1,
      explanation:
        "실험은 variant별 효과 측정을 위해 assignment·exposure·guardrail metric·SRM 확인이 중요하다. rollout은 위험을 줄이기 위한 점진 노출이 목적이라 kill switch·error threshold·canary segment·cleanup ticket이 핵심이다.",
    },
    {
      id: "q33",
      question: "품질 게이트에서 핫픽스는 어떻게 다뤄야 하나요?",
      choices: [
        "긴급 상황이므로 게이트를 모두 생략하고 바로 배포한다",
        "정규 릴리스와 동일한 전체 무거운 절차를 그대로 요구한다",
        "빠진 테스트는 배포 후 무기한 미룬다",
        "절차를 없애는 게 아니라 최소 생존 게이트를 두어 영향 route smoke·typecheck·targeted E2E·rollback 확인·owner 승인·배포 후 짧은 health watch를 수행하고 빠진 테스트는 후속 ticket으로 닫는다",
      ],
      answerIndex: 3,
      explanation:
        "핫픽스는 절차를 없애는 것이 아니라 최소 생존 게이트를 둔다. 영향 route smoke·typecheck·targeted E2E·rollback 확인·owner 승인·배포 후 짧은 health watch를 수행하고, 빠진 테스트는 후속 ticket으로 닫는다.",
    },
  ],
};

export default quiz;
