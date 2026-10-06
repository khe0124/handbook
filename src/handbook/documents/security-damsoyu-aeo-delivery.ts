import type { HandbookDocumentContent } from "../types";

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SECURITY · AEO DELIVERY</div>
<div class="nav-title">담소유 AEO 다국어 실행 가이드</div>
<a href="#aeo-mission"><span class="code">00</span>내 임무와 경계</a>
<a href="#aeo-known"><span class="code">01</span>현재 확인사항</a>
<a href="#aeo-intake"><span class="code">02</span>착수 질문</a>
<a href="#aeo-access"><span class="code">03</span>권한·백업</a>
<a href="#aeo-architecture"><span class="code">04</span>운영환경 설계</a>
<a href="#aeo-staging"><span class="code">05</span>스테이징 구축</a>
<a href="#aeo-authoring"><span class="code">06</span>블링크애드 편집환경</a>
<a href="#aeo-template"><span class="code">07</span>페이지 템플릿</a>
<a href="#aeo-workflow"><span class="code">08</span>역할별 작업흐름</a>
<a href="#aeo-quality"><span class="code">09</span>AEO·SEO 품질</a>
<a href="#aeo-security"><span class="code">10</span>보안 검증</a>
<a href="#aeo-release"><span class="code">11</span>운영 배포</a>
<a href="#aeo-operations"><span class="code">12</span>지속 운영</a>
<a href="#aeo-incident"><span class="code">13</span>실패·사고 대응</a>
<a href="#aeo-workbook"><span class="code">14</span>실전 체크리스트·질문집</a>
<a href="#aeo-handover"><span class="code">PACK</span>전달 패키지</a>`,
  mainHtml: `<header class="hero">
<div class="hero-serial"><span>CLIENT : 담소유병원 · damsoyu.com</span><span>SERVICE : BLINKAD AEO MULTILINGUAL OPERATIONS</span><span>ROLE : 하은 · ENVIRONMENT &amp; DESIGN DELIVERY</span></div>
<h1>운영 사이트를 지키면서<br>AEO 다국어 운영환경 만들기</h1>
<p class="hero-sub">담소유병원 공식 홈페이지의 <code>/en/</code>, <code>/ja/</code> 아래에서 블링크애드가 AI 초안을 만들고 지속 운영하며, 개발 담당자가 디자인을 마감하고 안전하게 배포할 수 있도록 만드는 실제 업무 순서입니다.</p>
<div class="hero-meta">PROJECT RUNBOOK · SECURITY GATES · UPDATED 2026-10</div>
</header>
<section id="aeo-mission"><div class="ch-head"><span class="ch-code">00</span><h2>내 임무와 하지 않는 일을 먼저 고정한다</h2></div>
<p class="lede">내 목표는 번역 페이지 몇 장을 직접 만드는 것이 아니라, 블링크애드가 공식 도메인 안에서 초안을 만들고 검토·발행할 수 있는 <strong>제한된 운영 시스템</strong>을 만들고 안전한 배포 경계를 인계하는 것입니다.</p>
<table><tr><th>단계</th><th>주 담당</th><th>내 책임</th><th>완료 증거</th></tr><tr><td>다국어 운영환경</td><td>하은</td><td>구조·권한·미리보기·배포·복구 설계</td><td>staging, 계정, runbook, 검증 결과</td></tr><tr><td>페이지 초안</td><td>블링크애드</td><td>안전한 템플릿과 작성 경계 제공</td><td>draft URL, 변경 이력</td></tr><tr><td>디자인 마감</td><td>하은</td><td>레이아웃·서체·간격·이미지·CTA·모바일</td><td>QA 캡처, 승인본</td></tr><tr><td>콘텐츠 운영</td><td>블링크애드</td><td>기술 지원·배포 통제·사고 대응</td><td>발행 이력, 월간 운영 기록</td></tr></table>
<div class="callout warn"><span class="co-label">명확한 비목표</span><p>AI가 운영 서버의 PHP를 자유롭게 생성·수정하게 하지 않습니다. 블링크애드에 전체 FTP·DB·최고 관리자 권한을 제공하지 않습니다. 의료 문구의 임상적 정확성·법적 적합성을 개발자가 단독 승인하지 않습니다.</p></div></section>
<section id="aeo-known"><div class="ch-head"><span class="ch-code">01</span><h2>현재 확인된 사실과 아직 모르는 것</h2></div>
<p class="lede">2026-10-06 공개 화면과 응답을 읽기 전용으로 확인한 결과입니다. 서버 내부 사실로 단정하지 않고 착수 인터뷰의 기준선으로만 사용합니다.</p>
<table><tr><th>공개 확인</th><th>의미</th><th>착수 후 재확인</th></tr><tr><td><code>/main/main.php</code>와 진료과별 <code>.php</code> URL</td><td>PHP 중심의 기존 경로 구조</td><td>framework·include·routing·document root</td></tr><tr><td>nginx 응답</td><td>현재 외부 edge/web 응답 특성</td><td>실제 origin·호스팅사·reverse proxy 구조</td></tr><tr><td><code>/admincenter/</code> 자산과 자체 게시판 경로</td><td>자체 관리자·게시판 가능성</td><td>관리자 기능, 역할, DB schema, 배포 방식</td></tr><tr><td>온라인예약·예약확인</td><td>개인정보 처리 흐름 존재</td><td>수집 항목, 저장·알림·보존·접근자</td></tr><tr><td>GTM·Analytics·채널톡 등 외부 script</td><td>다국어 페이지의 외부 전송·CSP 영향</td><td>계약, consent, locale별 추적 정책</td></tr><tr><td>description·OG metadata</td><td>AEO/SEO 수정 대상 존재</td><td>14페이지 제안서와 canonical·sitemap·schema 현황</td></tr></table>
<div class="callout risk"><span class="co-label">STOP ASSUMING</span><p>공개 URL이 PHP라고 해서 WordPress가 아니라고 단정하거나, nginx라고 해서 카페24·가비아 상품을 추정하지 않습니다. FTP만 있는지, Git·SSH·staging이 있는지, DB를 직접 수정해야 하는지는 계정과 문서로 확인한 뒤 설계합니다.</p></div></section>
<section id="aeo-intake"><div class="ch-head"><span class="ch-code">02</span><h2>착수 첫날 — 답을 받기 전에는 변경하지 않는다</h2></div>
<h3><span class="h3-tag">2.1</span>개발·인프라 질문</h3><ul><li>호스팅사·상품, PHP·DB 버전, web root, FTP/SFTP/SSH, Git·CI/CD 지원 여부</li><li>소스 원본 저장소, 실제 운영본과 원본의 차이, 최근 배포자와 배포 절차</li><li>관리자 구조, 공통 header/footer/include, 페이지와 게시물 저장 방식</li><li>자동·수동 파일/DB backup, 보존 기간, 실제 restore 경험과 지원 연락처</li><li>DNS·SSL·메일·문자·예약·검색·분석·채널톡 계정의 소유자</li></ul>
<h3><span class="h3-tag">2.2</span>제품·콘텐츠 질문</h3><ul><li>사용할 언어와 우선순위: <code>/en/</code>, <code>/ja/</code> 외 예정 언어</li><li>제안서의 14페이지 원본 URL, 신규/수정 구분, 언어별 동일 범위 여부</li><li>언어별 target country·검색 의도·대표 CTA·문의 또는 예약 방식</li><li>번역·의학 검수·의료광고 승인자와 발행 SLA</li><li>기존 디자인을 그대로 재사용할 범위와 언어별 이미지 제작 범위</li></ul>
<h3><span class="h3-tag">2.3</span>답변을 받아 만드는 산출물</h3><div class="semantic-card"><span class="sc-label">DISCOVERY PACKET</span><br>system map · access register · 14-page URL matrix · data flow · third-party inventory · deployment baseline · backup/restore evidence · unknown/risk register · decision log</div></section>
<section id="aeo-access"><div class="ch-head"><span class="ch-code">03</span><h2>권한과 백업을 먼저 안전하게 만든다</h2></div>
<ol><li>도메인·호스팅은 담소유병원 소유 계정을 유지하고 내 작업 계정을 별도로 받는다.</li><li>가능하면 SFTP·SSH를 사용하고 접속 IP·기간·경로를 제한한다. 공용 FTP 비밀번호를 단체 채팅으로 공유하지 않는다.</li><li>운영 파일 전체, DB 전체, 설정·cron·rewrite·권한 목록을 backup한다.</li><li>backup의 timestamp·크기·hash를 기록하고 외부 접근이 불가능한 암호화 위치에 보관한다.</li><li>스테이징에 복원해 홈·14개 대상 페이지·예약·게시판·관리자를 기준선 테스트한다.</li><li>복원에 실패하면 다국어 개발보다 backup 체계를 먼저 수정한다.</li></ol>
<table><tr><th>주체</th><th>허용 권한</th><th>금지</th></tr><tr><td>하은</td><td>staging 개발, 승인된 운영 배포, rollback</td><td>승인 없는 의료 문구·DB 원문 변경</td></tr><tr><td>블링크애드 작성자</td><td>다국어 draft 작성·수정·미리보기</td><td>PHP 실행 코드, 운영 설정, 사용자·권한 변경</td></tr><tr><td>블링크애드 발행자</td><td>승인된 콘텐츠 발행 요청 또는 제한된 publish</td><td>한국어 원본·공통 template 직접 변경</td></tr><tr><td>병원 승인자</td><td>의학·광고·개인정보·최종 공개 승인</td><td>서버 계정 공유</td></tr></table></section>
<section id="aeo-architecture"><div class="ch-head"><span class="ch-code">04</span><h2>운영환경 설계 — 기존 사이트를 침범하지 않는 구조</h2></div>
<p class="lede">우선안은 기존 PHP 사이트 안에 언어별 하위 디렉토리를 두되, 공통 코드와 콘텐츠를 분리하고 블링크애드가 수정할 수 있는 영역을 데이터·템플릿 변수로 제한하는 것입니다.</p>
<pre class="snippet-card"><code>damsoyu.com/
├─ main/ · introduce/ · hernia/ ...   # 기존 한국어: 초기에는 변경 최소화
├─ en/
│  ├─ index.php                       # 공통 bootstrap 사용
│  ├─ clinic/ · doctor/ · condition/
│  └─ assets/                         # 언어 전용 자산
├─ ja/
│  └─ ...
├─ shared/
│  ├─ templates/                      # 개발팀 관리, 작성자 수정 금지
│  ├─ components/
│  └─ security/
└─ storage/                           # 가능하면 web root 밖
   ├─ content/                        # draft·published 데이터
   ├─ revisions/
   └─ logs/</code></pre>
