// Observability·SLO Q&A(operations-observability-slo-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-observability-slo-quiz",
  title: "Observability·SLO 퀴즈",
  sourceQaId: "operations-observability-slo-qa",
  questions: [
    {
      id: "q1",
      question:
        "사용자 여정 SLI를 정의할 때 수집 위치를 서비스 내부 health check에만 치우치게 두면 생기는 문제는?",
      choices: [
        "브라우저 오류, CDN 차단, 모바일 timeout이 SLO에서 빠진다",
        "edge 요청까지 중복 집계되어 성공률이 과대평가된다",
        "retry와 bot traffic이 분모에서 자동 제외된다",
        "client completion event가 분자로 잘못 잡힌다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 수집 위치가 내부 health check에 치우치면 브라우저 오류, CDN 차단, 모바일 timeout이 SLO에서 빠진다고 말한다. 반대로 edge 요청만 세면 비즈니스 성공 전에 끊긴 요청도 성공으로 본다.",
    },
    {
      id: "q2",
      question:
        "SLI의 source of truth가 갖춰야 할 조건으로 본문이 제시한 것은?",
      choices: [
        "분자는 app success event인데 분모는 load balancer request count로 두어 넓게 잡는다",
        "SLI 공식, 원천 이벤트, 집계 쿼리가 같은 사용자 여정을 가리켜야 한다",
        "가능한 많은 이벤트를 분모에 포함해 표본을 키운다",
        "dedup 없이 raw 요청을 그대로 세어 단순하게 유지한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 SLI 공식, 원천 이벤트, 집계 쿼리가 같은 사용자 여정을 가리켜야 하며, 분자가 app success event인데 분모가 load balancer request count면 retry와 bot traffic 때문에 성공률이 왜곡된다고 말한다.",
    },
    {
      id: "q3",
      question:
        "SLI 수집 위치를 바꿀 때 본문이 권하는 절차는?",
      choices: [
        "새 위치 검증이 끝나면 target을 즉시 새 기준으로 상향한다",
        "기존 SLI를 폐기하고 새 SLI만 단독으로 집계한다",
        "기존 SLI와 새 SLI를 최소 한 error-budget 주기 동안 병렬 집계한다",
        "cutover 승인 없이 새 위치로 곧바로 전환한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 수집 위치를 바꿀 때 기존 SLI와 새 SLI를 최소 한 error-budget 주기 동안 병렬 집계하고, target을 바로 바꾸지 말고 delta dashboard, excluded traffic 목록, cutover 승인 기록을 남기라고 한다.",
    },
    {
      id: "q4",
      question:
        "support ticket, RUM error, synthetic check는 나빠지는데 SLI는 평평할 때 먼저 의심할 것은?",
      choices: [
        "raw event drop, ingestion delay, client-side failure 누락 등 계측 경계 문제",
        "SLO target이 너무 낮게 설정된 문제",
        "error budget ledger의 제외 규칙이 과도한 문제",
        "burn-rate alert의 창이 너무 짧은 문제",
      ],
      answerIndex: 0,
      explanation:
        "본문은 다른 신호는 나빠지는데 SLI가 평평하면 계측 경계가 잘못됐을 가능성이 크며, raw event drop, ingestion delay, client-side failure 누락을 먼저 확인하라고 한다.",
    },
    {
      id: "q5",
      question:
        "SLO target을 낮추면 생기는 위험으로 본문이 지적한 것은?",
      choices: [
        "운영팀이 감당할 수 없는 paging이 늘어난다",
        "실패가 정상처럼 보인다",
        "error budget이 자동으로 재충전된다",
        "release gate가 항상 배포를 멈추게 된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 target을 낮추면 실패가 정상처럼 보이고, target을 올리면 운영팀이 감당할 수 없는 paging이 늘어난다고 구분한다.",
    },
    {
      id: "q6",
      question:
        "error budget ledger에 회계 처리해야 하는 항목으로 본문이 든 것은?",
      choices: [
        "CPU utilization과 memory saturation 추이",
        "trace sampling rate와 collector capacity",
        "각 route의 p95/p99 latency histogram",
        "incident 기간, 제외 여부, 제외 근거, 사용자 영향, owner, release gate 결과",
      ],
      answerIndex: 3,
      explanation:
        "본문은 budget ledger에 incident 기간, 제외 여부, 제외 근거, 사용자 영향, owner, release gate 결과가 들어가야 하며, maintenance window를 자동 제외하면 실제 사용자 피해가 사라진다고 한다.",
    },
    {
      id: "q7",
      question:
        "release gate가 배포를 멈춰야 하는 경우로 본문이 제시한 것은?",
      choices: [
        "budget이 정책 임계치 아래이고 최근 burn이 같은 기능 영역에서 발생했을 때",
        "현재 알림이 quiet 상태로 조용할 때",
        "새 기능이 아직 canary 단계에 있을 때",
        "maintenance window가 열려 있을 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 budget이 정책 임계치 아래이고 최근 burn이 같은 기능 영역에서 발생했다면 배포를 멈추라고 하며, 단순히 알림이 quiet라고 통과시키면 slow burn 중 새 risk를 얹게 된다고 한다.",
    },
    {
      id: "q8",
      question:
        "multi-window burn-rate alert가 짧은 창과 긴 창을 나눠 보는 이유는?",
      choices: [
        "짧은 창은 비용을 줄이고 긴 창은 정확도를 높이려고",
        "창을 두 개 쓰면 alert 규칙 수가 줄어들어서",
        "빠른 피해 확산과 느린 budget 소진을 다른 대응으로 잡으려고",
        "짧은 창과 긴 창이 서로 다른 SLO를 평가하게 하려고",
      ],
      answerIndex: 2,
      explanation:
        "본문은 짧은 창은 즉시 paging, 긴 창은 ticket 또는 business-hour 대응으로 나눠 빠른 피해 확산과 느린 budget 소진을 다르게 잡되, 두 창이 같은 SLO를 같은 traffic filter로 평가하는지 확인하라고 한다.",
    },
    {
      id: "q9",
      question:
        "fast burn으로 on-call을 깨워야 하는 조건으로 본문이 든 것은?",
      choices: [
        "긴 창 burn만 나빠지고 남은 budget이 gate 기준 위일 때",
        "짧은 창 burn이 page 임계치를 넘고 traffic floor를 만족하며 SLI가 실제 실패를 보일 때",
        "전체 평균 지표가 작게라도 흔들릴 때",
        "maintenance label이 붙은 트래픽에서 실패가 보일 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 짧은 창 burn이 page 임계치를 넘고 traffic floor를 만족하며 사용자 여정 SLI가 실제 실패를 보일 때 깨우라고 하며, alert payload에 affected SLI, burn multiple, region, deploy marker를 담으라고 한다.",
    },
    {
      id: "q10",
      question:
        "RED metrics에서 request rate가 줄고 error는 늘지 않을 때 올바른 해석은?",
      choices: [
        "error가 낮으므로 정상으로 선언해도 된다",
        "duration만 확인하면 원인이 드러난다",
        "retry storm이 진행 중이라는 신호다",
        "upstream 차단, CDN/WAF, client release, DNS처럼 앞단에서 요청이 사라진 실패일 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 rate 감소가 upstream 차단, CDN/WAF, client release, DNS 문제처럼 서비스 내부까지 요청이 오지 않는 실패일 수 있으며, error가 낮다고 정상 선언하면 앞단 drop을 놓친다고 한다.",
    },
    {
      id: "q11",
      question:
        "RED panel을 어떤 차원으로 잘라야 한다고 본문은 말하나?",
      choices: [
        "route, status class, region, customer tier처럼 조치가 달라지는 차원만 기본 패널에 둔다",
        "user id, request id 같은 고카디널리티 label을 기본 패널에 올린다",
        "가능한 모든 차원을 첫 화면에 동시에 표시한다",
        "평균 latency 하나만으로 단순화한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 조치가 달라지는 차원(route, status class, region, customer tier)만 기본 패널에 두고, 고카디널리티 label을 dashboard에 올리면 query 비용과 timeout이 incident 중에 폭발한다고 경고한다.",
    },
    {
      id: "q12",
      question:
        "USE metrics에서 utilization이 높을 때 본문이 권하는 판단은?",
      choices: [
        "utilization이 높으면 곧바로 증설한다",
        "error counter가 오를 때까지 대응을 미룬다",
        "saturation과 service latency가 같이 오르는지 보고 증설 여부를 정한다",
        "CPU가 높으면 무조건 코드 bug로 확정한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 높은 utilization만으로 증설하지 않고 saturation과 service latency가 같이 오르는지 보며, CPU가 높아도 queue가 안정적이면 배치 작업이나 캐시 워밍일 수 있다고 한다.",
    },
    {
      id: "q13",
      question:
        "USE metrics에서 saturation이 error보다 먼저 예고하는 것은?",
      choices: [
        "packet drop 같은 네트워크 오류 카운트",
        "queue wait, connection backlog, disk IO wait처럼 사용자가 느끼는 지연",
        "release marker와 deploy 이벤트",
        "trace exemplar의 span status",
      ],
      answerIndex: 1,
      explanation:
        "본문은 saturation이 queue wait, connection backlog, disk IO wait처럼 사용자가 느끼는 지연을 error보다 먼저 보여주며, error가 낮다고 방치하면 timeout budget이 먼저 소진된다고 한다.",
    },
    {
      id: "q14",
      question:
        "trace tail sampling rule이 우선 보존해야 하는 대상으로 본문이 든 것은?",
      choices: [
        "모든 trace를 같은 확률로 남긴 random 표본",
        "성공한 대표 요청과 평균 latency trace",
        "head sampling으로 미리 고정한 초기 요청",
        "5xx, timeout, SLO threshold 초과, VIP tenant, canary traffic",
      ],
      answerIndex: 3,
      explanation:
        "본문은 tail sampling이 5xx, timeout, SLO threshold 초과, VIP tenant, canary traffic을 우선 보존해야 하며, 모든 trace를 같은 확률로 남기면 낮은 빈도의 치명적 실패가 빠질 수 있다고 한다.",
    },
    {
      id: "q15",
      question:
        "metric은 실패를 가리키는데 trace가 비어 있을 때 확인할 것으로 본문이 든 것은?",
      choices: [
        "collector drop, propagation header 누락, sampling rule mismatch, clock skew",
        "SLO target이 너무 높게 설정됐는지",
        "release gate 승인자가 누락됐는지",
        "dashboard panel 순서가 잘못됐는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 metric은 실패인데 trace가 비면 collector drop, propagation header 누락, sampling rule mismatch, clock skew를 확인하고, trace 부재를 실패 부재로 해석하지 말라고 한다.",
    },
    {
      id: "q16",
      question:
        "log guardrail에서 label로 승격하면 안 되는 필드로 본문이 든 것은?",
      choices: [
        "service, route, status, region 같은 저카디널리티 필드",
        "user id, session id, request id, raw URL query, stack trace",
        "deploy marker와 release version",
        "tenant tier와 severity",
      ],
      answerIndex: 1,
      explanation:
        "본문은 user id, session id, request id, raw URL query, stack trace처럼 값 종류가 계속 늘어나는 필드는 label이 아니라 searchable field나 correlation key로 두라고 하며, label로 올리면 index shard가 커져 incident query가 timeout된다고 한다.",
    },
    {
      id: "q17",
      question:
        "incident dashboard 첫 화면에 반드시 있어야 하는 패널로 본문이 든 것은?",
      choices: [
        "CPU, heap 같은 내부 지표 위주의 상세 그래프",
        "예쁜 차트와 장기 추세 비교",
        "현재 SLO burn, affected traffic, error/latency split, recent deploy, active alert, owner route",
        "각 서비스의 배포 히스토리 전체 타임라인",
      ],
      answerIndex: 2,
      explanation:
        "본문은 첫 화면에 현재 SLO burn, affected traffic, error/latency split, recent deploy, active alert, owner route가 보여야 하며, 5분 안에 page, rollback, mitigation 중 하나를 고르게 만들어야 한다고 한다.",
    },
    {
      id: "q18",
      question:
        "dashboard가 믿을 수 없는 상태를 본문은 어떻게 표시하라고 하나?",
      choices: [
        "data freshness, missing series, query error, partial region coverage를 별도 health panel로 보여준다",
        "빈 차트는 정상으로 간주하고 숨긴다",
        "stale panel도 평균값으로 채워 표시한다",
        "관측 공백은 postmortem 때만 기록한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 data freshness, missing series, query error, partial region coverage를 별도 health panel로 보여주고, stale threshold를 넘으면 alert note와 fallback query를 노출하라고 한다.",
    },
    {
      id: "q19",
      question:
        "alert routing에서 severity를 올리거나 내리는 기준으로 본문이 든 것은?",
      choices: [
        "on-call 담당자의 근무 시간대",
        "dashboard panel 개수와 query 비용",
        "trace sampling rate와 collector 용량",
        "사용자 영향 범위, SLO burn 속도, workaround 존재, regulatory 또는 revenue impact",
      ],
      answerIndex: 3,
      explanation:
        "본문은 사용자 영향 범위, SLO burn 속도, workaround 존재, regulatory 또는 revenue impact로 severity를 조정하며, 내부 warning만으로 SEV를 올리면 fatigue가 늘고 customer-visible failure를 낮추면 공지가 늦는다고 한다.",
    },
    {
      id: "q20",
      question:
        "silence와 maintenance를 안전하게 운영하기 위해 본문이 요구한 것은?",
      choices: [
        "silence는 scope, 만료 시각, owner, ticket을 반드시 갖고 SLO burn alert 전체를 덮지 않아야 한다",
        "maintenance label은 넓게 잡아 알림을 최대한 줄인다",
        "silence는 만료 없이 유지해 재설정 부담을 없앤다",
        "window 종료 후 suppressed alert는 그대로 폐기한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 silence가 scope, 만료 시각, owner, ticket을 반드시 갖고 SLO burn alert 전체를 덮지 않아야 하며, window 종료 후 suppressed alert replay와 missed page review를 실행하라고 한다.",
    },
    {
      id: "q21",
      question:
        "synthetic check가 단순 health endpoint만 때릴 때 생기는 문제는?",
      choices: [
        "test data, rate limit, captcha 때문에 false positive가 늘어난다",
        "로그인, 결제, search처럼 실제 사용자 실패가 감지되지 않는다",
        "probe 비용이 급증해 collector가 터진다",
        "regional endpoint가 자동으로 중복 집계된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 단순 health endpoint만 때리면 로그인, 결제, search 같은 실제 사용자 실패가 감지되지 않고, 반대로 너무 복잡한 probe는 test data, rate limit, captcha, third-party 변동으로 false positive가 많아진다고 한다.",
    },
    {
      id: "q22",
      question:
        "RUM만 보고 backend SLO를 무시하면 과대평가하게 되는 신호로 본문이 든 것은?",
      choices: [
        "ad blocker, sampling bias, privacy filtering 때문에 backend 책임이 아닌 신호",
        "backend 200 응답이 가리는 JavaScript error",
        "mobile timeout과 regional network 지연",
        "client cache 문제로 인한 실패",
      ],
      answerIndex: 0,
      explanation:
        "본문은 backend 200만 보면 client-side 실패를 놓치지만, 반대로 RUM만 보면 ad blocker, sampling bias, privacy filtering 때문에 backend 책임이 아닌 신호를 과대평가할 수 있다고 한다.",
    },
    {
      id: "q23",
      question:
        "특정 browser, OS, mobile app version, user region에만 RUM이 나쁠 때 본문이 권하는 대응은?",
      choices: [
        "즉시 global rollback으로 전체를 되돌린다",
        "backend SLO가 안정적이면 대응하지 않는다",
        "global rollback보다 targeted mitigation이 맞다",
        "sampling rate를 낮춰 noise를 줄인다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 특정 cohort에만 RUM이 나쁘면 global rollback보다 targeted mitigation이 맞고, backend SLO가 안정적이어도 client cohort conversion이 떨어지면 customer impact라고 한다.",
    },
    {
      id: "q24",
      question:
        "postmortem에서 observability gap의 action item이 닫히려면 갖춰야 할 요소로 본문이 든 것은?",
      choices: [
        "'dashboard 개선'처럼 넓은 방향성 문장",
        "새 metric 하나를 추가했다는 기록",
        "회고 문장과 담당자 이름",
        "owner, due date, query or code location, expected alert behavior, cost impact, rollback plan",
      ],
      answerIndex: 3,
      explanation:
        "본문은 action item이 owner, due date, query or code location, expected alert behavior, cost impact, rollback plan을 갖춰야 닫을 수 있고, 'dashboard 개선'처럼 넓은 항목은 완료돼도 대응이 달라지지 않을 수 있다고 한다.",
    },
    {
      id: "q25",
      question:
        "postmortem에서 재발 방지를 검증하는 방법으로 본문이 든 것은?",
      choices: [
        "같은 failure mode를 staging drill이나 alert replay로 재현해 signal과 owner action까지 이어지는지 확인한다",
        "runbook 문서를 업데이트했는지만 확인한다",
        "새 metric이 dashboard에 추가됐는지만 확인한다",
        "on-call 담당자가 회고를 읽었는지 확인한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 같은 failure mode를 staging drill이나 alert replay로 재현해 새 signal이 울리고 dashboard에서 owner action까지 이어지는지 확인하며, 문서만 업데이트하면 실제 on-call 경로가 안 바뀔 수 있다고 한다.",
    },
    {
      id: "q26",
      question:
        "SLO target 상향을 승인해도 되는 조건으로 본문이 든 것은?",
      choices: [
        "현재 알림이 조용하고 지난 incident가 alert tuning만으로 가려진 상태일 때",
        "이미 소진한 budget을 새 기준 뒤로 숨겨 release freeze를 우회하고 싶을 때",
        "최근 burn이 안정적이고 toil 증가 없이 감지·복구가 반복 가능하며 고객 tier가 더 엄격한 약속을 요구할 때",
        "paging 볼륨을 줄이려고 target을 더 느슨하게 조정할 때",
      ],
      answerIndex: 2,
      explanation:
        "본문은 최근 burn이 안정적이고 toil 증가 없이 감지·복구가 반복 가능하며 고객 tier가 더 엄격한 약속을 요구할 때 상향을 승인하며, 과거 incident가 alert tuning만으로 가려진 상태면 상향이 paging 폭증을 만든다고 한다.",
    },
    {
      id: "q27",
      question:
        "긴 창 burn만 나빠지는 slow burn을 본문은 어떤 대응으로 넘기라고 하나?",
      choices: [
        "짧은 창 alert를 꺼서 noise를 줄인다",
        "traffic floor를 만족하지 않으므로 항상 무시한다",
        "무조건 on-call을 즉시 깨워 page로 처리한다",
        "owner ticket, release review, capacity 또는 dependency follow-up으로 넘기되 남은 budget이 gate 기준 아래면 ticket만으로는 부족하다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 긴 창만 나빠지면 즉시 paging보다 owner ticket, release review, capacity 또는 dependency follow-up이 맞을 수 있으나 남은 budget이 gate 기준 아래면 ticket만으로는 부족하다고 하며, slow-burn report에 소진 속도와 예상 depletion time을 붙이라고 한다.",
    },
    {
      id: "q28",
      question:
        "burn-rate alert의 noise를 줄이려 threshold를 올리기 전 본문이 확인하라고 한 조건은?",
      choices: [
        "무조건 창 길이를 늘려 긴 창만 남긴다",
        "traffic floor, absent data 처리, maintenance label, dependency outage label을 확인한다",
        "SLO target을 낮춰 alert가 덜 울리게 한다",
        "traffic floor를 제거해 모든 요청을 평가한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 threshold를 올리기 전 traffic floor, absent data 처리, maintenance label, dependency outage label을 확인하라고 하며, noise 때문에 창을 길게만 만들면 실제 fast burn이 늦게 울린다고 경고한다.",
    },
    {
      id: "q29",
      question:
        "RED metrics에서 duration 상승의 위험을 본문은 어떤 기준으로 나누나?",
      choices: [
        "평균 latency 하나가 오르면 즉시 전체 rollback 대상이다",
        "p50이 안정적이면 tail latency는 SLO에 영향을 주지 않는다",
        "p95/p99가 SLO threshold를 넘고 같은 시간대 queue·DB·dependency 지표가 흔들리면 사용자 영향 위험이고, p50만 상승하면 cache miss나 특정 route 변화일 수 있다",
        "error rate가 오르지 않는 한 duration은 위험하지 않다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 p95/p99가 SLO threshold를 넘고 같은 시간대 queue·DB·dependency 지표가 흔들리면 사용자 영향 위험이며, p50만 상승하면 cache miss나 route 변화라 scope가 다르다고 한다. 평균만 보면 tail이 SLO를 태우는데도 p50은 안정적으로 보인다.",
    },
    {
      id: "q30",
      question:
        "USE metrics로 인프라 병목과 앱 장애를 본문은 어떻게 가르나?",
      choices: [
        "CPU utilization이 높으면 언제나 인프라 병목으로 확정한다",
        "error counter가 오르기 전까지는 앱 장애로 본다",
        "saturation이 낮으면 무조건 앱 release 문제다",
        "saturation이 특정 node pool이나 dependency에 몰리고 app error stack이 같은 시각에 후행하면 인프라 병목, resource headroom이 충분한데 특정 route error가 늘면 app release나 data shape를 의심한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 USE saturation이 특정 node pool이나 dependency에 몰리고 app error stack이 같은 시각에 후행하면 인프라 병목 가능성이 크고, resource headroom이 충분한데 특정 route error가 늘면 app release나 data shape를 의심하라고 한다.",
    },
    {
      id: "q31",
      question:
        "trace exemplar가 보장해야 하는 연결로 본문이 든 것은?",
      choices: [
        "모든 metric point가 성공 trace를 균등하게 가리켜야 한다",
        "metric point에서 대표 trace, log line, deployment marker로 이동할 수 있어야 하며 random success trace만 가리키면 SLO burn 분석 속도가 떨어진다",
        "exemplar는 head sampling으로 고정된 초기 요청만 연결한다",
        "trace 대신 CPU 그래프로 이동하도록 연결한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 exemplar가 metric point에서 대표 trace, log line, deployment marker로 이동할 수 있어야 하며, random success trace만 가리키면 SLO burn 상황에서 분석 속도가 떨어진다고 한다.",
    },
    {
      id: "q32",
      question:
        "log query가 timeout될 때 본문이 권하는 incident 분석 진행 방식은?",
      choices: [
        "전체 텍스트 검색을 반복해 표본을 키운다",
        "user id, request id를 label로 올려 검색을 빠르게 한다",
        "기간을 줄이고 service·route·status·region 같은 저카디널리티 필터부터 적용한다",
        "query를 멈추고 postmortem 때까지 분석을 미룬다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 query timeout 시 기간을 줄이고 service, route, status, region 같은 저카디널리티 필터부터 적용하라고 하며, 전체 텍스트 검색을 반복하면 비용만 늘고 증거가 늦어진다고 한다.",
    },
    {
      id: "q33",
      question:
        "alert routing에서 owner route를 본문은 어떤 증거로 검증하라고 하나?",
      choices: [
        "service catalog owner만 맞으면 escalation policy는 확인하지 않아도 된다",
        "route가 팀 별칭을 가리키면 언제나 정확하다",
        "silence scope만 확인하면 owner는 자동으로 검증된다",
        "alert label, service catalog owner, on-call schedule, runbook owner가 같은 팀을 가리키는지 확인하고 분기마다 test page나 dry-run으로 ack 시간과 escalated target을 점검한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 alert label, service catalog owner, on-call schedule, runbook owner가 같은 팀을 가리켜야 하고, service catalog만 맞고 escalation policy가 오래되면 page가 전 담당 팀으로 가므로 분기마다 test page나 dry-run으로 ack 시간과 escalated target을 확인하라고 한다.",
    },
  ],
};

export default quiz;
