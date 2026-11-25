import { describe, expect, it } from "vitest";
import { education, experience } from "../src/content/experience";
import { profile } from "../src/content/profile";
import { projects } from "../src/content/projects";
import { heroFacts } from "../src/lib/facts";
import type { Experience, Project } from "../src/lib/types";

const labels = (rows: { label: string }[]) => rows.map((r) => r.label);

describe("heroFacts with the real content", () => {
  const rows = heroFacts(profile, education, experience, projects);
  const byLabel = Object.fromEntries(rows.map((r) => [r.label, r.value]));

  it("shows the four facts, in a stable order", () => {
    expect(labels(rows)).toEqual(["Open to", "Now", "Education", "Projects"]);
  });

  it("matches what the rest of the site says", () => {
    expect(byLabel["Open to"]).toBe("Software Engineer, Backend Developer, AI Engineer");
    expect(byLabel["Now"]).toContain("Handshake AI");
    expect(byLabel["Education"]).toContain("Kristu Jayanti University");
  });

  it("counts finished projects from their real status", () => {
    const finished = projects.filter((p) => p.status === "complete").length;
    expect(byLabel["Projects"]).toContain(`${finished} finished`);
    expect(byLabel["Projects"]).toContain(`${projects.length - finished} more planned`);
  });

  it("makes no claims about scale, users or performance", () => {
    const text = JSON.stringify(rows).toLowerCase();
    for (const banned of ["users", "million", "% ", "faster", "production"]) expect(text).not.toContain(banned);
  });
});

describe("heroFacts rules", () => {
  const job = (period: string): Experience => ({
    organisation: "Acme",
    role: "Engineer",
    period,
    location: "Remote",
    highlights: [],
    tools: [],
  });
  const project = (status: Project["status"]): Project =>
    ({ slug: status, name: status, status }) as unknown as Project;

  it("says Now only while the newest role is still running", () => {
    expect(labels(heroFacts(profile, [], [job("Jun 2026 – present")], []))).toContain("Now");
    expect(labels(heroFacts(profile, [], [job("Jun 2025 – Jul 2025")], []))).toContain("Latest");
  });

  it("leaves out rows it has no data for instead of printing blanks", () => {
    expect(heroFacts({ targetRoles: [] }, [], [], [])).toEqual([]);
  });

  it("omits the project row until something is finished", () => {
    expect(labels(heroFacts(profile, [], [], [project("planned")]))).not.toContain("Projects");
  });

  it("drops the 'more planned' wording when everything is finished", () => {
    const rows = heroFacts(profile, [], [], [project("complete"), project("complete")]);
    expect(rows.find((r) => r.label === "Projects")?.value).toBe("2 finished and passing automated tests in CI");
  });
});
