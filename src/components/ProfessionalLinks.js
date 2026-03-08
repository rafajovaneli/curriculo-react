import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ResumeDownload from "./ResumeDownload";
// import { motion } from "framer-motion"; // Temporarily disabled to fix blur

const ProfessionalLinks = () => {
  const { t } = useLanguage();

  const professionalLinks = [
    {
      name: t("linkedinProfile"),
      url: "https://www.linkedin.com/in/rafael-jovaneli-a495b420",
      icon: "fab fa-linkedin",
      color: "#0077B5",
      description: "Connect with me professionally",
    },
  ];

  return (
    <div className="professional-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("professionalLinks")}</h2>
          <div className="section-underline"></div>
          <p className="professional-intro">{t("professionalIntro")}</p>
        </div>

        <div className="professional-content">
          {/* Enhanced Resume Download */}
          <ResumeDownload />

          {/* Simple LinkedIn Link */}
          <div className="simple-linkedin-container">
            <a
              href={professionalLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="simple-linkedin-link"
            >
              <i className="fab fa-linkedin"></i>
              <span>{t("linkedinProfile")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLinks;
