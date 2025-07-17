import React, { useEffect, useRef, useState, useCallback } from "react";

const EnhancedParticleSystem = ({
  particleCount = 50,
  particleColor = "#00ff41",
  particleSize = 2,
  speed = 1,
  connectionDistance = 100,
  showConnections = true,
  interactive = true,
  mouseRadius = 150,
  className = "",
  style = {},
  ...props
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      this.vx = (Math.random() - 0.5) * speed;
      this.vy = (Math.random() - 0.5) * speed;
      this.originalVx = this.vx;
      this.originalVy = this.vy;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = particleSize + Math.random() * 2;
      this.opacity = Math.random() * 0.5 + 0.5;
    }

    update(mouse) {
      if (interactive && mouse) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.5;
          this.vy -= Math.sin(angle) * force * 0.5;
        } else {
          this.vx += (this.originalVx - this.vx) * 0.05;
          this.vy += (this.originalVy - this.vy) * 0.05;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > this.canvas.width) {
        this.vx *= -1;
        this.originalVx *= -1;
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.vy *= -1;
        this.originalVy *= -1;
      }

      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }
  }, [particleCount]);

  const drawConnections = useCallback(
    (ctx, particles) => {
      if (!showConnections) return;

      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.save();
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    },
    [showConnections, particleColor, connectionDistance]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isVisible) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const mouse = interactive ? mouseRef.current : null;

    particles.forEach((particle) => {
      particle.update(mouse);
      particle.draw(ctx);
    });

    drawConnections(ctx, particles);
    animationRef.current = requestAnimationFrame(animate);
  }, [isVisible, interactive, drawConnections]);

  const handleMouseMove = useCallback(
    (event) => {
      if (!interactive) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div
      className={`particle-system ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
        ...style,
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

// Matrix-style falling particles
export const MatrixParticles = ({
  className = "",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
  fontSize = 18,
  speed = 50,
  ...props
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize drops
      const columns = Math.floor(canvas.width / fontSize);
      dropsRef.current = new Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * (canvas.height / fontSize)));
    };

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties with glow effect
      ctx.shadowColor = "#00ff41";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      dropsRef.current.forEach((y, index) => {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const x = index * fontSize;
        const yPos = y * fontSize;

        // Add some opacity variation
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;

        ctx.fillText(char, x, yPos);

        // Reset drop to top when it reaches bottom
        if (yPos > canvas.height && Math.random() > 0.975) {
          dropsRef.current[index] = 0;
        }
        dropsRef.current[index]++;
      });

      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle visibility changes for performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [characters, fontSize, isVisible]);

  return (
    <div className={`matrix-particles ${className}`} {...props}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default EnhancedParticleSystem;
