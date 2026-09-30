import { moneyTracks } from "./curriculum.mjs";
import { moneyCategories, moneyHref } from "./navigation.mjs";

export function LearningTracks() {
  return <section className="money-tracks" aria-labelledby="money-tracks-title">
    <h2 id="money-tracks-title">이루고 싶은 세 가지, 여기서부터</h2>
    <p>파일 입력 없이 모든 학습 내용을 읽을 수 있습니다. 순서대로 읽고 각 페이지의 실습 양식을 작성하면, 내 판단에 사용할 문서가 남습니다.</p>
    <ol className="money-track-list">{moneyTracks.map((track, index) => <li key={track.id}>
      <div><span className="money-number">0{index + 1}</span><h3>{track.title}</h3><p>{track.description}</p><p className="money-track-output">완료 결과 · {track.output}</p></div>
      <nav aria-label={`${track.title} 학습 순서`}><ol>{track.lessons.map(([categoryId, lessonId]) => {
        const title = moneyCategories.find(category => category.id === categoryId)?.lessons.find(([id]) => id === lessonId)?.[1];
        return <li key={`${categoryId}/${lessonId}`}><a href={moneyHref(categoryId, lessonId)} data-workspace-link>{title}</a></li>;
      })}</ol></nav>
    </li>)}</ol>
    <p className="money-muted">처음이라면 <a href="/money/stocks/basics" data-workspace-link>주식·기업가치</a>와 <a href="/money/stocks/portfolio" data-workspace-link>자산배분 기초</a>를 함께 읽으세요. <a href="/money/strategy/plan" data-workspace-link>개인 자산 기록</a>은 학습한 내용을 내 상황에 적용할 때 참고합니다.</p>
  </section>;
}
