import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+",
  loading = "lazy",
  sizes,
  srcSet,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={{ position: "relative", overflow: "hidden" }}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="lazy-image-placeholder"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(5px)",
            transition: "opacity 0.3s ease",
          }}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          className={`lazy-image ${isLoaded ? "loaded" : "loading"}`}
          style={{
            position: isLoaded ? "static" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div
          className="lazy-image-error"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
            fontSize: "0.875rem",
          }}
          role="img"
          aria-label={`Failed to load image: ${alt}`}
        >
          <i className="fas fa-image" style={{ marginRight: "0.5rem" }}></i>
          Image unavailable
        </div>
      )}

      {/* Loading Indicator */}
      {isInView && !isLoaded && !hasError && (
        <div
          className="lazy-image-loading"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          aria-live="polite"
        >
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading image...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
