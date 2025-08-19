import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams }  = new URL(request.url);

    const start_date = searchParams.get("start_date") ?? "2006-01-01";
    const end_date = searchParams.get("end_date") ?? "";

    const upstreamUrl = new URL("http://gov-data-production.up.railway.app/mortgage-15yr");
    upstreamUrl.searchParams.set("start_date", start_date);
    if (end_date) {
      upstreamUrl.searchParams.set("end_date", end_date);
    }

    const res = await fetch(upstreamUrl.toString(), { cache: "no-store" });

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