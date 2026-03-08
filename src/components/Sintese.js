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
      <div className="about-achievements-grid">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="unified-card achievement-card"
          >
            <i
              className={`${achievement.icon} achievement-icon`}
              style={{ "--achievement-accent": achievement.color }}
            ></i>
            <span className="achievement-text">{achievement.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="unified-card about-summary-card">
        <div className="about-intro">
          <div className="about-avatar">
            <i className="fas fa-code"></i>
          </div>
          <div>
            <h3 className="about-role-title">{t("roleTitle")}</h3>
            <p className="about-role-subtitle">{t("roleSubtitle")}</p>
          </div>
        </div>

        <p className="about-description">{t("aboutDescription")}</p>

        <div className="about-detail-grid">
          <div className="about-detail-card primary">
            <h4 className="about-detail-title primary">
              <i className="fas fa-briefcase about-detail-icon"></i>
              {t("corporateExperience")}
            </h4>
            <p className="about-detail-text">{t("corporateDescription")}</p>
          </div>

          <div className="about-detail-card accent">
            <h4 className="about-detail-title accent">
              <i className="fas fa-cogs about-detail-icon"></i>
              {t("techStack")}
            </h4>
            <p className="about-detail-text">{t("techDescription")}</p>
          </div>

          <div className="about-detail-card success">
            <h4 className="about-detail-title success">
              <i className="fas fa-users-cog about-detail-icon"></i>
              {t("leadershipMethodologies")}
            </h4>
            <p className="about-detail-text">{t("leadershipDescription")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sintese;
