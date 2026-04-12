import type { Transition } from 'framer-motion';

/**
 * Subtle hero-only ambient wash behind the phone / page.
 *
 * - `colors.length` keyframe stops; the loop returns to `colors[0]` after the last stop.
 * - `segmentSeconds[i]` = time (seconds) to blend **from** `colors[i]` **to** `colors[(i + 1) % n]`.
 */
export type HeroAmbientCycleConfig = {
  colors: string[];
  segmentSeconds: number[];
  /** Radial center for the full-viewport layer (default `65% 50%`). */
  ellipseAtPage?: string;
  /** Radial center for the halo behind the phone mockup (default `50% 50%`). */
  ellipseAtPhone?: string;
  /**
   * On the **first** hero view only (before the user has scrolled to another panel),
   * seconds to hold the first color before the loop starts. Omit or `0` to start the loop immediately.
   */
  initialDelayBeforeCycleSec?: number;
};

export type HeroAmbientMotion = {
  backgrounds: string[];
  transition: Transition;
};

const DEFAULT_PAGE_ELLIPSE = '65% 50%';
const DEFAULT_PHONE_ELLIPSE = '50% 50%';

function radialAt(ellipseAt: string, centerTint: string) {
  return `radial-gradient(ellipse at ${ellipseAt}, ${centerTint} 0%, transparent 65%)`;
}

function buildMotion(
  colors: string[],
  segmentSeconds: number[],
  ellipseAt: string
): HeroAmbientMotion {
  const n = colors.length;
  if (n < 2) {
    throw new Error('hero-ambient-cycle: need at least 2 colors to form a loop');
  }
  if (segmentSeconds.length !== n) {
    throw new Error(
      'hero-ambient-cycle: segmentSeconds must have the same length as colors (one duration per edge in the loop)'
    );
  }

  const totalSec = segmentSeconds.reduce((a, b) => a + b, 0);
  if (totalSec <= 0) {
    throw new Error('hero-ambient-cycle: total segment duration must be > 0');
  }

  const backgrounds = [...colors, colors[0]].map((c) => radialAt(ellipseAt, c));

  const times: number[] = [0];
  let acc = 0;
  for (const seg of segmentSeconds) {
    acc += seg;
    times.push(acc / totalSec);
  }

  return {
    backgrounds,
    transition: {
      duration: totalSec,
      times,
      repeat: Infinity,
      ease: 'linear',
    },
  };
}

/** Build Framer Motion props for the hero ambient cycle (page + phone variants). */
export function heroAmbientMotionFromConfig(config: HeroAmbientCycleConfig): {
  page: HeroAmbientMotion;
  phone: HeroAmbientMotion;
} {
  const ellipseAtPage = config.ellipseAtPage ?? DEFAULT_PAGE_ELLIPSE;
  const ellipseAtPhone = config.ellipseAtPhone ?? DEFAULT_PHONE_ELLIPSE;

  return {
    page: buildMotion(config.colors, config.segmentSeconds, ellipseAtPage),
    phone: buildMotion(config.colors, config.segmentSeconds, ellipseAtPhone),
  };
}

/** Edit this object to change stops, timings, or radial center. Add entries to both arrays together. */
export const HERO_AMBIENT_CYCLE_CONFIG: HeroAmbientCycleConfig = {
  colors: [
    'rgba(94, 231, 223, 0.11)', // cyan
    'rgba(124, 110, 245, 0.18)', // purple
    'rgba(34, 197, 94, 0.10)', // green
  ],
  /** cyan→purple, purple→green, green→cyan */
  segmentSeconds: [3, 3, 3],
  ellipseAtPage: '65% 50%',
  ellipseAtPhone: '50% 50%',
  /** First landing only: hold first tint before the infinite loop runs. */
  initialDelayBeforeCycleSec: 2,
};
