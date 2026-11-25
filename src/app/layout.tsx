import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Dock } from "@/components/layout/Dock";
import { Footer } from "@/components/layout/Footer";
import { Rail } from "@/components/layout/Rail";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

// Archivo is a variable font with a width axis, which the headings use.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "Fahis Jabbar is a software engineer based in Bangalore, working in Python on backend and AI projects. B.Sc. Internet of Things.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name}: ${profile.headline}`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    title: `${profile.name}: ${profile.headline}`,
    description,
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1b26",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a
          href="#main"
          className="bg-gold text-mask sr-only z-[60] px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Rail />
        {/* On wide screens the rail occupies the left edge; the page is shifted right to make room. */}
        <div className="lg:pl-20">
          <main id="main">{children}</main>
          <Footer />
        </div>
        {/* Extra room at the bottom so the floating dock never covers the last lines on a phone. */}
        <div aria-hidden className="h-20 lg:hidden" />
        <Dock />
      </body>
    </html>
  );
}
