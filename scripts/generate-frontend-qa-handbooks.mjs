import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, "public", "handbook");

const css = `:root{--paper:#F6F7FA;--panel:#FFFFFF;--ink:#161D2B;--ink-soft:#465063;--line:#D8DCE6;--green:#22418A;--green-deep:#15294F;--green-tint:#E8EDF7;--amber:#A8650D;--amber-tint:#FBF2E3;--red:#9A3324;--red-tint:#F9ECE9;--mono:'IBM Plex Mono',ui-monospace,monospace;--sans:'Pretendard Variable',Pretendard,-apple-system,sans-serif}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.75;font-size:16px}.shell{display:grid;grid-template-columns:264px 1fr;max-width:1280px;margin:0 auto}nav{position:sticky;top:0;height:100vh;overflow-y:auto;border-right:1px solid var(--line);padding:32px 20px 48px;background:var(--paper)}main{min-width:0;padding:0 56px 120px;background:var(--paper)}@media(max-width:900px){.shell{grid-template-columns:1fr}nav{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}main{padding:0 20px 80px}}.nav-brand{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--green);font-weight:600;margin-bottom:4px}.nav-title{font-size:15px;font-weight:700;margin-bottom:24px;letter-spacing:0}nav a{display:flex;gap:10px;align-items:baseline;text-decoration:none;color:var(--ink-soft);padding:7px 8px;border-radius:0;font-size:13.5px;line-height:1.4}nav a:hover{background:var(--green-tint);color:var(--green-deep)}nav a .code{font-family:var(--mono);font-size:10.5px;color:var(--green);flex-shrink:0;letter-spacing:.04em}header.hero{padding:72px 0 48px;border-bottom:1px solid var(--ink)}.hero-serial{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:var(--green);display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px}.hero-serial span{border:1px solid var(--line);padding:3px 10px;border-radius:0;background:var(--panel)}h1{font-size:clamp(30px,4.5vw,46px);font-weight:800;letter-spacing:0;line-height:1.18}.hero-sub{margin-top:18px;font-size:17px;color:var(--ink-soft);max-width:720px}.hero-meta{margin-top:28px;font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);letter-spacing:.05em}section{padding-top:72px}.ch-head{display:flex;align-items:baseline;gap:14px;border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:28px}.ch-code{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--green);letter-spacing:.1em;flex-shrink:0}h2{font-size:26px;font-weight:800;letter-spacing:0}p{margin-bottom:14px}p.lede{font-size:17px;color:var(--ink-soft)}code{font-family:var(--mono);font-size:.86em;background:var(--green-tint);color:var(--green-deep);padding:1px 6px;border-radius:0}.callout{border:1px solid var(--line);border-left:3px solid var(--green);background:var(--panel);padding:18px 22px;border-radius:0;margin:22px 0}.callout.gm{border-left-color:var(--ink);background:#ECEEF3}.co-label{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;font-weight:600;color:var(--green);display:block;margin-bottom:6px}table{width:100%;border-collapse:collapse;margin:22px 0;font-size:14px;background:var(--panel);border:1px solid var(--line)}th{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-align:left;font-weight:600;color:var(--green-deep);background:var(--green-tint);padding:10px 14px;border-bottom:1px solid var(--line)}td{padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.6}.semantic-card{background:var(--green-tint);border:1px solid var(--line);border-radius:0;padding:22px 26px;margin:24px 0;font-size:14px;line-height:1.9}.semantic-card .sc-label{font-family:var(--mono);color:var(--green-deep);font-size:10.5px;letter-spacing:.14em;display:block;margin-bottom:8px}.snippet-card{font-family:var(--mono);background:var(--ink);color:#E7EAF1;border-radius:0;padding:22px 26px;margin:24px 0;font-size:13.5px;line-height:1.9;overflow-x:auto;white-space:pre-wrap}footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.05em;line-height:2}`;

const f = (a, b, c) => [a, b, c];
const item = (q, decision, failure, evidence, followups) => ({ q, decision, failure, evidence, followups });

