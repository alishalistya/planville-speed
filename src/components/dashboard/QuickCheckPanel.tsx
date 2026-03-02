"use client";

import { useState } from "react";
import { Strategy, QuickCheckResult } from "@/lib/types";
import { getScoreRingColor } from "@/lib/scoring";
import {
  RefreshCw,
  X,
  Gauge,
  Search,
  Shield,
  Sparkles,
  Clock,
  MousePointerClick,
  Move,
  Zap,
  Timer,
  Server,
} from "lucide-react";

interface QuickCheckPanelProps {
  strategy: Strategy;
}

function MiniGauge({ score, size = 80 }: { score: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreRingColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
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
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold" style={{ color }}>
          {score}
        </span>
      </div>
    </div>
  );
}

function formatCWV(key: string, value: number): string {
  if (key === "cls") return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
  return `${Math.round(value)}ms`;
}

function getCWVStatus(
  key: string,
  value: number
): { label: string; color: string; bg: string } {
  const thresholds: Record<string, [number, number]> = {
    lcp: [2500, 4000],
    fcp: [1800, 3000],
    cls: [0.1, 0.25],
    tbt: [200, 600],
    si: [3400, 5800],
    ttfb: [800, 1800],
  };
  const [good, poor] = thresholds[key] || [0, 0];
  if (value <= good) return { label: "Good", color: "text-green-600", bg: "bg-green-50" };
  if (value <= poor)
    return { label: "Needs Work", color: "text-orange-500", bg: "bg-orange-50" };
  return { label: "Poor", color: "text-red-600", bg: "bg-red-50" };
}

const CWV_META: Record<
  string,
  { label: string; full: string; icon: typeof Clock }
> = {
  lcp: { label: "LCP", full: "Largest Contentful Paint", icon: Clock },
  fcp: { label: "FCP", full: "First Contentful Paint", icon: Timer },
  tbt: { label: "TBT", full: "Total Blocking Time", icon: MousePointerClick },
  cls: { label: "CLS", full: "Cumulative Layout Shift", icon: Move },
  si: { label: "SI", full: "Speed Index", icon: Zap },
  ttfb: { label: "TTFB", full: "Time to First Byte", icon: Server },
};

export default function QuickCheckPanel({ strategy }: QuickCheckPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QuickCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCheck = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quick-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "https://planville.de",
          strategy,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      const data: QuickCheckResult = await res.json();
      setResult(data);
      setIsOpen(true);
    } catch (err) {
      setError(String(err));
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const scoreCards = result
    ? [
        { key: "performance", label: "Performance", icon: Gauge, score: result.scores.performance },
        { key: "seo", label: "SEO", icon: Search, score: result.scores.seo },
        { key: "accessibility", label: "Accessibility", icon: Shield, score: result.scores.accessibility },
        { key: "bestPractices", label: "Best Practices", icon: Sparkles, score: result.scores.bestPractices },
      ]
    : [];

  return (
    <>
      <button
        onClick={runCheck}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isLoading
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        {isLoading ? "Checking..." : "Quick Check"}
      </button>

      {/* Slide-over Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Quick Check</h2>
                <p className="text-xs text-gray-500">
                  planville.de &bull; {strategy} &bull;{" "}
                  {result
                    ? new Date(result.fetchedAt).toLocaleString()
                    : "—"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runCheck}
                  disabled={isLoading}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-40"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {isLoading && !result && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                  <p className="text-sm text-gray-500">
                    Running Lighthouse audit...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    This takes 15-30 seconds
                  </p>
                </div>
              )}

              {result && (
                <>
                  {/* Score Gauges */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Lighthouse Scores
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {scoreCards.map((card) => (
                        <div
                          key={card.key}
                          className="flex flex-col items-center gap-2"
                        >
                          <MiniGauge score={card.score} />
                          <div className="flex items-center gap-1">
                            <card.icon className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 font-medium">
                              {card.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Web Vitals */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Core Web Vitals & Speed
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(result.coreWebVitals).map(
                        ([key, value]) => {
                          const meta = CWV_META[key];
                          if (!meta) return null;
                          const status = getCWVStatus(key, value);
                          const Icon = meta.icon;
                          return (
                            <div
                              key={key}
                              className={`rounded-xl border p-4 ${status.bg} border-gray-200 transition-all`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className={`w-3.5 h-3.5 ${status.color}`} />
                                <span className="text-xs text-gray-500 font-medium">
                                  {meta.label}
                                </span>
                              </div>
                              <div className={`text-2xl font-bold ${status.color}`}>
                                {formatCWV(key, value)}
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] text-gray-400">
                                  {meta.full}
                                </span>
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${status.color} ${status.bg}`}
                                >
                                  {status.label}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
