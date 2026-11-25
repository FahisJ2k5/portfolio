import { achievements, certifications, education } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Value } from "@/components/ui/Placeholder";

export function Education() {
  return (
    <Section id="education" title="Education and certifications">
      <div className="max-w-[44rem]">
        <h3 className="heading text-xl">Education</h3>
        <ul className="mt-4 space-y-5">
          {education.map((e, i) => (
            <li key={i}>
              <p className="text-lg font-semibold">{e.degree}</p>
              <p className="text-silk-dim">
                <Value>{e.institution}</Value>, <Value>{e.location}</Value>
              </p>
              <p className="text-silk-dim text-[0.95rem]">
                <Value>{e.period}</Value>
              </p>
            </li>
          ))}
        </ul>

        <h3 className="heading mt-10 text-xl">Certifications</h3>
        {certifications.length === 0 ? (
          // An honest empty state: no certifications are listed until one is earned.
          <p className="text-silk-dim mt-3">None listed yet. I add one here only after earning it.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-semibold">{c.name}</p>
                <p className="text-silk-dim text-[0.95rem]">
                  {c.issuer}, {c.year}
                </p>
              </li>
            ))}
          </ul>
        )}

        <h3 className="heading mt-10 text-xl">Achievements and leadership</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-gold">
          {achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
