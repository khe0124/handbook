import { useEffect, useMemo, useState } from "react";

export type ChecklistItem = {
  id: string;
  text: string;
};

type ChecklistCardProps = {
  itemId: string;
  label: string;
  items: ChecklistItem[];
};

function getStorageKey(itemId: string, label: string) {
  return `handbook-checklist:${itemId}:${label}`;
}

function readCheckedItems(storageKey: string) {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return new Set<string>();

    return new Set(JSON.parse(value) as string[]);
  } catch {
    return new Set<string>();
  }
}

function writeCheckedItems(storageKey: string, checkedItems: Set<string>) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify([...checkedItems]));
  } catch {
    // localStorage can be unavailable in private browsing or restricted embeds.
  }
}

export function ChecklistCard({ itemId, label, items }: ChecklistCardProps) {
  const storageKey = useMemo(() => getStorageKey(itemId, label), [itemId, label]);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => readCheckedItems(storageKey));

  useEffect(() => {
    setCheckedItems(readCheckedItems(storageKey));
  }, [storageKey]);

  const toggleItem = (id: string) => {
    setCheckedItems((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      writeCheckedItems(storageKey, next);
      return next;
    });
  };

  return (
    <div className="serial-card-checklist" role="group" aria-label={label}>
      {items.map((item) => (
        <label className="serial-card-checklist-item" key={item.id}>
          <input
            type="checkbox"
            checked={checkedItems.has(item.id)}
            onChange={() => toggleItem(item.id)}
            aria-label={item.text}
          />
          <span>{item.text.replace(/^□\s*/, "")}</span>
        </label>
      ))}
    </div>
  );
}
