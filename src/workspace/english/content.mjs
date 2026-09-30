export { greWords } from "./greWords.mjs";
import { businessSpeakingGroups } from "./businessSpeaking.mjs";

const subjects = ["Mina","Daniel","The team","My neighbor","A careful reader","Every applicant","The committee","Our instructor","The researcher","The editor","The new manager"];
const actions = ["review the evidence","prepare the report","call the client","take a short break","check the schedule","revise the proposal","learn from the mistake","keep a written record","ask a better question","share the results","arrive before noon"];
const asGerund = action => {
  const [verb, ...rest] = action.split(" ");
  const irregular = { take:"taking", make:"making", arrive:"arriving", keep:"keeping", run:"running" };
  return `${irregular[verb] || (verb.endsWith("e") ? `${verb.slice(0,-1)}ing` : `${verb}ing`)} ${rest.join(" ")}`.trim();
};
const asPastParticiple = action => {
  const [verb, ...rest] = action.split(" ");
  const irregular = { keep:"kept", learn:"learned", take:"taken", arrive:"arrived" };
  const past = irregular[verb] || (verb.endsWith("e") ? `${verb}d` : `${verb}ed`);
  return `${past} ${rest.join(" ")}`.trim();
};
const asSimplePast = action => {
  const [verb, ...rest] = action.split(" ");
  const irregular = { keep:"kept", learn:"learned", take:"took", arrive:"arrived" };
  const past = irregular[verb] || (verb.endsWith("e") ? `${verb}d` : `${verb}ed`);
  return `${past} ${rest.join(" ")}`.trim();
};
const asEmbeddedSubject = subject => /^[A-Z][a-z]+$/.test(subject)
  ? subject
  : `${subject[0].toLowerCase()}${subject.slice(1)}`;
