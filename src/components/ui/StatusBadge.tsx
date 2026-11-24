import type { ProjectStatus } from "@/lib/types";

const labels: Record<ProjectStatus, string> = {
  planned: "Planned",
  "in-progress": "In progress",
  complete: "Complete",
};

/** Shows how far a project has actually got. Colour is never the only signal: the label is always shown. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const tone = status === "complete" ? "border-gold text-gold" : "border-trace text-silk-dim";
  return <span className={`inline-block rounded-sm border px-2 py-0.5 text-sm ${tone}`}>{labels[status]}</span>;
}
