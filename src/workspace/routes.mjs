export function resolveWorkspace(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/dev") return "dev";
  if (path === "/brand" || path === "/brand/branding") return "branding";
  if (path === "/brand/web") return "web";
  return "not-found";
}
