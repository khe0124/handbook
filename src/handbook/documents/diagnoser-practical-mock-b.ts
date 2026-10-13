import type { HandbookDocumentContent } from "../types";
const cases=[
 ["비밀번호 정책","요구사항 8자 이상, 코드는 length < 6 거부","6~7자가 통과하는 산출물 불일치","정책값 단일화 후 5·6·7·8자 경계시험"],
 ["DB 설계","binding 명시, 운영계정은 DBA 권한","삽입 방어와 최소권한은 별개이며 후자가 미충족","업무별 DML만 허용하고 권한표·실패시험 작성"],
 ["파일 설계","PDF 확장자만 검사해 public/uploads 저장","내용·크기·저장·실행 통제가 누락","내용검사, 격리, 임의명, 다운로드 인가"],
 ["세션 설계","로그인 전후 동일 ID, logout은 cookie만 삭제","fixation과 server session 재사용","로그인 재발급·logout server 무효화"],
 ["중요정보","DB는 암호화하나 backup·log 정책 없음","저장매체·복제본 전체 생명주기 누락","분류·key·접근·보존·폐기와 복구시험"],
 ["Prepared 함정","값은 bind, ORDER BY는 request 연결","구조 연결이 남아 SQL 삽입 정탐","정렬 enum과 고정 mapping"],
 ["Template 함정","autoescape 뒤 |safe 필터로 출력","방어가 해제되어 XSS 정탐","safe 제거·문맥 encoding·CSP 보조"],
 ["CSRF 판정","Authorization header를 JS가 추가, cookie 인증 없음","일반 CSRF는 오탐 가능하나 token 저장·XSS 별도 확인","browser 자동 첨부 여부 증거화"],
 ["SSRF 오탐","assetId를 server 고정 map만 URL로 변환","map 상수이고 redirect·DNS도 통제되면 오탐","모든 호출처와 배포 설정 증거화"],
 ["Redirect 구분","Location 헤더에 next를 넣어 browser 이동","open redirect이며 server가 호출하지 않아 SSRF는 아님","상대경로 또는 목적지 allowlist"],
 ["암호키","AES-GCM이나 nonce 재사용·rotation 없음","강한 algorithm만으로 부적합","nonce 유일성·KMS·교체·폐기"],
 ["서명","signature 필드 존재만 확인","무결성·발신자 검증이 수행되지 않음","정확한 bytes·public key·chain으로 검증"],
 ["예외","catch(Exception){return true;}","예외를 삼켜 성공 처리","안전한 실패·rollback·내부 log"],
 ["보고서","입력값을 잘 검증하도록 수정","위치·규칙·실패처리·재시험이 없는 개선안","구체 API와 정상·악성·경계 testcase 명시"],
 ["통합 재진단","수정 line은 안전하나 다른 endpoint 미수정","원인 제거가 불완전해 재진단 부적합","동일패턴·우회·회귀·배포본 확인"],
];
const body=cases.map(([t,e,a,f],i)=>`<section id="b${i+1}"><div class="ch-head"><span class="ch-code">B${String(i+1).padStart(2,"0")}</span><h2>${t} <small>${i<10?6:8}점</small></h2></div><blockquote>${e}</blockquote><p><strong>문제:</strong> 판정과 근거·개선·검증을 쓰시오.</p><details><summary>모범답안·부분점수</summary><p><strong>판정과 근거:</strong> ${a}.</p><p><strong>개선·재검증:</strong> ${f}.</p><ul><li>판정 1점</li><li>증적 2점</li><li>영향 1점</li><li>개선 ${i<10?1:2}점</li><li>재시험 ${i<10?1:2}점</li></ul><p><strong>감점:</strong> 약점명만 쓰면 근거·개선 점수 없음. “검증한다”처럼 대상과 방법이 없으면 개선점수 없음.</p></details></section>`).join("");
const document:HandbookDocumentContent={navHtml:`<div class="nav-brand">PRACTICAL MOCK B</div><div class="nav-title">설계·오탐·보고서 15문항</div>${cases.map((c,i)=>`<a href="#b${i+1}"><span class="code">B${String(i+1).padStart(2,"0")}</span>${c[0]}</a>`).join("")}`,mainHtml:`<header class="hero"><div class="hero-serial"><span>TIME : 100 MIN</span><span>SCORE : 100</span><span>PASS : 60</span></div><h1>실습 모의고사 B<br>설계·오탐·보고서</h1><p class="hero-sub">산출물 불일치, 안전 API 함정, 오탐 증명, 재진단을 섞은 독립 세트입니다.</p></header>${body}`};
export default document;
