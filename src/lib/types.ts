export type Strategy = "mobile" | "desktop";

export type ScoreCategory = "good" | "needs-improvement" | "poor";

export interface PageSpeedMetrics {
  performanceScore: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
}

export interface PageSpeedAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue?: string;
  numericValue?: number;
  details?: {
    type: string;
    items?: Array<Record<string, unknown>>;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
  };
}

export interface PageSpeedResult {
  url: string;
  strategy: Strategy;
  fetchedAt: string;
  metrics: PageSpeedMetrics;
  audits: PageSpeedAudit[];
  opportunities: PageSpeedAudit[];
  diagnostics: PageSpeedAudit[];
  passedAudits: PageSpeedAudit[];
}

export type PageTier =
  | "homepage"
  | "blog"
  | "category"
  | "landing"
  | "tag"
  | "other";

export interface PageConfig {
  url: string;
  label: string;
  tier: PageTier;
  priority: number;
}

export interface AnalysisResult {
  page: PageConfig;
  mobile?: PageSpeedResult;
  desktop?: PageSpeedResult;
  error?: string;
}

export interface AnalysisState {
  results: AnalysisResult[];
  isAnalyzing: boolean;
  currentPage: string | null;
  progress: number;
  totalPages: number;
  completedPages: number;
  strategy: Strategy;
  selectedTiers: PageTier[];
  error: string | null;
}

export type RecommendationCategory =
  | "images"
  | "javascript"
  | "css"
  | "caching"
  | "server"
  | "fonts"
  | "layout"
  | "third-party"
  | "other";

export type ImpactLevel = "high" | "medium" | "low";

export interface AggregatedRecommendation {
  auditId: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  impact: ImpactLevel;
  affectedPages: string[];
  averageSavingsMs?: number;
  averageSavingsBytes?: number;
  actionItems: string[];
}

export interface AnalysisProgressEvent {
  type: "progress";
  url: string;
  completedPages: number;
  totalPages: number;
}

export interface AnalysisResultEvent {
  type: "result";
  data: AnalysisResult;
}

export interface AnalysisCompleteEvent {
  type: "complete";
  totalTime: number;
}

export interface AnalysisErrorEvent {
  type: "error";
  url: string;
  message: string;
}

export type AnalysisEvent =
  | AnalysisProgressEvent
  | AnalysisResultEvent
  | AnalysisCompleteEvent
  | AnalysisErrorEvent;

export interface QuickCheckScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

export interface QuickCheckCWV {
  lcp: number;
  fcp: number;
  cls: number;
  tbt: number;
  si: number;
  ttfb: number;
}

export interface QuickCheckResult {
  url: string;
  strategy: Strategy;
  fetchedAt: string;
  scores: QuickCheckScores;
  coreWebVitals: QuickCheckCWV;
}
