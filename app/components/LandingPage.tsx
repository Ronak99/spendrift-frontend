'use client';

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FEATURE_VIDEO_SOURCES } from '@/lib/feature-videos';

const FEATURES = [
  {
    id: 0,
    tag: 'Smart Budgeting',
    headline: 'Set budgets that actually\nwork for you.',
    body: 'Spendrift learns your spending habits and automatically adjusts budget categories — so you always know where every dollar is going.',
    color: '#7c6ef5',
    glow: 'rgba(124, 110, 245, 0.18)',
  },
  {
    id: 1,
    tag: 'Expense Tracking',
    headline: 'Every transaction,\ninstantly captured.',
    body: 'Link your accounts or log manually. Spendrift categorises everything in real time, with beautiful charts that make your spending crystal clear.',
    color: '#5ee7df',
    glow: 'rgba(94, 231, 223, 0.18)',
  },
  {
    id: 2,
    tag: 'Savings Goals',
    headline: 'Reach your goals\nfaster than ever.',
    body: 'Create savings goals for anything — a vacation, new laptop, or emergency fund. Watch your progress grow with satisfying visual milestones.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.18)',
  },
  {
    id: 3,
    tag: 'Insights & Reports',
    headline: 'Understand your money\nat a glance.',
    body: 'Beautiful weekly and monthly reports reveal patterns you never noticed. Get personalised tips to optimise your spending — all on-device, fully private.',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.18)',
  },
];

