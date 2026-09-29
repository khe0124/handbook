import { createRoot, type Root } from "react-dom/client";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChecklistCard, type ChecklistItem } from "./ChecklistCard";
import { HANDBOOK_DOCUMENT_LOADERS } from "./documentLoaders";
import { InlineCodeCopyButton } from "./InlineCodeCopyButton";
import { HomeStrategy } from "./HomeStrategy";
import { getPersonalNotes } from "./personalNotes.mjs";
import { PRACTICAL_EXAMPLES, getPracticalExampleLens } from "./practicalExamples";
import { SerialCardCopyButton } from "./SerialCardCopyButton";
import type { HandbookDocumentContent } from "./types";
import "./handbook.css";

type HandbookItem = {
  id: string;
  label: string;
  kind: string;
  pageType?: string;
};

type HandbookPageProps = {
  item: HandbookItem;
  onReady?: (itemId: string) => void;
  onSelectHandbook?: (itemId: string, sectionId?: string) => void;
};

const homeProfileRows = [
  {
    category: "강점",
    point: "복잡한 도메인을 사용 가능한 제품 흐름으로 번역한다",
    detail:
      "LCA/LCCI, 탄소 크레딧·VCM, STO, Web3, IoT처럼 개념과 규칙이 복잡한 영역을 화면·상태 전이·입력·검증·리포트 흐름으로 바꿔왔다. 단순히 화면을 그리는 것이 아니라 사용자가 업무를 끝낼 수 있는 구조로 재구성하는 능력이다.",
    evidence: "LCA 플로우, VCM Registry, D-MRV 계산 엔진, 대규모 입력 UI",
  },
  {
    category: "강점",
    point: "프론트엔드 중심에서 제품 전주기를 책임질 수 있다",
    detail:
      "기획·설계·디자인·FE·BE·인프라·배포·납품 문서까지 연결하고, 실제 운영과 인수인계가 가능한 형태로 마무리한다. 특정 레이어만 잘하는 구현자보다 시스템 전체의 완료 조건을 볼 수 있다.",
    evidence: "약 11주 VCM 프로젝트 전 단계 진행, EC2/RDS/nginx/systemd, 납품 문서",
  },
  {
    category: "강점",
    point: "계약과 경계를 세워 변경을 통제한다",
    detail:
      "OpenAPI 계약, 타입 생성, zod 스키마, feature 모듈, 헥사고날 레이어링처럼 경계를 코드에 남긴다. API drift나 도메인 규칙 변경을 사람의 기억이 아니라 타입·구조·검증으로 드러내는 방식이다.",
    evidence: "OpenAPI 3.1, openapi-typescript/fetch, feature architecture, hexagonal backend",
  },
  {
    category: "강점",
    point: "품질을 기능 완료 이후까지 밀어붙인다",
    detail:
      "테스트, MSW, 스키마 검증, 브라우저 QA, 보안, KWCAG 접근성, 롤백, 운영 문서까지 품질 범위를 넓게 본다. 결함을 숨기기보다 추적 가능한 산출물로 남겨 재현과 인계를 가능하게 한다.",
    evidence: "Vitest/MSW, 결정 로그 DEC-001~096, 보안·접근성 QA, 롤백 절차",
  },
  {
    category: "강점",
    point: "시각 감각과 시스템 구현을 함께 활용한다",
    detail:
      "UI/UX 디자이너 경력과 프론트엔드 경험이 결합되어 정보 구조, 상태, 입력 경험, 시각적 완성도를 한 흐름에서 판단한다. 보기 좋은 화면을 넘어 복잡한 정보를 이해시키는 화면을 만드는 쪽에 강점이 있다.",
    evidence: "공업디자인 전공, UI/UX 디자인 경력, 공통 UI·그리드·차트·Flow Editor 구축",
  },
  {
    category: "강점",
    point: "새 도구를 업무 시스템으로 흡수한다",
    detail:
      "Claude Code와 멀티 에이전트 워크플로우를 단순한 코드 생성이 아니라 역할 분리, 결정 로그, 검증, 문서화의 실행 체계로 사용한다. 도구를 도입하는 데서 멈추지 않고 재현 가능한 과정으로 만든다.",
    evidence: "11개 에이전트·6개 스킬, 결정 로그, AI 기반 전주기 오케스트레이션",
  },
  {
    category: "강점",
    point: "문제의 원인과 재발 방지까지 파고든다",
    detail:
      "무한 렌더링, 중복 요청, 저장 실패, 트리 동기화, 캐시 정책 이원화처럼 증상만 고치는 데서 멈추지 않고 구조적 원인과 운영 기준까지 정리한다. 반복 결함을 시스템 개선으로 바꾸는 성향이다.",
    evidence: "실서비스 운영 이슈 해결, 배포 산출물·서버 설정 단일 기준 정리",
  },
  {
    category: "강점",
    point: "학습 내용을 체계와 산출물로 정리한다",
    detail:
      "현재 대화에서도 원하는 화면의 범위를 빠르게 좁히고, 결과물을 표·메뉴·문서 구조로 명확히 만들도록 요청한다. 지식을 소비하는 데서 끝내지 않고 다시 사용할 수 있는 핸드북과 작업 기준으로 바꾸는 힘이 있다.",
    evidence: "Dev Handbook의 대규모 메뉴·문서 구조, 이번 홈 화면 요구사항",
  },
  {
    category: "단점/리스크",
    point: "관심 범위와 책임 범위가 쉽게 넓어진다",
    detail:
      "디자인, FE, BE, 인프라, AI, 커리어까지 연결할 수 있는 만큼 한 번에 닫으려는 범위가 커질 위험이 있다. 깊은 결과물 하나보다 여러 축의 완성도를 동시에 끌어올리려 하면 종료 시점이 늦어진다.",
    evidence: "다수 산업·레이어를 가로지른 경력, 폭넓은 핸드북 구성",
  },
  {
    category: "단점/리스크",
    point: "높은 완성도 기준이 공개와 출시를 늦출 수 있다",
    detail:
      "1px 수준의 시각 기준부터 계약·QA·문서·운영까지 직접 닫으려는 강점이 반대로 작동하면 ‘충분히 좋은 첫 공개’보다 완성도 보강을 선택하게 된다. 핵심 사용자 가치와 출시 차단 조건을 먼저 분리할 필요가 있다.",
    evidence: "디자인 감각과 품질·문서 범위를 함께 중시하는 경력 및 작업 방식",
  },
  {
    category: "단점/리스크",
    point: "문제를 구조화하는 시간이 실행보다 길어질 수 있다",
    detail:
      "복잡한 문제를 잘게 나누고 기준을 세우는 능력이 강하지만, 때로는 메뉴·문서·체크리스트를 더 정교하게 만드는 일이 실제 사용자 검증을 대체할 수 있다. 작은 수직 슬라이스를 먼저 배포해 구조화의 가치를 검증하는 편이 안전하다.",
    evidence: "문서·산출물·검증 기준을 세밀하게 설계하는 현재 작업 패턴",
  },
  {
    category: "단점/리스크",
    point: "혼자서 너무 많은 역할을 떠안을 가능성이 있다",
    detail:
      "전주기 역량이 있어 기획, 디자인, 개발, QA, DevOps, 문서까지 직접 메울 수 있다. 그러나 위임 가능한 일을 계속 직접 처리하면 병목이 되고, 본인의 판단이 필요한 고난도 영역에 쓸 시간이 줄어든다.",
    evidence: "기획부터 납품·인수인계까지 단독으로 연결한 프로젝트 경험",
  },
  {
    category: "단점/리스크",
    point: "넓은 스택과 도메인이 핵심 포지셔닝을 흐릴 수 있다",
    detail:
      "React부터 Spring, PostgreSQL, AWS, Web3, IoT, AI까지 폭이 넓다. 이는 실제 역량이지만 외부에서는 ‘무엇을 가장 잘하는 사람인가’가 즉시 보이지 않을 수 있으므로 대표 문제와 핵심 강점을 한 문장으로 반복해 고정해야 한다.",
    evidence: "다양한 기술·산업 도메인을 포함한 이력",
  },
  {
    category: "단점/리스크",
    point: "도구 오케스트레이션이 판단의 품질을 보장하지는 않는다",
    detail:
      "에이전트와 스킬을 역할별로 나누는 능력은 강력하지만, 역할과 산출물이 늘어날수록 조정 비용과 검토 비용도 커진다. 자동화된 결과를 신뢰하기 전에 최소 평가 세트, 실패 기준, 사람이 최종 승인할 경계를 더 선명하게 유지해야 한다.",
    evidence: "멀티 에이전트·스킬 기반 전주기 워크플로우",
  },
  {
    category: "단점/리스크",
    point: "복잡한 도메인에 익숙해질수록 초심자 관점이 약해질 수 있다",
    detail:
      "도메인 규칙과 시스템 구조를 빠르게 파악하는 만큼, 처음 접하는 사용자가 어디에서 막히는지보다 내부적으로 올바른 구조인지에 집중할 위험이 있다. 용어 테스트, 태스크 성공률, 실제 사용자 관찰을 설계에 포함해야 한다.",
    evidence: "LCA·탄소시장·거래·정산 등 전문 도메인 제품 경험",
  },
  {
    category: "단점/리스크",
    point: "성과를 증거로 바꾸는 데도 높은 기준을 적용할 수 있다",
    detail:
      "실제 성과와 해결한 문제는 많지만, 모든 기여를 수치·전후 비교·외부 결과로 정리하려 하면 기록 자체가 또 하나의 프로젝트가 된다. 대표 사례 2~3개만 증거 밀도를 높이고 나머지는 역할과 범위를 간결하게 정리하는 전략이 효율적이다.",
    evidence: "다수 프로젝트의 상세 기여와 산출물을 직접 보존하는 작업 방식",
  },
];

