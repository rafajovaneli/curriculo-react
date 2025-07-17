import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <p>&copy; 2025 {t("footerText")}</p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
