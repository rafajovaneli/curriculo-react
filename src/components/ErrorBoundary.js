import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you could send to error reporting service
    // Example: errorReporting.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, children } = this.props;

      if (Fallback) {
        return <Fallback error={this.state.error} />;
      }

      return (
        <div
          className="error-boundary"
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem",
            margin: "1rem",
          }}
          role="alert"
        >
          <h2 style={{ color: "#dc3545", marginBottom: "1rem" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>

          {process.env.NODE_ENV === "development" && (
            <details style={{ marginTop: "1rem", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", color: "#007bff" }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "1rem",
                  overflow: "auto",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                }}
              >
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
