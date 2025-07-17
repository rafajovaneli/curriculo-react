import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Enhanced loading component with better UX
const LoadingFallback = ({
  text = "Loading...",
  size = "medium",
  showProgress = false,
  delay = 200,
}) => {
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoader) return null;

  const sizeClasses = {
    small: "spinner-border-sm",
    medium: "",
    large: "spinner-border-lg",
  };

  return (
    <div
      className="code-split-loader"
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        minHeight: size === "large" ? "400px" : "200px",
        gap: "1rem",
      }}
    >
      <div className={`spinner-border ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <span
        className="loading-text"
        style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
      >
        {text}
      </span>
      {showProgress && (
        <div className="progress" style={{ width: "200px", height: "4px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      )}
    </div>
  );
};

// Error fallback component
const ErrorFallback = ({ error, retry, componentName }) => (
  <div
    className="code-split-error"
    role="alert"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      minHeight: "200px",
      gap: "1rem",
      backgroundColor: "var(--error-bg, #fff5f5)",
      border: "1px solid var(--error-border, #fed7d7)",
      borderRadius: "8px",
      margin: "1rem 0",
    }}
  >
    <div style={{ fontSize: "2rem", color: "var(--error-color, #e53e3e)" }}>
      ⚠️
    </div>
    <h3
      style={{
        margin: 0,
        fontSize: "1.1rem",
        color: "var(--error-color, #e53e3e)",
      }}
    >
      Failed to load {componentName || "component"}
    </h3>
    <p style={{ margin: 0, textAlign: "center", color: "var(--text-muted)" }}>
      Something went wrong while loading this section.
    </p>
    {retry && (
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={retry}
        style={{ marginTop: "0.5rem" }}
      >
        Try Again
      </button>
    )}
  </div>
);

// Main CodeSplitLoader component
const CodeSplitLoader = ({
  children,
  fallback,
  errorFallback,
  componentName,
  loadingProps = {},
  onError,
  retryable = true,
}) => {
  const [retryCount, setRetryCount] = React.useState(0);
  const [key, setKey] = React.useState(0);

  const handleRetry = React.useCallback(() => {
    setRetryCount((prev) => prev + 1);
    setKey((prev) => prev + 1);
  }, []);

  const handleError = React.useCallback(
    (error, errorInfo) => {
      console.error(
        `Code splitting error in ${componentName}:`,
        error,
        errorInfo
      );
      onError?.(error, errorInfo);
    },
    [componentName, onError]
  );

  const defaultFallback = fallback || (
    <LoadingFallback
      text={`Loading ${componentName || "component"}...`}
      {...loadingProps}
    />
  );

  const defaultErrorFallback = errorFallback || (
    <ErrorFallback
      componentName={componentName}
      retry={retryable ? handleRetry : null}
    />
  );

  return (
    <ErrorBoundary
      key={key}
      fallback={defaultErrorFallback}
      onError={handleError}
      retryCount={retryCount}
    >
      <Suspense fallback={defaultFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

// Higher-order component for easy code splitting
export const withCodeSplitting = (importFunction, options = {}) => {
  const LazyComponent = React.lazy(importFunction);

  return React.forwardRef((props, ref) => (
    <CodeSplitLoader {...options}>
      <LazyComponent ref={ref} {...props} />
    </CodeSplitLoader>
  ));
};

// Hook for preloading components
export const usePreloadComponent = () => {
  const preloadedComponents = React.useRef(new Set());

  const preload = React.useCallback((importFunction) => {
    if (!preloadedComponents.current.has(importFunction)) {
      importFunction().catch(console.error);
      preloadedComponents.current.add(importFunction);
    }
  }, []);

  return { preload };
};

export default CodeSplitLoader;
