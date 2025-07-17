import React, { useState, useEffect, useRef } from "react";

const TypingEffect = ({
  texts = [],
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  loop = true,
  cursor = "|",
  className = "",
  onComplete,
  startDelay = 0,
  ...props
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef(null);
  const cursorTimeoutRef = useRef(null);

  // Cursor blinking effect
  useEffect(() => {
    const blinkCursor = () => {
      setShowCursor((prev) => !prev);
    };

    cursorTimeoutRef.current = setInterval(blinkCursor, 530);

    return () => {
      if (cursorTimeoutRef.current) {
        clearInterval(cursorTimeoutRef.current);
      }
    };
  }, []);

  // Main typing effect
  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Finished typing current text
          if (texts.length > 1) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          } else if (onComplete) {
            onComplete();
          }
          return;
        }
      } else {
        // Deleting text
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          const nextIndex = (currentIndex + 1) % texts.length;

          if (nextIndex === 0 && !loop) {
            if (onComplete) onComplete();
            return;
          }

          setCurrentIndex(nextIndex);
          return;
        }
      }

      // Schedule next character
      const nextSpeed = isDeleting ? deleteSpeed : speed;
      timeoutRef.current = setTimeout(handleTyping, nextSpeed);
    };

    // Start typing with initial delay
    const initialDelay =
      displayText === "" && currentIndex === 0 ? startDelay : 0;
    timeoutRef.current = setTimeout(handleTyping, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    currentIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    pauseTime,
    loop,
    onComplete,
    startDelay,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorTimeoutRef.current) clearInterval(cursorTimeoutRef.current);
    };
  }, []);

  // Show fallback if no texts provided
  if (texts.length === 0) {
    return (
      <span className={`typing-effect ${className}`} {...props}>
        Loading...
        {cursor && (
          <span
            className="typing-cursor"
            style={{
              opacity: showCursor ? 1 : 0,
              transition: "opacity 0.1s ease-in-out",
            }}
          >
            {cursor}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`typing-effect ${className}`} {...props}>
      {displayText}
      {cursor && (
        <span
          className="typing-cursor"
          style={{
            opacity: showCursor ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
          }}
        >
          {cursor}
        </span>
      )}
    </span>
  );
};

// Simple alternative typing effect for testing
export const SimpleTypingEffect = ({
  text = "",
  speed = 100,
  className = "",
  ...props
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`typing-effect ${className}`} {...props}>
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

export default TypingEffect;
