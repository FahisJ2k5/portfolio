import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

/**
 * A datasheet page: the title sits on a narrow left rail (sticky on wide
 * screens) and the content runs in a readable column beside it.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-trace mx-auto grid max-w-6xl gap-6 border-t px-6 py-16 md:grid-cols-[11rem_1fr] md:gap-12 md:py-24"
    >
      <h2
        id={`${id}-title`}
        className="heading text-silk self-start text-3xl md:sticky md:top-24 md:text-[2rem]"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
