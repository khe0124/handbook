import type { HandbookDocumentContent } from "../types";

const qa = [
  ["도구 결과가 왜 곧 정탐이 아닌가?", "도구는 위험 패턴을 넓게 찾지만 입력의 실제 통제 가능성, 실행경로, 문맥에 맞는 방어, 보호자산 영향까지 모두 증명하지 못한다. 진단원은 Source에서 Sink까지의 흐름과 모든 경로의 통제를 확인해 판정한다."],
  ["입력검증과 출력인코딩은 무엇이 다른가?", "입력검증은 업무상 허용된 type·길이·범위·형식인지 판정한다. 출력인코딩은 이미 허용된 값이라도 HTML·속성·JavaScript·URL 같은 현재 출력문맥에서 코드가 아닌 데이터로 해석되게 표현한다."],
  ["인증과 인가를 코드에서 어떻게 구분하는가?", "신원이나 session/token의 유효성을 확인하는 지점은 인증이다. 인증된 actor가 요청한 resource와 action을 수행할 수 있는지 소유권·role·tenant로 확인하는 지점은 인가다."],
  ["오탐이라고 쓰려면 어떤 증거가 필요한가?", "외부 통제 Source가 아니거나, 실행 가능한 Sink에 도달하지 않거나, 문맥에 맞는 방어가 모든 경로에 적용되거나, 위험 동작과 영향이 없음을 호출흐름·설정·테스트·배포범위로 증명해야 한다."],
  ["좋은 개선안은 어떻게 쓰는가?", "원인이 발생한 위치, 적용할 안전 API나 정책, 실패 처리, 같은 패턴의 확장점검, 정상·악성·경계 입력의 재검증 방법을 적는다."],
  ["설계 진단에서 문서가 존재하는데도 부적합할 수 있는 이유는?", "대상·값·적용 위치·실패 처리·검수 기준이 없거나 요구사항과 상세설계·공통모듈의 조건이 다르면 구현과 시험이 일관될 수 없다. 문장 존재가 아니라 추적성과 검증 가능성을 본다."],
  ["SSRF와 open redirect를 어떻게 구분하는가?", "SSRF는 서버가 공격자 지정 URL을 호출해 서버의 network 권한을 사용한다. open redirect는 사용자 browser를 신뢰되지 않는 URL로 이동시킨다."],
  ["XSS와 CSRF를 어떻게 구분하는가?", "XSS는 불신 데이터가 browser에서 script로 해석되는 출력 문제다. CSRF는 browser가 인증정보를 자동 첨부해 사용자의 의도 없는 상태변경 요청을 보내는 문제다."],
  ["암호화 설계에서 algorithm 이름 외에 무엇을 보는가?", "목적, mode, key 길이, IV·nonce 생성과 재사용, key 생성·저장·접근·교체·폐기, 인증서 검증, 오류 처리, 기존 데이터 migration까지 본다."],
  ["재진단은 코드가 바뀐 것만 확인하면 되는가?", "원인이 제거됐는지, 우회경로와 동일 패턴이 남았는지, 정상기능 회귀와 새로운 정보노출이 없는지 확인하고 잔여위험을 기록한다."],
];

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SW SECURITY DIAGNOSER</div><div class="nav-title">이론 핵심문답</div>${qa.map((_, index) => `<a href="#qa-${index + 1}"><span class="code">Q${String(index + 1).padStart(2, "0")}</span>핵심 판정 질문</a>`).join("")}`,
  mainHtml: `<header class="hero"><div class="hero-serial"><span>TRACK : SW 보안약점 진단원</span><span>DOC : DIAGNOSER-07</span><span>MODE : RETRIEVAL PRACTICE</span></div><h1>시험 전에 말로 답하는<br>이론 핵심문답</h1><p class="hero-sub">답을 먼저 가리고 60초 동안 설명한 뒤, 원인과 판정 근거가 빠졌는지 대조합니다.</p><div class="hero-meta">CONCEPT → DISTINCTION → EVIDENCE → REMEDIATION</div></header>${qa.map(([question, answer], index) => `<section id="qa-${index + 1}"><div class="ch-head"><span class="ch-code">Q${String(index + 1).padStart(2, "0")}</span><h2>${question}</h2></div><p>${answer}</p><div class="checklist"><strong>통과 조건</strong><ul><li>핵심 개념을 자기 말로 설명했다.</li><li>판정에 필요한 증거를 하나 이상 말했다.</li><li>비슷한 약점과의 차이를 사례로 구분했다.</li></ul></div></section>`).join("")}`,
};

export default document;
