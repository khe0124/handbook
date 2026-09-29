export function BrandTable({ label, headings, rows }: { label: string; headings: string[]; rows: readonly (readonly string[])[] }) {
  return (
    <div className="brand-table-scroll" tabIndex={0} role="region" aria-label={label}>
      <table>
        <caption className="brand-muted">{label}</caption>
        <thead><tr>{headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{rows.map(([name, ...cells]) => <tr key={name}><th scope="row">{name}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