const pages = [
  {
    id: "engineering-frontend-core-qa",
    title: "프론트엔드 핵심 Q&A",
    source: "프론트엔드 핵심",
    subtitle: "브라우저 런타임, UI 계약, 접근성, 상태, 네트워크 경계를 구술로 방어하는 훈련 페이지입니다.",
    questions: [
      item("프론트엔드의 책임을 어떻게 정의하나요?", "프론트엔드는 화면을 그리는 계층이 아니라 사용자 의도를 안전한 상태 전이와 서버 계약으로 연결하는 runtime boundary입니다. DOM 구조, 입력, 네트워크, 접근성, 성능, 오류 복구를 하나의 제품 계약으로 다룹니다.", "컴포넌트 구현만 말하면 loading, empty, error, permission denied, offline, stale data가 빠져 실제 사용자 흐름에서 깨집니다.", "screen state matrix, API contract, accessibility tree, RUM metric", f("UI와 API 계약 중 무엇을 먼저 고정하나요?", "상태가 많아지면 어디에 모델링하나요?", "화면 구현 완료를 어떤 증거로 판단하나요?")),
      item("브라우저 렌더링 파이프라인을 어떻게 설명하나요?", "HTML 파싱, CSSOM, style 계산, layout, paint, composite 흐름으로 설명하고, 변경이 어느 단계까지 invalidation시키는지 기준으로 최적화합니다.", "layout을 반복 유발하거나 transform으로 해결할 수 있는 변화를 width/top 변경으로 처리하면 long task와 jank가 생깁니다.", "Performance trace, Layout/Paint event, layer border, frame chart", f("layout thrashing은 왜 발생하나요?", "transform이 항상 좋은가요?", "paint와 composite를 어떻게 구분하나요?")),
      item("접근성을 기능 완료 기준에 어떻게 넣나요?", "semantic HTML, landmark, heading order, accessible name, keyboard path, focus management, screen reader announcement를 acceptance criteria로 둡니다.", "마우스로만 확인하면 keyboard trap, focus loss, 잘못된 aria, live region 누락이 출시 후 발견됩니다.", "axe result, keyboard-only recording, screen reader smoke test, DOM snapshot", f("button 대신 div를 쓰면 무엇이 빠지나요?", "aria-label은 언제 위험한가요?", "모달 닫힌 뒤 focus는 어디로 가야 하나요?")),
      item("상태 관리는 어떻게 선택하나요?", "상태의 소유자, 수명, 공유 범위, 서버 동기화 여부로 local state, URL state, external store, server cache를 나눕니다.", "모든 상태를 전역 store에 넣으면 stale data, 불필요한 rerender, 테스트 어려움, undo/redo 혼선이 커집니다.", "state ownership map, render count, URL restore test, cache invalidation log", f("서버 상태와 클라이언트 상태는 왜 다르나요?", "URL에 어떤 상태를 넣어야 하나요?", "전역 상태가 필요한 신호는 무엇인가요?")),
      item("loading, empty, error 상태는 왜 별도로 설계하나요?", "각 상태는 사용자의 다음 행동과 복구 경로가 다릅니다. skeleton, empty action, retry, permission 안내, partial data를 명확히 나눠야 합니다.", "성공 화면만 만들면 네트워크 실패와 권한 실패가 모두 빈 화면으로 보이고 support cost가 늘어납니다.", "state story, error fixture, retry log, visual regression capture", f("empty와 error를 어떻게 구분하나요?", "부분 성공은 어떻게 보여주나요?", "재시도 버튼은 언제 숨기나요?")),
      item("Form 설계에서 가장 먼저 보는 것은 무엇인가요?", "입력 normalize, validation timing, error placement, submit idempotency, dirty state, browser autofill, IME 조합을 먼저 봅니다.", "onChange 검증만으로 처리하면 IME, paste, autofill, async validation, double submit에서 깨집니다.", "form state diagram, validation fixture, double submit test, IME test", f("client validation과 server validation은 왜 둘 다 필요한가요?", "submit 중 버튼을 disable하면 충분한가요?", "필드 오류와 전역 오류는 어떻게 나누나요?")),
      item("컴포넌트 분리는 어떤 기준으로 하나요?", "파일 크기가 아니라 책임, state ownership, side effect, 재사용 압력, 테스트 경계를 기준으로 분리합니다.", "presentational/container 구분을 기계적으로 적용하면 prop drilling이나 숨은 side effect가 생기고, 반대로 거대한 컴포넌트는 변경 blast radius가 커집니다.", "component responsibility table, story coverage, unit test boundary, dependency graph", f("재사용 컴포넌트는 언제 만들면 안 되나요?", "hook으로 빼면 항상 좋아지나요?", "컴포넌트 API는 어떻게 안정화하나요?")),
      item("라우팅 상태와 화면 상태는 어떻게 나누나요?", "공유 가능한 탐색 상태는 URL에 두고, 일시적 입력·hover·open 상태는 컴포넌트에 둡니다. 검색, 필터, 페이지, 탭은 복원 가능성이 중요합니다.", "필터를 local state에만 두면 새로고침/공유/뒤로가기에서 사용자가 같은 화면으로 돌아오지 못합니다.", "URL contract, back-forward test, deep link smoke test, analytics page_view", f("modal state를 URL에 넣어야 할 때는?", "query param 변경이 너무 잦으면?", "뒤로가기 동작은 어떻게 검증하나요?")),
      item("디자인 시스템 컴포넌트를 사용할 때 무엇을 검토하나요?", "variant, size, disabled/loading/error state, keyboard interaction, token 사용, escape hatch, breaking change 정책을 봅니다.", "디자인 시스템을 우회한 ad hoc 스타일이 늘면 브랜드 일관성뿐 아니라 접근성, dark mode, density 대응이 무너집니다.", "component contract, token diff, Storybook states, visual regression", f("variant가 너무 많아지면 어떻게 줄이나요?", "제품별 예외는 어디에 두나요?", "토큰 변경의 영향은 어떻게 확인하나요?")),
      item("데이터 fetching 위치를 어떻게 정하나요?", "페이지 진입에 필요한 데이터는 route/page boundary에서, 사용자 조작 후 필요한 데이터는 interaction boundary에서 가져옵니다. prefetch와 cache key는 사용자 intent와 stale 허용치로 정합니다.", "하위 컴포넌트마다 fetch하면 waterfall, 중복 요청, loading 상태 분산, error 처리 누락이 생깁니다.", "network waterfall, cache key list, request dedupe metric, suspense boundary", f("prefetch는 언제 낭비가 되나요?", "staleTime은 어떻게 정하나요?", "waterfall은 어디서 확인하나요?")),
      item("프론트엔드에서 time과 timezone은 어떻게 다루나요?", "저장은 UTC, 표시는 사용자 locale/timezone, 입력은 의도한 business timezone을 명시합니다. 상대 시간과 마감 시간은 서버 기준 clock과 drift를 고려합니다.", "브라우저 locale만 믿으면 DST, 해외 사용자, 서버 집계 기준이 엇갈려 날짜가 하루 밀리는 문제가 생깁니다.", "timezone fixture, DST test, server timestamp contract, locale snapshot", f("date-only 값은 UTC로 저장하면 안전한가요?", "서버 시간이 필요한 이유는?", "상대 시간 표시는 어떻게 테스트하나요?")),
      item("권한에 따라 UI를 숨기면 보안이 되나요?", "UI hide는 UX 편의일 뿐 보안 경계는 서버 인가입니다. 프론트엔드는 권한별 affordance와 오류 복구를 제공하고 서버 401/403을 정확히 처리해야 합니다.", "버튼을 숨겼다고 API 호출이 막히지 않으며, 캐시된 데이터나 URL 직접 접근에서 권한 누락이 드러납니다.", "permission matrix, 401/403 fixture, route guard test, server audit log", f("403과 404를 UI에서 어떻게 다루나요?", "권한 변경 후 캐시는 어떻게 무효화하나요?", "관리자 화면의 route guard는 충분한가요?")),
      item("i18n을 나중에 붙이면 왜 어려워지나요?", "문장 조립, 숫자/날짜/통화, 복수형, 텍스트 길이, RTL 가능성을 컴포넌트 API와 레이아웃에 반영해야 합니다.", "한글/영문만 보고 고정 폭을 잡으면 독일어 길이, 아랍어 방향, plural rule, date format에서 UI가 깨집니다.", "locale snapshot, pseudo localization, overflow capture, ICU message lint", f("문자열 concat이 왜 위험한가요?", "아이콘과 텍스트 순서는 어떻게 바뀌나요?", "번역 누락은 어떻게 검출하나요?")),
      item("프론트엔드 로그에는 무엇을 남겨야 하나요?", "사용자 식별 정보가 아니라 session/request id, route, feature, error code, recovery action, release version을 남깁니다. PII와 token은 redaction합니다.", "console.log 수준으로 남기면 운영에서 집계할 수 없고, 반대로 payload를 그대로 보내면 개인정보 유출이 됩니다.", "client log schema, redaction test, sourcemap release id, error dashboard", f("client error와 server error를 어떻게 연결하나요?", "PII redaction은 어디서 하나요?", "console error를 모두 수집하면 되나요?")),
      item("hydration mismatch는 왜 발생하나요?", "서버가 만든 HTML과 클라이언트 첫 렌더 결과가 다를 때 발생합니다. 시간, random, browser-only API, locale, auth 상태를 SSR 경계에서 안정화해야 합니다.", "개발에서는 경고만 보이고 지나가도 실제로는 이벤트 연결, layout shift, SEO 품질에 영향을 줄 수 있습니다.", "hydration warning log, SSR snapshot, deterministic render test, Web Vitals CLS", f("window 접근은 어디서 해야 하나요?", "random id는 어떻게 안정화하나요?", "auth 상태는 SSR에서 어떻게 다루나요?")),
      item("Error Boundary는 무엇을 해결하고 무엇을 못 하나요?", "렌더링 중 발생한 React subtree 오류를 격리하고 fallback을 보여줍니다. async handler, server error, event handler 오류는 별도 처리와 logging이 필요합니다.", "Error Boundary만 두고 data error를 throw 처리하지 않으면 사용자에게 복구 버튼이나 원인 코드가 전달되지 않습니다.", "boundary placement map, fallback story, error reporting event, retry fixture", f("boundary를 너무 넓게 두면?", "event handler 오류는 어떻게 잡나요?", "fallback에서 어떤 정보를 보여주나요?")),
      item("프론트엔드 PR에서 어떤 증거를 남겨야 하나요?", "주요 state screenshot, keyboard path, network trace, performance before/after, test result, rollout/rollback 조건을 남깁니다.", "코드 diff만 있으면 리뷰어가 사용자 흐름, 성능 변화, 접근성 회귀를 재현하기 어렵습니다.", "PR evidence packet, Playwright trace, Lighthouse/Web Vitals, visual diff", f("작은 UI 변경에도 증거가 필요한가요?", "성능 수치가 없으면 무엇을 남기나요?", "롤백 가능성은 어떻게 설명하나요?")),
      item("서버 응답 스키마 변경에 프론트는 어떻게 대응하나요?", "optional/required, nullable, enum 확장, field removal, versioning을 타입과 runtime validation으로 방어합니다.", "TypeScript 타입만 믿으면 실제 API drift, null, unknown enum에서 런타임 UI가 깨집니다.", "contract test, schema diff, unknown enum fixture, runtime parser log", f("nullable과 optional은 왜 다른가요?", "enum 값이 추가되면 어떻게 하나요?", "GraphQL이면 문제가 사라지나요?")),
      item("브라우저 저장소는 어떻게 고르나요?", "수명, 민감도, 동기/비동기 API, 용량, cross-tab 동기화 기준으로 memory, sessionStorage, localStorage, IndexedDB, cookie를 고릅니다.", "access token을 localStorage에 두거나 대용량 데이터를 동기 storage에 넣으면 보안과 main thread 성능 문제가 생깁니다.", "storage policy, XSS threat model, quota test, cross-tab sync test", f("cookie가 항상 안전한가요?", "IndexedDB는 언제 쓰나요?", "로그아웃 때 무엇을 지워야 하나요?")),
      item("웹소켓이나 SSE를 도입할 때 무엇을 보나요?", "실시간성 요구, 재연결, backoff, ordering, missed event replay, auth refresh, tab visibility를 봅니다.", "연결만 열면 끝이라고 보면 네트워크 전환, 중복 이벤트, 오래된 토큰, hidden tab 리소스 낭비에서 깨집니다.", "connection state machine, reconnect log, event cursor, stale token fixture", f("SSE와 WebSocket 선택 기준은?", "놓친 이벤트는 어떻게 복구하나요?", "토큰 만료 중 연결은 어떻게 되나요?")),
      item("feature flag를 프론트에서 어떻게 운영하나요?", "flag는 rollout, experiment, kill switch, permission을 구분하고 default, cache, exposure logging, stale flag 제거 정책을 둡니다.", "flag가 권한처럼 사용되거나 제거되지 않으면 복잡도가 누적되고 사용자별 UI 불일치가 생깁니다.", "flag inventory, exposure event, kill switch drill, stale flag cleanup PR", f("flag 기본값은 무엇으로 두나요?", "SSR에서 flag는 어떻게 주입하나요?", "권한과 flag는 왜 다르나요?")),
      item("파일 업로드 UI는 무엇이 어렵나요?", "파일 크기/타입 검증, preview memory, progress, cancel, retry, direct upload URL 만료, 바이러스 검사 상태를 포함해야 합니다.", "input만 붙이면 대용량 파일, 중단된 네트워크, 중복 업로드, object URL leak, server scan pending에서 문제가 납니다.", "upload state machine, cancel test, object URL cleanup, server scan status fixture", f("확장자 검증만으로 충분한가요?", "progress 100%와 처리 완료는 같은가요?", "업로드 취소는 서버에도 전달해야 하나요?")),
      item("테이블이나 그리드 화면은 어떤 계약이 필요하나요?", "정렬/필터/페이지, column visibility, row identity, selection persistence, virtual scroll, inline edit validation을 명시해야 합니다.", "index를 row key로 쓰거나 selection을 화면 순서에 묶으면 정렬/필터 후 잘못된 행이 수정됩니다.", "row id contract, grid interaction test, virtualization capture, edit rollback fixture", f("row key는 왜 안정적이어야 하나요?", "가상 스크롤에서 접근성은?", "inline edit 실패는 어떻게 복구하나요?")),
      item("모바일 웹 대응에서 무엇을 먼저 확인하나요?", "viewport, safe area, touch target, virtual keyboard, scroll locking, network quality, reduced data를 봅니다.", "데스크톱 기준 레이아웃만 줄이면 키보드가 input을 가리고, fixed footer와 주소창 변화로 CTA가 사라집니다.", "mobile viewport screenshot, touch target audit, keyboard overlay test, RUM by device", f("100vh가 모바일에서 위험한 이유는?", "터치 타겟 크기는 어떻게 잡나요?", "모바일 성능은 데스크톱과 무엇이 다르나요?")),
      item("프론트엔드에서 race condition은 어떻게 생기나요?", "빠른 입력, route 전환, 중복 요청, 오래된 응답, optimistic update 실패에서 생깁니다. request id, abort, cache version, mutation queue로 제어합니다.", "마지막으로 도착한 응답을 무조건 반영하면 사용자가 현재 보는 필터와 다른 데이터가 화면에 표시됩니다.", "stale response fixture, AbortController test, mutation log, cache version trace", f("AbortController는 서버 작업도 취소하나요?", "optimistic update 실패는 어떻게 되돌리나요?", "검색 입력은 debounce만 하면 충분한가요?")),
      item("컴포넌트 API에서 children과 render prop은 언제 쓰나요?", "구조를 호출자가 제어해야 하면 children, 내부 상태를 공유하며 렌더링을 위임해야 하면 render prop을 고려합니다.", "과도하게 유연한 API는 사용처마다 접근성과 레이아웃 책임이 흩어져 디자인 시스템 품질을 떨어뜨립니다.", "usage examples, a11y invariant test, API review note, breaking change policy", f("compound component는 언제 적합한가요?", "slot API의 위험은?", "유연성과 일관성은 어떻게 균형 잡나요?")),
      item("프론트엔드에서 보이는 버그와 실제 원인을 어떻게 연결하나요?", "증상을 DOM, network, state, render, backend response, browser compatibility로 분해하고 재현 fixture를 고정합니다.", "화면 캡처만 보고 CSS부터 바꾸면 데이터 race나 API contract 오류를 가릴 수 있습니다.", "repro steps, HAR, React Profiler, DOM snapshot, browser matrix", f("재현이 안 되는 버그는 어떻게 추적하나요?", "브라우저별 차이는 어디서 확인하나요?", "사용자 세션 로그는 어디까지 봐야 하나요?")),
      item("프론트엔드 핵심 답변에서 시니어와 주니어의 차이는 무엇인가요?", "시니어 답변은 사용자 흐름, 브라우저 비용, 서버 계약, 접근성, 관측성, 롤백까지 연결합니다. 주니어 답변은 라이브러리 API와 성공 경로에 머무르는 경우가 많습니다.", "실패 상태와 검증 증거를 말하지 못하면 외부 검증에서 실제 운영 가능성을 방어하기 어렵습니다.", "FRONTEND QA TRAINING PACKET, PR evidence, release health window, incident note", f("경험이 없는 영역은 어떻게 답하나요?", "트레이드오프를 어떻게 짧게 말하나요?", "검증 증거를 하나만 고르면 무엇인가요?")),
    ],
  },
  {
    id: "engineering-frontend-interaction-qa",
    title: "프론트엔드 인터랙션 Q&A",
    source: "프론트엔드 인터랙션",
    subtitle: "포인터, 키보드, focus, undo, optimistic UI, 복잡한 조작 흐름을 상태 기계로 답하는 훈련 페이지입니다.",
    questions: [
      item("좋은 인터랙션 설계의 출발점은 무엇인가요?", "이벤트 핸들러가 아니라 사용자의 의도, 상태, 전이, 취소, 실패 복구를 먼저 모델링합니다. idle, armed, active, committing, failed 같은 상태가 있어야 테스트와 접근성이 붙습니다.", "click handler만 구현하면 double submit, pointercancel, route change, stale response에서 상태가 꼬입니다.", "interaction state machine, transition table, QA scenario, accessibility acceptance", f("상태 기계가 과한 경우는?", "전이를 어디에 문서화하나요?", "실패 상태는 화면에 어떻게 드러나야 하나요?")),
      item("drag and drop에서 가장 위험한 부분은 무엇인가요?", "pointer lifecycle, keyboard 대체 조작, drop target 계산, scroll container, 취소/rollback을 함께 설계해야 합니다.", "마우스 기준으로만 만들면 touch, pen, keyboard, iframe, pointercancel에서 조작이 끊기고 접근성 검증을 통과하지 못합니다.", "pointer trace, keyboard DnD test, drop target fixture, rollback scenario", f("pointer capture는 왜 쓰나요?", "드래그 중 스크롤은 어떻게 처리하나요?", "키보드 사용자는 어떻게 재정렬하나요?")),
      item("focus management를 어떻게 설명하나요?", "focus는 사용자의 현재 작업 위치입니다. modal, popover, route change, validation error, async content 삽입 뒤 focus 이동과 복귀 위치를 명시합니다.", "DOM이 바뀌었는데 focus가 body로 빠지면 keyboard 사용자와 screen reader 사용자가 흐름을 잃습니다.", "focus path test, tab order recording, screen reader smoke, modal fixture", f("focus trap은 언제 필요한가요?", "닫힌 뒤 focus는 어디로 돌아가나요?", "validation error에 focus를 옮겨야 하나요?")),
      item("키보드 인터랙션은 어떻게 설계하나요?", "WAI-ARIA pattern을 참고해 Tab, Arrow, Enter, Space, Escape의 의미를 컴포넌트별로 고정합니다.", "브라우저 기본 동작과 충돌하거나 role만 바꾸고 key handling을 빼면 조작 가능한 듯 보이지만 실제로는 접근 불가 UI가 됩니다.", "keyboard spec, role/aria audit, Playwright keyboard test, screen reader note", f("Enter와 Space는 같은가요?", "Arrow navigation은 언제 쓰나요?", "Escape는 무엇을 닫아야 하나요?")),
      item("optimistic UI는 언제 도입하나요?", "성공 확률이 높고 실패 복구가 명확하며 중복/순서 문제를 제어할 수 있을 때 사용합니다.", "실패 시 rollback, 서버 최종 상태 reconcile, 중복 mutation 처리 없이 쓰면 화면과 서버가 어긋납니다.", "mutation ledger, rollback fixture, server reconcile log, duplicate click test", f("좋아요 버튼과 결제 버튼은 왜 다르나요?", "실패했을 때 toast만 띄우면 되나요?", "동시 optimistic update는 어떻게 합치나요?")),
      item("undo 기능은 어떻게 설계하나요?", "되돌릴 수 있는 command와 되돌릴 수 없는 side effect를 분리하고, undo window, server commit timing, audit log를 정합니다.", "이미 외부 알림이나 결제가 나간 작업을 단순 UI undo로 처리하면 사용자는 취소됐다고 믿지만 시스템은 진행됩니다.", "command log, undo timeout, compensation API, audit event", f("undo와 cancel은 무엇이 다른가요?", "server commit 후 undo는 어떻게 하나요?", "삭제 undo에서 데이터 보존 기간은?")),
      item("toast는 어떤 정보를 담아야 하나요?", "결과, 영향 범위, 다음 행동, 복구 가능성을 짧게 알려야 합니다. 중요한 오류는 toast만으로 끝내지 않고 inline error나 persistent status를 둡니다.", "모든 오류를 toast로 처리하면 screen reader announcement, 재시도, 사용자가 놓친 오류 추적이 어렵습니다.", "toast policy, aria-live test, error persistence fixture, retry action log", f("성공 toast는 항상 필요한가요?", "aria-live politeness는?", "toast queue가 쌓이면 어떻게 하나요?")),
      item("modal과 drawer는 어떻게 구분하나요?", "modal은 현재 작업을 막고 결정을 요구할 때, drawer는 맥락을 유지한 보조 작업이나 상세 탐색에 적합합니다.", "모든 것을 modal로 만들면 deep link, mobile viewport, focus trap, history handling이 복잡해집니다.", "interaction pattern decision, focus trap test, mobile screenshot, route behavior", f("modal 안에 modal은 허용하나요?", "drawer를 URL과 연결해야 하나요?", "ESC 동작은 어떻게 정하나요?")),
      item("popover와 tooltip은 무엇이 다른가요?", "tooltip은 보조 설명이고 focus 가능한 콘텐츠를 담지 않습니다. popover는 상호작용 가능한 작은 레이어이며 열림/닫힘, focus, outside click 정책이 필요합니다.", "tooltip 안에 버튼을 넣으면 keyboard와 screen reader 사용자가 접근하기 어렵습니다.", "overlay pattern spec, focus test, hover/focus parity, outside click fixture", f("hover 전용 정보는 왜 위험한가요?", "mobile에서 tooltip은?", "outside click과 blur는 어떻게 다르나요?")),
      item("입력 지연을 줄이는 인터랙션 전략은 무엇인가요?", "입력 즉시 feedback을 주고 비싼 계산은 debounce, transition, worker, virtualization으로 분리합니다.", "debounce만 걸면 느린 느낌은 줄 수 있지만 CPU long task나 render 폭증의 원인은 남아 있습니다.", "input latency trace, INP, React Profiler, worker timing", f("debounce와 throttle 차이는?", "startTransition은 무엇을 해결하나요?", "worker로 보내면 항상 빨라지나요?")),
      item("검색 자동완성은 어떻게 설계하나요?", "debounce, abort, stale response guard, keyboard navigation, loading/empty/error 상태, analytics event를 포함합니다.", "이전 요청 응답이 늦게 도착하면 최신 query 결과를 덮어쓰고, 키보드 선택이 mouse hover와 불일치할 수 있습니다.", "AbortController test, combobox a11y test, stale response fixture, search event log", f("minimum query length는 왜 필요한가요?", "추천 결과를 cache해도 되나요?", "Enter 키는 언제 검색/선택인가요?")),
      item("복잡한 wizard flow는 어떻게 모델링하나요?", "step, guard, validation, save draft, back navigation, resumability, server state를 명시합니다.", "단순 step index만 두면 조건부 분기, 뒤로가기, 중간 저장, 권한 만료에서 잘못된 단계로 이동합니다.", "wizard state chart, deep link test, draft persistence fixture, guard table", f("URL에 step을 넣어야 하나요?", "중간 저장 실패는?", "완료 후 뒤로가기는?")),
      item("inline edit는 어떻게 안전하게 만들까요?", "view/edit/saving/saved/failed 상태, optimistic 여부, validation, escape/cancel, focus 복귀를 설계합니다.", "blur 시 자동 저장만 쓰면 사용자가 취소했다고 생각한 값이 저장되거나 네트워크 실패가 숨겨질 수 있습니다.", "inline edit state test, save failure fixture, keyboard flow, audit log", f("Enter와 Escape는?", "저장 중 다른 행 편집은?", "충돌 발생 시 어떻게 보이나요?")),
      item("selection interaction에서 무엇을 주의하나요?", "row identity, select all scope, filtering/pagination, disabled rows, bulk action 권한을 명확히 합니다.", "현재 화면만 선택인지 전체 결과 선택인지 모호하면 사용자가 예상보다 많은 데이터를 변경할 수 있습니다.", "selection contract, bulk action confirmation, row id fixture, permission test", f("select all은 현재 페이지인가요 전체인가요?", "필터 변경 후 selection은?", "비활성 행은 어떻게 표시하나요?")),
      item("scroll interaction은 왜 까다롭나요?", "nested scroll, sticky header, virtual list, anchor navigation, scroll restoration, mobile address bar를 고려해야 합니다.", "body scroll lock을 잘못 걸면 배경이 움직이거나 iOS에서 input focus가 깨집니다.", "scroll restoration test, mobile Safari capture, virtual list measurement, sticky offset check", f("scrollIntoView는 항상 안전한가요?", "body scroll lock은?", "anchor와 fixed header는?")),
      item("gesture를 추가할 때 기준은 무엇인가요?", "gesture는 보조 경로여야 하며 명시적 버튼/키보드 대체 조작과 충돌하지 않아야 합니다.", "swipe 삭제 같은 gesture만 제공하면 발견 가능성과 접근성이 낮고 실수 비용이 큽니다.", "gesture fallback map, touch target audit, accidental activation test, undo fixture", f("gesture discoverability는?", "touch와 mouse event 중 무엇을 쓰나요?", "실수 방지는 어떻게 하나요?")),
      item("disabled 상태와 loading 상태는 어떻게 다르나요?", "disabled는 사용할 수 없는 조건, loading은 현재 처리 중인 상태입니다. 이유와 진행 상태, 취소 가능성을 구분해야 합니다.", "처리 중 버튼을 disabled만 하면 screen reader가 이유를 알기 어렵고, 실패 후 복구 경로가 사라질 수 있습니다.", "button state matrix, aria-disabled audit, submit pending test, retry fixture", f("aria-disabled와 disabled 차이는?", "loading 중 focus는?", "왜 비활성인지 설명해야 하나요?")),
      item("confirmation dialog는 언제 필요한가요?", "되돌리기 어렵거나 영향 범위가 큰 작업에 필요합니다. 하지만 반복 작업에는 undo나 staged review가 더 나을 수 있습니다.", "모든 작업에 confirm을 붙이면 사용자는 기계적으로 확인하고, 정작 위험한 작업의 신호가 약해집니다.", "destructive action policy, undo alternative, bulk impact copy, audit event", f("삭제에는 항상 confirm이 필요한가요?", "문구에는 무엇이 들어가야 하나요?", "권한 있는 사용자도 확인해야 하나요?")),
      item("command palette를 설계할 때 무엇을 봐야 하나요?", "검색, keyboard shortcut, permission filtering, recent/frequent ranking, action preview, undo 가능성을 봅니다.", "보이지 않는 명령을 노출하거나 권한 없는 action이 섞이면 신뢰와 보안 경계가 흔들립니다.", "command registry, shortcut map, permission fixture, action audit log", f("shortcut 충돌은 어떻게 관리하나요?", "명령 결과 preview는?", "모바일에서는 어떻게 하나요?")),
      item("실시간 협업 UI는 무엇이 어렵나요?", "presence, cursor, conflict resolution, optimistic update, latency compensation, offline reconnect를 설계해야 합니다.", "마지막 저장값으로 덮어쓰면 사용자의 작업이 조용히 사라집니다.", "conflict fixture, presence heartbeat, CRDT/OT decision note, reconnect log", f("충돌은 사용자에게 보여줘야 하나요?", "presence가 stale하면?", "offline edit는 허용하나요?")),
      item("micro-interaction은 언제 성능 문제가 되나요?", "짧은 animation도 레이아웃을 건드리거나 많은 요소에 동시에 적용되면 INP와 frame rate를 해칩니다.", "hover, focus, active 효과를 모두 box-shadow/filter/layout 변화로 만들면 저사양 기기에서 입력 지연이 생깁니다.", "Performance trace, FPS capture, INP by device, animation property audit", f("box-shadow는 왜 비쌀 수 있나요?", "hover 없는 기기는?", "focus ring을 없애도 되나요?")),
      item("접근성 announcement는 어떻게 정하나요?", "사용자 작업 결과와 비동기 상태 변화 중 화면에 즉시 보이지 않는 것을 aria-live로 알립니다.", "모든 변화를 assertive로 읽으면 screen reader 사용자의 작업을 방해하고 중요한 알림이 묻힙니다.", "aria-live policy, screen reader capture, async status fixture, toast audit", f("polite와 assertive 차이는?", "loading도 읽어야 하나요?", "반복 알림은 어떻게 줄이나요?")),
      item("context menu는 어떻게 안전하게 만들죠?", "마우스 우클릭뿐 아니라 keyboard trigger, focus, permission, destructive action guard, mobile 대체 UI를 둡니다.", "커스텀 메뉴가 브라우저 기본 기능을 막고 keyboard 접근을 제공하지 않으면 사용성이 떨어집니다.", "context menu a11y test, permission filter, mobile fallback capture, action log", f("브라우저 기본 메뉴를 막아도 되나요?", "키보드에서 어떻게 여나요?", "메뉴 밖 클릭은?")),
      item("인터랙션 테스트는 어떤 수준으로 나누나요?", "state machine 단위 테스트, component interaction test, Playwright E2E, accessibility smoke로 나눕니다.", "E2E만 믿으면 느리고 원인 파악이 어렵고, unit만 믿으면 실제 포커스/키보드/브라우저 동작을 놓칩니다.", "test pyramid, user-event tests, Playwright trace, axe report", f("user-event와 fireEvent 차이는?", "모든 브라우저에서 E2E를?", "flaky test는 어떻게 줄이나요?")),
      item("route 전환 중 사용자 입력은 어떻게 다루나요?", "pending navigation, unsaved changes, abortable requests, optimistic mutation, focus restoration을 설계합니다.", "사용자가 저장 중 이동하면 요청은 성공했지만 화면은 이전 상태를 보여주거나 반대로 변경을 잃을 수 있습니다.", "navigation guard test, pending mutation log, abort signal fixture, focus restore", f("unsaved changes prompt는 언제?", "route loader 실패는?", "뒤로가기 중 mutation은?")),
      item("복잡한 인터랙션의 QA 시나리오는 어떻게 만들까요?", "happy path보다 rapid click, keyboard-only, mobile touch, network slow, permission change, stale data를 먼저 넣습니다.", "시나리오가 성공 흐름만 있으면 실제 운영에서 나오는 race와 취소 이벤트를 잡지 못합니다.", "interaction QA matrix, network throttle trace, permission fixture, stale response test", f("QA에 꼭 넣을 3가지는?", "네트워크 지연은 어떻게 재현하나요?", "권한 변경은 어떻게 테스트하나요?")),
      item("인터랙션과 analytics는 어떻게 연결하나요?", "사용자 의도 단위로 event를 정의하고 exposure, action, result, error를 나눕니다.", "DOM click만 추적하면 의미 없는 이벤트가 쌓이고 실패/취소/재시도 같은 중요한 흐름을 놓칩니다.", "event taxonomy, funnel chart, error result event, privacy review", f("click event와 action event 차이는?", "중복 이벤트는 어떻게 막나요?", "개인정보는 어디서 제거하나요?")),
      item("인터랙션 구현에서 senior-level 리뷰 포인트는 무엇인가요?", "상태 전이, 입력 장치 다양성, 접근성, 실패 복구, 관측 증거, 테스트 fixture가 있는지 봅니다.", "시각적으로 동작하는 데모만 있으면 실제 사용자의 빠른 조작과 보조기술 환경에서 깨질 수 있습니다.", "INTERACTION STATE MACHINE MODEL, pointer lifecycle contract, keyboard capture, PR evidence", f("리뷰에서 바로 막아야 할 위험은?", "데모와 운영 기능 차이는?", "증거가 부족하면 무엇을 요구하나요?")),
      item("경험이 없는 인터랙션 질문은 어떻게 답하나요?", "직접 운영 경험과 설계 지식을 분리해 말하고, 상태 기계, 접근성 패턴, 실패 fixture로 검증하겠다고 답합니다.", "해본 것처럼 말하면 꼬리질문에서 실제 장애, 측정, 테스트 증거를 요구받을 때 무너집니다.", "experience boundary note, prototype plan, a11y pattern reference, validation checklist", f("모르면 모른다고 해야 하나요?", "대체 경험은 어떻게 연결하나요?", "검증 계획은 얼마나 구체적이어야 하나요?")),
    ],
  },
  {
    id: "engineering-frontend-motion-qa",
    title: "프론트엔드 모션·애니메이션 Q&A",
    source: "프론트엔드 모션·애니메이션",
    subtitle: "motion token, easing, FLIP, interrupt, reduced motion, 성능 검증을 답변으로 훈련합니다.",
    questions: [
      item("제품 모션의 목적은 무엇인가요?", "모션은 장식이 아니라 상태 변화, 공간 관계, 주의 이동, 조작 결과를 설명하는 피드백입니다.", "목적 없이 추가하면 지연처럼 느껴지고 접근성·성능 비용만 늘어납니다.", "motion purpose table, interaction state map, user timing capture, visual regression", f("모션을 빼야 하는 기준은?", "브랜드 모션과 제품 모션 차이는?", "사용자가 느끼는 속도는 어떻게 확인하나요?")),
      item("duration과 easing은 어떻게 정하나요?", "변화 거리, 중요도, 입력 직접성, interrupt 가능성을 기준으로 token화합니다. 작은 UI feedback은 짧고, 공간 전환은 관계를 이해할 만큼만 둡니다.", "모든 animation을 같은 duration/easing으로 두면 느리거나 급작스럽게 보이고 시스템 일관성이 떨어집니다.", "motion token table, easing comparison, frame capture, reduced-motion variant", f("200ms가 항상 적절한가요?", "ease-out은 언제 쓰나요?", "spring은 어떻게 제어하나요?")),
      item("reduced motion은 어떻게 지원하나요?", "prefers-reduced-motion을 읽고 transform 이동, parallax, autoplay를 줄이거나 fade/instant 전환으로 대체합니다.", "옵션을 무시하면 전정기관 민감 사용자에게 실제 불편을 만들고 접근성 기준을 놓칩니다.", "reduced motion audit, media query test, visual snapshot, release gate", f("모든 animation을 제거해야 하나요?", "CSS와 JS animation 모두 적용되나요?", "사용자 설정 변경은 즉시 반영해야 하나요?")),
      item("FLIP 기법은 무엇을 해결하나요?", "First, Last, Invert, Play로 layout 변화 결과를 transform animation으로 보여줘 layout 비용을 줄이고 공간 이동을 설명합니다.", "측정과 적용 타이밍을 잘못 잡으면 forced layout과 flicker가 생깁니다.", "layout measurement trace, transform-only audit, before/after capture, list reorder fixture", f("FLIP도 layout을 읽지 않나요?", "가상 리스트에서 가능한가요?", "interrupt 중에는 어떻게 하나요?")),
      item("CSS animation과 JS animation은 어떻게 고르나요?", "단순 상태 전환은 CSS, gesture/physics/interrupt 제어가 필요한 것은 JS animation library나 Web Animations API를 고려합니다.", "모든 것을 JS로 만들면 bundle과 main thread 비용이 커지고, 모든 것을 CSS로 하면 상태 제어와 취소가 어려울 수 있습니다.", "animation decision record, bundle diff, main-thread trace, cancellation test", f("Web Animations API 장점은?", "requestAnimationFrame은 언제?", "library 선택 기준은?")),
      item("layout을 건드리는 animation은 왜 위험한가요?", "width, height, top, left는 layout/paint를 유발할 수 있고 많은 요소에 전파됩니다. transform/opacity는 composite 단계로 처리될 가능성이 큽니다.", "레이아웃 animation이 리스트나 grid에 걸리면 frame drop과 INP 악화가 생깁니다.", "Performance trace, layout event count, composite layer audit, FPS capture", f("height auto animation은?", "will-change는 항상 좋은가요?", "filter는 안전한가요?")),
      item("presence transition에서 중요한 것은 무엇인가요?", "enter/exit 상태, unmount 지연, focus, aria-hidden, pointer-event 차단을 명확히 해야 합니다.", "exit animation 중 DOM이 남아 있으면 focus나 click을 잡아 사용자가 보이지 않는 요소와 상호작용할 수 있습니다.", "presence state test, focus trap capture, pointer event audit, DOM cleanup check", f("exit 중 focus는?", "display none과 opacity 0 차이는?", "unmount cleanup은 언제?")),
      item("interruptible animation은 어떻게 설계하나요?", "진행 중 animation을 취소·역전·합성할 수 있어야 빠른 toggle과 route change에서 자연스럽습니다.", "완료 callback에만 상태를 묶으면 rapid click에서 UI가 중간 상태에 갇힙니다.", "rapid toggle fixture, animation cancel log, state machine, route change test", f("cancel 후 final state는?", "animation promise는 어떻게 처리하나요?", "spring 중 target 변경은?")),
      item("scroll-linked animation은 왜 조심해야 하나요?", "scroll은 입력과 직접 연결되어 있어 main thread 작업이 끼면 즉시 jank가 납니다. CSS scroll timeline, IntersectionObserver, throttling을 고려합니다.", "scroll handler에서 layout read/write를 반복하면 frame budget을 초과합니다.", "scroll performance trace, passive listener audit, frame drop metric, mobile capture", f("parallax는 언제 빼야 하나요?", "IntersectionObserver 한계는?", "passive listener는 왜 필요한가요?")),
      item("skeleton UI는 animation인가요?", "skeleton은 loading 중 layout 안정성과 기대 형성을 위한 feedback입니다. 실제 콘텐츠 구조와 크기를 반영해야 합니다.", "반짝이는 회색 박스만 넣으면 CLS를 줄이지 못하고 사용자는 진행 상태를 오해합니다.", "skeleton/content size diff, CLS metric, loading state story, slow network capture", f("spinner보다 항상 낫나요?", "skeleton은 얼마나 보여야 하나요?", "접근성 announcement는?")),
      item("page transition은 언제 적합한가요?", "같은 제품 공간 안에서 탐색 관계를 설명할 때 적합하고, 정보 탐색 속도가 중요한 화면에서는 최소화해야 합니다.", "모든 route에 큰 transition을 넣으면 navigation latency처럼 느껴지고 browser back/forward와 충돌합니다.", "navigation timing, route transition policy, back-forward test, reduced motion capture", f("SPA와 MPA에서 차이는?", "뒤로가기 transition은?", "데이터 로딩과 어떻게 맞추나요?")),
      item("micro-interaction token은 무엇을 포함하나요?", "duration, easing, delay, distance, opacity, scale, reduced-motion 대체, 사용 가능한 상태를 포함합니다.", "토큰 없이 화면별로 값이 퍼지면 제품 전체가 불안정하게 느껴지고 유지보수가 어렵습니다.", "motion token inventory, CSS variable diff, component story, visual regression", f("delay는 언제 쓰나요?", "scale feedback은 안전한가요?", "토큰 변경 영향은?")),
      item("3D transform을 UI에 쓸 때 주의할 점은?", "공간감을 줄 수 있지만 읽기성, motion sickness, layer memory, hit testing을 확인해야 합니다.", "과한 perspective와 rotation은 텍스트 가독성과 pointer target을 해칠 수 있습니다.", "layer memory trace, readability capture, pointer hit test, reduced motion variant", f("GPU 가속이면 무조건 좋은가요?", "텍스트에 transform을?", "hit area는 어떻게 검증하나요?")),
      item("Lottie 같은 asset animation은 어떻게 검토하나요?", "파일 크기, frame rate, 렌더러(SVG/canvas), loop 여부, 접근성 대체 텍스트, theme 대응을 봅니다.", "마케팅 asset을 그대로 넣으면 bundle 증가, CPU 사용량, contrast 문제, reduced motion 누락이 생깁니다.", "asset budget, CPU trace, reduced motion fallback, visual QA", f("loop animation은 언제 멈추나요?", "SVG renderer와 canvas renderer 차이는?", "다크모드 대응은?")),
      item("motion과 accessibility 충돌은 어떻게 해결하나요?", "정보 전달은 motion 하나에 의존하지 않고 text/icon/state로 중복 제공하며, motion은 보조 피드백으로 둡니다.", "색 변화나 흔들림만으로 오류를 알리면 보조기술과 일부 사용자에게 전달되지 않습니다.", "non-motion cue audit, aria message, contrast check, reduced motion test", f("shake animation은 괜찮나요?", "오류 강조는 어떻게?", "모션 없이 상태를 어떻게 알리나요?")),
      item("animation 성능 예산은 어떻게 잡나요?", "목표 기기, frame budget, INP, long task, layer count, bundle size를 기준으로 잡습니다.", "데스크톱에서 부드러워도 저사양 모바일에서 main thread와 GPU memory가 동시에 부족할 수 있습니다.", "device matrix, FPS/INP metric, long task trace, bundle analyzer", f("60fps면 충분한가요?", "120Hz 기기는?", "성능 측정 기기는 어떻게 고르나요?")),
      item("hover animation은 어떤 한계가 있나요?", "touch 기기에는 hover가 없거나 sticky hover처럼 동작할 수 있습니다. focus/active 상태와 동등한 피드백이 필요합니다.", "hover에만 중요한 정보를 숨기면 모바일과 키보드 사용자에게 기능이 보이지 않습니다.", "hover/focus parity test, touch device capture, CSS media query audit, keyboard path", f("hover media query는?", "tooltip과 hover card 차이는?", "focus-visible은 왜 쓰나요?")),
      item("animation cleanup은 왜 중요한가요?", "timer, requestAnimationFrame, observer, animation instance를 route change와 unmount에서 정리해야 memory leak과 stale update를 막습니다.", "unmounted component state update나 계속 도는 RAF는 성능 저하와 테스트 flaky를 만듭니다.", "cleanup test, memory profile, RAF count, route change fixture", f("CSS animation도 cleanup이 필요한가요?", "observer는 어디서 해제하나요?", "animation library instance는?")),
      item("모션 QA는 무엇을 캡처해야 하나요?", "normal, rapid toggle, reduced motion, slow device, mobile viewport, keyboard-only를 캡처합니다.", "정상 속도 시연 영상만 있으면 interrupt와 접근성 회귀를 놓칩니다.", "motion QA matrix, video capture, performance trace, visual regression", f("영상 증거는 꼭 필요한가요?", "눈으로 보는 QA의 한계는?", "자동화 가능한 부분은?")),
      item("Framer Motion 같은 라이브러리는 어떻게 평가하나요?", "bundle size, SSR 호환성, layout animation, gesture 지원, reduced motion, exit transition, maintenance를 봅니다.", "기능이 많다는 이유로 도입하면 작은 UI에 과한 런타임 비용과 API lock-in이 생깁니다.", "library decision record, bundle diff, SSR smoke, reduced motion test", f("CSS로 충분한 기준은?", "라이브러리 교체 비용은?", "tree-shaking은 확인했나요?")),
      item("transition과 animation CSS 차이는 어떻게 설명하나요?", "transition은 상태 변화 사이의 보간이고 animation은 keyframe timeline입니다. 트리거와 제어 방식이 다릅니다.", "hover나 class toggle에 keyframe을 남발하면 제어와 중단 처리가 복잡해질 수 있습니다.", "CSS audit, state transition story, keyframe inventory, cancellation fixture", f("keyframe이 필요한 경우는?", "transitionend는 신뢰 가능한가요?", "delay가 UX에 미치는 영향은?")),
      item("animation event에 비즈니스 로직을 묶어도 되나요?", "핵심 상태 변경은 animation 완료에 의존하지 않아야 합니다. animation event는 시각적 cleanup 정도로 제한합니다.", "transitionend가 발생하지 않거나 reduced motion에서 생략되면 비즈니스 상태가 진행되지 않을 수 있습니다.", "state/animation separation test, reduced motion fixture, event fallback, timeout guard", f("완료 후 unmount는?", "reduced motion에서는?", "이벤트 누락은 어떻게 대비하나요?")),
      item("motion에서 z-index와 stacking context는 왜 문제인가요?", "transform, opacity, position 등이 새로운 stacking context를 만들어 overlay 순서와 click target을 바꿀 수 있습니다.", "animation을 추가한 뒤 dropdown이 modal 뒤로 숨거나 보이지 않는 layer가 click을 가로챌 수 있습니다.", "stacking context audit, overlay story, pointer target test, z-index token", f("transform이 stacking context를 만드나요?", "portal을 쓰면 해결인가요?", "z-index token은 어떻게 설계하나요?")),
      item("responsive motion은 어떻게 다르게 설계하나요?", "화면 크기, 입력 방식, 성능 예산에 따라 거리와 duration, gesture를 조정합니다.", "desktop drawer motion을 mobile에 그대로 쓰면 이동 거리가 길고 가상 키보드와 겹칠 수 있습니다.", "viewport motion matrix, touch capture, keyboard overlay test, device performance trace", f("모바일 duration은 줄이나요?", "safe area와 motion은?", "orientation change 중에는?")),
      item("모션을 디자인 핸드오프에 어떻게 담나요?", "상태별 timing, easing, distance, trigger, interrupt, reduced motion, 예외 조건을 문서화합니다.", "프로토타입 영상만 전달하면 구현자가 수치를 추정하게 되고 제품 전반의 일관성이 깨집니다.", "motion spec, token table, prototype reference, implementation checklist", f("디자이너와 어떤 값을 합의하나요?", "프로토타입과 실제 구현 차이는?", "변경 관리는?")),
      item("motion 회귀는 어떻게 자동화하나요?", "시각 회귀, Playwright screenshot/video, trace marker, reduced motion snapshot으로 주요 상태를 고정합니다.", "눈으로만 확인하면 미세한 timing 변경, focus loss, layout shift를 놓칠 수 있습니다.", "visual regression baseline, Playwright video, trace marker, CLS metric", f("animation 때문에 스냅샷이 흔들리면?", "시간을 고정할 수 있나요?", "어떤 상태만 자동화하나요?")),
      item("모션과 Web Vitals는 어떻게 연결되나요?", "불필요한 layout shift는 CLS, 입력 직후 long task는 INP, loading animation이 LCP를 지연할 수 있습니다.", "시각적으로 고급스러워 보여도 실제 사용자 지표를 악화시키면 제품 품질은 낮아집니다.", "Web Vitals attribution, Performance trace, LCP element audit, INP interaction log", f("animation은 CLS에 포함되나요?", "LCP 이미지 fade-in은?", "INP와 animation 관계는?")),
      item("모션 시스템 리뷰에서 바로 막을 신호는 무엇인가요?", "reduced motion 미지원, layout property animation 남발, 무한 loop, focus trap 깨짐, 성능 증거 없음은 막아야 합니다.", "이 신호들은 취향 문제가 아니라 접근성·성능·사용성 결함으로 이어집니다.", "REDUCED MOTION RELEASE GATE, performance trace, a11y capture, motion token diff", f("무한 loop는 모두 나쁜가요?", "성능 증거 최소 기준은?", "출시 후 무엇을 모니터링하나요?")),
      item("모션 경험이 적을 때 답변은 어떻게 방어하나요?", "직접 경험 범위를 밝히고, token, reduced motion, transform-only, performance trace, visual regression으로 검증하겠다고 답합니다.", "라이브러리 이름만 말하면 실제 motion 품질을 판단하는 기준이 없다고 평가받습니다.", "motion validation checklist, prototype plan, reduced motion fixture, performance budget", f("라이브러리를 몰라도 답할 수 있나요?", "디자인 감각 질문은?", "실무 증거는 무엇으로 대체하나요?")),
    ],
  },
  {
    id: "engineering-frontend-graphics-3d-qa",
    title: "프론트엔드 그래픽·3D·WebGL Q&A",
    source: "프론트엔드 그래픽·3D·WebGL",
    subtitle: "SVG, Canvas, WebGL, Three.js, asset pipeline, GPU 자원, fallback을 검증 가능한 답변으로 훈련합니다.",
    questions: [
      item("SVG, Canvas, WebGL은 어떻게 선택하나요?", "DOM 접근성과 벡터 선명도가 중요하면 SVG, 많은 픽셀/도형을 직접 그리면 Canvas, 3D/GPU 대량 렌더링이면 WebGL을 고릅니다.", "표현 도구를 유행으로 고르면 접근성, 성능, hit testing, 유지보수 비용이 맞지 않습니다.", "rendering decision matrix, element count benchmark, accessibility fallback, GPU trace", f("SVG가 느려지는 기준은?", "Canvas 접근성은 어떻게 보완하나요?", "WebGL이 과한 경우는?")),
      item("Canvas에서 접근성은 어떻게 처리하나요?", "canvas 자체는 의미 구조가 부족하므로 DOM fallback, aria description, keyboard control, offscreen data table을 제공합니다.", "시각 결과만 그리면 screen reader와 keyboard 사용자는 정보를 얻거나 조작할 수 없습니다.", "a11y fallback DOM, keyboard test, screen reader note, canvas snapshot", f("차트 canvas는 어떻게 읽히게 하나요?", "hit target은 어떻게 구현하나요?", "fallback이 항상 필요한가요?")),
      item("Three.js 장면을 운영 품질로 검증하려면?", "nonblank render, camera framing, asset load, resize, context loss, reduced motion, mobile GPU budget을 확인합니다.", "로컬 데모만 통과하면 production asset 404, canvas blank, memory leak, 저사양 기기 crash를 놓칩니다.", "canvas pixel check, renderer.info, asset loading log, context loss fixture", f("검은 화면은 어떻게 디버그하나요?", "camera clipping은?", "모바일 GPU 예산은?")),
      item("WebGL context loss는 어떻게 대응하나요?", "contextlost/contextrestored 이벤트를 처리하고 resource 재생성, 사용자 메시지, fallback을 준비합니다.", "GPU 메모리 부족이나 브라우저 정책으로 context가 사라지면 장면이 영구 blank가 될 수 있습니다.", "context loss simulation, resource reload test, fallback capture, error log", f("context loss를 어떻게 재현하나요?", "texture는 다시 올려야 하나요?", "사용자에게 무엇을 보여주나요?")),
      item("texture memory는 왜 중요한가요?", "이미지 해상도, mipmap, format, 개수에 따라 GPU memory를 크게 씁니다. 화면 표시 크기보다 큰 texture는 줄여야 합니다.", "고해상도 texture를 그대로 쓰면 모바일에서 context loss와 긴 load가 발생합니다.", "texture inventory, GPU memory estimate, renderer.info.memory, asset budget", f("이미지 용량과 texture memory는 같은가요?", "mipmap은 언제 쓰나요?", "압축 texture는?")),
      item("draw call은 무엇이고 왜 줄이나요?", "draw call은 GPU에 그리기 명령을 보내는 단위입니다. 너무 많으면 CPU-GPU submission 비용이 커집니다.", "객체 수가 적어 보여도 material이 쪼개지거나 instancing이 없으면 frame time이 증가합니다.", "renderer.info.render.calls, frame time trace, instancing benchmark, material audit", f("mesh 수와 draw call은 같은가요?", "instancing은 언제?", "batching의 trade-off는?")),
      item("3D asset pipeline에서 무엇을 표준화하나요?", "포맷(GLTF/GLB), polygon budget, texture size, naming, compression, origin/scale, license, preload policy를 표준화합니다.", "디자이너 asset을 그대로 넣으면 scale 불일치, load 지연, material 깨짐, 저작권 문제가 생깁니다.", "asset checklist, GLTF validation, size budget, loading waterfall", f("GLB와 GLTF 차이는?", "Draco 압축의 비용은?", "asset license는 왜 보나요?")),
      item("3D scene loading UX는 어떻게 설계하나요?", "progress, skeleton/preview, error fallback, retry, low-quality placeholder를 준비합니다.", "큰 asset을 기다리는 동안 blank canvas만 보이면 사용자는 장애로 인식합니다.", "loading progress trace, fallback story, asset error fixture, LCP impact", f("progress가 정확하지 않으면?", "preview 이미지는?", "로드 실패는 어떻게 복구하나요?")),
      item("카메라와 컨트롤은 어떻게 검증하나요?", "초기 framing, clipping plane, orbit/pan/zoom 제한, keyboard/touch 대체 조작, reset view를 확인합니다.", "카메라가 모델을 벗어나거나 near/far 설정이 잘못되면 장면이 잘리거나 z-fighting이 생깁니다.", "camera fixture, viewport screenshot, control bounds test, reset action", f("near/far는 어떻게 잡나요?", "모바일 pinch는?", "reset view가 필요한 이유는?")),
      item("raycasting hit test에서 주의할 점은?", "좌표 변환, device pixel ratio, canvas offset, transparent object, hidden layer, interaction priority를 고려합니다.", "CSS scale이나 DPR을 무시하면 사용자가 클릭한 위치와 선택된 객체가 다릅니다.", "raycast fixture, DPR test, pointer coordinate log, selection overlay", f("transparent mesh도 hit되나요?", "UI overlay와 충돌하면?", "터치 target은 어떻게 키우나요?")),
      item("Canvas 해상도와 CSS 크기는 왜 다르나요?", "CSS 크기는 화면 배치, drawing buffer 크기는 실제 픽셀 해상도입니다. DPR을 반영하되 과도한 해상도는 성능 비용을 냅니다.", "CSS만 키우면 흐릿하고, DPR을 무제한 적용하면 GPU 메모리와 fill rate가 과해집니다.", "DPR matrix, canvas buffer size, sharpness capture, frame time metric", f("retina 대응은?", "resize 중에는?", "고DPR 기기에서 제한해야 하나요?")),
      item("OffscreenCanvas나 worker는 언제 쓰나요?", "main thread에서 비싼 drawing이나 image processing이 입력을 막을 때 고려합니다.", "worker 전송 비용과 브라우저 지원을 보지 않으면 오히려 복잡도만 늘 수 있습니다.", "main-thread trace, worker timing, transfer size, browser support matrix", f("DOM은 worker에서 접근 가능한가요?", "ImageBitmap은 왜 쓰나요?", "fallback은?")),
      item("WebGL 보안/프라이버시는 무엇을 보나요?", "cross-origin texture, canvas tainting, fingerprinting surface, untrusted shader/asset 처리를 봅니다.", "CORS가 맞지 않는 이미지를 그리면 canvas readback이 막히고, 외부 asset 로딩이 privacy surface를 늘립니다.", "CORS header check, tainted canvas fixture, asset allowlist, privacy review", f("canvas tainting은?", "외부 texture는?", "GPU 정보 수집은?")),
      item("그래픽 fallback은 어떻게 설계하나요?", "WebGL unsupported, context loss, reduced motion, low power mode에서 정적 이미지, SVG, 표, 2D canvas로 대체합니다.", "fallback 없이 핵심 정보를 3D에만 담으면 일부 사용자는 제품 기능을 사용할 수 없습니다.", "feature detection, fallback screenshot, no-WebGL browser test, content parity check", f("fallback에도 같은 정보가 있어야 하나요?", "성능 낮은 기기 감지는?", "사용자 선택권은?")),
      item("shader를 쓸 때 운영 리스크는?", "브라우저/GPU별 컴파일 차이, precision, 성능, 디버깅 난이도, fallback을 고려해야 합니다.", "데스크톱 GPU에서만 확인한 shader가 모바일에서 깨지거나 compile fail을 낼 수 있습니다.", "shader compile log, device matrix, GPU timing, fallback material", f("precision qualifier는?", "shader error는 어디서 보나요?", "postprocessing 비용은?")),
      item("WebGL memory leak은 어떻게 찾나요?", "geometry, material, texture dispose, render target, event listener cleanup을 확인합니다.", "React unmount 후 Three.js resource를 dispose하지 않으면 scene 전환마다 GPU memory가 증가합니다.", "renderer.info.memory, heap/GPU profile, route transition fixture, dispose audit", f("dispose는 무엇에 호출하나요?", "texture cache는?", "React lifecycle과 어떻게 맞추나요?")),
      item("차트 라이브러리는 어떻게 고르나요?", "데이터 규모, interaction, 접근성, export, SSR, bundle size, theming, animation 비용을 비교합니다.", "예쁜 기본 차트만 보고 고르면 대량 데이터, keyboard 접근, custom tooltip, 성능에서 막힙니다.", "library decision matrix, bundle diff, data volume benchmark, a11y audit", f("SVG chart와 canvas chart 선택은?", "tooltip 접근성은?", "서버 렌더링은?")),
      item("데이터 시각화에서 왜 scale이 중요한가요?", "scale은 값을 화면 위치·색·크기로 매핑하는 계약입니다. domain, clamp, log/linear, missing value 처리를 명시해야 합니다.", "축 범위나 색상 scale이 임의이면 사용자가 차이를 과대/과소 해석합니다.", "scale spec, sample dataset, visual review, edge case snapshot", f("0 기준 축은 항상 필요하나요?", "log scale은 언제?", "missing data는 어떻게 표시하나요?")),
      item("색상으로만 정보를 전달하면 왜 안 되나요?", "색각 다양성과 접근성을 고려해 pattern, label, shape, text를 함께 사용해야 합니다.", "위험/정상 상태를 색만으로 구분하면 일부 사용자는 의미를 알 수 없습니다.", "contrast check, color-blind simulation, legend audit, non-color cue test", f("WCAG contrast만 보면 충분한가요?", "legend는 어떻게?", "heatmap은?")),
      item("그래픽 export 기능은 무엇을 고려하나요?", "해상도, 배경색, 폰트 로딩, CORS image, data attribution, 개인정보 마스킹을 봅니다.", "화면 캡처를 그대로 저장하면 깨진 폰트, 투명 배경, 외부 이미지 차단, 민감 정보 유출이 생길 수 있습니다.", "export fixture, pixel diff, CORS test, redaction checklist", f("SVG export와 PNG export 차이는?", "폰트는 어떻게 포함하나요?", "민감 정보는?")),
      item("3D와 React 상태를 어떻게 연결하나요?", "렌더 루프의 mutable scene state와 React declarative state 경계를 명확히 합니다. 자주 변하는 frame state는 React rerender로 밀어넣지 않습니다.", "매 프레임 React state를 업데이트하면 렌더링 비용과 input latency가 커집니다.", "render count, frame loop trace, state boundary note, interaction fixture", f("react-three-fiber는 어떻게 다르나요?", "state store를 써야 하나요?", "UI overlay와 scene state 동기화는?")),
      item("Animation loop는 언제 멈춰야 하나요?", "정적 장면, hidden tab, offscreen canvas, reduced motion에서는 demand-driven render나 pause를 고려합니다.", "항상 requestAnimationFrame을 돌리면 배터리와 CPU를 낭비합니다.", "RAF count, visibilitychange test, battery/CPU profile, renderer invalidation log", f("invalidate 방식은?", "tab hidden에서 브라우저가 알아서 줄이지 않나요?", "동영상 texture는?")),
      item("postprocessing은 어떤 비용이 있나요?", "bloom, SSAO, depth of field 등은 추가 render pass와 texture memory를 요구합니다.", "시각 효과를 많이 쌓으면 저사양 기기에서 frame budget을 초과합니다.", "render pass count, GPU timing, effect toggle benchmark, quality setting", f("bloom은 언제 과한가요?", "quality preset은?", "모바일에서 끄나요?")),
      item("WebGL 디버깅은 어떤 순서로 하나요?", "console error, shader compile, asset load, camera, material, light, render loop, context 상태를 순서대로 봅니다.", "검은 화면을 한 번에 추측하면 camera clipping, light 없음, material 문제, asset 경로 문제를 구분하지 못합니다.", "debug checklist, renderer.info, asset log, camera helper screenshot", f("scene에 있는데 안 보이면?", "light 문제는?", "material이 검게 나오면?")),
      item("그래픽 기능의 테스트 자동화는 어떻게 하나요?", "canvas nonblank, pixel threshold, screenshot diff, interaction hit test, fallback rendering을 자동화합니다.", "DOM assertion만으로는 canvas/WebGL이 실제로 그려졌는지 알 수 없습니다.", "canvas pixel check, Playwright screenshot, hit test fixture, fallback test", f("픽셀 테스트가 flaky하면?", "threshold는?", "3D deterministic render는?")),
      item("그래픽 성능 예산은 어떻게 잡나요?", "target device, FPS, frame time, memory, asset size, initial load, interaction latency를 정합니다.", "데모 장비 기준으로만 잡으면 실제 사용자 기기에서 blank나 jank가 발생합니다.", "device performance matrix, renderer stats, asset budget, RUM custom metric", f("30fps도 괜찮은가요?", "asset budget은?", "사용자 기기별 degrade는?")),
      item("지도/공간 UI에서 무엇을 주의하나요?", "tile loading, coordinate projection, clustering, marker count, hit testing, accessibility list fallback을 봅니다.", "모든 marker를 DOM으로 찍으면 성능이 떨어지고, 지도에만 정보를 두면 접근성이 낮습니다.", "marker benchmark, cluster test, tile waterfall, list fallback audit", f("clustering 기준은?", "좌표계 변환은?", "지도 없는 대체 UI는?")),
      item("그래픽 PR 리뷰에서 막아야 할 위험은?", "fallback 없음, asset budget 없음, dispose 누락, context loss 미대응, 접근성 대체 없음, canvas blank 검증 없음입니다.", "이 항목들은 나중에 고치기 어렵고 사용자 환경별 장애로 바로 이어집니다.", "CANVAS WEBGL AUTOMATION GATE, renderer.info, fallback capture, a11y audit", f("최소 증거는?", "디자인 시안만 있으면?", "운영 모니터링은?")),
      item("그래픽 경험이 적을 때 어떻게 답변하나요?", "도구 이름보다 선택 기준, GPU 자원, fallback, 접근성, 자동화 검증을 말하고 직접 경험 범위를 분리합니다.", "Three.js API만 나열하면 운영 가능한 그래픽 기능을 설계할 수 있는지 증명하지 못합니다.", "graphics decision checklist, prototype validation plan, device matrix, fallback spec", f("Three.js를 깊게 몰라도?", "수학 질문이 나오면?", "포트폴리오 증거는?")),
    ],
  },
  {
    id: "engineering-frontend-performance-qa",
    title: "프론트엔드 성능·진단 Q&A",
    source: "프론트엔드 성능·진단",
    subtitle: "Web Vitals, 번들, 렌더링, DevTools, React Profiler, RUM을 수치와 증거로 답합니다.",
    questions: [
      item("프론트엔드 성능을 어디서부터 진단하나요?", "사용자 영향 지표인 LCP, INP, CLS, error rate, route별 RUM을 먼저 보고 network, main thread, rendering, backend wait로 분해합니다.", "Lighthouse 점수만 보면 실제 사용자 기기·네트워크·로그인 상태의 병목을 놓칩니다.", "RUM dashboard, Web Vitals attribution, Performance trace, network waterfall", f("실험실 점수와 RUM이 다르면?", "route별로 봐야 하는 이유는?", "성능 문제를 백엔드와 어떻게 나누나요?")),
      item("LCP가 느릴 때 무엇을 보나요?", "TTFB, render-blocking resource, LCP element load priority, image size/format, client rendering delay를 나눠 봅니다.", "이미지만 압축하면 서버 응답 지연이나 JS hydration 지연 때문에 개선이 안 될 수 있습니다.", "LCP attribution, server timing, priority hint, image audit", f("LCP element가 바뀌면?", "preload는 언제?", "SSR이 항상 LCP에 좋은가요?")),
      item("INP가 나쁠 때 어떻게 좁히나요?", "느린 interaction을 찾고 event handler, long task, render cost, layout, third-party script를 분해합니다.", "평균 입력 지연이 괜찮아도 특정 컴포넌트의 긴 작업이 p75/p98을 망칠 수 있습니다.", "INP attribution, long task trace, React Profiler, interaction marker", f("FID와 INP 차이는?", "debounce로 해결되나요?", "React rerender와 INP 연결은?")),
      item("CLS는 왜 생기나요?", "이미지/광고/폰트/동적 콘텐츠의 크기 예약 부족, late injection, hydration 차이로 layout shift가 생깁니다.", "시각적으로 작은 이동도 사용자가 버튼을 잘못 누르게 만들 수 있습니다.", "CLS attribution, layout shift rectangles, image dimension audit, font loading strategy", f("animation도 CLS인가요?", "skeleton이 CLS를 줄이나요?", "font swap은?")),
      item("번들 크기는 어떻게 줄이나요?", "route-level code splitting, dependency audit, tree shaking, dynamic import, polyfill 점검, asset 압축을 순서대로 봅니다.", "무작정 minify만 하면 큰 dependency, 중복 polyfill, 초기 route에 묶인 admin code는 남아 있습니다.", "bundle analyzer, coverage tab, route chunk map, dependency diff", f("dynamic import는 어디에?", "tree shaking이 안 되는 이유는?", "gzip만 보면 충분한가요?")),
      item("React 렌더링 병목은 어떻게 찾나요?", "Profiler로 commit duration, render count, why-did-render 원인, context 구독 범위, memoization 효과를 봅니다.", "useMemo/useCallback을 무작정 넣으면 비용은 늘고 실제 rerender 원인은 그대로일 수 있습니다.", "React Profiler export, render count, flamegraph, memoization benchmark", f("memo는 언제 효과가 있나요?", "context가 왜 문제인가요?", "key 변경은 어떤 영향을 주나요?")),
      item("list virtualization은 언제 필요한가요?", "DOM node 수와 render cost가 사용자 기기에서 frame budget을 넘을 때 사용합니다.", "무조건 virtualization을 넣으면 accessibility, find-in-page, dynamic height, scroll restoration이 어려워집니다.", "DOM node count, scroll FPS, virtualization fixture, a11y fallback", f("동적 높이는?", "SEO 콘텐츠에도 쓰나요?", "가상 리스트에서 focus는?")),
      item("image optimization은 무엇을 포함하나요?", "format, responsive srcset, intrinsic size, lazy loading, priority, CDN caching, decoding 전략을 포함합니다.", "모든 이미지를 lazy로 두면 hero LCP가 늦어지고, 원본 해상도를 그대로 쓰면 네트워크 비용이 큽니다.", "image waterfall, LCP element audit, srcset test, CDN cache header", f("WebP/AVIF 선택은?", "lazy loading의 함정은?", "priority는 언제 높이나요?")),
      item("font가 성능에 미치는 영향은?", "font file size, preload, display strategy, subset, fallback metric이 LCP와 CLS에 영향을 줍니다.", "웹폰트를 늦게 로드하거나 fallback metrics가 다르면 텍스트가 밀리고 CLS가 생깁니다.", "font waterfall, font-display audit, CLS attribution, subset diff", f("font-display swap은 항상 좋은가요?", "variable font는?", "한글 폰트 최적화는?")),
      item("third-party script는 어떻게 관리하나요?", "비즈니스 가치, load timing, async/defer, sandbox, consent, long task 영향, 장애 격리를 봅니다.", "analytics/chat script가 main thread를 막거나 개인정보 동의 전에 실행될 수 있습니다.", "third-party inventory, long task attribution, consent test, script loading policy", f("defer와 async 차이는?", "태그 매니저 위험은?", "서드파티 장애는 어떻게 격리하나요?")),
      item("Network waterfall에서 무엇을 읽나요?", "DNS, TCP/TLS, TTFB, download, priority, blocking, request chain, cache hit/miss를 봅니다.", "총 시간만 보면 우선순위 문제, render-blocking chain, cache 미스 원인을 놓칩니다.", "HAR, DevTools waterfall, cache header, priority column", f("TTFB가 크면 무조건 백엔드인가요?", "HTTP/2면 waterfall이 사라지나요?", "cache hit은 어디서 보나요?")),
      item("Service Worker는 성능에 어떻게 쓰나요?", "offline, precache, runtime cache, navigation preload, stale-while-revalidate에 쓸 수 있지만 versioning과 cache invalidation이 핵심입니다.", "잘못된 SW는 오래된 JS를 계속 제공해 배포 후 장애를 만들 수 있습니다.", "SW lifecycle log, cache inventory, update flow test, offline fixture", f("skipWaiting은 위험한가요?", "API cache는?", "오래된 bundle은 어떻게 제거하나요?")),
      item("SSR/SSG/CSR 성능 trade-off는?", "SSR은 초기 HTML과 SEO에 유리하지만 서버 비용과 hydration 비용이 있고, CSR은 단순하지만 초기 표시가 늦을 수 있습니다. SSG는 변경 빈도와 개인화 제약을 봅니다.", "렌더링 방식을 하나의 정답으로 고르면 데이터 개인화, cache, 배포 복잡도에서 실패합니다.", "rendering decision record, TTFB/LCP comparison, hydration trace, cache policy", f("SSR이면 SEO가 끝인가요?", "hydration 비용은?", "ISR은 언제?")),
      item("Hydration 성능은 어떻게 개선하나요?", "JS 크기, component island, lazy hydration, server component, event handler 수, browser-only code를 줄입니다.", "HTML은 빨리 보이는데 상호작용이 늦으면 사용자는 페이지가 멈췄다고 느낍니다.", "hydration trace, JS coverage, INP after load, interaction readiness marker", f("partial hydration은?", "server component 장점은?", "interactive marker는 어떻게?")),
      item("CSS 성능은 어디서 문제가 되나요?", "selector 비용보다 style recalculation, layout invalidation, CSS size, unused rules, critical CSS가 실무에서 더 중요합니다.", "거대한 CSS와 late loaded stylesheet는 render blocking과 style 계산 비용을 키웁니다.", "Coverage tab, style recalculation trace, critical CSS audit, CSS bundle diff", f("복잡한 selector는?", "CSS-in-JS는 느린가요?", "critical CSS는 언제?")),
      item("메모리 누수는 어떻게 찾나요?", "heap snapshot, allocation timeline, detached DOM, event listener, timer, cache growth, WebGL resource를 봅니다.", "route를 반복 이동할 때 memory가 계속 증가하면 결국 tab crash나 성능 저하로 이어집니다.", "heap snapshot diff, detached node count, listener audit, route loop test", f("React에서 흔한 누수는?", "closure가 왜 문제인가요?", "cache는 언제 비워야 하나요?")),
      item("성능 budget은 어떻게 정하나요?", "target device와 business route별 LCP/INP/CLS, JS size, image size, request count, long task 기준을 잡습니다.", "전체 앱에 하나의 budget만 두면 checkout 같은 핵심 route와 내부 admin route의 우선순위가 섞입니다.", "performance budget policy, CI budget check, route RUM, bundle threshold", f("budget 초과 시 배포를 막나요?", "기준 수치는 어떻게 잡나요?", "예외는 어떻게 승인하나요?")),
      item("DevTools Performance 패널에서 무엇을 보나요?", "main thread flame chart, long task, layout/paint, network, screenshots, user timing marker를 봅니다.", "녹화만 하고 총 시간만 보면 어떤 interaction이 무엇 때문에 느린지 알 수 없습니다.", "Performance trace, user timing markers, bottom-up analysis, screenshots", f("Bottom-Up과 Call Tree 차이는?", "user timing은 왜 넣나요?", "녹화 환경은?")),
      item("React Profiler와 브라우저 Performance 차이는?", "React Profiler는 React render/commit 원인을, Performance는 전체 browser main thread와 rendering pipeline을 보여줍니다.", "Profiler만 보면 layout, paint, network, third-party script를 놓칠 수 있습니다.", "Profiler export, Performance trace, correlation marker, render commit log", f("둘을 어떻게 연결하나요?", "commit이 길면?", "render가 빨라도 느린 이유는?")),
      item("Core Web Vitals를 CI에서만 보면 안 되는 이유는?", "CI/lab은 재현성과 회귀 탐지에 좋고, RUM은 실제 사용자 환경을 보여줍니다. 둘을 함께 봐야 합니다.", "CI가 빠른 네트워크와 고정 기기로 돌면 실제 저사양 모바일 문제를 놓칩니다.", "Lighthouse CI, RUM p75, device segmentation, field/lab diff", f("p75 기준은 왜?", "RUM 표본이 적으면?", "실험실 재현은 어떻게?")),
      item("cache header는 어떻게 성능에 영향을 주나요?", "immutable asset은 긴 max-age와 content hash, HTML/API는 freshness와 revalidation 정책을 분리합니다.", "HTML을 길게 cache하면 새 배포가 보이지 않고, hashed asset을 짧게 cache하면 네트워크 비용이 늘어납니다.", "Cache-Control audit, CDN hit ratio, release cache test, ETag validation", f("no-store와 no-cache 차이는?", "stale-while-revalidate는?", "CDN purge는 언제?")),
      item("preload, prefetch, preconnect는 어떻게 쓰나요?", "critical resource는 preload, 다음 탐색 후보는 prefetch, 외부 origin 연결 비용은 preconnect로 줄입니다.", "과하게 쓰면 bandwidth 경쟁과 우선순위 역전으로 오히려 LCP가 느려집니다.", "resource hint audit, waterfall priority, LCP before/after, bandwidth trace", f("preload 누락 경고는?", "prefetch는 모바일에서?", "preconnect가 너무 많으면?")),
      item("성능 개선 결과는 어떻게 보고하나요?", "변경 전후 조건, p75/p95, route, device, sample size, 부작용, rollback 조건을 함께 씁니다.", "단일 Lighthouse 점수만 보고하면 실제 사용자 개선인지 판단하기 어렵습니다.", "performance regression packet, RUM comparison, trace attachment, release note", f("수치가 흔들리면?", "표본은 얼마나?", "부작용은 무엇을 보나요?")),
      item("성능과 접근성이 충돌할 때 어떻게 하나요?", "접근성 필수 의미 구조와 keyboard 흐름은 유지하고, 비용이 큰 부분은 점진 렌더링이나 fallback으로 조정합니다.", "성능을 이유로 semantic DOM이나 focus 처리를 제거하면 품질 기준을 낮추는 것입니다.", "a11y/performance decision note, DOM count, keyboard test, RUM metric", f("가상화와 screen reader는?", "aria를 줄이면 빨라지나요?", "성능 budget 예외는?")),
      item("대시보드 성능은 어떤 지표가 중요한가요?", "initial load, filter interaction latency, chart render time, data refresh cost, memory growth를 봅니다.", "첫 로드만 빠르고 필터 변경마다 전체 chart를 다시 그리면 업무 도구로는 느립니다.", "interaction timing, chart render benchmark, data cache trace, memory profile", f("차트가 많으면?", "필터 변경 최적화는?", "자동 refresh는?")),
      item("성능 회귀를 어떻게 막나요?", "bundle budget, Web Vitals alert, visual/performance smoke, profiler evidence requirement, dependency review를 둡니다.", "한 번 최적화하고 끝내면 새 dependency나 UI 변경으로 금방 회귀합니다.", "CI budget, RUM alert, dependency diff, PR checklist", f("경고 기준은?", "false positive는?", "리뷰어가 뭘 봐야 하나요?")),
      item("성능 문제를 제품 우선순위로 설득하려면?", "사용자 영향, conversion, task completion, support ticket, infra cost와 연결해 말합니다.", "개발자 체감 느림만 말하면 다른 기능 우선순위에 밀릴 수 있습니다.", "business metric correlation, funnel drop, RUM segment, user session replay", f("수익 영향이 없으면?", "내부 도구 성능은?", "기술부채로 어떻게 표현하나요?")),
      item("성능 답변에서 senior-level 증거는 무엇인가요?", "원인 분해 trace, 사용자 지표, 변경 전후 비교, 재발 방지 budget, rollback 기준입니다.", "빠르게 만들었다는 말만 있고 수치와 trace가 없으면 검증 가능한 답변이 아닙니다.", "PERFORMANCE REGRESSION PACKET, trace, RUM chart, budget policy", f("수치가 없으면 어떻게 답하나요?", "추정과 사실을 어떻게 나누나요?", "외부 검증에서 보여줄 증거는?")),
      item("성능 경험이 적을 때 답변은 어떻게 구성하나요?", "Web Vitals 기준, DevTools 진단 순서, React Profiler 사용, RUM/lab 차이, 개선 검증 계획을 말합니다.", "도구 이름만 나열하면 병목을 분해할 수 있는지 드러나지 않습니다.", "diagnostic checklist, lab reproduction, RUM plan, before/after template", f("Lighthouse만 써봤다면?", "React가 아니면?", "백엔드 병목이면?")),
    ],
  },
  {
    id: "engineering-frontend-seo-analytics-qa",
    title: "SEO·AEO·GEO·애널리틱스 Q&A",
    source: "SEO·AEO·GEO·애널리틱스",
    subtitle: "검색 발견성, AI 답변 가능성, 구조화 데이터, 이벤트 측정, attribution을 답변으로 훈련합니다.",
    questions: [
      item("기술 SEO의 핵심은 무엇인가요?", "검색 엔진이 URL을 발견, 크롤링, 렌더링, 색인, 이해할 수 있게 만드는 것입니다. sitemap, robots, canonical, status code, structured data, 성능이 함께 작동해야 합니다.", "메타 태그만 수정하면 duplicate URL, blocked resource, JS rendering 실패, canonical 오류를 놓칩니다.", "technical SEO release packet, Search Console, crawl test, canonical audit", f("SEO와 성능은 어떻게 연결되나요?", "CSR 페이지도 색인되나요?", "canonical은 언제 위험한가요?")),
      item("AEO/GEO는 SEO와 무엇이 다른가요?", "SEO가 검색 결과 노출을 목표로 한다면 AEO/GEO는 답변 엔진과 생성형 검색이 인용·요약하기 쉬운 구조와 근거를 제공합니다.", "키워드만 반복하면 AI 답변에서 신뢰 가능한 근거로 선택되기 어렵습니다.", "answer-first block, citation structure, entity schema, AI answer quality review", f("FAQ schema만 넣으면 되나요?", "LLM이 좋아하는 문서 구조는?", "근거 출처는 어떻게 표시하나요?")),
      item("검색 의도는 어떻게 문서에 반영하나요?", "informational, navigational, transactional, comparison 의도를 분리하고, 첫 화면과 heading에 답변 방향을 명확히 둡니다.", "검색어만 보고 콘텐츠를 만들면 사용자가 실제로 해결하려는 질문과 CTA가 어긋납니다.", "query intent map, SERP review, content outline, CTR/engagement metric", f("같은 키워드에 의도가 섞이면?", "롱테일은?", "의도 변화는 어떻게 감지하나요?")),
      item("canonical은 왜 중요한가요?", "같은 콘텐츠가 여러 URL로 접근될 때 대표 URL을 알려 중복 색인과 ranking signal 분산을 줄입니다.", "필터/정렬/추적 파라미터가 모두 색인되면 검색 품질과 crawl budget이 낭비됩니다.", "canonical tag audit, URL parameter policy, Search Console duplicate report, crawl sample", f("canonical과 redirect 차이는?", "페이지네이션 canonical은?", "다국어 canonical은?")),
      item("robots.txt와 noindex 차이는 무엇인가요?", "robots.txt는 크롤링 접근을 제어하고, noindex는 색인 제외 신호입니다. 크롤링이 막히면 noindex를 보지 못할 수 있습니다.", "민감 페이지를 robots.txt만으로 숨기면 URL 존재가 노출될 수 있고 보안 수단도 아닙니다.", "robots test, meta robots audit, Search Console coverage, security review", f("robots로 보안이 되나요?", "nofollow는?", "noarchive는 언제?")),
      item("structured data는 어떻게 검증하나요?", "schema.org 타입, required/recommended fields, 실제 화면 콘텐츠와의 일치, validation error를 확인합니다.", "보이지 않는 정보를 구조화 데이터에만 넣으면 검색 정책 위반과 rich result 누락이 생길 수 있습니다.", "Rich Results Test, schema validator, content parity check, release checklist", f("JSON-LD가 좋은 이유는?", "FAQ schema 남용은?", "오류가 있으면 색인이 막히나요?")),
      item("sitemap은 무엇을 담아야 하나요?", "색인시키려는 canonical URL과 lastmod 등 discovery에 필요한 정보를 담고, blocked/noindex/중복 URL은 빼야 합니다.", "모든 URL을 넣으면 crawler가 중요하지 않은 페이지에 예산을 씁니다.", "sitemap diff, canonical match test, Search Console sitemap report, URL inventory", f("lastmod는 정확해야 하나요?", "동적 사이트맵은?", "삭제 URL은?")),
      item("SSR이 SEO를 항상 해결하나요?", "SSR은 초기 HTML 제공에 유리하지만 canonical, metadata, structured data, status code, content quality, performance가 함께 필요합니다.", "SSR만 도입하고 hydration 오류나 빈 콘텐츠를 내보내면 검색 품질이 좋아지지 않습니다.", "rendered HTML snapshot, metadata audit, hydration log, crawl test", f("CSR도 검색될 수 있나요?", "pre-render는?", "status code는 왜 중요하나요?")),
      item("metadata는 어떻게 설계하나요?", "title, description, Open Graph, Twitter card, canonical, hreflang을 페이지 목적과 검색 의도에 맞게 만듭니다.", "모든 페이지가 같은 title/description이면 검색 결과에서 구분되지 않고 CTR이 떨어집니다.", "metadata snapshot, duplicate title report, SERP preview, social card test", f("description은 ranking 요소인가요?", "OG와 SEO title은?", "동적 metadata는?")),
      item("hreflang은 언제 필요하고 무엇이 어렵나요?", "다국어/다지역 동일 콘텐츠에서 언어와 지역 대체 URL을 알려줄 때 필요합니다.", "상호 참조, canonical, locale URL이 어긋나면 검색 엔진이 잘못된 언어 페이지를 보여줄 수 있습니다.", "hreflang matrix, reciprocal link test, locale URL audit, Search Console international report", f("x-default는?", "자동 번역 페이지는?", "canonical과 충돌하면?")),
      item("애널리틱스 이벤트는 어떻게 정의하나요?", "DOM 클릭이 아니라 사용자 의도, action, target, result, error, context를 담는 product event로 정의합니다.", "button_text만 보내면 퍼널, 실패, 재시도, 권한 차단을 분석할 수 없습니다.", "event spec template, tracking plan, QA event log, privacy review", f("page_view와 action event 차이는?", "event naming은?", "result 필드는 왜?")),
      item("GA4 같은 도구를 붙일 때 주의할 점은?", "consent, PII 금지, 중복 이벤트, SPA route tracking, UTM 보존, debug view 검증을 봅니다.", "태그만 설치하면 route 변경 누락, consent 이전 전송, 중복 page_view가 생길 수 있습니다.", "GA4 debug view, consent mode test, route tracking fixture, event dedupe log", f("SPA page_view는?", "PII 예시는?", "중복 이벤트는 어떻게 찾나요?")),
      item("UTM은 어떻게 관리하나요?", "source, medium, campaign, content, term의 naming convention과 대소문자, redirect 보존 정책을 정합니다.", "임의 UTM이 쌓이면 attribution report가 분산되어 캠페인 성과를 해석할 수 없습니다.", "UTM naming policy, redirect test, campaign report, normalization rule", f("대소문자는?", "내부 링크에 UTM을?", "short link redirect는?")),
      item("conversion funnel은 어떻게 설계하나요?", "노출, 진입, 핵심 행동, 실패, 완료를 단계별 event로 나누고 denominator를 명확히 합니다.", "완료 이벤트만 보면 어디서 이탈했는지, 오류 때문인지 의도 변경 때문인지 알 수 없습니다.", "funnel spec, event sequence test, drop-off report, error correlation", f("분모는 어떻게 정하나요?", "부분 완료는?", "A/B 실험과 연결은?")),
      item("privacy와 analytics는 어떻게 균형 잡나요?", "목적 제한, 최소 수집, 익명화/가명화, consent, retention, redaction을 기본으로 둡니다.", "분석 편의를 위해 user input이나 email을 보내면 법적·신뢰 리스크가 큽니다.", "privacy review, PII scanner, consent log, data retention policy", f("IP는 개인정보인가요?", "userId는 보내도 되나요?", "삭제 요청은?")),
      item("Search Console에서 무엇을 보나요?", "index coverage, crawl errors, Core Web Vitals, query/CTR, canonical 선택, sitemap 상태를 봅니다.", "순위만 보면 색인 문제, technical error, CTR 문제를 분리하지 못합니다.", "Search Console export, coverage report, query report, URL inspection", f("impression이 줄면?", "CTR이 낮으면?", "URL inspection은 언제?")),
      item("SEO 성과는 어떤 지표로 봐야 하나요?", "impression, CTR, average position, landing conversion, indexed pages, crawl errors, Web Vitals를 함께 봅니다.", "traffic만 보면 브랜드 캠페인, 계절성, 검색 의도 변화와 technical SEO 효과를 구분하기 어렵습니다.", "SEO health window, Search Console, analytics landing report, release annotation", f("순위가 올라도 전환이 낮으면?", "계절성은?", "release annotation은 왜?")),
      item("콘텐츠 구조는 AI 답변에 어떻게 유리하게 만드나요?", "질문형 heading, 짧은 결론, 근거 bullet, 표, 정의-조건-예외 구조, 최신성 표시를 둡니다.", "긴 마케팅 문단만 있으면 답변 엔진이 구체적 근거를 추출하기 어렵습니다.", "answer block audit, entity coverage, citation snippet review, AI query test", f("표가 좋은 이유는?", "FAQ는 어디에?", "날짜 표시는?")),
      item("entity SEO는 무엇인가요?", "브랜드, 제품, 사람, 장소, 개념의 관계를 명확히 해 검색 엔진이 주제를 이해하게 하는 접근입니다.", "키워드만 반복하면 어떤 대상에 대한 신뢰 정보인지 모호합니다.", "entity map, organization schema, internal link graph, knowledge panel check", f("schema만 넣으면?", "내부 링크 역할은?", "브랜드 검색은?")),
      item("internal linking은 왜 중요한가요?", "사용자 탐색과 crawler discovery, topic authority 전달에 영향을 줍니다.", "관련 페이지가 고립되면 좋은 콘텐츠도 발견과 ranking signal을 얻기 어렵습니다.", "internal link audit, orphan page report, anchor text review, crawl depth metric", f("anchor text는?", "footer 링크만으로 충분?", "링크가 너무 많으면?")),
      item("404/redirect는 SEO에서 어떻게 다루나요?", "삭제, 이동, 통합 목적에 따라 404/410/301/302를 고르고 internal link와 sitemap을 정리합니다.", "모든 오류를 홈으로 redirect하면 soft 404와 사용자 혼란이 생깁니다.", "redirect map, crawl error report, status code test, sitemap cleanup", f("410은 언제?", "302와 301 차이는?", "soft 404는?")),
      item("SPA에서 route analytics는 어떻게 해야 하나요?", "client route change를 page_view로 명시 전송하고 title/path/referrer context를 정확히 갱신합니다.", "초기 로드만 추적하면 대부분의 화면 이동이 분석에서 사라집니다.", "route tracking test, debug view, history listener audit, duplicate guard", f("hash route는?", "modal route는 page_view인가요?", "referrer는?")),
      item("A/B 테스트 이벤트는 어떻게 설계하나요?", "exposure, variant, assignment id, conversion, guardrail metric을 명확히 기록합니다.", "노출 이벤트 없이 전환만 보면 실제로 실험을 본 사용자와 보지 않은 사용자가 섞입니다.", "experiment spec, exposure log, guardrail dashboard, sample ratio check", f("SRM은?", "동시 실험 충돌은?", "guardrail metric은?")),
      item("마케팅 script와 성능의 균형은?", "비즈니스 가치와 성능 비용을 비교하고 consent 이후 지연 로드, sandbox, server-side tagging을 검토합니다.", "모든 태그를 초기 로드에 넣으면 LCP/INP와 개인정보 기준을 동시에 해칠 수 있습니다.", "tag inventory, long task attribution, consent test, business owner map", f("태그 삭제 기준은?", "server-side tagging은?", "chat widget은?")),
      item("SEO 릴리스 체크리스트에는 무엇이 들어가나요?", "metadata, canonical, robots, sitemap, structured data, status code, Web Vitals, analytics, Search Console 확인이 들어갑니다.", "콘텐츠 배포만 하고 technical gate가 없으면 색인 누락과 측정 누락을 늦게 발견합니다.", "TECHNICAL SEO RELEASE PACKET, URL inspection, metadata snapshot, event QA", f("릴리스 직후 무엇을 보나요?", "색인은 언제 확인?", "롤백 기준은?")),
      item("analytics 데이터 품질은 어떻게 보장하나요?", "tracking plan, typed event schema, QA 환경 검증, 중복 방지, bot/internal traffic filtering을 둡니다.", "잘못 수집된 데이터는 나중에 보정하기 어렵고 제품 결정을 왜곡합니다.", "event schema, QA log, anomaly alert, data quality dashboard", f("이벤트 스키마 변경은?", "내부 트래픽은?", "bot은 어떻게?")),
      item("SEO/AEO 답변에서 senior-level 포인트는?", "검색 엔진의 처리 흐름, 사용자 의도, 기술 구현, 측정, privacy, 릴리스 후 health window를 연결하는 것입니다.", "메타 태그와 키워드만 말하면 제품 성장과 기술 품질을 함께 보는 역량이 부족해 보입니다.", "DISCOVERY AND MEASUREMENT MODEL, event spec, SEO health report, release annotation", f("개발자가 콘텐츠까지 알아야 하나요?", "성과가 늦게 나오는 문제는?", "외부 검증 증거는?")),
      item("SEO 경험이 적으면 어떻게 답변하나요?", "crawl-index-render-rank 흐름, canonical/metadata/schema 기본, Search Console 검증, 이벤트 측정 계획을 구체적으로 말합니다.", "블로그식 팁만 말하면 실제 릴리스에서 무엇을 확인할지 불분명합니다.", "SEO validation checklist, sample URL audit, Search Console plan, event spec draft", f("포트폴리오 증거는?", "AEO는 어떻게 연습?", "수치가 없으면?")),
    ],
  },
  {
    id: "engineering-frontend-quality-qa",
    title: "프론트엔드 품질·릴리스 Q&A",
    source: "프론트엔드 품질·릴리스",
    subtitle: "보안, 테스트, 배포, sourcemap, CDN cache, rollback, 릴리스 증거를 답변으로 훈련합니다.",
    questions: [
      item("프론트엔드 릴리스 품질 기준은 무엇인가요?", "기능 성공뿐 아니라 보안, 접근성, 성능, 브라우저 호환성, observability, rollback 가능성을 통과해야 합니다.", "로컬에서 보이는 화면만 확인하면 CDN cache, env, sourcemap, 권한, 실제 사용자 성능 문제를 놓칩니다.", "release checklist, E2E trace, Web Vitals, error dashboard, rollback drill", f("작은 변경도 릴리스 게이트가 필요한가요?", "게이트를 자동화하려면?", "배포 후 몇 시간 보나요?")),
      item("XSS를 프론트엔드에서 어떻게 설명하나요?", "untrusted source가 HTML/JS execution sink로 들어갈 때 발생합니다. escaping, sanitization, Trusted Types, CSP, unsafe sink 금지가 필요합니다.", "React가 기본 escape를 해도 dangerouslySetInnerHTML, markdown, SVG, URL, third-party widget에서 우회 경로가 생깁니다.", "source-sink map, XSS fixture, CSP violation report, sanitizer test", f("React면 XSS가 없나요?", "markdown 렌더링은?", "CSP는 무엇을 막나요?")),
      item("CSRF와 프론트엔드의 관계는?", "cookie 기반 인증에서는 브라우저가 자동으로 cookie를 보내므로 SameSite, CSRF token, origin 검증이 필요합니다.", "token을 JS에서 직접 보내는 구조와 cookie 세션 구조를 혼동하면 방어가 빠집니다.", "SameSite policy, CSRF negative test, request header audit, server validation log", f("SameSite=Lax면 충분한가요?", "CORS와 CSRF 차이는?", "SPA도 CSRF가 있나요?")),
      item("토큰 저장은 어떻게 판단하나요?", "XSS, CSRF, refresh rotation, session revocation, UX 요구를 기준으로 httpOnly secure cookie, memory, storage를 비교합니다.", "access token을 localStorage에 두면 XSS 시 탈취되기 쉽고, cookie는 CSRF 방어가 필요합니다.", "token storage decision, threat model, logout test, rotation log", f("httpOnly cookie 단점은?", "memory 저장은 새로고침 때?", "refresh token은 어디에?")),
      item("프론트엔드 secret은 왜 존재하면 안 되나요?", "브라우저 bundle은 사용자에게 전달되므로 API key나 secret은 노출된 값으로 봐야 합니다.", "환경변수 이름이 SECRET이어도 build 시 bundle에 들어가면 누구나 볼 수 있습니다.", "bundle scan, source map audit, secret scanning, network request review", f("public API key는?", "env prefix는?", "노출된 secret은 어떻게 대응?")),
      item("CORS 오류를 어떻게 진단하나요?", "브라우저 보안 정책, origin, preflight, credentials, allowed headers/methods, server response를 확인합니다.", "프론트에서 header를 억지로 추가해 해결하려 하면 실제로는 서버 CORS 정책이 맞지 않는 경우가 많습니다.", "preflight capture, response header audit, credentials test, server config diff", f("CORS는 보안인가요?", "credentials true이면?", "wildcard origin은 왜 위험?")),
      item("E2E 테스트는 무엇을 검증해야 하나요?", "핵심 사용자 여정의 실제 브라우저 동작, route, network, auth, accessibility smoke, visual state를 검증합니다.", "모든 케이스를 E2E로 넣으면 느리고 flaky해지며, 반대로 하나도 없으면 통합 회귀를 놓칩니다.", "Playwright trace, critical journey list, flake report, test pyramid", f("무엇을 E2E로 올리나요?", "mock과 real API 선택은?", "flaky는 어떻게 줄이나요?")),
      item("컴포넌트 테스트는 어디까지 하나요?", "props/state 조합, 사용자 이벤트, 접근성 role/name, error/loading 상태를 검증합니다.", "구현 세부 DOM 구조만 테스트하면 리팩터링에 취약하고 실제 사용자 행동을 검증하지 못합니다.", "Testing Library queries, user-event test, story coverage, axe check", f("snapshot test는?", "role query가 좋은 이유는?", "CSS는 어떻게 검증?")),
      item("시각 회귀 테스트는 언제 필요한가요?", "디자인 시스템, 핵심 화면, 차트/그래픽, responsive layout처럼 시각 깨짐 비용이 큰 곳에 필요합니다.", "단위 테스트가 통과해도 spacing, overflow, z-index, 반응형 깨짐은 놓칠 수 있습니다.", "visual baseline, viewport matrix, diff threshold, review workflow", f("threshold는?", "동적 데이터는?", "모든 페이지에 필요?")),
      item("접근성 테스트 자동화의 한계는?", "axe 같은 도구는 일부 규칙을 잡지만 keyboard flow, screen reader 맥락, 문구 의미는 사람이 확인해야 합니다.", "자동 검사 통과를 접근성 완료로 보면 focus order와 실제 announcement 문제를 놓칩니다.", "axe report, manual keyboard recording, screen reader smoke, WCAG checklist", f("자동화로 몇 퍼센트 잡나요?", "수동 테스트 최소 기준은?", "디자인 단계에서?")),
      item("sourcemap은 어떻게 운영하나요?", "에러 추적에는 필요하지만 공개 접근, source 노출, release id mapping, 업로드 보안 정책을 관리해야 합니다.", "sourcemap을 공개 CDN에 그대로 두면 내부 소스 구조와 주석이 노출될 수 있습니다.", "sourcemap upload log, release id, access policy, error stack deobfuscation", f("sourcemap을 배포하지 않으면?", "private sourcemap은?", "release id는 왜?")),
      item("CDN cache 때문에 배포가 깨지는 경우는?", "HTML과 JS asset cache 정책이 어긋나면 새 HTML이 오래된 JS를 참조하거나 반대 상황이 생깁니다.", "content hash 없는 asset을 길게 cache하면 사용자가 오래된 코드를 계속 받습니다.", "cache header audit, asset hash, purge log, stale bundle fixture", f("HTML은 어떻게 cache?", "immutable asset은?", "rollback과 cache는?")),
      item("환경변수 drift는 어떻게 막나요?", "환경별 required env schema, build-time/runtime 구분, validation, release diff를 둡니다.", "staging에는 있고 production에는 없는 env가 배포 후 런타임 오류를 만들 수 있습니다.", "env schema, startup validation, release config diff, smoke test", f("프론트 env는 왜 build-time인가요?", "secret env는?", "기본값을 코드에 넣어도?")),
      item("배포 후 모니터링은 무엇을 보나요?", "client error rate, route-specific Web Vitals, API failure, conversion, blank screen signal, release adoption을 봅니다.", "서버가 정상이어도 프론트 bundle 오류나 특정 브라우저 오류로 사용자는 장애를 겪을 수 있습니다.", "release dashboard, error tracking, RUM by version, synthetic smoke", f("몇 시간 봐야 하나요?", "브라우저별 segment는?", "blank screen은 어떻게 감지?")),
      item("rollback 기준은 어떻게 정하나요?", "error rate, core journey failure, Web Vitals regression, conversion drop, security issue 같은 threshold를 미리 정합니다.", "감으로 결정하면 복구가 늦고, 반대로 작은 오류에 과도하게 rollback할 수 있습니다.", "rollback playbook, release health window, threshold alert, decision log", f("forward fix와 rollback 선택은?", "DB/API 변경이 있으면?", "feature flag로 충분?")),
      item("feature flag 릴리스는 어떻게 검증하나요?", "flag default, targeting, exposure logging, kill switch, stale cleanup, permission과의 차이를 검증합니다.", "flag가 켜진 사용자와 꺼진 사용자의 cache/state가 섞이면 재현 어려운 버그가 생깁니다.", "flag matrix, exposure event, kill switch drill, cleanup ticket", f("flag default는?", "서버와 프론트 flag 불일치는?", "실험과 rollout 차이는?")),
      item("브라우저 호환성은 어떻게 관리하나요?", "지원 브라우저 matrix, polyfill, transpilation target, CSS feature support, 테스트 범위를 명시합니다.", "개발자 최신 Chrome에서만 확인하면 Safari/iOS/WebView에서 깨질 수 있습니다.", "browser matrix, caniuse review, cross-browser E2E, CSS support audit", f("Safari 이슈가 많은 이유는?", "polyfill 비용은?", "지원 종료는 어떻게?")),
      item("프론트엔드 보안 리뷰에서 source-sink 분석은?", "입력 source가 어느 변환을 거쳐 dangerous sink로 가는지 추적합니다. HTML, URL, script, style, postMessage sink를 구분합니다.", "입력 검증만 보고 실제 sink를 보지 않으면 sanitizer bypass와 DOM XSS를 놓칩니다.", "source-sink table, negative fixture, sanitizer config, Trusted Types report", f("URL도 sink인가요?", "style injection은?", "postMessage는?")),
      item("postMessage는 어떻게 안전하게 쓰나요?", "targetOrigin을 구체적으로 지정하고, 수신 시 origin/source/schema를 검증합니다.", "wildcard와 schema 검증 누락은 다른 origin이 메시지를 주입하는 경로가 됩니다.", "postMessage fixture, origin allowlist, schema parser, security test", f("targetOrigin *는 언제 위험?", "iframe source는?", "메시지 버전은?")),
      item("dependency 보안은 어떻게 관리하나요?", "lockfile, audit, maintainer 신뢰, transitive dependency, bundle impact, update test를 봅니다.", "보안 패치만 보고 major update를 무검증 적용하면 runtime 회귀가 생길 수 있습니다.", "dependency diff, npm audit, changelog review, smoke test", f("audit false positive는?", "pinning은?", "supply chain 위험은?")),
      item("프론트엔드 테스트 데이터는 어떻게 관리하나요?", "fixture, factory, mock server, contract sample을 분리하고 PII 없는 데이터를 씁니다.", "실제 사용자 데이터를 테스트에 넣으면 개인정보와 재현성 문제가 생깁니다.", "fixture inventory, mock contract, PII scan, deterministic seed", f("MSW는 언제?", "fixture가 오래되면?", "계약 샘플은 누가 관리?")),
      item("API mocking의 위험은 무엇인가요?", "mock이 실제 API와 drift되면 테스트는 통과하지만 production에서 깨집니다. contract test나 schema sync가 필요합니다.", "너무 완벽한 mock은 latency, error, partial failure를 숨깁니다.", "mock/schema diff, contract test, error fixture, latency simulation", f("mock server와 stub 차이는?", "에러 케이스는?", "GraphQL mock은?")),
      item("릴리스 노트에는 무엇을 남겨야 하나요?", "변경 범위, 영향 사용자, flag, migration, rollback, 모니터링 지표, known risk를 남깁니다.", "커밋 메시지만 있으면 운영자가 장애 시 어떤 변경이 영향을 줬는지 파악하기 어렵습니다.", "release note, change log, flag list, risk register", f("내부 릴리스도?", "사용자 공지는?", "known issue는?")),
      item("프론트엔드 장애 postmortem은 무엇을 다루나요?", "영향 route, browser/device segment, release version, detection gap, rollback time, 재발 방지 action을 다룹니다.", "서버 장애 형식만 복사하면 bundle/cache/browser-specific 원인을 놓칩니다.", "frontend incident timeline, RUM segment, error stack, action item", f("고객 영향은 어떻게 산정?", "원인 하나면 충분?", "액션 아이템 좋은 기준은?")),
      item("보안 헤더는 프론트 품질과 어떻게 연결되나요?", "CSP, HSTS, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy는 브라우저 실행 환경을 제한합니다.", "헤더는 백엔드/인프라에서 설정되지만 프론트 기능과 충돌할 수 있어 함께 검증해야 합니다.", "security header audit, CSP report, clickjacking fixture, permissions policy test", f("CSP rollout은?", "frame-ancestors와 X-Frame-Options?", "Referrer-Policy는?")),
      item("품질 게이트가 개발 속도를 늦추지 않게 하려면?", "위험 기반으로 필수 자동화와 수동 증거를 나누고, 변경 범위별 checklist를 다르게 둡니다.", "모든 변경에 같은 무거운 절차를 요구하면 팀이 우회하고 품질 체계가 무력화됩니다.", "risk tier matrix, CI duration, checklist by change type, escape hatch policy", f("핫픽스는?", "문서 변경은?", "예외 승인은?")),
      item("릴리스 Q&A에서 senior-level 답변은?", "성공 빌드보다 실제 사용자 영향, 보안 경계, 관측성, rollback, 재발 방지를 먼저 말합니다.", "테스트 통과만 말하면 production 운영 책임을 이해하지 못한 답변으로 보입니다.", "FRONTEND RELEASE QUALITY MODEL, release health window, security fixture, rollback log", f("테스트가 충분한지 어떻게?", "빌드 성공 후 무엇을?", "외부 검증 증거는?")),
      item("품질 경험이 적으면 어떻게 답변하나요?", "test pyramid, XSS/CSRF 기본 threat model, sourcemap/cache/env/rollback 체크리스트, 배포 후 모니터링 계획을 구체화합니다.", "막연히 꼼꼼히 테스트한다고 말하면 검증 가능한 기준이 없습니다.", "quality checklist, sample threat model, release runbook, smoke test plan", f("실제 장애 경험이 없으면?", "보안 질문이 깊어지면?", "테스트 수치가 없으면?")),
    ],
  },
];

