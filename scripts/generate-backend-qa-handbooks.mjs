import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, "public", "handbook");

const css = `:root{--paper:#F6F7FA;--panel:#FFFFFF;--ink:#161D2B;--ink-soft:#465063;--line:#D8DCE6;--green:#22418A;--green-deep:#15294F;--green-tint:#E8EDF7;--amber:#A8650D;--amber-tint:#FBF2E3;--red:#9A3324;--red-tint:#F9ECE9;--mono:'IBM Plex Mono',ui-monospace,monospace;--sans:'Pretendard Variable',Pretendard,-apple-system,sans-serif}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.75;font-size:16px}.shell{display:grid;grid-template-columns:264px 1fr;max-width:1280px;margin:0 auto}nav{position:sticky;top:0;height:100vh;overflow-y:auto;border-right:1px solid var(--line);padding:32px 20px 48px;background:var(--paper)}main{min-width:0;padding:0 56px 120px;background:var(--paper)}@media(max-width:900px){.shell{grid-template-columns:1fr}nav{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}main{padding:0 20px 80px}}.nav-brand{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--green);font-weight:600;margin-bottom:4px}.nav-title{font-size:15px;font-weight:700;margin-bottom:24px;letter-spacing:0}nav a{display:flex;gap:10px;align-items:baseline;text-decoration:none;color:var(--ink-soft);padding:7px 8px;border-radius:0;font-size:13.5px;line-height:1.4}nav a:hover{background:var(--green-tint);color:var(--green-deep)}nav a .code{font-family:var(--mono);font-size:10.5px;color:var(--green);flex-shrink:0;letter-spacing:.04em}header.hero{padding:72px 0 48px;border-bottom:1px solid var(--ink)}.hero-serial{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:var(--green);display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px}.hero-serial span{border:1px solid var(--line);padding:3px 10px;border-radius:0;background:var(--panel)}h1{font-size:clamp(30px,4.5vw,46px);font-weight:800;letter-spacing:0;line-height:1.18}.hero-sub{margin-top:18px;font-size:17px;color:var(--ink-soft);max-width:720px}.hero-meta{margin-top:28px;font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);letter-spacing:.05em}section{padding-top:72px}.ch-head{display:flex;align-items:baseline;gap:14px;border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:28px}.ch-code{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--green);letter-spacing:.1em;flex-shrink:0}h2{font-size:26px;font-weight:800;letter-spacing:0}h3{font-size:18px;font-weight:700;margin:30px 0 12px}h3 .h3-tag{font-family:var(--mono);font-size:11px;color:var(--green);font-weight:500;margin-right:8px;letter-spacing:.06em}p{margin-bottom:14px}p.lede{font-size:17px;color:var(--ink-soft)}ul,ol{margin:0 0 16px 22px}li{margin-bottom:7px}code{font-family:var(--mono);font-size:.86em;background:var(--green-tint);color:var(--green-deep);padding:1px 6px;border-radius:0}.callout{border:1px solid var(--line);border-left:3px solid var(--green);background:var(--panel);padding:18px 22px;border-radius:0;margin:22px 0}.callout.warn{border-left-color:var(--amber);background:var(--amber-tint)}.callout.risk{border-left-color:var(--red);background:var(--red-tint)}.callout.gm{border-left-color:var(--ink);background:#ECEEF3}.co-label{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;font-weight:600;color:var(--green);display:block;margin-bottom:6px}table{width:100%;border-collapse:collapse;margin:22px 0;font-size:14px;background:var(--panel);border:1px solid var(--line)}th{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-align:left;font-weight:600;color:var(--green-deep);background:var(--green-tint);padding:10px 14px;border-bottom:1px solid var(--line)}td{padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.6}.semantic-card{background:var(--green-tint);border:1px solid var(--line);border-radius:0;padding:22px 26px;margin:24px 0;font-size:14px;line-height:1.9}.semantic-card .sc-label{font-family:var(--mono);color:var(--green-deep);font-size:10.5px;letter-spacing:.14em;display:block;margin-bottom:8px}.snippet-card{font-family:var(--mono);background:var(--ink);color:#E7EAF1;border-radius:0;padding:22px 26px;margin:24px 0;font-size:13.5px;line-height:1.9;overflow-x:auto;white-space:pre-wrap}footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.05em;line-height:2}`;

const pages = [
  {
    id: "engineering-backend-core-qa",
    title: "백엔드 핵심 Q&A",
    subtitle: "요청 생명주기, API 계약, 트랜잭션, 멱등성, 관측성을 구술로 방어하는 훈련 페이지입니다.",
    source: "백엔드 핵심",
    questions: [
      {
        q: "상태 변경 API를 설계할 때 가장 먼저 무엇을 확인하나요?",
        answer: "요청의 actor, resource, business invariant, transaction boundary, retry safety를 먼저 확인합니다. Controller 입력 검증만으로 끝내지 않고 DB constraint, optimistic lock 또는 unique key, idempotency key, audit log까지 하나의 계약으로 둡니다.",
        followups: [
          {
            q: "POST도 멱등하게 만들 수 있나요?",
            answer: "가능합니다. 서버가 idempotency key와 request fingerprint를 저장하고 같은 요청에는 같은 결과를 재반환하면 POST도 재시도 안전성을 가질 수 있습니다.",
          },
          {
            q: "validation과 DB constraint가 중복이면 왜 둘 다 필요한가요?",
            answer: "validation은 빠르고 친절한 오류를 주고, DB constraint는 동시성과 우회 경로까지 막는 최종 방어선입니다. 둘은 같은 규칙을 다른 실패 지점에서 지킵니다.",
          },
          {
            q: "중복 요청이 들어왔을 때 응답은 같아야 하나요?",
            answer: "같은 actor, key, payload라면 최초 처리 결과와 같은 의미의 응답을 돌려야 합니다. payload가 다르면 같은 key 재사용을 conflict로 막아야 합니다.",
          },
        ],
        evidence: "API contract, idempotency table, unique constraint, concurrency test, audit event query",
      },
      {
        q: "트랜잭션 경계를 어디에 두는지 설명해보세요.",
        answer: "도메인 불변식이 함께 지켜져야 하는 최소 변경 묶음을 한 트랜잭션으로 둡니다. 외부 API 호출은 트랜잭션 안에 오래 붙잡아 두지 않고, outbox나 상태 전이 후 비동기 처리로 분리합니다.",
        followups: [
          {
            q: "외부 결제 호출과 DB 저장을 어떻게 원자적으로 다루나요?",
            answer: "분산 트랜잭션처럼 묶기보다 상태 전이, idempotency, outbox, reconciliation으로 수렴시킵니다. 결제 요청과 내부 상태가 어긋날 수 있음을 모델에 반영합니다.",
          },
          {
            q: "rollbackFor를 남발하면 어떤 문제가 생기나요?",
            answer: "복구 가능한 비즈니스 실패와 시스템 실패가 섞여 transaction 정책이 불투명해집니다. exception 계층과 rollback 기준을 먼저 정해야 합니다.",
          },
          {
            q: "읽기 전용 트랜잭션은 왜 쓰나요?",
            answer: "쓰기 의도가 없음을 명시하고 ORM flush나 connection 최적화 힌트를 줄 수 있습니다. 다만 DB와 드라이버별 실제 효과는 확인해야 합니다.",
          },
        ],
        evidence: "service method boundary, rollback test, outbox event, DB lock wait metric",
      },
      {
        q: "장애가 났을 때 traceId 하나로 어디까지 좁힐 수 있어야 하나요?",
        answer: "요청 진입, 인증/인가 결정, DB query, external call, async event 발행, response mapping까지 같은 correlation id로 연결되어야 합니다. 로그는 원인 확정, metric은 증상 감지, trace는 경로 분해에 씁니다.",
        followups: [
          {
            q: "로그에 userId를 metric label로 넣으면 왜 위험한가요?",
            answer: "metric label cardinality가 폭발해 저장 비용과 조회 성능이 무너질 수 있습니다. 상세 식별자는 log나 trace field로 보내고 metric은 낮은 cardinality 차원으로 둡니다.",
          },
          {
            q: "p95는 정상인데 고객이 느리다고 하면 무엇을 보나요?",
            answer: "p99, 특정 route, tenant, region, dependency span을 나눠 봅니다. 평균이나 p95가 정상이어도 일부 고객의 tail latency는 숨을 수 있습니다.",
          },
          {
            q: "장애 중에는 원인 분석과 복구 중 무엇이 먼저인가요?",
            answer: "사용자 영향 완화가 먼저입니다. 동시에 timeline과 증거를 보존하고, 근본 원인 분석은 서비스 안정화 후 postmortem에서 닫습니다.",
          },
        ],
        evidence: "trace sample, structured log fields, RED metric, SLO burn rate alert",
      },
      {
        q: "시니어 백엔드 리뷰에서 좋은 답변과 얕은 답변의 차이는 무엇인가요?",
        answer: "좋은 답변은 선택 기준, 실패 모드, 운영 증거, 롤백 경로까지 닫습니다. 얕은 답변은 프레임워크 사용법이나 성공 흐름만 설명하고, 중복 요청, 부분 실패, 권한 오류, 관측 지표를 뒤로 미룹니다.",
        followups: [
          {
            q: "이 변경의 blast radius를 어떻게 줄이나요?",
            answer: "feature flag, tenant/cohort rollout, read-only fallback, kill switch, 빠른 rollback 경로를 둡니다. 영향 범위를 미리 작게 만들수록 배포 판단이 쉬워집니다.",
          },
          {
            q: "어떤 테스트가 없으면 배포를 막아야 하나요?",
            answer: "권한, 상태 변경, 동시성, 데이터 migration처럼 실패 영향이 큰 경로의 negative test와 smoke test가 없으면 막아야 합니다.",
          },
          {
            q: "forward fix와 rollback 중 무엇을 고르나요?",
            answer: "데이터 파괴나 외부 side effect가 없고 이전 artifact가 호환되면 rollback이 빠릅니다. 이미 상태가 변했다면 forward fix와 repair script가 현실적일 수 있습니다.",
          },
        ],
        evidence: "SENIOR BACKEND REVIEW PACKET, postmortem action item, release health window",
      },
    ],
  },
  {
    id: "engineering-backend-auth-security-qa",
    title: "백엔드 인증·보안 Q&A",
    subtitle: "인증, 세션, 토큰, 인가, tenant isolation, abuse case를 공격 경로 기준으로 답하는 훈련 페이지입니다.",
    source: "백엔드 인증·보안",
    questions: [
      {
        q: "인증과 인가를 어떻게 분리해서 설명하나요?",
        answer: "인증은 사용자가 누구인지 증명하는 절차이고, 인가는 그 사용자가 특정 resource에 특정 action을 할 수 있는지 결정하는 절차입니다. 로그인 성공은 인증일 뿐이며, 모든 상세/목록/export/bulk API에서 resource 단위 인가가 다시 필요합니다.",
        followups: [
          {
            q: "401, 403, 404를 언제 구분하나요?",
            answer: "401은 인증 정보가 없거나 유효하지 않을 때, 403은 인증됐지만 권한이 없을 때 씁니다. 리소스 존재 자체가 민감하면 404로 숨길 수 있지만, 감사 로그에는 실제 거절 사유를 남겨야 합니다.",
          },
          {
            q: "목록 API와 상세 API의 인가 누락은 어떻게 다르게 나타나나요?",
            answer: "목록 API는 다른 tenant나 조직의 항목이 섞여 노출되고, 상세 API는 IDOR처럼 특정 id를 바꿔 단건을 읽게 됩니다. 둘 다 query predicate와 resource ownership fixture로 막아야 합니다.",
          },
          {
            q: "관리자 권한은 role만 보면 충분한가요?",
            answer: "충분하지 않습니다. 관리자도 tenant, 업무 목적, 승인 상태, 대상 resource scope를 함께 확인해야 하며 권한 상승과 대량 조회는 별도 audit와 step-up 인증을 둡니다.",
          },
        ],
        evidence: "role matrix, resource ownership query, forbidden fixture, audit event",
      },
      {
        q: "Refresh token rotation의 함정은 무엇인가요?",
        answer: "탈취 탐지를 위해 rotation을 쓰지만, 모바일 재시도나 브라우저 탭 동시 요청이 race를 만들 수 있습니다. token family, grace window, reuse detection, device binding, revoke state를 같이 설계해야 합니다.",
        followups: [
          {
            q: "재사용 탐지가 뜨면 전체 세션을 끊나요?",
            answer: "보통 같은 token family와 해당 device 세션을 즉시 폐기하고, 위험도가 높으면 계정 전체 세션도 revoke합니다. 사용자 알림과 재인증 요구, 탐지 audit가 같이 있어야 합니다.",
          },
          {
            q: "access token을 localStorage에 두면 무엇이 위험한가요?",
            answer: "XSS가 발생하면 JS가 token을 읽어 외부로 보낼 수 있습니다. 브라우저에서는 HttpOnly Secure cookie, 짧은 access token TTL, CSP, refresh rotation을 함께 고려합니다.",
          },
          {
            q: "로그아웃은 JWT에서 어떻게 처리하나요?",
            answer: "access token은 짧게 만료시키고 refresh token family를 서버에서 revoke합니다. 즉시 차단이 필요하면 token version이나 denylist를 두고, 모든 device 로그아웃은 session store 기준으로 처리합니다.",
          },
        ],
        evidence: "token lifecycle table, reuse detection log, expired token negative test",
      },
      {
        q: "Tenant isolation을 어떻게 검증하나요?",
        answer: "모든 요청에서 actor tenant와 resource tenant가 일치해야 한다는 invariant를 둡니다. client가 보낸 tenant id를 신뢰하지 않고, 서버 세션/토큰 claim과 DB predicate, row policy, audit log를 함께 확인합니다.",
        followups: [
          {
            q: "export file id가 다른 tenant 것을 가리키면 어떻게 막나요?",
            answer: "다운로드 시 file id만 보지 않고 actor tenant, export owner, resource scope, 만료 시간을 함께 조회 조건에 넣습니다. signed URL도 생성 시점의 scope와 audit를 포함해야 합니다.",
          },
          {
            q: "batch job에도 tenant scope가 필요한가요?",
            answer: "필요합니다. batch가 시스템 권한으로 실행되더라도 처리 대상 tenant와 resource 범위를 명시하고, cross-tenant 집계는 별도 승인과 결과 접근 통제가 있어야 합니다.",
          },
          {
            q: "존재 자체를 숨겨야 할 때 응답 코드는 무엇인가요?",
            answer: "민감 리소스는 권한 없는 actor에게 404를 반환해 존재 여부를 숨길 수 있습니다. 내부 로그와 audit에는 403 성격의 거절 사유를 남겨 사고 분석이 가능해야 합니다.",
          },
        ],
        evidence: "foreign tenant fixture, cross-tenant negative test, audit query, tenant predicate review",
      },
      {
        q: "SSRF나 webhook replay 같은 abuse case는 어떻게 문서화하나요?",
        answer: "source, trust boundary, sink, impact, detection, mitigation 순서로 적습니다. SSRF는 URL fetch가 내부망이나 metadata endpoint에 닿는 경로를 막고, webhook replay는 event id ledger와 signature timestamp, idempotency constraint로 막습니다.",
        followups: [
          {
            q: "URL blocklist만으로 SSRF를 막을 수 있나요?",
            answer: "어렵습니다. DNS 변형, IPv6, redirect, metadata IP 우회가 가능하므로 allowlist, private/link-local IP 차단, 연결 직전 IP 재검증, egress proxy 정책을 함께 둬야 합니다.",
          },
          {
            q: "redirect 후 IP가 바뀌면 어떻게 하나요?",
            answer: "redirect 대상마다 host와 IP를 다시 resolve하고 private 대역, loopback, link-local을 차단합니다. redirect 횟수와 scheme도 제한하고 최종 연결 IP를 로그에 남깁니다.",
          },
          {
            q: "webhook signature가 맞아도 왜 event id를 저장하나요?",
            answer: "signature는 발신자와 payload 무결성을 확인하지만 중복 전송을 막지 못합니다. event id ledger와 business unique constraint가 있어야 replay와 provider 재전송을 no-op 처리할 수 있습니다.",
          },
        ],
        evidence: "SSRF WEBHOOK EXPORT ADMIN ABUSE MATRIX, egress log, replay fixture",
      },
    ],
  },
  {
    id: "engineering-backend-architecture-qa",
    title: "백엔드 아키텍처 Q&A",
    subtitle: "모듈 경계, 서비스 분리, 데이터 소유권, 이벤트 계약, ADR을 trade-off 중심으로 답하는 훈련 페이지입니다.",
    source: "백엔드 아키텍처",
    questions: [
      {
        q: "마이크로서비스로 분리할 준비가 됐다는 신호는 무엇인가요?",
        answer: "모듈 경계, API 계약, 데이터 소유권, 배포 독립성, 관측성, 운영 owner가 준비됐을 때입니다. 코드가 커졌다는 이유만으로 나누면 네트워크를 탄 모놀리스가 됩니다.",
        followups: [
          {
            q: "공유 DB가 있으면 왜 독립 서비스라고 보기 어렵나요?",
            answer: "여러 서비스가 같은 테이블을 직접 읽고 쓰면 schema 변경, lock, migration, 장애 책임이 함께 묶입니다. 독립 서비스라면 write owner가 하나이고 다른 서비스는 API, event, read model 같은 계약을 통해 접근해야 합니다.",
          },
          {
            q: "팀 구조는 서비스 경계에 어떤 영향을 주나요?",
            answer: "서비스 경계는 코드 경계만이 아니라 owner, on-call, 배포 권한과 맞아야 합니다. 한 팀이 여러 서비스의 변경을 계속 조율해야 한다면 네트워크만 분리된 결합으로 남을 가능성이 큽니다.",
          },
          {
            q: "분리하지 않는 선택을 어떻게 정당화하나요?",
            answer: "배포 독립성, 장애 격리, 데이터 소유권 이득보다 운영 복잡도와 관측 비용이 크면 모듈러 모놀리스가 더 낫다고 설명합니다. 대신 모듈 의존 규칙, package boundary, architecture test로 추후 분리 가능한 구조를 유지해야 합니다.",
          },
        ],
        evidence: "SERVICE SPLIT READINESS GATE, dependency graph, owner map, SLO impact",
      },
      {
        q: "Bounded context는 테이블 기준으로 나누나요?",
        answer: "아니요. 언어, 불변식, 변경 이유, 생명주기 기준으로 나눕니다. 같은 주문이라는 단어도 결제, 물류, 정산에서 다른 의미를 가지면 다른 모델과 경계를 가져야 합니다.",
        followups: [
          {
            q: "같은 단어가 다른 의미라는 걸 어떻게 발견하나요?",
            answer: "event storming, 장애 티켓, 변경 이력을 보며 같은 명사가 다른 상태 전이와 owner를 갖는지 확인합니다. 예를 들어 주문은 결제에서는 승인 대상이고 물류에서는 출고 지시이며 정산에서는 매출 근거가 될 수 있습니다.",
          },
          {
            q: "anti-corruption layer는 언제 필요하나요?",
            answer: "외부 시스템의 상태 코드, 오류 의미, 필드명이 내부 도메인 언어와 다를 때 둡니다. ACL은 단순 wrapper가 아니라 의미 변환, 실패 매핑, 호환성 테스트를 가진 경계여야 합니다.",
          },
          {
            q: "context 간 조회는 어떻게 처리하나요?",
            answer: "강한 일관성이 필요한 명령 경로는 소유 context API로 확인하고, 화면 조회나 검색은 event 기반 read model을 둘 수 있습니다. 직접 join이나 공유 테이블 조회는 변경 책임을 흐리므로 피합니다.",
          },
        ],
        evidence: "event storming note, domain glossary, change history, incident owner map",
      },
      {
        q: "이벤트 기반 아키텍처의 가장 큰 비용은 무엇인가요?",
        answer: "결과적 일관성, replay, ordering, schema evolution, 운영 관측 비용입니다. 발행자는 outbox와 schema validation을 갖추고, 소비자는 idempotent, replay-safe, unknown-field tolerant해야 합니다.",
        followups: [
          {
            q: "이벤트 필드를 삭제하고 싶으면 어떻게 하나요?",
            answer: "먼저 consumer 사용 여부를 확인하고 새 필드를 추가한 뒤 deprecation window를 둡니다. 모든 consumer가 새 schema를 처리한다는 contract test와 배포 확인이 끝난 뒤에만 제거합니다.",
          },
          {
            q: "순서를 전역으로 보장해야 하나요?",
            answer: "대부분 전역 순서보다 aggregate나 business key 단위 순서가 필요합니다. 전역 순서는 throughput과 가용성을 크게 희생하므로 실제 불변식이 요구하는 범위를 partition key와 sequence로 좁혀야 합니다.",
          },
          {
            q: "consumer lag가 사용자 경험에 보이면 어떻게 하나요?",
            answer: "사용자에게 pending 상태, last updated, 재시도 가능 안내를 보여주고 강한 일관성이 필요한 조회는 primary path로 우회합니다. 동시에 lag slope, partition skew, downstream error를 보고 처리 병목을 줄입니다.",
          },
        ],
        evidence: "event contract, outbox table, consumer lag dashboard, schema compatibility test",
      },
      {
        q: "ADR에는 무엇을 써야 하나요?",
        answer: "상태, 맥락, 결정, 결과, 거절한 대안, 재검토 조건을 짧게 씁니다. 좋은 ADR은 선택의 장점보다 포기한 것과 다시 바꿔야 할 신호를 분명히 남깁니다.",
        followups: [
          {
            q: "ADR이 너무 많아지면 어떻게 관리하나요?",
            answer: "상태를 proposed, accepted, superseded로 관리하고 index와 tag를 둡니다. 오래된 결정은 삭제하지 않고 대체 ADR을 연결해 왜 바뀌었는지 추적 가능하게 남깁니다.",
          },
          {
            q: "결정이 틀렸다는 신호는 무엇인가요?",
            answer: "배포 충돌, 장애 전파, p99 악화, 팀 간 handoff 증가, migration 지연처럼 결정 당시 감수한 비용이 임계값을 넘을 때입니다. ADR의 재검토 조건과 실제 지표를 연결해야 합니다.",
          },
          {
            q: "아키텍처 리뷰에서 가장 먼저 보는 산출물은 무엇인가요?",
            answer: "context diagram, data ownership map, dependency graph, ADR을 먼저 봅니다. 이 네 가지가 맞지 않으면 코드 구조가 좋아 보여도 책임, 데이터, 장애 경로가 불명확한 상태입니다.",
          },
        ],
        evidence: "ADR DECISION RECORD TEMPLATE, TRADEOFF DECISION LEDGER, review scenario packet",
      },
    ],
  },
  {
    id: "engineering-data-qa",
    title: "데이터 계층·저장소 심화 Q&A",
    subtitle: "SQL, 트랜잭션, MVCC, 인덱스, replication, Redis 운영 실패를 숫자와 증거로 답하는 훈련 페이지입니다.",
    source: "데이터 계층·저장소 심화",
    questions: [
      {
        q: "느린 쿼리를 보면 가장 먼저 무엇을 확인하나요?",
        answer: "실행 계획, 실제 row 수, 예상 row 수, 인덱스 선택, lock wait, buffer hit, query parameter 분포를 봅니다. 인덱스를 추가하기 전에 planner가 왜 현재 계획을 골랐는지 확인합니다.",
        followups: [
          {
            q: "EXPLAIN과 EXPLAIN ANALYZE의 차이는 무엇인가요?",
            answer: "EXPLAIN은 planner가 예상한 실행 계획이고 EXPLAIN ANALYZE는 실제 실행 시간과 row 수를 포함합니다. 운영 쿼리는 예상 row와 실제 row 차이, buffer hit, loop 수를 봐야 잘못된 통계나 selectivity 문제를 잡을 수 있습니다.",
          },
          {
            q: "index가 있어도 seq scan을 할 수 있나요?",
            answer: "가능합니다. 조건 selectivity가 낮거나 테이블 대부분을 읽어야 하거나 통계가 낡았거나 함수/형 변환 때문에 인덱스를 못 쓰면 sequential scan이 더 싸다고 판단될 수 있습니다.",
          },
          {
            q: "N+1과 느린 단일 쿼리는 어떻게 구분하나요?",
            answer: "N+1은 같은 패턴의 짧은 쿼리가 목록 크기만큼 반복되고, 느린 단일 쿼리는 한 실행 계획 안에서 join, sort, scan, lock wait가 병목입니다. query count와 trace span, slow query log를 같이 보면 구분됩니다.",
          },
        ],
        evidence: "EXPLAIN ANALYZE, slow query log, pg_stat_statements, cardinality mismatch",
      },
      {
        q: "MVCC와 vacuum을 운영 관점에서 설명해보세요.",
        answer: "PostgreSQL은 업데이트 시 기존 row를 덮지 않고 새 버전을 만듭니다. 오래된 트랜잭션이 살아 있으면 dead tuple 회수가 늦어지고 bloat가 생기므로 vacuum lag, long transaction, table/index bloat를 봐야 합니다.",
        followups: [
          {
            q: "long transaction이 왜 vacuum을 막나요?",
            answer: "오래 열린 transaction은 과거 snapshot을 계속 참조하므로 vacuum이 그 snapshot에서 보일 수 있는 old row version을 제거하지 못합니다. pg_stat_activity의 xact_start와 backend_xmin을 확인해 원인을 좁힙니다.",
          },
          {
            q: "dead tuple이 많으면 어떤 증상이 생기나요?",
            answer: "테이블과 인덱스가 커지고 buffer와 디스크 I/O가 늘어 query latency가 상승합니다. index bloat가 커지면 planner 비용도 변해 배포와 무관한 plan regression처럼 보일 수 있습니다.",
          },
          {
            q: "autovacuum을 무조건 세게 돌리면 되나요?",
            answer: "아닙니다. worker와 cost limit을 과하게 올리면 운영 쿼리 I/O와 경쟁합니다. 테이블별 update rate, bloat, freeze 위험을 보고 특정 테이블 storage parameter와 maintenance window를 조정합니다.",
          },
        ],
        evidence: "POSTGRESQL MVCC VACUUM OPERATING MODEL, bloat metric, long transaction query",
      },
      {
        q: "Read replica를 붙일 때 주의할 점은 무엇인가요?",
        answer: "replica는 읽기 확장 수단이지만 replication lag 때문에 read-your-writes가 깨질 수 있습니다. 방금 쓴 데이터, 권한 변경, 결제 상태는 primary나 session consistency 경로에서 읽어야 합니다.",
        followups: [
          {
            q: "lag가 있을 때 사용자는 어떤 증상을 보나요?",
            answer: "저장 직후 목록에 값이 안 보이거나 권한 변경이 늦게 반영되고 결제/주문 상태가 과거 값으로 보일 수 있습니다. 화면별 stale 허용 범위와 primary read route가 필요합니다.",
          },
          {
            q: "모든 읽기를 replica로 보내면 안 되는 이유는?",
            answer: "read-your-writes가 필요한 요청과 권한, 결제, 재고처럼 최신성이 불변식인 데이터는 lag가 곧 사용자 오류나 정합성 사고가 됩니다. 라우팅 정책은 쿼리 중요도와 lag threshold를 기준으로 나눕니다.",
          },
          {
            q: "failover 직후 무엇을 확인하나요?",
            answer: "새 primary의 timeline, replication slot, app connection string, read/write 분리 설정, 미적용 WAL 범위를 확인합니다. 장애 직후에는 split brain과 stale replica 재연결을 특히 경계해야 합니다.",
          },
        ],
        evidence: "REPLICATION LAG READ ROUTING POLICY, lag metric, primary-read route list",
      },
      {
        q: "Redis 장애가 DB 장애로 번지지 않게 하려면 무엇을 설계하나요?",
        answer: "cache stampede, hot key, memory eviction, failover gap을 전제로 TTL jitter, request coalescing, local cache, fallback budget, DB 보호 rate limit을 둡니다. Redis는 빠른 사본이지 정합성의 최종 방어선이 아닙니다.",
        followups: [
          {
            q: "분산 락을 직접 구현하면 무엇이 위험한가요?",
            answer: "owner token 없이 unlock하거나 TTL 만료 후 이전 owner가 작업을 계속하면 다른 요청의 lock을 지울 수 있습니다. Redis lock은 최종 방어가 아니라 DB unique constraint와 idempotency로 보강해야 합니다.",
          },
          {
            q: "TTL을 길게 하면 항상 좋은가요?",
            answer: "긴 TTL은 miss를 줄이지만 stale data와 권한 오염 시간을 늘립니다. 데이터 변경 빈도, 사용자 영향, 수동 invalidation 가능성을 기준으로 TTL과 jitter를 함께 정해야 합니다.",
          },
          {
            q: "캐시 miss 폭증을 어떻게 감지하나요?",
            answer: "cache hit ratio 하락만 보지 말고 key별 miss QPS, DB read burst, hot key 만료 시점, Redis evicted_keys를 함께 봅니다. 인기 키 만료와 배포 직후 cold cache를 분리해야 합니다.",
          },
        ],
        evidence: "REDIS PRODUCTION FAILURE MATRIX, evicted_keys, hot key QPS, DB read burst metric",
      },
    ],
  },
  {
    id: "engineering-runtime-quality-qa",
    title: "런타임 품질·장애대응 Q&A",
    subtitle: "관측성, SLO, p99, retry, DLQ, backpressure, incident command를 실전처럼 답하는 훈련 페이지입니다.",
    source: "런타임 품질·장애대응",
    questions: [
      {
        q: "p99 latency가 튀었을 때 어떤 순서로 봅니까?",
        answer: "route별 p99와 error rate로 증상을 잡고 trace로 span을 분해합니다. 이후 app thread/GC, DB pool/lock/query, downstream timeout/retry, queue lag를 순서대로 확인합니다.",
        followups: [
          {
            q: "평균 latency가 괜찮으면 장애가 아니라고 볼 수 있나요?",
            answer: "아닙니다. 평균은 소수 사용자의 tail latency를 숨깁니다. route별 p95/p99, timeout count, error budget burn을 함께 봐야 특정 tenant나 dependency에서만 느려지는 장애를 놓치지 않습니다.",
          },
          {
            q: "pool saturation과 DB slow query를 어떻게 구분하나요?",
            answer: "connection acquisition time과 SQL execution time을 분리합니다. pool wait가 길면 app이 connection을 못 빌리는 상태이고, SQL 시간이 길면 slow query, lock, plan regression을 pg_stat_activity와 query plan으로 봅니다.",
          },
          {
            q: "GC pause는 어떤 증거로 확인하나요?",
            answer: "GC log의 pause timestamp, JFR event, heap after GC, allocation rate를 p99 spike와 맞춥니다. 같은 시간대 correlation이 반복되어야 GC를 원인 후보로 강하게 볼 수 있습니다.",
          },
        ],
        evidence: "P99 LATENCY DECOMPOSITION TABLE, JFR, thread dump, pg_stat_activity, trace span",
      },
      {
        q: "Retry는 언제 위험해지나요?",
        answer: "하류가 이미 포화된 상황에서 여러 계층이 동시에 재시도하면 retry amplification으로 장애를 키웁니다. retry budget, exponential backoff with jitter, timeout, circuit breaker를 같이 둬야 합니다.",
        followups: [
          {
            q: "모든 5xx는 재시도해도 되나요?",
            answer: "아닙니다. 503이나 일시 timeout은 조건부 재시도 대상일 수 있지만 validation 성격의 5xx, 이미 side effect가 실행됐을 수 있는 요청은 위험합니다. retryable error code와 idempotency 보장이 필요합니다.",
          },
          {
            q: "timeout은 client와 server 중 어디에 두나요?",
            answer: "둘 다 둡니다. client timeout은 사용자 대기 시간을 제한하고 server timeout과 cancellation은 하류 작업이 계속 남지 않게 합니다. 전체 latency budget 안에서 gateway, app, DB timeout 순서를 맞춰야 합니다.",
          },
          {
            q: "재시도해도 안전하려면 API가 무엇을 가져야 하나요?",
            answer: "idempotency key, 중복 요청 처리 정책, side effect transaction 경계, retryable error contract가 있어야 합니다. 같은 요청이 두 번 와도 결제나 상태 변경이 중복 반영되지 않는 검증이 필요합니다.",
          },
        ],
        evidence: "retry count metric, circuit state, idempotency key, downstream SLO",
      },
      {
        q: "Consumer lag와 DLQ를 어떻게 운영하나요?",
        answer: "lag 증가는 생산 증가, 소비 실패, partition skew, downstream 지연으로 나눠 봅니다. DLQ는 독성 메시지를 격리하고, replay 전에는 idempotency와 dry-run count, 재처리 범위를 확인합니다.",
        followups: [
          {
            q: "DLQ를 비우면 해결인가요?",
            answer: "아닙니다. DLQ를 비우기 전에 실패 원인, poison message, downstream 복구 상태, 재처리 범위를 확인해야 합니다. replay 후에는 성공 건수와 남은 실패, 실제 side effect 반영까지 확인합니다.",
          },
          {
            q: "replay가 중복 부작용을 만들면 어떻게 하나요?",
            answer: "message id나 business key로 중복을 막고, processed table과 side effect를 같은 transaction에 묶습니다. 이미 중복이 발생했다면 보정 쿼리와 audit trail로 영향 범위를 확정해야 합니다.",
          },
          {
            q: "worker를 늘리면 항상 좋아지나요?",
            answer: "downstream이 병목이면 worker 증설은 timeout과 retry를 늘려 더 나빠질 수 있습니다. consume rate, error rate, downstream latency, partition skew를 보고 증설, rate limit, shedding 중 선택합니다.",
          },
        ],
        evidence: "CONSUMER LAG DLQ REPLAY RUNBOOK, consume rate, partition lag, replay fixture",
      },
      {
        q: "장애 대응에서 postmortem의 목적은 무엇인가요?",
        answer: "책임자를 찾는 것이 아니라 시스템이 사고를 허용한 조건을 찾아 재발 가능성을 줄이는 것입니다. impact, timeline, contributing factors, action item을 owner와 due date가 있는 형태로 남깁니다.",
        followups: [
          {
            q: "root cause 하나만 찾으면 충분한가요?",
            answer: "대부분 충분하지 않습니다. 직접 원인뿐 아니라 alert가 늦은 이유, rollback이 어려웠던 이유, runbook이 빠진 이유 같은 contributing factor를 찾아야 재발 가능성을 줄일 수 있습니다.",
          },
          {
            q: "액션 아이템이 좋은지 어떻게 판단하나요?",
            answer: "owner, due date, 검증 기준, 운영 증거가 있으면 좋습니다. 예를 들어 alert 추가는 실제 firing test나 dashboard link가 있어야 하고, runbook 수정은 다음 rehearsal에서 확인되어야 합니다.",
          },
          {
            q: "고객 커뮤니케이션은 언제 시작하나요?",
            answer: "고객 영향이 확인되거나 강하게 의심되면 원인 확정 전에도 시작합니다. 영향 범위, 현재 상태, 다음 업데이트 시각을 먼저 알리고, 원인과 복구 완료는 확인된 뒤 갱신합니다.",
          },
        ],
        evidence: "BACKEND INCIDENT POSTMORTEM MODEL, incident timeline, alert/runbook change",
      },
    ],
  },
  {
    id: "engineering-platform-tools-qa",
    title: "플랫폼 도구·운영 기본기 Q&A",
    subtitle: "Git, Docker, NGINX, 배포, 환경변수, 런타임 운영 도구를 재현성과 복구 기준으로 답하는 훈련 페이지입니다.",
    source: "플랫폼 도구·운영 기본기",
    questions: [
      {
        q: "Dockerfile을 리뷰할 때 무엇을 보나요?",
        answer: "멀티스테이지, base image 고정, non-root user, secret 미포함, layer cache, healthcheck, runtime env 주입 방식을 봅니다. 이미지는 빌드 산출물이고 환경별 값은 runtime에 주입해야 합니다.",
        followups: [
          {
            q: "build-time env와 runtime env를 왜 구분하나요?",
            answer: "build-time 값은 image layer와 artifact metadata에 남을 수 있고, runtime 값은 배포 환경에서 바뀌어야 합니다. 먼저 Dockerfile의 ARG/ENV 사용 위치와 image history를 확인하고, 실행 컨테이너의 redacted env readback으로 실제 주입 상태를 검증합니다.",
          },
          {
            q: "latest 태그가 왜 위험한가요?",
            answer: "latest는 같은 태그가 다른 digest를 가리킬 수 있어 장애 시 어떤 바이너리가 실행됐는지 재현하기 어렵습니다. 배포 기록에는 immutable tag와 digest를 남기고, rollback도 태그명이 아니라 이전 digest로 되돌릴 수 있어야 합니다.",
          },
          {
            q: "컨테이너가 재시작을 반복하면 무엇을 확인하나요?",
            answer: "exit code, restart count, 직전 로그, healthcheck 실패 원인, OOMKilled 여부, config mount 실패를 순서대로 봅니다. 재시작 정책만 완화하면 증상이 가려지므로 `docker inspect`나 orchestrator event와 앱 시작 로그를 맞춰 원인을 닫아야 합니다.",
          },
        ],
        evidence: "image digest, Dockerfile review, container logs, exit code, env diff",
      },
      {
        q: "배포가 성공했는데 서비스가 깨졌다면 어떤 순서로 보나요?",
        answer: "배포 artifact, release id, health check, config/env, DB migration, dependency connectivity, error rate, rollback 조건을 순서대로 확인합니다. CI 성공은 런타임 성공의 충분조건이 아닙니다.",
        followups: [
          {
            q: "readiness와 liveness를 왜 나누나요?",
            answer: "liveness는 프로세스를 재시작할지 판단하고 readiness는 트래픽을 받을 준비가 됐는지 판단합니다. DB 연결이나 migration 대기처럼 일시적으로 준비되지 않은 상태를 liveness 실패로 처리하면 재시작 폭주가 생기므로 probe 결과와 routing 상태를 분리해서 봅니다.",
          },
          {
            q: "migration 실패 시 rollback이 항상 가능한가요?",
            answer: "데이터 삭제, 컬럼 의미 변경, 외부 side effect가 있으면 단순 rollback이 불가능할 수 있습니다. 배포 전 expand-contract 단계, 백업, stop point, forward fix 스크립트를 준비하고 실패 후에는 migration table과 데이터 샘플 readback으로 실제 적용 범위를 확인합니다.",
          },
          {
            q: "canary에서 어떤 지표를 봐야 하나요?",
            answer: "error rate, latency percentile, saturation, business conversion, dependency error를 기존 버전과 같은 segment에서 비교합니다. 트래픽 비율만 작으면 희귀 경로가 빠질 수 있으므로 request id 샘플과 canary 대상 사용자 범위를 함께 확인합니다.",
          },
        ],
        evidence: "deployment log, artifact hash, health probe, migration status, canary metric",
      },
      {
        q: "NGINX나 reverse proxy 문제를 어떻게 좁히나요?",
        answer: "DNS, TLS, routing, upstream health, header forwarding, timeout, body size limit, proxy buffering을 분리합니다. 502는 앱 문제일 수도 있고 upstream 연결, protocol, timeout 문제일 수도 있습니다.",
        followups: [
          {
            q: "X-Forwarded-For를 왜 신뢰하면 안 되나요?",
            answer: "클라이언트가 임의로 보낼 수 있는 header라 trusted proxy 경계 밖의 값을 그대로 쓰면 audit, rate limit, allowlist가 우회될 수 있습니다. proxy에서 기존 값을 덮어쓰는지와 앱의 trusted proxy 설정을 확인하고, 테스트 요청으로 기록 IP가 기대대로 남는지 검증합니다.",
          },
          {
            q: "idle timeout이 긴 요청에 어떤 영향을 주나요?",
            answer: "proxy, load balancer, upstream 앱의 timeout 중 가장 짧은 값이 긴 요청을 끊을 수 있습니다. access log의 request time과 upstream response time, 앱 로그의 완료 시각을 맞춰 어느 계층이 먼저 연결을 닫았는지 확인합니다.",
          },
          {
            q: "CDN과 origin 중 어디서 막혔는지 어떻게 구분하나요?",
            answer: "응답 header, CDN request id, origin access log 존재 여부, cache status, 직접 origin curl 결과를 비교합니다. CDN에만 로그가 있고 origin request id가 없으면 edge 차단이나 cache 문제를 의심하고, 둘 다 있으면 upstream status와 origin 앱 로그로 이어갑니다.",
          },
        ],
        evidence: "access/error log, upstream status, curl -v, request id, proxy config diff",
      },
      {
        q: "운영 도구 문서가 좋은지 어떻게 판단하나요?",
        answer: "명령어 목록보다 전제 조건, 대상 환경, 성공/실패 판정, 되돌리기 절차가 있어야 합니다. 위험 명령은 dry-run과 readback 확인을 포함해야 합니다.",
        followups: [
          {
            q: "로컬에서만 성공한 절차를 어떻게 팀 절차로 바꾸나요?",
            answer: "새 환경에서 clean run을 해 보고 필요한 권한, 버전, env var, seed data, network 전제를 문서에 고정합니다. 성공 화면보다 health endpoint, 로그, readback 명령을 남겨 다른 사람이 같은 상태를 확인할 수 있게 해야 합니다.",
          },
          {
            q: "환경변수 누락을 어떻게 빨리 찾나요?",
            answer: "배포 manifest, secret/config key, process env, 앱 startup validation 순서로 봅니다. 민감값은 값 자체가 아니라 key 존재 여부와 version만 redacted dump로 확인하고, 기본값 때문에 조용히 잘못 동작하지 않게 필수 설정은 시작 시 실패시키는 편이 안전합니다.",
          },
          {
            q: "수동 조치 후 무엇을 기록해야 하나요?",
            answer: "대상 host나 namespace, 실행 명령, 변경 전후 diff, readback 결과, 영향 범위, rollback 명령, 코드 반영 PR을 기록합니다. 터미널 성공 출력만 남기면 운영 상태가 맞는지 알 수 없으므로 조회 결과와 로그 타임스탬프로 닫아야 합니다.",
          },
        ],
        evidence: "runbook, command output, readback query, rollback checklist, incident ticket",
      },
    ],
  },
  {
    id: "engineering-java-spring-qa",
    title: "Java·Spring·JPA 내부 동작 Q&A",
    subtitle: "JVM, Spring proxy, transaction propagation, JPA flush, lazy loading, bulk update를 내부 동작으로 답하는 훈련 페이지입니다.",
    source: "Java·Spring·JPA 내부 동작",
    questions: [
      {
        q: "Spring @Transactional이 동작하지 않는 대표 사례는 무엇인가요?",
        answer: "프록시 기반 AOP라서 같은 클래스 내부 self-invocation은 프록시를 거치지 않아 transaction advice가 적용되지 않습니다. public method 경계, bean 간 호출, proxy mode, propagation을 함께 봐야 합니다.",
        followups: [
          {
            q: "private method에 @Transactional을 붙이면 어떻게 되나요?",
            answer: "Spring proxy는 외부에서 호출되는 bean method를 감싸므로 private method에는 advice가 걸리지 않습니다. private 내부 로직에 트랜잭션이 필요하면 public transactional 경계를 별도 bean으로 옮기고 integration test에서 실제 commit/rollback 로그를 확인해야 합니다.",
          },
          {
            q: "readOnly는 DB에 어떤 영향을 줄 수 있나요?",
            answer: "Hibernate에서는 flush mode 최적화와 dirty checking 비용 감소에 영향을 줄 수 있고, DB/driver 조합에 따라 read-only transaction hint로 전달될 수 있습니다. 쓰기 방지 보안 장치로 믿으면 안 되며, readOnly 메서드에서 insert SQL이 나가는지 SQL log로 확인해야 합니다.",
          },
          {
            q: "REQUIRES_NEW는 언제 위험한가요?",
            answer: "외부 트랜잭션을 suspend하고 새 connection을 요구할 수 있어 pool이 작으면 대기와 deadlock처럼 보이는 지연을 만들 수 있습니다. outer rollback 뒤 inner commit이 남는 의미도 명확해야 하므로 audit처럼 독립 보존이 필요한 경우에만 connection pool metric과 rollback test로 검증합니다.",
          },
        ],
        evidence: "SPRING TRANSACTION PROPAGATION DECISION, transaction log, integration test",
      },
      {
        q: "JPA dirty checking과 flush를 설명해보세요.",
        answer: "영속성 컨텍스트가 엔티티 스냅샷을 보관하고 변경을 감지해 flush 시 SQL을 생성합니다. flush는 commit 전에 query 실행, explicit flush, transaction commit 시 발생할 수 있고 DB commit과 같은 말은 아닙니다.",
        followups: [
          {
            q: "flush 후 rollback하면 DB에는 어떻게 되나요?",
            answer: "flush는 SQL을 DB에 보낼 뿐 commit은 아닙니다. 같은 트랜잭션이 rollback되면 변경은 사라지지만, constraint violation처럼 flush 시점에 먼저 터지는 오류가 있으므로 테스트에서는 flush SQL과 rollback 후 조회를 같이 확인합니다.",
          },
          {
            q: "bulk update 후 영속성 컨텍스트가 왜 stale해지나요?",
            answer: "JPQL bulk update는 영속성 컨텍스트의 entity snapshot을 갱신하지 않고 DB row를 직접 바꿉니다. 이미 로딩된 entity는 예전 값을 들고 있으므로 clear, refresh, 별도 transaction 경계 없이는 이후 dirty checking이 DB 변경을 덮을 수 있습니다.",
          },
          {
            q: "open session in view는 왜 위험할 수 있나요?",
            answer: "view 렌더링 중 lazy loading이 가능해져 controller 밖에서 SQL이 발생합니다. transaction 경계와 조회 계획이 흐려지고 화면 필드 추가가 N+1을 만들 수 있으므로 OSIV 설정, SQL log, query count test로 위험을 드러내야 합니다.",
          },
        ],
        evidence: "JPA FLUSH DIRTY CHECKING MECHANISM, SQL log, persistence context test",
      },
      {
        q: "N+1 문제를 어떻게 발견하고 해결하나요?",
        answer: "목록 조회 후 각 엔티티의 연관을 lazy load하면서 추가 쿼리가 반복되는 문제입니다. query count test, SQL log, APM span으로 발견하고 fetch join, entity graph, batch size, DTO projection 중 요구에 맞게 고릅니다.",
        followups: [
          {
            q: "fetch join을 항상 쓰면 되나요?",
            answer: "항상 맞지는 않습니다. to-many fetch join은 row 폭과 중복을 키우고 여러 collection fetch에서 Cartesian product를 만들 수 있어 화면에 필요한 association, cardinality, pagination 여부를 SQL log와 실행 계획으로 보고 결정합니다.",
          },
          {
            q: "pagination과 fetch join은 어떤 문제가 있나요?",
            answer: "to-many fetch join은 DB row가 child 수만큼 늘어나서 limit/offset이 parent 기준 pagination과 어긋날 수 있습니다. ID만 먼저 page로 뽑은 뒤 fetch query를 한 번 더 실행하거나 batch size를 쓰는 패턴을 검증합니다.",
          },
          {
            q: "DTO projection은 언제 더 낫나요?",
            answer: "쓰기 entity graph가 필요 없고 화면/API가 일부 컬럼만 요구할 때 DTO projection이 더 명확합니다. lazy proxy 초기화 없이 필요한 join과 컬럼만 가져오므로 query count와 select column을 SQL log로 확인하기 쉽습니다.",
          },
        ],
        evidence: "query count assertion, Hibernate statistics, fetch plan review",
      },
      {
        q: "JVM 메모리와 thread 병목은 어디서 갈라지나요?",
        answer: "heap, stack, metaspace, direct memory를 나누고, thread pool queue, blocking call, GC pause, allocation rate를 함께 봅니다. CPU가 낮아도 thread가 DB pool이나 lock에서 대기하면 latency가 커질 수 있습니다.",
        followups: [
          {
            q: "OOM과 memory leak은 같은가요?",
            answer: "같지 않습니다. OOM은 메모리 할당 실패 현상이고 leak은 객체가 더 이상 필요 없는데 reference 때문에 회수되지 않는 원인 중 하나입니다. heap dump dominator tree, allocation profile, GC log로 증가 패턴과 보유 경로를 분리합니다.",
          },
          {
            q: "thread dump에서 무엇을 보나요?",
            answer: "RUNNABLE, BLOCKED, WAITING 상태와 stack trace의 공통 위치를 봅니다. 많은 request thread가 Hikari pool acquire, socket read, synchronized lock에 몰려 있으면 CPU보다 외부 dependency, connection pool, lock 경합을 먼저 의심합니다.",
          },
          {
            q: "GC 튜닝 전에 무엇을 먼저 확인하나요?",
            answer: "allocation rate, live set 크기, heap sizing, large object 생성 위치를 먼저 봅니다. GC 옵션부터 바꾸면 누수나 과도한 객체 생성을 숨길 수 있으므로 JFR, GC log, load test 조건을 고정해 병목을 재현합니다.",
          },
        ],
        evidence: "JVM MEMORY THREAD FAILURE MATRIX, JFR, heap dump, thread dump, GC log",
      },
    ],
  },
];

