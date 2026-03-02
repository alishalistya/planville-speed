import {
  AnalysisResult,
  AggregatedRecommendation,
  RecommendationCategory,
  ImpactLevel,
} from "./types";

const AUDIT_CATEGORY_MAP: Record<string, RecommendationCategory> = {
  "render-blocking-resources": "css",
  "unused-css-rules": "css",
  "unminified-css": "css",
  "unused-javascript": "javascript",
  "legacy-javascript": "javascript",
  "total-byte-weight": "javascript",
  "unminified-javascript": "javascript",
  "duplicated-javascript": "javascript",
  "dom-size": "layout",
  "uses-responsive-images": "images",
  "offscreen-images": "images",
  "uses-optimized-images": "images",
  "modern-image-formats": "images",
  "efficient-animated-content": "images",
  "unsized-images": "images",
  "uses-text-compression": "server",
  "uses-rel-preconnect": "server",
  "server-response-time": "server",
  redirects: "server",
  "uses-http2": "server",
  "uses-long-cache-ttl": "caching",
  "font-display": "fonts",
  "third-party-summary": "third-party",
  "third-party-facades": "third-party",
  "layout-shifts": "layout",
  "largest-contentful-paint-element": "layout",
  "lcp-lazy-loaded": "layout",
};

const WP_SPECIFIC_ACTIONS: Record<string, string[]> = {
  "render-blocking-resources": [
    'In WP Rocket: Enable "Optimize CSS Delivery" under File Optimization',
    'In WP Rocket: Enable "Load JavaScript Deferred" under File Optimization',
    'In Divi: Enable "Defer jQuery And jQuery Migrate" under Performance settings',
  ],
  "unused-css-rules": [
    'In WP Rocket: Enable "Remove Unused CSS" under File Optimization',
    "Audit Divi modules: Remove unused modules from pages to reduce generated CSS",
    'Consider using Divi\'s "Dynamic CSS" feature to load only needed module styles',
  ],
  "unused-javascript": [
    'In WP Rocket: Enable "Delay JavaScript execution" for non-critical scripts',
    "Audit third-party plugins and deactivate unused ones",
    'Use WP Rocket\'s "Exclude" settings for scripts that must load immediately',
  ],
  "unminified-javascript": [
    'In WP Rocket: Enable "Minify JavaScript files" under File Optimization',
    "Ensure all custom scripts are minified before deployment",
  ],
  "unminified-css": [
    'In WP Rocket: Enable "Minify CSS files" under File Optimization',
  ],
  "uses-optimized-images": [
    "Install Imagify (by WP Rocket team) for automatic image optimization",
    "Enable WebP conversion in Imagify settings",
    "Set Divi gallery/image modules to use appropriate image sizes",
  ],
  "modern-image-formats": [
    "Enable WebP conversion in Imagify or ShortPixel plugin",
    'In WP Rocket: Enable "Serve WebP images" if using a compatible image plugin',
    "Consider AVIF format for even better compression",
  ],
  "offscreen-images": [
    'In WP Rocket: Ensure "LazyLoad for images" is enabled under Media tab',
    "In Divi: Enable built-in lazy loading in Theme Options > General",
    'Exclude above-the-fold hero images from lazy loading using data-no-lazy attribute',
  ],
  "uses-responsive-images": [
    "Ensure WordPress generates all srcset sizes (check Media Settings)",
    "Use Divi image modules with responsive sizes enabled",
    "Avoid hardcoding fixed image dimensions in custom CSS",
  ],
  "uses-long-cache-ttl": [
    "WP Rocket manages browser caching automatically — verify .htaccess rules are applied",
    "Check WP Rocket cache lifespan setting (recommended: 10 hours minimum)",
    "Ensure CDN cache headers are properly configured if using a CDN",
  ],
  "server-response-time": [
    "Verify WP Rocket page caching is active and serving cached responses",
    "Check hosting performance — consider upgrading if TTFB exceeds 600ms consistently",
    "Enable WP Rocket Database Optimization to clean post revisions and transients",
  ],
  "font-display": [
    "In Divi: Use system fonts where possible to eliminate font loading entirely",
    "Add font-display: swap to custom font @font-face declarations",
    'In WP Rocket: Enable "Preload Fonts" for critical web fonts',
  ],
  "largest-contentful-paint-element": [
    'Preload the LCP image: Add <link rel="preload" as="image"> for hero images',
    'In WP Rocket: Use "Preload" tab to add critical above-the-fold images',
    "Optimize LCP image: Compress, serve in WebP, ensure correct dimensions",
  ],
  "lcp-lazy-loaded": [
    "Remove lazy loading from above-the-fold LCP images",
    "Add fetchpriority='high' to the main hero/LCP image",
    "In WP Rocket: Add the LCP image URL to the Preload tab",
  ],
  "dom-size": [
    "Minimize Divi section/row/column nesting — flatten layout structure",
    "Reduce the number of Divi modules per page",
    "Consider replacing complex Divi layouts with lighter custom HTML modules",
  ],
  "uses-text-compression": [
    "In WP Rocket: GZIP compression should be enabled automatically",
    "Verify .htaccess has mod_deflate or mod_gzip rules",
    "Check with hosting provider that Brotli or GZIP is active server-side",
  ],
  "uses-rel-preconnect": [
    'Add preconnect hints for critical third-party origins (Google Fonts, analytics, CDN)',
    'In WP Rocket: Use "Preload" > "DNS Prefetch" to add third-party domains',
  ],
  redirects: [
    "Audit redirect chains — update internal links to point to final URLs directly",
    "Check for www/non-www redirects and ensure WordPress URL settings are correct",
    "In WP Rocket: Check that the redirect rule optimization is enabled",
  ],
  "third-party-summary": [
    "Audit all third-party scripts (analytics, chat widgets, tracking pixels)",
    'In WP Rocket: Use "Delay JavaScript execution" for third-party scripts',
    "Consider loading non-critical third-party scripts after user interaction",
  ],
  "legacy-javascript": [
    'In WP Rocket: Enable "Optimize JavaScript Loading" to serve modern bundles',
    "Update plugins that ship legacy polyfills (core-js, regenerator-runtime)",
  ],
  "duplicated-javascript": [
    "Audit plugins for duplicate library loading (e.g., multiple jQuery versions)",
    "Use Plugin Organizer or Asset CleanUp to prevent duplicate script loading",
  ],
  "efficient-animated-content": [
    "Replace GIF images with WebM or MP4 video using HTML5 <video> tag",
    "Use CSS animations instead of JavaScript-based animations where possible",
  ],
  "unsized-images": [
    "Add explicit width and height attributes to all <img> tags",
    "In Divi: Ensure image modules have dimensions set to prevent layout shifts",
  ],
  "layout-shifts": [
    "Add explicit dimensions (width/height) to images, videos, and embeds",
    "Use CSS aspect-ratio for responsive containers",
    "Avoid dynamically injecting content above existing content",
  ],
};