const coverageAdditions = {
  "engineering-frontend-core-qa": [
    item("브라우저 호환성 이슈는 어떻게 답변하나요?", "표준 지원 여부, browser matrix, polyfill, progressive enhancement, fallback을 기준으로 답합니다.", "최신 Chrome 기준으로만 구현하면 Safari, iOS WebView, 저사양 Android에서 핵심 흐름이 깨질 수 있습니다.", "browser support matrix, caniuse audit, cross-browser E2E, fallback screenshot", f("polyfill은 언제 넣나요?", "지원 브라우저를 줄이려면?", "progressive enhancement는?")),
    item("API 오류를 UI 상태로 어떻게 매핑하나요?", "HTTP status, domain error code, retryable 여부, field error, global error, auth error를 화면 상태와 연결합니다.", "모든 오류를 toast로만 처리하면 사용자가 무엇을 고쳐야 하는지, 재시도 가능한지 알 수 없습니다.", "error contract, UI state matrix, negative fixture, retry event log", f("500과 network error는?", "field error와 form error는?", "traceId를 보여줘야 하나요?")),
  ],
  "engineering-frontend-interaction-qa": [
    item("인터랙션에서 permission change는 어떻게 처리하나요?", "사용자가 화면에 머무는 동안 권한이나 소유권이 바뀔 수 있으므로 action 직전 서버 결과를 기준으로 UI를 수렴시켜야 합니다.", "초기 렌더 때 보인 버튼만 믿으면 만료된 권한으로 실패하거나 잘못된 optimistic UI를 보여줄 수 있습니다.", "permission fixture, 403 recovery flow, stale permission test, audit log", f("버튼을 숨기면 충분한가요?", "403 후 화면은?", "권한 cache는 어떻게?")),
  ],
  "engineering-frontend-motion-qa": [
    item("모션과 디자인 토큰은 어떻게 연결하나요?", "duration, easing, distance, opacity, scale을 token으로 관리하고 컴포넌트 상태별 사용 범위를 제한합니다.", "코드에 임의 숫자가 퍼지면 브랜드 일관성, reduced motion 대응, 회귀 검증이 어려워집니다.", "motion token diff, component usage audit, visual regression, reduced-motion token", f("토큰이 너무 많아지면?", "제품별 예외는?", "디자인 변경 반영은?")),
  ],
  "engineering-frontend-graphics-3d-qa": [
    item("그래픽 기능에서 progressive enhancement는 어떻게 적용하나요?", "핵심 정보는 HTML/SVG/정적 이미지로 제공하고, 지원 환경에서 Canvas/WebGL 상호작용을 강화합니다.", "고급 렌더링이 실패하면 핵심 기능까지 사라지는 구조는 제품 기능으로 보기 어렵습니다.", "feature detection, fallback parity test, no-WebGL capture, content audit", f("fallback 정보량은?", "성능 낮은 기기에는?", "사용자가 직접 전환할 수 있나요?")),
  ],
  "engineering-frontend-performance-qa": [
    item("성능 최적화가 기능 회귀를 만들지 않게 하려면?", "변경 전후 사용자 여정, 접근성, analytics event, visual state를 함께 검증합니다.", "렌더 횟수를 줄이려다 stale UI, 누락된 announcement, 잘못된 cache invalidation을 만들 수 있습니다.", "before/after trace, E2E journey, a11y smoke, event QA log", f("memoization 회귀는?", "cache 최적화 위험은?", "성능 PR 증거는?")),
  ],
  "engineering-frontend-seo-analytics-qa": [
    item("crawl budget은 언제 신경 써야 하나요?", "대규모 URL, 필터 파라미터, 중복 콘텐츠, 자주 바뀌는 페이지가 많을 때 중요합니다.", "중요하지 않은 URL이 많이 열리면 검색 엔진이 핵심 페이지를 늦게 발견하거나 덜 자주 갱신합니다.", "crawl stats, URL parameter policy, sitemap inventory, internal link audit", f("작은 사이트도 필요한가요?", "필터 URL은?", "크롤링 빈도는 어떻게 보나요?")),
    item("analytics dashboard를 신뢰하려면 무엇을 확인하나요?", "event schema, 중복 수집, consent 누락, bot/internal traffic, release annotation, sampling을 확인합니다.", "대시보드 수치가 있어도 수집 품질이 낮으면 잘못된 제품 결정을 하게 됩니다.", "data quality dashboard, debug event log, anomaly alert, tracking plan review", f("수치가 갑자기 변하면?", "이벤트 누락은?", "샘플링은?")),
  ],
  "engineering-frontend-quality-qa": [
    item("canary release는 프론트엔드에서 어떻게 적용하나요?", "사용자 세그먼트, route, feature flag, release version 기준으로 점진 노출하고 error/Web Vitals/conversion guardrail을 봅니다.", "전체 사용자에게 한 번에 배포하면 브라우저·기기 특정 회귀의 blast radius가 커집니다.", "canary dashboard, guardrail threshold, release version RUM, rollback log", f("canary 표본은?", "flag와 canary 차이는?", "성공 판정은?")),
    item("dependency rollback은 왜 준비해야 하나요?", "프론트엔드 dependency는 build output, runtime behavior, polyfill, CSS까지 바꿀 수 있어 빠른 되돌리기 경로가 필요합니다.", "패키지 업데이트 후 빌드는 통과해도 특정 브라우저나 route에서 런타임 오류가 날 수 있습니다.", "dependency diff, lockfile review, smoke test, rollback branch", f("patch update도 위험한가요?", "lockfile은?", "보안 업데이트면?")),
  ],
};

