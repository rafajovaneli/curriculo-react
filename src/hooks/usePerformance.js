import { useEffect, useCallback, useRef, useState } from "react";

// Performance monitoring hook
export const usePerformance = () => {
  const reportWebVitals = useCallback((metric) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === "development") {
      console.log(`Performance metric: ${metric.name}`, metric);
    }

    // In production, you could send to analytics service
    // Example: analytics.track('web-vital', metric);
  }, []);

  useEffect(() => {
    // Dynamically import web-vitals to avoid blocking main bundle
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    });
  }, [reportWebVitals]);

  // Resource hints for critical resources
  const preloadResource = useCallback(
    (href, as = "script", crossorigin = false) => {
      // Avoid duplicate preloads
      if (document.querySelector(`link[href="${href}"]`)) return;

      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = as;
      if (crossorigin) link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    },
    []
  );

  // Prefetch resources for next navigation
  const prefetchResource = useCallback((href) => {
    // Avoid duplicate prefetches
    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }, []);

  // DNS prefetch for external domains
  const dnsPrefetch = useCallback((domain) => {
    if (document.querySelector(`link[href="//${domain}"]`)) return;

    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = `//${domain}`;
    document.head.appendChild(link);
  }, []);

  // Preconnect for critical external resources
  const preconnect = useCallback((href, crossorigin = false) => {
    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    if (crossorigin) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  return { preloadResource, prefetchResource, dnsPrefetch, preconnect };
};

// Custom hook for intersection observer with performance optimizations
export const useIntersectionObserver = (options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  };

  const observerRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observe = useCallback(
    (element) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, defaultOptions);

      if (element) {
        observerRef.current.observe(element);
      }
    },
    [defaultOptions]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { isIntersecting, observe };
};
