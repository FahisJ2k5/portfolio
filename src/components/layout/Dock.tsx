"use client";

import {
  Briefcase,
  Cpu,
  FileText,
  FolderGit2,
  GitBranch,
  GraduationCap,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { navItems } from "@/content/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const ids = navItems.map((item) => item.id);

const icons: Record<string, LucideIcon> = {
  about: User,
  skills: Cpu,
  projects: FolderGit2,
  experience: Briefcase,
  education: GraduationCap,
  github: GitBranch,
  resume: FileText,
  contact: Mail,
};

/**
 * Phone navigation: a small bar floating at the bottom of the screen, within thumb reach.
 * A highlight slides to the section you are reading, and its name appears above the bar.
 * Hidden from the lg breakpoint up, where the rail on the left edge takes over.
 */
export function Dock() {
  const { active } = useScrollSpy(ids);
  const index = navItems.findIndex((item) => item.id === active);
  const count = navItems.length;
  const label = index >= 0 ? navItems[index]?.label : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 lg:hidden">
      <div className="pointer-events-auto relative">
        {label && (
          <p
            aria-hidden
            className="bg-mask-raised border-trace text-gold absolute -top-9 left-1/2 -translate-x-1/2 rounded-sm border px-2.5 py-1 text-sm whitespace-nowrap"
          >
            {label}
          </p>
        )}

        <nav
          aria-label="Sections"
          className="bg-mask/90 border-trace relative flex w-[min(calc(100vw-1.5rem),26rem)] rounded-2xl border p-1 backdrop-blur"
        >
          <span
            aria-hidden
            className="bg-mask-raised border-gold/40 absolute inset-y-1 left-1 rounded-xl border transition-transform duration-300 ease-out"
            style={{
              width: `calc((100% - 0.5rem) / ${count})`,
              transform: `translateX(${Math.max(index, 0) * 100}%)`,
              opacity: index >= 0 ? 1 : 0,
            }}
          />
          {navItems.map((item) => {
            const Icon = icons[item.id] ?? User;
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-label={item.label}
                aria-current={active === item.id ? "location" : undefined}
                className="text-silk-dim aria-[current=location]:text-gold relative z-10 flex h-11 min-w-0 flex-1 items-center justify-center transition-colors"
              >
                <Icon aria-hidden size={20} strokeWidth={1.75} />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
