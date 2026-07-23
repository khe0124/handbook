// 백엔드 인증·보안 Q&A(engineering-backend-auth-security-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-backend-auth-security-quiz",
  title: "백엔드 인증·보안 퀴즈",
  sourceQaId: "engineering-backend-auth-security-qa",
  questions: [
    {
      id: "q1",
      question: "인증(authentication)과 인가(authorization)를 가장 정확히 구분한 것은?",
      choices: [
        "인증은 사용자가 누구인지 증명하는 절차이고, 인가는 그 사용자가 특정 resource에 특정 action을 할 수 있는지 결정하는 절차다",
        "인증은 resource 접근 권한을 확인하고, 인가는 사용자의 신원을 증명한다",
        "인증과 인가는 로그인 한 번으로 동시에 끝나는 같은 절차다",
        "인증은 서버가, 인가는 client가 각각 책임지는 역할 분담이다",
      ],
      answerIndex: 0,
      explanation:
        "인증은 사용자가 누구인지 증명하는 절차이고, 인가는 그 사용자가 특정 resource에 특정 action을 할 수 있는지 결정하는 절차다. 로그인 성공은 인증일 뿐이며 모든 상세/목록/export/bulk API에서 resource 단위 인가가 다시 필요하다.",
    },
    {
      id: "q2",
      question: "401, 403, 404 응답 코드를 구분하는 기준으로 옳은 것은?",
      choices: [
        "401은 권한이 없을 때, 403은 인증 정보가 없을 때, 404는 서버 오류일 때 쓴다",
        "세 코드 모두 같은 의미이므로 아무거나 써도 무방하다",
        "401은 인증 정보가 없거나 유효하지 않을 때, 403은 인증됐지만 권한이 없을 때, 404는 리소스 존재 자체가 민감할 때 숨기려고 쓴다",
        "404는 항상 리소스가 물리적으로 삭제됐을 때만 반환한다",
      ],
      answerIndex: 2,
      explanation:
        "401은 인증 정보가 없거나 유효하지 않을 때, 403은 인증됐지만 권한이 없을 때 쓴다. 리소스 존재 자체가 민감하면 404로 숨길 수 있지만, 감사 로그에는 실제 거절 사유를 남겨야 한다.",
    },
    {
      id: "q3",
      question: "Refresh token rotation의 대표적인 함정은?",
      choices: [
        "rotation을 쓰면 access token을 아예 발급하지 않아도 되는 점",
        "모바일 재시도나 브라우저 탭 동시 요청이 race를 만들 수 있는 점",
        "rotation이 서버 부하를 줄여 오히려 탈취 탐지를 불가능하게 하는 점",
        "rotation 때문에 refresh token TTL을 무한대로 늘려야 하는 점",
      ],
      answerIndex: 1,
      explanation:
        "탈취 탐지를 위해 rotation을 쓰지만 모바일 재시도나 브라우저 탭 동시 요청이 race를 만들 수 있다. token family, grace window, reuse detection, device binding, revoke state를 같이 설계해야 한다.",
    },
    {
      id: "q4",
      question: "access token을 브라우저 localStorage에 저장하면 생기는 핵심 위험은?",
      choices: [
        "localStorage 용량 한도를 넘겨 token이 잘리는 문제",
        "다른 탭과 자동 동기화되어 token이 중복 발급되는 문제",
        "저장이 동기 API라 인증 요청이 느려지는 문제",
        "XSS가 발생하면 JS가 token을 읽어 외부로 보낼 수 있는 문제",
      ],
      answerIndex: 3,
      explanation:
        "access token을 localStorage에 두면 XSS가 발생했을 때 JS가 token을 읽어 외부로 보낼 수 있다. 브라우저에서는 HttpOnly Secure cookie, 짧은 access token TTL, CSP, refresh rotation을 함께 고려한다.",
    },
    {
      id: "q5",
      question: "Tenant isolation을 검증할 때 지켜야 할 기준으로 옳은 것은?",
      choices: [
        "client가 보낸 tenant id를 신뢰하지 않고, 서버 세션/토큰 claim과 DB predicate, row policy, audit log로 actor tenant와 resource tenant 일치를 확인한다",
        "client가 요청에 담아 보낸 tenant id를 그대로 신뢰해 조회 조건에 넣는다",
        "tenant 검증은 목록 API에서만 하고 상세 API에서는 생략한다",
        "batch job은 시스템 권한으로 실행되므로 tenant scope 없이 처리한다",
      ],
      answerIndex: 0,
      explanation:
        "모든 요청에서 actor tenant와 resource tenant가 일치해야 한다는 invariant를 둔다. client가 보낸 tenant id를 신뢰하지 않고 서버 세션/토큰 claim과 DB predicate, row policy, audit log를 함께 확인한다.",
    },
    {
      id: "q6",
      question: "webhook signature가 맞아도 event id를 저장(ledger)해야 하는 이유는?",
      choices: [
        "signature 검증 속도를 높이기 위해 event id를 캐시로 재활용하려고",
        "signature가 만료되면 event id로 다시 서명을 발급하려고",
        "signature는 발신자와 payload 무결성만 확인할 뿐 중복 전송을 막지 못하기 때문",
        "event id가 있어야 signature를 생략하고 빠르게 처리할 수 있기 때문",
      ],
      answerIndex: 2,
      explanation:
        "signature는 발신자와 payload 무결성을 확인하지만 중복 전송을 막지 못한다. event id ledger와 business unique constraint가 있어야 replay와 provider 재전송을 no-op 처리할 수 있다.",
    },
    {
      id: "q7",
      question: "URL blocklist만으로 SSRF를 막기 어려운 이유는?",
      choices: [
        "blocklist가 HTTPS 트래픽에는 적용되지 않기 때문",
        "DNS 변형, IPv6, redirect, metadata IP 우회가 가능하기 때문",
        "blocklist는 outbound가 아니라 inbound 요청에만 동작하기 때문",
        "blocklist를 쓰면 정상 도메인까지 전부 차단되기 때문",
      ],
      answerIndex: 1,
      explanation:
        "DNS 변형, IPv6, redirect, metadata IP 우회가 가능하므로 blocklist만으로는 어렵다. allowlist, private/link-local IP 차단, 연결 직전 IP 재검증, egress proxy 정책을 함께 둬야 한다.",
    },
    {
      id: "q8",
      question: "CSRF와 CORS의 관계를 옳게 설명한 것은?",
      choices: [
        "CSRF는 서버 정책이고 CORS는 브라우저 공격 기법이다",
        "둘은 완전히 같은 문제를 다른 이름으로 부르는 것이다",
        "CORS를 켜면 CSRF는 자동으로 완전히 차단된다",
        "CSRF는 브라우저가 쿠키를 자동 전송하는 특성을 악용한 공격이고, CORS는 브라우저가 cross-origin JS 접근을 제한하는 정책이다",
      ],
      answerIndex: 3,
      explanation:
        "CSRF는 브라우저가 쿠키를 자동 전송하는 특성을 악용해 사용자의 의도 없는 상태 변경을 유도하는 공격이고, CORS는 브라우저가 cross-origin JS 접근을 제한하는 정책이다. 같은 문제가 아니다.",
    },
    {
      id: "q9",
      question: "JWT를 쓰면 서버 세션 저장소가 완전히 필요 없어진다는 주장에 대한 옳은 반박은?",
      choices: [
        "로그아웃, 강제 차단, refresh rotation, device 관리, 침해 대응을 하려면 서버 측 상태가 필요할 때가 많다",
        "JWT는 stateless가 불가능하므로 항상 세션 저장소가 있어야 한다",
        "JWT 검증 자체가 DB 조회를 강제하므로 stateless일 수 없다",
        "access token은 서버 상태 없이도 즉시 무효화가 가능하다",
      ],
      answerIndex: 0,
      explanation:
        "access token 검증 자체는 stateless일 수 있지만 로그아웃, 강제 차단, refresh rotation, device 관리, 침해 대응을 하려면 서버 측 상태가 필요할 때가 많다. stateless와 통제 가능성 사이의 trade-off다.",
    },
    {
      id: "q10",
      question: "비밀번호 저장에서 bcrypt만 쓰면 충분한가에 대한 옳은 답은?",
      choices: [
        "bcrypt는 이미 구식이므로 평문 저장 후 암호화 컬럼을 쓰는 편이 낫다",
        "bcrypt에 salt만 붙이면 계정 보안이 완전히 끝난다",
        "느린 해시와 salt는 기본이고, rate limit·credential stuffing 탐지·MFA·복구 플로우·비밀번호 변경 후 세션 폐기까지 계정 생명주기 전체를 함께 설계해야 한다",
        "bcrypt보다 빠른 해시를 써야 로그인 성능이 좋아진다",
      ],
      answerIndex: 2,
      explanation:
        "bcrypt, Argon2 같은 느린 해시와 salt는 기본이고 계정 생명주기 전체가 중요하다. rate limit, credential stuffing 탐지, MFA, 복구 플로우, 비밀번호 변경 후 세션 폐기까지 함께 설계해야 한다.",
    },
    {
      id: "q11",
      question: "RBAC, ABAC, ReBAC를 옳게 구분한 것은?",
      choices: [
        "RBAC는 속성 기반, ABAC는 관계 기반, ReBAC는 역할 기반 인가다",
        "RBAC는 역할 기반, ABAC는 속성 기반, ReBAC는 관계 기반 인가다",
        "세 방식 모두 role 하나만 보므로 실무에서 차이가 없다",
        "RBAC는 인증 방식이고 ABAC와 ReBAC는 암호화 방식이다",
      ],
      answerIndex: 1,
      explanation:
        "RBAC는 역할 기반, ABAC는 속성 기반, ReBAC는 관계 기반 인가다. 실무에서는 role만으로 부족한 경우가 많아 tenant, owner, department, resource state 같은 속성을 함께 본다.",
    },
    {
      id: "q12",
      question: "signature가 맞는데 같은 webhook event가 두 번 도착하면 어떻게 처리하나?",
      choices: [
        "두 번째 요청에 4xx를 반환해 provider가 재전송을 멈추게 한다",
        "signature가 맞으므로 두 번 모두 side effect를 그대로 실행한다",
        "두 번째 이벤트는 5xx로 응답해 큐에서 폐기되게 한다",
        "event id ledger에서 이미 처리된 이벤트면 no-op 처리하고 2xx로 응답하며, 실제 side effect는 business unique constraint와 idempotency key로 한 번만 발생하게 막는다",
      ],
      answerIndex: 3,
      explanation:
        "event id ledger에서 이미 처리된 이벤트면 no-op 처리하고 2xx로 응답한다. 실제 side effect는 business unique constraint와 idempotency key로 한 번만 발생하게 막는다.",
    },
    {
      id: "q13",
      question: "OAuth2 authorization code flow가 token 노출 경계를 줄이는 방식은?",
      choices: [
        "browser가 token을 직접 받지 않고 server가 code를 token으로 교환하게 하며, public client에서는 PKCE로 code interception 위험을 낮춘다",
        "browser가 token을 먼저 받고 나중에 server에 전달해 검증한다",
        "code 없이 token을 URL fragment로 바로 노출해 왕복을 줄인다",
        "authorization code를 client secret 대신 로그에 남겨 재사용한다",
      ],
      answerIndex: 0,
      explanation:
        "authorization code flow는 browser가 token을 직접 받지 않고 server가 code를 token으로 교환하게 해 노출 위험을 줄인다. public client에서는 PKCE로 code interception 위험을 낮춘다.",
    },
    {
      id: "q14",
      question: "OAuth의 state 파라미터는 어떤 공격을 줄이나?",
      choices: [
        "SQL injection과 XSS를 서버 측에서 차단한다",
        "refresh token 재사용과 impossible travel을 탐지한다",
        "OAuth 요청과 callback을 묶어 CSRF와 login CSRF를 줄인다",
        "SSRF로 metadata endpoint에 닿는 경로를 차단한다",
      ],
      answerIndex: 2,
      explanation:
        "state는 OAuth 요청과 callback을 묶어 CSRF와 login CSRF를 줄인다. 난수 값으로 만들고 사용자 세션에 묶어 callback에서 일치 여부를 확인해야 한다.",
    },
    {
      id: "q15",
      question: "OIDC와 OAuth2의 관계를 옳게 설명한 것은?",
      choices: [
        "OIDC는 권한 위임이고 OAuth2는 그 위에 신원 인증을 표준화한 레이어다",
        "OAuth2는 권한 위임이고 OIDC는 그 위에 신원 인증을 표준화한 레이어다",
        "OIDC와 OAuth2는 서로 호환되지 않는 별개의 인증 프로토콜이다",
        "OAuth2는 ID token만, OIDC는 access token만 다룬다",
      ],
      answerIndex: 1,
      explanation:
        "OAuth2는 권한 위임이고 OIDC는 그 위에 신원 인증을 표준화한 레이어다. ID token은 issuer, audience, expiry, nonce, signature를 검증해야 한다.",
    },
    {
      id: "q16",
      question: "ID token을 API authorization에 그대로 쓰면 위험한 이유는?",
      choices: [
        "ID token은 만료 시간이 없어 무한히 유효하기 때문",
        "ID token은 signature가 없어 위조가 쉽기 때문",
        "ID token은 서버에만 저장되어 client가 읽을 수 없기 때문",
        "ID token은 사용자의 신원 증명이 목적이고 API scope 위임을 표현하지 않을 수 있어, API는 audience와 scope가 맞는 access token을 요구해야 하기 때문",
      ],
      answerIndex: 3,
      explanation:
        "ID token은 사용자의 신원 증명이 목적이고 API scope 위임을 표현하지 않을 수 있다. API는 audience와 scope가 맞는 access token을 요구해야 한다.",
    },
    {
      id: "q17",
      question: "MFA를 step-up으로 요구하기에 적절한 요청은?",
      choices: [
        "관리자 작업, 대량 export, 권한 변경, 결제 같은 high-risk action",
        "모든 GET 조회 요청",
        "민감하지 않은 반복 요청 전부",
        "정적 리소스 다운로드 요청",
      ],
      answerIndex: 0,
      explanation:
        "MFA는 모든 요청에 기계적으로 붙이기보다 risk와 action 민감도에 따라 적용한다. 관리자, 대량 export, 권한 변경, 결제 같은 high-risk action에는 step-up MFA가 필요하다.",
    },
    {
      id: "q18",
      question: "Session fixation을 로그인 처리에서 차단하는 핵심 방법은?",
      choices: [
        "로그인 전 익명 세션을 영구히 유지해 상태를 이어받게 한다",
        "cookie를 SameSite=None으로만 설정한다",
        "로그인 성공 시 session id를 재발급하고 cookie 속성과 CSRF 방어를 같이 둔다",
        "session id를 client가 정하도록 허용해 예측을 어렵게 한다",
      ],
      answerIndex: 2,
      explanation:
        "session fixation은 공격자가 정한 session id를 피해자 로그인 후에도 쓰게 만드는 공격이다. 로그인 성공 시 session id를 재발급하고 cookie 속성과 CSRF 방어를 같이 둬 이전 id로 인증 세션을 이어받는 것을 막는다.",
    },
    {
      id: "q19",
      question: "ORM을 써도 SQL injection이 생길 수 있는 지점은?",
      choices: [
        "ORM은 모든 쿼리를 자동 바인딩하므로 injection이 생기지 않는다",
        "native query, 문자열 연결, 동적 order by",
        "ORM이 생성한 SELECT 목록 컬럼",
        "connection pool 크기 설정",
      ],
      answerIndex: 1,
      explanation:
        "ORM을 써도 native query, 문자열 연결, 동적 order by에서 injection이 생긴다. parameter binding, allowlisted sort key, query builder를 강제해야 한다. 컬럼명과 방향은 값 바인딩 대상이 아니므로 allowlist로 매핑한다.",
    },
    {
      id: "q20",
      question: "SSRF에서 DNS rebinding은 어떤 검증을 우회하나?",
      choices: [
        "payload signature 검증을 우회한다",
        "인증 토큰의 audience 검증을 우회한다",
        "rate limit의 IP 카운터를 우회한다",
        "처음 허용 IP로 보이다가 연결 시점이나 redirect 후 private IP로 바뀌어 초기 IP 검사를 우회한다",
      ],
      answerIndex: 3,
      explanation:
        "DNS rebinding은 처음 허용 IP로 보이다가 연결 시점이나 redirect 후 private IP로 바뀌는 공격이다. 연결 직전 IP 재검증, private/link-local 차단, redirect 제한이 필요하다.",
    },
    {
      id: "q21",
      question: "Rate limit은 보안 기능인가 성능 기능인가에 대한 옳은 답은?",
      choices: [
        "둘 다이며, brute force·scraping·credential stuffing을 줄이는 보안 제어이자 하류 시스템을 보호하는 트래픽 제어다",
        "순수하게 성능 기능이며 보안과는 무관하다",
        "순수하게 보안 기능이며 성능과는 무관하다",
        "인증 경로에서는 의미가 없고 정적 파일에만 적용된다",
      ],
      answerIndex: 0,
      explanation:
        "rate limit은 보안과 성능 둘 다다. brute force, scraping, credential stuffing을 줄이는 보안 제어이면서 하류 시스템을 보호하는 트래픽 제어다. actor, IP, tenant, endpoint 비용 기준을 나눠야 한다.",
    },
    {
      id: "q22",
      question: "Audit log와 application log의 차이로 옳은 것은?",
      choices: [
        "application log는 변조 방지가 목적이고 audit log는 성능 측정이 목적이다",
        "application log는 디버깅 목적이고, audit log는 누가·언제·어떤 권한으로·어떤 자원에·어떤 결정을 내렸는지 변조하기 어렵게 남기는 행위 증명 목적이다",
        "둘은 같은 로그이며 저장 위치만 다르다",
        "audit log는 개발 중에만 쓰고 운영에서는 application log만 남긴다",
      ],
      answerIndex: 1,
      explanation:
        "application log는 디버깅 목적이고 audit log는 행위 증명 목적이다. 누가, 언제, 어떤 권한으로, 어떤 자원에, 어떤 결정을 내렸는지 변조하기 어렵게 남겨야 한다.",
    },
    {
      id: "q23",
      question: "인증 cookie에 기본으로 두어야 할 보안 속성으로 옳은 것은?",
      choices: [
        "SameSite=None만 지정하면 CSRF가 완전히 차단된다",
        "Domain을 넓게 잡을수록 인증이 안정적이라 더 안전하다",
        "HttpOnly, Secure를 기본으로 하고 SameSite는 UX와 CSRF 위험을 기준으로 정하며 Domain과 Path는 최소 범위로 제한한다",
        "HttpOnly만 있으면 XSS 피해가 완전히 사라진다",
      ],
      answerIndex: 2,
      explanation:
        "인증 cookie는 HttpOnly, Secure를 기본으로 하고 SameSite는 UX와 CSRF 위험을 기준으로 정한다. Domain과 Path는 최소 범위로 제한해야 하위 도메인 침해 시 영향 범위가 커지는 것을 막는다.",
    },
    {
      id: "q24",
      question: "XSS가 백엔드 인증 모델에 주는 영향으로 옳은 것은?",
      choices: [
        "XSS는 프론트엔드 렌더링 문제일 뿐 backend 권한 모델과는 무관하다",
        "HttpOnly cookie를 쓰면 XSS는 backend에 아무 영향도 주지 못한다",
        "XSS는 SQL injection의 다른 이름이므로 parameter binding으로 막힌다",
        "token 탈취, 관리자 action 수행, CSRF 우회로 backend 권한 모델을 무너뜨릴 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "XSS는 token 탈취, 관리자 action 수행, CSRF 우회로 backend 권한 모델을 무너뜨릴 수 있다. HttpOnly로 token 직접 탈취는 줄여도 공격 스크립트가 사용자의 세션으로 요청을 보내는 위험은 남으므로 token 저장 위치, CSP, output encoding, audit가 함께 필요하다.",
    },
    {
      id: "q25",
      question: "Secret rotation을 운영하는 순서로 옳은 것은?",
      choices: [
        "새 secret 발급, dual validation 또는 rolling deploy, old secret revoke, 영향 범위 확인 순서로 진행한다",
        "이전 secret을 먼저 revoke한 뒤 새 secret을 발급한다",
        "노출된 secret은 파일만 삭제하면 대응이 끝난다",
        "rotation은 성능 저하만 유발하므로 하지 않는 편이 낫다",
      ],
      answerIndex: 0,
      explanation:
        "secret rotation은 새 secret 발급, dual validation 또는 rolling deploy, old secret revoke, 영향 범위 확인 순서로 진행한다. 이미 노출된 secret은 파일 삭제로 끝나지 않고 revoke/rotate 후 git history, CI log, container image, 배포 환경까지 노출 범위를 확인해야 한다.",
    },
    {
      id: "q26",
      question: "Admin impersonation에 두어야 할 제한과 기록으로 옳은 것은?",
      choices: [
        "impersonation 세션은 기본적으로 쓰기 권한이어야 지원 업무가 가능하다",
        "impersonation 로그는 impersonated user id 하나로만 남기면 충분하다",
        "대상 tenant, reason code, approval, 시간 제한, read-only 기본값, 사용자 알림, audit log를 두고 관리자와 대상 사용자를 모두 기록한다",
        "관리자 권한이면 별도 승인이나 시간 제한 없이 impersonation 할 수 있다",
      ],
      answerIndex: 2,
      explanation:
        "impersonation은 대상 tenant, reason code, approval, 시간 제한, read-only 기본값, 사용자 알림, audit log가 있어야 한다. 로그에는 실제 조작한 관리자와 impersonated user를 둘 다 남겨야 사고 조사에서 책임 주체와 영향 사용자를 분리할 수 있다.",
    },
    {
      id: "q27",
      question: "PII export가 일반 조회보다 더 요구하는 통제로 옳은 것은?",
      choices: [
        "PII export는 일반 조회와 동일한 권한 검사만 하면 된다",
        "export 생성 audit만 있으면 다운로드 audit는 불필요하다",
        "signed URL이면 TTL 없이 영구 보관해도 안전하다",
        "최소 권한, 목적 기록, approval, scope 제한, 짧은 TTL, 다운로드 audit, 보존 기간을 요구한다",
      ],
      answerIndex: 3,
      explanation:
        "PII export는 최소 권한, 목적 기록, approval, scope 제한, 짧은 TTL, 다운로드 audit, 보존 기간을 요구해 일반 조회보다 강한 통제가 필요하다. export 생성과 실제 다운로드의 주체·시각·IP가 다를 수 있어 다운로드 audit를 생성 audit와 분리한다.",
    },
    {
      id: "q28",
      question: "권한 캐시의 stale permission 위험을 줄이는 방법으로 옳은 것은?",
      choices: [
        "권한 캐시는 stale 위험이 없으므로 TTL을 길게 둬도 안전하다",
        "TTL을 짧게 하거나 token version, permission version, revoke event로 무효화한다",
        "권한 축소는 다음 로그인까지 반영하지 않아도 무방하다",
        "권한 캐시 키에는 actor id만 넣으면 충분하다",
      ],
      answerIndex: 1,
      explanation:
        "권한 캐시는 stale permission 위험이 커서 TTL을 짧게 하거나 token version, permission version, revoke event로 무효화해야 한다. 권한 축소는 cache eviction, permission version 증가, active session revoke와 함께 처리하고 캐시 키에는 actor id, tenant id, policy version, resource scope가 들어가야 한다.",
    },
    {
      id: "q29",
      question: "HSTS 헤더가 인증 화면에서 줄이는 위험으로 옳은 것은?",
      choices: [
        "사용자가 HTTP로 접근해도 브라우저가 HTTPS를 강제하게 해 downgrade와 cookie 노출 위험을 줄인다",
        "HSTS는 서버가 요청 본문을 암호화하는 기능이다",
        "HSTS를 켜면 CSP와 X-Frame-Options가 자동으로 함께 적용된다",
        "HSTS는 backend가 아니라 client가 스스로 설정하는 정책이다",
      ],
      answerIndex: 0,
      explanation:
        "HSTS는 사용자가 HTTP로 접근해도 브라우저가 HTTPS를 강제하도록 해 downgrade와 cookie 노출 위험을 줄인다. includeSubDomains와 preload는 하위 도메인 준비 상태를 확인한 뒤 적용한다.",
    },
    {
      id: "q30",
      question: "Replay attack을 줄이는 통제에 대한 설명으로 옳은 것은?",
      choices: [
        "replay 방지와 idempotency는 완전히 같은 것이라 하나만 있으면 된다",
        "replay attack은 webhook에서만 발생하므로 다른 경로는 신경 쓸 필요가 없다",
        "timestamp tolerance는 길게 둘수록 안전하다",
        "결제 요청, password reset, signed URL, API nonce 등에서 timestamp, nonce, idempotency ledger, short TTL, one-time token으로 막는다",
      ],
      answerIndex: 3,
      explanation:
        "replay attack은 webhook뿐 아니라 결제 요청, password reset, signed URL, API nonce에서도 생기며 timestamp, nonce, idempotency ledger, short TTL, one-time token으로 막는다. idempotency는 안전한 재시도 수렴이 목적이고 replay 방지는 캡처된 요청 재실행을 막는 통제라 목적이 다르다.",
    },
    {
      id: "q31",
      question: "권한 변경 audit에 남겨야 할 전후 맥락으로 옳은 것은?",
      choices: [
        "권한 변경은 성공 여부만 남기면 충분하다",
        "권한 변경 후 기존 세션은 그대로 두어도 된다",
        "누가 누구에게 어떤 권한을 왜 부여했는지와 승인 기록, 변경 전후 scope를 남긴다",
        "권한 변경 audit는 모든 사용자에게 공개되어야 한다",
      ],
      answerIndex: 2,
      explanation:
        "권한 변경은 이후 접근 가능성을 바꾸는 root action이라 누가 누구에게 어떤 권한을 왜 부여했는지와 승인 기록, 변경 전후 scope를 남겨야 한다. 권한 축소나 제거는 기존 세션과 권한 캐시를 무효화하고 audit 조회는 제한된 역할만 볼 수 있어야 한다.",
    },
    {
      id: "q32",
      question: "보안 negative test가 고정해야 할 금지 경로로 옳은 것은?",
      choices: [
        "보안 테스트는 happy path 허용 케이스만 통과하면 충분하다",
        "forbidden actor, foreign tenant, expired token, replay, malformed input, excessive request 같은 negative fixture가 핵심이다",
        "foreign tenant fixture는 상세 API에만 필요하고 목록 API에는 불필요하다",
        "expired token 테스트는 clock skew를 무시해야 정확하다",
      ],
      answerIndex: 1,
      explanation:
        "보안 테스트는 정상 허용보다 forbidden actor, foreign tenant, expired token, replay, malformed input, excessive request 같은 negative fixture가 핵심이다. foreign tenant fixture는 목록과 상세 API 모두에 필요하고 expired token 테스트는 clock skew 허용 범위도 함께 명시해야 한다.",
    },
  ],
};

export default quiz;
