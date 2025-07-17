import React, { useEffect, Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { usePerformance } from "./hooks/usePerformance";
import { useTheme } from "./hooks/useTheme";
import SEOHead from "./components/SEOHead";
import PerformanceMonitor from "./components/PerformanceMonitor";
import ErrorBoundary from "./components/ErrorBoundary";
import AccessibilityEnhancer from "./components/AccessibilityEnhancer";
import TypingEffect from "./components/TypingEffect";
import EnhancedParticleSystem, {
  MatrixParticles,
} from "./components/EnhancedParticleSystem";
import { SectionTransition } from "./components/PageTransition";
import ScrollProgressIndicator, {
  SectionProgressIndicator,
} from "./components/ScrollProgressIndicator";
import "./App.css";
import "./styles/performance.css";
import "./styles/animations.css";
const Competencias = lazy(() =>
  import("./components/Competencias").catch(() => ({
    default: () => <div>Error loading Skills</div>,
  }))
);
const GraficoTecnologias = lazy(() =>
  import("./components/GraficoTecnologias").catch(() => ({
    default: () => <div>Error loading Technologies Chart</div>,
  }))
);
const Sintese = lazy(() =>
  import("./components/Sintese").catch(() => ({
    default: () => <div>Error loading Summary</div>,
  }))
);
const Experiencias = lazy(() =>
  import("./components/Experiencias").catch(() => ({
    default: () => <div>Error loading Experience</div>,
  }))
);
const ProfessionalLinks = lazy(() =>
  import("./components/ProfessionalLinks").catch(() => ({
    default: () => <div>Error loading Professional Links</div>,
  }))
);
const Contact = lazy(() =>
  import("./components/Contact").catch(() => ({
    default: () => <div>Error loading Contact</div>,
  }))
);
const DynamicCursor = lazy(() =>
  import("./components/DynamicCursor").catch(() => ({ default: () => null }))
);
const TechBackground = lazy(() =>
  import("./components/TechBackground").catch(() => ({ default: () => null }))
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
  const { preloadResource, prefetchResource, dnsPrefetch, preconnect } =
    usePerformance();

  useEffect(() => {
    preconnect("https://fonts.googleapis.com", true);
    preconnect("https://fonts.gstatic.com", true);
    dnsPrefetch("github.com");
    dnsPrefetch("linkedin.com");

    preloadResource(
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "style"
    );

    const prefetchImages = () => {
      const imagesToPrefetch = ["/logo192.png", "/logo512.png", "/favicon.ico"];
      imagesToPrefetch.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    setTimeout(prefetchImages, 2000);
    setTimeout(() => {
      prefetchResource("#about");
      prefetchResource("#skills");
    }, 3000);
  }, [preloadResource, prefetchResource, dnsPrefetch, preconnect]);

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
      <PerformanceMonitor />
      <AccessibilityEnhancer />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      <a href="#contact" className="skip-link">
        Skip to contact
      </a>

      <div
        className={darkMode ? "dark-theme" : "light-theme"}
        id="main-content"
        role="main"
      >
        <Suspense fallback={null}>
          <TechBackground />
        </Suspense>

        <Suspense fallback={null}>
          <DynamicCursor />
        </Suspense>
        <EnhancedParticleSystem
          particleCount={100}
          particleColor={darkMode ? "#00ff41" : "#007bff"}
          speed={0.8}
          connectionDistance={150}
          interactive={true}
          mouseRadius={250}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "none",
            opacity: darkMode ? 0.6 : 0.4,
          }}
        />

        {darkMode && (
          <MatrixParticles
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 2,
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />
        )}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ position: "relative", zIndex: 10 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
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
                    texts={["Rafael Jovaneli", "Full Stack Developer"]}
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
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {t("heroSubtitle")}
              </motion.p>

              <motion.div
                className="hero-buttons"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <motion.button
                  className="btn-primary hover-lift"
                  onClick={() => scrollTo("about")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t("aboutMe")}
                </motion.button>
                <motion.button
                  className="btn-secondary hover-lift"
                  onClick={() => scrollTo("experience")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t("experiences")}
                </motion.button>
                <motion.button
                  className="btn-tertiary hover-lift"
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t("contactMe")}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <ScrollProgressIndicator
          height={4}
          color={
            darkMode
              ? "linear-gradient(90deg, #00ff41, #007bff)"
              : "linear-gradient(90deg, #007bff, #00ff41)"
          }
          position="top"
        />

        <SectionProgressIndicator
          sections={[
            "about",
            "skills",
            "experience",
            "professional",
            "contact",
          ]}
        />
        <motion.nav
          className="navbar"
          id="navigation"
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div className="nav-container">
            <motion.div
              className="nav-brand"
              role="button"
              tabIndex={0}
              aria-label="Rafael Henrique Jovaneli - Go to top"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => scrollTo("main-content")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollTo("main-content");
                }
              }}
            >
              RHJ
            </motion.div>

            <div
              className="nav-center"
              role="menubar"
              aria-label="Navigation menu"
            >
              <motion.button
                onClick={() => scrollTo("about")}
                role="menuitem"
                aria-label={`Navigate to ${t("about")} section`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t("about")}
              </motion.button>
              <motion.button
                onClick={() => scrollTo("skills")}
                role="menuitem"
                aria-label={`Navigate to ${t("skills")} section`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t("skills")}
              </motion.button>
              <motion.button
                onClick={() => scrollTo("experience")}
                role="menuitem"
                aria-label={`Navigate to ${t("experience")} section`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t("experience")}
              </motion.button>
              <motion.button
                onClick={() => scrollTo("contact")}
                role="menuitem"
                aria-label={`Navigate to ${t("contact")} section`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t("contact")}
              </motion.button>
            </div>

            <div className="nav-controls">
              <motion.button
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
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className={`flag-icon flag-${
                    language === "pt" ? "us" : "br"
                  }`}
                  aria-hidden="true"
                  animate={{ rotateY: language === "pt" ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                ></motion.div>
              </motion.button>

              <motion.button
                className="theme-toggle"
                onClick={toggleTheme}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                aria-label={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  className="theme-icon"
                  aria-hidden="true"
                  animate={{
                    rotate: darkMode ? 0 : 180,
                    scale: darkMode ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {darkMode ? "☀️" : "🌙"}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        <SectionTransition delay={0.2} direction="up">
          <section
            id="about"
            className="section"
            aria-labelledby="about-heading"
          >
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
        </SectionTransition>

        <SectionTransition delay={0.3} direction="left">
          <section
            id="skills"
            className="section alt-bg"
            aria-labelledby="skills-heading"
          >
            <div className="container">
              <motion.div
                className="skills-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.3,
                    },
                  },
                }}
              >
                <motion.div
                  className="skills-left"
                  variants={{
                    hidden: { x: -50, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <ErrorBoundary fallback={<div>Error loading Skills</div>}>
                    <Suspense
                      fallback={<LoadingSpinner text="Loading Skills..." />}
                    >
                      <Competencias />
                    </Suspense>
                  </ErrorBoundary>
                </motion.div>
                <motion.div
                  className="skills-right"
                  variants={{
                    hidden: { x: 50, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
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
                </motion.div>
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        <SectionTransition delay={0.2} direction="up">
          <section
            id="experience"
            className="section"
            aria-labelledby="experience-heading"
          >
            <div className="container">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ErrorBoundary fallback={<div>Error loading Experience</div>}>
                  <Suspense
                    fallback={<LoadingSpinner text="Loading Experience..." />}
                  >
                    <Experiencias />
                  </Suspense>
                </ErrorBoundary>
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        <SectionTransition delay={0.4} direction="right">
          <section
            id="professional"
            className="section alt-bg"
            aria-labelledby="professional-heading"
          >
            <div className="container">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.8,
                }}
              >
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
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        <SectionTransition delay={0.3} direction="up">
          <section
            id="contact"
            className="section"
            aria-labelledby="contact-heading"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <ErrorBoundary fallback={<div>Error loading Contact</div>}>
                  <Suspense
                    fallback={<LoadingSpinner text="Loading Contact..." />}
                  >
                    <Contact />
                  </Suspense>
                </ErrorBoundary>
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        <motion.button
          className="floating-contact-btn"
          onClick={() => scrollTo("contact")}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 2,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={t("contactMe")}
          aria-label={t("contactMe")}
        >
          <i className="fas fa-envelope"></i>
        </motion.button>
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
