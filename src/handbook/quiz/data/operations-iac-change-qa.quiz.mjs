// IaC·변경관리·Drift Q&A(operations-iac-change-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-iac-change-quiz",
  title: "IaC·변경관리·Drift 퀴즈",
  sourceQaId: "operations-iac-change-qa",
  questions: [
    {
      id: "q1",
      question:
        "Terraform plan의 create/update/delete/replace를 운영 위험으로 읽을 때 핵심은?",
      choices: [
        "action을 리소스 종류와 의존 경로에 묶어 blast radius로 판단하는 것",
        "action 개수의 총합이 임계치를 넘는지 세는 것",
        "diff 텍스트의 줄 수로 변경 규모를 계량하는 것",
        "apply 예상 소요 시간을 기준으로 위험을 등급화하는 것",
      ],
      answerIndex: 0,
      explanation:
        "본문은 create/update/delete/replace를 리소스 종류와 의존 경로에 묶어 읽어야 단순 diff가 아니라 blast radius를 판단할 수 있다고 말한다.",
    },
    {
      id: "q2",
      question: "plan 리뷰에서 승인을 보류하는 것이 기본인 상황은?",
      choices: [
        "단일 리소스의 tag 값 하나가 update로 나올 때",
        "data store, network boundary, IAM trust, public endpoint에서 delete 또는 replace가 보일 때",
        "새 리소스 create가 여러 건 포함되어 있을 때",
        "provider version이 최신이 아닐 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 data store, network boundary, IAM trust, public endpoint에서 delete 또는 replace가 보이면 승인 보류가 기본이라고 명시한다.",
    },
    {
      id: "q3",
      question:
        "replace 리소스를 확인하지 않고 적용할 때 배포 중에 발견하게 되는 위험은?",
      choices: [
        "provider lock file 해시 불일치",
        "state serial 번호의 증가 정지",
        "데이터 손실, endpoint 교체, 보안 정책 공백",
        "plan artifact의 checksum 재계산 실패",
      ],
      answerIndex: 2,
      explanation:
        "본문은 replace가 destroy 뒤 재생성으로 실행되는 리소스인지 확인하지 않으면 데이터 손실, endpoint 교체, 보안 정책 공백을 배포 중에 발견한다고 말한다.",
    },
    {
      id: "q4",
      question: "state lock을 강제로 해제할 때 생길 수 있는 가장 큰 위험은?",
      choices: [
        "backend region 설정이 자동으로 초기화되는 것",
        "workspace 이름이 default로 되돌아가는 것",
        "provider binary가 다운그레이드되는 것",
        "실제 apply 중인 작업의 state write를 덮어쓰는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 강제로 lock을 풀면 실제 apply 중인 작업의 state write를 덮어쓸 수 있다고 경고한다.",
    },
    {
      id: "q5",
      question: "stale lock으로 판단해 unlock을 승인할 수 있는 증거 조건은?",
      choices: [
        "job이 종료됐고 backend object version도 변하지 않았다는 증거가 있을 때",
        "lock이 생성된 지 일정 시간이 지났을 때",
        "다른 workspace에서 apply가 성공했을 때",
        "provider API 호출이 진행 중임이 확인될 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 job이 종료됐고 backend object version도 변하지 않았다는 증거가 있을 때만 unlock 절차를 승인한다고 한다. provider API 호출이 진행 중이면 오히려 기다린다.",
    },
    {
      id: "q6",
      question: "provider version upgrade의 본질을 가장 정확히 설명한 것은?",
      choices: [
        "state 파일 포맷만 바뀌는 저장소 마이그레이션",
        "binary 교체가 아니라 schema 해석과 API 호출 방식의 변경",
        "lock file 해시만 갱신되는 무해한 갱신",
        "plan 출력 형식만 달라지는 표현 계층 변경",
      ],
      answerIndex: 1,
      explanation:
        "본문은 provider 업그레이드가 binary 교체가 아니라 schema 해석과 API 호출 방식 변경이라고 정의한다.",
    },
    {
      id: "q7",
      question: "provider changelog에서 apply 차단 신호로 보아야 하는 항목은?",
      choices: [
        "performance improvement, bug fix, documentation update",
        "new optional argument, additional data source",
        "removed argument, default behavior change, new validation, resource recreation, state upgrade required",
        "deprecation notice가 없는 minor version bump",
      ],
      answerIndex: 2,
      explanation:
        "본문은 removed argument, default behavior change, new validation, resource recreation, state upgrade required 같은 항목을 차단 신호로 든다.",
    },
    {
      id: "q8",
      question: "provider upgrade 롤백 계획을 별도로 써야 하는 이유는?",
      choices: [
        "provider마다 rollback 명령어 이름이 달라서",
        "apply 로그가 자동 삭제되어 복구 근거가 사라져서",
        "changelog가 버전마다 새로 작성되어 비교가 불가능해서",
        "state가 새 schema로 저장되면 lock file을 되돌려도 이전 provider가 state를 읽지 못할 수 있어서",
      ],
      answerIndex: 3,
      explanation:
        "본문은 state가 새 schema로 저장되면 단순히 lock file을 되돌려도 이전 provider가 state를 읽지 못할 수 있어 롤백 계획을 별도로 쓴다고 설명한다.",
    },
    {
      id: "q9",
      question:
        "module 내부 resource 이름만 바뀐 refactor를 그대로 적용하면 생기는 문제는?",
      choices: [
        "Terraform이 기존 리소스를 지우고 다시 만드는 것",
        "호출부 변수 타입이 자동으로 변경되는 것",
        "output 값이 캐시되어 갱신되지 않는 것",
        "provider lock file이 손상되는 것",
      ],
      answerIndex: 0,
      explanation:
        "본문은 module 내부 이름만 바뀐 refactor를 신규 리소스로 인식하면 기존 리소스를 지우고 다시 만들 수 있다고 말한다.",
    },
    {
      id: "q10",
      question:
        "cloud 리소스 identity는 같고 Terraform address만 바뀐 경우 우선 사용하는 처리 방법은?",
      choices: [
        "리소스를 destroy 후 새 address로 재생성하는 것",
        "moved block으로 old/new address를 매핑해 plan을 update 또는 no-op으로 만드는 것",
        "state 파일을 손으로 편집해 address 문자열을 치환하는 것",
        "import block으로 새 address에 리소스를 다시 편입하는 것",
      ],
      answerIndex: 1,
      explanation:
        "본문은 cloud 리소스 identity가 같고 Terraform address만 바뀐 경우 moved block이 우선이며, 매핑 후 plan이 update 또는 no-op으로 바뀌는지 확인한다고 한다.",
    },
    {
      id: "q11",
      question: "drift 판단에서 서로 비교해야 하는 세 값은?",
      choices: [
        "plan 값, apply 값, rollback 값",
        "provider 값, module 값, workspace 값",
        "실제 cloud 값, state 값, code 값",
        "speculative plan, saved plan, policy 결과",
      ],
      answerIndex: 2,
      explanation:
        "본문은 drift 판단을 실제 cloud 값, state 값, code 값을 세 장으로 놓고 어느 쪽을 기준으로 복구할지 정하는 일이라고 설명한다.",
    },
    {
      id: "q12",
      question: "모든 drift를 코드로 덮어쓰거나 모든 콘솔 값을 받아들일 때의 위험은?",
      choices: [
        "둘 다 plan artifact의 해시를 무효화하는 것",
        "둘 다 state serial을 임의로 초기화하는 것",
        "둘 다 provider readback을 비활성화하는 것",
        "코드로 다 덮으면 긴급 복구를 되돌리고, 콘솔 값을 다 받으면 승인되지 않은 설정이 desired state가 되는 것",
      ],
      answerIndex: 3,
      explanation:
        "본문은 모든 drift를 코드로 덮으면 긴급 복구를 되돌릴 수 있고, 모든 콘솔 값을 받아들이면 승인되지 않은 설정이 desired state가 된다고 경고한다.",
    },
    {
      id: "q13",
      question: "console hotfix를 코드로 흡수해도 되는 신호는?",
      choices: [
        "error rate·latency·availability가 회복됐고 변경값이 보안 정책과 비용 한도를 넘지 않을 때",
        "hotfix를 적용한 담당자가 서비스 owner일 때",
        "hotfix가 콘솔에서 단일 클릭으로 적용됐을 때",
        "다음 정기 배포까지 시간이 충분히 남았을 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 hotfix 이후 error rate, latency, availability가 회복됐고 변경값이 보안 정책과 비용 한도를 넘지 않으면 코드 흡수 후보라고 한다.",
    },
    {
      id: "q14",
      question:
        "회복 효과가 있어도 console hotfix를 되돌리거나 대체 완화가 필요한 변경은?",
      choices: [
        "tag 표준화나 description 정리처럼 표시성 변경",
        "public exposure, encryption disable, audit logging off, over-permissive IAM처럼 안전 기준을 깨는 변경",
        "scaling 값의 소폭 상향처럼 비용 이내 변경",
        "endpoint 이름 정렬처럼 무해한 정리 변경",
      ],
      answerIndex: 1,
      explanation:
        "본문은 public exposure, encryption disable, audit logging off, over-permissive IAM처럼 안전 기준을 깨는 변경은 회복 효과가 있어도 되돌림 또는 대체 완화가 필요하다고 한다.",
    },
    {
      id: "q15",
      question: "기존 리소스를 state import하기 전에 identity를 고정하는 올바른 방법은?",
      choices: [
        "리소스 이름만으로 import해 빠르게 편입하는 것",
        "post-import plan을 먼저 apply해 address를 확정하는 것",
        "provider가 요구하는 canonical ID(ARN 또는 self link 등)를 readback으로 확인하는 것",
        "state를 손으로 편집해 address를 미리 채우는 것",
      ],
      answerIndex: 2,
      explanation:
        "본문은 이름만으로 import하지 않고 provider가 요구하는 canonical ID(ARN, self link 등)를 확인해야 다른 리소스를 state에 붙이는 실수를 막는다고 한다.",
    },
    {
      id: "q16",
      question: "moved block으로 destroy/create를 막으려면 어떤 증거가 필요한가?",
      choices: [
        "old/new address의 문자열이 알파벳순으로 정렬된다는 확인",
        "두 address의 tag 값이 동일하다는 확인",
        "plan의 action count가 변하지 않았다는 확인",
        "old address, new address, provider ID가 같은 리소스를 가리킨다는 증거",
      ],
      answerIndex: 3,
      explanation:
        "본문은 old address, new address, provider ID가 같은 리소스를 가리킨다는 증거가 있어야 moved block으로 destroy/create를 막을 수 있다고 말한다.",
    },
    {
      id: "q17",
      question:
        "destroy나 replace가 포함된 파괴적 변경의 승인 기준으로 본문이 강조하는 것은?",
      choices: [
        "실행 가능성이 아니라 복구 가능성과 명시 승인 여부",
        "plan이 오류 없이 생성되었는지 여부",
        "apply runner의 CI 권한 보유 여부",
        "변경 리소스 수가 임계치 이하인지 여부",
      ],
      answerIndex: 0,
      explanation:
        "본문은 파괴적 변경의 결정이 실행 가능성이 아니라 복구 가능성과 명시 승인 여부이며, 대상·데이터 보존·prevent_destroy 예외·backup·rollback owner가 없으면 승인하지 않는다고 한다.",
    },
    {
      id: "q18",
      question: "change window 안에 있어도 apply를 멈춰야 하는 조건은?",
      choices: [
        "apply 예상 시간이 window의 절반을 넘길 때",
        "freeze calendar가 닫혀 있거나 approver가 서비스 owner가 아니거나, plan artifact가 승인 뒤 바뀌었거나 rollback owner가 응답하지 않을 때",
        "plan에 create action이 하나라도 포함될 때",
        "provider version이 직전 배포와 다를 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 window가 필요 조건일 뿐이며 freeze, approver 권한, 승인 후 artifact 변경, rollback owner 무응답 중 하나라도 있으면 멈춘다고 한다.",
    },
    {
      id: "q19",
      question:
        "reviewer가 본 plan과 apply가 실행한 plan을 같게 만들기 위해 고정해야 하는 것은?",
      choices: [
        "PR comment에 붙은 speculative plan의 스크린샷",
        "apply runner의 터미널 세션 로그",
        "saved plan file, input variables, provider lock, workspace, policy result",
        "reviewer의 승인 코멘트 타임스탬프",
      ],
      answerIndex: 2,
      explanation:
        "본문은 saved plan file, input variables, provider lock, workspace, policy result를 고정해야 speculative plan과 apply-time plan 차이를 추적할 수 있다고 한다.",
    },
    {
      id: "q20",
      question: "policy check는 plan의 어느 지점을 검사해야 하는가?",
      choices: [
        "PR에 올라온 원본 소스 코드의 diff",
        "provider lock file의 해시 목록",
        "apply 완료 후의 state serial 변화",
        "code diff가 아니라 generated plan JSON의 action과 attribute 값",
      ],
      answerIndex: 3,
      explanation:
        "본문은 policy가 code diff가 아니라 generated plan JSON을 검사해야 하며, plan action과 attribute 값을 기준으로 실패해야 한다고 한다.",
    },
    {
      id: "q21",
      question: "apply가 성공(exit code 0)해도 서비스가 실패할 수 있는 이유는?",
      choices: [
        "eventual consistency, provider readback 지연, partial API failure, app dependency 누락",
        "state serial이 증가하지 않아서",
        "plan artifact의 해시가 바뀌어서",
        "workspace lock이 자동 해제되지 않아서",
      ],
      answerIndex: 0,
      explanation:
        "본문은 apply가 성공해도 eventual consistency, provider readback 지연, partial API failure, app dependency 누락 때문에 서비스가 실패할 수 있다고 한다.",
    },
    {
      id: "q22",
      question: "post-apply 검증에서 확인해야 하는 것을 가장 정확히 말한 것은?",
      choices: [
        "Terraform exit code가 0인지만 확인",
        "state, provider readback, cloud API, app smoke, metric을 연결해 실제 반영과 사용자 경로 안전을 확인",
        "state serial이 이전보다 커졌는지만 확인",
        "plan artifact의 해시가 승인 시점과 같은지만 확인",
      ],
      answerIndex: 1,
      explanation:
        "본문은 post-apply 검증이 Terraform exit code가 아니라 state, provider readback, cloud API, app smoke, metric을 연결해 변경이 실제 반영됐고 사용자 경로가 안전한지 판단하는 일이라고 한다.",
    },
    {
      id: "q23",
      question:
        "불가피한 replace의 blast radius를 좁히기 위해 먼저 그래프로 확인해야 하는 대상은?",
      choices: [
        "리소스의 tag 값과 description 표준 준수 여부",
        "provider lock file의 해시와 module source pin",
        "downstream dependency, DNS name, security group reference, storage attachment",
        "plan artifact의 action count와 checksum",
      ],
      answerIndex: 2,
      explanation:
        "본문은 replace 대상의 downstream dependency, DNS name, security group reference, storage attachment를 그래프로 확인하고, 불가피하면 snapshot·maintenance window·endpoint switchover·smoke test를 계획에 붙인다고 한다.",
    },
    {
      id: "q24",
      question:
        "concurrent apply가 의심될 때 이미 apply 중인 작업을 다루는 안전한 방법은?",
      choices: [
        "즉시 강제 중단해 state write를 막는다",
        "lock을 강제로 풀어 새 job에 우선권을 준다",
        "workspace를 새로 만들어 병렬로 진행한다",
        "중단보다 완료 확인이 안전할 수 있어 provider transaction 상태와 lock 갱신 여부를 본 뒤 추가 job만 취소한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 이미 apply 중인 작업은 중단보다 완료 확인이 안전할 수 있으므로 provider transaction 상태와 lock 갱신 여부를 본 뒤 추가 job만 취소한다고 한다.",
    },
    {
      id: "q25",
      question:
        "state corruption 가능성이 있을 때 복구 증거를 만드는 올바른 절차는?",
      choices: [
        "backend object version을 고정해 내려받고 JSON validation, resource count, 핵심 address를 확인한 뒤 복원 전후 plan을 별도 reviewer가 검토",
        "가장 최근 state를 그대로 신뢰하고 즉시 apply로 덮어쓴다",
        "state 파일을 손으로 편집해 손상된 address를 제거한다",
        "provider를 다운그레이드해 이전 schema로 되돌린다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 backend object version을 고정해 내려받아 JSON validation, resource count, 핵심 address를 확인하고, 마지막 정상 version 복원 시 전후 plan을 저장해 별도 reviewer가 zero-diff 또는 기대 drift만 남았는지 확인한다고 한다.",
    },
    {
      id: "q26",
      question:
        "provider schema migration은 성공했는데 plan이 달라졌을 때 진행 여부를 어떻게 나누나?",
      choices: [
        "state serial이 올라갔으면 무조건 롤백한다",
        "state만 migration되고 cloud readback이 같으면 기록 후 진행하고, computed value가 바뀌어 replacement가 생기면 provider issue·configuration pin·staged upgrade 중 하나를 택한다",
        "plan이 바뀌었으니 changelog를 무시하고 apply한다",
        "lock file을 되돌려 이전 provider로 재실행한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 state version이 올라간 사실과 field diff를 분리해, state만 migration되고 cloud readback이 같으면 진행하되 computed value가 바뀌어 replacement가 생기면 provider issue, configuration pin, staged upgrade 중 하나를 선택한다고 한다.",
    },
    {
      id: "q27",
      question: "module interface가 깨졌는지 확인하는 증거로 본문이 드는 것은?",
      choices: [
        "state serial 증가와 lock file 해시 변화",
        "plan artifact의 action count와 checksum",
        "variable required 여부, type 변경, validation 추가, output 이름 변경을 release note와 terraform validate로 확인",
        "provider changelog의 deprecation notice 유무",
      ],
      answerIndex: 2,
      explanation:
        "본문은 variable required 여부, type 변경, validation 추가, output 이름 변경을 release note와 terraform validate로 확인하고, 호출부가 값을 안 넘겼는데 default가 바뀐 경우는 plan의 tag·port·subnet·size 변경으로 드러난다고 한다.",
    },
    {
      id: "q28",
      question:
        "drift를 허용된 임시 예외가 아니라 무단 drift로 분류하는 조건은?",
      choices: [
        "console에서 단일 클릭으로 적용된 변경일 때",
        "change ticket과 incident timeline이 모두 존재할 때",
        "refresh-only plan에서 no-op으로 나올 때",
        "owner와 만료 시각이 없거나 보안 boundary, backup, encryption, public exposure에 닿을 때",
      ],
      answerIndex: 3,
      explanation:
        "본문은 change ticket·incident timeline·console audit actor·exception expiry가 있으면 허용된 예외 후보이고, owner와 만료 시각이 없거나 보안 boundary·backup·encryption·public exposure에 닿으면 무단 drift로 분류해 review를 먼저 연다고 한다.",
    },
    {
      id: "q29",
      question:
        "drift 알림이 반복될 때 external controller가 소유한 필드는 어떻게 처리하나?",
      choices: [
        "ignore_changes나 별도 module로 경계를 정한다",
        "해당 리소스를 destroy 후 재생성한다",
        "provider를 최신 버전으로 강제 업그레이드한다",
        "console 권한을 모든 사용자에게서 회수한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 반복 drift 원인을 external controller, provider readback noise, 사람의 console edit로 분리하고, controller가 소유한 필드는 ignore_changes나 별도 module로 경계를 정한다고 한다. 사람의 수정이면 console 권한과 emergency runbook을 고친다.",
    },
    {
      id: "q30",
      question: "destroy 승인으로 인정하려면 승인에 무엇이 명시돼야 하나?",
      choices: [
        "approve apply 같은 일반 승인 문구와 reviewer 이름",
        "resource address, cloud ID, 데이터 보존 여부, 예상 영향 시간, rollback 또는 rebuild owner",
        "plan artifact의 해시와 action count",
        "freeze calendar 상태와 change window 시각",
      ],
      answerIndex: 1,
      explanation:
        "본문은 destroy 승인에 resource address, cloud ID, 데이터 보존 여부, 예상 영향 시간, rollback/rebuild owner가 명시돼야 하며, approve apply 같은 일반 문구만 있으면 destroy 승인으로 보지 않는다고 한다.",
    },
    {
      id: "q31",
      question:
        "apply 직후 cloud readback에서 사용자 영향과 연결해 확인하는 필드는?",
      choices: [
        "state serial과 lock table row",
        "provider lock file 해시와 module source pin",
        "리소스의 ID, version, policy attachment, route target, endpoint, encryption, scaling 값",
        "plan artifact의 action count와 변수 파일 checksum",
      ],
      answerIndex: 2,
      explanation:
        "본문은 apply 직후 변경 리소스의 ID, version, policy attachment, route target, endpoint, encryption, scaling처럼 사용자 영향과 연결된 필드를 확인하고, provider state와 cloud API 값이 다르면 재조회 시각과 API 응답을 남긴다고 한다.",
    },
    {
      id: "q32",
      question: "rollback owner를 apply 전에 확정해야 하는 이유는?",
      choices: [
        "owner가 apply runner의 CI 권한을 대신 승인해야 해서",
        "owner가 provider version을 결정해야 해서",
        "owner가 freeze calendar를 여닫을 권한을 가져서",
        "실패 뒤 새로 정하면 늦고, 어떤 신호에서 중단하고 어떤 commit·state version으로 돌아갈지, 데이터 변경을 되돌릴 수 있는지 미리 알아야 해서",
      ],
      answerIndex: 3,
      explanation:
        "본문은 rollback을 실패 뒤 정하면 늦으므로 owner가 어떤 신호에서 중단할지, 어떤 commit이나 state version으로 돌아갈지, 데이터 변경을 되돌릴 수 있는지 미리 알아야 하며, 이 정보가 ticket에 없으면 apply runner가 실패 판단을 혼자 떠안는다고 한다.",
    },
  ],
};

export default quiz;
