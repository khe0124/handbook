import { useState } from "react";
import { BrandFrame } from "./BrandFrame";
import { BrandTable } from "./BrandTable";
import { PrintAreas } from "./PrintAreas";
import { PPI_OPTIONS, productionTableRows, specGroups, specSources, specTableRows } from "./specs.mjs";

export function SizeReference() {
  const [ppi, setPpi] = useState(300);
  const [bleed, setBleed] = useState(3);
  const [safe, setSafe] = useState(3);
  return (
    <BrandFrame area="specs">
      <main id="brand-content" className="brand-main brand-specs">
        <section className="brand-intro" aria-labelledby="spec-title">
          <div><p className="workspace-eyebrow">PRODUCTION REFERENCE / PRINT & WEB</p><h1 id="spec-title" tabIndex={-1} data-route-heading>인쇄부터 화면까지,<br />크기의 기준을 한곳에.</h1><p>용지·홍보물·웹 화면·이미지·아이콘 규격을 px / cm / mm로 비교합니다. 표준 용지와 작업용 프리셋을 구분하고, 제작 조건에 맞게 확인하세요.</p></div>
          <div className="brand-start"><span>같은 px, 다른 기준.</span><p>인쇄는 실제 크기와 PPI가 기준이고, 웹 레이아웃은 CSS px가 기준입니다. 화면의 cm/mm 환산값은 실제 모니터에서 잰 크기가 아닙니다.</p><a href="#unit-guide">단위와 환산 기준 확인</a></div>
        </section>
        <div className="brand-editorial-layout">
          <aside className="brand-outline">
            <p className="workspace-eyebrow">SIZE INDEX</p>
            <nav aria-label="규격 목차">
              <a href="#unit-guide">단위·해상도 기준</a>
              {specGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
              <a href="#preflight">도련·재단·안전 영역</a>
            </nav>
            <p className="brand-muted">모든 치수는 가로 × 세로.<br />좁은 화면에서는 표를 좌우로 스크롤하세요.</p>
          </aside>
          <div className="brand-guide">
            <section id="unit-guide" className="brand-reference" aria-labelledby="unit-title">
              <p className="workspace-eyebrow">READ BEFORE EXPORT</p><h2 id="unit-title">단위와 해상도 기준</h2>
              <div className="brand-resolution-control">
                <label htmlFor="print-ppi">인쇄·이미지 환산 해상도 (PPI)</label>
                <select id="print-ppi" value={ppi} onChange={event => setPpi(Number(event.target.value))} aria-describedby="ppi-help">
                  {PPI_OPTIONS.map(value => <option key={value} value={value}>{value} PPI{value === 300 ? " · 기본값" : ""}</option>)}
                </select>
              </div>
              <div className="brand-margin-controls">
                <label htmlFor="global-bleed">도련 · 사방 각각
                  <select id="global-bleed" value={bleed} onChange={event => setBleed(Number(event.target.value))}>{[0,2,3,5].map(value => <option key={value} value={value}>{value} mm</option>)}</select>
                </label>
                <label htmlFor="global-safe">안전 여백 · 사방 각각
                  <select id="global-safe" value={safe} onChange={event => setSafe(Number(event.target.value))}>{[0,2,3,5,10].map(value => <option key={value} value={value}>{value} mm</option>)}</select>
                </label>
              </div>
              <p id="ppi-help" className="brand-muted">인쇄 표의 px와 이미지·아이콘 표의 cm/mm가 함께 바뀝니다. 웹 화면 표는 CSS 기준 96 px/in으로 고정됩니다. 변경은 이 페이지를 보는 동안만 유지됩니다.</p>
              <p className="brand-price-note" role="status">인쇄·이미지: {ppi} PPI · 도련 사방 {bleed} mm · 안전 여백 사방 {safe} mm · 웹 화면: CSS 96 px/in 고정</p>
              <p className="brand-muted">모든 인쇄 규격 행에 재단 후, 도련 포함, 안전 영역 크기를 동시에 표시합니다. 기본 사방 3 mm는 계산 예시이며 업체 지정값에 맞춰 변경하세요.</p>
              <BrandTable label="환산식과 단위 해석" headings={["구분", "기준"]} rows={[
                ["길이", "1 in = 25.4 mm = 2.54 cm · 1 cm = 10 mm"],
                ["인쇄 → 이미지", "px = mm ÷ 25.4 × PPI. 표는 가장 가까운 정수 px로 반올림합니다. 최저 해상도를 엄격히 맞출 때는 올림하여 제작하세요."],
                ["이미지 → 인쇄", "mm = px ÷ PPI × 25.4. 같은 이미지라도 인쇄 크기에 따라 유효 PPI가 달라집니다."],
                ["웹 레이아웃", "CSS 1 in = 96 px. cm/mm는 CSS 환산값이며 기기 픽셀 밀도·배율에 따라 실제 표시 크기는 다릅니다."],
                ["PPI / DPI", "PPI는 이미지의 인치당 픽셀 수, DPI는 출력 장치의 인치당 점 수입니다. 두 값을 동일한 사양으로 취급하지 않습니다."],
                ["벡터 / 2× 에셋", "벡터 도형·텍스트 자체에는 고정 픽셀 해상도가 없습니다. 600 × 400 CSS px 영역의 2× 이미지는 1,200 × 800 이미지 px입니다. 파일 PPI 값만 올려도 픽셀 수가 늘지는 않습니다."],
              ]} />
              <p className="brand-muted">300 PPI는 이 페이지의 초기 계산값이며 모든 출력물의 필수값은 아닙니다. 대형 출력은 관찰 거리와 장비에 맞춰 인쇄소와 합의하세요. cm/mm는 소수 둘째 자리까지 표시하며, 웹·이미지 표의 원본 px 값이 우선합니다.</p>
              <SourceLink source="css" />
            </section>
            {specGroups.map(group => (
              <section id={group.id} key={group.id} className={`brand-reference brand-size-table${group.kind === "print" ? " brand-production-table" : ""}`} aria-labelledby={`${group.id}-title`}>
                <p className="workspace-eyebrow">{group.kind === "print" ? "PRINT / MM → PX" : group.kind === "css" ? "WEB / CSS PX" : "ASSET / IMAGE PX"}</p>
                <h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.description}</p>
                {group.kind === "print" ?
                  <BrandTable label={`${group.title} · 가로 × 세로 · ${ppi} PPI · 도련 사방 ${bleed} mm / 안전 여백 사방 ${safe} mm`} headings={["규격 / 용도", "재단 후", `도련 포함 (+${bleed} mm씩)`, `안전 영역 (−${safe} mm씩)`, "제작 메모"]} rows={productionTableRows(group,ppi,bleed,safe)} /> :
                  <BrandTable label={`${group.title} · 가로 × 세로 · ${group.kind === "css" ? "CSS 96 px/in 환산 · 실제 화면 크기 아님" : `${ppi} PPI 인쇄 크기 환산`}`} headings={["규격 / 용도", group.kind === "css" ? "CSS px" : "px (원본)", group.kind === "css" ? "cm (CSS 환산)" : "cm", group.kind === "css" ? "mm (CSS 환산)" : "mm", "제작 메모"]} rows={specTableRows(group, ppi)} />}
                {group.source ? <SourceLink source={group.source} /> : <p className="brand-muted">작업용 예시 · 플랫폼 또는 인쇄업체의 필수 규격을 대신하지 않습니다.</p>}
              </section>
            ))}
            <section id="preflight" className="brand-reference" aria-labelledby="preflight-title">
              <p className="workspace-eyebrow">EXPORT CHECK</p><h2 id="preflight-title">도련·재단·안전 영역</h2>
              <PrintAreas ppi={ppi} bleed={bleed} safe={safe} />
              <BrandTable label="납품 전 확인할 조건" headings={["항목", "확인 내용"]} rows={[
                ["인쇄 파일", ".pdf 중심으로 인쇄소가 요구하는 PDF/X·색상 프로파일·도련·재단 표시를 확인. .ai 등 편집 원본은 계약 범위대로 제공."],
                ["색상·이미지", "CMYK 변환·별색·ICC 프로파일은 출력 조건에 맞춰 합의. 이미지를 배치한 최종 크기에서 유효 PPI와 글자 가독성을 점검."],
                ["접지·후가공", "접지 패널 폭, 책등, 칼선, 타공, 미싱, 배너 삽입부는 mm 수치만으로 확정하지 말고 제작사 전개도 사용."],
                ["웹 파일", "사진은 .webp / .avif / .jpg, 투명 이미지 .png / .webp, 벡터 .svg 등을 용도에 맞게 선택. 지원 환경·용량·대체 텍스트·크롭을 검수."],
                ["웹 화면", "프레임 치수를 고정 페이지 크기로 구현하지 않기. 중간 폭·브라우저 확대·긴 콘텐츠·회전 화면에서도 확인."],
              ]} />
              <SourceLink source="bleed" />
              <p className="brand-muted">자료 확인: 2026-09-29. 공통 용지와 실무 프리셋을 모은 참고표이며 모든 특수 인쇄 상품·기기·플랫폼 규격을 포괄하지 않습니다.</p>
            </section>
          </div>
        </div>
      </main>
    </BrandFrame>
  );
}

function SourceLink({ source }: { source: keyof typeof specSources }) {
  return <p className="brand-muted">기준 자료: <a href={specSources[source].url} target="_blank" rel="noreferrer">{specSources[source].label}</a></p>;
}