const asPossessiveSubject = subject => `${asEmbeddedSubject(subject)}${subject.endsWith("s") ? "'" : "'s"}`;
const coreGrammarPatterns = [
  ["현재 단순",(s,a)=>`${s} makes time to ${a} every week.`],["현재 진행",(s,a)=>`${s} is ${asGerund(a)} right now.`],["과거 단순",(s,a)=>`Yesterday, ${asEmbeddedSubject(s)} decided to ${a}.`],["과거 진행",(s,a)=>`${s} was preparing to ${a} when the phone rang.`],["현재완료",(s,a)=>`${s} has already learned how to ${a}.`],["현재완료진행",(s,a)=>`${s} has been trying to ${a} since Monday.`],["과거완료",(s,a)=>`${s} had managed to ${a} before the deadline.`],["미래 will",(s,a)=>`${s} will ${a} tomorrow.`],["be going to",(s,a)=>`${s} is going to ${a} after lunch.`],["미래진행",(s,a)=>`At this time tomorrow, ${asEmbeddedSubject(s)} will be ${asGerund(a)}.`],
  ["조동사 can",(s,a)=>`${s} can ${a} without help.`],["조동사 may",(s,a)=>`${s} may ${a} if necessary.`],["조동사 must",(s,a)=>`${s} must ${a} before leaving.`],["should",(s,a)=>`${s} should ${a} more carefully.`],["의무 have to",(s,a)=>`${s} has to ${a} by Friday.`],["부정문",(s,a)=>`${s} does not need to ${a} today.`],["일반 의문문",(s,a)=>`Does ${asEmbeddedSubject(s)} need to ${a}?`],["의문사",(s,a)=>`Why did ${asEmbeddedSubject(s)} choose to ${a}?`],["명령문",(_s,a)=>`Please ${a} before you continue.`],["감탄문",()=>`What a relief it is to know that the report is finished!`],
  ["1형식",s=>`${s} waited patiently.`],["2형식",s=>`${s} remained remarkably calm.`],["3형식",(s,a)=>`${s} promised to ${a}.`],["4형식",s=>`${s} gave the supervisor a concise update.`],["5형식",s=>`${s} found the instructions surprisingly clear.`],["수동태",(s,a)=>`The request was made so that ${asEmbeddedSubject(s)} could ${a}.`],["사역동사",(s,a)=>`The manager had ${asEmbeddedSubject(s)} ${a}.`],["지각동사",(s,a)=>`I saw ${asEmbeddedSubject(s)} begin to ${a}.`],["to부정사",(_s,a)=>`To ${a} requires patience.`],["동명사",(_s,a)=>`${asGerund(a)[0].toUpperCase()+asGerund(a).slice(1)} is worth the effort.`],
  ["분사구문",(s,a)=>`Having checked the facts, ${asEmbeddedSubject(s)} began to ${a}.`],["관계대명사",(s,a)=>`${s}, who had promised to ${a}, arrived early.`],["관계부사",(s,a)=>`This is the place where ${asEmbeddedSubject(s)} can ${a}.`],["명사절 that",(s,a)=>`It is clear that ${asEmbeddedSubject(s)} should ${a}.`],["whether절",(s,a)=>`We discussed whether ${asEmbeddedSubject(s)} should ${a}.`],["간접의문문",(s,a)=>`I wonder why ${asEmbeddedSubject(s)} refused to ${a}.`],["조건문 0",(s,a)=>`If accurate results matter, ${asEmbeddedSubject(s)} must ${a}.`],["조건문 1",(s,a)=>`If there is enough time, ${asEmbeddedSubject(s)} will ${a}.`],["가정법 과거",(s,a)=>`If there were more time, ${asEmbeddedSubject(s)} would ${a}.`],["가정법 과거완료",(s,a)=>`If the news had arrived earlier, ${asEmbeddedSubject(s)} would have tried to ${a}.`],
  ["양보 although",(s,a)=>`Although ${asEmbeddedSubject(s)} was tired, they continued to ${a}.`],["이유 because",(s,a)=>`${s} chose to ${a} because the deadline was approaching.`],["목적 so that",(s,a)=>`${s} took notes so that everyone could ${a}.`],["결과 so...that",(s,a)=>`${s} was so well prepared that it was easy to ${a}.`],["비교급",(s,a)=>`It is easier for ${asEmbeddedSubject(s)} to ${a} now than before.`],["최상급",(s,a)=>`This is the best way for ${asEmbeddedSubject(s)} to ${a}.`],["as...as",(s,a)=>`${s} can ${a} as quickly as the others.`],["도치",(s,a)=>`Only then did ${asEmbeddedSubject(s)} begin to ${a}.`],["강조구문",(s,a)=>`It was yesterday that ${asEmbeddedSubject(s)} decided to ${a}.`],["가주어 it",(s,a)=>`It is important for ${asEmbeddedSubject(s)} to ${a}.`],
  ["병렬",(s,a)=>`${s} likes to plan carefully, work steadily, and ${a}.`],["상관접속사",(s,a)=>`${s} will either ${a} or explain the delay.`],["not only...but also",(s,a)=>`${s} not only agreed to ${a} but also offered help.`],["부가의문문",(s,a)=>`${s} can ${a}, can't they?`],["간접화법",(s,a)=>`${s} said that they would ${a} the next day.`],["완료 수동",(s,a)=>`The materials have been prepared so that ${asEmbeddedSubject(s)} can ${a}.`],["미래완료",(s,a)=>`By next week, ${asEmbeddedSubject(s)} will have ${asPastParticiple(a)}.`],["used to",(s,a)=>`${s} used to ${a} every morning.`],["would rather",(s,a)=>`${s} would rather ${a} than wait.`],["wish",(s,a)=>`${s} wishes there were more time to ${a}.`]
];