function AppScreenVideo({ featureId, visible }: { featureId: number; visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const src = FEATURE_VIDEO_SOURCES[featureId];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) {
      el.play().catch(() => {});
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PhoneFrame({ activeFeature }: { activeFeature: number }) {
  const feature = FEATURES[activeFeature];

  return (
    <div className="relative" style={{ width: 340, height: 720 }}>
      {/* Glow behind phone */}
      <motion.div
        className="absolute inset-0 rounded-[52px] blur-3xl"
        style={{ background: feature.glow, margin: '-30px' }}
        animate={{ background: feature.glow }}
        transition={{ duration: 0.8 }}
      />

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

        {/* Screen area */}
        <div className="absolute inset-0 rounded-[52px] overflow-hidden">
          {FEATURES.map((f) => (
            <AppScreenVideo key={f.id} featureId={f.id} visible={f.id === activeFeature} />
          ))}
        </div>

        {/* Side button glints */}
        <div className="absolute right-0 top-28 w-1 h-16 rounded-l-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute left-0 top-24 w-1 h-10 rounded-r-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute left-0 top-40 w-1 h-10 rounded-r-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  );
}

function FeatureText({ feature, visible }: { feature: typeof FEATURES[0]; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-5"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{ background: `${feature.color}18`, color: feature.color, border: `1px solid ${feature.color}35` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: feature.color }} />
            {feature.tag}
          </div>

          <h2
            className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight"
            style={{ color: 'var(--text-primary)', whiteSpace: 'pre-line' }}
          >
            {feature.headline}
          </h2>

          <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            {feature.body}
          </p>

          <div
            className="h-0.5 w-16 rounded-full"
            style={{ background: feature.color }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressDots({
  total,
  active,
  activeColor,
  onChange,
}: {
  total: number;
  active: number;
  activeColor: string;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex gap-2.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? 24 : 8,
            height: 8,
            background: i === active ? activeColor : 'var(--border)',
          }}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
}

const SCROLL_PANEL_COUNT = 1 + FEATURES.length;

function phoneFeatureIndexForPanel(panel: number) {
  return panel <= 0 ? 0 : panel - 1;
}

/** Matches Framer offset ["start start", "end end"]: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom. */
function getStoryScrollMetrics(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY;
  const elTopDoc = rect.top + scrollY;
  const elHeight = el.offsetHeight;
  const vh = window.innerHeight;
  const track = elHeight - vh;
  return { elTopDoc, track };
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  const syncPanelFromScroll = useCallback(() => {
    const el = featuresRef.current;
    if (!el) return;
    const { elTopDoc, track } = getStoryScrollMetrics(el);
    if (track <= 0) {
      setActivePanel(0);
      return;
    }
    const raw = (window.scrollY - elTopDoc) / track;
    const progress = Math.min(1, Math.max(0, raw));
    const index = Math.min(
      Math.floor(progress * SCROLL_PANEL_COUNT),
      SCROLL_PANEL_COUNT - 1
    );
    setActivePanel(index);
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

  const phoneFeatureIndex = phoneFeatureIndexForPanel(activePanel);
  const featureForGlow = FEATURES[phoneFeatureIndex];

  const scrollToPanel = (panelIndex: number) => {
    const el = featuresRef.current;
    if (!el) return;
    const { elTopDoc, track } = getStoryScrollMetrics(el);
    const clamped = Math.max(0, Math.min(panelIndex, SCROLL_PANEL_COUNT - 1));
    const targetScroll = elTopDoc + (clamped / SCROLL_PANEL_COUNT) * Math.max(0, track);
    window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
  };

  const dotActiveColor =
    activePanel === 0 ? FEATURES[0].color : FEATURES[activePanel - 1].color;

  return (
    <div ref={containerRef} style={{ background: 'var(--bg)' }}>
      {/* Hero + feature story: scroll progress starts at first viewport (panel 0). */}
      <section
        ref={featuresRef}
        style={{ height: `${SCROLL_PANEL_COUNT * 100}vh` }}
        className="relative"
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

          {/* Background glow that morphs with the phone feature */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ background: `radial-gradient(ellipse at 65% 50%, ${featureForGlow.glow} 0%, transparent 65%)` }}
            transition={{ duration: 0.8 }}
          />

          {/* Nav */}
          <nav className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-16 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">💸</span>
              <span className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Spendrift
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/privacy_policy"
                className="text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-secondary)' }}
              >
                Privacy
              </Link>
              <a
                href="mailto:punase.ronak99@gmail.com"
                className="text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-secondary)' }}
              >
                Contact
              </a>
            </div>
          </nav>

          <div className="relative z-10 flex-1 flex items-center min-h-0">
            <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-16 py-8">
              {/* Left: hero on panel 0, then feature copy */}
              <div className="flex-1 max-w-lg space-y-8 w-full">
                {activePanel === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8"
                      style={{ background: 'rgba(124, 110, 245, 0.12)', color: '#7c6ef5', border: '1px solid rgba(124,110,245,0.25)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Now available on the App Store
                    </div>

                    <h1
                      className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6"
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

                    <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                      Track expenses, set budgets, and reach your savings goals —
                      all completely private and on your device.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 items-start">
                      <a
                        href="#"
                        className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-2xl"
                        style={{
                          background: 'var(--text-primary)',
                          color: 'var(--bg)',
                          boxShadow: '0 8px 32px rgba(124,110,245,0.25)',
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Download on the App Store
                      </a>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
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

                <ProgressDots
                  total={SCROLL_PANEL_COUNT}
                  active={activePanel}
                  activeColor={dotActiveColor}
                  onChange={scrollToPanel}
                />
              </div>

              {/* Right: phone */}
              <motion.div
                className="flex-shrink-0 relative"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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

                <PhoneFrame activeFeature={phoneFeatureIndex} />
              </motion.div>
            </div>
          </div>

          {/* Scroll hint — only on first panel; scrolling advances panels immediately */}
          {activePanel === 0 && (
            <motion.div
              className="relative z-10 flex flex-col items-center gap-2 pb-8 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll to explore</p>
              <motion.div
                className="w-px h-10"
                style={{ background: 'linear-gradient(to bottom, var(--border), transparent)' }}
                animate={{ scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}

          {/* Panel counter */}
          <div className="absolute top-20 lg:top-24 right-8 lg:right-16 text-right pointer-events-none">
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

      {/* ── CTA SECTION ── */}
      <section className="relative py-40 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, #7c6ef5 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-5xl mb-6">💸</div>
            <h2
              className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Take control of your
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c6ef5, #5ee7df)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                financial future.
              </span>
            </h2>

            <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Join thousands of people already using Spendrift to build better money habits.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:scale-[1.03]"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                boxShadow: '0 16px 48px rgba(124,110,245,0.35)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store — Free
            </a>

            <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
              No account required · No data collection · Works offline
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-10 px-8 lg:px-16"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💸</span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Spendrift</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link href="/privacy_policy" className="hover:opacity-70 transition-opacity">
              Privacy Policy
            </Link>
            <a href="mailto:punase.ronak99@gmail.com" className="hover:opacity-70 transition-opacity">
              Contact
            </a>
            <span>© 2026 Spendrift</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
