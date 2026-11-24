# Phase 2 report: portfolio website

## Verification status (read this first)

| Check | Status |
|---|---|
| Pure TypeScript logic (placeholders, GitHub parsing and fetch fallbacks, pinout split, content integrity) | **Run and passed** in Node 22. The smoke script printed `SMOKE OK: 14 pins, 4 projects`. |
| `npm run placeholders` | **Run.** Lists 18 placeholders still to fill in. |
| `npm install`, `npm run lint`, `npm run typecheck`, `npm test` (Vitest), `npm run build` | **Not run.** The sandbox blocks the npm registry. |
| Visual review (mobile and desktop), keyboard use, the mobile menu, the pinout animation | **Not done.** The site hasn't been rendered anywhere yet. |

Please run this on your machine and paste me the output:

```
cd portfolio
npm install
npm run check
npm run dev      # then open http://localhost:3000
```

`npm run check` runs lint, typecheck, tests and a production build. Expect something to need fixing. This is a lot of code that has never been compiled, and I'd rather find the errors together than claim it's clean.

## What was built

- **Hero** with a skills pinout: a chip whose 14 pins are your skills. Click a pin to see which projects are planned to use it. Pins light up in sequence on load, and that is the only automatic motion on the page.
- **Sections:** About, Skills (a table, with no self-rated bars), Projects (rows linking to full case-study pages), Experience, Education and certifications, GitHub, Resume, Contact.
- **Mobile navigation** (button, Escape to close, links not focusable while closed) and an active-section highlight on desktop.
- **Honest states:** missing details show as dashed gold `TODO:` text. The resume button is disabled until a PDF exists. Certifications say "None listed yet". All four projects are labelled **Planned**, and a test fails if anyone sets one to "complete" without changing it on purpose.
- **Supporting files:** a CI workflow, security headers, a sitemap and `robots.txt`, a 404 page, and `DESIGN.md` explaining the design choices.

## What I need from you to remove the placeholders

Run `npm run placeholders` to list them. They live in `src/content/profile.ts`, `experience.ts` and `projects.ts`. The most important are your email, GitHub username, LinkedIn URL and the internship details. I wrote "IoT intern" as the role because you said you had an IoT internship. Change it if the real title differs.

## Mentorship

**What it does and why these choices**
- **Next.js (App Router):** most sections are *Server Components*, so the browser receives ready-made HTML and very little JavaScript. Only three pieces need the browser: `Nav`, `SkillPinout` and `CopyButton`. These are called client islands.
- **Content separated from components:** every personal fact lives in `src/content/*.ts`, typed by `src/lib/types.ts`. A missing field fails the build instead of leaving a blank on the live site.
- **`todo()` placeholders:** one marker that components can detect (`isTodo`) and render visibly, rather than inventing text.
- **Tailwind with design tokens:** colours are defined once in `globals.css` (`@theme`) and used as classes such as `bg-mask` and `text-gold`.

**How the parts communicate**
`page.tsx` composes the sections on the server. Each section imports typed data from `content/`. `Hero` computes pin data on the server and passes it as props to the `SkillPinout` client island, which holds only the "selected pin" state. `GitHubActivity` calls `lib/github.ts` on the server and caches the result for an hour.

**Code worth understanding for interviews**
1. `src/lib/github.ts`: input validation, a result type that is never thrown, injected `fetch` for testing, and a fallback when the API fails.
2. `src/components/sections/SkillPinout.tsx`: client state, `aria-pressed` and `aria-live` for accessibility, and one source of truth for pin data.
3. `src/hooks/useActiveSection.ts`: `IntersectionObserver` and effect cleanup.
4. `src/app/projects/[slug]/page.tsx`: `generateStaticParams`, and why `params` is a Promise in Next.js 15.
5. `tests/lib.test.ts`: how injecting a fake `fetch` lets you test network code without a network.

**Questions to test yourself**
1. Why is `SkillPinout` a client component while `Hero` isn't? What would break if you removed `"use client"` from it?
2. `fetchPublicRepos` returns `{ ok: false, reason }` instead of throwing. What does the caller gain, and what does it lose?
3. Why does the username get validated with a regex before it goes into a URL? What could go wrong otherwise?
4. What does the `prefers-reduced-motion` rule protect, and who needs it?
5. Why is the "Used in" line changed to "Planned for" while projects are unfinished? Which rule from your brief does that serve?

## Known limits and next steps

- A Content-Security-Policy is deferred to Phase 7. Next.js inline scripts need nonces for a strict policy.
- No Open Graph image yet (planned for Phase 6).
- Fonts are loaded through `next/font/google`, which downloads Archivo at build time. This works on Vercel and on your machine, but not in a network-blocked build environment.
- `package.json` uses caret ranges, and I haven't been able to resolve exact versions. Your `npm install` will create the lockfile. Commit it.
