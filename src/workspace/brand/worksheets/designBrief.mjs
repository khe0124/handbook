import { textField as t, shortField as s, choices as c, listField as l, section } from "./schema.mjs";

export const designBrief = {
  id: "design-brief", title: "Design Brief", eyebrow: "DESIGN BRIEF / A SHARED BASIS FOR DECISIONS",
  intro: "사전설문과 인터뷰에서 확인한 문제·목표·대상을 디자인의 판단 기준으로 정리합니다. 합의하지 못한 내용은 비워 두고 확인하세요.",
  groups: [
    { id:"brief-definition", title:"DESIGN BRIEF", audience:"디자이너 작성 · 클라이언트와 합의", intro:"프로젝트의 방향과 성공 기준을 한 문서에 정리합니다.", sections:[
      section("design-project", "Project Information", [s("design-project-name", "Project"), s("design-brand", "Brand"), s("design-date", "Date", "date")]),
      section("design-background", "01. Background", [t("design-background-answer", "Background", "프로젝트가 필요한 배경을 2~3문장으로 정리합니다.")]),
      section("design-problem", "02. Core Problem", [t("design-core-problem", "Core Problem", "현재 __________ 때문에 고객이 브랜드를 __________로 인식하고 있다.")], "이번 디자인을 통해 해결해야 하는 가장 중요한 문제."),
      section("design-objective", "03. Objective", [t("design-objective-answer", "Objective", "이번 프로젝트를 통해 __________를 __________로 변화시킨다.")], "이번 프로젝트의 가장 중요한 목표."),
      section("design-audience", "04. Audience", [t("design-primary-audience", "Primary Audience"), t("design-audience-need", "Audience Need"), t("design-audience-barrier", "Audience Barrier")]),
      section("design-message", "05. Core Message", [t("design-core-message", "Core Message", "고객이 반드시 이해해야 하는 한 가지 메시지.")]),
      section("design-perception", "06. Desired Perception", [l("design-desired-perception", "디자인을 본 고객이 느껴야 하는 핵심 이미지.")]),
      section("design-avoid", "07. Avoid", [l("design-avoid-images", "절대로 전달되면 안 되는 이미지.")]),
      section("design-positioning", "08. Positioning", [t("design-positioning-answer", "Positioning", "우리는 __________에게 __________가 아니라 __________로 인식되는 브랜드를 만든다.")]),
      section("design-principles", "09. Design Principles", [1,2,3,4].map(number=>t(`design-principle-${number}`, `0${number}. Design Principle`))),
      section("design-visual", "10. Visual Direction", ["Typography", "Color", "Imagery", "Layout", "Graphic / Symbol", "Motion / Interaction"].map((label,index)=>t(`design-visual-${index+1}`,label))),
      section("design-difference", "11. Key Differentiation", [t("design-key-difference", "Key Differentiation", "경쟁사와 비교했을 때 가장 명확하게 달라야 하는 부분.")]),
      section("design-success", "12. Success Criteria", [c("design-success-criteria", "최종 디자인은 아래 기준을 충족해야 한다.", ["타깃 고객에게 적합하다.", "핵심 메시지를 전달한다.", "Desired Perception이 드러난다.", "Avoid 이미지와 충돌하지 않는다.", "경쟁사와 구분된다.", "향후 브랜드 확장이 가능하다.", "모든 주요 디자인 결정에 이유를 설명할 수 있다."])]),
      section("design-strategy", "One Sentence Strategy", [t("design-one-sentence", "One Sentence Strategy")]),
      section("design-rule", "Design Decision Rule", [], "디자인을 평가할 때 “내 취향에 맞는가?”보다 “우리가 정의한 문제를 해결하는가?”를 우선한다."),
    ] },
  ],
};
