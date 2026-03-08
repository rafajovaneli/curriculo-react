import { useState, useEffect } from "react";

export const useScrollVisibility = (threshold = 300) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    toggleVisibility();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
};
