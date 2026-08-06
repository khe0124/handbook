import { RoadmapPage, type RoadmapProcessStep, type RoadmapTrack } from "./RoadmapPage";

const diagram = `
flowchart TD
  A["01 SLO"] --> B["02 Network"]
  B --> C["03 Edge"]
  C --> D["04 VPC"]
  D --> E["05 Runtime"]
  E --> F["06 CI/IaC"]
  F --> G["07 관측"]
  G --> H["08 복구·비용"]
  H --> A
`;

const process: RoadmapProcessStep[] = [
  {
    title: "서비스 목표 정의",
    output: "SLO, availability target, latency budget, data durability, compliance, 비용 상한을 먼저 고정한다.",
    checks: ["인프라 선택이 서비스 목표와 연결된다", "비용과 복구 목표가 함께 논의된다", "error budget이 배포 속도와 안정성 판단에 쓰인다", "RTO/RPO와 데이터 보존 요구가 숫자로 남는다"],
    handoff: "요청 경로와 장애 영향도 모델의 기준선이 된다.",
  },
  {
    title: "요청 경로 설계",
    output: "DNS, CDN, WAF, LB, subnet, app, DB, external dependency까지 사용자 요청 흐름을 hop 단위로 그린다.",
    checks: ["장애 지점을 hop 단위로 좁힐 수 있다", "public/private 경계가 명확하다", "TLS 종료 지점과 header 전달 규칙이 표시된다", "downstream 장애가 사용자 영향으로 어떻게 번지는지 보인다"],
    handoff: "VPC, IAM, security group, observability 태그 설계로 이어진다.",
  },
  {
    title: "플랫폼 구성",
    output: "compute, container, orchestration, secret, IAM, storage, network policy를 IaC와 review 가능한 변경 단위로 관리한다.",
    checks: ["콘솔 수동 변경이 drift로 잡힌다", "권한은 최소 권한으로 설명된다", "health check와 resource request가 workload 특성에 맞다", "secret rotation과 config drift 탐지가 운영 절차에 포함된다"],
    handoff: "CI/CD와 환경 승격 정책의 배포 대상이 된다.",
  },
  {
    title: "배포와 변경관리",
    output: "CI/CD, artifact, environment promotion, IaC plan, rollback, feature flag, migration 순서를 하나의 변경 흐름으로 연결한다.",
    checks: ["배포 실패 시 복구 경로가 자동화되어 있다", "migration과 인프라 변경 순서가 맞다", "같은 artifact가 dev, stage, prod로 승격된다", "plan diff와 security scan 결과가 리뷰에 남는다"],
    handoff: "배포 후 관측 창과 incident 기준을 여는 트리거가 된다.",
  },
  {
    title: "관측과 운영",
    output: "log, metric, trace, synthetic check, SLO alert, runbook, on-call routing을 하나의 운영 체계로 묶는다.",
    checks: ["알림이 사용자 영향 기준으로 울린다", "runbook에 검증 명령이 있다", "로그·메트릭·트레이스가 같은 request id나 release id로 연결된다", "synthetic check가 내부 health check의 사각지대를 보완한다"],
    handoff: "장애 대응, DR 훈련, 비용·용량 최적화의 입력 데이터가 된다.",
  },
  {
    title: "복구와 최적화",
    output: "Incident, DR, backup restore, capacity, cost, security review를 주기적으로 반복하고 action item을 닫는다.",
    checks: ["복구 목표가 훈련으로 검증된다", "비용 절감이 안정성 훼손으로 이어지지 않는다", "capacity forecast가 quota, peak, saturation point를 포함한다", "post-incident 개선이 IaC, runbook, alert rule에 반영된다"],
    handoff: "다음 SLO와 플랫폼 설계 기준을 업데이트한다.",
  },
];

