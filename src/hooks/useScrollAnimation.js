import { useState, useEffect, useRef } from "react";

export const useScrollAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      setHasAnimated(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  return { elementRef, isVisible, hasAnimated };
};

export const useStaggeredAnimation = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisibleItems(new Set(Array.from({ length: itemCount }, (_, index) => index)));
      return undefined;
    }

    const timeouts = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of items
          for (let i = 0; i < itemCount; i++) {
            const timeoutId = setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]));
            }, i * delay);
            timeouts.push(timeoutId);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [itemCount, delay]);

  return { containerRef, visibleItems };
};
