/**
 * Fetches public repository metadata from the GitHub REST API.
 *
 * Design rules:
 *  - Public data only. The optional token has no scopes and is read on the
 *    server, so it is never exposed to the browser.
 *  - Never throws. Callers get a result object and render a fallback,
 *    so a GitHub outage or rate limit can't break the page.
 *  - The username is validated before it goes into a URL.
 */

export interface RepoSummary {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  /** ISO timestamp of the last push. */
  pushedAt: string;
}

export type RepoFailure = "invalid-username" | "not-found" | "rate-limited" | "unavailable";

export type RepoResult = { ok: true; repos: RepoSummary[] } | { ok: false; reason: RepoFailure };

/** GitHub's rules: 1-39 characters, alphanumeric or single hyphens, no leading or trailing hyphen. */
const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function isValidGithubUsername(value: string): boolean {
  return USERNAME_PATTERN.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Converts the raw API payload into RepoSummary objects, skipping forks and malformed items. */
export function parseRepos(payload: unknown): RepoSummary[] {
  if (!Array.isArray(payload)) return [];

  const repos: RepoSummary[] = [];
  for (const item of payload) {
    if (!isRecord(item)) continue;
    const { name, html_url, description, language, stargazers_count, pushed_at, fork } = item;
    if (typeof name !== "string" || typeof html_url !== "string") continue;
    if (fork === true) continue;
    repos.push({
      name,
      url: html_url,
      description: typeof description === "string" ? description : null,
      language: typeof language === "string" ? language : null,
      stars: typeof stargazers_count === "number" ? stargazers_count : 0,
      pushedAt: typeof pushed_at === "string" ? pushed_at : "",
    });
  }
  return repos.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

interface FetchOptions {
  token?: string;
  limit?: number;
  /** Injected in tests. Defaults to the global fetch. */
  fetchImpl?: typeof fetch;
}

export async function fetchPublicRepos(
  username: string,
  { token, limit = 6, fetchImpl = fetch }: FetchOptions = {},
): Promise<RepoResult> {
  if (!isValidGithubUsername(username)) return { ok: false, reason: "invalid-username" };

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=pushed`;

  try {
    // `next.revalidate` lets Next.js cache the response and refresh it hourly.
    const response = await fetchImpl(url, { headers, next: { revalidate: 3600 } });
    if (response.status === 404) return { ok: false, reason: "not-found" };
    if (response.status === 403 || response.status === 429) return { ok: false, reason: "rate-limited" };
    if (!response.ok) return { ok: false, reason: "unavailable" };
    return { ok: true, repos: parseRepos(await response.json()).slice(0, limit) };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
