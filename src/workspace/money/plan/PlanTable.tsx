import type { ReactNode } from "react";

export function PlanTable({ title, columns, rows }: { title: string; columns: string[]; rows: ReactNode[][] }) {
  return <div className="money-table-scroll" role="region" aria-label={title} tabIndex={0}>
    <table className="money-guide-table money-plan-table">
      <caption>{title} · 좁은 화면에서는 표를 좌우로 스크롤하세요.</caption>
      <thead><tr>{columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, col) => col === 0 ? <th scope="row" key={col}>{cell}</th> : <td key={col}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
