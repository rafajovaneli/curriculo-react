import { useState, useEffect } from "react";

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      setPrefersReducedMotion(false);
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) {
      setPrefersReducedMotion(false);
      return undefined;
    }

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Animation configuration based on motion preference
export const getAnimationConfig = (prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      ease: "linear",
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 },
    };
  }

  return {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  };
};
