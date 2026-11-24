import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-[40rem] space-y-5">
        {profile.about.map((paragraph) => (
          <p key={paragraph} className="text-silk">
            {paragraph}
          </p>
        ))}
      </div>
      <dl className="border-trace mt-10 grid max-w-[40rem] grid-cols-[8rem_1fr] gap-x-6 gap-y-3 border-t pt-6 text-[0.95rem]">
        <dt className="text-silk-dim">Looking for</dt>
        <dd>{profile.targetRoles.join(", ")}</dd>
        <dt className="text-silk-dim">Based in</dt>
        <dd>{profile.location}</dd>
      </dl>
    </Section>
  );
}
