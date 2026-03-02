"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { AnalysisResult, Strategy } from "@/lib/types";
import { getBarColor } from "@/lib/scoring";

interface ScoreDistributionProps {
  results: AnalysisResult[];
  strategy: Strategy;
}

export default function ScoreDistribution({
  results,
  strategy,
}: ScoreDistributionProps) {
  const data = results
    .filter((r) => {
      const d = strategy === "mobile" ? r.mobile : r.desktop;
      return d && !r.error;
    })
    .map((r) => {
      const d = strategy === "mobile" ? r.mobile! : r.desktop!;
      return {
        name: r.page.label,
        score: d.metrics.performanceScore,
        url: r.page.url,
      };
    })
    .sort((a, b) => a.score - b.score);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Score Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 60, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                    <div className="font-semibold text-sm">{d.name}</div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: getBarColor(d.score) }}
                    >
                      {d.score}/100
                    </div>
                  </div>
                );
              }}
            />
            <ReferenceLine
              y={90}
              stroke="#22c55e"
              strokeDasharray="3 3"
              label={{ value: "Good", position: "right", fontSize: 10 }}
            />
            <ReferenceLine
              y={50}
              stroke="#f97316"
              strokeDasharray="3 3"
              label={{ value: "Poor", position: "right", fontSize: 10 }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
