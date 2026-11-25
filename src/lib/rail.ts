export interface RailSection {
  id: string;
  /** Distance from the top of the viewport to the top of the section, in pixels. */
  top: number;
  height: number;
}

/** Fraction of the viewport height where the "reading line" sits (the same line the active-section logic uses). */
const READING_LINE = 0.35;

/**
 * How full the gold line on the navigation rail should be, from 0 to 1.
 *
 * The rail has one pad per section, evenly spaced, so n pads make n-1 gaps. The line must
 * reach pad k at the moment section k becomes the current one, which is when the reading line
 * crosses that section's top. So progress is measured in sections passed (a partly read section
 * counts as the fraction of its height already read) and divided by the n-1 gaps.
 *
 * Pure numbers in, one number out, so it is tested without a browser.
 */
export function railProgress(sections: readonly RailSection[], viewportHeight: number, atBottom: boolean): number {
  if (sections.length === 0) return 0;
  if (atBottom) return 1;

  const line = viewportHeight * READING_LINE;
  const ordered = [...sections].sort((a, b) => a.top - b.top);

  let passed = 0;
  for (const section of ordered) {
    if (line >= section.top + section.height) {
      passed += 1; // fully above the reading line
    } else if (line > section.top && section.height > 0) {
      passed += (line - section.top) / section.height; // partly read
      break;
    } else {
      break; // not reached yet
    }
  }

  const gaps = ordered.length - 1;
  if (gaps === 0) return passed > 0 ? 1 : 0;
  return Math.min(1, Math.max(0, passed / gaps));
}
