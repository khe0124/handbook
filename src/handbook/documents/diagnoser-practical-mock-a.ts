import type { HandbookDocumentContent } from "../types";
const cases = [
 ["MyBatis 정렬","ORDER BY ${sort}","SQL 삽입","sort를 enum으로 검증해 고정 열 이름에 mapping","Source·Sink·문자열치환·allowlist"],
 ["JSP 검색어","<script>const q='${param.q}'</script>","XSS","JS 안전 직렬화 또는 data 전달 후 textContent 사용","출력문맥·encoding·CSP 보조"],
 ["다운로드","new File(root, request.getParameter('name'))","경로 조작","opaque ID mapping과 canonical root 경계 확인","..·symlink·인가"],
 ["변환 명령","Runtime.exec('convert ' + file)","운영체제 명령어 삽입","shell을 피하고 고정 실행파일·인자 배열 사용","명령구분자·최소권한"],
 ["PHP 업로드","move_uploaded_file(..., '/public/'.$_FILES['f']['name'])","위험한 형식 파일 업로드","내용·크기 검사, 임의명, web root 밖 격리, 실행금지","MIME 위조·이중확장자"],
 ["미리보기 URL","httpClient.get(req.url), redirect 자동","SSRF","scheme·host·해석 IP·redirect 매 단계 검증과 egress","내부IP·DNS rebinding"],
 ["관리 API","로그인만 확인하고 /users/{id}/role 변경","부적절한 인가","행위·resource·tenant별 server 권한검사","인증≠인가·IDOR"],
 ["비밀키","const API_KEY='prod-...'","하드코드된 중요정보","폐기·재발급 후 secret manager와 최소권한","Git 이력·로그·rotation"],
 ["비밀번호","sha256(password)","취약한 비밀번호 저장","개별 salt와 검증된 password KDF","cost·migration"],
 ["HTTPS client","hostnameVerifier = (_,__) => true","부적절한 인증서 검증","기본 chain·hostname 검증 복구","MITM·만료·hostname"],
 ["객체 복원","new ObjectInputStream(upload).readObject()","신뢰되지 않는 역직렬화","단순 schema와 type allowlist, native 복원 회피","gadget·무결성"],
 ["임시파일","exists 검사 후 같은 path를 privileged open","경쟁조건","같은 handle·atomic create·안전 디렉터리 사용","TOCTOU·symlink"],
 ["결제","DB save 결과를 무시하고 성공 응답","오류상황 대응 부재","실패 검사·transaction rollback·안전상태","부분완료·무결성"],
 ["공유 상태","static currentUser에 요청 사용자 저장","잘못된 세션에 의한 정보 노출","request/session scoped 상태와 동시성 시험","race·타사용자"],
 ["C 복사","char b[16]; strcpy(b, argv[1]);","버퍼 오버플로우","입력 최대길이·목적지 크기·종료문자 보장","경계값·ASan·반환값"],
];
const body=cases.map(([title,snippet,answer,fix,keys],i)=>`<section id="a${i+1}"><div class="ch-head"><span class="ch-code">A${String(i+1).padStart(2,"0")}</span><h2>${title} <small>${i<10?6:8}점</small></h2></div><pre><code>${snippet}</code></pre><p><strong>문제:</strong> 약점명, 정탐 근거, 영향, 개선, 재시험을 작성하라.</p><details><summary>모범답안·채점표</summary><p><strong>판정:</strong> ${answer}. 외부 입력이 보호 없이 위험 연산에 도달하는 실행경로가 있으므로 정탐이다.</p><p><strong>개선:</strong> ${fix}. 정상·악성·경계값과 같은 패턴의 다른 호출처까지 재시험한다.</p><p><strong>필수 핵심어:</strong> ${keys}</p><ul><li>약점과 정·오탐 1점</li><li>Source–Sink 증적 2점</li><li>영향 1점</li><li>구체적 개선 ${i<10?1:2}점</li><li>재시험 ${i<10?1:2}점</li></ul></details></section>`).join("");
const document:HandbookDocumentContent={navHtml:`<div class="nav-brand">PRACTICAL MOCK A</div><div class="nav-title">코드 판정 15문항</div>${cases.map((c,i)=>`<a href="#a${i+1}"><span class="code">A${String(i+1).padStart(2,"0")}</span>${c[0]}</a>`).join("")}`,mainHtml:`<header class="hero"><div class="hero-serial"><span>TIME : 100 MIN</span><span>SCORE : 100</span><span>PASS : 60</span></div><h1>실습 모의고사 A<br>코드·데이터 흐름</h1><p class="hero-sub">정답을 열지 말고 85분 작성, 15분 검토합니다. 1~10번 6점, 11~15번 8점입니다.</p></header>${body}`};
export default document;
