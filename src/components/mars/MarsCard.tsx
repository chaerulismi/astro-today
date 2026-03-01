"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useMarsPhotos } from "@/hooks/useMarsPhotos";
import { MARS_ROVERS, type MarsRover } from "@/lib/constants";

export function MarsCard() {
  const [rover, setRover] = useState<MarsRover>("curiosity");
  const { data, isLoading, error } = useMarsPhotos(rover);

  return (
    <Card title="Mars Rover Photos">
      <div className="mb-4 flex gap-2">
        {MARS_ROVERS.map((r) => (
          <button
            key={r}
            onClick={() => setRover(r)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
              rover === r
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data && data.length > 0 ? (
        <div className="grid max-h-[400px] grid-cols-2 gap-2 overflow-auto">
          {data.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg">
              <Image
                src={photo.img_src}
                alt={`Mars - ${photo.camera.full_name}`}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <p className="text-[10px] text-white/80">
                  {photo.camera.name}
                </p>
                <p className="text-[10px] text-white/50">
                  {photo.earth_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/40">No photos available</p>
      )}
    </Card>
  );
}
