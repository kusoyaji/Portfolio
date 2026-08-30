import { clientSites } from '@/content/projects';
import { ClientShot } from '@/components/ClientShot';
import { Reveal, Words } from '@/components/motion/Reveal';

export function Showcase() {
  return (
    <section id="showcase" className="bg-paper-deep px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <Reveal>
          <p className="eyebrow">
            <span className="text-amber">03</span> — Live
          </p>
        </Reveal>
          <Words className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)]" parts={[{ t: 'Shipped and' }, { t: 'live.', accent: true }]} />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {clientSites.map((site, i) => (
            <div
              key={site.slug}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              <div className={i % 2 === 1 ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}>
                <ClientShot site={site} priority={i === 0} />
              </div>

              <Reveal className={i % 2 === 1 ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}>
                <h3 className="display text-[clamp(1.9rem,3.4vw,2.9rem)]">{site.name}</h3>
                <p className="mt-4 max-w-[42ch] leading-relaxed text-ink-soft">
                  {site.descriptor}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-rule px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link mt-6 inline-block font-mono text-xs uppercase tracking-[0.14em]"
                >
                  Visit site ↗
                </a>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