const homeProfileActions = [
  "대표 도메인 2~3개를 선정해 문제 정의 → 상태 모델 → 핵심 화면 → 운영 지표까지 이어지는 케이스 스터디 템플릿으로 고정한다. 도메인을 설명하는 다이어그램과 의사결정 로그를 함께 보관하면 복잡한 문제를 푸는 능력이 재사용 가능한 자산이 된다.",
  "전주기 프로젝트마다 본인의 판단이 들어간 산출물, 출시 전후 지표, 운영 인계 결과를 한 장의 delivery record로 남긴다. ‘끝까지 책임진다’를 역할명이 아니라 반복 가능한 납품 패키지로 증명한다.",
  "OpenAPI·schema·architecture decision을 프로젝트 시작 템플릿으로 만들고, 변경 전후 diff와 장애 사례를 축적한다. 계약 기반 개발의 원칙을 팀 표준과 공개 가능한 샘플 저장소로 확장한다.",
  "테스트·QA·보안·접근성·배포 검증을 release gate 체크리스트와 증거 링크로 묶는다. 결함을 줄였다는 주장보다 pass/fail 기준과 전후 결과를 가진 품질 패킷을 자산화한다.",
  "복잡한 업무를 쉽게 이해시키는 화면의 before/after, 정보 구조, 상태 설계 근거를 기록한다. 디자인과 구현을 함께 판단하는 강점을 ‘도메인 UX’라는 포지셔닝과 대표 포트폴리오로 선명하게 만든다.",
  "에이전트 역할, 입력 context, 승인 경계, 평가 fixture, 실패 로그를 표준 episode 포맷으로 저장한다. 특정 도구 사용기가 아니라 다른 프로젝트에도 이식할 수 있는 AI 작업 운영체계로 만든다.",
  "반복되는 장애 유형과 원인·탐지·수정·재발 방지를 incident pattern library로 축적한다. 문제를 해결하는 사람을 넘어 팀의 디버깅 속도를 높이는 운영 자산으로 전환한다.",
  "핸드북의 각 주제를 실제 프로젝트 산출물과 연결하고, 읽기 완료 대신 재사용 가능한 템플릿·체크리스트·예시를 완료 기준으로 둔다. 지식 정리 능력을 개인 생산성 시스템으로 계속 강화한다.",
  "분기마다 핵심 목표를 하나로 제한하고, 나머지는 주차별 백로그로 격리한다. 새 관심사는 즉시 착수하지 않고 보류 목록에 넣어 현재 결과물을 끝낸 뒤 재평가한다.",
  "작업 시작 전에 ‘출시 가능한 최소 범위’와 ‘이번 단계에서 하지 않을 것’을 함께 선언한다. 시각·문서·품질 보강은 출시 후 개선 슬롯으로 분리해 공개와 학습의 속도를 높인다.",
  "구조 설계 전에 가장 작은 사용자 흐름 하나를 실제 데이터로 끝까지 검증한다. 문서나 체크리스트를 늘리기 전에 사용자가 성공했는지 확인하는 1일 수직 슬라이스를 기본 단위로 둔다.",
  "본인만 할 수 있는 판단과 다른 사람이 수행할 수 있는 반복 작업을 분리해 위임한다. 역할별 완료 조건과 review checkpoint를 남겨 전주기 역량이 개인 병목으로 변하지 않게 한다.",
  "‘복잡한 도메인을 이해 가능한 제품으로 바꾸는 프론트엔드 중심 Product Builder’처럼 대표 문제와 강점을 한 문장으로 고정한다. 나머지 스택은 핵심 포지션을 증명하는 근거로 배치한다.",
  "에이전트 수를 늘리기 전에 평가 기준과 중단 조건을 먼저 정한다. 자동화 결과는 golden set, 보안 fixture, 비용·시간 trace, 사람의 최종 승인으로 검증해 오케스트레이션 비용을 통제한다.",
  "도메인 용어를 처음 보는 사용자 3~5명에게 태스크를 수행하게 하고, 막힌 지점과 이해한 단어를 기록한다. 내부적으로 올바른 설계인지와 외부 사용자가 실제로 이해하는지를 분리해 검증한다.",
  "모든 프로젝트를 같은 밀도로 기록하지 말고 대표 사례 2~3개만 수치·전후 비교·외부 결과까지 깊게 만든다. 나머지는 역할·범위·핵심 기여만 간결하게 정리해 증거 수집의 투자 대비 효과를 높인다.",
];

