import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractHandbookDocument } from "./handbook-html.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public", "handbook");
const moduleDir = path.join(rootDir, "src", "handbook", "documents");

const docs = [
  {
    id: "context-scale-systems",
    file: "context-scale-systems-handbook.html",
    title: "엔지니어링 규모 감각",
    scope: "SCALE · TRAFFIC · RELEASE · FAILURE · ORGANIZATION",
    subtitle: "작은 서비스와 큰 제품 조직에서 같은 기술이 왜 다르게 보이는지 이해하기 위한 규모 감각입니다.",
    navBrand: "ENGINEERING CONTEXT · SCALE",
    navTitle: "규모 감각",
    sections: [
      ["SCALE-01", "규모는 숫자가 아니라 실패 방식이다", "사용자 수가 늘면 코드가 갑자기 어려워지는 것이 아니라 실패가 드러나는 방식이 바뀐다. 로컬에서는 한 번 누락된 상태가 production에서는 수천 명의 재시도, 캐시 오염, 큐 적체, 고객센터 문의로 증폭된다.", [["작은 서비스", "오류가 한 요청 안에서 끝난다", "로그를 보고 직접 고친다"], ["큰 서비스", "오류가 재시도, 캐시, 배포, 알림으로 전파된다", "소유권과 관측 지표로 좁힌다"], ["학습 포인트", "기술명보다 전파 경로를 본다", "실패 반경과 복구 시간을 함께 생각한다"]]],
      ["SCALE-02", "트래픽 감각", "트래픽은 평균 요청 수가 아니라 피크, burst, fan-out, retry까지 포함한 압력이다. 요청 하나가 내부 API 5개와 DB query 8개를 부르면 외부 QPS보다 내부 부하가 훨씬 커질 수 있다.", [["용어", "QPS/RPS", "초당 요청 수. 평균보다 피크와 분산이 중요하다."], ["용어", "fan-out", "한 요청이 여러 내부 호출로 갈라지는 구조."], ["용어", "retry storm", "실패한 요청의 재시도가 부하를 더 키우는 현상."]]],
      ["SCALE-03", "릴리즈 규모", "큰 조직에서 배포는 코드를 서버에 올리는 행위가 아니라 변경을 사용자에게 노출하는 리스크 관리다. 한 릴리즈에 수백 개 변경이 들어가면 어떤 변경이 어떤 기능을 깨뜨릴지 영향 범위를 자동화와 소유권으로 줄여야 한다.", [["개념", "release candidate", "출시 후보 빌드. 기능 추가보다 검증 대상이 된다."], ["개념", "smoke test", "핵심 경로가 아예 죽지 않았는지 빠르게 확인."], ["개념", "regression test", "기존 동작이 새 변경으로 깨지지 않았는지 확인."]]],
      ["SCALE-04", "상태와 데이터 규모", "데이터가 많아지면 페이지네이션, 인덱스, 캐시, 배치, export가 모두 제품 기능이 된다. 화면에서 50개를 보여주는 일도 실제로는 권한, 필터, 정렬, 총 개수, 최신성, 다운로드 정책을 포함한다.", [["문제", "대량 목록", "offset pagination, cursor pagination, 정렬 안정성"], ["문제", "export", "권한, 비동기 생성, 만료 링크, 감사 로그"], ["문제", "검색", "색인 지연, 동의어, 필터 조합, 빈 결과 UX"]]],
      ["SCALE-05", "조직 규모와 소유권", "시스템이 커지면 모든 사람이 모든 것을 알 수 없다. 그래서 owner, boundary, interface, runbook, review rule이 필요하다. 좋은 엔지니어링 글은 기술 설명보다 누가 무엇을 책임졌는지의 경계를 자주 보여준다.", [["경계", "service owner", "장애와 변경의 최종 책임자"], ["경계", "platform owner", "다른 팀이 쓰는 공통 기반 책임자"], ["경계", "consumer team", "공통 도구를 실제 제품 흐름에 적용하는 팀"]]],
      ["SCALE-06", "읽히는 신호", "규모 있는 글을 읽을 때는 숫자보다 압력의 종류를 본다. 사용자가 많아서 어려운가, 변경이 많아서 어려운가, 팀이 많아서 어려운가, 호환성을 지켜야 해서 어려운가를 구분하면 맥락이 읽힌다.", [["압력", "사용자 규모", "latency, error rate, capacity, abuse"], ["압력", "변경 규모", "release train, QA, rollback"], ["압력", "조직 규모", "ownership, standard, platform, governance"]]],
    ],
  },
  {
    id: "context-platform-productivity",
    file: "context-platform-productivity-handbook.html",
    title: "플랫폼 엔지니어링과 개발자 생산성",
    scope: "PLATFORM · INTERNAL TOOLS · DX · GOLDEN PATH",
    subtitle: "사내 도구, 공통 플랫폼, 개발자 경험이 왜 제품 속도와 품질의 기반이 되는지 이해합니다.",
    navBrand: "ENGINEERING CONTEXT · PLATFORM",
    navTitle: "플랫폼·생산성",
    sections: [
      ["PLAT-01", "플랫폼은 공통 책임을 제품화한 것이다", "플랫폼 엔지니어링은 팀마다 반복하던 배포, 권한, 관측, 템플릿, 테스트 환경을 공통 제품으로 만드는 일이다. 핵심 고객은 내부 개발자이고, 성공 기준은 사용 팀의 속도와 안전성이다.", [["공통 문제", "배포", "팀마다 다른 스크립트를 표준 pipeline으로"], ["공통 문제", "권한", "수동 계정 발급을 self-service + audit로"], ["공통 문제", "관측", "로그/메트릭/트레이스 기본값 제공"]]],
      ["PLAT-02", "Golden path", "Golden path는 조직이 권장하는 안전한 기본 경로다. 모든 선택지를 금지하는 것이 아니라, 대부분의 팀이 빠르게 시작하고 안전하게 운영할 수 있는 기본 조합을 제공한다.", [["요소", "template", "프로젝트 생성, lint, test, CI 기본값"], ["요소", "guardrail", "보안 스캔, 배포 승인, secret 차단"], ["요소", "escape hatch", "특수 요구를 위한 예외 경로와 승인 기준"]]],
      ["PLAT-03", "개발자 생산성 지표", "생산성은 커밋 수가 아니라 대기 시간, 반복 작업, 실패 후 복구 시간, 변경 리드타임으로 본다. 좋은 플랫폼 글은 도구 기능보다 개발자가 덜 기다리고 덜 실수하게 된 구조를 설명한다.", [["지표", "lead time", "작업 시작부터 production 반영까지 시간"], ["지표", "review latency", "리뷰 요청부터 승인까지 대기"], ["지표", "self-service rate", "플랫폼 팀 개입 없이 완료된 작업 비율"]]],
      ["PLAT-04", "사내 도구의 함정", "사내 도구는 만들기보다 유지가 어렵다. 문서, 권한, 장애 대응, 호환성, 지원 채널이 없으면 도구가 생산성을 높이는 대신 또 다른 병목이 된다.", [["위험", "도구 owner 없음", "문의와 장애가 방치된다"], ["위험", "강제 표준화", "특수 케이스가 편법으로 빠진다"], ["위험", "측정 없음", "좋아졌는지 감으로만 판단한다"]]],
      ["PLAT-05", "플랫폼과 제품팀의 계약", "플랫폼은 제품팀의 책임을 없애지 않는다. 공통 기반은 안전한 기본값을 제공하고, 제품팀은 도메인 요구, 사용자 영향, 출시 판단을 책임진다.", [["책임", "플랫폼 팀", "기본 경로, guardrail, 운영 지원"], ["책임", "제품 팀", "사용자 가치, 도메인 테스트, 출시 결정"], ["책임", "공동", "장애 대응, migration, adoption plan"]]],
      ["PLAT-06", "읽히는 신호", "플랫폼 글을 읽을 때는 ‘무엇을 만들었나’보다 ‘누구의 반복 문제를 줄였나’를 본다. 내부 고객, adoption, migration, support cost, guardrail이 함께 나오면 플랫폼 맥락이 있는 글이다.", [["신호", "내부 고객", "사용 팀과 사용 시나리오가 명확하다"], ["신호", "adoption path", "기존 팀이 어떻게 옮겨오는지 설명한다"], ["신호", "운영 모델", "문의, 장애, 예외 승인 방식이 있다"]]],
    ],
  },
  {
    id: "context-quality-release",
    file: "context-quality-release-handbook.html",
    title: "품질 엔지니어링과 릴리즈 시스템",
    scope: "QA · TEST STRATEGY · RELEASE · HOTFIX",
    subtitle: "테스트를 많이 하는 것이 아니라 변경을 믿고 내보내는 시스템을 이해합니다.",
    navBrand: "ENGINEERING CONTEXT · QUALITY",
    navTitle: "품질·릴리즈",
    sections: [
      ["QUAL-01", "품질은 출시 가능성의 언어다", "품질 엔지니어링은 버그를 찾는 활동만이 아니라 어떤 변경을 언제 내보내도 되는지 판단하는 기준을 만드는 일이다. 테스트는 그 기준을 실행 가능한 형태로 만든 도구다.", [["질문", "무엇이 깨지면 출시를 멈추는가", "blocker 기준"], ["질문", "어떤 변경을 우선 검증하는가", "risk-based testing"], ["질문", "출시 뒤 무엇을 관측하는가", "crash, error, funnel, support signal"]]],
      ["QUAL-02", "테스트 피라미드보다 테스트 목적", "unit, integration, e2e는 계층 이름보다 목적이 중요하다. 빠르게 원인을 좁히는 테스트, 계약을 지키는 테스트, 실제 사용자 흐름을 지키는 테스트가 서로 다른 역할을 한다.", [["테스트", "unit", "작은 규칙과 edge case를 빠르게 검증"], ["테스트", "integration/contract", "모듈·API 경계의 계약 검증"], ["테스트", "e2e/smoke", "핵심 사용자 경로 생존 확인"]]],
      ["QUAL-03", "Flaky test", "가끔 실패하는 테스트는 테스트가 아니라 신뢰 비용이다. randomness, time, network, async wait, shared state, test order 의존성을 제거하지 않으면 CI가 경고음이 아니라 소음이 된다.", [["원인", "time", "고정 clock 또는 fake timer 필요"], ["원인", "network", "mock, contract fixture, retry 기준 필요"], ["원인", "shared state", "격리된 DB, cleanup, deterministic seed 필요"]]],
      ["QUAL-04", "릴리즈 후보와 회귀", "Release candidate는 새 기능을 더 넣는 시점이 아니라 현재 변경 묶음을 검증하는 단위다. 회귀 테스트는 모든 것을 다시 누르는 것이 아니라 변경 영향 범위와 핵심 경로를 조합해 위험을 줄인다.", [["개념", "change impact", "어떤 코드가 어떤 기능에 영향을 주는가"], ["개념", "test selection", "영향 범위에 맞는 테스트 우선순위"], ["개념", "release note", "변경과 관측 포인트를 배포 단위로 기록"]]],
      ["QUAL-05", "핫픽스 판단", "핫픽스는 빠른 해결처럼 보이지만 사용자에게 또 다른 변경을 강제한다. 즉시 수정, 다음 릴리즈 반영, feature flag off, rollback 중 무엇이 안전한지 사용자 영향과 재발 가능성으로 판단한다.", [["선택", "rollback", "이전 버전이 안전하고 데이터 호환성이 유지될 때"], ["선택", "flag off", "문제 기능을 끌 수 있을 때"], ["선택", "hotfix", "영향이 크고 수정 범위가 작고 검증 가능할 때"]]],
      ["QUAL-06", "읽히는 신호", "품질 글을 읽을 때는 테스트 도구 이름보다 기준을 본다. 무엇을 blocker로 보고, 어떤 변경을 위험하다고 보고, 출시 후 어떤 지표로 확인하는지가 있으면 품질 엔지니어링 맥락이 살아 있다.", [["신호", "risk tier", "변경 위험 등급"], ["신호", "quality gate", "출시 차단 기준"], ["신호", "post-release monitor", "출시 후 관측 기준"]]],
    ],
  },
  {
    id: "context-performance-metrics",
    file: "context-performance-metrics-handbook.html",
    title: "성능 측정과 지표 해석",
    scope: "METRICS · LATENCY · BUNDLE · CRASH · COST",
    subtitle: "빠르다/느리다가 아니라 무엇을 어떤 조건에서 측정했는지 읽는 기준입니다.",
    navBrand: "ENGINEERING CONTEXT · METRICS",
    navTitle: "성능·지표",
    sections: [
      ["MET-01", "성능 주장은 비교 조건이 전부다", "성능 개선 글에서 가장 중요한 것은 숫자 자체가 아니라 측정 조건이다. 입력 크기, 데이터 분포, warm/cold 상태, 네트워크, 디바이스, 캐시 상태가 없으면 개선 수치를 해석할 수 없다.", [["조건", "baseline", "무엇과 비교했는가"], ["조건", "workload", "어떤 입력과 사용 패턴인가"], ["조건", "environment", "브라우저, 서버, 지역, 캐시 상태"]]],
      ["MET-02", "평균보다 percentiles", "평균 latency는 tail을 숨긴다. p95, p99는 느린 사용자 경험과 큐잉, GC, DB lock, 네트워크 지연 같은 문제를 드러낸다.", [["지표", "p50", "절반의 요청이 이보다 빠름. 일반 체감"], ["지표", "p95", "느린 5% 사용자 경험"], ["지표", "p99", "장애와 병목 후보를 드러내는 tail"]]],
      ["MET-03", "프론트엔드 성능 지표", "프론트엔드 성능은 번들 크기만이 아니다. LCP, INP, CLS, hydration, JavaScript parse/execute, image loading, network waterfall을 함께 본다.", [["지표", "LCP", "주요 콘텐츠가 보이는 시간"], ["지표", "INP", "입력 반응성"], ["지표", "bundle size", "다운로드뿐 아니라 parse/execute 비용"]]],
      ["MET-04", "신뢰성과 제품 지표", "서비스 품질은 error rate, crash-free rate, availability, success funnel 같은 제품 지표와 연결된다. 기술 지표가 좋아도 사용자가 실패하면 품질은 나쁜 것이다.", [["지표", "crash-free rate", "충돌 없이 세션이 끝난 비율"], ["지표", "error budget", "허용 가능한 실패 예산"], ["지표", "funnel drop", "기술 오류가 사용자 전환에 미친 영향"]]],
      ["MET-05", "비용과 효율", "성능은 비용과 분리되지 않는다. 캐시를 늘리면 latency는 줄 수 있지만 freshness와 invalidation 비용이 생기고, 더 큰 인스턴스는 빠르지만 단위 요청 비용이 커진다.", [["축", "latency", "사용자 대기 시간"], ["축", "throughput", "단위 시간 처리량"], ["축", "cost per success", "성공 요청 하나를 만드는 비용"]]],
      ["MET-06", "읽히는 신호", "좋은 성능 글은 숫자, 조건, trade-off, 회귀 방지 방법이 함께 있다. 개선 수치만 있고 측정 조건과 재현 방법이 없으면 홍보 문장에 가깝다.", [["신호", "before/after", "같은 조건의 비교"], ["신호", "methodology", "측정 방법과 표본"], ["신호", "regression guard", "다시 나빠지는 것을 잡는 테스트나 대시보드"]]],
    ],
  },
  {
    id: "context-library-oss",
    file: "context-library-oss-handbook.html",
    title: "라이브러리·패키지·오픈소스 설계",
    scope: "API SURFACE · PACKAGE · COMPATIBILITY · OSS",
    subtitle: "남이 믿고 쓰는 코드가 앱 내부 코드와 어떻게 다른지 이해합니다.",
    navBrand: "ENGINEERING CONTEXT · LIBRARY",
    navTitle: "라이브러리·오픈소스",
    sections: [
      ["LIB-01", "라이브러리는 API 약속이다", "앱 내부 함수는 호출자를 바꿀 수 있지만 라이브러리는 알 수 없는 사용자의 코드와 호환성을 지켜야 한다. 그래서 API surface, edge case, semver, documentation이 구현만큼 중요하다.", [["개념", "API surface", "사용자에게 노출된 함수, 타입, 옵션"], ["개념", "behavior contract", "입력에 대해 어떤 출력을 보장하는가"], ["개념", "breaking change", "기존 사용자의 코드가 깨지는 변경"]]],
      ["LIB-02", "Edge case의 비용", "라이브러리는 단순한 80% 사용 사례와 오래된 호환성 사이에서 선택해야 한다. 모든 edge case를 지원하면 무거워지고, 너무 적게 지원하면 adoption이 어렵다.", [["선택", "strict modern API", "작고 빠르지만 기존 호환성 낮음"], ["선택", "compat layer", "전환은 쉽지만 유지 비용 증가"], ["선택", "plugin/adapter", "핵심은 작게 두고 특수 케이스 분리"]]],
      ["LIB-03", "패키지 형식과 번들링", "ESM, CJS, tree-shaking, sideEffects, type declaration은 라이브러리 사용자의 빌드 결과를 좌우한다. 라이브러리 설계는 런타임 코드뿐 아니라 배포 형태의 설계다.", [["개념", "ESM", "정적 import/export로 tree-shaking에 유리"], ["개념", "CJS", "Node 생태계 호환성이 넓지만 정적 분석이 약함"], ["개념", "sideEffects", "사용하지 않는 코드를 제거해도 안전한지 알려주는 신호"]]],
      ["LIB-04", "Adoption cost", "좋은 라이브러리는 기능이 좋아도 옮겨오기 어려우면 쓰이지 않는다. drop-in replacement, codemod, migration guide, compatibility test가 adoption을 좌우한다.", [["수단", "codemod", "반복 import/API 변경 자동화"], ["수단", "migration guide", "기존 코드에서 옮기는 순서"], ["수단", "compat package", "기존 API와 동작을 최대한 맞춘 전환 계층"]]],
      ["LIB-05", "오픈소스 운영", "오픈소스는 공개 저장소가 아니라 이슈, PR, 릴리즈, 문서, 보안 신고, 커뮤니티 기대치를 운영하는 일이다. maintainer time이 가장 희소한 자원이다.", [["역할", "maintainer", "방향, 리뷰, 릴리즈, 품질 기준"], ["역할", "contributor", "문제 제기, 수정, 문서 개선"], ["역할", "consumer", "사용, bug report, migration pressure"]]],
      ["LIB-06", "읽히는 신호", "라이브러리 글을 읽을 때는 성능 수치와 함께 API 호환성, migration path, edge case 정책을 본다. 빠르지만 기존 사용자가 옮기기 어렵다면 생태계 영향은 제한된다.", [["신호", "API design", "작고 예측 가능한 인터페이스"], ["신호", "compatibility", "기존 사용자 보호"], ["신호", "ecosystem adoption", "다른 패키지와 도구가 채택 가능한 구조"]]],
    ],
  },
  {
    id: "context-migration-compatibility",
    file: "context-migration-compatibility-handbook.html",
    title: "마이그레이션과 호환성",
    scope: "MIGRATION · COMPATIBILITY · ROLLOUT · DEPRECATION",
    subtitle: "큰 시스템에서 기술을 한 번에 바꾸지 못하는 이유와 안전한 전환의 언어를 익힙니다.",
    navBrand: "ENGINEERING CONTEXT · MIGRATION",
    navTitle: "마이그레이션·호환성",
    sections: [
      ["MIG-01", "마이그레이션은 변경 관리다", "마이그레이션은 새 기술 적용이 아니라 기존 사용자를 깨뜨리지 않고 상태를 옮기는 과정이다. 코드, 데이터, API, 문서, 팀 습관까지 함께 이동해야 한다.", [["대상", "code migration", "API, import, framework 변경"], ["대상", "data migration", "schema, backfill, consistency"], ["대상", "workflow migration", "팀의 작업 방식과 도구 변경"]]],
      ["MIG-02", "호환성의 종류", "Backward compatibility는 새 코드가 옛 입력을 받아들이는 능력이고, forward compatibility는 옛 코드가 새 데이터를 만나도 크게 깨지지 않는 능력이다. 배포 순서가 나뉘면 둘 다 중요해진다.", [["개념", "backward compatible", "새 버전이 기존 사용자를 깨지 않음"], ["개념", "forward compatible", "구버전이 새 데이터와 공존 가능"], ["개념", "wire compatibility", "프로세스 사이 데이터 형식 호환"]]],
      ["MIG-03", "Expand-contract", "DB와 API 변경은 보통 expand-contract로 간다. 먼저 새 필드/경로를 추가하고, 양쪽을 모두 지원하고, 트래픽을 옮긴 뒤, 마지막에 옛 것을 제거한다.", [["단계", "expand", "새 구조 추가. 기존 구조 유지"], ["단계", "migrate", "읽기/쓰기 경로 전환, backfill"], ["단계", "contract", "옛 구조 제거. 사용량 0 확인 후"]]],
      ["MIG-04", "점진적 롤아웃", "한 번에 전환하면 실패 반경이 전체가 된다. feature flag, canary, shadow traffic, dual write, read fallback은 실패 반경을 줄이는 기술이다.", [["수단", "feature flag", "사용자/팀/환경별 노출 제어"], ["수단", "canary", "일부 트래픽에 먼저 적용"], ["수단", "shadow traffic", "실제 요청을 새 경로에도 보내되 응답은 사용하지 않음"]]],
      ["MIG-05", "Deprecation", "사용 중단은 공지문이 아니라 계약 변경 절차다. 대체 경로, 사용량 측정, 경고, deadline, owner, 제거 PR이 함께 있어야 한다.", [["절차", "usage inventory", "누가 쓰는지 측정"], ["절차", "warning", "로그, build warning, runtime warning"], ["절차", "deadline", "제거 시점과 예외 승인"]]],
      ["MIG-06", "읽히는 신호", "마이그레이션 글은 새 기술의 장점보다 전환 전략이 중요하다. 호환성, 롤백, 사용량 측정, 단계별 제거가 있으면 큰 시스템에서 나온 글이다.", [["신호", "dual support", "신/구 경로가 같이 동작하는 기간"], ["신호", "rollback plan", "되돌릴 수 있는 지점"], ["신호", "adoption metric", "전환률과 남은 사용자"]]],
    ],
  },
  {
    id: "context-frontend-runtime-ecosystem",
    file: "context-frontend-runtime-ecosystem-handbook.html",
    title: "프론트엔드 빌드·런타임·생태계",
    scope: "BUNDLER · RUNTIME · PACKAGE · BROWSER",
    subtitle: "React 사용법 아래의 번들러, 패키지 형식, 브라우저 런타임, 생태계 제약을 이해합니다.",
    navBrand: "ENGINEERING CONTEXT · FRONTEND RUNTIME",
    navTitle: "FE 빌드·런타임",
    sections: [
      ["FER-01", "프론트엔드는 빌드 결과가 제품이다", "개발자가 쓴 소스가 아니라 브라우저가 받은 HTML, CSS, JS, asset, cache header가 실제 제품이다. 빌드 시스템은 이 산출물을 만드는 compiler pipeline이다.", [["산출물", "HTML entry", "초기 로딩과 asset 참조"], ["산출물", "JS chunk", "다운로드, parse, execute 비용"], ["산출물", "CSS/asset", "렌더링 차단, 이미지 최적화, 캐시"]]],
      ["FER-02", "번들러의 역할", "번들러는 모듈 그래프를 읽고, 변환하고, 쪼개고, 최적화한다. tree-shaking, code splitting, minification, asset hashing은 런타임 성능과 배포 안정성을 만든다.", [["기능", "tree-shaking", "쓰지 않는 export 제거"], ["기능", "code splitting", "필요한 시점에 chunk 로드"], ["기능", "hashing", "내용 기반 파일명으로 캐시 안정화"]]],
      ["FER-03", "ESM/CJS와 패키지 경계", "프론트엔드 생태계의 많은 문제는 패키지 형식과 module resolution에서 나온다. ESM-only 패키지, dual package hazard, default export 차이, browser field를 이해해야 빌드 오류를 읽을 수 있다.", [["개념", "module resolution", "import가 실제 파일로 해석되는 규칙"], ["개념", "dual package", "ESM/CJS를 동시에 제공할 때 생기는 경계 문제"], ["개념", "browser field", "브라우저용 대체 entry 지정"]]],
      ["FER-04", "Hydration과 클라이언트 런타임", "SSR/SSG 앱은 HTML이 먼저 보이고 JavaScript가 나중에 붙는다. hydration mismatch, client-only state, browser API 접근, streaming은 렌더링 전략의 핵심 제약이다.", [["문제", "hydration mismatch", "서버 HTML과 클라이언트 첫 렌더가 다름"], ["문제", "client boundary", "브라우저 API는 서버에서 없음"], ["문제", "islands/partial hydration", "필요한 부분만 상호작용 부여"]]],
      ["FER-05", "브라우저 호환성과 Polyfill", "브라우저 기능은 사용 가능성과 비용을 함께 본다. polyfill은 호환성을 주지만 번들 비용과 전역 오염을 만들 수 있다.", [["개념", "transpile", "문법을 낮은 버전으로 변환"], ["개념", "polyfill", "없는 런타임 기능을 구현"], ["개념", "browserslist", "지원 브라우저 범위가 빌드 결과를 결정"]]],
      ["FER-06", "읽히는 신호", "프론트엔드 생태계 글은 사용자 코드보다 빌드 산출물과 브라우저 비용을 자주 다룬다. chunk, ESM, tree-shaking, hydration, cache가 함께 보이면 이 층의 이야기다.", [["신호", "bundle analysis", "어떤 코드가 왜 포함됐는가"], ["신호", "runtime cost", "parse/execute/hydration 비용"], ["신호", "compat policy", "지원 브라우저와 polyfill 기준"]]],
    ],
  },
  {
    id: "context-operational-ownership",
    file: "context-operational-ownership-handbook.html",
    title: "운영 책임과 장애 대응 언어",
    scope: "OWNERSHIP · ON-CALL · INCIDENT · SLO · POSTMORTEM",
    subtitle: "제품 조직에서 운영 책임, 온콜, 장애, 사후분석이 어떤 언어로 연결되는지 익힙니다.",
    navBrand: "ENGINEERING CONTEXT · OWNERSHIP",
    navTitle: "운영 책임",
    sections: [
      ["OWN-01", "Ownership은 코드 소유가 아니라 결과 책임이다", "운영 책임은 누가 파일을 수정했는가보다 사용자가 실패했을 때 누가 판단하고 복구하고 재발을 막는가에 가깝다. owner는 변경, 알림, runbook, 지표, 의사결정의 접점이다.", [["책임", "service owner", "서비스 정상성, 장애 대응, 변경 승인"], ["책임", "feature owner", "기능 동작과 사용자 영향"], ["책임", "platform owner", "공통 기반과 사용 팀 지원"]]],
      ["OWN-02", "On-call", "온콜은 밤에 깨는 사람이 아니라 시스템의 긴급 의사결정 경로다. alert가 울리면 영향 범위, 완화책, escalation, communication을 빠르게 정해야 한다.", [["요소", "alert", "사람을 깨울 가치가 있는 신호"], ["요소", "runbook", "처음 10분 행동 절차"], ["요소", "escalation", "어느 조건에서 누구를 부르는가"]]],
      ["OWN-03", "Incident language", "장애 대응의 언어는 원인 추측보다 사용자 영향, 현재 상태, 완화책, 다음 업데이트 시간이다. 원인은 나중에 찾더라도 사용자 영향과 복구 방향은 먼저 공유해야 한다.", [["문장", "Impact", "어떤 사용자가 무엇을 못 하는가"], ["문장", "Mitigation", "지금 어떤 조치를 하고 있는가"], ["문장", "ETA/next update", "언제 다음 정보를 줄 것인가"]]],
      ["OWN-04", "SLO와 error budget", "SLO는 완벽한 서비스가 아니라 약속 가능한 신뢰성 수준이다. error budget은 실패를 0으로 만들지 않고 기능 개발과 안정성의 균형을 잡기 위한 언어다.", [["개념", "SLI", "측정하는 신뢰성 지표"], ["개념", "SLO", "목표 수준"], ["개념", "error budget", "허용 가능한 실패량"]]],
      ["OWN-05", "Postmortem", "사후분석은 범인 찾기가 아니라 시스템이 왜 그 실패를 허용했는지 찾는 일이다. timeline, contributing factors, detection gap, action items가 핵심이다.", [["항목", "timeline", "언제 무엇을 알았는가"], ["항목", "contributing factor", "장애를 가능하게 한 조건"], ["항목", "action item", "owner와 deadline이 있는 재발 방지"]]],
      ["OWN-06", "읽히는 신호", "운영 책임 글은 기술 해결책보다 책임 구조가 중요하다. 누가 알림을 받고, 누가 결정하고, 어떤 기준으로 배포를 멈추고, 사후 액션을 추적하는지 보면 조직의 운영 성숙도가 보인다.", [["신호", "clear owner", "모호하지 않은 책임자"], ["신호", "actionable alert", "행동 가능한 알림"], ["신호", "blameless postmortem", "개인 탓보다 시스템 개선"]]],
    ],
  },
];