const tracks: RoadmapTrack[] = [
  {
    title: "서비스 목표와 운영 기준",
    intent: "인프라를 도구 목록이 아니라 서비스 신뢰도 목표를 달성하기 위한 운영 시스템으로 시작한다.",
    nodes: [
      { id: "INF-01", title: "SLO와 SLA", why: "가용성, latency, error budget이 없으면 어떤 장애가 중요한지 판단할 수 없다.", artifacts: ["SLO document"], failureSignals: ["모든 장애가 같은 우선순위"], evidence: ["error budget dashboard"], links: ["인프라·운영 로드맵"] },
      { id: "INF-02", title: "서비스 의존성", why: "장애 영향은 app 하나가 아니라 외부 API, DB, DNS, CDN까지 이어진다.", artifacts: ["dependency map"], failureSignals: ["downstream 장애 전파"], evidence: ["dependency health check"], links: ["서비스 요청 경로"] },
      { id: "INF-03", title: "RTO/RPO", why: "DR 설계는 복구 시간과 데이터 손실 허용치가 먼저 정해져야 한다.", artifacts: ["recovery objective"], failureSignals: ["백업은 있으나 복구 시간 모름"], evidence: ["restore rehearsal"], links: ["Incident Response·Rollback·DR"] },
      { id: "INF-04", title: "Risk Register", why: "single point of failure, vendor dependency, capacity cliff를 사전에 추적한다.", artifacts: ["risk register"], failureSignals: ["알려진 위험이 ticket 없이 방치"], evidence: ["risk review log"], links: ["운영 체크리스트·면접 답변"] },
      { id: "INF-05", title: "Ownership Model", why: "운영 책임이 불명확하면 장애 때 의사결정과 communication이 늦어진다.", artifacts: ["RACI"], failureSignals: ["장애 중 owner 탐색"], evidence: ["on-call schedule"], links: ["운영 체크리스트·면접 답변"] },
    ],
  },
  {
    title: "Linux와 네트워크 기초",
    intent: "클라우드 콘솔을 보기 전에 프로세스, 파일, 포트, 라우팅, 패킷 흐름부터 읽는다.",
    nodes: [
      { id: "INF-06", title: "Linux Process", why: "CPU, memory, file descriptor, signal, exit code는 runtime 장애 판독의 기본이다.", artifacts: ["process triage guide"], failureSignals: ["OOM과 CPU starvation 혼동"], evidence: ["top/ps/lsof capture"], links: ["플랫폼 도구·운영 기본기"] },
      { id: "INF-07", title: "Filesystem와 Permission", why: "권한, mount, inode, disk full은 배포와 runtime 장애의 흔한 원인이다.", artifacts: ["filesystem checklist"], failureSignals: ["권한 오류를 app bug로 오판"], evidence: ["df/du/stat output"], links: ["플랫폼 도구·운영 기본기"] },
      { id: "INF-08", title: "TCP/IP", why: "connection, handshake, retransmission, timeout을 모르면 네트워크 장애를 좁힐 수 없다.", artifacts: ["TCP triage sheet"], failureSignals: ["timeout 원인 추측"], evidence: ["tcpdump or ss output"], links: ["서비스 요청 경로"] },
      { id: "INF-09", title: "Routing", why: "route table, gateway, NAT, firewall은 요청이 어디서 끊기는지 결정한다.", artifacts: ["routing map"], failureSignals: ["같은 subnet이라고 통신 가능하다고 가정"], evidence: ["traceroute and route table"], links: ["VPC·Subnet·Routing"] },
      { id: "INF-10", title: "Load Balancing", why: "LB는 health check, draining, TLS, sticky session, failover 정책의 집합이다.", artifacts: ["LB policy"], failureSignals: ["죽은 target으로 계속 라우팅"], evidence: ["target health history"], links: ["서비스 요청 경로"] },
    ],
  },
  {
    title: "DNS·TLS·Edge",
    intent: "사용자 요청의 첫 구간인 이름 해석, 암호화, CDN, WAF를 운영 로그와 체크 포인트로 본다.",
    nodes: [
      { id: "INF-11", title: "DNS Resolution", why: "TTL, resolver cache, authoritative server, split-horizon이 장애 전파 시간을 결정한다.", artifacts: ["DNS zone map"], failureSignals: ["레코드 변경 후 즉시 반영 기대"], evidence: ["dig trace"], links: ["DNS·TLS 운영"] },
      { id: "INF-12", title: "TLS Certificate", why: "인증서 체인, SNI, renewal, cipher policy는 접속 가능성과 보안 기준이다.", artifacts: ["TLS renewal runbook"], failureSignals: ["만료 알림 없음"], evidence: ["openssl s_client output"], links: ["DNS·TLS 운영"] },
      { id: "INF-13", title: "CDN Cache", why: "CDN은 latency 개선과 stale content, purge, header 정책의 trade-off다.", artifacts: ["cache key policy"], failureSignals: ["사용자별 데이터가 cache됨"], evidence: ["cache hit ratio"], links: ["서비스 요청 경로"] },
      { id: "INF-14", title: "WAF와 Bot 방어", why: "WAF는 공격 완화와 정상 트래픽 차단 위험을 함께 가진다.", artifacts: ["WAF rule policy"], failureSignals: ["정상 요청 403 급증"], evidence: ["rule hit log"], links: ["보안 경계·방화벽"] },
      { id: "INF-15", title: "Edge Observability", why: "edge log가 없으면 app까지 오지 않은 요청을 설명할 수 없다.", artifacts: ["edge log schema"], failureSignals: ["app log에 없으니 문제 없다고 판단"], evidence: ["CDN/WAF log query"], links: ["Observability·SLO"] },
    ],
  },
  {
    title: "VPC와 보안 경계",
    intent: "클라우드 네트워크를 그림이 아니라 격리, 라우팅, 차단 근거, 최소 권한으로 운영한다.",
    nodes: [
      { id: "INF-16", title: "VPC/Subnet 설계", why: "public/private subnet, AZ 분산, CIDR 계획은 확장과 장애 격리의 기초다.", artifacts: ["VPC diagram"], failureSignals: ["CIDR 중복으로 peering 불가"], evidence: ["subnet inventory"], links: ["VPC·Subnet·Routing"] },
      { id: "INF-17", title: "Security Group", why: "SG는 stateful instance boundary이며 app dependency를 명시한다.", artifacts: ["SG rule table"], failureSignals: ["0.0.0.0/0 임시 허용 방치"], evidence: ["rule review"], links: ["보안 경계·방화벽"] },
      { id: "INF-18", title: "NACL과 Firewall", why: "stateless boundary는 subnet 단위 차단과 감사 요구에 쓰인다.", artifacts: ["NACL policy"], failureSignals: ["ephemeral port 차단"], evidence: ["flow log deny sample"], links: ["보안 경계·방화벽"] },
      { id: "INF-19", title: "Private Connectivity", why: "VPN, Direct Connect, PrivateLink는 latency, routing, DNS, ownership 이슈를 만든다.", artifacts: ["private connectivity map"], failureSignals: ["한쪽 route만 설정"], evidence: ["tunnel health and route propagation"], links: ["VPN·Private Connectivity"] },
      { id: "INF-20", title: "IAM Boundary", why: "cloud 권한은 human, workload, CI role로 분리하고 audit 가능해야 한다.", artifacts: ["IAM permission matrix"], failureSignals: ["admin role 공유"], evidence: ["access analyzer report"], links: ["보안 경계·방화벽"] },
    ],
  },
  {
    title: "Runtime Platform",
    intent: "서버, 컨테이너, 오케스트레이션을 배포 단위, health, scaling, secret, resource quota로 설계한다.",
    nodes: [
      { id: "INF-21", title: "Compute 선택", why: "VM, container, serverless는 운영 책임, cold start, scaling, 비용 모델이 다르다.", artifacts: ["compute choice matrix"], failureSignals: ["운영 역량 없이 Kubernetes 도입"], evidence: ["workload fit review"], links: ["컨테이너·오케스트레이션·Health Check"] },
      { id: "INF-22", title: "Container Image", why: "image size, base image, CVE, startup command가 보안과 배포 속도를 좌우한다.", artifacts: ["image policy"], failureSignals: ["latest tag 배포"], evidence: ["image scan report"], links: ["컨테이너·오케스트레이션·Health Check"] },
      { id: "INF-23", title: "Kubernetes/ECS", why: "scheduler, service discovery, rollout, resource request, probe는 운영 안정성의 핵심이다.", artifacts: ["workload spec"], failureSignals: ["readiness 없이 트래픽 수신"], evidence: ["rollout history"], links: ["컨테이너·오케스트레이션·Health Check"] },
      { id: "INF-24", title: "Health Check", why: "liveness, readiness, startup probe가 틀리면 장애 복구가 장애 증폭이 된다.", artifacts: ["health endpoint contract"], failureSignals: ["DB 지연 때 pod 재시작 loop"], evidence: ["probe failure event"], links: ["컨테이너·오케스트레이션·Health Check"] },
      { id: "INF-25", title: "Secret과 Config", why: "config drift와 secret rotation은 배포 실패와 보안 사고의 주요 원인이다.", artifacts: ["config inventory"], failureSignals: ["환경별 설정 수동 복사"], evidence: ["rotation rehearsal"], links: ["CI/CD·Artifact·Environment"] },
    ],
  },
  {
    title: "CI/CD와 IaC",
    intent: "변경을 빠르게 하는 것보다 검증 가능하고 되돌릴 수 있게 만드는 데 집중한다.",
    nodes: [
      { id: "INF-26", title: "Pipeline Design", why: "CI/CD는 build, test, scan, artifact, deploy, verify를 한 줄로 잇는 검증 흐름이다.", artifacts: ["pipeline map"], failureSignals: ["로컬에서만 빌드 가능"], evidence: ["pipeline artifact"], links: ["CI/CD·Artifact·Environment"] },
      { id: "INF-27", title: "Artifact Promotion", why: "같은 artifact를 환경별로 승격해야 재현 가능한 배포가 된다.", artifacts: ["artifact policy"], failureSignals: ["환경마다 다시 빌드"], evidence: ["digest pinning"], links: ["CI/CD·Artifact·Environment"] },
      { id: "INF-28", title: "IaC Module", why: "Terraform 같은 IaC는 모듈 경계, state, provider version, review 전략이 핵심이다.", artifacts: ["IaC module map"], failureSignals: ["복붙 module과 state 충돌"], evidence: ["terraform plan review"], links: ["IaC·변경관리·Drift"] },
      { id: "INF-29", title: "Drift Detection", why: "콘솔 수동 변경은 장애 원인과 보안 구멍이 되므로 탐지되어야 한다.", artifacts: ["drift policy"], failureSignals: ["plan이 예기치 않게 대량 변경"], evidence: ["drift report"], links: ["IaC·변경관리·Drift"] },
      { id: "INF-30", title: "Rollback과 Feature Flag", why: "빠른 변경은 빠른 복구 능력과 함께 있어야 안전하다.", artifacts: ["rollback plan"], failureSignals: ["DB migration 때문에 rollback 불가"], evidence: ["rollback drill"], links: ["Incident Response·Rollback·DR"] },
    ],
  },
  {
    title: "Observability와 SLO 운영",
    intent: "로그·메트릭·트레이스를 수집하는 데서 멈추지 않고 사용자 영향과 운영 행동으로 연결한다.",
    nodes: [
      { id: "INF-31", title: "Log Pipeline", why: "로그 수집은 retention, parsing, PII masking, correlation id 기준이 있어야 한다.", artifacts: ["log pipeline design"], failureSignals: ["민감정보 로그 저장"], evidence: ["masked log sample"], links: ["Observability·SLO"] },
      { id: "INF-32", title: "Metric System", why: "infra metric과 service metric을 함께 봐야 원인과 증상을 분리한다.", artifacts: ["metric taxonomy"], failureSignals: ["CPU 정상인데 사용자 장애"], evidence: ["SLI dashboard"], links: ["Observability·SLO"] },
      { id: "INF-33", title: "Tracing", why: "분산 요청 경로와 downstream 병목은 trace로 가장 빠르게 좁힌다.", artifacts: ["trace propagation standard"], failureSignals: ["서비스별 trace id 불일치"], evidence: ["end-to-end trace"], links: ["Observability·SLO"] },
      { id: "INF-34", title: "Synthetic Monitoring", why: "외부 사용자 관점의 주기적 검사가 내부 metric 사각지대를 줄인다.", artifacts: ["synthetic check suite"], failureSignals: ["내부 health는 정상인데 외부 접속 실패"], evidence: ["regional probe result"], links: ["Observability·SLO"] },
      { id: "INF-35", title: "Alert Hygiene", why: "좋은 alert는 actionable하고 사용자 영향과 연결되며 중복을 줄인다.", artifacts: ["alert routing policy"], failureSignals: ["알림 피로로 무시"], evidence: ["alert review"], links: ["Observability·SLO"] },
    ],
  },
  {
    title: "Incident, DR, 비용·용량",
    intent: "운영 성숙도는 장애 대응, 복구 훈련, 비용 최적화, 용량 예측이 꾸준히 반복되는지로 드러난다.",
    nodes: [
      { id: "INF-36", title: "Incident Command", why: "장애 때는 원인 분석보다 역할, 영향도, 완화, communication이 먼저다.", artifacts: ["incident command guide"], failureSignals: ["동시에 여러 사람이 임의 조치"], evidence: ["incident timeline"], links: ["Incident Response·Rollback·DR"] },
      { id: "INF-37", title: "Runbook", why: "runbook은 설명서가 아니라 증상별 검증 명령과 의사결정 기준이다.", artifacts: ["runbook"], failureSignals: ["문서는 있으나 실행 명령 없음"], evidence: ["runbook drill"], links: ["운영 체크리스트·면접 답변"] },
      { id: "INF-38", title: "Backup Restore", why: "백업은 생성보다 복구 가능성과 복구 시간이 검증되어야 한다.", artifacts: ["restore procedure"], failureSignals: ["복구 테스트 미실시"], evidence: ["restore checksum report"], links: ["Incident Response·Rollback·DR"] },
      { id: "INF-39", title: "Capacity Planning", why: "용량은 평균 사용률이 아니라 peak, growth, quota, saturation point로 예측한다.", artifacts: ["capacity forecast"], failureSignals: ["quota limit에 갑자기 막힘"], evidence: ["load and quota report"], links: ["AWS·Azure 실전 시나리오"] },
      { id: "INF-40", title: "Cost Governance", why: "비용 최적화는 낭비 제거와 안정성·성능 trade-off의 균형이다.", artifacts: ["cost allocation report"], failureSignals: ["unused resource 방치"], evidence: ["unit cost trend"], links: ["AWS·Azure 실전 시나리오"] },
    ],
  },
];

