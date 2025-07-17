import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

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

  const handleDownloadResume = () => {
    // Create a temporary link to download the resume
    // You'll need to add your resume PDF to the public folder
    const link = document.createElement("a");
    link.href = "/resume-rafael-jovaneli.pdf"; // Path to your resume in public folder
    link.download = "Rafael_Jovaneli_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="professional-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("professionalLinks")}
        </motion.h2>
        <div className="section-underline"></div>
      </div>

      <div className="professional-content">
        {/* Download Resume Button */}
        <motion.div
          className="resume-download"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <button
            className="download-resume-btn"
            onClick={handleDownloadResume}
          >
            <i className="fas fa-download"></i>
            <span>{t("downloadResume")}</span>
          </button>
        </motion.div>

        {/* Simple LinkedIn Link */}
        <motion.div
          className="simple-linkedin-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href={professionalLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="simple-linkedin-link"
          >
            <i className="fab fa-linkedin"></i>
            <span>{t("linkedinProfile")}</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalLinks;
