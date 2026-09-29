import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { brandingPages, isBrandingPage } from "./navigation.mjs";

export function BrandingMenu({ area }: { area: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return <div className="brand-menu" ref={root}
    onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={event => { if (event.pointerType === "mouse" && !root.current?.contains(document.activeElement)) setOpen(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    }}>
    <button type="button" className="brand-menu-trigger" ref={trigger} aria-expanded={open} aria-controls="branding-submenu" data-active={isBrandingPage(area)}
      onClick={() => setOpen(value => !value)}
      onKeyDown={event => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(".brand-submenu a")?.focus());
        }
      }}>Branding <ChevronDown size={14} aria-hidden /></button>
    <ol id="branding-submenu" className="brand-submenu" hidden={!open} aria-label="Branding 하위 메뉴">
      {brandingPages.map((page, index) => <li key={page.id}><a href={page.href} data-workspace-link aria-current={area === page.id ? "page" : undefined} onClick={() => {
        setOpen(false);
        if (window.location.pathname === page.href) trigger.current?.focus();
      }}><span aria-hidden>{String(index + 1).padStart(2, "0")}</span>{page.title}</a></li>)}
    </ol>
  </div>;
}
