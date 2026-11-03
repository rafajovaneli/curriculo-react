import React from "react";

/**
 * Optional measurable outcome of an experience. It renders nothing until the
 * experience data has a `resultado` text, so no placeholder ever reaches the page.
 */
const ExperienceResult = ({ label, text }) => {
  if (!text) return null;

  return (
    <p className="timeline-result">
      <strong className="timeline-result-label">{label}</strong> {text}
    </p>
  );
};

export default ExperienceResult;
