"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useIss } from "@/hooks/useIss";

const IssMap = dynamic(() => import("./IssMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
});

export function IssCard() {
  const { data, isLoading, error } = useIss();

  return (
    <Card title="ISS Tracker">
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data ? (
        <div>
          <IssMap latitude={data.latitude} longitude={data.longitude} />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-white/40">Altitude</p>
              <p className="text-sm font-medium text-white/90">
                {data.altitude.toFixed(1)} km
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40">Velocity</p>
              <p className="text-sm font-medium text-white/90">
                {data.velocity.toFixed(0)} km/h
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40">Visibility</p>
              <p className="text-sm font-medium capitalize text-white/90">
                {data.visibility}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