const homeProfilePairs = Array.from({ length: 8 }, (_, index) => ({
  index: index + 1,
  strength: { row: homeProfileRows[index], action: homeProfileActions[index] },
  risk: { row: homeProfileRows[index + 8], action: homeProfileActions[index + 8] },
}));

// 홈 화면은 메뉴 바로가기만 노출한다. 나머지 홈 콘텐츠는 소스에 남겨두고 렌더에서만 제외한다.
function extractHomeSections(mainHtml: string) {
  const sections = mainHtml.match(/<section\b[\s\S]*?<\/section>/g) ?? [];
  const shortcut = sections.find((section) => section.includes("shortcut-grid")) ?? "";
  return shortcut;
}

function removeGlossaryTermSubtext(html: string) {
  return html.replace(/(<div class="g-term">\s*<b>[\s\S]*?<\/b>)\s*<span>[\s\S]*?<\/span>(\s*<\/div>)/g, "$1$2");
}

function getPlainText(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function shouldAttachInlineCodeCopy(itemId: string, code: HTMLElement) {
  const text = code.textContent?.trim() ?? "";

  return (
    itemId === "practice-cheat-sheets" &&
    text.length > 0 &&
    text.length <= 90 &&
    !code.closest("pre") &&
    !code.closest(".serial-card") &&
    !code.closest(".snippet-card") &&
    !code.nextElementSibling?.classList.contains("inline-code-copy-mount")
  );
}

function getSerialCardText(card: HTMLElement) {
  return card.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
}

function attachSnippetCopyButton(card: HTMLElement, roots: Root[], mounts: HTMLElement[]) {
  const mount = window.document.createElement("div");
  mount.className = "snippet-card-copy-mount";
  card.append(mount);

  const root = createRoot(mount);
  root.render(<SerialCardCopyButton card={card} />);

  roots.push(root);
  mounts.push(mount);
}

function getDifficultyLabel(difficulty: string) {
  const labels: Record<string, string> = {
    intro: "입문",
    practice: "실습",
    independent: "독립 수행",
    lead: "리드",
  };

  return labels[difficulty] ?? difficulty;
}

function shouldUpgradeChecklistCard(card: HTMLElement) {
  const label = card.querySelector<HTMLElement>(".sc-label")?.textContent?.trim() ?? "";

  return label.includes("CHECKLIST") && getChecklistItems(card).length > 0;
}

function getChecklistItems(card: HTMLElement): ChecklistItem[] {
  const label = card.querySelector<HTMLElement>(".sc-label");
  const lines: string[] = [];
  let currentLine = "";
  let foundLabel = false;

  const walk = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentLine += node.textContent ?? "";
      return;
    }

    if (!(node instanceof HTMLElement)) return;
    if (node.classList.contains("serial-card-copy-mount")) return;
    if (node.classList.contains("serial-card-checklist-mount")) return;

    if (node.tagName === "BR") {
      lines.push(currentLine);
      currentLine = "";
      return;
    }

    node.childNodes.forEach(walk);
  };

  card.childNodes.forEach((node) => {
    if (node === label) {
      foundLabel = true;
      return;
    }

    if (!foundLabel) return;
    walk(node);
  });

  if (currentLine.trim()) lines.push(currentLine);

  return lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("□"))
    .map((text, index) => ({
      id: `${index}:${text}`,
      text,
    }));
}

