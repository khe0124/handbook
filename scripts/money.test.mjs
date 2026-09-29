import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getMoneyLessonGroups, moneyCategories, moneyHref, moneyLessonCount, resolveMoneyPage } from "../src/workspace/money/navigation.mjs";
import { moneyLessons, foundation } from "../src/workspace/money/content.mjs";
import { moneySources, reviewedAt } from "../src/workspace/money/sources.mjs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";
import { macroExplanations } from "../src/workspace/money/lessons/macro-explanations.mjs";

const read = path => readFileSync(new URL(`../src/workspace/${path}`, import.meta.url), "utf8");

test("Money has six requested categories and 27 distinct refresh-safe lessons", () => {
  assert.deepEqual(moneyCategories.map(item => item.title), ["ISA/연금저축", "절세", "거시경제 상식", "암호화폐", "부동산", "주식"]);
  const paths = [];
  for (const category of moneyCategories) {
    assert.equal(category.lessons.length, category.id === "macro" ? 12 : 3);
    for (const [id, title] of category.lessons) {
      const path = moneyHref(category.id, id);
      paths.push(path);
      for (const suffix of ["", "/"]) {
        assert.equal(resolveWorkspace(path + suffix), "money");
        assert.equal(resolveMoneyPage(path + suffix).lesson[1], title);
      }
    }
  }
  assert.equal(new Set(paths).size, 27);
  assert.equal(moneyLessonCount, paths.length);
  assert.deepEqual(resolveMoneyPage("/money/"), { category: null, lesson: null });
  for (const path of ["/money/accounts", "/money/unknown/isa", "/money/accounts/unknown", "/money/accounts/isa/extra", "/moneys"]) {
    assert.equal(resolveMoneyPage(path), null);
    assert.equal(resolveWorkspace(path), "not-found");
  }
});

test("learning groups partition every category once, in page order", () => {
  for (const category of moneyCategories) {
    const groups = getMoneyLessonGroups(category);
    assert.deepEqual(groups.flatMap(group => group.lessons), category.lessons);
    if (category.groups) {
      assert.deepEqual(category.groups.flatMap(group => group.ids), category.lessons.map(([id]) => id));
      assert.ok(groups.every(group => group.title && group.lessons.length > 0));
    }
  }
  assert.equal(getMoneyLessonGroups(moneyCategories.find(category => category.id === "macro")).length, 5);
});

test("nine macro practice pages include complete comparison tables and qualified scenarios", () => {
  const lessons = moneyLessons.macro.slice(3);
  assert.deepEqual(lessons.map(lesson => lesson.id), ["observation", "indicators", "regimes", "credit", "scenarios", "cyclical", "supply-cycle", "sectors", "routine"]);
  for (const lesson of lessons) {
    const guide = lesson.guide;
    assert.ok(guide.title && guide.intro.length > 30, lesson.id);
    assert.ok(guide.columns.length >= 3 && guide.rows.length >= 4, lesson.id);
    assert.equal(new Set(guide.rows.map(row => row[0])).size, guide.rows.length);
    for (const row of guide.rows) {
      assert.equal(row.length, guide.columns.length, lesson.id);
      assert.ok(row.every(cell => typeof cell === "string" && cell.length > 0));
    }
  }
  const scenarios = lessons.find(lesson => lesson.id === "scenarios");
  assert.match(scenarios.guide.intro, /실제 현재 시장 진단이나 검증된 예측 모델이 아니/);
  assert.deepEqual(scenarios.guide.rows.map(row => row[0]), ["기본 · 완만한 안정", "상방 · 수요 회복", "하방 · 재차 악화", "보류 · 증거 혼재"]);
  assert.ok(scenarios.guide.rows.every(row => row[3].length > 20));
  assert.match(lessons.find(lesson => lesson.id === "cyclical").example, /고정비.*80% 감소.*PER.*20배/);
  assert.match(lessons.find(lesson => lesson.id === "supply-cycle").example, /1.20에서 1.375/);
  assert.match(lessons.find(lesson => lesson.id === "routine").guide.intro, /저장하지 않습니다/);
});

