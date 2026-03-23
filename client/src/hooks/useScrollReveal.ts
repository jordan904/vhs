import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  maxStagger?: number;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    staggerDelay = 150,
    maxStagger = 600,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show all immediately
      const container = containerRef.current;
      if (container) {
        container.querySelectorAll(".fade-in").forEach((el) => {
          el.classList.add("visible");
        });
      }
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;

            // Check if this is a container with staggered children
            const parent = el.parentElement;
            if (parent?.classList.contains("fade-in-stagger")) {
              // Use CSS stagger delays
              el.classList.add("visible");
            } else {
              // Check siblings for JS stagger
              const siblings = parent
                ? Array.from(parent.children).filter((c) =>
                    c.classList.contains("fade-in")
                  )
                : [el];
              const index = siblings.indexOf(el);
              const delay = Math.min(index * staggerDelay, maxStagger);

              setTimeout(() => {
                el.classList.add("visible");
              }, delay);
            }

            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    const container = containerRef.current;
    if (container) {
      container.querySelectorAll(".fade-in").forEach((el) => {
        observerRef.current?.observe(el);
      });
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay, maxStagger]);

  const ref = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
  }, []);

  return ref;
}
