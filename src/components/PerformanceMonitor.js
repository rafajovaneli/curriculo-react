import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      if (process.env.NODE_ENV === "development") {
        console.log(`${metric.name}: ${metric.value}`, metric);
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === "production" && window.gtag) {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          value: Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value
          ),
          event_label: metric.id,
          non_interaction: true,
        });
      }
    };

    // Dynamically import web-vitals to avoid blocking
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    });

    // Monitor long tasks
    if ("PerformanceObserver" in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration}ms`, entry);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });

        // Monitor layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput && entry.value > 0.1) {
              console.warn(`Layout shift detected: ${entry.value}`, entry);
            }
          }
        });
        layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });

        return () => {
          longTaskObserver.disconnect();
          layoutShiftObserver.disconnect();
        };
      } catch (error) {
        console.warn("Performance monitoring not supported:", error);
      }
    }
  }, []);

  // Monitor memory usage
  useEffect(() => {
    const checkMemoryUsage = () => {
      if ("memory" in performance) {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);

        if (usedMB > limitMB * 0.8) {
          console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`);
        }

        if (process.env.NODE_ENV === "development") {
          console.log(
            `Memory usage: ${usedMB}MB / ${totalMB}MB (limit: ${limitMB}MB)`
          );
        }
      }
    };

    const interval = setInterval(checkMemoryUsage, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default PerformanceMonitor;
