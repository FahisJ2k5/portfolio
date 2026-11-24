import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="display text-silk text-[clamp(3rem,10vw,6rem)]">Page not found</h1>
      <p className="text-silk-dim mt-5 max-w-[34rem]">
        There is no page at this address. It may have moved, or the link may be mistyped.
      </p>
      <Link href="/" className="bg-gold text-mask hover:bg-silk mt-8 inline-block rounded-sm px-5 py-2.5 font-semibold transition-colors">
        Go to the home page
      </Link>
    </div>
  );
}
