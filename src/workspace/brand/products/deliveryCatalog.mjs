import { brandingDelivery, brandingAddonDelivery } from "./brandingDelivery.mjs";
import { webDelivery, webAddonDelivery, sharedAddonDelivery } from "./webDelivery.mjs";
import { file, documentFile } from "./deliveryFormats.mjs";

export const productDelivery = { ...brandingDelivery, ...webDelivery, ...brandingAddonDelivery, ...webAddonDelivery, ...sharedAddonDelivery };

export function deliveryGroup(name) {
  const items = productDelivery[name];
  if (!items?.length) throw new Error(`상품 산출물 정의 누락: ${name}`);
  return { title: name, items };
}

export const launchDelivery = {
  "Quick Launch": [],
  "Brand Launch": [
    file("런칭 이미지 세트", "favicon·OG·SNS 프로필을 합의한 채널에 맞춰 제작·적용합니다. 구성 상품의 OG/favicon과 같은 파일은 중복 제작·계산하지 않습니다.", "favicon .ico / .png / .svg 중 환경별 형식 · OG .png / .jpg · SNS 프로필 .png"),
    documentFile("브랜드 에셋·Figma 운영 가이드", "브랜드 파일 구조·용도별 선택, Figma 파일 접근·화면 확인·에셋 내보내기와 운영 방법을 정리합니다. 구성 상품의 인계 안내와 통합 가능합니다."),
  ],
  "Brand Experience Launch": [
    file("핵심 카피·콘텐츠", "브랜드/웹 전략을 연결한 핵심 소개·본문·CTA 원고. 구성 상품과 통합하고 전체 분량·책임 범위를 확정합니다.", ".docx / .pdf 또는 Notion 문서 · 택1"),
    file("런칭 에셋", "합의한 OG·favicon·SNS 프로필 등 런칭용 이미지를 정리합니다. 실제 제작 목록·채널·규격을 확정하며 구성 상품과 중복 계산하지 않습니다.", ".png / .jpg / .svg / .ico 중 용도별 선택"),
    file("계정·권한 인계", "고객 명의 도메인·호스팅·웹·분석과 선택한 CMS 등의 접근 권한, 담당자·갱신 정보를 전달합니다. 계정 비밀번호는 공개 파일에 기록하지 않습니다.", "서비스 초대·소유권/권한 이전 + 인계 목록 .pdf / Notion 링크", "권한 이전 · 목록 형식 제안"),
  ],
};