<h3><span class="h3-tag">4.1</span>설계 결정</h3><table><tr><th>결정</th><th>권장안</th><th>이유</th></tr><tr><td>URL</td><td><code>/en/</code>, <code>/ja/</code></td><td>공식 도메인 신뢰·검색·운영 통합</td></tr><tr><td>언어 식별</td><td>URL locale allowlist</td><td>쿠키 의존·path traversal 방지</td></tr><tr><td>콘텐츠</td><td>DB 또는 versioned structured content</td><td>PHP 코드와 AI 작성물을 분리</td></tr><tr><td>템플릿</td><td>개발팀 승인 component만 선택</td><td>임의 HTML·script·layout 파손 제한</td></tr><tr><td>상태</td><td>draft → medical review → design review → approved → published</td><td>책임과 공개 이력 보존</td></tr><tr><td>배포</td><td>staging preview 후 승인된 release만 운영</td><td>AI 초안의 직접 공개 차단</td></tr></table>
<div class="callout warn"><span class="co-label">대안 선택 조건</span><p>기존 관리자 확장이 지나치게 위험하면 별도의 headless CMS나 제한된 콘텐츠 저장소를 검토할 수 있습니다. 하지만 새 서비스가 운영 DB·인증·백업·비용을 추가하므로, 14페이지와 장기 운영량을 기준으로 가장 단순한 안전 구조를 선택합니다.</p></div></section>
<section id="aeo-staging"><div class="ch-head"><span class="ch-code">05</span><h2>스테이징과 미리보기 환경을 만든다</h2></div>
<ol><li><code>staging</code> 또는 호스팅이 허용하는 별도 경로에 운영 복제본을 만든다.</li><li>운영 DB·메일·문자·예약 webhook을 사용하지 않도록 test 설정으로 분리한다.</li><li>Basic Auth·IP 제한을 적용하고 <code>noindex</code>, robots 차단을 함께 둔다. robots만으로 비공개가 되지는 않는다.</li><li>운영 개인정보가 필요하지 않은 synthetic fixture를 사용하고 예약자 DB dump는 masking한다.</li><li>운영과 같은 PHP 버전, rewrite, extension, directory permission을 재현한다.</li><li>staging URL이 Analytics·GTM·채널톡의 운영 데이터를 오염시키지 않는지 확인한다.</li></ol>
<div class="checklist"><strong>STAGING READY</strong><ul><li>공개 검색과 익명 접근이 차단됐다.</li><li>운영 예약·메일·문자·분석으로 연결되지 않는다.</li><li>운영과 같은 경로·PHP·DB 조건에서 기존 화면이 정상이다.</li><li>배포 전후 스크린샷·성능·기능 비교 기준이 있다.</li></ul></div></section>
<section id="aeo-authoring"><div class="ch-head"><span class="ch-code">06</span><h2>블링크애드가 안전하게 초안을 만드는 환경</h2></div>
<p class="lede">AI 활용은 작성 속도를 높이는 도구이며 배포 권한이 아닙니다. AI 출력은 불신 입력으로 취급하고 허용된 필드와 component를 통해서만 저장합니다.</p>
<h3><span class="h3-tag">6.1</span>작성 화면 필드</h3><table><tr><th>영역</th><th>작성 가능</th><th>통제</th></tr><tr><td>페이지 기본</td><td>locale, title, slug, summary, page type</td><td>locale·slug allowlist, 중복·예약어 검사</td></tr><tr><td>콘텐츠</td><td>section heading, body, FAQ, CTA label</td><td>허용 HTML sanitization, 길이·필수값</td></tr><tr><td>이미지</td><td>승인 media 선택, alt, caption</td><td>확장자·MIME·크기, 실행 차단, 라이선스 기록</td></tr><tr><td>검색</td><td>meta title·description, OG, canonical 후보</td><td>canonical은 내부 URL만, schema 유형 제한</td></tr><tr><td>의료정보</td><td>질환·진료 설명, 수치·근거</td><td>출처·검토자·검토일 필수</td></tr></table>
<h3><span class="h3-tag">6.2</span>AI 사용 규칙</h3><ul><li>환자 예약정보, 관리자 계정, 비공개 문서, FTP·DB 정보는 외부 AI에 입력하지 않는다.</li><li>AI가 만든 의료 사실, 통계, 수술 결과, 의사 약력, 가격을 원문 근거 없이 게시하지 않는다.</li><li>번역은 원문 version과 연결하고 병원 승인 후에만 published 상태로 이동한다.</li><li>AI가 만든 이미지의 의료적 오인, 인물 권리, 저작권과 합성 표시 필요성을 검토한다.</li><li>prompt·model보다 원문, 변경 diff, 승인자, published revision을 감사 가능한 기록으로 남긴다.</li></ul>
<h3><span class="h3-tag">6.3</span>가장 안전한 권한 모델</h3><p>작성자는 draft 저장과 preview token 발급만, 발행자는 승인 완료 revision의 publish 요청만 할 수 있게 합니다. PHP·template·JavaScript·external script 입력은 차단하고, 최고 관리자와 배포 credential은 개발 담당자에게만 둡니다.</p></section>
<section id="aeo-template"><div class="ch-head"><span class="ch-code">07</span><h2>14페이지를 위한 재사용 템플릿</h2></div>
<p class="lede">AI가 페이지마다 자유롭게 마크업을 만들게 하지 않고, 기존 담소유 디자인을 반영한 component schema 안에서 조합하게 합니다.</p>
<table><tr><th>템플릿</th><th>필수 section</th><th>AEO 구조</th></tr><tr><td>질환·진료</td><td>정의, 증상, 진단, 치료, 대상, 주의, 의료진, CTA</td><td>명확한 질문형 heading, 요약, FAQ, 근거</td></tr><tr><td>센터</td><td>센터 소개, 진료 범위, 강점, process, 의료진</td><td>entity·service 관계와 탐색 경로</td></tr><tr><td>의료진</td><td>이름, 전문분야, 경력, 연구, 진료시간</td><td>검증 가능한 약력과 소속</td></tr><tr><td>병원 안내</td><td>주소, 교통, 시간, 예약, 언어 지원</td><td>일관된 조직·지역·연락 정보</td></tr></table>
<h3><span class="h3-tag">7.1</span>Component 계약</h3><pre class="snippet-card"><code>{
  "type": "faq",
  "items": [{"question": "...", "answer": "...", "source_id": "MED-014"}],
  "review": {"status": "medical_approved", "reviewer": "...", "date": "..."}
}</code></pre>
<p>rendering은 서버 템플릿이 담당하고 작성자는 schema 데이터만 편집합니다. 이 방식이면 디자인 변경을 공통 component 한 곳에서 적용할 수 있고, 임의 script·style 삽입과 페이지별 품질 편차를 줄일 수 있습니다.</p></section>
<section id="aeo-workflow"><div class="ch-head"><span class="ch-code">08</span><h2>한 페이지가 발행되는 실제 작업 흐름</h2></div>
<table><tr><th>순서</th><th>담당</th><th>작업</th><th>Gate</th></tr><tr><td>1. Brief</td><td>블링크애드</td><td>대상 query, 원문 URL, 언어, CTA, 근거 입력</td><td>필수 자료와 승인자 존재</td></tr><tr><td>2. AI Draft</td><td>블링크애드</td><td>허용 component로 초안·meta·FAQ 작성</td><td>출처 연결, 금지 표현 자동·수동 점검</td></tr><tr><td>3. Content Review</td><td>병원·블링크애드</td><td>의학·번역·광고·개인정보 검수</td><td>승인 revision 잠금</td></tr><tr><td>4. Design Finish</td><td>하은</td><td>레이아웃, typography, spacing, image, CTA, responsive</td><td>기능·접근성·기존 브랜드 QA</td></tr><tr><td>5. Preview Approval</td><td>병원 승인자</td><td>실제 staging URL 최종 확인</td><td>승인자·시각·revision 기록</td></tr><tr><td>6. Publish</td><td>하은 또는 제한된 발행자</td><td>승인 revision 배포, sitemap 갱신</td><td>smoke·negative test</td></tr><tr><td>7. Observe</td><td>하은·블링크애드</td><td>오류·색인·검색·문의·콘텐츠 성과 관찰</td><td>문제 시 unpublish·rollback</td></tr></table>
<h3><span class="h3-tag">8.1</span>디자인 마감에서 내가 확인할 것</h3><ul><li>영문·일문 길이로 heading·button·navigation이 깨지지 않는가?</li><li>일본어 line break, 영문 단어 wrapping, font fallback과 굵기가 안정적인가?</li><li>모바일에서 sticky CTA가 예약·개인정보 동의를 가리지 않는가?</li><li>의료 이미지와 caption·alt가 본문 의미 및 언어와 일치하는가?</li><li>기존 한국어 공통 CSS 수정이 운영 페이지를 회귀시키지 않는가?</li></ul></section>
<section id="aeo-quality"><div class="ch-head"><span class="ch-code">09</span><h2>AEO·SEO를 기술적으로 완성한다</h2></div>
<table><tr><th>항목</th><th>구현</th><th>검증</th></tr><tr><td>URL</td><td>언어별 고유 URL과 안정적인 slug</td><td>200·301·404, 중복 URL 없음</td></tr><tr><td>Language</td><td>HTML <code>lang</code>, hreflang 상호 연결, x-default</td><td>모든 언어가 서로 참조</td></tr><tr><td>Canonical</td><td>각 번역 페이지의 self canonical</td><td>모두 한국어 canonical로 몰리지 않음</td></tr><tr><td>Metadata</td><td>언어별 title·description·OG</td><td>14페이지 matrix와 실제 응답 비교</td></tr><tr><td>Structured data</td><td>검증된 Organization·Hospital·Physician·FAQ 등</td><td>화면에 보이는 사실과 schema 일치</td></tr><tr><td>Sitemap</td><td>published URL만 포함, lastmod 관리</td><td>draft·staging·404 제외</td></tr><tr><td>Answerability</td><td>정의·근거·FAQ·작성/검토 정보가 명확</td><td>문장 인용 가능성과 출처 확인</td></tr></table>
<div class="callout warn"><span class="co-label">AEO 현실성</span><p>schema와 AI 생성 콘텐츠가 검색·AI 답변 노출을 보장하지 않습니다. 공식성, 실제 사용자에게 보이는 정확한 콘텐츠, 기술적 수집 가능성, 출처와 지속 업데이트를 개선하고 노출·유입·전환을 측정합니다.</p></div></section>
<section id="aeo-security"><div class="ch-head"><span class="ch-code">10</span><h2>배포 전 보안 검증</h2></div>
<table><tr><th>시험</th><th>공격·실수 입력</th><th>기대 결과</th></tr><tr><td>Locale</td><td><code>/../../</code>, 미지원 언어, encoded path</td><td>allowlist된 locale만 처리, 404·안전 fallback</td></tr><tr><td>Preview</td><td>만료·변조 token, 다른 draft id</td><td>비공개 유지, 접근 로그</td></tr><tr><td>Authoring</td><td>script, iframe, event handler, 위험 URL</td><td>sanitize·거부, code 실행 없음</td></tr><tr><td>Upload</td><td>PHP 이중 확장자, SVG script, 초대형 이미지</td><td>형식·크기 거부, web 실행 불가</td></tr><tr><td>Authorization</td><td>작성자가 publish·template·한국어 원본 변경</td><td>403, 상태 불변, audit event</td></tr><tr><td>Cache</td><td>locale·preview·인증 상태 변경</td><td>draft·개인정보 혼합 없음</td></tr><tr><td>Secret</td><td>release package·log·HTML 검색</td><td>FTP·DB·API credential 없음</td></tr></table>
<div class="checklist"><strong>SECURITY RELEASE GATE</strong><ul><li>운영 전체와 DB backup·restore 증거가 있다.</li><li>블링크애드 계정은 PHP·DB·FTP·template을 수정할 수 없다.</li><li>AI 출력 sanitization과 의료 승인 revision이 확인됐다.</li><li>예약·예약확인·관리자·기존 한국어 경로가 회귀하지 않았다.</li><li>외부 script·analytics·개인정보 전송이 언어 페이지에서도 승인된 구성이다.</li><li>배포자, rollback 담당자, 병원 연락자가 배포 시간에 대기한다.</li></ul></div></section>
<section id="aeo-release"><div class="ch-head"><span class="ch-code">11</span><h2>운영 배포 — 기반과 콘텐츠를 분리한다</h2></div>
<h3><span class="h3-tag">11.1</span>1차 기반 배포</h3><ol><li>변경 동결 후 운영 파일·DB를 다시 backup하고 hash·timestamp를 기록한다.</li><li><code>/en/</code>, <code>/ja/</code> bootstrap, 공통 component, content schema, 권한을 배포한다.</li><li>언어 메뉴와 sitemap은 숨긴 채 secret preview URL로 운영 환경 검수한다.</li><li>기존 한국어 홈·대상 14페이지·예약·게시판·관리자 smoke test를 실행한다.</li><li>오류 로그, 5xx, PHP warning, DB slow·용량을 관찰한다.</li></ol>
<h3><span class="h3-tag">11.2</span>2차 콘텐츠 공개</h3><ol><li>승인된 revision id와 14페이지 URL matrix를 대조한다.</li><li>언어 selector, navigation, sitemap, hreflang을 활성화한다.</li><li>각 URL의 status, title, canonical, lang, structured data, CTA를 자동·수동 확인한다.</li><li>모바일 실제 기기에서 메뉴·표·이미지·예약 연결을 확인한다.</li><li>배포 후 1시간·24시간·7일에 오류·색인·트래픽·문의 이상을 검토한다.</li></ol>
<h3><span class="h3-tag">11.3</span>Rollback 판단</h3><table><tr><th>문제</th><th>우선 조치</th><th>복구</th></tr><tr><td>번역·의료 문구 오류</td><td>해당 revision unpublish</td><td>직전 approved revision</td></tr><tr><td>다국어 UI 깨짐</td><td>언어 메뉴·feature flag off</td><td>공통 component rollback</td></tr><tr><td>기존 한국어·예약 장애</td><td>즉시 다국어 entry 차단</td><td>파일 release rollback, 필요 시 DB roll-forward</td></tr><tr><td>개인정보·권한 노출</td><td>접근 차단·계정 revoke·증거 보존</td><td>incident 절차, 영향 조사 후 재개</td></tr></table></section>
<section id="aeo-operations"><div class="ch-head"><span class="ch-code">12</span><h2>블링크애드 지속 운영 절차</h2></div>
<table><tr><th>주기</th><th>블링크애드</th><th>하은·개발</th><th>병원</th></tr><tr><td>페이지별</td><td>brief·draft·출처·번역 검수</td><td>template 지원, 디자인·기술 QA</td><td>의학·광고 승인</td></tr><tr><td>월간</td><td>콘텐츠 신선도·검색·AI 노출 보고</td><td>오류·용량·취약점·계정 점검</td><td>변경된 진료정보 확인</td></tr><tr><td>분기</td><td>저성과·중복 페이지 정리 제안</td><td>restore test, 접근 검토, dependency patch</td><td>승인자·정책·수치 재검토</td></tr></table>
<h3><span class="h3-tag">12.1</span>콘텐츠 변경 등급</h3><ul><li><strong>Low:</strong> 오탈자·띄어쓰기 — 승인된 범위에서 빠른 발행</li><li><strong>Medium:</strong> 제목·CTA·이미지·메타 — preview와 디자인·검색 QA</li><li><strong>High:</strong> 치료법·수치·의료진·가격·후기·동의문 — 병원 재승인 필수</li><li><strong>Technical:</strong> template·script·schema·권한·폼 — 개발 변경 절차와 security gate</li></ul></section>
<section id="aeo-incident"><div class="ch-head"><span class="ch-code">13</span><h2>실패와 사고 대응</h2></div>
<table><tr><th>상황</th><th>즉시 조치</th><th>조사·재발 방지</th></tr><tr><td>AI 허위 의료정보 공개</td><td>unpublish, cache purge, 병원·블링크애드 통지</td><td>revision·승인 경로, source 필수 규칙 강화</td></tr><tr><td>Draft가 검색에 노출</td><td>접근 차단, noindex·삭제 요청</td><td>인증·sitemap·link 유출 경로 수정</td></tr><tr><td>작성 계정 탈취</td><td>session revoke, 계정 잠금, 변경 revision 격리</td><td>audit log, MFA·IP·권한 재검토</td></tr><tr><td>운영 파일 오배포</td><td>언어 entry 차단, 변경 동결</td><td>manifest 비교, 이전 release 복구</td></tr><tr><td>예약·개인정보 노출</td><td>endpoint 차단, 증거 보존, 접근 회수</td><td>영향 항목·대상·기간 조사, 신고·통지 검토</td></tr></table></section>
<section id="aeo-workbook"><div class="ch-head"><span class="ch-code">14</span><h2>실전 체크리스트와 그대로 쓰는 질문집</h2></div>
<p class="lede">아래 순서대로 진행합니다. 각 단계는 <strong>입력 자료 → 질문 → 실행 → 증빙 → 통과 조건</strong>으로 끝냅니다. 체크하지 못한 항목을 말로 넘기지 말고 담당자와 기한을 적은 미해결 항목으로 남깁니다.</p>

