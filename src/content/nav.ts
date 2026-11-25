/**
 * The sections of the home page, in the order they appear. The navigation rail (desktop) and the
 * dock (phone) are both built from this one list, and a test checks that every id here is the id
 * of a real section on the page, so a link can never point at nothing.
 */
export interface NavItem {
  id: string;
  label: string;
}

export const navItems: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
