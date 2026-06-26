import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.join("public", "handbook");

const docs = [
  {
    file: "operations-roadmap-handbook.html",
    title: "인프라·운영 로드맵",
    subtitle: "서비스를 사용자 요청에서 장애 복구까지 하나의 운영 시스템으로 읽는 기준",
    sections: [
      ["OP-00", "전체 흐름", "인프라·운영은 네트워크, 배포, 모니터링을 따로 외우는 영역이 아니다. 사용자의 요청은 DNS → CDN/WAF → Load Balancer → App → DB 경로를 지나고, 변경은 CI/CD → artifact → environment → runtime → observability → incident response로 검증된다. 이 두 흐름을 한 장에 연결해야 장애 질문과 시스템 설계 질문에 깊이가 생긴다."],
      ["OP-01", "학습 순서", "먼저 요청 경로를 그린다. 그다음 VPC, subnet, route table, NAT, ingress, egress를 붙인다. 이후 DNS, TLS, VPN, Private Endpoint 같은 연결 경계를 이해하고, CI/CD, 컨테이너, IaC, SLO, rollback, DR을 운영 루프로 연결한다."],
      ["OP-02", "운영자가 보는 산출물", "운영 문서는 아키텍처 다이어그램만으로 끝나지 않는다. owner, SLO, dashboard, alert, runbook, rollback plan, RPO/RTO, 변경 이력, 운영 인수 체크리스트가 있어야 다음 사람이 같은 판단을 반복할 수 있다."],
      ["OP-03", "면접 답변 구조", "인프라 질문을 받으면 도구 이름보다 경로, 경계, 실패 모드, 검증 증거를 먼저 말한다. 예를 들어 '배포를 어떻게 운영했나요?'에는 pipeline stage, artifact digest, environment config, smoke test, metric gate, rollback 조건을 순서대로 답한다."],
    ],
  },
  {
    file: "operations-request-path-handbook.html",
    title: "서비스 요청 경로",
    subtitle: "브라우저에서 애플리케이션과 데이터 저장소까지 요청이 지나가는 hop을 분해한다",
    sections: [
      ["REQ-00", "기준 경로", "대표 경로는 DNS → CDN/WAF → Load Balancer → App → DB다. 장애가 나면 사용자의 증상, DNS 해석, TLS handshake, CDN cache, WAF 차단, Load Balancer target health, 애플리케이션 로그, DB connection pool을 같은 시간축에 올린다."],
      ["REQ-01", "DNS와 TLS", "DNS가 잘못되면 애플리케이션 로그가 비어 있을 수 있다. TLS 인증서 만료, SNI 불일치, intermediate chain 누락은 네트워크 연결은 되지만 HTTPS에서 실패하는 전형적인 원인이다. curl -v, openssl s_client, dig 결과를 함께 남긴다."],
      ["REQ-02", "Load Balancer와 health check", "Load Balancer는 단순 분산 장치가 아니라 장애 격리 장치다. health check path가 실제 의존성을 너무 깊게 보거나 너무 얕게 보면 정상 pod가 빠지거나 죽은 앱이 살아 있는 것처럼 보인다. 502는 upstream 연결 실패, 504는 timeout으로 우선 분리한다."],
      ["REQ-03", "앱과 DB 경계", "App → DB 구간은 connection pool, timeout, transaction lock, migration, secret rotation이 얽힌다. 프론트 증상만 보고 API 문제로 단정하지 말고, traceId로 request log, slow query, DB wait event를 이어 본다."],
    ],
  },
  {
    file: "operations-vpc-routing-handbook.html",
    title: "VPC·Subnet·Routing·NAT",
    subtitle: "클라우드 네트워크를 IP 대역, 라우팅, 출입 경로, 응답 경로로 검증한다",
    sections: [
      ["NET-00", "CIDR과 subnet", "VPC CIDR은 RFC 1918 대역을 쓰더라도 사내망, 고객사망, peering, VPN, Private Endpoint와 겹치면 나중에 막힌다. subnet은 public, private, data 계층으로 나누고 AZ 확장과 reserved IP를 고려한다."],
      ["NET-01", "route table", "route table은 패킷의 다음 hop을 정한다. 0.0.0.0/0이 Internet Gateway인지 NAT Gateway인지, 고객사 CIDR이 VPN Gateway로 가는지, 더 구체적인 prefix가 Longest Prefix Match로 우선되는지 확인한다."],
      ["NET-02", "ingress와 egress", "ingress는 외부에서 들어오는 경로이고 egress는 내부에서 나가는 경로다. private subnet의 서버가 외부 API를 호출하려면 NAT, DNS, outbound security group, NACL, return path가 모두 맞아야 한다."],
      ["NET-03", "Private Endpoint", "DB, object storage, managed API를 인터넷으로 나가지 않고 호출해야 할 때 Private Endpoint 또는 PrivateLink 계열을 검토한다. 이때 DNS override와 endpoint policy까지 함께 봐야 트래픽이 의도한 사설 경로로 흐른다."],
    ],
  },
  {
    file: "operations-security-boundary-handbook.html",
    title: "보안 경계",
    subtitle: "외부 공개면, 내부 신뢰 경계, 권한, 비밀 정보를 계층별로 통제한다",
    sections: [
      ["SEC-00", "공개면 줄이기", "인터넷에 공개되는 것은 DNS record, CDN, WAF, Load Balancer 정도로 제한한다. App, DB, cache, queue는 private subnet에 두고 관리 접근은 VPN, bastion, SSO, short-lived credential로 제한한다."],
      ["SEC-01", "WAF와 방화벽", "WAF는 L7의 악성 요청 패턴을 줄이고, security group은 stateful L4 허용 목록을 만든다. NACL은 stateless subnet 경계라 응답 포트까지 고려해야 한다. 차단 로그가 남지 않는 규칙은 운영 중 원인 분석을 어렵게 만든다."],
      ["SEC-02", "IAM과 secret", "IAM은 사람, 서비스, pipeline, workload identity를 분리한다. secret은 repo, image, log, frontend bundle에 들어가면 안 된다. rotation 절차에는 revoke, 재발급, 배포, 영향 범위 확인이 포함된다."],
      ["SEC-03", "검증 질문", "위협 모델링은 public ingress, 인증 우회, 권한 상승, secret 노출, egress 악용, 로그 공백을 먼저 본다. 이 서비스의 public ingress는 어디인가? egress는 어떤 도메인과 포트까지 허용되는가? 관리자 권한은 누가 승인하고 얼마나 유지되는가? 침해 시 어떤 로그로 행위를 추적할 수 있는가?"],
    ],
  },
  {
    file: "operations-dns-tls-handbook.html",
    title: "DNS·TLS·도메인 운영",
    subtitle: "이름 해석, 인증서, 전파, 만료를 변경 관리 대상으로 다룬다",
    sections: [
      ["DNS-00", "DNS record와 TTL", "A, AAAA, CNAME, ALIAS, TXT, CAA record의 목적을 구분한다. TTL은 장애 대응 속도와 resolver 부하 사이의 선택이다. 이전 작업 전 TTL을 낮추고, 작업 후 안정화되면 다시 올린다."],
      ["DNS-01", "split-horizon DNS", "같은 이름이 내부와 외부에서 다른 IP로 해석되는 split-horizon DNS는 VPN, 사내망, Private Endpoint에서 자주 필요하다. 장애 분석 시 사용자가 어느 resolver를 쓰는지 먼저 확인한다."],
      ["DNS-02", "TLS 인증서", "TLS 운영은 인증서 발급만이 아니다. SAN, wildcard 범위, SNI, intermediate chain, OCSP, 자동 갱신, 만료 알림, CAA 정책을 함께 본다. 인증서 교체는 rollback 가능한 변경으로 관리한다."],
      ["DNS-03", "도메인 변경 절차", "도메인 변경에는 사전 TTL 조정, record diff, 인증서 준비, CDN/WAF 연결, smoke test, 전파 모니터링, rollback record가 필요하다. dig, curl -v, openssl s_client 결과를 변경 티켓에 남긴다."],
    ],
  },
  {
    file: "operations-private-connectivity-handbook.html",
    title: "VPN·Private Connectivity",
    subtitle: "사설 연결을 터널 상태가 아니라 서비스 통신 성공 기준으로 검증한다",
    sections: [
      ["VPN-00", "연결 방식", "Site-to-Site VPN은 빠르게 구축할 수 있지만 인터넷 품질과 IPsec 협상에 의존한다. 전용선, Direct Connect, Interconnect, ExpressRoute, Private Endpoint는 비용과 리드타임이 크지만 예측 가능성과 격리가 좋다."],
      ["VPN-01", "IPsec 협상", "IPsec은 Phase 1에서 IKE SA를 만들고 Phase 2에서 데이터 트래픽용 SA를 만든다. encryption, integrity, DH group, PFS, lifetime, PSK, NAT-T, traffic selector가 양쪽에서 일치해야 한다."],
      ["VPN-02", "라우팅과 방화벽", "터널 UP은 충분하지 않다. local CIDR, peer CIDR, route table, security group, 고객사 방화벽, return path가 맞아야 앱 통신이 된다. CIDR overlap은 설계 단계에서 제거해야 한다."],
      ["VPN-03", "운영 증거", "장애 시 터널 상태, rekey 로그, packet counter, tcpdump, nc, curl 결과를 분리해 본다. 고객사에 요청할 때는 source IP, destination IP, port, timestamp, packet evidence를 제공한다."],
    ],
  },
  {
    file: "operations-delivery-pipeline-handbook.html",
    title: "CI/CD·Artifact·Environment",
    subtitle: "배포를 빌드 자동화가 아니라 변경 추적과 복구 시스템으로 설계한다",
    sections: [
      ["CD-00", "pipeline stage", "좋은 pipeline은 install, lint, typecheck, test, build, artifact publish, deploy, smoke test, metric gate가 분리되어 있다. 실패한 stage가 명확해야 재시도와 rollback 판단이 빨라진다."],
      ["CD-01", "artifact", "운영에 배포되는 단위는 branch가 아니라 artifact다. image digest, commit SHA, migration version, config version, build provenance를 묶어야 어떤 코드가 어디에 배포됐는지 추적된다."],
      ["CD-02", "environment", "development, staging, production은 같은 artifact에 다른 environment config를 주입하는 구조가 안정적이다. secret, public config, runtime config를 분리하고 권한 있는 approval 없이 production 변경이 나가지 않게 한다."],
      ["CD-03", "rollback과 release strategy", "rolling, blue-green, canary, feature flag는 모두 rollback 비용을 줄이기 위한 선택지다. DB 변경은 expand-contract로 나누고, rollback이 불가능한 변경은 forward fix와 feature off 절차를 먼저 준비한다."],
    ],
  },
  {
    file: "operations-runtime-orchestration-handbook.html",
    title: "컨테이너·오케스트레이션·Health Check",
    subtitle: "컨테이너를 이미지가 아니라 제한된 런타임과 복구 정책으로 이해한다",
    sections: [
      ["RUN-00", "컨테이너 런타임", "컨테이너는 프로세스, filesystem, network namespace, cgroup 제한을 묶은 실행 단위다. CPU, memory, file descriptor, ephemeral storage 제한을 모르고 운영하면 OOM, throttling, log 폭증을 놓친다."],
      ["RUN-01", "오케스트레이션 객체", "Kubernetes 기준으로 Deployment는 desired state, ReplicaSet은 replica 유지, Pod는 실행 단위, Service는 안정된 discovery, Ingress는 외부 HTTP 진입점이다. label과 selector가 어긋나면 정상 pod도 traffic을 받지 못한다."],
      ["RUN-02", "health check", "readiness는 트래픽을 받아도 되는지, liveness는 재시작이 필요한지, startup probe는 느린 부팅을 보호하는지 판단한다. health check가 DB까지 강하게 묶이면 DB 지연 때 전체 pod가 빠질 수 있다."],
      ["RUN-03", "배포 안정성", "rolling update는 maxUnavailable, maxSurge, pod disruption budget, connection draining, graceful shutdown이 함께 맞아야 무중단에 가까워진다. HPA는 CPU만이 아니라 queue lag, request rate 같은 업무 지표도 후보가 된다."],
    ],
  },
  {
    file: "operations-iac-change-handbook.html",
    title: "IaC·변경관리·Drift",
    subtitle: "인프라 변경을 리뷰 가능한 diff, 상태, 검증, 복구 절차로 관리한다",
    sections: [
      ["IAC-00", "IaC의 목적", "IaC는 콘솔 클릭을 코드로 바꾸는 것이 아니라 변경 이력, 리뷰, 재현성, 감사 가능성을 얻는 방식이다. Terraform, Pulumi, CloudFormation 모두 state와 실제 리소스의 관계를 이해해야 한다."],
      ["IAC-01", "plan과 apply", "plan은 생성, 수정, 교체, 삭제, 권한 변경을 분류해 리뷰한다. apply 전에는 state lock, workspace, provider version, target environment, destructive change를 확인한다."],
      ["IAC-02", "drift", "drift는 코드와 실제 인프라가 달라진 상태다. 콘솔 hotfix, 자동 확장, 외부 시스템 변경이 원인이 된다. drift를 무조건 되돌리지 말고 왜 발생했는지, 코드에 흡수할지, 수동 변경을 금지할지 결정한다."],
      ["IAC-03", "변경 티켓", "운영 인프라 변경에는 목적, 영향 범위, plan 요약, 적용 시간, 검증 명령, rollback 또는 forward fix가 필요하다. DB, DNS, network 변경은 전파와 lock 때문에 더 보수적으로 쪼갠다."],
    ],
  },
  {
    file: "operations-observability-slo-handbook.html",
    title: "Observability·SLO",
    subtitle: "로그, 메트릭, 트레이스를 사용자 영향과 장애 판단으로 연결한다",
    sections: [
      ["OBS-00", "세 신호", "로그는 사건의 세부 맥락, 메트릭은 시간에 따른 수치, 트레이스는 요청 경로를 보여준다. 세 신호가 traceId, service, environment, version으로 연결되어야 장애 시 요청 단위로 원인을 좁힐 수 있다."],
      ["OBS-01", "RED와 USE", "HTTP 서비스는 RED(rate, error, duration)를 먼저 본다. 인프라 리소스는 USE(utilization, saturation, errors)를 본다. p95/p99 latency, error rate, saturation은 평균보다 사용자 영향을 잘 드러낸다."],
      ["OBS-02", "SLO", "SLO는 내부 목표가 아니라 사용자에게 약속할 품질 수준이다. SLI를 정의하고 error budget을 계산하면 모든 경고를 paging하지 않고 사용자 영향이 큰 실패에 집중할 수 있다."],
      ["OBS-03", "SLO burn rate", "SLO burn rate는 error budget이 얼마나 빠르게 소진되는지 보는 방식이다. 짧은 창과 긴 창을 함께 사용하면 급격한 장애와 느린 품질 저하를 모두 잡을 수 있다. 알림에는 owner, dashboard, runbook 링크가 있어야 한다."],
    ],
  },
  {
    file: "operations-incident-dr-handbook.html",
    title: "Incident Response·Rollback·DR",
    subtitle: "장애 대응을 개인 순발력이 아니라 반복 가능한 팀 절차로 만든다",
    sections: [
      ["INC-00", "역할", "장애가 커지면 Incident Commander, scribe, communications owner, subject matter expert를 나눈다. 한 사람이 원인 분석, 의사결정, 공지를 모두 맡으면 시간이 갈수록 판단 품질이 떨어진다."],
      ["INC-01", "초기 대응", "처음 15분에는 사용자 영향, 최근 변경, error budget 소진, 핵심 지표, 우회 가능성을 확인한다. 원인 확정 전에는 rollback, traffic shift, feature flag off 같은 사용자 영향 완화책을 우선 고려한다."],
      ["INC-02", "rollback과 restore", "rollback은 이전 artifact로 돌아가는 것이고 restore는 데이터나 상태를 복구하는 것이다. migration이 포함된 변경은 rollback이 어려울 수 있으므로 expand-contract, backup, restore drill이 필요하다."],
      ["INC-03", "DR과 사후 분석", "DR은 disaster recovery이며 RPO/RTO로 목표를 말한다. RPO는 허용 가능한 데이터 손실, RTO는 복구 시간 목표다. 운영 리허설은 Rollback drill, Restore drill, traffic shift drill로 나누어 실행한다. postmortem은 비난이 아니라 timeline, contributing factors, action item, runbook 개선을 남기는 절차다."],
    ],
  },
  {
    file: "operations-checklist-interview-handbook.html",
    title: "운영 체크리스트·면접 답변",
    subtitle: "실제 운영 인수와 기술면접 답변에 바로 쓰는 압축 기준",
    sections: [
      ["CHK-00", "운영 인수", "운영 인수에는 owner, escalation, architecture diagram, DNS, TLS 인증서, secret 위치, deployment pipeline, dashboard, alert, runbook, rollback, backup, RPO/RTO, 비용 owner가 포함되어야 한다."],
      ["CHK-01", "배포 전 체크", "변경 범위, artifact, migration, config, secret, feature flag, smoke test, metric gate, rollback 조건을 확인한다. 하나라도 말로만 존재하면 운영 준비가 끝난 것이 아니다."],
      ["CHK-02", "장애 대응 체크", "증상, 영향 범위, 시작 시각, 최근 변경, 주요 metric, log, trace, 의사결정, 사용자 공지, 복구 시각을 기록한다. 장애가 끝난 뒤에는 runbook과 alert를 반드시 업데이트한다."],
      ["CHK-03", "면접 답변", "인프라·운영 질문에는 '요청 경로를 먼저 그리고, 실패 지점을 계층별로 좁혔고, 배포와 rollback은 artifact와 metric gate로 통제했으며, 장애 후에는 SLO와 runbook을 개선했다'는 구조로 답한다. 직접 해본 일과 설계 지식의 경계도 함께 말한다."],
    ],
  },
  {
    file: "operations-cloud-scenarios-handbook.html",
    title: "AWS·Azure 실전 시나리오",
    subtitle: "실제 클라우드 서비스를 조합해 웹 서비스, 내부 API, 데이터, 관측, 복구 사례를 설계한다",
    sections: [
      ["CLD-00", "웹 서비스 기본 구성", "AWS에서는 Route 53, CloudFront, AWS WAF, Application Load Balancer, ECS Fargate 또는 EKS, RDS, ElastiCache, S3, CloudWatch를 조합한다. Azure에서는 Azure DNS, Azure Front Door, WAF policy, Application Gateway, AKS 또는 App Service, Azure SQL, Azure Cache for Redis, Blob Storage, Azure Monitor를 대응시킨다."],
      ["CLD-01", "사설 네트워크와 데이터 경계", "AWS는 VPC, public/private subnet, NAT Gateway, Security Group, VPC Endpoint, AWS PrivateLink로 경계를 만든다. Azure는 VNet, subnet, NAT Gateway, Network Security Group, Private Endpoint, Private Link, Private DNS Zone을 조합한다. 핵심은 DB와 관리형 서비스가 인터넷을 거치지 않게 하는 것이다."],
      ["CLD-02", "Secret과 배포", "AWS에서는 IAM role, Secrets Manager, Parameter Store, ECR, CodePipeline 또는 GitHub Actions를 사용한다. Azure에서는 Microsoft Entra ID, Managed Identity, Key Vault, Azure Container Registry, Azure DevOps 또는 GitHub Actions를 연결한다. secret은 build artifact에 넣지 않고 runtime 주입과 rotation 절차를 둔다."],
      ["CLD-03", "장애와 비용 사례", "CloudFront나 Azure Front Door 캐시 설정 오류는 stale content를 만들고, NAT Gateway 비용 폭증은 private subnet egress 설계가 잘못됐다는 신호일 수 있다. RDS/Azure SQL connection pool 고갈, ALB/Application Gateway health probe 실패, AKS/EKS rollout 실패는 지표와 로그를 같은 릴리스 단위로 묶어야 빠르게 좁힌다."],
    ],
  },
];

