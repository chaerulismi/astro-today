import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { ISS_POLL_INTERVAL } from "@/lib/constants";
import type { IssPosition } from "@/lib/types";

export function useIss() {
  return useQuery<IssPosition>({
    queryKey: ["iss"],
    queryFn: () => fetchApi("/api/iss"),
    refetchInterval: ISS_POLL_INTERVAL,
  });
}
