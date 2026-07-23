// 운영 체크리스트·면접 답변 Q&A(operations-checklist-interview-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "operations-checklist-interview-quiz",
  title: "운영 체크리스트·면접 답변 퀴즈",
  sourceQaId: "operations-checklist-interview-qa",
  questions: [
    {
      id: "q1",
      question: "장애 면접 답변을 구성하는 올바른 순서는?",
      choices: [
        "원인 가설을 먼저 확정하고 익숙한 기술 이름으로 설명한다",
        "상황·사용자 영향·첫 증거·즉시 조치·검증 기준 순으로 말한다",
        "사건 경위를 시간순으로 길게 설명한 뒤 결론을 낸다",
        "사용한 명령어와 대시보드 이름을 먼저 나열한다",
      ],
      answerIndex: 1,
      explanation:
        "좋은 운영 답변은 사건 설명보다 판단 흐름이 먼저 보여야 하며 상황, 사용자 영향, 첫 증거, 즉시 조치, 검증 기준 순으로 말한다. 처음부터 원인 가설이나 기술 이름으로 들어가면 고객 피해와 완화 기준이 사라진다.",
    },
    {
      id: "q2",
      question: "장애 답변의 첫 30초에 들어가야 하는 내용으로 옳은 것은?",
      choices: [
        "서비스·발생 시각·영향받은 사용자나 경로·확인한 증거 하나·즉시 줄일 피해",
        "가장 유력한 근본 원인과 그 원인의 상세 재현 절차",
        "관련된 모든 관측 지표의 전체 목록과 수치",
        "팀 전체 escalation ladder와 담당자 연락처",
      ],
      answerIndex: 0,
      explanation:
        "첫 30초에는 서비스, 발생 시각, 영향받은 사용자나 경로, 현재 확인한 증거 하나, 즉시 줄일 피해를 말한다. 아직 모르는 원인은 모른다고 두고 다음 확인 대상을 지정한다.",
    },
    {
      id: "q3",
      question: "장애 답변에서 원인 가설을 안전하게 넣는 시점은?",
      choices: [
        "질문을 듣자마자 가장 그럴듯한 원인부터 단정해서 말한다",
        "검증이 끝나 원인이 완전히 확정된 뒤에만 언급한다",
        "사용자 영향과 첫 증거를 말한 뒤 가설이라고 표시하고 넣는다",
        "완화 조치를 모두 끝낸 후 마지막에 참고로 덧붙인다",
      ],
      answerIndex: 2,
      explanation:
        "원인 가설은 사용자 영향과 첫 증거를 말한 뒤 가설이라고 표시해야 한다. 에러율 상승, 최근 배포 marker, 특정 cohort 실패가 함께 있을 때만 배포 관련 가설을 두고 틀릴 때의 우회책을 같이 말한다.",
    },
    {
      id: "q4",
      question: "장애 답변의 마지막은 무엇으로 닫아야 하나요?",
      choices: [
        "정상화된 SLI·사용자 path smoke·남은 위험·관찰 시간을 말하고 owner를 지정하는 검증 기준",
        "'복구 완료'라는 명확한 완료 선언",
        "이번 장애의 근본 원인에 대한 최종 결론",
        "다음에 공부할 기술 학습 목록",
      ],
      answerIndex: 0,
      explanation:
        "답변은 완료 선언이 아니라 검증 기준으로 닫는다. 정상화된 SLI, 실제 사용자 path smoke, 남은 위험, 관찰 시간을 말하고 owner를 지정해야 복구를 증명한 답변이 된다.",
    },
    {
      id: "q5",
      question: "직접 경험과 간접 학습을 면접에서 다룰 때 면접관이 주로 보는 것은?",
      choices: [
        "경험의 규모와 다룬 장애의 심각도",
        "직접·참관·학습·추론의 경계 표시와 각 범위에서 판단할 수 있는 것",
        "얼마나 많은 클라우드 서비스를 다뤄봤는지",
        "얼마나 오래 운영 업무를 해왔는지의 연차",
      ],
      answerIndex: 1,
      explanation:
        "면접관은 경험의 크기보다 경계 표시를 본다. 직접 수행, 참관, 문서 학습, 추론을 나눠 말하고 각 범위에서 무엇을 판단할 수 있는지 설명하면 과장 없이 운영 사고력을 보여준다.",
    },
    {
      id: "q6",
      question: "직접 수행한 경험을 증명하는 방법으로 옳은 것은?",
      choices: [
        "실행한 명령어 이름을 최대한 많이 정확하게 나열한다",
        "내 역할·사용한 권한·본 출력·내린 결정·실패 시 바꾼 조치를 말한다",
        "그 작업이 얼마나 어려웠는지 상황의 긴박함을 강조한다",
        "함께 일한 팀원과 승인자의 직급을 밝힌다",
      ],
      answerIndex: 1,
      explanation:
        "직접 경험은 내 역할, 사용한 권한, 본 출력, 내린 결정, 실패했을 때 바꾼 조치로 증명한다. 명령 이름만 나열하면 수행 증거가 약하므로 출력 필드나 결정 시각을 붙인다.",
    },
    {
      id: "q7",
      question: "아직 직접 해보지 않은 주제가 나왔을 때 좋은 답변은?",
      choices: [
        "모른다고 인정하고 답변을 마무리한다",
        "아는 것처럼 인접 지식으로 최대한 그럴듯하게 답한다",
        "경계를 표시한 뒤 runbook·staging 출력·확인할 사람 같은 검증 계획을 말한다",
        "질문을 바꿔 자신 있는 다른 주제로 답변을 돌린다",
      ],
      answerIndex: 2,
      explanation:
        "모른다고 끝내지 말고 경계를 표시한 뒤 검증 계획을 말한다. 관련 runbook을 찾고 staging에서 어떤 출력과 지표를 볼지, 누구에게 확인할지 제시하면 운영 리스크를 숨기지 않는 태도로 평가된다.",
    },
    {
      id: "q8",
      question: "명령 출력 해석에서 핵심은 무엇인가요?",
      choices: [
        "명령을 실행했다는 사실 자체가 증거가 된다",
        "평균 상태와 성공 exit code만 확인하면 충분하다",
        "가장 최신 버전의 명령어를 아는 것이 중요하다",
        "status·reason·desired/current·error code 같은 필드가 어떤 운영 결정을 바꾸는지 설명한다",
      ],
      answerIndex: 3,
      explanation:
        "명령은 실행 사실이 아니라 출력 해석이 핵심이다. status, reason, timestamp, desired/current, error code, scope를 읽고 그 필드가 어떤 운영 결정을 바꾸는지 설명해야 한다. 평균 상태나 성공 exit code만 보면 일부 shard·region·replica 실패를 놓친다.",
    },
    {
      id: "q9",
      question: "출력 예시 `Ready 1/3`을 면접에서 설명하는 좋은 방식은?",
      choices: [
        "1개가 준비됐으니 정상 동작으로 판단한다고 말한다",
        "숫자를 그대로 읽고 다음 명령으로 넘어간다",
        "3개 중 1개 실패는 허용 범위이므로 무시한다고 말한다",
        "두 replica가 traffic을 못 받는 상태이며 rollout 중인지 crash인지 events로 갈라야 한다고 설명한다",
      ],
      answerIndex: 3,
      explanation:
        "한 줄을 그대로 읽기보다 필드 의미와 판단을 붙인다. `Ready 1/3`이면 두 replica가 traffic을 못 받는 상태이고 rollout 중인지 crash인지 events로 갈라야 한다고 설명해야 암기와 운영 판독이 분리된다.",
    },
    {
      id: "q10",
      question: "장애 triage 답변이 원인 찾기보다 먼저 보여야 하는 것은?",
      choices: [
        "가장 최근 배포를 원인으로 지목하는 판단",
        "영향받는 사용자·최근 변경·첫 증거·즉시 완화·escalation 기준을 분리한 피해 축소 판단",
        "관련 팀을 즉시 호출하는 escalation 실행",
        "임시 완화와 영구 수정을 하나로 묶은 통합 해결책",
      ],
      answerIndex: 1,
      explanation:
        "triage 답변은 원인 찾기보다 피해 축소 판단을 먼저 보여야 한다. 영향받는 사용자, 최근 변경, 첫 증거, 즉시 가능한 완화, escalation 기준을 분리하면 장애 중 우선순위를 세울 수 있는지 드러난다.",
    },
    {
      id: "q11",
      question: "첫 증거가 부족한 상황에서 원인 확정 전에 말할 수 있는 완화의 조건은?",
      choices: [
        "reversible하고 영향·rollback이 분명하며 실행/중단 조건을 SLO나 cohort 지표로 정한 완화",
        "근본 원인을 제거하는 영구적 코드 수정",
        "가장 빠르게 적용 가능한 조치라면 되돌릴 수 없어도 무방",
        "팀 전체 합의를 거쳐야만 실행 가능한 조치",
      ],
      answerIndex: 0,
      explanation:
        "사용자 피해가 진행 중이면 원인 확정 전에도 reversible한 완화는 말할 수 있다. traffic shift, feature flag off, read-only mode처럼 영향과 rollback이 분명한 조치이며 실행·중단 조건을 SLO나 cohort 지표로 정해야 한다.",
    },
    {
      id: "q12",
      question: "최근 변경을 확인하는 일의 성격을 가장 정확히 설명한 것은?",
      choices: [
        "가장 눈에 띄는 배포 하나를 찾아 원인으로 지목하는 일",
        "모든 변경을 동일한 비중으로 의심해 전부 rollback하는 일",
        "code deploy·config·flag·IaC·dependency·provider incident를 같은 timeline에 놓고 시각·scope가 맞는지 판단하는 일",
        "변경 이력이 없으면 즉시 감사를 종료하는 일",
      ],
      answerIndex: 2,
      explanation:
        "최근 변경 확인은 배포 하나를 찾는 일이 아니라 시간축 후보를 정리하는 일이다. code deploy, config, feature flag, IaC, dependency, provider incident를 같은 timeline에 놓고 영향 시작 시각과 scope가 맞는지 판단한다.",
    },
    {
      id: "q13",
      question: "상관관계와 원인 후보를 구분하는 기준으로 옳은 것은?",
      choices: [
        "변경 시각과 장애 시각이 맞으면 원인으로 확정한다",
        "변경 scope·실패 cohort·전후 지표·rollback 결과가 같은 방향을 가리켜야 원인 후보로 올린다",
        "가장 규모가 큰 변경을 원인 후보로 우선한다",
        "owner가 있는 변경만 원인 후보로 인정한다",
      ],
      answerIndex: 1,
      explanation:
        "시각이 맞는 것만으로는 부족하다. 변경된 scope와 실패한 cohort, 전후 지표, rollback 또는 disable 결과가 같은 방향을 가리켜야 원인 후보로 올리고, 맞지 않으면 우연한 동시 발생으로 표시한다.",
    },
    {
      id: "q14",
      question: "사용자 영향을 설명할 때 전체 평균이나 단일 오류율만 말하면 생기는 문제는?",
      choices: [
        "특정 region·plan·device·tenant의 장애를 숨기고 business path별 우선순위를 판단하지 못한다",
        "수치가 부정확해 SLO 계산이 불가능해진다",
        "면접 답변이 지나치게 길어진다",
        "cohort 데이터를 조회할 권한이 필요해진다",
      ],
      answerIndex: 0,
      explanation:
        "전체 평균이나 단일 오류율만 말하면 특정 region, plan, device, tenant의 장애를 숨길 수 있다. business path를 빼면 결제·가입·알림 같은 실제 피해의 우선순위를 판단하지 못한다.",
    },
    {
      id: "q15",
      question: "복구 완료를 증명하는 답변으로 옳은 것은?",
      choices: [
        "알람이 조용해졌으므로 정상화됐다고 선언한다",
        "'서비스가 돌아왔다'는 사실을 명확히 전달한다",
        "user journey·SLO·backlog·error budget·monitoring window로 정상화 기준과 남은 위험을 함께 제시한다",
        "가장 먼저 회복된 지표 하나를 근거로 복구를 선언한다",
      ],
      answerIndex: 2,
      explanation:
        "복구 답변은 '돌아왔다'가 아니라 어떤 기준으로 정상화됐는지와 무엇이 아직 위험한지 말해야 한다. 알람이 조용해졌다는 이유만으로 복구를 말하면 누적 queue, cache warm-up, delayed retry, 특정 cohort 실패를 놓친다.",
    },
    {
      id: "q16",
      question: "monitoring window(관찰 창)를 정하는 기준은?",
      choices: [
        "장애 대응에 걸린 시간과 동일하게 맞춘다",
        "장애의 재발 주기와 지연 효과에 맞추며 cache·queue·batch·retry가 있으면 충분히 길게 둔다",
        "항상 고정된 표준 시간(예: 30분)으로 통일한다",
        "알람이 멈춘 즉시 창을 닫는다",
      ],
      answerIndex: 1,
      explanation:
        "monitoring window는 장애의 재발 주기와 지연 효과에 맞춘다. cache, queue, batch, client retry가 있으면 즉시 회복 뒤에도 충분한 창을 두고 owner가 창 끝에서 재확인하도록 남긴다.",
    },
    {
      id: "q17",
      question: "운영 증거 artifact의 역할 연결로 옳은 것은?",
      choices: [
        "모든 상황에서 screenshot 하나면 충분하다",
        "metric만 있으면 개별 요청 경로까지 완전히 증명된다",
        "ticket만으로 실제 시스템 상태를 증명할 수 있다",
        "로그는 사건, metric은 규모와 추세, trace는 경로, ticket은 결정, runbook은 재현 절차, screenshot은 UI 상태를 보완한다",
      ],
      answerIndex: 3,
      explanation:
        "증거 packet은 각 artifact의 역할이 분명해야 한다. 로그는 사건, metric은 규모와 추세, trace는 경로, ticket은 결정, runbook은 재현 절차, screenshot은 당시 UI 상태를 보완한다. 한 종류로만 채우면 판단이 흔들린다.",
    },
    {
      id: "q18",
      question: "screenshot이 증거로 충분하지 않은 이유는?",
      choices: [
        "이미지 화질이 낮아 판독이 어렵기 때문",
        "순간 상태만 보여줄 뿐 query·scope·권한·갱신 시각을 보장하지 못하기 때문",
        "저장 용량을 많이 차지하기 때문",
        "면접에서 화면 공유가 불가능하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "screenshot은 순간 상태를 보여주지만 query, scope, 권한, 갱신 시각을 보장하지 않는다. ticket 보조 증거로 두고 원본 metric query나 audit log를 함께 제시해야 하며 보안 정보가 보이면 redaction도 말한다.",
    },
    {
      id: "q19",
      question: "클라우드 서비스 관련 질문에 답할 때 서비스 이름 대신 나눠야 하는 경계는?",
      choices: [
        "프론트엔드와 백엔드",
        "온프레미스와 클라우드",
        "control plane·data plane·quota·cost·security boundary",
        "개발·스테이징·프로덕션 환경",
      ],
      answerIndex: 2,
      explanation:
        "클라우드 답변은 서비스 이름보다 control plane, data plane, quota, cost, security boundary를 나눠야 한다. 이 경계로 답하면 AWS나 Azure 세부 이름이 달라도 운영 판단이 유지된다.",
    },
    {
      id: "q20",
      question: "control plane과 data plane을 나눠야 하는 이유는?",
      choices: [
        "두 plane은 항상 같은 지표로 함께 움직이기 때문",
        "control plane이 data plane보다 항상 먼저 복구되기 때문",
        "비용이 data plane에서만 발생하기 때문",
        "설정 변경이 실패해도 기존 traffic은 정상일 수 있고, 관리 API가 정상이어도 사용자 요청은 실패할 수 있어서",
      ],
      answerIndex: 3,
      explanation:
        "control plane은 설정 변경과 API 작업, data plane은 실제 요청 처리다. 설정 변경이 실패해도 기존 traffic은 정상일 수 있고 반대로 관리 API가 정상이어도 사용자 요청은 실패할 수 있어 두 지표와 대응을 분리해야 한다.",
    },
    {
      id: "q21",
      question: "보안 질문에 답할 때 정책 이름보다 중요한 연결은?",
      choices: [
        "가장 최신 보안 모범 사례 목록을 빠짐없이 나열하는 것",
        "threat·control·evidence·tradeoff·rollback 조건을 연결하는 것",
        "회사의 보안 인증 취득 현황을 설명하는 것",
        "공격 도구와 취약점 CVE 번호를 정확히 아는 것",
      ],
      answerIndex: 1,
      explanation:
        "보안 답변은 정책 이름보다 위협과 통제의 연결이 중요하다. 어떤 threat를 줄이는지, 어떤 control이 적용되는지, evidence가 무엇인지, 운영 tradeoff와 rollback 조건이 무엇인지 말해야 한다.",
    },
    {
      id: "q22",
      question: "보안 control이 작동한다는 evidence로 옳은 것은?",
      choices: [
        "정책 diff 하나만으로 충분히 증명된다",
        "control을 적용했다는 배포 기록",
        "denied audit log·access analyzer 결과·test principal 실패와 정상 사용자 path smoke",
        "보안팀의 구두 승인",
      ],
      answerIndex: 2,
      explanation:
        "정책 diff만으로는 부족하다. denied audit log, access analyzer 결과, test principal의 실패, alert 증거를 보고 정상 사용자 path가 깨지지 않았다는 smoke도 함께 있어야 보안 강화와 운영 안정성을 같이 증명한다.",
    },
    {
      id: "q23",
      question: "보안 조치의 rollback을 말할 때 옳은 관점은?",
      choices: [
        "예외 principal·만료 시각·compensating control·재적용 조건을 명시한 안전한 예외 범위를 정하는 것",
        "보호를 완전히 포기하고 원상 복구하는 것",
        "무기한 예외를 열어 운영 편의를 우선하는 것",
        "rollback 없이 control을 영구 고정하는 것",
      ],
      answerIndex: 0,
      explanation:
        "rollback은 보호를 포기한다는 뜻이 아니라 안전한 예외 범위를 정하는 것이다. 예외 principal, 만료 시각, compensating control, 재적용 조건을 명시하며 무기한 예외는 실패 모드로 지적한다.",
    },
    {
      id: "q24",
      question: "운영 성장 계획 답변이 보여야 하는 것은?",
      choices: [
        "가능한 많은 기술을 공부하겠다는 학습 의지",
        "지금까지 대응한 장애의 개수와 규모",
        "취득 예정인 자격증과 교육 이수 계획",
        "약점 진단·반복 drill·shadowing·runbook 수정·incident review를 연결한 개선 루프",
      ],
      answerIndex: 3,
      explanation:
        "성장 계획은 의지가 아니라 개선 루프를 보여야 한다. 약점 진단, 반복 drill, 숙련자 shadowing, runbook 수정, incident review 참여를 연결하면 학습이 운영 성과로 이어지는지 평가할 수 있다.",
    },
    {
      id: "q25",
      question: "drill과 shadowing의 차이로 옳은 것은?",
      choices: [
        "drill은 문서를 읽는 것이고 shadowing은 자격증을 따는 것이다",
        "drill은 팀 훈련이고 shadowing은 혼자 하는 복습이다",
        "둘은 같은 활동이며 이름만 다르다",
        "drill은 내가 직접 판단하고 시간을 재는 연습, shadowing은 숙련자의 분기 기준을 배우는 과정이다",
      ],
      answerIndex: 3,
      explanation:
        "drill은 내가 직접 판단하고 시간을 재는 연습이고 shadowing은 숙련자의 분기 기준을 배우는 과정이다. 둘을 연결해 shadowing에서 본 decision point를 다음 drill checklist에 넣는다.",
    },
    {
      id: "q26",
      question: "클라우드 서비스 limit을 운영 답변에서 다루는 옳은 방식은?",
      choices: [
        "limit은 장애 원인 후보이자 변경 승인 조건이므로 current usage·burst behavior·region별 quota·증설 lead time·실패 시 error code를 함께 말한다",
        "limit은 provider가 관리하므로 운영에서 신경 쓸 필요가 없다",
        "limit에 도달하면 다른 검토 없이 무조건 quota increase만 요청한다",
        "평균 사용량이 limit 아래면 안전하다고 결론 낸다",
      ],
      answerIndex: 0,
      explanation:
        "limit은 장애 원인 후보이면서 변경 승인 조건이다. current usage, burst behavior, region별 quota, 증설 lead time, 실패 시 error code를 말하고 다음 조치는 quota increase, traffic shaping, fallback region 검토처럼 사용자 영향과 비용을 함께 보는 것이다.",
    },
    {
      id: "q27",
      question: "참관하거나 학습한 간접 경험을 면접에서 다룰 때 옳은 것은?",
      choices: [
        "직접 수행한 것처럼 말해 경험의 규모를 키운다",
        "간접 경험은 가치가 없으므로 답변에서 빼는 것이 낫다",
        "참관한 postmortem의 결론을 그대로 외워 전달하면 충분하다",
        "실행 주체가 아니었음을 밝히고 확인한 artifact와 다음에 직접 검증할 항목을 분리한다",
      ],
      answerIndex: 3,
      explanation:
        "참관한 incident나 postmortem은 판단 구조를 배운 근거로 쓸 수 있다. 다만 실행 주체가 아니었다고 밝히고 내가 확인한 artifact와 다음에 직접 검증할 항목을 분리한다. 남의 결론을 외워 말하는 것은 실패 모드이며 보완 조치는 lab 재현이나 shadowing 계획을 제시하는 것이다.",
    },
    {
      id: "q28",
      question: "명령 출력에서 가장 먼저 고를 필드를 정하는 기준은?",
      choices: [
        "항상 exit code를 가장 먼저 본다",
        "출력에서 값이 가장 큰 필드부터 본다",
        "질문이 묻는 운영 결정에 연결되는 필드를 고른다(배포면 desired/current revision, 장애면 failing endpoint와 error code)",
        "출력의 첫 줄부터 순서대로 모두 읽는다",
      ],
      answerIndex: 2,
      explanation:
        "출력에서는 질문이 묻는 운영 결정에 연결되는 필드를 고른다. 배포면 desired/current revision, 장애면 failing endpoint와 error code, 권한이면 principal과 denied action, 용량이면 limit과 current usage다. 필드를 고른 이유를 말하지 못하면 명령 실행은 증거가 아니라 장식이 된다.",
    },
    {
      id: "q29",
      question: "최근 변경 감사에서 '변경 없음'이 나왔을 때 옳은 다음 조치는?",
      choices: [
        "변경 없음은 감사 범위의 결과이므로 automation 계정·scheduled job·secret rotation·provider health·dependency release를 추가로 본다",
        "변경이 없으므로 즉시 감사를 종료한다",
        "원인이 없다고 결론 내고 사용자에게 정상 공지를 낸다",
        "확인되지 않은 배포를 예방적으로 모두 rollback한다",
      ],
      answerIndex: 0,
      explanation:
        "변경 없음은 결론이 아니라 감사 범위의 결과다. automation 계정, scheduled job, secret rotation, provider health, dependency release를 추가로 보고 그래도 없으면 관측 누락 가능성을 incident record에 표시하며 자동 수집할 change feed를 backlog로 남긴다.",
    },
    {
      id: "q30",
      question: "affected cohort를 정할 때 보는 축으로 옳은 것은?",
      choices: [
        "전체 요청 수의 평균만 본다",
        "가장 트래픽이 많은 단일 endpoint만 본다",
        "장애 대응에 걸린 시간을 cohort 축으로 삼는다",
        "region·tenant·plan·device·browser·auth 상태·새 버전 여부처럼 실패율이 갈리는 축을 보고 같은 축의 정상 샘플과 비교한다",
      ],
      answerIndex: 3,
      explanation:
        "affected cohort는 region, tenant, plan, device, browser, auth 상태, 새 버전 여부처럼 실패율이 갈리는 축을 본다. cohort를 정하면 같은 축의 정상 샘플과 비교하고 query 결과와 support sample을 증거로 삼아 완화나 공지를 그 cohort로 좁힌다.",
    },
    {
      id: "q31",
      question: "운영 증거들이 서로 충돌할 때(trace는 실패, metric은 정상) 옳은 대응은?",
      choices: [
        "항상 metric을 우선해 정상으로 판단한다",
        "충돌하는 증거는 무시하고 screenshot으로 결론 낸다",
        "timestamp·scope·sampling·aggregation window를 먼저 맞추고 더 원천에 가까운 artifact를 찾는다",
        "두 증거의 수치를 평균 내어 판단한다",
      ],
      answerIndex: 2,
      explanation:
        "증거가 충돌하면 먼저 timestamp, scope, sampling, aggregation window를 맞춘다. trace는 실패인데 metric이 정상일 수 있고 metric은 평균이라 cohort 실패를 숨길 수 있으므로 충돌을 숨기지 말고 더 원천에 가까운 artifact를 찾는 다음 조치를 말한다.",
    },
    {
      id: "q32",
      question: "장애를 다음 담당자에게 escalation할 때 전달해야 하는 것은?",
      choices: [
        "확인한 증거·배제한 가설·진행 중인 완화·필요한 결정 권한을 전달한다",
        "증상 요약 한 줄만 전달하면 충분하다",
        "담당자 연락처와 직급을 먼저 전달한다",
        "원인이 완전히 확정될 때까지 넘기지 않는다",
      ],
      answerIndex: 0,
      explanation:
        "영향이 SLO burn, 보안, 데이터 손상, 결제 경로에 닿으면 escalation 기준을 명시하고 넘긴다. 이때 증상 요약이 아니라 확인한 증거, 배제한 가설, 진행 중인 완화, 필요한 결정 권한을 전달해야 다음 담당자가 같은 triage를 반복하지 않는다.",
    },
    {
      id: "q33",
      question: "운영 성장이 검증됐다고 볼 수 있는 산출물로 옳은 것은?",
      choices: [
        "공부한 기술 목록과 읽은 문서의 수",
        "장애를 열심히 대응했다는 경험담",
        "취득한 자격증의 개수",
        "runbook PR·alert tuning·postmortem action closure·incident review 발표·재실행한 drill 결과처럼 남는 산출물",
      ],
      answerIndex: 3,
      explanation:
        "성장 결과는 runbook PR, alert tuning, postmortem action closure, incident review 발표, 재실행한 drill 결과처럼 남는 산출물로 말한다. 좋은 답변은 다음 장애에서 시간이 얼마나 줄었는지나 누락 증거가 어떻게 줄었는지를 포함하며 산출물이 없으면 학습이 운영 개선으로 검증되지 않은 상태다.",
    },
  ],
};

export default quiz;
