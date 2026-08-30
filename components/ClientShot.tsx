'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import type { ClientSite } from '@/content/projects';

/**
 * A capture inside browser chrome, with the image drifting against the frame
 * as the page scrolls.
 *
 * The image is over-scaled so the drift never exposes an edge; the frame clips.
 * Only transform is animated, so this stays off the main thread.
 */
export function ClientShot({ site, priority = false }: { site: ClientSite; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  // Pointer-driven tilt. Kept to 5 degrees: enough for the frame to catch light
  // as the cursor crosses it, small enough that the capture stays readable and
  // the page never feels like a carousel of toys. Springs rather than a linear
  // map so it settles instead of tracking the cursor mechanically.
  const px = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const py = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const rotateY = useTransform(px, [-0.5, 0.5], ['-5deg', '5deg']);
  const rotateX = useTransform(py, [-0.5, 0.5], ['4deg', '-4deg']);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    // Coarse pointers have no hover state to reward, and a tilt that fires on
    // touch reads as a glitch.
    if (reduced || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block [perspective:1400px]"
      aria-label={`${site.name} — open live site in a new tab`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="motion-reduce:!transform-none overflow-hidden rounded-xl border border-rule bg-paper-deep shadow-[0_1px_2px_rgba(20,18,14,0.04),0_12px_40px_-12px_rgba(20,18,14,0.18)] transition-[translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 group-active:scale-[0.99] group-active:duration-[120ms]"
      >
        <div className="flex items-center gap-1.5 border-b border-rule bg-paper/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="ml-3 truncate font-mono text-[10px] text-ink-faint">
            {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Overscan vertically only: the drift is vertical, and expanding
              horizontally would crop the sides of the capture.

              will-change promotes this to its own layer so the parallax does not
              repaint the capture on every frame, and it removes the 1px settle
              that appears when a transformed layer is composited late. It is set
              on a permanently-animating element, so scoping it to a gesture does
              not apply here. */}
          <motion.div
            className="absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform motion-reduce:!transform-none"
            style={{ y }}
          >
            <Image
              src={site.desktop}
              alt={`${site.name} — ${site.descriptor}`}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </motion.div>
    </a>
  );
}
