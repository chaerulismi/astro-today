import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { NEO_STALE_TIME } from "@/lib/constants";
import type { NeoObject } from "@/lib/types";

export function useNeo() {
  return useQuery<NeoObject[]>({
    queryKey: ["neo"],
    queryFn: () => fetchApi("/api/neo"),
    staleTime: NEO_STALE_TIME,
  });
}
