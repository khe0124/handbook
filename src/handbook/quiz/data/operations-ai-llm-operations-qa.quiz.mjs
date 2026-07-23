// AI·LLM 운영 Addendum Q&A(operations-ai-llm-operations-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-ai-llm-operations-quiz",
  title: "AI·LLM 운영 Addendum 퀴즈",
  sourceQaId: "operations-ai-llm-operations-qa",
  questions: [
    {
      id: "q1",
      question:
        "model gateway 라우팅 장애에서 가장 먼저 판단해야 하는 경계는?",
      choices: [
        "요청이 올바른 모델·provider·tenant policy·data boundary를 통과했는지",
        "모델이 생성한 응답의 품질 점수가 기준선 위인지",
        "gateway 서버의 CPU와 memory 사용률이 임계치를 넘었는지",
        "사용자 세션 토큰이 아직 만료되지 않았는지",
      ],
      answerIndex: 0,
      explanation:
        "첫 판단은 요청이 올바른 모델·provider·tenant policy·data boundary를 통과했는지 확인하는 것이다. 라우팅 증거 없이 모델 응답만 보면 금지된 tenant나 경계 밖 region 전송을 품질 이슈로 오판한다.",
    },
    {
      id: "q2",
      question:
        "gateway route log는 있지만 provider request trace에 429/5xx/timeout이 있다면 어떤 경계 문제로 분리하는가?",
      choices: [
        "gateway 또는 tenant policy 문제",
        "provider 경계 문제",
        "사용자 입력 검증 문제",
        "cache invalidation 문제",
      ],
      answerIndex: 1,
      explanation:
        "route log가 없으면 gateway 또는 tenant policy 문제이고, route는 성공했지만 provider request trace에 429/5xx/timeout이 있으면 provider 경계 문제로 분리한다.",
    },
    {
      id: "q3",
      question:
        "요청 본문이 허용된 region 밖 provider로 전송됐거나 policy version이 배포 버전과 다를 때 즉시 취할 조치는?",
      choices: [
        "TTL이 만료될 때까지 기다린 뒤 재평가한다",
        "전체 tenant의 트래픽을 fallback provider로 옮긴다",
        "해당 tenant 라우트를 차단하고 정책 롤백 후보를 기록한다",
        "품질 회귀로 분류해 eval gate에 넘긴다",
      ],
      answerIndex: 2,
      explanation:
        "요청이 허용 region 밖 provider로 전송됐거나 policy version이 배포 버전과 다르면 즉시 해당 tenant 라우트를 차단하고 정책 롤백 후보를 기록한다.",
    },
    {
      id: "q4",
      question:
        "token budget과 context truncation 변경에서 가장 먼저 봐야 할 것은?",
      choices: [
        "전체 요청의 평균 token 수가 목표만큼 줄었는지",
        "provider 청구서의 총액이 예산 한도 안에 들었는지",
        "cache hit rate가 이전 배포보다 높아졌는지",
        "예산 감소나 retrieval compression이 사용자가 보는 답변 품질을 훼손하는지",
      ],
      answerIndex: 3,
      explanation:
        "첫 판단은 예산 감소나 retrieval compression이 사용자가 보는 답변 품질을 훼손하는지다. 평균 토큰만 보면 긴 문서·다국어·첨부 질문에서 근거가 잘려도 비용 절감 성공처럼 보인다.",
    },
    {
      id: "q5",
      question:
        "truncation으로 삭제된 chunk가 답변 근거나 사용자 지시를 포함했다면 어떻게 분류하는가?",
      choices: [
        "단순 비용 최적화 성공으로 기록한다",
        "cache invalidation 대상으로 넘긴다",
        "품질 회귀로 분류하고 해당 query class를 롤아웃 제외한다",
        "provider 경계 문제로 넘겨 fallback을 켠다",
      ],
      answerIndex: 2,
      explanation:
        "삭제된 chunk가 답변 근거나 사용자 지시를 포함하면 단순 비용 최적화가 아니라 품질 회귀로 분류하고 해당 query class를 롤아웃에서 제외한다.",
    },
    {
      id: "q6",
      question:
        "LLM latency SLO 위반을 판단할 때 사용자 체감 지연을 분리하는 올바른 기준은?",
      choices: [
        "평균 응답 시간과 요청 총량",
        "percentile(p95/p99)과 timeout 분포",
        "provider 청구 단가와 token 수",
        "gateway route log 생성 여부",
      ],
      answerIndex: 1,
      explanation:
        "평균이 아니라 percentile과 timeout 분포로 사용자 체감 지연을 분리한다. streaming 첫 토큰은 빨라도 tail이 길거나 queue wait가 늘어난 상황을 모델 성능 문제로 처리하면 완화가 늦어진다.",
    },
    {
      id: "q7",
      question:
        "streaming 응답에서 first-token p95는 SLO 안이지만 final-token p99가 timeout 근처라면?",
      choices: [
        "첫 토큰이 빠르므로 정상 처리로 닫는다",
        "사용자는 여전히 실패를 겪으므로 max output·tool call·post-processing 병목을 줄인다",
        "queue wait 문제이므로 concurrency limit만 조정한다",
        "provider incident로 판단해 즉시 fallback으로 전환한다",
      ],
      answerIndex: 1,
      explanation:
        "첫 토큰만 SLO 안에 있고 final-token p99가 timeout 근처이면 사용자는 여전히 실패를 겪으므로 max output·tool call·post-processing 병목을 줄여야 한다.",
    },
    {
      id: "q8",
      question:
        "retry budget과 rate limit 장애에서 무제한 재시도가 위험한 이유는?",
      choices: [
        "cache key에 prompt hash가 빠져 오래된 응답이 노출되기 때문",
        "idempotency key가 없어 응답 순서가 뒤바뀌기 때문",
        "streaming token cadence가 불규칙해지기 때문",
        "429와 5xx를 더 키우고 thundering herd로 정상 tenant의 quota까지 소진시키기 때문",
      ],
      answerIndex: 3,
      explanation:
        "무제한 재시도는 429와 5xx를 더 키우고 thundering herd로 정상 tenant까지 quota를 소진시킬 수 있다.",
    },
    {
      id: "q9",
      question:
        "재시도를 제한된 backoff로 허용해도 되는 요청은?",
      choices: [
        "이미 tool side effect가 발생한 요청",
        "긴 generation 비용이 큰 요청",
        "408/429/temporary 5xx 오류를 받은 요청",
        "사용자가 직접 취소한 요청",
      ],
      answerIndex: 2,
      explanation:
        "408/429/temporary 5xx만 제한된 backoff로 허용하고, 이미 tool side effect가 발생했거나 긴 generation 비용이 큰 요청은 사용자 재시도 안내로 전환한다.",
    },
    {
      id: "q10",
      question:
        "prompt version과 cache 문제에서 사용자가 어떤 prompt를 탔는지 증명하는 증거는?",
      choices: [
        "response metadata의 prompt version·template hash·tool schema version·route id",
        "provider invoice의 feature별 token 합계",
        "queue depth metric과 first-token histogram",
        "redaction rule과 retention policy readback",
      ],
      answerIndex: 0,
      explanation:
        "response metadata의 prompt version·template hash·tool schema version·route id를 trace와 맞춰 증명한다. 메타데이터가 비었거나 hash가 배포 manifest와 다르면 그 응답을 증거에서 제외한다.",
    },
    {
      id: "q11",
      question:
        "TTL 만료를 기다리지 않고 cache invalidation을 강제해야 하는 prompt 변경은?",
      choices: [
        "출력 형식의 사소한 문구 다듬기",
        "safety·pricing·legal disclaimer·tool contract가 바뀐 prompt",
        "retrieval chunk 정렬 순서만 바뀐 prompt",
        "canary 비율만 조정한 rollout config",
      ],
      answerIndex: 1,
      explanation:
        "safety instruction·pricing instruction·legal disclaimer·tool contract가 바뀐 prompt는 TTL 만료를 기다리지 않고 feature cache를 비우며 invalidation id를 남긴다.",
    },
    {
      id: "q12",
      question:
        "structured output 실패에서 raw output은 정상인데 parser 결과가 깨졌다면 무엇을 의심하는가?",
      choices: [
        "prompt/tool schema 예시와 model version",
        "parser 배포나 library 변경",
        "provider quota 소진과 rate limit",
        "cache key의 prompt hash 누락",
      ],
      answerIndex: 1,
      explanation:
        "raw output이 schema field·enum·type을 만족하는지 먼저 보고, raw는 정상인데 parser 결과가 깨지면 parser 배포나 library 변경을 의심한다.",
    },
    {
      id: "q13",
      question:
        "structured output의 repair 로직은 어느 선까지 허용해야 하는가?",
      choices: [
        "누락 필드와 tool argument까지 모델 대신 추정해 채운다",
        "enum 의미 변경을 최신 계약에 맞춰 자동 매핑한다",
        "quote·trailing comma 같은 형식 오류에만 제한하고 누락 필드·enum 의미 변경·tool argument 추정은 실패로 처리한다",
        "downstream이 받아들이면 어떤 수정이든 성공으로 본다",
      ],
      answerIndex: 2,
      explanation:
        "repair는 quote·trailing comma 같은 형식 오류에만 제한하고 누락 필드·enum 의미 변경·tool argument 추정은 실패로 처리한다. repair success rate가 급증하면 모델 계약 회귀일 수 있다.",
    },
    {
      id: "q14",
      question:
        "eval gate에서 offline golden set은 통과했지만 online shadow에서 refusal·hallucination·tool failure가 기준선을 넘으면?",
      choices: [
        "offline 통과를 우선해 release를 진행한다",
        "release를 멈춘다",
        "두 결과의 평균을 내어 threshold와 비교한다",
        "online 표본을 무시하고 canary 비율을 즉시 확대한다",
      ],
      answerIndex: 1,
      explanation:
        "offline golden set이 통과해도 online shadow에서 refusal·hallucination·tool failure가 기준선을 넘으면 release를 멈춘다.",
    },
    {
      id: "q15",
      question:
        "regression threshold 판단에서 critical safety나 tool execution category가 threshold 아래면?",
      choices: [
        "전체 평균이 높으면 gate pass로 본다",
        "confidence interval이 넓으면 통과로 처리한다",
        "sample size가 크면 무시하고 진행한다",
        "전체 평균이 높아도 gate fail로 보고 prompt/model rollout을 중단한다",
      ],
      answerIndex: 3,
      explanation:
        "critical safety나 tool execution category가 threshold 아래면 전체 평균이 높아도 gate fail로 보고 prompt/model rollout을 중단한다.",
    },
    {
      id: "q16",
      question:
        "fallback model을 켜기 전 반드시 확인해야 하는 capability가 아닌 것은?",
      choices: [
        "context length·tool calling·JSON mode",
        "language coverage·safety policy parity·data residency",
        "provider 로고와 마케팅 브랜드 인지도",
        "부족한 capability가 있는 feature의 제외 또는 read-only 제한 여부",
      ],
      answerIndex: 2,
      explanation:
        "fallback 전 context length·tool calling·JSON mode·language coverage·safety policy parity·data residency를 확인하고, 부족한 feature는 제외하거나 read-only로 제한한다. 브랜드 인지도는 기준이 아니다.",
    },
    {
      id: "q17",
      question:
        "provider outage 때 status page만 보고 전체 failover를 켜면 생기는 위험은?",
      choices: [
        "특정 tenant 데이터가 허용되지 않은 provider로 이동하거나 function calling·embedding이 없는 provider로 요청이 흐른다",
        "gateway route log가 생성되지 않아 trace가 끊긴다",
        "cache TTL이 초기화되어 오래된 응답이 노출된다",
        "token ledger의 rounding rule이 어긋나 청구가 이중 계산된다",
      ],
      answerIndex: 0,
      explanation:
        "status page만 보고 전체 failover를 켜면 특정 tenant 데이터가 허용되지 않은 provider로 이동하거나, function calling·embedding feature가 없는 provider로 요청이 흘러간다.",
    },
    {
      id: "q18",
      question:
        "failover 중 data residency를 지키는데 허용 provider가 없으면 어떻게 처리하는가?",
      choices: [
        "가장 가까운 region의 provider로 자동 우회한다",
        "품질 delta가 작은 fallback으로 임시 전환한다",
        "residency tag를 무시하고 primary 복구까지 큐에 적재한다",
        "자동 failover 대신 사용자에게 제한 상태를 알리고 incident record에 차단된 tenant와 법적 근거를 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "tenant residency tag와 provider region allowlist를 route decision에 강제하고, 허용 provider가 없으면 자동 failover 대신 사용자에게 제한 상태를 알리고 incident record에 차단된 tenant와 법적 근거를 남긴다.",
    },
    {
      id: "q19",
      question:
        "safety policy 변경에서 차단률만 보거나 통과율만 볼 때의 위험은?",
      choices: [
        "차단률만 보면 정상 업무가 막히고, 통과율만 보면 위험 content가 조용히 새어 나갈 수 있다",
        "차단률만 보면 비용이 오르고, 통과율만 보면 latency가 늘어난다",
        "둘 다 cache hit rate를 왜곡해 회귀를 숨긴다",
        "둘 다 provider quota를 소진해 rate limit을 유발한다",
      ],
      answerIndex: 0,
      explanation:
        "차단률만 보면 안전해 보이지만 정상 업무가 막힐 수 있고, 통과율만 보면 위험 content가 조용히 새어 나갈 수 있다.",
    },
    {
      id: "q20",
      question:
        "PII redaction을 한 지점만 확인할 때 놓칠 수 있는 것은?",
      choices: [
        "provider payload는 안전해도 debug log·prompt cache·eval dataset에 원문 PII가 남을 수 있다",
        "provider 청구서의 token 단가 오류를 놓친다",
        "streaming tail latency 상승을 놓친다",
        "cache key의 prompt hash 누락을 놓친다",
      ],
      answerIndex: 0,
      explanation:
        "redaction을 한 지점만 보면 provider payload는 안전해도 debug log·prompt cache·eval dataset에 원문 PII가 남을 수 있다.",
    },
    {
      id: "q21",
      question:
        "cost dashboard에서 비용 증가의 원인을 판단할 때 총액만 보면 안 되는 이유는?",
      choices: [
        "총액은 provider 청구 지연 때문에 항상 부정확하기 때문",
        "총액은 token ledger와 단위가 달라 비교할 수 없기 때문",
        "총액은 tenant 단위로 분리되지 않아 residency를 확인할 수 없기 때문",
        "특정 기능의 prompt 확장·fallback 단가·중복 재시도 비용·누락된 chargeback을 늦게 발견하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "총액만 보면 특정 기능의 prompt 확장·fallback provider 단가·중복 재시도 비용·누락된 chargeback을 늦게 발견한다. feature·tenant·model·provider·retry attempt별 ledger를 청구와 대조해야 한다.",
    },
    {
      id: "q22",
      question:
        "라우팅 policy를 수정한 뒤 무엇으로 검증하는가?",
      choices: [
        "실패 tenant와 정상 tenant를 각각 재실행해 route id·provider id·model version·residency tag가 기대값으로 남는지 확인한다",
        "실패 tenant만 재실행해 route log가 생성되는지만 본다",
        "provider 청구서에서 token 총량이 줄었는지 확인한다",
        "cache hit rate가 이전 수준으로 회복됐는지만 본다",
      ],
      answerIndex: 0,
      explanation:
        "수정 후에는 실패 tenant와 정상 tenant를 각각 재실행해 route id, provider id, model version, residency tag가 기대값으로 남는지 확인한다.",
    },
    {
      id: "q23",
      question:
        "retrieval compression을 승인할지 판단하는 올바른 기준은?",
      choices: [
        "compression ratio가 목표치 이상이면 승인한다",
        "평균 token 수가 충분히 줄었으면 승인한다",
        "압축 전후 citation coverage·answer completeness·dropped entity·golden prompt replay를 비교해 핵심 entity나 출처가 빠지면 승인하지 않는다",
        "cache hit rate가 올라갔으면 승인한다",
      ],
      answerIndex: 2,
      explanation:
        "압축 전후의 citation coverage, answer completeness score, dropped entity list, golden prompt replay를 비교하고, 핵심 entity가 빠지거나 출처가 사라지면 compression ratio가 좋아도 승인하지 않는다.",
    },
    {
      id: "q24",
      question:
        "token budget 변경의 사용자 영향이 확인됐을 때 되돌리는 범위는?",
      choices: [
        "전체 tenant를 즉시 이전 budget으로 되돌린다",
        "전체 트래픽을 fallback provider로 전환한다",
        "TTL이 만료될 때까지 기다린 뒤 재평가한다",
        "high-context tenant만 이전 budget으로 되돌리고 ledger에 feature별 budget과 rollback 시각을 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "영향이 확인되면 high-context tenant만 이전 budget으로 되돌리고, ledger에는 feature별 budget과 rollback 시각을 남긴다.",
    },
    {
      id: "q25",
      question:
        "model latency와 queueing 지연을 구분하는 올바른 방법은?",
      choices: [
        "평균 응답 시간과 요청 총량을 비교한다",
        "trace span에서 enqueue·dequeue·provider request start·first token·final token 시각을 분리해 queue wait가 p99를 이끄는지 본다",
        "provider 청구 단가와 token 수를 비교한다",
        "cache hit rate 변화로 판단한다",
      ],
      answerIndex: 1,
      explanation:
        "trace span에서 enqueue, dequeue, provider request start, first token, final token 시각을 분리해, queue wait가 p99 상승을 이끌면 concurrency limit이나 tenant throttle을 조정한다.",
    },
    {
      id: "q26",
      question:
        "timeout 완화를 적용하는 올바른 순서는?",
      choices: [
        "사용자 실패가 큰 경로부터 shorter prompt·cached retrieval·lower-latency model·queue shedding 순으로 적용한다",
        "무조건 lower-latency model로 전면 교체부터 한다",
        "전체 트래픽에 queue shedding을 가장 먼저 적용한다",
        "provider fallback을 가장 먼저 켠다",
      ],
      answerIndex: 0,
      explanation:
        "사용자 실패가 큰 경로부터 shorter prompt, cached retrieval, lower-latency model, queue shedding 순서로 완화하며 각 조치는 p95/p99, timeout count, answer quality sample을 같이 본다.",
    },
    {
      id: "q27",
      question:
        "provider quota의 burn rate가 알림 기준을 넘을 때 즉시 취할 조치는?",
      choices: [
        "모든 tenant의 rate limit을 동일하게 낮춘다",
        "무조건 fallback provider로 전량 우회한다",
        "낮은 우선순위 tenant·batch job·long-context feature부터 rate limit을 낮추고 fallback provider의 data boundary와 feature support를 확인한다",
        "retry budget을 늘려 성공률을 끌어올린다",
      ],
      answerIndex: 2,
      explanation:
        "quota remaining과 burn rate가 알림 기준을 넘으면 낮은 우선순위 tenant, batch job, long-context feature부터 rate limit을 낮추고, fallback provider의 data boundary와 feature support를 확인해 무조건 우회하지 않는다.",
    },
    {
      id: "q28",
      question:
        "thundering herd 재발을 막기 위해 변경 기록에 남길 항목은?",
      choices: [
        "cache TTL과 prompt hash",
        "token ledger와 provider invoice",
        "residency tag와 region allowlist",
        "재시도 jitter·per-tenant retry budget·circuit breaker open time·queue admission rule",
      ],
      answerIndex: 3,
      explanation:
        "재시도 jitter, per-tenant retry budget, circuit breaker open time, queue admission rule을 변경 기록에 남기고, provider 429 비율·duplicate token cost·successful retry ratio가 정상 범위로 돌아왔는지로 닫는다.",
    },
    {
      id: "q29",
      question:
        "prompt rollout을 중단해야 하는 신호는?",
      choices: [
        "cache hit rate가 이전보다 낮아질 때",
        "canary tenant에서 refusal rate·schema failure·task success·support ticket sample이 기준선을 벗어날 때",
        "평균 token 수가 늘어날 때",
        "provider p95 latency가 오를 때",
      ],
      answerIndex: 1,
      explanation:
        "canary tenant에서 refusal rate, schema failure, task success, support ticket sample이 기준선을 벗어나면 rollout을 멈추고 prompt hash·rollout percentage·replay diff·cache purge 여부를 남긴다.",
    },
    {
      id: "q30",
      question:
        "structured output 실패 시 사용자에게 보여줄 오류를 결정하는 올바른 방법은?",
      choices: [
        "downstream action이 실행되지 않았으면 재시도 가능 메시지와 incident id를, 부분 결과가 있으면 confidence와 누락 항목을 명시한다",
        "모든 실패를 단순 입력 오류로 표시한다",
        "repair된 결과는 항상 성공으로 표시한다",
        "오류 문구 없이 빈 응답을 반환한다",
      ],
      answerIndex: 0,
      explanation:
        "downstream action이 실행되지 않았으면 재시도 가능 메시지와 incident id를 보여주고, 부분 결과가 있으면 confidence와 누락 항목을 명시한다.",
    },
    {
      id: "q31",
      question:
        "eval gate 실패 뒤 failing examples를 처리하는 올바른 방법은?",
      choices: [
        "전체 평균 점수가 높으면 무시하고 진행한다",
        "모든 실패를 model 품질 문제로 일괄 처리한다",
        "failing examples를 prompt·retrieval·model·safety policy·schema contract 중 하나로 분류하고 owner·재실행 명령·expected threshold·release ticket link를 남긴다",
        "canary 비율을 즉시 확대한다",
      ],
      answerIndex: 2,
      explanation:
        "failing examples를 prompt, retrieval, model, safety policy, schema contract 중 하나로 분류하고 owner와 재실행 명령, expected threshold, release ticket link를 남겨 다음 평가가 같은 데이터와 버전으로 재현되게 한다.",
    },
    {
      id: "q32",
      question:
        "eval dataset이나 replay sample에 원문 PII가 들어 있을 때 올바른 처리는?",
      choices: [
        "retention exception으로 등록해 그대로 보관한다",
        "redaction rule만 갱신하고 샘플은 유지한다",
        "access control만 강화하고 남겨둔다",
        "retention exception이 아니라 삭제 대상으로 처리하고 삭제 ticket에 dataset id·row count·purge proof를 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "PII가 들어간 샘플은 retention exception이 아니라 삭제 대상이며, 삭제 ticket에는 dataset id, row count, purge proof를 남긴다.",
    },
  ],
};

export default quiz;
