import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/fonts.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
          Algo deu errado. Recarregue a página. / Something went wrong. Please
          reload the page.
        </div>
      }
    >
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
