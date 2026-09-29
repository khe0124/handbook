export const worksheetKey = id => `brand-worksheet:v1:${id}`;
export const worksheetFields = doc => doc.groups.flatMap(group => group.sections.flatMap(section => section.fields));
export const emptyAnswers = doc => Object.fromEntries(worksheetFields(doc).map(field => [field.id, field.type === "choices" ? [] : field.type === "list" ? Array(field.count).fill("") : ""]));

export function parseAnswers(doc, raw) {
  if (raw === null) return emptyAnswers(doc);
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || !data.answers || typeof data.answers !== "object" || Array.isArray(data.answers)) throw new Error("Invalid worksheet");
  return Object.fromEntries(worksheetFields(doc).map(field => {
    const value = data.answers[field.id];
    if (field.type === "choices") return [field.id, Array.isArray(value) ? field.options.filter(option => value.includes(option)) : []];
    if (field.type === "list") return [field.id, Array.from({length:field.count}, (_,index) => Array.isArray(value) && typeof value[index] === "string" ? value[index] : "")];
    if (field.type === "scale") return [field.id, ["1","2","3","4","5"].includes(value) ? value : ""];
    return [field.id, typeof value === "string" ? value : ""];
  }));
}

export function formatWorksheet(doc, answers, groupId) {
  const groups = groupId ? doc.groups.filter(group => group.id === groupId) : doc.groups;
  return [`# ${doc.title}`, ...groups.flatMap(group => [
    `## ${group.title}`, group.intro,
    ...group.sections.flatMap(section => [
      `### ${section.title}`, section.description,
      ...section.fields.flatMap(field => {
        const value = answers[field.id];
        let answer;
        if (field.type === "choices") answer = field.options.map(option => `- [${value?.includes(option) ? "x" : " "}] ${option}`).join("\n");
        else if (field.type === "list") answer = Array.from({length:field.count}, (_,index) => `${index+1}. ${value?.[index]?.trim() || "(미작성)"}`).join("\n");
        else if (field.type === "scale") answer = `1 = ${field.left} / 5 = ${field.right}\n선택: ${value || "(미정)"}`;
        else answer = value?.trim() || "(미작성)";
        return [`#### ${field.label}`, field.hint, answer];
      }),
    ]),
  ])].filter(Boolean).join("\n\n");
}
