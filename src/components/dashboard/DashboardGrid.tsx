"use client";

import { LocationPrompt } from "@/components/location/LocationPrompt";
import { SunMoonCard } from "@/components/sun-moon/SunMoonCard";
import { IssCard } from "@/components/iss/IssCard";
import { ApodCard } from "@/components/apod/ApodCard";
import { NeoCard } from "@/components/neo/NeoCard";
import { MarsCard } from "@/components/mars/MarsCard";

export function DashboardGrid() {
  return (
    <div className="space-y-6">
      <LocationPrompt />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SunMoonCard />
        <IssCard />
      </div>
      <ApodCard />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NeoCard />
        <MarsCard />
      </div>
    </div>
  );
}