const extendedGrammarPatterns = [
  ["과거완료진행",(s,a)=>`${s} had been trying to ${a} for weeks before the decision was made.`],
  ["미래완료진행",(s,a)=>`By Friday, ${asEmbeddedSubject(s)} will have been ${asGerund(a)} for a month.`],
  ["현재진행의 미래",(s,a)=>`${s} is meeting the director tomorrow to ${a}.`],
  ["현재단순의 예정",(_s,a)=>`The session begins at nine, after which we can ${a}.`],
  ["was going to",(s,a)=>`${s} was going to ${a}, but the plan changed.`],
  ["be about to",(s,a)=>`${s} is about to ${a}.`],
  ["미래 관점의 과거",(s,a)=>`${s} knew that they would eventually ${a}.`],
  ["습관적 would",(s,a)=>`During the summer, ${asEmbeddedSubject(s)} would ${a} before breakfast.`],
  ["상태동사",s=>`${s} understands why the distinction matters.`],
  ["동작·상태 의미 변화",s=>`${s} is thinking about the problem, but thinks the current answer is wrong.`],

  ["could 능력",(s,a)=>`${s} could ${a} even under pressure.`],
  ["could 정중한 요청",(_s,a)=>`Could you ${a} before the meeting?`],
  ["might 가능성",(s,a)=>`${s} might ${a} later today.`],
  ["would 가정",(s,a)=>`${s} would ${a} if the conditions were right.`],
  ["shall 제안",(_s,a)=>`Shall we ${a} now?`],
  ["ought to",(s,a)=>`${s} ought to ${a} before deciding.`],
  ["had better",(s,a)=>`${s} had better ${a} before it is too late.`],
  ["needn't",(s,a)=>`${s} needn't ${a} until tomorrow.`],
  ["must have p.p.",(s,a)=>`${s} must have forgotten to ${a}.`],
  ["may have p.p.",(s,a)=>`${s} may have tried to ${a} already.`],
  ["might have p.p.",(s,a)=>`${s} might have chosen to ${a} under different circumstances.`],
  ["could have p.p.",(s,a)=>`${s} could have managed to ${a}, but did not.`],
  ["should have p.p.",(s,a)=>`${s} should have remembered to ${a}.`],
  ["needn't have p.p.",(s,a)=>`${s} needn't have rushed to ${a}.`],
  ["can't have p.p.",(s,a)=>`${s} can't have intended to ${a}.`],
  ["would have p.p.",(s,a)=>`${s} would have agreed to ${a} if asked.`],
  ["조동사 진행형",(s,a)=>`${s} may be preparing to ${a} right now.`],
  ["조동사 수동형",(s,a)=>`The team may be asked to ${a}.`],

  ["현재 수동태",(s,a)=>`${s} is regularly asked to ${a}.`],
  ["과거 수동태",(s,a)=>`${s} was asked to ${a} yesterday.`],
  ["진행 수동태",(_s,a)=>`A new procedure for ${asGerund(a)} is being developed.`],
  ["과거진행 수동태",(_s,a)=>`The proposal was being revised when the request arrived.`],
  ["과거완료 수동태",(_s,a)=>`The evidence had been reviewed before the hearing began.`],
  ["미래 수동태",(_s,a)=>`The final report will be reviewed tomorrow.`],
  ["미래완료 수동태",(_s,a)=>`The work will have been completed by noon.`],
  ["get 수동태",s=>`${s} got promoted after the annual review.`],
  ["수동태 by 행위자",s=>`The final decision was approved by ${asEmbeddedSubject(s)}.`],
  ["수동태 행위자 생략",()=>`Several errors were found, although the reviewer was not identified.`],

  ["to부정사 목적",(s,a)=>`${s} stayed late to ${a}.`],
  ["to부정사 보어",(s,a)=>`${s}'s plan is to ${a}.`],
  ["to부정사 목적격보어",(s,a)=>`The director expected ${asEmbeddedSubject(s)} to ${a}.`],
  ["의문사＋to부정사",(_s,a)=>`We have not decided when to ${a}.`],
  ["too...to",(s,a)=>`${s} was too tired to ${a}.`],
  ["enough to",(s,a)=>`${s} was patient enough to ${a}.`],
  ["완료부정사",(s,a)=>`${s} appears to have tried to ${a}.`],
  ["진행부정사",(s,a)=>`${s} seems to be preparing to ${a}.`],
  ["수동부정사",(s,a)=>`${s} expects to be asked to ${a}.`],
  ["원형부정사 make",(s,a)=>`The unexpected delay made ${asEmbeddedSubject(s)} ${a}.`],
  ["원형부정사 let",(s,a)=>`The supervisor let ${asEmbeddedSubject(s)} ${a}.`],
  ["help＋목적어＋동사원형",(s,a)=>`Clear instructions helped ${asEmbeddedSubject(s)} ${a}.`],
  ["동명사 주어",(_s,a)=>`${asGerund(a)[0].toUpperCase()+asGerund(a).slice(1)} takes patience.`],
  ["동명사 목적어",(s,a)=>`${s} considered ${asGerund(a)} before responding.`],
  ["동명사 전치사 목적어",(s,a)=>`${s} succeeded by ${asGerund(a)} carefully.`],
  ["동명사 의미상 주어",(s,a)=>`Everyone appreciated ${asPossessiveSubject(s)} willingness to ${a}.`],
  ["완료동명사",(s,a)=>`${s} regretted having failed to ${a}.`],
  ["수동동명사",(s,a)=>`${s} disliked being asked to ${a} without notice.`],
  ["stop to do / doing",(s,a)=>`${s} stopped ${asGerund(a)} to answer the phone.`],
  ["remember to do / doing",(s,a)=>`${s} remembered to ${a} but did not remember discussing it.`],
  ["현재분사 수식",(s,a)=>`The person waiting by the door is ready to ${a}.`],
  ["과거분사 수식",(_s,a)=>`The revised plan gives everyone time to ${a}.`],
  ["분사 보어",s=>`${s} found the door locked and the lights flashing.`],
  ["독립분사구문",(s,a)=>`The meeting having ended, ${asEmbeddedSubject(s)} stayed to ${a}.`],
  ["with 분사구문",(s,a)=>`With everyone watching, ${asEmbeddedSubject(s)} began to ${a}.`],

  ["제한적 who",(s,a)=>`The colleague who helped ${asEmbeddedSubject(s)} will ${a}.`],
  ["제한적 whom",(s,a)=>`The expert whom ${asEmbeddedSubject(s)} consulted agreed to ${a}.`],
  ["소유격 whose",(s,a)=>`The analyst whose report was accepted will ${a}.`],
  ["관계대명사 which",(_s,a)=>`The method which we selected allows us to ${a}.`],
  ["관계대명사 that",(s,a)=>`The document that ${asEmbeddedSubject(s)} found made it easier to ${a}.`],
  ["관계대명사 생략",(s,a)=>`The proposal ${asEmbeddedSubject(s)} submitted gave us time to ${a}.`],
  ["전치사＋관계대명사",(_s,a)=>`The framework within which we work enables us to ${a}.`],
  ["계속적 which",(s,a)=>`${s} missed the deadline, which made it harder to ${a}.`],
  ["관계부사 when",(_s,a)=>`There are times when it is wiser to ${a}.`],
  ["관계부사 why",(s,a)=>`The reason why ${asEmbeddedSubject(s)} chose to ${a} remains unclear.`],
  ["복합관계대명사",(_s,a)=>`Whoever wants to ${a} may join us.`],
  ["what 명사절",(s,a)=>`What ${asEmbeddedSubject(s)} needs is enough time to ${a}.`],
  ["동격 that절",(s,a)=>`The claim that ${asEmbeddedSubject(s)} could ${a} was disputed.`],
  ["주어 whether절",(_s,a)=>`Whether we should ${a} remains an open question.`],
  ["형식목적어 it",(s,a)=>`${s} found it difficult to ${a} without support.`],

  ["시간절 when",(s,a)=>`When the meeting ends, ${asEmbeddedSubject(s)} will ${a}.`],
  ["시간절 while",(s,a)=>`While ${asEmbeddedSubject(s)} was trying to ${a}, the situation changed.`],
  ["시간절 until",(s,a)=>`${s} waited until it was safe to ${a}.`],
  ["시간절 as soon as",(s,a)=>`${s} will ${a} as soon as the data arrives.`],
  ["장소절 wherever",(s,a)=>`${s} can ${a} wherever there is a stable connection.`],
  ["방법절 as if",s=>`${s} spoke as if they had seen the event themselves.`],
  ["비례 the 비교급",(_s,a)=>`The sooner we ${a}, the easier the next step will be.`],
  ["양보 even though",(s,a)=>`Even though the deadline was close, ${asEmbeddedSubject(s)} continued to ${a}.`],
  ["양보 even if",(s,a)=>`${s} will ${a} even if no one else agrees.`],
  ["양보 no matter",(_s,a)=>`No matter how difficult it becomes, we will ${a}.`],
  ["이유 since",(s,a)=>`Since the facts are available, ${asEmbeddedSubject(s)} can ${a}.`],
  ["이유 now that",(s,a)=>`Now that the issue is clear, ${asEmbeddedSubject(s)} can ${a}.`],
  ["목적 in order that",(s,a)=>`${s} wrote everything down in order that others might ${a}.`],
  ["결과 such...that",(s,a)=>`It was such a clear explanation that ${asEmbeddedSubject(s)} could ${a}.`],

  ["조건문 2",(s,a)=>`If ${asEmbeddedSubject(s)} knew the answer, they would ${a}.`],
  ["조건문 3",(s,a)=>`If ${asEmbeddedSubject(s)} had known the answer, they would have tried to ${a}.`],
  ["혼합가정법 과거→현재",(s,a)=>`If ${asEmbeddedSubject(s)} had prepared earlier, they would be ready to ${a} now.`],
  ["혼합가정법 현재→과거",(s,a)=>`If ${asEmbeddedSubject(s)} were more decisive, they would have chosen to ${a} yesterday.`],
  ["unless",(s,a)=>`${s} will not ${a} unless the source material is reliable.`],
  ["provided that",(s,a)=>`${s} may ${a} provided that everyone agrees.`],
  ["조건 도치 had",(s,a)=>`Had ${asEmbeddedSubject(s)} known earlier, they would have tried to ${a}.`],
  ["조건 도치 were",(s,a)=>`Were ${asEmbeddedSubject(s)} to ${a}, the result might change.`],
  ["조건 도치 should",(s,a)=>`Should ${asEmbeddedSubject(s)} decide to ${a}, please let us know.`],
  ["if only",(s,a)=>`If only ${asEmbeddedSubject(s)} had remembered to ${a}.`],
  ["it's time 가정법",(s,a)=>`It is time ${asEmbeddedSubject(s)} ${asSimplePast(a)}.`],
  ["as if 가정법",(s,a)=>`${s} talks as if they knew how to ${a}.`],
  ["명령·제안 가정법",(s,a)=>`The director recommended that ${asEmbeddedSubject(s)} ${a}.`],

  ["부정어 도치 never",(s,a)=>`Never has ${asEmbeddedSubject(s)} been more determined to ${a}.`],
  ["부정어 도치 hardly",(s,a)=>`Hardly had ${asEmbeddedSubject(s)} begun to ${a} when the alarm sounded.`],
  ["부정어 도치 no sooner",(s,a)=>`No sooner had ${asEmbeddedSubject(s)} started to ${a} than the plan changed.`],
  ["so 도치",(s,a)=>`${s} can ${a}, and so can the rest of the team.`],
  ["neither 도치",(s,a)=>`${s} cannot ${a}, and neither can the manager.`],
  ["장소·방향 도치",s=>`Into the room walked ${asEmbeddedSubject(s)}.`],
  ["do 강조",(s,a)=>`${s} does intend to ${a}.`],
  ["what 강조",(s,a)=>`What ${asEmbeddedSubject(s)} wants to do is ${a}.`],
  ["all 강조",(s,a)=>`All ${asEmbeddedSubject(s)} wants is a chance to ${a}.`],
  ["대동사 do",(s,a)=>`${s} can ${a} better than the others do.`],
  ["대용어 one",s=>`${s} rejected the first proposal and requested a clearer one.`],
  ["생략 if any",s=>`There are few errors, if any, in ${asEmbeddedSubject(s)}'s report.`],
  ["비교절 생략",(s,a)=>`${s} can ${a} faster than expected.`],
  ["병렬 생략",(s,a)=>`${s} chose to ${a}, and the manager to wait.`],

  ["주어·동사 일치 each",s=>`Each of the proposals ${asEmbeddedSubject(s)} reviewed has merit.`],
  ["주어·동사 일치 either",_s=>`Either the manager or the assistants are attending the meeting.`],
  ["주어·동사 일치 수량",_s=>`A number of concerns remain, but the number is decreasing.`],
  ["집합명사 일치",_s=>`The committee has reached its decision.`],
  ["there 존재구문",_s=>`There are several reasons to reconsider the plan.`],
  ["가산·불가산 명사",_s=>`We need fewer documents but less unnecessary information.`],
  ["관사 a / the",_s=>`A researcher entered the room, and the researcher sat by the window.`],
  ["무관사",_s=>`Information travels quickly, but reliable information takes time to verify.`],
  ["some / any",_s=>`We have some evidence, but we do not have any witnesses.`],
  ["few / a few",_s=>`Few applicants objected, and a few offered alternatives.`],
  ["little / a little",_s=>`There is little time to spare, but a little flexibility remains.`],
  ["each / every",_s=>`Each participant received a card, and every card had a number.`],
  ["both / either / neither",_s=>`Both plans are feasible, but neither is inexpensive, so either requires approval.`],
  ["재귀대명사",s=>`${s} completed the work by themselves.`],
  ["가주어 there vs it",_s=>`There is a problem, and it is important to address it.`],

  ["직접화법",(s,a)=>`${s} said, “I will ${a} tomorrow.”`],
  ["간접화법 시제일치",(s,a)=>`${s} said that they had tried to ${a} the day before.`],
  ["간접의문문 yes/no",(s,a)=>`The manager asked whether ${asEmbeddedSubject(s)} could ${a}.`],
  ["간접의문문 wh",(s,a)=>`The manager asked why ${asEmbeddedSubject(s)} had refused to ${a}.`],
  ["간접명령문",(s,a)=>`The manager told ${asEmbeddedSubject(s)} to ${a}.`],
  ["간접요청문",(s,a)=>`The manager asked ${asEmbeddedSubject(s)} not to ${a} yet.`],
  ["제안 전달",(s,a)=>`${s} suggested ${asGerund(a)} before lunch.`],
  ["시점 표현 전환",(s,a)=>`${s} said that they would ${a} the following day.`],

  ["부정 의문문",(s,a)=>`Why hasn't ${asEmbeddedSubject(s)} tried to ${a}?`],
  ["선택 의문문",(s,a)=>`Will ${asEmbeddedSubject(s)} ${a} today or tomorrow?`],
  ["주어 의문문",(s,a)=>`Who asked ${asEmbeddedSubject(s)} to ${a}?`],
  ["부가의문문 be동사",(s,a)=>`${s} is ready to ${a}, aren't they?`],
  ["수사의문문",_s=>`Who could possibly object to a fair review?`],
  ["부분부정",(s,a)=>`Not every applicant chose to ${a}.`],
  ["전체부정",(s,a)=>`None of the applicants chose to ${a}.`],
  ["이중부정 의미",_s=>`It is not uncommon for careful plans to change.`],
  ["접속부사 however",(s,a)=>`The deadline was close; however, ${asEmbeddedSubject(s)} continued to ${a}.`],
  ["등위접속사",(s,a)=>`${s} could wait, or they could ${a}.`],
  ["콜론",_s=>`The conclusion was clear: the proposal needed revision.`],
  ["세미콜론",_s=>`The evidence was incomplete; the committee postponed its decision.`]
];

