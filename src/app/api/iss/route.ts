import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.wheretheiss.at/v1/satellites/25544",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch ISS position" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
