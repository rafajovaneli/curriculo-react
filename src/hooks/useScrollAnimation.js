import { useEffect, useRef, useState, useCallback } from "react";

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    easing = "ease-out",
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const observe = useCallback(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const shouldTrigger =
          entry.isIntersecting && (!triggerOnce || !hasTriggered);

        if (shouldTrigger) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
              observerRef.current?.disconnect();
            }
          }, delay);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(elementRef.current);
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay]);

  useEffect(() => {
    observe();
    return () => observerRef.current?.disconnect();
  }, [observe]);

  const animationStyle = {
    transition: `all ${duration}s ${easing}`,
    transform: isVisible
      ? "translateY(0) scale(1)"
      : "translateY(50px) scale(0.95)",
    opacity: isVisible ? 1 : 0,
  };

  return { elementRef, isVisible, animationStyle };
};

// Advanced scroll animations with different effects
export const useScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollY(currentScrollY);
      setScrollProgress(currentScrollY / documentHeight);
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return { scrollY, scrollDirection, scrollProgress };
};

// Parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;

      setOffset(rate);
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [speed]);

  const parallaxStyle = {
    transform: `translateY(${offset}px)`,
  };

  return { elementRef, parallaxStyle };
};

// Utility function for throttling
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Stagger animation for multiple elements
export const useStaggerAnimation = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of child elements
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]));
            }, i * delay);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [itemCount, delay]);

  const getItemStyle = (index) => ({
    opacity: visibleItems.has(index) ? 1 : 0,
    transform: visibleItems.has(index) ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.6s ease-out",
  });

  return { containerRef, getItemStyle, visibleItems };
};

export default useScrollAnimation;
