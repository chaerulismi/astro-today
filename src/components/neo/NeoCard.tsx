"use client";

import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useNeo } from "@/hooks/useNeo";

export function NeoCard() {
  const { data, isLoading, error } = useNeo();

  return (
    <Card title="Near-Earth Objects">
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data ? (
        <div className="max-h-[400px] overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40">
                <th className="pb-2 pr-3">Name</th>
                <th className="pb-2 pr-3">Diameter (m)</th>
                <th className="pb-2 pr-3">Velocity (km/h)</th>
                <th className="pb-2">Miss (km)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((neo) => (
                <tr
                  key={neo.id}
                  className="border-b border-white/5 text-white/70"
                >
                  <td className="py-2 pr-3">
                    <span className="flex items-center gap-2">
                      {neo.name}
                      {neo.is_potentially_hazardous && (
                        <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
                          HAZARDOUS
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2 pr-3 tabular-nums">
                    {neo.estimated_diameter_min.toFixed(0)}-
                    {neo.estimated_diameter_max.toFixed(0)}
                  </td>
                  <td className="py-2 pr-3 tabular-nums">
                    {parseFloat(neo.relative_velocity_kmh).toFixed(0)}
                  </td>
                  <td className="py-2 tabular-nums">
                    {parseFloat(neo.miss_distance_km).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  );
}