const gates = [
  { title: "경로 판독", checks: ["DNS, TLS, CDN, LB, VPC, app, DB 중 장애 지점을 로그와 지표로 좁힌다", "요청 경로와 보안 경계를 다이어그램으로 설명한다"] },
  { title: "변경 안정성", checks: ["CI/CD, artifact, IaC, rollback, drift 탐지가 연결되어 있다", "콘솔 수동 변경이 운영 표준이 되지 않는다"] },
  { title: "운영 성숙도", checks: ["SLO alert, runbook, incident command, DR 훈련이 있다", "비용·용량 최적화가 안정성 목표와 함께 검토된다"] },
];

export default function InfraRoadmapPage() {
  return (
    <RoadmapPage
      serial="DOC : INFRA-DEEP-ROADMAP"
      title="인프라 개발·운영 프로세스 심층 로드맵"
      subtitle="서비스 목표, 네트워크, DNS·TLS, VPC, 런타임 플랫폼, CI/CD, IaC, 관측성, Incident, DR, 비용·용량을 하나의 운영 시스템으로 연결한다."
      meta="PROCESS : SLO -> NETWORK -> EDGE -> VPC/SECURITY -> RUNTIME -> CI/CD/IAC -> OBSERVABILITY -> INCIDENT/DR/COST"
      diagram={diagram}
      diagramImage={{
        src: "/images/infra-roadmap-map.png",
        alt: "인프라 문서 8개가 서비스 요청 경로를 중심으로 어떻게 연결되는지 보여주는 지도. 인프라·운영 로드맵이 전체를 감싸고, DNS·TLS·VPC·Subnet·Routing·NAT·보안 경계가 서비스 요청 경로로 통합되며, VPN·Private Connectivity를 거쳐 AWS·Azure 실전 시나리오로 이어진다.",
        caption:
          "인프라·운영 로드맵이 전체 학습 순서와 판단 프레임을 감싸고, DNS·TLS·VPC 라우팅·보안 경계 세 문서가 서비스 요청 경로로 통합된다. 거기서 VPN·Private Connectivity로 네트워크 경계를 확장하고, AWS·Azure 실전 시나리오에서 실제 설계로 종합한다.",
      }}
      tracks={tracks}
      process={process}
      gates={gates}
    />
  );
}
