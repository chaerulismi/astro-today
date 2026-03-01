import { NextRequest, NextResponse } from "next/server";
import { MARS_ROVERS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const rover = request.nextUrl.searchParams.get("rover") || "curiosity";

  if (!MARS_ROVERS.includes(rover as (typeof MARS_ROVERS)[number])) {
    return NextResponse.json(
      { error: `Invalid rover. Must be one of: ${MARS_ROVERS.join(", ")}` },
      { status: 400 }
    );
  }

  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";

  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Mars photos" },
      { status: 502 }
    );
  }

  const data = await res.json();
  // Return only first 12 photos
  return NextResponse.json(data.latest_photos?.slice(0, 12) ?? []);
}
