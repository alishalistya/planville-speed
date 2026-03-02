import { ScoreCategory } from "./types";
import { METRIC_THRESHOLDS } from "./constants";

export function getScoreCategory(score: number): ScoreCategory {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

export function getMetricCategory(
  key: keyof typeof METRIC_THRESHOLDS,
  value: number
): ScoreCategory {
  const thresholds = METRIC_THRESHOLDS[key];
  if (key === "performanceScore") {
    if (value >= thresholds.good) return "good";
    if (value >= thresholds.needsImprovement) return "needs-improvement";
    return "poor";
  }
  // For timing metrics, lower is better
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-600";
}

export function getScoreBgColor(score: number): string {
  if (score >= 90) return "bg-green-50 border-green-200";
  if (score >= 50) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

export function getScoreRingColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}

export function formatMetricValue(key: string, value: number): string {
  if (key === "cumulativeLayoutShift") return value.toFixed(3);
  if (key === "performanceScore") return `${Math.round(value)}`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
  return `${Math.round(value)}ms`;
}

export function getMetricLabel(key: string): string {
  const labels: Record<string, string> = {
    performanceScore: "Performance Score",
    firstContentfulPaint: "First Contentful Paint (FCP)",
    largestContentfulPaint: "Largest Contentful Paint (LCP)",
    totalBlockingTime: "Total Blocking Time (TBT)",
    cumulativeLayoutShift: "Cumulative Layout Shift (CLS)",
    speedIndex: "Speed Index (SI)",
  };
  return labels[key] || key;
}

export function getMetricShortLabel(key: string): string {
  const labels: Record<string, string> = {
    performanceScore: "Score",
    firstContentfulPaint: "FCP",
    largestContentfulPaint: "LCP",
    totalBlockingTime: "TBT",
    cumulativeLayoutShift: "CLS",
    speedIndex: "SI",
  };
  return labels[key] || key;
}

export function getBarColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}