const css = `:root{--paper:#F6F7FA;--panel:#FFFFFF;--ink:#161D2B;--ink-soft:#465063;--line:#D8DCE6;--green:#22418A;--green-deep:#15294F;--green-tint:#E8EDF7;--amber:#A8650D;--amber-tint:#FBF2E3;--red:#9A3324;--red-tint:#F9ECE9;--mono:'IBM Plex Mono',ui-monospace,monospace;--sans:'Pretendard Variable',Pretendard,-apple-system,sans-serif}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.75;font-size:16px}.shell{display:grid;grid-template-columns:264px 1fr;max-width:1280px;margin:0 auto}nav{position:sticky;top:0;height:100vh;overflow-y:auto;border-right:1px solid var(--line);padding:32px 20px 48px;background:var(--paper)}main{min-width:0;padding:0 56px 120px;background:var(--paper)}@media(max-width:900px){.shell{grid-template-columns:1fr}nav{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}main{padding:0 20px 80px}}.nav-brand{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--green);font-weight:600;margin-bottom:4px}.nav-title{font-size:15px;font-weight:700;margin-bottom:24px;letter-spacing:-.01em}nav a{display:flex;gap:10px;align-items:baseline;text-decoration:none;color:var(--ink-soft);padding:7px 8px;font-size:13.5px;line-height:1.4}nav a:hover{background:var(--green-tint);color:var(--green-deep)}nav a .code{font-family:var(--mono);font-size:10.5px;color:var(--green);flex-shrink:0;letter-spacing:.04em}header.hero{padding:72px 0 48px;border-bottom:1px solid var(--ink)}.hero-serial{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:var(--green);display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px}.hero-serial span{border:1px solid var(--line);padding:3px 10px;background:var(--panel)}h1{font-size:clamp(30px,4.5vw,46px);font-weight:800;letter-spacing:-.03em;line-height:1.18}.hero-sub{margin-top:18px;font-size:17px;color:var(--ink-soft);max-width:760px}.hero-meta{margin-top:28px;font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);letter-spacing:.05em}section{padding-top:72px}.ch-head{display:flex;align-items:baseline;gap:14px;border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:28px}.ch-code{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--green);letter-spacing:.1em;flex-shrink:0}h2{font-size:26px;font-weight:800;letter-spacing:-.02em}h3{font-size:18px;font-weight:700;margin:36px 0 12px;letter-spacing:-.01em}p{margin-bottom:14px}p.lede{font-size:17px;color:var(--ink-soft)}ul,ol{margin:0 0 16px 22px}li{margin-bottom:7px}code{font-family:var(--mono);font-size:.86em;background:var(--green-tint);color:var(--green-deep);padding:1px 6px}table{width:100%;border-collapse:collapse;margin:22px 0;font-size:14px;background:var(--panel);border:1px solid var(--line)}th{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-align:left;font-weight:600;color:var(--green-deep);background:var(--green-tint);padding:10px 14px;border-bottom:1px solid var(--line)}td{padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.6}tr:last-child td{border-bottom:none}.callout{border:1px solid var(--line);border-left:3px solid var(--green);background:var(--panel);padding:18px 22px;margin:22px 0}.callout.warn{border-left-color:var(--amber);background:var(--amber-tint)}.callout.risk{border-left-color:var(--red);background:var(--red-tint)}.co-label{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;font-weight:600;color:var(--green);display:block;margin-bottom:6px}.serial-card{font-family:var(--mono);background:var(--ink);color:#E7EAF1;padding:22px 26px;margin:24px 0;font-size:13.5px;line-height:2;overflow-x:auto}.serial-card .sc-label{color:#8696BD;font-size:10.5px;letter-spacing:.14em;display:block;margin-bottom:8px}.semantic-card{border:1px solid var(--line);border-left:3px solid var(--green);background:var(--panel);padding:18px 22px;margin:22px 0;font-size:14.5px;line-height:1.75}.semantic-card.process-card{background:var(--green-tint)}.semantic-card.answer-card{border-left-color:var(--green-deep)}footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);font-family:var(--mono);font-size:11px;color:var(--ink-soft);letter-spacing:.05em;line-height:2}`;

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderNav(doc) {
  return `<div class="nav-brand">${doc.navBrand}</div>
  <div class="nav-title">${doc.navTitle}</div>
  <a href="#index"><span class="code">INDEX</span>학습 위치</a>
  ${doc.sections.map(([code, title]) => `<a href="#${code.toLowerCase()}"><span class="code">${code}</span>${title}</a>`).join("\n  ")}
  <a href="#review"><span class="code">REVIEW</span>학습 확인 질문</a>`;
}

