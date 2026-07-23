// VPN·Private Connectivity Q&A(operations-private-connectivity-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-private-connectivity-quiz",
  title: "VPN·Private Connectivity 퀴즈",
  sourceQaId: "operations-private-connectivity-qa",
  questions: [
    {
      id: "q1",
      question:
        "site-to-site VPN 터널이 up으로 보이는데 실제 payload는 흐르지 않을 수 있다. IKE/IPsec 협상 실패에서 첫 경계로 확인할 메커니즘은?",
      choices: [
        "IKE phase 1 proposal, IPsec phase 2 transform, PSK, peer public IP가 양쪽에서 같은지 확인하는 협상 메커니즘",
        "터널 대시보드의 up/down 색과 최근 24시간 가용성 지표",
        "애플리케이션 재시도 횟수와 HTTP 5xx 응답 비율",
        "VPC route table의 default route와 NAT gateway 상태",
      ],
      answerIndex: 0,
      explanation:
        "첫 경계는 IKE phase 1 proposal, IPsec phase 2 transform, PSK, peer public IP가 양쪽에서 같은지 확인하는 협상 메커니즘이다. 터널 up/down 색만 보면 알고리즘·lifetime·PFS·PSK 변경 뒤 재협상 반복 실패를 놓친다.",
    },
    {
      id: "q2",
      question:
        "IKE 협상 실패에서 양쪽 IKE 로그를 대조할 때, phase 1이 끝나기 전에 멈추는 것과 phase 2에서 멈추는 것의 판단 기준은?",
      choices: [
        "phase 1 실패는 항상 회선 물리 장애, phase 2 실패는 항상 라우팅 오류다",
        "phase 2에서 멈추면 transform set·PFS·traffic selector 문제이고, phase 1이 끝나기 전이면 proposal·PSK·NAT-T 문제다",
        "phase 1 실패는 고객 firewall 차단, phase 2 실패는 cloud 측 route table 누락이다",
        "phase 1은 MTU 문제, phase 2는 BGP prefix 광고 문제로 나눈다",
      ],
      answerIndex: 1,
      explanation:
        "phase 1이 끝나기 전이면 proposal·PSK·NAT-T 문제, phase 2에서 멈추면 transform set·PFS·traffic selector 문제로 나눈다. 이후 최근 crypto policy 변경 ticket을 붙이고 한쪽만 바뀐 값을 되돌린다.",
    },
    {
      id: "q3",
      question:
        "터널에 IKE SA와 IPsec SA는 있는데 byte counter가 0인 상태는 어떤 실패 모드인가?",
      choices: [
        "PSK가 만료돼 재협상이 반복되는 실패 모드",
        "반대 방향 방화벽이 응답을 drop하는 실패 모드",
        "selector나 route가 잘못된 실패 모드",
        "peer public IP가 NAT로 바뀐 실패 모드",
      ],
      answerIndex: 2,
      explanation:
        "SA는 있는데 byte counter가 0이면 selector나 route가 잘못된 실패 모드다. counter는 증가하지만 응답이 없으면 반대 방향 방화벽이나 return route를 본다.",
    },
    {
      id: "q4",
      question:
        "client VPN에서 로그인은 성공하는데 사내 대역 접근이 안 될 때, connection log가 authentication success 직후 authorization failed를 남기면 어떻게 분리하나?",
      choices: [
        "네트워크 공통 장애로 보고 route table을 먼저 되돌린다",
        "IdP mapping 문제로 보고 SAML assertion부터 수정한다",
        "client CIDR 충돌로 보고 전체 배포를 롤백한다",
        "IdP가 아니라 client VPN rule 문제로 분리한다",
      ],
      answerIndex: 3,
      explanation:
        "authentication success 직후 authorization failed면 IdP가 아니라 client VPN rule 문제로 분리한다. 반대로 SAML/OIDC assertion에 필수 group claim이 없으면 권한 rule을 고치기 전에 IdP mapping을 확인한다.",
    },
    {
      id: "q5",
      question:
        "client VPN 변경을 승인하기 전 배포를 중단하는 기준으로 옳은 것은?",
      choices: [
        "테스트 계정이 인증·authorization·route push·대상 TCP 연결을 모두 통과하지 못하는 경우",
        "IdP 로그인 성공 로그가 한 건이라도 남지 않는 경우",
        "connection log에 warning 레벨 메시지가 하나라도 있는 경우",
        "split-tunnel route가 기본값과 다른 경우",
      ],
      answerIndex: 0,
      explanation:
        "중단 기준은 테스트 계정이 인증·authorization·route push·대상 TCP 연결을 모두 통과하지 못하는 경우다. 실패가 그룹별로 갈리면 전체 배포를 멈추고 영향 그룹만 이전 rule set으로 되돌린다.",
    },
    {
      id: "q6",
      question:
        "Direct Connect 회선 인수에서 physical port가 available인데도 BGP가 절대 올라오지 않는 대표 원인은?",
      choices: [
        "터널 lifetime과 PFS group이 양쪽에서 다른 경우",
        "VLAN 태그가 다르거나 VIF가 wrong account에 붙은 경우",
        "client CIDR이 VPC route table과 겹치는 경우",
        "MSS clamp가 한쪽 장비에만 적용된 경우",
      ],
      answerIndex: 1,
      explanation:
        "포트가 available이어도 VLAN 태그가 다르거나 VIF가 wrong account에 붙으면 BGP는 절대 올라오지 않는다. BGP만 재시작하면 physical flap·optic error·VLAN mismatch 같은 하위 계층 증거가 사라질 수 있다.",
    },
    {
      id: "q7",
      question: "Direct Connect에서 BGP session이 idle일 때 먼저 확인할 항목은?",
      choices: [
        "IKE proposal, IPsec transform, PSK, NAT-T",
        "endpoint policy, private DNS, service acceptance",
        "peer IP, ASN, MD5 password, allowed TCP 179 path",
        "MSS 협상값, DF bit, ICMP fragmentation-needed 정책",
      ],
      answerIndex: 2,
      explanation:
        "BGP idle에서는 peer IP, ASN, MD5 password, allowed TCP 179 path를 먼저 확인한다. 판단 기준은 VIF가 available이고 양쪽이 같은 주소쌍을 보는지이며, session reset은 한쪽씩 수행한다.",
    },
    {
      id: "q8",
      question:
        "BGP session이 established인데 prefix propagation 이상이 의심될 때, prefix가 한쪽에만 보이면 먼저 잡을 증거는?",
      choices: [
        "터널 byte counter와 DPD timeout 값",
        "endpoint policy evaluation과 NLB target health",
        "DF-bit MTU probe와 TCP MSS capture",
        "advertised-routes와 received-routes 출력을 같은 neighbor 기준으로 저장",
      ],
      answerIndex: 3,
      explanation:
        "advertised-routes와 received-routes 출력을 같은 neighbor 기준으로 저장한다. 내가 광고한 prefix가 상대 received에 있고 상대 return prefix가 내 route table에 설치됐는지가 판단 기준이며, 빠진 쪽의 route policy diff와 최근 prefix-list 변경을 되돌림 후보로 올린다.",
    },
    {
      id: "q9",
      question:
        "잘못 광고된 넓은 CIDR이 정상 대역까지 흡수해 피해를 만들 때, 즉시 완화로 우선하는 조치는?",
      choices: [
        "해당 prefix를 withdraw한다",
        "max-prefix threshold를 즉시 높인다",
        "route dampening을 비활성화한다",
        "터널을 강제로 재협상시킨다",
      ],
      answerIndex: 0,
      explanation:
        "잘못 광고된 넓은 CIDR이 피해를 만들면 withdraw가 우선이다. 특정 업무 대역만 우회해야 하고 return path가 준비돼 있으면 더 구체적인 prefix를 임시 광고한다.",
    },
    {
      id: "q10",
      question:
        "route priority와 asymmetric routing이 의심될 때, 비대칭 경로를 확정하는 테스트는?",
      choices: [
        "cloud→고객망 한 방향 traceroute만 반복 실행해 지연을 측정한다",
        "같은 5-tuple에 대해 cloud→고객망, 고객망→cloud 양방향 traceroute와 packet capture를 동시에 잡는다",
        "터널 byte counter가 양쪽에서 증가하는지만 확인한다",
        "BGP session이 established인지와 advertised prefix 수만 비교한다",
      ],
      answerIndex: 1,
      explanation:
        "같은 5-tuple에 대해 양방향 traceroute와 packet capture를 동시에 잡는다. SYN과 SYN-ACK가 같은 보안 상태 장비를 지나야 한다는 것이 판단 기준이고, 한 방향 traceroute만 보면 응답이 다른 회선으로 돌아가는 실패를 놓친다.",
    },
    {
      id: "q11",
      question:
        "MTU/MSS 조각화가 의심될 때, 작은 packet은 통과하지만 TLS handshake 이후 큰 payload가 멈추는 증상에서 우선 검증할 것은?",
      choices: [
        "IdP group claim 누락을 우선 본다",
        "BGP max-prefix 초과를 우선 본다",
        "조각화 또는 PMTUD 실패를 우선 본다",
        "endpoint service acceptance pending을 우선 본다",
      ],
      answerIndex: 2,
      explanation:
        "작은 packet은 통과하는데 TLS handshake 이후 큰 payload가 멈추면 조각화 또는 PMTUD 실패를 우선 본다. ICMP type 3 code 4가 차단되거나 MSS clamp가 한쪽에만 적용되면 파일 업로드·백업·replication만 실패할 수 있다.",
    },
    {
      id: "q12",
      question: "MTU 실패를 재현하는 probe와 그 판단 기준으로 옳은 것은?",
      choices: [
        "일반 ping을 대량으로 보내 평균 왕복 지연이 임계값을 넘는지 본다",
        "openssl s_client로 TLS handshake 성공 여부만 확인한다",
        "BGP neighbor summary에서 received prefix 수 변화를 본다",
        "DF bit를 켠 ping 또는 tracepath로 경로별 최대 payload를 찾고, 업무 payload보다 작은 MTU에서 fragmentation-needed가 오거나 probe가 timeout되는지 본다",
      ],
      answerIndex: 3,
      explanation:
        "DF bit를 켠 ping 또는 tracepath로 경로별 최대 payload를 찾는다. 업무 payload보다 작은 MTU에서 fragmentation-needed 응답이 오거나 응답이 차단돼 probe가 timeout되는지가 판단 기준이다.",
    },
    {
      id: "q13",
      question:
        "cloud tunnel 로그가 비어 있는데도 사설 연결이 실패할 때, 고려해야 할 가능성은?",
      choices: [
        "고객 firewall이 IKE·ESP·UDP 4500·업무 포트를 앞에서 drop한 결과일 수 있다",
        "cloud 측 IPsec SA가 정상이므로 장애가 아니다",
        "로그가 비어 있으면 물리 회선만 점검하면 된다",
        "BGP가 established이면 업무 트래픽도 정상이라는 신호다",
      ],
      answerIndex: 0,
      explanation:
        "cloud tunnel이 정상이어도 고객 firewall이 IKE·ESP·UDP 4500·업무 포트를 막으면 사설 연결은 실패한다. cloud 쪽 로그가 비어 있어도 실제로는 고객 장비가 앞에서 drop한 결과일 수 있다.",
    },
    {
      id: "q14",
      question:
        "VPC peering이 active인데도 A-VPC에서 B-VPC를 거쳐 C-VPC로 가는 경로가 필요할 때, 설계상 옳은 판단은?",
      choices: [
        "양쪽 route table에 C-VPC CIDR을 peering connection id로 추가하면 해결된다",
        "peering은 transitive routing을 지원하지 않으므로 Transit Gateway·PrivateLink·라우팅 허브 설계를 비교하고 peering route 추가를 중단한다",
        "security group에 C-VPC source를 추가하면 경유가 가능해진다",
        "private DNS resolution을 활성화하면 transitive 경로가 생긴다",
      ],
      answerIndex: 1,
      explanation:
        "peering은 transitive routing을 지원하지 않아 B를 거쳐 C로 가는 경로는 생기지 않는다. transitive routing·중앙 방화벽 경유·다수 VPC 허브가 필요하면 Transit Gateway·PrivateLink·라우팅 허브 설계를 비교하고 peering route 추가를 중단한다.",
    },
    {
      id: "q15",
      question:
        "VPC peering에서 route는 양쪽에 있는데 IP 접속은 되고 이름 접속만 실패하면 무엇을 확인하나?",
      choices: [
        "security group source와 NACL deny 규칙",
        "IKE proposal과 IPsec transform set",
        "peering DNS resolution option과 private hosted zone association",
        "BGP local preference와 AS path",
      ],
      answerIndex: 2,
      explanation:
        "IP 접속은 되지만 이름 접속만 실패하면 peering DNS resolution option과 private hosted zone association을 확인한다. route는 양쪽에 있는데 TCP가 timeout이면 security group·NACL·endpoint listener를 본다.",
    },
    {
      id: "q16",
      question:
        "PrivateLink 장애에서 consumer가 서비스 이름을 조회했을 때 어떤 응답이 나와야 정상인가?",
      choices: [
        "provider NLB의 public IP로 응답",
        "on-prem resolver의 loopback 주소로 응답",
        "consumer VPC의 default gateway IP로 응답",
        "interface endpoint ENI의 private IP로 응답",
      ],
      answerIndex: 3,
      explanation:
        "consumer VPC에서 서비스 이름을 조회해 interface endpoint ENI private IP로 응답하는지 본다. public IP나 다른 private zone으로 해석되면 private DNS·PHZ override·resolver rule 충돌을 의심한다.",
    },
    {
      id: "q17",
      question:
        "PrivateLink에서 endpoint policy deny와 provider 장애를 어떻게 구분하나?",
      choices: [
        "policy deny는 특정 principal·action·resource 조건에서만 실패하고, provider 장애는 여러 consumer가 같은 target health 문제를 본다",
        "policy deny는 모든 consumer가 timeout되고, provider 장애는 한 consumer만 실패한다",
        "policy deny는 DNS 해석 실패로 나타나고, provider 장애는 이름 해석은 되지만 route가 없다",
        "policy deny는 SG 변경으로 해결되고, provider 장애는 endpoint 재생성으로 해결된다",
      ],
      answerIndex: 0,
      explanation:
        "policy deny는 특정 principal·action·resource 조건에서만 실패하고, provider 장애는 여러 consumer가 같은 target health 문제를 본다. 소비자 정책 수정과 provider target 복구를 분리한다.",
    },
    {
      id: "q18",
      question:
        "DNS forwarding과 Resolver endpoint 변경에서, 네트워크 터널이 정상인데도 특정 suffix의 이름 해석만 실패하면 무엇을 의심하나?",
      choices: [
        "IPsec SA 재협상 반복 문제",
        "rule 우선순위 또는 zone ownership 문제",
        "BGP asymmetric routing 문제",
        "MTU/MSS 조각화 문제",
      ],
      answerIndex: 1,
      explanation:
        "특정 suffix만 실패하면 사설 연결 장애가 아니라 rule 우선순위 또는 zone ownership 문제일 수 있다. 질의한 이름이 가장 구체적인 Resolver rule에 매칭되고 outbound endpoint ENI를 통해 온프레미스 DNS로 나가는지 확인한다.",
    },
    {
      id: "q19",
      question: "DNS forwarding 변경의 rollback 기준으로 옳은 것은?",
      choices: [
        "터널 byte counter가 0으로 떨어지는 것",
        "BGP received prefix 수가 기대값과 다른 것",
        "핵심 suffix의 SERVFAIL/NXDOMAIN 증가, query latency 급증, 온프레미스 resolver timeout",
        "endpoint SG hit count가 감소하는 것",
      ],
      answerIndex: 2,
      explanation:
        "rollback 기준은 핵심 suffix의 SERVFAIL/NXDOMAIN 증가, query latency 급증, 온프레미스 resolver timeout이다. rule을 이전 target resolver로 되돌리고 TTL 영향이 끝날 때까지 public/private 응답 차이를 모니터링한다.",
    },
    {
      id: "q20",
      question:
        "packet capture로 사설 연결 장애를 증명할 때, 한 지점 capture만 있으면 무엇을 증명하는가?",
      choices: [
        "요청 미발송·중간 drop·응답 경로 누락을 모두 구분한다",
        "고객사와 cloud 팀의 책임 경계를 명확히 나눈다",
        "SYN-ACK 반환 경로의 firewall state까지 증명한다",
        "drop 위치가 아니라 관측 위치만 증명한다",
      ],
      answerIndex: 3,
      explanation:
        "한 지점 capture만 있으면 drop 위치가 아니라 관측 위치만 증명한다. source·cloud ENI·tunnel/VIF edge·customer gateway·destination을 같은 tuple로 관측해야 하고, 시간 동기화가 안 되면 같은 packet인지 증명하지 못한다.",
    },
    {
      id: "q21",
      question:
        "packet capture에서 SYN-ACK가 destination에서 나갔는데 cloud 쪽에 없으면 무엇을 판단하나?",
      choices: [
        "return route나 중간 firewall drop",
        "대상 host의 listener 미기동",
        "IKE proposal mismatch",
        "endpoint policy deny",
      ],
      answerIndex: 0,
      explanation:
        "SYN-ACK가 destination에서 나갔는데 cloud 쪽에 없으면 return route나 중간 firewall drop이다. SYN이 destination 앞까지 보이고 SYN-ACK가 없으면 대상 host·local firewall·listener 상태를 본다.",
    },
    {
      id: "q22",
      question:
        "tunnel failover와 HA에서 자동 전환을 믿기 전에, backup 터널이 up인데도 failover 순간 일부 트래픽만 살아남는 이유는?",
      choices: [
        "backup 터널의 IKE lifetime이 더 짧기 때문",
        "route 우선순위와 return path가 준비되지 않았기 때문",
        "primary 터널의 byte counter가 더 크기 때문",
        "DNS TTL이 만료되지 않았기 때문",
      ],
      answerIndex: 1,
      explanation:
        "backup 터널이 up이어도 route 우선순위와 return path가 준비되지 않으면 failover 순간 일부 트래픽만 살아남는다. 터널 두 개가 up이라는 사실만 믿으면 active/standby 정책·BGP convergence 지연·failback flap을 놓친다.",
    },
    {
      id: "q23",
      question:
        "failover가 실제로 일어났는지 확인할 때, control plane 이벤트만으로 충분하지 않은 이유는?",
      choices: [
        "BGP best path 변경 로그는 조작될 수 있기 때문",
        "터널 health event는 항상 지연되어 도착하기 때문",
        "data plane traffic이 backup 터널로 지나간 증거가 있어야 하기 때문",
        "route table next hop은 control plane에 포함되지 않기 때문",
      ],
      answerIndex: 2,
      explanation:
        "control plane 이벤트만이 아니라 data plane traffic이 backup 터널로 지나간 증거가 있어야 한다. event log와 packet capture 또는 byte counter를 같은 시각으로 맞춘다.",
    },
    {
      id: "q24",
      question: "자동 failback을 막아야 하는 상황으로 옳은 것은?",
      choices: [
        "backup 터널의 byte counter가 primary보다 낮을 때",
        "BGP received prefix 수가 기대값과 같을 때",
        "DNS forwarding rule이 정상 적용됐을 때",
        "primary 터널이 flapping 중이거나 고객 HA pair가 state를 잃는 동안",
      ],
      answerIndex: 3,
      explanation:
        "primary 터널이 flapping 중이거나 고객 HA pair가 state를 잃는 동안에는 자동 failback을 막는다. 경로가 몇 분마다 바뀌면 장기 세션과 replication을 끊으므로, primary 원인 확인 전까지 local preference를 고정한다.",
    },
    {
      id: "q25",
      question:
        "IKE 협상 오판을 정리해 인계할 때, 실패 모드가 lifetime 차이였던 경우와 PSK 문제였던 경우의 조치를 어떻게 나누나?",
      choices: [
        "lifetime 차이면 양쪽 표준값을 runbook에 고정하고, PSK 문제면 secret rotation 절차와 적용 증거를 분리한다",
        "lifetime 차이면 터널을 삭제 후 재생성하고, PSK 문제면 peer IP를 변경한다",
        "두 경우 모두 crypto policy를 기본값으로 되돌리고 재협상만 반복한다",
        "lifetime 차이면 PFS group을 비활성화하고, PSK 문제면 NAT-T를 끈다",
      ],
      answerIndex: 0,
      explanation:
        "실패 모드가 lifetime 차이였으면 양쪽 표준값을 runbook에 고정하고, PSK 문제였으면 secret rotation 절차와 적용 증거를 분리한다. 마지막 확인은 새 SA 생성 로그와 실제 업무 CIDR ping 또는 TCP probe 결과로 닫는다.",
    },
    {
      id: "q26",
      question:
        "client VPN에서 로그인과 authorization은 통과했는데 접속 후 route 누락이 의심될 때 무엇을 비교하나?",
      choices: [
        "IdP의 group claim과 SAML assertion을 비교한다",
        "클라이언트가 받은 route table과 endpoint route authorization을 비교하고, 대상 CIDR이 client에 push됐고 VPC route table에도 client CIDR return path가 있는지 본다",
        "IKE SA와 IPsec SA의 byte counter를 비교한다",
        "BGP advertised-routes와 received-routes를 비교한다",
      ],
      answerIndex: 1,
      explanation:
        "클라이언트가 받은 route table과 endpoint route authorization을 비교한다. 대상 CIDR이 client에 push됐고 VPC route table에도 client CIDR return path가 있어야 하며, 누락되면 split tunnel을 임시로 되돌리거나 업무 CIDR만 추가한 뒤 traceroute와 Flow Logs로 확인한다.",
    },
    {
      id: "q27",
      question:
        "Direct Connect에서 physical 장애와 VIF 장애를 어떤 증거로 나누나?",
      choices: [
        "physical 장애는 BGP idle 로그, VIF 장애는 optic alarm으로 나눈다",
        "physical 장애는 VLAN id mismatch, VIF 장애는 LAG member down으로 나눈다",
        "physical 장애는 port down·optic alarm·LAG member down·provider NOC ticket으로, port는 up인데 VIF가 down이면 VLAN id·account ownership·accepted VIF 상태로 나눈다",
        "physical 장애는 MD5 password 불일치, VIF 장애는 max-prefix 초과로 나눈다",
      ],
      answerIndex: 2,
      explanation:
        "physical 장애는 port down·optic alarm·LAG member down·provider NOC ticket으로 판단하고, port는 up인데 VIF가 down이면 VLAN id·account ownership·accepted VIF 상태를 본다. 하위 계층 증거를 먼저 고정하고 BGP 변경은 VIF가 available인 뒤에만 실행한다.",
    },
    {
      id: "q28",
      question:
        "static route와 BGP route가 충돌할 때 먼저 봐야 할 것과 그 이유로 옳은 것은?",
      choices: [
        "BGP local preference를 먼저 높여 static route를 무력화한다",
        "터널 byte counter를 먼저 비교해 어느 경로가 살아있는지 본다",
        "DPD timeout을 낮춰 오래된 route를 빠르게 제거한다",
        "effective route table에서 실제 선택된 next hop과 prefix 길이를 먼저 본다. 더 구체적인 static route가 BGP보다 앞서면 장애 범위가 해당 CIDR로 좁혀지고, 넓은 static route는 여러 업무망을 흡수할 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "effective route table에서 실제 선택된 next hop과 prefix 길이를 먼저 본다. 더 구체적인 static route가 BGP보다 앞서면 장애 범위는 해당 CIDR로 좁혀지고, 완화는 임시 static route 제거 또는 더 구체적인 정상 route 추가다.",
    },
    {
      id: "q29",
      question:
        "MSS clamp 변경을 승인하는 기준과 그 위험으로 옳은 것은?",
      choices: [
        "SYN/SYN-ACK capture에서 협상 MSS가 낮아지고 대용량 업무 요청의 retransmission이 줄어드는 것이 승인 기준이며, 값을 과도하게 낮추거나 한쪽 장비에만 적용하면 처리량 저하·비대칭 결과를 만든다",
        "BGP received prefix 수가 기대값과 같아지는 것이 승인 기준이다",
        "터널 byte counter가 양쪽에서 같아지는 것이 승인 기준이다",
        "DF bit ping이 timeout되지 않는 것만으로 승인한다",
      ],
      answerIndex: 0,
      explanation:
        "승인 기준은 SYN/SYN-ACK capture에서 협상 MSS가 낮아지고 대용량 업무 요청의 retransmission이 줄어드는 것이다. 값을 과도하게 낮춰 처리량을 떨어뜨리거나 한쪽 장비에만 적용해 비대칭 결과를 만드는 것이 위험이다.",
    },
    {
      id: "q30",
      question:
        "NAT 뒤에 있는 customer gateway에서 특히 위험한 실패 모드는?",
      choices: [
        "endpoint policy가 특정 principal을 deny하는 경우",
        "peer IP가 바뀌거나 UDP 4500 translation이 끊겨 IKE peer가 다른 장비로 보이는 경우",
        "private DNS resolution option이 비활성화된 경우",
        "max-prefix threshold가 초과된 경우",
      ],
      answerIndex: 1,
      explanation:
        "NAT 뒤 customer gateway의 위험은 peer IP가 바뀌거나 UDP 4500 translation이 끊겨 IKE peer가 다른 장비로 보이는 경우다. 불일치하면 cloud 설정 변경보다 NAT 고정 또는 고객 장비 HA 설정을 먼저 조치한다.",
    },
    {
      id: "q31",
      question:
        "Resolver outbound endpoint의 보안 그룹 문제는 어떤 증상으로 나타나고 무엇을 보나?",
      choices: [
        "이름 해석은 되지만 TCP 업무 포트만 timeout되며 SG의 업무 포트를 본다",
        "BGP session이 idle이 되며 TCP 179 path를 본다",
        "query log에 outbound 시도는 있는데 응답이 없거나 TCP fallback이 실패하며, endpoint SG·NACL·온프레미스 firewall의 53/UDP와 53/TCP를 본다",
        "터널 byte counter가 0이 되며 selector와 route를 본다",
      ],
      answerIndex: 2,
      explanation:
        "query log에 outbound 시도는 있는데 응답이 없거나 TCP fallback이 실패하면 endpoint SG·NACL·온프레미스 firewall의 53/UDP와 53/TCP를 본다. 양방향 DNS packet이 endpoint ENI와 고객 resolver에 모두 보여야 하며, UDP와 TCP를 모두 허용하고 큰 DNS 응답 재시도를 확인한다.",
    },
    {
      id: "q32",
      question:
        "HA drill을 마친 뒤 runbook에서 갱신해야 할 항목과 통과 판단 기준으로 옳은 것은?",
      choices: [
        "IKE proposal 값과 PSK rotation 주기만 갱신하고, 재협상 성공 로그로 판단한다",
        "endpoint policy와 private DNS 설정만 갱신하고, ENI IP 해석으로 판단한다",
        "prefix-list와 max-prefix threshold만 갱신하고, received prefix 수로 판단한다",
        "전환 소요 시간·손실된 세션 유형·BGP convergence 시간·수동 우회 명령·되돌림 조건을 갱신하고, RTO 안에 업무 probe가 회복됐는지와 backup 경로가 과부하되지 않았는지로 판단한다",
      ],
      answerIndex: 3,
      explanation:
        "갱신 항목은 전환 소요 시간, 손실된 세션 유형, BGP convergence 시간, 수동 우회 명령, 되돌림 조건이다. 판단 기준은 RTO 안에 업무 probe가 회복됐는지와 backup 경로가 과부하되지 않았는지다.",
    },
    {
      id: "q33",
      question:
        "PrivateLink endpoint service 승인을 변경한 뒤 정상으로 선언하는 조건은?",
      choices: [
        "endpoint connection이 accepted, DNS가 ENI IP로 해석, 보안 그룹이 consumer source를 허용, provider target이 healthy이고, consumer subnet의 TLS/TCP probe와 provider access log의 같은 request id로 닫는 것",
        "consumer가 서비스 이름을 public IP로 해석하고 NLB가 응답하는 것",
        "endpoint policy가 모든 principal을 허용하고 acceptance가 pending인 것",
        "BGP session이 established이고 advertised prefix 수가 기대값과 같은 것",
      ],
      answerIndex: 0,
      explanation:
        "정상 조건은 endpoint connection이 accepted, DNS가 ENI IP로 해석, 보안 그룹이 consumer source를 허용, provider target이 healthy인 상태다. 최종 확인은 consumer subnet에서 TLS 또는 TCP probe와 provider access log의 같은 request id로 닫는다.",
    },
    {
      id: "q34",
      question:
        "MTU probe와 MSS capture가 정상인데도 업무가 실패하면 다음으로 넘어갈 경계는? 단, 넘어가지 말아야 할 조건은?",
      choices: [
        "곧바로 BGP prefix propagation 경계로 넘어간다",
        "TLS record size·application timeout·storage replication chunk 같은 상위 payload 조건으로 넘어가되, packet capture에 retransmission이나 out-of-order가 남아 있으면 네트워크 경계를 닫지 않는다",
        "곧바로 IdP group claim 문제로 넘어간다",
        "곧바로 endpoint policy deny 경계로 넘어간다",
      ],
      answerIndex: 1,
      explanation:
        "MTU probe와 MSS capture가 정상인데 업무가 실패하면 TLS record size, application timeout, storage replication chunk 같은 상위 payload 조건으로 넘어간다. 단, packet capture에 retransmission이나 out-of-order가 남아 있으면 네트워크 경계를 닫지 않는다.",
    },
  ],
};

export default quiz;