export function HandbookPage({ item, onReady, onSelectHandbook }: HandbookPageProps) {
  const [document, setDocument] = useState<HandbookDocumentContent | null>(null);
  const [loadedItemId, setLoadedItemId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const practicalExample = PRACTICAL_EXAMPLES[item.id];
  const practicalLens = getPracticalExampleLens(item.id);
  const personalNotes = useMemo(() => getPersonalNotes(item.id), [item.id]);
  const isHome = item.id === "home";
  const contentHtml = useMemo(() => (document ? removeGlossaryTermSubtext(document.mainHtml) : ""), [document]);
  const homeShortcutHtml = useMemo(() => (isHome ? extractHomeSections(contentHtml) : ""), [isHome, contentHtml]);
  const ReactPage = document?.ReactPage;

  useEffect(() => {
    let cancelled = false;
    const loader = HANDBOOK_DOCUMENT_LOADERS[item.id];

    setDocument(null);
    setFailed(false);
    setIsTocOpen(false);

    if (!loader) {
      setFailed(true);
      return;
    }

    loader()
      .then((module) => {
        if (!cancelled) {
          setDocument(module.default);
          setLoadedItemId(item.id);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [item.id]);

  useEffect(() => {
    const main = mainRef.current;

    if (!document || !main) return;

    const roots: Root[] = [];
    const mounts: HTMLElement[] = [];
    const restoredCards: Array<{ card: HTMLElement; html: string }> = [];

    main.querySelectorAll<HTMLElement>("pre.snippet-card").forEach((card) => {
      attachSnippetCopyButton(card, roots, mounts);
    });

    main.querySelectorAll<HTMLTableElement>("table:not(.home-strategy-table)").forEach((table) => {
      const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>("tr:first-child th")).map((header) =>
        getPlainText(header),
      );

      if (!headers.length) return;

      table.classList.add("mobile-card-table");
      table.querySelectorAll<HTMLTableRowElement>("tr").forEach((row, rowIndex) => {
        if (rowIndex === 0) return;

        row.querySelectorAll<HTMLTableCellElement>("td").forEach((cell, cellIndex) => {
          const header = headers[cellIndex];
          if (header) cell.dataset.label = header;
        });
      });
    });

    main.querySelectorAll<HTMLElement>(".serial-card").forEach((card) => {
      if (shouldUpgradeChecklistCard(card)) {
        const html = card.innerHTML;
        const labelText = card.querySelector<HTMLElement>(".sc-label")?.textContent?.trim() ?? "CHECKLIST";
        const items = getChecklistItems(card);
        const label = window.document.createElement("span");
        const mount = window.document.createElement("div");

        label.className = "sc-label";
        label.textContent = labelText;
        mount.className = "serial-card-checklist-mount";
        card.dataset.copyText = getSerialCardText(card);
        card.replaceChildren(label, mount);

        const root = createRoot(mount);
        root.render(<ChecklistCard itemId={item.id} label={labelText} items={items} />);

        roots.push(root);
        mounts.push(mount);
        restoredCards.push({ card, html });
      }

      const mount = window.document.createElement("div");
      mount.className = "snippet-card-copy-mount serial-card-copy-mount";
      card.append(mount);

      const root = createRoot(mount);
      root.render(<SerialCardCopyButton card={card} />);

      roots.push(root);
      mounts.push(mount);
    });

    main.querySelectorAll<HTMLElement>(".serial-card, pre.snippet-card").forEach((card) => {
      if ((card.textContent?.trim().length ?? 0) < 360) return;
      if (card.querySelector(".learning-card-collapse-toggle")) return;

      const toggle = window.document.createElement("button");
      toggle.type = "button";
      toggle.className = "learning-card-collapse-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "펼치기";
      card.classList.add("learning-collapsible-card", "is-collapsed");
      card.append(toggle);
      mounts.push(toggle);

      toggle.addEventListener("click", () => {
        const isCollapsed = card.classList.toggle("is-collapsed");
        toggle.setAttribute("aria-expanded", String(!isCollapsed));
        toggle.textContent = isCollapsed ? "펼치기" : "접기";
      });
    });

    main.querySelectorAll<HTMLElement>("code").forEach((code) => {
      if (!shouldAttachInlineCodeCopy(item.id, code)) return;

      const mount = window.document.createElement("span");
      mount.className = "inline-code-copy-mount";
      code.after(mount);

      const root = createRoot(mount);
      root.render(<InlineCodeCopyButton code={code} />);

      roots.push(root);
      mounts.push(mount);
    });

    return () => {
      roots.forEach((root) => root.unmount());
      mounts.forEach((mount) => mount.remove());
      restoredCards.forEach(({ card, html }) => {
        card.innerHTML = html;
        delete card.dataset.copyText;
      });
    };
  }, [document, item.id]);

  useEffect(() => {
    // 문서 전환 직후 이전 문서가 남아 있는 커밋에서 조기 호출되면
    // 앵커 이동 대상이 아직 DOM에 없다. 로드가 현재 항목과 일치할 때만 알린다.
    if (!document || loadedItemId !== item.id) return;

    onReady?.(item.id);
  }, [document, item.id, loadedItemId, onReady]);

  useEffect(() => {
    const main = mainRef.current;

    if (!document || !main || !onSelectHandbook) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[data-handbook-id]");
      const itemId = link?.dataset.handbookId;

      if (!itemId || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      onSelectHandbook(itemId, link?.dataset.handbookSection);
    };

    main.addEventListener("click", handleClick);

    return () => {
      main.removeEventListener("click", handleClick);
    };
  }, [document, onSelectHandbook]);

  useEffect(() => {
    if (!isTocOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTocOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTocOpen]);

  if (failed) {
    return (
      <div className="handbook-empty" role="status">
        선택한 문서를 찾을 수 없습니다.
      </div>
    );
  }

  if (!document) {
    return (
      <div className="handbook-empty" role="status" aria-busy="true">
        문서를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className={`handbook-shell${isHome ? " is-home" : ""}`}>
      {!isHome ? (
        <>
      <button
        type="button"
        className="handbook-mobile-toc-toggle"
        onClick={() => setIsTocOpen((isOpen) => !isOpen)}
        aria-expanded={isTocOpen}
        aria-controls="handbook-document-toc"
        aria-label={isTocOpen ? "목차 닫기" : "목차 열기"}
        title={isTocOpen ? "목차 닫기" : "목차 열기"}
      >
        {isTocOpen ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
        <span>목차</span>
      </button>
      {isTocOpen ? (
        <button
          type="button"
          className="handbook-toc-backdrop"
          onClick={() => setIsTocOpen(false)}
          aria-label="목차 닫기"
        />
      ) : null}
      <nav
        id="handbook-document-toc"
        className={`handbook-toc${isTocOpen ? " is-open" : ""}`}
        aria-label={`${item.label} 목차`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setIsTocOpen(false);
        }}
        dangerouslySetInnerHTML={{ __html: document.navHtml }}
      />
        </>
      ) : null}
      <main
        ref={mainRef}
        className="handbook-main"
      >
        {isHome ? <HomeStrategy /> : null}
        {isHome ? (
          <section className="home-profile" aria-labelledby="home-profile-title">
            <div className="ch-head">
              <span className="ch-code">PROFILE</span>
              <h2 id="home-profile-title">강점과 단점</h2>
            </div>
            <p className="lede">
              지금까지의 대화에서 드러난 작업 방식과 공개 이력서를 바탕으로 정리한 개인 프로필입니다. 강점은 반복해서 활용할 자산으로, 단점은 실행 환경과 우선순위로 관리할 리스크로 읽습니다.
            </p>
            <table className="home-profile-table">
              <caption className="sr-only">강점과 단점 상세 비교</caption>
              <thead>
                <tr>
                  <th scope="col">강점</th>
                  <th scope="col">단점 / 리스크</th>
                </tr>
              </thead>
              <tbody>
                {homeProfilePairs.map(({ index, strength, risk }) => (
                  <tr key={index}>
                    {[strength, risk].map(({ row, action }) => (
                      <td key={row.point}>
                        <div className="home-profile-table-meta">#{String(index).padStart(2, "0")}</div>
                        <h3>{row.point}</h3>
                        <p className="home-profile-evidence">
                          <strong>근거</strong>
                          {row.evidence}
                        </p>
                        <p className="home-profile-detail">{row.detail}</p>
                        <p className="home-profile-action">
                          <strong>{row.category.startsWith("강점") ? "강화·자산화" : "개선법"}</strong>
                          {action}
                        </p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}
        {ReactPage ? <ReactPage /> : null}
        {ReactPage ? null : (
          <div
            dangerouslySetInnerHTML={{
              __html: isHome ? homeShortcutHtml : contentHtml,
            }}
          />
        )}
        {!isHome && personalNotes.length ? (
          <section className="personal-notes" aria-labelledby="personal-notes-title">
            <div className="ch-head">
              <span className="ch-code">MY CASE</span>
              <h2 id="personal-notes-title">내 사례</h2>
            </div>
            <div className="personal-note-list">
              {personalNotes.map((note) => (
                <article key={note.id} className="personal-note">
                  <div className="personal-note-meta">
                    <span>{note.date}</span>
                    {note.sectionId ? <a href={`#${note.sectionId}`}>관련 섹션</a> : null}
                  </div>
                  <h3>{note.situation}</h3>
                  <dl>
                    <dt>판단</dt>
                    <dd>{note.judgment}</dd>
                    <dt>결과</dt>
                    <dd>{note.result}</dd>
                    {note.interviewLine ? (
                      <>
                        <dt>면접 답변</dt>
                        <dd>{note.interviewLine}</dd>
                      </>
                    ) : null}
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        {!isHome && practicalExample ? (
          <section className="handbook-practical-example" aria-labelledby="practical-example-title">
            <div className="ch-head">
              <span className="ch-code">PRACTICE</span>
              <h2 id="practical-example-title">실무 예시</h2>
            </div>
            <p className="lede">{practicalExample.scenario}</p>
            <div className="practical-example-grid">
              <div className="practical-example-block" aria-labelledby="practical-constraints-title">
                <h3 id="practical-constraints-title">현장 조건</h3>
                <ul>
                  {practicalLens.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-actions-title">
                <h3 id="practical-actions-title">실행 절차</h3>
                <ol>
                  {practicalExample.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ol>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-artifacts-title">
                <h3 id="practical-artifacts-title">검증 증거</h3>
                <ul>
                  {practicalLens.artifacts.map((artifact) => (
                    <li key={artifact}>{artifact}</li>
                  ))}
                </ul>
              </div>
              <div className="practical-example-block" aria-labelledby="practical-failure-title">
                <h3 id="practical-failure-title">실패 신호</h3>
                <ul>
                  {practicalLens.failureSignals.map((failureSignal) => (
                    <li key={failureSignal}>{failureSignal}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="callout">
              <span className="co-label">완료 기준</span>
              <p>{practicalExample.outcome}</p>
            </div>
            {practicalExample.difficulty ||
            practicalExample.estimatedTime ||
            practicalExample.prerequisites?.length ||
            practicalExample.dataset ||
            practicalExample.failureFixtures?.length ||
            practicalExample.artifactsToSubmit?.length ||
            practicalExample.passCriteria?.length ||
            practicalExample.rubric?.length ? (
              <div className="practical-example-training" aria-labelledby="practical-training-title">
                <h3 id="practical-training-title">훈련 기준</h3>
                <div className="practical-example-grid">
                  {practicalExample.difficulty || practicalExample.estimatedTime || practicalExample.dataset ? (
                    <div className="practical-example-block">
                      <h3>실습 범위</h3>
                      <ul>
                        {practicalExample.difficulty ? <li>난이도: {getDifficultyLabel(practicalExample.difficulty)}</li> : null}
                        {practicalExample.estimatedTime ? <li>예상 시간: {practicalExample.estimatedTime}</li> : null}
                        {practicalExample.dataset ? <li>데이터셋: {practicalExample.dataset}</li> : null}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.prerequisites?.length ? (
                    <div className="practical-example-block">
                      <h3>선행 조건</h3>
                      <ul>
                        {practicalExample.prerequisites.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.failureFixtures?.length ? (
                    <div className="practical-example-block">
                      <h3>실패 Fixture</h3>
                      <ul>
                        {practicalExample.failureFixtures.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.artifactsToSubmit?.length ? (
                    <div className="practical-example-block">
                      <h3>제출 산출물</h3>
                      <ul>
                        {practicalExample.artifactsToSubmit.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.passCriteria?.length ? (
                    <div className="practical-example-block">
                      <h3>통과 기준</h3>
                      <ul>
                        {practicalExample.passCriteria.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {practicalExample.rubric?.length ? (
                    <div className="practical-example-block">
                      <h3>리뷰 루브릭</h3>
                      <ul>
                        {practicalExample.rubric.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="practical-example-review">
              <span className="co-label">리뷰 질문</span>
              <ul>
                {practicalLens.reviewQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
