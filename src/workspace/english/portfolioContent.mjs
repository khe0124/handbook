export const caseStudySteps = [
  { id:"overview", label:"Overview", purpose:"프로젝트를 20초 안에 이해시키기", questions:["무엇을 만들었는가?","누구를 위한 것인가?","내 역할과 기간은 무엇인가?"], template:"[Product] is a [type of product] for [audience]. I worked as [role] over [period], focusing on [scope].", example:"Relay is a mobile scheduling tool for nurses. I worked as the product designer for eight weeks, focusing on shift swaps and manager approval." },
  { id:"context", label:"Context", purpose:"왜 이 작업이 필요했는지 설명하기", questions:["어떤 사업·사용자 상황이 있었는가?","기존 방식의 한계는 무엇이었는가?","왜 지금 해결해야 했는가?"], template:"[Audience] relied on [existing behavior], which led to [observable problem]. This mattered because [consequence].", example:"Nurses relied on group chats to exchange shifts, which led to missed requests and duplicate staffing. This mattered because managers spent hours resolving avoidable conflicts." },
  { id:"problem", label:"Problem", purpose:"관찰과 해석을 구분해 문제 정의하기", questions:["무엇을 직접 관찰했는가?","그 원인은 무엇이라고 판단했는가?","어떤 문제는 범위에서 제외했는가?"], template:"We observed [evidence]. This suggested that [insight], rather than [initial assumption], was the main barrier.", example:"We observed that most failed swaps lacked manager visibility. This suggested that unclear ownership, rather than low demand, was the main barrier." },
  { id:"goal", label:"Goal & constraints", purpose:"성공 기준과 현실적 제약 명시하기", questions:["무엇이 개선되면 성공인가?","시간·기술·정책 제약은 무엇인가?","무엇을 의도적으로 하지 않았는가?"], template:"Our goal was to [outcome], measured by [signal]. We had to work within [constraints], so we excluded [out of scope].", example:"Our goal was to reduce unresolved swap requests, measured by completion rate and time to approval. We had to use the existing scheduling system, so payroll changes were out of scope." },
  { id:"process", label:"Process", purpose:"활동 목록 대신 판단의 흐름 보여주기", questions:["어떤 선택지를 비교했는가?","무엇을 근거로 결정했는가?","중간에 무엇을 바꿨는가?"], template:"I explored [options]. Because [evidence or constraint], I chose [decision] and rejected [alternative].", example:"I explored direct swaps, an open marketplace, and manager-assigned coverage. Because interviews showed that accountability mattered most, I chose a request-and-approval model." },
  { id:"solution", label:"Solution", purpose:"화면이 아니라 해결 원리 설명하기", questions:["핵심 상호작용은 무엇인가?","각 결정이 어떤 문제를 해결하는가?","예외 상황은 어떻게 처리하는가?"], template:"The solution enables [audience] to [action] by [mechanism]. [Feature] addresses [specific problem] by [design decision].", example:"The solution enables nurses to request and confirm swaps in one shared flow. A visible approval state addresses uncertainty by showing who must act next." },
  { id:"outcome", label:"Outcome", purpose:"결과와 인과관계의 강도를 정직하게 쓰기", questions:["어떤 수치·행동·피드백이 달라졌는가?","무엇까지 내 작업의 영향이라 말할 수 있는가?","검증하지 못한 것은 무엇인가?"], template:"After [release or test], [metric or behavior] changed from [before] to [after]. The evidence indicates [bounded conclusion], although [limitation].", example:"In usability testing, successful swap completion increased from 4 of 8 to 7 of 8 participants. This indicates that the revised flow reduced confusion, although production impact has not yet been measured." },
  { id:"reflection", label:"Reflection", purpose:"배운 점을 다음 행동으로 연결하기", questions:["무엇이 예상과 달랐는가?","다시 한다면 무엇을 바꿀 것인가?","다음 검증은 무엇인가?"], template:"I learned that [specific lesson]. If I continued the project, I would [next action] to test [remaining uncertainty].", example:"I learned that ownership cues mattered more than adding communication features. Next, I would test the flow across multiple departments to evaluate cross-team scheduling." },
];

