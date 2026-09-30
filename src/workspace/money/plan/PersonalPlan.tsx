import { useState } from "react";
import { MAX_PLAN_BYTES, parsePlan, PLAN_STORAGE_KEY } from "./model.mjs";
import { PersonalSnapshot } from "./PersonalSnapshot";
import { RetirementPlan } from "./RetirementPlan";
import { PlanPrinciples } from "./PlanPrinciples";
import type { Plan } from "./types";
import "./plan.css";

const chapters = [
  ["profile", "01. 목표와 생활 조건"], ["assets", "02. 자산 구성"], ["holdings", "03. 보유 자산"],
  ["retirement", "04. 은퇴 목표"], ["scenarios", "05. 적립 시나리오"], ["pension", "06. 연금 공백"],
  ["principles", "07. 투자 원칙"], ["routine", "08. 점검 루틴"], ["next", "09. 다음 할 일"],
];

function readSavedPlan(): { plan: Plan | null; message: string; error: boolean } {
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    return { plan: raw ? parsePlan(raw) : null, message: raw ? "이 브라우저에 저장한 계획을 불러왔습니다." : "저장된 개인 계획이 없습니다. 로컬 계획 파일을 불러오세요.", error: false };
  } catch {
    return { plan: null, message: "저장된 계획을 읽을 수 없습니다. 기존 저장값은 변경하지 않았습니다. 백업 파일을 불러오거나 브라우저 저장 권한을 확인해 주세요.", error: true };
  }
}

export function PersonalPlan() {
  const [state, setState] = useState(readSavedPlan);
  const [pending, setPending] = useState<Plan | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { plan } = state;

  function save(next: Plan) {
    setPending(null);
    setConfirmDelete(false);
    try {
      window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(next));
      setState({ plan: next, message: "계획을 불러와 이 브라우저에 저장했습니다. 서버로 전송하지 않았습니다.", error: false });
    } catch {
      setState({ plan: next, message: "파일은 열었지만 브라우저에 저장하지 못했습니다. 이 화면에서만 볼 수 있으므로 원본 파일을 보관하고 저장 권한을 확인해 주세요.", error: true });
    }
    requestAnimationFrame(() => document.getElementById("plan-profile")?.focus({ preventScroll: true }));
  }

  async function importFile(file?: File) {
    if (!file) return;
    try {
      if (file.size > MAX_PLAN_BYTES) throw new Error("64KB 이하의 계획 파일을 선택해 주세요.");
      const next = parsePlan(await file.text());
      if (plan) setPending(next);
      else save(next);
    } catch (error) {
      setState(current => ({ ...current, message: error instanceof Error ? error.message : "파일을 읽을 수 없습니다.", error: true }));
    }
  }

  function download() {
    if (!plan) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `money-plan-${plan.asOf}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function remove() {
    try {
      window.localStorage.removeItem(PLAN_STORAGE_KEY);
      setState({ plan: null, message: "이 브라우저의 개인 계획만 삭제했습니다. 원본·백업 파일로 다시 불러올 수 있습니다.", error: false });
      setConfirmDelete(false);
      setPending(null);
      requestAnimationFrame(() => document.getElementById("plan-file")?.focus({ preventScroll: true }));
    } catch {
      setState(current => ({ ...current, message: "계획을 삭제하지 못했습니다. 브라우저 저장 권한을 확인해 주세요.", error: true }));
    }
  }

  return <>
    <header className="money-intro">
      <p className="workspace-eyebrow"><a href="/money" data-workspace-link>재테크</a> / 자산관리 전략 / PERSONAL PLAN</p>
      <h1 tabIndex={-1} data-route-heading>나의 자산관리 계획</h1>
      <p>안정적인 노후를 기반으로, 좋은 기업은 길게 보유하고 시장 변화에는 원칙 있게 대응합니다. 확인된 사실·계산용 가정·아직 모르는 정보를 구분합니다.</p>
    </header>
    <details className="money-plan-storage" open={plan ? undefined : true}>
      <summary><h2>개인 기록 · 이 브라우저에만 저장</h2><span>파일 관리 {plan ? `· 기준 ${plan.asOf}` : "· 계획 불러오기"}</span></summary>
      <p>실제 금액·생년월일·종목은 공개 코드에 포함하지 않습니다. JSON 계획 파일을 직접 불러오면 이 사이트 주소의 브라우저 저장소에 저장됩니다. 다른 기기·브라우저·사이트 주소에는 자동 동기화되지 않습니다.</p>
      <p className="money-muted">암호화된 금고나 로그인 보호가 아닙니다. 같은 브라우저를 사용하는 사람과 같은 사이트의 스크립트가 접근할 수 있으므로 공용 기기에서는 사용하지 마세요. 브라우저 데이터 삭제 시 기록이 사라집니다. 백업 파일에도 민감한 정보가 포함됩니다.</p>
      <div className="money-plan-controls">
        <label htmlFor="plan-file">계획 파일 불러오기 (JSON · 64KB 이하)<input id="plan-file" type="file" accept=".json,.local,application/json" onChange={event => { void importFile(event.currentTarget.files?.[0]); event.currentTarget.value = ""; }} /></label>
        {plan && <><button type="button" onClick={download}>계획 파일 백업</button><button type="button" onClick={() => setConfirmDelete(true)}>이 브라우저의 기록 삭제</button></>}
      </div>
      <p role={state.error ? "alert" : "status"}>{state.message}</p>
      {pending && <div className="money-plan-confirm" role="group" aria-label="계획 교체 확인"><p>현재 계획을 새 파일로 교체할까요? 필요한 경우 먼저 현재 계획을 백업하세요.</p><button type="button" onClick={() => save(pending)}>이 계획으로 교체</button><button type="button" onClick={() => setPending(null)}>교체 취소</button></div>}
      {confirmDelete && <div className="money-plan-confirm" role="group" aria-label="기록 삭제 확인"><p>이 브라우저의 개인 계획을 삭제할까요? 백업 파일이 있어야 복원할 수 있습니다.</p><button type="button" onClick={remove}>기록 삭제 확인</button><button type="button" onClick={() => setConfirmDelete(false)}>삭제 취소</button></div>}
    </details>
    {state.error && plan && <p className="money-plan-note" role="alert">{state.message}</p>}
    <div className="money-reading-layout">
      <aside className="money-outline"><p>계획 목차</p><nav aria-label="개인 자산관리 계획 목차">{chapters.filter((_, index) => plan || index >= 6).map(([id, title]) => <a key={id} href={`#plan-${id}`}>{title}</a>)}</nav><a href="/money" data-workspace-link>전체 학습 목차</a></aside>
      <article className="money-article" aria-label="개인 자산관리 계획">
        {plan ? <><PersonalSnapshot plan={plan} /><RetirementPlan plan={plan} /></> : <section><h2>자산 현황은 파일을 불러온 뒤 표시됩니다</h2><p>개인 정보가 없는 상태에서는 투자 원칙과 점검 루틴만 보입니다. 준비된 로컬 계획 파일을 불러오면 자산 비중·종목·코인 수량·은퇴 시나리오가 이곳에 추가됩니다. 개인 기록은 사이트의 다른 방문자에게 전달되지 않습니다.</p></section>}
        <PlanPrinciples />
      </article>
    </div>
  </>;
}