const additionalQuestionsByPageId = {
  "engineering-backend-core-qa": [
    {
      q: "API error contract를 왜 먼저 정의해야 하나요?",
      answer: "오류 계약은 클라이언트 UX, 재시도 가능성, 관측성, 보안 노출 범위를 함께 결정합니다. status code, machine-readable error code, user message, retryable 여부, trace id를 먼저 정해야 실패가 제품 흐름 안에 들어옵니다.",
      followups: [
        {
          q: "400과 422를 어떻게 구분하나요?",
          answer: "400은 요청 형식이나 파싱 자체가 잘못된 경우, 422는 문법은 맞지만 도메인 규칙을 통과하지 못한 경우에 씁니다. 팀 API 계약에서 일관되게 고정하는 것이 더 중요합니다.",
        },
        {
          q: "에러 메시지에 내부 원인을 얼마나 노출하나요?",
          answer: "사용자가 고칠 수 있는 정보만 노출하고 stack, SQL, 내부 식별자, 보안 판단 근거는 숨깁니다. 운영 추적은 trace id와 내부 로그로 연결합니다.",
        },
        {
          q: "retryable 필드는 언제 유용한가요?",
          answer: "클라이언트가 timeout, rate limit, 일시적 dependency 실패를 구분해 자동 재시도나 사용자 안내를 선택해야 할 때 유용합니다.",
        },
      ],
      evidence: "error response schema, negative API test, client recovery path, trace id sample",
    },
    {
      q: "Idempotency key는 어디에 저장하고 어떤 응답을 돌려야 하나요?",
      answer: "idempotency key는 actor, endpoint, request fingerprint, response result와 함께 서버 저장소에 둡니다. 같은 key와 같은 payload는 저장된 결과를 재반환하고, 같은 key에 다른 payload가 오면 conflict로 막아야 합니다.",
      followups: [
        {
          q: "idempotency 저장 TTL은 어떻게 정하나요?",
          answer: "클라이언트 재시도 창, 결제사 재전송 기간, 장애 복구 시간을 기준으로 잡습니다. 너무 짧으면 중복 처리를 놓치고 너무 길면 저장 비용이 커집니다.",
        },
        {
          q: "결제 요청에서 처리 중 상태를 어떻게 응답하나요?",
          answer: "이미 처리 중인 같은 key라면 processing 상태나 조회 가능한 operation id를 돌려줍니다. 클라이언트가 같은 요청을 계속 새로 만들지 않게 해야 합니다.",
        },
        {
          q: "key만 같고 body가 다르면 왜 위험한가요?",
          answer: "다른 작업을 같은 처리 결과로 오인할 수 있습니다. request fingerprint를 저장해 body가 달라진 key 재사용은 conflict로 거절해야 합니다.",
        },
      ],
      evidence: "idempotency ledger table, unique constraint, duplicate request integration test",
    },
    {
      q: "동시성 문제를 application lock으로 막으면 충분한가요?",
      answer: "단일 JVM 안에서는 일부 효과가 있지만, 서버가 여러 대면 application lock은 전역 정합성을 보장하지 못합니다. 최종 방어는 DB constraint, optimistic version, row lock, idempotency key처럼 공유 저장소가 강제하는 규칙이어야 합니다.",
      followups: [
        {
          q: "synchronized가 왜 분산 환경에서 깨지나요?",
          answer: "JVM 프로세스 안에서만 잠기기 때문에 다른 서버 인스턴스의 같은 요청을 막지 못합니다. 여러 인스턴스가 공유하는 저장소 제약이 필요합니다.",
        },
        {
          q: "낙관적 락 충돌은 사용자에게 어떻게 보이나요?",
          answer: "동시에 수정되어 저장하지 못했다는 충돌 응답이나 재조회 안내로 보여야 합니다. 무조건 조용히 재시도하면 사용자의 변경 의도를 덮을 수 있습니다.",
        },
        {
          q: "DB unique constraint와 비즈니스 검증은 어떻게 나누나요?",
          answer: "비즈니스 검증은 친절한 사전 오류와 정책 표현을 맡고, unique constraint는 경쟁 조건에서 중복 생성을 막습니다. DB 오류는 API error contract로 매핑합니다.",
        },
      ],
      evidence: "concurrent test, optimistic lock retry policy, DB unique violation mapping",
    },
    {
      q: "외부 API timeout을 어떻게 정하나요?",
      answer: "사용자 요청의 전체 latency budget에서 downstream 호출이 쓸 수 있는 시간을 역산합니다. connect timeout, read timeout, retry count, circuit breaker, fallback을 함께 정하고, timeout 이후 실제 처리 성공 가능성을 idempotency로 흡수합니다.",
      followups: [
        {
          q: "timeout이 너무 길면 어떤 장애가 생기나요?",
          answer: "thread, connection, request slot이 오래 묶여 상류까지 대기열이 퍼집니다. 사용자는 이미 포기했는데 서버는 계속 하류를 압박할 수 있습니다.",
        },
        {
          q: "client timeout 후 server가 성공하면 어떻게 수렴하나요?",
          answer: "operation id나 idempotency key로 최종 상태를 조회하게 합니다. 중복 재시도가 같은 side effect를 다시 만들지 않도록 ledger가 필요합니다.",
        },
        {
          q: "retry는 몇 번이 적절한가요?",
          answer: "전체 latency budget과 하류 SLO 안에서 정합니다. 짧은 timeout, 제한된 횟수, jitter가 있는 backoff, retryable 오류 구분이 함께 있어야 합니다.",
        },
      ],
      evidence: "latency budget table, HTTP client config, retry metric, circuit breaker state",
    },
    {
      q: "DTO, entity, domain model을 왜 분리하나요?",
      answer: "외부 API 계약, 영속성 구조, 도메인 불변식은 변경 이유가 다릅니다. Entity를 그대로 response로 내보내면 lazy loading, 순환 참조, 내부 필드 노출, API 호환성 문제가 생길 수 있습니다.",
      followups: [
        {
          q: "항상 분리해야 하나요?",
          answer: "외부 계약, 영속성 모델, 도메인 규칙의 변경 이유가 다르면 분리하는 편이 안전합니다. 단순 내부 CRUD처럼 변화와 노출 위험이 낮으면 얇게 시작할 수 있습니다.",
        },
        {
          q: "작은 CRUD에서 과한 분리는 어떤 비용이 있나요?",
          answer: "반복 매핑 코드와 테스트 표면이 늘어납니다. 같은 필드를 계속 옮기는 비용이 크다면 공통 mapper나 projection 기준을 두되, 외부 응답 계약은 entity와 묶지 않습니다.",
        },
        {
          q: "DTO projection은 언제 유리한가요?",
          answer: "목록 화면처럼 필요한 필드가 적고 fetch plan을 명확히 줄이고 싶을 때 유리합니다. entity graph 전체를 로딩하지 않아 serialization 비용과 N+1 위험을 줄입니다.",
        },
      ],
      evidence: "response contract, serialization test, fetch plan, compatibility note",
    },
    {
      q: "Pagination을 offset 방식으로만 쓰면 어떤 문제가 생기나요?",
      answer: "offset은 뒤 페이지로 갈수록 DB가 건너뛸 row가 많아지고, 중간 삽입/삭제가 있으면 중복이나 누락이 생길 수 있습니다. 안정적 정렬 키가 있으면 cursor pagination을 고려하고, 정렬 조건과 index를 함께 설계합니다.",
      followups: [
        {
          q: "cursor에는 어떤 값을 넣나요?",
          answer: "안정적인 정렬 키와 tie-breaker를 넣습니다. 예를 들어 createdAt만으로 중복이 가능하면 id까지 함께 넣어 다음 페이지 경계를 명확히 합니다.",
        },
        {
          q: "정렬 기준이 여러 개면 어떻게 하나요?",
          answer: "정렬 tuple 전체를 cursor에 담고 같은 순서의 복합 index를 고려합니다. 클라이언트가 임의 정렬을 바꾸면 cursor 호환성이 깨질 수 있습니다.",
        },
        {
          q: "총 개수 count는 항상 제공해야 하나요?",
          answer: "항상 필요하지 않습니다. UX가 전체 개수를 요구하지 않으면 hasNext나 approximate count로 비용을 줄일 수 있습니다.",
        },
      ],
      evidence: "pagination contract, index order, EXPLAIN plan, duplicate/missing fixture",
    },
    {
      q: "부분 실패가 생기는 기능을 어떻게 설계하나요?",
      answer: "부분 실패는 정상적인 운영 조건으로 보고 상태를 명시합니다. 전체 성공/실패만 두지 말고 pending, compensating, failed, retrying 같은 상태와 reconciliation job, 사용자 안내, 운영 알림을 함께 설계합니다.",
      followups: [
        {
          q: "사용자에게 pending을 보여줘도 되나요?",
          answer: "처리가 실제로 비동기라면 보여주는 편이 정직합니다. 다만 예상 소요, 새로고침 방식, 실패 시 다음 행동을 함께 제공해야 합니다.",
        },
        {
          q: "보상 트랜잭션은 rollback과 어떻게 다른가요?",
          answer: "rollback은 아직 commit되지 않은 변경을 되돌리고, 보상은 이미 반영된 비즈니스 결과를 반대 작업으로 수습합니다. 외부 side effect가 있으면 보상이 필요합니다.",
        },
        {
          q: "재처리 버튼은 누가 누를 수 있어야 하나요?",
          answer: "권한 있는 운영자나 안전하게 제한된 사용자에게만 열어야 합니다. 재처리는 idempotent해야 하고 실행 이유와 결과가 audit에 남아야 합니다.",
        },
      ],
      evidence: "state machine, reconciliation query, retry job log, user-visible status contract",
    },
    {
      q: "백엔드 PR에서 반드시 남겨야 할 운영 증거는 무엇인가요?",
      answer: "변경 경로, 실패 응답, 테스트 결과, metric/log 필드, rollback 또는 feature flag 계획을 남겨야 합니다. 특히 상태 변경 기능은 배포 후 어떤 지표를 보고 멈출지까지 PR에 포함해야 합니다.",
      followups: [
        {
          q: "작은 변경에도 dashboard가 필요한가요?",
          answer: "반복 배포되는 경로라면 최소한 기존 release health 지표로 확인할 수 있어야 합니다. 새 dashboard가 아니어도 error, latency, business count를 볼 위치는 PR에 적습니다.",
        },
        {
          q: "rollback이 불가능한 DB 변경은 어떻게 하나요?",
          answer: "expand-contract 순서, stop point, backup, forward repair를 준비합니다. 배포 후 되돌릴 수 없는 지점을 명시해야 운영 판단이 가능합니다.",
        },
        {
          q: "로그 필드는 어느 정도가 적절한가요?",
          answer: "actor, resource, action, result, trace id처럼 사고 범위와 사용자 영향 판단에 필요한 필드를 남깁니다. 민감 정보는 redaction하고 고빈도 로그는 sampling 정책을 둡니다.",
        },
      ],
      evidence: "PR checklist, smoke test result, release health metric, rollback stop point",
    },
  ],
  "engineering-backend-auth-security-qa": [
    {
      q: "CSRF와 CORS는 같은 문제인가요?",
      answer: "아닙니다. CSRF는 브라우저가 쿠키를 자동 전송하는 특성을 악용해 사용자의 의도 없는 상태 변경을 유도하는 공격이고, CORS는 브라우저가 cross-origin JS 접근을 제한하는 정책입니다.",
      followups: [
        {
          q: "SameSite=Lax면 CSRF가 완전히 해결되나요?",
          answer: "완전한 해결책은 아닙니다. SameSite=Lax는 일반적인 cross-site POST 위험을 줄이지만 예외 흐름과 브라우저 차이가 있으므로 민감한 상태 변경에는 CSRF token과 Origin 검증을 함께 둡니다.",
        },
        {
          q: "Authorization header를 쓰면 CSRF 위험이 줄어드나요?",
          answer: "브라우저가 자동으로 Authorization header를 붙이지 않는 구조라면 CSRF 위험은 줄어듭니다. 대신 JS가 token을 다루므로 XSS와 token 저장 위치가 더 중요해집니다.",
        },
        {
          q: "CORS allow credentials는 왜 조심해야 하나요?",
          answer: "credentials를 허용하면 쿠키를 동반한 cross-origin 요청 결과를 브라우저가 읽을 수 있습니다. 정확한 Origin allowlist와 Vary: Origin, preflight 정책을 고정해야 합니다.",
        },
      ],
      evidence: "cookie matrix, CSRF negative test, CORS preflight response, SameSite policy",
    },
    {
      q: "JWT를 쓰면 서버 세션 저장소가 필요 없나요?",
      answer: "access token 검증 자체는 stateless일 수 있지만, 로그아웃, 강제 차단, refresh rotation, device 관리, 침해 대응을 하려면 서버 측 상태가 필요할 때가 많습니다. stateless와 통제 가능성 사이의 trade-off입니다.",
      followups: [
        {
          q: "JWT 즉시 무효화는 어떻게 하나요?",
          answer: "짧은 access token만으로는 즉시 무효화가 어렵습니다. token version, revoke list, session store, refresh token family 상태를 서버에 두고 인증 필터에서 확인해야 합니다.",
        },
        {
          q: "refresh token은 어디에 저장하나요?",
          answer: "브라우저는 HttpOnly Secure SameSite cookie가 일반적으로 안전하고, 모바일은 OS secure storage를 씁니다. 서버에는 원문 대신 hash와 token family, device 정보를 저장합니다.",
        },
        {
          q: "토큰 탈취를 어떻게 탐지하나요?",
          answer: "refresh token 재사용, 낯선 device나 ASN, impossible travel, token family 충돌, 비정상 scope 사용을 audit 이벤트로 잡습니다. 탐지 후에는 관련 family revoke와 사용자 알림이 필요합니다.",
        },
      ],
      evidence: "token lifecycle runbook, revoke table, refresh token family log",
    },
    {
      q: "비밀번호 저장은 bcrypt만 쓰면 충분한가요?",
      answer: "bcrypt, Argon2 같은 느린 해시와 salt는 기본이고, 계정 생명주기 전체가 중요합니다. rate limit, credential stuffing 탐지, MFA, 복구 플로우, 비밀번호 변경 후 세션 폐기까지 함께 설계해야 합니다.",
      followups: [
        {
          q: "pepper는 언제 쓰나요?",
          answer: "DB 유출만으로 비밀번호 검증이 어려워지게 하려면 애플리케이션 외부 secret인 pepper를 둘 수 있습니다. KMS나 secret manager, rotation 절차가 없으면 운영 리스크가 더 커집니다.",
        },
        {
          q: "비밀번호 재설정 링크는 어떤 속성이 필요하나요?",
          answer: "충분한 entropy, 짧은 TTL, 단회성, 서버 저장 hash, 사용 후 폐기, 계정 존재 여부를 드러내지 않는 응답이 필요합니다. 재설정 성공 후 기존 세션 폐기도 검토합니다.",
        },
        {
          q: "로그인 실패 제한은 사용자 경험과 어떻게 균형을 잡나요?",
          answer: "계정, IP, device 기준을 조합하고 progressive delay, risk-based MFA, CAPTCHA를 단계적으로 적용합니다. 정상 사용자 lockout을 줄이면서 credential stuffing 비용을 높입니다.",
        },
      ],
      evidence: "password policy, reset token TTL, login failure metric, session invalidation test",
    },
    {
      q: "RBAC, ABAC, ReBAC를 어떻게 구분하나요?",
      answer: "RBAC는 역할 기반, ABAC는 속성 기반, ReBAC는 관계 기반 인가입니다. 실무에서는 role만으로 부족한 경우가 많아 tenant, owner, department, resource state 같은 속성을 함께 봅니다.",
      followups: [
        {
          q: "관리자면 모든 데이터를 봐도 되나요?",
          answer: "아닙니다. 관리자도 업무 목적, tenant scope, approval, reason code, session freshness가 필요합니다. 내부자 오남용을 막기 위해 조회와 export는 별도 audit 대상입니다.",
        },
        {
          q: "권한 정책은 코드에 박아도 되나요?",
          answer: "작고 안정적인 정책은 코드로 충분할 수 있습니다. 정책이 자주 바뀌거나 조건이 많아지면 decision table, policy object, 테스트 fixture로 분리해 변경 영향과 리뷰 범위를 줄입니다.",
        },
        {
          q: "정책 변경은 어떻게 테스트하나요?",
          answer: "허용 케이스보다 forbidden actor, foreign tenant, expired session, privilege escalation 같은 negative fixture를 먼저 고정합니다. audit event와 error code 변화도 함께 검증합니다.",
        },
      ],
      evidence: "authorization decision table, policy test, admin audit event",
    },
    {
      q: "파일 다운로드나 export API에서 흔한 보안 실수는 무엇인가요?",
      answer: "file id나 signed URL만 확인하고 actor-resource tenant 관계를 다시 확인하지 않는 실수가 많습니다. export 생성자, tenant, 만료 시간, scope, 다운로드 audit를 모두 검증해야 합니다.",
      followups: [
        {
          q: "signed URL이면 권한 체크를 생략해도 되나요?",
          answer: "생성 시점의 actor, tenant, scope를 강하게 묶고 TTL을 짧게 해야 합니다. 가능하면 다운로드 시에도 export owner와 resource scope를 재검증하고 audit를 남깁니다.",
        },
        {
          q: "export 파일은 얼마나 보관하나요?",
          answer: "업무 목적에 필요한 최소 기간만 보관합니다. PII 포함 여부, 계약상 보존 의무, 재다운로드 필요성을 기준으로 TTL을 정하고 만료 후 삭제를 검증합니다.",
        },
        {
          q: "대량 다운로드 이상 징후는 어떻게 잡나요?",
          answer: "tenant별 export volume, actor role, reason code, 시간대, IP/device 변화, 평소 baseline 대비 증가율을 봅니다. 임계 초과 시 step-up MFA나 approval을 요구합니다.",
        },
      ],
      evidence: "export IDOR fixture, signed URL TTL, audit log, anomaly alert",
    },
    {
      q: "Webhook 보안은 signature만 검증하면 끝인가요?",
      answer: "signature는 출처 검증이고, replay 방지와 멱등 처리는 별도입니다. timestamp tolerance, event id ledger, payload schema, 처리 결과 저장, 재처리 정책까지 있어야 합니다.",
      followups: [
        {
          q: "서명은 맞지만 같은 event가 두 번 오면요?",
          answer: "event id ledger에서 이미 처리된 이벤트면 no-op 처리하고 2xx로 응답합니다. 실제 side effect는 business unique constraint와 idempotency key로 한 번만 발생하게 막습니다.",
        },
        {
          q: "provider가 재전송하면 어떻게 응답하나요?",
          answer: "일시 오류로 처리하지 못했으면 5xx로 재전송을 유도하고, 이미 처리했거나 영구적으로 무시할 이벤트면 2xx로 종료합니다. 내부 처리 상태는 event ledger에 남깁니다.",
        },
        {
          q: "webhook 순서가 뒤섞이면 어떻게 하나요?",
          answer: "aggregate id와 version, event timestamp를 확인해 오래된 이벤트를 버리거나 보정합니다. 순서가 중요한 도메인은 partition key와 state machine으로 전이를 제한합니다.",
        },
      ],
      evidence: "signature verification test, event ledger, idempotency constraint, replay fixture",
    },
    {
      q: "Audit log는 application log와 무엇이 다른가요?",
      answer: "application log는 디버깅 목적이고 audit log는 행위 증명 목적입니다. 누가, 언제, 어떤 권한으로, 어떤 자원에, 어떤 결정을 내렸는지 변조하기 어렵게 남겨야 합니다.",
      followups: [
        {
          q: "audit log에 개인정보를 얼마나 넣나요?",
          answer: "행위 증명에 필요한 식별자와 최소 속성만 남깁니다. 원문 PII는 masking이나 tokenization을 적용하고, audit 저장소 자체의 접근 권한과 보존 기간을 별도로 관리합니다.",
        },
        {
          q: "관리자가 audit log를 지우면 어떻게 하나요?",
          answer: "관리자도 임의 삭제하지 못하도록 append-only sink, 별도 권한, 보존 정책, hash chain이나 외부 저장소를 둡니다. 삭제 요청과 보존 예외도 audit 대상입니다.",
        },
        {
          q: "감사 로그는 어떤 쿼리로 사고 범위를 잡나요?",
          answer: "actor, tenant, resource, action, decision, time range, request id로 영향 범위를 좁힙니다. export id나 impersonation id가 있으면 관련 다운로드와 권한 변경까지 연결합니다.",
        },
      ],
      evidence: "append-only audit sink, actor/action/resource fields, tamper resistance policy",
    },
    {
      q: "Rate limit은 보안 기능인가요, 성능 기능인가요?",
      answer: "둘 다입니다. brute force, scraping, credential stuffing을 줄이는 보안 제어이면서, 하류 시스템을 보호하는 트래픽 제어입니다. actor 기준, IP 기준, tenant 기준, endpoint 비용 기준을 나눠야 합니다.",
      followups: [
        {
          q: "NAT 환경에서 IP 기준 제한은 어떤 문제가 있나요?",
          answer: "여러 사용자가 같은 IP를 공유해 정상 사용자까지 차단될 수 있습니다. IP만 쓰지 않고 account, device, tenant, endpoint cost, 실패 유형을 조합해야 합니다.",
        },
        {
          q: "로그인 rate limit과 API rate limit은 어떻게 다르나요?",
          answer: "로그인은 credential stuffing과 brute force 방어가 핵심이라 실패 횟수, 계정, device 신호를 봅니다. 일반 API는 비용, quota, scraping, 하류 부하를 기준으로 제한합니다.",
        },
        {
          q: "Redis 장애 시 fail-open인가요 fail-closed인가요?",
          answer: "인증, 결제, 관리자 작업처럼 abuse 영향이 큰 경로는 fail-closed나 강한 degraded mode가 맞습니다. 저위험 조회는 제한적으로 fail-open하되 장애 로그와 후속 분석을 남깁니다.",
        },
      ],
      evidence: "rate limit policy, Redis counter key design, abuse metric, block audit",
    },
  ],
  "engineering-backend-architecture-qa": [
    {
      q: "모듈러 모놀리스는 MSA보다 낮은 수준의 설계인가요?",
      answer: "아닙니다. 모듈러 모놀리스는 분산 운영 비용 없이 코드 경계를 강제하는 강한 선택입니다. 팀 규모, 배포 독립성, 장애 격리, 데이터 소유권 요구가 충분히 크지 않으면 더 합리적일 수 있습니다.",
      followups: [
        {
          q: "모듈 경계는 어떻게 강제하나요?",
          answer: "package visibility, module dependency rule, architecture test, build module 분리로 강제합니다. service가 다른 module의 repository나 entity를 직접 참조하지 못하게 하고 공개 API만 허용해야 합니다.",
        },
        {
          q: "언제 모듈러 모놀리스가 한계에 닿나요?",
          answer: "한 배포 단위 때문에 팀 릴리스가 계속 막히거나, 특정 모듈 장애가 전체 프로세스를 자주 끌고 내려갈 때입니다. 데이터 소유권과 관측성이 준비되어 있으면 해당 경계를 서비스로 분리할 후보가 됩니다.",
        },
        {
          q: "MSA로 갈 때 첫 분리 대상은 무엇인가요?",
          answer: "변경 이유와 owner가 뚜렷하고 데이터 소유권을 좁게 가져갈 수 있으며 장애 격리 이득이 큰 기능부터 봅니다. shared table이 많거나 transaction이 넓은 영역은 먼저 모듈 경계를 정리해야 합니다.",
        },
      ],
      evidence: "module dependency rule, change history, deploy conflict metric, ADR",
    },
    {
      q: "공유 라이브러리는 좋은 재사용인가요 위험한 결합인가요?",
      answer: "도메인 정책이 공유 라이브러리로 빠지면 여러 서비스가 같은 변경 압력에 묶입니다. 유틸, client, schema는 가능하지만 비즈니스 규칙 공유는 경계 침식을 의심해야 합니다.",
      followups: [
        {
          q: "공통 DTO 패키지는 괜찮나요?",
          answer: "내부 서비스 간 public contract라면 schema와 version 정책을 가진 별도 artifact로 관리할 수 있습니다. 하지만 내부 entity나 화면 편의 필드까지 공유하면 consumer가 provider 내부 모델에 묶입니다.",
        },
        {
          q: "버전 호환성은 어떻게 관리하나요?",
          answer: "additive change, deprecation window, consumer contract test, semantic versioning으로 관리합니다. breaking change는 병렬 버전이나 adapter를 두고 consumer 전환 상태를 추적해야 합니다.",
        },
        {
          q: "라이브러리 변경이 전체 배포를 강제하면 무엇이 문제인가요?",
          answer: "서비스가 독립적으로 릴리스되지 못하고 작은 정책 변경도 전체 시스템 배포 위험으로 커집니다. 특히 도메인 규칙 라이브러리는 변경 owner와 장애 범위를 여러 팀에 퍼뜨립니다.",
        },
      ],
      evidence: "dependency graph, shared package changelog, consumer compatibility test",
    },
    {
      q: "CQRS는 언제 도입할 만한가요?",
      answer: "읽기와 쓰기의 모델, 성능 요구, 스케일 특성이 크게 다를 때 도입할 수 있습니다. 단순 CRUD에 쓰면 projection, 동기화, eventual consistency 비용만 늘어날 수 있습니다.",
      followups: [
        {
          q: "조회 모델은 어떻게 갱신하나요?",
          answer: "command side의 domain event나 outbox relay로 projection worker가 갱신합니다. projection은 idempotent해야 하고 event 순서, replay, poison message, lag 지표를 운영 모델에 포함해야 합니다.",
        },
        {
          q: "projection lag는 사용자에게 어떻게 보이나요?",
          answer: "쓰기 후 목록이나 통계에 반영이 늦게 보입니다. pending 상태, 새로고침 안내, last updated 표시를 두고 즉시 확인이 필요한 화면은 command side 조회나 primary read로 보완합니다.",
        },
        {
          q: "command model과 query model이 다르면 테스트는 어떻게 하나요?",
          answer: "명령 처리 후 event가 projection에 반영되는 통합 테스트와 reconciliation query를 둡니다. query model이 파생 데이터라는 점을 명시하고 replay 결과가 같은지 fixture로 검증합니다.",
        },
      ],
      evidence: "read/write workload split, projection lag metric, reconciliation query",
    },
    {
      q: "이벤트 소싱은 audit log와 같은 건가요?",
      answer: "다릅니다. 이벤트 소싱은 상태의 원천을 이벤트로 두고 재생해 현재 상태를 만듭니다. audit log는 행위 증명이 목적이며, 기존 상태 저장 모델 옆에 붙을 수 있습니다.",
      followups: [
        {
          q: "이벤트를 수정해야 하면 어떻게 하나요?",
          answer: "이미 저장된 이벤트는 감사와 재생의 원천이므로 직접 덮어쓰기보다 보정 이벤트를 추가합니다. 잘못된 이벤트가 많으면 migration script와 재생 검증을 별도 release 절차로 다뤄야 합니다.",
        },
        {
          q: "snapshot은 왜 필요한가요?",
          answer: "이벤트 수가 커지면 매번 처음부터 재생하는 비용이 커집니다. snapshot은 특정 시점 상태를 저장해 복원 속도를 줄이지만 snapshot schema와 이벤트 replay 호환성을 함께 관리해야 합니다.",
        },
        {
          q: "이벤트 스키마 변경은 어떻게 하나요?",
          answer: "새 필드는 optional로 추가하고 consumer가 unknown field를 무시하도록 합니다. 의미 변경이나 필드 제거는 새 event type이나 version을 두고 오래된 consumer가 사라진 뒤 정리합니다.",
        },
      ],
      evidence: "event store contract, snapshot policy, schema evolution test",
    },
    {
      q: "동기 REST와 비동기 이벤트 중 무엇을 선택하나요?",
      answer: "사용자 요청 안에서 즉시 결과가 필요하고 실패를 바로 알려야 하면 동기, 후처리나 fan-out, peak 완충, 장애 격리가 중요하면 비동기를 고려합니다. 비동기는 결과적 일관성 비용을 감당할 수 있어야 합니다.",
      followups: [
        {
          q: "알림 발송은 동기여야 하나요?",
          answer: "대부분 핵심 transaction 밖에서 비동기로 처리하는 편이 낫습니다. 알림 provider 장애가 주문이나 가입 성공을 막지 않게 outbox와 retry, DLQ를 둡니다.",
        },
        {
          q: "결제는 비동기로 해도 되나요?",
          answer: "사용자에게 즉시 승인 여부를 알려야 하는 단계는 동기 확인이 필요할 수 있습니다. 다만 정산, 영수증, 후속 알림은 event로 분리하고 중복 callback은 idempotency key로 방어합니다.",
        },
        {
          q: "비동기 결과를 UI에 어떻게 보여주나요?",
          answer: "accepted, processing, failed, completed 같은 명시 상태를 노출하고 polling, websocket, notification 중 제품 요구에 맞게 선택합니다. 결과적 일관성 동안 사용자가 반복 제출하지 않도록 idempotency token을 유지합니다.",
        },
      ],
      evidence: "sequence diagram, user-visible state, event contract, SLO impact",
    },
    {
      q: "데이터 소유권이 불명확하면 어떤 문제가 생기나요?",
      answer: "여러 서비스가 같은 데이터를 쓰면 정합성, 권한, migration, 장애 책임이 흐려집니다. 어떤 서비스가 write owner인지와 다른 서비스가 어떤 read model로 보는지 명확해야 합니다.",
      followups: [
        {
          q: "read-only 공유 DB는 괜찮나요?",
          answer: "임시 migration 단계라면 가능하지만 장기화되면 schema 변경과 권한 정책에 결합됩니다. read model, API, CDC projection으로 옮길 계획과 종료 조건이 있어야 합니다.",
        },
        {
          q: "소유권 이전 중 dual write는 어떻게 피하나요?",
          answer: "기존 owner를 source of truth로 두고 outbox나 CDC로 새 저장소를 채운 뒤 read 검증과 traffic 전환을 합니다. 불가피한 dual write는 idempotency, reconciliation, rollback stop point를 같이 둬야 합니다.",
        },
        {
          q: "데이터 복제 불일치는 어떻게 찾나요?",
          answer: "row count, checksum, business key별 mismatch query, lag 지표를 정기적으로 비교합니다. 불일치가 발견되면 source of truth 기준으로 repair job을 실행하고 재발 원인을 event 누락, 순서, schema 차이로 분류합니다.",
        },
      ],
      evidence: "data ownership map, write owner table, reconciliation job, migration ADR",
    },
    {
      q: "아키텍처 결정의 만료 조건을 왜 적어야 하나요?",
      answer: "현재 제약에서 맞는 결정이 미래에도 맞는다는 보장은 없습니다. 트래픽, 팀 수, 장애 빈도, 배포 충돌, 비용 같은 재검토 신호를 적어야 결정을 교리화하지 않습니다.",
      followups: [
        {
          q: "ADR은 누가 갱신하나요?",
          answer: "결정의 owner 팀이나 tech lead가 갱신 책임을 갖고, 변경 PR이나 incident 후속 작업에 ADR 업데이트를 포함합니다. 단순 문서 담당자가 아니라 운영 책임을 가진 사람이 최신 상태를 보장해야 합니다.",
        },
        {
          q: "결정이 틀렸다는 걸 어떻게 인정하나요?",
          answer: "사람의 실패가 아니라 가정의 변화로 기록합니다. ADR에 당시 가정, 현재 지표, 바꾸는 이유, migration 계획을 남기면 책임 추궁보다 학습 가능한 결정 이력이 됩니다.",
        },
        {
          q: "재검토 주기는 어떻게 정하나요?",
          answer: "달력 주기만으로 정하기보다 traffic, team count, incident count, deploy conflict, cloud cost 같은 trigger를 둡니다. 중요한 결정은 분기별 architecture review에서 상태를 확인합니다.",
        },
      ],
      evidence: "ADR review trigger, SLO trend, team ownership change, incident count",
    },
    {
      q: "Anti-corruption layer는 언제 필요하나요?",
      answer: "외부 시스템이나 레거시 모델의 용어, 상태, 오류가 내부 도메인 모델을 오염시킬 때 필요합니다. 단순 adapter가 아니라 의미 변환과 실패 계약을 명시하는 경계입니다.",
      followups: [
        {
          q: "ACL이 과한 추상화가 되는 경우는?",
          answer: "외부 모델과 내부 모델이 거의 같고 변경 빈도도 낮은데 계층만 두껍게 쌓으면 비용이 큽니다. 의미 변환, 실패 격리, 호환성 유지라는 구체 역할이 없으면 얇은 adapter가 충분합니다.",
        },
        {
          q: "외부 API 필드명을 그대로 쓰면 왜 위험한가요?",
          answer: "외부 provider의 용어와 lifecycle이 내부 도메인에 스며듭니다. provider가 필드 의미를 바꾸면 내부 정책까지 흔들리므로 ACL에서 내부 vocabulary로 변환해야 합니다.",
        },
        {
          q: "레거시 상태 코드는 어디서 번역하나요?",
          answer: "레거시 adapter나 ACL 경계에서 내부 domain enum과 error code로 변환합니다. controller나 service 곳곳에서 switch로 번역하면 새 상태 추가 때 누락과 불일치가 생깁니다.",
        },
      ],
      evidence: "translation map, adapter contract, legacy error mapping, domain vocabulary",
    },
  ],
  "engineering-data-qa": [
    {
      q: "인덱스를 추가하면 항상 빨라지나요?",
      answer: "아닙니다. 읽기는 빨라질 수 있지만 쓰기 비용, 저장 공간, vacuum 비용, planner 선택 복잡도가 늘어납니다. selectivity, query pattern, 정렬 조건, write volume을 함께 봐야 합니다.",
      followups: [
        {
          q: "복합 인덱스 컬럼 순서는 어떻게 정하나요?",
          answer: "동등 조건으로 자주 쓰는 컬럼을 앞에 두고 그다음 범위 조건과 정렬 조건을 맞춥니다. 실제 결정은 대표 쿼리의 EXPLAIN ANALYZE와 selectivity, order by 제거 여부로 확인합니다.",
        },
        {
          q: "사용하지 않는 인덱스는 어떻게 찾나요?",
          answer: "pg_stat_user_indexes의 idx_scan, index size, 최근 배포 이후 쿼리 패턴을 함께 봅니다. 단순히 idx_scan이 낮다고 지우지 말고 rare admin query나 제약 조건 용도인지 확인해야 합니다.",
        },
        {
          q: "인덱스가 많으면 insert가 왜 느려지나요?",
          answer: "insert마다 관련 인덱스 페이지도 갱신해야 하고 WAL과 page split 비용이 늘어납니다. write-heavy 테이블은 읽기 성능뿐 아니라 insert p95, WAL volume, bloat 증가를 같이 봐야 합니다.",
        },
      ],
      evidence: "EXPLAIN ANALYZE, index usage stats, write latency, bloat metric",
    },
    {
      q: "트랜잭션 격리 수준은 높을수록 좋은가요?",
      answer: "높을수록 이상 현상은 줄지만 lock, retry, abort 비용이 증가합니다. 도메인 불변식이 어떤 이상 현상을 허용하지 않는지 먼저 정하고, DB 엔진의 실제 격리 동작을 확인해야 합니다.",
      followups: [
        {
          q: "Read Committed에서 어떤 문제가 생기나요?",
          answer: "statement마다 새 snapshot을 보므로 같은 transaction 안에서도 다시 읽은 값이 달라질 수 있고 lost update를 애플리케이션이 놓칠 수 있습니다. 잔액, 재고 같은 불변식은 lock이나 constraint가 필요합니다.",
        },
        {
          q: "Serializable은 왜 retry가 필요할 수 있나요?",
          answer: "DB가 직렬 실행과 충돌하는 transaction을 abort시켜 정합성을 지키기 때문입니다. 애플리케이션은 serialization failure를 사용자 오류로 보지 말고 제한된 횟수의 재시도 정책으로 처리해야 합니다.",
        },
        {
          q: "Repeatable Read는 DB마다 같은가요?",
          answer: "아닙니다. PostgreSQL, MySQL InnoDB 등 엔진마다 snapshot, gap lock, phantom 처리 방식이 다릅니다. 격리 수준 이름보다 사용하는 DB의 실제 anomaly fixture로 검증해야 합니다.",
        },
      ],
      evidence: "isolation anomaly fixture, retry policy, transaction test",
    },
    {
      q: "Deadlock이 나면 DB가 잘못된 건가요?",
      answer: "Deadlock은 동시 트랜잭션이 서로의 lock을 기다리는 상태이고, DB는 이를 감지해 한쪽을 abort합니다. 원인은 lock 순서 불일치, 긴 트랜잭션, 넓은 update 범위일 수 있으며 retry와 lock ordering이 필요합니다.",
      followups: [
        {
          q: "deadlock과 lock wait timeout은 어떻게 다른가요?",
          answer: "deadlock은 서로가 가진 lock을 기다리는 순환 대기라 DB가 한쪽을 중단합니다. lock wait timeout은 순환이 없어도 오래 기다린 경우이며, 긴 transaction이나 넓은 update 범위가 원인일 수 있습니다.",
        },
        {
          q: "항상 retry하면 되나요?",
          answer: "deadlock이나 serialization failure는 idempotent하고 짧은 transaction이면 retry할 수 있습니다. 외부 결제 호출이나 메시지 발행 같은 side effect가 섞이면 transaction 경계와 중복 방어를 먼저 정해야 합니다.",
        },
        {
          q: "락 순서는 어떻게 표준화하나요?",
          answer: "여러 row나 aggregate를 갱신할 때 항상 같은 key 정렬 순서로 lock을 잡도록 repository/service 규칙을 둡니다. bulk update, batch job, admin tool도 같은 순서를 쓰는지 리뷰해야 합니다.",
        },
      ],
      evidence: "deadlock log, pg_locks, transaction order diagram, retry test",
    },
    {
      q: "스키마 변경을 무중단으로 하려면 어떤 순서가 필요한가요?",
      answer: "expand, migrate, contract 순서로 진행합니다. 먼저 새 컬럼/테이블을 호환되게 추가하고, 애플리케이션이 양쪽을 읽거나 쓰게 한 뒤 backfill과 검증을 끝내고, 마지막에 옛 필드를 제거합니다.",
      followups: [
        {
          q: "NOT NULL 컬럼은 어떻게 추가하나요?",
          answer: "처음에는 nullable 컬럼을 추가하고 새 앱이 값을 쓰게 만든 뒤 backfill과 검증을 끝냅니다. 이후 default와 NOT NULL 제약을 추가해야 오래 걸리는 lock과 구버전 앱 호환성 문제를 줄일 수 있습니다.",
        },
        {
          q: "backfill 중 부하는 어떻게 제한하나요?",
          answer: "primary key range로 작은 batch를 처리하고 sleep, statement timeout, lock timeout, replica lag threshold를 둡니다. 진행률과 mismatch count를 기록해 중단 후 재개 가능해야 합니다.",
        },
        {
          q: "구버전 앱이 남아 있으면 무엇이 위험한가요?",
          answer: "구버전 앱이 새 컬럼을 쓰지 않거나 옛 컬럼만 읽으면 dual-write 기간에 데이터가 갈라질 수 있습니다. 배포 순서와 contract 제거 시점은 실행 중인 모든 버전의 읽기/쓰기 경로를 기준으로 잡아야 합니다.",
        },
      ],
      evidence: "migration plan, backfill batch log, compatibility test, rollback stop point",
    },
    {
      q: "캐시 무효화는 왜 어렵나요?",
      answer: "원본 DB와 캐시의 수명, 갱신 시점, 권한 범위가 다르기 때문입니다. TTL만으로는 stale data를 허용한다는 뜻이고, write-through나 explicit invalidation은 실패 시 불일치 처리가 필요합니다.",
      followups: [
        {
          q: "권한 정보는 캐시해도 되나요?",
          answer: "가능하지만 권한 회수 지연이 보안 사고가 될 수 있어 TTL을 짧게 두거나 명시 invalidation을 붙여야 합니다. 관리자 권한, 결제 상태, 차단 계정은 stale 허용 범위를 더 좁게 잡습니다.",
        },
        {
          q: "TTL jitter는 왜 넣나요?",
          answer: "같은 TTL로 대량 key가 동시에 만료되면 cache stampede가 발생합니다. jitter는 만료 시점을 분산해 Redis miss와 DB read burst를 완화합니다.",
        },
        {
          q: "stale data를 어디까지 허용하나요?",
          answer: "추천, 통계, 카운터처럼 사용자 결정에 치명적이지 않은 데이터는 허용 범위를 명시할 수 있습니다. 권한, 잔액, 재고, 결제 상태는 stale이 불변식을 깨므로 primary나 강한 검증 경로가 필요합니다.",
        },
      ],
      evidence: "cache key policy, invalidation trigger, stale data fixture, TTL histogram",
    },
    {
      q: "Redis를 primary DB처럼 쓰면 왜 위험한가요?",
      answer: "Redis는 메모리 기반이고 eviction, persistence, failover 설정에 따라 데이터 손실이나 중복 처리가 생길 수 있습니다. 원본성, 정합성, 복구가 중요한 데이터는 RDBMS 같은 source of truth가 필요합니다.",
      followups: [
        {
          q: "AOF를 켜면 완전히 안전한가요?",
          answer: "아닙니다. fsync 정책에 따라 최근 쓰기가 유실될 수 있고 failover 중 복제 지연도 남습니다. 금전, 재고 같은 원본 데이터는 RDBMS transaction과 backup/restore 절차로 보호해야 합니다.",
        },
        {
          q: "Redis failover 중 lock은 어떻게 되나요?",
          answer: "lock key가 새 primary에 복제되지 않았거나 TTL이 만료되면 같은 작업이 동시에 실행될 수 있습니다. owner token, fencing token, DB constraint로 중복 실행의 피해를 제한해야 합니다.",
        },
        {
          q: "세션 저장소로는 왜 괜찮을 수 있나요?",
          answer: "세션은 재로그인으로 복구 가능하고 원본 업무 데이터보다 손실 영향이 작을 수 있습니다. 그래도 인증 UX, 강제 로그아웃, multi-region failover 요구를 기준으로 허용 가능한지 판단해야 합니다.",
        },
      ],
      evidence: "persistence config, eviction policy, failover drill, source-of-truth decision",
    },
    {
      q: "데이터 정합성 검증 쿼리는 왜 필요한가요?",
      answer: "비동기 처리, migration, cache, replica, backfill이 있으면 시스템이 결국 수렴했는지 별도 검증이 필요합니다. 정합성 쿼리는 사고 후 범위 산정과 재처리에도 쓰입니다.",
      followups: [
        {
          q: "검증 쿼리는 운영 부하를 만들지 않나요?",
          answer: "만들 수 있습니다. 그래서 샘플링, 시간대 제한, replica 사용, batch range, timeout을 둡니다. 검증 자체가 장애를 만들지 않도록 query plan과 읽는 row 수를 먼저 확인해야 합니다.",
        },
        {
          q: "불일치를 발견하면 자동 보정하나요?",
          answer: "원인과 영향이 명확하고 보정이 idempotent할 때만 자동화합니다. 금전이나 권한처럼 민감한 데이터는 mismatch report, 승인, dry-run, audit log를 거쳐 수동 또는 반자동으로 처리합니다.",
        },
        {
          q: "source of truth는 어떻게 정하나요?",
          answer: "업무 불변식을 최종적으로 지키는 저장소를 기준으로 정합니다. cache, search index, replica, projection은 파생 데이터로 보고 원본 transaction log나 DB constraint와 reconcile할 수 있어야 합니다.",
        },
      ],
      evidence: "reconciliation query, mismatch count, repair job log, source-of-truth map",
    },
    {
      q: "DB connection pool 크기는 크게 잡으면 좋은가요?",
      answer: "너무 작으면 대기 시간이 늘고, 너무 크면 DB가 context switching과 lock 경쟁으로 더 느려질 수 있습니다. app concurrency, DB max connection, query time, p99, pool wait를 보고 정합니다.",
      followups: [
        {
          q: "pool wait와 query time은 어떻게 구분하나요?",
          answer: "pool wait는 connection을 빌리기 전 대기 시간이고 query time은 connection 확보 후 DB 실행 시간입니다. APM span이나 Hikari metric에서 acquisition time과 SQL execution time을 분리해야 병목을 정확히 잡습니다.",
        },
        {
          q: "서버를 늘리면 DB connection은 어떻게 되나요?",
          answer: "인스턴스 수만큼 최대 connection 수가 곱해져 DB max connection을 초과하거나 context switching이 늘 수 있습니다. autoscaling 계획은 app replica 수와 pool max, DB limit을 함께 계산해야 합니다.",
        },
        {
          q: "HikariCP 지표 중 무엇을 보나요?",
          answer: "active, idle, pending, acquisition time, usage time, timeout count를 봅니다. active가 max에 붙고 pending이 늘면 pool starvation이고, usage time이 길면 느린 쿼리나 긴 transaction을 의심합니다.",
        },
      ],
      evidence: "pool active/idle/wait metric, DB max connection, load test, p99 delta",
    },
  ],
  "engineering-runtime-quality-qa": [
    {
      q: "SLI와 SLO는 어떻게 정하나요?",
      answer: "SLI는 사용자 경험을 나타내는 측정값이고 SLO는 그 목표입니다. API라면 availability, latency, correctness를 route와 중요도별로 나누고, error budget으로 알림과 릴리스 판단을 연결합니다.",
      followups: [
        {
          q: "모든 API에 같은 SLO를 적용하나요?",
          answer: "동일하게 두지 않습니다. 로그인, 결제, 조회처럼 사용자 영향과 트래픽 패턴이 다른 route는 availability와 latency 목표를 다르게 잡고, low-priority endpoint는 별도 error budget으로 릴리스 판단에서 분리합니다.",
        },
        {
          q: "내부 batch도 SLO가 필요한가요?",
          answer: "사용자 화면이나 정산, 알림처럼 downstream 약속에 영향을 주면 필요합니다. request latency 대신 완료 시각, 처리 지연, 누락 건수, 재처리 성공률을 SLI로 잡는 편이 운영 판단에 맞습니다.",
        },
        {
          q: "SLO 위반과 장애 선언은 같은가요?",
          answer: "항상 같지는 않습니다. SLO 위반은 error budget 소비를 나타내고, 장애 선언은 고객 영향, 데이터 손상 위험, 대응 조직 필요 여부를 기준으로 합니다. 둘은 연결되지만 incident policy에서 분리해 둬야 합니다.",
        },
      ],
      evidence: "SLI definition, SLO target, burn rate alert, error budget policy",
    },
    {
      q: "Health check는 무엇을 확인해야 하나요?",
      answer: "liveness는 프로세스 생존, readiness는 트래픽 수신 준비 상태를 봅니다. readiness에 핵심 dependency 상태를 반영하되, 일시 장애 때 전체 재시작 폭주가 생기지 않도록 신중히 나눠야 합니다.",
      followups: [
        {
          q: "DB가 잠깐 느리면 readiness를 실패시켜야 하나요?",
          answer: "일시적인 DB 지연마다 readiness를 실패시키면 모든 pod가 traffic에서 빠져 장애를 키울 수 있습니다. 핵심 read/write가 지속 실패하거나 pool이 고갈된 상태처럼 요청 처리 불가능 조건일 때만 실패시키는 기준이 필요합니다.",
        },
        {
          q: "liveness에 외부 API를 넣으면 왜 위험한가요?",
          answer: "외부 API 장애가 app restart로 이어져 restart storm이 생길 수 있습니다. liveness는 process deadlock이나 event loop 정지처럼 재시작으로 회복 가능한 상태에 제한하고, 외부 dependency는 readiness나 별도 dependency health로 다룹니다.",
        },
        {
          q: "startup probe는 언제 필요한가요?",
          answer: "초기 migration, cache warmup, class loading 때문에 기동 시간이 긴 서비스에서 필요합니다. startup probe가 통과하기 전 liveness 실패를 무시하게 해 정상 기동 중인 pod가 반복 재시작되는 일을 막습니다.",
        },
      ],
      evidence: "health endpoint contract, probe config, restart count, dependency status",
    },
    {
      q: "Alert fatigue를 줄이려면 어떻게 하나요?",
      answer: "사람을 깨우는 알림은 즉시 행동 가능한 증상 기반이어야 합니다. CPU 같은 원인 후보보다 user-visible error, SLO burn rate, data loss risk, sustained saturation을 우선합니다.",
      followups: [
        {
          q: "warning과 page를 어떻게 나누나요?",
          answer: "page는 즉시 사람의 조치가 없으면 고객 영향이나 데이터 위험이 커지는 증상에만 겁니다. warning은 업무 시간 triage나 추세 관찰로 충분한 saturation 예고, capacity drift, 비핵심 batch 지연에 둡니다.",
        },
        {
          q: "알림 임계값은 누가 정하나요?",
          answer: "서비스 owner가 SLO와 운영 이력을 기준으로 정하고, on-call과 product owner가 고객 영향 기준을 함께 검토합니다. 임계값은 배포 후 false positive와 missed incident를 보고 정기적으로 조정해야 합니다.",
        },
        {
          q: "한밤중에 깨우면 안 되는 알림은 무엇인가요?",
          answer: "즉시 조치가 없거나 자동 복구 중인 단일 retry 증가, 낮은 우선순위 batch 지연, capacity 예고성 알림은 page 대상이 아닙니다. 대신 ticket, daily report, 업무 시간 warning으로 보내야 합니다.",
        },
      ],
      evidence: "alert policy, runbook link, page history, false positive review",
    },
    {
      q: "Circuit breaker는 retry와 어떤 관계인가요?",
      answer: "retry는 일시 실패를 흡수하지만 하류가 죽었을 때는 부담을 키울 수 있습니다. circuit breaker는 실패율이 높을 때 호출을 빠르게 차단해 자원 고갈과 cascading failure를 줄입니다.",
      followups: [
        {
          q: "OPEN, HALF_OPEN 상태는 무엇인가요?",
          answer: "OPEN은 실패율이나 timeout이 기준을 넘어 호출을 즉시 차단하는 상태입니다. HALF_OPEN은 일정 시간이 지난 뒤 소수 요청만 시험적으로 보내 downstream 회복 여부를 확인하는 상태입니다.",
        },
        {
          q: "circuit open 시 사용자에게 무엇을 보여주나요?",
          answer: "핵심 기능이면 명확한 일시 실패와 재시도 가능성을 보여주고, 비핵심 기능이면 화면 일부를 숨기거나 degraded message를 표시합니다. 내부 timeout이나 provider 이름을 노출하지 않는 error contract가 필요합니다.",
        },
        {
          q: "fallback이 stale data면 어떻게 표시하나요?",
          answer: "데이터 기준 시각과 제한된 기능 상태를 함께 표시해야 합니다. 가격, 권한, 재고처럼 오래된 값이 위험한 영역은 fallback을 쓰지 않고 실패 처리나 read-only 모드로 전환합니다.",
        },
      ],
      evidence: "circuit state metric, fallback policy, retry budget, downstream error rate",
    },
    {
      q: "Backpressure와 rate limit은 어떻게 다른가요?",
      answer: "rate limit은 외부 요청량을 제한하는 정책이고, backpressure는 소비자가 처리 능력을 초과했을 때 생산자나 upstream에 늦추라는 신호를 주는 흐름 제어입니다.",
      followups: [
        {
          q: "queue가 쌓이면 worker만 늘리면 되나요?",
          answer: "먼저 lag 원인이 소비 CPU인지, downstream timeout인지, poison message인지, partition skew인지 봐야 합니다. downstream이 병목이면 worker 증설은 실패 호출과 재시도를 늘려 장애를 악화시킵니다.",
        },
        {
          q: "load shedding은 언제 하나요?",
          answer: "핵심 경로를 보호하기 위해 시스템이 saturation에 가까워지고 queue 대기 시간이 SLO를 넘기기 전에 합니다. 낮은 우선순위 요청을 빠르게 거절해 전체 timeout과 cascading failure를 줄이는 목적입니다.",
        },
        {
          q: "낮은 우선순위 작업은 어떻게 구분하나요?",
          answer: "사용자 동기 요청, 결제, 상태 변경은 높게 두고 추천 계산, 통계 갱신, export, notification fanout은 낮게 둘 수 있습니다. queue topic, priority header, feature flag로 정책을 코드와 운영 설정에 반영합니다.",
        },
      ],
      evidence: "queue depth, lag slope, load shedding policy, priority class",
    },
    {
      q: "Runbook에는 무엇이 있어야 하나요?",
      answer: "증상, 확인 명령, 정상/비정상 판정, 완화 조치, rollback 또는 escalation, 사후 기록 위치가 있어야 합니다. 명령어만 있고 판단 기준이 없으면 runbook이 아닙니다.",
      followups: [
        {
          q: "runbook은 언제 업데이트하나요?",
          answer: "장애 대응 후 실제로 쓴 명령, 빠진 지표, 잘못된 판단 기준이 발견되면 postmortem action으로 업데이트합니다. 배포 구조나 dependency가 바뀐 PR에도 관련 runbook 검토를 포함해야 합니다.",
        },
        {
          q: "자동화와 수동 절차는 어떻게 나누나요?",
          answer: "반복적이고 readback으로 검증 가능한 완화 조치는 자동화하고, 데이터 삭제나 traffic 전환처럼 영향이 큰 조치는 승인과 수동 확인 단계를 둡니다. 자동화에도 dry-run과 rollback 경로가 있어야 합니다.",
        },
        {
          q: "위험한 명령은 어떻게 보호하나요?",
          answer: "대상 환경 확인, dry-run, confirmation prompt, 최소 권한, audit log, break-glass 절차로 보호합니다. destructive command는 복구 백업과 readback query가 runbook에 같이 있어야 합니다.",
        },
      ],
      evidence: "runbook step, command output sample, escalation owner, post-incident update",
    },
    {
      q: "배포 후 health window에서는 무엇을 보나요?",
      answer: "새 release id 기준으로 error rate, p95/p99 latency, saturation, business metric, log anomaly, rollback trigger를 봅니다. 전체 평균보다 변경된 route와 canary cohort를 우선합니다.",
      followups: [
        {
          q: "business metric은 왜 보나요?",
          answer: "기술 지표가 정상이어도 결제 전환율, 주문 생성, 로그인 성공률 같은 사용자 결과가 깨질 수 있습니다. 배포 health window에서는 error rate와 latency뿐 아니라 핵심 행동 지표의 baseline 이탈을 함께 봐야 합니다.",
        },
        {
          q: "canary가 정상인데 전체 배포 후 깨질 수 있나요?",
          answer: "가능합니다. canary traffic이 특정 tenant, region, cache 상태, data shape을 충분히 포함하지 못하면 전체 배포에서만 문제가 드러납니다. segment coverage와 cohort별 지표를 같이 봐야 합니다.",
        },
        {
          q: "rollback과 forward fix 판단 기준은?",
          answer: "새 release만 원인이고 데이터 변경이 되돌릴 수 있으면 rollback을 우선합니다. 이미 irreversible migration이나 외부 side effect가 진행됐으면 feature flag 차단, hotfix, repair job을 포함한 forward fix가 더 안전할 수 있습니다.",
        },
      ],
      evidence: "release dashboard, canary analysis, rollback threshold, feature flag state",
    },
    {
      q: "분산 trace가 있어도 로그가 필요한 이유는 무엇인가요?",
      answer: "trace는 경로와 시간 분해에 강하고, 로그는 특정 결정과 원인 세부 정보에 강합니다. metric이 증상을 잡고 trace가 위치를 좁히며 log가 원인을 확정하는 식으로 함께 씁니다.",
      followups: [
        {
          q: "모든 요청을 trace sampling해야 하나요?",
          answer: "항상 100% sampling할 필요는 없습니다. 정상 고QPS 요청은 head sampling으로 비용을 줄이고, error, high latency, 결제 같은 핵심 route는 tail sampling이나 우선 보존 정책을 둡니다.",
        },
        {
          q: "PII는 로그에 어떻게 다루나요?",
          answer: "기본은 수집하지 않는 것입니다. 필요한 식별자는 hash나 surrogate key로 남기고, request body와 token은 redaction rule로 차단하며, audit 목적 로그는 접근 권한과 보존 기간을 별도로 둡니다.",
        },
        {
          q: "trace id 전파가 끊기면 어떻게 찾나요?",
          answer: "gateway, async queue, worker, outbound client 경계에서 traceparent나 request id가 유지되는지 확인합니다. middleware와 message header mapping을 점검하고, 끊긴 구간의 log correlation id로 span gap을 좁힙니다.",
        },
      ],
      evidence: "trace sample, structured log, sampling policy, redaction rule",
    },
  ],
  "engineering-platform-tools-qa": [
    {
      q: "컨테이너 이미지에서 secret이 새면 어떻게 발견하나요?",
      answer: "이미지 layer, build arg, env dump, repository history를 확인합니다. secret은 build artifact에 들어가면 안 되고 runtime secret store나 mounted secret으로 주입해야 합니다.",
      followups: [
        {
          q: "ARG와 ENV는 어떻게 다른가요?",
          answer: "ARG는 build 중 사용되고 ENV는 image와 runtime process 환경에 남을 수 있습니다. secret 후보가 있으면 Dockerfile, image history, registry scan, 실행 env readback을 함께 확인해 어느 단계에 노출됐는지 분리합니다.",
        },
        {
          q: "이미 push된 secret은 파일만 지우면 끝인가요?",
          answer: "아닙니다. image layer, registry cache, clone된 git history, CI log에 남았을 수 있으므로 키 폐기와 rotation을 먼저 하고 노출 범위를 감사해야 합니다. 삭제 커밋은 재노출을 줄일 뿐 이미 유출된 credential을 무효화하지 못합니다.",
        },
        {
          q: "secret rotation은 어떤 순서로 하나요?",
          answer: "새 secret 발급, 소비자 배포, readback으로 새 version 사용 확인, 이전 secret 폐기, 실패 로그와 접근 로그 감사 순서로 진행합니다. 한 번에 폐기하면 아직 이전 값을 쓰는 pod나 batch가 장애를 낼 수 있어 overlap 시간을 계획해야 합니다.",
        },
      ],
      evidence: "image history, secret scan, revoked key record, runtime injection config",
    },
    {
      q: "컨테이너가 OOMKilled 되면 무엇을 보나요?",
      answer: "exit code, container memory limit, RSS, heap, direct memory, GC log, traffic spike를 봅니다. JVM이면 heap만 줄이면 direct memory나 native memory 문제를 놓칠 수 있습니다.",
      followups: [
        {
          q: "memory limit과 JVM heap은 어떻게 맞추나요?",
          answer: "container limit 안에 heap, metaspace, direct memory, thread stack, native allocation 여유를 남겨야 합니다. `MaxRAMPercentage`와 실제 RSS 그래프, GC log, OOM event를 같이 보고 heap만 limit에 가깝게 잡지 않았는지 확인합니다.",
        },
        {
          q: "OOM과 GC thrashing은 어떻게 다르나요?",
          answer: "OOM은 할당 실패나 cgroup kill로 프로세스가 종료되는 상태이고, GC thrashing은 살아 있지만 GC 시간이 늘어 처리량과 latency가 무너지는 상태입니다. exit code와 restart event, GC pause 비율, allocation rate를 같이 봐야 합니다.",
        },
        {
          q: "재시작하면 해결된 것처럼 보이는 이유는?",
          answer: "heap과 connection, cache가 초기화되어 일시적으로 메모리 압박이 사라지기 때문입니다. 재시작 전후 RSS, heap dump, traffic pattern, leak suspect를 남기지 않으면 원인이 반복되어 같은 시간대에 다시 장애가 납니다.",
        },
      ],
      evidence: "container exit code, memory graph, GC log, heap/native memory setting",
    },
    {
      q: "환경변수 문제를 어떻게 빠르게 좁히나요?",
      answer: "빌드 시점 변수와 실행 시점 변수를 구분하고, 배포 대상 namespace, secret key, config map, process env readback을 확인합니다. 민감값은 redacted dump로 존재 여부만 확인합니다.",
      followups: [
        {
          q: "frontend env와 backend env는 왜 다르게 다루나요?",
          answer: "frontend 값은 대개 build artifact에 박히고 사용자에게 노출될 수 있지만 backend 값은 runtime에서 secret store나 env로 주입됩니다. 변경 후에는 bundle 내용, deployment env, 앱 config endpoint의 redacted 출력으로 어느 값이 실제 사용되는지 확인합니다.",
        },
        {
          q: "기본값을 코드에 넣으면 어떤 위험이 있나요?",
          answer: "필수 설정 누락이 조용히 잘못된 endpoint, dev credential, 낮은 timeout으로 이어질 수 있습니다. 운영 필수값은 startup validation으로 실패시키고, 기본값을 둔다면 local 전용인지와 override readback 방법을 문서화해야 합니다.",
        },
        {
          q: "환경별 설정 drift는 어떻게 막나요?",
          answer: "manifest와 secret version을 Git이나 IaC에서 관리하고 배포 후 runtime readback, checksum, drift report로 실제 상태를 비교합니다. 운영에서 직접 바꾼 값은 ticket과 PR로 회수하지 않으면 다음 배포에서 사라지거나 더 위험한 값으로 덮입니다.",
        },
      ],
      evidence: "redacted config dump, deployment manifest, secret version, startup log",
    },
    {
      q: "NGINX 502와 504는 어떻게 다르게 접근하나요?",
      answer: "502는 upstream 연결, protocol, process crash, bad gateway 문제를 의심하고, 504는 upstream timeout이나 처리 지연을 의심합니다. 둘 다 upstream status, request time, app log, network path를 함께 봅니다.",
      followups: [
        {
          q: "upstream health는 정상인데 502가 날 수 있나요?",
          answer: "가능합니다. health endpoint만 가볍게 성공하고 실제 경로는 crash, protocol mismatch, connection reset, header size 제한에 걸릴 수 있습니다. access/error log의 upstream status와 앱 request id를 맞춰 실패 경로가 health와 다른지 확인합니다.",
        },
        {
          q: "proxy_read_timeout은 무엇을 의미하나요?",
          answer: "NGINX가 upstream 응답을 기다리는 시간입니다. 값을 늘리기 전에 upstream response time, 앱 thread 점유, DB 대기, client timeout을 함께 봐야 하며, 무작정 늘리면 느린 요청이 자원을 오래 붙잡아 장애 범위를 키울 수 있습니다.",
        },
        {
          q: "large body upload는 어떤 설정을 보나요?",
          answer: "`client_max_body_size`, proxy buffering, temp path disk, upstream timeout, 앱 multipart limit을 같이 봅니다. 413, 499, 502처럼 계층마다 다른 상태가 나올 수 있으니 NGINX error log와 앱 수신 로그를 비교해 어디서 끊겼는지 닫습니다.",
        },
      ],
      evidence: "nginx access/error log, upstream status, app request id, timeout config",
    },
    {
      q: "Git history를 깨끗하게 만드는 것보다 중요한 것은 무엇인가요?",
      answer: "변경 의도, 리뷰 가능성, bisect 가능성, rollback 가능성이 더 중요합니다. 커밋은 논리 단위로 나누고, 대형 refactor와 기능 변경을 섞지 않는 것이 핵심입니다.",
      followups: [
        {
          q: "squash merge는 언제 유리한가요?",
          answer: "작은 feature 브랜치의 중간 수정 커밋이 의미 없고 PR 단위로 revert해도 충분할 때 유리합니다. 하지만 migration, refactor, behavior change가 섞인 PR은 squash하면 원인 추적과 부분 revert가 어려워질 수 있습니다.",
        },
        {
          q: "revert가 쉬운 PR은 어떤 PR인가요?",
          answer: "외부 contract, DB schema, config 변경의 영향이 분리되어 있고 feature flag나 backward compatible 경로가 있는 PR입니다. revert 전에 어떤 artifact와 migration이 되돌아가는지 release metadata와 migration 상태를 확인할 수 있어야 합니다.",
        },
        {
          q: "migration 포함 PR은 어떻게 나누나요?",
          answer: "먼저 backward compatible schema 확장, 다음 앱 배포, 마지막 cleanup처럼 expand-contract로 나눕니다. 각 단계는 독립 배포와 readback 검증이 가능해야 하며, 실패 시 어느 단계에서 멈출 수 있는지 PR 설명에 남깁니다.",
        },
      ],
      evidence: "commit series, PR description, revert plan, migration split",
    },
    {
      q: "운영 서버에서 직접 수정해야 할 때 어떤 원칙을 지키나요?",
      answer: "대상 환경, 변경 파일 백업, diff, 적용 명령, 검증, rollback 명령, 사후 코드 반영을 기록합니다. 임시 수정이 source of truth가 되지 않게 ticket과 PR로 회수해야 합니다.",
      followups: [
        {
          q: "hotfix와 임시 조치는 어떻게 다르나요?",
          answer: "hotfix는 코드와 배포 파이프라인을 통해 추적 가능한 긴급 수정이고, 임시 조치는 운영 상태만 직접 바꾸는 경우가 많습니다. 둘 다 승인, rollback, readback이 필요하지만 임시 조치는 반드시 후속 PR로 source of truth에 회수해야 합니다.",
        },
        {
          q: "vi로 수정한 설정을 어떻게 코드에 반영하나요?",
          answer: "변경 전 백업과 diff를 남기고, 적용 후 readback 결과를 ticket에 붙인 뒤 같은 값을 Git/IaC에 PR로 반영합니다. PR merge 후 재배포해 runtime checksum이나 설정 출력이 임시 변경과 일치하는지 확인해야 drift가 끝납니다.",
        },
        {
          q: "누가 승인해야 하나요?",
          answer: "서비스 owner, on-call, 변경 영향이 있는 downstream owner가 위험도에 맞게 승인해야 합니다. 권한 승인은 채팅 동의가 아니라 ticket, change log, rollback owner, 검증 결과로 남아야 사후 감사와 재발 방지가 가능합니다.",
        },
      ],
      evidence: "change ticket, config backup, diff, readback result, follow-up PR",
    },
    {
      q: "배포 artifact 재현성은 왜 중요한가요?",
      answer: "같은 commit에서 같은 artifact가 나와야 사고 분석과 rollback이 가능합니다. dependency lock, build image, environment input, artifact digest가 고정되어야 합니다.",
      followups: [
        {
          q: "빌드마다 hash가 달라지면 왜 문제인가요?",
          answer: "같은 source에서 다른 artifact가 나오면 장애 재현, rollback, vulnerability 확인이 흔들립니다. timestamp, random seed, dependency resolution, base image digest를 고정하고 빌드 로그와 artifact digest로 동일성을 검증해야 합니다.",
        },
        {
          q: "dependency latest는 왜 위험한가요?",
          answer: "빌드 시점마다 다른 dependency가 풀려 테스트하지 않은 코드가 artifact에 들어갈 수 있습니다. lockfile, registry snapshot, base image digest를 고정하고 dependency update는 별도 PR에서 changelog와 vulnerability scan을 확인해야 합니다.",
        },
        {
          q: "artifact와 source commit을 어떻게 연결하나요?",
          answer: "artifact metadata에 commit sha, build id, dependency lock hash, image digest를 넣고 release note와 배포 기록에 남깁니다. 운영에서 실행 중인 digest를 readback해 Git commit과 매칭해야 사고 시 정확한 코드를 볼 수 있습니다.",
        },
      ],
      evidence: "lockfile, build image tag, artifact digest, release metadata",
    },
    {
      q: "로컬에서는 되는데 CI에서 깨지는 문제를 어떻게 보나요?",
      answer: "runtime version, OS, env var, timezone/locale, network, dependency cache, test order, file path case sensitivity를 비교합니다. 로컬 성공은 재현성의 충분조건이 아닙니다.",
      followups: [
        {
          q: "timezone 때문에 어떤 테스트가 깨지나요?",
          answer: "날짜 경계, 문자열 포맷, 만료 시간, 배치 스케줄 테스트가 로컬 timezone과 CI timezone 차이로 깨질 수 있습니다. 테스트에서 Clock과 timezone을 고정하고 실패 로그에는 입력 시각, zone, 기대값을 남겨 재현 가능하게 합니다.",
        },
        {
          q: "캐시를 지우면 고쳐지는 문제는 어떻게 추적하나요?",
          answer: "dependency cache, build cache, test fixture, generated file 중 무엇이 stale했는지 나눠 봅니다. 캐시 삭제를 해결책으로 끝내지 말고 cache key, lockfile hash, 생성물 경로, CI restore log를 확인해 잘못된 재사용 조건을 고칩니다.",
        },
        {
          q: "flaky test와 환경 차이는 어떻게 구분하나요?",
          answer: "같은 commit을 같은 환경에서 반복해 실패율을 보고, 환경 변수를 고정한 clean run과 CI rerun 로그를 비교합니다. 순서 의존, 시간 의존, 외부 network 의존이면 flaky 가능성이 크고 OS나 version 차이에서만 재현되면 환경 matrix를 좁힙니다.",
        },
      ],
      evidence: "CI env dump, version matrix, clean install log, flaky test history",
    },
  ],
  "engineering-java-spring-qa": [
    {
      q: "Spring bean scope를 잘못 쓰면 어떤 문제가 생기나요?",
      answer: "singleton bean에 request-specific mutable state를 두면 사용자 간 상태가 섞일 수 있습니다. 대부분 service는 stateless singleton이어야 하고, request state는 method parameter나 request scope로 제한합니다.",
      followups: [
        {
          q: "singleton bean은 thread-safe한가요?",
          answer: "Spring singleton은 인스턴스를 하나만 만든다는 뜻이지 내부 상태 접근을 자동으로 동기화한다는 뜻이 아닙니다. field에 사용자별 값, request DTO, 누적 counter를 두면 여러 request thread가 공유하므로 concurrency test나 code review에서 mutable field를 찾아야 합니다.",
        },
        {
          q: "prototype scope는 언제 쓰나요?",
          answer: "상태를 가진 짧은 수명의 객체가 필요할 때 후보가 되지만, singleton bean에 주입하면 생성 시점의 prototype 하나가 고정됩니다. 매번 새 객체가 필요하면 ObjectProvider나 lookup method를 쓰고 생성 횟수를 bean lifecycle log로 확인합니다.",
        },
        {
          q: "ThreadLocal은 어떤 위험이 있나요?",
          answer: "Tomcat worker thread는 재사용되므로 ThreadLocal을 지우지 않으면 다음 request에 사용자 정보나 trace context가 남을 수 있습니다. 반드시 filter finally에서 remove하고, async나 virtual thread 전환 시 context propagation이 되는지 테스트해야 합니다.",
        },
      ],
      evidence: "bean scope review, concurrency test, request state audit",
    },
    {
      q: "Lazy loading은 왜 transaction 경계와 연결되나요?",
      answer: "lazy association은 영속성 컨텍스트가 열려 있을 때 초기화됩니다. transaction 밖이나 session이 닫힌 뒤 접근하면 LazyInitializationException이 나거나, OSIV가 켜져 있으면 view에서 쿼리가 터질 수 있습니다.",
      followups: [
        {
          q: "OSIV를 끄면 무엇이 바뀌나요?",
          answer: "request view 단계까지 열려 있던 persistence context가 service transaction 경계에서 닫힙니다. controller나 serializer가 lazy association을 건드리면 바로 실패하므로 필요한 fetch plan을 service 안에서 명시하고 SQL log로 쿼리 위치를 고정해야 합니다.",
        },
        {
          q: "fetch join과 EntityGraph는 어떻게 고르나요?",
          answer: "fetch join은 query 자체에 join과 fetch 계획을 박아 넣어 조건과 함께 제어하기 좋고, EntityGraph는 repository method별 fetch plan을 분리하기 좋습니다. 둘 다 to-many cardinality와 pagination 영향을 SQL row 수로 확인해야 합니다.",
        },
        {
          q: "DTO projection은 lazy loading을 어떻게 피하나요?",
          answer: "entity proxy를 반환하지 않고 query에서 필요한 컬럼을 DTO로 바로 채우기 때문에 serializer가 association을 따라가며 추가 SQL을 만들 여지가 줄어듭니다. projection query의 select 목록과 query count assertion으로 확인합니다.",
        },
      ],
      evidence: "SQL log, LazyInitialization fixture, fetch plan, OSIV setting",
    },
    {
      q: "JPA bulk update가 위험한 이유는 무엇인가요?",
      answer: "bulk update는 영속성 컨텍스트를 우회해 DB에 직접 반영되므로, 이미 로딩된 엔티티 상태가 stale해질 수 있습니다. 실행 후 clear 또는 별도 transaction 경계가 필요합니다.",
      followups: [
        {
          q: "dirty checking과 bulk update는 어떻게 다르나요?",
          answer: "dirty checking은 managed entity의 snapshot 차이를 flush하며 version, callback, entity state와 함께 움직입니다. bulk update는 DB에 직접 update를 날려 entity lifecycle을 우회하므로 version 증가와 callback 실행 여부를 별도로 검증해야 합니다.",
        },
        {
          q: "bulk delete도 같은 문제가 있나요?",
          answer: "있습니다. persistence context에 남아 있는 entity는 삭제 사실을 모를 수 있고, cascade나 orphanRemoval 같은 entity 단위 규칙을 기대하면 어긋납니다. bulk delete 뒤 clear하고 FK constraint와 삭제 SQL을 integration test로 확인합니다.",
        },
        {
          q: "캐시가 있으면 무엇을 무효화해야 하나요?",
          answer: "1차 캐시는 clear/refresh 대상이고, 2차 캐시나 application cache가 있으면 해당 region/key invalidation 정책이 필요합니다. bulk SQL 이후 같은 id 재조회가 stale 값을 주지 않는지 cache hit metric과 조회 테스트로 확인합니다.",
        },
      ],
      evidence: "JPA BULK UPDATE CONSISTENCY CAVEAT, persistence context clear test, SQL log",
    },
    {
      q: "Propagation REQUIRED와 REQUIRES_NEW 차이는 무엇인가요?",
      answer: "REQUIRED는 기존 트랜잭션이 있으면 참여하고 없으면 새로 만듭니다. REQUIRES_NEW는 기존 트랜잭션을 suspend하고 별도 트랜잭션을 열어 commit/rollback 독립성을 만듭니다.",
      followups: [
        {
          q: "audit log 저장에 REQUIRES_NEW를 쓰면 어떤 trade-off가 있나요?",
          answer: "업무 트랜잭션이 rollback되어도 감사 로그를 남길 수 있지만, 실패한 작업의 로그가 commit되어 의미 해석이 필요합니다. 로그 row에 outer transaction 결과나 correlation id를 남기고 rollback integration test로 보존 조건을 확인합니다.",
        },
        {
          q: "connection pool에는 어떤 영향이 있나요?",
          answer: "outer transaction이 connection을 잡은 상태에서 inner REQUIRES_NEW가 추가 connection을 요구할 수 있습니다. 동시 요청 수가 커지면 Hikari acquire 대기가 늘 수 있으므로 pool size, max threads, propagation 사용량을 함께 봐야 합니다.",
        },
        {
          q: "outer rollback 후 inner commit은 유지되나요?",
          answer: "REQUIRES_NEW가 실제 별도 transaction으로 열렸다면 inner commit은 유지됩니다. 다만 self-invocation이면 proxy를 거치지 않아 분리가 안 될 수 있으므로 bean 간 호출 구조와 transaction log로 확인해야 합니다.",
        },
      ],
      evidence: "transaction propagation test, connection pool metric, audit transaction policy",
    },
    {
      q: "Checked exception과 runtime exception은 transaction rollback에 어떤 영향을 주나요?",
      answer: "Spring 기본 설정은 unchecked exception에서 rollback하고 checked exception은 rollback하지 않습니다. 도메인 실패를 어떤 exception으로 모델링할지와 rollbackFor 설정을 명확히 해야 합니다.",
      followups: [
        {
          q: "rollbackFor=Exception.class는 항상 좋은가요?",
          answer: "모든 checked exception을 rollback하면 복구 가능한 외부 통신 실패나 사용자 입력 오류까지 DB 변경을 되돌릴 수 있습니다. exception hierarchy와 rollback 정책을 맞추고 각 예외별 commit/rollback 결과를 integration test로 고정해야 합니다.",
        },
        {
          q: "비즈니스 예외는 rollback해야 하나요?",
          answer: "상태 변경 전에 검증 실패로 던지는 예외라면 rollback 여부가 큰 의미 없을 수 있지만, 일부 변경 뒤 실패하는 흐름이면 정책이 중요합니다. 보상 기록을 남길지 전체 rollback할지 transaction boundary와 domain invariant로 결정합니다.",
        },
        {
          q: "예외를 잡아먹으면 transaction은 어떻게 되나요?",
          answer: "transactional method 밖으로 예외가 전파되지 않으면 Spring은 정상 종료로 보고 commit할 수 있습니다. catch 후 복구가 아니라 실패라면 setRollbackOnly를 호출하거나 예외를 다시 던지고 transaction log로 결과를 확인합니다.",
        },
      ],
      evidence: "rollback integration test, exception hierarchy, transaction log",
    },
    {
      q: "JVM thread pool을 크게 잡으면 처리량이 늘어나나요?",
      answer: "blocking 비율과 CPU core, downstream pool에 따라 다릅니다. thread가 너무 많으면 context switching과 downstream saturation이 늘고, DB connection pool이 병목이면 thread만 늘려도 대기열만 커집니다.",
      followups: [
        {
          q: "Tomcat thread와 DB pool은 어떻게 맞추나요?",
          answer: "요청 대부분이 DB를 잡는다면 Tomcat max threads가 DB pool보다 훨씬 크면 connection acquire 대기만 늘어납니다. p95 latency, Hikari pending threads, active connection, request queue를 부하 테스트에서 같이 봐야 합니다.",
        },
        {
          q: "virtual thread는 모든 문제를 해결하나요?",
          answer: "blocking thread 비용은 줄이지만 DB connection, lock, downstream rate limit 같은 실제 제한은 그대로입니다. carrier thread pinning, JDBC pool 대기, 외부 API timeout을 metric과 thread dump로 확인해야 합니다.",
        },
        {
          q: "thread dump에서 BLOCKED와 WAITING은 어떻게 보나요?",
          answer: "BLOCKED는 monitor lock 진입 대기이고 WAITING/TIMED_WAITING은 park, sleep, queue, socket, pool acquire 같은 대기를 포함합니다. 같은 stack에 request thread가 몰려 있는지와 lock owner를 찾아 병목 지점을 좁힙니다.",
        },
      ],
      evidence: "thread pool metric, DB pool wait, thread dump, load test",
    },
    {
      q: "equals/hashCode를 entity에 잘못 구현하면 어떤 문제가 생기나요?",
      answer: "영속화 전후 id 변화, proxy class, mutable field 기반 hashCode 때문에 Set/Map 동작이 깨질 수 있습니다. Entity identity와 business key 선택을 신중히 해야 합니다.",
      followups: [
        {
          q: "id가 null인 transient entity는 어떻게 비교하나요?",
          answer: "DB id가 아직 없으면 id 기반 equality가 안정적이지 않습니다. business key가 정말 불변이고 unique하면 후보가 될 수 있지만, 그렇지 않으면 transient entity를 Set key로 쓰지 않는 설계가 더 안전합니다.",
        },
        {
          q: "Lombok @Data를 entity에 쓰면 왜 위험한가요?",
          answer: "@Data는 equals, hashCode, toString에 모든 field를 포함할 수 있어 lazy association 접근, 순환 참조, mutable field hash 변경을 만들 수 있습니다. entity에서는 필요한 method만 명시하고 lazy load SQL이 발생하지 않는지 테스트합니다.",
        },
        {
          q: "proxy와 class 비교는 어떤 문제가 있나요?",
          answer: "Hibernate proxy는 실제 entity subclass나 proxy class로 보일 수 있어 getClass 비교가 같은 row를 다르게 판단할 수 있습니다. Hibernate.getClass 같은 방식과 id 비교 정책을 정하고 proxy fixture로 equals 대칭성을 확인합니다.",
        },
      ],
      evidence: "entity equality test, Hibernate proxy fixture, collection behavior test",
    },
    {
      q: "Spring validation은 어디까지 믿을 수 있나요?",
      answer: "Bean Validation은 request boundary의 형식과 일부 규칙을 검증하지만, DB에 걸친 uniqueness, 권한, 상태 전이, 동시성 불변식은 service와 DB constraint가 함께 지켜야 합니다.",
      followups: [
        {
          q: "Controller validation과 domain validation은 어떻게 나누나요?",
          answer: "Controller validation은 request shape, null, range, format처럼 경계 입력을 빠르게 막습니다. domain validation은 상태 전이, 권한, aggregate invariant를 다루며 service transaction 안에서 DB 상태와 함께 검증해야 합니다.",
        },
        {
          q: "중복 이메일 검증은 어디서 하나요?",
          answer: "service에서 먼저 조회해 사용자 친화 오류를 줄 수 있지만 race condition의 최종 방어는 DB unique constraint입니다. 동시에 같은 email을 생성하는 integration test와 unique violation 매핑을 확인해야 합니다.",
        },
        {
          q: "validation error contract는 어떻게 만들죠?",
          answer: "field, code, rejected value 노출 정책, message를 일관되게 정의합니다. 내부 annotation 이름보다 클라이언트가 복구 가능한 error code가 중요하고, contract test로 serialization 형태를 고정합니다.",
        },
      ],
      evidence: "validation group, domain invariant test, DB unique constraint, error contract",
    },
  ],
};

