import { describe, expect, it } from "vitest";
import { fetchPublicRepos, isValidGithubUsername, parseRepos } from "../src/lib/github";
import { NO_USAGE, describeSkill, describeUsage, splitDip, toPins } from "../src/lib/skills";
import { projects } from "../src/content/projects";
import { skillGroups } from "../src/content/skills";

function fakeFetch(status: number, body: unknown): typeof fetch {
  return (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;
}

describe("isValidGithubUsername", () => {
  it("accepts valid names", () => {
    for (const name of ["octocat", "a", "a-b", "A1-b2"]) expect(isValidGithubUsername(name)).toBe(true);
  });
  it("rejects malformed names, including path-injection attempts", () => {
    for (const name of ["", "-a", "a-", "a--b", "a/b", "a b", "../x", "x".repeat(40), "TODO: GitHub username"]) {
      expect(isValidGithubUsername(name)).toBe(false);
    }
  });
});

describe("parseRepos", () => {
  it("skips forks and malformed items, then sorts by latest push", () => {
    const repos = parseRepos([
      { name: "old", html_url: "u1", pushed_at: "2025-01-01T00:00:00Z", stargazers_count: 2 },
      { name: "forked", html_url: "u2", fork: true },
      { name: 5, html_url: "u3" },
      null,
      { name: "new", html_url: "u4", pushed_at: "2026-01-01T00:00:00Z", description: "d", language: "Python" },
    ]);
    expect(repos.map((r) => r.name)).toEqual(["new", "old"]);
    expect(repos[0]).toMatchObject({ description: "d", language: "Python", stars: 0 });
  });
  it("returns an empty list for non-array payloads", () => {
    expect(parseRepos({ message: "nope" })).toEqual([]);
  });
});

describe("fetchPublicRepos", () => {
  it("never calls the network for an invalid username", async () => {
    const result = await fetchPublicRepos("../etc", {
      fetchImpl: (() => {
        throw new Error("should not be called");
      }) as typeof fetch,
    });
    expect(result).toEqual({ ok: false, reason: "invalid-username" });
  });
  it("maps HTTP failures to reasons instead of throwing", async () => {
    expect(await fetchPublicRepos("octocat", { fetchImpl: fakeFetch(404, {}) })).toEqual({ ok: false, reason: "not-found" });
    expect(await fetchPublicRepos("octocat", { fetchImpl: fakeFetch(403, {}) })).toEqual({ ok: false, reason: "rate-limited" });
    expect(await fetchPublicRepos("octocat", { fetchImpl: fakeFetch(500, {}) })).toEqual({ ok: false, reason: "unavailable" });
  });
  it("maps network errors to 'unavailable'", async () => {
    const failing = (async () => {
      throw new TypeError("network down");
    }) as typeof fetch;
    expect(await fetchPublicRepos("octocat", { fetchImpl: failing })).toEqual({ ok: false, reason: "unavailable" });
  });
  it("returns parsed repos on success and honours the limit", async () => {
    const body = [1, 2, 3].map((n) => ({ name: `r${n}`, html_url: `u${n}`, pushed_at: `2026-0${n}-01T00:00:00Z` }));
    const result = await fetchPublicRepos("octocat", { fetchImpl: fakeFetch(200, body), limit: 2 });
    expect(result.ok && result.repos.map((r) => r.name)).toEqual(["r3", "r2"]);
  });
});

describe("describeUsage", () => {
  const info = {
    done: { name: "Finished One", status: "complete" },
    todo: { name: "Planned One", status: "planned" },
    wip: { name: "Started One", status: "in-progress" },
  };

  it("says 'Used in' only for complete projects", () => {
    expect(describeUsage(["done"], info)).toEqual(["Used in: Finished One."]);
  });

  it("says 'Planned for' for anything not complete", () => {
    expect(describeUsage(["todo", "wip"], info)).toEqual(["Planned for: Planned One, Started One."]);
  });

  it("separates finished from planned work instead of blurring them", () => {
    expect(describeUsage(["done", "todo"], info)).toEqual(["Used in: Finished One.", "Planned for: Planned One."]);
  });

  it("returns nothing when no project uses the skill, and ignores unknown slugs", () => {
    expect(describeUsage([], info)).toEqual([]);
    expect(describeUsage(["ghost"], info)).toEqual([]);
  });
});

describe("describeSkill", () => {
  const info = { done: { name: "Finished One", status: "complete" } };

  it("shows project usage first, then evidence from the resume", () => {
    const skill = { name: "X", usedIn: ["done"], evidence: ["Used at work."] };
    expect(describeSkill(skill, info)).toEqual(["Used in: Finished One.", "Used at work."]);
  });

  it("shows evidence alone when no project uses the skill", () => {
    expect(describeSkill({ name: "X", usedIn: [], evidence: ["Used at work."] }, info)).toEqual(["Used at work."]);
  });

  it("never leaves a card blank", () => {
    expect(describeSkill({ name: "X", usedIn: [] }, info)).toEqual([NO_USAGE]);
    expect(describeSkill({ name: "X", usedIn: ["ghost"] }, info)).toEqual([NO_USAGE]);
  });

  it("gives every pin in the real content something to show", () => {
    const projectInfo = Object.fromEntries(projects.map((p) => [p.slug, { name: p.name, status: p.status }]));
    for (const pin of toPins(skillGroups)) {
      expect(describeSkill(pin.skill, projectInfo).length).toBeGreaterThan(0);
    }
  });
});

describe("pinout", () => {
  it("numbers every skill once, in order", () => {
    const pins = toPins(skillGroups);
    const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);
    expect(pins).toHaveLength(total);
    expect(pins.map((p) => p.number)).toEqual(Array.from({ length: total }, (_, i) => i + 1));
  });
  it("splits like a DIP package: left runs down, right runs up", () => {
    const pins = toPins(skillGroups);
    const { left, right } = splitDip(pins);
    expect(left.length + right.length).toBe(pins.length);
    expect(left.map((p) => p.number)).toEqual(Array.from({ length: left.length }, (_, i) => i + 1));
    expect(right[0]?.number).toBe(pins.length);
    expect(right[right.length - 1]?.number).toBe(left.length + 1);
  });
});
