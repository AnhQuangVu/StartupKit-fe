import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function FeedbackButton({
  formLink = "https://forms.gle/2eGMUWPXxKD8ZXnx6",
}) {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef(null);

  // Auto fade out after 3 seconds of inactivity
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsActive(true);
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 3000);
    };

    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setIsActive(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    window.open(formLink, "_blank");
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  const handleMouseEnter = () => {
    setIsActive(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        cursor: "pointer",
        transition: "opacity 0.3s ease",
        opacity: isActive ? 1 : 0.3,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="select-none"
    >
      <div className="w-14 h-14 bg-gradient-to-r from-[#FFCE23] to-[#FFD600] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-110">
        <FontAwesomeIcon icon={faCommentDots} className="text-black text-xl" />
      </div>
    </div>
  );
}