for (const page of pages) {
  page.questions.push(...(coverageAdditions[page.id] ?? []));
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderQuestion = (question, index) => `<section id="qa-${index + 1}">
<div class="ch-head"><span class="ch-code">Q${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(question.q)}</h2></div>
<p class="lede">${escapeHtml(question.decision)}</p>
<p>${escapeHtml(question.failure)}</p>
<table>
<tr><th>꼬리질문</th><th>꼬리질문 답변</th></tr>
${question.followups
  .map(
    (followup) =>
      `<tr><td>${escapeHtml(followup)}</td><td>${escapeHtml(answerFollowup(followup, question))}</td></tr>`,
  )
  .join("\n")}
</table>
<div class="semantic-card">
<span class="sc-label">TRAINING EVIDENCE</span>
${escapeHtml(question.evidence)}
</div>
</section>`;

const sentence = (value) => {
  const first = value.split(/[.!?。]/)[0]?.trim() ?? value.trim();
  return first.replace(/입니다$/, "입니다").replace(/합니다$/, "합니다");
};

function answerFollowup(followup, question) {
  const topic = followup.replace(/[?？]$/, "");
  const decision = sentence(question.decision);
  const failure = sentence(question.failure);
  const evidence = question.evidence.split(",").map((part) => part.trim()).filter(Boolean);
  const primaryEvidence = evidence[0] ?? "재현 fixture";
  const secondaryEvidence = evidence[1] ?? "운영 지표";
  const rules = [
    [/button 대신 div/, "button은 keyboard activation, focus, disabled, accessible name 같은 기본 상호작용 계약을 제공합니다. div로 대체하면 이 계약을 직접 구현해야 하므로 role, tabIndex, Enter/Space 처리, focus style까지 검증해야 합니다."],
    [/aria-label/, "aria-label은 보이는 텍스트와 다른 이름을 주거나 번역에서 누락되면 오히려 혼란을 만듭니다. 아이콘 단독 버튼처럼 보이는 이름이 없을 때 쓰고, visible label과 accessible name이 어긋나지 않는지 확인합니다."],
    [/focus|포커스/, `focus는 사용자의 현재 작업 위치입니다. "${topic}"에서는 이전 trigger, 오류 필드, 새 콘텐츠의 heading 중 어디가 다음 작업 위치인지 정하고 ${primaryEvidence}로 keyboard-only 흐름을 확인합니다.`],
    [/POST|멱등|중복|double submit/, "중복 입력은 버튼 비활성화만으로 막지 않습니다. 요청 식별자, pending 상태, 서버의 멱등 처리, 실패 후 재시도 정책을 같이 둬야 빠른 클릭과 네트워크 재전송에서도 같은 결과로 수렴합니다."],
    [/validation|검증|필드 오류|form error|전역 오류/, "필드 오류는 사용자가 즉시 수정할 수 있는 입력 문제에 붙이고, 전역 오류는 인증 만료·서버 실패·부분 실패처럼 폼 전체 흐름에 영향을 주는 문제에 씁니다. 서버 오류 코드를 UI 상태로 매핑하는 fixture가 필요합니다."],
    [/localStorage|cookie|토큰|refresh token|httpOnly|memory 저장/, "토큰 저장은 XSS와 CSRF 위협 모델을 같이 봅니다. localStorage는 XSS 탈취에 약하고, httpOnly cookie는 CSRF/SameSite 설계가 필요하며, memory 저장은 새로고침과 탭 간 동기화 비용이 있습니다."],
    [/CORS|preflight|credentials|wildcard/, "CORS는 브라우저가 cross-origin 응답을 JS에 노출할지 결정하는 정책입니다. preflight 요청의 method/header, credentials 사용 여부, allow-origin 값을 실제 응답 헤더로 확인해야 합니다."],
    [/XSS|markdown|dangerouslySetInnerHTML|sanitizer|CSP|Trusted Types/, "XSS 답변은 source와 sink를 연결해야 합니다. markdown, SVG, URL, dangerouslySetInnerHTML처럼 HTML 실행 경로가 있는 곳은 sanitizer 설정, Trusted Types, CSP report, negative fixture로 검증합니다."],
    [/CSRF|SameSite|cookie 기반/, "CSRF는 사용자의 인증 쿠키가 자동 전송되는 특성을 악용합니다. SameSite만 믿지 말고 상태 변경 요청에는 서버 검증 가능한 token, Origin/Referer 검증, 실패 fixture를 둬야 합니다."],
    [/Web Vitals|LCP|INP|CLS|FID/, `"${topic}"는 단일 점수가 아니라 사용자 체감 지표로 봅니다. LCP는 표시 지연, INP는 입력 반응, CLS는 시각 안정성 문제이므로 ${primaryEvidence}와 ${secondaryEvidence}를 함께 확인합니다.`],
    [/Lighthouse|RUM|실험실|field|p75/, "Lighthouse는 재현 가능한 실험실 지표이고 RUM은 실제 사용자 환경입니다. 둘이 다르면 route, device, network, 로그인 상태를 나눠 field data를 우선 해석하고 lab으로 재현합니다."],
    [/React Profiler|rerender|render|memo|context|key 변경/, "React 병목은 render 원인과 browser 비용을 분리합니다. Profiler로 commit과 render count를 보고, context 구독 범위·불안정한 props·key 변경을 확인한 뒤 실제 interaction trace로 효과를 검증합니다."],
    [/bundle|tree shaking|dynamic import|gzip|dependency/, "번들 답변은 초기 route에 꼭 필요한 코드와 나중에 불러도 되는 코드를 나누는 것이 핵심입니다. analyzer로 큰 dependency와 중복 polyfill을 확인하고, dynamic import는 사용자 intent 이후 경계에 둡니다."],
    [/cache|CDN|Cache-Control|immutable|stale/, "캐시는 대상별로 다릅니다. hash가 있는 정적 asset은 길게, HTML은 짧게 또는 재검증, API는 freshness 요구에 맞춰야 하며 배포 후 stale bundle 조합을 smoke test로 확인합니다."],
    [/SSR|SSG|CSR|hydration|server component|pre-render/, "렌더링 방식은 SEO, TTFB, LCP, 개인화, hydration 비용의 trade-off입니다. SSR은 HTML을 빨리 주지만 hydration 비용이 있고, CSR은 단순하지만 초기 표시와 색인에 불리할 수 있습니다."],
    [/canonical|robots|sitemap|noindex|hreflang|structured data|Search Console|crawl/, "SEO 답변은 검색 엔진의 발견, 크롤링, 렌더링, 색인 흐름으로 말해야 합니다. canonical, robots, sitemap, structured data는 각각 역할이 다르므로 URL inspection과 Search Console evidence로 검증합니다."],
    [/GA4|analytics|event|UTM|funnel|conversion|tracking/, "애널리틱스는 DOM 클릭이 아니라 사용자 의도와 결과를 기록해야 합니다. event name, action, target, result, error, context를 tracking plan에 고정하고 debug view로 중복·누락을 확인합니다."],
    [/PII|privacy|consent|개인정보|redaction/, "분석과 로그에는 목적에 필요한 최소 정보만 보냅니다. email, token, 입력 원문 같은 PII는 redaction하고, consent 이전 전송과 보존 기간을 privacy review로 막아야 합니다."],
    [/SVG|Canvas|WebGL|Three|3D|renderer|GPU/, "그래픽 기술 선택은 표현력보다 접근성, 성능 예산, fallback 가능성으로 판단합니다. Canvas/WebGL은 DOM 의미가 부족하므로 대체 정보와 nonblank render, renderer.info 같은 검증이 필요합니다."],
    [/context loss|texture|draw call|shader|asset|GLB|GLTF/, "WebGL 운영 답변은 GPU 자원 수명까지 포함해야 합니다. texture 크기, draw call, shader compile, asset load, context loss 복구를 renderer.info와 device matrix로 확인합니다."],
    [/animation|motion|duration|easing|FLIP|reduced motion|transition|spring/, "모션은 장식이 아니라 상태 변화 설명입니다. duration/easing은 token으로 관리하고, reduced motion 대체와 interrupt 동작, Performance trace를 같이 확인해야 합니다."],
    [/layout thrashing|paint|composite|transform|will-change|FPS|frame/, "렌더링 비용은 layout, paint, composite 중 어디를 건드리는지로 나눕니다. transform/opacity도 layer memory 비용이 있으므로 Performance trace와 frame chart로 실제 개선을 확인합니다."],
    [/keyboard|Enter|Space|Escape|Arrow|Tab/, "키보드 답변은 브라우저 기본 동작과 WAI-ARIA pattern을 기준으로 합니다. Enter/Space, Escape, Arrow, Tab의 의미를 컴포넌트별로 고정하고 user-event나 Playwright keyboard test로 검증합니다."],
    [/drag|drop|pointer|touch|gesture|swipe/, "포인터 기반 조작은 mouse만 보지 않습니다. pointer capture, pointercancel, touch target, keyboard 대체 조작, rollback을 포함해야 모바일과 보조 입력 환경에서도 안전합니다."],
    [/optimistic|undo|rollback|cancel|실패했을 때/, "optimistic UI와 undo는 실패 복구가 설계되어 있을 때만 안전합니다. 서버 최종 상태와 reconcile하고, 되돌릴 수 없는 side effect는 compensation API나 명시적 취소 상태로 다룹니다."],
    [/modal|drawer|popover|tooltip|overlay|z-index/, "overlay 계열은 시각 위치보다 focus, history, outside click, escape, stacking context가 핵심입니다. 보이는 레이어와 접근성 tree, pointer target이 일치하는지 fixture로 확인합니다."],
    [/virtual|table|grid|row key|selection|select all/, "그리드 답변은 row identity와 action scope가 핵심입니다. 정렬·필터·페이지 변경 후에도 selection이 어떤 데이터에 적용되는지 stable id와 confirmation copy로 고정해야 합니다."],
    [/mobile|viewport|100vh|safe area|virtual keyboard|터치/, "모바일은 작은 화면 문제가 아니라 viewport 변화, 가상 키보드, touch target, 네트워크, 저사양 CPU 문제가 함께 옵니다. 실제 기기 viewport screenshot과 RUM segment로 확인합니다."],
    [/Error Boundary|boundary|fallback/, "Error Boundary는 렌더링 subtree 오류를 격리하지만 event handler, async request, 서버 오류를 모두 처리하지는 않습니다. boundary 위치와 fallback 복구 행동을 별도 fixture로 검증해야 합니다."],
    [/Service Worker|offline|precache|runtime cache|skipWaiting/, "Service Worker는 성능과 offline에 유용하지만 배포 stale 문제를 만들 수 있습니다. lifecycle, cache version, update prompt, rollback 가능성을 함께 설계해야 합니다."],
    [/sourcemap|release id|error stack|에러 추적/, "sourcemap은 운영 디버깅에는 필요하지만 공개 노출 위험이 있습니다. release id와 private upload 정책을 맞춰 minified stack을 원본 소스에 매핑할 수 있어야 합니다."],
    [/feature flag|flag|kill switch|canary/, "flag는 권한이 아니라 rollout과 kill switch 수단입니다. 기본값, 노출 이벤트, targeting, stale flag 제거, 서버/클라이언트 불일치 시 동작을 release checklist에 넣어야 합니다."],
    [/browser|Safari|polyfill|호환성|progressive enhancement/, "브라우저 호환성은 최신 Chrome에서 보이는지보다 지원 matrix에서 핵심 기능이 degrade 가능한지가 중요합니다. polyfill 비용과 fallback을 함께 보고 cross-browser smoke를 남깁니다."],
  ];
  const matched = rules.find(([pattern]) => pattern.test(followup));
  if (matched) {
    return `${matched[1]} 이 꼬리질문에서는 "${topic}"가 실제로 어떤 조건에서 깨지는지까지 말해야 하며, 답변 끝에는 ${primaryEvidence} 또는 ${secondaryEvidence}로 확인한 증거를 붙입니다.`;
  }

  if (/충분|항상|무조건|끝인가요|해결되나요/.test(followup)) {
    return `아니요. "${topic}"라는 질문은 조건부로 답해야 합니다. ${decision}라는 전제가 맞을 때만 안전하고, ${failure} 따라서 ${primaryEvidence}로 깨지는 조건을 재현하고 ${secondaryEvidence}로 변경 후 부작용을 확인해야 합니다.`;
  }
  if (/언제|기준|선택|고르|적절|필요/.test(followup)) {
    return `"${topic}"의 판단 기준은 사용자 영향, 변경 빈도, 실패 비용을 ${question.q.replace(/[?？]$/, "")}의 맥락에 맞게 비교하는 것입니다. ${decision} 이후 ${primaryEvidence}를 통과 기준으로 둡니다.`;
  }
  if (/어떻게|확인|테스트|재현|찾나요|관리|보나요/.test(followup)) {
    return `"${topic}"는 먼저 재현 조건을 고정하고, ${primaryEvidence}와 ${secondaryEvidence}를 같이 확인합니다. 답변에서는 ${failure}라는 실패 모드가 다시 생기지 않도록 자동화 또는 릴리스 체크에 넣는다고 말해야 합니다.`;
  }
  if (/왜|이유|위험|문제/.test(followup)) {
    return `"${topic}"가 중요한 이유는 ${failure} 때문입니다. 단순 구현 설명으로 끝내지 말고 ${decision}라는 선택 기준과 ${primaryEvidence} 기반 검증을 함께 제시해야 합니다.`;
  }
  if (/차이|다른가요|무엇이 다른/.test(followup)) {
    return `"${topic}"의 차이는 책임 경계와 복구 방식에서 납니다. ${decision} 이 경계를 기준으로 나누고, ${primaryEvidence}로 실제 사용자 흐름에서 차이가 드러나는지 확인합니다.`;
  }
  return `이 꼬리질문은 "${topic}"를 묻는 압박 지점입니다. ${question.q.replace(/[?？]$/, "")}에 답할 때는 ${decision}라는 기준을 먼저 말하고, ${failure}라는 실패 조건을 ${primaryEvidence}로 재현해 답변의 근거를 닫아야 합니다.`;
}

function renderPage(page) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(page.title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="shell">
<nav aria-label="목차">
  <div class="nav-brand">FRONTEND Q&amp;A</div>
  <div class="nav-title">${escapeHtml(page.title)}</div>
  <a href="#overview"><span class="code">GUIDE</span>훈련 방식</a>
${page.questions
  .map(
    (q, index) =>
      `  <a href="#qa-${index + 1}"><span class="code">Q${String(index + 1).padStart(2, "0")}</span>${escapeHtml(q.q)}</a>`,
  )
  .join("\n")}
  <a href="#drill"><span class="code">DRILL</span>꼬리질문 반복 훈련</a>
  <a href="#rubric"><span class="code">RUBRIC</span>통과 기준</a>
</nav>
<main>
<header class="hero">
  <div class="hero-serial">
    <span>DOC : ${page.id.toUpperCase()}</span>
    <span>SOURCE : ${escapeHtml(page.source)}</span>
    <span>MODE : QUESTION · ANSWER · FOLLOW-UP</span>
  </div>
  <h1>${escapeHtml(page.title)}</h1>
  <p class="hero-sub">${escapeHtml(page.subtitle)}</p>
  <div class="hero-meta">TRAINING : 30초 답변 → 90초 확장 → 꼬리질문 방어 → 증거 패킷 확인</div>
</header>

<section id="overview">
<div class="ch-head"><span class="ch-code">GUIDE</span><h2>훈련 방식</h2></div>
<p class="lede">각 문항은 API 암기나 라이브러리 사용법이 아니라, 사용자 흐름, 브라우저 비용, 접근성, 성능, 보안, 운영 증거를 연결해 답하는 훈련용입니다.</p>
<div class="snippet-card"><code>frontend_answer_loop:
  1_user_impact: "사용자가 겪는 변화와 실패 비용을 먼저 말한다"
  2_runtime_boundary: "DOM, network, rendering, cache, browser policy 중 경계를 잡는다"
  3_tradeoff: "선택 기준과 포기하는 것을 분리한다"
  4_failure_mode: "race, stale data, accessibility, device variance, cache drift를 점검한다"
  5_evidence: "trace, screenshot, test, metric, release log 중 하나를 증거로 든다"</code></div>
</section>

${page.questions.map(renderQuestion).join("\n\n")}

<section id="drill">
<div class="ch-head"><span class="ch-code">DRILL</span><h2>꼬리질문 반복 훈련</h2></div>
<table>
<tr><th>라운드</th><th>방법</th><th>통과 기준</th></tr>
<tr><td>1회차</td><td>각 질문을 30초 답변으로 녹음한다.</td><td>결론, 사용자 영향, 브라우저/런타임 경계가 빠지지 않는다.</td></tr>
<tr><td>2회차</td><td>꼬리질문 3개를 90초 답변으로 확장한다.</td><td>실패 모드와 검증 증거를 하나 이상 말한다.</td></tr>
<tr><td>3회차</td><td>실제 프로젝트 경험 또는 대체 검증 계획으로 연결한다.</td><td>직접 경험, 추론, 계획을 섞지 않고 구분한다.</td></tr>
</table>
</section>

<section id="rubric">
<div class="ch-head"><span class="ch-code">RUBRIC</span><h2>통과 기준</h2></div>
<div class="semantic-card">
<span class="sc-label">FRONTEND QA TRAINING PACKET</span>
통과 답변은 기능 구현 방법에서 멈추지 않고 사용자 영향, 브라우저 내부 동작, 접근성, 성능, 보안, 테스트, 운영 관측 증거를 함께 닫는다.
</div>
<div class="callout gm">
<span class="co-label">외부 검증 대응</span>
<p>모르는 주제가 나오면 직접 경험처럼 꾸미지 않는다. 대신 어떤 경계에서 문제가 생기는지, 어떤 도구로 재현할지, 어떤 지표와 테스트로 검증할지 구체적으로 답한다.</p>
</div>
</section>

<footer>FRONTEND QA TRAINING PACKET · ${escapeHtml(page.title)} · generated for handbook practice</footer>
</main>
</div>
</body>
</html>`;
}

await mkdir(outDir, { recursive: true });
for (const page of pages) {
  await writeFile(path.join(outDir, `${page.id}-handbook.html`), renderPage(page), "utf8");
}

console.log(`generated ${pages.length} frontend Q&A handbooks`);
