import type { HandbookDocumentContent } from "../types";

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SECURITY · AGENCY OPS</div>
<div class="nav-title">병의원 PHP 호스팅 운영</div>
<a href="#clinic-scope"><span class="code">00</span>책임과 범위</a>
<a href="#clinic-trend"><span class="code">01</span>국내 제작 흐름</a>
<a href="#clinic-architecture"><span class="code">02</span>구조와 위협</a>
<a href="#clinic-build"><span class="code">03</span>신규 제작</a>
<a href="#clinic-wordpress"><span class="code">WP</span>WordPress 다국어</a>
<a href="#clinic-custom-php"><span class="code">PHP</span>자체 PHP 다국어</a>
<a href="#clinic-i18n-release"><span class="code">I18N</span>다국어 전환 배포</a>
<a href="#clinic-ftp"><span class="code">04</span>FTP·SFTP 게시</a>
<a href="#clinic-release"><span class="code">05</span>배포 절차</a>
<a href="#clinic-db"><span class="code">06</span>DB 관리</a>
<a href="#clinic-logs"><span class="code">07</span>로그·모니터링</a>
<a href="#clinic-privacy"><span class="code">08</span>개인정보·의료광고</a>
<a href="#clinic-maintenance"><span class="code">09</span>유지보수</a>
<a href="#clinic-incident"><span class="code">10</span>사고 대응</a>
<a href="#clinic-handover"><span class="code">PACK</span>인수인계</a>
<a href="#clinic-sources"><span class="code">REF</span>공식 자료</a>`,
  mainHtml: `<header class="hero">
