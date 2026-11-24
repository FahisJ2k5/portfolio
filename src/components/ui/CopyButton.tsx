"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Copies text to the clipboard and confirms it. The confirmation reverts after two seconds. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      // Clipboard access can be denied (insecure context or browser settings).
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="border-trace text-silk hover:border-gold hover:text-gold inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-[0.95rem] transition-colors"
      >
        {state === "copied" ? <Check aria-hidden size={16} /> : <Copy aria-hidden size={16} />}
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Could not copy" : ""}
      </span>
    </>
  );
}
