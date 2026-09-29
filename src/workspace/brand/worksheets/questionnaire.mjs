import { textField as t, shortField as s, choices as c, listField as l, section as section } from "./schema.mjs";

export const questionnaire = {
  id: "questionnaire", title: "사전설문", eyebrow: "CLIENT DISCOVERY / FROM ANSWERS TO INSIGHT",
  intro: "고객 사전설문에서 발견한 단서를 인터뷰로 구체화하고, 디자이너의 해석과 다음 판단 기준으로 정리합니다.",
  groups: [
    { id: "pre-questionnaire", title: "CLIENT PRE-QUESTIONNAIRE", audience: "고객 작성", intro: "프로젝트를 시작하기 전, 브랜드와 목표를 더 정확하게 이해하기 위한 간단한 사전 질문입니다. 가능한 한 편하게 작성해주세요.", sections: [
      section("pre-project", "01. Project", [s("pre-brand", "브랜드 / 회사명"), c("pre-types", "프로젝트 유형", ["Branding", "Logo", "Website", "UI/UX", "Art Direction", "Other"]), s("pre-type-other", "Other: 프로젝트 유형 직접 입력"), t("pre-reason", "이번 프로젝트를 시작하게 된 가장 큰 이유는 무엇인가요?")]),
      section("pre-business", "02. Business", [t("pre-services", "현재 어떤 제품이나 서비스를 제공하고 있나요?"), t("pre-audience", "주요 고객은 누구인가요?"), t("pre-choice", "고객이 경쟁사가 아니라 여러분을 선택하는 이유는 무엇이라고 생각하시나요?")]),
      section("pre-problem", "03. Problem", [t("pre-problem-answer", "현재 브랜드나 디자인에서 가장 해결하고 싶은 문제는 무엇인가요?", "예: 브랜드가 저렴해 보인다. / 전문성이 잘 전달되지 않는다. / 경쟁사와 차별점이 없다. / 웹사이트가 오래되어 보인다. / 서비스 내용을 이해하기 어렵다.")]),
      section("pre-goal", "04. Goal", [t("pre-success", "이번 프로젝트가 성공적으로 끝났을 때 무엇이 달라져 있으면 좋을까요?"), t("pre-top-goal", "가장 중요한 목표를 하나만 고른다면 무엇인가요?")]),
      section("pre-perception", "05. Brand Perception", [l("pre-images", "고객이 브랜드를 처음 봤을 때 느꼈으면 하는 이미지를 3개 골라주세요.", 3, "예: Professional / Premium / Confident · Warm / Friendly / Approachable · Bold / Progressive / Experimental")]),
      section("pre-avoid", "06. Avoid", [l("pre-avoid-images", "반대로 브랜드가 절대 이렇게 보이지 않았으면 하는 이미지가 있다면 작성해주세요.")]),
      section("pre-competitors", "07. Competitors", [l("pre-competitor-names", "주요 경쟁 브랜드가 있다면 알려주세요."), t("pre-competitor-difference", "경쟁사와 비교했을 때 반드시 다르게 보여야 하는 부분이 있나요?")]),
      section("pre-references", "08. References", [1,2,3].flatMap(number => [s(`pre-reference-${number}-url`, `Reference 0${number} · URL`, "url"), t(`pre-reference-${number}-reason`, `Reference 0${number} · 좋아하는 이유`)]), "좋아하는 브랜드, 웹사이트, 로고 또는 디자인이 있다면 공유해주세요."),
      section("pre-dislike", "09. Dislike", [s("pre-dislike-url", "URL", "url"), t("pre-dislike-reason", "싫어하는 이유")], "피하고 싶은 디자인이나 브랜드가 있다면 알려주세요."),
      section("pre-personality", "10. Brand Personality", [
        ["classic", "Classic", "Progressive"], ["minimal", "Minimal", "Expressive"], ["friendly", "Friendly", "Authoritative"], ["accessible", "Accessible", "Premium"], ["calm", "Calm", "Energetic"], ["safe", "Safe", "Experimental"],
      ].map(([id, left, right]) => ({id:`pre-personality-${id}`, label:`${left} ↔ ${right}`, left, right, type:"scale"})), "각 항목에서 브랜드가 어느 쪽에 가까운지 표시해주세요. 1은 왼쪽, 5는 오른쪽 성향입니다. 아직 정하지 않았다면 선택하지 않아도 됩니다."),
      section("pre-decision", "11. Decision", [c("pre-decision-criteria", "최종 디자인을 선택할 때 가장 중요하게 생각하는 기준은 무엇인가요?", ["고객 반응", "전문성", "브랜드 이미지", "경쟁사와의 차별화", "대표 / 내부 구성원의 선호", "매출 / 문의 전환", "확장 가능성", "SNS / 마케팅 활용성", "기타"]), s("pre-decision-other", "기타: 판단 기준 직접 입력")]),
      section("pre-notes", "12. Additional Notes", [t("pre-additional-notes", "프로젝트와 관련해 디자이너가 미리 알아야 할 내용이 있다면 자유롭게 작성해주세요.")]),
    ] },
    { id: "discovery-interview", title: "CLIENT DISCOVERY INTERVIEW", audience: "인터뷰 진행자 작성", intro: "사전 설문에서 나온 답변을 바탕으로 표면적인 요구사항 뒤에 있는 실제 문제와 목표를 파악하기 위한 인터뷰 시트입니다.", sections: [
      section("interview-context", "01. Context", [c("interview-stage", "이 사업은 현재 어떤 단계인가?", ["Launch", "Early Stage", "Growth", "Rebranding", "Expansion", "Mature"]), t("interview-stage-notes", "Notes"), t("interview-changes", "최근 사업 또는 브랜드에 어떤 변화가 있었나?"), t("interview-urgency", "지금 이 프로젝트를 하지 않으면 어떤 문제가 생기는가?")]),
      section("interview-problem", "02. Problem", [t("interview-main-problem", "지금 가장 큰 문제는 무엇인가?"), t("interview-why", "왜 그것이 문제인가?"), t("interview-affected", "그 문제는 누구에게 가장 크게 영향을 주는가?"), t("interview-current-perception", "현재 고객들은 브랜드를 어떻게 인식하고 있다고 생각하는가?"), t("interview-perception-gap", "실제로 원하는 인식과 얼마나 다른가?")]),
      section("interview-deeper", "03. Dig Deeper", [
        c("deeper-premium", "“고급스럽게 하고 싶어요.” → 이 브랜드에서 고급스럽다는 것은 무엇을 의미하나요?", ["높은 가격", "높은 품질", "전문성", "신뢰", "희소성", "세련된 이미지"]),
        t("deeper-premium-why", "왜 그 이미지가 중요한가요?"),
        c("deeper-simple", "“심플했으면 좋겠어요.” → 무엇이 복잡하게 느껴지나요?", ["정보량", "색상", "그래픽", "콘텐츠", "레이아웃", "인터랙션"]),
        t("deeper-keep", "무엇은 반드시 남겨야 하나요?"),
        t("deeper-impact-first", "“임팩트가 있었으면 좋겠어요.” → 고객이 무엇을 가장 먼저 봐야 하나요?"),
        t("deeper-impact-memory", "무엇을 가장 오래 기억해야 하나요?"),
        t("deeper-hip-audience", "“힙했으면 좋겠어요.” → 누구에게 힙해야 하나요?"),
        t("deeper-hip-culture", "어떤 문화나 브랜드와 가까운 느낌인가요?"),
        c("deeper-professional", "“전문적으로 보였으면 좋겠어요.” → 전문적이라는 것은 무엇을 의미하나요?", ["경험", "기술력", "규모", "안정성", "지식", "가격", "권위"]),
      ], "클라이언트가 추상적인 표현을 사용할 경우 아래 질문으로 구체화한다."),
      section("interview-audience", "04. Audience", [t("interview-audience-primary", "가장 중요한 고객은 누구인가?"), t("interview-audience-problem", "이 고객은 현재 어떤 문제를 가지고 있는가?"), t("interview-audience-barrier", "구매 또는 문의를 망설이게 만드는 이유는?"), t("interview-audience-thought", "브랜드를 처음 접했을 때 어떤 생각이 들었으면 하는가?"), t("interview-audience-action", "최종적으로 어떤 행동을 했으면 하는가?")]),
      section("interview-competition", "05. Competition", [t("interview-alternative", "고객이 우리 대신 선택할 수 있는 대안은 무엇인가?"), t("interview-competitor-image", "경쟁사는 어떤 이미지를 가지고 있는가?"), t("interview-similar", "그들과 비슷해도 되는 부분은?"), t("interview-different", "반드시 달라야 하는 부분은?")]),
      section("interview-reference", "06. Reference Interview", [c("interview-reference-good", "무엇이 좋은가?", ["Typography", "Color", "Photography", "Layout", "Tone", "Motion", "Brand Attitude", "Overall Mood"]), t("interview-reference-specific", "구체적으로:", "레퍼런스별로 이름 또는 URL과 함께 기록하세요."), t("interview-reference-brand", "이 브랜드 자체가 좋은 것인가, 디자인 표현이 좋은 것인가?"), t("interview-reference-limit", "우리 브랜드에 그대로 적용하면 안 되는 부분은?")], "레퍼런스를 하나씩 보면서 질문한다."),
      section("interview-avoid", "07. Avoid", [t("interview-avoid-brand", "절대로 이렇게 보이지 않았으면 하는 브랜드는?"), t("interview-avoid-why", "그 브랜드의 무엇이 싫은가?"), t("interview-past-design", "과거 디자인에서 가장 마음에 들지 않았던 부분은?")]),
      section("interview-success", "08. Success", [t("interview-six-months", "이 프로젝트가 대성공했다고 가정했을 때 6개월 뒤 어떤 변화가 생겨 있어야 하나?"), t("interview-success-feedback", "고객에게 어떤 말을 들으면 “성공했다”고 느낄 것 같은가?"), t("interview-success-internal", "내부적으로 무엇이 달라져 있어야 하는가?")]),
      section("interview-decision", "09. Decision Structure", [t("interview-decider", "최종 의사결정자는 누구인가?"), t("interview-reviewers", "디자인에 의견을 주는 사람은 누구인가?"), t("interview-approval", "최종 승인에 가장 큰 영향을 미치는 기준은?"), t("interview-conflict", "대표 개인의 취향과 고객 관점이 충돌할 경우 무엇을 우선하는가?")]),
      section("interview-priority", "10. Priority", [l("interview-priorities", "다음 요소의 우선순위를 정한다.", 5, "후보: 전문성 / 차별화 / 친근함 / 프리미엄 / 신뢰 / 대중성 / 강한 개성 / 전환 / 브랜드 인지도 / 확장 가능성")]),
    ] },
    { id: "designer-summary", title: "DESIGNER SUMMARY", audience: "디자이너 작성", intro: "인터뷰 직후 작성한다. 고객이 말한 사실과 디자이너의 해석·가설을 구분해 정리하세요.", sections: [
      section("summary-findings", "핵심 요약", [t("summary-problem", "Core Problem"), t("summary-goal", "Business Goal"), t("summary-need", "Audience Need"), t("summary-message", "Core Message"), l("summary-perception", "Desired Perception"), l("summary-avoid", "Avoid"), t("summary-insight", "Key Insight"), t("summary-hypothesis", "Hypothesis", "만약 우리가 __________하게 표현한다면 고객은 이 브랜드를 __________로 인식할 가능성이 높다.")]),
    ] },
    { id: "interview-final", title: "Final Check", audience: "인터뷰 완료 점검", intro: "인터뷰가 끝났을 때 아래 질문에 답할 수 있어야 한다.", sections: [
      section("interview-final-check", "답할 수 있는 항목을 확인하세요", [c("interview-final-answers", "Final Check", ["왜 이 프로젝트가 필요한가?", "누구를 위한 디자인인가?", "무엇을 바꿔야 하는가?", "무엇을 절대 바꾸면 안 되는가?", "고객에게 무엇을 느끼게 해야 하는가?", "경쟁사와 어떻게 달라야 하는가?", "디자인을 무엇을 기준으로 평가할 것인가?"])]),
    ] },
  ],
};
