import React from "react";

function Navbar({ darkMode, setDarkMode }) {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        darkMode ? "navbar-dark bg-primary" : "navbar-light bg-light"
      } border-bottom`}
    >
      <a className="navbar-brand" href="#">
        RAFAEL H. JOVANELI
      </a>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => scrollTo("competencias")}
              style={{ cursor: "pointer" }}
            >
              Competências
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => scrollTo("grafico")}
              style={{ cursor: "pointer" }}
            >
              Tecnologias
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => scrollTo("experiencias")}
              style={{ cursor: "pointer" }}
            >
              Experiências
            </span>
          </li>
          <li className="nav-item">
            <button
              className={`btn ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              } ml-2`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
