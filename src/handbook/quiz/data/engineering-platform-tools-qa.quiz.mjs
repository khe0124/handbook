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
  ],
};

export default quiz;
