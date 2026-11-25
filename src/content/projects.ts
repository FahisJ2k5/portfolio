import type { Project } from "../lib/types.ts";
import { todo } from "../lib/placeholder.ts";

/**
 * Each project says what it DOES (if built) or is DESIGNED to do (if planned).
 * `status` is the truth about how far it has got:
 *   - "complete": the code is pushed, its tests pass, and GitHub's checks are green.
 *   - "planned": nothing has been written yet.
 * `verification` lists only checks that were really run. `notYetVerified` is just as important:
 * it names what exists in the code but has not been tested for real.
 * No usage numbers, performance figures or user counts appear anywhere.
 */
export const projects: Project[] = [
  {
    slug: "billing-engine",
    name: "Utility Billing Engine",
    repoName: "billing-engine",
    tagline: "Turns meter readings and mid-cycle events into an itemised bill, using exact decimal arithmetic.",
    problem:
      "A bill is more than usage times rate. Meters get replaced mid-cycle, counters roll over, tariffs change, " +
      "and fixed charges must be prorated by day. Rounding mistakes change what customers pay.",
    features: [
      "JSON input and JSON invoice output, with one line item per tier and charge as an audit trail",
      "Billing period split at every meter replacement and every tariff change",
      "Meter register rollover, tiered energy rates scaled for part-period segments, and daily fixed charges prorated by day",
      "Credits and fees marked taxable or not, plus a tax rate",
      "Strict validation: unknown fields, wrong types and JSON floats are rejected with an error code that names the field",
      "Five sample datasets, each with an invoice worked out by hand",
    ],
    stack: [
      { name: "Python 3.10+, standard library only", reason: "No dependencies to install or trust." },
      { name: "decimal.Decimal", reason: "Floats cannot represent money exactly; 0.1 + 0.2 is not 0.3." },
      { name: "Frozen dataclasses", reason: "Immutable data, so each calculation stage is easy to test alone." },
      { name: "unittest, ruff and mypy", reason: "Tests run anywhere; lint and strict type checks run in CI." },
    ],
    flow: ["input.json", "Validation", "Split into segments", "Price each segment", "Adjust, tax and round", "invoice.json"],
    decisions: [
      {
        title: "One rounding policy, in one place",
        detail: "Each money line is rounded once to cents. Nothing else rounds, so a bill can be reproduced by hand.",
      },
      {
        title: "Even use within each meter's time in service",
        detail:
          "With only start and end readings, the engine cannot know which days energy was used, so it spreads usage evenly. The README states this limit.",
      },
      {
        title: "Synthetic data only",
        detail: "Every tariff, reading and customer in the repository is invented for the examples.",
      },
    ],
    verification: [
      "83 unit tests pass on Python 3.10 and 3.14.",
      "ruff, ruff format and strict mypy are clean.",
      "GitHub Actions passes on Python 3.10, 3.11 and 3.12.",
      "Six deliberate bugs were introduced one at a time, and the tests caught all six.",
    ],
    notYetVerified: [
      "It has not been compared with a real utility's billing system. The sample data is invented.",
    ],
    status: "complete",
    repoUrl: "https://github.com/FahisJ2k5/billing-engine",
  },
  {
    slug: "ai-log-analyzer",
    name: "AI-Powered Log Analyzer",
    repoName: "ai-log-analyzer",
    tagline: "A command-line tool that reads mixed-format logs, groups and classifies errors, and can explain an error group with an LLM.",
    problem:
      "When something breaks, engineers scroll through thousands of log lines in different formats, and the same failure " +
      "repeats with different ids and numbers. This tool turns logs into one structure, collapses repeats into groups, " +
      "and explains a group on request.",
    features: [
      "Four log formats: Python logging text, JSON lines, syslog and web-server access logs",
      "Stack traces stay attached to the line that caused them",
      "Repeated errors collapse into groups by masking ids, addresses, numbers and paths",
      "Rule-based classification: timeout, database, network, authentication, out of memory, disk and more",
      "Full-text search combined with filters for level, source, category and time range",
      "Optional AI explanations through Anthropic Claude, with credentials, tokens, emails and IP addresses masked first",
      "API key read only from the environment; the tool works without one",
    ],
    stack: [
      { name: "Python 3.10+, standard library only", reason: "No SDK or dependency to trust. The model call is one HTTPS request." },
      { name: "SQLite with FTS5", reason: "Full-text search and indexes with no server to run." },
      { name: "Anthropic API behind a provider interface", reason: "A fake provider keeps tests offline and a second provider can be added." },
      { name: "unittest, ruff and mypy", reason: "Tests need no network and no key." },
    ],
    flow: ["Raw log lines", "Parse", "Group and classify", "SQLite search", "Redact", "Explain with an LLM"],
    decisions: [
      {
        title: "Rules first, AI second",
        detail: "Parsing, grouping, classification and search are deterministic and tested. The model only explains.",
      },
      {
        title: "Redact, then truncate",
        detail: "Cutting first could split a secret in half and send part of it, so masking always runs before the size limit.",
      },
      {
        title: "The model name is not built in",
        detail: "Model names change. ANTHROPIC_MODEL must be set, and a missing value is a clear error.",
      },
    ],
    verification: [
      "128 unit tests pass on Python 3.10 and 3.14.",
      "ruff, ruff format and strict mypy are clean.",
      "GitHub Actions passes on Python 3.10, 3.11 and 3.12.",
      "Ten deliberate bugs were introduced one at a time, and the tests caught all ten.",
    ],
    notYetVerified: [
      "No real call to the Anthropic API has been made. The request is tested against a fake transport only.",
      "It is a command-line tool. There is no web API or web interface yet.",
    ],
    status: "complete",
    repoUrl: "https://github.com/FahisJ2k5/ai-log-analyzer",
  },
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
    verification: [],
    notYetVerified: ["Nothing has been written yet. This describes the design."],
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
      "A clear note that the analysis is a heuristic checklist, not a copy of any vendor's system",
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
    verification: [],
    notYetVerified: ["Nothing has been written yet. This describes the design."],
    status: "planned",
    repoUrl: todo("repository URL, once pushed"),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
