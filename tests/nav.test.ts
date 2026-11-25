import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { navItems } from "../src/content/nav";
import { profile } from "../src/content/profile";

const sectionsDir = new URL("../src/components/sections/", import.meta.url);

/** Every section id actually written in the page's section components. */
function sectionIdsOnThePage(): string[] {
  const ids: string[] = [];
  for (const file of readdirSync(sectionsDir)) {
    if (!file.endsWith(".tsx")) continue;
    const text = readFileSync(new URL(file, sectionsDir), "utf8");
    for (const match of text.matchAll(/<Section\s+id="([\w-]+)"/g)) ids.push(match[1] as string);
  }
  return ids;
}

describe("navigation", () => {
  it("has unique ids and labels", () => {
    expect(new Set(navItems.map((n) => n.id)).size).toBe(navItems.length);
    expect(new Set(navItems.map((n) => n.label)).size).toBe(navItems.length);
  });

  it("only links to sections that exist on the page", () => {
    const onPage = new Set(sectionIdsOnThePage());
    for (const item of navItems) expect(onPage.has(item.id), `no section with id "${item.id}"`).toBe(true);
  });

  it("lists the sections in the same order they appear on the page", () => {
    const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
    const order = [...page.matchAll(/<(\w+) \/>/g)].map((m) => (m[1] as string).toLowerCase());
    const navOrder = navItems.map((n) => n.id);
    // Page components are named About, Skills, Projects, Experience, Education, GitHubActivity, Resume, Contact.
    const index = (id: string) => order.findIndex((name) => name.startsWith(id));
    const positions = navOrder.map(index);
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("every section on the page can be reached from the navigation", () => {
    const linked = new Set(navItems.map((n) => n.id));
    for (const id of sectionIdsOnThePage()) expect(linked.has(id), `section "${id}" has no navigation entry`).toBe(true);
  });
});

describe("profile photo", () => {
  it("exists, is small, and is a web format", () => {
    const url = new URL("../public/images/fahis-jabbar.webp", import.meta.url);
    expect(existsSync(url)).toBe(true);
    const bytes = readFileSync(url);
    expect(bytes.length).toBeLessThan(120 * 1024);
    expect(bytes.subarray(0, 4).toString("ascii")).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
  });

  it("is not exposed under the original filename", () => {
    expect(existsSync(new URL("../public/images/fahis pic 2.png", import.meta.url))).toBe(false);
    expect(profile.name).toBe("Fahis Jabbar");
  });
});
