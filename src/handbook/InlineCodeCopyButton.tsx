import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type InlineCodeCopyButtonProps = {
  code: HTMLElement;
};

function getInlineCodeText(code: HTMLElement) {
  return code.textContent?.replace(/\u00a0/g, " ").trim() ?? "";
}

export function InlineCodeCopyButton({ code }: InlineCodeCopyButtonProps) {
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
    const text = getInlineCodeText(code);

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
  const label = copied ? "복사됨" : `${getInlineCodeText(code)} 복사`;

  return (
    <button
      type="button"
      className="inline-code-copy"
      onClick={handleCopy}
      aria-label={label}
      title={copied ? "복사됨" : "복사"}
    >
      <Icon size={12} aria-hidden />
    </button>
  );
}
