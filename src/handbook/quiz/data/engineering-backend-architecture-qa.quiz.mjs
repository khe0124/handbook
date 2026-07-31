// 백엔드 아키텍처 Q&A(engineering-backend-architecture-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-backend-architecture-quiz",
  title: "백엔드 아키텍처 퀴즈",
  sourceQaId: "engineering-backend-architecture-qa",
  questions: [
    {
      id: "q1",
      question: "마이크로서비스로 분리할 준비가 됐다는 신호로 가장 정확한 것은?",
      choices: [
        "모듈 경계, API 계약, 데이터 소유권, 배포 독립성, 관측성, 운영 owner가 준비됐을 때",
        "코드베이스가 일정 규모를 넘어 파일과 클래스 수가 많아졌을 때",
        "새 프레임워크와 컨테이너 오케스트레이션 도입이 끝났을 때",
        "팀 인원이 늘어 한 저장소를 여러 명이 동시에 수정하기 시작했을 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 모듈 경계·API 계약·데이터 소유권·배포 독립성·관측성·운영 owner가 준비됐을 때 분리 신호로 본다. 코드가 커졌다는 이유만으로 나누면 네트워크를 탄 모놀리스가 된다고 못박는다.",
    },
    {
      id: "q2",
      question: "여러 서비스가 공유 DB를 쓰면 독립 서비스로 보기 어려운 이유는?",
      choices: [
        "네트워크 latency가 커져 응답 속도가 느려지기 때문",
        "같은 테이블을 직접 읽고 쓰면 schema 변경·lock·migration·장애 책임이 함께 묶이기 때문",
        "DB connection pool이 부족해져 처리량이 떨어지기 때문",
        "서비스마다 다른 ORM을 써서 매핑이 충돌하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 여러 서비스가 같은 테이블을 직접 읽고 쓰면 schema 변경·lock·migration·장애 책임이 함께 묶인다고 설명한다. 독립 서비스라면 write owner가 하나이고 다른 서비스는 API·event·read model 계약으로 접근해야 한다.",
    },
    {
      id: "q3",
      question: "Bounded context는 무엇을 기준으로 나누는가?",
      choices: [
        "테이블과 컬럼 구조를 기준으로 나눈다",
        "팀이 사용하는 프로그래밍 언어와 프레임워크를 기준으로 나눈다",
        "언어, 불변식, 변경 이유, 생명주기를 기준으로 나눈다",
        "API 엔드포인트 개수와 트래픽 양을 기준으로 나눈다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 bounded context를 테이블이 아니라 언어·불변식·변경 이유·생명주기 기준으로 나눈다고 답한다. 같은 주문이라는 단어도 결제·물류·정산에서 다른 의미면 다른 모델과 경계를 가져야 한다.",
    },
    {
      id: "q4",
      question: "이벤트 기반 아키텍처의 가장 큰 비용으로 본문이 꼽는 것은?",
      choices: [
        "메시지 브로커 라이선스와 인프라 운영에 드는 금전 비용",
        "동기 호출 대비 절대적으로 느린 처리량",
        "이벤트 직렬화/역직렬화에 드는 CPU 오버헤드",
        "결과적 일관성, replay, ordering, schema evolution, 운영 관측 비용",
      ],
      answerIndex: 3,
      explanation:
        "본문은 결과적 일관성·replay·ordering·schema evolution·운영 관측 비용을 가장 큰 비용으로 든다. 발행자는 outbox와 schema validation을, 소비자는 idempotent·replay-safe·unknown-field tolerant를 갖춰야 한다.",
    },
    {
      id: "q5",
      question: "이벤트 순서 보장에 대한 본문의 입장으로 옳은 것은?",
      choices: [
        "대부분 전역 순서보다 aggregate나 business key 단위 순서가 필요하다",
        "모든 이벤트는 전역 순서를 보장해야 정합성이 유지된다",
        "순서는 소비자가 재정렬하므로 발행 측이 신경 쓸 필요가 없다",
        "타임스탬프만 있으면 순서는 자동으로 보장된다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 대부분 전역 순서보다 aggregate나 business key 단위 순서가 필요하다고 답한다. 전역 순서는 throughput과 가용성을 크게 희생하므로 실제 불변식이 요구하는 범위를 partition key와 sequence로 좁혀야 한다.",
    },
    {
      id: "q6",
      question: "좋은 ADR이 특히 분명히 남겨야 하는 것은?",
      choices: [
        "선택한 기술 스택의 벤치마크 수치와 성능 그래프",
        "포기한 것(거절한 대안)과 다시 바꿔야 할 신호(재검토 조건)",
        "구현 담당자의 이름과 작업 일정",
        "코드 예시와 상세한 클래스 다이어그램",
      ],
      answerIndex: 1,
      explanation:
        "본문은 ADR에 상태·맥락·결정·결과·거절한 대안·재검토 조건을 쓰고, 좋은 ADR은 선택의 장점보다 포기한 것과 다시 바꿔야 할 신호를 분명히 남긴다고 한다.",
    },
    {
      id: "q7",
      question: "모듈러 모놀리스에 대한 본문의 평가로 옳은 것은?",
      choices: [
        "MSA로 가기 전 반드시 거쳐야 하는 과도기적 단계다",
        "테스트가 어려워 실무에서 권장되지 않는 구조다",
        "분산 운영 비용 없이 코드 경계를 강제하는 강한 선택이다",
        "코드 경계를 강제할 수 없어 결국 빅볼오브머드가 된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 모듈러 모놀리스가 MSA보다 낮은 수준이 아니라, 분산 운영 비용 없이 코드 경계를 강제하는 강한 선택이라고 답한다. 팀 규모·배포 독립성·장애 격리·데이터 소유권 요구가 크지 않으면 더 합리적일 수 있다.",
    },
    {
      id: "q8",
      question: "공유 라이브러리에서 경계 침식을 의심해야 하는 대상은?",
      choices: [
        "여러 서비스가 함께 쓰는 로깅/직렬화 유틸",
        "외부 API를 감싼 client 코드",
        "version 정책을 가진 schema 정의",
        "도메인 정책(비즈니스 규칙)을 공유 라이브러리로 뺀 경우",
      ],
      answerIndex: 3,
      explanation:
        "본문은 도메인 정책이 공유 라이브러리로 빠지면 여러 서비스가 같은 변경 압력에 묶인다고 한다. 유틸·client·schema는 가능하지만 비즈니스 규칙 공유는 경계 침식을 의심해야 한다.",
    },
    {
      id: "q9",
      question: "CQRS를 도입할 만한 시점은?",
      choices: [
        "읽기와 쓰기의 모델, 성능 요구, 스케일 특성이 크게 다를 때",
        "단순 CRUD 화면이 많아 코드가 반복될 때",
        "데이터베이스를 관계형에서 NoSQL로 바꿀 때",
        "트랜잭션 롤백을 자주 처리해야 할 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 읽기와 쓰기의 모델·성능 요구·스케일 특성이 크게 다를 때 CQRS를 도입할 수 있다고 한다. 단순 CRUD에 쓰면 projection·동기화·eventual consistency 비용만 늘 수 있다.",
    },
    {
      id: "q10",
      question: "이벤트 소싱과 audit log의 차이로 옳은 것은?",
      choices: [
        "audit log는 현재 상태의 원천이고 이벤트 소싱은 보조 기록이다",
        "이벤트 소싱은 상태의 원천을 이벤트로 두고 재생해 현재 상태를 만들고, audit log는 행위 증명이 목적이다",
        "둘 다 상태 저장 모델을 대체하며 기능이 동일하다",
        "이벤트 소싱은 규정 준수용이고 audit log는 성능 최적화용이다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 이벤트 소싱이 상태의 원천을 이벤트로 두고 재생해 현재 상태를 만든다고 한다. audit log는 행위 증명이 목적이며 기존 상태 저장 모델 옆에 붙을 수 있어 둘은 다르다.",
    },
    {
      id: "q11",
      question: "이벤트 소싱에서 snapshot이 필요한 이유는?",
      choices: [
        "이벤트를 영구 보관하지 않고 주기적으로 삭제하기 위해",
        "이벤트 스키마 변경 이력을 별도로 기록하기 위해",
        "이벤트 수가 커질 때 매번 처음부터 재생하는 비용을 줄이기 위해",
        "consumer가 unknown field를 무시하도록 강제하기 위해",
      ],
      answerIndex: 2,
      explanation:
        "본문은 이벤트 수가 커지면 매번 처음부터 재생하는 비용이 커지므로 snapshot으로 특정 시점 상태를 저장해 복원 속도를 줄인다고 한다. 단 snapshot schema와 replay 호환성을 함께 관리해야 한다.",
    },
    {
      id: "q12",
      question: "동기 REST와 비동기 이벤트 선택 기준으로 옳은 것은?",
      choices: [
        "즉시 결과가 필요하고 실패를 바로 알려야 하면 동기, 후처리·fan-out·peak 완충·장애 격리가 중요하면 비동기",
        "트래픽이 많으면 무조건 비동기, 적으면 무조건 동기",
        "내부 서비스 간에는 동기, 외부 노출은 비동기가 원칙",
        "데이터 양이 크면 동기, 작으면 비동기가 유리",
      ],
      answerIndex: 0,
      explanation:
        "본문은 사용자 요청 안에서 즉시 결과가 필요하고 실패를 바로 알려야 하면 동기, 후처리·fan-out·peak 완충·장애 격리가 중요하면 비동기를 고려한다고 한다. 비동기는 결과적 일관성 비용을 감당할 수 있어야 한다.",
    },
    {
      id: "q13",
      question: "데이터 소유권이 불명확하면 생기는 문제는?",
      choices: [
        "정합성, 권한, migration, 장애 책임이 흐려진다",
        "쿼리 성능이 느려지고 인덱스가 무효화된다",
        "API 버전 관리가 자동으로 불가능해진다",
        "이벤트 순서가 반드시 뒤바뀐다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 여러 서비스가 같은 데이터를 쓰면 정합성·권한·migration·장애 책임이 흐려진다고 한다. 어떤 서비스가 write owner인지와 다른 서비스가 어떤 read model로 보는지 명확해야 한다.",
    },
    {
      id: "q14",
      question: "아키텍처 결정에 만료(재검토) 조건을 적어야 하는 이유는?",
      choices: [
        "감사 규정에서 문서에 만료일 기재를 요구하기 때문",
        "현재 제약에서 맞는 결정이 미래에도 맞다는 보장이 없어 결정을 교리화하지 않기 위해",
        "오래된 ADR을 자동으로 삭제하기 위해",
        "결정을 내린 사람의 책임 소재를 분명히 하기 위해",
      ],
      answerIndex: 1,
      explanation:
        "본문은 현재 제약에서 맞는 결정이 미래에도 맞는다는 보장이 없다고 한다. 트래픽·팀 수·장애 빈도·배포 충돌·비용 같은 재검토 신호를 적어야 결정을 교리화하지 않는다.",
    },
    {
      id: "q15",
      question: "Anti-corruption layer(ACL)가 필요한 상황은?",
      choices: [
        "여러 내부 서비스가 같은 DTO를 공유해야 할 때",
        "동기 호출 사슬이 길어져 latency가 누적될 때",
        "외부 시스템이나 레거시 모델의 용어·상태·오류가 내부 도메인 모델을 오염시킬 때",
        "읽기 부하가 커져 read model을 분리해야 할 때",
      ],
      answerIndex: 2,
      explanation:
        "본문은 외부 시스템이나 레거시 모델의 용어·상태·오류가 내부 도메인 모델을 오염시킬 때 ACL이 필요하다고 한다. 단순 adapter가 아니라 의미 변환과 실패 계약을 명시하는 경계여야 한다.",
    },
    {
      id: "q16",
      question: "Controller가 repository를 직접 호출하면 생기는 문제는?",
      choices: [
        "요청 계약과 저장소 접근이 붙어 domain invariant와 transaction 경계가 흩어진다",
        "컴파일 타임에 순환 의존이 발생해 빌드가 실패한다",
        "HTTP 응답 직렬화가 자동으로 깨진다",
        "SQL injection이 반드시 발생한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 controller가 repository를 직접 호출하면 요청 계약과 저장소 접근이 붙어 domain invariant와 transaction 경계가 흩어진다고 한다. 변경 경로는 application service를 거치게 해야 한다.",
    },
    {
      id: "q17",
      question: "Hexagonal architecture가 끊어주는 의존성은?",
      choices: [
        "domain이 외부 기술에 의존하지 않도록 port를 안쪽에 두고 adapter가 바깥에서 구현한다",
        "서비스 간 동기 호출을 이벤트로 강제 전환한다",
        "DB와 캐시 사이의 일관성 의존을 제거한다",
        "controller와 view 사이의 렌더링 의존을 끊는다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 hexagonal architecture가 domain이 외부 기술에 의존하지 않게 port를 안쪽에 두고 adapter가 바깥에서 구현한다고 한다. 테스트와 교체 가능성이 좋아지지만 간접 계층 비용이 생긴다.",
    },
    {
      id: "q18",
      question: "Anemic domain model의 신호는?",
      choices: [
        "aggregate가 너무 커서 하나의 변경이 많은 row를 lock한다",
        "entity가 getter/setter만 있고 규칙이 service if문에 흩어져 있다",
        "repository method 이름이 도메인 의도를 표현한다",
        "port와 adapter를 과도하게 쪼개 파일 수가 많아진다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 entity가 getter/setter만 있고 규칙이 service if문에 흩어져 있으면 anemic model 신호라고 한다. 불변식과 상태 전이를 aggregate 경계 안으로 모아야 한다.",
    },
    {
      id: "q19",
      question: "Aggregate boundary를 정의하는 기준으로 옳은 것은?",
      choices: [
        "한 테이블에 매핑되는 entity의 집합이다",
        "같은 팀이 소유하는 도메인 객체의 묶음이다",
        "함께 강한 일관성으로 변경되어야 하는 최소 객체 묶음이다",
        "동일한 API로 조회되는 데이터의 범위다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 aggregate가 함께 강한 일관성으로 변경되어야 하는 최소 객체 묶음이라고 한다. 너무 크면 lock과 transaction 비용이 커지고 너무 작으면 불변식이 밖으로 샌다.",
    },
    {
      id: "q20",
      question: "Outbox 패턴이 없을 때 생기는 대표적 실패는?",
      choices: [
        "consumer가 같은 event를 여러 번 받아 부작용이 중복된다",
        "이벤트 순서가 전역적으로 뒤섞인다",
        "projection lag가 사용자 화면에 그대로 노출된다",
        "DB commit은 성공했는데 이벤트 발행이 실패하거나, 이벤트는 발행됐는데 DB rollback되는 간극이 생긴다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 outbox가 없으면 DB commit은 성공했는데 이벤트 발행이 실패하거나 이벤트는 발행됐는데 DB rollback되는 간극이 생긴다고 한다. 이 간극이 consumer 상태와 source of truth를 다르게 만든다.",
    },
    {
      id: "q21",
      question: "Strangler fig 전환의 핵심 방식으로 옳은 것은?",
      choices: [
        "레거시를 동결한 뒤 신규 시스템을 병렬로 완성해 한 번에 교체한다",
        "레거시 코드를 리팩토링만 반복해 점차 새 구조로 수렴시킨다",
        "레거시 DB를 먼저 신규 schema로 전량 migration한 뒤 코드를 바꾼다",
        "routing이나 기능 경계를 기준으로 새 구현이 일부 트래픽을 받게 하는 점진 전환",
      ],
      answerIndex: 3,
      explanation:
        "본문은 strangler fig가 레거시 전체를 한 번에 바꾸지 않고 routing이나 기능 경계를 기준으로 새 구현이 일부 트래픽을 받게 하는 점진 전환 방식이라고 한다. 첫 대상은 기능 경계가 명확하고 rollback route를 만들 수 있는 흐름을 고른다.",
    },
    {
      id: "q22",
      question: "분산 모놀리스를 드러내는 운영 증상으로 옳은 것은?",
      choices: [
        "서비스마다 다른 언어와 DB를 써서 통합 테스트가 어려운 구조",
        "서비스는 나뉘었지만 함께 배포해야 하고 공유 DB나 동기 호출 사슬로 하나가 느리면 전체가 느려지는 구조",
        "서비스 수가 많아 관측 대시보드가 복잡해진 구조",
        "서비스 경계가 팀 경계와 정확히 일치하는 구조",
      ],
      answerIndex: 1,
      explanation:
        "본문은 서비스는 나뉘었지만 함께 배포해야 하고 공유 DB나 동기 호출 사슬 때문에 하나가 느리면 전체가 느려지는 구조를 분산 모놀리스로 본다. 배포 결합과 장애 전파가 큰 경로부터 write owner를 정하고 직접 접근을 줄여야 한다.",
    },
    {
      id: "q23",
      question: "API gateway에 넣기 적합한 책임의 범위는?",
      choices: [
        "화면별 데이터 조합과 presentation shaping",
        "도메인 불변식 검증과 상태 전이 규칙",
        "routing, authn/authz 일부, rate limit, protocol translation",
        "aggregate 저장과 transaction 경계 관리",
      ],
      answerIndex: 2,
      explanation:
        "본문은 gateway가 routing·authn/authz 일부·rate limit·protocol translation에 적합하다고 한다. 도메인 규칙이 들어가면 정책 owner와 테스트 경계가 흐려지므로 서비스가 resource owner와 상태 기반 권한을 따로 확인해야 한다.",
    },
    {
      id: "q24",
      question: "BFF(Backend for Frontend)가 유용한 상황은?",
      choices: [
        "여러 서비스의 도메인 불변식을 한곳에서 강제해야 할 때",
        "서비스 간 이벤트 순서를 전역으로 보장해야 할 때",
        "DB schema 변경을 backward compatible하게 관리해야 할 때",
        "client별 화면 요구와 backend API 모델이 크게 달라 composition과 presentation shaping이 필요할 때",
      ],
      answerIndex: 3,
      explanation:
        "본문은 BFF가 client별 화면 요구와 backend API 모델이 크게 다를 때 유용하며 composition과 presentation shaping에 집중해야 한다고 한다. domain policy를 중복하면 core service와 규칙이 어긋나 유지보수 비용이 커진다.",
    },
    {
      id: "q25",
      question: "Schema evolution이 배포 순서와 연결되는 이유는?",
      choices: [
        "배포 도구가 schema migration을 항상 자동 실행하기 때문",
        "서비스와 소비자가 다른 배포 시점에 존재하므로 backward/forward compatible해야 하기 때문",
        "DB lock이 배포 중에만 발생하기 때문",
        "schema 변경은 무중단 배포에서만 허용되기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 서비스와 소비자가 서로 다른 배포 시점에 존재하므로 schema가 backward/forward compatible해야 한다고 한다. API·event·DB schema 모두 additive change와 deprecation window를 기준으로 관리한다.",
    },
    {
      id: "q26",
      question: "DB schema를 무중단으로 바꾸는 expand-contract 순서로 옳은 것은?",
      choices: [
        "옛 column을 먼저 제거한 뒤 새 column을 추가한다",
        "새 schema로 한 번에 교체하고 app을 동시에 배포한다",
        "nullable 없이 새 column을 추가하고 즉시 backfill한다",
        "새 nullable column이나 table을 추가해 양쪽을 지원하게 한 뒤 backfill·검증 후 옛 schema를 제거한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 expand 단계에서 nullable column이나 새 table을 추가하고 app이 양쪽을 지원하게 한 뒤 backfill·검증을 거쳐 contract 단계에서 옛 schema를 제거한다고 한다. API field 이름 변경도 같은 원칙으로 다룬다.",
    },
    {
      id: "q27",
      question: "Resilience pattern이 오히려 시스템을 복잡하게 만드는 경우는?",
      choices: [
        "SLO impact가 큰 dependency에만 선별 적용할 때",
        "circuit breaker에 fallback을 함께 설계할 때",
        "circuit breaker·bulkhead·retry를 모든 호출에 붙일 때",
        "retry에 idempotency key와 error taxonomy를 둘 때",
      ],
      answerIndex: 2,
      explanation:
        "본문은 circuit breaker·bulkhead·retry를 모든 호출에 붙이면 복잡도와 latency만 늘 수 있다고 한다. 실제 failure mode와 SLO impact가 있는 dependency에 우선 적용해야 한다.",
    },
    {
      id: "q28",
      question: "Retry를 붙이면 안전하지 않은 호출은?",
      choices: [
        "비멱등 side effect가 있거나 실패가 validation처럼 영구적인 경우",
        "idempotency key가 있고 error가 일시적 네트워크 실패인 경우",
        "읽기 전용 조회에서 timeout만 발생한 경우",
        "DLQ와 retry budget이 설정되어 있는 경우",
      ],
      answerIndex: 0,
      explanation:
        "본문은 비멱등 side effect가 있거나 실패가 validation처럼 영구적인 경우 retry하면 중복 처리나 불필요한 부하가 생긴다고 한다. idempotency key와 error taxonomy가 있을 때만 안전하게 재시도한다.",
    },
    {
      id: "q29",
      question: "ADR과 RFC의 역할 구분으로 옳은 것은?",
      choices: [
        "RFC는 결정 기록이고 ADR은 논의 제안 문서다",
        "RFC는 논의와 제안을 위한 문서이고 ADR은 결정과 결과를 기록하는 문서다",
        "둘 다 결정을 기록하며 문서 형식만 다르다",
        "RFC는 외부 공개용, ADR은 내부 비공개용이다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 RFC가 논의와 제안을 위한 문서이고 ADR은 결정과 결과를 기록하는 문서라고 한다. 큰 변경은 RFC로 대안을 검토하고 결정 후 ADR로 남기는 흐름이 좋다.",
    },
    {
      id: "q30",
      question: "Architecture diagram이 답해야 하는 것은?",
      choices: [
        "클래스 구조와 메서드 시그니처",
        "코드 디렉터리 트리와 파일 수",
        "UI 화면 흐름과 컴포넌트 계층",
        "runtime dependency, data ownership, trust boundary, failure propagation, deployment unit",
      ],
      answerIndex: 3,
      explanation:
        "본문은 아키텍처 diagram이 runtime dependency·data ownership·trust boundary·failure propagation·deployment unit을 보여야 한다고 한다. 예쁜 그림보다 책임과 장애 경로가 중요하다.",
    },
    {
      id: "q31",
      question: "팀 구조와 서비스 경계의 관계로 옳은 것은?",
      choices: [
        "팀 경계만 기준으로 나누면 항상 도메인 불변식이 잘 지켜진다",
        "서비스 경계는 코드 구조이므로 팀 owner와 무관하게 정해야 한다",
        "커뮤니케이션 구조가 시스템 구조에 반영되므로 owner와 on-call 책임까지 맞춰야 한다",
        "on-call은 운영 조직 문제라 아키텍처 설계와 분리해야 한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 커뮤니케이션 구조가 시스템 구조에 반영되므로 owner와 on-call 책임까지 고려해야 한다고 한다. 장애를 받는 팀이 시스템을 바꿀 권한도 가져야 개선이 가능하다.",
    },
    {
      id: "q32",
      question: "Architecture debt를 관리 가능한 상태로 만드는 방법은?",
      choices: [
        "발견 즉시 모두 상환해 debt register를 항상 비운다",
        "debt를 버그와 동일하게 취급해 같은 판단 기준으로 처리한다",
        "debt를 TODO 주석으로 코드에 남겨 추적한다",
        "만료 조건·위험·상환 trigger를 기록해 숨겨진 debt가 아니라 관리되는 debt로 만든다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 architecture debt를 의식적으로 기록하고 만료 조건·위험·상환 trigger를 둬야 한다고 한다. 버그는 현재 동작을 깨는 문제이고 debt는 동작하지만 변경 비용과 장애 위험을 키우는 구조라 판단 기준이 다르다.",
    },
    {
      id: "q33",
      question: "GraphQL이 REST보다 적합한 경우와 그 대가로 옳은 것은?",
      choices: [
        "GraphQL은 항상 REST보다 우수하며 단점이 없다",
        "화면마다 필요 데이터가 다르거나 여러 리소스를 조합할 때 over/under-fetching을 줄여 적합하지만, HTTP 캐시 활용이 어렵고 depth·복잡도 제한 같은 보호가 필요하다",
        "GraphQL은 REST처럼 여러 엔드포인트를 사용한다",
        "GraphQL은 HTTP 캐시를 REST보다 쉽게 활용한다",
      ],
      answerIndex: 1,
      explanation:
        "REST는 단순·캐시 친화적 리소스 API에 적합하고, GraphQL은 단일 엔드포인트에서 필드를 지정해 over/under-fetching을 줄인다. 대신 HTTP 캐시가 어렵고 depth·복잡도·timeout 보호가 필요하다.",
    },
    {
      id: "q34",
      question: "gRPC의 보안 메커니즘으로 옳은 것은?",
      choices: [
        "gRPC는 자체 독립 보안 프로토콜을 새로 정의한다",
        "HTTP/2 위에서 TLS로 전송 구간을 보호하고, 메타데이터에 JWT·OAuth 토큰을 담아 인증하며, 강한 검증이 필요하면 mTLS를 쓴다",
        "gRPC는 암호화를 지원하지 않는다",
        "인증 토큰은 본문에만 담을 수 있다",
      ],
      answerIndex: 1,
      explanation:
        "gRPC 보안은 TLS 기반 암호화(gRPC over TLS), 메타데이터 기반 토큰(JWT·OAuth 2.0) 인증, mTLS 기반 상호 인증으로 구성된다. 별도 보안 프로토콜을 새로 만드는 것이 아니다.",
    },
    {
      id: "q35",
      question: "gRPC가 Protocol Buffers를 쓰는 이유와 주의점으로 옳은 것은?",
      choices: [
        "텍스트 포맷이라 사람이 읽기 쉬운 것이 장점이다",
        "이진 포맷이라 크기가 작고 파싱이 빠르며 언어 무관 계약을 주지만, 필드 번호를 재사용/삭제하면 하위 호환성이 깨져 번호·버전 관리가 중요하다",
        "필드 이름을 매번 문자열로 전송해 가독성을 높인다",
        "필드 번호를 재사용해도 호환성에 안전하다",
      ],
      answerIndex: 1,
      explanation:
        "proto 파일로 다언어 코드 생성·동일 계약을 얻고, 이진 포맷(필드 번호·타입)이라 JSON보다 작고 빠르다. 단 사람이 읽기 어렵고 필드 번호 재사용/삭제 시 호환성이 깨져 번호·버전 관리가 중요하다.",
    },
    {
      id: "q36",
      question: "Polling, SSE, WebSocket 선택 기준으로 옳은 것은?",
      choices: [
        "실시간이면 무조건 WebSocket이 최선이다",
        "이벤트가 드물고 단순하면 Polling, 서버→클라 단방향 푸시면 SSE, 양방향·고빈도면 WebSocket이 적합하다",
        "SSE는 양방향 통신을 지원한다",
        "Polling은 서버가 클라이언트로 즉시 푸시한다",
      ],
      answerIndex: 1,
      explanation:
        "이벤트가 드물고 구현 단순성이 중요하면 Polling, 서버→클라 단방향이면 SSE(HTTP 기반·자동 재연결), 양방향·고빈도면 WebSocket이 적합하다. WebSocket은 연결 유지·인증·스케일아웃·장애복구를 따로 고려해야 한다.",
    },
    {
      id: "q37",
      question: "WebSocket 서버를 여러 대로 늘릴 때 생기는 문제와 해결로 옳은 것은?",
      choices: [
        "Sticky Session만 쓰면 서버 간 메시지 전파 문제가 해결된다",
        "연결이 특정 인스턴스에 고정돼 다른 인스턴스 사용자에게 메시지가 안 가므로, Redis Pub/Sub·Kafka 같은 공용 브로커로 전파한다",
        "서버를 늘리면 메시지가 자동으로 모든 인스턴스에 공유된다",
        "WebSocket은 여러 대로 확장할 수 없다",
      ],
      answerIndex: 1,
      explanation:
        "각 서버가 자기 메모리에만 연결·구독 정보를 가져 한 인스턴스의 메시지가 다른 인스턴스 사용자에게 안 간다. Redis Pub/Sub·Kafka·RabbitMQ 같은 공용 브로커로 전파한다. Sticky Session은 연결 관리만 단순화할 뿐 전파는 해결하지 못한다.",
    },
    {
      id: "q38",
      question: "브라우저 WebSocket에서 인증을 처리하는 방법으로 옳은 것은?",
      choices: [
        "WebSocket API에 Authorization 헤더를 자유롭게 붙여 보낸다",
        "최초 HTTP Upgrade 핸드셰이크 시 쿠키(Origin 검증·SameSite 필요)나 연결 직후 첫 메시지의 JWT로 인증하고, wss(TLS)를 쓴다",
        "토큰을 URL 쿼리에 넣는 것이 가장 안전하다",
        "ws로 평문 전송해도 무방하다",
      ],
      answerIndex: 1,
      explanation:
        "브라우저 WebSocket은 임의 Authorization 헤더를 붙이기 어려워 보통 쿠키(자동 전송, Origin·SameSite·CSRF 방어 필요)나 연결 직후 첫 메시지의 토큰으로 인증한다. URL 쿼리는 로그 노출 위험이 있고 전송은 wss(TLS)를 쓴다.",
    },
    {
      id: "q39",
      question: "SSE 연결을 서버 메모리로만 관리할 때 스케일아웃·재시작에서 생기는 문제는?",
      choices: [
        "브라우저 자동 재연결만 있으면 끊긴 동안 이벤트 유실이 전혀 없다",
        "A 인스턴스 연결 사용자에게 B에서 발생한 이벤트가 안 가고 재시작 시 연결이 끊겨, 공용 브로커와 Last-Event-ID 기반 복구가 필요하다",
        "SSE는 스케일아웃과 무관해 문제가 없다",
        "재시작해도 메모리 연결이 그대로 유지된다",
      ],
      answerIndex: 1,
      explanation:
        "인스턴스 A 연결 사용자에게 B의 이벤트가 전달되지 않아 외부 브로커·공용 저장소가 필요하고, 재시작 시 메모리 연결이 전부 끊겨 이벤트 ID를 관리하고 Last-Event-ID로 누락 이벤트를 복구해야 한다.",
    },
  ],
};

export default quiz;
