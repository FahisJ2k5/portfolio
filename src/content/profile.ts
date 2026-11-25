import type { Profile } from "../lib/types.ts";

/**
 * Personal facts. Only things Fahis has stated or confirmed are written here.
 * Details we do not have yet are written with the todo helper, which makes them show on the page as a visible placeholder.
 */
export const profile: Profile = {
  name: "Fahis Jabbar",
  headline: "Software engineer, backend and AI",
  location: "Bangalore, India",
  intro:
    "I'm a software engineer working mainly in Python. I came to software through microcontrollers and " +
    "sensors, and I build backend tools and AI tooling with automated tests and continuous integration.",
  about: [
    "I graduated with a B.Sc. in Internet of Things from Kristu Jayanti University. My IoT internship and " +
      "projects gave me hands-on experience with ESP32 and Arduino boards, sensors and embedded C.",
    "Alongside that, I work as a freelance AI benchmarking and evaluation contributor at Handshake AI, " +
      "where I diagnose Docker-based benchmark environments and use Python scripts for data validation and scoring.",
    "I'm now strengthening my software engineering fundamentals: Python, SQL, REST APIs, Linux, Git and Docker, " +
      "along with testing, clean architecture and CI. The projects on this site are where I practise them, and " +
      "each one says what it does and how far it has got.",
    "I'm looking for a role as a software engineer, backend developer or AI engineer.",
  ],
  targetRoles: ["Software Engineer", "Backend Developer", "AI Engineer"],
  links: {
    email: "fahisjabbar95@gmail.com",
    githubUsername: "FahisJ2k5",
    linkedin: "https://in.linkedin.com/in/fahis-jabbar-78b562377",
    portfolioRepo: "https://github.com/FahisJ2k5/portfolio",
  },
  resume: {
    href: "/resume/fahis-jabbar-resume.pdf",
    available: true,
  },
};
