import assert from "node:assert/strict";
import test from "node:test";
import { questionnaire } from "../src/workspace/brand/worksheets/questionnaire.mjs";
import { designBrief } from "../src/workspace/brand/worksheets/designBrief.mjs";
import { emptyAnswers, formatWorksheet, parseAnswers, worksheetFields, worksheetKey } from "../src/workspace/brand/worksheets/storage.mjs";
import { resolveWorkspace } from "../src/workspace/routes.mjs";

test("questionnaire and design brief have independent URLs and storage keys", () => {
  for (const route of ["questionnaire","design-brief"]) {
    for (const suffix of ["","/"]) assert.equal(resolveWorkspace(`/brand/${route}${suffix}`),route);
    assert.notEqual(worksheetKey(route),"brand-workspace:v1:branding");
  }
  assert.notEqual(worksheetKey(questionnaire.id),worksheetKey(designBrief.id));
});

test("questionnaire contains all 12 pre-questions, 10 interview sections, summary and seven final checks", () => {
  assert.deepEqual(questionnaire.groups.map(group=>group.title),["CLIENT PRE-QUESTIONNAIRE","CLIENT DISCOVERY INTERVIEW","DESIGNER SUMMARY","Final Check"]);
  assert.equal(questionnaire.groups[0].sections.length,12);
  assert.equal(questionnaire.groups[1].sections.length,10);
  const fields=worksheetFields(questionnaire);
  assert.equal(fields.filter(field=>field.type==="scale").length,6);
  assert.deepEqual(fields.filter(field=>field.type==="scale").map(field=>[field.left,field.right]),[["Classic","Progressive"],["Minimal","Expressive"],["Friendly","Authoritative"],["Accessible","Premium"],["Calm","Energetic"],["Safe","Experimental"]]);
  assert.equal(fields.find(field=>field.id==="interview-priorities").count,5);
  assert.equal(fields.find(field=>field.id==="interview-final-answers").options.length,7);
  assert.equal(fields.filter(field=>/^pre-reference-\d-url$/.test(field.id)).length,3);
  for(const id of ["deeper-premium","deeper-simple","deeper-impact-first","deeper-hip-audience","deeper-professional","summary-hypothesis","pre-type-other","pre-decision-other"]) assert.ok(fields.some(field=>field.id===id));
});

test("design brief includes metadata, 12 sections, four principles, six visual directions and decision rule", () => {
  const sections=designBrief.groups[0].sections;
  assert.equal(sections.filter(section=>/^\d{2}\./.test(section.title)).length,12);
  assert.equal(sections.find(section=>section.id==="design-principles").fields.length,4);
  assert.equal(sections.find(section=>section.id==="design-visual").fields.length,6);
  assert.equal(sections.find(section=>section.id==="design-success").fields[0].options.length,7);
  assert.deepEqual(sections[0].fields.map(field=>field.label),["Project","Brand","Date"]);
  assert.match(sections.at(-1).description,/우리가 정의한 문제를 해결하는가/);
});

test("schema IDs are unique and every field has an empty, unanswered default", () => {
  const ids=[];
  for(const doc of [questionnaire,designBrief]) {
    const defaults=emptyAnswers(doc);
    for(const group of doc.groups) {
      ids.push(group.id);
      for(const section of group.sections) {
        ids.push(section.id);
        for(const field of section.fields) {
          ids.push(field.id);
          assert.ok(field.label);
          if(field.type==="choices") assert.deepEqual(defaults[field.id],[]);
          else if(field.type==="list") assert.deepEqual(defaults[field.id],Array(field.count).fill(""));
          else assert.equal(defaults[field.id],"");
        }
      }
    }
  }
  assert.equal(new Set(ids).size,ids.length);
});

test("answers round-trip without leaking between documents and discard invalid field values", () => {
  const answers=emptyAnswers(questionnaire);
  answers["pre-brand"]="테스트 브랜드";
  answers["pre-types"]=["Logo","Logo","unknown"];
  answers["pre-images"]=["Premium",42,"Warm","extra"];
  answers["pre-personality-classic"]="6";
  answers["unknown"]="discard";
  const raw=JSON.stringify({version:1,answers});
  const restored=parseAnswers(questionnaire,raw);
  assert.equal(restored["pre-brand"],"테스트 브랜드");
  assert.deepEqual(restored["pre-types"],["Logo"]);
  assert.deepEqual(restored["pre-images"],["Premium","","Warm"]);
  assert.equal(restored["pre-personality-classic"],"");
  assert.ok(!Object.hasOwn(restored,"unknown"));
  assert.deepEqual(parseAnswers(designBrief,raw),emptyAnswers(designBrief));
  assert.deepEqual(parseAnswers(questionnaire,null),emptyAnswers(questionnaire));
  for(const invalid of ["{","null",'{"version":2,"answers":{}}','{"version":1,"answers":[]}']) assert.throws(()=>parseAnswers(questionnaire,invalid));
});

test("client-only export excludes internal notes and full export preserves all prompts and scales", () => {
  const answers=emptyAnswers(questionnaire);
  answers["pre-brand"]="테스트 브랜드";
  answers["pre-types"]=["Branding"];
  answers["pre-personality-classic"]="4";
  answers["summary-insight"]="내부용 인사이트";
  const client=formatWorksheet(questionnaire,answers,"pre-questionnaire");
  assert.match(client,/테스트 브랜드/);
  assert.match(client,/- \[x\] Branding/);
  assert.match(client,/- \[ \] Logo/);
  assert.match(client,/1 = Classic \/ 5 = Progressive\n선택: 4/);
  assert.doesNotMatch(client,/내부용 인사이트|CLIENT DISCOVERY INTERVIEW|DESIGNER SUMMARY/);
  const full=formatWorksheet(questionnaire,answers);
  assert.match(full,/내부용 인사이트/);
  for(const field of worksheetFields(questionnaire)) assert.ok(full.includes(field.label));
  assert.match(formatWorksheet(designBrief,emptyAnswers(designBrief)),/우리가 정의한 문제를 해결하는가/);
});
