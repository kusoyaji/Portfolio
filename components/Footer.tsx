import Link from 'next/link';
import { profile } from '@/content/profile';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-10 border-t border-rule-invert pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
              {profile.location} · {profile.timezone}
            </p>
            <p className="display mt-3 text-4xl text-paper lg:text-5xl">
              Open to new opportunities.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="ink-link text-sm text-paper/80">
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-sm text-paper/80"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-sm text-paper/80"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-[11px] text-paper/55 md:flex-row md:justify-between">
          <p className="font-mono uppercase tracking-[0.14em]">
            © {year} {profile.name}
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            <Link href="/#work" className="ink-link">
              Back to work
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
