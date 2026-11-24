"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/content/profile";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

// "resume" is included so the mobile menu entry for it highlights correctly too.
const sectionIds = [...links.map((l) => l.id), "resume"];

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the mobile menu with Escape and return focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-trace bg-mask/90 sticky top-0 z-50 border-b backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="heading text-silk text-lg" onClick={() => setOpen(false)}>
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className="text-silk-dim hover:text-silk aria-[current=location]:text-gold text-[0.95rem] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#resume"
              className="border-gold text-gold hover:bg-gold hover:text-mask rounded-sm border px-3 py-1.5 text-[0.95rem] font-semibold transition-colors"
            >
              Resume
            </Link>
          </li>
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="text-silk -mr-2 p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </nav>

      {/* Hidden via the `hidden` attribute so closed links are not focusable. */}
      <div id="mobile-menu" hidden={!open} className="border-trace bg-mask border-t lg:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
          {[...links, { id: "resume", label: "Resume" }].map((link) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "location" : undefined}
                className="text-silk-dim hover:text-silk aria-[current=location]:text-gold block py-3 text-lg transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
