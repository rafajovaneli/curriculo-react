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
    heroSubtitle: "Senior Java Developer focado em sistemas corporativos de alta criticidade",
    heroEyebrow: "Java | Spring Boot | Microservices | Cloud | Mensageria",
    heroLocation: "Osasco, SP | Disponível para oportunidades remotas e híbridas",
    aboutMe: "Sobre Mim",
    experiences: "Experiências",
    downloadResumeShort: "Baixar CV",
    viewExperienceShort: "Ver Experiência",
    heroValue1: "6+ anos em produtos enterprise",
    heroValue2: "Experiência em bancos, seguros e fintechs",
    heroValue3: "Stack principal: Java, Spring Boot, AWS e Kafka",

    // About Section
    aboutTitle: "Sobre Mim",
    achievementExperience: "6+ Anos de Experiência",
    achievementCorporations: "Grandes Corporações",
    achievementLeadership: "Liderança de Equipes",
    achievementInternational: "Experiência Internacional",
    roleTitle: "Senior Java Developer",
    roleSubtitle: "Arquiteturas modernas, integrações e ambientes de missão crítica",
    aboutDescription:
      "Desenvolvedor Java Senior com mais de 6 anos de experiência em sistemas corporativos, atuando na entrega de integrações, melhorias de plataformas críticas e soluções escaláveis para negócios regulados.",
    corporateExperience: "Experiência Corporativa",
    corporateDescription:
      "Atuação em projetos para Bradesco, Santander, SOMPO Seguros, Ame Digital e outros grandes clientes, com foco em estabilidade, evolução de produtos e entregas em ambientes enterprise.",
    techStack: "Stack Tecnológico",
    techDescription:
      "Experiência prática com Java, Spring Boot, WebFlux, mensageria, bancos relacionais, observabilidade, CI/CD e cloud, combinando desenvolvimento, sustentação e melhoria contínua.",
    leadershipMethodologies: "Liderança & Metodologias",
    leadershipDescription:
      "Vivência com liderança técnica, colaboração entre times e execução em rotinas ágeis, contribuindo para entregas consistentes e comunicação clara com negócio e tecnologia.",

    // Skills Section
    competenciasTitle: "Competências",
    skillsTitle: "Skills & Technologies",
    competenciaLanguages:
      "Inglês fluente para atuação em contexto técnico e colaboração internacional.",
    competenciaJava: "Experiência sólida com Java 6, 7, 8, 11 e 17 em ambientes enterprise.",
    competenciaReactive: "Vivência com programação reativa usando Spring WebFlux.",
    competenciaAgile: "Atuação consistente com Scrum, Kanban e rotinas ágeis.",
    competenciaCommunication:
      "Comunicação clara, perfil colaborativo e boa interface entre áreas técnicas e de negócio.",
    competenciaLeadership: "Experiência com coordenação técnica e apoio à evolução de equipes.",

    // Skill Categories
    skillCategoryBackend: "Backend & Core",
    skillCategoryCloud: "Cloud & DevOps",
    skillCategoryDatabase: "Database & Messaging",
    skillCategoryFrontend: "Frontend & Tools",
    skillCategoryVersion: "Version Control & Testing",

    // Experience Section
    experienceTitle: "Experiência Profissional",
    experienceSummaryTitle: "Resultados em destaque",
    experienceStackLabel: "Stack",
    experienceDomainLabel: "Contexto",
    experienceHighlightsLabel: "Destaques",
    experienceExpandLabel: "Ver detalhes",
    experienceCollapseLabel: "Ocultar detalhes",

    // Contact Section
    contact: "Contato",
    contactMe: "Entre em Contato",
    phone: "WhatsApp",
    email: "Email",
    location: "Localização",
    viewOnMaps: "Ver no Google Maps",
    whatsappHint: "Clique para enviar mensagem",
    emailHint: "Clique para enviar email",
    openingWhatsapp: "Abrindo WhatsApp...",
    phoneCopied: "Telefone copiado para a área de transferência!",
    openingEmail: "Abrindo cliente de email...",
    emailCopied: "Email copiado para a área de transferência!",
    openingMaps: "Abrindo Google Maps...",
    unableOpenMaps: "Não foi possível abrir o mapa",

    // Contact Messages
    whatsappMessage:
      "Olá Rafael! Tenho interesse em discutir uma oportunidade de trabalho com você.",
    emailSubject: "Oportunidade de Trabalho - Vamos Conversar",
    emailBody:
      "Olá Rafael,\n\nEncontrei seu perfil e tenho interesse em discutir uma potencial oportunidade de trabalho com você.\n\nAtenciosamente,",

    // Professional Links & Resume
    downloadResume: "Baixar Currículo",
    downloading: "Baixando...",
    downloadSuccess: "Download Concluído!",
    downloadError: "Erro no Download",
    chooseLanguage: "Escolher Idioma",
    alternatives: "Alternativas",
    viewOnline: "Visualizar Online",
    requestByEmail: "Solicitar por Email",
    professionalLinks: "Links Profissionais",
    linkedinProfile: "Perfil LinkedIn",
    githubProfile: "Perfil GitHub",
    viewProfile: "Ver Perfil",
    professionalIntro:
      "Se fizer sentido para a vaga, você pode acessar meu currículo, LinkedIn e canais de contato de forma rápida.",

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
    heroSubtitle: "Senior Java Developer focused on business-critical enterprise platforms",
    heroEyebrow: "Java | Spring Boot | Microservices | Cloud | Messaging",
    heroLocation: "Osasco, SP | Open to remote and hybrid opportunities",
    aboutMe: "About Me",
    experiences: "Experience",
    downloadResumeShort: "Download Resume",
    viewExperienceShort: "View Experience",
    heroValue1: "6+ years building enterprise software",
    heroValue2: "Experience across banking, insurance, and fintech",
    heroValue3: "Core stack: Java, Spring Boot, AWS, and Kafka",

    // About Section
    aboutTitle: "About Me",
    achievementExperience: "6+ Years Experience",
    achievementCorporations: "Large Corporations",
    achievementLeadership: "Team Leadership",
    achievementInternational: "International Experience",
    roleTitle: "Senior Java Developer",
    roleSubtitle: "Modern architectures, integrations, and mission-critical environments",
    aboutDescription:
      "Senior Java Developer with over 6 years of experience building enterprise systems, delivering integrations, platform enhancements, and scalable solutions for regulated industries.",
    corporateExperience: "Corporate Experience",
    corporateDescription:
      "Delivered projects for Bradesco, Santander, SOMPO Insurance, Ame Digital, and other large clients, with a strong focus on stability, product evolution, and dependable enterprise delivery.",
    techStack: "Technology Stack",
    techDescription:
      "Hands-on experience with Java, Spring Boot, WebFlux, messaging, relational databases, observability, CI/CD, and cloud, combining product delivery, maintenance, and continuous improvement.",
    leadershipMethodologies: "Leadership & Methodologies",
    leadershipDescription:
      "Experience in technical leadership, cross-functional collaboration, and agile execution, helping teams deliver consistently while keeping communication clear across business and engineering.",

    // Skills Section
    competenciasTitle: "Core Competencies",
    skillsTitle: "Skills & Technologies",
    competenciaLanguages:
      "Fluent English for technical communication and international collaboration.",
    competenciaJava: "Strong hands-on experience with Java 6, 7, 8, 11, and 17 in enterprise environments.",
    competenciaReactive: "Experience with reactive programming using Spring WebFlux.",
    competenciaAgile: "Strong delivery experience with Scrum, Kanban, and agile ceremonies.",
    competenciaCommunication:
      "Clear communication, collaborative mindset, and strong alignment across technical and business teams.",
    competenciaLeadership: "Experience supporting technical coordination and team growth.",

    // Skill Categories
    skillCategoryBackend: "Backend & Core",
    skillCategoryCloud: "Cloud & DevOps",
    skillCategoryDatabase: "Database & Messaging",
    skillCategoryFrontend: "Frontend & Tools",
    skillCategoryVersion: "Version Control & Testing",

    // Experience Section
    experienceTitle: "Professional Experience",
    experienceSummaryTitle: "Key outcomes",
    experienceStackLabel: "Stack",
    experienceDomainLabel: "Context",
    experienceHighlightsLabel: "Highlights",
    experienceExpandLabel: "View details",
    experienceCollapseLabel: "Hide details",

    // Contact Section
    contact: "Contact",
    contactMe: "Get in Touch",
    phone: "WhatsApp",
    email: "Email",
    location: "Location",
    viewOnMaps: "View on Google Maps",
    whatsappHint: "Click to send message",
    emailHint: "Click to send email",
    openingWhatsapp: "Opening WhatsApp...",
    phoneCopied: "Phone number copied to clipboard!",
    openingEmail: "Opening email client...",
    emailCopied: "Email address copied to clipboard!",
    openingMaps: "Opening Google Maps...",
    unableOpenMaps: "Unable to open maps",

    // Contact Messages
    whatsappMessage:
      "Hello Rafael! I'm interested in discussing a job opportunity with you.",
    emailSubject: "Job Opportunity - Let's Connect",
    emailBody:
      "Hello Rafael,\n\nI came across your profile and I'm interested in discussing a potential job opportunity with you.\n\nBest regards,",

    // Professional Links & Resume
    downloadResume: "Download Resume",
    downloading: "Downloading...",
    downloadSuccess: "Download Complete!",
    downloadError: "Download Error",
    chooseLanguage: "Choose Language",
    alternatives: "Alternatives",
    viewOnline: "View Online",
    requestByEmail: "Request by Email",
    professionalLinks: "Professional Links",
    linkedinProfile: "LinkedIn Profile",
    githubProfile: "GitHub Profile",
    viewProfile: "View Profile",
    professionalIntro:
      "If my profile fits your role, you can quickly access my resume, LinkedIn, and contact details here.",

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