export const phraseGroups = [
  ["문제와 근거",[
    ["We observed that…","직접 확인한 행동·사실을 제시"],["Research indicated that…","조사 결과가 시사한 내용을 제시"],["The recurring pattern was…","반복적으로 발견된 패턴을 요약"],["The primary barrier was not A, but B.","초기 가정과 실제 원인을 대비"],["This created friction when…","문제가 발생하는 구체적 순간 설명"],["The evidence was limited to…","근거의 범위를 명시"],
  ]],
  ["결정과 근거",[
    ["Based on these findings, I…","조사 결과와 결정을 연결"],["I prioritized A over B because…","우선순위와 trade-off 설명"],["I considered three approaches…","검토한 선택지의 폭을 제시"],["I ruled out this option because…","선택하지 않은 이유 설명"],["The constraint led us to…","제약이 결정에 미친 영향 설명"],["This decision reduced…, while preserving…","얻은 것과 유지한 것을 함께 설명"],
  ]],
  ["협업과 기여",[
    ["I led…, in collaboration with…","내 역할과 협업자를 동시에 명시"],["My contribution focused on…","개인 기여 범위를 한정"],["I aligned with engineering on…","개발과 합의한 구체적 대상 제시"],["We disagreed on…, so I…","의견 충돌과 해결 과정 설명"],["To make the decision visible, I…","의사결정 공유 방식 설명"],["The team agreed to… after…","합의가 만들어진 근거 설명"],
  ]],
  ["결과와 한계",[
    ["The change resulted in…","관찰된 결과 제시"],["We saw an increase from A to B.","전후 수치 비교"],["Participants were able to…","테스트에서 확인한 행동 제시"],["This suggests that…, but does not prove…","해석의 한계 명시"],["Because the feature has not launched…","출시 전 결과의 한계 설명"],["A remaining risk is…","아직 해결되지 않은 위험 제시"],
  ]],
  ["회고와 다음 단계",[
    ["In retrospect, I would…","구체적인 개선 행동 제시"],["The most important lesson was…","핵심 학습 한 가지를 명시"],["My initial assumption changed when…","생각이 바뀐 계기 설명"],["The next experiment should test…","다음 검증 질문 제시"],["I would involve… earlier to…","협업 방식의 개선점 제시"],["This project changed how I…","이후 작업 방식에 미친 영향 설명"],
  ]],
];

export const weakWriting = [
  ["I was responsible for the UX/UI.","I led the checkout flow redesign and partnered with two engineers on interaction feasibility."],
  ["Users found the app difficult to use.","Five of eight participants could not find the cancellation policy before payment."],
  ["We brainstormed many ideas.","I compared three navigation models against findability, implementation effort, and accessibility."],
  ["The redesign was successful.","Task completion increased from 58% to 84% in the second usability round."],
  ["I created wireframes and prototypes.","I used a low-fidelity prototype to test whether users understood the new approval sequence before visual design began."],
  ["Users loved the new design.","Six participants described the status labels as clear; two still confused ‘pending’ with ‘scheduled.’"],
];

export const editingChecklist = [
  "첫 화면에서 제품, 대상, 역할, 기간을 알 수 있다.",
  "문제 진술에 관찰 가능한 근거가 포함되어 있다.",
  "프로세스가 산출물 목록이 아니라 결정의 흐름으로 작성되어 있다.",
  "‘we’와 ‘I’를 구분해 팀 성과와 개인 기여가 명확하다.",
  "각 주요 화면에 해당 결정이 해결하는 문제가 적혀 있다.",
  "결과 수치에 기준점, 표본, 기간 또는 측정 조건이 있다.",
  "출시 전 검증을 실제 사업 성과처럼 과장하지 않는다.",
  "실패, 제약, 제외 범위 중 최소 하나가 드러난다.",
  "회고가 막연한 감상이 아니라 다음 검증 행동으로 끝난다.",
  "문장을 소리 내 읽었을 때 불필요한 전문용어와 긴 문장이 없다.",
];