const detailsByFile = {
  "operations-roadmap-handbook.html": {
    checklist: ["요청 흐름과 배포 흐름을 한 장에 연결한다.", "owner, SLO, dashboard, alert, runbook, rollback plan을 확인한다.", "단일 실패 지점과 수동 복구 지점을 표시한다.", "운영 인수 전에 Rollback drill과 Restore drill을 실행한다."],
    scenario: "신규 서비스를 런칭하기 전 운영 준비도 리뷰를 진행한다. 요청 경로는 DNS, CDN/WAF, Load Balancer, App, DB로 그려 보고, 변경 경로는 CI/CD, artifact, environment, runtime, observability, incident response로 확인한다. 빠진 항목은 런칭 후 장애가 아니라 런칭 전 차단 이슈로 다룬다.",
    pitfalls: ["아키텍처 다이어그램은 있지만 알림 owner가 없다.", "배포 절차는 있지만 rollback 검증이 없다.", "SLO가 없어서 장애와 단순 오류를 같은 우선순위로 처리한다.", "운영 인수 문서가 사람 이름과 구두 설명에 의존한다."],
    interview: "인프라·운영은 요청 경로와 변경 경로를 함께 보는 영역이라고 답합니다. 사용자의 요청은 DNS부터 DB까지 계층별로 흐르고, 코드 변경은 artifact와 환경 설정, 런타임, 관측, 장애 대응 절차를 거쳐 안전해집니다. 저는 각 단계의 실패 모드와 검증 증거를 연결해 운영 준비도를 판단하겠습니다.",
  },
  "operations-request-path-handbook.html": {
    checklist: ["사용자 증상, 지역, 시간, 브라우저 조건을 먼저 기록한다.", "DNS, TLS, CDN/WAF, Load Balancer, App, DB 로그를 같은 시간축에 맞춘다.", "502, 503, 504, timeout, TLS error를 분리한다.", "traceId로 프론트, API, DB 관측 신호를 연결한다."],
    scenario: "특정 시간대에 로그인 API가 간헐적으로 504를 반환한다. 먼저 DNS와 TLS가 정상인지 배제하고, CDN/WAF 차단 로그와 Load Balancer target health를 본다. 그 다음 App의 request latency와 DB connection pool 대기를 확인해 timeout이 어디에서 시작됐는지 좁힌다.",
    pitfalls: ["프론트 화면 오류만 보고 API 코드부터 수정한다.", "Load Balancer health check가 통과하면 애플리케이션도 정상이라고 단정한다.", "TLS 인증서 문제를 네트워크 장애로 오해한다.", "DB lock wait와 API timeout을 별개 사건으로 본다."],
    interview: "요청 장애는 DNS → CDN/WAF → Load Balancer → App → DB 순서로 좁힌다고 답합니다. 각 hop마다 볼 증거가 다르기 때문에 dig, curl -v, LB target health, 애플리케이션 로그, DB slow query를 같은 시간축에 놓고 판단합니다.",
  },
  "operations-vpc-routing-handbook.html": {
    checklist: ["CIDR overlap과 reserved IP를 설계 단계에서 확인한다.", "public, private, data subnet의 route table을 분리한다.", "ingress와 egress를 각각 source, destination, port, policy로 검증한다.", "Private Endpoint 사용 시 DNS override와 endpoint policy를 같이 본다."],
    scenario: "private subnet의 배치 작업이 외부 결제 API를 호출하지 못한다. route table의 0.0.0.0/0이 NAT로 향하는지, security group outbound와 NACL 응답 포트가 열려 있는지, DNS가 public endpoint를 해석하는지, return path가 가능한지 순서대로 확인한다.",
    pitfalls: ["subnet 이름에 private가 붙었다고 인터넷이 차단됐다고 단정한다.", "outbound만 열고 return path와 ephemeral port를 보지 않는다.", "NAT 비용과 가용성을 고려하지 않는다.", "Private Endpoint를 만들고 DNS 설정을 놓친다."],
    interview: "VPC 문제는 CIDR, subnet, route table, security policy, DNS, return path 순서로 설명합니다. 특히 private subnet의 egress는 NAT나 Private Endpoint가 있어야 하며, ingress와 egress를 분리해서 검증해야 합니다.",
  },
  "operations-security-boundary-handbook.html": {
    checklist: ["public ingress를 DNS, CDN/WAF, Load Balancer로 제한한다.", "IAM은 사람, workload, pipeline 권한을 분리한다.", "secret은 repo, image, log, frontend bundle에 남지 않게 한다.", "위협 모델링으로 인증 우회, 권한 상승, egress 악용을 점검한다."],
    scenario: "외부 공개 API를 신규 오픈한다. WAF rule과 rate limit을 먼저 적용하고, Load Balancer 뒤의 App은 private subnet에 둔다. IAM은 배포 권한과 운영 조회 권한을 분리하고, 인증 실패·차단·권한 거부 로그가 관측 시스템으로 들어오는지 확인한다.",
    pitfalls: ["보안 그룹을 0.0.0.0/0으로 열고 WAF만 믿는다.", "admin 권한을 장기 access key로 운영한다.", "secret rotation을 배포 절차와 연결하지 않는다.", "차단 로그가 없어 false positive와 공격을 구분하지 못한다."],
    interview: "보안 경계는 공개면 최소화, 네트워크 통제, IAM 최소 권한, secret 관리, 감사 로그로 나눠 답합니다. WAF와 방화벽은 역할이 다르고, 침해를 완전히 막는 것보다 탐지와 피해 제한까지 설계하는 것이 중요합니다.",
  },
  "operations-dns-tls-handbook.html": {
    checklist: ["record 종류와 TTL 변경 계획을 사전에 작성한다.", "CAA, SAN, wildcard, SNI, intermediate chain을 확인한다.", "인증서 만료 알림과 자동 갱신 실패 알림을 둔다.", "도메인 변경 전후 dig, curl, openssl 결과를 기록한다."],
    scenario: "도메인을 새 CDN으로 이전한다. 24~48시간 전에 TTL을 낮추고, 새 CDN에 인증서를 미리 붙인다. CAA와 DNS record diff를 리뷰하고, 일부 트래픽으로 smoke test를 수행한 뒤 문제가 생기면 이전 record로 rollback한다.",
    pitfalls: ["TTL을 작업 직전에 낮추면 이미 늦다.", "인증서가 발급됐다는 이유로 SNI와 chain 검증을 생략한다.", "내부 resolver와 외부 resolver 결과 차이를 놓친다.", "CNAME flattening이나 ALIAS 동작을 provider마다 같다고 가정한다."],
    interview: "DNS와 TLS 운영은 record 변경, 전파, 인증서, 갱신, rollback을 함께 다루는 변경 관리라고 답합니다. dig와 openssl로 실제 사용자가 보는 이름 해석과 인증서 체인을 검증해야 합니다.",
  },
  "operations-private-connectivity-handbook.html": {
    checklist: ["local/peer CIDR, tunnel endpoint, Phase 1/2 값을 표로 합의한다.", "터널 UP과 애플리케이션 통신 성공을 분리해 검증한다.", "route table, 방화벽, return path, DNS를 양쪽에서 확인한다.", "장애 시 전달할 packet evidence 양식을 미리 정한다."],
    scenario: "고객사 ERP와 Site-to-Site VPN을 연결한다. CIDR overlap을 먼저 확인하고, IPsec proposal을 양쪽 문서로 맞춘다. 터널이 올라온 뒤에는 ICMP가 아니라 실제 API port와 DB port를 nc, tcpdump, 애플리케이션 health check로 검증한다.",
    pitfalls: ["VPN 터널 UP을 서비스 연동 완료로 착각한다.", "고객사 방화벽 변경 담당자와 시간을 맞추지 않는다.", "Phase 2 traffic selector가 실제 CIDR과 다르다.", "DNS forwarder가 없어 IP로만 임시 테스트하고 끝낸다."],
    interview: "VPN은 암호화 터널, 라우팅, 방화벽, DNS, 애플리케이션 포트 검증이 모두 맞아야 한다고 답합니다. Phase 1/2 협상과 서비스 통신 성공을 구분하는 것이 핵심입니다.",
  },
  "operations-delivery-pipeline-handbook.html": {
    checklist: ["install, test, build, artifact publish, deploy, smoke test를 stage로 분리한다.", "commit SHA, image digest, migration version, config version을 release note에 묶는다.", "environment별 approval과 secret 주입 경계를 둔다.", "rollback trigger와 metric gate를 배포 전에 정한다."],
    scenario: "staging에서는 정상인데 production 배포 후 오류율이 증가한다. 배포된 artifact digest와 config version을 먼저 확인하고, feature flag를 끄거나 이전 artifact로 rollback한다. 이후 pipeline에 production smoke test와 error rate gate를 추가한다.",
    pitfalls: ["branch 이름만 보고 어떤 artifact가 배포됐는지 모른다.", "CI 통과를 운영 배포 가능성과 동일하게 본다.", "DB migration rollback 가능성을 확인하지 않는다.", "production secret을 build-time bundle에 섞는다."],
    interview: "CI/CD는 자동화가 아니라 변경 통제 시스템이라고 답합니다. 같은 artifact를 환경별 설정으로 승격하고, 배포 후 smoke test와 metric gate를 통과해야 하며, 실패 시 rollback 또는 feature off 절차가 있어야 합니다.",
  },
  "operations-runtime-orchestration-handbook.html": {
    checklist: ["readiness, liveness, startup probe의 목적을 분리한다.", "resource request/limit과 실제 사용량을 비교한다.", "service selector, ingress rule, connection draining을 점검한다.", "graceful shutdown과 rolling update 조건을 부하 상황에서 검증한다."],
    scenario: "배포 중 일부 요청이 502로 실패한다. 새 pod가 readiness 통과 전에 트래픽을 받는지, 종료 pod가 connection draining 없이 내려가는지, graceful shutdown 시간보다 terminationGracePeriod가 짧은지 확인한다.",
    pitfalls: ["liveness probe로 DB 상태까지 검사해 전체 pod를 재시작시킨다.", "readiness 없이 rolling update만 설정한다.", "resource limit만 두고 request를 비워 scheduling을 불안정하게 만든다.", "HPA를 CPU 하나로만 판단한다."],
    interview: "컨테이너 운영은 image 실행이 아니라 desired state, health check, resource isolation, traffic routing, graceful shutdown을 맞추는 일이라고 답합니다. readiness와 liveness를 구분하는 것이 무중단 배포의 기본입니다.",
  },
  "operations-iac-change-handbook.html": {
    checklist: ["plan diff를 생성, 수정, 교체, 삭제, 권한 변경으로 분류한다.", "state lock, workspace, provider version, module version을 확인한다.", "drift 원인을 콘솔 hotfix, 외부 자동화, 코드 누락으로 나눈다.", "적용 후 검증 명령과 forward fix를 티켓에 남긴다."],
    scenario: "Terraform plan에서 Load Balancer가 replace로 표시된다. 단순 apply가 아니라 왜 교체가 필요한지, downtime이 발생하는지, create-before-destroy가 가능한지, DNS와 target group 영향이 무엇인지 리뷰한 뒤 적용 여부를 결정한다.",
    pitfalls: ["plan을 보지 않고 apply를 실행한다.", "drift를 무조건 코드로 덮어써 운영 hotfix를 잃는다.", "state 파일 권한과 locking을 가볍게 본다.", "리소스 이름 변경이 실제 destroy/create로 이어지는 것을 놓친다."],
    interview: "IaC는 인프라를 코드로 적는 것이 아니라 변경 리뷰와 재현성을 얻는 방식이라고 답합니다. plan, state, drift, apply 후 검증, rollback 또는 forward fix가 모두 절차에 포함되어야 합니다.",
  },
  "operations-observability-slo-handbook.html": {
    checklist: ["SLI를 사용자 행동과 연결해 정의한다.", "RED, USE, p95/p99, error rate, saturation을 구분한다.", "log, metric, trace를 traceId와 version으로 연결한다.", "SLO burn rate와 error budget 기준으로 알림 우선순위를 나눈다."],
    scenario: "새 릴리스 후 p99 latency만 증가하고 error rate는 안정적이다. 평균 latency가 아니라 tail latency를 보고, trace에서 특정 downstream 호출이 느려졌는지 확인한다. SLO burn rate가 빠르게 증가하면 paging하고, 느린 소진이면 ticket으로 관리한다.",
    pitfalls: ["CPU 알림만 많고 사용자 영향 알림이 없다.", "로그는 있지만 traceId가 없어 요청 단위 분석이 안 된다.", "high-cardinality label을 무분별하게 추가해 비용과 성능을 망친다.", "SLO 없이 모든 경고를 같은 심각도로 보낸다."],
    interview: "관측 가능성은 로그, 메트릭, 트레이스를 모으는 것이 아니라 장애 판단 시간을 줄이는 설계라고 답합니다. SLO와 error budget을 기준으로 알림을 나누고, burn rate로 빠른 장애와 느린 품질 저하를 구분합니다.",
  },
  "operations-incident-dr-handbook.html": {
    checklist: ["Incident Commander, scribe, communications owner를 지정한다.", "최근 변경, 사용자 영향, 완화책, 복구 ETA를 먼저 정리한다.", "rollback, restore, traffic shift, feature off 후보를 비교한다.", "postmortem에서 timeline, contributing factor, action item을 남긴다."],
    scenario: "배포 직후 결제 성공률이 급락한다. Incident Commander가 역할을 나누고, 배포 artifact와 feature flag를 확인한다. 원인 분석과 별개로 rollback 또는 flag off로 사용자 영향을 줄인 뒤, 결제 누락 데이터가 있는지 restore와 reconciliation 절차를 실행한다.",
    pitfalls: ["원인 확정 전까지 완화 조치를 미룬다.", "장애 채널에서 모두가 동시에 명령한다.", "백업은 있지만 Restore drill을 해본 적이 없다.", "postmortem이 비난이나 사건 요약으로 끝난다."],
    interview: "장애 대응은 역할 분리, 영향 완화, 원인 분석, 복구 검증, 사후 개선의 순서로 답합니다. DR은 RPO/RTO로 목표를 정의하고 Rollback drill과 Restore drill로 실제 복구 가능성을 검증해야 합니다.",
  },
  "operations-checklist-interview-handbook.html": {
    checklist: ["owner, escalation, dashboard, alert, runbook을 운영 인수 표에 채운다.", "배포 전 artifact, migration, config, secret, rollback을 확인한다.", "장애 대응 기록 양식과 사용자 공지 기준을 준비한다.", "면접 답변은 직접 경험, 일부 경험, 설계 지식을 구분해 말한다."],
    scenario: "서비스를 다른 팀에서 인수받는다. 아키텍처 다이어그램만 받지 않고 DNS, TLS, 배포 pipeline, secret 위치, SLO, dashboard, alert, backup, RPO/RTO, 비용 owner까지 확인한다. 빠진 항목은 인수 후 리스크로 남기지 않고 인수 조건으로 되돌린다.",
    pitfalls: ["운영 인수를 코드 저장소 권한 이전으로 끝낸다.", "면접에서 도구 이름만 나열하고 실패 모드와 검증 증거를 말하지 않는다.", "runbook이 있지만 최신 배포 구조와 다르다.", "장애 대응 권한과 승인자가 불분명하다."],
    interview: "운영 경험을 말할 때는 요청 경로, 배포 경로, 관측 지표, 장애 대응, 인수 산출물을 순서대로 설명합니다. 직접 한 일은 구체적 증거로 말하고, 설계 지식은 어떤 기준으로 검증하겠다고 구분합니다.",
  },
  "operations-cloud-scenarios-handbook.html": {
    checklist: ["AWS와 Azure에서 같은 역할을 하는 서비스를 1:1로 외우지 말고 edge, network, runtime, data, identity, observability 책임으로 매핑한다.", "Route 53/Azure DNS, CloudFront/Azure Front Door, ALB/Application Gateway, ECS Fargate·EKS/AKS·App Service, RDS/Azure SQL 조합을 요청 경로로 그린다.", "Secrets Manager 또는 Key Vault, IAM role 또는 Managed Identity, PrivateLink 또는 Private Endpoint를 보안 경계에 포함한다.", "CloudWatch 또는 Azure Monitor에서 RED 지표, DB connection, health probe, deployment version을 같은 대시보드에 둔다."],
    scenario: "B2B SaaS 관리자 서비스를 클라우드에 배포한다. AWS안은 Route 53 → CloudFront/WAF → Application Load Balancer → ECS Fargate → RDS Multi-AZ와 ElastiCache로 구성하고, secret은 Secrets Manager, 이미지는 ECR, 로그와 알림은 CloudWatch로 둔다. Azure안은 Azure DNS → Azure Front Door/WAF → Application Gateway → AKS 또는 App Service → Azure SQL zone redundant 구성과 Azure Cache for Redis로 구성하고, secret은 Key Vault, 이미지는 ACR, 로그와 알림은 Azure Monitor로 둔다.",
    pitfalls: ["AWS 서비스명과 Azure 서비스명을 단순 번역해서 같은 장애 특성을 가진다고 가정한다.", "CloudFront나 Azure Front Door 뒤에 origin timeout, cache policy, WAF rule 변경 이력을 남기지 않는다.", "NAT Gateway 또는 egress 비용을 보지 않아 private subnet의 외부 호출 비용이 폭증한다.", "RDS/Azure SQL 백업은 켜져 있지만 restore drill과 connection pool 장애 대응이 없다."],
    interview: "실제 클라우드 구성 질문에는 먼저 역할을 나눠 답합니다. DNS는 Route 53 또는 Azure DNS, edge는 CloudFront 또는 Azure Front Door, L7 진입점은 Application Load Balancer 또는 Application Gateway, 런타임은 ECS Fargate/EKS 또는 AKS/App Service, 데이터는 RDS 또는 Azure SQL, secret은 Secrets Manager 또는 Key Vault로 설명합니다. 이후 private network, observability, rollback, 비용과 DR까지 연결합니다.",
  },
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderList = (items) =>
  `<ul>
${items.map((item) => `          <li>${escapeHtml(item)}</li>`).join("\n")}
        </ul>`;

const render = (doc) => {
  const detail = detailsByFile[doc.file];
  const docId = doc.file.replace("-handbook.html", "").toUpperCase();
  const navBrand = `OPERATIONS · ${doc.title.split("·")[0].replace(/[^A-Za-z가-힣0-9]/g, " ").trim().toUpperCase()}`;
  const navTitle = doc.title;
  const navItems = [
    { code: "INDEX", title: "문서 구조" },
    ...doc.sections.map(([code, title]) => ({ code, title })),
    { code: "MODEL", title: "개념 모델" },
    { code: "CHECK", title: "실무 체크리스트" },
    { code: "CASE", title: "장애/운영 시나리오" },
    { code: "RISK", title: "자주 틀리는 판단" },
    { code: "Q&A", title: "면접 답변 템플릿" },
  ];
  const nav = navItems
    .map(({ code, title }, index) => `  <a href="#ch${index === 0 ? "index" : index}"><span class="code">${code}</span>${escapeHtml(title)}</a>`)
    .join("\n");
  const sections = doc.sections
    .map(([code, title, body], index) => `
      <section id="ch${index + 1}">
        <div class="ch-head"><span class="ch-code">${code}</span><h2>${escapeHtml(title)}</h2></div>
        <p class="lede">${escapeHtml(body)}</p>
        <table>
          <tr><th>판단 질문</th><th>검증 증거</th><th>운영 리스크</th></tr>
          <tr>
            <td>${escapeHtml(title)}이 실제 서비스 경로에서 어떤 책임을 갖는가?</td>
            <td>설정 diff, 로그, 메트릭, trace, smoke test 결과</td>
            <td>말로는 이해했지만 장애 시 어느 계층을 볼지 정해지지 않음</td>
          </tr>
          <tr>
            <td>변경되면 어떤 사용자 영향과 rollback 조건이 생기는가?</td>
            <td>변경 티켓, 승인 기록, 배포 후 지표, runbook 링크</td>
            <td>복구 절차가 담당자 기억에 의존함</td>
          </tr>
        </table>
      </section>`)
    .join("\n");
  const detailStart = doc.sections.length + 1;
  const detailSections = `
      <section id="ch${detailStart}">
        <div class="ch-head"><span class="ch-code">MODEL</span><h2>개념 모델</h2></div>
        <p class="lede">${escapeHtml(doc.title)}은 단일 지식 항목이 아니라 운영 판단의 일부다. 아래 표처럼 개념을 책임, 확인 지표, 실패 신호로 나누면 면접 답변과 실제 장애 대응이 모두 선명해진다.</p>
        <table>
          <tr><th>구성 요소</th><th>운영 책임</th><th>확인할 증거</th></tr>
${doc.sections.map(([code, title, body]) => `          <tr><td>${code} · ${escapeHtml(title)}</td><td>${escapeHtml(body)}</td><td>설정, 로그, 지표, 변경 이력, 재현 명령</td></tr>`).join("\n")}
        </table>
      </section>

      <section id="ch${detailStart + 1}">
        <div class="ch-head"><span class="ch-code">CHECK</span><h2>실무 체크리스트</h2></div>
        <p class="lede">작업 전에는 무엇을 바꿀지보다 무엇을 깨뜨릴 수 있는지를 먼저 본다. 체크리스트는 리뷰와 운영 인수에서 그대로 사용할 수 있어야 한다.</p>
        ${renderList(detail.checklist)}
        <table>
          <tr><th>작업 단계</th><th>필수 산출물</th><th>차단 기준</th></tr>
          <tr><td>설계</td><td>목적, 영향 범위, 비목표, owner</td><td>영향 범위가 사용자·시스템·비용 기준으로 설명되지 않음</td></tr>
          <tr><td>변경</td><td>diff, 승인 기록, 검증 명령</td><td>production 변경과 staging 검증의 차이가 설명되지 않음</td></tr>
          <tr><td>복구</td><td>rollback 또는 forward fix, 담당자, 예상 시간</td><td>실패 시 되돌릴 수 없는데 사전 승인과 공지가 없음</td></tr>
        </table>
      </section>

      <section id="ch${detailStart + 2}">
        <div class="ch-head"><span class="ch-code">CASE</span><h2>장애/운영 시나리오</h2></div>
        <p class="lede">${escapeHtml(detail.scenario)}</p>
        <div class="callout">
          <span class="co-label">Triage frame</span>
          <p>증상 → 영향 범위 → 최근 변경 → 계층별 증거 → 완화책 → 복구 검증 → 재발 방지 순서로 기록한다. 이 순서가 없으면 원인 분석이 사람마다 달라진다.</p>
        </div>
        <table>
          <tr><th>처음 10분</th><th>다음 30분</th><th>종료 조건</th></tr>
          <tr><td>사용자 영향과 최근 변경을 확인한다.</td><td>계층별 증거를 모아 완화책을 실행한다.</td><td>지표 회복, 재현 불가, owner 확인, 기록 완료</td></tr>
        </table>
      </section>

      <section id="ch${detailStart + 3}">
        <div class="ch-head"><span class="ch-code">RISK</span><h2>자주 틀리는 판단</h2></div>
        <p class="lede">운영 품질은 아는 개념보다 틀린 가정을 빨리 찾는 능력에서 갈린다. 아래 신호가 보이면 설계나 답변을 다시 점검한다.</p>
        ${renderList(detail.pitfalls)}
      </section>

      <section id="ch${detailStart + 4}">
        <div class="ch-head"><span class="ch-code">Q&A</span><h2>면접 답변 템플릿</h2></div>
        <p class="lede">${escapeHtml(detail.interview)}</p>
        <div class="serial-card">
          <span class="sc-label">ANSWER SHAPE</span>
          1. 한 줄 결론<br>
          2. 핵심 개념과 책임 경계<br>
          3. 실무에서 깨지는 지점<br>
          4. 검증 명령 또는 관측 증거<br>
          5. rollback, runbook, 운영 인수 기준
        </div>
      </section>`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(doc.title)} | Dev Handbook</title>
</head>
<body>
<div class="shell">
<nav aria-label="목차">
<div class="nav-brand">${escapeHtml(navBrand)}</div>
  <div class="nav-title">${escapeHtml(navTitle)}</div>
${nav}
</nav>
<main>
<header class="hero">
  <div class="hero-serial">
    <span>DOC : ${escapeHtml(docId)}</span>
    <span>SCOPE : OPERATIONS · RELIABILITY · INCIDENT RESPONSE</span>
    <span>LANG : KO</span>
  </div>
  <h1>${escapeHtml(doc.title)}</h1>
  <p class="hero-sub">${escapeHtml(doc.subtitle)}</p>
  <div class="hero-meta">FORMAT : 개념 → 체크리스트 → 시나리오 → 리스크 → 면접 답변 · UPDATED 2026-06</div>
</header>

<section id="chindex">
<div class="ch-head"><span class="ch-code">INDEX</span><h2>문서 구조</h2></div>
<p class="lede">이 문서는 다른 핸드북과 같은 구조로 읽습니다. 먼저 핵심 개념을 잡고, 표와 체크리스트로 운영 판단 기준을 만든 뒤, 장애 시나리오와 면접 답변 템플릿으로 실전 적용까지 연결합니다.</p>
<ul><li>핵심 개념</li><li>검증 증거와 운영 리스크</li><li>실무 체크리스트</li><li>장애/운영 시나리오</li><li>면접 답변 템플릿</li></ul>
</section>
${sections}
${detailSections}
<footer>
OPERATIONS HANDBOOK · 2026-06<br>
PRINCIPLE : 운영 지식은 경로, 증거, 복구 절차로 검증한다.
</footer>
</main>
</div>
</body>
</html>
`;
};

await mkdir(outputDir, { recursive: true });

for (const doc of docs) {
  await writeFile(path.join(outputDir, doc.file), render(doc), "utf8");
}
