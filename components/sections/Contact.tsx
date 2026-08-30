import { profile } from '@/content/profile';
import { Reveal, Words } from '@/components/motion/Reveal';

export function Contact() {
  return (
    <section id="contact" className="bg-paper-deep px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <Reveal>
          <p className="eyebrow">
            <span className="text-amber">07</span> — Contact
          </p>

          <Words className="display mt-6 max-w-[16ch] text-[clamp(3rem,8vw,7rem)]" parts={[{ t: 'Available for new' }, { t: 'roles', accent: true }, { t: 'and projects.' }]} />

          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
            Open to remote positions with EU or US overlap, and to relocation. For hiring
            enquiries, please include the scope of the system and the timeline.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-85 active:scale-[0.97] active:duration-[120ms]"
            >
              {profile.email}
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="ink-link font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
            >
              {profile.phone}
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
            >
              LinkedIn ↗
            </a>

            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
            >
              GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
