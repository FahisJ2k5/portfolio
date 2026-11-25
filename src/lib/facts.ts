import type { Education, Experience, Profile, Project } from "./types.ts";

export interface Fact {
  label: string;
  value: string;
}

/**
 * The key facts shown in the hero, like the "key specifications" block at the top of a datasheet.
 * Every value is built from the same content the rest of the site uses, so it cannot disagree with it:
 *   - "Now" is only used when the newest role is still running; otherwise the row says "Latest".
 *   - The project counts come from each project's real status.
 * Pure data in, rows out, so it is tested without a browser.
 */
export function heroFacts(
  profile: Pick<Profile, "targetRoles">,
  education: readonly Education[],
  experience: readonly Experience[],
  projects: readonly Project[],
): Fact[] {
  const facts: Fact[] = [];

  if (profile.targetRoles.length > 0) {
    facts.push({ label: "Open to", value: profile.targetRoles.join(", ") });
  }

  const newest = experience[0];
  if (newest) {
    const running = /present/i.test(newest.period);
    facts.push({ label: running ? "Now" : "Latest", value: `${newest.role}, ${newest.organisation}` });
  }

  const degree = education[0];
  if (degree) {
    facts.push({ label: "Education", value: `${degree.degree}, ${degree.institution}` });
  }

  const finished = projects.filter((p) => p.status === "complete").length;
  const planned = projects.length - finished;
  if (finished > 0) {
    const tail = planned > 0 ? `, ${planned} more planned` : "";
    facts.push({ label: "Projects", value: `${finished} finished and passing automated tests in CI${tail}` });
  }

  return facts;
}
