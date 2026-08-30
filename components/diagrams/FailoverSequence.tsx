'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The failover chain, traced by scrolling rather than described.
 *
 * A static diagram tells you the chain exists. Scrubbing it makes the reader do
 * what a request does: arrive, get refused, fall to the next tier. The scroll
 * position *is* the request's position, which is the only reason this earns its
 * pinned viewport — it teaches the mechanism instead of decorating it.
 *
 * Under prefers-reduced-motion the whole thing renders resolved and unpinned:
 * same information, no travel.
 */

type Tier = {
  name: string;
  role: string;
  /** Outcome once the request has been through this tier. */
  outcome: string;
  reached: boolean;
};

const TIERS: Tier[] = [
  { name: 'Gemini 3 Pro', role: 'primary', outcome: 'rate limited', reached: true },
  { name: 'Claude', role: 'tier 2', outcome: 'timed out', reached: true },
  { name: 'Gemini Flash', role: 'tier 3', outcome: 'answered', reached: true },
  { name: 'GPT-4o-mini', role: 'tier 4', outcome: 'not reached', reached: false },
  { name: 'Deterministic', role: 'always replies', outcome: 'not reached', reached: false },
];

/** Index of the tier that ends up answering. */
const ANSWERED_AT = 2;

export function FailoverSequence() {
  const outer = useRef<HTMLDivElement>(null);
  const token = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const outcome = useRef<HTMLParagraphElement>(null);
  // Defaults to the animated layout so server and client markup agree for the
  // common case; only reduced-motion visitors see the container resize once.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced || !outer.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rowEls = rows.current.filter(Boolean) as HTMLLIElement[];
      if (rowEls.length !== TIERS.length || !token.current) return;

      // Measure once: the token travels to each row's centre, so the rail stays
      // correct at any breakpoint without hard-coded offsets.
      const top = rowEls[0].offsetTop;
      const centres = rowEls.map((el) => el.offsetTop + el.offsetHeight / 2 - top);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      gsap.set(token.current, { y: centres[0] });
      gsap.set(rowEls.map((el) => el.querySelector('[data-outcome]')), { opacity: 0 });

      rowEls.forEach((el, i) => {
        if (i > ANSWERED_AT) return;
        const label = el.querySelector('[data-name]');
        const status = el.querySelector('[data-outcome]');
        const answered = i === ANSWERED_AT;

        if (i > 0) {
          tl.to(token.current, { y: centres[i], duration: 0.6, ease: 'power2.inOut' });
        }

        tl.to(label, { color: answered ? '#B45309' : '#8A8578', duration: 0.25 }, '<')
          .to(status, { opacity: 1, duration: 0.25 }, '<0.1');
      });

      tl.to(outcome.current, { opacity: 1, y: 0, duration: 0.5 }, '+=0.2');
    }, outer);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={outer}
      className={reduced ? 'my-14 lg:my-20' : 'relative my-14 h-[220vh] lg:my-20'}
    >
      <div
        className={
          reduced
            ? ''
            : 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
        }
      >
        <div className="rounded-xl border border-rule bg-paper-deep/60 px-5 py-8 lg:px-10 lg:py-12">
          <p className="eyebrow">
            <span className="text-amber">Trace</span> — one request, a degraded primary
          </p>

          <ol className="relative mt-8">
            {/* Rail the request descends. */}
            <span
              aria-hidden
              className="absolute left-[7px] top-6 bottom-6 w-px bg-rule"
            />
            {!reduced && (
              <span
                ref={token}
                aria-hidden
                className="absolute left-0 top-0 -mt-[7px] block h-[15px] w-[15px] rounded-full border-2 border-paper bg-amber will-change-transform"
              />
            )}

            {TIERS.map((tier, i) => (
              <li
                key={tier.name}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="flex items-baseline gap-4 py-3.5 pl-8"
              >
                <span
                  data-name
                  className="text-lg text-ink lg:text-xl"
                  style={
                    reduced
                      ? { color: i === ANSWERED_AT ? '#B45309' : i < ANSWERED_AT ? '#8A8578' : undefined }
                      : undefined
                  }
                >
                  {tier.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                  {tier.role}
                </span>
                <span
                  data-outcome
                  className="ml-auto font-mono text-[11px] text-ink-soft"
                  style={reduced ? undefined : { opacity: tier.reached ? undefined : 1 }}
                >
                  {tier.reached ? tier.outcome : ''}
                </span>
              </li>
            ))}
          </ol>

          <p
            ref={outcome}
            className="mt-8 border-t border-rule pt-6 text-ink-soft"
            style={reduced ? undefined : { opacity: 0, transform: 'translateY(8px)' }}
          >
            The customer received one reply. Seven agentic tools stayed available at every
            tier, so the answer that arrived was no less capable than the one the primary
            would have given.
          </p>
        </div>
      </div>
    </div>
  );
}
