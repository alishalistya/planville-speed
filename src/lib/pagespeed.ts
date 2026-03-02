import {
  Strategy,
  AnalysisProgressEvent,
  AnalysisResultEvent,
  AnalysisCompleteEvent,
  AnalysisErrorEvent,
} from "./types";

export async function analyzeBatch(
  urls: string[],
  strategy: Strategy,
  onProgress: (event: AnalysisProgressEvent) => void,
  onResult: (event: AnalysisResultEvent) => void,
  onError: (event: AnalysisErrorEvent) => void,
  onComplete: (event: AnalysisCompleteEvent) => void
): Promise<void> {
  const response = await fetch("/api/analyze-batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls, strategy }),
  });

  if (!response.ok) {
    throw new Error(`Batch analysis failed: ${response.status}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const event = JSON.parse(line.slice(6));
          switch (event.type) {
            case "progress":
              onProgress(event);
              break;
            case "result":
              onResult(event);
              break;
            case "error":
              onError(event);
              break;
            case "complete":
              onComplete(event);
              break;
          }
        } catch {
          // skip malformed events
        }
      }
    }
  }
}

export async function analyzeSingle(url: string, strategy: Strategy) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, strategy }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.status}`);
  }

  return response.json();
}
