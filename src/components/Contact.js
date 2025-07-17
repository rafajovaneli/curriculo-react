import React, { useState, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Contact = React.memo(() => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });

  const contactInfo = {
    phone: "+55 (11) 99390-3697",
    phoneNumber: "5511993903697", // WhatsApp format (no spaces, no special chars)
    email: "rafajovaneli@gmail.com",
    location: "Osasco, São Paulo - Brazil",
    mapsUrl: "https://www.google.com/maps/place/Osasco,+SP,+Brazil",
  };

  const showFeedback = useCallback((message, type = "success") => {
    setFeedback({ show: true, message, type });
    setTimeout(() => {
      setFeedback({ show: false, message: "", type: "" });
    }, 3000);
  }, []);

  const handlePhoneClick = useCallback(async () => {
    setClickedCard("phone");
    try {
      const message = encodeURIComponent(t("whatsappMessage"));
      const whatsappUrl = `https://wa.me/${contactInfo.phoneNumber}?text=${message}`;

      const opened = window.open(whatsappUrl, "_blank");
      if (opened) {
        showFeedback("Opening WhatsApp...", "success");
      } else {
        await navigator.clipboard.writeText(contactInfo.phone);
        showFeedback("Phone number copied to clipboard!", "info");
      }
    } catch (error) {
      showFeedback(`Call: ${contactInfo.phone}`, "info");
    }

    setTimeout(() => setClickedCard(null), 300);
  }, [t, contactInfo.phoneNumber, contactInfo.phone, showFeedback]);

  const handleEmailClick = useCallback(async () => {
    setClickedCard("email");
    try {
      const subject = encodeURIComponent(t("emailSubject"));
      const body = encodeURIComponent(t("emailBody"));
      const emailUrl = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

      const opened = window.open(emailUrl, "_blank");
      if (opened) {
        showFeedback("Opening email client...", "success");
      } else {
        await navigator.clipboard.writeText(contactInfo.email);
        showFeedback("Email address copied to clipboard!", "info");
      }
    } catch (error) {
      showFeedback(`Email: ${contactInfo.email}`, "info");
    }

    setTimeout(() => setClickedCard(null), 300);
  }, [t, contactInfo.email, showFeedback]);

  const handleLocationClick = useCallback(() => {
    setClickedCard("location");
    try {
      const opened = window.open(contactInfo.mapsUrl, "_blank");
      if (opened) {
        showFeedback("Opening Google Maps...", "success");
      } else {
        showFeedback("Unable to open maps", "error");
      }
    } catch (error) {
      showFeedback("Unable to open maps", "error");
    }

    setTimeout(() => setClickedCard(null), 300);
  }, [contactInfo.mapsUrl, showFeedback]);

  return (
    <div className="contact-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("contactMe")}
        </motion.h2>
        <div className="section-underline"></div>
      </div>

      <div className="contact-grid" role="list">
        <motion.div
          className={`contact-card ${
            hoveredCard === "phone" ? "hovered" : ""
          } ${clickedCard === "phone" ? "clicked" : ""}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 20px 40px rgba(37, 211, 102, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePhoneClick}
          onHoverStart={() => setHoveredCard("phone")}
          onHoverEnd={() => setHoveredCard(null)}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePhoneClick();
            }
          }}
          aria-label={`${t("phone")}: ${contactInfo.phone}. ${t(
            "whatsappHint"
          )}`}
        >
          <motion.div
            className="contact-icon whatsapp-icon"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fab fa-whatsapp"></i>
          </motion.div>
          <h3>{t("phone")}</h3>
          <p>{contactInfo.phone}</p>
          <motion.span
            className="contact-hint"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            {t("whatsappHint")}
          </motion.span>
          <AnimatePresence>
            {hoveredCard === "phone" && (
              <motion.div
                className="contact-hover-effect"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={`contact-card ${
            hoveredCard === "email" ? "hovered" : ""
          } ${clickedCard === "email" ? "clicked" : ""}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEmailClick}
          onHoverStart={() => setHoveredCard("email")}
          onHoverEnd={() => setHoveredCard(null)}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleEmailClick();
            }
          }}
          aria-label={`${t("email")}: ${contactInfo.email}. ${t("emailHint")}`}
        >
          <motion.div
            className="contact-icon email-icon"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-envelope"></i>
          </motion.div>
          <h3>{t("email")}</h3>
          <p>{contactInfo.email}</p>
          <motion.span
            className="contact-hint"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            {t("emailHint")}
          </motion.span>
          <AnimatePresence>
            {hoveredCard === "email" && (
              <motion.div
                className="contact-hover-effect"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={`contact-card ${
            hoveredCard === "location" ? "hovered" : ""
          } ${clickedCard === "location" ? "clicked" : ""}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLocationClick}
          onHoverStart={() => setHoveredCard("location")}
          onHoverEnd={() => setHoveredCard(null)}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleLocationClick();
            }
          }}
          aria-label={`${t("location")}: ${contactInfo.location}. ${t(
            "viewOnMaps"
          )}`}
        >
          <motion.div
            className="contact-icon location-icon"
            whileHover={{ y: [-5, 0, -5], scale: 1.2 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <i className="fas fa-map-marker-alt"></i>
          </motion.div>
          <h3>{t("location")}</h3>
          <p>{contactInfo.location}</p>
          <motion.span
            className="maps-link"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            {t("viewOnMaps")}
          </motion.span>
          <AnimatePresence>
            {hoveredCard === "location" && (
              <motion.div
                className="contact-hover-effect"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Feedback Notification */}
      <AnimatePresence>
        {feedback.show && (
          <motion.div
            className={`contact-feedback ${feedback.type}`}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.3,
            }}
          >
            <motion.div
              className="feedback-icon"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {feedback.type === "success" && (
                <i className="fas fa-check-circle"></i>
              )}
              {feedback.type === "info" && (
                <i className="fas fa-info-circle"></i>
              )}
              {feedback.type === "error" && (
                <i className="fas fa-exclamation-circle"></i>
              )}
            </motion.div>
            <span className="feedback-message">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Contact;
