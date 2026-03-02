"use client";

import { Loader2 } from "lucide-react";

interface AnalysisProgressProps {
  currentUrl: string | null;
  completedPages: number;
  totalPages: number;
}

export default function AnalysisProgress({
  currentUrl,
  completedPages,
  totalPages,
}: AnalysisProgressProps) {
  const progress =
    totalPages > 0 ? Math.round((completedPages / totalPages) * 100) : 0;

  const pageName = currentUrl
    ? currentUrl
        .replace("https://planville.de/", "")
        .replace(/\/$/, "") || "Homepage"
    : "";

  return (
    <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Analyzing...
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {completedPages} / {totalPages} pages
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {pageName && (
        <div className="text-xs text-gray-500 truncate">
          Current: {pageName}
        </div>
      )}
    </div>
  );
}