for (const page of pages) {
  page.questions.push(...(additionalQuestionsByPageId[page.id] ?? []));
}

const coverageQuestionsByPageId = {
  "engineering-backend-core-qa": [
    {
      topic: "HTTP method와 멱등성",
      q: "HTTP method와 멱등성은 API 계약에서 어떻게 연결되나요?",
      answer: "HTTP method는 resource에 대한 의도를 표현하는 계약입니다. GET은 안전한 조회여야 하고, PUT과 DELETE는 같은 요청을 반복해도 최종 상태가 같아야 하며, POST는 처리 요청에 가깝지만 idempotency key로 재시도 안전성을 만들 수 있습니다.",
      followups: [
        {
          q: "GET 요청에 조회수 증가 같은 side effect가 있으면 안 되나요?",
          answer: "GET은 client, proxy, crawler가 재시도하거나 prefetch할 수 있으므로 비즈니스 상태 변경을 넣으면 위험합니다. 조회 로그처럼 관측 목적의 기록은 허용하더라도 사용자에게 보이는 상태 변경과 분리해야 합니다.",
        },
        {
          q: "DELETE를 두 번 호출하면 두 번째 응답은 어떻게 해야 하나요?",
          answer: "resource가 이미 삭제된 최종 상태라면 멱등성은 지켜진 것입니다. 응답은 204, 404 중 계약으로 정하되 client가 안전하게 재시도할 수 있게 일관성을 유지합니다.",
        },
        {
          q: "POST 주문 생성은 어떻게 중복 생성을 막나요?",
          answer: "actor, endpoint, idempotency key, request fingerprint를 저장하고 같은 요청에는 기존 결과를 돌려줍니다. 같은 key에 다른 payload가 오면 conflict로 거절합니다.",
        },
      ],
      evidence: "method contract, idempotency matrix, duplicate request test",
    },
    {
      topic: "API versioning",
      q: "API versioning은 언제 올리고 언제 유지하나요?",
      answer: "기존 client를 깨는 응답 의미 변경, 필드 삭제, 필수 입력 추가, enum 의미 변경은 versioning이나 deprecation window가 필요합니다. 필드 추가처럼 additive change는 consumer가 무시 가능하면 같은 버전에서 처리할 수 있습니다.",
      followups: [
        {
          q: "additive change와 breaking change를 어떻게 구분하나요?",
          answer: "기존 client가 수정 없이 계속 동작하면 additive에 가깝고, 파싱 실패나 의미 오해가 생기면 breaking입니다. 필드 추가도 기존 client가 unknown field를 거부하면 breaking이 될 수 있습니다.",
        },
        {
          q: "semantic change도 versioning 대상인가요?",
          answer: "응답 모양이 같아도 상태 의미, 정렬 순서, 금액 계산 기준처럼 client 행동을 바꾸는 변경이면 versioning이나 명시적 공지가 필요합니다.",
        },
        {
          q: "deprecation window는 무엇으로 검증하나요?",
          answer: "consumer별 호출량, 계약 테스트, migration 공지, 종료 날짜를 함께 관리합니다. 오래된 client가 남아 있는지 release 전후 지표로 확인합니다.",
        },
      ],
      evidence: "consumer contract test, deprecation notice, compatibility matrix",
    },
    {
      topic: "요청 validation 계층",
      q: "request, domain, DB validation은 어떻게 나누나요?",
      answer: "형식 검증은 request boundary, 도메인 불변식은 service/domain, 동시 요청까지 포함한 최종 방어는 DB constraint가 맡습니다. 세 계층은 중복이 아니라 실패를 잡는 위치가 다릅니다.",
      followups: [
        {
          q: "중복 이메일 검증은 어느 계층에 둬야 하나요?",
          answer: "사전 조회로 친절한 validation error를 줄 수 있지만 race를 막는 최종 장치는 unique constraint입니다. constraint violation도 같은 error contract로 매핑해야 합니다.",
        },
        {
          q: "request validation과 domain validation의 차이는 무엇인가요?",
          answer: "request validation은 타입, 필수값, 길이 같은 입력 형식을 확인합니다. domain validation은 현재 상태와 정책을 기준으로 가능한 행동인지 확인합니다.",
        },
        {
          q: "validation error contract에는 무엇이 들어가야 하나요?",
          answer: "field 또는 path, machine-readable code, 사용자 메시지, trace id, retry 가능 여부를 포함합니다. 클라이언트가 필드별 UX를 안정적으로 만들 수 있어야 합니다.",
        },
      ],
      evidence: "validation error contract, invariant test, DB constraint",
    },
    {
      topic: "상태 전이 모델",
      q: "상태 전이가 있는 기능은 무엇을 먼저 고정하나요?",
      answer: "주문, 결제, 승인처럼 상태가 있는 기능은 가능한 상태와 전이를 표로 고정해야 합니다. 그래야 불가능한 전이, 관리자 강제 변경, 보상 처리, audit를 일관되게 다룰 수 있습니다.",
      followups: [
        {
          q: "invalid transition은 어떻게 응답하나요?",
          answer: "현재 상태, 요청 action, 허용 가능한 다음 action을 기준으로 명확한 business error를 돌립니다. 조용히 무시하면 client와 운영자가 상태 불일치를 발견하기 어렵습니다.",
        },
        {
          q: "admin override는 일반 전이와 무엇이 달라야 하나요?",
          answer: "권한, 사유, 승인, 변경 전후 상태, actor를 audit에 남겨야 합니다. override는 정상 흐름을 우회하므로 보상 작업과 사용자 영향까지 함께 기록합니다.",
        },
        {
          q: "보상 처리와 audit는 왜 상태 전이에 묶이나요?",
          answer: "이미 commit된 결과를 되돌리거나 상쇄할 때 어떤 상태에서 어떤 보상이 가능했는지 추적해야 합니다. audit가 없으면 사고 후 범위와 책임을 산정하기 어렵습니다.",
        },
      ],
      evidence: "state transition table, invalid transition test, audit event",
    },
    {
      topic: "외부 식별자 노출",
      q: "외부에 노출하는 ID는 어떤 위험을 전제로 설계하나요?",
      answer: "내부 ID 노출 자체보다 권한 검증 누락과 추측 가능성이 문제입니다. 외부 공개 ID, tenant scope, resource authorization, audit를 같이 설계해야 IDOR를 줄일 수 있습니다.",
      followups: [
        {
          q: "IDOR는 어떤 테스트로 잡나요?",
          answer: "다른 tenant나 다른 사용자의 resource id로 상세, 수정, 다운로드, export를 호출하는 negative fixture가 필요합니다. 목록 API와 상세 API를 따로 검증합니다.",
        },
        {
          q: "존재를 숨겨야 할 때 404와 403 중 무엇을 쓰나요?",
          answer: "resource 존재 자체가 민감하면 404로 숨길 수 있습니다. 다만 내부 audit에는 권한 거부와 대상 resource를 남겨야 사고 분석이 가능합니다.",
        },
        {
          q: "sequential ID를 공개하면 항상 취약한가요?",
          answer: "권한 검증이 강하면 곧바로 취약점은 아니지만 enumeration과 정보 노출 위험이 커집니다. 공개용 불투명 ID와 rate limit, audit를 함께 고려합니다.",
        },
      ],
      evidence: "IDOR negative test, authorization query, audit log",
    },
    {
      topic: "Command와 Query 분리",
      q: "Command와 Query는 코드 리뷰에서 왜 따로 보나요?",
      answer: "상태를 바꾸는 command는 transaction, invariant, audit가 중요하고 query는 fetch plan, projection, cache, pagination이 중요합니다. 같은 코드베이스 안에서도 리뷰 초점이 달라야 합니다.",
      followups: [
        {
          q: "query method에 readOnly transaction을 붙이는 이유는 무엇인가요?",
          answer: "쓰기 의도가 없음을 명확히 하고 ORM flush 같은 부작용을 줄일 수 있습니다. 실제 최적화 효과는 DB와 프레임워크 설정에 따라 확인합니다.",
        },
        {
          q: "query에서 side effect가 생기면 어떤 문제가 있나요?",
          answer: "cache, retry, prefetch, read replica routing이 모두 위험해집니다. 조회는 상태 변경 없이 반복 가능해야 운영과 성능 최적화가 안전합니다.",
        },
        {
          q: "command 후 query cache consistency는 어떻게 맞추나요?",
          answer: "write 후 invalidation, versioned cache key, 짧은 TTL, read-your-writes 경로를 둡니다. 권한이나 결제 상태처럼 민감한 값은 stale 허용 범위를 좁게 잡습니다.",
        },
      ],
      evidence: "command/query method split, transaction annotation, query plan",
    },
    {
      topic: "서버 시간 처리",
      q: "서버 시간은 저장, 계산, 표시를 어떻게 분리하나요?",
      answer: "저장은 UTC로 통일하고 사용자 표시는 timezone을 적용합니다. 만료, 예약, 정산처럼 시간 경계가 중요한 기능은 clock injection과 timezone fixture로 테스트해야 합니다.",
      followups: [
        {
          q: "DST가 있는 지역에서 어떤 버그가 생기나요?",
          answer: "하루가 23시간이나 25시간이 되거나 특정 local time이 존재하지 않을 수 있습니다. 날짜 단위 정책은 instant와 local date를 구분해 테스트합니다.",
        },
        {
          q: "서버 간 clock skew는 어떻게 줄이나요?",
          answer: "NTP와 monotonic clock 사용을 기본으로 하고, 분산 요청의 순서 판단은 DB timestamp나 version 같은 공통 기준을 씁니다. 서명 검증은 허용 오차를 둡니다.",
        },
        {
          q: "DB time과 app time 중 무엇을 기준으로 쓰나요?",
          answer: "여러 app instance가 같은 레코드를 갱신하는 값은 DB time이 안정적일 수 있습니다. 테스트 가능성과 비즈니스 시간 주입이 필요하면 app clock을 명시적으로 주입합니다.",
        },
      ],
      evidence: "UTC storage policy, clock test, timezone fixture",
    },
    {
      topic: "파일 업로드 API",
      q: "파일 업로드 성공은 언제 비즈니스 성공으로 봐야 하나요?",
      answer: "파일 업로드는 파일 크기, content type, malware scan, 저장소 권한, 다운로드 권한, 만료 정책을 함께 다룹니다. 업로드 성공과 비즈니스 처리 성공은 별도 상태로 나누는 편이 안전합니다.",
      followups: [
        {
          q: "presigned URL을 쓰면 backend는 무엇을 검증하나요?",
          answer: "발급 대상 actor, tenant, object key 범위, content length, 만료 시간, 다운로드 권한을 검증합니다. 업로드 후 callback이나 finalize API에서 실제 object metadata를 확인합니다.",
        },
        {
          q: "malware scan을 비동기로 하면 사용자에게 무엇을 보여주나요?",
          answer: "uploaded, scanning, rejected, available 같은 상태를 분리합니다. scan 완료 전 다운로드나 후속 처리를 막아야 합니다.",
        },
        {
          q: "quota 초과나 실패 업로드는 어떻게 정리하나요?",
          answer: "사용량 ledger와 storage object를 맞추고, orphan object cleanup job을 둡니다. 실패한 multipart upload나 만료된 임시 파일도 정리 대상입니다.",
        },
      ],
      evidence: "upload contract, size limit, scan result, signed URL audit",
    },
    {
      topic: "Batch job 설계",
      q: "Batch job은 중간 실패를 기준으로 어떻게 설계하나요?",
      answer: "batch는 사용자 요청 latency보다 재시작 가능성, checkpoint, idempotency, 부분 실패 복구가 중요합니다. 범위와 진행 상태를 남겨야 중간 실패 후 안전하게 이어갈 수 있습니다.",
      followups: [
        {
          q: "checkpoint에는 무엇을 저장하나요?",
          answer: "job id, 입력 범위, resume cursor, 처리된 count, 실패 count, 마지막 성공 지점을 저장합니다. 재시작 시 같은 항목을 중복 처리해도 안전해야 합니다.",
        },
        {
          q: "resume cursor는 offset이면 충분한가요?",
          answer: "데이터가 변하는 테이블에서는 offset이 누락과 중복을 만들 수 있습니다. stable key, createdAt+id, snapshot 기준 같은 cursor가 더 안전합니다.",
        },
        {
          q: "partial retry와 backpressure는 어떻게 넣나요?",
          answer: "실패 항목만 재처리할 수 있게 ledger를 두고, 하류 오류율이나 queue lag가 커지면 batch rate를 낮춥니다. 전체 job 재시작만 있으면 하류를 다시 압박할 수 있습니다.",
        },
      ],
      evidence: "job checkpoint, processed ledger, retry report",
    },
    {
      topic: "Feature flag 운영",
      q: "Feature flag는 배포 후 어떤 운영 계약을 가져야 하나요?",
      answer: "feature flag는 배포와 릴리스를 분리하고 blast radius를 줄이는 운영 제어입니다. tenant, cohort, percentage rollout, kill switch, cleanup 정책까지 있어야 합니다.",
      followups: [
        {
          q: "kill switch는 어떤 조건에서 바로 내려야 하나요?",
          answer: "error rate, p99, data mismatch, business metric이 사전 threshold를 넘으면 즉시 끕니다. 끈 뒤에도 이미 처리된 데이터의 repair 계획이 필요합니다.",
        },
        {
          q: "stale flag cleanup을 안 하면 어떤 문제가 생기나요?",
          answer: "분기와 테스트 조합이 늘어 코드 이해와 배포 안정성이 떨어집니다. flag마다 owner, 만료일, 제거 PR 조건을 둡니다.",
        },
        {
          q: "flag readback은 왜 필요한가요?",
          answer: "설정 화면에서 켰다는 사실과 runtime instance가 실제로 읽은 값은 다를 수 있습니다. release id, tenant, evaluated rule을 로그나 admin readback으로 확인합니다.",
        },
      ],
      evidence: "flag rule, rollout plan, kill switch drill",
    },
    {
      topic: "Response payload 크기",
      q: "Response payload가 커질 때 어떤 비용을 먼저 보나요?",
      answer: "payload가 커지면 network, serialization CPU, memory allocation, client rendering 비용이 커집니다. projection, pagination, compression, streaming을 기준으로 줄입니다.",
      followups: [
        {
          q: "byte budget은 어떻게 정하나요?",
          answer: "route별 p95 응답 크기, 모바일 네트워크, client rendering 비용을 보고 상한을 둡니다. 큰 payload는 field projection이나 pagination으로 계약을 나눕니다.",
        },
        {
          q: "serialization span은 왜 봐야 하나요?",
          answer: "DB는 빠른데 JSON 직렬화와 압축에서 CPU와 memory가 터질 수 있습니다. trace에서 DB span과 serialization span을 분리해야 병목을 찾습니다.",
        },
        {
          q: "projection과 pagination은 언제 함께 쓰나요?",
          answer: "목록 화면처럼 필드와 row 수가 모두 제한되어야 할 때 함께 씁니다. projection만 있으면 row 수가 커지고 pagination만 있으면 row당 payload가 여전히 클 수 있습니다.",
        },
      ],
      evidence: "response byte histogram, serialization span, payload contract",
    },
    {
      topic: "HTTP cache와 서버 cache",
      q: "HTTP cache와 서버 cache는 무엇을 다르게 조심하나요?",
      answer: "HTTP cache는 client/proxy/CDN과의 응답 재사용 계약이고 서버 cache는 backend 내부 dependency 비용을 줄이는 최적화입니다. 인증 응답은 cache key와 header가 특히 중요합니다.",
      followups: [
        {
          q: "private과 public cache는 어떻게 구분하나요?",
          answer: "사용자별 또는 권한별 응답은 private이거나 no-store여야 합니다. 여러 사용자에게 같은 응답을 공유해도 되는 정적/공개 데이터만 public cache에 둡니다.",
        },
        {
          q: "Vary와 tenant cache key는 왜 중요하나요?",
          answer: "Accept-Language, Authorization, tenant, feature flag처럼 응답을 바꾸는 입력이 cache key에 없으면 다른 사용자나 tenant의 응답이 섞일 수 있습니다.",
        },
        {
          q: "stale auth 정보는 어떻게 막나요?",
          answer: "권한 변경 이벤트, 짧은 TTL, permission version, token version을 써서 무효화합니다. 인증/인가 결과 cache는 일반 조회 cache보다 보수적으로 다룹니다.",
        },
      ],
      evidence: "Cache-Control policy, Vary header, server cache key",
    },
    {
      topic: "null과 빈 값 계약",
      q: "null, absent, empty 값은 API에서 왜 따로 정의하나요?",
      answer: "null, absent, empty string, empty array는 의미가 다를 수 있습니다. 의미가 같다면 일관된 표현을 정하고, 의미가 다르면 schema와 client fixture에 명시해야 합니다.",
      followups: [
        {
          q: "absent와 null의 호환성 차이는 무엇인가요?",
          answer: "absent는 오래된 client가 모르는 필드를 무시하는 additive change에 가깝고, null은 필드가 존재하지만 값이 없다는 의미를 줍니다. client schema가 null을 허용하는지 확인해야 합니다.",
        },
        {
          q: "empty string과 empty array는 언제 별도 의미를 갖나요?",
          answer: "empty string은 사용자가 비워 둔 입력일 수 있고, empty array는 결과가 없음을 뜻할 수 있습니다. 검색 조건, patch 요청, 응답 목록에서 의미를 분리해야 합니다.",
        },
        {
          q: "client fixture는 왜 필요한가요?",
          answer: "모바일이나 외부 consumer가 null, absent, empty를 실제로 어떻게 파싱하는지 고정합니다. 호환성 테스트 없이 바꾸면 배포 후 특정 client만 깨질 수 있습니다.",
        },
      ],
      evidence: "response schema, compatibility test, client fixture",
    },
    {
      topic: "로그 레벨 정책",
      q: "로그 레벨은 운영 행동 기준으로 어떻게 나누나요?",
      answer: "INFO는 정상 핵심 이벤트, WARN은 자동 복구됐지만 주의할 신호, ERROR는 사용자 영향이나 운영 조치가 필요한 실패에 둡니다. expected error를 ERROR로 남기면 알림 품질이 떨어집니다.",
      followups: [
        {
          q: "expected error는 어떤 레벨에 두나요?",
          answer: "사용자 입력 오류나 권한 거부처럼 예상 가능한 실패는 보통 INFO나 WARN에 둡니다. ERROR는 조치가 필요한 시스템 실패에 남겨 alert fatigue를 줄입니다.",
        },
        {
          q: "redaction과 sampling은 언제 적용하나요?",
          answer: "개인정보, token, secret은 저장 전 redaction하고, 고QPS 반복 로그는 sampling합니다. 보안, audit, 드문 치명 오류는 별도 보존 정책을 둡니다.",
        },
        {
          q: "로그가 많아도 알림이 피곤해지는 이유는 무엇인가요?",
          answer: "행동할 수 없는 ERROR가 많으면 사람이 신호를 믿지 않게 됩니다. 알림은 증상 기반이고 runbook과 owner가 있어야 합니다.",
        },
      ],
      evidence: "log level policy, error budget, alert mapping",
    },
    {
      topic: "API smoke test",
      q: "API smoke test는 배포 후 무엇을 최소 확인하나요?",
      answer: "smoke test는 배포된 artifact가 실제 dependency와 연결되고 critical route가 최소 동작하는지 확인합니다. 깊은 검증보다 release id, health, auth, read/write path 확인이 목적입니다.",
      followups: [
        {
          q: "release id는 왜 확인하나요?",
          answer: "테스트가 실제 새 artifact를 때렸는지 확인하기 위해서입니다. 이전 버전이나 다른 pod를 보고 통과하면 배포 검증이 아닙니다.",
        },
        {
          q: "auth가 필요한 smoke test는 어떻게 구성하나요?",
          answer: "전용 test 계정이나 service credential을 쓰고 권한 범위를 최소화합니다. 인증 실패, 권한 부족, token 만료가 배포 문제인지 빠르게 구분할 수 있어야 합니다.",
        },
        {
          q: "read/write critical path는 어디까지 확인하나요?",
          answer: "핵심 생성 또는 변경 요청과 즉시 조회를 최소 범위로 확인합니다. 테스트 데이터는 격리하고 cleanup 또는 TTL을 둡니다.",
        },
      ],
      evidence: "smoke script, release id, critical path result",
    },
    {
      topic: "입력 normalize",
      q: "입력 normalize는 어떤 값에서 특히 조심해야 하나요?",
      answer: "공백, 대소문자, 전화번호, 이메일, 날짜 형식, Unicode 표현이 제각각이면 중복 검증과 검색이 깨집니다. 저장 전 normalize 기준과 원본 보존 여부를 정해야 합니다.",
      followups: [
        {
          q: "Unicode, email, phone, date normalize는 무엇이 다른가요?",
          answer: "Unicode는 같은 글자의 표현형, email은 대소문자와 provider 규칙, phone은 국가 코드, date는 timezone과 local date 의미를 다룹니다. 한 규칙으로 모두 처리하면 안 됩니다.",
        },
        {
          q: "irreversible normalize는 왜 위험한가요?",
          answer: "원래 입력으로 복원할 수 없으면 법적 이름, 표시 이름, 감사 증거가 훼손될 수 있습니다. 검색용 normalized value와 표시용 original value를 분리합니다.",
        },
        {
          q: "original preservation은 언제 필요하나요?",
          answer: "사용자 표시, 고객지원, audit, 외부 시스템 재전송이 필요한 값은 원본을 보존합니다. 중복 검증과 검색에는 별도 normalized column을 씁니다.",
        },
      ],
      evidence: "normalization rule, duplicate fixture, search test",
    },
    {
      topic: "도메인 이벤트",
      q: "도메인 이벤트는 어떤 계약으로 발행해야 하나요?",
      answer: "도메인 이벤트는 내부 구현 로그가 아니라 비즈니스 사실입니다. 외부로 발행한다면 schema, versioning, ordering, idempotency, consumer compatibility를 계약으로 둬야 합니다.",
      followups: [
        {
          q: "outbox는 왜 도메인 이벤트와 자주 같이 쓰나요?",
          answer: "DB 상태 변경과 이벤트 발행 기록을 같은 transaction에 남겨 유실을 줄입니다. relay가 outbox를 읽어 broker로 발행하고 consumer는 중복을 견뎌야 합니다.",
        },
        {
          q: "ordering은 전역으로 보장해야 하나요?",
          answer: "전역 순서는 비용이 커서 보통 aggregate 단위 순서만 보장합니다. partition key와 sequence를 정해 같은 aggregate 이벤트가 뒤섞이지 않게 합니다.",
        },
        {
          q: "schema evolution과 consumer idempotency는 어떻게 검증하나요?",
          answer: "새 필드는 additive로 추가하고 삭제는 deprecation 후 진행합니다. consumer contract test와 duplicate delivery fixture로 호환성과 중복 처리 안전성을 확인합니다.",
        },
      ],
      evidence: "event contract, outbox record, consumer test",
    },
    {
      topic: "경험 경계 답변",
      q: "직접 해보지 않은 영역은 면접에서 어떻게 답해야 하나요?",
      answer: "직접 경험이 없는 영역은 경험처럼 포장하지 말고 원리와 검증 계획으로 답해야 합니다. 모르는 것을 숨기는 것보다 어떤 지표와 테스트로 확인할지 말하는 편이 신뢰를 줍니다.",
      followups: [
        {
          q: "모르는 영역을 경험처럼 말하지 않으려면 어떤 문장으로 시작하나요?",
          answer: "직접 운영해 본 경험은 제한적이지만 원리는 이렇게 이해하고 있고, 실제 적용 전에는 이런 지표와 테스트로 확인하겠다고 구분해서 말합니다.",
        },
        {
          q: "검증 계획에는 무엇이 들어가야 하나요?",
          answer: "작은 실험 범위, 관측 지표, 실패 기준, rollback 또는 중단 조건, 참고할 운영 문서를 포함합니다. 추측과 확인 가능한 항목을 분리합니다.",
        },
        {
          q: "경험이 부족한 답변도 신뢰를 줄 수 있나요?",
          answer: "가능합니다. 과장 대신 risk, 확인 순서, 도움을 받을 owner, 학습 계획을 말하면 의사결정 방식이 드러납니다.",
        },
      ],
      evidence: "experience boundary statement, verification plan, gap note",
    },
  ],
  "engineering-backend-auth-security-qa": [
    {
      topic: "OAuth2 authorization code flow",
      q: "OAuth2 authorization code flow에서 code와 token 노출 경계를 어떻게 줄이나요?",
      answer: "authorization code flow는 browser가 token을 직접 받지 않고 server가 code를 token으로 교환하게 해 노출 위험을 줄입니다. public client에서는 PKCE로 code interception 위험을 낮춥니다.",
      followups: [
        {
          q: "redirect URI allowlist가 느슨하면 어떤 문제가 생기나요?",
          answer: "공격자가 자신이 통제하는 redirect URI로 authorization code를 받을 수 있습니다. 정확한 scheme, host, path를 allowlist로 고정하고 wildcard와 open redirect를 피해야 합니다.",
        },
        {
          q: "PKCE verifier는 서버에 저장해야 하나요?",
          answer: "confidential client는 서버 세션에 verifier를 묶고, public client는 앱 내부의 요청 상태와 함께 보관합니다. code 교환 시 challenge와 verifier가 맞는지 확인해 탈취된 code 재사용을 막습니다.",
        },
        {
          q: "state 파라미터는 어떤 공격을 줄이나요?",
          answer: "state는 OAuth 요청과 callback을 묶어 CSRF와 login CSRF를 줄입니다. 난수 값으로 만들고 사용자 세션에 묶어 callback에서 일치 여부를 확인해야 합니다.",
        },
      ],
      evidence: "OAuth flow diagram, PKCE verifier, redirect URI allowlist",
    },
    {
      topic: "OIDC와 OAuth2 차이",
      q: "OIDC와 OAuth2는 인증과 권한 위임에서 어떻게 다르나요?",
      answer: "OAuth2는 권한 위임이고 OIDC는 그 위에 신원 인증을 표준화한 레이어입니다. ID token은 issuer, audience, expiry, nonce, signature를 검증해야 합니다.",
      followups: [
        {
          q: "ID token을 API authorization에 그대로 쓰면 왜 위험한가요?",
          answer: "ID token은 사용자의 신원 증명이 목적이고 API scope 위임을 표현하지 않을 수 있습니다. API는 audience와 scope가 맞는 access token을 요구해야 합니다.",
        },
        {
          q: "nonce 검증은 언제 필요한가요?",
          answer: "브라우저 기반 인증 흐름에서 replay나 token injection을 줄이기 위해 필요합니다. 인증 요청에 넣은 nonce와 ID token의 nonce claim이 일치해야 합니다.",
        },
        {
          q: "issuer와 audience 검증을 빼면 어떤 문제가 생기나요?",
          answer: "다른 IdP나 다른 client용 token이 우리 서비스에서 받아들여질 수 있습니다. issuer, audience, signature key, expiry를 모두 검증해야 token 혼동을 막습니다.",
        },
      ],
      evidence: "ID token validation, issuer/audience config, nonce test",
    },
    {
      topic: "MFA 적용 기준",
      q: "MFA는 어떤 요청에서 step-up으로 요구하나요?",
      answer: "MFA는 모든 요청에 기계적으로 붙이기보다 risk와 action 민감도에 따라 적용합니다. 관리자, 대량 export, 권한 변경, 결제 같은 high-risk action에는 step-up MFA가 필요합니다.",
      followups: [
        {
          q: "MFA recovery flow는 왜 별도 보안 검토가 필요한가요?",
          answer: "복구 경로가 약하면 MFA 전체가 우회됩니다. recovery code, 고객지원 재설정, device 변경에는 신원 확인, 지연, 알림, audit를 둬야 합니다.",
        },
        {
          q: "항상 MFA를 요구하면 더 안전한가요?",
          answer: "민감하지 않은 반복 요청까지 MFA를 요구하면 사용자 피로와 우회 압력이 커집니다. session freshness와 risk score를 기준으로 필요한 action에만 step-up을 적용합니다.",
        },
        {
          q: "관리자 작업의 MFA 성공은 어디에 남기나요?",
          answer: "권한 변경, impersonation, export 같은 action audit에 MFA 시각, 방법, session id를 함께 남깁니다. 나중에 해당 작업이 fresh authentication 이후였는지 확인할 수 있어야 합니다.",
        },
      ],
      evidence: "MFA policy, step-up trigger, recovery flow",
    },
    {
      topic: "Session fixation",
      q: "Session fixation은 로그인 처리에서 어떻게 차단하나요?",
      answer: "session fixation은 공격자가 정한 session id를 피해자 로그인 후에도 쓰게 만드는 공격입니다. 로그인 성공 시 session id를 재발급하고 cookie 속성과 CSRF 방어를 같이 둡니다.",
      followups: [
        {
          q: "로그인 성공 시 session id를 왜 재발급하나요?",
          answer: "로그인 전 익명 세션 id가 공격자에게 알려졌을 수 있기 때문입니다. 인증 직후 새 id를 발급해야 이전 id로 인증 세션을 이어받는 공격을 막습니다.",
        },
        {
          q: "session id 재발급 후 기존 장바구니 같은 상태는 어떻게 하나요?",
          answer: "필요한 익명 상태만 서버에서 새 인증 세션으로 명시적으로 이전합니다. 인증 상태, 권한, CSRF token은 새 세션 기준으로 다시 생성해야 합니다.",
        },
        {
          q: "remember-me 기능은 session fixation과 어떤 관련이 있나요?",
          answer: "remember-me token도 탈취되면 세션을 재생성할 수 있습니다. 단회성 rotation, device binding, 만료, 재사용 탐지를 둬야 장기 인증 쿠키가 고정 세션처럼 악용되지 않습니다.",
        },
      ],
      evidence: "session regeneration test, cookie attributes, login audit",
    },
    {
      topic: "Cookie 보안 속성",
      q: "인증 cookie에는 어떤 보안 속성을 기본으로 두나요?",
      answer: "인증 cookie는 HttpOnly, Secure를 기본으로 하고 SameSite는 UX와 CSRF 위험을 기준으로 정합니다. Domain과 Path는 최소 범위로 제한해야 합니다.",
      followups: [
        {
          q: "HttpOnly가 있으면 XSS 피해가 없어지나요?",
          answer: "token 직접 탈취는 줄지만 XSS가 사용자의 브라우저에서 인증 요청을 수행하는 위험은 남습니다. CSP, output encoding, 민감 action 재인증을 함께 둬야 합니다.",
        },
        {
          q: "Domain을 넓게 잡으면 어떤 문제가 생기나요?",
          answer: "하위 도메인 중 하나가 침해되면 인증 쿠키 영향 범위가 커질 수 있습니다. 쿠키는 필요한 host와 path에만 보내지도록 최소 범위로 제한합니다.",
        },
        {
          q: "SameSite=None은 언제 필요한가요?",
          answer: "cross-site iframe이나 외부 도메인 연동처럼 쿠키가 third-party context에서 필요할 때 사용합니다. 반드시 Secure와 함께 쓰고 CSRF token이나 Origin 검증을 강화해야 합니다.",
        },
      ],
      evidence: "Set-Cookie header review, CSRF test, browser fixture",
    },
    {
      topic: "XSS와 백엔드 보안",
      q: "XSS는 백엔드 인증 모델에 어떤 영향을 주나요?",
      answer: "XSS는 token 탈취, 관리자 action 수행, CSRF 우회로 backend 권한 모델을 무너뜨릴 수 있습니다. token 저장 위치, CSP, output encoding, audit가 함께 필요합니다.",
      followups: [
        {
          q: "HttpOnly cookie를 쓰면 XSS에서 안전한가요?",
          answer: "쿠키를 읽어 훔치기는 어렵지만 공격 스크립트가 사용자의 세션으로 요청을 보낼 수 있습니다. 민감 action에는 step-up 인증, CSRF 방어, server-side 권한 검증이 필요합니다.",
        },
        {
          q: "CSP report는 백엔드에서 어떻게 활용하나요?",
          answer: "위반 report를 수집해 inline script, 외부 도메인 로드, injection 시도를 탐지합니다. report endpoint는 abuse를 견디도록 rate limit과 schema validation을 둡니다.",
        },
        {
          q: "관리자 화면 XSS는 왜 더 심각한가요?",
          answer: "관리자 세션은 권한 변경, impersonation, PII export 같은 고위험 action을 수행할 수 있습니다. 관리자 화면은 CSP, output encoding, audit, step-up 인증을 더 엄격히 적용합니다.",
        },
      ],
      evidence: "XSS fixture, token storage policy, CSP report",
    },
    {
      topic: "SQL injection과 ORM",
      q: "ORM을 써도 SQL injection이 생기는 지점은 어디인가요?",
      answer: "ORM을 써도 native query, 문자열 연결, 동적 order by에서 injection이 생깁니다. parameter binding, allowlisted sort key, query builder를 강제해야 합니다.",
      followups: [
        {
          q: "동적 정렬 컬럼은 parameter binding으로 막을 수 있나요?",
          answer: "컬럼명과 방향은 값 바인딩 대상이 아니므로 allowlist로 매핑해야 합니다. client 입력을 그대로 ORDER BY 문자열에 붙이면 injection이 가능합니다.",
        },
        {
          q: "native query가 필요한 경우 어떤 guardrail을 두나요?",
          answer: "입력값은 prepared statement로 바인딩하고, 식별자나 fragment는 서버 코드의 allowlist에서 선택합니다. query review와 injection fixture를 테스트에 포함합니다.",
        },
        {
          q: "SQL injection 실패 로그에는 무엇을 남기나요?",
          answer: "원문 민감값은 남기지 않고 actor, route, validation error code, trace id, 차단된 parameter 이름 정도를 남깁니다. 공격 payload 전체 저장은 로그 오염과 PII 문제를 만들 수 있습니다.",
        },
      ],
      evidence: "prepared statement, native query review, injection test",
    },
    {
      topic: "SSRF DNS rebinding",
      q: "SSRF에서 DNS rebinding은 어떤 검증을 우회하나요?",
      answer: "DNS rebinding은 처음 허용 IP로 보이다가 연결 시점이나 redirect 후 private IP로 바뀌는 공격입니다. 연결 직전 IP 재검증, private/link-local 차단, redirect 제한이 필요합니다.",
      followups: [
        {
          q: "URL 파싱만 통과하면 안전한가요?",
          answer: "아닙니다. host 정규화, DNS resolve, redirect, 최종 연결 IP가 모두 중요합니다. 파싱은 첫 단계이고 네트워크 연결 직전에 private 대역 차단을 다시 확인해야 합니다.",
        },
        {
          q: "metadata endpoint 접근은 어떻게 막나요?",
          answer: "169.254.169.254 같은 link-local 주소와 cloud metadata host를 egress policy에서 차단합니다. 애플리케이션 allowlist와 네트워크 레벨 deny rule을 함께 둡니다.",
        },
        {
          q: "SSRF 시도는 어떤 로그로 탐지하나요?",
          answer: "차단된 host, resolved IP, actor, endpoint, redirect chain, egress proxy decision을 남깁니다. 민감 내부 주소를 사용자 응답에 그대로 노출하지는 않습니다.",
        },
      ],
      evidence: "DNS/IP revalidation, redirect test, egress deny log",
    },
    {
      topic: "Secret rotation",
      q: "Secret rotation은 어떤 순서로 운영하나요?",
      answer: "secret rotation은 새 secret 발급, dual validation 또는 rolling deploy, old secret revoke, 영향 범위 확인 순서로 진행합니다. rotation 가능한 구조가 사고 대응 속도를 좌우합니다.",
      followups: [
        {
          q: "dual validation은 언제 필요한가요?",
          answer: "모든 인스턴스가 동시에 새 secret으로 바뀌지 못하거나 외부 provider가 순차 반영될 때 필요합니다. 새 값과 이전 값을 짧은 기간 모두 검증하고 전환 완료 후 이전 값을 폐기합니다.",
        },
        {
          q: "이미 노출된 secret은 파일만 지우면 되나요?",
          answer: "아닙니다. secret을 revoke하거나 rotate하고, git history, CI log, container image, 배포 환경까지 노출 범위를 확인해야 합니다.",
        },
        {
          q: "rotation 실패를 어떻게 빨리 발견하나요?",
          answer: "secret version별 인증 실패율, provider 401/403, 배포 cohort, error log를 봅니다. rollback 가능한 window와 이전 secret 폐기 시점을 runbook에 명시합니다.",
        },
      ],
      evidence: "rotation runbook, secret version, revoke audit",
    },
    {
      topic: "권한 변경 audit",
      q: "권한 변경 audit에는 어떤 전후 맥락이 필요하나요?",
      answer: "권한 변경은 이후 접근 가능성을 바꾸는 root action입니다. 누가 누구에게 어떤 권한을 왜 부여했는지와 승인 기록, 변경 전후 scope를 남겨야 합니다.",
      followups: [
        {
          q: "권한 변경 요청의 reason code는 왜 필요한가요?",
          answer: "나중에 업무 목적과 승인 근거를 확인하기 위해 필요합니다. 관리자 오남용 조사에서 단순 변경 사실보다 변경 이유와 승인자가 중요합니다.",
        },
        {
          q: "권한 변경 후 기존 세션은 어떻게 하나요?",
          answer: "권한 축소나 제거는 기존 세션과 권한 캐시를 무효화해야 합니다. token version이나 permission version을 올려 다음 요청부터 새 정책을 적용합니다.",
        },
        {
          q: "권한 변경 audit는 누가 볼 수 있어야 하나요?",
          answer: "보안 담당자, 감사 담당자, 해당 tenant owner처럼 제한된 역할만 볼 수 있어야 합니다. audit 조회 자체도 actor와 목적을 남겨야 합니다.",
        },
      ],
      evidence: "permission change audit, approval record, before/after role diff",
    },
    {
      topic: "Admin impersonation",
      q: "Admin impersonation은 어떤 제한과 기록이 있어야 하나요?",
      answer: "impersonation은 대상 tenant, reason code, approval, 시간 제한, read-only 기본값, 사용자 알림, audit log가 있어야 합니다. 관리자와 대상 사용자 모두 기록해야 합니다.",
      followups: [
        {
          q: "impersonation 세션은 read-only가 기본이어야 하나요?",
          answer: "가능하면 read-only가 기본입니다. 쓰기 action이 필요하면 별도 승인, step-up MFA, reason code, 더 짧은 session TTL을 요구해야 합니다.",
        },
        {
          q: "사용자에게 impersonation을 알려야 하나요?",
          answer: "지원이나 보안 정책상 허용되는 범위에서 알림을 주는 편이 투명합니다. 최소한 tenant owner나 감사 로그에는 누가 언제 어떤 목적으로 접근했는지 남아야 합니다.",
        },
        {
          q: "impersonation 중 생성된 로그의 actor는 누구인가요?",
          answer: "실제 조작한 관리자와 impersonated user를 둘 다 남깁니다. 단일 user id로 덮어쓰면 사고 조사에서 책임 주체와 영향 사용자를 분리할 수 없습니다.",
        },
      ],
      evidence: "impersonation audit, reason code, time-bound session",
    },
    {
      topic: "PII export 통제",
      q: "PII export는 일반 조회보다 어떤 통제가 더 필요한가요?",
      answer: "PII export는 최소 권한, 목적 기록, approval, scope 제한, 짧은 TTL, 다운로드 audit, 보존 기간을 요구합니다. 일반 조회보다 강한 통제가 필요합니다.",
      followups: [
        {
          q: "export 승인에는 어떤 정보가 있어야 하나요?",
          answer: "요청자, 목적, 대상 tenant, 필드 범위, 예상 건수, 보존 기간, 승인자를 남깁니다. 승인 범위 밖의 필드나 건수 증가는 새 승인이 필요합니다.",
        },
        {
          q: "다운로드 audit는 생성 audit와 왜 분리하나요?",
          answer: "export 생성과 실제 다운로드 주체·시각·IP가 다를 수 있습니다. 파일이 생성됐지만 내려받지 않았는지, 여러 번 다운로드됐는지를 분리해 봐야 합니다.",
        },
        {
          q: "PII export 파일 만료 후 무엇을 확인하나요?",
          answer: "저장소 객체 삭제, signed URL 만료, download endpoint 차단, audit 보존을 확인합니다. 삭제 실패는 보안 이벤트로 다루고 재시도나 수동 조치를 남깁니다.",
        },
      ],
      evidence: "export approval, scope query, download audit, retention policy",
    },
    {
      topic: "Security incident packet",
      q: "보안 사고 패킷은 어떤 증거로 범위를 산정하나요?",
      answer: "보안 사고 패킷에는 summary, reproduction, scope, temporary control, permanent fix, audit evidence, communication, follow-up이 들어갑니다. 증거 보존과 범위 산정이 우선입니다.",
      followups: [
        {
          q: "초기 대응에서 바로 root cause를 확정해도 되나요?",
          answer: "초기에는 확정보다 containment와 증거 보존이 우선입니다. 확인된 사실, 가설, 아직 모르는 범위를 분리해 기록해야 잘못된 커뮤니케이션을 줄입니다.",
        },
        {
          q: "temporary control은 어떤 예가 있나요?",
          answer: "취약 endpoint 비활성화, feature flag off, egress 차단, token revoke, 권한 축소, WAF rule 같은 완화 조치입니다. 영구 수정 전 사용자 영향을 줄이는 목적입니다.",
        },
        {
          q: "사고 범위 쿼리는 어떻게 검증하나요?",
          answer: "audit log, access log, DB state, object storage access log를 같은 time window와 actor/resource key로 교차 확인합니다. 단일 로그 소스만 믿으면 누락 가능성이 있습니다.",
        },
      ],
      evidence: "SECURITY INCIDENT PACKET, timeline, audit query, comms note",
    },
    {
      topic: "권한 캐시",
      q: "권한 캐시는 stale permission 위험을 어떻게 줄이나요?",
      answer: "권한 캐시는 stale permission 위험이 큽니다. TTL을 짧게 하거나 token version, permission version, revoke event로 무효화해야 합니다.",
      followups: [
        {
          q: "권한 축소 직후 캐시가 남으면 어떤 문제가 생기나요?",
          answer: "권한이 제거된 사용자가 TTL 동안 계속 접근할 수 있습니다. 권한 축소는 cache eviction, permission version 증가, active session revoke와 함께 처리해야 합니다.",
        },
        {
          q: "권한 캐시 TTL은 짧을수록 좋은가요?",
          answer: "짧으면 stale 위험은 줄지만 원본 권한 저장소 부하가 늘어납니다. 고위험 action은 원본 확인이나 version 검증을 하고, 저위험 조회는 짧은 TTL 캐시를 쓸 수 있습니다.",
        },
        {
          q: "권한 캐시 키에는 무엇이 들어가야 하나요?",
          answer: "actor id, tenant id, role 또는 policy version, resource scope가 들어가야 합니다. tenant나 version이 빠지면 다른 권한 결정이 섞일 수 있습니다.",
        },
      ],
      evidence: "permission version, cache invalidation log, stale permission test",
    },
    {
      topic: "client tenant id 신뢰 금지",
      q: "client가 보낸 tenant id를 인증 경계로 쓰면 왜 위험한가요?",
      answer: "tenant scope는 client가 보낸 값을 신뢰하지 않고 server-side session이나 token claim에서 결정합니다. DB query에서도 actor tenant와 resource tenant 일치를 강제해야 합니다.",
      followups: [
        {
          q: "관리자처럼 여러 tenant를 볼 수 있는 actor는 어떻게 처리하나요?",
          answer: "허용된 tenant 목록과 현재 선택 tenant를 서버 세션이나 policy decision으로 관리합니다. client tenant id는 요청 의도일 뿐이며 서버가 권한 범위 안인지 확인해야 합니다.",
        },
        {
          q: "DB query에서 tenant predicate를 빼먹지 않으려면 어떻게 하나요?",
          answer: "repository helper, row-level security, tenant-scoped query builder, integration test fixture를 둡니다. foreign tenant id로 목록과 상세 API를 모두 negative test해야 합니다.",
        },
        {
          q: "tenant id 불일치가 나면 로그에 무엇을 남기나요?",
          answer: "actor tenant, requested tenant, resource id, route, decision, trace id를 남깁니다. 사용자 응답에는 다른 tenant 존재를 드러내지 않도록 일반 거절 메시지를 사용합니다.",
        },
      ],
      evidence: "tenant source policy, cross-tenant fixture, DB predicate",
    },
    {
      topic: "보안 헤더",
      q: "보안 헤더는 인증 화면에서 어떤 방어선을 만드나요?",
      answer: "CSP, HSTS, X-Frame-Options, Referrer-Policy는 브라우저 보안 동작을 결정합니다. 인증 cookie와 관리자 화면이 있으면 backend response policy로 일관되게 내려야 합니다.",
      followups: [
        {
          q: "HSTS는 어떤 실수를 줄이나요?",
          answer: "사용자가 HTTP로 접근해도 브라우저가 HTTPS를 강제하도록 해 downgrade와 cookie 노출 위험을 줄입니다. includeSubDomains와 preload는 하위 도메인 준비 상태를 확인한 뒤 적용합니다.",
        },
        {
          q: "X-Frame-Options나 frame-ancestors는 왜 필요한가요?",
          answer: "로그인과 관리자 화면이 clickjacking으로 iframe 안에서 조작되는 위험을 줄입니다. CSP frame-ancestors로 허용 embedding origin을 명확히 제한합니다.",
        },
        {
          q: "Referrer-Policy는 개인정보와 어떤 관련이 있나요?",
          answer: "외부 링크 이동 시 URL의 민감 query나 path가 Referer로 새는 것을 줄입니다. 인증, reset token, export URL에는 민감값을 URL에 넣지 않는 것이 먼저입니다.",
        },
      ],
      evidence: "security header scan, CSP report, HSTS config",
    },
    {
      topic: "Replay attack",
      q: "Replay attack은 nonce와 idempotency로 어떻게 줄이나요?",
      answer: "replay attack은 webhook뿐 아니라 결제 요청, password reset, signed URL, API nonce에서도 생깁니다. timestamp, nonce, idempotency ledger, short TTL, one-time token으로 막습니다.",
      followups: [
        {
          q: "timestamp tolerance는 너무 길면 어떤 문제가 생기나요?",
          answer: "공격자가 캡처한 요청을 재사용할 수 있는 시간이 길어집니다. clock skew를 감당할 만큼만 허용하고 nonce나 event id 저장소로 한 번 처리된 요청을 막아야 합니다.",
        },
        {
          q: "one-time token은 어디에 저장하나요?",
          answer: "서버에 hash와 만료 시각, 사용 여부를 저장합니다. 사용 성공 시 즉시 consumed 상태로 바꾸고 같은 token 재사용은 거절해야 합니다.",
        },
        {
          q: "idempotency와 replay 방지는 같은가요?",
          answer: "겹치지만 목적이 다릅니다. idempotency는 안전한 재시도 수렴이 목적이고, replay 방지는 공격자가 캡처한 요청을 다시 실행하지 못하게 막는 통제입니다.",
        },
      ],
      evidence: "nonce store, timestamp tolerance, one-time token test",
    },
    {
      topic: "보안 negative test",
      q: "보안 negative test는 어떤 금지 경로를 고정하나요?",
      answer: "보안 테스트는 정상 허용보다 forbidden actor, foreign tenant, expired token, replay, malformed input, excessive request 같은 negative fixture가 핵심입니다.",
      followups: [
        {
          q: "foreign tenant fixture는 목록과 상세 중 어디에 필요하나요?",
          answer: "둘 다 필요합니다. 목록은 다른 tenant 데이터가 섞이지 않아야 하고, 상세는 id를 직접 바꿔도 403이나 숨김 404로 차단돼야 합니다.",
        },
        {
          q: "expired token 테스트에서 무엇을 확인하나요?",
          answer: "만료 token이 거절되는지, refresh 흐름이 정상 token family에서만 동작하는지, 거절 로그가 남는지 확인합니다. clock skew 허용 범위도 명시해야 합니다.",
        },
        {
          q: "replay fixture는 어떤 결과를 기대하나요?",
          answer: "같은 nonce, event id, reset token, signed URL 재사용이 side effect 없이 거절되거나 no-op 처리돼야 합니다. audit에는 중복 시도와 decision이 남아야 합니다.",
        },
      ],
      evidence: "abuse fixture set, negative test packet, audit assertion",
    },
  ],
  "engineering-backend-architecture-qa": [
    {
      topic: "Layered architecture",
      q: "Layered architecture에서 계층 누수는 어떻게 드러나나요?",
      answer: "layered architecture는 역할이 명확하고 이해하기 쉽지만 domain rule이 service에 비대해지고 infra 세부사항이 위로 새기 쉽습니다. 의존 방향과 계층 누수를 점검해야 합니다.",
      followups: [
        {
          q: "Controller가 repository를 직접 호출하면 무엇이 문제인가요?",
          answer: "요청 계약과 저장소 접근이 붙어 domain invariant와 transaction 경계가 흩어집니다. 조회 전용이면 별도 query service로 의도를 드러내고, 변경 경로는 application service를 거치게 해야 합니다.",
        },
        {
          q: "Service가 커지는 것을 어떤 지표로 보나요?",
          answer: "method 수, cyclomatic complexity, transaction 분기, 외부 dependency 수, 테스트 fixture 크기를 봅니다. 여러 aggregate의 상태 전이가 한 service에 모이면 boundary 재검토가 필요합니다.",
        },
        {
          q: "계층 규칙은 어떻게 자동으로 검증하나요?",
          answer: "ArchUnit 같은 architecture test나 build module dependency rule로 controller, application, domain, infra의 참조 방향을 검증합니다. PR에서 dependency graph diff를 확인하면 누수를 빨리 잡을 수 있습니다.",
        },
      ],
      evidence: "layer dependency rule, service size metric, architecture test",
    },
    {
      topic: "Hexagonal architecture",
      q: "Hexagonal architecture는 어떤 의존성을 끊어주나요?",
      answer: "hexagonal architecture는 domain이 외부 기술에 의존하지 않게 port를 안쪽에 두고 adapter가 바깥에서 구현합니다. 테스트와 교체 가능성이 좋아지지만 간접 계층 비용이 생깁니다.",
      followups: [
        {
          q: "Port는 domain 안에 두나요 adapter 쪽에 두나요?",
          answer: "도메인이 필요로 하는 능력을 표현하는 outbound port는 안쪽에 둡니다. adapter는 그 계약을 구현하며 SQL, HTTP client, broker 세부사항을 바깥에 가둡니다.",
        },
        {
          q: "간접 계층 비용은 언제 문제가 되나요?",
          answer: "단순 CRUD인데 port와 adapter를 과하게 쪼개면 파일 수와 mocking 비용만 늘어납니다. 외부 기술 교체, 격리 테스트, 복수 adapter가 실제로 필요한 경계에 우선 적용합니다.",
        },
        {
          q: "테스트는 무엇이 달라지나요?",
          answer: "domain은 fake port로 빠르게 단위 테스트하고, adapter는 실제 DB나 broker에 가까운 통합 테스트로 검증합니다. port contract test가 양쪽의 기대를 연결합니다.",
        },
      ],
      evidence: "port interface, adapter implementation, domain unit test",
    },
    {
      topic: "Anemic domain model",
      q: "Anemic domain model은 어떤 설계 냄새를 남기나요?",
      answer: "entity가 getter/setter만 있고 규칙이 service if문에 흩어져 있으면 anemic model 신호입니다. 불변식과 상태 전이를 aggregate 경계 안으로 모아야 합니다.",
      followups: [
        {
          q: "모든 로직을 entity에 넣어야 하나요?",
          answer: "아닙니다. 단일 aggregate의 불변식과 상태 전이는 entity나 aggregate method에 두고, 여러 aggregate나 외부 시스템 조율은 domain service나 application service가 맡습니다.",
        },
        {
          q: "Service if문이 많다는 것은 무엇을 의미하나요?",
          answer: "상태 전이 규칙이 객체 내부가 아니라 orchestration 계층에 흩어졌다는 신호일 수 있습니다. 같은 조건이 여러 use case에 반복되면 aggregate method로 이동할 후보입니다.",
        },
        {
          q: "JPA entity에 domain method를 넣어도 되나요?",
          answer: "가능하지만 ORM lifecycle과 lazy loading을 의식해야 합니다. domain method가 외부 API 호출이나 repository 접근을 직접 수행하면 entity 책임을 넘어섭니다.",
        },
      ],
      evidence: "domain invariant test, service complexity, aggregate method",
    },
    {
      topic: "Aggregate boundary",
      q: "Aggregate boundary는 트랜잭션 크기를 어떻게 결정하나요?",
      answer: "aggregate는 함께 강한 일관성으로 변경되어야 하는 최소 객체 묶음입니다. 너무 크면 lock과 transaction 비용이 커지고 너무 작으면 불변식이 밖으로 샙니다.",
      followups: [
        {
          q: "Aggregate가 너무 크다는 신호는 무엇인가요?",
          answer: "한 변경이 많은 row lock, 긴 transaction, 큰 object graph 로딩을 만들고 충돌률이 높아집니다. 서로 독립적으로 변경되는 child가 많다면 별도 aggregate와 event 연동을 고려합니다.",
        },
        {
          q: "Aggregate가 너무 작으면 어떤 문제가 생기나요?",
          answer: "불변식을 지키기 위해 여러 aggregate를 한 transaction에서 자주 묶게 됩니다. 결국 service 계층에 coordination 규칙이 쌓이고 동시성 버그가 DB constraint 없이는 막히지 않습니다.",
        },
        {
          q: "Aggregate 간 참조는 어떻게 하나요?",
          answer: "객체 참조보다 ID 참조를 우선하고, 다른 aggregate 상태는 필요 시 repository나 read model로 조회합니다. 강한 일관성이 필요하지 않은 변화는 domain event로 연결합니다.",
        },
      ],
      evidence: "aggregate invariant list, transaction boundary, lock scope",
    },
    {
      topic: "Repository 의미",
      q: "Repository를 DAO처럼 쓰면 어떤 경계가 흐려지나요?",
      answer: "repository는 단순 DAO가 아니라 aggregate collection처럼 domain 관점의 저장·조회 경계를 제공합니다. domain이 SQL/JPA 세부사항에 끌려가지 않게 합니다.",
      followups: [
        {
          q: "Repository method 이름은 무엇을 표현해야 하나요?",
          answer: "테이블 접근이 아니라 domain 의도를 표현해야 합니다. `findByStatusAndType`보다 `findPendingSettlements`처럼 use case와 불변식이 드러나는 이름이 경계를 지키기 쉽습니다.",
        },
        {
          q: "복잡한 조회는 repository에 둬야 하나요?",
          answer: "Aggregate 변경에 필요한 조회는 repository에 두고, 화면 조합이나 리포트 조회는 query service나 read model로 분리할 수 있습니다. command repository가 화면 요구에 오염되지 않게 합니다.",
        },
        {
          q: "Repository가 infra adapter인 경우 domain은 무엇을 보나요?",
          answer: "Domain이나 application layer는 port interface를 보고, JPA 구현체는 infra에 둡니다. 이렇게 해야 SQL, fetch strategy, persistence framework 변경이 도메인 규칙으로 새지 않습니다.",
        },
      ],
      evidence: "repository contract, aggregate root query, infra adapter",
    },
    {
      topic: "서비스 간 동기 호출",
      q: "서비스 간 동기 호출은 장애 범위를 어떻게 키우나요?",
      answer: "동기 호출이 많아지면 latency가 누적되고 하류 장애가 상류로 전파됩니다. timeout, retry, circuit breaker가 있어도 runtime coupling은 남습니다.",
      followups: [
        {
          q: "동기 호출을 모두 없애야 하나요?",
          answer: "사용자 요청에서 즉시 검증해야 하는 권한, 결제 승인, 재고 확정은 동기가 필요할 수 있습니다. 대신 latency budget, timeout, fallback 가능 여부를 계약에 포함해야 합니다.",
        },
        {
          q: "호출 사슬은 어떻게 발견하나요?",
          answer: "분산 trace waterfall, service dependency graph, p99 span breakdown을 봅니다. 한 요청이 여러 서비스를 직렬로 타면 가장 느린 dependency가 전체 경험을 결정합니다.",
        },
        {
          q: "동기 호출을 비동기로 바꿀 때 무엇을 설계하나요?",
          answer: "사용자 상태 모델, event contract, idempotent consumer, retry와 DLQ, reconciliation을 설계합니다. 단순히 queue를 넣는 것만으로 일관성 비용이 사라지지 않습니다.",
        },
      ],
      evidence: "dependency graph, trace waterfall, circuit metric",
    },
    {
      topic: "Outbox의 아키텍처 의미",
      q: "Outbox는 이벤트 발행 실패를 어떻게 다루나요?",
      answer: "outbox는 DB 변경과 이벤트 발행의 원자성을 보장하는 구현 패턴이면서, 서비스 간 데이터 흐름을 결과적 일관성으로 전환하는 아키텍처 결정입니다.",
      followups: [
        {
          q: "Outbox가 없으면 어떤 실패가 생기나요?",
          answer: "DB commit은 성공했는데 이벤트 발행이 실패하거나, 이벤트는 발행됐는데 DB rollback이 되는 간극이 생깁니다. 이 간극은 consumer 상태와 source of truth를 다르게 만듭니다.",
        },
        {
          q: "Relay는 어떻게 운영하나요?",
          answer: "outbox table의 상태, 발행 retry, poison record, relay lag, 중복 발행 가능성을 지표로 봅니다. consumer는 같은 event id를 여러 번 받아도 부작용이 한 번만 나야 합니다.",
        },
        {
          q: "Outbox는 2PC를 대체하나요?",
          answer: "분산 transaction을 강하게 보장하는 2PC와 다르게, outbox는 local transaction과 결과적 일관성을 선택합니다. 복잡한 coordinator 대신 replay와 idempotency로 복구 가능성을 확보합니다.",
        },
      ],
      evidence: "outbox table, relay runbook, ADR",
    },
    {
      topic: "Strangler fig 전환",
      q: "Strangler fig 전환은 어떤 단위로 쪼개야 하나요?",
      answer: "strangler fig는 레거시 전체를 한 번에 바꾸지 않고 routing이나 기능 경계를 기준으로 새 구현이 일부 트래픽을 받게 하는 점진 전환 방식입니다.",
      followups: [
        {
          q: "첫 전환 대상은 어떻게 고르나요?",
          answer: "기능 경계가 명확하고 data ownership 이전이 작으며 rollback route를 만들 수 있는 흐름을 고릅니다. 핵심 결제처럼 실패 비용이 큰 경로는 관측성과 병렬 검증을 먼저 준비합니다.",
        },
        {
          q: "레거시와 신규가 동시에 쓰는 데이터는 어떻게 관리하나요?",
          answer: "source of truth를 한쪽으로 정하고 CDC, outbox, read model로 다른 쪽을 따라가게 합니다. 양쪽 write가 필요하면 reconciliation과 conflict policy가 먼저 있어야 합니다.",
        },
        {
          q: "전환이 끝났다는 기준은 무엇인가요?",
          answer: "트래픽, 데이터, 운영 runbook, alert, owner가 신규 경로로 옮겨졌고 레거시 코드와 routing rule을 제거할 수 있을 때입니다. 남은 shadow dependency를 dependency graph로 확인합니다.",
        },
      ],
      evidence: "routing rule, migration dashboard, rollback route",
    },
    {
      topic: "분산 모놀리스",
      q: "분산 모놀리스는 어떤 운영 증상으로 보이나요?",
      answer: "서비스는 나뉘었지만 함께 배포해야 하고 공유 DB나 동기 호출 사슬 때문에 하나가 느리면 전체가 느려지는 구조가 분산 모놀리스입니다.",
      followups: [
        {
          q: "같이 배포해야 하는 서비스가 많으면 왜 문제인가요?",
          answer: "릴리스 조율 비용과 rollback 위험이 서비스 수만큼 커집니다. 한 서비스 변경이 다른 서비스 schema나 API 변경을 강제하면 독립 배포의 이점이 사라집니다.",
        },
        {
          q: "공유 DB가 분산 모놀리스 신호인 이유는 무엇인가요?",
          answer: "각 서비스가 같은 table 구조와 transaction 부작용에 묶입니다. schema 변경, lock, migration 실패가 여러 서비스 장애로 확산되므로 데이터 owner 경계가 필요합니다.",
        },
        {
          q: "이미 분산 모놀리스라면 어디부터 줄이나요?",
          answer: "dependency graph에서 배포 결합과 장애 전파가 큰 경로를 찾고, shared table write owner를 정합니다. 그 다음 API contract나 event read model로 직접 접근을 줄입니다.",
        },
      ],
      evidence: "deploy dependency, shared DB access, incident blast radius",
    },
    {
      topic: "API gateway 책임",
      q: "API gateway에 넣어도 되는 책임은 어디까지인가요?",
      answer: "gateway는 routing, authn/authz 일부, rate limit, protocol translation에 적합합니다. 도메인 규칙이 들어가면 정책 owner와 테스트 경계가 흐려집니다.",
      followups: [
        {
          q: "Gateway authorization과 service authorization은 어떻게 나누나요?",
          answer: "gateway는 token 검증, coarse-grained route permission, rate limit을 맡고 service는 resource owner와 domain 상태 기반 권한을 확인합니다. 서비스 내부 권한 검사를 생략하면 우회 경로가 위험해집니다.",
        },
        {
          q: "Gateway에 aggregation을 넣어도 되나요?",
          answer: "간단한 protocol 변환이나 routing은 가능하지만 화면별 조합 로직이 커지면 BFF나 composition service가 낫습니다. gateway가 domain policy를 알기 시작하면 변경 owner가 흐려집니다.",
        },
        {
          q: "Gateway 장애는 어떻게 격리하나요?",
          answer: "route별 rate limit, config rollout, health check, circuit metric을 둡니다. 모든 traffic이 통과하므로 설정 변경은 canary와 빠른 rollback이 가능해야 합니다.",
        },
      ],
      evidence: "gateway policy review, domain rule ownership, route config",
    },
    {
      topic: "BFF",
      q: "BFF는 어떤 클라이언트 문제를 해결하나요?",
      answer: "BFF는 client별 화면 요구와 backend API 모델이 크게 다를 때 유용합니다. 다만 domain policy를 중복하면 유지보수 비용이 커지므로 composition과 presentation shaping에 집중해야 합니다.",
      followups: [
        {
          q: "Mobile과 web BFF를 나누는 기준은 무엇인가요?",
          answer: "network 비용, 화면 구성, release cadence, 인증 방식이 크게 다르면 나눌 수 있습니다. 같은 조합 로직을 복제한다면 shared composition layer나 단일 BFF가 더 낫습니다.",
        },
        {
          q: "BFF에 domain validation을 넣으면 왜 위험한가요?",
          answer: "동일한 business rule이 core service와 BFF에 중복되어 일관성이 깨질 수 있습니다. BFF는 입력 shape와 화면 최적화에 집중하고 불변식은 domain owner 서비스가 지켜야 합니다.",
        },
        {
          q: "BFF 성능은 어떻게 봐야 하나요?",
          answer: "fan-out 호출 수, parallelism, downstream timeout, response size, cache hit ratio를 봅니다. BFF가 여러 backend를 직렬 호출하면 화면 p99가 빠르게 나빠집니다.",
        },
      ],
      evidence: "BFF contract, client-specific aggregation, policy duplication check",
    },
    {
      topic: "Schema evolution",
      q: "Schema evolution은 왜 배포 순서와 연결되나요?",
      answer: "서비스와 소비자가 다른 배포 시점에 존재하므로 schema는 backward/forward compatible해야 합니다. API, event, DB schema 모두 additive change와 deprecation window를 기준으로 관리합니다.",
      followups: [
        {
          q: "API field 이름을 바꾸려면 어떻게 하나요?",
          answer: "새 field를 추가하고 양쪽을 일정 기간 함께 내려 consumer 전환을 확인합니다. old field 제거는 usage metric과 contract test가 통과한 뒤 별도 release에서 진행합니다.",
        },
        {
          q: "DB schema 변경도 같은 원칙인가요?",
          answer: "그렇습니다. expand 단계에서 nullable column이나 새 table을 추가하고 app이 양쪽을 지원하게 한 뒤 backfill, 검증, contract 단계에서 옛 schema를 제거합니다.",
        },
        {
          q: "Event consumer가 오래된 버전이면 어떻게 하나요?",
          answer: "consumer가 unknown field를 무시하고 missing optional field를 처리할 수 있어야 합니다. breaking change는 새 event type이나 version을 두고 consumer lag와 배포 상태를 추적합니다.",
        },
      ],
      evidence: "schema compatibility test, versioning policy, consumer contract",
    },
    {
      topic: "Resilience pattern 남용",
      q: "Resilience pattern은 언제 오히려 시스템을 복잡하게 하나요?",
      answer: "circuit breaker, bulkhead, retry를 모든 호출에 붙이면 복잡도와 latency만 늘 수 있습니다. 실제 failure mode와 SLO impact가 있는 dependency에 우선 적용해야 합니다.",
      followups: [
        {
          q: "Retry가 필요 없는 호출은 어떤 경우인가요?",
          answer: "비멱등 side effect가 있거나 실패가 validation처럼 영구적인 경우 retry하면 중복 처리나 불필요한 부하가 생깁니다. idempotency key와 error taxonomy가 있을 때만 안전하게 재시도합니다.",
        },
        {
          q: "Circuit breaker를 붙이면 사용자는 무엇을 보나요?",
          answer: "하류 호출을 빠르게 차단하므로 fallback, cached data, 제한된 기능, 명확한 오류 메시지 중 하나가 필요합니다. open 상태와 fallback 사용량은 운영 지표로 노출해야 합니다.",
        },
        {
          q: "Bulkhead는 어떤 경계에 두나요?",
          answer: "느리거나 실패할 수 있는 dependency별로 thread pool, connection pool, queue를 분리합니다. 핵심 요청과 낮은 우선순위 batch가 같은 자원을 고갈시키지 않게 하는 것이 목적입니다.",
        },
      ],
      evidence: "failure mode table, retry budget, circuit dashboard",
    },
    {
      topic: "ADR과 RFC",
      q: "ADR과 RFC는 아키텍처 의사결정에서 어떻게 나뉘나요?",
      answer: "RFC는 논의와 제안을 위한 문서이고 ADR은 결정과 결과를 기록하는 문서입니다. 큰 변경은 RFC로 대안을 검토하고 결정 후 ADR로 남기는 흐름이 좋습니다.",
      followups: [
        {
          q: "언제 RFC가 필요한가요?",
          answer: "여러 팀, 데이터 소유권, 배포 전략, 운영 비용이 걸린 변경이면 RFC가 유용합니다. 단일 모듈 내부 구현 변경은 ADR이나 PR 설명만으로 충분할 수 있습니다.",
        },
        {
          q: "ADR에는 토론 내용을 모두 넣나요?",
          answer: "토론 전체가 아니라 결정에 영향을 준 맥락, 선택지, 거절한 대안, 결과, 재검토 조건을 남깁니다. 상세 토론은 RFC나 PR discussion 링크로 연결합니다.",
        },
        {
          q: "결정 후 RFC는 어떻게 관리하나요?",
          answer: "accepted, rejected, superseded 상태를 표시하고 최종 ADR을 연결합니다. 나중에 같은 논쟁이 반복될 때 당시의 근거와 trade-off를 빠르게 확인할 수 있어야 합니다.",
        },
      ],
      evidence: "RFC proposal, ADR decision, review comments",
    },
    {
      topic: "Architecture diagram",
      q: "Architecture diagram은 어떤 질문에 답해야 하나요?",
      answer: "아키텍처 diagram은 runtime dependency, data ownership, trust boundary, failure propagation, deployment unit을 보여야 합니다. 예쁜 그림보다 책임과 장애 경로가 중요합니다.",
      followups: [
        {
          q: "Context diagram에는 무엇이 들어가나요?",
          answer: "사용자, 외부 시스템, 내부 주요 서비스, 신뢰 경계, 데이터 흐름을 보여줍니다. 세부 class보다 시스템이 누구와 어떤 계약으로 통신하는지가 중요합니다.",
        },
        {
          q: "Sequence diagram은 언제 필요하나요?",
          answer: "동기 호출 사슬, event 발행, transaction 경계, timeout 전파를 설명해야 할 때 필요합니다. 장애 시 어느 단계에서 보상이나 retry가 일어나는지도 함께 표시합니다.",
        },
        {
          q: "Diagram이 오래되면 어떻게 방지하나요?",
          answer: "ADR, service catalog, dependency graph, IaC와 연결해 변경 PR에서 갱신하도록 합니다. 운영 runbook과 맞지 않는 diagram은 사고 대응에 오히려 혼선을 줍니다.",
        },
      ],
      evidence: "context diagram, sequence diagram, dependency graph",
    },
    {
      topic: "팀 구조와 아키텍처",
      q: "팀 구조는 서비스 경계와 어떻게 맞춰야 하나요?",
      answer: "서비스 경계와 팀 owner가 맞지 않으면 변경 조율 비용이 커집니다. 커뮤니케이션 구조가 시스템 구조에 반영되므로 owner와 on-call 책임까지 고려해야 합니다.",
      followups: [
        {
          q: "한 서비스에 owner가 여러 팀이면 어떤 문제가 생기나요?",
          answer: "우선순위, 배포 승인, incident 대응 책임이 흐려집니다. shared ownership이 필요하면 module owner, decision owner, on-call escalation을 명시해야 합니다.",
        },
        {
          q: "팀 기준으로 서비스를 나누면 항상 좋은가요?",
          answer: "팀 경계만 보고 나누면 도메인 불변식이나 데이터 소유권이 찢어질 수 있습니다. domain boundary, operational ownership, communication cost를 함께 봐야 합니다.",
        },
        {
          q: "On-call 책임은 설계에 왜 중요하나요?",
          answer: "장애를 받는 팀이 시스템을 바꿀 권한도 가져야 개선이 가능합니다. owner 없이 호출만 받는 구조는 runbook과 architecture debt가 쌓이기 쉽습니다.",
        },
      ],
      evidence: "team ownership map, on-call rotation, deploy ownership",
    },
    {
      topic: "Architecture debt",
      q: "Architecture debt는 어떻게 관리 가능한 상태로 만드나요?",
      answer: "architecture debt는 의식적으로 기록하고 만료 조건, 위험, 상환 trigger를 둬야 합니다. 숨겨진 debt가 아니라 관리되는 debt로 만들어야 합니다.",
      followups: [
        {
          q: "Debt와 버그는 어떻게 다르게 다루나요?",
          answer: "버그는 현재 기대 동작을 깨는 문제이고, debt는 현재는 동작하지만 변경 비용이나 장애 위험을 키우는 구조입니다. 둘 다 owner와 우선순위가 필요하지만 판단 기준이 다릅니다.",
        },
        {
          q: "Debt 상환 trigger는 무엇이 될 수 있나요?",
          answer: "릴리스 지연, incident 반복, 비용 증가, 특정 모듈 변경 빈도, 신규 기능 lead time 증가가 trigger가 될 수 있습니다. 수치가 있어야 계속 미루는 결정을 줄일 수 있습니다.",
        },
        {
          q: "Debt를 바로 고치지 않는 결정을 어떻게 남기나요?",
          answer: "위험, 예상 비용, 우회책, 모니터링 지표, 재검토 날짜를 ADR이나 debt register에 남깁니다. 단순 TODO보다 운영 영향과 상환 조건이 보여야 합니다.",
        },
      ],
      evidence: "architecture debt register, risk owner, review trigger",
    },
    {
      topic: "상황에 따라 다르다의 기준",
      q: "아키텍처 선택에서 맥락 의존성을 어떻게 구체화하나요?",
      answer: "상황에 따라 다르다고 말한 뒤에는 traffic, team size, data ownership, consistency, blast radius, deploy frequency 같은 판단 축을 제시해야 합니다.",
      followups: [
        {
          q: "판단 축을 먼저 말하면 무엇이 좋아지나요?",
          answer: "선호 기술 논쟁이 아니라 시스템 조건 비교가 됩니다. 예를 들어 MSA 여부는 코드 크기보다 팀 독립성, 데이터 소유권, 장애 격리 필요성으로 판단해야 합니다.",
        },
        {
          q: "작은 서비스에서는 어떤 선택이 합리적인가요?",
          answer: "운영 인력이 적고 변경 조율 비용이 낮다면 단일 배포와 명확한 모듈 경계가 더 효율적일 수 있습니다. 대신 추후 분리를 대비해 의존 방향과 데이터 owner를 기록합니다.",
        },
        {
          q: "결정 기준은 어디에 남기나요?",
          answer: "ADR의 context와 consequences, decision matrix, tradeoff ledger에 남깁니다. 나중에 traffic이나 팀 구조가 바뀌었을 때 같은 기준으로 결정을 재검토할 수 있습니다.",
        },
      ],
      evidence: "decision matrix, tradeoff ledger, scenario packet",
    },
  ],
  "engineering-data-qa": [
    {
      q: "Primary key와 business key는 왜 분리하나요?",
      answer: "business key는 정책 변경으로 바뀔 수 있어 surrogate primary key와 business unique key를 분리하는 편이 안전합니다. primary key는 참조 안정성이 중요합니다.",
      followups: [
        {
          q: "이메일을 primary key로 쓰면 어떤 문제가 생기나요?",
          answer: "이메일은 변경, 병합, 대소문자 정규화, 탈퇴 후 재가입 정책의 영향을 받습니다. 외래키가 이메일을 직접 참조하면 정책 변경이 여러 테이블 migration으로 번집니다.",
        },
        {
          q: "business unique key는 어디에서 강제하나요?",
          answer: "서비스에서 먼저 중복을 확인해 UX를 좋게 만들 수 있지만 최종 강제는 DB unique constraint가 맡아야 합니다. 동시 요청 race는 애플리케이션 체크만으로 막을 수 없습니다.",
        },
        {
          q: "PK 변경 migration은 왜 위험한가요?",
          answer: "모든 foreign key, index, materialized view, cache key가 함께 바뀔 수 있습니다. 참조 테이블 목록과 backfill, dual-read 기간, orphan 검증 쿼리를 준비해야 합니다.",
        },
      ],
      evidence: "PK/unique constraint design, migration note, foreign key map",
    },
    {
      q: "Foreign key를 항상 걸어야 하나요?",
      answer: "foreign key는 정합성에는 강하지만 대량 쓰기, shard, legacy migration에서는 비용이 있을 수 있습니다. 빼려면 orphan check와 reconciliation로 위험을 대신 감당해야 합니다.",
      followups: [
        {
          q: "FK를 빼면 어떤 보상이 필요하나요?",
          answer: "주기적인 orphan check, 쓰기 경로의 존재 검증, 삭제 이벤트 처리, reconciliation report가 필요합니다. 제약을 DB 밖으로 옮긴 만큼 누락을 탐지하는 운영 장치가 있어야 합니다.",
        },
        {
          q: "대량 쓰기에서 FK가 부담이 되는 이유는 무엇인가요?",
          answer: "insert/update마다 참조 테이블 index 확인과 lock이 필요합니다. batch import나 hot parent row가 있으면 lock wait와 write latency가 커질 수 있습니다.",
        },
        {
          q: "Shard 환경에서 FK는 왜 어려운가요?",
          answer: "서로 다른 shard에 있는 row 사이를 단일 DB constraint로 검증하기 어렵습니다. shard key를 맞추거나 애플리케이션 reconciliation과 보상 트랜잭션으로 정합성을 관리해야 합니다.",
        },
      ],
      evidence: "FK constraint, orphan check query, write latency",
    },
    {
      q: "Soft delete는 어떤 비용이 있나요?",
      answer: "soft delete는 복구와 audit에는 유리하지만 모든 query에 deleted predicate가 필요하고 unique constraint, index, count가 복잡해집니다. retention과 hard delete job이 필요합니다.",
      followups: [
        {
          q: "soft delete가 unique constraint와 충돌하는 이유는 무엇인가요?",
          answer: "삭제된 row가 같은 business key를 계속 점유하기 때문입니다. partial unique index나 active 상태만 포함하는 unique key 설계를 검토해야 합니다.",
        },
        {
          q: "deleted predicate 누락은 어떻게 잡나요?",
          answer: "repository query test, SQL snapshot, 관리자 화면 fixture로 삭제 row 노출을 검증합니다. 공통 scope를 쓰더라도 raw SQL, batch, report query는 별도 점검이 필요합니다.",
        },
        {
          q: "hard delete job은 왜 필요하나요?",
          answer: "무기한 보관하면 table bloat, index bloat, 개인정보 보존 정책 위반이 생깁니다. retention 기준과 삭제 batch size, 감사 로그 보존 위치를 분리해야 합니다.",
        },
      ],
      evidence: "soft delete predicate test, partial index, retention job",
    },
    {
      q: "정규화와 반정규화는 어떻게 선택하나요?",
      answer: "정규화는 중복과 update anomaly를 줄이고 반정규화는 읽기 성능을 얻는 대신 동기화 비용을 만듭니다. 원본과 파생 데이터 경계를 명확히 해야 합니다.",
      followups: [
        {
          q: "반정규화 데이터의 원본은 어떻게 표시하나요?",
          answer: "파생 컬럼이나 집계 테이블마다 source table, 갱신 트리거, 재계산 job을 문서화합니다. 장애 시 어떤 데이터를 기준으로 복구할지 정해야 합니다.",
        },
        {
          q: "update anomaly는 어떤 식으로 발생하나요?",
          answer: "같은 의미의 값이 여러 row에 복제되어 일부만 갱신되면 화면마다 다른 값이 보입니다. 고객 등급, 가격, 권한처럼 정책성이 있는 값은 특히 위험합니다.",
        },
        {
          q: "반정규화가 필요한지 어떻게 검증하나요?",
          answer: "현재 query plan, p95 latency, row 수, 캐시 적중률을 먼저 확인합니다. join 최적화나 index로 충분하면 동기화 복잡도를 새로 만들 필요가 없습니다.",
        },
      ],
      evidence: "data model ADR, update anomaly fixture, sync job",
    },
    {
      q: "Partitioning은 언제 고려하나요?",
      answer: "partitioning은 테이블 크기, retention, time-range query, write volume이 커져 단일 인덱스와 vacuum이 부담될 때 고려합니다. partition key 선택이 핵심입니다.",
      followups: [
        {
          q: "partition key는 어떻게 고르나요?",
          answer: "쿼리 조건과 retention 기준에 자주 등장하고 데이터 분포가 고른 컬럼을 고릅니다. 시간 partition은 보관 정책에 유리하지만 특정 최신 partition에 쓰기가 몰릴 수 있습니다.",
        },
        {
          q: "partition pruning이 안 되면 무엇이 문제인가요?",
          answer: "조건이 partition key와 맞지 않거나 함수로 감싸져 planner가 제외할 partition을 판단하지 못할 수 있습니다. EXPLAIN에서 읽는 partition 수와 filter 조건을 확인해야 합니다.",
        },
        {
          q: "partitioning이 모든 성능 문제를 해결하나요?",
          answer: "아닙니다. 잘못 나누면 query가 모든 partition을 훑고 index와 migration만 복잡해집니다. 느린 쿼리 원인이 scan 범위인지 lock, sort, join인지 먼저 분리해야 합니다.",
        },
      ],
      evidence: "partition pruning plan, retention policy, table size metric",
    },
    {
      q: "Sharding은 어떤 비용을 감수하나요?",
      answer: "sharding은 여러 DB 노드로 데이터를 분산하는 설계입니다. cross-shard transaction, query, rebalancing 비용이 크므로 shard key와 hot shard 위험을 먼저 봐야 합니다.",
      followups: [
        {
          q: "shard key를 잘못 고르면 어떤 일이 생기나요?",
          answer: "특정 shard에 트래픽과 데이터가 몰려 hot shard가 됩니다. tenant, user, region 같은 후보의 cardinality와 쓰기 분포, cross-tenant query 요구를 같이 봐야 합니다.",
        },
        {
          q: "cross-shard transaction은 왜 어렵나요?",
          answer: "여러 DB 노드의 commit을 원자적으로 맞춰야 하므로 latency와 실패 처리 비용이 큽니다. 가능하면 aggregate 경계를 shard 안에 두고 saga나 보상 처리로 나눕니다.",
        },
        {
          q: "rebalancing은 어떤 위험이 있나요?",
          answer: "데이터 이동 중 dual-read, dual-write, lag, 중복 처리, cache key 변경이 생길 수 있습니다. shard map 변경 이력과 검증 쿼리, rollback stop point가 필요합니다.",
        },
      ],
      evidence: "shard key decision, cross-shard query list, rebalancing plan",
    },
    {
      q: "Read replica lag가 UX에 미치는 영향은 무엇인가요?",
      answer: "방금 쓴 데이터는 primary로 읽거나 session stickiness를 적용하고, stale 허용 화면에는 pending이나 last updated를 보여줍니다. 모든 읽기를 replica로 보내면 read-your-writes가 깨집니다.",
      followups: [
        {
          q: "pending 표시는 언제 필요하나요?",
          answer: "쓰기 성공 후 projection이나 replica 반영이 늦는 화면에서 필요합니다. 사용자에게 저장 실패처럼 보이지 않게 처리 상태와 마지막 갱신 시간을 분리해 보여줍니다.",
        },
        {
          q: "session stickiness는 어떤 문제를 줄이나요?",
          answer: "사용자가 방금 변경한 데이터를 일정 시간 primary나 같은 최신 replica에서 읽게 해 read-your-writes 문제를 줄입니다. 비용은 primary read 증가와 라우팅 상태 관리입니다.",
        },
        {
          q: "replica lag 기준은 어떻게 운영하나요?",
          answer: "초 단위 lag와 WAL replay 위치를 모니터링하고 route별 허용 lag를 둡니다. lag가 임계값을 넘으면 최신성이 필요한 읽기는 primary로 우회해야 합니다.",
        },
      ],
      evidence: "read routing policy, lag metric, primary-read list",
    },
    {
      q: "긴 transaction은 왜 운영 리스크인가요?",
      answer: "긴 transaction은 lock과 connection을 오래 붙잡아 대기와 deadlock 가능성을 키웁니다. 외부 API, 파일 처리, 긴 계산은 transaction 밖이나 비동기로 빼야 합니다.",
      followups: [
        {
          q: "transaction 안에서 외부 API를 호출하면 왜 위험한가요?",
          answer: "외부 지연 동안 DB lock과 connection을 잡고 있어 다른 요청 대기와 deadlock 가능성이 커집니다. 외부 side effect는 transaction 밖으로 빼거나 outbox로 분리합니다.",
        },
        {
          q: "긴 transaction은 어떻게 찾나요?",
          answer: "pg_stat_activity의 xact_start, lock wait, connection usage time, APM transaction span을 봅니다. 정상 query time보다 transaction duration이 길면 애플리케이션 경계가 원인일 수 있습니다.",
        },
        {
          q: "batch 작업은 transaction을 어떻게 나누나요?",
          answer: "전체를 한 transaction으로 묶지 말고 id range나 page 단위로 commit합니다. 재시작 가능한 cursor와 처리 완료 marker를 둬야 중간 실패 후 중복을 줄일 수 있습니다.",
        },
      ],
      evidence: "transaction duration metric, lock wait, connection usage",
    },
    {
      q: "Optimistic lock과 unique constraint는 무엇을 다르게 보호하나요?",
      answer: "optimistic lock은 같은 row의 version 충돌을 감지하고 unique constraint는 business key 중복 생성을 막습니다. 둘 다 동시성 방어지만 보호하는 불변식이 다릅니다.",
      followups: [
        {
          q: "optimistic lock 실패는 사용자에게 어떻게 보이나요?",
          answer: "다른 사용자가 먼저 수정했다는 충돌로 안내하고 최신 값을 다시 읽게 해야 합니다. 단순 500으로 처리하면 정상적인 동시 수정 상황을 장애처럼 보이게 만듭니다.",
        },
        {
          q: "unique constraint는 왜 동시성 방어인가요?",
          answer: "동시에 같은 business key를 생성하는 요청이 들어와도 DB가 한쪽만 성공시킵니다. 애플리케이션 사전 조회는 race window가 있으므로 최종 방어가 될 수 없습니다.",
        },
        {
          q: "둘을 같이 써야 하는 경우는 언제인가요?",
          answer: "기존 row 수정 충돌과 새 row 중복 생성이 모두 중요한 도메인에서 같이 씁니다. 예를 들어 주문 상태 변경은 version으로, 주문 번호 중복은 unique key로 막습니다.",
        },
      ],
      evidence: "version column, unique index, conflict mapping test",
    },
    {
      q: "Query plan regression은 왜 발생하나요?",
      answer: "통계 변화, 데이터 분포 변화, parameter skew, index bloat 때문에 배포 후 query plan이 나빠질 수 있습니다. release별 plan과 pg_stat_statements를 비교해야 합니다.",
      followups: [
        {
          q: "통계가 낡으면 어떤 문제가 생기나요?",
          answer: "planner가 row 수와 selectivity를 잘못 예측해 index scan 대신 seq scan을 고르거나 join 순서를 잘못 잡습니다. analyze 시점과 actual rows 대비 estimated rows 차이를 확인합니다.",
        },
        {
          q: "parameter skew는 무엇인가요?",
          answer: "일부 tenant나 상태값에 데이터가 몰려 같은 SQL도 parameter에 따라 비용이 크게 달라지는 상황입니다. 평균 plan만 보면 hot tenant의 p99 지연을 놓칠 수 있습니다.",
        },
        {
          q: "release별 plan은 어떻게 비교하나요?",
          answer: "대표 쿼리의 EXPLAIN ANALYZE, pg_stat_statements 평균/percentile, buffer read, rows 값을 release id와 함께 저장합니다. 배포 전후 plan node와 row estimate 변화를 봅니다.",
        },
      ],
      evidence: "plan diff, statistics age, pg_stat_statements, release tag",
    },
    {
      q: "느린 count query는 어떻게 다루나요?",
      answer: "정확한 count가 필요한지 먼저 확인합니다. 필요 없으면 hasNext, approximate count, cached count를 쓰고 필요하면 조건에 맞는 index와 집계 테이블을 고려합니다.",
      followups: [
        {
          q: "정확한 total count가 항상 필요한가요?",
          answer: "무한 스크롤이나 다음 페이지 여부만 필요한 화면은 hasNext로 충분할 수 있습니다. 정확한 총 개수가 UX나 정산에 필요한 경우에만 비용을 감수합니다.",
        },
        {
          q: "cached count는 언제 위험한가요?",
          answer: "권한, 필터, 삭제 상태, replica lag에 따라 사용자별 count가 달라지면 오염될 수 있습니다. cache key에 scope와 filter를 포함하고 stale 허용 시간을 명시해야 합니다.",
        },
        {
          q: "집계 테이블은 어떻게 검증하나요?",
          answer: "원본 row 기준 reconciliation query로 집계 값 차이를 주기적으로 계산합니다. 이벤트 누락이나 중복 적용을 찾기 위해 마지막 처리 offset과 mismatch count를 남깁니다.",
        },
      ],
      evidence: "count plan, UX requirement, approximate count policy",
    },
    {
      q: "Redis key 설계에서 무엇을 정해야 하나요?",
      answer: "Redis key는 domain, resource id, version, tenant scope, 목적을 포함해 충돌과 권한 오염을 막습니다. TTL과 cardinality도 함께 관리해야 합니다.",
      followups: [
        {
          q: "tenant scope가 key에 빠지면 어떤 일이 생기나요?",
          answer: "다른 tenant의 데이터가 같은 key를 공유해 권한 오염이 발생할 수 있습니다. multi-tenant 서비스는 tenant id와 권한 scope를 key 구조에 명확히 포함해야 합니다.",
        },
        {
          q: "version을 key에 넣는 이유는 무엇인가요?",
          answer: "응답 구조나 계산 로직이 바뀔 때 기존 캐시를 안전하게 무시하기 위해서입니다. 대규모 delete 없이도 새 version key를 읽게 해 배포 호환성을 높입니다.",
        },
        {
          q: "key cardinality는 왜 보나요?",
          answer: "userId, requestId처럼 무한히 늘어나는 key는 메모리와 eviction을 압박합니다. key pattern별 개수와 TTL 분포를 봐야 Redis를 캐시로 유지할 수 있습니다.",
        },
      ],
      evidence: "key naming policy, TTL table, key cardinality metric",
    },
    {
      q: "Cache stampede는 어떻게 완화하나요?",
      answer: "cache stampede는 인기 키 만료 시 요청이 동시에 DB로 몰리는 현상입니다. single-flight, soft TTL, background refresh, TTL jitter, negative cache로 완화합니다.",
      followups: [
        {
          q: "single-flight는 무엇을 막나요?",
          answer: "같은 key miss가 동시에 발생했을 때 한 요청만 DB를 조회하고 나머지는 그 결과를 기다리게 합니다. 인기 키 만료 순간의 DB burst를 줄이는 장치입니다.",
        },
        {
          q: "soft TTL은 어떻게 동작하나요?",
          answer: "논리 만료 시간이 지나도 짧은 기간 stale 값을 제공하면서 백그라운드에서 갱신합니다. 최신성이 아주 중요한 데이터에는 쓰면 안 되고 화면에 stale 허용 범위를 정해야 합니다.",
        },
        {
          q: "negative cache는 언제 도움이 되나요?",
          answer: "존재하지 않는 id를 반복 조회하는 경우 DB miss를 줄입니다. 다만 새로 생성된 데이터가 일정 시간 안 보일 수 있어 짧은 TTL과 생성 시 invalidation이 필요합니다.",
        },
      ],
      evidence: "stampede fixture, DB burst metric, single-flight lock",
    },
    {
      q: "Redis 분산 락은 어떤 조건에서 조심해야 하나요?",
      answer: "Redis lock은 SET NX PX와 owner token이 핵심이고 unlock은 token 비교와 delete가 원자적이어야 합니다. 그래도 최종 정합성은 DB constraint와 idempotency로 방어해야 합니다.",
      followups: [
        {
          q: "owner token이 왜 필요한가요?",
          answer: "락 TTL이 만료된 뒤 다른 owner가 획득한 lock을 이전 owner가 삭제하지 못하게 하기 위해서입니다. unlock은 token 비교와 delete를 Lua script처럼 원자적으로 처리해야 합니다.",
        },
        {
          q: "TTL이 짧으면 어떤 문제가 생기나요?",
          answer: "작업이 끝나기 전에 lock이 만료되어 같은 작업이 동시에 실행될 수 있습니다. 작업 시간 p99와 장애 시 해제 시간을 함께 고려하고 중복 실행 방어를 별도로 둡니다.",
        },
        {
          q: "DB constraint가 왜 여전히 필요한가요?",
          answer: "Redis failover, network partition, process pause에서는 lock 보장이 깨질 수 있습니다. 최종 불변식은 unique constraint, version check, idempotency key가 막아야 합니다.",
        },
      ],
      evidence: "lock token, Lua unlock script, idempotency constraint",
    },
    {
      q: "Redis eviction policy는 왜 데이터 종류별로 나눠야 하나요?",
      answer: "eviction policy는 메모리 한계에서 어떤 key를 제거할지 결정합니다. cache, session, lock, counter를 같은 Redis에 섞으면 eviction 영향이 인증이나 정합성으로 번질 수 있습니다.",
      followups: [
        {
          q: "cache와 session을 같은 Redis에 둘 때 위험은 무엇인가요?",
          answer: "캐시 key 폭증이 session key eviction으로 이어져 사용자 로그아웃 장애가 될 수 있습니다. key class별 maxmemory, eviction policy, cluster 분리가 필요합니다.",
        },
        {
          q: "evicted_keys 증가는 어떻게 해석하나요?",
          answer: "메모리 한계로 key가 제거되고 있다는 신호입니다. 캐시라면 hit ratio와 DB 부하를 같이 보고, session이나 lock key가 섞여 있으면 기능 장애 가능성을 즉시 확인합니다.",
        },
        {
          q: "noeviction은 항상 안전한가요?",
          answer: "데이터를 지우지 않는 대신 쓰기 명령이 실패할 수 있습니다. cache 용도에는 장애 형태가 더 나쁠 수 있으므로 workload별 실패 방식을 비교해야 합니다.",
        },
      ],
      evidence: "maxmemory policy, evicted_keys, key class separation",
    },
    {
      q: "Data migration rollback은 왜 따로 설계하나요?",
      answer: "schema rollback과 data rollback은 다릅니다. destructive migration은 피하고, stop point와 forward repair를 준비해야 실제 운영에서 안전합니다.",
      followups: [
        {
          q: "schema rollback과 data rollback은 어떻게 다른가요?",
          answer: "스키마는 컬럼이나 인덱스를 되돌릴 수 있어도 이미 변환된 데이터 의미는 원복이 어려울 수 있습니다. 변환 전 snapshot, mapping table, repair script가 필요합니다.",
        },
        {
          q: "destructive migration은 어떻게 피하나요?",
          answer: "컬럼 삭제나 의미 변경을 바로 하지 않고 expand-contract로 호환 기간을 둡니다. 새 코드가 안정되고 backfill 검증이 끝난 뒤 읽지 않는 필드만 제거합니다.",
        },
        {
          q: "stop point는 무엇을 기준으로 잡나요?",
          answer: "되돌릴 수 있는 마지막 지점과 forward repair로 전환해야 하는 지점을 나눕니다. 처리 row 수, 오류율, mismatch count, 백업 시점이 판단 기준이 됩니다.",
        },
      ],
      evidence: "migration rollback plan, backup, repair script, stop point",
    },
    {
      q: "Read-only mode는 언제 유용한가요?",
      answer: "primary가 불안정하지만 읽기 제공은 가능한 경우 read-only mode로 사용자 영향을 줄일 수 있습니다. stale data와 쓰기 재개 시 reconciliation을 함께 설계해야 합니다.",
      followups: [
        {
          q: "read-only mode에서 어떤 기능을 막나요?",
          answer: "주문 생성, 결제, 권한 변경처럼 DB write가 필요한 기능을 막고 조회, 다운로드, 상태 확인처럼 읽기 중심 기능만 남깁니다. 버튼 비활성화와 API 503/409 응답 정책을 맞춥니다.",
        },
        {
          q: "쓰기 재개 후 무엇을 검증하나요?",
          answer: "중단 중 실패한 요청, retry queue, outbox, cache invalidation 누락을 확인합니다. 사용자가 재시도한 작업이 중복 처리되지 않았는지도 idempotency key로 봐야 합니다.",
        },
        {
          q: "stale data 표시는 왜 필요한가요?",
          answer: "read-only 중 replica나 snapshot을 보여주면 최신 값이 아닐 수 있습니다. 마지막 갱신 시간과 쓰기 제한 상태를 표시해 사용자가 상태를 오해하지 않게 합니다.",
        },
      ],
      evidence: "read-only feature flag, primary health, reconciliation plan",
    },
    {
      q: "데이터 문제 답변에는 어떤 지표가 들어가야 하나요?",
      answer: "데이터 문제는 row count, cardinality, selectivity, p95/p99 query time, lock wait, replication lag, cache hit ratio, eviction count 같은 숫자로 답해야 합니다.",
      followups: [
        {
          q: "row count와 cardinality는 왜 같이 보나요?",
          answer: "전체 row 수가 커도 조건 cardinality가 낮으면 인덱스 효율이 떨어질 수 있습니다. planner가 실제 분포를 아는지 확인하려면 distinct 값과 skew를 같이 봐야 합니다.",
        },
        {
          q: "cache hit ratio만 보면 왜 부족한가요?",
          answer: "전체 hit ratio가 높아도 특정 hot key 만료나 권한 key miss가 DB를 압박할 수 있습니다. key pattern별 hit/miss, miss QPS, DB fallback latency를 같이 봅니다.",
        },
        {
          q: "replication lag는 어떤 단위로 답하나요?",
          answer: "초 단위 지연과 WAL 위치 차이, route별 영향 범위를 함께 말합니다. 단순 lag 수치보다 어떤 화면이나 API가 stale read에 노출되는지가 중요합니다.",
        },
      ],
      evidence: "metric packet, query timing, lock/lag/cache dashboard",
    },
  ],
  "engineering-runtime-quality-qa": [
    {
      q: "RED와 USE metric은 언제 함께 보나요?",
      answer: "RED는 요청 기반 서비스의 rate, errors, duration을 보고 USE는 리소스의 utilization, saturation, errors를 봅니다. 사용자 증상은 RED로, 병목 자원은 USE로 좁힙니다.",
      followups: [
        {
          q: "RED만 보고 장애 원인을 확정하면 어떤 위험이 있나요?",
          answer: "RED는 사용자가 겪는 증상을 잘 보여주지만 CPU, pool, disk, network 같은 자원 병목의 위치를 확정하지는 못합니다. error rate와 p99가 오른 뒤 USE dashboard와 trace를 연결해야 원인 후보를 줄일 수 있습니다.",
        },
        {
          q: "USE 지표가 나빠도 사용자가 멀쩡하면 어떻게 판단하나요?",
          answer: "즉시 장애 선언보다 capacity risk로 분류합니다. 다만 saturation 추세가 SLO burn으로 이어질 수 있으면 warning, scaling plan, load shedding 조건을 미리 잡아야 합니다.",
        },
        {
          q: "대시보드에는 어떤 증거를 같이 둬야 하나요?",
          answer: "route별 RED, 핵심 자원의 USE, release marker, incident trace link를 같이 둡니다. 같은 시각 축에서 증상과 자원 병목을 맞춰 볼 수 있어야 대응 중 추측을 줄일 수 있습니다.",
        },
      ],
      evidence: "RED dashboard, USE dashboard, incident trace",
    },
    {
      q: "p95와 p99는 장애 판단에서 어떻게 쓰나요?",
      answer: "p95는 일반적인 나쁜 경험을, p99는 꼬리 지연과 소수 병목을 보여줍니다. 평균은 tail latency를 숨기므로 장애와 성능 리뷰에는 percentile이 필요합니다.",
      followups: [
        {
          q: "평균 latency가 정상인데 p99만 튀면 어떻게 보나요?",
          answer: "소수 요청이 lock, GC, cold cache, 특정 downstream, 큰 payload에 걸렸을 가능성을 봅니다. route와 tenant, payload 크기별 histogram을 쪼개야 평균에 묻힌 사용자 영향을 찾을 수 있습니다.",
        },
        {
          q: "p99가 너무 흔들릴 때 어떤 기준을 둬야 하나요?",
          answer: "짧은 window의 단일 spike보다 지속 시간, traffic volume, error budget 소비를 같이 봅니다. 저트래픽 route는 p99 표본이 작아 흔들리므로 raw sample과 trace를 함께 확인합니다.",
        },
        {
          q: "latency percentile은 어디까지 쪼개야 하나요?",
          answer: "사용자 영향이 다른 route, dependency, region, release cohort 단위까지는 쪼개야 합니다. 너무 많은 label로 metric cardinality가 커지면 trace와 log에서 세부 분석을 맡깁니다.",
        },
      ],
      evidence: "latency histogram, p95/p99 trend, route segment",
    },
    {
      q: "Thread pool saturation은 어떤 신호로 찾나요?",
      answer: "thread pool saturation은 active thread, queue length, rejected task, request latency, thread dump로 봅니다. CPU가 낮아도 DB pool 대기면 latency가 커질 수 있습니다.",
      followups: [
        {
          q: "CPU가 낮은데 thread가 꽉 차면 무엇을 의심하나요?",
          answer: "blocking IO, DB connection 대기, lock contention, 외부 API timeout을 의심합니다. thread dump에서 WAITING, TIMED_WAITING, BLOCKED stack을 보고 어떤 dependency나 lock에 모였는지 확인합니다.",
        },
        {
          q: "thread pool을 키우기 전에 무엇을 확인하나요?",
          answer: "downstream pool과 rate limit, queue wait, rejection count, request timeout을 봅니다. 병목이 DB나 외부 API라면 thread를 늘려도 대기열만 커지고 장애 전파가 빨라질 수 있습니다.",
        },
        {
          q: "rejected task가 보이면 바로 장애인가요?",
          answer: "사용자 요청을 거절하면 장애 영향으로 봐야 합니다. 다만 낮은 우선순위 background 작업을 의도적으로 drop하는 정책이라면 shedding 지표와 복구 작업 큐를 확인해 영향 범위를 분리합니다.",
        },
      ],
      evidence: "executor metric, thread dump, rejected count",
    },
    {
      q: "GC latency가 원인인지 어떻게 확인하나요?",
      answer: "GC가 원인인지 보려면 pause time, allocation rate, heap after GC, p99 spike timestamp를 맞춰봐야 합니다. 증상과 시간 상관이 없으면 다른 병목일 수 있습니다.",
      followups: [
        {
          q: "GC pause와 API p99를 어떻게 연결하나요?",
          answer: "GC log의 pause timestamp와 route별 latency spike, request trace 시간을 같은 timezone과 clock 기준으로 맞춥니다. pause가 spike 직전이나 도중에 반복되지 않으면 lock이나 downstream 지연도 같이 봐야 합니다.",
        },
        {
          q: "heap을 키우면 항상 해결되나요?",
          answer: "아닙니다. heap을 키우면 OOM 여유는 생길 수 있지만 pause 시간이 길어질 수 있고, allocation 폭주나 leak 원인은 그대로 남습니다. heap after GC와 allocation rate를 먼저 봐야 합니다.",
        },
        {
          q: "GC 튜닝 전에 어떤 증거가 필요하나요?",
          answer: "GC log, JFR, heap usage, allocation hotspot, latency correlation이 필요합니다. 증거 없이 collector 옵션부터 바꾸면 문제를 숨기거나 다른 workload에서 tail latency를 악화시킬 수 있습니다.",
        },
      ],
      evidence: "GC log, JFR, heap usage, p99 timestamp",
    },
    {
      q: "Connection pool starvation은 어떻게 분리하나요?",
      answer: "pool wait 증가, active connection 고정, usage time 증가를 확인합니다. 원인은 느린 query, 긴 transaction, connection leak, pool size mismatch일 수 있습니다.",
      followups: [
        {
          q: "pool wait가 늘 때 query가 느린 것과 어떻게 구분하나요?",
          answer: "connection acquisition time과 SQL execution time을 분리합니다. acquisition이 길면 pool 부족이고, connection 확보 후 실행 시간이 길면 slow query나 lock을 봐야 합니다.",
        },
        {
          q: "connection leak은 어떤 증거로 보나요?",
          answer: "active connection이 반환되지 않고 usage time이 비정상적으로 길며 leak detection log가 같은 code path를 가리키는지 봅니다. transaction 경계와 stream 처리, 예외 경로에서 close가 누락됐는지도 확인합니다.",
        },
        {
          q: "pool size를 늘릴 때 무엇을 같이 계산하나요?",
          answer: "replica 수, DB max connection, query 평균 시간, p99, transaction 길이를 함께 계산합니다. app별 pool만 보면 autoscaling 후 전체 connection이 DB 한계를 넘을 수 있습니다.",
        },
      ],
      evidence: "pool wait metric, leak detection, slow query sample",
    },
    {
      q: "Timeout 전파는 왜 latency budget으로 봐야 하나요?",
      answer: "계층별 timeout과 cancellation이 맞지 않으면 이미 실패한 요청이 하류에서 계속 실행됩니다. 전체 latency budget 안에서 gateway, app, DB, client timeout을 맞춰야 합니다.",
      followups: [
        {
          q: "client timeout이 server timeout보다 짧으면 어떤 일이 생기나요?",
          answer: "사용자는 이미 실패를 받았는데 server와 downstream은 작업을 계속할 수 있습니다. 취소 전파가 없으면 불필요한 DB query와 외부 호출이 남아 saturation을 키웁니다.",
        },
        {
          q: "timeout 값은 어떤 순서로 정하나요?",
          answer: "사용자 SLO에서 시작해 gateway, app, dependency, DB 순으로 예산을 나눕니다. 상위 계층은 하위 계층보다 약간 길게 두되 retry까지 포함한 전체 시간이 SLO를 넘지 않게 해야 합니다.",
        },
        {
          q: "timeout 로그에는 무엇이 있어야 하나요?",
          answer: "request id, 호출한 dependency, configured timeout, elapsed time, retry attempt, cancellation 여부가 있어야 합니다. 그래야 어느 계층에서 예산을 초과했는지 trace와 함께 맞출 수 있습니다.",
        },
      ],
      evidence: "timeout budget, client/server config, cancellation log",
    },
    {
      q: "DLQ replay는 어떤 순서로 진행하나요?",
      answer: "DLQ는 원인 분류, poison message 여부, schema mismatch, downstream 복구 여부, idempotency 보장을 확인한 뒤 replay해야 합니다. 바로 replay하면 장애를 반복할 수 있습니다.",
      followups: [
        {
          q: "DLQ를 비우는 것과 복구는 어떻게 다른가요?",
          answer: "DLQ를 비우는 것은 backlog를 없애는 작업이고, 복구는 실패 원인을 제거하고 누락된 side effect를 안전하게 반영하는 작업입니다. replay 후 성공/실패 count와 downstream 상태까지 확인해야 합니다.",
        },
        {
          q: "poison message는 어떻게 처리하나요?",
          answer: "같은 message가 재처리마다 실패하면 schema, validation, business state 불일치를 확인합니다. 전체 replay에서 제외하거나 보정 스크립트를 적용하고, 원본 payload와 처리 결정을 감사 가능하게 남깁니다.",
        },
        {
          q: "replay 전에 idempotency는 어떻게 확인하나요?",
          answer: "message id나 business key 기반 중복 방지 테이블, unique constraint, side effect transaction 경계를 확인합니다. dry-run이나 staging fixture로 duplicate delivery가 결과를 두 번 만들지 않는지 검증합니다.",
        },
      ],
      evidence: "DLQ sample, replay dry-run, idempotency fixture",
    },
    {
      q: "Consumer lag triage는 어떻게 나누나요?",
      answer: "consumer lag는 생산량 증가, 소비 실패, partition skew, downstream 지연, deploy regression으로 나눠 봐야 합니다. worker만 늘리면 하류를 더 압박할 수 있습니다.",
      followups: [
        {
          q: "lag가 특정 partition에만 쌓이면 무엇을 보나요?",
          answer: "partition key skew, hot aggregate, poison message, 해당 consumer instance 상태를 봅니다. 전체 consumer 수를 늘려도 하나의 hot partition이면 처리량이 늘지 않을 수 있습니다.",
        },
        {
          q: "생산량 증가와 소비 실패는 어떻게 구분하나요?",
          answer: "produce rate, consume rate, error/retry count, downstream latency를 같은 시간 축으로 봅니다. 생산량만 늘고 error가 없으면 capacity 문제에 가깝고, error가 늘면 처리 실패 원인을 먼저 제거해야 합니다.",
        },
        {
          q: "lag 해소 중 사용자 영향은 어떻게 줄이나요?",
          answer: "우선순위 topic이나 key를 분리하고, 오래된 이벤트를 discard 가능한지 정책을 확인합니다. downstream 보호를 위해 replay rate limit과 backoff를 두고, 사용자에게 지연 상태를 노출해야 할 수 있습니다.",
        },
      ],
      evidence: "produce/consume rate, partition lag, downstream error",
    },
    {
      q: "Incident commander는 어떤 결정을 맡나요?",
      answer: "incident commander는 직접 모든 로그를 보는 사람이 아니라 의사결정, 우선순위, 역할 분담, 커뮤니케이션을 관리하는 사람입니다.",
      followups: [
        {
          q: "incident commander가 직접 디버깅에 빠지면 어떤 문제가 생기나요?",
          answer: "역할 배정, 고객 공지, rollback 판단, timeline 기록이 비게 됩니다. 조사 담당과 조치 담당을 나누고 commander는 next checkpoint와 의사결정을 유지해야 합니다.",
        },
        {
          q: "장애 중 우선순위는 어떻게 정하나요?",
          answer: "고객 영향 축소, 데이터 손상 방지, 복구 시간 단축 순서로 봅니다. root cause 확정보다 traffic 차단, rollback, degraded mode 같은 완화가 먼저일 수 있습니다.",
        },
        {
          q: "커뮤니케이션에는 어떤 정보가 들어가야 하나요?",
          answer: "영향 범위, 시작 시각, 현재 완화 상태, 다음 업데이트 시각, 고객 행동 필요 여부를 포함합니다. 원인 추정은 확정과 구분해 말하고, 변경된 판단은 timeline에 남깁니다.",
        },
      ],
      evidence: "incident role assignment, timeline, comms log",
    },
    {
      q: "Postmortem action item은 어떻게 검증 가능하게 쓰나요?",
      answer: "좋은 action item은 owner, due date, 검증 가능한 완료 기준이 있습니다. '주의한다'가 아니라 alert, test, runbook, gate를 바꾸는 항목이어야 합니다.",
      followups: [
        {
          q: "좋은 action item과 나쁜 action item의 차이는 무엇인가요?",
          answer: "좋은 항목은 누가 언제까지 무엇을 바꾸고 어떤 증거로 완료를 확인할지 명확합니다. 나쁜 항목은 '주의', '문서화', '개선 검토'처럼 재발 방지 장치가 실제 시스템에 남지 않습니다.",
        },
        {
          q: "postmortem에서 사람 실수를 어떻게 다루나요?",
          answer: "개인 탓보다 왜 시스템이 실수를 허용했고 감지하지 못했는지 봅니다. 승인 gate, 자동 검증, runbook, alert, 권한 경계 같은 방어선을 action item으로 바꿔야 합니다.",
        },
        {
          q: "action item 완료는 누가 확인하나요?",
          answer: "서비스 owner나 incident review 담당이 증거를 확인합니다. merged PR만으로 끝내지 않고 alert firing test, dashboard link, runbook readback, game day 결과처럼 운영 증거를 남깁니다.",
        },
      ],
      evidence: "postmortem action list, owner/date, verification result",
    },
    {
      q: "Log sampling은 어떤 이벤트를 보존해야 하나요?",
      answer: "log sampling은 고QPS route나 반복 오류의 log volume을 줄일 때 필요합니다. 다만 error, security, audit, rare high latency 이벤트는 보존 정책을 별도로 둬야 합니다.",
      followups: [
        {
          q: "sampling 때문에 장애 원인을 잃지 않으려면 어떻게 하나요?",
          answer: "error, timeout, p99 이상 요청, 결제 같은 핵심 이벤트는 우선 보존합니다. 정상 고QPS 요청만 sampling하고, trace id와 metric exemplar로 상세 로그를 찾아갈 경로를 남깁니다.",
        },
        {
          q: "반복 오류 로그는 그냥 버려도 되나요?",
          answer: "완전히 버리기보다 대표 sample, 발생 count, 첫/마지막 시각, 주요 dimension을 남깁니다. 그래야 volume은 줄이면서도 영향 범위와 재발 패턴을 볼 수 있습니다.",
        },
        {
          q: "audit 로그도 sampling할 수 있나요?",
          answer: "권한 변경, 결제, 개인정보 접근 같은 audit 로그는 sampling 대상이 아닙니다. 비용이 문제면 필드 최소화와 보존 정책을 조정하되 사건 재구성 가능성은 유지해야 합니다.",
        },
      ],
      evidence: "log volume metric, sampling rule, retained error sample",
    },
    {
      q: "High-cardinality metric은 왜 운영 리스크가 되나요?",
      answer: "userId나 requestId를 metric label로 쓰면 time series가 폭발해 비용과 query 성능이 망가집니다. 상세 식별자는 log/trace로 보내야 합니다.",
      followups: [
        {
          q: "metric label로 안전한 값은 무엇인가요?",
          answer: "route template, status class, region, dependency name, release id처럼 값의 종류가 제한된 dimension이 안전합니다. userId, email, requestId, raw URL처럼 무한히 늘 수 있는 값은 피합니다.",
        },
        {
          q: "상세 사용자 영향은 metric 없이 어떻게 찾나요?",
          answer: "metric은 route와 cohort 수준의 증상을 잡고, 특정 사용자는 trace id, structured log, audit record로 추적합니다. metric label에 개인 식별자를 넣지 않아도 correlation id로 drill-down할 수 있어야 합니다.",
        },
        {
          q: "cardinality 사고는 어떻게 감지하나요?",
          answer: "time series 수, label value 증가율, scrape size, query latency, observability 비용을 모니터링합니다. 새 label 추가 PR에는 예상 cardinality와 drop/allow list 검토를 포함합니다.",
        },
      ],
      evidence: "metric cardinality report, label policy, cost trend",
    },
    {
      q: "Rollback threshold는 어떻게 미리 정하나요?",
      answer: "rollback 기준은 새 release에서 error rate, p99, saturation, business metric이 baseline 대비 임계값을 넘는지로 사전에 정해야 합니다.",
      followups: [
        {
          q: "배포 중 rollback 기준을 즉석에서 정하면 왜 위험한가요?",
          answer: "장애 중에는 확인 편향과 시간 압박 때문에 기준이 흔들립니다. release 전에 metric, window, baseline, 담당자를 정해 두면 대응자가 감정이 아니라 합의된 조건으로 판단할 수 있습니다.",
        },
        {
          q: "rollback threshold에는 어떤 지표가 들어가나요?",
          answer: "새 release cohort의 5xx, p95/p99, dependency error, pool saturation, 핵심 business metric을 넣습니다. 전체 평균만 보면 canary나 특정 route의 회귀를 놓칠 수 있습니다.",
        },
        {
          q: "threshold를 넘었는데 rollback하지 않을 수 있나요?",
          answer: "데이터 migration이나 외부 side effect 때문에 rollback이 더 위험하면 feature flag 차단이나 forward fix를 택할 수 있습니다. 이 경우 영향 완화 계획과 repair path가 즉시 있어야 합니다.",
        },
      ],
      evidence: "rollback threshold, release dashboard, baseline metric",
    },
    {
      q: "Degraded mode는 어떤 기능부터 제한하나요?",
      answer: "degraded mode는 전체 실패 대신 일부 기능을 제한해 핵심 기능을 살리는 모드입니다. 추천, 통계, export를 끄고 주문/로그인 같은 critical path를 보호합니다.",
      followups: [
        {
          q: "degraded mode를 feature flag로만 보면 부족한 이유는 무엇인가요?",
          answer: "flag는 전환 수단일 뿐이고 어떤 기능을 끄면 어떤 SLO와 사용자 행동이 보호되는지 정책이 필요합니다. UI message, fallback data, 복구 조건, owner까지 정해져 있어야 합니다.",
        },
        {
          q: "어떤 기능은 degraded mode를 쓰면 안 되나요?",
          answer: "권한, 결제 금액, 재고처럼 오래된 값이나 부분 성공이 데이터 손상을 만들 수 있는 기능은 제한해야 합니다. 이 경우 read-only나 명확한 실패가 더 안전합니다.",
        },
        {
          q: "degraded mode 종료는 어떻게 판단하나요?",
          answer: "downstream error와 saturation이 baseline으로 돌아오고 backlog가 안정적으로 줄며 사용자 지표가 회복됐는지 봅니다. 단순히 provider health가 green이라고 바로 원복하지 않습니다.",
        },
      ],
      evidence: "degraded mode policy, feature flag, user notice",
    },
    {
      q: "Queue ordering은 어떤 단위로 보장하나요?",
      answer: "전역 순서는 비용이 커서 보통 aggregate 단위 순서만 보장합니다. partition key를 잘못 잡으면 같은 aggregate 이벤트가 흩어져 상태 전이가 꼬입니다.",
      followups: [
        {
          q: "전역 순서를 요구하면 어떤 비용이 생기나요?",
          answer: "병렬성이 줄고 hot partition이 생겨 처리량과 가용성이 떨어집니다. 실제로 필요한 순서가 주문, 계정, 문서 같은 aggregate 단위인지 먼저 좁혀야 합니다.",
        },
        {
          q: "partition key는 어떻게 고르나요?",
          answer: "같은 상태 전이를 공유하는 이벤트가 같은 partition으로 가도록 business key를 고릅니다. 너무 넓으면 병목이 되고 너무 좁으면 순서 보장이 깨지므로 skew와 ordering 요구를 같이 봅니다.",
        },
        {
          q: "늦게 도착한 이벤트는 어떻게 처리하나요?",
          answer: "sequence number나 version을 보고 stale event를 discard하거나 보정 이벤트로 처리합니다. 상태 전이 로그와 discard count를 남겨 누락이나 역전이 운영 중 보이게 해야 합니다.",
        },
      ],
      evidence: "partition key policy, sequence check, stale event discard",
    },
    {
      q: "Idempotent consumer는 무엇으로 중복을 막나요?",
      answer: "idempotent consumer는 message id나 business key를 inbox/processed table에 기록하고 side effect를 unique constraint와 transaction으로 보호합니다.",
      followups: [
        {
          q: "at-least-once delivery에서 idempotency가 왜 필수인가요?",
          answer: "broker는 장애와 retry 중 같은 message를 다시 전달할 수 있습니다. consumer가 중복 결제, 중복 이메일, 중복 상태 변경을 막지 못하면 정상적인 retry가 데이터 사고로 바뀝니다.",
        },
        {
          q: "processed table만 있으면 충분한가요?",
          answer: "processed 기록과 side effect가 같은 transaction 경계에 있어야 합니다. 따로 commit되면 side effect는 성공했는데 기록이 실패하거나 반대 상황이 생겨 재처리 때 중복이 발생할 수 있습니다.",
        },
        {
          q: "idempotency key는 어떤 값을 쓰나요?",
          answer: "broker offset보다 business event id나 command id처럼 재시도와 재발행에도 안정적인 값을 씁니다. key 범위와 보존 기간은 중복 가능 window와 감사 요구에 맞춥니다.",
        },
      ],
      evidence: "inbox table, processed unique key, duplicate delivery test",
    },
    {
      q: "PR 운영 지표는 어떤 변경에 포함해야 하나요?",
      answer: "새 기능 PR에는 성공/실패 count, latency, dependency call, business outcome, 주요 decision log가 포함되어야 합니다. 배포 후 볼 지표가 없으면 운영 준비가 부족합니다.",
      followups: [
        {
          q: "기능 PR에 metric spec이 없으면 어떤 문제가 생기나요?",
          answer: "배포 후 정상 동작을 error log나 사용자 제보로만 판단하게 됩니다. 성공률, latency, rejection reason, dependency error가 있어야 회귀와 고객 영향을 빠르게 볼 수 있습니다.",
        },
        {
          q: "log field는 어떤 기준으로 정하나요?",
          answer: "request id, actor/tenant의 비식별 key, decision reason, dependency result, error code처럼 재현과 영향 분석에 필요한 필드를 둡니다. PII와 token은 남기지 않도록 redaction을 같이 설계합니다.",
        },
        {
          q: "dashboard link가 PR에 필요한 이유는 무엇인가요?",
          answer: "리뷰어가 배포 후 어떤 화면으로 health를 볼지 확인할 수 있습니다. release marker와 새 지표가 대시보드에 연결되어 있어야 rollback threshold도 실제로 운영할 수 있습니다.",
        },
      ],
      evidence: "metric spec, log field list, dashboard link",
    },
    {
      q: "운영 경험이 부족할 때는 어떻게 답변을 구성하나요?",
      answer: "직접 운영 경험이 부족하면 원인 분해 순서와 확인 증거를 말해야 합니다. p99 상승이면 trace, pool, GC, lock, downstream 순서로 확인하겠다고 답합니다.",
      followups: [
        {
          q: "경험이 없다는 말을 어떻게 보완하나요?",
          answer: "직접 겪은 장애가 없다고 끝내지 말고, 어떤 지표를 먼저 보고 어떤 가설을 배제할지 말합니다. 예를 들어 p99 상승은 route 분리, trace sample, pool wait, GC pause, downstream latency 순서로 좁힙니다.",
        },
        {
          q: "모의 장애 자료로도 답변 근거를 만들 수 있나요?",
          answer: "가능합니다. load test, chaos drill, incident report 분석, runbook rehearsal에서 얻은 metric과 timeline을 근거로 말할 수 있습니다. 단 실제 운영 경험과 연습 경험은 구분해서 표현해야 합니다.",
        },
        {
          q: "운영 질문에서 모르는 부분은 어떻게 처리하나요?",
          answer: "모르는 제품명이나 도구 세부 옵션을 꾸미지 말고 계층별 진단 순서를 말합니다. 확인할 로그, 지표, readback 명령, rollback 조건을 제시하면 실무 대응 사고를 보여줄 수 있습니다.",
        },
      ],
      evidence: "triage sequence, evidence checklist, practice incident packet",
    },
  ],
  "engineering-platform-tools-qa": [
    {
      q: "Docker layer cache가 빌드 안정성에 어떤 영향을 주나요?",
      answer: "Dockerfile 명령 순서는 cache hit와 build time을 좌우합니다. dependency install은 lockfile 기준으로 먼저 두고 자주 바뀌는 source copy는 뒤에 두는 편이 효율적입니다.",
      followups: [
        {
          q: "COPY 순서를 바꾸면 무엇을 확인해야 하나요?",
          answer: "lockfile만 바뀌었는지, source 변경이 dependency install layer를 무효화하지 않는지 확인합니다. 빌드 로그의 cache hit와 최종 image digest를 비교해 속도 개선이 재현성을 해치지 않았는지 봅니다.",
        },
        {
          q: "cache hit가 항상 좋은 신호인가요?",
          answer: "아닙니다. stale dependency나 잘못된 cache key가 남으면 보안 패치와 generated artifact가 반영되지 않을 수 있습니다. lockfile hash, base image digest, build arg 변경이 cache invalidation에 들어가는지 확인해야 합니다.",
        },
        {
          q: "빌드 시간이 갑자기 늘면 어디서 시작하나요?",
          answer: "최근 Dockerfile diff, dependency download log, cache restore 실패, registry latency, base image pull 시간을 나눠 봅니다. 같은 commit을 clean build와 cached build로 비교해 어느 layer부터 miss가 시작됐는지 증거를 남깁니다.",
        },
      ],
      evidence: "Dockerfile layer order, build time, cache hit log",
    },
    {
      q: "Multi-stage build는 무엇을 줄이고 무엇을 남겨야 하나요?",
      answer: "multi-stage build는 build tool과 source를 runtime image에서 제거해 이미지 크기와 공격 표면을 줄입니다. runtime에는 실행 artifact와 필요한 runtime dependency만 남겨야 합니다.",
      followups: [
        {
          q: "runtime image에 build tool이 남으면 어떤 위험이 있나요?",
          answer: "컴파일러, 패키지 매니저, source가 남으면 취약점 표면과 secret 노출 가능성이 커집니다. image package list와 vulnerability scan을 비교해 runtime에 필요한 파일만 남았는지 확인합니다.",
        },
        {
          q: "stage 간 복사에서 무엇을 검증하나요?",
          answer: "build stage의 산출물 경로, checksum, owner, permission, entrypoint가 runtime stage에 맞게 복사됐는지 봅니다. 잘못된 wildcard copy는 test fixture나 secret 파일을 함께 옮길 수 있어 최종 image 파일 목록을 확인해야 합니다.",
        },
        {
          q: "이미지 크기만 줄이면 충분한가요?",
          answer: "크기는 단서일 뿐입니다. 불필요한 shell, package manager, CA bundle 누락, non-root 실행 여부, CVE 수, startup 동작을 함께 봐야 운영 위험을 판단할 수 있습니다.",
        },
      ],
      evidence: "image size diff, runtime package list, vulnerability scan",
    },
    {
      q: "Container healthcheck는 어떤 상태를 구분해야 하나요?",
      answer: "container healthcheck는 process 생존과 request 처리 준비 상태를 구분해야 합니다. liveness와 readiness를 섞으면 restart storm이나 잘못된 traffic routing이 생깁니다.",
      followups: [
        {
          q: "healthcheck가 너무 엄격하면 어떤 일이 생기나요?",
          answer: "일시적 downstream 지연이 곧바로 재시작으로 이어져 warming과 traffic loss가 반복될 수 있습니다. failure threshold, timeout, startup grace period, dependency check 범위를 조정하고 event log로 재시작 원인을 검증합니다.",
        },
        {
          q: "readiness에는 어떤 검사를 넣나요?",
          answer: "트래픽을 처리하는 데 필요한 config load, DB 연결 가능성, migration 완료, 필수 dependency 상태를 넣되 과도한 외부 호출은 피합니다. readiness 실패 시 load balancer에서 제외되는지 endpoint와 routing 상태를 함께 확인합니다.",
        },
        {
          q: "liveness에는 무엇을 넣지 않는 편이 안전한가요?",
          answer: "일시적인 DB 장애나 외부 API 장애처럼 재시작으로 해결되지 않는 조건은 liveness에 넣지 않는 편이 안전합니다. 프로세스 deadlock이나 event loop 정지처럼 재시작이 의미 있는 상태를 검출하는 데 집중합니다.",
        },
      ],
      evidence: "healthcheck command, readiness endpoint, restart count",
    },
    {
      q: "Docker volume은 어떤 상태를 컨테이너 밖에 두나요?",
      answer: "container는 ephemeral이므로 DB data, upload file, persistent state는 volume이나 외부 storage에 둬야 합니다. stateless app container에는 상태를 남기지 않는 편이 좋습니다.",
      followups: [
        {
          q: "volume mount를 바꿀 때 가장 위험한 점은 무엇인가요?",
          answer: "기존 데이터를 가리키던 경로가 빈 volume이나 다른 host path로 바뀌면 데이터가 사라진 것처럼 보일 수 있습니다. mount source, target, permission, container 재생성 후 파일 readback을 확인해야 합니다.",
        },
        {
          q: "backup이 있다는 말은 무엇으로 확인하나요?",
          answer: "백업 파일 존재보다 restore rehearsal, retention, 암호화, 소유자, 마지막 성공 시각을 확인해야 합니다. 실제로 새 volume에 복원해 앱이 읽는지 검증하지 않은 백업은 운영 증거로 부족합니다.",
        },
        {
          q: "stateless app container에 파일을 쓰면 어떤 문제가 생기나요?",
          answer: "재시작이나 scale-out 때 파일이 사라지거나 pod마다 다른 상태를 갖게 됩니다. 업로드, session, generated report는 object storage나 외부 store로 보내고, 임시 파일은 용량과 cleanup 정책을 둬야 합니다.",
        },
      ],
      evidence: "volume mount, backup policy, container recreation test",
    },
    {
      q: "Linux port 문제는 어떤 계층 순서로 좁히나요?",
      answer: "포트가 열려 있는데 접속이 안 되면 process listen, bind address, firewall, route, container mapping, reverse proxy를 순서대로 봅니다.",
      followups: [
        {
          q: "127.0.0.1 바인딩과 0.0.0.0 바인딩은 왜 중요한가요?",
          answer: "127.0.0.1은 로컬에서만 접속되고 외부 interface에서는 보이지 않습니다. `ss` 출력의 local address와 container port mapping, host firewall을 함께 확인해 앱이 어느 경계에서 듣는지 봅니다.",
        },
        {
          q: "포트가 listen 중인데 연결이 실패하면 다음은 무엇인가요?",
          answer: "firewall, security group, route, NAT, proxy upstream 설정을 차례로 봅니다. host 내부 curl, 같은 subnet curl, 외부 curl 결과를 나눠 어느 network hop에서 막히는지 확인합니다.",
        },
        {
          q: "컨테이너 port mapping은 어떻게 검증하나요?",
          answer: "container 내부 listen port, Docker publish mapping, host bind address, reverse proxy upstream port를 맞춥니다. `docker inspect`와 host `ss` 결과, 실제 curl 응답의 request id를 연결해 traffic 경로를 확인합니다.",
        },
      ],
      evidence: "ss/lsof output, firewall rule, route, curl result",
    },
    {
      q: "Disk full 장애는 어떤 실패로 번지나요?",
      answer: "disk full은 log write 실패, DB WAL/write 실패, temp file 실패, image pull 실패로 이어질 수 있습니다. inode 고갈도 별도 장애 원인이 됩니다.",
      followups: [
        {
          q: "df가 충분한데 write가 실패하면 무엇을 보나요?",
          answer: "inode 고갈, quota, read-only remount, permission, 특정 mount point의 여유 공간을 확인합니다. `df -h`만 보지 말고 `df -i`, mount, application error path를 함께 봐야 합니다.",
        },
        {
          q: "로그가 disk를 채우면 어떻게 조치하나요?",
          answer: "먼저 큰 파일과 증가 속도를 확인하고 안전한 rotate나 truncate 절차를 적용합니다. 파일 삭제만 하면 열린 file descriptor 때문에 공간이 바로 회수되지 않을 수 있어 process와 disk readback으로 회수 여부를 확인해야 합니다.",
        },
        {
          q: "DB disk full은 왜 더 조심해야 하나요?",
          answer: "WAL, checkpoint, temp file 실패가 데이터 정합성과 복구 시간에 영향을 줄 수 있습니다. DB 로그, replication lag, free space, backup 상태를 확인하고 임의 삭제 대신 DB별 권장 절차로 공간을 확보해야 합니다.",
        },
      ],
      evidence: "df/du/inode check, log rotation config, DB disk alert",
    },
    {
      q: "Process가 살아 있는데 지연이 큰 경우 무엇을 보나요?",
      answer: "process가 살아 있어도 thread pool, DB pool, external call 대기 때문에 사용자는 장애를 겪을 수 있습니다. health, CPU, thread dump, socket state, log timestamp를 함께 봐야 합니다.",
      followups: [
        {
          q: "CPU가 낮으면 앱은 정상이라고 봐도 되나요?",
          answer: "아닙니다. thread가 DB connection, lock, network IO를 기다리면 CPU는 낮고 latency는 높을 수 있습니다. thread dump, pool metric, socket state, request duration을 함께 봅니다.",
        },
        {
          q: "thread dump에서는 어떤 단서를 찾나요?",
          answer: "BLOCKED lock owner, WAITING 위치, DB driver 호출, HTTP client 호출, pool acquire stack을 봅니다. 단일 dump보다 짧은 간격의 여러 dump를 비교해야 같은 지점에 멈춰 있는지 알 수 있습니다.",
        },
        {
          q: "health endpoint가 정상인데 사용자가 느리면 어떻게 하나요?",
          answer: "health 경로가 실제 사용자 경로와 같은 dependency를 쓰는지 확인합니다. access log의 request time, APM span, DB slow query, upstream timeout을 request id로 묶어 병목 계층을 좁힙니다.",
        },
      ],
      evidence: "ps/top/thread dump, health result, access log",
    },
    {
      q: "Header forwarding은 어디까지 신뢰할 수 있나요?",
      answer: "X-Forwarded-For, X-Forwarded-Proto, Host는 redirect, audit, rate limit, auth 판단에 쓰일 수 있습니다. trusted proxy 경계 밖의 header는 신뢰하면 안 됩니다.",
      followups: [
        {
          q: "Host header가 잘못 전달되면 어떤 문제가 생기나요?",
          answer: "redirect URL, absolute link, tenant routing, callback 검증이 잘못될 수 있습니다. proxy의 Host 전달 정책과 앱의 allowed host 설정을 확인하고 변조 요청으로 차단 여부를 검증합니다.",
        },
        {
          q: "X-Forwarded-Proto가 틀리면 어떤 증상이 나오나요?",
          answer: "앱이 HTTP로 인식해 secure cookie, redirect, callback URL을 잘못 만들 수 있습니다. TLS 종료 지점과 proxy_set_header 설정, 앱 trusted proxy 설정을 맞추고 실제 응답 header로 확인합니다.",
        },
        {
          q: "client IP 기반 제한은 어떻게 안전하게 적용하나요?",
          answer: "마지막 trusted proxy가 client IP를 정규화해 전달하고 앱은 trusted proxy 목록 안에서만 header를 읽어야 합니다. 직접 header를 위조한 요청이 rate limit이나 audit을 우회하지 못하는지 테스트합니다.",
        },
      ],
      evidence: "proxy_set_header config, trusted proxy policy, audit IP test",
    },
    {
      q: "TLS 인증서 문제는 어떤 항목을 확인하나요?",
      answer: "TLS 문제는 chain, expiry, SAN, SNI, intermediate CA, client trust store를 확인합니다. 서버 인증서가 있어도 SNI mismatch나 chain 누락으로 실패할 수 있습니다.",
      followups: [
        {
          q: "브라우저는 되는데 특정 client만 실패하면 무엇을 보나요?",
          answer: "client trust store, TLS version, cipher, SNI 지원, intermediate CA 포함 여부를 확인합니다. `openssl s_client` 결과와 client error를 비교해 서버 chain 문제인지 client 신뢰 저장소 문제인지 나눕니다.",
        },
        {
          q: "인증서 교체 후 무엇을 readback하나요?",
          answer: "실제 endpoint의 served certificate serial, expiry, SAN, chain, SNI별 결과를 확인합니다. 파일 교체만 성공해도 load balancer나 NGINX reload가 안 됐으면 이전 인증서가 계속 나갈 수 있습니다.",
        },
        {
          q: "SAN mismatch는 왜 위험한가요?",
          answer: "인증서가 신뢰된 CA에서 발급됐어도 요청 host가 SAN에 없으면 client가 연결을 거부합니다. wildcard 범위와 내부 도메인, public 도메인을 구분해 배포 전 host별 검증을 해야 합니다.",
        },
      ],
      evidence: "openssl s_client, cert expiry, SAN list, client error",
    },
    {
      q: "Artifact와 deploy를 왜 분리하나요?",
      answer: "빌드 산출물을 한 번 만들고 여러 환경에 같은 artifact를 배포해야 재현성이 생깁니다. 환경별 재빌드는 환경 차이와 artifact 차이를 섞습니다.",
      followups: [
        {
          q: "환경별 재빌드는 어떤 사고를 만들 수 있나요?",
          answer: "stage에서 검증한 코드와 prod에 올라간 코드가 dependency, build arg, base image 차이로 달라질 수 있습니다. promotion 방식으로 같은 digest를 옮기고 환경값은 runtime config로만 바꿔야 합니다.",
        },
        {
          q: "deploy metadata에는 무엇이 들어가야 하나요?",
          answer: "artifact digest, commit sha, build id, config version, migration version, 배포자와 시간, rollback 대상이 들어가야 합니다. 장애 시 운영 중인 인스턴스에서 이 값을 readback해 release record와 맞춥니다.",
        },
        {
          q: "같은 artifact인지 어떻게 증명하나요?",
          answer: "registry digest나 checksum을 기준으로 stage와 prod 실행 상태를 비교합니다. tag 문자열만 같아서는 부족하고, runtime에서 실제 image id나 jar checksum을 조회해 기록과 일치하는지 확인해야 합니다.",
        },
      ],
      evidence: "artifact digest, pipeline stages, deploy metadata",
    },
    {
      q: "Secret scope는 환경별로 어떻게 나누나요?",
      answer: "dev, stage, prod secret은 분리하고 최소 권한으로 접근해야 합니다. prod secret이 dev artifact, CI log, local env에 섞이면 사고 범위가 커집니다.",
      followups: [
        {
          q: "prod secret이 CI log에 찍혔으면 무엇부터 하나요?",
          answer: "해당 secret을 폐기하고 새 값으로 rotation한 뒤 log 접근자와 노출 시간을 확인합니다. log redaction 수정은 필요하지만 이미 노출된 값은 신뢰할 수 없으므로 audit과 재발 방지까지 닫아야 합니다.",
        },
        {
          q: "환경별 secret 분리는 무엇으로 확인하나요?",
          answer: "secret manager path, IAM policy, deployment namespace, runtime secret version을 비교합니다. stage pod에서 prod endpoint나 prod credential이 보이지 않는지 redacted readback과 access audit으로 검증합니다.",
        },
        {
          q: "최소 권한 secret은 어떻게 설계하나요?",
          answer: "서비스별로 필요한 resource와 operation만 허용하고 batch, admin, read-only credential을 분리합니다. 장애 대응 편의를 위해 wildcard 권한을 주면 유출 시 blast radius가 커지므로 접근 로그와 권한 matrix를 함께 관리합니다.",
        },
      ],
      evidence: "secret scope matrix, access audit, redacted log",
    },
    {
      q: "NGINX access log는 proxy와 app 문제를 어떻게 나누나요?",
      answer: "NGINX access log에서는 status, request time, upstream response time, upstream status, bytes, request id를 봅니다. proxy 문제와 app 문제를 분리하는 증거입니다.",
      followups: [
        {
          q: "request time과 upstream response time 차이는 무엇을 말하나요?",
          answer: "request time은 client와 NGINX 사이까지 포함하고 upstream response time은 NGINX가 앱 응답을 기다린 시간입니다. 차이가 크면 client upload, buffering, network, TLS 구간을 의심하고 둘 다 크면 앱이나 upstream dependency를 봅니다.",
        },
        {
          q: "upstream status가 비어 있으면 무엇을 의미하나요?",
          answer: "요청이 upstream까지 가지 않았을 수 있습니다. NGINX rewrite, access control, body size, TLS, static file 처리, CDN cache 여부를 확인하고 error log와 location match 결과를 같이 봅니다.",
        },
        {
          q: "request id는 어떻게 활용하나요?",
          answer: "NGINX, 앱, downstream log에 같은 id를 전달해 한 요청의 경로를 묶습니다. id가 끊기면 proxy header 설정이나 앱 middleware를 확인하고, 같은 id로 status와 latency가 일치하는지 샘플링합니다.",
        },
      ],
      evidence: "access log format, upstream timing, request id",
    },
    {
      q: "Readback 검증은 왜 명령 성공과 다르게 보나요?",
      answer: "명령 실행 성공과 실제 상태 변경 성공은 다릅니다. 설정 적용, 배포, 권한 변경 후에는 조회 명령으로 원하는 상태가 되었는지 확인해야 합니다.",
      followups: [
        {
          q: "설정 적용 후 어떤 readback을 하나요?",
          answer: "파일 내용, service reload 상태, runtime config endpoint, process env, 실제 요청 결과 중 변경 목적과 연결된 항목을 확인합니다. 저장 명령이 성공해도 프로세스가 reload하지 않았으면 운영 상태는 바뀌지 않습니다.",
        },
        {
          q: "권한 변경은 어떻게 검증하나요?",
          answer: "권한 목록 조회와 실제 허용/거부 동작을 둘 다 확인합니다. admin 계정으로만 성공을 확인하면 사용자 권한 문제가 남을 수 있으므로 대상 role로 readback하고 audit log에 남는지 봅니다.",
        },
        {
          q: "readback 결과가 기대와 다르면 어떻게 하나요?",
          answer: "즉시 추가 변경을 쌓기보다 적용 대상, namespace, cache, reload, replica별 상태를 확인합니다. 일부 replica만 바뀐 상태에서 성공으로 닫으면 intermittent 장애가 생길 수 있습니다.",
        },
      ],
      evidence: "command log, readback output, expected state",
    },
    {
      q: "Config drift는 어떻게 발견하고 회수하나요?",
      answer: "config drift는 git/IaC 상태와 runtime 상태가 달라지는 문제입니다. state, runtime readback, checksum, periodic audit로 탐지하고 수동 변경은 PR로 회수해야 합니다.",
      followups: [
        {
          q: "drift가 생겼는지 무엇으로 판단하나요?",
          answer: "Git/IaC desired state와 runtime readback, config checksum, deployment annotation을 비교합니다. 사람의 기억이나 최근 채팅보다 조회 가능한 상태와 변경 기록이 기준입니다.",
        },
        {
          q: "운영에서 맞춘 값을 그대로 두면 왜 위험한가요?",
          answer: "다음 배포나 autoscaling 때 Git의 오래된 값으로 되돌아갈 수 있고 새 replica에는 적용되지 않을 수 있습니다. 임시 값은 ticket에 영향과 만료 시간을 남기고 PR로 회수하거나 제거해야 합니다.",
        },
        {
          q: "IaC plan은 언제 신뢰하기 어렵나요?",
          answer: "provider state가 오래됐거나 외부에서 직접 바꾼 리소스가 refresh되지 않으면 plan이 실제와 다를 수 있습니다. 변경 전 refresh, runtime 조회, critical 리소스의 수동 readback을 함께 봅니다.",
        },
      ],
      evidence: "config checksum, drift report, IaC plan",
    },
    {
      q: "Blue-green과 canary는 어떤 배포 위험을 줄이나요?",
      answer: "blue-green은 두 환경을 전환해 빠른 rollback이 쉽고 canary는 일부 traffic으로 새 버전을 검증합니다. canary는 segment coverage와 metric 비교가 중요합니다.",
      followups: [
        {
          q: "blue-green 전환 전 무엇을 확인하나요?",
          answer: "green 환경의 artifact digest, config version, migration 호환성, health, smoke test, rollback route를 확인합니다. DNS나 load balancer 전환 후에는 실제 traffic이 green으로 가는지 access log로 readback합니다.",
        },
        {
          q: "canary 비율만 보면 왜 부족한가요?",
          answer: "1% traffic이 핵심 기능이나 특정 tenant를 포함하지 않을 수 있습니다. canary segment, error budget, latency percentile, business metric, request sample을 기존 버전과 같은 조건에서 비교해야 합니다.",
        },
        {
          q: "배포 전략을 고를 때 migration은 어떻게 고려하나요?",
          answer: "양쪽 버전이 같은 schema를 읽고 쓸 수 있는지 봅니다. destructive migration이 먼저 들어가면 blue-green rollback이 깨지므로 expand-contract와 feature flag로 version 호환 구간을 만들어야 합니다.",
        },
      ],
      evidence: "deployment strategy ADR, traffic split, canary dashboard",
    },
    {
      q: "Rollback이 불가능한 배포는 어떻게 준비하나요?",
      answer: "data destructive change나 외부 side effect가 있으면 rollback보다 forward fix가 현실적일 수 있습니다. 사전에 feature flag, expand-contract migration, repair script를 준비해야 합니다.",
      followups: [
        {
          q: "rollback 대신 forward fix가 필요한 신호는 무엇인가요?",
          answer: "이미 데이터가 변환됐거나 외부 결제, 알림, third-party API 호출이 발생한 경우입니다. 이전 바이너리로 돌리면 더 큰 불일치가 생길 수 있어 영향 범위와 보정 스크립트를 먼저 확인합니다.",
        },
        {
          q: "destructive migration 전에는 무엇을 남기나요?",
          answer: "백업, affected row count, dry-run 결과, stop point, 복구 쿼리, owner 승인을 남깁니다. 실제 적용 후에는 migration table과 샘플 데이터 readback으로 예상 범위 안에서 끝났는지 확인합니다.",
        },
        {
          q: "feature flag는 rollback을 어떻게 돕나요?",
          answer: "새 코드가 배포돼도 behavior를 끌 수 있어 바이너리 rollback 없이 영향 범위를 줄입니다. flag 기본값, 대상 segment, audit log, 즉시 readback 방법이 없으면 운영 중 안전장치로 쓰기 어렵습니다.",
        },
      ],
      evidence: "rollback assessment, forward fix plan, migration stop point",
    },
    {
      q: "로컬 개발환경 문서는 무엇을 재현 가능하게 해야 하나요?",
      answer: "좋은 로컬 문서는 clean install, dependency version, env var, seed data, 실행 명령, health check, 흔한 오류 해결책을 포함합니다.",
      followups: [
        {
          q: "clean install 검증은 어떻게 하나요?",
          answer: "기존 cache와 node_modules, local DB 상태에 기대지 않는 새 환경에서 실행합니다. 설치 로그, version 출력, seed 결과, health endpoint까지 기록해야 새 팀원이 같은 상태를 만들 수 있습니다.",
        },
        {
          q: "문서에 secret 값을 넣지 않고 어떻게 안내하나요?",
          answer: "secret 이름, 발급 위치, 필요한 권한, local용 scope, redacted 예시만 제공합니다. 실제 값은 secret manager나 onboarding 절차에서 받게 하고, 문서에는 값 존재 여부를 확인하는 readback 명령을 둡니다.",
        },
        {
          q: "흔한 오류 해결책은 어떻게 유지하나요?",
          answer: "오류 메시지, 원인, 확인 명령, 복구 명령, 마지막 검증 날짜를 함께 적습니다. 단순히 캐시 삭제를 권하기보다 어떤 상태가 꼬였는지 확인하는 절차를 남겨 반복 장애를 줄입니다.",
        },
      ],
      evidence: "setup guide, clean install log, troubleshooting table",
    },
    {
      q: "도구 질문은 명령어보다 어떤 사고 과정을 보여야 하나요?",
      answer: "도구 질문은 명령어 암기가 아니라 계층별 진단 순서를 말해야 합니다. 예를 들어 502는 proxy log, upstream status, app log, timeout config, request id로 좁힙니다.",
      followups: [
        {
          q: "명령어를 모르면 답변이 불가능한가요?",
          answer: "정확한 명령어를 일부 잊어도 계층 모델과 확인할 증거를 말할 수 있어야 합니다. 예를 들어 포트 문제는 listen, firewall, route, proxy, 앱 로그 순서로 좁히고 각 단계의 대표 출력이 무엇인지 설명합니다.",
        },
        {
          q: "운영 진단 답변에서 위험을 어떻게 다루나요?",
          answer: "증거 수집 명령과 상태 변경 명령을 구분하고, 변경 전 backup이나 dry-run, 적용 후 readback을 말해야 합니다. 장애 중에는 빠른 조치도 중요하지만 원인을 덮는 재시작이나 권한 완화의 부작용을 함께 언급합니다.",
        },
        {
          q: "경험이 없는 도구는 어떻게 답하나요?",
          answer: "아는 척하기보다 확인할 계층, 공식 문서나 runbook, staging 재현, peer review, rollback 조건을 제시합니다. 운영 도구는 추측으로 실행하면 위험하므로 read-only 확인부터 시작하는 태도가 중요합니다.",
        },
      ],
      evidence: "triage checklist, command output, layer model",
    },
  ],
  "engineering-java-spring-qa": [
    {
      topic: "Java Optional",
      q: "Java Optional은 어디까지 쓰는 것이 적절한가요?",
      answer: "Optional은 반환값에서 값 없음 가능성을 표현할 때 유용하지만 field, parameter, JPA entity property에 남용하면 serialization과 ORM 처리에 불편이 생깁니다.",
      followups: [
        {
          q: "JPA entity field에 Optional을 두면 왜 불편한가요?",
          answer: "Hibernate는 entity field를 실제 컬럼 값과 proxy/lazy loading 대상으로 다루는데 Optional wrapper는 mapping, dirty checking, reflection 기반 접근을 복잡하게 만듭니다. entity 내부는 nullable field로 두고 repository나 service 반환 contract에서 Optional을 쓰는 편이 명확합니다.",
        },
        {
          q: "Optional parameter는 왜 피하나요?",
          answer: "호출자가 Optional.empty를 만들어 넘겨야 해서 API가 장황해지고 null까지 들어오면 두 종류의 없음 상태를 처리해야 합니다. overload, command object, 명시 nullable 정책을 쓰고 null handling test로 계약을 고정합니다.",
        },
        {
          q: "Optional 반환은 어떤 증거로 검증하나요?",
          answer: "존재하지 않는 id 조회가 Optional.empty를 반환하고 controller에서 404나 domain error로 매핑되는지 테스트합니다. JSON serialization에 Optional wrapper가 노출되지 않는지도 API contract test로 확인합니다.",
        },
      ],
      evidence: "API return contract, null handling policy, serialization test",
    },
    {
      topic: "Java record",
      q: "Java record는 Spring/JPA 코드에서 어디에 맞나요?",
      answer: "record는 불변 data carrier, DTO, command object에 유용합니다. JPA entity처럼 proxy, lazy loading, no-arg constructor, mutable lifecycle이 필요한 객체에는 맞지 않습니다.",
      followups: [
        {
          q: "record DTO는 어떤 장점이 있나요?",
          answer: "생성자와 accessor가 값 계약을 분명히 만들고 불변이라 request/response DTO나 projection 결과를 안전하게 전달할 수 있습니다. Jackson binding과 validation annotation 적용을 API test로 확인해야 합니다.",
        },
        {
          q: "JPA entity를 record로 만들면 무엇이 깨지나요?",
          answer: "JPA entity는 no-arg constructor, identity lifecycle, lazy proxy, field 변경 추적이 필요합니다. record는 final field와 canonical constructor 중심이라 dirty checking과 proxy 생성 모델에 맞지 않습니다.",
        },
        {
          q: "record projection은 언제 조심해야 하나요?",
          answer: "constructor parameter 순서와 query select 순서가 어긋나면 런타임 오류나 잘못된 값 매핑이 생길 수 있습니다. repository projection test에서 실제 SQL 결과와 DTO field를 함께 검증합니다.",
        },
      ],
      evidence: "record DTO, immutability test, entity design note",
    },
    {
      topic: "Collection 선택",
      q: "Java collection은 어떤 기준으로 선택하나요?",
      answer: "collection은 순서, 중복 허용, 탐색 방식, 동시성 요구로 고릅니다. List, Set, Map, Queue는 각각 다른 불변식과 성능 특성을 표현합니다.",
      followups: [
        {
          q: "HashSet에 JPA entity를 넣을 때 무엇을 조심하나요?",
          answer: "hashCode가 id 할당 전후로 바뀌면 Set에서 찾거나 제거할 수 없게 됩니다. mutable field 기반 hashCode도 같은 문제가 있으므로 entity equality test로 persist 전후 collection 동작을 확인합니다.",
        },
        {
          q: "ConcurrentHashMap이면 동시성 문제가 끝나나요?",
          answer: "단일 map 연산은 안전하지만 여러 key를 함께 갱신하거나 DB 상태와 맞춰야 하는 invariant는 보장하지 않습니다. compute 같은 atomic API, transaction, DB constraint 중 어디서 규칙을 강제할지 정해야 합니다.",
        },
        {
          q: "List와 Set 선택이 SQL에도 영향을 주나요?",
          answer: "JPA collection mapping에서 List order column이나 Set equality 정책은 생성 SQL과 dirty checking에 영향을 줄 수 있습니다. association 변경 테스트에서 delete/insert SQL 수와 ordering 요구를 확인합니다.",
        },
      ],
      evidence: "collection choice note, complexity analysis, concurrency fixture",
    },
    {
      topic: "Exception hierarchy",
      q: "Exception hierarchy는 transaction과 API 오류에 어떻게 연결되나요?",
      answer: "exception hierarchy는 validation, business, dependency, system error를 분리해 API error code와 rollback 정책으로 연결해야 합니다.",
      followups: [
        {
          q: "도메인 예외와 시스템 예외를 왜 나누나요?",
          answer: "도메인 예외는 사용자가 수정 가능한 상태 충돌이나 정책 위반이고, 시스템 예외는 DB 장애나 외부 API 실패처럼 운영 대응이 필요한 경우가 많습니다. API status, alerting, rollback 정책이 달라지므로 error mapping test가 필요합니다.",
        },
        {
          q: "checked exception을 쓰면 rollback은 어떻게 되나요?",
          answer: "Spring 기본 transaction은 checked exception만으로 rollback하지 않습니다. checked domain exception을 선택했다면 rollbackFor를 명시하거나 변경 전 검증 구조로 만들고 commit 여부를 integration test로 확인합니다.",
        },
        {
          q: "예외 변환은 어디서 하는 것이 좋나요?",
          answer: "repository의 DataIntegrityViolationException은 service나 exception handler에서 domain error로 매핑하되 원인 SQL과 constraint 이름은 내부 로그에 남깁니다. 사용자 응답에는 안정적인 error code만 노출합니다.",
        },
      ],
      evidence: "exception map, error contract, rollback test",
    },
    {
      topic: "Spring Bean lifecycle",
      q: "Spring bean lifecycle을 왜 proxy 문제와 함께 봐야 하나요?",
      answer: "bean lifecycle은 dependency injection, post construct, proxy 생성, destruction 순서를 이해하기 위해 필요합니다. transactional proxy 문제도 lifecycle과 연결됩니다.",
      followups: [
        {
          q: "@PostConstruct에서 @Transactional을 기대하면 왜 위험한가요?",
          answer: "초기화 시점에는 proxy가 완전히 적용되기 전이거나 외부 proxy 호출이 아니어서 transaction advice가 걸리지 않을 수 있습니다. 초기 데이터 작업은 ApplicationRunner나 별도 bean 호출로 옮기고 transaction log를 확인합니다.",
        },
        {
          q: "BeanPostProcessor와 proxy는 어떤 관련이 있나요?",
          answer: "AOP proxy는 bean 생성 후 post processing 단계에서 만들어집니다. 주입된 객체가 원본인지 proxy인지에 따라 advice 적용이 달라질 수 있으므로 startup log나 AopUtils로 proxy 여부를 확인합니다.",
        },
        {
          q: "순환 참조는 lifecycle에서 왜 문제가 되나요?",
          answer: "미완성 bean이 조기 노출되면 proxy 적용 전 reference가 주입되거나 초기화 순서가 불안정해질 수 있습니다. constructor injection으로 순환을 드러내고 service 책임을 나누는 편이 안전합니다.",
        },
      ],
      evidence: "bean lifecycle log, proxy inspection, startup failure case",
    },
    {
      topic: "Configuration properties",
      q: "Spring configuration properties는 어떻게 검증해야 하나요?",
      answer: "type-safe configuration properties로 필수값을 검증하고 profile별 값을 분리하며 secret은 config file이 아니라 secret store/env로 주입해야 합니다.",
      followups: [
        {
          q: "필수 설정 누락은 언제 실패해야 하나요?",
          answer: "애플리케이션 시작 시점에 validation으로 실패해야 합니다. 기본값 때문에 잘못된 endpoint나 pool size로 뜨면 장애가 늦게 드러나므로 context load test에서 누락 profile을 검증합니다.",
        },
        {
          q: "secret 값을 로그에 남기지 않고 어떻게 확인하나요?",
          answer: "값 자체가 아니라 key 존재 여부, source, version, redacted length 정도만 readback합니다. actuator env 노출은 제한하고 startup config dump도 masking rule을 테스트해야 합니다.",
        },
        {
          q: "profile별 설정 차이는 어떻게 잡나요?",
          answer: "local, test, prod profile에서 DB dialect, pool, migration, timeout 값이 달라지는 지점을 표로 고정합니다. profile별 context load와 property binding test로 잘못된 override를 확인합니다.",
        },
      ],
      evidence: "ConfigurationProperties validation, redacted config dump, profile test",
    },
    {
      topic: "Spring MVC 요청 처리",
      q: "Spring MVC 요청 경로에서 filter, interceptor, controller는 어떻게 나뉘나요?",
      answer: "DispatcherServlet이 handler mapping으로 controller를 찾고 argument resolver와 message converter가 입력과 출력을 처리합니다. filter, interceptor, exception handler 위치를 구분해야 합니다.",
      followups: [
        {
          q: "Filter와 Interceptor는 어디서 차이가 나나요?",
          answer: "Filter는 Servlet 앞단에서 동작해 보안, CORS, encoding처럼 Spring MVC 밖 요청도 다룰 수 있습니다. Interceptor는 handler mapping 이후라 controller 정보에 접근할 수 있고, 둘의 순서는 request log로 확인합니다.",
        },
        {
          q: "ArgumentResolver 문제는 어떻게 추적하나요?",
          answer: "controller parameter binding이 실패하면 resolver 선택, converter, validation 순서를 봅니다. 실패한 request body, content-type, binding error log를 남기고 WebMvcTest로 재현합니다.",
        },
        {
          q: "ExceptionHandler는 transaction과 어떤 관련이 있나요?",
          answer: "controller advice가 응답을 만들더라도 service transactional method에서 예외가 밖으로 전파됐는지가 rollback을 좌우합니다. service에서 예외를 삼키면 handler까지 오지 않고 commit될 수 있어 rollback test가 필요합니다.",
        },
      ],
      evidence: "request lifecycle diagram, filter/interceptor order, exception mapping",
    },
    {
      topic: "Spring Security filter chain",
      q: "Spring Security filter chain은 어떤 실패 조건을 확인해야 하나요?",
      answer: "security filter chain은 인증, CORS, CSRF, session, authorization 순서를 결정합니다. matcher와 filter 순서를 잘못 잡으면 preflight나 error path에서 보안 동작이 달라집니다.",
      followups: [
        {
          q: "request matcher 순서가 왜 중요한가요?",
          answer: "먼저 매칭된 security chain이나 rule이 적용되므로 넓은 permitAll이 앞에 있으면 보호 경로가 열릴 수 있습니다. Security debug log와 endpoint별 authorization test로 실제 매칭을 확인합니다.",
        },
        {
          q: "CORS preflight가 인증에서 막히면 어떻게 보이나요?",
          answer: "브라우저는 실제 요청 전에 OPTIONS 요청이 실패해 API 호출 자체가 막힌 것처럼 보입니다. preflight는 필요한 origin/method/header만 허용하고 security filter 앞뒤 처리 순서를 MockMvc나 실제 브라우저 요청으로 확인합니다.",
        },
        {
          q: "SecurityContext는 thread와 어떤 관련이 있나요?",
          answer: "기본적으로 SecurityContext는 thread-local에 저장됩니다. async 실행이나 thread pool 전환 시 context가 사라지거나 잘못 전파될 수 있어 DelegatingSecurityContext 계열 사용과 cleanup test가 필요합니다.",
        },
      ],
      evidence: "security filter chain, request matcher test, auth debug log",
    },
    {
      topic: "Spring Data repository method",
      q: "Spring Data repository method 이름 query는 언제 한계가 오나요?",
      answer: "repository method 이름 query는 간단한 조건에는 좋지만 복잡한 fetch plan, pagination, lock, projection이 필요하면 JPQL, QueryDSL, specification을 고려해야 합니다.",
      followups: [
        {
          q: "method 이름 query에서 N+1은 어떻게 확인하나요?",
          answer: "이름으로 생성된 query는 fetch plan을 자동으로 해결하지 않습니다. 연관 접근이 있는 응답이라면 Hibernate statistics나 query count assertion으로 추가 select를 확인하고 EntityGraph나 DTO query를 붙입니다.",
        },
        {
          q: "lock이 필요하면 method 이름만으로 충분한가요?",
          answer: "@Lock을 붙일 수는 있지만 격리 수준, timeout, deadlock 가능성까지 함께 봐야 합니다. 동시 update 테스트에서 실제 SELECT FOR UPDATE SQL과 대기 시간을 확인합니다.",
        },
        {
          q: "복잡한 조건은 왜 QueryDSL 같은 도구를 쓰나요?",
          answer: "조건 조합, join, projection을 타입 안전하게 표현하고 generated SQL을 예측하기 쉽기 때문입니다. 다만 query가 복잡해질수록 실행 계획과 index 사용을 테스트 데이터로 검증해야 합니다.",
        },
      ],
      evidence: "repository query review, generated SQL, query count test",
    },
    {
      topic: "Entity lifecycle callback",
      q: "Entity lifecycle callback에는 어떤 로직을 넣어야 하나요?",
      answer: "entity callback은 audit timestamp 같은 단순 작업에는 유용하지만 외부 호출이나 복잡한 domain logic을 넣으면 transaction 경계와 테스트가 불투명해집니다.",
      followups: [
        {
          q: "@PrePersist에서 외부 API를 호출하면 왜 위험한가요?",
          answer: "flush 시점에 callback이 실행되므로 외부 API latency나 실패가 transaction commit 경로에 섞입니다. 재시도와 rollback 의미가 불명확해지므로 domain service나 event 처리로 분리하는 편이 안전합니다.",
        },
        {
          q: "audit timestamp는 callback에 둬도 되나요?",
          answer: "createdAt, updatedAt처럼 entity 자체의 단순한 값 채우기는 적합합니다. Clock을 주입하기 어렵다면 auditing infrastructure를 쓰고 시간 고정 테스트로 값을 검증합니다.",
        },
        {
          q: "callback 실행 시점은 어떻게 확인하나요?",
          answer: "persist 직후가 아니라 flush나 commit 전에 실행될 수 있습니다. SQL log와 callback log를 함께 찍어 dirty checking, flush, callback 순서를 integration test로 확인합니다.",
        },
      ],
      evidence: "entity callback review, audit timestamp test, side-effect check",
    },
    {
      topic: "1차 캐시와 2차 캐시",
      q: "JPA 1차 캐시와 2차 캐시는 무엇이 다르게 깨지나요?",
      answer: "1차 캐시는 persistence context 단위로 항상 존재하고 entity identity를 보장합니다. 2차 캐시는 선택 기능이며 stale data와 invalidation 정책이 중요합니다.",
      followups: [
        {
          q: "1차 캐시는 어떤 문제를 숨길 수 있나요?",
          answer: "같은 transaction에서 같은 id를 다시 조회하면 DB가 아니라 persistence context의 entity를 돌려줍니다. bulk update나 다른 transaction 변경을 바로 보려면 clear/refresh 후 조회하는 테스트가 필요합니다.",
        },
        {
          q: "2차 캐시는 언제 stale해지나요?",
          answer: "애플리케이션 밖에서 DB를 변경하거나 bulk update, cache invalidation 누락이 있으면 stale 값을 줄 수 있습니다. cache region 정책과 eviction 동작을 integration test와 cache metric으로 확인합니다.",
        },
        {
          q: "캐시를 켜기 전 무엇을 봐야 하나요?",
          answer: "읽기 비율, 데이터 변경 빈도, 정합성 요구, invalidation 비용을 먼저 봅니다. query가 느린 원인이 index나 N+1이면 캐시가 문제를 숨길 수 있어 SQL plan부터 확인합니다.",
        },
      ],
      evidence: "persistence context test, second-level cache config, stale fixture",
    },
    {
      topic: "Cascade와 orphanRemoval",
      q: "Cascade와 orphanRemoval은 aggregate 경계와 어떻게 연결되나요?",
      answer: "cascade는 parent 작업을 child에 전파하고 orphanRemoval은 parent collection에서 제거된 child를 삭제합니다. aggregate 소유 관계가 명확할 때만 써야 합니다.",
      followups: [
        {
          q: "CascadeType.REMOVE는 언제 위험한가요?",
          answer: "child가 다른 aggregate에서도 참조되거나 공유되는 데이터면 parent 삭제가 의도치 않은 대량 삭제로 이어질 수 있습니다. FK 관계와 delete SQL을 테스트하고 소유 관계가 명확한 경우에만 씁니다.",
        },
        {
          q: "orphanRemoval은 collection에서 빼기만 해도 삭제되나요?",
          answer: "managed parent의 collection에서 child가 제거되고 flush되면 delete가 발생합니다. detached entity merge나 양방향 관계 편의 메서드 누락에서는 기대와 다를 수 있어 association 변경 테스트가 필요합니다.",
        },
        {
          q: "DB cascade와 JPA cascade는 어떻게 다르나요?",
          answer: "DB cascade는 constraint가 DB에서 삭제를 전파하고, JPA cascade는 entity operation을 persistence context에서 전파합니다. 둘을 섞으면 SQL 순서와 cache 상태를 확인해야 합니다.",
        },
      ],
      evidence: "cascade mapping, orphan removal test, aggregate ownership",
    },
    {
      topic: "Fetch join과 pagination",
      q: "Fetch join과 pagination을 함께 쓸 때 무엇을 검증해야 하나요?",
      answer: "to-many fetch join은 row 중복 때문에 DB pagination과 entity pagination이 어긋날 수 있습니다. ID page 후 fetch query나 batch size를 고려합니다.",
      followups: [
        {
          q: "왜 parent 개수가 page size보다 줄어드나요?",
          answer: "DB limit은 join된 row에 적용되므로 child가 많은 parent가 여러 row를 차지합니다. Hibernate가 memory pagination 경고를 내는지 보고, parent id page query와 fetch query를 분리합니다.",
        },
        {
          q: "batch size는 어떤 대안인가요?",
          answer: "parent page는 정상적으로 가져오고 lazy association 초기화 시 id 묶음으로 select를 줄이는 방식입니다. fetch join보다 row 폭을 줄일 수 있지만 접근 패턴에 따라 query가 늦게 발생하므로 query count test가 필요합니다.",
        },
        {
          q: "distinct를 붙이면 해결되나요?",
          answer: "entity 중복 제거에는 도움이 될 수 있지만 DB pagination이 parent 기준으로 바뀌는 것은 아닙니다. 실행 SQL, row count, Hibernate warning을 확인해야 합니다.",
        },
      ],
      evidence: "pagination query log, duplicate row fixture, batch fetch config",
    },
    {
      topic: "Spring test slice",
      q: "Spring test slice는 어떤 신호를 검증할 때 쓰나요?",
      answer: "WebMvcTest, DataJpaTest 같은 test slice는 관심 계층만 띄워 빠르게 좁은 검증을 하기 위해 씁니다. 모든 테스트를 full context로 돌리면 느리고 원인 분리가 어렵습니다.",
      followups: [
        {
          q: "WebMvcTest에서 무엇을 믿을 수 있나요?",
          answer: "controller mapping, validation, serialization, exception handler 같은 MVC 경계는 잘 검증합니다. 실제 security chain, service transaction, DB constraint는 빠질 수 있어 필요한 bean과 filter 포함 여부를 명시해야 합니다.",
        },
        {
          q: "DataJpaTest에서 H2를 쓰면 무엇을 놓치나요?",
          answer: "운영 DB의 dialect, index, lock, isolation, constraint 이름 차이를 놓칠 수 있습니다. PostgreSQL 같은 운영 DB와 맞춘 Testcontainers test로 query와 migration을 검증하는 편이 안전합니다.",
        },
        {
          q: "full context test는 언제 필요하나요?",
          answer: "security, transaction, repository, messaging처럼 여러 계층 wiring과 proxy가 함께 동작해야 하는 흐름에 필요합니다. 대신 개수를 줄이고 실패 로그에서 context load 시간과 외부 dependency를 확인합니다.",
        },
      ],
      evidence: "test slice choice, context load time, integration test",
    },
    {
      topic: "Testcontainers",
      q: "Testcontainers는 어떤 Java/Spring 위험을 줄이나요?",
      answer: "Testcontainers는 실제 DB나 broker와 가까운 동작을 테스트해 dialect, transaction, index, constraint 차이를 잡습니다. H2나 mock은 운영 DB 차이를 숨길 수 있습니다.",
      followups: [
        {
          q: "H2 테스트가 통과해도 운영 DB에서 깨지는 예는 무엇인가요?",
          answer: "JSON type, timestamp precision, lock syntax, unique constraint 이름, pagination plan이 DB마다 다를 수 있습니다. migration과 repository query를 운영 DB container에서 실행해 차이를 잡습니다.",
        },
        {
          q: "컨테이너 테스트가 느리면 어떻게 줄이나요?",
          answer: "container reuse, suite 단위 공유, migration 최적화, slice test와의 분리를 봅니다. 느리다고 mock으로 모두 바꾸면 dialect와 transaction 차이를 잃으므로 핵심 DB 경로는 남깁니다.",
        },
        {
          q: "Testcontainers에서 transaction test는 무엇을 확인하나요?",
          answer: "실제 isolation, lock wait, deadlock, constraint violation timing을 확인합니다. 동시에 두 transaction을 열어 version conflict나 unique race가 운영 DB처럼 터지는지 검증합니다.",
        },
      ],
      evidence: "Testcontainers config, PostgreSQL integration test, migration test",
    },
    {
      topic: "Spring Actuator",
      q: "Spring Actuator는 관측성과 노출 위험을 어떻게 같이 보나요?",
      answer: "Actuator는 health, metrics, info, prometheus endpoint로 관측성을 제공하지만 env, heapdump 같은 민감 endpoint는 노출 범위를 제한해야 합니다.",
      followups: [
        {
          q: "health endpoint에는 무엇을 노출하나요?",
          answer: "외부 공개 health는 생존 여부 중심으로 제한하고, 내부 readiness는 DB, Redis, dependency 상태를 포함할 수 있습니다. 상세 오류와 endpoint 접근 권한은 security rule test로 확인합니다.",
        },
        {
          q: "metrics로 connection pool 문제를 어떻게 보나요?",
          answer: "Hikari active, idle, pending, timeout metric과 request latency를 함께 봅니다. thread dump의 pool acquire 대기와 metric spike가 같은 시간대인지 맞춰야 병목을 확인할 수 있습니다.",
        },
        {
          q: "env와 heapdump endpoint는 왜 조심하나요?",
          answer: "secret, token, 개인정보, 내부 class 구조가 노출될 수 있습니다. management endpoint exposure와 security matcher를 좁히고 인증 없는 접근 테스트로 막혀 있는지 확인합니다.",
        },
      ],
      evidence: "actuator exposure config, metrics scrape, security rule",
    },
    {
      topic: "Entity equals와 lazy loading",
      q: "Entity equals, hashCode, toString은 lazy loading과 어떻게 충돌하나요?",
      answer: "equals, hashCode, toString이 lazy association을 건드리면 예상치 못한 query나 LazyInitializationException이 생깁니다. entity identity 비교는 association 접근 없이 안정적이어야 합니다.",
      followups: [
        {
          q: "toString에서 연관관계를 출력하면 무엇이 문제인가요?",
          answer: "로그 한 줄이 lazy association 초기화를 유발해 추가 SQL이나 LazyInitializationException을 만들 수 있고, 양방향 관계면 순환 출력도 생깁니다. entity 로그는 id와 핵심 scalar field로 제한합니다.",
        },
        {
          q: "equals에서 association을 비교하면 왜 위험한가요?",
          answer: "비교만 했는데 DB query가 나가거나 transaction 밖에서 실패할 수 있습니다. equality는 proxy와 lazy association을 건드리지 않는 id 또는 안정적인 business key 중심으로 검증합니다.",
        },
        {
          q: "이 문제는 어떻게 테스트하나요?",
          answer: "lazy association을 초기화하지 않은 proxy fixture에서 equals, hashCode, toString을 호출하고 SQL count가 늘지 않는지 확인합니다. transaction 밖 호출에서 예외가 나지 않는지도 봅니다.",
        },
      ],
      evidence: "entity equality test, lazy load SQL log, Lombok review",
    },
    {
      topic: "Java/Spring 답변의 중심",
      q: "Java/Spring 면접 답변은 어떤 내부 동작까지 연결해야 하나요?",
      answer: "Java/Spring 답변은 어노테이션 사용법보다 proxy, transaction, persistence context, thread, connection pool 같은 내부 동작과 깨지는 조건을 설명해야 합니다.",
      followups: [
        {
          q: "어노테이션 설명에서 proxy까지 어떻게 연결하나요?",
          answer: "@Transactional, @Async, @Cacheable은 대개 proxy 경계에서 동작합니다. 같은 클래스 내부 호출, private method, final class처럼 proxy가 개입하지 못하는 조건을 말하고 AOP proxy 확인이나 integration test 증거를 붙입니다.",
        },
        {
          q: "JPA 답변에서 persistence context를 왜 빼면 안 되나요?",
          answer: "dirty checking, lazy loading, 1차 캐시, flush timing은 persistence context 없이는 설명이 안 됩니다. SQL이 언제 나가고 rollback 후 DB 상태가 어떻게 되는지 log와 test로 연결해야 합니다.",
        },
        {
          q: "성능 답변에서 thread와 connection pool을 어떻게 묶나요?",
          answer: "요청 thread가 많아도 DB connection이 부족하면 처리량 대신 대기만 늘어납니다. thread dump, Hikari metric, latency histogram을 함께 보고 어떤 pool이 먼저 포화되는지 설명합니다.",
        },
      ],
      evidence: "proxy trace, transaction log, SQL log, JFR/thread dump",
    },
  ],
};

