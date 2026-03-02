"use client";

import { useState } from "react";
import { AnalysisResult, Strategy } from "@/lib/types";
import { formatMetricValue, getScoreColor } from "@/lib/scoring";
import ScoreBadge from "../metrics/ScoreBadge";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PageTableProps {
  results: AnalysisResult[];
  strategy: Strategy;
}

type SortKey =
  | "label"
  | "performanceScore"
  | "firstContentfulPaint"
  | "largestContentfulPaint"
  | "totalBlockingTime"
  | "cumulativeLayoutShift"
  | "speedIndex";

export default function PageTable({ results, strategy }: PageTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("performanceScore");
  const [sortAsc, setSortAsc] = useState(true);

  const validResults = results.filter((r) => {
    const d = strategy === "mobile" ? r.mobile : r.desktop;
    return d && !r.error;
  });

  const sorted = [...validResults].sort((a, b) => {
    if (sortKey === "label") {
      return sortAsc
        ? a.page.label.localeCompare(b.page.label)
        : b.page.label.localeCompare(a.page.label);
    }
    const aData = (strategy === "mobile" ? a.mobile : a.desktop)!;
    const bData = (strategy === "mobile" ? b.mobile : b.desktop)!;
    const aVal = aData.metrics[sortKey as keyof typeof aData.metrics] as number;
    const bVal = bData.metrics[sortKey as keyof typeof bData.metrics] as number;
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "label" ? true : true);
    }
  };

  const columns: { key: SortKey; label: string; short: string }[] = [
    { key: "label", label: "Page", short: "Page" },
    { key: "performanceScore", label: "Score", short: "Score" },
    { key: "firstContentfulPaint", label: "FCP", short: "FCP" },
    { key: "largestContentfulPaint", label: "LCP", short: "LCP" },
    { key: "totalBlockingTime", label: "TBT", short: "TBT" },
    { key: "cumulativeLayoutShift", label: "CLS", short: "CLS" },
    { key: "speedIndex", label: "SI", short: "SI" },
  ];

  if (validResults.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          All Pages ({validResults.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.short}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const data = (strategy === "mobile" ? r.mobile : r.desktop)!;
              const m = data.metrics;
              const slug = r.page.url
                .replace("https://planville.de/", "")
                .replace(/\/$/, "") || "homepage";

              return (
                <tr
                  key={r.page.url}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <Link
                      href={`/page/${encodeURIComponent(slug)}`}
                      className="font-medium text-sm text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {r.page.label}
                    </Link>
                    <div className="text-xs text-gray-400 truncate max-w-[200px]">
                      {r.page.tier}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <ScoreBadge score={m.performanceScore} size="sm" />
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${getScoreColor(m.firstContentfulPaint <= 1800 ? 90 : m.firstContentfulPaint <= 3000 ? 60 : 30)}`}
                    >
                      {formatMetricValue(
                        "firstContentfulPaint",
                        m.firstContentfulPaint
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${getScoreColor(m.largestContentfulPaint <= 2500 ? 90 : m.largestContentfulPaint <= 4000 ? 60 : 30)}`}
                    >
                      {formatMetricValue(
                        "largestContentfulPaint",
                        m.largestContentfulPaint
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${getScoreColor(m.totalBlockingTime <= 200 ? 90 : m.totalBlockingTime <= 600 ? 60 : 30)}`}
                    >
                      {formatMetricValue(
                        "totalBlockingTime",
                        m.totalBlockingTime
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${getScoreColor(m.cumulativeLayoutShift <= 0.1 ? 90 : m.cumulativeLayoutShift <= 0.25 ? 60 : 30)}`}
                    >
                      {formatMetricValue(
                        "cumulativeLayoutShift",
                        m.cumulativeLayoutShift
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${getScoreColor(m.speedIndex <= 3400 ? 90 : m.speedIndex <= 5800 ? 60 : 30)}`}
                    >
                      {formatMetricValue("speedIndex", m.speedIndex)}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <a
                      href={r.page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
