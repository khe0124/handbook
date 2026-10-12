import type { HandbookDocumentContent } from "../types";

type Case = [name: string, vulnerable: string, safe: string, flow: string, falsePositive: string, retest: string];

const groups: Array<[string, Case[]]> = [
  ["입력데이터 검증 및 표현", [
    ["SQL 삽입", `sql = "SELECT * FROM member WHERE id='" + request.id + "'"; execute(sql);`, `prepare("SELECT * FROM member WHERE id=?").bind(request.id).execute();`, "request.id → SQL 문자열 → DB 실행", "외부값은 전부 bind되고 동적 열 이름은 server enum으로만 선택됨을 확인", "' OR '1'='1, 주석, 빈값, Unicode 인용부호"],
    ["코드 삽입", `result = eval(request.expression);`, `result = allowedOperations[request.operation](validatedNumber);`, "expression → eval/interpreter", "실행 문자열이 상수이고 외부값은 숫자 인자로만 전달됨", "함수호출·속성접근·구분자·중첩 표현식"],
    ["경로 조작 및 자원 삽입", `read(base + request.fileName);`, `target = realPath(base, serverFileId); assertWithin(base,target); read(target);`, "fileName → 경로 결합 → 파일 접근", "opaque ID를 server mapping하며 canonical 경계를 모든 경로에서 검사", "../, encoding, 절대경로, symlink, 타인 file ID"],
    ["크로스사이트 스크립트", `html = "<p>" + request.keyword + "</p>";`, `html = "<p>" + encodeHtml(request.keyword) + "</p>";`, "keyword → HTML 응답 → browser 해석", "template auto-escape가 유지되고 raw/unsafe sink가 없음", "HTML 본문·속성·URL·JavaScript 문맥별 payload"],
    ["운영체제 명령어 삽입", `exec("convert " + request.file + " out.png");`, `spawn(CONVERT_BIN, [validatedServerPath, outputPath], { shell:false });`, "file → shell 명령 → OS 실행", "명령은 상수이고 외부값이 shell 문법이 아닌 검증된 argv로 전달", "; | && $() 개행, option injection"],
    ["위험한 형식 파일 업로드", `save(webRoot + upload.originalName, upload.bytes);`, `bytes=validateAndReencode(upload); save(privateRoot, randomName(), bytes, NO_EXEC);`, "업로드 bytes/name → 공개 실행경로", "실제 내용검증·서버명·격리저장·실행금지가 모두 적용", "이중확장자, MIME 위조, SVG script, polyglot, 압축폭탄"],
    ["신뢰되지 않는 URL 주소로 자동접속 연결", `response.redirect(request.next);`, `response.redirect(routeByKey[request.nextKey] ?? "/");`, "next → Location → 사용자 browser 이동", "상대 내부경로 key만 선택하며 protocol-relative URL이 불가능", "https://evil, //evil, user@host, encoded scheme"],
    ["부적절한 XML 외부 개체 참조", `parser.setFeature(EXTERNAL_ENTITIES, true); parse(request.xml);`, `parser.disableDTD(); parser.disableExternalEntities(); parser.disableNetwork(); parseLimited(request.xml);`, "XML → DTD/entity 해석 → 파일·network", "사용 parser의 DTD·entity·network 차단 설정과 실제 runtime version을 확인", "file entity, HTTP entity, billion laughs, 큰 XML"],
    ["XML 삽입", `xpath("//user[id='" + request.id + "']");`, `xpath("//user[id=$id]").bind("id", request.id);`, "id → XPath/XQuery 구조 → XML 조회", "변수 binding되고 동적 node명은 허용목록 상수", "인용부호, or 조건, wildcard, 상위 node 접근"],
    ["LDAP 삽입", `search("(uid=" + request.user + ")");`, `search("(uid=" + escapeLdapFilter(request.user) + ")", BASE_DN, ONE_LEVEL);`, "user → LDAP filter → directory 조회", "filter/DN 문맥에 맞는 escape와 고정 base/scope가 적용", "*, ), \\00, DN 구분자, 과다 결과"],
    ["크로스사이트 요청 위조", `POST /account/email relies only on sessionCookie;`, `requireCsrfToken(); verifyOrigin(); authorizeCurrentUser(); changeEmail();`, "공격자 page → 피해자 browser cookie → 상태변경", "cookie 자동인증을 사용하지 않거나 token·Origin이 모든 변경 endpoint에 적용", "token 누락·변조·재사용, 타 Origin, GET 변경"],
    ["서버사이드 요청 위조", `body = http.get(request.url);`, `target=resolveApprovedTarget(request.targetId); denyPrivateIp(target); http.get(target,{redirect:"revalidate"});`, "URL → server HTTP client → 내부망", "사용자는 등록 ID만 선택하고 DNS·redirect·egress까지 제한", "loopback, IPv6, decimal IP, DNS rebinding, redirect"],
    ["HTTP 응답분할", `response.setHeader("Location", request.next);`, `assertNoCrLf(request.next); response.redirect(approvedRelativePath(request.next));`, "입력 → HTTP header → 응답 경계", "framework가 CR/LF를 거부하며 값이 허용된 상대경로", "CR, LF, CRLF encoding, 중복 header"],
    ["정수형 오버플로우", `int bytes = request.count * itemSize; allocate(bytes);`, `long bytes=checkedMultiply(validRange(request.count),itemSize); assertMax(bytes);`, "count → 산술 → 크기·메모리 결정", "입력 상한과 checked arithmetic이 형변환 전 적용", "0, -1, MAX, MAX+1, 곱셈 경계"],
    ["보안기능 결정에 사용되는 부적절한 입력값", `if (request.role == "ADMIN") allowDelete();`, `if (session.user.hasPermission("DELETE", resource)) allowDelete();`, "client role → 보안결정", "client 값은 식별 후보일 뿐 결정은 server 신뢰 저장소에서 재계산", "role/userId/price/verified hidden field 변조"],
    ["메모리 버퍼 오버플로우", `char dst[16]; strcpy(dst, request.name);`, `copyBounded(dst, sizeof(dst), request.name); rejectIfTruncated();`, "입력 길이 → 고정 buffer 복사", "안전 container/API와 명시적 길이·종료 처리를 확인", "15·16·17 bytes, multibyte, 종료문자 없음"],
    ["포맷 스트링 삽입", `printf(request.message);`, `printf("%s", request.message);`, "message → format interpreter", "format 문자열은 compile-time 상수이고 입력은 data 인자", "%x, %s, %n, 위치 지정자, 긴 폭"],
  ]],
  ["보안기능", [
    ["적절한 인증 없는 중요기능 허용", `router.post("/admin/delete", deleteUser);`, `router.post("/admin/delete", requireAuth, requireRecentAuth, deleteUser);`, "무인증 요청 → 중요기능", "공통 middleware가 default-deny로 모든 route·method·구버전 API에 적용", "비로그인, 만료·변조 token, 직접 URL, 다른 method"],
    ["부적절한 인가", `order = find(request.orderId); return order;`, `order = findByIdAndOwnerAndTenant(request.orderId, session.userId, session.tenantId);`, "인증 사용자+객체 ID → 타인 자원", "조회조건과 service 정책이 actor-resource-action을 강제", "타 사용자·타 tenant·일반→관리자·batch ID"],
    ["중요한 자원에 대한 잘못된 권한 설정", `chmod(secretFile, 0777); bucket.publicRead = true;`, `chmod(secretFile, 0600); bucket.blockPublicAccess(); bindServiceRole(leastPrivilege);`, "과도한 파일·cloud·DB 권한 → 비인가 접근", "배포 후 실제 권한 readback과 계정별 접근시험 증거", "익명·다른 service account의 read/write/list"],
    ["취약한 암호화 알고리즘 사용", `cipher = DES_ECB(key); ciphertext=cipher.encrypt(data);`, `cipher = approvedAEAD(key, uniqueNonce()); ciphertext=cipher.encrypt(data);`, "중요정보 → 약한 algorithm/mode", "기관 정책의 승인 library·mode와 migration 완료를 확인", "ciphertext 변조, nonce 재사용, legacy data"],
    ["암호화되지 않은 중요정보", `db.save({password, residentNo}); http.send(profile);`, `db.save({passwordHash:kdf(password), residentNo:encrypt(residentNo)}); https.send(profile);`, "중요정보 → 저장·전송 평문", "저장·backup·log·cache·내부전송 전 구간의 보호 확인", "DB dump, log, backup, HTTP, message queue 검색"],
    ["하드코드된 중요정보", `const DB_PASSWORD="Prod!234";`, `const DB_PASSWORD=secretManager.get("prod/db/password");`, "source/binary → credential 노출", "runtime 주입과 최소권한을 확인하고 과거 key는 폐기·재발급", "Git history, image layer, source map, error log"],
    ["충분하지 않은 키 길이 사용", `rsa.generateKeyPair(1024);`, `rsa.generateKeyPair(policy.requiredBits("RSA"));`, "짧은 key → brute force 보안강도 저하", "algorithm별 최신 정책과 인증서·data migration 계획 확인", "최소값-1·최소값, 기존 key rotation, 호환성"],
    ["적절하지 않은 난수 값 사용", `token = Math.random().toString();`, `token = base64url(osCSPRNG(32));`, "예측 PRNG → 인증 token/key", "OS CSPRNG를 사용하고 충분한 길이·일회성·만료 적용", "대량 token 중복, 재시작 후 반복, 만료·재사용"],
    ["취약한 비밀번호 허용", `if (password.length >= 6) accept();`, `enforceLengthAndBreachBlocklist(password); rateLimitReset();`, "약한 password → 추측·credential stuffing", "생성·변경·reset 모든 경로에 같은 server 정책 적용", "경계길이, 유출 password, 개인식별정보, reset 우회"],
    ["부적절한 전자서명 확인", `if (package.signature != null) execute(package);`, `verifySignature(package.bytes, package.signature, trustedSigner, policy);`, "서명 존재 → 검증 없이 실행", "신뢰 anchor·signer·서명 대상 bytes·algorithm·만료를 모두 검증", "payload/서명 변조, 다른 signer, 만료·폐기 key"],
    ["부적절한 인증서 유효성 검증", `tls.trustAll=true; hostnameVerifier=alwaysTrue;`, `tls.useSystemTrustStore(); tls.verifyHostname=true;`, "가짜 인증서 → TLS 상대 위장", "chain·hostname·기간 검증이 운영 profile에서도 활성", "self-signed, hostname mismatch, expired, unknown CA"],
    ["사용자 하드디스크에 저장되는 쿠키를 통한 정보 노출", `setCookie("AUTH", token, {maxAge:31536000});`, `setCookie("SID", opaqueId, {secure:true,httpOnly:true,sameSite:"Lax",session:true});`, "민감 cookie → 장기 client 저장", "민감정보 자체를 넣지 않고 server session·짧은 수명·속성 적용", "document.cookie, HTTP, 재부팅 후 잔존, logout replay"],
    ["주석문 안에 포함된 시스템 주요정보", `// prod admin: root / P@ssw0rd, 10.0.0.8`, `// Production credentials are injected by the secret manager.`, "주석·source history → 운영정보 노출", "현재 파일과 history를 조사하고 노출 secret을 rotation", "repository·artifact·source map·문서 전체 secret scan"],
    ["솔트 없이 일방향 해쉬 함수 사용", `hash = SHA256(password);`, `hash = passwordKdf(password, randomSalt(), policyCost);`, "password → 빠른 동일 hash", "사용자별 random salt와 password KDF·cost·migration 확인", "동일 password 두 계정, cost, 기존 hash upgrade"],
    ["무결성 검사 없는 코드 다운로드", `download(url,"plugin.jar"); execute("plugin.jar");`, `artifact=download(trustedRepo,id); verifySignature(artifact,trustedKey); execute(artifact);`, "외부 code → 검증 없이 실행", "신뢰 배포경로와 서명·digest가 실행 전에 fail-closed로 검증", "변조 artifact, 다른 signer, rollback version, network 실패"],
    ["반복된 인증시도 제한 기능 부재", `if (verifyPassword(user,pw)) login();`, `rateLimit(account,ip,device); delayFailures(); detectStuffing(); verifyPassword();`, "무제한 인증 → brute force", "계정·IP·device를 결합하고 안전한 잠금해제·감사 적용", "임계 전후, 분산 IP, 다계정, 계정열거"],
  ]],
  ["시간 및 상태", [
    ["경쟁조건: 검사 시점과 사용 시점(TOCTOU)", `if (isSafe(path)) open(path);`, `handle=openNoFollow(path); verifyHandle(handle); use(handle);`, "검사 대상 → 상태변경 → 다른 대상 사용", "원자 API·handle·transaction/lock으로 검사와 사용을 결합", "symlink 교체, 동시 update, transaction 충돌"],
    ["종료되지 않는 반복문 또는 재귀 함수", `while (request.more) process();`, `for (i=0; i<min(validCount,MAX_ITER); i++) processWithDeadline();`, "외부값 → 종료조건 → CPU/stack 고갈", "iteration·depth·시간·resource budget 상한 존재", "0, MAX, cyclic graph, timeout, 재귀 깊이"],
  ]],
  ["에러처리", [
    ["오류 메시지 정보노출", `catch(e){ response.send(e.stack + sql); }`, `catch(e){ id=logProtected(e); response.error("처리 실패",id); }`, "내부 예외 → 외부 응답", "상세정보는 보호 log에만 있고 외부 응답은 일관된 일반 메시지", "DB·파일·인증·type 오류와 운영 profile 응답 비교"],
    ["오류상황 대응 부재", `save(record); sendPayment(); return SUCCESS;`, `if(!save(record)) return rollbackAndFail(); if(!sendPayment()) compensateAndFail();`, "실패 반환값 무시 → 중요처리 계속", "모든 실패경로가 중단·rollback·보상 중 하나로 수렴", "DB timeout, API 500, 부분성공, disk full"],
    ["부적절한 예외 처리", `catch(Exception e){ return true; }`, `catch(Expected e){ recover(); } catch(Exception e){ cleanup(); throw withContext(e); }`, "예외 삼킴 → 성공 오인·상태왜곡", "처리 가능한 예외만 복구하고 나머지는 context를 보존해 전파", "예상/비예상 예외, cleanup 실패, transaction 상태"],
  ]],
  ["코드오류", [
    ["Null Pointer 역참조", `user=find(id); return user.name;`, `user=find(id); if(user==null) return notFound(); return user.name;`, "null 가능 반환 → 역참조 → crash", "반환 contract와 모든 분기의 null 처리 증명", "없는 ID, 삭제 직후, 외부 API null field"],
    ["부적절한 자원 해제", `stream=open(file); process(stream);`, `withResource(open(file), stream => process(stream));`, "예외경로 → stream/socket/connection 누수", "언어의 자동 자원관리와 pool 반환을 사용", "정상·중간예외·timeout 반복 후 resource 수"],
    ["해제된 자원 사용", `free(buffer); parse(buffer);`, `parse(buffer); free(buffer); buffer=null;`, "free/close 후 참조 → use-after-free", "소유권·수명·단일 해제와 참조 무효화 확인", "동시 callback, error path, double free"],
    ["초기화되지 않은 변수 사용", `int allowed; if(isAdmin) allowed=1; if(allowed) grant();`, `bool allowed=false; if(isAdmin) allowed=true; if(allowed) grant();`, "미정 값 → 권한·길이·분기 결정", "선언 시 안전 기본값과 모든 control path 대입", "조건 true/false, 조기 return, compiler warning"],
    ["신뢰할 수 없는 데이터의 역직렬화", `obj=nativeDeserialize(request.bytes); obj.run();`, `dto=parseJson(request.body, strictSchema, allowedTypes); service.run(dto);`, "불신 bytes → 객체/gadget 생성", "data-only schema·type 제한을 쓰고 native gadget 경로 제거", "예상외 type, 중첩, 큰 payload, 변조·구버전 객체"],
  ]],
  ["캡슐화", [
    ["잘못된 세션에 의한 데이터 정보 노출", `global.currentUserData = load(session.user); return global.currentUserData;`, `const data=loadForUser(session.userId); return scopedResponse(data);`, "공유 상태/cache key → 사용자 간 혼선", "요청·사용자·tenant별 상태와 cache key를 격리", "동시 사용자, 같은 이름 다른 tenant, logout/login 교차"],
    ["제거되지 않고 남은 디버그 코드", `if(request.debug) return dumpConfigAndUsers();`, `assertProductionBuildHasNoDebugRoutes();`, "debug flag/route → 내부정보·우회", "build gate와 운영 profile default-off·접근차단을 모두 확인", "debug parameter, hidden route, test account, source map"],
    ["Public 메소드부터 반환된 Private 배열", `public byte[] getKey(){ return this.key; }`, `public byte[] getKey(){ return copyOf(this.key); }`, "내부 mutable 배열 참조 → 외부 변경", "방어적 복사 또는 immutable view를 반환", "반환 배열 변경 후 내부값 비교"],
    ["Private 배열에 Public 데이터 할당", `this.roles = request.roles;`, `this.roles = immutableCopy(validateRoles(request.roles));`, "외부 mutable 참조 → 내부 상태 변경", "입력 시 방어적 복사·검증·불변 보관", "할당 후 원본 배열 변경·동시 접근"],
  ]],
  ["API 오용", [
    ["DNS lookup에 의존한 보안결정", `if(reverseDns(ip).endsWith("trusted.com")) allow();`, `if(mtlsIdentity(request)==TRUSTED_SERVICE) allow();`, "변조 가능한 DNS 결과 → 신뢰 결정", "암호학적 identity·고정 정책으로 인증하고 DNS는 이름해석에만 사용", "PTR 위조, forward/reverse 불일치, rebinding"],
    ["취약한 API 사용", `gets(buffer); strcpy(dst,src);`, `readBounded(buffer,size); copyChecked(dst,dstSize,src);`, "unsafe API → 경계·오류 미확인", "안전한 대체 API와 반환값·길이·종료조건 확인", "최대길이, 종료문자 없음, API 실패 반환"],
  ]],
];

