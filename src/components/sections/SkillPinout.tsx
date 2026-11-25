"use client";

import { useState, type CSSProperties } from "react";
import { describeUsage, splitDip, type Pin, type ProjectInfo } from "@/lib/skills";

interface SkillPinoutProps {
  pins: Pin[];
  /** slug -> name and status, so the readout can name projects and describe them truthfully. */
  projectInfo: ProjectInfo;
}

/**
 * Skills drawn as the pins of a dual in-line chip. Selecting a pin shows which
 * projects on this site are designed to use that skill.
 * State lives here (a client island); the pin data is computed on the server.
 */
export function SkillPinout({ pins, projectInfo }: SkillPinoutProps) {
  const [selected, setSelected] = useState<number>(1);
  const { left, right } = splitDip(pins);
  const current = pins.find((p) => p.number === selected) ?? pins[0];

  if (!current) return null;

  const usage = describeUsage(current.skill.usedIn, projectInfo);

  function renderPin(pin: Pin, side: "left" | "right", index: number) {
    const active = pin.number === selected;
    const label = pin.skill.short ?? pin.skill.name;
    return (
      <li key={pin.number} className={active ? "pin-active" : undefined}>
        <button
          type="button"
          aria-pressed={active}
          aria-label={`Pin ${pin.number}: ${pin.skill.name}`}
          onClick={() => setSelected(pin.number)}
          className={`group flex h-9 w-full items-center gap-2 ${side === "left" ? "flex-row" : "flex-row-reverse"}`}
        >
          <span
            className={`flex-1 truncate text-[0.9rem] transition-colors ${side === "left" ? "text-right" : "text-left"} ${active ? "text-gold" : "text-silk-dim group-hover:text-silk"}`}
          >
            {label}
          </span>
          <span className="text-silk-dim w-5 text-center text-xs">{pin.number}</span>
          <span
            aria-hidden
            className="pin-leg h-[3px] w-6 sm:w-8"
            style={{ "--i": index } as CSSProperties}
          />
        </button>
      </li>
    );
  }

  return (
    <figure aria-label="Skills shown as a chip pinout" className="w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
        <ul className="flex flex-col justify-around">{left.map((p, i) => renderPin(p, "left", i))}</ul>

        {/* Chip body. The notch and dot mark pin 1, as on a real package. */}
        <div
          aria-hidden
          className="bg-mask-raised border-trace relative mx-[-1px] flex w-20 flex-col items-center justify-end border-2 pb-4 sm:w-28"
        >
          <span className="bg-mask border-trace absolute -top-px left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border border-t-0" />
          <span className="bg-silk-dim absolute top-5 left-3 h-2 w-2 rounded-full" />
          <span className="heading text-silk-dim -rotate-90 text-sm whitespace-nowrap">FJ-01</span>
        </div>

        <ul className="flex flex-col justify-around">{right.map((p, i) => renderPin(p, "right", i))}</ul>
      </div>

      {/* aria-live announces the change for screen reader users when a pin is selected. */}
      <figcaption
        aria-live="polite"
        className="border-trace bg-mask-raised mt-6 rounded-sm border p-4 text-[0.95rem]"
      >
        <p className="text-gold heading text-lg">{current.skill.name}</p>
        <p className="text-silk-dim text-sm">{current.category}</p>
        {usage.map((line) => (
          <p key={line} className="text-silk mt-2">
            {line}
          </p>
        ))}
      </figcaption>
    </figure>
  );
}
