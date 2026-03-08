import { useState, useEffect } from "react";

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem("themeMode");
  } catch (error) {
    return null;
  }
};

const getSystemPrefersDark = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return Boolean(mediaQuery && mediaQuery.matches);
};

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = getStoredTheme();
    return savedTheme || "auto"; // auto, light, dark
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = getStoredTheme();
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    return getSystemPrefersDark();
  });

  useEffect(() => {
    if (!window.matchMedia) {
      setDarkMode(themeMode === "dark");
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (!mediaQuery) {
      setDarkMode(themeMode === "dark");
      return undefined;
    }

    const handleChange = (e) => {
      if (themeMode === "auto") {
        setDarkMode(e.matches);
      }
    };

    // Update dark mode based on theme mode
    if (themeMode === "auto") {
      setDarkMode(mediaQuery.matches);
    } else {
      setDarkMode(themeMode === "dark");
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  useEffect(() => {
    // Apply theme to both body and html for better coverage
    document.documentElement.className = darkMode
      ? "dark-theme"
      : "light-theme";
    document.body.className = darkMode ? "dark-theme" : "light-theme";
    try {
      window.localStorage.setItem("themeMode", themeMode);
    } catch (error) {
      // Ignore storage failures.
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", darkMode ? "#0f172a" : "#ffffff");
    }
  }, [darkMode, themeMode]);

  const toggleTheme = () => {
    const modes = ["auto", "light", "dark"];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "auto":
        return "🌓";
      default:
        return "🌓";
    }
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case "light":
        return "Light Mode";
      case "dark":
        return "Dark Mode";
      case "auto":
        return "Auto Mode";
      default:
        return "Auto Mode";
    }
  };

  return {
    darkMode,
    themeMode,
    toggleTheme,
    getThemeIcon,
    getThemeLabel,
  };
};
