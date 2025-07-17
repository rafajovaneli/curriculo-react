import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

function Experiencias() {
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
            <motion.div
              className="timeline-node"
              whileHover={{ scale: 1.2 }}
              onClick={() => toggleExperience(idx)}
            >
              <div className="timeline-node-inner">
                <i className="fas fa-briefcase"></i>
              </div>
            </motion.div>

            {/* Timeline Content */}
            <motion.div
              className="timeline-content"
              onClick={() => toggleExperience(idx)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="timeline-header">
                <h3 className="timeline-company">{exp.empresa}</h3>
                <div className="timeline-period">{exp.periodo}</div>
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Experiencias;
