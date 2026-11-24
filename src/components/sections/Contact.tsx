import { profile } from "@/content/profile";
import { real } from "@/lib/placeholder";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Section";
import { Value } from "@/components/ui/Placeholder";

/**
 * Contact is plain links, with no form. A form needs a server, a mail provider
 * secret and spam protection, which adds risk without helping the reader.
 */
export function Contact() {
  const email = real(profile.links.email);
  const linkedin = real(profile.links.linkedin);
  const github = real(profile.links.githubUsername);

  return (
    <Section id="contact" title="Contact">
      <div className="max-w-[40rem]">
        <p>
          I&apos;m open to software engineer, backend developer and AI engineer roles. Email is the quickest way
          to reach me.
        </p>

        <dl className="border-trace mt-8 grid grid-cols-[6rem_1fr] items-center gap-x-6 gap-y-4 border-t pt-6">
          <dt className="text-silk-dim">Email</dt>
          <dd className="flex flex-wrap items-center gap-3">
            {email ? (
              <>
                <a href={`mailto:${email}`} className="text-gold underline underline-offset-4">
                  {email}
                </a>
                <CopyButton text={email} label="Copy email" />
              </>
            ) : (
              <Value>{profile.links.email}</Value>
            )}
          </dd>

          <dt className="text-silk-dim">LinkedIn</dt>
          <dd>
            {linkedin ? (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
                {linkedin}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Value>{profile.links.linkedin}</Value>
            )}
          </dd>

          <dt className="text-silk-dim">GitHub</dt>
          <dd>
            {github ? (
              <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">
                github.com/{github}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Value>{profile.links.githubUsername}</Value>
            )}
          </dd>
        </dl>
      </div>
    </Section>
  );
}
