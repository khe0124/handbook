import type { HandbookDocumentContent } from "../types";

const stacks = [
  ["Java·JSP·JDBC", "request parameter·header·cookie·multipart가 Source다. Statement 문자열 연결, Runtime.exec, File 경로, ObjectInputStream, JSP 직접 출력이 주요 Sink다.", "PreparedStatement도 SQL을 먼저 연결한 뒤 넣으면 취약하다. JSP EL도 raw 출력·JavaScript 문맥에서는 자동으로 안전하지 않다.", "값은 binding, 동적 table·column·ORDER BY는 server allowlist mapping, 출력은 HTML/속성/JS/URL 문맥별 encoding, 파일은 canonical root 검사를 적용한다."],
  ["MyBatis", "#{value}는 값 binding이고 ${value}는 문자열 치환이다. XML mapper와 annotation SQL, provider까지 호출경로를 본다.", "ORDER BY ${sort}가 필요하다는 이유만으로 안전하지 않다. OGNL 조건문은 입력검증이 아니다.", "외부 sort 값을 enum으로 변환한 뒤 고정 SQL 조각에 mapping한다. LIKE wildcard 정책과 foreach collection 크기도 시험한다."],
  ["Hibernate·JPA", "JPQL/HQL/native query의 문자열 연결, 동적 field명, tenant predicate 누락, entity 직렬화가 핵심이다.", "setParameter가 하나 있어도 query 구조의 다른 부분을 연결했거나 native query를 만들 때 이미 오염되면 정탐이다.", "값 binding과 식별자 allowlist를 분리하고 모든 repository 경로에서 소유권·tenant 조건을 server가 강제한다."],
  ["JDO", "JDOQL filter·ordering·variables 문자열에 입력이 섞이는지와 parameter 선언·executeWithMap 사용을 본다.", "ORM을 쓴다는 사실은 삽입 방어 증거가 아니다. filter 자체를 연결하면 위험하다.", "filter 구조는 상수로 유지하고 named parameter에 값만 전달하며 ordering은 고정 mapping으로 제한한다."],
  ["C·C++", "argv·socket·file이 Source이며 strcpy/sprintf/scanf, format string, pointer arithmetic, allocation size가 Sink다.", "길이 제한 함수도 종료문자, signed/unsigned 변환, 계산 overflow, destination 실제 크기를 틀리면 안전하지 않다.", "연산 전 범위를 검사하고 size_t 경계를 확인한다. snprintf 반환값, RAII·smart pointer, 단일 소유권과 오류경로 해제를 함께 검증한다."],
  ["C#·ASP.NET", "Request 값이 SqlCommand.CommandText, Process.Start, Path.Combine, HTML/redirect에 도달하는 흐름을 본다.", "SqlParameter를 일부만 쓰거나 AddWithValue 형식추론에 의존해도 구조 연결은 남는다. Path.Combine은 .. 탈출을 막지 않는다.", "typed parameter, route/resource별 인가, GetFullPath 후 root 경계, Razor 문맥별 encoding, 인증서 chain·hostname 검증을 적용한다."],
  ["PHP", "$_GET/POST/COOKIE/FILES/SERVER와 DB값도 재출력 시 Source다. mysqli/PDO query, include, exec, header, move_uploaded_file이 Sink다.", "PDO emulated prepare·동적 식별자·잘못된 bind 순서를 확인한다. basename, 확장자, MIME만으로 upload가 안전해지지 않는다.", "native prepare와 binding, 식별자 allowlist, finfo+내용검사, web root 밖 임의명 저장, 실행권한 제거, header 개행·redirect allowlist를 적용한다."],
];

const rows = stacks.map(([name, trace, trap, evidence], i) => `<section id="s${i + 1}"><div class="ch-head"><span class="ch-code">${String(i + 1).padStart(2, "0")}</span><h2>${name}</h2></div><h3>어디서 무엇을 추적하는가</h3><p>${trace}</p><div class="callout warn"><span class="co-label">시험 함정</span><p>${trap}</p></div><h3>적합 판정에 필요한 코드·시험 증거</h3><p>${evidence}</p><div class="checklist"><strong>5문장 답안</strong><ol><li>공격자 통제 Source를 특정한다.</li><li>변환과 호출경로를 따라 Sink를 특정한다.</li><li>누락되거나 문맥이 틀린 통제를 쓴다.</li><li>기밀성·무결성·가용성 영향을 연결한다.</li><li>안전 API와 악성·경계 재시험을 쓴다.</li></ol></div></section>`).join("");

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SW SECURITY DIAGNOSER</div><div class="nav-title">언어·프레임워크 진단</div>${stacks.map(([n], i) => `<a href="#s${i + 1}"><span class="code">${String(i + 1).padStart(2, "0")}</span>${n}</a>`).join("")}<a href="#matrix"><span class="code">GATE</span>안전 API 함정</a>`,
  mainHtml: `<header class="hero"><div class="hero-serial"><span>TRACK : SW 보안약점 진단원</span><span>DOC : LANGUAGE EVIDENCE</span></div><h1>언어가 바뀌어도<br>Source–Sink로 판정한다</h1><p class="hero-sub">Java/JSP, MyBatis, Hibernate/JPA, JDO, C/C++, C#, PHP에서 같은 약점이 어떤 API로 나타나는지 비교합니다.</p></header>${rows}<section id="matrix"><div class="ch-head"><span class="ch-code">GATE</span><h2>‘안전 API 사용’만으로 오탐 처리하지 않는다</h2></div><ul><li>API 호출 전에 문자열이 이미 결합됐는가?</li><li>값만 binding하고 식별자·경로·URL 구조는 외부값 그대로인가?</li><li>모든 분기·mapper·repository·공통함수에 통제가 적용되는가?</li><li>encoding 문맥과 실제 출력 문맥이 일치하는가?</li><li>빌드·배포되는 버전과 설정에서도 같은 통제가 활성화되는가?</li></ul><p><strong>판정 문장:</strong> “안전 API 이름의 존재가 아니라 공격자 통제 데이터가 위험 연산의 구조를 바꿀 수 없는지를 실행 가능한 전체 경로로 확인한다.”</p></section>`,
};

export default document;
