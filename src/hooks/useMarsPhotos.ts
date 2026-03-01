import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { MARS_STALE_TIME } from "@/lib/constants";
import type { MarsPhoto } from "@/lib/types";
import type { MarsRover } from "@/lib/constants";

export function useMarsPhotos(rover: MarsRover) {
  return useQuery<MarsPhoto[]>({
    queryKey: ["mars-photos", rover],
    queryFn: () => fetchApi(`/api/mars-photos?rover=${rover}`),
    staleTime: MARS_STALE_TIME,
  });
}
