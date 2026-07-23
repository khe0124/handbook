// Java·Spring·JPA 내부 동작 Q&A(engineering-java-spring-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-java-spring-quiz",
  title: "Java·Spring·JPA 내부 동작 퀴즈",
  sourceQaId: "engineering-java-spring-qa",
  questions: [
    {
      id: "q1",
      question:
        "@Transactional이 동작하지 않는 대표 사례로 본문이 드는 것은?",
      choices: [
        "같은 클래스 내부 self-invocation은 proxy를 거치지 않아 transaction advice가 적용되지 않는다",
        "여러 bean에 걸친 호출은 transaction이 자동으로 병합되어 rollback이 무시된다",
        "public method에 붙이면 proxy가 두 번 감싸져 advice가 상쇄된다",
        "REQUIRED propagation에서는 advice가 항상 비활성화된다",
      ],
      answerIndex: 0,
      explanation:
        "Spring은 proxy 기반 AOP라서 같은 클래스 내부 self-invocation은 proxy를 거치지 않아 transaction advice가 적용되지 않는다. public method 경계와 bean 간 호출을 함께 봐야 한다.",
    },
    {
      id: "q2",
      question:
        "private method에 @Transactional을 붙이면 어떻게 되는가?",
      choices: [
        "compile 시점에 오류가 발생해 빌드가 실패한다",
        "proxy는 외부에서 호출되는 bean method를 감싸므로 private method에는 advice가 걸리지 않는다",
        "private이라도 같은 클래스라면 advice가 정상 적용된다",
        "advice가 걸리되 rollback만 되고 commit은 무시된다",
      ],
      answerIndex: 1,
      explanation:
        "Spring proxy는 외부에서 호출되는 bean method를 감싸므로 private method에는 advice가 걸리지 않는다. 트랜잭션이 필요하면 public transactional 경계를 별도 bean으로 옮겨야 한다.",
    },
    {
      id: "q3",
      question:
        "@Transactional(readOnly = true)에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "DB 레벨에서 insert/update SQL을 강제로 차단하는 보안 경계다",
        "persistence context 자체를 열지 않아 조회도 불가능해진다",
        "flush mode 최적화와 dirty checking 비용 감소에 영향을 줄 수 있으나 쓰기 방지 보안 장치로 믿으면 안 된다",
        "모든 DB/driver에서 반드시 read-only transaction으로 실행됨을 보장한다",
      ],
      answerIndex: 2,
      explanation:
        "readOnly는 Hibernate flush mode 최적화와 dirty checking 비용 감소에 영향을 줄 수 있고 driver에 따라 hint로 전달될 수 있지만, 쓰기 방지 보안 장치로 믿으면 안 되며 SQL log로 insert가 나가는지 확인해야 한다.",
    },
    {
      id: "q4",
      question:
        "JPA dirty checking과 flush에 대한 설명으로 옳은 것은?",
      choices: [
        "flush는 곧 DB commit이므로 flush 후에는 rollback해도 변경이 남는다",
        "dirty checking은 entity마다 개발자가 명시적으로 save를 호출해야 동작한다",
        "flush는 오직 transaction commit 시점에만 단 한 번 발생한다",
        "persistence context가 entity 스냅샷을 보관해 변경을 감지하고 flush 시 SQL을 생성하며, flush는 DB commit과 같은 말이 아니다",
      ],
      answerIndex: 3,
      explanation:
        "영속성 컨텍스트가 entity 스냅샷을 보관하고 변경을 감지해 flush 시 SQL을 생성한다. flush는 query 실행 전, explicit flush, commit 시 발생할 수 있고 DB commit과 같은 말이 아니다.",
    },
    {
      id: "q5",
      question:
        "flush 후 같은 transaction이 rollback되면 DB는 어떻게 되는가?",
      choices: [
        "flush는 SQL을 보낼 뿐 commit이 아니므로 변경은 사라지지만, constraint violation처럼 flush 시점에 먼저 터지는 오류는 있다",
        "flush된 SQL은 이미 반영되어 rollback해도 변경이 남는다",
        "rollback이 flush를 무효화하지 못해 부분 커밋 상태가 된다",
        "flush 시점에 자동 commit이 일어나 rollback 자체가 불가능하다",
      ],
      answerIndex: 0,
      explanation:
        "flush는 SQL을 DB에 보낼 뿐 commit은 아니다. rollback되면 변경은 사라지지만, constraint violation처럼 flush 시점에 먼저 터지는 오류가 있으므로 flush SQL과 rollback 후 조회를 같이 확인한다.",
    },
    {
      id: "q6",
      question:
        "JPQL bulk update 후 이미 로딩된 entity가 stale해지는 이유는?",
      choices: [
        "bulk update가 1차 캐시를 통째로 비워 이후 조회가 null을 반환하기 때문",
        "bulk update는 persistence context의 entity snapshot을 갱신하지 않고 DB row를 직접 바꾸기 때문",
        "bulk update는 dirty checking을 두 번 실행해 값을 되돌리기 때문",
        "bulk update가 transaction을 자동 commit해 스냅샷이 초기화되기 때문",
      ],
      answerIndex: 1,
      explanation:
        "JPQL bulk update는 영속성 컨텍스트의 entity snapshot을 갱신하지 않고 DB row를 직접 바꾼다. 이미 로딩된 entity는 예전 값을 들고 있어 clear/refresh 없이는 dirty checking이 DB 변경을 덮을 수 있다.",
    },
    {
      id: "q7",
      question:
        "N+1 문제를 발견하는 방법으로 본문이 드는 것은?",
      choices: [
        "compile 단계의 정적 분석 경고만으로 충분히 발견된다",
        "heap dump의 dominator tree로 N+1 쿼리를 식별한다",
        "query count test, SQL log, APM span으로 반복되는 추가 쿼리를 발견한다",
        "GC log의 pause 빈도로 N+1을 판별한다",
      ],
      answerIndex: 2,
      explanation:
        "N+1은 목록 조회 후 각 entity의 연관을 lazy load하며 추가 쿼리가 반복되는 문제로, query count test, SQL log, APM span으로 발견하고 fetch join·entity graph·batch size·DTO projection 중 요구에 맞게 고른다.",
    },
    {
      id: "q8",
      question:
        "to-many fetch join과 pagination을 함께 쓸 때 생기는 문제는?",
      choices: [
        "fetch join이 pagination을 자동 비활성화해 전체 row가 조회된다",
        "parent가 중복 제거되어 항상 page size보다 많은 결과가 나온다",
        "pagination이 fetch join의 join 조건을 무시해 Cartesian product가 사라진다",
        "DB row가 child 수만큼 늘어나 limit/offset이 parent 기준 pagination과 어긋난다",
      ],
      answerIndex: 3,
      explanation:
        "to-many fetch join은 DB row가 child 수만큼 늘어나 limit/offset이 parent 기준 pagination과 어긋난다. ID만 먼저 page로 뽑은 뒤 fetch query를 실행하거나 batch size를 쓰는 패턴을 검증한다.",
    },
    {
      id: "q9",
      question:
        "DTO projection이 lazy loading을 피하는 방식은?",
      choices: [
        "entity proxy를 반환하지 않고 query에서 필요한 컬럼을 DTO로 바로 채워 serializer가 추가 SQL을 만들 여지를 줄인다",
        "lazy association을 eager로 강제 전환해 미리 모두 로딩한다",
        "persistence context를 열지 않아 transaction 없이 실행된다",
        "2차 캐시에 association을 미리 적재해 재조회를 없앤다",
      ],
      answerIndex: 0,
      explanation:
        "DTO projection은 entity proxy를 반환하지 않고 query에서 필요한 컬럼을 DTO로 바로 채우기 때문에 serializer가 association을 따라가며 추가 SQL을 만들 여지가 줄어든다.",
    },
    {
      id: "q10",
      question:
        "JVM 메모리와 thread 병목에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "CPU 사용률이 낮으면 병목은 반드시 메모리 부족이다",
        "CPU가 낮아도 thread가 DB pool이나 lock에서 대기하면 latency가 커질 수 있다",
        "thread pool을 키우면 downstream 포화와 무관하게 처리량이 항상 는다",
        "heap이 충분하면 thread 대기는 latency에 영향을 주지 않는다",
      ],
      answerIndex: 1,
      explanation:
        "heap·stack·metaspace·direct memory와 thread pool queue, blocking call, GC pause를 함께 봐야 한다. CPU가 낮아도 thread가 DB pool이나 lock에서 대기하면 latency가 커질 수 있다.",
    },
    {
      id: "q11",
      question:
        "OOM과 memory leak의 관계로 옳은 것은?",
      choices: [
        "OOM과 leak은 같은 현상의 다른 이름이다",
        "leak은 항상 즉시 OOM으로 이어진다",
        "OOM은 메모리 할당 실패 현상이고 leak은 필요 없는 객체가 reference 때문에 회수되지 않는 원인 중 하나다",
        "OOM은 원인이고 leak은 그 결과로 나타나는 현상이다",
      ],
      answerIndex: 2,
      explanation:
        "둘은 같지 않다. OOM은 메모리 할당 실패 현상이고 leak은 객체가 더 필요 없는데 reference 때문에 회수되지 않는 원인 중 하나다. heap dump, allocation profile, GC log로 분리한다.",
    },
    {
      id: "q12",
      question:
        "Spring singleton bean의 thread-safety에 대한 설명으로 옳은 것은?",
      choices: [
        "singleton bean은 Spring이 모든 field 접근을 자동으로 동기화한다",
        "singleton이면 request마다 새 인스턴스가 생겨 상태가 섞이지 않는다",
        "singleton bean의 mutable field는 JVM이 thread별로 복제해 안전하다",
        "singleton은 인스턴스를 하나만 만든다는 뜻이지 내부 상태 접근을 자동 동기화한다는 뜻이 아니다",
      ],
      answerIndex: 3,
      explanation:
        "Spring singleton은 인스턴스를 하나만 만든다는 뜻이지 내부 상태 접근을 자동으로 동기화한다는 뜻이 아니다. field에 사용자별 값을 두면 여러 request thread가 공유하므로 mutable field를 찾아야 한다.",
    },
    {
      id: "q13",
      question:
        "Tomcat worker thread에서 ThreadLocal의 위험은?",
      choices: [
        "thread가 재사용되므로 remove하지 않으면 다음 request에 이전 사용자 정보나 trace context가 남을 수 있다",
        "ThreadLocal은 request마다 새 thread를 강제 생성해 성능을 떨어뜨린다",
        "ThreadLocal 값은 GC 대상이 아니라 반드시 OOM을 유발한다",
        "ThreadLocal은 singleton bean에서만 동작하고 prototype에서는 무시된다",
      ],
      answerIndex: 0,
      explanation:
        "Tomcat worker thread는 재사용되므로 ThreadLocal을 지우지 않으면 다음 request에 사용자 정보나 trace context가 남을 수 있다. filter finally에서 remove하고 async/virtual thread 전환 시 propagation을 테스트해야 한다.",
    },
    {
      id: "q14",
      question:
        "Propagation REQUIRED와 REQUIRES_NEW의 차이는?",
      choices: [
        "REQUIRED는 항상 새 transaction을 만들고 REQUIRES_NEW는 기존 것을 재사용한다",
        "REQUIRED는 기존 transaction에 참여하고 없으면 새로 만들며, REQUIRES_NEW는 기존 것을 suspend하고 별도 transaction을 연다",
        "둘 다 항상 같은 connection을 공유해 commit/rollback이 함께 움직인다",
        "REQUIRES_NEW는 rollback을 금지하고 REQUIRED는 commit을 금지한다",
      ],
      answerIndex: 1,
      explanation:
        "REQUIRED는 기존 transaction이 있으면 참여하고 없으면 새로 만든다. REQUIRES_NEW는 기존 transaction을 suspend하고 별도 transaction을 열어 commit/rollback 독립성을 만든다.",
    },
    {
      id: "q15",
      question:
        "REQUIRES_NEW가 connection pool에 주는 영향은?",
      choices: [
        "inner transaction이 outer의 connection을 그대로 써서 pool 사용량이 줄어든다",
        "REQUIRES_NEW는 connection을 쓰지 않고 메모리에서만 처리된다",
        "outer transaction이 connection을 잡은 상태에서 inner가 추가 connection을 요구해 pool이 작으면 acquire 대기가 늘 수 있다",
        "pool 크기와 무관하게 항상 즉시 새 connection을 확보한다",
      ],
      answerIndex: 2,
      explanation:
        "outer transaction이 connection을 잡은 상태에서 inner REQUIRES_NEW가 추가 connection을 요구할 수 있어, pool이 작으면 대기와 deadlock처럼 보이는 지연을 만들 수 있다. connection pool metric으로 검증한다.",
    },
    {
      id: "q16",
      question:
        "Spring 기본 설정에서 checked/runtime exception과 rollback의 관계는?",
      choices: [
        "checked exception에서만 rollback하고 unchecked는 무시한다",
        "모든 exception에서 항상 rollback한다",
        "exception 종류와 무관하게 rollbackFor를 지정해야만 rollback된다",
        "unchecked exception에서 rollback하고 checked exception은 rollback하지 않는다",
      ],
      answerIndex: 3,
      explanation:
        "Spring 기본 설정은 unchecked exception에서 rollback하고 checked exception은 rollback하지 않는다. 도메인 실패를 어떤 exception으로 모델링할지와 rollbackFor 설정을 명확히 해야 한다.",
    },
    {
      id: "q17",
      question:
        "transactional method 안에서 예외를 catch해 밖으로 전파하지 않으면?",
      choices: [
        "Spring은 정상 종료로 보고 commit할 수 있으므로, 실패라면 setRollbackOnly를 호출하거나 예외를 다시 던져야 한다",
        "catch만으로 자동 rollback되어 변경이 취소된다",
        "예외를 삼키면 transaction이 무한 대기 상태로 남는다",
        "catch 시점에 flush가 취소되어 SQL 자체가 나가지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "transactional method 밖으로 예외가 전파되지 않으면 Spring은 정상 종료로 보고 commit할 수 있다. 복구가 아니라 실패라면 setRollbackOnly를 호출하거나 예외를 다시 던지고 transaction log로 확인한다.",
    },
    {
      id: "q18",
      question:
        "Lombok @Data를 JPA entity에 쓰면 위험한 이유는?",
      choices: [
        "@Data가 no-arg constructor를 제거해 Hibernate가 entity를 생성하지 못한다",
        "equals·hashCode·toString에 모든 field를 포함해 lazy association 접근, 순환 참조, mutable field hash 변경을 만들 수 있다",
        "@Data는 모든 field를 final로 만들어 dirty checking을 막는다",
        "@Data가 entity를 record로 변환해 proxy 생성을 깨뜨린다",
      ],
      answerIndex: 1,
      explanation:
        "@Data는 equals·hashCode·toString에 모든 field를 포함할 수 있어 lazy association 접근, 순환 참조, mutable field hash 변경을 만들 수 있다. entity에서는 필요한 method만 명시해야 한다.",
    },
    {
      id: "q19",
      question:
        "중복 이메일 검증에서 race condition의 최종 방어선은?",
      choices: [
        "service에서의 사전 조회만으로 동시 생성까지 완전히 막을 수 있다",
        "Bean Validation의 @Unique annotation이 DB까지 강제한다",
        "DB unique constraint이며, service 선조회는 사용자 친화 오류를 줄 뿐이다",
        "controller validation이 request boundary에서 중복을 원천 차단한다",
      ],
      answerIndex: 2,
      explanation:
        "service에서 먼저 조회해 사용자 친화 오류를 줄 수 있지만 race condition의 최종 방어는 DB unique constraint다. 동시 생성 integration test와 unique violation 매핑을 확인해야 한다.",
    },
    {
      id: "q20",
      question:
        "JPA entity field에 Optional을 두면 불편한 이유는?",
      choices: [
        "Optional은 직렬화가 불가능해 entity 저장 자체가 실패한다",
        "Hibernate가 Optional을 별도 테이블로 매핑해 join이 늘어난다",
        "Optional field는 항상 lazy loading 대상이 되어 N+1을 유발한다",
        "Optional wrapper가 mapping, dirty checking, reflection 기반 접근을 복잡하게 만든다",
      ],
      answerIndex: 3,
      explanation:
        "Hibernate는 entity field를 실제 컬럼 값과 proxy/lazy loading 대상으로 다루는데 Optional wrapper는 mapping, dirty checking, reflection 기반 접근을 복잡하게 만든다. entity 내부는 nullable field로 두는 편이 명확하다.",
    },
    {
      id: "q21",
      question:
        "JPA entity를 Java record로 만들면 깨지는 것은?",
      choices: [
        "record는 final field와 canonical constructor 중심이라 no-arg constructor, dirty checking, proxy 생성 모델에 맞지 않는다",
        "record는 accessor가 없어 Hibernate가 컬럼 값을 읽지 못한다",
        "record는 상속이 가능해 entity 계층 구조가 무너진다",
        "record는 직렬화가 안 돼 DTO로도 쓸 수 없다",
      ],
      answerIndex: 0,
      explanation:
        "JPA entity는 no-arg constructor, identity lifecycle, lazy proxy, field 변경 추적이 필요하다. record는 final field와 canonical constructor 중심이라 dirty checking과 proxy 생성 모델에 맞지 않는다.",
    },
    {
      id: "q22",
      question:
        "CascadeType.REMOVE가 위험할 수 있는 경우는?",
      choices: [
        "child가 없는 parent를 삭제할 때 항상 예외가 발생한다",
        "child가 다른 aggregate에서도 참조되거나 공유되면 parent 삭제가 의도치 않은 대량 삭제로 이어질 수 있다",
        "cascade는 DB constraint를 무시하므로 FK 오류를 감춘다",
        "REMOVE는 orphanRemoval과 달리 flush 없이 즉시 커밋된다",
      ],
      answerIndex: 1,
      explanation:
        "child가 다른 aggregate에서도 참조되거나 공유되는 데이터면 parent 삭제가 의도치 않은 대량 삭제로 이어질 수 있다. FK 관계와 delete SQL을 테스트하고 소유 관계가 명확한 경우에만 쓴다.",
    },
    {
      id: "q23",
      question:
        "@PostConstruct에서 @Transactional을 기대하면 위험한 이유는?",
      choices: [
        "@PostConstruct는 transaction을 강제로 read-only로 고정한다",
        "초기화 중에는 connection pool이 아직 열리지 않아 항상 실패한다",
        "초기화 시점에는 proxy가 완전히 적용되기 전이거나 외부 proxy 호출이 아니어서 transaction advice가 걸리지 않을 수 있다",
        "@PostConstruct는 두 번 실행되어 commit이 중복된다",
      ],
      answerIndex: 2,
      explanation:
        "초기화 시점에는 proxy가 완전히 적용되기 전이거나 외부 proxy 호출이 아니어서 transaction advice가 걸리지 않을 수 있다. 초기 데이터 작업은 ApplicationRunner나 별도 bean 호출로 옮긴다.",
    },
    {
      id: "q24",
      question:
        "Filter와 Interceptor의 차이로 옳은 것은?",
      choices: [
        "Interceptor가 Filter보다 앞단에서 동작해 CORS를 먼저 처리한다",
        "Filter는 controller 정보에 접근할 수 있고 Interceptor는 접근할 수 없다",
        "둘은 실행 위치가 같아 순서를 구분할 필요가 없다",
        "Filter는 Servlet 앞단에서 동작해 Spring MVC 밖 요청도 다루고, Interceptor는 handler mapping 이후라 controller 정보에 접근할 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "Filter는 Servlet 앞단에서 동작해 보안·CORS·encoding처럼 Spring MVC 밖 요청도 다룰 수 있다. Interceptor는 handler mapping 이후라 controller 정보에 접근할 수 있다.",
    },
    {
      id: "q25",
      question:
        "DataJpaTest에서 H2를 쓰면 놓칠 수 있는 것은?",
      choices: [
        "운영 DB의 dialect, index, lock, isolation, constraint 이름 차이를 놓칠 수 있다",
        "H2는 JPA를 지원하지 않아 repository 자체가 로딩되지 않는다",
        "H2에서는 transaction rollback이 동작하지 않아 격리 테스트가 불가능하다",
        "H2는 in-memory라 dirty checking이 비활성화된다",
      ],
      answerIndex: 0,
      explanation:
        "H2는 운영 DB의 dialect, index, lock, isolation, constraint 이름 차이를 놓칠 수 있다. PostgreSQL 같은 운영 DB와 맞춘 Testcontainers test로 query와 migration을 검증하는 편이 안전하다.",
    },
    {
      id: "q26",
      question:
        "virtual thread가 해결하지 못하는 것은?",
      choices: [
        "blocking thread 비용과 DB connection 부족을 모두 자동 해소한다",
        "DB connection, lock, downstream rate limit 같은 실제 제한은 그대로 남는다",
        "carrier thread pinning을 원천적으로 없앤다",
        "외부 API timeout을 자동으로 재시도로 우회한다",
      ],
      answerIndex: 1,
      explanation:
        "virtual thread는 blocking thread 비용은 줄이지만 DB connection, lock, downstream rate limit 같은 실제 제한은 그대로다. carrier thread pinning, JDBC pool 대기, 외부 API timeout을 metric과 thread dump로 확인해야 한다.",
    },
    {
      id: "q27",
      question:
        "entity의 toString에서 연관관계를 출력하면 생기는 문제는?",
      choices: [
        "toString은 컴파일 오류를 유발해 빌드가 실패한다",
        "toString이 dirty checking을 촉발해 의도치 않은 update가 나간다",
        "로그 한 줄이 lazy association 초기화를 유발해 추가 SQL이나 LazyInitializationException을 만들 수 있고 양방향이면 순환 출력도 생긴다",
        "연관관계 출력은 2차 캐시를 강제로 무효화한다",
      ],
      answerIndex: 2,
      explanation:
        "toString이 lazy association을 건드리면 로그 한 줄이 초기화를 유발해 추가 SQL이나 LazyInitializationException을 만들 수 있고, 양방향 관계면 순환 출력도 생긴다. entity 로그는 id와 핵심 scalar field로 제한한다.",
    },
    {
      id: "q28",
      question:
        "Actuator의 env, heapdump endpoint를 조심해야 하는 이유는?",
      choices: [
        "이 endpoint들은 호출 시마다 heap을 비워 OOM을 유발한다",
        "env endpoint는 설정을 실시간으로 덮어써 장애를 만든다",
        "heapdump endpoint는 GC를 강제 중단시켜 latency를 높인다",
        "secret, token, 개인정보, 내부 class 구조가 노출될 수 있어 exposure와 security matcher를 좁혀야 한다",
      ],
      answerIndex: 3,
      explanation:
        "env와 heapdump endpoint는 secret, token, 개인정보, 내부 class 구조를 노출할 수 있다. management endpoint exposure와 security matcher를 좁히고 인증 없는 접근 테스트로 막혀 있는지 확인한다.",
    },
    {
      id: "q29",
      question:
        "OSIV(Open Session In View)가 켜져 있을 때 생기는 위험은?",
      choices: [
        "view 렌더링 중 lazy loading이 가능해져 controller 밖에서 SQL이 발생하고 transaction 경계와 조회 계획이 흐려진다",
        "OSIV를 켜면 lazy association이 아예 초기화되지 않아 접근 시 항상 예외가 난다",
        "OSIV는 request마다 persistence context를 두 개 열어 dirty checking을 두 배로 실행한다",
        "OSIV는 controller 단계에서만 동작하고 view나 serializer 단계에는 영향을 주지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "OSIV가 켜지면 view 렌더링 중 lazy loading이 가능해져 controller 밖에서 SQL이 발생한다. transaction 경계와 조회 계획이 흐려지고 화면 필드 추가가 N+1을 만들 수 있어 OSIV 설정, SQL log, query count test로 위험을 드러내야 한다.",
    },
    {
      id: "q30",
      question:
        "thread dump에서 BLOCKED와 WAITING 상태의 차이는?",
      choices: [
        "BLOCKED는 CPU 연산 중인 상태이고 WAITING은 GC로 중단된 상태다",
        "BLOCKED는 monitor lock 진입 대기이고 WAITING/TIMED_WAITING은 park, sleep, queue, socket, pool acquire 같은 대기를 포함한다",
        "BLOCKED와 WAITING은 사실상 같은 의미이고 JVM 버전에 따라 이름만 다르다",
        "WAITING은 lock 진입 대기이고 BLOCKED는 sleep이나 timeout으로 인한 대기다",
      ],
      answerIndex: 1,
      explanation:
        "BLOCKED는 monitor lock 진입 대기이고 WAITING/TIMED_WAITING은 park, sleep, queue, socket, pool acquire 같은 대기를 포함한다. 같은 stack에 request thread가 몰려 있는지와 lock owner를 찾아 병목 지점을 좁힌다.",
    },
    {
      id: "q31",
      question:
        "prototype scope bean을 singleton bean에 주입하면 어떻게 되는가?",
      choices: [
        "prototype bean은 singleton에 주입돼도 매 호출마다 새 인스턴스가 자동 생성된다",
        "prototype scope는 Spring이 자동으로 thread별 인스턴스를 만들어 공유한다",
        "생성 시점의 prototype 하나가 고정되므로, 매번 새 객체가 필요하면 ObjectProvider나 lookup method를 써야 한다",
        "prototype bean은 애플리케이션당 하나만 생성되어 singleton처럼 재사용된다",
      ],
      answerIndex: 2,
      explanation:
        "prototype bean을 singleton에 주입하면 singleton 생성 시점의 prototype 하나가 고정된다. 매번 새 객체가 필요하면 ObjectProvider나 lookup method를 쓰고 생성 횟수를 bean lifecycle log로 확인한다.",
    },
    {
      id: "q32",
      question:
        "GC 옵션을 튜닝하기 전에 먼저 확인해야 하는 것은?",
      choices: [
        "GC 알고리즘을 먼저 바꿔 pause를 줄이는 것이 항상 올바른 첫 단계다",
        "heap 크기를 최대로 키우면 GC 튜닝 자체가 불필요해진다",
        "GC log만 보면 충분하고 allocation rate나 live set 크기는 볼 필요가 없다",
        "allocation rate, live set 크기, heap sizing, large object 생성 위치를 먼저 봐야 GC 옵션이 누수나 과도한 객체 생성을 숨기지 않는다",
      ],
      answerIndex: 3,
      explanation:
        "GC 옵션부터 바꾸면 누수나 과도한 객체 생성을 숨길 수 있다. allocation rate, live set 크기, heap sizing, large object 생성 위치를 먼저 보고 JFR, GC log, load test 조건을 고정해 병목을 재현한다.",
    },
    {
      id: "q33",
      question:
        "Spring Security에서 request matcher 순서가 중요한 이유는?",
      choices: [
        "먼저 매칭된 chain이나 rule이 적용되므로 넓은 permitAll이 앞에 있으면 보호 경로가 열릴 수 있다",
        "matcher 순서와 무관하게 항상 가장 좁은 rule이 우선 적용된다",
        "Spring Security는 모든 rule을 평가한 뒤 가장 엄격한 것을 자동으로 고른다",
        "permitAll은 선언 위치와 상관없이 인증 rule보다 항상 나중에 평가된다",
      ],
      answerIndex: 0,
      explanation:
        "먼저 매칭된 security chain이나 rule이 적용되므로 넓은 permitAll이 앞에 있으면 보호 경로가 열릴 수 있다. Security debug log와 endpoint별 authorization test로 실제 매칭을 확인한다.",
    },
    {
      id: "q34",
      question:
        "@PrePersist에서 외부 API를 호출하면 위험한 이유는?",
      choices: [
        "@PrePersist는 transaction 밖에서 실행되어 외부 호출 실패가 commit에 영향을 주지 않는다",
        "flush 시점에 callback이 실행되므로 외부 API latency나 실패가 transaction commit 경로에 섞이고 재시도·rollback 의미가 불명확해진다",
        "@PrePersist의 외부 호출은 Spring이 자동으로 async 처리해 항상 안전하다",
        "@PrePersist 안에서는 외부 API 호출이 컴파일 단계에서 금지된다",
      ],
      answerIndex: 1,
      explanation:
        "flush 시점에 callback이 실행되므로 @PrePersist의 외부 API latency나 실패가 transaction commit 경로에 섞인다. 재시도와 rollback 의미가 불명확해지므로 domain service나 event 처리로 분리하는 편이 안전하다.",
    },
    {
      id: "q35",
      question:
        "SecurityContext가 async 실행이나 thread pool 전환에서 문제가 되는 이유는?",
      choices: [
        "SecurityContext는 전역 static 저장소라 모든 thread가 항상 같은 값을 본다",
        "SecurityContext는 DB session에 저장되어 thread 전환과 무관하게 유지된다",
        "기본적으로 thread-local에 저장되므로 async 실행이나 thread pool 전환 시 context가 사라지거나 잘못 전파될 수 있다",
        "SecurityContext는 request scope bean이라 async thread에도 자동으로 복제된다",
      ],
      answerIndex: 2,
      explanation:
        "기본적으로 SecurityContext는 thread-local에 저장된다. async 실행이나 thread pool 전환 시 context가 사라지거나 잘못 전파될 수 있어 DelegatingSecurityContext 계열 사용과 cleanup test가 필요하다.",
    },
    {
      id: "q36",
      question:
        "Spring Data repository의 method 이름 query는 어디서 한계가 오는가?",
      choices: [
        "method 이름 query는 연관관계를 항상 fetch join으로 자동 로딩한다",
        "method 이름 query는 어떤 복잡한 조건도 표현할 수 있어 JPQL이 필요 없다",
        "method 이름 query는 N+1을 컴파일 단계에서 자동으로 제거한다",
        "이름 query는 fetch plan을 자동 해결하지 않아 연관 접근 시 추가 select가 나므로, 복잡한 fetch plan·pagination·lock·projection이 필요하면 JPQL, QueryDSL, specification을 고려한다",
      ],
      answerIndex: 3,
      explanation:
        "repository method 이름 query는 간단한 조건에는 좋지만 fetch plan을 자동으로 해결하지 않아 연관 접근이 있으면 추가 select가 발생한다. 복잡한 fetch plan, pagination, lock, projection이 필요하면 JPQL, QueryDSL, specification을 고려하고 query count assertion으로 확인한다.",
    },
  ],
};

export default quiz;