<h3><span class="h3-tag">D-01</span>킥오프 전에 만드는 프로젝트 관리표</h3>
<div class="checklist"><strong>PROJECT CONTROL SHEET</strong><ul><li>□ 병원 의사결정자, 의료 검수자, 개인정보 담당자, 기존 유지보수사 담당자의 이름·연락처를 기록했다.</li><li>□ 하은, 블링크애드 작성자, 블링크애드 발행 책임자의 역할과 대체 담당자를 기록했다.</li><li>□ 14개 대상 페이지마다 한국어 원본 URL, 영어 URL, 일본어 URL, 템플릿, CTA, 검수자, 목표일을 적었다.</li><li>□ 질문·결정·위험·변경 요청을 각각 번호로 관리한다.</li><li>□ 파일 전달 장소와 승인 채널을 하나로 정했다. 메신저 답변만으로 최종 승인하지 않는다.</li></ul></div>
<table><tr><th>관리표</th><th>필수 열 예시</th><th>완료 판단</th></tr><tr><td>연락망</td><td>역할, 이름, 조직, 연락수단, 대응시간, 대체자</td><td>배포 시간에 승인·복구 담당자에게 연락 가능</td></tr><tr><td>URL Matrix</td><td>ID, KO 원본, EN, JA, 유형, 상태, revision, 승인자</td><td>14페이지에 빈 소유자·상태가 없음</td></tr><tr><td>Decision Log</td><td>번호, 질문, 선택지, 결정, 결정자, 날짜, 영향</td><td>구두 결정이 재현 가능한 기록으로 남음</td></tr><tr><td>Risk Register</td><td>위험, 가능성, 영향, 예방, 대응, 소유자, 기한</td><td>High 위험에 담당자와 처리기한 존재</td></tr></table>
<div class="semantic-card"><span class="sc-label">킥오프 요청문 예시</span><br>“공식 홈페이지 다국어 운영환경을 안전하게 구성하기 위해 현재 시스템과 권한을 먼저 확인하려 합니다. 아래 질문은 서버를 변경하기 위한 것이 아니라 기존 운영에 영향을 주지 않는 배포·복구 방법을 확정하기 위한 것입니다. 확인되지 않는 항목은 ‘모름’으로 표시해 주시고, 기존 유지보수사 확인이 필요한 항목은 담당자와 회신 예정일을 함께 적어 주세요.”</div>

