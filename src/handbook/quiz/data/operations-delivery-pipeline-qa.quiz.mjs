// CI/CD·Artifact·Environment 운영 Q&A(operations-delivery-pipeline-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-delivery-pipeline-quiz",
  title: "CI/CD·Artifact·Environment 퀴즈",
  sourceQaId: "operations-delivery-pipeline-qa",
  questions: [
    {
      id: "q1",
      question:
        "운영에 올라간 코드가 어느 commit인지 runtime에서 확정하는 올바른 방법은?",
      choices: [
        "PR merge SHA를 기준으로 삼으면 배포 이력과 일치하므로 충분하다",
        "Git 브랜치 이름과 최신 tag를 조합해 확정한다",
        "실행 중인 workload가 노출하는 build metadata와 배포 이벤트를 맞춰 확정한다",
        "CI 파이프라인의 마지막 성공 빌드 번호로 확정한다",
      ],
      answerIndex: 2,
      explanation:
        "릴리스 후보 식별은 Git 브랜치 이름이 아니라 실행 중인 workload가 노출하는 build metadata와 배포 이벤트를 맞춰 확정한다. 같은 SHA라도 재빌드 이미지·다른 base image·다른 config bundle이면 판단이 달라진다.",
    },
    {
      id: "q2",
      question:
        "브랜치나 태그가 맞아도 runtime에서 추가로 확인해야 하는 증거는?",
      choices: [
        "실행 중인 instance가 반환하는 commit SHA·image digest·build time·config bundle version",
        "PR 리뷰어 승인 수와 merge 시각",
        "CI 러너의 호스트명과 빌드 로그 길이",
        "브랜치 protection rule과 최근 force push 여부",
      ],
      answerIndex: 0,
      explanation:
        "실행 중인 instance가 반환하는 commit SHA·image digest·build time·config bundle version이 배포 이벤트와 같은 값을 가리켜야 한다. 태그는 재사용될 수 있으므로 scheduler가 실제로 잡은 값을 기준으로 삼는다.",
    },
    {
      id: "q3",
      question:
        "artifact digest와 provenance 검증에서 배포 승인의 기준으로 삼아야 하는 것은?",
      choices: [
        "registry에 올라간 mutable tag 이름과 push 시각",
        "immutable digest와 서명 검증 결과",
        "빌드가 통과한 CI job의 초록색 상태",
        "이미지 크기와 layer 개수가 이전과 비슷한지",
      ],
      answerIndex: 1,
      explanation:
        "배포 승인은 mutable tag가 아니라 immutable digest와 서명 검증 결과를 기준으로 내려야 한다. digest를 확인하지 않으면 같은 tag에 다른 이미지가 밀려 들어온 상황이나 서명되지 않은 emergency build를 놓친다.",
    },
    {
      id: "q4",
      question: "tag는 같은데 digest가 다르면 어떻게 해야 하나?",
      choices: [
        "digest는 참고용이므로 tag가 같으면 배포를 계속한다",
        "새 digest가 더 최신이므로 그대로 승인한다",
        "runtime digest를 expected digest 쪽으로 강제로 덮어쓴다",
        "배포를 멈추고 원인을 분리한 뒤 mismatch가 남으면 tag를 freeze하고 새 immutable release id를 발급한다",
      ],
      answerIndex: 3,
      explanation:
        "계속하면 안 된다. tag 재사용·replication 지연·다른 pipeline의 덮어쓰기부터 분리하고, mismatch가 남아 있으면 promotion 대신 해당 tag를 freeze하고 새 immutable release id를 발급한다.",
    },
    {
      id: "q5",
      question: "SBOM과 signature의 역할을 바르게 구분한 것은?",
      choices: [
        "SBOM은 무엇이 들어 있는지, signature는 누가 어떤 산출물을 승인했는지 증명한다",
        "SBOM은 승인자를, signature는 dependency 목록을 증명한다",
        "둘 다 이미지 크기를 검증하는 같은 목적의 도구다",
        "signature 하나만 통과하면 SBOM 없이도 취약 dependency를 설명할 수 있다",
      ],
      answerIndex: 0,
      explanation:
        "SBOM은 무엇이 들어 있는지, signature는 누가 어떤 산출물을 승인했는지 증명한다. 하나만 통과하면 출처·승인 경로나 취약 dependency 설명이 비므로 둘 중 하나가 빠지면 예외 승인과 만료 시각을 기록해야 한다.",
    },
    {
      id: "q6",
      question: "dependency lockfile diff에서 승인 전에 즉시 설명을 요구해야 하는 신호는?",
      choices: [
        "package.json에 새 devDependency 한 줄이 추가된 것",
        "registry host 변경·integrity 값 제거·새 install script·maintainer가 바뀐 고위험 패키지·major version transitive upgrade",
        "패키지 설명 문구와 README가 갱신된 것",
        "lockfile 파일의 줄 수가 늘어난 것",
      ],
      answerIndex: 1,
      explanation:
        "registry host 변경·integrity 값 제거·새 install script·maintainer가 바뀐 고위험 패키지·major version transitive upgrade는 즉시 설명을 요구한다. 설명이 없으면 build를 만들기 전에 PR을 되돌린다.",
    },
    {
      id: "q7",
      question: "dependency rollback을 코드 revert만으로 충분히 재현할 수 없는 이유는?",
      choices: [
        "revert commit·이전 lockfile·이전 artifact digest·package manager cache 조건이 함께 맞아야 재현되기 때문",
        "revert가 항상 merge conflict를 일으키기 때문",
        "revert는 transitive dependency를 자동으로 최신화하기 때문",
        "코드 revert 자체가 lockfile을 삭제하기 때문",
      ],
      answerIndex: 0,
      explanation:
        "revert commit·이전 lockfile·이전 artifact digest·package manager cache 조건이 함께 맞아야 같은 코드를 다시 만들 수 있다. rollback runbook에는 이전 산출물 재배포 경로와 새로 빌드할 때의 registry pinning 절차를 분리해 둔다.",
    },
    {
      id: "q8",
      question: "staging과 production 사이에서 config drift로 비교해야 하는 대상은?",
      choices: [
        "코드 diff와 커밋 메시지 스타일",
        "각 환경의 배포 소요 시간과 러너 성능",
        "config source·secret reference·feature flag default·network endpoint·quota·region·database schema·runtime variable",
        "각 환경의 로그 보존 기간과 대시보드 색상",
      ],
      answerIndex: 2,
      explanation:
        "환경 차이는 코드가 아니라 실행 조건의 계약 차이다. config source·secret reference·feature flag default·network endpoint·quota·region·database schema·runtime variable을 같은 release candidate 기준으로 비교해야 한다.",
    },
    {
      id: "q9",
      question: "환경 차이가 의도된 설정인지 drift인지 어떻게 가르나?",
      choices: [
        "staging에서 성공했으면 모두 의도된 설정으로 본다",
        "policy 문서·config repository·ticket·rollout plan 중 하나에 연결되면 의도된 예외, 출처가 콘솔 수동 변경뿐이거나 owner·만료일이 없으면 drift로 다룬다",
        "production 값이 더 크면 의도된 설정, 작으면 drift로 본다",
        "가장 최근에 바뀐 값을 항상 정상으로 간주한다",
      ],
      answerIndex: 1,
      explanation:
        "차이가 policy 문서·config repository·ticket·rollout plan 중 하나에 연결되면 의도된 예외로 본다. 출처가 콘솔 수동 변경뿐이거나 owner·만료일이 없으면 drift로 다루고, 현재 값을 백업한 뒤 반영할지 되돌릴지 결정한다.",
    },
    {
      id: "q10",
      question: "secret injection 문제를 판단할 때 확인해야 하는 축은?",
      choices: [
        "secret store에 값이 존재하는지 여부만 확인하면 된다",
        "workload가 어떤 version을 어떤 경로(mount)로 어떤 identity(permission)로 읽었는지 확인한다",
        "secret 값의 실제 문자열을 로그에 출력해 비교한다",
        "secret manager의 UI 접속 로그인 이력만 본다",
      ],
      answerIndex: 1,
      explanation:
        "secret 주입 판단은 값 존재 여부가 아니라 workload가 어떤 version을 어떤 경로로 어떤 identity로 읽었는지 확인하는 일이다. 값만 갱신하면 process가 이전 값을 캐시하거나 mount가 비거나 권한이 없어 production에서만 인증 실패가 난다.",
    },
    {
      id: "q11",
      question: "secret version이 맞는지 민감값을 보지 않고 확인하는 방법은?",
      choices: [
        "실패 로그에 secret 값을 직접 남겨 눈으로 대조한다",
        "secret manager의 version id·mount metadata·application의 redacted fingerprint를 비교하고 hash prefix나 version label만 기록한다",
        "새 secret을 평문으로 재발급해 즉시 배포한다",
        "모든 pod를 재시작한 뒤 인증 성공 여부만 본다",
      ],
      answerIndex: 1,
      explanation:
        "secret manager의 version id·mount metadata·application의 redacted fingerprint를 비교하고 값 자체는 출력하지 않으며 hash prefix나 version label만 기록한다. 세 값이 맞는데 실패하면 provider credential 상태나 clock skew로 범위를 옮긴다.",
    },
    {
      id: "q12",
      question: "approval gate와 change freeze 예외 통제가 확인해야 하는 것은?",
      choices: [
        "변경 diff·위험 등급·freeze 여부·검증 결과·rollback owner가 같은 결론을 가리키는지",
        "승인 칸에 사람 이름이 채워졌는지 여부",
        "배포가 업무 시간 안에 이뤄졌는지 여부",
        "채팅에서 팀장이 이모지로 반응했는지 여부",
      ],
      answerIndex: 0,
      explanation:
        "승인 gate는 사람 이름을 채우는 절차가 아니라 변경 diff·위험 등급·freeze 여부·검증 결과·rollback owner가 같은 결론을 가리키는지 확인하는 통제다. emergency release도 사후 승인·범위 제한·만료 예외 기록을 요구한다.",
    },
    {
      id: "q13",
      question: "change freeze 중 emergency release는 언제 허용하나?",
      choices: [
        "긴급하다는 요청이 있으면 범위와 무관하게 허용한다",
        "freeze 기간에는 어떤 경우에도 허용하지 않는다",
        "사용자 피해·보안 위험이 freeze 유지 비용보다 크고, 변경 범위가 최소이며, rollback owner가 대기 중일 때만 허용한다",
        "일반 기능 개선이라도 QA가 끝났으면 함께 배포한다",
      ],
      answerIndex: 2,
      explanation:
        "사용자 피해나 보안 위험이 freeze 유지 비용보다 크고, 변경 범위가 문제 해결에 필요한 최소 단위이며, rollback owner가 대기 중일 때만 허용한다. 일반 기능 개선은 freeze 해제 뒤로 미룬다.",
    },
    {
      id: "q14",
      question: "smoke test와 synthetic journey가 최소로 잡아야 하는 경로는?",
      choices: [
        "health endpoint 하나만 통과하면 충분하다",
        "서버 CPU·메모리 지표가 임계 아래인지만 본다",
        "빌드 아티팩트가 registry에 존재하는지만 확인한다",
        "로그인·권한 확인·핵심 읽기·안전한 쓰기 또는 dry-run·외부 의존성 호출을 서비스 위험에 맞게 고른다",
      ],
      answerIndex: 3,
      explanation:
        "배포 후 최소 검증은 서버 생존 확인이 아니라 사용자가 반드시 지나가는 업무 경로가 release marker와 함께 성공하는지 보는 것이다. 로그인·권한 확인·핵심 읽기·안전한 쓰기 또는 dry-run·외부 의존성 호출을 위험에 맞게 고른다.",
    },
    {
      id: "q15",
      question:
        "canary/progressive delivery에서 다음 단계로 넘어가는 기준으로 옳은 것은?",
      choices: [
        "candidate가 error·latency·saturation·business journey·support signal 기준을 통과할 때만 다음 단계로 간다",
        "정해진 시간표대로 트래픽 비율을 자동으로 올린다",
        "평균 error rate 하나만 baseline보다 낮으면 100%로 전환한다",
        "담당자의 수동 감각으로 문제없어 보이면 넘어간다",
      ],
      answerIndex: 0,
      explanation:
        "점진 배포는 트래픽 스케줄이 아니라 candidate가 error·latency·saturation·business journey·support signal 기준을 통과할 때만 다음 단계로 가는 제어다. 평균만 보면 특정 tenant·region·browser·plan 장애를 놓친다.",
    },
    {
      id: "q16",
      question: "canary의 abort condition이 걸리면 원인 분석 전에 먼저 하는 일은?",
      choices: [
        "원인이 밝혀질 때까지 트래픽을 그대로 두고 관찰한다",
        "traffic split을 직전 안정 비율이나 0%로 되돌리고 candidate revision의 로그와 trace를 보존한다",
        "candidate 로그를 삭제해 노이즈를 줄인 뒤 분석을 시작한다",
        "트래픽을 100%로 올려 문제를 재현부터 시킨다",
      ],
      answerIndex: 1,
      explanation:
        "traffic split을 직전 안정 비율이나 0%로 되돌리고 candidate revision의 로그와 trace를 보존한다. 원인 분석은 그 뒤이며, 자동 rollback이 실행됐다면 rollback event·metric threshold·affected cohort·남은 traffic 비율을 즉시 기록한다.",
    },
    {
      id: "q17",
      question: "blue-green cutover 전에 고정해야 하는 전환 지점과 상태 호환성은?",
      choices: [
        "green 환경의 health check 통과 여부만 확인하면 된다",
        "load balancer target·DNS TTL·sticky session·background worker·database schema compatibility·cache namespace",
        "green 환경의 배포 소요 시간과 이미지 pull 속도",
        "blue 환경의 로그 색상과 대시보드 레이아웃",
      ],
      answerIndex: 1,
      explanation:
        "blue-green 판단은 새 환경 기동 여부보다 전환 지점과 상태 호환성이 안전한지 보는 일이다. load balancer target·DNS TTL·sticky session·background worker·database schema compatibility·cache namespace를 cutover 전에 고정해야 한다.",
    },
    {
      id: "q18",
      question: "DNS 전환과 load balancer 전환의 위험 차이로 옳은 것은?",
      choices: [
        "DNS 전환은 즉시 전체가 바뀌고 LB 전환은 항상 느리다",
        "둘 다 위험이 동일하므로 아무 쪽이나 선택해도 된다",
        "LB 전환만 resolver cache의 영향을 받는다",
        "DNS 전환은 resolver cache·TTL 때문에 사용자가 두 환경에 오래 분산되고, LB 전환은 빠르게 되돌릴 수 있으나 target health·connection draining에 민감하다",
      ],
      answerIndex: 3,
      explanation:
        "DNS 전환은 resolver cache와 TTL 때문에 사용자가 두 환경에 오래 분산될 수 있고, LB 전환은 중앙에서 빠르게 되돌릴 수 있지만 target health와 connection draining에 민감하다. 상태 공유가 약한 서비스는 LB cutover가 낫다.",
    },
    {
      id: "q19",
      question: "rollback을 표면별로 나눠 실행해야 하는 이유는?",
      choices: [
        "artifact·config·migration을 분리해야 어떤 조치가 피해를 줄이고 어떤 조치가 데이터를 위험하게 만드는지 판단할 수 있어서",
        "rollback 명령은 원래 하나뿐이라 순서만 정하면 되어서",
        "표면을 나누면 rollback 시간을 항상 단축할 수 있어서",
        "migration부터 되돌리는 것이 언제나 가장 안전해서",
      ],
      answerIndex: 0,
      explanation:
        "rollback은 되돌릴 표면별로 다르다. artifact·config·flag·migration·queue replay·cache invalidation을 분리해야 판단이 선다. 모두 이전 image로만 되돌리면 config drift나 migration failure가 남고, migration부터 되돌리면 새 코드가 사라진 column을 참조한다.",
    },
    {
      id: "q20",
      question: "migration이 포함된 release에서 destructive change나 backfill이 이미 실행됐다면?",
      choices: [
        "무조건 migration rollback을 먼저 실행한다",
        "app rollback만 하면 데이터가 저절로 복구된다",
        "rollback보다 write stop·forward migration·data repair가 안전할 수 있다",
        "schema가 무엇이든 traffic만 이전으로 되돌리면 된다",
      ],
      answerIndex: 2,
      explanation:
        "schema가 backward compatible하면 app rollback은 가능하나, destructive change·data transform·long-running backfill이 있으면 rollback보다 write stop·forward migration·data repair가 안전할 수 있다. runbook에 migration별 safe to rerun/reverse 여부를 표시한다.",
    },
    {
      id: "q21",
      question: "deploy marker가 logs·metrics·traces에서 하는 핵심 역할은?",
      choices: [
        "대시보드를 보기 좋게 꾸미는 시각 장식이다",
        "장애 증상을 release candidate와 연결하는 join key다",
        "배포 담당자의 근무 시간을 기록하는 태그다",
        "metric 비용을 자동으로 절감하는 압축 키다",
      ],
      answerIndex: 1,
      explanation:
        "배포 marker는 장식이 아니라 장애 증상을 release candidate와 연결하는 join key다. 로그·metric label·trace attribute·error event·synthetic result에 같은 release id·commit·digest·environment가 남아야 배포 전후 차이를 빠르게 자른다.",
    },
    {
      id: "q22",
      question: "metric label에 release 정보를 넣을 때 주의할 점은?",
      choices: [
        "full commit SHA와 digest를 모두 metric label로 넣어 정밀도를 높인다",
        "release 정보는 metric에 절대 넣지 않는다",
        "고카디널리티 값을 무제한 label로 넣지 말고, 짧은 release id나 rollout stage만 label로 두고 full SHA·digest는 trace/log field나 exemplars로 연결한다",
        "label 대신 모든 정보를 metric 이름 자체에 붙인다",
      ],
      answerIndex: 2,
      explanation:
        "고카디널리티 값을 무제한 label로 넣으면 비용·성능 문제가 생긴다. 짧은 release id나 rollout stage만 metric label로 두고 full commit SHA와 artifact digest는 trace/log field나 exemplars로 연결한다.",
    },
    {
      id: "q23",
      question: "CI runner에서 trust boundary로 보고 분리해야 하는 것은?",
      choices: [
        "pull request job·protected branch job·production deploy job의 token scope·secret exposure·runner tenancy·artifact write 권한",
        "runner의 CPU 코어 수와 디스크 용량",
        "빌드 로그의 색상과 출력 포맷",
        "job 이름의 명명 규칙과 이모지 사용",
      ],
      answerIndex: 0,
      explanation:
        "CI runner는 코드 실행 컴퓨트와 배포 권한이 만나는 경계다. pull request job·protected branch job·production deploy job의 token scope·secret exposure·runner tenancy·artifact write 권한을 분리해야 supply-chain 사고를 막는다.",
    },
    {
      id: "q24",
      question: "PR job과 production deploy job의 권한 분리로 옳은 것은?",
      choices: [
        "같은 token으로 build와 deploy를 모두 처리해 파이프라인을 단순화한다",
        "PR job은 read-only token으로 non-production 검증만 하고, production deploy는 protected branch·reviewed workflow·environment approval 뒤 짧은 수명의 OIDC credential을 받는다",
        "PR job에도 production secret을 주어 실제 환경과 동일하게 테스트한다",
        "production deploy는 승인 없이 항상 실행되도록 열어둔다",
      ],
      answerIndex: 1,
      explanation:
        "PR job은 read-only token과 non-production 범위에서 검증만 하고, production deploy는 protected branch·reviewed workflow·environment approval 뒤에 짧은 수명의 OIDC credential을 받아야 한다. 같은 token이 둘 다 하면 artifact 변조와 배포가 한 경로로 묶인다.",
    },
    {
      id: "q25",
      question:
        "rolling update 중 replica마다 실행 commit SHA가 달라도 아직 관찰 중인 상태로 볼 수 있는 조건은?",
      choices: [
        "실패 요청이 특정 revision에 몰려 있으면 부하가 분산되는 것이므로 정상이다",
        "가장 최신 SHA를 실행하는 replica가 절반을 넘으면 정상이다",
        "오래된 replica가 아직 drain되지 않았어도 health check만 통과하면 정상이다",
        "섞임이 rolling window 안에 있고 traffic split·desired revision·rollout status가 계획과 일치할 때",
      ],
      answerIndex: 3,
      explanation:
        "rolling window 안에서만 섞여 있고 traffic split·desired revision·rollout status가 계획과 일치하면 관찰 중인 상태로 볼 수 있다. 실패 요청이 특정 revision에 몰리거나 오래된 replica가 drain되지 않으면 rollout을 멈추고 그 revision만 분리해 rollback 후보로 고정한다.",
    },
    {
      id: "q26",
      question:
        "잘못된 SHA를 기준으로 대응했다가 회수할 때 한 줄 타임라인에 남겨야 하는 것은?",
      choices: [
        "승인자 이름과 배포 채널의 메시지 링크",
        "CI 빌드 번호와 러너 호스트명",
        "처음 가리킨 SHA·실제 runtime SHA·차이가 난 이유·영향받은 replica나 region·교정한 rollback target",
        "runtime 로그 전체 덤프와 metric 대시보드 스크린샷",
      ],
      answerIndex: 2,
      explanation:
        "처음 가리킨 SHA, 실제 runtime SHA, 차이가 난 이유, 영향받은 replica나 region, 교정한 rollback target을 한 줄 타임라인으로 남긴다. 이후 release note와 alert label이 runtime 값을 쓰도록 바꾸고 /version smoke check를 promotion gate에 넣어 같은 착각을 막는다.",
    },
    {
      id: "q27",
      question: "provenance 검증 실패 후 incident record에 붙여야 하는 증거는?",
      choices: [
        "실패한 attestation id·거부된 digest·허용한 대체 digest·검증 명령 출력·registry audit log 링크",
        "실패한 job의 재시도 횟수와 총 소요 시간",
        "검증을 우회하기로 한 사람의 구두 승인 메모",
        "이미지의 layer 수와 크기 변화 그래프",
      ],
      answerIndex: 0,
      explanation:
        "incident record에는 실패한 attestation id·거부된 digest·허용한 대체 digest·검증 명령 출력·registry audit log 링크를 붙인다. pipeline에는 unsigned artifact가 deploy job까지 오지 못하게 policy check를 앞단으로 옮기고, exception은 ticket과 expiry 없이는 실행되지 않게 만든다.",
    },
    {
      id: "q28",
      question:
        "transitive dependency 취약점이 발견되면 release를 무조건 멈춰야 하나?",
      choices: [
        "발견 즉시 severity와 무관하게 모든 release를 멈춘다",
        "dev dependency면 항상 무시하고 그대로 배포한다",
        "exploitable path·runtime 포함 여부·severity·compensating control·배포 긴급도를 함께 보고 판단한다",
        "scanner가 표시한 CVSS 점수 하나만 보고 7 이상이면 멈춘다",
      ],
      answerIndex: 2,
      explanation:
        "exploitable path, 패키지가 runtime에 포함되는지, severity, compensating control, 배포 긴급도를 함께 본다. 운영 경로에서 호출되지 않는 dev dependency와 인증 전 요청에서 실행되는 parser 취약점은 다르게 판단하며, 예외로 진행하면 owner·만료일·upgrade target·scanner evidence를 release packet에 붙인다.",
    },
    {
      id: "q29",
      question:
        "배포 중 secret이나 env var mismatch가 보이면 먼저 줄여야 하는 피해는?",
      choices: [
        "배포 소요 시간이 늘어나는 것",
        "대시보드 alert 개수가 늘어나는 것",
        "빌드 캐시가 무효화되는 것",
        "인증 실패·외부 API 오발송·다른 tenant 데이터 접근 가능성을 먼저 차단한다",
      ],
      answerIndex: 3,
      explanation:
        "인증 실패·외부 API 오발송·다른 tenant 데이터 접근 가능성을 먼저 차단한다. 영향이 쓰기 경로에 있으면 traffic을 read-only나 이전 revision으로 돌리고, readback에는 변수 이름·값의 hash·secret version·reload 시각만 남겨 민감값이 로그에 흘러가지 않게 한다.",
    },
    {
      id: "q30",
      question:
        "secret rotation 중 일부 pod만 인증에 실패하면 어떤 순서로 범위를 줄이나?",
      choices: [
        "모든 pod를 동시에 재시작해 상태를 초기화한 뒤 다시 본다",
        "실패 pod의 secret 값을 로그에 출력해 성공 pod와 직접 대조한다",
        "실패 pod의 secret mount time·restart time·sidecar reload log를 성공 pod와 비교한다",
        "새 credential을 즉시 전체 폐기하고 old credential만 남긴다",
      ],
      answerIndex: 2,
      explanation:
        "먼저 실패 pod의 secret mount time·restart time·sidecar reload log를 성공 pod와 비교한다. old credential이 아직 허용되면 traffic을 성공 revision으로 몰고 실패 pod를 recycle하며, 이미 폐기됐다면 provider 허용 목록을 임시 복원하되 만료 시각과 owner를 남긴다.",
    },
    {
      id: "q31",
      question:
        "blue-green cutover 직전 green 환경이 health endpoint 외에 증명해야 하는 업무 상태는?",
      choices: [
        "green 환경의 이미지 pull 속도와 컨테이너 기동 시간",
        "green 환경의 CPU·메모리 여유와 replica 수",
        "green 환경의 로그 포맷과 대시보드 연결 상태",
        "schema read/write compatibility·session validation·queue consumer pause 상태·cache key namespace·downstream credential",
      ],
      answerIndex: 3,
      explanation:
        "green은 health endpoint뿐 아니라 schema read/write compatibility·session validation·queue consumer pause 상태·cache key namespace·downstream credential을 증명해야 한다. 이 증거가 없으면 LB 전환이 성공해도 사용자 상태가 깨질 수 있어 cutover를 보류한다.",
    },
    {
      id: "q32",
      question: "self-hosted runner를 쓸 때 가장 먼저 확인해야 하는 격리는?",
      choices: [
        "runner의 CPU·디스크 사양이 빌드 시간을 충족하는지",
        "runner에 설치된 언어 런타임 버전이 최신인지",
        "runner 로그가 중앙 저장소로 수집되는지",
        "runner group이 repository·environment별로 분리됐는지·job마다 clean workspace가 보장되는지·network egress와 metadata endpoint 접근이 제한되는지",
      ],
      answerIndex: 3,
      explanation:
        "runner group이 repository와 environment별로 분리되어 있는지, job마다 clean workspace가 보장되는지, network egress와 metadata endpoint 접근이 제한되는지 확인한다. 실패 증거는 남은 workspace 파일·reused credential·unexpected outbound connection이며, 발견되면 runner를 격리하고 token을 rotate한다.",
    },
  ],
};

export default quiz;
