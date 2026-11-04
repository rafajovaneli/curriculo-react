import React, { useState, useEffect } from "react";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      // A page without scroll would divide by zero.
      setScrollProgress(winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
