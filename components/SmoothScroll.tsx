'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis owns scrolling for the whole document, and GSAP's ticker owns the clock.
 *
 * Running Lenis on its own requestAnimationFrame while ScrollTrigger runs on
 * GSAP's produces two clocks a frame apart, and scrubbed timelines visibly lag
 * the scroll. Driving Lenis from gsap.ticker and updating ScrollTrigger from
 * Lenis keeps them on the same frame.
 *
 * Deliberately inert when the visitor has asked for reduced motion: smoothing
 * changes how scrolling *feels*, which is exactly what that preference is about,
 * so the honest response is native scroll rather than a gentler curve.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: quick to respond, long settle, no rubber-band.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Frame-rate compensation fights a smoothed scroller; disable it.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
