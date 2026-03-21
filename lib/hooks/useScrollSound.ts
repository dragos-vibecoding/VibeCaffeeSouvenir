'use client';

import { useEffect, useRef } from 'react';
import { playSplashIn, playSplashOut, warmUpAudio } from '@/lib/sounds';

/**
 * Hook care asculta intrarea/iesirea sectiunii din viewport
 * si reda sunete corespunzatoare.
 * AudioContext e pre-incalzit la primul interact al userului.
 */
export function useScrollSound(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const wasVisible = useRef(false);
  const warmedUp = useRef(false);

  useEffect(() => {
    // Pre-incalzim AudioContext la primul interact
    const warm = () => {
      if (warmedUp.current) return;
      warmedUp.current = true;
      warmUpAudio();
    };
    window.addEventListener('pointerdown', warm, { once: true });
    window.addEventListener('scroll', warm, { once: true, passive: true });

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible.current) {
          playSplashIn();
          wasVisible.current = true;
        } else if (!isVisible && wasVisible.current) {
          playSplashOut();
          wasVisible.current = false;
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointerdown', warm);
      window.removeEventListener('scroll', warm);
    };
  }, [threshold]);

  return ref;
}
