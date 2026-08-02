"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Deterministic "reveal when in view" hook.
 *
 * framer-motion's `whileInView` relies on its internal IntersectionObserver and
 * intermittently never fires for elements that are already in the viewport at
 * mount (heroes, above-the-fold sections), leaving them stuck at `opacity: 0`.
 *
 * This hook fixes that by:
 *  - synchronously revealing anything already on screen at mount, and
 *  - using a plain IntersectionObserver (which reliably fires its initial
 *    callback) only for below-the-fold content.
 */
export function useRevealInView<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewportHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
