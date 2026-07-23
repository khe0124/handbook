// 런타임 품질·장애대응 Q&A(engineering-runtime-quality-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-runtime-quality-quiz",
  title: "런타임 품질·장애대응 퀴즈",
  sourceQaId: "engineering-runtime-quality-qa",
  questions: [
    {
      id: "q1",
      question: "p99 latency가 튀었을 때 진단 순서로 가장 적절한 것은?",
      choices: [
        "route별 p99와 error rate로 증상을 잡고 trace로 span을 분해한 뒤 thread/GC, DB pool/lock/query, downstream, queue lag를 본다",
        "전체 평균 latency를 먼저 확인하고 정상이면 조사를 종료한다",
        "가장 먼저 서버를 재시작해 증상이 사라지는지 관찰한다",
        "CPU 사용률만 보고 원인을 확정한 뒤 스케일 아웃한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 route별 p99와 error rate로 증상을 잡고 trace로 span을 분해한 뒤 app thread/GC, DB pool/lock/query, downstream timeout/retry, queue lag를 순서대로 확인한다고 말한다.",
    },
    {
      id: "q2",
      question: "'평균 latency가 괜찮으면 장애가 아니다'는 판단이 틀린 이유는?",
      choices: [
        "평균은 소수 사용자의 tail latency를 숨겨 특정 tenant나 dependency에서만 느려지는 장애를 놓치게 한다",
        "평균은 항상 p99보다 크게 나오므로 과대평가를 유발한다",
        "평균은 error rate를 포함하므로 latency 판단에 쓸 수 없다",
        "평균은 저트래픽 route에서만 계산되어 대표성이 없다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 평균이 tail latency를 숨기므로 route별 p95/p99, timeout count, error budget burn을 함께 봐야 특정 tenant나 dependency 장애를 놓치지 않는다고 말한다.",
    },
    {
      id: "q3",
      question: "Retry가 위험해지는 대표적 상황과 대응으로 옳은 것은?",
      choices: [
        "가장 최근 배포를 즉시 rollback하면 retry 위험은 사라진다",
        "재시도 횟수를 무제한으로 늘려 성공할 때까지 반복하면 안전하다",
        "하류가 포화된 상태에서 여러 계층이 동시에 재시도하면 retry amplification이 생기므로 retry budget·backoff with jitter·timeout·circuit breaker를 함께 둔다",
        "client timeout을 없애면 재시도 폭증을 막을 수 있다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 하류가 포화된 상황에서 여러 계층이 동시에 재시도하면 retry amplification으로 장애가 커지므로 retry budget, exponential backoff with jitter, timeout, circuit breaker를 같이 둬야 한다고 말한다.",
    },
    {
      id: "q4",
      question: "'모든 5xx는 재시도해도 된다'는 주장에 대한 옳은 반박은?",
      choices: [
        "5xx는 클라이언트 오류이므로 애초에 재시도 대상이 아니다",
        "validation 성격의 5xx나 이미 side effect가 실행됐을 수 있는 요청은 위험하므로 retryable error code와 idempotency 보장이 필요하다",
        "503만 아니면 어떤 5xx도 재시도하면 안 된다",
        "재시도 여부는 status code와 무관하며 backoff만 있으면 항상 안전하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 503이나 일시 timeout은 조건부 재시도 대상일 수 있지만 validation 성격의 5xx, 이미 side effect가 실행됐을 수 있는 요청은 위험하므로 retryable error code와 idempotency 보장이 필요하다고 말한다.",
    },
    {
      id: "q5",
      question: "재시도해도 안전하려면 API가 갖춰야 하는 것은?",
      choices: [
        "요청마다 새 UUID를 부여해 서버가 모두 다른 요청으로 처리하게 한다",
        "모든 요청을 read-only로 바꿔 side effect를 제거한다",
        "client timeout을 server timeout보다 길게 잡아 재시도 여유를 준다",
        "idempotency key, 중복 요청 처리 정책, side effect transaction 경계, retryable error contract를 갖춘다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 idempotency key, 중복 요청 처리 정책, side effect transaction 경계, retryable error contract가 있어야 같은 요청이 두 번 와도 결제나 상태 변경이 중복 반영되지 않는다고 말한다.",
    },
    {
      id: "q6",
      question: "DLQ replay를 진행하기 전에 확인해야 하는 것은?",
      choices: [
        "원인 분류, poison message 여부, schema mismatch, downstream 복구 여부, idempotency 보장",
        "DLQ에 쌓인 메시지 개수와 평균 크기",
        "consumer instance의 CPU 사용률과 메모리",
        "producer의 배포 시각과 커밋 해시",
      ],
      answerIndex: 0,
      explanation:
        "본문은 DLQ는 원인 분류, poison message 여부, schema mismatch, downstream 복구 여부, idempotency 보장을 확인한 뒤 replay해야 하며 바로 replay하면 장애를 반복할 수 있다고 말한다.",
    },
    {
      id: "q7",
      question: "consumer lag가 쌓일 때 'worker만 늘리면 된다'가 틀릴 수 있는 이유는?",
      choices: [
        "worker 증설은 partition 수를 자동으로 줄여 순서 보장을 깨기 때문",
        "worker를 늘리면 DLQ가 자동으로 비워져 원인이 은폐되기 때문",
        "downstream이 병목이면 worker 증설이 실패 호출과 재시도를 늘려 장애를 악화시키기 때문",
        "worker는 partition 수보다 많을 수 없어 증설 자체가 불가능하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 downstream이 병목이면 worker 증설은 timeout과 retry를 늘려 더 나빠질 수 있으므로 consume rate, error rate, downstream latency, partition skew를 보고 증설·rate limit·shedding 중 선택한다고 말한다.",
    },
    {
      id: "q8",
      question: "장애 대응에서 postmortem의 목적으로 옳은 것은?",
      choices: [
        "장애를 유발한 담당자를 특정해 책임을 묻는 것",
        "시스템이 사고를 허용한 조건을 찾아 재발 가능성을 줄이는 것",
        "복구에 걸린 시간을 최소화해 SLA 배상을 피하는 것",
        "root cause 하나를 빠르게 확정해 문서를 닫는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 postmortem이 책임자를 찾는 것이 아니라 시스템이 사고를 허용한 조건을 찾아 재발 가능성을 줄이는 것이며, impact·timeline·contributing factors·action item을 owner와 due date와 함께 남긴다고 말한다.",
    },
    {
      id: "q9",
      question: "SLI와 SLO의 관계로 옳은 것은?",
      choices: [
        "SLI는 릴리스 목표이고 SLO는 그 측정 수단이다",
        "SLI와 SLO는 같은 값이며 표기만 다르다",
        "SLI는 내부 리소스 지표이고 SLO는 외부 API 지표다",
        "SLI는 사용자 경험을 나타내는 측정값이고 SLO는 그 목표이며, error budget으로 알림과 릴리스 판단을 연결한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 SLI가 사용자 경험을 나타내는 측정값이고 SLO는 그 목표이며, availability·latency·correctness를 route와 중요도별로 나누고 error budget으로 알림과 릴리스 판단을 연결한다고 말한다.",
    },
    {
      id: "q10",
      question: "liveness와 readiness probe의 역할 구분으로 옳은 것은?",
      choices: [
        "liveness는 프로세스 생존을, readiness는 트래픽 수신 준비 상태를 확인한다",
        "liveness는 트래픽 수신 준비를, readiness는 프로세스 생존을 확인한다",
        "둘 다 외부 dependency 상태를 동일하게 반영해야 한다",
        "liveness는 배포 시에만, readiness는 평상시에만 동작한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 liveness가 프로세스 생존을, readiness가 트래픽 수신 준비 상태를 보며, readiness에 핵심 dependency 상태를 반영하되 일시 장애 때 재시작 폭주가 생기지 않게 나눠야 한다고 말한다.",
    },
    {
      id: "q11",
      question: "liveness probe에 외부 API 호출을 넣으면 위험한 이유는?",
      choices: [
        "외부 API 응답이 느려 probe timeout 설정을 매번 조정해야 하기 때문",
        "외부 API 장애가 app restart로 이어져 restart storm이 생길 수 있기 때문",
        "외부 API는 readiness에서만 호출 가능하도록 표준이 강제하기 때문",
        "liveness는 네트워크 호출 자체를 지원하지 않기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 liveness에 외부 API를 넣으면 외부 장애가 app restart로 이어져 restart storm이 생길 수 있으므로, liveness는 재시작으로 회복 가능한 상태에 제한하고 외부 dependency는 readiness나 별도 dependency health로 다룬다고 말한다.",
    },
    {
      id: "q12",
      question: "alert fatigue를 줄이기 위해 사람을 깨우는 page 알림의 기준은?",
      choices: [
        "CPU, 메모리 같은 원인 후보 리소스 지표를 우선한다",
        "임계값을 넘는 모든 지표에 대해 빠짐없이 page를 건다",
        "즉시 사람의 조치가 없으면 고객 영향이나 데이터 위험이 커지는 증상에만 건다",
        "배포 직후 24시간 동안 발생하는 모든 이벤트에 건다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 page를 즉시 사람의 조치가 없으면 고객 영향이나 데이터 위험이 커지는 증상에만 걸고, saturation 예고나 비핵심 batch 지연 같은 것은 warning으로 둔다고 말한다.",
    },
    {
      id: "q13",
      question: "circuit breaker가 retry와 함께 필요한 이유는?",
      choices: [
        "circuit breaker는 실패한 요청을 자동으로 재시도해 성공률을 높인다",
        "retry는 하류가 죽었을 때 부담을 키울 수 있는데, circuit breaker는 실패율이 높을 때 호출을 빠르게 차단해 자원 고갈과 cascading failure를 줄인다",
        "circuit breaker는 timeout을 대체하므로 retry와 함께 쓰면 안 된다",
        "circuit breaker는 latency budget을 자동으로 계산해 계층별 timeout을 맞춘다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 retry가 일시 실패를 흡수하지만 하류가 죽었을 때는 부담을 키울 수 있고, circuit breaker는 실패율이 높을 때 호출을 빠르게 차단해 자원 고갈과 cascading failure를 줄인다고 말한다.",
    },
    {
      id: "q14",
      question: "circuit breaker의 HALF_OPEN 상태에 대한 설명으로 옳은 것은?",
      choices: [
        "실패율이 기준을 넘어 모든 호출을 즉시 차단하는 상태다",
        "정상으로 돌아와 모든 트래픽을 다시 흘려보내는 상태다",
        "downstream 응답을 캐시해 반환하는 상태다",
        "일정 시간이 지난 뒤 소수 요청만 시험적으로 보내 downstream 회복 여부를 확인하는 상태다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 OPEN이 실패율이나 timeout이 기준을 넘어 호출을 즉시 차단하는 상태이고, HALF_OPEN은 일정 시간 뒤 소수 요청만 시험적으로 보내 downstream 회복 여부를 확인하는 상태라고 말한다.",
    },
    {
      id: "q15",
      question: "backpressure와 rate limit의 차이로 옳은 것은?",
      choices: [
        "rate limit은 외부 요청량을 제한하는 정책이고, backpressure는 소비자가 처리 능력을 초과했을 때 생산자나 upstream에 늦추라는 신호를 주는 흐름 제어다",
        "backpressure는 외부 요청량 제한 정책이고, rate limit은 내부 흐름 제어 신호다",
        "둘 다 동일하게 producer 측 요청 수를 세는 카운터다",
        "rate limit은 queue를 비우는 작업이고, backpressure는 DLQ로 메시지를 보내는 작업이다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 rate limit이 외부 요청량을 제한하는 정책이고, backpressure는 소비자가 처리 능력을 초과했을 때 생산자나 upstream에 늦추라는 신호를 주는 흐름 제어라고 말한다.",
    },
    {
      id: "q16",
      question: "load shedding을 수행하는 시점으로 옳은 것은?",
      choices: [
        "장애가 완전히 확정되고 postmortem이 끝난 뒤에 한다",
        "시스템이 saturation에 가까워지고 queue 대기 시간이 SLO를 넘기기 전에 낮은 우선순위 요청을 빠르게 거절한다",
        "모든 요청의 latency가 이미 SLO를 초과한 뒤에 한다",
        "CPU가 여유로울 때 미리 요청을 버려 캐시를 데운다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 load shedding을 시스템이 saturation에 가까워지고 queue 대기 시간이 SLO를 넘기기 전에 하며, 낮은 우선순위 요청을 빠르게 거절해 전체 timeout과 cascading failure를 줄인다고 말한다.",
    },
    {
      id: "q17",
      question: "runbook이 갖춰야 할 요소로 옳은 것은?",
      choices: [
        "장애 원인 가설과 담당자 연락처만 있으면 충분하다",
        "실행할 명령어 목록만 순서대로 나열하면 된다",
        "증상, 확인 명령, 정상/비정상 판정, 완화 조치, rollback 또는 escalation, 사후 기록 위치가 있어야 한다",
        "대시보드 스크린샷과 최근 배포 이력만 있으면 된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 runbook에 증상·확인 명령·정상/비정상 판정·완화 조치·rollback 또는 escalation·사후 기록 위치가 있어야 하며, 명령어만 있고 판단 기준이 없으면 runbook이 아니라고 말한다.",
    },
    {
      id: "q18",
      question: "배포 후 문제 발생 시 rollback보다 forward fix가 더 안전할 수 있는 경우는?",
      choices: [
        "이미 irreversible migration이나 외부 side effect가 진행돼 rollback이 더 위험할 때 feature flag 차단·hotfix·repair job으로 대응한다",
        "새 release만 원인이고 데이터 변경이 되돌릴 수 있을 때",
        "canary 지표가 완전히 정상일 때",
        "error rate가 baseline 아래로 떨어졌을 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 새 release만 원인이고 데이터 변경이 되돌릴 수 있으면 rollback을 우선하지만, 이미 irreversible migration이나 외부 side effect가 진행됐으면 feature flag 차단·hotfix·repair job을 포함한 forward fix가 더 안전할 수 있다고 말한다.",
    },
    {
      id: "q19",
      question: "분산 trace가 있어도 log가 여전히 필요한 이유는?",
      choices: [
        "log가 trace보다 저장 비용이 낮아 항상 우선하기 때문",
        "trace는 경로와 시간 분해에 강하고 log는 특정 결정과 원인 세부 정보에 강해, metric이 증상을 잡고 trace가 위치를 좁히며 log가 원인을 확정하기 때문",
        "trace는 sampling 때문에 부정확하므로 log로 완전히 대체해야 하기 때문",
        "log만 PII를 담을 수 있어 규제 대응에 필수이기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 trace가 경로와 시간 분해에 강하고 log가 특정 결정과 원인 세부에 강하며, metric이 증상을 잡고 trace가 위치를 좁히고 log가 원인을 확정하는 식으로 함께 쓴다고 말한다.",
    },
    {
      id: "q20",
      question: "RED metric과 USE metric의 대상 구분으로 옳은 것은?",
      choices: [
        "RED는 utilization·saturation·errors를, USE는 rate·errors·duration을 본다",
        "RED와 USE 모두 리소스 관점의 지표로 동일하다",
        "RED는 요청 기반 서비스의 rate·errors·duration을, USE는 리소스의 utilization·saturation·errors를 본다",
        "RED는 배포 시에만, USE는 장애 시에만 본다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 RED가 요청 기반 서비스의 rate·errors·duration을 보고 USE가 리소스의 utilization·saturation·errors를 보며, 사용자 증상은 RED로 병목 자원은 USE로 좁힌다고 말한다.",
    },
    {
      id: "q21",
      question: "CPU가 낮은데 thread pool이 꽉 찼다면 먼저 의심할 것은?",
      choices: [
        "blocking IO, DB connection 대기, lock contention, 외부 API timeout",
        "CPU-bound 연산과 busy loop",
        "GC allocation rate 폭증",
        "메모리 leak으로 인한 OOM",
      ],
      answerIndex: 0,
      explanation:
        "본문은 CPU가 낮은데 thread가 꽉 차면 blocking IO, DB connection 대기, lock contention, 외부 API timeout을 의심하고 thread dump에서 WAITING·TIMED_WAITING·BLOCKED stack을 본다고 말한다.",
    },
    {
      id: "q22",
      question: "high-cardinality metric이 운영 리스크가 되는 이유는?",
      choices: [
        "userId나 requestId를 metric label로 쓰면 time series가 폭발해 비용과 query 성능이 망가진다",
        "route template을 label로 쓰면 값이 무한히 늘어난다",
        "metric label이 많을수록 PII 노출이 자동으로 차단된다",
        "status class를 label로 쓰면 cardinality가 폭발한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 userId나 requestId를 metric label로 쓰면 time series가 폭발해 비용과 query 성능이 망가지므로 상세 식별자는 log/trace로 보내야 한다고 말한다.",
    },
    {
      id: "q23",
      question: "at-least-once delivery에서 idempotent consumer가 중복을 막는 방법은?",
      choices: [
        "broker offset을 idempotency key로 삼아 중복을 판별한다",
        "consumer 수를 partition 수와 동일하게 맞춰 중복 전달을 원천 차단한다",
        "message id나 business key를 inbox/processed table에 기록하고 side effect를 unique constraint와 같은 transaction으로 보호한다",
        "재처리 시 side effect를 먼저 커밋하고 processed 기록을 나중에 커밋한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 idempotent consumer가 message id나 business key를 inbox/processed table에 기록하고 side effect를 unique constraint와 transaction으로 보호하며, processed 기록과 side effect가 같은 transaction 경계에 있어야 한다고 말한다.",
    },
    {
      id: "q24",
      question: "incident commander의 역할로 옳은 것은?",
      choices: [
        "모든 로그를 직접 보며 root cause를 가장 먼저 찾는 사람",
        "의사결정, 우선순위, 역할 분담, 커뮤니케이션을 관리하는 사람",
        "rollback 명령을 직접 실행하는 배포 담당자",
        "고객 공지 문구를 작성하는 커뮤니케이션 전담자",
      ],
      answerIndex: 1,
      explanation:
        "본문은 incident commander가 직접 모든 로그를 보는 사람이 아니라 의사결정·우선순위·역할 분담·커뮤니케이션을 관리하는 사람이며, 디버깅에 빠지면 역할 배정·고객 공지·rollback 판단·timeline 기록이 빈다고 말한다.",
    },
    {
      id: "q25",
      question: "queue ordering을 보통 aggregate 단위로만 보장하는 이유는?",
      choices: [
        "전역 순서는 비용이 커 병렬성이 줄고 hot partition이 생겨 처리량과 가용성이 떨어지기 때문",
        "전역 순서는 broker가 기술적으로 지원하지 않기 때문",
        "aggregate 단위 순서가 전역 순서보다 강한 보장이기 때문",
        "partition key를 넓게 잡을수록 순서 보장이 강해지기 때문",
      ],
      answerIndex: 0,
      explanation:
        "본문은 전역 순서가 비용이 커 병렬성이 줄고 hot partition이 생겨 처리량과 가용성이 떨어지므로 보통 aggregate 단위 순서만 보장하며, 실제 필요한 순서가 aggregate 단위인지 먼저 좁혀야 한다고 말한다.",
    },
    {
      id: "q26",
      question: "GC가 p99 상승의 원인인지 확인하는 방법으로 옳은 것은?",
      choices: [
        "collector 옵션을 먼저 바꿔보고 p99가 내려가면 GC가 원인이라고 확정한다",
        "heap 사용량이 50%를 넘으면 GC를 원인으로 확정한다",
        "GC 발생 횟수만 세어 많으면 원인으로 판단한다",
        "pause time, allocation rate, heap after GC를 p99 spike timestamp와 같은 clock 기준으로 맞춰 시간 상관을 본다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 GC가 원인인지 보려면 pause time, allocation rate, heap after GC, p99 spike timestamp를 맞춰봐야 하고, 증상과 시간 상관이 없으면 다른 병목일 수 있다고 말한다.",
    },
    {
      id: "q27",
      question: "'heap을 키우면 GC 문제는 항상 해결된다'가 틀린 이유는?",
      choices: [
        "heap을 키우면 collector가 자동으로 다른 알고리즘으로 전환되기 때문",
        "heap을 키우면 allocation rate가 반드시 함께 증가하기 때문",
        "heap 크기는 pause 시간과 무관해 아무 효과가 없기 때문",
        "heap을 키우면 OOM 여유는 생기지만 pause 시간이 길어질 수 있고 allocation 폭주나 leak 원인은 그대로 남기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 heap을 키우면 OOM 여유는 생기지만 pause 시간이 길어질 수 있고 allocation 폭주나 leak 원인은 그대로 남으므로, heap after GC와 allocation rate를 먼저 봐야 한다고 말한다.",
    },
    {
      id: "q28",
      question: "connection pool 대기와 slow query를 구분하는 방법으로 옳은 것은?",
      choices: [
        "전체 request latency만 보고 길면 slow query로 판단한다",
        "active connection 수가 max면 항상 slow query가 원인이라고 본다",
        "connection acquisition time과 SQL execution time을 분리해, acquisition이 길면 pool 부족, 확보 후 실행이 길면 slow query나 lock을 본다",
        "pool size를 늘려 latency가 줄면 slow query였다고 확정한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 connection acquisition time과 SQL execution time을 분리해 acquisition이 길면 pool 부족, connection 확보 후 실행 시간이 길면 slow query나 lock을 봐야 한다고 말한다.",
    },
    {
      id: "q29",
      question: "startup probe가 필요한 상황으로 옳은 것은?",
      choices: [
        "외부 API 장애가 감지될 때 트래픽을 빼기 위해",
        "평상시 DB 지연을 감지해 pod를 traffic에서 빼기 위해",
        "배포 후 error rate가 baseline을 넘을 때 자동 rollback을 트리거하기 위해",
        "초기 migration, cache warmup, class loading으로 기동 시간이 긴 서비스에서 정상 기동 중인 pod가 liveness 실패로 반복 재시작되는 것을 막기 위해",
      ],
      answerIndex: 3,
      explanation:
        "본문은 startup probe가 초기 migration, cache warmup, class loading으로 기동 시간이 긴 서비스에서 필요하며, 통과 전 liveness 실패를 무시하게 해 정상 기동 중인 pod의 반복 재시작을 막는다고 말한다.",
    },
    {
      id: "q30",
      question: "degraded mode에서 먼저 제한하는 기능과 보호하는 기능의 구분으로 옳은 것은?",
      choices: [
        "로그인과 결제를 먼저 끄고 추천과 통계를 유지한다",
        "추천, 통계, export 같은 비핵심 기능을 끄고 주문, 로그인 같은 critical path를 보호한다",
        "모든 기능을 동일 비율로 부분 제한한다",
        "트래픽이 가장 많은 기능부터 우선 차단한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 degraded mode가 전체 실패 대신 추천, 통계, export를 끄고 주문/로그인 같은 critical path를 보호하는 모드라고 말한다.",
    },
    {
      id: "q31",
      question: "장애 판단에서 p95와 p99의 쓰임 구분으로 옳은 것은?",
      choices: [
        "p95는 소수 병목을, p99는 평균적 경험을 보여준다",
        "p95와 p99는 표본이 같아 항상 동일하게 움직인다",
        "p95는 일반적인 나쁜 경험을, p99는 꼬리 지연과 소수 병목을 보여주며 평균은 tail latency를 숨긴다",
        "평균이 percentile보다 tail latency를 더 잘 드러낸다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 p95가 일반적인 나쁜 경험을, p99가 꼬리 지연과 소수 병목을 보여주며 평균은 tail latency를 숨기므로 장애와 성능 리뷰에는 percentile이 필요하다고 말한다.",
    },
    {
      id: "q32",
      question: "client timeout이 server timeout보다 짧을 때 생기는 문제는?",
      choices: [
        "client가 재시도를 못 하게 되어 error rate가 0으로 보인다",
        "server timeout이 자동으로 client에 맞춰 짧아진다",
        "downstream 호출이 즉시 취소되어 자원이 남지 않는다",
        "사용자는 이미 실패를 받았는데 server와 downstream은 작업을 계속해, 취소 전파가 없으면 불필요한 DB query와 외부 호출이 남아 saturation을 키운다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 client timeout이 server timeout보다 짧으면 사용자는 실패를 받았는데 server와 downstream은 작업을 계속할 수 있고, 취소 전파가 없으면 불필요한 DB query와 외부 호출이 남아 saturation을 키운다고 말한다.",
    },
    {
      id: "q33",
      question: "배포 health window에서 기술 지표 외에 business metric을 함께 보는 이유는?",
      choices: [
        "business metric이 error rate보다 먼저 알림을 발생시키기 때문",
        "error rate와 latency가 정상이어도 결제 전환율, 주문 생성, 로그인 성공률 같은 사용자 결과가 깨질 수 있기 때문",
        "business metric만으로 rollback threshold를 완전히 대체할 수 있기 때문",
        "기술 지표는 배포 직후에는 수집되지 않기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 기술 지표가 정상이어도 결제 전환율, 주문 생성, 로그인 성공률 같은 사용자 결과가 깨질 수 있으므로 배포 health window에서 핵심 행동 지표의 baseline 이탈을 함께 봐야 한다고 말한다.",
    },
    {
      id: "q34",
      question: "log sampling을 적용할 때 별도 보존 정책이 필요한 이벤트는?",
      choices: [
        "정상 고QPS route의 성공 요청",
        "반복되는 동일 정보성 로그",
        "health check probe 응답 로그",
        "error, security, audit, rare high latency 이벤트",
      ],
      answerIndex: 3,
      explanation:
        "본문은 log sampling이 고QPS route나 반복 오류의 log volume을 줄일 때 필요하지만 error, security, audit, rare high latency 이벤트는 보존 정책을 별도로 둬야 한다고 말한다.",
    },
  ],
};

export default quiz;
