import type { Certification, Education, Experience } from "../lib/types.ts";
import { todo } from "../lib/placeholder.ts";

/**
 * Only the facts Fahis has confirmed are written plainly: an IoT internship
 * exists. Everything else stays as a visible placeholder until he supplies it.
 */
export const experience: Experience[] = [
  {
    organisation: todo("internship organisation"),
    role: "IoT intern",
    period: todo("start and end dates"),
    location: todo("location"),
    highlights: [
      todo("what you built or worked on (one true statement)"),
      todo("a second true statement about your contribution"),
      todo("a third, if you have one"),
    ],
    tools: [todo("tools and hardware you used")],
  },
];

export const education: Education[] = [
  {
    degree: "B.Sc. Internet of Things",
    institution: todo("university name"),
    period: todo("graduation year"),
    location: todo("location"),
  },
];

/** Leave empty until a certification has actually been earned. */
export const certifications: Certification[] = [];
