import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getMoneyLessonGroups, moneyCategories, moneyHref } from "./navigation.mjs";

export function MoneyNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const pointer = useRef("");
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(null);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  return <nav ref={root} className="money-nav" aria-label="재테크 카테고리">
    {moneyCategories.map(category => <div key={category.id} className="money-menu"
      onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(category.id); }}
      onPointerLeave={event => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setOpen(null); }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(value => value === category.id ? null : value); }}
      onKeyDown={event => {
        if (event.key === "Escape") {
          event.preventDefault(); setOpen(null);
          event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}>
      <button type="button" aria-expanded={open === category.id} aria-controls={`money-menu-${category.id}`} data-active={pathname.startsWith(`/money/${category.id}/`)}
        onPointerDown={event => { pointer.current = event.pointerType; }}
        onClick={event => setOpen(value => event.detail > 0 && pointer.current === "mouse" ? category.id : value === category.id ? null : category.id)}
        onKeyDown={event => {
          if (event.key === "ArrowDown") {
            event.preventDefault(); setOpen(category.id);
            requestAnimationFrame(() => document.getElementById(`money-menu-${category.id}`)?.querySelector<HTMLAnchorElement>("a")?.focus());
          }
        }}>{category.title}<ChevronDown size={14} aria-hidden /></button>
      <ul id={`money-menu-${category.id}`} hidden={open !== category.id} aria-label={`${category.title} 하위 메뉴`}>
        {getMoneyLessonGroups(category).map(group => <Fragment key={group.title ?? category.id}>
        {group.title && <li className="money-menu-group">{group.title}</li>}
        {group.lessons.map(([id, title]) => <li key={id}><a href={moneyHref(category.id, id)} data-workspace-link aria-current={pathname.replace(/\/+$/, "") === moneyHref(category.id, id) ? "page" : undefined} onClick={event => {
          setOpen(null);
          if (pathname.replace(/\/+$/, "") === moneyHref(category.id, id)) event.currentTarget.closest(".money-menu")?.querySelector<HTMLButtonElement>("button")?.focus();
        }}>{title}</a></li>)}
        </Fragment>)}
      </ul>
    </div>)}
  </nav>;
}
