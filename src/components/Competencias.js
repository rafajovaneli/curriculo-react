import React, { memo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const Competencias = memo(function Competencias() {
  const { t } = useLanguage();

  const competencias = [
    {
      icon: "fas fa-language",
      text: t("competenciaLanguages"),
      color: "#6366f1",
    },
    {
      icon: "fab fa-java",
      text: t("competenciaJava"),
      color: "#f59e0b",
    },
    {
      icon: "fas fa-cogs",
      text: t("competenciaReactive"),
      color: "#10b981",
    },
    {
      icon: "fas fa-tasks",
      text: t("competenciaAgile"),
      color: "#06b6d4",
    },
    {
      icon: "fas fa-user-check",
      text: t("competenciaCommunication"),
      color: "#8b5cf6",
    },
    {
      icon: "fas fa-users-cog",
      text: t("competenciaLeadership"),
      color: "#ef4444",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="fade-in-up"
    >
      <div className="section-header section-header-left">
        <h3 className="section-title section-title-compact">
          {t("competenciasTitle")}
        </h3>
        <div className="section-underline section-underline-compact"></div>
      </div>

      <div className="unified-card">
        <div className="competencies-list">
          {competencias.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`competency-item ${
                index === competencias.length - 1 ? "is-last" : ""
              }`}
              whileHover={{
                x: 8,
                transition: { duration: 0.2 },
              }}
            >
              {/* Icon Container */}
              <div
                className="competency-icon"
                style={{
                  "--competency-accent": comp.color,
                }}
              >
                <i className={comp.icon}></i>
              </div>

              {/* Text Content */}
              <div className="competency-content">
                <p className="competency-text">{comp.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default Competencias;
