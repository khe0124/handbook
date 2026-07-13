import { RoadmapPage, type RoadmapProcessStep, type RoadmapTrack } from "./RoadmapPage";

const diagram = `
flowchart TD
  A["01 도메인"] --> B["02 API·권한"]
  B --> C["03 데이터"]
  C --> D["04 동시성"]
  D --> E["05 메시징"]
  E --> F["06 보안"]
  F --> G["07 관측"]
  G --> H["08 운영"]
  H --> A
`;

const process: RoadmapProcessStep[] = [
  {
    title: "도메인 분석",
    output: "bounded context, aggregate, command, query, invariant, 예외 정책을 서비스 언어로 정리한다.",
    checks: ["테이블부터 만들지 않는다", "정책과 예외가 유스케이스에 드러난다", "같은 단어가 다른 규칙을 갖는 영역을 분리한다", "깨지면 안 되는 규칙이 DB constraint 후보까지 내려간다"],
    handoff: "API 계약과 트랜잭션 경계를 정하는 기준이 된다.",
  },
  {
    title: "계약 설계",
    output: "API, error code, auth scope, idempotency, pagination, versioning, deprecation 정책을 클라이언트와 합의한다.",
    checks: ["실패 응답이 성공 응답만큼 명확하다", "권한 실패와 validation 실패가 구분된다", "old client가 깨지지 않는 호환성 기준이 있다", "retry 가능한 요청과 불가능한 요청이 나뉜다"],
    handoff: "contract test, 프론트 fixture, 문서화 기준으로 이어진다.",
  },
  {
    title: "데이터 안정성",
    output: "schema, index, transaction boundary, lock, migration, backup/restore, backfill 계획을 함께 설계한다.",
    checks: ["정합성 기준이 애플리케이션 코드에만 의존하지 않는다", "rollback과 재처리 경로가 있다", "큰 테이블 변경은 expand-contract 순서로 나뉜다", "index 추가가 write cost와 lock 시간을 함께 본다"],
    handoff: "런타임 timeout, queue, cache 정책의 제약 조건이 된다.",
  },
  {
    title: "런타임 구현",
    output: "thread, pool, timeout, retry, circuit breaker, queue, cache 정책을 부하 조건과 장애 전파 기준에 연결한다.",
    checks: ["retry가 중복 실행을 만들지 않는다", "timeout 예산이 호출 체인 전체로 계산된다", "pool exhaustion과 queue backlog가 지표로 잡힌다", "cache stale 허용 범위와 invalidation 조건이 명확하다"],
    handoff: "load test와 observability 설계의 측정 지점이 된다.",
  },
  {
    title: "검증과 보안",
    output: "unit, integration, contract, load, security test, audit log 검증을 release gate로 묶는다.",
    checks: ["테스트 DB와 실제 DB 차이를 인지한다", "인증·인가·감사 로그가 함께 검증된다", "권한 우회·mass assignment·injection 케이스가 포함된다", "부하 테스트가 p95 latency와 saturation point를 남긴다"],
    handoff: "배포 전략과 장애 대응 runbook의 근거가 된다.",
  },
  {
    title: "운영 피드백",
    output: "log, metric, trace, alert, runbook, postmortem을 다음 설계 수정과 backlog 우선순위로 환류한다.",
    checks: ["장애 원인을 dashboard만 보고 좁힐 수 있다", "SLO 위반이 backlog 우선순위로 연결된다", "request id로 API, DB, downstream 호출이 이어진다", "postmortem action item이 코드·설정·운영 절차 중 어디에 반영될지 정해진다"],
    handoff: "다음 도메인 분석에서 병목, 장애, 비용 데이터를 같이 반영한다.",
  },
];

