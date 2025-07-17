import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressIndicator = ({
  className = "",
  height = 4,
  color = "linear-gradient(90deg, #00ff41, #007bff)",
  position = "top",
  showPercentage = false,
  style = {},
  ...props
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const positionStyles = {
    top: { top: 0, left: 0, right: 0 },
    bottom: { bottom: 0, left: 0, right: 0 },
    left: { left: 0, top: 0, bottom: 0, width: height },
    right: { right: 0, top: 0, bottom: 0, width: height },
  };

  const progressBarStyle = {
    position: "fixed",
    ...positionStyles[position],
    height:
      position === "left" || position === "right" ? "100%" : `${height}px`,
    background: color,
    transformOrigin:
      position === "left" || position === "right" ? "0% 0%" : "0% 50%",
    zIndex: 1000,
    ...style,
  };

  return (
    <>
      <motion.div
        className={`scroll-progress-indicator ${className}`}
        style={{
          ...progressBarStyle,
          scaleX: position === "left" || position === "right" ? 1 : scaleX,
          scaleY: position === "left" || position === "right" ? scaleX : 1,
        }}
        {...props}
      />

      {showPercentage && (
        <motion.div
          className="scroll-percentage"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: 1001,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
};

// Circular progress indicator
export const CircularScrollProgress = ({
  size = 60,
  strokeWidth = 4,
  color = "#00ff41",
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  position = { bottom: "30px", right: "30px" },
  showPercentage = true,
  className = "",
  ...props
}) => {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className={`circular-scroll-progress ${className}`}
      style={{
        position: "fixed",
        ...position,
        width: size,
        height: size,
        zIndex: 1000,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      {...props}
    >
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: useSpring(
              scrollYProgress.get() * circumference - circumference,
              { stiffness: 100, damping: 30 }
            ),
            rotate: -90,
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      {showPercentage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            fontWeight: "bold",
            color: color,
          }}
        >
          {scrollPercentage}%
        </div>
      )}
    </motion.div>
  );
};

// Section-based progress indicator
export const SectionProgressIndicator = ({
  sections = [],
  className = "",
  ...props
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);

            // Calculate progress within section
            const progress = Math.min(
              Math.max((scrollPosition - offsetTop) / offsetHeight, 0),
              1
            );

            setSectionProgress((prev) => ({
              ...prev,
              [sectionId]: progress,
            }));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div
      className={`section-progress-indicator ${className}`}
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1000,
      }}
      {...props}
    >
      {sections.map((sectionId, index) => (
        <motion.div
          key={sectionId}
          className="section-dot"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            margin: "8px 0",
            backgroundColor:
              index === activeSection ? "#00ff41" : "rgba(255, 255, 255, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          animate={{
            scale: index === activeSection ? 1.2 : 1,
            backgroundColor:
              index === activeSection ? "#00ff41" : "rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}
    </div>
  );
};

export default ScrollProgressIndicator;
