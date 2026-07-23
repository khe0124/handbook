// VPC·Subnet·Routing·NAT 운영 Q&A(operations-vpc-routing-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-vpc-routing-quiz",
  title: "VPC·Subnet·Routing·NAT 퀴즈",
  sourceQaId: "operations-vpc-routing-qa",
  questions: [
    {
      id: "q1",
      question:
        "CIDR overlap 장애 초기 분기에서 첫 증거로 무엇을 봐야 하나?",
      choices: [
        "실제 연결 경로에 올라온 양쪽 CIDR 목록(VPC CIDR, TGW route table, VPN/BGP advertised prefix)",
        "각 subnet의 NACL rule number와 ephemeral port range",
        "NAT gateway의 ErrorPortAllocation과 ActiveConnectionCount 지표",
        "resolver query log와 endpoint policy가 허용하는 principal 목록",
      ],
      answerIndex: 0,
      explanation:
        "본문은 첫 증거를 실제 연결 경로에 올라온 양쪽 CIDR 목록으로 보고, VPC CIDR·TGW route table·VPN/BGP advertised prefix를 비교해 동일 대역이나 포함 관계가 있으면 라우팅 변경을 멈추라고 한다.",
    },
    {
      id: "q2",
      question:
        "CIDR overlap을 DNS나 방화벽 문제로 오판하면 어떤 실패 양상이 나타나나?",
      choices: [
        "모든 subnet의 outbound가 동시에 완전히 끊긴다",
        "한쪽 세션만 간헐적으로 실패하고, 피어링·TGW 전파를 열수록 영향 반경이 커진다",
        "NAT gateway가 재시작되며 전체 egress 대역폭이 0이 된다",
        "private hosted zone이 삭제되어 서비스 이름이 NXDOMAIN을 받는다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 겹침을 DNS나 방화벽 문제로 보면 한쪽 세션만 간헐적으로 실패하고 피어링 또는 TGW 전파를 열수록 영향 반경이 커진다고 설명한다.",
    },
    {
      id: "q3",
      question:
        "subnet route association 변경 리뷰에서 핵심 메커니즘으로 봐야 하는 것은?",
      choices: [
        "route table의 이름이 tier 명명 규칙과 일치하는지",
        "subnet에 붙은 태그와 IaC state의 리소스 이름이 같은지",
        "subnet-to-route-table association의 실제 association id와 default route target",
        "해당 subnet이 위치한 AZ의 물리적 가용 용량",
      ],
      answerIndex: 2,
      explanation:
        "본문은 첫 메커니즘이 subnet-to-route-table association이며, 같은 route table 이름보다 실제 association id와 default route target이 중요하다고 한다.",
    },
    {
      id: "q4",
      question:
        "subnet route association을 놓쳤을 때 나타나는 대표적 실패는?",
      choices: [
        "모든 ENI가 동일한 public IP를 공유해 충돌한다",
        "route table이 자동으로 두 개로 분할된다",
        "Flow Logs가 전면 중단되어 증거가 사라진다",
        "private subnet이 IGW default route를 받아 공개되거나, 배치 subnet이 NAT 경로를 잃어 외부 API 호출에 실패한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 association을 놓치면 private subnet이 IGW default route를 받아 공개되거나, 배치 subnet이 NAT 경로를 잃고 외부 API 호출에 실패한다고 설명한다.",
    },
    {
      id: "q5",
      question:
        "route table precedence를 판단할 때 첫 메커니즘은 무엇인가?",
      choices: [
        "longest prefix match이고, 같은 prefix라면 static·propagated·local route의 우선순위를 확인",
        "route가 생성된 시각이 빠른 것이 항상 먼저 선택됨",
        "route table에 먼저 나열된 순서(row order)대로 선택됨",
        "target의 종류와 무관하게 0.0.0.0/0이 최우선으로 적용됨",
      ],
      answerIndex: 0,
      explanation:
        "본문은 첫 메커니즘이 longest prefix match이고, 같은 prefix라면 static route·propagated route·서비스별 local route의 우선순위를 확인한다고 한다.",
    },
    {
      id: "q6",
      question:
        "route table에서 0.0.0.0/0만 보고 판단하면 놓치는 문제는?",
      choices: [
        "route table의 전체 entry 개수 한도 초과",
        "더 구체적인 /32·/24·prefix list route가 트래픽을 가로채 일부 목적지만 다른 target으로 보내는 것",
        "propagated route가 static route보다 항상 우선하는 현상",
        "IGW attachment가 detach되어 egress가 끊기는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 0.0.0.0/0만 보면 더 구체적인 /32·/24·prefix list route가 트래픽을 가로채는 문제를 놓치고, 보안 장비 우회 route나 PrivateLink prefix list가 일부 목적지만 다른 target으로 보내 timeout을 만든다고 한다.",
    },
    {
      id: "q7",
      question:
        "NAT gateway port exhaustion 장애에서 첫 증거로 확인할 지표·필드는?",
      choices: [
        "route table의 propagated flag와 prefix list id",
        "IGW attachment state와 ENI public IP inventory",
        "source private IP, destination IP:port, NAT gateway의 ErrorPortAllocation과 ActiveConnectionCount",
        "private hosted zone association과 endpoint policy",
      ],
      answerIndex: 2,
      explanation:
        "본문은 첫 메커니즘을 source private IP, destination IP:port, NAT gateway의 ErrorPortAllocation과 ActiveConnectionCount로 제시한다.",
    },
    {
      id: "q8",
      question:
        "NAT 포트 고갈을 인터넷 장애로 오판하면 생기는 결과는?",
      choices: [
        "NAT gateway가 자동으로 AZ를 이동시킨다",
        "egress 대역폭이 즉시 두 배로 늘어난다",
        "route table의 default route가 삭제된다",
        "retry가 늘어 포트 고갈을 더 키운다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 NAT 포트 고갈을 인터넷 장애로 보면 retry가 늘어 고갈을 더 키운다고 설명한다.",
    },
    {
      id: "q9",
      question:
        "Internet Gateway와 public route 변경 리뷰에서 inbound 도달이 성립하려면 함께 봐야 하는 조합은?",
      choices: [
        "IGW attachment, route table의 0.0.0.0/0 또는 ::/0 target, ENI public IP 조합",
        "NAT gateway id와 connection pool 설정만",
        "TGW association과 propagation enabled 목록만",
        "resolver query log와 dig 결과만",
      ],
      answerIndex: 0,
      explanation:
        "본문은 첫 메커니즘을 IGW attachment, route table의 0.0.0.0/0 또는 ::/0 target, ENI public IP 조합으로 보고, route만 있어도 public IP가 없으면 inbound가 성립하지 않는다고 한다.",
    },
    {
      id: "q10",
      question:
        "Transit Gateway 운영 인수에서 경로 누락과 과전파를 구분하려면 핵심적으로 분리해서 봐야 하는 두 개념은?",
      choices: [
        "static route와 local route",
        "attachment의 association과 propagation",
        "srcaddr와 dstaddr",
        "inbound rule과 outbound rule",
      ],
      answerIndex: 1,
      explanation:
        "본문은 첫 메커니즘이 attachment association과 propagation의 분리이며, associated route table·propagated route table·static override를 모두 보여줘야 경로 누락과 과전파를 구분한다고 한다.",
    },
    {
      id: "q11",
      question:
        "Security Group과 NACL의 차이를 장애 판단에 쓸 때 맞는 설명은?",
      choices: [
        "SG는 subnet 경계에서, NACL은 ENI 경계에서 각각 stateless로 동작한다",
        "SG와 NACL 모두 return traffic을 자동 추적하므로 한쪽만 열면 된다",
        "SG는 허용된 연결의 return traffic을 추적하지만, NACL은 stateless라 양방향 rule이 모두 필요하다",
        "NACL은 ENI level에서, SG는 VPC 전체에서 한 번만 평가된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 SG가 허용된 연결의 return traffic을 추적하지만 NACL은 양방향 rule이 모두 필요하다고 하며, SG는 ENI level, NACL은 subnet level에서 적용된다고 설명한다.",
    },
    {
      id: "q12",
      question:
        "SG만 열고 return path NACL을 놓쳤을 때의 전형적 실패 모드는?",
      choices: [
        "outbound 443이 차단되어 요청 자체가 나가지 못한다",
        "route table이 main route table을 상속해 subnet이 공개된다",
        "NAT gateway의 ActiveConnectionCount가 0으로 떨어진다",
        "inbound 443은 허용됐지만 ephemeral return port가 NACL에서 막혀 클라이언트가 응답을 받지 못한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 둘을 같은 방화벽으로 다루면 SG만 열고 return path NACL을 놓쳐 timeout을 반복하며, inbound 443은 허용됐지만 ephemeral return port가 NACL egress 또는 ingress에서 막혀 응답을 못 받는다고 한다.",
    },
    {
      id: "q13",
      question:
        "NACL ephemeral return path를 검증할 때 먼저 결정해야 하는 것은?",
      choices: [
        "요청 방향과 응답 방향 모두가 NACL rule을 통과하는지",
        "route table에 목적지 prefix가 있는지",
        "NAT gateway가 AZ별로 분리돼 있는지",
        "endpoint policy가 principal을 허용하는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 먼저 결정할 것이 요청 방향과 응답 방향 모두 NACL rule을 통과하는지이며, 서버 포트만 열려 있어도 클라이언트 임시 포트로 돌아가는 응답이 막히면 장애가 난다고 한다.",
    },
    {
      id: "q14",
      question:
        "egress allowlist를 문자열 IP 목록으로만 관리할 때 나타나는 실패 모드는?",
      choices: [
        "prefix list의 최대 entry 수를 항상 초과한다",
        "DNS는 새 IP를 주는데 egress 방화벽은 이전 prefix만 허용해 일부 region 호출이 실패한다",
        "route table이 propagated route를 잃어버린다",
        "NACL rule order가 자동으로 뒤바뀐다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 allowlist를 문자열 목록으로만 관리하면 SaaS IP 변경·CDN CNAME·dual-stack 전환에서 정상 트래픽이 막히고, DNS는 새 IP를 주는데 방화벽은 이전 prefix만 허용해 일부 region 호출이 실패한다고 한다.",
    },
    {
      id: "q15",
      question:
        "PrivateLink를 만들고 Private DNS를 놓쳤을 때의 실패 모드는?",
      choices: [
        "endpoint ENI가 모든 AZ에서 동시에 삭제된다",
        "SG inbound rule이 자동으로 열린다",
        "shared services VPC에서는 private name이 해석되지만 workload VPC에는 hosted zone association이 없어 트래픽이 NAT/IGW 경로를 탄다",
        "route table의 longest prefix match가 비활성화된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 PrivateLink를 만들고 DNS를 놓치면 트래픽이 계속 public 경로로 나가거나 특정 VPC만 NXDOMAIN을 받고, workload VPC에 hosted zone association이 없어 NAT/IGW 경로를 탄다고 설명한다.",
    },
    {
      id: "q16",
      question:
        "VPC Flow Logs 판독에서 먼저 결정해야 하는 경계는?",
      choices: [
        "로그를 어느 S3 버킷에 저장할지와 보존 기간을 얼마로 할지",
        "어느 CloudWatch 대시보드에 그래프를 그릴지",
        "어떤 IAM role로 로그를 조회할지",
        "로그가 말하는 경계가 네트워크 drop인지, 허용됐지만 상위 계층에서 실패한 것인지",
      ],
      answerIndex: 3,
      explanation:
        "본문은 먼저 결정할 것이 로그가 말하는 경계가 네트워크 drop인지, 허용됐지만 상위 계층에서 실패한 것인지이며, ACCEPT·REJECT·NODATA/SKIPDATA를 구분해 다음 증거로 넘겨야 한다고 한다.",
    },
    {
      id: "q17",
      question:
        "Flow Logs에서 REJECT만 찾으면 놓치는 것은?",
      choices: [
        "ACCEPT 뒤의 애플리케이션 timeout이나 DNS 오해, 그리고 SKIPDATA로 인한 실제 drop 증거 손실",
        "route table의 propagated flag 변경 이력",
        "NAT gateway의 ErrorPortAllocation 급증 시각",
        "IGW attachment의 detach 이벤트",
      ],
      answerIndex: 0,
      explanation:
        "본문은 REJECT만 찾으면 ACCEPT 뒤 애플리케이션 timeout이나 DNS 오해를 놓치고, log-status가 SKIPDATA인데 트래픽이 없었다고 판단해 실제 피크 시간의 drop 증거를 잃는다고 한다.",
    },
    {
      id: "q18",
      question:
        "Reachability Analyzer 결과를 runbook으로 handoff할 때 완료 기준으로 보여야 하는 것은?",
      choices: [
        "PASS/FAIL 결과 스크린샷 하나면 충분하다",
        "막힌 component, 관련 rule, 다음 조치 owner가 함께 보여야 한다",
        "Analyzer 실행 비용과 소요 시간만 기록하면 된다",
        "source ENI의 public IP만 남기면 된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 handoff가 pass/fail 결과보다 막힌 component, 관련 rule, 다음 조치 owner가 보여야 완료된다고 하며, 스크린샷만 남기면 권한 없는 담당자가 같은 검사를 실행하지 못한다고 지적한다.",
    },
    {
      id: "q19",
      question:
        "CIDR overlap에서 request는 목적지에 도착하는데도 위험으로 봐야 하는 상태는?",
      choices: [
        "출발 VPC·중간 TGW·목적 VPC가 모두 같은 목적 소유자를 가리키고 양방향 Flow Logs가 ACCEPT인 상태",
        "NAT gateway의 ActiveConnectionCount가 목적지 한계에 근접한 상태",
        "reply가 겹치는 다른 대역으로 선택되어 응답이 다른 소유자에게 돌아가는 상태",
        "route table에 목적 prefix가 static route로 존재하는 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정상을 출발·중간·목적이 같은 소유자를 가리키고 양방향 Flow Logs가 ACCEPT인 상태로, 위험을 request는 목적지에 도착하지만 reply가 겹치는 다른 대역으로 선택되는 경우로 본다.",
    },
    {
      id: "q20",
      question:
        "CIDR overlap 오판을 회수한 뒤 재발 방지로 남겨야 하는 것은?",
      choices: [
        "NAT gateway metric alert threshold를 낮추는 것",
        "표준 ephemeral range를 NACL 문서로 고정하는 것",
        "endpoint policy가 허용하는 principal 목록을 갱신하는 것",
        "IPAM 또는 CIDR registry에 예약 상태를 갱신하고 신규 VPC 생성 체크에 overlap 검사를 넣는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 회수 뒤 충돌 prefix·영향 attachment·임시 우회·영구 주소 계획을 남기고, IPAM 또는 CIDR registry에 예약 상태를 갱신하며 신규 VPC 생성 체크에 overlap 검사를 넣으라고 한다.",
    },
    {
      id: "q21",
      question:
        "subnet route association 리뷰에서 위험으로 판단해야 하는 상태는?",
      choices: [
        "새 subnet만 main route table을 상속하거나 AZ별 route table이 서로 다른 NAT target을 가리키는 상태",
        "subnet tier·association·expected next hop이 모두 설계 문서와 일치하는 상태",
        "Reachability Analyzer가 설계와 같은 경로를 보여주는 상태",
        "모든 subnet이 명시적 association을 가진 상태",
      ],
      answerIndex: 0,
      explanation:
        "본문은 위험을 새 subnet만 main route table을 상속하거나 AZ별 route table이 서로 다른 NAT target을 가리키는 상태로 본다.",
    },
    {
      id: "q22",
      question:
        "subnet association을 되돌릴 때 재발을 부르는 전형적 실패 모드는?",
      choices: [
        "이전 association id와 복원한 route table id를 로그에 남기는 것",
        "association만 되돌리고 main route table 변경은 남겨 새 subnet에서 재발하는 것",
        "IaC state와 콘솔 readback을 대조하는 것",
        "복원 후 대표 ENI로 경로를 재검증하는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 association만 되돌리고 main route table 변경은 남기면 새 subnet에서 재발한다고 한다.",
    },
    {
      id: "q23",
      question:
        "route table precedence를 다음 담당자가 재현하도록 인계 증거로 남겨야 하는 것은?",
      choices: [
        "route table의 전체 entry 개수와 한도",
        "각 route를 마지막으로 변경한 사람의 계정만",
        "특정 IP에 대해 어떤 prefix가 선택되는지 Reachability Analyzer 또는 cloud route lookup 결과",
        "NAT gateway의 destination tuple 집계",
      ],
      answerIndex: 2,
      explanation:
        "본문은 인계 증거로 route table 전체 export와 목적지별 선택 결과를 남기고, 특정 IP에 어떤 prefix가 선택되는지 Reachability Analyzer 또는 cloud route lookup으로 남겨야 다음 담당자가 재현한다고 한다.",
    },
    {
      id: "q24",
      question:
        "더 구체적인 route가 있을 때 위험으로 봐야 하는 경우는?",
      choices: [
        "더 구체적인 route가 승인된 목적지에만 있고 target이 설계된 TGW인 경우",
        "target이 설계된 보안 장비나 endpoint 중 하나인 경우",
        "propagated route가 static route와 같은 destination을 두고 일치하는 경우",
        "임시 테스트용 /32나 prefix list가 남아 기본 경로보다 먼저 선택되는 경우",
      ],
      answerIndex: 3,
      explanation:
        "본문은 위험을 임시 테스트용 /32나 prefix list가 남아 기본 경로보다 먼저 선택되는 경우로 본다.",
    },
    {
      id: "q25",
      question:
        "NAT gateway port exhaustion에서 원인 확정보다 먼저 고를 수 있는 완화 조치 조합은?",
      choices: [
        "AZ별 NAT 분리, 목적지 분산, connection reuse 조정 중 피해를 줄이는 조치",
        "IGW attachment 재연결과 public IP 재할당",
        "NACL ephemeral range 확장과 rule order 조정",
        "private hosted zone association 추가와 endpoint policy 완화",
      ],
      answerIndex: 0,
      explanation:
        "본문은 완화가 원인 확정보다 빨리 AZ별 NAT 분리, 목적지 분산, connection reuse 조정 중 어떤 조치가 피해를 줄이는지 고르는 것이라 한다.",
    },
    {
      id: "q26",
      question:
        "NAT gateway 지표에서 위험 신호로 봐야 하는 상태는?",
      choices: [
        "ErrorPortAllocation이 0으로 돌아오고 ActiveConnectionCount가 한계에 근접하지 않은 상태",
        "전체 egress 대역폭은 남아 있는데 특정 destination tuple에서 timeout이 계속 나는 상태",
        "모든 목적지로 연결이 고르게 분산된 상태",
        "retry budget이 제한되어 재시도가 줄어든 상태",
      ],
      answerIndex: 1,
      explanation:
        "본문은 정상을 ErrorPortAllocation이 0이고 ActiveConnectionCount가 한계에 근접하지 않은 상태로, 위험을 전체 대역폭은 남았는데 특정 destination tuple에서 timeout이 계속 나는 경우로 본다.",
    },
    {
      id: "q27",
      question:
        "IGW default route를 shared route table에 넣을 때 생기는 실패 모드는?",
      choices: [
        "public endpoint가 모두 default route를 잃는다",
        "NAT gateway가 자동으로 증설된다",
        "의도하지 않은 subnet까지 public tier가 된다",
        "route table이 자동으로 tier별로 분리된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 shared route table에 IGW default route를 넣으면 의도하지 않은 subnet까지 public tier가 되는 것이 실패 모드라 한다.",
    },
    {
      id: "q28",
      question:
        "public route 변경 리뷰에서 위험으로 판단해야 하는 경우는?",
      choices: [
        "IGW attached, subnet association, default route, ENI public IP, SG inbound가 의도한 endpoint에만 맞는 경우",
        "외부 probe가 모두 닫혀 있는 경우",
        "change ticket과 실제 노출이 모두 public tier로 일치하는 경우",
        "외부 probe가 열리는데 change ticket에는 egress 목적이라고 적힌 경우",
      ],
      answerIndex: 3,
      explanation:
        "본문은 정상을 노출이 의도한 endpoint에만 맞는 상태로, 위험을 외부 probe가 열리는데 change ticket에는 egress 목적이라 적힌 경우로 본다.",
    },
    {
      id: "q29",
      question:
        "TGW attachment의 association과 propagation을 같은 것으로 다루면 생기는 결과는?",
      choices: [
        "spoke VPC가 필요한 route를 못 받거나, 격리해야 할 대역이 다른 도메인으로 퍼진다",
        "모든 attachment가 자동으로 static route로 전환된다",
        "TGW route table이 하나로 병합된다",
        "appliance mode가 강제로 비활성화된다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 association과 propagation을 같은 것으로 보면 spoke VPC가 필요한 route를 못 받거나 격리해야 할 대역이 다른 도메인으로 퍼진다고 한다.",
    },
    {
      id: "q30",
      question:
        "TGW propagation에서 위험으로 봐야 하는 상태는?",
      choices: [
        "source attachment가 조회하는 route table에 목적 prefix가 있고 return path route table에도 반대 prefix가 있는 상태",
        "양방향 Flow Logs가 모두 ACCEPT인 상태",
        "한쪽 route table에만 전파되거나 더 구체적인 static route가 propagated route를 가리는 상태",
        "모든 attachment가 같은 route table을 조회하는 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정상을 source route table과 return path route table에 서로 반대 prefix가 있는 상태로, 위험을 한쪽 route table에만 전파되거나 더 구체적인 static route가 propagated route를 가리는 경우로 본다.",
    },
    {
      id: "q31",
      question:
        "VPC Flow Logs 판독의 첫 메커니즘으로 봐야 하는 필드 집합은?",
      choices: [
        "route destination, target, propagated flag, prefix list id",
        "interface id, srcaddr, dstaddr, srcport, dstport, action, log-status",
        "NAT gateway id, ErrorPortAllocation, ActiveConnectionCount",
        "hosted zone id, endpoint policy, resolver query name",
      ],
      answerIndex: 1,
      explanation:
        "본문은 Flow Logs 판독의 첫 메커니즘을 interface id, srcaddr, dstaddr, srcport, dstport, action, log-status로 제시한다.",
    },
  ],
};

export default quiz;
