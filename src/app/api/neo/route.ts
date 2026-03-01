import { NextResponse } from "next/server";
import type { NeoObject } from "@/lib/types";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch NEO data" },
      { status: 502 }
    );
  }

  const raw = await res.json();
  const objects: NeoObject[] = [];

  for (const date of Object.keys(raw.near_earth_objects)) {
    for (const neo of raw.near_earth_objects[date]) {
      const approach = neo.close_approach_data[0];
      objects.push({
        id: neo.id,
        name: neo.name,
        estimated_diameter_min:
          neo.estimated_diameter.meters.estimated_diameter_min,
        estimated_diameter_max:
          neo.estimated_diameter.meters.estimated_diameter_max,
        is_potentially_hazardous: neo.is_potentially_hazardous_asteroid,
        close_approach_date: approach?.close_approach_date ?? date,
        relative_velocity_kmh:
          approach?.relative_velocity?.kilometers_per_hour ?? "N/A",
        miss_distance_km:
          approach?.miss_distance?.kilometers ?? "N/A",
      });
    }
  }

  return NextResponse.json(objects);
}