const tracks: RoadmapTrack[] = [
  {
    title: "인터넷과 API 기본기",
    intent: "백엔드의 입구를 HTTP 문법이 아니라 네트워크, 계약, 실패 의미로 이해한다.",
    nodes: [
      { id: "BE-01", title: "HTTP 의미론", why: "method, status, header, cache, redirect 의미가 API 계약의 기본 언어다.", artifacts: ["HTTP contract table"], failureSignals: ["모든 실패가 500"], evidence: ["status code test"], links: ["백엔드 핵심"] },
      { id: "BE-02", title: "REST와 RPC 선택", why: "resource 중심인지 action 중심인지에 따라 API 모양과 클라이언트 결합도가 달라진다.", artifacts: ["API style decision"], failureSignals: ["URL이 동사와 명사 혼합"], evidence: ["endpoint inventory"], links: ["백엔드 핵심"] },
      { id: "BE-03", title: "Error Contract", why: "오류 계약은 사용자 복구와 운영 triage의 공통 데이터다.", artifacts: ["error schema"], failureSignals: ["message string parsing"], evidence: ["4xx/5xx contract test"], links: ["백엔드 핵심"] },
      { id: "BE-04", title: "Pagination과 Filtering", why: "목록 API는 성능, UX, index, consistency를 동시에 건드린다.", artifacts: ["query policy"], failureSignals: ["offset이 커질수록 급격히 느림"], evidence: ["explain plan"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-05", title: "Versioning", why: "API 변경은 배포 순서, backward compatibility, client migration을 포함한다.", artifacts: ["compatibility matrix"], failureSignals: ["프론트 배포와 백엔드 배포가 lockstep"], evidence: ["old client contract test"], links: ["백엔드 아키텍처"] },
    ],
  },
  {
    title: "도메인과 애플리케이션 설계",
    intent: "비즈니스 규칙을 controller-service-repository 기계적 분리보다 먼저 모델링한다.",
    nodes: [
      { id: "BE-06", title: "Bounded Context", why: "같은 단어가 다른 규칙을 갖는 영역을 분리하지 않으면 모델이 오염된다.", artifacts: ["context map"], failureSignals: ["하나의 User가 모든 의미를 가짐"], evidence: ["ubiquitous language glossary"], links: ["백엔드 아키텍처"] },
      { id: "BE-07", title: "Use Case Boundary", why: "유스케이스는 transaction, authorization, validation, event 발행의 단위가 된다.", artifacts: ["use case spec"], failureSignals: ["service 메서드가 CRUD wrapper"], evidence: ["command/query list"], links: ["백엔드 아키텍처"] },
      { id: "BE-08", title: "Invariant", why: "절대 깨지면 안 되는 규칙은 DB constraint와 도메인 코드 양쪽에서 보호해야 한다.", artifacts: ["invariant catalog"], failureSignals: ["동시 요청에서 정책 깨짐"], evidence: ["concurrency test"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-09", title: "Layered Architecture", why: "계층은 파일 위치가 아니라 의존 방향과 변경 이유를 제한하는 장치다.", artifacts: ["dependency rule"], failureSignals: ["controller에서 repository 직접 접근"], evidence: ["architecture test"], links: ["백엔드 아키텍처"] },
      { id: "BE-10", title: "Module Boundary", why: "모듈 경계는 build, test, ownership, deployment 전략의 출발점이다.", artifacts: ["module map"], failureSignals: ["순환 의존"], evidence: ["dependency graph"], links: ["백엔드 아키텍처"] },
    ],
  },
  {
    title: "인증·인가·보안",
    intent: "로그인 구현을 넘어 신뢰 경계, 세션 수명, 권한 모델, 감사 가능성까지 설계한다.",
    nodes: [
      { id: "BE-11", title: "Authentication Flow", why: "credential, session, token, refresh, logout 경계가 보안 사고의 주된 표면이다.", artifacts: ["auth sequence"], failureSignals: ["refresh token 무기한 사용"], evidence: ["token lifecycle test"], links: ["백엔드 인증·보안"] },
      { id: "BE-12", title: "Authorization Model", why: "RBAC, ABAC, ownership check는 controller if문이 아니라 정책 모델이어야 한다.", artifacts: ["permission matrix"], failureSignals: ["목록은 보이는데 상세에서만 차단"], evidence: ["403 scenario test"], links: ["백엔드 인증·보안"] },
      { id: "BE-13", title: "Input Trust Boundary", why: "입력 검증은 DTO 모양 확인이 아니라 injection, mass assignment, business rule 보호다.", artifacts: ["validation policy"], failureSignals: ["클라이언트 hidden field 신뢰"], evidence: ["malicious payload test"], links: ["백엔드 인증·보안"] },
      { id: "BE-14", title: "Secret Management", why: "secret은 코드, log, image, CI, runtime 환경 전체에서 유출될 수 있다.", artifacts: ["secret inventory"], failureSignals: ["환경변수 dump에 토큰 노출"], evidence: ["secret scan report"], links: ["플랫폼 도구·운영 기본기"] },
      { id: "BE-15", title: "Audit Logging", why: "보안 이벤트는 사후 추적, 규정 대응, 이상 탐지의 기준점이다.", artifacts: ["audit event schema"], failureSignals: ["누가 무엇을 바꿨는지 모름"], evidence: ["audit query sample"], links: ["런타임 품질·장애대응"] },
    ],
  },
  {
    title: "데이터 모델과 저장소",
    intent: "DB를 persistence detail이 아니라 정합성, 쿼리 성능, 운영 변경의 중심으로 본다.",
    nodes: [
      { id: "BE-16", title: "Relational Modeling", why: "정규화, FK, unique constraint는 코드보다 강한 데이터 품질 방어선이다.", artifacts: ["ERD and constraint list"], failureSignals: ["중복 데이터 수동 정리"], evidence: ["constraint violation test"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-17", title: "Index Design", why: "index는 쿼리 패턴, cardinality, write cost를 함께 보고 설계한다.", artifacts: ["index decision log"], failureSignals: ["느리다고 인덱스만 계속 추가"], evidence: ["EXPLAIN ANALYZE diff"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-18", title: "Migration Strategy", why: "schema 변경은 expand-contract, backfill, rollback, deploy order가 핵심이다.", artifacts: ["migration runbook"], failureSignals: ["배포 중 column missing"], evidence: ["zero-downtime migration rehearsal"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-19", title: "NoSQL 선택", why: "NoSQL은 유행이 아니라 access pattern, consistency, scale, 운영 역량으로 선택한다.", artifacts: ["storage choice matrix"], failureSignals: ["join이 필요해진 document model"], evidence: ["query workload sample"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-20", title: "Cache Strategy", why: "cache는 성능 도구이면서 stale data와 invalidation 장애의 원인이다.", artifacts: ["cache policy"], failureSignals: ["DB 수정 후 화면 불일치"], evidence: ["invalidation test"], links: ["데이터 계층·저장소 심화"] },
    ],
  },
  {
    title: "트랜잭션과 동시성",
    intent: "정합성 문제를 운이 아니라 isolation, lock, idempotency, retry 설계로 통제한다.",
    nodes: [
      { id: "BE-21", title: "Transaction Boundary", why: "트랜잭션 경계는 유스케이스 불변식과 외부 I/O 분리를 기준으로 잡는다.", artifacts: ["transaction map"], failureSignals: ["외부 API 호출을 DB transaction 안에서 수행"], evidence: ["rollback scenario test"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-22", title: "Isolation Level", why: "dirty, non-repeatable, phantom read를 업무 허용 기준으로 해석해야 한다.", artifacts: ["isolation decision"], failureSignals: ["동시 주문에서 재고 음수"], evidence: ["parallel transaction test"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-23", title: "Lock Strategy", why: "optimistic, pessimistic, distributed lock은 충돌 빈도와 실패 복구 기준으로 선택한다.", artifacts: ["lock decision log"], failureSignals: ["deadlock 또는 lost update"], evidence: ["lock contention metric"], links: ["데이터 계층·저장소 심화"] },
      { id: "BE-24", title: "Idempotency", why: "재시도 가능한 시스템은 중복 요청을 안전하게 처리할 수 있어야 한다.", artifacts: ["idempotency key policy"], failureSignals: ["결제·주문 중복 생성"], evidence: ["duplicate request test"], links: ["백엔드 핵심"] },
      { id: "BE-25", title: "Retry와 Timeout", why: "retry는 장애 완화이면서 부하 증폭 장치라 예산과 backoff가 필요하다.", artifacts: ["timeout budget"], failureSignals: ["장애 때 모든 요청이 동시에 재시도"], evidence: ["retry storm simulation"], links: ["런타임 품질·장애대응"] },
    ],
  },
  {
    title: "비동기·메시징·통합",
    intent: "서비스 간 통합을 동기 호출만이 아니라 이벤트, 큐, saga, outbox로 설계한다.",
    nodes: [
      { id: "BE-26", title: "Message Queue", why: "queue는 peak 완화, 비동기 처리, 장애 격리를 제공하지만 ordering과 중복을 만든다.", artifacts: ["queue contract"], failureSignals: ["consumer 중복 처리 실패"], evidence: ["at-least-once test"], links: ["런타임 품질·장애대응"] },
      { id: "BE-27", title: "Event Design", why: "event는 DB 변경 알림이 아니라 다른 bounded context가 소비할 사실이다.", artifacts: ["event schema"], failureSignals: ["event 이름이 UpdateDone"], evidence: ["consumer compatibility test"], links: ["백엔드 아키텍처"] },
      { id: "BE-28", title: "Outbox Pattern", why: "DB commit과 message publish 사이의 원자성 문제를 실무적으로 줄인다.", artifacts: ["outbox table design"], failureSignals: ["DB는 반영됐는데 이벤트 누락"], evidence: ["publish recovery test"], links: ["런타임 품질·장애대응"] },
      { id: "BE-29", title: "Saga와 보상", why: "분산 트랜잭션 대신 단계별 완료와 보상 작업으로 일관성을 관리한다.", artifacts: ["saga state machine"], failureSignals: ["중간 실패 후 수동 DB 수정"], evidence: ["compensation rehearsal"], links: ["백엔드 아키텍처"] },
      { id: "BE-30", title: "외부 API 통합", why: "외부 시스템은 rate limit, timeout, schema drift, partial outage를 전제로 다뤄야 한다.", artifacts: ["integration runbook"], failureSignals: ["외부 장애가 전체 장애로 전파"], evidence: ["stubbed outage test"], links: ["런타임 품질·장애대응"] },
    ],
  },
  {
    title: "런타임 품질과 관측성",
    intent: "운영 가능한 백엔드는 문제 발생 전후에 원인을 좁힐 단서를 남긴다.",
    nodes: [
      { id: "BE-31", title: "Thread와 Pool", why: "thread, connection, worker pool은 처리량과 장애 전파의 핵심 자원이다.", artifacts: ["pool sizing sheet"], failureSignals: ["pool exhaustion으로 전체 지연"], evidence: ["load test saturation point"], links: ["런타임 품질·장애대응"] },
      { id: "BE-32", title: "Structured Logging", why: "로그는 문장이 아니라 request id, user id, domain id, outcome이 있는 이벤트다.", artifacts: ["log schema"], failureSignals: ["grep으로도 요청 흐름 추적 불가"], evidence: ["correlated log trace"], links: ["런타임 품질·장애대응"] },
      { id: "BE-33", title: "Metrics", why: "RED/USE 지표는 서비스 상태를 추측이 아니라 수치로 읽게 한다.", artifacts: ["metric catalog"], failureSignals: ["CPU만 보고 장애 판단"], evidence: ["dashboard with SLI"], links: ["런타임 품질·장애대응"] },
      { id: "BE-34", title: "Distributed Tracing", why: "서비스 간 latency와 error propagation은 trace 없이는 원인 축소가 느리다.", artifacts: ["trace propagation policy"], failureSignals: ["어느 downstream이 느린지 모름"], evidence: ["sample trace"], links: ["런타임 품질·장애대응"] },
      { id: "BE-35", title: "Alert와 SLO", why: "alert는 증상 기반이어야 하고 SLO는 사용자 경험 기반이어야 한다.", artifacts: ["alert rule set"], failureSignals: ["알림은 많은데 행동 불가"], evidence: ["alert review"], links: ["런타임 품질·장애대응"] },
    ],
  },
  {
    title: "배포, 확장, 장애대응",
    intent: "코드가 운영 환경에서 바뀌고 깨지고 회복되는 전체 lifecycle을 다룬다.",
    nodes: [
      { id: "BE-36", title: "CI/CD Gate", why: "빌드, 테스트, migration, security scan, rollback 준비가 배포 단위다.", artifacts: ["pipeline gate"], failureSignals: ["수동 체크리스트 의존"], evidence: ["pipeline artifact"], links: ["플랫폼 도구·운영 기본기"] },
      { id: "BE-37", title: "Deployment Strategy", why: "blue-green, canary, rolling은 위험도와 관측 가능성 기준으로 선택한다.", artifacts: ["deployment strategy"], failureSignals: ["전체 트래픽에 즉시 배포"], evidence: ["canary metric window"], links: ["플랫폼 도구·운영 기본기"] },
      { id: "BE-38", title: "Capacity Planning", why: "scale은 replica 수가 아니라 bottleneck, queue depth, DB connection, p95 latency의 함수다.", artifacts: ["capacity model"], failureSignals: ["CPU 여유 있는데 timeout"], evidence: ["load test report"], links: ["런타임 품질·장애대응"] },
      { id: "BE-39", title: "Incident Response", why: "장애 대응은 원인 분석보다 사용자 영향 완화, communication, rollback 판단이 먼저다.", artifacts: ["incident runbook"], failureSignals: ["누가 결정하는지 모름"], evidence: ["game day report"], links: ["런타임 품질·장애대응"] },
      { id: "BE-40", title: "Postmortem과 개선", why: "장애는 개인 책임이 아니라 시스템 guardrail과 설계 개선으로 환류되어야 한다.", artifacts: ["postmortem"], failureSignals: ["재발 방지책이 주의하기"], evidence: ["action item closure"], links: ["백엔드 아키텍처"] },
    ],
  },
];

const gates = [
  { title: "계약 품질", checks: ["성공·실패 API 계약과 권한 경계를 말할 수 있다", "프론트엔드가 복구 가능한 오류 정보를 제공한다"] },
  { title: "데이터 안정성", checks: ["트랜잭션, 동시성, migration, cache invalidation의 실패 모드를 테스트한다", "정합성 기준이 DB와 도메인 양쪽에 남아 있다"] },
  { title: "운영 가능성", checks: ["log, metric, trace, alert가 하나의 요청 흐름으로 연결된다", "장애 대응과 postmortem이 다음 설계 변경으로 이어진다"] },
];

export default function BackendRoadmapPage() {
  return (
    <RoadmapPage
      serial="DOC : BACKEND-DEEP-ROADMAP"
      title="백엔드 개발 프로세스 심층 로드맵"
      subtitle="도메인 분석, API 계약, 데이터 정합성, 트랜잭션·동시성, 메시징, 보안, 관측성, 장애대응을 하나의 서비스 개발 흐름으로 묶는다."
      meta="PROCESS : DOMAIN -> API CONTRACT -> DATA -> CONCURRENCY -> MESSAGING -> SECURITY -> OBSERVABILITY -> OPERATIONS"
      diagram={diagram}
      tracks={tracks}
      process={process}
      gates={gates}
    />
  );
}
