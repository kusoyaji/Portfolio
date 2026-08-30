import { experience } from '@/content/experience';
import { Reveal, Words } from '@/components/motion/Reveal';

export function Experience() {
  return (
    <section id="experience" className="bg-ink px-6 py-24 text-paper lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <Reveal>
          <p className="eyebrow text-paper/60">
            <span className="text-amber-lift">05</span> — Experience
          </p>
        </Reveal>
          <Words className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] text-paper" parts={[{ t: 'Professional experience.' }]} />

        <ol className="mt-16 lg:mt-24">
          {experience.map((role) => (
            <li key={`${role.company}-${role.period}`}>
              <Reveal>
                <article className="grid gap-6 border-t border-rule-invert py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <h3 className="display text-3xl text-paper lg:text-4xl">{role.company}</h3>
                      {role.current && (
                        <span className="rounded-full border border-amber-lift/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-lift">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-paper/70">{role.title}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">
                      {role.period} · {role.location}
                    </p>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="max-w-[62ch] text-lg leading-relaxed text-paper/90">
                      {role.summary}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {role.points.map((point) => (
                        <li
                          key={point}
                          className="relative max-w-[70ch] pl-5 text-sm leading-relaxed text-paper/70"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[0.6em] h-px w-2.5 bg-amber-lift/70"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                      {role.stack.map((tech) => (
                        <li key={tech} className="font-mono text-[10px] text-paper/50">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="border-t border-rule-invert" />
      </div>
    </section>
  );
}
