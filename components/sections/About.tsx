import { bio, certifications, education, languages } from '@/content/profile';
import { Reveal, Words } from '@/components/motion/Reveal';
import { ReadAlong } from '@/components/motion/ReadAlong';

export function About() {
  return (
    <section id="about" className="px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Eyebrow and heading share one grid column. The heading must not be
              a bare grid child or it collapses into a single 12th of the row. */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">
                <span className="text-amber">07</span> — Background
              </p>
            </Reveal>
            <Words
              className="display mt-5 text-[clamp(2.5rem,5vw,4rem)] leading-[1.02]"
              parts={[{ t: 'Engineer, Rabat.' }]}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.75] text-ink-soft">
              {bio.map((para) => (
                <ReadAlong key={para.slice(0, 24)} text={para} />
              ))}
            </div>
          </div>
        </div>

        <Reveal>
          <div className="mt-16 grid gap-10 border-t border-rule pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            <div>
              <h3 className="eyebrow">Education</h3>
              <ul className="mt-5 space-y-4">
                {education.map((item) => (
                  <li key={item.school}>
                    <p className="text-sm text-ink">{item.credential}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{item.school}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-ink-faint">
                      {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Certifications</h3>
              <ul className="mt-5 space-y-2.5">
                {certifications.map((cert) => (
                  <li
                    key={cert.name}
                    className={cert.flagship ? 'text-sm text-ink' : 'text-sm text-ink-soft'}
                  >
                    {cert.name}
                    {cert.code && (
                      <span className="ml-1.5 font-mono text-[11px] text-ink-faint">
                        {cert.code}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Languages</h3>
              <ul className="mt-5 space-y-2">
                {languages.map((lang) => (
                  <li key={lang.name} className="text-sm text-ink-soft">
                    {lang.name}
                    <span className="ml-1.5 font-mono text-[11px] text-ink-faint">
                      {lang.level} · {lang.cefr}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
