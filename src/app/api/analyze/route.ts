import { NextRequest, NextResponse } from "next/server";
import { Strategy, PageSpeedResult, PageSpeedAudit } from "@/lib/types";

function transformPSIResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  url: string,
  strategy: Strategy
): PageSpeedResult {
  const lhr = data.lighthouseResult;
  const audits = lhr.audits;

  const allAudits: PageSpeedAudit[] = Object.values(audits).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any) => ({
      id: a.id,
      title: a.title,
      description: a.description || "",
      score: a.score,
      scoreDisplayMode: a.scoreDisplayMode,
      displayValue: a.displayValue,
      numericValue: a.numericValue,
      details: a.details
        ? {
            type: a.details.type,
            items: a.details.items,
            overallSavingsMs: a.details.overallSavingsMs,
            overallSavingsBytes: a.details.overallSavingsBytes,
          }
        : undefined,
    })
  );

  return {
    url,
    strategy,
    fetchedAt: new Date().toISOString(),
    metrics: {
      performanceScore: Math.round(
        (lhr.categories.performance.score || 0) * 100
      ),
      firstContentfulPaint:
        audits["first-contentful-paint"]?.numericValue || 0,
      largestContentfulPaint:
        audits["largest-contentful-paint"]?.numericValue || 0,
      totalBlockingTime: audits["total-blocking-time"]?.numericValue || 0,
      cumulativeLayoutShift:
        audits["cumulative-layout-shift"]?.numericValue || 0,
      speedIndex: audits["speed-index"]?.numericValue || 0,
    },
    audits: allAudits,
    opportunities: allAudits.filter(
      (a) =>
        (a.details?.overallSavingsMs && a.details.overallSavingsMs > 0) ||
        (a.details?.overallSavingsBytes && a.details.overallSavingsBytes > 0)
    ),
    diagnostics: allAudits.filter(
      (a) =>
        a.details?.type === "table" && a.score !== null && a.score < 1
    ),
    passedAudits: allAudits.filter(
      (a) => a.score === 1 && a.scoreDisplayMode === "binary"
    ),
  };
}

export async function POST(request: NextRequest) {
  const { url, strategy = "mobile" } = await request.json();

  if (!url || !url.startsWith("https://planville.de")) {
    return NextResponse.json(
      { error: "Invalid URL: must be a planville.de URL" },
      { status: 400 }
    );
  }

  const apiKey = process.env.PAGESPEED_API_KEY || "";
  const apiUrl = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("strategy", strategy);
  apiUrl.searchParams.set("category", "performance");
  if (apiKey) {
    apiUrl.searchParams.set("key", apiKey);
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: `PageSpeed API error: ${response.status}`,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = transformPSIResponse(data, url, strategy as Strategy);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch PageSpeed data: ${error}` },
      { status: 500 }
    );
  }
}