for (const page of pages) {
  page.questions.push(...(coverageQuestionsByPageId[page.id] ?? []));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderQuestion(question, index) {
  const code = `Q${String(index + 1).padStart(2, "0")}`;
  const followupRows = question.followups.map((followup) => {
    if (typeof followup === "string") {
      throw new Error(`String follow-up is not allowed for ${question.q}: ${followup}`);
    }

    if (!followup?.q || !followup?.answer) {
      throw new Error(`Invalid follow-up for ${question.q}`);
    }

    return `<tr><td>${escapeHtml(followup.q)}</td><td>${escapeHtml(followup.answer)}</td></tr>`;
  });

  return `<section id="qa-${index + 1}">
<div class="ch-head"><span class="ch-code">${code}</span><h2>${escapeHtml(question.q)}</h2></div>
<p class="lede">${escapeHtml(question.answer)}</p>
<table>
<tr><th>꼬리질문</th><th>꼬리질문 답변</th></tr>
${followupRows.join("\n")}
</table>
<div class="semantic-card">
<span class="sc-label">TRAINING EVIDENCE</span>
${escapeHtml(question.evidence)}
</div>
<div class="callout gm">
<span class="co-label">답변 기준</span>
<p>30초 답변은 결론과 기준을 먼저 말하고, 90초 답변은 메커니즘, trade-off, 실패 신호, 테스트 또는 운영 증거까지 확장한다. 경험이 없으면 직접 경험처럼 말하지 말고 설계 지식과 검증 계획으로 경계를 분명히 한다.</p>
</div>
</section>`;
}

function renderPage(page) {
  const navLinks = [
    `<a href="#overview"><span class="code">GUIDE</span>훈련 방식</a>`,
    ...page.questions.map((q, index) => `<a href="#qa-${index + 1}"><span class="code">Q${String(index + 1).padStart(2, "0")}</span>${escapeHtml(q.q)}</a>`),
    `<a href="#drill"><span class="code">DRILL</span>꼬리질문 반복 훈련</a>`,
    `<a href="#rubric"><span class="code">RUBRIC</span>통과 기준</a>`,
  ].join("\n  ");

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
  <div class="nav-brand">BACKEND Q&amp;A</div>
  <div class="nav-title">${escapeHtml(page.title)}</div>
  ${navLinks}
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
<p class="lede">각 문항은 외워서 읽는 답이 아니라, 질문 의도를 파악하고 판단 기준을 말하는 훈련용입니다. 답변은 항상 결론, 메커니즘, trade-off, 실패 모드, 검증 증거 순서로 확장합니다.</p>
<div class="snippet-card"><code>answer_loop:
  1_conclusion: "질문에 대한 결론을 한 문장으로 말한다"
  2_mechanism: "내부 동작이나 시스템 경계를 설명한다"
  3_tradeoff: "얻는 것과 잃는 것을 나눈다"
  4_failure: "운영 중 깨지는 조건을 말한다"
  5_evidence: "테스트, 로그, 지표, 쿼리, ADR 중 하나를 증거로 든다"</code></div>
</section>

${page.questions.map(renderQuestion).join("\n\n")}

<section id="drill">
<div class="ch-head"><span class="ch-code">DRILL</span><h2>꼬리질문 반복 훈련</h2></div>
<table>
<tr><th>라운드</th><th>훈련 방식</th><th>실패 신호</th></tr>
<tr><td>1</td><td>각 문항을 30초 안에 결론 중심으로 답한다.</td><td>정의만 말하고 판단 기준이 없다.</td></tr>
<tr><td>2</td><td>꼬리질문 하나를 골라 90초 답변으로 확장한다.</td><td>프레임워크 이름은 나오지만 실패 모드가 없다.</td></tr>
<tr><td>3</td><td>답변마다 테스트, 로그, metric, query, ADR 중 하나를 증거로 붙인다.</td><td>말은 그럴듯하지만 검증 방법이 없다.</td></tr>
<tr><td>4</td><td>직접 경험과 설계 지식의 경계를 한 문장으로 밝힌다.</td><td>해보지 않은 운영을 직접 경험처럼 말한다.</td></tr>
</table>
</section>

<section id="rubric">
<div class="ch-head"><span class="ch-code">RUBRIC</span><h2>통과 기준</h2></div>
<div class="semantic-card">
<span class="sc-label">BACKEND QA TRAINING PACKET</span>
통과 답변은 핵심 결론, 내부 동작, trade-off, 실패 모드, 검증 증거를 모두 포함한다.<br>
보완 답변은 개념 정의는 맞지만 운영 중 깨지는 조건이나 테스트 기준이 빠진다.<br>
실패 답변은 기술명 나열, 복붙식 해결책, “상황에 따라 다릅니다” 이후 기준 없음으로 끝난다.
</div>
</section>

<footer>
${escapeHtml(page.title)} · BACKEND QUESTION TRAINING · GENERATED 2026-07<br>
PAIRING SOURCE : ${escapeHtml(page.source)} · USE : 외부 검증 전 예상 질문, 답변, 꼬리질문 훈련
</footer>
</main>
</div>
</body>
</html>
`;
}

await mkdir(outDir, { recursive: true });

for (const page of pages) {
  await writeFile(path.join(outDir, `${page.id}-handbook.html`), renderPage(page));
}

console.log(`generated ${pages.length} backend Q&A handbooks`);
