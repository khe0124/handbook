// AWS·Azure 실전 시나리오 Q&A(operations-cloud-scenarios-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-cloud-scenarios-quiz",
  title: "AWS·Azure 실전 시나리오 퀴즈",
  sourceQaId: "operations-cloud-scenarios-qa",
  questions: [
    {
      id: "q1",
      question: "새 워크로드의 region을 사용자 latency만 보고 고르면 위험한 이유로 가장 정확한 것은?",
      choices: [
        "필요한 SKU가 없거나 quota 증설이 늦고, 법적 데이터 보관 위치가 어긋나며, provider regional event 때 대체 경로가 없다",
        "가장 가까운 region은 항상 다른 region보다 단가가 비싸 비용이 폭증한다",
        "가까운 region은 control plane API가 구조적으로 느려 배포가 실패한다",
        "latency가 낮은 region일수록 zone 수가 적어 multi-AZ를 구성할 수 없다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 가장 가까운 region만 고르면 필요한 SKU가 없거나 quota 증설이 늦고, 법적 보관 위치가 어긋나며, regional event 때 대체 경로가 없다고 설명한다. region 선택은 latency뿐 아니라 data residency, compliance, 서비스 제공 범위를 함께 보는 결정이다.",
    },
    {
      id: "q2",
      question: "후보 region을 줄일 때 첫 기준은 무엇인가?",
      choices: [
        "예상 월 비용이 가장 낮은 region",
        "사용자 위치별 p95 latency와 법적 데이터 위치를 먼저 묶는다",
        "가장 많은 관리형 서비스를 제공하는 region",
        "가장 최근에 개설된 최신 region",
      ],
      answerIndex: 1,
      explanation:
        "본문은 사용자 위치별 p95 latency와 법적 데이터 위치를 먼저 묶고, 그 다음 필요한 기능이 실제 제공되는지 확인한다고 한다. preview 상태이거나 quota가 부족하면 기본 후보가 아니라 예외 승인 대상으로 둔다.",
    },
    {
      id: "q3",
      question: "provider regional health가 빨간색일 때 옳은 판단은?",
      choices: [
        "health가 빨간색이면 즉시 모든 서비스 장애로 간주하고 전면 failover한다",
        "health 색만 믿고 사용자 synthetic은 확인하지 않아도 된다",
        "data plane이 계속 처리되는 서비스도 있으므로 synthetic·regional metric·API error를 맞춰 control plane 변경 실패인지 요청 실패인지 나눈다",
        "health가 빨간색이면 무조건 배포를 계속 진행해 복구를 앞당긴다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 provider health가 빨간색이어도 data plane이 계속 처리되거나 control plane만 지연되는 경우가 있다고 한다. synthetic, regional metric, API error를 같은 시간대로 맞춰 control plane 변경 실패인지 실제 요청 실패인지 나눠야 한다.",
    },
    {
      id: "q4",
      question: "multi-AZ 구성이 실제 zone 장애를 견디는지 설명할 때 핵심은?",
      choices: [
        "리소스를 여러 zone에 배치했다는 사실만 제시하면 충분하다",
        "compute를 여러 zone에 두면 NAT·writer 위치와 무관하게 zone 장애를 견딘다",
        "AZ 개수가 3개 이상이면 자동으로 zone 장애에 안전하다",
        "quorum·data locality·state replication·traffic routing·failover test가 zone 손실을 견디는지 증명하는 문제다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 multi-AZ가 배치 사실이 아니라 quorum, data locality, state replication, traffic routing, failover test가 zone 손실을 견디는지 증명하는 문제라고 한다. NAT·writer·quorum member가 한 zone에 몰리면 장애 반경은 여전히 단일 zone이다.",
    },
    {
      id: "q5",
      question: "zone failover test에서 통과와 실패를 가르는 기준으로 옳은 것은?",
      choices: [
        "장애 주입 뒤 traffic이 남은 zone으로 이동하고 write path가 허용된 RPO 안에서 이어지며 client retry가 connection reset을 회복하면 통과",
        "장애 주입 후에도 원래 zone의 writer가 그대로 유지되면 통과",
        "replication lag가 얼마든 커지더라도 traffic만 이동하면 통과",
        "connection pool이 이전 writer를 계속 붙잡고 있으면 통과",
      ],
      answerIndex: 0,
      explanation:
        "본문은 traffic이 남은 zone으로 이동하고 write path가 RPO 안에서 이어지며 client retry가 connection reset을 회복해야 통과라고 한다. replication lag가 커지거나 pool이 이전 writer를 붙잡으면 실패로 기록하고 pool TTL과 retry 정책을 고친다.",
    },
    {
      id: "q6",
      question: "service quota 확인은 어떤 작업인가?",
      choices: [
        "현재 사용률만 확인하면 되는 작업",
        "region별 limit, SKU/instance availability, burst policy, API throttling, 증설 lead time을 배포 계획에 넣는 일",
        "autoscaling만 켜면 자동으로 해결되는 문제",
        "테스트 계정에서 성공한 크기를 운영에 그대로 옮기면 되는 작업",
      ],
      answerIndex: 1,
      explanation:
        "본문은 quota 확인이 현재 사용률만 보는 게 아니라 region별 limit, SKU/instance availability, burst policy, API throttling, 증설 lead time을 배포 계획에 넣는 일이라고 한다. capacity 부족은 throttling·provisioning failure·delayed scale-out으로 나타난다.",
    },
    {
      id: "q7",
      question: "throttling과 quota exhaustion의 차이로 옳은 것은?",
      choices: [
        "throttling은 리소스 총량 한계, quota exhaustion은 API 호출률 한계다",
        "둘은 같은 현상이라 대응도 동일하다",
        "throttling은 API 호출률·control plane rate limit 때문이고, quota exhaustion은 생성 가능한 리소스 총량이나 SKU 한계에 닿은 상태다",
        "throttling은 retry로 못 풀고 quota exhaustion만 retry로 해결된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 throttling이 API 호출률이나 control plane rate limit 때문에 발생하고, quota exhaustion은 생성 가능한 리소스 총량이나 SKU 한계에 닿은 상태라고 한다. 조치도 retry tuning과 quota increase로 갈린다.",
    },
    {
      id: "q8",
      question: "managed DB failover가 완료 표시된 뒤에도 오류가 계속 남는 대표 원인은?",
      choices: [
        "writer 전환이 실제로는 일어나지 않기 때문",
        "provider가 failover 완료를 표시하면 애플리케이션 오류도 자동으로 사라지기 때문",
        "managed DB는 원래 failover 후 오류가 남지 않기 때문",
        "애플리케이션 pool이 이전 endpoint를 붙잡거나 DNS TTL이 길어 이전 writer로 계속 연결하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 provider가 failover 완료를 표시해도 애플리케이션 pool이 이전 endpoint를 붙잡거나 DNS TTL이 길면 오류가 계속된다고 한다. replica lag가 큰 상태에서 read endpoint를 열면 stale read나 lost update처럼 보이는 장애도 생긴다.",
    },
    {
      id: "q9",
      question: "replica lag가 RPO나 read-after-write 요구를 넘을 때 옳은 조치는?",
      choices: [
        "read replica로 트래픽을 돌리면 안 되며, 일시적으로 read를 primary로 모으거나 쓰기 기능을 제한한다",
        "lag가 커질수록 read replica로 더 많은 트래픽을 보내 부하를 분산한다",
        "lag는 성능 지표일 뿐이므로 failover 의사결정과 무관하다",
        "read endpoint를 즉시 열어 stale read를 감수하고 처리량을 높인다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 lag가 RPO나 read-after-write 요구를 넘으면 read replica로 트래픽을 돌리면 안 된다고 한다. lag metric·LSN 위치·stale sample을 증거로 두고 일시적으로 read를 primary로 모으거나 쓰기 기능을 제한한다.",
    },
    {
      id: "q10",
      question: "object storage에서 403 오류가 났을 때 첫 조치로 옳은 것은?",
      choices: [
        "우선 policy를 넓게 열어 읽기 실패부터 해결한다",
        "principal·action·resource·condition·encryption key 권한을 audit log와 policy simulator로 맞추고, block이 막은 요청이면 호출 주체나 endpoint 경로를 고친다",
        "bucket을 public으로 전환해 접근을 보장한다",
        "KMS 키 권한은 무시하고 network condition만 확인한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 403이 나면 먼저 principal, action, resource, condition, encryption key 권한을 audit log와 policy simulator로 맞추라고 한다. public block이나 network condition이 막은 요청이면 policy 확대가 아니라 호출 주체나 endpoint 경로를 고쳐야 한다.",
    },
    {
      id: "q11",
      question: "object storage에서 versioning과 lifecycle이 장애 대응에 중요한 이유는?",
      choices: [
        "저장 비용을 줄이는 것이 유일한 목적이라서",
        "public access 차단을 대신하는 보안 기능이라서",
        "잘못된 삭제나 overwrite의 복구 가능 여부가 versioning과 retention에 달려 있고, lifecycle이 너무 짧으면 복구 후보가 이미 삭제되기 때문",
        "replication 지연을 자동으로 없애 주기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 잘못된 삭제나 overwrite의 복구 가능 여부가 versioning과 retention에 달려 있다고 한다. lifecycle rule이 너무 짧으면 복구 후보가 이미 삭제되고, legal hold가 있으면 삭제 요청이 실패한다. 증거는 object version, delete marker, lifecycle transition log다.",
    },
    {
      id: "q12",
      question: "load balancer path 장애를 좁힐 때 핵심 관점으로 옳은 것은?",
      choices: [
        "평균 5xx 비율만 보면 원인을 특정할 수 있다",
        "어떤 hop에서 요청이 멈췄는지, 즉 listener·probe·target 중 어디서 갈리는지가 핵심이다",
        "무조건 backend target을 재시작하면 대부분 해결된다",
        "L4와 L7 load balancer는 같은 증거로 동일하게 처리하면 된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 평균 5xx가 아니라 어떤 hop에서 요청이 멈췄는지가 핵심이며, client TLS/SNI·listener rule·health probe·target registration·drain·backend protocol을 순서대로 좁혀야 한다고 한다. health probe가 앱 readiness와 다르면 죽은 target이 계속 traffic을 받는다.",
    },
    {
      id: "q13",
      question: "health probe는 정상인데 사용자만 실패할 때 먼저 의심할 것은?",
      choices: [
        "probe path가 너무 얕거나 probe source만 허용된 경우",
        "load balancer 하드웨어의 물리적 고장",
        "client의 DNS 캐시가 만료된 경우",
        "target 개수가 홀수인 경우",
      ],
      answerIndex: 0,
      explanation:
        "본문은 probe path가 너무 얕거나 probe source만 허용된 경우를 보라고 한다. 실제 user path의 auth·DB·downstream·TLS backend validation을 synthetic으로 재현하고, probe 기준을 readiness 의미에 맞게 바꾸거나 target을 수동 drain한다.",
    },
    {
      id: "q14",
      question: "autoscaling이 가용성을 높이는 대신 오히려 문제가 되는 경우로 옳은 것은?",
      choices: [
        "min capacity가 높으면 cold start가 사라져 항상 이득이다",
        "scale-out이 늦으면 availability가 깨지고, scale-in이 빠르면 flap이 생기며, max가 너무 높으면 비용과 downstream pressure가 폭증한다",
        "CPU 평균만 보고 scaling하면 모든 병목을 정확히 포착한다",
        "cooldown이 짧을수록 안정적으로 수렴한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 scale-out이 늦으면 availability가 깨지고 scale-in이 빠르면 flap, max가 너무 높으면 비용과 downstream pressure가 폭증한다고 한다. CPU 평균만 보면 queue backlog·cold start·dependency saturation을 놓친다.",
    },
    {
      id: "q15",
      question: "cost anomaly를 처음 받았을 때 본문이 권하는 분해 방식은?",
      choices: [
        "총액만 보고 트래픽 증가인지 판단한다",
        "비용은 장애가 아니므로 별도 조사 없이 넘긴다",
        "서비스·region·SKU·usage quantity·unit price·tag owner·변경 시각으로 나눠 usage 증가인지 단가 변경인지 가른다",
        "가장 비싼 리소스를 먼저 무조건 정지한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 서비스·region·SKU·usage quantity·unit price·tag owner·변경 시각으로 나눠 usage가 늘었는지 price가 바뀌었는지 확인하라고 한다. usage 증가면 autoscaling·retry storm·log ingestion을, price 변경이면 tier·region 이동·예약 인스턴스 적용 실패를 본다.",
    },
    {
      id: "q16",
      question: "emergency cost guardrail을 자동화할 때 옳은 경계는?",
      choices: [
        "production data plane도 비용 급증 시 즉시 자동 차단하는 것이 안전하다",
        "non-prod·untagged·idle resource는 자동 정지 후보가 되지만, production data plane은 자동 차단보다 rate limit·sampling 축소·owner approval이 필요하다",
        "guardrail은 예외 조건이나 되돌림 명령 없이 단순하게 두는 편이 낫다",
        "tag가 없는 리소스는 무조건 고객 영향이 없으므로 즉시 삭제한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 non-prod·untagged·idle resource는 자동 정지 후보가 될 수 있지만 production data plane은 자동 차단보다 rate limit·sampling 축소·owner approval이 필요하다고 한다. guardrail에는 예외 조건, 알림 대상, 되돌림 명령을 같이 둔다.",
    },
    {
      id: "q17",
      question: "IAM/managed identity 문제에서 wildcard 권한으로 403을 빨리 푸는 방식의 문제는?",
      choices: [
        "incident 완화가 장기 보안 부채가 되므로, action·resource·condition을 제한해 최소 권한으로 다뤄야 한다",
        "wildcard 권한은 즉시 성능을 떨어뜨리기 때문",
        "wildcard는 token 발급 자체를 막아 오히려 접근이 더 실패하기 때문",
        "wildcard 권한은 managed identity에서 문법적으로 허용되지 않기 때문",
      ],
      answerIndex: 0,
      explanation:
        "본문은 403을 빨리 풀려고 wildcard 권한을 주면 incident 완화가 장기 보안 부채가 된다고 한다. trust policy나 condition mismatch를 보지 않으면 올바른 권한을 줘도 assume role이나 token exchange 단계에서 계속 실패한다.",
    },
    {
      id: "q18",
      question: "managed identity 장애를 애플리케이션 문제와 구분하는 기준으로 옳은 것은?",
      choices: [
        "token 유무와 무관하게 항상 애플리케이션 코드 문제로 본다",
        "metadata endpoint·token 로그를 볼 필요 없이 role assignment만 확인하면 된다",
        "token이 없으면 애플리케이션 문제, token이 있으면 identity binding 문제다",
        "token이 없으면 identity binding 문제이고, token은 있는데 호출이 실패하면 policy 또는 resource condition 문제다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 metadata endpoint reachability·token acquisition log·audience/scope·role assignment propagation을 확인하라고 한다. token이 없으면 identity binding 문제이고, token은 있는데 호출이 실패하면 policy 또는 resource condition 문제다.",
    },
    {
      id: "q19",
      question: "cloud audit log를 켰다는 사실만 말할 때의 위험으로 옳은 것은?",
      choices: [
        "control plane 이벤트가 중복 기록돼 저장 비용만 늘어난다",
        "audit log는 data plane 이벤트를 자동 포함하므로 위험이 없다",
        "장애 시 변경자를 못 찾거나 로그가 너무 짧게 보관되고, 같은 계정에서 로그가 삭제되면 증거 가치가 떨어진다",
        "control plane 로그는 delivery delay가 전혀 없어 항상 실시간이다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 audit log를 켰다는 사실만으로는 장애 시 변경자를 못 찾거나 로그가 짧게 보관될 수 있다고 한다. 공격자가 같은 계정에서 로그를 지울 수 있으면 증거 가치가 떨어지고, data plane 이벤트가 빠지면 객체 접근이나 key 사용을 놓친다.",
    },
    {
      id: "q20",
      question: "control plane API는 느린데 기존 data plane이 살아 있을 때 피해야 할 조치는?",
      choices: [
        "새 리소스 생성·scale-in·redeploy·failover처럼 control plane 호출이 많은 작업",
        "변경 동결과 customer communication",
        "support case escalation",
        "synthetic과 business metric으로 트래픽 처리 여부 확인",
      ],
      answerIndex: 0,
      explanation:
        "본문은 data plane이 살아 있으면 새 리소스 생성·scale-in·redeploy·failover처럼 control plane 호출이 많은 작업을 멈추라고 한다. 대신 변경 동결, customer communication, support case escalation으로 대응한다.",
    },
    {
      id: "q21",
      question: "provider outage 상황에서 support case에 반드시 넣어야 하는 정보로 옳은 것은?",
      choices: [
        "담당 엔지니어의 개인 연락처와 팀 조직도",
        "region·service·account/subscription·request id·error code·first seen time·reproduction command·user impact·attempted mitigation",
        "회사 내부 비용 예산과 계약 금액",
        "과거 블로그 글과 개인 경험담",
      ],
      answerIndex: 1,
      explanation:
        "본문은 support case에 region, service, account/subscription, request id, error code, first seen time, reproduction command, user impact, attempted mitigation을 넣으라고 한다. provider가 확인할 request id가 없으면 일반 문의가 되어 대응 시간이 길어진다.",
    },
    {
      id: "q22",
      question: "managed service를 쓰면 '운영이 사라진다'는 생각의 문제로 옳은 것은?",
      choices: [
        "managed service는 커스터마이징이 자유로워 lock-in이 전혀 없다는 점을 놓친다",
        "self-managed보다 항상 비싸다는 점을 놓친다",
        "capacity·IAM·cost·observability·failover test가 여전히 사용자 몫이라는 점을 놓친다",
        "managed service는 patch·backup·failover까지 사용자가 직접 해야 한다는 점을 놓친다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 managed service를 쓰면 운영이 사라진다고 말하면 capacity·IAM·cost·observability·failover test가 빠진다고 한다. managed service는 patching·HA·backup·failover 일부를 provider에 맡길 뿐 quota·lock-in·regional availability 제약을 받는다.",
    },
    {
      id: "q23",
      question: "본문에서 lock-in을 다루는 관점으로 옳은 것은?",
      choices: [
        "lock-in은 그 자체가 위험이므로 무조건 피해야 한다",
        "lock-in을 허용하면 exit plan은 남길 필요가 없다",
        "lock-in은 SLO나 출시 속도와 무관한 순수 기술 선택이다",
        "lock-in은 위험이 아니라 비용과 회수 조건이 있는 선택이며, 이득이 크면 허용하되 data export·schema portability·exit drill을 미리 남긴다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 lock-in이 위험이 아니라 비용과 회수 조건이 있는 선택이라고 한다. SLO·운영 인력·출시 속도가 managed service 이득을 크게 만들면 허용할 수 있지만 data export, schema portability, authentication boundary, exit drill은 미리 남겨야 한다.",
    },
    {
      id: "q24",
      question: "region 선택 결정 기록(decision record)에 남겨야 할 내용으로 옳은 것은?",
      choices: [
        "최종 선택한 region 이름 하나만 남기면 충분하다",
        "월 비용 추정치와 담당자 이름만 남긴다",
        "provider가 자동 생성하는 health 대시보드 링크만 붙인다",
        "선택·탈락 region, latency 샘플, 규제 요구, 미제공 서비스, quota 증설 티켓, 대체 region 조건을 남겨 장애 시 failover 후보와 금지된 데이터 이동 경로를 함께 알 수 있게 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 결정 기록에 선택 region, 탈락 region, latency 샘플, 규제 요구, 미제공 서비스, quota 증설 티켓, 대체 region 조건을 남기라고 한다. 나중에 장애가 나면 이 기록이 traffic failover 후보와 금지된 데이터 이동 경로를 동시에 알려 준다.",
    },
    {
      id: "q25",
      question: "zone redundancy를 리뷰할 때 가장 먼저 그려야 하는 것은?",
      choices: [
        "compute instance 개수만 세어 zone당 균등한지 확인하는 표",
        "가장 비싼 리소스부터 다른 region으로 옮기는 계획",
        "provider SLA 문서의 zone 개수 보장치 요약",
        "요청 경로·state 저장소·outbound NAT·private endpoint·queue·monitoring agent를 zone별로 배치한 표를 만들어 한 zone 장애 시 남은 zone이 quorum과 min capacity를 만족하는지 본다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 요청 경로, state 저장소, outbound NAT, private endpoint, queue, monitoring agent를 zone별로 배치한 표를 먼저 만들라고 한다. 한 zone 장애 시 남은 zone 수가 quorum과 min capacity를 만족하지 못하면 redundancy가 아니라 분산 배치에 그친 상태다.",
    },
    {
      id: "q26",
      question: "zone 구성에서 data locality를 별도로 언급하는 이유로 옳은 것은?",
      choices: [
        "zone 간 traffic은 항상 무료라 비용과 무관하기 때문",
        "data locality는 보안 정책이라 가용성과는 관련이 없기 때문",
        "cross-zone 접근은 모든 storage에서 동일한 장애 모드를 갖기 때문",
        "zone을 넘는 read/write가 늘면 지연·전송 비용이 커지고 일부 storage·cache는 zone 밖 접근에서 장애 모드가 달라지므로, replica 위치·cross-zone traffic·quorum membership을 보고 위험하면 shard placement나 read preference를 조정하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 zone을 넘는 read/write가 늘면 지연 시간과 전송 비용이 증가하고 일부 storage나 cache는 zone 밖 접근에서 장애 모드가 달라진다고 한다. locality evidence는 replica 위치·cross-zone traffic·quorum membership이며, 위험하면 shard placement나 read preference를 먼저 조정한다.",
    },
    {
      id: "q27",
      question: "quota 위험을 배포 승인 자리에서 어떤 숫자로 말해야 하는가?",
      choices: [
        "현재 사용량·배포 후 예상 사용량·burst 순간값·region별 limit·증설 요청 SLA를 함께 말하고, max가 limit의 80%를 넘고 증설 lead time이 배포일보다 길면 capacity plan을 먼저 고친다",
        "현재 사용률 한 가지만 백분율로 말하면 충분하다",
        "quota는 provider가 관리하므로 숫자를 제시할 필요가 없다",
        "배포 당일의 순간 peak 값 하나만 근거로 증설을 요청한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 현재 사용량, 배포 후 예상 사용량, burst 순간값, region별 limit, 증설 요청 SLA를 같이 말하라고 한다. max capacity가 limit의 80%를 넘고 증설 lead time이 배포일보다 길면 배포 승인이 아니라 capacity plan 수정이 먼저다.",
    },
    {
      id: "q28",
      question: "quota 증설이 늦을 때 검토하는 우회책으로 옳은 것은?",
      choices: [
        "우회 없이 증설 승인이 날 때까지 배포를 무기한 대기한다",
        "traffic shaping·batch concurrency 축소·다른 instance family·pre-warmed pool·capacity reservation·대체 region을 순서대로 검토하되, 임시 우회에는 만료 시각과 owner를 붙이고 승인 뒤 원래 capacity model로 되돌린다",
        "가장 큰 instance family로 한 번에 교체해 여유를 확보하고 그대로 둔다",
        "quota와 무관하게 autoscaling max만 크게 올리면 해결된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 traffic shaping, batch concurrency 축소, 다른 instance family, pre-warmed pool, capacity reservation, 대체 region을 순서대로 검토한다고 한다. 비용과 가용성 tradeoff가 크므로 임시 우회에는 만료 시각과 owner를 붙이고, 증설 승인 뒤 원래 capacity model로 되돌린다.",
    },
    {
      id: "q29",
      question: "managed DB failover 완료 신호는 어디서 확인해야 하는가?",
      choices: [
        "provider console event가 완료로 표시되면 사용자 경로도 복구된 것으로 본다",
        "애플리케이션 로그만 보고 provider event는 확인하지 않는다",
        "provider event·cluster role·writer endpoint·application connection target을 모두 보고, console이 완료여도 app log에 이전 writer IP나 connection refused가 있으면 pool recycle·DNS cache flush·retry window 연장으로 대응한다",
        "writer endpoint 하나만 확인하면 나머지는 자동으로 일치한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 provider event, cluster role, writer endpoint, application connection target을 모두 보라고 한다. console event만 완료여도 app log에 이전 writer IP나 connection refused가 남으면 사용자 경로는 아직 복구 전이고, 다음 조치는 pool recycle, DNS cache flush, retry window 연장이다.",
    },
    {
      id: "q30",
      question: "connection pool 설정이 managed DB 장애 답변에 반드시 들어가는 이유는?",
      choices: [
        "pool 설정은 성능 튜닝일 뿐 failover 복구 시간과는 무관하기 때문",
        "pool은 provider가 관리하므로 애플리케이션이 손댈 수 없기 때문",
        "pool 크기만 늘리면 endpoint 전환 문제가 사라지기 때문",
        "pool max lifetime·validation query·retry backoff가 endpoint 전환 시간을 결정하고, 오래된 socket을 재사용하면 DB가 정상이어도 앱이 계속 5xx를 내기 때문",
      ],
      answerIndex: 3,
      explanation:
        "본문은 pool max lifetime, validation query, retry backoff가 endpoint 전환 시간을 결정한다고 한다. pool이 오래된 socket을 재사용하면 DB는 정상이어도 앱은 계속 5xx를 내므로, incident 기록에는 pool recycle 시각, 오류율 변화, 최종 endpoint 확인 결과를 남긴다.",
    },
    {
      id: "q31",
      question: "object storage replication 문제를 사용자 영향으로 연결하는 방식으로 옳은 것은?",
      choices: [
        "primary 쓰기는 성공해도 replica 읽기가 지연되면 DR·CDN origin·analytics job이 stale data를 볼 수 있으므로, replication backlog·failed object count·destination policy denial을 보고 primary origin 읽기나 배치 중단을 결정한다",
        "replication은 백그라운드 작업이라 사용자 경로에 영향을 주지 않는다",
        "replica 지연이 있으면 즉시 primary와 replica를 모두 중지한다",
        "replication backlog가 커지면 destination policy를 넓게 열어 해결한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 primary region 쓰기가 성공해도 replica region 읽기가 지연되면 DR, CDN origin, analytics job이 stale data를 볼 수 있다고 한다. replication backlog, failed object count, destination policy denial을 보고 임시로 primary origin으로 읽게 할지 배치 작업을 멈출지 결정한다.",
    },
    {
      id: "q32",
      question: "L7과 L4 load balancer를 구분해서 답해야 하는 이유로 옳은 것은?",
      choices: [
        "둘은 같은 증거를 쓰므로 502와 SYN timeout을 동일하게 처리하면 된다",
        "L7은 host/path rule·HTTP status·header·WAF를 보고 L4는 TCP 흐름·port·target health·connection reset을 보므로, 502 원인과 SYN timeout 원인을 같은 방식으로 처리하면 안 된다",
        "L4가 상위 계층이라 HTTP header까지 항상 함께 검사한다",
        "L7은 TCP reset만, L4는 HTTP status만 보면 된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 L7 load balancer가 host/path rule, HTTP status, header, WAF 연결을 보고 L4 load balancer는 TCP 흐름, port, target health, connection reset을 본다고 한다. 증거가 다르기 때문에 502 원인과 SYN timeout 원인을 같은 방식으로 처리하면 안 된다.",
    },
    {
      id: "q33",
      question: "scale-out 지연은 어떻게 증명하는가?",
      choices: [
        "CPU 평균 그래프 하나로 scale-out이 늦었다고 단정한다",
        "instance ready 시각만 보면 지연 원인을 특정할 수 있다",
        "부하 증가 시각·metric 집계 지연·alarm firing·instance/pod ready 시각·traffic 회복 시각을 한 타임라인에 두고, ready보다 오류가 먼저 줄면 다른 완화가 효과를 낸 것으로, ready가 늦으면 warm pool이나 예측 scaling을 검토한다",
        "scale-out 지연은 provider 책임이라 증명할 필요가 없다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 부하 증가 시각, metric 집계 지연, alarm firing, instance 또는 pod ready 시각, traffic 회복 시각을 한 타임라인에 두라고 한다. ready 시각보다 오류가 먼저 줄지 않으면 다른 완화가 효과를 낸 것이고, ready가 늦으면 warm pool이나 예측 scaling을 검토한다.",
    },
  ],
};

export default quiz;
