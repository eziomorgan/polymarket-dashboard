import { NextResponse } from "next/server";
import { fetchMarkets } from "@/lib/polymarket";

export async function GET() {
  try {
    const markets = await fetchMarkets();
    return NextResponse.json({ markets });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch markets";
    console.error("Error fetching markets:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