<h3><span class="h3-tag">D-02</span>병원·기존 유지보수사에 보내는 상세 질문</h3>
<table><tr><th>분류</th><th>복사해서 사용할 질문</th><th>왜 필요한가</th></tr><tr><td>소유권</td><td>도메인, 호스팅, SSL, DNS, 소스 저장소, DB의 계약 명의와 실제 관리자는 누구인가요?</td><td>퇴사·계약 종료 후에도 병원이 통제할 수 있는지 확인</td></tr><tr><td>서버</td><td>호스팅사와 상품명, OS·웹서버·PHP·DB 버전, document root와 용량 제한을 알려주세요.</td><td>호환성·지원 종료·배포 제약 판단</td></tr><tr><td>접속</td><td>FTP, FTPS, SFTP, SSH 중 무엇을 지원하며 계정별 경로·IP·기간 제한이 가능한가요?</td><td>평문 FTP와 공용 계정 사용 방지</td></tr><tr><td>소스</td><td>운영 파일과 동일한 원본은 어디에 있으며 마지막 배포 날짜·담당자·변경 목록은 무엇인가요?</td><td>오래된 백업본 위에 덮어쓰는 사고 방지</td></tr><tr><td>구조</td><td>공통 header/footer, rewrite, 관리자, 게시판, 예약 기능의 진입 파일과 include 관계를 설명해 주세요.</td><td>공통 파일 수정의 영향 범위 확인</td></tr><tr><td>DB</td><td>다국어 콘텐츠를 저장할 수 있는 기존 구조가 있나요? 운영 DB 복제·마스킹·별도 계정 발급이 가능한가요?</td><td>개인정보 복제와 과도한 DB 권한 방지</td></tr><tr><td>백업</td><td>파일·DB 자동 백업 주기, 보존기간, 저장 위치와 가장 최근 복구 테스트 일시는 언제인가요?</td><td>‘백업 있음’과 ‘복구 가능’을 구분</td></tr><tr><td>연동</td><td>예약, 문자, 메일, 결제, 지도, 채널톡, 분석, 광고 script의 계정 소유자와 테스트 방법은 무엇인가요?</td><td>스테이징에서 실발송·운영 데이터 오염 방지</td></tr><tr><td>보안</td><td>관리자 URL, MFA, IP 제한, 계정 잠금, 접속 로그, 최근 침해·악성코드 이력이 있나요?</td><td>기존 위험을 신규 작업 탓으로 오인하지 않게 기준선 확보</td></tr><tr><td>개인정보</td><td>예약·문의에서 수집하는 항목, 저장 위치, 보존기간, 열람자, 파기 절차는 무엇인가요?</td><td>다국어 페이지가 새 수집 경로를 만들지 판단</td></tr><tr><td>배포</td><td>배포 가능 시간, 사전 승인자, 금지 시간, 장애 판단 기준, 원복 담당자는 누구인가요?</td><td>기술 완료와 운영 승인 분리</td></tr></table>
<div class="callout risk"><span class="co-label">답변이 없을 때</span><p>호스팅·원본·백업·복구·배포 승인자 중 하나라도 확인되지 않으면 운영 서버 수정은 보류합니다. 로컬 분석과 스테이징 설계는 진행할 수 있지만, “일단 FTP로 올려 본다”를 확인 방법으로 사용하지 않습니다.</p></div>

