# Dev / Brand / Money Workspace

메인 `/`에서 Dev · Brand · 재테크의 세 공간을 선택합니다.

- `/dev`: 기존 Dev Handbook. 문서·학습 기능과 기존 저장 상태를 유지합니다.
- `/money`: 재테크 학습 홈. 순자산·현금흐름·목적별 자금 구분과 전체 학습 목차.
- `/money/:category/:lesson`: 자산관리 전략, ISA/연금저축, 절세, 거시경제 상식, 암호화폐, 부동산, 주식의 7개 카테고리 · 총 42개 학습·계획 주제. 경로는 `src/workspace/money/navigation.mjs`에서 관리하며 알 수 없는 경로는 404 화면으로 처리합니다. 각 페이지는 개념·가정 예시·위험·점검 질문·확인일과 출처를 제공합니다. 메뉴는 hover·터치·키보드로 작동하며 계좌 연동·매매 추천 기능은 없습니다. 개인 계획은 브라우저에만 저장됩니다.
- 거시경제는 기초 개념 → 시장 관찰 → 국면과 시나리오 → 시클리컬과 업종 → 관찰 습관의 5단계로 묶습니다. 기존 `rates`, `inflation`, `cycles` 경로를 유지하고 `observation`, `indicators`, `regimes`, `credit`, `scenarios`, `cyclical`, `supply-cycle`, `sectors`, `routine` 9개 하위 페이지를 추가했습니다. 각 신규 페이지에는 관찰·비교표가 있으며 시나리오는 학습용 조건부 해석입니다. 현재 시장 진단·자동 데이터 갱신·수익 예측을 제공하지 않습니다.
- 거시경제 12개 페이지에는 총 42개의 상세 해설이 있습니다. 개념 정의 외에 인과관계·계산·자료 읽는 순서·반례를 풀어 설명하며, 업종별 관찰법은 6개 업종을 각각 해설합니다. 해설은 접지 않고 표시하며 문단별 참고 자료와 페이지 내 바로가기를 제공합니다. 본문 글자 크기와 터치 영역은 유지하고 섹션·표의 여백을 줄였습니다.
- `/core` (또는 `/brand/core`): 이력과 대화에 근거한 작업 정체성 분석. 경력의 연속성, 판단 기준, 창작 지향, 기록의 의미, 다섯 가지 철학과 긴장을 정리하고 기록·해석·미검증을 구분합니다. 메인 및 Brand 메뉴에서 접근합니다.
- `/brand` (또는 `/brand/branding`): Branding의 목적별 5개 페이지 안내. 상단 Branding 메뉴는 hover·클릭·키보드로 열 수 있습니다.
- `/brand/web`: Web 제작·납품 가이드.
- `/brand/specs`: 인쇄·웹 규격표. px/cm/mm 환산, PPI 선택, 도련·재단·안전 영역 비교.
- `/brand/questionnaire`: 고객 사전설문·디스커버리 인터뷰·디자이너 요약·최종 점검.
- `/brand/design-brief`: 디자인 문제·목표·원칙·시각 방향·성공 기준 정리.
- `/brand/products`: 브랜딩·웹·통합 패키지·추가 상품을 분류 / 상품명 / 상품설명 / 가격 / 산출물 목록 / 제외 및 협의목록 / 비고의 7열 표로 비교하는 독립 상품 페이지. 산출물은 납품 항목·상세 구성·확장자/전달 형식으로 세분화하고, 상품 명시 형식과 제안·조건부 형식을 구분합니다. 기존 가격·범위를 재사용하며, 통합 패키지는 구성 상품의 상세 산출물을 함께 표시합니다. 표 내부 스크롤·고정 열 제목·분류 바로가기를 지원합니다.
- `/brand/deliverables`: 단계별 산출물 양식·확장자·전달 조건과 통합 런칭 추가 산출물.
- `/brand/guide`: 작업 단계·완료 체크, 납품 점검, 리뷰·중단 기준과 기존 작업 범위 메모.

Branding 하위 메뉴 순서는 사전설문 → Design Brief → 상품과 가격 → 산출물 목록 → 가이드와 인계입니다. 기존 설문·브리프 저장 키는 그대로 유지합니다. 이전 Branding 체크리스트·간단 브리프는 `/brand/guide`에서 이어 사용하며, 이전 `/brand#offers`, `/brand#delivery` 등 주요 앵커도 새 페이지로 연결됩니다. Web 작업 공간은 기존 구성을 유지합니다.

