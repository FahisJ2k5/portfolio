import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { heroFacts } from "@/lib/facts";
import { toPins } from "@/lib/skills";
import { IdBadge } from "./IdBadge";
import { SkillPinout } from "./SkillPinout";

/**
 * The page opens with the most characteristic object in the subject's world: an IC pinout whose
 * pins are the skills, with the person it belongs to beside their name.
 * This is a server component. Only SkillPinout (selection state) is a client island.
 */
export function Hero() {
  const pins = toPins(skillGroups);
  const projectInfo = Object.fromEntries(projects.map((p) => [p.slug, { name: p.name, status: p.status }]));
  const facts = heroFacts(profile, education, experience, projects);

  return (
    <div className="hero-backdrop">
      <section
        aria-labelledby="hero-title"
        className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 pb-20 lg:grid-cols-[1fr_28rem] lg:items-center lg:pt-20 lg:pb-28"
      >
        <div>
          <p className="border-trace text-silk-dim inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <span aria-hidden className="status-dot bg-gold h-2 w-2 rounded-full" />
            Open to roles
          </p>

          {/* Photo and name block share one row and the same height, so they read as one unit. */}
          <div className="mt-5 flex items-center gap-5 sm:gap-6">
            <IdBadge />
            <div className="min-w-0">
              <h1 id="hero-title" className="display text-silk text-[clamp(2rem,5vw,3.25rem)]">
                Fahis Jabbar
              </h1>
              <p className="text-gold mt-2 text-lg font-semibold sm:text-xl">{profile.headline}</p>
              <p className="text-silk-dim mt-1 text-[0.95rem]">{profile.location}</p>
            </div>
          </div>

          <p className="text-silk mt-7 max-w-[34rem]">{profile.intro}</p>

          <dl className="border-trace mt-7 max-w-[34rem] border-t">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="border-trace grid grid-cols-[5.5rem_1fr] gap-x-4 border-b py-2.5 text-[0.95rem]"
              >
                <dt className="text-silk-dim">{fact.label}</dt>
                <dd className="text-silk">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="bg-gold text-mask hover:bg-silk rounded-sm px-5 py-2.5 font-semibold transition-colors"
            >
              See projects
            </a>
            <a
              href="#contact"
              className="border-trace text-silk hover:border-gold hover:text-gold rounded-sm border px-5 py-2.5 font-semibold transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <SkillPinout pins={pins} projectInfo={projectInfo} />
      </section>
    </div>
  );
}
