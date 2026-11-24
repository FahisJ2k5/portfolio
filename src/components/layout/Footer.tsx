import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-trace border-t">
      <div className="text-silk-dim mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-[0.95rem] sm:flex-row sm:justify-between">
        <p>
          {profile.name}, {profile.location}
        </p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
