"use client";

import { useEffect, useState } from "react";
import { pickActiveSection } from "@/lib/activeSection";
import { railProgress } from "@/lib/rail";

export interface ScrollSpy {
  /** Id of the section the reader is in, or null while still above the first one. */
  active: string | null;
  /** 0 to 1: how far the gold line on the navigation rail should be filled. */
  progress: number;
}

/**
 * Tracks where the reader is on the page. It re-measures on scroll and resize, at most
 * once per animation frame, and hands the numbers to the pure functions in lib/ (which
 * are unit tested). Progress is rounded so React re-renders only when it visibly changes.
 */
export function useScrollSpy(ids: readonly string[]): ScrollSpy {
  const [state, setState] = useState<ScrollSpy>({ active: null, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const sections = ids.flatMap((id) => {
        const element = document.getElementById(id);
        if (!element) return [];
        const box = element.getBoundingClientRect();
        return [{ id, top: box.top, height: box.height }];
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const active = pickActiveSection(sections, window.innerHeight, atBottom);
      const progress = Math.round(railProgress(sections, window.innerHeight, atBottom) * 1000) / 1000;
      setState((prev) => (prev.active === active && prev.progress === progress ? prev : { active, progress }));
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

  return state;
}
