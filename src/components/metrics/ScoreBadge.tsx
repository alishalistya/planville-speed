"use client";

import { getScoreColor, getScoreBgColor } from "@/lib/scoring";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${getScoreColor(score)} ${getScoreBgColor(score)} ${sizeClasses[size]}`}
    >
      {Math.round(score)}
    </span>
  );
}
