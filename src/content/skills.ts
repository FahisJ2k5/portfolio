import type { SkillGroup } from "../lib/types.ts";

/**
 * Skills exactly as Fahis listed them. No proficiency levels are shown, because none
 * were provided and a self-rating bar would be invented data.
 *
 * - `usedIn` points at projects on this site (see projects.ts for each one's status).
 * - `evidence` holds short true statements taken from his resume. A skill with neither
 *   shows an honest "on my skills list" line instead of an empty card.
 * - `extra` skills appear in the table only. Only `skills` become pins on the hero chip.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      {
        name: "Python",
        usedIn: ["iot-device-monitor", "ai-log-analyzer", "resumeforge", "billing-engine"],
        evidence: [
          "Scripts for data validation and automated scoring in my Handshake AI work.",
          "Python machine learning analysis in the Smart Agriculture and Livestock Management System.",
        ],
      },
      {
        name: "C",
        usedIn: [],
        evidence: ["Listed on my resume, with C++ and Embedded C."],
      },
      {
        name: "Embedded C",
        short: "Emb. C",
        usedIn: [],
        evidence: ["Listed on my resume. My internship and projects used ESP32 and Arduino boards."],
      },
      { name: "SQL", usedIn: ["iot-device-monitor", "ai-log-analyzer"] },
    ],
    extra: ["C++", "JavaScript"],
  },
  {
    category: "Backend and data",
    skills: [
      {
        name: "REST APIs and HTTP",
        short: "REST",
        usedIn: ["iot-device-monitor", "ai-log-analyzer"], // log analyzer: one outbound HTTPS call to the model API
      },
      { name: "MySQL", usedIn: [] },
    ],
    extra: ["HTML", "CSS", "SQLite with full-text search"],
  },
  {
    category: "Tools and platforms",
    skills: [
      {
        name: "Linux and Unix",
        short: "Linux",
        usedIn: [],
        evidence: [
          "Used with Git, GitHub and PowerShell to track issues in my Handshake AI work.",
          "Certificate: Complete UNIX & Linux OS Fundamentals Training, Infosys Springboard (Jul 2025).",
        ],
      },
      {
        name: "Git and GitHub",
        short: "Git",
        usedIn: ["ai-log-analyzer", "billing-engine"],
        evidence: ["Used to track issues and reviewer feedback in my Handshake AI work."],
      },
      {
        name: "Docker (fundamentals)",
        short: "Docker",
        usedIn: ["iot-device-monitor"],
        evidence: ["Diagnosed failures in Docker-based benchmark environments at Handshake AI."],
      },
      {
        name: "AWS (fundamentals)",
        short: "AWS",
        usedIn: [],
        evidence: ["AWS Cloud Fundamentals and Security, listed on my resume."],
      },
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
      {
        name: "ESP32",
        usedIn: [],
        evidence: ["Developed and tested ESP32 and Arduino IoT solutions at SMEC Technologies (Jun to Jul 2025)."],
      },
      {
        name: "Arduino",
        usedIn: [],
        evidence: ["Used in my SMEC Technologies internship. Arduino IDE is also listed on my resume."],
      },
      {
        name: "Sensors",
        usedIn: [],
        evidence: ["DHT22 and MQ135 sensors in the Smart Agriculture and Livestock Management System."],
      },
    ],
  },
  {
    category: "Automation",
    skills: [
      {
        name: "UiPath",
        usedIn: [],
        evidence: ["UiPath Studio, listed under tools on my resume."],
      },
    ],
  },
];

/** Skills currently being learned or practised, shown separately from the list above. */
export const practising: string[] = [
  "Automated testing",
  "Clean architecture",
  "CI/CD with GitHub Actions",
  "Next.js and TypeScript (this site)",
];
