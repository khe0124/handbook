// SEO·AEO·GEO·애널리틱스 Q&A(engineering-frontend-seo-analytics-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-seo-analytics-quiz",
  title: "SEO·AEO·GEO·애널리틱스 퀴즈",
  sourceQaId: "engineering-frontend-seo-analytics-qa",
  questions: [
    {
      id: "q1",
      question: "기술 SEO의 핵심을 가장 정확히 정의한 것은?",
      choices: [
        "검색 엔진이 URL을 발견·크롤링·렌더링·색인·이해하게 만드는 것",
        "메타 태그와 title을 검색어에 맞춰 반복 최적화하는 것",
        "키워드 밀도를 높여 본문에 검색어를 촘촘히 배치하는 것",
        "백링크를 최대한 많이 확보해 도메인 권위를 올리는 것",
      ],
      answerIndex: 0,
      explanation:
        "기술 SEO의 핵심은 검색 엔진이 URL을 발견·크롤링·렌더링·색인·이해할 수 있게 만드는 것이며 sitemap, robots, canonical, status code, structured data, 성능이 함께 작동해야 한다. 메타 태그만 수정하면 duplicate URL·blocked resource·JS rendering 실패·canonical 오류를 놓친다.",
    },
    {
      id: "q2",
      question: "SEO와 비교해 AEO/GEO가 목표로 하는 것은?",
      choices: [
        "검색 결과 첫 페이지 노출 순위를 최대로 끌어올리는 것",
        "답변 엔진과 생성형 검색이 인용·요약하기 쉬운 구조와 근거를 제공하는 것",
        "FAQ schema를 JSON-LD로 최대한 많이 삽입하는 것",
        "핵심 키워드를 heading마다 반복해 관련성 신호를 강화하는 것",
      ],
      answerIndex: 1,
      explanation:
        "SEO가 검색 결과 노출을 목표로 한다면 AEO/GEO는 답변 엔진과 생성형 검색이 인용·요약하기 쉬운 구조와 근거를 제공한다. 키워드만 반복하면 AI 답변에서 신뢰 가능한 근거로 선택되기 어렵다.",
    },
    {
      id: "q3",
      question: "canonical이 잘못 지정되어 위험해지는 상황은?",
      choices: [
        "각 페이지가 자기 자신을 canonical로 지정할 때",
        "canonical과 sitemap의 URL이 완전히 일치할 때",
        "서로 다른 콘텐츠가 같은 canonical을 가리키거나 canonical URL이 noindex/blocked/redirect chain에 걸릴 때",
        "canonical URL이 status 200을 반환할 때",
      ],
      answerIndex: 2,
      explanation:
        "서로 다른 콘텐츠가 같은 canonical을 가리키거나 canonical URL이 noindex/blocked/redirect chain에 걸리면 ranking signal이 잘못 합쳐질 수 있다. 배포 전 rendered HTML과 Search Console 선택 canonical을 함께 확인해야 한다.",
    },
    {
      id: "q4",
      question: "robots.txt와 noindex의 차이로 옳은 것은?",
      choices: [
        "robots.txt는 색인을 막고 noindex는 크롤링을 막는다",
        "둘 다 URL 존재 자체를 숨기는 보안 수단이다",
        "noindex를 걸면 robots.txt 없이도 URL이 검색에 절대 노출되지 않는다",
        "robots.txt는 크롤링 접근을 제어하고 noindex는 색인 제외 신호이며, 크롤링이 막히면 noindex를 보지 못할 수 있다",
      ],
      answerIndex: 3,
      explanation:
        "robots.txt는 크롤링 접근을 제어하고 noindex는 색인 제외 신호다. 크롤링이 막히면 noindex를 보지 못할 수 있고, 민감 페이지를 robots.txt만으로 숨기면 URL 존재가 노출될 수 있어 보안 수단도 아니다.",
    },
    {
      id: "q5",
      question: "다국어 사이트에서 각 locale URL의 canonical과 hreflang 처리로 옳은 것은?",
      choices: [
        "각 locale URL은 자기 자신을 canonical로 두고 hreflang으로 대체 언어 관계를 연결한다",
        "모든 언어 페이지가 기본 언어(영어) URL을 canonical로 가리킨다",
        "hreflang 없이 canonical만으로 언어별 대체 관계를 표현한다",
        "한국어 페이지는 영어 URL을 canonical로 두어 신호를 통합한다",
      ],
      answerIndex: 0,
      explanation:
        "각 locale URL은 자기 자신을 canonical로 두고 hreflang으로 대체 언어 관계를 연결한다. 한국어 페이지가 영어 URL을 canonical로 가리키면 한국어 콘텐츠가 중복으로 처리되어 노출이 약해질 수 있다.",
    },
    {
      id: "q6",
      question: "CSR 페이지가 색인될 수 있는지에 대한 정확한 설명은?",
      choices: [
        "CSR 페이지는 원천적으로 색인되지 않는다",
        "가능하지만 crawler가 JS를 렌더링해야 하므로 발견·색인이 늦거나 실패할 수 있다",
        "CSR도 SSR과 동일하게 즉시 색인되므로 차이가 없다",
        "canonical만 넣으면 JS 렌더링 없이 본문이 색인된다",
      ],
      answerIndex: 1,
      explanation:
        "CSR도 색인은 가능하지만 crawler가 JS를 렌더링해야 하므로 발견·색인이 늦거나 실패할 수 있다. 중요한 title·canonical·본문·internal links·structured data는 SSR이나 pre-rendered HTML에서 확인되게 두는 편이 안전하다.",
    },
    {
      id: "q7",
      question: "sitemap에 담아야 하는 URL로 옳은 것은?",
      choices: [
        "사이트의 모든 URL을 빠짐없이 포함한다",
        "noindex 페이지도 크롤러가 상태를 알도록 포함한다",
        "색인시키려는 canonical URL과 lastmod 등 discovery 정보를 담고 blocked/noindex/중복 URL은 뺀다",
        "redirect되는 URL을 대표로 sitemap에 남긴다",
      ],
      answerIndex: 2,
      explanation:
        "sitemap에는 색인시키려는 canonical URL과 lastmod 등 discovery에 필요한 정보를 담고 blocked/noindex/중복 URL은 빼야 한다. 모든 URL을 넣으면 crawler가 중요하지 않은 페이지에 예산을 쓴다.",
    },
    {
      id: "q8",
      question: "SSR이 SEO를 항상 해결하지는 못하는 이유는?",
      choices: [
        "SSR은 canonical과 metadata를 자동으로 완성해 주기 때문",
        "SSR HTML은 crawler가 렌더링할 수 없기 때문",
        "SSR은 status code를 항상 200으로 고정하기 때문",
        "SSR만 도입하고 hydration 오류나 빈 콘텐츠를 내보내면 검색 품질이 좋아지지 않기 때문",
      ],
      answerIndex: 3,
      explanation:
        "SSR은 초기 HTML 제공에 유리하지만 canonical·metadata·structured data·status code·content quality·performance가 함께 필요하다. SSR만 도입하고 hydration 오류나 빈 콘텐츠를 내보내면 검색 품질이 좋아지지 않는다.",
    },
    {
      id: "q9",
      question: "SSR 페이지가 오류 화면을 HTTP 200으로 내보낼 때 생기는 문제는?",
      choices: [
        "soft 404나 잘못된 색인이 생긴다",
        "crawler가 페이지를 아예 발견하지 못한다",
        "canonical이 자동으로 무효화된다",
        "hreflang 상호 참조가 깨진다",
      ],
      answerIndex: 0,
      explanation:
        "SSR 페이지가 오류 화면을 200으로 내보내면 soft 404나 잘못된 색인이 생긴다. 삭제는 404/410, 영구 이동은 301, 권한 필요 페이지는 검색 색인 대상에서 제외되도록 HTTP status와 meta robots를 맞춰야 한다.",
    },
    {
      id: "q10",
      question: "애널리틱스 이벤트를 정의하는 올바른 방식은?",
      choices: [
        "DOM 클릭과 button_text를 그대로 전송해 상세히 기록한다",
        "사용자 의도·action·target·result·error·context를 담는 product event로 정의한다",
        "화면에 나타난 모든 요소의 클릭을 자동 수집한다",
        "page_view만 촘촘히 남겨 화면 이동을 추적한다",
      ],
      answerIndex: 1,
      explanation:
        "이벤트는 DOM 클릭이 아니라 사용자 의도·action·target·result·error·context를 담는 product event로 정의한다. button_text만 보내면 퍼널·실패·재시도·권한 차단을 분석할 수 없다.",
    },
    {
      id: "q11",
      question: "이벤트에 result 필드가 필요한 이유는?",
      choices: [
        "이벤트 이름을 짧게 유지하기 위해서",
        "button_text 변화를 result로 기록하기 위해서",
        "성공·실패·차단·취소를 구분해야 같은 action의 전환율과 오류율을 계산할 수 있어서",
        "page_view 중복을 방지하기 위해서",
      ],
      answerIndex: 2,
      explanation:
        "성공·실패·차단·취소를 구분해야 같은 action의 전환율과 오류율을 계산할 수 있다. result와 error_code가 없으면 funnel drop이 UX 문제인지 API 실패인지 privacy consent 차단인지 알기 어렵다.",
    },
    {
      id: "q12",
      question: "GA4 같은 도구를 SPA에 붙일 때 흔히 생기는 문제는?",
      choices: [
        "이벤트 스키마가 자동으로 versioning된다",
        "PII가 자동으로 redaction된다",
        "UTM이 항상 원본 그대로 보존된다",
        "route 변경 누락, consent 이전 전송, 중복 page_view가 생긴다",
      ],
      answerIndex: 3,
      explanation:
        "태그만 설치하면 route 변경 누락, consent 이전 전송, 중복 page_view가 생길 수 있다. GA4를 붙일 때는 consent, PII 금지, 중복 이벤트, SPA route tracking, UTM 보존, debug view 검증을 봐야 한다.",
    },
    {
      id: "q13",
      question: "내부 링크에 UTM을 붙이는 것을 권장하지 않는 이유는?",
      choices: [
        "internal 링크 UTM이 original attribution을 덮어 acquisition 분석을 망칠 수 있어서",
        "UTM이 페이지 로드 속도를 크게 떨어뜨려서",
        "UTM이 canonical URL을 자동으로 변경해서",
        "내부 링크에는 UTM 파라미터를 기술적으로 넣을 수 없어서",
      ],
      answerIndex: 0,
      explanation:
        "내부 링크 UTM은 original attribution을 덮어 acquisition 분석을 망칠 수 있어 권장하지 않는다. 내부 배너나 추천 영역 성과는 별도 internal_promo event나 click parameter로 추적한다.",
    },
    {
      id: "q14",
      question: "UTM 값의 대소문자를 관리해야 하는 이유는?",
      choices: [
        "대문자 UTM은 검색 색인에서 제외되어서",
        "utm_source=Newsletter와 newsletter가 다른 캠페인으로 잡혀 리포트가 분산될 수 있어서",
        "대소문자에 따라 redirect status code가 달라져서",
        "GA4가 대문자 UTM을 수집하지 못해서",
      ],
      answerIndex: 1,
      explanation:
        "GA4와 리포트에서 값이 분리될 수 있으므로 소문자 기준을 정하고 수집 또는 리포트 단계에서 normalize한다. utm_source=Newsletter와 newsletter가 다른 캠페인으로 잡히지 않게 naming policy를 운영한다.",
    },
    {
      id: "q15",
      question: "conversion funnel에서 denominator(분모)를 다루는 올바른 방법은?",
      choices: [
        "항상 전체 방문자 수를 분모로 고정한다",
        "완료 이벤트 수를 분모로 삼아 계산한다",
        "funnel의 질문에 맞춰 eligible user·landing session·CTA exposure·form start 중 하나를 명시하고 리포트 이름에 포함한다",
        "분모는 리포트마다 자동 결정되므로 명시하지 않는다",
      ],
      answerIndex: 2,
      explanation:
        "분모는 funnel의 질문에 맞춰 eligible user·landing session·CTA exposure·form start 중 하나를 명시한다. 결제 전환율은 checkout_start 기준과 product_view 기준이 다르므로 리포트 이름에 denominator를 포함한다.",
    },
    {
      id: "q16",
      question: "privacy와 analytics의 균형에서 기본으로 두어야 하는 원칙은?",
      choices: [
        "분석 편의를 위해 email과 user input을 최대한 함께 수집",
        "raw DB id를 외부 도구에 그대로 전송해 join 가능성 확보",
        "IP를 event parameter로 직접 전송해 지역 분석 강화",
        "목적 제한·최소 수집·익명화/가명화·consent·retention·redaction",
      ],
      answerIndex: 3,
      explanation:
        "목적 제한·최소 수집·익명화/가명화·consent·retention·redaction을 기본으로 둔다. 분석 편의를 위해 user input이나 email을 보내면 법적·신뢰 리스크가 크다.",
    },
    {
      id: "q17",
      question: "외부 분석 도구에 사용자 식별자를 보낼 때 권장되는 방식은?",
      choices: [
        "raw DB id보다 scoped pseudonymous id를 쓰고 email이나 phone으로 join하지 않는다",
        "raw DB id를 그대로 보내 다른 시스템과 join한다",
        "email을 해시 없이 식별자로 사용한다",
        "userId는 식별자가 아니므로 consent 없이 전송한다",
      ],
      answerIndex: 0,
      explanation:
        "내부 userId도 식별자이므로 목적·consent·access control·retention을 정해야 한다. 외부 분석 도구에는 raw DB id보다 scoped pseudonymous id를 쓰고 email이나 phone으로 join하지 않는다.",
    },
    {
      id: "q18",
      question: "SEO 성과를 traffic 하나로만 보면 안 되는 이유는?",
      choices: [
        "traffic 수치는 Search Console에서 제공되지 않아서",
        "브랜드 캠페인·계절성·검색 의도 변화와 technical SEO 효과를 구분하기 어려워서",
        "traffic은 crawl error와 동일한 지표라서",
        "traffic만으로는 canonical 선택을 확인할 수 없어서",
      ],
      answerIndex: 1,
      explanation:
        "traffic만 보면 브랜드 캠페인·계절성·검색 의도 변화와 technical SEO 효과를 구분하기 어렵다. impression·CTR·average position·landing conversion·indexed pages·crawl errors·Web Vitals를 함께 봐야 한다.",
    },
    {
      id: "q19",
      question: "AI 답변에 유리한 콘텐츠 구조로 옳은 것은?",
      choices: [
        "긴 마케팅 문단으로 브랜드 메시지를 충분히 전달한다",
        "FAQ schema를 화면에 없는 질문까지 포함해 최대한 넣는다",
        "질문형 heading 아래 짧은 결론을 먼저 쓰고 근거·조건·예외·표·최신성 표시를 이어 붙인다",
        "핵심 키워드를 문단마다 반복해 밀도를 높인다",
      ],
      answerIndex: 2,
      explanation:
        "질문형 heading, 짧은 결론, 근거 bullet, 표, 정의-조건-예외 구조, 최신성 표시를 둔다. 긴 마케팅 문단만 있으면 답변 엔진이 구체적 근거를 추출하기 어렵다.",
    },
    {
      id: "q20",
      question: "internal linking에서 anchor text를 다루는 올바른 방법은?",
      choices: [
        "모든 anchor를 '여기', '자세히'처럼 짧게 통일한다",
        "핵심 페이지는 footer 링크만으로 충분히 연결한다",
        "링크를 많이 걸수록 ranking signal이 강해지므로 최대한 많이 건다",
        "'여기' 대신 'GA4 이벤트 스키마 예시'처럼 대상 페이지의 주제와 사용자 기대를 설명하는 구체적 anchor를 쓴다",
      ],
      answerIndex: 3,
      explanation:
        "anchor text는 대상 페이지의 주제와 사용자 기대를 설명해야 한다. '여기'보다 'GA4 이벤트 스키마 예시'처럼 구체적인 anchor가 crawler와 사용자 모두에게 의미를 준다.",
    },
    {
      id: "q21",
      question: "삭제·이동·통합 상황에서 status code 선택으로 옳은 것은?",
      choices: [
        "영구 삭제·대체 없음은 404/410, 영구 이동·통합은 301, 임시 전환은 302를 고른다",
        "모든 오류를 홈으로 301 redirect한다",
        "삭제된 URL도 200으로 유지해 색인을 보존한다",
        "이동은 항상 302, 삭제는 항상 200으로 처리한다",
      ],
      answerIndex: 0,
      explanation:
        "삭제·이동·통합 목적에 따라 404/410/301/302를 고르고 internal link와 sitemap을 정리한다. 모든 오류를 홈으로 redirect하면 soft 404와 사용자 혼란이 생긴다.",
    },
    {
      id: "q22",
      question: "SPA에서 route analytics를 올바르게 처리하는 방법은?",
      choices: [
        "초기 페이지 로드만 추적하면 충분하다",
        "client route change를 page_view로 명시 전송하고 title/path/referrer context를 정확히 갱신한다",
        "route 변경은 자동으로 기록되므로 별도 전송이 필요 없다",
        "SPA에서는 page_view 대신 클릭 이벤트만 남긴다",
      ],
      answerIndex: 1,
      explanation:
        "client route change를 page_view로 명시 전송하고 title/path/referrer context를 정확히 갱신해야 한다. 초기 로드만 추적하면 대부분의 화면 이동이 분석에서 사라진다.",
    },
    {
      id: "q23",
      question: "A/B 테스트에서 노출(exposure) 이벤트 없이 전환만 측정하면 생기는 문제는?",
      choices: [
        "variant 비율이 자동으로 50:50으로 맞춰진다",
        "guardrail metric이 전환 지표를 대체한다",
        "실제로 실험을 본 사용자와 보지 않은 사용자가 섞인다",
        "SRM이 발생할 수 없게 된다",
      ],
      answerIndex: 2,
      explanation:
        "노출 이벤트 없이 전환만 보면 실제로 실험을 본 사용자와 보지 않은 사용자가 섞인다. exposure·variant·assignment id·conversion·guardrail metric을 명확히 기록해야 한다.",
    },
    {
      id: "q24",
      question: "마케팅 script와 성능의 균형을 맞추는 접근으로 옳은 것은?",
      choices: [
        "모든 태그를 초기 로드에 넣어 측정 누락을 막는다",
        "chat widget을 LCP 이전에 먼저 로드해 응답성을 높인다",
        "성능 지표와 무관하게 전환 태그를 최우선으로 로드한다",
        "비즈니스 가치와 성능 비용을 비교하고 consent 이후 지연 로드·sandbox·server-side tagging을 검토한다",
      ],
      answerIndex: 3,
      explanation:
        "비즈니스 가치와 성능 비용을 비교하고 consent 이후 지연 로드·sandbox·server-side tagging을 검토한다. 모든 태그를 초기 로드에 넣으면 LCP/INP와 개인정보 기준을 동시에 해칠 수 있다.",
    },
    {
      id: "q25",
      question: "analytics 데이터 품질을 보장하기 위한 조치로 옳은 것은?",
      choices: [
        "tracking plan·typed event schema·QA 환경 검증·중복 방지·bot/internal traffic filtering을 둔다",
        "수집 후 대시보드에서 이상치를 보정하면 충분하다",
        "가능한 모든 이벤트를 자동 수집해 데이터를 최대화한다",
        "내부 트래픽을 운영 리포트에 포함해 표본을 키운다",
      ],
      answerIndex: 0,
      explanation:
        "tracking plan·typed event schema·QA 환경 검증·중복 방지·bot/internal traffic filtering을 둔다. 잘못 수집된 데이터는 나중에 보정하기 어렵고 제품 결정을 왜곡한다.",
    },
    {
      id: "q26",
      question: "release annotation이 SEO/analytics 분석에서 중요한 이유는?",
      choices: [
        "annotation이 검색 순위를 직접 올려줘서",
        "metadata·canonical·SSR·sitemap·tracking 변경 시점을 알아야 impression·CTR·conversion 변화를 해석할 수 있어서",
        "annotation이 crawl budget을 늘려줘서",
        "annotation이 중복 이벤트를 자동으로 제거해서",
      ],
      answerIndex: 1,
      explanation:
        "metadata·canonical·SSR·sitemap·tracking 변경이 언제 배포됐는지 알아야 impression·CTR·conversion 변화를 해석할 수 있다. annotation이 없으면 검색 알고리즘 변화와 제품 변경을 분리하기 어렵다.",
    },
    {
      id: "q27",
      question: "entity SEO에서 schema만 넣는 것으로 충분하지 않은 이유는?",
      choices: [
        "schema는 rendered HTML에 넣을 수 없기 때문",
        "schema를 넣으면 canonical이 무효화되기 때문",
        "Organization/Product/Person schema가 실제 화면 콘텐츠·author·about page·sameAs·internal links와 맞아야 entity 신뢰가 생기기 때문",
        "schema만으로도 knowledge panel이 자동 생성되기 때문",
      ],
      answerIndex: 2,
      explanation:
        "Organization·Product·Person schema는 실제 화면 콘텐츠·author·about page·sameAs·internal links와 맞아야 한다. schema와 본문이 다르면 entity 신뢰가 약해진다.",
    },
    {
      id: "q28",
      question: "crawl budget을 특히 신경 써야 하는 경우는?",
      choices: [
        "작은 사이트에서 페이지 수가 적을 때",
        "canonical이 모두 self-canonical로 설정되어 있을 때",
        "sitemap의 lastmod가 정확할 때",
        "대규모 URL, 필터 파라미터, 중복 콘텐츠, 자주 바뀌는 페이지가 많을 때",
      ],
      answerIndex: 3,
      explanation:
        "대규모 URL, 필터 파라미터, 중복 콘텐츠, 자주 바뀌는 페이지가 많을 때 crawl budget이 중요하다. 중요하지 않은 URL이 많이 열리면 검색 엔진이 핵심 페이지를 늦게 발견하거나 덜 자주 갱신한다.",
    },
    {
      id: "q29",
      question: "structured data 검증에서 확인해야 하는 핵심은?",
      choices: [
        "schema.org 타입·required/recommended fields·실제 화면 콘텐츠와의 일치·validation error",
        "schema를 화면에 없는 정보까지 최대한 풍부하게 채웠는지",
        "JSON-LD가 DOM 트리 안에 인라인으로 들어갔는지",
        "FAQ schema를 모든 페이지에 반복 삽입했는지",
      ],
      answerIndex: 0,
      explanation:
        "schema.org 타입, required/recommended fields, 실제 화면 콘텐츠와의 일치, validation error를 확인한다. 보이지 않는 정보를 구조화 데이터에만 넣으면 검색 정책 위반과 rich result 누락이 생길 수 있다.",
    },
    {
      id: "q30",
      question: "position은 유지되는데 CTR만 떨어질 때 우선 확인할 것은?",
      choices: [
        "canonical 오지정과 redirect chain",
        "snippet, SERP feature 변화, 경쟁 결과",
        "crawl budget 부족과 sitemap 누락",
        "hydration 오류와 soft 404",
      ],
      answerIndex: 1,
      explanation:
        "position이 유지되는데 CTR만 떨어지면 snippet·SERP feature 변화·경쟁 결과를 우선 확인한다. query와 landing page가 맞는지, title/description이 SERP 의도와 다른지, rich result나 브랜드 신뢰 신호가 약한지도 본다.",
    },
  ],
};

export default quiz;
