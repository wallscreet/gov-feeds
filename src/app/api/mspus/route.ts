// app/api/mspus/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://gov-data-production.up.railway.app/mspus", {
      // Prevent Next.js from caching stale data in dev
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from upstream" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
