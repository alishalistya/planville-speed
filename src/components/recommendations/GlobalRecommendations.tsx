"use client";

import { AnalysisResult } from "@/lib/types";
import { aggregateRecommendations } from "@/lib/recommendations";
import RecommendationCard from "./RecommendationCard";
import { Lightbulb } from "lucide-react";

interface GlobalRecommendationsProps {
  results: AnalysisResult[];
}

export default function GlobalRecommendations({
  results,
}: GlobalRecommendationsProps) {
  const recommendations = aggregateRecommendations(results);

  if (recommendations.length === 0) return null;

  const highImpact = recommendations.filter((r) => r.impact === "high");
  const mediumImpact = recommendations.filter((r) => r.impact === "medium");
  const lowImpact = recommendations.filter((r) => r.impact === "low");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Recommendations
        </h3>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Aggregated across all analyzed pages with WordPress/Divi/WP Rocket
        specific action items.
      </p>

      {highImpact.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-3">
            High Impact ({highImpact.length})
          </h4>
          <div className="space-y-2">
            {highImpact.map((rec) => (
              <RecommendationCard key={rec.auditId} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {mediumImpact.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-3">
            Medium Impact ({mediumImpact.length})
          </h4>
          <div className="space-y-2">
            {mediumImpact.map((rec) => (
              <RecommendationCard key={rec.auditId} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {lowImpact.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">
            Low Impact ({lowImpact.length})
          </h4>
          <div className="space-y-2">
            {lowImpact.map((rec) => (
              <RecommendationCard key={rec.auditId} recommendation={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
