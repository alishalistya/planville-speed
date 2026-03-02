"use client";

import { AggregatedRecommendation } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/recommendations";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  AlertTriangle,
  Info,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface RecommendationCardProps {
  recommendation: AggregatedRecommendation;
}

export default function RecommendationCard({
  recommendation: rec,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const impactConfig = {
    high: {
      label: "High Impact",
      color: "text-red-700 bg-red-50 border-red-200",
      icon: AlertCircle,
    },
    medium: {
      label: "Medium Impact",
      color: "text-orange-700 bg-orange-50 border-orange-200",
      icon: AlertTriangle,
    },
    low: {
      label: "Low Impact",
      color: "text-blue-700 bg-blue-50 border-blue-200",
      icon: Info,
    },
  };

  const config = impactConfig[rec.impact];
  const ImpactIcon = config.icon;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
      >
        <ImpactIcon
          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.color.split(" ")[0]}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900">
              {rec.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${config.color}`}
            >
              {config.label}
            </span>
            <span className="text-xs text-gray-400 px-2 py-0.5 rounded-full bg-gray-100">
              {CATEGORY_LABELS[rec.category]}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-gray-500">
              {rec.affectedPages.length} page
              {rec.affectedPages.length !== 1 ? "s" : ""} affected
            </span>
            {rec.averageSavingsMs && rec.averageSavingsMs > 0 && (
              <span className="text-xs text-green-600 font-medium">
                ~{rec.averageSavingsMs >= 1000
                  ? `${(rec.averageSavingsMs / 1000).toFixed(1)}s`
                  : `${rec.averageSavingsMs}ms`}{" "}
                avg savings
              </span>
            )}
            {rec.averageSavingsBytes && rec.averageSavingsBytes > 0 && (
              <span className="text-xs text-green-600 font-medium">
                ~
                {rec.averageSavingsBytes >= 1024
                  ? `${(rec.averageSavingsBytes / 1024).toFixed(0)}KB`
                  : `${rec.averageSavingsBytes}B`}{" "}
                avg savings
              </span>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Wrench className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                How to Fix (WordPress / Divi / WP Rocket)
              </span>
            </div>
            <ul className="space-y-1.5">
              {rec.actionItems.map((action, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-blue-500 mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Affected Pages
            </div>
            <div className="flex flex-wrap gap-1.5">
              {rec.affectedPages.map((url) => {
                const name =
                  url
                    .replace("https://planville.de/", "")
                    .replace(/\/$/, "") || "Homepage";
                return (
                  <span
                    key={url}
                    className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-600"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
