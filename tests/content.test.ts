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
  it("has unique project slugs and no invented completion", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects).toHaveLength(4);
    // Raise this deliberately, per project, once its code and tests have passed.
    for (const project of projects) expect(project.status).not.toBe("complete");
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
