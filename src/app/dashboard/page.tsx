"use client";

import { useState, useCallback } from "react";
import {
  Strategy,
  PageTier,
  AnalysisResult,
  AnalysisProgressEvent,
  AnalysisResultEvent,
  AnalysisErrorEvent,
  AnalysisCompleteEvent,
} from "@/lib/types";
import { PLANVILLE_PAGES, DEFAULT_TIERS } from "@/lib/constants";
import { analyzeBatch } from "@/lib/pagespeed";

import StrategyToggle from "@/components/controls/StrategyToggle";
import TierSelector from "@/components/controls/TierSelector";
import AnalysisProgress from "@/components/dashboard/AnalysisProgress";
import OverviewCards from "@/components/dashboard/OverviewCards";
import ScoreDistribution from "@/components/dashboard/ScoreDistribution";
import WorstPages from "@/components/dashboard/WorstPages";
import PageTable from "@/components/dashboard/PageTable";
import GlobalRecommendations from "@/components/recommendations/GlobalRecommendations";
import {
  Zap,
  Play,
  RotateCw,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const CACHE_KEY = "planville-speed-results";
const CACHE_TTL = 60 * 60 * 1000;

interface CachedData {
  timestamp: number;
  strategy: Strategy;
  results: AnalysisResult[];
}

function getCachedResults(strategy: Strategy): AnalysisResult[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (cached.strategy !== strategy) return null;
    if (Date.now() - cached.timestamp > CACHE_TTL) return null;
    return cached.results;
  } catch {
    return null;
  }
}

function setCachedResults(strategy: Strategy, results: AnalysisResult[]) {
  if (typeof window === "undefined") return;
  try {
    const data: CachedData = { timestamp: Date.now(), strategy, results };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export default function Dashboard() {
  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [selectedTiers, setSelectedTiers] =
    useState<PageTier[]>(DEFAULT_TIERS);
  const [results, setResults] = useState<AnalysisResult[]>(() => {
    if (typeof window === "undefined") return [];
    return getCachedResults("mobile") || [];
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [completedPages, setCompletedPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = useCallback(async () => {
    const urls = PLANVILLE_PAGES.filter((p) =>
      selectedTiers.includes(p.tier)
    ).map((p) => p.url);

    if (urls.length === 0) return;

    setIsAnalyzing(true);
    setResults([]);
    setError(null);
    setTotalTime(null);
    setCompletedPages(0);
    setTotalPages(urls.length);
    setCurrentUrl(null);

    try {
      await analyzeBatch(
        urls,
        strategy,
        (event: AnalysisProgressEvent) => {
          setCurrentUrl(event.url);
          setCompletedPages(event.completedPages);
        },
        (event: AnalysisResultEvent) => {
          setResults((prev) => {
            const updated = [...prev, event.data];
            setCachedResults(strategy, updated);
            return updated;
          });
          setCompletedPages((prev) => prev + 1);
        },
        (event: AnalysisErrorEvent) => {
          setResults((prev) => [
            ...prev,
            {
              page: PLANVILLE_PAGES.find((p) => p.url === event.url) || {
                url: event.url,
                label: event.url,
                tier: "other" as PageTier,
                priority: 5,
              },
              error: event.message,
            },
          ]);
          setCompletedPages((prev) => prev + 1);
        },
        (event: AnalysisCompleteEvent) => {
          setTotalTime(event.totalTime);
          setIsAnalyzing(false);
          setCurrentUrl(null);
        }
      );
    } catch (err) {
      setError(String(err));
      setIsAnalyzing(false);
    }
  }, [selectedTiers, strategy]);

  const handleStrategyChange = (newStrategy: Strategy) => {
    setStrategy(newStrategy);
    if (!isAnalyzing) {
      const cached = getCachedResults(newStrategy);
      if (cached && cached.length > 0) {
        setResults(cached);
      } else {
        setResults([]);
      }
    }
  };

  const hasResults = results.length > 0;
  const errorCount = results.filter((r) => r.error).length;
  const successCount = results.filter((r) => !r.error).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Planville Speed Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                  Real-time PageSpeed analysis for planville.de
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StrategyToggle
                strategy={strategy}
                onChange={handleStrategyChange}
                disabled={isAnalyzing}
              />
              <button
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAnalyzing
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isAnalyzing ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : hasResults ? (
                  <RotateCw className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isAnalyzing
                  ? "Analyzing..."
                  : hasResults
                    ? "Re-analyze"
                    : "Analyze"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tier Selector */}
        <TierSelector
          selectedTiers={selectedTiers}
          onChange={setSelectedTiers}
          disabled={isAnalyzing}
        />

        {/* Progress Bar */}
        {isAnalyzing && (
          <AnalysisProgress
            currentUrl={currentUrl}
            completedPages={completedPages}
            totalPages={totalPages}
          />
        )}

        {/* Completion Status */}
        {!isAnalyzing && totalTime !== null && successCount > 0 && (
          <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">
              Analysis complete: {successCount} pages analyzed
              {errorCount > 0 && `, ${errorCount} failed`}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-600 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {(totalTime / 1000).toFixed(0)}s total
            </div>
          </div>
        )}

        {/* All Failed - Rate Limit */}
        {!isAnalyzing && totalTime !== null && successCount === 0 && errorCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-4 space-y-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-sm font-medium text-red-800">
                All {errorCount} pages failed — Google PageSpeed API rate limit (429)
              </span>
              <div className="flex items-center gap-1 text-xs text-red-500 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                {(totalTime / 1000).toFixed(0)}s
              </div>
            </div>
            <p className="text-xs text-red-700 ml-8">
              Without an API key, Google limits requests heavily. To fix this:<br />
              1. Go to{" "}
              <a
                href="https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Google Cloud Console
              </a>{" "}
              and enable the PageSpeed Insights API.<br />
              2. Create an API key and add it to{" "}
              <code className="bg-red-100 px-1 rounded text-xs">.env.local</code> as{" "}
              <code className="bg-red-100 px-1 rounded text-xs">PAGESPEED_API_KEY=your_key</code><br />
              3. Restart the dev server and try again. Or try selecting fewer pages (e.g. Homepage only).
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!hasResults && !isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Zap className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Analyze
            </h2>
            <p className="text-sm text-gray-500 max-w-md mb-6">
              Select the page categories you want to analyze, choose mobile or
              desktop strategy, then click Analyze to fetch real-time speed data
              from Google PageSpeed Insights.
            </p>
            <button
              onClick={startAnalysis}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Analysis
            </button>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <>
            <OverviewCards results={results} strategy={strategy} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScoreDistribution results={results} strategy={strategy} />
              <WorstPages results={results} strategy={strategy} />
            </div>

            <PageTable results={results} strategy={strategy} />

            <GlobalRecommendations results={results} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Planville Speed Dashboard &mdash; Powered by Google PageSpeed
              Insights API
            </span>
            {hasResults && results.some((r) => r[strategy]) && (
              <span>
                Last analyzed:{" "}
                {new Date(
                  results.find((r) => r[strategy])?.[strategy]?.fetchedAt || ""
                ).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
