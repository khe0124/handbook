export type RoadmapNode = {
  id: string;
  title: string;
  why: string;
  artifacts: string[];
  failureSignals: string[];
  evidence: string[];
  links: string[];
};

export type RoadmapTrack = {
  title: string;
  intent: string;
  nodes: RoadmapNode[];
};

export type RoadmapProcessStep = {
  title: string;
  output: string;
  checks: string[];
  handoff: string;
};

type RoadmapPageProps = {
  serial: string;
  title: string;
  subtitle: string;
  meta: string;
  diagram: string;
  tracks: RoadmapTrack[];
  process: RoadmapProcessStep[];
  gates: Array<{ title: string; checks: string[] }>;
};

function RoadmapFlowList({ tracks }: { tracks: RoadmapTrack[] }) {
  return (
    <div className="roadmap-diagram-frame">
      <ol className="roadmap-mobile-flow" aria-label="로드맵 흐름">
        {tracks.map((track, index) => (
          <li key={track.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{track.title}</strong>
            <p>{track.intent}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RoadmapNodeTable({ nodes }: { nodes: RoadmapNode[] }) {
  return (
    <div className="roadmap-table-wrap">
      <table className="roadmap-node-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">주제</th>
            <th scope="col">왜 봐야 하나</th>
            <th scope="col">결과물·체크</th>
            <th scope="col">연결</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id}>
              <td className="roadmap-node-id">{node.id}</td>
              <td className="roadmap-node-topic">{node.title}</td>
              <td>{node.why}</td>
              <td className="roadmap-node-proof">
                <dl className="roadmap-node-evidence">
                  <div>
                    <dt>산출물</dt>
                    <dd>{node.artifacts.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt>주의</dt>
                    <dd>{node.failureSignals.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt>확인</dt>
                    <dd>{node.evidence.join(" · ")}</dd>
                  </div>
                </dl>
              </td>
              <td className="roadmap-node-links-cell">{node.links.join(" · ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoadmapProcessTable({ process }: { process: RoadmapProcessStep[] }) {
  return (
    <div className="roadmap-process-wrap">
      <table className="roadmap-process-table">
        <thead>
          <tr>
            <th scope="col">단계</th>
            <th scope="col">결과물</th>
            <th scope="col">검토 포인트</th>
            <th scope="col">다음 연결</th>
          </tr>
        </thead>
        <tbody>
          {process.map((step) => (
            <tr key={step.title}>
              <td className="roadmap-process-title">{step.title}</td>
              <td>{step.output}</td>
              <td>
                <ul className="roadmap-process-checks">
                  {step.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </td>
              <td>{step.handoff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RoadmapPage({ serial, title, subtitle, meta, diagram: _diagram, tracks, process, gates }: RoadmapPageProps) {
  const nodeCount = tracks.reduce((sum, track) => sum + track.nodes.length, 0);

  return (
    <article className="roadmap-page">
      <header className="hero">
        <div className="hero-serial">
          <span>{serial}</span>
          <span>FORMAT : REACT · RESPONSIVE FLOW</span>
          <span>{nodeCount} PROCESS NODES</span>
        </div>
        <h1>{title}</h1>
        <p className="hero-sub">{subtitle}</p>
        <div className="hero-meta">{meta}</div>
      </header>

      <section id="roadmap-overview">
        <div className="ch-head">
          <span className="ch-code">MAP</span>
          <h2>로드맵 읽는 법</h2>
        </div>
        <p className="lede">
          이 로드맵은 단순 키워드 목록이 아니라 실제 개발 흐름을 따라간다. 각 노드는 개념,
          결과물, 자주 터지는 문제, 확인 방법을 같이 묶었다. 먼저 큰 흐름을 보고, 지금 프로젝트나
          면접 준비에서 비어 있는 칸부터 채우면 된다.
        </p>
      </section>

      <section id="roadmap-diagram">
        <div className="ch-head">
          <span className="ch-code">FLOW</span>
          <h2>전체 흐름 다이어그램</h2>
        </div>
        <RoadmapFlowList tracks={tracks} />
      </section>

      <section id="roadmap-process">
        <div className="ch-head">
          <span className="ch-code">PROC</span>
          <h2>프로세스별 결과물</h2>
        </div>
        <p className="lede">
          위 흐름을 실행 단계로 풀면 각 단계가 무엇을 산출하고, 무엇을 검토하며, 다음 단계로 무엇을
          넘기는지로 나뉜다. 단계 이름을 아는 것보다 다음 단계가 이 결과물 없이는 시작될 수 없다는
          점이 중요하다.
        </p>
        <RoadmapProcessTable process={process} />
      </section>

      <section id="roadmap-sequence">
        <div className="ch-head">
          <span className="ch-code">TREE</span>
          <h2>학습 트랙</h2>
        </div>
        <div className="roadmap-track-grid">
          {tracks.map((track) => (
            <section className="roadmap-track" key={track.title}>
              <header>
                <h3>{track.title}</h3>
                <p>{track.intent}</p>
              </header>
              <RoadmapNodeTable nodes={track.nodes} />
            </section>
          ))}
        </div>
      </section>

      <section id="roadmap-gates">
        <div className="ch-head">
          <span className="ch-code">GATE</span>
          <h2>완료 기준</h2>
        </div>
        <div className="roadmap-gate-grid">
          {gates.map((gate) => (
            <section className="roadmap-gate" key={gate.title}>
              <h3>{gate.title}</h3>
              <ul>
                {gate.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
