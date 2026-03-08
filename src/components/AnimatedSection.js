import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useReducedMotion } from "../hooks/useReducedMotion";

const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  ...props
}) => {
  const { elementRef, isVisible } = useScrollAnimation(
    0.1,
    "0px 0px -100px 0px"
  );
  const prefersReducedMotion = useReducedMotion();

  const animations = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    slideInUp: {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  // Respect reduced motion preferences
  const animationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        variants: {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        },
        transition: { duration: 0.01 },
      }
    : {
        initial: "hidden",
        animate: isVisible ? "visible" : "hidden",
        variants: selectedAnimation,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
