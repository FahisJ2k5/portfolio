import { describe, expect, it } from "vitest";
import { pickActiveSection } from "../src/lib/activeSection";
import { railProgress } from "../src/lib/rail";

// Viewport 1000px tall, so the reading line is at 350px.
const V = 1000;
const section = (id: string, top: number, height = 800) => ({ id, top, height });

describe("railProgress", () => {
  it("is empty before the first section reaches the reading line", () => {
    expect(railProgress([section("a", 600), section("b", 1400), section("c", 2200)], V, false)).toBe(0);
  });

  it("is empty exactly when the first section's top is on the line, and one gap full when the second's is", () => {
    const at = (offset: number) => [section("a", 350 - offset), section("b", 1150 - offset), section("c", 1950 - offset)];
    expect(railProgress(at(0), V, false)).toBe(0); // reading line is at the top of a
    expect(railProgress(at(800), V, false)).toBeCloseTo(0.5); // a is fully read, line is at the top of b
    expect(railProgress(at(1600), V, false)).toBeCloseTo(1); // line is at the top of c (the last pad)
  });

  it("counts a partly read section as a fraction of its height", () => {
    // the line is 200px into a section that is 800px tall: 0.25 of one section, 2 gaps
    expect(railProgress([section("a", 150), section("b", 950), section("c", 1750)], V, false)).toBeCloseTo(0.25 / 2);
  });

  it("is full at the bottom of the page, whatever the sections look like", () => {
    expect(railProgress([section("a", -2000), section("b", 600, 100)], V, true)).toBe(1);
  });

  it("never leaves the range 0 to 1", () => {
    const values = [
      railProgress([section("a", -9000, 100), section("b", -8000, 100)], V, false),
      railProgress([section("a", 9000, 100), section("b", 9500, 100)], V, false),
      railProgress([section("a", 0, 0), section("b", 0, 0)], V, false),
    ];
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("does not depend on the order the sections are listed in", () => {
    const list = [section("a", -700), section("b", 100), section("c", 900)];
    expect(railProgress([...list].reverse(), V, false)).toBe(railProgress(list, V, false));
  });

  it("handles an empty list and a single section", () => {
    expect(railProgress([], V, false)).toBe(0);
    expect(railProgress([], V, true)).toBe(0);
    expect(railProgress([section("a", 600)], V, false)).toBe(0);
    expect(railProgress([section("a", 100)], V, false)).toBe(1);
  });

  it("is monotonic: scrolling further never lowers the fill", () => {
    const heights = [700, 500, 900, 600, 800];
    let previous = -1;
    for (let scroll = 0; scroll <= 4500; scroll += 25) {
      let top = 300 - scroll;
      const list = heights.map((h, i) => {
        const s = section(`s${i}`, top, h);
        top += h;
        return s;
      });
      const value = railProgress(list, V, false);
      expect(value).toBeGreaterThanOrEqual(previous);
      previous = value;
    }
  });

  it("agrees with the active section: the line has reached pad k exactly when section k is current", () => {
    const heights = [700, 500, 900, 600, 800];
    const ids = heights.map((_, i) => `s${i}`);
    for (let scroll = 0; scroll <= 3800; scroll += 25) {
      let top = 300 - scroll;
      const list = heights.map((h, i) => {
        const s = { id: ids[i] as string, top, height: h };
        top += h;
        return s;
      });
      const active = pickActiveSection(list, V, false);
      const progress = railProgress(list, V, false);
      const reached = Math.floor(progress * (heights.length - 1) + 1e-9); // index of the last pad the line has reached
      if (active === null) {
        expect(progress).toBe(0);
      } else {
        expect(reached).toBe(ids.indexOf(active));
      }
    }
  });
});
