import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { toPins } from "@/lib/skills";
import { SkillPinout } from "./SkillPinout";

/**
 * The page opens with the most characteristic object in the subject's world:
 * an IC pinout whose pins are the skills.
 * This is a server component. Only SkillPinout (selection state) is a client island.
 */
export function Hero() {
  const pins = toPins(skillGroups);
  const projectInfo = Object.fromEntries(projects.map((p) => [p.slug, { name: p.name, status: p.status }]));

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-6xl gap-12 px-6 pt-14 pb-20 lg:grid-cols-[1fr_28rem] lg:items-center lg:pt-24 lg:pb-28">
      <div>
        <h1 id="hero-title" className="display text-silk text-[clamp(4rem,13vw,7.5rem)]">
          Fahis
          <br />
          Jabbar
        </h1>
        <p className="text-gold mt-6 text-xl font-semibold">{profile.headline}</p>
        <p className="text-silk-dim mt-4 max-w-[34rem]">{profile.intro}</p>
        <p className="text-silk-dim mt-2">{profile.location}</p>

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
  );
}
