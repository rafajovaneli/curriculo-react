import React from "react";

const ImageOptimizer = ({
  src,
  alt,
  width,
  height,
  className = "",
  quality = 85,
  format = "webp",
  fallbackFormat = "jpg",
  sizes = "100vw",
  loading = "lazy",
  ...props
}) => {
  // Generate responsive image URLs (this would typically integrate with a CDN or image service)
  const generateSrcSet = (baseSrc, format) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    return breakpoints
      .map((bp) => `${baseSrc}?w=${bp}&q=${quality}&f=${format} ${bp}w`)
      .join(", ");
  };

  // Generate optimized src URL
  const optimizedSrc = `${src}?w=${width || 800}&q=${quality}&f=${format}`;
  const fallbackSrc = `${src}?w=${
    width || 800
  }&q=${quality}&f=${fallbackFormat}`;

  return (
    <picture className={`optimized-image ${className}`}>
      <source
        srcSet={generateSrcSet(src, "webp")}
        sizes={sizes}
        type="image/webp"
      />

      <source
        srcSet={generateSrcSet(src, "avif")}
        sizes={sizes}
        type="image/avif"
      />

      <img
        src={fallbackSrc}
        srcSet={generateSrcSet(src, fallbackFormat)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        {...props}
      />
    </picture>
  );
};

export const withImageOptimization = (WrappedComponent) => {
  return React.forwardRef((props, ref) => {
    const optimizeImageProps = (originalProps) => {
      const { src, ...otherProps } = originalProps;

      if (src && typeof src === "string") {
        return {
          ...otherProps,
          src: `${src}?auto=format,compress&q=85`,
        };
      }

      return originalProps;
    };

    return <WrappedComponent ref={ref} {...optimizeImageProps(props)} />;
  });
};

export default ImageOptimizer;
