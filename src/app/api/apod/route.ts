import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch APOD" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
