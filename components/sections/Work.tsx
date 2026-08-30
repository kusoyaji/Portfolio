'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { caseStudies } from '@/content/projects';
import { Reveal, Words } from '@/components/motion/Reveal';

/**
 * The case studies as a stack of cards that deal themselves.
 *
 * Each card pins a little lower than the one before it, so as you scroll the
 * next slides over the last and the stack builds on screen. Covered cards
 * scale down and dim, which is what sells the depth — without it the effect
 * reads as pages jumping rather than paper stacking.
 *
 * One useScroll on the container drives every card, so they share a single
 * scroll subscription and one source of truth for position.
 *
 * Reduced motion is expressed in CSS (motion-reduce:*), never by rendering a
 * different tree: useReducedMotion() is null on the server and boolean on the
 * client, so branching markup on it guarantees a hydration mismatch (#418).
 * Under motion-reduce the cards unpin to normal document flow and the scrim
 * and scale are neutralised.
 */
export function Work() {
  const listRef = useRef<HTMLUListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="work" className="px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <Reveal>
          <p className="eyebrow">
            <span className="text-amber">01</span> — Selected work
          </p>
        </Reveal>
        <Words
          className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)]"
          parts={[{ t: 'Five production systems.' }]}
        />

        <ul ref={listRef} className="mt-16 lg:mt-24">
          {caseStudies.map((study, i) => (
            <WorkCard
              key={study.slug}
              study={study}
              i={i}
              total={caseStudies.length}
              progress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkCard({
  study,
  i,
  total,
  progress,
}: {
  study: (typeof caseStudies)[number];
  i: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // A card recedes only while the NEXT one slides over it, not from its own
  // arrival — driving it from the card's own start dimmed the entire stack,
  // including the card on top that nothing was covering.
  const isLast = i === total - 1;
  const coverStart = (i + 1) / total;
  const coverEnd = Math.min(coverStart + 1 / total, 1);

  const scale = useTransform(progress, [coverStart, coverEnd], [1, isLast ? 1 : 0.955]);
  // Dimming uses a paper-coloured scrim INSIDE the card, never opacity on the
  // card itself: a translucent card stops occluding the ones stacked beneath it
  // and every card's text renders through every other.
  const scrim = useTransform(progress, [coverStart, coverEnd], [0, isLast ? 0 : 0.5]);

  return (
    <li
      className="sticky motion-reduce:static motion-reduce:mb-4"
      // Each card pins 26px lower than the last so the stacked edges stay visible.
      style={{ top: `${96 + i * 26}px` }}
    >
      <motion.div
        style={{ scale, transformOrigin: 'center top' }}
        className="will-change-transform motion-reduce:!transform-none"
      >
        <Link
          href={`/work/${study.slug}`}
          className="group relative block overflow-hidden rounded-2xl border border-rule bg-paper p-8 shadow-[0_24px_60px_-40px_rgba(20,18,14,0.45)] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:p-12"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-paper motion-reduce:!opacity-0"
            style={{ opacity: scrim }}
          />

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none lg:col-span-5 [@media(hover:hover)]:group-hover:translate-x-2">
              <p className="eyebrow">
                <span className="text-amber">{study.index}</span> — {study.kicker}
              </p>
              <h3 className="display mt-4 text-[clamp(2rem,4.2vw,3.5rem)] transition-colors duration-200 group-hover:text-amber">
                {study.title}
              </h3>
            </div>

            <div className="lg:col-span-5">
              <p className="max-w-[46ch] leading-relaxed text-ink-soft">{study.lede}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {study.metrics.map((metric) => (
                  <li key={metric.label} className="font-mono text-[11px] text-ink-faint">
                    <span className="text-ink">{metric.value}</span> {metric.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start lg:col-span-2 lg:justify-end">
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                Read
                {/* scaleX, not width: width is a layout property. */}
                <span
                  aria-hidden
                  className="inline-block h-px w-14 origin-left scale-x-[0.57] bg-ink-soft transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-hover:bg-amber"
                />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </li>
  );
}
