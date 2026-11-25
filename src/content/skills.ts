import type { SkillGroup } from "../lib/types.ts";

/**
 * Skills exactly as Fahis listed them. No proficiency levels are shown,
 * because none were provided and a self-rating bar would be invented data.
 * `usedIn` points at the projects in this portfolio that are designed to use
 * the skill (see projects.ts for each project's current status).
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", usedIn: ["iot-device-monitor", "ai-log-analyzer", "resumeforge", "billing-engine"] },
      { name: "C", usedIn: [] },
      { name: "Embedded C", short: "Emb. C", usedIn: [] },
      { name: "SQL", usedIn: ["iot-device-monitor", "ai-log-analyzer"] },
    ],
    extra: ["C++", "JavaScript"],
  },
  {
    category: "Backend and data",
    skills: [
      { name: "REST APIs and HTTP", short: "REST", usedIn: ["iot-device-monitor", "ai-log-analyzer"] }, // log analyzer: one outbound HTTPS call to the model API
      { name: "MySQL", usedIn: [] },
    ],
    extra: ["HTML", "CSS", "SQLite with full-text search"],
  },
  {
    category: "Tools and platforms",
    skills: [
      { name: "Linux and Unix", short: "Linux", usedIn: [] },
      { name: "Git and GitHub", short: "Git", usedIn: ["iot-device-monitor", "ai-log-analyzer", "resumeforge", "billing-engine"] },
      { name: "Docker (fundamentals)", short: "Docker", usedIn: ["iot-device-monitor"] },
      { name: "AWS (fundamentals)", short: "AWS", usedIn: [] },
    ],
    extra: ["Harbor", "Windows", "PowerShell", "VS Code", "VMware virtualization"],
  },
  {
    category: "Testing and quality",
    skills: [],
    extra: ["unittest", "GitHub Actions (CI)", "ruff", "mypy"],
  },
  {
    category: "AI evaluation",
    skills: [],
    extra: [
      "AI response evaluation",
      "Multimodal response comparison",
      "Evaluation rubric design",
      "Prompt design",
      "Pass@k testing",
      "Automated scoring",
      "Data validation",
      "Adversarial and edge-case testing",
      "Root-cause analysis",
    ],
  },
  {
    category: "IoT and embedded",
    skills: [
      { name: "ESP32", usedIn: [] },
      { name: "Arduino", usedIn: [] },
      { name: "Sensors", usedIn: [] },
    ],
  },
  {
    category: "Automation",
    skills: [{ name: "UiPath", usedIn: [] }],
  },
];

/** Skills currently being learned or practised, shown separately from the list above. */
export const practising: string[] = [
  "Automated testing",
  "Clean architecture",
  "CI/CD with GitHub Actions",
  "Next.js and TypeScript (this site)",
];
