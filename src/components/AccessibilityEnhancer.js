import React, { useEffect, useState } from "react";

const AccessibilityEnhancer = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const prefersHighContrast = window.matchMedia(
      "(prefers-contrast: high)"
    ).matches;

    setReducedMotion(prefersReducedMotion);
    setHighContrast(prefersHighContrast);

    // Load saved preferences
    const savedHighContrast =
      localStorage.getItem("accessibility-high-contrast") === "true";
    const savedFontSize =
      localStorage.getItem("accessibility-font-size") || "normal";
    const savedReducedMotion =
      localStorage.getItem("accessibility-reduced-motion") === "true";

    setHighContrast(savedHighContrast || prefersHighContrast);
    setFontSize(savedFontSize);
    setReducedMotion(savedReducedMotion || prefersReducedMotion);

    // Apply settings
    document.documentElement.setAttribute(
      "data-high-contrast",
      savedHighContrast || prefersHighContrast
    );
    document.documentElement.setAttribute("data-font-size", savedFontSize);
    document.documentElement.setAttribute(
      "data-reduced-motion",
      savedReducedMotion || prefersReducedMotion
    );

    // Enhanced keyboard navigation
    const handleKeyDown = (e) => {
      // Skip links functionality
      if (e.key === "Tab" && e.target.classList.contains("skip-link")) {
        const targetId = e.target.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.focus();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Escape key functionality
      if (e.key === "Escape") {
        const activeElement = document.activeElement;
        if (
          activeElement &&
          activeElement.classList.contains("accessibility-btn")
        ) {
          activeElement.blur();
        }
      }

      // Arrow key navigation for toolbar
      if (e.target.classList.contains("accessibility-btn")) {
        const toolbar = e.target.closest(".accessibility-toolbar");
        const buttons = Array.from(
          toolbar.querySelectorAll(".accessibility-btn")
        );
        const currentIndex = buttons.indexOf(e.target);

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % buttons.length;
          buttons[nextIndex].focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex =
            (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[prevIndex].focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus management
    const handleFocusIn = (e) => {
      if (e.target.matches("button, a, input, textarea, select, [tabindex]")) {
        e.target.classList.add("keyboard-focused");
      }
    };

    const handleFocusOut = (e) => {
      e.target.classList.remove("keyboard-focused");
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const announce = (message, priority = "polite") => {
    const id = Date.now();
    setAnnouncements((prev) => [...prev, { id, message, priority }]);

    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 1000);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    document.documentElement.setAttribute("data-high-contrast", newValue);
    localStorage.setItem("accessibility-high-contrast", newValue);
    announce(`High contrast ${newValue ? "enabled" : "disabled"}`);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.documentElement.setAttribute("data-font-size", size);
    localStorage.setItem("accessibility-font-size", size);
    announce(`Font size changed to ${size}`);
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    document.documentElement.setAttribute("data-reduced-motion", newValue);
    localStorage.setItem("accessibility-reduced-motion", newValue);
    announce(`Reduced motion ${newValue ? "enabled" : "disabled"}`);
  };

  // Expose announce function globally
  useEffect(() => {
    window.announceToScreenReader = announce;
    return () => {
      delete window.announceToScreenReader;
    };
  }, []);

  return (
    <>
      {/* Skip Links */}
      <div className="skip-links">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#navigation" className="skip-link">
          Skip to navigation
        </a>
        <a href="#about" className="skip-link">
          Skip to about section
        </a>
        <a href="#contact" className="skip-link">
          Skip to contact
        </a>
      </div>

      {/* Accessibility Toolbar */}
      <div
        className="accessibility-toolbar"
        role="toolbar"
        aria-label="Accessibility Options"
        tabIndex="-1"
      >
        <button
          onClick={toggleHighContrast}
          aria-pressed={highContrast}
          title="Toggle High Contrast Mode"
          className="accessibility-btn"
          type="button"
        >
          <span className="visually-hidden">Toggle High Contrast</span>
          <span aria-hidden="true">🎨</span>
        </button>

        <div
          className="font-size-controls"
          role="group"
          aria-label="Font Size Controls"
        >
          <button
            onClick={() => changeFontSize("small")}
            aria-pressed={fontSize === "small"}
            title="Decrease Font Size"
            className="accessibility-btn"
            type="button"
          >
            <span className="visually-hidden">Small Font</span>
            A-
          </button>
          <button
            onClick={() => changeFontSize("normal")}
            aria-pressed={fontSize === "normal"}
            title="Normal Font Size"
            className="accessibility-btn"
            type="button"
          >
            <span className="visually-hidden">Normal Font</span>A
          </button>
          <button
            onClick={() => changeFontSize("large")}
            aria-pressed={fontSize === "large"}
            title="Increase Font Size"
            className="accessibility-btn"
            type="button"
          >
            <span className="visually-hidden">Large Font</span>
            A+
          </button>
        </div>

        <button
          onClick={toggleReducedMotion}
          aria-pressed={reducedMotion}
          title="Toggle Reduced Motion"
          className="accessibility-btn"
          type="button"
        >
          <span className="visually-hidden">Toggle Reduced Motion</span>
          <span aria-hidden="true">⏸️</span>
        </button>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-announcements">
        {announcements.map(({ id, message, priority }) => (
          <div
            key={id}
            aria-live={priority}
            aria-atomic="true"
            className="visually-hidden"
          >
            {message}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccessibilityEnhancer;
