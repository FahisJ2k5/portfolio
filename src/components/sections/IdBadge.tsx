import Image from "next/image";

/**
 * A small framed portrait, styled like an ID badge on a circuit board: a thin frame with gold
 * alignment marks at the corners. It is sized to sit level with the name block beside it
 * (about the height of the name, role and location together), so the two read as one unit.
 * The photo has a soft blue-grey background so it sits comfortably on the dark page. The file is
 * a 480x600 WebP of about 30 KB, shown at a much smaller size so it stays sharp on high-density screens.
 */
export function IdBadge() {
  const mark = "border-gold absolute h-2.5 w-2.5";
  return (
    <div className="border-trace bg-mask-raised relative w-[4.75rem] shrink-0 border p-1 sm:w-24">
      <Image
        src="/images/fahis-jabbar.webp"
        alt="Portrait of Fahis Jabbar"
        width={480}
        height={600}
        priority
        sizes="(min-width: 640px) 96px, 76px"
        className="block h-auto w-full"
      />
      <span aria-hidden className={`${mark} -top-1 -left-1 border-t-2 border-l-2`} />
      <span aria-hidden className={`${mark} -top-1 -right-1 border-t-2 border-r-2`} />
      <span aria-hidden className={`${mark} -bottom-1 -left-1 border-b-2 border-l-2`} />
      <span aria-hidden className={`${mark} -right-1 -bottom-1 border-r-2 border-b-2`} />
    </div>
  );
}
