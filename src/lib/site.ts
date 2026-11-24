/** Public site URL, from the environment. Falls back to localhost for development. */
export const siteUrl: string = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
