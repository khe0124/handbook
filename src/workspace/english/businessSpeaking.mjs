const expand = (situations, patterns) => patterns.flatMap(pattern =>
  situations.map(situation => [pattern.en(situation[0]), pattern.ko(situation[1])]),
);

const meetingTopics = [
  ["the launch plan","출시 계획"],["this quarter's priorities","이번 분기 우선순위"],["the customer feedback","고객 피드백"],["the budget proposal","예산안"],["the hiring plan","채용 계획"],
  ["the project timeline","프로젝트 일정"],["the design review","디자인 리뷰"],["the sales forecast","매출 전망"],["the process change","프로세스 변경"],["the open action items","남은 실행 항목"],
];
const meetingPatterns = [
  {en:x=>`Let's start with ${x}.`,ko:x=>`${x}부터 시작하겠습니다.`},{en:x=>`The main purpose of today's discussion is ${x}.`,ko:x=>`오늘 논의의 주된 목적은 ${x}입니다.`},{en:x=>`I'd like to hear everyone's thoughts on ${x}.`,ko:x=>`${x}에 관한 모두의 의견을 듣고 싶습니다.`},{en:x=>`Let's spend the next ten minutes on ${x}.`,ko:x=>`다음 10분 동안 ${x}을 논의하겠습니다.`},{en:x=>`Before we move on, is there anything else about ${x}?`,ko:x=>`다음으로 넘어가기 전에 ${x}에 관해 더 이야기할 내용이 있나요?`},
  {en:x=>`Can we make a decision on ${x} today?`,ko:x=>`오늘 ${x}에 관한 결정을 내릴 수 있을까요?`},{en:x=>`Let's park ${x} for now and return to it later.`,ko:x=>`${x}은 잠시 보류하고 나중에 다시 다루겠습니다.`},{en:x=>`Who would like to lead the discussion on ${x}?`,ko:x=>`누가 ${x}에 관한 논의를 이끌어 주시겠어요?`},{en:x=>`To summarize, we have aligned on ${x}.`,ko:x=>`정리하면 ${x}에 관해 합의했습니다.`},{en:x=>`I'll capture the next steps for ${x}.`,ko:x=>`${x}의 다음 단계를 제가 정리하겠습니다.`},
];

const scheduleItems = [
  ["the kickoff meeting","킥오프 회의"],["our weekly check-in","주간 점검 회의"],["the client presentation","고객 발표"],["the final review","최종 검토"],["the project handoff","프로젝트 인계"],
  ["the interview panel","면접 패널"],["the planning workshop","기획 워크숍"],["the product demo","제품 데모"],["the one-on-one","일대일 면담"],["the retrospective","회고 회의"],
];
const schedulePatterns = [
  {en:x=>`Can we schedule ${x} for Tuesday?`,ko:x=>`${x}을 화요일로 잡을 수 있을까요?`},{en:x=>`What time works best for ${x}?`,ko:x=>`${x}은 몇 시가 가장 좋으세요?`},{en:x=>`I'd like to move ${x} to Thursday afternoon.`,ko:x=>`${x}을 목요일 오후로 옮기고 싶습니다.`},{en:x=>`Could we push ${x} back by thirty minutes?`,ko:x=>`${x}을 30분 늦출 수 있을까요?`},{en:x=>`We may need to reschedule ${x}.`,ko:x=>`${x} 일정을 다시 잡아야 할 수도 있습니다.`},
  {en:x=>`I'll send a calendar invite for ${x}.`,ko:x=>`${x} 캘린더 초대를 보내겠습니다.`},{en:x=>`Please let me know if you cannot attend ${x}.`,ko:x=>`${x}에 참석할 수 없다면 알려 주세요.`},{en:x=>`Can we keep ${x} to forty-five minutes?`,ko:x=>`${x}을 45분 안에 마칠 수 있을까요?`},{en:x=>`Let's confirm the attendees for ${x}.`,ko:x=>`${x} 참석자를 확정하겠습니다.`},{en:x=>`I'll share the agenda before ${x}.`,ko:x=>`${x} 전에 안건을 공유하겠습니다.`},
];

