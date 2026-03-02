"use client";

import { PageTier } from "@/lib/types";
import { TIER_LABELS, PLANVILLE_PAGES } from "@/lib/constants";

interface TierSelectorProps {
  selectedTiers: PageTier[];
  onChange: (tiers: PageTier[]) => void;
  disabled?: boolean;
}

const ALL_TIERS: PageTier[] = [
  "homepage",
  "blog",
  "category",
  "landing",
  "tag",
];

export default function TierSelector({
  selectedTiers,
  onChange,
  disabled,
}: TierSelectorProps) {
  const tierCounts: Record<PageTier, number> = {
    homepage: 0,
    blog: 0,
    category: 0,
    landing: 0,
    tag: 0,
    other: 0,
  };
  for (const p of PLANVILLE_PAGES) {
    tierCounts[p.tier]++;
  }

  const toggle = (tier: PageTier) => {
    if (disabled) return;
    if (selectedTiers.includes(tier)) {
      if (selectedTiers.length === 1) return; // keep at least one
      onChange(selectedTiers.filter((t) => t !== tier));
    } else {
      onChange([...selectedTiers, tier]);
    }
  };

  const totalSelected = PLANVILLE_PAGES.filter((p) =>
    selectedTiers.includes(p.tier)
  ).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-500 font-medium">Pages:</span>
      {ALL_TIERS.map((tier) => (
        <button
          key={tier}
          onClick={() => toggle(tier)}
          disabled={disabled}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            selectedTiers.includes(tier)
              ? "bg-blue-50 border-blue-300 text-blue-700"
              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {TIER_LABELS[tier]} ({tierCounts[tier]})
        </button>
      ))}
      <span className="text-xs text-gray-400 ml-2">
        {totalSelected} pages selected
      </span>
    </div>
  );
}