<h3><span class="h3-tag">D-03</span>접속 계정 요청과 수령 직후 점검</h3>
<div class="semantic-card"><span class="sc-label">계정 요청문 예시</span><br>“공용 관리자 비밀번호 전달 대신 작업자 개인 계정을 요청드립니다. 가능하면 SFTP 또는 SSH, MFA, 접속 IP 제한을 적용하고 작업 종료일을 만료일로 설정해 주세요. 필요한 범위는 스테이징 경로 읽기·쓰기와 배포 시 승인된 운영 경로이며, DB 최고 권한과 다른 고객사 경로 권한은 필요하지 않습니다. 비밀번호는 메신저 본문이 아닌 승인된 비밀 전달 수단으로 공유해 주세요.”</div>
<div class="checklist"><strong>ACCESS RECEIPT</strong><ul><li>□ 계정이 사람별로 분리됐고 공유 계정이 아니다.</li><li>□ 초기 비밀번호를 변경하고 가능한 계정은 MFA를 등록했다.</li><li>□ 접속 프로토콜이 SFTP·SSH 또는 최소 FTPS인지 확인했다.</li><li>□ 허용 경로 밖 파일과 다른 서비스에 접근할 수 없는지 확인했다.</li><li>□ DB 계정은 필요한 schema와 명령만 허용한다.</li><li>□ credential을 소스, 문서, 브라우저 메모, 메신저에 평문 저장하지 않았다.</li><li>□ 발급자·사용자·권한·발급일·만료일·회수자를 Access Register에 기록했다.</li><li>□ 작업 종료·담당자 변경 시 즉시 회수하는 절차가 있다.</li></ul></div>

