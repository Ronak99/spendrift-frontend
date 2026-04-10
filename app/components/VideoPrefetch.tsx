'use client';

import { useEffect } from 'react';
import { FEATURE_VIDEO_SOURCES } from '@/lib/feature-videos';

/**
 * Warms the browser media cache for all feature videos as soon as the app loads.
 */
export default function VideoPrefetch() {
  useEffect(() => {
    const elements = FEATURE_VIDEO_SOURCES.map((src) => {
      const v = document.createElement('video');
      v.preload = 'auto';
      v.muted = true;
      v.playsInline = true;
      v.src = src;
      v.setAttribute('playsinline', '');
      v.load();
      return v;
    });
    return () => {
      for (const v of elements) {
        v.removeAttribute('src');
        v.load();
      }
    };
  }, []);

  return null;
}
