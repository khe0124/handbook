import { extraRates } from "./offers.mjs";
import { killCriteria, offerReview, policies, reviewCadence } from "./operations.mjs";
import { BrandTable } from "./BrandTable";

export function CommercialGuide() {
  return (
    <section id="commercial" className="brand-reference" aria-labelledby="commercial-title">
      <p className="workspace-eyebrow">SCOPE & ESTIMATE</p><h2 id="commercial-title">견적·수정·거래 기준</h2>
      <p>가격에는 문제 정의, 방향 설정, 디자인 판단, 제작·구현, 수정·검수, 납품·인계와 일정·호환성·배포·범위 관리의 책임이 포함됩니다.</p>
      <BrandTable label="추가 요청 단가 · 만 원 / 부가세 별도" headings={["요청", "가격", "적용 기준"]} rows={extraRates} />
      <BrandTable label="공통 운영 정책 · 고객과 최종 합의할 기준" headings={["항목", "정책"]} rows={policies} />
      <h3>내부 견적 검산</h3>
      <p className="brand-estimate">(상담 + 제작 + 수정 + QA + 인계 예상 시간) × 시간당 5만 원 × 1.2 + 별도 비용</p>
      <p>시간당 5만 원은 초기 내부 기준입니다. 계산값이 상품가보다 높으면 범위를 줄이거나 재견적합니다. 첫 3건은 실제 시간·계약 전환·범위 밖 요청을 기록해 가격을 조정합니다.</p>
      <p className="brand-muted">예: 80시간이면 외부 비용 전 480만 원으로 Core 웹 400만 원을 넘습니다. 원문의 ‘80시간 이상은 Core 밖’이라는 판단과 함께, 계산값 자체도 확인하세요.</p>
    </section>
  );
}

export function ReviewGuide() {
  return (
    <section id="review" className="brand-reference" aria-labelledby="review-title">
      <p className="workspace-eyebrow">REVIEW & KILL SYSTEM</p><h2 id="review-title">리뷰와 중단 기준</h2>
      <p>진행 중인 일을 주기적으로 정리하고, 가치가 낮거나 끝나지 않는 프로젝트를 중단할 수 있는 운영 리듬을 만듭니다.</p>
      <BrandTable label="운영 리듬과 남길 결정" headings={["주기", "검토 항목", "결정 / 기록"]} rows={reviewCadence} />
      <h3>상품 리뷰 · 8가지 질문</h3>
      <ol className="brand-review-questions">{offerReview.map((question) => <li key={question}>{question}</li>)}</ol>
      <BrandTable label="상품의 중단·수정 신호" headings={["신호", "다음 조치"]} rows={killCriteria} />
      <p className="brand-muted">선행 항목: P0-E01-S03 Definition of Done. 아래 작업 단계의 완료 기준을 확인한 뒤, 단순 작업량이 아닌 납품·공개 결과와 축적된 자산으로 리뷰하세요. ‘장기 무산출’의 기간은 원문에 없으므로 프로젝트 착수 시 합의합니다.</p>
    </section>
  );
}
