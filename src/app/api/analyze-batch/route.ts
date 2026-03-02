import { NextRequest } from "next/server";
import {
  Strategy,
  PageSpeedResult,
  PageSpeedAudit,
  PageConfig,
} from "@/lib/types";
import { PLANVILLE_PAGES } from "@/lib/constants";

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

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

async function fetchPageSpeed(
  url: string,
  strategy: Strategy
): Promise<PageSpeedResult> {
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

  // Single retry with a longer wait for 429
  const response = await fetch(apiUrl.toString());

  if (response.ok) {
    const data = await response.json();
    return transformPSIResponse(data, url, strategy);
  }

  if (response.status === 429) {
    // Wait and retry once
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const retryResponse = await fetch(apiUrl.toString());
    if (retryResponse.ok) {
      const data = await retryResponse.json();
      return transformPSIResponse(data, url, strategy);
    }
    throw new RateLimitError(
      "Rate limited by Google PageSpeed API (429). Add a PAGESPEED_API_KEY in .env.local to increase limits."
    );
  }

  throw new Error(`PageSpeed API error: ${response.status}`);
}

function findPageConfig(url: string): PageConfig {
  return (
    PLANVILLE_PAGES.find((p) => p.url === url) || {
      url,
      label: url.replace("https://planville.de/", "").replace(/\/$/, "") || "Homepage",
      tier: "other" as const,
      priority: 5,
    }
  );
}

export async function POST(request: NextRequest) {
  const { urls, strategy = "mobile" } = await request.json();

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return new Response(JSON.stringify({ error: "No URLs provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const startTime = Date.now();
      let consecutive429s = 0;

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const pageConfig = findPageConfig(url);

        // Send progress event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "progress",
              url,
              completedPages: i,
              totalPages: urls.length,
            })}\n\n`
          )
        );

        try {
          const result = await fetchPageSpeed(url, strategy as Strategy);
          consecutive429s = 0; // Reset on success
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "result",
                data: {
                  page: pageConfig,
                  [strategy]: result,
                },
              })}\n\n`
            )
          );
        } catch (error) {
          if (error instanceof RateLimitError) {
            consecutive429s++;
          }

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                url,
                message: String(error),
                data: {
                  page: pageConfig,
                  error: String(error),
                },
              })}\n\n`
            )
          );

          // Abort early if API is clearly rate-limiting us
          if (consecutive429s >= 3) {
            // Mark remaining pages as failed
            for (let j = i + 1; j < urls.length; j++) {
              const remainingConfig = findPageConfig(urls[j]);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "error",
                    url: urls[j],
                    message: "Skipped — API rate limit reached. Add a PAGESPEED_API_KEY to .env.local.",
                    data: {
                      page: remainingConfig,
                      error: "Skipped — API rate limit reached.",
                    },
                  })}\n\n`
                )
              );
            }
            break;
          }
        }

        // Rate limit delay
        if (i < urls.length - 1) {
          const delay = process.env.PAGESPEED_API_KEY ? 1500 : 5000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "complete",
            totalTime: Date.now() - startTime,
          })}\n\n`
        )
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
