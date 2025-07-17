import React, { useEffect, Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { useTheme } from "./hooks/useTheme";
import SEOHead from "./components/SEOHead";
import ErrorBoundary from "./components/ErrorBoundary";
import TypingEffect from "./components/TypingEffect";
import "./App.css";
import "./styles/performance.css";
import "./styles/animations.css";

// Lazy load components with error handling
const Competencias = lazy(() =>
  import("./components/Competencias").catch(() => ({
    default: () => <div className="error-message">Error loading Skills</div>,
  }))
);
const GraficoTecnologias = lazy(() =>
  import("./components/GraficoTecnologias").catch(() => ({
    default: () => (
      <div className="error-message">Error loading Technologies Chart</div>
    ),
  }))
);
const Sintese = lazy(() =>
  import("./components/Sintese").catch(() => ({
    default: () => <div className="error-message">Error loading Summary</div>,
  }))
);
const Experiencias = lazy(() =>
  import("./components/Experiencias").catch(() => ({
    default: () => (
      <div className="error-message">Error loading Experience</div>
    ),
  }))
);
const ProfessionalLinks = lazy(() =>
  import("./components/ProfessionalLinks").catch(() => ({
    default: () => (
      <div className="error-message">Error loading Professional Links</div>
    ),
  }))
);
const Contact = lazy(() =>
  import("./components/Contact").catch(() => ({
    default: () => <div className="error-message">Error loading Contact</div>,
  }))
);

const LoadingSpinner = React.memo(({ text = "Loading..." }) => (
  <div
    className="loading-spinner"
    role="status"
    aria-live="polite"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      minHeight: "200px",
    }}
  >
    <div className="spinner-border" role="status">
      <span className="visually-hidden">{text}</span>
    </div>
    <span className="ms-2">{text}</span>
  </div>
));

function AppContent() {
  const { darkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <>
      <SEOHead
        title={t("heroTitle")}
        description={t("heroSubtitle")}
        section="home"
      />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div
        className={darkMode ? "dark-theme" : "light-theme"}
        id="main-content"
        role="main"
      >
        {/* Simplified Hero Section */}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 10 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  style={{
                    minHeight: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00ff41",
                    fontSize: "4rem",
                    fontWeight: "800",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "2px solid #00ff41",
                  }}
                >
                  <TypingEffect
                    texts={["Rafael Jovaneli", "Java Developer"]}
                    speed={100}
                    deleteSpeed={50}
                    pauseTime={2000}
                    loop={true}
                    startDelay={0}
                    cursor="|"
                    className="hero-typing"
                  />
                </div>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {t("heroSubtitle")}
              </motion.p>

              <motion.div
                className="hero-buttons"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <button
                  className="btn-primary hover-lift"
                  onClick={() => scrollTo("about")}
                >
                  {t("aboutMe")}
                </button>
                <button
                  className="btn-secondary hover-lift"
                  onClick={() => scrollTo("experience")}
                >
                  {t("experiences")}
                </button>
                <button
                  className="btn-tertiary hover-lift"
                  onClick={() => scrollTo("contact")}
                >
                  {t("contactMe")}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Simplified Navigation */}
        <motion.nav
          className="navbar"
          id="navigation"
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="nav-container">
            <div
              className="nav-brand"
              role="button"
              tabIndex={0}
              aria-label="Rafael Henrique Jovaneli - Go to top"
              onClick={() => scrollTo("main-content")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollTo("main-content");
                }
              }}
            >
              RHJ
            </div>

            <div
              className="nav-center"
              role="menubar"
              aria-label="Navigation menu"
            >
              <button
                onClick={() => scrollTo("about")}
                role="menuitem"
                aria-label={`Navigate to ${t("about")} section`}
              >
                {t("about")}
              </button>
              <button
                onClick={() => scrollTo("skills")}
                role="menuitem"
                aria-label={`Navigate to ${t("skills")} section`}
              >
                {t("skills")}
              </button>
              <button
                onClick={() => scrollTo("experience")}
                role="menuitem"
                aria-label={`Navigate to ${t("experience")} section`}
              >
                {t("experience")}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                role="menuitem"
                aria-label={`Navigate to ${t("contact")} section`}
              >
                {t("contact")}
              </button>
            </div>

            <div className="nav-controls">
              <button
                className="flag-toggle"
                onClick={toggleLanguage}
                title={
                  language === "pt"
                    ? "Switch to English"
                    : "Mudar para Português"
                }
                aria-label={
                  language === "pt"
                    ? "Switch to English"
                    : "Mudar para Português"
                }
              >
                <div
                  className={`flag-icon flag-${
                    language === "pt" ? "us" : "br"
                  }`}
                  aria-hidden="true"
                ></div>
              </button>

              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                aria-label={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="theme-icon" aria-hidden="true">
                  {darkMode ? "☀️" : "🌙"}
                </span>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* About Section */}
        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="container">
            <ErrorBoundary fallback={<div>Error loading About section</div>}>
              <Suspense
                fallback={<LoadingSpinner text="Loading About Section..." />}
              >
                <Sintese />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="section alt-bg"
          aria-labelledby="skills-heading"
        >
          <div className="container">
            <div className="skills-grid">
              <div className="skills-left">
                <ErrorBoundary fallback={<div>Error loading Skills</div>}>
                  <Suspense
                    fallback={<LoadingSpinner text="Loading Skills..." />}
                  >
                    <Competencias />
                  </Suspense>
                </ErrorBoundary>
              </div>
              <div className="skills-right">
                <ErrorBoundary
                  fallback={<div>Error loading Technologies Chart</div>}
                >
                  <Suspense
                    fallback={
                      <LoadingSpinner text="Loading Technologies Chart..." />
                    }
                  >
                    <GraficoTecnologias />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="section"
          aria-labelledby="experience-heading"
        >
          <div className="container">
            <ErrorBoundary fallback={<div>Error loading Experience</div>}>
              <Suspense
                fallback={<LoadingSpinner text="Loading Experience..." />}
              >
                <Experiencias />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        {/* Professional Links Section */}
        <section
          id="professional"
          className="section alt-bg"
          aria-labelledby="professional-heading"
        >
          <div className="container">
            <ErrorBoundary
              fallback={<div>Error loading Professional Links</div>}
            >
              <Suspense
                fallback={
                  <LoadingSpinner text="Loading Professional Links..." />
                }
              >
                <ProfessionalLinks />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="section"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <ErrorBoundary fallback={<div>Error loading Contact</div>}>
              <Suspense fallback={<LoadingSpinner text="Loading Contact..." />}>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        {/* Floating Contact Button */}
        <button
          className="floating-contact-btn"
          onClick={() => scrollTo("contact")}
          title={t("contactMe")}
          aria-label={t("contactMe")}
        >
          <i className="fas fa-envelope"></i>
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
