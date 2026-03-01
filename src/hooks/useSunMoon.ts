import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { SUN_MOON_STALE_TIME } from "@/lib/constants";
import type { SunMoonData } from "@/lib/types";
import { useLocation } from "@/components/location/LocationProvider";

export function useSunMoon() {
  const { coords } = useLocation();

  return useQuery<SunMoonData>({
    queryKey: ["sun-moon", coords?.lat, coords?.lng],
    queryFn: () =>
      fetchApi(`/api/sun-moon?lat=${coords!.lat}&lng=${coords!.lng}`),
    enabled: !!coords,
    staleTime: SUN_MOON_STALE_TIME,
  });
}