const grammarPatterns = [...coreGrammarPatterns, ...extendedGrammarPatterns];
const examplesPerPattern = 16;

const generatedGrammarExamples = Array.from({length:grammarPatterns.length * examplesPerPattern},(_,index)=>{
  const pattern = grammarPatterns[index % grammarPatterns.length];
  const subject = subjects[Math.floor(index / grammarPatterns.length) % subjects.length];
  const action = actions[Math.floor(index / (grammarPatterns.length * subjects.length)) % actions.length];
  return { id:index+1, category:pattern[0], sentence:pattern[1](subject,action) };
});

export const grammarExamples = [...new Map(generatedGrammarExamples.map(item => [item.sentence, item])).values()]
  .map((item, index) => ({ ...item, id:index+1 }));

export const grammarCategories = [...new Set(grammarPatterns.map(([name])=>name))];

const everydaySpeakingGroups = [
  ["인사와 안부",[["How's it going?","어떻게 지내?"],["Good to see you.","만나서 반가워."],["What have you been up to?","요즘 뭐 하고 지냈어?"],["Can't complain.","그럭저럭 괜찮아."],["Have a good one.","좋은 하루 보내."],["Take care.","잘 가 / 몸조심해."],["I'll see you around.","또 보자."],["It's been a while.","오랜만이야."]]],
  ["일상 대화",[["I'm on my way.","지금 가는 중이야."],["I'm running a little late.","조금 늦고 있어."],["No rush.","서두르지 않아도 돼."],["That works for me.","난 그걸로 괜찮아."],["I'm down.","좋아, 나도 할래."],["I'm good, thanks.","괜찮아요, 고마워요."],["It's up to you.","네가 정해."],["I'll keep you posted.","진행 상황 알려줄게."],["Let me get back to you.","확인하고 다시 연락할게."],["Sounds like a plan.","좋아, 그렇게 하자."]]],
  ["의견과 반응",[["That makes sense.","말이 되네."],["I see what you mean.","무슨 말인지 알겠어."],["That's a good point.","좋은 지적이야."],["I'm not so sure about that.","그건 잘 모르겠어."],["I couldn't agree more.","완전히 동의해."],["Fair enough.","그렇다면 납득돼."],["It depends.","경우에 따라 달라."],["You might be right.","네 말이 맞을 수도 있어."],["To be honest, …","솔직히 말하면…"],["As far as I know, …","내가 아는 한…"]]],
  ["부탁과 확인",[["Could you give me a hand?","좀 도와줄래?"],["Would you mind repeating that?","다시 말해 줄래요?"],["Can you walk me through it?","과정을 차근차근 설명해 줄래?"],["Do you happen to know…?","혹시 … 아세요?"],["Just to make sure, …","확실히 하려고 묻는데…"],["Did I get that right?","제가 제대로 이해했나요?"],["Could you speak a little slower?","조금 천천히 말해 주실래요?"],["What do you mean by that?","그게 무슨 뜻이에요?"]]],
  ["직장과 회의",[["Let's get started.","시작하죠."],["Let's circle back to that.","그건 나중에 다시 논의하죠."],["Can we take this offline?","이건 따로 이야기할까요?"],["What's the timeline?","일정이 어떻게 되나요?"],["I'll follow up by email.","이메일로 후속 연락할게요."],["We're on the same page.","서로 이해가 같아요."],["I'm still working on it.","아직 작업 중이에요."],["We may need to push it back.","일정을 미뤄야 할 수도 있어요."],["Could you clarify the next steps?","다음 단계를 명확히 해 주실래요?"],["Thanks for the heads-up.","미리 알려줘서 고마워요."]]],
  ["식당과 쇼핑",[["Could we get a table for two?","두 명 자리 있을까요?"],["Can I get this to go?","이거 포장해 주실래요?"],["Could we get the check, please?","계산서 부탁드려요."],["Is the tip included?","팁이 포함되어 있나요?"],["I'm just looking, thanks.","그냥 둘러보는 중이에요."],["Do you have this in a different size?","이거 다른 사이즈 있나요?"],["Can I try this on?","입어 봐도 될까요?"],["What's your return policy?","반품 규정이 어떻게 되나요?"]]],
  ["이동과 문제 해결",[["How do I get to…?","…에 어떻게 가나요?"],["Is this seat taken?","이 자리 주인이 있나요?"],["Where should I transfer?","어디에서 갈아타나요?"],["I think I'm lost.","길을 잃은 것 같아요."],["My order hasn't arrived yet.","주문한 게 아직 안 왔어요."],["There seems to be a mistake.","뭔가 잘못된 것 같아요."],["Could you help me sort this out?","이 문제 해결을 도와주실래요?"],["No worries.","괜찮아요 / 걱정 마세요."]]],
  ["약속과 사교",[["Are you free this weekend?","이번 주말에 시간 돼?"],["Do you want to grab coffee?","커피 한잔할래?"],["What time works for you?","몇 시가 좋아?"],["Can we take a rain check?","다음으로 미뤄도 될까?"],["Something came up.","갑자기 일이 생겼어."],["Thanks for having me.","초대해 줘서 고마워."],["Make yourself at home.","편하게 있어."],["I'll let you know.","나중에 알려줄게."]]]
];

export const speakingGroups = [...businessSpeakingGroups, ...everydaySpeakingGroups];
