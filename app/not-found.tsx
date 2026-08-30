import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center px-6 pt-36 lg:px-12">
      <div className="mx-auto w-full max-w-[88rem]">
        <p className="eyebrow">
          <span className="text-amber">404</span> — Not found
        </p>
        <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)]">
          That page doesn’t exist.
        </h1>
        <Link
          href="/"
          className="ink-link mt-10 inline-block font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
