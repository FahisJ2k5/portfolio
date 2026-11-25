/**
 * Content types. Components only render data shaped like this, so a missing
 * field becomes a compile error instead of a blank spot on the live site.
 */

export interface Profile {
  name: string;
  headline: string;
  location: string;
  /** Short paragraphs shown in the hero. */
  intro: string;
  /** Paragraphs for the About section. */
  about: string[];
  targetRoles: string[];
  links: {
    email: string;
    githubUsername: string;
    linkedin: string;
    /** URL of this portfolio's source repository. */
    portfolioRepo: string;
  };
  resume: {
    /** Path under /public. */
    href: string;
    /** Set to true once the PDF exists at `href`. */
    available: boolean;
  };
}

export interface Skill {
  name: string;
  /** Shorter label for tight spaces such as the hero pinout. */
  short?: string;
  /** Slugs of projects in this portfolio that use the skill. */
  usedIn: string[];
  /** Short true statements from the resume about where the skill was used. Shown under the pin. */
  evidence?: string[];
}

export interface SkillGroup {
  category: string;
  /** One sentence explaining the group, when the name alone isn't enough. */
  note?: string;
  /** Skills that become pins on the hero chip. Keep this list short. */
  skills: Skill[];
  /** More skills for the table only. They do not become pins. */
  extra?: string[];
}

export type ProjectStatus = "planned" | "in-progress" | "complete";

export interface StackItem {
  name: string;
  /** Why this technology was chosen. */
  reason: string;
}

export interface Decision {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  name: string;
  repoName: string;
  /** One line: what it is. */
  tagline: string;
  /** The problem the project solves, in plain language. */
  problem: string;
  features: string[];
  stack: StackItem[];
  /** Ordered stages data passes through. */
  flow: string[];
  decisions: Decision[];
  /** Checks that have really been run, each written as one plain statement. Empty until something has. */
  verification: string[];
  /** Things that exist in the code but have not been tested for real yet. */
  notYetVerified: string[];
  status: ProjectStatus;
  /** Repository URL, or a todo() placeholder until it's pushed. */
  repoUrl: string;
}

export interface Experience {
  organisation: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tools: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}
