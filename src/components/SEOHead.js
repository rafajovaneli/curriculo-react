import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../contexts/LanguageContext";

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  section = "home",
}) => {
  const { language, t } = useLanguage();

  const siteTitle = "Rafael Jovaneli - Full Stack Developer";
  const siteDescription =
    language === "pt"
      ? "Desenvolvedor Full Stack especializado em React, Node.js e tecnologias web modernas. Engenheiro de software experiente com expertise em desenvolvimento frontend e backend."
      : "Full Stack Developer specializing in React, Node.js, and modern web technologies. Experienced software engineer with expertise in frontend and backend development.";

  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageUrl = url || "https://rafajovaneli.github.io/curriculo-react";
  const pageImage = image || `${pageUrl}/logo512.png`;

  const defaultKeywords =
    language === "pt"
      ? "Rafael Jovaneli, Desenvolvedor Full Stack, React, Node.js, JavaScript, Frontend, Backend, Engenheiro de Software, Desenvolvedor Web"
      : "Rafael Jovaneli, Full Stack Developer, React Developer, Node.js, JavaScript, Frontend, Backend, Software Engineer, Web Developer";

  const pageKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rafael Jovaneli",
    jobTitle:
      language === "pt" ? "Desenvolvedor Full Stack" : "Full Stack Developer",
    description: pageDescription,
    url: pageUrl,
    image: pageImage,
    sameAs: [
      "https://github.com/rafajovaneli",
      "https://linkedin.com/in/rafajovaneli",
    ],
    knowsAbout: [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
    ],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Rafael Jovaneli" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rafael Jovaneli Portfolio" />
      <meta
        property="og:locale"
        content={language === "pt" ? "pt_BR" : "en_US"}
      />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:creator" content="@rafajovaneli" />

      {/* Additional Performance and SEO */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preload Critical Resources */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        as="style"
      />
      <link rel="preload" href="/static/css/main.css" as="style" />
    </Helmet>
  );
};

export default React.memo(SEOHead);
