// Performance utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
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

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  if ("IntersectionObserver" in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }

  // Fallback for older browsers
  return {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (document.querySelector('link[data-preload="fonts-googleapis"]')) {
    return;
  }

  const fontLink = document.createElement("link");
  fontLink.rel = "preconnect";
  fontLink.href = "https://fonts.googleapis.com";
  fontLink.setAttribute("data-preload", "fonts-googleapis");
  document.head.appendChild(fontLink);

  const fontStaticLink = document.createElement("link");
  fontStaticLink.rel = "preconnect";
  fontStaticLink.href = "https://fonts.gstatic.com";
  fontStaticLink.crossOrigin = "anonymous";
  fontStaticLink.setAttribute("data-preload", "fonts-gstatic");
  document.head.appendChild(fontStaticLink);
};

// Optimize images
export const optimizeImage = (src, width, height) => {
  const img = new Image();
  img.loading = "lazy";
  img.decoding = "async";
  if (width) img.width = width;
  if (height) img.height = height;
  img.src = src;
  return img;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationConfig = () => {
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  const isSlowConnection =
    navigator.connection && navigator.connection.effectiveType === "slow-2g";
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion || isLowEndDevice || isSlowConnection) {
    return {
      duration: 0.1,
      ease: "linear",
      staggerChildren: 0,
      delayChildren: 0,
    };
  }

  return {
    duration: 0.6,
    ease: "easeOut",
    staggerChildren: 0.1,
    delayChildren: 0.2,
  };
};
