import assert from "node:assert/strict";
import test from "node:test";
import { resolveWorkspace } from "../src/workspace/routes.mjs";
import { BRIEF_FIELDS, draftKey, emptyDraft, parseDraft, formatBrief } from "../src/workspace/brand/draft.mjs";

test("root always offers a choice; Dev and both Brand areas have independent URLs", () => {
  for (const [path, expected] of [["/", "home"], ["/dev", "dev"], ["/dev/", "dev"], ["/brand", "branding"], ["/brand/branding", "branding"], ["/brand/web", "web"], ["/brand/web/", "web"], ["/unknown", "not-found"], ["/developer", "not-found"]]) {
    assert.equal(resolveWorkspace(path), expected);
  }
});
test("Branding and Web drafts use distinct versioned storage keys", () => {
  assert.notEqual(draftKey("branding"), draftKey("web"));
  assert.notEqual(draftKey("branding"), "dev-handbook:last-active-id");
});
test("drafts restore known fields and remove stale or duplicated checklist ids", () => {
  const draft = emptyDraft();
  draft.fields.project = "브랜드 리뉴얼";
  draft.checked = ["discovery", "discovery", "obsolete"];
  assert.deepEqual(parseDraft(JSON.stringify(draft), ["discovery"]), { fields: draft.fields, checked: ["discovery"] });
  assert.deepEqual(parseDraft(null, []), emptyDraft());
  assert.throws(() => parseDraft("{", []));
  assert.throws(() => parseDraft('{"fields":null,"checked":[]}', []));
  assert.throws(() => parseDraft("null", []));
  assert.equal(parseDraft('{"fields":{"project":42},"checked":[]}', []).fields.project, "");
});
test("brief export contains all sections, entered text, and explicit unresolved values", () => {
  const draft = emptyDraft();
  draft.fields.project = "테스트 프로젝트";
  const exported = formatBrief("Branding", draft);
  assert.match(exported, /# Branding 프로젝트 브리프/);
  assert.match(exported, /테스트 프로젝트/);
  assert.match(exported, /\(미정\)/);
  for (const [, label] of BRIEF_FIELDS) assert.ok(exported.includes(`## ${label}`));
  assert.equal(emptyDraft().fields.project, "");
});
