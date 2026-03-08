import { useCallback } from "react";

export const useSmoothScroll = () => {
  const scrollTo = useCallback((elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    // Smooth scroll with easing
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) / 2, 800); // Max 800ms
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Update URL hash
        window.history.pushState(null, null, `#${elementId}`);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToTop = useCallback(() => {
    const startPosition = window.scrollY;
    const duration = Math.min(startPosition / 3, 600);
    let start = null;

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return { scrollTo, scrollToTop };
};
