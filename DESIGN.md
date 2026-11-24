# Design notes

## Concept: the datasheet

Fahis came to software through hardware. The document every embedded engineer
knows is the component datasheet: a pinout diagram up front, then plain,
tabulated facts. The portfolio borrows that structure. Datasheets are
known for sounding factual rather than salesy, and that matches the rule that
nothing on this site gets inflated.

**The one bold element** is the hero pinout: a chip whose pins are
Fahis's skills. Selecting a pin shows where that skill is used in the projects.
Everything else stays quiet: sections read like datasheet pages, and skills
appear as a characteristics table, not progress bars.

## Tokens

| Name | Hex | Role |
|---|---|---|
| Solder mask | `#0F1B26` | Page background (deep blue PCB mask, not neutral black) |
| Mask raised | `#152433` | Hover rows, chip body, panels |
| Trace | `#2A3F52` | Borders, rules, pin legs |
| Silkscreen | `#E9E7E1` | Primary text |
| Silk dim | `#93A1AE` | Secondary text (≈6.4:1 on mask) |
| ENIG gold | `#D9B86C` | The single accent: active pin, links, focus ring |

**Type:** one family, Archivo (variable, with a width axis). Headings are set
condensed and heavy, like datasheet titles. Body text is normal width, and numbers
use tabular figures. There's no monospace face: data uses tabular Archivo.

Scale (px): 14 · 17 (body) · 21 · 26 · 33 · 42 · clamp(56→112) for the name.

**Layout:** left-aligned throughout. Each section uses a two-column datasheet
page: the section title on a narrow left rail (sticky on desktop), content on the
right with lines under 72ch. It collapses to one column on mobile.

```
┌ Fahis Jabbar ─────────────── About Skills Projects … [Resume] ┐
│ FAHIS                         ┌───────────┐                    │
│ JABBAR      1 Python ───┤           ├─── Docker 7              │
│ intro …     2 C      ───┤  FJ-01    ├─── AWS    8              │
│ [See projects] [Resume] …    └───────────┘   readout: used in…  │
├───────────────────────────────────────────────────────────────┤
│ About      │ prose ≤72ch                                        │
│ Skills     │ category | skills | where it's used (table)        │
│ Projects   │ rows: name / problem / stack / status  (no card kit)│
└───────────────────────────────────────────────────────────────┘
```

## Principles
1. One motion moment: on load, the pins power up in sequence (gold legs light
   one by one). There are no scroll fade-ins. Hover and focus transitions only answer
   what the user does. Respects `prefers-reduced-motion`.
2. No numbered section markers. Sections aren't a sequence. Pin numbers and the
   experience timeline are, so they're numbered or ordered.
3. Sentence case, no all-caps eyebrows, no `·`-joined metadata, no arrows appended
   to text. The external-link icon appears only on links that leave the site.
4. Placeholders are visible (dashed gold outline) so none ship by accident.

## Changed from the Phase 1 proposal
- Signal-green accent on `#0B0D10` → ENIG gold on solder-mask blue (green-on-black
  is the generic developer-portfolio look).
- Geist Sans + Geist Mono labels → Archivo alone, using its width axis.
- Section numbering `01 / About` → removed.
- Scroll "Reveal" animations → removed in favour of the single pinout moment.
