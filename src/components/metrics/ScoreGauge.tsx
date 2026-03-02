"use client";

import { getScoreRingColor } from "@/lib/scoring";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreGauge({
  score,
  size = 120,
  strokeWidth = 8,
  label,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreRingColor(score);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      {label && (
        <span className="text-xs text-gray-500 mt-1">{label}</span>
      )}
    </div>
  );
}
