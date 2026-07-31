// 플랫폼 도구·운영 기본기 Q&A(engineering-platform-tools-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-platform-tools-quiz",
  title: "플랫폼 도구·운영 기본기 퀴즈",
  sourceQaId: "engineering-platform-tools-qa",
  questions: [
    {
      id: "q1",
      question: "Dockerfile을 리뷰할 때 환경별 값(runtime env)은 어디서 주입해야 하나?",
      choices: [
        "이미지는 빌드 산출물이므로 환경별 값은 runtime에 주입한다",
        "빌드 시점 ARG로 이미지에 고정해 넣는다",
        "base image에 ENV로 미리 구워 넣는다",
        "Dockerfile에 상수로 하드코딩해 재현성을 높인다",
      ],
      answerIndex: 0,
      explanation:
        "본문 Q01은 이미지가 빌드 산출물이고 환경별 값은 runtime에 주입해야 한다고 말한다. build-time 값은 image layer와 artifact metadata에 남을 수 있어 환경별 값을 굽는 것은 위험하다.",
    },
    {
      id: "q2",
      question: "Docker에서 build-time env와 runtime env를 구분하는 이유로 옳은 것은?",
      choices: [
        "build-time 값이 runtime 값보다 항상 빠르게 읽히기 때문",
        "build-time 값은 image layer와 artifact metadata에 남을 수 있고 runtime 값은 배포 환경에서 바뀌어야 하기 때문",
        "runtime env는 image history에 반드시 기록되기 때문",
        "build-time 값은 컨테이너 재시작마다 새로 계산되기 때문",
      ],
      answerIndex: 1,
      explanation:
        "Q01 꼬리질문은 build-time 값이 image layer와 artifact metadata에 남을 수 있고 runtime 값은 배포 환경에서 바뀌어야 한다고 설명한다.",
    },
    {
      id: "q3",
      question: "latest 태그가 배포 기록에서 위험한 이유는?",
      choices: [
        "latest 태그는 registry에서 자동으로 삭제되기 때문",
        "latest 태그는 rollback 시 항상 최신 커밋으로만 되돌아가기 때문",
        "같은 태그가 다른 digest를 가리킬 수 있어 장애 시 어떤 바이너리가 실행됐는지 재현하기 어렵다",
        "latest 태그는 layer cache를 사용할 수 없기 때문",
      ],
      answerIndex: 2,
      explanation:
        "Q01 꼬리질문은 latest가 같은 태그로 다른 digest를 가리킬 수 있어 재현이 어렵다고 한다. 배포 기록에는 immutable tag와 digest를 남기고 rollback도 이전 digest로 해야 한다.",
    },
    {
      id: "q4",
      question: "컨테이너가 재시작을 반복할 때 확인 순서로 본문이 제시한 것은?",
      choices: [
        "재시작 정책을 먼저 완화해 증상이 사라지는지 본다",
        "이미지를 재빌드해 latest로 다시 배포한다",
        "CPU 사용률과 network latency만 우선 확인한다",
        "exit code, restart count, 직전 로그, healthcheck 실패 원인, OOMKilled 여부, config mount 실패",
      ],
      answerIndex: 3,
      explanation:
        "Q01 꼬리질문은 exit code, restart count, 직전 로그, healthcheck 실패, OOMKilled, config mount 실패를 순서대로 보라 한다. 재시작 정책만 완화하면 증상이 가려진다.",
    },
    {
      id: "q5",
      question: "배포가 성공했는데 서비스가 깨졌을 때 본문이 강조하는 전제는?",
      choices: [
        "CI 성공은 런타임 성공의 충분조건이 아니다",
        "배포 artifact가 같으면 런타임도 반드시 같다",
        "health check가 통과하면 config 문제는 배제해도 된다",
        "rollback은 언제나 즉시 가능하므로 원인 분석은 나중에 한다",
      ],
      answerIndex: 0,
      explanation:
        "Q02는 artifact, release id, health check, config/env, migration, connectivity 등을 순서대로 보되 CI 성공이 런타임 성공의 충분조건이 아니라고 명시한다.",
    },
    {
      id: "q6",
      question: "liveness와 readiness probe를 나누는 이유로 옳은 것은?",
      choices: [
        "liveness는 readiness보다 더 자주 실행되어야 하기 때문",
        "liveness는 프로세스 재시작 여부를, readiness는 트래픽 수신 준비 여부를 판단하기 때문",
        "readiness는 프로세스를 재시작하고 liveness는 트래픽을 끊기 때문",
        "둘은 같은 검사이고 이름만 다르기 때문",
      ],
      answerIndex: 1,
      explanation:
        "Q02·Q15 꼬리질문은 liveness가 재시작 판단, readiness가 트래픽 준비 판단이라 설명한다. DB 대기 같은 일시 상태를 liveness 실패로 처리하면 재시작 폭주가 생긴다.",
    },
    {
      id: "q7",
      question: "migration 실패 후 단순 rollback이 불가능할 수 있는 경우는?",
      choices: [
        "lockfile이 커밋되지 않았을 때",
        "canary 트래픽 비율이 낮게 설정됐을 때",
        "데이터 삭제, 컬럼 의미 변경, 외부 side effect가 있을 때",
        "base image digest가 고정되지 않았을 때",
      ],
      answerIndex: 2,
      explanation:
        "Q02 꼬리질문은 데이터 삭제, 컬럼 의미 변경, 외부 side effect가 있으면 단순 rollback이 불가능할 수 있다고 한다. expand-contract, 백업, forward fix를 준비해야 한다.",
    },
    {
      id: "q8",
      question: "NGINX 502와 504를 다르게 접근하는 기준은?",
      choices: [
        "502는 timeout을, 504는 protocol mismatch를 의심한다",
        "502는 클라이언트 오류이고 504는 항상 DNS 문제다",
        "둘 다 client_max_body_size만 조정하면 해결된다",
        "502는 upstream 연결·protocol·process crash를, 504는 upstream timeout이나 처리 지연을 의심한다",
      ],
      answerIndex: 3,
      explanation:
        "Q08은 502를 upstream 연결·protocol·crash·bad gateway로, 504를 upstream timeout·처리 지연으로 의심하라 한다.",
    },
    {
      id: "q9",
      question: "X-Forwarded-For header를 그대로 신뢰하면 안 되는 이유는?",
      choices: [
        "클라이언트가 임의로 보낼 수 있어 trusted proxy 경계 밖 값을 쓰면 audit·rate limit·allowlist가 우회될 수 있다",
        "header 크기가 커서 proxy buffering을 초과하기 때문",
        "NGINX가 이 header를 자동으로 삭제하기 때문",
        "TLS 종료 지점에서 반드시 암호화되기 때문",
      ],
      answerIndex: 0,
      explanation:
        "Q03·Q20 꼬리질문은 X-Forwarded-For가 클라이언트가 임의로 보낼 수 있는 header라 trusted proxy 경계 밖 값을 쓰면 우회가 생긴다고 한다.",
    },
    {
      id: "q10",
      question: "컨테이너가 OOMKilled 됐을 때, JVM에서 heap만 줄이면 놓칠 수 있는 것은?",
      choices: [
        "GC log 파일의 경로",
        "direct memory나 native memory 문제",
        "container restart count",
        "reverse proxy의 timeout 설정",
      ],
      answerIndex: 1,
      explanation:
        "Q06은 JVM이면 heap만 줄이면 direct memory나 native memory 문제를 놓칠 수 있다고 한다. container limit 안에 heap·metaspace·direct memory·thread stack·native 여유를 남겨야 한다.",
    },
    {
      id: "q11",
      question: "OOM과 GC thrashing의 차이로 옳은 것은?",
      choices: [
        "OOM은 latency만 늘고, GC thrashing은 프로세스를 종료시킨다",
        "둘 다 프로세스를 즉시 종료시키므로 구분할 수 없다",
        "OOM은 할당 실패나 cgroup kill로 프로세스가 종료되고, GC thrashing은 살아 있지만 GC 시간이 늘어 처리량과 latency가 무너진다",
        "GC thrashing은 exit code로만, OOM은 GC pause로만 확인된다",
      ],
      answerIndex: 2,
      explanation:
        "Q06 꼬리질문은 OOM이 프로세스 종료, GC thrashing이 살아 있지만 처리량·latency가 무너지는 상태라 구분한다.",
    },
    {
      id: "q12",
      question: "이미 push된 secret을 삭제 커밋만으로 처리하면 안 되는 이유는?",
      choices: [
        "삭제 커밋이 registry digest를 자동으로 무효화하기 때문",
        "삭제 커밋은 CI 파이프라인을 중단시키기 때문",
        "삭제하면 rollback 대상 digest가 사라지기 때문",
        "image layer·registry cache·clone된 git history·CI log에 남을 수 있어 키 폐기와 rotation을 먼저 해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "Q05 꼬리질문은 삭제 커밋이 재노출을 줄일 뿐 이미 유출된 credential을 무효화하지 못한다고 한다. 키 폐기와 rotation을 먼저 하고 노출 범위를 감사해야 한다.",
    },
    {
      id: "q13",
      question: "secret rotation을 진행하는 순서로 본문이 제시한 것은?",
      choices: [
        "새 secret 발급 → 소비자 배포 → readback으로 새 version 확인 → 이전 secret 폐기 → 로그 감사",
        "이전 secret 폐기 → 새 secret 발급 → 소비자 배포 → 로그 감사",
        "새 secret 발급 → 이전 secret 즉시 폐기 → 소비자 배포",
        "소비자 배포 → 새 secret 발급 → readback → 로그 감사",
      ],
      answerIndex: 0,
      explanation:
        "Q05 꼬리질문은 발급, 소비자 배포, readback, 이전 폐기, 로그 감사 순서를 제시한다. 한 번에 폐기하면 아직 이전 값을 쓰는 pod나 batch가 장애를 낼 수 있어 overlap을 계획한다.",
    },
    {
      id: "q14",
      question: "multi-stage build가 줄이는 것과 남겨야 하는 것은?",
      choices: [
        "runtime dependency를 제거하고 컴파일러와 source를 남긴다",
        "build tool과 source를 runtime image에서 제거하고 실행 artifact와 필요한 runtime dependency만 남긴다",
        "이미지 크기를 늘려 layer cache hit를 높인다",
        "healthcheck를 제거해 startup을 빠르게 한다",
      ],
      answerIndex: 1,
      explanation:
        "Q14는 multi-stage build가 build tool과 source를 runtime image에서 제거해 이미지 크기와 공격 표면을 줄이고, runtime에는 실행 artifact와 필요한 runtime dependency만 남겨야 한다고 한다.",
    },
    {
      id: "q15",
      question: "Docker layer cache 효율을 위한 Dockerfile 명령 순서로 권장되는 것은?",
      choices: [
        "source copy를 먼저 두고 dependency install을 마지막에 둔다",
        "모든 명령을 한 RUN 레이어로 합쳐 cache를 제거한다",
        "dependency install을 lockfile 기준으로 먼저 두고, 자주 바뀌는 source copy를 뒤에 둔다",
        "healthcheck를 dependency install보다 앞에 둔다",
      ],
      answerIndex: 2,
      explanation:
        "Q13은 dependency install을 lockfile 기준으로 먼저 두고 자주 바뀌는 source copy를 뒤에 두는 편이 효율적이라 한다.",
    },
    {
      id: "q16",
      question: "cache hit가 항상 좋은 신호가 아닌 이유는?",
      choices: [
        "cache hit는 build time을 항상 늘리기 때문",
        "cache hit는 image digest를 매번 바꾸기 때문",
        "cache hit는 runtime env 주입을 막기 때문",
        "stale dependency나 잘못된 cache key가 남으면 보안 패치와 generated artifact가 반영되지 않을 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "Q13 꼬리질문은 stale dependency나 잘못된 cache key가 남으면 보안 패치와 generated artifact가 반영되지 않을 수 있다고 한다. lockfile hash·base image digest·build arg가 cache invalidation에 들어가는지 확인해야 한다.",
    },
    {
      id: "q17",
      question: "container가 ephemeral이므로 DB data, upload file, persistent state를 두어야 하는 곳은?",
      choices: [
        "volume이나 외부 storage",
        "stateless app container의 로컬 파일시스템",
        "image layer 안",
        "환경변수(ENV)",
      ],
      answerIndex: 0,
      explanation:
        "Q16은 container가 ephemeral이므로 DB data·upload file·persistent state를 volume이나 외부 storage에 둬야 하고, stateless app container에는 상태를 남기지 않는 편이 좋다고 한다.",
    },
    {
      id: "q18",
      question: "포트가 listen 중인데 접속이 안 될 때 본문이 제시한 계층 순서는?",
      choices: [
        "DNS, TLS, cache status, CDN request id",
        "process listen, bind address, firewall, route, container mapping, reverse proxy",
        "heap, GC log, thread dump, restart count",
        "lockfile, artifact digest, release metadata",
      ],
      answerIndex: 1,
      explanation:
        "Q17은 process listen, bind address, firewall, route, container mapping, reverse proxy를 순서대로 보라 한다.",
    },
    {
      id: "q19",
      question: "127.0.0.1 바인딩과 0.0.0.0 바인딩의 차이로 옳은 것은?",
      choices: [
        "127.0.0.1은 외부 접속을 허용하고 0.0.0.0은 로컬 전용이다",
        "둘 다 외부 접속을 허용하며 성능만 다르다",
        "127.0.0.1은 로컬에서만 접속되고 외부 interface에서는 보이지 않는다",
        "0.0.0.0은 firewall을 자동으로 우회한다",
      ],
      answerIndex: 2,
      explanation:
        "Q17 꼬리질문은 127.0.0.1이 로컬에서만 접속되고 외부 interface에서는 보이지 않는다고 한다. ss 출력의 local address와 container port mapping, host firewall을 함께 확인한다.",
    },
    {
      id: "q20",
      question: "df 여유는 충분한데 write가 실패하면 본문이 확인하라는 항목은?",
      choices: [
        "GC pause 비율과 heap dump",
        "TLS chain과 SAN 목록",
        "canary segment와 error budget",
        "inode 고갈, quota, read-only remount, permission, 특정 mount point 여유 공간",
      ],
      answerIndex: 3,
      explanation:
        "Q18 꼬리질문은 df가 충분해도 inode 고갈, quota, read-only remount, permission, mount point 여유를 확인하라 한다. df -h만 보지 말고 df -i, mount, application error path를 함께 봐야 한다.",
    },
    {
      id: "q21",
      question: "CPU 사용률이 낮으면 앱이 정상이라고 봐도 되는가?",
      choices: [
        "아니다. thread가 DB connection·lock·network IO를 기다리면 CPU는 낮고 latency는 높을 수 있다",
        "그렇다. CPU가 낮으면 병목이 없다는 확실한 증거다",
        "그렇다. thread pool 상태와 무관하게 판단할 수 있다",
        "아니다. 다만 CPU가 낮으면 항상 GC thrashing이 원인이다",
      ],
      answerIndex: 0,
      explanation:
        "Q19 꼬리질문은 thread가 DB connection·lock·network IO를 기다리면 CPU는 낮고 latency는 높을 수 있다고 한다. thread dump·pool metric·socket state·request duration을 함께 봐야 한다.",
    },
    {
      id: "q22",
      question: "인증서 파일을 교체했는데 이전 인증서가 계속 나가는 원인은?",
      choices: [
        "파일 교체 시 SAN 목록이 자동으로 삭제되기 때문",
        "load balancer나 NGINX reload가 안 돼서 served certificate가 갱신되지 않았을 수 있다",
        "client trust store가 항상 이전 인증서를 캐싱하기 때문",
        "openssl s_client가 인증서를 되돌리기 때문",
      ],
      answerIndex: 1,
      explanation:
        "Q21 꼬리질문은 파일 교체만 성공해도 load balancer나 NGINX reload가 안 됐으면 이전 인증서가 계속 나갈 수 있다고 한다. served certificate의 serial·expiry·SAN·chain을 readback해야 한다.",
    },
    {
      id: "q23",
      question: "artifact와 deploy를 분리하는 이유로 옳은 것은?",
      choices: [
        "환경마다 재빌드해야 환경 차이를 정확히 반영하기 때문",
        "deploy 시점에 새 dependency를 풀어야 최신 코드가 반영되기 때문",
        "빌드 산출물을 한 번 만들고 같은 artifact를 여러 환경에 배포해야 재현성이 생기기 때문",
        "artifact digest는 환경별로 달라야 하기 때문",
      ],
      answerIndex: 2,
      explanation:
        "Q22는 빌드 산출물을 한 번 만들고 여러 환경에 같은 artifact를 배포해야 재현성이 생긴다고 한다. 환경별 재빌드는 환경 차이와 artifact 차이를 섞는다.",
    },
    {
      id: "q24",
      question: "readback 검증을 명령 성공과 다르게 보는 이유는?",
      choices: [
        "명령이 성공하면 상태 변경도 항상 완료되기 때문",
        "readback은 admin 계정으로만 하면 충분하기 때문",
        "명령 성공 여부는 exit code로 확인할 수 없기 때문",
        "명령 실행 성공과 실제 상태 변경 성공은 다르므로, 조회 명령으로 원하는 상태가 됐는지 확인해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "Q25는 명령 실행 성공과 실제 상태 변경 성공이 다르다고 한다. 저장 명령이 성공해도 프로세스가 reload하지 않았으면 운영 상태는 바뀌지 않으므로 조회 명령으로 확인해야 한다.",
    },
    {
      id: "q25",
      question: "config drift는 무엇이 달라지는 문제이며 어떻게 회수하나?",
      choices: [
        "git/IaC 상태와 runtime 상태가 달라지는 문제이며, 수동 변경은 PR로 회수한다",
        "두 replica의 CPU 사용률이 달라지는 문제이며, autoscaling으로 회수한다",
        "build cache와 test cache가 달라지는 문제이며, 캐시 삭제로 회수한다",
        "artifact digest와 tag 문자열이 달라지는 문제이며, 재태깅으로 회수한다",
      ],
      answerIndex: 0,
      explanation:
        "Q26은 config drift가 git/IaC 상태와 runtime 상태가 달라지는 문제이고, state·runtime readback·checksum·periodic audit으로 탐지하며 수동 변경은 PR로 회수해야 한다고 한다.",
    },
    {
      id: "q26",
      question: "blue-green과 canary가 각각 줄이는 배포 위험은?",
      choices: [
        "blue-green은 일부 traffic 검증을, canary는 즉시 전체 전환을 제공한다",
        "blue-green은 두 환경 전환으로 빠른 rollback을, canary는 일부 traffic으로 새 버전 검증을 제공한다",
        "둘 다 migration 없이 destructive 변경을 안전하게 만든다",
        "blue-green은 segment coverage 비교가, canary는 환경 전환이 핵심이다",
      ],
      answerIndex: 1,
      explanation:
        "Q27은 blue-green이 두 환경을 전환해 빠른 rollback이 쉽고, canary가 일부 traffic으로 새 버전을 검증한다고 한다. canary는 segment coverage와 metric 비교가 중요하다.",
    },
    {
      id: "q27",
      question: "운영 도구 문서에서 위험 명령이 반드시 포함해야 하는 것은?",
      choices: [
        "최신 명령어 목록과 단축키 모음",
        "성공 화면 스크린샷과 예상 소요 시간",
        "작성자 이름과 최종 수정 날짜",
        "dry-run과 readback 확인 절차",
      ],
      answerIndex: 3,
      explanation:
        "Q04는 좋은 운영 도구 문서가 전제 조건, 대상 환경, 성공/실패 판정, 되돌리기 절차를 담아야 하고 위험 명령은 dry-run과 readback 확인을 포함해야 한다고 한다.",
    },
    {
      id: "q28",
      question: "frontend env와 backend env를 다르게 다뤄야 하는 이유는?",
      choices: [
        "frontend 값은 항상 secret store에서만 주입되기 때문",
        "backend 값이 build artifact에 박혀 사용자에게 노출되기 때문",
        "frontend 값은 대개 build artifact에 박혀 사용자에게 노출될 수 있고 backend 값은 runtime에 secret store나 env로 주입되기 때문",
        "둘 다 runtime에서만 주입되며 실질적 차이가 없기 때문",
      ],
      answerIndex: 2,
      explanation:
        "Q07 꼬리질문은 frontend 값이 대개 build artifact에 박혀 사용자에게 노출될 수 있는 반면 backend 값은 runtime에서 secret store나 env로 주입된다고 한다.",
    },
    {
      id: "q29",
      question: "squash merge가 유리한 경우로 본문이 든 것은?",
      choices: [
        "작은 feature 브랜치의 중간 수정 커밋이 의미 없고 PR 단위 revert로 충분할 때",
        "migration, refactor, behavior change가 한 PR에 섞여 있을 때",
        "부분 revert와 원인 추적이 자주 필요한 대형 PR일 때",
        "각 커밋을 bisect로 따라가야 할 때",
      ],
      answerIndex: 0,
      explanation:
        "Q09 꼬리질문은 작은 feature 브랜치의 중간 수정 커밋이 의미 없고 PR 단위로 revert해도 충분할 때 squash가 유리하다고 한다. migration·refactor·behavior change가 섞인 PR은 squash하면 부분 revert와 추적이 어려워진다.",
    },
    {
      id: "q30",
      question: "운영 서버에서 직접 수정한 임시 조치는 이후 어떻게 처리해야 하나?",
      choices: [
        "터미널 성공 출력을 캡처해 보관하면 충분하다",
        "후속 PR로 source of truth에 회수한다",
        "다음 배포 때 자동 반영되므로 별도 조치가 필요 없다",
        "즉시 롤백해 원상복구하는 것이 원칙이다",
      ],
      answerIndex: 1,
      explanation:
        "Q10은 임시 수정이 source of truth가 되지 않게 ticket과 PR로 회수해야 하며, 임시 조치는 반드시 후속 PR로 source of truth에 회수해야 한다고 한다.",
    },
    {
      id: "q31",
      question: "dependency를 latest로 두면 위험한 이유는?",
      choices: [
        "latest dependency가 lockfile을 자동 생성하기 때문",
        "latest dependency가 build time을 항상 늘리기 때문",
        "latest dependency가 registry snapshot을 무효화하기 때문",
        "빌드 시점마다 다른 dependency가 풀려 테스트하지 않은 코드가 artifact에 들어갈 수 있기 때문",
      ],
      answerIndex: 3,
      explanation:
        "Q11 꼬리질문은 dependency latest가 빌드 시점마다 다른 dependency를 풀어 테스트하지 않은 코드가 artifact에 들어갈 수 있다고 한다. lockfile·registry snapshot·base image digest를 고정하고 update는 별도 PR로 처리해야 한다.",
    },
    {
      id: "q32",
      question: "로컬에서는 되는데 CI에서 깨지는 문제를 좁힐 때 비교하는 항목은?",
      choices: [
        "heap 크기와 GC log만 비교한다",
        "artifact digest와 release metadata만 비교한다",
        "runtime version, OS, env var, timezone/locale, network, dependency cache, test order, file path case sensitivity를 비교한다",
        "reverse proxy timeout과 body size limit을 비교한다",
      ],
      answerIndex: 2,
      explanation:
        "Q12는 runtime version, OS, env var, timezone/locale, network, dependency cache, test order, file path case sensitivity를 비교하며 로컬 성공이 재현성의 충분조건이 아니라고 한다.",
    },
    {
      id: "q33",
      question: "X-Forwarded-Proto가 잘못 전달되면 나타나는 증상은?",
      choices: [
        "앱이 HTTP로 인식해 secure cookie, redirect, callback URL을 잘못 만들 수 있다",
        "앱이 요청을 즉시 거부해 502를 반환한다",
        "TLS handshake가 실패해 연결이 끊긴다",
        "X-Forwarded-For header가 자동으로 삭제된다",
      ],
      answerIndex: 0,
      explanation:
        "Q20 꼬리질문은 X-Forwarded-Proto가 틀리면 앱이 HTTP로 인식해 secure cookie, redirect, callback URL을 잘못 만들 수 있다고 한다. TLS 종료 지점과 proxy_set_header, 앱 trusted proxy 설정을 맞춰야 한다.",
    },
    {
      id: "q34",
      question: "SAN mismatch가 위험한 이유는?",
      choices: [
        "SAN에 없는 host면 인증서 만료일이 앞당겨지기 때문",
        "신뢰된 CA에서 발급됐어도 요청 host가 SAN에 없으면 client가 연결을 거부하기 때문",
        "SAN mismatch가 서버 chain을 자동으로 재발급하기 때문",
        "SAN mismatch가 SNI를 비활성화하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "Q21 꼬리질문은 인증서가 신뢰된 CA에서 발급됐어도 요청 host가 SAN에 없으면 client가 연결을 거부한다고 한다. wildcard 범위와 내부·public 도메인을 구분해 host별 검증을 해야 한다.",
    },
    {
      id: "q35",
      question: "최소 권한 secret을 설계하는 방법으로 옳은 것은?",
      choices: [
        "장애 대응 편의를 위해 wildcard 권한을 부여한다",
        "모든 서비스가 admin credential을 공유하게 한다",
        "서비스별로 필요한 resource와 operation만 허용하고 batch, admin, read-only credential을 분리한다",
        "dev, stage, prod가 같은 secret을 공유해 관리 비용을 줄인다",
      ],
      answerIndex: 2,
      explanation:
        "Q23 꼬리질문은 서비스별로 필요한 resource와 operation만 허용하고 batch·admin·read-only credential을 분리하라 한다. wildcard 권한은 유출 시 blast radius를 키운다.",
    },
    {
      id: "q36",
      question: "rollback 대신 forward fix가 필요한 신호로 본문이 든 것은?",
      choices: [
        "배포 artifact digest가 이전과 동일할 때",
        "canary 트래픽 비율이 1%로 낮을 때",
        "health check가 startup grace period를 초과했을 때",
        "이미 데이터가 변환됐거나 외부 결제·알림·third-party API 호출이 발생한 경우",
      ],
      answerIndex: 3,
      explanation:
        "Q28 꼬리질문은 이미 데이터가 변환됐거나 외부 결제·알림·third-party API 호출이 발생한 경우 이전 바이너리로 돌리면 더 큰 불일치가 생겨 forward fix가 필요하다고 한다.",
    },
    {
      id: "q37",
      question: "브라우저 요청이 라우터를 여러 번 거칠 때 IP 주소와 MAC 주소는 어떻게 되나?",
      choices: [
        "목적지 IP는 최종 서버까지 유지되지만, 링크 계층 프레임의 목적지 MAC은 홉마다 다음 장비의 MAC으로 바뀐다",
        "목적지 IP가 홉마다 바뀌고 MAC 주소는 최종 서버까지 그대로 유지된다",
        "IP와 MAC 모두 최종 서버 값으로 고정돼 변하지 않는다",
        "MAC 주소만 최종 서버까지 전달되고 IP는 라우터마다 새로 생성된다",
      ],
      answerIndex: 0,
      explanation:
        "IP는 네트워크 계층 논리 주소로 최종 목적지까지 유지되고, MAC은 데이터 링크 계층 주소라 같은 링크에서 다음 홉으로 프레임을 넘기는 데만 쓰여 홉마다 바뀐다.",
    },
    {
      id: "q38",
      question: "목적지가 다른 네트워크에 있을 때 클라이언트가 ARP로 찾는 MAC 주소는?",
      choices: [
        "최종 목적지 서버의 MAC 주소",
        "기본 게이트웨이(라우터)의 MAC 주소",
        "DNS 서버의 MAC 주소",
        "라우터를 넘어 전달되는 전역 MAC 주소",
      ],
      answerIndex: 1,
      explanation:
        "MAC 주소는 라우터를 넘어 전달되지 않고 현재 링크 안에서만 의미가 있다. 목적지가 다른 네트워크면 패킷을 기본 게이트웨이로 넘겨야 하므로 ARP로 게이트웨이의 MAC을 찾는다.",
    },
    {
      id: "q39",
      question: "서버 응답이 돌아왔을 때 OS가 어느 브라우저 소켓으로 전달할지 판단하는 기준은?",
      choices: [
        "목적지 IP 주소 하나",
        "출발지 IP, 출발지 포트, 목적지 IP, 목적지 포트로 이루어진 4-tuple",
        "MAC 주소와 IP 주소의 조합",
        "브라우저가 보낸 요청의 URL 경로",
      ],
      answerIndex: 1,
      explanation:
        "포트는 호스트 안에서 어느 소켓이 통신할지 구분하는 전송 계층 식별자다. OS는 출발지·목적지 IP와 포트의 4-tuple로 소켓을 구분해 응답을 전달한다.",
    },
    {
      id: "q40",
      question: "HTTPS로 페이지를 받을 때의 순서로 옳은 것은?",
      choices: [
        "TLS Handshake → DNS 조회 → TCP 연결 → HTTP 요청",
        "DNS 조회 → TCP 3-way handshake → TLS Handshake → 암호화된 HTTP 요청/응답 → 렌더링",
        "TCP 연결 → HTTP 요청 → TLS Handshake → DNS 조회",
        "DNS 조회 → TLS Handshake → TCP 연결 → HTTP 요청",
      ],
      answerIndex: 1,
      explanation:
        "DNS로 IP를 얻고 443 포트로 TCP 3-way handshake, 그 위에서 TLS Handshake(인증서 검증·세션 키 합의), 이후 세션 키로 암호화된 HTTP를 주고받고 렌더링한다.",
    },
    {
      id: "q41",
      question: "TCP Connection에 대한 설명으로 옳은 것은?",
      choices: [
        "물리적으로 케이블이 연결된 상태를 의미한다",
        "두 엔드포인트가 수립한 양방향 논리적 통신 경로로, 3-way handshake로 수립되고 4-way handshake로 종료된다",
        "3-way handshake로 종료되고 4-way handshake로 수립된다",
        "커널이 아니라 애플리케이션이 시퀀스 번호와 재전송을 직접 관리한다",
      ],
      answerIndex: 1,
      explanation:
        "Connection은 양방향 논리적 통신 경로로 커널이 상태(시퀀스·ACK·재전송)를 관리한다. 4-tuple로 식별하고 3-way handshake로 수립, 4-way handshake로 종료한다.",
    },
    {
      id: "q42",
      question: "커넥션 타임아웃과 리드 타임아웃의 차이는?",
      choices: [
        "커넥션 타임아웃은 TCP 연결 수립까지 허용하는 시간, 리드 타임아웃은 연결 후 응답 데이터를 기다리는 시간",
        "커넥션 타임아웃은 응답 대기 시간, 리드 타임아웃은 연결 수립 시간",
        "둘 다 패킷 손실을 복구하는 재전송 장치다",
        "리드 타임아웃은 연결 수립 단계에서만 발생한다",
      ],
      answerIndex: 0,
      explanation:
        "커넥션 타임아웃은 연결(SYN-ACK)을 맺는 최대 시간, 리드 타임아웃은 연결 후 응답을 기다리는 최대 시간이다. 무한 대기를 막아 스레드·소켓·커넥션 풀 고갈을 방지한다.",
    },
    {
      id: "q43",
      question: "TCP Keep Alive와 HTTP Keep-Alive의 차이로 옳은 것은?",
      choices: [
        "둘은 같은 기능의 다른 이름이다",
        "TCP Keep Alive는 유휴 연결의 생존 여부를 확인하는 전송 계층 기능, HTTP Keep-Alive는 TCP 연결을 재사용하는 애플리케이션 계층 개념",
        "HTTP Keep-Alive가 유휴 TCP 연결에 probe 패킷을 보내 생존을 확인한다",
        "TCP Keep Alive는 요청마다 새 연결을 만든다",
      ],
      answerIndex: 1,
      explanation:
        "TCP Keep Alive는 유휴 연결이 살아있는지 OS가 probe로 확인하는 전송 계층 기능이고, HTTP Keep-Alive는 요청마다 연결을 새로 만들지 않고 재사용하는 애플리케이션 계층 개념이다.",
    },
    {
      id: "q44",
      question: "UDP의 오류 처리에 대한 설명으로 옳은 것은?",
      choices: [
        "Checksum으로 오류를 검출만 하고 재전송·순서·도착 보장은 하지 않는다",
        "오류를 검출하면 TCP처럼 자동으로 재전송해 복구한다",
        "순서와 도착을 보장하지만 오류 검출은 하지 않는다",
        "IPv6에서는 체크섬을 0으로 두어 비활성화할 수 있다",
      ],
      answerIndex: 0,
      explanation:
        "UDP는 헤더 Checksum으로 오류 검출만 하고 재전송·순서·도착 보장은 하지 않는다. IPv4는 체크섬을 0으로 비활성화할 수 있지만 IPv6는 필수다.",
    },
    {
      id: "q45",
      question: "TCP 혼잡 제어에서 중복 ACK가 3번 오면 동작하는 것은?",
      choices: [
        "타임아웃까지 기다린 뒤에만 재전송한다",
        "타임아웃을 기다리지 않고 재전송하는 Fast Retransmit이 동작한다",
        "혼잡 윈도우를 최대로 키우는 Slow Start로 진입한다",
        "연결을 즉시 종료한다",
      ],
      answerIndex: 1,
      explanation:
        "중복 ACK 3번이면 타임아웃을 기다리지 않고 Fast Retransmit으로 재전송하고, 이후 윈도우를 일부 유지하는 Fast Recovery로 동작한다. cwnd는 Slow Start로 키우다 임계점에서 Congestion Avoidance로 증가 폭을 줄인다.",
    },
    {
      id: "q46",
      question: "TCP 혼잡 제어와 QoS의 차이는?",
      choices: [
        "둘 다 엔드포인트가 수행하는 같은 메커니즘이다",
        "TCP 혼잡 제어는 엔드포인트의 자율적 전송량 조절, QoS는 네트워크 장비의 정책 기반 트래픽 우선순위 제어",
        "QoS는 송신 호스트가, TCP 혼잡 제어는 라우터가 담당한다",
        "QoS는 오류 검출, 혼잡 제어는 암호화를 담당한다",
      ],
      answerIndex: 1,
      explanation:
        "TCP 혼잡 제어는 송신 호스트(엔드포인트)가 cwnd로 전송량을 조절하는 것이고, QoS는 네트워크 장비가 트래픽 종류별 우선순위를 부여하는 정책 제어다. 책임 주체와 제어 위치가 다르다.",
    },
    {
      id: "q47",
      question: "A 레코드를 바꿔도 한동안 옛 IP로 접속되는 이유는?",
      choices: [
        "레코드가 전 세계 DNS 서버로 복사되는 데 물리적으로 오랜 시간이 걸리기 때문",
        "TTL 동안 로컬 DNS·OS·브라우저가 상위에 다시 묻지 않고 캐시 값을 쓰기 때문",
        "DNS는 변경을 지원하지 않아 서버를 재시작해야 반영되기 때문",
        "TTL이 만료되면 캐시가 오히려 더 오래 유지되기 때문",
      ],
      answerIndex: 1,
      explanation:
        "TTL은 DNS 응답을 캐시에 보관하는 시간이다. TTL 동안 캐시 값을 쓰므로 레코드를 바꿔도 만료 전엔 옛 값이 나온다. 흔히 말하는 전파 지연은 전 세계 복사 시간이 아니라 여러 캐시가 만료되기를 기다리는 시간에 가깝다.",
    },
    {
      id: "q48",
      question: "DNS Round-robin 로드밸런싱의 한계로 옳은 것은?",
      choices: [
        "서버의 실시간 부하와 장애 상태를 정확히 반영하지 못하고, 죽은 서버 IP가 캐시에 남으면 일부 사용자가 계속 실패한다",
        "여러 A 레코드를 등록할 수 없어 분산 자체가 불가능하다",
        "캐시가 없어 변경이 항상 즉시 반영된다",
        "L4/L7 로드밸런서와 함께 쓸 수 없다",
      ],
      answerIndex: 0,
      explanation:
        "DNS Round-robin은 캐시 때문에 변경이 즉시 반영되지 않고 서버 실제 부하·장애를 반영하기 어렵다. 죽은 서버 IP가 캐시에 남으면 일부 사용자는 계속 실패한다. 실무에선 DNS를 1차 분산에 쓰고 실제 분산·장애 감지는 L4/L7 로드밸런서로 처리한다.",
    },
    {
      id: "q49",
      question: "SSL과 TLS의 관계로 옳은 것은?",
      choices: [
        "완전히 무관한 별개 프로토콜이다",
        "TLS는 SSL을 표준화·보완한 후속 프로토콜이고, HTTPS는 SSL이 아니라 TLS로 HTTP를 보호한다",
        "HTTPS는 여전히 SSL 3.0으로 통신을 보호한다",
        "SSL 2.0/3.0이 TLS 1.3보다 안전하다",
      ],
      answerIndex: 1,
      explanation:
        "SSL은 넷스케이프의 초기 프로토콜, TLS는 이를 표준화·보완한 후속이다. SSL 2.0/3.0은 취약해 사용 금지이고 현재는 TLS 1.2/1.3을 쓴다. HTTPS는 TLS로 HTTP를 보호한다.",
    },
    {
      id: "q50",
      question: "TLS가 대칭 키와 비대칭 키를 함께 쓰는 이유는?",
      choices: [
        "모든 데이터를 비대칭 키로 계속 암호화하기 위해",
        "비대칭 키로 서버 인증·키 합의를 하고, 비용이 큰 비대칭 연산 대신 대칭 키로 실제 데이터를 빠르게 암호화하는 하이브리드 구조이기 때문",
        "대칭 키로 서버 신원을 인증하기 위해",
        "세션 키를 네트워크로 직접 전송해 공유하기 위해",
      ],
      answerIndex: 1,
      explanation:
        "비대칭 연산은 비용이 커서 서버 인증·키 재료 합의에만 쓰고, 실제 데이터는 대칭 키(AES-GCM 등)로 빠르게 암호화한다. 세션 키는 직접 전송하지 않고 ECDHE 등으로 합의한다.",
    },
    {
      id: "q51",
      question: "브라우저가 서버 인증서를 신뢰할지 검증하는 기준이 아닌 것은?",
      choices: [
        "인증서 도메인이 접속 호스트와 일치하는지(주로 SAN 기준)",
        "인증서 체인이 신뢰 루트 CA까지 이어지고 서명 검증에 성공하는지",
        "유효기간과 OCSP·CRL 기반 폐기 여부",
        "인증서를 자가 서명(self-signed)으로 발급했는지 여부만 보면 충분하다",
      ],
      answerIndex: 3,
      explanation:
        "브라우저는 SAN 기준 도메인 일치, 신뢰 루트 CA까지의 체인·서명, 유효기간·폐기 여부(OCSP/CRL)를 검증한다. 자가 서명 인증서는 신뢰 체인이 없어 운영 환경에서 경고가 뜬다.",
    },
    {
      id: "q52",
      question: "웹 서버(Nginx)와 WAS(Tomcat)의 역할 구분으로 옳은 것은?",
      choices: [
        "웹 서버는 정적 리소스·앞단 HTTP 처리(리버스 프록시·TLS 종료·압축), WAS는 앱 코드 실행·동적 응답 생성",
        "웹 서버가 비즈니스 로직과 DB 조회를 실행한다",
        "WAS는 정적 파일을 전혀 다룰 수 없다",
        "둘은 완전히 동일해 아무거나 써도 된다",
      ],
      answerIndex: 0,
      explanation:
        "웹 서버는 정적 리소스와 앞단 HTTP 처리(리버스 프록시·TLS 종료·압축), WAS는 애플리케이션 실행과 동적 응답 생성을 담당한다.",
    },
    {
      id: "q53",
      question: "웹 서버와 WAS를 함께 쓰는 이유로 옳은 것은?",
      choices: [
        "함께 쓰면 항상 지연만 늘어난다",
        "정적은 웹 서버가 처리하고 동적만 WAS로 넘겨 리소스를 아끼며, WAS를 내부망에 두어 직접 노출을 막고 TLS 종료·접근 제한을 공통 처리한다",
        "WAS가 없으면 정적 파일을 제공할 수 없기 때문",
        "웹 서버가 트랜잭션을 직접 처리하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "역할 분리로 WAS는 비즈니스 로직에 집중하고, 웹 서버를 외부에 노출·WAS는 내부망에 두어 보안·운영을 개선하며, 여러 WAS로 확장·라우팅한다.",
    },
    {
      id: "q54",
      question: "웹 서버별 특징으로 옳은 것은?",
      choices: [
        "Caddy는 자동 HTTPS 설정이 간단한 웹 서버다",
        "Nginx는 프로세스 기반이라 동시접속 처리가 약하다",
        "IIS는 리눅스 전용 웹 서버다",
        "Apache는 모듈 생태계가 거의 없다",
      ],
      answerIndex: 0,
      explanation:
        "Nginx는 이벤트 기반으로 동시접속·리버스 프록시에 강하고, Apache는 모듈 생태계가 넓다. IIS는 Windows/.NET, Caddy는 자동 HTTPS가 간단, LiteSpeed는 PHP/워드프레스에서 강하다.",
    },
    {
      id: "q55",
      question: "포워드 프록시와 리버스 프록시의 핵심 차이는?",
      choices: [
        "포워드 프록시는 서버를, 리버스 프록시는 클라이언트를 대신한다",
        "포워드 프록시는 클라이언트를 대신하고, 리버스 프록시는 서버 앞에서 서버를 대신해 TLS 종료·정적처리·라우팅·로드밸런싱을 한다",
        "둘은 위치만 다르고 하는 일이 완전히 같다",
        "리버스 프록시는 클라이언트 브라우저 안에서 동작한다",
      ],
      answerIndex: 1,
      explanation:
        "포워드 프록시는 클라이언트 앞에서 클라이언트를 대신하고, 리버스 프록시는 서버 앞에서 서버를 대신해 TLS 종료·압축·라우팅·로드밸런싱을 담당한다.",
    },
    {
      id: "q56",
      question: "API Gateway가 단순 로드밸런서·리버스 프록시와 다른 점은?",
      choices: [
        "단순 요청 전달만 하고 정책은 적용하지 않는다",
        "인증·인가·Rate Limiting·요청/응답 변환·API 버전관리·로깅 같은 정책을 중앙에서 처리한다",
        "트래픽을 여러 서버로 분산하는 것만 담당한다",
        "TLS 종료 기능이 없다",
      ],
      answerIndex: 1,
      explanation:
        "LB는 분산, 리버스 프록시는 앞단 전달·HTTP 처리에 초점이 있고, API Gateway는 API 트래픽의 정책 적용·운영 관리(인증·Rate Limiting·변환·버전·로깅)를 중앙 처리한다. 단일 장애점이 되지 않게 설계해야 한다.",
    },
    {
      id: "q57",
      question: "로드 밸런서에 대한 설명으로 옳은 것은?",
      choices: [
        "트래픽을 여러 서버로 분산하고 헬스 체크로 장애 서버를 제외하지만, 서버별 메모리에 저장된 로그인 세션 문제까지 해결하지는 못한다",
        "로드 밸런서가 세션 상태 문제까지 전부 해결한다",
        "장애가 난 서버에도 계속 트래픽을 보낸다",
        "서버가 한 대여도 반드시 필요하다",
      ],
      answerIndex: 0,
      explanation:
        "로드 밸런서의 핵심은 트래픽 분산과 헬스 체크다. 다만 서버별 메모리에 있는 로그인 세션은 해결하지 못해 중앙 세션 저장소나 Sticky Session이 필요하다.",
    },
    {
      id: "q58",
      question: "L4와 L7 로드 밸런서의 차이로 옳은 것은?",
      choices: [
        "L4는 URL Path·Header 기준으로 라우팅한다",
        "L4는 IP·포트 등 전송 계층 기준으로 빠르게 분산하고, L7은 Host·Path·Header·Cookie 등 앱 계층 기준으로 세밀히 라우팅한다",
        "L7이 앱 정보를 해석하지 않아 항상 L4보다 빠르다",
        "L4가 TLS 종료와 헤더 조작을 담당한다",
      ],
      answerIndex: 1,
      explanation:
        "L4는 전송 계층(IP·포트·TCP/UDP) 기준으로 빠르게 분산하고, L7은 앱 계층 정보(Host·Path·Header·Cookie)로 세밀한 라우팅·TLS 종료·헤더 조작을 한다.",
    },
    {
      id: "q59",
      question: "로드 밸런싱과 헬스 체크에 대한 설명으로 옳은 것은?",
      choices: [
        "IP Hash는 서버를 추가·삭제해도 분산이 전혀 변하지 않는다",
        "포트만 열려 있으면 TCP 체크로 정상이라고 보면 충분하다",
        "/health 같은 앱 엔드포인트로 애플리케이션·의존성 상태를 확인하는 것이 단순 TCP 포트 체크보다 정확하다",
        "Least Connections는 항상 연결이 가장 많은 서버로 보낸다",
      ],
      answerIndex: 2,
      explanation:
        "Round Robin·Least Connections·Weighted RR·IP Hash 등이 있고, IP Hash는 서버 증감 시 분산이 변할 수 있다. 헬스 체크는 단순 TCP 포트보다 /health 앱 엔드포인트가 애플리케이션·의존성까지 확인해 정확하다.",
    },
    {
      id: "q60",
      question: "CDN이 응답 속도를 줄이는 방식으로 옳은 것은?",
      choices: [
        "전 세계 엣지 서버에 콘텐츠를 캐싱해 사용자 근처에서 응답하며, 원본 서버 부하와 일부 DDoS도 엣지에서 흡수한다",
        "속도만 개선하고 원본 서버 부하와는 무관하다",
        "동적 API 응답을 원본 대신 계산해 준다",
        "사용자와 원본 서버 사이 거리를 물리적으로 늘린다",
      ],
      answerIndex: 0,
      explanation:
        "CDN은 엣지 서버에 콘텐츠를 배치·캐싱해 지연과 원본 부하를 줄이고, 대규모 트래픽·일부 DDoS를 엣지에서 흡수한다. 정적 리소스에 특히 효과적이며 캐시 키·TTL 설계가 중요하다.",
    },
    {
      id: "q61",
      question: "CDN 캐시 히트율을 떨어뜨리는 요인은?",
      choices: [
        "파일명에 콘텐츠 해시를 넣어 오래 캐시하는 것",
        "같은 파일인데 쿼리 파라미터나 헤더가 매번 달라져 CDN이 서로 다른 응답으로 인식하는 것",
        "TTL을 적절히 설정하는 것",
        "정적 리소스를 캐시하는 것",
      ],
      answerIndex: 1,
      explanation:
        "캐시 미스는 첫 요청·TTL 만료·무효화·키 불일치·사용자별 헤더 차이에서 발생한다. 같은 파일이라도 쿼리·헤더가 매번 달라지면 다른 응답으로 인식돼 히트율이 떨어진다.",
    },
    {
      id: "q62",
      question: "CDN 캐시 무효화가 어려운 이유와 안정적 처리 방법은?",
      choices: [
        "원본 파일을 바꾸면 모든 엣지 캐시가 즉시 사라지므로 별도 처리가 필요 없다",
        "엣지에 분산돼 있고 TTL이 남아 즉시 사라지지 않으므로, 파일명에 콘텐츠 해시를 넣거나 purge·Surrogate-Key로 무효화한다",
        "캐시는 무효화할 방법이 전혀 없다",
        "TTL을 무한대로 설정하면 무효화가 쉬워진다",
      ],
      answerIndex: 1,
      explanation:
        "엣지 분산과 TTL 잔여 때문에 즉시 사라지지 않는다. 파일명에 콘텐츠 해시를 넣는 방식이 가장 안정적이고, HTML은 짧은 TTL/재검증, 필요 시 purge·Surrogate-Key 태그 기반 무효화를 쓴다.",
    },
    {
      id: "q63",
      question: "Cache-Control의 no-cache에 대한 설명으로 옳은 것은?",
      choices: [
        "캐시 저장 자체를 금지하는 것으로 no-store와 같다",
        "저장은 하되 사용 전에 반드시 서버에 재검증하라는 의미다",
        "지정 시간 동안 재검증 없이 무조건 신선하다는 의미다",
        "개인 캐시에만 저장하라는 의미다",
      ],
      answerIndex: 1,
      explanation:
        "no-cache는 저장 금지가 아니라 사용 전 반드시 재검증하라는 의미다. 저장 자체를 막는 것은 no-store다. 재검증은 ETag→If-None-Match, Last-Modified→If-Modified-Since로 하고 변경 없으면 304를 반환한다.",
    },
    {
      id: "q64",
      question: "공유 캐시(CDN)에 저장하면 안 되는 응답은?",
      choices: [
        "사용자 무관하고 URL이 같으면 결과가 같은 정적 리소스",
        "Authorization·세션 쿠키에 따라 결과가 달라지는 마이페이지·주문내역 같은 사용자별 응답",
        "오래돼도 문제가 적은 공개 이미지",
        "버전 해시가 붙은 JS 번들",
      ],
      answerIndex: 1,
      explanation:
        "사용자별 민감 정보(마이페이지·주문·결제)는 공유 캐시 저장을 금지해야 한다. 캐시 키에 필요한 헤더·쿠키가 반영되지 않으면 사용자 A의 응답이 B에게 갈 수 있어 Cache-Control: private/no-store를 검토한다.",
    },
    {
      id: "q65",
      question: "정적 파일을 앱 서버가 아니라 Object Storage와 CDN으로 제공하는 이유로 옳은 것은?",
      choices: [
        "비공개 파일도 CDN에 올리면 접근 제어가 자동으로 되기 때문",
        "앱 서버는 비즈니스 로직에 집중하고 정적 트래픽은 별도 인프라가 처리해 확장성·비용에 유리하기 때문",
        "Object Storage는 내구성이 약해 임시 저장에만 쓰기 때문",
        "CDN은 지연을 늘려 캐시를 방지하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "앱 서버는 로직·API에 집중하고 정적 트래픽은 Object Storage(대용량·내구성)와 CDN(엣지 지연 감소)이 처리해 확장성·비용에 유리하다. 비공개 파일은 서명 URL·Origin Access Control로 접근을 제한해야 한다.",
    },
    {
      id: "q66",
      question: "Rate Limiting 초과 시 표준 응답과 기준 설계로 옳은 것은?",
      choices: [
        "초과 시 500을 반환하고 IP만 기준으로 하면 충분하다",
        "초과 시 429 Too Many Requests와 Retry-After를 주고, 인증 후엔 사용자 단위가 정확하되 로그인 전엔 IP·디바이스를 병용한다",
        "초과 시 404를 반환한다",
        "단일 IP 기준이 NAT 환경에서도 항상 정확하다",
      ],
      answerIndex: 1,
      explanation:
        "초과 시 429와 Retry-After가 표준이다. 사용자·IP·API Key·엔드포인트 단위로 제한하며, 단일 IP 기준은 NAT의 여러 사용자를 함께 제한하거나 IP 우회에 약해 사용자 단위와 병용한다.",
    },
    {
      id: "q67",
      question: "Rate Limiting 알고리즘에 대한 설명으로 옳은 것은?",
      choices: [
        "Fixed Window는 구간 경계에서 순간적으로 한도의 2배가 통과할 수 있다",
        "Leaky Bucket이 burst를 허용하는 방식이다",
        "Sliding Window는 메모리를 거의 쓰지 않는다",
        "Token Bucket은 일정 속도로만 흘려보내 burst를 막는다",
      ],
      answerIndex: 0,
      explanation:
        "Fixed Window는 구간 경계(예 12:00:59와 12:01:00)에서 2배가 통과할 수 있다. Sliding Window는 정확하나 메모리가 크고, burst 허용은 Token Bucket, 일정 처리 속도는 Leaky Bucket이 맞다.",
    },
    {
      id: "q68",
      question: "분산 서버 환경에서 Rate Limiter를 구현할 때 옳은 것은?",
      choices: [
        "각 서버가 로컬 메모리로만 세도 전체 제한이 정확히 지켜진다",
        "Redis 같은 중앙 저장소에 카운터·토큰을 두고 원자적 연산으로 증가·만료·초과 판단을 처리한다",
        "분산 환경에서는 Rate Limiting이 불가능하다",
        "카운터를 각 서버가 따로 세면 제한이 더 엄격해진다",
      ],
      answerIndex: 1,
      explanation:
        "로컬 메모리 카운트는 분산 시 전체 제한을 초과 통과시킨다. Redis에 카운터·토큰을 두고 Lua/트랜잭션으로 원자적 처리하며, 트래픽이 크면 키 샤딩·서버별 토큰 사전 할당, 장애 시 fail-open/closed를 결정한다.",
    },
    {
      id: "q69",
      question: "DDoS와 정상적인 트래픽 급증을 구분·대응하는 방법으로 옳은 것은?",
      choices: [
        "트래픽 양만 보면 둘을 정확히 구분할 수 있다",
        "앱 계층 공격은 양만으론 판단이 어려워 URL·사용자 행동·요청 패턴·실패율을 함께 보고, CDN·WAF·Rate Limiting·타임아웃/서킷 브레이커로 다계층 방어한다",
        "DDoS는 앱단 타임아웃만으로 완전히 막을 수 있다",
        "정상 급증은 방어가 전혀 필요 없다",
      ],
      answerIndex: 1,
      explanation:
        "DDoS는 다수 지점의 의도적 자원 고갈, 급증은 정상 이벤트다. 앱 계층 공격은 양만으론 구분이 어려워 URL·행동·패턴·실패율을 함께 보고, CDN·Anycast·WAF·Rate Limiting·타임아웃·백프레셔·서킷 브레이커로 다계층 방어한다.",
    },
  ],
};

export default quiz;
