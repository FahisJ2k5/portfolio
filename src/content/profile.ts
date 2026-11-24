import type { Profile } from "../lib/types.ts";
import { todo } from "../lib/placeholder.ts";

/**
 * Personal facts. Only things Fahis has stated are written as plain text.
 * Everything else uses todo() and is shown on the page as a visible placeholder.
 */
export const profile: Profile = {
  name: "Fahis Jabbar",
  headline: "Software engineer, backend and AI",
  location: "Bangalore, India",
  intro:
    "I'm a software engineer in the making, working mainly in Python. I came " +
    "to software through microcontrollers and sensors, and I'm building " +
    "backend and AI projects to strengthen my engineering fundamentals.",
  about: [
    "I graduated with a B.Sc. in Internet of Things. My IoT internship and " +
      "projects gave me hands-on experience with ESP32 and Arduino boards, " +
      "sensors and embedded C.",
    "I'm now strengthening my software engineering fundamentals: Python, SQL, " +
      "REST APIs, Linux, Git and Docker, along with testing, clean architecture " +
      "and CI. The projects on this site are where I practise them, and each " +
      "one says what it does and how far it has got.",
    "I'm looking for a role as a software engineer, backend developer or AI engineer.",
  ],
  targetRoles: ["Software Engineer", "Backend Developer", "AI Engineer"],
  links: {
    email: todo("professional email address"),
    githubUsername: todo("GitHub username"),
    linkedin: todo("LinkedIn profile URL"),
    portfolioRepo: todo("portfolio repository URL"),
  },
  resume: {
    href: "/resume/fahis-jabbar-resume.pdf",
    available: false,
  },
};
