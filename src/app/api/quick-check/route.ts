import { NextRequest, NextResponse } from "next/server";
import { Strategy } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { url = "https://planville.de", strategy = "mobile" } =
    await request.json();

  if (!url.startsWith("https://planville.de")) {
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
  apiUrl.searchParams.append("category", "performance");
  apiUrl.searchParams.append("category", "seo");
  apiUrl.searchParams.append("category", "accessibility");
  apiUrl.searchParams.append("category", "best-practices");
  if (apiKey) {
    apiUrl.searchParams.set("key", apiKey);
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: `PageSpeed API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const lhr = data.lighthouseResult;
    const audits = lhr.audits;
    const categories = lhr.categories;

    const result = {
      url,
      strategy: strategy as Strategy,
      fetchedAt: lhr.fetchTime || new Date().toISOString(),
      scores: {
        performance: Math.round((categories.performance?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
      },
      coreWebVitals: {
        lcp: audits["largest-contentful-paint"]?.numericValue || 0,
        fcp: audits["first-contentful-paint"]?.numericValue || 0,
        cls: audits["cumulative-layout-shift"]?.numericValue || 0,
        tbt: audits["total-blocking-time"]?.numericValue || 0,
        si: audits["speed-index"]?.numericValue || 0,
        ttfb: audits["server-response-time"]?.numericValue || 0,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch PageSpeed data: ${error}` },
      { status: 500 }
    );
  }
}
