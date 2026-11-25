"use client";

import Link from "next/link";
import { navItems } from "@/content/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const ids = navItems.map((item) => item.id);

/**
 * Desktop navigation: a vertical line down the left edge, drawn like a circuit-board trace, with
 * one gold solder pad per section. The line fills with gold as you read, the pad for the section
 * you are in glows, and its name stays visible beside it. Every pad shows its name on hover and
 * on keyboard focus. Hidden below the lg breakpoint, where the dock takes over.
 */
export function Rail() {
  const { active, progress } = useScrollSpy(ids);
  const last = navItems.length - 1;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 lg:block">
      <nav aria-label="Sections" className="relative h-full">
        <Link
          href="/"
          aria-label="Fahis Jabbar, back to the top"
          className="heading text-silk hover:text-gold absolute top-6 left-1/2 -translate-x-1/2 text-xl transition-colors"
        >
          FJ
        </Link>

        <div className="absolute inset-y-[18vh] left-1/2 w-px -translate-x-1/2">
          <span aria-hidden className="bg-trace absolute inset-0" />
          <span
            aria-hidden
            className="bg-gold absolute inset-x-0 top-0 h-full origin-top transition-transform duration-150 ease-linear"
            style={{ transform: `scaleY(${progress})` }}
          />

          <ul className="absolute inset-0">
            {navItems.map((item, index) => {
              const position = (index / last) * 100;
              const reached = progress >= index / last - 1e-9 && progress > 0;
              return (
                <li
                  key={item.id}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${position}%` }}
                >
                  <Link
                    href={`/#${item.id}`}
                    aria-current={active === item.id ? "location" : undefined}
                    data-reached={reached}
                    className="group relative grid h-8 w-8 place-items-center"
                  >
                    <span
                      aria-hidden
                      className="bg-mask border-trace group-data-[reached=true]:border-gold group-hover:border-gold group-aria-[current=location]:bg-gold group-aria-[current=location]:ring-gold/25 block h-2.5 w-2.5 rotate-45 border transition-all duration-200 group-aria-[current=location]:scale-125 group-aria-[current=location]:ring-4"
                    />
                    <span className="bg-mask-raised border-trace text-silk group-aria-[current=location]:text-gold pointer-events-none absolute top-1/2 left-full ml-2 -translate-x-1 -translate-y-1/2 rounded-sm border px-2 py-1 text-sm whitespace-nowrap opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-aria-[current=location]:translate-x-0 group-aria-[current=location]:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
