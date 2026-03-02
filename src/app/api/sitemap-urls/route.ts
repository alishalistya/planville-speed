import { NextRequest, NextResponse } from "next/server";
import { PLANVILLE_PAGES } from "@/lib/constants";
import { PageTier } from "@/lib/types";

export async function GET(request: NextRequest) {
  const tiersParam = request.nextUrl.searchParams.get("tiers");

  let pages = PLANVILLE_PAGES;

  if (tiersParam) {
    const tiers = tiersParam.split(",") as PageTier[];
    pages = PLANVILLE_PAGES.filter((p) => tiers.includes(p.tier));
  }

  return NextResponse.json(pages);
}