사전설문과 Design Brief는 각각 한 문서를 이 브라우저에 자동 저장하며, 전체 또는 부분별 Markdown 복사를 지원합니다. 서버 제출·공유 링크·자동 문서 간 답변 이전은 제공하지 않습니다. 다른 프로젝트를 시작하기 전 기존 내용을 복사해 보관하세요.

Brand에는 단계별 체크리스트, 납품 점검표, 브리프 작성·복사가 있습니다. Branding과 Web의 초안은 각각 브라우저 localStorage에 저장됩니다. 서버 저장·기기 간 동기화·다중 프로젝트 관리는 제공하지 않습니다. 중요한 자료는 브리프 복사로 별도 보관하세요.

정적 호스팅에서는 `/core`, `/brand/core`, `/dev`, `/brand`, `/brand/branding`, `/brand/web`, `/brand/specs`, `/brand/questionnaire`, `/brand/design-brief`, `/brand/products`, `/brand/deliverables`, `/brand/guide`의 직접 접근을 `/index.html`로 연결하는 SPA fallback 설정이 필요합니다. 실제 `/handbook/*.html`과 에셋 요청은 원래 파일을 제공해야 합니다. 로컬 Vite 개발·미리보기 서버는 이 경로들을 처리합니다.

재테크의 `/money` 및 `/money/*`에도 동일한 SPA fallback이 필요합니다. 자료 확인일은 2026-09-29이며 자동 갱신되지 않습니다. 제도 설명과 시행일을 구분하고 개인별 세금·대출·계좌 적용 여부는 최신 공식 안내에서 확인해야 합니다. 학습 예시는 실제 수익률이나 자산배분 추천이 아닙니다.

## Dev Handbook

역량 있는 풀스택·AI Native 개발자가 되기 위해 필요한 지식과 실무 판단 기준을 모은 핸드북입니다. CS 기본기, 컴퓨터 시스템, 언어·런타임, 측정·검증, 프론트엔드, 백엔드, 데이터베이스, 네트워크, DevOps, LLM, AX, 디자인, 실무 가이드를 하나의 학습 경로로 연결합니다.

## 목적

이 저장소는 단순 개념 요약이 아니라 실제 프로젝트에서 쓸 수 있는 판단 기준을 제공합니다.

- 기능을 화면, API 계약, 데이터 정합성, 배포, 운영 신호까지 연결합니다.
- 각 주제의 트레이드오프, 실패 모드, 검증 기준을 함께 다룹니다.
- 읽는 자료를 넘어서 캡스톤 과제와 실무 예시로 훈련할 수 있게 구성합니다.
- AI가 만든 산출물은 task spec, context package, eval, 보안 fixture, 비용·지연 trace, human approval, residual risk까지 증거로 검증합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 문서 생성

공식 원본 HTML은 `public/handbook/*.html`입니다. 앱에서 사용하는 모듈은 생성 스크립트로 동기화합니다.

```bash
npm run generate:handbook
```

이 명령은 `src/handbook/catalog.mjs`의 항목을 기준으로 `src/handbook/documents/*.ts`와 `src/handbook/documentLoaders.ts`를 다시 만듭니다.

## 검증

```bash
npm test
npm run build
```

테스트는 카탈로그, 정적 HTML, 생성 모듈, 목차와 본문 section 일치 여부, 제거된 도메인 문서 잔존 여부를 확인합니다.

## 문서 추가 규칙

1. `public/handbook/<name>.html`에 정적 문서를 추가합니다.
2. `src/handbook/catalog.mjs`에 id, label, kind, file을 등록합니다.
3. `src/handbook/practicalExamples.ts`에 해당 id의 실무 예시와 lens를 추가합니다.
4. `npm run generate:handbook`을 실행합니다.
5. `npm test`로 생성 모듈과 목차 일치를 확인합니다.

## 품질 기준

- 문서는 개념, 판단 기준, 실패 신호, 검증 증거를 함께 포함해야 합니다.
- 개발 핸드북은 CS 기본기, 시스템 자원, 언어 런타임, 측정·검증을 면접 암기가 아닌 실무 판단 근거로 연결해야 합니다.
- AI Native 문서는 task spec, context package, prompt/model/version, eval dataset, security fixture, cost/latency trace, verification report, residual risk를 완료 기준으로 포함해야 합니다.
- LLM/AX 실습 문서는 AI가 생성한 결과와 사람이 검증한 증거를 분리해 기록해야 합니다.
- 변동성이 큰 정보는 기준일과 출처를 명확히 남겨야 합니다.
- 목차의 모든 링크는 실제 `<section id="...">`와 1:1로 맞아야 합니다.
- 특정 도메인 산출물이 아니라 풀스택 개발자 성장에 직접 기여하는 내용만 catalog에 포함합니다.
