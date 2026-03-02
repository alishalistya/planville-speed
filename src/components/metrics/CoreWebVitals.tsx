"use client";

import { PageSpeedMetrics } from "@/lib/types";
import MetricCard from "./MetricCard";

interface CoreWebVitalsProps {
  metrics: PageSpeedMetrics;
}

export default function CoreWebVitals({ metrics }: CoreWebVitalsProps) {
  const vitals = [
    {
      key: "firstContentfulPaint",
      label: "First Contentful Paint",
      short: "FCP",
      value: metrics.firstContentfulPaint,
    },
    {
      key: "largestContentfulPaint",
      label: "Largest Contentful Paint",
      short: "LCP",
      value: metrics.largestContentfulPaint,
    },
    {
      key: "totalBlockingTime",
      label: "Total Blocking Time",
      short: "TBT",
      value: metrics.totalBlockingTime,
    },
    {
      key: "cumulativeLayoutShift",
      label: "Cumulative Layout Shift",
      short: "CLS",
      value: metrics.cumulativeLayoutShift,
    },
    {
      key: "speedIndex",
      label: "Speed Index",
      short: "SI",
      value: metrics.speedIndex,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {vitals.map((v) => (
        <MetricCard
          key={v.key}
          metricKey={v.key}
          value={v.value}
          label={v.label}
          shortLabel={v.short}
        />
      ))}
    </div>
  );
}
