import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, clientSites } from '@/content/projects';
import { Diagram } from '@/components/diagrams/Diagrams';
import { ClientShot } from '@/components/ClientShot';
import { Reveal } from '@/components/motion/Reveal';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.lede,
    openGraph: { title: study.title, description: study.lede },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((item) => item.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article>
      <header className="bg-ink px-6 pb-20 pt-36 text-paper lg:px-12 lg:pb-28 lg:pt-48">
        <div className="mx-auto max-w-[88rem]">
          <p className="eyebrow text-paper/60">
            <span className="text-amber-lift">{study.index}</span> — {study.kicker}
          </p>

          <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.75rem,8vw,7rem)] text-paper">
            {study.title}
          </h1>

          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-paper/70 lg:text-xl">
            {study.lede}
          </p>

          <dl className="mt-14 grid gap-8 border-t border-rule-invert pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="eyebrow text-paper/55">Role</dt>
              <dd className="mt-2 text-sm text-paper/85">{study.role}</dd>
            </div>
            <div>
              <dt className="eyebrow text-paper/55">Period</dt>
              <dd className="mt-2 text-sm text-paper/85">{study.period}</dd>
            </div>
            {study.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <dt className="eyebrow text-paper/55">{metric.label}</dt>
                <dd className="display mt-1 text-3xl text-paper">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[88rem]">
          {study.sections.map((section, i) => (
            <section key={section.heading} className="mb-4">
              <Reveal>
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <h2 className="display sticky top-28 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.05]">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="space-y-5 lg:col-span-8">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="max-w-[62ch] text-[1.05rem] leading-[1.75] text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {section.diagram && <Diagram kind={section.diagram} />}

              {section.pull && (
                <blockquote className="my-16 border-y border-rule py-14 lg:my-24 lg:py-20">
                  <Reveal>
                    <p className="display mx-auto max-w-[22ch] text-center text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.1]">
                      “{section.pull}”
                    </p>
                  </Reveal>
                </blockquote>
              )}

              {!section.pull && !section.diagram && i < study.sections.length - 1 && (
                <div className="my-14 lg:my-20" />
              )}
            </section>
          ))}

          {slug === 'client-experiences' && (
            <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-10">
              {clientSites.map((site) => (
                <div key={site.slug}>
                  <ClientShot site={site} />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                    {site.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-20 border-t border-rule pt-8 lg:mt-28">
            <h2 className="eyebrow">Built with</h2>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
              {study.stack.map((tech) => (
                <li key={tech} className="font-mono text-[11px] text-ink-faint">
                  {tech}
                </li>
              ))}
            </ul>

            {study.links && (
              <ul className="mt-8 flex flex-wrap gap-6">
                {study.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-link font-mono text-xs uppercase tracking-[0.14em]"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <nav aria-label="More work" className="bg-paper-deep px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[88rem]">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="eyebrow">Next</p>
            <p className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] transition-colors duration-200 group-hover:text-amber">
              {next.title}
            </p>
          </Link>
          <Link
            href="/#work"
            className="ink-link mt-10 inline-block font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
          >
            ← All work
          </Link>
        </div>
      </nav>
    </article>
  );
}
