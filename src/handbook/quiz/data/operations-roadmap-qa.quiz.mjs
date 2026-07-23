// 인프라·운영 로드맵 Q&A(operations-roadmap-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-roadmap-quiz",
  title: "인프라·운영 로드맵 퀴즈",
  sourceQaId: "operations-roadmap-qa",
  questions: [
    {
      id: "q1",
      question:
        "운영 지도를 처음 펼칠 때 가장 먼저 고정해야 하는 것은?",
      choices: [
        "사용자 영향이 들어오는 입구, 책임 팀, 의존 서비스, 최근 변경 표식을 한 장에 고정한다",
        "모든 클라우드 서비스 이름을 알파벳 순으로 나열한다",
        "빨간 대시보드에 뜬 알림을 심각도 순으로 정렬한다",
        "장애 여부가 확정될 때까지 조사를 보류한다",
      ],
      answerIndex: 0,
      explanation:
        "운영 지도의 첫 판단은 서비스 이름 나열이 아니라 사용자 영향 입구, 책임 팀, 의존 서비스, 최근 변경 표식을 한 장에 고정하는 일이다. 신고 시각, SLO burn, 배포 marker, dependency map을 같은 시간축에 놓아 조사 순서를 정한다.",
    },
    {
      id: "q2",
      question:
        "운영 지도 초기 분기에서 정상 선언을 보류해야 하는 경우는?",
      choices: [
        "SLO burn이 멈추고 영향 경로가 한 서비스 경계 안으로 닫혔을 때",
        "owner가 비었거나 dependency map 최신 시각이 배포 marker보다 오래됐을 때",
        "service catalog의 owner와 escalation policy가 모두 채워졌을 때",
        "고객 신고 시각과 deploy marker 시각이 정확히 일치할 때",
      ],
      answerIndex: 1,
      explanation:
        "owner가 비었거나 dependency map 최신 시각이 배포 marker보다 오래되면 정상 선언을 보류하고 incident commander가 임시 소유자를 지정한다.",
    },
    {
      id: "q3",
      question:
        "요청 경로 로드맵이 하나의 사용자 요청으로 이어서 보는 범위는?",
      choices: [
        "application entry와 downstream call만",
        "load balancer부터 데이터베이스 커밋까지",
        "DNS, TLS, CDN/WAF, load balancer, application entry, downstream call",
        "CDN cache hit rate와 origin 응답 코드만",
      ],
      answerIndex: 2,
      explanation:
        "요청 경로는 DNS, TLS, CDN/WAF, load balancer, application entry, downstream call을 하나의 사용자 요청으로 이어서 본다. 컴포넌트별로만 보면 앞단 차단을 애플리케이션 장애로 오판한다.",
    },
    {
      id: "q4",
      question:
        "요청 경로에서 앞단 로그에는 4xx/5xx가 느는데 애플리케이션 trace가 비어 있을 때 먼저 할 일은?",
      choices: [
        "애플리케이션 코드를 즉시 rollback하고 전체 배포를 중단한다",
        "trace가 비었으므로 정상으로 판단하고 알림을 닫는다",
        "모든 region resolver를 강제로 재시작한다",
        "원인 분석보다 WAF rule 우회, CDN cache bypass, target group 분리 중 영향이 가장 작은 완화를 먼저 선택한다",
      ],
      answerIndex: 3,
      explanation:
        "앞단 로그에 4xx/5xx가 늘지만 애플리케이션 trace가 비어 있는 위험 상태에서는 원인 분석보다 WAF rule 우회, CDN cache bypass, target group 분리 중 영향이 가장 작은 완화를 먼저 선택한다.",
    },
    {
      id: "q5",
      question:
        "변경 경로가 배포 가능 여부보다 먼저 증명해야 하는 것은?",
      choices: [
        "중단 기준, 되돌림 조건, 검증 주체가 준비됐는지",
        "배포 파이프라인이 green으로 통과했는지",
        "새 기능의 코드 커버리지가 목표치를 넘었는지",
        "배포 소요 시간이 이전보다 짧아졌는지",
      ],
      answerIndex: 0,
      explanation:
        "변경 경로의 우선 판단은 배포할 수 있는지가 아니라 중단 기준, 되돌림 조건, 검증 주체가 준비됐는지다. green pipeline만 있고 운영 readback이 없으면 위험 상태다.",
    },
    {
      id: "q6",
      question:
        "변경 경로에서 green pipeline은 있지만 운영 readback이 없거나 중단 결정자가 없을 때 옳은 조치는?",
      choices: [
        "승인자가 있으므로 canary 비율을 100%까지 올린다",
        "canary 비율을 올리지 않고 검증 계정 권한과 stop-the-line 담당자를 확정한다",
        "readback은 선택 사항이므로 배포를 정상 완료로 처리한다",
        "feature flag를 모든 tenant에 즉시 활성화한다",
      ],
      answerIndex: 1,
      explanation:
        "green pipeline만 있고 운영 readback이 없거나 승인자는 있는데 중단 결정자가 없는 위험 상태에서는 canary 비율을 올리지 않고 검증 계정 권한과 stop-the-line 담당자를 확정한다.",
    },
    {
      id: "q7",
      question:
        "복구 경로를 원인 분석과 분리해서 먼저 검토해야 하는 선택지는?",
      choices: [
        "근본 원인(root cause)의 정확한 커밋 해시 특정",
        "장애 보고서 초안과 고객 공지 문구 작성",
        "traffic shift, read-only mode, previous release rollback, degraded mode, data restore",
        "장기 아키텍처 개선안과 예산 산정",
      ],
      answerIndex: 2,
      explanation:
        "복구 경로에서는 traffic shift, read-only mode, previous release rollback, degraded mode, data restore 같은 선택지를 원인 확정보다 먼저 검토한다. 복구 경로가 없으면 원인을 찾는 동안 error budget이 계속 탄다.",
    },
    {
      id: "q8",
      question:
        "복구 경로 재발 봉쇄에서 위험 상태로 봐야 하는 경우는?",
      choices: [
        "임시 완화가 종료 조건, owner, 만료 시각을 모두 가진 상태",
        "예외 제거 티켓과 postmortem action이 같은 owner에게 묶인 상태",
        "traffic shift 실행 시각과 영향 감소율이 로그에 남은 상태",
        "사용자 지표만 회복되고 예외 rule, scale-out, read-only flag가 열린 채 남는 상태",
      ],
      answerIndex: 3,
      explanation:
        "정상은 임시 완화가 종료 조건, owner, 만료 시각을 가진 상태다. 위험은 사용자 지표만 회복되고 예외 rule, scale-out, read-only flag가 열린 채 남는 상태다.",
    },
    {
      id: "q9",
      question:
        "control plane 문제를 판단할 때 핵심 분리 기준은?",
      choices: [
        "설정 변경·배포·확장·인증·관리 API가 막혔는지와 기존 사용자 트래픽이 계속 처리되는지",
        "관리 API 장애는 언제나 전체 서비스 장애로 승격한다",
        "control plane 장애는 항상 고객 영향이 없으므로 무시한다",
        "data plane 지표가 안정적이면 관리 작업 실패는 기록하지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "control plane 판단은 설정 변경, 배포, 확장, 인증, 관리 API가 막혔는지와 기존 사용자 트래픽이 계속 처리되는지를 분리하는 일이다. 둘을 섞으면 관리 API 장애를 전체 장애로 과장하거나 다음 완화 불가 위험을 놓친다.",
    },
    {
      id: "q10",
      question:
        "현재 트래픽은 살아 있지만 scale-out·rollback·secret rotation 같은 다음 완화가 막힌 control plane 위험 상태에서 남길 것은?",
      choices: [
        "고객 영향이 없으므로 별도 기록 없이 알림만 닫는다",
        "break-glass 절차와 수동 변경 금지 범위를 incident log에 명시한다",
        "data plane error rate만 대시보드에 캡처한다",
        "모든 관리 API 요청을 재시도 큐에 무한 적재한다",
      ],
      answerIndex: 1,
      explanation:
        "현재 트래픽은 살아 있지만 다음 완화가 control plane 장애로 막힌 위험 상태에서는 break-glass 절차와 수동 변경 금지 범위를 incident log에 명시한다.",
    },
    {
      id: "q11",
      question:
        "data plane 변경을 검증할 때 기준으로 삼아야 하는 것은?",
      choices: [
        "전체 요청의 평균 지연과 평균 성공률",
        "control plane 배포가 성공했는지 여부",
        "실패 사용자 집합, shard 또는 partition, downstream 응답 시간",
        "대시보드 전체 색상이 초록으로 유지되는지",
      ],
      answerIndex: 2,
      explanation:
        "data plane 변경 리뷰에서는 평균 지표가 아니라 실패 사용자 집합, shard 또는 partition, downstream 응답 시간을 기준으로 검증 범위를 정한다. 얕게 보면 특정 tenant·region·partition 부분 장애를 놓친다.",
    },
    {
      id: "q12",
      question:
        "data plane에서 latency는 내려갔지만 queue lag는 계속 증가하는 상태에 대한 옳은 판단은?",
      choices: [
        "핵심 지표인 latency가 회복됐으므로 정상으로 선언한다",
        "queue lag는 배치 지표라 사용자 경로와 무관하므로 무시한다",
        "canary를 즉시 100%로 확대해 처리량을 늘린다",
        "한 지표만 좋아지고 다른 지표가 부채를 쌓는 위험 상태이므로 traffic shed나 consumer throttle을 적용한다",
      ],
      answerIndex: 3,
      explanation:
        "latency는 내려갔지만 queue lag가 계속 증가하는 것은 한 지표만 좋아지고 다른 지표가 부채를 쌓는 위험 상태다. traffic shed나 consumer throttle을 적용하고 누적량 감소를 증거로 닫는다.",
    },
    {
      id: "q13",
      question:
        "service catalog가 운영 로드맵에서 가능하게 하는 것은?",
      choices: [
        "누가 판단하고, 어디서 알림을 받고, 어떤 SLO와 dependency를 책임지는지 결정하게 한다",
        "각 서비스의 소스 코드와 배포 스크립트를 보관한다",
        "장애가 끝난 뒤 고객 배상 금액을 산정한다",
        "클라우드 provider의 요금 청구서를 통합한다",
      ],
      answerIndex: 0,
      explanation:
        "service catalog는 서비스 설명서가 아니라 누가 판단하고 어디서 알림을 받고 어떤 SLO와 dependency를 책임지는지 결정하게 해주는 운영 원장이다. owner, escalation, tier, runbook, dependency, recent change 링크가 살아 있어야 한다.",
    },
    {
      id: "q14",
      question:
        "dependency map이 없거나 오래됐을 때 늦게 발견하게 되는 문제는?",
      choices: [
        "각 서비스의 CPU와 메모리 사용률을 볼 수 없게 된다",
        "공통 인증, 메시지 브로커, shared database 같은 숨은 의존성을 늦게 찾아 여러 팀이 각자 정상이라고 말하는 시간이 길어진다",
        "배포 파이프라인의 빌드 시간이 늘어난다",
        "고객 청구서의 항목별 내역이 사라진다",
      ],
      answerIndex: 1,
      explanation:
        "dependency map이 없거나 오래되면 공통 인증, 메시지 브로커, shared database 같은 숨은 의존성을 늦게 찾아 여러 팀이 각자 정상이라고 말하는 시간이 길어진다.",
    },
    {
      id: "q15",
      question:
        "owner matrix가 없을 때 장애 중 발생하는 대표적 문제는?",
      choices: [
        "서비스의 로그가 자동으로 삭제된다",
        "SLO burn 지표가 계산되지 않는다",
        "모두가 보고만 있고 아무도 rollback, 고객 공지, 예외 종료를 결정하지 않는다",
        "배포 marker가 대시보드에 표시되지 않는다",
      ],
      answerIndex: 2,
      explanation:
        "owner matrix가 없으면 모두가 보고만 있고 아무도 rollback, 고객 공지, 예외 종료를 결정하지 않는다. 백업 담당자가 없으면 야간·휴가 시간대에 실무 권한자를 다시 찾아야 한다.",
    },
    {
      id: "q16",
      question:
        "SLO burn을 로드맵에서 다루는 올바른 관점은?",
      choices: [
        "어느 서비스를 먼저 볼지 정하는 우선순위 라벨로만 본다",
        "단순 알림으로 보고 원인 분석이 끝날 때까지 대응을 미룬다",
        "예산 소진이 낮아도 즉시 rollback을 실행하는 트리거로 쓴다",
        "지금 변경 중지, 완화, 고객 공지, 장기 개선 중 무엇을 선택할지 결정하는 회계 신호로 본다",
      ],
      answerIndex: 3,
      explanation:
        "SLO burn은 어느 서비스를 먼저 보느냐가 아니라 지금 변경 중지, 완화, 고객 공지, 장기 개선 중 무엇을 선택할지 결정하는 회계 신호다. 단순 알림으로 보면 대응이 늦거나 과도한 rollback을 한다.",
    },
    {
      id: "q17",
      question:
        "SLO burn 승인 차단에서 fast burn이 열려 있을 때 옳은 조치는?",
      choices: [
        "신규 배포 승인을 차단하고 customer impact sample을 붙여 완화 우선순위를 incident commander에게 넘긴다",
        "slow burn과 동일하게 다루며 배포를 계속 승인한다",
        "error budget이 남아 있으므로 알림만 확인하고 넘어간다",
        "alert window를 더 길게 늘려 감지 빈도를 줄인다",
      ],
      answerIndex: 0,
      explanation:
        "multi-window burn-rate alert와 error budget remaining을 보고, fast burn이 열려 있으면 신규 배포 승인을 차단하고 customer impact sample을 붙여 완화 우선순위를 incident commander에게 넘긴다.",
    },
    {
      id: "q18",
      question:
        "rollback drill이 실제 장애 전에 검증해야 하는 것은?",
      choices: [
        "rollback 명령어를 팀원이 암기했는지",
        "권한, artifact, 데이터 호환성, 관측 지표, 승인 경로가 실제로 동작하는지",
        "배포 파이프라인의 평균 실행 시간",
        "artifact 저장소의 총 용량 사용률",
      ],
      answerIndex: 1,
      explanation:
        "rollback drill은 명령을 외우는 훈련이 아니라 권한, artifact, 데이터 호환성, 관측 지표, 승인 경로가 실제로 동작하는지 검증하는 절차다. drill이 없으면 권한 부재·artifact 만료·스키마 역호환 실패로 더 큰 장애를 만든다.",
    },
    {
      id: "q19",
      question:
        "rollback drill에서 명령은 성공했지만 데이터 migration이나 cache warming 때문에 사용자 지표가 회복되지 않는 상태의 후속 조치는?",
      choices: [
        "명령이 성공했으므로 drill을 통과로 기록한다",
        "cache를 전부 비활성화해 warming 단계를 제거한다",
        "drill에 데이터 호환성 체크와 warm-up 시간을 포함시킨다",
        "post-rollback SLI 확인 단계를 drill에서 삭제한다",
      ],
      answerIndex: 2,
      explanation:
        "명령은 성공했지만 데이터 migration이나 cache warming 때문에 사용자 지표가 회복되지 않는 위험 상태에서는 drill에 데이터 호환성 체크와 warm-up 시간을 포함시킨다.",
    },
    {
      id: "q20",
      question:
        "runbook maturity를 판정하는 올바른 기준은?",
      choices: [
        "runbook 문서가 존재하고 링크가 열리는지",
        "runbook의 총 페이지 수와 명령어 개수",
        "runbook을 마지막으로 연 사람이 누구인지",
        "새 온콜이 제한 시간 안에 판단, 명령 실행, 증거 확인, escalation을 재현할 수 있는지",
      ],
      answerIndex: 3,
      explanation:
        "runbook maturity는 문서 존재 여부가 아니라 새 온콜이 제한 시간 안에 판단, 명령 실행, 증거 확인, escalation을 재현할 수 있는지로 판정한다. 성숙한 runbook은 정상 샘플, 실패 샘플, 권한, 중단 기준, 복구 후 확인을 포함한다.",
    },
    {
      id: "q21",
      question:
        "운영 지도에서 초기 경계 설정이 틀렸다고 오판을 회수한 뒤 incident note에 남겨야 하는 것은?",
      choices: [
        "왜 처음 경계가 틀렸는지와 어떤 증거가 경계를 바꿨는지, 예를 들어 deploy marker와 신고 시각 불일치, 누락된 owner field, 수정된 dependency edge",
        "회수에 걸린 시간과 담당자 개인 평가 점수",
        "잘못 지목된 서비스의 전체 로그를 압축해 장기 보관한다는 기록",
        "다음 배포를 무기한 중단한다는 사내 공지",
      ],
      answerIndex: 0,
      explanation:
        "오판 회수 뒤에는 왜 처음 경계가 틀렸는지와 어떤 증거가 경계를 바꿨는지를 남긴다. deploy marker와 고객 신고 시각 불일치, 누락된 owner field, 수정된 dependency edge를 같은 incident note에 저장하고 후속 조치는 catalog 갱신과 알림 라우팅 검증이다.",
    },
    {
      id: "q22",
      question:
        "요청 경로에서 변경 승인을 멈춰야 하는 증거 조건은?",
      choices: [
        "curl timing 한 지점만 정상이면 나머지 hop은 확인하지 않아도 될 때",
        "curl timing, ALB access log, trace root span 중 최소 두 지점이 같은 request id나 시간대로 연결되지 않을 때",
        "trace root span이 하나라도 생성되면 무조건 승인 가능할 때",
        "WAF sampled request가 전혀 없어 자동으로 승인되는 때",
      ],
      answerIndex: 1,
      explanation:
        "curl timing, ALB access log, trace root span 중 최소 두 지점이 같은 request id나 시간대로 연결되지 않으면 변경 승인을 멈춘다. 증거가 끊기면 synthetic probe 추가와 WAF sampled request 보존이 다음 조치다.",
    },
    {
      id: "q23",
      question:
        "변경 경로 인계에서 change ticket 승인 범위와 deploy marker 실제 적용 범위를 맞출 때 판단 기준은?",
      choices: [
        "배포가 green으로 끝났으면 적용 범위는 확인하지 않는다",
        "배포 소요 시간이 승인 기록과 같은지",
        "region, tenant, schema version이 승인 기록과 일치하는지",
        "커밋 작성자와 승인자가 동일 인물인지",
      ],
      answerIndex: 2,
      explanation:
        "판단 기준은 region, tenant, schema version이 승인 기록과 일치하는지다. 불일치가 있으면 배포 성공이라고 넘기지 말고 feature flag 상태와 rollback artifact checksum을 함께 인계한다.",
    },
    {
      id: "q24",
      question:
        "복구 경로 즉시 완화에서 원인 확정 전에 먼저 봐야 하는 증거는?",
      choices: [
        "root cause 커밋과 관련 코드 리뷰 기록",
        "장기 아키텍처 개선 로드맵과 예산 산정",
        "전체 서비스의 CPU·메모리 평균 사용률",
        "SLO burn 속도와 customer impact counter",
      ],
      answerIndex: 3,
      explanation:
        "즉시 완화에서는 SLO burn 속도와 customer impact counter를 먼저 본다. burn이 계속 오르면 traffic shift나 read-only mode를 먼저 실행하고 실행 시각과 영향 감소율을 mitigation decision log에 남긴다.",
    },
    {
      id: "q25",
      question:
        "control plane 초기 분기에서 같은 시간대에 비교해야 하는 증거는?",
      choices: [
        "management API error log와 data plane request metric",
        "배포 파이프라인 실행 시간과 빌드 로그",
        "고객 청구서 항목과 사용량 리포트",
        "runbook 페이지 수와 명령어 개수",
      ],
      answerIndex: 0,
      explanation:
        "control plane 초기 분기에서는 management API error log와 data plane request metric을 같은 시간대에 비교한다. 관리 API만 실패하면 고객 공지보다 운영 완화 권한 확보를 먼저 하고 권한 실패 증거를 runbook permission check에 남긴다.",
    },
    {
      id: "q26",
      question:
        "data plane 되돌림 뒤에 따로 기록해야 하는 것은?",
      choices: [
        "control plane 배포 성공 여부만",
        "데이터 중복, 지연 처리, 유실 가능성과 rollback 시각, idempotency error sample, queue drain 시간",
        "전체 요청의 평균 latency 한 가지",
        "대시보드 색상이 초록으로 돌아왔는지 여부",
      ],
      answerIndex: 1,
      explanation:
        "되돌림 뒤에는 데이터 중복, 지연 처리, 유실 가능성을 따로 기록한다. 증거는 rollback 시각, idempotency error sample, queue drain 시간이고 보상 처리 필요 여부를 owner matrix에 배정한다.",
    },
    {
      id: "q27",
      question:
        "service catalog 검증 깊이에서 위험으로 봐야 하는 상태는?",
      choices: [
        "service tier, SLO, dependency reference, runbook link가 같은 운영 현실을 가리키는 상태",
        "owner timestamp가 최근 조직 변경 이후 갱신된 상태",
        "tier는 critical인데 runbook이 없거나, dependency는 있는데 downstream owner가 빠진 상태",
        "escalation policy에 primary와 backup이 모두 채워진 상태",
      ],
      answerIndex: 2,
      explanation:
        "위험은 tier는 critical인데 runbook이 없거나, dependency는 있는데 downstream owner가 빠진 상태다. 후속 조치는 catalog validation을 변경 승인 조건에 넣고 누락 항목을 배포 차단 신호로 쓰는 것이다.",
    },
    {
      id: "q28",
      question:
        "dependency map 즉시 완화에서 먼저 맞춰 보는 증거와 판단 기준은?",
      choices: [
        "각 서비스의 빌드 시간과 배포 성공률",
        "전체 대시보드가 초록으로 유지되는지 여부",
        "고객 청구서의 항목별 내역과 사용량",
        "dependency map diff와 runtime call graph를 맞추고, 실패 직전 새 edge가 생겼는지·기존 edge의 downstream SLO가 같이 타는지",
      ],
      answerIndex: 3,
      explanation:
        "dependency map diff와 runtime call graph를 먼저 맞춘다. 새 edge가 원인 후보이면 feature flag로 호출을 끊거나 fallback path로 우회하고 우회 전후 downstream error rate를 증거로 남긴다.",
    },
    {
      id: "q29",
      question:
        "owner matrix 초기 분기에서 가장 먼저 확인해야 하는 것은?",
      choices: [
        "on-call schedule과 owner matrix의 primary/backup이 실제 알림 수신자와 맞는지, 각 역할이 조치 권한까지 갖는지",
        "각 서비스의 코드 커버리지 목표 달성 여부",
        "장애 종료 후 고객 배상 금액 산정 결과",
        "매트릭스에 등록된 서비스의 총 개수",
      ],
      answerIndex: 0,
      explanation:
        "on-call schedule과 owner matrix의 primary/backup이 실제 알림 수신자와 맞는지 먼저 확인하고 각 역할이 조치 권한까지 갖는지를 본다. 빈칸이 있으면 incident commander가 임시 role assignment를 선언하고 matrix 수정 티켓을 남긴다.",
    },
    {
      id: "q30",
      question:
        "SLO burn 증상 연결에서 위험으로 봐야 하는 상태는?",
      choices: [
        "burn rate가 낮아지고 같은 기간 사용자 실패 샘플도 줄어드는 상태",
        "burn은 내려갔지만 특정 사용자군의 실패가 남거나 alert window가 너무 길어 감지가 늦은 상태",
        "error budget이 전혀 소진되지 않은 상태",
        "fast burn과 slow burn이 동시에 닫힌 상태",
      ],
      answerIndex: 1,
      explanation:
        "위험은 burn은 내려갔지만 특정 사용자군의 실패가 남거나 alert window가 너무 길어 감지가 늦은 상태다. 후속 조치는 SLI source와 window를 조정하고 변경 freeze 해제 조건을 숫자로 기록하는 것이다.",
    },
    {
      id: "q31",
      question:
        "rollback drill 인계 증거에서 가장 먼저 봐야 하는 것은?",
      choices: [
        "artifact 저장소의 총 용량 사용률",
        "rollback 명령어를 팀원이 암기했는지 여부",
        "최근 rollback drill log와 permission check output, 온콜이 같은 권한으로 같은 artifact로 복구할 수 있는지",
        "배포 파이프라인의 평균 실행 시간",
      ],
      answerIndex: 2,
      explanation:
        "최근 rollback drill log와 permission check output을 먼저 본다. 실패 기록이 있으면 인계 전에 대체 승인자와 artifact retention 상태를 확인하고 drill gap을 change risk로 표시한다.",
    },
    {
      id: "q32",
      question:
        "runbook에서 아직 검증되지 않은 절차를 다룰 때 올바른 방식은?",
      choices: [
        "문서에 적혀 있으면 검증된 것으로 간주한다",
        "미검증 절차를 runbook에서 즉시 삭제한다",
        "모든 절차를 동일하게 '검증됨'으로 표시한다",
        "실제 장애에서 쓴 절차, drill에서 검증한 절차, 아직 가정인 절차를 구분하고 미검증 절차를 다음 rollback drill에 넣는다",
      ],
      answerIndex: 3,
      explanation:
        "실제 장애에서 쓴 절차, drill에서 검증한 절차, 아직 가정인 절차를 구분한다. 다음 조치는 미검증 절차를 다음 rollback drill에 넣고 오래된 runbook에는 stale owner 알림을 연결하는 것이다.",
    },
  ],
};

export default quiz;
