"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Strategy, PageSpeedResult, PageConfig } from "@/lib/types";
import { PLANVILLE_PAGES } from "@/lib/constants";
import { analyzeSingle } from "@/lib/pagespeed";
import {
  formatMetricValue,
  getScoreColor,
  getScoreRingColor,
} from "@/lib/scoring";
import CoreWebVitals from "@/components/metrics/CoreWebVitals";
import StrategyToggle from "@/components/controls/StrategyToggle";
import {
  ArrowLeft,
  ExternalLink,
  RotateCw,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function PageDetail() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);

  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassed, setShowPassed] = useState(false);

  const pageConfig: PageConfig | undefined = PLANVILLE_PAGES.find((p) => {
    const pageSlug =
      p.url.replace("https://planville.de/", "").replace(/\/$/, "") ||
      "homepage";
    return pageSlug === slug;
  });

  const url = pageConfig?.url || `https://planville.de/${slug}/`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeSingle(url, strategy);
      setResult(data);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [url, strategy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const score = result?.metrics.performanceScore || 0;
  const ringColor = getScoreRingColor(score);

  // Score gauge SVG
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <StrategyToggle
                strategy={strategy}
                onChange={setStrategy}
                disabled={loading}
              />
              <button
                onClick={fetchData}
                disabled={loading}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  loading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RotateCw className="w-4 h-4" />
                )}
                {loading ? "Analyzing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {pageConfig?.label || slug}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {url}
                  <ExternalLink className="w-3 h-3" />
                </a>
                {pageConfig && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {pageConfig.tier}
                  </span>
                )}
              </div>
              {result && (
                <div className="text-xs text-gray-400 mt-1">
                  Analyzed:{" "}
                  {new Date(result.fetchedAt).toLocaleString()} ({strategy})
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-sm text-gray-500">
              Analyzing {pageConfig?.label || slug}...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              This may take 10-30 seconds
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            {/* Score Gauge + CWV */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
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
                      stroke={ringColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: ringColor }}
                    >
                      {score}
                    </span>
                    <span className="text-xs text-gray-400">/ 100</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2">
                  Performance Score
                </span>
              </div>

              <CoreWebVitals metrics={result.metrics} />
            </div>

            {/* Opportunities */}
            {result.opportunities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Opportunities ({result.opportunities.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {result.opportunities
                    .sort(
                      (a, b) =>
                        (b.details?.overallSavingsMs || 0) -
                        (a.details?.overallSavingsMs || 0)
                    )
                    .map((opp) => (
                      <div
                        key={opp.id}
                        className="flex items-start justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {opp.title}
                          </div>
                          {opp.displayValue && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {opp.displayValue}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {opp.details?.overallSavingsMs &&
                            opp.details.overallSavingsMs > 0 && (
                              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                {formatMetricValue(
                                  "totalBlockingTime",
                                  opp.details.overallSavingsMs
                                )}{" "}
                                savings
                              </span>
                            )}
                          {opp.details?.overallSavingsBytes &&
                            opp.details.overallSavingsBytes > 0 && (
                              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                {(
                                  opp.details.overallSavingsBytes / 1024
                                ).toFixed(0)}
                                KB savings
                              </span>
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Diagnostics */}
            {result.diagnostics.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Diagnostics ({result.diagnostics.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {result.diagnostics.map((diag) => (
                    <div
                      key={diag.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="font-medium text-sm text-gray-900">
                        {diag.title}
                      </div>
                      {diag.displayValue && (
                        <span className="text-xs text-gray-500">
                          {diag.displayValue}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passed Audits */}
            {result.passedAudits.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <button
                  onClick={() => setShowPassed(!showPassed)}
                  className="flex items-center gap-2 w-full"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Passed Audits ({result.passedAudits.length})
                  </h3>
                  {showPassed ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                  )}
                </button>
                {showPassed && (
                  <div className="mt-4 space-y-1">
                    {result.passedAudits.map((audit) => (
                      <div
                        key={audit.id}
                        className="flex items-center gap-2 py-1.5 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        {audit.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
