import { describe, expect, it } from "vitest";
import { pickActiveSection } from "../src/lib/activeSection";

// With a 1000px viewport the reading line is at 350px.
const VIEWPORT = 1000;

describe("pickActiveSection", () => {
  it("highlights nothing while the reader is still on the hero", () => {
    const sections = [
      { id: "about", top: 800 },
      { id: "skills", top: 1500 },
    ];
    expect(pickActiveSection(sections, VIEWPORT, false)).toBeNull();
  });

  it("picks the last section whose top has passed the reading line", () => {
    const sections = [
      { id: "about", top: -200 },
      { id: "skills", top: 300 },
      { id: "projects", top: 900 },
    ];
    expect(pickActiveSection(sections, VIEWPORT, false)).toBe("skills");
  });

  it("does not depend on the order of the input", () => {
    const sections = [
      { id: "contact", top: 50 },
      { id: "resume", top: -400 },
      { id: "github", top: -900 },
    ];
    expect(pickActiveSection(sections, VIEWPORT, false)).toBe("contact");
  });

  it("picks the last section at the bottom of the page, even if it never reaches the line", () => {
    const sections = [
      { id: "github", top: -300 },
      { id: "contact", top: 600 },
    ];
    expect(pickActiveSection(sections, VIEWPORT, true)).toBe("contact");
  });

  it("handles an empty list", () => {
    expect(pickActiveSection([], VIEWPORT, false)).toBeNull();
    expect(pickActiveSection([], VIEWPORT, true)).toBeNull();
  });
});