<h3><span class="h3-tag">D-04</span>백업과 복구 리허설</h3>
<ol><li>운영 파일, DB, 업로드 파일, rewrite·환경설정, cron·권한 정보를 같은 기준시각으로 확보한다.</li><li>원본은 수정하지 않고 읽기 전용 보관본과 복구 시험용 사본을 분리한다.</li><li>백업 파일명, 생성시각, 크기, hash, 암호화 여부, 보관 위치, 담당자를 기록한다.</li><li>격리된 스테이징에 복원하고 DB 연결값·절대경로·도메인·발송 연동을 테스트 값으로 바꾼다.</li><li>홈, 주요 진료페이지, 게시판, 관리자, 예약 입력 직전까지 기능을 확인한다. 실제 문자·메일은 발송하지 않는다.</li><li>소요시간과 실패 지점을 기록하고 RTO·RPO를 병원과 합의한다.</li></ol>
<table><tr><th>복구 확인 질문</th><th>합격 증빙</th></tr><tr><td>어느 시점까지 데이터가 돌아오는가?</td><td>백업 기준시각과 합의한 RPO</td></tr><tr><td>장애 후 몇 분 안에 이전 화면을 복구할 수 있는가?</td><td>실제 리허설 시작·종료시각과 RTO</td></tr><tr><td>파일만 되돌리면 DB schema가 맞는가?</td><td>release별 migration·rollback 순서</td></tr><tr><td>누가 원복을 명령하고 누가 실행하는가?</td><td>승인자와 실행자 이름·연락처</td></tr><tr><td>백업이 웹 URL로 내려받아지지 않는가?</td><td>외부 접근 실패 결과와 보관 권한</td></tr></table>
<div class="callout warn"><span class="co-label">중단 조건</span><p>DB 백업이 없거나, 복원 시 개인정보가 그대로 노출되거나, 운영본과 소스 원본의 차이를 설명할 수 없으면 배포 준비 완료로 처리하지 않습니다.</p></div>

<h3><span class="h3-tag">D-05</span>다국어 구조 결정 회의</h3>
<table><tr><th>결정 질문</th><th>권장 답</th><th>기록할 예외</th></tr><tr><td>언어 URL은 무엇인가?</td><td>영어 <code>/en/</code>, 일본어 <code>/ja/</code></td><td>기존 색인 URL·캠페인 URL·예약 연동</td></tr><tr><td>slug는 번역하는가?</td><td>영문 소문자·하이픈 규칙을 먼저 고정</td><td>일본어 slug 요구와 redirect 정책</td></tr><tr><td>언어가 없는 페이지는?</td><td>임의 번역 fallback 대신 명확한 미제공 처리</td><td>언어 홈 이동 또는 404 선택</td></tr><tr><td>한국어 원본 변경 시 번역은?</td><td>번역본을 stale 상태로 표시하고 재검수</td><td>오탈자 같은 Low 변경 예외</td></tr><tr><td>예약 CTA는 어디로 가는가?</td><td>언어 지원이 검증된 경로만 연결</td><td>한국어 예약으로 이동 시 사전 안내</td></tr><tr><td>작성 저장소는?</td><td>실행 코드와 분리된 구조화 콘텐츠</td><td>기존 관리자 확장 불가 시 대안</td></tr></table>
<div class="checklist"><strong>ARCHITECTURE GATE</strong><ul><li>□ URL 규칙, locale allowlist, redirect·404 정책이 문서화됐다.</li><li>□ 콘텐츠, template, upload, revision, audit log의 저장 위치가 정해졌다.</li><li>□ 작성자·검수자·발행자의 상태 전이 권한이 표로 정리됐다.</li><li>□ 개인정보가 필요한 기능과 단순 정보 페이지가 분리됐다.</li><li>□ 새 구조가 기존 한국어 include·session·cookie·cache에 미치는 영향을 검토했다.</li></ul></div>

<h3><span class="h3-tag">D-06</span>스테이징 구축 작업표</h3>
<table><tr><th>순서</th><th>실행 항목</th><th>확인 방법</th></tr><tr><td>1</td><td>별도 hostname 또는 격리 경로 생성</td><td>운영 URL과 물리·설정 경계 기록</td></tr><tr><td>2</td><td>Basic Auth 또는 조직 인증, 가능하면 IP 제한</td><td>로그아웃 브라우저·외부망에서 접근 실패</td></tr><tr><td>3</td><td>검색 차단</td><td>인증 + noindex + sitemap 제외를 모두 확인</td></tr><tr><td>4</td><td>운영 DB 대신 복제·마스킹 DB 연결</td><td>실제 환자 이름·전화번호 검색 결과 0건</td></tr><tr><td>5</td><td>메일·문자·예약·webhook 비활성 또는 sandbox화</td><td>테스트 요청이 운영 담당자에게 도착하지 않음</td></tr><tr><td>6</td><td>분석·광고·채널 스크립트 개발 모드 적용</td><td>운영 property에 staging event 없음</td></tr><tr><td>7</td><td>PHP·DB·rewrite·extension을 운영과 일치</td><td>환경 비교표와 차이별 영향 기록</td></tr><tr><td>8</td><td>오류 로그와 접근 로그 활성화</td><td>민감정보 없이 요청·오류 추적 가능</td></tr></table>
<div class="semantic-card"><span class="sc-label">스테이징 검수 질문</span><br>“이 URL을 검색엔진이나 외부인이 발견해도 내용을 볼 수 없는가?”, “테스트 예약이 실제 환자 데이터나 알림 시스템에 섞이지 않는가?”, “운영과 다른 설정 때문에 스테이징에서만 성공할 가능성은 없는가?” 세 질문에 증빙으로 답하지 못하면 완료가 아닙니다.</div>

