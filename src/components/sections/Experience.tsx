import { experience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Value } from "@/components/ui/Placeholder";

/** Ordered list: entries are in sequence (newest first), so list semantics are correct here. */
export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="max-w-[44rem] space-y-10">
        {experience.map((item, index) => (
          <li key={index}>
            <h3 className="heading text-2xl">{item.role}</h3>
            <p className="text-silk-dim mt-1">
              <Value>{item.organisation}</Value>, <Value>{item.location}</Value>
            </p>
            <p className="text-silk-dim text-[0.95rem]">
              <Value>{item.period}</Value>
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-gold">
              {item.highlights.map((h, i) => (
                <li key={i}>
                  <Value>{h}</Value>
                </li>
              ))}
            </ul>
            <p className="text-silk-dim mt-4 text-[0.95rem]">
              Tools: {item.tools.map((t, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  <Value>{t}</Value>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
