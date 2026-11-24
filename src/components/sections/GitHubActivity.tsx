import { ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Value } from "@/components/ui/Placeholder";
import { fetchPublicRepos } from "@/lib/github";
import { real } from "@/lib/placeholder";

const failureMessage = {
  "invalid-username": "The GitHub username isn't set yet.",
  "not-found": "No GitHub account was found for that username.",
  "rate-limited": "GitHub's rate limit was reached. Repositories will show again on the next refresh.",
  unavailable: "GitHub couldn't be reached. Repositories will show again on the next refresh.",
} as const;

/**
 * Server component: fetched at build time, then refreshed at most hourly.
 * If GitHub fails, the section shows a message and the planned repositories
 * from content/projects.ts. The page never breaks.
 */
export async function GitHubActivity() {
  const username = real(profile.links.githubUsername);
  const result = username
    ? await fetchPublicRepos(username, { token: process.env.GITHUB_TOKEN })
    : ({ ok: false, reason: "invalid-username" } as const);

  return (
    <Section id="github" title="GitHub">
      <div className="max-w-[44rem]">
        {username ? (
          <a
            href={`https://github.com/${username}`}
            className="text-gold inline-flex items-center gap-2 underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{username}
            <ExternalLink aria-hidden size={16} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <p>
            Profile: <Value>{profile.links.githubUsername}</Value>
          </p>
        )}

        {result.ok ? (
          result.repos.length > 0 ? (
            <ul className="border-trace mt-8 border-t">
              {result.repos.map((repo) => (
                <li key={repo.name} className="border-trace border-b">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-mask-raised -mx-3 block px-3 py-4 transition-colors"
                  >
                    <span className="font-semibold">{repo.name}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                    {repo.description && <span className="text-silk-dim block">{repo.description}</span>}
                    {repo.language && <span className="text-silk-dim block text-sm">{repo.language}</span>}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-silk-dim mt-6">No public repositories yet.</p>
          )
        ) : (
          <div className="mt-6">
            <p className="text-silk-dim">{failureMessage[result.reason]}</p>
            <p className="mt-6 font-semibold">Repositories planned for this profile</p>
            <ul className="mt-2 list-disc pl-5 marker:text-gold">
              {projects.map((p) => (
                <li key={p.slug}>{p.repoName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
