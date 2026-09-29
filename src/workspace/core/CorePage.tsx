import type { ReactNode } from "react";
import { BrandFrame } from "../brand/BrandFrame";
import { careerEvidence, conversationEvidence, coreSections, coreSources, identityDraft, identityLayers, philosophy, tensions, validationQuestions } from "./content.mjs";
import "./core.css";

function CoreSection({ index, children }: { index: number; children: ReactNode }) {
  const [id, title] = coreSections[index];
  return <section id={id} className="brand-reference core-section" aria-labelledby={`${id}-title`}>
    <div className="brand-stage-title"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`${id}-title`}>{title}</h2></div>
    {children}
  </section>;
}

function CoreTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return <div className="brand-table-scroll core-table" role="region" aria-label={caption} tabIndex={0} onKeyDown={event => {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    event.currentTarget.scrollBy({ left: event.key === "ArrowRight" ? 96 : -96, behavior: "instant" });
  }}>
    <table><caption>{caption} · 좁은 화면에서는 좌우로 이동</caption><thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>{rows.map(([label, ...cells]) => <tr key={label}><th scope="row">{label}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function SourceLink({ source }: { source: keyof typeof coreSources }) {
  return <a href={coreSources[source].href}>{coreSources[source].title}</a>;
}

export function CorePage() {
  return <BrandFrame area="core">
    <main id="brand-content" className="brand-main core-page">
      <header className="brand-intro">
        <div><p className="workspace-eyebrow">IDENTITY / EVIDENCE / PHILOSOPHY</p><h1 tabIndex={-1} data-route-heading>Core</h1><p className="core-lead">복잡함을 다뤄온 제작자.<br />이제, 나의 판단이 드러나는 작업으로.</p></div>
        <div className="brand-start"><span>지금 붙잡을 질문</span><p>나는 디자이너인가, 개발자인가보다 — 이미 쌓아온 구현 능력을 통해 어떤 판단과 미감을 가진 제작자로 드러나고 싶은가?</p><a href="#core-philosophy">다섯 가지 작업 철학 읽기</a></div>
      </header>
      <p className="core-reading-note"><strong>읽는 기준</strong> ‘기록’은 대화와 공개 자료에서 확인한 내용, ‘해석’은 그 연결에 대한 가설, ‘미검증’은 실제 작업과 피드백이 필요한 부분입니다. 성격 진단이나 확정된 직업 정체성이 아닙니다.</p>
      <div className="brand-editorial-layout">
        <aside className="brand-outline"><p className="workspace-eyebrow">CORE INDEX</p><nav aria-label="Core 목차">{coreSections.map(([id, title], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{title}</a>)}</nav></aside>
        <div className="brand-guide">
          <CoreSection index={0}>
            <p>핵심은 ‘디자인도 개발도 하고 싶다’는 기술의 조합만이 아니다. 복잡한 것을 이해 가능한 구조로 만들고 작동하게 해온 경험 위에, 자신의 미감과 판단이 선명하게 드러나는 결과물을 만들고 싶다는 바람이 있다.</p>
            <p className="core-evidence-label">정체성 문장 · 대화 기반 초안</p>
            <blockquote className="core-statement">{identityDraft}</blockquote>
            <p><strong>현재의 해석:</strong> ‘일을 잘 수행하는 사람’에서 ‘무엇을 어떻게 만들지에 대한 자기 기준을 가진 제작자’로 표현의 범위를 넓히려는 시점으로 읽힌다. 이전 경험을 버리고 다른 사람이 되는 전환이라기보다, 이미 해온 일에 고유한 시각적 판단을 더하려는 방향이다.</p>
            <p className="core-note">브랜딩과 웹은 이 방향을 시험할 수 있는 작업 형식이다. 하지만 특정 상품이나 직무가 정체성 전체를 대신하지는 않는다.</p>
          </CoreSection>
          <CoreSection index={1}>
            <p>이력의 중심을 단순한 직무 전환이 아니라 다루는 범위의 확장으로 읽는다. 아래 ‘기록’은 공개 이력의 자기서술이며, 프로젝트 성과를 독립적으로 감사한 결과는 아니다.</p>
            <ol className="core-evidence-list">{careerEvidence.map((item, index) => <li key={item.title}>
              <h3><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</h3>
              <dl><div><dt>기록</dt><dd>{item.record} <SourceLink source={item.source} /></dd></div><div><dt>해석</dt><dd>{item.reading}</dd></div></dl>
            </li>)}</ol>
            <p className="core-note">형태 → 사용 흐름 → 작동 구조 → 완성과 인계. 개발 경력은 디자인을 위해 지워야 하는 우회로가 아니라, 결과물의 작동 방식까지 판단할 수 있게 된 기반이다.</p>
            <p className="brand-muted">이 연결은 현재의 해석이며, 당시 직무를 바꾼 실제 동기를 단정하지 않는다. 스마트시티 협업 프로젝트와 별도의 서울형 탄소시장 프로젝트의 역할·책임 범위도 합쳐 말하지 않는다.</p>
          </CoreSection>
          <CoreSection index={2}>
            <p>좋아한다고 말한 스타일보다, 실제 결과물에서 반복해서 고치도록 요청한 내용이 작업 기준을 더 구체적으로 보여준다.</p>
            <CoreTable caption="대화의 요청과 그로부터 읽은 기준" columns={["관찰 · 실제 요청 요약", "해석 · 중요하게 보는 것", "작업에서의 의미"]} rows={conversationEvidence} />
            <p className="core-statement">사용자가 다시 해석하거나 계산하거나 찾아다녀야 할 일을, 만드는 사람이 먼저 해결한다.</p>
            <p>이 맥락에서 명료함은 단순히 화면을 비우는 미니멀리즘이 아니다. 정보가 충분하면서 관계가 보이고, 중요한 조건을 바로 판단할 수 있게 만드는 태도에 가깝다.</p>
            <p className="brand-muted">화이트·쿨그레이를 요청한 사실만으로 전체 미감을 ‘미니멀리즘’으로 정의하지 않는다. 작업용 도구에서의 선호와 창작물에서 추구하는 표현은 다를 수 있다.</p>
          </CoreSection>
          <CoreSection index={3}>
            <p><strong>관찰:</strong> 높은 디자인 퀄리티의 작업을 만들고 싶고, 동시에 개발도 놓치고 싶지 않다고 말했다.</p>
            <h3>문제 해결에 더해, 결과물에 나의 판단이 보이길 원한다</h3>
            <p>‘문제를 잘 해결했다’는 유능함에 대한 평가다. ‘이 작업은 좋고, 이 사람의 판단이 보인다’는 결과물의 고유성에 대한 평가다. 현재의 바람은 전자를 버리는 것보다 후자를 더하는 방향으로 해석할 수 있다.</p>
            <p>접근성·성능·반응형 같은 필수 품질만으로 이 욕구가 모두 충족되지는 않는다. 체크리스트를 통과하는 것에 더해 글자·이미지·구성·움직임에서 선택한 이유와 고유한 표현이 드러나는 작업을 원할 수 있다.</p>
            <h3>개발은 경력을 지키는 수단만이 아닐 수 있다</h3>
            <p>직접 생각을 시험하고, 결과를 바꾸고, 끝까지 완성할 수 있는 능력이라는 의미도 있다. 디자인은 무엇을 어떤 경험으로 만들지 판단하는 일, 개발은 그 판단을 실제 조건에서 구현·검증하는 일이며, 둘을 연결하는 것은 결과물에 대한 책임이다.</p>
            <p className="brand-muted">미검증: 구현의 즐거움·기술적 깊이·주도권·경력의 연속성 중 무엇이 개발을 유지하려는 가장 큰 이유인지는 아직 구분하지 않았다.</p>
            <h3 id="core-references">레퍼런스는 출발점이지 정체성의 대체물이 아니다</h3>
            <p>5dok · 가가린스튜디오 · ANZI · 워크스는 대화에서 언급한 퀄리티의 출발점이다. 이들의 이름만으로 내가 원하는 표현을 정의하지 않고, 실제 작품에서 무엇이 좋은지 분리해 읽는다.</p>
          </CoreSection>
          <CoreSection index={4}>
            <p><strong>기록:</strong> OOLD Works는 고장 난 노트북에서 학부 작업을 꺼내, 영원히 사라지기 전에 보존하려고 만든 아카이브로 소개되어 있다. <SourceLink source="archive" /></p>
            <p><strong>해석:</strong> 핸드북 재분류와 강점의 자산화 요청까지 함께 보면, 만든 것과 배운 것이 흩어져 사라지지 않게 연결해두려는 태도가 읽힌다. 이것을 생산성과 재사용만으로 설명하면 일부를 놓친다.</p>
            <dl className="core-record-meanings"><div><dt>다음 작업을 위한 축적</dt><dd>판단 기준, 실패, 방법을 다시 사용할 수 있도록 남긴다.</dd></div><div><dt>과거와 지금을 잇는 보존</dt><dd>어디에서 출발했고 무엇에 관심을 가져왔는지, 작업자로서의 궤적을 남긴다.</dd></div></dl>
            <p className="core-note">모든 기록을 상품·콘텐츠·재사용 자산으로 만들어야 하는 것은 아니다. 어떤 작업은 지금의 내가 어디에서 왔는지 보여주는 것만으로 의미가 있다.</p>
          </CoreSection>
          <CoreSection index={5}>
            <p>정체성이 없어서 혼란스러운 것이라기보다, 현재의 역량과 창작 지향, 일을 제공하는 방식이 한 질문 안에 섞여 있을 가능성이 있다. 서로 관련되지만 같은 층위는 아니다.</p>
            <CoreTable caption="섞지 않고 구분할 세 가지 층위" columns={["층위", "답해야 할 질문", "현재 확인하거나 탐색할 내용"]} rows={identityLayers} />
            <p>프론트엔드는 검증해 보여줄 경험이 많은 전문 영역이지 만들 수 있는 것의 최종 경계가 아니다. 브랜딩 프리랜싱은 일을 제공하는 방식이지 정체성 전체가 아니다. 아트 디렉션은 원하는 역할이 될 수 있지만, 직함을 붙이는 것과 그 판단을 결과로 보여주는 일은 구분한다.</p>
            <p className="brand-muted">좋은 것을 알아보는 기준 ≠ 직접 만드는 숙련도 ≠ 외부에서 확인된 평가. 대화의 판단 기준과 구현 이력만으로 시각 디자인 수준을 단정하지 않는다.</p>
          </CoreSection>
          <CoreSection index={6}>
            <p>다음은 반복된 선택에서 도출한 작업 철학의 초안이다. 이미 완성해 선언한 신념으로 고정하지 않고, 실제 선택과 충돌할 때 다시 검토한다.</p>
            <ol className="core-philosophy-list">{philosophy.map((item, index) => <li key={item.title}>
              <h3><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</h3><p>{item.meaning}</p>
              <p className="brand-muted"><strong>근거와 해석</strong> {item.basis}</p><p className="core-principle-question"><strong>판단 질문</strong> {item.question}</p>
            </li>)}</ol>
          </CoreSection>
          <CoreSection index={7}>
            <p>강점이 과해질 때 생길 수 있는 긴장이다. 현재 드러난 결함이나 성격으로 단정하지 않고, 선택할 때 확인할 위험으로 둔다.</p>
            <CoreTable caption="강점의 이면과 조정 기준" columns={["함께 지킬 두 가치", "가능한 위험", "조정할 기준"]} rows={tensions} />
            <p className="core-note">문서화 요청이 많았다는 사실만으로 실행을 회피한다고 판단할 수는 없다. 내 기준을 가지고 결과를 책임지는 것과 모든 역할을 혼자 수행하는 것도 다르다.</p>
          </CoreSection>
          <CoreSection index={8}>
            <p id="core-practice">다음 단계는 새 직함이나 고정된 학습 비율을 정하는 일이 아니다. 이 해석이 실제 작업 경험과 맞는지 확인하고, 틀린 부분을 고치는 일이다.</p>
            <dl className="core-validation-list">{validationQuestions.map(item => <div key={item.question}><dt>{item.question}</dt><dd>{item.method}</dd></div>)}</dl>
            <h3 id="core-project">첫 검증은 기존 작업 하나에서</h3>
            <p>공개 가능한 작업 하나를 골라 ‘해결한 복잡함 / 내가 선택한 표현 / 실제 작동 / 아직 아쉬운 점’을 한 장으로 정리한다. 그중 한 부분을 수정하고 피드백을 받는다. 표현을 시험할 여지가 없다면 같은 질문을 다루는 작은 개인 실험으로 분리한다.</p>
            <p className="core-statement">직함보다 먼저, 내가 무엇을 지키며 만드는 사람인지 결과와 선택의 이유로 드러낸다.</p>
            <p className="core-resource-links"><a href="/brand/questionnaire" data-workspace-link>대상을 이해하는 사전설문</a><a href="/brand/design-brief" data-workspace-link>판단을 정리하는 Design Brief</a><a href="/brand/specs" data-workspace-link>실제 제작 규격</a><a href="/dev" data-workspace-link>구현을 위한 Dev Handbook</a></p>
            <div className="core-source-note"><h3>분석의 근거와 한계</h3><p>대화의 직접 요청과 공개 자기서술을 우선했다. 기존 핸드북은 대화에서 정리한 문서이므로, 그 안의 AI 해석을 독립된 사실 증거로 다시 사용하지 않는다. 공개 자료는 2026년 9월 29일 확인한 내용이며 자동 갱신되지 않는다.</p><p><SourceLink source="profile" /> · <SourceLink source="resume" /> · <SourceLink source="archive" /></p></div>
          </CoreSection>
        </div>
      </div>
    </main>
  </BrandFrame>;
}