function renderTable(rows) {
  return `<table>
<tr><th>분류</th><th>개념</th><th>해석 기준</th></tr>
${rows.map((row) => `<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td><td>${escapeHtml(row[2])}</td></tr>`).join("\n")}
</table>`;
}

function renderMain(doc) {
  const sectionHtml = doc.sections
    .map(([code, title, lede, rows]) => `<section id="${code.toLowerCase()}">
<div class="ch-head"><span class="ch-code">${code}</span><h2>${title}</h2></div>
<p class="lede">${lede}</p>
${renderTable(rows)}
</section>`)
    .join("\n\n");

  return `<header class="hero">
  <div class="hero-serial">
    <span>DOC : ${doc.id.toUpperCase()}</span>
    <span>SCOPE : ${doc.scope}</span>
    <span>LANG : KO</span>
  </div>
  <h1>${doc.title}</h1>
  <p class="hero-sub">${doc.subtitle}</p>
  <div class="hero-meta">FORMAT : 개념 → 맥락 → 판단 기준 → 실패 신호 · UPDATED 2026-07</div>
</header>

<section id="index">
<div class="ch-head"><span class="ch-code">INDEX</span><h2>이 문서의 위치</h2></div>
<p class="lede">이 문서는 경험담을 흉내 내기 위한 글이 아니라, 고급 엔지니어링 사례가 자연스럽게 읽히도록 만드는 기반 개념서입니다. 기술명보다 규모, 소유권, 품질, 지표, 호환성, 운영 책임의 언어를 먼저 익힙니다.</p>
<div class="semantic-card process-card"><span class="sc-label">READING MODEL</span>기술 블로그의 문장 → 숨은 조직/운영 압력 → 관련 개념 → 판단 기준 → 실패 신호</div>
<div class="serial-card"><span class="sc-label">RECALL TARGET</span>이 문서를 외운다는 것은 용어를 정의하는 데서 끝나지 않는다. 글에서 어떤 문제가 규모, 플랫폼, 품질, 성능, 호환성, 운영 책임 중 어디에 걸리는지 즉시 분류할 수 있어야 한다.</div>
</section>

${sectionHtml}

<section id="review">
<div class="ch-head"><span class="ch-code">REVIEW</span><h2>학습 확인 질문</h2></div>
<p class="lede">아래 질문에 막힘없이 답하면 이 주제의 글을 읽을 때 핵심 맥락을 놓칠 가능성이 줄어듭니다.</p>
<table>
<tr><th>질문</th><th>기대 답변</th><th>미달 신호</th></tr>
<tr><td>이 주제에서 가장 중요한 압력은 무엇인가?</td><td>사용자 규모, 변경 규모, 조직 규모, 호환성, 운영 책임 중 하나로 분류한다.</td><td>도구명만 말하고 왜 어려운지 설명하지 못한다.</td></tr>
<tr><td>좋은 해결책을 무엇으로 검증하는가?</td><td>지표, adoption, 회귀 방지, rollback, 사용자 영향 중 하나 이상을 말한다.</td><td>“좋아졌다”, “편해졌다”처럼 감상으로 끝난다.</td></tr>
<tr><td>다른 조직에 적용할 때 무엇을 조정해야 하는가?</td><td>규모, 팀 구조, 배포 주기, 위험 허용치, 기존 시스템을 분리한다.</td><td>유명 회사 사례를 그대로 따라 하면 된다고 생각한다.</td></tr>
</table>
</section>

<footer>
ENGINEERING CONTEXT HANDBOOK · ${doc.title} · 2026-07<br>
PRINCIPLE : 좋은 엔지니어링 글을 술술 읽으려면 기술명보다 규모, 책임, 지표, 호환성, 운영 압력의 언어가 먼저 필요하다.
</footer>`;
}

function renderHtml(doc) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${doc.title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="shell">
<nav aria-label="목차">
${renderNav(doc)}
</nav>
<main>
${renderMain(doc)}
</main>
</div>
</body>
</html>`;
}

function renderModule(extracted) {
  return `import type { HandbookDocumentContent } from "../types";

const document: HandbookDocumentContent = {
  navHtml: ${JSON.stringify(extracted.navHtml)},
  mainHtml: ${JSON.stringify(extracted.mainHtml)},
};

export default document;
`;
}

await mkdir(publicDir, { recursive: true });
await mkdir(moduleDir, { recursive: true });

for (const doc of docs) {
  const html = renderHtml(doc);
  const extracted = extractHandbookDocument(html);
  await writeFile(path.join(publicDir, doc.file), html);
  await writeFile(path.join(moduleDir, `${doc.id}.ts`), renderModule(extracted));
}
