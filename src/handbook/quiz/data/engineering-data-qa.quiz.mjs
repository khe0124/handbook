// 데이터 계층·저장소 심화 Q&A(engineering-data-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-data-quiz",
  title: "데이터 계층·저장소 심화 퀴즈",
  sourceQaId: "engineering-data-qa",
  questions: [
    {
      id: "q1",
      question: "EXPLAIN과 EXPLAIN ANALYZE의 차이로 옳은 것은?",
      choices: [
        "EXPLAIN은 planner가 예상한 계획이고, EXPLAIN ANALYZE는 실제 실행 시간과 row 수를 포함한다",
        "EXPLAIN ANALYZE는 계획만 보여주고 실행은 하지 않는다",
        "둘 다 예상 row만 보여주고 실제 실행 통계는 없다",
        "EXPLAIN이 실제 실행 시간을, EXPLAIN ANALYZE가 예상 계획만 보여준다",
      ],
      answerIndex: 0,
      explanation:
        "본문에 따르면 EXPLAIN은 planner가 예상한 실행 계획이고 EXPLAIN ANALYZE는 실제 실행 시간과 row 수를 포함한다. 예상 row와 실제 row 차이로 잘못된 통계나 selectivity 문제를 잡는다.",
    },
    {
      id: "q2",
      question: "index가 있는데도 sequential scan을 선택할 수 있는 경우가 아닌 것은?",
      choices: [
        "조건 selectivity가 낮아 테이블 대부분을 읽어야 할 때",
        "connection pool이 가득 차 새 연결을 못 받을 때",
        "통계가 낡아 planner가 비용을 잘못 추정할 때",
        "함수나 형 변환 때문에 인덱스를 못 쓸 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 selectivity가 낮거나 테이블 대부분을 읽거나 통계가 낡았거나 함수/형 변환으로 인덱스를 못 쓸 때 seq scan이 더 싸다고 판단될 수 있다고 한다. connection pool은 계획 선택과 무관하다.",
    },
    {
      id: "q3",
      question: "long transaction이 vacuum을 막는 이유로 옳은 것은?",
      choices: [
        "vacuum worker 프로세스를 직접 종료시키기 때문",
        "autovacuum의 cost limit을 0으로 낮추기 때문",
        "과거 snapshot을 계속 참조해 그 snapshot에서 보일 수 있는 old row version을 제거하지 못하기 때문",
        "WAL 파일을 잠가 replay를 막기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 오래 열린 transaction이 과거 snapshot을 계속 참조하므로 vacuum이 그 snapshot에서 보일 수 있는 old row version을 제거하지 못한다고 설명한다. pg_stat_activity의 xact_start와 backend_xmin으로 원인을 좁힌다.",
    },
    {
      id: "q4",
      question: "dead tuple이 많이 쌓이면 나타나는 증상으로 옳은 것은?",
      choices: [
        "쿼리 결과 값 자체가 무작위로 바뀐다",
        "replication이 자동으로 중단된다",
        "connection pool 크기가 강제로 줄어든다",
        "테이블·인덱스가 커지고 I/O가 늘어 latency가 오르며 배포와 무관한 plan regression처럼 보일 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 dead tuple이 많으면 테이블·인덱스가 커지고 buffer/디스크 I/O가 늘어 query latency가 오르며, index bloat로 planner 비용이 변해 배포와 무관한 plan regression처럼 보일 수 있다고 한다.",
    },
    {
      id: "q5",
      question: "read replica를 붙일 때 주의할 핵심은?",
      choices: [
        "replication lag 때문에 read-your-writes가 깨질 수 있어 방금 쓴 데이터·권한·결제는 primary에서 읽어야 한다",
        "replica는 쓰기 성능을 높이는 수단이므로 write를 분산해야 한다",
        "replica를 붙이면 트랜잭션 격리 수준이 자동으로 올라간다",
        "replica는 primary와 항상 동기 상태라 어떤 읽기든 안전하다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 replica가 읽기 확장 수단이지만 replication lag로 read-your-writes가 깨질 수 있어 방금 쓴 데이터, 권한 변경, 결제 상태는 primary나 session consistency 경로에서 읽어야 한다고 한다.",
    },
    {
      id: "q6",
      question: "모든 읽기를 replica로 보내면 안 되는 이유로 옳은 것은?",
      choices: [
        "replica는 인덱스를 가지지 않아 쿼리가 항상 느리기 때문",
        "read-your-writes가 필요하거나 권한·결제·재고처럼 최신성이 불변식인 데이터는 lag가 곧 사용자 오류나 정합성 사고가 되기 때문",
        "replica로 보낸 읽기는 트랜잭션 격리가 적용되지 않기 때문",
        "replica는 SELECT를 지원하지 않기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 read-your-writes가 필요한 요청과 권한·결제·재고처럼 최신성이 불변식인 데이터는 lag가 곧 사용자 오류나 정합성 사고가 된다고 한다. 라우팅은 쿼리 중요도와 lag threshold로 나눈다.",
    },
    {
      id: "q7",
      question: "Redis 장애가 DB 장애로 번지지 않게 하는 설계로 옳은 것은?",
      choices: [
        "모든 읽기를 Redis로만 처리해 DB 접근을 완전히 없앤다",
        "Redis를 source of truth로 승격해 정합성 최종 방어선으로 삼는다",
        "TTL jitter, request coalescing, local cache, fallback budget, DB 보호 rate limit을 둔다",
        "TTL을 무제한으로 두어 캐시가 절대 만료되지 않게 한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 cache stampede·hot key·eviction·failover gap을 전제로 TTL jitter, request coalescing, local cache, fallback budget, DB 보호 rate limit을 두라고 한다. Redis는 빠른 사본이지 정합성의 최종 방어선이 아니다.",
    },
    {
      id: "q8",
      question: "인덱스를 추가하면 항상 빨라지는가에 대한 옳은 설명은?",
      choices: [
        "그렇다, 인덱스는 읽기·쓰기 비용을 모두 낮춘다",
        "그렇다, 저장 공간과 vacuum 비용에는 영향이 없다",
        "그렇다, planner 선택이 항상 단순해진다",
        "아니다, 읽기는 빨라질 수 있으나 쓰기 비용·저장 공간·vacuum 비용·planner 선택 복잡도가 늘어난다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 인덱스 추가 시 읽기는 빨라질 수 있지만 쓰기 비용, 저장 공간, vacuum 비용, planner 선택 복잡도가 늘어나므로 selectivity·query pattern·정렬 조건·write volume을 함께 봐야 한다고 한다.",
    },
    {
      id: "q9",
      question: "복합 인덱스의 컬럼 순서를 정하는 기준으로 옳은 것은?",
      choices: [
        "동등 조건으로 자주 쓰는 컬럼을 앞에 두고 그다음 범위 조건과 정렬 조건을 맞춘다",
        "cardinality가 가장 낮은 컬럼을 무조건 맨 앞에 둔다",
        "알파벳 순서로 컬럼을 배치한다",
        "범위 조건 컬럼을 항상 맨 앞에 두고 동등 조건을 뒤로 보낸다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 동등 조건으로 자주 쓰는 컬럼을 앞에 두고 그다음 범위 조건과 정렬 조건을 맞추라고 한다. 실제 결정은 대표 쿼리의 EXPLAIN ANALYZE와 selectivity, order by 제거 여부로 확인한다.",
    },
    {
      id: "q10",
      question: "트랜잭션 격리 수준을 높이면 어떤 trade-off가 있는가?",
      choices: [
        "이상 현상도 줄고 lock·retry 비용도 함께 줄어든다",
        "이상 현상은 줄지만 lock, retry, abort 비용이 증가한다",
        "이상 현상은 그대로지만 성능만 좋아진다",
        "격리 수준은 성능에 아무 영향을 주지 않는다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 격리 수준이 높을수록 이상 현상은 줄지만 lock, retry, abort 비용이 증가한다고 한다. 도메인 불변식이 어떤 이상 현상을 허용하지 않는지 먼저 정하고 DB 엔진의 실제 격리 동작을 확인해야 한다.",
    },
    {
      id: "q11",
      question: "Serializable에서 retry가 필요할 수 있는 이유로 옳은 것은?",
      choices: [
        "Serializable은 모든 lock을 무시하므로 요청이 항상 실패하기 때문",
        "Serializable은 snapshot을 만들지 않아 매번 재실행이 강제되기 때문",
        "DB가 직렬 실행과 충돌하는 transaction을 abort시켜 정합성을 지키기 때문",
        "Serializable은 replica에서만 동작해 primary 재시도가 필요하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 DB가 직렬 실행과 충돌하는 transaction을 abort시켜 정합성을 지키기 때문이라고 한다. 애플리케이션은 serialization failure를 사용자 오류로 보지 말고 제한된 횟수의 재시도로 처리해야 한다.",
    },
    {
      id: "q12",
      question: "deadlock과 lock wait timeout의 차이로 옳은 것은?",
      choices: [
        "deadlock은 순환이 없어도 오래 기다린 경우이고, lock wait timeout은 순환 대기다",
        "둘 다 DB가 반드시 한쪽 transaction을 abort시킨다",
        "deadlock은 network 문제이고, lock wait timeout은 CPU 문제다",
        "deadlock은 서로가 가진 lock을 기다리는 순환 대기라 DB가 한쪽을 중단하고, lock wait timeout은 순환 없이 오래 기다린 경우다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 deadlock이 서로가 가진 lock을 기다리는 순환 대기라 DB가 한쪽을 중단하고, lock wait timeout은 순환이 없어도 오래 기다린 경우로 긴 transaction이나 넓은 update 범위가 원인일 수 있다고 한다.",
    },
    {
      id: "q13",
      question: "무중단 스키마 변경의 올바른 순서는?",
      choices: [
        "expand, migrate, contract 순서로 진행한다",
        "contract, migrate, expand 순서로 진행한다",
        "옛 필드를 먼저 삭제한 뒤 새 컬럼을 추가한다",
        "새 컬럼 추가와 옛 필드 제거를 한 번의 배포로 동시에 처리한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 expand, migrate, contract 순서로 진행한다고 한다. 먼저 호환되게 새 컬럼/테이블을 추가하고 앱이 양쪽을 읽거나 쓰게 한 뒤 backfill·검증을 끝내고, 마지막에 옛 필드를 제거한다.",
    },
    {
      id: "q14",
      question: "기존 테이블에 NOT NULL 컬럼을 안전하게 추가하는 방법은?",
      choices: [
        "처음부터 NOT NULL과 default를 함께 걸어 한 번에 추가한다",
        "처음에는 nullable로 추가해 새 앱이 값을 쓰게 하고 backfill·검증 후 default와 NOT NULL 제약을 추가한다",
        "테이블을 drop하고 새 스키마로 다시 만든다",
        "구버전 앱을 모두 내린 뒤 컬럼을 즉시 NOT NULL로 추가한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 처음에 nullable 컬럼을 추가하고 새 앱이 값을 쓰게 만든 뒤 backfill·검증을 끝내고, 이후 default와 NOT NULL 제약을 추가해야 오래 걸리는 lock과 구버전 앱 호환성 문제를 줄인다고 한다.",
    },
    {
      id: "q15",
      question: "캐시 무효화가 어려운 근본 이유로 옳은 것은?",
      choices: [
        "Redis가 TTL 기능을 제공하지 않기 때문",
        "캐시는 항상 원본 DB보다 최신이라 갱신이 무의미하기 때문",
        "원본 DB와 캐시의 수명, 갱신 시점, 권한 범위가 다르기 때문",
        "캐시 key는 변경할 수 없어 삭제만 가능하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 원본 DB와 캐시의 수명·갱신 시점·권한 범위가 다르기 때문이라고 한다. TTL만으로는 stale data를 허용한다는 뜻이고, write-through나 explicit invalidation은 실패 시 불일치 처리가 필요하다.",
    },
    {
      id: "q16",
      question: "Redis를 primary DB처럼 쓰면 위험한 이유로 옳은 것은?",
      choices: [
        "Redis는 SQL을 지원하지 않아 조회가 불가능하기 때문",
        "Redis는 단일 스레드라 어떤 쓰기도 처리할 수 없기 때문",
        "Redis는 트랜잭션 개념이 전혀 없어 읽기조차 못하기 때문",
        "메모리 기반이라 eviction·persistence·failover 설정에 따라 데이터 손실이나 중복 처리가 생길 수 있기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 Redis가 메모리 기반이고 eviction·persistence·failover 설정에 따라 데이터 손실이나 중복 처리가 생길 수 있어, 원본성·정합성·복구가 중요한 데이터는 RDBMS 같은 source of truth가 필요하다고 한다.",
    },
    {
      id: "q17",
      question: "DB connection pool 크기를 무조건 크게 잡으면 좋은가?",
      choices: [
        "아니다, 너무 크면 DB가 context switching과 lock 경쟁으로 더 느려질 수 있다",
        "그렇다, pool은 클수록 항상 처리량이 선형으로 늘어난다",
        "그렇다, DB max connection과 무관하게 크기를 늘리면 된다",
        "그렇다, pool 크기는 query time에 영향을 주지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 pool이 너무 작으면 대기가 늘고 너무 크면 DB가 context switching과 lock 경쟁으로 더 느려질 수 있다고 한다. app concurrency, DB max connection, query time, p99, pool wait를 보고 정한다.",
    },
    {
      id: "q18",
      question: "primary key와 business key를 분리하는 이유로 옳은 것은?",
      choices: [
        "business key는 조회 속도가 빨라 인덱스로 쓸 수 없기 때문",
        "business key는 정책 변경으로 바뀔 수 있어 참조 안정성이 중요한 surrogate primary key와 분리하는 편이 안전하기 때문",
        "primary key는 사람이 읽을 수 없어 화면에 못 쓰기 때문",
        "business key는 항상 NULL을 허용해야 하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 business key가 정책 변경으로 바뀔 수 있어 surrogate primary key와 business unique key를 분리하는 편이 안전하다고 한다. primary key는 참조 안정성이 중요하다.",
    },
    {
      id: "q19",
      question: "foreign key를 빼기로 했을 때 대신 감당해야 하는 것은?",
      choices: [
        "격리 수준을 Serializable로 올리는 작업",
        "모든 테이블에 대한 soft delete 도입",
        "orphan check와 reconciliation로 정합성 위험을 대신 감당하는 것",
        "connection pool 크기를 두 배로 늘리는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 FK가 정합성에는 강하지만 대량 쓰기·shard·legacy migration에서 비용이 있어, 빼려면 orphan check와 reconciliation로 위험을 대신 감당해야 한다고 한다.",
    },
    {
      id: "q20",
      question: "soft delete가 유발하는 비용으로 옳은 것은?",
      choices: [
        "복구와 audit이 불가능해진다",
        "삭제된 row가 즉시 물리적으로 사라져 참조가 깨진다",
        "모든 읽기가 replica로만 향하게 된다",
        "모든 query에 deleted predicate가 필요하고 unique constraint·index·count가 복잡해지며 retention과 hard delete job이 필요하다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 soft delete가 복구·audit에는 유리하지만 모든 query에 deleted predicate가 필요하고 unique constraint·index·count가 복잡해지며 retention과 hard delete job이 필요하다고 한다.",
    },
    {
      id: "q21",
      question: "TTL jitter를 넣는 이유로 옳은 것은?",
      choices: [
        "같은 TTL로 대량 key가 동시에 만료되면 cache stampede가 생기므로 만료 시점을 분산해 완화한다",
        "TTL jitter는 캐시 hit ratio를 100%로 고정한다",
        "TTL jitter는 Redis 메모리 사용량을 0으로 만든다",
        "TTL jitter는 권한 오염을 원천적으로 제거한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 같은 TTL로 대량 key가 동시에 만료되면 cache stampede가 발생하므로, jitter가 만료 시점을 분산해 Redis miss와 DB read burst를 완화한다고 한다.",
    },
    {
      id: "q22",
      question: "sharding이 감수해야 하는 비용으로 옳은 것은?",
      choices: [
        "단일 노드보다 항상 정합성 검증이 쉬워진다",
        "cross-shard transaction, query, rebalancing 비용이 크므로 shard key와 hot shard 위험을 먼저 봐야 한다",
        "shard key와 무관하게 트래픽이 자동으로 고르게 분산된다",
        "cross-shard transaction이 단일 DB보다 더 빠르고 저렴하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 sharding이 여러 DB 노드로 데이터를 분산하는 설계로, cross-shard transaction·query·rebalancing 비용이 크므로 shard key와 hot shard 위험을 먼저 봐야 한다고 한다.",
    },
    {
      id: "q23",
      question: "optimistic lock과 unique constraint가 각각 보호하는 불변식은?",
      choices: [
        "둘 다 같은 row의 version 충돌만 감지한다",
        "둘 다 business key 중복 생성만 막는다",
        "optimistic lock은 같은 row의 version 충돌을 감지하고, unique constraint는 business key 중복 생성을 막는다",
        "optimistic lock은 중복 생성을 막고, unique constraint는 version 충돌을 감지한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 optimistic lock이 같은 row의 version 충돌을 감지하고 unique constraint가 business key 중복 생성을 막는다고 한다. 둘 다 동시성 방어지만 보호하는 불변식이 다르다.",
    },
    {
      id: "q24",
      question: "긴 transaction이 운영 리스크인 이유로 옳은 것은?",
      choices: [
        "긴 transaction은 격리 수준을 자동으로 낮춘다",
        "긴 transaction은 replica lag를 항상 0으로 만든다",
        "긴 transaction은 인덱스를 무효화해 seq scan을 강제한다",
        "lock과 connection을 오래 붙잡아 대기와 deadlock 가능성을 키우므로 외부 API·파일 처리·긴 계산은 transaction 밖이나 비동기로 빼야 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 긴 transaction이 lock과 connection을 오래 붙잡아 대기와 deadlock 가능성을 키운다고 한다. 외부 API, 파일 처리, 긴 계산은 transaction 밖이나 비동기로 빼야 한다.",
    },
    {
      id: "q25",
      question: "N+1 문제와 느린 단일 쿼리를 구분하는 기준으로 옳은 것은?",
      choices: [
        "N+1은 같은 패턴의 짧은 쿼리가 목록 크기만큼 반복되고, 느린 단일 쿼리는 한 실행 계획 안에서 join·sort·scan·lock wait가 병목이다",
        "N+1은 한 실행 계획이 복잡한 것이고, 느린 단일 쿼리는 같은 쿼리가 반복되는 것이다",
        "둘 다 query count로만 구분되며 실행 계획은 볼 필요가 없다",
        "N+1은 replica lag 때문에, 느린 단일 쿼리는 connection pool 부족 때문에 생긴다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 N+1이 같은 패턴의 짧은 쿼리가 목록 크기만큼 반복되고, 느린 단일 쿼리는 한 실행 계획 안에서 join·sort·scan·lock wait가 병목이라고 한다. query count와 trace span, slow query log를 같이 보면 구분된다.",
    },
    {
      id: "q26",
      question: "autovacuum을 무조건 세게 돌리면 되는가에 대한 옳은 설명은?",
      choices: [
        "그렇다, worker와 cost limit을 높일수록 운영 쿼리도 함께 빨라진다",
        "아니다, worker와 cost limit을 과하게 올리면 운영 쿼리 I/O와 경쟁하므로 테이블별 update rate·bloat·freeze 위험을 보고 조정한다",
        "그렇다, autovacuum은 운영 쿼리 I/O와 절대 경쟁하지 않는다",
        "아니다, autovacuum은 끄고 수동 vacuum만 써야 한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 worker와 cost limit을 과하게 올리면 운영 쿼리 I/O와 경쟁한다고 한다. 테이블별 update rate·bloat·freeze 위험을 보고 특정 테이블 storage parameter와 maintenance window를 조정해야 한다.",
    },
    {
      id: "q27",
      question: "정규화와 반정규화의 trade-off로 옳은 것은?",
      choices: [
        "정규화는 읽기 성능을 얻고 반정규화는 중복을 줄인다",
        "둘 다 동기화 비용 없이 성능을 높인다",
        "정규화는 중복과 update anomaly를 줄이고, 반정규화는 읽기 성능을 얻는 대신 동기화 비용을 만든다",
        "반정규화는 update anomaly를 원천적으로 제거한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정규화가 중복과 update anomaly를 줄이고 반정규화는 읽기 성능을 얻는 대신 동기화 비용을 만든다고 한다. 원본과 파생 데이터 경계를 명확히 해야 한다.",
    },
    {
      id: "q28",
      question: "partitioning을 고려하는 상황으로 옳은 것은?",
      choices: [
        "connection pool이 부족할 때 pool 대신 도입한다",
        "cache hit ratio가 낮을 때 캐시 대신 도입한다",
        "격리 수준을 높이고 싶을 때 도입한다",
        "테이블 크기·retention·time-range query·write volume이 커져 단일 인덱스와 vacuum이 부담될 때 고려하며 partition key 선택이 핵심이다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 partitioning을 테이블 크기·retention·time-range query·write volume이 커져 단일 인덱스와 vacuum이 부담될 때 고려한다고 한다. partition key 선택이 핵심이다.",
    },
    {
      id: "q29",
      question: "배포 후 query plan regression이 생기는 원인으로 옳은 것은?",
      choices: [
        "통계 변화·데이터 분포 변화·parameter skew·index bloat 때문에 plan이 나빠질 수 있다",
        "쿼리 텍스트가 바뀌지 않으면 plan은 절대 바뀌지 않는다",
        "replica를 붙이면 plan이 자동으로 나빠진다",
        "connection pool 크기를 늘리면 plan이 나빠진다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 통계 변화, 데이터 분포 변화, parameter skew, index bloat 때문에 배포 후 query plan이 나빠질 수 있다고 한다. release별 plan과 pg_stat_statements를 비교해야 한다.",
    },
    {
      id: "q30",
      question: "느린 count query를 다루는 접근으로 옳은 것은?",
      choices: [
        "정확한 total count는 항상 필요하므로 무조건 full scan한다",
        "정확한 count가 필요한지 먼저 확인하고, 필요 없으면 hasNext·approximate·cached count를 쓰고 필요하면 조건에 맞는 index와 집계 테이블을 고려한다",
        "count query는 항상 replica로 보내면 정확해진다",
        "count는 캐시하면 권한·필터와 무관하게 항상 안전하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 정확한 count가 필요한지 먼저 확인하고, 필요 없으면 hasNext·approximate count·cached count를 쓰고, 필요하면 조건에 맞는 index와 집계 테이블을 고려한다고 한다.",
    },
    {
      id: "q31",
      question: "cache stampede를 완화하는 기법으로 옳은 것은?",
      choices: [
        "TTL을 무제한으로 늘려 만료를 없앤다",
        "모든 요청이 동시에 DB를 조회하도록 허용한다",
        "single-flight, soft TTL, background refresh, TTL jitter, negative cache로 완화한다",
        "인기 키를 미리 삭제해 항상 miss가 나게 한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 cache stampede가 인기 키 만료 시 요청이 동시에 DB로 몰리는 현상이라고 하며, single-flight·soft TTL·background refresh·TTL jitter·negative cache로 완화한다고 설명한다.",
    },
    {
      id: "q32",
      question: "primary가 불안정할 때 read-only mode가 유용한 이유로 옳은 것은?",
      choices: [
        "read-only mode는 쓰기 성능을 높여준다",
        "read-only mode는 replica lag를 0으로 만든다",
        "read-only mode는 격리 수준을 자동으로 올린다",
        "읽기 제공은 가능한 상황에서 write가 필요한 기능만 막아 사용자 영향을 줄이며, stale data 표시와 쓰기 재개 시 reconciliation을 함께 설계해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 primary가 불안정하지만 읽기 제공은 가능한 경우 read-only mode로 사용자 영향을 줄일 수 있다고 한다. stale data와 쓰기 재개 시 reconciliation을 함께 설계해야 한다.",
    },
  ],
};

export default quiz;
