import { resolveMoneyPage } from "./money/navigation.mjs";

export function resolveWorkspace(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/core" || path === "/brand/core") return "core";
  if (path === "/dev") return "dev";
  if (resolveMoneyPage(path)) return "money";
  if (path === "/brand" || path === "/brand/branding") return "branding";
  if (path === "/brand/web") return "web";
  if (path === "/brand/specs") return "specs";
  if (path === "/brand/questionnaire") return "questionnaire";
  if (path === "/brand/design-brief") return "design-brief";
  if (path === "/brand/products") return "products";
  if (path === "/brand/deliverables") return "deliverables";
  if (path === "/brand/guide") return "guide";
  return "not-found";
}
