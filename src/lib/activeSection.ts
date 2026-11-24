export interface SectionPosition {
  id: string;
  /** Distance from the top of the viewport to the top of the section, in pixels. */
  top: number;
}

/** Fraction of the viewport height where the "reading line" sits. */
const READING_LINE = 0.35;

/**
 * Chooses which section the reader is currently in.
 *
 * - A section becomes current once its top edge has passed the reading line.
 * - Of those, the one closest to the line wins, whatever order the array is in.
 * - Above the first section (for example on the hero) nothing is current.
 * - At the very bottom of the page the last section wins, even if it is too
 *   short for its top edge to ever reach the line.
 *
 * It is a pure function (numbers in, id out), so it can be tested without a browser.
 */
export function pickActiveSection(
  sections: readonly SectionPosition[],
  viewportHeight: number,
  atBottom: boolean,
): string | null {
  const line = viewportHeight * READING_LINE;
  let current: SectionPosition | null = null;
  let last: SectionPosition | null = null;

  for (const section of sections) {
    if (last === null || section.top > last.top) last = section;
    if (section.top <= line && (current === null || section.top > current.top)) current = section;
  }

  if (atBottom) return last?.id ?? null;
  return current?.id ?? null;
}
