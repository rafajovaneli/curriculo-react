import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const GraficoTecnologias = memo(function GraficoTecnologias() {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState({
    0: true, // Expand first category by default
  });

  const toggleCategory = (categoryIndex) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

  const skillCategories = [
    {
      title: t("skillCategoryBackend"),
      skills: [
        { name: "Java", level: 95, icon: "fab fa-java", color: "#f89820" },
        {
          name: "Spring Boot",
          level: 90,
          icon: "fas fa-leaf",
          color: "#6db33f",
        },
        {
          name: "Spring WebFlux",
          level: 85,
          icon: "fas fa-stream",
          color: "#6db33f",
        },
        {
          name: "Hibernate/JPA",
          level: 88,
          icon: "fas fa-database",
          color: "#59666c",
        },
        { name: "Maven", level: 85, icon: "fas fa-cube", color: "#c71a36" },
        { name: "Gradle", level: 82, icon: "fas fa-cogs", color: "#02303a" },
      ],
    },
    {
      title: t("skillCategoryCloud"),
      skills: [
        { name: "AWS", level: 75, icon: "fab fa-aws", color: "#ff9900" },
        { name: "Docker", level: 80, icon: "fab fa-docker", color: "#2496ed" },
        { name: "Jenkins", level: 78, icon: "fas fa-tools", color: "#d33833" },
        {
          name: "Kubernetes",
          level: 70,
          icon: "fas fa-dharmachakra",
          color: "#326ce5",
        },
        {
          name: "OpenShift",
          level: 72,
          icon: "fas fa-server",
          color: "#ee0000",
        },
      ],
    },
    {
      title: t("skillCategoryDatabase"),
      skills: [
        {
          name: "SQL Server",
          level: 85,
          icon: "fas fa-database",
          color: "#cc2927",
        },
        {
          name: "PostgreSQL",
          level: 80,
          icon: "fas fa-elephant",
          color: "#336791",
        },
        { name: "MongoDB", level: 75, icon: "fas fa-leaf", color: "#47a248" },
        { name: "Kafka", level: 78, icon: "fas fa-stream", color: "#231f20" },
        { name: "Redis", level: 73, icon: "fas fa-memory", color: "#dc382d" },
      ],
    },
    {
      title: t("skillCategoryFrontend"),
      skills: [
        { name: "React", level: 70, icon: "fab fa-react", color: "#61dafb" },
        {
          name: "JavaScript",
          level: 82,
          icon: "fab fa-js-square",
          color: "#f7df1e",
        },
        {
          name: "Angular",
          level: 65,
          icon: "fab fa-angular",
          color: "#dd0031",
        },
        {
          name: "JSF PrimeFaces",
          level: 85,
          icon: "fas fa-code",
          color: "#007acc",
        },
        { name: "HTML/CSS", level: 80, icon: "fab fa-html5", color: "#e34f26" },
      ],
    },
    {
      title: t("skillCategoryVersion"),
      skills: [
        { name: "Git", level: 85, icon: "fab fa-git-alt", color: "#f05032" },
        { name: "GitHub", level: 83, icon: "fab fa-github", color: "#181717" },
        { name: "GitLab", level: 80, icon: "fab fa-gitlab", color: "#fc6d26" },
        { name: "JUnit", level: 88, icon: "fas fa-vial", color: "#25a162" },
        { name: "Mockito", level: 82, icon: "fas fa-flask", color: "#25a162" },
      ],
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
          {t("skillsTitle")}
        </h3>
        <div className="section-underline section-underline-compact"></div>
      </div>

      <div className="skills-categories-grid">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="unified-card"
          >
            {/* Category Header - Clickable */}
              <button
                type="button"
                className="skill-category-toggle"
                onClick={() => toggleCategory(categoryIndex)}
                aria-expanded={Boolean(expandedCategories[categoryIndex])}
              >
                <div>
                  <h4 className="skill-category-title">{category.title}</h4>
                  <div className="skill-category-underline"></div>
                </div>

                {/* Expand/Collapse Icon */}
                <motion.div
                  animate={{
                    rotate: expandedCategories[categoryIndex] ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="skill-category-chevron"
                >
                  <i className="fas fa-chevron-down"></i>
                </motion.div>
              </button>

            {/* Skills List */}
            <AnimatePresence>
              {expandedCategories[categoryIndex] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="skill-list"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.4,
                      }}
                      viewport={{ once: true }}
                      className="skill-row"
                    >
                      {/* Skill Icon */}
                      <div
                        className="skill-icon-shell"
                        style={{
                          "--skill-accent": skill.color,
                        }}
                      >
                        <i className={skill.icon}></i>
                      </div>

                      {/* Skill Info */}
                      <div className="skill-content">
                        <div className="skill-meta">
                          <span className="skill-name">{skill.name}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="skill-progress-track">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              delay:
                                categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            className="skill-progress-bar"
                            style={{
                              "--skill-accent": skill.color,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default GraficoTecnologias;
