import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "lat and lng are required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch sun/moon data" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data.results);
}
