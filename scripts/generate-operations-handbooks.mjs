import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.join("public", "handbook");

const docs = [
  {
    file: "operations-roadmap-handbook.html",
    title: "인프라·운영 로드맵",
    subtitle: "서비스를 사용자 요청에서 장애 복구까지 하나의 운영 시스템으로 읽는 기준",
    sections: [
      {
        code: "OP-00",
        title: "운영 전체 지도",
        body: "인프라·운영은 네트워크, 배포, 모니터링을 따로 외우는 영역이 아니다. 운영자는 request path, change path, control plane, data plane, recovery path를 한 장으로 연결해야 한다. 사용자의 요청은 DNS → CDN/WAF → Load Balancer → Runtime → Data store를 지나고, 변경은 CI/CD → artifact → config → runtime → metric gate → rollback 또는 incident response로 검증된다.",
        question: "요청 경로, 변경 경로, 복구 경로가 같은 운영 지도에 연결되어 있는가?",
        evidence: "request path map, deploy marker, service catalog, dependency map, SLO, rollback/restore owner",
        judgment: "사용자 영향과 최근 변경, 완화 후보를 한 timeline에서 설명할 수 있어야 한다.",
        command: "service catalog, dependency map, release note, SLO dashboard, incident runbook, rollback drill record",
        commandJudgment: "어느 계층이 사용자 영향과 연결되는지 15분 안에 찾고, 원인 확정 전 완화책을 고를 수 있어야 한다.",
        incidentSignal: "요청 실패, deploy marker, SLO burn이 같은 시간대에 발생",
        incidentJudgment: "요청 경로와 변경 경로를 동시에 좁히고 rollback, feature off, traffic shift 중 사용자 영향을 가장 빨리 줄이는 조치를 먼저 선택한다.",
      },
      {
        code: "OP-01",
        title: "4주 학습 순서",
        body: "학습 순서는 서비스 장애를 좁히는 순서와 같아야 한다. 1주차에는 브라우저에서 DB까지 요청 경로를 그리고, 2주차에는 VPC, subnet, route table, NAT, ingress, egress, private endpoint를 붙인다. 3주차에는 CI/CD, artifact, runtime, health check, IaC 변경을 배포 경로로 묶고, 4주차에는 Observability, SLO, Incident Response, Rollback, Restore, DR drill로 운영 루프를 닫는다.",
        question: "학습 순서가 실제 장애 triage와 운영 인수 순서로 이어지는가?",
        evidence: "request path diagram, VPC route table readback, deploy pipeline stage, SLO dashboard, rollback/restore drill record",
        judgment: "개념 이름을 외운 순서가 아니라 장애 때 배제할 계층과 산출물 순서로 정리되어야 한다.",
        command: "draw request path, list ingress/egress, check deploy pipeline, run smoke/rollback drill, review SLO burn alert",
        commandJudgment: "각 단계가 확인 명령, 판독 기준, 제출 산출물로 이어지면 실무 학습 경로로 본다.",
        incidentSignal: "네트워크는 설명하지만 배포 marker, SLO burn, rollback 가능성을 함께 설명하지 못함",
        incidentJudgment: "다음 학습 항목을 runbook, dashboard, drill packet으로 연결해 운영 증거를 만든다.",
      },
      {
        code: "OP-02",
        title: "계층별 실패 모드",
        body: "운영 실력은 장애 때 어떤 계층을 먼저 의심하고 어떤 증거로 배제하는지에서 드러난다. DNS/TLS, CDN/WAF, Load Balancer, runtime, DB, network policy, deploy pipeline, observability, incident process마다 대표 실패 모드와 첫 확인 증거가 다르다.",
        question: "각 계층의 실패 모드와 첫 확인 증거를 구분할 수 있는가?",
        evidence: "DNS answer, TLS chain, WAF log, target health, trace waterfall, DB wait event, flow log, deploy marker, burn-rate alert",
        judgment: "앱 로그만 보거나 클라우드 서비스명만 나열하면 운영 판단으로 부족하다.",
        command: "dig/curl/openssl, LB target health, kubectl describe/logs, DB performance insight, flow log, CI release note",
        commandJudgment: "증거는 같은 timestamp, traceId, version, environment로 연결되어야 한다.",
        incidentSignal: "프론트 화면 오류 하나를 보고 API 코드 문제로 단정",
        incidentJudgment: "가장 앞단 계층부터 요청이 도달한 지점을 찾고, 최근 변경과 SLO burn을 함께 본다.",
      },
      {
        code: "OP-03",
        title: "운영 산출물과 답변 구조",
        body: "운영 문서는 아키텍처 다이어그램만으로 끝나지 않는다. owner, escalation, SLO, dashboard, alert, runbook, rollback plan, RPO/RTO, 변경 이력, 비용 owner, access owner, 마지막 drill 날짜가 있어야 다음 사람이 같은 판단을 반복할 수 있다. 면접에서도 도구 이름보다 경로, 경계, 실패 모드, 증거, 완화, 후속 개선 순서로 말해야 한다.",
        question: "운영 산출물과 면접 답변이 실행 가능한 증거로 닫히는가?",
        evidence: "owner matrix, service catalog, SLO, dashboard, alert, runbook, rollback command, restore drill date, incident packet",
        judgment: "담당자가 바뀌어도 같은 절차와 권한으로 대응할 수 있어야 한다.",
        command: "service catalog, alert route, dashboard link, rollback command, restore drill report, postmortem, runbook diff",
        commandJudgment: "문서 링크만 있고 권한, owner, 마지막 drill 날짜가 없으면 운영 인수 미완료다.",
        incidentSignal: "장애 중 dashboard, alert owner, rollback owner를 찾지 못함",
        incidentJudgment: "인수 체크리스트에 owner, 권한, 마지막 drill, incident packet, runbook diff를 필수 항목으로 추가한다.",
      },
    ],
  },
  {
    file: "operations-request-path-handbook.html",
    title: "서비스 요청 경로",
    subtitle: "브라우저에서 애플리케이션과 데이터 저장소까지 요청이 지나가는 hop을 분해한다",
    sections: [
      {
        code: "REQ-00",
        title: "기준 경로",
        body: "대표 경로는 DNS → CDN/WAF → Load Balancer → App → DB다. 장애가 나면 사용자의 증상, DNS 해석, TLS handshake, CDN cache, WAF 차단, Load Balancer target health, 애플리케이션 로그, DB connection pool을 같은 시간축에 올린다.",
        question: "사용자 요청이 어느 hop까지 도달했는지 어떻게 확인하는가?",
        evidence: "DNS answer, TLS handshake, CDN/WAF request id, LB target health, app access log, DB pool metric",
        judgment: "요청이 멈춘 가장 앞 계층을 찾고, 그 뒤 계층의 로그 공백을 원인으로 오해하지 않는다.",
        command: "dig, curl -v, openssl s_client, WAF log, LB target health, app log, DB pool dashboard",
        commandJudgment: "DNS, edge, LB, app, DB 증거를 같은 timestamp와 traceId로 연결한다.",
        incidentSignal: "특정 지역 사용자의 로그인 실패와 일부 계층 로그 공백",
        incidentJudgment: "가장 앞단에서 막힌 증거를 찾기 전에는 app 또는 DB 문제로 단정하지 않는다.",
      },
      {
        code: "REQ-01",
        title: "DNS와 TLS",
        body: "DNS가 잘못되면 애플리케이션 로그가 비어 있을 수 있다. TLS 인증서 만료, SNI 불일치, intermediate chain 누락은 네트워크 연결은 되지만 HTTPS에서 실패하는 전형적인 원인이다. curl -v, openssl s_client, dig 결과를 함께 남긴다.",
        question: "DNS/TLS 문제가 애플리케이션 장애처럼 보이는지 어떻게 구분하는가?",
        evidence: "authoritative answer, resolver 차이, TTL, CNAME/ALIAS chain, SNI, SAN, expiry, intermediate chain",
        judgment: "앱 로그가 비어 있거나 TLS handshake에서 실패하면 edge 이전 문제를 먼저 본다.",
        command: "dig +trace app.example.com, dig app.example.com @8.8.8.8, curl -v, openssl s_client -servername app.example.com -connect app.example.com:443",
        commandJudgment: "권한 DNS와 public resolver 결과, 인증서 SAN/SNI/chain을 분리해 확인한다.",
        incidentSignal: "일부 사용자만 인증서 오류 또는 이전 IP 접속",
        incidentJudgment: "TTL, resolver cache, CDN binding, certificate chain을 복구 절차에 포함한다.",
      },
      {
        code: "REQ-02",
        title: "Load Balancer와 health check",
        body: "Load Balancer는 단순 분산 장치가 아니라 장애 격리 장치다. health check path가 실제 의존성을 너무 깊게 보거나 너무 얕게 보면 정상 pod가 빠지거나 죽은 앱이 살아 있는 것처럼 보인다. 502는 upstream 연결 실패, 504는 timeout으로 우선 분리한다.",
        question: "Load Balancer가 장애를 격리하는지, 오히려 정상 트래픽을 막는지 어떻게 확인하는가?",
        evidence: "target health, health check status, 502/503/504, deregistration delay, idle timeout, app readiness",
        judgment: "502는 upstream 연결, 503은 capacity/health, 504는 timeout 후보로 먼저 나눈다.",
        command: "LB target health, listener rule, target group metric, WAF log, app access log, trace waterfall",
        commandJudgment: "target이 unhealthy인지, 연결은 되지만 응답이 늦는지, health check path가 과도한지 분리한다.",
        incidentSignal: "배포 직후 502/503 증가와 일부 target unhealthy",
        incidentJudgment: "bad target drain, rollout pause, health check rollback을 임시 완화로 검토한다.",
      },
      {
        code: "REQ-03",
        title: "앱과 DB 경계",
        body: "App → DB 구간은 connection pool, timeout, transaction lock, migration, secret rotation이 얽힌다. 프론트 증상만 보고 API 문제로 단정하지 말고, traceId로 request log, slow query, DB wait event를 이어 본다.",
        question: "App → DB 구간의 병목이 사용자 요청 실패로 이어졌는지 어떻게 확인하는가?",
        evidence: "connection pool pending, DB wait event, lock wait, slow query, request timeout, secret rotation event",
        judgment: "trace waterfall에서 가장 먼저 늘어난 구간과 DB wait event 시간이 맞아야 DB 경계 문제로 본다.",
        command: "APM trace waterfall, app access log, DB slow query log, pg_stat_activity 또는 provider DB performance insight",
        commandJudgment: "pool pending과 lock wait가 늘고 app timeout이 뒤따르면 DB 경계 병목 후보가 강하다.",
        incidentSignal: "로그인 API 504와 동시에 DB connection pool 대기가 급증",
        incidentJudgment: "pool 보호, slow query 차단, migration lock 해소를 임시 완화와 영구 수정으로 나눠 기록한다.",
        examples: [
          ["정상", "pool pending 낮음, slow query 없음, lock wait 없음", "DB보다 upstream 또는 app 로직을 다시 본다."],
          ["비정상", "pool pending 급증, lock wait 증가, API timeout 동시 발생", "DB 병목 또는 connection pool 설정 문제로 우선 좁힌다."],
        ],
      },
    ],
  },
  {
    file: "operations-vpc-routing-handbook.html",
    title: "VPC·Subnet·Routing·NAT",
    subtitle: "클라우드 네트워크를 IP 대역, 라우팅, 출입 경로, 응답 경로로 검증한다",
    sections: [
      {
        code: "NET-00",
        title: "CIDR과 subnet",
        body: "VPC CIDR은 RFC 1918 대역을 쓰더라도 사내망, 고객사망, peering, VPN, Private Endpoint와 겹치면 나중에 막힌다. subnet은 public, private, data 계층으로 나누고 AZ 확장과 reserved IP를 고려한다.",
        question: "CIDR과 subnet 설계가 미래 연결을 막지 않는다는 것을 어떻게 검증하는가?",
        evidence: "VPC CIDR, subnet mask, AZ allocation, reserved IP, peering/VPN/PrivateLink overlap check",
        judgment: "사내망·고객사망·확장 예정 대역과 겹치지 않아야 한다.",
        command: "CIDR registry, route plan, IPAM, cloud subnet readback",
        commandJudgment: "주소 계획이 문서와 실제 cloud subnet에서 일치해야 한다.",
        incidentSignal: "고객사 VPN 연결 시 CIDR overlap 발견",
        incidentJudgment: "NAT 또는 재주소화 같은 임시 우회와 장기 CIDR 재설계를 분리한다.",
      },
      {
        code: "NET-01",
        title: "route table",
        body: "route table은 패킷의 다음 hop을 정한다. 0.0.0.0/0이 Internet Gateway인지 NAT Gateway인지, 고객사 CIDR이 VPN Gateway로 가는지, 더 구체적인 prefix가 Longest Prefix Match로 우선되는지 확인한다.",
        question: "패킷의 다음 hop이 의도한 route table로 결정되는가?",
        evidence: "destination prefix, target, propagated route, NAT/IGW/TGW/VGW, longest prefix match",
        judgment: "0.0.0.0/0보다 구체적인 prefix가 올바른 target으로 가야 한다.",
        command: "route table readback, effective route, propagated route, packet path diagram",
        commandJudgment: "선언한 경로와 실제 effective route가 같아야 한다.",
        incidentSignal: "private subnet 서버가 외부 API timeout",
        incidentJudgment: "route target, NAT 상태, return path를 나누어 수정한다.",
      },
      {
        code: "NET-02",
        title: "ingress와 egress",
        body: "ingress는 외부에서 들어오는 경로이고 egress는 내부에서 나가는 경로다. private subnet의 서버가 외부 API를 호출하려면 NAT, DNS, outbound security group, NACL, return path가 모두 맞아야 한다.",
        question: "ingress와 egress가 source/destination/port 기준으로 분리 검증되는가?",
        evidence: "source IP, destination IP, port, protocol, SG inbound/outbound, NACL ephemeral port, return path",
        judgment: "outbound 허용만으로 성공이 아니며 응답 경로까지 맞아야 한다.",
        command: "flow log, firewall decision, SG/NACL rule, NAT metric, DNS query log",
        commandJudgment: "REJECT 위치가 route인지 policy인지 DNS인지 구분한다.",
        incidentSignal: "외부 결제 API 호출 timeout과 NAT bytes 급증",
        incidentJudgment: "egress allowlist, retry 제한, NAT route 조정을 임시 완화로 검토한다.",
      },
      {
        code: "NET-03",
        title: "Private Endpoint",
        body: "DB, object storage, managed API를 인터넷으로 나가지 않고 호출해야 할 때 Private Endpoint 또는 PrivateLink 계열을 검토한다. 이때 DNS override와 endpoint policy까지 함께 봐야 트래픽이 의도한 사설 경로로 흐른다.",
        question: "Private Endpoint가 실제로 사설 경로를 강제하는가?",
        evidence: "private DNS override, endpoint policy, route table, public access disabled, flow log",
        judgment: "endpoint 생성만으로 충분하지 않고 DNS가 사설 IP를 반환해야 한다.",
        command: "nslookup/dig, endpoint connection status, flow log, storage/DB network setting",
        commandJudgment: "public endpoint로 해석되면 Private Endpoint 설계가 동작하지 않는다.",
        incidentSignal: "Private Endpoint 생성 후에도 public egress 비용 발생",
        incidentJudgment: "DNS override와 endpoint policy를 수정하고 public access 차단을 검증한다.",
      },
    ],
  },
  {
    file: "operations-security-boundary-handbook.html",
    title: "보안 경계",
    subtitle: "외부 공개면, 내부 신뢰 경계, 권한, 비밀 정보를 계층별로 통제한다",
    sections: [
      {
        code: "SEC-00",
        title: "공개면 줄이기",
        body: "인터넷에 공개되는 것은 DNS record, CDN, WAF, Load Balancer 정도로 제한한다. App, DB, cache, queue는 private subnet에 두고 관리 접근은 VPN, bastion, SSO, short-lived credential로 제한한다.",
        question: "인터넷 공개면이 의도한 edge 계층으로 제한되어 있는가?",
        evidence: "public DNS record, CDN/WAF distribution, LB listener, security group ingress, admin access path",
        judgment: "App/DB/cache/queue가 public endpoint 없이 private 경계 안에 있어야 한다.",
        command: "external scan, DNS inventory, LB listener list, SG ingress, bastion/VPN access log",
        commandJudgment: "외부에서 접근 가능한 표면을 실제로 열거해야 한다.",
        incidentSignal: "관리 포트 또는 내부 앱이 인터넷에 노출됨",
        incidentJudgment: "public ingress를 닫고 edge/WAF/LB 경로로만 접근하게 복구한다.",
      },
      {
        code: "SEC-01",
        title: "WAF와 방화벽",
        body: "WAF는 L7의 악성 요청 패턴을 줄이고, security group은 stateful L4 허용 목록을 만든다. NACL은 stateless subnet 경계라 응답 포트까지 고려해야 한다. 차단 로그가 남지 않는 규칙은 운영 중 원인 분석을 어렵게 만든다.",
        question: "WAF, security group, NACL이 각 계층 책임에 맞게 동작하는가?",
        evidence: "WAF rule hit, SG stateful rule, NACL stateless rule, firewall deny log, false positive rate",
        judgment: "L7 차단과 L4 허용 목록, subnet stateless 경계를 혼동하지 않아야 한다.",
        command: "WAF log, SG rule diff, NACL ephemeral port, firewall decision log",
        commandJudgment: "차단 로그 없이 규칙만 있으면 운영 중 원인 분석이 어렵다.",
        incidentSignal: "정상 고객 요청이 WAF rule에 차단됨",
        incidentJudgment: "rule rollback, allow exception expiry, false positive 재튜닝을 기록한다.",
      },
      {
        code: "SEC-02",
        title: "IAM과 secret",
        body: "IAM은 사람, 서비스, pipeline, workload identity를 분리한다. secret은 repo, image, log, frontend bundle에 들어가면 안 된다. rotation 절차에는 revoke, 재발급, 배포, 영향 범위 확인이 포함된다.",
        question: "IAM과 secret이 사람·서비스·pipeline 경계별로 분리되어 있는가?",
        evidence: "principal, role assumption, policy diff, secret version, rotation date, last-used",
        judgment: "장기 key와 wildcard 권한은 예외 승인과 만료 조건이 필요하다.",
        command: "IAM access analyzer, policy diff, secret manager version, audit log, deploy consumer list",
        commandJudgment: "secret이 repo/image/log/frontend bundle에 남지 않아야 한다.",
        incidentSignal: "secret rotation 후 일부 pod 인증 실패",
        incidentJudgment: "revoke, 재발급, consumer 재시작, 영향 범위 확인을 순서대로 수행한다.",
      },
      {
        code: "SEC-03",
        title: "검증 질문",
        body: "위협 모델링은 public ingress, 인증 우회, 권한 상승, secret 노출, egress 악용, 로그 공백을 먼저 본다. 이 서비스의 public ingress는 어디인가? egress는 어떤 도메인과 포트까지 허용되는가? 관리자 권한은 누가 승인하고 얼마나 유지되는가? 침해 시 어떤 로그로 행위를 추적할 수 있는가?",
        question: "위협 모델이 public ingress, auth, privilege, egress, log gap을 다루는가?",
        evidence: "public ingress list, auth boundary, admin action log, egress allowlist, audit coverage",
        judgment: "공격 경로와 탐지 증거가 함께 설명되어야 한다.",
        command: "threat model review, access review, WAF/auth/admin/egress log sample",
        commandJudgment: "통제는 차단뿐 아니라 조사 가능한 로그로 증명되어야 한다.",
        incidentSignal: "비정상 admin export 후 행위 추적 로그 부족",
        incidentJudgment: "권한 축소, egress 차단, audit alert, runbook diff를 남긴다.",
      },
    ],
  },
  {
    file: "operations-dns-tls-handbook.html",
    title: "DNS·TLS·도메인 운영",
    subtitle: "이름 해석, 인증서, 전파, 만료를 변경 관리 대상으로 다룬다",
    sections: [
      {
        code: "DNS-00",
        title: "DNS record와 TTL",
        body: "A, AAAA, CNAME, ALIAS, TXT, CAA record의 목적을 구분한다. TTL은 장애 대응 속도와 resolver 부하 사이의 선택이다. 이전 작업 전 TTL을 낮추고, 작업 후 안정화되면 다시 올린다.",
        question: "DNS record와 TTL이 변경/복구 시간에 맞게 설계되었는가?",
        evidence: "A/AAAA/CNAME/ALIAS/TXT/CAA, authoritative answer, TTL, resolver cache",
        judgment: "record 목적과 TTL 전파 지연을 작업 전부터 고려해야 한다.",
        command: "dig NS, dig +trace, dig CAA, provider DNS change history",
        commandJudgment: "권한 서버 응답과 public resolver cache를 분리한다.",
        incidentSignal: "이전 IP가 일부 resolver에 남아 사용자만 간헐 실패",
        incidentJudgment: "TTL 사전 조정, 이전 record rollback, 전파 모니터링을 실행한다.",
      },
      {
        code: "DNS-01",
        title: "split-horizon DNS",
        body: "같은 이름이 내부와 외부에서 다른 IP로 해석되는 split-horizon DNS는 VPN, 사내망, Private Endpoint에서 자주 필요하다. 장애 분석 시 사용자가 어느 resolver를 쓰는지 먼저 확인한다.",
        question: "split-horizon DNS가 사용자 위치별로 의도한 IP를 반환하는가?",
        evidence: "internal resolver, public resolver, VPN resolver, Private DNS zone, conditional forwarder",
        judgment: "같은 이름이 내부/외부에서 다르게 해석되는 이유가 문서화되어야 한다.",
        command: "dig @internal, dig @public, resolver rule, Private DNS zone link",
        commandJudgment: "잘못된 resolver를 쓰면 사설 서비스가 public endpoint로 흐를 수 있다.",
        incidentSignal: "VPN 사용자만 내부 API 접속 실패",
        incidentJudgment: "resolver rule과 Private DNS link를 수정하고 양쪽 결과를 기록한다.",
      },
      {
        code: "DNS-02",
        title: "TLS 인증서",
        body: "TLS 운영은 인증서 발급만이 아니다. SAN, wildcard 범위, SNI, intermediate chain, OCSP, 자동 갱신, 만료 알림, CAA 정책을 함께 본다. 인증서 교체는 rollback 가능한 변경으로 관리한다.",
        question: "TLS 인증서가 발급뿐 아니라 실제 handshake에서 유효한가?",
        evidence: "SAN, wildcard scope, SNI, issuer, expiry, intermediate chain, OCSP, renewal alert",
        judgment: "인증서 발급 성공과 사용자 handshake 성공은 다르다.",
        command: "openssl s_client -showcerts, curl -v, certificate inventory, renewal job log",
        commandJudgment: "SNI와 chain 누락, SAN mismatch를 반드시 확인한다.",
        incidentSignal: "일부 브라우저에서 certificate chain 오류",
        incidentJudgment: "중간 인증서 연결, CDN binding, renewal alert를 복구한다.",
      },
      {
        code: "DNS-03",
        title: "도메인 변경 절차",
        body: "도메인 변경에는 사전 TTL 조정, record diff, 인증서 준비, CDN/WAF 연결, smoke test, 전파 모니터링, rollback record가 필요하다. dig, curl -v, openssl s_client 결과를 변경 티켓에 남긴다.",
        question: "도메인 변경이 rollback 가능한 변경으로 관리되는가?",
        evidence: "TTL pre-change, record diff, certificate binding, CDN/WAF config, smoke test, rollback record",
        judgment: "새 경로와 이전 경로가 전파 기간 동안 모두 안전해야 한다.",
        command: "dig before/after, curl --resolve, openssl s_client, CDN request log",
        commandJudgment: "전파 중 일부 사용자는 이전/새 endpoint를 모두 볼 수 있다.",
        incidentSignal: "새 CDN 전환 후 일부 지역 403",
        incidentJudgment: "이전 record 복구 또는 CDN rule rollback을 실행하고 전파 상태를 추적한다.",
      },
    ],
  },
  {
    file: "operations-private-connectivity-handbook.html",
    title: "VPN·Private Connectivity",
    subtitle: "사설 연결을 터널 상태가 아니라 서비스 통신 성공 기준으로 검증한다",
    sections: [
      {
        code: "VPN-00",
        title: "연결 방식",
        body: "Site-to-Site VPN은 빠르게 구축할 수 있지만 인터넷 품질과 IPsec 협상에 의존한다. 전용선, Direct Connect, Interconnect, ExpressRoute, Private Endpoint는 비용과 리드타임이 크지만 예측 가능성과 격리가 좋다.",
        question: "사설 연결 방식이 요구되는 격리와 예측 가능성에 맞는가?",
        evidence: "VPN/Direct Connect/ExpressRoute/Private Endpoint option, latency, SLA, cost, lead time",
        judgment: "빠른 구축과 안정적 전용 연결의 trade-off를 명시해야 한다.",
        command: "connectivity design, circuit/tunnel status, provider SLA, cost estimate",
        commandJudgment: "연결 방식 선택이 업무 중요도와 복구 목표에 맞아야 한다.",
        incidentSignal: "VPN 품질 변동으로 배치 연동 지연",
        incidentJudgment: "임시 VPN과 장기 전용선/Private Endpoint 전환 계획을 분리한다.",
      },
      {
        code: "VPN-01",
        title: "IPsec 협상",
        body: "IPsec은 Phase 1에서 IKE SA를 만들고 Phase 2에서 데이터 트래픽용 SA를 만든다. encryption, integrity, DH group, PFS, lifetime, PSK, NAT-T, traffic selector가 양쪽에서 일치해야 한다.",
        question: "IPsec Phase 1/2 협상이 양쪽에서 같은 값으로 합의되었는가?",
        evidence: "IKE SA, IPsec SA, encryption, integrity, DH group, PFS, lifetime, PSK, NAT-T",
        judgment: "터널 DOWN은 proposal mismatch와 rekey 문제를 먼저 본다.",
        command: "VPN tunnel status, IKE log, Phase 1/2 proposal sheet, packet counter",
        commandJudgment: "터널 UP과 데이터 패킷 흐름은 별개로 검증한다.",
        incidentSignal: "rekey 시점마다 터널 flap 발생",
        incidentJudgment: "lifetime/PFS/proposal 값을 맞추고 rekey 로그를 보관한다.",
      },
      {
        code: "VPN-02",
        title: "라우팅과 방화벽",
        body: "터널 UP은 충분하지 않다. local CIDR, peer CIDR, route table, security group, 고객사 방화벽, return path가 맞아야 앱 통신이 된다. CIDR overlap은 설계 단계에서 제거해야 한다.",
        question: "터널 UP 이후 실제 서비스 통신 경로가 열려 있는가?",
        evidence: "local CIDR, peer CIDR, route table, customer firewall, return path, DNS",
        judgment: "ICMP 성공만으로 API/DB 포트 성공을 판단하지 않는다.",
        command: "route readback, firewall log, nc -vz, curl internal API, tcpdump",
        commandJudgment: "양쪽 route와 firewall이 같은 src/dst/port를 허용해야 한다.",
        incidentSignal: "터널은 UP이나 ERP API timeout",
        incidentJudgment: "traffic selector, route, firewall, DNS를 순서대로 좁힌다.",
      },
      {
        code: "VPN-03",
        title: "운영 증거",
        body: "장애 시 터널 상태, rekey 로그, packet counter, tcpdump, nc, curl 결과를 분리해 본다. 고객사에 요청할 때는 source IP, destination IP, port, timestamp, packet evidence를 제공한다.",
        question: "고객사와 공유 가능한 packet evidence가 준비되어 있는가?",
        evidence: "timestamp, source IP, destination IP, port, tunnel id, packet counter, tcpdump sample",
        judgment: "상대방이 같은 시간대와 같은 5-tuple로 확인할 수 있어야 한다.",
        command: "tcpdump, nc/curl output, firewall decision, tunnel byte counter",
        commandJudgment: "증거가 없으면 고객사 방화벽/라우팅 협업이 추측이 된다.",
        incidentSignal: "양쪽 모두 상대 네트워크 문제라고 주장",
        incidentJudgment: "공유 evidence template과 escalation owner를 runbook에 추가한다.",
      },
    ],
  },
  {
    file: "operations-delivery-pipeline-handbook.html",
    title: "CI/CD·Artifact·Environment",
    subtitle: "배포를 빌드 자동화가 아니라 변경 추적과 복구 시스템으로 설계한다",
    sections: [
      {
        code: "CD-00",
        title: "pipeline stage",
        body: "좋은 pipeline은 install, lint, typecheck, test, build, artifact publish, deploy, smoke test, metric gate가 분리되어 있다. 실패한 stage가 명확해야 재시도와 rollback 판단이 빨라진다.",
        question: "pipeline stage가 실패 위치와 재시도 기준을 명확히 드러내는가?",
        evidence: "install/lint/typecheck/test/build/publish/deploy/smoke/metric gate stage result",
        judgment: "배포 실패가 어느 stage의 문제인지 즉시 구분되어야 한다.",
        command: "CI run, artifact publish log, deploy marker, smoke result, metric gate",
        commandJudgment: "CI green은 운영 성공이 아니라 운영 검증의 시작이다.",
        incidentSignal: "deploy는 성공했지만 smoke test 없이 오류율 증가",
        incidentJudgment: "stage를 분리하고 metric gate와 rollback trigger를 추가한다.",
      },
      {
        code: "CD-01",
        title: "artifact",
        body: "운영에 배포되는 단위는 branch가 아니라 artifact다. image digest, commit SHA, migration version, config version, build provenance를 묶어야 어떤 코드가 어디에 배포됐는지 추적된다.",
        question: "운영 배포 단위가 branch가 아니라 불변 artifact로 추적되는가?",
        evidence: "commit SHA, image digest, migration version, config version, SBOM/provenance",
        judgment: "production에 무엇이 배포됐는지 digest 기준으로 답해야 한다.",
        command: "release note, registry digest, deploy manifest, migration table, config diff",
        commandJudgment: "branch명이나 tag만으로는 재현성과 rollback 증거가 약하다.",
        incidentSignal: "어떤 이미지가 production에 있는지 모름",
        incidentJudgment: "artifact digest와 config version을 release note에 묶는다.",
      },
      {
        code: "CD-02",
        title: "environment",
        body: "development, staging, production은 같은 artifact에 다른 environment config를 주입하는 구조가 안정적이다. secret, public config, runtime config를 분리하고 권한 있는 approval 없이 production 변경이 나가지 않게 한다.",
        question: "환경별 차이가 artifact가 아니라 runtime config로 관리되는가?",
        evidence: "environment config, secret source, approval gate, feature flag, public/runtime config split",
        judgment: "같은 artifact가 환경 설정만 바꿔 승격되어야 한다.",
        command: "config diff, secret reference, approval log, env variable inventory",
        commandJudgment: "production secret이 build-time bundle에 섞이면 경계 실패다.",
        incidentSignal: "staging 정상, production만 config 오류",
        incidentJudgment: "config diff와 secret source를 검증하고 smoke test를 보강한다.",
      },
      {
        code: "CD-03",
        title: "rollback과 release strategy",
        body: "rolling, blue-green, canary, feature flag는 모두 rollback 비용을 줄이기 위한 선택지다. DB 변경은 expand-contract로 나누고, rollback이 불가능한 변경은 forward fix와 feature off 절차를 먼저 준비한다.",
        question: "release strategy가 rollback 비용과 DB 호환성을 낮추는가?",
        evidence: "rolling/blue-green/canary/feature flag, migration compatibility, metric gate, rollback trigger",
        judgment: "DB 변경은 expand-contract와 forward fix 가능성을 먼저 본다.",
        command: "canary metric, rollout status, feature flag state, migration version, rollback command",
        commandJudgment: "rollback 불가 변경은 사전 승인과 완화책이 필요하다.",
        incidentSignal: "migration 포함 배포 후 이전 artifact rollback 실패",
        incidentJudgment: "flag off, forward fix, expand-contract 재설계를 실행한다.",
      },
    ],
  },
  {
    file: "operations-runtime-orchestration-handbook.html",
    title: "컨테이너·오케스트레이션·Health Check",
    subtitle: "컨테이너를 이미지가 아니라 제한된 런타임과 복구 정책으로 이해한다",
    sections: [
      {
        code: "RUN-00",
        title: "컨테이너 런타임",
        body: "컨테이너는 프로세스, filesystem, network namespace, cgroup 제한을 묶은 실행 단위다. CPU, memory, file descriptor, ephemeral storage 제한을 모르고 운영하면 OOM, throttling, log 폭증을 놓친다.",
        question: "컨테이너 제한이 실제 장애 신호와 연결되어 있는가?",
        evidence: "CPU throttling, memory working set, OOMKilled, file descriptor, ephemeral storage, restart reason",
        judgment: "컨테이너는 이미지가 아니라 제한된 프로세스라는 관점으로 봐야 한다.",
        command: "kubectl describe, logs --previous, cgroup metric, container exit code",
        commandJudgment: "재시작이 회복인지 장애 반복인지 exit reason으로 구분한다.",
        incidentSignal: "트래픽 증가 후 OOMKilled 반복",
        incidentJudgment: "request/limit, memory leak, graceful degradation을 분리해 조치한다.",
      },
      {
        code: "RUN-01",
        title: "오케스트레이션 객체",
        body: "Kubernetes 기준으로 Deployment는 desired state, ReplicaSet은 replica 유지, Pod는 실행 단위, Service는 안정된 discovery, Ingress는 외부 HTTP 진입점이다. label과 selector가 어긋나면 정상 pod도 traffic을 받지 못한다.",
        question: "오케스트레이션 객체 연결이 traffic routing까지 일치하는가?",
        evidence: "Deployment, ReplicaSet, Pod, Service, selector, endpoint, Ingress rule, target group",
        judgment: "label/selector가 어긋나면 정상 pod도 트래픽을 받지 못한다.",
        command: "kubectl get endpoints, describe service/ingress, target health, event log",
        commandJudgment: "desired state와 실제 traffic endpoint를 대조해야 한다.",
        incidentSignal: "pod는 Running이나 서비스 503",
        incidentJudgment: "selector, endpoint, ingress rule을 수정하고 smoke test한다.",
      },
      {
        code: "RUN-02",
        title: "health check",
        body: "readiness는 트래픽을 받아도 되는지, liveness는 재시작이 필요한지, startup probe는 느린 부팅을 보호하는지 판단한다. health check가 DB까지 강하게 묶이면 DB 지연 때 전체 pod가 빠질 수 있다.",
        question: "readiness/liveness/startup probe가 각 목적에 맞게 분리되어 있는가?",
        evidence: "readiness status, liveness restart, startup probe, probe path dependency, failure threshold",
        judgment: "liveness가 DB 지연까지 재시작하면 장애를 키울 수 있다.",
        command: "kubectl describe pod, probe event, readiness endpoint, dependency status",
        commandJudgment: "traffic 수신 가능 여부와 재시작 필요 여부를 분리한다.",
        incidentSignal: "DB 지연 때 모든 pod가 liveness 실패로 재시작",
        incidentJudgment: "probe path를 얕게 조정하고 dependency 상태는 readiness/metric으로 분리한다.",
      },
      {
        code: "RUN-03",
        title: "배포 안정성",
        body: "rolling update는 maxUnavailable, maxSurge, pod disruption budget, connection draining, graceful shutdown이 함께 맞아야 무중단에 가까워진다. HPA는 CPU만이 아니라 queue lag, request rate 같은 업무 지표도 후보가 된다.",
        question: "rolling update가 drain, PDB, graceful shutdown까지 포함하는가?",
        evidence: "maxUnavailable, maxSurge, PDB, terminationGracePeriod, preStop, target deregistration delay",
        judgment: "새 pod 준비와 기존 pod 종료가 traffic 흐름과 맞아야 한다.",
        command: "rollout status, pod events, LB target draining, connection error rate",
        commandJudgment: "무중단은 replica 수가 아니라 연결 종료와 readiness 타이밍으로 결정된다.",
        incidentSignal: "배포 중 일부 요청 502",
        incidentJudgment: "rollout pause/undo, drain 조정, graceful shutdown 보강을 수행한다.",
      },
    ],
  },
  {
    file: "operations-iac-change-handbook.html",
    title: "IaC·변경관리·Drift",
    subtitle: "인프라 변경을 리뷰 가능한 diff, 상태, 검증, 복구 절차로 관리한다",
    sections: [
      {
        code: "IAC-00",
        title: "IaC의 목적",
        body: "IaC는 콘솔 클릭을 코드로 바꾸는 것이 아니라 변경 이력, 리뷰, 재현성, 감사 가능성을 얻는 방식이다. Terraform, Pulumi, CloudFormation 모두 state와 실제 리소스의 관계를 이해해야 한다.",
        question: "IaC가 재현성뿐 아니라 감사 가능한 변경 절차를 제공하는가?",
        evidence: "module version, provider version, state backend, review history, audit ticket",
        judgment: "코드화보다 plan/state/리뷰/검증 절차가 핵심이다.",
        command: "terraform plan/show, state backend, provider lock, PR review, resource readback",
        commandJudgment: "콘솔 클릭을 코드로 옮겼어도 검증이 없으면 운영 품질이 낮다.",
        incidentSignal: "콘솔 hotfix가 코드에 반영되지 않아 drift 발생",
        incidentJudgment: "drift 원인을 코드 흡수 또는 수동 변경 금지 정책으로 닫는다.",
      },
      {
        code: "IAC-01",
        title: "plan과 apply",
        body: "plan은 생성, 수정, 교체, 삭제, 권한 변경을 분류해 리뷰한다. apply 전에는 state lock, workspace, provider version, target environment, destructive change를 확인한다.",
        question: "plan이 생성/수정/교체/삭제/권한 확대를 분리해 보여주는가?",
        evidence: "create/update/replace/delete, IAM diff, network diff, downtime risk, state lock",
        judgment: "replace/delete/IAM 확대는 별도 승인 기준이 필요하다.",
        command: "terraform plan -out, terraform show, state lock, workspace, provider version",
        commandJudgment: "apply 전 destructive change와 권한 확대를 먼저 표시한다.",
        incidentSignal: "LB replace가 plan에 포함됐지만 영향 검토 없이 apply",
        incidentJudgment: "create-before-destroy, staged apply, maintenance window를 검토한다.",
      },
      {
        code: "IAC-02",
        title: "drift",
        body: "drift는 코드와 실제 인프라가 달라진 상태다. 콘솔 hotfix, 자동 확장, 외부 시스템 변경이 원인이 된다. drift를 무조건 되돌리지 말고 왜 발생했는지, 코드에 흡수할지, 수동 변경을 금지할지 결정한다.",
        question: "drift가 왜 발생했고 코드에 흡수할지 되돌릴지 판단했는가?",
        evidence: "drift detection, console hotfix, autoscaling change, import target, moved block",
        judgment: "drift를 무조건 덮어쓰면 운영 hotfix를 잃을 수 있다.",
        command: "terraform plan refresh, cloud readback, state list/show, audit log",
        commandJudgment: "실제 리소스와 state, 코드의 차이를 세 방향으로 비교한다.",
        incidentSignal: "보안 hotfix가 다음 apply에서 되돌아감",
        incidentJudgment: "hotfix를 코드에 흡수하고 변경 금지/예외 정책을 정리한다.",
      },
      {
        code: "IAC-03",
        title: "변경 티켓",
        body: "운영 인프라 변경에는 목적, 영향 범위, plan 요약, 적용 시간, 검증 명령, rollback 또는 forward fix가 필요하다. DB, DNS, network 변경은 전파와 lock 때문에 더 보수적으로 쪼갠다.",
        question: "변경 티켓이 적용 전후 검증과 복구 기준을 포함하는가?",
        evidence: "purpose, impact, plan summary, apply window, validation command, rollback/forward fix",
        judgment: "DB/DNS/network 변경은 전파와 lock 때문에 더 작게 쪼개야 한다.",
        command: "change ticket, plan artifact, post-apply readback, rollback note, owner approval",
        commandJudgment: "적용 성공보다 의도한 상태 검증이 중요하다.",
        incidentSignal: "적용 후 장애인데 rollback/forward fix가 없음",
        incidentJudgment: "검증 명령과 복구 owner를 티켓 필수 항목으로 만든다.",
      },
    ],
  },
  {
    file: "operations-observability-slo-handbook.html",
    title: "Observability·SLO",
    subtitle: "로그, 메트릭, 트레이스를 사용자 영향과 장애 판단으로 연결한다",
    sections: [
      {
        code: "OBS-00",
        title: "세 신호",
        body: "로그는 사건의 세부 맥락, 메트릭은 시간에 따른 수치, 트레이스는 요청 경로를 보여준다. 세 신호가 traceId, service, environment, version으로 연결되어야 장애 시 요청 단위로 원인을 좁힐 수 있다.",
        question: "로그, 메트릭, 트레이스가 같은 요청을 설명할 수 있는가?",
        evidence: "timestamp, service, env, version, trace_id, request id, deployment marker",
        judgment: "세 신호가 traceId와 version으로 연결되지 않으면 원인 후보를 좁히기 어렵다.",
        command: "log query, RED dashboard, trace waterfall, deploy marker comparison",
        commandJudgment: "동일 요청의 로그와 trace, 같은 시간대의 metric 변화를 연결한다.",
        incidentSignal: "로그는 있으나 traceId가 없어 특정 사용자 요청을 추적할 수 없음",
        incidentJudgment: "schema 보강과 trace propagation 수정을 영구 개선으로 남긴다.",
      },
      {
        code: "OBS-01",
        title: "RED와 USE",
        body: "HTTP 서비스는 RED(rate, error, duration)를 먼저 본다. 인프라 리소스는 USE(utilization, saturation, errors)를 본다. p95/p99 latency, error rate, saturation은 평균보다 사용자 영향을 잘 드러낸다.",
        question: "서비스 지표와 리소스 지표 중 어떤 신호가 사용자 영향을 더 잘 설명하는가?",
        evidence: "request rate, error rate, duration p95/p99, utilization, saturation, errors",
        judgment: "HTTP 서비스는 RED, 인프라 리소스는 USE로 보되 평균보다 tail과 saturation을 우선한다.",
        command: "RED/USE dashboard, p95/p99 latency, saturation panel, high-cardinality label review",
        commandJudgment: "CPU 평균이 정상이어도 queue, pool, p99가 나쁘면 사용자 영향 후보로 본다.",
        incidentSignal: "평균 latency는 정상이나 p99와 queue saturation만 증가",
        incidentJudgment: "tail latency와 saturation을 기준으로 완화 우선순위를 잡는다.",
      },
      {
        code: "OBS-02",
        title: "SLO",
        body: "SLO는 사용자 경험을 기준으로 잡는 내부 신뢰성 목표다. SLA처럼 외부 보상 약속 자체는 아니지만, 제품 약속과 운영 우선순위의 근거가 된다. SLI를 정의하고 error budget을 계산하면 모든 경고를 paging하지 않고 사용자 영향이 큰 실패에 집중할 수 있다.",
        question: "이 SLO가 실제 사용자 경험을 대표하는지 어떻게 확인하는가?",
        evidence: "SLI definition, request success rate, latency percentile, freshness, durability, business success",
        judgment: "사용자 여정의 성공·지연·신선도와 연결되지 않으면 paging 기준으로 쓰지 않는다.",
        command: "SLO dashboard, error budget remaining, release freeze policy, alert owner",
        commandJudgment: "SLO 위반 시 사람이 취할 행동과 owner가 없으면 운영 기준으로 부족하다.",
        incidentSignal: "checkout success SLO burn이 fast-burn 기준을 넘음",
        incidentJudgment: "원인 확정 전에도 rollback, feature degrade, traffic shed 같은 영향 완화를 검토한다.",
      },
      {
        code: "OBS-03",
        title: "SLO burn rate",
        body: "SLO burn rate는 error budget이 얼마나 빠르게 소진되는지 보는 방식이다. 짧은 창과 긴 창을 함께 사용하면 급격한 장애와 느린 품질 저하를 모두 잡을 수 있다. 알림에는 owner, dashboard, runbook 링크가 있어야 한다.",
        question: "error budget이 얼마나 빠르게 소진되는지 어떤 창으로 판단하는가?",
        evidence: "fast burn 5m/1h, slow burn 30m/6h, error budget remaining, paging policy",
        judgment: "짧은 창과 긴 창이 함께 나빠질 때 즉시 paging하고, 느린 소진은 ticket과 release freeze로 관리한다.",
        command: "SLO burn dashboard, alert rule, silence policy, incident runbook",
        commandJudgment: "알림에는 owner, dashboard, runbook, 완화 선택지가 있어야 한다.",
        incidentSignal: "error rate는 낮아 보이지만 checkout_success_rate burn이 급증",
        incidentJudgment: "평균 지표보다 사용자 성공률과 error budget 소진 속도를 우선한다.",
        examples: [
          ["Fast burn", "5m와 1h 창 모두 error budget 소진 속도 급증", "즉시 paging하고 완화 조치를 검토한다."],
          ["Slow burn", "30m와 6h 창에서 완만한 품질 저하", "근무 시간 ticket, release freeze, owner 조치로 관리한다."],
        ],
      },
    ],
  },
  {
    file: "operations-incident-dr-handbook.html",
    title: "Incident Response·Rollback·DR",
    subtitle: "장애 대응을 개인 순발력이 아니라 반복 가능한 팀 절차로 만든다",
    sections: [
      {
        code: "INC-00",
        title: "역할",
        body: "장애가 커지면 Incident Commander, scribe, communications owner, subject matter expert를 나눈다. 한 사람이 원인 분석, 의사결정, 공지를 모두 맡으면 시간이 갈수록 판단 품질이 떨어진다.",
        question: "장애 역할이 의사결정, 기록, 커뮤니케이션, 전문 분석으로 나뉘는가?",
        evidence: "Incident Commander, scribe, comms owner, SME, decision log, channel owner",
        judgment: "한 사람이 모든 역할을 맡으면 판단 품질이 떨어진다.",
        command: "incident channel, role assignment, decision log, comms timeline",
        commandJudgment: "역할과 권한이 초반에 고정되어야 완화가 빨라진다.",
        incidentSignal: "장애 채널에서 여러 명이 동시에 명령",
        incidentJudgment: "IC가 우선순위를 정하고 scribe가 timeline을 남긴다.",
      },
      {
        code: "INC-01",
        title: "초기 대응",
        body: "처음 15분에는 사용자 영향, 최근 변경, error budget 소진, 핵심 지표, 우회 가능성을 확인한다. 원인 확정 전에는 rollback, traffic shift, feature flag off 같은 사용자 영향 완화책을 우선 고려한다.",
        question: "처음 15분에 사용자 영향과 완화책을 원인 분석보다 먼저 고정했는가?",
        evidence: "impact scope, SLI, recent deploy, dependency status, support ticket trend, mitigation candidate",
        judgment: "원인 확정 전에도 사용자 영향 완화를 검토해야 한다.",
        command: "SLO dashboard, recent deploy, status page, support trend, rollback/flag state",
        commandJudgment: "Sev와 comms channel, 완화 후보가 초기에 정해져야 한다.",
        incidentSignal: "원인 분석만 하다 rollback 타이밍을 놓침",
        incidentJudgment: "rollback, traffic shift, feature flag off를 비교해 실행한다.",
      },
      {
        code: "INC-02",
        title: "rollback과 restore",
        body: "rollback은 이전 artifact로 돌아가는 것이고 restore는 데이터나 상태를 복구하는 것이다. migration이 포함된 변경은 rollback이 어려울 수 있으므로 expand-contract, backup, restore drill이 필요하다.",
        question: "rollback과 restore의 대상과 위험을 구분했는가?",
        evidence: "artifact version, migration version, backup age, restore point, data loss risk, reconciliation need",
        judgment: "코드 rollback과 데이터 restore는 다른 복구 전략이다.",
        command: "release history, migration table, backup/restore status, reconciliation query",
        commandJudgment: "데이터 변경이 있으면 이전 artifact만으로 복구되지 않을 수 있다.",
        incidentSignal: "rollback 후 데이터 불일치 발생",
        incidentJudgment: "restore drill, reconciliation, forward fix 계획을 실행한다.",
      },
      {
        code: "INC-03",
        title: "DR과 사후 분석",
        body: "DR은 disaster recovery이며 RPO/RTO로 목표를 말한다. RPO는 허용 가능한 데이터 손실, RTO는 복구 시간 목표다. 운영 리허설은 Rollback drill, Restore drill, traffic shift drill로 나누어 실행한다. postmortem은 비난이 아니라 timeline, contributing factors, action item, runbook 개선을 남기는 절차다.",
        question: "DR 목표와 사후 분석이 실제 시스템 개선으로 닫히는가?",
        evidence: "RPO/RTO, replica lag, failover/failback result, postmortem action owner/date, runbook diff",
        judgment: "백업 존재가 아니라 복구와 원복 성공이 증거다.",
        command: "restore drill log, traffic shift result, replica lag, postmortem action tracker",
        commandJudgment: "postmortem은 timeline과 contributing factor, action item으로 닫혀야 한다.",
        incidentSignal: "복구는 됐지만 failback 절차가 없어 장기 임시 상태 지속",
        incidentJudgment: "failback drill과 runbook diff를 action item으로 남긴다.",
      },
    ],
  },
  {
    file: "operations-checklist-interview-handbook.html",
    title: "운영 체크리스트·면접 답변",
    subtitle: "실제 운영 인수와 기술면접 답변에 바로 쓰는 압축 기준",
    sections: [
      {
        code: "CHK-00",
        title: "운영 인수",
        body: "운영 인수에는 owner, escalation, architecture diagram, DNS, TLS 인증서, secret 위치, deployment pipeline, dashboard, alert, runbook, rollback, backup, RPO/RTO, 비용 owner가 포함되어야 한다.",
        question: "운영 인수가 권한과 책임까지 넘겨졌는가?",
        evidence: "owner, escalation, architecture, DNS/TLS, secret location, dashboard, alert, runbook, backup, cost owner",
        judgment: "문서 전달만으로는 인수 완료가 아니다.",
        command: "service catalog, access review, dashboard/runbook link, alert route, DR plan",
        commandJudgment: "첫 장애 때 찾을 사람과 실행 권한이 있어야 한다.",
        incidentSignal: "인수 후 첫 장애에서 owner와 권한을 찾지 못함",
        incidentJudgment: "critical owner와 access grant를 인수 조건으로 되돌린다.",
      },
      {
        code: "CHK-01",
        title: "배포 전 체크",
        body: "변경 범위, artifact, migration, config, secret, feature flag, smoke test, metric gate, rollback 조건을 확인한다. 하나라도 말로만 존재하면 운영 준비가 끝난 것이 아니다.",
        question: "배포 전 체크가 artifact, config, migration, rollback을 모두 막는가?",
        evidence: "artifact digest, config diff, migration compatibility, secret source, feature flag, smoke test, metric gate",
        judgment: "하나라도 말로만 있으면 배포 준비가 아니다.",
        command: "release note, deploy manifest, migration plan, smoke result, rollback command",
        commandJudgment: "rollback 불가 항목은 사전 승인과 forward fix가 필요하다.",
        incidentSignal: "production 배포 후 config mismatch로 장애",
        incidentJudgment: "config 검증과 smoke/metric gate를 release gate에 추가한다.",
      },
      {
        code: "CHK-02",
        title: "장애 대응 체크",
        body: "증상, 영향 범위, 시작 시각, 최근 변경, 주요 metric, log, trace, 의사결정, 사용자 공지, 복구 시각을 기록한다. 장애가 끝난 뒤에는 runbook과 alert를 반드시 업데이트한다.",
        question: "장애 대응 기록이 재현 가능한 timeline과 의사결정을 남기는가?",
        evidence: "symptom, impact, start time, recent change, metric/log/trace, decision, comms, recovery time",
        judgment: "기록이 없으면 사후 분석이 추측이 된다.",
        command: "incident packet, dashboard snapshot, log sample, decision log, customer update",
        commandJudgment: "복구 시각과 검증 신호가 함께 남아야 종료할 수 있다.",
        incidentSignal: "복구는 됐지만 어떤 조치가 효과였는지 모름",
        incidentJudgment: "incident packet과 runbook diff를 필수 종료 조건으로 둔다.",
      },
      {
        code: "CHK-03",
        title: "면접 답변",
        body: "인프라·운영 질문에는 '요청 경로를 먼저 그리고, 실패 지점을 계층별로 좁혔고, 배포와 rollback은 artifact와 metric gate로 통제했으며, 장애 후에는 SLO와 runbook을 개선했다'는 구조로 답한다. 직접 해본 일과 설계 지식의 경계도 함께 말한다.",
        question: "면접 답변이 경험 수준과 증거를 정직하게 구분하는가?",
        evidence: "direct experience, partial participation, design knowledge, incident packet, postmortem, dashboard evidence",
        judgment: "직접 하지 않은 일을 경험처럼 포장하지 않아야 한다.",
        command: "project notes, incident review, runbook diff, architecture diagram, metric screenshot",
        commandJudgment: "답변은 주장보다 증거와 판단 순서가 중요하다.",
        incidentSignal: "도구명은 많지만 실패 모드와 검증 증거가 없음",
        incidentJudgment: "요청 경로, 배포 경로, 관측, 장애 대응, 인수 산출물 순서로 답한다.",
      },
    ],
  },
  {
    file: "operations-cloud-scenarios-handbook.html",
    title: "AWS·Azure 실전 시나리오",
    subtitle: "실제 클라우드 서비스를 조합해 웹 서비스, 내부 API, 데이터, 관측, 복구 사례를 설계한다",
    sections: [
      {
        code: "CLD-00",
        title: "웹 서비스 기본 구성",
        body: "AWS와 Azure 서비스는 이름을 1:1로 외우면 안 된다. CloudFront와 Azure Front Door는 edge 계층에서 캐시, WAF, 전역 라우팅을 담당하고, Application Load Balancer와 Application Gateway는 regional L7 진입점 역할을 한다. 런타임, 데이터, identity, observability는 각 클라우드의 책임 경계와 장애 신호를 따로 확인한다.",
        question: "AWS와 Azure 구성 요소를 서비스명이 아니라 책임 경계로 설명할 수 있는가?",
        evidence: "Route 53/Azure DNS, CloudFront/Azure Front Door, ALB/Application Gateway, ECS/EKS/AKS/App Service, RDS/Azure SQL",
        judgment: "edge, regional ingress, runtime, data, identity, observability를 분리해 그릴 수 있어야 한다.",
        command: "CloudFront/Front Door request log, ALB/App Gateway target health, runtime health, DB metrics",
        commandJudgment: "edge 403, regional 5xx, runtime failure, DB pressure를 같은 오류로 묶지 않는다.",
        incidentSignal: "CloudFront 또는 Front Door 403 증가와 origin 5xx가 동시에 관찰됨",
        incidentJudgment: "WAF/edge 차단과 origin 연결 실패를 분리해 완화책을 선택한다.",
      },
      {
        code: "CLD-01",
        title: "사설 네트워크와 데이터 경계",
        body: "AWS는 VPC, public/private subnet, NAT Gateway, Security Group, VPC Endpoint, AWS PrivateLink로 경계를 만든다. Azure는 VNet, subnet, NAT Gateway, Network Security Group, Private Endpoint, Private Link, Private DNS Zone을 조합한다. 핵심은 DB와 관리형 서비스가 인터넷을 거치지 않게 하는 것이다.",
        question: "DB와 관리형 서비스가 인터넷을 거치지 않는다는 것을 어떤 증거로 확인하는가?",
        evidence: "route table, private endpoint, Private DNS, Security Group/NSG, flow log, public access disabled",
        judgment: "DNS가 private endpoint를 가리키고 route/policy/flow log가 사설 경로를 증명해야 한다.",
        command: "route table readback, private DNS resolution, flow log ACCEPT/REJECT, DB public access setting",
        commandJudgment: "private endpoint를 만들었어도 DNS가 public endpoint를 가리키면 사설 경로가 아니다.",
        incidentSignal: "private subnet 앱이 DB 또는 storage 접근 실패, 또는 public egress 비용 급증",
        incidentJudgment: "DNS override, endpoint policy, route table, NSG/Security Group, egress path를 순서대로 본다.",
        examples: [
          ["정상", "Private DNS가 사설 IP를 반환하고 flow log가 private endpoint 경로를 기록", "인터넷을 거치지 않는 경로로 판단한다."],
          ["비정상", "Private Endpoint는 있지만 DNS가 public endpoint를 반환", "DNS override 또는 resolver rule을 먼저 수정한다."],
        ],
      },
      {
        code: "CLD-02",
        title: "Secret과 배포",
        body: "AWS에서는 IAM role, Secrets Manager, Parameter Store, ECR, CodePipeline 또는 GitHub Actions를 사용한다. Azure에서는 Microsoft Entra ID, Managed Identity, Key Vault, Azure Container Registry, Azure DevOps 또는 GitHub Actions를 연결한다. secret은 build artifact에 넣지 않고 runtime 주입과 rotation 절차를 둔다.",
        question: "secret과 배포 권한이 artifact와 runtime 경계에서 분리되어 있는가?",
        evidence: "IAM/Managed Identity, Secrets Manager/Key Vault, runtime injection, rotation record, deploy approval",
        judgment: "secret이 build artifact, image, frontend bundle, log에 남으면 운영 경계 실패로 본다.",
        command: "role assignment, secret version, deployment environment, audit log, image/config diff",
        commandJudgment: "배포 주체와 런타임 주체의 권한이 분리되어야 영향 범위를 줄일 수 있다.",
        incidentSignal: "secret rotation 직후 app 인증 실패 또는 배포 pipeline 권한 오류",
        incidentJudgment: "revoke, 재발급, runtime 재시작, 영향 범위 확인을 절차로 나눈다.",
      },
      {
        code: "CLD-03",
        title: "장애와 비용 사례",
        body: "CloudFront나 Azure Front Door 캐시 설정 오류는 stale content를 만들고, NAT Gateway 비용 폭증은 private subnet egress 설계가 잘못됐다는 신호일 수 있다. RDS/Azure SQL connection pool 고갈, ALB/Application Gateway health probe 실패, AKS/EKS rollout 실패는 지표와 로그를 같은 릴리스 단위로 묶어야 빠르게 좁힌다.",
        question: "장애 신호와 비용 신호를 같은 운영 timeline에서 설명할 수 있는가?",
        evidence: "WAF rule change, cache policy, target health, DB pressure, NAT bytes, retry storm, log ingestion",
        judgment: "비용 급증도 retry, egress route, cross-AZ traffic 같은 운영 장애 신호일 수 있다.",
        command: "edge log, target health, DB metric, NAT/egress cost, retry rate, deployment marker",
        commandJudgment: "최근 변경과 비용/장애 신호를 같은 시간축에 놓고 원인 후보를 줄인다.",
        incidentSignal: "NAT 비용 4배 증가와 외부 API timeout/retry 증가",
        incidentJudgment: "retry 제한, egress allowlist, route 수정, cost anomaly alert를 함께 남긴다.",
      },
    ],
  },
];

