'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '@/components/motion/Reveal';

/**
 * Counts a metric up to its value when it scrolls into view.
 *
 * The numbers are the pitch on this page, so they get the one bit of motion
 * that points straight at them. Values arrive already formatted ("$0.10–0.60",
 * "2,645+", "99.9%"), so every numeric run is animated in place and everything
 * around it — currency, separators, ranges, suffixes — is preserved exactly.
 *
 * The full value is rendered on the server and is what sits in the DOM, so
 * there is no hydration mismatch and no flash of "0" if JS is slow or absent.
 * The count is driven imperatively over textContent afterwards.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;

    // Split into alternating non-numeric / numeric runs.
    const parts = value.split(/([\d][\d.,]*)/);
    const targets = parts.map((p) =>
      /^\d/.test(p)
        ? {
            num: parseFloat(p.replace(/,/g, '')),
            decimals: (p.split('.')[1] || '').length,
            grouped: p.includes(','),
          }
        : null,
    );
    if (!targets.some(Boolean)) return;

    const format = (t: NonNullable<(typeof targets)[number]>, n: number) => {
      const fixed = n.toFixed(t.decimals);
      if (!t.grouped) return fixed;
      const [int, frac] = fixed.split('.');
      return int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (frac ? '.' + frac : '');
    };

    const controls = animate(0, 1, {
      duration: 1.1,
      ease: EASE_OUT,
      onUpdate: (p) => {
        el.textContent = parts
          .map((part, i) => {
            const t = targets[i];
            return t ? format(t, t.num * p) : part;
          })
          .join('');
      },
      // Land on the exact source string rather than a re-formatted approximation.
      onComplete: () => {
        el.textContent = value;
      },
    });

    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </span>
  );
}
