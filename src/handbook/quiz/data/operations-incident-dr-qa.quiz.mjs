// Incident Response·Rollback·DR Q&A(operations-incident-dr-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-incident-dr-quiz",
  title: "Incident Response·Rollback·DR 퀴즈",
  sourceQaId: "operations-incident-dr-qa",
  questions: [
    {
      id: "q1",
      question: "incident 선언이 본질적으로 무엇을 바꾸는 결정인가?",
      choices: [
        "원인을 규명했다는 선언이 아니라 운영 모드를 바꾸는 결정",
        "특정 서비스가 다운됐음을 확정하는 기술 판정",
        "on-call 엔지니어에게 책임을 넘기는 인사 결정",
        "SLA 위반이 법적으로 성립했음을 공표하는 절차",
      ],
      answerIndex: 0,
      explanation:
        "본문은 incident 선언이 원인이 아니라 운영 모드를 바꾸는 결정이라고 말한다. 고객 영향, SLO burn, 보안·데이터 위험, 복구 필요성 중 하나만 확인돼도 commander를 세운다.",
    },
    {
      id: "q2",
      question: "고객 신고가 아직 없을 때도 incident로 선언하는 근거로 옳은 것은?",
      choices: [
        "내부 warning 알림이 한 건이라도 발생했을 때",
        "multi-window SLO burn, synthetic failure, 결제·로그인 같은 critical path 실패가 보일 때",
        "on-call이 피로해 paging fatigue를 호소할 때",
        "대시보드 링크가 담당자에게 공유되지 않았을 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 multi-window SLO burn, synthetic failure, critical path 실패가 보이면 신고 전이라도 선언한다고 한다. 내부 warning만 있고 사용자 경로가 성공하면 watch 상태로 둔다.",
    },
    {
      id: "q3",
      question: "commander를 바로 세워야 하는 조건은?",
      choices: [
        "단일 서비스에서 error rate가 1%라도 오를 때",
        "on-call 엔지니어가 로그 조사를 시작할 때",
        "둘 이상의 팀이 참여하거나 rollback·traffic shift·고객 공지 중 하나가 필요할 때",
        "postmortem 문서를 작성하기로 결정했을 때",
      ],
      answerIndex: 2,
      explanation:
        "본문은 둘 이상의 팀 참여, 또는 rollback·traffic shift·고객 공지 중 하나가 필요하면 바로 commander를 세운다고 한다. 실무자가 지휘까지 맡으면 복구 명령과 상태 공유가 섞인다.",
    },
    {
      id: "q4",
      question: "severity를 정하는 우선 기준으로 본문이 강조하는 것은?",
      choices: [
        "장애가 발생한 마이크로서비스의 개수",
        "on-call 로테이션에 투입된 엔지니어 수",
        "배포 이후 경과한 시간과 커밋 수",
        "고객 영향 범위·지속 시간·우회 가능성·데이터 손실·보안/규제 영향이며, 내부 component 이름보다 사용자 cohort와 business criticality가 우선",
      ],
      answerIndex: 3,
      explanation:
        "본문은 severity를 고객 영향 범위, 지속 시간, 우회 가능성, 데이터 손실, 보안·규제 영향으로 정하며 내부 component 이름보다 사용자 cohort와 business criticality가 우선이라고 한다.",
    },
    {
      id: "q5",
      question: "소수 고객만 영향받아도 높은 severity가 될 수 있는 경우는?",
      choices: [
        "enterprise tenant·결제·인증·데이터 삭제 경로처럼 business criticality가 높은 cohort일 때",
        "영향받은 고객이 무료 요금제 사용자일 때",
        "장애 지속 시간이 5분 미만으로 짧을 때",
        "우회 경로가 자동으로 복구됐을 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 고객 수만 보지 않고 enterprise tenant, 결제, 인증, 데이터 삭제 경로이면 작은 cohort도 높은 severity가 된다고 한다. 증거는 tenant tier, revenue impact, failed transaction sample이다.",
    },
    {
      id: "q6",
      question: "severity를 낮추는 조건으로 옳은 것은?",
      choices: [
        "commander가 교대해 새 지휘자가 투입될 때",
        "새 실패 유입이 멈추고 우회 또는 복구가 고객 경로에서 확인될 때",
        "임시 완화 flag를 켜서 error rate가 잠깐 내려갔을 때",
        "status page 공지를 마지막으로 발행한 지 1시간이 지났을 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 새 실패 유입이 멈추고 우회 또는 복구가 고객 경로에서 확인되어야 severity를 낮춘다고 한다. 임시 완화가 켜져 있거나 데이터 보정이 남았으면 낮춰도 incident는 닫지 않는다.",
    },
    {
      id: "q7",
      question: "commander handoff에서 기록자가 반드시 남겨야 하는 것은?",
      choices: [
        "참여자 전원의 근무 시간과 초과 근무 기록",
        "채팅 채널의 전체 메시지 원문 백업",
        "decision·commander 승인·실행 명령·관측 결과·다음 결정 시각을 시간순으로",
        "장애가 발생한 서버의 CPU·메모리 그래프 캡처만",
      ],
      answerIndex: 2,
      explanation:
        "본문은 기록자가 decision, commander 승인, 실행 명령, 관측 결과, 다음 결정 시각을 시간순으로 남긴다고 한다. dashboard link보다 snapshot time과 metric value가 필요하다.",
    },
    {
      id: "q8",
      question: "technical owner가 여러 명일 때 cross-service tradeoff는 누가 결정하나?",
      choices: [
        "가장 오래 근무한 senior engineer가 결정",
        "각 서비스 owner가 투표로 결정",
        "comms owner가 고객 공지 편의에 맞춰 결정",
        "commander가 고객 영향 감소량·되돌림 가능성·데이터 위험으로 결정",
      ],
      answerIndex: 3,
      explanation:
        "본문은 각 영역 owner는 조사와 실행을 맡고 cross-service tradeoff는 commander가 고객 영향 감소량, 되돌림 가능성, 데이터 위험으로 결정한다고 한다.",
    },
    {
      id: "q9",
      question: "customer update의 본질을 본문은 어떻게 규정하나?",
      choices: [
        "확정된 원인 설명보다 현재 영향·완화 상태·다음 update time을 안정적으로 제공하는 운영 계약",
        "원인이 확정될 때까지 기다렸다가 한 번에 상세히 알리는 보고",
        "vendor 책임 소재를 먼저 밝혀 고객 불만을 줄이는 커뮤니케이션",
        "복구 완료 시점에만 발행하는 최종 요약",
      ],
      answerIndex: 0,
      explanation:
        "본문은 customer update가 확정 원인 설명보다 현재 영향, 완화 상태, 다음 update time을 안정적으로 제공하는 운영 계약이라고 한다. 원인 확정까지 기다리면 고객은 침묵을 은폐로 받아들인다.",
    },
    {
      id: "q10",
      question: "내부 채널과 외부 status가 다를 때 취해야 할 태도는?",
      choices: [
        "복구 속도를 강조하기 위해 외부 문구를 먼저 낙관적으로 갱신",
        "source of truth를 하나로 지정하고, 신호가 엇갈리면 외부 문구는 보수적으로 유지",
        "내부 판단을 우선해 외부에 복구 완료를 즉시 공지",
        "외부 공지를 중단하고 내부 채널만 계속 갱신",
      ],
      answerIndex: 1,
      explanation:
        "본문은 support ticket·RUM·synthetic·backend SLI가 서로 다른 결론이면 외부 문구는 보수적으로 유지하고, comms owner가 source of truth를 하나로 지정해야 한다고 한다.",
    },
    {
      id: "q11",
      question: "원인 확정 전 mitigation의 우선 판단 기준은?",
      choices: [
        "가장 빠르게 배포 가능한 코드 수정을 먼저 넣는 것",
        "원인이 확정될 때까지 어떤 변경도 하지 않는 것",
        "root cause 증명보다 고객 피해 축소를 먼저 보고, 되돌릴 수 있고 blast radius를 줄이는 조치를 우선",
        "가장 넓은 범위를 한 번에 차단해 확실히 막는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 mitigation이 root cause 증명보다 고객 피해 축소를 먼저 보는 선택이며 read-only mode, traffic shed, feature flag off처럼 되돌릴 수 있고 blast radius를 줄이는 조치를 우선한다고 한다.",
    },
    {
      id: "q12",
      question: "mitigation 성공을 판단할 때 error rate 하나만 보면 안 되는 이유는?",
      choices: [
        "error rate는 항상 후행 지표라 값 자체를 신뢰할 수 없어서",
        "error rate는 commander만 조회할 수 있는 권한 지표라서",
        "error rate는 SSR 환경에서 집계되지 않아서",
        "한 지표만 좋아지면 부하를 다른 경로로 밀었을 수 있어, customer impact·retry·queue lag·ticket이 같은 방향으로 줄어야 함",
      ],
      answerIndex: 3,
      explanation:
        "본문은 error rate만 보지 않고 customer impact count, retry volume, queue lag, support ticket inflow가 같은 방향으로 줄어야 한다고 한다. 한 지표만 좋아지면 부하를 다른 경로로 민 것일 수 있다.",
    },
    {
      id: "q13",
      question: "복구 수단(rollback·traffic shift·config revert·flag off)을 고르는 기준은?",
      choices: [
        "변경 종류·되돌림 가능성·데이터 호환성·고객 영향 감소 속도",
        "팀이 가장 익숙하고 자주 써 본 수단",
        "배포 파이프라인에서 버튼 하나로 실행되는 수단",
        "가장 최근에 성공했던 복구 수단을 재사용",
      ],
      answerIndex: 0,
      explanation:
        "본문은 복구 선택을 변경 종류, 되돌림 가능성, 데이터 호환성, 고객 영향 감소 속도로 고른다고 한다. 같은 목적처럼 보여도 위험 경계가 다르다.",
    },
    {
      id: "q14",
      question: "rollback을 막는 신호로 본문이 든 것은?",
      choices: [
        "배포된 지 24시간이 지난 코드 변경",
        "irreversible migration, backward-incompatible message, warmed cache dependency, old binary secret mismatch",
        "commander가 교대 중이라 승인자가 없는 상황",
        "고객 신고가 아직 접수되지 않은 상태",
      ],
      answerIndex: 1,
      explanation:
        "본문은 irreversible migration, backward-incompatible message, warmed cache dependency, old binary secret mismatch가 있으면 rollback을 바로 막고 traffic shift나 feature flag off가 더 안전할 수 있다고 한다.",
    },
    {
      id: "q15",
      question: "traffic shift가 만들 수 있는 실패는?",
      choices: [
        "이전 binary가 자동으로 재배포되어 코드가 롤백됨",
        "config source of truth와 live readback이 강제로 동기화됨",
        "남은 region/cluster가 capacity를 못 버티거나 state locality 때문에 latency가 늘 수 있음",
        "schema migration이 자동으로 되돌려짐",
      ],
      answerIndex: 2,
      explanation:
        "본문은 traffic shift 시 남은 region이나 cluster가 capacity를 못 버티거나 state locality 때문에 latency가 늘 수 있다고 한다. shift 전에 headroom, sticky session, replication lag를 확인한다.",
    },
    {
      id: "q16",
      question: "forward fix가 rollback보다 나은 조건은?",
      choices: [
        "incident 중 새 기능을 함께 얹어 개발 속도를 높이고 싶을 때",
        "reviewer 없이 빠르게 배포해 시간을 아껴야 할 때",
        "schema나 protocol 변경을 포함하는 큰 수정일 때",
        "위험이 낮고 작은 변경으로 고객 영향이 빠르게 줄며 blast radius·review·test evidence·abort switch가 있을 때",
      ],
      answerIndex: 3,
      explanation:
        "본문은 forward fix를 위험이 낮고 작은 변경으로 고객 영향이 빠르게 줄 때 선택하며 blast radius, review depth, test evidence, abort switch가 있어야 한다고 한다. 새 기능을 얹는 방식이면 거부한다.",
    },
    {
      id: "q17",
      question: "restore drill이 증명해야 하는 것은?",
      choices: [
        "복구 지점·무결성·접근 권한·read-only 검증·실제 소요 시간까지, 운영과 같은 절차와 권한으로 실행 가능한지",
        "backup 파일이 존재하고 저장이 완료됐다는 사실",
        "backup job이 성공 알림을 보냈다는 로그",
        "backup 스토리지의 용량이 충분히 남았는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 restore drill이 backup 파일 존재가 아니라 복구 지점, 무결성, 접근 권한, read-only 검증, 실제 소요 시간을 증명해야 하며 운영 복구 때 같은 절차를 같은 권한으로 실행할 수 있어야 한다고 한다.",
    },
    {
      id: "q18",
      question: "backup success와 restore success가 다른 이유는?",
      choices: [
        "backup은 자동이고 restore는 수동이라 시간만 더 걸릴 뿐 결과는 같아서",
        "backup은 저장 완료이고 restore는 읽기 가능한 시스템 상태 재구성이라, key 접근·dependency version·index rebuild·permission이 restore 단계에서 깨질 수 있음",
        "restore는 항상 성공하므로 backup 알림만 확인하면 되어서",
        "backup은 무결성을 이미 검증하므로 restore에서 다시 볼 필요가 없어서",
      ],
      answerIndex: 1,
      explanation:
        "본문은 backup이 저장 완료이고 restore는 읽기 가능한 시스템 상태 재구성이며 key 접근, dependency version, index rebuild, permission이 restore 단계에서 깨질 수 있다고 한다. drill은 read-only endpoint에서 query와 integrity check까지 통과해야 한다.",
    },
    {
      id: "q19",
      question: "RTO 달성 시각을 무엇으로 봐야 하나?",
      choices: [
        "서비스가 HTTP 200을 반환하기 시작한 시각",
        "장애 서버가 재부팅을 완료한 시각",
        "인프라가 올라온 시각이 아니라 critical user journey가 성공하고 customer-facing SLI가 안정된 첫 시각",
        "commander가 복구 완료를 구두로 선언한 시각",
      ],
      answerIndex: 2,
      explanation:
        "본문은 RTO 달성을 인프라가 올라온 시각이 아니라 critical user journey가 성공하고 customer-facing SLI가 안정된 첫 시각으로 본다고 한다. 200을 반환한다고 복구를 끝내면 누락 주문·stale read가 남을 수 있다.",
    },
    {
      id: "q20",
      question: "RPO 초과 가능성은 언제 알리나?",
      choices: [
        "데이터 손실 규모가 정확히 확정된 뒤에만",
        "고객이 데이터 누락을 먼저 신고한 뒤에",
        "postmortem 작성 단계에서 일괄 정리해서",
        "last good point와 failure start 사이에 쓰기 유실 가능성이 보이면 확정 전이라도 commander와 business owner에게",
      ],
      answerIndex: 3,
      explanation:
        "본문은 last good point와 failure start 사이에 쓰기 유실 가능성이 보이면 확정 전이라도 commander와 business owner에게 알린다고 한다. 외부 문구는 추정 범위와 확인 중인 검증을 나눈다.",
    },
    {
      id: "q21",
      question: "DR failover를 실행하는 조건은?",
      choices: [
        "primary 복구 대기 비용이 secondary 전환 위험보다 클 때",
        "단일 health check가 한 번 실패했을 때",
        "primary의 CPU 사용률이 임계치를 넘었을 때",
        "secondary가 최신 상태로 갱신된 것이 확인된 즉시",
      ],
      answerIndex: 0,
      explanation:
        "본문은 DR failover를 primary 복구 대기 비용이 secondary 전환 위험보다 클 때 실행하며 단일 health check 실패만으로는 부족하다고 한다. trigger에는 customer impact, primary recovery ETA, secondary readiness가 함께 있어야 한다.",
    },
    {
      id: "q22",
      question: "failover에서 split brain을 막는 방법으로 옳은 것은?",
      choices: [
        "두 site 모두 write를 열어 두고 나중에 merge하는 것",
        "primary write fencing, leader lease 해제, DNS/traffic cutover 순서, replication freeze를 명확히 하는 것",
        "DNS TTL을 최대한 길게 잡아 전환을 지연시키는 것",
        "secondary의 read 트래픽을 먼저 늘려 부하를 검증하는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 primary write fencing, leader lease 해제, DNS/traffic cutover 순서, replication freeze를 명확히 해야 split brain을 막는다고 한다. 두 site가 동시에 write를 받으면 나중에 merge가 불가능할 수 있다.",
    },
    {
      id: "q23",
      question: "failback은 언제 실행해야 하나?",
      choices: [
        "primary health가 green으로 바뀐 즉시",
        "secondary의 비용이 primary보다 높아진 시점",
        "primary가 안정되고 데이터 방향·replication catch-up·traffic warm-up·rollback path가 검증된 뒤",
        "고객 공지 cadence가 한 사이클 끝난 뒤",
      ],
      answerIndex: 2,
      explanation:
        "본문은 failback을 primary가 안정되고 데이터 방향, replication catch-up, traffic warm-up, rollback path가 검증된 뒤에 한다고 한다. primary health가 green이라고 바로 돌리면 두 번째 outage가 난다.",
    },
    {
      id: "q24",
      question: "좋은 postmortem이 갖춰야 하는 성격은?",
      choices: [
        "root cause를 한 줄로 명확히 규정한 결론 문서",
        "담당자의 실수를 특정해 재발을 경고하는 책임 문서",
        "장애 시간 동안의 채팅 로그를 그대로 보존한 기록",
        "blame 문서가 아니라 다음 incident를 줄이는 운영 설계 문서로, action owner와 due date까지 포함",
      ],
      answerIndex: 3,
      explanation:
        "본문은 postmortem이 blame 문서가 아니라 다음 incident를 줄이는 운영 설계 문서이며 timeline, customer impact, contributing factors, detection gap, mitigation effectiveness, action owner와 due date가 있어야 한다고 한다.",
    },
    {
      id: "q25",
      question: "contributing factor는 root cause와 어떻게 다른가?",
      choices: [
        "root cause가 직접 계기라면, contributing factor는 감지 지연·권한 누락·runbook 부재·capacity headroom 부족처럼 피해를 키운 조건",
        "contributing factor는 root cause의 다른 이름일 뿐 실질적으로 같다",
        "contributing factor는 고객이 신고한 증상만을 가리킨다",
        "contributing factor는 항상 코드 결함 하나로 좁혀진다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 root cause가 직접 계기라면 contributing factor는 감지 지연, 권한 누락, runbook 부재, capacity headroom 부족처럼 피해를 키운 조건이라고 한다. 이를 쓰지 않으면 action item이 코드 수정 하나로 좁아진다.",
    },
    {
      id: "q26",
      question: "품질 높은 action item이 갖춰야 하는 요소는?",
      choices: [
        "'모니터링 개선'처럼 방향을 제시하는 포괄적 문장",
        "owner·due date·검증 방법·실패하면 다시 열 조건, 그리고 '무엇을 어떻게 검증해 닫는지'가 구체적인 닫힘 증거",
        "가능한 한 많은 팀이 공동 책임지도록 나눈 광범위한 범위",
        "다음 분기 로드맵에 반영하겠다는 우선순위 표시",
      ],
      answerIndex: 1,
      explanation:
        "본문은 action item에 owner, due date, 검증 방법, 실패하면 다시 열 조건이 있어야 하며 '모니터링 개선'은 부족하고 'checkout 5xx burn alert를 route별로 추가하고 replay로 검증'처럼 닫힘 증거가 필요하다고 한다.",
    },
    {
      id: "q27",
      question: "ticket close만으로 닫으면 안 되는 action은?",
      choices: [
        "문구 오탈자 수정처럼 사소한 문서 변경",
        "이미 배포된 코드에 대한 회고성 검토",
        "alert route·rollback runbook·restore drill처럼 운영 behavior를 바꾸는 항목으로, 실제 replay·dry-run·access check가 통과해야 함",
        "담당자가 확인 서명을 남긴 모든 항목",
      ],
      answerIndex: 2,
      explanation:
        "본문은 alert route, rollback runbook, restore drill처럼 운영 behavior를 바꾸는 항목은 ticket 상태만으로 부족하고 실제 alert replay, dry-run, access check가 통과해야 하며 close note에 실행자와 출력 링크가 있어야 한다고 한다.",
    },
    {
      id: "q28",
      question: "재발 방지 action을 연결할 대상을 문제 유형별로 옳게 짝지은 것은?",
      choices: [
        "모든 문제를 우선순위가 높은 PR 하나로 통합",
        "감지 문제는 drill, 실행 문제는 alert로 연결",
        "판단 문제와 제품 결함은 모두 교육 문서로 연결",
        "감지 문제는 alert, 판단 문제는 runbook, 실행 문제는 drill, 제품 결함은 PR, ownership 문제는 catalog/escalation policy",
      ],
      answerIndex: 3,
      explanation:
        "본문은 감지 문제는 alert, 판단 문제는 runbook, 실행 문제는 drill, 제품 결함은 PR, ownership 문제는 catalog나 escalation policy에 연결한다고 한다. 연결 대상이 없으면 action이 교육 문장으로만 남는다.",
    },
    {
      id: "q29",
      question: "incident로 선언하지 않기로 결정했을 때 남겨야 하는 기록은?",
      choices: [
        "영향 없음 판단, 확인한 SLI, 다음 재평가 시각, 자동 승격 조건",
        "신고하지 않은 고객의 연락처와 이탈 가능성 예측",
        "on-call 엔지니어의 근무 교대 일정과 초과 근무 시간",
        "선언하지 않았으므로 별도 기록은 남기지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 선언하지 않기로 한 결정도 기록하며 영향 없음 판단, 확인한 SLI, 다음 재평가 시각, 자동 승격 조건을 남겨야 교대자가 같은 논쟁을 반복하지 않는다고 한다. 이후 신고나 burn 증가가 생기면 그 기록으로 선언 지연을 회고한다.",
    },
    {
      id: "q30",
      question: "compliance 위반 가능성이 severity에 미치는 영향으로 옳은 것은?",
      choices: [
        "법무 검토가 끝날 때까지 severity 판정을 보류한다",
        "개인정보·결제·데이터 보존·계약 SLA 위반 가능성이 있으면 기술 영향보다 높은 등급으로 올릴 수 있다",
        "compliance는 postmortem 단계에서만 다루고 severity에는 반영하지 않는다",
        "규제 영향은 영향받은 고객 수가 많을 때만 severity를 올린다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 개인정보, 결제, 데이터 보존, 계약 SLA 위반 가능성이 있으면 기술 영향보다 높은 등급으로 올릴 수 있으며 법무·보안 owner 호출 시각, 노출 범위 가설, 보존한 audit log를 evidence packet에 넣는다고 한다.",
    },
    {
      id: "q31",
      question: "교대 시점에 닫히지 않은 결정을 다음 지휘자에게 넘기는 방법은?",
      choices: [
        "다음 지휘자가 처음부터 다시 진단하도록 이전 결정을 비워 둔다",
        "닫히지 않은 결정은 구두로만 전달해 문서 부담을 줄인다",
        "open decision마다 owner, 선택지, 차단 증거, deadline을 붙인다",
        "가장 위험한 결정 하나만 남기고 나머지는 폐기한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 open decision마다 owner, 선택지, 차단 증거, deadline을 붙이며 rollback 대 traffic shift가 남았다면 필요한 canary metric과 승인자를 적어 다음 지휘자가 첫 10분을 다시 진단하지 않게 한다고 한다.",
    },
    {
      id: "q32",
      question: "customer update의 cadence는 무엇으로 정하나?",
      choices: [
        "원인이 확정될 때까지 공지 간격을 정하지 않는다",
        "commander가 매 공지마다 발행 여부를 새로 판단한다",
        "고객 신고가 들어올 때마다 그에 맞춰 발행한다",
        "severity와 변경 속도로 정하며 고severity는 15~30분, 안정화 중이면 30~60분 단위로, 변화가 없어도 같은 시각에 업데이트한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 cadence를 severity와 변경 속도로 정하고 고severity는 15~30분, 안정화 중이면 30~60분이 보통이며 변화가 없어도 같은 시각에 업데이트하고 실제 발행 시각과 다음 예정 시각을 incident log에 남긴다고 한다.",
    },
    {
      id: "q33",
      question: "incident 중 켠 임시 예외(예외 rule, scale-out, read-only flag, allowlist)를 닫는 조건은?",
      choices: [
        "owner, expiry, rollback command를 갖고 config readback과 SLI 안정화로 닫으며, 종료 때 열려 있으면 active risk다",
        "incident가 종료되면 임시 예외는 자동으로 만료되므로 별도 조치가 필요 없다",
        "임시 예외는 postmortem action으로만 남기고 incident 중에는 닫지 않는다",
        "error rate가 한 번이라도 내려가면 즉시 닫는다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 예외 rule, scale-out, read-only flag, allowlist가 owner, expiry, rollback command를 가져야 하며 incident 종료 때 열려 있으면 postmortem action이 아니라 active risk이고 close evidence는 config readback과 SLI 안정화라고 한다.",
    },
    {
      id: "q34",
      question: "config revert가 code rollback보다 나은 경우는?",
      choices: [
        "binary 변경과 config 변경이 동시에 있을 때 config revert가 항상 빠르다",
        "증상이 threshold·route·policy·flag 변경과 시간상 맞고 binary는 안정적일 때",
        "code rollback이 불가능할 때의 마지막 수단으로만 쓴다",
        "config source of truth와 live readback이 다를 때 revert가 더 안전하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 증상이 threshold, route, policy, flag 변경과 시간상 맞고 binary가 안정적이면 config revert가 빠르며, 단 config source of truth와 live readback이 다르면 revert가 적용됐다고 착각하므로 변경 전후 diff와 effective config를 함께 본다고 한다.",
    },
    {
      id: "q35",
      question: "restore된 데이터의 무결성은 무엇으로 확인하나?",
      choices: [
        "DB 프로세스가 정상 기동했는지만 확인하면 된다",
        "backup job의 성공 알림 로그로 무결성을 갈음한다",
        "checksum, row count, referential check, sample transaction replay, application smoke를 조합한다",
        "restore point 파일 크기가 원본과 같은지 비교한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 무결성을 checksum, row count, referential check, sample transaction replay, application smoke로 확인하며 DB가 올라온 것만으로는 누락·중복·오래된 snapshot을 잡지 못하고 결과를 restore point와 검증 쿼리 출력으로 남긴다고 한다.",
    },
    {
      id: "q36",
      question: "복구 중 business approval이 필요한 이유는?",
      choices: [
        "기술 복구가 정상이면 business approval 없이 write를 재개할 수 있어서",
        "business approval은 postmortem 문서 서명으로 대체되어서",
        "commander가 기술 판단만으로 고객 보상 범위를 확정하기 위해서",
        "데이터 손실·주문 보정·기능 제한 운영은 기술 정상 여부만으로 결정할 수 없어 business owner가 고객 보상, 공지 문구, write 재개 조건을 승인해야 해서",
      ],
      answerIndex: 3,
      explanation:
        "본문은 데이터 손실, 주문 보정, 기능 제한 운영을 기술 정상 여부만으로 결정할 수 없어 business owner가 고객 보상, 공지 문구, write 재개 조건을 승인하며 approval record에 남은 reconciliation 항목을 붙인다고 한다.",
    },
  ],
};

export default quiz;
