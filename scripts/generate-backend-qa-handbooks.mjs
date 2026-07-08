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
        followups: ["POST도 멱등하게 만들 수 있나요?", "validation과 DB constraint가 중복이면 왜 둘 다 필요한가요?", "중복 요청이 들어왔을 때 응답은 같아야 하나요?"],
        evidence: "API contract, idempotency table, unique constraint, concurrency test, audit event query",
      },
      {
        q: "트랜잭션 경계를 어디에 두는지 설명해보세요.",
        answer: "도메인 불변식이 함께 지켜져야 하는 최소 변경 묶음을 한 트랜잭션으로 둡니다. 외부 API 호출은 트랜잭션 안에 오래 붙잡아 두지 않고, outbox나 상태 전이 후 비동기 처리로 분리합니다.",
        followups: ["외부 결제 호출과 DB 저장을 어떻게 원자적으로 다루나요?", "rollbackFor를 남발하면 어떤 문제가 생기나요?", "읽기 전용 트랜잭션은 왜 쓰나요?"],
        evidence: "service method boundary, rollback test, outbox event, DB lock wait metric",
      },
      {
        q: "장애가 났을 때 traceId 하나로 어디까지 좁힐 수 있어야 하나요?",
        answer: "요청 진입, 인증/인가 결정, DB query, external call, async event 발행, response mapping까지 같은 correlation id로 연결되어야 합니다. 로그는 원인 확정, metric은 증상 감지, trace는 경로 분해에 씁니다.",
        followups: ["로그에 userId를 metric label로 넣으면 왜 위험한가요?", "p95는 정상인데 고객이 느리다고 하면 무엇을 보나요?", "장애 중에는 원인 분석과 복구 중 무엇이 먼저인가요?"],
        evidence: "trace sample, structured log fields, RED metric, SLO burn rate alert",
      },
      {
        q: "시니어 백엔드 리뷰에서 좋은 답변과 얕은 답변의 차이는 무엇인가요?",
        answer: "좋은 답변은 선택 기준, 실패 모드, 운영 증거, 롤백 경로까지 닫습니다. 얕은 답변은 프레임워크 사용법이나 성공 흐름만 설명하고, 중복 요청, 부분 실패, 권한 오류, 관측 지표를 뒤로 미룹니다.",
        followups: ["이 변경의 blast radius를 어떻게 줄이나요?", "어떤 테스트가 없으면 배포를 막아야 하나요?", "forward fix와 rollback 중 무엇을 고르나요?"],
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
        followups: ["401, 403, 404를 언제 구분하나요?", "목록 API와 상세 API의 인가 누락은 어떻게 다르게 나타나나요?", "관리자 권한은 role만 보면 충분한가요?"],
        evidence: "role matrix, resource ownership query, forbidden fixture, audit event",
      },
      {
        q: "Refresh token rotation의 함정은 무엇인가요?",
        answer: "탈취 탐지를 위해 rotation을 쓰지만, 모바일 재시도나 브라우저 탭 동시 요청이 race를 만들 수 있습니다. token family, grace window, reuse detection, device binding, revoke state를 같이 설계해야 합니다.",
        followups: ["재사용 탐지가 뜨면 전체 세션을 끊나요?", "access token을 localStorage에 두면 무엇이 위험한가요?", "로그아웃은 JWT에서 어떻게 처리하나요?"],
        evidence: "token lifecycle table, reuse detection log, expired token negative test",
      },
      {
        q: "Tenant isolation을 어떻게 검증하나요?",
        answer: "모든 요청에서 actor tenant와 resource tenant가 일치해야 한다는 invariant를 둡니다. client가 보낸 tenant id를 신뢰하지 않고, 서버 세션/토큰 claim과 DB predicate, row policy, audit log를 함께 확인합니다.",
        followups: ["export file id가 다른 tenant 것을 가리키면 어떻게 막나요?", "batch job에도 tenant scope가 필요한가요?", "존재 자체를 숨겨야 할 때 응답 코드는 무엇인가요?"],
        evidence: "foreign tenant fixture, cross-tenant negative test, audit query, tenant predicate review",
      },
      {
        q: "SSRF나 webhook replay 같은 abuse case는 어떻게 문서화하나요?",
        answer: "source, trust boundary, sink, impact, detection, mitigation 순서로 적습니다. SSRF는 URL fetch가 내부망이나 metadata endpoint에 닿는 경로를 막고, webhook replay는 event id ledger와 signature timestamp, idempotency constraint로 막습니다.",
        followups: ["URL blocklist만으로 SSRF를 막을 수 있나요?", "redirect 후 IP가 바뀌면 어떻게 하나요?", "webhook signature가 맞아도 왜 event id를 저장하나요?"],
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
        followups: ["공유 DB가 있으면 왜 독립 서비스라고 보기 어렵나요?", "팀 구조는 서비스 경계에 어떤 영향을 주나요?", "분리하지 않는 선택을 어떻게 정당화하나요?"],
        evidence: "SERVICE SPLIT READINESS GATE, dependency graph, owner map, SLO impact",
      },
      {
        q: "Bounded context는 테이블 기준으로 나누나요?",
        answer: "아니요. 언어, 불변식, 변경 이유, 생명주기 기준으로 나눕니다. 같은 주문이라는 단어도 결제, 물류, 정산에서 다른 의미를 가지면 다른 모델과 경계를 가져야 합니다.",
        followups: ["같은 단어가 다른 의미라는 걸 어떻게 발견하나요?", "anti-corruption layer는 언제 필요하나요?", "context 간 조회는 어떻게 처리하나요?"],
        evidence: "event storming note, domain glossary, change history, incident owner map",
      },
      {
        q: "이벤트 기반 아키텍처의 가장 큰 비용은 무엇인가요?",
        answer: "결과적 일관성, replay, ordering, schema evolution, 운영 관측 비용입니다. 발행자는 outbox와 schema validation을 갖추고, 소비자는 idempotent, replay-safe, unknown-field tolerant해야 합니다.",
        followups: ["이벤트 필드를 삭제하고 싶으면 어떻게 하나요?", "순서를 전역으로 보장해야 하나요?", "consumer lag가 사용자 경험에 보이면 어떻게 하나요?"],
        evidence: "event contract, outbox table, consumer lag dashboard, schema compatibility test",
      },
      {
        q: "ADR에는 무엇을 써야 하나요?",
        answer: "상태, 맥락, 결정, 결과, 거절한 대안, 재검토 조건을 짧게 씁니다. 좋은 ADR은 선택의 장점보다 포기한 것과 다시 바꿔야 할 신호를 분명히 남깁니다.",
        followups: ["ADR이 너무 많아지면 어떻게 관리하나요?", "결정이 틀렸다는 신호는 무엇인가요?", "아키텍처 리뷰에서 가장 먼저 보는 산출물은 무엇인가요?"],
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
        followups: ["EXPLAIN과 EXPLAIN ANALYZE의 차이는 무엇인가요?", "index가 있어도 seq scan을 할 수 있나요?", "N+1과 느린 단일 쿼리는 어떻게 구분하나요?"],
        evidence: "EXPLAIN ANALYZE, slow query log, pg_stat_statements, cardinality mismatch",
      },
      {
        q: "MVCC와 vacuum을 운영 관점에서 설명해보세요.",
        answer: "PostgreSQL은 업데이트 시 기존 row를 덮지 않고 새 버전을 만듭니다. 오래된 트랜잭션이 살아 있으면 dead tuple 회수가 늦어지고 bloat가 생기므로 vacuum lag, long transaction, table/index bloat를 봐야 합니다.",
        followups: ["long transaction이 왜 vacuum을 막나요?", "dead tuple이 많으면 어떤 증상이 생기나요?", "autovacuum을 무조건 세게 돌리면 되나요?"],
        evidence: "POSTGRESQL MVCC VACUUM OPERATING MODEL, bloat metric, long transaction query",
      },
      {
        q: "Read replica를 붙일 때 주의할 점은 무엇인가요?",
        answer: "replica는 읽기 확장 수단이지만 replication lag 때문에 read-your-writes가 깨질 수 있습니다. 방금 쓴 데이터, 권한 변경, 결제 상태는 primary나 session consistency 경로에서 읽어야 합니다.",
        followups: ["lag가 있을 때 사용자는 어떤 증상을 보나요?", "모든 읽기를 replica로 보내면 안 되는 이유는?", "failover 직후 무엇을 확인하나요?"],
        evidence: "REPLICATION LAG READ ROUTING POLICY, lag metric, primary-read route list",
      },
      {
        q: "Redis 장애가 DB 장애로 번지지 않게 하려면 무엇을 설계하나요?",
        answer: "cache stampede, hot key, memory eviction, failover gap을 전제로 TTL jitter, request coalescing, local cache, fallback budget, DB 보호 rate limit을 둡니다. Redis는 빠른 사본이지 정합성의 최종 방어선이 아닙니다.",
        followups: ["분산 락을 직접 구현하면 무엇이 위험한가요?", "TTL을 길게 하면 항상 좋은가요?", "캐시 miss 폭증을 어떻게 감지하나요?"],
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
        followups: ["평균 latency가 괜찮으면 장애가 아니라고 볼 수 있나요?", "pool saturation과 DB slow query를 어떻게 구분하나요?", "GC pause는 어떤 증거로 확인하나요?"],
        evidence: "P99 LATENCY DECOMPOSITION TABLE, JFR, thread dump, pg_stat_activity, trace span",
      },
      {
        q: "Retry는 언제 위험해지나요?",
        answer: "하류가 이미 포화된 상황에서 여러 계층이 동시에 재시도하면 retry amplification으로 장애를 키웁니다. retry budget, exponential backoff with jitter, timeout, circuit breaker를 같이 둬야 합니다.",
        followups: ["모든 5xx는 재시도해도 되나요?", "timeout은 client와 server 중 어디에 두나요?", "재시도해도 안전하려면 API가 무엇을 가져야 하나요?"],
        evidence: "retry count metric, circuit state, idempotency key, downstream SLO",
      },
      {
        q: "Consumer lag와 DLQ를 어떻게 운영하나요?",
        answer: "lag 증가는 생산 증가, 소비 실패, partition skew, downstream 지연으로 나눠 봅니다. DLQ는 독성 메시지를 격리하고, replay 전에는 idempotency와 dry-run count, 재처리 범위를 확인합니다.",
        followups: ["DLQ를 비우면 해결인가요?", "replay가 중복 부작용을 만들면 어떻게 하나요?", "worker를 늘리면 항상 좋아지나요?"],
        evidence: "CONSUMER LAG DLQ REPLAY RUNBOOK, consume rate, partition lag, replay fixture",
      },
      {
        q: "장애 대응에서 postmortem의 목적은 무엇인가요?",
        answer: "책임자를 찾는 것이 아니라 시스템이 사고를 허용한 조건을 찾아 재발 가능성을 줄이는 것입니다. impact, timeline, contributing factors, action item을 owner와 due date가 있는 형태로 남깁니다.",
        followups: ["root cause 하나만 찾으면 충분한가요?", "액션 아이템이 좋은지 어떻게 판단하나요?", "고객 커뮤니케이션은 언제 시작하나요?"],
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
        followups: ["build-time env와 runtime env를 왜 구분하나요?", "latest 태그가 왜 위험한가요?", "컨테이너가 재시작을 반복하면 무엇을 확인하나요?"],
        evidence: "image digest, Dockerfile review, container logs, exit code, env diff",
      },
      {
        q: "배포가 성공했는데 서비스가 깨졌다면 어떤 순서로 보나요?",
        answer: "배포 artifact, release id, health check, config/env, DB migration, dependency connectivity, error rate, rollback 조건을 순서대로 확인합니다. CI 성공은 런타임 성공의 충분조건이 아닙니다.",
        followups: ["readiness와 liveness를 왜 나누나요?", "migration 실패 시 rollback이 항상 가능한가요?", "canary에서 어떤 지표를 봐야 하나요?"],
        evidence: "deployment log, artifact hash, health probe, migration status, canary metric",
      },
      {
        q: "NGINX나 reverse proxy 문제를 어떻게 좁히나요?",
        answer: "DNS, TLS, routing, upstream health, header forwarding, timeout, body size limit, proxy buffering을 분리합니다. 502는 앱 문제일 수도 있고 upstream 연결, protocol, timeout 문제일 수도 있습니다.",
        followups: ["X-Forwarded-For를 왜 신뢰하면 안 되나요?", "idle timeout이 긴 요청에 어떤 영향을 주나요?", "CDN과 origin 중 어디서 막혔는지 어떻게 구분하나요?"],
        evidence: "access/error log, upstream status, curl -v, request id, proxy config diff",
      },
      {
        q: "운영 도구 문서가 좋은지 어떻게 판단하나요?",
        answer: "명령어 목록보다 전제 조건, 대상 환경, 성공/실패 판정, 되돌리기 절차가 있어야 합니다. 위험 명령은 dry-run과 readback 확인을 포함해야 합니다.",
        followups: ["로컬에서만 성공한 절차를 어떻게 팀 절차로 바꾸나요?", "환경변수 누락을 어떻게 빨리 찾나요?", "수동 조치 후 무엇을 기록해야 하나요?"],
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
        followups: ["private method에 @Transactional을 붙이면 어떻게 되나요?", "readOnly는 DB에 어떤 영향을 줄 수 있나요?", "REQUIRES_NEW는 언제 위험한가요?"],
        evidence: "SPRING TRANSACTION PROPAGATION DECISION, transaction log, integration test",
      },
      {
        q: "JPA dirty checking과 flush를 설명해보세요.",
        answer: "영속성 컨텍스트가 엔티티 스냅샷을 보관하고 변경을 감지해 flush 시 SQL을 생성합니다. flush는 commit 전에 query 실행, explicit flush, transaction commit 시 발생할 수 있고 DB commit과 같은 말은 아닙니다.",
        followups: ["flush 후 rollback하면 DB에는 어떻게 되나요?", "bulk update 후 영속성 컨텍스트가 왜 stale해지나요?", "open session in view는 왜 위험할 수 있나요?"],
        evidence: "JPA FLUSH DIRTY CHECKING MECHANISM, SQL log, persistence context test",
      },
      {
        q: "N+1 문제를 어떻게 발견하고 해결하나요?",
        answer: "목록 조회 후 각 엔티티의 연관을 lazy load하면서 추가 쿼리가 반복되는 문제입니다. query count test, SQL log, APM span으로 발견하고 fetch join, entity graph, batch size, DTO projection 중 요구에 맞게 고릅니다.",
        followups: ["fetch join을 항상 쓰면 되나요?", "pagination과 fetch join은 어떤 문제가 있나요?", "DTO projection은 언제 더 낫나요?"],
        evidence: "query count assertion, Hibernate statistics, fetch plan review",
      },
      {
        q: "JVM 메모리나 thread 문제를 어떻게 설명하나요?",
        answer: "heap, stack, metaspace, direct memory를 나누고, thread pool queue, blocking call, GC pause, allocation rate를 함께 봅니다. CPU가 낮아도 thread가 DB pool이나 lock에서 대기하면 latency가 커질 수 있습니다.",
        followups: ["OOM과 memory leak은 같은가요?", "thread dump에서 무엇을 보나요?", "GC 튜닝 전에 무엇을 먼저 확인하나요?"],
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
      followups: ["400과 422를 어떻게 구분하나요?", "에러 메시지에 내부 원인을 얼마나 노출하나요?", "retryable 필드는 언제 유용한가요?"],
      evidence: "error response schema, negative API test, client recovery path, trace id sample",
    },
    {
      q: "Idempotency key는 어디에 저장하고 어떤 응답을 돌려야 하나요?",
      answer: "idempotency key는 actor, endpoint, request fingerprint, response result와 함께 서버 저장소에 둡니다. 같은 key와 같은 payload는 저장된 결과를 재반환하고, 같은 key에 다른 payload가 오면 conflict로 막아야 합니다.",
      followups: ["idempotency 저장 TTL은 어떻게 정하나요?", "결제 요청에서 처리 중 상태를 어떻게 응답하나요?", "key만 같고 body가 다르면 왜 위험한가요?"],
      evidence: "idempotency ledger table, unique constraint, duplicate request integration test",
    },
    {
      q: "동시성 문제를 application lock으로 막으면 충분한가요?",
      answer: "단일 JVM 안에서는 일부 효과가 있지만, 서버가 여러 대면 application lock은 전역 정합성을 보장하지 못합니다. 최종 방어는 DB constraint, optimistic version, row lock, idempotency key처럼 공유 저장소가 강제하는 규칙이어야 합니다.",
      followups: ["synchronized가 왜 분산 환경에서 깨지나요?", "낙관적 락 충돌은 사용자에게 어떻게 보이나요?", "DB unique constraint와 비즈니스 검증은 어떻게 나누나요?"],
      evidence: "concurrent test, optimistic lock retry policy, DB unique violation mapping",
    },
    {
      q: "외부 API timeout을 어떻게 정하나요?",
      answer: "사용자 요청의 전체 latency budget에서 downstream 호출이 쓸 수 있는 시간을 역산합니다. connect timeout, read timeout, retry count, circuit breaker, fallback을 함께 정하고, timeout 이후 실제 처리 성공 가능성을 idempotency로 흡수합니다.",
      followups: ["timeout이 너무 길면 어떤 장애가 생기나요?", "client timeout 후 server가 성공하면 어떻게 수렴하나요?", "retry는 몇 번이 적절한가요?"],
      evidence: "latency budget table, HTTP client config, retry metric, circuit breaker state",
    },
    {
      q: "DTO, entity, domain model을 왜 분리하나요?",
      answer: "외부 API 계약, 영속성 구조, 도메인 불변식은 변경 이유가 다릅니다. Entity를 그대로 response로 내보내면 lazy loading, 순환 참조, 내부 필드 노출, API 호환성 문제가 생길 수 있습니다.",
      followups: ["항상 분리해야 하나요?", "작은 CRUD에서 과한 분리는 어떤 비용이 있나요?", "DTO projection은 언제 유리한가요?"],
      evidence: "response contract, serialization test, fetch plan, compatibility note",
    },
    {
      q: "Pagination을 offset 방식으로만 쓰면 어떤 문제가 생기나요?",
      answer: "offset은 뒤 페이지로 갈수록 DB가 건너뛸 row가 많아지고, 중간 삽입/삭제가 있으면 중복이나 누락이 생길 수 있습니다. 안정적 정렬 키가 있으면 cursor pagination을 고려하고, 정렬 조건과 index를 함께 설계합니다.",
      followups: ["cursor에는 어떤 값을 넣나요?", "정렬 기준이 여러 개면 어떻게 하나요?", "총 개수 count는 항상 제공해야 하나요?"],
      evidence: "pagination contract, index order, EXPLAIN plan, duplicate/missing fixture",
    },
    {
      q: "부분 실패가 생기는 기능을 어떻게 설계하나요?",
      answer: "부분 실패는 정상적인 운영 조건으로 보고 상태를 명시합니다. 전체 성공/실패만 두지 말고 pending, compensating, failed, retrying 같은 상태와 reconciliation job, 사용자 안내, 운영 알림을 함께 설계합니다.",
      followups: ["사용자에게 pending을 보여줘도 되나요?", "보상 트랜잭션은 rollback과 어떻게 다른가요?", "재처리 버튼은 누가 누를 수 있어야 하나요?"],
      evidence: "state machine, reconciliation query, retry job log, user-visible status contract",
    },
    {
      q: "백엔드 PR에서 반드시 남겨야 할 운영 증거는 무엇인가요?",
      answer: "변경 경로, 실패 응답, 테스트 결과, metric/log 필드, rollback 또는 feature flag 계획을 남겨야 합니다. 특히 상태 변경 기능은 배포 후 어떤 지표를 보고 멈출지까지 PR에 포함해야 합니다.",
      followups: ["작은 변경에도 dashboard가 필요한가요?", "rollback이 불가능한 DB 변경은 어떻게 하나요?", "로그 필드는 어느 정도가 적절한가요?"],
      evidence: "PR checklist, smoke test result, release health metric, rollback stop point",
    },
  ],
  "engineering-backend-auth-security-qa": [
    {
      q: "CSRF와 CORS는 같은 문제인가요?",
      answer: "아닙니다. CSRF는 브라우저가 쿠키를 자동 전송하는 특성을 악용해 사용자의 의도 없는 상태 변경을 유도하는 공격이고, CORS는 브라우저가 cross-origin JS 접근을 제한하는 정책입니다.",
      followups: ["SameSite=Lax면 CSRF가 완전히 해결되나요?", "Authorization header를 쓰면 CSRF 위험이 줄어드나요?", "CORS allow credentials는 왜 조심해야 하나요?"],
      evidence: "cookie matrix, CSRF negative test, CORS preflight response, SameSite policy",
    },
    {
      q: "JWT를 쓰면 서버 세션 저장소가 필요 없나요?",
      answer: "access token 검증 자체는 stateless일 수 있지만, 로그아웃, 강제 차단, refresh rotation, device 관리, 침해 대응을 하려면 서버 측 상태가 필요할 때가 많습니다. stateless와 통제 가능성 사이의 trade-off입니다.",
      followups: ["JWT 즉시 무효화는 어떻게 하나요?", "refresh token은 어디에 저장하나요?", "토큰 탈취를 어떻게 탐지하나요?"],
      evidence: "token lifecycle runbook, revoke table, refresh token family log",
    },
    {
      q: "비밀번호 저장은 bcrypt만 쓰면 충분한가요?",
      answer: "bcrypt, Argon2 같은 느린 해시와 salt는 기본이고, 계정 생명주기 전체가 중요합니다. rate limit, credential stuffing 탐지, MFA, 복구 플로우, 비밀번호 변경 후 세션 폐기까지 함께 설계해야 합니다.",
      followups: ["pepper는 언제 쓰나요?", "비밀번호 재설정 링크는 어떤 속성이 필요하나요?", "로그인 실패 제한은 사용자 경험과 어떻게 균형을 잡나요?"],
      evidence: "password policy, reset token TTL, login failure metric, session invalidation test",
    },
    {
      q: "RBAC, ABAC, ReBAC를 어떻게 구분하나요?",
      answer: "RBAC는 역할 기반, ABAC는 속성 기반, ReBAC는 관계 기반 인가입니다. 실무에서는 role만으로 부족한 경우가 많아 tenant, owner, department, resource state 같은 속성을 함께 봅니다.",
      followups: ["관리자면 모든 데이터를 봐도 되나요?", "권한 정책은 코드에 박아도 되나요?", "정책 변경은 어떻게 테스트하나요?"],
      evidence: "authorization decision table, policy test, admin audit event",
    },
    {
      q: "파일 다운로드나 export API에서 흔한 보안 실수는 무엇인가요?",
      answer: "file id나 signed URL만 확인하고 actor-resource tenant 관계를 다시 확인하지 않는 실수가 많습니다. export 생성자, tenant, 만료 시간, scope, 다운로드 audit를 모두 검증해야 합니다.",
      followups: ["signed URL이면 권한 체크를 생략해도 되나요?", "export 파일은 얼마나 보관하나요?", "대량 다운로드 이상 징후는 어떻게 잡나요?"],
      evidence: "export IDOR fixture, signed URL TTL, audit log, anomaly alert",
    },
    {
      q: "Webhook 보안은 signature만 검증하면 끝인가요?",
      answer: "signature는 출처 검증이고, replay 방지와 멱등 처리는 별도입니다. timestamp tolerance, event id ledger, payload schema, 처리 결과 저장, 재처리 정책까지 있어야 합니다.",
      followups: ["서명은 맞지만 같은 event가 두 번 오면요?", "provider가 재전송하면 어떻게 응답하나요?", "webhook 순서가 뒤섞이면 어떻게 하나요?"],
      evidence: "signature verification test, event ledger, idempotency constraint, replay fixture",
    },
    {
      q: "Audit log는 application log와 무엇이 다른가요?",
      answer: "application log는 디버깅 목적이고 audit log는 행위 증명 목적입니다. 누가, 언제, 어떤 권한으로, 어떤 자원에, 어떤 결정을 내렸는지 변조하기 어렵게 남겨야 합니다.",
      followups: ["audit log에 개인정보를 얼마나 넣나요?", "관리자가 audit log를 지우면 어떻게 하나요?", "감사 로그는 어떤 쿼리로 사고 범위를 잡나요?"],
      evidence: "append-only audit sink, actor/action/resource fields, tamper resistance policy",
    },
    {
      q: "Rate limit은 보안 기능인가요, 성능 기능인가요?",
      answer: "둘 다입니다. brute force, scraping, credential stuffing을 줄이는 보안 제어이면서, 하류 시스템을 보호하는 트래픽 제어입니다. actor 기준, IP 기준, tenant 기준, endpoint 비용 기준을 나눠야 합니다.",
      followups: ["NAT 환경에서 IP 기준 제한은 어떤 문제가 있나요?", "로그인 rate limit과 API rate limit은 어떻게 다르나요?", "Redis 장애 시 fail-open인가요 fail-closed인가요?"],
      evidence: "rate limit policy, Redis counter key design, abuse metric, block audit",
    },
  ],
  "engineering-backend-architecture-qa": [
    {
      q: "모듈러 모놀리스는 MSA보다 낮은 수준의 설계인가요?",
      answer: "아닙니다. 모듈러 모놀리스는 분산 운영 비용 없이 코드 경계를 강제하는 강한 선택입니다. 팀 규모, 배포 독립성, 장애 격리, 데이터 소유권 요구가 충분히 크지 않으면 더 합리적일 수 있습니다.",
      followups: ["모듈 경계는 어떻게 강제하나요?", "언제 모듈러 모놀리스가 한계에 닿나요?", "MSA로 갈 때 첫 분리 대상은 무엇인가요?"],
      evidence: "module dependency rule, change history, deploy conflict metric, ADR",
    },
    {
      q: "공유 라이브러리는 좋은 재사용인가요 위험한 결합인가요?",
      answer: "도메인 정책이 공유 라이브러리로 빠지면 여러 서비스가 같은 변경 압력에 묶입니다. 유틸, client, schema는 가능하지만 비즈니스 규칙 공유는 경계 침식을 의심해야 합니다.",
      followups: ["공통 DTO 패키지는 괜찮나요?", "버전 호환성은 어떻게 관리하나요?", "라이브러리 변경이 전체 배포를 강제하면 무엇이 문제인가요?"],
      evidence: "dependency graph, shared package changelog, consumer compatibility test",
    },
    {
      q: "CQRS는 언제 도입할 만한가요?",
      answer: "읽기와 쓰기의 모델, 성능 요구, 스케일 특성이 크게 다를 때 도입할 수 있습니다. 단순 CRUD에 쓰면 projection, 동기화, eventual consistency 비용만 늘어날 수 있습니다.",
      followups: ["조회 모델은 어떻게 갱신하나요?", "projection lag는 사용자에게 어떻게 보이나요?", "command model과 query model이 다르면 테스트는 어떻게 하나요?"],
      evidence: "read/write workload split, projection lag metric, reconciliation query",
    },
    {
      q: "이벤트 소싱은 audit log와 같은 건가요?",
      answer: "다릅니다. 이벤트 소싱은 상태의 원천을 이벤트로 두고 재생해 현재 상태를 만듭니다. audit log는 행위 증명이 목적이며, 기존 상태 저장 모델 옆에 붙을 수 있습니다.",
      followups: ["이벤트를 수정해야 하면 어떻게 하나요?", "snapshot은 왜 필요한가요?", "이벤트 스키마 변경은 어떻게 하나요?"],
      evidence: "event store contract, snapshot policy, schema evolution test",
    },
    {
      q: "동기 REST와 비동기 이벤트 중 무엇을 선택하나요?",
      answer: "사용자 요청 안에서 즉시 결과가 필요하고 실패를 바로 알려야 하면 동기, 후처리나 fan-out, peak 완충, 장애 격리가 중요하면 비동기를 고려합니다. 비동기는 결과적 일관성 비용을 감당할 수 있어야 합니다.",
      followups: ["알림 발송은 동기여야 하나요?", "결제는 비동기로 해도 되나요?", "비동기 결과를 UI에 어떻게 보여주나요?"],
      evidence: "sequence diagram, user-visible state, event contract, SLO impact",
    },
    {
      q: "데이터 소유권이 불명확하면 어떤 문제가 생기나요?",
      answer: "여러 서비스가 같은 데이터를 쓰면 정합성, 권한, migration, 장애 책임이 흐려집니다. 어떤 서비스가 write owner인지와 다른 서비스가 어떤 read model로 보는지 명확해야 합니다.",
      followups: ["read-only 공유 DB는 괜찮나요?", "소유권 이전 중 dual write는 어떻게 피하나요?", "데이터 복제 불일치는 어떻게 찾나요?"],
      evidence: "data ownership map, write owner table, reconciliation job, migration ADR",
    },
    {
      q: "아키텍처 결정의 만료 조건을 왜 적어야 하나요?",
      answer: "현재 제약에서 맞는 결정이 미래에도 맞는다는 보장은 없습니다. 트래픽, 팀 수, 장애 빈도, 배포 충돌, 비용 같은 재검토 신호를 적어야 결정을 교리화하지 않습니다.",
      followups: ["ADR은 누가 갱신하나요?", "결정이 틀렸다는 걸 어떻게 인정하나요?", "재검토 주기는 어떻게 정하나요?"],
      evidence: "ADR review trigger, SLO trend, team ownership change, incident count",
    },
    {
      q: "Anti-corruption layer는 언제 필요하나요?",
      answer: "외부 시스템이나 레거시 모델의 용어, 상태, 오류가 내부 도메인 모델을 오염시킬 때 필요합니다. 단순 adapter가 아니라 의미 변환과 실패 계약을 명시하는 경계입니다.",
      followups: ["ACL이 과한 추상화가 되는 경우는?", "외부 API 필드명을 그대로 쓰면 왜 위험한가요?", "레거시 상태 코드는 어디서 번역하나요?"],
      evidence: "translation map, adapter contract, legacy error mapping, domain vocabulary",
    },
  ],
  "engineering-data-qa": [
    {
      q: "인덱스를 추가하면 항상 빨라지나요?",
      answer: "아닙니다. 읽기는 빨라질 수 있지만 쓰기 비용, 저장 공간, vacuum 비용, planner 선택 복잡도가 늘어납니다. selectivity, query pattern, 정렬 조건, write volume을 함께 봐야 합니다.",
      followups: ["복합 인덱스 컬럼 순서는 어떻게 정하나요?", "사용하지 않는 인덱스는 어떻게 찾나요?", "인덱스가 많으면 insert가 왜 느려지나요?"],
      evidence: "EXPLAIN ANALYZE, index usage stats, write latency, bloat metric",
    },
    {
      q: "트랜잭션 격리 수준은 높을수록 좋은가요?",
      answer: "높을수록 이상 현상은 줄지만 lock, retry, abort 비용이 증가합니다. 도메인 불변식이 어떤 이상 현상을 허용하지 않는지 먼저 정하고, DB 엔진의 실제 격리 동작을 확인해야 합니다.",
      followups: ["Read Committed에서 어떤 문제가 생기나요?", "Serializable은 왜 retry가 필요할 수 있나요?", "Repeatable Read는 DB마다 같은가요?"],
      evidence: "isolation anomaly fixture, retry policy, transaction test",
    },
    {
      q: "Deadlock이 나면 DB가 잘못된 건가요?",
      answer: "Deadlock은 동시 트랜잭션이 서로의 lock을 기다리는 상태이고, DB는 이를 감지해 한쪽을 abort합니다. 원인은 lock 순서 불일치, 긴 트랜잭션, 넓은 update 범위일 수 있으며 retry와 lock ordering이 필요합니다.",
      followups: ["deadlock과 lock wait timeout은 어떻게 다른가요?", "항상 retry하면 되나요?", "락 순서는 어떻게 표준화하나요?"],
      evidence: "deadlock log, pg_locks, transaction order diagram, retry test",
    },
    {
      q: "스키마 변경을 무중단으로 하려면 어떤 순서가 필요한가요?",
      answer: "expand, migrate, contract 순서로 진행합니다. 먼저 새 컬럼/테이블을 호환되게 추가하고, 애플리케이션이 양쪽을 읽거나 쓰게 한 뒤 backfill과 검증을 끝내고, 마지막에 옛 필드를 제거합니다.",
      followups: ["NOT NULL 컬럼은 어떻게 추가하나요?", "backfill 중 부하는 어떻게 제한하나요?", "구버전 앱이 남아 있으면 무엇이 위험한가요?"],
      evidence: "migration plan, backfill batch log, compatibility test, rollback stop point",
    },
    {
      q: "캐시 무효화는 왜 어렵나요?",
      answer: "원본 DB와 캐시의 수명, 갱신 시점, 권한 범위가 다르기 때문입니다. TTL만으로는 stale data를 허용한다는 뜻이고, write-through나 explicit invalidation은 실패 시 불일치 처리가 필요합니다.",
      followups: ["권한 정보는 캐시해도 되나요?", "TTL jitter는 왜 넣나요?", "stale data를 어디까지 허용하나요?"],
      evidence: "cache key policy, invalidation trigger, stale data fixture, TTL histogram",
    },
    {
      q: "Redis를 primary DB처럼 쓰면 왜 위험한가요?",
      answer: "Redis는 메모리 기반이고 eviction, persistence, failover 설정에 따라 데이터 손실이나 중복 처리가 생길 수 있습니다. 원본성, 정합성, 복구가 중요한 데이터는 RDBMS 같은 source of truth가 필요합니다.",
      followups: ["AOF를 켜면 완전히 안전한가요?", "Redis failover 중 lock은 어떻게 되나요?", "세션 저장소로는 왜 괜찮을 수 있나요?"],
      evidence: "persistence config, eviction policy, failover drill, source-of-truth decision",
    },
    {
      q: "데이터 정합성 검증 쿼리는 왜 필요한가요?",
      answer: "비동기 처리, migration, cache, replica, backfill이 있으면 시스템이 결국 수렴했는지 별도 검증이 필요합니다. 정합성 쿼리는 사고 후 범위 산정과 재처리에도 쓰입니다.",
      followups: ["검증 쿼리는 운영 부하를 만들지 않나요?", "불일치를 발견하면 자동 보정하나요?", "source of truth는 어떻게 정하나요?"],
      evidence: "reconciliation query, mismatch count, repair job log, source-of-truth map",
    },
    {
      q: "DB connection pool 크기는 크게 잡으면 좋은가요?",
      answer: "너무 작으면 대기 시간이 늘고, 너무 크면 DB가 context switching과 lock 경쟁으로 더 느려질 수 있습니다. app concurrency, DB max connection, query time, p99, pool wait를 보고 정합니다.",
      followups: ["pool wait와 query time은 어떻게 구분하나요?", "서버를 늘리면 DB connection은 어떻게 되나요?", "HikariCP 지표 중 무엇을 보나요?"],
      evidence: "pool active/idle/wait metric, DB max connection, load test, p99 delta",
    },
  ],
  "engineering-runtime-quality-qa": [
    {
      q: "SLI와 SLO는 어떻게 정하나요?",
      answer: "SLI는 사용자 경험을 나타내는 측정값이고 SLO는 그 목표입니다. API라면 availability, latency, correctness를 route와 중요도별로 나누고, error budget으로 알림과 릴리스 판단을 연결합니다.",
      followups: ["모든 API에 같은 SLO를 적용하나요?", "내부 batch도 SLO가 필요한가요?", "SLO 위반과 장애 선언은 같은가요?"],
      evidence: "SLI definition, SLO target, burn rate alert, error budget policy",
    },
    {
      q: "Health check는 무엇을 확인해야 하나요?",
      answer: "liveness는 프로세스 생존, readiness는 트래픽 수신 준비 상태를 봅니다. readiness에 핵심 dependency 상태를 반영하되, 일시 장애 때 전체 재시작 폭주가 생기지 않도록 신중히 나눠야 합니다.",
      followups: ["DB가 잠깐 느리면 readiness를 실패시켜야 하나요?", "liveness에 외부 API를 넣으면 왜 위험한가요?", "startup probe는 언제 필요한가요?"],
      evidence: "health endpoint contract, probe config, restart count, dependency status",
    },
    {
      q: "Alert fatigue를 줄이려면 어떻게 하나요?",
      answer: "사람을 깨우는 알림은 즉시 행동 가능한 증상 기반이어야 합니다. CPU 같은 원인 후보보다 user-visible error, SLO burn rate, data loss risk, sustained saturation을 우선합니다.",
      followups: ["warning과 page를 어떻게 나누나요?", "알림 임계값은 누가 정하나요?", "한밤중에 깨우면 안 되는 알림은 무엇인가요?"],
      evidence: "alert policy, runbook link, page history, false positive review",
    },
    {
      q: "Circuit breaker는 retry와 어떤 관계인가요?",
      answer: "retry는 일시 실패를 흡수하지만 하류가 죽었을 때는 부담을 키울 수 있습니다. circuit breaker는 실패율이 높을 때 호출을 빠르게 차단해 자원 고갈과 cascading failure를 줄입니다.",
      followups: ["OPEN, HALF_OPEN 상태는 무엇인가요?", "circuit open 시 사용자에게 무엇을 보여주나요?", "fallback이 stale data면 어떻게 표시하나요?"],
      evidence: "circuit state metric, fallback policy, retry budget, downstream error rate",
    },
    {
      q: "Backpressure와 rate limit은 어떻게 다른가요?",
      answer: "rate limit은 외부 요청량을 제한하는 정책이고, backpressure는 소비자가 처리 능력을 초과했을 때 생산자나 upstream에 늦추라는 신호를 주는 흐름 제어입니다.",
      followups: ["queue가 쌓이면 worker만 늘리면 되나요?", "load shedding은 언제 하나요?", "낮은 우선순위 작업은 어떻게 구분하나요?"],
      evidence: "queue depth, lag slope, load shedding policy, priority class",
    },
    {
      q: "Runbook에는 무엇이 있어야 하나요?",
      answer: "증상, 확인 명령, 정상/비정상 판정, 완화 조치, rollback 또는 escalation, 사후 기록 위치가 있어야 합니다. 명령어만 있고 판단 기준이 없으면 runbook이 아닙니다.",
      followups: ["runbook은 언제 업데이트하나요?", "자동화와 수동 절차는 어떻게 나누나요?", "위험한 명령은 어떻게 보호하나요?"],
      evidence: "runbook step, command output sample, escalation owner, post-incident update",
    },
    {
      q: "배포 후 health window에서는 무엇을 보나요?",
      answer: "새 release id 기준으로 error rate, p95/p99 latency, saturation, business metric, log anomaly, rollback trigger를 봅니다. 전체 평균보다 변경된 route와 canary cohort를 우선합니다.",
      followups: ["business metric은 왜 보나요?", "canary가 정상인데 전체 배포 후 깨질 수 있나요?", "rollback과 forward fix 판단 기준은?"],
      evidence: "release dashboard, canary analysis, rollback threshold, feature flag state",
    },
    {
      q: "분산 trace가 있어도 로그가 필요한 이유는 무엇인가요?",
      answer: "trace는 경로와 시간 분해에 강하고, 로그는 특정 결정과 원인 세부 정보에 강합니다. metric이 증상을 잡고 trace가 위치를 좁히며 log가 원인을 확정하는 식으로 함께 씁니다.",
      followups: ["모든 요청을 trace sampling해야 하나요?", "PII는 로그에 어떻게 다루나요?", "trace id 전파가 끊기면 어떻게 찾나요?"],
      evidence: "trace sample, structured log, sampling policy, redaction rule",
    },
  ],
  "engineering-platform-tools-qa": [
    {
      q: "컨테이너 이미지에서 secret이 새면 어떻게 발견하나요?",
      answer: "이미지 layer, build arg, env dump, repository history를 확인합니다. secret은 build artifact에 들어가면 안 되고 runtime secret store나 mounted secret으로 주입해야 합니다.",
      followups: ["ARG와 ENV는 어떻게 다른가요?", "이미 push된 secret은 파일만 지우면 끝인가요?", "secret rotation은 어떤 순서로 하나요?"],
      evidence: "image history, secret scan, revoked key record, runtime injection config",
    },
    {
      q: "컨테이너가 OOMKilled 되면 무엇을 보나요?",
      answer: "exit code, container memory limit, RSS, heap, direct memory, GC log, traffic spike를 봅니다. JVM이면 heap만 줄이면 direct memory나 native memory 문제를 놓칠 수 있습니다.",
      followups: ["memory limit과 JVM heap은 어떻게 맞추나요?", "OOM과 GC thrashing은 어떻게 다르나요?", "재시작하면 해결된 것처럼 보이는 이유는?"],
      evidence: "container exit code, memory graph, GC log, heap/native memory setting",
    },
    {
      q: "환경변수 문제를 어떻게 빠르게 좁히나요?",
      answer: "빌드 시점 변수와 실행 시점 변수를 구분하고, 배포 대상 namespace, secret key, config map, process env readback을 확인합니다. 민감값은 redacted dump로 존재 여부만 확인합니다.",
      followups: ["frontend env와 backend env는 왜 다르게 다루나요?", "기본값을 코드에 넣으면 어떤 위험이 있나요?", "환경별 설정 drift는 어떻게 막나요?"],
      evidence: "redacted config dump, deployment manifest, secret version, startup log",
    },
    {
      q: "NGINX 502와 504는 어떻게 다르게 접근하나요?",
      answer: "502는 upstream 연결, protocol, process crash, bad gateway 문제를 의심하고, 504는 upstream timeout이나 처리 지연을 의심합니다. 둘 다 upstream status, request time, app log, network path를 함께 봅니다.",
      followups: ["upstream health는 정상인데 502가 날 수 있나요?", "proxy_read_timeout은 무엇을 의미하나요?", "large body upload는 어떤 설정을 보나요?"],
      evidence: "nginx access/error log, upstream status, app request id, timeout config",
    },
    {
      q: "Git history를 깨끗하게 만드는 것보다 중요한 것은 무엇인가요?",
      answer: "변경 의도, 리뷰 가능성, bisect 가능성, rollback 가능성이 더 중요합니다. 커밋은 논리 단위로 나누고, 대형 refactor와 기능 변경을 섞지 않는 것이 핵심입니다.",
      followups: ["squash merge는 언제 유리한가요?", "revert가 쉬운 PR은 어떤 PR인가요?", "migration 포함 PR은 어떻게 나누나요?"],
      evidence: "commit series, PR description, revert plan, migration split",
    },
    {
      q: "운영 서버에서 직접 수정해야 할 때 어떤 원칙을 지키나요?",
      answer: "대상 환경, 변경 파일 백업, diff, 적용 명령, 검증, rollback 명령, 사후 코드 반영을 기록합니다. 임시 수정이 source of truth가 되지 않게 ticket과 PR로 회수해야 합니다.",
      followups: ["hotfix와 임시 조치는 어떻게 다르나요?", "vi로 수정한 설정을 어떻게 코드에 반영하나요?", "누가 승인해야 하나요?"],
      evidence: "change ticket, config backup, diff, readback result, follow-up PR",
    },
    {
      q: "배포 artifact 재현성은 왜 중요한가요?",
      answer: "같은 commit에서 같은 artifact가 나와야 사고 분석과 rollback이 가능합니다. dependency lock, build image, environment input, artifact digest가 고정되어야 합니다.",
      followups: ["빌드마다 hash가 달라지면 왜 문제인가요?", "dependency latest는 왜 위험한가요?", "artifact와 source commit을 어떻게 연결하나요?"],
      evidence: "lockfile, build image tag, artifact digest, release metadata",
    },
    {
      q: "로컬에서는 되는데 CI에서 깨지는 문제를 어떻게 보나요?",
      answer: "runtime version, OS, env var, timezone/locale, network, dependency cache, test order, file path case sensitivity를 비교합니다. 로컬 성공은 재현성의 충분조건이 아닙니다.",
      followups: ["timezone 때문에 어떤 테스트가 깨지나요?", "캐시를 지우면 고쳐지는 문제는 어떻게 추적하나요?", "flaky test와 환경 차이는 어떻게 구분하나요?"],
      evidence: "CI env dump, version matrix, clean install log, flaky test history",
    },
  ],
  "engineering-java-spring-qa": [
    {
      q: "Spring bean scope를 잘못 쓰면 어떤 문제가 생기나요?",
      answer: "singleton bean에 request-specific mutable state를 두면 사용자 간 상태가 섞일 수 있습니다. 대부분 service는 stateless singleton이어야 하고, request state는 method parameter나 request scope로 제한합니다.",
      followups: ["singleton bean은 thread-safe한가요?", "prototype scope는 언제 쓰나요?", "ThreadLocal은 어떤 위험이 있나요?"],
      evidence: "bean scope review, concurrency test, request state audit",
    },
    {
      q: "Lazy loading은 왜 transaction 경계와 연결되나요?",
      answer: "lazy association은 영속성 컨텍스트가 열려 있을 때 초기화됩니다. transaction 밖이나 session이 닫힌 뒤 접근하면 LazyInitializationException이 나거나, OSIV가 켜져 있으면 view에서 쿼리가 터질 수 있습니다.",
      followups: ["OSIV를 끄면 무엇이 바뀌나요?", "fetch join과 EntityGraph는 어떻게 고르나요?", "DTO projection은 lazy loading을 어떻게 피하나요?"],
      evidence: "SQL log, LazyInitialization fixture, fetch plan, OSIV setting",
    },
    {
      q: "JPA bulk update가 위험한 이유는 무엇인가요?",
      answer: "bulk update는 영속성 컨텍스트를 우회해 DB에 직접 반영되므로, 이미 로딩된 엔티티 상태가 stale해질 수 있습니다. 실행 후 clear 또는 별도 transaction 경계가 필요합니다.",
      followups: ["dirty checking과 bulk update는 어떻게 다르나요?", "bulk delete도 같은 문제가 있나요?", "캐시가 있으면 무엇을 무효화해야 하나요?"],
      evidence: "JPA BULK UPDATE CONSISTENCY CAVEAT, persistence context clear test, SQL log",
    },
    {
      q: "Propagation REQUIRED와 REQUIRES_NEW 차이는 무엇인가요?",
      answer: "REQUIRED는 기존 트랜잭션이 있으면 참여하고 없으면 새로 만듭니다. REQUIRES_NEW는 기존 트랜잭션을 suspend하고 별도 트랜잭션을 열어 commit/rollback 독립성을 만듭니다.",
      followups: ["audit log 저장에 REQUIRES_NEW를 쓰면 어떤 trade-off가 있나요?", "connection pool에는 어떤 영향이 있나요?", "outer rollback 후 inner commit은 유지되나요?"],
      evidence: "transaction propagation test, connection pool metric, audit transaction policy",
    },
    {
      q: "Checked exception과 runtime exception은 transaction rollback에 어떤 영향을 주나요?",
      answer: "Spring 기본 설정은 unchecked exception에서 rollback하고 checked exception은 rollback하지 않습니다. 도메인 실패를 어떤 exception으로 모델링할지와 rollbackFor 설정을 명확히 해야 합니다.",
      followups: ["rollbackFor=Exception.class는 항상 좋은가요?", "비즈니스 예외는 rollback해야 하나요?", "예외를 잡아먹으면 transaction은 어떻게 되나요?"],
      evidence: "rollback integration test, exception hierarchy, transaction log",
    },
    {
      q: "JVM thread pool을 크게 잡으면 처리량이 늘어나나요?",
      answer: "blocking 비율과 CPU core, downstream pool에 따라 다릅니다. thread가 너무 많으면 context switching과 downstream saturation이 늘고, DB connection pool이 병목이면 thread만 늘려도 대기열만 커집니다.",
      followups: ["Tomcat thread와 DB pool은 어떻게 맞추나요?", "virtual thread는 모든 문제를 해결하나요?", "thread dump에서 BLOCKED와 WAITING은 어떻게 보나요?"],
      evidence: "thread pool metric, DB pool wait, thread dump, load test",
    },
    {
      q: "equals/hashCode를 entity에 잘못 구현하면 어떤 문제가 생기나요?",
      answer: "영속화 전후 id 변화, proxy class, mutable field 기반 hashCode 때문에 Set/Map 동작이 깨질 수 있습니다. Entity identity와 business key 선택을 신중히 해야 합니다.",
      followups: ["id가 null인 transient entity는 어떻게 비교하나요?", "Lombok @Data를 entity에 쓰면 왜 위험한가요?", "proxy와 class 비교는 어떤 문제가 있나요?"],
      evidence: "entity equality test, Hibernate proxy fixture, collection behavior test",
    },
    {
      q: "Spring validation은 어디까지 믿을 수 있나요?",
      answer: "Bean Validation은 request boundary의 형식과 일부 규칙을 검증하지만, DB에 걸친 uniqueness, 권한, 상태 전이, 동시성 불변식은 service와 DB constraint가 함께 지켜야 합니다.",
      followups: ["Controller validation과 domain validation은 어떻게 나누나요?", "중복 이메일 검증은 어디서 하나요?", "validation error contract는 어떻게 만들죠?"],
      evidence: "validation group, domain invariant test, DB unique constraint, error contract",
    },
  ],
};

