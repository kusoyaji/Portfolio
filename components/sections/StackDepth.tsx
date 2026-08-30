'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { stackLayers } from '@/content/stack';
import { Reveal, Words } from '@/components/motion/Reveal';

/**
 * The platform stack as separating planes in 3D.
 *
 * The section pins while the scroll drives one continuous transform: the layers
 * start collapsed into a single slab and pull apart along Z, so the depth reads
 * as one system with layers rather than five unrelated cards.
 *
 * The stage needs real vertical room to work, so it only runs at lg and above.
 * Below that the copy grid carries the section on its own — a cramped 3D stage
 * is worse than none, and the words are the part that has to survive.
 *
 * Transform and opacity only, and the scrub maps straight off scroll position
 * with no spring, so nothing can lag behind the page. Under reduced motion the
 * planes hold still and only the copy fades.
 */
export function StackDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Shallow angles: enough to read as depth, gentle enough that the plane
  // labels stay horizontal enough to read.
  // Hold the tilt constant and animate only the separation. Animating the tilt
  // as well changed the projected scale mid-scroll and threw the planes out of
  // frame; one moving variable is both calmer to watch and predictable to lay out.
  const rotateX = useTransform(scrollYProgress, [0, 1], ['40deg', '34deg']);
  const rotateZ = useTransform(scrollYProgress, [0, 1], ['-9deg', '-7deg']);

  return (
    <section id="stack" className="bg-paper-deep px-6 lg:px-12">
      <div ref={ref} className="relative mx-auto h-[300vh] max-w-[88rem]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden py-14 lg:py-16">
          <Reveal>
            <p className="eyebrow">
              <span className="text-amber">05</span> — Depth
            </p>
          </Reveal>
            <Words className="display mt-4 max-w-[20ch] text-[clamp(2rem,4.2vw,3.4rem)]" parts={[{ t: 'One system,' }, { t: 'five layers', accent: true }, { t: 'deep.' }]} />

          {/* 3D stage. Its own reserved band, never overlapping the heading. */}
          <div
            className="relative my-6 hidden min-h-0 flex-1 [perspective:1500px] lg:block"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 [transform-style:preserve-3d] will-change-transform motion-reduce:!transform-none"
              style={{ rotateX, rotateZ }}
            >
              {stackLayers.map((layer, i) => (
                <Plane key={layer.index} i={i} progress={scrollYProgress} reduced={!!reduced} />
              ))}
            </motion.div>
          </div>

          <ol className="mt-auto grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {stackLayers.map((layer, i) => (
              <LayerCopy
                key={layer.index}
                layer={layer}
                i={i}
                progress={scrollYProgress}
                reduced={!!reduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** One plane in the slab. Separation is staggered so the stack peels apart. */
function Plane({
  i,
  progress,
  reduced,
}: {
  i: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduced: boolean;
}) {
  const start = 0.1 + i * 0.05;
  // Separation is centred on the middle plane, so the slab opens symmetrically
  // instead of climbing off the top of the stage.
  const offset = (i - 2) * 62;
  const z = useTransform(progress, [start, start + 0.5], [0, offset]);

  return (
    <motion.div
      // Centred with offsets, NOT -translate-x-1/2: motion composes `transform`
      // from its own values, so a Tailwind translate class on the same element
      // is silently discarded the moment translateZ animates.
      className="absolute left-[19%] top-[23%] h-[54%] w-[62%] rounded-xl will-change-transform"
      style={
        // Fill, border and shadow set inline rather than as utilities: an
        // opacity modifier on a custom theme colour was silently producing no
        // border, leaving paper-on-paper planes that never showed up.
        {
          background: '#f5f3ee',
          border: '2px solid rgba(20,18,14,0.55)',
          boxShadow: '0 30px 70px -28px rgba(20,18,14,0.75)',
          translateZ: z,
        } as React.CSSProperties
      }
    >
      <span className="absolute left-6 top-4 font-mono text-xs tracking-[0.2em] text-amber">
        {stackLayers[i].index}
      </span>
      <span className="absolute bottom-4 left-6 font-mono text-xs tracking-[0.12em] text-ink">
        {stackLayers[i].title}
      </span>
    </motion.div>
  );
}

/** Copy fades up as its plane reaches position. */
function LayerCopy({
  layer,
  i,
  progress,
  reduced,
}: {
  layer: (typeof stackLayers)[number];
  i: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduced: boolean;
}) {
  const start = 0.18 + i * 0.05;
  const opacity = useTransform(progress, [start, start + 0.12], [0.3, 1]);

  return (
    <motion.li style={{ opacity }} className="border-t border-rule pt-3 motion-reduce:!opacity-100">
      <p className="font-mono text-[11px] tracking-[0.18em] text-amber">{layer.index}</p>
      <h3 className="mt-1.5 text-[15px] font-medium">{layer.title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{layer.blurb}</p>
      <ul className="mt-2 hidden flex-wrap gap-x-2 gap-y-0.5 xl:flex">
        {layer.items.map((item) => (
          <li key={item} className="font-mono text-[10px] text-ink-faint">
            {item}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
