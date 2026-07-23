// 컨테이너·오케스트레이션·Health Check Q&A(operations-runtime-orchestration-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-runtime-orchestration-quiz",
  title: "컨테이너·오케스트레이션·Health Check 퀴즈",
  sourceQaId: "operations-runtime-orchestration-qa",
  questions: [
    {
      id: "q1",
      question:
        "실행 중인 pod가 기대한 바이너리를 처리하는지 확정하는 기준으로 옳은 것은?",
      choices: [
        "image tag만 확인하면 mutable tag 재사용이나 node image cache 차이를 놓치므로 충분하다",
        "`status.containerStatuses[].imageID`의 immutable digest를 registry manifest, rollout revision과 같은 release id로 묶어 확인한다",
        "Deployment template의 image tag가 배포 의도와 같으면 모든 pod가 같은 코드를 실행한다고 볼 수 있다",
        "pod가 Running 상태이면 기대한 image digest로 뜬 것으로 확정할 수 있다",
      ],
      answerIndex: 1,
      explanation:
        "운영 판단은 tag가 아니라 실행 중 컨테이너의 immutable digest가 배포 artifact와 같은지 확인하는 일이다. imageID, registry manifest digest, rollout revision을 같은 release id로 묶어야 어떤 바이너리가 트래픽을 처리하는지 확정된다.",
    },
    {
      id: "q2",
      question:
        "같은 새 ReplicaSet 안에서 pod별 digest가 갈라지는 것을 발견했을 때 조치로 옳은 것은?",
      choices: [
        "rollout을 멈추고 registry tag 변경 이력과 admission log를 확인한 뒤 원하는 digest를 명시해 재배포한다",
        "이전 ReplicaSet만 다른 digest를 갖는 정상 상태이므로 그대로 둔다",
        "가장 최신 digest를 가진 pod에 트래픽을 몰아 나머지를 자연 교체시킨다",
        "image tag를 새로 올려 전체 pod가 같은 tag를 바라보게 하면 해결된다",
      ],
      answerIndex: 0,
      explanation:
        "정상은 모든 새 pod가 같은 sha256 digest를 가리키고 이전 ReplicaSet만 다른 경우다. 새 ReplicaSet 내부에서 digest가 갈라지면 rollout을 멈추고 tag 변경 이력과 admission log를 확인한 뒤 digest를 명시해 재배포한다.",
    },
    {
      id: "q3",
      question:
        "registry tag digest와 node의 runtime imageID가 달라도 정상일 수 있는 조건은?",
      choices: [
        "node가 재부팅되어 image cache가 초기화된 경우",
        "rollout revision이 바뀌어 이전 코드가 남아 있는 경우",
        "multi-arch manifest를 써서 node가 받은 platform-specific image digest가 tag digest와 다르게 보이는 경우",
        "image pull policy가 Always로 설정되어 매번 새로 받는 경우",
      ],
      answerIndex: 2,
      explanation:
        "multi-arch manifest를 쓰면 tag digest와 node가 실제로 받은 platform-specific image digest가 다르게 보일 수 있다. 판단 기준은 manifest list 안에 runtime digest가 포함되는지, node architecture가 배포 의도와 맞는지다.",
    },
    {
      id: "q4",
      question:
        "entrypoint/command 변경 뒤 CrashLoop가 났을 때 앱 코드 실행 전 실패임을 가리키는 증거는?",
      choices: [
        "exit code가 1이고 앱 logger의 첫 로그가 남아 있다",
        "database migration이 실패했다는 앱 로그가 남아 있다",
        "config parse 실패 메시지가 `logs --previous`에 찍혀 있다",
        "`CreateContainerConfigError`, `exec format error`, `no such file or directory`가 event나 waiting reason에 있고 애플리케이션 로그가 비어 있다",
      ],
      answerIndex: 3,
      explanation:
        "`CreateContainerConfigError`, `RunContainerError`, `exec format error`, `permission denied`, `no such file or directory`가 event나 waiting reason에 있으면 앱 코드 실행 전 실패이며, 이때 애플리케이션 로그가 비는 것이 정상 증상이다.",
    },
    {
      id: "q5",
      question:
        "앱 부팅 실패와 entrypoint 실패가 섞일 때 먼저 확인해야 하는 것은?",
      choices: [
        "먼저 image tag를 이전 revision으로 되돌리고 결과를 본다",
        "readiness probe 응답 body를 먼저 수집한다",
        "node의 memory pressure event부터 조사한다",
        "`startedAt`이 찍혔는지와 `logs --previous` 첫 줄이 앱 logger인지 확인한다",
      ],
      answerIndex: 3,
      explanation:
        "먼저 `startedAt`이 찍혔는지와 `logs --previous` 첫 줄이 앱 logger인지 확인한다. 앱 로그가 남고 exit code가 1이면 config·migration·dependency를, 시작 시각이 없으면 runtime 실행 실패로 보고 image와 command를 되돌린다.",
    },
    {
      id: "q6",
      question:
        "readiness probe에 공유 dependency check를 넣을 때 위험한 조건은?",
      choices: [
        "dependency가 빨라지면 pod가 너무 자주 Ready로 바뀌어 트래픽이 몰린다",
        "dependency check가 liveness보다 응답이 느려 재시작이 지연된다",
        "공유 dependency가 느려질 때 모든 pod가 동시에 NotReady가 되어 Service가 빈 endpoint로 바뀐다",
        "readiness 응답이 캐시되어 dependency 복구를 늦게 반영한다",
      ],
      answerIndex: 2,
      explanation:
        "공유 dependency가 느려질 때 모든 pod가 동시에 NotReady가 되면 Service가 빈 endpoint로 바뀐다. 캐시나 fallback이 있으면 readiness는 local 처리 가능성만 보고 dependency health는 별도 alert로 둔다.",
    },
    {
      id: "q7",
      question:
        "readiness 실패가 배포 지연일 뿐 사용자 영향은 없었다고 판단하는 근거는?",
      choices: [
        "endpoint가 0에 가까워졌지만 특정 zone에서만 빠졌다",
        "`Ready=True`인 pod가 하나라도 남아 있었다",
        "endpoint 수가 줄었지만 남은 pod capacity가 충분하고 5xx가 없다",
        "load balancer target health가 전부 unhealthy로 바뀌었다",
      ],
      answerIndex: 2,
      explanation:
        "실패 시각의 EndpointSlice membership, Service endpoint 수, target health, 5xx를 같은 타임라인에 둔다. endpoint 수가 줄었어도 남은 capacity가 충분하고 5xx가 없으면 배포 지연으로 본다.",
    },
    {
      id: "q8",
      question:
        "liveness endpoint에 넣으면 안 되는 검사는?",
      choices: [
        "event loop 응답성 확인",
        "deadlock 감지",
        "local process 상태 확인",
        "DB, message broker, 외부 API처럼 일시 실패가 process 생존과 다를 수 있는 검사",
      ],
      answerIndex: 3,
      explanation:
        "DB·message broker·외부 API처럼 일시 실패가 process 생존과 다를 수 있는 검사는 liveness에서 제외한다. 넣으면 shared dependency 장애가 전체 pod 재시작으로 확대된다. liveness에는 event loop 응답성, deadlock 감지, local process 상태만 둔다.",
    },
    {
      id: "q9",
      question:
        "liveness probe 오탐이 의심될 때의 즉시 완화책으로 옳은 것은?",
      choices: [
        "재시작 속도를 더 높여 죽은 pod를 빠르게 교체한다",
        "liveness와 readiness를 같은 endpoint로 통합해 판단을 단순화한다",
        "즉시 전체 pod를 재배포해 상태를 초기화한다",
        "재시작이 사용자 오류율을 낮추지 못하고 cold start latency만 늘리면 failureThreshold나 timeout을 임시로 늘리고 rollout을 멈춘다",
      ],
      answerIndex: 3,
      explanation:
        "재시작이 오류율을 낮추지 못하고 cold start latency만 늘리면 failureThreshold나 timeout을 임시로 늘리고 rollout을 멈춘다. 증거는 restart 전후 5xx, pod age 분포, probe latency다.",
    },
    {
      id: "q10",
      question:
        "startup probe의 허용 시간을 정할 때 쓰는 기준은?",
      choices: [
        "node CPU pressure와 다른 workload의 지연 시간",
        "p95 cold start, migration 최대 시간, image pull 이후 첫 ready 로그까지의 시간으로 `failureThreshold * periodSeconds`를 잡는다",
        "liveness probe의 timeout 값에 2배를 곱한다",
        "이전 revision의 평균 종료 시간과 restart count",
      ],
      answerIndex: 1,
      explanation:
        "p95 cold start, migration 최대 시간, image pull 이후 앱 첫 ready 로그까지의 시간을 기준으로 `failureThreshold * periodSeconds`를 잡는다. 같은 로그 지점에서 멈추면 시간을 늘리지 말고 deadlock·config wait·dependency retry 폭증을 조사한다.",
    },
    {
      id: "q11",
      question:
        "resource request와 limit의 역할을 옳게 구분한 것은?",
      choices: [
        "request는 CPU throttling 경계를, limit은 scheduler의 pod 배치를 결정한다",
        "request와 limit을 같은 값으로 맞추면 항상 가장 안정적이다",
        "request는 scheduler의 pod 배치와 node 자원 예약을, limit은 cgroup의 CPU throttling과 memory kill 경계를 결정한다",
        "request는 QoS class와 무관하고 limit만 QoS를 정한다",
      ],
      answerIndex: 2,
      explanation:
        "request는 scheduler가 pod를 놓을 수 있는지와 node 자원 예약을 결정하고, limit은 cgroup에서 CPU throttling과 memory kill 경계를 만든다. request와 limit을 같은 값으로 맞추는 것이 항상 안정적인 것은 아니며 burst workload에서는 지연을 키울 수 있다.",
    },
    {
      id: "q12",
      question:
        "limit 하향을 승인하지 않아야 하는 신호는?",
      choices: [
        "CPU 사용량이 limit 근처에 자주 붙고 throttled time이 이미 증가 중이거나, memory working set이 limit에 가깝고 GC pressure가 높다",
        "pod의 QoS class가 Guaranteed로 설정되어 있다",
        "node allocatable에 여유가 충분히 남아 있다",
        "canary에서 latency가 기존 pod와 동일하게 유지된다",
      ],
      answerIndex: 0,
      explanation:
        "CPU 사용량이 limit 근처에 자주 붙고 throttled time이 증가 중이면 limit 하향을 승인하지 않는다. memory working set이 limit에 가깝거나 GC pressure가 높으면 OOM 위험이 있다.",
    },
    {
      id: "q13",
      question:
        "CPU throttling을 latency 증가의 원인으로 묶는 판단 기준은?",
      choices: [
        "container CPU 사용률이 100%에 도달했는지만 확인하면 된다",
        "throttled seconds 증가가 p95/p99 latency 상승보다 먼저 또는 같은 시각에 나타나고, 해당 pod의 request queue나 event-loop lag도 같이 늘어야 한다",
        "latency가 느리면 곧바로 CPU limit을 올려 확인한다",
        "node CPU pressure가 낮으면 throttling은 원인이 아니다",
      ],
      answerIndex: 1,
      explanation:
        "throttled seconds 증가가 latency 상승보다 먼저 또는 같은 시각에 나타나고 request queue나 event-loop lag가 같이 늘어야 같은 사건으로 묶는다. 사용률이 낮아 보여도 짧은 quota가 burst를 잘라 tail latency를 만들 수 있다.",
    },
    {
      id: "q14",
      question:
        "container OOM과 node eviction을 구분하는 증거로 옳은 것은?",
      choices: [
        "container OOM은 `lastState.terminated.reason=OOMKilled`와 limit 근처 working set이, node eviction은 pod status reason·kubelet event·node memory pressure가 중심 증거다",
        "둘 다 exit code 137로 동일하게 나타나므로 구분할 수 없다",
        "container OOM은 node memory pressure event가, eviction은 heap dump가 핵심 증거다",
        "eviction은 항상 OOMKilled보다 먼저 발생한다",
      ],
      answerIndex: 0,
      explanation:
        "container OOM은 `lastState.terminated.reason=OOMKilled`와 해당 container limit 근처의 working set이 함께 보인다. node eviction은 pod status reason, kubelet event, node memory pressure가 중심 증거다.",
    },
    {
      id: "q15",
      question:
        "OOM 완화를 limit 상향만으로 끝내면 안 되는 이유는?",
      choices: [
        "limit 상향은 QoS class를 낮춰 eviction 우선순위를 높이기 때문",
        "limit 상향은 재시작을 늦출 뿐 원인이 leak이면 누적 사용량이 계속 증가하기 때문",
        "limit 상향이 scheduler의 FailedScheduling을 항상 유발하기 때문",
        "limit 상향은 exit code 137을 143으로 바꿀 뿐이기 때문",
      ],
      answerIndex: 1,
      explanation:
        "limit 상향은 재시작을 늦출 뿐 원인이 leak이면 누적 사용량은 계속 증가한다. 종료 기준은 OOM 재발 없음, memory slope 안정, heap/profile 원인 제거, SLO 회복이 함께 충족되는 것이다.",
    },
    {
      id: "q16",
      question:
        "rolling update에서 rollout pause를 걸어야 하는 신호는?",
      choices: [
        "이전 revision pod에서 latency가 상승할 때",
        "maxSurge가 0으로 설정되어 있을 때",
        "모든 revision에서 error rate가 균일하게 낮을 때",
        "새 revision pod에서만 readiness 지연, restart, latency 상승이 보일 때",
      ],
      answerIndex: 3,
      explanation:
        "새 revision pod에서만 readiness 지연·restart·latency 상승이 보이면 즉시 pause로 확산을 막는다. 이전 revision capacity가 충분하면 분석 시간을 벌 수 있고, pause 뒤에도 사용자 오류가 늘면 rollback을 검토한다.",
    },
    {
      id: "q17",
      question:
        "node drain 전에 PDB가 eviction을 막을지 예측하는 방법은?",
      choices: [
        "node의 memory pressure event가 있는지만 확인한다",
        "PDB의 maxSurge 값이 replica 수보다 큰지 확인한다",
        "rollout status가 complete인지만 확인하면 충분하다",
        "`kubectl get pdb`의 allowed disruptions와 현재 ready replica 수를 확인하고, drain 대상 node에 같은 workload pod가 몇 개 있는지 본다",
      ],
      answerIndex: 3,
      explanation:
        "`kubectl get pdb`의 allowed disruptions와 현재 ready replica 수를 확인하고, drain 대상 node의 같은 workload pod 수를 본다. allowed 값이 0이면 eviction은 거절될 가능성이 크다.",
    },
    {
      id: "q18",
      question:
        "PDB 설정 리뷰에서 흔한 실패 모드로 옳은 것은?",
      choices: [
        "minAvailable이 replica 수보다 작아 drain이 항상 통과되는 경우",
        "selector가 workload와 맞지 않거나, minAvailable이 replica 수와 같아 drain이 항상 막히거나, 여러 deployment가 같은 dependency를 공유하는데 각각만 보호하는 경우",
        "PDB가 liveness probe와 같은 endpoint를 참조하는 경우",
        "PDB가 zone별로 하나씩만 설정된 경우",
      ],
      answerIndex: 1,
      explanation:
        "selector가 workload와 맞지 않거나, minAvailable이 replica 수와 같아 drain이 항상 막히거나, 여러 deployment가 같은 dependency를 공유하는데 각각만 보호하는 경우가 흔한 실패 모드다.",
    },
    {
      id: "q19",
      question:
        "env var로 주입된 ConfigMap/Secret 값을 바꾼 뒤 반드시 필요한 처리는?",
      choices: [
        "running process는 새 값을 자동으로 보지 못하므로 rollout restart나 checksum annotation 변경이 필요하다",
        "kubelet이 env var를 자동 갱신하므로 별도 조치가 필요 없다",
        "volume mount와 동일하게 파일 timestamp만 갱신되면 앱이 즉시 새 값을 읽는다",
        "Service endpoint를 재생성하면 env 값이 갱신된다",
      ],
      answerIndex: 0,
      explanation:
        "값이 env var로 주입되면 running process는 새 값을 자동으로 보지 못하므로 rollout restart나 checksum annotation 변경이 필요하다. volume mount면 kubelet이 파일을 갱신하지만 앱 reload는 별도일 수 있다.",
    },
    {
      id: "q20",
      question:
        "Secret rotation에서 dual-read가 필요한 경우는?",
      choices: [
        "새 Secret의 resourceVersion이 이전보다 낮을 때",
        "downstream credential이 한 번에 바뀌지 않거나 connection pool이 오래 살아 있어 새 Secret만 배포하면 일부 요청이 인증 실패를 낼 때",
        "Secret이 volume mount 대신 env var로 주입될 때",
        "ConfigMap과 Secret을 같은 pod에서 함께 쓸 때",
      ],
      answerIndex: 1,
      explanation:
        "downstream credential이 한 번에 바뀌지 않거나 connection pool이 오래 살아 있으면 새 Secret만 배포할 때 일부 요청이 인증 실패를 낸다. dual-read는 이전 값과 새 값을 동시에 허용하는 짧은 전환 구간이며, 종료 조건은 이전 credential 사용량이 0이 되는 시각이다.",
    },
    {
      id: "q21",
      question:
        "장애 처음 5분 안에 모아야 할 최소 증거는?",
      choices: [
        "전체 cluster의 모든 pod 목록과 node별 CPU 그래프",
        "registry manifest digest와 admission policy 설정 전체",
        "대상 pod의 describe, namespace event 정렬 출력, `logs --previous`, 현재 로그, rollout revision, node condition",
        "완화 조치를 먼저 적용한 뒤의 결과 로그",
      ],
      answerIndex: 2,
      explanation:
        "대상 pod의 describe, namespace event 정렬 출력, `logs --previous`, 현재 로그, rollout revision, node condition을 먼저 저장한다. 재시작이 계속되면 이전 로그가 덮이기 전에 보존하는 것이 우선이고, 증거 저장 뒤에야 완화를 결정한다.",
    },
    {
      id: "q22",
      question:
        "events와 logs가 서로 다른 원인을 가리킬 때 판단 방법은?",
      choices: [
        "항상 kubelet event를 우선 신뢰한다",
        "항상 앱 로그를 우선 신뢰한다",
        "먼저 timestamp와 대상 container를 맞추고, event가 `BackOff`만 말하고 previous log가 config parse 실패를 보이면 앱 로그를, event가 image pull·failed mount·probe failure를 보이고 앱 로그가 비면 kubelet 증거를 더 신뢰한다",
        "두 증거가 다르면 즉시 rollback을 실행한다",
      ],
      answerIndex: 2,
      explanation:
        "먼저 timestamp와 대상 container를 맞춘다. event가 `BackOff`만 말하고 previous log가 config parse 실패를 보여주면 앱 로그가 더 직접적이고, event가 image pull·failed mount·probe failure를 보여주고 앱 로그가 비어 있으면 kubelet 단계 증거가 더 강하다.",
    },
    {
      id: "q23",
      question:
        "entrypoint(command) 변경 리뷰에서 승인을 막아야 하는 조건은?",
      choices: [
        "새 command가 readiness 전까지 foreground로 유지되는지, PID 1에서 signal을 처리하는지, required env·volume 경로를 읽는지 확인되지 않는 경우",
        "staging pod의 exit code가 0이면 signal 처리 검증 없이 승인한다",
        "wrapper script가 많을수록 graceful shutdown이 안정적이므로 script 수는 리뷰 대상이 아니다",
        "image digest만 이전과 같으면 command 변경은 signal 처리 검증 없이 통과시킨다",
      ],
      answerIndex: 0,
      explanation:
        "새 command가 readiness 전까지 foreground로 유지되는지, PID 1에서 signal을 처리하는지, required env·volume 경로를 읽는지 확인되지 않으면 승인을 막는다. 증거는 staging pod의 `ps`, SIGTERM 처리 로그, graceful shutdown 시간이다.",
    },
    {
      id: "q24",
      question:
        "readiness probe 인수인계에 필요한 정상 샘플로 옳은 것은?",
      choices: [
        "정상 pod의 probe 응답 body나 status code, EndpointSlice 포함 여부, Service로 들어온 실제 요청 trace를 함께 남긴다",
        "`Ready=True` 여부만 넘기면 다음 담당자가 probe endpoint 변경 필요성을 판단할 수 있다",
        "readiness의 timeout과 periodSeconds 설정값만 남기면 충분하다",
        "liveness restart count와 node condition을 남기는 것이 핵심이다",
      ],
      answerIndex: 0,
      explanation:
        "정상 pod의 probe 응답 body나 status code, EndpointSlice 포함 여부, 실제 요청 trace를 함께 남긴다. 단순히 `Ready=True`만 넘기면 health endpoint가 실제 사용자 path와 얼마나 가까운지 알 수 없다.",
    },
    {
      id: "q25",
      question:
        "liveness 재시작 루프 원인을 기록할 때 함께 남겨야 하는 값은?",
      choices: [
        "현재 로그와 registry manifest digest만 있으면 재시작 원인을 좁힐 수 있다",
        "node allocatable과 QoS class가 재시작 루프 기록의 핵심이다",
        "pod별 restart count 증가량, 마지막 종료 exit code, `logs --previous` 마지막 메시지, probe 설정값, kubelet event timestamp",
        "readiness 응답 body와 EndpointSlice membership만 남기면 된다",
      ],
      answerIndex: 2,
      explanation:
        "pod별 restart count 증가량, 마지막 종료 exit code, `logs --previous` 마지막 메시지, probe 설정값, kubelet event timestamp를 함께 남긴다. 재시작이 특정 node나 revision에 몰리면 node pressure 또는 새 코드 문제로 좁힌다.",
    },
    {
      id: "q26",
      question:
        "느린 부팅이 rollout 장애로 번지고 있음을 가리키는 신호는?",
      choices: [
        "새 pod가 startup 구간에 오래 머물고 old pod가 maxUnavailable 때문에 줄어들어 capacity가 빠르게 감소한다",
        "startup 구간이 짧아 새 pod가 즉시 Ready가 되면서 트래픽이 몰린다",
        "이전 revision pod의 restart count가 늘어난다",
        "node memory pressure event가 startup 실패보다 먼저 나타난다",
      ],
      answerIndex: 0,
      explanation:
        "새 pod가 startup 구간에서 오래 머물고 old pod가 maxUnavailable 때문에 줄면 capacity가 빠르게 감소한다. 이때는 rollout pause와 surge 조정을 먼저 검토하고, startup 시간을 늘리는 결정은 부팅 로그가 계속 진전될 때만 한다.",
    },
    {
      id: "q27",
      question:
        "request 변경이 scheduling 실패를 만들지 배포 전에 예측하는 방법은?",
      choices: [
        "새 request를 기존 request와 비교해 증가율만 계산한다",
        "현재 replica 수에 새 request를 곱해 zone별 node allocatable과 비교하고 topology spread·anti-affinity까지 적용한 여유를 본다",
        "limit 값을 node allocatable과 비교하면 scheduling 가능성을 알 수 있다",
        "QoS class가 Guaranteed면 FailedScheduling은 발생하지 않는다",
      ],
      answerIndex: 1,
      explanation:
        "현재 replica 수에 새 request를 곱해 zone별 node allocatable과 비교하고 topology spread와 anti-affinity까지 적용한 여유를 본다. `FailedScheduling` 예측이 보이면 pod가 Pending으로 쌓이고, 조치는 node pool 증설·rollout surge 축소·request 단계적 변경 중 하나다.",
    },
    {
      id: "q28",
      question:
        "CPU limit을 올리기 전 확인해야 하는 실패 모드는?",
      choices: [
        "node CPU pressure가 낮을수록 limit 상향이 다른 pod를 밀어낸다",
        "node CPU pressure가 이미 높으면 limit 상향이 다른 pod를 밀어내거나 autoscaler 비용을 키운다",
        "limit 상향은 항상 안전하며 실패 모드가 없다",
        "limit을 올리면 throttled seconds가 반드시 0이 되므로 latency는 항상 회복된다",
      ],
      answerIndex: 1,
      explanation:
        "node CPU pressure가 이미 높으면 limit 상향이 다른 pod를 밀어내거나 autoscaler 비용을 키운다. 여유가 없으면 limit 상향보다 replica 분산, node pool 확장, hot path 최적화를 먼저 선택한다.",
    },
    {
      id: "q29",
      question:
        "memory leak 의심을 뒷받침하는 최소 증거로 옳은 것은?",
      choices: [
        "exit code 137이 한 번이라도 나오면 leak로 단정할 수 있다",
        "traffic이 증가할 때 working set이 함께 늘면 leak의 결정적 증거다",
        "traffic이 안정적인데 pod age가 늘수록 working set이나 heap이 계단식으로 증가하고 GC 뒤에도 내려오지 않는다",
        "rollout 직후 모든 revision에서 균일하게 memory가 증가한다",
      ],
      answerIndex: 2,
      explanation:
        "traffic이 안정적인데 pod age가 늘수록 working set이나 heap이 계단식으로 증가하고 GC 뒤에도 내려오지 않아야 leak 근거가 된다. rollout 이후 같은 code path에서만 증가하면 새 revision 후보가 강하고, heap dump 전에는 replica 교체 주기를 줄이고 증거 보존용 pod를 격리한다.",
    },
    {
      id: "q30",
      question:
        "maxUnavailable과 maxSurge가 만드는 운영 tradeoff로 옳은 것은?",
      choices: [
        "maxUnavailable을 낮추면 rollout이 빨라지고 node 여유가 남는다",
        "maxSurge를 높이면 resource pressure가 줄어 항상 안전하다",
        "maxUnavailable을 낮추면 가용성은 지키지만 rollout이 느려지고 node 여유가 부족하면 Pending이 생기며, maxSurge를 높이면 빠른 검증이 가능하지만 resource pressure가 늘 수 있다",
        "두 값은 서로 독립이며 어느 쪽을 조정해도 capacity에는 영향이 없다",
      ],
      answerIndex: 2,
      explanation:
        "maxUnavailable을 낮추면 가용성은 지키지만 rollout이 느려지고 node 여유가 부족하면 Pending이 생긴다. maxSurge를 높이면 빠른 검증이 가능하지만 resource pressure가 늘 수 있으며, 판단 기준은 새 pod 준비 시간·node 여유·old revision 유지 기간이다.",
    },
    {
      id: "q31",
      question:
        "node drain 중 eviction 실패와 app 장애를 다르게 대응해야 하는 이유는?",
      choices: [
        "eviction 실패는 남은 pod가 traffic을 처리 못하는 문제이고, app 장애는 PDB 제약 문제다",
        "둘 다 readiness만 보면 구분되므로 대응이 같다",
        "eviction 실패는 항상 node memory pressure가 원인이다",
        "eviction 실패는 PDB·finalizer·termination grace·local storage 같은 orchestration 문제이고, app 장애는 eviction 후 남은 pod가 traffic을 처리하지 못하는 문제다",
      ],
      answerIndex: 3,
      explanation:
        "eviction 실패는 PDB·finalizer·termination grace·local storage 제한 같은 orchestration 문제이고, app 장애는 eviction 후 남은 pod가 traffic을 처리하지 못하는 문제다. 전자는 drain 로그·event로 maintenance plan을 조정하고, 후자는 readiness와 capacity를 보고 drain을 중단한다.",
    },
    {
      id: "q32",
      question:
        "stale config가 일부 pod에만 남았는지 찾는 방법은?",
      choices: [
        "현재 로그만 보면 어떤 pod가 stale config인지 바로 알 수 있다",
        "같은 ReplicaSet 안에서는 config version이 갈라질 수 없으므로 확인이 불필요하다",
        "affected pod 전체를 한 번에 재배포하는 것이 사용자 영향을 최소화한다",
        "pod별 config version endpoint, reload log, mounted file checksum, rollout revision을 비교하고, 같은 ReplicaSet 안에서 version이 갈라지면 hot reload 실패나 파일 감시 누락으로 본다",
      ],
      answerIndex: 3,
      explanation:
        "pod별 config version endpoint, reload log, mounted file checksum, rollout revision을 비교한다. 같은 ReplicaSet 안에서 version이 갈라지면 hot reload 실패나 파일 감시 누락이며, 조치는 affected pod만 재시작해 영향을 줄이고 reload 실패를 alert로 노출하는 것이다.",
    },
  ],
};

export default quiz;