const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const slug = (index: number) => `case-${String(index + 1).padStart(2, "0")}`;
let caseIndex = 0;
const sections = groups.map(([group, cases], groupIndex) => {
  const cards = cases.map(([name, vulnerable, safe, flow, falsePositive, retest]) => {
    const index = caseIndex++;
    return `<article id="${slug(index)}"><h3>${String(index + 1).padStart(2, "0")}. ${name}</h3><table><tr><th>취약 코드</th><td><pre><code>${escape(vulnerable)}</code></pre></td></tr><tr><th>안전 코드</th><td><pre><code>${escape(safe)}</code></pre></td></tr><tr><th>Source → Sink</th><td>${flow}</td></tr><tr><th>정탐 판정</th><td>외부 통제값이 위 흐름으로 실제 실행되며 안전 코드의 핵심 통제가 누락되거나 우회 가능하면 정탐이다.</td></tr><tr><th>오탐 인정 조건</th><td>${falsePositive}</td></tr><tr><th>보완 후 재시험</th><td>${retest}</td></tr></table></article>`;
  }).join("");
  return `<section id="group-${groupIndex + 1}"><div class="ch-head"><span class="ch-code">${String(groupIndex + 1).padStart(2, "0")}</span><h2>${group}</h2></div>${cards}</section>`;
}).join("");

