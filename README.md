# Dev Handbook

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