const alignmentItems = [
  ["the success criteria","성공 기준"],["the scope of this release","이번 출시 범위"],["the customer's request","고객 요청"],["the technical constraint","기술적 제약"],["the approval process","승인 절차"],
  ["the ownership model","담당 체계"],["the proposed solution","제안된 해결책"],["the reporting requirement","보고 요건"],["the priority order","우선순위"],["the definition of done","완료 기준"],
];
const alignmentPatterns = [
  {en:x=>`Could you clarify ${x}?`,ko:x=>`${x}을 명확히 설명해 주시겠어요?`},{en:x=>`How are you defining ${x}?`,ko:x=>`${x}을 어떻게 정의하고 계신가요?`},{en:x=>`My understanding of ${x} is slightly different.`,ko:x=>`제가 이해한 ${x}은 조금 다릅니다.`},{en:x=>`Let me make sure I understand ${x} correctly.`,ko:x=>`${x}을 제대로 이해했는지 확인하겠습니다.`},{en:x=>`Are we aligned on ${x}?`,ko:x=>`${x}에 관해 서로 이해가 일치하나요?`},
  {en:x=>`What assumptions are we making about ${x}?`,ko:x=>`${x}에 관해 어떤 가정을 하고 있나요?`},{en:x=>`Can you give me an example of ${x}?`,ko:x=>`${x}의 예를 들어 주실 수 있나요?`},{en:x=>`I have one concern about ${x}.`,ko:x=>`${x}에 관해 한 가지 우려가 있습니다.`},{en:x=>`Let's document our decision on ${x}.`,ko:x=>`${x}에 관한 결정을 문서화합시다.`},{en:x=>`We should revisit ${x} once we have more data.`,ko:x=>`데이터가 더 모이면 ${x}을 다시 검토해야 합니다.`},
];

const presentationItems = [
  ["monthly active users","월간 활성 사용자 수"],["the conversion rate","전환율"],["customer retention","고객 유지율"],["average response time","평균 응답 시간"],["the error rate","오류율"],
  ["revenue growth","매출 성장률"],["support volume","고객 지원 문의량"],["employee engagement","직원 참여도"],["delivery time","납기"],["customer satisfaction","고객 만족도"],
];
const presentationPatterns = [
  {en:x=>`This chart shows the trend in ${x}.`,ko:x=>`이 차트는 ${x}의 추세를 보여 줍니다.`},{en:x=>`The key takeaway is the change in ${x}.`,ko:x=>`핵심은 ${x}의 변화입니다.`},{en:x=>`We saw a meaningful improvement in ${x}.`,ko:x=>`${x}이 유의미하게 개선되었습니다.`},{en:x=>`There was a temporary decline in ${x}.`,ko:x=>`${x}이 일시적으로 하락했습니다.`},{en:x=>`The data for ${x} is still preliminary.`,ko:x=>`${x} 데이터는 아직 잠정치입니다.`},
  {en:x=>`Let me put ${x} into context.`,ko:x=>`${x}의 배경을 설명하겠습니다.`},{en:x=>`The change in ${x} was driven mainly by two factors.`,ko:x=>`${x}의 변화는 주로 두 가지 요인에서 비롯되었습니다.`},{en:x=>`We should not draw a firm conclusion from ${x} yet.`,ko:x=>`${x}만으로 아직 확정적인 결론을 내려서는 안 됩니다.`},{en:x=>`I'll walk you through the details behind ${x}.`,ko:x=>`${x}의 세부 내용을 차례로 설명하겠습니다.`},{en:x=>`I'm happy to take questions about ${x}.`,ko:x=>`${x}에 관한 질문을 받겠습니다.`},
];

