import { practising, skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/Section";

/** Rendered as a characteristics table, like a datasheet. There are no self-rated progress bars. */
export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <table className="w-full max-w-[44rem] border-collapse text-left">
        <caption className="sr-only">Technical skills grouped by category</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Skills</th>
          </tr>
        </thead>
        <tbody>
          {skillGroups.map((group) => (
            <tr key={group.category} className="border-trace border-b first:border-t">
              <th scope="row" className="text-silk-dim w-40 py-4 pr-4 align-top text-[0.95rem] font-normal">
                {group.category}
              </th>
              <td className="py-4">
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 max-w-[44rem]">
        <h3 className="heading text-xl">Currently practising</h3>
        <ul className="text-silk-dim mt-3 flex flex-wrap gap-x-5 gap-y-1">
          {practising.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
