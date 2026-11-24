import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";

/** Never renders a dead link: until the PDF exists the button is disabled and says why. */
export function Resume() {
  const { available, href } = profile.resume;
  return (
    <Section id="resume" title="Resume">
      <div className="max-w-[40rem]">
        {available ? (
          <>
            <p>My current resume as a PDF.</p>
            <a
              href={href}
              download
              className="bg-gold text-mask hover:bg-silk mt-5 inline-flex items-center gap-2 rounded-sm px-5 py-2.5 font-semibold transition-colors"
            >
              <Download aria-hidden size={18} />
              Download resume
            </a>
          </>
        ) : (
          <>
            <p className="text-silk-dim">The resume isn&apos;t uploaded yet.</p>
            <button
              type="button"
              disabled
              className="border-trace text-silk-dim mt-5 inline-flex cursor-not-allowed items-center gap-2 rounded-sm border px-5 py-2.5 font-semibold"
            >
              <Download aria-hidden size={18} />
              Download resume
            </button>
            <p className="placeholder mt-4 inline-block text-sm">
              TODO: add the PDF at public{href} and set resume.available to true in src/content/profile.ts
            </p>
          </>
        )}
      </div>
    </Section>
  );
}
