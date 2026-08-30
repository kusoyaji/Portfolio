'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { profile } from '@/content/profile';
import { EASE_OUT } from '@/components/motion/Reveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The headline drifts slower than the page and dims as it leaves. Marketing
  // licence — this is the one place a longer, showier move is warranted.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-end overflow-hidden px-6 pb-16 pt-36 lg:px-12 lg:pb-24"
    >
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="mx-auto w-full max-w-[88rem]"
      >
        <motion.p
          className="eyebrow"
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
                className="block"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={
                  // Reduced motion keeps the fade and drops the travel: the line
                  // still resolves rather than appearing from nowhere.
                  reduced
                    ? { opacity: { duration: 0.3 }, y: { duration: 0 } }
                    : { duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.09 }
                }
              >
                {/* Second line carries the accent so the eye lands on the verb. */}
                {i === profile.headline.length - 1 ? (
                  <span className="italic text-amber">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-rule pt-8 md:grid-cols-12">
          <motion.p
            className="max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft md:col-span-7 lg:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { opacity: { duration: 0.3 }, y: { duration: 0 } } : { duration: 0.6, ease: EASE_OUT, delay: 0.42 }}
          >
            {profile.lede}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 md:col-span-5 md:items-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { opacity: { duration: 0.3 }, y: { duration: 0 } } : { duration: 0.6, ease: EASE_OUT, delay: 0.52 }}
          >
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              {profile.availability}
            </span>

            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:duration-[120ms]"
            >
              See the work
              {/* scaleX rather than width: transform only, no reflow per frame. */}
              <span className="inline-block h-px w-16 origin-left scale-x-[0.625] bg-ink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
