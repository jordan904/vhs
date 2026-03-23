import { useState, useEffect, useRef, useCallback } from "react";

interface CountUpOptions {
  duration?: number;
  delay?: number;
}

export function useCountUp(target: number, options: CountUpOptions = {}) {
  const { duration = 1200, delay = 0 } = options;
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setValue(target);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.disconnect();

            setTimeout(() => {
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Cubic ease-out
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                setValue(current);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setValue(target);
                  setDone(true);
                }
              };

              requestAnimationFrame(animate);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, delay]);

  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  return { ref, value, done };
}