<div class="hero-serial"><span>DOC : CLINIC-PHP-HOSTING</span><span>SCOPE : PHP · CAFE24 · GABIA · FTP/SFTP · DB · PRIVACY</span><span>LANG : KO</span></div>
<h1>병의원 홈페이지를<br>안전하게 만들고 운영하는 법</h1>
<p class="hero-sub">웹에이전시가 PHP 기반 병의원 사이트를 공유 웹호스팅에 신규 제작·게시·유지보수할 때 필요한 실무 가이드입니다. 호스팅 상품과 계약에 따라 기능이 다르므로 실제 관리 콘솔과 최신 약관을 함께 확인합니다.</p>
<div class="hero-meta">AGENCY DELIVERY · SHARED HOSTING · UPDATED 2026-10</div>
</header>
<section id="clinic-scope"><div class="ch-head"><span class="ch-code">00</span><h2>먼저 책임과 시스템 경계를 확정한다</h2></div>
<p class="lede">“홈페이지 유지보수”라는 말만으로는 보안 책임이 정해지지 않습니다. 도메인, DNS, 호스팅, SSL, 소스, DB, 예약정보, 광고 문구, 분석 도구의 소유자와 변경 권한을 계약 전에 표로 만듭니다.</p>
<table><tr><th>자산</th><th>권장 소유자</th><th>에이전시 책임</th><th>반드시 기록할 것</th></tr><tr><td>도메인·DNS</td><td>병의원 법인·대표 계정</td><td>설정 대행, 변경 증거</td><td>등록자, 만료일, 복구 연락처, MFA</td></tr><tr><td>호스팅</td><td>병의원 명의 계정</td><td>배포·백업·장애 대응</td><td>상품, 서버 환경, 만료·용량, 지원 채널</td></tr><tr><td>소스·디자인</td><td>계약에 명시</td><td>버전 관리와 납품</td><td>저작권, 라이선스, 저장소, 최종본</td></tr><tr><td>환자 문의·예약 DB</td><td>병의원 개인정보처리자</td><td>수탁 범위 내 처리</td><td>항목, 목적, 보존, 접근자, 파기</td></tr><tr><td>의료광고 콘텐츠</td><td>의료기관</td><td>게시 workflow와 이력</td><td>검토·승인자, 심의 여부, 게시 기간</td></tr></table>
<div class="callout risk"><span class="co-label">계정 소유권</span><p>에이전시 개인 이메일로 도메인과 호스팅을 만들면 계약 종료·담당자 퇴사·분쟁 시 복구가 어려워집니다. 병의원이 소유하고 에이전시는 별도 작업 계정 또는 필요한 기간의 접근권한을 받는 구조가 안전합니다.</p></div></section>
<section id="clinic-trend"><div class="ch-head"><span class="ch-code">01</span><h2>한국 웹에이전시의 일반적인 제작 흐름</h2></div>
<p class="lede">아래는 법적 표준이 아니라 국내 중소 병의원·지역 사업자 사이트에서 자주 만나는 실무 패턴입니다. 프로젝트 규모와 예약·EMR 연동 여부에 따라 달라집니다.</p>
<table><tr><th>영역</th><th>자주 쓰이는 방식</th><th>실무상 이유</th><th>보안 주의</th></tr><tr><td>구축</td><td>PHP 템플릿, WordPress, 자체 관리자</td><td>공유호스팅 호환, 빠른 납기, 운영자 수정</td><td>플러그인·테마 공급망, 오래된 PHP, 임의 관리자</td></tr><tr><td>화면</td><td>모바일 우선 반응형, 진료과·의료진·장비·오시는 길</td><td>모바일 검색과 전화·지도 전환</td><td>과도한 tracking, 외부 script, 개인정보 노출</td></tr><tr><td>유입</td><td>네이버 검색·지도, 지역 SEO, SNS·블로그 연결</td><td>국내 지역 기반 탐색</td><td>광고 문구 승인, 가짜 후기·치료경험담 위험</td></tr><tr><td>전환</td><td>전화, 카카오 채널, 간편 문의·예약</td><td>상담 연결을 단순화</td><td>건강정보 최소 수집, 외부 위탁·국외 이전 확인</td></tr><tr><td>배포</td><td>카페24·가비아형 Linux 웹호스팅에 FTP/SFTP</td><td>낮은 비용, 관리 콘솔 제공</td><td>직접 운영 수정, staging 부재, 평문 FTP</td></tr></table>
<h3><span class="h3-tag">1.1</span>기술 선택 체크</h3><ul><li>호스팅이 지원하는 PHP·DB 버전, extension, cron, SSH·SFTP, rewrite, SSL, 메일 발송 조건을 계약 전에 확인한다.</li><li>WordPress를 쓰면 core·plugin·theme의 업데이트 owner와 보안 업데이트 SLA를 견적에 포함한다.</li><li>자체 PHP는 framework·dependency manager 사용 여부, autoload·document root 분리 가능 여부를 확인한다.</li><li>EMR 연동이나 진료기록 처리가 필요하면 단순 홈페이지와 분리해 별도 보안·법률 검토를 수행한다.</li></ul></section>
<section id="clinic-architecture"><div class="ch-head"><span class="ch-code">02</span><h2>공유호스팅 구조와 위협 모델</h2></div>
<div class="semantic-card"><span class="sc-label">REQUEST PATH</span><br>환자 브라우저 → DNS → HTTPS 웹서버 → PHP application → MySQL/MariaDB → 메일·문자·지도·분석 등 외부 서비스</div>
<table><tr><th>경계</th><th>공격·실수</th><th>통제</th></tr><tr><td>관리자·FTP 계정</td><td>공유 비밀번호, 퇴사자 접근, credential 탈취</td><td>개별 계정·MFA 가능 여부, IP 제한, SFTP, 주기적 회수</td></tr><tr><td>Web root</td><td><code>.env</code>, backup, log, SQL dump 공개</td><td>문서 루트 밖 저장 또는 web deny, 배포 전 금지 파일 scan</td></tr><tr><td>PHP</td><td>upload webshell, SQLi, XSS, CSRF, include 취약점</td><td>검증·prepared statement·출력 인코딩·CSRF·upload 격리</td></tr><tr><td>DB</td><td>과도한 권한, 공개 phpMyAdmin, 문의정보 장기 보관</td><td>최소 권한, 접근 제한, 암호화·보존·파기</td></tr><tr><td>외부 태그</td><td>analytics·chat script 침해와 개인정보 전송</td><td>목록화, 최소화, CSP, 계약·처리방침 반영</td></tr></table>
<div class="callout warn"><span class="co-label">공유호스팅의 제약</span><p>서버 OS, Apache 전체 설정, 중앙 로그, WAF, agent 설치 권한이 없을 수 있습니다. 필요한 보안 통제를 상품이 제공하지 않으면 “설정으로 해결”하지 말고 상위 상품·managed service·별도 서버 이전을 위험 처리안으로 검토합니다.</p></div></section>
<section id="clinic-build"><div class="ch-head"><span class="ch-code">03</span><h2>신규 제작 시 안전한 기본값</h2></div>
<h3><span class="h3-tag">3.1</span>PHP·애플리케이션</h3><ul><li>지원 중인 PHP 버전과 유지되는 framework·CMS를 선택하고 버전 변경 전 staging 호환성 테스트를 한다.</li><li>SQL은 prepared statement를 사용하고, 관리자 입력도 신뢰하지 않으며 출력 문맥별 HTML·attribute·URL 인코딩을 적용한다.</li><li>파일 업로드는 허용 확장자·MIME·magic byte·크기·이미지 재처리를 검토하고 실행 불가 위치와 무작위 파일명에 저장한다.</li><li>운영에서는 상세 오류와 stack trace를 숨기고 사용자에게 request id만 제공한다.</li><li>관리자 URL을 숨기는 데 의존하지 말고 강한 인증, rate limit, session 보호, 권한 분리를 적용한다.</li></ul>
<h3><span class="h3-tag">3.2</span>문의·예약 폼</h3><ul><li>목적에 필요한 최소 항목만 수집한다. 단순 상담에 주민등록번호, 상세 병력, 진단서 파일을 요구하지 않는다.</li><li>필수·선택 항목, 수집 목적, 보유 기간, 동의 거부 영향을 명확히 분리한다.</li><li>메일로 문의 원문 전체를 전송하면 여러 mailbox에 민감정보가 복제된다. 관리자 알림에는 최소 정보만 두고 보호된 화면에서 확인하는 방식을 우선한다.</li><li>spam 방어는 rate limit, honeypot, 위험 기반 CAPTCHA를 조합하고 CAPTCHA vendor의 데이터 처리도 확인한다.</li></ul>
<h3><span class="h3-tag">3.3</span>운영 관리자</h3><p>콘텐츠 편집자, 상담 담당자, 최고 관리자를 분리하고 필요한 메뉴만 허용합니다. 의료진 정보·수가·이벤트·후기·팝업 변경은 작성자와 승인자를 남기며, 삭제 대신 게시 기간과 변경 이력을 관리합니다.</p></section>
<section id="clinic-wordpress"><div class="ch-head"><span class="ch-code">WP</span><h2>WordPress 사이트에 다국어를 추가하는 경우</h2></div>
<p class="lede">WordPress에서는 다국어 플러그인이 URL과 콘텐츠 연결을 빠르게 만들어주지만, 기존 테마·페이지 빌더·custom post type·예약 플러그인까지 자동으로 안전하게 번역해 주지는 않습니다. 운영 복제본에서 호환성과 데이터 구조를 먼저 확인합니다.</p>
<h3><span class="h3-tag">WP-1</span>백업본 판별과 복원</h3><ol><li><code>wp-config.php</code>, <code>wp-content</code>, core 파일과 전체 DB dump가 있는지 확인한다.</li><li>관리자에서 WordPress core, PHP, 활성 theme, plugin, page builder, custom field와 예약·메일 플러그인 버전을 inventory로 만든다.</li><li>운영과 동일한 PHP·DB 버전의 staging에 복원하고 <code>home</code>·<code>siteurl</code>, serialized URL을 안전한 도구로 변경한다. SQL 문자열 치환은 serialized data를 깨뜨릴 수 있다.</li><li>메일·문자·예약 webhook, analytics, 검색 색인을 차단한 뒤 기존 한국어 기능을 기준선으로 테스트한다.</li></ol>
<h3><span class="h3-tag">WP-2</span>다국어 방식 선택</h3>
<table><tr><th>방식</th><th>적합한 경우</th><th>주의점</th></tr><tr><td>WPML</td><td>복잡한 custom field·상용 theme·번역 workflow</td><td>라이선스, 호환 addon, DB 증가, uninstall 이후 데이터</td></tr><tr><td>Polylang</td><td>페이지·글·taxonomy 중심의 비교적 단순한 사이트</td><td>상용 기능 필요 여부, builder·custom field 연결</td></tr><tr><td>TranslatePress</td><td>화면을 보면서 문자열을 번역하는 운영</td><td>동적 문자열, SEO addon, DB 저장량과 성능</td></tr><tr><td>Multisite</td><td>언어별 운영팀·콘텐츠·설정이 크게 다른 경우</td><td>중복 관리, plugin·사용자·배포 복잡도</td></tr></table>
<p>플러그인 이름만으로 결정하지 말고 기존 theme·builder·예약 plugin의 공식 호환 여부, 언어별 slug·SEO, 번역 승인 workflow, 라이선스 갱신과 제거 가능성을 작은 복제본에서 시험합니다.</p>
<h3><span class="h3-tag">WP-3</span>구현 순서</h3><ol><li>URL은 가능하면 <code>/ko/</code>, <code>/en/</code> 같은 하위 경로로 정하고 기본 언어 URL 변경에 따른 redirect 영향을 결정한다.</li><li>페이지, 글, 의료진, 진료과, taxonomy, custom field, 메뉴, widget, popup, form, email을 번역 대상으로 등록한다.</li><li>한국어 원본과 번역본의 연결 관계를 만들고 번역이 없는 페이지의 fallback 정책을 정한다.</li><li>언어별 title·description·slug, canonical, hreflang, sitemap을 확인한다.</li><li>관리자에게 언어별 작성 → 의료 검토 → 승인 → 게시 권한과 절차를 안내한다.</li></ol>
<h3><span class="h3-tag">WP-4</span>예약·개인정보·미디어</h3><ul><li>폼 label만 번역하지 말고 validation, 동의문, 관리자 알림, 자동 회신, 저장 DB를 모두 확인한다.</li><li>언어별 폼이 서로 다른 개인정보 항목을 수집하지 않는지 비교한다.</li><li>이미지를 복제할지 공유할지 결정하고 언어별 alt·caption·이미지 내부 문구를 검수한다.</li><li>번역 API·서비스로 환자 문의나 관리자 private post가 전송되지 않는지 확인한다.</li></ul>
<h3><span class="h3-tag">WP-5</span>업데이트와 롤백</h3><p>다국어 plugin 설치 전 파일·DB를 함께 백업합니다. plugin 비활성화만으로 DB schema와 번역 관계가 원상복구되지 않을 수 있으므로 전체 DB restore 또는 검증된 제거 절차를 준비합니다. 운영 배포 후에는 core·theme·builder·다국어 plugin 조합을 하나의 호환 단위로 관리합니다.</p>
<div class="checklist"><strong>WORDPRESS I18N GATE</strong><ul><li>운영 복제 staging과 전체 파일·DB backup이 있다.</li><li>theme·builder·form·custom field의 다국어 호환성을 확인했다.</li><li>모든 언어의 메뉴·폼·메일·SEO·404를 검증했다.</li><li>번역 승인자와 플러그인 라이선스·업데이트 owner가 있다.</li><li>플러그인 설치 전 상태로 돌아가는 DB 복원 테스트를 했다.</li></ul></div></section>
<section id="clinic-custom-php"><div class="ch-head"><span class="ch-code">PHP</span><h2>자체 제작 PHP 사이트에 다국어를 추가하는 경우</h2></div>
<p class="lede">자체 PHP에서는 다국어가 페이지 복사 작업이 아니라 URL routing, 번역 리소스, DB 모델, 관리자 workflow, SEO 계약을 추가하는 개발입니다. PHP 파일마다 한국어와 영어 조건문을 흩뿌리지 말고 locale을 요청 context로 중앙화합니다.</p>
<h3><span class="h3-tag">PHP-1</span>기존 구조 조사</h3><ul><li>front controller, router, template, DB access, 관리자 CRUD가 분리돼 있는지 확인한다.</li><li>본문이 PHP 파일, DB, JSON, editor HTML 중 어디에 저장되는지 콘텐츠 유형별로 분류한다.</li><li>절대 URL, 한국어 문자열, 이미지 경로, mail template, validation message를 검색해 번역 범위를 만든다.</li><li>문자 인코딩을 UTF-8과 DB <code>utf8mb4</code>로 통일하고 connection charset도 확인한다.</li></ul>
<h3><span class="h3-tag">PHP-2</span>Locale과 routing</h3><pre class="snippet-card"><code>// 요청 URL에서 허용된 locale만 선택한다.
$supported = ['ko', 'en', 'ja'];
$locale = in_array($routeLocale, $supported, true) ? $routeLocale : 'ko';

