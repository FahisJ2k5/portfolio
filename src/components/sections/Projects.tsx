import Link from "next/link";
import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** A list of rows, not a grid of identical cards. Each row links to a full case study. */
export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="border-trace max-w-[46rem] border-t">
        {projects.map((project) => (
          <li key={project.slug} className="border-trace border-b">
            <Link
              href={`/projects/${project.slug}`}
              className="group hover:bg-mask-raised -mx-3 block px-3 py-6 transition-colors"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="heading group-hover:text-gold text-2xl transition-colors">{project.name}</h3>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-silk mt-2">{project.tagline}</p>
              <p className="text-silk-dim mt-3 text-[0.95rem]">
                {project.stack.map((s) => s.name).join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
