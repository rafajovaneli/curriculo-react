import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

function Sintese() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: "fas fa-trophy",
      text: t("achievementExperience"),
      color: "#f59e0b",
    },
    {
      icon: "fas fa-building",
      text: t("achievementCorporations"),
      color: "#3b82f6",
    },
    {
      icon: "fas fa-users",
      text: t("achievementLeadership"),
      color: "#10b981",
    },
    {
      icon: "fas fa-globe",
      text: t("achievementInternational"),
      color: "#8b5cf6",
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
      <div className="section-header">
        <h2 className="section-title">{t("aboutTitle")}</h2>
        <div className="section-underline"></div>
      </div>

      {/* Achievement Badges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="unified-card"
            style={{
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <i
              className={achievement.icon}
              style={{
                fontSize: "2rem",
                color: achievement.color,
                marginBottom: "0.75rem",
                display: "block",
              }}
            ></i>
            <span
              style={{
                fontWeight: "600",
                color: "var(--text-color)",
                fontSize: "0.95rem",
              }}
            >
              {achievement.text}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="unified-card" style={{ padding: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
            }}
          >
            <i
              className="fas fa-code"
              style={{
                color: "white",
                fontSize: "1.5rem",
              }}
            ></i>
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                color: "var(--primary-color)",
                fontSize: "1.4rem",
                fontWeight: "700",
              }}
            >
              {t("roleTitle")}
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "1rem",
              }}
            >
              {t("roleSubtitle")}
            </p>
          </div>
        </div>

        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: "400",
            color: "var(--text-color)",
            marginBottom: "2rem",
            lineHeight: "1.7",
          }}
        >
          {t("aboutDescription")}
        </p>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(99, 102, 241, 0.08)",
              borderRadius: "12px",
              borderLeft: "4px solid var(--primary-color)",
            }}
          >
            <h4
              style={{
                color: "var(--primary-color)",
                marginBottom: "0.75rem",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              <i
                className="fas fa-briefcase"
                style={{ marginRight: "0.75rem" }}
              ></i>
              {t("corporateExperience")}
            </h4>
            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                color: "var(--text-color)",
              }}
            >
              {t("corporateDescription")}
            </p>
          </div>

          <div
            style={{
              padding: "1.5rem",
              background: "rgba(6, 182, 212, 0.08)",
              borderRadius: "12px",
              borderLeft: "4px solid var(--accent-color)",
            }}
          >
            <h4
              style={{
                color: "var(--accent-color)",
                marginBottom: "0.75rem",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              <i className="fas fa-cogs" style={{ marginRight: "0.75rem" }}></i>
              {t("techStack")}
            </h4>
            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                color: "var(--text-color)",
              }}
            >
              {t("techDescription")}
            </p>
          </div>

          <div
            style={{
              padding: "1.5rem",
              background: "rgba(16, 185, 129, 0.08)",
              borderRadius: "12px",
              borderLeft: "4px solid var(--accent-secondary)",
            }}
          >
            <h4
              style={{
                color: "var(--accent-secondary)",
                marginBottom: "0.75rem",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              <i
                className="fas fa-users-cog"
                style={{ marginRight: "0.75rem" }}
              ></i>
              {t("leadershipMethodologies")}
            </h4>
            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                color: "var(--text-color)",
              }}
            >
              {t("leadershipDescription")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sintese;
