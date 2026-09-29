// 기존 상품 범위를 납품 단위로 구체화한 구성안. 미명시 형식은 제안으로 구분한다.
export const file = (title, detail, format, status = "형식 제안") => ({ title, detail, format, status });
export const documentFile = (title, detail) => file(title, detail, ".pdf 또는 Notion 공유 링크 · 택1");
export const figmaFile = (title, detail) => file(title, detail, "Figma 공유 링크 · .fig 로컬 원본은 별도 합의", "링크 전달");
export const sourceDelivery = file("구현 소스와 계정 인계", "직접 코드 개발 시 실제 사용한 소스·의존성·실행/배포 방법을 전달. 노코드 제작은 프로젝트·계정 권한으로 인계하며 소스 내보내기 가능 여부를 확인합니다.", "Git 저장소 또는 .zip · 내부 .html / .css / .js / .ts / .tsx / .json 등 실제 사용 파일", "제작 방식에 따라");
export const printFile = (title, detail) => file(title, `${detail} 재단 크기·도련·안전 여백·색상 모드는 출력처 기준으로 확정하고, 인쇄용과 검토용 파일을 구분합니다.`, "인쇄용 .pdf + 검토용 .pdf / .png 중 택1 · 편집 원본은 별도 합의");
