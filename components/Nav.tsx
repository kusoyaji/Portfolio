'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { profile } from '@/content/profile';
import { EASE_OUT } from '@/components/motion/Reveal';

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Live', href: '/#showcase' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

/** iOS sheet curve — this panel behaves like a sheet, not like a fade. */
const EASE_SHEET = [0.32, 0.72, 0, 1] as const;

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Hysteresis: a single threshold flickers the bar when a trackpad
    // hovers around the boundary.
    setLifted((was) => (was ? y > 24 : y > 72));
  });

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* The bar's surface is a separate layer whose opacity animates, rather
            than animating background-color on the header itself. Colour is a
            paint property: the compositor cannot handle it, so it costs a repaint
            on a fixed element that sits over the whole page during scroll. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 border-b border-rule bg-paper/85 backdrop-blur-[10px]"
          initial={false}
          animate={{ opacity: lifted && !open ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        />

        {/* Reading position. The page runs to several screens, so this answers
            "how much is left" — that is the purpose; it is not decoration.
            scaleX off scrollYProgress, mapped straight with no spring so it
            cannot drift behind the scroll. Fades in with the bar. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-amber"
          style={{ scaleX: scrollYProgress }}
          initial={false}
          animate={{ opacity: lifted && !open ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        />

        <nav
          aria-label="Primary"
          className="relative mx-auto flex max-w-[88rem] items-center justify-between px-6 py-4 lg:px-12"
        >
          <Link
            href="/"
            className="relative z-50 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-opacity duration-200 hover:opacity-60"
            onClick={() => setOpen(false)}
          >
            {profile.name}
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="ink-link font-mono text-xs uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-85 active:scale-[0.97] active:duration-[120ms] sm:inline-block"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50 -mr-1 flex h-9 w-9 items-center justify-center md:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {/* Bars are positioned in CSS and moved with translate, not `top`:
                  `top` is a layout property, so animating it relayouts the
                  fixed header on every frame instead of compositing. */}
              <span aria-hidden className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 top-0 block h-px w-6 bg-ink"
                  animate={{ y: open ? 5 : 0, rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
                <motion.span
                  className="absolute left-0 top-[11px] block h-px w-6 bg-ink"
                  animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper px-6 pt-28 md:hidden"
            initial={{ opacity: 0, y: '-2%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-2%' }}
            transition={{ duration: 0.3, ease: EASE_SHEET }}
          >
            <ul className="flex flex-col">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.04 + i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block border-b border-rule py-5 text-4xl"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="mt-10 inline-block rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper active:scale-[0.97] active:duration-[120ms]"
            >
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
