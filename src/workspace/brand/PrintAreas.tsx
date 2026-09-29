import { useState } from "react";
import { BrandTable } from "./BrandTable";
import { printAreas, specGroups, specTableRows } from "./specs.mjs";

const printGroups = specGroups.filter(group => group.kind === "print");
const printItems = printGroups.flatMap(group => group.items.map(item => ({...item, key:`${group.id}:${item.name}`})));

export function PrintAreas({ ppi, bleed, safe }: { ppi: number; bleed: number; safe: number }) {
  const [itemKey, setItemKey] = useState("paper-a:A4");
  const item = printItems.find(item => item.key === itemKey)!;
  return (
    <div>
      <p>위 표의 각 행에 재단·도련·안전 영역의 계산 크기가 표시되어 있습니다. 여기서는 선택한 규격의 계산 원리를 확인할 수 있습니다. <a href="#unit-guide">공통 여백·PPI 변경</a></p>
      <div className="brand-print-controls">
        <label htmlFor="print-product">계산할 규격
          <select id="print-product" value={itemKey} onChange={event => setItemKey(event.target.value)}>
            {printGroups.map(group => <optgroup label={group.title} key={group.id}>{group.items.map(item => <option key={item.name} value={`${group.id}:${item.name}`}>{item.name} ({item.width} × {item.height} mm)</option>)}</optgroup>)}
          </select>
        </label>
      </div>
      <p className="brand-muted" role="status">{item.name} · 재단 {item.width} × {item.height} mm · 사방 도련 {bleed} mm / 안전 여백 {safe} mm · {ppi} PPI</p>
      <div className="brand-size-table"><BrandTable label={`${item.name} 제작 영역 비교 · 가로 × 세로 · ${ppi} PPI`} headings={["영역", "px", "cm", "mm", "계산 기준"]} rows={specTableRows({kind:"print",items:printAreas(item,bleed,safe)},ppi)} /></div>
      <p className="brand-muted">도련 포함 크기 = 재단 크기 + 도련 × 2. 안전 영역 = 재단 크기 − 안전 여백 × 2. 재단 오차는 도련과 다른 개념이므로 업체 허용치를 별도 확인하세요.</p>
      <h3>접지물·출판물은 추가 확인</h3>
      <ul>
        <li>접지물의 도련은 보통 펼침 외곽 기준으로 지정합니다. 접지선마다 도련을 더하지 말고 안쪽 패널 폭·접지 오차를 전개도에서 확인하세요.</li>
        <li>책자 내지는 낱장/펼침 납품 방식, 안쪽 도련, 제본 여백(거터), 페이지 수와 면배치를 인쇄소와 합의하세요. 위 안전 영역은 사방 동일 여백의 단순 계산입니다.</li>
        <li>일반 무선제본 표지 전개 예시: 폭 = 뒤표지 폭 + 책등 + 앞표지 폭, 높이 = 책 높이. 사방 도련은 이 전개 크기에 더합니다. 날개·양장·접착부는 별도 도면이 필요합니다.</li>
        <li>A5 표지에서 책등을 10 mm로 가정하면 재단 전개는 306 × 210 mm, 사방 3 mm 도련 포함은 312 × 216 mm입니다. 책등 10 mm는 계산 예시이며 실제 제작값이 아닙니다.</li>
      </ul>
    </div>
  );
}
