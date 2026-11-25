import type { Certification, Education, Experience } from "../lib/types.ts";

/**
 * Taken from Fahis's own resume and messages. Newest first.
 * Project code names used on the freelance platform are left out on purpose:
 * they may be confidential, and the work can be described without them.
 */
export const experience: Experience[] = [
  {
    organisation: "Handshake AI",
    role: "Freelance AI benchmarking and evaluation contributor",
    period: "Jun 2026 – present",
    location: "Remote",
    highlights: [
      "Reproduced and diagnosed failures in Docker-based benchmark environments, including dependency conflicts, unpinned base images and environment misconfigurations.",
      "Used Python scripts for data validation and automated scoring, and ran repeated Pass@k trials to validate results before submission.",
      "Built adversarial and edge-case test scenarios, acted on reviewer feedback, and documented findings for reviewers.",
      "Created evaluation tasks and scoring rubrics, and compared AI model outputs against evaluation criteria.",
      "Compared candidate responses to conversations that include images, and wrote short rationales for the choice.",
    ],
    tools: ["Python", "Docker", "Git and GitHub", "Linux", "PowerShell"],
  },
  {
    organisation: "SMEC Technologies",
    role: "IoT and automation intern",
    period: "2 Jun – 5 Jul 2025",
    location: "Infopark, Kochi, Kerala",
    highlights: [
      "Developed and tested ESP32 and Arduino-based IoT solutions for real-time data acquisition.",
      "Diagnosed and replicated hardware and software integration faults in embedded systems, identifying root causes to improve reliability and uptime.",
      "Collaborated with cross-functional engineering teams, documented fixes, and escalated unresolved issues.",
    ],
    tools: ["ESP32", "Arduino"],
  },
];

export const education: Education[] = [
  {
    degree: "B.Sc. Internet of Things (IoT)",
    institution: "Kristu Jayanti University",
    period: "2023 – 2026",
    location: "Bengaluru",
  },
  {
    degree: "Class XII, Computer Science",
    institution: "Jayakeralam HSS",
    period: "2021 – 2023",
    location: "Kerala",
  },
];

/** Every entry is from Fahis's resume. Add a new one only after it has been earned. */
export const certifications: Certification[] = [
  { name: "Complete UNIX & Linux OS Fundamentals Training", issuer: "Infosys Springboard", year: "Jul 2025" },
  { name: "Mastering Digital Twins", issuer: "EIT Digital via Coursera", year: "Jul 2025" },
  { name: "Introduction to Industry 4.0 and IIoT", issuer: "NPTEL (SWAYAM)", year: "2025" },
  { name: "Network Fundamentals", issuer: "Infosys Springboard", year: "Jul 2024" },
  {
    name: "Digital Engineering (IoT, AI/ML, Cloud, Cybersecurity, Edge Computing, Big Data)",
    issuer: "FutureSkills Prime",
    year: "Oct 2023",
  },
];

export const achievements: string[] = [
  "Smart India Hackathon 2024: college-level winner",
  "Participant, Pitch Fest 20, St. Joseph's College, Tiruchirappalli",
  "Logistics Head and Hospitality and Venue Management Head, Smart Zone IoT Club, Kristu Jayanti College",
  "Member, IoT Club, Kristu Jayanti College",
];
