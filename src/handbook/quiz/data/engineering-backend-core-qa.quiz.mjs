// 백엔드 핵심 Q&A(engineering-backend-core-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-backend-core-quiz",
  title: "백엔드 핵심 퀴즈",
  sourceQaId: "engineering-backend-core-qa",
  questions: [
    {
      id: "q1",
      question: "상태 변경 API를 설계할 때 가장 먼저 확인해야 하는 것은?",
      choices: [
        "actor, resource, business invariant, transaction boundary, retry safety",
        "응답 JSON의 필드 순서와 직렬화 포맷",
        "컨트롤러 메서드 이름과 URL 경로 규칙",
        "프레임워크 버전과 의존성 라이브러리 목록",
      ],
      answerIndex: 0,
      explanation:
        "본문은 상태 변경 API에서 actor, resource, business invariant, transaction boundary, retry safety를 먼저 확인하라고 한다. Controller 입력 검증만으로 끝내지 않고 DB constraint, lock, idempotency key, audit log까지 하나의 계약으로 둔다.",
    },
    {
      id: "q2",
      question: "POST를 멱등(idempotent)하게 만드는 방법으로 옳은 것은?",
      choices: [
        "POST는 구조상 절대 멱등할 수 없으므로 PUT으로 바꿔야 한다",
        "서버가 idempotency key와 request fingerprint를 저장하고 같은 요청에 같은 결과를 재반환한다",
        "클라이언트가 요청을 한 번만 보내도록 버튼을 비활성화하면 된다",
        "요청마다 새로운 UUID를 발급해 매번 다른 처리를 보장한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 서버가 idempotency key와 request fingerprint를 저장하고 같은 요청에는 같은 결과를 재반환하면 POST도 재시도 안전성을 가질 수 있다고 한다.",
    },
    {
      id: "q3",
      question: "트랜잭션 경계를 어디에 두어야 하나?",
      choices: [
        "하나의 HTTP 요청에 포함된 모든 작업을 항상 한 트랜잭션으로 묶는다",
        "외부 API 호출까지 포함해 최대한 넓게 묶어 원자성을 확보한다",
        "도메인 불변식이 함께 지켜져야 하는 최소 변경 묶음을 한 트랜잭션으로 둔다",
        "DB 접근이 있는 모든 메서드마다 개별 트랜잭션을 연다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 도메인 불변식이 함께 지켜져야 하는 최소 변경 묶음을 한 트랜잭션으로 두고, 외부 API 호출은 트랜잭션 안에 오래 붙잡지 말고 outbox나 상태 전이 후 비동기 처리로 분리하라고 한다.",
    },
    {
      id: "q4",
      question: "rollbackFor를 남발하면 생기는 문제는?",
      choices: [
        "트랜잭션이 자동 커밋되어 변경이 유실된다",
        "읽기 전용 트랜잭션이 강제로 쓰기 모드로 바뀐다",
        "DB connection pool이 즉시 고갈된다",
        "복구 가능한 비즈니스 실패와 시스템 실패가 섞여 transaction 정책이 불투명해진다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 rollbackFor 남발 시 복구 가능한 비즈니스 실패와 시스템 실패가 섞여 transaction 정책이 불투명해지므로, exception 계층과 rollback 기준을 먼저 정해야 한다고 한다.",
    },
    {
      id: "q5",
      question: "관측성 3종(log, metric, trace)의 역할을 올바르게 짝지은 것은?",
      choices: [
        "log는 원인 확정, metric은 증상 감지, trace는 경로 분해에 쓴다",
        "log는 경로 분해, metric은 원인 확정, trace는 증상 감지에 쓴다",
        "셋 다 같은 목적이라 하나만 남기면 충분하다",
        "metric은 원인 확정, trace는 증상 감지, log는 저장 비용 절감용이다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 로그는 원인 확정, metric은 증상 감지, trace는 경로 분해에 쓴다고 명시한다. 요청 진입부터 async event 발행까지 같은 correlation id로 연결되어야 한다.",
    },
    {
      id: "q6",
      question: "userId 같은 상세 식별자를 metric label로 넣으면 위험한 이유는?",
      choices: [
        "metric이 실시간으로 갱신되지 않아 지연이 생긴다",
        "metric label cardinality가 폭발해 저장 비용과 조회 성능이 무너진다",
        "userId가 로그에서 자동으로 노출되어 보안이 뚫린다",
        "metric이 trace와 자동으로 병합되어 데이터가 중복된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 상세 식별자를 metric label로 넣으면 cardinality가 폭발해 저장 비용과 조회 성능이 무너지므로, 상세 식별자는 log나 trace field로 보내고 metric은 낮은 cardinality 차원으로 두라고 한다.",
    },
    {
      id: "q7",
      question: "p95는 정상인데 고객이 느리다고 할 때 먼저 봐야 할 것은?",
      choices: [
        "서버 CPU 평균 사용률만 확인한다",
        "전체 요청 수 합계 추이를 본다",
        "p99, 특정 route, tenant, region, dependency span을 나눠 본다",
        "p50 평균값을 다시 계산해 본다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 p95가 정상이어도 일부 고객의 tail latency는 숨을 수 있으므로 p99, 특정 route, tenant, region, dependency span을 나눠 보라고 한다.",
    },
    {
      id: "q8",
      question: "API error contract를 먼저 정의해야 하는 이유는?",
      choices: [
        "서버 응답 속도를 높이기 위해",
        "DB schema를 자동 생성하기 위해",
        "프레임워크가 예외를 자동 처리하게 만들기 위해",
        "클라이언트 UX, 재시도 가능성, 관측성, 보안 노출 범위를 함께 결정하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 오류 계약이 클라이언트 UX, 재시도 가능성, 관측성, 보안 노출 범위를 함께 결정하며 status code, error code, user message, retryable 여부, trace id를 먼저 정해야 실패가 제품 흐름 안에 들어온다고 한다.",
    },
    {
      id: "q9",
      question: "HTTP 400과 422를 구분하는 기준은?",
      choices: [
        "400은 요청 형식이나 파싱 자체가 잘못된 경우, 422는 문법은 맞지만 도메인 규칙을 통과하지 못한 경우",
        "400은 인증 실패, 422는 권한 부족일 때 쓴다",
        "400은 클라이언트 오류, 422는 서버 오류일 때 쓴다",
        "400은 GET 요청, 422는 POST 요청 실패에 쓴다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 400은 요청 형식이나 파싱 자체가 잘못된 경우, 422는 문법은 맞지만 도메인 규칙을 통과하지 못한 경우에 쓰되, 팀 API 계약에서 일관되게 고정하는 것이 더 중요하다고 한다.",
    },
    {
      id: "q10",
      question: "동시성 문제를 application lock으로만 막으면 충분한가?",
      choices: [
        "충분하다. synchronized 하나로 모든 동시성 문제가 해결된다",
        "서버가 여러 대면 전역 정합성을 보장하지 못하므로 DB constraint, optimistic version 등 공유 저장소 규칙이 최종 방어여야 한다",
        "application lock은 아무 효과가 없으므로 절대 쓰면 안 된다",
        "충분하다. lock을 걸면 DB constraint는 불필요해진다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 단일 JVM 안에서는 일부 효과가 있지만 서버가 여러 대면 application lock이 전역 정합성을 보장하지 못하므로, 최종 방어는 DB constraint, optimistic version, row lock, idempotency key처럼 공유 저장소가 강제하는 규칙이어야 한다고 한다.",
    },
    {
      id: "q11",
      question: "외부 API의 timeout을 정하는 올바른 기준은?",
      choices: [
        "downstream 서비스가 제안하는 기본값을 그대로 쓴다",
        "가능한 한 길게 잡아 실패를 줄인다",
        "사용자 요청의 전체 latency budget에서 downstream 호출이 쓸 수 있는 시간을 역산한다",
        "네트워크 상태와 무관하게 항상 30초로 고정한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 사용자 요청의 전체 latency budget에서 downstream 호출이 쓸 수 있는 시간을 역산하고, connect/read timeout, retry count, circuit breaker, fallback을 함께 정하라고 한다.",
    },
    {
      id: "q12",
      question: "DTO, entity, domain model을 분리하는 이유는?",
      choices: [
        "코드 라인 수를 늘려 복잡도를 높이기 위해",
        "ORM이 자동 매핑을 지원하지 않기 때문에",
        "레이어드 아키텍처 규칙이 무조건 그렇게 강제하기 때문에",
        "외부 API 계약, 영속성 구조, 도메인 불변식은 변경 이유가 다르기 때문에",
      ],
      answerIndex: 3,
      explanation:
        "본문은 외부 API 계약, 영속성 구조, 도메인 불변식은 변경 이유가 다르며 Entity를 그대로 response로 내보내면 lazy loading, 순환 참조, 내부 필드 노출, API 호환성 문제가 생길 수 있다고 한다.",
    },
    {
      id: "q13",
      question: "offset 방식 pagination만 쓸 때 생기는 문제는?",
      choices: [
        "뒤 페이지로 갈수록 건너뛸 row가 많아지고, 중간 삽입/삭제가 있으면 중복이나 누락이 생긴다",
        "정렬 자체가 불가능해진다",
        "첫 페이지 로딩이 항상 느려진다",
        "총 개수 count를 절대 구할 수 없다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 offset이 뒤 페이지로 갈수록 건너뛸 row가 많아지고 중간 삽입/삭제가 있으면 중복이나 누락이 생길 수 있으므로, 안정적 정렬 키가 있으면 cursor pagination을 고려하라고 한다.",
    },
    {
      id: "q14",
      question: "cursor pagination에서 cursor에 담아야 하는 값은?",
      choices: [
        "현재 페이지 번호와 페이지 크기",
        "안정적인 정렬 키와 tie-breaker(예: createdAt이 중복 가능하면 id까지)",
        "사용자의 세션 ID와 토큰",
        "전체 결과의 총 개수와 마지막 offset",
      ],
      answerIndex: 1,
      explanation:
        "본문은 cursor에 안정적인 정렬 키와 tie-breaker를 넣고, createdAt만으로 중복이 가능하면 id까지 함께 넣어 다음 페이지 경계를 명확히 하라고 한다.",
    },
    {
      id: "q15",
      question: "보상 트랜잭션(compensating transaction)과 rollback의 차이는?",
      choices: [
        "보상은 commit 전 변경을 되돌리고 rollback은 이미 반영된 결과를 상쇄한다",
        "둘은 같은 개념이며 용어만 다르다",
        "rollback은 아직 commit되지 않은 변경을 되돌리고, 보상은 이미 반영된 비즈니스 결과를 반대 작업으로 수습한다",
        "rollback은 외부 side effect를 되돌리고 보상은 DB만 되돌린다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 rollback은 아직 commit되지 않은 변경을 되돌리고, 보상은 이미 반영된 비즈니스 결과를 반대 작업으로 수습하며, 외부 side effect가 있으면 보상이 필요하다고 한다.",
    },
    {
      id: "q16",
      question: "GET 요청에 조회수 증가 같은 비즈니스 상태 변경을 넣으면 안 되는 이유는?",
      choices: [
        "GET은 응답 크기가 작아야 하므로 부가 작업이 금지되어서",
        "GET은 캐시가 불가능해서 성능이 나빠지므로",
        "GET은 요청 body를 가질 수 없어서 데이터를 못 받으므로",
        "client, proxy, crawler가 재시도하거나 prefetch할 수 있어 상태 변경이 위험하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 GET을 client, proxy, crawler가 재시도하거나 prefetch할 수 있으므로 비즈니스 상태 변경을 넣으면 위험하며, 조회 로그 같은 관측 목적 기록은 허용하더라도 사용자에게 보이는 상태 변경과 분리하라고 한다.",
    },
    {
      id: "q17",
      question: "API versioning이나 deprecation window가 필요한 변경은?",
      choices: [
        "응답 의미 변경, 필드 삭제, 필수 입력 추가, enum 의미 변경 같은 breaking change",
        "기존 client가 무시 가능한 optional 필드 추가",
        "내부 로그 메시지 문구 수정",
        "응답에 영향 없는 서버 내부 리팩토링",
      ],
      answerIndex: 0,
      explanation:
        "본문은 기존 client를 깨는 응답 의미 변경, 필드 삭제, 필수 입력 추가, enum 의미 변경은 versioning이나 deprecation window가 필요하고, 필드 추가처럼 consumer가 무시 가능한 additive change는 같은 버전에서 처리할 수 있다고 한다.",
    },
    {
      id: "q18",
      question: "외부에 ID를 노출할 때 IDOR를 줄이려면 무엇을 함께 설계해야 하나?",
      choices: [
        "ID를 무조건 암호화해서 절대 복호화하지 않는다",
        "외부 공개 ID, tenant scope, resource authorization, audit를 같이 설계한다",
        "sequential ID를 절대 쓰지 않고 UUID만 쓴다",
        "모든 응답에서 ID 필드 자체를 제거한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 내부 ID 노출 자체보다 권한 검증 누락과 추측 가능성이 문제이며, 외부 공개 ID, tenant scope, resource authorization, audit를 같이 설계해야 IDOR를 줄일 수 있다고 한다.",
    },
    {
      id: "q19",
      question: "코드 리뷰에서 Command와 Query를 따로 보는 이유는?",
      choices: [
        "command는 실행이 느리고 query는 빠르기 때문에",
        "command는 프론트, query는 백엔드가 담당하기 때문에",
        "command는 transaction·invariant·audit가, query는 fetch plan·projection·cache·pagination이 중요하기 때문",
        "command는 테스트가 필요 없고 query만 테스트하면 되기 때문에",
      ],
      answerIndex: 2,
      explanation:
        "본문은 상태를 바꾸는 command는 transaction, invariant, audit가 중요하고 query는 fetch plan, projection, cache, pagination이 중요하므로 리뷰 초점이 달라야 한다고 한다.",
    },
    {
      id: "q20",
      question: "도메인 이벤트에 outbox 패턴을 자주 함께 쓰는 이유는?",
      choices: [
        "이벤트를 broker 없이 직접 consumer에 전달하기 위해",
        "이벤트 발행 순서를 전역으로 완벽히 보장하기 위해",
        "consumer가 중복 이벤트를 받지 않도록 broker가 보장하기 때문에",
        "DB 상태 변경과 이벤트 발행 기록을 같은 transaction에 남겨 유실을 줄이기 위해",
      ],
      answerIndex: 3,
      explanation:
        "본문은 outbox가 DB 상태 변경과 이벤트 발행 기록을 같은 transaction에 남겨 유실을 줄이며, relay가 outbox를 읽어 broker로 발행하고 consumer는 중복을 견뎌야 한다고 한다.",
    },
    {
      id: "q21",
      question: "같은 규칙에 대해 application validation과 DB constraint를 둘 다 두는 이유는?",
      choices: [
        "validation은 빠르고 친절한 오류를 주고, DB constraint는 동시성과 우회 경로까지 막는 최종 방어선이라 실패를 잡는 지점이 다르기 때문",
        "둘 중 하나만 있으면 되지만 프레임워크가 관례상 둘 다 요구하기 때문",
        "validation이 DB constraint보다 항상 느려서 성능을 보완하려고 함께 두기 때문",
        "DB constraint가 사용자 메시지를 직접 생성하므로 validation을 완전히 대체할 수 있기 때문",
      ],
      answerIndex: 0,
      explanation:
        "본문은 validation은 빠르고 친절한 오류를 주고 DB constraint는 동시성과 우회 경로까지 막는 최종 방어선이며, 둘은 같은 규칙을 다른 실패 지점에서 지킨다고 한다.",
    },
    {
      id: "q22",
      question: "변경의 blast radius를 줄이는 방법으로 옳은 것은?",
      choices: [
        "배포를 무조건 새벽 시간대에만 수행한다",
        "feature flag, tenant/cohort rollout, read-only fallback, kill switch, 빠른 rollback 경로를 둔다",
        "모든 변경을 하나의 큰 릴리스로 묶어 한 번에 배포한다",
        "테스트를 생략하고 배포 후 모니터링만 강화한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 feature flag, tenant/cohort rollout, read-only fallback, kill switch, 빠른 rollback 경로를 두어 영향 범위를 미리 작게 만들수록 배포 판단이 쉬워진다고 한다.",
    },
    {
      id: "q23",
      question: "장애 대응에서 forward fix와 rollback 중 무엇을 고를지의 기준은?",
      choices: [
        "언제나 forward fix가 rollback보다 안전하다",
        "언제나 rollback이 forward fix보다 빠르다",
        "데이터 파괴나 외부 side effect가 없고 이전 artifact가 호환되면 rollback이 빠르고, 이미 상태가 변했다면 forward fix와 repair script가 현실적이다",
        "rollback은 DB 변경에만, forward fix는 코드 변경에만 쓴다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 데이터 파괴나 외부 side effect가 없고 이전 artifact가 호환되면 rollback이 빠르며, 이미 상태가 변했다면 forward fix와 repair script가 현실적일 수 있다고 한다.",
    },
    {
      id: "q24",
      question: "idempotency 저장의 TTL은 무엇을 기준으로 정하나?",
      choices: [
        "요청 payload 크기에 비례해 자동으로 늘린다",
        "항상 24시간으로 고정한다",
        "짧을수록 안전하므로 가능한 한 짧게 잡는다",
        "클라이언트 재시도 창, 결제사 재전송 기간, 장애 복구 시간을 기준으로 잡되 너무 짧으면 중복 처리를 놓치고 너무 길면 저장 비용이 커진다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 idempotency 저장 TTL을 클라이언트 재시도 창, 결제사 재전송 기간, 장애 복구 시간을 기준으로 잡고, 너무 짧으면 중복 처리를 놓치고 너무 길면 저장 비용이 커진다고 한다.",
    },
    {
      id: "q25",
      question: "외부 API의 timeout을 너무 길게 잡으면 생기는 장애는?",
      choices: [
        "thread, connection, request slot이 오래 묶여 상류까지 대기열이 퍼지고, 사용자는 이미 포기했는데 서버는 계속 하류를 압박한다",
        "downstream 서비스가 자동으로 요청을 거절해 오히려 빠르게 실패한다",
        "retry가 자동으로 비활성화되어 재시도 안전성이 사라진다",
        "connection pool이 자동 확장되어 메모리 사용만 늘어난다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 timeout이 너무 길면 thread, connection, request slot이 오래 묶여 상류까지 대기열이 퍼지고, 사용자는 이미 포기했는데 서버는 계속 하류를 압박할 수 있다고 한다.",
    },
    {
      id: "q26",
      question: "부분 실패가 생기는 기능은 어떻게 설계해야 하나?",
      choices: [
        "전체 성공 아니면 전체 실패 두 가지 상태로만 단순하게 둔다",
        "부분 실패를 정상 운영 조건으로 보고 pending, compensating, failed, retrying 같은 상태와 reconciliation job, 사용자 안내, 운영 알림을 함께 설계한다",
        "부분 실패는 예외 상황이므로 발생 시 항상 전체 트랜잭션을 rollback한다",
        "부분 실패는 로그만 남기고 사용자에게는 항상 성공으로 응답한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 부분 실패를 정상적인 운영 조건으로 보고 pending, compensating, failed, retrying 같은 상태와 reconciliation job, 사용자 안내, 운영 알림을 함께 설계하라고 한다.",
    },
    {
      id: "q27",
      question: "request, domain, DB validation은 어떻게 나누나?",
      choices: [
        "세 계층 모두 동일한 검증을 중복 수행해 안전성을 높인다",
        "형식 검증은 DB가, 도메인 불변식은 request boundary가 맡는다",
        "형식 검증은 request boundary, 도메인 불변식은 service/domain, 동시 요청까지 포함한 최종 방어는 DB constraint가 맡아 실패를 잡는 위치가 다르다",
        "도메인 불변식은 프론트엔드에서만 검증하면 충분하다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 형식 검증은 request boundary, 도메인 불변식은 service/domain, 동시 요청까지 포함한 최종 방어는 DB constraint가 맡으며 세 계층은 중복이 아니라 실패를 잡는 위치가 다르다고 한다.",
    },
    {
      id: "q28",
      question: "주문·결제·승인처럼 상태 전이가 있는 기능에서 먼저 고정해야 하는 것은?",
      choices: [
        "상태 개수를 줄여 DB 저장 공간을 아끼는 것",
        "프레임워크가 상태 머신 코드를 자동 생성하게 하는 것",
        "상태 전이 표는 UI 설계용이라 백엔드에서는 다룰 필요가 없다",
        "가능한 상태와 전이를 표로 고정해 불가능한 전이, 관리자 강제 변경, 보상 처리, audit를 일관되게 다루는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 상태가 있는 기능은 가능한 상태와 전이를 표로 고정해야 불가능한 전이, 관리자 강제 변경, 보상 처리, audit를 일관되게 다룰 수 있다고 한다.",
    },
    {
      id: "q29",
      question: "서버 시간의 저장, 계산, 표시를 나누는 원칙은?",
      choices: [
        "저장은 UTC로 통일하고 사용자 표시에만 timezone을 적용하며, 만료·예약·정산은 clock injection과 timezone fixture로 테스트한다",
        "저장, 계산, 표시를 모두 서버 로컬 시간대로 통일한다",
        "저장은 사용자 timezone으로 하고 표시만 UTC로 변환한다",
        "시간 값은 문자열로만 저장하고 timezone은 클라이언트가 알아서 처리하게 둔다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 저장은 UTC로 통일하고 사용자 표시는 timezone을 적용하며, 만료·예약·정산처럼 시간 경계가 중요한 기능은 clock injection과 timezone fixture로 테스트하라고 한다.",
    },
    {
      id: "q30",
      question: "presigned URL로 파일 업로드를 받을 때 backend가 검증해야 하는 것은?",
      choices: [
        "presigned URL을 쓰면 backend는 아무것도 검증할 필요가 없다",
        "발급 대상 actor, tenant, object key 범위, content length, 만료 시간, 다운로드 권한을 검증하고 업로드 후 callback이나 finalize API에서 실제 object metadata를 확인한다",
        "URL 서명 문자열의 길이만 확인하면 충분하다",
        "업로드 완료 여부와 무관하게 URL 발급 즉시 비즈니스 성공으로 처리한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 presigned URL 사용 시 발급 대상 actor, tenant, object key 범위, content length, 만료 시간, 다운로드 권한을 검증하고, 업로드 후 callback이나 finalize API에서 실제 object metadata를 확인하라고 한다.",
    },
    {
      id: "q31",
      question: "batch job의 checkpoint에는 무엇을 저장해야 하나?",
      choices: [
        "사용자 세션 토큰과 브라우저 정보",
        "전체 결과를 정렬한 배열 전체",
        "job id, 입력 범위, resume cursor, 처리된 count, 실패 count, 마지막 성공 지점을 저장해 재시작 시 중복 처리해도 안전하게 한다",
        "다음 배포 버전과 feature flag 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 checkpoint에 job id, 입력 범위, resume cursor, 처리된 count, 실패 count, 마지막 성공 지점을 저장하고 재시작 시 같은 항목을 중복 처리해도 안전해야 한다고 한다.",
    },
    {
      id: "q32",
      question: "feature flag의 kill switch를 즉시 내려야 하는 조건은?",
      choices: [
        "코드 리뷰가 아직 끝나지 않았을 때",
        "새 기능의 사용자 수가 목표치를 초과했을 때",
        "배포 후 24시간이 지나면 자동으로",
        "error rate, p99, data mismatch, business metric이 사전 threshold를 넘으면 즉시 끄고, 끈 뒤에도 이미 처리된 데이터의 repair 계획을 둔다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 error rate, p99, data mismatch, business metric이 사전 threshold를 넘으면 kill switch를 즉시 끄고, 끈 뒤에도 이미 처리된 데이터의 repair 계획이 필요하다고 한다.",
    },
    {
      id: "q33",
      question: "response payload가 커질 때 먼저 봐야 하는 비용은?",
      choices: [
        "network, serialization CPU, memory allocation, client rendering 비용이 커지므로 projection, pagination, compression, streaming으로 줄인다",
        "DB index 크기만 커지므로 index를 재구성한다",
        "payload가 커져도 gzip이 자동 처리하므로 별도 비용은 없다",
        "오직 client 저장 공간만 문제이므로 client cache를 늘린다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 payload가 커지면 network, serialization CPU, memory allocation, client rendering 비용이 커지므로 projection, pagination, compression, streaming을 기준으로 줄이라고 한다.",
    },
    {
      id: "q34",
      question: "HTTP cache에서 Vary와 tenant cache key가 중요한 이유는?",
      choices: [
        "cache key가 짧을수록 조회가 빨라지므로 입력을 최소화하기 위해",
        "Accept-Language, Authorization, tenant, feature flag처럼 응답을 바꾸는 입력이 cache key에 없으면 다른 사용자나 tenant의 응답이 섞일 수 있기 때문",
        "Vary header가 압축률을 높여 network 비용을 줄이기 때문",
        "tenant마다 별도 CDN을 강제로 할당하기 위해",
      ],
      answerIndex: 1,
      explanation:
        "본문은 Accept-Language, Authorization, tenant, feature flag처럼 응답을 바꾸는 입력이 cache key에 없으면 다른 사용자나 tenant의 응답이 섞일 수 있다고 한다.",
    },
    {
      id: "q35",
      question: "API에서 null, absent, empty 값을 따로 정의해야 하는 이유는?",
      choices: [
        "JSON 표준이 셋을 같은 값으로 취급하므로 통일하기 위해",
        "셋의 저장 비용이 크게 달라 비용을 줄이기 위해",
        "null, absent, empty string, empty array는 의미가 다를 수 있으므로 의미가 같으면 일관된 표현을 정하고 다르면 schema와 client fixture에 명시해야 하기 때문",
        "empty array는 항상 에러를 의미하므로 반드시 null로 변환해야 하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 null, absent, empty string, empty array는 의미가 다를 수 있으므로 의미가 같다면 일관된 표현을 정하고, 의미가 다르면 schema와 client fixture에 명시해야 한다고 한다.",
    },
    {
      id: "q36",
      question: "HTTP 메시지 구성으로 옳은 것은?",
      choices: [
        "시작줄, 헤더, 빈 줄, 본문의 네 부분으로 구성되며 GET처럼 본문 없는 요청도 있다",
        "모든 요청과 응답은 반드시 본문을 포함한다",
        "빈 줄은 구성요소가 아니라 무시되는 공백이다",
        "헤더 없이 시작줄과 본문만으로 구성된다",
      ],
      answerIndex: 0,
      explanation:
        "HTTP 메시지는 시작줄(메서드·URI·버전 또는 버전·상태코드·상태문구), 헤더, 빈 줄, 본문으로 구성된다. GET처럼 본문 없는 요청도 있다.",
    },
    {
      id: "q37",
      question: "서버가 HTTP 요청을 처리하는 순서로 옳은 것은?",
      choices: [
        "요청 수신 → 메시지 파싱 → 라우팅 → 인증/검증 → 비즈니스 로직 → 응답 생성",
        "요청 수신 → 비즈니스 로직 → 인증/검증 → 라우팅 → 응답 생성",
        "라우팅 → 요청 수신 → 파싱 → 응답 생성 → 인증/검증",
        "인증/검증 → 파싱 → 라우팅 → 요청 수신 → 응답 생성",
      ],
      answerIndex: 0,
      explanation:
        "요청 수신 후 메시지 파싱, 라우팅, 인증/검증을 거쳐 비즈니스 로직을 실행하고 응답을 생성한다. 인증/검증은 비즈니스 로직 앞에 온다.",
    },
    {
      id: "q38",
      question: "HTTP 헤더 Content-Type과 Accept에 대한 설명으로 옳은 것은?",
      choices: [
        "둘은 같은 역할이라 아무거나 써도 된다",
        "Content-Type은 본문의 형식이고, Accept는 클라이언트가 받을 수 있는 형식이라 역할이 다르다",
        "Accept가 요청 본문의 실제 형식을 지정한다",
        "헤더는 처리에 영향을 주지 않는 단순 부가 정보다",
      ],
      answerIndex: 1,
      explanation:
        "헤더는 메시지 해석·처리 방식을 알려주는 메타데이터다. Content-Type은 본문의 형식, Accept는 클라이언트가 받을 수 있는 형식으로 역할이 다르다.",
    },
    {
      id: "q39",
      question: "HTTP/3가 TCP 대신 UDP 기반 QUIC을 쓰는 핵심 이유는?",
      choices: [
        "UDP라서 신뢰성·흐름 제어를 포기하고 단순히 빠르기 때문",
        "TCP의 Head-of-Line Blocking을 해결하고, QUIC이 스트림 독립성·빠른 핸드셰이크·연결 이동성을 제공하기 때문",
        "QUIC이 연결을 IP·포트로만 식별해 단순하기 때문",
        "HTTP/3는 암호화를 하지 않아 오버헤드가 없기 때문",
      ],
      answerIndex: 1,
      explanation:
        "핵심은 UDP 자체가 아니라 QUIC이다. QUIC은 TCP의 Head-of-Line Blocking을 해결하고 스트림 단위 독립성, TLS 1.3 통합·0-RTT의 빠른 핸드셰이크, Connection ID 기반 연결 이동성을 제공한다.",
    },
    {
      id: "q40",
      question: "PUT과 POST의 차이로 옳은 것은?",
      choices: [
        "POST는 멱등이고 PUT은 비멱등이다",
        "POST는 새 리소스 생성/작업 실행이라 비멱등이고, PUT은 아는 URI에 전체 교체/생성이라 멱등이다",
        "PUT은 리소스의 부분 수정 전용이다",
        "둘 다 항상 멱등하다",
      ],
      answerIndex: 1,
      explanation:
        "POST는 같은 요청을 여러 번 보내면 여러 번 생성될 수 있어 비멱등이고, PUT은 같은 URI에 같은 본문을 반복해도 최종 상태가 같아 멱등이다. PUT은 부분 수정이 아니라 전체 교체다.",
    },
    {
      id: "q41",
      question: "HEAD와 OPTIONS 메서드에 대한 설명으로 옳은 것은?",
      choices: [
        "HEAD는 본문 없이 헤더만 받아 존재·크기·캐시 유효성을 확인하고, OPTIONS는 지원 메서드·통신 옵션을 확인하며 CORS Preflight에 쓰인다",
        "HEAD는 GET처럼 본문까지 모두 받는다",
        "OPTIONS는 실제 리소스를 변경하는 메서드다",
        "HEAD는 리소스를 삭제하는 데 쓰인다",
      ],
      answerIndex: 0,
      explanation:
        "HEAD는 본문 없이 헤더만 받아 존재·Content-Length·Last-Modified·ETag를 확인하고, OPTIONS는 Allow 헤더로 지원 메서드·통신 옵션을 확인하며 CORS Preflight에 쓰인다.",
    },
  ],
};

export default quiz;