const document: HandbookDocumentContent = {
  navHtml: `<div class="nav-brand">SW SECURITY DIAGNOSER</div><div class="nav-title">49개 코드 판정집</div>${groups.map(([group], index) => `<a href="#group-${index + 1}"><span class="code">${String(index + 1).padStart(2, "0")}</span>${group}</a>`).join("")}<a href="#casebook-gate"><span class="code">GATE</span>완료 점검</a>`,
  mainHtml: `<header class="hero"><div class="hero-serial"><span>TRACK : SW 보안약점 진단원</span><span>DOC : DIAGNOSER-09</span><span>COVERAGE : 49 / 49</span></div><h1>코드를 읽고 근거로 판정하는<br>49개 보안약점 사례집</h1><p class="hero-sub">예제를 외우지 말고 입력을 바꾸고 중간 함수를 숨겨도 Source·Sink·누락 통제를 다시 찾는 훈련을 합니다.</p><div class="hero-meta">VULNERABLE · SAFE · TRUE POSITIVE · FALSE POSITIVE · RETEST</div></header><section><div class="callout key"><span class="co-label">사용법</span><p>먼저 취약 코드만 보고 약점명과 흐름을 적습니다. 다음으로 안전 코드를 설명하고, 오탐 인정 조건과 재시험 입력을 보지 않고 작성합니다. 한 항목당 6분, 49개 중 무작위 45개를 통과해야 완료입니다.</p></div></section>${sections}<section id="casebook-gate"><div class="ch-head"><span class="ch-code">GATE</span><h2>49개 판정집 완료 점검</h2></div><div class="checklist"><strong>항목마다 확인</strong><ul><li>외부가 통제하는 Source에 밑줄을 그었다.</li><li>값을 코드·질의·명령·경로·권한으로 해석하는 Sink를 찾았다.</li><li>정탐에 필요한 실행경로와 영향까지 설명했다.</li><li>오탐은 함수명이나 느낌이 아닌 증거로 설명했다.</li><li>개선안이 원인을 제거하며 재시험에 정상·악성·경계 입력이 있다.</li></ul></div><p><strong>완료 기준:</strong> 49개 모두 답안 작성, 무작위 재시험 45/49 이상, 혼동쌍 오분류 0개.</p></section>`,
};

export default document;
