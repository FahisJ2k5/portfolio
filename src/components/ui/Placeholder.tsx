import { isTodo } from "@/lib/placeholder";

/**
 * Renders a value. If it is still a todo() placeholder, it is shown with a
 * dashed gold outline so it can't be mistaken for real content.
 */
export function Value({ children }: { children: string }) {
  if (isTodo(children)) {
    return (
      <span className="placeholder" title="Placeholder: replace in src/content">
        {children}
      </span>
    );
  }
  return <>{children}</>;
}
