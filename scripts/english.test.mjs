import assert from "node:assert/strict";
import test from "node:test";
import { grammarCategories, grammarExamples, greWords, speakingGroups } from "../src/workspace/english/content.mjs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";

test("English has four refresh-safe routes", () => {
  for (const path of ["/english", "/english/word", "/english/writing", "/english/speaking", "/english/portfolio"]) {
    assert.equal(resolveWorkspace(path), "english");
    assert.equal(resolveWorkspace(`${path}/`), "english");
  }
  assert.equal(resolveWorkspace("/english/unknown"), "not-found");
});

test("English learning collections keep their promised density", () => {
  assert.ok(grammarExamples.length >= 2500);
  assert.equal(grammarExamples.at(-1).id, grammarExamples.length);
  assert.ok(grammarCategories.length >= 200);
  assert.equal(new Set(grammarExamples.map(item => item.sentence)).size, grammarExamples.length);
  for (const category of ["과거완료진행", "미래완료진행", "조동사 완료형", "진행 수동태", "완료부정사", "수동동명사", "전치사＋관계대명사", "혼합가정법 과거→현재", "부정어 도치 never", "주어·동사 일치 each", "간접의문문 yes/no", "부분부정"]) {
    const exists = category === "조동사 완료형"
      ? grammarCategories.some(item => item.includes("have p.p."))
      : grammarCategories.includes(category);
    assert.ok(exists, `missing grammar category: ${category}`);
  }
  assert.ok(greWords.length >= 3000);
  const speakingPhrases = speakingGroups.flatMap(([, phrases]) => phrases);
  assert.ok(speakingPhrases.length >= 1000);
  assert.equal(new Set(speakingPhrases.map(([english]) => english)).size, speakingPhrases.length);
});

test("generated grammar examples avoid known mechanical and unnatural forms", () => {
  const sentences = grammarExamples.map(item => item.sentence);
  const joined = sentences.join("\n");
  assert.doesNotMatch(joined, /\b(mina|daniel)\b/);
  assert.doesNotMatch(joined, /^(Review|Prepare) the .+ is worth/m);
  assert.doesNotMatch(joined, /will be ready to .+\.$/m);
  assert.doesNotMatch(joined, /continued to finish the report/);
  assert.doesNotMatch(joined, /A careful reader's willingness/);

  const exampleFor = category => grammarExamples.find(item => item.category === category)?.sentence || "";
  assert.match(exampleFor("미래진행"), /will be (reviewing|preparing)/);
  assert.match(exampleFor("동명사"), /^(Reviewing|Preparing)/);
  assert.match(exampleFor("진행 수동태"), /is being developed/);
  assert.match(exampleFor("미래완료"), /will have (reviewed|prepared)/);
});
