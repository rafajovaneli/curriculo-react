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
      <div
        className="section-header"
        style={{ textAlign: "left", marginBottom: "2rem" }}
      >
        <h3
          className="section-title"
          style={{
            fontSize: "2rem",
            textAlign: "left",
            marginBottom: "0.75rem",
          }}
        >
          {t("competenciasTitle")}
        </h3>
        <div
          className="section-underline"
          style={{
            margin: "0",
            width: "50px",
          }}
        ></div>
      </div>

      <div className="unified-card">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {competencias.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom:
                  index < competencias.length - 1
                    ? "1px solid rgba(0, 0, 0, 0.08)"
                    : "none",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                x: 8,
                transition: { duration: 0.2 },
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${comp.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <i
                  className={comp.icon}
                  style={{
                    color: comp.color,
                    fontSize: "1.1rem",
                  }}
                ></i>
              </div>

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    color: "var(--text-color)",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    fontWeight: "400",
                  }}
                >
                  {comp.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default Competencias;
