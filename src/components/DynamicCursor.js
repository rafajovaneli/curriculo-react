import React, { useEffect, useState, useRef } from "react";

const DynamicCursor = () => {
  const [symbols, setSymbols] = useState([]);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Tech symbols that will float around
  const techSymbols = [
    "{",
    "}",
    "<",
    ">",
    "|",
    "-",
    "+",
    "=",
    ";",
    ":",
    "/",
    "\\",
    "[",
    "]",
    "(",
    ")",
    ".",
    ",",
    "?",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "~",
    "`",
    "'",
    '"',
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  // Initialize symbols on mount
  useEffect(() => {
    const initialSymbols = [];
    const symbolCount = 400; // Extreme amount of symbols for maximum impact

    for (let i = 0; i < symbolCount; i++) {
      initialSymbols.push({
        id: i,
        char: techSymbols[Math.floor(Math.random() * techSymbols.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        originalX: Math.random() * window.innerWidth,
        originalY: Math.random() * window.innerHeight,
        size: Math.random() * 10 + 12,
        opacity: Math.random() * 0.5 + 0.2,
        color:
          Math.random() > 0.5
            ? "#00ff41" // Bright Matrix green
            : Math.random() > 0.3
            ? "#00cc33" // Medium green
            : "#008822", // Darker green
        speed: Math.random() * 0.3 + 0.1,
        floatOffsetX: Math.random() * Math.PI * 2,
        floatOffsetY: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRadius: Math.random() * 20 + 10,
      });
    }

    setSymbols(initialSymbols);
  }, []);

  // Handle mouse movement with ref to avoid animation restart
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle scroll detection to show/hide symbols only on hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero section is 100vh

      // Show symbols only when in hero section (first screen)
      setIsHeroSection(scrollY < heroHeight * 0.8); // Hide when 80% scrolled past hero
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Continuous animation loop
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setSymbols((prevSymbols) =>
        prevSymbols.map((symbol) => {
          const mousePos = mousePositionRef.current;

          // Calculate distance from mouse
          const dx = mousePos.x - symbol.x;
          const dy = mousePos.y - symbol.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Continuous floating animation
          const floatX =
            Math.sin(symbol.floatOffsetX) * symbol.floatRadius * 0.3;
          const floatY =
            Math.cos(symbol.floatOffsetY) * symbol.floatRadius * 0.3;

          // Update float offsets for continuous movement
          const newFloatOffsetX = symbol.floatOffsetX + symbol.floatSpeed;
          const newFloatOffsetY = symbol.floatOffsetY + symbol.floatSpeed * 0.7;

          // Repulsion effect when cursor is near
          const repulsionRadius = 120;
          let targetX = symbol.originalX + floatX;
          let targetY = symbol.originalY + floatY;

          if (distance < repulsionRadius && distance > 0) {
            // Push away from cursor
            const force = (repulsionRadius - distance) / repulsionRadius;
            const pushX = ((symbol.x - mousePos.x) / distance) * force * 80;
            const pushY = ((symbol.y - mousePos.y) / distance) * force * 80;

            targetX = symbol.x + pushX;
            targetY = symbol.y + pushY;
          }

          // Smooth movement towards target
          const newX = symbol.x + (targetX - symbol.x) * 0.05;
          const newY = symbol.y + (targetY - symbol.y) * 0.05;

          // Keep symbols within screen bounds with padding
          const boundedX = Math.max(30, Math.min(window.innerWidth - 30, newX));
          const boundedY = Math.max(
            30,
            Math.min(window.innerHeight - 30, newY)
          );

          return {
            ...symbol,
            x: boundedX,
            y: boundedY,
            floatOffsetX: newFloatOffsetX,
            floatOffsetY: newFloatOffsetY,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setSymbols((prevSymbols) =>
        prevSymbols.map((symbol) => ({
          ...symbol,
          originalX: Math.random() * window.innerWidth,
          originalY: Math.random() * window.innerHeight,
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        opacity: isHeroSection ? 1 : 0,
        transition: "opacity 0.5s ease-out",
      }}
    >
      {isHeroSection &&
        symbols.map((symbol) => (
          <div
            key={symbol.id}
            style={{
              position: "absolute",
              left: symbol.x,
              top: symbol.y,
              color: symbol.color,
              fontSize: `${symbol.size}px`,
              fontFamily: "monospace",
              fontWeight: "bold",
              opacity: symbol.opacity,
              transform: "translate(-50%, -50%)",
              textShadow: `0 0 8px ${symbol.color}`,
              userSelect: "none",
              transition: "all 0.1s ease-out",
            }}
          >
            {symbol.char}
          </div>
        ))}
    </div>
  );
};

export default DynamicCursor;
