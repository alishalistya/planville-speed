"use client";

import { AnalysisResult } from "@/lib/types";
import { formatMetricValue, getScoreColor, getMetricCategory } from "@/lib/scoring";
import { METRIC_THRESHOLDS } from "@/lib/constants";
import { Gauge, Clock, MousePointerClick, Move } from "lucide-react";

interface OverviewCardsProps {
  results: AnalysisResult[];
  strategy: "mobile" | "desktop";
}

export default function OverviewCards({
  results,
  strategy,
}: OverviewCardsProps) {
  const validResults = results.filter((r) => {
    const data = strategy === "mobile" ? r.mobile : r.desktop;
    return data && !r.error;
  });

  if (validResults.length === 0) return null;

  const avg = (key: string) => {
    const sum = validResults.reduce((acc, r) => {
      const data = strategy === "mobile" ? r.mobile : r.desktop;
      if (!data) return acc;
      return acc + (data.metrics[key as keyof typeof data.metrics] as number);
    }, 0);
    return sum / validResults.length;
  };

  const avgScore = avg("performanceScore");
  const avgLCP = avg("largestContentfulPaint");
  const avgTBT = avg("totalBlockingTime");
  const avgCLS = avg("cumulativeLayoutShift");

  const cards = [
    {
      label: "Avg. Performance",
      value: avgScore,
      key: "performanceScore",
      icon: Gauge,
      formatted: `${Math.round(avgScore)}/100`,
    },
    {
      label: "Avg. LCP",
      value: avgLCP,
      key: "largestContentfulPaint",
      icon: Clock,
      formatted: formatMetricValue("largestContentfulPaint", avgLCP),
    },
    {
      label: "Avg. TBT",
      value: avgTBT,
      key: "totalBlockingTime",
      icon: MousePointerClick,
      formatted: formatMetricValue("totalBlockingTime", avgTBT),
    },
    {
      label: "Avg. CLS",
      value: avgCLS,
      key: "cumulativeLayoutShift",
      icon: Move,
      formatted: formatMetricValue("cumulativeLayoutShift", avgCLS),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const category = getMetricCategory(
          card.key as keyof typeof METRIC_THRESHOLDS,
          card.value
        );
        const colorClass = getScoreColor(
          category === "good" ? 90 : category === "needs-improvement" ? 60 : 30
        );
        const bgClasses = {
          good: "bg-green-50 border-green-200",
          "needs-improvement": "bg-orange-50 border-orange-200",
          poor: "bg-red-50 border-red-200",
        };

        return (
          <div
            key={card.key}
            className={`rounded-xl border p-5 ${bgClasses[category]} transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`w-4 h-4 ${colorClass}`} />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {card.label}
              </span>
            </div>
            <div className={`text-3xl font-bold ${colorClass}`}>
              {card.formatted}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              across {validResults.length} pages
            </div>
          </div>
        );
      })}
    </div>
  );
}