const projectItems = [
  ["the API integration","API 연동"],["the research plan","리서치 계획"],["the landing page","랜딩 페이지"],["the migration work","마이그레이션 작업"],["the pricing analysis","가격 분석"],
  ["the onboarding flow","온보딩 흐름"],["the test plan","테스트 계획"],["the vendor assessment","공급업체 평가"],["the content update","콘텐츠 업데이트"],["the release checklist","출시 체크리스트"],
];
const projectPatterns = [
  {en:x=>`I'm currently working on ${x}.`,ko:x=>`현재 ${x}을 진행하고 있습니다.`},{en:x=>`${x[0].toUpperCase()+x.slice(1)} is on track for Friday.`,ko:x=>`${x}은 금요일 일정에 맞춰 진행 중입니다.`},{en:x=>`We've completed the first phase of ${x}.`,ko:x=>`${x}의 첫 단계를 완료했습니다.`},{en:x=>`We're waiting on approval for ${x}.`,ko:x=>`${x}의 승인을 기다리고 있습니다.`},{en:x=>`I need additional input before I can finish ${x}.`,ko:x=>`${x}을 완료하려면 추가 정보가 필요합니다.`},
  {en:x=>`The main blocker for ${x} is access to the data.`,ko:x=>`${x}의 주요 장애물은 데이터 접근 권한입니다.`},{en:x=>`I'll take ownership of ${x}.`,ko:x=>`${x}은 제가 맡겠습니다.`},{en:x=>`Could you review ${x} by end of day?`,ko:x=>`오늘 업무 종료 전까지 ${x}을 검토해 주시겠어요?`},{en:x=>`Let's break ${x} into smaller tasks.`,ko:x=>`${x}을 더 작은 작업으로 나눕시다.`},{en:x=>`I'll send an update on ${x} tomorrow morning.`,ko:x=>`내일 아침 ${x}의 진행 상황을 공유하겠습니다.`},
];

const feedbackItems = [
  ["the opening section","도입부"],["the visual hierarchy","시각적 위계"],["the proposed workflow","제안된 업무 흐름"],["the error message","오류 메시지"],["the presentation deck","발표 자료"],
  ["the project brief","프로젝트 브리프"],["the navigation structure","탐색 구조"],["the research summary","리서치 요약"],["the implementation plan","구현 계획"],["the final recommendation","최종 제안"],
];
const feedbackPatterns = [
  {en:x=>`I think ${x} is clear and well structured.`,ko:x=>`${x}이 명확하고 구조가 좋다고 생각합니다.`},{en:x=>`One thing that works well is ${x}.`,ko:x=>`잘된 부분 중 하나는 ${x}입니다.`},{en:x=>`I have a suggestion for ${x}.`,ko:x=>`${x}에 관해 제안이 하나 있습니다.`},{en:x=>`Could we simplify ${x}?`,ko:x=>`${x}을 더 단순하게 만들 수 있을까요?`},{en:x=>`I'm not sure ${x} addresses the main problem yet.`,ko:x=>`${x}이 아직 핵심 문제를 해결하는지는 확신이 없습니다.`},
  {en:x=>`What feedback would be most useful on ${x}?`,ko:x=>`${x}에 관해 어떤 피드백이 가장 도움이 될까요?`},{en:x=>`I'd like a second opinion on ${x}.`,ko:x=>`${x}에 관해 다른 의견을 듣고 싶습니다.`},{en:x=>`Let's test ${x} before we finalize it.`,ko:x=>`${x}을 확정하기 전에 테스트합시다.`},{en:x=>`Thanks for being specific about ${x}.`,ko:x=>`${x}에 관해 구체적으로 말해 주셔서 감사합니다.`},{en:x=>`I'll revise ${x} based on your feedback.`,ko:x=>`피드백을 반영해 ${x}을 수정하겠습니다.`},
];

