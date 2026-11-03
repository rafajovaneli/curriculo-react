import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { motion, MotionConfig } from "framer-motion";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { useTheme } from "./hooks/useTheme";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollVisibility } from "./hooks/useScrollVisibility";
import SEOHead from "./components/SEOHead";
import ErrorBoundary from "./components/ErrorBoundary";
import AnimatedSection from "./components/AnimatedSection";
import ScrollProgress from "./components/ScrollProgress";
import Competencias from "./components/Competencias";
import GraficoTecnologias from "./components/GraficoTecnologias";
import Sintese from "./components/Sintese";
import Experiencias from "./components/Experiencias";
import ProfessionalLinks from "./components/ProfessionalLinks";
import Contact from "./components/Contact";
import "./App.css";
import "./styles/optimized.css";
import { preloadCriticalResources } from "./utils/performance";

function AppContent() {
  const { darkMode, toggleTheme, getThemeIcon, getThemeLabel } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { scrollTo, scrollToTop } = useSmoothScroll();
  const showBackToTop = useScrollVisibility(400);

  // Preload critical resources on mount
  useEffect(() => {
    preloadCriticalResources();
  }, []);

  return (
    <>
      <SEOHead
        title={t("heroTitle")}
        description={t("heroSubtitle")}
        section="home"
      />

      <ScrollProgress />

      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>

        <div className={darkMode ? "dark-theme" : "light-theme"}>
        {/* Hero Section */}
        <motion.header
          className="hero-section hero-section-layered"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className="hero-eyebrow">{t("heroEyebrow")}</span>
                <span className="hero-title-shell">Rafael Jovaneli</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {t("heroSubtitle")}
              </motion.p>

              <motion.p
                className="hero-location"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {t("heroLocation")}
              </motion.p>

              <motion.div
                className="hero-value-props"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <span>{t("heroValue1")}</span>
                <span>{t("heroValue2")}</span>
                <span>{t("heroValue3")}</span>
              </motion.div>

              <motion.div
                className="hero-buttons"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <a
                  className="btn-primary hover-lift"
                  href={`${process.env.PUBLIC_URL}/${
                    language === "pt"
                      ? "CV_RAFAEL_JOVANELI_PT.pdf"
                      : "CV_RAFAEL_JOVANELI_EN.pdf"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("downloadResumeShort")}
                </a>
                <button
                  className="btn-secondary hover-lift"
                  onClick={() => scrollTo("experience")}
                >
                  {t("viewExperienceShort")}
                </button>
                <button
                  className="btn-tertiary hover-lift"
                  onClick={() => scrollTo("professional")}
                >
                  {t("professionalLinks")}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

        {/* Navigation */}
        <motion.nav
          className="navbar"
          id="navigation"
          aria-label={t("mainNavigation")}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="nav-container">
            <button
              className="nav-brand"
              type="button"
              aria-label={t("backToHome")}
              onClick={() => scrollToTop()}
            >
              RHJ
            </button>

            <ul className="nav-center">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("about")}
                  aria-label={`${t("navigateToSection")}: ${t("about")}`}
                >
                  {t("about")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("skills")}
                  aria-label={`${t("navigateToSection")}: ${t("skills")}`}
                >
                  {t("skills")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("experience")}
                  aria-label={`${t("navigateToSection")}: ${t("experience")}`}
                >
                  {t("experience")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  aria-label={`${t("navigateToSection")}: ${t("contact")}`}
                >
                  {t("contact")}
                </button>
              </li>
            </ul>

            <div className="nav-controls">
              <button
                className="flag-toggle"
                onClick={toggleLanguage}
                title={t("switchLanguageLabel")}
                aria-label={t("switchLanguageLabel")}
              >
                <span
                  className={`flag-icon flag-${
                    language === "pt" ? "us" : "br"
                  }`}
                  aria-hidden="true"
                ></span>
              </button>

              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={getThemeLabel()}
                aria-label={getThemeLabel()}
              >
                <span className="theme-icon" aria-hidden="true">
                  {getThemeIcon()}
                </span>
              </button>
            </div>
          </div>
        </motion.nav>

        <main id="main-content" tabIndex={-1}>
        {/* About Section */}
        <section id="about" className="section" aria-label={t("aboutTitle")}>
          <div className="container">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <ErrorBoundary
                fallback={
                  <div className="error-message">{t("loadError")}</div>
                }
              >
                <Sintese />
              </ErrorBoundary>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="section alt-bg"
          aria-labelledby="skills-heading"
        >
          <h2 id="skills-heading" className="visually-hidden">
            {t("skillsTitle")}
          </h2>
          <div className="container">
            <div className="skills-grid">
              <AnimatedSection
                animation="fadeInLeft"
                delay={0.1}
                className="skills-left"
              >
                <ErrorBoundary
                  fallback={
                    <div className="error-message">{t("loadError")}</div>
                  }
                >
                  <Competencias />
                </ErrorBoundary>
              </AnimatedSection>
              <AnimatedSection
                animation="fadeInRight"
                delay={0.3}
                className="skills-right"
              >
                <ErrorBoundary
                  fallback={
                    <div className="error-message">{t("loadError")}</div>
                  }
                >
                  <GraficoTecnologias />
                </ErrorBoundary>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="section"
          aria-label={t("experienceTitle")}
        >
          <div className="container">
            <AnimatedSection animation="slideInUp" delay={0.2}>
              <ErrorBoundary
                fallback={
                  <div className="error-message">{t("loadError")}</div>
                }
              >
                <Experiencias />
              </ErrorBoundary>
            </AnimatedSection>
          </div>
        </section>

        {/* Professional Links Section */}
        <section
          id="professional"
          className="section alt-bg"
          aria-label={t("professionalLinks")}
        >
          <div className="container">
            <AnimatedSection animation="scaleIn" delay={0.1}>
              <ErrorBoundary
                fallback={
                  <div className="error-message">{t("loadError")}</div>
                }
              >
                <ProfessionalLinks />
              </ErrorBoundary>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="section"
          aria-label={t("contactMe")}
        >
          <div className="container">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <ErrorBoundary
                fallback={
                  <div className="error-message">{t("loadError")}</div>
                }
              >
                <Contact />
              </ErrorBoundary>
            </AnimatedSection>
          </div>
        </section>

        </main>

        {/* Floating Contact Button */}
        <button
          className="floating-contact-btn"
          onClick={() => scrollTo("contact")}
          title={t("contactMe")}
          aria-label={t("contactMe")}
        >
          <i className="fas fa-envelope"></i>
        </button>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            className="back-to-top-btn"
            onClick={scrollToTop}
            title={t("backToTop")}
            aria-label={t("backToTop")}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.button>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
