'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Fragment, type ReactNode } from 'react';

/** The house curve — strong ease-out, used for everything that is not a sheet. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Fire 100px before the element reaches the viewport, so the motion has
 * resolved by the time it is actually being read. Revealing on contact makes
 * the page feel like it is lagging behind the scroll.
 */
const VIEWPORT = { once: true, margin: '0px 0px -100px 0px' } as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`motion-reduce:!transform-none ${className ?? ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06 } },
};

/** Wrap a list; each direct <StaggerItem> resolves 60ms after the last. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export type HeadingPart = { t: string; accent?: boolean };

/**
 * A display heading that rises word by word from behind a mask.
 *
 * Reserved for section headings, where it reads as deliberate typesetting
 * rather than decoration. Each word sits in an overflow-hidden span so the
 * travel is revealed rather than floating, and the stagger is tight enough
 * (45ms) that the line still resolves as one gesture.
 *
 * Under reduced motion the travel is dropped and the whole line simply fades,
 * so nothing appears from nowhere.
 */
export function Words({
  parts,
  className,
}: {
  parts: HeadingPart[];
  className?: string;
}) {
  const reduced = useReducedMotion();

  // Flatten to words while remembering which ones carry the accent, so the
  // stagger index is continuous across the whole heading.
  const words = parts.flatMap((part) =>
    part.t.split(' ').filter(Boolean).map((w) => ({ w, accent: !!part.accent })),
  );

  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.045 } } }}
    >
      {words.map(({ w, accent }, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.09em] align-bottom">
            <motion.span
              className="inline-block motion-reduce:!transform-none"
              variants={{
                hidden: { y: '108%', opacity: 0 },
                shown: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration: reduced ? 0.3 : 0.62, ease: EASE_OUT },
                },
              }}
            >
              {accent ? <span className="italic text-amber">{w}</span> : w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
  };

  return (
    <motion.div className={`motion-reduce:!transform-none ${className ?? ''}`} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
