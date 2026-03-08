import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import "./ResumeDownload.css";

const ResumeDownload = () => {
  const { t, language } = useLanguage();
  const [showOptions, setShowOptions] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  const resumeFiles = {
    pt: {
      url: `${process.env.PUBLIC_URL}/CV_RAFAEL_JOVANELI_PT_2025.pdf`,
      filename: "CV_RAFAEL_JOVANELI_PT_2025.pdf",
      label: "Português (PT-BR)",
    },
    en: {
      url: `${process.env.PUBLIC_URL}/CV_RAFAEL_JOVANELI_EN_2025.pdf`,
      filename: "CV_RAFAEL_JOVANELI_EN_2025.pdf",
      label: "English (EN-US)",
    },
  };

  const handleDirectDownload = () => {
    const currentResume = resumeFiles[language];
    downloadFile(currentResume);
  };

  const handleDownloadLanguage = (lang) => {
    const resume = resumeFiles[lang];
    downloadFile(resume);
    setShowOptions(false);
  };

  const downloadFile = (resume) => {
    try {
      setDownloadStatus("downloading");

      // Method 1: Direct download
      const link = document.createElement("a");
      link.href = resume.url;
      link.download = resume.filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success feedback
      setTimeout(() => {
        setDownloadStatus("success");
        setTimeout(() => setDownloadStatus(""), 2000);
      }, 500);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadStatus("error");

      // Fallback: Open in new tab
      window.open(resume.url, "_blank", "noopener,noreferrer");

      setTimeout(() => setDownloadStatus(""), 3000);
    }
  };

  const handleViewOnline = () => {
    const currentResume = resumeFiles[language];
    window.open(currentResume.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="resume-download-container">
      <div className="resume-download-main">
        {/* Primary Download Button */}
        <motion.button
          className={`download-resume-btn primary ${downloadStatus}`}
          onClick={handleDirectDownload}
          disabled={downloadStatus === "downloading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="btn-content">
            {downloadStatus === "downloading" && (
              <i className="fas fa-spinner fa-spin"></i>
            )}
            {downloadStatus === "success" && <i className="fas fa-check"></i>}
            {downloadStatus === "error" && (
              <i className="fas fa-exclamation-triangle"></i>
            )}
            {!downloadStatus && <i className="fas fa-download"></i>}
            <span>
              {downloadStatus === "downloading" && t("downloading")}
              {downloadStatus === "success" && t("downloadSuccess")}
              {downloadStatus === "error" && t("downloadError")}
              {!downloadStatus && t("downloadResume")}
            </span>
          </div>
        </motion.button>

        {/* Options Toggle */}
        <motion.button
          className="download-options-toggle"
          onClick={() => setShowOptions(!showOptions)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas fa-chevron-${showOptions ? "up" : "down"}`}></i>
        </motion.button>
      </div>

      {/* Download Options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="download-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="options-grid">
              {/* Language Options */}
              <div className="option-group">
                <h4>{t("chooseLanguage")}</h4>
                <div className="language-buttons">
                  {Object.entries(resumeFiles).map(([lang, resume]) => (
                    <button
                      key={lang}
                      className={`language-btn ${
                        language === lang ? "active" : ""
                      }`}
                      onClick={() => handleDownloadLanguage(lang)}
                    >
                      <i
                        className={`fas fa-flag ${
                          lang === "pt" ? "flag-br" : "flag-us"
                        }`}
                      ></i>
                      <span>{resume.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alternative Actions */}
              <div className="option-group">
                <h4>{t("alternatives")}</h4>
                <div className="alternative-buttons">
                  <button
                    className="alt-btn view-online"
                    onClick={handleViewOnline}
                  >
                    <i className="fas fa-eye"></i>
                    <span>{t("viewOnline")}</span>
                  </button>

                  <button
                    className="alt-btn email-request"
                    onClick={() =>
                      (window.location.href =
                        "mailto:rafajovaneli@gmail.com?subject=Resume Request&body=Hi Rafael, I would like to request your resume.")
                    }
                  >
                    <i className="fas fa-envelope"></i>
                    <span>{t("requestByEmail")}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDownload;
