import { PageConfig, PageTier } from "./types";

export const PLANVILLE_PAGES: PageConfig[] = [
  // Tier 1: Homepage
  {
    url: "https://planville.de/",
    label: "Homepage",
    tier: "homepage",
    priority: 1,
  },

  // Tier 1: Blog Posts
  {
    url: "https://planville.de/funktionsweise-und-aufbau-von-waermepumpen/",
    label: "Wärmepumpen Aufbau",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/auszeichnung-dtgv-solar-award-2025-26/",
    label: "DTGV Solar Award",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/wallbox-11kw-vs-22kw-vergleich/",
    label: "Wallbox Vergleich",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/pv-statt-solarthermie-der-bessere-weg-2026/",
    label: "PV statt Solarthermie",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/wartung-der-waermepumpe-teuer-oder-guenstig/",
    label: "Wärmepumpe Wartung",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/heizungsgesetz-2025-foerderung/",
    label: "Heizungsgesetz 2025",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/pv-waermepumpe-fuer-maximale-autarkie/",
    label: "PV + Wärmepumpe",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/waermepumpe-im-altbau-der-grosse-winter-check-2026/",
    label: "Wärmepumpe Altbau",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/waermepumpe-ohne-fussbodenheizung/",
    label: "Ohne Fußbodenheizung",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/herzinfarkt-der-solaranlage-wie-lange-haelt-ein-wechselrichter-wirklich/",
    label: "Wechselrichter Lebensdauer",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/infrarotheizung-vs-waermepumpe-kostenvergleich/",
    label: "Infrarot vs Wärmepumpe",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/lohnt-sich-ein-solarspeicher-2026-eigener-akku-vs-strom-cloud/",
    label: "Solarspeicher 2026",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/photovoltaik-und-steuern-2026-der-grosse-guide-fuer-hausbesitzer/",
    label: "PV Steuern Guide",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/wann-amortisiert-sich-eine-pv-anlage-2026-rechner-3-beispiele/",
    label: "PV Amortisation",
    tier: "blog",
    priority: 1,
  },
  {
    url: "https://planville.de/funktionsweise-und-aufbau-von-photovoltaikanlagen/",
    label: "PV Aufbau",
    tier: "blog",
    priority: 1,
  },

  // Tier 2: Category Pages
  {
    url: "https://planville.de/category/das-team/",
    label: "Kategorie: Team",
    tier: "category",
    priority: 2,
  },
  {
    url: "https://planville.de/category/photovoltaik/",
    label: "Kategorie: Photovoltaik",
    tier: "category",
    priority: 2,
  },
  {
    url: "https://planville.de/category/uncategorized/",
    label: "Kategorie: Uncategorized",
    tier: "category",
    priority: 2,
  },
  {
    url: "https://planville.de/category/wallbox/",
    label: "Kategorie: Wallbox",
    tier: "category",
    priority: 2,
  },
  {
    url: "https://planville.de/category/waermepumpe/",
    label: "Kategorie: Wärmepumpe",
    tier: "category",
    priority: 2,
  },

  // Tier 3: Key Landing Pages
  {
    url: "https://planville.de/hausbesitzer/",
    label: "Hausbesitzer",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/hausbesitzer/photovoltaikanlage/",
    label: "PV Anlage (Landing)",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/hausbesitzer/waermepumpen/",
    label: "Wärmepumpen (Landing)",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/hausbesitzer/dachsanierung/",
    label: "Dachsanierung",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/hausbesitzer/fenster/",
    label: "Fenster",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/vermieter/",
    label: "Vermieter",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/vermieter/mieterstrom/",
    label: "Mieterstrom",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/karriere/",
    label: "Karriere",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/ueber-uns/",
    label: "Über Uns",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/photovoltaik-blog/",
    label: "Blog Index",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/pv-kalkulator/",
    label: "PV Kalkulator",
    tier: "landing",
    priority: 3,
  },
  {
    url: "https://planville.de/check/",
    label: "Check",
    tier: "landing",
    priority: 3,
  },

  // Tier 4: Tag Pages
  {
    url: "https://planville.de/tag/bidirektionales-laden/",
    label: "Tag: Bidirektionales Laden",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/foerderung-waermepumpe-2025/",
    label: "Tag: Förderung WP",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/gebaeudeenergiegesetz-geg-2025/",
    label: "Tag: GEG 2025",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/heizen-mit-strom-kosten-2026/",
    label: "Tag: Heizen mit Strom",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/hybrid-wechselrichter-solarspeicher/",
    label: "Tag: Hybrid WR",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/infrarotheizung-als-hauptheizung/",
    label: "Tag: IR Hauptheizung",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/infrarotheizung-stromverbrauch-erfahrung/",
    label: "Tag: IR Stromverbrauch",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/jahresarbeitszahl-vergleich/",
    label: "Tag: JAZ Vergleich",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/kfw-foerderung-heizung/",
    label: "Tag: KfW Förderung",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/kommunale-waermeplanung/",
    label: "Tag: Kommunale WP",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/pv-ueberschussladen/",
    label: "Tag: PV Überschuss",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/r290-waermepumpe/",
    label: "Tag: R290 WP",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/wallbox-11kw-vs-22kw/",
    label: "Tag: Wallbox 11/22kW",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/wallbox-genehmigungspflicht/",
    label: "Tag: Wallbox Genehmigung",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/waermepumpe/",
    label: "Tag: Wärmepumpe",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/waermepumpe-bivalenzpunkt/",
    label: "Tag: Bivalenzpunkt",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/waermepumpe-im-altbau/",
    label: "Tag: WP im Altbau",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/waermepumpe-kosten-2026/",
    label: "Tag: WP Kosten 2026",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/waermepumpe-stromverbrauch-winter/",
    label: "Tag: WP Winter",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/was-ist-wechselrichter/",
    label: "Tag: Was ist WR",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/wechselrichter-solaranlage/",
    label: "Tag: WR Solaranlage",
    tier: "tag",
    priority: 4,
  },
  {
    url: "https://planville.de/tag/wie-lange-halten-wechselrichter/",
    label: "Tag: WR Lebensdauer",
    tier: "tag",
    priority: 4,
  },
];

export const METRIC_THRESHOLDS = {
  performanceScore: { good: 90, needsImprovement: 50 },
  firstContentfulPaint: { good: 1800, needsImprovement: 3000 },
  largestContentfulPaint: { good: 2500, needsImprovement: 4000 },
  totalBlockingTime: { good: 200, needsImprovement: 600 },
  cumulativeLayoutShift: { good: 0.1, needsImprovement: 0.25 },
  speedIndex: { good: 3400, needsImprovement: 5800 },
} as const;

export const TIER_LABELS: Record<PageTier, string> = {
  homepage: "Homepage",
  blog: "Blog Posts",
  category: "Category Pages",
  landing: "Landing Pages",
  tag: "Tag Pages",
  other: "Other Pages",
};

export const DEFAULT_TIERS: PageTier[] = [
  "homepage",
  "blog",
  "category",
  "landing",
];
