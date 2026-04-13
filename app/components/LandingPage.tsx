'use client';

import { useRef, useEffect, useLayoutEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FEATURE_VIDEO_SOURCES, VOICE_EXPENSES_VIDEO_INDEX } from '@/lib/marketing-video-urls';
import {
  HERO_AMBIENT_CYCLE_CONFIG,
  heroAmbientMotionFromConfig,
  type HeroAmbientMotion,
} from '@/lib/hero-ambient-cycle';
import { SpendriftLogoMark } from './SpendriftLogoMark';
import { AppStoreDownloadBadge, SPENDRIFT_APP_STORE_URL } from './AppStoreDownloadBadge';

const FEATURES = [
  {
    id: 0,
    tag: 'Smart Budgeting',
    headline: 'Create transactions with ease.',
    body: 'Type out your transactions with ease and save it forever.',
    color: '#A78BFA', // Purple
    glow: 'rgba(167, 139, 250, 0.18)',
  },
  {
    id: 1,
    tag: 'Expense Tracking',
    headline: 'Top Tier Accessibility.',
    body: 'Add accessibility shortcuts to your action button or double/triple tap that make your life easier.',
    color: '#22D3EE', // Cyan
    glow: 'rgba(34, 211, 238, 0.18)',
  },
  {
    id: 2,
    tag: 'Savings Goals',
    headline: 'Type Expense Shortcut.',
    body: 'Record expense without ever opening your app.',
    color: '#F59E0B', // Orange
    glow: 'rgba(245, 158, 11, 0.18)',
  },
  {
    id: 3,
    tag: 'Insights & Reports',
    headline: 'Voice Expenses.',
    body: 'Directly speak an expense via the voice expense shortcut or via the speak feature and have your expenses be recorded magically.',
    color: '#ef4444', // Red
    glow: 'rgba(239, 68, 68, 0.18)',
  },
  {
    id: 4,
    tag: 'Import Statements',
    headline: 'Missed Several Expenses?',
    body: 'Record everything by simply upload your bank statement.',
    color: '#3B82F6', // Blue
    glow: 'rgba(59, 130, 246, 0.18)',
  },
  {
    id: 5,
    tag: 'Analytics',
    headline: 'Insightful and Beautiful',
    body: 'Beautiful analytics UI that tells you everything about your app.',
    color: '#14B8A6', // Teal
    glow: 'rgba(20, 184, 166, 0.18)',
  },
];