for (const page of pages) {
  page.questions.push(...(additionalQuestionsByPageId[page.id] ?? []));
}

const coverageQ = (topic, answer, evidence) => ({
  q: `${topic}은 어떻게 설명하나요?`,
  answer,
  followups: [`${topic}에서 가장 흔한 실패는 무엇인가요?`, `${topic}은 어떤 증거로 검증하나요?`, `${topic}을 과하게 적용하면 무엇이 문제인가요?`],
  evidence,
});

const coverageQuestionsByPageId = {
  "engineering-backend-core-qa": [
    coverageQ("HTTP method와 멱등성", "HTTP method는 resource에 대한 의도를 표현하는 계약입니다. GET은 안전한 조회, PUT/DELETE는 멱등한 상태 변경, POST는 처리 요청에 가깝지만 idempotency key로 멱등 계약을 별도로 만들 수 있습니다.", "method contract, idempotency matrix, duplicate request test"),
    coverageQ("API versioning", "기존 client를 깨는 응답 의미 변경, 필드 삭제, 필수 입력 추가가 있으면 versioning이나 deprecation window가 필요합니다. 필드 추가처럼 additive change는 consumer가 무시 가능하면 같은 버전에서 처리할 수 있습니다.", "consumer contract test, deprecation notice, compatibility matrix"),
    coverageQ("요청 validation 계층", "형식 검증은 request boundary, 도메인 불변식은 service/domain, 동시성까지 포함한 최종 방어는 DB constraint가 맡습니다. 세 계층은 중복이 아니라 실패를 잡는 위치가 다릅니다.", "validation error contract, invariant test, DB constraint"),
    coverageQ("상태 전이 모델", "주문, 결제, 승인처럼 상태가 있는 기능은 가능한 상태와 전이를 표로 고정해야 합니다. 그래야 불가능한 전이, 관리자 강제 변경, 보상 처리, audit를 일관되게 다룰 수 있습니다.", "state transition table, invalid transition test, audit event"),
    coverageQ("외부 식별자 노출", "내부 ID 노출 자체보다 권한 검증 누락과 추측 가능성이 문제입니다. 외부 공개 ID, tenant scope, resource authorization, audit를 같이 설계해야 IDOR를 줄일 수 있습니다.", "IDOR negative test, authorization query, audit log"),
    coverageQ("Command와 Query 분리", "상태를 바꾸는 command는 transaction, invariant, audit가 중요하고 query는 fetch plan, projection, cache, pagination이 중요합니다. 같은 코드베이스 안에서도 판단 기준을 분리해야 합니다.", "command/query method split, transaction annotation, query plan"),
    coverageQ("서버 시간 처리", "저장은 UTC로 통일하고 사용자 표시는 timezone을 적용합니다. 만료, 예약, 정산처럼 시간 경계가 중요한 기능은 clock injection과 timezone fixture로 테스트해야 합니다.", "UTC storage policy, clock test, timezone fixture"),
    coverageQ("파일 업로드 API", "파일 업로드는 파일 크기, content type, malware scan, 저장소 권한, 다운로드 권한, 만료 정책을 함께 다룹니다. 업로드 성공과 비즈니스 처리 성공은 별도 상태로 나누는 편이 안전합니다.", "upload contract, size limit, scan result, signed URL audit"),
    coverageQ("Batch job 설계", "batch는 사용자 요청 latency보다 재시작 가능성, checkpoint, idempotency, 부분 실패 복구가 중요합니다. 범위와 진행 상태를 남겨야 중간 실패 후 안전하게 이어갈 수 있습니다.", "job checkpoint, processed ledger, retry report"),
    coverageQ("Feature flag 운영", "feature flag는 배포와 릴리스를 분리하고 blast radius를 줄이는 운영 제어입니다. tenant, cohort, percentage rollout, kill switch, cleanup 정책까지 있어야 합니다.", "flag rule, rollout plan, kill switch drill"),
    coverageQ("Response payload 크기", "payload가 커지면 network, serialization CPU, memory allocation, client rendering 비용이 커집니다. projection, pagination, compression, streaming을 기준으로 줄입니다.", "response byte histogram, serialization span, payload contract"),
    coverageQ("HTTP cache와 서버 cache", "HTTP cache는 client/proxy/CDN과의 응답 재사용 계약이고 서버 cache는 backend 내부 dependency 비용을 줄이는 최적화입니다. 인증 응답은 cache key와 header가 특히 중요합니다.", "Cache-Control policy, Vary header, server cache key"),
    coverageQ("null과 빈 값 계약", "null, absent, empty string, empty array는 의미가 다를 수 있습니다. 의미가 같다면 일관된 표현을 정하고, 의미가 다르면 schema와 client fixture에 명시해야 합니다.", "response schema, compatibility test, client fixture"),
    coverageQ("로그 레벨 정책", "INFO는 정상 핵심 이벤트, WARN은 자동 복구됐지만 주의할 신호, ERROR는 사용자 영향이나 운영 조치가 필요한 실패에 둡니다. expected error를 ERROR로 남기면 알림 품질이 떨어집니다.", "log level policy, error budget, alert mapping"),
    coverageQ("API smoke test", "smoke test는 배포된 artifact가 실제 dependency와 연결되고 critical route가 최소 동작하는지 확인합니다. 깊은 검증보다 release id, health, auth, read/write path 확인이 목적입니다.", "smoke script, release id, critical path result"),
    coverageQ("입력 normalize", "공백, 대소문자, 전화번호, 이메일, 날짜 형식이 제각각이면 중복 검증과 검색이 깨집니다. 저장 전 normalize 기준과 원본 보존 여부를 정해야 합니다.", "normalization rule, duplicate fixture, search test"),
    coverageQ("도메인 이벤트", "도메인 이벤트는 내부 구현 로그가 아니라 비즈니스 사실입니다. 외부로 발행한다면 schema, versioning, idempotency, consumer compatibility를 계약으로 둬야 합니다.", "event contract, outbox record, consumer test"),
    coverageQ("경험 경계 답변", "직접 경험이 없는 영역은 경험처럼 포장하지 말고 원리와 검증 계획으로 답해야 합니다. 모르는 것을 숨기는 것보다 어떤 지표와 테스트로 확인할지 말하는 편이 신뢰를 줍니다.", "experience boundary statement, verification plan, gap note"),
  ],
  "engineering-backend-auth-security-qa": [
    coverageQ("OAuth2 authorization code flow", "authorization code flow는 browser가 token을 직접 받지 않고 server가 code를 token으로 교환하게 해 노출 위험을 줄입니다. public client에서는 PKCE로 code interception 위험을 낮춥니다.", "OAuth flow diagram, PKCE verifier, redirect URI allowlist"),
    coverageQ("OIDC와 OAuth2 차이", "OAuth2는 권한 위임이고 OIDC는 그 위에 신원 인증을 표준화한 레이어입니다. ID token은 issuer, audience, expiry, nonce, signature를 검증해야 합니다.", "ID token validation, issuer/audience config, nonce test"),
    coverageQ("MFA 적용 기준", "MFA는 모든 요청에 기계적으로 붙이기보다 risk와 action 민감도에 따라 적용합니다. 관리자, 대량 export, 권한 변경, 결제 같은 high-risk action에는 step-up MFA가 필요합니다.", "MFA policy, step-up trigger, recovery flow"),
    coverageQ("Session fixation", "session fixation은 공격자가 정한 session id를 피해자 로그인 후에도 쓰게 만드는 공격입니다. 로그인 성공 시 session id를 재발급하고 cookie 속성과 CSRF 방어를 같이 둡니다.", "session regeneration test, cookie attributes, login audit"),
    coverageQ("Cookie 보안 속성", "인증 cookie는 HttpOnly, Secure를 기본으로 하고 SameSite는 UX와 CSRF 위험을 기준으로 정합니다. Domain과 Path는 최소 범위로 제한해야 합니다.", "Set-Cookie header review, CSRF test, browser fixture"),
    coverageQ("XSS와 백엔드 보안", "XSS는 token 탈취, 관리자 action 수행, CSRF 우회로 backend 권한 모델을 무너뜨릴 수 있습니다. token 저장 위치, CSP, output encoding, audit가 함께 필요합니다.", "XSS fixture, token storage policy, CSP report"),
    coverageQ("SQL injection과 ORM", "ORM을 써도 native query, 문자열 연결, 동적 order by에서 injection이 생깁니다. parameter binding, allowlisted sort key, query builder를 강제해야 합니다.", "prepared statement, native query review, injection test"),
    coverageQ("SSRF DNS rebinding", "DNS rebinding은 처음 허용 IP로 보이다가 연결 시점이나 redirect 후 private IP로 바뀌는 공격입니다. 연결 직전 IP 재검증, private/link-local 차단, redirect 제한이 필요합니다.", "DNS/IP revalidation, redirect test, egress deny log"),
    coverageQ("Secret rotation", "secret rotation은 새 secret 발급, dual validation 또는 rolling deploy, old secret revoke, 영향 범위 확인 순서로 진행합니다. rotation 가능한 구조가 사고 대응 속도를 좌우합니다.", "rotation runbook, secret version, revoke audit"),
    coverageQ("권한 변경 audit", "권한 변경은 이후 접근 가능성을 바꾸는 root action입니다. 누가 누구에게 어떤 권한을 왜 부여했는지와 승인 기록, 변경 전후 scope를 남겨야 합니다.", "permission change audit, approval record, before/after role diff"),
    coverageQ("Admin impersonation", "impersonation은 대상 tenant, reason code, approval, 시간 제한, read-only 기본값, 사용자 알림, audit log가 있어야 합니다. 관리자와 대상 사용자 모두 기록해야 합니다.", "impersonation audit, reason code, time-bound session"),
    coverageQ("PII export 통제", "PII export는 최소 권한, 목적 기록, approval, scope 제한, 짧은 TTL, 다운로드 audit, 보존 기간을 요구합니다. 일반 조회보다 강한 통제가 필요합니다.", "export approval, scope query, download audit, retention policy"),
    coverageQ("Security incident packet", "보안 사고 패킷에는 summary, reproduction, scope, temporary control, permanent fix, audit evidence, communication, follow-up이 들어갑니다. 증거 보존과 범위 산정이 우선입니다.", "SECURITY INCIDENT PACKET, timeline, audit query, comms note"),
    coverageQ("권한 캐시", "권한 캐시는 stale permission 위험이 큽니다. TTL을 짧게 하거나 token version, permission version, revoke event로 무효화해야 합니다.", "permission version, cache invalidation log, stale permission test"),
    coverageQ("client tenant id 신뢰 금지", "tenant scope는 client가 보낸 값을 신뢰하지 않고 server-side session이나 token claim에서 결정합니다. DB query에서도 actor tenant와 resource tenant 일치를 강제해야 합니다.", "tenant source policy, cross-tenant fixture, DB predicate"),
    coverageQ("보안 헤더", "CSP, HSTS, X-Frame-Options, Referrer-Policy는 브라우저 보안 동작을 결정합니다. 인증 cookie와 관리자 화면이 있으면 backend response policy로 일관되게 내려야 합니다.", "security header scan, CSP report, HSTS config"),
    coverageQ("Replay attack", "replay attack은 webhook뿐 아니라 결제 요청, password reset, signed URL, API nonce에서도 생깁니다. timestamp, nonce, idempotency ledger, short TTL, one-time token으로 막습니다.", "nonce store, timestamp tolerance, one-time token test"),
    coverageQ("보안 negative test", "보안 테스트는 정상 허용보다 forbidden actor, foreign tenant, expired token, replay, malformed input, excessive request 같은 negative fixture가 핵심입니다.", "abuse fixture set, negative test packet, audit assertion"),
  ],
  "engineering-backend-architecture-qa": [
    coverageQ("Layered architecture", "layered architecture는 역할이 명확하고 이해하기 쉽지만 domain rule이 service에 비대해지고 infra 세부사항이 위로 새기 쉽습니다. 의존 방향과 계층 누수를 점검해야 합니다.", "layer dependency rule, service size metric, architecture test"),
    coverageQ("Hexagonal architecture", "hexagonal architecture는 domain이 외부 기술에 의존하지 않게 port를 안쪽에 두고 adapter가 바깥에서 구현합니다. 테스트와 교체 가능성이 좋아지지만 간접 계층 비용이 생깁니다.", "port interface, adapter implementation, domain unit test"),
    coverageQ("Anemic domain model", "entity가 getter/setter만 있고 규칙이 service if문에 흩어져 있으면 anemic model 신호입니다. 불변식과 상태 전이를 aggregate 경계 안으로 모아야 합니다.", "domain invariant test, service complexity, aggregate method"),
    coverageQ("Aggregate boundary", "aggregate는 함께 강한 일관성으로 변경되어야 하는 최소 객체 묶음입니다. 너무 크면 lock과 transaction 비용이 커지고 너무 작으면 불변식이 밖으로 샙니다.", "aggregate invariant list, transaction boundary, lock scope"),
    coverageQ("Repository 의미", "repository는 단순 DAO가 아니라 aggregate collection처럼 domain 관점의 저장·조회 경계를 제공합니다. domain이 SQL/JPA 세부사항에 끌려가지 않게 합니다.", "repository contract, aggregate root query, infra adapter"),
    coverageQ("서비스 간 동기 호출", "동기 호출이 많아지면 latency가 누적되고 하류 장애가 상류로 전파됩니다. timeout, retry, circuit breaker가 있어도 runtime coupling은 남습니다.", "dependency graph, trace waterfall, circuit metric"),
    coverageQ("Outbox의 아키텍처 의미", "outbox는 DB 변경과 이벤트 발행의 원자성을 보장하는 구현 패턴이면서, 서비스 간 데이터 흐름을 결과적 일관성으로 전환하는 아키텍처 결정입니다.", "outbox table, relay runbook, ADR"),
    coverageQ("Strangler fig 전환", "strangler fig는 레거시 전체를 한 번에 바꾸지 않고 routing이나 기능 경계를 기준으로 새 구현이 일부 트래픽을 받게 하는 점진 전환 방식입니다.", "routing rule, migration dashboard, rollback route"),
    coverageQ("분산 모놀리스", "서비스는 나뉘었지만 함께 배포해야 하고 공유 DB나 동기 호출 사슬 때문에 하나가 느리면 전체가 느려지는 구조가 분산 모놀리스입니다.", "deploy dependency, shared DB access, incident blast radius"),
    coverageQ("API gateway 책임", "gateway는 routing, authn/authz 일부, rate limit, protocol translation에 적합합니다. 도메인 규칙이 들어가면 정책 owner와 테스트 경계가 흐려집니다.", "gateway policy review, domain rule ownership, route config"),
    coverageQ("BFF", "BFF는 client별 화면 요구와 backend API 모델이 크게 다를 때 유용합니다. 다만 domain policy를 중복하면 유지보수 비용이 커지므로 composition과 presentation shaping에 집중해야 합니다.", "BFF contract, client-specific aggregation, policy duplication check"),
    coverageQ("Schema evolution", "서비스와 소비자가 다른 배포 시점에 존재하므로 schema는 backward/forward compatible해야 합니다. API, event, DB schema 모두 additive change와 deprecation window를 기준으로 관리합니다.", "schema compatibility test, versioning policy, consumer contract"),
    coverageQ("Resilience pattern 남용", "circuit breaker, bulkhead, retry를 모든 호출에 붙이면 복잡도와 latency만 늘 수 있습니다. 실제 failure mode와 SLO impact가 있는 dependency에 우선 적용해야 합니다.", "failure mode table, retry budget, circuit dashboard"),
    coverageQ("ADR과 RFC", "RFC는 논의와 제안을 위한 문서이고 ADR은 결정과 결과를 기록하는 문서입니다. 큰 변경은 RFC로 대안을 검토하고 결정 후 ADR로 남기는 흐름이 좋습니다.", "RFC proposal, ADR decision, review comments"),
    coverageQ("Architecture diagram", "아키텍처 diagram은 runtime dependency, data ownership, trust boundary, failure propagation, deployment unit을 보여야 합니다. 예쁜 그림보다 책임과 장애 경로가 중요합니다.", "context diagram, sequence diagram, dependency graph"),
    coverageQ("팀 구조와 아키텍처", "서비스 경계와 팀 owner가 맞지 않으면 변경 조율 비용이 커집니다. 커뮤니케이션 구조가 시스템 구조에 반영되므로 owner와 on-call 책임까지 고려해야 합니다.", "team ownership map, on-call rotation, deploy ownership"),
    coverageQ("Architecture debt", "architecture debt는 의식적으로 기록하고 만료 조건, 위험, 상환 trigger를 둬야 합니다. 숨겨진 debt가 아니라 관리되는 debt로 만들어야 합니다.", "architecture debt register, risk owner, review trigger"),
    coverageQ("상황에 따라 다르다의 기준", "상황에 따라 다르다고 말한 뒤에는 traffic, team size, data ownership, consistency, blast radius, deploy frequency 같은 판단 축을 제시해야 합니다.", "decision matrix, tradeoff ledger, scenario packet"),
  ],
  "engineering-data-qa": [
    coverageQ("Primary key와 business key", "business key는 정책 변경으로 바뀔 수 있어 surrogate primary key와 business unique key를 분리하는 편이 안전합니다. primary key는 참조 안정성이 중요합니다.", "PK/unique constraint design, migration note, foreign key map"),
    coverageQ("Foreign key", "foreign key는 정합성에는 강하지만 대량 쓰기, shard, legacy migration에서는 비용이 있을 수 있습니다. 빼려면 orphan check와 reconciliation로 위험을 대신 감당해야 합니다.", "FK constraint, orphan check query, write latency"),
    coverageQ("Soft delete", "soft delete는 복구와 audit에는 유리하지만 모든 query에 deleted predicate가 필요하고 unique constraint, index, count가 복잡해집니다. retention과 hard delete job이 필요합니다.", "soft delete predicate test, partial index, retention job"),
    coverageQ("정규화와 반정규화", "정규화는 중복과 update anomaly를 줄이고 반정규화는 읽기 성능을 얻는 대신 동기화 비용을 만듭니다. 원본과 파생 데이터 경계를 명확히 해야 합니다.", "data model ADR, update anomaly fixture, sync job"),
    coverageQ("Partitioning", "partitioning은 테이블 크기, retention, time-range query, write volume이 커져 단일 인덱스와 vacuum이 부담될 때 고려합니다. partition key 선택이 핵심입니다.", "partition pruning plan, retention policy, table size metric"),
    coverageQ("Sharding", "sharding은 여러 DB 노드로 데이터를 분산하는 설계입니다. cross-shard transaction, query, rebalancing 비용이 크므로 shard key와 hot shard 위험을 먼저 봐야 합니다.", "shard key decision, cross-shard query list, rebalancing plan"),
    coverageQ("Read replica lag UX", "방금 쓴 데이터는 primary로 읽거나 session stickiness를 적용하고, stale 허용 화면에는 pending이나 last updated를 보여줍니다. 모든 읽기를 replica로 보내면 read-your-writes가 깨집니다.", "read routing policy, lag metric, primary-read list"),
    coverageQ("긴 transaction", "긴 transaction은 lock과 connection을 오래 붙잡아 대기와 deadlock 가능성을 키웁니다. 외부 API, 파일 처리, 긴 계산은 transaction 밖이나 비동기로 빼야 합니다.", "transaction duration metric, lock wait, connection usage"),
    coverageQ("Optimistic lock과 unique constraint", "optimistic lock은 같은 row의 version 충돌을 감지하고 unique constraint는 business key 중복 생성을 막습니다. 둘 다 동시성 방어지만 보호하는 불변식이 다릅니다.", "version column, unique index, conflict mapping test"),
    coverageQ("Query plan regression", "통계 변화, 데이터 분포 변화, parameter skew, index bloat 때문에 배포 후 query plan이 나빠질 수 있습니다. release별 plan과 pg_stat_statements를 비교해야 합니다.", "plan diff, statistics age, pg_stat_statements, release tag"),
    coverageQ("느린 count query", "정확한 count가 필요한지 먼저 확인합니다. 필요 없으면 hasNext, approximate count, cached count를 쓰고 필요하면 조건에 맞는 index와 집계 테이블을 고려합니다.", "count plan, UX requirement, approximate count policy"),
    coverageQ("Redis key 설계", "Redis key는 domain, resource id, version, tenant scope, 목적을 포함해 충돌과 권한 오염을 막습니다. TTL과 cardinality도 함께 관리해야 합니다.", "key naming policy, TTL table, key cardinality metric"),
    coverageQ("Cache stampede", "cache stampede는 인기 키 만료 시 요청이 동시에 DB로 몰리는 현상입니다. single-flight, soft TTL, background refresh, TTL jitter, negative cache로 완화합니다.", "stampede fixture, DB burst metric, single-flight lock"),
    coverageQ("Redis 분산 락", "Redis lock은 SET NX PX와 owner token이 핵심이고 unlock은 token 비교와 delete가 원자적이어야 합니다. 그래도 최종 정합성은 DB constraint와 idempotency로 방어해야 합니다.", "lock token, Lua unlock script, idempotency constraint"),
    coverageQ("Redis eviction policy", "eviction policy는 메모리 한계에서 어떤 key를 제거할지 결정합니다. cache, session, lock, counter를 같은 Redis에 섞으면 eviction 영향이 인증이나 정합성으로 번질 수 있습니다.", "maxmemory policy, evicted_keys, key class separation"),
    coverageQ("Data migration rollback", "schema rollback과 data rollback은 다릅니다. destructive migration은 피하고, stop point와 forward repair를 준비해야 실제 운영에서 안전합니다.", "migration rollback plan, backup, repair script, stop point"),
    coverageQ("Read-only mode", "primary가 불안정하지만 읽기 제공은 가능한 경우 read-only mode로 사용자 영향을 줄일 수 있습니다. stale data와 쓰기 재개 시 reconciliation을 함께 설계해야 합니다.", "read-only feature flag, primary health, reconciliation plan"),
    coverageQ("데이터 지표 답변", "데이터 문제는 row count, cardinality, selectivity, p95/p99 query time, lock wait, replication lag, cache hit ratio, eviction count 같은 숫자로 답해야 합니다.", "metric packet, query timing, lock/lag/cache dashboard"),
  ],
  "engineering-runtime-quality-qa": [
    coverageQ("RED와 USE metric", "RED는 요청 기반 서비스의 rate, errors, duration을 보고 USE는 리소스의 utilization, saturation, errors를 봅니다. 사용자 증상은 RED로, 병목 자원은 USE로 좁힙니다.", "RED dashboard, USE dashboard, incident trace"),
    coverageQ("p95와 p99", "p95는 일반적인 나쁜 경험을, p99는 꼬리 지연과 소수 병목을 보여줍니다. 평균은 tail latency를 숨기므로 장애와 성능 리뷰에는 percentile이 필요합니다.", "latency histogram, p95/p99 trend, route segment"),
    coverageQ("Thread pool saturation", "thread pool saturation은 active thread, queue length, rejected task, request latency, thread dump로 봅니다. CPU가 낮아도 DB pool 대기면 latency가 커질 수 있습니다.", "executor metric, thread dump, rejected count"),
    coverageQ("GC latency", "GC가 원인인지 보려면 pause time, allocation rate, heap after GC, p99 spike timestamp를 맞춰봐야 합니다. 증상과 시간 상관이 없으면 다른 병목일 수 있습니다.", "GC log, JFR, heap usage, p99 timestamp"),
    coverageQ("Connection pool starvation", "pool wait 증가, active connection 고정, usage time 증가를 확인합니다. 원인은 느린 query, 긴 transaction, connection leak, pool size mismatch일 수 있습니다.", "pool wait metric, leak detection, slow query sample"),
    coverageQ("Timeout 전파", "계층별 timeout과 cancellation이 맞지 않으면 이미 실패한 요청이 하류에서 계속 실행됩니다. 전체 latency budget 안에서 gateway, app, DB, client timeout을 맞춰야 합니다.", "timeout budget, client/server config, cancellation log"),
    coverageQ("DLQ replay", "DLQ는 원인 분류, poison message 여부, schema mismatch, downstream 복구 여부, idempotency 보장을 확인한 뒤 replay해야 합니다. 바로 replay하면 장애를 반복할 수 있습니다.", "DLQ sample, replay dry-run, idempotency fixture"),
    coverageQ("Consumer lag triage", "consumer lag는 생산량 증가, 소비 실패, partition skew, downstream 지연, deploy regression으로 나눠 봐야 합니다. worker만 늘리면 하류를 더 압박할 수 있습니다.", "produce/consume rate, partition lag, downstream error"),
    coverageQ("Incident commander", "incident commander는 직접 모든 로그를 보는 사람이 아니라 의사결정, 우선순위, 역할 분담, 커뮤니케이션을 관리하는 사람입니다.", "incident role assignment, timeline, comms log"),
    coverageQ("Postmortem action item", "좋은 action item은 owner, due date, 검증 가능한 완료 기준이 있습니다. '주의한다'가 아니라 alert, test, runbook, gate를 바꾸는 항목이어야 합니다.", "postmortem action list, owner/date, verification result"),
    coverageQ("Log sampling", "log sampling은 고QPS route나 반복 오류의 log volume을 줄일 때 필요합니다. 다만 error, security, audit, rare high latency 이벤트는 보존 정책을 별도로 둬야 합니다.", "log volume metric, sampling rule, retained error sample"),
    coverageQ("High-cardinality metric", "userId나 requestId를 metric label로 쓰면 time series가 폭발해 비용과 query 성능이 망가집니다. 상세 식별자는 log/trace로 보내야 합니다.", "metric cardinality report, label policy, cost trend"),
    coverageQ("Rollback threshold", "rollback 기준은 새 release에서 error rate, p99, saturation, business metric이 baseline 대비 임계값을 넘는지로 사전에 정해야 합니다.", "rollback threshold, release dashboard, baseline metric"),
    coverageQ("Degraded mode", "degraded mode는 전체 실패 대신 일부 기능을 제한해 핵심 기능을 살리는 모드입니다. 추천, 통계, export를 끄고 주문/로그인 같은 critical path를 보호합니다.", "degraded mode policy, feature flag, user notice"),
    coverageQ("Queue ordering", "전역 순서는 비용이 커서 보통 aggregate 단위 순서만 보장합니다. partition key를 잘못 잡으면 같은 aggregate 이벤트가 흩어져 상태 전이가 꼬입니다.", "partition key policy, sequence check, stale event discard"),
    coverageQ("Idempotent consumer", "idempotent consumer는 message id나 business key를 inbox/processed table에 기록하고 side effect를 unique constraint와 transaction으로 보호합니다.", "inbox table, processed unique key, duplicate delivery test"),
    coverageQ("PR 운영 지표", "새 기능 PR에는 성공/실패 count, latency, dependency call, business outcome, 주요 decision log가 포함되어야 합니다. 배포 후 볼 지표가 없으면 운영 준비가 부족합니다.", "metric spec, log field list, dashboard link"),
    coverageQ("운영 경험 부족 답변", "직접 운영 경험이 부족하면 원인 분해 순서와 확인 증거를 말해야 합니다. p99 상승이면 trace, pool, GC, lock, downstream 순서로 확인하겠다고 답합니다.", "triage sequence, evidence checklist, practice incident packet"),
  ],
  "engineering-platform-tools-qa": [
    coverageQ("Docker layer cache", "Dockerfile 명령 순서는 cache hit와 build time을 좌우합니다. dependency install은 lockfile 기준으로 먼저 두고 자주 바뀌는 source copy는 뒤에 두는 편이 효율적입니다.", "Dockerfile layer order, build time, cache hit log"),
    coverageQ("Multi-stage build", "multi-stage build는 build tool과 source를 runtime image에서 제거해 이미지 크기와 공격 표면을 줄입니다. runtime에는 실행 artifact와 필요한 runtime dependency만 남겨야 합니다.", "image size diff, runtime package list, vulnerability scan"),
    coverageQ("Container healthcheck", "container healthcheck는 process 생존과 request 처리 준비 상태를 구분해야 합니다. liveness와 readiness를 섞으면 restart storm이나 잘못된 traffic routing이 생깁니다.", "healthcheck command, readiness endpoint, restart count"),
    coverageQ("Docker volume", "container는 ephemeral이므로 DB data, upload file, persistent state는 volume이나 외부 storage에 둬야 합니다. stateless app container에는 상태를 남기지 않는 편이 좋습니다.", "volume mount, backup policy, container recreation test"),
    coverageQ("Linux port 진단", "포트가 열려 있는데 접속이 안 되면 process listen, bind address, firewall, route, container mapping, reverse proxy를 순서대로 봅니다.", "ss/lsof output, firewall rule, route, curl result"),
    coverageQ("Disk full 장애", "disk full은 log write 실패, DB WAL/write 실패, temp file 실패, image pull 실패로 이어질 수 있습니다. inode 고갈도 별도 장애 원인이 됩니다.", "df/du/inode check, log rotation config, DB disk alert"),
    coverageQ("Process 생존과 지연", "process가 살아 있어도 thread pool, DB pool, external call 대기 때문에 사용자는 장애를 겪을 수 있습니다. health, CPU, thread dump, socket state, log timestamp를 함께 봐야 합니다.", "ps/top/thread dump, health result, access log"),
    coverageQ("Header forwarding", "X-Forwarded-For, X-Forwarded-Proto, Host는 redirect, audit, rate limit, auth 판단에 쓰일 수 있습니다. trusted proxy 경계 밖의 header는 신뢰하면 안 됩니다.", "proxy_set_header config, trusted proxy policy, audit IP test"),
    coverageQ("TLS 인증서 진단", "TLS 문제는 chain, expiry, SAN, SNI, intermediate CA, client trust store를 확인합니다. 서버 인증서가 있어도 SNI mismatch나 chain 누락으로 실패할 수 있습니다.", "openssl s_client, cert expiry, SAN list, client error"),
    coverageQ("Artifact와 deploy 분리", "빌드 산출물을 한 번 만들고 여러 환경에 같은 artifact를 배포해야 재현성이 생깁니다. 환경별 재빌드는 환경 차이와 artifact 차이를 섞습니다.", "artifact digest, pipeline stages, deploy metadata"),
    coverageQ("Secret scope", "dev, stage, prod secret은 분리하고 최소 권한으로 접근해야 합니다. prod secret이 dev artifact, CI log, local env에 섞이면 사고 범위가 커집니다.", "secret scope matrix, access audit, redacted log"),
    coverageQ("NGINX access log", "NGINX access log에서는 status, request time, upstream response time, upstream status, bytes, request id를 봅니다. proxy 문제와 app 문제를 분리하는 증거입니다.", "access log format, upstream timing, request id"),
    coverageQ("Readback 검증", "명령 실행 성공과 실제 상태 변경 성공은 다릅니다. 설정 적용, 배포, 권한 변경 후에는 조회 명령으로 원하는 상태가 되었는지 확인해야 합니다.", "command log, readback output, expected state"),
    coverageQ("Config drift", "config drift는 git/IaC 상태와 runtime 상태가 달라지는 문제입니다. state, runtime readback, checksum, periodic audit로 탐지하고 수동 변경은 PR로 회수해야 합니다.", "config checksum, drift report, IaC plan"),
    coverageQ("Blue-green과 canary", "blue-green은 두 환경을 전환해 빠른 rollback이 쉽고 canary는 일부 traffic으로 새 버전을 검증합니다. canary는 segment coverage와 metric 비교가 중요합니다.", "deployment strategy ADR, traffic split, canary dashboard"),
    coverageQ("Rollback 불가능 배포", "data destructive change나 외부 side effect가 있으면 rollback보다 forward fix가 현실적일 수 있습니다. 사전에 feature flag, expand-contract migration, repair script를 준비해야 합니다.", "rollback assessment, forward fix plan, migration stop point"),
    coverageQ("로컬 개발환경 문서", "좋은 로컬 문서는 clean install, dependency version, env var, seed data, 실행 명령, health check, 흔한 오류 해결책을 포함합니다.", "setup guide, clean install log, troubleshooting table"),
    coverageQ("도구 질문 답변 방식", "도구 질문은 명령어 암기가 아니라 계층별 진단 순서를 말해야 합니다. 예를 들어 502는 proxy log, upstream status, app log, timeout config, request id로 좁힙니다.", "triage checklist, command output, layer model"),
  ],
  "engineering-java-spring-qa": [
    coverageQ("Java Optional", "Optional은 반환값에서 값 없음 가능성을 표현할 때 유용하지만 field, parameter, JPA entity property에 남용하면 serialization과 ORM 처리에 불편이 생깁니다.", "API return contract, null handling policy, serialization test"),
    coverageQ("Java record", "record는 불변 data carrier, DTO, command object에 유용합니다. JPA entity처럼 proxy, lazy loading, no-arg constructor, mutable lifecycle이 필요한 객체에는 맞지 않습니다.", "record DTO, immutability test, entity design note"),
    coverageQ("Collection 선택", "collection은 순서, 중복 허용, 탐색 방식, 동시성 요구로 고릅니다. List, Set, Map, Queue는 각각 다른 불변식과 성능 특성을 표현합니다.", "collection choice note, complexity analysis, concurrency fixture"),
    coverageQ("Exception hierarchy", "exception hierarchy는 validation, business, dependency, system error를 분리해 API error code와 rollback 정책으로 연결해야 합니다.", "exception map, error contract, rollback test"),
    coverageQ("Spring Bean lifecycle", "bean lifecycle은 dependency injection, post construct, proxy 생성, destruction 순서를 이해하기 위해 필요합니다. transactional proxy 문제도 lifecycle과 연결됩니다.", "bean lifecycle log, proxy inspection, startup failure case"),
    coverageQ("Configuration properties", "type-safe configuration properties로 필수값을 검증하고 profile별 값을 분리하며 secret은 config file이 아니라 secret store/env로 주입해야 합니다.", "ConfigurationProperties validation, redacted config dump, profile test"),
    coverageQ("Spring MVC 요청 처리", "DispatcherServlet이 handler mapping으로 controller를 찾고 argument resolver와 message converter가 입력과 출력을 처리합니다. filter, interceptor, exception handler 위치를 구분해야 합니다.", "request lifecycle diagram, filter/interceptor order, exception mapping"),
    coverageQ("Spring Security filter chain", "security filter chain은 인증, CORS, CSRF, session, authorization 순서를 결정합니다. matcher와 filter 순서를 잘못 잡으면 preflight나 error path에서 보안 동작이 달라집니다.", "security filter chain, request matcher test, auth debug log"),
    coverageQ("Spring Data repository method", "repository method 이름 query는 간단한 조건에는 좋지만 복잡한 fetch plan, pagination, lock, projection이 필요하면 JPQL, QueryDSL, specification을 고려해야 합니다.", "repository query review, generated SQL, query count test"),
    coverageQ("Entity lifecycle callback", "entity callback은 audit timestamp 같은 단순 작업에는 유용하지만 외부 호출이나 복잡한 domain logic을 넣으면 transaction 경계와 테스트가 불투명해집니다.", "entity callback review, audit timestamp test, side-effect check"),
    coverageQ("1차 캐시와 2차 캐시", "1차 캐시는 persistence context 단위로 항상 존재하고 entity identity를 보장합니다. 2차 캐시는 선택 기능이며 stale data와 invalidation 정책이 중요합니다.", "persistence context test, second-level cache config, stale fixture"),
    coverageQ("Cascade와 orphanRemoval", "cascade는 parent 작업을 child에 전파하고 orphanRemoval은 parent collection에서 제거된 child를 삭제합니다. aggregate 소유 관계가 명확할 때만 써야 합니다.", "cascade mapping, orphan removal test, aggregate ownership"),
    coverageQ("Fetch join과 pagination", "to-many fetch join은 row 중복 때문에 DB pagination과 entity pagination이 어긋날 수 있습니다. ID page 후 fetch query나 batch size를 고려합니다.", "pagination query log, duplicate row fixture, batch fetch config"),
    coverageQ("Spring test slice", "WebMvcTest, DataJpaTest 같은 test slice는 관심 계층만 띄워 빠르게 좁은 검증을 하기 위해 씁니다. 모든 테스트를 full context로 돌리면 느리고 원인 분리가 어렵습니다.", "test slice choice, context load time, integration test"),
    coverageQ("Testcontainers", "Testcontainers는 실제 DB나 broker와 가까운 동작을 테스트해 dialect, transaction, index, constraint 차이를 잡습니다. H2나 mock은 운영 DB 차이를 숨길 수 있습니다.", "Testcontainers config, PostgreSQL integration test, migration test"),
    coverageQ("Spring Actuator", "Actuator는 health, metrics, info, prometheus endpoint로 관측성을 제공하지만 env, heapdump 같은 민감 endpoint는 노출 범위를 제한해야 합니다.", "actuator exposure config, metrics scrape, security rule"),
    coverageQ("Entity equals와 lazy loading", "equals, hashCode, toString이 lazy association을 건드리면 예상치 못한 query나 LazyInitializationException이 생깁니다. entity identity 비교는 association 접근 없이 안정적이어야 합니다.", "entity equality test, lazy load SQL log, Lombok review"),
    coverageQ("Java/Spring 답변의 중심", "Java/Spring 답변은 어노테이션 사용법보다 proxy, transaction, persistence context, thread, connection pool 같은 내부 동작과 깨지는 조건을 설명해야 합니다.", "proxy trace, transaction log, SQL log, JFR/thread dump"),
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

function answerFollowup(followup, question) {
  const text = followup.toLowerCase();
  const evidence = question.evidence;
  const firstSentence = question.answer.split(".")[0];

  const rules = [
    [/post도 멱등/, "가능합니다. POST라도 idempotency key와 request fingerprint를 저장하면 같은 요청의 중복 처리 결과를 재사용할 수 있고, payload가 다르면 409 conflict로 막아야 합니다."],
    [/validation과 db constraint/, "validation은 사용자에게 빠르고 명확한 오류를 주기 위한 경계이고, DB constraint는 동시성·우회 경로까지 포함한 최종 정합성 방어선입니다. 둘 중 하나만 두면 race나 batch 경로에서 깨질 수 있습니다."],
    [/중복 요청.*응답/, "이미 성공한 요청이면 같은 성공 결과를 재반환하는 것이 호출자 입장에서 안전합니다. 처리 중이면 202나 처리 중 상태를 주고, 같은 key에 다른 payload면 conflict로 막습니다."],
    [/외부 결제 호출과 db 저장/, "DB 저장과 외부 결제 호출은 하나의 ACID 트랜잭션으로 묶을 수 없습니다. 결제 요청에는 idempotency key를 쓰고, 로컬 DB에는 pending/confirmed/failed 상태와 outbox 또는 reconciliation 절차를 둡니다."],
    [/rollbackfor/, "rollbackFor를 넓게 잡으면 복구 가능한 비즈니스 예외까지 모두 롤백해 의도한 상태 기록이 사라질 수 있습니다. 어떤 예외가 상태 변경을 무효화해야 하는지 예외 계층과 테스트로 고정해야 합니다."],
    [/읽기 전용 트랜잭션/, "readOnly 트랜잭션은 의도를 드러내고 ORM flush 비용을 줄이며 DB/driver 최적화 힌트가 될 수 있습니다. 다만 모든 DB가 같은 방식으로 최적화하지 않으므로 실제 효과는 지표로 확인합니다."],
    [/userId.*metric label/, "userId는 cardinality가 폭발해 metric 저장소 비용과 쿼리 성능을 망칩니다. userId는 로그나 trace attribute로 제한하고 metric label은 route, status, tenant tier 같은 bounded value로 둡니다."],
    [/p95.*정상.*고객/, "전체 p95가 정상이어도 특정 tenant, route, payload size, region의 p99가 나쁠 수 있습니다. segment별 trace와 slow query, lock wait, downstream span을 봐야 합니다."],
    [/원인 분석과 복구/, "장애 중에는 사용자 영향 축소와 복구가 먼저입니다. 원인 후보를 좁히되 rollback, feature flag, traffic shift 같은 완화 조치를 먼저 하고, 깊은 원인 분석은 postmortem에서 정리합니다."],
    [/blast radius/, "feature flag, canary, tenant allowlist, backward-compatible migration, circuit breaker로 영향 범위를 줄입니다. 실패해도 전체 사용자·전체 데이터에 퍼지지 않는 배포 단위를 만듭니다."],
    [/어떤 테스트.*배포/, "상태 변경 기능이라면 권한 실패, 중복 요청, transaction rollback, concurrency conflict, API error contract 테스트가 없으면 위험합니다. 데이터 migration이면 호환성과 backfill 검증도 필요합니다."],
    [/forward fix.*rollback/, "코드만 되돌리면 되는 변경은 rollback이 빠르고 안전합니다. 이미 데이터가 변했거나 migration이 진행된 변경은 rollback보다 forward fix와 data repair가 더 안전할 수 있습니다."],
    [/400과 422/, "400은 요청 문법이나 형식 자체가 잘못된 경우에 가깝고, 422는 문법은 맞지만 도메인 검증을 통과하지 못한 경우에 쓸 수 있습니다. 팀의 error contract에서 일관되게 정하는 것이 더 중요합니다."],
    [/에러 메시지.*내부 원인/, "사용자 메시지는 복구 행동 중심으로 제한하고 내부 exception, table, stack trace는 숨깁니다. 내부 원인은 trace id로 로그에서 찾게 해야 정보 노출을 줄일 수 있습니다."],
    [/retryable/, "클라이언트가 같은 요청을 다시 보내도 안전한지 판단할 때 유용합니다. timeout, rate limit, temporary dependency failure에는 true가 가능하지만 validation이나 권한 오류에는 false가 맞습니다."],
    [/ttl.*정하/, "비즈니스 재시도 창, 결제 provider 재전송 기간, 저장 비용, 개인정보 보존 정책을 기준으로 정합니다. 너무 짧으면 늦은 재시도가 중복 처리되고, 너무 길면 저장 비용과 충돌 범위가 커집니다."],
    [/처리 중 상태/, "처리 중이면 동일 key 요청에 202 Accepted나 현재 상태 조회 링크를 반환합니다. 이미 완료됐으면 최초 결과를 재반환하고, 실패가 확정됐으면 실패 결과도 같은 key에 고정합니다."],
    [/body가 다르면/, "같은 idempotency key에 다른 body를 허용하면 서로 다른 의도를 하나의 결과로 덮어쓸 수 있습니다. request hash를 저장해 다르면 409 conflict로 막는 것이 안전합니다."],
    [/synchronized/, "synchronized는 한 JVM 안에서만 동작합니다. 여러 인스턴스가 같은 DB row를 바꾸면 각 JVM의 lock은 서로를 모르므로 DB constraint, row lock, optimistic version 같은 공유 기준이 필요합니다."],
    [/낙관적 락 충돌/, "사용자에게는 '이미 변경된 데이터'로 안내하고 최신 상태를 다시 읽게 합니다. 자동 재시도는 안전한 계산일 때만 하고, 금액·재고 같은 상태는 명시적 재확인이 필요합니다."],
    [/unique constraint.*비즈니스/, "비즈니스 검증은 좋은 오류와 UX를 위한 1차 방어이고, unique constraint는 race condition을 막는 최종 방어입니다. DB 예외는 domain error로 매핑해야 합니다."],
    [/timeout.*길/, "timeout이 너무 길면 thread와 connection이 오래 붙잡혀 pool starvation이 생깁니다. 장애 의존성을 기다리느라 정상 요청까지 줄줄이 느려지는 cascading failure로 이어집니다."],
    [/client timeout.*server.*성공/, "클라이언트는 실패로 봤지만 서버는 성공했을 수 있으므로 상태 조회나 idempotency key가 필요합니다. 재시도 시 같은 결과로 수렴해야 중복 결제나 중복 생성이 없습니다."],
    [/retry.*몇 번/, "정답 숫자는 없고 latency budget과 하류 SLO 안에서 정합니다. 보통 짧은 timeout, 적은 횟수, jitter, retry budget을 두고 non-idempotent 요청은 기본 재시도하지 않습니다."],
    [/항상 분리/, "작은 CRUD에서는 과한 계층 분리가 비용이 될 수 있습니다. 다만 외부 API 계약과 entity 노출은 호환성·보안 문제가 크므로 response DTO는 일찍 분리하는 편이 안전합니다."],
    [/작은 crud/, "작은 CRUD에서는 도메인 모델과 entity를 과하게 나누기보다, 변경 이유가 실제로 갈라질 때 분리합니다. 그래도 API response와 DB entity 직접 노출은 조심해야 합니다."],
    [/dto projection/, "목록 조회처럼 필요한 필드가 제한적이고 연관 로딩 비용이 큰 경우 DTO projection이 유리합니다. 변경 추적이 필요한 command 흐름에는 entity 로딩이 더 적합합니다."],
    [/cursor/, "cursor에는 안정적인 정렬 키와 tie-breaker를 넣습니다. 예를 들어 created_at만 쓰지 말고 created_at,id 조합처럼 중복 정렬값에서도 순서가 안정적인 값을 씁니다."],
    [/정렬 기준.*여러/, "복합 정렬 순서와 같은 방향의 복합 인덱스를 고려합니다. cursor도 정렬 컬럼들을 함께 담아 다음 페이지 조건을 정확히 재현해야 합니다."],
    [/총 개수/, "항상 필요하지 않습니다. count가 비싸면 hasNext, estimated count, 비동기 count를 고려하고, UX가 정말 총 개수를 요구하는지 확인합니다."],
    [/pending/, "긴 처리나 외부 의존성이 있으면 pending을 보여주는 것이 더 정직합니다. 대신 사용자가 상태를 조회하거나 알림을 받을 수 있어야 하고, 만료·실패 상태도 정의해야 합니다."],
    [/보상 트랜잭션/, "rollback은 커밋 전 원복이고, 보상 트랜잭션은 이미 커밋된 사실을 의미적으로 되돌리는 새 작업입니다. 그래서 보상도 멱등해야 하고 audit에 남아야 합니다."],
    [/재처리 버튼/, "운영자나 권한 있는 actor에게만 허용하고, 재처리 범위·idempotency·audit log를 강제해야 합니다. 사용자가 누르는 재시도와 운영 재처리는 권한과 부작용이 다릅니다."],
    [/dashboard/, "모든 작은 변경에 새 dashboard가 필요한 것은 아니지만 기존 dashboard에서 볼 metric이나 log field는 있어야 합니다. 상태 변경·결제·권한 기능은 release health 지표가 필요합니다."],
    [/rollback.*db 변경/, "DB 변경은 expand-migrate-contract로 되돌릴 수 있는 중간 상태를 만들어야 합니다. 이미 destructive change가 들어갔다면 rollback보다 forward migration과 data repair 계획이 필요합니다."],
    [/로그 필드/, "traceId, actor, tenant, resource, action, decision, error code처럼 원인 좁히기에 필요한 필드만 구조화합니다. PII와 high-cardinality metric label은 피합니다."],
    [/csrf와 cors|same 문제/, "CSRF는 사용자의 인증 상태를 악용한 상태 변경 공격이고, CORS는 브라우저의 cross-origin 읽기 제한 정책입니다. CORS 설정이 안전해도 CSRF 방어는 별도로 필요합니다."],
    [/samesite/, "SameSite=Lax는 많은 CSRF를 줄이지만 모든 흐름을 완전히 막지는 못합니다. 민감한 상태 변경에는 CSRF token, origin 검증, 재인증 같은 방어를 함께 둡니다."],
    [/authorization header/, "Bearer token을 JS가 직접 붙이는 구조는 쿠키 자동 전송 CSRF 위험은 줄지만 XSS로 token이 탈취될 위험이 커집니다. 저장 위치와 XSS 방어를 같이 봐야 합니다."],
    [/allow credentials/, "credentials 허용 상태에서 origin을 넓게 열면 다른 origin이 인증 쿠키를 동반한 요청 결과를 읽을 수 있습니다. 정확한 allowlist와 Vary: Origin 처리가 필요합니다."],
    [/jwt 즉시 무효화/, "짧은 access token만으로는 즉시 무효화가 어렵습니다. revoke list, token version, session store, refresh token rotation으로 서버 측 차단 상태를 둬야 합니다."],
    [/refresh token.*어디/, "브라우저에서는 HttpOnly Secure SameSite 쿠키가 일반적으로 안전합니다. 모바일은 secure storage를 쓰고, 서버에는 hash된 token family와 device 정보를 저장합니다."],
    [/토큰 탈취/, "refresh token 재사용 탐지, unusual IP/device, impossible travel, token family invalidation, audit event로 탐지합니다. 탐지 후에는 관련 세션 revoke와 사용자 알림이 필요합니다."],
    [/pepper/, "pepper는 애플리케이션 외부 secret으로 추가 방어를 주지만 운영 복잡도가 생깁니다. KMS/secret manager와 rotation 절차가 있을 때 의미가 있습니다."],
    [/재설정 링크/, "짧은 TTL, 단회성, 충분한 entropy, 서버 저장 hash, 사용 후 폐기, 계정 정보 노출 없는 응답이 필요합니다. 비밀번호 변경 후 기존 세션 폐기도 고려합니다."],
    [/로그인 실패 제한/, "계정 기준과 IP/디바이스 기준을 조합하고, 정상 사용자 lockout을 줄이기 위해 progressive delay, CAPTCHA, risk-based MFA를 씁니다."],
    [/관리자면 모든 데이터/, "관리자라도 업무 목적, tenant scope, approval, reason code, audit가 필요합니다. role=admin 하나로 전체 데이터 접근을 열면 내부자 오남용을 막기 어렵습니다."],
    [/정책.*코드/, "작은 서비스는 코드 정책도 가능하지만 정책이 자주 바뀌거나 복잡하면 decision table, policy engine, 테스트 fixture로 분리하는 것이 낫습니다."],
    [/정책 변경/, "허용 케이스보다 forbidden, foreign tenant, expired session, privilege escalation negative test를 먼저 고정합니다. 정책 변경 PR에는 audit event 변화도 봅니다."],
    [/signed url/, "signed URL도 권한 체크를 대체하지 못합니다. 생성 시 actor/tenant/scope를 묶고 TTL을 짧게 하며 다운로드 시 audit와 가능하면 resource scope를 재검증합니다."],
    [/export 파일.*보관/, "업무 필요 최소 기간만 보관하고 TTL 만료 후 삭제합니다. PII 포함 여부, 고객 계약, 감사 요구, 재다운로드 필요성을 기준으로 보존 기간을 정합니다."],
    [/대량 다운로드/, "tenant별 export volume, 시간대, actor role, reason code, IP/device를 기준으로 이상 탐지합니다. 임계 초과 시 step-up auth나 approval을 요구합니다."],
    [/서명은 맞지만 같은 event/, "서명은 원천 확인일 뿐 중복 방지가 아닙니다. event id ledger와 business unique constraint로 이미 처리된 event를 no-op 처리해야 합니다."],
    [/provider.*재전송/, "일시 실패면 5xx로 재전송을 유도하고, 이미 처리된 event면 2xx로 응답해 재전송을 멈춥니다. 내부 결과는 event ledger에서 조회합니다."],
    [/webhook 순서/, "event version이나 aggregate sequence를 확인하고 오래된 event는 discard하거나 보정합니다. 순서가 중요한 경우 aggregate key partitioning이나 state machine이 필요합니다."],
    [/audit log.*개인정보/, "증명에 필요한 식별자와 최소 정보만 남기고 민감값은 masking/tokenization합니다. 원문 PII를 audit에 남기면 audit 자체가 보호 대상이 됩니다."],
    [/관리자.*audit log.*지우/, "append-only storage, 제한된 삭제 권한, 별도 sink, hash chain 또는 export 보존으로 변조 저항성을 둡니다. 삭제 요청도 audit 대상입니다."],
    [/감사 로그.*사고 범위/, "actor, tenant, resource, action, time range, decision 필드로 영향 범위를 쿼리합니다. request id와 export id가 있으면 관련 로그와 DB 상태를 연결할 수 있습니다."],
    [/nat 환경/, "여러 사용자가 같은 IP를 공유해 정상 사용자가 같이 막힐 수 있습니다. IP만 보지 말고 account, device, tenant, endpoint cost 기준을 조합합니다."],
    [/로그인 rate limit/, "로그인은 credential stuffing 방어가 핵심이라 계정·IP·device·실패 횟수를 봅니다. 일반 API rate limit은 비용, abuse, tenant quota를 더 봅니다."],
    [/fail-open/, "인증/결제처럼 남용 위험이 크면 fail-closed가 맞을 수 있고, 조회성 저위험 기능은 fail-open이나 degraded mode가 가능합니다. 사용자 영향과 보안 위험의 trade-off입니다."],
    [/모듈 경계.*강제/, "package rule, build dependency rule, architecture test, module API만 허용하는 규칙으로 강제합니다. 문서만으로는 시간이 지나며 경계가 무너집니다."],
    [/모듈러 모놀리스.*한계/, "팀별 독립 배포가 자주 필요하거나 장애 격리, 독립 스케일, 데이터 소유권 요구가 커지면 한계가 옵니다. 변경 충돌과 배포 대기 시간이 지표입니다."],
    [/첫 분리 대상/, "변경 이유가 독립적이고 데이터 소유권이 명확하며 장애 격리 효과가 큰 경계를 고릅니다. 공유 DB를 바로 찢기보다 모듈 API와 read model부터 만듭니다."],
    [/공통 dto/, "공통 DTO는 consumer와 producer를 같은 배포 리듬에 묶을 수 있습니다. 외부 계약은 schema version과 backward compatibility로 관리하는 편이 안전합니다."],
    [/버전 호환성/, "additive change를 기본으로 하고 breaking change는 새 version이나 deprecation window를 둡니다. consumer contract test로 실제 소비자 호환성을 검증합니다."],
    [/전체 배포를 강제/, "독립 배포라는 서비스 분리의 이점을 잃습니다. 공유 라이브러리 변경이 모든 서비스를 동시에 배포하게 만들면 분산 모놀리스 신호입니다."],
    [/조회 모델.*갱신/, "이벤트 consumer나 CDC로 갱신하고 projection lag를 metric으로 봅니다. 재처리와 reconciliation이 가능해야 장애 후 read model을 복구할 수 있습니다."],
    [/projection lag/, "사용자에게 pending, updating, last updated 같은 상태를 보여주거나 강한 일관성이 필요한 화면은 primary model을 읽습니다. UX가 lag를 허용해야 합니다."],
    [/command model.*query model/, "command invariant test와 query projection test를 분리하고, end-to-end에서는 command 후 projection 수렴을 검증합니다. reconciliation query도 필요합니다."],
    [/이벤트를 수정/, "이미 발행된 이벤트는 사실 기록이므로 직접 수정하지 않습니다. 보정 이벤트를 추가하거나 replay 전략을 세우고, schema evolution은 versioning으로 처리합니다."],
    [/snapshot/, "이벤트가 많아지면 매번 처음부터 재생하는 비용이 커집니다. snapshot은 특정 시점 상태를 저장해 복구 시간을 줄이지만 snapshot 호환성도 관리해야 합니다."],
    [/이벤트 스키마/, "필드 추가는 소비자가 무시 가능하게 하고, 삭제나 의미 변경은 새 version/event type을 둡니다. producer와 consumer contract test가 필요합니다."],
    [/알림 발송/, "알림 발송은 보통 핵심 transaction 밖의 후처리라 비동기가 적합합니다. 실패해도 주문이나 결제가 실패하지 않게 DLQ와 재시도 정책을 둡니다."],
    [/결제.*비동기/, "사용자에게 즉시 확정이 필요한 단계와 provider confirm 후 확정되는 단계를 나눕니다. pending 상태와 webhook/idempotency/reconciliation이 있으면 비동기 수렴 모델이 가능합니다."],
    [/비동기 결과.*ui/, "pending 상태, 진행률, 알림, 재시도 가능 상태를 명시합니다. 사용자가 새로고침해도 상태를 조회할 수 있는 job id나 resource state가 필요합니다."],
    [/read-only 공유 db/, "단기 전환 단계에서는 가능하지만 장기적으로 schema coupling과 부하 전파가 생깁니다. 안정적인 API나 read model로 옮기는 계획이 필요합니다."],
    [/dual write/, "가능하면 outbox, CDC, source-of-truth 이벤트로 피합니다. 불가피한 전환 중 dual write는 기간, 검증 쿼리, rollback stop point를 엄격히 둡니다."],
    [/데이터 복제 불일치/, "source-of-truth와 replica/read model을 비교하는 reconciliation query를 돌립니다. mismatch는 자동 보정 가능 여부와 audit 필요성을 나눠 처리합니다."],
    [/adr.*갱신/, "결정 owner나 해당 도메인 owner가 갱신합니다. 관련 SLO, 팀 구조, 장애 이력이 바뀌면 ADR 상태를 superseded/deprecated로 바꿔야 합니다."],
    [/결정이 틀렸/, "재검토 trigger가 발생했는지 봅니다. 예를 들어 lag, incident count, deploy conflict, cost가 기준을 넘으면 기존 결정을 바꿀 근거가 됩니다."],
    [/재검토 주기/, "중요 ADR은 분기별 또는 큰 incident/migration 후 재검토합니다. 주기보다 중요한 것은 metric 기반 trigger를 명시하는 것입니다."],
    [/acl이 과한/, "외부 모델이 단순하고 내부 도메인에 장기 오염을 만들지 않으면 얇은 adapter로 충분합니다. 변환 로직이 거의 없는데 ACL을 크게 만들면 의식 비용만 늘어납니다."],
    [/외부 api 필드명/, "외부 필드가 내부 도메인 언어를 지배하면 provider 변경이나 의미 차이가 도메인 전체에 퍼집니다. boundary에서 내부 용어로 번역해야 합니다."],
    [/레거시 상태 코드/, "adapter나 ACL에서 새 도메인 상태로 번역합니다. 핵심 도메인 로직이 레거시 code table을 직접 알면 전환 비용이 커집니다."],
    [/복합 인덱스/, "동등 조건, 범위 조건, 정렬 조건 순서와 selectivity를 함께 봅니다. 가장 왼쪽 prefix 원칙과 실제 query pattern이 기준입니다."],
    [/사용하지 않는 인덱스/, "pg_stat_user_indexes 같은 사용 통계, write overhead, 최근 배포 이후 기간을 함께 봅니다. 바로 지우지 말고 영향 쿼리와 rollback 계획을 둡니다."],
    [/insert.*느려/, "인덱스마다 새 entry를 써야 하고 page split, WAL, lock 비용이 늘어납니다. 쓰기 많은 테이블에서는 인덱스 추가가 latency와 bloat를 키울 수 있습니다."],
    [/read committed/, "non-repeatable read나 lost update 같은 문제가 생길 수 있습니다. 도메인 불변식이 이를 허용하지 않으면 version check나 lock이 필요합니다."],
    [/serializable/, "동시 트랜잭션 충돌을 DB가 abort할 수 있으므로 애플리케이션 retry가 필요합니다. 그냥 격리 수준만 올리면 사용자 오류가 늘 수 있습니다."],
    [/repeatable read/, "DB마다 구현이 다릅니다. PostgreSQL의 MVCC snapshot과 MySQL InnoDB의 gap lock 등 실제 동작 차이를 문서와 fixture로 확인해야 합니다."],
    [/deadlock.*lock wait/, "deadlock은 순환 대기라 DB가 한쪽을 abort하고, lock wait timeout은 오래 기다리다 제한 시간으로 실패합니다. 대응은 retry뿐 아니라 lock 순서와 트랜잭션 길이 개선입니다."],
    [/항상 retry/, "항상은 아닙니다. 멱등하고 짧은 transaction은 retry 가능하지만 외부 side effect가 섞이면 중복 부작용을 먼저 막아야 합니다."],
    [/락 순서/, "같은 기능군에서 resource를 항상 같은 순서로 update하도록 표준화합니다. 예를 들어 account id 오름차순으로 lock을 잡는 식의 규칙을 둡니다."],
    [/not null/, "nullable 컬럼 추가, backfill, application write/read 전환, validation 확인 후 NOT NULL constraint를 추가합니다. 큰 테이블에서는 lock과 rewrite 영향을 확인해야 합니다."],
    [/backfill.*부하/, "batch size, sleep, off-peak, progress checkpoint, lock timeout을 둡니다. replication lag와 DB CPU를 보며 속도를 조절합니다."],
    [/구버전 앱/, "구버전 앱이 새 schema를 모르거나 옛 필드만 쓸 수 있습니다. expand-contract 기간에는 양쪽 버전이 모두 읽고 쓸 수 있어야 합니다."],
    [/권한 정보.*캐시/, "권한은 stale 위험이 커서 TTL을 짧게 하거나 versioned key, revoke signal을 둬야 합니다. 강한 일관성이 필요한 권한 변경 직후에는 원본을 읽는 편이 안전합니다."],
    [/ttl jitter/, "인기 키가 같은 시점에 만료되면 DB로 요청이 몰립니다. TTL에 무작위 지터를 넣어 만료 시점을 분산합니다."],
    [/stale data/, "도메인별 허용 시간을 정해야 합니다. 통계는 분 단위 stale이 가능하지만 결제 상태나 권한은 stale 허용 범위가 거의 없습니다."],
    [/aof/, "AOF도 fsync 정책과 장애 시점에 따라 손실 가능성이 있습니다. Redis persistence는 위험을 줄이지만 RDBMS 같은 transaction durability와 동일하지 않습니다."],
    [/redis failover.*lock/, "failover 중 lock write가 복제되지 않았거나 중복 획득될 수 있습니다. 중요한 정합성은 DB constraint와 idempotency로 최종 방어해야 합니다."],
    [/세션 저장소/, "세션은 재로그인으로 복구 가능하고 TTL이 있는 임시 상태라 Redis와 잘 맞습니다. 그래도 장애 시 로그인 영향과 session revoke 정책은 설계해야 합니다."],
    [/검증 쿼리.*부하/, "운영 부하를 고려해 샘플링, replica, off-peak, batch 범위로 실행합니다. 그래도 migration이나 비동기 수렴에는 검증 쿼리가 필요합니다."],
    [/불일치.*자동 보정/, "금액·권한처럼 민감한 데이터는 자동 보정보다 검토와 audit가 필요할 수 있습니다. 안전한 파생 데이터는 자동 repair job으로 처리할 수 있습니다."],
    [/source of truth/, "쓰기 owner와 법적/비즈니스 원장을 기준으로 정합니다. 여러 시스템이 원본을 주장하면 reconciliation이 아니라 ownership 문제가 먼저입니다."],
    [/pool wait/, "pool wait는 connection을 빌리기 전 대기 시간이고 query time은 DB 실행 시간입니다. pool wait가 높으면 connection 수, query duration, transaction 길이를 함께 봅니다."],
    [/서버를 늘리면 db connection/, "인스턴스 수만큼 총 connection이 늘어 DB max connection을 압박합니다. app pool size와 replica/pgbouncer 같은 중간 계층을 함께 봐야 합니다."],
    [/hikaricp/, "active, idle, pending, acquire time, usage time, timeout count를 봅니다. pending과 acquire time이 오르면 pool starvation 가능성이 큽니다."],
    [/모든 api.*slo/, "중요도에 따라 다르게 둡니다. 결제·로그인 같은 critical path와 관리자 통계 API는 latency와 availability 목표가 달라야 합니다."],
    [/내부 batch.*slo/, "사용자 요청이 아니어도 마감 시간, 데이터 신선도, downstream 영향이 있으면 SLO가 필요합니다. 예를 들어 정산 batch는 completion freshness가 SLI가 됩니다."],
    [/slo 위반.*장애/, "항상 같지는 않습니다. SLO 위반은 사용자 영향 가능성을 나타내는 신호이고, 장애 선언은 영향 범위와 대응 필요성까지 판단한 운영 결정입니다."],
    [/db가 잠깐 느리면 readiness/, "핵심 DB가 완전히 불가하면 readiness 실패가 맞을 수 있지만, 짧은 지연마다 트래픽을 빼면 flapping이 생깁니다. threshold와 hysteresis가 필요합니다."],
    [/liveness.*외부 api/, "외부 API 장애 때문에 내 프로세스를 재시작하면 불필요한 restart storm이 생깁니다. liveness는 프로세스 생존, readiness는 의존성 준비 상태를 봅니다."],
    [/startup probe/, "초기 로딩이 긴 앱이 liveness에 의해 계속 재시작되는 것을 막을 때 씁니다. migration, warmup, large cache load가 있는 앱에 유용합니다."],
    [/warning과 page/, "page는 즉시 사람 행동이 필요한 사용자 영향 또는 데이터 손실 위험에 씁니다. warning은 추세 관찰이나 업무 시간 내 처리 가능한 신호로 둡니다."],
    [/알림 임계값/, "SLO, historical baseline, incident history를 기준으로 owner가 정하고 조정합니다. 임의 CPU 80% 같은 원인 후보 임계값은 노이즈가 되기 쉽습니다."],
    [/한밤중/, "즉시 조치가 필요 없거나 자동 복구되는 단발성 warning은 깨우면 안 됩니다. sustained user impact나 data loss risk만 page합니다."],
    [/open, half_open/, "OPEN은 호출 차단, HALF_OPEN은 일부 요청으로 회복 여부를 시험하는 상태입니다. 성공하면 CLOSED로 돌아가고 실패하면 다시 OPEN으로 갑니다."],
    [/circuit open.*사용자/, "기능별 fallback을 보여줍니다. 읽기 기능은 cached/stale 표시, 쓰기 기능은 일시 불가와 재시도 안내를 주고 silent failure는 피합니다."],
    [/fallback.*stale/, "stale임을 표시하거나 도메인이 허용하는 범위에서만 씁니다. 결제·권한처럼 최신성이 중요한 데이터에는 stale fallback이 위험합니다."],
    [/queue.*worker/, "worker를 늘리면 downstream DB나 API를 더 압박할 수 있습니다. lag 원인이 CPU인지 partition skew인지 downstream saturation인지 먼저 봐야 합니다."],
    [/load shedding/, "시스템 보호를 위해 낮은 우선순위 요청을 거절하거나 지연시키는 전략입니다. 핵심 경로를 살리기 위해 추천·통계·비필수 batch부터 줄입니다."],
    [/낮은 우선순위/, "비즈니스 중요도, 사용자 대면 여부, 재처리 가능성, 마감 시간으로 나눕니다. 주문/로그인과 분석 batch는 같은 우선순위가 아닙니다."],
    [/runbook.*업데이트/, "incident 후, 알림 변경 후, 수동 조치가 반복된 후 업데이트합니다. postmortem action item에 runbook 수정이 포함되어야 합니다."],
    [/자동화와 수동/, "반복적이고 판정 기준이 명확한 조치는 자동화하고, 데이터 손실 위험이나 고객 영향 판단이 필요한 조치는 승인 단계를 둡니다."],
    [/위험한 명령/, "dry-run, 대상 환경 표시, confirmation, backup, readback 검증을 둡니다. 삭제·권한 변경·migration 명령은 특히 guardrail이 필요합니다."],
    [/business metric/, "기술 지표가 정상이어도 결제 성공률, 가입 전환, 주문 생성 수가 깨질 수 있습니다. 사용자가 실제로 목표를 달성했는지 보는 지표입니다."],
    [/canary.*전체/, "canary cohort가 작거나 특정 tenant/region/payload를 포함하지 않으면 전체 배포 후 문제가 드러날 수 있습니다. segment coverage를 확인해야 합니다."],
    [/trace.*로그/, "trace는 span과 latency 경로를 보여주지만 세부 decision이나 domain state는 로그가 더 잘 담습니다. 둘을 traceId로 연결해야 합니다."],
    [/모든 요청.*sampling/, "비용 때문에 모든 요청을 full trace하지 않을 수 있습니다. 오류, high latency, critical route는 tail-based sampling이나 높은 sampling rate를 둡니다."],
    [/pii.*로그/, "PII는 기본적으로 남기지 않거나 masking/tokenization합니다. 필요한 경우 접근 권한, 보존 기간, 삭제 정책을 audit와 함께 둡니다."],
    [/trace id.*끊/, "gateway, async producer/consumer, HTTP client, message header 전파 지점을 확인합니다. 끊긴 boundary에 instrumentation을 추가해야 합니다."],
    [/arg와 env/, "ARG는 build time 변수이고 image layer/history에 남을 수 있습니다. ENV는 runtime 환경 변수지만 image에 박으면 역시 노출 위험이 있어 secret에는 둘 다 조심해야 합니다."],
    [/push된 secret/, "파일 삭제만으로는 history와 이미 배포된 artifact에 남습니다. 즉시 revoke/rotate하고, repo history와 image registry, CI log까지 스캔해야 합니다."],
    [/secret rotation/, "새 secret 발급, 애플리케이션 dual-read 또는 순차 배포, old secret revoke, 실패 모니터링 순서로 진행합니다. 영향 범위도 audit해야 합니다."],
    [/memory limit.*heap/, "컨테이너 limit 안에 heap, metaspace, direct memory, thread stack, native memory가 모두 들어가야 합니다. heap만 limit까지 잡으면 OOMKilled가 날 수 있습니다."],
    [/oom과 gc thrashing/, "OOM은 메모리 할당 실패나 cgroup kill이고, GC thrashing은 회수할 메모리가 적어 GC 시간이 급증하는 상태입니다. GC log와 container event를 함께 봅니다."],
    [/재시작하면 해결/, "메모리나 connection leak은 재시작으로 일시 회복됩니다. 하지만 leak 원인과 증가율을 잡지 않으면 다시 같은 주기로 장애가 납니다."],
    [/frontend env/, "프론트 env는 build artifact에 박히는 경우가 많아 runtime 변경이 어렵고 secret을 넣으면 노출됩니다. 백엔드는 runtime secret store로 주입할 수 있습니다."],
    [/기본값.*코드/, "운영 필수값에 위험한 기본값을 넣으면 누락을 숨깁니다. fail-fast로 부팅을 막고 redacted config dump로 누락을 찾는 편이 안전합니다."],
    [/설정 drift/, "IaC, config repo, environment diff check, startup config fingerprint로 막습니다. 수동 콘솔 변경은 ticket과 PR로 회수해야 합니다."],
    [/upstream health.*502/, "health check 경로는 정상이어도 특정 route, header, body size, protocol mismatch에서 502가 날 수 있습니다. 실제 실패 request와 upstream log를 봐야 합니다."],
    [/proxy_read_timeout/, "NGINX가 upstream 응답을 기다리는 시간입니다. 앱 처리가 이 시간을 넘으면 504가 날 수 있고, 무작정 늘리면 thread 점유가 길어질 수 있습니다."],
    [/large body/, "client_max_body_size, proxy buffering, upstream timeout, app multipart limit, disk temp path를 봅니다. 업로드는 streaming과 size limit 정책도 필요합니다."],
    [/squash merge/, "작은 PR이나 noisy commit 정리에 유리합니다. 하지만 bisect와 단계별 revert가 필요한 migration/refactor는 논리 커밋을 유지하는 편이 낫습니다."],
    [/revert.*쉬운 pr/, "기능 변경과 refactor가 분리되고, schema change가 backward-compatible하며, feature flag가 있으면 revert가 쉽습니다. 데이터 파괴 변경은 revert가 어렵습니다."],
    [/migration 포함 pr/, "expand schema, application write/read change, backfill, contract cleanup을 나눕니다. 한 PR에 모두 넣으면 rollback 지점이 사라집니다."],
    [/hotfix/, "hotfix는 source-controlled 변경을 빠르게 배포하는 것이고, 임시 조치는 운영 환경에서 직접 완화하는 것입니다. 임시 조치는 반드시 PR로 회수해야 합니다."],
    [/vi로 수정/, "수정 전 백업과 diff를 남기고, 같은 변경을 repo/IaC에 반영한 PR을 만듭니다. 운영 서버의 수동 상태가 source of truth가 되면 drift가 생깁니다."],
    [/누가 승인/, "영향 범위에 따라 service owner, on-call incident commander, security/data owner가 승인합니다. 권한·데이터·고객 영향 변경은 단독 판단하지 않습니다."],
    [/hash가 달라/, "같은 source에서 다른 artifact가 나오면 재현성과 rollback 신뢰가 깨집니다. timestamp, dependency latest, non-deterministic build input을 확인해야 합니다."],
    [/dependency latest/, "빌드 시점마다 다른 버전이 들어와 예측 불가능합니다. lockfile과 digest pinning으로 같은 입력에서 같은 artifact가 나오게 해야 합니다."],
    [/artifact.*commit/, "release metadata에 commit SHA, build id, artifact digest, deploy time을 남깁니다. 장애 시 어떤 코드가 실행 중인지 바로 알아야 합니다."],
    [/timezone/, "날짜 경계, 만료, 정렬, 스냅샷 테스트가 환경별 timezone에 따라 달라질 수 있습니다. UTC 고정과 clock injection을 사용합니다."],
    [/캐시를 지우면/, "dependency cache나 build cache가 문제를 숨겼다는 뜻일 수 있습니다. clean install 로그와 cache key, lockfile 변화, generated artifact를 비교합니다."],
    [/flaky test/, "같은 환경에서 반복 실패/성공하면 flaky 가능성이 크고, 특정 환경에서만 실패하면 env diff 가능성이 큽니다. seed, time, order dependency를 확인합니다."],
    [/singleton bean/, "singleton은 인스턴스가 하나라는 뜻이지 내부 상태가 thread-safe하다는 뜻이 아닙니다. mutable shared field가 있으면 동시 요청이 서로 영향을 줄 수 있습니다."],
    [/prototype scope/, "상태가 있는 객체를 매번 새로 만들어야 할 때 쓰지만 service layer에서 남용하면 lifecycle 관리가 복잡해집니다. 대부분은 stateless singleton이 낫습니다."],
    [/threadlocal/, "request 종료 후 clear하지 않으면 thread pool 재사용 때문에 다른 요청에 값이 새어 나갈 수 있습니다. async 전파도 별도 처리가 필요합니다."],
    [/osiv를 끄면/, "view/controller 이후 lazy loading이 불가능해져 service에서 필요한 데이터를 명시적으로 fetch해야 합니다. 대신 view layer에서 예측 못 한 쿼리가 터지는 것을 막습니다."],
    [/entitygraph/, "fetch join은 query에 직접 fetch 전략을 박고, EntityGraph는 재사용 가능한 fetch plan으로 쓸 수 있습니다. pagination, 중복 row, 복잡도에 따라 고릅니다."],
    [/dto projection.*lazy/, "처음부터 필요한 컬럼만 select하므로 lazy association을 건드리지 않습니다. 조회 전용 화면에서 N+1과 불필요한 entity hydration을 줄입니다."],
    [/dirty checking.*bulk/, "dirty checking은 영속성 컨텍스트의 entity 변경을 flush하는 방식이고, bulk update는 DB에 직접 실행되어 context의 entity snapshot을 갱신하지 않습니다."],
    [/bulk delete/, "bulk delete도 영속성 컨텍스트와 2차 캐시를 우회할 수 있습니다. 삭제된 entity가 context에 남아 있으면 이후 로직이 stale state를 볼 수 있습니다."],
    [/캐시.*무효화/, "bulk update/delete 대상 entity의 1차 context를 clear하고, 2차 캐시나 application cache key도 무효화해야 합니다. 아니면 DB와 cache가 갈라집니다."],
    [/audit log.*requires_new/, "outer transaction이 rollback돼도 audit가 남는 장점이 있지만 connection을 추가로 쓰고, 실패한 비즈니스 작업의 audit 의미를 명확히 해야 합니다."],
    [/connection pool.*영향/, "REQUIRES_NEW는 기존 transaction connection을 붙잡은 채 새 connection을 빌릴 수 있어 pool pressure를 키웁니다. 중첩 호출이 많으면 starvation이 생길 수 있습니다."],
    [/outer rollback.*inner commit/, "REQUIRES_NEW inner transaction은 이미 commit됐으면 outer rollback과 독립적으로 유지됩니다. 이 독립성이 필요한지, 불일치로 보일 위험은 없는지 판단해야 합니다."],
    [/rollbackfor=exception/, "모든 checked exception까지 rollback하면 복구 가능한 흐름이나 알림성 예외도 롤백될 수 있습니다. 예외 의미별로 rollback 정책을 정하는 편이 낫습니다."],
    [/비즈니스 예외/, "상태 변경을 무효화해야 하는 비즈니스 예외는 rollback 대상이고, 이미 기록해야 하는 거절 상태라면 rollback하지 않을 수 있습니다. 도메인 의미가 기준입니다."],
    [/예외를 잡아먹/, "예외를 catch하고 정상 반환하면 Spring은 rollback 필요를 모를 수 있습니다. rollbackOnly를 표시하거나 예외를 다시 던지고 테스트로 확인해야 합니다."],
    [/tomcat thread/, "Tomcat thread가 DB pool보다 너무 많으면 많은 요청이 connection 대기 상태가 됩니다. CPU, blocking 비율, DB pool, downstream capacity를 함께 맞춥니다."],
    [/virtual thread/, "blocking thread 비용은 줄이지만 DB connection, downstream limit, lock contention을 없애지는 못합니다. 하류 자원 한계는 그대로 관리해야 합니다."],
    [/blocked와 waiting/, "BLOCKED는 monitor lock 진입 대기이고 WAITING/TIMED_WAITING은 condition, sleep, IO, pool 대기일 수 있습니다. stack trace와 lock owner를 함께 봐야 합니다."],
    [/id가 null/, "영속화 전 id가 null이면 id 기반 equality가 불안정합니다. collection에 넣은 뒤 id가 생기면 hashCode가 바뀌는 문제를 피해야 합니다."],
    [/lombok @data/, "@Data는 모든 필드를 equals/hashCode/toString에 포함해 lazy loading, 순환 참조, mutable field 문제를 만들 수 있습니다. entity에는 명시적 구현이 안전합니다."],
    [/proxy와 class/, "Hibernate proxy는 실제 entity subclass처럼 보일 수 있어 getClass 비교가 깨질 수 있습니다. Hibernate.getClass나 business key 전략을 고려해야 합니다."],
    [/controller validation/, "Controller validation은 외부 입력 형식과 단순 제약을 담당하고, domain validation은 상태 전이와 불변식을 담당합니다. DB constraint는 동시성 최종 방어입니다."],
    [/중복 이메일/, "UX를 위해 service에서 먼저 확인하되, race를 막기 위해 DB unique constraint가 최종 방어해야 합니다. unique violation은 409나 domain error로 매핑합니다."],
    [/validation error contract/, "field, code, message, rejected reason을 일관되게 내려야 합니다. 내부 validator 이름이 아니라 클라이언트가 복구 가능한 error code가 중요합니다."],
  ];

  for (const [pattern, answer] of rules) {
    if (pattern.test(followup) || pattern.test(text)) {
      return answer;
    }
  }

  return `${firstSentence}. 이 꼬리질문에서는 ${evidence}를 근거로 성공 흐름뿐 아니라 실패했을 때의 상태와 검증 방법까지 답합니다.`;
}

function renderQuestion(question, index) {
  const code = `Q${String(index + 1).padStart(2, "0")}`;
  return `<section id="qa-${index + 1}">
<div class="ch-head"><span class="ch-code">${code}</span><h2>${escapeHtml(question.q)}</h2></div>
<p class="lede">${escapeHtml(question.answer)}</p>
<table>
<tr><th>꼬리질문</th><th>꼬리질문 답변</th></tr>
${question.followups.map((followup) => `<tr><td>${escapeHtml(followup)}</td><td>${escapeHtml(answerFollowup(followup, question))}</td></tr>`).join("\n")}
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