test("macro guides have accessible tables and shared grouped navigation", () => {
  const guide = read("money/LearningGuide.tsx");
  for (const token of ['role="region"', 'aria-labelledby="money-guide-title"', "tabIndex={0}", "<caption", 'scope="col"', 'scope="row"']) assert.ok(guide.includes(token), token);
  const page = read("money/MoneyWorkspace.tsx");
  assert.ok(page.includes("{moneyLessonCount}"));
  assert.ok(page.includes("<LearningGuide guide={lesson.guide}"));
  for (const file of ["money/MoneyNavigation.tsx", "money/MoneyWorkspace.tsx"]) assert.ok(read(file).includes("getMoneyLessonGroups(category)"));
  assert.match(read("money/money.css"), /\.money-table-scroll[^}]+overflow-x: auto/);
  assert.match(read("money/money.css"), /\.money-outline[^}]+max-height:[^}]+overflow-y: auto/);
});

test("every lesson has substantive concepts, an example, risks, checks and valid sources", () => {
  for (const category of moneyCategories) {
    const lessons = moneyLessons[category.id];
    assert.deepEqual(lessons.map(item => [item.id, item.title]), category.lessons);
    for (const lesson of lessons) {
      assert.ok(lesson.summary.length > 30);
      assert.ok(lesson.concepts.length >= 4);
      assert.equal(new Set(lesson.concepts.map(([term]) => term)).size, lesson.concepts.length);
      for (const [term, definition] of lesson.concepts) assert.ok(term && definition.length > 25);
      assert.ok(lesson.example.length > 60 && lesson.pitfall.length > 40);
      assert.equal(lesson.checks.length, 3);
      assert.ok(lesson.sources.length > 0);
      for (const key of lesson.sources) assert.ok(moneySources[key], key);
    }
  }
  assert.equal(foundation.length, 4);
  assert.match(reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
  for (const source of Object.values(moneySources)) {
    assert.equal(new URL(source.url).protocol, "https:");
    assert.ok(source.title && source.note);
  }
});

test("all twelve macro lessons have specific expanded explanations and complete source coverage", () => {
  assert.deepEqual(Object.keys(macroExplanations).sort(), moneyLessons.macro.map(lesson => lesson.id).sort());
  const allIds = [];
  const allParagraphs = [];
  for (const lesson of moneyLessons.macro) {
    assert.ok(lesson.explanations.length >= 3, lesson.id);
    for (const section of lesson.explanations) {
      assert.match(section.id, /^[a-z][a-z-]+$/);
      allIds.push(`explain-${lesson.id}-${section.id}`);
      assert.ok(section.title.length > 10);
      assert.ok(section.paragraphs.length >= 2);
      for (const paragraph of section.paragraphs) {
        assert.ok(paragraph.length >= 100, `${lesson.id}/${section.id}`);
        allParagraphs.push(paragraph);
      }
      assert.ok(section.sources.length > 0);
      for (const key of section.sources) {
        assert.ok(moneySources[key], key);
        assert.ok(lesson.sources.includes(key), `${lesson.id} footer omits ${key}`);
      }
    }
  }
  assert.equal(allIds.length, 42);
  assert.equal(new Set(allIds).size, allIds.length);
  assert.equal(new Set(allParagraphs).size, allParagraphs.length);
  assert.equal(moneyLessons.macro.find(lesson => lesson.id === "sectors").explanations.length, 6);
});

test("explanations teach concrete reasoning and remain expanded with keyboard-accessible anchors", () => {
  const text = id => macroExplanations[id].flatMap(section => section.paragraphs).join(" ");
  assert.match(text("indicators"), /30%.*40%.*50.*생산량/);
  assert.match(text("indicators"), /이전 52.*예상 48.*발표 49/);
  assert.match(text("credit"), /2년 금리 5%.*10년 금리 4%.*3.5%.*5.5%/);
  assert.match(text("cyclical"), /판매량.*10%.*단가.*15%.*6.5%/);
  assert.match(text("scenarios"), /유지·수정·폐기/);
  const source = read("money/LearningExplanations.tsx");
  for (const token of ["<h2", "<h3", "tabIndex={-1}", "section.paragraphs.map", "section.sources.map", "data-workspace-link", "aria-labelledby="]) assert.ok(source.includes(token), token);
  assert.doesNotMatch(source, /<details|<summary|hidden=|aria-expanded/);
  assert.ok(read("money/MoneyWorkspace.tsx").includes("<LearningExplanations sections={lesson.explanations}"));
});

test("Money spacing is compact without shrinking body type or coarse-pointer targets", () => {
  const css = read("money/money.css");
  assert.match(css, /\.money-intro \{ padding: 20px 0 16px/);
  assert.match(css, /\.money-reading-layout[^}]+gap: 24px; padding-top: 16px/);
  assert.match(css, /\.money-article > section \{ margin-bottom: 16px; padding-bottom: 12px/);
  assert.match(css, /\.money-concepts > div[^}]+padding: 8px 0/);
  assert.match(css, /\.money-guide-table th, \.money-guide-table td \{ padding: 8px 12px/);
  assert.match(css, /\.money-workspace[^}]+font-size: 14px; line-height: 1.85/);
  assert.match(css, /@media \(pointer: coarse\)[\s\S]+min-height: 44px/);
  assert.ok(css.includes("html:has(.money-workspace) { scroll-padding-top: 0; }"));
});

test("financial examples retain qualifications and avoid hard-coded loan or ISA eligibility limits", () => {
  assert.match(moneyLessons.accounts[0].update, /확정 숫자 대신/);
  assert.match(moneyLessons.accounts[1].example, /가정한.*지방소득세를 제외/);
  assert.match(moneyLessons.property[1].example, /허용 한도나 대출 승인 예시가 아닙니다/);
  assert.match(moneyLessons.stocks[2].example, /개인 추천이 아닙니다/);
  assert.match(moneyLessons.tax[2].update, /과세 시행 시점은 단정하지 않습니다/);
  assert.match(moneyLessons.crypto[1].concepts.flat().join(" "), /복구 구문·개인키.*공유하지 않습니다/);
  assert.match(moneyLessons.crypto[2].concepts.flat().join(" "), /가치 보증과 다릅니다/);
});

test("six navigation disclosures support hover, touch, keyboard, dismissal and current links", () => {
  const source = read("money/MoneyNavigation.tsx");
  for (const token of ["moneyCategories.map", 'event.pointerType === "mouse"', "onPointerEnter", "onPointerLeave", "onPointerDown", "onClick", "onBlur", 'event.key === "Escape"', 'event.key === "ArrowDown"', "aria-expanded=", "aria-controls=", "hidden={open !== category.id}", "aria-current=", '"pointerdown"']) assert.ok(source.includes(token), token);
  assert.doesNotMatch(source, /role="menu"|role="menuitem"/);
});

test("Money integrates without changing existing pages or adding financial data collection", () => {
  const app = read("WorkspaceApp.tsx");
  const page = read("money/MoneyWorkspace.tsx");
  assert.match(app, /href="\/money" data-workspace-link/);
  assert.match(app, /route === "money"\) return <MoneyWorkspace pathname=\{pathname\}/);
  assert.match(app, /resolveMoneyPage\(pathname\).*Money Notes/);
  for (const token of ["<MoneyNavigation key={pathname}", 'id="money-content"', "data-route-heading", "<dl", "<dt", "<dd", "lesson.example", "lesson.pitfall", "lesson.checks", "lesson.sources", "<time", "개인별 투자·세무·법률 자문", "실제 자산·계좌 연결이나 개인정보 입력 기능은 없습니다"]) assert.ok(page.includes(token), token);
  assert.doesNotMatch(page, /localStorage|<input|<textarea/);
  assert.equal(resolveWorkspace("/brand/products"), "products");
  assert.equal(resolveWorkspace("/dev"), "dev");
  assert.equal(resolveWorkspace("/core"), "core");
});
