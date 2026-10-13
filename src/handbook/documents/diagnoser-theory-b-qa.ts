import type { HandbookDocumentContent } from "../types";

const concepts = [
  ["Binding의 경계", "값 placeholder만 query 구조와 분리한다. table·column·정렬방향은 parameter가 될 수 없으므로 외부 문자열 치환이 아니라 enum과 고정 SQL 조각 mapping이 필요하다."],
  ["XSS 문맥", "HTML 본문·속성·JavaScript·CSS·URL은 parser가 달라 encoding도 다르다. 입력검증, 출력 encoding, CSP는 서로 대체관계가 아니다."],
  ["XXE", "외부 entity와 DTD 해석을 끄고 안전한 parser 설정을 중앙화한다. XML 문자열 필터링이나 network 차단만으로 완결되지 않는다."],
  ["LDAP 삽입", "LDAP filter escape와 DN escape는 규칙이 다르다. 검색 filter 구조는 고정하고 값에 맞는 API를 적용한다."],
  ["SSRF", "scheme·host만이 아니라 DNS 해석 IP, IPv4/IPv6, redirect 매 단계, proxy와 egress까지 확인한다. URL regex 하나는 충분하지 않다."],
  ["인증·인가", "인증은 주체 신원, 인가는 그 주체의 resource·action 권한이다. UI 숨김과 client 전달 userId는 server 인가 증거가 아니다."],
  ["암호·서명", "암호화는 기밀성, MAC은 key 공유 기반 무결성·인증, 전자서명은 private key 서명과 public key 검증이다. 목적·key 생명주기·algorithm·mode를 함께 본다."],
  ["세션", "로그인·권한상승 때 ID 재발급, logout·비밀번호 변경 때 server 무효화, Secure·HttpOnly·SameSite와 idle/absolute timeout을 분리해 확인한다."],
  ["경쟁조건", "검사와 사용 사이 대상이 바뀌는 TOCTOU는 같은 handle 사용, atomic API, lock, 권한 최소화로 줄인다. 검사를 한 번 더 하는 것은 해법이 아니다."],
  ["오류·자원", "오류상황 대응 부재, 예외 삼킴, 상세정보 노출, 자원 미해제는 구분한다. 실패 시 안전한 상태·rollback·일관된 외부 응답·내부 추적정보가 필요하다."],
  ["정·오탐", "특정 payload 실패나 함수명은 오탐 근거가 아니다. Source 비통제, Sink 비도달, 모든 경로의 유효한 통제, 영향 부재를 코드·설정·시험으로 입증한다."],
  ["설계 추적성", "요구사항의 정책값이 아키텍처·상세설계·개발가이드·시험계획까지 같은 조건과 실패처리로 이어져야 검수 가능하다."],
];

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SW SECURITY DIAGNOSER</div><div class="nav-title">이론 심화문답 B</div>${concepts.map((c, i) => `<a href="#q${i + 1}"><span class="code">Q${String(i + 1).padStart(2, "0")}</span>${c[0]}</a>`).join("")}`,
  mainHtml: `<header class="hero"><div class="hero-serial"><span>MODE : SECOND PASS</span><span>RULE : 60초 구술</span></div><h1>비슷한 개념을<br>경계 조건으로 구분한다</h1><p class="hero-sub">답을 가리고 정의–혼동쌍–판정증거–개선–재시험 순서로 말한 뒤 30문항 B형을 풉니다.</p></header>${concepts.map(([q, a], i) => `<section id="q${i + 1}"><div class="ch-head"><span class="ch-code">Q${String(i + 1).padStart(2, "0")}</span><h2>${q}</h2></div><p>${a}</p><div class="checklist"><strong>자기채점 4점</strong><ul><li>정의 1점</li><li>혼동 개념과 차이 1점</li><li>판정 증거 1점</li><li>구체적 개선·재시험 1점</li></ul></div></section>`).join("")}`,
};
export default document;
