import { BrandFrame } from "../BrandFrame";
import { CommercialGuide } from "../OperationsGuide";
import { issueSource, scopeWarnings } from "../offers.mjs";
import { productGroups, productHeadings } from "./catalog.mjs";
import { ProductDeliverables } from "./ProductDeliverables";
import "./products.css";

function ProductList({ items }: { items: string[] }) {
  return <ul>{items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>;
}

export function ProductsPage() {
  return <BrandFrame area="products">
    <main id="brand-content" className="brand-main products-page">
      <header className="products-header">
        <p className="workspace-eyebrow">PRODUCTS / PRICING / SCOPE</p>
        <h1 tabIndex={-1} data-route-heading>상품과 가격</h1>
        <p>브랜딩부터 웹, 통합 패키지와 추가 작업까지. 상품 설명·가격·산출물·제외 범위를 같은 기준으로 비교합니다.</p>
        <p className="brand-muted">부가세 별도 · 최종 범위는 견적에서 확정 · 인쇄·촬영·유료 폰트/이미지·호스팅 등 외부 비용 별도</p>
      </header>
      <nav className="products-index" aria-label="상품 분류 바로가기">
        {productGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.title} <span>{group.rows.length}</span></a>)}
        <a href="#commercial">견적·거래 기준</a>
      </nav>
      <section id="offers" aria-label="전체 상품 비교">
        <p id="products-scroll-help" className="brand-muted">총 {productGroups.reduce((count, group) => count + group.rows.length, 0)}개 상품 · 표 안에서 위아래로 스크롤하며 비교하세요. 좁은 화면에서는 좌우 스크롤 또는 표에 초점을 둔 후 ← → 키로 이동할 수 있습니다.</p>
        <p className="products-format-note">산출물은 <strong>납품 항목 → 상세 구성 → 형식·확장자</strong> 순서입니다. ‘상품 명시’는 기존에 정해진 형식, ‘형식 제안’은 견적에서 확정할 구성안입니다. Figma·Notion·운영 URL은 파일 확장자가 아닌 전달 방식이며, ‘또는 / 택1’은 모든 형식의 동시 제공을 뜻하지 않습니다. 여러 시트는 한 문서에 통합할 수 있고, 이를 추가 산출물 수량으로 계산하지 않습니다.</p>
        <div className="brand-table-scroll products-table" tabIndex={0} role="region" aria-label="상품별 가격과 산출물 비교표" aria-describedby="products-scroll-help" onKeyDown={event => {
          if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
          event.preventDefault();
          event.currentTarget.scrollBy({ left: event.key === "ArrowRight" ? 160 : -160, behavior: "instant" });
        }}>
          <table>
            <caption>상품 전체 목록 · 모든 가격은 만 원 기준 / 부가세 별도</caption>
            <colgroup>{productHeadings.map((heading, index) => <col key={heading} className={`products-col-${index}`} />)}</colgroup>
            <thead><tr>{productHeadings.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
            {productGroups.map(group => <tbody key={group.id}>
              {group.rows.map((product, index) => <tr key={product.id} id={index === 0 ? group.id : product.id}>
                <td>{product.category}</td>
                <th scope="row">{product.name}</th>
                <td>{product.description}</td>
                <td className="products-price">{product.price}</td>
                <td className="products-included"><ProductDeliverables groups={product.deliveryGroups} /></td>
                <td><ProductList items={product.exclude} /></td>
                <td className="products-notes"><ProductList items={product.notes} /></td>
              </tr>)}
            </tbody>)}
          </table>
        </div>
      </section>
      <div className="products-followup brand-guide">
        <section className="brand-reference" aria-labelledby="products-confirm-title">
          <h2 id="products-confirm-title">견적 전 확인할 범위</h2>
          <ul>{scopeWarnings.map(warning => <li key={warning}>{warning}</li>)}</ul>
          <p className="brand-muted">출처: <a href={issueSource.url} target="_blank" rel="noreferrer">{issueSource.label}</a> · 기존 상품 정의를 재분류한 내부 운영 기준이며 자동 동기화되지 않습니다. 추가 상품의 미명시 조건은 제공 약속이 아닌 협의 항목입니다.</p>
          <p className="brand-resource-links"><a href="/brand/deliverables" data-workspace-link>산출물 양식·파일 확장자</a><a href="/brand/guide" data-workspace-link>제작 가이드와 인계</a></p>
        </section>
        <CommercialGuide />
      </div>
    </main>
  </BrandFrame>;
}
