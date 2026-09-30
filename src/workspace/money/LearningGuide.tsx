type Guide = { title: string; intro: string; columns: string[]; rows: string[][] };

export function LearningGuide({ guide, id = "money-guide-title" }: { guide: Guide; id?: string }) {
  return <section className="money-guide" aria-labelledby={id}>
    <h2 id={id}>{guide.title}</h2>
    <p>{guide.intro}</p>
    <p className="money-table-hint">표가 화면보다 넓으면 좌우로 스크롤하세요. 키보드는 표 영역에 초점을 두고 방향키를 사용할 수 있습니다.</p>
    <div className="money-table-scroll" role="region" aria-labelledby={id} tabIndex={0}>
      <table className="money-guide-table">
        <caption className="money-visually-hidden">{guide.title}</caption>
        <thead><tr>{guide.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{guide.rows.map(([label, ...cells]) => <tr key={label}>
          <th scope="row">{label}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <p className="money-muted">공식 자료의 정의를 참고해 구성한 학습용 관찰·해석 틀입니다. 실시간 시장 진단이나 검증된 매매 신호가 아닙니다.</p>
  </section>;
}
