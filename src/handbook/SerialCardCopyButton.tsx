import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SerialCardCopyButtonProps = {
  card: HTMLElement;
};

function getCopyText(card: HTMLElement) {
  if (card.dataset.copyText) return card.dataset.copyText;

  const clone = card.cloneNode(true) as HTMLElement;

  clone
    .querySelectorAll(".serial-card-copy-mount, .snippet-card-copy-mount, .learning-card-collapse-toggle")
    .forEach((node) => {
      node.remove();
    });

  return clone.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
}

export function SerialCardCopyButton({ card }: SerialCardCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const text = getCopyText(card);

    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 1600);
  };

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      className="snippet-card-copy"
      onClick={handleCopy}
      aria-label={copied ? "복사됨" : "스니펫 복사"}
      title={copied ? "복사됨" : "스니펫 복사"}
    >
      <Icon size={14} aria-hidden />
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
