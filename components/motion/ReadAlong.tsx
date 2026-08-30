'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Body copy that resolves as you read it: words sit dimmed and come up to full
 * ink as the scroll passes over them.
 *
 * The mapping is scroll-linked rather than time-based, so the text tracks the
 * reader instead of playing at them — stop scrolling and it stops.
 *
 * Words are the unit, not characters: per-character would be 5x the motion
 * values for an effect nobody can read, and it wrecks text selection.
 *
 * IMPORTANT: reduced motion is handled in CSS, never by branching the markup.
 * useReducedMotion() returns null on the server and a boolean on the client, so
 * rendering different trees for it is a guaranteed hydration mismatch
 * (React #418). The spans always render; motion-reduce pins them to full
 * opacity, which also makes the text readable with JS disabled.
 */
export function ReadAlong({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  // A three-line paragraph crosses a tall viewport quickly, so a tight range
  // lights every word at once and reads as a plain fade. Start as the paragraph
  // enters from the bottom and finish once it reaches the upper third, which
  // gives the sweep room to travel.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'end 0.35'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          range={[i / words.length, (i + 1) / words.length]}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block motion-reduce:!opacity-100">
        {word}
      </motion.span>
      {' '}
    </>
  );
}
