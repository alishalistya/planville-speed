"use client";

import { AnalysisResult, Strategy } from "@/lib/types";
import { formatMetricValue, getScoreColor } from "@/lib/scoring";
import { AlertTriangle } from "lucide-react";
import ScoreBadge from "../metrics/ScoreBadge";

interface WorstPagesProps {
  results: AnalysisResult[];
  strategy: Strategy;
}

export default function WorstPages({ results, strategy }: WorstPagesProps) {
  const sorted = results
    .filter((r) => {
      const d = strategy === "mobile" ? r.mobile : r.desktop;
      return d && !r.error;
    })
    .sort((a, b) => {
      const aScore = (strategy === "mobile" ? a.mobile : a.desktop)!.metrics
        .performanceScore;
      const bScore = (strategy === "mobile" ? b.mobile : b.desktop)!.metrics
        .performanceScore;
      return aScore - bScore;
    })
    .slice(0, 5);

  if (sorted.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Lowest Performing Pages
        </h3>
      </div>
      <div className="space-y-3">
        {sorted.map((r) => {
          const data = (strategy === "mobile" ? r.mobile : r.desktop)!;
          const m = data.metrics;
          return (
            <div
              key={r.page.url}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="font-medium text-sm text-gray-900 truncate">
                  {r.page.label}
                </div>
                <div className="text-xs text-gray-500 flex gap-3 mt-1">
                  <span>
                    LCP:{" "}
                    <span
                      className={getScoreColor(
                        m.largestContentfulPaint <= 2500
                          ? 90
                          : m.largestContentfulPaint <= 4000
                            ? 60
                            : 30
                      )}
                    >
                      {formatMetricValue(
                        "largestContentfulPaint",
                        m.largestContentfulPaint
                      )}
                    </span>
                  </span>
                  <span>
                    TBT:{" "}
                    <span
                      className={getScoreColor(
                        m.totalBlockingTime <= 200
                          ? 90
                          : m.totalBlockingTime <= 600
                            ? 60
                            : 30
                      )}
                    >
                      {formatMetricValue(
                        "totalBlockingTime",
                        m.totalBlockingTime
                      )}
                    </span>
                  </span>
                  <span>
                    CLS:{" "}
                    <span
                      className={getScoreColor(
                        m.cumulativeLayoutShift <= 0.1
                          ? 90
                          : m.cumulativeLayoutShift <= 0.25
                            ? 60
                            : 30
                      )}
                    >
                      {formatMetricValue(
                        "cumulativeLayoutShift",
                        m.cumulativeLayoutShift
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <ScoreBadge score={m.performanceScore} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
