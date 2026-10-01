export type KnouItem = { key: string; title: string; period: string; status: "완료" | "해야 할 일"; kind: "강의" | "평가" };
export type KnouSubject = { slug: string; title: string; issue: string; assessment: string; schedule: string; note: string; source: { label: string; url: string; description: string }; items: KnouItem[] };

const periods = ["2026.09.01 — 09.07","2026.09.08 — 09.14","2026.09.15 — 09.21","2026.09.22 — 09.28","2026.09.29 — 10.05","2026.10.06 — 10.12","2026.10.13 — 10.19","2026.10.20 — 10.26","2026.10.27 — 11.02","2026.11.03 — 11.09","2026.11.10 — 11.16","2026.11.17 — 11.23","2026.11.24 — 11.30","2026.12.01 — 12.07","2026.12.08 — 12.14"];

function lessons(start: number, titles: string[], completed: number): KnouItem[] {
  return titles.map((title, index) => ({ key: `TODO-${start + index}`, title: `${index + 1}회차 · ${title}`, period: periods[index], status: index < completed ? "완료" : "해야 할 일", kind: "강의" }));
}

const evaluation = (key: string, title: string, period: string): KnouItem => ({ key, title, period, status: "해야 할 일", kind: "평가" });

export const subjects: KnouSubject[] = [
  {
    slug:"ai-literacy", title:"AI리터러시", issue:"TODO-5", assessment:"중간평가 · 과제물", schedule:"2026.10.02 09:00 — 10.12 18:00", note:"기말시험 일시는 아직 정해지지 않았습니다.", source:{label:"방송대 컴퓨터과학과 교과과정",url:"https://kuwu.knou.ac.kr/cs1/4789/subview.do",description:"2026학년도 전공 과목 편성과 학년·학기 정보를 확인합니다."},
    items:[...lessons(12,["AI 리터러시란 무엇인가","인공지능의 역사와 인간의 꿈","인간 지능과 기계 지능","데이터 리터러시","머신러닝의 원리","딥러닝의 원리","생성형 AI와 대규모 언어 모델","프롬프트와 인간-AI 협업","AI 시스템의 전체 구조","인문사회 분야의 AI 융합","자연과학·공학·의료 분야의 AI 융합","예술·디자인·문화콘텐츠 분야의 AI 융합","AI 윤리","저작권, 가짜 뉴스, 딥페이크","AI 리터러시 종합"],5),evaluation("TODO-216","중간 과제물 제출","2026.10.02 — 10.12")]
  },
  {
    slug:"unix", title:"UNIX시스템", issue:"TODO-6", assessment:"중간평가 · 과제물", schedule:"2026.10.02 09:00 — 10.12 18:00", note:"기말시험 일시는 아직 정해지지 않았습니다.", source:{label:"방송대 출판문화원 · UNIX시스템",url:"https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920046698&condLscValue=001&condSmst=2&condYr=2026",description:"리눅스 운영체제부터 셸 스크립트와 Git 협업까지 다루는 공식 교재입니다."},
    items:[...lessons(27,["리눅스 소개","리눅스 설치","셸 사용하기","파일과 디렉터리","리눅스 시작과 종료","사용자 관리","텍스트 편집","파일 시스템 관리","프로세스 관리","소프트웨어 관리","셸 스크립트 (1)","셸 스크립트 (2)","버전 관리와 Git","브랜치의 생성과 병합","스태시와 버전 되돌리기"],13),evaluation("TODO-215","중간 과제물 제출","2026.10.02 — 10.12")]
  },
  {
    slug:"machine-learning", title:"머신러닝", issue:"TODO-7", assessment:"출석수업 · 비대면", schedule:"2026.10.25", note:"경기지역대학(성남). 시간과 강의실은 수업 1주일 전에 공지됩니다.", source:{label:"방송대 출판문화원 · 머신러닝",url:"https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920043314&condLscValue=001",description:"분류·회귀·군집화·특징 추출부터 신경망과 강화학습까지 다루는 공식 교재입니다."},
    items:[...lessons(42,["머신러닝 소개","지도학습: 분류","지도학습: 회귀","비지도학습: 군집화","데이터 표현: 특징 추출","앙상블 학습","결정 트리와 랜덤 포레스트","SVM과 커널법","신경망 (1)","신경망 (2)","딥러닝 (1)","딥러닝 (2)","딥러닝 응용 (1)","딥러닝 응용 (2)","강화학습"],12),evaluation("TODO-219","비대면 출석수업","2026.10.25")]
  },
  {
    slug:"c-programming", title:"C프로그래밍", issue:"TODO-8", assessment:"출석수업 · 비대면", schedule:"2026.10.12 — 10.14", note:"경기지역대학. 시간과 강의실은 수업 1주일 전에 공지됩니다.", source:{label:"방송대 출판문화원 · C프로그래밍",url:"https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920035197&condLscValue=001",description:"C 언어의 문법과 실행 과정을 다양한 예제로 학습하는 공식 교재입니다."},
    items:[...lessons(57,["C 언어의 개요","자료형과 선행처리기","입·출력 함수와 연산자 (1)","입·출력 함수와 연산자 (2)","선택 제어문과 반복 제어문","함수와 기억 클래스 (1)","함수와 기억 클래스 (2)","배열과 포인터 (1)","배열과 포인터 (2)","배열과 포인터 (3)","구조체와 공용체 (1)","구조체와 공용체 (2)","파일 처리 함수","메모리 동적 할당","C++ 언어의 개요"],12),evaluation("TODO-217","비대면 출석수업","2026.10.12 — 10.14")]
  },
  {
    slug:"cloud-computing", title:"클라우드컴퓨팅", issue:"TODO-9", assessment:"출석수업 · 비대면", schedule:"2026.11.02 — 11.04", note:"중간평가는 출석과제물이며 기말시험 일시는 아직 정해지지 않았습니다.", source:{label:"방송대 출판문화원 · 클라우드컴퓨팅",url:"https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920055539&condLscValue=001&condSmst=2&condYr=2026",description:"서비스·배포 모델, 가상화, 아키텍처와 Azure 실습을 다루는 2026년 공식 교재입니다."},
    items:[...lessons(72,["클라우드 컴퓨팅의 이해","온프레미스와 클라우드","클라우드 컴퓨팅의 도입 효과","클라우드 컴퓨팅의 단점과 적용 사례","클라우드 컴퓨팅 서비스","클라우드 이용 모델","서버 가상화","네트워크 가상화","스토리지 가상화","클라우드 아키텍처 1","클라우드 아키텍처 2","클라우드 컴퓨팅의 미래","클라우드 컴퓨팅 트렌드","클라우드 기반 데이터 분석","일기 예보 전송 서비스 구현"],7),evaluation("TODO-220","비대면 출석수업","2026.11.02 — 11.04")]
  },
  {
    slug:"data-structures", title:"자료구조", issue:"TODO-10", assessment:"출석수업 · 비대면", schedule:"2026.10.19 — 10.21", note:"중간평가는 출석과제물이며 기말시험 일시는 아직 정해지지 않았습니다.", source:{label:"방송대 출판문화원 · 자료구조",url:"https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920046117&condLscValue=001&condSmst=&condYr=",description:"정광식·강태원 저, 15개 장으로 구성된 자료구조 공식 교재입니다."},
    items:[...lessons(87,["자료구조란 무엇인가?","배열","스택","큐","연결 리스트","연결 리스트의 응용","트리","확장된 트리 구조 (Ⅰ)","힙","선택 트리, 숲, 이진 트리 개수","BS, Splay, AVL, BB","멀티웨이 탐색 트리 (Ⅰ)","멀티웨이 탐색 트리 (Ⅱ)","그래프 (Ⅰ)","그래프 (Ⅱ)"],5).map((item,index)=>index===11?{...item,key:"TODO-114"}:index>=12?{...item,key:`TODO-${86+index}`}:item),evaluation("TODO-218","비대면 출석수업","2026.10.19 — 10.21")]
  }
];

export function resolveKnouPath(pathname: string) {
  const [, root, subjectSlug, itemSlug] = pathname.replace(/\/+$/, "").split("/");
  if (root !== "knou") return null;
  const subject = subjects.find(candidate => candidate.slug === subjectSlug) ?? subjects[0];
  const item = itemSlug ? subject.items.find(candidate => candidate.key.toLowerCase() === itemSlug.toLowerCase()) : undefined;
  return { subject, item };
}
