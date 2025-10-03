import React from "react";

interface BadgeProps {
  text: string;
  status: "success" | "warning" | "info" | "error" | "neutral";
}

function Badge({ text, status }: BadgeProps) {
  return <span className={`badge ${status}`}>{text}</span>;
}

export default Badge;