function AppScreenVideo({
  featureId,
  visible,
  muted,
}: {
  featureId: number;
  visible: boolean;
  /** When false, audio may play (subject to browser autoplay rules). */
  muted: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const src = FEATURE_VIDEO_SOURCES[featureId];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) {
      el.play().catch(() => { });
    } else {
      el.pause();
    }
  }, [visible]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={featureId}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 rounded-[inherit] overflow-hidden bg-black"
        >
          <video
            ref={ref}
            className="chromeless-marketing-video absolute inset-0 h-full w-full"
            src={src}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            aria-label="App screen recording preview"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VoiceVideoSoundToggle({
  soundOn,
  onToggle,
}: {
  soundOn: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute bottom-14 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur-md transition hover:bg-black/55 active:scale-95"
      aria-label={soundOn ? 'Mute demo audio' : 'Unmute demo audio'}
      aria-pressed={soundOn}
    >
      {soundOn ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}

function PhoneFrame({
  videoFeatureId,
  glowFeature,
  heroAmbient,
  heroAmbientRestartKey,
  heroAmbientIntroDelaySec,
  videoMuted,
  showVoiceSoundToggle,
  voiceSoundOn,
  onVoiceSoundToggle,
}: {
  videoFeatureId: number;
  glowFeature: (typeof FEATURES)[number];
  /** When set (hero panel), cycles subtle radial colors instead of a single story glow. */
  heroAmbient: HeroAmbientMotion | null;
  /** Bump when re-entering hero so the cycle remounts from the first keyframe. */
  heroAmbientRestartKey: number;
  /** Prepended to the loop transition (seconds); 0 after the user has left hero once. */
  heroAmbientIntroDelaySec: number;
  videoMuted: boolean;
  /** Voice-expense slide only: speaker control. */
  showVoiceSoundToggle: boolean;
  voiceSoundOn: boolean;
  onVoiceSoundToggle: () => void;
}) {
  return (
    <div className="relative" style={{ width: 340, height: 720 }}>
      {/* Glow behind phone */}
      {heroAmbient ? (
        <motion.div
          key={`hero-phone-ambient-${heroAmbientRestartKey}`}
          className="absolute inset-0 rounded-[52px] blur-3xl"
          style={{ margin: '-30px' }}
          initial={{ background: heroAmbient.backgrounds[0] }}
          animate={{ background: heroAmbient.backgrounds }}
          transition={{
            ...heroAmbient.transition,
            delay: heroAmbientIntroDelaySec,
          }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 rounded-[52px] blur-3xl"
          style={{ background: glowFeature.glow, margin: '-30px' }}
          animate={{ background: glowFeature.glow }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Phone shell */}
      <div
        className="relative rounded-[52px] overflow-hidden"
        style={{
          width: 340,
          height: 720,
          background: 'var(--phone-bg)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full z-10" style={{ background: '#000' }} />

        {/* Screen area — `videoFeatureId` indexes FEATURE_VIDEO_SOURCES (7 clips vs 6 feature slides). */}
        <div className="absolute inset-0 rounded-[52px] overflow-hidden">
          <AppScreenVideo key={videoFeatureId} featureId={videoFeatureId} visible muted={videoMuted} />
        </div>

        {showVoiceSoundToggle && (
          <VoiceVideoSoundToggle soundOn={voiceSoundOn} onToggle={onVoiceSoundToggle} />
        )}

        {/* Side button glints */}
        <div className="absolute right-0 top-28 w-1 h-16 rounded-l-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute left-0 top-24 w-1 h-10 rounded-r-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute left-0 top-40 w-1 h-10 rounded-r-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  );
}

function MobileHeroVideo() {
  const src = FEATURE_VIDEO_SOURCES[0];
  return (
    <video
      className="chromeless-marketing-video h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      aria-label="App screen recording preview"
    />
  );
}

function FeatureText({ feature, visible }: { feature: typeof FEATURES[0]; visible: boolean }) {
  const oneLine = feature.headline.replace(/\n/g, ' ');
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-5 max-lg:space-y-3"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase max-lg:hidden"
            style={{ background: `${feature.color}18`, color: feature.color, border: `1px solid ${feature.color}35` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: feature.color }} />
            {feature.tag}
          </div>

          <h2
            className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight max-lg:text-xl max-lg:font-bold max-lg:leading-snug max-lg:tracking-tight max-lg:text-center"
            style={{ color: 'var(--text-primary)', whiteSpace: 'pre-line' }}
          >
            <span className="lg:hidden">{oneLine}</span>
            <span className="hidden lg:inline">{feature.headline}</span>
          </h2>

          <p
            className="text-base leading-relaxed max-w-sm max-lg:mx-auto max-lg:max-w-[22rem] max-lg:text-[13px] max-lg:leading-[1.55] max-lg:text-center max-lg:line-clamp-2"
            style={{ color: 'var(--text-secondary)', opacity: 0.88 }}
          >
            {feature.body}
          </p>

          <div
            className="h-0.5 w-16 rounded-full max-lg:hidden"
            style={{ background: feature.color }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SCROLL_PANEL_COUNT = 1 + FEATURES.length;

/** Video slot: panel 0 → first clip, panel 1 → second, … clamped to last entry in FEATURE_VIDEO_SOURCES (can exceed FEATURES.length − 1). */
function phoneVideoIndexForPanel(panel: number) {
  return Math.min(panel, FEATURE_VIDEO_SOURCES.length - 1);
}

/** Matches Framer offset ["start start", "end end"]: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom. */
function getStoryScrollMetrics(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY;
  const elTopDoc = rect.top + scrollY;
  const elHeight = el.offsetHeight;
  const vh = window.innerHeight;
  const track = elHeight - vh;
  return { elTopDoc, track, elHeight, vh };
}

/** 0 during earlier panels; eases 0→1 through the last story segment (scroll-driven). */
function footerOpacityFromStoryProgress(
  progress: number,
  scrollY: number,
  elTopDoc: number,
  elHeight: number,
  vh: number,
  panelCount: number
) {
  const lastPanelStart = (panelCount - 1) / panelCount;
  const inLastSegment =
    progress > lastPanelStart
      ? (progress - lastPanelStart) / (1 - lastPanelStart)
      : 0;
  // Smoothstep for a gentler fade
  const t = Math.min(1, Math.max(0, inLastSegment));
  const eased = t * t * (3 - 2 * t);
  const storyBottom = elTopDoc + elHeight;
  const pastStory = scrollY + vh >= storyBottom - 2;
  return pastStory ? 1 : eased;
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [footerOpacity, setFooterOpacity] = useState(0);
  /** Bump when scroll sync moves from a feature panel back to hero so ambient motion remounts. */
  const [heroAmbientEpoch, setHeroAmbientEpoch] = useState(0);
  /** After user has scrolled past hero once, skip the initial ambient cycle delay. */
  const [hasLeftHero, setHasLeftHero] = useState(false);
  /** Voice-expense slide only: default on; resets when leaving that video. */
  const [voiceExpensesSoundOn, setVoiceExpensesSoundOn] = useState(true);
  /** Last panel index from scroll sync — used to detect re-entry to hero for ambient restart. */
  const prevSyncedPanelRef = useRef(0);

  const syncPanelFromScroll = useCallback(() => {
    const el = featuresRef.current;
    if (!el) return;
    const { elTopDoc, track, elHeight, vh } = getStoryScrollMetrics(el);
    if (track <= 0) {
      const prev = prevSyncedPanelRef.current;
      if (prev !== 0) {
        setHeroAmbientEpoch((n) => n + 1);
      }
      prevSyncedPanelRef.current = 0;
      setActivePanel(0);
      setFooterOpacity(0);
      return;
    }
    const raw = (window.scrollY - elTopDoc) / track;
    const progress = Math.min(1, Math.max(0, raw));
    const index = Math.min(
      Math.floor(progress * SCROLL_PANEL_COUNT),
      SCROLL_PANEL_COUNT - 1
    );
    if (index !== 0) {
      setHasLeftHero(true);
    }
    const prev = prevSyncedPanelRef.current;
    if (index === 0 && prev !== 0) {
      setHeroAmbientEpoch((n) => n + 1);
    }
    const prevVid = phoneVideoIndexForPanel(prev);
    const nextVid = phoneVideoIndexForPanel(index);
    if (
      nextVid === VOICE_EXPENSES_VIDEO_INDEX &&
      prevVid !== VOICE_EXPENSES_VIDEO_INDEX
    ) {
      setVoiceExpensesSoundOn(true);
    }
    prevSyncedPanelRef.current = index;
    setActivePanel(index);
    setFooterOpacity(
      footerOpacityFromStoryProgress(
        progress,
        window.scrollY,
        elTopDoc,
        elHeight,
        vh,
        SCROLL_PANEL_COUNT
      )
    );
  }, []);

  useLayoutEffect(() => {
    const el = featuresRef.current;
    if (!el) return;

    let raf = 0;
    const schedule = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncPanelFromScroll();
      });
    };

    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [syncPanelFromScroll]);

  const storyFeature =
    activePanel === 0 ? FEATURES[0] : FEATURES[activePanel - 1];
  const phoneVideoIndex = phoneVideoIndexForPanel(activePanel);
  const showVoiceSoundToggle = phoneVideoIndex === VOICE_EXPENSES_VIDEO_INDEX;
  const videoMuted = showVoiceSoundToggle ? !voiceExpensesSoundOn : true;
  const featureForGlow = storyFeature;

  const heroAmbient = useMemo(
    () => heroAmbientMotionFromConfig(HERO_AMBIENT_CYCLE_CONFIG),
    []
  );

  const heroAmbientIntroDelaySec =
    activePanel === 0 && !hasLeftHero
      ? (HERO_AMBIENT_CYCLE_CONFIG.initialDelayBeforeCycleSec ?? 0)
      : 0;

  const heroPageMotionTransition = useMemo(
    () => ({
      ...heroAmbient.page.transition,
      delay: heroAmbientIntroDelaySec,
    }),
    [heroAmbient.page.transition, heroAmbientIntroDelaySec]
  );

  return (
    <div ref={containerRef} style={{ background: 'var(--bg)' }}>
      {/* Mobile: dark marketing layout + device frame — same ambience as desktop hero, no scroll story */}
      <div className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute rounded-full blur-[100px] opacity-20"
            style={{ width: 280, height: 280, top: -60, left: '50%', transform: 'translateX(-50%)', background: '#7c6ef5' }}
          />
          <div
            className="absolute rounded-full blur-[90px] opacity-15"
            style={{ width: 220, height: 220, bottom: 40, right: -40, background: '#5ee7df' }}
          />
        </div>
        <motion.div
          key={`mobile-hero-ambient-${heroAmbientEpoch}`}
          className="pointer-events-none absolute inset-0"
          initial={{ background: heroAmbient.page.backgrounds[0] }}
          animate={{ background: heroAmbient.page.backgrounds }}
          transition={{
            ...heroAmbient.page.transition,
            delay: heroAmbientIntroDelaySec,
          }}
        />

        <header className="relative z-20 flex items-center justify-between gap-2 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
          <div className="flex min-w-0 flex-1 items-center gap-2.5" aria-label="Spendrift home">
            <SpendriftLogoMark className="h-9 w-auto shrink-0 sm:h-10" />
            <span className="truncate text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Spendrift
            </span>
          </div>
          <a
            href={SPENDRIFT_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/12 px-3 py-2 text-center text-[11px] font-semibold leading-tight text-white shadow-lg transition active:scale-[0.98] sm:px-3.5 sm:text-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 110, 245, 0.95), rgba(94, 231, 223, 0.55))',
              boxShadow: '0 12px 40px rgba(124, 110, 245, 0.25)',
              maxWidth: '11rem',
            }}
          >
            Download from App&nbsp;Store
          </a>
        </header>

        <main className="relative z-10 flex w-full max-w-lg flex-1 flex-col px-5 pb-10 pt-2 sm:mx-auto">
          <div
            className="mb-5 inline-flex w-fit items-center gap-2 self-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              background: 'rgba(124, 110, 245, 0.12)',
              borderColor: 'rgba(124, 110, 245, 0.25)',
              color: '#a89ff7',
            }}
          >
            <span className="text-[13px]" aria-hidden>
              ★
            </span>
            Privacy-first finance
          </div>

          <h1 className="text-center text-[1.65rem] font-black leading-[1.12] tracking-tight sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            Your money,{' '}
            <span
              className="bg-gradient-to-br from-[#7c6ef5] to-[#5ee7df] bg-clip-text text-transparent"
            >
              understood.
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)', opacity: 0.88 }}>
            Built to bring ease in expense tracking. Upload bank statements, speak expenses, or track them without ever opening the app.
          </p>

          <div className="mx-auto mt-8 flex flex-col items-center gap-1">
            <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              4.9<span className="text-lg">★</span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              App Store rating
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[240px] sm:max-w-[256px]">
            <div
              className="rounded-[2.35rem] p-[10px]"
              style={{
                background: 'var(--phone-bg)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              aria-label="Spendrift app preview"
            >
              <div className="relative aspect-[9/19.2] w-full overflow-hidden rounded-[1.9rem] bg-black">
                <div
                  className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full bg-black"
                  aria-hidden
                />
                <MobileHeroVideo />
              </div>
            </div>
          </div>
        </main>

        <footer className="relative z-10 mt-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10">
          <div
            className="relative mx-auto flex max-w-md flex-col items-center gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between sm:gap-4"
          >
            <nav
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[13px] font-medium sm:justify-start"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Footer"
            >
              <Link href="/privacy_policy" className="rounded-md px-2 py-1 transition-opacity hover:opacity-80">
                Privacy
              </Link>
              <span className="select-none px-1 opacity-25" style={{ color: 'var(--text-primary)' }} aria-hidden>
                ·
              </span>
              <a href="mailto:me@ronakpunase.dev" className="rounded-md px-2 py-1 transition-opacity hover:opacity-80">
                Contact
              </a>
            </nav>
            <p className="text-center text-[11px] tracking-wide sm:text-right" style={{ color: 'var(--text-muted)' }}>
              Built by Ronak
            </p>
          </div>
        </footer>
      </div>

      {/* Desktop: hero + scroll-driven feature story */}
      <section
        ref={featuresRef}
        style={{ height: `${SCROLL_PANEL_COUNT * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* Noise texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Gradient blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute rounded-full blur-[120px] opacity-20"
              style={{ width: 600, height: 600, top: -100, left: -200, background: '#7c6ef5' }}
            />
            <div
              className="absolute rounded-full blur-[120px] opacity-15"
              style={{ width: 500, height: 500, bottom: -100, right: -100, background: '#5ee7df' }}
            />
          </div>

          {/* Background glow: hero = subtle multi-color cycle; feature slides = story tint */}
          <motion.div
            key={activePanel === 0 ? `hero-page-ambient-${heroAmbientEpoch}` : 'story-page-ambient'}
            className="pointer-events-none absolute inset-0"
            initial={
              activePanel === 0
                ? { background: heroAmbient.page.backgrounds[0] }
                : false
            }
            animate={
              activePanel === 0
                ? { background: heroAmbient.page.backgrounds }
                : {
                  background: `radial-gradient(ellipse at 65% 50%, ${featureForGlow.glow} 0%, transparent 65%)`,
                }
            }
            transition={
              activePanel === 0 ? heroPageMotionTransition : { duration: 0.8 }
            }
          />

          <nav className="relative z-10 hidden shrink-0 items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-5 lg:flex lg:px-16 lg:py-6">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink">
              <SpendriftLogoMark className="h-7 w-auto sm:h-8 lg:h-9" />
              <span className="text-lg sm:text-xl font-black tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>
                Spendrift
              </span>
            </div>
            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              <Link
                href="/privacy_policy"
                className="text-[11px] sm:text-xs lg:text-sm px-1.5 sm:px-3 py-1.5 rounded-lg transition-opacity hover:opacity-60 shrink-0"
                style={{ color: 'var(--text-secondary)' }}
              >
                Privacy
              </Link>
              <a
                href="mailto:me@ronakpunase.dev"
                className="hidden sm:inline text-[11px] sm:text-xs lg:text-sm px-1.5 sm:px-3 py-1.5 rounded-lg transition-opacity hover:opacity-60 shrink-0"
                style={{ color: 'var(--text-secondary)' }}
              >
                Contact
              </a>
            </div>
          </nav>

          <div className="relative z-10 flex-1 flex items-center min-h-0">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-16 py-4 lg:py-8 min-h-0">
              {/* Left: hero on panel 0, then feature copy */}
              <div className="flex-1 max-w-lg space-y-4 lg:space-y-8 w-full min-w-0 max-lg:text-center max-lg:shrink-0">
                {activePanel === 0 ? (
                  <motion.div
                    className="text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 max-lg:hidden"
                      style={{ background: 'rgba(124, 110, 245, 0.12)', color: '#7c6ef5', border: '1px solid rgba(124,110,245,0.25)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Now available on the App Store
                    </div>

                    <div className="flex w-full justify-start mb-5 max-lg:mb-4 lg:mb-7">
                      <SpendriftLogoMark className="h-14 w-auto sm:h-20 lg:h-24 xl:h-28" />
                    </div>

                    <h1
                      className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6 max-lg:text-2xl max-lg:mb-3 max-lg:leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Your money,{' '}
                      <span
                        className="relative"
                        style={{
                          background: 'linear-gradient(135deg, #7c6ef5, #5ee7df)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        understood.
                      </span>
                    </h1>

                    <p
                      className="text-lg leading-relaxed mb-10 max-lg:mb-4 max-lg:text-[13px] max-lg:leading-[1.55] max-lg:max-w-md max-lg:line-clamp-2"
                      style={{ color: 'var(--text-secondary)', opacity: 0.88 }}
                    >
                      Built to bring ease in expense tracking. Upload your bank statements, speak your expenses or track them without ever opening the app.
                    </p>


                    <AppStoreDownloadBadge
                      size="lg"
                      className="hover:shadow-2xl max-lg:w-full max-lg:max-w-xs max-lg:justify-center"
                    />


                    <div className="mt-10 flex flex-wrap items-center gap-6 max-lg:hidden">
                      <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>4.9★</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>App Store rating</p>
                      </div>
                      <div className="w-px h-10 hidden sm:block" style={{ background: 'var(--border)' }} />
                      <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>100%</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>On-device private</p>
                      </div>
                      <div className="w-px h-10 hidden sm:block" style={{ background: 'var(--border)' }} />
                      <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Free</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>To download</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <FeatureText feature={FEATURES[activePanel - 1]} visible={true} />
                )}
              </div>

              {/* Right: phone */}
              <motion.div
                className="flex-shrink-0 relative"
                layout="position"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  layout: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity: { duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              >
                {activePanel === 0 && (
                  <>
                    <motion.div
                      className="absolute -left-28 top-1/4 hidden xl:block z-10"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div
                        className="px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                      >
                        🏷️ Auto-categorised
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -right-28 bottom-20 hidden xl:block z-10"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <div
                        className="px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                      >
                        🔒 On-Device Private
                      </div>
                    </motion.div>
                  </>
                )}

                <div className="max-lg:relative max-lg:mx-auto max-lg:h-[min(52vh,520px)] max-lg:w-full max-lg:flex max-lg:justify-center lg:contents">
                  <div className="max-lg:absolute max-lg:left-1/2 max-lg:top-0 max-lg:-translate-x-1/2 max-lg:origin-top max-lg:scale-[0.74] lg:static lg:translate-x-0 lg:scale-100">
                    <PhoneFrame
                      videoFeatureId={phoneVideoIndex}
                      glowFeature={storyFeature}
                      heroAmbient={activePanel === 0 ? heroAmbient.phone : null}
                      heroAmbientRestartKey={heroAmbientEpoch}
                      heroAmbientIntroDelaySec={heroAmbientIntroDelaySec}
                      videoMuted={videoMuted}
                      showVoiceSoundToggle={showVoiceSoundToggle}
                      voiceSoundOn={voiceExpensesSoundOn}
                      onVoiceSoundToggle={() =>
                        setVoiceExpensesSoundOn((on) => !on)
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint — keep footprint when past panel 0 so sticky layout doesn’t jump */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-2 pb-6 lg:pb-8 shrink-0 max-lg:min-h-[52px]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activePanel === 0 ? 1 : 0,
            }}
            transition={{
              opacity: { duration: activePanel === 0 ? 0.8 : 0.35 },
            }}
            aria-hidden={activePanel !== 0}
            style={{ pointerEvents: activePanel === 0 ? 'auto' : 'none' }}
          >
            <p className="text-[10px] lg:text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll to explore</p>
            <motion.div
              className="w-px h-10"
              style={{ background: 'linear-gradient(to bottom, var(--border), transparent)' }}
              animate={
                activePanel === 0
                  ? { scaleY: [0.5, 1, 0.5] }
                  : { scaleY: 0.5 }
              }
              transition={
                activePanel === 0
                  ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 }
              }
            />
          </motion.div>

          {/* Panel counter — desktop only */}
          <div className="absolute top-20 lg:top-24 right-8 lg:right-16 text-right pointer-events-none hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={activePanel}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-5xl font-black opacity-10"
                style={{ color: 'var(--text-primary)' }}
              >
                {activePanel < 9 ? `0${activePanel + 1}` : activePanel + 1}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs tracking-widest uppercase opacity-30" style={{ color: 'var(--text-primary)' }}>
              / {SCROLL_PANEL_COUNT < 10 ? `0${SCROLL_PANEL_COUNT}` : SCROLL_PANEL_COUNT}
            </p>
          </div>
        </div>
      </section>

      <footer
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 hidden px-6 pb-8 pt-4 text-center lg:block"
        style={{ opacity: footerOpacity }}
        aria-hidden={footerOpacity < 0.03}
      >
        <p
          className="text-[13px] leading-relaxed tracking-wide"
          style={{ color: 'var(--text-muted)' }}
        >
          Built by Ronak. Copyright 2026 spendrift.
        </p>
      </footer>
    </div>
  );
}
