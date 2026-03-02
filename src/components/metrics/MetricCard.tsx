"use client";

import { getMetricCategory } from "@/lib/scoring";
import { METRIC_THRESHOLDS } from "@/lib/constants";
import { formatMetricValue, getScoreColor } from "@/lib/scoring";

interface MetricCardProps {
  metricKey: string;
  value: number;
  label: string;
  shortLabel?: string;
}

export default function MetricCard({
  metricKey,
  value,
  label,
  shortLabel,
}: MetricCardProps) {
  const category = getMetricCategory(
    metricKey as keyof typeof METRIC_THRESHOLDS,
    value
  );
  const colorClass = getScoreColor(
    category === "good" ? 90 : category === "needs-improvement" ? 60 : 30
  );

  const categoryLabels = {
    good: "Good",
    "needs-improvement": "Needs Work",
    poor: "Poor",
  };

  const categoryBg = {
    good: "bg-green-50 border-green-200",
    "needs-improvement": "bg-orange-50 border-orange-200",
    poor: "bg-red-50 border-red-200",
  };

  return (
    <div
      className={`rounded-lg border p-4 ${categoryBg[category]} transition-all hover:shadow-md`}
    >
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
        {shortLabel || label}
      </div>
      <div className={`text-2xl font-bold ${colorClass}`}>
        {formatMetricValue(metricKey, value)}
      </div>
      <div className={`text-xs mt-1 ${colorClass}`}>
        {categoryLabels[category]}
      </div>
    </div>
  );
}
