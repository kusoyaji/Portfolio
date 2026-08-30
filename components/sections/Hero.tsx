'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { profile } from '@/content/profile';
import { streamImages } from '@/content/stream';
import { EASE_OUT } from '@/components/motion/Reveal';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';

/**
 * The opening: the work itself rushing toward the reader, with the positioning
 * set over it.
 *
 * The page is otherwise warm paper. Opening on ink and resolving into paper at
 * the fold gives the site one deliberate contrast instead of a uniform tone
 * throughout, and it lets the corridor's cards carry real colour — they are the
 * only saturated thing above the fold, which is where the eye should go.
 *
 * `data-dark-hero` is the signal the nav watches; while this section is under
 * the bar the nav inverts to light type, because near-black nav text over an
 * ink hero is invisible.
 *
 * The corridor is decorative and marked aria-hidden inside the component, so
 * the headline and lede carry the whole meaning for a screen reader.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The copy drifts slower than the page and dims as it leaves. Marketing
  // licence — this is the one place a longer, showier move is warranted.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      data-dark-hero
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper"
    >
      <ImageStreamHero
        images={streamImages}
        cards={9}
        speed={26}
        axis={52}
        className="absolute inset-0 h-full w-full"
      />

      {/* Scrim. The corridor is busiest at the centre where the copy sits, so
          the darkening is strongest there and lifts toward the edges, keeping
          the cards legible at the frame while the text stays readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 48%, rgba(20,18,14,0.92) 0%, rgba(20,18,14,0.72) 45%, rgba(20,18,14,0.5) 100%)',
        }}
      />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-[88rem] flex-col justify-end px-6 pb-16 pt-36 motion-reduce:!transform-none lg:px-12 lg:pb-24"
      >
        <motion.p
          className="eyebrow text-paper/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {profile.role} — {profile.location}
        </motion.p>

        <h1 className="display mt-6 text-[clamp(3.25rem,11.5vw,10.5rem)]">
          {profile.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block motion-reduce:!transform-none"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={
                  reduced
                    ? { opacity: { duration: 0.3 }, y: { duration: 0 } }
                    : { duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.09 }
                }
              >
                {/* Second line carries the accent so the eye lands on the verb. */}
                {i === profile.headline.length - 1 ? (
                  <span className="italic text-amber-lift">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-rule-invert pt-8 md:grid-cols-12">
          <motion.p
            className="max-w-2xl text-[0.98rem] leading-relaxed text-paper/75 md:col-span-7 lg:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { opacity: { duration: 0.3 }, y: { duration: 0 } }
                : { duration: 0.6, ease: EASE_OUT, delay: 0.42 }
            }
          >
            {profile.lede}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 md:col-span-5 md:items-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { opacity: { duration: 0.3 }, y: { duration: 0 } }
                : { duration: 0.6, ease: EASE_OUT, delay: 0.52 }
            }
          >
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-lift opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-lift" />
              </span>
              {profile.availability}
            </span>

            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:duration-[120ms]"
            >
              See the work
              {/* scaleX rather than width: transform only, no reflow per frame. */}
              <span className="inline-block h-px w-16 origin-left scale-x-[0.625] bg-paper transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
