// DNS·TLS·도메인 운영 Q&A(operations-dns-tls-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-dns-tls-quiz",
  title: "DNS·TLS·도메인 운영 퀴즈",
  sourceQaId: "operations-dns-tls-qa",
  questions: [
    {
      id: "q1",
      question:
        "authoritative A/AAAA/CNAME answer를 먼저 확정할 때 첫 경계로 분리해야 하는 것은?",
      choices: [
        "resolver의 응답 속도, DNS provider의 SLA, CDN edge 위치",
        "registrar delegation, authoritative nameserver, zone record set",
        "backend health check, load balancer listener, TLS certificate",
        "브라우저 캐시, OS hosts 파일, 사내 proxy 설정",
      ],
      answerIndex: 1,
      explanation:
        "본문은 첫 경계를 registrar delegation, authoritative nameserver, zone record set으로 두고 권한 응답이 틀린지, 위임이 틀린지, 재귀 resolver가 오래된 값을 들고 있는지부터 가른다고 말한다.",
    },
    {
      id: "q2",
      question:
        "권한 응답은 의도와 같은데 외부 probe만 다른 값을 줄 때 다음으로 확인할 것은?",
      choices: [
        "zone rollback을 즉시 실행하고 record를 수정한다",
        "권한 nameserver를 교체하고 delegation을 다시 등록한다",
        "resolver cache나 위임 전파를 따로 본다",
        "backend endpoint를 재시작하고 로그를 확인한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 권한 응답이 의도와 다르면 zone rollback이나 record 수정이 첫 조치이지만, 권한 응답은 맞고 외부 probe만 다르면 resolver cache나 위임 전파를 따로 본다고 말한다.",
    },
    {
      id: "q3",
      question:
        "A/AAAA/CNAME 장애에서 'AAAA만 이전 주소를 준다'는 신호가 가리키는 실패 모드는?",
      choices: [
        "IPv6 사용자만 실패하고 IPv4 경로는 정상인 경우",
        "모든 사용자가 동일하게 NXDOMAIN을 받는 경우",
        "TLS handshake 단계에서만 실패하는 경우",
        "load balancer 로그가 전혀 생기지 않는 경우",
      ],
      answerIndex: 0,
      explanation:
        "본문은 zone에는 새 주소가 있지만 AAAA만 잘못 남아 IPv6 사용자만 실패하는 경우를 실패 모드로 든다. 다음 조치로 IPv4/IPv6별 synthetic probe를 남긴다.",
    },
    {
      id: "q4",
      question: "ALIAS record 승인을 차단해야 하는 기준으로 옳은 것은?",
      choices: [
        "ALIAS의 TTL이 target CNAME의 TTL보다 길 때",
        "apex host가 wildcard 인증서로 덮이지 않을 때",
        "target endpoint가 단일 region에만 배포되어 있을 때",
        "ALIAS 설정과 target CNAME의 현재 lookup 결과가 다를 때",
      ],
      answerIndex: 3,
      explanation:
        "본문은 ALIAS 설정과 target CNAME의 현재 lookup 결과가 다를 때 승인을 차단하고, apex에서 합성된 A/AAAA가 target endpoint health와 같은 집합을 가리키는지를 판단 기준으로 삼는다고 말한다.",
    },
    {
      id: "q5",
      question:
        "apex flattening 변경에서 '되돌림이 flattening 지연 때문'일 때 다음 조치는?",
      choices: [
        "이전 target을 즉시 삭제해 provider 합성을 강제로 갱신한다",
        "apex record를 CNAME으로 바꿔 flattening을 우회한다",
        "TTL 만료 전 이전 endpoint를 끄지 않는다",
        "provider를 교체해 새 flattening 주기를 적용한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 실패 모드가 flattening 지연이면 TTL 만료 전 이전 endpoint를 끄지 않는 것이 다음 조치라고 말한다.",
    },
    {
      id: "q6",
      question:
        "TTL을 낮췄다고 생각했지만 사용자 일부가 계속 이전 endpoint로 가는 원인은?",
      choices: [
        "권한 nameserver가 새 TTL을 아직 배포하지 못해서",
        "resolver들이 이전 긴 TTL을 이미 들고 있어서",
        "load balancer가 이전 backend로 sticky routing을 해서",
        "CDN edge가 origin 응답을 무시하고 캐싱해서",
      ],
      answerIndex: 1,
      explanation:
        "본문은 TTL을 낮췄어도 resolver들이 이전 긴 TTL을 이미 들고 있어 사용자 일부가 오래된 endpoint로 계속 가는 경우를 실패 모드로 든다.",
    },
    {
      id: "q7",
      question:
        "TTL 조정 인계에서 다음 담당자에게 함께 넘겨야 하는 시각 정보는?",
      choices: [
        "TTL 변경 시각, 실제 record 변경 시각, 이전 endpoint 종료 가능 시각",
        "인증서 발급 시각, CT log 기록 시각, OCSP 갱신 시각",
        "registrar transfer 시각, registry lock 시각, DNSSEC 등록 시각",
        "배포 시작 시각, canary 승인 시각, rollback 완료 시각",
      ],
      answerIndex: 0,
      explanation:
        "본문은 인계 시 TTL 변경 시각, 실제 record 변경 시각, 이전 endpoint 종료 가능 시각을 함께 넘긴다고 말한다.",
    },
    {
      id: "q8",
      question:
        "권한 DNS는 정상인데 특정 public resolver만 이전 값을 줄 때 올바른 완화는?",
      choices: [
        "권한 zone을 다시 수정해 전파를 재촉한다",
        "authoritative nameserver를 재시작해 cache를 비운다",
        "권한 DNS를 바꾸지 않고 이전 endpoint 유지나 resolver 우회를 선택한다",
        "모든 resolver에 강제로 zone transfer를 요청한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 특정 resolver만 이전 주소를 주면 권한 DNS를 다시 바꾸지 않고 이전 endpoint 유지나 resolver 우회 안내를 선택하며, 권한 zone을 반복 수정하면 cache 만료 시간이 다시 늘어난다고 경고한다.",
    },
    {
      id: "q9",
      question:
        "split-horizon DNS 초기 분기에서 가장 먼저 확인하는 증거는?",
      choices: [
        "load balancer listener rule과 backend route table",
        "TLS certificate의 SAN 목록과 chain bundle",
        "VPC Flow Logs의 egress 트래픽 총량",
        "같은 FQDN을 public resolver와 private resolver에서 각각 조회한 결과",
      ],
      answerIndex: 3,
      explanation:
        "본문은 split-horizon 초기 분기에서 같은 FQDN을 public resolver와 private resolver에서 각각 조회해 기대 view와 비교하며, source network가 어떤 view를 선택해야 하는지를 판단 기준으로 삼는다고 말한다.",
    },
    {
      id: "q10",
      question:
        "split-horizon에서 'DNS answer는 맞지만 timeout이 난다'는 신호가 가리키는 것은?",
      choices: [
        "권한 nameserver가 잘못된 view를 반환하는 문제",
        "resolver cache에 stale answer가 남은 문제",
        "route나 firewall이 해당 주소를 막는 문제",
        "TLS certificate가 만료된 문제",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정상은 DNS answer가 맞고 route와 TLS host 검증이 통과하는 상태이며, 위험은 DNS answer는 맞지만 route나 firewall이 해당 주소를 막아 timeout이 나는 경우라고 말한다.",
    },
    {
      id: "q11",
      question:
        "private hosted zone을 새 VPC에 연결할 때 발생하는 대표적 실패 모드는?",
      choices: [
        "기존 public endpoint 이름을 private IP로 덮어써 외부 API 호출이 내부로 꺾인다",
        "새 VPC의 모든 이름이 NXDOMAIN을 받아 전체 통신이 끊긴다",
        "resolver rule이 사라져 public 이름 해석까지 실패한다",
        "zone의 TTL이 0으로 초기화되어 캐싱이 무력화된다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 shared zone을 새 VPC에 연결하면서 기존 public endpoint 이름을 private IP로 덮어써 외부 API 호출이 내부로 꺾이는 경우를 실패 모드로 든다.",
    },
    {
      id: "q12",
      question:
        "private DNS zone association 변경이 불확실할 때 권장하는 검증 방법은?",
      choices: [
        "모든 대상 VPC에 동시에 연결한 뒤 전체 lookup을 비교한다",
        "canary VPC 한 곳에 먼저 연결하고 lookup과 route를 확인한다",
        "public resolver에서만 조회해 충돌 여부를 판단한다",
        "association을 건너뛰고 resolver rule만 우선순위로 조정한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 불확실하면 canary VPC 한 곳에 먼저 연결하고 lookup과 route를 확인한다고 말한다.",
    },
    {
      id: "q13",
      question:
        "CAA record 확인 없이 인증서 발급을 계속 재시도하면 생기는 결과는?",
      choices: [
        "다른 CA로 자동 fallback되어 발급이 성공한다",
        "CAA 정책이 재시도 횟수에 따라 완화된다",
        "rate limit과 발급 지연만 늘어난다",
        "wildcard 범위가 하위 도메인까지 자동 확장된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 CAA 변경 없이 재시도하면 rate limit과 발급 지연만 늘어난다고 말한다. apex CAA가 특정 CA만 허용하거나 하위 도메인 CAA가 달라 wildcard 갱신만 막힐 수 있다.",
    },
    {
      id: "q14",
      question:
        "certificate SAN coverage 배포 승인이 가능한 조건은?",
      choices: [
        "브라우저에서 자물쇠 아이콘이 정상으로 보일 때",
        "DNS alias, Host header, certificate SAN 목록이 같은 host set을 가리킬 때",
        "wildcard 인증서가 apex 도메인을 포함할 때",
        "load balancer listener가 default certificate를 제공할 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 배포 승인이 DNS alias, Host header, certificate SAN 목록이 같은 host set을 가리킬 때만 가능하다고 말한다.",
    },
    {
      id: "q15",
      question:
        "certificate SAN에 host가 없어 name mismatch가 났을 때 올바른 조치는?",
      choices: [
        "app을 재시작해 인증서를 다시 로드한다",
        "DNS record의 TTL을 낮춰 전파를 재촉한다",
        "wildcard 인증서를 apex에만 재발급한다",
        "올바른 인증서 연결이나 이전 host rollback을 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 SAN에 host가 없으면 app 재시작이 아니라 올바른 인증서 연결이나 이전 host rollback이 조치이며, 증거는 presented certificate serial, SAN 목록, listener rule이라고 말한다.",
    },
    {
      id: "q16",
      question:
        "SNI와 HTTP Host header가 엇갈릴 때 분리해서 판단해야 하는 두 가지는?",
      choices: [
        "resolver cache가 stale한지, 권한 응답이 틀린지",
        "인증서는 맞는데 backend가 틀린지, 인증서 선택부터 틀린지",
        "IPv4 경로가 막힌지, IPv6 경로가 막힌지",
        "TTL이 긴지, negative cache가 남았는지",
      ],
      answerIndex: 1,
      explanation:
        "본문은 SNI와 Host routing 장애에서 인증서는 맞는데 backend가 틀린지, 또는 인증서 선택부터 틀린지를 분리해야 한다고 말한다. Host header만 보고 app route를 고치면 TLS 단계 name mismatch를 놓친다.",
    },
    {
      id: "q17",
      question:
        "intermediate chain을 검증할 때 최신 브라우저 한 종류만 통과하면 안 되는 이유는?",
      choices: [
        "브라우저는 OCSP stapling을 지원하지 않기 때문",
        "브라우저는 SNI를 보내지 않아 default certificate를 받기 때문",
        "브라우저 캐시가 이전 chain을 계속 재사용하기 때문",
        "mobile, Java, legacy trust store 샘플을 포함해야 하고 브라우저 하나만으로는 정상으로 볼 수 없어서",
      ],
      answerIndex: 3,
      explanation:
        "본문은 변경 리뷰가 최신 브라우저뿐 아니라 mobile, Java, legacy trust store 샘플을 포함해야 하며, 브라우저 한 종류만 통과하면 운영 정상으로 볼 수 없다고 말한다.",
    },
    {
      id: "q18",
      question:
        "인증서가 갱신됐는데도 만료 인증서가 계속 제공되는 대표적 원인은?",
      choices: [
        "load balancer나 CDN에 새 certificate가 연결되지 않아서",
        "CA가 갱신된 인증서를 CT log에 기록하지 않아서",
        "renewal job이 이전 private key를 재사용해서",
        "resolver가 이전 A record를 캐싱해서",
      ],
      answerIndex: 0,
      explanation:
        "본문은 인증서는 갱신됐지만 load balancer나 CDN에 새 certificate가 연결되지 않아 만료 인증서가 계속 제공되는 경우를 실패 모드로 들고, endpoint에서 보이는 serial 확인을 필수 단계로 둔다.",
    },
    {
      id: "q19",
      question:
        "도메인 이관에서 SERVFAIL이 보일 때 우선 의심해야 하는 원인은?",
      choices: [
        "새 zone record 누락",
        "TLS certificate SAN 불일치",
        "DS/DNSKEY mismatch 또는 delegation 오류",
        "resolver의 negative TTL 잔존",
      ],
      answerIndex: 2,
      explanation:
        "본문은 도메인 이관 즉시 완화에서 SERVFAIL이 보이면 DS/DNSKEY mismatch 또는 delegation 오류를 우선 의심하고, NXDOMAIN이면 새 zone record 누락을 확인한다고 말한다.",
    },
    {
      id: "q20",
      question:
        "nameserver cutover에서 web record는 맞지만 위험 신호로 봐야 하는 경우는?",
      choices: [
        "MX, CAA, ACME validation, glue record가 빠진 경우",
        "권한 nameserver가 dual-stack 응답을 주는 경우",
        "TTL이 계획한 창 안에서 줄어드는 경우",
        "RDAP 상태가 새 provider 기준으로 통과하는 경우",
      ],
      answerIndex: 0,
      explanation:
        "본문은 정상은 web record뿐 아니라 nameserver delegation·DNSSEC·핵심 record가 모두 새 provider 기준으로 통과하는 상태이고, 위험은 web record는 맞지만 MX, CAA, ACME validation, glue record가 빠진 경우라고 말한다.",
    },
    {
      id: "q21",
      question:
        "A/AAAA/CNAME 오판 회수 뒤 다음 변경의 배포 전 승인 조건으로 묶는 것은?",
      choices: [
        "resolver별 remaining TTL sample과 이전 endpoint hit count",
        "certificate SAN diff와 CT log 확인",
        "canary VPC lookup과 resolver rule priority",
        "delegation readback과 권한 질의",
      ],
      answerIndex: 3,
      explanation:
        "본문은 오판 회수 뒤 다음 변경에서는 delegation readback과 권한 질의를 배포 전 승인 조건으로 묶는다고 말한다.",
    },
    {
      id: "q22",
      question:
        "A/AAAA/CNAME 장애에서 애플리케이션 로그가 비었다고 성급히 backend 조사로 넘기면 안 되는 이유는?",
      choices: [
        "권한 DNS 변경 오류가 계속 사용자 요청을 다른 endpoint로 보내기 때문",
        "backend 재시작이 TLS 인증서 캐시를 무효화하기 때문",
        "load balancer health check가 로그보다 먼저 실패하기 때문",
        "resolver가 negative cache를 backend에서 읽어오기 때문",
      ],
      answerIndex: 0,
      explanation:
        "본문은 애플리케이션 로그가 비었다고 backend로 넘기면 권한 DNS 변경 오류가 계속 사용자 요청을 다른 endpoint로 보낸다고 말한다.",
    },
    {
      id: "q23",
      question:
        "ALIAS/flattening 변경에서 '특정 네트워크만 실패한다'는 신호가 가리키는 실패 모드는?",
      choices: [
        "target CNAME이 삭제되어 모든 사용자가 NXDOMAIN을 받는 경우",
        "apex flattening이 AAAA를 누락해 일부 네트워크만 실패하는 경우",
        "provider가 TTL을 0으로 합성해 캐싱이 무력화된 경우",
        "wildcard 인증서가 apex를 포함하지 못해 handshake가 실패한 경우",
      ],
      answerIndex: 1,
      explanation:
        "본문은 apex flattening이 AAAA를 누락해 특정 네트워크만 실패하는 경우를 실패 모드로 든다.",
    },
    {
      id: "q24",
      question:
        "TTL 조정에서 실패 모드가 NXDOMAIN cache였을 때 runbook에 추가하는 것은?",
      choices: [
        "이전 endpoint 즉시 종료 절차",
        "resolver 강제 flush 스크립트",
        "record 삭제 금지 창",
        "권한 zone 반복 수정 승인 조건",
      ],
      answerIndex: 2,
      explanation:
        "본문은 실패 모드가 NXDOMAIN cache였으면 record 삭제 금지 창을 runbook에 추가한다고 말한다.",
    },
    {
      id: "q25",
      question:
        "recursive resolver cache 장애를 권한 DNS와 분리할 때 첫 경계로 나누는 계층은?",
      choices: [
        "client stub resolver, corporate resolver, public recursive resolver, authoritative server",
        "browser cache, OS cache, CDN edge, origin server",
        "registrar, registry, authoritative nameserver, glue record",
        "listener rule, backend route, health check, TLS policy",
      ],
      answerIndex: 0,
      explanation:
        "본문은 첫 경계를 client stub resolver, corporate resolver, public recursive resolver, authoritative server로 나눈다고 말한다.",
    },
    {
      id: "q26",
      question:
        "resolver cache 장애의 실패 모드가 corporate resolver pinning일 때 별도로 준비하는 것은?",
      choices: [
        "권한 zone rollback 스냅샷",
        "모든 public resolver의 강제 flush 요청",
        "고객 네트워크 담당자에게 전달할 evidence packet",
        "authoritative nameserver 교체 계획",
      ],
      answerIndex: 2,
      explanation:
        "본문은 실패 모드가 corporate resolver pinning이면 고객 네트워크 담당자에게 전달할 evidence packet을 따로 만든다고 말한다.",
    },
    {
      id: "q27",
      question:
        "split-horizon과 private DNS에서 대표적인 실패 모드로 든 것은?",
      choices: [
        "권한 nameserver가 두 view 모두에 동일한 public IP를 반환하는 경우",
        "내부 workload가 public IP를 받아 NAT로 나가거나 외부 사용자가 private IP를 받아 연결하지 못하는 경우",
        "resolver rule이 사라져 두 view가 모두 NXDOMAIN을 받는 경우",
        "TLS 인증서가 private view에서만 SAN mismatch를 내는 경우",
      ],
      answerIndex: 1,
      explanation:
        "본문은 내부 workload가 public IP를 받아 NAT 경로로 나가거나 외부 사용자가 private IP를 받아 연결할 수 없는 경우를 실패 모드로 든다.",
    },
    {
      id: "q28",
      question:
        "private DNS zone association의 누락과 과도한 연결은 각각 어떤 결과를 내나?",
      choices: [
        "둘 다 모든 VPC가 public answer만 받게 된다",
        "누락이면 전체 계정이 NXDOMAIN, 과도하면 resolver rule이 삭제된다",
        "누락이면 TTL이 초기화되고, 과도하면 인증서 SAN이 어긋난다",
        "누락이면 일부 VPC만 NXDOMAIN, 과도한 연결이면 관련 없는 workload가 잘못된 private answer를 받는다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 association 누락이면 일부 VPC만 NXDOMAIN을 받고, 과도한 association이면 관련 없는 workload가 잘못된 private answer를 받는다고 말한다.",
    },
    {
      id: "q29",
      question:
        "CAA record 인계 증거에서 발급 요청과 일치하는지 보는 판단 기준은?",
      choices: [
        "leaf 인증서의 serial, SAN, chain order",
        "resolver별 remaining TTL과 negative cache 상태",
        "issue, issuewild, account binding",
        "registry lock, DS record, glue record",
      ],
      answerIndex: 2,
      explanation:
        "본문은 판단 기준이 issue, issuewild, account binding이 발급 요청과 일치하는지라고 말한다.",
    },
    {
      id: "q30",
      question:
        "certificate SAN 검증에서 'wildcard가 한 label만 덮는다'는 규칙을 놓치면 나타나는 증상은?",
      choices: [
        "깊은 하위 도메인만 실패한다",
        "apex 도메인만 실패한다",
        "모든 SNI가 default certificate를 받는다",
        "IPv6 사용자만 name mismatch를 겪는다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 wildcard가 한 label만 덮는다는 규칙을 놓치면 깊은 하위 도메인만 실패한다고 말한다.",
    },
    {
      id: "q31",
      question:
        "SNI와 Host routing 장애에서 client가 SNI 없이 접속할 때 받는 것은?",
      choices: [
        "handshake가 즉시 거부되어 연결이 끊긴다",
        "default certificate를 받는다",
        "가장 최근에 발급된 wildcard 인증서를 받는다",
        "권한 DNS가 지정한 backend 인증서를 받는다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 client가 SNI 없이 접속해 default certificate를 받는 경우를 실패 모드로 든다.",
    },
    {
      id: "q32",
      question:
        "intermediate chain 검증에서 'AIA fetching에 의존한다'는 것이 만드는 위험은?",
      choices: [
        "최신 브라우저에서만 chain이 완성된다",
        "OCSP stapling이 항상 stale 상태가 된다",
        "모든 client가 동일하게 handshake에 실패한다",
        "사내망이나 mobile network에서만 실패한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 위험이 AIA fetching에 의존해 사내망이나 mobile network에서만 실패하는 경우라고 말한다. 다음 조치는 full chain 배포와 OCSP responder 모니터링이다.",
    },
  ],
};

export default quiz;
