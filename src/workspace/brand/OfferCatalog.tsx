import type { BrandArea } from "./content";
import { addOns, bundles, issueSource, offers, scopeWarnings } from "./offers.mjs";
import { launchDeliverables } from "./operations.mjs";
import { BrandTable } from "./BrandTable";

export function OfferCatalog({ area }: { area: BrandArea }) {
  return (
    <section id="offers" className="brand-reference" aria-labelledby="offers-title">
      <p className="workspace-eyebrow">OFFER DEFINITION</p>
      <h2 id="offers-title">상품과 가격</h2>
      <p>브랜드의 방향과 시각 체계를 정리하고, 고객이 이해하고 문의할 수 있는 웹사이트까지 만듭니다.</p>
      <p className="brand-muted">출처: <a href={issueSource.url} target="_blank" rel="noreferrer">{issueSource.label}</a> · 본문을 재분류한 내부 운영 기준입니다. Jira 변경 사항은 자동 동기화되지 않습니다.</p>
      <p className="brand-price-note">금액 단위: 만 원 · 부가세 별도 · 최종 범위는 견적에서 확정</p>
      <p>Starter / Core / Signature는 AI 사용 여부가 아니라 자료 준비도, 전략·의사결정 지원, 맞춤 제작 깊이, 콘텐츠 책임, 런칭 후 지원으로 구분합니다.</p>
      <div className="brand-table-scroll brand-offer-table" tabIndex={0} role="region" aria-label="상품별 가격과 작업 범위">
        <table>
          <caption className="brand-muted">상품별 포함·제외 산출물 목록 · 금액 단위: 만 원 / 부가세 별도 · 좁은 화면에서는 좌우로 스크롤</caption>
          <thead><tr><th scope="col">상품 / 가격</th><th scope="col">포함 산출물</th><th scope="col">제외·별도 협의 항목</th></tr></thead>
          <tbody>{offers[area].map((offer) => (
            <tr key={offer.name}>
              <th scope="row">
                {offer.name}<span className="brand-tier">{offer.tier}</span>
                <span className="brand-offer-price">{offer.price}만 원</span>
                <p className="brand-offer-fit">{offer.fit}</p>
                <div className="brand-offer-terms"><span>진행·지원 조건</span><ul>{offer.terms.map(term => <li key={term}>{term}</li>)}</ul></div>
              </th>
              <td className="brand-offer-included"><ul>{offer.scope.map(item => <li key={item}>{item}</li>)}</ul></td>
              <td className="brand-offer-excluded"><ul>{offer.exclude.map(item => <li key={item}>{item}</li>)}</ul></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <h3>추가 상품</h3>
      <BrandTable label={`${area === "branding" ? "브랜딩" : "웹"} 및 공통 추가 상품 · 만 원 / 부가세 별도`} headings={["항목", "가격", "기준 범위"]} rows={[...addOns[area], ...addOns.shared]} />
    </section>
  );
}

export function LaunchDeliveryList() {
  return <BrandTable label="통합 런칭 체크리스트 · 포함 범위 확인 후 적용" headings={["산출물", "확인 내용"]} rows={launchDeliverables} />;
}

export function LaunchPackages({ showDeliverables = true }: { showDeliverables?: boolean }) {
  return (
    <section id="launch-packages" className="brand-reference" aria-labelledby="launch-title">
      <p className="workspace-eyebrow">BRANDING + WEB</p><h2 id="launch-title">통합 런칭 패키지</h2>
      <BrandTable label="통합 상품 · 만 원 / 부가세 별도" headings={["상품", "단계 / 가격", "구성과 적용 조건"]} rows={bundles} />
      {showDeliverables ? <><h3>Brand Launch 추가 납품 기준</h3><LaunchDeliveryList /></> : <p><a href="/brand/deliverables#launch-deliverables" data-workspace-link>통합 런칭의 추가 산출물 확인</a></p>}
      <div className="brand-scope-warning" role="note">
        <h3>견적 전 확인 필요 · 원문 내 범위 차이</h3>
        <ul>{scopeWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
      </div>
    </section>
  );
}
