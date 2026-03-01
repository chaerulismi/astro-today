"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useApod } from "@/hooks/useApod";

export function ApodCard() {
  const { data, isLoading, error } = useApod();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card title="Astronomy Picture of the Day">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : data ? (
        <div>
          {data.media_type === "image" ? (
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
              <Image
                src={data.url}
                alt={data.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : data.thumbnail_url ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-4 block aspect-video overflow-hidden rounded-xl"
            >
              <Image
                src={data.thumbnail_url}
                alt={data.title}
                fill
                className="object-cover transition group-hover:brightness-75"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/60 p-4 transition group-hover:bg-black/80">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          ) : (
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
              <iframe
                src={data.url}
                title={data.title}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          )}
          <h3 className="text-base font-semibold text-white/90">
            {data.title}
          </h3>
          <p className="mt-1 text-xs text-white/40">
            {data.date}
            {data.copyright && ` — © ${data.copyright}`}
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed text-white/60 ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {data.explanation}
          </p>
          {data.explanation.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      ) : null}
    </Card>
  );
}