const GENERIC_ACTIONS: Record<string, string[]> = {
  images: [
    "Compress images using tools like Squoosh or TinyPNG",
    "Serve images in modern formats (WebP, AVIF)",
    "Implement responsive images with srcset",
    "Lazy load below-the-fold images",
  ],
  javascript: [
    "Remove unused JavaScript code and dead code",
    "Defer non-critical JavaScript loading",
    "Minify JavaScript bundles",
    "Code-split large bundles",
  ],
  css: [
    "Remove unused CSS rules",
    "Minify CSS files",
    "Inline critical CSS for above-the-fold content",
    "Defer non-critical stylesheets",
  ],
  caching: [
    "Set appropriate Cache-Control headers",
    "Use content hashing for static assets",
    "Configure CDN caching rules",
  ],
  server: [
    "Enable GZIP/Brotli compression",
    "Optimize server response time (TTFB)",
    "Use HTTP/2 or HTTP/3",
    "Minimize redirects",
  ],
  fonts: [
    "Use font-display: swap for web fonts",
    "Preload critical fonts",
    "Consider using system fonts for better performance",
    "Subset fonts to include only needed characters",
  ],
  layout: [
    "Avoid layout shifts by setting explicit dimensions",
    "Minimize DOM depth and element count",
    "Optimize critical rendering path",
  ],
  "third-party": [
    "Audit and minimize third-party scripts",
    "Load non-critical third-party scripts asynchronously",
    "Use facade patterns for heavy third-party embeds",
  ],
  other: [
    "Review and optimize based on specific audit details",
  ],
};