const riskItems = [
  ["the delayed dependency","지연된 선행 작업"],["the security review","보안 검토"],["the staffing gap","인력 공백"],["the unclear requirement","불명확한 요구사항"],["the vendor delay","공급업체 지연"],
  ["the data quality issue","데이터 품질 문제"],["the budget constraint","예산 제약"],["the performance regression","성능 저하"],["the legal review","법무 검토"],["the adoption risk","도입 위험"],
];
const riskPatterns = [
  {en:x=>`We need to flag ${x} as a risk.`,ko:x=>`${x}을 위험 요소로 표시해야 합니다.`},{en:x=>`The immediate issue is ${x}.`,ko:x=>`당장의 문제는 ${x}입니다.`},{en:x=>`How likely is ${x} to affect the deadline?`,ko:x=>`${x}이 마감일에 영향을 줄 가능성이 얼마나 되나요?`},{en:x=>`We have a mitigation plan for ${x}.`,ko:x=>`${x}에 대한 완화 계획이 있습니다.`},{en:x=>`Who should we escalate ${x} to?`,ko:x=>`${x}을 누구에게 상향 보고해야 할까요?`},
  {en:x=>`Let's separate the facts from our assumptions about ${x}.`,ko:x=>`${x}에 관한 사실과 가정을 구분합시다.`},{en:x=>`We can proceed, but we need to monitor ${x}.`,ko:x=>`진행할 수는 있지만 ${x}을 계속 관찰해야 합니다.`},{en:x=>`What is the worst-case impact of ${x}?`,ko:x=>`${x}의 최악의 영향은 무엇인가요?`},{en:x=>`I recommend addressing ${x} before launch.`,ko:x=>`출시 전에 ${x}을 해결하는 것이 좋겠습니다.`},{en:x=>`Let's agree on a contingency plan for ${x}.`,ko:x=>`${x}에 관한 비상 계획에 합의합시다.`},
];

const clientItems = [
  ["the revised scope","수정된 범위"],["the payment terms","결제 조건"],["the delivery schedule","납품 일정"],["the change request","변경 요청"],["the service level","서비스 수준"],
  ["the contract renewal","계약 갱신"],["the proposed fee","제안 금액"],["the support plan","지원 계획"],["the acceptance criteria","인수 기준"],["the implementation approach","구현 방식"],
];
const clientPatterns = [
  {en:x=>`I'd like to confirm ${x}.`,ko:x=>`${x}을 확인하고 싶습니다.`},{en:x=>`Could you share your expectations for ${x}?`,ko:x=>`${x}에 관해 기대하시는 바를 알려 주시겠어요?`},{en:x=>`We can accommodate ${x} with one adjustment.`,ko:x=>`한 가지 조정을 통해 ${x}을 반영할 수 있습니다.`},{en:x=>`I'm afraid ${x} is outside the current agreement.`,ko:x=>`죄송하지만 ${x}은 현재 계약 범위를 벗어납니다.`},{en:x=>`Let's find a middle ground on ${x}.`,ko:x=>`${x}에 관해 절충점을 찾아봅시다.`},
  {en:x=>`What flexibility do you have on ${x}?`,ko:x=>`${x}에 관해 어느 정도 조정이 가능하신가요?`},{en:x=>`Our proposal for ${x} is based on the current scope.`,ko:x=>`${x}에 관한 저희 제안은 현재 범위를 기준으로 합니다.`},{en:x=>`We need written approval for ${x}.`,ko:x=>`${x}에 대한 서면 승인이 필요합니다.`},{en:x=>`I'll send a summary of ${x} after this call.`,ko:x=>`통화 후 ${x}의 요약을 보내겠습니다.`},{en:x=>`Please let us know if you have concerns about ${x}.`,ko:x=>`${x}에 관해 우려가 있다면 알려 주세요.`},
];