// 사용자가 보낸 lang 값을 include 경로로 직접 사용하지 않는다.
$messages = require __DIR__ . '/lang/' . $locale . '.php';</code></pre>
<ul><li><code>/ko/clinic</code>, <code>/en/clinic</code>처럼 locale이 포함된 canonical URL을 둔다.</li><li>query·cookie·브라우저 언어는 최초 제안에만 쓰고, 허용 목록 밖 locale은 404 또는 명시된 fallback으로 처리한다.</li><li><code>?lang=../../config</code> 같은 입력이 파일 include로 이어지지 않도록 locale과 template 이름을 allowlist한다.</li><li>현재 한국어 페이지와 대응 번역 페이지를 stable content id로 연결한다.</li></ul>
<h3><span class="h3-tag">PHP-3</span>UI 문자열과 콘텐츠를 분리한다</h3><table><tr><th>대상</th><th>저장 방식</th><th>예시</th></tr><tr><td>짧은 UI 문자열</td><td>locale별 PHP array·JSON</td><td>메뉴, 버튼, validation, 상태명</td></tr><tr><td>페이지 콘텐츠</td><td><code>page_translations</code> 같은 DB 테이블</td><td>진료과, 의료진, 장비, 공지</td></tr><tr><td>메일·문자</td><td>locale별 versioned template</td><td>예약 접수·취소·관리자 알림</td></tr><tr><td>SEO</td><td>번역 row의 별도 field</td><td>slug, title, description, OG text</td></tr></table>
<pre class="snippet-card"><code>page_translations
- page_id        # 언어가 달라도 같은 콘텐츠 식별자
- locale         # ko, en, ja
- slug           # locale 안에서 unique
- title
- body
- seo_title
- seo_description
- status         # draft, review, published
- approved_by
- published_at</code></pre>
<p>언어가 두 개로 영구 고정된 작은 사이트는 <code>title_ko</code>·<code>title_en</code> 컬럼도 가능하지만, 언어·콘텐츠 종류가 늘면 schema 변경과 관리자 중복이 커집니다. 번역 테이블 방식은 locale unique constraint와 원본 연결을 명확히 해야 합니다.</p>
<h3><span class="h3-tag">PHP-4</span>Fallback과 출력 보안</h3><ul><li>번역이 없을 때 원문 노출, 비공개, 언어 홈 이동 중 하나를 콘텐츠 유형별로 정한다.</li><li>번역문도 외부 입력이므로 HTML editor 허용 태그 sanitization과 출력 문맥별 인코딩을 적용한다.</li><li>번역자가 script·iframe·임의 link를 게시할 수 있는지 권한을 검토한다.</li><li>locale별 cache key를 분리해 한국어 개인정보 응답이 다른 언어 사용자에게 재사용되지 않게 한다.</li></ul>
<h3><span class="h3-tag">PHP-5</span>Expand–Migrate–Contract 관리자와 migration</h3><ol><li>새 번역 테이블을 추가하되 기존 한국어 조회가 계속 동작하는 expand migration을 배포한다.</li><li>기존 한국어 콘텐츠를 <code>ko</code> 번역 row로 batch backfill하고 row count·checksum을 검증한다.</li><li>BE가 구·신 구조를 모두 처리하는 기간을 둔 뒤 관리자에 언어 tab과 draft·review·publish 상태를 추가한다.</li><li>영문 콘텐츠 승인 후 route와 language selector를 feature flag로 공개한다.</li><li>구 컬럼 제거는 모든 화면·cron·메일·export의 전환이 증명된 뒤 별도 배포로 수행한다.</li></ol>
<div class="checklist"><strong>CUSTOM PHP I18N GATE</strong><ul><li>locale allowlist와 URL·fallback 정책이 있다.</li><li>UI 문자열, DB 콘텐츠, 메일, SEO 번역이 분리돼 있다.</li><li>번역 HTML sanitization과 locale별 cache key를 검증했다.</li><li>backfill row count·encoding·rollback 또는 roll-forward 절차가 있다.</li><li>관리자 작성·검토·승인·게시 이력이 남는다.</li></ul></div></section>
<section id="clinic-i18n-release"><div class="ch-head"><span class="ch-code">I18N</span><h2>운영 백업에서 다국어 공개까지</h2></div>
<table><tr><th>단계</th><th>WordPress</th><th>자체 PHP</th><th>공통 완료 조건</th></tr><tr><td>1. 조사</td><td>theme·plugin·builder inventory</td><td>router·template·DB·문자열 inventory</td><td>기존 기능과 개인정보 흐름을 설명 가능</td></tr><tr><td>2. 복제</td><td>파일+DB, serialized URL 안전 변경</td><td>파일+DB, 운영 설정·연동 분리</td><td>staging이 운영 DB·메일을 사용하지 않음</td></tr><tr><td>3. 기반</td><td>다국어 plugin과 URL 설정</td><td>locale routing·resource·번역 table</td><td>한국어 사이트 회귀 없음</td></tr><tr><td>4. 콘텐츠</td><td>post·field·menu·form 연결</td><td>backfill·관리자 번역 workflow</td><td>의료 문구와 개인정보 동의 승인</td></tr><tr><td>5. 검증</td><td>plugin 호환·cache·SEO</td><td>encoding·query·cache·migration</td><td>언어별 폼·메일·hreflang·모바일 통과</td></tr><tr><td>6. 공개</td><td>언어 메뉴·sitemap 활성화</td><td>feature flag·route 활성화</td><td>rollback 가능, 로그·검색 상태 관찰</td></tr></table>
<h3><span class="h3-tag">I18N-1</span>공통 QA 시나리오</h3><ul><li>한국어 상세 페이지에서 언어를 바꾸면 대응하는 같은 콘텐츠로 이동한다.</li><li>번역이 없는 페이지는 정한 fallback대로 동작하며 잘못된 200 빈 페이지를 만들지 않는다.</li><li>각 언어의 canonical·hreflang·sitemap과 HTML <code>lang</code>이 일치한다.</li><li>다국어 이름·전화번호·주소·emoji를 저장해도 DB와 관리자·메일에서 깨지지 않는다.</li><li>문의 동의문과 실제 수집 항목, 관리자 알림, 보존·삭제가 언어별로 동일하다.</li><li>이전 한국어 URL과 검색 유입, 공유 링크, 예약 제출이 그대로 동작한다.</li></ul>
<h3><span class="h3-tag">I18N-2</span>공개 순서</h3><ol><li>운영 파일·DB를 다시 백업하고 복원 지점을 기록한다.</li><li>DB·plugin schema처럼 전후 호환되는 기반부터 적용한다.</li><li>다국어 코드와 asset을 배포하되 언어 메뉴는 아직 숨긴다.</li><li>운영 환경에서 비공개 URL로 병의원 담당자의 최종 콘텐츠 검수를 받는다.</li><li>언어 메뉴, sitemap, 검색 등록을 활성화하고 404·5xx·폼 실패·색인을 집중 관찰한다.</li></ol>
<div class="callout risk"><span class="co-label">ROLLBACK 경계</span><p>코드만 되돌려도 plugin·DB가 이전 상태로 돌아가지는 않습니다. WordPress는 plugin 설치 전 전체 DB 복원점을, 자체 PHP는 호환 migration과 roll-forward 절차를 우선 준비합니다. 번역 콘텐츠가 운영 중 수정됐다면 과거 DB 전체 복원이 새 데이터를 지울 수 있으므로 복구 단위를 사전에 정합니다.</p></div></section>
<section id="clinic-ftp"><div class="ch-head"><span class="ch-code">04</span><h2>FTP/SFTP로 서버에 게시하는 프로세스</h2></div>
<p class="lede">가능하면 암호화된 <strong>SFTP(일반적으로 SSH 기반, port 22)</strong>를 사용합니다. 전통적 FTP(port 21)는 자격증명과 데이터가 평문으로 노출될 수 있으므로 호스팅이 SFTP를 지원하면 우선 선택합니다. FTPS와 SFTP는 서로 다른 프로토콜입니다.</p>
<h3><span class="h3-tag">4.1</span>접속 준비</h3><ol><li>병의원 소유 관리 콘솔에서 작업용 접속 계정·비밀번호를 발급하고 가능하면 접속 IP·기간을 제한한다.</li><li>호스트, protocol, port, remote document root, 계정 권한을 공식 콘솔에서 확인한다. 검색 결과나 과거 메신저 값만 믿지 않는다.</li><li>FileZilla 등 client의 site manager에 protocol을 명시하고 host key 또는 certificate 경고가 바뀌면 즉시 중단한다.</li><li>비밀번호를 개인 메모·메일·메신저에 평문 보관하지 않고 승인된 password manager를 사용한다.</li></ol>
<h3><span class="h3-tag">4.2</span>업로드 전 패키지</h3><pre class="snippet-card"><code>release-2026-10-06/
├─ public files                 # 실제 게시 파일
├─ manifest.sha256              # 파일 무결성
├─ changed-files.txt            # 변경 목록
├─ db-migration/                # 별도 승인·실행
├─ rollback/                    # 이전 버전 또는 복구 절차
└─ release-notes.md             # 영향·검증·담당자</code></pre>
<ul><li><code>.git</code>, <code>.env</code>, IDE 설정, test fixture, local log, SQL dump, backup archive, 원본 디자인 파일을 제외한다.</li><li>운영 설정은 별도로 관리하며 로컬 설정 파일 전체를 덮어쓰지 않는다.</li><li>upload·cache·session directory와 사용자가 생성한 파일은 코드 배포에서 삭제하지 않는다.</li></ul>
<h3><span class="h3-tag">4.3</span>원자적 게시가 어려운 환경</h3><p>파일을 하나씩 덮어쓰면 PHP와 asset이 서로 다른 버전인 순간이 생깁니다. symlink release 전환이 지원되지 않는 공유호스팅에서는 유지보수 화면, 저트래픽 시간, 신규 파일 선업로드, entry file 마지막 교체를 조합합니다. 단, 관리자의 로그인 세션과 예약 제출 중인 사용자를 고려해 중단 공지를 결정합니다.</p>
<table><tr><th>순서</th><th>작업</th><th>실패 시</th></tr><tr><td>1</td><td>원격 전체와 DB를 별도 위치에 백업하고 복원 가능성 확인</td><td>배포 중단</td></tr><tr><td>2</td><td>신규 asset·새 이름의 PHP 파일부터 업로드</td><td>미참조 파일 제거</td></tr><tr><td>3</td><td>설정·권한·경로 확인, migration 별도 실행</td><td>roll-forward 또는 DB 복원 판단</td></tr><tr><td>4</td><td>entry·route·HTML을 마지막에 전환</td><td>이전 entry 복원</td></tr><tr><td>5</td><td>HTTPS·폼·관리자·로그 smoke test</td><td>유지보수 화면·rollback</td></tr></table></section>
<section id="clinic-release"><div class="ch-head"><span class="ch-code">05</span><h2>실제 배포 Runbook</h2></div>
<h3><span class="h3-tag">5.1</span>배포 전날</h3><ul><li>병의원 담당자가 콘텐츠·의료광고 문구·개인정보 수집 항목을 최종 승인한다.</li><li>호스팅 용량, inode, 트래픽, PHP·DB 버전, SSL 만료, 자동연장을 확인한다.</li><li>전체 파일·DB backup과 복원 절차, rollback owner, 연락망을 준비한다.</li><li>운영과 동일한 PHP 버전에서 핵심 화면, 문의·예약, 관리자, 메일·문자를 검증한다.</li></ul>
<h3><span class="h3-tag">5.2</span>배포 당일</h3><ol><li>변경 동결과 배포 시작을 알리고 접속자·진행자·승인자를 기록한다.</li><li>직전 backup timestamp와 크기를 확인한다.</li><li>FTP/SFTP changed-files 목록과 migration을 각각 실행한다.</li><li>홈, 진료과, 의료진, 오시는 길, 개인정보처리방침, 404·500을 확인한다.</li><li>문의·예약을 test 정보로 제출해 DB 저장, 관리자 조회, 알림, 삭제까지 확인한다.</li><li>모바일·데스크톱, 대표 브라우저와 HTTPS redirect·mixed content·보안 헤더를 확인한다.</li><li>배포 파일 hash, DB migration version, 검증 결과, 남은 위험을 release log에 남긴다.</li></ol>
<div class="callout risk"><span class="co-label">NO-GO</span><p>백업·복원 경로 없음, 운영 자격증명 공유, SSL 오류, 개인정보 동의 누락, 문의 데이터 공개, 관리자 인증 우회, 의료광고 승인 미확인, 운영 DB에 검증되지 않은 destructive query가 있으면 배포를 중단합니다.</p></div></section>
<section id="clinic-db"><div class="ch-head"><span class="ch-code">06</span><h2>DB 배포·백업·개인정보 관리</h2></div>
<h3><span class="h3-tag">6.1</span>DB 변경</h3><ul><li>phpMyAdmin에서 즉흥 수정하지 않고 migration SQL을 저장소와 release packet에 남긴다.</li><li>운영 계정과 migration 계정을 분리할 수 없다면 작업 직후 비밀번호 변경과 권한 회수를 검토한다.</li><li>DDL 전 table size, lock, timeout, disk 여유를 확인한다. 대량 update는 작은 batch와 checkpoint로 실행한다.</li><li>row count, null·duplicate, 외래키, 한글 인코딩, timezone을 전후 비교한다.</li></ul>
<h3><span class="h3-tag">6.2</span>백업 원칙</h3><table><tr><th>백업</th><th>주기 예시</th><th>주의점</th></tr><tr><td>호스팅 자동 backup</td><td>상품 정책 확인</td><td>보존 기간·복원 단위·고객 실수 복구 범위를 확인</td></tr><tr><td>배포 직전 수동 backup</td><td>모든 DB 변경 전</td><td>timestamp·hash·암호화·복원 담당자 기록</td></tr><tr><td>별도 off-site backup</td><td>위험과 계약에 따라</td><td>호스팅 계정 침해·해지와 분리, 개인정보 저장 위치 관리</td></tr></table>
<p>backup 성공 메시지만으로 충분하지 않습니다. 격리된 환경에서 정기적으로 restore하고 애플리케이션이 실제 데이터를 읽는지 확인합니다. 문의·예약정보의 보존 기간이 끝나면 운영 DB뿐 아니라 export와 backup의 처리 정책도 마련합니다.</p>
<h3><span class="h3-tag">6.3</span>사례 — 운영 DB를 로컬 개발용으로 복사</h3><div class="callout warn"><span class="co-label">COMMON FAILURE</span><p>장애 재현을 위해 예약 DB dump를 개발자 노트북에 내려받으면 이름·전화번호·증상 정보가 통제 밖으로 복제됩니다. 최소 fixture나 masking된 사본을 만들고, 불가피한 접근은 승인·암호화·접근기록·즉시 파기를 적용합니다.</p></div></section>
<section id="clinic-logs"><div class="ch-head"><span class="ch-code">07</span><h2>로그·모니터링·용량 관리</h2></div>
<table><tr><th>로그</th><th>남길 것</th><th>남기지 않을 것</th></tr><tr><td>접근 로그</td><td>시간, method, path pattern, status, bytes, request id</td><td>query의 전화번호·예약내용·reset token</td></tr><tr><td>애플리케이션</td><td>오류 code, 기능, request id, 처리 결과</td><td>비밀번호, session id, 전체 POST body</td></tr><tr><td>관리자 감사</td><td>actor, action, 대상 id, before/after, 시간</td><td>불필요한 민감정보 원문</td></tr><tr><td>배포</td><td>release id, 파일 hash, migration, 작업자, 결과</td><td>FTP·DB credential</td></tr></table>
<h3><span class="h3-tag">7.1</span>공유호스팅에서 볼 지표</h3><ul><li>5xx 증가, PHP fatal error, 문의 제출 실패, 관리자 로그인 실패</li><li>disk·DB 용량, inode, 월 트래픽, backup 생성 실패</li><li>인증서 만료, domain·hosting 만료, DNS 변경</li><li>비정상 PHP 파일 생성, upload directory 실행 파일, 갑작스러운 대량 메일</li></ul>
<p>로그 접근 기능과 보존 기간은 상품별로 다릅니다. 필요한 감사 범위를 제공하지 못하면 애플리케이션 audit log와 외부 uptime·error monitoring을 보완하되, 외부 서비스로 전송되는 개인정보를 먼저 검토합니다.</p></section>
<section id="clinic-privacy"><div class="ch-head"><span class="ch-code">08</span><h2>병의원 개인정보와 의료광고</h2></div>
<div class="callout risk"><span class="co-label">법률 자문 대체 아님</span><p>건강정보는 개인정보 보호법상 민감정보에 해당할 수 있습니다. 실제 수집·위탁·국외 이전·보존·의료광고 심의 의무는 현재 법령, 서비스 구성, 게시 매체에 따라 병의원 개인정보보호 담당자와 전문 자문으로 확인합니다.</p></div>
<h3><span class="h3-tag">8.1</span>개인정보 처리 체크</h3><ul><li>처리방침에 수집 항목, 목적, 보유 기간, 파기, 수탁자, 외부 서비스, 정보주체 권리를 실제 구성과 일치시킨다.</li><li>건강·증상·진료과·사진처럼 민감할 수 있는 항목을 일반 연락처와 구분하고 별도 동의 필요성을 검토한다.</li><li>analytics, 지도, CAPTCHA, 채팅, 문자, 메일 서비스로 어떤 정보가 전송되는지 inventory를 만든다.</li><li>상담 직원·에이전시 개발자·호스팅 지원 인력의 접근을 업무별로 제한하고 종료 시 회수한다.</li><li>접속기록 보관·위변조 방지, 전송·저장 암호화, 악성코드 방지 등 안전조치를 적용 범위에 맞게 설계한다.</li></ul>
<h3><span class="h3-tag">8.2</span>의료광고 게시 workflow</h3><ol><li>문구·이미지·전후사진·후기·비급여 가격·이벤트의 작성자를 기록한다.</li><li>거짓·과장, 치료효과 보장, 환자 치료경험담, 비교·비방, 부작용 누락 위험을 내부 검토한다.</li><li>게시 매체와 내용이 사전심의 대상인지 해당 의료광고 자율심의기구 또는 전문 담당자에게 확인한다.</li><li>승인본 hash·캡처·심의번호·게시 기간을 보관하고 개발자가 임의로 문구를 고치지 않는다.</li><li>기간 종료 이벤트와 오래된 의료진·가격·진료시간을 자동 또는 정기적으로 내린다.</li></ol></section>
<section id="clinic-maintenance"><div class="ch-head"><span class="ch-code">09</span><h2>월간·분기 유지보수 운영</h2></div>
<table><tr><th>주기</th><th>작업</th><th>증거</th></tr><tr><td>매 변경</td><td>backup, changed-files, 승인, smoke test, release log</td><td>ticket·hash·검증 캡처</td></tr><tr><td>매월</td><td>CMS·plugin·PHP 보안 공지, 관리자·FTP 계정, 용량·SSL·오류 확인</td><td>maintenance report</td></tr><tr><td>분기</td><td>복원 훈련, 개인정보·외부 script inventory, 권한 검토, 취약점 점검</td><td>restore log·access review</td></tr><tr><td>연간·계약 갱신</td><td>도메인·호스팅·SSL·라이선스, 위탁 계약, 비상 연락망 점검</td><td>renewal register</td></tr></table>
<h3><span class="h3-tag">9.1</span>긴급 보안 패치</h3><p>CMS·plugin의 악용 중인 취약점은 정기 일정까지 기다리지 않습니다. 영향 확인 → backup → staging 또는 최소 호환 테스트 → 즉시 패치·기능 비활성화 → webshell·관리자·로그 조사 → 병의원 보고 순서로 처리합니다. 자동 업데이트는 무조건 켜거나 끄지 말고 rollback 가능성과 패치 지연 위험을 비교해 정책화합니다.</p></section>
<section id="clinic-incident"><div class="ch-head"><span class="ch-code">10</span><h2>침해·오배포 사고 대응</h2></div>
<table><tr><th>상황</th><th>즉시 조치</th><th>조사</th></tr><tr><td>홈페이지 변조·webshell</td><td>유지보수 전환, FTP·관리자·DB credential 교체, 의심 파일 격리</td><td>파일 mtime·hash, access log, 신규 관리자, 외부 통신</td></tr><tr><td>예약정보 노출</td><td>노출 endpoint 차단, 접근권한 회수, 증거 보존</td><td>노출 항목·대상·기간·다운로드 범위, 신고·통지 검토</td></tr><tr><td>잘못된 DB migration</td><td>쓰기 중단, 추가 변경 금지, 상태 snapshot</td><td>영향 row, backup 시점, roll-forward·restore 선택</td></tr><tr><td>FTP credential 유출</td><td>비밀번호 변경·session 종료·접속 제한</td><td>접속 IP·시간, 변경 파일, 파생 secret</td></tr></table>
<p>사고 시 깨끗한 backup을 바로 덮어쓰면 공격 증거와 최초 침해 시점을 잃을 수 있습니다. 가능한 범위에서 로그와 의심 파일을 별도 보존하고, credential을 전면 교체한 뒤 known-good source로 재배포합니다.</p></section>
<section id="clinic-handover"><div class="ch-head"><span class="ch-code">PACK</span><h2>병의원 인수인계 패킷</h2></div>
<div class="checklist"><strong>DELIVERY &amp; OPERATIONS PACKET</strong><ul><li>도메인·DNS·호스팅·SSL 소유권과 만료 일정</li><li>소스 저장소, release tag, dependency·라이선스 목록</li><li>PHP·DB 환경, directory·권한, cron·메일·외부 연동</li><li>FTP/SFTP·관리자·DB 계정 발급·회수 절차</li><li>개인정보 inventory, 처리방침, 위탁·외부 script 목록</li><li>의료광고 승인·심의 자료와 콘텐츠 게시 이력</li><li>backup·restore, 배포·rollback, 장애·침해 runbook</li><li>최근 배포·유지보수·취약점·미해결 위험 기록</li></ul></div></section>
<section id="clinic-sources"><div class="ch-head"><span class="ch-code">REF</span><h2>공식 자료와 확인 위치</h2></div>
<ul><li><a href="https://help.cafe24.com/faq/web-hosting/introduce/setup-management/ftp_sftp_connection_filezilla" target="_blank" rel="noreferrer">카페24 FTP/SFTP 접속 안내</a> — 실제 port·접속 허용 설정은 사용 상품 콘솔에서 재확인</li><li><a href="https://help.cafe24.com/faq/web-hosting/introduce/setup-management/ai-coding-tools-web-hosting-guide" target="_blank" rel="noreferrer">카페24 웹호스팅 개발 환경 안내</a> — PHP·Apache 환경과 배포 제약 확인</li><li><a href="https://customer.gabia.com/manual/hosting" target="_blank" rel="noreferrer">가비아 웹호스팅 매뉴얼</a> — FTP/SFTP/SSH, DB, backup·restore 기능 확인</li><li><a href="https://www.law.go.kr/법령/개인정보보호법" target="_blank" rel="noreferrer">국가법령정보센터 개인정보 보호법</a> — 건강정보·민감정보와 안전조치의 현재 조문 확인</li><li><a href="https://www.privacy.go.kr" target="_blank" rel="noreferrer">개인정보 포털</a> — 보건의료 데이터, 처리방침, 유출 대응·안전조치 안내서 확인</li><li><a href="https://www.mohw.go.kr" target="_blank" rel="noreferrer">보건복지부</a> — 의료광고 준수사항과 최신 제도 확인</li><li><a href="https://searchadvisor.naver.com/guide" target="_blank" rel="noreferrer">네이버 서치어드바이저</a> — 국내 검색 수집·SEO 기본 가이드</li></ul></section>`,
};

export default document;
