import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const Experiencias = memo(function Experiencias() {
  const { language, t } = useLanguage();
  const [expandedExperiences, setExpandedExperiences] = useState({});
  const [activeExperience, setActiveExperience] = useState(0);

  const toggleExperience = (index) => {
    setExpandedExperiences((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setActiveExperience(index);
  };

  // Define experiences directly in the component to avoid any object rendering issues
  const experienciasData = {
    pt: [
      {
        empresa: "Developer SINQIA - Cliente SOMPO Seguros",
        periodo: "Dezembro 2023 – Atual",
        resumo:
          "Melhorias no ecossistema de cotação e endosso para seguros automotivos em ambiente enterprise.",
        stack: ["Java", "Jenkins", "SQL Server", "Tomcat/JBoss/WebSphere"],
        contexto: "Seguros",
        destaques: [
          "Evolução do sistema de cotação e endosso.",
          "Atuação em arquitetura web, testes unitários e pipelines.",
        ],
        atividades: [
          "JAVA – Projeto SOMPO implementação de melhorias no sistema de cotação e endosso.",
          "Desenvolvimento e melhorias voltadas para o ambiente de seguros Automotivos.",
          "Utilização de repositórios de código (Bit Bucket e SVN, Jenkins).",
          "Utilização code-reviewers (Sonar).",
          "Experiência com servidores de aplicação Java: Tomcat, Jboss e Websphere.",
          "Experiência de arquitetura em soluções Web.",
          "Experiência de desenvolvimento em projetos Web.",
          "Experiência com Banco de Dados SQL Server.",
          "Evidência de testes unitários (JUnit).",
          "Utilização de ferramenta de integração contínua e construção de pipelines (Jenkins).",
        ],
      },
      {
        empresa: "Developer NAVA - Cliente Santander",
        periodo: "Fevereiro 2023 – Dezembro 2023",
        resumo:
          "Integração cloud para cartões com foco em mensageria, containers e fluxo MainframeXCloud.",
        stack: ["Java", "Spring Boot", "Camel", "Kafka", "OpenShift"],
        contexto: "Banco",
        destaques: [
          "Integração entre sistemas internos e cloud para cartões.",
          "Implementação de roteamento, mensageria e observabilidade.",
        ],
        atividades: [
          "JAVA – Projeto SANTANDER integração cloud cartões.",
          "Desenvolvimento e melhorias voltadas para ambiente de Integração interna MainframeXCloud.",
          "Utilização da tecnologia Camel para efetuar o roteamento de integração.",
          "Utilização de plataforma de gerenciamento de containers (Openshift).",
          "Implementação de sistema de mensageria (Kafka).",
          "Utilização de repositórios de código (GitLab).",
          "Utilização de estrutura de programação e persistência (Spring Boot, Hibernate e JPA).",
          "Utilização de estrutura de biblioteca de programação e anotações Lombok.",
          "Utilização de recursos de busca e visualização de dados em escala de nuvem (CloudWatch).",
          "Utilização de ferramenta de integração contínua e construção de pipelines (Jenkins).",
        ],
      },
      {
        empresa: "Developer Reply - Cliente Acesstage",
        periodo: "Junho 2022 – Fevereiro 2023",
        resumo:
          "Soluções para conta digital e pagamentos com foco em Pix, TED e boletos.",
        stack: ["Java", "Spring Boot", "Hibernate/JPA", "GitLab", "SQL Server"],
        contexto: "Fintech",
        destaques: [
          "Melhorias em produtos de conta digital e pagamentos.",
          "Atuação em persistência, banco de dados e pipelines.",
        ],
        atividades: [
          "JAVA – Projeto ACESSTAGE integração de banco digital e pix.",
          "Desenvolvimento e melhorias voltadas para ambiente de Contas bancárias digital (Pix, Ted, Emissão e Pagamento de boleto bancário).",
          "Utilização de repositórios de código (GitLab).",
          "Utilização de estrutura de programação e persistência (Spring Boot, Hibernate e JPA).",
          "Utilização de estrutura de biblioteca de programação e anotações Lombok.",
          "Utilização de recursos de busca e visualização de dados em escala de nuvem (CloudWatch).",
          "Utilização de ferramenta de integração contínua e construção de pipelines (Jenkins).",
          "Utilização de Banco de Dados (SQL Server, PL/SQL) e gerenciadores de tabelas (Debaver).",
        ],
      },
      {
        empresa: "Developer Reply - Cliente Ame Digital",
        periodo: "Dezembro 2021 – Junho 2022",
        resumo:
          "Desenvolvimento em motor antifraude com arquitetura reativa e forte observabilidade.",
        stack: ["Java", "Spring WebFlux", "DataDog", "Kibana", "Gradle"],
        contexto: "Antifraude",
        destaques: [
          "Entrega em ambiente crítico de risco e antifraude.",
          "Uso de WebFlux, observabilidade e segurança de dependências.",
        ],
        atividades: [
          "JAVA – Projeto AME DIGITAL Anti Fraude.",
          "Desenvolvimento e melhorias voltadas para o ambiente de antifraude (Risc - Hub).",
          "Utilização de repositórios de código (GitHub).",
          "Utilização de ferramenta de detecção e correção de vulnerabilidades nas dependências da aplicação (Snyk).",
          "Utilização de programação reativa (Spring WebFlux).",
          "Utilização de serviço de observabilidade para aplicativos em escala de nuvem (DataDog).",
          "Utilização de recursos de busca e visualização de dados (Kibana e CloudWatch).",
          "Utilização code-reviewers (Sonar).",
          "Evidência de testes unitários (JUnit).",
          "Utilização de sistema de automação de compilação de código aberto (Gradle).",
          "Utilização de Banco de Dados SQL Server, PL/SQL.",
        ],
      },
      {
        empresa: "Developer Wipro - Cliente Bradesco",
        periodo: "Março 2021 – Dezembro 2021",
        resumo:
          "Projetos corporativos para ambiente financeiro com Java Web, Azure e práticas ágeis.",
        stack: ["Java", "Spring Boot", "JSF PrimeFaces", "Azure", "Cucumber"],
        contexto: "Banco",
        destaques: [
          "Atuação full stack em contexto estrutural e financeiro.",
          "Experiência com testes integrados, Sonar e servidores Java.",
        ],
        atividades: [
          "JAVA – Projeto BRADESCO.",
          "Experiência com metodologias Ágeis (Scrum, Agile, Kanban, Refinamento, Daily, Retrospective/Review).",
          "Desenvolvimento e melhorias voltadas para ambiente estrutural e financeiro.",
          "Utilização de CWS e PDC.",
          "Desenvolvimento e ajuste em telas.",
          "Experiência com Desenvolvimento voltado para ambiente Microsoft AZURE.",
          "Utilização de repositórios de código (Bit Bucket e Star Team).",
          "Utilização code-reviewers (Sonar).",
          "Implementação de testes integrados (Cucumber).",
          "Experiência com servidores de aplicação Java: Tomcat, Jboss e Websphere.",
          "Experiência de arquitetura em soluções Web.",
          "Experiência de desenvolvimento em projetos Web.",
          "Experiência com Banco de Dados SQL Server, PL/SQL.",
          "Evidência de testes unitários (JUnit).",
          "Experiência em JAVA WEB tendo atuado com tecnologias como JavaScript, Json, JQuery, Spring Boot, JSF PrimeFaces, JSP, HTML e XML.",
        ],
      },
      {
        empresa: "Developer K2 - Cliente Sura Seguros",
        periodo: "Junho 2018 – Fevereiro 2021",
        resumo:
          "Soluções para seguros Property e Auto com Java Web, cloud e sustentação enterprise.",
        stack: ["Java", "Spring Boot", "AWS", "Azure", "SQL Server"],
        contexto: "Seguros",
        destaques: [
          "Entrega para linhas de seguros patrimonial e automotivo.",
          "Experiência em cloud, arquitetura web e qualidade de código.",
        ],
        atividades: [
          "JAVA – Projeto SURA Seguros.",
          "Experiência com metodologias Ágeis (Scrum, Agile, Kanban, Refinamento, Daily, Retrospective/Review).",
          "Desenvolvimento e melhorias voltadas para o ambiente de seguros (Property e Auto).",
          "Desenvolvimento voltado para ambiente AWS e Microsoft AZURE.",
          "Utilização de repositórios de código (Bit Bucket e SVN, Jenkins).",
          "Utilização code-reviewers (Sonar).",
          "Experiência com servidores de aplicação Java: Tomcat, Jboss e Websphere.",
          "Experiência de arquitetura em soluções Web.",
          "Experiência de desenvolvimento em projetos Web.",
          "Experiência com Banco de Dados SQL Server, PL/SQL.",
          "Evidência de testes unitários (JUnit).",
          "Experiência em JAVA WEB tendo atuado com tecnologias como JavaScript, Json, JQuery, Spring Boot, JSF PrimeFaces, JSP, HTML.",
        ],
      },
    ],
    en: [
      {
        empresa: "Developer SINQIA - SOMPO Insurance Client",
        periodo: "December 2023 – Present",
        resumo:
          "Enhancements for quotation and endorsement systems in an enterprise automotive insurance environment.",
        stack: ["Java", "Jenkins", "SQL Server", "Tomcat/JBoss/WebSphere"],
        contexto: "Insurance",
        destaques: [
          "Improved quotation and endorsement workflows.",
          "Worked across web architecture, unit tests and delivery pipelines.",
        ],
        atividades: [
          "JAVA – SOMPO project implementing improvements in quotation and endorsement system.",
          "Development and improvements focused on Automotive insurance environment.",
          "Use of code repositories (Bit Bucket and SVN, Jenkins).",
          "Use of code-reviewers (Sonar).",
          "Experience with Java application servers: Tomcat, Jboss and Websphere.",
          "Experience in Web solutions architecture.",
          "Experience in Web project development.",
          "Experience with SQL Server Database.",
          "Evidence of unit testing (JUnit).",
          "Use of continuous integration tools and pipeline construction (Jenkins).",
        ],
      },
      {
        empresa: "Developer NAVA - Santander Client",
        periodo: "February 2023 – December 2023",
        resumo:
          "Cloud integration for cards, focused on messaging, containers and MainframeXCloud flows.",
        stack: ["Java", "Spring Boot", "Camel", "Kafka", "OpenShift"],
        contexto: "Banking",
        destaques: [
          "Integrated internal systems with cloud card platforms.",
          "Delivered routing, messaging and observability capabilities.",
        ],
        atividades: [
          "JAVA – SANTANDER project cloud cards integration.",
          "Development and improvements focused on internal MainframeXCloud Integration environment.",
          "Use of Camel technology to perform integration routing.",
          "Use of container management platform (Openshift).",
          "Implementation of messaging system (Kafka).",
          "Use of code repositories (GitLab).",
          "Use of programming and persistence framework (Spring Boot, Hibernate and JPA).",
          "Use of programming library framework and Lombok annotations.",
          "Use of cloud-scale data search and visualization resources (CloudWatch).",
          "Use of continuous integration tools and pipeline construction (Jenkins).",
        ],
      },
      {
        empresa: "Developer Reply - Acesstage Client",
        periodo: "June 2022 – February 2023",
        resumo:
          "Solutions for digital banking and payments, including Pix, wire transfer and bill flows.",
        stack: ["Java", "Spring Boot", "Hibernate/JPA", "GitLab", "SQL Server"],
        contexto: "Fintech",
        destaques: [
          "Improved digital account and payment products.",
          "Worked on persistence, databases and delivery pipelines.",
        ],
        atividades: [
          "JAVA – ACESSTAGE project digital bank and pix integration.",
          "Development and improvements focused on digital bank accounts environment (Pix, Ted, Bank slip issuance and payment).",
          "Use of code repositories (GitLab).",
          "Use of programming and persistence framework (Spring Boot, Hibernate and JPA).",
          "Use of programming library framework and Lombok annotations.",
          "Use of cloud-scale data search and visualization resources (CloudWatch).",
          "Use of continuous integration tools and pipeline construction (Jenkins).",
          "Use of Database (SQL Server, PL/SQL) and table managers (Debaver).",
        ],
      },
      {
        empresa: "Developer Reply - Ame Digital Client",
        periodo: "December 2021 – June 2022",
        resumo:
          "Anti-fraud platform development with reactive architecture and strong observability.",
        stack: ["Java", "Spring WebFlux", "DataDog", "Kibana", "Gradle"],
        contexto: "Anti-fraud",
        destaques: [
          "Delivered in a critical risk and anti-fraud environment.",
          "Used WebFlux, observability tooling and dependency security checks.",
        ],
        atividades: [
          "JAVA – AME DIGITAL Anti Fraud project.",
          "Development and improvements focused on anti-fraud environment (Risk - Hub).",
          "Use of code repositories (GitHub).",
          "Use of vulnerability detection and correction tools in application dependencies (Snyk).",
          "Use of reactive programming (Spring WebFlux).",
          "Use of observability service for cloud-scale applications (DataDog).",
          "Use of data search and visualization resources (Kibana and CloudWatch).",
          "Use of code-reviewers (Sonar).",
          "Evidence of unit testing (JUnit).",
          "Use of open source code compilation automation system (Gradle).",
          "Use of SQL Server Database, PL/SQL.",
        ],
      },
      {
        empresa: "Developer Wipro - Bradesco Client",
        periodo: "March 2021 – December 2021",
        resumo:
          "Corporate financial projects with Java Web, Azure and agile delivery practices.",
        stack: ["Java", "Spring Boot", "JSF PrimeFaces", "Azure", "Cucumber"],
        contexto: "Banking",
        destaques: [
          "Full-stack delivery in structural and financial domains.",
          "Hands-on work with integrated tests, Sonar and Java app servers.",
        ],
        atividades: [
          "JAVA – BRADESCO project.",
          "Experience with Agile methodologies (Scrum, Agile, Kanban, Refinement, Daily, Retrospective/Review).",
          "Development and improvements focused on structural and financial environment.",
          "Use of CWS and PDC.",
          "Development and adjustment in screens.",
          "Experience with Development focused on Microsoft AZURE environment.",
          "Use of code repositories (Bit Bucket and Star Team).",
          "Use of code-reviewers (Sonar).",
          "Implementation of integrated tests (Cucumber).",
          "Experience with Java application servers: Tomcat, Jboss and Websphere.",
          "Experience in Web solutions architecture.",
          "Experience in Web project development.",
          "Experience with SQL Server Database, PL/SQL.",
          "Evidence of unit testing (JUnit).",
          "Experience in JAVA WEB having worked with technologies such as JavaScript, Json, JQuery, Spring Boot, JSF PrimeFaces, JSP, HTML and XML.",
        ],
      },
      {
        empresa: "Developer K2 - Sura Insurance Client",
        periodo: "June 2018 – February 2021",
        resumo:
          "Insurance solutions for Property and Auto with Java Web, cloud and enterprise support.",
        stack: ["Java", "Spring Boot", "AWS", "Azure", "SQL Server"],
        contexto: "Insurance",
        destaques: [
          "Delivered for property and automotive insurance lines.",
          "Experience across cloud, web architecture and code quality.",
        ],
        atividades: [
          "JAVA – SURA Insurance project.",
          "Experience with Agile methodologies (Scrum, Agile, Kanban, Refinement, Daily, Retrospective/Review).",
          "Development and improvements focused on insurance environment (Property and Auto).",
          "Development focused on AWS and Microsoft AZURE environment.",
          "Use of code repositories (Bit Bucket and SVN, Jenkins).",
          "Use of code-reviewers (Sonar).",
          "Experience with Java application servers: Tomcat, Jboss and Websphere.",
          "Experience in Web solutions architecture.",
          "Experience in Web project development.",
          "Experience with SQL Server Database, PL/SQL.",
          "Evidence of unit testing (JUnit).",
          "Experience in JAVA WEB having worked with technologies such as JavaScript, Json, JQuery, Spring Boot, JSF PrimeFaces, JSP, HTML.",
        ],
      },
    ],
  };

  const experiencias = experienciasData[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="timeline-container"
    >
      <div className="section-header">
        <h2 className="section-title">
          {t("experienceTitle")} ({experiencias.length})
        </h2>
        <div className="section-underline"></div>
      </div>

      <div className="timeline-wrapper">
        {/* Timeline Line */}
        <div className="timeline-line"></div>

        {experiencias.map((exp, idx) => (
          <motion.div
            key={idx}
            className={`timeline-item ${
              idx % 2 === 0 ? "timeline-left" : "timeline-right"
            } ${activeExperience === idx ? "active" : ""}`}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Timeline Node */}
            <motion.button
              type="button"
              className="timeline-node"
              whileHover={{ scale: 1.2 }}
              onClick={() => toggleExperience(idx)}
              aria-label={`${exp.empresa} - ${exp.periodo}`}
              aria-expanded={Boolean(expandedExperiences[idx])}
            >
              <div className="timeline-node-inner">
                <i className="fas fa-briefcase"></i>
              </div>
            </motion.button>

            {/* Timeline Content */}
            <motion.button
              type="button"
              className="timeline-content"
              onClick={() => toggleExperience(idx)}
              whileHover={{ scale: 1.02 }}
              aria-expanded={Boolean(expandedExperiences[idx])}
            >
              <div className="timeline-header">
                <h3 className="timeline-company">{exp.empresa}</h3>
                <div className="timeline-period">{exp.periodo}</div>
              </div>

              <p className="timeline-summary">{exp.resumo}</p>

              <div className="timeline-preview-grid">
                <div className="timeline-preview-card">
                  <span className="timeline-preview-label">
                    {t("experienceDomainLabel")}
                  </span>
                  <strong>{exp.contexto}</strong>
                </div>
                <div className="timeline-preview-card timeline-preview-card-stack">
                  <span className="timeline-preview-label">
                    {t("experienceStackLabel")}
                  </span>
                  <div className="timeline-stack-chips">
                    {exp.stack.map((item) => (
                      <span key={item} className="timeline-stack-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timeline-highlights">
                <span className="timeline-preview-label">
                  {t("experienceHighlightsLabel")}
                </span>
                <ul>
                  {exp.destaques.map((destaque) => (
                    <li key={destaque}>{destaque}</li>
                  ))}
                </ul>
              </div>

              {/* Expand/Collapse Icon */}
              <motion.div
                className="timeline-expand-icon"
                animate={{
                  rotate: expandedExperiences[idx] ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-chevron-down"></i>
                <span className="timeline-expand-text">
                  {expandedExperiences[idx]
                    ? t("experienceCollapseLabel")
                    : t("experienceExpandLabel")}
                </span>
              </motion.div>

              {/* Expandable Activities */}
              <AnimatePresence>
                {expandedExperiences[idx] && (
                  <motion.div
                    className="timeline-activities"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="activities-grid">
                      {exp.atividades.map((atividade, i) => (
                        <motion.div
                          key={i}
                          className="activity-item"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div className="activity-bullet"></div>
                          <p>{atividade}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default Experiencias;
