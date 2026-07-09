import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "handbook");

const css = `:root{--paper:#F6F7FA;--panel:#FFFFFF;--ink:#161D2B;--ink-soft:#465063;--line:#D8DCE6;--green:#24513A;--green-deep:#183827;--green-tint:#E8F2EC;--mono:'IBM Plex Mono',ui-monospace,monospace;--sans:'Pretendard Variable',Pretendard,-apple-system,sans-serif}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.75;font-size:16px}.shell{display:grid;grid-template-columns:264px 1fr;max-width:1280px;margin:0 auto}nav{position:sticky;top:0;height:100vh;overflow-y:auto;border-right:1px solid var(--line);padding:32px 20px 48px;background:var(--paper)}main{min-width:0;padding:0 56px 120px;background:var(--paper)}@media(max-width:900px){.shell{grid-template-columns:1fr}nav{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}main{padding:0 20px 80px}}.nav-brand{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--green);font-weight:600;margin-bottom:4px}.nav-title{font-size:15px;font-weight:700;margin-bottom:24px;letter-spacing:0}nav a{display:flex;gap:10px;align-items:baseline;text-decoration:none;color:var(--ink-soft);padding:7px 8px;font-size:13.5px;line-height:1.4}nav a:hover{background:var(--green-tint);color:var(--green-deep)}nav a .code{font-family:var(--mono);font-size:10.5px;color:var(--green);flex-shrink:0;letter-spacing:.04em}header.hero{padding:72px 0 48px;border-bottom:1px solid var(--ink)}.hero-serial{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:var(--green);display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px}.hero-serial span{border:1px solid var(--line);padding:3px 10px;background:var(--panel)}h1{font-size:clamp(30px,4.5vw,46px);font-weight:800;letter-spacing:0;line-height:1.18}.hero-sub{margin-top:18px;font-size:17px;color:var(--ink-soft);max-width:720px}.hero-meta{margin-top:28px;font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);letter-spacing:.05em}section{padding-top:72px}.ch-head{display:flex;align-items:baseline;gap:14px;border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:28px}.ch-code{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--green);letter-spacing:.1em;flex-shrink:0}h2{font-size:26px;font-weight:800;letter-spacing:0}p{margin-bottom:14px}p.lede{font-size:17px;color:var(--ink-soft)}table{width:100%;border-collapse:collapse;margin:22px 0;font-size:14px;background:var(--panel);border:1px solid var(--line)}th{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-align:left;font-weight:600;color:var(--green-deep);background:var(--green-tint);padding:10px 14px;border-bottom:1px solid var(--line)}td{padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.6}.semantic-card{background:var(--green-tint);border:1px solid var(--line);padding:22px 26px;margin:24px 0;font-size:14px;line-height:1.9}.semantic-card .sc-label{font-family:var(--mono);color:var(--green-deep);font-size:10.5px;letter-spacing:.14em;display:block;margin-bottom:8px}.snippet-card{font-family:var(--mono);background:var(--ink);color:#E7EAF1;padding:22px 26px;margin:24px 0;font-size:13.5px;line-height:1.9;overflow-x:auto;white-space:pre-wrap}footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.05em;line-height:2}`;

const pages = [
  {
    "id": "operations-roadmap-qa",
    "title": "인프라·운영 로드맵 Q&A",
    "source": "인프라·운영 로드맵",
    "subtitle": "운영 지형도, 경로, 소유권, SLO, 복구 훈련을 실제 판단과 증거로 연결하는 Q&A입니다.",
    "questions": [
      {
        "q": "운영 지도를 처음 펼칠 때 어떤 경계를 먼저 고정하나요?",
        "decision": "운영 지도 답변의 첫 판단은 서비스 이름 나열이 아니라 사용자 영향이 들어오는 입구, 책임 팀, 의존 서비스, 최근 변경 표식을 한 장에 고정하는 일입니다. 장애인지 변경 후 영향인지 모를 때도 신고 시각, SLO burn, 배포 marker, dependency map을 같은 시간축에 놓아 조사 순서를 정합니다.",
        "failure": "운영 지도가 없으면 빨간 대시보드만 따라가다가 소유자가 빈 서비스, 관측되지 않는 앞단 차단, 실제 영향이 없는 알림을 같은 우선순위로 다룹니다. 그 결과 incident commander 지정과 고객 영향 범위 확정이 늦어집니다.",
        "evidence": "service catalog owner field, dependency map diff, SLO burn chart, deploy marker",
        "followups": [
          {
            "q": "운영 지도 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "먼저 service catalog의 owner와 dependency map의 upstream/downstream을 신고 시각에 맞춰 확인합니다. 판단 기준은 사용자 영향이 있는 경로와 알림만 있는 경로를 나누는 것입니다. owner가 비었거나 dependency map 최신 시각이 배포 marker보다 오래되면 정상 선언을 보류하고 incident commander가 임시 소유자를 지정합니다."
          },
          {
            "q": "운영 지도 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 SLO burn이 멈추고 dependency map에서 영향 경로가 한 서비스 경계 안으로 닫히는 경우입니다. 위험은 고객 증상은 남아 있는데 지도에는 의존 서비스가 빠져 있거나 배포 marker가 누락된 상태입니다. 이때는 지도 수정 티켓을 열고 빠진 의존성을 임시 incident record에 붙여 다음 교대자가 같은 추적을 반복하지 않게 합니다."
          },
          {
            "q": "운영 지도 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 왜 처음 경계가 틀렸는지와 어떤 증거가 경계를 바꿨는지를 남깁니다. 예를 들어 deploy marker와 고객 신고 시각이 맞지 않았다는 증거, 누락된 owner field, 수정된 dependency edge를 같은 incident note에 저장합니다. 후속 조치는 catalog 갱신과 알림 라우팅 검증입니다."
          }
        ]
      },
      {
        "q": "요청 경로 로드맵은 어디까지를 한 요청으로 추적하나요?",
        "decision": "요청 경로는 DNS, TLS, CDN/WAF, load balancer, application entry, downstream call을 하나의 사용자 요청으로 이어서 봅니다. 로드맵 답변은 첫 실패 hop, 관측 공백, 우회 가능한 경계, 고객 영향 집합을 분리해야 합니다.",
        "failure": "요청 경로를 컴포넌트별로만 보면 앞단에서 차단된 요청을 애플리케이션 장애로 오판하거나, 특정 region resolver 문제를 전체 배포 실패로 확대합니다.",
        "evidence": "curl timing, ALB access log, WAF sampled request, trace root span",
        "followups": [
          {
            "q": "요청 경로 승인 차단에서는 어떤 증거가 없으면 멈추나요?",
            "answer": "curl timing, ALB access log, trace root span 중 최소 두 지점이 같은 request id나 시간대로 연결되지 않으면 변경 승인을 멈춥니다. 판단 기준은 실패 hop이 재현되고 rollback 시 관측할 지표가 정해졌는지입니다. 증거가 끊기면 다음 조치는 synthetic probe 추가와 WAF sampled request 보존입니다."
          },
          {
            "q": "요청 경로 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 같은 사용자 위치에서 재현 요청이 DNS부터 application trace까지 이어지고 실패율이 SLO 창 안으로 돌아오는 상태입니다. 위험은 앞단 로그에는 4xx/5xx가 늘지만 애플리케이션 trace가 비어 있는 상태입니다. 이 경우 원인 분석보다 WAF rule 우회, CDN cache bypass, target group 분리 중 영향이 가장 작은 완화를 먼저 선택합니다."
          },
          {
            "q": "요청 경로 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 어떤 hop에서 사용자 실패가 줄었는지와 어떤 hop은 무관했는지를 남깁니다. 증거는 rollback 전후 ALB status 분포, WAF rule id, trace 생성률입니다. 후속 조치는 runbook에 첫 확인 명령과 정상 샘플을 추가하고, 재발 시 같은 위치에서 probe가 자동 실행되게 만드는 것입니다."
          }
        ]
      },
      {
        "q": "변경 경로는 배포 가능보다 무엇을 먼저 증명하나요?",
        "decision": "변경 경로의 우선 판단은 배포할 수 있는지가 아니라 중단 기준, 되돌림 조건, 검증 주체가 준비됐는지입니다. 운영 로드맵에서는 change ticket, deploy marker, feature flag, rollback artifact, 승인자를 한 경로로 묶어야 합니다.",
        "failure": "변경 경로가 약하면 배포는 성공했지만 검증 계정 권한이 없거나, feature flag가 일부 tenant에만 남거나, rollback artifact가 현재 스키마와 맞지 않는 문제가 장애 중에 드러납니다.",
        "evidence": "change ticket, deploy marker, rollback artifact checksum, approval log",
        "followups": [
          {
            "q": "변경 경로 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "change ticket의 승인 범위와 deploy marker의 실제 적용 범위를 먼저 맞춥니다. 판단 기준은 region, tenant, schema version이 승인 기록과 일치하는지입니다. 불일치가 있으면 다음 담당자에게 배포 성공이라고 넘기지 말고 feature flag 상태와 rollback artifact checksum을 함께 인계합니다."
          },
          {
            "q": "변경 경로 검증 깊이는 어디서 갈리나요?",
            "answer": "정상은 배포 후 검증이 사용자의 실제 요청 경로와 같은 권한, 같은 데이터 분기, 같은 region에서 통과한 경우입니다. 위험은 green pipeline만 있고 운영 readback이 없거나, 승인자는 있는데 중단 결정자가 없는 상태입니다. 이때는 canary 비율을 올리지 않고 검증 계정 권한과 stop-the-line 담당자를 확정합니다."
          },
          {
            "q": "변경 경로에서 실행 경험과 관찰 경험은 어떻게 구분하나요?",
            "answer": "내가 직접 실행한 변경, 참관만 한 변경, 문서로만 아는 변경을 분리해 말합니다. 증거는 change ticket comment, deploy marker, rollback 결과 링크입니다. 후속 조치는 runbook의 검증 명령을 실제 출력 예시로 바꾸고 다음 변경 리뷰에서 누락된 승인 항목을 checklist로 올리는 것입니다."
          }
        ]
      },
      {
        "q": "복구 경로는 원인 분석과 어떤 순서로 분리하나요?",
        "decision": "복구 경로는 고객 피해 축소, 서비스 안전 상태, 영구 수정 후보를 분리해 말해야 합니다. 로드맵에서는 traffic shift, read-only mode, previous release rollback, degraded mode, data restore 같은 선택지를 원인 확정보다 먼저 검토합니다.",
        "failure": "복구 경로가 없으면 원인을 찾는 동안 error budget이 계속 타거나, 임시 완화가 보안 예외와 비용 부채로 남습니다. 완화 담당자와 종료 조건이 없으면 복구 후에도 위험이 닫히지 않습니다.",
        "evidence": "SLO burn chart, mitigation decision log, rollback drill log, customer impact counter",
        "followups": [
          {
            "q": "복구 경로 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "SLO burn 속도와 customer impact counter를 먼저 봅니다. 판단 기준은 원인 확정 전에도 피해를 줄일 선택지가 있는지입니다. burn이 계속 오르면 traffic shift나 read-only mode를 먼저 실행하고, 실행 시각과 영향 감소율을 mitigation decision log에 남깁니다."
          },
          {
            "q": "복구 경로 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 임시 완화가 종료 조건, owner, 만료 시각을 가진 상태입니다. 위험은 사용자 지표만 회복되고 예외 rule, scale-out, read-only flag가 열린 채 남는 상태입니다. 후속 조치는 예외 제거 티켓과 postmortem action을 같은 owner에게 묶어 재발 봉쇄가 추적되게 하는 것입니다."
          },
          {
            "q": "복구 경로 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 어떤 완화가 control plane, data plane, 고객 경험 중 어디에 작용했는지 남깁니다. 증거는 rollback drill log, traffic split 변화, SLO burn 감소입니다. 다음 조치는 같은 복구 선택을 runbook에 decision tree로 넣고 권한 없는 온콜도 실행 가능한지 확인하는 것입니다."
          }
        ]
      },
      {
        "q": "control plane 문제는 data plane 영향과 어떻게 분리하나요?",
        "decision": "control plane 판단은 설정 변경, 배포, 확장, 인증, 관리 API가 막혔는지와 기존 사용자 트래픽이 계속 처리되는지를 분리하는 일입니다. 로드맵에서는 관리 작업 실패가 즉시 고객 장애인지, 복구 선택지를 좁히는 운영 장애인지 먼저 말해야 합니다.",
        "failure": "control plane과 data plane을 섞으면 관리 API 장애를 전체 서비스 장애로 과장하거나, 반대로 배포와 확장이 막혀 다음 완화가 불가능한 위험을 놓칩니다.",
        "evidence": "management API error log, config apply audit, data plane request metric, runbook permission check",
        "followups": [
          {
            "q": "control plane 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "management API error log와 data plane request metric을 같은 시간대에 비교합니다. 판단 기준은 설정 변경만 실패하는지, 기존 요청 처리도 실패하는지입니다. 관리 API만 실패하면 고객 공지보다 운영 완화 권한 확보를 먼저 하고, 권한 실패 증거를 runbook permission check에 남깁니다."
          },
          {
            "q": "control plane 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 data plane error rate가 안정적이고 pending config가 고객 경로에 적용되지 않은 상태입니다. 위험은 현재 트래픽은 살아 있지만 scale-out, rollback, secret rotation 같은 다음 완화가 control plane 장애 때문에 막힌 상태입니다. 후속 조치는 break-glass 절차와 수동 변경 금지 범위를 incident log에 명시하는 것입니다."
          },
          {
            "q": "control plane 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 고객 영향 없음과 운영 작업 차단을 별도 결론으로 남깁니다. 증거는 data plane 성공률, failed apply id, 사용한 break-glass 권한입니다. 다음 조치는 control plane 장애 때 배포 중지, 변경 freeze, 대체 승인자를 자동으로 호출하는 runbook 조건을 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "data plane 변경은 어떤 사용자 경로 기준으로 검증하나요?",
        "decision": "data plane은 실제 요청, 큐 처리, 저장소 read/write, 스트림 소비처럼 고객 데이터가 흐르는 경로입니다. 변경 리뷰에서는 평균 지표가 아니라 실패 사용자 집합, shard 또는 partition, downstream 응답 시간을 기준으로 검증 범위를 정해야 합니다.",
        "failure": "data plane 검증이 얕으면 전체 평균은 정상인데 특정 tenant, region, partition만 실패하는 부분 장애를 놓칩니다. rollback도 control plane은 성공했지만 데이터 경로의 재시도 폭주를 키울 수 있습니다.",
        "evidence": "per-tenant SLI, queue lag metric, shard error sample, downstream latency trace",
        "followups": [
          {
            "q": "data plane 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "per-tenant SLI와 shard error sample이 변경 전후로 비교되지 않으면 승인을 차단합니다. 판단 기준은 가장 취약한 사용자 집합에서 성공률, 지연, 재시도량이 모두 유지되는지입니다. 누락되면 canary를 확대하지 않고 synthetic load를 해당 tenant나 partition에 맞춰 다시 실행합니다."
          },
          {
            "q": "data plane 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 queue lag, downstream latency, 사용자 재시도율이 같은 방향으로 회복되는 상태입니다. 위험은 한 지표만 좋아지고 다른 지표가 부채를 쌓는 상태, 예를 들어 latency는 내려갔지만 queue lag가 계속 증가하는 경우입니다. 후속 조치는 traffic shed나 consumer throttle을 적용하고 누적량 감소를 증거로 닫는 것입니다."
          },
          {
            "q": "data plane 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 데이터 중복, 지연 처리, 유실 가능성을 따로 기록합니다. 증거는 rollback 시각, idempotency error sample, queue drain 시간입니다. 다음 조치는 보상 처리 필요 여부를 owner matrix에 배정하고 고객 영향이 남은 tenant를 서비스 카탈로그 상태에 표시하는 것입니다."
          }
        ]
      },
      {
        "q": "service catalog는 운영 로드맵에서 어떤 결정을 가능하게 하나요?",
        "decision": "service catalog는 서비스 설명서가 아니라 누가 판단하고, 어디서 알림을 받고, 어떤 SLO와 dependency를 책임지는지 결정하게 해주는 운영 원장입니다. 답변에는 owner, escalation, tier, runbook, dependency, recent change 링크가 살아 있어야 합니다.",
        "failure": "catalog가 낡으면 온콜이 맞지 않거나, retired 서비스가 알림을 만들거나, tier가 낮게 잡혀 고객 장애 승격이 늦어집니다. 이 문제는 장애 중에 사람 찾기로 시간을 소모하게 만듭니다.",
        "evidence": "catalog owner timestamp, escalation policy, service tier, runbook link health, dependency reference",
        "followups": [
          {
            "q": "service catalog 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "catalog owner timestamp와 escalation policy가 최근 조직 변경 이후 갱신됐는지 먼저 봅니다. 판단 기준은 알림을 받은 사람이 조치 권한과 서비스 맥락을 모두 갖고 있는지입니다. 틀리면 incident 중에는 임시 owner를 지정하고, 종료 후 catalog 갱신을 postmortem action으로 남깁니다."
          },
          {
            "q": "service catalog 검증 깊이는 어떤 필드에서 갈리나요?",
            "answer": "정상은 service tier, SLO, dependency reference, runbook link가 같은 운영 현실을 가리키는 상태입니다. 위험은 tier는 critical인데 runbook이 없거나, dependency는 있는데 downstream owner가 빠진 상태입니다. 후속 조치는 catalog validation을 변경 승인 조건에 넣고 누락 항목을 배포 차단 신호로 쓰는 것입니다."
          },
          {
            "q": "service catalog를 실제로 써봤는지는 무엇으로 증명하나요?",
            "answer": "catalog를 근거로 실제 escalation을 했는지, 아니면 문서만 확인했는지를 구분합니다. 증거는 escalation event, runbook access log, 수정된 owner field입니다. 다음 조치는 catalog stale 알림을 만들고 서비스 생성 시 필수 필드를 자동 검사하는 것입니다."
          }
        ]
      },
      {
        "q": "dependency map은 장애 중 어떤 가설을 줄여주나요?",
        "decision": "dependency map은 요청, 배치, 이벤트, 데이터 저장소 사이의 실제 런타임 의존성을 보여줘 조사 순서를 줄입니다. 답변은 직접 의존성, 숨은 shared dependency, 최근 추가된 edge, 우회 가능한 edge를 구분해야 합니다.",
        "failure": "dependency map이 없거나 오래되면 공통 인증, 메시지 브로커, shared database 같은 숨은 의존성을 늦게 찾아 여러 팀이 각자 정상이라고 말하는 시간이 길어집니다.",
        "evidence": "dependency map diff, runtime call graph, downstream SLO, shared dependency incident history",
        "followups": [
          {
            "q": "dependency map 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "dependency map diff와 runtime call graph를 먼저 맞춥니다. 판단 기준은 실패 직전에 새 edge가 생겼는지, 기존 edge의 downstream SLO가 같이 타는지입니다. 새 edge가 원인 후보이면 feature flag로 호출을 끊거나 fallback path로 우회하고, 우회 전후 downstream error rate를 증거로 남깁니다."
          },
          {
            "q": "dependency map 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 map에 있는 의존성만 호출되고 각 downstream SLO가 사용자 영향과 같은 결론을 내는 상태입니다. 위험은 call graph에는 보이지만 catalog에 없는 shared dependency가 있거나, 배치 의존성이 실시간 장애로 번지는 상태입니다. 후속 조치는 숨은 edge를 catalog에 등록하고 변경 리뷰에서 영향 팀 승인 조건으로 추가하는 것입니다."
          },
          {
            "q": "dependency map 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 어느 edge가 사용자 경로, 운영 경로, 배치 경로인지 표시합니다. 증거는 수정된 dependency map, incident에서 배제한 downstream 목록, 확인한 owner입니다. 다음 조치는 map diff를 배포마다 자동 생성하고 새 critical edge가 생기면 owner matrix 검토를 요구하는 것입니다."
          }
        ]
      },
      {
        "q": "owner matrix는 장애 지휘에서 어떤 빈칸을 없애야 하나요?",
        "decision": "owner matrix는 기술 소유자, 의사결정자, 승인자, 커뮤니케이션 담당자, 백업 담당자를 분리해 장애 중 빈칸을 없애는 표입니다. 운영 로드맵에서는 서비스별 owner뿐 아니라 rollback 승인, 고객 공지, 보안 예외 종료 owner까지 보여야 합니다.",
        "failure": "owner matrix가 없으면 모두가 보고만 있고 아무도 rollback, 고객 공지, 예외 종료를 결정하지 않습니다. 백업 담당자가 없으면 휴가나 야간 시간대에 incident commander가 실무 권한자를 다시 찾아야 합니다.",
        "evidence": "owner matrix, on-call schedule, approval delegation log, incident role assignment",
        "followups": [
          {
            "q": "owner matrix 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "on-call schedule과 owner matrix의 primary/backup이 실제 알림 수신자와 맞는지 먼저 확인합니다. 판단 기준은 각 역할이 조치 권한까지 갖는지입니다. 빈칸이 있으면 incident commander가 임시 role assignment를 선언하고 이후 matrix 수정 티켓을 남깁니다."
          },
          {
            "q": "owner matrix 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 기술 owner, rollback approver, communication owner가 모두 이름과 연락 경로로 확인된 상태입니다. 위험은 서비스 owner는 있지만 비용, 보안, 데이터 보상 같은 후속 조치 owner가 없는 상태입니다. 후속 조치는 role별 결정 시각과 대리 승인 근거를 incident timeline에 남기는 것입니다."
          },
          {
            "q": "owner matrix 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 잘못 호출된 팀, 늦게 찾은 권한자, 대리 결정 근거를 남깁니다. 증거는 paging event, role assignment 변경, approval delegation log입니다. 다음 조치는 matrix에 backup owner와 decision owner를 분리해 넣고 다음 drill에서 호출 경로를 검증하는 것입니다."
          }
        ]
      },
      {
        "q": "SLO burn은 로드맵 우선순위를 어떻게 바꾸나요?",
        "decision": "SLO burn은 어느 서비스를 먼저 보느냐가 아니라 지금 변경 중지, 완화, 고객 공지, 장기 개선 중 무엇을 선택할지 결정하는 회계 신호입니다. 답변은 fast burn과 slow burn을 나누고, error budget 소진 속도가 운영 결정을 어떻게 바꾸는지 말해야 합니다.",
        "failure": "SLO burn을 단순 알림으로 보면 고객 영향은 계속 커지는데 팀은 원인 분석만 하거나, 반대로 예산 소진이 낮은 경고에 과도한 rollback을 합니다.",
        "evidence": "multi-window burn-rate alert, SLO dashboard, error budget remaining, customer impact sample",
        "followups": [
          {
            "q": "SLO burn 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "multi-window burn-rate alert와 error budget remaining을 먼저 봅니다. 판단 기준은 현재 변경을 계속하면 남은 예산을 회복 가능한지입니다. fast burn이 열려 있으면 신규 배포 승인을 차단하고, customer impact sample을 붙여 완화 우선순위를 incident commander에게 넘깁니다."
          },
          {
            "q": "SLO burn 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 burn rate가 낮아지고 같은 기간 사용자 실패 샘플도 줄어드는 상태입니다. 위험은 burn은 내려갔지만 특정 사용자군의 실패가 남거나, alert window가 너무 길어 감지가 늦은 상태입니다. 후속 조치는 SLI source와 window를 조정하고 변경 freeze 해제 조건을 숫자로 기록하는 것입니다."
          },
          {
            "q": "SLO burn 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 burn rate가 어느 시점에 꺾였는지와 어떤 사용자 영향이 남았는지를 남깁니다. 증거는 rollback marker, SLO dashboard snapshot, error budget remaining입니다. 다음 조치는 남은 예산 회복 계획과 배포 재개 조건을 change ticket에 연결하는 것입니다."
          }
        ]
      },
      {
        "q": "rollback drill은 실제 장애 전에 무엇을 검증해야 하나요?",
        "decision": "rollback drill은 명령을 외우는 훈련이 아니라 권한, artifact, 데이터 호환성, 관측 지표, 승인 경로가 실제로 동작하는지 검증하는 절차입니다. 로드맵 답변은 어떤 변경이 자동 rollback 가능한지와 수동 판단이 필요한지 분리해야 합니다.",
        "failure": "drill이 없으면 장애 중 rollback 권한이 없거나, artifact가 만료됐거나, 스키마가 역호환되지 않아 더 큰 장애를 만듭니다. 또한 drill 성공 기준이 없으면 되돌린 뒤에도 정상 여부를 증명하지 못합니다.",
        "evidence": "rollback drill log, artifact retention record, permission check output, post-rollback SLI",
        "followups": [
          {
            "q": "rollback drill 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "최근 rollback drill log와 permission check output을 먼저 봅니다. 판단 기준은 온콜이 같은 권한으로 같은 artifact를 사용해 복구할 수 있는지입니다. 실패 기록이 있으면 인계 전에 대체 승인자와 artifact retention 상태를 확인하고 drill gap을 change risk로 표시합니다."
          },
          {
            "q": "rollback drill 실행 범위는 어디까지 검증해야 하나요?",
            "answer": "정상은 rollback 명령, 승인, artifact, post-rollback SLI 확인이 제한 시간 안에 끝난 상태입니다. 위험은 명령은 성공했지만 데이터 migration이나 cache warming 때문에 사용자 지표가 회복되지 않는 상태입니다. 후속 조치는 drill에 데이터 호환성 체크와 warm-up 시간을 포함시키는 것입니다."
          },
          {
            "q": "rollback drill에서 직접 실행과 참관은 어떻게 구분하나요?",
            "answer": "실제로 실행한 drill, 참관한 drill, 문서로만 본 절차를 나눠 남깁니다. 증거는 drill log, 실행자, 실패 단계, post-rollback SLI입니다. 다음 조치는 실패 단계를 runbook task로 바꾸고 다음 분기 drill 일정에 owner를 배정하는 것입니다."
          }
        ]
      },
      {
        "q": "runbook maturity는 운영 로드맵에서 어떻게 판정하나요?",
        "decision": "runbook maturity는 문서 존재 여부가 아니라 새 온콜이 제한 시간 안에 판단, 명령 실행, 증거 확인, escalation을 재현할 수 있는지로 판정합니다. 성숙한 runbook은 정상 샘플, 실패 샘플, 권한, 중단 기준, 복구 후 확인을 포함합니다.",
        "failure": "runbook이 낮은 성숙도에 머물면 링크만 있고 첫 명령이 없거나, 권한 누락이 장애 중 드러나거나, 복구 후 어떤 지표로 정상 선언할지 모릅니다.",
        "evidence": "runbook freshness timestamp, command output sample, access check result, on-call handoff note",
        "followups": [
          {
            "q": "runbook maturity 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "runbook freshness timestamp와 command output sample을 먼저 봅니다. 판단 기준은 새 온콜이 문서만 보고 같은 결과를 재현할 수 있는지입니다. 출력 예시가 없거나 권한 확인이 빠졌으면 인계를 완료하지 않고 access check result와 정상 샘플을 추가합니다."
          },
          {
            "q": "runbook maturity는 어떤 결정 지점으로 검증하나요?",
            "answer": "정상은 판단 기준, 실패 모드, 증거 위치, 후속 조치가 한 절차 안에서 이어지는 상태입니다. 위험은 명령어 목록은 있지만 언제 중단하고 누구에게 넘길지 없는 상태입니다. 후속 조치는 decision point마다 owner와 escalation 조건을 넣고 drill에서 실제 소요 시간을 재는 것입니다."
          },
          {
            "q": "runbook maturity에서 미검증 절차는 어떻게 표시하나요?",
            "answer": "실제 장애에서 쓴 절차, drill에서 검증한 절차, 아직 가정인 절차를 구분합니다. 증거는 on-call handoff note, drill 결과, 수정된 runbook diff입니다. 다음 조치는 미검증 절차를 다음 rollback drill에 넣고 오래된 runbook에는 stale owner 알림을 연결하는 것입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-request-path-qa",
    "title": "서비스 요청 경로 Q&A",
    "source": "서비스 요청 경로",
    "subtitle": "요청 통과 경로에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "DNS 해석 장애 판단에서는 무엇을 먼저 보나요?",
        "decision": "먼저 같은 사용자 위치에서 도메인이 어떤 IP와 TTL로 풀리는지 확인합니다. 판단은 권위 DNS, recursive resolver, 클라이언트 cache 중 어느 단계에서 오래된 값이나 NXDOMAIN이 생겼는지 가르는 일입니다. DNS가 흔들리면 애플리케이션은 정상이어도 요청이 로드 밸런서까지 도달하지 않습니다.",
        "failure": "curl이 connect 단계에 들어가지 못하거나 특정 ISP와 region에서만 이전 주소를 잡으면 DNS 계층을 우선 의심합니다. 이때 app log가 비어 있다는 이유로 backend 장애로 넘기면 cache 만료를 기다리는 동안 지역별 실패가 계속됩니다.",
        "evidence": "dig +trace, resolver별 A/AAAA answer와 TTL, curl namelookup/connect timing, authoritative DNS change log",
        "followups": [
          {
            "q": "DNS 해석 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "사용자 위치와 운영 probe 위치에서 `dig` 결과의 IP, TTL, resolver를 먼저 맞춥니다. 같은 시각에 authoritative answer는 새 IP인데 특정 resolver만 이전 IP를 주면 판단 기준은 cache 잔존입니다. 증거는 `dig +trace`, resolver 응답 원본, DNS 변경 티켓이며, 후속 조치는 영향 resolver를 공지하고 임시로 낮은 TTL 또는 이전 endpoint 유지 여부를 결정하는 것입니다."
          },
          {
            "q": "DNS 해석 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 실패 지역에서도 name lookup, TCP connect, TLS handshake가 같은 target 주소로 이어지고 ALB access log에 요청이 남는 상태입니다. 위험은 lookup 시간이 늘거나 이전 IP로 연결되어 ALB 로그가 비는 경우입니다. 이때는 backend 재시작보다 DNS rollback, dual serving, cache 만료 시각 추적을 먼저 실행합니다."
          },
          {
            "q": "DNS 해석 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 잘못 본 resolver, 실제로 실패한 resolver, cache가 풀린 시각을 남깁니다. 증거는 resolver별 answer diff와 curl timing 변화입니다. 다음 변경에서는 DNS 배포 전후 synthetic lookup을 여러 region에서 돌리고, 이전 IP 종료 조건을 TTL의 두 배 이상으로 잡습니다."
          }
        ]
      },
      {
        "q": "TLS handshake 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "인증서 chain, SNI, protocol/cipher 정책이 실제 endpoint에서 기대한 값으로 노출되는지 먼저 봅니다. 판단 기준은 브라우저 성공이 아니라 여러 client 버전에서 handshake가 완료되고, 인증서 갱신이나 policy 변경을 즉시 되돌릴 수 있는지입니다.",
        "failure": "특정 구형 client, 사내 proxy, 일부 region만 `handshake_failure`를 내면 기능 테스트는 통과해도 운영 장애입니다. target health가 초록이어도 TLS가 앞단에서 끊기면 app access log와 traceId는 생성되지 않습니다.",
        "evidence": "openssl s_client output, certificate chain expiry/SAN, ALB TLS negotiation log, client error sample",
        "followups": [
          {
            "q": "TLS handshake 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 전에는 `openssl s_client -servername` 출력에서 chain, SAN, 만료일, negotiated protocol을 확인합니다. 차단 기준은 새 인증서가 모든 hostname을 덮지 못하거나 TLS policy가 지원해야 할 client cipher를 제거한 경우입니다. 증거가 부족하면 canary listener나 staging endpoint에서 같은 client matrix를 먼저 통과시킵니다."
          },
          {
            "q": "TLS handshake 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 TLS negotiation 로그와 curl `appconnect_time`이 평상시 범위이고, 같은 요청이 ALB access log까지 이어지는 상태입니다. 위험은 `certificate_unknown`, `protocol_version`, SNI mismatch가 늘지만 target group은 계속 healthy인 경우입니다. 이때는 app 배포를 되돌리지 말고 certificate attachment나 TLS policy 변경을 먼저 되돌립니다."
          },
          {
            "q": "TLS handshake 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 실패 client군, 실패한 SNI, 되돌린 인증서 또는 policy 버전을 기록합니다. 증거는 전후 `s_client` 출력과 ALB TLS error count입니다. 후속 조치는 인증서 rotation checklist에 client matrix와 rollback 명령을 넣고 만료 알림의 owner를 확인하는 것입니다."
          }
        ]
      },
      {
        "q": "CDN/cache 운영 인수에서는 무엇을 먼저 보나요?",
        "decision": "요청이 edge cache에서 끝났는지 origin까지 갔는지 먼저 구분합니다. 판단 기준은 cache status, age, vary key, purge 이력이 사용자 증상과 맞는지입니다. cache 계층이 틀리면 origin이 정상이어도 오래된 HTML, 잘못된 redirect, stale API 응답이 계속 나갑니다.",
        "failure": "캐시 HIT가 높은데 특정 path만 오래된 응답을 주거나 purge가 일부 POP에만 반영되면 요청 경로가 edge에서 멈춘 것입니다. 이 상황을 backend 장애로 보면 origin 로그에는 증거가 없고, 재배포해도 사용자는 같은 stale response를 받습니다.",
        "evidence": "CDN cache status/header, edge POP log, purge/invalidation record, origin access log 비교",
        "followups": [
          {
            "q": "CDN cache 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계에는 문제 URL의 response header, cache status, age, POP, origin log 존재 여부를 같이 남깁니다. 정상 기준은 purge 뒤 같은 POP에서 age가 초기화되고 origin access log가 한 번 이상 찍히는 것입니다. 실패하면 다음 담당자는 cache key와 invalidation 범위를 확인하고, 필요하면 해당 path만 bypass rule로 격리합니다."
          },
          {
            "q": "CDN cache freshness 판정에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 HIT/MISS가 의도한 cache-control과 맞고, stale 응답이 purge 후 사라지는 상태입니다. 위험은 `Vary`, cookie, query string이 cache key에서 빠져 사용자별 응답이 섞이거나, error caching 때문에 5xx가 짧은 장애 뒤에도 남는 경우입니다. 증거는 header diff와 edge log이며, 후속 조치는 key 수정 전까지 민감 path를 no-store로 전환하는 것입니다."
          },
          {
            "q": "CDN cache 경계 확정 뒤에는 무엇을 남기나요?",
            "answer": "경계가 cache로 확인되면 사용자에게 보인 응답 버전, 해당 POP, purge id, 정상화된 첫 시각을 남깁니다. origin까지 도달하지 않은 요청과 origin 오류 요청을 구분해야 합니다. 다음 조치는 cache rule 변경 리뷰에 샘플 URL과 header expectation을 추가하고 synthetic probe가 cache status를 검사하게 하는 것입니다."
          }
        ]
      },
      {
        "q": "WAF 차단 장애 완화에서는 무엇을 먼저 보나요?",
        "decision": "먼저 차단된 요청의 rule id, action, request sample이 실제 사용자 실패와 같은지 확인합니다. 판단 기준은 보안 rule을 전체 해제하지 않고도 정상 사용자 traffic을 살릴 수 있는 최소 예외 범위입니다.",
        "failure": "WAF에서 block/count가 늘었는데 app log가 비어 있으면 요청은 애플리케이션 전에 멈춘 것입니다. 이때 전체 WAF를 끄면 공격 노출이 커지고, 반대로 앱만 수정하면 정상 사용자의 요청은 계속 차단됩니다.",
        "evidence": "WAF sampled request, rule id/action log, blocked URI/user-agent/IP range, ALB/app log absence",
        "followups": [
          {
            "q": "WAF 차단 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "차단 sample에서 rule id, URI, header, source ASN을 먼저 봅니다. 즉시 완화 기준은 정상 사용자 패턴과 공격 패턴이 분리되는지입니다. 증거가 분리되면 특정 rule을 count mode로 바꾸거나 좁은 allow condition을 만료 시각과 함께 추가하고, 분리되지 않으면 rate limit과 challenge로 피해를 줄입니다."
          },
          {
            "q": "WAF 차단 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 완화 뒤 같은 요청이 WAF allow/count로 기록되고 ALB access log와 app trace까지 이어지는 상태입니다. 위험은 block 수만 줄었지만 403 사용자 신고가 남거나 allow rule이 너무 넓은 경우입니다. 후속 조치는 예외 만료, rule tuning 티켓, 공격 sample 보존을 같은 incident record에 묶는 것입니다."
          },
          {
            "q": "WAF 차단 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "WAF에서 멈춘 요청, load balancer까지 간 요청, app에서 거절된 요청을 표로 남깁니다. 증거는 request id, rule id, ALB status, app status의 연결 여부입니다. 다음 조치는 runbook에 `WAF block but no app log` 분기와 예외 승인자를 추가해 같은 장애에서 앱팀 호출이 반복되지 않게 하는 것입니다."
          }
        ]
      },
      {
        "q": "Load Balancer health 장애 판단에서는 무엇을 먼저 보나요?",
        "decision": "target group의 healthy 비율만 보지 말고 어느 target이 어떤 reason code로 빠졌는지 확인합니다. 판단 기준은 load balancer가 5xx를 만들었는지, healthy target으로 넘긴 뒤 애플리케이션이 실패했는지입니다.",
        "failure": "health check path가 실제 사용자 path보다 얕으면 모든 target이 healthy여도 실제 요청은 502를 낼 수 있습니다. 반대로 health check만 실패하면 target이 제외되어 정상 instance에 traffic이 몰리고 connection queue가 커집니다.",
        "evidence": "target group health reason, ALB elb_status_code/target_status_code, per-target request count, health check path log",
        "followups": [
          {
            "q": "Load Balancer health 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "ALB access log에서 `elb_status_code`와 `target_status_code`를 먼저 나눕니다. 502가 ELB에서 끝나면 target 연결, TLS to target, idle timeout을 의심하고, target status가 5xx이면 앱 처리 문제로 넘어갑니다. 증거는 target health reason과 per-target request 분포이며, 특정 target만 나쁘면 drain 또는 deregistration으로 영향 반경을 줄입니다."
          },
          {
            "q": "Load Balancer health 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 health check와 실제 사용자 path가 모두 성공하고, target별 request/error 비율이 균등한 상태입니다. 위험은 health check는 통과하지만 특정 endpoint의 target response time이나 5xx가 한 target에 몰리는 경우입니다. 후속 조치는 health check path를 실제 의존성에 맞게 보강하고, 불량 target을 빼기 전후의 5xx 변화를 확인하는 것입니다."
          },
          {
            "q": "Load Balancer health 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 뒤에는 health check가 놓친 dependency와 실제 실패 path를 남깁니다. 증거는 ALB log query, target health transition, 제외한 instance id입니다. 다음 조치는 health check 기준을 바꾸거나 slow start/drain 설정을 조정하고, 배포 runbook에 target별 오류 편차 확인을 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "502/503/504 분리 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "HTTP 5xx를 하나로 묶지 말고 status code가 어느 hop에서 만들어졌는지 먼저 분리합니다. 판단 기준은 502는 잘못된 upstream 응답이나 연결 실패, 503은 가용 target 또는 throttling 부족, 504는 timeout budget 초과라는 가설을 각각 검증하는 것입니다.",
        "failure": "502/503/504를 모두 내부 오류로 처리하면 완화가 빗나갑니다. 예를 들어 504인데 instance를 늘리지 않고 WAF만 조정하거나, 503인데 DB query를 튜닝하면 사용자 실패는 그대로 남습니다.",
        "evidence": "ALB elb_status_code/target_status_code, upstream connection error, target response time, deployment marker",
        "followups": [
          {
            "q": "502/503/504 분리 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "변경 승인 전에는 canary traffic에서 502, 503, 504 비율과 target response time p95를 분리해 봅니다. 차단 기준은 배포 marker 이후 특정 code가 기준선보다 오르거나, ALB status와 target status가 다른 결론을 내는 경우입니다. 증거는 ALB log query와 canary dashboard이며, 후속 조치는 rollout 비율을 고정하고 해당 code에 맞는 rollback 조건을 적는 것입니다."
          },
          {
            "q": "502/503/504 분리 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 code별 원인이 같은 timeline에서 설명되고 완화 뒤 해당 code만 내려가는 상태입니다. 위험은 전체 5xx는 줄었지만 504가 남아 retry storm이나 downstream timeout을 키우는 경우입니다. 이때는 request rate를 줄이거나 timeout chain을 짧게 잡고, app trace에서 어느 span이 budget을 썼는지 확인합니다."
          },
          {
            "q": "502/503/504 분리 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 어떤 status code가 먼저 회복됐고 어떤 code가 남았는지 남깁니다. 증거는 rollback marker 전후의 ALB status 분포, target response time, trace error tag입니다. 다음 조치는 code별 runbook 분기를 보강하고 alert가 `5xx total`만 보지 않도록 502/503/504를 따로 노출하는 것입니다."
          }
        ]
      },
      {
        "q": "app access log 운영 인수에서는 무엇을 먼저 보나요?",
        "decision": "앱 로그가 있는지보다 요청을 식별할 key가 앞단 로그와 이어지는지 먼저 봅니다. 판단 기준은 request id, route, user/tenant, status, latency, upstream dependency가 같은 요청 단위로 남아 다음 담당자가 재현 가능한지입니다.",
        "failure": "ALB에는 5xx가 있는데 앱 로그가 없으면 앞단 차단, target 연결 실패, 로그 샘플링 누락을 나눠야 합니다. 앱 로그만 보고 정상이라고 인계하면 로드 밸런서나 WAF에서 사라진 요청을 놓칩니다.",
        "evidence": "application access log, ALB request id, route/status/latency fields, log sampling/drop metric",
        "followups": [
          {
            "q": "app access log 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계에는 실패 요청의 app log line과 같은 시간대의 ALB request id를 같이 붙입니다. 정상 기준은 route, tenant, status, latency, traceId가 빠짐없이 남고 로그 지연이 관측 창보다 짧은 것입니다. 누락되면 다음 담당자는 log pipeline drop metric과 sampler 설정을 먼저 확인합니다."
          },
          {
            "q": "app access log 연결성 판정에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 같은 request id가 ALB, app log, trace에 모두 있고 status와 latency가 서로 설명되는 상태입니다. 위험은 앱 로그에는 200만 보이는데 ALB 5xx가 늘거나, error log는 있지만 route와 tenant가 빠져 영향 범위를 못 자르는 경우입니다. 후속 조치는 필수 log field를 배포 차단 조건으로 만들고 샘플링 예외를 오류 path에 적용하는 것입니다."
          },
          {
            "q": "app access log 누락 범위 확정 뒤에는 무엇을 남기나요?",
            "answer": "경계 뒤에는 로그가 없는 요청의 비율, 로그 지연, 누락 field, 보강한 query를 남깁니다. 증거는 log pipeline metric과 수정된 dashboard link입니다. 다음 조치는 장애 중 바로 쓸 수 있는 saved query를 만들고, request id가 없는 legacy endpoint에는 middleware 보강 티켓을 여는 것입니다."
          }
        ]
      },
      {
        "q": "traceId 연결 장애 완화에서는 무엇을 먼저 보나요?",
        "decision": "traceId가 gateway에서 생성되어 앱과 downstream span까지 전파되는지 먼저 확인합니다. 판단 기준은 실패 요청의 root span이 존재하는지, 누락 지점이 gateway, async boundary, downstream client 중 어디인지입니다.",
        "failure": "traceId가 없으면 장애 분석은 로그 시간대 추정에 묶입니다. 특히 gateway는 성공으로 보이는데 downstream span이 끊기면 retry, queue, async worker에서 실패가 숨을 수 있습니다.",
        "evidence": "trace root span, propagation header, ALB/app request id mapping, downstream span gap",
        "followups": [
          {
            "q": "traceId 연결 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "먼저 실패 요청의 header와 gateway log에서 traceId 생성 여부를 봅니다. root span이 없으면 tracing SDK나 ingress middleware를 의심하고, root span은 있는데 downstream span이 없으면 propagation header 손실을 봅니다. 즉시 조치는 같은 request id로 로그를 묶는 임시 dashboard를 만들고, sampling rate를 장애 path에 한해 올리는 것입니다."
          },
          {
            "q": "traceId 연결 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 실패율이 높은 route에서도 trace coverage가 기준 이상이고, root span에서 DB나 downstream span까지 이어지는 상태입니다. 위험은 오류 요청만 sampling에서 빠지거나 async 작업에서 새 trace가 열려 원인 연결이 끊기는 경우입니다. 후속 조치는 propagation test를 CI에 넣고 queue consumer가 parent trace를 받는지 검증하는 것입니다."
          },
          {
            "q": "traceId 연결 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 trace가 생성된 hop, 끊긴 hop, 임시로 연결한 log query를 남깁니다. 증거는 trace coverage metric과 실패 request sample입니다. 다음 조치는 누락 hop owner에게 instrumentation 티켓을 배정하고, trace coverage가 낮아지면 배포 검증이 실패하도록 alert를 연결하는 것입니다."
          }
        ]
      },
      {
        "q": "DB connection pool 장애 판단에서는 무엇을 먼저 보나요?",
        "decision": "요청 지연이 DB 쿼리 시간인지 connection checkout 대기인지 먼저 나눕니다. 판단 기준은 pool active/idle/waiting, acquire timeout, DB connection limit, slow query가 같은 timeline에서 맞는지입니다.",
        "failure": "DB CPU가 낮아도 pool이 고갈되면 앱 thread는 connection을 기다리다 503이나 504를 냅니다. 반대로 slow query가 원인인데 pool 크기만 키우면 DB connection limit을 더 빨리 소진합니다.",
        "evidence": "pool active/idle/waiting metric, acquire timeout log, DB max connection, trace DB span and wait time",
        "followups": [
          {
            "q": "DB connection pool 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "먼저 pool waiting count와 acquire timeout log를 봅니다. waiting이 늘고 DB active query는 적으면 pool sizing, leak, transaction hold를 의심합니다. 증거는 trace의 DB span 전 대기 시간과 connection checkout metric이며, 즉시 조치는 leak 의심 route를 제한하거나 pool timeout을 request timeout보다 짧게 맞추는 것입니다."
          },
          {
            "q": "DB connection pool 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 pool waiting이 줄고 request latency와 DB connection 수가 함께 안정되는 상태입니다. 위험은 pool을 키운 뒤 5xx는 줄었지만 DB max connection 근처에서 lock wait이나 failover 지연이 늘어나는 경우입니다. 후속 조치는 pool 크기 변경을 임시 조치로 표시하고 slow query, transaction scope, connection leak을 따로 추적하는 것입니다."
          },
          {
            "q": "DB connection pool 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 pool 대기, DB 실행 시간, request timeout 중 어느 구간이 실제 병목이었는지 남깁니다. 증거는 trace waterfall과 pool metric snapshot입니다. 다음 조치는 dashboard에 checkout wait을 별도 지표로 올리고, pool timeout과 upstream timeout의 순서를 runbook에 명시하는 것입니다."
          }
        ]
      },
      {
        "q": "timeout budget 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "전체 요청 시간 안에서 client, CDN, load balancer, app, DB/downstream timeout이 어떤 순서로 끊기는지 먼저 봅니다. 판단 기준은 앞단 timeout이 뒤쪽 timeout보다 길어 불필요한 대기가 생기지 않고, 재시도가 전체 budget을 넘기지 않는지입니다.",
        "failure": "timeout이 서로 맞지 않으면 사용자는 504를 받았는데 앱은 계속 DB 작업을 수행하거나, retry가 중첩되어 장애를 키웁니다. 평균 latency만 보면 tail latency와 queue buildup을 놓칩니다.",
        "evidence": "curl total/connect/appconnect timing, ALB target response time, app timeout config, downstream retry/timeout policy",
        "followups": [
          {
            "q": "timeout budget 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 전에는 hop별 timeout 값과 p95/p99 latency를 같은 표에 놓습니다. 차단 기준은 downstream timeout이 app request timeout보다 길거나 retry까지 합친 시간이 client budget을 넘는 경우입니다. 증거는 설정 diff와 trace latency histogram이며, 후속 조치는 canary에서 504율과 retry count가 유지되는지 확인하는 것입니다."
          },
          {
            "q": "timeout budget 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 timeout이 가장 가까운 실패 지점에서 빠르게 끝나고, trace에 어느 downstream이 budget을 썼는지 남는 상태입니다. 위험은 client는 끊겼는데 app worker가 계속 점유되거나 retry가 같은 downstream을 반복 타격하는 경우입니다. 즉시 조치는 retry budget을 줄이고 circuit breaker를 열어 queue 증가를 막는 것입니다."
          },
          {
            "q": "timeout budget 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 어떤 timeout 값을 되돌렸고 504, worker saturation, retry count가 어떻게 바뀌었는지 남깁니다. 증거는 설정 diff, rollback marker, trace waterfall입니다. 다음 조치는 service contract에 timeout 순서를 문서화하고 변경 리뷰에서 새 downstream의 budget 기여도를 요구하는 것입니다."
          }
        ]
      },
      {
        "q": "지역별 장애 운영 인수에서는 무엇을 먼저 보나요?",
        "decision": "전역 평균이 아니라 region, edge POP, ISP, availability zone별 성공률을 먼저 나눕니다. 판단 기준은 동일한 요청이 어느 지역 경계에서만 실패하는지와 traffic shift가 가능한지입니다.",
        "failure": "전체 성공률이 높아도 한 region의 resolver, CDN POP, target group이 실패하면 해당 사용자군에는 완전 장애입니다. 평균 지표로 정상 인계하면 지역별 route나 failover 결정을 놓칩니다.",
        "evidence": "region별 synthetic probe, CDN POP/edge log, ALB target zone metric, GeoDNS or traffic policy change log",
        "followups": [
          {
            "q": "지역별 장애 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계에는 실패 region, 정상 region, 재현 probe URL, 마지막 성공/실패 시각을 같이 남깁니다. 정상 기준은 traffic shift나 failover 뒤 실패 region의 synthetic probe와 실제 사용자 오류가 모두 줄어드는 것입니다. 증거가 한쪽만 있으면 고객지원 신고와 edge log를 연결해 영향 범위를 다시 잡습니다."
          },
          {
            "q": "지역별 장애 회복 판정에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 지역별 probe, ALB zone metric, app trace가 같은 지역을 정상으로 가리키는 상태입니다. 위험은 probe는 회복됐지만 특정 ISP나 mobile carrier에서 DNS 또는 TLS 실패가 남는 경우입니다. 후속 조치는 GeoDNS 정책, CDN POP 우회, region별 공지를 따로 관리하고 전역 정상 선언을 보류하는 것입니다."
          },
          {
            "q": "지역별 영향 범위 확정 뒤에는 무엇을 남기나요?",
            "answer": "경계 뒤에는 어떤 지역이 빠졌고 어떤 우회 정책을 적용했으며 언제 원복할지 남깁니다. 증거는 traffic policy diff, probe dashboard, region별 error rate입니다. 다음 조치는 지역별 synthetic coverage를 늘리고 failover drill에서 DNS cache와 CDN propagation 시간을 측정하는 것입니다."
          }
        ]
      },
      {
        "q": "요청 timeline 장애 완화에서는 무엇을 먼저 보나요?",
        "decision": "한 요청을 DNS, TCP, TLS, CDN/WAF, load balancer, app, DB/downstream 순서로 시간선에 놓습니다. 판단 기준은 첫 지연 또는 첫 실패 hop을 찾고, 완화가 그 hop 앞뒤 어디에 작용하는지 설명하는 것입니다.",
        "failure": "타임라인 없이 증거를 모으면 각 팀이 자기 계층만 정상이라고 말하고 실제 사용자의 실패 순서는 남지 않습니다. 첫 실패 hop을 못 찾으면 rollback, cache bypass, traffic shift 중 어떤 조치가 효과가 있었는지도 증명할 수 없습니다.",
        "evidence": "curl timing breakdown, ALB/WAF/app log timestamps, trace waterfall, deployment and mitigation markers",
        "followups": [
          {
            "q": "요청 timeline 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화 전에는 실패 요청 하나의 curl timing, WAF/ALB timestamp, app log, trace waterfall을 같은 초 단위로 맞춥니다. 판단 기준은 첫 실패 hop이 앞단인지 앱 내부인지입니다. 앞단이면 cache bypass나 WAF 예외를, 앱 내부이면 rollback이나 traffic shedding을 우선 적용하고 marker를 남깁니다."
          },
          {
            "q": "요청 timeline 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 완화 marker 이후 첫 실패 hop이 사라지고 전체 요청 시간이 SLO budget 안으로 돌아온 상태입니다. 위험은 총 latency는 줄었지만 DNS나 TLS 같은 앞단 시간이 여전히 흔들리거나, downstream span이 뒤에서 계속 timeout을 만드는 경우입니다. 후속 조치는 timeline dashboard를 incident template에 붙이고 marker 없는 수동 조치를 금지하는 것입니다."
          },
          {
            "q": "요청 timeline 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 각 hop의 시작/종료 시각, 실패한 hop, 배제한 hop, 적용한 완화의 효과를 남깁니다. 증거는 timeline 표와 trace 링크, 로그 query입니다. 다음 조치는 runbook 첫 단계에 timeline 작성 항목을 넣고, synthetic probe가 DNS부터 app status까지 timing을 저장하게 하는 것입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-vpc-routing-qa",
    "title": "VPC·Subnet·Routing·NAT Q&A",
    "source": "VPC·Subnet·Routing·NAT",
    "subtitle": "네트워크 라우팅 경계에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "CIDR overlap 장애 판단에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 두 네트워크를 계속 연결할 수 있는지, 겹치는 대역을 분리하거나 NAT/프록시 경계로 끊어야 하는지입니다. 첫 경계는 VPC, VPN, Transit Gateway attachment의 CIDR readback과 route destination입니다. 동일하거나 더 구체적인 대역이 양쪽에 있으면 정상 route가 있어도 응답이 다른 소유자에게 돌아갈 수 있으므로, Flow Logs의 srcaddr/dstaddr와 route table export를 같은 시각으로 맞춥니다.",
        "failure": "겹침을 DNS나 방화벽 문제로 보면 한쪽 세션만 간헐적으로 실패하고 피어링 또는 TGW 전파를 열수록 영향 반경이 커집니다. 실패 모드는 신규 VPC 추가 후 기존 온프레미스 대역과 충돌해 특정 서비스 호출만 검은 구멍처럼 사라지는 것입니다.",
        "evidence": "VPC CIDR inventory, Transit Gateway route table export, VPN/BGP advertised prefixes, VPC Flow Logs srcaddr/dstaddr/action",
        "followups": [
          {
            "q": "CIDR overlap 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "첫 증거는 실제 연결 경로에 올라온 양쪽 CIDR 목록입니다. VPC CIDR, TGW route table, VPN/BGP advertised prefix를 비교해 동일 대역이나 포함 관계가 있으면 라우팅 변경을 멈춥니다. 다음 조치는 겹치는 prefix를 가진 attachment를 격리하고, Flow Logs에서 실패 tuple의 dstaddr가 어느 소유 대역으로 해석됐는지 확인하는 것입니다."
          },
          {
            "q": "CIDR overlap 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 출발 VPC, 중간 TGW, 목적 VPC가 모두 같은 목적 소유자를 가리키고 양방향 Flow Logs가 ACCEPT로 남는 상태입니다. 위험은 request는 목적지에 도착하지만 reply가 겹치는 다른 대역으로 선택되는 경우입니다. 증거가 엇갈리면 DNS 이름 대신 IP tuple로 재현하고 route export snapshot을 incident에 붙입니다."
          },
          {
            "q": "CIDR overlap 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "남길 것은 충돌한 prefix, 영향을 받은 attachment, 임시 우회 방식, 영구 주소 계획입니다. 증거는 변경 전후 route table export와 실패 Flow Logs query입니다. 다음 조치는 IPAM 또는 CIDR registry에 예약 상태를 갱신하고 신규 VPC 생성 체크에 overlap 검사를 넣는 것입니다."
          }
        ]
      },
      {
        "q": "subnet route association 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 서브넷이 public, private, isolated 중 어느 tier로 동작해야 하는지입니다. 첫 메커니즘은 subnet-to-route-table association이며, 같은 route table 이름보다 실제 association id와 default route target이 중요합니다. 변경 리뷰에서는 ENI가 속한 subnet, 연결된 route table, NAT/IGW/endpoint route를 한 번에 확인합니다.",
        "failure": "association을 놓치면 private subnet이 IGW default route를 받아 공개되거나, 배치 subnet이 NAT 경로를 잃고 외부 API 호출에 실패합니다. 실패 모드는 새 subnet을 만들고 명시 association을 빠뜨려 main route table 정책을 몰래 상속하는 것입니다.",
        "evidence": "subnet route table association export, main route table flag, ENI subnet inventory, Reachability Analyzer path result",
        "followups": [
          {
            "q": "subnet tier 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단 증거는 subnet별 association 목록과 main route table 상속 여부입니다. tier 설계와 다른 default route target이 보이면 변경을 멈춥니다. 다음 조치는 영향을 받는 ENI와 workload를 뽑아 public exposure 또는 egress 단절 위험을 owner에게 확인시키는 것입니다."
          },
          {
            "q": "subnet tier 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 subnet tier, route table association, expected next hop이 모두 설계 문서와 일치하고 Reachability Analyzer가 같은 경로를 보여주는 경우입니다. 위험은 새 subnet만 main route table을 상속하거나 AZ별 route table이 서로 다른 NAT target을 가리키는 상태입니다. 증상 연결은 실패 ENI의 subnet id와 route table id를 로그에 남기는 것으로 닫습니다."
          },
          {
            "q": "subnet tier 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 이전 association id, 복원한 route table id, 검증한 대표 ENI를 남깁니다. 실패 모드는 association만 되돌리고 main route table 변경은 남겨 새 subnet에서 재발하는 것입니다. 다음 조치는 IaC state와 콘솔 readback을 대조하고 subnet 생성 runbook에 명시 association 확인을 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "route table precedence와 longest prefix match는 어떻게 판단하나요?",
        "decision": "먼저 결정할 것은 의도한 더 구체적인 route가 기본 경로보다 우선하는지입니다. 첫 메커니즘은 longest prefix match이고, 같은 prefix라면 static route, propagated route, 서비스별 local route의 우선순위를 확인합니다. 운영 답변에는 destination prefix, target, propagated 여부, 마지막 변경자가 함께 있어야 합니다.",
        "failure": "0.0.0.0/0만 보면 더 구체적인 /32, /24, prefix list route가 트래픽을 가로채는 문제를 놓칩니다. 실패 모드는 보안 장비 우회 route나 PrivateLink prefix list가 일부 목적지만 다른 target으로 보내 애플리케이션 timeout을 만드는 것입니다.",
        "evidence": "route table entries with propagated flag, prefix list id, route change event, Reachability Analyzer hop list",
        "followups": [
          {
            "q": "route table 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 route table 전체 export와 목적지별 선택 결과입니다. 특정 IP에 대해 어떤 prefix가 선택되는지 Reachability Analyzer 또는 cloud route lookup으로 남겨야 합니다. 다음 담당자는 default route가 아니라 실제 match된 destination과 target을 보고 같은 판단을 재현할 수 있어야 합니다."
          },
          {
            "q": "더 구체적인 route가 있으면 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 더 구체적인 route가 승인된 목적지에만 있고 target이 설계된 보안 장비, TGW, endpoint 중 하나인 상태입니다. 위험은 임시 테스트용 /32나 prefix list가 남아 기본 경로보다 먼저 선택되는 경우입니다. 증거는 route change event와 해당 목적지 traceroute 또는 Analyzer hop이며, 위험이면 더 구체적인 route를 제거하거나 change ticket에 소유자를 지정합니다."
          },
          {
            "q": "route table precedence 오판 뒤에는 무엇을 남기나요?",
            "answer": "오판 뒤에는 잘못 선택된 prefix, 기대 target, 실제 target, 제거 또는 수정한 route를 남깁니다. 실패 모드는 같은 route가 다른 AZ route table에도 남아 일부 subnet에서만 재발하는 것입니다. 다음 조치는 route table drift query를 만들고 변경 리뷰에서 prefix별 우선순위 diff를 필수 첨부로 바꾸는 것입니다."
          }
        ]
      },
      {
        "q": "NAT gateway port exhaustion 장애 완화에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 NAT 자체 장애인지, 특정 목적지로 향하는 동시 연결과 ephemeral port 고갈인지입니다. 첫 메커니즘은 source private IP, destination IP:port, NAT gateway의 ErrorPortAllocation과 ActiveConnectionCount입니다. 완화는 원인 확정보다 빨리 AZ별 NAT 분리, 목적지 분산, connection reuse 조정 중 어떤 조치가 피해를 줄이는지 고르는 것입니다.",
        "failure": "NAT 포트 고갈을 인터넷 장애로 보면 retry가 늘어 고갈을 더 키웁니다. 실패 모드는 많은 워커가 같은 외부 API endpoint로 짧은 연결을 반복해 특정 NAT gateway에서만 connection timeout이 폭증하는 것입니다.",
        "evidence": "NAT gateway ErrorPortAllocation metric, ActiveConnectionCount, Flow Logs 5-tuple, client connection pool settings",
        "followups": [
          {
            "q": "NAT port 고갈 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화 전에는 ErrorPortAllocation 증가 시각과 실패 Flow Logs의 destination IP:port를 맞춥니다. 같은 목적지로 연결이 몰리면 NAT gateway 추가보다 destination 분산이나 client connection reuse가 빠를 수 있습니다. 다음 조치는 영향 subnet을 AZ별 NAT로 나누고 retry 폭주를 임시 제한하는 것입니다."
          },
          {
            "q": "NAT gateway 지표에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 ErrorPortAllocation이 0으로 돌아오고 ActiveConnectionCount가 목적지별 한계에 근접하지 않는 상태입니다. 위험은 전체 egress 대역폭은 남아 있는데 특정 destination tuple에서 timeout이 계속 나는 경우입니다. 증거는 NAT metric, Flow Logs 5-tuple 집계, 외부 API 상태 페이지이며, 위험이면 목적지별 연결 제한을 배포합니다."
          },
          {
            "q": "NAT port 완화 뒤에는 무엇을 남기나요?",
            "answer": "남길 것은 영향을 받은 subnet, NAT gateway id, 상위 목적지 tuple, 적용한 분산 방식입니다. 실패 모드는 NAT만 증설하고 애플리케이션 retry storm을 그대로 두어 다음 피크에 재발하는 것입니다. 다음 조치는 connection pool 설정, retry budget, NAT metric alert threshold를 runbook에 같이 반영하는 것입니다."
          }
        ]
      },
      {
        "q": "Internet Gateway와 public route 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 해당 subnet이 인터넷에서 직접 도달 가능한 public subnet이어야 하는지입니다. 첫 메커니즘은 IGW attachment, route table의 0.0.0.0/0 또는 ::/0 target, ENI public IP 조합입니다. route만 있어도 public IP가 없으면 inbound는 성립하지 않고, public IP가 있어도 SG/NACL이 막으면 노출은 제한됩니다.",
        "failure": "IGW route를 단순 egress 설정으로 보면 private workload가 공개 경로를 얻거나, 반대로 public endpoint가 default route를 잃습니다. 실패 모드는 shared route table에 IGW default route를 넣어 의도하지 않은 subnet까지 public tier가 되는 것입니다.",
        "evidence": "IGW attachment state, route table default route, ENI public IP inventory, external probe result, Security Group inbound diff",
        "followups": [
          {
            "q": "Internet Gateway 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 route table default route와 해당 route table에 묶인 subnet 목록에서 시작합니다. private tier subnet이 함께 묶여 있으면 변경을 승인하지 않습니다. 다음 조치는 public IP가 붙은 ENI 목록과 외부 probe 결과를 첨부해 실제 노출 자산을 확인하는 것입니다."
          },
          {
            "q": "public route 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 IGW attached, subnet association, default route, ENI public IP, SG inbound가 의도한 endpoint에만 맞는 상태입니다. 위험은 외부 probe가 열리는데 change ticket에는 egress 목적이라고 적힌 경우입니다. 증거는 route diff와 외부 스캔 결과이며, 위험이면 route table을 분리하고 public IP 제거 여부를 즉시 검토합니다."
          },
          {
            "q": "IGW route 되돌림 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 제거한 default route, 영향을 받은 subnet, 외부 probe가 닫힌 시각을 남깁니다. 실패 모드는 route만 되돌리고 public IP가 붙은 ENI를 방치하는 것입니다. 다음 조치는 public subnet 기준을 IaC policy로 고정하고, shared route table 사용을 변경 리뷰에서 별도 항목으로 검사하는 것입니다."
          }
        ]
      },
      {
        "q": "Transit Gateway propagation 운영 인수에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 route가 어느 TGW route table에 전파되어야 하고 어느 attachment에서만 보여야 하는지입니다. 첫 메커니즘은 attachment association과 propagation의 분리입니다. 운영 인수에서는 associated route table, propagated route table, static override를 모두 보여줘야 다음 담당자가 경로 누락과 과전파를 구분합니다.",
        "failure": "association과 propagation을 같은 것으로 보면 spoke VPC가 필요한 route를 못 받거나, 격리해야 할 대역이 다른 도메인으로 퍼집니다. 실패 모드는 새 attachment를 연결했지만 propagation 대상 route table을 빠뜨려 한 방향만 도달하는 것입니다.",
        "evidence": "TGW attachment association, TGW route propagation table, static route override, appliance mode flag, Flow Logs per attachment",
        "followups": [
          {
            "q": "Transit Gateway 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 attachment별 associated route table과 propagation enabled 목록입니다. 특정 VPC가 어떤 route table을 조회하고 어떤 prefix를 전파하는지 표로 남겨야 합니다. 다음 조치는 static route override와 propagated route가 같은 destination을 두고 충돌하지 않는지 확인하는 것입니다."
          },
          {
            "q": "TGW propagation에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 source attachment가 조회하는 route table에 목적 prefix가 있고, return path를 담당하는 route table에도 반대 prefix가 있는 상태입니다. 위험은 한쪽 route table에만 전파되거나 더 구체적인 static route가 propagated route를 가리는 경우입니다. 증거는 TGW route search 결과와 양방향 Flow Logs이며, 위험이면 propagation 대상 또는 static route를 수정합니다."
          },
          {
            "q": "Transit Gateway 경로 오판 뒤에는 무엇을 남기나요?",
            "answer": "오판 뒤에는 누락되거나 과전파된 prefix, 관련 attachment, 수정한 association 또는 propagation을 남깁니다. 실패 모드는 spoke 한 곳만 고치고 shared service route table에는 잘못된 전파가 계속 남는 것입니다. 다음 조치는 TGW route table diff를 정기 export하고 attachment 생성 runbook에 양방향 route check를 넣는 것입니다."
          }
        ]
      },
      {
        "q": "Security Group과 NACL 차이는 장애 판단에서 어떻게 쓰나요?",
        "decision": "먼저 결정할 것은 stateful SG가 막았는지, stateless NACL이 subnet 경계에서 버렸는지입니다. 첫 경계는 ENI level SG rule과 subnet level NACL rule의 적용 위치입니다. SG는 허용된 연결의 return traffic을 추적하지만 NACL은 양방향 rule이 모두 필요하므로, Flow Logs의 ACCEPT/REJECT와 rule 변경 시각을 같이 봅니다.",
        "failure": "둘을 같은 방화벽으로 다루면 SG만 열고 return path NACL을 놓쳐 timeout을 반복합니다. 실패 모드는 inbound 443은 허용됐지만 ephemeral return port가 NACL egress 또는 ingress에서 막혀 클라이언트가 응답을 받지 못하는 것입니다.",
        "evidence": "Security Group inbound/outbound diff, NACL ordered rules, VPC Flow Logs action, ENI and subnet mapping",
        "followups": [
          {
            "q": "SG와 NACL 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "초기 분기는 실패 ENI의 SG 목록과 해당 subnet의 NACL id를 매핑하는 것에서 시작합니다. Flow Logs가 REJECT를 보이면 SG/NACL 변경 시각과 비교하고, ACCEPT인데 애플리케이션 timeout이면 뒤쪽 경로를 봅니다. 다음 조치는 같은 tuple을 source, destination, return 방향으로 나눠 어느 경계에서 막혔는지 표시하는 것입니다."
          },
          {
            "q": "Security Group이 정상이어도 위험한 경우는 무엇인가요?",
            "answer": "SG가 정상이어도 NACL 순서에서 deny가 먼저 오거나 return port range가 빠지면 위험합니다. 정상 기준은 SG rule, NACL inbound, NACL outbound가 같은 5-tuple을 허용하고 Flow Logs가 양방향 ACCEPT를 보이는 것입니다. 증거가 부족하면 Reachability Analyzer로 ENI부터 목적지까지 경계를 재현합니다."
          },
          {
            "q": "SG/NACL 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "남길 것은 실패 tuple, 적용된 SG rule id, NACL rule number, 수정 전후 Flow Logs입니다. 실패 모드는 임시 allow rule을 높은 우선순위로 넣고 만료 없이 방치하는 것입니다. 다음 조치는 임시 rule에 owner와 expiry를 붙이고 NACL rule order 검사를 변경 리뷰에 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "NACL ephemeral return path는 어떻게 검증하나요?",
        "decision": "먼저 결정할 것은 요청 방향과 응답 방향 모두 NACL rule을 통과하는지입니다. 첫 메커니즘은 stateless NACL의 inbound/outbound rule order와 ephemeral port range입니다. 서버 포트만 열려 있어도 클라이언트 임시 포트로 돌아가는 응답이 막히면 장애가 납니다.",
        "failure": "return path를 검증하지 않으면 SYN은 들어오지만 응답 패킷이 subnet 경계에서 버려지는 반쪽 연결이 생깁니다. 실패 모드는 OS 또는 로드밸런서가 사용하는 ephemeral range와 NACL allow range가 달라 특정 client만 timeout을 겪는 것입니다.",
        "evidence": "NACL inbound/outbound rule numbers, Flow Logs REJECT on ephemeral port, packet capture SYN/SYN-ACK, OS ephemeral port range",
        "followups": [
          {
            "q": "NACL ephemeral port 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "첫 증거는 Flow Logs에서 REJECT된 dstport 또는 srcport가 ephemeral range인지 보는 것입니다. 같은 시각 packet capture에서 SYN 이후 응답이 사라지면 NACL return path가 유력합니다. 다음 조치는 NACL rule number와 OS ephemeral range를 대조해 최소 범위 allow를 임시 적용하는 것입니다."
          },
          {
            "q": "return path에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 request port와 return ephemeral port가 양방향 NACL rule에서 모두 허용되고 Flow Logs가 ACCEPT를 보이는 상태입니다. 위험은 특정 AZ subnet의 NACL만 range가 좁거나 deny rule이 먼저 평가되는 경우입니다. 증거는 subnet별 NACL diff와 실패 client의 5-tuple이며, 위험이면 AZ별 rule을 맞춥니다."
          },
          {
            "q": "NACL return path 수정 뒤에는 무엇을 남기나요?",
            "answer": "수정 뒤에는 허용한 ephemeral range, rule number, 적용 subnet, packet capture 재검증 결과를 남깁니다. 실패 모드는 넓은 임시 allow를 영구 rule로 남겨 보안 범위를 키우는 것입니다. 다음 조치는 표준 ephemeral range를 문서화하고 NACL 변경마다 양방향 Flow Logs query를 첨부하는 것입니다."
          }
        ]
      },
      {
        "q": "egress allowlist 변경 리뷰에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 외부 목적지를 IP, FQDN, prefix list, proxy 중 어느 경계에서 허용할지입니다. 첫 메커니즘은 route target, SG/NACL egress, firewall or proxy policy, DNS 해석 결과의 연결입니다. 변경 리뷰는 허용 목적지와 실제 resolved IP가 계속 일치하는지, 차단 시 사용자 영향이 무엇인지까지 봐야 합니다.",
        "failure": "allowlist를 문자열 목록으로만 관리하면 SaaS IP 변경, CDN CNAME, dual-stack 전환에서 정상 트래픽이 막히거나 과도하게 넓은 CIDR을 열게 됩니다. 실패 모드는 DNS는 새 IP를 주는데 egress 방화벽은 이전 prefix만 허용해 일부 region 호출이 실패하는 것입니다.",
        "evidence": "egress firewall policy, managed prefix list version, resolver query log, Flow Logs destination aggregation, vendor IP range notice",
        "followups": [
          {
            "q": "egress allowlist 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 목적지 FQDN의 DNS 결과와 실제 egress policy가 허용하는 prefix를 비교하는 데서 시작합니다. vendor가 게시한 IP range와 managed prefix list version이 다르면 승인하지 않습니다. 다음 조치는 Flow Logs destination 집계로 현재 사용 중인 목적지를 확인하고 최소 허용 범위를 산정하는 것입니다."
          },
          {
            "q": "allowlist 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 DNS query log, egress firewall allow log, Flow Logs ACCEPT가 같은 destination을 가리키는 상태입니다. 위험은 DNS는 성공하지만 resolved IP가 allowlist 밖이라 연결만 timeout 나는 경우입니다. 증거가 맞으면 prefix list를 갱신하고, 맞지 않으면 proxy 또는 PrivateLink 같은 더 안정적인 egress 경계를 검토합니다."
          },
          {
            "q": "egress allowlist 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 제거한 prefix, 복원한 policy version, 실패한 destination sample을 남깁니다. 실패 모드는 광범위한 0.0.0.0/0 임시 허용을 닫지 않아 데이터 유출 경로가 되는 것입니다. 다음 조치는 allowlist owner와 vendor update 구독자를 지정하고 policy diff를 자동 보관하는 것입니다."
          }
        ]
      },
      {
        "q": "Private Endpoint와 PrivateLink DNS 운영 인수에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 서비스 이름이 public endpoint가 아니라 VPC endpoint ENI의 private IP로 해석되어야 하는지입니다. 첫 메커니즘은 Private DNS enabled, private hosted zone association, endpoint policy, subnet/AZ별 endpoint ENI입니다. 운영 인수에는 DNS answer와 실제 ENI 도달성이 함께 남아야 합니다.",
        "failure": "PrivateLink를 만들고 DNS를 놓치면 트래픽이 계속 public 경로로 나가거나 특정 VPC만 NXDOMAIN을 받습니다. 실패 모드는 shared services VPC에서는 private name이 해석되지만 workload VPC에는 hosted zone association이 없어 NAT/IGW 경로를 타는 것입니다.",
        "evidence": "VPC endpoint state and policy, Private DNS enabled flag, private hosted zone associations, resolver query log, endpoint ENI Flow Logs",
        "followups": [
          {
            "q": "Private Endpoint 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 서비스 FQDN 조회 결과가 endpoint ENI private IP로 나오는지입니다. resolver query log와 endpoint ENI Flow Logs를 붙이면 DNS와 네트워크 도달성을 함께 검증할 수 있습니다. 다음 조치는 hosted zone association이 필요한 VPC 목록과 endpoint policy 허용 principal을 남기는 것입니다."
          },
          {
            "q": "PrivateLink DNS에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 같은 VPC resolver에서 private IP가 반환되고 Flow Logs가 endpoint ENI로 향하는 상태입니다. 위험은 개발 환경은 public IP를, 운영 환경은 private IP를 받아 같은 이름이 환경별로 다른 경로를 타는 경우입니다. 증거는 dig 결과, resolver log, endpoint policy evaluation이며, 위험이면 DNS association 또는 split-horizon 정책을 정리합니다."
          },
          {
            "q": "Private Endpoint 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "남길 것은 잘못 해석된 FQDN, 반환된 IP, endpoint id, policy 또는 zone association 수정 내역입니다. 실패 모드는 endpoint는 정상인데 policy가 principal을 막아 DNS 문제로 오판하는 것입니다. 다음 조치는 DNS check와 endpoint policy check를 runbook에서 분리하고 canary가 private IP 사용 여부를 기록하게 하는 것입니다."
          }
        ]
      },
      {
        "q": "VPC Flow Logs 판독에서는 무엇을 먼저 보나요?",
        "decision": "먼저 결정할 것은 로그가 말하는 경계가 네트워크 drop인지, 허용됐지만 상위 계층에서 실패한 것인지입니다. 첫 메커니즘은 interface id, srcaddr, dstaddr, srcport, dstport, action, log-status입니다. Flow Logs는 payload 원인을 말하지 않으므로 ACCEPT와 REJECT, NODATA/SKIPDATA를 구분해 다음 증거로 넘겨야 합니다.",
        "failure": "Flow Logs의 REJECT만 찾으면 ACCEPT 뒤 애플리케이션 timeout이나 DNS 오해를 놓칩니다. 실패 모드는 log-status가 SKIPDATA인데 트래픽이 없었다고 판단해 실제 피크 시간의 drop 증거를 잃는 것입니다.",
        "evidence": "VPC Flow Logs fields, ENI ownership map, CloudWatch Logs Insights query, packet capture sample, app timestamp correlation",
        "followups": [
          {
            "q": "flow log 판독 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화 전에는 실패 시각의 ENI, 5-tuple, action, log-status를 먼저 봅니다. REJECT가 특정 port에 몰리면 SG/NACL을, ACCEPT인데 timeout이면 route, NAT, 애플리케이션 시간을 이어 봅니다. 다음 조치는 같은 tuple의 반대 방향 로그를 찾아 return path가 있는지 확인하는 것입니다."
          },
          {
            "q": "Flow Logs에서 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 요청과 응답 방향이 모두 ACCEPT이고 app log의 처리 시각과 맞는 상태입니다. 위험은 한 방향만 보이거나 log-status가 NODATA/SKIPDATA라 증거가 불완전한 경우입니다. 증거가 부족하면 짧은 packet capture나 Reachability Analyzer로 보강하고, 로그 보존과 샘플링 설정을 함께 점검합니다."
          },
          {
            "q": "Flow Logs 오판 뒤에는 무엇을 남기나요?",
            "answer": "오판 뒤에는 사용한 query, 빠진 필드, 실제 원인 경계, 보강한 증거를 남깁니다. 실패 모드는 ENI 소유자를 잘못 매핑해 다른 서비스의 트래픽을 원인으로 지목하는 것입니다. 다음 조치는 ENI inventory를 자동 갱신하고 incident template에 5-tuple과 log-status 필드를 필수로 넣는 것입니다."
          }
        ]
      },
      {
        "q": "Reachability Analyzer와 runbook handoff는 어떻게 닫나요?",
        "decision": "먼저 결정할 것은 사람이 추론한 경로를 도구 결과와 runbook으로 재현 가능하게 남길 수 있는지입니다. 첫 메커니즘은 source ENI, destination ENI/IP, protocol, port를 고정한 Reachability Analyzer path입니다. handoff는 pass/fail 결과보다 막힌 component, 관련 rule, 다음 조치 owner가 보여야 완료됩니다.",
        "failure": "Analyzer 결과만 링크로 넘기면 조건이 바뀐 뒤 같은 판단을 재현할 수 없습니다. 실패 모드는 임시 SG rule을 넣은 상태에서 PASS 결과를 저장해 실제 정상 경로가 아니라 우회 경로를 표준 runbook에 남기는 것입니다.",
        "evidence": "Reachability Analyzer path result, source and destination identifiers, blocking component id, related route/SG/NACL diff, runbook handoff note",
        "followups": [
          {
            "q": "Reachability Analyzer 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 Analyzer 실행 입력값부터 봅니다. source, destination, protocol, port가 실제 실패 요청과 다르면 결과를 신뢰하지 않습니다. 다음 조치는 path의 마지막 reachable component와 blocking component를 runbook에 적고, 같은 조건으로 재실행할 링크 또는 명령을 남기는 것입니다."
          },
          {
            "q": "Analyzer 결과에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 Analyzer PASS가 Flow Logs와 실제 synthetic probe 결과와 맞는 경우입니다. 위험은 Analyzer는 PASS인데 DNS가 다른 IP를 주거나, 임시 보안 rule 때문에만 PASS가 된 경우입니다. 증거는 Analyzer path, Flow Logs tuple, 변경 marker이며, 위험이면 runbook에 조건부 정상으로 표시하고 임시 rule 제거 후 재검증합니다."
          },
          {
            "q": "runbook handoff 뒤에는 무엇을 남기나요?",
            "answer": "handoff 뒤에는 재현 명령, 기대 결과, 실패 시 첫 owner, 관련 route/SG/NACL diff를 남깁니다. 실패 모드는 스크린샷만 남겨 권한 없는 담당자가 같은 검사를 실행하지 못하는 것입니다. 다음 조치는 정기 drill에서 runbook 명령을 실제로 실행하고 결과가 바뀌면 evidence packet을 갱신하는 것입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-security-boundary-qa",
    "title": "보안 경계 Q&A",
    "source": "보안 경계",
    "subtitle": "보안 신뢰 경계에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "public ingress exposure는 어디까지 열려 있다고 판단하나요?",
        "decision": "운영 결정은 인터넷에서 들어온 요청이 의도한 edge까지만 열려 있는지, 아니면 내부 전용 origin이나 admin endpoint까지 노출됐는지 가르는 것입니다. 첫 보안 경계는 DNS record, CDN origin policy, load balancer listener, public subnet route가 만나는 ingress 표면입니다. 증거는 외부 synthetic probe, ALB listener rule, WAF sampled request, route table readback을 같은 시각으로 맞춰 봅니다.",
        "failure": "실패 모드는 public endpoint가 임시로 열린 origin port나 내부 health endpoint를 우회 경로로 노출하는 것입니다. 앱 로그가 비어 있다는 이유만으로 내부 장애로 돌리면, 실제로는 edge에서 버려졌거나 차단돼야 할 요청이 origin까지 도달한 노출을 놓칩니다.",
        "evidence": "external synthetic probe, DNS record readback, ALB listener rule, WAF sampled request, route table readback",
        "followups": [
          {
            "q": "public ingress 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "외부에서 같은 host와 path를 호출한 synthetic probe를 먼저 봅니다. WAF request id와 ALB access log가 모두 없으면 DNS, CDN, WAF 중 앞단에서 멈춘 것이고, ALB에는 있는데 app log가 없으면 listener rule이나 target boundary가 의심됩니다. 다음 조치는 실패 sample의 source IP, host header, listener rule id를 incident record에 묶는 것입니다."
          },
          {
            "q": "public ingress 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 허용된 host, path, method만 edge rule을 통과하고 origin security rule이 CDN 또는 load balancer source만 받는 상태입니다. 위험은 internet source가 origin port로 직접 도달하거나 admin path가 같은 listener에서 열리는 경우입니다. 증거는 listener rule diff와 security rule source이며, 위험이면 origin 직접 접근을 먼저 닫고 예외 사용자를 별도 allowlist로 격리합니다."
          },
          {
            "q": "public ingress 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 뒤에는 열린 endpoint 목록, 닫은 rule, 남긴 예외, 외부 재검증 결과를 남깁니다. 실패 모드는 임시 허용 rule이 배포 뒤에도 남아 다음 변경의 기본값처럼 쓰이는 것입니다. 다음 조치는 public exposure check를 배포 전 gate에 넣고, 외부 probe 결과가 닫힌 상태를 보여야 incident를 종료하는 것입니다."
          }
        ]
      },
      {
        "q": "CDN/WAF edge rule 변경은 어떤 기준으로 승인하나요?",
        "decision": "운영 결정은 새 edge rule이 공격 traffic만 줄이고 정상 traffic을 차단하지 않는지, 그리고 즉시 되돌릴 수 있는지를 승인하는 것입니다. 첫 메커니즘은 WAF rule priority, action, scope-down statement, CDN behavior match입니다. 증거는 sampled request, rule match count, canary header 결과, 이전 rule version diff가 함께 있어야 합니다.",
        "failure": "실패 모드는 managed rule을 count 없이 block으로 바로 올려 특정 client, region, API method만 차단하는 것입니다. edge에서 차단된 요청은 origin 로그에 남지 않으므로, origin 무증상을 정상으로 해석하면 변경 피해를 늦게 찾습니다.",
        "evidence": "WAF rule version diff, sampled request, rule match count, canary header probe, CDN behavior diff",
        "followups": [
          {
            "q": "CDN/WAF edge 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단 여부는 rule diff와 sampled request에서 먼저 봅니다. 새 rule이 로그인, 결제, webhook 같은 핵심 path를 block 후보로 잡거나 match count가 baseline보다 급증하면 승인하지 않습니다. 다음 조치는 count mode로 바꾸고 canary header나 test IP로 정상 요청과 공격 sample을 나눠 재검증하는 것입니다."
          },
          {
            "q": "CDN/WAF edge 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 WAF label과 block action이 의도한 signature, rate, geo 조건에만 붙고 canary 정상 요청은 통과하는 상태입니다. 위험은 403 증가가 특정 rule deploy marker와 맞거나, sampled request의 user-agent와 path가 정상 client를 가리키는 경우입니다. 증거는 rule id, label, request id이며 위험이면 rule priority를 낮추거나 count mode로 되돌립니다."
          },
          {
            "q": "CDN/WAF edge 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 이전 rule version, rollback 시각, match count가 회복된 시각, 남은 예외 rule을 남깁니다. 실패 모드는 rule을 되돌렸지만 CDN cache나 edge 전파 지연을 확인하지 않아 일부 POP에서 계속 차단되는 것입니다. 다음 조치는 POP별 probe와 WAF metric alarm을 같이 닫고, 다음 변경의 count-mode 기간을 runbook에 명시하는 것입니다."
          }
        ]
      },
      {
        "q": "Security Group boundary는 어떤 rule을 기준으로 인수하나요?",
        "decision": "운영 결정은 instance, load balancer, database 사이의 허용 관계가 의도한 peer와 port로만 제한됐는지 인수하는 것입니다. 첫 보안 경계는 stateful Security Group rule의 source, destination, protocol, port, attached ENI입니다. 증거는 rule diff, ENI attachment, Reachability Analyzer 결과, Flow Logs accept/reject sample을 함께 봅니다.",
        "failure": "실패 모드는 CIDR로 넓게 연 임시 inbound rule이나 `0.0.0.0/0` outbound rule이 서비스 간 신뢰 경계를 흐리는 것입니다. 이름이 비슷한 group을 보고 인수하면 실제 workload에 붙은 ENI rule과 문서가 갈라집니다.",
        "evidence": "Security Group rule diff, ENI attachment inventory, Reachability Analyzer result, VPC Flow Logs sample",
        "followups": [
          {
            "q": "security group 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 실제 ENI에 붙은 group id와 rule diff부터 봅니다. 문서의 group 이름과 attachment가 다르면 인수 대상이 틀린 것이며, 허용 source가 다른 Security Group인지 CIDR인지도 판단 기준입니다. 다음 조치는 owner, allowed peer, port 목적, 만료일이 없는 임시 rule을 handoff note에 분리하는 것입니다."
          },
          {
            "q": "security group 정상과 위험은 어떻게 가르나요?",
            "answer": "정상은 허용 source가 호출자 workload의 group id로 좁혀지고 port가 서비스 계약과 맞는 상태입니다. 위험은 임시 CIDR, broad outbound, unused attached group, cross-account source가 설명 없이 남는 경우입니다. 증거는 Reachability Analyzer와 Flow Logs tuple이며, 위험이면 rule을 목적별 group으로 쪼개고 TTL 없는 예외를 제거합니다."
          },
          {
            "q": "security group 경계 수정 뒤에는 무엇을 남기나요?",
            "answer": "수정 뒤에는 제거한 rule, 대체한 peer group, 영향받은 ENI, 재검증한 connection sample을 남깁니다. 실패 모드는 rule 삭제 후 health check나 batch job 같은 낮은 빈도 경로가 끊기는 것입니다. 다음 조치는 24시간 Flow Logs reject watch를 걸고 owner가 확인할 rollback rule을 별도로 보관하는 것입니다."
          }
        ]
      },
      {
        "q": "NACL boundary 장애 완화는 어떤 순서로 판단하나요?",
        "decision": "운영 결정은 subnet 단위의 stateless allow/deny가 요청 방향과 응답 방향을 모두 허용하는지 확인하고, 피해를 줄일 임시 완화를 고르는 것입니다. 첫 메커니즘은 NACL rule number, direction, ephemeral port range, subnet association입니다. 증거는 NACL readback, Flow Logs reject tuple, subnet association diff, packet capture sample입니다.",
        "failure": "실패 모드는 inbound만 열고 return path의 ephemeral port를 막아 연결이 무작위 timeout으로 보이는 것입니다. Security Group만 확인하면 NACL의 deny 우선순위와 subnet association 변경을 놓칩니다.",
        "evidence": "NACL rule readback, subnet association diff, VPC Flow Logs reject tuple, packet capture sample",
        "followups": [
          {
            "q": "NACL 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화는 Flow Logs의 REJECT tuple과 NACL rule number부터 봅니다. 실패 tuple이 응답 방향 ephemeral port에 몰리면 앱 복구가 아니라 subnet rule 완화가 먼저입니다. 다음 조치는 영향 subnet에만 좁은 allow rule을 임시로 넣고 rule number와 만료 시각을 change record에 남기는 것입니다."
          },
          {
            "q": "NACL 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 inbound와 outbound rule이 같은 연결의 양방향 traffic을 설명하고, deny rule이 의도한 CIDR에만 적용되는 상태입니다. 위험은 넓은 allow rule을 맨 앞에 두거나 subnet association이 운영 subnet 전체로 번진 경우입니다. 증거는 association diff와 REJECT 감소이며, 다음 조치는 rule number convention과 pre-change analyzer check를 추가하는 것입니다."
          },
          {
            "q": "NACL 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 Security Group에서 허용한 peer와 NACL에서 막은 subnet traffic을 따로 남깁니다. 실패 모드는 두 계층을 한 원인처럼 적어 다음 담당자가 같은 rule을 중복으로 여는 것입니다. 다음 조치는 runbook에 SG는 workload peer, NACL은 subnet guardrail로 나눠 evidence query를 저장하는 것입니다."
          }
        ]
      },
      {
        "q": "IAM role trust policy 장애는 어디서 먼저 가르나요?",
        "decision": "운영 결정은 principal이 role을 assume할 수 없는 원인이 trust policy, identity policy, session condition, external id 중 어디에 있는지 가르는 것입니다. 첫 보안 메커니즘은 trust policy의 principal, condition, sts:AssumeRole event입니다. 증거는 CloudTrail error, policy simulator, Access Analyzer finding, role last used timestamp를 맞춰 봅니다.",
        "failure": "실패 모드는 identity permission만 넓혀 실제 차단 원인인 trust condition mismatch를 그대로 두는 것입니다. 반대로 trust를 `*` principal로 열면 장애는 풀려도 cross-account assume 경계가 무너집니다.",
        "evidence": "CloudTrail AssumeRole event, trust policy diff, IAM policy simulator result, Access Analyzer finding, role last used timestamp",
        "followups": [
          {
            "q": "IAM role 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "CloudTrail의 AssumeRole 실패 event를 먼저 봅니다. `AccessDenied`가 trust policy principal이나 condition mismatch를 가리키면 permission policy 추가로는 해결되지 않습니다. 다음 조치는 요청 principal ARN, external id, source identity, session tag를 trust policy diff와 나란히 두는 것입니다."
          },
          {
            "q": "IAM role 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 허용된 account, workload, session tag만 assume에 성공하고 role last used가 기대 workload와 맞는 상태입니다. 위험은 임시로 넓힌 principal, 누락된 external id, 오래된 session이 계속 성공하는 경우입니다. 증거는 Access Analyzer와 CloudTrail session issuer이며, 위험이면 trust를 좁힌 뒤 실패 client만 별도 역할로 분리합니다."
          },
          {
            "q": "IAM role 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 추가했던 permission, 변경한 trust condition, 실패한 principal sample, 재실행한 simulator 결과를 남깁니다. 실패 모드는 permission boundary와 trust policy를 섞어 설명해 다음 변경에서 같은 우회를 반복하는 것입니다. 다음 조치는 CI에서 trust diff에 Access Analyzer check를 붙이는 것입니다."
          }
        ]
      },
      {
        "q": "least privilege permission diff는 어떤 기준으로 리뷰하나요?",
        "decision": "운영 결정은 권한 diff가 필요한 action, resource, condition만 추가하거나 제거하는지 승인하는 것입니다. 첫 메커니즘은 IAM policy statement의 effect, action wildcard, resource scope, condition key입니다. 증거는 policy diff, IAM Access Analyzer, CloudTrail last accessed, simulator 결과를 같은 use case별로 묶습니다.",
        "failure": "실패 모드는 장애 대응 중 `Action: *` 또는 `Resource: *`를 넣고 제거 owner를 두지 않는 것입니다. 반대로 권한을 줄일 때 실제 배치나 복구 job의 rare action을 보지 않으면 배포 후 야간 작업이 실패합니다.",
        "evidence": "IAM policy diff, Access Analyzer finding, CloudTrail last accessed data, policy simulator matrix, permission boundary diff",
        "followups": [
          {
            "q": "least privilege 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 policy diff에서 wildcard action, broad resource, 빠진 condition key를 먼저 봅니다. simulator가 성공해도 resource tag 조건이나 permission boundary가 빠지면 승인하지 않습니다. 다음 조치는 업무 시나리오별 CloudTrail last accessed evidence를 붙이고 불필요 action을 제거하는 것입니다."
          },
          {
            "q": "least privilege 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 필요한 API call만 성공하고 거부된 call이 기능 요구 밖이라는 점이 simulator와 CloudTrail에서 모두 확인되는 상태입니다. 위험은 기능 실패를 피하려고 delete, pass role, decrypt 같은 고위험 action을 묶어서 여는 경우입니다. 증거는 denied event와 use case matrix이며, 위험이면 임시 정책에 만료 시각과 회수 owner를 붙입니다."
          },
          {
            "q": "least privilege 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 이전 policy version, 실패한 action, 복구에 쓴 임시 statement, 제거 예정 시각을 남깁니다. 실패 모드는 rollback policy가 더 넓은 권한을 계속 유지하는 것입니다. 다음 조치는 policy version pruning과 Access Analyzer 재실행 결과를 change ticket에 붙이는 것입니다."
          }
        ]
      },
      {
        "q": "secret rotation cutover는 언제 완료로 판단하나요?",
        "decision": "운영 결정은 새 secret이 모든 consumer에서 사용되고 이전 secret이 더 이상 인증에 성공하지 않는 시점을 cutover 완료로 보는 것입니다. 첫 메커니즘은 secret version stage, consumer deploy marker, auth success/failure log입니다. 증거는 secret last rotated, version label, client error rate, old credential use detector가 함께 있어야 합니다.",
        "failure": "실패 모드는 dual-read 기간에 이전 secret이 계속 성공해 침해 반경이 줄지 않는 것입니다. 저장소 값만 교체하고 consumer restart, cache TTL, connection pool 재연결을 확인하지 않으면 일부 workload가 오래된 값을 씁니다.",
        "evidence": "secret version stage, last rotated timestamp, consumer deploy marker, auth log by credential version, old credential use alert",
        "followups": [
          {
            "q": "secret rotation 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 secret version stage와 consumer별 deploy marker부터 봅니다. 새 version이 current여도 client auth log가 이전 credential을 계속 보이면 cutover가 끝난 것이 아닙니다. 다음 조치는 consumer 목록, cache TTL, restart 여부, 이전 credential 차단 예정 시각을 handoff note에 남기는 것입니다."
          },
          {
            "q": "secret rotation 정상과 위험은 어떻게 가르나요?",
            "answer": "정상은 모든 consumer가 새 version으로 인증에 성공하고 이전 credential 시도가 실패하거나 경고로 잡히는 상태입니다. 위험은 특정 worker, cron, region이 이전 값을 계속 쓰거나 rollback을 위해 남긴 secret이 권한을 유지하는 경우입니다. 증거는 auth log의 credential version과 error rate이며, 위험이면 이전 credential 권한을 단계적으로 제거하고 실패 consumer만 격리합니다."
          },
          {
            "q": "secret rotation cutover 뒤에는 무엇을 남기나요?",
            "answer": "cutover 뒤에는 rotation 시각, 이전 credential 폐기 시각, 실패 consumer, 재시도 결과, 남은 예외를 남깁니다. 실패 모드는 rollback 편의를 위해 이전 secret을 보관하면서 접근 권한도 유지하는 것입니다. 다음 조치는 old credential detector를 일정 기간 유지하고 다음 rotation runbook에 consumer cache 확인을 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "privileged admin access는 어떻게 허용하고 회수하나요?",
        "decision": "운영 결정은 privileged access가 승인된 incident, 제한된 시간, 필요한 action, 추적 가능한 session 안에서만 열렸는지 판단하는 것입니다. 첫 보안 메커니즘은 break-glass role, MFA condition, just-in-time approval, session recording입니다. 증거는 approval ticket, CloudTrail session issuer, session recording link, revoke event를 함께 봅니다.",
        "failure": "실패 모드는 장애 완화 후 admin session이나 임시 role assignment가 남아 상시 권한처럼 쓰이는 것입니다. ticket과 session이 연결되지 않으면 누가 어떤 리소스에 어떤 명령을 실행했는지 사후 검증할 수 없습니다.",
        "evidence": "approval ticket, break-glass role assignment, MFA condition, CloudTrail session issuer, session recording, revoke event",
        "followups": [
          {
            "q": "admin access 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화에서는 approval ticket과 CloudTrail session issuer가 같은 사람과 같은 incident를 가리키는지 먼저 봅니다. ticket이 없거나 MFA condition이 빠지면 권한을 열지 않습니다. 다음 조치는 break-glass role에 TTL을 붙이고 session recording이 켜진 경로로만 작업하게 하는 것입니다."
          },
          {
            "q": "admin access 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 작업 시간, role, command scope가 ticket과 맞고 revoke event가 TTL 안에 남은 상태입니다. 위험은 shared admin 계정, 장시간 session, ticket 없는 privilege escalation, recording 누락입니다. 증거는 session log와 revoke audit이며, 위험이면 session을 끊고 affected resource를 read-only로 낮춘 뒤 재승인합니다."
          },
          {
            "q": "admin access 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 일반 운영 role, elevated role, break-glass role의 차이와 각 회수 증거를 남깁니다. 실패 모드는 일반 role에 incident-only action이 남아 다음 장애 없이도 실행 가능한 상태가 되는 것입니다. 다음 조치는 permission diff를 리뷰하고 admin action alert를 ticket id 기준으로 묶는 것입니다."
          }
        ]
      },
      {
        "q": "egress control과 data exfil path는 어디서 차단하나요?",
        "decision": "운영 결정은 workload가 승인된 destination으로만 나가고, 민감 데이터가 비인가 외부 경로로 빠질 수 없는지 판단하는 것입니다. 첫 경계는 egress proxy, firewall allowlist, NAT route, DNS resolution, object storage endpoint policy가 만나는 outbound path입니다. 증거는 egress allowlist diff, DNS query log, NAT/Firewall log, DLP finding, endpoint policy readback입니다.",
        "failure": "실패 모드는 장애 회피를 위해 broad outbound를 열어 외부 API 호출은 복구되지만 data exfil path도 같이 열리는 것입니다. IP allowlist만 보고 DNS CNAME 변경이나 SaaS endpoint 확장을 놓치면 실제 destination을 확인하지 못합니다.",
        "evidence": "egress allowlist diff, DNS query log, NAT gateway log, firewall decision log, DLP finding, endpoint policy readback",
        "followups": [
          {
            "q": "egress control 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "초기 분기는 firewall decision log와 DNS query log를 먼저 봅니다. DNS는 허용 domain인데 resolved IP가 새 ASN이나 비승인 region으로 바뀌면 allowlist 정상으로 볼 수 없습니다. 다음 조치는 destination host, resolved IP, policy rule id, data classification을 한 줄로 묶는 것입니다."
          },
          {
            "q": "egress control 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 업무 destination, protocol, port, data class가 승인 목록과 맞고 denied log가 예상되지 않은 partner만 가리키는 상태입니다. 위험은 NAT route 우회, direct internet egress, object storage public endpoint 사용, DLP finding 증가입니다. 증거는 firewall log와 endpoint policy이며, 위험이면 route를 egress proxy로 강제하고 sensitive bucket policy를 먼저 잠급니다."
          },
          {
            "q": "egress control 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 열었던 destination, 실제 필요한 endpoint, 차단한 우회 route, DLP 재검사 결과를 남깁니다. 실패 모드는 임시 outbound rule을 제거했지만 DNS cache나 long-lived connection이 계속 외부로 나가는 것입니다. 다음 조치는 connection drain 확인과 allowlist expiry alert를 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "audit coverage와 log integrity는 무엇으로 보증하나요?",
        "decision": "운영 결정은 보안 경계 변경과 privileged action이 빠짐없이 수집되고, 로그가 변경 불가능한 저장소에 도착했는지 판단하는 것입니다. 첫 메커니즘은 CloudTrail 또는 audit stream의 source coverage, delivery status, integrity validation, retention lock입니다. 증거는 trail status, event selector, log file validation, storage object lock, SIEM ingestion lag입니다.",
        "failure": "실패 모드는 로그 수집이 꺼진 region이나 management event 누락 때문에 침해 조사를 시작해도 결정적 event가 없는 것입니다. SIEM dashboard가 초록색이어도 원본 trail delivery와 integrity validation이 깨져 있으면 감사 증거로 부족합니다.",
        "evidence": "CloudTrail trail status, event selector diff, log file validation result, object lock policy, SIEM ingestion lag, alert delivery sample",
        "followups": [
          {
            "q": "audit coverage 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 event selector와 trail delivery status에서 먼저 봅니다. 새 계정, region, data event가 audit scope에 없거나 delivery failure가 있으면 보안 변경을 승인하지 않습니다. 다음 조치는 sample admin action을 실행해 원본 로그와 SIEM event가 같은 request id로 도착하는지 확인하는 것입니다."
          },
          {
            "q": "audit coverage 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 management event, data event, network decision log가 정해진 지연 안에 원본 저장소와 SIEM 모두에 도착하는 상태입니다. 위험은 특정 region 누락, validation 실패, object lock 미적용, ingestion lag 증가입니다. 증거는 validation digest와 ingestion metric이며, 위험이면 변경 window를 멈추고 원본 trail 복구를 먼저 처리합니다."
          },
          {
            "q": "audit coverage 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 빠진 event selector, 복구한 trail, 재수집한 sample event, 남은 blind spot을 남깁니다. 실패 모드는 dashboard만 복구하고 immutable storage의 누락 기간을 보강하지 않는 것입니다. 다음 조치는 누락 기간의 compensating evidence와 retention lock readback을 감사 packet에 붙이는 것입니다."
          }
        ]
      },
      {
        "q": "threat model boundary는 어떤 변화가 생기면 다시 그리나요?",
        "decision": "운영 결정은 새 data flow, trust relationship, identity provider, third-party integration이 기존 threat model의 경계를 바꾸는지 판단하는 것입니다. 첫 메커니즘은 data classification, trust boundary diagram, entry point inventory, abuse case입니다. 증거는 architecture diff, data flow diagram, risk register, control mapping, test evidence로 맞춥니다.",
        "failure": "실패 모드는 기능 변경은 작아 보여도 새로운 external principal이나 outbound data path가 생겨 기존 control이 적용되지 않는 것입니다. 다이어그램만 최신화하고 detection, response owner, compensating control을 갱신하지 않으면 threat model이 운영 판단에 쓰이지 않습니다.",
        "evidence": "architecture diff, data flow diagram, entry point inventory, risk register, control mapping, abuse-case test result",
        "followups": [
          {
            "q": "threat model 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 data flow diagram과 entry point inventory부터 봅니다. 새 flow가 민감 데이터, 외부 principal, admin action 중 하나를 건드리면 threat boundary가 바뀐 것입니다. 다음 조치는 해당 flow의 control, detection, response owner를 risk register에 연결하는 것입니다."
          },
          {
            "q": "threat model 정상과 위험은 어떻게 가르나요?",
            "answer": "정상은 새 boundary에 prevention, detection, response control이 모두 매핑되고 abuse-case test가 실행된 상태입니다. 위험은 diagram에는 경계가 있는데 log source, alert owner, containment action이 없는 경우입니다. 증거는 control mapping과 test result이며, 위험이면 release gate에 missing control을 blocker로 올립니다."
          },
          {
            "q": "threat model boundary 수정 뒤에는 무엇을 남기나요?",
            "answer": "수정 뒤에는 바뀐 trust boundary, 새 abuse case, 추가 control, 남은 residual risk를 남깁니다. 실패 모드는 residual risk를 owner 없이 accept해 다음 incident 때 책임 경로가 비는 것입니다. 다음 조치는 quarterly review와 incident drill에서 같은 boundary를 재검증하도록 calendar와 ticket을 연결하는 것입니다."
          }
        ]
      },
      {
        "q": "incident containment와 isolation은 무엇부터 끊나요?",
        "decision": "운영 결정은 침해 또는 오남용이 의심될 때 사용자 피해와 증거 보존을 해치지 않는 선에서 어느 경계를 먼저 격리할지 정하는 것입니다. 첫 메커니즘은 compromised identity disable, network quarantine, secret revoke, workload isolation, forensic snapshot입니다. 증거는 IOC timeline, CloudTrail event, network flow, affected asset inventory, snapshot hash가 함께 있어야 합니다.",
        "failure": "실패 모드는 원인 확정 전 모든 것을 끄면서 증거를 잃거나, 반대로 서비스 영향이 두려워 compromised credential과 egress path를 열어 두는 것입니다. containment와 eradication을 섞으면 공격 경로가 남은 채 복구 선언이 나갑니다.",
        "evidence": "IOC timeline, CloudTrail event, identity revoke log, quarantine security rule, network flow sample, forensic snapshot hash",
        "followups": [
          {
            "q": "incident containment 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화는 IOC timeline과 active credential 사용 여부부터 봅니다. 같은 identity가 계속 API call을 만들거나 같은 host가 외부로 연결 중이면 원인 분석보다 revoke와 quarantine이 먼저입니다. 다음 조치는 identity disable, egress block, snapshot 생성 순서를 incident commander가 승인한 타임라인에 남기는 것입니다."
          },
          {
            "q": "incident containment 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 compromised identity가 비활성화되고 affected host의 network path가 quarantine rule로 제한되며 forensic snapshot이 보존된 상태입니다. 위험은 revoke 이후에도 session token, long-lived connection, secondary credential이 activity를 만드는 경우입니다. 증거는 CloudTrail과 network flow이며, 위험이면 token invalidation과 secret rotation을 containment 범위에 추가합니다."
          },
          {
            "q": "incident containment 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 identity, network, workload, data store별 containment action과 rollback 조건을 남깁니다. 실패 모드는 network만 격리하고 identity와 secret을 회수하지 않아 다른 host에서 같은 권한이 재사용되는 것입니다. 다음 조치는 isolation 종료 전에 revoke log, quarantine diff, clean credential deploy evidence를 checklist로 확인하는 것입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-dns-tls-qa",
    "title": "DNS·TLS·도메인 운영 Q&A",
    "source": "DNS·TLS·도메인 운영",
    "subtitle": "이름 해석과 인증서 체인에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "authoritative A/AAAA/CNAME answer는 무엇으로 먼저 확정하나요?",
        "decision": "운영 결정은 권한 DNS가 의도한 A, AAAA, CNAME 값을 내고 있는지와 사용자가 받은 값이 그 권한 응답에서 온 것인지 분리하는 것입니다. 첫 경계는 registrar delegation, authoritative nameserver, zone record set입니다. 장애 조사에서는 권한 응답이 틀린지, 위임이 틀린지, 재귀 resolver가 오래된 값을 들고 있는지부터 가릅니다.",
        "failure": "실패 모드는 zone에는 새 주소가 있지만 delegation이 이전 nameserver를 가리키거나, AAAA만 잘못 남아 IPv6 사용자만 실패하는 경우입니다. 애플리케이션 로그가 비었다고 backend로 넘기면 권한 DNS 변경 오류가 계속 사용자 요청을 다른 endpoint로 보냅니다.",
        "evidence": "registrar nameserver readback, authoritative dig result, DNS zone change log, A/AAAA/CNAME diff, external synthetic lookup",
        "followups": [
          {
            "q": "A/AAAA/CNAME 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "먼저 권한 nameserver에 직접 질의한 A, AAAA, CNAME 값과 registrar의 nameserver 위임을 맞춥니다. 권한 응답이 의도와 다르면 zone rollback이나 record 수정이 첫 조치이고, 권한 응답은 맞지만 외부 probe만 다르면 resolver cache나 위임 전파를 따로 봅니다. 증거는 `dig @ns`, `dig +trace`, zone change id입니다."
          },
          {
            "q": "A/AAAA/CNAME 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 여러 지역의 external lookup이 같은 권한 응답을 받고, 해당 IP로 TCP/TLS 연결이 이어지며 load balancer 로그가 생기는 상태입니다. 위험은 AAAA만 이전 주소를 주거나 CNAME 끝점이 삭제된 target을 가리키는 경우입니다. 다음 조치는 IPv4/IPv6별 synthetic probe와 record별 종료 조건을 incident에 남기는 것입니다."
          },
          {
            "q": "A/AAAA/CNAME 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 잘못 본 resolver, 실제 권한 응답, 영향 받은 record type, 수정한 zone version을 남깁니다. 실패 모드가 IPv6 전용이었으면 AAAA probe를 상시 점검에 추가합니다. 다음 변경에서는 delegation readback과 권한 질의를 배포 전 승인 조건으로 묶습니다."
          }
        ]
      },
      {
        "q": "ALIAS와 CNAME flattening 변경은 무엇을 검증한 뒤 승인하나요?",
        "decision": "운영 결정은 apex 또는 alias record가 실제 target의 현재 주소를 안정적으로 flattening하고, target 변경이 DNS 제공자의 합성 응답에 반영되는지 확인하는 것입니다. 첫 메커니즘은 ALIAS/ANAME provider resolution, CNAME target health, apex record synthesis입니다. 승인 기준은 target 소유권, TTL, dual-stack 응답, rollback target이 함께 확인되는 것입니다.",
        "failure": "실패 모드는 CNAME target이 cloud endpoint 교체 후 사라졌는데 ALIAS가 이전 IP를 계속 합성하거나, apex flattening이 AAAA를 누락해 특정 네트워크만 실패하는 경우입니다. 단순히 콘솔 record 이름만 보면 실제 반환 주소와 target 상태를 놓칩니다.",
        "evidence": "DNS provider ALIAS configuration, flattened A/AAAA lookup, target CNAME lookup, endpoint health check, change ticket",
        "followups": [
          {
            "q": "ALIAS record 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 ALIAS 설정과 target CNAME의 현재 lookup 결과가 다를 때 걸어야 합니다. 판단 기준은 apex에서 합성된 A/AAAA가 target endpoint health와 같은 집합을 가리키는지입니다. 증거가 맞지 않으면 변경을 보류하고 target owner, rollback record, provider flattening 주기를 확인합니다."
          },
          {
            "q": "ALIAS record 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 apex 조회와 target CNAME 조회가 같은 서비스 IP 대역으로 모이고, endpoint health check가 통과하며 TLS 인증서가 apex host를 포함하는 상태입니다. 위험은 ALIAS가 정상처럼 보이지만 target CNAME이 삭제 예정이거나 provider가 한 주소 family만 합성하는 경우입니다. 다음 조치는 target lifecycle 알림과 apex 전용 synthetic probe를 추가하는 것입니다."
          },
          {
            "q": "ALIAS record 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 이전 target, 새 target, provider가 합성한 주소, 되돌림 시각을 남깁니다. 실패 모드가 flattening 지연이면 TTL 만료 전 이전 endpoint를 끄지 않는 것이 다음 조치입니다. 증거는 변경 전후 apex lookup과 target health check 결과로 닫습니다."
          }
        ]
      },
      {
        "q": "TTL과 cache propagation은 변경 전에 어떻게 계산하나요?",
        "decision": "운영 결정은 record 변경 시점, 기존 TTL, resolver cache 잔존 시간, 이전 endpoint 유지 시간을 한 계획으로 묶는 것입니다. 첫 메커니즘은 authoritative TTL과 recursive resolver의 remaining TTL 차이입니다. 변경 리뷰는 낮춘 TTL이 실제로 배포됐는지와 이전 값이 사라지는 최종 시각을 기준으로 승인합니다.",
        "failure": "실패 모드는 TTL을 낮췄다고 생각했지만 resolver들이 이전 긴 TTL을 이미 들고 있어 사용자 일부가 오래된 endpoint로 계속 가는 경우입니다. 이전 endpoint를 너무 빨리 종료하면 DNS는 정상 변경됐어도 cache 사용자만 장애를 겪습니다.",
        "evidence": "authoritative TTL readback, resolver-specific remaining TTL sample, DNS change timeline, old endpoint access log, propagation probe dashboard",
        "followups": [
          {
            "q": "TTL 조정 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 권한 TTL readback과 주요 resolver의 remaining TTL sample입니다. 판단 기준은 이전 endpoint를 언제까지 유지해야 cache 사용자를 보호할 수 있는지입니다. 다음 담당자에게는 TTL 변경 시각, 실제 record 변경 시각, 이전 endpoint 종료 가능 시각을 함께 넘깁니다."
          },
          {
            "q": "TTL 조정 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 권한 TTL과 여러 public resolver의 remaining TTL이 계획한 창 안에서 줄고, 이전 endpoint access log가 예상대로 감소하는 상태입니다. 위험은 특정 ISP resolver가 긴 TTL을 유지하거나 NXDOMAIN cache가 남는 경우입니다. 이때는 이전 endpoint 유지, dual serving, 사용자 공지 범위를 결정합니다."
          },
          {
            "q": "TTL 조정 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 낮춘 TTL이 적용된 시각과 실제 사용자 cache가 사라진 시각의 차이를 기록합니다. 실패 모드가 NXDOMAIN cache였으면 record 삭제 금지 창을 runbook에 추가합니다. 증거는 resolver별 TTL sample과 이전 endpoint hit count 변화입니다."
          }
        ]
      },
      {
        "q": "recursive resolver cache 장애는 권한 DNS와 어떻게 분리하나요?",
        "decision": "운영 결정은 권한 DNS가 맞는 상태에서 어떤 recursive resolver가 stale answer, SERVFAIL, NXDOMAIN cache를 주는지 가르는 것입니다. 첫 경계는 client stub resolver, corporate resolver, public recursive resolver, authoritative server입니다. 완화는 권한 record 수정이 아니라 영향 resolver 우회, cache 만료 대기, 이전 endpoint 유지로 선택합니다.",
        "failure": "실패 모드는 권한 응답은 정상인데 특정 public resolver가 이전 CNAME이나 negative cache를 들고 있어 일부 사용자만 실패하는 경우입니다. 권한 zone을 반복 수정하면 cache 만료 시간이 다시 늘거나 문제 범위가 커집니다.",
        "evidence": "resolver-by-resolver dig sample, DNS query log, SERVFAIL/NXDOMAIN rate, client network sample, old endpoint hit log",
        "followups": [
          {
            "q": "resolver cache 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화는 권한 응답과 resolver별 응답 diff를 먼저 봅니다. 특정 resolver만 이전 주소를 주면 권한 DNS를 다시 바꾸지 않고 이전 endpoint 유지나 resolver 우회 안내를 선택합니다. 증거는 resolver IP, answer, remaining TTL, 사용자 네트워크 샘플입니다."
          },
          {
            "q": "resolver cache 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 영향 resolver의 answer와 TTL이 권한 응답을 따라오고, 이전 endpoint hit가 사라지는 상태입니다. 위험은 SERVFAIL이나 NXDOMAIN cache가 특정 network에만 남아 사용자 재시도에도 같은 실패가 반복되는 경우입니다. 다음 조치는 resolver vendor ticket, negative TTL 확인, 이전 endpoint 유지 시간 연장입니다."
          },
          {
            "q": "resolver cache 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 권한 응답 정상 시각, 각 resolver가 회복한 시각, 영향 네트워크, 남은 cache TTL을 남깁니다. 실패 모드가 corporate resolver pinning이면 고객 네트워크 담당자에게 전달할 evidence packet을 따로 만듭니다. 후속 조치는 pre-change resolver sampling을 배포 checklist에 넣는 것입니다."
          }
        ]
      },
      {
        "q": "split-horizon과 private DNS는 어느 view를 먼저 확인하나요?",
        "decision": "운영 결정은 같은 이름이 public view와 private view에서 각각 어떤 주소로 해석되어야 하는지 확정하는 것입니다. 첫 메커니즘은 DNS view selection, resolver rule, source VPC 또는 network location입니다. 장애 판단은 사용자가 내부 주소를 받아야 하는지, 외부 주소를 받아야 하는지, 그리고 그 주소로 route가 이어지는지를 함께 봅니다.",
        "failure": "실패 모드는 내부 workload가 public IP를 받아 NAT 경로로 나가거나 외부 사용자가 private IP를 받아 연결할 수 없는 경우입니다. 이름만 같다고 같은 서비스로 보면 TLS 인증서, route, firewall 증거가 엇갈립니다.",
        "evidence": "public resolver lookup, private resolver lookup, resolver rule config, source network sample, route or Flow Log sample",
        "followups": [
          {
            "q": "split-horizon DNS 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "초기 분기는 같은 FQDN을 public resolver와 private resolver에서 각각 조회해 기대 view와 비교합니다. 판단 기준은 source network가 어떤 view를 선택해야 하는지입니다. 내부에서 public IP가 나오거나 외부에서 private IP가 나오면 resolver rule과 zone association을 먼저 수정합니다."
          },
          {
            "q": "split-horizon DNS 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 내부 caller가 private IP로 연결하고 외부 caller가 public edge로 연결하며 두 경로의 TLS host 검증이 모두 통과하는 상태입니다. 위험은 DNS answer는 맞지만 route나 firewall이 해당 주소를 막아 timeout이 나는 경우입니다. 증거는 lookup 결과, Flow Logs, TLS handshake sample입니다."
          },
          {
            "q": "split-horizon DNS 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 잘못 선택된 view, source network, resolver rule id, 수정한 zone record를 남깁니다. 실패 모드가 내부 경로의 public 우회였으면 NAT/egress 비용과 보안 영향도 같이 기록합니다. 다음 조치는 내부와 외부 synthetic lookup을 별도 알림으로 분리하는 것입니다."
          }
        ]
      },
      {
        "q": "private DNS zone association 변경은 어떤 범위부터 잠그나요?",
        "decision": "운영 결정은 private hosted zone이 어느 VPC, account, region, resolver rule에 연결되어야 하는지와 연결되면 어떤 이름을 덮어쓰는지 확인하는 것입니다. 첫 경계는 zone association과 resolver inbound/outbound rule입니다. 변경 승인은 영향을 받는 VPC 목록, 충돌하는 public name, 해제 절차가 있어야 가능합니다.",
        "failure": "실패 모드는 shared zone을 새 VPC에 연결하면서 기존 public endpoint 이름을 private IP로 덮어써 외부 API 호출이 내부로 꺾이는 경우입니다. association 누락이면 일부 VPC만 NXDOMAIN을 받고, 과도한 association이면 관련 없는 workload가 잘못된 private answer를 받습니다.",
        "evidence": "private hosted zone association list, resolver rule table, VPC/account inventory, conflicting public lookup, resolver query log",
        "followups": [
          {
            "q": "Private DNS zone 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 association 대상 VPC 목록과 실제 resolver query log가 맞지 않을 때 걸어야 합니다. 판단 기준은 변경되는 이름이 public name을 덮어쓰는지와 각 VPC가 그 private answer를 사용할 권한이 있는지입니다. 불확실하면 canary VPC 한 곳에 먼저 연결하고 lookup과 route를 확인합니다."
          },
          {
            "q": "Private DNS zone 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 association된 VPC에서만 private answer가 나오고, 미연결 VPC와 인터넷에서는 기존 public answer가 유지되는 상태입니다. 위험은 association이 계정 공유로 확대되어 unrelated VPC가 private IP를 받거나, resolver rule 우선순위가 의도와 다른 경우입니다. 증거가 보이면 association diff와 rule priority를 rollback 후보로 둡니다."
          },
          {
            "q": "Private DNS zone 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 제거한 association, 유지한 association, 남은 resolver cache, 영향 받은 VPC를 남깁니다. 실패 모드가 public name shadowing이면 같은 이름을 쓰는 서비스 목록을 inventory에 추가합니다. 다음 조치는 zone association 변경에 owner approval과 canary lookup을 필수로 넣는 것입니다."
          }
        ]
      },
      {
        "q": "CAA record와 issuer authorization은 발급 전에 무엇을 확인하나요?",
        "decision": "운영 결정은 도메인의 CAA 정책이 실제 인증서 발급자와 계정 URI를 허용하는지 확인하는 것입니다. 첫 메커니즘은 DNS CAA lookup, issuer authorization, wildcard와 하위 도메인 상속 규칙입니다. 발급 실패를 인증서 서비스 장애로 보기 전에 권한 DNS의 CAA 응답과 CA error를 맞춥니다.",
        "failure": "실패 모드는 apex CAA가 특정 CA만 허용해 신규 CA 발급이 막히거나, 하위 도메인에 별도 CAA가 있어 wildcard 인증서 갱신만 실패하는 경우입니다. CAA 변경 없이 재시도하면 rate limit과 발급 지연만 늘어납니다.",
        "evidence": "authoritative CAA lookup, CA issuance error, certificate order log, CT log entry, zone change ticket",
        "followups": [
          {
            "q": "CAA record 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 권한 DNS에서 조회한 CAA 값과 실제 certificate order의 issuer입니다. 판단 기준은 `issue`, `issuewild`, account binding이 발급 요청과 일치하는지입니다. 다음 담당자에게는 CA error, CAA change id, 재시도 가능 시각을 같이 넘깁니다."
          },
          {
            "q": "CAA record 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 권한 CAA 응답이 승인된 issuer를 허용하고 certificate order가 검증 단계를 통과하며 CT log에 기대 SAN이 기록되는 상태입니다. 위험은 apex는 허용하지만 하위 도메인 CAA가 다르거나 wildcard 발급만 막히는 경우입니다. 이때는 발급 범위를 쪼개고 CAA 상속 경로를 문서화합니다."
          },
          {
            "q": "CAA record 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 어떤 FQDN에서 어떤 CAA policy가 발급을 막았는지와 수정한 record를 남깁니다. 실패 모드가 하위 도메인 상속 착오였으면 CAA lookup 명령을 SAN별로 실행하도록 runbook을 바꿉니다. 증거는 CA order log와 권한 CAA 조회 결과입니다."
          }
        ]
      },
      {
        "q": "certificate SAN coverage는 배포 전에 어떻게 증명하나요?",
        "decision": "운영 결정은 사용자가 접속하는 모든 FQDN이 배포된 인증서의 SAN 또는 wildcard 범위에 포함되는지 확인하는 것입니다. 첫 TLS 경계는 client SNI, presented certificate, SAN matching입니다. 배포 승인은 DNS alias, Host header, certificate SAN 목록이 같은 host set을 가리킬 때만 가능합니다.",
        "failure": "실패 모드는 새 vanity domain이나 apex alias가 DNS에는 추가됐지만 인증서 SAN에는 없어 브라우저가 name mismatch를 내는 경우입니다. wildcard가 한 label만 덮는다는 규칙을 놓치면 깊은 하위 도메인만 실패합니다.",
        "evidence": "certificate SAN list, openssl s_client SNI output, CT log entry, domain inventory, load balancer certificate map",
        "followups": [
          {
            "q": "certificate SAN 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화는 실패 host로 SNI를 지정한 `openssl s_client` 출력과 load balancer certificate map을 먼저 봅니다. SAN에 host가 없으면 app 재시작이 아니라 올바른 인증서 연결이나 이전 host rollback이 조치입니다. 증거는 presented certificate serial, SAN 목록, listener rule입니다."
          },
          {
            "q": "certificate SAN 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 domain inventory의 모든 active host가 인증서 SAN에 포함되고, SNI별 handshake가 같은 certificate map 정책을 통과하는 상태입니다. 위험은 DNS에는 새 host가 있지만 inventory나 certificate order에는 없는 경우입니다. 다음 조치는 domain 추가 workflow에 SAN diff와 CT log 확인을 넣는 것입니다."
          },
          {
            "q": "certificate SAN 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 DNS host, SNI host, Host header, 인증서 SAN이 어디서 갈라졌는지를 남깁니다. 실패 모드가 wildcard 범위 오해였으면 예외 host를 명시 SAN으로 발급합니다. 후속 조치는 active domain inventory와 certificate order를 같은 승인 티켓에서 관리하는 것입니다."
          }
        ]
      },
      {
        "q": "SNI와 Host routing이 엇갈릴 때 어느 값을 기준으로 보나요?",
        "decision": "운영 결정은 TLS handshake의 SNI와 HTTP Host header가 같은 virtual host 정책으로 라우팅되는지 확인하는 것입니다. 첫 경계는 TLS certificate selection, listener SNI rule, HTTP host-based routing입니다. 장애 판단은 인증서는 맞는데 backend가 틀린지, 또는 인증서 선택부터 틀린지 분리해야 합니다.",
        "failure": "실패 모드는 client가 SNI 없이 접속해 default certificate를 받거나, TLS SNI는 `api.example.com`인데 HTTP Host가 다른 값이라 잘못된 backend로 가는 경우입니다. Host header만 보고 app route를 고치면 TLS 단계의 name mismatch를 해결하지 못합니다.",
        "evidence": "openssl s_client with servername, load balancer listener rule, HTTP access log host field, TLS handshake log, backend route log",
        "followups": [
          {
            "q": "SNI 초기 분기에서는 어떤 증거부터 보나요?",
            "answer": "초기 분기는 같은 IP에 SNI를 넣은 handshake와 SNI 없는 handshake를 비교하는 것입니다. 판단 기준은 presented certificate와 listener rule이 기대 host를 선택하는지입니다. 증거가 다르면 default certificate, SNI rule priority, client library SNI 설정을 먼저 확인합니다."
          },
          {
            "q": "SNI 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 SNI, certificate SAN, HTTP Host, backend route가 같은 service를 가리키는 상태입니다. 위험은 TLS는 통과하지만 Host header rewrite나 proxy 설정 때문에 다른 tenant backend로 전달되는 경우입니다. 다음 조치는 access log의 host field와 listener rule id를 incident sample에 붙이는 것입니다."
          },
          {
            "q": "SNI 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 TLS에서 선택된 certificate, HTTP Host, 최종 backend, 수정한 listener rule을 남깁니다. 실패 모드가 client SNI 누락이면 해당 SDK 또는 proxy 버전도 기록합니다. 재발 방지는 default certificate alert와 host routing canary로 닫습니다."
          }
        ]
      },
      {
        "q": "intermediate chain과 OCSP 문제는 어떤 client 기준으로 검증하나요?",
        "decision": "운영 결정은 서버가 leaf부터 intermediate까지 완전한 chain을 제공하고, 주요 client가 revocation 확인을 통과하는지 판단하는 것입니다. 첫 TLS 메커니즘은 certificate chain building, AIA fetching, OCSP stapling입니다. 변경 리뷰는 최신 브라우저뿐 아니라 mobile, Java, legacy trust store 샘플을 포함해야 합니다.",
        "failure": "실패 모드는 서버가 intermediate certificate를 빠뜨려 일부 client만 chain을 만들지 못하거나, OCSP responder 장애로 strict client가 handshake를 지연시키는 경우입니다. 브라우저 한 종류만 통과하면 운영 정상으로 볼 수 없습니다.",
        "evidence": "openssl s_client -showcerts output, SSL Labs or scanner report, OCSP stapling status, client error sample, certificate chain bundle",
        "followups": [
          {
            "q": "intermediate chain 승인 차단에서는 어떤 증거부터 보나요?",
            "answer": "승인 차단은 `openssl s_client -showcerts`에 intermediate가 빠지거나 chain order가 틀릴 때 걸어야 합니다. 판단 기준은 scanner와 대표 client가 같은 issuer path를 구성하는지입니다. 증거가 불완전하면 chain bundle을 교체하고 Java/mobile client 샘플을 다시 실행합니다."
          },
          {
            "q": "intermediate chain 증상 연결에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 chain scanner, browser, Java client가 모두 같은 trust path로 통과하고 OCSP stapling이 fresh 상태인 경우입니다. 위험은 AIA fetching에 의존해 사내망이나 mobile network에서만 실패하는 경우입니다. 다음 조치는 full chain 배포와 OCSP responder 모니터링입니다."
          },
          {
            "q": "intermediate chain 되돌림 선택 뒤에는 무엇을 남기나요?",
            "answer": "되돌림 뒤에는 배포한 chain bundle version, 실패한 client family, OCSP 상태, 이전 bundle 복원 시각을 남깁니다. 실패 모드가 OCSP 지연이면 revocation endpoint latency와 stapling 갱신 주기를 따로 추적합니다. 후속 조치는 certificate rollout checklist에 full-chain 검증을 추가하는 것입니다."
          }
        ]
      },
      {
        "q": "certificate expiry alerting은 어떤 소유권으로 닫나요?",
        "decision": "운영 결정은 모든 active domain과 listener certificate에 대해 만료 전 충분한 lead time, 갱신 owner, 자동 갱신 실패 알림을 갖추는 것입니다. 첫 메커니즘은 certificate inventory, expiry timestamp, renewal job, deployment target mapping입니다. 인수 기준은 경고가 울렸을 때 누가 어떤 인증서를 어디에 배포할지 재현 가능한 상태입니다.",
        "failure": "실패 모드는 인증서는 갱신됐지만 load balancer나 CDN에 새 certificate가 연결되지 않아 만료 인증서가 계속 제공되는 경우입니다. 만료 알림이 CA 계정에만 있고 서비스 owner에게 라우팅되지 않으면 휴일이나 교대 시간에 놓칩니다.",
        "evidence": "certificate inventory, expiry alert rule, renewal job log, deployment target map, presented certificate serial sample",
        "followups": [
          {
            "q": "만료 알림 인계 증거에서는 어떤 증거부터 보나요?",
            "answer": "인계 증거는 active certificate inventory의 expiry timestamp와 owner field입니다. 판단 기준은 30일, 14일, 7일 같은 alert 단계가 서비스 owner와 platform owner 모두에게 도달하는지입니다. 다음 담당자에게는 renewal job log와 실제 endpoint에서 보이는 certificate serial을 함께 넘깁니다."
          },
          {
            "q": "만료 알림 영향 확인에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 inventory의 새 certificate serial과 endpoint에서 제공되는 serial이 같고, 만료일이 alert threshold 밖으로 이동한 상태입니다. 위험은 갱신 job은 성공했지만 CDN, load balancer, ingress 중 하나가 이전 serial을 계속 제공하는 경우입니다. 증거가 갈리면 deployment target map을 기준으로 누락 지점을 찾습니다."
          },
          {
            "q": "만료 알림 오판 회수 뒤에는 무엇을 남기나요?",
            "answer": "오판 회수 뒤에는 알림이 놓친 domain, 잘못된 owner, 갱신은 됐지만 배포되지 않은 target을 남깁니다. 실패 모드가 inventory 누락이면 domain discovery와 CT log 감시를 추가합니다. 후속 조치는 만료 drill에서 실제 endpoint serial 확인을 필수 단계로 만드는 것입니다."
          }
        ]
      },
      {
        "q": "domain transfer와 nameserver cutover는 어떤 순서로 진행하나요?",
        "decision": "운영 결정은 registrar transfer, registry status, nameserver delegation, zone parity, DNSSEC 상태를 끊김 없이 전환하는 것입니다. 첫 경계는 registrar control plane과 registry delegation입니다. cutover는 새 provider zone이 기존 record와 DNSSEC 자료를 모두 갖추고, 이전 nameserver를 충분히 유지할 수 있을 때 진행합니다.",
        "failure": "실패 모드는 transfer lock, DNSSEC DS mismatch, 새 nameserver의 zone 누락, glue record 오류로 일부 TLD resolver가 SERVFAIL을 받는 경우입니다. 도메인 소유권 이전만 완료됐다고 nameserver를 바꾸면 mail, API, validation record가 동시에 깨질 수 있습니다.",
        "evidence": "registrar transfer status, registry WHOIS/RDAP status, nameserver delegation diff, zone parity report, DNSSEC DS/DNSKEY check, mail and validation record checklist",
        "followups": [
          {
            "q": "도메인 이관 즉시 완화에서는 어떤 증거부터 보나요?",
            "answer": "즉시 완화는 registry delegation과 새 nameserver의 zone parity를 먼저 봅니다. SERVFAIL이 보이면 DS/DNSKEY mismatch 또는 delegation 오류를 우선 의심하고, NXDOMAIN이면 새 zone record 누락을 확인합니다. 다음 조치는 이전 nameserver 복귀 가능 여부와 registry lock 상태를 incident commander에게 보고하는 것입니다."
          },
          {
            "q": "도메인 이관 재발 봉쇄에서는 정상과 위험을 어떻게 가르나요?",
            "answer": "정상은 RDAP/WHOIS 상태, nameserver delegation, DNSSEC validation, 핵심 record lookup이 모두 새 provider 기준으로 통과하는 상태입니다. 위험은 web record는 맞지만 MX, CAA, ACME validation, glue record가 빠진 경우입니다. 증거는 zone parity report와 `dig +trace` 결과이며, 위험이면 cutover를 멈추고 누락 record를 복구합니다."
          },
          {
            "q": "도메인 이관 계층 분리 뒤에는 무엇을 남기나요?",
            "answer": "계층 분리 뒤에는 registrar transfer, registry delegation, DNSSEC, zone parity, resolver propagation 중 어느 단계가 실패했는지 남깁니다. 실패 모드가 DNSSEC mismatch였으면 DS 제거 또는 새 DS 등록 시각을 기록합니다. 후속 조치는 transfer runbook에 preflight zone diff와 post-cutover trace 확인을 넣는 것입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-private-connectivity-qa",
    "title": "VPN·Private Connectivity Q&A",
    "source": "VPN·Private Connectivity",
    "subtitle": "사설 연결 터널에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "site-to-site VPN IKE/IPsec 협상이 실패할 때 무엇을 먼저 결정하나요?",
        "decision": "먼저 운영 결정은 터널을 재협상시킬지, 변경을 되돌릴지, 고객 장비 설정을 동결할지입니다. 첫 경계는 IKE phase 1 proposal, IPsec phase 2 transform, PSK, peer public IP가 양쪽에서 같은지 확인하는 협상 메커니즘입니다. proposal mismatch나 NAT-T/DPD 불일치가 있으면 터널 상태가 간헐적으로 up이어도 실제 payload는 흐르지 않을 수 있으므로 cloud tunnel log와 customer gateway 로그를 같은 시각으로 맞춥니다.",
        "failure": "터널 up/down 색만 보면 암호화 알고리즘, lifetime, PFS group, PSK 변경 뒤 재협상이 반복되는 실패를 놓칩니다. 그 상태에서 라우팅이나 애플리케이션을 먼저 고치면 원인 장비가 아닌 구간에 변경을 쌓게 됩니다.",
        "evidence": "IKE negotiation log, IPsec SA state, customer gateway log, tunnel outside IP, recent crypto policy change",
        "followups": [
          {
            "q": "IKE 협상 실패는 어떤 로그부터 대조하나요?",
            "answer": "양쪽 IKE 로그에서 같은 peer IP와 같은 negotiation id를 먼저 맞춥니다. 판단 기준은 phase 1이 끝나기 전이면 proposal, PSK, NAT-T 문제이고 phase 2에서 멈추면 transform set, PFS, traffic selector 문제입니다. 다음 조치는 최근 crypto policy 변경 ticket을 붙이고 한쪽만 바뀐 값을 되돌리는 것입니다."
          },
          {
            "q": "터널이 up인데 통신이 안 되면 정상과 위험을 어떻게 나누나요?",
            "answer": "정상은 IKE SA, IPsec SA, byte counter, 암호화된 packet capture가 같은 시각에 증가하는 상태입니다. SA는 있는데 byte counter가 0이면 selector나 route가 잘못된 실패 모드이고, counter는 증가하지만 응답이 없으면 반대 방향 방화벽이나 return route를 봅니다. 증거는 tunnel metric과 양끝 packet capture를 같은 5분 창으로 묶습니다."
          },
          {
            "q": "협상 오판을 정리할 때 어떤 기록이 필요하나요?",
            "answer": "남길 기록은 정상 proposal 값, 실패 proposal 값, 변경 시각, 재협상 성공 시각입니다. 실패 모드가 lifetime 차이였으면 양쪽 표준값을 runbook에 고정하고, PSK 문제였으면 secret rotation 절차와 적용 증거를 분리합니다. 마지막 확인은 새 SA 생성 로그와 실제 업무 CIDR ping 또는 TCP probe 결과로 닫습니다."
          }
        ]
      },
      {
        "q": "client VPN 접속은 되는데 사내 대역 접근이 안 되면 무엇을 먼저 보나요?",
        "decision": "운영 결정은 사용자를 계속 접속시킬지, 특정 그룹 권한을 되돌릴지, split-tunnel route를 임시로 줄일지입니다. 첫 경계는 인증 성공 이후 authorization rule, client route push, 보안 그룹, 대상 subnet route가 이어지는 client VPN 메커니즘입니다. 로그인 성공만 정상으로 보면 사용자는 연결된 것처럼 보이지만 허용 rule이나 pushed route가 빠져 업무망에 도달하지 못합니다.",
        "failure": "IdP 인증 성공 로그만 보고 종료하면 그룹 claim 누락, authorization rule 우선순위, client CIDR 충돌, split tunnel 누락을 뒤늦게 발견합니다. 특히 특정 부서만 실패하면 네트워크 공통 장애가 아니라 권한 매핑 장애일 가능성이 큽니다.",
        "evidence": "client VPN connection log, authorization rule export, pushed route list, IdP group claim, endpoint security group",
        "followups": [
          {
            "q": "인증과 권한 문제는 어떤 기준으로 분리하나요?",
            "answer": "connection log가 authentication success를 남기고 곧바로 authorization failed를 남기면 IdP가 아니라 client VPN rule 문제로 분리합니다. 반대로 SAML/OIDC assertion에 필수 group claim이 없으면 권한 rule을 고치기 전에 IdP mapping을 확인합니다. 다음 조치는 실패 사용자 한 명의 claim, rule id, 대상 CIDR을 incident에 붙이는 것입니다."
          },
          {
            "q": "접속 후 route 누락은 어떻게 확인하나요?",
            "answer": "클라이언트가 받은 route table과 endpoint route authorization을 비교합니다. 판단 기준은 대상 CIDR이 client에 push됐고 VPC route table에도 client CIDR return path가 있어야 한다는 점입니다. 누락되면 split tunnel 설정을 임시로 되돌리거나 업무 CIDR만 추가한 뒤 traceroute와 Flow Logs로 확인합니다."
          },
          {
            "q": "client VPN 변경 승인 전 중단 기준은 무엇인가요?",
            "answer": "중단 기준은 테스트 계정이 인증, authorization, route push, 대상 TCP 연결을 모두 통과하지 못하는 경우입니다. 증거는 connection log, 클라이언트 route 출력, 대상 subnet Flow Logs accept 행입니다. 실패가 그룹별로 갈리면 전체 배포를 멈추고 영향 그룹만 이전 rule set으로 되돌립니다."
          }
        ]
      },
      {
        "q": "Direct Connect 회선 인수에서는 physical, VIF, BGP 중 어디를 먼저 확정하나요?",
        "decision": "운영 결정은 회선을 인수 가능한 상태로 볼지, 통신사 또는 고객 장비로 반려할지입니다. 첫 경계는 physical port light, LAG/member state, VLAN tagging, virtual interface state, BGP session state가 순서대로 연결되는 Direct Connect 메커니즘입니다. physical down과 BGP down을 섞으면 통신사 장애와 라우터 설정 장애를 같은 작업으로 처리하게 됩니다.",
        "failure": "포트가 available이어도 VLAN 태그가 다르거나 VIF가 wrong account에 붙으면 BGP는 절대 올라오지 않습니다. BGP만 재시작하면 physical flap, optic error, VLAN mismatch 같은 하위 계층 증거가 사라질 수 있습니다.",
        "evidence": "Direct Connect port state, LAG member state, VIF state, VLAN id, BGP session state, provider ticket",
        "followups": [
          {
            "q": "physical 장애와 VIF 장애는 어떤 증거로 나누나요?",
            "answer": "physical 장애는 port down, optic alarm, LAG member down, provider NOC ticket로 판단합니다. port는 up인데 VIF가 down이면 VLAN id, account ownership, accepted VIF 상태를 봅니다. 다음 조치는 하위 계층 증거를 먼저 고정하고 BGP 변경은 VIF가 available인 뒤에만 실행하는 것입니다."
          },
          {
            "q": "BGP session이 idle이면 무엇을 먼저 확인하나요?",
            "answer": "BGP idle에서는 peer IP, ASN, MD5 password, allowed TCP 179 path를 먼저 확인합니다. 판단 기준은 VIF가 available이고 양쪽 loopback 또는 link-local neighbor가 같은 주소쌍을 보는지입니다. 실패하면 라우터 ACL과 BGP neighbor 설정 diff를 남기고 session reset은 한쪽씩 수행합니다."
          },
          {
            "q": "Direct Connect 인수 문서에는 어떤 정상 예시가 들어가야 하나요?",
            "answer": "정상 예시는 port up, VIF available, BGP established, advertised/received prefix 수, 테스트 CIDR 왕복 결과가 한 세트여야 합니다. 실패 모드는 physical, VLAN, BGP, prefix 단계별로 적고 각 단계의 확인 명령을 붙입니다. 다음 담당자는 이 문서로 provider escalation과 라우터 변경 중 어느 쪽을 열지 바로 결정할 수 있어야 합니다."
          }
        ]
      },
      {
        "q": "BGP prefix propagation 이상은 어떤 prefix부터 좁히나요?",
        "decision": "운영 결정은 prefix 광고를 유지할지, 특정 대역을 withdraw할지, 더 구체적인 route로 우회할지입니다. 첫 메커니즘은 local advertise list, BGP import/export policy, route filter, cloud route table propagation입니다. 한쪽에서만 prefix가 보이면 터널이나 회선이 살아 있어도 대상 대역은 blackhole 또는 잘못된 attachment로 갈 수 있습니다.",
        "failure": "세션 established만 보고 정상으로 판단하면 prefix filter, max-prefix, route map, TGW propagation 누락을 놓칩니다. 잘못 광고된 넓은 CIDR은 정상 대역까지 흡수해 영향 반경을 키울 수 있습니다.",
        "evidence": "BGP advertised routes, received routes, route policy diff, TGW route table propagation, max-prefix alert",
        "followups": [
          {
            "q": "prefix가 한쪽에만 보이면 어떤 증거를 먼저 잡나요?",
            "answer": "advertised-routes와 received-routes 출력을 같은 neighbor 기준으로 저장합니다. 판단 기준은 내가 광고한 prefix가 상대 received에 있고, 상대가 광고한 return prefix가 내 route table에 설치됐는지입니다. 빠진 쪽이 있으면 route policy diff와 최근 prefix-list 변경을 먼저 되돌림 후보로 올립니다."
          },
          {
            "q": "즉시 완화는 withdraw와 더 구체적인 route 중 무엇을 고르나요?",
            "answer": "잘못 광고된 넓은 CIDR이 피해를 만들면 withdraw가 우선입니다. 특정 업무 대역만 우회해야 하고 return path가 준비돼 있으면 더 구체적인 prefix를 임시 광고합니다. 두 경우 모두 증거는 route table before/after와 영향 CIDR 목록이며, max-prefix나 route dampening 위험이 있으면 변경 폭을 줄입니다."
          },
          {
            "q": "BGP propagation 재발 방지는 무엇으로 닫나요?",
            "answer": "재발 방지는 prefix-list 변경 리뷰와 route count 알림으로 닫습니다. 실패 모드가 filter 누락이면 승인 기준에 expected advertised/received prefix 수를 넣고, 과다 광고였으면 max-prefix threshold와 rollback 명령을 문서화합니다. 다음 검증은 cloud route table과 customer router RIB가 같은 prefix 결론을 내는지 비교합니다."
          }
        ]
      },
      {
        "q": "route priority와 asymmetric routing은 어떤 방향부터 확인하나요?",
        "decision": "운영 결정은 active 경로를 유지할지, 더 낮은 우선순위 경로를 차단할지, return route를 수정할지입니다. 첫 경계는 longest prefix, static route, propagated route, local preference, AS path, appliance insertion이 실제로 선택한 next hop입니다. 요청 방향과 응답 방향이 다른 보안 장비를 지나면 stateful firewall이 정상 세션을 drop할 수 있습니다.",
        "failure": "한 방향 traceroute만 보면 응답이 다른 VPN, Direct Connect, NAT 또는 firewall cluster로 돌아가는 실패를 놓칩니다. 우선순위가 의도와 다르면 일부 CIDR만 간헐적으로 실패해 애플리케이션 timeout처럼 보입니다.",
        "evidence": "effective route table, BGP local preference, AS path, traceroute both directions, firewall session log",
        "followups": [
          {
            "q": "비대칭 경로는 어떤 테스트로 확정하나요?",
            "answer": "같은 5-tuple에 대해 cloud에서 고객망 방향, 고객망에서 cloud 방향 traceroute와 packet capture를 동시에 잡습니다. 판단 기준은 SYN과 SYN-ACK가 같은 보안 상태 장비를 지나야 한다는 점입니다. 응답만 다른 회선으로 보이면 return route 우선순위나 firewall state sync를 다음 조치로 잡습니다."
          },
          {
            "q": "static route와 BGP route가 충돌하면 무엇을 우선 보나요?",
            "answer": "effective route table에서 실제 선택된 next hop과 prefix 길이를 먼저 봅니다. 더 구체적인 static route가 BGP보다 앞서면 장애 범위는 해당 CIDR로 좁혀지고, 넓은 static route가 있으면 여러 업무망을 흡수할 수 있습니다. 증거는 route selection snapshot과 변경 ticket이며, 완화는 임시 static route 제거 또는 더 구체적인 정상 route 추가입니다."
          },
          {
            "q": "route priority 수정 뒤 정상 선언 조건은 무엇인가요?",
            "answer": "정상 선언은 양방향 traceroute, firewall session established 로그, Flow Logs accept, 업무 포트 probe가 모두 같은 경로를 가리킬 때만 합니다. 실패 모드가 비대칭이었다면 한 방향 ping 성공은 충분하지 않습니다. 다음 조치는 선택된 route와 backup route 우선순위를 runbook 표로 남기는 것입니다."
          }
        ]
      },
      {
        "q": "MTU/MSS 조각화 의심 시 어느 payload 경계를 먼저 검증하나요?",
        "decision": "운영 결정은 MSS clamping을 적용할지, PMTUD 차단을 풀지, 애플리케이션 재시도보다 네트워크 경로를 먼저 고칠지입니다. 첫 메커니즘은 VPN/IPsec overhead, Direct Connect MTU, firewall ICMP fragmentation-needed 처리, TCP MSS negotiation입니다. 작은 packet은 통과하지만 TLS handshake 이후 큰 payload가 멈추면 조각화 또는 PMTUD 실패를 우선 봅니다.",
        "failure": "HTTP status나 DB timeout만 보면 네트워크 payload 크기 조건을 놓칩니다. ICMP type 3 code 4가 차단되거나 MSS clamp가 한쪽에만 적용되면 특정 파일 업로드, 백업, replication만 실패할 수 있습니다.",
        "evidence": "DF-bit MTU probe, TCP MSS value, packet capture retransmission, firewall ICMP policy, interface MTU",
        "followups": [
          {
            "q": "MTU 실패는 어떤 probe로 재현하나요?",
            "answer": "DF bit를 켠 ping 또는 tracepath로 경로별 최대 payload를 찾습니다. 판단 기준은 업무 payload보다 작은 MTU에서 fragmentation-needed 응답이 돌아오거나, 응답이 차단돼 probe가 timeout되는지입니다. 다음 조치는 ICMP 허용 정책과 MSS clamp 후보값을 함께 제시하는 것입니다."
          },
          {
            "q": "MSS clamp 변경은 언제 승인하나요?",
            "answer": "승인 기준은 SYN/SYN-ACK capture에서 협상 MSS가 낮아지고, 대용량 업무 요청의 retransmission이 줄어드는 것입니다. 위험은 값을 과도하게 낮춰 처리량을 떨어뜨리거나 한쪽 장비에만 적용해 비대칭 결과를 만드는 경우입니다. 변경 전후 capture와 throughput 샘플을 같은 incident에 남깁니다."
          },
          {
            "q": "MTU/MSS 조치 후에도 실패하면 다음 경계는 어디인가요?",
            "answer": "MTU probe와 MSS capture가 정상인데 업무가 실패하면 TLS record size, application timeout, storage replication chunk 같은 상위 payload 조건으로 넘어갑니다. 단, packet capture에 retransmission이나 out-of-order가 남아 있으면 네트워크 경계를 닫지 않습니다. 다음 조치는 성공 크기와 실패 크기를 표로 남겨 재현 조건을 고정하는 것입니다."
          }
        ]
      },
      {
        "q": "customer gateway와 firewall 경계는 어디서 운영 책임을 나누나요?",
        "decision": "운영 결정은 cloud 팀이 터널 설정을 바꿀지, 고객 네트워크 팀에 firewall/NAT/ACL 조치를 요청할지입니다. 첫 경계는 customer gateway public IP, NAT device, firewall policy, BGP neighbor, 내부 LAN route가 만나는 지점입니다. cloud tunnel이 정상이어도 고객 firewall이 IKE, ESP, UDP 4500, 업무 포트를 막으면 사설 연결은 실패합니다.",
        "failure": "고객 장비 변경 ticket을 확인하지 않으면 공인 IP NAT 변경, firewall policy reorder, HA pair failover 뒤 state 손실을 놓칩니다. cloud 쪽 로그가 비어 있는 경우도 실제로는 고객 장비가 앞에서 drop한 결과일 수 있습니다.",
        "evidence": "customer gateway config, firewall policy hit count, NAT translation table, customer change ticket, cloud tunnel log",
        "followups": [
          {
            "q": "고객 방화벽 차단은 어떤 증거로 요청하나요?",
            "answer": "요청에는 시간대, src/dst IP, port, protocol, cloud tunnel outside IP, packet capture를 넣습니다. 판단 기준은 cloud가 packet을 보냈는데 고객 firewall hit count나 drop log가 같은 tuple을 남기는지입니다. 다음 조치는 임시 permit rule의 만료 시각과 영구 rule owner를 ticket에 명시하는 것입니다."
          },
          {
            "q": "NAT 뒤 customer gateway는 무엇이 위험한가요?",
            "answer": "위험은 peer IP가 바뀌거나 UDP 4500 translation이 끊겨 IKE peer가 다른 장비로 보이는 경우입니다. 증거는 NAT translation table, IKE peer 로그, cloud에 등록된 customer gateway IP입니다. 불일치하면 cloud 설정 변경보다 NAT 고정 또는 고객 장비 HA 설정을 먼저 조치합니다."
          },
          {
            "q": "고객 장비 인계에는 어떤 정상/비정상 예시가 필요하나요?",
            "answer": "정상 예시는 IKE established, BGP established, firewall allow hit 증가, 업무 포트 성공 probe입니다. 비정상 예시는 IKE no proposal, NAT peer mismatch, firewall deny, return route missing으로 나눕니다. 인계 문서는 고객 담당자, 변경 승인 경로, 긴급 rollback 연락처까지 포함해야 장애 중 책임 경계가 흐려지지 않습니다."
          }
        ]
      },
      {
        "q": "VPC peering 연결은 route, security group, DNS 제한 중 무엇을 먼저 보나요?",
        "decision": "운영 결정은 peering을 유지할지, route를 추가할지, DNS resolution 설정을 바꿀지, 다른 연결 방식으로 전환할지입니다. 첫 메커니즘은 accepter/requester 상태, 양쪽 route table, security group source, DNS resolution option입니다. Peering은 transitive routing을 지원하지 않으므로 다른 VPC나 온프레미스 경유를 기대하면 설계 자체가 실패합니다.",
        "failure": "연결 active만 보고 정상이라고 하면 양쪽 route 누락, SG reference 제약, CIDR overlap, private DNS 미해결을 놓칩니다. 특히 A-VPC와 B-VPC가 붙어 있어도 B를 거쳐 C로 가는 경로는 생기지 않습니다.",
        "evidence": "peering connection state, requester/accepter route tables, security group rules, DNS resolution option, VPC CIDR inventory",
        "followups": [
          {
            "q": "peering route 누락은 어떻게 바로 확인하나요?",
            "answer": "양쪽 route table에 상대 CIDR이 peering connection id를 next hop으로 갖는지 확인합니다. 한쪽만 있으면 요청은 나가도 응답이 돌아오지 않는 실패 모드입니다. 다음 조치는 accepter와 requester route table association까지 확인한 뒤 최소 대상 subnet부터 route를 추가하는 것입니다."
          },
          {
            "q": "security group이나 DNS 제한은 언제 의심하나요?",
            "answer": "route는 양쪽에 있는데 TCP가 timeout이면 security group, NACL, endpoint listener를 봅니다. IP 접속은 되지만 이름 접속만 실패하면 peering DNS resolution option과 private hosted zone association을 확인합니다. 증거는 Flow Logs action, SG rule id, resolver query log이며, 조치는 이름 해석과 네트워크 허용을 분리해 적용합니다."
          },
          {
            "q": "peering으로 해결하면 안 되는 요구는 무엇인가요?",
            "answer": "transitive routing, 중앙 방화벽 경유, 온프레미스 전파, 다수 VPC 허브 연결이 필요하면 peering이 맞지 않습니다. 판단 기준은 목적지가 직접 연결된 두 VPC를 벗어나는지입니다. 그런 경우 다음 조치는 Transit Gateway, PrivateLink, 또는 라우팅 허브 설계를 비교하고 peering route 추가를 중단하는 것입니다."
          }
        ]
      },
      {
        "q": "PrivateLink 장애는 endpoint service, DNS, policy 중 무엇을 먼저 분리하나요?",
        "decision": "운영 결정은 endpoint 연결 승인을 바꿀지, DNS override를 되돌릴지, endpoint policy를 수정할지입니다. 첫 경계는 consumer interface endpoint, private DNS, endpoint service acceptance, NLB target health, endpoint policy입니다. DNS가 endpoint ENI를 가리키지 않거나 service acceptance가 pending이면 네트워크 경로가 있어도 서비스에 닿지 않습니다.",
        "failure": "NLB target만 보면 consumer 계정의 endpoint policy deny, private DNS 미활성, service acceptance pending을 놓칩니다. 반대로 endpoint ENI가 healthy여도 provider target이 unhealthy면 소비자 쪽 보안 그룹 변경으로 해결되지 않습니다.",
        "evidence": "interface endpoint state, endpoint service acceptance, private DNS setting, endpoint policy, NLB target health, DNS query result",
        "followups": [
          {
            "q": "PrivateLink DNS 문제는 어떤 출력으로 확인하나요?",
            "answer": "consumer VPC에서 서비스 이름을 조회해 interface endpoint ENI private IP로 응답하는지 봅니다. public IP나 다른 private zone으로 해석되면 private DNS, PHZ override, resolver rule 충돌을 의심합니다. 다음 조치는 DNS 응답, endpoint id, resolver query log를 붙이고 잘못된 override를 되돌리는 것입니다."
          },
          {
            "q": "endpoint policy deny와 provider 장애는 어떻게 나누나요?",
            "answer": "consumer endpoint policy와 provider NLB target health를 동시에 봅니다. policy deny는 특정 principal, action, resource 조건에서만 실패하고 provider 장애는 여러 consumer가 같은 target health 문제를 봅니다. 증거는 endpoint policy evaluation, connection attempt log, target group health이며 다음 조치는 소비자 정책 수정과 provider target 복구를 분리하는 것입니다."
          },
          {
            "q": "endpoint service 승인 변경 뒤 정상 조건은 무엇인가요?",
            "answer": "정상 조건은 endpoint connection이 accepted, DNS가 ENI IP로 해석, 보안 그룹이 consumer source를 허용, provider target이 healthy인 상태입니다. 실패 모드가 acceptance pending이면 consumer는 timeout처럼 보일 수 있습니다. 최종 확인은 consumer subnet에서 TLS 또는 TCP probe와 provider access log의 같은 request id로 닫습니다."
          }
        ]
      },
      {
        "q": "DNS forwarding과 Resolver endpoint 변경은 무엇을 먼저 검증하나요?",
        "decision": "운영 결정은 forwarding rule을 배포할지, 특정 domain rule을 되돌릴지, inbound/outbound endpoint 용량을 늘릴지입니다. 첫 메커니즘은 Resolver rule domain suffix, outbound endpoint ENI, 온프레미스 resolver, inbound endpoint return path입니다. 네트워크 터널이 정상이어도 DNS UDP/TCP 53 경로와 rule association이 틀리면 이름 해석만 실패합니다.",
        "failure": "ping이나 TCP 업무 포트만 확인하면 조건부 forwarder 누락, resolver endpoint SG 차단, 온프레미스 DNS recursion 거부를 놓칩니다. 특정 suffix만 실패하면 사설 연결 장애가 아니라 rule 우선순위 또는 zone ownership 문제일 수 있습니다.",
        "evidence": "Resolver query log, forwarding rule association, outbound endpoint ENI state, security group for port 53, on-prem DNS log",
        "followups": [
          {
            "q": "forwarding rule 적용 여부는 어디서 확인하나요?",
            "answer": "VPC association과 domain suffix match를 먼저 확인합니다. 판단 기준은 질의한 이름이 가장 구체적인 Resolver rule에 매칭되고 outbound endpoint ENI를 통해 온프레미스 DNS로 나가는지입니다. 증거는 Resolver query log와 온프레미스 DNS query log이며, 누락되면 rule association을 되돌리거나 suffix를 더 구체화합니다."
          },
          {
            "q": "Resolver endpoint 보안 그룹 문제는 어떤 증상인가요?",
            "answer": "query log에 outbound 시도는 있는데 응답이 없거나 TCP fallback이 실패하면 endpoint SG, NACL, 온프레미스 firewall의 53/UDP와 53/TCP를 봅니다. 판단 기준은 양방향 DNS packet이 endpoint ENI와 고객 resolver에 모두 보여야 한다는 점입니다. 다음 조치는 UDP와 TCP를 모두 허용하고 큰 DNS 응답 재시도를 확인하는 것입니다."
          },
          {
            "q": "DNS forwarding 변경의 rollback 기준은 무엇인가요?",
            "answer": "rollback 기준은 핵심 suffix의 SERVFAIL/NXDOMAIN 증가, query latency 급증, 온프레미스 resolver timeout입니다. 증거는 변경 전후 query log 샘플과 synthetic lookup 결과입니다. 다음 조치는 rule을 이전 target resolver로 되돌리고 TTL 영향이 끝날 때까지 public/private 응답 차이를 모니터링하는 것입니다."
          }
        ]
      },
      {
        "q": "packet capture로 사설 연결 장애를 증명할 때 capture 지점은 어떻게 고르나요?",
        "decision": "운영 결정은 어느 팀의 경계에서 packet이 사라졌는지 확정하고 다음 조치 소유자를 정하는 것입니다. 첫 메커니즘은 source host, cloud ENI, tunnel/VIF edge, customer gateway, destination host를 같은 tuple로 관측하는 것입니다. 한 지점 capture만 있으면 drop 위치가 아니라 관측 위치만 증명합니다.",
        "failure": "평균 지표나 한쪽 tcpdump만 보면 요청 미발송, 중간 drop, 응답 경로 누락을 구분하지 못합니다. 시간 동기화가 안 된 capture는 같은 packet인지 증명하지 못해 고객사와 cloud 팀이 서로 책임을 넘기게 됩니다.",
        "evidence": "five-tuple packet capture, synchronized timestamps, Flow Logs, firewall drop log, tcpdump filter, request id",
        "followups": [
          {
            "q": "capture 필터는 어떤 형태로 남기나요?",
            "answer": "필터는 src IP, dst IP, port, protocol, 시간 범위를 포함한 5-tuple로 남깁니다. 판단 기준은 같은 SYN 또는 DNS query가 source, 중간 경계, destination 중 어디까지 보였는지입니다. 다음 조치는 pcap 파일명과 필터 명령을 incident에 붙여 다른 담당자가 같은 조건으로 재현하게 하는 것입니다."
          },
          {
            "q": "SYN은 보이는데 응답이 없으면 무엇을 판단하나요?",
            "answer": "SYN이 destination 앞까지 보이고 SYN-ACK가 없으면 대상 host, local firewall, listener 상태를 봅니다. SYN-ACK가 destination에서 나갔는데 cloud 쪽에 없으면 return route나 중간 firewall drop입니다. 증거는 양방향 capture와 Flow Logs action이며, 다음 조치는 사라진 첫 경계의 소유자에게 packet 번호와 timestamp를 전달하는 것입니다."
          },
          {
            "q": "capture 증거로 정상 복구를 어떻게 닫나요?",
            "answer": "정상 복구는 같은 5-tuple에서 request와 response가 양쪽 경계를 모두 통과하고, 애플리케이션 성공 로그가 같은 시각에 남아야 합니다. 실패 모드가 drop rule이었다면 rule id와 hit count 감소를 함께 기록합니다. pcap 원본, 요약 표, 최종 probe 결과를 남겨 재발 때 같은 구간부터 보게 합니다."
          }
        ]
      },
      {
        "q": "tunnel failover와 HA는 자동 전환을 믿기 전에 무엇을 검증하나요?",
        "decision": "운영 결정은 장애 터널을 강제로 내릴지, backup 터널로 우회시킬지, 자동 failback을 막을지입니다. 첫 메커니즘은 두 tunnel의 health, BGP metric/local preference, DPD, route propagation, 고객 장비 HA state입니다. backup 터널이 up이어도 route 우선순위와 return path가 준비되지 않으면 failover 순간 일부 트래픽만 살아남습니다.",
        "failure": "터널 두 개가 up이라는 사실만 믿으면 active/standby 정책, BGP convergence 지연, 고객 firewall state 손실, failback flap을 놓칩니다. 자동 전환이 반복되면 장애보다 더 넓은 지연과 세션 끊김을 만들 수 있습니다.",
        "evidence": "tunnel health metric, BGP path preference, failover event log, DPD timeout, route table before/after, customer HA state",
        "followups": [
          {
            "q": "failover가 실제로 일어났는지 어떤 순서로 확인하나요?",
            "answer": "터널 health event, BGP best path 변경, route table next hop 변경, 업무 probe 성공 순서로 확인합니다. 판단 기준은 control plane 이벤트만이 아니라 data plane traffic이 backup 터널로 지나간 증거가 있어야 한다는 점입니다. 증거는 event log와 packet capture 또는 byte counter를 같은 시각으로 맞춥니다."
          },
          {
            "q": "자동 failback은 언제 막아야 하나요?",
            "answer": "primary 터널이 flapping 중이거나 고객 HA pair가 state를 잃는 동안에는 자동 failback을 막습니다. 실패 모드는 경로가 몇 분마다 바뀌며 장기 세션과 replication을 끊는 것입니다. 다음 조치는 primary 원인 확인 전까지 local preference를 고정하고 failback 해제 조건을 장애 기록에 적는 것입니다."
          },
          {
            "q": "HA drill 뒤에는 어떤 runbook 항목을 갱신하나요?",
            "answer": "갱신 항목은 전환 소요 시간, 손실된 세션 유형, BGP convergence 시간, 수동 우회 명령, 되돌림 조건입니다. 판단 기준은 RTO 안에 업무 probe가 회복됐는지와 backup 경로가 과부하되지 않았는지입니다. drill 증거는 before/after route table, tunnel byte counter, 사용자 영향 표로 남깁니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-delivery-pipeline-qa",
    "title": "CI/CD·Artifact·Environment Q&A",
    "source": "CI/CD·Artifact·Environment",
    "subtitle": "릴리스 공급망에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "운영에 올라간 코드가 어느 commit인지 runtime에서 어떻게 확정하나요?",
        "decision": "릴리스 후보 식별은 Git 브랜치 이름이 아니라 실행 중인 workload가 노출하는 build metadata와 배포 이벤트를 맞춰 확정합니다. 같은 commit SHA라도 재빌드된 이미지, 다른 base image, 다른 config bundle이면 운영 판단이 달라지므로 runtime `/version` 응답, container label, deployment annotation, release tag를 함께 봅니다.",
        "failure": "PR merge SHA만 보고 복구하면 실제 운영 pod가 이전 image digest를 계속 실행하거나 hotfix cherry-pick이 빠진 상태를 정상으로 오인할 수 있습니다. 특히 rolling update 중에는 replica마다 SHA가 다를 수 있어 사용자 실패가 특정 cohort에만 남습니다.",
        "evidence": "runtime /version response, deployment annotation, Git tag, image label, deploy event timestamp",
        "followups": [
          {
            "q": "브랜치나 태그가 맞아도 추가로 확인할 runtime 증거는 무엇인가요?",
            "answer": "실행 중인 instance가 반환하는 commit SHA, image digest, build time, config bundle version이 배포 이벤트와 같은 값을 가리켜야 합니다. 태그는 재사용될 수 있으므로 tag name은 보조 정보로만 두고, pod annotation이나 task definition revision처럼 scheduler가 실제로 잡은 값을 기준으로 incident record를 시작합니다."
          },
          {
            "q": "replica마다 commit이 섞여 있으면 정상 배포로 볼 수 있나요?",
            "answer": "rolling window 안에서만 섞여 있고 traffic split, desired revision, rollout status가 계획과 일치하면 관찰 중인 상태로 볼 수 있습니다. 하지만 실패 요청이 특정 revision에 몰리거나 오래된 replica가 drain되지 않으면 rollout을 멈추고 그 revision의 로그, trace, metric만 분리해 rollback 후보로 고정합니다."
          },
          {
            "q": "잘못된 SHA를 기준으로 대응했다면 어떤 기록으로 회수하나요?",
            "answer": "처음 가리킨 SHA, 실제 runtime SHA, 차이가 난 이유, 영향받은 replica나 region, 교정한 rollback target을 한 줄 타임라인으로 남깁니다. 다음 조치는 release note와 alert label이 runtime 값을 쓰도록 바꾸고, `/version` smoke check를 promotion gate에 넣어 같은 착각을 막는 것입니다."
          }
        ]
      },
      {
        "q": "artifact digest와 provenance는 어떤 순서로 검증해야 하나요?",
        "decision": "산출물 검증은 registry에 있는 이름을 믿는 일이 아니라 digest, builder identity, source ref, SBOM, signature가 같은 release candidate를 가리키는지 확인하는 일입니다. 배포 승인은 mutable tag가 아니라 immutable digest와 서명 검증 결과를 기준으로 내려야 합니다.",
        "failure": "digest를 확인하지 않으면 같은 tag에 다른 이미지가 밀려 들어온 상황, 캐시된 base image 취약점, SBOM 누락, 서명되지 않은 emergency build를 놓칩니다. 이 상태로 rollback하면 안전한 이전 버전이 아니라 출처가 불명확한 산출물로 되돌아갈 수 있습니다.",
        "evidence": "container image digest, SLSA provenance, SBOM, signature verification, registry push log",
        "followups": [
          {
            "q": "tag는 같은데 digest가 다르면 배포를 계속할 수 있나요?",
            "answer": "계속하면 안 됩니다. tag 재사용인지, registry replication 지연인지, 다른 pipeline이 같은 tag를 덮어썼는지부터 분리해야 합니다. 승인자는 expected digest와 runtime digest가 맞는 증거를 받아야 하고, mismatch가 남아 있으면 promotion 대신 해당 tag를 freeze하고 새 immutable release id를 발급합니다."
          },
          {
            "q": "SBOM과 signature 중 하나만 통과하면 충분한가요?",
            "answer": "아닙니다. SBOM은 무엇이 들어 있는지, signature는 누가 어떤 산출물을 승인했는지 증명합니다. SBOM은 있는데 signature가 없으면 출처와 승인 경로가 비고, signature만 있으면 취약 dependency나 base image 변경을 설명할 수 없습니다. 둘 중 하나가 빠지면 예외 승인과 만료 시각을 기록해야 합니다."
          },
          {
            "q": "provenance 검증 실패 후 복구 증거는 어디에 남기나요?",
            "answer": "incident record에는 실패한 attestation id, 거부된 digest, 허용한 대체 digest, 검증 명령 출력, registry audit log 링크를 붙입니다. pipeline에는 unsigned artifact가 deploy job까지 오지 못하도록 policy check를 앞단으로 옮기고, exception은 ticket과 expiry 없이는 실행되지 않게 만듭니다."
          }
        ]
      },
      {
        "q": "dependency lock 변경은 어떤 supply-chain 위험까지 확인해야 하나요?",
        "decision": "lockfile 리뷰는 직접 추가한 패키지뿐 아니라 transitive dependency, registry source, checksum, install script, license, rollback 가능성을 같이 보는 변경 심사입니다. 운영 판단은 `package.json` diff보다 lockfile의 실제 resolved version과 integrity 값이 기준입니다.",
        "failure": "상위 패키지 하나만 봐서 승인하면 하위 dependency 교체, registry mirror 오염, postinstall script 실행, lockfile 누락으로 재현 불가능한 build가 들어올 수 있습니다. rollback 때도 이전 lockfile과 artifact가 함께 없으면 같은 코드를 다시 만들지 못합니다.",
        "evidence": "lockfile diff, package integrity checksum, registry URL, dependency review report, build reproducibility log",
        "followups": [
          {
            "q": "lockfile diff에서 승인 전에 막아야 하는 신호는 무엇인가요?",
            "answer": "registry host 변경, integrity 값 제거, 새 install script, maintainer가 바뀐 고위험 패키지, major version transitive upgrade는 즉시 설명을 요구합니다. 증거는 dependency review report와 package manager audit log로 남기고, 설명이 없으면 build를 만들기 전에 PR을 되돌립니다."
          },
          {
            "q": "transitive dependency 취약점이 발견되면 release를 무조건 멈추나요?",
            "answer": "exploitable path, package가 runtime에 포함되는지, severity, compensating control, 배포 긴급도를 함께 봅니다. 운영 경로에서 호출되지 않는 dev dependency와 인증 전 요청에서 실행되는 parser 취약점은 다르게 판단합니다. 예외로 진행하면 owner, 만료일, upgrade target, scanner evidence를 release packet에 붙입니다."
          },
          {
            "q": "dependency rollback은 코드 revert만으로 충분한가요?",
            "answer": "충분하지 않습니다. revert commit, 이전 lockfile, 이전 artifact digest, package manager cache 조건이 함께 맞아야 재현됩니다. rollback runbook에는 이전 산출물을 바로 재배포하는 경로와 새로 빌드해야 할 때의 registry pinning 절차를 분리해 둡니다."
          }
        ]
      },
      {
        "q": "staging과 production 차이는 어디까지 config drift로 봐야 하나요?",
        "decision": "환경 차이는 코드가 아니라 실행 조건의 계약 차이입니다. config source, secret reference, feature flag default, network endpoint, quota, region, database schema, runtime variable을 같은 release candidate 기준으로 비교해야 합니다.",
        "failure": "staging 성공만 믿으면 production 전용 secret name, env var typo, region별 endpoint, feature flag default, quota 차이 때문에 배포 뒤에만 실패합니다. 특히 config가 여러 저장소와 콘솔에서 섞이면 drift가 재배포 때마다 다시 생깁니다.",
        "evidence": "config source diff, env var snapshot, secret reference list, feature flag export, staging/prod schema checksum",
        "followups": [
          {
            "q": "환경 차이가 의도된 설정인지 drift인지 어떻게 가르나요?",
            "answer": "차이가 policy 문서, config repository, ticket, rollout plan 중 하나에 연결되어 있으면 의도된 예외로 볼 수 있습니다. 출처가 콘솔 수동 변경뿐이거나 owner와 만료일이 없으면 drift로 다룹니다. 그때는 현재 값을 백업하고 source-of-truth에 반영할지 즉시 되돌릴지 결정합니다."
          },
          {
            "q": "secret이나 env var mismatch가 보이면 어떤 피해를 먼저 줄이나요?",
            "answer": "인증 실패, 외부 API 오발송, 다른 tenant 데이터 접근 가능성을 먼저 차단합니다. 영향이 쓰기 경로에 있으면 traffic을 read-only 또는 이전 revision으로 돌리고, readback에는 변수 이름, 값의 hash, secret version, reload 시각만 남겨 민감값이 로그에 흘러가지 않게 합니다."
          },
          {
            "q": "drift 수습 뒤에는 어떤 자동 검사를 추가하나요?",
            "answer": "promotion 전에 config export를 만들어 staging/prod 차이를 allowlist와 비교하게 합니다. 허용되지 않은 차이는 배포를 막고, 허용된 차이는 ticket id와 만료일을 요구합니다. 수동 hotfix가 필요했다면 다음 release부터 source repository에서만 값이 바뀌도록 권한을 줄입니다."
          }
        ]
      },
      {
        "q": "secret injection 문제는 version, mount, permission 중 어디서 가르나요?",
        "decision": "secret 주입 판단은 secret store의 값 존재 여부가 아니라 workload가 어떤 version을 어떤 경로로 읽고 어떤 identity로 접근했는지 확인하는 일입니다. rotation 중이면 old/new version 동시 허용 기간과 reload 방식도 같이 봐야 합니다.",
        "failure": "secret 값만 갱신하면 running process가 이전 값을 캐시하거나 mount path가 비어 있거나 service account 권한이 없어 production에서만 인증 실패가 납니다. 실패 로그에 secret 값을 직접 남기면 장애 대응 중 보안 사고가 됩니다.",
        "evidence": "secret version id, workload identity policy, mount path readback, reload event, permission-denied audit log",
        "followups": [
          {
            "q": "secret version이 맞는지 민감값을 보지 않고 확인하려면 어떻게 하나요?",
            "answer": "secret manager의 version id, mount metadata, application의 redacted fingerprint를 비교합니다. 값 자체는 출력하지 않고 hash prefix나 version label만 기록합니다. 세 값이 맞는데 인증이 실패하면 provider 쪽 credential 상태나 clock skew로 범위를 옮깁니다."
          },
          {
            "q": "rotation 중 일부 pod만 실패하면 어떤 순서로 줄이나요?",
            "answer": "먼저 실패 pod의 secret mount time, restart time, sidecar reload log를 성공 pod와 비교합니다. old credential이 아직 허용된다면 traffic을 성공 revision으로 몰고 실패 pod를 recycle합니다. old credential이 이미 폐기됐다면 provider 허용 목록을 임시 복원하되 만료 시각과 owner를 남깁니다."
          },
          {
            "q": "권한 문제로 확인되면 pipeline에는 무엇을 보강하나요?",
            "answer": "deploy identity가 secret을 읽는 dry-run check를 promotion 전에 실행하게 합니다. 실패 증거는 denied principal, resource ARN, policy version, environment를 남기고, broad wildcard 권한으로 우회하지 않습니다. 필요한 최소 권한 diff를 리뷰받은 뒤 같은 check를 재실행해 닫습니다."
          }
        ]
      },
      {
        "q": "approval gate와 change freeze 예외는 어떤 기준으로 통과시키나요?",
        "decision": "승인 gate는 사람 이름을 채우는 절차가 아니라 변경 diff, 위험 등급, freeze 여부, 검증 결과, rollback owner가 같은 결론을 가리키는지 확인하는 통제입니다. emergency release도 승인 생략이 아니라 사후 승인, 범위 제한, 만료된 예외 기록을 요구합니다.",
        "failure": "승인자가 실제 diff를 보지 않거나 freeze 예외 사유가 없으면 운영 변경 책임이 사라집니다. 긴급 배포라는 이유로 gate를 우회하면 다음 장애에서 어떤 위험을 받아들였는지 추적할 수 없습니다.",
        "evidence": "approval record, change ticket diff, freeze calendar, policy exception, rollback owner acknowledgement",
        "followups": [
          {
            "q": "승인자가 diff를 봤다는 증거는 어떻게 남겨야 하나요?",
            "answer": "approval record에는 대상 commit range, artifact digest, config diff, migration 여부, rollback plan 링크가 포함되어야 합니다. 단순한 채팅 승인만 있으면 diff review로 보기 어렵습니다. 누락된 항목이 있으면 gate를 되돌려 승인자가 실제 변경 단위를 다시 확인하게 합니다."
          },
          {
            "q": "change freeze 중 emergency release는 언제 허용하나요?",
            "answer": "사용자 피해나 보안 위험이 freeze 유지 비용보다 크고, 변경 범위가 문제 해결에 필요한 최소 단위이며, rollback owner가 대기 중일 때만 허용합니다. 예외 ticket에는 허용 시간, 적용 범위, 관측 지표, 사후 review 시각을 적고, 일반 기능 개선은 freeze 해제 뒤로 미룹니다."
          },
          {
            "q": "gate를 우회한 사실을 나중에 발견하면 어떻게 수습하나요?",
            "answer": "먼저 현재 artifact와 config가 승인된 범위 안인지 확인하고, 범위를 벗어나면 배포를 freeze하거나 이전 승인 상태로 되돌립니다. 이후 누가 어떤 권한으로 gate를 건너뛰었는지 audit log를 남기고, service account와 manual approval rule을 분리해 같은 우회가 반복되지 않게 합니다."
          }
        ]
      },
      {
        "q": "smoke test와 synthetic journey는 어떤 업무 경로를 최소로 잡아야 하나요?",
        "decision": "배포 후 최소 검증은 서버가 살아 있다는 확인이 아니라 사용자가 반드시 지나가는 업무 경로가 release marker와 함께 성공하는지 보는 것입니다. 로그인, 권한 확인, 핵심 읽기, 안전한 쓰기 또는 dry-run, 외부 의존성 호출을 서비스별 위험에 맞게 고릅니다.",
        "failure": "health endpoint만 통과하면 실제 결제, 업로드, 검색, 권한 필터 같은 경로가 깨져도 정상 배포로 보입니다. 반대로 synthetic 계정이나 테스트 데이터가 오래되면 false positive와 false negative가 섞여 배포를 불필요하게 멈춥니다.",
        "evidence": "synthetic journey result, smoke test account status, release marker, business KPI probe, dependency call trace",
        "followups": [
          {
            "q": "smoke test가 green인데 사용자 실패가 있으면 무엇을 의심하나요?",
            "answer": "synthetic journey가 너무 얕거나 test account가 실제 권한, region, tenant, data shape을 대표하지 못하는 상황을 먼저 봅니다. release marker별 실제 사용자 trace와 synthetic trace를 나란히 비교하고, synthetic이 지나지 않은 단계가 실패 지점이면 그 경로를 다음 gate에 추가합니다."
          },
          {
            "q": "false alarm을 줄이려면 어떤 조건을 고정하나요?",
            "answer": "테스트 계정 상태, fixture 데이터 만료, 외부 dependency stub 여부, retry policy, alert threshold를 고정합니다. 한 번 실패한 probe만으로 rollback하지 않고 같은 release marker에서 재시도와 실제 KPI 변화를 확인합니다. 다만 쓰기 경로 실패나 권한 우회는 한 번이어도 배포를 멈춥니다."
          },
          {
            "q": "운영 인수 때 smoke 결과는 어떤 형태로 넘기나요?",
            "answer": "결과 화면 캡처보다 test id, release marker, 수행 시각, 계정/tenant, 실패 단계, trace id, 재시도 결과를 넘깁니다. 다음 담당자는 이 증거로 사용자가 실패한 업무 단계와 배포 검증 단계가 같은지 확인하고, 불일치하면 synthetic coverage gap으로 등록합니다."
          }
        ]
      },
      {
        "q": "canary와 progressive delivery는 어떤 metric gate로 멈추나요?",
        "decision": "점진 배포는 트래픽 비율을 올리는 스케줄이 아니라 release candidate가 error, latency, saturation, business journey, support signal에서 기준을 통과할 때만 다음 단계로 가는 제어입니다. abort condition은 배포 전에 숫자와 관측 창으로 정해야 합니다.",
        "failure": "평균 error rate만 보면 특정 tenant, region, browser, plan에서만 나는 장애를 놓칩니다. gate가 없거나 수동 감각으로 넘어가면 5%에서 보인 작은 회귀가 100% 전환 뒤에는 rollback 비용이 큰 장애가 됩니다.",
        "evidence": "canary dashboard, traffic split log, metric threshold, cohort error sample, abort event",
        "followups": [
          {
            "q": "canary traffic을 늘리기 전 어떤 수치가 같이 좋아야 하나요?",
            "answer": "candidate와 baseline의 error rate, p95 latency, saturation, 핵심 journey 성공률, rollback-sensitive log error가 같은 관측 창에서 비교되어야 합니다. 전체 평균이 좋아도 결제 tenant나 특정 region에서 악화되면 traffic을 늘리지 않고 해당 cohort만 분리합니다."
          },
          {
            "q": "abort condition이 걸리면 원인 분석 전에 무엇을 하나요?",
            "answer": "traffic split을 직전 안정 비율이나 0%로 되돌리고, candidate revision의 로그와 trace를 보존합니다. 원인 분석은 그 뒤입니다. 자동 rollback이 실행됐다면 rollback event, metric threshold, affected cohort, 남은 traffic 비율을 즉시 기록해 다음 배포가 같은 기준을 재사용하게 합니다."
          },
          {
            "q": "canary가 성공했는데 full rollout에서 실패하면 무엇이 빠진 건가요?",
            "answer": "canary cohort가 운영 부하, tenant 다양성, cache warm 상태, batch job, quota 한계를 대표하지 못했을 가능성이 큽니다. full rollout 실패 샘플을 cohort 속성으로 나누고, 다음 배포에는 traffic percentage뿐 아니라 tenant class나 region 단계도 gate로 추가합니다."
          }
        ]
      },
      {
        "q": "blue-green cutover는 DNS, LB, session, DB 중 무엇을 먼저 고정하나요?",
        "decision": "blue-green 판단은 새 환경이 떠 있는지보다 전환 지점과 상태 호환성이 안전한지 보는 일입니다. load balancer target, DNS TTL, sticky session, background worker, database schema compatibility, cache namespace를 cutover 전에 고정해야 합니다.",
        "failure": "새 green 환경이 health check를 통과해도 session store가 분리되거나 DB migration이 backward compatible하지 않으면 전환 직후 로그인 해제, 중복 처리, writer 충돌이 납니다. DNS/LB 전환이 섞이면 일부 사용자는 old와 new를 오가며 재현이 어려워집니다.",
        "evidence": "LB target group state, DNS TTL, session store compatibility, migration compatibility check, cutover event log",
        "followups": [
          {
            "q": "cutover 직전 green 환경은 어떤 업무 상태를 증명해야 하나요?",
            "answer": "green은 health endpoint뿐 아니라 schema read/write compatibility, session validation, queue consumer pause 상태, cache key namespace, downstream credential을 증명해야 합니다. 이 증거가 없으면 LB 전환은 성공해도 사용자 상태가 깨질 수 있으므로 cutover를 보류합니다."
          },
          {
            "q": "DNS 전환과 load balancer 전환 중 어떤 위험이 다르나요?",
            "answer": "DNS 전환은 resolver cache와 TTL 때문에 사용자가 두 환경에 오래 분산될 수 있고, LB 전환은 중앙에서 빠르게 되돌릴 수 있지만 target health와 connection draining에 민감합니다. 상태 공유가 약한 서비스는 DNS보다 LB cutover가 낫고, 증거는 resolver sample과 target group connection log로 남깁니다."
          },
          {
            "q": "blue에서 green으로 갔다가 되돌릴 때 DB migration은 어떻게 다루나요?",
            "answer": "application rollback과 migration rollback을 분리합니다. expand/contract 방식으로 이전 app이 새 schema를 읽을 수 있으면 traffic만 blue로 되돌립니다. destructive migration이나 data backfill이 이미 실행됐다면 rollback 대신 forward fix 또는 write freeze를 선택하고, decision log에 schema version과 data repair plan을 남깁니다."
          }
        ]
      },
      {
        "q": "rollback은 artifact, config, migration을 어떻게 나눠 실행하나요?",
        "decision": "rollback 명령은 하나가 아니라 되돌릴 표면별로 다릅니다. artifact rollback, config rollback, feature flag disable, database migration strategy, queue replay, cache invalidation을 분리해야 어떤 조치가 사용자 피해를 줄이고 어떤 조치가 데이터를 위험하게 만드는지 판단할 수 있습니다.",
        "failure": "모든 문제를 이전 image로 되돌리면 config drift나 migration failure는 그대로 남고, 이미 쓴 데이터와 이전 코드가 맞지 않아 더 큰 장애가 납니다. 반대로 migration부터 되돌리면 실행 중인 새 코드가 사라진 column을 참조할 수 있습니다.",
        "evidence": "rollback runbook, previous artifact digest, config version history, migration status, feature flag audit, data repair note",
        "followups": [
          {
            "q": "artifact rollback과 config rollback 중 무엇을 먼저 하나요?",
            "answer": "증상이 새 binary에서만 발생하고 config가 동일하면 artifact를 이전 digest로 되돌립니다. 새 config가 이전 binary에도 영향을 주는 값이면 config rollback이나 flag disable을 먼저 해야 합니다. 판단 증거는 release diff와 runtime config readback이며, 둘 다 바뀌었으면 더 작은 blast radius를 가진 조치부터 실행합니다."
          },
          {
            "q": "migration이 포함된 release는 되돌림 기준이 어떻게 달라지나요?",
            "answer": "schema가 backward compatible하면 app rollback은 가능하지만 migration rollback은 보류할 수 있습니다. destructive change, data transform, long-running backfill이 있으면 rollback보다 write stop, forward migration, data repair가 안전할 수 있습니다. runbook에는 `safe to rerun`, `safe to reverse`, `manual approval required`를 migration별로 표시합니다."
          },
          {
            "q": "rollback 뒤 정상화는 어떤 증거로 닫나요?",
            "answer": "이전 artifact digest가 실제 runtime에 올라갔는지, config version이 기대값인지, error와 business journey가 release marker 기준으로 회복됐는지 확인합니다. 데이터 보정이 남으면 장애 종료와 별도 follow-up으로 분리하고, rollback 명령 출력과 검증 쿼리를 incident에 붙입니다."
          }
        ]
      },
      {
        "q": "deploy marker는 logs, metrics, traces에 어떻게 남겨야 하나요?",
        "decision": "배포 marker는 대시보드 장식이 아니라 장애 증상을 release candidate와 연결하는 join key입니다. 로그, metric label, trace attribute, error event, synthetic result에 같은 release id, commit, digest, environment가 남아야 배포 전후 차이를 빠르게 자를 수 있습니다.",
        "failure": "marker가 한 도구에만 있으면 error spike가 release 때문인지 traffic, dependency, config 때문인지 늦게 갈립니다. label cardinality를 무시하고 commit 전체를 metric label로 넣으면 비용과 성능 문제가 생기고, trace에는 marker가 없어 사용자 단위 재현이 끊깁니다.",
        "evidence": "release marker label, log field sample, metric annotation, trace attribute, error tracking release id",
        "followups": [
          {
            "q": "marker가 없으면 배포 관련 장애를 어떻게 임시로 좁히나요?",
            "answer": "deploy event 시각, runtime digest, instance start time, config version을 이용해 대체 타임라인을 만듭니다. 다만 이것은 임시 판단이므로 incident 종료 전에 application log와 trace에 release id를 자동 삽입하도록 backlog를 만들고, 다음 배포부터 marker 누락을 gate failure로 둡니다."
          },
          {
            "q": "metric label에 release 정보를 넣을 때 주의할 점은 무엇인가요?",
            "answer": "고카디널리티 값을 무제한 label로 넣지 않습니다. 짧은 release id나 rollout stage는 metric label로 두고, full commit SHA와 artifact digest는 trace/log field나 exemplars로 연결합니다. 비용 경고가 보이면 metric annotation으로 전환하고 query에서 deploy event와 join합니다."
          },
          {
            "q": "observability 인수인계에는 marker 예시를 어떻게 붙이나요?",
            "answer": "성공 요청 trace, 실패 요청 trace, error event, latency metric annotation, log query를 같은 release id로 묶어 넘깁니다. 다음 담당자는 이 묶음으로 배포 직후 증상과 이전 baseline을 비교하고, marker가 없는 신호는 instrumentation gap으로 따로 등록합니다."
          }
        ]
      },
      {
        "q": "pipeline 권한과 runner isolation은 어디를 trust boundary로 보나요?",
        "decision": "CI runner는 코드를 실행하는 컴퓨트와 배포 권한이 만나는 경계입니다. pull request job, protected branch job, production deploy job의 token scope, secret exposure, runner tenancy, artifact write 권한을 분리해야 합니다.",
        "failure": "untrusted PR이 production token이나 signing key에 접근하면 supply-chain 사고가 됩니다. self-hosted runner가 재사용되거나 workspace cleanup이 약하면 이전 job의 credential과 artifact가 다음 job에 남을 수 있습니다.",
        "evidence": "CI token permission matrix, runner group policy, job OIDC claim, secret exposure rule, workspace cleanup log",
        "followups": [
          {
            "q": "PR job과 production deploy job의 권한은 어떻게 나눠야 하나요?",
            "answer": "PR job은 read-only token과 non-production secret 없이 검증만 수행하고, production deploy는 protected branch, reviewed workflow, environment approval 뒤에 짧은 수명의 OIDC credential을 받아야 합니다. 같은 token이 build와 deploy를 모두 할 수 있으면 artifact 변조와 배포가 한 경로로 묶입니다."
          },
          {
            "q": "self-hosted runner를 쓸 때 가장 먼저 확인할 격리는 무엇인가요?",
            "answer": "runner group이 repository와 environment별로 분리되어 있는지, job마다 clean workspace가 보장되는지, network egress와 metadata endpoint 접근이 제한되는지 확인합니다. 실패 증거는 남은 workspace 파일, reused credential, unexpected outbound connection이며, 발견되면 runner를 격리하고 token을 rotate합니다."
          },
          {
            "q": "권한 사고 뒤 pipeline을 다시 열기 전 조건은 무엇인가요?",
            "answer": "노출 가능성이 있는 CI token, deploy key, signing key를 rotate하고, 어떤 job이 어떤 secret에 접근했는지 audit log를 재구성해야 합니다. production deploy 재개 전에는 least-privilege permission matrix와 environment protection rule이 적용됐는지 dry-run으로 확인합니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-runtime-orchestration-qa",
    "title": "컨테이너·오케스트레이션·Health Check Q&A",
    "source": "컨테이너·오케스트레이션·Health Check",
    "subtitle": "런타임 오케스트레이션에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "실행 중인 pod가 기대한 image digest로 떠 있는지 어떻게 확정하나요?",
        "decision": "운영 판단은 이미지 태그가 아니라 실행 중인 컨테이너의 immutable digest가 배포 artifact와 같은지 확인하는 일입니다. `spec.containers[].image`의 tag, `status.containerStatuses[].imageID`, registry manifest digest, rollout revision을 같은 release id로 묶어야 실제로 어떤 바이너리가 사용자 트래픽을 처리하는지 확정할 수 있습니다.",
        "failure": "tag를 신뢰하면 mutable tag, node image cache, multi-arch manifest 차이, 이전 ReplicaSet 잔존을 놓칩니다. 같은 Deployment revision 안에서 pod별 `imageID`가 다르면 일부 pod만 이전 코드나 다른 architecture 이미지를 실행할 수 있고, 문제 재현이 요청을 받은 pod에 따라 달라집니다.",
        "evidence": "pod containerStatuses imageID, deployment template image, registry manifest digest, rollout revision, admission/deploy log",
        "followups": [
          {
            "q": "태그는 같은데 pod별 digest가 다르면 어떻게 판단하나요?",
            "answer": "`kubectl get pod -o jsonpath`로 각 container의 `imageID`를 뽑아 ReplicaSet, node, rollout revision별로 묶습니다. 정상은 모든 새 pod가 같은 sha256 digest를 가리키고 이전 ReplicaSet만 다른 digest를 갖는 경우입니다. 새 ReplicaSet 내부에서 digest가 갈라지면 rollout을 멈추고 registry tag 변경 이력과 admission log를 확인한 뒤, 원하는 digest를 명시해 재배포합니다."
          },
          {
            "q": "registry digest와 runtime imageID가 다를 수 있는 정상 조건은 무엇인가요?",
            "answer": "multi-arch manifest를 쓰면 tag digest와 node가 실제로 받은 platform-specific image digest가 다르게 보일 수 있습니다. 이 경우 판단 기준은 manifest list 안에 runtime digest가 포함되는지, node architecture와 platform이 배포 의도와 맞는지입니다. 목록에 없는 digest이거나 architecture가 다르면 image pull policy와 registry mirror를 확인하고 해당 node의 pod를 교체합니다."
          },
          {
            "q": "이미지 정체성 확인 결과는 인수인계에 어떻게 남기나요?",
            "answer": "release id, expected digest, 실제 pod별 `imageID`, 이전 ReplicaSet의 잔존 pod 수, registry manifest 조회 결과를 한 표로 남깁니다. 다음 담당자가 같은 결론을 재현하려면 명령 출력과 조회 시각이 필요합니다. digest 불일치가 있었다면 tag 재사용 금지, digest pinning, admission policy 차단 조건을 후속 조치로 연결합니다."
          }
        ]
      },
      {
        "q": "entrypoint나 command 변경 뒤 CrashLoop가 나면 어디서 시작 실패를 가르나요?",
        "decision": "먼저 컨테이너 프로세스가 생성되지 못한 실패와 앱 프로세스가 뜬 뒤 부팅 중 종료된 실패를 분리합니다. `waiting.reason`, `lastState.terminated.exitCode`, command/args, working directory, shell 존재 여부, `logs --previous`가 이 경계를 정합니다.",
        "failure": "entrypoint 자체가 틀린데 앱 로그만 찾으면 `exec format error`, 권한 없음, 잘못된 working directory를 놓칩니다. 반대로 앱 부팅 실패를 entrypoint 문제로 보면 database migration, config parse, dependency timeout 같은 실제 원인을 되돌리지 못합니다.",
        "evidence": "pod status waiting reason, lastState terminated exitCode, container command/args, previous logs, image filesystem inspection",
        "followups": [
          {
            "q": "컨테이너가 시작도 못 한 증거는 무엇인가요?",
            "answer": "`CreateContainerConfigError`, `RunContainerError`, `exec format error`, `permission denied`, `no such file or directory`가 event나 waiting reason에 있으면 앱 코드 실행 전 실패입니다. 이때는 애플리케이션 로그가 비는 것이 정상 증상입니다. 다음 조치는 image 안의 binary 경로와 executable bit를 확인하고, command/args 변경을 되돌린 새 revision을 최소 replica로 검증하는 것입니다."
          },
          {
            "q": "앱 부팅 실패와 entrypoint 실패가 섞일 때는 어떤 순서로 보나요?",
            "answer": "먼저 `startedAt`이 찍혔는지와 `logs --previous` 첫 줄이 앱 logger인지 확인합니다. 앱 로그가 남고 exit code가 1이면 config, migration, dependency 연결을 봅니다. 시작 시각이 없거나 kubelet event만 있으면 runtime 실행 실패로 보고 image와 command를 우선 되돌립니다."
          },
          {
            "q": "entrypoint 변경 리뷰에서 승인 차단 조건은 무엇인가요?",
            "answer": "새 command가 readiness 전까지 foreground로 유지되는지, signal을 PID 1에서 처리하는지, required env와 volume 경로를 읽는지 확인되지 않으면 승인을 막습니다. 증거는 staging pod의 `ps`, SIGTERM 처리 로그, graceful shutdown 시간입니다. 누락되면 배포 전에 wrapper script를 줄이거나 tini 같은 init 처리 방식을 명시합니다."
          }
        ]
      },
      {
        "q": "readiness probe는 트래픽 수신 가능성과 dependency health를 어떻게 나눠야 하나요?",
        "decision": "readiness는 pod가 Service endpoint로 들어가도 되는지 결정하는 gate입니다. 앱 process 생존, 필수 local 준비, 외부 dependency 접근 가능성을 한 endpoint에 모두 넣을지 분리할지 정해야 하며, 장애 중에는 EndpointSlice에서 빠진 pod와 앱 자체 오류를 구분해야 합니다.",
        "failure": "readiness가 너무 얕으면 준비 안 된 pod가 트래픽을 받아 5xx를 만들고, 너무 깊으면 외부 dependency 지연 때 모든 pod가 endpoint에서 빠져 전체 중단처럼 보입니다. liveness와 같은 endpoint를 쓰면 일시적인 dependency 오류가 재시작 루프로 번질 수 있습니다.",
        "evidence": "pod Ready condition, EndpointSlice membership, readiness probe event, app health endpoint response, target group health",
        "followups": [
          {
            "q": "readiness 실패가 사용자 트래픽에 영향을 줬는지 어떻게 확인하나요?",
            "answer": "실패 시각의 EndpointSlice membership, Service endpoint 수, load balancer target health, 사용자 5xx를 같은 타임라인에 둡니다. endpoint 수가 줄었지만 남은 pod capacity가 충분하고 5xx가 없으면 배포 지연입니다. endpoint가 0에 가까워지거나 특정 zone에서만 빠지면 traffic shift나 rollout pause를 먼저 실행합니다."
          },
          {
            "q": "dependency check를 readiness에 넣을 때 위험한 조건은 무엇인가요?",
            "answer": "공유 dependency가 느려질 때 모든 pod가 동시에 NotReady가 되면 Service가 빈 endpoint로 바뀝니다. 판단 기준은 dependency 실패가 실제로 트래픽을 받으면 안 되는 상태인지, 아니면 degraded response로 버틸 수 있는 상태인지입니다. 캐시나 fallback이 있으면 readiness는 local 처리 가능성만 보고 dependency health는 별도 alert로 둡니다."
          },
          {
            "q": "readiness 인수인계에는 어떤 정상 샘플이 필요하나요?",
            "answer": "정상 pod의 probe 응답 body나 status code, EndpointSlice 포함 여부, Service로 들어온 실제 요청 trace를 같이 남깁니다. 단순히 `Ready=True`만 넘기면 health endpoint가 실제 사용자 path와 얼마나 가까운지 알 수 없습니다. 다음 담당자는 이 샘플로 probe endpoint 변경이나 dependency 분리 필요성을 판단합니다."
          }
        ]
      },
      {
        "q": "liveness probe가 재시작 루프를 만든 것인지 실제 hang을 잡은 것인지 어떻게 구분하나요?",
        "decision": "liveness는 죽은 process를 교체하는 장치이므로, 장애 중에는 restart가 원인 완화인지 오탐 증폭인지 먼저 가릅니다. `Liveness probe failed` event, restart count 증가 속도, 이전 로그 종료 지점, probe timeout과 앱 pause 시간을 비교해야 합니다.",
        "failure": "liveness가 dependency나 긴 GC pause에 민감하면 정상 회복 가능한 pod를 계속 죽여 cold start 폭풍을 만듭니다. 반대로 너무 느슨하면 deadlock이나 stuck worker가 Service endpoint에 남아 요청을 계속 잡아먹습니다.",
        "evidence": "Liveness probe failed events, restartCount delta, logs --previous, probe timeout/failureThreshold, app thread or event-loop metrics",
        "followups": [
          {
            "q": "probe 오탐이 의심될 때 즉시 완화는 무엇인가요?",
            "answer": "재시작이 사용자 오류율을 낮추지 못하고 cold start latency만 늘리면 failureThreshold나 timeout을 임시로 늘리고 rollout을 멈춥니다. 증거는 restart 전후 5xx, pod age 분포, probe latency입니다. 완화 뒤 restart 속도가 줄지만 요청 실패가 남으면 probe가 아니라 앱 내부 hang을 계속 추적합니다."
          },
          {
            "q": "liveness endpoint에 넣으면 안 되는 검사는 무엇인가요?",
            "answer": "DB, message broker, 외부 API처럼 일시 실패가 process 생존과 다를 수 있는 검사는 liveness에서 제외합니다. 이 검사를 넣으면 shared dependency 장애가 전체 pod 재시작으로 확대됩니다. liveness에는 event loop 응답성, deadlock 감지, local process 상태만 두고 dependency 문제는 readiness나 별도 metric으로 처리합니다."
          },
          {
            "q": "재시작 루프 원인 기록에는 어떤 값이 필요하나요?",
            "answer": "pod별 restart count 증가량, 마지막 종료 exit code, `logs --previous` 마지막 메시지, probe 설정값, kubelet event timestamp를 함께 남깁니다. 재시작이 특정 node나 revision에 몰리면 node pressure 또는 새 코드 문제로 좁힙니다. 모든 node에서 같은 주기로 발생하면 probe 설정과 앱 pause 시간을 먼저 비교합니다."
          }
        ]
      },
      {
        "q": "startup probe는 느린 부팅과 죽은 프로세스를 어떻게 나누나요?",
        "decision": "startup probe는 앱이 초기화되는 동안 liveness와 readiness 판단을 늦추는 장치입니다. 판단 기준은 허용 부팅 시간 안에서 process가 진전 신호를 내는지, 아니면 같은 지점에서 멈추거나 종료되는지입니다.",
        "failure": "startup window가 짧으면 cold start, schema migration, cache warm-up을 실패로 보고 pod를 계속 재시작합니다. 너무 길면 죽은 process가 오래 남아 rollout이 멈추고, 실제 복구 시간이 늘어납니다.",
        "evidence": "startup probe event, container startedAt, boot phase log, migration/cache warm-up duration, failureThreshold and periodSeconds",
        "followups": [
          {
            "q": "startup probe 시간을 정할 때 어떤 기준을 쓰나요?",
            "answer": "p95 cold start, migration 최대 시간, image pull 이후 앱 첫 ready 로그까지의 시간을 기준으로 `failureThreshold * periodSeconds`를 잡습니다. 정상 기준은 느린 node에서도 초기화 단계가 순서대로 진행되는 것입니다. 같은 로그 지점에서 멈추면 시간을 늘리지 말고 deadlock, config wait, dependency retry 폭증을 조사합니다."
          },
          {
            "q": "느린 부팅이 rollout 장애로 번지는 신호는 무엇인가요?",
            "answer": "새 pod가 startup 구간에서 오래 머물고 old pod가 maxUnavailable 때문에 줄어들면 capacity가 빠르게 감소합니다. 증거는 rollout status, 새 ReplicaSet available 수, startup 실패 event, request latency입니다. 이때는 rollout pause와 surge 조정을 먼저 검토하고, startup 시간을 늘리는 결정은 부팅 로그가 계속 진전될 때만 합니다."
          },
          {
            "q": "startup probe와 readiness probe의 역할은 어떻게 문서화하나요?",
            "answer": "startup은 초기화 완료 전 재시작 보호, readiness는 트래픽 수신 가능 여부로 분리해 적습니다. 문서에는 각 endpoint가 보는 dependency, expected response, timeout, 실패 시 action을 남깁니다. 두 probe가 같은 endpoint를 쓰더라도 실패 해석과 조치가 다르면 runbook에서 별도 분기로 둡니다."
          }
        ]
      },
      {
        "q": "resource request와 limit 변경은 배포 전 어떤 위험을 계산해야 하나요?",
        "decision": "request는 scheduler가 pod를 놓을 수 있는지와 node 자원 예약을 결정하고, limit은 cgroup에서 CPU throttling과 memory kill 경계를 만듭니다. 배포 전에는 scheduling 가능성, QoS class, node allocatable, autoscaler 반응, limit 대비 실제 사용량을 함께 봅니다.",
        "failure": "request를 낮추면 배포는 쉬워 보이지만 node 압축과 latency 경쟁이 늘 수 있습니다. limit을 낮추면 CPU는 throttling으로 느려지고 memory는 OOMKilled로 종료됩니다. request와 limit을 같은 값으로 맞추는 것이 항상 안정적인 것도 아니며, burst workload에서는 오히려 지연을 키웁니다.",
        "evidence": "pod requests/limits, node allocatable, scheduler FailedScheduling event, QoS class, VPA recommendation, cgroup usage metrics",
        "followups": [
          {
            "q": "request 변경이 scheduling 실패를 만들지 어떻게 미리 보나요?",
            "answer": "현재 replica 수에 새 request를 곱해 zone별 node allocatable과 비교하고, topology spread와 anti-affinity까지 적용한 여유를 봅니다. `FailedScheduling` 예측이 보이면 HPA나 rollout surge가 필요한 순간에 pod가 Pending으로 쌓입니다. 다음 조치는 node pool 증설, rollout surge 축소, request 단계적 변경 중 하나입니다."
          },
          {
            "q": "limit 변경은 어떤 신호가 보이면 승인하지 않나요?",
            "answer": "CPU 사용량이 limit 근처에 자주 붙고 throttled time이 이미 증가 중이면 limit 하향은 승인하지 않습니다. memory working set이 limit에 가깝거나 GC pressure가 높으면 OOM 위험이 있습니다. 증거가 애매하면 canary에서 limit만 바꾸고 latency, throttle, restart reason을 기존 pod와 비교합니다."
          },
          {
            "q": "request와 limit 조정 결과는 어떻게 닫나요?",
            "answer": "변경 전후 Pending pod 수, node bin-packing 변화, throttled seconds, memory peak, restart reason을 같은 배포 기록에 붙입니다. 결과가 좋아 보여도 특정 tenant나 batch 시간대에서 peak가 남으면 완료로 보지 않습니다. 후속 조치는 VPA recommendation과 실제 SLO 변화를 다음 capacity review에 연결하는 것입니다."
          }
        ]
      },
      {
        "q": "CPU throttling이 latency 증가의 원인인지 어떤 증거로 확인하나요?",
        "decision": "CPU throttling 판단은 limit에 걸려 runnable work가 밀렸는지 확인하는 일입니다. container CPU 사용률만 보지 말고 cgroup throttle 시간, quota/period, latency percentile, request queue 또는 event-loop lag를 같은 window로 비교합니다.",
        "failure": "사용률이 낮아 보여도 quota가 짧은 burst를 잘라 tail latency를 만들 수 있습니다. 반대로 latency가 느리다는 이유만으로 CPU limit을 올리면 lock contention, downstream wait, GC pause 같은 원인을 가립니다.",
        "evidence": "container_cpu_cfs_throttled_seconds_total, CPU quota and period, request latency percentile, event-loop lag or run queue, pod CPU limit",
        "followups": [
          {
            "q": "throttling과 latency를 같은 사건으로 묶는 기준은 무엇인가요?",
            "answer": "throttled seconds 증가가 p95/p99 latency 상승보다 먼저 또는 같은 시각에 나타나고, 해당 pod의 request queue나 event-loop lag도 같이 늘어야 합니다. 특정 pod만 그러면 limit 대비 workload skew를 보고, 전체 pod가 동시에 그러면 배포 후 traffic 또는 HPA 반응 지연을 봅니다."
          },
          {
            "q": "CPU limit을 올리기 전 확인할 실패 모드는 무엇인가요?",
            "answer": "node CPU pressure가 이미 높으면 limit 상향이 다른 pod를 밀어내거나 autoscaler 비용을 키울 수 있습니다. 판단 기준은 node allocatable 여유, request 대비 실제 사용량, 같은 node의 다른 workload 지연입니다. 여유가 없으면 limit 상향보다 replica 분산, node pool 확장, hot path 최적화를 먼저 선택합니다."
          },
          {
            "q": "throttling 완화 뒤 어떤 증거로 종료하나요?",
            "answer": "limit 또는 replica 변경 뒤 throttled time 비율이 떨어지고 p99 latency와 error rate가 같은 window에서 회복되어야 합니다. CPU 사용량만 낮아진 것은 종료 증거가 아닙니다. runbook에는 바꾼 limit, 적용 revision, 비교 dashboard link, 남은 node pressure 여부를 남깁니다."
          }
        ]
      },
      {
        "q": "OOMKilled와 memory leak 의심은 어떤 순서로 증거를 모으나요?",
        "decision": "먼저 restart reason이 실제 `OOMKilled`인지, container limit에 걸린 것인지, node pressure eviction인지 구분합니다. 그 다음 working set, RSS/heap, allocation rate, GC 로그, traffic shape를 배포 전후로 비교해 leak, burst, cache growth를 나눕니다.",
        "failure": "exit code 137만 보고 leak로 단정하면 limit 부족, sidecar 증가, batch peak, node eviction을 놓칩니다. limit만 올리면 leak가 더 늦게 터져 blast radius가 커지고, 재시작으로 증거가 사라질 수 있습니다.",
        "evidence": "lastState terminated reason OOMKilled, exitCode 137, memory working set, heap/profile sample, GC log, node memory pressure event",
        "followups": [
          {
            "q": "container OOM과 node eviction은 어떻게 다르게 보나요?",
            "answer": "container OOM은 `lastState.terminated.reason=OOMKilled`와 해당 container limit 근처의 working set이 같이 보입니다. node eviction은 pod status reason, kubelet event, node memory pressure가 중심 증거입니다. container OOM이면 limit과 heap을 보고, eviction이면 node pool pressure와 다른 pod eviction을 함께 조사합니다."
          },
          {
            "q": "leak 의심을 뒷받침하는 최소 증거는 무엇인가요?",
            "answer": "traffic이 안정적인데 pod age가 늘수록 working set이나 heap이 계단식으로 증가하고 GC 뒤에도 내려오지 않아야 합니다. rollout 이후 같은 code path에서만 증가하면 새 revision 후보가 강합니다. heap dump나 allocation profile을 얻기 전에는 replica 교체 주기를 줄여 피해를 낮추고, 증거 보존용 pod를 하나 격리합니다."
          },
          {
            "q": "OOM 완화 뒤 limit 상향만으로 끝내면 안 되는 이유는 무엇인가요?",
            "answer": "limit 상향은 재시작을 늦출 뿐 원인이 leak이면 누적 사용량은 계속 증가합니다. 종료 기준은 OOM 재발 없음, memory slope 안정, heap/profile 원인 제거, SLO 회복이 함께 충족되는 것입니다. 후속 조치에는 alert threshold, heap dump 절차, release rollback 조건을 남깁니다."
          }
        ]
      },
      {
        "q": "rolling update 전략은 언제 멈추고 언제 되돌리나요?",
        "decision": "rollout 판단은 `maxUnavailable`, `maxSurge`, readiness 통과 속도, 새/이전 revision 비율, 사용자 SLO 변화를 함께 보는 일입니다. 멈춤은 추가 확산을 막는 선택이고, 되돌림은 새 revision을 traffic path에서 빼는 선택이므로 조건을 분리해야 합니다.",
        "failure": "surge가 부족하면 capacity가 줄고, maxUnavailable이 크면 불량 revision이 빠르게 전체로 퍼집니다. readiness가 얕으면 rollout은 성공으로 보이지만 사용자 path가 실패하고, revision이 섞이면 증상이 pod 선택에 따라 달라집니다.",
        "evidence": "kubectl rollout status/history, ReplicaSet desired/available counts, maxUnavailable/maxSurge, revision labels, SLO/error dashboard",
        "followups": [
          {
            "q": "rollout pause를 걸어야 하는 신호는 무엇인가요?",
            "answer": "새 revision pod에서만 readiness 지연, restart, latency 상승이 보이면 즉시 pause로 확산을 막습니다. 이때 이전 revision capacity가 충분하면 분석 시간을 벌 수 있습니다. 증거는 revision label별 error rate, available pod 수, rollout event이며, pause 뒤에도 사용자 오류가 늘면 rollback을 검토합니다."
          },
          {
            "q": "maxUnavailable과 maxSurge는 어떤 운영 tradeoff를 만드나요?",
            "answer": "maxUnavailable을 낮추면 가용성은 지키지만 rollout이 느려지고 node 여유가 부족하면 Pending이 생깁니다. maxSurge를 높이면 빠른 검증이 가능하지만 resource pressure가 늘 수 있습니다. 판단 기준은 새 pod가 준비되는 시간, node 여유, old revision을 얼마나 오래 유지해야 하는지입니다."
          },
          {
            "q": "revision skew가 남은 상태에서 정상 선언을 막는 조건은 무엇인가요?",
            "answer": "old/new revision이 동시에 traffic을 받는데 error나 latency가 revision별로 분리되지 않으면 정상 선언을 보류합니다. 최소 증거는 revision label이 붙은 access log, pod별 request 분포, rollback marker입니다. skew가 길어지면 canary 비율을 고정하고 실험군과 대조군 SLO를 따로 닫습니다."
          }
        ]
      },
      {
        "q": "PDB와 node drain은 유지보수 중 가용성 예산을 어떻게 지키나요?",
        "decision": "PDB는 voluntary disruption 중 동시에 내려가도 되는 pod 수를 제한합니다. node drain 전에는 `disruptionsAllowed`, replica 배치, topology spread, rollout 상태를 보고 eviction이 진행 가능한지와 진행하면 남는 capacity가 충분한지 판단합니다.",
        "failure": "PDB가 너무 엄격하면 drain이 멈춰 유지보수가 실패하고, 너무 느슨하면 여러 pod가 같은 zone이나 node group에서 빠져 사용자 capacity가 줄어듭니다. PDB가 있다고 해도 readiness가 부정확하면 실제 가용성을 보호하지 못합니다.",
        "evidence": "PDB disruptionsAllowed, kubectl drain/eviction event, replica and zone distribution, readiness condition, node maintenance plan",
        "followups": [
          {
            "q": "drain 전에 PDB가 막힐지 어떻게 예측하나요?",
            "answer": "`kubectl get pdb`의 allowed disruptions와 현재 ready replica 수를 확인하고, drain 대상 node에 같은 workload pod가 몇 개 있는지 봅니다. allowed 값이 0이면 eviction은 거절될 가능성이 큽니다. 다음 조치는 replica를 늘리거나 rollout을 끝내거나 유지보수 순서를 바꿔 budget을 회복시키는 것입니다."
          },
          {
            "q": "eviction 실패와 app 장애는 어떻게 다르게 대응하나요?",
            "answer": "eviction 실패는 PDB나 finalizer, termination grace, local storage 제한 같은 orchestration 문제입니다. app 장애는 eviction 후 남은 pod가 traffic을 처리하지 못하는 문제입니다. 전자는 drain 로그와 event로 maintenance plan을 조정하고, 후자는 readiness와 capacity를 보고 drain을 중단합니다."
          },
          {
            "q": "PDB 설정 리뷰에서 흔한 실패 모드는 무엇인가요?",
            "answer": "selector가 workload와 맞지 않거나, minAvailable이 replica 수와 같아서 drain이 항상 막히거나, 여러 deployment가 같은 dependency를 공유하는데 각각만 보호하는 경우입니다. 증거는 PDB selector match 결과, replica count, zone별 pod 분포입니다. 리뷰 후에는 유지보수 dry-run 결과를 runbook에 붙입니다."
          }
        ]
      },
      {
        "q": "ConfigMap과 Secret 변경은 stale config와 hot reload를 어떻게 검증하나요?",
        "decision": "config 변경 판단은 새 resourceVersion이 pod 안에서 실제로 읽혔는지 확인하는 일입니다. env var 주입은 pod 재시작이 필요하고, volume mount는 파일이 갱신되어도 앱이 다시 읽어야 하며, checksum annotation rollout은 의도한 재시작 경로를 만들어야 합니다.",
        "failure": "ConfigMap이나 Secret만 바꾸고 pod가 그대로면 env 기반 앱은 이전 값을 계속 씁니다. hot reload가 있다고 해도 process가 파일 descriptor를 붙잡고 있거나 reload 실패를 삼키면 일부 pod만 stale config로 남습니다.",
        "evidence": "ConfigMap/Secret resourceVersion, pod env or mounted file timestamp, checksum annotation, app reload log, rollout revision",
        "followups": [
          {
            "q": "config 변경 뒤 pod 재시작이 필요한지 어떻게 판단하나요?",
            "answer": "값이 env var로 주입되면 running process는 새 값을 자동으로 보지 못하므로 rollout restart나 checksum annotation 변경이 필요합니다. volume mount면 kubelet이 파일을 갱신하지만 앱 reload가 별도일 수 있습니다. 판단 증거는 pod spec 주입 방식, process가 읽은 config version log, mount 파일 timestamp입니다."
          },
          {
            "q": "Secret rotation에서 dual-read가 필요한 경우는 언제인가요?",
            "answer": "downstream credential이 한 번에 바뀌지 않거나 connection pool이 오래 살아 있으면 새 Secret만 배포하면 일부 요청이 인증 실패를 냅니다. dual-read는 이전 값과 새 값을 동시에 허용하는 짧은 전환 구간입니다. 증거는 auth failure rate, Secret version, connection 재생성 로그이며, 종료 조건은 이전 credential 사용량이 0이 되는 시각입니다."
          },
          {
            "q": "stale config가 일부 pod에만 남았는지 어떻게 찾나요?",
            "answer": "pod별 config version endpoint, reload log, mounted file checksum, rollout revision을 비교합니다. 같은 ReplicaSet 안에서 version이 갈라지면 hot reload 실패나 파일 감시 누락입니다. 조치는 affected pod만 재시작해 사용자 영향을 줄이고, reload 실패를 alert로 노출하도록 앱 로그 형식을 보강하는 것입니다."
          }
        ]
      },
      {
        "q": "kubectl describe, events, logs를 어떤 순서로 엮어 장애 타임라인을 만드나요?",
        "decision": "runtime 판독은 한 명령의 출력이 아니라 사건 순서를 재구성하는 일입니다. deploy event, scheduler decision, image pull, container start, probe failure, restart, node pressure, app log를 timestamp로 정렬해야 orchestration 문제와 앱 문제를 분리할 수 있습니다.",
        "failure": "현재 로그만 보면 재시작 전 원인이 사라지고, describe만 보면 앱 내부 실패를 kubelet 이벤트로만 해석할 수 있습니다. event retention이 짧거나 clock skew가 있으면 사건 순서가 뒤집혀 잘못된 rollback이나 node 조치를 선택할 수 있습니다.",
        "evidence": "kubectl describe pod, namespace events sorted by timestamp, current and previous container logs, rollout revision, node condition event",
        "followups": [
          {
            "q": "처음 5분 안에 모을 최소 증거는 무엇인가요?",
            "answer": "대상 pod의 describe, namespace event 정렬 출력, `logs --previous`, 현재 로그, rollout revision, node condition을 먼저 저장합니다. 재시작이 계속되면 이전 로그가 덮이기 전에 보존하는 것이 우선입니다. 증거 저장 뒤에야 rollout pause, pod 격리, node cordon 중 어떤 완화가 맞는지 결정합니다."
          },
          {
            "q": "events와 logs가 서로 다른 원인을 가리키면 무엇을 믿나요?",
            "answer": "먼저 timestamp와 대상 container를 맞춥니다. event가 `BackOff`만 말하고 previous log가 config parse 실패를 보여주면 앱 로그가 더 직접적인 원인입니다. event가 image pull, failed mount, probe failure를 보여주고 앱 로그가 비어 있으면 kubelet 단계 증거가 더 강합니다."
          },
          {
            "q": "타임라인을 runbook에 남길 때 형식은 어떻게 잡나요?",
            "answer": "각 줄을 `시각 - 계층 - 증거 - 판단 - 조치`로 남깁니다. 예를 들어 rollout revision 변경, image pull 완료, readiness 실패, previous log의 exception, rollout pause 시각을 분리합니다. 다음 장애에서 같은 명령을 반복할 수 있도록 raw output link와 필터 조건을 함께 붙입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-iac-change-qa",
    "title": "IaC·변경관리·Drift Q&A",
    "source": "IaC·변경관리·Drift",
    "subtitle": "IaC 변경 원장에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "Terraform plan에서 create, update, delete, replace를 어떻게 운영 위험으로 읽나요?",
        "decision": "plan 리뷰의 결정은 변경을 승인할지, 범위를 줄일지, 적용을 중단할지 고르는 일입니다. create, update, delete, replace를 리소스 종류와 의존 경로에 묶어 읽어야 단순 diff가 아니라 blast radius를 판단할 수 있습니다.",
        "failure": "replace가 destroy 뒤 재생성으로 실행되는 리소스인지 확인하지 않으면 데이터 손실, endpoint 교체, 보안 정책 공백을 배포 중에 발견합니다. delete가 의도된 정리인지 drift 보정인지 구분하지 못하면 정상 리소스를 지울 수 있습니다.",
        "evidence": "saved plan file, resource action summary, dependency graph, ticket scope, targeted diff note",
        "followups": [
          {
            "q": "create, update, delete, replace 중 어떤 항목에서 승인을 멈추나요?",
            "answer": "data store, network boundary, IAM trust, public endpoint에서 delete 또는 replace가 보이면 승인 보류가 기본입니다. ticket에 해당 리소스와 영향 시간이 없거나 plan summary와 변경 요청 범위가 다르면 apply를 막고 owner에게 의도 확인을 받습니다."
          },
          {
            "q": "replace의 blast radius는 어떻게 좁히나요?",
            "answer": "replace 대상의 downstream dependency, DNS name, security group reference, storage attachment를 그래프로 확인합니다. 불가피한 교체라면 snapshot, maintenance window, endpoint switchover, smoke test를 계획에 붙이고 `-target`은 임시 격리 근거가 있을 때만 사용합니다."
          },
          {
            "q": "plan 리뷰 결과는 어떤 형태로 남겨야 하나요?",
            "answer": "저장된 plan 파일 해시, action count, 승인한 destroy/replace 목록, 제외한 리소스, reviewer 이름, apply에 사용할 변수 파일을 한 묶음으로 남깁니다. 나중에 apply 결과가 달라지면 이 기록으로 speculative plan과 실제 apply plan 차이를 추적합니다."
          }
        ]
      },
      {
        "q": "remote state와 state lock 문제에서는 언제 적용을 중단하나요?",
        "decision": "state 판단은 lock을 누가 잡았고, 같은 backend를 누가 동시에 쓰는지 확인하는 일입니다. lock owner, operation ID, backend version, workspace를 확인한 뒤 stale lock 해제, concurrent apply 대기, state 복구 중 하나를 선택합니다.",
        "failure": "강제로 lock을 풀면 실제 apply 중인 작업의 state write를 덮어쓸 수 있습니다. remote state versioning이 없거나 backend region을 잘못 보면 오래된 state를 기준으로 plan을 만들어 리소스 삭제나 중복 생성을 유발합니다.",
        "evidence": "lock table row, backend object version, Terraform operation log, workspace name, state backup",
        "followups": [
          {
            "q": "stale lock인지 실제 apply 중인지 어떻게 구분하나요?",
            "answer": "lock row의 owner, created time, operation ID를 CI job, runner log, apply stdout과 맞춥니다. job이 살아 있거나 provider API 호출이 진행 중이면 기다리고, job이 종료됐고 backend object version도 변하지 않았다는 증거가 있을 때만 unlock 절차를 승인합니다."
          },
          {
            "q": "concurrent apply 의심 시 어떤 작업을 먼저 멈추나요?",
            "answer": "같은 workspace와 backend key를 쓰는 job을 모두 찾아 새 apply를 막고 queue를 세웁니다. 이미 apply 중인 작업은 중단보다 완료 확인이 안전할 수 있으므로, provider transaction 상태와 lock 갱신 여부를 본 뒤 추가 job만 취소합니다."
          },
          {
            "q": "state corruption 가능성이 있으면 복구 증거를 어떻게 만드나요?",
            "answer": "backend object version을 고정하고 state를 내려받아 JSON validation, resource count, 핵심 address 존재 여부를 확인합니다. 마지막 정상 version으로 복원할 때는 복원 전후 plan을 모두 저장하고, zero-diff 또는 기대 drift만 남았는지 별도 reviewer가 확인합니다."
          }
        ]
      },
      {
        "q": "provider version upgrade는 changelog와 plan 중 무엇으로 위험을 확정하나요?",
        "decision": "provider 업그레이드는 binary 교체가 아니라 schema 해석과 API 호출 방식 변경입니다. changelog의 breaking change, state schema migration, deprecated field, forced replacement 항목을 plan의 replace/update와 연결해 적용 가능 여부를 정합니다.",
        "failure": "lock file만 올리고 plan을 믿으면 provider가 기본값을 다시 계산하거나 schema를 바꿔 예기치 않은 replace를 만들 수 있습니다. downgrade가 불가능한 state migration이면 롤백 전략도 일반 배포와 달라집니다.",
        "evidence": "provider changelog, .terraform.lock.hcl diff, schema migration note, upgrade plan, provider debug log",
        "followups": [
          {
            "q": "changelog에서 어떤 문구가 apply 차단 신호인가요?",
            "answer": "removed argument, default behavior change, new validation, resource recreation, state upgrade required 같은 항목은 차단 신호입니다. 해당 resource type이 우리 plan에 있으면 sandbox workspace에서 refresh-only와 full plan을 따로 돌려 변경이 provider 해석 때문인지 코드 변경 때문인지 분리합니다."
          },
          {
            "q": "schema migration은 성공했지만 plan이 바뀌면 어떻게 판단하나요?",
            "answer": "state version이 올라간 사실과 resource field diff를 분리합니다. state만 migration되고 cloud readback이 같으면 기록 후 진행할 수 있지만, computed value가 바뀌어 replacement가 생기면 provider issue, configuration pin, staged upgrade 중 하나를 선택해야 합니다."
          },
          {
            "q": "provider upgrade 롤백 계획은 왜 별도로 쓰나요?",
            "answer": "state가 새 schema로 저장되면 단순히 lock file을 되돌려도 이전 provider가 state를 읽지 못할 수 있습니다. 그래서 upgrade 전 state backup, downgrade 가능 여부, provider pin, emergency workspace clone을 기록하고 apply 후에는 provider version과 state serial을 함께 남깁니다."
          }
        ]
      },
      {
        "q": "module version upgrade에서 interface 변경과 resource address 변경을 어떻게 분리하나요?",
        "decision": "module 업그레이드는 입력 변수 계약, output 계약, default 값, 내부 resource address가 동시에 바뀔 수 있습니다. 호출부 interface diff와 rendered plan diff를 나눠 봐야 설정 호환성 문제와 state 주소 변경 문제를 구분할 수 있습니다.",
        "failure": "module 내부 이름만 바뀐 refactor를 신규 리소스로 인식하면 기존 리소스를 지우고 다시 만들 수 있습니다. default 값 변경을 놓치면 호출부 코드는 그대로인데 보안 그룹, subnet, tag, scaling 설정이 바뀝니다.",
        "evidence": "module release note, variable/output diff, plan address diff, moved block list, module source pin",
        "followups": [
          {
            "q": "module interface가 깨졌는지 어떤 증거로 보나요?",
            "answer": "variable required 여부, type 변경, validation 추가, output 이름 변경을 release note와 `terraform validate` 결과로 확인합니다. 호출부가 값을 넘기지 않았는데 default가 바뀐 경우는 plan의 tag, port, subnet, size 변경으로 드러나므로 default diff를 별도 표로 남깁니다."
          },
          {
            "q": "resource address 변경은 언제 moved block으로 처리하나요?",
            "answer": "cloud 리소스 identity가 같고 Terraform address만 바뀐 경우 moved block이 우선입니다. old address와 new address, provider ID, plan의 destroy/create 쌍을 맞춘 뒤 moved block을 추가해 plan이 update 또는 no-op으로 바뀌는지 확인합니다."
          },
          {
            "q": "module upgrade를 한 번에 적용하지 않아야 하는 경우는 언제인가요?",
            "answer": "interface 변경, provider upgrade, resource replacement가 한 plan에 섞이면 단계 분리가 필요합니다. 먼저 module source pin만 올린 plan, moved block 보정 plan, 실제 설정 변경 plan을 나눠 저장하고 각 단계마다 cloud readback과 app smoke 결과를 붙입니다."
          }
        ]
      },
      {
        "q": "drift detection에서 콘솔 변경과 desired state 차이는 어떻게 분류하나요?",
        "decision": "drift 판단은 실제 cloud 값, state 값, code 값을 세 장으로 놓고 어느 쪽을 기준으로 복구할지 정하는 일입니다. 임시 예외, 긴급 변경, 외부 controller 변경, provider readback 차이를 분류해야 apply 방향이 정해집니다.",
        "failure": "모든 drift를 코드로 덮어쓰면 긴급 복구를 되돌릴 수 있고, 모든 콘솔 값을 받아들이면 승인되지 않은 설정이 desired state가 됩니다. refresh-only 결과를 보지 않으면 provider read bug를 운영 변경으로 오판할 수 있습니다.",
        "evidence": "drift report, refresh-only plan, cloud console audit log, desired code diff, exception ticket",
        "followups": [
          {
            "q": "허용된 예외와 무단 drift는 어떻게 가르나요?",
            "answer": "change ticket, incident timeline, console audit actor, exception expiry가 있으면 허용된 임시 예외 후보입니다. owner와 만료 시각이 없거나 보안 boundary, backup, encryption, public exposure에 닿으면 무단 drift로 분류하고 자동 apply보다 review를 먼저 엽니다."
          },
          {
            "q": "콘솔 값과 코드 값 중 어느 쪽을 채택하나요?",
            "answer": "콘솔 값이 장애 완화였고 현재 사용자 영향이 줄었다면 코드를 그 값으로 흡수하는 PR을 우선 검토합니다. 코드 값이 보안 기준이나 비용 기준을 지키는 유일한 값이면 콘솔 변경을 되돌립니다. 결정 근거는 audit log, metric 회복, policy check 결과로 남깁니다."
          },
          {
            "q": "drift 알림이 반복되면 무엇을 고쳐야 하나요?",
            "answer": "반복 drift의 원인이 external controller, provider readback noise, 사람이 만든 console edit인지 분리합니다. controller가 소유한 필드는 ignore_changes나 별도 module로 경계를 정하고, 사람의 수정이면 console 권한과 emergency runbook을 고칩니다."
          }
        ]
      },
      {
        "q": "console hotfix 뒤에는 IaC로 흡수할지 되돌릴지 어떻게 결정하나요?",
        "decision": "긴급 콘솔 수정은 장애를 줄인 임시 상태인지, 정책을 깨뜨린 우회인지 판단해야 합니다. hotfix 목적, 현재 사용자 영향, 보안 비용, 코드와 state의 차이를 보고 흡수 PR, revert apply, 별도 migration 중 하나를 고릅니다.",
        "failure": "장애 종료 뒤 hotfix를 방치하면 다음 Terraform apply가 수정값을 되돌리거나, 반대로 승인되지 않은 콘솔 값이 표준처럼 굳습니다. state만 맞추고 코드를 놓치면 다음 plan에서 같은 drift가 반복됩니다.",
        "evidence": "console audit log, incident ticket, drift plan, code PR, post-hotfix metric, security review",
        "followups": [
          {
            "q": "hotfix를 코드로 흡수해야 하는 신호는 무엇인가요?",
            "answer": "hotfix 이후 error rate, latency, availability가 회복됐고 변경값이 보안 정책과 비용 한도를 넘지 않으면 코드 흡수 후보입니다. 이때 PR에는 콘솔 변경 전후 값, incident ID, drift plan, owner 승인을 붙여 다음 apply가 같은 값을 유지하게 합니다."
          },
          {
            "q": "hotfix를 되돌려야 하는 경우는 어떻게 판정하나요?",
            "answer": "public exposure, encryption disable, audit logging off, over-permissive IAM처럼 안전 기준을 깨는 변경은 회복 효과가 있어도 되돌림 또는 대체 완화가 필요합니다. 되돌리기 전에는 snapshot, current traffic, rollback owner를 확인해 복구 조치가 새 장애를 만들지 않게 합니다."
          },
          {
            "q": "console hotfix 종료 조건은 무엇으로 닫나요?",
            "answer": "코드 PR merge, plan zero-diff 또는 의도된 diff, cloud readback, incident metric 회복, console 권한 회수까지 확인해야 닫습니다. 임시 예외가 남으면 expiry와 owner를 ticket에 남기고 다음 정기 변경에 흡수 일정을 넣습니다."
          }
        ]
      },
      {
        "q": "import block이나 state import로 기존 리소스를 편입할 때 무엇을 검증하나요?",
        "decision": "import의 결정은 cloud 리소스를 새로 만들지 않고 Terraform state에 정확한 address로 편입할 수 있는지 확인하는 일입니다. provider ID, module address, configuration parity, post-import plan을 맞춰야 기존 리소스를 관리 대상으로 바꿀 수 있습니다.",
        "failure": "잘못된 ID나 address로 import하면 다른 리소스를 state에 붙이거나, import 직후 plan이 대량 update/delete를 제안합니다. 코드가 실제 리소스 설정을 재현하지 못하면 다음 apply가 운영 값을 덮어씁니다.",
        "evidence": "import block, provider resource ID, cloud readback, state show output, post-import plan",
        "followups": [
          {
            "q": "import 전에 리소스 identity를 어떻게 고정하나요?",
            "answer": "cloud provider ID, ARN 또는 self link, region, account, tags, critical attributes를 readback으로 저장합니다. 이름만으로 import하지 않고 provider가 요구하는 canonical ID를 확인해야 같은 이름의 다른 리소스나 다른 region의 리소스를 state에 붙이는 실수를 막습니다."
          },
          {
            "q": "post-import plan이 zero-diff가 아니면 무엇을 보나요?",
            "answer": "diff가 tag나 description처럼 의도한 표준화인지, size, subnet, policy, encryption처럼 위험한 운영 값인지 나눕니다. 위험 필드가 바뀌면 configuration을 실제 값에 맞춘 뒤 다시 plan을 만들고, 표준화 diff는 별도 변경으로 승인받습니다."
          },
          {
            "q": "import 완료 뒤 state에는 어떤 증거를 남기나요?",
            "answer": "state show의 resource address와 provider ID, import block 또는 import command, zero-diff plan, cloud readback 링크를 ticket에 붙입니다. import block을 계속 둘지 제거할지도 정해야 재실행 때 같은 리소스를 다시 편입하려는 혼란을 피합니다."
          }
        ]
      },
      {
        "q": "moved block refactor에서 destroy를 막으려면 어떤 address 증거가 필요하나요?",
        "decision": "moved block은 실제 리소스 identity는 유지하고 Terraform address만 바꾸는 refactor를 선언하는 장치입니다. old address, new address, provider ID가 같은 리소스를 가리킨다는 증거가 있어야 destroy/create를 막을 수 있습니다.",
        "failure": "단순 rename을 moved block 없이 적용하면 Terraform은 old resource 삭제와 new resource 생성을 계획합니다. 반대로 실제로 다른 리소스인데 moved block으로 연결하면 state가 잘못된 대상에 붙어 이후 변경이 엉뚱한 리소스에 적용됩니다.",
        "evidence": "old state address, new module address, provider ID match, moved block diff, plan after move",
        "followups": [
          {
            "q": "old address와 new address가 같은 리소스인지 어떻게 증명하나요?",
            "answer": "`terraform state show`의 provider ID와 cloud readback ID를 old address에서 확인하고, new configuration이 같은 ID를 만들 조건인지 비교합니다. resource type, account, region, immutable name이 다르면 moved block이 아니라 import 또는 migration 절차로 분리합니다."
          },
          {
            "q": "moved block 적용 후 plan은 어떤 모습이어야 하나요?",
            "answer": "정상 plan은 moved 메시지와 함께 no-op 또는 의도된 update만 보여야 합니다. 같은 ID의 destroy/create 쌍이 남아 있으면 address mapping이 빠졌거나 count/for_each key가 달라진 것이므로 apply를 중단하고 mapping 표를 다시 만듭니다."
          },
          {
            "q": "대량 refactor는 어떤 순서로 나누나요?",
            "answer": "주소 이동만 담은 PR과 실제 설정 변경 PR을 분리합니다. 먼저 moved block만 적용해 state address를 정리하고, plan이 안정된 뒤 variable, tag, policy 변경을 다음 PR로 냅니다. 각 단계에는 moved mapping 표와 state serial을 붙입니다."
          }
        ]
      },
      {
        "q": "destroy나 replace가 포함된 변경에는 어떤 guardrail을 요구하나요?",
        "decision": "파괴적 변경의 결정은 실행 가능성이 아니라 복구 가능성과 명시 승인 여부입니다. destroy/replace 대상, 데이터 보존 방식, `prevent_destroy` 예외, backup 또는 snapshot, rollback owner가 없으면 apply를 승인하지 않습니다.",
        "failure": "승인 없이 destroy를 허용하면 state에서 사라진 리소스를 cloud에서도 잃을 수 있습니다. backup이 있어도 복원 시간을 검증하지 않으면 변경 window 안에 복구하지 못하고, prevent_destroy 해제 기록이 없으면 다음 변경에서도 같은 위험이 반복됩니다.",
        "evidence": "destructive action list, explicit approval, prevent_destroy diff, backup snapshot ID, restore drill note",
        "followups": [
          {
            "q": "destroy 승인은 어떤 문구와 증거가 있어야 하나요?",
            "answer": "승인에는 resource address, cloud ID, 데이터 보존 여부, 예상 영향 시간, rollback 또는 rebuild owner가 명시되어야 합니다. `approve apply` 같은 일반 문구만 있으면 destroy 승인으로 보지 않고, action list와 ticket 범위를 reviewer가 다시 대조합니다."
          },
          {
            "q": "prevent_destroy를 해제해야 하면 무엇을 먼저 확인하나요?",
            "answer": "해제가 필요한 이유가 lifecycle 정리인지 실제 삭제인지 나누고, 대체 보호 장치가 있는지 봅니다. 데이터 리소스는 snapshot과 restore test, network boundary는 대체 route와 security review, IAM은 권한 회수 계획이 있어야 해제 PR을 통과시킵니다."
          },
          {
            "q": "replace가 피할 수 없는 경우 적용 전 체크는 무엇인가요?",
            "answer": "새 리소스가 먼저 만들어지는지, 기존 리소스와 동시에 존재할 수 있는지, name collision이나 quota 문제가 있는지 확인합니다. create-before-destroy가 불가능하면 downtime window, traffic drain, snapshot, post-cutover smoke를 승인 조건으로 붙입니다."
          }
        ]
      },
      {
        "q": "change window와 apply approval에서는 무엇이 맞아야 실행할 수 있나요?",
        "decision": "실행 결정은 plan이 맞는지뿐 아니라 지금 적용해도 되는지 확인하는 절차입니다. window, freeze 상태, approver 권한, rollback owner, communication channel, apply runner identity가 같은 변경 요청에 묶여야 합니다.",
        "failure": "window 밖 apply나 freeze 기간 apply는 기술적으로 성공해도 운영 사고입니다. 승인자와 실행자가 같은 역할로 남거나 rollback owner가 없으면 실패 시 중단 결정을 못 내리고, emergency 예외가 영구 권한으로 남을 수 있습니다.",
        "evidence": "change ticket, approval log, freeze calendar, rollback owner record, apply runner log",
        "followups": [
          {
            "q": "window 안에 있어도 apply를 멈추는 조건은 무엇인가요?",
            "answer": "freeze calendar가 닫혀 있거나 approver가 서비스 owner가 아니거나, plan artifact가 승인 뒤 바뀌었거나, rollback owner가 응답하지 않으면 멈춥니다. window는 필요 조건일 뿐이고 승인, artifact, 대응 책임이 함께 맞아야 실행할 수 있습니다."
          },
          {
            "q": "emergency approval은 일반 승인과 어떻게 다르게 기록하나요?",
            "answer": "emergency는 우회한 통제, 허용 시간, 후속 review 시각을 별도로 남깁니다. 예외 승인자가 누구인지, 어떤 검증을 뒤로 미뤘는지, 권한을 언제 회수할지 적어야 긴급 조치가 상시 절차로 굳지 않습니다."
          },
          {
            "q": "rollback owner는 왜 apply 전에 확정해야 하나요?",
            "answer": "rollback은 실패 뒤 새로 정하면 늦습니다. owner는 어떤 신호에서 중단할지, 어떤 commit이나 state version으로 돌아갈지, 데이터 변경은 되돌릴 수 있는지 알고 있어야 합니다. 이 정보가 ticket에 없으면 apply runner가 실패 판단을 혼자 떠안게 됩니다."
          }
        ]
      },
      {
        "q": "plan review artifact는 어떻게 고정해야 apply와 같은 변경을 검증하나요?",
        "decision": "plan review의 핵심은 reviewer가 본 plan과 apply가 실행한 plan을 같게 만드는 것입니다. saved plan file, input variables, provider lock, workspace, policy result를 고정해야 speculative plan과 apply-time plan 차이를 추적할 수 있습니다.",
        "failure": "PR comment에 붙은 speculative plan만 승인하면 apply 직전 refresh, variable, provider cache, remote state 변화로 다른 변경이 실행될 수 있습니다. policy check가 다른 artifact를 검사하면 승인 기록은 남지만 실제 보호는 동작하지 않습니다.",
        "evidence": "saved plan hash, variable file checksum, provider lock diff, policy check result, apply command log",
        "followups": [
          {
            "q": "speculative plan과 apply plan 차이는 어떻게 줄이나요?",
            "answer": "review에는 speculative plan을 쓰더라도 apply 전에는 같은 commit, 같은 variable set, 같은 workspace에서 saved plan을 다시 만들고 그 파일로 apply합니다. 두 plan의 action count나 resource address가 달라지면 재승인을 요구합니다."
          },
          {
            "q": "policy check는 plan의 어느 지점에 붙어야 하나요?",
            "answer": "policy는 code diff가 아니라 generated plan JSON을 검사해야 합니다. destroy, public exposure, encryption off, tag 누락, region 제한 같은 규칙이 plan action과 attribute 값을 기준으로 실패해야 하며, 통과 결과는 saved plan hash와 함께 저장합니다."
          },
          {
            "q": "reviewer가 다음 담당자에게 넘길 최소 packet은 무엇인가요?",
            "answer": "commit SHA, saved plan hash, action summary, risky resources, policy result, approver, apply command, rollback reference를 하나의 packet으로 넘깁니다. 다음 담당자는 이 packet으로 무엇이 승인됐고 무엇은 아직 위험으로 남았는지 다시 계산하지 않고 확인할 수 있어야 합니다."
          }
        ]
      },
      {
        "q": "apply 후에는 state 성공 말고 무엇을 실제 cloud에서 다시 읽어야 하나요?",
        "decision": "post-apply 검증은 Terraform exit code가 아니라 cloud와 애플리케이션이 의도한 상태인지 확인하는 일입니다. state, provider readback, cloud API, app smoke, metric을 연결해 변경이 실제로 반영됐고 사용자 경로가 안전한지 판단합니다.",
        "failure": "apply가 성공해도 eventual consistency, provider readback 지연, partial API failure, app dependency 누락 때문에 서비스는 실패할 수 있습니다. state만 보면 cloud 정책 전파나 runtime health가 보이지 않아 장애 종료를 너무 빨리 선언합니다.",
        "evidence": "apply output, state serial, cloud API readback, application smoke result, metric window",
        "followups": [
          {
            "q": "apply 직후 cloud readback은 어떤 필드를 확인하나요?",
            "answer": "변경한 리소스의 ID, version, policy attachment, route target, endpoint, encryption, scaling 값처럼 사용자 영향과 연결된 필드를 확인합니다. provider state와 cloud API 값이 다르면 propagation 대기인지 실패인지 구분하기 위해 재조회 시각과 API 응답을 남깁니다."
          },
          {
            "q": "state는 성공인데 앱 영향이 나쁘면 어떻게 대응하나요?",
            "answer": "먼저 변경 리소스와 앱 경로를 연결합니다. network, IAM, secret, endpoint, capacity 중 어떤 readback이 앱 smoke 실패와 맞물리는지 보고, blast radius가 작으면 설정 수정 apply를, 영향이 크면 rollback 또는 traffic drain을 선택합니다."
          },
          {
            "q": "post-apply 검증을 닫는 기록은 무엇인가요?",
            "answer": "state serial, changed resource list, cloud readback sample, smoke test result, metric window, 남은 drift 여부, follow-up ticket을 기록합니다. 실패가 없더라도 propagation 지연이나 수동 확인 항목이 남으면 변경 종료가 아니라 조건부 감시 상태로 둡니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-observability-slo-qa",
    "title": "Observability·SLO Q&A",
    "source": "Observability·SLO",
    "subtitle": "관측성과 SLO 회계에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "사용자 여정 SLI는 어디서 수집한 값을 기준으로 삼나요?",
        "decision": "SLI 정의의 운영 결정은 사용자가 성공으로 느끼는 경계와 계측 위치를 맞추는 일입니다. 로그인 성공률이면 edge 200 비율, backend handler 성공, client completion event 중 어느 값이 분자와 분모인지 명시하고, 재시도와 중복 요청을 같은 회계 규칙으로 처리해야 합니다.",
        "failure": "수집 위치가 서비스 내부 health check에 치우치면 브라우저 오류, CDN 차단, 모바일 타임아웃이 SLO에서 빠집니다. 반대로 edge 요청만 세면 비즈니스 성공 전에 끊긴 요청까지 성공으로 보일 수 있어 error budget이 실제 사용자 피해와 어긋납니다.",
        "evidence": "SLI spec, metric query link, event schema, sample request id, ingestion lag panel",
        "followups": [
          {
            "q": "source of truth는 어떤 조건을 만족해야 하나요?",
            "answer": "SLI 공식, 원천 이벤트, 집계 쿼리가 같은 사용자 여정을 가리켜야 합니다. 분자는 app success event인데 분모가 load balancer request count라면 retry와 bot traffic 때문에 성공률이 왜곡됩니다. spec에 이벤트명, 필터, dedup 기준, 담당 팀을 적고 실제 request id 3개로 raw log와 dashboard 값이 맞는지 확인합니다."
          },
          {
            "q": "수집 위치를 바꿀 때 무엇을 비교하나요?",
            "answer": "기존 SLI와 새 SLI를 최소 한 error-budget 주기 동안 병렬 집계합니다. 새 위치가 client completion을 보면서 기존 위치가 server 2xx를 보면 네트워크 실패와 사용자 취소가 새로 잡힐 수 있습니다. target을 바로 바꾸지 말고 delta dashboard, excluded traffic 목록, cutover 승인 기록을 남깁니다."
          },
          {
            "q": "SLI가 사용자 피해를 숨기는 신호는 무엇인가요?",
            "answer": "support ticket, RUM error, synthetic check는 나빠지는데 SLI가 평평하면 계측 경계가 잘못됐을 가능성이 큽니다. 이때는 raw event drop, ingestion delay, client-side failure 누락을 먼저 확인합니다. 임시로 보조 SLI 패널을 붙이고 postmortem action에 SLI spec 수정과 재계산 범위를 넣습니다."
          }
        ]
      },
      {
        "q": "SLO target과 error budget 정책은 언제 바꿀 수 있나요?",
        "decision": "SLO target 변경은 숫자 조정이 아니라 사용자 약속, release gate, budget 회계 방식을 바꾸는 결정입니다. 변경 전에는 과거 28일 또는 30일 burn, incident 제외 규칙, tier별 고객 영향, 배포 중단 기준을 함께 검토해야 합니다.",
        "failure": "target을 낮추면 실패가 정상처럼 보이고, target을 올리면 운영팀이 감당할 수 없는 paging이 늘어납니다. budget 회계 없이 target만 바꾸면 이미 소진한 위험을 새 기준 뒤에 숨기거나 release freeze를 우회하게 됩니다.",
        "evidence": "SLO policy, error budget ledger, target change proposal, release gate history, customer impact report",
        "followups": [
          {
            "q": "target 상향은 어떤 조건에서 승인하나요?",
            "answer": "최근 burn이 안정적이고, toil 증가 없이 감지와 복구가 반복 가능하며, 고객 tier가 더 엄격한 약속을 요구할 때 승인합니다. 과거 incident가 alert tuning만으로 가려진 상태라면 상향은 paging 폭증을 만들 수 있습니다. proposal에는 지난 기간 budget 잔량, alert volume 예측, rollback 기준을 붙입니다."
          },
          {
            "q": "error budget ledger에는 무엇을 회계 처리하나요?",
            "answer": "budget ledger에는 incident 기간, 제외 여부, 제외 근거, 사용자 영향, owner, release gate 결과가 들어가야 합니다. maintenance window를 자동 제외하면 실제 사용자 피해가 budget에서 사라집니다. 제외 항목은 정책 문구와 ticket id로 연결하고, 다음 release 승인 때 남은 budget을 기준으로 삼습니다."
          },
          {
            "q": "release gate는 어떤 경우에 배포를 멈추나요?",
            "answer": "budget이 정책 임계치 아래이고 최근 burn이 같은 기능 영역에서 발생했다면 배포를 멈춥니다. 단순히 현재 알림이 quiet라고 통과시키면 slow burn 중에 새 risk를 얹게 됩니다. gate evidence에는 budget 잔량, 관련 SLI, 예외 승인자, 취소 가능한 rollback path가 있어야 합니다."
          }
        ]
      },
      {
        "q": "multi-window burn-rate alert는 어떤 창으로 paging을 결정하나요?",
        "decision": "burn-rate alert의 결정은 빠른 피해 확산과 느린 budget 소진을 다른 창으로 잡는 것입니다. 짧은 창은 즉시 paging, 긴 창은 ticket 또는 business-hour 대응으로 나누고, 두 창이 같은 SLO를 같은 traffic filter로 평가하는지 확인합니다.",
        "failure": "창이 하나뿐이면 짧은 spike에는 noise가 많고 긴 degradation은 늦게 잡힙니다. traffic이 적은 서비스에서 비율만 보면 한두 건 실패가 paging을 만들고, 반대로 대량 트래픽에서는 작아 보이는 비율이 budget을 빠르게 태울 수 있습니다.",
        "evidence": "alert rule, alert evaluation log, burn-rate dashboard, traffic floor setting, paging history",
        "followups": [
          {
            "q": "fast burn은 언제 깨워야 하나요?",
            "answer": "짧은 창 burn이 page 임계치를 넘고 traffic floor를 만족하며 사용자 여정 SLI가 실제 실패를 보일 때 깨웁니다. deploy 직후 한 region만 흔들리는 경우도 전체 평균은 작게 보일 수 있습니다. alert payload에는 affected SLI, burn multiple, region, 최근 deploy marker가 들어가야 합니다."
          },
          {
            "q": "slow burn은 어떤 대응으로 넘기나요?",
            "answer": "긴 창만 나빠지는 경우에는 즉시 paging보다 owner ticket, release review, capacity 또는 dependency follow-up이 맞을 수 있습니다. 하지만 남은 budget이 gate 기준 아래면 ticket만으로는 부족합니다. slow-burn report에는 소진 속도, 예상 budget depletion time, 관련 변경 목록을 붙입니다."
          },
          {
            "q": "noise를 줄일 때 어떤 조건은 지키나요?",
            "answer": "threshold를 올리기 전에 traffic floor, absent data 처리, maintenance label, dependency outage label을 확인합니다. noise 때문에 창을 길게만 만들면 실제 fast burn이 늦게 울립니다. tuning PR에는 이전 false page 사례, 새 rule의 replay 결과, 놓치는 incident가 없는지 검증한 로그가 필요합니다."
          }
        ]
      },
      {
        "q": "RED metrics로 서비스 증상을 어떻게 분리하나요?",
        "decision": "RED는 request rate, error rate, duration을 함께 봐서 서비스 증상이 수요 변화인지 실패율 상승인지 지연 증가인지 가르는 도구입니다. 운영 답변은 세 지표를 같은 route, status class, deploy marker, tenant 또는 region으로 잘라 봐야 합니다.",
        "failure": "error만 보면 traffic drop을 정상으로 오해하고, duration만 보면 retry storm이나 downstream failure를 놓칩니다. 평균 latency만 보이면 tail latency가 SLO를 태우는데도 p50은 안정적으로 보일 수 있습니다.",
        "evidence": "RED dashboard, route-level request count, 5xx/4xx breakdown, p95/p99 latency, deploy marker",
        "followups": [
          {
            "q": "request rate가 줄고 error가 늘지 않으면 어떻게 해석하나요?",
            "answer": "rate 감소는 upstream 차단, CDN/WAF, client release, DNS 문제처럼 서비스 내부까지 요청이 오지 않는 실패일 수 있습니다. error가 낮다고 정상 선언하면 앞단 drop을 놓칩니다. edge log, synthetic reachability, RUM navigation count를 붙여 요청이 어디에서 사라졌는지 확인합니다."
          },
          {
            "q": "duration 상승은 어떤 기준으로 위험을 나누나요?",
            "answer": "p95와 p99가 SLO threshold를 넘고 같은 시간대 queue, DB, dependency 지표가 흔들리면 사용자 영향 위험입니다. p50만 상승하면 cache miss나 특정 route 변화일 수 있어 scope가 다릅니다. latency heatmap, slow trace exemplar, route별 histogram을 증거로 남깁니다."
          },
          {
            "q": "RED panel은 어떤 차원으로 잘라야 하나요?",
            "answer": "route, status class, region, customer tier처럼 조치가 달라지는 차원만 기본 패널에 둡니다. user id나 request id 같은 고카디널리티 label을 dashboard에 올리면 query 비용과 timeout이 incident 중에 폭발합니다. 상세 조사는 trace 또는 log drill-down 링크로 넘깁니다."
          }
        ]
      },
      {
        "q": "USE metrics로 인프라 병목을 어디까지 좁히나요?",
        "decision": "USE는 utilization, saturation, errors로 CPU, memory, disk, network, queue 같은 자원의 병목을 좁힙니다. 서비스 RED가 나쁠 때 USE를 붙여 자원 한계인지 애플리케이션 bug인지, 또는 downstream backpressure인지 판단합니다.",
        "failure": "utilization만 보면 CPU 50%에서도 run queue가 밀리는 saturation을 놓칠 수 있습니다. error counter만 보면 packet drop, throttling, disk await처럼 사용자 latency를 키우는 전조가 늦게 잡힙니다.",
        "evidence": "node/pod USE panel, saturation queue length, throttling counter, disk await, network drop, service RED correlation",
        "followups": [
          {
            "q": "utilization이 높으면 바로 증설하나요?",
            "answer": "높은 utilization만으로 증설하지 않고 saturation과 service latency가 같이 오르는지 봅니다. CPU가 높아도 queue가 안정적이면 배치 작업 또는 캐시 워밍일 수 있습니다. autoscaling event, run queue, throttling, RED duration을 같이 보고 임시 증설인지 코드/쿼리 수정인지 정합니다."
          },
          {
            "q": "saturation은 어떤 실패를 먼저 예고하나요?",
            "answer": "saturation은 queue wait, connection backlog, disk IO wait처럼 사용자가 느끼는 지연을 error보다 먼저 보여줍니다. error가 아직 낮다고 방치하면 timeout budget이 먼저 소진됩니다. backlog depth, wait time histogram, timeout log를 같은 타임라인에 놓고 admission control이나 capacity action을 선택합니다."
          },
          {
            "q": "인프라 병목과 앱 장애를 어떻게 가르나요?",
            "answer": "USE saturation이 특정 node pool이나 dependency에 몰리고 app error stack이 같은 시각에 후행하면 인프라 병목 가능성이 큽니다. 반대로 resource headroom이 충분한데 특정 route error가 늘면 app release나 data shape를 의심합니다. node label, pod placement, trace span, deploy marker를 함께 남깁니다."
          }
        ]
      },
      {
        "q": "trace sampling은 실패 요청을 어떻게 보존해야 하나요?",
        "decision": "trace sampling의 운영 결정은 평상시 비용을 제한하면서 실패 요청, slow request, high-value customer path를 보존하는 것입니다. tail sampling, error sampling, exemplar 연결 규칙이 SLO와 같은 route/status 기준을 써야 metric에서 trace로 바로 넘어갈 수 있습니다.",
        "failure": "head sampling만 쓰면 드문 실패가 샘플 밖으로 사라지고, 과도한 sampling은 collector 비용과 저장소 한도를 터뜨립니다. metric은 나쁜데 trace가 없으면 root-cause 분석이 로그 추측으로 돌아갑니다.",
        "evidence": "sampling policy, collector drop metric, trace exemplar link, failed request trace, storage quota panel",
        "followups": [
          {
            "q": "tail sampling rule은 무엇을 우선 보존하나요?",
            "answer": "5xx, timeout, SLO threshold 초과, VIP tenant, canary traffic을 우선 보존합니다. 모든 trace를 같은 확률로 남기면 낮은 빈도의 치명적 실패가 빠질 수 있습니다. policy에는 route/status/latency 조건, 보존 기간, collector capacity가 함께 정의되어야 합니다."
          },
          {
            "q": "metric은 실패인데 trace가 비어 있으면 무엇을 확인하나요?",
            "answer": "collector drop, propagation header 누락, sampling rule mismatch, clock skew를 확인합니다. trace 부재를 실패 부재로 해석하면 가장 필요한 evidence를 잃습니다. 임시로 affected route의 sampling rate를 올리고, trace id가 log와 metric exemplar에 다시 붙는지 검증합니다."
          },
          {
            "q": "exemplar는 어떤 연결을 보장해야 하나요?",
            "answer": "metric point에서 대표 trace, log line, deployment marker로 이동할 수 있어야 합니다. exemplar가 random success trace만 가리키면 SLO burn 상황에서 분석 속도가 떨어집니다. burn-rate panel에서 실패 exemplar를 열어 span status, dependency latency, request attributes가 보이는지 runbook에 확인 절차를 둡니다."
          }
        ]
      },
      {
        "q": "log cardinality와 query cost는 어떤 guardrail로 제한하나요?",
        "decision": "log guardrail은 incident 중 필요한 drill-down을 유지하면서 label 폭증과 비싼 query를 막는 결정입니다. 기본 index label, high-cardinality field 처리, retention tier, query timeout, 비용 예산을 서비스 owner가 이해하는 규칙으로 둬야 합니다.",
        "failure": "user id, request id, stack trace를 label로 승격하면 cardinality가 폭증해 query가 느려지고 비용 알림이 터집니다. 반대로 모든 필드를 message에 묻으면 incident 때 tenant, route, region 기준으로 빠르게 좁힐 수 없습니다.",
        "evidence": "log schema, index cardinality report, query plan, timeout metric, monthly log cost, sampling/drop rule",
        "followups": [
          {
            "q": "어떤 필드는 label로 올리면 안 되나요?",
            "answer": "user id, session id, request id, raw URL query, stack trace처럼 값 종류가 계속 늘어나는 필드는 label이 아니라 searchable field나 trace/log correlation key로 둡니다. label로 올리면 index shard가 커져 incident query가 timeout될 수 있습니다. schema review에서 예상 cardinality와 예시 값을 제출하게 합니다."
          },
          {
            "q": "query timeout이 나면 incident 분석은 어떻게 이어가나요?",
            "answer": "기간을 줄이고 service, route, status, region 같은 저카디널리티 필터부터 적용합니다. 전체 텍스트 검색을 반복하면 비용만 늘고 증거가 늦어집니다. saved query에 시간 범위, 필터 순서, sampling된 raw log 링크를 남겨 다음 담당자가 같은 실패를 재현하게 합니다."
          },
          {
            "q": "비용 guardrail은 어떤 조치를 자동화하나요?",
            "answer": "예산 초과 예측, cardinality spike, ingest surge가 보이면 owner 알림, sampling rule, retention tier 조정 후보를 자동으로 제시합니다. 무작정 drop하면 보안 감사나 장애 분석 evidence를 잃습니다. drop rule에는 제외 대상, 보존해야 할 error log, 승인자를 명시합니다."
          }
        ]
      },
      {
        "q": "incident dashboard는 어떤 순서로 배치하나요?",
        "decision": "incident dashboard의 결정은 첫 화면에서 사용자 영향, SLO burn, 최근 변경, routing owner를 바로 보이게 하고 drill-down은 증상별로 이어지게 하는 것입니다. golden signals, deploy marker, region/tenant split, trace/log 링크가 같은 시간 축을 써야 합니다.",
        "failure": "예쁜 차트가 많아도 첫 화면에 action이 없으면 on-call은 여러 화면을 돌아다니다 시간을 잃습니다. stale panel, 서로 다른 time range, 평균만 보이는 latency chart는 incident 판단을 느리게 만듭니다.",
        "evidence": "incident dashboard, panel owner map, drill-down links, deploy marker overlay, dashboard freshness check",
        "followups": [
          {
            "q": "첫 화면에는 어떤 패널이 반드시 있어야 하나요?",
            "answer": "현재 SLO burn, affected traffic, error/latency split, recent deploy, active alert, owner route가 보여야 합니다. CPU나 heap 같은 내부 지표가 먼저 나오면 사용자 영향 판단이 뒤로 밀립니다. 첫 화면 panel은 5분 안에 page, rollback, mitigation 중 하나를 고르게 만들어야 합니다."
          },
          {
            "q": "drill-down layout은 어떻게 설계하나요?",
            "answer": "증상 패널에서 route, region, dependency, trace, log로 한 단계씩 좁히는 링크를 둡니다. 같은 정보를 여러 카드에 반복하면 어디를 눌러야 할지 모릅니다. 각 패널에는 owner, query source, time range, related runbook link를 붙여야 합니다."
          },
          {
            "q": "dashboard가 믿을 수 없는 상태는 어떻게 표시하나요?",
            "answer": "data freshness, missing series, query error, partial region coverage를 별도 health panel로 보여줍니다. 차트가 비어 있는데 정상처럼 보이면 관측 공백을 서비스 정상으로 오해합니다. stale threshold를 넘으면 alert note와 fallback query를 dashboard에 노출합니다."
          }
        ]
      },
      {
        "q": "alert routing은 누구를 언제 깨워야 하나요?",
        "decision": "alert routing은 severity, affected SLO, service owner, escalation policy를 연결하는 운영 계약입니다. paging alert와 ticket alert를 나누고, maintenance나 silence가 실제 owner visibility를 막지 않는지 확인해야 합니다.",
        "failure": "route가 팀 별칭만 가리키면 ownership이 바뀐 뒤 page가 무응답으로 남습니다. severity가 낮게 잡히면 customer-visible SLO burn이 ticket에 묻히고, silence가 넓으면 실제 incident를 숨깁니다.",
        "evidence": "alert rule owner, escalation policy, paging history, silence record, maintenance window, runbook ack checklist",
        "followups": [
          {
            "q": "owner route는 어떤 증거로 검증하나요?",
            "answer": "alert label, service catalog owner, on-call schedule, runbook owner가 같은 팀을 가리켜야 합니다. service catalog만 맞고 escalation policy가 오래되면 page가 전 담당 팀으로 갑니다. 분기마다 test page 또는 dry-run으로 ack 시간과 escalated target을 확인합니다."
          },
          {
            "q": "severity는 어떤 기준으로 바꾸나요?",
            "answer": "사용자 영향 범위, SLO burn 속도, workaround 존재, regulatory 또는 revenue impact로 severity를 올리거나 내립니다. 내부 warning만으로 SEV를 올리면 fatigue가 늘고, customer-visible failure를 낮추면 공지가 늦습니다. severity change에는 metric snapshot과 incident commander 승인 기록을 남깁니다."
          },
          {
            "q": "silence와 maintenance는 어떻게 안전하게 운영하나요?",
            "answer": "silence는 scope, 만료 시각, owner, ticket을 반드시 가져야 하며 SLO burn alert 전체를 덮지 않아야 합니다. maintenance label이 넓으면 실제 장애가 planned work로 사라집니다. window 종료 후 suppressed alert replay와 missed page review를 실행합니다."
          }
        ]
      },
      {
        "q": "synthetic check는 어느 사용자 여정을 대신해야 하나요?",
        "decision": "synthetic check는 실제 사용자 여정 중 business-critical path를 대표해야 합니다. probe가 DNS, TLS, auth, checkout, API dependency 중 어디까지 지나가는지 명시하고, region별 endpoint와 credential expiry를 운영 대상으로 다룹니다.",
        "failure": "단순 health endpoint만 때리면 로그인, 결제, search처럼 실제 사용자 실패가 감지되지 않습니다. 반대로 너무 복잡한 probe는 test data, rate limit, captcha, third-party 변동 때문에 false positive가 많아집니다.",
        "evidence": "synthetic probe definition, probe region matrix, test account status, false-positive log, RUM/backend comparison",
        "followups": [
          {
            "q": "probe coverage는 어떻게 정하나요?",
            "answer": "revenue, login, write path, read path처럼 실패 비용이 큰 여정을 우선합니다. 모든 endpoint를 probe하면 비용과 noise가 늘고, health check만 보면 실제 conversion failure를 놓칩니다. coverage matrix에는 여정 단계, region, dependency, expected assertion을 적습니다."
          },
          {
            "q": "false positive와 false negative는 어떻게 줄이나요?",
            "answer": "false positive는 retry, assertion 안정화, test data 관리로 줄이고 false negative는 실제 RUM/backend SLI와 비교해 놓친 여정을 찾습니다. probe 성공만 보고 정상이라고 하면 특정 브라우저나 지역 실패가 빠질 수 있습니다. 실패 사례마다 probe definition 또는 SLI 보조 지표를 수정합니다."
          },
          {
            "q": "regional check는 어떤 차이를 보여줘야 하나요?",
            "answer": "사용자 region, cloud region, CDN POP를 분리해 어느 경계에서 실패하는지 보여줘야 합니다. 한 region의 central probe만 있으면 local DNS, ISP, edge failure를 놓칩니다. regional matrix에는 probe origin, resolved IP, latency, status, backend correlation을 포함합니다."
          }
        ]
      },
      {
        "q": "RUM과 client telemetry는 backend SLO와 어떻게 연결하나요?",
        "decision": "RUM은 browser, mobile, network, geography에서 실제 사용자 경험을 보여주고 backend SLO가 놓치는 client-side 실패를 연결합니다. 운영 답변은 frontend error, navigation timing, API trace id, backend SLI를 같은 session 또는 request로 묶어야 합니다.",
        "failure": "backend 200만 보면 JavaScript error, mobile timeout, regional network 지연, client cache 문제를 정상으로 오해합니다. RUM만 보면 ad blocker, sampling bias, privacy filtering 때문에 backend 책임이 아닌 신호를 과대평가할 수 있습니다.",
        "evidence": "RUM dashboard, browser/mobile breakdown, session trace id, frontend error sample, backend SLI correlation, privacy sampling policy",
        "followups": [
          {
            "q": "frontend와 backend 실패는 어떻게 연결하나요?",
            "answer": "client session id, traceparent, API request id 중 하나가 backend log와 이어져야 합니다. RUM error만 있고 backend id가 없으면 책임 경계가 흐려집니다. correlation dashboard에서 frontend error rate, API status, backend latency를 같은 release marker로 비교합니다."
          },
          {
            "q": "client telemetry sampling은 어떤 위험이 있나요?",
            "answer": "낮은 sampling은 소수 region이나 특정 browser 실패를 놓치고, 높은 sampling은 privacy와 비용 문제를 만듭니다. error session은 우선 보존하고 PII는 client에서 제거해야 합니다. sampling policy에는 보존 조건, redaction, consent, region별 최소 샘플 수를 명시합니다."
          },
          {
            "q": "지역이나 기기별 영향은 어떤 action으로 이어지나요?",
            "answer": "특정 browser, OS, mobile app version, user region에만 RUM이 나쁘면 global rollback보다 targeted mitigation이 맞습니다. backend SLO가 안정적이어도 client cohort의 conversion이 떨어지면 customer impact입니다. release note, feature flag, CDN cache, mobile rollout percentage를 함께 확인합니다."
          }
        ]
      },
      {
        "q": "postmortem에서 관측 공백은 어떤 action으로 닫나요?",
        "decision": "observability gap postmortem은 '몰랐다'를 계측, alert, dashboard, runbook action으로 바꾸는 절차입니다. 공백이 signal 부재인지, route 오류인지, dashboard 해석 실패인지, owner 부재인지 나누고 due date와 검증 drill을 둬야 합니다.",
        "failure": "관측 공백을 회고 문장으로만 남기면 다음 incident에서 같은 blind spot이 반복됩니다. 새 metric만 추가하고 alert owner, threshold, runbook, 비용을 정하지 않으면 운영 신호가 noise가 됩니다.",
        "evidence": "postmortem action item, missing-signal timeline, new metric/alert PR, dashboard diff, runbook update, drill result",
        "followups": [
          {
            "q": "missing signal은 어떻게 분류하나요?",
            "answer": "사용자 영향 신호 부재, dependency 신호 부재, sampling/drop 문제, dashboard 접근성 문제, alert route 문제로 나눕니다. 단순히 metric 하나를 추가하면 실제 blind spot과 맞지 않을 수 있습니다. timeline에서 처음 알 수 있었던 시각과 실제 인지 시각의 차이를 evidence로 삼습니다."
          },
          {
            "q": "action item은 어떤 수준까지 구체화하나요?",
            "answer": "owner, due date, query or code location, expected alert behavior, cost impact, rollback plan이 있어야 닫을 수 있습니다. 'dashboard 개선'처럼 넓은 항목은 완료돼도 incident 대응이 달라지지 않을 수 있습니다. PR, alert replay, runbook diff를 completion evidence로 요구합니다."
          },
          {
            "q": "재발 방지는 어떻게 검증하나요?",
            "answer": "같은 failure mode를 staging drill이나 alert replay로 재현해 새 signal이 울리고 dashboard에서 owner action까지 이어지는지 확인합니다. 문서만 업데이트하면 실제 on-call 경로가 바뀌지 않을 수 있습니다. drill 결과, alert payload, ack route, post-drill 수정 사항을 postmortem에 붙입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-incident-dr-qa",
    "title": "Incident Response·Rollback·DR Q&A",
    "source": "Incident Response·Rollback·DR",
    "subtitle": "장애 지휘와 복구에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "incident로 선언하고 지휘자를 세우는 기준은 무엇인가요?",
        "decision": "incident 선언은 원인이 아니라 운영 모드를 바꾸는 결정입니다. 고객 영향, SLO burn, 보안·데이터 위험, 복구 조치 필요성이 하나라도 확인되면 commander를 세우고 기록자와 실무 owner를 분리합니다.",
        "failure": "선언을 늦추면 각 팀이 개별 디버깅을 계속하고 고객 공지, 변경 freeze, 완화 승인자가 늦게 정해집니다. 반대로 모든 알림을 incident로 올리면 paging fatigue가 커지므로 영향 증거와 종료 조건을 함께 남겨야 합니다.",
        "evidence": "customer impact counter, active alert, SLO burn chart, incident channel creation time, commander assignment, initial decision log",
        "followups": [
          {
            "q": "알림만 있고 고객 신고가 없으면 선언하나요?",
            "answer": "multi-window SLO burn, synthetic failure, 결제·로그인 같은 critical path 실패가 보이면 신고 전이라도 선언합니다. 내부 warning만 있고 사용자 경로가 성공하면 watch 상태로 두되 owner와 다음 확인 시각을 정합니다. 증거는 alert payload, probe result, affected route count입니다."
          },
          {
            "q": "commander는 언제 세워야 하나요?",
            "answer": "둘 이상의 팀이 참여하거나 rollback, traffic shift, 고객 공지 중 하나가 필요하면 바로 세웁니다. 실무자가 지휘까지 맡으면 복구 명령과 상태 공유가 섞입니다. assignment note에는 commander, scribe, technical owner, communications owner를 이름으로 남깁니다."
          },
          {
            "q": "선언하지 않기로 한 결정도 기록하나요?",
            "answer": "기록합니다. 영향 없음 판단, 확인한 SLI, 다음 재평가 시각, 자동 승격 조건을 남겨야 교대자가 같은 논쟁을 반복하지 않습니다. 이후 고객 신고나 burn 증가가 생기면 그 기록을 기준으로 선언 지연 여부를 회고합니다."
          }
        ]
      },
      {
        "q": "severity는 어떤 신호로 올리고 내리나요?",
        "decision": "severity는 고객 영향 범위, 지속 시간, 우회 가능성, 데이터 손실 가능성, 보안·규제 영향으로 정합니다. 내부 component 이름보다 사용자 cohort와 business criticality가 우선입니다.",
        "failure": "severity를 낮게 잡으면 status update와 임원·고객 대응이 늦고, 너무 높게 잡으면 불필요한 전사 동원이 생깁니다. 분류 변경은 감정이 아니라 새 evidence와 남은 위험으로 해야 합니다.",
        "evidence": "affected customer count, impacted route list, duration clock, workaround status, compliance note, severity change record",
        "followups": [
          {
            "q": "소수 고객만 영향이면 낮은 severity인가요?",
            "answer": "고객 수만 보지 않습니다. enterprise tenant, 결제, 인증, 데이터 삭제 경로이면 작은 cohort도 높은 severity가 됩니다. 증거는 tenant tier, revenue impact, failed transaction sample이며, 예외 판단은 commander 승인으로 남깁니다."
          },
          {
            "q": "severity를 내릴 때 필요한 조건은 무엇인가요?",
            "answer": "새 실패 유입이 멈추고 우회 또는 복구가 고객 경로에서 확인되어야 합니다. 임시 완화가 켜져 있거나 데이터 보정이 남았으면 severity는 낮춰도 incident는 닫지 않습니다. status에는 residual risk와 다음 update time을 같이 씁니다."
          },
          {
            "q": "compliance 이슈는 어떻게 반영하나요?",
            "answer": "개인정보, 결제, 데이터 보존, 계약 SLA 위반 가능성이 있으면 기술 영향보다 높은 등급으로 올릴 수 있습니다. 법무·보안 owner 호출 시각, 노출 범위 가설, 보존한 audit log를 evidence packet에 넣습니다."
          }
        ]
      },
      {
        "q": "commander handoff에서 역할은 어떻게 나누나요?",
        "decision": "handoff는 지휘자, 기록자, 실무 owner, 커뮤니케이션 owner가 각각 무엇을 결정하는지 분리하는 절차입니다. 다음 지휘자가 같은 상태에서 바로 결정을 이어갈 수 있어야 합니다.",
        "failure": "역할이 섞이면 실무자가 로그를 보다가 customer update를 놓치고, 기록자가 완화 명령의 승인 근거를 잃습니다. handoff가 구두로만 끝나면 rollback 기준과 남은 위험이 교대 순간에 사라집니다.",
        "evidence": "role assignment table, handoff note, open decision list, mitigation owner, next update timestamp, command history",
        "followups": [
          {
            "q": "기록자는 어떤 내용을 반드시 남기나요?",
            "answer": "decision, commander 승인, 실행 명령, 관측 결과, 다음 결정 시각을 시간순으로 남깁니다. 채팅 요약만 있으면 왜 rollback을 멈췄는지 추적할 수 없습니다. 기록에는 dashboard link보다 snapshot time과 metric value가 필요합니다."
          },
          {
            "q": "technical owner가 여러 명이면 누가 결정하나요?",
            "answer": "각 영역 owner는 조사와 실행을 맡고, cross-service tradeoff는 commander가 결정합니다. DB owner와 edge owner가 서로 다른 완화를 제안하면 고객 영향 감소량, 되돌림 가능성, 데이터 위험으로 선택 기준을 맞춥니다."
          },
          {
            "q": "교대 시점에 닫히지 않은 결정은 어떻게 넘기나요?",
            "answer": "open decision마다 owner, 선택지, 차단 증거, deadline을 붙입니다. 예를 들어 rollback 대 traffic shift가 남았다면 필요한 canary metric과 승인자를 적습니다. 다음 지휘자는 이 목록으로 첫 10분을 다시 진단하지 않고 선택을 이어갑니다."
          }
        ]
      },
      {
        "q": "customer update는 어떤 cadence와 문장으로 운영하나요?",
        "decision": "customer update는 확정된 원인 설명보다 현재 영향, 완화 상태, 다음 update time을 안정적으로 제공하는 운영 계약입니다. 불확실성은 숨기지 말고 확인 중인 범위와 배제한 범위를 나눠 말합니다.",
        "failure": "원인 확정까지 기다리면 고객은 침묵을 장애 은폐로 받아들입니다. 반대로 추측을 원인처럼 쓰면 나중에 정정 비용이 커집니다. cadence가 없으면 commander가 매번 공지 여부를 다시 판단합니다.",
        "evidence": "status page draft, customer segment impact, support ticket volume, next update time, approved wording log, comms owner",
        "followups": [
          {
            "q": "원인을 모를 때도 공지하나요?",
            "answer": "고객 영향이 확인되면 공지합니다. 문장은 원인이 아니라 증상, 영향 범위, 현재 완화, 다음 공지 시각으로 구성합니다. 금지할 것은 추측성 vendor blame이나 재현되지 않은 복구 완료 표현입니다."
          },
          {
            "q": "update cadence는 어떻게 정하나요?",
            "answer": "severity와 변경 속도로 정합니다. 고severity는 15~30분 단위, 안정화 중이면 30~60분 단위가 보통이며, 변화가 없어도 같은 시각에 업데이트합니다. incident log에는 실제 발행 시각과 다음 예정 시각을 남깁니다."
          },
          {
            "q": "내부 채널과 외부 status가 다를 때 위험은 무엇인가요?",
            "answer": "내부는 복구됐다고 말하지만 외부에는 영향이 남는 경우 신뢰가 깨집니다. support ticket, RUM, synthetic, backend SLI가 서로 다른 결론이면 외부 문구는 보수적으로 유지합니다. comms owner가 source of truth를 하나로 지정해야 합니다."
          }
        ]
      },
      {
        "q": "원인 확정 전 mitigation은 어떻게 선택하나요?",
        "decision": "mitigation은 root cause 증명보다 고객 피해 축소를 먼저 보는 선택입니다. read-only mode, traffic shed, feature flag off, rate limit, queue pause처럼 되돌릴 수 있고 blast radius를 줄이는 조치를 우선합니다.",
        "failure": "원인 분석에만 매달리면 SLO burn과 고객 실패가 계속 쌓입니다. 반대로 완화가 너무 넓으면 데이터 지연, 보안 예외, 비용 폭증이 새 incident가 됩니다. 모든 임시 조치에는 owner와 만료 조건이 있어야 합니다.",
        "evidence": "mitigation decision log, affected SLI before/after, feature flag state, traffic split, exception expiry, customer impact delta",
        "followups": [
          {
            "q": "원인을 모르면 어떤 완화가 안전한가요?",
            "answer": "state change를 줄이고 실패 경로를 좁히는 조치가 안전합니다. write 중지, 특정 tenant traffic shift, suspect feature off는 데이터 손상 위험을 줄입니다. 실행 전후에는 SLI delta와 남은 실패 cohort를 같은 dashboard에서 봅니다."
          },
          {
            "q": "mitigation이 성공했는지 어떤 숫자로 보나요?",
            "answer": "error rate만 보지 않고 customer impact count, retry volume, queue lag, support ticket inflow가 같은 방향으로 줄어야 합니다. 한 지표만 좋아지면 부하를 다른 경로로 밀었을 수 있습니다. 결정 log에는 실행 시각과 first-good timestamp를 남깁니다."
          },
          {
            "q": "임시 예외는 어떻게 닫나요?",
            "answer": "예외 rule, scale-out, read-only flag, allowlist는 owner, expiry, rollback command를 가져야 합니다. incident 종료 때 열려 있으면 postmortem action이 아니라 active risk입니다. close evidence는 config readback과 SLI 안정화입니다."
          }
        ]
      },
      {
        "q": "rollback, traffic shift, config revert는 어떻게 고르나요?",
        "decision": "복구 선택은 변경 종류, 되돌림 가능성, 데이터 호환성, 고객 영향 감소 속도로 고릅니다. code rollback, config revert, feature flag off, traffic shift는 같은 목적처럼 보여도 위험 경계가 다릅니다.",
        "failure": "rollback을 반사적으로 실행하면 schema migration, cache format, queue message version이 깨질 수 있습니다. 반대로 forward path만 고집하면 이미 검증된 이전 상태로 돌아갈 기회를 잃습니다.",
        "evidence": "deploy marker, rollback artifact checksum, migration status, config diff, traffic router state, post-action SLI",
        "followups": [
          {
            "q": "rollback을 막는 신호는 무엇인가요?",
            "answer": "irreversible migration, backward-incompatible message, warmed cache dependency, old binary secret mismatch가 있으면 바로 막습니다. 이때는 traffic shift나 feature flag off가 더 안전할 수 있습니다. evidence는 migration version, consumer compatibility, artifact checksum입니다."
          },
          {
            "q": "config revert가 code rollback보다 나은 경우는 언제인가요?",
            "answer": "증상이 threshold, route, policy, flag 변경과 시간상 맞고 binary는 안정적이면 config revert가 빠릅니다. 단, config source of truth와 live readback이 다르면 revert가 적용됐다고 착각합니다. 변경 전후 diff와 effective config를 같이 봅니다."
          },
          {
            "q": "traffic shift는 어떤 실패를 만들 수 있나요?",
            "answer": "남은 region이나 cluster가 capacity를 못 버티거나 state locality 때문에 latency가 늘 수 있습니다. shift 전에는 headroom, sticky session, data replication lag를 확인합니다. shift 후에는 target error rate와 saturation이 함께 내려가는지 봅니다."
          }
        ]
      },
      {
        "q": "forward fix가 rollback보다 나은 조건은 무엇인가요?",
        "decision": "forward fix는 rollback보다 위험이 낮고 작은 변경으로 고객 영향이 빠르게 줄 때 선택합니다. blast radius, review depth, test evidence, abort switch가 있어야 하며, incident 중 새 기능을 얹는 방식이면 거부해야 합니다.",
        "failure": "빠른 수정이라는 이름으로 unreviewed patch를 넣으면 두 번째 장애가 생깁니다. 특히 데이터 보정, security policy, payment path는 hotfix가 성공해도 나중에 audit과 reconciliation이 필요합니다.",
        "evidence": "hotfix diff, reviewer approval, targeted test output, canary result, abort switch, post-deploy metric snapshot",
        "followups": [
          {
            "q": "어떤 변경이면 forward fix를 허용하나요?",
            "answer": "작은 guard condition, timeout value, null handling, feature flag default처럼 영향 경계가 좁고 테스트가 바로 가능한 변경입니다. schema나 protocol 변경처럼 되돌림이 어려운 수정은 incident 중에는 피합니다. 승인에는 reviewer와 commander가 모두 남아야 합니다."
          },
          {
            "q": "guardrail은 무엇을 둬야 하나요?",
            "answer": "canary percentage, abort threshold, automatic rollback command, affected route monitor를 둡니다. fix가 배포됐다는 사실보다 실패율이 줄고 새 error class가 늘지 않는지가 중요합니다. 5분 단위 check와 stop condition을 release note에 적습니다."
          },
          {
            "q": "hotfix 후에는 무엇을 정리하나요?",
            "answer": "임시 코드가 permanent design인지 되돌릴 patch인지 분류합니다. 빠른 수정에 테스트 gap이 있으면 postmortem action으로 남기고, incident branch를 mainline에 맞춰 재검증합니다. evidence는 merged diff, test run, metric snapshot입니다."
          }
        ]
      },
      {
        "q": "restore drill과 backup validation은 무엇을 증명해야 하나요?",
        "decision": "restore drill은 backup 파일 존재가 아니라 복구 지점, 무결성, 접근 권한, read-only 검증, 실제 소요 시간을 증명해야 합니다. 운영 복구 때 같은 절차를 같은 권한으로 실행할 수 있어야 합니다.",
        "failure": "backup 성공 알림만 믿으면 암호화 key, 권한, schema version, partial backup 문제를 장애 중에 발견합니다. restore가 느리면 RTO를 넘고, 무결성 검증이 없으면 손상 데이터를 정상으로 열 수 있습니다.",
        "evidence": "backup job log, restore point timestamp, checksum or row count, read-only restore result, access check, drill duration",
        "followups": [
          {
            "q": "backup success와 restore success는 왜 다른가요?",
            "answer": "backup은 저장 완료이고 restore는 읽기 가능한 시스템 상태 재구성입니다. key 접근, dependency version, index rebuild, permission이 restore 단계에서 깨질 수 있습니다. drill은 read-only endpoint에서 query와 integrity check까지 통과해야 합니다."
          },
          {
            "q": "무결성은 무엇으로 확인하나요?",
            "answer": "checksum, row count, referential check, sample transaction replay, application smoke를 조합합니다. 단순히 DB가 올라온 것만으로는 누락·중복·오래된 snapshot을 잡지 못합니다. 결과는 restore point와 검증 쿼리 출력으로 남깁니다."
          },
          {
            "q": "drill 실패는 어떻게 처리하나요?",
            "answer": "실패 단계를 runbook action으로 쪼갭니다. 예를 들어 key 권한 실패, restore 시간 초과, schema mismatch는 owner와 due date가 다릅니다. 다음 drill 날짜와 재검증 기준이 없으면 backup 상태를 green으로 두면 안 됩니다."
          }
        ]
      },
      {
        "q": "RPO/RTO는 복구 중 어떻게 추적하나요?",
        "decision": "RPO/RTO 추적은 목표값 암기가 아니라 실제 복구 시각, 데이터 손실 경계, business 승인 상태를 시간표에 올리는 일입니다. 고객에게 기능 복구와 데이터 정합성 복구를 분리해서 말해야 합니다.",
        "failure": "서비스가 200을 반환한다고 복구를 끝내면 누락된 주문, 지연된 이벤트, stale read가 남을 수 있습니다. RPO 초과를 숨기면 보상 처리와 고객 커뮤니케이션이 늦어집니다.",
        "evidence": "outage start time, last good backup or replication point, first restored service time, data loss window, business approval, reconciliation log",
        "followups": [
          {
            "q": "RPO 초과 가능성은 언제 알리나요?",
            "answer": "last good point와 failure start 사이에 쓰기 유실 가능성이 보이면 확정 전이라도 commander와 business owner에게 알립니다. 외부 문구는 추정 범위와 확인 중인 검증을 나눕니다. evidence는 replication lag, backup timestamp, write audit sample입니다."
          },
          {
            "q": "RTO 달성은 어떤 시각으로 보나요?",
            "answer": "인프라가 올라온 시각이 아니라 critical user journey가 성공하고 customer-facing SLI가 안정된 첫 시각으로 봅니다. 단, read-only 복구와 full write 복구는 별도 milestone입니다. timeline에는 각 milestone owner와 검증 링크를 남깁니다."
          },
          {
            "q": "business approval은 왜 필요한가요?",
            "answer": "데이터 손실, 주문 보정, 기능 제한 운영은 기술 정상 여부만으로 결정할 수 없습니다. business owner가 고객 보상, 공지 문구, write 재개 조건을 승인해야 합니다. approval record에는 남은 reconciliation 항목을 붙입니다."
          }
        ]
      },
      {
        "q": "DR failover와 failback은 어떤 조건에서 실행하나요?",
        "decision": "DR failover는 primary 복구 대기 비용이 secondary 전환 위험보다 클 때 실행합니다. trigger, split brain 방지, DNS·traffic switch, 데이터 복제 상태, failback 조건을 한 decision record에 묶어야 합니다.",
        "failure": "조급한 failover는 stale replica를 승격하거나 양쪽에 write가 열리는 split brain을 만들 수 있습니다. failback 기준이 없으면 장애가 끝나도 임시 경로가 장기 운영 경로로 굳습니다.",
        "evidence": "primary health evidence, replication lag, fencing action, DNS or traffic switch log, secondary capacity, failback checklist",
        "followups": [
          {
            "q": "failover trigger는 무엇으로 정하나요?",
            "answer": "primary의 customer-facing failure가 지속되고, 예상 복구 시간이 RTO를 넘거나 control plane 복구가 불확실할 때입니다. 단일 health check 실패만으로는 부족합니다. trigger에는 customer impact, primary recovery ETA, secondary readiness가 같이 있어야 합니다."
          },
          {
            "q": "split brain은 어떻게 막나요?",
            "answer": "primary write fencing, leader lease 해제, DNS/traffic cutover 순서, replication freeze를 명확히 합니다. 두 site가 동시에 write를 받으면 나중에 merge가 불가능할 수 있습니다. evidence는 fencing command output과 write endpoint readback입니다."
          },
          {
            "q": "failback은 언제 하나요?",
            "answer": "primary가 안정되고 데이터 방향, replication catch-up, traffic warm-up, rollback path가 검증된 뒤에 합니다. 단순히 primary health가 green이라고 바로 돌리면 두 번째 outage가 납니다. failback에는 canary, DNS TTL 고려, customer SLI 감시가 필요합니다."
          }
        ]
      },
      {
        "q": "좋은 postmortem은 어떤 품질 기준을 가져야 하나요?",
        "decision": "postmortem은 blame 문서가 아니라 다음 incident를 줄이는 운영 설계 문서입니다. timeline, customer impact, contributing factors, detection gap, mitigation effectiveness, action owner와 due date가 있어야 합니다.",
        "failure": "root cause 한 줄로 끝내면 복합 장애의 조건을 잃습니다. action item이 넓거나 owner가 없으면 회고는 닫혔지만 alert, runbook, drill은 그대로라 같은 실패가 반복됩니다.",
        "evidence": "incident timeline, impact summary, contributing factor list, detection gap, action item table, owner and due date",
        "followups": [
          {
            "q": "timeline에는 어떤 시각이 필요하나요?",
            "answer": "failure start, detection, declaration, first mitigation, customer update, restore milestone, close decision을 남깁니다. 시스템 이벤트와 사람이 인지한 시각을 구분해야 MTTD와 MTTR을 제대로 봅니다. 추정 시각은 추정이라고 표시합니다."
          },
          {
            "q": "contributing factor는 root cause와 어떻게 다르나요?",
            "answer": "root cause가 직접 계기라면 contributing factor는 감지 지연, 권한 누락, runbook 부재, capacity headroom 부족처럼 피해를 키운 조건입니다. 이 조건을 쓰지 않으면 action item이 코드 수정 하나로 좁아집니다."
          },
          {
            "q": "action item 품질은 어떻게 판단하나요?",
            "answer": "owner, due date, 검증 방법, 실패하면 다시 열 조건이 있어야 합니다. '모니터링 개선'은 부족하고 'checkout 5xx burn alert를 route별로 추가하고 replay로 검증'처럼 닫힘 증거가 필요합니다."
          }
        ]
      },
      {
        "q": "action item은 어떻게 추적하고 닫나요?",
        "decision": "action item tracking은 재발 방지 약속을 alert, runbook, drill, code change, ownership update 중 하나로 연결하는 운영 관리입니다. 완료 선언은 evidence readback과 재현 검증으로 닫습니다.",
        "failure": "ticket close만 믿으면 실제 on-call 경로가 바뀌지 않습니다. owner 없는 항목, due date 없는 항목, 검증 없는 문서 수정은 다음 incident에서 같은 blind spot으로 돌아옵니다.",
        "evidence": "action tracker, linked PR or runbook diff, alert replay result, drill record, owner sign-off, close verification note",
        "followups": [
          {
            "q": "어떤 action은 ticket으로 닫으면 안 되나요?",
            "answer": "alert route, rollback runbook, restore drill처럼 운영 behavior를 바꾸는 항목은 ticket 상태만으로 부족합니다. 실제 alert replay, dry-run, access check가 통과해야 합니다. close note에는 실행자와 출력 링크가 있어야 합니다."
          },
          {
            "q": "재발 방지 action을 어디에 연결하나요?",
            "answer": "감지 문제는 alert, 판단 문제는 runbook, 실행 문제는 drill, 제품 결함은 PR, ownership 문제는 catalog나 escalation policy에 연결합니다. 연결 대상이 없으면 action이 교육 문장으로만 남습니다."
          },
          {
            "q": "overdue action은 어떻게 escalation하나요?",
            "answer": "severity, 재발 가능성, 고객 영향으로 escalation level을 정합니다. 높은 위험 action이 overdue이면 service owner와 leadership review에 올리고, 임시 control이 필요한지 다시 봅니다. 반복 overdue는 postmortem 품질 문제로 기록합니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-checklist-interview-qa",
    "title": "운영 체크리스트·면접 답변 Q&A",
    "source": "운영 체크리스트·면접 답변",
    "subtitle": "면접 답변 검증에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "장애 답변을 상황-영향-증거-조치-검증 순서로 어떻게 구성하나요?",
        "decision": "좋은 운영 면접 답변은 사건 설명보다 판단 흐름이 먼저 보입니다. 상황, 사용자 영향, 첫 증거, 즉시 조치, 검증 기준을 이 순서로 말하면 면접관은 지원자가 원인 추측과 운영 대응을 구분하는지 평가할 수 있습니다.",
        "failure": "처음부터 원인 가설이나 익숙한 기술 이름으로 들어가면 고객 피해와 완화 기준이 사라집니다. 증거 없이 결론을 말하거나 복구 검증을 빼면 실제 장애에서 같은 방식으로 오판할 위험이 큽니다.",
        "evidence": "incident timeline, affected endpoint, first log or metric sample, mitigation decision log, recovery check",
        "followups": [
          {
            "q": "첫 30초 답변에는 무엇이 들어가야 하나요?",
            "answer": "서비스, 발생 시각, 영향을 받은 사용자나 경로, 현재 확인한 증거 하나, 즉시 줄일 피해를 말합니다. 아직 모르는 원인은 모른다고 두고, 다음 확인 대상을 로그인지 지표인지 사용자 재현인지 지정합니다. 이 구조가 없으면 면접관은 지원자가 원인 설명에만 끌려가는 것으로 봅니다."
          },
          {
            "q": "원인 가설은 언제 넣는 것이 안전한가요?",
            "answer": "사용자 영향과 첫 증거를 말한 뒤 가설이라고 표시해야 합니다. 예를 들어 에러율 상승, 최근 배포 marker, 특정 cohort 실패가 함께 있을 때만 배포 관련 가설을 둡니다. 다음 조치는 가설을 검증할 출력이나 dashboard를 지정하고, 틀릴 때의 우회책을 같이 말하는 것입니다."
          },
          {
            "q": "답변의 마지막은 무엇으로 닫아야 하나요?",
            "answer": "완료 선언이 아니라 검증 기준으로 닫습니다. 정상화된 SLI, 실제 사용자 path smoke, 남은 위험, 관찰 시간을 말하고 owner를 지정합니다. 이 마무리가 없으면 조치는 했지만 복구를 증명하지 못한 답변으로 평가됩니다."
          }
        ]
      },
      {
        "q": "직접 경험과 간접 학습을 면접에서 어떻게 구분해 말하나요?",
        "decision": "면접관은 경험의 크기보다 경계 표시를 봅니다. 직접 수행, 참관, 문서 학습, 추론을 나눠 말하고 각 범위에서 무엇을 판단할 수 있는지 설명하면 과장 없이도 운영 사고력을 보여줄 수 있습니다.",
        "failure": "참관이나 학습 내용을 직접 수행한 것처럼 말하면 꼬리질문에서 역할, 권한, 출력, 실패 처리 근거가 맞지 않습니다. 반대로 모른다고만 끝내면 학습 계획과 검증 능력을 보여주지 못합니다.",
        "evidence": "incident role, change ticket comment, shadowing note, lab reproduction log, learning backlog",
        "followups": [
          {
            "q": "직접 해본 경험은 어떻게 증명하나요?",
            "answer": "내 역할, 사용한 권한, 본 출력, 내린 결정, 실패했을 때 바꾼 조치를 말합니다. 예를 들어 rollback을 실행했다면 artifact, 승인자, 전후 SLI를 같이 제시합니다. 명령 이름만 나열하면 실제 수행 증거가 약하므로 출력 필드나 결정 시각을 붙입니다."
          },
          {
            "q": "간접 경험은 답변에서 어떤 가치가 있나요?",
            "answer": "참관한 incident나 postmortem은 판단 구조를 배운 근거로 쓸 수 있습니다. 다만 실행 주체가 아니었다고 밝히고, 내가 확인한 artifact와 다음에 직접 검증할 항목을 분리합니다. 실패 모드는 남의 결론을 외워 말하는 것이며, 보완 조치는 lab 재현이나 shadowing 계획을 제시하는 것입니다."
          },
          {
            "q": "아직 안 해본 주제는 어떻게 답하나요?",
            "answer": "모른다고 끝내지 말고 경계를 표시한 뒤 검증 계획을 말합니다. 관련 runbook을 찾고, staging에서 어떤 명령 출력과 지표를 볼지, 누구에게 확인할지 제시합니다. 이렇게 말하면 지식 부족은 남아도 운영 리스크를 숨기지 않는 태도로 평가됩니다."
          }
        ]
      },
      {
        "q": "명령 출력은 명령 이름보다 어떤 필드를 해석해야 하나요?",
        "decision": "운영 답변에서 명령은 실행 사실이 아니라 출력 해석이 핵심입니다. status, reason, timestamp, count, desired/current 값, error code, 대상 scope를 읽고 그 필드가 어떤 운영 결정을 바꾸는지 설명해야 합니다.",
        "failure": "명령어를 안다고만 말하면 정상과 위험을 가르는 기준이 없습니다. 평균 상태나 성공 exit code만 보면 일부 shard, region, tenant, replica의 실패를 놓칠 수 있습니다.",
        "evidence": "raw CLI output, field annotation, expected value, abnormal sample, command timestamp",
        "followups": [
          {
            "q": "출력에서 가장 먼저 고를 필드는 무엇인가요?",
            "answer": "질문이 묻는 운영 결정에 연결되는 필드를 고릅니다. 배포면 desired/current revision, 장애면 failing endpoint와 error code, 권한이면 principal과 denied action, 용량이면 limit과 current usage입니다. 필드를 고른 이유를 말하지 못하면 명령 실행은 증거가 아니라 장식이 됩니다."
          },
          {
            "q": "정상 출력과 위험 출력을 어떻게 비교하나요?",
            "answer": "같은 scope의 정상 샘플과 실패 샘플을 나란히 둡니다. 값이 다르면 차이가 사용자 영향과 연결되는지 확인하고, 값이 같으면 관측 위치가 틀렸을 가능성을 봅니다. 다음 조치는 더 가까운 boundary의 로그나 trace를 붙여 출력 해석을 검증하는 것입니다."
          },
          {
            "q": "면접에서 출력 예시는 어떻게 설명하나요?",
            "answer": "한 줄을 그대로 읽기보다 필드 의미와 판단을 붙입니다. 예를 들어 `Ready 1/3`이면 두 replica가 traffic을 못 받는 상태이고, rollout 중인지 crash인지 events로 갈라야 한다고 설명합니다. 후속으로 어떤 명령을 실행할지 말하면 단순 암기와 운영 판독이 분리됩니다."
          }
        ]
      },
      {
        "q": "장애 triage 답변에서 사용자 영향과 완화 우선순위를 어떻게 잡나요?",
        "decision": "triage 답변은 원인 찾기보다 피해 축소 판단을 먼저 보여야 합니다. 영향을 받는 사용자, 최근 변경, 첫 증거, 즉시 가능한 완화, escalation 기준을 분리하면 면접관은 지원자가 장애 중 우선순위를 세울 수 있는지 봅니다.",
        "failure": "원인 분석에만 몰두하면 고객 피해가 커지고, 완화와 영구 수정을 섞으면 임시 예외가 남습니다. 증거 없이 팀을 호출하거나 rollback을 말하면 영향 반경과 부작용을 평가하지 못한 답변입니다.",
        "evidence": "customer impact counter, SLO burn, recent change marker, mitigation option list, escalation log",
        "followups": [
          {
            "q": "첫 증거가 부족해도 완화를 말할 수 있나요?",
            "answer": "사용자 피해가 진행 중이면 원인 확정 전에도 reversible한 완화는 말할 수 있습니다. 예를 들어 traffic shift, feature flag off, read-only mode, rate limit 조정처럼 영향과 rollback이 분명한 조치입니다. 단, 실행 조건과 중단 조건을 SLO나 cohort 지표로 정해야 합니다."
          },
          {
            "q": "최근 변경은 triage에서 어떤 위치에 두나요?",
            "answer": "최근 변경은 유력한 가설이지 결론이 아닙니다. 변경 marker와 오류 시작 시각, 영향 cohort, rollback 가능성을 맞춰 봅니다. 시간이 맞지 않거나 rollback 뒤에도 영향이 같으면 다른 boundary로 이동하고, 그 배제 근거를 timeline에 남깁니다."
          },
          {
            "q": "누구에게 언제 넘기는지 어떻게 답하나요?",
            "answer": "영향이 SLO burn, 보안, 데이터 손상, 결제 경로에 닿으면 escalation 기준을 명시합니다. 넘길 때는 증상 요약이 아니라 확인한 증거, 배제한 가설, 진행 중인 완화, 필요한 결정 권한을 전달합니다. 이 정보가 없으면 다음 담당자가 같은 triage를 반복합니다."
          }
        ]
      },
      {
        "q": "최근 변경을 배포·설정·인프라·의존성 시간축으로 어떻게 연결하나요?",
        "decision": "최근 변경 확인은 배포 하나를 찾는 일이 아니라 시간축의 후보를 정리하는 일입니다. code deploy, config, feature flag, IaC, dependency, provider incident를 같은 timeline에 놓고 영향 시작 시각과 scope가 맞는지 판단합니다.",
        "failure": "가장 눈에 띄는 배포만 탓하면 config drift, 인증서 교체, quota 변경, downstream 장애를 놓칩니다. 반대로 모든 변경을 동일하게 의심하면 rollback 우선순위가 흐려지고 복구가 늦어집니다.",
        "evidence": "deploy marker, config diff, IaC plan or apply log, dependency status, feature flag audit, incident start time",
        "followups": [
          {
            "q": "변경 후보는 어떤 순서로 모으나요?",
            "answer": "사용자 영향이 시작된 시각 전후로 code, config, infrastructure, dependency, traffic routing 변경을 모읍니다. 각 후보에 owner, scope, rollback 방법, 검증 지표를 붙입니다. scope가 영향 cohort와 맞지 않으면 우선순위를 낮추고 배제 근거를 남깁니다."
          },
          {
            "q": "상관관계와 원인 후보를 어떻게 구분하나요?",
            "answer": "시각이 맞는 것만으로는 부족합니다. 변경된 scope와 실패한 cohort, 전후 지표, rollback 또는 disable 결과가 같은 방향을 가리켜야 원인 후보로 올립니다. 맞지 않으면 우연한 동시 발생으로 표시하고 다른 boundary의 증거를 찾습니다."
          },
          {
            "q": "변경이 없다고 나올 때 다음 조치는 무엇인가요?",
            "answer": "변경 없음은 결론이 아니라 감사 범위의 결과입니다. automation 계정, scheduled job, secret rotation, provider health, dependency release를 추가로 봅니다. 그래도 없으면 관측 누락 가능성을 incident record에 표시하고, 다음 장애에서 자동 수집할 change feed를 backlog로 남깁니다."
          }
        ]
      },
      {
        "q": "사용자 영향을 cohort·SLO·business path·blast radius로 어떻게 설명하나요?",
        "decision": "운영 면접에서 사용자 영향은 단순히 많고 적음이 아닙니다. 어떤 cohort가 어떤 business path에서 실패하는지, SLO가 얼마나 타는지, 영향 반경을 어디까지 막았는지 말해야 대응 우선순위가 보입니다.",
        "failure": "전체 평균이나 단일 오류율만 말하면 특정 region, plan, device, tenant의 장애를 숨길 수 있습니다. business path를 빼면 결제, 가입, 알림 같은 실제 피해의 우선순위를 판단하지 못합니다.",
        "evidence": "affected cohort query, SLO dashboard, business journey metric, support ticket sample, traffic split or isolation record",
        "followups": [
          {
            "q": "affected cohort는 어떻게 잡나요?",
            "answer": "region, tenant, plan, device, browser, auth 상태, 새 버전 여부처럼 실패율이 갈리는 축을 봅니다. cohort를 정하면 같은 축의 정상 샘플과 비교해야 합니다. 증거는 query 결과와 support sample이며, 다음 조치는 cohort를 기준으로 완화나 공지를 좁히는 것입니다."
          },
          {
            "q": "business path는 왜 따로 말해야 하나요?",
            "answer": "같은 1% 실패라도 결제 승인, 로그인, 데이터 삭제, 알림 지연은 우선순위가 다릅니다. 답변에는 실패 path, 손실 가능성, 대체 경로, 고객 커뮤니케이션 필요 여부가 들어가야 합니다. path가 없으면 기술 오류 설명은 맞아도 운영 의사결정이 비어 있습니다."
          },
          {
            "q": "blast radius 축소는 어떻게 증명하나요?",
            "answer": "트래픽 분리, feature flag off, bad node drain, cohort별 공지처럼 반경을 줄인 조치를 전후 지표로 보여줍니다. 전체 회복이 아니어도 affected cohort의 실패율이 줄고 새로운 cohort가 악화되지 않아야 합니다. 결과는 mitigation log와 SLO snapshot으로 남깁니다."
          }
        ]
      },
      {
        "q": "복구 완료를 정상화 기준과 남은 위험으로 어떻게 증명하나요?",
        "decision": "복구 답변은 '돌아왔다'가 아니라 어떤 기준으로 정상화됐는지와 무엇이 아직 위험한지 말해야 합니다. user journey, SLO, backlog, error budget, monitoring window를 함께 제시하면 복구 선언의 품질이 드러납니다.",
        "failure": "알람이 조용해졌다는 이유만으로 복구를 말하면 누적 queue, cache warm-up, delayed retry, 특정 cohort 실패를 놓칩니다. 남은 위험을 숨기면 다음 교대자가 같은 장애를 재개시킬 수 있습니다.",
        "evidence": "post-mitigation SLI, smoke test result, backlog drain chart, error budget snapshot, monitoring handoff note",
        "followups": [
          {
            "q": "정상화 기준은 몇 개가 적당한가요?",
            "answer": "최소한 사용자 path, 시스템 지표, 잔여 작업 지표가 필요합니다. 예를 들어 login smoke 성공, 5xx와 latency 회복, queue lag 감소가 함께 있어야 합니다. 하나만 회복되면 부분 정상일 수 있으므로 면접에서는 추가 관찰 기준을 말해야 합니다."
          },
          {
            "q": "monitoring window는 어떻게 정하나요?",
            "answer": "장애의 재발 주기와 지연 효과에 맞춥니다. cache, queue, batch, client retry가 있으면 즉시 회복 뒤에도 충분한 창을 둬야 합니다. evidence는 전후 dashboard snapshot과 alert silence 여부이며, owner가 창 끝에서 재확인하도록 남깁니다."
          },
          {
            "q": "남은 위험은 어떻게 인계하나요?",
            "answer": "해결된 증상, 아직 불확실한 원인, 임시 조치의 만료 시각, 재발 시 실행할 rollback이나 escalation을 분리합니다. 증거는 handoff note, dashboard link, open ticket입니다. 이 인계가 없으면 복구 선언 뒤 운영 부채가 숨어버립니다."
          }
        ]
      },
      {
        "q": "로그·metric·trace·ticket·runbook·screenshot은 각각 언제 쓰나요?",
        "decision": "운영 증거 packet은 많은 링크가 아니라 각 artifact의 역할이 분명해야 합니다. 로그는 사건, metric은 규모와 추세, trace는 경로, ticket은 결정, runbook은 재현 절차, screenshot은 당시 UI 상태를 보완합니다.",
        "failure": "증거를 한 종류로만 채우면 판단이 흔들립니다. screenshot만 있으면 재현성이 약하고, metric만 있으면 개별 요청 경로가 빠지며, ticket만 있으면 실제 시스템 상태를 증명하지 못합니다.",
        "evidence": "log excerpt, metric snapshot, trace id, change or incident ticket, runbook diff, screenshot with timestamp",
        "followups": [
          {
            "q": "incident packet에는 무엇을 최소로 넣나요?",
            "answer": "timeline, 영향 cohort, 첫 증거, 실행한 완화, 검증 결과, 남은 action을 넣습니다. 각 항목은 원본 링크나 출력 일부가 있어야 합니다. 누락되면 postmortem에서 같은 결정을 재현하지 못하므로 packet을 닫기 전에 owner가 readback합니다."
          },
          {
            "q": "screenshot은 언제 충분하지 않나요?",
            "answer": "screenshot은 순간 상태를 보여주지만 query, scope, 권한, 갱신 시각을 보장하지 않습니다. 면접에서는 screenshot을 ticket 보조 증거로 두고 원본 metric query나 audit log를 함께 제시해야 합니다. 보안 정보가 보이면 redaction과 원본 보관 위치도 말합니다."
          },
          {
            "q": "증거가 서로 충돌하면 어떻게 답하나요?",
            "answer": "먼저 timestamp, scope, sampling, aggregation window를 맞춥니다. trace는 실패인데 metric이 정상일 수 있고, metric은 평균이라 cohort 실패를 숨길 수 있습니다. 충돌을 숨기지 말고 더 원천에 가까운 artifact를 찾는 다음 조치를 말합니다."
          }
        ]
      },
      {
        "q": "모르는 주제가 나오면 솔직한 범위와 검증 계획을 어떻게 말하나요?",
        "decision": "면접관은 모든 기술 암기보다 모르는 상태에서의 운영 태도를 봅니다. 모르는 부분, 알고 있는 인접 개념, 위험 가설, 검증 순서, 확인할 사람이나 문서를 분리해 말하면 과장 없이 문제를 다룰 수 있습니다.",
        "failure": "모르는 것을 숨기면 꼬리질문에서 출력, 권한, 실패 모드가 무너집니다. 반대로 모른다고만 하면 운영 현장에서 다음 행동을 만들지 못하는 답변이 됩니다.",
        "evidence": "known/unknown list, hypothesis note, runbook lookup, lab validation plan, escalation contact",
        "followups": [
          {
            "q": "모른다고 말한 뒤 바로 무엇을 덧붙이나요?",
            "answer": "내가 확실히 아는 경계와 확인할 순서를 덧붙입니다. 예를 들어 특정 managed service 내부는 모르지만 control plane 상태, data plane metric, provider health, support case를 확인하겠다고 말합니다. 이 답변은 지식 공백을 운영 절차로 관리합니다."
          },
          {
            "q": "가설은 몇 개까지 말하는 것이 좋나요?",
            "answer": "영향과 증거에 연결되는 2-3개면 충분합니다. 각 가설에는 확인 증거와 틀렸을 때 배제할 기준이 있어야 합니다. 가설을 많이 늘어놓으면 우선순위가 흐려지므로 사용자 피해를 줄일 수 있는 순서로 정리합니다."
          },
          {
            "q": "follow-up 질문은 어떻게 요청하나요?",
            "answer": "면접관에게 책임 회피처럼 묻지 말고 판단에 필요한 범위를 좁혀 묻습니다. 예를 들어 '이 상황이 multi-region active-active인지 single-region failover인지에 따라 확인 순서가 달라집니다'처럼 조건을 제시합니다. 질문 뒤에는 각 조건에서 볼 증거를 바로 말합니다."
          }
        ]
      },
      {
        "q": "클라우드 서비스 답변은 서비스 암기 대신 어떤 경계로 설명하나요?",
        "decision": "클라우드 면접 답변은 서비스 이름보다 control plane, data plane, quota, cost, security boundary를 나눠야 합니다. 이 경계로 답하면 AWS나 Azure 세부 이름이 달라도 운영 판단이 유지됩니다.",
        "failure": "서비스 기능 목록만 외우면 장애 때 설정 변경 실패와 실제 트래픽 실패를 구분하지 못합니다. quota, IAM, region, 비용 한계를 빼면 정상처럼 보이는 서비스가 운영상 위험한 상태인지 판단할 수 없습니다.",
        "evidence": "service health event, API error log, data plane metric, quota dashboard, IAM denial, billing anomaly",
        "followups": [
          {
            "q": "control plane과 data plane은 왜 나누나요?",
            "answer": "control plane은 설정 변경과 API 작업이고, data plane은 실제 요청 처리입니다. 설정 변경이 실패해도 기존 traffic은 정상일 수 있고, 반대로 관리 API가 정상이어도 사용자 요청은 실패할 수 있습니다. 답변에는 두 지표와 대응 차이를 분리해야 합니다."
          },
          {
            "q": "서비스 limit은 답변에서 어떻게 다루나요?",
            "answer": "limit은 장애 원인 후보이면서 변경 승인 조건입니다. current usage, burst behavior, region별 quota, 증설 lead time, 실패 시 error code를 말합니다. 다음 조치는 quota increase, traffic shaping, fallback region 검토처럼 사용자 영향과 비용을 함께 보는 것입니다."
          },
          {
            "q": "비용과 보안 경계는 왜 같이 말하나요?",
            "answer": "운영 완화가 scale-out, cross-region, public exposure, broad IAM 권한으로 이어질 수 있기 때문입니다. 답변에는 비용 급증 신호와 권한 확대 rollback 조건을 같이 둡니다. evidence는 billing anomaly, IAM policy diff, security finding, mitigation expiry ticket입니다."
          }
        ]
      },
      {
        "q": "보안 질문은 threat·control·evidence·tradeoff·rollback으로 어떻게 답하나요?",
        "decision": "보안 답변은 정책 이름보다 위협과 통제의 연결이 중요합니다. 어떤 threat를 줄이는지, 어떤 control이 적용되는지, evidence가 무엇인지, 운영 tradeoff와 rollback 조건이 무엇인지 말해야 합니다.",
        "failure": "보안 모범 사례만 말하면 실제 위험, 사용자 영향, 운영 예외를 다루지 못합니다. control을 적용했지만 evidence와 rollback을 빼면 장애나 우회 예외가 생겼을 때 안전하게 되돌리지 못합니다.",
        "evidence": "threat scenario, policy diff, audit log, access test, exception ticket, rollback plan",
        "followups": [
          {
            "q": "threat를 어떻게 구체화하나요?",
            "answer": "자산, 공격자, 경로, 영향으로 threat를 말합니다. 예를 들어 public bucket이라는 표현보다 민감 로그가 외부 principal에게 읽히는 경로와 예상 피해를 설명합니다. 이렇게 해야 control이 encryption인지 IAM 축소인지 network 차단인지 분명해집니다."
          },
          {
            "q": "control이 작동한다는 evidence는 무엇인가요?",
            "answer": "정책 diff만으로는 부족합니다. denied audit log, access analyzer 결과, test principal의 실패, alert firing 또는 suppression 증거를 봅니다. 정상 사용자의 path가 깨지지 않았다는 smoke도 같이 있어야 보안 강화와 운영 안정성을 함께 증명합니다."
          },
          {
            "q": "보안 조치의 rollback은 어떻게 말하나요?",
            "answer": "rollback은 보호를 포기한다는 뜻이 아니라 안전한 예외 범위를 정하는 것입니다. 예외 principal, 만료 시각, compensating control, 재적용 조건을 명시합니다. evidence는 exception ticket, audit log, owner approval이며, 무기한 예외는 실패 모드로 지적합니다."
          }
        ]
      },
      {
        "q": "운영 성장 계획은 약점·drill·shadowing·runbook·review로 어떻게 증명하나요?",
        "decision": "성장 계획 답변은 열심히 하겠다는 의지가 아니라 개선 루프를 보여야 합니다. 약점 진단, 반복 drill, 숙련자 shadowing, runbook 수정, incident review 참여를 연결하면 학습이 운영 성과로 이어지는지 평가할 수 있습니다.",
        "failure": "기술 목록을 많이 공부하겠다고만 하면 현재 약점과 검증 방법이 없습니다. drill 없이 문서만 읽거나 review 없이 혼자 연습하면 실제 장애 압박에서 재현 가능한 성장이 아닙니다.",
        "evidence": "skill gap list, drill result, shadowing note, runbook pull request, incident review action, mentor feedback",
        "followups": [
          {
            "q": "약점은 어떻게 진단했다고 말하나요?",
            "answer": "막연히 부족하다고 하지 말고 실패한 상황과 증거를 듭니다. 예를 들어 incident에서 first evidence를 늦게 잡았거나 rollback 기준을 설명하지 못했다면 그 항목을 약점으로 둡니다. 다음 조치는 같은 상황을 재현하는 drill과 측정 기준을 정하는 것입니다."
          },
          {
            "q": "drill과 shadowing은 어떻게 다르게 쓰나요?",
            "answer": "drill은 내가 직접 판단하고 시간을 재는 연습이고, shadowing은 숙련자의 분기 기준을 배우는 과정입니다. 둘을 연결해 shadowing에서 본 decision point를 다음 drill checklist에 넣습니다. evidence는 drill log, 관찰 메모, 개선된 runbook diff입니다."
          },
          {
            "q": "성장 결과는 어떤 산출물로 증명하나요?",
            "answer": "runbook PR, alert tuning, postmortem action closure, incident review 발표, 재실행한 drill 결과처럼 남는 산출물로 말합니다. 좋은 답변은 다음 장애에서 시간이 얼마나 줄었는지나 누락 증거가 어떻게 줄었는지를 포함합니다. 산출물이 없으면 학습이 운영 개선으로 검증되지 않은 상태입니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-cloud-scenarios-qa",
    "title": "AWS·Azure 실전 시나리오 Q&A",
    "source": "AWS·Azure 실전 시나리오",
    "subtitle": "클라우드 시나리오에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "새 워크로드의 region은 latency만 보고 고르면 왜 위험한가요?",
        "decision": "region 선택은 사용자 지연 시간, 데이터 주권, 규제 위치, 필요한 managed service 제공 여부, quota 여유, 장애 시 대체 region을 함께 보는 결정입니다. 답변은 AWS나 Azure의 region 이름보다 control plane 가용성, data plane 지연, compliance boundary, 서비스 출시 범위를 분리해 설명해야 합니다.",
        "failure": "가장 가까운 region만 고르면 필요한 SKU가 없거나 quota 증설이 늦고, 법적 보관 위치가 어긋나거나 provider regional event 때 대체 경로가 없습니다. 반대로 모든 region을 열어 두면 복제 비용, 데이터 이동, 운영 권한 범위가 커집니다.",
        "evidence": "region service catalog, latency probe, data residency requirement, quota usage, service health history, failover candidate list",
        "followups": [
          {
            "q": "후보 region을 줄일 때 첫 기준은 무엇인가요?",
            "answer": "사용자 위치별 p95 latency와 법적 데이터 위치를 먼저 묶습니다. 그 다음 필요한 database, load balancer, private endpoint, backup 기능이 후보 region에서 실제 제공되는지 확인합니다. 하나라도 preview 상태이거나 quota가 부족하면 그 region은 기본 후보가 아니라 예외 승인 대상으로 둡니다."
          },
          {
            "q": "regional health 이벤트가 있을 때 서비스 장애로 바로 보나요?",
            "answer": "provider health가 빨간색이어도 data plane이 계속 처리되는 서비스가 있고, control plane만 지연되는 경우도 있습니다. 사용자 synthetic, regional metric, API error를 같은 시간대에 맞춰 control plane 변경 실패인지 실제 요청 실패인지 나눕니다. 변경 작업 중이면 배포를 멈추고, 요청 경로 장애이면 traffic shift나 throttling을 먼저 검토합니다."
          },
          {
            "q": "선택 근거는 어떤 형태로 남기나요?",
            "answer": "결정 기록에는 선택 region, 탈락 region, latency 샘플, 규제 요구, 미제공 서비스, quota 증설 티켓, 대체 region 조건을 남깁니다. 나중에 장애가 나면 이 기록이 traffic failover 후보와 금지된 데이터 이동 경로를 동시에 알려 줍니다."
          }
        ]
      },
      {
        "q": "multi-AZ 구성이 실제 zone 장애를 견디는지 어떻게 설명하나요?",
        "decision": "multi-AZ는 리소스를 여러 zone에 배치했다는 말이 아니라 quorum, data locality, state replication, traffic routing, failover test가 zone 손실을 견디는지 증명하는 문제입니다. 답변에는 어느 컴포넌트가 zonal이고 어느 컴포넌트가 regional인지가 드러나야 합니다.",
        "failure": "컴퓨트만 여러 zone에 있고 NAT, queue consumer, database writer, quorum member가 한 zone에 몰리면 장애 반경은 여전히 단일 zone입니다. 자동 failover가 있더라도 connection 재시도, DNS TTL, write consistency를 검증하지 않으면 사용자 실패가 길어집니다.",
        "evidence": "zone placement map, quorum rule, failover drill log, replication lag, zonal dependency list, traffic distribution metric",
        "followups": [
          {
            "q": "zone redundancy를 리뷰할 때 가장 먼저 그리는 것은 무엇인가요?",
            "answer": "요청 경로, state 저장소, outbound NAT, private endpoint, queue, monitoring agent를 zone별로 배치한 표를 만듭니다. 한 zone 장애 시 남은 zone 수가 quorum과 min capacity를 만족하지 못하면 redundancy가 아니라 분산 배치에 그친 상태입니다."
          },
          {
            "q": "failover test에서 통과와 실패를 가르는 기준은 무엇인가요?",
            "answer": "장애 주입 뒤 traffic이 남은 zone으로 이동하고, write path가 허용된 RPO 안에서 이어지며, client retry가 connection reset을 회복해야 통과입니다. replication lag가 커지거나 connection pool이 이전 writer를 붙잡으면 테스트는 실패로 기록하고 pool TTL과 retry 정책을 고칩니다."
          },
          {
            "q": "data locality는 왜 별도로 언급하나요?",
            "answer": "zone을 넘는 read/write가 늘면 지연 시간과 전송 비용이 증가하고, 일부 storage나 cache는 zone 밖 접근에서 장애 모드가 달라집니다. locality evidence는 replica 위치, cross-zone traffic, quorum membership이며, 위험하면 shard placement나 read preference를 먼저 조정합니다."
          }
        ]
      },
      {
        "q": "service quota와 capacity ceiling은 변경 전에 어떻게 확인하나요?",
        "decision": "quota 확인은 현재 사용률만 보는 작업이 아니라 region별 limit, SKU/instance availability, burst policy, API throttling, 증설 lead time을 배포 계획에 넣는 일입니다. 답변은 capacity가 부족할 때 사용자 영향이 throttling, provisioning failure, delayed scale-out 중 어디로 나타나는지 설명해야 합니다.",
        "failure": "테스트 계정에서 성공한 크기를 운영 region에 그대로 적용하면 instance family가 없거나 quota increase가 승인되지 않아 scale-out이 멈춥니다. API request limit을 빼면 배포 자동화가 부분 생성 상태로 남아 rollback도 어려워집니다.",
        "evidence": "quota usage by region, SKU availability, throttling error code, capacity reservation, quota increase ticket, deployment forecast",
        "followups": [
          {
            "q": "quota 위험은 어떤 숫자로 말해야 하나요?",
            "answer": "현재 사용량, 배포 후 예상 사용량, burst 순간값, region별 limit, 증설 요청 SLA를 같이 말합니다. 예를 들어 max capacity가 limit의 80%를 넘고 증설 lead time이 배포일보다 길면 배포 승인이 아니라 capacity plan 수정이 먼저입니다."
          },
          {
            "q": "throttling과 quota exhaustion은 어떻게 구분하나요?",
            "answer": "throttling은 API 호출률이나 control plane rate limit 때문에 발생하고, quota exhaustion은 생성 가능한 리소스 총량이나 SKU 한계에 닿은 상태입니다. evidence는 error code, request id, retry-after, resource count, regional limit이며, 조치는 retry tuning과 quota increase로 갈립니다."
          },
          {
            "q": "증설이 늦으면 어떤 우회책을 먼저 검토하나요?",
            "answer": "traffic shaping, batch concurrency 축소, 다른 instance family, pre-warmed pool, capacity reservation, 대체 region을 순서대로 검토합니다. 비용과 가용성 tradeoff가 크므로 임시 우회에는 만료 시각과 owner를 붙이고, 증설 승인 뒤 원래 capacity model로 되돌립니다."
          }
        ]
      },
      {
        "q": "managed DB failover가 끝났는데도 오류가 남는 이유는 무엇인가요?",
        "decision": "RDS, Aurora, Azure SQL 같은 managed DB failover는 writer 전환만으로 끝나지 않습니다. replica lag, DNS 갱신, connection pooling, transaction retry, read/write endpoint 사용 방식까지 확인해야 data plane 복구를 설명할 수 있습니다.",
        "failure": "provider가 failover 완료를 표시해도 애플리케이션 pool이 이전 endpoint를 붙잡거나 DNS TTL이 길면 오류가 계속됩니다. replica lag가 큰 상태에서 read endpoint를 열면 stale read나 lost update처럼 보이는 장애가 생깁니다.",
        "evidence": "failover event timeline, writer endpoint readback, replica lag metric, DNS TTL, connection pool logs, transaction retry errors",
        "followups": [
          {
            "q": "failover 완료 신호는 어디서 확인하나요?",
            "answer": "provider event, cluster role, writer endpoint, application connection target을 모두 봅니다. console event만 완료여도 app log에 이전 writer IP나 connection refused가 남으면 사용자 경로는 아직 복구 전입니다. 다음 조치는 pool recycle, DNS cache flush, retry window 연장입니다."
          },
          {
            "q": "replica lag는 어떤 의사결정을 바꾸나요?",
            "answer": "lag가 RPO나 read-after-write 요구를 넘으면 read replica로 트래픽을 돌리면 안 됩니다. lag metric, binlog 또는 LSN 위치, read query stale sample을 증거로 두고, 일시적으로 read를 primary로 모으거나 쓰기 기능을 제한합니다."
          },
          {
            "q": "connection pool 설정은 왜 장애 답변에 들어가나요?",
            "answer": "pool max lifetime, validation query, retry backoff가 endpoint 전환 시간을 결정합니다. pool이 오래된 socket을 재사용하면 DB는 정상이어도 앱은 계속 5xx를 냅니다. incident 기록에는 pool recycle 시각, 오류율 변화, 최종 endpoint 확인 결과를 남깁니다."
          }
        ]
      },
      {
        "q": "object storage policy는 접근 오류와 유출 위험을 어떻게 동시에 다루나요?",
        "decision": "S3나 Blob storage의 policy 답변은 public access, identity condition, encryption, lifecycle, versioning, replication을 함께 봅니다. 읽기 실패만 해결하려고 policy를 넓히면 보안 사고가 되고, 보안만 좁히면 backup, CDN, analytics 경로가 끊길 수 있습니다.",
        "failure": "bucket/container policy, block public access, SAS 또는 signed URL, KMS 권한이 서로 다른 결론을 내면 일부 client만 실패합니다. lifecycle과 replication을 빼면 복구 시점이나 삭제 보존 정책을 설명하지 못합니다.",
        "evidence": "bucket policy diff, public access setting, access denied audit log, lifecycle rule, versioning state, replication status",
        "followups": [
          {
            "q": "403 오류가 나면 policy부터 넓히면 되나요?",
            "answer": "먼저 principal, action, resource, condition, encryption key 권한을 audit log와 policy simulator로 맞춥니다. public block이나 network condition이 막은 요청이면 policy 확대가 아니라 호출 주체나 endpoint 경로를 고쳐야 합니다."
          },
          {
            "q": "versioning과 lifecycle은 장애 대응에서 왜 중요하나요?",
            "answer": "잘못된 삭제나 overwrite를 복구할 수 있는지는 versioning과 retention에 달려 있습니다. lifecycle rule이 너무 짧으면 복구 후보가 이미 삭제되고, legal hold가 있으면 비용 정리나 삭제 요청이 실패합니다. evidence는 object version, delete marker, lifecycle transition log입니다."
          },
          {
            "q": "replication 문제는 어떻게 사용자 영향으로 연결하나요?",
            "answer": "primary region 쓰기는 성공했지만 replica region 읽기가 지연되면 DR, CDN origin, analytics job이 stale data를 볼 수 있습니다. replication backlog, failed object count, destination policy denial을 보고 임시로 primary origin으로 읽게 할지, 배치 작업을 멈출지 결정합니다."
          }
        ]
      },
      {
        "q": "load balancer path 장애는 listener, probe, target 중 어디서 가르나요?",
        "decision": "ALB, NLB, Azure Load Balancer, App Gateway 답변은 client TLS/SNI, listener rule, health probe, target registration, drain, backend protocol을 순서대로 좁혀야 합니다. 평균 5xx가 아니라 어떤 hop에서 요청이 멈췄는지가 핵심입니다.",
        "failure": "health probe가 앱 readiness와 다르면 죽은 target이 계속 traffic을 받거나 정상 target이 빠집니다. TLS 인증서나 SNI mismatch를 target 문제로 오판하면 backend를 재시작해도 client 오류가 사라지지 않습니다.",
        "evidence": "listener rule, TLS handshake log, health probe result, target status, access log status split, drain timeout setting",
        "followups": [
          {
            "q": "ALB와 NLB 계열을 구분해서 답해야 하는 이유는 무엇인가요?",
            "answer": "L7 load balancer는 host/path rule, HTTP status, header, WAF 연결을 보고, L4 load balancer는 TCP 흐름, port, target health, connection reset을 봅니다. 증거가 다르기 때문에 502 원인과 SYN timeout 원인을 같은 방식으로 처리하면 안 됩니다."
          },
          {
            "q": "health probe가 정상인데 사용자는 실패하면 무엇을 의심하나요?",
            "answer": "probe path가 너무 얕거나 probe source만 허용된 경우를 봅니다. 실제 user path의 auth, DB, downstream dependency, TLS backend validation을 synthetic으로 재현하고, probe 기준을 readiness 의미에 맞게 바꾸거나 target을 수동 drain합니다."
          },
          {
            "q": "TLS/SNI 변경 리뷰의 중단 조건은 무엇인가요?",
            "answer": "certificate chain, SAN, SNI rule, minimum TLS version, client compatibility matrix 중 하나라도 운영 client와 맞지 않으면 rollout을 멈춥니다. evidence는 handshake failure sample, access log TLS field, certificate expiry, rollback listener rule입니다."
          }
        ]
      },
      {
        "q": "autoscaling은 언제 가용성을 높이고 언제 비용 사고가 되나요?",
        "decision": "autoscaling 답변은 metric lag, cooldown, warmup, min/max capacity, quota, cost guardrail을 함께 설명해야 합니다. scale-out이 늦으면 availability가 깨지고, scale-in이 빠르면 flap이 생기며, max가 너무 높으면 비용과 downstream pressure가 폭증합니다.",
        "failure": "CPU 평균만 보고 scaling하면 queue backlog, cold start, dependency saturation을 놓칩니다. cooldown이 짧으면 계속 증감하고, warmup이 길면 새 capacity가 metric에 반영되기 전에 또 scale-out합니다.",
        "evidence": "scaling policy, metric delay, cooldown setting, warmup time, min max capacity, quota headroom, cost forecast",
        "followups": [
          {
            "q": "scale-out 지연은 어떻게 증명하나요?",
            "answer": "부하 증가 시각, metric 집계 지연, alarm firing, instance 또는 pod ready 시각, traffic 회복 시각을 한 타임라인에 둡니다. ready 시각보다 오류가 먼저 줄지 않으면 다른 완화가 효과를 낸 것이고, ready가 늦으면 warm pool이나 예측 scaling을 검토합니다."
          },
          {
            "q": "min과 max capacity는 어떤 tradeoff인가요?",
            "answer": "min은 cold start와 zone loss 여유를 줄이고, max는 비용 폭주와 downstream overload를 막습니다. 트래픽 예측, RTO, quota headroom, database connection limit을 같이 보고 max가 downstream 한계를 넘으면 rate limit이나 queueing을 먼저 둡니다."
          },
          {
            "q": "scale-in 사고를 막는 증거는 무엇인가요?",
            "answer": "drain 완료, in-flight request 감소, queue depth 회복, connection close, target deregistration delay를 확인합니다. evidence 없이 scale-in하면 긴 요청이나 batch job이 잘릴 수 있으므로 cooldown과 termination hook을 함께 기록합니다."
          }
        ]
      },
      {
        "q": "cost anomaly는 사용량 증가와 단가 변경 중 어디서 갈라 보나요?",
        "decision": "cost anomaly 답변은 usage, unit price, region, SKU, tag, owner, recent change를 분리해 봅니다. 비용은 장애가 아니라고 넘기지 않고, runaway scale, logging 폭증, cross-region transfer, orphaned resource처럼 운영 위험으로 연결합니다.",
        "failure": "총액만 보면 트래픽 증가인지 가격 tier 변경인지 알 수 없습니다. tag와 owner가 없으면 중지해도 되는 리소스와 고객 영향 리소스를 구분하지 못하고, 급한 차단이 서비스 장애로 이어질 수 있습니다.",
        "evidence": "cost anomaly alert, usage metric, unit price diff, tag coverage, owner map, recent deployment, emergency budget guardrail",
        "followups": [
          {
            "q": "비용 급증을 처음 받으면 어떤 표로 나누나요?",
            "answer": "서비스, region, SKU, usage quantity, unit price, tag owner, 변경 시각으로 나눕니다. usage가 늘었으면 autoscaling, retry storm, log ingestion을 보고, price가 바뀌었으면 tier, region 이동, 예약 인스턴스 적용 실패를 확인합니다."
          },
          {
            "q": "emergency guardrail은 어디까지 자동화하나요?",
            "answer": "non-prod, untagged, idle resource는 자동 정지 후보가 될 수 있지만 production data plane은 자동 차단보다 rate limit, sampling 축소, owner approval이 필요합니다. guardrail에는 예외 조건, 알림 대상, 되돌림 명령을 같이 둡니다."
          },
          {
            "q": "owner attribution이 안 되면 다음 조치는 무엇인가요?",
            "answer": "tag coverage report, IaC state, cloud audit event, deployment marker를 역추적해 owner를 지정합니다. owner가 없으면 새 리소스 생성을 막는 policy를 추가하고, 기존 orphaned resource는 snapshot 또는 dependency check 뒤 폐기 후보로 분류합니다."
          }
        ]
      },
      {
        "q": "IAM과 managed identity 문제는 권한 부족과 과다 권한을 어떻게 같이 보나요?",
        "decision": "identity boundary 답변은 role assignment, trust relationship, managed identity binding, policy condition, resource scope, least privilege를 함께 다룹니다. 접근 실패를 풀 때도 어떤 principal에게 어떤 action과 condition을 허용하는지 제한해야 합니다.",
        "failure": "403을 빨리 풀려고 wildcard 권한을 주면 incident 완화가 장기 보안 부채가 됩니다. 반대로 trust policy나 condition mismatch를 보지 않으면 올바른 권한을 줘도 assume role이나 token exchange 단계에서 계속 실패합니다.",
        "evidence": "access denied event, policy simulator, role assignment diff, managed identity binding, condition key, last accessed data, break glass ticket",
        "followups": [
          {
            "q": "access denied가 나면 어떤 순서로 좁히나요?",
            "answer": "principal identity, token issuer, target resource, requested action, policy condition, explicit deny를 순서대로 봅니다. simulator가 allow여도 실제 event에 다른 principal이나 region condition이 찍히면 role binding 또는 workload identity 설정을 고쳐야 합니다."
          },
          {
            "q": "least privilege 리뷰에서 허용 가능한 임시 권한은 무엇인가요?",
            "answer": "임시 권한은 action, resource, condition, 만료 시각, ticket owner가 있어야 합니다. break glass가 필요하면 audit log와 session recording을 켜고, 정상화 뒤 policy diff와 last accessed data로 wildcard를 제거합니다."
          },
          {
            "q": "managed identity 장애는 애플리케이션 문제와 어떻게 구분하나요?",
            "answer": "metadata endpoint reachability, token acquisition log, audience 또는 scope, role assignment propagation 시간을 확인합니다. token이 없으면 identity binding 문제이고, token은 있는데 호출이 실패하면 policy 또는 resource condition 문제입니다."
          }
        ]
      },
      {
        "q": "cloud audit log는 장애 조사와 보안 증거로 어떻게 설계하나요?",
        "decision": "CloudTrail, Activity Log 같은 audit log는 control plane에서 누가 어떤 변경을 했는지 증명합니다. 답변에는 data plane 로그와의 차이, retention, delivery delay, tamper resistance, central account 보관, 검색 가능성이 포함되어야 합니다.",
        "failure": "audit log를 켰다는 사실만 말하면 장애 시 변경자를 찾지 못하거나 로그가 너무 짧게 보관됩니다. 공격자가 같은 계정에서 로그를 지울 수 있으면 증거 가치가 떨어지고, data plane 이벤트가 빠지면 객체 접근이나 key 사용을 놓칠 수 있습니다.",
        "evidence": "audit trail configuration, log delivery status, retention policy, immutable storage, cross account sink, control plane event sample",
        "followups": [
          {
            "q": "control plane 증거로 무엇을 확인하나요?",
            "answer": "event time, caller identity, source IP, API name, target resource, request id, error code를 봅니다. 변경 시각과 장애 시작이 맞고 target resource가 일치하면 rollback 후보가 되고, read-only 이벤트만 있으면 다른 data plane 증거를 더 봐야 합니다."
          },
          {
            "q": "retention과 tamper risk는 어떻게 답하나요?",
            "answer": "retention은 incident 조사 기간, 규제 요구, backup 주기에 맞춰 정하고, 로그 저장소는 운영 계정과 권한을 분리합니다. 삭제 방지, object lock, central security account, alert on logging disabled가 없으면 evidence가 조작될 수 있다고 말해야 합니다."
          },
          {
            "q": "audit log가 늦게 도착하면 무엇으로 보완하나요?",
            "answer": "delivery delay가 있으면 provider event history, IaC apply log, CI deployment marker, service-specific event, metrics anomaly를 임시 증거로 묶습니다. 최종 audit event가 도착하면 request id와 resource id를 대조해 incident timeline을 갱신합니다."
          }
        ]
      },
      {
        "q": "provider outage나 control plane lag 때 무엇을 멈추고 무엇을 계속하나요?",
        "decision": "provider outage 답변은 service health, support case, control plane API, data plane request를 분리합니다. 관리 API가 느려도 기존 data plane이 살아 있으면 무리한 재배포보다 변경 동결과 관측을 우선합니다.",
        "failure": "control plane 지연을 애플리케이션 장애로 오해해 재시작이나 재배포를 반복하면 정상 data plane까지 흔들 수 있습니다. 반대로 service health만 보고 사용자 synthetic을 보지 않으면 실제 고객 영향이 있는 data plane 장애를 놓칩니다.",
        "evidence": "provider service health, API latency, data plane synthetic, support case id, deployment freeze record, status page update",
        "followups": [
          {
            "q": "data plane이 살아 있으면 어떤 조치를 피하나요?",
            "answer": "새 리소스 생성, scale-in, redeploy, failover처럼 control plane 호출이 많은 작업을 멈춥니다. 기존 트래픽이 처리되는 증거가 synthetic과 business metric에 있으면 변경 동결, customer communication, support case escalation으로 대응합니다."
          },
          {
            "q": "support case에는 어떤 정보를 넣어야 하나요?",
            "answer": "region, service, account 또는 subscription, request id, error code, first seen time, reproduction command, user impact, attempted mitigation을 넣습니다. provider가 확인할 수 있는 request id가 없으면 일반 문의가 되어 대응 시간이 길어집니다."
          },
          {
            "q": "mitigation은 언제 cross-region으로 넘어가나요?",
            "answer": "사용자 data plane 실패가 확인되고, 대체 region의 data freshness, quota, DNS 또는 traffic manager 전환 조건이 충족될 때입니다. control plane만 느린 상태에서 성급히 region을 옮기면 데이터 복제와 비용 문제가 더 커질 수 있습니다."
          }
        ]
      },
      {
        "q": "managed service와 self-managed 선택은 어떤 tradeoff로 답하나요?",
        "decision": "architecture tradeoff는 기능 비교보다 운영 책임 경계를 설명하는 답변입니다. managed service는 patching, HA, backup, failover 일부를 provider에 맡기지만 quota, lock-in, customization, regional availability 제약을 받습니다. self-managed는 제어권이 크지만 운영 burden과 on-call 책임이 커집니다.",
        "failure": "managed service를 쓰면 운영이 사라진다고 말하면 capacity, IAM, cost, observability, failover test가 빠집니다. self-managed를 선택하면서 patch, backup restore, security hardening, upgrade window를 준비하지 않으면 팀이 감당할 수 없는 플랫폼을 갖게 됩니다.",
        "evidence": "responsibility matrix, portability requirement, operational runbook, SLO and RTO target, cost model, provider limit, exit plan",
        "followups": [
          {
            "q": "lock-in은 무조건 피해야 하나요?",
            "answer": "lock-in은 위험이 아니라 비용과 회수 조건이 있는 선택입니다. SLO, 운영 인력, 출시 속도가 managed service 이득을 크게 만들면 허용할 수 있지만, data export, schema portability, authentication boundary, exit drill은 미리 남겨야 합니다."
          },
          {
            "q": "self-managed가 더 낫다고 말하려면 어떤 조건이 필요하나요?",
            "answer": "team이 patch, backup restore, monitoring, capacity planning, incident response를 실제로 운영할 수 있어야 합니다. provider managed service가 compliance나 customization을 만족하지 못할 때만 self-managed를 선택하고, runbook과 on-call 소유권을 증거로 제시합니다."
          },
          {
            "q": "architecture decision record에는 무엇을 넣나요?",
            "answer": "선택한 서비스, 포기한 대안, 책임 경계, quota와 region 제약, 비용 가정, failure mode, rollback 또는 exit 조건을 넣습니다. 나중에 요구사항이 바뀌면 이 기록으로 lock-in 비용과 운영 부담을 다시 평가합니다."
          }
        ]
      }
    ]
  },
  {
    "id": "operations-ai-llm-operations-qa",
    "title": "AI·LLM 운영 Addendum Q&A",
    "source": "AI·LLM 운영 Addendum",
    "subtitle": "LLM 운영 경로에서 판단 기준, 실패 신호, 완화 선택, 인계 증거를 실제 운영 언어로 답하는 Q&A입니다.",
    "questions": [
      {
        "q": "model gateway 라우팅 장애는 어느 경계에서 먼저 가르나요?",
        "decision": "첫 판단은 요청이 올바른 모델, provider, tenant policy, data boundary를 통과했는지 확인하는 것입니다. route id, tenant rule, model/provider 선택, region, trace id를 한 줄로 묶어 정책 차단과 provider 호출 실패를 분리합니다.",
        "failure": "라우팅 증거 없이 모델 응답만 보면 금지된 tenant가 잘못된 provider로 나가거나, 데이터 경계 밖 region으로 전송된 요청을 품질 이슈로 오판할 수 있습니다.",
        "evidence": "gateway route log, tenant policy snapshot, provider request trace, data boundary audit",
        "followups": [
          {
            "q": "라우팅 실패와 provider 실패는 어떻게 나누나요?",
            "answer": "먼저 gateway route log에서 route id, provider id, model name, policy decision, trace id가 생성됐는지 봅니다. route log가 없으면 gateway 또는 tenant policy 문제이고, route는 성공했지만 provider request trace에 429/5xx/timeout이 있으면 provider 경계 문제로 분리합니다."
          },
          {
            "q": "tenant policy와 data boundary는 어떤 증거로 확인하나요?",
            "answer": "tenant policy snapshot, allow/deny reason, residency tag, provider region을 같은 trace id로 맞춥니다. 요청 본문이 허용된 region 밖 provider로 전송됐거나 policy version이 배포 버전과 다르면 즉시 해당 tenant 라우트를 차단하고 정책 롤백 후보를 기록합니다."
          },
          {
            "q": "라우팅 수정 뒤에는 무엇을 검증하나요?",
            "answer": "수정 후에는 실패 tenant와 정상 tenant를 각각 재실행해 route id, provider id, model version, residency tag가 기대값으로 남는지 확인합니다. runbook에는 변경한 policy rule, 영향 tenant 목록, 재발 시 끊을 kill switch와 trace 예시를 남깁니다."
          }
        ]
      },
      {
        "q": "token budget과 context truncation 변경은 어떤 영향부터 봐야 하나요?",
        "decision": "첫 판단은 예산 감소나 retrieval compression이 사용자가 보는 답변 품질을 훼손하는지입니다. input/output token ledger, truncation marker, retrieval chunk count, user-visible diff를 같은 요청군에서 비교합니다.",
        "failure": "평균 토큰만 보면 긴 문서, 다국어 입력, 첨부 기반 질문에서 핵심 근거가 잘려도 비용 절감 성공처럼 보일 수 있습니다.",
        "evidence": "token ledger, truncation marker sample, retrieval compression report, user answer diff",
        "followups": [
          {
            "q": "truncation이 실제로 일어났는지는 어디서 보나요?",
            "answer": "prompt assembly log의 original token count, kept chunk count, dropped chunk ids, truncation reason을 봅니다. 삭제된 chunk가 답변 근거나 사용자 지시를 포함하면 단순 비용 최적화가 아니라 품질 회귀로 분류하고 해당 query class를 롤아웃 제외합니다."
          },
          {
            "q": "retrieval compression은 어떻게 승인하나요?",
            "answer": "압축 전후의 citation coverage, answer completeness score, dropped entity list, golden prompt replay를 비교합니다. 핵심 entity가 빠지거나 출처가 사라지면 compression ratio가 좋아도 승인하지 않고 chunking rule이나 max context를 조정합니다."
          },
          {
            "q": "사용자 영향은 어떤 지표로 닫나요?",
            "answer": "동일 request family의 답변 길이, citation miss, regeneration rate, user correction rate를 변경 전 기준선과 비교합니다. 영향이 확인되면 high-context tenant만 이전 budget으로 되돌리고, ledger에는 feature별 budget과 rollback 시각을 남깁니다."
          }
        ]
      },
      {
        "q": "LLM latency SLO 위반은 어느 구간을 먼저 나누나요?",
        "decision": "첫 판단은 대기열, gateway, prompt assembly, model first token, stream tail, post-processing 중 어디가 p95/p99를 밀어 올렸는지입니다. 평균이 아니라 percentile과 timeout 분포로 사용자 체감 지연을 분리합니다.",
        "failure": "streaming 첫 토큰은 빠른데 tail이 길거나, provider latency가 정상인데 queue wait가 늘어난 상황을 모델 성능 문제로 처리하면 완화가 늦습니다.",
        "evidence": "latency span breakdown, queue depth metric, first-token histogram, timeout log",
        "followups": [
          {
            "q": "model latency와 queueing은 어떻게 구분하나요?",
            "answer": "trace span에서 enqueue, dequeue, provider request start, first token, final token 시각을 분리합니다. queue wait가 p99 상승을 이끌면 concurrency limit이나 tenant throttle을 조정하고, provider span이 길면 provider incident 또는 fallback 후보로 넘깁니다."
          },
          {
            "q": "streaming 응답은 어떤 기준으로 정상 처리하나요?",
            "answer": "first-token p95, token cadence, final-token p99, client disconnect rate를 함께 봅니다. 첫 토큰만 SLO 안에 있고 final-token p99가 timeout 근처이면 사용자는 여전히 실패를 겪으므로 max output, tool call, post-processing 병목을 줄입니다."
          },
          {
            "q": "timeout 완화는 어떤 순서로 적용하나요?",
            "answer": "사용자 실패가 큰 경로부터 shorter prompt, cached retrieval, lower-latency model, queue shedding 순서로 완화합니다. 각 조치는 p95/p99, timeout count, answer quality sample을 같이 보며 비용이나 품질을 훼손하면 즉시 범위를 줄입니다."
          }
        ]
      },
      {
        "q": "retry budget과 rate limit 장애는 무엇을 먼저 제한하나요?",
        "decision": "첫 판단은 재시도가 성공률을 올리는지, provider quota와 비용을 소모해 장애를 증폭하는지입니다. retry attempt, backoff, quota remaining, tenant concurrency, duplicate charge를 같은 창에서 봅니다.",
        "failure": "무제한 재시도는 429와 5xx를 더 키우고, thundering herd로 정상 tenant까지 quota를 소진시킬 수 있습니다.",
        "evidence": "retry ledger, provider quota dashboard, rate-limit response sample, cost per attempt report",
        "followups": [
          {
            "q": "재시도를 허용할 요청은 어떻게 고르나요?",
            "answer": "idempotency key, provider error code, request cost, user action type을 봅니다. 408/429/temporary 5xx만 제한된 backoff로 허용하고, 이미 tool side effect가 발생했거나 긴 generation 비용이 큰 요청은 사용자 재시도 안내로 전환합니다."
          },
          {
            "q": "provider quota가 줄어들 때 즉시 조치는 무엇인가요?",
            "answer": "quota remaining과 burn rate가 알림 기준을 넘으면 낮은 우선순위 tenant, batch job, long-context feature부터 rate limit을 낮춥니다. 동시에 fallback provider의 data boundary와 feature support를 확인해 무조건 우회하지 않습니다."
          },
          {
            "q": "thundering herd 재발은 어떻게 막나요?",
            "answer": "재시도 jitter, per-tenant retry budget, circuit breaker open time, queue admission rule을 변경 기록에 남깁니다. 검증은 provider 429 비율, duplicate token cost, successful retry ratio가 정상 범위로 돌아왔는지로 닫습니다."
          }
        ]
      },
      {
        "q": "prompt version과 cache 문제는 어떤 버전 증거부터 확인하나요?",
        "decision": "첫 판단은 사용자가 본 응답이 어떤 prompt template, tool spec, retrieval instruction, cache key로 생성됐는지입니다. prompt rollout 비율과 cache invalidation 시각을 비교해 새 prompt와 오래된 cached response를 분리합니다.",
        "failure": "prompt version 증거가 없으면 회귀를 모델 품질 탓으로 넘기거나, 이미 철회한 system prompt가 cache hit로 계속 노출될 수 있습니다.",
        "evidence": "prompt version header, cache key audit, rollout config, replay diff",
        "followups": [
          {
            "q": "사용자가 어떤 prompt를 탔는지는 어떻게 증명하나요?",
            "answer": "response metadata의 prompt version, template hash, tool schema version, route id를 trace와 맞춥니다. 메타데이터가 비어 있거나 hash가 배포 manifest와 다르면 해당 응답을 증거에서 제외하고 observability 누락을 먼저 고칩니다."
          },
          {
            "q": "cache invalidation은 어떤 조건에서 강제하나요?",
            "answer": "safety instruction, pricing instruction, legal disclaimer, tool contract가 바뀐 prompt는 TTL 만료를 기다리지 않습니다. cache key에 prompt hash가 빠졌거나 old/new answer diff가 정책 영향을 만들면 feature cache를 비우고 invalidation id를 남깁니다."
          },
          {
            "q": "prompt rollout은 언제 중단하나요?",
            "answer": "canary tenant에서 refusal rate, schema failure, task success, support ticket sample이 기준선을 벗어나면 rollout을 멈춥니다. 중단 기록에는 prompt hash, rollout percentage, replay diff, cache purge 여부를 남겨 같은 버전이 다시 배포되지 않게 합니다."
          }
        ]
      },
      {
        "q": "schema validation과 structured output 실패는 어디서 끊어야 하나요?",
        "decision": "첫 판단은 모델이 계약을 어겼는지, parser/repair가 잘못 처리했는지, downstream contract가 바뀌었는지입니다. raw model output, validation error, repair attempt, user-visible error를 같은 request id로 봅니다.",
        "failure": "repair가 실패를 숨기면 사용자는 잘못된 JSON 기반 결과를 받거나, downstream action이 누락돼도 단순 입력 오류처럼 보일 수 있습니다.",
        "evidence": "raw output archive, schema validation error, repair log, contract version diff",
        "followups": [
          {
            "q": "모델 출력 문제와 parser 문제는 어떻게 나누나요?",
            "answer": "raw output이 schema field, enum, type을 만족하는지 먼저 보고, raw는 정상인데 parser 결과가 깨지면 parser 배포나 library 변경을 의심합니다. raw 자체가 틀리면 prompt/tool schema 예시와 model version을 함께 되돌려 재현 샘플을 보관합니다."
          },
          {
            "q": "repair 로직은 어느 선까지 허용하나요?",
            "answer": "repair는 quote, trailing comma 같은 형식 오류에만 제한하고 누락 필드, enum 의미 변경, tool argument 추정은 실패로 처리합니다. repair success rate가 급증하면 정상화가 아니라 모델 계약 회귀일 수 있으므로 release gate에 regression item을 추가합니다."
          },
          {
            "q": "사용자에게 보이는 오류는 어떻게 결정하나요?",
            "answer": "downstream action이 실행되지 않았으면 재시도 가능 메시지와 incident id를 보여주고, 부분 결과가 있으면 confidence와 누락 항목을 명시합니다. 운영 기록에는 raw output, validation path, repair result, 사용자 표시 문구를 남깁니다."
          }
        ]
      },
      {
        "q": "eval gate는 어떤 회귀 기준으로 release를 막나요?",
        "decision": "첫 판단은 offline golden set, online shadow traffic, safety eval, cost/latency eval 중 어느 gate가 release-blocking인지입니다. threshold, confidence interval, changed prompt/model version, failing examples를 함께 봅니다.",
        "failure": "평균 점수만 통과하면 특정 언어, tenant, tool-use task, safety category의 회귀가 배포 뒤 실제 사용자에게 드러납니다.",
        "evidence": "golden set run, online eval report, regression threshold config, failing example bundle",
        "followups": [
          {
            "q": "offline eval과 online eval이 충돌하면 무엇을 우선하나요?",
            "answer": "offline golden set이 통과해도 online shadow에서 refusal, hallucination, tool failure가 기준선을 넘으면 release를 멈춥니다. 반대로 online 표본이 부족하면 golden set의 failing category를 늘리고 canary 비율을 확대하기 전 승인자를 지정합니다."
          },
          {
            "q": "regression threshold는 어떻게 설명해야 하나요?",
            "answer": "전체 점수, critical category 점수, sample size, confidence interval, previous production baseline을 함께 제시합니다. critical safety나 tool execution category가 threshold 아래면 전체 평균이 높아도 gate fail로 보고 prompt/model rollout을 중단합니다."
          },
          {
            "q": "gate 실패 뒤 다음 조치는 무엇인가요?",
            "answer": "failing examples를 prompt, retrieval, model, safety policy, schema contract 중 하나로 분류합니다. owner와 재실행 명령, expected threshold, release ticket link를 남겨 다음 평가가 같은 데이터와 버전으로 재현되게 합니다."
          }
        ]
      },
      {
        "q": "fallback model 전환은 어떤 품질 저하를 감수할지 먼저 정하나요?",
        "decision": "첫 판단은 fallback이 사용자 실패를 줄이면서도 안전, 비용, latency, tool support 한계를 넘지 않는지입니다. primary와 fallback의 capability matrix, routing rule, quality delta, rollback trigger를 비교합니다.",
        "failure": "fallback을 단순 정상화로 보면 답변 품질, 언어 지원, structured output, safety coverage가 낮아져 조용한 기능 저하가 발생합니다.",
        "evidence": "fallback decision log, capability matrix, quality delta eval, rollback trigger record",
        "followups": [
          {
            "q": "fallback을 켜기 전 확인할 capability는 무엇인가요?",
            "answer": "context length, tool calling, JSON mode, language coverage, safety policy parity, data residency를 확인합니다. 부족한 capability가 있는 feature는 fallback 대상에서 제외하거나 read-only 답변으로 제한합니다."
          },
          {
            "q": "품질 저하는 어떻게 사용자 영향으로 측정하나요?",
            "answer": "fallback traffic의 task success, answer rating, schema failure, refusal rate, escalation ticket을 primary baseline과 비교합니다. 특정 task에서 delta가 큰 경우 route rule을 tenant나 feature 단위로 좁히고 incident note에 품질 제한을 명시합니다."
          },
          {
            "q": "primary로 되돌릴 기준은 무엇인가요?",
            "answer": "primary provider error rate, p95 latency, eval smoke, schema success가 기준선으로 돌아온 뒤 staged rollback을 합니다. 되돌림 후에는 fallback route hit가 0에 가까운지와 backlog 재처리 비용이 급증하지 않는지 확인합니다."
          }
        ]
      },
      {
        "q": "provider outage 때 multi-provider failover는 어떤 제약부터 확인하나요?",
        "decision": "첫 판단은 provider 장애가 region, model family, API feature, account quota 중 어디에 국한되는지와 대체 provider가 data residency와 기능 요구를 만족하는지입니다.",
        "failure": "status page만 보고 전체 failover를 켜면 특정 tenant의 데이터가 허용되지 않은 provider로 이동하거나, function calling과 embedding feature가 없는 provider로 요청이 흘러갑니다.",
        "evidence": "provider status event, health probe matrix, residency policy map, feature parity checklist",
        "followups": [
          {
            "q": "outage 범위는 어떻게 좁히나요?",
            "answer": "synthetic probe를 model family, region, API path, account별로 나눠 실행하고 provider error code를 모읍니다. 한 region만 실패하면 regional route를 바꾸고, 특정 feature만 실패하면 해당 feature를 degrade mode로 전환합니다."
          },
          {
            "q": "data residency는 failover 중 어떻게 지키나요?",
            "answer": "tenant residency tag와 provider region allowlist를 route decision에 강제합니다. 허용 provider가 없으면 자동 failover 대신 사용자에게 제한 상태를 알리고, incident record에 차단된 tenant와 법적 근거를 남깁니다."
          },
          {
            "q": "incident mode에서 feature gap은 어떻게 처리하나요?",
            "answer": "tool calling, vision, embeddings, structured output 같은 provider별 feature를 capability matrix로 확인합니다. 지원되지 않는 feature는 read-only, queued retry, manual fallback 중 하나로 운영하고 복구 후 재처리 목록을 남깁니다."
          }
        ]
      },
      {
        "q": "safety policy와 filter 변경은 false positive와 false negative를 어떻게 나누나요?",
        "decision": "첫 판단은 정책 변경이 정당한 요청을 과도하게 막는지, 위험 요청을 놓치는지입니다. policy version, filter decision, appeal sample, safety eval category, rollout cohort를 함께 봅니다.",
        "failure": "차단률만 보면 안전해 보이지만 정상 업무가 막힐 수 있고, 통과율만 보면 위험 content가 조용히 새어 나갈 수 있습니다.",
        "evidence": "policy version log, filter decision sample, safety eval report, appeal queue",
        "followups": [
          {
            "q": "false positive는 어떤 증거로 인정하나요?",
            "answer": "차단된 요청의 policy category, user intent, business context, reviewer decision을 확인합니다. 같은 category의 appeal 승인 비율이 올라가면 policy threshold를 조정하거나 해당 workflow에 human review path를 추가합니다."
          },
          {
            "q": "false negative는 어떻게 release blocker로 만들나요?",
            "answer": "red-team sample이나 production audit에서 금지 category가 통과하면 severity, exploitability, affected tenant를 기록하고 rollout을 중단합니다. gate에는 failing prompt, expected policy label, actual decision, reviewer note를 첨부합니다."
          },
          {
            "q": "정책 롤아웃과 appeal path는 어떻게 운영하나요?",
            "answer": "policy version을 cohort별로 배포하고 decision log에 reviewer override와 appeal result를 남깁니다. appeal queue SLA가 깨지거나 특정 tenant 업무가 멈추면 cohort를 줄이고 policy diff와 예외 만료일을 기록합니다."
          }
        ]
      },
      {
        "q": "PII redaction과 data retention은 어느 저장 경계부터 확인하나요?",
        "decision": "첫 판단은 PII가 prompt assembly 전, provider 전송 전, 로그 저장 전, 장기 보관 전 중 어디에서 제거되는지입니다. redaction rule, raw prompt access, log sink, retention policy를 같은 trace로 확인합니다.",
        "failure": "redaction을 한 지점만 보면 provider payload는 안전해도 debug log, prompt cache, eval dataset에 원문 PII가 남을 수 있습니다.",
        "evidence": "redaction audit, raw-to-redacted diff, log sink sample, retention policy readback",
        "followups": [
          {
            "q": "redaction boundary는 어떻게 증명하나요?",
            "answer": "raw input, redacted prompt, provider payload, stored log sample을 trace id로 비교합니다. redacted prompt는 안전하지만 provider payload나 log sink에 원문이 있으면 해당 저장 경로를 차단하고 purge 범위를 산정합니다."
          },
          {
            "q": "prompt storage와 eval dataset은 무엇을 확인하나요?",
            "answer": "prompt cache key, replay dataset export, annotation sample, access control을 확인합니다. PII가 들어간 샘플은 retention exception이 아니라 삭제 대상이며, 삭제 ticket에는 dataset id, row count, purge proof를 남깁니다."
          },
          {
            "q": "retention 위반 의심 시 다음 조치는 무엇인가요?",
            "answer": "관련 log sink, cache, provider transcript, analytics export를 보존 또는 격리하고 privacy owner에게 incident를 엽니다. 사용자 영향 판단에는 data class, exposure window, access log, purge completion evidence를 붙입니다."
          }
        ]
      },
      {
        "q": "cost dashboard와 token accounting 이상은 어떤 ledger부터 봐야 하나요?",
        "decision": "첫 판단은 비용 증가가 실제 사용량, 토큰 계산 오류, routing 변경, retry 폭증, cache miss 중 무엇 때문인지입니다. feature, tenant, model, provider, retry attempt별 token ledger를 비용 청구와 대조합니다.",
        "failure": "총액만 보면 특정 기능의 prompt 확장, fallback provider 단가, 중복 재시도 비용, 누락된 chargeback을 늦게 발견합니다.",
        "evidence": "token accounting ledger, provider invoice sample, feature cost dashboard, anomaly alert",
        "followups": [
          {
            "q": "per-feature cost는 어떻게 추적하나요?",
            "answer": "각 request에 feature id, tenant id, model id, input/output token, cache hit, retry count를 붙여 ledger에 남깁니다. invoice와 ledger가 맞지 않으면 provider pricing table, rounding rule, streaming token count를 검증합니다."
          },
          {
            "q": "cost anomaly가 뜨면 어떤 guardrail을 먼저 켜나요?",
            "answer": "anomaly가 retry, long-context, batch job, new route 중 어디에서 왔는지 나눈 뒤 가장 큰 contributor에 cap을 겁니다. 사용자 영향이 작은 batch와 low-priority tenant부터 throttling하고, production interactive traffic은 품질 지표를 보며 제한합니다."
          },
          {
            "q": "비용 사고를 닫을 때 필요한 증거는 무엇인가요?",
            "answer": "anomaly start/end, affected feature, extra token count, extra spend, applied guardrail, recovered run rate를 남깁니다. 재발 방지는 budget alert, per-feature quota, prompt budget review 중 하나로 연결하고 다음 invoice에서 ledger reconciliation을 확인합니다."
          }
        ]
      }
    ]
  }
];
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderQuestion(question, index) {
  return `<section id="qa-${index + 1}">
<div class="ch-head"><span class="ch-code">Q${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(question.q)}</h2></div>
<p class="lede">${escapeHtml(question.decision)}</p>
<p>${escapeHtml(question.failure)}</p>
<table>
<tr><th>꼬리질문</th><th>꼬리질문 답변</th></tr>
${question.followups
  .map((followup) => {
    if (typeof followup === "string") {
      throw new Error(`String follow-up is not allowed for ${question.q}: ${followup}`);
    }

    if (!followup?.q || !followup?.answer) {
      throw new Error(`Invalid follow-up for ${question.q}`);
    }

    return `<tr><td>${escapeHtml(followup.q)}</td><td>${escapeHtml(followup.answer)}</td></tr>`;
  })
  .join("\n")}
</table>
<div class="semantic-card">
<span class="sc-label">OPERATIONS EVIDENCE</span>
${escapeHtml(question.evidence)}
</div>
</section>`;
}

function renderPage(page) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(page.title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="shell">
<nav aria-label="목차">
  <div class="nav-brand">OPERATIONS Q&amp;A</div>
  <div class="nav-title">${escapeHtml(page.title)}</div>
  <a href="#overview"><span class="code">GUIDE</span>훈련 방식</a>
${page.questions
  .map((q, index) => `  <a href="#qa-${index + 1}"><span class="code">Q${String(index + 1).padStart(2, "0")}</span>${escapeHtml(q.q)}</a>`)
  .join("\n")}
  <a href="#drill"><span class="code">DRILL</span>운영 답변 반복</a>
  <a href="#rubric"><span class="code">RUBRIC</span>통과 기준</a>
</nav>
<main>
<header class="hero">
  <div class="hero-serial">
    <span>DOC : ${page.id.toUpperCase()}</span>
    <span>SOURCE : ${escapeHtml(page.source)}</span>
    <span>MODE : INCIDENT · CHANGE · EVIDENCE</span>
  </div>
  <h1>${escapeHtml(page.title)}</h1>
  <p class="hero-sub">${escapeHtml(page.subtitle)}</p>
  <div class="hero-meta">TRAINING : 30초 판단 → 90초 증거 확장 → 장애/변경 꼬리질문 방어</div>
</header>

<section id="overview">
<div class="ch-head"><span class="ch-code">GUIDE</span><h2>훈련 방식</h2></div>
<p class="lede">각 문항은 클라우드 서비스 이름 암기가 아니라 사용자 영향, 최근 변경, 신뢰 경계, 관측 증거, 복구 선택지를 연결해 답하는 훈련용입니다.</p>
<div class="snippet-card"><code>operations_answer_loop:
  1_user_impact: "누가 어떤 실패를 겪는지 먼저 말한다"
  2_path_boundary: "request/change/recovery path 중 어디를 좁히는지 정한다"
  3_first_evidence: "로그, 지표, trace, cloud readback 중 첫 증거를 말한다"
  4_mitigation: "원인 확정 전 가능한 완화책을 분리한다"
  5_follow_up: "rollback, runbook diff, postmortem action으로 닫는다"</code></div>
</section>

${page.questions.map(renderQuestion).join("\n\n")}

<section id="drill">
<div class="ch-head"><span class="ch-code">DRILL</span><h2>운영 답변 반복</h2></div>
<table>
<tr><th>라운드</th><th>방법</th><th>통과 기준</th></tr>
<tr><td>1회차</td><td>각 질문을 30초 장애 판단으로 녹음한다.</td><td>사용자 영향, 경계, 첫 증거가 빠지지 않는다.</td></tr>
<tr><td>2회차</td><td>꼬리질문 3개를 90초 답변으로 확장한다.</td><td>정상/비정상 판독 기준과 완화책을 말한다.</td></tr>
<tr><td>3회차</td><td>실제 경험 또는 대체 drill 계획으로 연결한다.</td><td>직접 경험, 추론, 검증 계획을 섞지 않고 구분한다.</td></tr>
</table>
</section>

<section id="rubric">
<div class="ch-head"><span class="ch-code">RUBRIC</span><h2>통과 기준</h2></div>
<div class="semantic-card">
<span class="sc-label">OPERATIONS QA TRAINING PACKET</span>
통과 답변은 서비스 이름이나 명령어 나열에서 멈추지 않고 사용자 영향, 경계, 증거, 완화, 복구, 재발 방지 action을 함께 닫는다.
</div>
</section>

<footer>OPERATIONS QA TRAINING PACKET · ${escapeHtml(page.title)} · generated for handbook practice</footer>
</main>
</div>
</body>
</html>`;
}

await mkdir(outDir, { recursive: true });
for (const page of pages) {
  await writeFile(path.join(outDir, `${page.id}-handbook.html`), renderPage(page), "utf8");
}

console.log(`generated ${pages.length} operations Q&A handbooks`);
