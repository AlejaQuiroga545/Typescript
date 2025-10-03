import React, { useState } from "react";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Button({
  text,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = () => {
    if (disabled || isLoading) return;
    if (onClick) {
      setIsLoading(true);
      onClick();
      // simulamos tiempo de carga
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <button
      className={`button ${variant} ${size} ${isLoading ? "loading" : ""}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      {isLoading ? "Loading..." : text}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </button>
  );
}

export default Button;