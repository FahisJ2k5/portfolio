"use client";

import { useEffect, useState } from "react";
import { pickActiveSection } from "@/lib/activeSection";

/**
 * Returns the id of the section the reader is in, so the nav can highlight it.
 * It re-measures on scroll and resize, at most once per animation frame.
 * The choice itself lives in lib/activeSection.ts, where it is unit tested.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const sections = ids.flatMap((id) => {
        const element = document.getElementById(id);
        return element ? [{ id, top: element.getBoundingClientRect().top }] : [];
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(pickActiveSection(sections, window.innerHeight, atBottom));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