<h3><span class="h3-tag">D-07</span>블링크애드 교육과 첫 페이지 실습</h3>
<ol><li>교육용 페이지 하나를 만들고 작성자 계정으로 로그인한다.</li><li>한국어 원문, 출처, locale, slug, page type을 입력한다.</li><li>허용 component만 조합해 AI 초안을 붙여 넣고 저장한다.</li><li>script·iframe·외부 링크·잘못된 이미지 업로드가 차단되는 모습을 함께 확인한다.</li><li>preview URL을 발급하고 다른 사용자·만료 후 접근이 거절되는지 확인한다.</li><li>의료 검수 반려, 수정, 재승인, revision 잠금 과정을 한 번 완주한다.</li><li>발행 권한이 없는 작성자가 publish할 수 없음을 확인한다.</li></ol>
<div class="checklist"><strong>작성자가 발행 요청 전에 확인</strong><ul><li>□ 모든 의료 주장·수치·약력에 병원 원문 또는 승인된 출처 ID가 있다.</li><li>□ 번역하지 않은 문장, 임시 문구, “Lorem ipsum”, AI 주석이 없다.</li><li>□ 치료 효과를 보장하거나 경쟁 병원과 비교하는 표현이 없다.</li><li>□ 실제 제공하지 않는 언어 지원·진료·가격·예약 방법을 만들지 않았다.</li><li>□ 이미지 사용권, 인물 동의, alt와 caption의 언어가 확인됐다.</li><li>□ 내부 링크는 같은 언어 URL을 우선하며 404가 없다.</li><li>□ title, description, 요약, CTA, FAQ를 입력했다.</li><li>□ 개인정보나 계정정보를 AI prompt와 콘텐츠에 넣지 않았다.</li></ul></div>
<div class="semantic-card"><span class="sc-label">반려 의견 예시</span><br>“번역 품질 보완”처럼 모호하게 쓰지 않습니다. “EN-HERNIA-03의 두 번째 치료 섹션에서 성공률 95%의 출처가 없습니다. 수치를 제거하거나 병원 승인 문서 ID를 연결한 뒤 의료 검수를 다시 요청해 주세요.”처럼 페이지 ID, 위치, 문제, 필요한 조치를 적습니다.</div>

<h3><span class="h3-tag">D-08</span>페이지 1개당 디자인·콘텐츠 QA</h3>
<table><tr><th>영역</th><th>상세 확인 항목</th></tr><tr><td>콘텐츠</td><td>원문 의미, 의료 용어, 숫자·단위·날짜, 의사명·직함, 운영시간, 주소·전화, 면책·동의 문구</td></tr><tr><td>레이아웃</td><td>320px·375px·768px·desktop, 긴 제목, 버튼 2줄, 표 overflow, 일본어 줄바꿈, 확대 200%</td></tr><tr><td>접근성</td><td>heading 순서, keyboard focus, label, alt, 색 대비, skip·landmark, 오류 안내</td></tr><tr><td>기능</td><td>언어 selector, breadcrumb, CTA, 전화·지도·예약, 내부/외부 링크, back·refresh</td></tr><tr><td>검색</td><td>status, lang, title, description, canonical, hreflang, OG, schema, sitemap 포함 여부</td></tr><tr><td>보안</td><td>HTML 정화, 외부 script, mixed content, upload, preview 권한, cache, 로그의 개인정보</td></tr><tr><td>성능</td><td>과대 이미지, layout shift, font, 중복 script, 모바일 로딩, 기존 페이지 대비 회귀</td></tr></table>
<div class="checklist"><strong>페이지 승인 기록</strong><ul><li>□ 페이지 ID와 정확한 preview URL</li><li>□ 승인 대상 revision 또는 commit ID</li><li>□ PC·모바일 캡처와 테스트 기기·브라우저</li><li>□ 콘텐츠·의료·디자인·기술 검수자와 승인시각</li><li>□ 남은 예외와 공개 후 확인할 항목</li><li>□ 승인 이후 콘텐츠가 변경되지 않았다는 diff 결과</li></ul></div>

<h3><span class="h3-tag">D-09</span>배포 전날과 당일의 분 단위 Runbook</h3>
<table><tr><th>시점</th><th>내가 하는 일</th><th>Go 조건</th></tr><tr><td>D-1</td><td>변경 범위·승인 revision·URL matrix·담당자·배포창 확정</td><td>미승인 High 콘텐츠 0건</td></tr><tr><td>T-60분</td><td>변경 동결 공지, 운영 health·용량·오류율 기준선 기록</td><td>기존 장애 없음</td></tr><tr><td>T-45분</td><td>파일·DB backup과 복원 명령·담당자 재확인</td><td>새 backup의 크기·hash 확인</td></tr><tr><td>T-30분</td><td>release package·manifest·환경값·권한을 staging 결과와 대조</td><td>credential·임시 파일 없음</td></tr><tr><td>T-15분</td><td>병원 승인자, 유지보수사, rollback 담당자 대기 확인</td><td>연락 불가 담당자 없음</td></tr><tr><td>T</td><td>기반 배포 후 비공개 운영 preview 실행</td><td>PHP·5xx·DB 오류 없음</td></tr><tr><td>T+10분</td><td>한국어 홈·예약·게시판·관리자 우선 smoke test</td><td>핵심 기존 기능 정상</td></tr><tr><td>T+20분</td><td>EN·JA 대표 URL, auth, cache, metadata, CTA 검사</td><td>release gate 전부 통과</td></tr><tr><td>T+30분</td><td>메뉴·hreflang·sitemap 공개</td><td>최종 Go 승인 기록</td></tr><tr><td>T+60분</td><td>로그·404·5xx·실사용 화면·분석 이벤트 확인</td><td>이상 없거나 영향 경미</td></tr></table>
<div class="semantic-card"><span class="sc-label">Go 승인 질문</span><br>“현재 승인된 revision만 포함됐습니까?”, “기존 한국어 사이트와 예약 기능이 정상입니까?”, “5분 안에 언어 메뉴를 내리고 직전 release로 복구할 수 있습니까?”, “병원 최종 승인자가 공개에 동의했습니까?” 네 질문 모두 ‘예’이고 증빙 링크가 있을 때만 공개합니다.</div>
<div class="callout risk"><span class="co-label">즉시 NO-GO</span><p>백업 확인 실패, 승인본과 diff 발생, 운영 credential 포함, 예약·관리자 장애, 예상하지 못한 DB migration, rollback 담당자 부재, 환자정보 노출 중 하나라도 있으면 배포를 멈춥니다. 일정 지연보다 복구 불가능한 배포가 더 큰 실패입니다.</p></div>

