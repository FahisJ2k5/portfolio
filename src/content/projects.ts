import type { Project } from "../lib/types.ts";
import { todo } from "../lib/placeholder.ts";

/**
 * Project descriptions say what each project is DESIGNED to do.
 * `status` is the truth about how far it has got. Nothing is marked
 * "complete" until the code exists and its tests have passed.
 * No usage numbers, performance figures or user counts appear anywhere.
 */
export const projects: Project[] = [
  {
    slug: "iot-device-monitor",
    name: "IoT Device Monitoring Platform",
    repoName: "iot-device-monitor",
    tagline: "A FastAPI service that registers devices, ingests sensor readings and reports which devices are online.",
    problem:
      "A group of ESP32-style devices sends sensor readings to a server. Operators need to know which devices " +
      "are alive, see recent and historical readings, and be sure that only registered devices can submit data.",
    features: [
      "Device registration, with a device key shown once and stored hashed",
      "Operator login using JWT bearer tokens",
      "Telemetry ingestion for single readings and batches, with per-metric validation",
      "Online and offline status calculated from the last time a device was seen",
      "Historical readings with time-range filters and hourly aggregates",
      "Consistent error responses, automated tests and Docker Compose",
    ],
    stack: [
      { name: "Python and FastAPI", reason: "Typed request validation and automatic API docs." },
      { name: "PostgreSQL", reason: "Time-ranged queries and constraints on relational data." },
      { name: "SQLAlchemy and Alembic", reason: "Explicit models and versioned schema migrations." },
      { name: "pytest and Docker Compose", reason: "Tests run against a real database." },
    ],
    flow: ["Device", "Key check", "Validation", "PostgreSQL", "History and status endpoints"],
    decisions: [
      {
        title: "Device status is calculated, not stored",
        detail: "Status comes from the last-seen time, so there is no background job and no stale flag to fix.",
      },
      {
        title: "Two kinds of credentials",
        detail: "People log in with JWTs. Machines use long random keys, stored as hashes like passwords.",
      },
    ],
    status: "planned",
    repoUrl: todo("repository URL, once pushed"),
  },
  {
    slug: "ai-log-analyzer",
    name: "AI-Powered Log Analyzer",
    repoName: "ai-log-analyzer",
    tagline: "Reads mixed-format logs, groups and classifies errors, and can explain an error group with an LLM.",
    problem:
      "When something breaks, engineers scroll through thousands of log lines in different formats. " +
      "This tool turns logs into one structure, groups repeated errors, and explains them on request.",
    features: [
      "Parsers for several log formats feeding one normalised entry type",
      "Error grouping by fingerprint and rule-based classification",
      "Full-text search and filters by level, source and time",
      "Optional AI explanations through Anthropic Claude, with sensitive values redacted first",
      "Runs fully without an API key; the key is read only from the environment",
      "Unit tests that never need the network",
    ],
    stack: [
      { name: "Python and FastAPI", reason: "REST API plus a small command-line interface." },
      { name: "SQLite with FTS5", reason: "Full-text search with no server to run." },
      { name: "Anthropic API", reason: "Plain-English explanations, behind a provider interface." },
      { name: "pytest", reason: "Fake providers keep tests offline and deterministic." },
    ],
    flow: ["Raw log lines", "Parser", "Fingerprint and classify", "SQLite search", "Redact then explain"],
    decisions: [
      {
        title: "Rules first, AI second",
        detail: "Parsing, grouping and classification are deterministic and testable. The LLM only explains.",
      },
      {
        title: "Redact before sending",
        detail: "Emails, IP addresses and token-like values are masked before any text leaves the machine.",
      },
    ],
    status: "planned",
    repoUrl: todo("repository URL, once pushed"),
  },
  {
    slug: "resumeforge",
    name: "ResumeForge",
    repoName: "resumeforge",
    tagline: "A command-line tool that builds a clean PDF resume from a YAML file and checks it against a job description.",
    problem:
      "Resume parsers can fail on multi-column layouts, and resumes often miss the terms a job asks for. " +
      "ResumeForge keeps the resume as structured data, renders a single-column PDF with real text, and reports on keyword and structure gaps.",
    features: [
      "YAML resume validated by typed models",
      "Single-column PDF with selectable text, built with ReportLab",
      "Analysis against a job description: keyword coverage, missing sections, weak bullet wording",
      "Terminal interface built with Typer and Rich",
      "Clear note that the analysis is a heuristic checklist, not a copy of any vendor's system",
    ],
    stack: [
      { name: "Typer and Rich", reason: "Readable commands and tables in the terminal." },
      { name: "ReportLab", reason: "Full control over PDF layout." },
      { name: "Pydantic", reason: "Validation errors that name the exact field." },
      { name: "pytest", reason: "Includes a test that extracts text from a generated PDF." },
    ],
    flow: ["resume.yaml", "Validation", "PDF renderer", "Analyzer", "Terminal report"],
    decisions: [
      {
        title: "Core logic has no terminal code",
        detail: "Models and services are separate from the CLI, so they can be tested without a terminal.",
      },
    ],
    status: "planned",
    repoUrl: todo("repository URL, once pushed"),
  },
  {
    slug: "billing-engine",
    name: "Utility Billing Engine",
    repoName: "billing-engine",
    tagline: "Turns meter readings and mid-cycle events into an itemised bill, using exact decimal arithmetic.",
    problem:
      "A bill is more than usage times rate. Meters get replaced mid-cycle, counters roll over, tariffs change, " +
      "and fixed charges must be prorated by day. Rounding mistakes change what customers pay.",
    features: [
      "JSON input and JSON invoice output with a line-by-line audit trail",
      "Billing period split at every meter or tariff event",
      "Proration of daily charges, tiered rates and adjustments",
      "Validation with typed exceptions and structured error output",
      "Sample datasets with hand-checked expected invoices",
      "Unit tests, plus property-based tests for invariants such as total consumption",
    ],
    stack: [
      { name: "Python Decimal", reason: "Floats cannot represent money exactly." },
      { name: "Pydantic", reason: "Strict input validation before any calculation." },
      { name: "pytest and Hypothesis", reason: "Example-based and property-based tests." },
    ],
    flow: ["input.json", "Validation", "Split into segments", "Price each segment", "Adjust and round", "invoice.json"],
    decisions: [
      {
        title: "Decimal everywhere, with one rounding policy",
        detail: "Rounding happens per line item in one place, so results can be reproduced by hand.",
      },
      {
        title: "Synthetic data only",
        detail: "All tariffs and readings in the repository are made up for the examples.",
      },
    ],
    status: "planned",
    repoUrl: todo("repository URL, once pushed"),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