const asyncItems = [
  ["the decision log","의사결정 기록"],["the meeting notes","회의록"],["the project channel","프로젝트 채널"],["the shared document","공유 문서"],["the weekly update","주간 업데이트"],
  ["the recorded demo","녹화된 데모"],["the handoff document","인계 문서"],["the issue tracker","이슈 추적기"],["the team dashboard","팀 대시보드"],["the follow-up email","후속 이메일"],
];
const asyncPatterns = [
  {en:x=>`I'll post the details in ${x}.`,ko:x=>`세부 내용을 ${x}에 올리겠습니다.`},{en:x=>`Please add your comments to ${x}.`,ko:x=>`${x}에 의견을 추가해 주세요.`},{en:x=>`The latest status is available in ${x}.`,ko:x=>`최신 진행 상황은 ${x}에서 확인할 수 있습니다.`},{en:x=>`I'll tag you in ${x}.`,ko:x=>`${x}에서 태그하겠습니다.`},{en:x=>`Let's use ${x} as the single source of truth.`,ko:x=>`${x}을 단일 기준 자료로 사용합시다.`},
  {en:x=>`Could you update ${x} before you log off?`,ko:x=>`업무를 마치기 전에 ${x}을 업데이트해 주시겠어요?`},{en:x=>`I may respond asynchronously through ${x}.`,ko:x=>`${x}을 통해 비동기로 답변드릴 수 있습니다.`},{en:x=>`We can cancel the meeting if ${x} is sufficient.`,ko:x=>`${x}만으로 충분하다면 회의를 취소할 수 있습니다.`},{en:x=>`Please acknowledge that you've seen ${x}.`,ko:x=>`${x}을 확인했다는 표시를 남겨 주세요.`},{en:x=>`I'll summarize the final decision in ${x}.`,ko:x=>`최종 결정을 ${x}에 정리하겠습니다.`},
];

const careerItems = [
  ["product strategy","제품 전략"],["cross-functional collaboration","직군 간 협업"],["design systems","디자인 시스템"],["data analysis","데이터 분석"],["project leadership","프로젝트 리더십"],
  ["customer research","고객 리서치"],["process improvement","프로세스 개선"],["technical communication","기술 커뮤니케이션"],["stakeholder management","이해관계자 관리"],["team mentoring","팀원 멘토링"],
];
const careerPatterns = [
  {en:x=>`My experience in ${x} is directly relevant to this role.`,ko:x=>`${x} 경험은 이 역할과 직접적으로 관련됩니다.`},{en:x=>`One project that demonstrates my strength in ${x} is…`,ko:x=>`${x} 역량을 보여 주는 프로젝트 중 하나는…`},{en:x=>`I'd like to learn more about how your team approaches ${x}.`,ko:x=>`귀사 팀이 ${x}에 어떻게 접근하는지 더 알고 싶습니다.`},{en:x=>`What does success in ${x} look like on this team?`,ko:x=>`이 팀에서 성공적인 ${x}은 어떤 모습인가요?`},{en:x=>`I developed my skills in ${x} by…`,ko:x=>`저는 …을 통해 ${x} 역량을 키웠습니다.`},
  {en:x=>`The most challenging part of ${x} was…`,ko:x=>`${x}에서 가장 어려웠던 부분은…`},{en:x=>`My approach to ${x} starts with…`,ko:x=>`${x}에 대한 제 접근 방식은 …에서 시작합니다.`},{en:x=>`I received feedback that improved my work in ${x}.`,ko:x=>`${x} 업무를 개선하는 데 도움이 된 피드백을 받았습니다.`},{en:x=>`I'm looking for a role where I can deepen my experience in ${x}.`,ko:x=>`${x} 경험을 더 깊게 쌓을 수 있는 역할을 찾고 있습니다.`},{en:x=>`Could you tell me about the team's current priorities in ${x}?`,ko:x=>`${x}에 관한 팀의 현재 우선순위를 말씀해 주시겠어요?`},
];

export const businessSpeakingGroups = [
  ["회의 진행과 퍼실리테이션",expand(meetingTopics,meetingPatterns)],
  ["일정 조율과 회의 준비",expand(scheduleItems,schedulePatterns)],
  ["확인·질문·의견 정렬",expand(alignmentItems,alignmentPatterns)],
  ["발표·수치·데이터 설명",expand(presentationItems,presentationPatterns)],
  ["프로젝트 진행과 업무 담당",expand(projectItems,projectPatterns)],
  ["피드백과 리뷰",expand(feedbackItems,feedbackPatterns)],
  ["문제·리스크·에스컬레이션",expand(riskItems,riskPatterns)],
  ["고객·협상·계약 범위",expand(clientItems,clientPatterns)],
  ["원격 근무와 비동기 협업",expand(asyncItems,asyncPatterns)],
  ["면접·커리어·네트워킹",expand(careerItems,careerPatterns)],
];