function getImpactLevel(
  savingsMs?: number,
  savingsBytes?: number,
  affectedCount?: number
): ImpactLevel {
  const totalCount = affectedCount || 1;
  const ms = savingsMs || 0;
  const bytes = savingsBytes || 0;

  if (ms > 500 || bytes > 100000 || totalCount > 10) return "high";
  if (ms > 100 || bytes > 50000 || totalCount > 5) return "medium";
  return "low";
}

export function aggregateRecommendations(
  results: AnalysisResult[]
): AggregatedRecommendation[] {
  const auditMap = new Map<
    string,
    {
      audit: {
        id: string;
        title: string;
        description: string;
      };
      affectedPages: string[];
      totalSavingsMs: number;
      totalSavingsBytes: number;
      count: number;
    }
  >();

  for (const result of results) {
    const psiResult = result.mobile || result.desktop;
    if (!psiResult) continue;

    for (const opp of psiResult.opportunities) {
      const existing = auditMap.get(opp.id);
      if (existing) {
        existing.affectedPages.push(result.page.url);
        existing.totalSavingsMs += opp.details?.overallSavingsMs || 0;
        existing.totalSavingsBytes += opp.details?.overallSavingsBytes || 0;
        existing.count++;
      } else {
        auditMap.set(opp.id, {
          audit: {
            id: opp.id,
            title: opp.title,
            description: opp.description,
          },
          affectedPages: [result.page.url],
          totalSavingsMs: opp.details?.overallSavingsMs || 0,
          totalSavingsBytes: opp.details?.overallSavingsBytes || 0,
          count: 1,
        });
      }
    }
  }

  const recommendations: AggregatedRecommendation[] = [];

  for (const [, entry] of auditMap) {
    const category: RecommendationCategory =
      AUDIT_CATEGORY_MAP[entry.audit.id] || "other";
    const avgMs = entry.totalSavingsMs / entry.count;
    const avgBytes = entry.totalSavingsBytes / entry.count;
    const impact = getImpactLevel(avgMs, avgBytes, entry.affectedPages.length);

    const actionItems =
      WP_SPECIFIC_ACTIONS[entry.audit.id] ||
      GENERIC_ACTIONS[category] ||
      GENERIC_ACTIONS.other;

    recommendations.push({
      auditId: entry.audit.id,
      title: entry.audit.title,
      description: entry.audit.description,
      category,
      impact,
      affectedPages: entry.affectedPages,
      averageSavingsMs: avgMs > 0 ? Math.round(avgMs) : undefined,
      averageSavingsBytes: avgBytes > 0 ? Math.round(avgBytes) : undefined,
      actionItems,
    });
  }

  // Sort by impact (high first), then by affected pages count
  const impactOrder: Record<ImpactLevel, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };
  recommendations.sort((a, b) => {
    const impactDiff = impactOrder[a.impact] - impactOrder[b.impact];
    if (impactDiff !== 0) return impactDiff;
    return b.affectedPages.length - a.affectedPages.length;
  });

  return recommendations;
}

export const CATEGORY_LABELS: Record<RecommendationCategory, string> = {
  images: "Images",
  javascript: "JavaScript",
  css: "CSS",
  caching: "Caching",
  server: "Server",
  fonts: "Fonts",
  layout: "Layout & DOM",
  "third-party": "Third-Party Scripts",
  other: "Other",
};

export const CATEGORY_ICONS: Record<RecommendationCategory, string> = {
  images: "Image",
  javascript: "FileCode",
  css: "Palette",
  caching: "Database",
  server: "Server",
  fonts: "Type",
  layout: "Layout",
  "third-party": "Globe",
  other: "Settings",
};
