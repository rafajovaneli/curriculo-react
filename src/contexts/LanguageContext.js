import React, { createContext, useContext, useState } from "react";

// Create the language context
const LanguageContext = createContext();

// Create a hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Define translations
export const translations = {
  pt: {
    // Navigation
    about: "Sobre",
    skills: "Skills",
    experience: "Experiência",

    // Hero Section
    heroTitle: "Rafael H. Jovaneli",
    heroSubtitle: "Senior Java Developer & Software Engineer",
    aboutMe: "Sobre Mim",
    experiences: "Experiências",

    // About Section
    aboutTitle: "Sobre Mim",
    achievementExperience: "6+ Anos de Experiência",
    achievementCorporations: "Grandes Corporações",
    achievementLeadership: "Liderança de Equipes",
    achievementInternational: "Experiência Internacional",
    roleTitle: "Senior Java Developer",
    roleSubtitle: "Especialista em Arquiteturas Modernas",
    aboutDescription:
      "Desenvolvedor Java Senior com mais de 6 anos de experiência em desenvolvimento de sistemas corporativos, especializado em arquiteturas modernas e metodologias ágeis.",
    corporateExperience: "Experiência Corporativa",
    corporateDescription:
      "Experiência sólida em JAVA voltada para grandes clientes como Bradesco, Santander, SOMPO Seguros e Ame Digital. Especialista em desenvolvimento de soluções robustas utilizando Spring Boot, microserviços e arquiteturas cloud-native.",
    techStack: "Stack Tecnológico",
    techDescription:
      "Domínio completo do ecossistema Java: Gradle, Maven, Spring Boot, JSF PrimeFaces, JavaScript, JUnit, e ferramentas de versionamento como GitHub, Bitbucket, GitLab. Experiência com bancos de dados SQL Server, PL/SQL, e tecnologias cloud AWS e Docker.",
    leadershipMethodologies: "Liderança & Metodologias",
    leadershipDescription:
      "Vivência internacional com metodologias ITIL V3 e forte experiência em liderança de equipes e coordenação de projetos complexos utilizando metodologias ágeis.",

    // Skills Section
    competenciasTitle: "Competências",
    skillsTitle: "Skills & Technologies",
    competenciaLanguages:
      "Fluência em inglês. Espanhol Básico. Francês Básico.",
    competenciaJava: "Experiência em JAVA versões 6, 7, 8, 11 e 17.",
    competenciaReactive: "Vivência em programação reativa (Spring Webflux).",
    competenciaAgile: "Conhecimentos sólidos em metodologias Ágeis.",
    competenciaCommunication:
      "Proativo, organizado, dinâmico, comprometido e com ótima habilidade de comunicação.",
    competenciaLeadership:
      "Experiência com coordenação e liderança de equipes.",

    // Skill Categories
    skillCategoryBackend: "Backend & Core",
    skillCategoryCloud: "Cloud & DevOps",
    skillCategoryDatabase: "Database & Messaging",
    skillCategoryFrontend: "Frontend & Tools",
    skillCategoryVersion: "Version Control & Testing",

    // Experience Section
    experienceTitle: "Experiência Profissional",

    // Contact Section
    contact: "Contato",
    contactMe: "Entre em Contato",
    phone: "WhatsApp",
    email: "Email",
    location: "Localização",
    viewOnMaps: "Ver no Google Maps",
    whatsappHint: "Clique para enviar mensagem",
    emailHint: "Clique para enviar email",

    // Contact Messages
    whatsappMessage:
      "Olá Rafael! Tenho interesse em discutir uma oportunidade de trabalho com você.",
    emailSubject: "Oportunidade de Trabalho - Vamos Conversar",
    emailBody:
      "Olá Rafael,\n\nEncontrei seu perfil e tenho interesse em discutir uma potencial oportunidade de trabalho com você.\n\nAtenciosamente,",

    // Professional Links & Resume
    downloadResume: "Baixar Currículo",
    professionalLinks: "Links Profissionais",
    linkedinProfile: "Perfil LinkedIn",
    githubProfile: "Perfil GitHub",
    viewProfile: "Ver Perfil",

    // Footer
    footerText: "Rafael H. Jovaneli - Desenvolvedor Java Senior",
    builtWith: "Construído com React.js e Chart.js",
  },

  en: {
    // Navigation
    about: "About",
    skills: "Skills",
    experience: "Experience",

    // Hero Section
    heroTitle: "Rafael H. Jovaneli",
    heroSubtitle: "Senior Java Developer & Software Engineer",
    aboutMe: "About Me",
    experiences: "Experience",

    // About Section
    aboutTitle: "About Me",
    achievementExperience: "6+ Years Experience",
    achievementCorporations: "Large Corporations",
    achievementLeadership: "Team Leadership",
    achievementInternational: "International Experience",
    roleTitle: "Senior Java Developer",
    roleSubtitle: "Modern Architecture Specialist",
    aboutDescription:
      "Senior Java Developer with over 6 years of experience in corporate systems development, specialized in modern architectures and agile methodologies.",
    corporateExperience: "Corporate Experience",
    corporateDescription:
      "Solid experience in JAVA focused on large clients such as Bradesco, Santander, SOMPO Insurance and Ame Digital. Specialist in developing robust solutions using Spring Boot, microservices and cloud-native architectures.",
    techStack: "Technology Stack",
    techDescription:
      "Complete mastery of the Java ecosystem: Gradle, Maven, Spring Boot, JSF PrimeFaces, JavaScript, JUnit, and version control tools like GitHub, Bitbucket, GitLab. Experience with SQL Server, PL/SQL databases, and cloud technologies AWS and Docker.",
    leadershipMethodologies: "Leadership & Methodologies",
    leadershipDescription:
      "International experience with ITIL V3 methodologies and strong experience in team leadership and coordination of complex projects using agile methodologies.",

    // Skills Section
    competenciasTitle: "Core Competencies",
    skillsTitle: "Skills & Technologies",
    competenciaLanguages: "Fluent in English. Basic Spanish. Basic French.",
    competenciaJava: "Experience in JAVA versions 6, 7, 8, 11 and 17.",
    competenciaReactive: "Experience in reactive programming (Spring Webflux).",
    competenciaAgile: "Solid knowledge in Agile methodologies.",
    competenciaCommunication:
      "Proactive, organized, dynamic, committed and with excellent communication skills.",
    competenciaLeadership: "Experience with team coordination and leadership.",

    // Skill Categories
    skillCategoryBackend: "Backend & Core",
    skillCategoryCloud: "Cloud & DevOps",
    skillCategoryDatabase: "Database & Messaging",
    skillCategoryFrontend: "Frontend & Tools",
    skillCategoryVersion: "Version Control & Testing",

    // Experience Section
    experienceTitle: "Professional Experience",

    // Contact Section
    contact: "Contact",
    contactMe: "Get in Touch",
    phone: "WhatsApp",
    email: "Email",
    location: "Location",
    viewOnMaps: "View on Google Maps",
    whatsappHint: "Click to send message",
    emailHint: "Click to send email",

    // Contact Messages
    whatsappMessage:
      "Hello Rafael! I'm interested in discussing a job opportunity with you.",
    emailSubject: "Job Opportunity - Let's Connect",
    emailBody:
      "Hello Rafael,\n\nI came across your profile and I'm interested in discussing a potential job opportunity with you.\n\nBest regards,",

    // Professional Links & Resume
    downloadResume: "Download Resume",
    professionalLinks: "Professional Links",
    linkedinProfile: "LinkedIn Profile",
    githubProfile: "GitHub Profile",
    viewProfile: "View Profile",

    // Footer
    footerText: "Rafael H. Jovaneli - Senior Java Developer",
    builtWith: "Built with React.js and Chart.js",
  },
};

// Create the language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  // Simple translation function that only handles string keys
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
