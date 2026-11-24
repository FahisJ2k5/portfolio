/**
 * Placeholder handling.
 *
 * Any personal detail we don't have yet is written as `todo("description")`,
 * which produces a string starting with "TODO:". This gives us:
 *   - one greppable marker (`npm run placeholders` lists them all)
 *   - components can detect a placeholder and render it visibly
 *     instead of shipping a broken link or an invented fact.
 */
export const TODO_PREFIX = "TODO:";

export function todo(description: string): string {
  return `${TODO_PREFIX} ${description}`;
}

export function isTodo(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trimStart().startsWith(TODO_PREFIX);
}

/** Returns the value only if it is real (not a placeholder, not empty). */
export function real(value: string | null | undefined): string | null {
  if (value == null || value.trim() === "" || isTodo(value)) return null;
  return value;
}
