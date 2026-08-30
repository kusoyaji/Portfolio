'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { capabilities } from '@/content/capabilities';
import { Reveal, Words } from '@/components/motion/Reveal';

/**
 * Capabilities read sideways: the section pins and the four panels travel
 * horizontally as the page scrolls down.
 *
 * The travel distance is measured rather than guessed — a hard-coded
 * percentage either stops short of the last panel or overshoots into empty
 * space the moment the viewport or font size changes. A ResizeObserver keeps
 * it correct across breakpoints and font loading.
 *
 * Below lg, and under reduced motion, it degrades to the original two-column
 * grid in normal document flow. Horizontal scroll-jacking on a phone is
 * hostile, and there is not enough width for it to read anyway.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      // How far the rail must move for its right edge to reach the viewport's.
      setTravel(Math.max(0, track.scrollWidth - track.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -travel]);

  return (
    <section id="capabilities" className="px-6 lg:px-12">
      {/* Rendered once, above both layouts: having it inside each branch put a
          duplicate heading and eyebrow in the DOM even though only one shows. */}
      <div className="mx-auto max-w-[88rem] pt-24 lg:pt-36">
        <Header />
      </div>

      <div className="mx-auto max-w-[88rem] pb-24 lg:hidden">
        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {capabilities.map((group) => (
            <Panel key={group.index} group={group} plain />
          ))}
        </div>
      </div>

      {/* Pinned horizontal rail, lg and up. */}
      <div
        ref={sectionRef}
        className="relative mx-auto hidden max-w-[88rem] lg:block motion-reduce:!h-auto"
        style={{ height: '340vh' }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
          {/* A compact marker, not a second <h2>: the real heading lives above
              the pin, and repeating it would duplicate the page's headings. */}
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            <span className="text-amber">04</span> — Areas of expertise
          </p>

          <div ref={trackRef} className="overflow-hidden">
            <motion.div
              className="flex gap-8 will-change-transform motion-reduce:!transform-none"
              style={{ x }}
            >
              {capabilities.map((group) => (
                <Panel key={group.index} group={group} />
              ))}
            </motion.div>
          </div>

          <Rail progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <>
      <Reveal>
        <p className="eyebrow">
          <span className="text-amber">04</span> — Capabilities
        </p>
      </Reveal>
      <Words
        className="display mt-5 max-w-[20ch] text-[clamp(2.5rem,5vw,4.2rem)]"
        parts={[{ t: 'Areas of' }, { t: 'expertise.', accent: true }]}
      />
    </>
  );
}

/** A progress rail so the horizontal move reads as intentional, not a glitch. */
function Rail({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  return (
    <div className="mt-10 h-px w-full bg-rule" aria-hidden>
      <motion.div className="h-px origin-left bg-amber" style={{ scaleX: progress }} />
    </div>
  );
}

function Panel({
  group,
  plain = false,
}: {
  group: (typeof capabilities)[number];
  plain?: boolean;
}) {
  return (
    <div
      className={
        plain
          ? 'border-t border-rule pt-6'
          : 'w-[min(30rem,72vw)] shrink-0 border-t border-rule pt-6'
      }
    >
      <p className="eyebrow">
        <span className="text-amber">{group.index}</span>
      </p>
      <h3 className="display mt-3 text-3xl lg:text-4xl">{group.title}</h3>
      <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-soft">{group.blurb}</p>
      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2.5">
        {group.items.map((item) => (
          <li key={item} className="font-mono text-[11px] text-ink-faint">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
