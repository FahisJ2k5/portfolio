import type { Skill, SkillGroup } from "./types.ts";

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

/**
 * Splits pins into the two sides of a dual in-line package.
 * Left side runs top to bottom (1..half). The right side runs bottom to top
 * (half+1..n), so a pin sits directly opposite pin n+1-number, as on a real chip.
 */
export function splitDip(pins: Pin[]): { left: Pin[]; right: Pin[] } {
  const half = Math.ceil(pins.length / 2);
  return { left: pins.slice(0, half), right: pins.slice(half).reverse() };
}
