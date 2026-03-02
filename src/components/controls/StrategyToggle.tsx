"use client";

import { Strategy } from "@/lib/types";
import { Smartphone, Monitor } from "lucide-react";

interface StrategyToggleProps {
  strategy: Strategy;
  onChange: (strategy: Strategy) => void;
  disabled?: boolean;
}

export default function StrategyToggle({
  strategy,
  onChange,
  disabled,
}: StrategyToggleProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          strategy === "mobile"
            ? "bg-white shadow text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => onChange("mobile")}
        disabled={disabled}
      >
        <Smartphone className="w-3.5 h-3.5" />
        Mobile
      </button>
      <button
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          strategy === "desktop"
            ? "bg-white shadow text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => onChange("desktop")}
        disabled={disabled}
      >
        <Monitor className="w-3.5 h-3.5" />
        Desktop
      </button>
    </div>
  );
}
