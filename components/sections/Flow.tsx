'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { flow, flowOutcome, type FlowStep } from '@/content/flow';
import { EASE_OUT, Reveal, Words } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';

/**
 * The platform explained in the order a customer experiences it.
 *
 * This replaced two abstract "plates". They were handsome and unreadable — the
 * reader could not tell what the work was. Each step now leads with a sentence
 * a non-technical hiring manager can follow, keeps the engineering underneath
 * for the one who wants it, and pairs it with an illustration of that exact
 * step rather than a mood.
 *
 * Steps alternate side on wide screens so the eye zig-zags down the page
 * instead of scanning one rigid column.
 */
export function Flow() {
  return (
    <section id="how-it-works" className="bg-paper-deep px-6 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <Reveal>
          <p className="eyebrow">
            <span className="text-amber">02</span> — How it works
          </p>
        </Reveal>
        <Words
          className="display mt-5 max-w-[24ch] text-[clamp(2.2rem,5vw,4.4rem)]"
          parts={[
            { t: 'What happens when a' },
            { t: 'customer', accent: true },
            { t: 'messages.' },
          ]}
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[58ch] leading-relaxed text-ink-soft">
            One platform, ten enterprise brands, eight channels. This is the path a single
            message takes, and the part of it I built.
          </p>
        </Reveal>

        <ol className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
          {flow.map((step, i) => (
            <Step key={step.index} step={step} flip={i % 2 === 1} priority={i === 0} />
          ))}
        </ol>

        <Outcome />
      </div>
    </section>
  );
}

function Step({
  step,
  flip,
  priority,
}: {
  step: FlowStep;
  flip: boolean;
  priority: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <li ref={ref} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
      <div className={flip ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}>
        <motion.div
          className="relative aspect-[16/9] overflow-hidden rounded-lg border border-rule bg-paper"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          transition={reduced ? { duration: 0 } : { duration: 0.95, ease: EASE_OUT }}
        >
          {/* Over-scanned 16% each side so the 9% drift can never expose an edge. */}
          <motion.div
            className="absolute inset-x-0 -top-[16%] -bottom-[16%] will-change-transform motion-reduce:!transform-none"
            style={{ y }}
          >
            <Image
              src={step.image}
              alt={step.alt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className={flip ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            Step {step.index}
          </p>
          <h3 className="display mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]">{step.title}</h3>
          <p className="mt-4 max-w-[44ch] text-[1.02rem] leading-relaxed text-ink">
            {step.plain}
          </p>
          <ul className="mt-6 space-y-2 border-t border-rule pt-5">
            {step.detail.map((d) => (
              <li key={d} className="font-mono text-[11.5px] leading-relaxed text-ink-faint">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </li>
  );
}

/** The sequence exists to move one number. Close on it. */
function Outcome() {
  return (
    <Reveal>
      <div className="mt-24 border-t-2 border-ink pt-10 lg:mt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <p className="display text-[clamp(3rem,9vw,7rem)] leading-none lg:col-span-5">
            <Counter value={flowOutcome.value} />
            <span className="ml-4 align-middle font-mono text-base text-ink-faint">
              vs {flowOutcome.against}
            </span>
          </p>
          <p className="max-w-[44ch] self-end leading-relaxed text-ink-soft lg:col-span-7">
            {flowOutcome.label}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
