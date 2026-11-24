import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Value } from "@/components/ui/Placeholder";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProject, projects } from "@/content/projects";
import { real } from "@/lib/placeholder";

// Next.js 15 passes route params as a Promise.
type Props = { params: Promise<{ slug: string }> };

// Pre-render one static page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.tagline };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const repoUrl = real(project.repoUrl);

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <Link href="/#projects" className="text-silk-dim hover:text-gold inline-flex items-center gap-2 transition-colors">
        <ArrowLeft aria-hidden size={16} />
        All projects
      </Link>

      <header className="mt-8 max-w-[46rem]">
        <h1 className="display text-silk text-[clamp(2.75rem,8vw,5rem)]">{project.name}</h1>
        <p className="text-silk mt-5 text-xl">{project.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <StatusBadge status={project.status} />
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold inline-flex items-center gap-2 underline underline-offset-4"
            >
              View repository
              <ExternalLink aria-hidden size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-silk-dim text-[0.95rem]">
              Repository: <Value>{project.repoUrl}</Value>
            </span>
          )}
        </div>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[11rem_1fr] md:gap-12">
        <h2 className="heading text-2xl md:text-[1.6rem]">The problem</h2>
        <p className="max-w-[40rem]">{project.problem}</p>

        <h2 className="heading text-2xl md:text-[1.6rem]">How data moves</h2>
        <ol className="border-trace max-w-[40rem] border-l">
          {project.flow.map((step, i) => (
            <li key={step} className="relative py-2 pl-6">
              <span aria-hidden className="bg-gold absolute top-[1.1rem] -left-[5px] h-[9px] w-[9px] rounded-full" />
              <span className="sr-only">Step {i + 1}: </span>
              {step}
            </li>
          ))}
        </ol>

        <h2 className="heading text-2xl md:text-[1.6rem]">Designed features</h2>
        <ul className="max-w-[40rem] list-disc space-y-2 pl-5 marker:text-gold">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2 className="heading text-2xl md:text-[1.6rem]">Stack</h2>
        <dl className="border-trace max-w-[40rem] border-t">
          {project.stack.map((s) => (
            <div key={s.name} className="border-trace grid gap-1 border-b py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-semibold">{s.name}</dt>
              <dd className="text-silk-dim">{s.reason}</dd>
            </div>
          ))}
        </dl>

        <h2 className="heading text-2xl md:text-[1.6rem]">Design decisions</h2>
        <div className="max-w-[40rem] space-y-6">
          {project.decisions.map((d) => (
            <div key={d.title}>
              <h3 className="text-lg font-semibold">{d.title}</h3>
              <p className="text-silk-dim mt-1">{d.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