<h3><span class="h3-tag">D-10</span>배포 후 관찰과 운영 인수</h3>
<div class="checklist"><strong>POST-RELEASE</strong><ul><li>□ 1시간: 5xx·PHP warning·404·로그인 실패·예약 오류·잘못된 언어 cache를 확인했다.</li><li>□ 24시간: sitemap 수집, canonical·hreflang, analytics 분리, 문의·예약 흐름을 확인했다.</li><li>□ 7일: 색인 상태, 실제 검색 유입, 깨진 링크, 번역·의료 피드백을 검토했다.</li><li>□ 블링크애드가 신규 draft 생성·수정·반려 대응을 직접 수행했다.</li><li>□ 병원이 승인 이력과 공개 revision을 조회할 수 있다.</li><li>□ 임시 계정·preview token·로컬 backup·테스트 데이터를 회수 또는 폐기했다.</li><li>□ 알려진 문제와 다음 개선일을 운영 backlog에 기록했다.</li></ul></div>

<h3><span class="h3-tag">D-11</span>사고 접수 시 묻는 질문과 기록 양식</h3>
<table><tr><th>순서</th><th>질문</th><th>기록</th></tr><tr><td>1. 확인</td><td>무엇이, 어느 URL에서, 언제 처음 발견됐으며 지금도 재현되는가?</td><td>신고자, 시각, URL, 캡처, request ID</td></tr><tr><td>2. 범위</td><td>EN·JA만인가, 한국어·예약·관리자·개인정보에도 영향이 있는가?</td><td>영향 페이지·사용자·데이터·기간</td></tr><tr><td>3. 차단</td><td>페이지 unpublish, 메뉴 차단, 계정 회수 중 가장 작은 안전 조치는 무엇인가?</td><td>실행자, 명령·조치, 실행시각</td></tr><tr><td>4. 보존</td><td>어떤 로그·revision·파일 hash를 보존해야 하는가?</td><td>증거 위치와 접근자</td></tr><tr><td>5. 통지</td><td>병원·블링크애드·유지보수사·개인정보 담당자 중 누구에게 언제 알릴 것인가?</td><td>통지 대상·내용·시각</td></tr><tr><td>6. 복구</td><td>안전한 마지막 revision은 무엇이며 복구 후 무엇을 검증할 것인가?</td><td>복구 버전과 QA 결과</td></tr><tr><td>7. 재개</td><td>원인이 제거됐고 같은 문제가 재현되지 않는다는 증거는 무엇인가?</td><td>재개 승인자와 후속 과제</td></tr></table>
<div class="semantic-card"><span class="sc-label">첫 사고 공지 예시</span><br>“10월 6일 14:20 EN 진료 페이지의 잘못된 의료 수치를 확인해 14:27 해당 revision을 비공개 처리했습니다. 현재 한국어 페이지와 예약 기능의 영향은 확인되지 않았습니다. 로그와 승인 이력을 보존해 범위를 조사 중이며, 다음 업데이트는 15:30까지 공유하겠습니다. 확인 전에는 해당 페이지를 재발행하지 않습니다.”</div>

<h3><span class="h3-tag">D-12</span>최종 완료 판정</h3>
<div class="checklist"><strong>DEFINITION OF DONE</strong><ul><li>□ 블링크애드 작성자는 서버 credential 없이 EN·JA 초안을 생성하고 안전하게 preview할 수 있다.</li><li>□ 작성자에게 PHP·template·DB·한국어 원본·사용자 관리 권한이 없다.</li><li>□ 의료·번역·디자인·기술 승인과 revision이 서로 연결된다.</li><li>□ 14페이지 URL Matrix의 상태·담당자·metadata·출처가 모두 채워졌다.</li><li>□ 기존 한국어, 예약, 게시판, 관리자 회귀 테스트가 통과했다.</li><li>□ 배포 package와 승인본이 같고, 재현 가능한 배포·원복 기록이 있다.</li><li>□ 실제 복구 시험과 사고 연락 훈련을 최소 한 번 수행했다.</li><li>□ 운영 매뉴얼 교육 후 블링크애드가 도움 없이 샘플 페이지 한 개를 완주했다.</li><li>□ 병원 소유 계정과 데이터가 외주사 개인 계정에 종속되지 않는다.</li><li>□ 임시 접근권한·미리보기·개인정보 사본의 종료 처리가 완료됐다.</li></ul></div>
<p>체크 결과는 <strong>완료 / 해당 없음(사유 필수) / 미완료(담당자·기한 필수)</strong> 중 하나로 기록합니다. 체크박스만 채운 문서보다 URL, 캡처, revision, 로그, 승인 기록 같은 증빙이 완료의 기준입니다.</p></section>
<section id="aeo-handover"><div class="ch-head"><span class="ch-code">PACK</span><h2>블링크애드에 전달할 운영 패키지</h2></div>
<div class="checklist"><strong>AEO OPERATIONS PACKET</strong><ul><li><code>/en/</code>, <code>/ja/</code> URL·template·component 규칙</li><li>작성자·발행자 계정 발급, MFA, 회수 절차</li><li>페이지 생성·수정·preview·승인·발행 매뉴얼</li><li>이미지 규격, alt, 의료 출처와 금지 HTML 규칙</li><li>14페이지 URL·metadata·hreflang·승인 상태 matrix</li><li>콘텐츠 변경 등급과 병원 재승인 조건</li><li>backup·release·rollback·unpublish runbook</li><li>오류 신고, 긴급 연락, incident escalation</li><li>알려진 제약·미해결 위험·차기 개선 backlog</li></ul></div>
<div class="callout"><span class="co-label">내 완료 조건</span><p>블링크애드가 운영 credential이나 PHP 지식 없이 안전하게 초안을 만들고 preview할 수 있고, 나는 승인된 revision을 재현 가능하게 디자인 마감·배포·복구할 수 있으며, 병원은 누가 어떤 의료 콘텐츠를 언제 승인했는지 확인할 수 있어야 합니다.</p></div></section>`,
};

export default document;
