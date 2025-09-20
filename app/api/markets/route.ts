import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://gamma-api.polymarket.com/markets", {
      cache: "no-store", // always fresh
    });
    if (!res.ok) {
      throw new Error("Failed to fetch markets");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

