import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
// import { motion } from "framer-motion"; // Temporarily disabled to fix blur

const ProfessionalLinks = () => {
  const { t, language } = useLanguage();

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
    // Define the resume files hosted on GitHub
    // Replace 'YOUR_GITHUB_USERNAME' and 'YOUR_REPO_NAME' with actual values
    const resumeFiles = {
      pt: {
        url: "https://github.com/rafajovaneli/resume-files/raw/main/CV_RAFAEL_JOVANELI_PT_2025.pdf",
        filename: "CV_RAFAEL_JOVANELI_PT_2025.pdf",
      },
      en: {
        url: "https://github.com/rafajovaneli/resume-files/raw/main/CV_RAFAEL_JOVANELI_EN_2025.pdf",
        filename: "CV_RAFAEL_JOVANELI_EN_2025.pdf",
      },
    };

    const currentResume = resumeFiles[language];

    // Create download link
    const link = document.createElement("a");
    link.href = currentResume.url;
    link.download = currentResume.filename;
    link.target = "_blank";

    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="professional-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("professionalLinks")}</h2>
          <div className="section-underline"></div>
        </div>

        <div className="professional-content">
          {/* Download Resume Button */}
          <div className="resume-download">
            <button
              className="download-resume-btn"
              onClick={handleDownloadResume}
            >
              <i className="fas fa-download"></i>
              <span>{t("downloadResume")}</span>
            </button>
          </div>

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
