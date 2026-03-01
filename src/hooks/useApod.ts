import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { APOD_STALE_TIME } from "@/lib/constants";
import type { ApodData } from "@/lib/types";

export function useApod() {
  return useQuery<ApodData>({
    queryKey: ["apod"],
    queryFn: () => fetchApi("/api/apod"),
    staleTime: APOD_STALE_TIME,
  });
}
