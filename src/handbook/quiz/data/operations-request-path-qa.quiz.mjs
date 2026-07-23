// 서비스 요청 경로 Q&A(operations-request-path-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-request-path-quiz",
  title: "서비스 요청 경로 퀴즈",
  sourceQaId: "operations-request-path-qa",
  questions: [
    {
      id: "q1",
      question:
        "DNS 해석 장애를 판단할 때 가장 먼저 확인해야 하는 것은?",
      choices: [
        "app log에 오류가 없으니 backend는 정상이라고 판단하고 넘긴다",
        "같은 사용자 위치에서 도메인이 어떤 IP와 TTL로 풀리는지 확인한다",
        "load balancer의 target group health 비율을 먼저 확인한다",
        "인증서 chain과 SNI가 기대한 값인지 먼저 확인한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 DNS 판단에서 같은 사용자 위치에서 도메인이 어떤 IP와 TTL로 풀리는지 먼저 확인하고, 권위 DNS·recursive resolver·client cache 중 어느 단계가 문제인지 가른다고 한다. app log가 비었다고 backend 장애로 넘기면 안 된다.",
    },
    {
      id: "q2",
      question:
        "authoritative answer는 새 IP인데 특정 resolver만 이전 IP를 준다면 판단 기준은?",
      choices: [
        "권위 DNS 서버 자체의 장애",
        "target group의 health check 실패",
        "cache 잔존(cache 만료 대기)",
        "TLS policy가 client cipher를 제거한 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 authoritative answer는 새 IP인데 특정 resolver만 이전 IP를 주면 판단 기준은 cache 잔존이라고 명시한다. 후속 조치는 임시로 낮은 TTL이나 이전 endpoint 유지 여부를 결정하는 것이다.",
    },
    {
      id: "q3",
      question:
        "TLS handshake 변경 리뷰에서 판단 기준으로 옳은 것은?",
      choices: [
        "브라우저에서 페이지가 열리면 TLS는 정상이라고 본다",
        "target health가 green이면 handshake도 정상이라고 본다",
        "여러 client 버전에서 handshake가 완료되고 갱신·정책 변경을 즉시 되돌릴 수 있는지 본다",
        "app access log에 traceId가 생성되는지로 판단한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 판단 기준이 브라우저 성공이 아니라 여러 client 버전에서 handshake가 완료되고, 인증서 갱신이나 policy 변경을 즉시 되돌릴 수 있는지라고 한다. TLS가 앞단에서 끊기면 app log와 traceId는 생성되지 않는다.",
    },
    {
      id: "q4",
      question:
        "TLS negotiation은 위험한데 target group은 계속 healthy할 때 먼저 되돌려야 하는 것은?",
      choices: [
        "app 배포를 롤백한다",
        "DB connection pool 크기를 되돌린다",
        "CDN cache rule을 되돌린다",
        "certificate attachment나 TLS policy 변경을 되돌린다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 certificate_unknown·protocol_version·SNI mismatch가 늘지만 target group은 healthy한 경우, app 배포를 되돌리지 말고 certificate attachment나 TLS policy 변경을 먼저 되돌린다고 한다.",
    },
    {
      id: "q5",
      question:
        "CDN/cache 운영 인수에서 가장 먼저 구분해야 하는 것은?",
      choices: [
        "요청이 edge cache에서 끝났는지 origin까지 갔는지",
        "502가 ELB에서 끝났는지 target에서 났는지",
        "pool waiting이 늘었는지 DB active query가 늘었는지",
        "traceId가 gateway에서 생성됐는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 CDN/cache 인수에서 요청이 edge cache에서 끝났는지 origin까지 갔는지 먼저 구분하고, cache status·age·vary key·purge 이력이 증상과 맞는지 본다고 한다.",
    },
    {
      id: "q6",
      question:
        "캐시 HIT가 높은데 특정 path만 오래된 응답을 주는 상황을 backend 장애로 오판하면 생기는 결과는?",
      choices: [
        "origin 로그에 오류가 남아 원인을 빠르게 찾는다",
        "재배포하면 사용자가 정상 응답을 받는다",
        "origin 로그에는 증거가 없고 재배포해도 같은 stale response가 나간다",
        "WAF block 수가 줄어든다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 이 상황을 backend 장애로 보면 origin 로그에는 증거가 없고, 재배포해도 사용자는 같은 stale response를 받는다고 한다. 요청이 edge에서 멈춘 것이기 때문이다.",
    },
    {
      id: "q7",
      question:
        "WAF 차단 장애 완화의 판단 기준으로 옳은 것은?",
      choices: [
        "보안 rule을 전체 해제해 정상 사용자를 즉시 살린다",
        "보안 rule을 전체 해제하지 않고 정상 traffic을 살릴 최소 예외 범위를 찾는다",
        "app만 수정해 정상 사용자 요청을 복구한다",
        "target group에서 불량 instance를 drain한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 WAF 완화의 판단 기준이 보안 rule을 전체 해제하지 않고도 정상 사용자 traffic을 살릴 수 있는 최소 예외 범위라고 한다. 전체를 끄면 공격 노출이 커진다.",
    },
    {
      id: "q8",
      question:
        "WAF 차단 sample에서 정상 사용자 패턴과 공격 패턴이 분리되지 않을 때의 조치는?",
      choices: [
        "특정 rule을 count mode로 바꾼다",
        "만료 시각과 함께 좁은 allow condition을 추가한다",
        "rate limit과 challenge로 피해를 줄인다",
        "WAF를 전체 비활성화한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 증거가 분리되면 rule을 count mode로 바꾸거나 좁은 allow condition을 만료 시각과 함께 추가하고, 분리되지 않으면 rate limit과 challenge로 피해를 줄인다고 한다.",
    },
    {
      id: "q9",
      question:
        "Load Balancer health 장애에서 target group의 healthy 비율만 보면 안 되는 이유는?",
      choices: [
        "health check path가 실제 사용자 path보다 얕으면 모든 target이 healthy여도 502가 날 수 있어서",
        "healthy 비율은 항상 실제 성공률과 일치해서",
        "target group은 5xx를 절대 만들지 않아서",
        "health check가 green이면 사용자 요청도 반드시 정상이어서",
      ],
      answerIndex: 0,
      explanation:
        "본문은 health check path가 실제 사용자 path보다 얕으면 모든 target이 healthy여도 실제 요청은 502를 낼 수 있다고 한다. 어느 target이 어떤 reason code로 빠졌는지 확인해야 한다.",
    },
    {
      id: "q10",
      question:
        "ALB access log에서 502가 ELB에서 끝난 것으로 확인되면 의심할 대상은?",
      choices: [
        "앱 처리 로직의 버그",
        "DNS resolver의 cache 잔존",
        "CDN edge의 stale 응답",
        "target 연결, TLS to target, idle timeout",
      ],
      answerIndex: 3,
      explanation:
        "본문은 elb_status_code와 target_status_code를 나눠, 502가 ELB에서 끝나면 target 연결·TLS to target·idle timeout을 의심하고, target status가 5xx이면 앱 처리 문제로 넘어간다고 한다.",
    },
    {
      id: "q11",
      question:
        "502/503/504를 분리할 때 각 code의 가설로 옳게 짝지은 것은?",
      choices: [
        "502는 timeout budget 초과, 503은 잘못된 upstream 응답, 504는 target 부족",
        "502는 잘못된 upstream 응답·연결 실패, 503은 가용 target·throttling 부족, 504는 timeout budget 초과",
        "502는 throttling 부족, 503은 timeout 초과, 504는 upstream 연결 실패",
        "셋 다 내부 오류로 묶어 동일하게 처리한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 502는 잘못된 upstream 응답이나 연결 실패, 503은 가용 target 또는 throttling 부족, 504는 timeout budget 초과라는 가설을 각각 검증한다고 명시한다.",
    },
    {
      id: "q12",
      question:
        "504인데 instance를 늘리지 않고 WAF만 조정하는 것이 잘못인 이유는?",
      choices: [
        "504는 timeout budget 초과 성격이라 WAF 조정으로는 사용자 실패가 그대로 남기 때문",
        "WAF는 504를 자동으로 해소하기 때문",
        "504는 항상 DB query 튜닝으로 해결되기 때문",
        "504는 반드시 instance 증설로만 해결되기 때문",
      ],
      answerIndex: 0,
      explanation:
        "본문은 504인데 WAF만 조정하거나 503인데 DB query를 튜닝하면 사용자 실패는 그대로 남는다고 한다. 5xx를 내부 오류로 묶으면 완화가 빗나간다.",
    },
    {
      id: "q13",
      question:
        "app access log 운영 인수에서 로그 존재 여부보다 먼저 봐야 하는 것은?",
      choices: [
        "로그의 총 라인 수와 저장 용량",
        "로그 파일의 압축률과 보존 기간",
        "로그 수집기의 CPU 사용률",
        "요청을 식별할 key가 앞단 로그와 이어지는지",
      ],
      answerIndex: 3,
      explanation:
        "본문은 앱 로그가 있는지보다 request id·route·user/tenant·status·latency 등 요청 식별 key가 앞단 로그와 이어져 다음 담당자가 재현 가능한지 먼저 본다고 한다.",
    },
    {
      id: "q14",
      question:
        "앱 로그에는 200만 보이는데 ALB 5xx가 늘어난 경우의 판정은?",
      choices: [
        "앱이 정상이므로 정상으로 인계한다",
        "위험 신호이며 앞단 차단·target 연결 실패·로그 샘플링 누락을 나눠야 한다",
        "ALB 로그가 잘못된 것이므로 무시한다",
        "DB connection pool 고갈이 유일한 원인이다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 앱 로그에 200만 보이는데 ALB 5xx가 늘면 위험이라 하고, ALB 5xx인데 앱 로그가 없으면 앞단 차단·target 연결 실패·로그 샘플링 누락을 나눠야 한다고 한다.",
    },
    {
      id: "q15",
      question:
        "traceId 연결 장애에서 root span은 있는데 downstream span이 없으면 의심할 것은?",
      choices: [
        "tracing SDK나 ingress middleware",
        "권위 DNS의 NXDOMAIN",
        "CDN purge 미반영",
        "propagation header 손실",
      ],
      answerIndex: 3,
      explanation:
        "본문은 root span이 없으면 tracing SDK나 ingress middleware를, root span은 있는데 downstream span이 없으면 propagation header 손실을 본다고 한다.",
    },
    {
      id: "q16",
      question:
        "DB connection pool 장애 판단에서 먼저 나눠야 하는 것은?",
      choices: [
        "요청 지연이 DB 쿼리 시간인지 connection checkout 대기인지",
        "요청이 edge cache에서 끝났는지 origin까지 갔는지",
        "502가 ELB에서 났는지 target에서 났는지",
        "traceId가 gateway에서 생성됐는지",
      ],
      answerIndex: 0,
      explanation:
        "본문은 요청 지연이 DB 쿼리 시간인지 connection checkout 대기인지 먼저 나누고, pool active/idle/waiting·acquire timeout·DB connection limit·slow query가 같은 timeline에서 맞는지 본다고 한다.",
    },
    {
      id: "q17",
      question:
        "pool waiting이 늘고 DB active query는 적을 때 의심 대상으로 옳은 것은?",
      choices: [
        "DB CPU 과부하와 disk I/O 병목",
        "pool sizing, leak, transaction hold",
        "CDN cache key 누락",
        "WAF rule의 과도한 차단",
      ],
      answerIndex: 1,
      explanation:
        "본문은 waiting이 늘고 DB active query는 적으면 pool sizing·leak·transaction hold를 의심하고, 즉시 조치로 leak 의심 route 제한이나 pool timeout을 request timeout보다 짧게 맞춘다고 한다.",
    },
    {
      id: "q18",
      question:
        "timeout budget 변경 리뷰에서 hop 간 timeout 순서의 판단 기준은?",
      choices: [
        "모든 hop의 timeout 값을 동일하게 맞춘다",
        "downstream timeout을 app request timeout보다 항상 길게 잡는다",
        "앞단 timeout이 뒤쪽 timeout보다 길어 불필요한 대기가 생기지 않고 재시도가 전체 budget을 넘지 않게 한다",
        "평균 latency만 기준으로 timeout을 설정한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 앞단 timeout이 뒤쪽 timeout보다 길어 불필요한 대기가 생기지 않고, 재시도가 전체 budget을 넘기지 않는지가 판단 기준이라고 한다. 차단 기준은 downstream timeout이 app request timeout보다 긴 경우다.",
    },
    {
      id: "q19",
      question:
        "지역별 장애 운영 인수에서 전역 평균 대신 먼저 나눠야 하는 것은?",
      choices: [
        "region, edge POP, ISP, availability zone별 성공률",
        "전체 요청의 시간대별 총량",
        "서비스 전체의 평균 응답 시간",
        "배포 marker의 개수",
      ],
      answerIndex: 0,
      explanation:
        "본문은 전역 평균이 아니라 region·edge POP·ISP·availability zone별 성공률을 먼저 나누고, 동일 요청이 어느 지역 경계에서만 실패하는지와 traffic shift 가능성을 본다고 한다.",
    },
    {
      id: "q20",
      question:
        "지역별 장애에서 synthetic probe는 회복됐지만 특정 ISP나 mobile carrier에서 DNS·TLS 실패가 남을 때의 조치는?",
      choices: [
        "전역 정상을 즉시 선언한다",
        "app 배포를 롤백한다",
        "DB failover를 실행한다",
        "GeoDNS 정책·CDN POP 우회·region별 공지를 따로 관리하고 전역 정상 선언을 보류한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 probe는 회복됐지만 특정 ISP나 carrier에서 DNS·TLS 실패가 남으면 위험이라 하고, GeoDNS 정책·CDN POP 우회·region별 공지를 따로 관리하며 전역 정상 선언을 보류한다고 한다.",
    },
    {
      id: "q21",
      question:
        "요청 timeline 장애 완화에서 하나의 요청을 시간선에 놓는 순서로 옳은 것은?",
      choices: [
        "app, DB, load balancer, TLS, TCP, DNS 역순",
        "DNS, TCP, TLS, CDN/WAF, load balancer, app, DB/downstream 순서",
        "load balancer, DNS, app, CDN, DB 임의 순서",
        "CDN, DNS, app, TLS, DB 순서",
      ],
      answerIndex: 1,
      explanation:
        "본문은 한 요청을 DNS·TCP·TLS·CDN/WAF·load balancer·app·DB/downstream 순서로 시간선에 놓고, 첫 지연이나 첫 실패 hop을 찾아 완화가 그 앞뒤 어디에 작용하는지 설명한다고 한다.",
    },
    {
      id: "q22",
      question:
        "요청 timeline에서 첫 실패 hop이 앞단인지 앱 내부인지에 따른 우선 완화가 옳게 짝지어진 것은?",
      choices: [
        "앞단이면 rollback, 앱 내부이면 cache bypass",
        "앞단이든 앱 내부이든 항상 DB 튜닝",
        "앞단이면 traffic shedding, 앱 내부이면 WAF 예외",
        "앞단이면 cache bypass나 WAF 예외, 앱 내부이면 rollback이나 traffic shedding",
      ],
      answerIndex: 3,
      explanation:
        "본문은 첫 실패 hop이 앞단이면 cache bypass나 WAF 예외를, 앱 내부이면 rollback이나 traffic shedding을 우선 적용하고 marker를 남긴다고 한다.",
    },
    {
      id: "q23",
      question:
        "DNS 해석 장애를 '정상'으로 판정할 수 있는 상태는?",
      choices: [
        "backend를 재시작해 app log가 다시 찍히기 시작한 상태",
        "이전 IP로 연결되어 ALB access log가 비는 상태",
        "실패 지역에서도 name lookup·TCP connect·TLS handshake가 같은 target 주소로 이어지고 ALB access log에 요청이 남는 상태",
        "특정 resolver의 lookup 시간이 평상시보다 늘어난 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정상을 실패 지역에서도 name lookup·TCP connect·TLS handshake가 같은 target 주소로 이어지고 ALB access log에 요청이 남는 상태라고 한다. lookup 지연이나 이전 IP 연결로 ALB 로그가 비면 위험이다.",
    },
    {
      id: "q24",
      question:
        "DNS 오판 회수 뒤 다음 변경에서 이전 IP 종료 조건을 어떻게 잡나요?",
      choices: [
        "DNS 배포 전후 synthetic lookup을 여러 region에서 돌리고 이전 IP 종료 조건을 TTL의 두 배 이상으로 잡는다",
        "이전 IP 종료 조건을 TTL과 정확히 동일하게 맞춘다",
        "배포 즉시 이전 IP를 내려 dual serving을 없앤다",
        "모든 recursive resolver의 cache를 강제로 flush한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 다음 변경에서 DNS 배포 전후 synthetic lookup을 여러 region에서 돌리고, 이전 IP 종료 조건을 TTL의 두 배 이상으로 잡는다고 한다.",
    },
    {
      id: "q25",
      question:
        "TLS handshake 변경 승인을 차단해야 하는 기준으로 옳은 것은?",
      choices: [
        "브라우저에서 페이지가 열리지 않는 경우",
        "target health가 red로 바뀐 경우",
        "app access log에 traceId가 생성되지 않는 경우",
        "새 인증서가 모든 hostname을 덮지 못하거나 TLS policy가 지원해야 할 client cipher를 제거한 경우",
      ],
      answerIndex: 3,
      explanation:
        "본문은 승인 차단 기준이 새 인증서가 모든 hostname을 덮지 못하거나 TLS policy가 지원해야 할 client cipher를 제거한 경우라고 한다. 증거가 부족하면 canary listener나 staging endpoint에서 같은 client matrix를 먼저 통과시킨다.",
    },
    {
      id: "q26",
      question:
        "CDN cache freshness 판정에서 '위험'으로 봐야 하는 경우는?",
      choices: [
        "purge 뒤 같은 POP에서 age가 초기화되는 경우",
        "Vary·cookie·query string이 cache key에서 빠져 사용자별 응답이 섞이거나 error caching 때문에 5xx가 짧은 장애 뒤에도 남는 경우",
        "HIT/MISS가 의도한 cache-control과 맞는 경우",
        "purge 후 stale 응답이 사라지는 경우",
      ],
      answerIndex: 1,
      explanation:
        "본문은 위험을 Vary·cookie·query string이 cache key에서 빠져 사용자별 응답이 섞이거나 error caching 때문에 5xx가 짧은 장애 뒤에도 남는 경우라 하고, key 수정 전까지 민감 path를 no-store로 전환한다고 한다.",
    },
    {
      id: "q27",
      question:
        "WAF 차단 완화 뒤 '위험'으로 판정하는 상태는?",
      choices: [
        "같은 요청이 WAF allow/count로 기록되고 ALB access log와 app trace까지 이어지는 상태",
        "예외에 만료 시각이 붙어 있는 상태",
        "block 수는 줄었지만 403 사용자 신고가 남거나 allow rule이 너무 넓은 경우",
        "공격 sample이 incident record에 보존된 상태",
      ],
      answerIndex: 2,
      explanation:
        "본문은 정상을 완화 뒤 같은 요청이 WAF allow/count로 기록되고 ALB·app trace까지 이어지는 상태라 하고, 위험을 block 수만 줄었지만 403 사용자 신고가 남거나 allow rule이 너무 넓은 경우라고 한다.",
    },
    {
      id: "q28",
      question:
        "target은 실제로 정상인데 health check만 실패하면 생기는 결과는?",
      choices: [
        "target이 제외되어 정상 instance에 traffic이 몰리고 connection queue가 커진다",
        "load balancer가 즉시 502를 반환해 사용자 요청이 모두 끊긴다",
        "WAF가 해당 요청을 자동으로 차단한다",
        "traceId propagation이 끊겨 downstream span이 사라진다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 health check만 실패하면 target이 제외되어 정상 instance에 traffic이 몰리고 connection queue가 커진다고 한다. 반대로 health check path가 실제 path보다 얕으면 모두 healthy여도 502가 날 수 있다.",
    },
    {
      id: "q29",
      question:
        "502/503/504 분리 변경 승인을 차단하는 기준으로 옳은 것은?",
      choices: [
        "전체 5xx 총합이 배포 전보다 조금이라도 오른 경우",
        "canary traffic이 전체의 5% 미만인 경우",
        "target response time 평균이 기준선과 같은 경우",
        "배포 marker 이후 특정 code가 기준선보다 오르거나 ALB status와 target status가 다른 결론을 내는 경우",
      ],
      answerIndex: 3,
      explanation:
        "본문은 승인 전 canary traffic에서 502·503·504 비율과 target response time p95를 분리해 보고, 차단 기준을 배포 marker 이후 특정 code가 기준선보다 오르거나 ALB status와 target status가 다른 결론을 내는 경우라고 한다.",
    },
    {
      id: "q30",
      question:
        "traceId 연결 재발 봉쇄에서 '위험'으로 보는 경우는?",
      choices: [
        "실패율 높은 route에서도 trace coverage가 기준 이상인 경우",
        "오류 요청만 sampling에서 빠지거나 async 작업에서 새 trace가 열려 원인 연결이 끊기는 경우",
        "root span에서 DB span까지 이어지는 경우",
        "propagation test가 CI에 포함된 경우",
      ],
      answerIndex: 1,
      explanation:
        "본문은 위험을 오류 요청만 sampling에서 빠지거나 async 작업에서 새 trace가 열려 원인 연결이 끊기는 경우라 하고, 후속으로 propagation test를 CI에 넣고 queue consumer가 parent trace를 받는지 검증한다고 한다.",
    },
    {
      id: "q31",
      question:
        "DB connection pool 크기를 키운 뒤 '위험'으로 봐야 하는 신호는?",
      choices: [
        "pool waiting이 줄고 request latency와 DB connection 수가 함께 안정되는 경우",
        "checkout wait이 별도 지표로 dashboard에 올라간 경우",
        "5xx는 줄었지만 DB max connection 근처에서 lock wait이나 failover 지연이 늘어나는 경우",
        "pool 크기 변경이 임시 조치로 표시된 경우",
      ],
      answerIndex: 2,
      explanation:
        "본문은 위험을 pool을 키운 뒤 5xx는 줄었지만 DB max connection 근처에서 lock wait이나 failover 지연이 늘어나는 경우라 한다. slow query가 원인인데 pool만 키우면 connection limit을 더 빨리 소진한다.",
    },
    {
      id: "q32",
      question:
        "timeout budget에서 '위험'으로 판정하고 즉시 조치가 필요한 경우는?",
      choices: [
        "client는 끊겼는데 app worker가 계속 점유되거나 retry가 같은 downstream을 반복 타격하는 경우",
        "timeout이 가장 가까운 실패 지점에서 빠르게 끝나는 경우",
        "trace에 어느 downstream이 budget을 썼는지 남는 경우",
        "hop별 timeout 값과 p95/p99 latency가 같은 표에 정리된 경우",
      ],
      answerIndex: 0,
      explanation:
        "본문은 위험을 client는 끊겼는데 app worker가 계속 점유되거나 retry가 같은 downstream을 반복 타격하는 경우라 하고, 즉시 조치로 retry budget을 줄이고 circuit breaker를 열어 queue 증가를 막는다고 한다.",
    },
  ],
};

export default quiz;
