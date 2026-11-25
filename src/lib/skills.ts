import type { Skill, SkillGroup } from "./types.ts";

export const NO_USAGE = "On my skills list. No project or role on this site uses it yet.";

export interface Pin {
  /** Pin numbers run 1..n like a real chip. */
  number: number;
  skill: Skill;
  category: string;
}

/** Flattens grouped skills into numbered pins, keeping the order they are listed in. */
export function toPins(groups: SkillGroup[]): Pin[] {
  const pins: Pin[] = [];
  for (const group of groups) {
    for (const skill of group.skills) {
      pins.push({ number: pins.length + 1, skill, category: group.category });
    }
  }
  return pins;
}

export type ProjectInfo = Record<string, { name: string; status: string }>;

/**
 * The project lines shown under a pin: which projects use the skill. Empty if none do.
 * "Used in" is only said about projects that are complete; anything else is "Planned for",
 * so the page never claims a skill was used in work that has not been finished.
 */
export function describeUsage(usedIn: readonly string[], projects: ProjectInfo): string[] {
  const linked = usedIn.map((slug) => projects[slug]).filter((p) => p !== undefined);
  const done = linked.filter((p) => p.status === "complete").map((p) => p.name);
  const planned = linked.filter((p) => p.status !== "complete").map((p) => p.name);

  const lines: string[] = [];
  if (done.length > 0) lines.push(`Used in: ${done.join(", ")}.`);
  if (planned.length > 0) lines.push(`Planned for: ${planned.join(", ")}.`);
  return lines;
}

/**
 * Everything shown under a pin: project usage first, then evidence from the resume.
 * If there is neither, say so plainly rather than leaving the card blank.
 */
export function describeSkill(skill: Skill, projects: ProjectInfo): string[] {
  const lines = [...describeUsage(skill.usedIn, projects), ...(skill.evidence ?? [])];
  return lines.length > 0 ? lines : [NO_USAGE];
}

/**
 * Splits pins into the two sides of a dual in-line package.
 * Left side runs top to bottom (1..half). The right side runs bottom to top
 * (half+1..n), so a pin sits directly opposite pin n+1-number, as on a real chip.
 */
export function splitDip(pins: Pin[]): { left: Pin[]; right: Pin[] } {
  const half = Math.ceil(pins.length / 2);
  return { left: pins.slice(0, half), right: pins.slice(half).reverse() };
}