const detailsByFile = {
  "operations-roadmap-handbook.html": {
    checklist: ["요청 경로, 변경 경로, 복구 경로를 한 장에 연결한다.", "owner, SLO, dashboard, alert, runbook, rollback plan, restore drill 날짜를 확인한다.", "DNS/TLS, edge, LB, runtime, DB, network policy, deploy pipeline의 대표 실패 모드를 표시한다.", "운영 인수 전에 rollback drill, restore drill, traffic shift drill 중 최소 하나를 실행한다.", "비용 owner와 access owner를 서비스 카탈로그에 포함한다."],
    scenario: "신규 서비스를 런칭하기 전 운영 준비도 리뷰를 진행한다. 요청 경로는 DNS, CDN/WAF, Load Balancer, Runtime, DB로 그리고, 변경 경로는 CI/CD, artifact, config, environment, metric gate로 확인한다. 복구 경로는 rollback, feature flag off, traffic shift, restore, failback으로 분리한다. 빠진 항목은 런칭 후 장애가 아니라 런칭 전 차단 이슈로 다룬다.",
    pitfalls: ["아키텍처 다이어그램은 있지만 알림 owner와 escalation 경로가 없다.", "배포 절차는 있지만 artifact digest, metric gate, rollback 검증이 없다.", "SLO가 없어서 장애와 단순 오류를 같은 우선순위로 처리한다.", "운영 인수 문서가 사람 이름과 구두 설명에 의존한다.", "백업은 있지만 restore drill과 failback 절차가 없다.", "NAT/egress 비용 급증을 운영 incident가 아니라 비용 이슈로만 본다."],
    interview: "인프라·운영은 요청 경로, 변경 경로, 복구 경로를 함께 보는 영역이라고 답합니다. 사용자의 요청은 DNS부터 DB까지 계층별로 흐르고, 코드 변경은 artifact와 환경 설정, 런타임, 관측, 장애 대응 절차를 거쳐 안전해집니다. 저는 각 단계의 실패 모드와 검증 증거를 연결하고, 원인 확정 전에도 사용자 영향 완화책을 선택하는 방식으로 운영 준비도를 판단하겠습니다.",
    learningPlan: [
      ["1주차 · 요청 경로", "서비스 요청 경로 → DNS/TLS → LB/App/DB 경계", "request path diagram, dig/curl/openssl 결과, target health 판독"],
      ["2주차 · 네트워크 경계", "VPC·Subnet·Routing·NAT → 보안 경계 → VPN/Private Connectivity", "route table readback, flow log, SG/NACL 판정, private endpoint DNS 검증"],
      ["3주차 · 변경과 런타임", "CI/CD·Artifact·Environment → 컨테이너·오케스트레이션 → IaC·변경관리", "release note, artifact digest, health check gate, terraform plan review"],
      ["4주차 · 관측과 복구", "Observability·SLO → Incident Response·Rollback·DR → Cloud 시나리오", "SLO burn alert, incident packet, rollback/restore drill, postmortem action"],
    ],
    failureMatrix: [
      ["DNS/TLS", "NXDOMAIN, wrong CNAME, SNI/SAN mismatch, chain 누락", "dig +trace, resolver 비교, openssl s_client, curl -v"],
      ["Edge/CDN/WAF", "WAF false positive, stale cache, origin policy mismatch", "edge request id, WAF log, cache policy, origin status"],
      ["Load Balancer", "502 upstream fail, 503 no healthy target, 504 timeout", "target health, listener rule, deregistration delay, idle timeout"],
      ["Runtime", "OOMKilled, readiness 실패, selector mismatch, graceful shutdown 누락", "kubectl describe/logs --previous, endpoints, rollout status"],
      ["Data store", "connection pool 고갈, lock wait, slow query, migration lock", "pool pending, DB wait event, slow query, migration version"],
      ["Network policy", "route miss, SG/NACL block, NAT saturation, private DNS 누락", "route table, flow log ACCEPT/REJECT, NAT metric, DNS query log"],
      ["Change path", "잘못된 artifact/config/secret/migration 배포", "commit SHA, image digest, config diff, secret version, deploy marker"],
      ["Recovery path", "rollback 불가, restore 미검증, failback 누락", "rollback command, backup age, restore duration, reconciliation result"],
    ],
    readinessScore: [
      ["0점", "문서 없음 또는 개인 기억에 의존", "런칭/인수 차단"],
      ["1점", "다이어그램과 담당자만 있음", "장애 때 실행 불가. owner, dashboard, runbook 보강 필요"],
      ["2점", "dashboard, alert, runbook, rollback plan이 있음", "기본 운영 가능. drill 증거가 없으면 위험"],
      ["3점", "rollback/restore drill, SLO, incident packet, cost/access owner까지 있음", "독립 운영 가능"],
      ["4점", "game day, failback, runbook diff, error budget policy가 반복 운영됨", "팀 표준화 가능"],
    ],
    audienceContract: [
      ["대상 독자", "미들급 개발자. API, DB, 배포 경험은 있으나 DNS, LB, VPC, SLO, DR을 한 시스템으로 설명하지 못하는 사람", "서비스 장애를 계층별 증거로 좁히고 운영 인수 산출물을 만들 수 있어야 한다."],
      ["선행 지식", "HTTP, TLS 기초, Linux process/log, DB connection, CI/CD 기본, container 기본", "이 지식이 없으면 도구명을 외우는 학습으로 흐르므로 먼저 보완한다."],
      ["학습 산출물", "request path diagram, deploy timeline, incident packet, rollback/restore drill report, service readiness score", "말로 아는 것이 아니라 다른 담당자가 재현 가능한 문서와 증거를 제출해야 한다."],
      ["강연 목표", "청중이 장애 상황에서 어떤 계층을 먼저 확인하고 어떤 증거로 배제할지 말할 수 있게 한다.", "서비스명 암기가 아니라 판단 순서, 증거, 완화, 후속 개선을 남긴다."],
    ],
    lectureFlow: [
      ["0-5분", "왜 운영은 아키텍처 그림만으로 부족한가", "요청 경로, 변경 경로, 복구 경로를 한 장으로 연결해야 함을 보여준다."],
      ["5-15분", "전체 운영 지도", "DNS → Edge → LB → Runtime → Data store와 CI/CD → artifact → runtime → metric gate를 겹쳐 설명한다."],
      ["15-30분", "장애 triage 실전", "5xx 증가 케이스로 사용자 영향, 최근 변경, 계층별 증거, rollback 판단을 연습한다."],
      ["30-42분", "네트워크·보안 경계", "VPC, subnet, route, SG/NACL, Private Endpoint, DNS override의 대표 오판을 짚는다."],
      ["42-52분", "SLO·Incident·DR", "burn rate, IC/scribe/comms, RPO/RTO, restore drill을 운영 성숙도 기준으로 연결한다."],
      ["52-60분", "체크리스트와 면접 답변", "운영 인수 packet과 30초/90초 답변 구조로 마무리한다."],
    ],
    providerEvidence: [
      ["DNS/Edge", "Route 53, CloudFront, AWS WAF, ACM, ALB access log", "Azure DNS, Front Door, WAF Policy, Managed Certificate, Application Gateway log", "edge request id와 origin status를 분리해 WAF 차단과 origin 장애를 나눈다."],
      ["Network", "VPC, subnet route table, Security Group, NACL, NAT Gateway, VPC Flow Logs, PrivateLink", "VNet, subnet route table, NSG, NAT Gateway, Network Watcher flow log, Private Endpoint", "route miss, policy reject, DNS public resolution, NAT saturation을 각각 다른 원인으로 본다."],
      ["Runtime", "ECS/EKS, target group health, CloudWatch Container Insights, ECR image digest", "AKS/App Service, backend health, Azure Monitor, ACR digest", "readiness, rollout, image/config mismatch, connection draining을 배포 timeline에 연결한다."],
      ["Data/DR", "RDS/Aurora metrics, Performance Insights, snapshots, PITR, replica lag", "Azure SQL metrics, Query Performance Insight, backups, PITR, geo-replica lag", "백업 존재가 아니라 restore duration, backup age, missing rows, failback 결과로 판단한다."],
    ],
    decisionTree: [
      ["1. 사용자가 실제로 영향을 받는가?", "SLI, support ticket, synthetic check, region/device 분포", "영향이 없으면 ticket으로 낮추고, 영향이 있으면 incident channel과 IC를 세운다."],
      ["2. 최근 변경과 같은 시간축인가?", "deploy marker, image digest, config diff, migration version, feature flag audit", "같은 시간축이면 rollback/flag off 후보를 먼저 준비한다. 아니면 요청 경로와 의존성 장애를 본다."],
      ["3. 요청이 어디까지 도달했는가?", "DNS answer, WAF request id, LB target health, app access log, trace span, DB wait event", "도달하지 못한 첫 계층이 현재의 가장 강한 원인 후보가 된다."],
      ["4. 원인 확정 전 완화가 가능한가?", "rollback command, traffic shift, circuit breaker, rate limit, queue pause, read-only mode", "사용자 영향을 줄이는 조치가 있으면 원인 분석과 병행한다."],
      ["5. 복구가 검증됐는가?", "SLI 회복, error budget burn 정상화, data reconciliation, customer comms, runbook diff", "지표 회복만으로 종료하지 말고 데이터·공지·문서 갱신까지 확인한다."],
    ],
    readinessPacketTemplate: `service: checkout-api
tier: customer-critical
owner: payments-platform
oncall: payments-primary
dependencies: auth-api, payment-provider, orders-db, redis-cache
request_path: DNS -> CDN/WAF -> ALB -> ECS service -> RDS
change_path: GitHub Actions -> ECR image digest -> ECS deploy -> metric gate
slo: checkout_success 99.9%, p95_latency 600ms
dashboards: sli, alb, app, db, egress, cost
alerts: fast burn, slow burn, 5xx, db pool, provider timeout, NAT anomaly
rollback: previous image digest + config version, verified 2026-06-20
restore: PITR drill pass 2026-06-21, RPO 5m, RTO 30m
cost_owner: platform-finops
access_owner: security-platform
last_game_day: 2026-06-25
launch_gate: blocked if owner, rollback, restore, alert route, or SLO is missing`,
    incidentPacketTemplate: `incident: INC-2026-0715-checkout-fast-burn
severity: SEV1
started_at: 2026-07-15T10:04+09:00
customer_impact: checkout success down from 99.94% to 91.2%, KR/JP mobile users
current_sli: checkout_success burn_5m=14x, alb_5xx=3.8%, p95=2.4s
recent_changes:
  - api image sha-9f31 deployed at T-8m
  - feature flag payment_retry_v2 enabled at T-6m
evidence:
  - DNS/TLS ok
  - WAF request id present, no block spike
  - ALB target health unstable on new task set
  - DB wait event baseline
decision:
  - rollback api image to sha-prev
  - keep feature flag off until replay test passes
verification:
  - burn_5m < 1x for 20m
  - missing orders reconciliation complete
  - customer update sent
runbook_diff:
  - add metric gate for checkout_success burn
  - add target health canary stop rule`,
    lectureDemoScript: [
      ["데모 1", "정상 요청 경로 그리기", "브라우저에서 DB까지 6개 hop을 그리고 각 hop의 증거를 하나씩 붙인다.", "청중이 app log 이전 계층의 증거를 말할 수 있어야 한다."],
      ["데모 2", "5xx fast burn triage", "incident snapshot을 보여주고 rollback, scale-out, DB restart 중 무엇을 먼저 할지 투표시킨다.", "최근 변경과 DB baseline을 근거로 rollback 후보를 고르는지 확인한다."],
      ["데모 3", "private subnet egress 오판", "flow log ACCEPT와 NAT bytes 4x를 함께 보여준다.", "네트워크 차단이 아니라 retry storm/외부 API 지연을 의심하는지 본다."],
      ["데모 4", "restore drill 채점", "backup_age, restore_duration, missing_rows를 보여주고 RPO/RTO 판정을 시킨다.", "복구 성공과 목표 충족을 구분하는지 확인한다."],
    ],
    expertReviewQuestions: [
      ["SRE 리뷰", "SLO, burn rate, incident role, postmortem action이 실제 운영 정책으로 이어지는가?", "알림 피로, error budget 정책, paging 기준이 빠져 있으면 보강한다."],
      ["Cloud network 리뷰", "route table, SG/NACL/NSG, DNS override, private endpoint, NAT 비용 설명이 provider별로 정확한가?", "AWS/Azure 차이를 서비스명 치환으로 처리한 부분을 수정한다."],
      ["Kubernetes/runtime 리뷰", "readiness/liveness/startup, graceful shutdown, rollout, target health가 정확히 분리되어 있는가?", "무중단 배포와 health check를 섞어 설명한 부분을 수정한다."],
      ["DB/DR 리뷰", "connection pool, lock wait, migration lock, PITR, replica lag, failback 설명이 실제 복구 절차와 맞는가?", "백업 존재와 복구 가능성을 혼동한 표현을 제거한다."],
      ["보안 리뷰", "IAM/Managed Identity, secret rotation, audit log, incident comms가 과도하게 단순화되지 않았는가?", "장기 키, broad permission, secret leakage 대응을 명확히 한다."],
    ],
    officialReferences: [
      ["SLO/Burn rate", "Google SRE Workbook · Alerting on SLOs", "https://sre.google/workbook/alerting-on-slos/", "burn rate, error budget, multi-window alert는 서비스별 baseline과 page load에 맞춰 조정해야 한다."],
      ["Kubernetes probes", "Kubernetes Docs · Liveness, Readiness, and Startup Probes", "https://kubernetes.io/docs/concepts/workloads/pods/probes/", "liveness는 재시작, readiness는 traffic 수신 여부, startup은 느린 시작 보호로 분리한다."],
      ["AWS VPC Flow Logs", "AWS Docs · Flow log records", "https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html", "ACCEPT/REJECT는 aggregation interval과 log-status를 함께 봐야 하며 delivery delay가 있을 수 있다."],
      ["AWS PrivateLink", "AWS Docs · AWS PrivateLink concepts", "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html", "endpoint 생성만으로 충분하지 않고 DNS, endpoint policy, route/security 경계를 함께 확인한다."],
      ["Azure Private Endpoint", "Microsoft Learn · Private endpoint overview", "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview", "private endpoint는 private IP로 Azure service에 연결하므로 Private DNS Zone 연결과 public access 정책을 같이 본다."],
      ["AWS ALB health", "AWS Docs · Target group health checks", "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html", "target health는 health check path, matcher, timeout, deregistration/draining과 함께 해석한다."],
      ["AWS RDS PITR", "AWS Docs · Restoring a DB instance to a specified time", "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html", "PITR은 새 DB instance를 만들며 latest restorable time, parameter/security group, engine 제약을 확인해야 한다."],
      ["Azure SQL restore", "Microsoft Learn · Restore a database from a backup", "https://learn.microsoft.com/en-us/azure/azure-sql/database/recovery-using-backups", "restore 가능성과 RPO/RTO 충족은 다르므로 restore duration과 data reconciliation을 따로 측정한다."],
    ],
    accuracyBoundaries: [
      ["클라우드 서비스명", "AWS/Azure 서비스명은 계속 바뀌고 기능도 region/sku에 따라 다르다.", "문서의 서비스 매핑은 책임 경계 학습용이며, 실제 설계 전 공식 문서와 현재 계정 설정을 확인한다."],
      ["SLO 임계값", "14.4x, 6x 같은 burn rate 예시는 출발점이지 절대값이 아니다.", "트래픽 규모, on-call 부담, error budget policy에 맞춰 page/ticket 기준을 재산정한다."],
      ["Flow log 판독", "flow log는 aggregation과 delivery delay가 있고 일부 metadata는 best effort다.", "패킷 단위 진실로 단정하지 말고 app log, target health, DNS query log와 교차 검증한다."],
      ["Kubernetes probe", "probe 설정은 runtime, startup 특성, downstream 의존성에 따라 달라진다.", "liveness에 DB 등 외부 의존성을 넣어 전체 재시작 루프를 만들지 않도록 리뷰한다."],
      ["DR/RPO/RTO", "백업이 존재해도 복구 목표를 만족한다는 뜻은 아니다.", "restore drill, reconciliation, failback, customer communication을 따로 검증한다."],
      ["보안/IAM", "권한과 secret 운영은 조직의 identity, audit, compliance 정책에 종속된다.", "예시는 최소 기준이며 실제 운영 전 security owner review를 필수로 둔다."],
    ],
    providerGotchas: [
      ["Route 53 / Azure DNS", "record가 맞아도 resolver cache, delegation, split-horizon/private DNS가 다르면 사용자는 실패할 수 있다.", "authoritative answer, public resolver, private resolver를 분리해 기록한다."],
      ["CloudFront / Front Door", "edge 403, stale cache, origin 5xx는 같은 화면 오류로 보일 수 있다.", "edge request id, cache status, WAF log, origin status를 같은 request timeline에 붙인다."],
      ["ALB / Application Gateway", "health check 성공은 business readiness 보장이 아니다.", "health path가 dependency-free인지, matcher/timeout/draining이 배포 전략과 맞는지 확인한다."],
      ["PrivateLink / Private Endpoint", "endpoint를 만들어도 DNS가 public endpoint를 반환하면 사설 경로가 아니다.", "private DNS, endpoint policy, route/security rule, public access setting을 함께 검증한다."],
      ["EKS/AKS/App Service", "새 버전이 뜬 것과 traffic을 받아도 되는 것은 다르다.", "readiness, startup, rollout status, target/backend health, image digest를 연결한다."],
      ["RDS / Azure SQL", "PITR 가능과 실제 업무 복구 가능은 다르다.", "latest restorable time, restore duration, schema/app compatibility, missing rows reconciliation을 기록한다."],
    ],
    reproducibleLabPacket: [
      ["입력 데이터", "incident snapshot, edge evidence, egress evidence, restore drill output", "각 lab은 정상/비정상 출력과 판단 기준을 같이 제공한다."],
      ["학습자 제출물", "원인 후보 3개, 배제한 증거, 즉시 완화 1개, 영구 수정 2개, 종료 조건", "원인 정답보다 증거 기반 의사결정 과정을 채점한다."],
      ["채점 방식", "증거 연결 40%, 완화 선택 25%, 영구 수정 20%, 커뮤니케이션/owner 15%", "서비스명 암기와 단일 로그 의존 답변은 감점한다."],
      ["재현 범위", "실제 cloud 계정 없이도 읽을 수 있는 synthetic packet", "실제 실습으로 확장할 때는 sandbox 계정, 비용 한도, 삭제 스크립트, IAM boundary를 추가한다."],
    ],
    caseStudies: [
      {
        title: "Case 1 · 배포 후 checkout 5xx fast burn",
        context: "결제 API 신규 artifact 배포 8분 뒤 checkout_success SLO가 14x fast burn을 보이고 ALB 5xx와 app error가 동시에 증가한다.",
        timeline: [
          ["T+00", "burn alert 수신, incident channel 생성, IC/scribe 지정", "사용자 영향과 의사결정권을 먼저 고정한다."],
          ["T+05", "deploy marker, image digest, config diff, DB migration version 확인", "최근 변경이 사용자 영향과 같은 시간축인지 확인한다."],
          ["T+10", "target health, app log, DB wait event, feature flag 상태 확인", "DB 압박이 아니라 새 runtime 오류와 연결되면 rollback 후보가 강해진다."],
          ["T+15", "canary stop 또는 previous artifact rollback", "원인 확정 전이라도 사용자 영향을 줄인다."],
          ["T+45", "postmortem에 metric gate, rollback decision log, runbook diff 추가", "재발 방지가 운영 산출물로 닫혀야 한다."],
        ],
        trap: "앱 로그 stack trace만 보고 디버깅을 계속하면서 rollback 결정을 늦추는 것.",
        outcome: "burn rate가 baseline으로 회복되고 rollback artifact, config version, 의사결정 시간이 incident packet에 남으면 종료한다.",
      },
      {
        title: "Case 2 · Private subnet egress와 NAT 비용 급증",
        context: "private subnet batch가 외부 결제사 API timeout을 반복하고 NAT bytes가 4배 증가한다.",
        timeline: [
          ["T+00", "route table, SG/NACL, DNS resolution, flow log를 확인", "네트워크가 막힌 것인지, 통신은 되지만 retry storm인지 분리한다."],
          ["T+10", "provider 429/timeout, app retry rate, batch concurrency 확인", "flow log ACCEPT와 NAT bytes 증가는 차단이 아니라 과도한 재시도일 수 있다."],
          ["T+20", "batch concurrency 축소, retry backoff, circuit breaker 적용", "비용과 장애 영향을 동시에 줄이는 완화책을 선택한다."],
          ["T+60", "egress dependency map, retry budget, NAT cost anomaly alert 추가", "비용 신호를 운영 incident 신호로 편입한다."],
        ],
        trap: "flow log ACCEPT만 보고 네트워크는 정상이라고 끝내거나, NAT 비용을 FinOps 문제로만 분리하는 것.",
        outcome: "retry rate, NAT bytes, batch success, 외부 API 오류율이 baseline으로 돌아오면 종료한다.",
      },
      {
        title: "Case 3 · Restore drill RPO/RTO 실패",
        context: "DB restore drill에서 backup_age 17분, restore_duration 42분, missing_rows 128건으로 RPO 5분/RTO 30분을 모두 위반한다.",
        timeline: [
          ["T+00", "backup age, replica lag, restore duration, reconciliation 범위 기록", "복구 성공 여부보다 목표 위반을 먼저 판정한다."],
          ["T+20", "write freeze, 영향 고객 산정, reconciliation job 실행", "데이터 정합성 회복을 장애 완화와 분리해 관리한다."],
          ["T+60", "backup frequency, replica lag alert, restore automation 개선", "다음 drill에서 같은 목표로 재검증할 수 있어야 한다."],
          ["T+N", "failback drill과 runbook diff 수행", "복구 후 원래 경로로 돌아오는 절차까지 검증한다."],
        ],
        trap: "복구가 됐다는 사실만 보고 RPO/RTO 위반과 누락 데이터 reconciliation을 덮는 것.",
        outcome: "다음 drill에서 RPO/RTO met, missing rows 0, failback 완료가 증거로 남아야 한다.",
      },
    ],
    gradingRubric: [
      ["초급", "도구 이름과 서비스명을 나열한다.", "장애 때 앱 로그나 콘솔 화면 하나에 의존한다.", "불합격. 운영 판단 순서와 증거 연결이 없다."],
      ["중급", "요청 경로와 변경 경로를 그리고 주요 증거를 확인한다.", "rollback 후보와 owner를 말하지만 drill 증거가 약하다.", "내부 운영 참여 가능. 공개 강연/출판용 설명으로는 보강 필요."],
      ["상급", "사용자 영향, 최근 변경, 계층별 증거, 완화, 사후 개선을 incident packet으로 닫는다.", "SLO burn, 비용, 보안, DR까지 같은 timeline에서 설명한다.", "강연/출판 사례의 기준점으로 삼을 수 있다."],
      ["리뷰어", "청중/독자가 같은 결론에 도달하도록 출력 샘플, 오판 사례, 채점 기준을 제공한다.", "클라우드별 차이와 조직 운영 체계의 한계를 명시한다.", "외부 공개 전 기술 리뷰를 맡길 수 있는 수준."],
    ],
    publicationChecklist: [
      ["개념 정확성", "DNS/TLS, LB, VPC, runtime, DB, SLO, DR 용어가 책임 경계와 함께 설명되는가?", "서비스명 번역이나 벤더 마케팅 문구로 대체하지 않는다."],
      ["사례 완결성", "각 케이스가 증상, timeline, 증거, 완화, 영구 수정, 종료 조건을 포함하는가?", "장애 원인만 맞히는 퍼즐이 아니라 운영 판단 훈련이어야 한다."],
      ["실습 재현성", "정상/비정상 출력, 해석, mitigation, verification이 모두 있는가?", "명령어만 던지고 정답 기준을 생략하지 않는다."],
      ["강연 가능성", "60분 흐름, 청중 수준, 데모 지점, Q&A 답변 구조가 있는가?", "슬라이드로 옮겼을 때 메시지가 순서대로 쌓여야 한다."],
      ["전문 리뷰", "SRE/클라우드 네트워크/Kubernetes/IaC/DB 운영 관점의 리뷰를 받을 지점이 표시되는가?", "출판 전 최소 1회 이상 실제 운영자 리뷰를 거친다."],
    ],
    answerCards: [
      ["30초 답변", "인프라·운영은 요청 경로, 변경 경로, 복구 경로를 한 장으로 연결해 보는 일입니다. DNS부터 DB까지 어디서 요청이 멈췄는지 증거로 좁히고, 배포 변경은 artifact와 metric gate로 추적하며, 장애 때는 원인 확정 전에도 rollback이나 feature off로 사용자 영향을 줄입니다."],
      ["90초 답변", "저는 먼저 사용자 영향 SLI와 최근 변경을 같은 timeline에 둡니다. 그 다음 DNS/TLS, CDN/WAF, Load Balancer, runtime, DB, network policy 순서로 요청이 도달한 지점을 확인하고, 배포 관련이면 commit SHA, image digest, config diff, migration version을 봅니다. 완화는 rollback, traffic shift, feature flag off, restore 중 폭발 반경이 가장 작은 선택지를 고르고, 복구 후에는 incident packet, runbook diff, SLO/alert 개선으로 닫습니다."],
      ["나쁜 답변", "AWS에서 ALB, ECS, RDS, CloudWatch를 써봤습니다. 장애가 나면 로그를 보고 서버를 재시작합니다."],
    ],
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

const defaultEvidenceRows = [
  ["변경 범위", "서비스, 환경, 사용자 영향, 최근 배포, config diff", "영향 범위와 rollback 후보가 같은 티켓에 연결되어야 한다."],
  ["관측 신호", "SLI, error rate, p95/p99, saturation, trace sample, log sample", "평균 지표만으로 정상 판단하지 않는다."],
  ["운영 책임", "owner, escalation, approval, runbook, 마지막 drill 날짜", "담당자가 없어도 권한 있는 사람이 같은 절차를 실행할 수 있어야 한다."],
];

const playbooksByFile = {
  "operations-roadmap-handbook.html": {
    marker: "OPERATIONS READINESS PLAYBOOK",
    evidenceRows: [
      ["서비스 카탈로그", "owner, tier, dependency map, SLO, cost owner, access owner", "15분 안에 현재 상태와 담당자를 찾을 수 있어야 한다."],
      ["변경 경로", "commit SHA, image digest, migration version, config diff, deploy marker", "장애 시 어떤 변경을 의심할지 시간축으로 좁힌다."],
      ["복구 경로", "rollback command, feature flag, traffic shift, restore drill, RTO/RPO", "복구가 구두 지시가 아니라 실행 가능한 절차여야 한다."],
    ],
    commandRows: [
      ["현재 상태", "dashboard, alert, recent deploy, support ticket trend를 한 화면에서 확인", "사용자 영향과 최근 변경을 먼저 고정한다."],
      ["운영 인수", "서비스별 owner matrix와 runbook 링크를 대조", "문서가 있어도 owner와 권한이 없으면 운영 준비가 아니다."],
      ["리허설", "rollback drill, restore drill, traffic shift drill 기록 확인", "마지막 성공 시간이 오래됐으면 실제 복구 가능성을 신뢰하지 않는다."],
    ],
    incidentRows: [
      ["T+00", "알림, SLI 값, 영향 서비스, 최근 배포를 기록", "원인 추측 전에 사용자 영향과 변경 후보를 고정한다."],
      ["T+15", "완화책과 rollback 후보를 비교", "원인 확정 전이라도 영향 완화가 가능하면 실행한다."],
      ["T+60", "postmortem owner/date와 runbook diff를 남김", "회고가 시스템 변경으로 닫히지 않으면 반복된다."],
    ],
    answerShape: ["요청 경로와 변경 경로를 한 장으로 설명한다.", "사용자 영향 SLI와 최근 변경을 같은 시간축에 둔다.", "rollback, DR, 비용, 권한 owner까지 운영 인수 산출물로 닫는다."],
  },
  "operations-request-path-handbook.html": {
    marker: "REQUEST PATH TRIAGE PLAYBOOK",
    evidenceRows: [
      ["DNS", "authoritative answer, resolver 차이, TTL, CNAME/ALIAS chain", "앱 로그가 비어 있으면 먼저 이름 해석과 edge 진입을 본다."],
      ["TLS / Edge", "SNI, SAN, expiry, intermediate chain, WAF/CDN request id", "HTTPS 실패와 WAF 차단을 앱 장애로 오판하지 않는다."],
      ["LB / App / DB", "target health, 502/503/504, traceId, pool pending, slow query", "timeout이 어느 hop에서 시작됐는지 시간축으로 연결한다."],
    ],
    commandRows: [
      ["DNS 확인", "dig +trace app.example.com, dig app.example.com @8.8.8.8", "권한 서버 응답과 public resolver cache 차이를 구분한다."],
      ["TLS 확인", "curl -v https://app.example.com/health, openssl s_client -servername app.example.com -connect app.example.com:443", "SNI, certificate chain, expiry, ALPN, handshake error를 본다."],
      ["경로 확인", "LB target health, WAF log, app access log, trace waterfall, DB pool metric", "502는 upstream 연결, 504는 timeout, 503은 capacity/health 후보로 나눈다."],
    ],
    incidentRows: [
      ["증상", "특정 지역 로그인 504, app log 일부 누락", "DNS/edge/LB/app 중 어디까지 요청이 도달했는지 먼저 확인한다."],
      ["완화", "WAF rule rollback, bad target drain, feature flag off, DB pool 보호", "사용자 영향이 줄어드는 조치를 원인 분석과 병행한다."],
      ["사후", "missing traceId, weak health check, timeout mismatch를 runbook에 반영", "다음 장애에서 같은 탐색을 반복하지 않게 한다."],
    ],
    answerShape: ["DNS부터 DB까지 hop별 증거를 순서대로 본다.", "502/503/504/TLS error를 같은 장애로 묶지 않는다.", "traceId로 edge, app, DB 시간을 연결해 원인 후보를 줄인다."],
  },
  "operations-vpc-routing-handbook.html": {
    marker: "VPC ROUTING EVIDENCE PLAYBOOK",
    evidenceRows: [
      ["CIDR / Subnet", "VPC CIDR, subnet route table, AZ, reserved IP, overlap check", "나중에 peering/VPN/PrivateLink가 막히는 CIDR을 초기에 제거한다."],
      ["Ingress / Egress", "source, destination, port, protocol, SG, NACL, route target", "outbound와 return path를 함께 검증한다."],
      ["Flow evidence", "VPC Flow Logs, firewall log, NAT metric, DNS resolution", "허용했다고 믿는 경로와 실제 패킷 경로가 일치해야 한다."],
    ],
    commandRows: [
      ["라우팅", "route table destination/target, longest prefix match, propagated route 확인", "0.0.0.0/0와 더 구체적인 prefix의 우선순위를 본다."],
      ["정책", "security group outbound/inbound, NACL ephemeral port, firewall rule", "SG는 stateful, NACL은 stateless라는 차이를 반영한다."],
      ["패킷 증거", "flow log ACCEPT/REJECT, NAT bytes, DNS query log", "막힌 위치가 route인지 policy인지 DNS인지 분리한다."],
    ],
    incidentRows: [
      ["증상", "private subnet batch가 외부 결제 API timeout", "route, SG, NACL, DNS, NAT saturation을 순서대로 확인한다."],
      ["완화", "NAT 장애면 대체 AZ NAT route, provider allowlist 문제면 egress IP 고정", "임시 개방은 만료 조건과 audit ticket을 남긴다."],
      ["사후", "egress dependency map과 비용 alert를 추가", "다음 외부 연동 전에 경로와 비용을 사전 리뷰한다."],
    ],
    answerShape: ["CIDR, route, policy, DNS, return path 순서로 설명한다.", "SG와 NACL의 상태성 차이를 장애 판단에 반영한다.", "flow log로 선언된 정책과 실제 패킷을 대조한다."],
  },
  "operations-security-boundary-handbook.html": {
    marker: "SECURITY BOUNDARY OPERATIONS PLAYBOOK",
    evidenceRows: [
      ["Public ingress", "DNS, CDN/WAF, LB listener, allowed path, rate limit", "공개면은 의도한 edge 계층으로 제한한다."],
      ["Identity / Secret", "IAM principal, role assumption, secret location, rotation record", "장기 key와 wildcard 권한은 예외로 관리한다."],
      ["Auditability", "WAF log, auth failure, admin action, egress log, exception expiry", "차단과 허용의 근거가 나중에 조사 가능해야 한다."],
    ],
    commandRows: [
      ["공개면 점검", "DNS record, LB listener, WAF rule, security group ingress 목록화", "인터넷에서 접근 가능한 표면을 실제로 열거한다."],
      ["권한 점검", "IAM policy diff, last-used, access review, break-glass ticket", "필요 권한과 사용된 권한의 차이를 본다."],
      ["비밀 점검", "secret manager version, rotation date, deploy consumer, log redaction", "secret이 repo/image/log/frontend bundle에 남지 않아야 한다."],
    ],
    incidentRows: [
      ["증상", "비정상 admin export 또는 외부 스캔 급증", "actor, source IP, action, resource, WAF/auth log를 묶는다."],
      ["완화", "token revoke, WAF rule tighten, role disable, egress block", "임시 차단은 고객 영향과 만료 조건을 같이 기록한다."],
      ["사후", "least privilege diff, audit alert, rotation drill 추가", "보안 조치가 운영 절차로 남아야 한다."],
    ],
    answerShape: ["공개면, 권한, 비밀, 감사 로그로 나눠 설명한다.", "WAF와 SG/NACL/IAM은 서로 대체하지 않는 통제라고 말한다.", "침해를 막는 것뿐 아니라 탐지와 피해 제한까지 설계한다."],
  },
  "operations-dns-tls-handbook.html": {
    marker: "DNS TLS CHANGE PLAYBOOK",
    evidenceRows: [
      ["DNS record", "record type, authoritative answer, TTL, resolver cache, CAA", "전파 지연과 잘못된 권한 서버를 구분한다."],
      ["TLS chain", "SAN, issuer, expiry, intermediate, SNI, OCSP", "인증서 발급 성공과 사용자 handshake 성공은 다르다."],
      ["Rollback", "previous record, previous certificate, CDN/WAF binding, smoke result", "도메인 변경도 되돌릴 수 있는 변경으로 다룬다."],
    ],
    commandRows: [
      ["권한 DNS", "dig +trace app.example.com, dig NS example.com, dig CAA example.com", "권한 서버와 resolver cache를 분리한다."],
      ["인증서", "openssl s_client -servername app.example.com -connect app.example.com:443 -showcerts", "SNI와 chain 누락을 확인한다."],
      ["사용자 경로", "curl -v --resolve app.example.com:443:IP https://app.example.com/health", "DNS 변경 전후 edge와 origin을 분리 테스트한다."],
    ],
    incidentRows: [
      ["증상", "일부 고객만 인증서 오류 또는 구버전 IP 접속", "resolver, TTL, chain, CDN binding을 먼저 본다."],
      ["완화", "이전 record 복구, 인증서 재연결, CDN cache purge", "전파 중에는 양쪽 endpoint가 모두 안전해야 한다."],
      ["사후", "TTL 사전 변경, CAA/renewal alert, certificate inventory 추가", "갱신 실패가 장애가 되기 전에 알림이 와야 한다."],
    ],
    answerShape: ["DNS 변경은 전파와 rollback을 포함한 변경 관리라고 설명한다.", "TLS는 SAN/SNI/chain/만료/자동갱신까지 운영한다.", "dig, curl, openssl 결과를 변경 티켓에 남긴다."],
  },
  "operations-private-connectivity-handbook.html": {
    marker: "PRIVATE CONNECTIVITY DEBUG PLAYBOOK",
    evidenceRows: [
      ["Tunnel", "IKE/Phase 2 status, lifetime, proposal, rekey log, packet counter", "터널 UP과 서비스 통신 성공을 분리한다."],
      ["Routing / Firewall", "local CIDR, peer CIDR, route table, firewall, return path", "양쪽 네트워크가 같은 증거를 보고 있어야 한다."],
      ["Application path", "source IP, destination IP, port, DNS, tcpdump, nc/curl result", "ICMP 성공만으로 API 성공을 판단하지 않는다."],
    ],
    commandRows: [
      ["협상", "VPN tunnel status, IKE log, Phase 1/2 proposal 비교", "encryption, DH group, PFS, lifetime mismatch를 찾는다."],
      ["포트", "nc -vz host port, curl -v internal-api, tcpdump host peer-ip", "터널이 아니라 실제 업무 포트를 검증한다."],
      ["증거 공유", "timestamp, src/dst, port, packet capture, firewall decision", "고객사와 같은 시간대 증거를 맞춘다."],
    ],
    incidentRows: [
      ["증상", "터널은 UP이나 ERP API timeout", "route, firewall, return path, DNS, app port를 순서대로 본다."],
      ["완화", "backup tunnel, traffic selector 수정, 방화벽 임시 rule", "임시 rule은 만료와 승인자를 반드시 둔다."],
      ["사후", "CIDR registry, proposal baseline, packet evidence template 추가", "다음 연동 때 합의 누락을 줄인다."],
    ],
    answerShape: ["VPN은 터널, 라우팅, 방화벽, DNS, 애플리케이션 포트가 모두 맞아야 한다.", "Phase 1/2 협상 성공과 업무 통신 성공을 구분한다.", "고객사와 공유 가능한 packet evidence를 남긴다."],
  },
  "operations-delivery-pipeline-handbook.html": {
    marker: "RELEASE SAFETY PLAYBOOK",
    evidenceRows: [
      ["Artifact", "commit SHA, image digest, SBOM/provenance, migration version", "branch가 아니라 불변 artifact가 운영 단위다."],
      ["Environment", "config diff, secret source, feature flag, approval gate", "같은 artifact가 환경 설정만 바꿔 승격되어야 한다."],
      ["Release gate", "smoke test, canary metric, error budget, rollback trigger", "배포 성공은 pipeline green이 아니라 운영 지표 통과다."],
    ],
    commandRows: [
      ["배포 추적", "release note, image digest, deploy marker, config version 비교", "어떤 코드와 설정이 production에 있는지 즉시 답해야 한다."],
      ["검증", "smoke endpoint, synthetic transaction, error rate, p95/p99, business KPI", "헬스체크 하나로 사용자 경로를 대체하지 않는다."],
      ["복구", "rollback artifact, feature flag off, forward fix, migration compatibility", "DB 변경이 있으면 rollback 가능성을 별도로 판단한다."],
    ],
    incidentRows: [
      ["증상", "production 배포 후 오류율 상승", "artifact, config, migration, flag, dependency 변경을 대조한다."],
      ["완화", "flag off, canary stop, previous artifact rollback, traffic shift", "가장 작은 폭발 반경으로 되돌린다."],
      ["사후", "metric gate와 smoke test를 실패 케이스 기준으로 강화", "같은 실패가 자동 차단되도록 한다."],
    ],
    answerShape: ["CI/CD는 변경 통제와 복구 시스템이라고 설명한다.", "artifact, environment, metric gate, rollback을 한 흐름으로 묶는다.", "DB migration은 expand-contract와 호환성 검증으로 다룬다."],
  },
  "operations-runtime-orchestration-handbook.html": {
    marker: "RUNTIME ORCHESTRATION PLAYBOOK",
    evidenceRows: [
      ["Pod / Task health", "readiness, liveness, startup probe, restart reason, exit code", "재시작이 회복인지 증상 악화인지 구분한다."],
      ["Traffic", "service selector, target group, ingress rule, connection draining", "정상 pod가 traffic을 받는 경로를 확인한다."],
      ["Capacity", "request/limit, throttling, OOM, HPA signal, queue lag", "CPU 평균보다 saturation과 tail latency를 본다."],
    ],
    commandRows: [
      ["상태", "kubectl get pods, describe pod, logs --previous, rollout status", "CrashLoop, OOMKilled, probe failure를 분리한다."],
      ["네트워크", "service endpoints, ingress events, target health, connection draining", "selector mismatch와 readiness 누락을 찾는다."],
      ["리소스", "CPU throttling, memory working set, ephemeral storage, file descriptor", "limit만 올리기 전에 원인 지표를 확인한다."],
    ],
    incidentRows: [
      ["증상", "rolling update 중 일부 요청 502", "readiness, drain, terminationGracePeriod, target deregistration delay를 본다."],
      ["완화", "rollout pause/undo, scale out, bad pod drain", "새 버전의 폭발 반경을 즉시 줄인다."],
      ["사후", "probe와 graceful shutdown을 실제 요청으로 검증", "다음 배포에서 자동으로 깨지는지 확인한다."],
    ],
    answerShape: ["오케스트레이션은 desired state, health, routing, capacity의 조합이다.", "readiness와 liveness를 분리해 무중단 배포를 설명한다.", "rolling update는 drain과 graceful shutdown까지 맞아야 한다."],
  },
  "operations-iac-change-handbook.html": {
    marker: "IAC CHANGE REVIEW PLAYBOOK",
    evidenceRows: [
      ["Plan diff", "create/update/replace/delete, IAM diff, network diff, downtime risk", "replace와 delete는 별도 승인 기준이 필요하다."],
      ["State / Drift", "state lock, workspace, provider version, import/moved block", "drift를 무조건 덮어쓰지 않는다."],
      ["Apply proof", "apply output, post-check command, rollback/forward-fix, audit ticket", "적용 성공보다 의도한 상태 검증이 중요하다."],
    ],
    commandRows: [
      ["리뷰", "terraform plan -out, terraform show, provider/module version diff", "리소스 교체와 권한 확대를 먼저 표시한다."],
      ["상태", "state lock, workspace, drift detection, import 대상 확인", "state 조작은 변경 티켓과 백업이 필요하다."],
      ["검증", "cloud resource readback, route/listener/SG/IAM 실제 상태 확인", "plan 결과와 실제 리소스를 대조한다."],
    ],
    incidentRows: [
      ["증상", "plan에서 LB replace 또는 SG open 변경", "downtime, DNS, target group, 보안 영향 범위를 먼저 계산한다."],
      ["완화", "create-before-destroy, staged apply, targeted rollback 금지 검토", "부분 apply가 state를 더 망칠 수 있음을 고려한다."],
      ["사후", "drift 원인을 코드에 흡수하거나 콘솔 변경 금지 정책 추가", "운영 hotfix가 반복되면 프로세스 문제다."],
    ],
    answerShape: ["IaC는 코드보다 plan, state, drift, 검증 절차가 핵심이다.", "destructive change와 IAM/network diff를 별도 리뷰한다.", "rollback이 안 되면 forward fix와 staged rollout을 준비한다."],
  },
  "operations-observability-slo-handbook.html": {
    marker: "SLO OBSERVABILITY DESIGN PLAYBOOK",
    evidenceRows: [
      ["SLI", "request success, latency, freshness, durability, business success", "사용자 여정과 연결되지 않은 지표는 paging 기준이 아니다."],
      ["Telemetry", "log schema, metric label, trace sampling, deploy marker", "traceId와 version이 없으면 원인 연결이 약해진다."],
      ["Alert", "multi-window burn rate, runbook, owner, silence policy", "알림은 사람이 취할 행동과 연결되어야 한다."],
    ],
    commandRows: [
      ["로그", "timestamp, level, service, env, version, trace_id, user/tenant scope", "PII와 secret은 redaction하고 검색 가능한 필드를 남긴다."],
      ["메트릭", "RED/USE dashboard, p95/p99, saturation, high-cardinality label review", "label 폭증은 비용과 성능 장애가 된다."],
      ["SLO", "5m/1h fast burn, 30m/6h slow burn, error budget remaining", "빠른 장애와 느린 품질 저하의 대응을 분리한다."],
    ],
    incidentRows: [
      ["증상", "p99만 증가하고 error rate는 정상", "trace waterfall, downstream latency, queue saturation, deploy marker를 본다."],
      ["완화", "bad dependency timeout 축소, traffic shed, feature degrade", "SLO burn이 빠르면 원인 확정보다 완화가 우선이다."],
      ["사후", "dashboard decision panel과 alert-to-action mapping 개선", "알림 수보다 행동 품질을 개선한다."],
    ],
    answerShape: ["관측 가능성은 수집이 아니라 판단 시간 단축이다.", "SLI/SLO/error budget으로 알림 우선순위를 나눈다.", "로그, 메트릭, 트레이스를 traceId와 version으로 연결한다."],
  },
  "operations-incident-dr-handbook.html": {
    marker: "INCIDENT RESPONSE DRILL PLAYBOOK",
    evidenceRows: [
      ["Incident command", "commander, scribe, comms owner, SME, decision log", "한 사람이 모든 역할을 맡지 않는다."],
      ["Mitigation", "rollback, feature off, traffic shift, queue pause, rate limit", "원인 확정 전에도 사용자 영향 완화를 검토한다."],
      ["Recovery", "restore test, reconciliation, RTO/RPO, failback, postmortem action", "백업 존재가 아니라 복구 성공이 증거다."],
    ],
    commandRows: [
      ["초기 15분", "impact, SLI, recent deploy, dependency status, support trend", "Sev와 커뮤니케이션 채널을 먼저 정한다."],
      ["복구 선택", "rollback 가능성, data loss risk, feature flag, traffic shift, restore point", "코드 rollback과 데이터 restore를 혼동하지 않는다."],
      ["종료", "SLI recovery, synthetic check, business KPI, customer update", "지표 회복 뒤에도 누락 고객 영향이 없는지 확인한다."],
    ],
    incidentRows: [
      ["증상", "결제 성공률 급락", "artifact, flag, dependency, payment ledger, queue lag를 본다."],
      ["완화", "flag off, payment retry pause, rollback, customer comms", "중복 결제와 누락 결제를 동시에 방지한다."],
      ["사후", "timeline, contributing factor, action item, runbook/alert diff", "비난이 아니라 시스템 변경으로 닫는다."],
    ],
    answerShape: ["장애 대응은 역할 분리와 사용자 영향 완화가 먼저다.", "rollback, restore, failover는 서로 다른 복구 전략이다.", "postmortem은 action owner/date와 runbook diff까지 남겨야 한다."],
  },
  "operations-checklist-interview-handbook.html": {
    marker: "OPERATIONS HANDOFF REVIEW PLAYBOOK",
    evidenceRows: [
      ["Handoff", "owner, escalation, architecture, dependency, access, cost", "권한과 책임자가 없으면 인수 완료가 아니다."],
      ["Release readiness", "artifact, config, migration, secret, smoke, rollback", "변경 전 차단 기준을 명확히 둔다."],
      ["Interview evidence", "직접 경험, 일부 참여, 설계 지식, 남은 한계", "모르는 것을 경험처럼 포장하지 않는다."],
    ],
    commandRows: [
      ["인수 리뷰", "service catalog, dashboard, alert, runbook, DR plan, access review", "문서와 실제 운영 화면이 일치해야 한다."],
      ["배포 리뷰", "release note, rollback command, migration compatibility, metric gate", "rollback이 불가능하면 사전 승인과 forward fix가 필요하다."],
      ["답변 준비", "incident packet, postmortem, dashboard screenshot, runbook diff", "면접 답변은 증거 단위로 말한다."],
    ],
    incidentRows: [
      ["증상", "새 팀이 첫 장애에서 owner와 runbook을 찾지 못함", "운영 인수가 문서 전달로 끝났는지 확인한다."],
      ["완화", "임시 owner 지정, critical runbook 보강, access grant", "첫 장애 대응 권한을 확보한다."],
      ["사후", "handoff checklist를 release gate에 포함", "운영 인수 실패를 프로세스에서 차단한다."],
    ],
    answerShape: ["운영 경험은 요청 경로, 배포 경로, 관측, 장애 대응, 인수 산출물로 말한다.", "직접 한 일과 설계로 아는 일을 구분한다.", "증거 없이 도구 이름만 나열하지 않는다."],
  },
  "operations-cloud-scenarios-handbook.html": {
    marker: "AWS AZURE OPERATIONS PLAYBOOK",
    evidenceRows: [
      ["Edge / Ingress", "Route 53/Azure DNS, CloudFront/Front Door, WAF, ALB/App Gateway", "edge와 origin의 장애를 분리한다."],
      ["Runtime / Data", "ECS/EKS/AKS/App Service, RDS/Azure SQL, Redis, storage", "runtime health와 data dependency를 같은 release 단위로 본다."],
      ["Identity / Cost", "IAM/Managed Identity, Secrets Manager/Key Vault, NAT/egress, monitor cost", "보안과 비용도 운영 장애 신호다."],
    ],
    commandRows: [
      ["AWS 경로", "Route 53 answer, CloudFront cache/WAF log, ALB target health, ECS task/RDS metrics", "CloudFront 403과 ALB 5xx를 분리한다."],
      ["Azure 경로", "Azure DNS, Front Door health, Application Gateway probe, AKS/App Service, Azure SQL metrics", "Front Door와 App Gateway의 책임 경계를 본다."],
      ["비용/egress", "NAT Gateway bytes, data transfer, log ingestion, managed service autoscale", "비용 급증도 최근 변경과 같은 timeline에 놓는다."],
    ],
    incidentRows: [
      ["증상", "edge 403 증가 또는 NAT 비용 4배 증가", "WAF rule, origin policy, egress route, retry storm을 본다."],
      ["완화", "WAF rule rollback, cache policy rollback, retry 제한, egress allowlist", "보안과 가용성의 trade-off를 기록한다."],
      ["사후", "cloud-specific runbook과 cost anomaly alert 추가", "서비스명 암기가 아니라 책임 경계로 정리한다."],
    ],
    answerShape: ["AWS/Azure 서비스명을 역할로 매핑해 설명한다.", "edge, network, runtime, data, identity, observability 책임을 나눈다.", "장애와 비용 신호를 같은 운영 timeline에서 다룬다."],
  },
};

const deepDiveRowsByFile = {
  "operations-roadmap-handbook.html": [
    ["SLO / Burn-rate evidence", "fast burn, slow burn, error budget policy, release freeze", "장애와 단순 오류를 사용자 영향 기준으로 구분한다."],
    ["DR DRILL / FAILBACK CHECKLIST", "backup age, replica lag, traffic shift, data reconciliation, failback", "백업 존재가 아니라 복구와 원복 성공이 증거다."],
    ["IAM/Network 증거", "IAM diff, access review, flow log, exception ticket, expiry", "정책 선언이 아니라 실제 접근 경로와 감사 로그로 증명한다."],
    ["Game Day 운영 훈련", "배포 rollback, region degradation, alert fatigue, cost spike", "GAME DAY REVIEW PACKET으로 runbook diff와 follow-up owner/date를 남긴다."],
  ],
  "operations-request-path-handbook.html": [
    ["DNS fail", "NXDOMAIN, wrong CNAME, resolver cache, split-horizon mismatch", "app log가 비어 있으면 DNS/edge에서 요청이 멈췄을 가능성이 높다."],
    ["TLS fail", "certificate expired, SAN mismatch, missing intermediate, SNI mismatch", "curl과 openssl 결과를 같이 보고 브라우저 오류 문구만 믿지 않는다."],
    ["LB fail", "unhealthy target, no healthy upstream, idle timeout, deregistration delay", "502/503/504를 같은 서버 오류로 묶지 않는다."],
    ["App/DB fail", "pool pending, lock wait, slow query, downstream timeout", "trace waterfall에서 가장 먼저 늘어난 구간을 찾는다."],
  ],
  "operations-vpc-routing-handbook.html": [
    ["Route miss", "destination route 없음, 잘못된 NAT/IGW/TGW target, 더 구체적인 route 우선", "패킷이 어느 next hop으로 가는지부터 확인한다."],
    ["Policy block", "SG outbound, SG inbound, NACL inbound/outbound, firewall deny", "stateful과 stateless 정책을 구분한다."],
    ["DNS path", "private DNS override 누락, public endpoint 해석, resolver rule 불일치", "네트워크가 맞아도 이름이 다른 경로를 가리키면 실패한다."],
    ["Return path", "peer route 누락, asymmetric routing, ephemeral port 차단", "요청 경로와 응답 경로가 모두 열려야 한다."],
  ],
  "operations-observability-slo-handbook.html": [
    ["Good SLI", "checkout_success_rate, payment_authorized_latency_p95, report_freshness", "사용자 여정의 성공/지연/신선도와 연결된다."],
    ["Bad SLI", "CPU average, pod restart count only, raw request count", "원인 지표일 수는 있지만 사용자 영향 기준으로는 약하다."],
    ["Alert rule", "fast burn은 즉시 paging, slow burn은 근무 시간 처리", "모든 알림이 사람을 깨우면 중요한 장애를 놓친다."],
    ["Cardinality guard", "user_id, request_id, raw URL을 metric label로 쓰지 않음", "관측 시스템 자체가 비용/성능 장애가 될 수 있다."],
  ],
  "operations-incident-dr-handbook.html": [
    ["Commander", "우선순위와 의사결정 담당", "명령권이 분산되면 완화가 늦어진다."],
    ["Scribe", "timeline, 결정, 명령, 결과 기록", "기록이 없으면 사후 분석이 추측이 된다."],
    ["Comms", "내부/고객 공지와 ETA 관리", "고객 영향이 있는 장애는 기술 복구와 커뮤니케이션을 분리한다."],
    ["SME", "원인 후보 검증과 안전한 명령 제안", "전문가는 의사결정을 독점하지 않고 증거를 제공한다."],
  ],
  "operations-cloud-scenarios-handbook.html": [
    ["CloudFront / Front Door 403", "WAF rule, origin policy, signed URL/cookie, geo rule", "edge 차단과 origin 차단을 분리한다."],
    ["ALB / App Gateway 502", "target health, backend protocol, TLS to origin, idle timeout", "edge가 정상이어도 origin 연결이 실패할 수 있다."],
    ["RDS / Azure SQL pressure", "connection count, CPU, lock wait, storage IOPS, replica lag", "DB 병목과 app pool 설정을 같이 본다."],
    ["NAT / Egress cost spike", "NAT bytes, retry storm, log export, cross-AZ traffic", "비용 급증을 운영 incident로 취급한다."],
  ],
};

const practiceLabsByFile = {
  "operations-roadmap-handbook.html": [
    {
      title: "운영 준비도 packet 판독",
      scenario: "신규 서비스를 production에 올리기 전 운영 준비도 리뷰를 진행한다.",
      command: "readiness packet\nowner=team-payments\nslo=checkout_success 99.9\nrollback=artifact sha-prev\nrestore_drill=not_run\nalert_owner=empty",
      purpose: "런칭 전 차단해야 할 운영 공백을 찾는다.",
      normalOutput: "owner=team-payments\nslo=checkout_success 99.9\nrollback=validated\nrestore_drill=2026-06-20 pass\nalert_owner=oncall-payments",
      abnormalOutput: "restore_drill=not_run\nalert_owner=empty\nrunbook=diagram-only\ncost_owner=unknown",
      interpretation: "아키텍처는 있어도 복구 검증과 알림 owner가 없으면 운영 준비가 끝난 것이 아니다.",
      mitigation: "런칭 gate를 보류하고 alert owner, rollback command, restore drill 일정을 확정한다.",
      permanentFix: "운영 인수 체크리스트에 owner, SLO, rollback, restore drill, cost owner를 필수 항목으로 둔다.",
      verification: "readiness packet의 모든 owner와 마지막 drill 시간이 채워지고 smoke/rollback 검증이 통과한다.",
    },
    {
      title: "배포 직후 5xx 증가 triage",
      scenario: "새 artifact 배포 8분 뒤 checkout 5xx와 p95 latency가 동시에 증가한다.",
      command: "incident snapshot\nsli=checkout_success burn=14x\ndeploy_marker=api:sha-9f31 at T-8m\nalb_5xx=up\napp_error=up\ndb_pool_pending=flat\nrollback=available",
      purpose: "사용자 영향과 최근 변경을 같은 시간축에 두고 rollback 후보를 판단한다.",
      normalOutput: "burn=0.7x\ndeploy_marker=none\nalb_5xx=baseline\nrollback=not_needed",
      abnormalOutput: "burn=14x\ndeploy_marker=api:sha-9f31\nalb_5xx=up\napp_error=up\nrollback=available",
      interpretation: "최근 배포와 사용자 영향이 강하게 연결되어 원인 확정 전 rollback 또는 feature flag off를 검토해야 한다.",
      mitigation: "canary stop, feature flag off, previous artifact rollback 중 폭발 반경이 가장 작은 조치를 실행한다.",
      permanentFix: "metric gate에 checkout_success burn rate와 app 5xx를 추가하고 rollback decision log를 release runbook에 넣는다.",
      verification: "burn rate 1x 이하, 5xx baseline 복귀, rollback artifact와 config version 기록 완료.",
    },
    {
      title: "DNS/TLS edge 장애 판독",
      scenario: "일부 지역 사용자만 접속 실패를 보고하고 앱 로그에는 요청이 없다.",
      command: "edge evidence\ndig_public=NXDOMAIN\ndig_authoritative=NOERROR ttl=60\nopenssl_verify=ok\nwaf_request_id=missing\napp_log=missing",
      purpose: "앱 장애와 edge 이전 장애를 분리한다.",
      normalOutput: "dig_public=NOERROR\ndig_authoritative=NOERROR\nwaf_request_id=present\napp_log=present",
      abnormalOutput: "dig_public=NXDOMAIN\nwaf_request_id=missing\napp_log=missing\nresolver_region=ap-northeast",
      interpretation: "요청이 edge/app까지 도달하지 않았으므로 DNS resolver cache, delegation, record 변경을 먼저 의심한다.",
      mitigation: "이전 record 복구, TTL 전파 모니터링, status update, affected resolver 확인.",
      permanentFix: "DNS 변경 티켓에 TTL 사전 조정, authoritative/public resolver 검증, rollback record를 필수화한다.",
      verification: "public resolver와 authoritative resolver 모두 NOERROR, WAF request id와 app access log 재등장.",
    },
    {
      title: "Private subnet egress 장애 판독",
      scenario: "private subnet의 배치 작업이 외부 결제 API timeout을 반복하고 NAT 비용도 증가한다.",
      command: "egress evidence\nroute_0_0_0_0=nat-123\nflow_log=ACCEPT\nnat_bytes=4x\nretry_rate=9x\napi_timeout=up",
      purpose: "라우팅 성공, 정책 허용, retry storm, 비용 신호를 한 incident로 묶는다.",
      normalOutput: "nat_bytes=baseline\nretry_rate=baseline\napi_timeout=0\nflow_log=ACCEPT",
      abnormalOutput: "nat_bytes=4x\nretry_rate=9x\napi_timeout=up\nprovider_429=up",
      interpretation: "네트워크가 막힌 것이 아니라 외부 API 지연/429와 재시도가 NAT 비용과 timeout을 키우는 상황일 수 있다.",
      mitigation: "retry backoff 강화, batch concurrency 축소, circuit breaker 또는 queue pause.",
      permanentFix: "egress dependency map, retry budget, NAT cost anomaly alert, external API SLO를 추가한다.",
      verification: "retry rate baseline, NAT bytes 정상화, batch success 회복, provider 429 감소.",
    },
    {
      title: "SLO burn과 incident 역할 판독",
      scenario: "결제 성공률 fast burn이 발생했는데 장애 채널에서 여러 명이 동시에 명령한다.",
      command: "incident channel\nburn_5m=18x\nIC=missing\nscribe=missing\ncommands=rollback,scale-out,db-restart\ncustomer_comms=missing",
      purpose: "기술 신호와 incident command 실패를 동시에 판정한다.",
      normalOutput: "burn_5m=0.8x\nIC=assigned\nscribe=assigned\ncommands=single_owner\ncustomer_comms=ready",
      abnormalOutput: "burn_5m=18x\nIC=missing\nmultiple_commands=true\ncustomer_comms=missing",
      interpretation: "fast burn 자체도 문제지만 역할과 의사결정 기록이 없어 완화 품질이 떨어지는 상태다.",
      mitigation: "IC 지정, 명령권 단일화, scribe와 comms owner 지정, 완화 후보 하나를 선택한다.",
      permanentFix: "incident role checklist, decision log template, fast burn paging runbook을 추가한다.",
      verification: "timeline, decision owner, customer update, recovery signal, runbook diff가 postmortem에 남음.",
    },
    {
      title: "Restore drill RPO/RTO 판독",
      scenario: "DB 장애 대비 restore drill을 수행했지만 목표 시간을 초과했다.",
      command: "restore drill\nbackup_age=17m\nrestore_duration=42m\nreplica_lag=11m\nmissing_rows=128\nRPO=5m\nRTO=30m",
      purpose: "백업 존재와 복구 가능성을 구분하고 RPO/RTO 위반을 판정한다.",
      normalOutput: "backup_age=4m\nrestore_duration=18m\nreplica_lag=30s\nmissing_rows=0\nRPO=met\nRTO=met",
      abnormalOutput: "backup_age=17m\nrestore_duration=42m\nreplica_lag=11m\nmissing_rows=128\nRPO=breach\nRTO=breach",
      interpretation: "복구는 됐지만 허용 데이터 손실과 복구 시간 목표를 모두 넘었고 reconciliation이 필요하다.",
      mitigation: "write freeze, 영향 고객 범위 산정, reconciliation job 실행, failback 계획 고정.",
      permanentFix: "backup frequency, replica lag alert, restore automation, failback drill을 개선한다.",
      verification: "다음 drill에서 RPO/RTO met, missing rows 0, failback 절차 완료.",
    },
  ],
  "operations-request-path-handbook.html": [
    {
      title: "ALB target health 502 판독",
      scenario: "배포 직후 로그인 API에서 502가 증가한다. 앱 로그는 일부 요청만 남고 ALB target health가 흔들린다.",
      command: "aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:region:acct:targetgroup/app-login/abc",
      purpose: "ALB가 upstream target을 정상으로 보고 있는지 확인한다.",
      normalOutput: "TargetHealth.State: healthy\nHealthCheckPort: traffic-port\nTarget.ResponseCode: 200",
      abnormalOutput: "TargetHealth.State: unhealthy\nTargetHealth.Reason: Target.ResponseCodeMismatch\nDescription: Health checks failed with these codes: [500]",
      interpretation: "ALB 502가 앱 코드 전체 문제가 아니라 target health check path 또는 새 버전 readiness 문제일 수 있다.",
      mitigation: "신규 target drain, rollout pause, 이전 artifact rollback.",
      permanentFix: "health check path를 실제 readiness와 분리하고 배포 smoke test에 target health gate를 추가한다.",
      verification: "unhealthy target 0, ALB 5xx 정상화, app access log와 traceId가 다시 연결됨.",
    },
    {
      title: "DNS NXDOMAIN vs cache 판독",
      scenario: "일부 지역 사용자만 app.example.com 접속 실패를 보고한다.",
      command: "dig +trace app.example.com\n\ndig app.example.com @8.8.8.8",
      purpose: "권한 DNS와 public resolver cache 차이를 분리한다.",
      normalOutput: "app.example.com. 60 IN A 203.0.113.10\nstatus: NOERROR",
      abnormalOutput: "status: NXDOMAIN\n;; no servers could be reached from delegated zone",
      interpretation: "앱 장애가 아니라 record 삭제, zone delegation, resolver cache 문제일 수 있다.",
      mitigation: "이전 record 복구, TTL 전파 모니터링, CDN origin fallback 확인.",
      permanentFix: "DNS change ticket에 TTL 사전 조정, rollback record, 권한 DNS 검증을 필수화한다.",
      verification: "authoritative resolver와 public resolver 모두 NOERROR, CDN/WAF request id 재등장.",
    },
  ],
  "operations-vpc-routing-handbook.html": [
    {
      title: "Route table egress 판독",
      scenario: "private subnet batch가 외부 결제 API를 호출하지 못한다.",
      command: "aws ec2 describe-route-tables --filters Name=association.subnet-id,Values=subnet-private-a",
      purpose: "0.0.0.0/0가 NAT로 향하는지, 더 구체적인 prefix가 잘못 잡히지 않았는지 확인한다.",
      normalOutput: "DestinationCidrBlock: 0.0.0.0/0\nNatGatewayId: nat-12345\nState: active",
      abnormalOutput: "DestinationCidrBlock: 0.0.0.0/0\nGatewayId: local\nState: active",
      interpretation: "private subnet의 egress next hop이 NAT가 아니어서 외부 API 호출이 실패한다.",
      mitigation: "임시로 올바른 NAT route를 연결하고 결제 API allowlist 영향도 확인한다.",
      permanentFix: "subnet별 route table review와 egress dependency map을 release checklist에 추가한다.",
      verification: "flow log ACCEPT, NAT bytes 증가, 결제 API synthetic check 성공.",
    },
  ],
  "operations-security-boundary-handbook.html": [
    {
      title: "IAM 권한 확대 diff 판독",
      scenario: "배포 pipeline role에 임시 권한을 추가한 뒤 보안 리뷰가 들어왔다.",
      command: "iam policy diff\n- s3:GetObject arn:aws:s3:::app-config/*\n+ s3:*\n+ kms:Decrypt *\nlastUsed=never\nexceptionExpiry=missing",
      purpose: "권한 확대가 최소 권한 원칙과 예외 만료 기준을 만족하는지 확인한다.",
      normalOutput: "Action: s3:GetObject\nResource: arn:aws:s3:::app-config/prod/*\nCondition: aws:PrincipalArn pipeline-role\nexceptionExpiry=2026-07-05",
      abnormalOutput: "Action: s3:*\nResource: *\nAction: kms:Decrypt\nResource: *\nexceptionExpiry=missing",
      interpretation: "pipeline 권한이 배포 범위를 넘어섰고 만료 없는 예외라 침해 반경이 커진다.",
      mitigation: "wildcard 권한을 즉시 되돌리고 필요한 read 권한만 한정한다.",
      permanentFix: "IAM diff review gate, last-used review, exception expiry alert를 추가한다.",
      verification: "wildcard action/resource 0, break-glass ticket 만료일 존재, audit log에서 사용 권한 확인.",
    },
  ],
  "operations-dns-tls-handbook.html": [
    {
      title: "TLS chain/SNI 판독",
      scenario: "모바일 브라우저 일부에서만 인증서 오류가 발생한다.",
      command: "openssl s_client -servername app.example.com -connect app.example.com:443 -showcerts",
      purpose: "SNI, SAN, 만료일, intermediate chain 누락을 확인한다.",
      normalOutput: "Verify return code: 0 (ok)\nsubjectAltName = DNS:app.example.com\nnotAfter=Sep 20 12:00:00 2026 GMT",
      abnormalOutput: "Verify return code: 21 (unable to verify the first certificate)\nsubjectAltName = DNS:old.example.com",
      interpretation: "서버 연결은 되지만 인증서 체인 또는 SNI binding이 잘못된 상태다.",
      mitigation: "CDN/LB 인증서 binding rollback 또는 올바른 certificate chain 재배포.",
      permanentFix: "certificate inventory, renewal alert, SNI smoke test를 배포 gate에 추가한다.",
      verification: "openssl verify ok, curl -v handshake 성공, 브라우저 오류 재현 중단.",
    },
  ],
  "operations-private-connectivity-handbook.html": [
    {
      title: "VPN tunnel UP but API timeout 판독",
      scenario: "Site-to-Site VPN 터널은 UP이지만 고객사 ERP API 호출이 timeout 된다.",
      command: "vpn packet evidence\nsrc=10.12.4.18 dst=172.20.8.10 port=443\nphase1=UP phase2=UP\npacket_out=42 packet_in=0\ncustomer_firewall=deny",
      purpose: "터널 상태와 실제 애플리케이션 포트 통신을 분리한다.",
      normalOutput: "phase2=UP\npacket_out=42\npacket_in=42\nfirewall=allow\ncurl_status=200",
      abnormalOutput: "phase2=UP\npacket_out=42\npacket_in=0\ncustomer_firewall=deny\ncurl_status=timeout",
      interpretation: "VPN 자체보다 고객사 방화벽, return path, traffic selector 문제일 가능성이 높다.",
      mitigation: "고객사에 timestamp, src/dst, port, packet counter를 전달하고 임시 allow rule을 요청한다.",
      permanentFix: "연동 runbook에 packet evidence template과 방화벽 변경 승인 절차를 포함한다.",
      verification: "packet_in 증가, curl 200, 고객사 firewall allow log, 애플리케이션 health check 성공.",
    },
  ],
  "operations-delivery-pipeline-handbook.html": [
    {
      title: "배포 metric gate 판독",
      scenario: "production deploy는 성공했지만 checkout error rate가 canary에서 증가한다.",
      command: "release gate\nartifact=sha-9f31\nconfig=prod-v42\ncanary_error_rate=7.8%\nbaseline_error_rate=0.4%\np95=980ms\nrollback=available",
      purpose: "pipeline 성공과 운영 배포 성공을 분리해 판단한다.",
      normalOutput: "canary_error_rate=0.3%\nbaseline_error_rate=0.4%\np95=180ms\nmetric_gate=pass",
      abnormalOutput: "canary_error_rate=7.8%\nbaseline_error_rate=0.4%\np95=980ms\nmetric_gate=fail",
      interpretation: "CI/CD stage는 통과했지만 사용자 영향 지표가 나빠져 배포를 중단해야 한다.",
      mitigation: "canary stop, 이전 artifact rollback, feature flag off.",
      permanentFix: "metric gate를 필수화하고 release note에 artifact/config/migration version을 묶는다.",
      verification: "canary error rate baseline 복귀, p95 회복, rollback artifact 검증 완료.",
    },
  ],
  "operations-runtime-orchestration-handbook.html": [
    {
      title: "OOMKilled 판독",
      scenario: "배포 후 일부 pod가 재시작되고 p99 latency가 증가한다.",
      command: "kubectl describe pod api-7d9f -n production\n\nkubectl logs api-7d9f -n production --previous",
      purpose: "재시작 원인이 liveness 실패인지 OOMKilled인지 구분한다.",
      normalOutput: "Last State: Terminated\nReason: Completed\nRestart Count: 0",
      abnormalOutput: "Last State: Terminated\nReason: OOMKilled\nExit Code: 137\nRestart Count: 8",
      interpretation: "앱 오류가 아니라 memory limit 또는 leak, traffic spike로 인한 OOM 후보가 강하다.",
      mitigation: "rollout pause, replica scale-out, memory limit 임시 상향, heavy endpoint rate limit.",
      permanentFix: "memory profile, request/limit 재조정, load test, alert에 OOMKilled count 추가.",
      verification: "restart count 안정화, p99 회복, memory working set이 limit 아래 유지.",
    },
    {
      title: "Service selector mismatch 판독",
      scenario: "pod는 Running인데 서비스가 503을 반환한다.",
      command: "kubectl get endpoints api -n production\n\nkubectl get svc api -o yaml",
      purpose: "Service selector가 실제 pod label과 연결되는지 확인한다.",
      normalOutput: "ENDPOINTS: 10.0.12.4:8080,10.0.13.8:8080\nselector: app=api",
      abnormalOutput: "ENDPOINTS: <none>\nselector: app=api-v2",
      interpretation: "runtime은 정상이나 Service가 traffic target을 찾지 못한다.",
      mitigation: "selector rollback 또는 pod label hotfix.",
      permanentFix: "deployment/service label contract test와 rollout smoke test를 추가한다.",
      verification: "endpoints populated, target health healthy, 503 감소.",
    },
  ],
  "operations-iac-change-handbook.html": [
    {
      title: "Terraform replace 판독",
      scenario: "네트워크 변경 PR에서 Load Balancer replacement가 plan에 포함됐다.",
      command: "terraform plan -out=tfplan\n\nterraform show tfplan",
      purpose: "create/update/replace/delete와 downtime risk를 분리한다.",
      normalOutput: "Plan: 0 to add, 2 to change, 0 to destroy.",
      abnormalOutput: "# aws_lb.app must be replaced\n-/+ resource \"aws_lb\" \"app\"\nPlan: 1 to add, 0 to change, 1 to destroy.",
      interpretation: "이 변경은 단순 설정 변경이 아니라 downtime 가능성이 있는 교체다.",
      mitigation: "apply 중단, create-before-destroy 가능성 검토, maintenance window 설정.",
      permanentFix: "LB name/resource identity 변경을 금지하고 destructive plan review gate를 추가한다.",
      verification: "plan에서 replace/delete 0, 실제 LB DNS와 target group 유지.",
    },
    {
      title: "State lock 판독",
      scenario: "긴급 변경 중 Terraform apply가 lock 오류로 실패한다.",
      command: "terraform apply tfplan",
      purpose: "동시 apply인지 stale lock인지 구분한다.",
      normalOutput: "Apply complete! Resources: 0 added, 2 changed, 0 destroyed.",
      abnormalOutput: "Error acquiring the state lock\nLock Info:\n  Operation: OperationTypeApply\n  Who: ci@runner-12",
      interpretation: "다른 apply가 진행 중이거나 이전 실패 lock이 남아 있다. 강제 unlock은 마지막 수단이다.",
      mitigation: "현재 apply owner 확인, CI job 중단 여부 확인, 변경 freeze.",
      permanentFix: "state lock owner alert와 apply concurrency guard를 추가한다.",
      verification: "state lock 해제 근거 기록, plan 재생성 후 apply 성공.",
    },
  ],
  "operations-observability-slo-handbook.html": [
    {
      title: "Fast burn alert 판독",
      scenario: "checkout 성공률이 급격히 떨어졌지만 CPU와 memory는 정상이다.",
      command: "sum(rate(http_requests_total{route=\"/checkout\",status=~\"5..\"}[5m])) / sum(rate(http_requests_total{route=\"/checkout\"}[5m]))",
      purpose: "리소스 지표가 아니라 사용자 성공률 기준으로 SLO burn을 판단한다.",
      normalOutput: "5m burn: 0.4x\n1h burn: 0.7x\nerror budget remaining: 82%",
      abnormalOutput: "5m burn: 18x\n1h burn: 9x\nerror budget remaining: 42%",
      interpretation: "5m와 1h 창이 동시에 나빠져 즉시 paging해야 하는 fast burn이다.",
      mitigation: "checkout feature flag off, payment dependency timeout 축소, rollback 후보 검토.",
      permanentFix: "checkout_success SLI와 alert-to-action runbook을 분리하고 dependency timeout budget을 재조정한다.",
      verification: "5m burn 1x 이하, checkout success 회복, incident runbook action 완료.",
    },
    {
      title: "Slow burn freshness 판독",
      scenario: "리포트 생성은 실패하지 않지만 데이터 freshness가 계속 늦어진다.",
      command: "sum_over_time(report_freshness_violation_total[6h])",
      purpose: "즉시 장애가 아닌 느린 품질 저하를 SLO로 관리한다.",
      normalOutput: "violations_6h: 0\nfreshness_p95: 4m",
      abnormalOutput: "violations_6h: 37\nfreshness_p95: 48m",
      interpretation: "사용자 요청 실패가 없어도 freshness SLO를 태우는 slow burn이다.",
      mitigation: "batch concurrency 조정, low-priority job pause, customer comms 준비.",
      permanentFix: "queue lag 기반 autoscaling과 freshness dashboard를 추가한다.",
      verification: "freshness_p95 목표 이하, 6h violation 0, backlog 정상화.",
    },
  ],
  "operations-incident-dr-handbook.html": [
    {
      title: "Incident timeline 판독",
      scenario: "결제 성공률이 급락했고 배포와 외부 결제사 지연이 같은 시간대에 있다.",
      command: "incident packet\nT+00 alert checkout_success < 97%\nT+04 deploy marker api:sha-abc\nT+07 payment_provider_p95 4.8s\nT+11 rollback started\nT+18 success rate recovered",
      purpose: "원인 확정 전 완화와 의사결정 기록이 충분한지 확인한다.",
      normalOutput: "IC assigned\nscribe timeline complete\nmitigation owner set\ncustomer comms ETA set",
      abnormalOutput: "No IC\nmultiple people issued commands\nrollback decision not recorded\ncustomer ETA missing",
      interpretation: "기술 조치보다 먼저 역할, 결정권, 기록, 커뮤니케이션이 무너진 상태다.",
      mitigation: "IC 지정, 명령권 단일화, rollback/flag off 중 하나 선택, comms owner 지정.",
      permanentFix: "incident role checklist와 decision log template을 runbook에 포함한다.",
      verification: "timeline, decision, owner, customer update, recovery signal이 postmortem에 남음.",
    },
    {
      title: "Restore drill RPO/RTO 판독",
      scenario: "primary DB 장애 후 replica 승격과 restore drill을 수행한다.",
      command: "restore drill report\nbackup_age=17m\nrestore_duration=42m\nreplica_lag=11m\nreconciliation_missing_rows=128",
      purpose: "백업 존재가 아니라 RPO/RTO 충족 여부를 판단한다.",
      normalOutput: "backup_age=4m\nrestore_duration=18m\nreplica_lag=30s\nreconciliation_missing_rows=0\nRPO met\nRTO met",
      abnormalOutput: "backup_age=17m\nrestore_duration=42m\nreplica_lag=11m\nreconciliation_missing_rows=128\nRPO breach\nRTO breach",
      interpretation: "복구는 됐지만 목표 손실/시간을 초과했고 데이터 reconciliation이 필요하다.",
      mitigation: "write freeze, customer impact scope 산정, reconciliation job 실행.",
      permanentFix: "backup frequency, replica lag alert, restore automation, failback drill을 개선한다.",
      verification: "다음 drill에서 RPO/RTO met, missing rows 0, failback 절차 완료.",
    },
  ],
  "operations-checklist-interview-handbook.html": [
    {
      title: "운영 인수 gap 판독",
      scenario: "서비스를 인수받았지만 첫 장애에서 알림 owner와 runbook 실행 권한이 없다.",
      command: "handoff review\narchitecture=present\ndashboard=present\nalert_owner=missing\nrunbook_access=denied\nbackup_restore_drill=unknown\ncost_owner=missing",
      purpose: "문서 전달과 실제 운영 가능 상태를 구분한다.",
      normalOutput: "alert_owner=oncall-core\nrunbook_access=granted\nbackup_restore_drill=2026-06-18 pass\ncost_owner=platform-finops",
      abnormalOutput: "alert_owner=missing\nrunbook_access=denied\nbackup_restore_drill=unknown\ncost_owner=missing",
      interpretation: "아키텍처 문서는 받았지만 운영 책임, 권한, 복구 증거가 빠진 인수 실패 상태다.",
      mitigation: "임시 owner 지정, runbook access grant, critical alert route 보정.",
      permanentFix: "인수 완료 기준에 owner/access/drill/cost 항목을 차단 gate로 추가한다.",
      verification: "첫 장애 대응자가 dashboard, alert, runbook, rollback, restore 권한을 모두 실행 가능.",
    },
  ],
  "operations-cloud-scenarios-handbook.html": [
    {
      title: "Azure private connectivity 판독",
      scenario: "Azure App Service가 Azure SQL Private Endpoint에 간헐적으로 연결하지 못한다.",
      command: "az network watcher test-connectivity --source-resource app-service-id --dest-address db.privatelink.database.windows.net --dest-port 1433",
      purpose: "DNS, NSG, Private Endpoint 경로가 실제로 연결 가능한지 확인한다.",
      normalOutput: "ConnectionStatus: Reachable\nAvgLatencyInMs: 12\nHops: PrivateEndpoint",
      abnormalOutput: "ConnectionStatus: Unreachable\nHops: Internet\nIssue: DNS resolved public endpoint",
      interpretation: "Private Endpoint는 있어도 DNS가 public endpoint를 반환하면 사설 경로가 아니다.",
      mitigation: "Private DNS zone link와 resolver rule을 수정한다.",
      permanentFix: "Private Endpoint 생성 runbook에 DNS resolution 검증과 public access disabled 확인을 추가한다.",
      verification: "test-connectivity Reachable, nslookup 사설 IP 반환, Azure SQL public access disabled.",
    },
  ],
};

const termsByFile = {
  "operations-roadmap-handbook.html": [
    ["request path", "사용자 요청이 DNS에서 DB까지 통과하는 운영 경로.", "DNS/CDN/WAF/LB/App/DB dependency map, traceId, app log", "앱 로그가 없으면 앱 문제가 없다는 뜻이다.", "DNS, CDN/WAF, Load Balancer, DB pool"],
    ["change path", "코드 변경이 CI/CD에서 runtime과 incident response까지 검증되는 흐름.", "CI run, artifact digest, deploy marker, SLO dashboard", "CI green이면 운영 성공이다.", "artifact, environment, metric gate, rollback"],
    ["SLO", "사용자 경험 기준의 내부 신뢰성 목표.", "SLO dashboard, error budget, alert owner", "모든 오류를 같은 우선순위로 처리하면 된다.", "SLI, error budget, paging"],
    ["runbook", "장애나 변경 시 반복 실행 가능한 절차 문서.", "runbook owner, rollback command, restore drill date", "문서 링크만 있으면 운영 인수 완료다.", "owner, drill, incident packet"],
    ["RPO/RTO", "허용 가능한 데이터 손실과 복구 시간 목표.", "DR plan, restore drill, replica lag, failover result", "백업이 있으면 DR 준비가 끝난다.", "backup, restore, DR"],
  ],
  "operations-request-path-handbook.html": [
    ["DNS", "도메인이 실제로 어떤 IP나 CNAME으로 해석되는지 확인하는 이름 해석 체계.", "dig +trace, public resolver result, TTL", "앱 로그가 비면 DNS는 정상이다.", "resolver cache, authoritative answer, TTL"],
    ["TLS", "HTTPS 연결 전에 인증서와 암호화 조건을 합의하는 단계.", "curl -v, openssl s_client, SAN/SNI/chain", "인증서 발급 성공은 사용자 접속 성공과 같다.", "SNI, SAN, intermediate chain"],
    ["CDN/WAF request id", "edge 계층에서 요청을 추적하는 식별자.", "CDN log, WAF log, edge 403", "403은 항상 앱 권한 문제다.", "edge, WAF, origin"],
    ["target health", "Load Balancer가 backend를 받을 수 있는 상태로 보는지의 판단.", "LB target health, health check status, 502/503/504", "pod가 Running이면 LB도 정상이다.", "health check, readiness, drain"],
    ["connection pool", "App이 DB 연결을 재사용하기 위해 관리하는 연결 집합.", "pool pending, DB wait event, request timeout", "DB CPU가 낮으면 DB 병목이 아니다.", "slow query, lock wait, timeout"],
  ],
  "operations-vpc-routing-handbook.html": [
    ["CIDR", "VPC와 subnet의 IP 주소 범위 표기.", "VPC CIDR, subnet mask, overlap check", "RFC1918 대역이면 언제나 안전하다.", "subnet, peering, VPN"],
    ["route table", "패킷의 다음 hop을 결정하는 라우팅 규칙.", "destination prefix, target, effective route", "subnet 이름이 private면 인터넷 경로가 없다.", "NAT Gateway, IGW, longest prefix match"],
    ["ingress", "외부에서 서비스 안으로 들어오는 경로.", "source IP, destination port, SG inbound, WAF log", "LB만 있으면 ingress 통제는 끝난다.", "egress, security group, WAF"],
    ["egress", "서비스 내부에서 외부로 나가는 경로.", "NAT metric, SG outbound, DNS query log, flow log", "outbound rule만 열면 응답도 보장된다.", "return path, NACL, NAT Gateway"],
    ["Private Endpoint", "관리형 서비스를 public internet 없이 사설 경로로 접근하게 하는 연결.", "private DNS, endpoint policy, public access disabled", "endpoint 생성만으로 트래픽이 사설화된다.", "PrivateLink, DNS override, flow log"],
  ],
  "operations-security-boundary-handbook.html": [
    ["public ingress", "인터넷에서 접근 가능한 진입 표면.", "public DNS, CDN/WAF distribution, LB listener", "WAF가 있으면 내부 앱 노출도 괜찮다.", "edge, security group, external scan"],
    ["WAF", "L7 요청 패턴을 기준으로 악성 또는 비정상 요청을 줄이는 통제.", "WAF rule hit, false positive rate, deny log", "WAF는 네트워크 방화벽과 같은 역할이다.", "firewall, rate limit, CDN"],
    ["security group", "stateful L4 허용 목록.", "SG inbound/outbound diff, source, port", "NACL과 동작 방식이 같다.", "NACL, L4, ingress"],
    ["IAM principal", "권한을 부여받는 사람, 서비스, pipeline, workload identity.", "principal, role assumption, last-used, policy diff", "하나의 admin key로 운영해도 편하면 된다.", "role, least privilege, audit log"],
    ["secret rotation", "비밀값을 revoke, 재발급, 배포, 영향 확인까지 교체하는 절차.", "secret version, rotation date, consumer list", "새 secret을 만들면 rotation이 끝난다.", "revoke, runtime injection, audit"],
  ],
  "operations-dns-tls-handbook.html": [
    ["TTL", "resolver가 DNS 응답을 캐시하는 시간.", "authoritative answer, resolver cache, provider change history", "작업 직전에 낮추면 즉시 전파된다.", "record rollback, resolver, propagation"],
    ["CNAME/ALIAS", "이름을 다른 이름이나 provider alias 대상으로 연결하는 record.", "CNAME/ALIAS chain, dig result", "모든 DNS provider의 ALIAS 동작은 같다.", "A record, flattening, CDN binding"],
    ["CAA", "어떤 CA가 인증서를 발급할 수 있는지 제한하는 DNS record.", "dig CAA, certificate issuance log", "CAA는 인증서 운영과 무관하다.", "TLS, issuer, renewal"],
    ["split-horizon DNS", "같은 이름이 내부와 외부에서 다른 IP로 해석되는 구성.", "internal resolver, public resolver, Private DNS zone", "한 resolver 결과가 모든 사용자 결과다.", "VPN resolver, conditional forwarder, Private Endpoint"],
    ["SNI", "TLS handshake에서 접속하려는 hostname을 서버에 전달하는 값.", "openssl s_client -servername, SAN mismatch", "IP만 맞으면 인증서도 맞는다.", "SAN, certificate binding, handshake"],
  ],
  "operations-private-connectivity-handbook.html": [
    ["Site-to-Site VPN", "인터넷 위에 암호화 터널을 만들어 사설망을 연결하는 방식.", "tunnel status, latency, SLA, cost", "터널 UP이면 서비스 통신도 성공이다.", "IPsec, Direct Connect, ExpressRoute"],
    ["IPsec Phase 1", "IKE SA를 만들어 터널 협상 기반을 세우는 단계.", "IKE log, encryption, integrity, DH group", "Phase 1만 성공하면 데이터 패킷도 흐른다.", "IKE SA, PSK, proposal"],
    ["IPsec Phase 2", "실제 데이터 트래픽용 IPsec SA를 협상하는 단계.", "IPsec SA, PFS, lifetime, traffic selector", "Phase 2 selector는 대략 맞아도 된다.", "traffic selector, rekey, packet counter"],
    ["CIDR overlap", "양쪽 네트워크 주소 대역이 겹쳐 라우팅이 불가능하거나 모호한 상태.", "local CIDR, peer CIDR, route readback", "NAT로 항상 쉽게 우회할 수 있다.", "route table, VPN, readdressing"],
    ["return path", "응답 패킷이 원 요청자에게 돌아오는 경로.", "route table, firewall log, tcpdump", "요청 경로만 열면 통신이 된다.", "firewall, NACL, packet evidence"],
  ],
  "operations-delivery-pipeline-handbook.html": [
    ["pipeline stage", "install, test, build, publish, deploy 같은 독립 검증 단계.", "stage result, CI run, smoke result", "pipeline은 하나의 성공/실패만 보면 된다.", "CI, deploy, metric gate"],
    ["artifact", "운영에 배포되는 불변 실행 단위.", "image digest, commit SHA, SBOM, provenance", "branch명이나 tag가 배포 증거로 충분하다.", "registry digest, release note, rollback"],
    ["environment config", "같은 artifact에 환경별로 주입되는 설정.", "config diff, env inventory, approval log", "환경 차이는 빌드 artifact에 넣어도 된다.", "runtime config, secret, feature flag"],
    ["metric gate", "배포 후 운영 지표가 기준을 통과해야 진행하는 차단점.", "canary metric, error rate, p95/p99", "deploy 성공이면 release 성공이다.", "smoke test, SLO, canary"],
    ["expand-contract", "DB 변경을 호환 가능한 확장과 정리 단계로 나누는 방식.", "migration compatibility, migration version", "DB migration도 코드처럼 즉시 되돌리면 된다.", "forward fix, rollback, schema migration"],
  ],
  "operations-runtime-orchestration-handbook.html": [
    ["cgroup limit", "컨테이너 CPU, memory 등 리소스 사용 제한.", "CPU throttling, memory working set, OOMKilled", "컨테이너는 VM처럼 독립 리소스를 자동 보장한다.", "request/limit, OOM, throttling"],
    ["Deployment", "Kubernetes에서 원하는 replica 상태와 rollout을 관리하는 객체.", "desired state, rollout status, ReplicaSet", "Deployment가 정상이면 트래픽도 정상이다.", "ReplicaSet, Pod, Service"],
    ["selector", "Service가 traffic을 보낼 Pod를 label로 고르는 조건.", "service selector, endpoints, pod label", "pod Running이면 Service endpoint에 자동 포함된다.", "label, endpoint, Service"],
    ["readiness", "Pod가 트래픽을 받을 준비가 됐는지 판단하는 probe.", "readiness status, endpoint population", "liveness와 같은 endpoint를 쓰면 된다.", "liveness, startup probe, target health"],
    ["liveness", "Pod 재시작이 필요한지를 판단하는 probe.", "liveness restart, probe event", "DB 지연까지 liveness에 넣어야 안전하다.", "restart, dependency status, probe path"],
  ],
  "operations-iac-change-handbook.html": [
    ["IaC", "인프라 변경을 코드, 리뷰, 상태, 검증으로 관리하는 방식.", "module version, provider lock, PR review", "콘솔 클릭을 코드로 옮기면 IaC 품질이 충분하다.", "Terraform, state, plan"],
    ["Terraform state lock", "Terraform state에 대한 동시 변경 충돌을 막는 잠금.", "state lock, lock owner, apply job", "lock 오류가 나면 즉시 강제 unlock하면 된다.", "state backend, apply, concurrency guard"],
    ["plan", "apply 전 생성, 수정, 교체, 삭제, 권한 변경을 보여주는 변경 예측.", "terraform plan/show, IAM diff, network diff", "plan은 통과 의례라 자세히 볼 필요가 없다.", "apply, destructive change, review"],
    ["replace", "리소스를 제자리 수정하지 못해 destroy/create로 교체하는 변경.", "plan replace, downtime risk, LB replace", "이름 변경은 무해한 수정이다.", "create-before-destroy, maintenance window, DNS"],
    ["drift", "코드, state, 실제 인프라가 달라진 상태.", "drift detection, cloud readback, audit log", "drift는 항상 즉시 되돌려야 한다.", "console hotfix, import, moved block"],
  ],
  "operations-observability-slo-handbook.html": [
    ["log", "사건의 세부 맥락을 남기는 관측 신호.", "timestamp, level, service, env, trace_id", "로그 양이 많으면 관측 가능성이 높다.", "traceId, redaction, schema"],
    ["metric", "시간에 따른 수치 변화를 보는 관측 신호.", "RED/USE dashboard, p95/p99, saturation", "CPU 평균이 정상이면 사용자 영향도 없다.", "label, cardinality, alert"],
    ["trace", "요청이 여러 서비스와 dependency를 지나는 경로.", "trace waterfall, deployment marker, request id", "trace는 디버깅 부가 기능일 뿐이다.", "span, downstream, latency"],
    ["SLI", "SLO를 계산하는 사용자 영향 지표.", "request success, latency, freshness, durability", "모든 내부 지표는 SLI가 될 수 있다.", "SLO, error budget, business success"],
    ["burn rate", "error budget이 얼마나 빠르게 소진되는지 보는 비율.", "5m/1h fast burn, 30m/6h slow burn", "error rate가 낮으면 paging할 필요가 없다.", "error budget, paging, release freeze"],
  ],
  "operations-incident-dr-handbook.html": [
    ["Incident Commander", "장애 중 우선순위와 의사결정을 책임지는 역할.", "role assignment, decision log, incident channel", "가장 기술적인 사람이 모든 결정을 맡아야 한다.", "scribe, SME, comms owner"],
    ["mitigation", "원인 확정 전이라도 사용자 영향을 줄이는 조치.", "rollback candidate, traffic shift, feature flag off", "원인을 알아야만 조치할 수 있다.", "rollback, degrade, traffic shed"],
    ["rollback", "이전 artifact나 설정으로 되돌리는 복구 전략.", "artifact version, release history, rollback command", "rollback은 데이터 변경까지 자동 복구한다.", "restore, migration, forward fix"],
    ["restore", "백업이나 restore point로 데이터·상태를 복구하는 전략.", "backup age, restore point, reconciliation query", "백업 활성화와 restore 가능성은 같다.", "RPO, data loss, restore drill"],
    ["postmortem", "timeline, contributing factors, action items로 장애를 시스템 개선에 연결하는 절차.", "postmortem action owner/date, runbook diff", "postmortem은 책임자를 찾는 문서다.", "action item, runbook, DR drill"],
  ],
  "operations-checklist-interview-handbook.html": [
    ["owner", "서비스, 비용, 접근, 장애 대응 책임자.", "owner matrix, cost owner, access owner", "문서가 있으면 owner가 없어도 된다.", "escalation, service catalog, access review"],
    ["escalation", "장애나 권한 문제를 다음 책임 단계로 올리는 경로.", "alert route, channel owner, comms timeline", "슬랙에 물어보면 escalation이다.", "Incident Commander, SME, support trend"],
    ["operational handoff", "운영 권한, 절차, 지표, 복구 책임을 넘기는 인수 과정.", "dashboard/runbook link, access grant, DR plan", "repo 권한 이전이면 인수 완료다.", "owner, runbook, backup"],
    ["release gate", "배포 전후에 artifact, config, metric 기준으로 진행을 막거나 허용하는 기준.", "smoke test, metric gate, migration plan", "사람 승인만 있으면 release gate다.", "artifact, rollback, approval"],
    ["incident packet", "장애 증상, 영향, 지표, 로그, 결정, 복구 시각을 묶은 기록.", "dashboard snapshot, log sample, decision log", "복구됐으면 기록은 선택 사항이다.", "postmortem, timeline, runbook diff"],
  ],
  "operations-cloud-scenarios-handbook.html": [
    ["edge layer", "DNS, CDN, WAF처럼 사용자와 가장 가까운 공개 계층.", "Route 53/Azure DNS, CloudFront/Front Door log, WAF rule", "edge 403과 origin 5xx는 같은 문제다.", "origin, cache policy, regional ingress"],
    ["regional L7 ingress", "ALB/Application Gateway처럼 region 내부 HTTP 진입을 처리하는 계층.", "target health, backend protocol, idle timeout", "CDN이 정상이면 ALB/App Gateway도 정상이다.", "ALB, Application Gateway, health probe"],
    ["managed identity", "Azure workload가 secret 없이 리소스 권한을 얻는 identity.", "role assignment, audit log, Key Vault access", "배포 권한과 런타임 권한은 같아도 된다.", "IAM role, Secrets Manager, Key Vault"],
    ["PrivateLink/Private Endpoint", "AWS/Azure 관리형 서비스 접근을 사설 경로로 제한하는 구성.", "Private DNS, endpoint policy, flow log, public access disabled", "endpoint만 만들면 public egress가 사라진다.", "VPC Endpoint, Private DNS Zone, NSG"],
    ["NAT Gateway", "private subnet의 outbound internet 경로가 되는 관리형 NAT.", "NAT bytes, retry storm, egress cost, deployment marker", "비용 급증은 FinOps 문제지 incident가 아니다.", "egress allowlist, retry rate, cost anomaly alert"],
  ],
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

const renderRows = (rows) =>
  rows.map((row) => `          <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("\n");

const renderCodeBlock = (value) => `<pre><code>${escapeHtml(value)}</code></pre>`;

const renderOptionalTable = ({ rows, headers }) => {
  if (!rows?.length) return "";

  return `        <table>
          <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
${renderRows(rows)}
        </table>`;
};

const renderCaseStudies = (caseStudies) => {
  if (!caseStudies?.length) return "";

  return caseStudies
    .map(
      (caseStudy) => `        <div class="practice-lab">
          <span class="sc-label">${escapeHtml(caseStudy.title)}</span>
          <p>${escapeHtml(caseStudy.context)}</p>
          <table>
            <tr><th>시점</th><th>판단/행동</th><th>해석 기준</th></tr>
${renderRows(caseStudy.timeline)}
          </table>
          <table>
            <tr><th>대표 오판</th><th>종료 조건</th></tr>
            <tr><td>${escapeHtml(caseStudy.trap)}</td><td>${escapeHtml(caseStudy.outcome)}</td></tr>
          </table>
        </div>`,
    )
    .join("\n");
};

const renderPracticeLabs = (labs) =>
  labs
    .map(
      (lab, index) => `        <div class="practice-lab">
          <span class="sc-label">PRACTICE LAB ${String(index + 1).padStart(2, "0")} · ${escapeHtml(lab.title)}</span>
          <p>${escapeHtml(lab.scenario)}</p>
          <table>
            <tr><th>Command / Query</th><th>목적</th></tr>
            <tr><td>${renderCodeBlock(lab.command)}</td><td>${escapeHtml(lab.purpose)}</td></tr>
          </table>
          <table>
            <tr><th>정상 출력</th><th>비정상 출력</th><th>판단 훈련</th></tr>
            <tr><td>${renderCodeBlock(lab.normalOutput)}</td><td>${renderCodeBlock(lab.abnormalOutput)}</td><td>${escapeHtml(lab.interpretation)}</td></tr>
          </table>
          <table>
            <tr><th>즉시 완화</th><th>영구 수정</th><th>검증 기준</th></tr>
            <tr><td>${escapeHtml(lab.mitigation)}</td><td>${escapeHtml(lab.permanentFix)}</td><td>${escapeHtml(lab.verification)}</td></tr>
          </table>
        </div>`,
    )
    .join("\n");

const renderTerms = (terms) => `        <table>
          <tr><th>용어</th><th>정의</th><th>운영 증거</th><th>자주 하는 오해</th><th>관련 항목</th></tr>
${renderRows(terms)}
        </table>`;

const renderAnswerShape = (items) =>
  items.map((item, index) => `          ${index + 1}. ${escapeHtml(item)}<br>`).join("\n");

const hasFinalConsonant = (value) => {
  const last = [...value.trim()].pop();
  if (!last) return false;
  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
};

const subjectParticle = (value) => (hasFinalConsonant(value) ? "은" : "는");
const objectParticle = (value) => (hasFinalConsonant(value) ? "을" : "를");


const render = (doc) => {
  const detail = detailsByFile[doc.file];
  const playbook = playbooksByFile[doc.file];
  const deepDiveRows = deepDiveRowsByFile[doc.file] ?? [];
  const practiceLabs = practiceLabsByFile[doc.file] ?? [];
  const terms = termsByFile[doc.file] ?? [];
  const docSections = doc.sections;
  const docId = doc.file.replace("-handbook.html", "").toUpperCase();
  const navBrand = `OPERATIONS · ${doc.title.split("·")[0].replace(/[^A-Za-z가-힣0-9]/g, " ").trim().toUpperCase()}`;
  const navTitle = doc.title;
  const sectionTitles = docSections.map((section) => section.title).join(", ");
  const navItems = [
    { code: "INDEX", title: "문서 구조" },
    ...docSections.map(({ code, title }) => ({ code, title })),
    { code: "MODEL", title: "개념 모델" },
    { code: "CHECK", title: "실무 체크리스트" },
    { code: "PLAYBOOK", title: "실무 플레이북" },
    { code: "PRACTICE", title: "출력 판독 훈련" },
    { code: "TERM", title: "용어사전" },
    { code: "CASE", title: "장애/운영 시나리오" },
    { code: "RISK", title: "자주 틀리는 판단" },
    { code: "Q&A", title: "면접 답변 템플릿" },
  ];
  const nav = navItems
    .map(({ code, title }, index) => `  <a href="#ch${index === 0 ? "index" : index}"><span class="code">${code}</span>${escapeHtml(title)}</a>`)
    .join("\n");
  const indexExtras = [
    detail.audienceContract?.length
      ? `      <h3>대상 독자와 학습 계약</h3>
${renderOptionalTable({ headers: ["항목", "내용", "완료 기준"], rows: detail.audienceContract })}`
      : "",
    detail.learningPlan?.length
      ? `      <h3>로드맵으로 읽는 순서</h3>
${renderOptionalTable({ headers: ["단계", "읽을 문서", "완료 산출물"], rows: detail.learningPlan })}`
      : "",
    detail.lectureFlow?.length
      ? `      <h3>60분 강연 흐름</h3>
${renderOptionalTable({ headers: ["시간", "주제", "핵심 메시지"], rows: detail.lectureFlow })}`
      : "",
    detail.failureMatrix?.length
      ? `      <h3>계층별 실패 모드</h3>
${renderOptionalTable({ headers: ["계층", "대표 실패", "첫 확인 증거"], rows: detail.failureMatrix })}`
      : "",
    detail.providerEvidence?.length
      ? `      <h3>AWS/Azure 증거 비교</h3>
${renderOptionalTable({ headers: ["영역", "AWS 증거", "Azure 증거", "판단 기준"], rows: detail.providerEvidence })}`
      : "",
    detail.decisionTree?.length
      ? `      <h3>운영 의사결정 트리</h3>
${renderOptionalTable({ headers: ["질문", "확인 증거", "다음 선택"], rows: detail.decisionTree })}`
      : "",
    detail.readinessScore?.length
      ? `      <h3>운영 준비도 점수표</h3>
${renderOptionalTable({ headers: ["점수", "상태", "판정"], rows: detail.readinessScore })}`
      : "",
    detail.lectureDemoScript?.length
      ? `      <h3>강연 데모 스크립트</h3>
${renderOptionalTable({ headers: ["데모", "주제", "진행 방식", "확인 질문"], rows: detail.lectureDemoScript })}`
      : "",
    detail.gradingRubric?.length
      ? `      <h3>실습 채점 루브릭</h3>
${renderOptionalTable({ headers: ["수준", "답변 특징", "증거 사용", "판정"], rows: detail.gradingRubric })}`
      : "",
    detail.expertReviewQuestions?.length
      ? `      <h3>전문가 리뷰 질문</h3>
${renderOptionalTable({ headers: ["리뷰 영역", "확인 질문", "보강 기준"], rows: detail.expertReviewQuestions })}`
      : "",
    detail.officialReferences?.length
      ? `      <h3>공식 근거 맵</h3>
${renderOptionalTable({ headers: ["영역", "공식 문서", "URL", "반영 기준"], rows: detail.officialReferences })}`
      : "",
    detail.accuracyBoundaries?.length
      ? `      <h3>정확도 한계와 공개 시 주의 문구</h3>
${renderOptionalTable({ headers: ["영역", "공격받기 쉬운 지점", "문서의 안전한 표현"], rows: detail.accuracyBoundaries })}`
      : "",
    detail.providerGotchas?.length
      ? `      <h3>벤더별 세부 함정</h3>
${renderOptionalTable({ headers: ["영역", "함정", "검증 방식"], rows: detail.providerGotchas })}`
      : "",
    detail.reproducibleLabPacket?.length
      ? `      <h3>재현 실습 패킷</h3>
${renderOptionalTable({ headers: ["항목", "내용", "채점/운영 기준"], rows: detail.reproducibleLabPacket })}`
      : "",
    detail.publicationChecklist?.length
      ? `      <h3>출판 전 검수 기준</h3>
${renderOptionalTable({ headers: ["검수 영역", "확인 질문", "탈락 기준"], rows: detail.publicationChecklist })}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  const sections = docSections
    .map((section, index) => `
      <section id="ch${index + 1}">
        <div class="ch-head"><span class="ch-code">${section.code}</span><h2>${escapeHtml(section.title)}</h2></div>
        <p class="lede">${escapeHtml(section.body)}</p>
        <table>
          <tr><th>운영 질문</th><th>확인할 증거</th><th>판단 기준</th></tr>
          <tr><td>${escapeHtml(section.question)}</td><td>${escapeHtml(section.evidence)}</td><td>${escapeHtml(section.judgment)}</td></tr>
          <tr><td>${escapeHtml(`${section.title}${objectParticle(section.title)} 원인 후보에서 배제하려면 어떤 확인 결과가 필요한가?`)}</td><td>${escapeHtml(section.command)}</td><td>${escapeHtml(section.commandJudgment)}</td></tr>
          <tr><td>${escapeHtml(`${section.title} 장애에서 임시 완화와 영구 수정은 어떻게 나누는가?`)}</td><td>${escapeHtml(section.incidentSignal)}</td><td>${escapeHtml(section.incidentJudgment)}</td></tr>
        </table>
${section.examples?.length ? `        <table>
          <tr><th>예시 신호</th><th>관찰값</th><th>해석</th></tr>
${renderRows(section.examples)}
        </table>` : ""}
      </section>`)
    .join("\n");
  const detailStart = docSections.length + 1;
  const detailSections = `
      <section id="ch${detailStart}">
        <div class="ch-head"><span class="ch-code">MODEL</span><h2>개념 모델</h2></div>
        <p class="lede">${escapeHtml(doc.title)}${subjectParticle(doc.title)} 단일 지식 항목이 아니라 운영 판단의 일부다. 아래 표처럼 개념을 책임, 확인 지표, 실패 신호로 나누면 면접 답변과 실제 장애 대응이 모두 선명해진다.</p>
        <table>
          <tr><th>구성 요소</th><th>운영 책임</th><th>확인할 증거</th></tr>
${docSections.map((section) => `          <tr><td>${section.code} · ${escapeHtml(section.title)}</td><td>${escapeHtml(section.body)}</td><td>${escapeHtml(section.evidence)}</td></tr>`).join("\n")}
        </table>
      </section>

      <section id="ch${detailStart + 1}">
        <div class="ch-head"><span class="ch-code">CHECK</span><h2>실무 체크리스트</h2></div>
        <p class="lede">${escapeHtml(doc.title)} 체크리스트는 ${escapeHtml(sectionTitles)}의 변경 위험을 사전에 드러내기 위한 검토표다. 각 항목은 리뷰, 배포 승인, 운영 인수에서 같은 증거로 다시 확인되어야 한다.</p>
        ${renderList(detail.checklist)}
        <table>
          <tr><th>작업 단계</th><th>필수 산출물</th><th>차단 기준</th></tr>
          <tr><td>설계</td><td>목적, 영향 범위, 비목표, owner</td><td>영향 범위가 사용자·시스템·비용 기준으로 설명되지 않음</td></tr>
          <tr><td>변경</td><td>diff, 승인 기록, 검증 명령</td><td>production 변경과 staging 검증의 차이가 설명되지 않음</td></tr>
          <tr><td>복구</td><td>rollback 또는 forward fix, 담당자, 예상 시간</td><td>실패 시 되돌릴 수 없는데 사전 승인과 공지가 없음</td></tr>
        </table>
      </section>

      <section id="ch${detailStart + 2}">
        <div class="ch-head"><span class="ch-code">PLAYBOOK</span><h2>실무 플레이북</h2></div>
        <p class="lede">${escapeHtml(doc.title)} 플레이북은 <strong>${escapeHtml(playbook.marker)}</strong> 기준으로 증상, 범위, 최근 변경, 계층별 증거를 연결한다. 목표는 명령어 암기가 아니라 어떤 가설을 버리고 어떤 완화책을 실행할지 결정하는 것이다.</p>
        <div class="serial-card">
          <span class="sc-label">${escapeHtml(playbook.marker)}</span>
          symptom → scope → recent change → evidence<br>
          → mitigation → verification → runbook diff
        </div>
        <table>
          <tr><th>운영 표면</th><th>볼 증거</th><th>판단 기준</th></tr>
${renderRows(playbook.evidenceRows)}
        </table>
${detail.readinessPacketTemplate || detail.incidentPacketTemplate ? `        <h3>운영 산출물 템플릿</h3>
        <table>
          <tr><th>Readiness packet</th><th>Incident packet</th></tr>
          <tr><td>${detail.readinessPacketTemplate ? renderCodeBlock(detail.readinessPacketTemplate) : ""}</td><td>${detail.incidentPacketTemplate ? renderCodeBlock(detail.incidentPacketTemplate) : ""}</td></tr>
        </table>` : ""}
        <table>
          <tr><th>확인 단계</th><th>명령·확인 위치</th><th>해석 기준</th></tr>
${renderRows(playbook.commandRows)}
        </table>
${deepDiveRows.length > 0 ? `        <table>
          <tr><th>심화 장애 패턴</th><th>관찰 신호</th><th>판정 기준</th></tr>
${renderRows(deepDiveRows)}
        </table>` : ""}
      </section>

      <section id="ch${detailStart + 3}">
        <div class="ch-head"><span class="ch-code">PRACTICE</span><h2>출력 판독 훈련</h2></div>
        <p class="lede">${escapeHtml(doc.title)}${subjectParticle(doc.title)} 개념을 아는 것보다 실제 출력에서 정상과 비정상을 구분하는 훈련이 중요하다. 아래 lab은 명령, 출력, 판단, 완화, 영구 수정을 한 번에 연결한다.</p>
${renderPracticeLabs(practiceLabs)}
      </section>

      <section id="ch${detailStart + 4}">
        <div class="ch-head"><span class="ch-code">TERM</span><h2>용어사전</h2></div>
        <p class="lede">${escapeHtml(doc.title)}에서 반복적으로 등장하는 운영 용어를 정의, 증거, 오해, 관련 항목 기준으로 정리한다. 장애 중에는 용어 자체보다 해당 용어가 어떤 로그, 지표, 설정, 책임 경계와 연결되는지를 확인한다.</p>
${renderTerms(terms)}
      </section>

      <section id="ch${detailStart + 5}">
        <div class="ch-head"><span class="ch-code">CASE</span><h2>장애/운영 시나리오</h2></div>
        <p class="lede">${escapeHtml(detail.scenario)}</p>
        <div class="callout">
          <span class="co-label">Triage frame</span>
          <p>${escapeHtml(doc.title)} 장애는 증상 → 영향 범위 → 최근 변경 → ${escapeHtml(playbook.evidenceRows[0][0])} 증거 → 완화책 → 복구 검증 → 재발 방지 순서로 기록한다. 이 흐름이 있어야 담당자가 바뀌어도 같은 결론에 도달한다.</p>
        </div>
        <table>
          <tr><th>처음 10분</th><th>다음 30분</th><th>종료 조건</th></tr>
          <tr><td>${escapeHtml(playbook.evidenceRows[0][1])} 기준으로 영향 범위를 고정한다.</td><td>${escapeHtml(playbook.commandRows[0][1])} 항목에서 증거를 모아 완화책을 실행한다.</td><td>${escapeHtml(playbook.incidentRows.at(-1)[2])}</td></tr>
        </table>
        <table>
          <tr><th>Incident packet</th><th>기록할 내용</th><th>판정 기준</th></tr>
${renderRows(playbook.incidentRows)}
        </table>
${detail.caseStudies?.length ? `        <h3>강연/출판용 실전 케이스</h3>
${renderCaseStudies(detail.caseStudies)}` : ""}
      </section>

      <section id="ch${detailStart + 6}">
        <div class="ch-head"><span class="ch-code">RISK</span><h2>자주 틀리는 판단</h2></div>
        <p class="lede">${escapeHtml(doc.title)}에서 자주 틀리는 판단은 ${escapeHtml(docSections[0].title)}와 ${escapeHtml(docSections.at(-1).title)}의 책임 경계를 흐리는 데서 시작된다. 아래 신호가 보이면 설계, runbook, 답변 구조를 다시 점검한다.</p>
        ${renderList(detail.pitfalls)}
      </section>

      <section id="ch${detailStart + 7}">
        <div class="ch-head"><span class="ch-code">Q&A</span><h2>면접 답변 템플릿</h2></div>
        <p class="lede">${escapeHtml(detail.interview)}</p>
        <div class="serial-card">
          <span class="sc-label">OPERATIONS ANSWER FRAME</span>
${renderAnswerShape(playbook.answerShape)}
        </div>
${detail.answerCards?.length ? `        <table>
          <tr><th>답변 유형</th><th>예시</th></tr>
${renderRows(detail.answerCards)}
        </table>` : ""}
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
  <div class="hero-meta">FORMAT : 개념 → 증거 → 플레이북 → 장애 시나리오 → 면접 답변 · UPDATED 2026-06</div>
</header>

<section id="chindex">
<div class="ch-head"><span class="ch-code">INDEX</span><h2>문서 구조</h2></div>
<p class="lede">이 문서는 개념 요약이 아니라 운영 판단 연습용 플레이북입니다. 각 항목은 “무엇을 아는가”보다 “장애 때 어떤 증거를 보고 어떤 가설을 버리는가”를 기준으로 읽습니다.</p>
<ul><li>핵심 개념</li><li>주제별 운영 증거</li><li>실무 플레이북</li><li>용어사전</li><li>Incident packet</li><li>주제별 답변 구조</li></ul>
${indexExtras}
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
