"use client";

import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSunMoon } from "@/hooks/useSunMoon";
import { useLocation } from "@/components/location/LocationProvider";

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm font-medium text-white/90">{value}</span>
    </div>
  );
}

export function SunMoonCard() {
  const { coords } = useLocation();
  const { data, isLoading, error } = useSunMoon();

  return (
    <Card title="Sun & Moon">
      {!coords ? (
        <p className="text-sm text-white/40">Waiting for location...</p>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data ? (
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="divide-y divide-white/5">
            <DataRow label="Sunrise" value={data.sunrise} />
            <DataRow label="Sunset" value={data.sunset} />
            <DataRow label="Solar Noon" value={data.solar_noon} />
          </div>
          <div className="divide-y divide-white/5">
            <DataRow label="Dawn" value={data.dawn} />
            <DataRow label="Dusk" value={data.dusk} />
            <DataRow label="Day Length" value={data.day_length} />
          </div>
        </div>
      ) : null}
    </Card>
  );
}
