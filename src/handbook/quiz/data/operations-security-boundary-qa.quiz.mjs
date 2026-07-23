// 보안 경계 Q&A(operations-security-boundary-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-security-boundary-quiz",
  title: "보안 경계 퀴즈",
  sourceQaId: "operations-security-boundary-qa",
  questions: [
    {
      id: "q1",
      question:
        "public ingress exposure를 판단할 때 첫 보안 경계로 봐야 하는 표면은?",
      choices: [
        "DNS record, CDN origin policy, load balancer listener, public subnet route가 만나는 ingress 표면",
        "애플리케이션 코드의 인증 미들웨어와 세션 검증 로직",
        "데이터베이스의 row-level security와 컬럼 암호화 설정",
        "컨테이너 이미지의 취약점 스캔 결과와 base image 버전",
      ],
      answerIndex: 0,
      explanation:
        "본문은 첫 보안 경계를 DNS record, CDN origin policy, load balancer listener, public subnet route가 만나는 ingress 표면으로 정의한다. 인터넷 요청이 의도한 edge까지만 열렸는지 이 지점에서 가른다.",
    },
    {
      id: "q2",
      question:
        "public ingress 초기 분기에서 가장 먼저 봐야 하는 증거는?",
      choices: [
        "origin 서버의 애플리케이션 에러 로그",
        "외부에서 같은 host와 path를 호출한 synthetic probe",
        "데이터베이스 slow query 로그",
        "컨테이너 오케스트레이터의 pod 재시작 이벤트",
      ],
      answerIndex: 1,
      explanation:
        "본문은 초기 분기에서 외부 synthetic probe를 먼저 본다고 한다. WAF request id와 ALB access log가 모두 없으면 앞단(DNS/CDN/WAF)에서 멈춘 것이고, ALB엔 있는데 app log가 없으면 listener rule이나 target boundary가 의심된다.",
    },
    {
      id: "q3",
      question:
        "app 로그가 비어 있을 때 흔히 저지르는 오판은?",
      choices: [
        "곧바로 origin 서버를 재시작해 로그를 초기화한다",
        "WAF rule을 모두 count mode로 되돌려 트래픽을 통과시킨다",
        "로그가 비었다는 이유로 내부 장애로 돌려, edge에서 버려졌거나 차단됐어야 할 요청이 origin까지 도달한 노출을 놓친다",
        "DNS record를 삭제해 외부 접근을 전면 차단한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 app 로그가 비어 있다는 이유만으로 내부 장애로 돌리면 실제로는 edge에서 버려졌거나 차단돼야 할 요청이 origin까지 도달한 노출을 놓친다고 경고한다.",
    },
    {
      id: "q4",
      question:
        "CDN/WAF edge rule 변경을 승인하는 기준으로 옳은 것은?",
      choices: [
        "새 rule이 공격 traffic만 줄이고 정상 traffic을 차단하지 않으며 즉시 되돌릴 수 있는지",
        "새 rule이 전체 요청 지연시간을 10% 이상 낮추는지",
        "새 rule이 origin 서버의 CPU 사용률을 떨어뜨리는지",
        "새 rule이 CDN 캐시 적중률을 높이는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 새 edge rule이 공격 traffic만 줄이고 정상 traffic을 차단하지 않는지, 그리고 즉시 되돌릴 수 있는지를 승인 기준으로 든다.",
    },
    {
      id: "q5",
      question:
        "WAF managed rule을 다룰 때의 대표적 실패 모드는?",
      choices: [
        "rule priority를 항상 최하위로 두어 아무 트래픽도 걸리지 않는 것",
        "managed rule을 count 없이 block으로 바로 올려 특정 client, region, API method만 차단하는 것",
        "canary header를 정상 요청에만 붙여 공격 sample을 놓치는 것",
        "CDN behavior와 WAF scope를 동일 계정에 두는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 managed rule을 count 없이 block으로 바로 올려 특정 client, region, API method만 차단하는 것을 실패 모드로 든다. edge 차단 요청은 origin 로그에 남지 않아 피해를 늦게 찾는다.",
    },
    {
      id: "q6",
      question:
        "WAF rule을 되돌린 뒤에도 일부 POP에서 계속 차단되는 원인은?",
      choices: [
        "origin 서버의 connection pool이 고갈된 것",
        "rule diff를 change record에 남기지 않은 것",
        "Flow Logs의 REJECT tuple이 누락된 것",
        "CDN cache나 edge 전파 지연을 확인하지 않은 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 rule을 되돌렸지만 CDN cache나 edge 전파 지연을 확인하지 않아 일부 POP에서 계속 차단되는 것을 실패 모드로 든다. POP별 probe와 WAF metric alarm을 함께 닫아야 한다.",
    },
    {
      id: "q7",
      question:
        "Security Group boundary를 인수할 때 가장 먼저 봐야 하는 증거는?",
      choices: [
        "문서에 적힌 group 이름과 설명",
        "실제 ENI에 붙은 group id와 rule diff",
        "인스턴스의 OS 방화벽(iptables) 설정",
        "load balancer의 health check 응답 코드",
      ],
      answerIndex: 1,
      explanation:
        "본문은 인계 증거를 실제 ENI에 붙은 group id와 rule diff부터 본다고 한다. 이름이 비슷한 group을 보고 인수하면 실제 workload에 붙은 ENI rule과 문서가 갈라진다.",
    },
    {
      id: "q8",
      question:
        "Security Group에서 신뢰 경계를 흐리는 위험 신호는?",
      choices: [
        "허용 source가 호출자 workload의 group id로 좁혀진 rule",
        "port가 서비스 계약과 정확히 맞는 inbound rule",
        "목적별로 쪼개진 여러 개의 좁은 group",
        "CIDR로 넓게 연 임시 inbound rule이나 0.0.0.0/0 outbound rule",
      ],
      answerIndex: 3,
      explanation:
        "본문은 CIDR로 넓게 연 임시 inbound rule이나 0.0.0.0/0 outbound rule이 서비스 간 신뢰 경계를 흐린다고 한다. 위험이면 목적별 group으로 쪼개고 TTL 없는 예외를 제거한다.",
    },
    {
      id: "q9",
      question:
        "NACL boundary 장애에서 연결이 무작위 timeout으로 보이는 전형적 원인은?",
      choices: [
        "Security Group의 stateful rule이 응답을 자동 허용한 것",
        "subnet에 route table이 아예 연결되지 않은 것",
        "DNS resolution이 새 ASN으로 바뀐 것",
        "inbound만 열고 return path의 ephemeral port를 막은 것",
      ],
      answerIndex: 3,
      explanation:
        "NACL은 stateless라 요청·응답 방향을 모두 허용해야 한다. 본문은 inbound만 열고 return path의 ephemeral port를 막아 연결이 무작위 timeout으로 보이는 것을 실패 모드로 든다.",
    },
    {
      id: "q10",
      question:
        "runbook에서 Security Group과 NACL의 역할을 나누는 올바른 기준은?",
      choices: [
        "SG는 subnet guardrail, NACL은 workload peer로 나눈다",
        "SG는 workload peer, NACL은 subnet guardrail로 나눈다",
        "SG와 NACL 모두 workload peer 단위로만 관리한다",
        "SG와 NACL을 한 원인으로 묶어 동일 rule을 함께 연다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 runbook에 SG는 workload peer, NACL은 subnet guardrail로 나눠 evidence query를 저장하라고 한다. 두 계층을 한 원인처럼 적으면 다음 담당자가 같은 rule을 중복으로 연다.",
    },
    {
      id: "q11",
      question:
        "IAM role을 assume하지 못하는 장애에서 가장 먼저 볼 증거는?",
      choices: [
        "role에 붙은 identity permission policy의 action 목록",
        "인스턴스 프로파일의 메타데이터 endpoint 응답",
        "CloudTrail의 AssumeRole 실패 event",
        "role last used timestamp의 갱신 여부",
      ],
      answerIndex: 2,
      explanation:
        "본문은 CloudTrail의 AssumeRole 실패 event를 먼저 본다고 한다. AccessDenied가 trust policy principal이나 condition mismatch를 가리키면 permission policy 추가로는 해결되지 않는다.",
    },
    {
      id: "q12",
      question:
        "IAM role trust policy 장애 대응에서 피해야 할 처리는?",
      choices: [
        "trust policy를 * principal로 열어 장애는 풀되 cross-account assume 경계를 무너뜨리는 것",
        "요청 principal ARN과 external id를 trust policy diff와 나란히 두는 것",
        "trust를 좁힌 뒤 실패 client만 별도 역할로 분리하는 것",
        "CI에서 trust diff에 Access Analyzer check를 붙이는 것",
      ],
      answerIndex: 0,
      explanation:
        "본문은 trust를 * principal로 열면 장애는 풀려도 cross-account assume 경계가 무너진다고 경고한다. identity permission만 넓혀 trust condition mismatch를 방치하는 것도 실패 모드다.",
    },
    {
      id: "q13",
      question:
        "least privilege permission diff 리뷰에서 장애 대응 중 저지르기 쉬운 실패 모드는?",
      choices: [
        "필요한 API call만 성공하도록 좁혀 배포하는 것",
        "denied event를 use case matrix와 함께 붙이는 것",
        "Action: * 또는 Resource: *를 넣고 제거 owner를 두지 않는 것",
        "임시 정책에 만료 시각과 회수 owner를 붙이는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 장애 대응 중 Action: * 또는 Resource: *를 넣고 제거 owner를 두지 않는 것을 실패 모드로 든다. 반대로 권한을 줄일 때 rare action을 놓치면 야간 작업이 실패한다.",
    },
    {
      id: "q14",
      question:
        "secret rotation cutover가 완료됐다고 판단하는 시점은?",
      choices: [
        "저장소의 secret 값이 새 값으로 교체된 시점",
        "새 secret이 모든 consumer에서 사용되고 이전 secret이 더 이상 인증에 성공하지 않는 시점",
        "secret version stage가 current로 라벨링된 시점",
        "rollback용 이전 secret을 백업 저장소에 보관한 시점",
      ],
      answerIndex: 1,
      explanation:
        "본문은 새 secret이 모든 consumer에서 사용되고 이전 secret이 더 이상 인증에 성공하지 않는 시점을 cutover 완료로 본다. 새 version이 current여도 client가 이전 credential을 계속 쓰면 끝난 게 아니다.",
    },
    {
      id: "q15",
      question:
        "secret rotation에서 침해 반경이 줄지 않는 실패 모드는?",
      choices: [
        "dual-read 기간에 이전 secret이 계속 성공하는 것",
        "새 version으로 모든 consumer가 인증에 성공하는 것",
        "old credential use detector를 일정 기간 유지하는 것",
        "consumer cache TTL을 rotation runbook에 명시하는 것",
      ],
      answerIndex: 0,
      explanation:
        "본문은 dual-read 기간에 이전 secret이 계속 성공해 침해 반경이 줄지 않는 것을 실패 모드로 든다. 저장소 값만 교체하고 consumer restart, cache TTL, connection pool 재연결을 확인하지 않으면 오래된 값을 쓴다.",
    },
    {
      id: "q16",
      question:
        "privileged admin access를 허용할 때 갖춰야 할 보안 메커니즘은?",
      choices: [
        "shared admin 계정과 장시간 지속 session",
        "break-glass role, MFA condition, just-in-time approval, session recording",
        "일반 운영 role에 incident-only action을 상시 부여",
        "ticket 없이 즉시 승격 가능한 escalation 경로",
      ],
      answerIndex: 1,
      explanation:
        "본문은 첫 보안 메커니즘으로 break-glass role, MFA condition, just-in-time approval, session recording을 든다. 완화 후 남은 admin session이나 임시 role assignment가 상시 권한처럼 쓰이는 것이 실패 모드다.",
    },
    {
      id: "q17",
      question:
        "장애 회피를 위해 broad outbound를 열 때 함께 열리는 위험 경로는?",
      choices: [
        "inbound admin endpoint 노출 경로",
        "internal service 간 lateral movement 경로",
        "container escape 경로",
        "data exfil path",
      ],
      answerIndex: 3,
      explanation:
        "본문은 장애 회피를 위해 broad outbound를 열면 외부 API 호출은 복구되지만 data exfil path도 같이 열린다고 한다. IP allowlist만 보고 DNS CNAME 변경이나 SaaS endpoint 확장을 놓치면 실제 destination을 확인하지 못한다.",
    },
    {
      id: "q18",
      question:
        "SIEM dashboard가 초록색이어도 감사 증거로 부족할 수 있는 이유는?",
      choices: [
        "원본 trail delivery와 integrity validation이 깨져 있을 수 있어서",
        "SIEM은 management event만 수집하고 data event는 못 봐서",
        "dashboard 색상은 retention lock과 무관해서",
        "SIEM ingestion은 항상 원본보다 빠르게 도착해서",
      ],
      answerIndex: 0,
      explanation:
        "본문은 SIEM dashboard가 초록색이어도 원본 trail delivery와 integrity validation이 깨져 있으면 감사 증거로 부족하다고 한다. 로그 수집이 꺼진 region이나 management event 누락이 대표 실패 모드다.",
    },
    {
      id: "q19",
      question:
        "threat model boundary를 다시 그려야 하는 변화로 옳은 것은?",
      choices: [
        "기존 API의 응답 지연시간이 증가했을 때",
        "로그 보관 기간을 30일에서 90일로 늘렸을 때",
        "컨테이너 replica 수를 오토스케일로 조정했을 때",
        "새 data flow, trust relationship, identity provider, third-party integration이 생겼을 때",
      ],
      answerIndex: 3,
      explanation:
        "본문은 새 data flow, trust relationship, identity provider, third-party integration이 기존 threat model의 경계를 바꾸는지 판단하는 것이 운영 결정이라고 한다. 새 external principal이나 outbound data path가 생기면 기존 control이 적용되지 않는다.",
    },
    {
      id: "q20",
      question:
        "incident containment에서 network만 격리하고 identity·secret을 회수하지 않으면 생기는 문제는?",
      choices: [
        "forensic snapshot의 hash가 변조되는 문제",
        "quarantine rule이 정상 트래픽까지 막는 문제",
        "다른 host에서 같은 권한이 재사용되는 문제",
        "IOC timeline이 incident commander 승인 없이 기록되는 문제",
      ],
      answerIndex: 2,
      explanation:
        "본문은 network만 격리하고 identity와 secret을 회수하지 않아 다른 host에서 같은 권한이 재사용되는 것을 실패 모드로 든다. revoke 이후에도 session token, long-lived connection, secondary credential이 activity를 만들 수 있다.",
    },
    {
      id: "q21",
      question:
        "public ingress 영향 확인에서 위험한 노출로 판단해야 하는 상태는?",
      choices: [
        "internet source가 origin port로 직접 도달하거나 admin path가 같은 listener에서 열리는 경우",
        "허용된 host, path, method만 edge rule을 통과하는 상태",
        "origin security rule이 CDN 또는 load balancer source만 받는 상태",
        "listener rule diff가 change record와 일치하는 상태",
      ],
      answerIndex: 0,
      explanation:
        "본문은 위험을 internet source가 origin port로 직접 도달하거나 admin path가 같은 listener에서 열리는 경우로 정의한다. 위험이면 origin 직접 접근을 먼저 닫고 예외 사용자를 별도 allowlist로 격리한다.",
    },
    {
      id: "q22",
      question:
        "public exposure 오판을 회수한 뒤에 남는 대표적 실패 모드는?",
      choices: [
        "외부 재검증 결과를 incident record에 남기는 것",
        "닫은 rule과 남긴 예외를 기록하는 것",
        "임시 허용 rule이 배포 뒤에도 남아 다음 변경의 기본값처럼 쓰이는 것",
        "public exposure check를 배포 전 gate에 넣는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 임시 허용 rule이 배포 뒤에도 남아 다음 변경의 기본값처럼 쓰이는 것을 실패 모드로 든다. 그래서 public exposure check를 배포 전 gate에 넣고 외부 probe가 닫힌 상태를 보여야 incident를 종료한다.",
    },
    {
      id: "q23",
      question:
        "CDN/WAF edge rule 변경을 승인하지 않아야 하는 신호는?",
      choices: [
        "rule diff가 change record에 기록된 것",
        "canary 정상 요청이 그대로 통과하는 것",
        "match count가 baseline과 동일하게 유지되는 것",
        "새 rule이 로그인·결제·webhook 같은 핵심 path를 block 후보로 잡거나 match count가 baseline보다 급증하는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 새 rule이 로그인, 결제, webhook 같은 핵심 path를 block 후보로 잡거나 match count가 baseline보다 급증하면 승인하지 않는다고 한다. 이럴 땐 count mode로 바꿔 canary header나 test IP로 재검증한다.",
    },
    {
      id: "q24",
      question:
        "Security Group rule을 삭제한 뒤 뒤늦게 드러나는 전형적 실패는?",
      choices: [
        "health check나 batch job 같은 낮은 빈도 경로가 끊기는 것",
        "stateful rule이 응답 방향을 자동 허용하지 못하는 것",
        "ENI attachment가 자동으로 재생성되는 것",
        "Flow Logs가 accept sample을 더 이상 수집하지 못하는 것",
      ],
      answerIndex: 0,
      explanation:
        "본문은 rule 삭제 후 health check나 batch job 같은 낮은 빈도 경로가 끊기는 것을 실패 모드로 든다. 그래서 24시간 Flow Logs reject watch를 걸고 rollback rule을 별도로 보관한다.",
    },
    {
      id: "q25",
      question:
        "NACL 재발 봉쇄에서 위험 신호로 봐야 하는 구성은?",
      choices: [
        "inbound와 outbound rule이 같은 연결의 양방향 traffic을 설명하는 상태",
        "deny rule이 의도한 CIDR에만 적용되는 상태",
        "넓은 allow rule을 맨 앞 rule number에 두거나 subnet association이 운영 subnet 전체로 번진 경우",
        "rule number convention과 pre-change analyzer check를 추가한 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 넓은 allow rule을 맨 앞에 두거나 subnet association이 운영 subnet 전체로 번진 경우를 위험으로 든다. 정상은 양방향 rule이 같은 연결을 설명하고 deny rule이 의도한 CIDR에만 적용되는 상태다.",
    },
    {
      id: "q26",
      question:
        "IAM role assume 경계에서 위험으로 가르는 상태는?",
      choices: [
        "허용된 account, workload, session tag만 assume에 성공하는 상태",
        "임시로 넓힌 principal, 누락된 external id, 오래된 session이 계속 성공하는 경우",
        "role last used가 기대 workload와 맞는 상태",
        "trust diff에 Access Analyzer check가 붙은 상태",
      ],
      answerIndex: 1,
      explanation:
        "본문은 임시로 넓힌 principal, 누락된 external id, 오래된 session이 계속 성공하는 경우를 위험으로 든다. 위험이면 trust를 좁힌 뒤 실패 client만 별도 역할로 분리한다.",
    },
    {
      id: "q27",
      question:
        "least privilege 권한 diff를 되돌린 뒤에 남는 실패 모드는?",
      choices: [
        "이전 policy version과 실패한 action을 기록하는 것",
        "policy version pruning 결과를 change ticket에 붙이는 것",
        "Access Analyzer를 재실행해 결과를 첨부하는 것",
        "rollback policy가 더 넓은 권한을 계속 유지하는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 rollback policy가 더 넓은 권한을 계속 유지하는 것을 되돌림 뒤 실패 모드로 든다. 그래서 policy version pruning과 Access Analyzer 재실행 결과를 change ticket에 붙인다.",
    },
    {
      id: "q28",
      question:
        "secret rotation cutover 이후에 남기지 말아야 할 상태는?",
      choices: [
        "rotation 시각과 이전 credential 폐기 시각을 기록하는 것",
        "old credential detector를 일정 기간 유지하는 것",
        "rollback 편의를 위해 이전 secret을 보관하면서 접근 권한도 유지하는 것",
        "다음 rotation runbook에 consumer cache 확인을 추가하는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 rollback 편의를 위해 이전 secret을 보관하면서 접근 권한도 유지하는 것을 실패 모드로 든다. 다음 조치는 old credential detector를 유지하고 runbook에 consumer cache 확인을 추가하는 것이다.",
    },
    {
      id: "q29",
      question:
        "privileged admin access에서 ticket과 session이 연결되지 않으면 생기는 문제는?",
      choices: [
        "누가 어떤 리소스에 어떤 명령을 실행했는지 사후 검증할 수 없다",
        "MFA condition이 자동으로 비활성화된다",
        "break-glass role의 TTL이 무한대로 늘어난다",
        "session recording이 원본 저장소에 도착하지 못한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 ticket과 session이 연결되지 않으면 누가 어떤 리소스에 어떤 명령을 실행했는지 사후 검증할 수 없다고 한다. 즉시 완화에서 approval ticket과 CloudTrail session issuer가 같은 사람·같은 incident를 가리키는지 먼저 본다.",
    },
    {
      id: "q30",
      question:
        "egress control에서 allowlist가 정상으로 보여도 위험으로 봐야 하는 신호는?",
      choices: [
        "firewall decision log와 DNS query log가 같은 시각을 가리키는 것",
        "DNS는 허용 domain인데 resolved IP가 새 ASN이나 비승인 region으로 바뀐 경우",
        "denied log가 예상되지 않은 partner만 가리키는 것",
        "destination host와 data classification을 한 줄로 묶은 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 DNS가 허용 domain이라도 resolved IP가 새 ASN이나 비승인 region으로 바뀌면 allowlist 정상으로 볼 수 없다고 한다. 초기 분기는 firewall decision log와 DNS query log를 먼저 본다.",
    },
    {
      id: "q31",
      question:
        "audit coverage를 승인하기 전 확인해야 할 다음 조치로 옳은 것은?",
      choices: [
        "dashboard 색상이 초록색인지 확인한다",
        "retention lock을 해제해 로그를 재수집한다",
        "sample admin action을 실행해 원본 로그와 SIEM event가 같은 request id로 도착하는지 확인한다",
        "ingestion lag이 0이 될 때까지 변경을 진행한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 승인 차단 판단 뒤 sample admin action을 실행해 원본 로그와 SIEM event가 같은 request id로 도착하는지 확인하라고 한다. 새 계정·region·data event가 audit scope에 없거나 delivery failure가 있으면 승인하지 않는다.",
    },
    {
      id: "q32",
      question:
        "incident 대응에서 containment와 eradication을 섞으면 생기는 결과는?",
      choices: [
        "forensic snapshot의 hash가 자동으로 변경된다",
        "quarantine rule이 IOC timeline을 덮어쓴다",
        "identity disable이 network quarantine보다 먼저 실행된다",
        "공격 경로가 남은 채 복구 선언이 나간다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 containment와 eradication을 섞으면 공격 경로가 남은 채 복구 선언이 나간다고 경고한다. 그래서 위험이면 token invalidation과 secret rotation을 containment 범위에 추가한다.",
    },
  ],
};

export default quiz;
