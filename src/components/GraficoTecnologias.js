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
        { name: "Java", level: 95, icon: "fab fa-java" },
        {
          name: "Spring Boot",
          level: 90,
          icon: "fas fa-leaf",
        },
        {
          name: "Spring WebFlux",
          level: 85,
          icon: "fas fa-stream",
        },
        {
          name: "Hibernate/JPA",
          level: 88,
          icon: "fas fa-database",
        },
        { name: "Maven", level: 85, icon: "fas fa-cube" },
        { name: "Gradle", level: 82, icon: "fas fa-cogs" },
      ],
    },
    {
      title: t("skillCategoryCloud"),
      skills: [
        { name: "AWS", level: 75, icon: "fab fa-aws" },
        { name: "Docker", level: 80, icon: "fab fa-docker" },
        { name: "Jenkins", level: 78, icon: "fas fa-tools" },
        {
          name: "Kubernetes",
          level: 70,
          icon: "fas fa-dharmachakra",
        },
        {
          name: "OpenShift",
          level: 72,
          icon: "fas fa-server",
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
        },
        {
          name: "PostgreSQL",
          level: 80,
          icon: "fas fa-table",
        },
        { name: "MongoDB", level: 75, icon: "fas fa-leaf" },
        { name: "Kafka", level: 78, icon: "fas fa-stream" },
        { name: "Redis", level: 73, icon: "fas fa-memory" },
      ],
    },
    {
      title: t("skillCategoryFrontend"),
      skills: [
        { name: "React", level: 70, icon: "fab fa-react" },
        {
          name: "JavaScript",
          level: 82,
          icon: "fab fa-js-square",
        },
        {
          name: "Angular",
          level: 65,
          icon: "fab fa-angular",
        },
        {
          name: "JSF PrimeFaces",
          level: 85,
          icon: "fas fa-code",
        },
        { name: "HTML/CSS", level: 80, icon: "fab fa-html5" },
      ],
    },
    {
      title: t("skillCategoryVersion"),
      skills: [
        { name: "Git", level: 85, icon: "fab fa-git-alt" },
        { name: "GitHub", level: 83, icon: "fab fa-github" },
        { name: "GitLab", level: 80, icon: "fab fa-gitlab" },
        { name: "JUnit", level: 88, icon: "fas fa-vial" },
        { name: "Mockito", level: 82, icon: "fas fa-flask" },
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
            {/* Category header: heading wraps the toggle button (accordion pattern) */}
            <h4 className="skill-category-heading">
              <button
                type="button"
                className="skill-category-toggle"
                onClick={() => toggleCategory(categoryIndex)}
                aria-expanded={Boolean(expandedCategories[categoryIndex])}
                aria-controls={`skill-list-${categoryIndex}`}
              >
                <span className="skill-category-label">
                  <span className="skill-category-title">{category.title}</span>
                  <span className="skill-category-underline"></span>
                </span>

                {/* Expand/Collapse Icon */}
                <motion.span
                  animate={{
                    rotate: expandedCategories[categoryIndex] ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="skill-category-chevron"
                  aria-hidden="true"
                >
                  <i className="fas fa-chevron-down"></i>
                </motion.span>
              </button>
            </h4>

            {/* Skills List */}
            <AnimatePresence>
              {expandedCategories[categoryIndex] && (
                <motion.div
                  id={`skill-list-${categoryIndex}`}
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
                      >
                        <i className={skill.icon}></i>
                      </div>

                      {/* Skill Info */}
                      <div className="skill-content">
                        <div className="skill-meta">
                          <span className="skill-name">{skill.name}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="skill-progress-track" aria-hidden="true">
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
