import { describe, expect, it } from "vitest";
import { certifications, education, experience } from "../src/content/experience";
import { profile } from "../src/content/profile";
import { getProject, projects } from "../src/content/projects";
import { skillGroups } from "../src/content/skills";
import { isTodo, real, todo } from "../src/lib/placeholder";

describe("placeholder helpers", () => {
  it("marks and detects placeholders", () => {
    expect(isTodo(todo("email"))).toBe(true);
    expect(isTodo("fahis@example.com")).toBe(false);
    expect(isTodo(null)).toBe(false);
  });

  it("real() hides placeholders and empty values", () => {
    expect(real(todo("x"))).toBeNull();
    expect(real("  ")).toBeNull();
    expect(real(undefined)).toBeNull();
    expect(real("value")).toBe("value");
  });
});

describe("content integrity", () => {
  it("has unique project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects).toHaveLength(4);
  });

  it("only marks a project complete when it has a real repository and recorded checks", () => {
    for (const project of projects) {
      if (project.status === "complete") {
        expect(isTodo(project.repoUrl)).toBe(false);
        expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/FahisJ2k5\/[\w.-]+$/);
        expect(project.verification.length).toBeGreaterThan(0);
        expect(project.verification.join(" ")).toMatch(/GitHub Actions/);
      } else {
        // A project that is not finished must not list checks that were never run.
        expect(project.verification).toHaveLength(0);
      }
      // Every project says what has NOT been verified, so a gap is never silently hidden.
      expect(project.notYetVerified.length).toBeGreaterThan(0);
    }
  });

  it("completed projects are the ones that actually exist", () => {
    const complete = projects.filter((p) => p.status === "complete").map((p) => p.slug);
    expect(complete.sort()).toEqual(["ai-log-analyzer", "billing-engine"]);
  });

  it("does not claim a web API for the command-line log analyzer", () => {
    const analyzer = getProject("ai-log-analyzer");
    const text = JSON.stringify(analyzer).toLowerCase();
    expect(text).not.toContain("fastapi");
    expect(text).not.toContain("rest api");
  });

  it("does not name libraries the billing engine does not use", () => {
    const text = JSON.stringify(getProject("billing-engine")).toLowerCase();
    expect(text).not.toContain("pydantic");
    expect(text).not.toContain("hypothesis");
  });

  it("every project has the fields a case-study page needs", () => {
    for (const p of projects) {
      expect(p.problem.length).toBeGreaterThan(40);
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.flow.length).toBeGreaterThan(1);
      expect(getProject(p.slug)).toBe(p);
    }
    expect(getProject("missing")).toBeUndefined();
  });

  it("skills only reference projects that exist", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        for (const slug of skill.usedIn) expect(slugs.has(slug)).toBe(true);
      }
    }
  });

  it("does not invent certifications, and keeps unknown details as placeholders", () => {
    expect(certifications).toHaveLength(0);
    expect(profile.links.githubUsername).toBe("FahisJ2k5");
    expect(isTodo(profile.links.email)).toBe(true);
    expect(isTodo(experience[0]?.organisation)).toBe(true);
    expect(isTodo(education[0]?.institution)).toBe(true);
    expect(profile.resume.available).toBe(false);
  });

  it("contains no performance or usage claims", () => {
    const text = JSON.stringify({ profile, projects, experience, skillGroups }).toLowerCase();
    for (const banned of ["% faster", "users", "requests per second", "million", "production traffic"]) {
      expect(text).not.toContain(banned);
    }
  });
});
